# WeatherChat — repo guide for Claude

A personal weather app: a single-file Cloudflare Worker that pairs an LLM
"operational meteorologist" chat with an auto-populating, NWS-grade dashboard.
**Not a product** — a labor of love for one weather-literate user who wants to
leverage LLMs against live NWS/NOAA APIs. Favor information density, correctness,
and taste over hand-holding or consumer-friendly simplification.

## The whole app is one file

Everything lives in **`index.js`** (~4.9k lines, an esbuild-bundled Worker).
There is **no `src/` and no build step to run for edits** — the `// src/index.ts`
comments are bundler artifacts; edit `index.js` directly. Rough map:

- **Lines ~1–950**: bundled `unenv`/Node polyfills. Don't touch. (These also
  clobber `globalThis.console`/`process` at import time — relevant when testing
  in Node; see Dev loop.)
- **`var INDEX_HTML = ` …**: the **entire frontend** (HTML + CSS + client JS) as
  one big template literal.
- **`index_default.fetch(request, env)`**: the Worker entry / router.
- **Route handlers**: `handleChat`, `handleGeocode`, `handleGeoSearch`,
  `handleSummary`, `handleDashboard`.
- **Data functions** (one per source): `getForecast`, `getHourlyForecast`,
  `getGridpointSeries`, `getCurrentObservations`, `getActiveAlerts`,
  `getAFD`/`getProduct`, SPC (`getSPCConvectiveOutlook`, `spcDay1AtPoint`,
  `getSPCActiveWatches`, `getSPCMesoscaleDiscussion(s)`, `getSPCFireWeatherOutlook`,
  `getSPCDay48Outlook`), `getAirQuality`, `getRiverGauges`, `getNHCTropical`,
  `getMetarTaf`, `getStormReports`, `getAstronomy`, `getDroughtMonitor`,
  `getCPCOutlook`, `getWPCQPF`.
- **`TOOLS` + `executeToolCall`**: the tool schema and dispatcher for the chat
  agent. **`buildSystemPrompt`**: the meteorologist persona.

Routes: `/` and `/index.html` (the app), `/api/chat`, `/api/geocode`,
`/api/geosearch`, `/api/summary`, `/api/dashboard`, `/api/health`,
`/api/transcribe` (ElevenLabs STT) and `/api/tts` (ElevenLabs TTS) — the
voice features ported from ha-mcp-gateway.

## ⚠️ #1 gotcha: the client code lives inside a template literal

All client JS/CSS/HTML is inside `` var INDEX_HTML = `…` ``. When editing
**client-side** code:

- **Backslash escapes are eaten by the outer literal.** A regex `/\d+/` or a
  string `"\n"` in client code must be written `/\\d+/` and `"\\n"` in source. A
  lone `\n` becomes a real newline → broken script. (Prefer string methods over
  regex to avoid this.)
- **No raw backtick and no `${`** in client code — use string concatenation, not
  nested template literals.
- **Build DOM with `document.createElement` + `.textContent`**, never `innerHTML`
  on upstream NWS text (escaping + XSS). The only `innerHTML` is static, numeric
  SVG.
- **`node --check index.js` does NOT validate the client script** (it's just a
  string to Node). To catch client bugs, extract the served `<script>` and check
  that (see Dev loop).

Backend code (handlers, data functions) is normal JS — these rules only apply
inside `INDEX_HTML`.

## NWS data specifics that bite

- Flow: `api.weather.gov/points/{lat},{lon}` → `properties.forecast` (12-hr day/
  night periods), `.forecastHourly`, `.forecastGridData` (raw grid),
  `.observationStations`.
- **`forecastGridData` is the richest source** (drives the meteogram): temperature,
  dewpoint, apparentTemperature, probabilityOfPrecipitation, skyCover, windSpeed,
  windGust, windDirection, relativeHumidity, quantitativePrecipitation. Values are
  `{ validTime: "ISO8601/PTnH", value }` — a start + ISO duration. `gridSeriesToHourly`
  expands them onto an hourly grid.
- **Units**: grid temps are °C, wind km/h, QPF mm — convert (`c2f`, `kmh2mph`, `mm2in`).
- **`quantitativePrecipitation` is an ACCUMULATION per interval** (a 6-hour block
  is the 6-hour total). Never replicate the block into each hour and sum — that
  overcounts ~6×. Prorate by window overlap (`accumOverWindow`) for totals, or
  divide across the block's hours (`gridAccumHourly`) for an hourly rate.
- NWS requires a real **User-Agent** (`env.NWS_USER_AGENT`).
- `forecast` day/night periods alternate; pair a daytime period (high) with the
  following night (low). A leading night (evening load) is a low-only "Tonight" row.

