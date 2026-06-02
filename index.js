// WeatherChat - Cloudflare Worker
// Uses Cerebras (OpenAI-compatible) for chat completions

const SYSTEM_PROMPT = `You are a helpful weather assistant for the Shelby County, Alabama area (and anywhere else the user asks about). You have access to real-time weather data through the National Weather Service API.

When a user asks about weather, use the appropriate tools to fetch current data. Always provide helpful, accurate weather information based on the actual API responses.

Available tools:
- get_nws_forecast: Get weather forecast for a location using NWS grid coordinates
- get_nws_current: Get current weather observations from the nearest station
- get_nws_alerts: Get active weather alerts for a state or zone

Default location: Shelby County, Alabama (lat: 33.21, lon: -86.65, office: BMX)

Always be helpful and provide context about weather conditions. If asked about a specific location, try to use the appropriate NWS data for that area.`;

const WEATHER_TOOLS = [
  {
    type: "function",
    function: {
      name: "get_nws_forecast",
      description: "Get weather forecast for a location using NWS grid coordinates",
      parameters: {
        type: "object",
        properties: {
          office: {
            type: "string",
            description: "NWS office code (e.g., BMX for Birmingham, AL)"
          },
          gridX: {
            type: "integer",
            description: "NWS grid X coordinate"
          },
          gridY: {
            type: "integer",
            description: "NWS grid Y coordinate"
          }
        },
        required: ["office", "gridX", "gridY"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_nws_current",
      description: "Get current weather observations from the nearest station for given coordinates",
      parameters: {
        type: "object",
        properties: {
          lat: {
            type: "number",
            description: "Latitude"
          },
          lon: {
            type: "number",
            description: "Longitude"
          }
        },
        required: ["lat", "lon"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_nws_alerts",
      description: "Get active weather alerts for a state or zone",
      parameters: {
        type: "object",
        properties: {
          area: {
            type: "string",
            description: "State code (e.g., AL) or zone code (e.g., ALZ038)"
          }
        },
        required: ["area"]
      }
    }
  }
];

// --- AI runner (Cerebras — OpenAI-compatible endpoint) ---
// Replaces the former env.AI.run (Cloudflare Workers AI binding).
// Set the API key with:  npx wrangler secret put CEREBRAS_API_KEY
async function runAI(env, messages, tools = null) {
  if (!env.CEREBRAS_API_KEY) {
    throw new Error(
      "CEREBRAS_API_KEY secret is not configured. " +
      "Run: npx wrangler secret put CEREBRAS_API_KEY"
    );
  }

  const body = {
    model:            env.MODEL            || "gpt-oss-120b",
    messages,
    reasoning_effort: env.REASONING_EFFORT || "high",
    reasoning_format: "hidden",   // reasoning tokens consumed but not returned in content
    stream:           false,
  };

  if (tools && tools.length > 0) {
    body.tools = tools;
  }

  const response = await fetch("https://api.cerebras.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.CEREBRAS_API_KEY}`,
      "Content-Type":  "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Cerebras API error ${response.status}: ${errText}`);
  }

  // Returns standard OpenAI-shaped object: { choices: [{ message: { content, tool_calls } }] }
  return await response.json();
}

async function getNWSForecast(office, gridX, gridY, userAgent) {
  try {
    const url = `https://api.weather.gov/gridpoints/${office}/${gridX},${gridY}/forecast`;
    const response = await fetch(url, {
      headers: { 'User-Agent': userAgent }
    });

    if (!response.ok) {
      return { error: `NWS API error: ${response.status}` };
    }

    const data = await response.json();
    const periods = data.properties?.periods?.slice(0, 5) || [];
    return {
      forecast: periods.map(p => ({
        name: p.name,
        temperature: `${p.temperature}°${p.temperatureUnit}`,
        windSpeed: p.windSpeed,
        windDirection: p.windDirection,
        shortForecast: p.shortForecast,
        detailedForecast: p.detailedForecast
      }))
    };
  } catch (e) {
    return { error: e.message };
  }
}

async function getNWSCurrent(lat, lon, userAgent) {
  try {
    // First get the nearest station
    const pointsUrl = `https://api.weather.gov/points/${lat},${lon}`;
    const pointsResponse = await fetch(pointsUrl, {
      headers: { 'User-Agent': userAgent }
    });

    if (!pointsResponse.ok) {
      return { error: `NWS points error: ${pointsResponse.status}` };
    }

    const pointsData = await pointsResponse.json();
    const stationsUrl = pointsData.properties?.observationStations;

    if (!stationsUrl) {
      return { error: 'No observation stations found' };
    }

    const stationsResponse = await fetch(stationsUrl, {
      headers: { 'User-Agent': userAgent }
    });
    const stationsData = await stationsResponse.json();
    const stationId = stationsData.features?.[0]?.properties?.stationIdentifier;

    if (!stationId) {
      return { error: 'No station identifier found' };
    }

    // Get latest observation
    const obsUrl = `https://api.weather.gov/stations/${stationId}/observations/latest`;
    const obsResponse = await fetch(obsUrl, {
      headers: { 'User-Agent': userAgent }
    });
    const obsData = await obsResponse.json();
    const props = obsData.properties;

    return {
      station: stationId,
      timestamp: props?.timestamp,
      temperature: props?.temperature?.value !== null
        ? `${((props.temperature.value * 9/5) + 32).toFixed(1)}°F`
        : 'N/A',
      humidity: props?.relativeHumidity?.value !== null
        ? `${props.relativeHumidity.value?.toFixed(0)}%`
        : 'N/A',
      windSpeed: props?.windSpeed?.value !== null
        ? `${(props.windSpeed.value * 2.237).toFixed(1)} mph`
        : 'N/A',
      windDirection: props?.windDirection?.value,
      description: props?.textDescription,
      visibility: props?.visibility?.value !== null
        ? `${(props.visibility.value / 1609.34).toFixed(1)} miles`
        : 'N/A'
    };
  } catch (e) {
    return { error: e.message };
  }
}

async function getNWSAlerts(area, userAgent) {
  try {
    const url = `https://api.weather.gov/alerts/active?area=${area}`;
    const response = await fetch(url, {
      headers: { 'User-Agent': userAgent }
    });

    if (!response.ok) {
      return { error: `NWS alerts error: ${response.status}` };
    }

    const data = await response.json();
    const alerts = data.features || [];

    if (alerts.length === 0) {
      return { alerts: [], message: 'No active alerts' };
    }

    return {
      alerts: alerts.slice(0, 5).map(a => ({
        event: a.properties?.event,
        severity: a.properties?.severity,
        headline: a.properties?.headline,
        description: a.properties?.description?.substring(0, 500),
        expires: a.properties?.expires
      }))
    };
  } catch (e) {
    return { error: e.message };
  }
}

async function handleChat(env, userMessage, history = []) {
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history,
    { role: "user", content: userMessage }
  ];

  // First AI call - may result in tool calls
  const result = await runAI(env, messages, WEATHER_TOOLS);

  // Handle tool calls — Cerebras returns OpenAI format: choices[0].message
  const assistantMsg = result.choices?.[0]?.message ?? {};

  if (assistantMsg.tool_calls && assistantMsg.tool_calls.length > 0) {
    // Add assistant message with tool calls
    messages.push({
      role: "assistant",
      content: null,
      tool_calls: assistantMsg.tool_calls
    });

    // Execute each tool call
    for (const toolCall of assistantMsg.tool_calls) {
      let toolResult;
      const args = JSON.parse(toolCall.function.arguments);

      if (toolCall.function.name === 'get_nws_forecast') {
        toolResult = await getNWSForecast(args.office, args.gridX, args.gridY, env.NWS_USER_AGENT);
      } else if (toolCall.function.name === 'get_nws_current') {
        toolResult = await getNWSCurrent(args.lat, args.lon, env.NWS_USER_AGENT);
      } else if (toolCall.function.name === 'get_nws_alerts') {
        toolResult = await getNWSAlerts(args.area, env.NWS_USER_AGENT);
      } else {
        toolResult = { error: 'Unknown tool' };
      }

      messages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        content: JSON.stringify(toolResult)
      });
    }

    // Second AI call with tool results
    const finalResult = await runAI(env, messages);
    return finalResult.choices?.[0]?.message?.content ?? "";
  }

  return assistantMsg.content ?? "";
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Serve static HTML for root
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(getHTML(), {
        headers: { 'Content-Type': 'text/html' }
      });
    }

    // Chat API endpoint
    if (url.pathname === '/api/chat' && request.method === 'POST') {
      try {
        const body = await request.json();
        const userMessage = body.message;
        const history = body.history || [];

        if (!userMessage) {
          return new Response(JSON.stringify({ error: 'Message required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        const response = await handleChat(env, userMessage, history);

        return new Response(JSON.stringify({ response }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    return new Response('Not Found', { status: 404 });
  }
};

function getHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WeatherChat</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #1a1a2e;
            color: #e0e0e0;
            height: 100vh;
            display: flex;
            flex-direction: column;
        }
        header {
            background: #16213e;
            padding: 1rem;
            text-align: center;
            border-bottom: 1px solid #0f3460;
        }
        header h1 { color: #4fc3f7; font-size: 1.5rem; }
        header p { color: #90a4ae; font-size: 0.85rem; margin-top: 0.25rem; }
        #chat-container {
            flex: 1;
            overflow-y: auto;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        .message {
            max-width: 80%;
            padding: 0.75rem 1rem;
            border-radius: 12px;
            line-height: 1.5;
            white-space: pre-wrap;
        }
        .user-message {
            background: #0f3460;
            align-self: flex-end;
            color: #e0e0e0;
        }
        .assistant-message {
            background: #16213e;
            align-self: flex-start;
            color: #e0e0e0;
            border: 1px solid #0f3460;
        }
        .thinking {
            background: #16213e;
            align-self: flex-start;
            color: #90a4ae;
            border: 1px solid #0f3460;
            font-style: italic;
        }
        #input-area {
            padding: 1rem;
            background: #16213e;
            border-top: 1px solid #0f3460;
            display: flex;
            gap: 0.5rem;
        }
        #message-input {
            flex: 1;
            padding: 0.75rem;
            border-radius: 8px;
            border: 1px solid #0f3460;
            background: #1a1a2e;
            color: #e0e0e0;
            font-size: 1rem;
            outline: none;
        }
        #message-input:focus { border-color: #4fc3f7; }
        #send-btn {
            padding: 0.75rem 1.5rem;
            background: #4fc3f7;
            color: #1a1a2e;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            font-size: 1rem;
        }
        #send-btn:hover { background: #81d4fa; }
        #send-btn:disabled { background: #546e7a; cursor: not-allowed; }
    </style>
</head>
<body>
    <header>
        <h1>🌤️ WeatherChat</h1>
        <p>Powered by NWS real-time data · Default: Shelby County, Alabama</p>
    </header>
    <div id="chat-container">
        <div class="message assistant-message">Hello! I'm your weather assistant. I can provide current conditions, forecasts, and weather alerts using real-time National Weather Service data. Ask me about the weather anywhere!</div>
    </div>
    <div id="input-area">
        <input type="text" id="message-input" placeholder="Ask about the weather..." />
        <button id="send-btn">Send</button>
    </div>
    <script>
        const chatContainer = document.getElementById('chat-container');
        const messageInput = document.getElementById('message-input');
        const sendBtn = document.getElementById('send-btn');
        let history = [];

        function addMessage(content, type) {
            const div = document.createElement('div');
            div.className = \`message \${type}-message\`;
            div.textContent = content;
            chatContainer.appendChild(div);
            chatContainer.scrollTop = chatContainer.scrollHeight;
            return div;
        }

        async function sendMessage() {
            const message = messageInput.value.trim();
            if (!message) return;

            messageInput.value = '';
            sendBtn.disabled = true;
            addMessage(message, 'user');
            const thinking = addMessage('Fetching weather data...', 'thinking');

            try {
                const res = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message, history })
                });
                const data = await res.json();
                thinking.remove();

                if (data.error) {
                    addMessage('Error: ' + data.error, 'assistant');
                } else {
                    addMessage(data.response, 'assistant');
                    history.push({ role: 'user', content: message });
                    history.push({ role: 'assistant', content: data.response });
                    if (history.length > 20) history = history.slice(-20);
                }
            } catch (e) {
                thinking.remove();
                addMessage('Network error: ' + e.message, 'assistant');
            }

            sendBtn.disabled = false;
            messageInput.focus();
        }

        sendBtn.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') sendMessage();
        });
    </script>
</body>
</html>`;
}
