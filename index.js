var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// src/geo.ts
function pointInRing(point, ring) {
  const [x, y] = point;
  let inside = false;
  const n = ring.length;
  let j = n - 1;
  for (let i = 0; i < n; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
__name(pointInRing, "pointInRing");
function pointInPolygon(point, polygon) {
  if (!polygon.length) return false;
  if (!pointInRing(point, polygon[0])) return false;
  for (let i = 1; i < polygon.length; i++) {
    if (pointInRing(point, polygon[i])) return false;
  }
  return true;
}
__name(pointInPolygon, "pointInPolygon");
function pointInGeometry(point, geometry) {
  if (!geometry) return false;
  if (geometry.type === "Polygon") {
    return pointInPolygon(point, geometry.coordinates);
  }
  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates.some((poly) => pointInPolygon(point, poly));
  }
  return false;
}
__name(pointInGeometry, "pointInGeometry");

// src/weather.ts
async function nwsJSON(url, ua, cacheTtl = 300) {
  const r = await fetch(url, {
    headers: {
      "User-Agent": ua,
      "Accept": "application/geo+json,application/ld+json,application/json"
    },
    cf: { cacheTtl, cacheEverything: true }
  });
  if (!r.ok) {
    const body = await r.text().catch(() => "");
    throw new Error(`NWS ${r.status} on ${url}: ${body.slice(0, 200)}`);
  }
  return r.json();
}
__name(nwsJSON, "nwsJSON");
async function fetchText(url, ua, cacheTtl = 300) {
  const r = await fetch(url, {
    headers: { "User-Agent": ua, "Accept": "text/plain,text/html,application/xml,*/*" },
    cf: { cacheTtl, cacheEverything: true }
  });
  if (!r.ok) throw new Error(`${r.status} on ${url}`);
  return r.text();
}
__name(fetchText, "fetchText");
async function fetchJSON(url, ua, cacheTtl = 300) {
  const r = await fetch(url, {
    headers: { "User-Agent": ua, "Accept": "application/json,application/geo+json" },
    cf: { cacheTtl, cacheEverything: true }
  });
  if (!r.ok) throw new Error(`${r.status} on ${url}`);
  return r.json();
}
__name(fetchJSON, "fetchJSON");
async function pointInfo(lat, lon, ua) {
  const la = Math.round(lat * 1e4) / 1e4;
  const lo = Math.round(lon * 1e4) / 1e4;
  return nwsJSON(`https://api.weather.gov/points/${la},${lo}`, ua, 86400);
}
__name(pointInfo, "pointInfo");
async function getForecast(lat, lon, ua) {
  const pt = await pointInfo(lat, lon, ua);
  const fc = await nwsJSON(pt.properties.forecast, ua, 600);
  const periods = (fc.properties.periods || []).map((p) => ({
    name: p.name,
    isDaytime: p.isDaytime,
    temp: `${p.temperature}\xB0${p.temperatureUnit}`,
    wind: `${p.windSpeed} ${p.windDirection}`,
    short: p.shortForecast,
    detailed: p.detailedForecast,
    pop: p.probabilityOfPrecipitation?.value ?? null
  }));
  return JSON.stringify({
    location: `${pt.properties.relativeLocation?.properties?.city ?? "?"}, ${pt.properties.relativeLocation?.properties?.state ?? "?"}`,
    office: pt.properties.gridId,
    grid: `${pt.properties.gridX},${pt.properties.gridY}`,
    elevation_m: pt.properties.elevation?.value ?? null,
    timeZone: pt.properties.timeZone,
    updated: fc.properties.updated,
    periods
  }, null, 2);
}
__name(getForecast, "getForecast");
async function getHourlyForecast(lat, lon, hours, ua) {
  const pt = await pointInfo(lat, lon, ua);
  const fc = await nwsJSON(pt.properties.forecastHourly, ua, 600);
  const max = Math.min(Math.max(hours || 36, 1), 156);
  const periods = (fc.properties.periods || []).slice(0, max).map((p) => ({
    t: p.startTime,
    temp: `${p.temperature}\xB0${p.temperatureUnit}`,
    wind: `${p.windSpeed} ${p.windDirection}`,
    short: p.shortForecast,
    pop: p.probabilityOfPrecipitation?.value ?? null
  }));
  return JSON.stringify({
    location: `${pt.properties.relativeLocation?.properties?.city}, ${pt.properties.relativeLocation?.properties?.state}`,
    office: pt.properties.gridId,
    updated: fc.properties.updated,
    hours: periods.length,
    periods
  }, null, 2);
}
__name(getHourlyForecast, "getHourlyForecast");
async function getActiveAlerts(lat, lon, ua) {
  const data = await nwsJSON(
    `https://api.weather.gov/alerts/active?point=${lat},${lon}`,
    ua,
    60
  );
  const alerts = (data.features || []).map((f) => {
    const p = f.properties || {};
    return {
      id: p.id,
      event: p.event,
      severity: p.severity,
      certainty: p.certainty,
      urgency: p.urgency,
      messageType: p.messageType,
      sent: p.sent,
      effective: p.effective,
      onset: p.onset,
      expires: p.expires,
      ends: p.ends,
      senderName: p.senderName,
      headline: p.headline,
      areaDesc: p.areaDesc,
      description: p.description,
      instruction: p.instruction
    };
  });
  if (!alerts.length) return JSON.stringify({ count: 0, alerts: [] });
  return JSON.stringify({ count: alerts.length, alerts }, null, 2);
}
__name(getActiveAlerts, "getActiveAlerts");
async function getAFD(office, ua) {
  return getProduct("AFD", office, ua);
}
__name(getAFD, "getAFD");
async function getProduct(type, office, ua) {
  const t = type.toUpperCase();
  const o = office.toUpperCase();
  const list = await nwsJSON(
    `https://api.weather.gov/products/types/${t}/locations/${o}`,
    ua,
    300
  );
  const items = list["@graph"] || list.products || [];
  if (!items.length) return `No ${t} products found for ${o}.`;
  const productId = items[0].id || items[0]["@id"]?.split("/").pop();
  const prod = await nwsJSON(`https://api.weather.gov/products/${productId}`, ua, 300);
  return JSON.stringify({
    productCode: t,
    office: o,
    issuanceTime: prod.issuanceTime,
    productName: prod.productName,
    wmoCollectiveId: prod.wmoCollectiveId,
    text: prod.productText
  }, null, 2);
}
__name(getProduct, "getProduct");
var CAT_RANK = { TSTM: 1, MRGL: 2, SLGT: 3, ENH: 4, MDT: 5, HIGH: 6 };
async function fetchSPCLayer(url, ua) {
  try {
    return await fetchJSON(url, ua, 600);
  } catch {
    return null;
  }
}
__name(fetchSPCLayer, "fetchSPCLayer");
function findHighestRiskAtPoint(geojson, pt) {
  if (!geojson?.features?.length) return null;
  let best = null;
  for (const f of geojson.features) {
    if (!pointInGeometry(pt, f.geometry)) continue;
    const raw = String(f.properties?.LABEL ?? f.properties?.label ?? "");
    const sig = /#/.test(raw) || f.properties?.SIG === 1 || f.properties?.sig === 1;
    const label = raw.replace("#", "");
    const rank = CAT_RANK[label] ?? parseFloat(label);
    if (Number.isNaN(rank)) continue;
    if (!best || rank > best.rank) best = { label, rank, sig };
  }
  return best;
}
__name(findHighestRiskAtPoint, "findHighestRiskAtPoint");
async function spcOutlookText(day, ua) {
  const urls = [
    `https://www.spc.noaa.gov/products/outlook/day${day}otlk.txt`,
    `https://www.spc.noaa.gov/products/outlook/archive/`
    // fallback list, unused
  ];
  try {
    return await fetchText(urls[0], ua, 600);
  } catch {
    return null;
  }
}
__name(spcOutlookText, "spcOutlookText");
async function getSPCConvectiveOutlook(day, lat, lon, ua) {
  if (![1, 2, 3].includes(day)) throw new Error("day must be 1, 2, or 3");
  const pt = [lon, lat];
  const base = `https://www.spc.noaa.gov/products/outlook/day${day}otlk`;
  const layerUrls = day === 3 ? { categorical: `${base}_cat.lyr.geojson`, probabilistic: `${base}_prob.lyr.geojson` } : {
    categorical: `${base}_cat.lyr.geojson`,
    tornado: `${base}_torn.lyr.geojson`,
    wind: `${base}_wind.lyr.geojson`,
    hail: `${base}_hail.lyr.geojson`
  };
  const entries = await Promise.all(
    Object.entries(layerUrls).map(async ([k, url]) => [k, await fetchSPCLayer(url, ua)])
  );
  const atPoint = {};
  for (const [k, gj] of entries) {
    const hit = gj ? findHighestRiskAtPoint(gj, pt) : null;
    if (k === "categorical") {
      atPoint.categorical = hit ? { label: hit.label, rank: hit.rank } : { label: "none", rank: 0 };
    } else if (k === "probabilistic") {
      atPoint.probabilistic = hit ? { label: `${hit.label}%`, significant: hit.sig } : null;
    } else {
      atPoint[k] = hit ? { probability: `${hit.label}%`, significant: hit.sig } : null;
    }
  }
  let valid = null;
  let issue = null;
  let expire = null;
  for (const [, gj] of entries) {
    const p = gj?.features?.[0]?.properties;
    if (p) {
      valid = p.VALID ?? p.valid ?? valid;
      issue = p.ISSUE ?? p.issue ?? issue;
      expire = p.EXPIRE ?? p.expire ?? expire;
      if (valid && issue) break;
    }
  }
  const text = await spcOutlookText(day, ua);
  return JSON.stringify({
    day,
    queriedAt: { lat, lon },
    issued: issue,
    valid,
    expires: expire,
    atPoint,
    discussion: text ?? "(SPC text not retrieved)"
  }, null, 2);
}
__name(getSPCConvectiveOutlook, "getSPCConvectiveOutlook");
async function getSPCDay48Outlook(ua) {
  const url = "https://www.spc.noaa.gov/products/exper/day4-8/";
  let text = "";
  try {
    text = await fetchText("https://www.spc.noaa.gov/products/exper/day4-8/day48text.txt", ua, 1800);
  } catch {
    try {
      const list = await nwsJSON("https://api.weather.gov/products/types/SWO", ua, 600);
      const items = (list["@graph"] || []).filter((p) => /4.*8|D4.*D8|EXTENDED/i.test(p.productName || ""));
      if (items.length) {
        const id = items[0].id || items[0]["@id"]?.split("/").pop();
        const prod = await nwsJSON(`https://api.weather.gov/products/${id}`, ua, 600);
        text = prod.productText;
      }
    } catch {
    }
  }
  return JSON.stringify({ product: "SPC Day 4-8 Severe Weather Outlook", page: url, text: text || "(unable to retrieve)" }, null, 2);
}
__name(getSPCDay48Outlook, "getSPCDay48Outlook");
async function getSPCMesoscaleDiscussions(limit, ua) {
  const cap = Math.min(Math.max(limit || 10, 1), 30);
  const xml = await fetchText("https://www.spc.noaa.gov/products/spcmdrss.xml", ua, 120);
  const items = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRe.exec(xml)) && items.length < cap) {
    const block = m[1];
    const title2 = (block.match(/<title>([\s\S]*?)<\/title>/) || [, ""])[1];
    const link = (block.match(/<link>([\s\S]*?)<\/link>/) || [, ""])[1];
    const pub = (block.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [, ""])[1];
    const desc = (block.match(/<description>([\s\S]*?)<\/description>/) || [, ""])[1];
    const num = (title2.match(/#?(\d{3,5})/) || [, null])[1];
    items.push({
      number: num ? Number(num) : null,
      title: title2.replace(/<!\[CDATA\[|\]\]>/g, "").trim(),
      issued: pub,
      link,
      summary: desc.replace(/<!\[CDATA\[|\]\]>/g, "").replace(/<[^>]+>/g, " ").trim().slice(0, 400)
    });
  }
  return JSON.stringify({ count: items.length, items }, null, 2);
}
__name(getSPCMesoscaleDiscussions, "getSPCMesoscaleDiscussions");
async function getSPCMesoscaleDiscussion(num, ua) {
  if (!num || num < 1) throw new Error("MD number required");
  const padded = String(num).padStart(4, "0");
  const url = `https://www.spc.noaa.gov/products/md/md${padded}.html`;
  const html = await fetchText(url, ua, 1800);
  const pre = html.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i);
  const text = pre ? pre[1].replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">") : html.replace(/<[^>]+>/g, "");
  return JSON.stringify({ number: num, url, text: text.trim() }, null, 2);
}
__name(getSPCMesoscaleDiscussion, "getSPCMesoscaleDiscussion");
async function getSPCActiveWatches(ua) {
  const [torn, svr] = await Promise.all([
    nwsJSON("https://api.weather.gov/alerts/active?event=Tornado%20Watch", ua, 60),
    nwsJSON("https://api.weather.gov/alerts/active?event=Severe%20Thunderstorm%20Watch", ua, 60)
  ]);
  const all = [...torn.features || [], ...svr.features || []];
  const watches = all.map((f) => {
    const p = f.properties || {};
    const num = (p.headline?.match(/Watch\s+(\d+)/i) || [, null])[1];
    return {
      event: p.event,
      number: num ? Number(num) : null,
      severity: p.severity,
      certainty: p.certainty,
      urgency: p.urgency,
      sent: p.sent,
      effective: p.effective,
      expires: p.expires,
      areaDesc: p.areaDesc,
      headline: p.headline,
      senderName: p.senderName
    };
  });
  return JSON.stringify({ count: watches.length, watches }, null, 2);
}
__name(getSPCActiveWatches, "getSPCActiveWatches");
async function getSPCFireWeatherOutlook(day, ua) {
  if (![1, 2].includes(day)) throw new Error("day must be 1 or 2");
  const url = `https://www.spc.noaa.gov/products/fire_wx/fwdy${day}.txt`;
  const text = await fetchText(url, ua, 1800);
  return JSON.stringify({ product: `SPC Fire Weather Outlook Day ${day}`, url, text }, null, 2);
}
__name(getSPCFireWeatherOutlook, "getSPCFireWeatherOutlook");
async function getWPCQPF(ua) {
  const fetchOne = /* @__PURE__ */ __name(async (type) => {
    try {
      const list = await nwsJSON(
        `https://api.weather.gov/products/types/${type}`,
        ua,
        600
      );
      const items = list["@graph"] || [];
      if (!items.length) return null;
      const id = items[0].id || items[0]["@id"]?.split("/").pop();
      const prod = await nwsJSON(`https://api.weather.gov/products/${id}`, ua, 600);
      return { type, issued: prod.issuanceTime, text: prod.productText };
    } catch {
      return null;
    }
  }, "fetchOne");
  const [qpf, erd] = await Promise.all([fetchOne("QPF"), fetchOne("RBG")]);
  return JSON.stringify({
    qpf_discussion: qpf,
    excessive_rainfall_discussion: erd
  }, null, 2);
}
__name(getWPCQPF, "getWPCQPF");
async function getCPCOutlook(period, ua) {
  const urls = {
    "6-10day": [
      "https://www.cpc.ncep.noaa.gov/products/predictions/610day/610prnt.txt",
      "https://www.cpc.ncep.noaa.gov/products/predictions/610day/fxus06.txt"
    ],
    "8-14day": [
      "https://www.cpc.ncep.noaa.gov/products/predictions/814day/814prnt.txt",
      "https://www.cpc.ncep.noaa.gov/products/predictions/814day/fxus07.txt"
    ]
  };
  const list = urls[period];
  if (!list) throw new Error("period must be '6-10day' or '8-14day'");
  let text = null;
  for (const u of list) {
    try {
      text = await fetchText(u, ua, 3600);
      break;
    } catch {
    }
  }
  if (!text) text = "(unable to retrieve CPC text)";
  return JSON.stringify({ product: `CPC ${period} outlook discussion`, text }, null, 2);
}
__name(getCPCOutlook, "getCPCOutlook");
async function getDroughtMonitor(lat, lon, ua) {
  const geoUrl = `https://geo.fcc.gov/api/census/area?lat=${lat}&lon=${lon}&format=json`;
  const geoR = await fetch(geoUrl, {
    headers: { "User-Agent": ua, "Accept": "application/json" },
    cf: { cacheTtl: 86400, cacheEverything: true }
  });
  if (!geoR.ok) {
    const body = await geoR.text().catch(() => "");
    throw new Error(`FCC Geo API ${geoR.status}: ${body.slice(0, 200)}`);
  }
  const geoData = await geoR.json();
  const result = geoData?.results?.[0];
  if (!result?.county_fips) throw new Error("FCC Geo API returned no county FIPS for this location");
  const fips = result.county_fips;
  const countyName = result.county_name;
  const stateCode = result.state_code;
  const now = /* @__PURE__ */ new Date();
  const fmt = /* @__PURE__ */ __name((d) => `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`, "fmt");
  let usdmData = null;
  const todayStr = fmt(now);
  const usdmUrl1 = `https://usdmdataservices.unl.edu/api/CountyStatistics/GetDroughtSeverityStatisticsByAreaPercent?aoi=${fips}&startdate=${todayStr}&enddate=${todayStr}&statisticsType=1`;
  const usdmR1 = await fetch(usdmUrl1, {
    headers: { "User-Agent": ua, "Accept": "application/json" },
    cf: { cacheTtl: 21600, cacheEverything: true }
  });
  if (!usdmR1.ok) {
    const body = await usdmR1.text().catch(() => "");
    throw new Error(`USDM API ${usdmR1.status}: ${body.slice(0, 200)}`);
  }
  usdmData = await usdmR1.json();
  if (!usdmData || usdmData.length === 0) {
    const past = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1e3);
    const usdmUrl2 = `https://usdmdataservices.unl.edu/api/CountyStatistics/GetDroughtSeverityStatisticsByAreaPercent?aoi=${fips}&startdate=${fmt(past)}&enddate=${todayStr}&statisticsType=1`;
    const usdmR2 = await fetch(usdmUrl2, {
      headers: { "User-Agent": ua, "Accept": "application/json" },
      cf: { cacheTtl: 21600, cacheEverything: true }
    });
    if (!usdmR2.ok) {
      const body = await usdmR2.text().catch(() => "");
      throw new Error(`USDM API (14-day fallback) ${usdmR2.status}: ${body.slice(0, 200)}`);
    }
    usdmData = await usdmR2.json();
  }
  if (!usdmData || usdmData.length === 0) {
    throw new Error("USDM API returned no drought data for this county in the last 14 days");
  }
  const latest = usdmData[usdmData.length - 1];
  const coverage = {
    None: parseFloat(latest.None) || 0,
    D0: parseFloat(latest.D0) || 0,
    D1: parseFloat(latest.D1) || 0,
    D2: parseFloat(latest.D2) || 0,
    D3: parseFloat(latest.D3) || 0,
    D4: parseFloat(latest.D4) || 0
  };
  let dominant_class = "None";
  if (coverage.None <= 50) {
    const dLevels = [
      ["D0", coverage.D0],
      ["D1", coverage.D1],
      ["D2", coverage.D2],
      ["D3", coverage.D3],
      ["D4", coverage.D4]
    ];
    let maxPct = 0;
    for (const [label, pct] of dLevels) {
      if (pct > maxPct) {
        maxPct = pct;
        dominant_class = label;
      }
    }
    if (maxPct === 0) dominant_class = "None";
  }
  const validDate = latest.MapDate || latest.ValidStart || todayStr;
  return JSON.stringify({
    source: "U.S. Drought Monitor",
    point: { lat, lon },
    county: { fips, name: countyName, state: stateCode },
    valid_date: validDate,
    dominant_class,
    coverage
  }, null, 2);
}
__name(getDroughtMonitor, "getDroughtMonitor");