## The dashboard

`GET /api/dashboard?lat=&lon=` aggregates everything server-side via
`Promise.allSettled` (partial-failure tolerant), edge-cached ~10 min. Returns
`{ location, current, hourly, hourlySeries, precipOutlook, daily, alerts,
astronomy, airQuality, severe }`. `hourlySeries` holds the parallel gridpoint
arrays the meteogram plots.

Client: `refreshDashboard()` fetches it; `renderDashboard()` builds the DOM.
Builders: `buildAlerts`, `buildHero`, `buildMeteogram`/
`drawMeteogram` (4-panel NWS-style meteogram: temp / precip / wind / sky, shared
time axis, synced hover crosshair, 24-48-72h toggle), `buildDaily` (dense 7-day
**table**, no bars), `buildModules` (tiles).

- The dashboard renders inside `#empty` (the home screen) and auto-tears-down when
  a chat starts, because `renderMessages()` only re-attaches `#empty` when a thread
  has zero messages. Mutate the existing nodes; don't recreate the container.
- **Refresh seam**: `refreshSummary()` also calls `refreshDashboard()`, so every
  location switch / edit / home render refreshes both. A location-keyed skeleton
  (`dashRenderedKey`) prevents showing one location's data under another's name.

## Aesthetic conventions (keep them)

- Dark, glassy. **Reuse the `:root` CSS custom properties** (`--bg-*`, `--panel*`,
  `--border*`, `--text`, `--muted*`, `--accent`, `--accent-2`, `--ok/--err/--warn`).
  Don't introduce a new palette.
- **Self-contained**: no external CSS/JS/fonts/images. Icons are emoji or inline SVG.
- Responsive: mobile `@media (max-width: 740px)`, wide two-column `@media (min-width: 900px)`.
  Keep `#wxDashboard { overflow-x: hidden }` and make wide content (meteogram, tables)
  scroll within itself.

## Config, secrets, deploy

`wrangler.toml` → `[vars]`: `NWS_USER_AGENT`, `PROVIDER` (`fireworks` |
`meta`) + `MODEL` (must be a model that provider serves; currently
`accounts/fireworks/routers/glm-5p3-fast`), `DEFAULT_LAT`/`_LON`/`_OFFICE`/
`_LOCATION_NAME`, optional `REASONING_EFFORT` / `MAX_TOKENS` / `SUMMARY_MODEL` /
`SUMMARY_EFFORT` (home-screen discussion, default `high`).
`GET /api/health` reports the live provider, model, and whether its key is set.

Secrets (never commit): the active provider's key — `wrangler secret put
FIREWORKS_API_KEY` (PROVIDER=fireworks) or `MODEL_API_KEY` (PROVIDER=meta);
chat + summary both use it — plus `wrangler secret put AIRNOW_API_KEY`
(optional; air quality degrades gracefully without it), `wrangler secret put
ELEVENLABS_API_KEY` (optional; mic input + spoken replies error out
gracefully without it). Optional var `ELEVENLABS_VOICE_ID` overrides the
default TTS voice (Rachel, `eleven_flash_v2_5` @ `mp3_22050_32`).

- Run locally: `wrangler dev`  ·  Deploy: `wrangler deploy`.
- **`/api/chat` streams.** The UI posts `stream: true` and gets
  `text/event-stream` back: `data: {type,…}` events (`delta` answer text,
  `reset` drop streamed commentary, `tools` round starting, `tool` one tool
  done, then a terminal `done`/`error` that is authoritative). Without
  `stream: true` it returns the original single JSON body. Both shapes run the
  same `runChatLoop`. Upstream, `callLLM` asks the provider for its SSE stream
  (`readChatStream` for Chat Completions, `readResponsesStream` for Meta, both
  on `readSSE`) and falls back to the buffered call — and stops streaming for
  that provider for the isolate's life — on a 4xx or an unusable stream.
- The chat agent loops up to `MAX_TOOL_ITERATIONS` (12) tool rounds per turn
  with the `TOOLS` schema. History is kept in one canonical
  Chat-Completions shape; `callLLM` translates at the wire and always hands
  back a Chat-Completions-shaped response:
  - **fireworks** (`buildChatBody`): native Chat Completions. GLM's
    interleaved thinking needs the round's `reasoning_content` replayed on the
    assistant message within a turn; `x-session-affinity` pins the prompt cache.
  - **meta** (`buildResponsesBody` / `chatMessagesToResponsesInput` /
    `responsesToChatCompletion`, ported from ha-mcp-gateway's
    `src/llm-providers.js`): the **Responses API**. Reasoning is encrypted and
    must be replayed verbatim across tool rounds (`_reasoning_items`) or the
    API 400s — read the comments on those functions before touching it.
  Both kinds of reasoning are stripped by `stripProviderInternals` before
  anything reaches the client.

## Dev / verify loop (catches what `node --check` can't)

Because a client-side edit can break in ways the outer file's syntax check won't
show, **verify by actually rendering**:

1. Stub `globalThis.caches` (`{ default: { match: async()=>undefined, put: async()=>{} } }`),
   `import` the worker's default export, and wrap it in a tiny `node:http` server
   that forwards each request to `worker.fetch(request, env)` (hits live NWS).
2. Load `http://localhost:PORT/` in headless Chromium (Playwright is available at
   `/opt/pw-browsers/chromium`; import from the global install). Listen for
   `pageerror`, then screenshot desktop (≥1280) and mobile (≤400).