// src/tools.ts
var TOOLS = [
  {
    type: "function",
    function: {
      name: "get_forecast",
      description: "NWS 7-day forecast (12h periods) for a lat/lon. Returns named periods (Tonight, Wednesday, Wednesday Night, ...) with temps, winds, short and detailed text. Uses /points then /gridpoints/.../forecast.",
      parameters: {
        type: "object",
        properties: {
          lat: { type: "number", description: "Latitude. Omit to use default location." },
          lon: { type: "number", description: "Longitude. Omit to use default location." }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_hourly_forecast",
      description: "NWS hourly forecast for a lat/lon. Returns hourly temperature, wind, sky, precip probability. Pass `hours` to limit how many are returned.",
      parameters: {
        type: "object",
        properties: {
          lat: { type: "number" },
          lon: { type: "number" },
          hours: { type: "number", description: "Number of hours to return (default 36, max 156)." }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_active_alerts",
      description: "Active NWS alerts for a lat/lon: tornado / severe thunderstorm / flash flood / winter / red flag / fire weather warnings, watches, advisories, and statements. Returns event, severity, urgency, certainty, issuance/expiry, headline, areas, and full description.",
      parameters: {
        type: "object",
        properties: {
          lat: { type: "number" },
          lon: { type: "number" }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_afd",
      description: "Latest Area Forecast Discussion (AFD) from a local NWS WFO. Contains forecaster reasoning, synoptic analysis, model trends, key messages. Pass 3-letter office identifier (BMX=Birmingham, HUN=Huntsville, OUN=Norman, FWD=Fort Worth, LZK=Little Rock, MEG=Memphis, JAN=Jackson, etc).",
      parameters: {
        type: "object",
        properties: {
          office: { type: "string", description: "3-letter NWS WFO identifier" }
        },
        required: ["office"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_product",
      description: "Latest NWS text product of a given type from a specific office. Use for products beyond AFD: HWO (Hazardous Weather Outlook), PNS (Public Information Statement), LSR (Local Storm Reports), RER (Record Event Report), CLI (Climate report), NOW (Short Term Forecast), SPS (Special Weather Statement), FWF (Fire Weather Forecast), ESF (Hydrologic Outlook), etc.",
      parameters: {
        type: "object",
        properties: {
          type: { type: "string", description: "Product type code, e.g. HWO, LSR, FWF, SPS" },
          office: { type: "string", description: "3-letter office identifier" }
        },
        required: ["type", "office"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_spc_convective_outlook",
      description: "SPC Day 1/2/3 convective outlook. Returns: full forecaster discussion text, AND the categorical risk + tornado/wind/hail probability AT the supplied lat/lon (computed via point-in-polygon against SPC GeoJSON). Categorical labels: TSTM, MRGL, SLGT, ENH, MDT, HIGH. Tornado/wind/hail return percentage + significant (hatched) flag.",
      parameters: {
        type: "object",
        properties: {
          day: { type: "number", enum: [1, 2, 3], description: "Forecast day" },
          lat: { type: "number" },
          lon: { type: "number" }
        },
        required: ["day"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_spc_day48_outlook",
      description: "SPC Day 4-8 extended severe weather outlook (probabilistic, discussion-only). Use for setups multiple days out.",
      parameters: { type: "object", properties: {} }
    }
  },
  {
    type: "function",
    function: {
      name: "get_spc_mesoscale_discussions",
      description: "List of recent SPC Mesoscale Discussions (MDs). MDs are short-fuse products discussing watch potential or ongoing severe weather over a specific area. Returns MD number, issuance time, areas, concern. Use get_spc_mesoscale_discussion to fetch full text of a specific MD.",
      parameters: {
        type: "object",
        properties: {
          limit: { type: "number", description: "How many recent MDs to return (default 10, max 30)" }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_spc_mesoscale_discussion",
      description: "Full text of a specific SPC Mesoscale Discussion by MD number.",
      parameters: {
        type: "object",
        properties: { number: { type: "number" } },
        required: ["number"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_spc_active_watches",
      description: "Currently active SPC watches (Tornado Watch, Severe Thunderstorm Watch) nationwide. Returns event type, watch number (when available), headline, affected areas, expiry. Sourced from NWS alerts feed filtered to watch events.",
      parameters: { type: "object", properties: {} }
    }
  },
  {
    type: "function",
    function: {
      name: "get_spc_fire_weather_outlook",
      description: "SPC fire weather outlook for Day 1 or Day 2. Returns the forecaster discussion text covering elevated / critical / extremely critical fire weather areas.",
      parameters: {
        type: "object",
        properties: { day: { type: "number", enum: [1, 2] } },
        required: ["day"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_wpc_qpf",
      description: "WPC Quantitative Precipitation Forecast discussion and excessive rainfall outlook. Covers expected rainfall amounts and flash flood risk over the next 1\u20133 days.",
      parameters: { type: "object", properties: {} }
    }
  },
  {
    type: "function",
    function: {
      name: "get_cpc_outlook",
      description: "Climate Prediction Center 6-10 day or 8-14 day temperature and precipitation outlook discussion. Useful for medium-range pattern questions.",
      parameters: {
        type: "object",
        properties: { period: { type: "string", enum: ["6-10day", "8-14day"] } },
        required: ["period"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_drought_monitor",
      description: "U.S. Drought Monitor classification (None/D0/D1/D2/D3/D4) at the supplied lat/lon, plus current valid date.",
      parameters: {
        type: "object",
        properties: {
          lat: { type: "number" },
          lon: { type: "number" }
        }
      }
    }
  }
];
async function executeToolCall(name, input, defaultLoc, env2) {
  const ua = env2.NWS_USER_AGENT || "WeatherChatBot/1.0 (contact@example.com)";
  const lat = typeof input.lat === "number" ? input.lat : defaultLoc.lat;
  const lon = typeof input.lon === "number" ? input.lon : defaultLoc.lon;
  switch (name) {
    case "get_forecast":
      return getForecast(lat, lon, ua);
    case "get_hourly_forecast":
      return getHourlyForecast(lat, lon, input.hours || 36, ua);
    case "get_active_alerts":
      return getActiveAlerts(lat, lon, ua);
    case "get_afd":
      return getAFD(String(input.office), ua);
    case "get_product":
      return getProduct(String(input.type), String(input.office), ua);
    case "get_spc_convective_outlook":
      return getSPCConvectiveOutlook(Number(input.day), lat, lon, ua);
    case "get_spc_day48_outlook":
      return getSPCDay48Outlook(ua);
    case "get_spc_mesoscale_discussions":
      return getSPCMesoscaleDiscussions(input.limit || 10, ua);
    case "get_spc_mesoscale_discussion":
      return getSPCMesoscaleDiscussion(Number(input.number), ua);
    case "get_spc_active_watches":
      return getSPCActiveWatches(ua);
    case "get_spc_fire_weather_outlook":
      return getSPCFireWeatherOutlook(Number(input.day), ua);
    case "get_wpc_qpf":
      return getWPCQPF(ua);
    case "get_cpc_outlook":
      return getCPCOutlook(String(input.period), ua);
    case "get_drought_monitor":
      return getDroughtMonitor(lat, lon, ua);
    default:
      return `Unknown tool: ${name}`;
  }
}
__name(executeToolCall, "executeToolCall");

// src/ui.ts
var INDEX_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Weather Chat</title>
<style>
  :root {
    --bg: #0b1018;
    --panel: #131a26;
    --panel-2: #1a2333;
    --text: #e6edf6;
    --muted: #8a9bb4;
    --accent: #4ea1ff;
    --user: #1e3a5f;
    --asst: #18222f;
    --tool: #243248;
    --tool-fg: #b9c8de;
    --err: #ff6b6b;
    --ok: #59d28e;
    --border: #25304a;
    --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; height: 100%; background: var(--bg); color: var(--text);
    font: 15px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, sans-serif; }
  body { display: flex; flex-direction: column; }
  header { display: flex; align-items: center; gap: 12px; padding: 10px 16px;
    border-bottom: 1px solid var(--border); background: var(--panel); }
  header h1 { font-size: 15px; font-weight: 600; margin: 0; letter-spacing: 0.2px; }
  header .loc { color: var(--muted); font-size: 13px; }
  header button { background: transparent; color: var(--muted);
    border: 1px solid var(--border); border-radius: 6px; padding: 5px 10px; font-size: 12px; cursor: pointer; }
  header button:hover { color: var(--text); border-color: var(--accent); }
  header .spacer { margin-left: auto; }
  #geoBtn { background: var(--panel-2); }
  #geoBtn:disabled { opacity: 0.5; cursor: not-allowed; }
  #geoStatus { font-size: 12px; padding: 4px 10px; display: none; }
  #geoStatus.show { display: inline; }
  #geoStatus.error { color: var(--err); }
  #geoStatus.ok { color: var(--ok); }

  #settings { display: none; padding: 12px 16px; background: var(--panel-2); border-bottom: 1px solid var(--border); gap: 8px; flex-wrap: wrap; }
  #settings.open { display: flex; }
  #settings label { font-size: 12px; color: var(--muted); display: flex; flex-direction: column; gap: 3px; }
  #settings input { background: var(--bg); color: var(--text); border: 1px solid var(--border);
    border-radius: 5px; padding: 5px 8px; font: inherit; min-width: 90px; }
  #settings input[name=name] { min-width: 180px; }

  main { flex: 1; overflow-y: auto; padding: 20px 16px; max-width: 920px; width: 100%; margin: 0 auto; }
  .msg { margin: 16px 0; }
  .msg .role { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); margin-bottom: 4px; }
  .bubble { padding: 10px 14px; border-radius: 8px; white-space: pre-wrap; word-wrap: break-word; border: 1px solid var(--border); }
  .user .bubble { background: var(--user); }
  .assistant .bubble { background: var(--asst); }
  .bubble code { font-family: var(--mono); background: rgba(255,255,255,0.05); padding: 1px 4px; border-radius: 3px; }
  .bubble pre { font-family: var(--mono); font-size: 12.5px; line-height: 1.45; background: rgba(0,0,0,0.35);
    padding: 10px; border-radius: 6px; overflow-x: auto; margin: 8px 0; white-space: pre; }

  .trace { margin: 6px 0 8px; display: flex; flex-wrap: wrap; gap: 6px; }
  .tool { display: inline-flex; align-items: center; gap: 6px; background: var(--tool); color: var(--tool-fg);
    border: 1px solid var(--border); border-radius: 4px; padding: 3px 8px; font-size: 12px; font-family: var(--mono); cursor: pointer; }
  .tool .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--ok); }
  .tool.err .dot { background: var(--err); }
  .tool details { display: inline; }
  .tool-details { margin: 4px 0 10px; background: var(--panel); border: 1px solid var(--border);
    border-radius: 6px; padding: 8px; font-family: var(--mono); font-size: 12px; color: var(--tool-fg);
    white-space: pre-wrap; word-break: break-word; max-height: 320px; overflow: auto; }

  footer { border-top: 1px solid var(--border); background: var(--panel); padding: 10px 16px; }
  form { max-width: 920px; margin: 0 auto; display: flex; gap: 8px; align-items: flex-end; }
  textarea { flex: 1; background: var(--bg); color: var(--text); border: 1px solid var(--border);
    border-radius: 8px; padding: 10px 12px; font: inherit; resize: none; min-height: 44px; max-height: 160px; }
  textarea:focus { outline: 1px solid var(--accent); border-color: var(--accent); }
  button.send { background: var(--accent); color: #00121f; border: none; border-radius: 8px;
    padding: 10px 16px; font: inherit; font-weight: 600; cursor: pointer; }
  button.send:disabled { opacity: 0.5; cursor: not-allowed; }
  .empty { color: var(--muted); text-align: center; margin-top: 60px; font-size: 13px; }
  .empty .examples { margin-top: 14px; display: flex; flex-direction: column; gap: 6px; align-items: center; }
  .empty .examples button { background: transparent; color: var(--accent); border: 1px solid var(--border);
    border-radius: 6px; padding: 6px 12px; font: inherit; font-size: 13px; cursor: pointer; max-width: 600px; text-align: left; }
  .empty .examples button:hover { background: var(--panel); }
  .spinner { display: inline-block; width: 12px; height: 12px; border: 2px solid var(--muted); border-top-color: transparent;
    border-radius: 50%; animation: spin 0.7s linear infinite; vertical-align: middle; margin-left: 6px; }
  @keyframes spin { to { transform: rotate(360deg); } }
</style>
</head>
<body>
<header>
  <h1>\u26C8 Weather Chat</h1>
  <span class="loc" id="locLabel"></span>
  <span class="spacer"></span>
  <span id="geoStatus"></span>
  <button id="geoBtn">\u{1F4CD} Use my location</button>
  <button id="settingsBtn">Location</button>
  <button id="clearBtn">Clear</button>
</header>
<div id="settings">
  <label>Lat<input name="lat" type="number" step="0.0001" /></label>
  <label>Lon<input name="lon" type="number" step="0.0001" /></label>
  <label>NWS Office<input name="office" maxlength="3" /></label>
  <label>Name<input name="name" /></label>
  <button id="saveLoc" style="align-self:end;background:var(--accent);color:#00121f;border:none;border-radius:6px;padding:6px 12px;font:inherit;font-weight:600;cursor:pointer;">Save</button>
</div>
<main id="main">
  <div class="empty" id="empty">
    <div>Ask about weather, severe weather, fire weather, drought, or anything else.</div>
    <div class="examples">
      <button data-q="What's the severe weather risk for the next three days?">What's the severe weather risk for the next three days?</button>
      <button data-q="Summarize the latest BMX AFD.">Summarize the latest BMX AFD.</button>
      <button data-q="Any active mesoscale discussions affecting Alabama right now?">Any active mesoscale discussions affecting Alabama right now?</button>
      <button data-q="How does the next 7 days look? Any rain or storms?">How does the next 7 days look? Any rain or storms?</button>
      <button data-q="Current drought status and 6-10 day outlook for my area.">Current drought status and 6-10 day outlook for my area.</button>
    </div>
  </div>
</main>
<footer>
  <form id="form">
    <textarea id="input" placeholder="Ask about the forecast, severe risk, AFD, MDs..." autofocus></textarea>
    <button class="send" id="send" type="submit">Send</button>
  </form>
</footer>

<script>
const DEFAULT_LOC = { lat: 33.21, lon: -86.65, office: "BMX", name: "Shelby County, Alabama" };
let userLocation = JSON.parse(localStorage.getItem("wxchat.loc") || "null") || DEFAULT_LOC;
let messages = []; // {role, content, trace?}

const $ = (s) => document.querySelector(s);
const main = $("#main"), empty = $("#empty"), input = $("#input"), form = $("#form"), send = $("#send");
const locLabel = $("#locLabel");
const settingsPanel = $("#settings");

function renderLoc() {
  locLabel.textContent = userLocation.name + " (" + userLocation.lat + ", " + userLocation.lon + " | " + userLocation.office + ")";
  for (const k of ["lat","lon","office","name"]) settingsPanel.querySelector("[name="+k+"]").value = userLocation[k];
}
renderLoc();

$("#settingsBtn").onclick = () => settingsPanel.classList.toggle("open");
$("#saveLoc").onclick = () => {
  userLocation = {
    lat: parseFloat(settingsPanel.querySelector("[name=lat]").value),
    lon: parseFloat(settingsPanel.querySelector("[name=lon]").value),
    office: settingsPanel.querySelector("[name=office]").value.toUpperCase(),
    name: settingsPanel.querySelector("[name=name]").value
  };
  localStorage.setItem("wxchat.loc", JSON.stringify(userLocation));
  renderLoc();
  settingsPanel.classList.remove("open");
};
$("#clearBtn").onclick = () => { messages = []; render(); };

function escapeHtml(s){ return s.replace(/[&<>]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;"}[c])); }

function renderMessage(m) {
  const wrap = document.createElement("div");
  wrap.className = "msg " + m.role;
  const role = document.createElement("div");
  role.className = "role";
  role.textContent = m.role === "user" ? "You" : "Assistant";
  wrap.appendChild(role);

  if (m.trace && m.trace.length) {
    const tr = document.createElement("div");
    tr.className = "trace";
    for (const t of m.trace) {
      const btn = document.createElement("span");
      btn.className = "tool" + (t.ok ? "" : " err");
      btn.innerHTML = '<span class="dot"></span>' + escapeHtml(t.name) + (t.ms ? '<span style="color:var(--muted)">' + t.ms + 'ms</span>' : '');
      const detail = document.createElement("div");
      detail.className = "tool-details";
      detail.style.display = "none";
      detail.textContent = "input: " + JSON.stringify(t.input || {}, null, 2) + "\\n\\n" + (t.error ? "error: " + t.error : "preview: " + (t.preview || ""));
      btn.onclick = () => { detail.style.display = detail.style.display === "none" ? "block" : "none"; };
      tr.appendChild(btn);
      tr.appendChild(detail);
    }
    wrap.appendChild(tr);
  }

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerHTML = renderMarkdown(m.content || "");
  wrap.appendChild(bubble);
  return wrap;
}

// Tiny markdown renderer: code fences, inline code, bold, italics, line breaks
function renderMarkdown(text) {
  let s = escapeHtml(text);
  s = s.replace(/\`\`\`([\\s\\S]*?)\`\`\`/g, (_, code) => '<pre>' + code.trim() + '</pre>');
  s = s.replace(/\`([^\`]+)\`/g, '<code>$1</code>');
  s = s.replace(/\\*\\*([^*]+)\\*\\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\\*([^*]+)\\*/g, '$1<em>$2</em>');
  return s;
}

function render() {
  main.querySelectorAll(".msg").forEach(n => n.remove());
  empty.style.display = messages.length ? "none" : "block";
  for (const m of messages) main.appendChild(renderMessage(m));
  main.scrollTop = main.scrollHeight;
}

async function ask(text) {
  if (!text.trim()) return;
  messages.push({ role: "user", content: text });
  render();
  input.value = "";
  input.style.height = "auto";
  send.disabled = true;

  // Placeholder assistant bubble while waiting
  const placeholder = { role: "assistant", content: "Thinking...", trace: [] };
  messages.push(placeholder);
  const placeholderEl = renderMessage(placeholder);
  // Add spinner
  placeholderEl.querySelector(".bubble").innerHTML = '<span style="color:var(--muted)">Thinking<span class="spinner"></span></span>';
  main.appendChild(placeholderEl);
  main.scrollTop = main.scrollHeight;

  try {
    // Strip placeholder from outbound history
    const outbound = messages.slice(0, -1).map(({role, content}) => ({ role, content }));
    const resp = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ messages: outbound, location: userLocation })
    });
    const data = await resp.json();
    messages.pop(); // remove placeholder
    if (!resp.ok) {
      messages.push({ role: "assistant", content: "Error: " + (data.error || "unknown") + (data.details ? "\\n\\n" + JSON.stringify(data.details).slice(0,500) : ""), trace: data.trace || [] });
    } else {
      messages.push({ role: "assistant", content: data.response || "(no response)", trace: data.trace || [] });
    }
    render();
  } catch (e) {
    messages.pop();
    messages.push({ role: "assistant", content: "Network error: " + e.message });
    render();
  } finally {
    send.disabled = false;
    input.focus();
  }
}

form.onsubmit = (e) => { e.preventDefault(); ask(input.value); };
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); form.requestSubmit(); }
});
input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = Math.min(input.scrollHeight, 160) + "px";
});

empty.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    input.value = e.target.dataset.q;
    form.requestSubmit();
  }
});

// --- Geolocation ---
const geoBtn = $("#geoBtn");
const geoStatus = $("#geoStatus");

function showGeoStatus(msg, isError) {
  geoStatus.textContent = msg;
  geoStatus.className = "show" + (isError ? " error" : " ok");
  if (!isError) setTimeout(() => { geoStatus.className = ""; }, 4000);
}

geoBtn.onclick = () => {
  if (!navigator.geolocation) {
    showGeoStatus("Geolocation not supported by your browser", true);
    return;
  }
  geoBtn.disabled = true;
  geoStatus.className = "show";
  geoStatus.textContent = "Getting location...";

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = Math.round(pos.coords.latitude * 10000) / 10000;
      const lon = Math.round(pos.coords.longitude * 10000) / 10000;
      geoStatus.textContent = "Resolving NWS grid...";
      try {
        const resp = await fetch("https://api.weather.gov/points/" + lat + "," + lon, {
          headers: { "User-Agent": "WeatherChatBot/1.0", "Accept": "application/geo+json" }
        });
        if (!resp.ok) throw new Error("NWS API returned " + resp.status);
        const data = await resp.json();
        const props = data.properties || {};
        const office = (props.gridId || "").toUpperCase();
        const city = props.relativeLocation?.properties?.city || "";
        const state = props.relativeLocation?.properties?.state || "";
        const name = city && state ? city + ", " + state : "Lat " + lat + ", Lon " + lon;

        userLocation = { lat, lon, office, name };
        localStorage.setItem("wxchat.loc", JSON.stringify(userLocation));
        renderLoc();
        settingsPanel.classList.remove("open");
        showGeoStatus("Location set!", false);
      } catch (err) {
        showGeoStatus("NWS lookup failed: " + err.message, true);
      } finally {
        geoBtn.disabled = false;
      }
    },
    (err) => {
      geoBtn.disabled = false;
      const msgs = {
        1: "Location permission denied",
        2: "Position unavailable",
        3: "Location request timed out"
      };
      showGeoStatus(msgs[err.code] || "Geolocation error", true);
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
  );
};
<\/script>
</body>
</html>`;

// src/index.ts
var MAX_TOOL_ITERATIONS = 12;
var index_default = {
  async fetch(request, env2) {
    const url = new URL(request.url);
    if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) {
      return new Response(INDEX_HTML, {
        headers: { "content-type": "text/html; charset=utf-8" }
      });
    }
    if (request.method === "POST" && url.pathname === "/api/chat") {
      return handleChat(request, env2);
    }
    if (request.method === "GET" && url.pathname === "/api/health") {
      return Response.json({ ok: true, ts: (/* @__PURE__ */ new Date()).toISOString() });
    }
    return new Response("Not found", { status: 404 });
  }
};
function defaultLocation(env2) {
  return {
    lat: parseFloat(env2.DEFAULT_LAT || "33.21"),
    lon: parseFloat(env2.DEFAULT_LON || "-86.65"),
    office: env2.DEFAULT_OFFICE || "BMX",
    name: env2.DEFAULT_LOCATION_NAME || "Shelby County, Alabama"
  };
}
__name(defaultLocation, "defaultLocation");
async function handleChat(request, env2) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const userTurns = Array.isArray(body.messages) ? body.messages : [];
  const location = { ...defaultLocation(env2), ...body.location || {} };
  const model = body.model || env2.MODEL || "@cf/moonshotai/kimi-k2.6";
  const messages = [
    { role: "system", content: buildSystemPrompt(location) },
    ...userTurns
  ];
  const trace3 = [];
  try {
    for (let i = 0; i < MAX_TOOL_ITERATIONS; i++) {
      const resp = await env2.AI.run(model, {
        messages,
        tools: TOOLS,
        tool_choice: "auto",
        max_completion_tokens: 4096,
        temperature: 0.4
      });
      const choice = resp?.choices?.[0];
      if (!choice) {
        return Response.json({ error: "No choice in AI response", raw: resp, trace: trace3 }, { status: 502 });
      }
      const msg = choice.message;
      const finishReason = choice.finish_reason;
      const assistantMsg = {
        role: "assistant",
        content: msg.content ?? null
      };
      if (msg.tool_calls && msg.tool_calls.length) {
        assistantMsg.tool_calls = msg.tool_calls;
      }
      messages.push(assistantMsg);
      const hasToolCalls = msg.tool_calls && msg.tool_calls.length > 0;
      if (!hasToolCalls || finishReason !== "tool_calls" && finishReason !== "function_call") {
        return Response.json({
          response: typeof msg.content === "string" ? msg.content : "",
          messages: messages.slice(1),
          // drop system on return
          trace: trace3,
          stop_reason: finishReason,
          usage: resp.usage
        });
      }
      const results = await Promise.all(
        msg.tool_calls.map(async (tc) => {
          const name = tc.function?.name;
          let args = {};
          try {
            args = tc.function?.arguments ? JSON.parse(tc.function.arguments) : {};
          } catch (e) {
            args = {};
            trace3.push({ name, error: `Invalid JSON args: ${e.message}`, ok: false });
          }
          const started = Date.now();
          try {
            const out = await executeToolCall(name, args, location, env2);
            const text = typeof out === "string" ? out : JSON.stringify(out);
            trace3.push({
              name,
              input: args,
              ms: Date.now() - started,
              preview: text.slice(0, 280),
              ok: true
            });
            return {
              role: "tool",
              tool_call_id: tc.id,
              content: text
            };
          } catch (e) {
            trace3.push({ name, input: args, ms: Date.now() - started, error: e.message, ok: false });
            return {
              role: "tool",
              tool_call_id: tc.id,
              content: `Error: ${e.message}`
            };
          }
        })
      );
      for (const r of results) messages.push(r);
    }
    return Response.json({ error: "Hit max tool iterations", trace: trace3, messages: messages.slice(1) }, { status: 500 });
  } catch (e) {
    return Response.json({ error: e.message, stack: e.stack, trace: trace3 }, { status: 500 });
  }
}
__name(handleChat, "handleChat");
function buildSystemPrompt(loc) {
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  return `You are a senior operational meteorologist with deep expertise in severe convective weather, mesoscale analysis, fire weather, hydrology, winter weather, and seasonal climate. You are advising a technically sophisticated user (an emergency physician who follows weather closely) who wants substantive, jargon-appropriate discussion.

Today is ${today}. Default location: ${loc.name} (lat ${loc.lat}, lon ${loc.lon}). Local NWS WFO: ${loc.office}. If the user does not specify a location, assume this one.

You have live-data tools for NWS (api.weather.gov), the Storm Prediction Center, WPC, and CPC. Be aggressive about calling them \u2014 never guess at current conditions, current outlook category, active watches/MDs, or AFD content when you can fetch them. It is normal and expected to call several tools per turn, often in parallel.

Tool selection guidance:
- General "what's the weather" \u2192 get_forecast (plus get_active_alerts if anything plausibly active).
- "Severe risk?" \u2192 get_spc_convective_outlook for relevant days, get_spc_active_watches, get_spc_mesoscale_discussions, get_active_alerts.
- "What is BMX/HUN/OUN saying?" \u2192 get_afd for that office.
- Ongoing event ("storms right now") \u2192 get_active_alerts + get_spc_mesoscale_discussions, then get_spc_mesoscale_discussion for the relevant MD.
- Multi-day severe setup \u2192 outlook Day 1/2/3, plus get_spc_day48_outlook if user asks farther out.
- Fire weather \u2192 get_spc_fire_weather_outlook plus AFD if local concerns.
- Rain / flood \u2192 get_wpc_qpf + get_active_alerts.
- Drought / long-range \u2192 get_cpc_outlook.

Style:
- Use real meteorological terminology: CAPE/MUCAPE/MLCAPE, 0\u20131 km / 0\u20136 km bulk shear, SRH, EHI, STP, EML, dryline, warm sector, LLJ, RAP/HRRR/NAM/GFS guidance, LCL/LFC, hodograph curvature, etc.
- Quote SPC category codes explicitly (TSTM, MRGL, SLGT, ENH, MDT, HIGH) and quote tornado/wind/hail probability percentages with hatched (significant) status when present.
- When summarizing an AFD, preserve forecaster reasoning and explicit uncertainty/confidence statements \u2014 don't strip the nuance.
- Be direct and quantify. Cite product/MD numbers and issuance times when relevant.
- Do not over-explain basic concepts unless asked. Be candid about forecast uncertainty rather than hedging.`;
}
__name(buildSystemPrompt, "buildSystemPrompt");
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