3. Also extract the served `<script>` (last `<script>…</script>`) and run
   `node --check` on it to catch template-literal/escaping bugs.

The polyfills clobber `console` after import, so in Node harnesses capture output
via `node:fs` (write results to a file) rather than `console.log`.

## LLM / model notes

- The **app's** chat and summary inference both run on **GLM 5.3 Fast** on
  Fireworks (`accounts/fireworks/routers/glm-5p3-fast`) — the same model as
  GLM 5.3 in Fireworks' Fast serving tier (docs: "100+ tokens per second";
  ~200 observed), chosen for latency after Muse Spark felt laggy. Fast
  pricing per 1M tokens (Fireworks pricing page, 2026-09-29): $2.10 input /
  $0.39 cached / $6.60 output, vs $1.40 / $0.26 / $4.40 for standard GLM 5.3.
  Chat reasons at `"low"` per round (`REASONING_EFFORT` overrides). No
  `temperature`/`top_p` is sent on either provider — Fireworks applies the
  model's own published defaults.
- **Home-screen discussion** (`/api/summary` → `handleSummary`): not a recap
  but an original AFD-style discussion (bold headline, then `NOW` / `NEAR
  TERM` / `SHORT TERM` / `EXTENDED` / `HAZARDS` / `CONFIDENCE — …`
  paragraphs) written at `"high"` effort (`SUMMARY_EFFORT`) from
  `gatherDiscussionInputs`: obs, point forecast, a 72 h 3-hourly gridded table
  (`gridTable`: T/Td/AT/RH/POP/sky/wind/gust/QPF), alerts, the WFO AFD, SPC
  D1–3 at-point + text, D4–8, watches, MDs, WPC, NHC, drought, CPC, AQ,
  sun/moon — fetched in parallel, each capped in size and raced against a 9 s
  deadline; failures are listed to the model as UNAVAILABLE. The packet also
  carries a computed observed-minus-gridded check for the current hour and the
  grid table's time window. `DISCUSSION_SYS` gives the model a working method
  and hard evidence rules (exact numbers only, no synoptic feature no product
  names, no one-value trends, no climatology) — they were written against real
  output that invented a shortwave, rounded POPs and misassigned day/night
  periods, so keep them when editing. A banned-word list ("brings", "stays
  hot", …) was tried and removed: the model dodged it with synonyms, and the
  AFD-register + mechanism-then-effect instruction does the real work. The
  final self-check step names its checks explicitly (length, exact periods, no
  empty HAZARDS) because a generic "check the word count" let 2 of 3 samples
  run long.
  Bump the cache key version whenever the prompt changes. Edge-cached per
  location per hour (`wx-summary.internal/v6`); the client keeps the last
  model discussion in localStorage and shows it dimmed on open while the new
  one generates. `maxTokens` 10k keeps high-effort generation under
  Cloudflare's 100 s no-response cutoff.
- **Muse Spark 1.3** (`PROVIDER = "meta"`, `MODEL =
  "muse-spark-1.3-contributor"`) stays fully wired as the rollback; chat
  defaults to `"minimal"` there. The contributor tier is far cheaper but Meta
  uses that traffic to improve their products; `muse-spark-1.3` (no suffix)
  costs ~12x more and isn't used that way — see ha-mcp-gateway's
  `docs/MUSE-SPARK.md` before assuming contributor is right for a dataset.
- Switching between the two wired providers is a config change (`PROVIDER` +
  `MODEL` + that provider's secret). Adding a third is a real change — wire
  format, auth, and reasoning-replay handling move together;
  `ha-mcp-gateway`'s `src/llm-providers.js` is the reference.
- Choosing which **Claude Code** model develops this repo (e.g. Fable) is set with
  `/model`, independent of anything in this file.
- When building or changing LLM behavior, prefer the latest, most capable models
  and check current model ids/pricing rather than relying on memory.
