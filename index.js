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
function parseISODurationMs(dur) {
  const m = /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/.exec(dur || "");
  if (!m) return 36e5;
  const d = +(m[1] || 0), h = +(m[2] || 0), mi = +(m[3] || 0), s = +(m[4] || 0);
  const ms = ((d * 24 + h) * 60 + mi) * 6e4 + s * 1e3;
  return ms || 36e5;
}
__name(parseISODurationMs, "parseISODurationMs");
function gridSeriesToHourly(prop, startMs, hours, conv) {
  const out = new Array(hours).fill(null);
  if (!prop || !Array.isArray(prop.values)) return out;
  const intervals = [];
  for (const v of prop.values) {
    const vt = String(v.validTime);
    const slash = vt.indexOf("/");
    const startISO = slash >= 0 ? vt.slice(0, slash) : vt;
    const durMs = slash >= 0 ? parseISODurationMs(vt.slice(slash + 1)) : 36e5;
    const s = Date.parse(startISO);
    if (isNaN(s)) continue;
    intervals.push({ s, e: s + durMs, val: v.value });
  }
  intervals.sort((a, b) => a.s - b.s);
  for (let i = 0; i < hours; i++) {
    const t = startMs + i * 36e5;
    let val = null;
    for (const iv of intervals) {
      if (iv.s > t) break;
      if (t >= iv.s && t < iv.e) { val = iv.val; break; }
    }
    out[i] = val == null ? null : conv ? conv(val) : Math.round(val);
  }
  return out;
}
__name(gridSeriesToHourly, "gridSeriesToHourly");
function gridAccumHourly(prop, startMs, hours) {
  const out = new Array(hours).fill(null);
  if (!prop || !Array.isArray(prop.values)) return out;
  const iv = [];
  for (const v of prop.values) {
    if (v.value == null) continue;
    const vt = String(v.validTime);
    const slash = vt.indexOf("/");
    const s = Date.parse(slash >= 0 ? vt.slice(0, slash) : vt);
    if (isNaN(s)) continue;
    const durMs = slash >= 0 ? parseISODurationMs(vt.slice(slash + 1)) : 36e5;
    iv.push({ s, e: s + durMs, perHrMm: v.value * 36e5 / durMs });
  }
  iv.sort((a, b) => a.s - b.s);
  for (let i = 0; i < hours; i++) {
    const t = startMs + i * 36e5;
    let val = null;
    for (const x of iv) { if (x.s > t) break; if (t >= x.s && t < x.e) { val = x.perHrMm; break; } }
    out[i] = val == null ? null : Math.round(val * 0.0393701 * 1e3) / 1e3;
  }
  return out;
}
__name(gridAccumHourly, "gridAccumHourly");
async function getGridpointSeries(lat, lon, ua, hours) {
  const H = Math.min(Math.max(hours || 48, 1), 156);
  const pt = await pointInfo(lat, lon, ua);
  const gridUrl = pt.properties?.forecastGridData;
  if (!gridUrl) throw new Error("no gridpoint data url");
  const g = await nwsJSON(gridUrl, ua, 900);
  const P = g.properties || {};
  const startMs = Math.floor(Date.now() / 36e5) * 36e5;
  const c2f = /* @__PURE__ */ __name((v) => Math.round((v * 9 / 5 + 32) * 10) / 10, "c2f");
  const kmh2mph = /* @__PURE__ */ __name((v) => Math.round(v * 0.621371), "kmh2mph");
  const mm2in = /* @__PURE__ */ __name((v) => Math.round(v * 0.0393701 * 100) / 100, "mm2in");
  const times = [];
  for (let i = 0; i < H; i++) times.push(new Date(startMs + i * 36e5).toISOString());
  const series = {
    start: new Date(startMs).toISOString(),
    hours: H,
    times,
    temp_F: gridSeriesToHourly(P.temperature, startMs, H, c2f),
    dewpoint_F: gridSeriesToHourly(P.dewpoint, startMs, H, c2f),
    apparent_F: gridSeriesToHourly(P.apparentTemperature, startMs, H, c2f),
    pop: gridSeriesToHourly(P.probabilityOfPrecipitation, startMs, H, null),
    sky: gridSeriesToHourly(P.skyCover, startMs, H, null),
    wind_mph: gridSeriesToHourly(P.windSpeed, startMs, H, kmh2mph),
    gust_mph: gridSeriesToHourly(P.windGust, startMs, H, kmh2mph),
    windDir: gridSeriesToHourly(P.windDirection, startMs, H, null),
    rh: gridSeriesToHourly(P.relativeHumidity, startMs, H, null),
    qpf_in: gridAccumHourly(P.quantitativePrecipitation, startMs, H)
  };
  // QPF is an ACCUMULATION per interval (e.g. a 6-hour block total), so sum the
  // raw intervals prorated by their overlap with the window — never the per-hour
  // replicated array, which would multiply each block total by its hour count.
  const accumOverWindow = /* @__PURE__ */ __name((prop, winStart, winEnd) => {
    if (!prop || !Array.isArray(prop.values)) return null;
    let total = 0, any = false;
    for (const v of prop.values) {
      if (v.value == null) continue;
      const vt = String(v.validTime);
      const slash = vt.indexOf("/");
      const s = Date.parse(slash >= 0 ? vt.slice(0, slash) : vt);
      if (isNaN(s)) continue;
      const durMs = slash >= 0 ? parseISODurationMs(vt.slice(slash + 1)) : 36e5;
      const ov = Math.min(s + durMs, winEnd) - Math.max(s, winStart);
      if (ov > 0) { total += v.value * (ov / durMs); any = true; }
    }
    return any ? total : null;
  }, "accumOverWindow");
  const maxp = /* @__PURE__ */ __name((arr, n) => {
    let m = null;
    for (let i = 0; i < Math.min(n, arr.length); i++) if (arr[i] != null && (m == null || arr[i] > m)) m = arr[i];
    return m;
  }, "maxp");
  const qpf24mm = accumOverWindow(P.quantitativePrecipitation, startMs, startMs + 24 * 36e5);
  const qpf48mm = accumOverWindow(P.quantitativePrecipitation, startMs, startMs + 48 * 36e5);
  series.qpf24_in = qpf24mm == null ? null : mm2in(qpf24mm);
  series.qpf48_in = qpf48mm == null ? null : mm2in(qpf48mm);
  series.popMax24 = maxp(series.pop, 24);
  series.popMax48 = maxp(series.pop, 48);
  return series;
}
__name(getGridpointSeries, "getGridpointSeries");
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
async function getCurrentObservations(lat, lon, ua) {
  const la = Math.round(lat * 1e4) / 1e4;
  const lo = Math.round(lon * 1e4) / 1e4;
  const stationsResp = await nwsJSON(`https://api.weather.gov/points/${la},${lo}/stations`, ua, 3600);
  const features = stationsResp.features || [];
  if (!features.length) throw new Error("No NWS stations near this location");
  const c2f = /* @__PURE__ */ __name((v) => v == null ? null : Math.round((v * 9 / 5 + 32) * 10) / 10, "c2f");
  const mps2mph = /* @__PURE__ */ __name((v) => v == null ? null : Math.round(v * 2.237), "mps2mph");
  const m2mi = /* @__PURE__ */ __name((v) => v == null ? null : Math.round(v * 6.21371e-4 * 10) / 10, "m2mi");
  const pa2inhg = /* @__PURE__ */ __name((v) => v == null ? null : Math.round(v * 2.953e-4 * 100) / 100, "pa2inhg");
  const mm2in = /* @__PURE__ */ __name((v) => v == null ? null : Math.round(v * 0.0393701 * 100) / 100, "mm2in");
  let lastErr = null;
  for (let i = 0; i < Math.min(features.length, 4); i++) {
    const sid = features[i].properties?.stationIdentifier;
    if (!sid) continue;
    try {
      const obs = await nwsJSON(`https://api.weather.gov/stations/${sid}/observations/latest`, ua, 300);
      const p = obs.properties || {};
      if (p.temperature?.value == null && p.windSpeed?.value == null && p.barometricPressure?.value == null) continue;
      return JSON.stringify({
        station: sid,
        stationName: features[i].properties?.name,
        distance_note: i === 0 ? "nearest station" : `station ${i + 1} of ${features.length} (closer stations had no data)`,
        observed: p.timestamp,
        textDescription: p.textDescription,
        temperature_F: c2f(p.temperature?.value),
        dewpoint_F: c2f(p.dewpoint?.value),
        humidity_pct: p.relativeHumidity?.value != null ? Math.round(p.relativeHumidity.value) : null,
        windSpeed_mph: mps2mph(p.windSpeed?.value),
        windGust_mph: mps2mph(p.windGust?.value),
        windDir_deg: p.windDirection?.value,
        visibility_mi: m2mi(p.visibility?.value),
        pressure_inHg: pa2inhg(p.barometricPressure?.value),
        seaLevelPressure_mb: p.seaLevelPressure?.value != null ? Math.round(p.seaLevelPressure.value / 100) : null,
        precipLastHour_in: mm2in(p.precipitationLastHour?.value),
        precipLast3Hour_in: mm2in(p.precipitationLast3Hours?.value),
        precipLast6Hour_in: mm2in(p.precipitationLast6Hours?.value),
        heatIndex_F: c2f(p.heatIndex?.value),
        windChill_F: c2f(p.windChill?.value)
      }, null, 2);
    } catch (e) {
      lastErr = e;
      continue;
    }
  }
  throw new Error(`No usable observations from nearby stations${lastErr ? `: ${lastErr.message}` : ""}`);
}
__name(getCurrentObservations, "getCurrentObservations");
async function getAirQuality(lat, lon, ua, apiKey) {
  if (!apiKey) {
    return JSON.stringify({
      error: "AirNow API key not configured",
      note: "Set AIRNOW_API_KEY in the Worker environment. Get a free key at https://docs.airnowapi.org/account/request/"
    });
  }
  const url = `https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude=${lat}&longitude=${lon}&distance=25&API_KEY=${apiKey}`;
  const r = await fetch(url, {
    headers: { "User-Agent": ua, "Accept": "application/json" },
    cf: { cacheTtl: 1800, cacheEverything: true }
  });
  if (!r.ok) throw new Error(`AirNow ${r.status}: ${(await r.text().catch(() => "")).slice(0, 200)}`);
  const data = await r.json();
  if (!data?.length) return JSON.stringify({ point: { lat, lon }, note: "No AirNow data within 25 miles" });
  const observations = data.map((d) => ({
    parameter: d.ParameterName,
    aqi: d.AQI,
    category: d.Category?.Name,
    category_number: d.Category?.Number,
    reportingArea: d.ReportingArea,
    state: d.StateCode,
    observed: `${d.DateObserved.trim()} ${d.HourObserved}:00 ${d.LocalTimeZone}`
  }));
  const worst = observations.reduce((a, b) => (b.aqi > (a?.aqi ?? -1) ? b : a), null);
  return JSON.stringify({
    point: { lat, lon },
    worst,
    observations
  }, null, 2);
}
__name(getAirQuality, "getAirQuality");
async function getRiverGauges(lat, lon, radiusMi, ua) {
  const r = Math.min(Math.max(radiusMi || 25, 1), 100);
  const dLat = r / 69;
  const dLon = r / (69 * Math.cos(lat * Math.PI / 180));
  const bbox = `${(lon - dLon).toFixed(4)},${(lat - dLat).toFixed(4)},${(lon + dLon).toFixed(4)},${(lat + dLat).toFixed(4)}`;
  const url = `https://waterservices.usgs.gov/nwis/iv/?format=json&bBox=${bbox}&parameterCd=00060,00065&siteStatus=active`;
  const resp = await fetch(url, {
    headers: { "User-Agent": ua, "Accept": "application/json" },
    cf: { cacheTtl: 900, cacheEverything: true }
  });
  if (!resp.ok) throw new Error(`USGS ${resp.status}`);
  const data = await resp.json();
  const ts = data?.value?.timeSeries || [];
  const sites = {};
  for (const series of ts) {
    const info = series.sourceInfo || {};
    const siteCode = info.siteCode?.[0]?.value;
    const name = info.siteName;
    const geo = info.geoLocation?.geogLocation || {};
    const variable = series.variable || {};
    const varCode = variable.variableCode?.[0]?.value;
    const unit = variable.unit?.unitCode;
    const lastValue = series.values?.[0]?.value?.slice(-1)?.[0];
    if (!siteCode || !lastValue) continue;
    if (!sites[siteCode]) {
      sites[siteCode] = { siteCode, name, lat: geo.latitude, lon: geo.longitude, readings: {} };
    }
    const key = varCode === "00060" ? "discharge_cfs" : varCode === "00065" ? "gauge_height_ft" : varCode;
    sites[siteCode].readings[key] = {
      value: parseFloat(lastValue.value),
      observed: lastValue.dateTime,
      unit
    };
  }
  const siteList = Object.values(sites);
  return JSON.stringify({
    point: { lat, lon },
    radius_mi: r,
    siteCount: siteList.length,
    sites: siteList.slice(0, 20)
  }, null, 2);
}
__name(getRiverGauges, "getRiverGauges");
async function getNHCTropical(ua) {
  try {
    const data = await fetchJSON("https://www.nhc.noaa.gov/CurrentStorms.json", ua, 600);
    const storms = (data.activeStorms || []).map((s) => ({
      id: s.id,
      name: s.name,
      classification: s.classification,
      intensity_kt: s.intensity,
      pressure_mb: s.pressure,
      lat: s.latitudeNumeric,
      lon: s.longitudeNumeric,
      movement: s.movementDir && s.movementSpeed ? `${s.movementDir} at ${s.movementSpeed} kt` : null,
      lastUpdate: s.lastUpdate,
      publicAdvisory: s.publicAdvisory?.url,
      forecastDiscussion: s.forecastDiscussion?.url,
      forecastGraphics: s.trackCone?.url
    }));
    return JSON.stringify({
      basinFocus: "Atlantic + East Pacific (active storms only)",
      count: storms.length,
      storms,
      note: storms.length === 0 ? "No active tropical cyclones in NHC's areas of responsibility." : void 0
    }, null, 2);
  } catch (e) {
    return JSON.stringify({ error: e.message });
  }
}
__name(getNHCTropical, "getNHCTropical");
async function getMetarTaf(station, ua) {
  const code = (station || "").trim().toUpperCase();
  if (!code) throw new Error("ICAO airport code required (e.g., KBHM, KHSV)");
  const [metarR, tafR] = await Promise.all([
    fetch(`https://aviationweather.gov/api/data/metar?ids=${code}&format=json&taf=false&hours=3`, {
      headers: { "User-Agent": ua, "Accept": "application/json" },
      cf: { cacheTtl: 300, cacheEverything: true }
    }),
    fetch(`https://aviationweather.gov/api/data/taf?ids=${code}&format=json`, {
      headers: { "User-Agent": ua, "Accept": "application/json" },
      cf: { cacheTtl: 1800, cacheEverything: true }
    })
  ]);
  const metar = metarR.ok ? await metarR.json().catch(() => []) : [];
  const taf = tafR.ok ? await tafR.json().catch(() => []) : [];
  return JSON.stringify({
    station: code,
    metar: (Array.isArray(metar) ? metar : []).slice(0, 3).map((m) => ({
      obsTime: m.reportTime,
      raw: m.rawOb,
      temp_c: m.temp,
      dewp_c: m.dewp,
      wdir_deg: m.wdir,
      wspd_kt: m.wspd,
      wgst_kt: m.wgst,
      visib_sm: m.visib,
      altim_hpa: m.altim,
      wxString: m.wxString,
      clouds: m.clouds
    })),
    taf: (Array.isArray(taf) ? taf : []).map((t) => ({
      issueTime: t.issueTime,
      raw: t.rawTAF,
      validFrom: t.validTimeFrom,
      validTo: t.validTimeTo
    }))
  }, null, 2);
}
__name(getMetarTaf, "getMetarTaf");
async function getStormReports(office, hours, ua) {
  const o = (office || "").trim().toUpperCase();
  const h = Math.min(Math.max(hours || 24, 1), 168);
  const url = o ? `https://mesonet.agron.iastate.edu/json/lsr.py?wfo=${o}&hours=${h}` : `https://mesonet.agron.iastate.edu/json/lsr.py?state=US&hours=${h}`;
  const data = await fetchJSON(url, ua, 300);
  const reports = (data.features || []).map((f) => {
    const p = f.properties || {};
    return {
      time: p.valid,
      event: p.typetext,
      magnitude: p.magnitude,
      city: p.city,
      county: p.county,
      state: p.st || p.state,
      remark: p.remark,
      source: p.source,
      lat: f.geometry?.coordinates?.[1],
      lon: f.geometry?.coordinates?.[0]
    };
  });
  return JSON.stringify({
    scope: o || "all US",
    hours: h,
    count: reports.length,
    reports: reports.slice(0, 60)
  }, null, 2);
}
__name(getStormReports, "getStormReports");
function getRadarImageUrl(siteCode) {
  const raw = (siteCode || "").trim().toUpperCase();
  const s = raw.startsWith("K") ? raw.slice(1) : raw;
  if (!s || s.length !== 3) throw new Error("Provide a 3-letter NEXRAD radar site code (e.g., BMX, HTX, TLX)");
  const full = `K${s}`;
  return JSON.stringify({
    site: full,
    base_reflectivity_loop: `https://radar.weather.gov/ridge/standard/${full}_loop.gif`,
    base_reflectivity_static: `https://radar.weather.gov/ridge/standard/${full}_0.gif`,
    interactive: `https://radar.weather.gov/station/${full.toLowerCase()}/standard`,
    note: "Loop GIF auto-updates every ~5 minutes. Embed _loop.gif as <img> for a live feed."
  }, null, 2);
}
__name(getRadarImageUrl, "getRadarImageUrl");
async function getAstronomy(lat, lon, ua) {
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=${today}&formatted=0`;
  let solar = null;
  try {
    const d = await fetchJSON(url, ua, 21600);
    solar = d?.results || null;
  } catch (e) {
    solar = { error: e.message };
  }
  const now = /* @__PURE__ */ new Date();
  const synodic = 2551443;
  const referenceNewMoon = Date.UTC(2000, 0, 6, 18, 14, 0) / 1e3;
  const elapsed = (now.getTime() / 1e3 - referenceNewMoon) % synodic;
  const phaseFrac = (elapsed < 0 ? elapsed + synodic : elapsed) / synodic;
  const phaseName = phaseFrac < 0.0625 || phaseFrac >= 0.9375 ? "New Moon" : phaseFrac < 0.1875 ? "Waxing Crescent" : phaseFrac < 0.3125 ? "First Quarter" : phaseFrac < 0.4375 ? "Waxing Gibbous" : phaseFrac < 0.5625 ? "Full Moon" : phaseFrac < 0.6875 ? "Waning Gibbous" : phaseFrac < 0.8125 ? "Last Quarter" : "Waning Crescent";
  const illumination = Math.round((1 - Math.cos(phaseFrac * 2 * Math.PI)) / 2 * 100);
  return JSON.stringify({
    point: { lat, lon },
    date: today,
    sun: solar ? {
      sunrise_UTC: solar.sunrise,
      sunset_UTC: solar.sunset,
      solar_noon_UTC: solar.solar_noon,
      day_length_seconds: solar.day_length,
      civil_twilight_begin_UTC: solar.civil_twilight_begin,
      civil_twilight_end_UTC: solar.civil_twilight_end,
      nautical_twilight_begin_UTC: solar.nautical_twilight_begin,
      nautical_twilight_end_UTC: solar.nautical_twilight_end,
      astronomical_twilight_begin_UTC: solar.astronomical_twilight_begin,
      astronomical_twilight_end_UTC: solar.astronomical_twilight_end
    } : null,
    moon: {
      phase: phaseName,
      phaseFraction: Math.round(phaseFrac * 1e3) / 1e3,
      illumination_pct: illumination
    }
  }, null, 2);
}
__name(getAstronomy, "getAstronomy");

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
  },
  {
    type: "function",
    function: {
      name: "get_current_observations",
      description: "Most recent surface observations from the nearest NWS observation station (METAR-equivalent). Returns temperature, dewpoint, humidity, wind speed/gust/dir, visibility, barometric pressure, recent precip, heat index, wind chill. Use this for 'what is it doing RIGHT NOW' questions — do not infer current conditions from the forecast.",
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
      name: "get_air_quality",
      description: "Current AirNow air-quality readings within 25 mi of a lat/lon. Returns AQI per pollutant (O3, PM2.5, PM10) plus category (Good/Moderate/Unhealthy for Sensitive Groups/Unhealthy/Very Unhealthy/Hazardous) and reporting area. Useful for respiratory/health-sensitive planning.",
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
      name: "get_river_gauges",
      description: "USGS active stream gauges within a radius (default 25 mi) of a lat/lon. Returns latest discharge (cfs) and gauge height (ft) per site. Use for flood monitoring and creek/river status during heavy rain events.",
      parameters: {
        type: "object",
        properties: {
          lat: { type: "number" },
          lon: { type: "number" },
          radius_mi: { type: "number", description: "Search radius in miles (default 25, max 100)" }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_nhc_tropical",
      description: "Active tropical cyclones from the National Hurricane Center (Atlantic + East Pacific). Returns each storm's classification (TD/TS/Hurricane category), intensity in kt, central pressure, position, motion, and links to public advisory / forecast discussion / track cone. Returns empty list when no active storms.",
      parameters: { type: "object", properties: {} }
    }
  },
  {
    type: "function",
    function: {
      name: "get_metar_taf",
      description: "Raw METAR (current conditions) and TAF (terminal aerodrome forecast) for an ICAO airport. Returns last ~3 METARs and current TAF. Common AL airports: KBHM (Birmingham), KHSV (Huntsville), KMOB (Mobile), KMGM (Montgomery), KTCL (Tuscaloosa). Useful when an airport is closer to the user than the nearest NWS observation station.",
      parameters: {
        type: "object",
        properties: {
          station: { type: "string", description: "4-letter ICAO airport identifier, e.g. KBHM" }
        },
        required: ["station"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_storm_reports",
      description: "Local Storm Reports (LSRs) from a specific NWS WFO or nationwide. Real-time ground truth: tornado touchdowns, hail size, wind damage, flash flood, snowfall amounts. Pass office (3-letter WFO) for that office's CWA, or omit for US-wide. Hours defaults to 24 (max 168). Sourced from Iowa State / NWS LSR feed.",
      parameters: {
        type: "object",
        properties: {
          office: { type: "string", description: "3-letter NWS WFO identifier; omit for nationwide" },
          hours: { type: "number", description: "Look-back window in hours (default 24, max 168)" }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_radar_image_url",
      description: "Returns ready-to-display NEXRAD radar image URLs for a 3-letter site code (e.g. BMX = Birmingham AL, HTX = Huntsville AL, MXX = Maxwell AFB, EOX = Fort Rucker). Loop GIF auto-updates every ~5 min. The UI will render the loop inline.",
      parameters: {
        type: "object",
        properties: {
          site: { type: "string", description: "3-letter NEXRAD site code (with or without leading K)" }
        },
        required: ["site"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_astronomy",
      description: "Sun and moon data for a lat/lon: sunrise, sunset, solar noon, civil/nautical/astronomical twilight (all UTC), plus moon phase name, fraction, and illumination percent. Use for golden-hour, twilight planning, dark-sky, or nocturnal wildlife/storm-spotting questions.",
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
    case "get_current_observations":
      return getCurrentObservations(lat, lon, ua);
    case "get_air_quality":
      return getAirQuality(lat, lon, ua, env2.AIRNOW_API_KEY);
    case "get_river_gauges":
      return getRiverGauges(lat, lon, input.radius_mi || 25, ua);
    case "get_nhc_tropical":
      return getNHCTropical(ua);
    case "get_metar_taf":
      return getMetarTaf(String(input.station || ""), ua);
    case "get_storm_reports":
      return getStormReports(input.office ? String(input.office) : "", input.hours || 24, ua);
    case "get_radar_image_url":
      return getRadarImageUrl(String(input.site || defaultLoc.office));
    case "get_astronomy":
      return getAstronomy(lat, lon, ua);
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
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#0c1220" />
<title>Weather Chat</title>
<style>
  :root {
    --bg-1: #060912;
    --bg-2: #0c1220;
    --panel: rgba(20, 28, 46, 0.7);
    --panel-solid: #141c2e;
    --border: rgba(99, 124, 175, 0.18);
    --border-bright: rgba(99, 124, 175, 0.35);
    --text: #e6edf6;
    --muted: #8b9bbb;
    --muted-2: #5d6e8c;
    --accent: #5ab9ff;
    --accent-2: #9c7eff;
    --accent-grad: linear-gradient(135deg, #5ab9ff 0%, #9c7eff 100%);
    --user: rgba(90, 185, 255, 0.12);
    --user-bd: rgba(90, 185, 255, 0.35);
    --tool-bg: rgba(36, 50, 72, 0.55);
    --ok: #51e0a3;
    --err: #ff7a7a;
    --warn: #ffb454;
    /* Dashboard surfaces & chart chrome — clean, crisp, low-mud */
    --surface: rgba(255,255,255,0.022);
    --surface-2: rgba(255,255,255,0.045);
    --surface-hi: rgba(255,255,255,0.06);
    --hair: rgba(255,255,255,0.08);
    --hair-bright: rgba(255,255,255,0.16);
    --grid: rgba(255,255,255,0.055);
    --ink-axis: #7386a6;
    --shadow-card: 0 1px 2px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.18);
    /* Validated categorical series colors (dark-mode steps) */
    --s-temp: #ff8f6b;
    --s-feels: #ffcf5c;
    --s-dew: #3fd39b;
    --s-pop: #56a8ff;
    --s-qpf: #9085e9;
    --s-wind: #b39dff;
    --s-gust: #7b8db0;
    --s-sky: #9aa7bf;
    --s-rh: #56c4d6;
    --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    --sans: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Ubuntu, sans-serif;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; }
  body {
    background:
      radial-gradient(1200px 800px at 80% -10%, rgba(156, 126, 255, 0.10), transparent 60%),
      radial-gradient(900px 600px at 0% 100%, rgba(90, 185, 255, 0.08), transparent 60%),
      linear-gradient(180deg, var(--bg-1) 0%, var(--bg-2) 100%);
    color: var(--text);
    font: 15px/1.55 var(--sans);
    -webkit-font-smoothing: antialiased;
  }
  .app { display: flex; height: 100vh; height: 100dvh; }

  /* Sidebar */
  .sidebar {
    width: 280px;
    background: linear-gradient(180deg, rgba(14,19,34,0.72) 0%, rgba(10,14,26,0.72) 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    transition: margin-left 0.22s ease;
  }
  .sidebar.collapsed { margin-left: -281px; }
  .sidebar-head { padding: 14px 14px 6px; display: flex; align-items: center; justify-content: space-between; }
  .brand { display: flex; align-items: center; gap: 10px; font-weight: 600; font-size: 15px; }
  .logo { font-size: 20px; line-height: 1; }
  .brand-name { background: var(--accent-grad); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; }
  .icon-btn { background: transparent; border: 1px solid var(--border); color: var(--muted); border-radius: 6px; padding: 4px 8px; cursor: pointer; font-size: 13px; font: inherit; font-size: 13px; }
  .icon-btn:hover { color: var(--text); border-color: var(--border-bright); }
  .new-chat { margin: 6px 14px 12px; padding: 9px 12px; background: var(--accent-grad); color: #001a2a; font-weight: 600; border: none; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 8px; justify-content: center; font: inherit; font-size: 13.5px; font-weight: 600; }
  .new-chat:hover { filter: brightness(1.08); }
  .new-chat .plus { font-size: 18px; line-height: 1; }
  .threads { flex: 1; overflow-y: auto; padding: 0 8px 8px; }
  .thread-empty { padding: 12px 10px; color: var(--muted-2); font-size: 12px; text-align: center; }
  .thread-item { padding: 8px 10px 9px; border-radius: 7px; cursor: pointer; margin-bottom: 2px; position: relative; transition: background 0.12s; }
  .thread-item:hover { background: rgba(255,255,255,0.03); }
  .thread-item.active { background: rgba(90, 185, 255, 0.10); }
  .thread-title { font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 22px; }
  .thread-meta { font-size: 11px; color: var(--muted-2); margin-top: 2px; }
  .thread-del { position: absolute; right: 4px; top: 6px; opacity: 0; background: transparent; border: none; color: var(--muted); cursor: pointer; font-size: 16px; padding: 2px 6px; line-height: 1; border-radius: 4px; }
  .thread-item:hover .thread-del { opacity: 1; }
  .thread-del:hover { color: var(--err); background: rgba(255,122,122,0.08); }
  .sidebar-foot { border-top: 1px solid var(--border); padding: 10px 10px 12px; }
  .loc-picker { position: relative; min-width: 0; flex: 1; max-width: 320px; }
  .loc-current { display: flex; align-items: center; gap: 8px; padding: 6px 10px; border: 1px solid var(--border); border-radius: 8px; cursor: pointer; background: rgba(255,255,255,0.015); transition: all 0.12s; }
  .loc-current:hover { border-color: var(--border-bright); background: rgba(255,255,255,0.03); }
  .loc-current .lc-body { flex: 1; min-width: 0; }
  .loc-current .lc-name { font-size: 13.5px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .loc-current .lc-sub { font-size: 11px; color: var(--muted-2); margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .loc-current .lc-caret { color: var(--muted-2); font-size: 12px; transition: transform 0.18s; }
  .loc-picker.open .lc-caret { transform: rotate(180deg); }
  .loc-menu { display: none; position: absolute; top: calc(100% + 6px); left: 0; right: 0; background: var(--panel-solid); border: 1px solid var(--border-bright); border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.4); padding: 6px; z-index: 20; max-height: 60vh; overflow-y: auto; min-width: 260px; }
  .loc-picker.open .loc-menu { display: block; }
  .loc-menu-item { display: flex; align-items: center; gap: 8px; padding: 7px 10px; border-radius: 6px; cursor: pointer; position: relative; }
  .loc-menu-item:hover { background: rgba(90,185,255,0.08); }
  .loc-menu-item.active { background: rgba(90,185,255,0.12); }
  .loc-menu-item .lm-body { flex: 1; min-width: 0; }
  .loc-menu-item .lm-name { font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .loc-menu-item .lm-sub { font-size: 10.5px; color: var(--muted-2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .loc-menu-item .lm-actions { display: flex; gap: 2px; opacity: 0; transition: opacity 0.12s; }
  .loc-menu-item:hover .lm-actions { opacity: 1; }
  .loc-menu-item .lm-actions button { background: transparent; border: none; color: var(--muted); font-size: 12px; padding: 3px 6px; cursor: pointer; border-radius: 4px; line-height: 1; }
  .loc-menu-item .lm-actions button:hover { color: var(--text); background: rgba(255,255,255,0.05); }
  .loc-menu-item .lm-actions button.del:hover { color: var(--err); }
  .loc-menu-sep { height: 1px; background: var(--border); margin: 4px 6px; }
  .loc-menu-action { display: flex; align-items: center; gap: 8px; width: 100%; background: transparent; border: none; color: var(--muted); padding: 7px 10px; border-radius: 6px; cursor: pointer; font: inherit; font-size: 12.5px; text-align: left; }
  .loc-menu-action:hover { color: var(--text); background: rgba(255,255,255,0.04); }
  .loc-search { width: 100%; background: rgba(0,0,0,0.3); color: var(--text); border: 1px solid var(--border); border-radius: 7px; padding: 8px 10px; font: inherit; font-size: 13px; margin-bottom: 6px; }
  .loc-search::placeholder { color: var(--muted-2); }
  .loc-search:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(90,185,255,0.10); }
  .loc-results { margin-bottom: 4px; }
  .loc-result { display: flex; align-items: center; gap: 8px; padding: 7px 10px; border-radius: 6px; cursor: pointer; }
  .loc-result:hover { background: rgba(90,185,255,0.08); }
  .loc-result .lr-body { flex: 1; min-width: 0; }
  .loc-result .lr-name { font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .loc-result .lr-sub { font-size: 10.5px; color: var(--muted-2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .loc-result.busy { opacity: 0.5; pointer-events: none; }
  .loc-hint { padding: 8px 10px; font-size: 12px; color: var(--muted-2); }
  .loc-saved-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.07em; color: var(--muted-2); padding: 4px 10px 2px; }

  /* Modal */
  .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.55); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); display: none; align-items: center; justify-content: center; z-index: 100; padding: 16px; }
  .modal-backdrop.open { display: flex; }
  .modal { background: var(--panel-solid); border: 1px solid var(--border-bright); border-radius: 12px; box-shadow: 0 16px 48px rgba(0,0,0,0.5); width: 100%; max-width: 440px; max-height: 90vh; overflow: auto; }
  .modal-head { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px 10px; border-bottom: 1px solid var(--border); }
  .modal-head h3 { margin: 0; font-size: 15px; font-weight: 600; }
  .modal-close { background: transparent; border: none; color: var(--muted); font-size: 22px; cursor: pointer; line-height: 1; padding: 0 4px; border-radius: 4px; }
  .modal-close:hover { color: var(--text); background: rgba(255,255,255,0.05); }
  .modal-body { padding: 14px 16px; display: flex; flex-direction: column; gap: 12px; }
  .modal-body label { display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: var(--muted); }
  .modal-body label .help { color: var(--muted-2); font-weight: normal; }
  .modal-body input { background: rgba(0,0,0,0.3); color: var(--text); border: 1px solid var(--border); border-radius: 7px; padding: 9px 11px; font: inherit; font-size: 14px; }
  .modal-body input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(90,185,255,0.10); }
  .modal-body .row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .modal-body details { border: 1px solid var(--border); border-radius: 7px; padding: 6px 10px; }
  .modal-body details summary { cursor: pointer; font-size: 12px; color: var(--muted); padding: 4px 0; }
  .modal-body details[open] summary { margin-bottom: 8px; }
  .modal-body details .row label { font-size: 11px; }
  .modal-error { color: var(--err); font-size: 12px; min-height: 16px; }
  .modal-info { color: var(--muted); font-size: 12px; }
  .modal-foot { display: flex; gap: 8px; justify-content: flex-end; padding: 10px 16px 14px; border-top: 1px solid var(--border); }
  .modal-foot button { background: var(--accent-grad); color: #001a2a; border: none; border-radius: 7px; padding: 8px 16px; font: inherit; font-weight: 600; font-size: 13px; cursor: pointer; min-width: 80px; }
  .modal-foot button.secondary { background: transparent; border: 1px solid var(--border); color: var(--muted); font-weight: normal; }
  .modal-foot button.secondary:hover { color: var(--text); border-color: var(--border-bright); }
  .modal-foot button:disabled { opacity: 0.5; cursor: not-allowed; }
  .spin-mini { display: inline-block; width: 11px; height: 11px; border: 2px solid currentColor; border-top-color: transparent; border-radius: 50%; animation: spinMini 0.7s linear infinite; vertical-align: -1px; margin-right: 5px; }
  @keyframes spinMini { to { transform: rotate(360deg); } }

  /* Main */
  .main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
  .topbar { display: flex; align-items: center; gap: 14px; padding: 12px 18px; border-bottom: 1px solid var(--border); background: rgba(14, 19, 34, 0.45); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
  .now-card { display: flex; align-items: center; gap: 14px; min-width: 0; flex: 1; }
  .now-cond { display: flex; align-items: center; gap: 10px; padding: 5px 14px; background: var(--surface-2); border: 1px solid var(--hair); border-radius: 999px; font-size: 13px; }
  .now-temp { font-weight: 700; font-size: 15px; }
  .now-desc { color: var(--muted); }
  .spacer { flex: 1; }
  .mobile-only { display: none; }
  #sidebarOpen { display: none; }
  .sidebar.collapsed + .main #sidebarOpen { display: inline-flex; }
  .geo-status { font-size: 12px; padding: 4px 8px; transition: opacity 0.2s; }
  .geo-status.error { color: var(--err); }
  .geo-status.ok { color: var(--ok); }

  /* At-a-glance forecast briefing (below the quick options) */
  .wx-summary { display: flex; align-items: flex-start; gap: 11px; margin: 0 0 4px; padding: 14px 18px; text-align: left; border: 1px solid var(--hair); border-radius: 14px; background: radial-gradient(120% 160% at 0% 0%, rgba(86,168,255,0.07), transparent 60%), var(--surface-2); box-shadow: var(--shadow-card); font-size: 14px; line-height: 1.55; color: var(--text); }
  .wx-summary[hidden] { display: none; }
  .wx-summary-icon { color: var(--accent); font-size: 15px; flex-shrink: 0; line-height: 1.5; }
  .wx-summary-text { min-width: 0; }
  .wx-summary.loading .wx-summary-text { color: var(--muted); }
  .wx-summary.loading .wx-summary-icon { animation: dotPulse 1.4s ease-in-out infinite; }
  .topbar-new { display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; background: var(--accent-grad); color: #001a2a; border: none; border-radius: 8px; padding: 7px 13px; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; transition: filter 0.12s, transform 0.12s; }
  .topbar-new:hover { filter: brightness(1.08); }
  .topbar-new:active { transform: scale(0.97); }
  .topbar-new .tn-icon { font-size: 14px; line-height: 1; }

  /* Auto-populating weather dashboard */
  .wxd { display: flex; flex-direction: column; gap: 16px; margin: 22px auto 6px; max-width: 880px; text-align: left; }
  .wxd .wx-summary { margin-top: 0; }
  .wxd-top:empty, .wxd-body:empty { display: none; }
  .wxd-top[hidden], .wxd-body[hidden] { display: none; }
  .wxd-top { display: flex; flex-direction: column; gap: 14px; }
  .wxd-body { display: flex; flex-direction: column; gap: 16px; }

  .wxd-hero { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 22px 26px; border: 1px solid var(--hair-bright); border-radius: 16px; background: radial-gradient(120% 140% at 0% 0%, rgba(86,168,255,0.10), transparent 55%), var(--surface-2); box-shadow: var(--shadow-card); cursor: pointer; transition: border-color 0.15s, background 0.15s; }
  .wxd-hero:hover { border-color: rgba(86,168,255,0.5); }
  .wxd-hero-left { display: flex; align-items: center; }
  .wxd-temp { font-size: clamp(56px, 10vw, 88px); font-weight: 200; line-height: 0.92; letter-spacing: -0.03em; color: #f4f8ff; }
  .wxd-hero-right { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; text-align: right; min-width: 0; }
  .wxd-hero-icon { font-size: clamp(34px, 6vw, 46px); line-height: 1; margin-bottom: 4px; opacity: 0.95; }
  .wxd-cond { font-size: 15px; font-weight: 500; color: var(--text); }
  .wxd-feels { color: var(--muted); font-size: 13px; }
  .wxd-hilo { color: var(--text); font-size: 14px; font-weight: 500; font-variant-numeric: tabular-nums; }
  .wxd-hero-meta { color: var(--muted-2); font-size: 11px; margin-top: 3px; letter-spacing: 0.01em; }

  .wxd-section { border: 1px solid var(--hair); border-radius: 14px; background: var(--surface); padding: 16px 18px; box-shadow: var(--shadow-card); }
  .wxd-section-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.11em; color: var(--muted-2); margin-bottom: 12px; font-weight: 600; }

  .wxd-hourly { display: flex; gap: 6px; overflow-x: auto; overflow-y: hidden; padding-bottom: 4px; scroll-snap-type: x proximity; cursor: pointer; }
  .wxd-hour { flex: 0 0 auto; width: 58px; display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 8px 4px; border-radius: 10px; scroll-snap-align: start; }
  .wxd-hour:hover { background: rgba(90,185,255,0.06); }
  .wxd-hour-label { font-size: 11px; color: var(--muted); white-space: nowrap; }
  .wxd-hour-icon { font-size: 19px; line-height: 1; }
  .wxd-hour-t { font-weight: 600; font-size: 14px; font-variant-numeric: tabular-nums; }
  .wxd-pop { font-size: 10.5px; color: var(--accent); min-height: 13px; }

  .wxd-day { display: grid; grid-template-columns: 62px 1fr 22px 158px; align-items: center; gap: 10px; padding: 9px 6px; border-radius: 8px; cursor: pointer; }
  .wxd-day:hover { background: rgba(90,185,255,0.06); }
  .wxd-day + .wxd-day { border-top: 1px solid var(--border); }
  .wxd-day-precip { font-size: 11.5px; font-weight: 600; text-align: center; padding: 2px 0; border: 1px solid transparent; border-radius: 999px; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .wxd-day-precip.empty { border-color: transparent; }
  .wxd-day-name { font-size: 13.5px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .wxd-day-icon { font-size: 17px; text-align: center; }
  .wxd-day-temps { display: flex; align-items: center; gap: 8px; }
  .wxd-day-lo { color: var(--muted); font-size: 13px; min-width: 28px; text-align: right; font-variant-numeric: tabular-nums; }
  .wxd-day-hi { font-weight: 600; font-size: 13px; min-width: 28px; font-variant-numeric: tabular-nums; }
  .wxd-range { flex: 1; position: relative; height: 5px; border-radius: 3px; background: rgba(99,124,175,0.15); }
  .wxd-range-fill { position: absolute; top: 0; height: 100%; border-radius: 3px; background: var(--accent-grad); }

  .wxd-modules { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }
  .wxd-tile { border: 1px solid var(--hair); border-radius: 12px; padding: 13px 15px; min-height: 94px; background: var(--surface-2); display: flex; flex-direction: column; gap: 4px; cursor: pointer; transition: border-color 0.15s, transform 0.15s, background 0.15s; }
  .wxd-tile:hover { border-color: var(--hair-bright); background: var(--surface-hi); transform: translateY(-1px); }
  .wxd-tile-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.07em; color: var(--muted-2); display: flex; align-items: center; gap: 5px; }
  .wxd-tile-value { font-size: 23px; font-weight: 600; line-height: 1.15; }
  .wxd-tile-sub { font-size: 12px; color: var(--muted); }
  .wxd-tile.wide { grid-column: span 2; }
  .wxd-wind-arrow { display: inline-block; color: var(--accent); font-size: 12px; transition: transform 0.3s; }
  .wxd-moon-glyph { font-size: 30px; }
  .wxd-sun-arc { margin: 4px 0 2px; }
  .wxd-sun-arc svg { display: block; }
  .wxd-sun-times { display: flex; gap: 12px; font-size: 12px; color: var(--muted); flex-wrap: wrap; }
  .wxd-sun-len { color: var(--muted-2); margin-left: auto; }

  .wxd-alerts { display: flex; flex-direction: column; gap: 6px; }
  .wxd-alert { display: flex; align-items: flex-start; gap: 10px; padding: 11px 14px; border-radius: 11px; cursor: pointer; border: 1px solid var(--hair); border-left: 3px solid var(--warn); background: var(--surface-2); box-shadow: var(--shadow-card); }
  .wxd-alert.warn { border-left-color: var(--warn); }
  .wxd-alert.severe { border-left-color: var(--err); background: linear-gradient(90deg, rgba(255,122,122,0.08), var(--surface-2) 40%); }
  .wxd-alert-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--warn); flex-shrink: 0; margin-top: 6px; }
  .wxd-alert.severe .wxd-alert-dot { background: var(--err); }
  .wxd-alert-body { flex: 1; min-width: 0; }
  .wxd-alert-line { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
  .wxd-alert-event { font-weight: 600; font-size: 13.5px; }
  .wxd-alert-until { font-size: 11.5px; color: var(--muted); }
  .wxd-alert-detail { font-size: 12px; color: var(--muted); margin-top: 6px; white-space: pre-wrap; line-height: 1.5; }
  .wxd-alert-tog { background: transparent; border: none; color: var(--muted); font-size: 15px; cursor: pointer; padding: 0 4px; line-height: 1; flex-shrink: 0; border-radius: 4px; }
  .wxd-alert-tog:hover { color: var(--text); background: rgba(255,255,255,0.06); }

  .wxd-skel { background: linear-gradient(90deg, rgba(99,124,175,0.10), rgba(99,124,175,0.20), rgba(99,124,175,0.10)); background-size: 200% 100%; animation: wxdShimmer 1.3s ease-in-out infinite; border-radius: 16px; }
  @keyframes wxdShimmer { to { background-position: -200% 0; } }
  .examples-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.07em; color: var(--muted-2); margin: 22px 0 10px; text-align: left; }

  /* Rain-outlook info card */
  .wxd-hero-row { display: grid; grid-template-columns: 1fr; gap: 14px; }
  .wxd-precip { border: 1px solid var(--hair); border-radius: 14px; background: var(--surface); box-shadow: var(--shadow-card); padding: 16px 18px; display: flex; flex-direction: column; gap: 11px; cursor: pointer; transition: border-color 0.15s; }
  .wxd-precip:hover { border-color: var(--border-bright); }
  .wxd-precip-label { font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted-2); }
  .wxd-precip-rows { display: flex; flex-direction: column; gap: 8px; }
  .wxd-precip-row { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
  .wxd-precip-k { font-size: 12.5px; color: var(--muted); }
  .wxd-precip-v { display: flex; align-items: baseline; gap: 8px; font-variant-numeric: tabular-nums; }
  .wxd-precip-pop { font-size: 17px; font-weight: 700; }
  .wxd-precip-qpf { font-size: 12px; color: var(--muted); }

  /* Interactive hourly chart */
  .wxd-chart-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 8px; }
  .wxd-chart-head .wxd-section-label { margin-bottom: 0; }
  .wxd-range-toggle { display: flex; gap: 4px; }
  .wxd-rt { background: transparent; border: 1px solid var(--border); color: var(--muted); border-radius: 6px; padding: 2px 9px; font: inherit; font-size: 11px; cursor: pointer; }
  .wxd-rt.on { background: rgba(90,185,255,0.14); color: var(--text); border-color: var(--border-bright); }
  .wxd-nextrain { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--text); margin-bottom: 10px; }
  .wxd-nextrain-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .wxd-trace-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }
  .wxd-trace-chip { background: transparent; border: 1px solid var(--border); color: var(--muted-2); border-radius: 999px; padding: 3px 10px; font: inherit; font-size: 11px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.12s; }
  .wxd-trace-chip::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--tc, var(--accent)); opacity: 0.3; }
  .wxd-trace-chip:hover { color: var(--muted); border-color: var(--border-bright); }
  .wxd-trace-chip.on { color: var(--text); border-color: var(--border-bright); background: rgba(255,255,255,0.03); }
  .wxd-trace-chip.on::before { opacity: 1; }
  .wxd-chart-wrap { position: relative; }
  .wxd-chart-svg { width: 100%; }
  .wxd-chart { display: block; width: 100%; overflow: visible; touch-action: pan-y; }
  .wxd-axis-lbl { fill: var(--ink-axis); font-size: 9px; font-family: var(--sans); font-variant-numeric: tabular-nums; }
  .wxd-now-lbl { fill: #ffd166; font-size: 8px; font-family: var(--sans); font-weight: 700; letter-spacing: 0.08em; }
  .wxd-chart-tip { position: absolute; top: 4px; pointer-events: none; background: rgba(16,22,38,0.96); border: 1px solid var(--hair-bright); border-radius: 9px; padding: 8px 10px; box-shadow: 0 8px 28px rgba(0,0,0,0.55); z-index: 5; min-width: 112px; backdrop-filter: blur(6px); }
  .wxd-tip-time { font-weight: 600; margin-bottom: 5px; font-size: 10.5px; color: var(--muted); letter-spacing: 0.02em; }
  .wxd-tip-row { display: flex; align-items: center; gap: 7px; line-height: 1.6; font-size: 11.5px; }
  .wxd-tip-sw { width: 7px; height: 7px; border-radius: 2px; flex-shrink: 0; }
  .wxd-tip-lbl { color: var(--muted); flex: 1; }
  .wxd-tip-val { font-weight: 600; font-variant-numeric: tabular-nums; color: var(--text); }
  .wxd-meteo { display: block; width: 100%; overflow: visible; touch-action: pan-y; }
  .wxd-panel-lbl { fill: var(--muted); font-size: 10px; font-family: var(--sans); font-weight: 600; letter-spacing: 0.02em; }
  .wxd-panel-unit { fill: var(--muted-2); font-size: 8px; font-family: var(--sans); letter-spacing: 0.03em; }
  .wxd-legend-lbl { fill: var(--muted-2); font-size: 8.5px; font-family: var(--sans); }
  .wxd-day-div-lbl { fill: var(--muted); font-size: 9.5px; font-family: var(--sans); font-weight: 600; letter-spacing: 0.04em; }
  .wxd-dir-arrow { fill: var(--ink-axis); font-size: 10px; font-family: var(--sans); }

  /* Dense 7-day forecast table */
  .wxd-dt { display: flex; flex-direction: column; }
  .wxd-dt-row { display: grid; grid-template-columns: 66px 24px 42px 42px 52px 108px 1fr; align-items: center; gap: 8px; padding: 8px 6px; border-radius: 7px; cursor: pointer; }
  .wxd-dt-row + .wxd-dt-row { border-top: 1px solid var(--border); }
  .wxd-dt-row:not(.wxd-dt-head):hover { background: rgba(90,185,255,0.06); }
  .wxd-dt-head { font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted-2); cursor: default; }
  .wxd-dt-head span:nth-child(3), .wxd-dt-head span:nth-child(4), .wxd-dt-head span:nth-child(5) { text-align: right; }
  .wxd-dt-day { font-size: 13px; font-weight: 500; white-space: nowrap; }
  .wxd-dt-icon { font-size: 15px; text-align: center; }
  .wxd-dt-hi { font-weight: 600; font-size: 13.5px; text-align: right; font-variant-numeric: tabular-nums; }
  .wxd-dt-lo { color: var(--muted); font-size: 13px; text-align: right; font-variant-numeric: tabular-nums; }
  .wxd-dt-pop { font-size: 12.5px; font-weight: 600; text-align: right; font-variant-numeric: tabular-nums; }
  .wxd-dt-wind { font-size: 11.5px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .wxd-dt-cond { font-size: 12px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  @media (max-width: 620px) {
    .wxd-dt-row { grid-template-columns: 58px 20px 38px 38px 48px; gap: 6px; }
    .wxd-dt-row > *:nth-child(6), .wxd-dt-row > *:nth-child(7) { display: none; }
  }

  .wxd-lower { display: grid; grid-template-columns: 1fr; gap: 16px; }

  @media (min-width: 900px) {
    .empty { max-width: 1060px; }
    .wxd { max-width: 1060px; }
    .empty-title, .empty-sub { max-width: 760px; margin-left: auto; margin-right: auto; }
    .wxd-hero-row { grid-template-columns: 1fr 300px; align-items: start; }
    .wxd-lower { grid-template-columns: 1.15fr 1fr; align-items: start; }
  }

  /* Messages */
  .messages { flex: 1; overflow-y: auto; overflow-x: hidden; padding: 24px 18px 8px; }
  .messages-inner { max-width: 880px; margin: 0 auto; }
  .empty { text-align: center; max-width: 720px; margin: 26px auto 0; padding: 0 16px; }
  .empty-title { font-size: 17px; font-weight: 600; background: var(--accent-grad); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 5px; letter-spacing: 0.01em; }
  .empty-sub { color: var(--muted-2); font-size: 12px; line-height: 1.5; margin-bottom: 20px; }
  .gh-link { color: var(--accent); text-decoration: none; white-space: nowrap; }
  .gh-link:hover { text-decoration: underline; }
  .sidebar-foot .gh-link { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; color: var(--muted-2); }
  .sidebar-foot .gh-link:hover { color: var(--accent); text-decoration: none; }
  .examples { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 8px; }
  .examples button { background: rgba(255,255,255,0.02); color: var(--text); border: 1px solid var(--border); border-radius: 10px; padding: 12px 14px; font: inherit; font-size: 13px; cursor: pointer; text-align: left; line-height: 1.4; transition: all 0.15s ease; }
  .examples button:hover { border-color: var(--accent); background: rgba(90,185,255,0.06); transform: translateY(-1px); }

  .msg { margin-bottom: 22px; display: flex; flex-direction: column; }
  .msg.user { align-items: flex-end; }
  .msg.assistant { align-items: flex-start; }
  .role-tag { font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted-2); margin-bottom: 4px; padding: 0 6px; }

  .bubble { max-width: min(760px, 100%); padding: 12px 16px; border-radius: 14px; border: 1px solid var(--border); word-wrap: break-word; overflow-wrap: anywhere; }
  .msg.user .bubble { background: var(--user); border-color: var(--user-bd); border-top-right-radius: 4px; }
  .msg.assistant .bubble { background: rgba(20, 28, 46, 0.55); border-top-left-radius: 4px; }
  .bubble p { margin: 0.5em 0; }
  .bubble p:first-child { margin-top: 0; }
  .bubble p:last-child { margin-bottom: 0; }
  .bubble h1, .bubble h2, .bubble h3, .bubble h4 { margin: 0.85em 0 0.4em; font-weight: 600; line-height: 1.3; }
  .bubble h1 { font-size: 1.3em; }
  .bubble h2 { font-size: 1.15em; color: var(--accent); }
  .bubble h3 { font-size: 1.05em; color: #b8d4ff; }
  .bubble h4 { font-size: 1em; color: var(--muted); text-transform: uppercase; letter-spacing: 0.04em; font-size: 0.85em; }
  .bubble h1:first-child, .bubble h2:first-child, .bubble h3:first-child, .bubble h4:first-child { margin-top: 0; }
  .bubble ul, .bubble ol { margin: 0.4em 0; padding-left: 1.5em; }
  .bubble li { margin: 0.2em 0; }
  .bubble code { font-family: var(--mono); font-size: 0.88em; background: rgba(0,0,0,0.35); border: 1px solid var(--border); padding: 1px 5px; border-radius: 4px; }
  .bubble pre { font-family: var(--mono); font-size: 12.5px; line-height: 1.45; background: rgba(0,0,0,0.4); border: 1px solid var(--border); padding: 12px; border-radius: 8px; overflow-x: auto; margin: 8px 0; max-width: 100%; white-space: pre-wrap; overflow-wrap: anywhere; }
  .bubble pre code { background: none; border: none; padding: 0; }
  .bubble table { border-collapse: collapse; margin: 8px 0; font-size: 13px; width: 100%; display: block; max-width: 100%; overflow-x: auto; }
  .bubble th, .bubble td { border: 1px solid var(--border); padding: 6px 10px; text-align: left; }
  .bubble th { background: rgba(90,185,255,0.08); font-weight: 600; color: var(--accent); }
  .bubble a { color: var(--accent); text-decoration: none; border-bottom: 1px solid rgba(90,185,255,0.4); }
  .bubble a:hover { border-bottom-color: var(--accent); }
  .bubble img { max-width: 100%; border-radius: 8px; margin: 8px 0; border: 1px solid var(--border); display: block; }
  .bubble strong { font-weight: 600; color: #f0f6ff; }
  .bubble blockquote { border-left: 3px solid var(--accent); padding-left: 12px; margin: 8px 0; color: var(--muted); }
  .bubble hr { border: none; border-top: 1px solid var(--border); margin: 12px 0; }

  /* Tool chips */
  .trace { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; max-width: 760px; }
  .tool-chip { display: inline-flex; align-items: center; gap: 6px; background: var(--tool-bg); border: 1px solid var(--border); color: var(--muted); border-radius: 999px; padding: 3px 10px; font-size: 11.5px; font-family: var(--mono); cursor: pointer; transition: all 0.12s; }
  .tool-chip:hover { color: var(--text); border-color: var(--border-bright); }
  .tool-chip .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--ok); }
  .tool-chip.err .dot { background: var(--err); }
  .tool-chip .ms { color: var(--muted-2); font-size: 10.5px; }
  .tool-details { margin: -4px 0 8px; background: rgba(0,0,0,0.3); border: 1px solid var(--border); border-radius: 8px; padding: 10px 12px; font-family: var(--mono); font-size: 11.5px; color: var(--muted); white-space: pre-wrap; word-break: break-word; max-height: 320px; overflow: auto; max-width: 760px; }

  .thinking { display: inline-flex; gap: 5px; align-items: center; color: var(--muted); }
  .thinking .label { margin-right: 4px; }
  .thinking .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: dotPulse 1.4s ease-in-out infinite; }
  .thinking .dot:nth-child(3) { animation-delay: 0.18s; }
  .thinking .dot:nth-child(4) { animation-delay: 0.36s; }
  @keyframes dotPulse { 0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); } 40% { opacity: 1; transform: scale(1); } }

  /* Composer */
  .composer { border-top: 1px solid var(--border); background: rgba(14, 19, 34, 0.45); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); padding: 14px 18px 16px; }
  .composer form { max-width: 880px; margin: 0 auto; display: flex; gap: 8px; align-items: flex-end; background: rgba(0,0,0,0.25); border: 1px solid var(--border); border-radius: 14px; padding: 6px 6px 6px 14px; transition: border-color 0.15s, box-shadow 0.15s; }
  .composer form:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(90,185,255,0.10); }
  .composer textarea { flex: 1; background: transparent; color: var(--text); border: none; outline: none; font: inherit; font-size: 14.5px; resize: none; padding: 9px 0; min-height: 24px; max-height: 200px; line-height: 1.45; }
  .composer textarea::placeholder { color: var(--muted-2); }
  .composer button { background: var(--accent-grad); color: #001a2a; border: none; border-radius: 10px; width: 38px; height: 38px; font-size: 18px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: filter 0.12s, transform 0.12s; }
  .composer button:hover:not(:disabled) { filter: brightness(1.08); }
  .composer button:active:not(:disabled) { transform: scale(0.96); }
  .composer button:disabled { opacity: 0.4; cursor: not-allowed; }
  .composer-hint { max-width: 880px; margin: 6px auto 0; font-size: 11px; color: var(--muted-2); text-align: center; }

  .sidebar-toggle-btn .tog-mob { display: none; }

  /* Mobile */
  @media (max-width: 740px) {
    .sidebar { position: fixed; z-index: 30; height: 100vh; height: 100dvh; box-shadow: 0 0 40px rgba(0,0,0,0.6); }
    .sidebar.collapsed { margin-left: -281px; }
    .sidebar-foot { padding-bottom: calc(12px + env(safe-area-inset-bottom)); }
    .mobile-only, #sidebarOpen { display: inline-flex; }
    .now-cond { display: none; }
    .wx-summary { font-size: 12.5px; }
    .topbar-new .tn-label { display: none; }
    .empty-title { font-size: 22px; }
    .messages { padding: 16px 14px 8px; }
    .topbar { padding: 10px 12px; gap: 10px; padding-top: calc(10px + env(safe-area-inset-top)); }
    .composer { padding-bottom: calc(16px + env(safe-area-inset-bottom)); }
    .sidebar-toggle-btn .tog-desk { display: none; }
    .sidebar-toggle-btn .tog-mob { display: inline; font-size: 20px; line-height: 1; padding: 0 2px; }
    .wxd { margin-top: 16px; gap: 14px; }
    .wxd-hero { flex-direction: column; align-items: flex-start; gap: 10px; padding: 18px 18px; }
    .wxd-hero-right { align-items: flex-start; text-align: left; }
    .wxd-temp { font-size: 60px; }
    .wxd-modules { grid-template-columns: repeat(2, 1fr); }
    .wxd-tile.wide { grid-column: span 2; }
    .wxd-day { grid-template-columns: 62px 22px 42px 1fr; gap: 8px; }
    .wxd-day-name { font-size: 12.5px; }
  }
  #wxDashboard { overflow-x: hidden; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 10px; height: 10px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(99,124,175,0.2); border-radius: 5px; border: 2px solid transparent; background-clip: padding-box; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(99,124,175,0.35); }
</style>
</head>
<body>
<div class="app">
  <aside class="sidebar collapsed" id="sidebar">
    <div class="sidebar-head">
      <div class="brand">
        <span class="logo">⛈</span>
        <span class="brand-name">Weather Chat</span>
      </div>
      <button class="icon-btn sidebar-toggle-btn" id="sidebarToggle" title="Hide sidebar"><span class="tog-desk">‹</span><span class="tog-mob">×</span></button>
    </div>
    <button class="new-chat" id="newChatBtn">
      <span class="plus">+</span><span>New chat</span>
    </button>
    <div class="threads" id="threadList"></div>
    <div class="sidebar-foot">
      <a class="gh-link" href="https://github.com/praxeo/weatherchat" target="_blank" rel="noopener">⟡ View on GitHub ↗</a>
    </div>
  </aside>

  <main class="main">
    <header class="topbar">
      <button class="icon-btn" id="sidebarOpen" title="Show sidebar">☰</button>
      <div class="now-card">
        <div class="loc-picker" id="locPicker">
          <div class="loc-current" id="locCurrent" title="Switch location">
            <div class="lc-body">
              <div class="lc-name" id="lcName">—</div>
              <div class="lc-sub" id="lcSub">—</div>
            </div>
            <span class="lc-caret">⌄</span>
          </div>
          <div class="loc-menu" id="locMenu"></div>
        </div>
        <div class="now-cond" id="nowCond">
          <span class="now-temp">—</span>
          <span class="now-desc">—</span>
        </div>
      </div>
      <span class="spacer"></span>
      <span id="geoStatus" class="geo-status"></span>
      <button class="topbar-new" id="topbarNew" title="Start a new chat (⌘/Ctrl+K)"><span class="tn-icon">✚</span><span class="tn-label">New chat</span></button>
    </header>

    <section class="messages" id="messages">
      <div class="empty" id="empty">
        <div class="empty-title">Automated multi-source weather data parser</div>
        <div class="empty-sub">Pulls and synthesizes live data from NWS/NOAA, SPC, AirNow, and USGS — forecasts, severe risk, area forecast discussions, air quality, river stage, radar, and more. <a class="gh-link" href="https://github.com/praxeo/weatherchat" target="_blank" rel="noopener">View on GitHub ↗</a></div>
        <div class="wx-summary" id="wxSummary" hidden>
          <span class="wx-summary-icon" id="wxSummaryIcon">◈</span>
          <span class="wx-summary-text" id="wxSummaryText"></span>
        </div>
        <div class="wxd" id="wxDashboard">
          <div class="wxd-top" id="wxdTop"></div>
          <div class="wxd-body" id="wxdBody"></div>
        </div>
        <div class="examples-label" id="examplesLabel">Or ask the forecaster anything</div>
        <div class="examples" id="examples">
          <button data-q="Give me current observations for my location (temperature, dewpoint, wind, pressure, visibility, and any recent precipitation), then give the short-term forecast for the next 12 hours only. Focus on near-term changes: precipitation timing and chances (e.g. will it rain in the next few hours?), temperature trend, and wind. Do not include anything beyond the next ~12 hours.">Current conditions & next 12h</button>
          <button data-q="Summarize the 7-day forecast and call out any periods of unsettled weather or precipitation chances above 40%.">7-day forecast</button>
          <button data-q="What is the SPC convective outlook for days 1–3 at my location? Include categorical risk and tornado/wind/hail probabilities.">Severe weather outlook</button>
          <button data-q="List all active NWS alerts, watches, and warnings for my area with severity and expiration times.">Active alerts</button>
          <button data-q="Summarize the latest area forecast discussion from my local NWS office, preserving forecaster reasoning and confidence statements.">Forecast discussion (AFD)</button>
          <button data-q="Current air quality by pollutant (AQI) and the outlook for the next 24 hours.">Air quality</button>
        </div>
      </div>
    </section>

    <footer class="composer">
      <form id="form">
        <textarea id="input" rows="1" placeholder="Ask about the forecast, severe risk, AFD, AQI, river stage, radar..." autofocus></textarea>
        <button type="submit" id="send" title="Send">↑</button>
      </form>
      <div class="composer-hint">Enter to send \xB7 Shift+Enter newline \xB7 ⌘/Ctrl+K new chat \xB7 saved locally</div>
    </footer>
  </main>
</div>

<div class="modal-backdrop" id="locModal">
  <div class="modal">
    <div class="modal-head">
      <h3 id="lmTitle">Add location</h3>
      <button class="modal-close" id="lmClose" aria-label="Close">×</button>
    </div>
    <div class="modal-body">
      <label>
        <span>Name</span>
        <input id="lmName" maxlength="40" placeholder="Home, Office, Lake place…" autocomplete="off" />
      </label>
      <label>
        <span>City, State <span class="help">— US only</span></span>
        <input id="lmCityState" placeholder="Birmingham, AL" autocomplete="off" />
      </label>
      <details>
        <summary>Advanced: coordinates directly</summary>
        <div class="row">
          <label><span>Latitude</span><input id="lmLat" type="number" step="0.0001" /></label>
          <label><span>Longitude</span><input id="lmLon" type="number" step="0.0001" /></label>
        </div>
        <div style="margin-top:6px"><label><span>NWS Office (auto-detected if blank)</span><input id="lmOffice" maxlength="3" placeholder="BMX" style="text-transform:uppercase" /></label></div>
      </details>
      <div class="modal-error" id="lmError"></div>
    </div>
    <div class="modal-foot">
      <button class="secondary" id="lmCancel">Cancel</button>
      <button id="lmSave">Save</button>
    </div>
  </div>
</div>

<script>
const DEFAULT_LOC = { lat: 33.21, lon: -86.65, office: "BMX", name: "Shelby County, Alabama" };
const STORAGE_KEY = "wxchat.v2";
const MAX_THREADS = 30;
const MAX_MSGS_PER_THREAD = 80;
const MAX_LOCATIONS = 12;

function uid() {
  if (crypto && crypto.randomUUID) return crypto.randomUUID();
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (!s || typeof s !== "object") return null;
    s.threads = s.threads || {};
    s.order = Array.isArray(s.order) ? s.order : [];
    if (!s.locations || typeof s.locations !== "object") s.locations = {};
    if (!Array.isArray(s.locationOrder)) s.locationOrder = [];
    if (s.location && !Object.keys(s.locations).length) {
      const id = uid();
      s.locations[id] = { ...s.location, id, addedAt: Date.now() };
      s.locationOrder = [id];
      s.activeLocationId = id;
      delete s.location;
    }
    if (!Object.keys(s.locations).length) {
      const id = uid();
      s.locations[id] = { ...DEFAULT_LOC, id, addedAt: Date.now(), source: "default" };
      s.locationOrder = [id];
      s.activeLocationId = id;
    }
    if (!s.geo || typeof s.geo !== "object") s.geo = { tried: false };
    if (!s.activeLocationId || !s.locations[s.activeLocationId]) {
      s.activeLocationId = s.locationOrder[0] || Object.keys(s.locations)[0];
    }
    return s;
  } catch { return null; }
}
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { console.warn("save failed", e); }
}
function initialState() {
  const id = uid();
  return {
    threads: {}, order: [], activeId: null,
    locations: { [id]: { ...DEFAULT_LOC, id, addedAt: Date.now(), source: "default" } },
    locationOrder: [id],
    activeLocationId: id,
    geo: { tried: false }
  };
}
let state = loadState() || initialState();

function currentLoc() {
  return state.locations[state.activeLocationId] || state.locations[state.locationOrder[0]] || DEFAULT_LOC;
}
function addLocation(loc) {
  const id = uid();
  state.locations[id] = { ...loc, id, addedAt: Date.now() };
  state.locationOrder = [id, ...state.locationOrder.filter(x => x !== id)];
  if (state.locationOrder.length > MAX_LOCATIONS) {
    const removed = state.locationOrder.splice(MAX_LOCATIONS);
    for (const rid of removed) delete state.locations[rid];
  }
  state.activeLocationId = id;
  saveState();
  return id;
}
function updateLocation(id, patch) {
  if (!state.locations[id]) return;
  state.locations[id] = { ...state.locations[id], ...patch, id };
  saveState();
}
function deleteLocation(id) {
  if (Object.keys(state.locations).length <= 1) return false;
  delete state.locations[id];
  state.locationOrder = state.locationOrder.filter(x => x !== id);
  if (state.activeLocationId === id) state.activeLocationId = state.locationOrder[0];
  saveState();
  return true;
}
function switchLocation(id) {
  if (state.locations[id]) {
    state.activeLocationId = id;
    saveState();
    renderLocPicker();
    refreshNowCard();
    refreshSummary();
  }
}
function onlyHasDefaultLocation() {
  const ids = Object.keys(state.locations);
  if (ids.length !== 1) return false;
  const loc = state.locations[ids[0]];
  if (!loc) return false;
  if (loc.source === "default") return true;
  return loc.name === DEFAULT_LOC.name && Number(loc.lat) === DEFAULT_LOC.lat && Number(loc.lon) === DEFAULT_LOC.lon;
}
function pruneDefaultLocations() {
  const ids = Object.keys(state.locations);
  if (ids.length <= 1) return;
  for (const id of ids) {
    if (Object.keys(state.locations).length <= 1) break;
    const loc = state.locations[id];
    if (loc && loc.source === "default" && id !== state.activeLocationId) {
      delete state.locations[id];
      state.locationOrder = state.locationOrder.filter((x) => x !== id);
    }
  }
  if (!state.locations[state.activeLocationId]) state.activeLocationId = state.locationOrder[0];
  saveState();
}
function newThread() {
  const id = uid();
  const t = { id, title: "New chat", messages: [], createdAt: Date.now(), updatedAt: Date.now() };
  state.threads[id] = t;
  state.order = [id, ...state.order.filter(x => x !== id)];
  if (state.order.length > MAX_THREADS) {
    const removed = state.order.splice(MAX_THREADS);
    for (const rid of removed) delete state.threads[rid];
  }
  state.activeId = id;
  saveState();
  return t;
}
function activeThread() {
  if (state.activeId && state.threads[state.activeId]) return state.threads[state.activeId];
  return newThread();
}
function switchThread(id) {
  if (state.threads[id]) {
    state.activeId = id;
    saveState();
    renderAll();
  }
}
function deleteThread(id) {
  delete state.threads[id];
  state.order = state.order.filter(x => x !== id);
  if (state.activeId === id) state.activeId = state.order[0] || null;
  if (!state.activeId) newThread();
  saveState();
  renderAll();
}
function titleFromText(text) {
  return String(text || "").replace(/\\s+/g, " ").trim().slice(0, 48) || "New chat";
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

/* Markdown */
function renderMarkdown(text) {
  if (!text) return "";
  const codeBlocks = [];
  text = text.replace(/\`\`\`(\\w*)\\n?([\\s\\S]*?)\`\`\`/g, function(_, lang, code) {
    codeBlocks.push(code);
    return "\\u0001CB" + (codeBlocks.length - 1) + "\\u0001";
  });
  const lines = text.split("\\n");
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const cb = line.match(/^\\u0001CB(\\d+)\\u0001$/);
    if (cb) {
      out.push("<pre><code>" + escapeHtml(codeBlocks[parseInt(cb[1])]) + "</code></pre>");
      i++; continue;
    }
    let m = line.match(/^(#{1,4})\\s+(.+)$/);
    if (m) {
      const level = m[1].length;
      out.push("<h" + level + ">" + inlineMd(m[2]) + "</h" + level + ">");
      i++; continue;
    }
    if (/^---+$/.test(line.trim())) { out.push("<hr/>"); i++; continue; }
    if (/^\\|.+\\|\\s*$/.test(line) && i + 1 < lines.length && /^\\|[\\s\\-:|]+\\|\\s*$/.test(lines[i+1])) {
      const headers = line.replace(/^\\|/, "").replace(/\\|\\s*$/, "").split("|").map(c => c.trim());
      const rows = [];
      i += 2;
      while (i < lines.length && /^\\|.+\\|\\s*$/.test(lines[i])) {
        rows.push(lines[i].replace(/^\\|/, "").replace(/\\|\\s*$/, "").split("|").map(c => c.trim()));
        i++;
      }
      out.push("<table><thead><tr>" + headers.map(h => "<th>" + inlineMd(h) + "</th>").join("") + "</tr></thead><tbody>" + rows.map(r => "<tr>" + r.map(c => "<td>" + inlineMd(c) + "</td>").join("") + "</tr>").join("") + "</tbody></table>");
      continue;
    }
    if (/^>\\s*/.test(line)) {
      const quote = [];
      while (i < lines.length && /^>\\s*/.test(lines[i])) {
        quote.push(lines[i].replace(/^>\\s*/, ""));
        i++;
      }
      out.push("<blockquote>" + inlineMd(quote.join(" ")) + "</blockquote>");
      continue;
    }
    if (/^[\\-*+]\\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[\\-*+]\\s+/.test(lines[i])) {
        items.push("<li>" + inlineMd(lines[i].replace(/^[\\-*+]\\s+/, "")) + "</li>");
        i++;
      }
      out.push("<ul>" + items.join("") + "</ul>");
      continue;
    }
    if (/^\\d+\\.\\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\\d+\\.\\s+/.test(lines[i])) {
        items.push("<li>" + inlineMd(lines[i].replace(/^\\d+\\.\\s+/, "")) + "</li>");
        i++;
      }
      out.push("<ol>" + items.join("") + "</ol>");
      continue;
    }
    if (line.trim() === "") { i++; continue; }
    const para = [];
    while (i < lines.length && lines[i].trim() !== "" && !/^(#{1,4}\\s+|[\\-*+]\\s+|\\d+\\.\\s+|>|\\|.+\\|\\s*$|---+$|\\u0001CB)/.test(lines[i])) {
      para.push(lines[i]);
      i++;
    }
    if (para.length) out.push("<p>" + inlineMd(para.join(" ")) + "</p>");
  }
  return out.join("");
}
function inlineMd(s) {
  s = escapeHtml(s);
  s = s.replace(/!\\[([^\\]]*)\\]\\(([^)\\s]+)\\)/g, '<img alt="$1" src="$2" loading="lazy"/>');
  s = s.replace(/\\[([^\\]]+)\\]\\(([^)\\s]+)\\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  s = s.replace(/\`([^\`\\n]+)\`/g, "<code>$1</code>");
  s = s.replace(/\\*\\*([^*\\n]+)\\*\\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[^*])\\*([^*\\n]+)\\*(?!\\*)/g, "$1<em>$2</em>");
  return s;
}

/* DOM */
const $ = sel => document.querySelector(sel);
const sidebar = $("#sidebar");
const threadList = $("#threadList");
const messagesEl = $("#messages");
const empty = $("#empty");
const input = $("#input");
const form = $("#form");
const sendBtn = $("#send");
const locPicker = $("#locPicker");
const locMenu = $("#locMenu");
const lcName = $("#lcName");
const lcSub = $("#lcSub");
const geoStatus = $("#geoStatus");

let locMenuBuilt = false;
let locSearchDebounce = null;
let locSearchToken = 0;
function renderLocPicker() {
  const l = currentLoc();
  lcName.textContent = l.name || "—";
  lcSub.textContent = (l.office ? "WFO " + l.office + " \xB7 " : "") + Number(l.lat).toFixed(3) + ", " + Number(l.lon).toFixed(3);
  buildLocMenu();
  renderSavedLocations();
}
function buildLocMenu() {
  if (locMenuBuilt) return;
  locMenu.innerHTML = "";
  const search = document.createElement("input");
  search.className = "loc-search";
  search.id = "locSearch";
  search.type = "text";
  search.placeholder = "Search city, ZIP, or address…";
  search.autocomplete = "off";
  search.addEventListener("input", onLocSearchInput);
  search.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { e.stopPropagation(); search.value = ""; onLocSearchInput(); }
  });
  locMenu.appendChild(search);
  const results = document.createElement("div");
  results.className = "loc-results";
  results.id = "locResults";
  results.style.display = "none";
  locMenu.appendChild(results);
  const saved = document.createElement("div");
  saved.className = "loc-saved";
  saved.id = "locSaved";
  locMenu.appendChild(saved);
  const sep = document.createElement("div");
  sep.className = "loc-menu-sep";
  locMenu.appendChild(sep);
  const geoBtn = document.createElement("button");
  geoBtn.className = "loc-menu-action";
  geoBtn.innerHTML = "<span>\u{1F4CD}</span><span>Use my location</span>";
  geoBtn.onclick = useMyLocation;
  locMenu.appendChild(geoBtn);
  const coordBtn = document.createElement("button");
  coordBtn.className = "loc-menu-action";
  coordBtn.innerHTML = "<span>◎</span><span>Enter coordinates…</span>";
  coordBtn.onclick = () => { locPicker.classList.remove("open"); openLocModal(); };
  locMenu.appendChild(coordBtn);
  locMenuBuilt = true;
}
function renderSavedLocations() {
  const saved = document.getElementById("locSaved");
  if (!saved) return;
  saved.innerHTML = "";
  const label = document.createElement("div");
  label.className = "loc-saved-label";
  label.textContent = "Saved locations";
  saved.appendChild(label);
  const order = state.locationOrder.length ? state.locationOrder : Object.keys(state.locations);
  for (const id of order) {
    const loc = state.locations[id];
    if (!loc) continue;
    const row = document.createElement("div");
    row.className = "loc-menu-item" + (id === state.activeLocationId ? " active" : "");
    const body = document.createElement("div");
    body.className = "lm-body";
    const nm = document.createElement("div");
    nm.className = "lm-name";
    nm.textContent = loc.name;
    const sb = document.createElement("div");
    sb.className = "lm-sub";
    sb.textContent = (loc.office ? loc.office + " \xB7 " : "") + Number(loc.lat).toFixed(2) + ", " + Number(loc.lon).toFixed(2);
    body.appendChild(nm);
    body.appendChild(sb);
    const acts = document.createElement("div");
    acts.className = "lm-actions";
    const edit = document.createElement("button");
    edit.title = "Rename";
    edit.textContent = "✎";
    edit.onclick = (e) => { e.stopPropagation(); openLocModal(id); };
    acts.appendChild(edit);
    if (Object.keys(state.locations).length > 1) {
      const del = document.createElement("button");
      del.className = "del";
      del.title = "Delete";
      del.textContent = "×";
      del.onclick = (e) => {
        e.stopPropagation();
        const wasActive = id === state.activeLocationId;
        if (confirm("Delete '" + loc.name + "'?")) {
          deleteLocation(id);
          renderLocPicker();
          if (wasActive) { refreshNowCard(); refreshSummary(); }
        }
      };
      acts.appendChild(del);
    }
    row.appendChild(body);
    row.appendChild(acts);
    row.onclick = () => { switchLocation(id); locPicker.classList.remove("open"); };
    saved.appendChild(row);
  }
}
function onLocSearchInput() {
  const search = document.getElementById("locSearch");
  const results = document.getElementById("locResults");
  const saved = document.getElementById("locSaved");
  if (!search || !results || !saved) return;
  const q = (search.value || "").trim();
  if (locSearchDebounce) { clearTimeout(locSearchDebounce); locSearchDebounce = null; }
  if (q.length < 2) {
    results.style.display = "none";
    results.innerHTML = "";
    saved.style.display = "";
    return;
  }
  saved.style.display = "none";
  results.style.display = "";
  results.innerHTML = '<div class="loc-hint">Searching…</div>';
  locSearchDebounce = setTimeout(() => { doLocSearch(q); }, 250);
}
async function doLocSearch(q) {
  const myToken = ++locSearchToken;
  const results = document.getElementById("locResults");
  if (!results) return;
  try {
    const r = await fetch("/api/geosearch?q=" + encodeURIComponent(q));
    const data = await r.json();
    if (myToken !== locSearchToken) return;
    const list = (data && data.results) || [];
    if (!list.length) {
      results.innerHTML = '<div class="loc-hint">No matches. Try “City, ST” or a ZIP code.</div>';
      return;
    }
    results.innerHTML = "";
    for (const res of list) {
      const row = document.createElement("div");
      row.className = "loc-result";
      const body = document.createElement("div");
      body.className = "lr-body";
      const nm = document.createElement("div");
      nm.className = "lr-name";
      nm.textContent = res.city || res.label;
      const sub = document.createElement("div");
      sub.className = "lr-sub";
      sub.textContent = res.label;
      body.appendChild(nm);
      body.appendChild(sub);
      row.appendChild(body);
      row.onclick = () => { selectSearchResult(res, row); };
      results.appendChild(row);
    }
  } catch (e) {
    if (myToken !== locSearchToken) return;
    results.innerHTML = '<div class="loc-hint">Search failed — check your connection.</div>';
  }
}
async function selectSearchResult(res, row) {
  const results = document.getElementById("locResults");
  if (row) row.classList.add("busy");
  try {
    let office = null;
    let name = res.city || res.label;
    try {
      const info = await nwsPointInfo(res.lat, res.lon);
      office = info.office || null;
      if (info.city && info.state) name = info.city + ", " + info.state;
    } catch (e) {}
    if (!office) {
      if (row) row.classList.remove("busy");
      if (results) results.innerHTML = '<div class="loc-hint">That location is outside NWS coverage (US only).</div>';
      return;
    }
    const lat = Math.round(res.lat * 1e4) / 1e4;
    const lon = Math.round(res.lon * 1e4) / 1e4;
    addLocation({ name, lat, lon, office, source: "search" });
    pruneDefaultLocations();
    const search = document.getElementById("locSearch");
    if (search) search.value = "";
    onLocSearchInput();
    locPicker.classList.remove("open");
    renderLocPicker();
    refreshNowCard();
    refreshSummary();
  } catch (e) {
    if (row) row.classList.remove("busy");
  }
}

let nowFetchToken = 0;
async function refreshNowCard() {
  const myToken = ++nowFetchToken;
  const tempEl = document.querySelector(".now-temp");
  const descEl = document.querySelector(".now-desc");
  tempEl.textContent = "…";
  descEl.textContent = "loading";
  try {
    const l = currentLoc();
    const pt = await fetch("https://api.weather.gov/points/" + l.lat + "," + l.lon, {
      headers: { "Accept": "application/geo+json" }
    }).then(r => r.json());
    if (myToken !== nowFetchToken) return;
    const stationsUrl = pt && pt.properties && pt.properties.observationStations;
    if (!stationsUrl) { tempEl.textContent = "—"; descEl.textContent = ""; return; }
    const stations = await fetch(stationsUrl, { headers: { "Accept": "application/geo+json" } }).then(r => r.json());
    if (myToken !== nowFetchToken) return;
    const feats = stations.features || [];
    for (let k = 0; k < Math.min(4, feats.length); k++) {
      const sid = feats[k].properties && feats[k].properties.stationIdentifier;
      if (!sid) continue;
      try {
        const obs = await fetch("https://api.weather.gov/stations/" + sid + "/observations/latest", {
          headers: { "Accept": "application/geo+json" }
        }).then(r => r.json());
        if (myToken !== nowFetchToken) return;
        const p = obs.properties || {};
        if (p.temperature == null || p.temperature.value == null) continue;
        const tempF = Math.round(p.temperature.value * 9/5 + 32);
        tempEl.textContent = tempF + "\xB0F";
        descEl.textContent = p.textDescription || "";
        return;
      } catch { continue; }
    }
    tempEl.textContent = "—";
    descEl.textContent = "";
  } catch (e) {
    if (myToken !== nowFetchToken) return;
    tempEl.textContent = "—";
    descEl.textContent = "";
  }
}

let summaryToken = 0;
async function refreshSummary() {
  // The dashboard shares every trigger point with the summary bar (location
  // switch, home-screen render, geolocate, edit), so refresh it in lockstep.
  refreshDashboard();
  const bar = document.getElementById("wxSummary");
  const txt = document.getElementById("wxSummaryText");
  if (!bar || !txt) return;
  const myToken = ++summaryToken;
  const l = currentLoc();
  bar.hidden = false;
  bar.classList.add("loading");
  txt.textContent = "Reading the latest forecast for " + (l.name || "your area") + "…";
  try {
    const r = await fetch("/api/summary?lat=" + l.lat + "&lon=" + l.lon);
    const data = await r.json();
    if (myToken !== summaryToken) return;
    bar.classList.remove("loading");
    if (data && data.summary) {
      txt.textContent = data.summary;
      bar.hidden = false;
    } else {
      bar.hidden = true;
    }
  } catch (e) {
    if (myToken !== summaryToken) return;
    bar.classList.remove("loading");
    bar.hidden = true;
  }
}
/* ---------- Auto-populating weather dashboard ---------- */
function mkEl(tag, cls, txt) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (txt != null) e.textContent = txt;
  return e;
}
function clearNode(n) { while (n && n.firstChild) n.removeChild(n.firstChild); }
function wxIcon(s, day) {
  s = (s || "").toLowerCase();
  if (/t-?storm|thunder/.test(s)) return "⛈";
  if (/freezing|sleet|ice pellets|wintry/.test(s)) return "🧊";
  if (/snow|flurr|blizzard/.test(s)) return "🌨";
  if (/drizzle|light rain|shower/.test(s)) return day ? "🌦" : "🌧";
  if (/rain|showers/.test(s)) return "🌧";
  if (/fog|haze|mist|smoke/.test(s)) return "🌫";
  if (/wind|breez|gust/.test(s)) return "🌬";
  if (/overcast|mostly cloudy|broken clouds/.test(s)) return "☁";
  if (/partly (sunny|cloudy|clear)|mostly (sunny|clear)|few clouds|scattered/.test(s)) return day ? "🌤" : "☁";
  if (/cloud/.test(s)) return day ? "⛅" : "☁";
  if (/hot/.test(s)) return "🌡";
  if (/sunny|clear|fair/.test(s)) return day ? "☀" : "🌙";
  return day ? "☀" : "🌙";
}
function moonEmoji(p) {
  const m = { "New Moon": "🌑", "Waxing Crescent": "🌒", "First Quarter": "🌓", "Waxing Gibbous": "🌔", "Full Moon": "🌕", "Waning Gibbous": "🌖", "Last Quarter": "🌗", "Waning Crescent": "🌘" };
  return m[p] || "🌙";
}
function fmtHour(iso, tz) { try { return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", timeZone: tz }); } catch (e) { return ""; } }
function fmtClock(iso, tz) { try { return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: tz }); } catch (e) { return ""; } }
function fmtDayLen(sec) { const total = Math.round(sec / 60); const h = Math.floor(total / 60), m = total % 60; return h + "h " + m + "m"; }
function degToCompass(d) { const w = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]; return w[Math.round((((d % 360) + 360) % 360) / 22.5) % 16]; }
function sunIsDay(iso, sun) { if (!sun || !sun.sunrise_UTC || !sun.sunset_UTC) return true; const t = Date.parse(iso); if (isNaN(t)) return true; return t >= Date.parse(sun.sunrise_UTC) && t < Date.parse(sun.sunset_UTC); }
function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
function aqiColor(a) { if (a <= 50) return "var(--ok)"; if (a <= 100) return "var(--warn)"; if (a <= 150) return "#ff9e54"; if (a <= 200) return "var(--err)"; if (a <= 300) return "var(--accent-2)"; return "#b03a5b"; }
function catColor(r) { return ["var(--muted-2)","var(--ok)","var(--warn)","#ff9e54","var(--err)","var(--accent-2)"][Math.max(0, Math.min(5, r))]; }
function popColor(p) { if (p == null) return "var(--muted-2)"; if (p < 20) return "#51e0a3"; if (p < 40) return "#5ab9ff"; if (p < 60) return "#ffb454"; return "#ff7a7a"; }
function tempColor(f) { if (f == null) return "var(--muted-2)"; if (f <= 20) return "#8fc2ff"; if (f <= 32) return "#5ab9ff"; if (f <= 50) return "#51c7e0"; if (f <= 64) return "#51e0a3"; if (f <= 76) return "#9fd356"; if (f <= 86) return "#ffd479"; if (f <= 95) return "#ff9e54"; return "#ff7a7a"; }
function sevRank(s) { const m = { Extreme: 5, Severe: 4, Moderate: 3, Minor: 2, Unknown: 1 }; return m[s] || 0; }
function shortDayName(name) { if (!name) return ""; return String(name).replace(" Night", "").replace(" Afternoon", "").replace(" Morning", ""); }

function buildAlerts(alerts, tz) {
  const wrap = mkEl("div", "wxd-alerts");
  const order = alerts.slice().sort((a, b) => sevRank(b.severity) - sevRank(a.severity));
  for (const a of order) {
    const sev = (a.severity || "").toLowerCase();
    const cls = "wxd-alert" + (sev === "extreme" || sev === "severe" ? " severe" : (sev === "moderate" ? " warn" : ""));
    const pill = mkEl("div", cls);
    pill.setAttribute("data-q", "Give me the full details, timing, and affected areas for the active " + (a.event || "weather") + " alert.");
    pill.appendChild(mkEl("span", "wxd-alert-dot"));
    const body = mkEl("div", "wxd-alert-body");
    const line = mkEl("div", "wxd-alert-line");
    line.appendChild(mkEl("span", "wxd-alert-event", a.event || "Alert"));
    const until = a.ends || a.expires;
    if (until) line.appendChild(mkEl("span", "wxd-alert-until", "until " + fmtClock(until, tz)));
    body.appendChild(line);
    const detail = mkEl("div", "wxd-alert-detail", (a.headline || "") + (a.areaDesc ? "\\n\\n" + a.areaDesc : ""));
    detail.style.display = "none";
    body.appendChild(detail);
    pill.appendChild(body);
    const tog = mkEl("button", "wxd-alert-tog", "⌄");
    tog.title = "Details";
    tog.onclick = (e) => { e.stopPropagation(); detail.style.display = detail.style.display === "none" ? "block" : "none"; };
    pill.appendChild(tog);
    wrap.appendChild(pill);
  }
  return wrap;
}

function buildHero(d, tz) {
  const cur = d.current;
  const daily = d.daily || [];
  let hi = null, lo = null;
  for (const p of daily) { if (p.isDaytime && p.temp_F != null) { hi = p.temp_F; break; } }
  for (const p of daily) { if (!p.isDaytime && p.temp_F != null) { lo = p.temp_F; break; } }
  let tempVal, cond, feels, dayFlag;
  if (cur) {
    tempVal = cur.temperature_F;
    cond = cur.textDescription || "";
    feels = cur.feelsLike_F;
    dayFlag = sunIsDay(cur.observed || new Date().toISOString(), d.astronomy && d.astronomy.sun);
  } else if (daily[0]) {
    tempVal = daily[0].temp_F;
    cond = daily[0].short || "";
    feels = null;
    dayFlag = !!daily[0].isDaytime;
  } else { return null; }
  const hero = mkEl("div", "wxd-hero");
  hero.setAttribute("data-q", "Give me current observations for my location (temperature, dewpoint, wind, pressure, visibility, and recent precipitation), then the short-term forecast for the next 12 hours.");
  const left = mkEl("div", "wxd-hero-left");
  left.appendChild(mkEl("div", "wxd-temp", (tempVal != null ? Math.round(tempVal) : "—") + "°"));
  hero.appendChild(left);
  const right = mkEl("div", "wxd-hero-right");
  right.appendChild(mkEl("div", "wxd-hero-icon", wxIcon(cond, dayFlag)));
  if (cond) right.appendChild(mkEl("div", "wxd-cond", cond));
  if (feels != null && tempVal != null && Math.round(feels) !== Math.round(tempVal)) right.appendChild(mkEl("div", "wxd-feels", "Feels " + Math.round(feels) + "°"));
  if (hi != null || lo != null) right.appendChild(mkEl("div", "wxd-hilo", "H:" + (hi != null ? Math.round(hi) : "—") + "°  L:" + (lo != null ? Math.round(lo) : "—") + "°"));
  if (cur) {
    const meta = [];
    if (cur.station) meta.push(cur.station);
    if (cur.observed) meta.push("obs " + fmtClock(cur.observed, tz));
    if (cur.precipLastHour_in != null && cur.precipLastHour_in > 0) meta.push(cur.precipLastHour_in + '" /1h');
    if (d.location && d.location.elevation_m != null) meta.push(Math.round(d.location.elevation_m) + " m");
    if (meta.length) right.appendChild(mkEl("div", "wxd-hero-meta", meta.join("  ·  ")));
  }
  hero.appendChild(right);
  return hero;
}

function buildHourly(hourly, sun, tz) {
  if (!hourly || !hourly.length) return null;
  const sec = mkEl("div", "wxd-section");
  sec.appendChild(mkEl("div", "wxd-section-label", "Next 24 hours"));
  const strip = mkEl("div", "wxd-hourly");
  strip.setAttribute("data-q", "Give me an hour-by-hour forecast for the next 12 to 24 hours: temperature, precipitation chance and timing, and wind.");
  for (let i = 0; i < hourly.length; i++) {
    const h = hourly[i];
    const chip = mkEl("div", "wxd-hour");
    chip.appendChild(mkEl("div", "wxd-hour-label", i === 0 ? "Now" : fmtHour(h.time, tz)));
    chip.appendChild(mkEl("div", "wxd-hour-icon", wxIcon(h.short, sunIsDay(h.time, sun))));
    chip.appendChild(mkEl("div", "wxd-hour-t", h.temp_F != null ? Math.round(h.temp_F) + "°" : "—"));
    chip.appendChild(mkEl("div", "wxd-pop", (h.pop != null && h.pop > 0) ? "💧" + h.pop + "%" : " "));
    strip.appendChild(chip);
  }
  sec.appendChild(strip);
  return sec;
}

function buildDaily(daily) {
  if (!daily || !daily.length) return null;
  const rows = [];
  let i = 0;
  if (daily[0] && !daily[0].isDaytime) {
    rows.push({ name: daily[0].name, dayShort: daily[0].short, high: null, low: daily[0].temp_F, pop: daily[0].pop, wind: daily[0].wind });
    i = 1;
  }
  for (; i < daily.length; i++) {
    const p = daily[i];
    if (p.isDaytime) {
      const next = daily[i + 1];
      const low = (next && !next.isDaytime) ? next.temp_F : null;
      rows.push({ name: p.name, dayShort: p.short, high: p.temp_F, low: low, pop: p.pop, wind: p.wind });
      if (next && !next.isDaytime) i++;
    } else {
      rows.push({ name: p.name, dayShort: p.short, high: null, low: p.temp_F, pop: p.pop, wind: p.wind });
    }
  }
  const sec = mkEl("div", "wxd-section");
  sec.appendChild(mkEl("div", "wxd-section-label", "7-day forecast"));
  const table = mkEl("div", "wxd-dt");
  const head = mkEl("div", "wxd-dt-row wxd-dt-head");
  for (const h of ["Day", "", "Hi", "Lo", "Precip", "Wind", "Conditions"]) head.appendChild(mkEl("span", null, h));
  table.appendChild(head);
  for (let k = 0; k < rows.length && k < 8; k++) {
    const row = rows[k];
    const r = mkEl("div", "wxd-dt-row");
    r.setAttribute("data-q", "Give me the detailed forecast for " + row.name + ".");
    r.appendChild(mkEl("span", "wxd-dt-day", (k === 0 && row.high != null) ? "Today" : shortDayName(row.name)));
    r.appendChild(mkEl("span", "wxd-dt-icon", wxIcon(row.dayShort, true)));
    const hi = mkEl("span", "wxd-dt-hi", row.high != null ? Math.round(row.high) + "°" : "—");
    if (row.high != null) hi.style.color = tempColor(row.high);
    r.appendChild(hi);
    r.appendChild(mkEl("span", "wxd-dt-lo", row.low != null ? Math.round(row.low) + "°" : "—"));
    const pop = mkEl("span", "wxd-dt-pop", row.pop != null ? row.pop + "%" : "—");
    if (row.pop != null) pop.style.color = popColor(row.pop);
    r.appendChild(pop);
    r.appendChild(mkEl("span", "wxd-dt-wind", row.wind || "—"));
    r.appendChild(mkEl("span", "wxd-dt-cond", row.dayShort || ""));
    table.appendChild(r);
  }
  sec.appendChild(table);
  return sec;
}

function mkTile(label, value, sub, accent, q) {
  const t = mkEl("div", "wxd-tile");
  if (q) t.setAttribute("data-q", q);
  t.appendChild(mkEl("div", "wxd-tile-label", label));
  const v = mkEl("div", "wxd-tile-value", value);
  if (accent) v.style.color = accent;
  t.appendChild(v);
  if (sub) t.appendChild(mkEl("div", "wxd-tile-sub", sub));
  return t;
}

function buildSunTile(sun, tz) {
  const t = mkEl("div", "wxd-tile wide");
  t.setAttribute("data-q", "When are sunrise, sunset, and the twilight times for my location today?");
  t.appendChild(mkEl("div", "wxd-tile-label", "Sun"));
  const now = Date.now();
  const sr = Date.parse(sun.sunrise_UTC), ss = Date.parse(sun.sunset_UTC);
  const frac = clamp01((now - sr) / (ss - sr));
  const dayNow = now >= sr && now <= ss;
  const w = 190, h = 66, pad = 12, r = (w - pad * 2) / 2, cx = w / 2, cy = h - 6;
  const ang = Math.PI * frac;
  const px = (cx - r * Math.cos(ang)).toFixed(1), py = (cy - r * Math.sin(ang)).toFixed(1);
  let svg = "<svg viewBox='0 0 " + w + " " + h + "' width='100%' height='" + h + "' preserveAspectRatio='xMidYMax meet'>";
  svg += "<defs><linearGradient id='wxdSunG' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='#5ab9ff'/><stop offset='1' stop-color='#ffd479'/></linearGradient></defs>";
  svg += "<path d='M " + pad + " " + cy + " A " + r + " " + r + " 0 0 1 " + (w - pad) + " " + cy + "' fill='none' stroke='rgba(99,124,175,0.25)' stroke-width='2' stroke-dasharray='3 4'/>";
  if (dayNow) {
    svg += "<path d='M " + pad + " " + cy + " A " + r + " " + r + " 0 0 1 " + px + " " + py + "' fill='none' stroke='url(#wxdSunG)' stroke-width='2.5' stroke-linecap='round'/>";
    svg += "<circle cx='" + px + "' cy='" + py + "' r='4.5' fill='#ffd479'/>";
  }
  svg += "</svg>";
  const arc = mkEl("div", "wxd-sun-arc" + (dayNow ? "" : " night"));
  arc.innerHTML = svg;
  t.appendChild(arc);
  const times = mkEl("div", "wxd-sun-times");
  times.appendChild(mkEl("span", null, "↑ " + fmtClock(sun.sunrise_UTC, tz)));
  times.appendChild(mkEl("span", null, "↓ " + fmtClock(sun.sunset_UTC, tz)));
  if (sun.day_length_seconds != null) times.appendChild(mkEl("span", "wxd-sun-len", fmtDayLen(sun.day_length_seconds)));
  t.appendChild(times);
  return t;
}

/* ---- NWS-style multi-panel meteogram (gridpoint series) ---- */
const SVGNS = "http://www.w3.org/2000/svg";
function svgEl(tag, attrs) {
  const e = document.createElementNS(SVGNS, tag);
  if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]);
  return e;
}
function fmtHourShort(iso, tz) { return fmtHour(iso, tz).replace(" AM", "a").replace(" PM", "p").replace(" ", ""); }
function fmtDayShort(iso, tz) { try { return new Date(iso).toLocaleDateString("en-US", { weekday: "short", timeZone: tz }); } catch (e) { return ""; } }
function localDateKey(iso, tz) { try { return new Date(iso).toLocaleDateString("en-US", { timeZone: tz }); } catch (e) { return ""; } }
const MG_PANELS = [
  { key: "temp", h: 116, label: "Temperature", unit: "°F", axis: "temp", lines: [
    { label: "Temp", color: "#ff8f6b", unit: "°", w: 2.1, get: (s) => s.temp_F },
    { label: "Feels", color: "#ffcf5c", unit: "°", w: 1.4, dash: "4 3", get: (s) => s.apparent_F },
    { label: "Dew", color: "#3fd39b", unit: "°", w: 1.5, get: (s) => s.dewpoint_F }
  ] },
  { key: "precip", h: 94, label: "Precipitation", unit: "% · in/hr", axis: "pct", kind: "precip" },
  { key: "wind", h: 98, label: "Wind", unit: "mph", axis: "wind", dir: true, lines: [
    { label: "Wind", color: "#b39dff", unit: " mph", w: 1.9, get: (s) => s.wind_mph },
    { label: "Gust", color: "#7b8db0", unit: " mph", w: 1.4, dash: "4 3", get: (s) => s.gust_mph }
  ] },
  { key: "sky", h: 90, label: "Sky & humidity", unit: "%", axis: "pct", lines: [
    { label: "Sky", color: "#9aa7bf", unit: "%", w: 1.6, area: "rgba(154,167,191,0.12)", get: (s) => s.sky },
    { label: "RH", color: "#56c4d6", unit: "%", w: 1.6, get: (s) => s.rh }
  ] }
];
const mgState = { range: 24 };
let chartRerender = null;
let chartResizeTimer = null;
window.addEventListener("resize", () => {
  clearTimeout(chartResizeTimer);
  chartResizeTimer = setTimeout(() => {
    const body = document.getElementById("wxdBody");
    if (chartRerender && body && body.querySelector(".wxd-meteo")) chartRerender();
  }, 180);
});
function addTip(tip, color, label, val) {
  const row = mkEl("div", "wxd-tip-row");
  const sw = mkEl("span", "wxd-tip-sw"); sw.style.background = color; row.appendChild(sw);
  row.appendChild(mkEl("span", "wxd-tip-lbl", label));
  row.appendChild(mkEl("span", "wxd-tip-val", val));
  tip.appendChild(row);
}

function buildMeteogram(d, tz) {
  const s = d.hourlySeries;
  if (!s || !Array.isArray(s.times) || !s.times.length) return buildHourly(d.hourly, d.astronomy && d.astronomy.sun, tz);
  const sec = mkEl("div", "wxd-section wxd-meteo-sec");
  const head = mkEl("div", "wxd-chart-head");
  head.appendChild(mkEl("div", "wxd-section-label", "Hourly meteogram"));
  const rangeWrap = mkEl("div", "wxd-range-toggle");
  const maxH = s.times.length;
  const opts = [24, 48, 72].filter((r) => r <= maxH);
  if (!opts.length) opts.push(maxH);
  if (mgState.range > maxH) mgState.range = opts[0];
  for (const rn of opts) {
    const b = mkEl("button", "wxd-rt", rn + "h");
    b.dataset.rn = rn;
    b.onclick = (e) => { e.stopPropagation(); mgState.range = rn; render(); };
    rangeWrap.appendChild(b);
  }
  head.appendChild(rangeWrap);
  sec.appendChild(head);
  const callout = mkEl("div", "wxd-nextrain");
  sec.appendChild(callout);
  const wrap = mkEl("div", "wxd-chart-wrap");
  const holder = mkEl("div", "wxd-chart-svg");
  const tip = mkEl("div", "wxd-chart-tip");
  tip.style.display = "none";
  wrap.appendChild(holder);
  wrap.appendChild(tip);
  sec.appendChild(wrap);
  function render() {
    for (const b of rangeWrap.children) b.classList.toggle("on", Number(b.dataset.rn) === mgState.range);
    drawMeteogram(holder, tip, wrap, s, tz);
    updateNextRain(callout, s, mgState.range, tz);
  }
  chartRerender = render;
  requestAnimationFrame(render);
  render();
  return sec;
}

function drawMeteogram(holder, tip, wrap, s, tz) {
  clearNode(holder);
  tip.style.display = "none";
  const n = Math.min(mgState.range, s.times.length);
  const cw = Math.max(300, Math.round(wrap.clientWidth || holder.clientWidth || 720));
  const padL = 38, padR = 14, gap = 12, axisH = 20, topPad = 28;
  const plotW = cw - padL - padR;
  const xAt = (i) => padL + (n <= 1 ? plotW / 2 : (i / (n - 1)) * plotW);
  let totalH = topPad;
  for (const p of MG_PANELS) totalH += p.h + gap;
  totalH += axisH;
  const svg = svgEl("svg", { viewBox: "0 0 " + cw + " " + totalH, class: "wxd-meteo", preserveAspectRatio: "none", height: totalH });
  svg.setAttribute("width", "100%");
  const dayKeys = s.times.slice(0, n).map((t) => localDateKey(t, tz));
  const bounds = [];
  for (let i = 1; i < n; i++) if (dayKeys[i] !== dayKeys[i - 1]) bounds.push(i);
  const t0 = Date.parse(s.times[0]), nowIdx = (Date.now() - t0) / 36e5;
  const nowX = (nowIdx >= 0 && nowIdx <= n - 1) ? padL + (nowIdx / (n - 1)) * plotW : null;
  let y = topPad;
  const panelMeta = [];
  for (const p of MG_PANELS) {
    const top = y, bot = top + p.h;
    svg.appendChild(svgEl("rect", { x: padL, y: top, width: plotW, height: p.h, fill: "rgba(255,255,255,0.014)", stroke: "rgba(255,255,255,0.05)", "stroke-width": 1, rx: 6 }));
    const lb = svgEl("text", { x: padL + 7, y: top + 13, class: "wxd-panel-lbl" });
    lb.textContent = p.label;
    svg.appendChild(lb);
    if (p.unit) { const ut = svgEl("text", { x: padL + 7, y: top + 24, class: "wxd-panel-unit" }); ut.textContent = p.unit; svg.appendChild(ut); }
    // per-panel legend (colored swatch + muted label), laid out right-to-left
    const legendItems = p.kind === "precip" ? [{ label: "Chance", color: "#56a8ff" }, { label: "Rate", color: "#9085e9" }] : (p.lines || []).map((ln) => ({ label: ln.label, color: ln.color }));
    let lx = padL + plotW - 8;
    for (let li = legendItems.length - 1; li >= 0; li--) {
      const it = legendItems[li];
      const txt = svgEl("text", { x: lx, y: top + 13, "text-anchor": "end", class: "wxd-legend-lbl" });
      txt.textContent = it.label;
      svg.appendChild(txt);
      lx -= it.label.length * 5.4 + 6;
      svg.appendChild(svgEl("circle", { cx: lx, cy: top + 9.5, r: 3, fill: it.color }));
      lx -= 11;
    }
    let lo, hi;
    if (p.axis === "pct") { lo = 0; hi = 100; }
    else if (p.axis === "wind") {
      lo = 0; hi = 10;
      for (let i = 0; i < n; i++) { if (s.wind_mph[i] != null) hi = Math.max(hi, s.wind_mph[i]); if (s.gust_mph[i] != null) hi = Math.max(hi, s.gust_mph[i]); }
      hi = Math.ceil(hi / 5) * 5;
    } else {
      lo = Infinity; hi = -Infinity;
      for (const ln of p.lines) { const a = ln.get(s); for (let i = 0; i < n; i++) if (a[i] != null) { lo = Math.min(lo, a[i]); hi = Math.max(hi, a[i]); } }
      if (!isFinite(lo)) { lo = 40; hi = 90; }
      lo = Math.floor((lo - 3) / 5) * 5; hi = Math.ceil((hi + 3) / 5) * 5; if (hi === lo) hi += 10;
    }
    const innerTop = top + 4, innerBot = bot - 4;
    const yOf = (v) => innerBot - ((v - lo) / (hi - lo)) * (innerBot - innerTop);
    panelMeta.push({ p, top, bot, yOf });
    for (let g = 0; g <= 2; g++) {
      const gv = lo + (g / 2) * (hi - lo), gy = yOf(gv);
      if (g === 1) svg.appendChild(svgEl("line", { x1: padL, y1: gy, x2: padL + plotW, y2: gy, stroke: "rgba(255,255,255,0.05)", "stroke-width": 1 }));
      const tx = svgEl("text", { x: padL - 6, y: gy + 3, "text-anchor": "end", class: "wxd-axis-lbl" });
      tx.textContent = Math.round(gv) + (p.axis === "pct" ? "%" : "");
      svg.appendChild(tx);
    }
    for (const bi of bounds) svg.appendChild(svgEl("line", { x1: xAt(bi), y1: top, x2: xAt(bi), y2: bot, stroke: "rgba(255,255,255,0.08)", "stroke-width": 1 }));
    if (nowX != null) svg.appendChild(svgEl("line", { x1: nowX, y1: top, x2: nowX, y2: bot, stroke: "rgba(255,209,102,0.4)", "stroke-width": 1, "stroke-dasharray": "3 3" }));
    if (p.kind === "precip") {
      const pts = [];
      for (let i = 0; i < n; i++) if (s.pop[i] != null) pts.push([xAt(i), yOf(s.pop[i])]);
      if (pts.length) {
        let area = "M " + pts[0][0].toFixed(1) + " " + innerBot.toFixed(1);
        for (const q of pts) area += " L " + q[0].toFixed(1) + " " + q[1].toFixed(1);
        area += " L " + pts[pts.length - 1][0].toFixed(1) + " " + innerBot.toFixed(1) + " Z";
        svg.appendChild(svgEl("path", { d: area, fill: "rgba(86,168,255,0.18)", stroke: "none" }));
        let line = ""; pts.forEach((q, idx) => line += (idx ? " L " : "M ") + q[0].toFixed(1) + " " + q[1].toFixed(1));
        svg.appendChild(svgEl("path", { d: line, fill: "none", stroke: "#56a8ff", "stroke-width": 1.8 }));
      }
      let qmax = 0.04; for (let i = 0; i < n; i++) if (s.qpf_in[i] != null) qmax = Math.max(qmax, s.qpf_in[i]);
      const bw = Math.max(1.5, plotW / n * 0.5);
      for (let i = 0; i < n; i++) {
        const q = s.qpf_in[i];
        if (q == null || q <= 0) continue;
        const bh = (q / qmax) * (innerBot - innerTop) * 0.92;
        svg.appendChild(svgEl("rect", { x: (xAt(i) - bw / 2).toFixed(1), y: (innerBot - bh).toFixed(1), width: bw.toFixed(1), height: bh.toFixed(1), rx: 1, fill: "rgba(144,133,233,0.75)" }));
      }
    } else {
      for (const ln of p.lines) {
        if (!ln.area) continue;
        const a = ln.get(s), pts = [];
        for (let i = 0; i < n; i++) if (a[i] != null) pts.push([xAt(i), yOf(a[i])]);
        if (!pts.length) continue;
        let area = "M " + pts[0][0].toFixed(1) + " " + innerBot.toFixed(1);
        for (const q of pts) area += " L " + q[0].toFixed(1) + " " + q[1].toFixed(1);
        area += " L " + pts[pts.length - 1][0].toFixed(1) + " " + innerBot.toFixed(1) + " Z";
        svg.appendChild(svgEl("path", { d: area, fill: ln.area, stroke: "none" }));
      }
      for (const ln of p.lines) {
        const a = ln.get(s); let line = "", started = false;
        for (let i = 0; i < n; i++) { if (a[i] == null) continue; line += (started ? " L " : "M ") + xAt(i).toFixed(1) + " " + yOf(a[i]).toFixed(1); started = true; }
        if (line) { const at = { d: line, fill: "none", stroke: ln.color, "stroke-width": ln.w, "stroke-linejoin": "round", "stroke-linecap": "round" }; if (ln.dash) at["stroke-dasharray"] = ln.dash; svg.appendChild(svgEl("path", at)); }
      }
      if (p.dir && s.windDir) {
        const dstep = n <= 24 ? 2 : n <= 48 ? 3 : 4;
        const ay = bot - 6;
        for (let i = 0; i < n; i += dstep) {
          const wd = s.windDir[i];
          if (wd == null) continue;
          const ar = svgEl("text", { x: xAt(i).toFixed(1), y: ay, "text-anchor": "middle", class: "wxd-dir-arrow" });
          ar.textContent = "↑";
          ar.setAttribute("transform", "rotate(" + (wd + 180) + " " + xAt(i).toFixed(1) + " " + (ay - 3) + ")");
          svg.appendChild(ar);
        }
      }
    }
    y = bot + gap;
  }
  const axisY = y;
  const step = n <= 24 ? 3 : 6;
  for (let i = 0; i < n; i += step) {
    const tx = svgEl("text", { x: xAt(i), y: axisY + 4, "text-anchor": "middle", class: "wxd-axis-lbl" });
    tx.textContent = fmtHourShort(s.times[i], tz);
    svg.appendChild(tx);
  }
  for (const bi of bounds) {
    svg.appendChild(svgEl("line", { x1: xAt(bi).toFixed(1), y1: 14, x2: xAt(bi).toFixed(1), y2: topPad, stroke: "rgba(255,255,255,0.12)", "stroke-width": 1 }));
    const tx = svgEl("text", { x: (xAt(bi) + 4).toFixed(1), y: 12, "text-anchor": "start", class: "wxd-day-div-lbl" });
    tx.textContent = fmtDayShort(s.times[bi], tz);
    svg.appendChild(tx);
  }
  if (nowX != null) { const nl = svgEl("text", { x: nowX.toFixed(1), y: 12, "text-anchor": "middle", class: "wxd-now-lbl" }); nl.textContent = "NOW"; svg.appendChild(nl); }
  const plotTop = topPad, plotBot = y - gap;
  const cross = svgEl("line", { x1: 0, y1: plotTop, x2: 0, y2: plotBot, stroke: "rgba(230,237,246,0.5)", "stroke-width": 1, visibility: "hidden" });
  svg.appendChild(cross);
  const dotG = svgEl("g", { visibility: "hidden" });
  svg.appendChild(dotG);
  const overlay = svgEl("rect", { x: padL, y: plotTop, width: plotW, height: plotBot - plotTop, fill: "transparent" });
  svg.appendChild(overlay);
  function hide() { cross.setAttribute("visibility", "hidden"); dotG.setAttribute("visibility", "hidden"); tip.style.display = "none"; }
  function move(ev) {
    const rect = svg.getBoundingClientRect();
    if (!rect.width) return;
    const clientX = ev.touches && ev.touches[0] ? ev.touches[0].clientX : ev.clientX;
    if (clientX == null) return;
    let i = Math.round(((clientX - rect.left) / rect.width * cw - padL) / plotW * (n - 1));
    i = Math.max(0, Math.min(n - 1, i));
    const x = xAt(i);
    cross.setAttribute("x1", x); cross.setAttribute("x2", x); cross.setAttribute("visibility", "visible");
    clearNode(dotG);
    clearNode(tip);
    tip.appendChild(mkEl("div", "wxd-tip-time", fmtDayShort(s.times[i], tz) + " " + fmtHour(s.times[i], tz)));
    for (const pm of panelMeta) {
      if (pm.p.kind === "precip") {
        if (s.pop[i] != null) { dotG.appendChild(svgEl("circle", { cx: x, cy: pm.yOf(s.pop[i]), r: 2.6, fill: "#5ab9ff", stroke: "var(--panel-solid)", "stroke-width": 1 })); addTip(tip, "#5ab9ff", "Precip", s.pop[i] + "%"); }
        if (s.qpf_in[i] != null && s.qpf_in[i] > 0) addTip(tip, "#9c7eff", "Rain", s.qpf_in[i].toFixed(2) + '"/hr');
      } else {
        for (const ln of pm.p.lines) { const v = ln.get(s)[i]; if (v == null) continue; dotG.appendChild(svgEl("circle", { cx: x, cy: pm.yOf(v), r: 2.6, fill: ln.color, stroke: "var(--panel-solid)", "stroke-width": 1 })); addTip(tip, ln.color, ln.label, Math.round(v) + ln.unit); }
        if (pm.p.dir && s.windDir && s.windDir[i] != null) addTip(tip, "#c7b3ff", "Dir", degToCompass(s.windDir[i]));
      }
    }
    dotG.setAttribute("visibility", "visible");
    tip.style.display = "block";
    const wrapRect = wrap.getBoundingClientRect();
    const anchor = (x / cw) * rect.width + (rect.left - wrapRect.left);
    const tw = tip.offsetWidth || 130;
    let px = anchor + 14;
    if (px + tw + 6 > wrapRect.width) px = anchor - tw - 14;
    px = Math.max(4, Math.min(px, wrapRect.width - tw - 4));
    tip.style.left = px + "px";
    tip.style.top = "4px";
  }
  overlay.addEventListener("mousemove", move);
  overlay.addEventListener("mouseleave", hide);
  overlay.addEventListener("touchstart", move, { passive: true });
  overlay.addEventListener("touchmove", move, { passive: true });
  overlay.addEventListener("touchend", hide);
  holder.appendChild(svg);
}

function updateNextRain(el, s, range, tz) {
  clearNode(el);
  const n = Math.min(range, s.pop.length);
  let idx = -1;
  for (let i = 0; i < n; i++) if (s.pop[i] != null && s.pop[i] >= 30) { idx = i; break; }
  let peak = 0; for (let i = 0; i < n; i++) if (s.pop[i] != null && s.pop[i] > peak) peak = s.pop[i];
  const dot = mkEl("span", "wxd-nextrain-dot");
  if (idx < 0) {
    dot.style.background = "#51e0a3";
    el.appendChild(dot);
    el.appendChild(mkEl("span", null, "Rain chance stays low (under 30%) through the next " + n + " hours."));
    return;
  }
  dot.style.background = popColor(peak);
  el.appendChild(dot);
  const when = idx === 0 ? "now" : "around " + fmtHour(s.times[idx], tz);
  el.appendChild(mkEl("span", null, "Rain chance reaches " + s.pop[idx] + "% " + when + ", peaking at " + peak + "%."));
}

function buildModules(d, tz) {
  const cur = d.current, ast = d.astronomy, aq = d.airQuality, sev = d.severe;
  const nodes = [];
  if (cur && cur.windSpeed_mph != null) {
    const sub = [];
    if (cur.windGust_mph != null) sub.push("gusts " + cur.windGust_mph);
    if (cur.windDir_deg != null) sub.push("from " + degToCompass(cur.windDir_deg));
    const t = mkTile("Wind", cur.windSpeed_mph + " mph", sub.join("  ·  "), null, "Give me the wind forecast and any wind hazards for my location.");
    if (cur.windDir_deg != null) {
      const arrow = mkEl("span", "wxd-wind-arrow", "↑");
      arrow.style.transform = "rotate(" + (cur.windDir_deg + 180) + "deg)";
      t.querySelector(".wxd-tile-label").appendChild(arrow);
    }
    nodes.push(t);
  }
  if (cur && cur.humidity_pct != null) nodes.push(mkTile("Humidity", cur.humidity_pct + "%", cur.dewpoint_F != null ? "dewpoint " + Math.round(cur.dewpoint_F) + "°" : "", null, "How humid is it and what is the dewpoint at my location?"));
  if (cur && cur.pressure_inHg != null) nodes.push(mkTile("Pressure", cur.pressure_inHg + '"', "inHg", null, "What is the barometric pressure at my location?"));
  if (cur && cur.visibility_mi != null) nodes.push(mkTile("Visibility", cur.visibility_mi + " mi", "", null, "What is the visibility and are there obstructions (fog, haze, smoke) at my location?"));
  if (aq && aq.worst) nodes.push(mkTile("Air Quality", "AQI " + aq.worst.aqi, (aq.worst.category || "") + (aq.worst.parameter ? "  ·  " + aq.worst.parameter : ""), aqiColor(aq.worst.aqi), "Give me the current air quality by pollutant and the outlook for the next 24 hours."));
  if (sev && sev.day1 && sev.day1.categorical && sev.day1.categorical.rank > 0) {
    const c = sev.day1;
    const sub = "tor " + (c.tornado ? c.tornado.probability : "—") + "  ·  wind " + (c.wind ? c.wind.probability : "—") + "  ·  hail " + (c.hail ? c.hail.probability : "—");
    const st = mkTile("SPC Day 1", c.categorical.label, sub, catColor(c.categorical.rank), "What is the SPC convective outlook for day 1 at my location? Include categorical risk and tornado/wind/hail probabilities.");
    if (c.categorical.rank >= 4) st.style.borderColor = "var(--err)";
    else if (c.categorical.rank >= 2) st.style.borderColor = "var(--warn)";
    nodes.push(st);
  }
  if (ast && ast.sun && ast.sun.sunrise_UTC && ast.sun.sunset_UTC) nodes.push(buildSunTile(ast.sun, tz));
  if (ast && ast.moon && ast.moon.phase) {
    const mt = mkTile("Moon", moonEmoji(ast.moon.phase), ast.moon.phase + (ast.moon.illumination_pct != null ? "  ·  " + ast.moon.illumination_pct + "% lit" : ""), null, "What is the moon phase and illumination tonight?");
    mt.querySelector(".wxd-tile-value").classList.add("wxd-moon-glyph");
    nodes.push(mt);
  }
  if (!nodes.length) return null;
  const sec = mkEl("div", "wxd-section");
  sec.appendChild(mkEl("div", "wxd-section-label", "Conditions & sky"));
  const grid = mkEl("div", "wxd-modules");
  for (const n of nodes) grid.appendChild(n);
  sec.appendChild(grid);
  return sec;
}

let dashToken = 0;
let dashRenderedKey = null;
async function refreshDashboard() {
  const top = document.getElementById("wxdTop");
  const body = document.getElementById("wxdBody");
  const wrap = document.getElementById("wxDashboard");
  if (!top || !body) return;
  if (!document.body.contains(empty)) return;
  const l = currentLoc();
  const key = l.lat + "," + l.lon;
  const myToken = ++dashToken;
  const label = document.getElementById("examplesLabel");
  if (label) label.textContent = "Or ask about " + (l.name || "your area");
  // Reset to a skeleton on first paint OR whenever the location changed, so the
  // previous location's readings never linger under the new location's name.
  if (!top.children.length || key !== dashRenderedKey) {
    clearNode(top);
    clearNode(body);
    const sk = mkEl("div", "wxd-hero wxd-skel");
    sk.style.minHeight = "120px";
    top.appendChild(sk);
    top.hidden = false;
    body.hidden = true;
    if (wrap) wrap.hidden = false;
  }
  try {
    const r = await fetch("/api/dashboard?lat=" + l.lat + "&lon=" + l.lon + "&office=" + encodeURIComponent(l.office || ""));
    const d = await r.json();
    if (myToken !== dashToken) return;
    if (!r.ok || !d || d.error) { dashRenderedKey = null; renderDashboard(null); return; }
    dashRenderedKey = key;
    renderDashboard(d);
  } catch (e) {
    if (myToken !== dashToken) return;
    dashRenderedKey = null;
    renderDashboard(null);
  }
}
function renderDashboard(d) {
  const top = document.getElementById("wxdTop");
  const body = document.getElementById("wxdBody");
  const wrap = document.getElementById("wxDashboard");
  if (!top || !body) return;
  clearNode(top);
  clearNode(body);
  if (!d) { top.hidden = true; body.hidden = true; if (wrap) wrap.hidden = true; return; }
  const tz = (d.location && d.location.timeZone) || undefined;
  // TOP — hazards, then the hero conditions card.
  if (d.alerts && d.alerts.length) top.appendChild(buildAlerts(d.alerts, tz));
  const hero = buildHero(d, tz);
  if (hero) top.appendChild(hero);
  top.hidden = !top.children.length;
  // BODY — full-width meteogram, dense 7-day table, then the conditions tiles.
  const chart = buildMeteogram(d, tz);
  if (chart) body.appendChild(chart);
  const daily = buildDaily(d.daily);
  if (daily) body.appendChild(daily);
  const modules = buildModules(d, tz);
  if (modules) body.appendChild(modules);
  body.hidden = !body.children.length;
  if (wrap) wrap.hidden = !(top.children.length || body.children.length);
}

function maybeAutoDetectLocation() {
  if (!state.geo) state.geo = { tried: false };
  if (state.geo.tried) return;
  // Only auto-detect for a fresh/default-only setup — never hijack a curated list.
  if (!onlyHasDefaultLocation()) { state.geo.tried = true; saveState(); return; }
  if (!navigator.geolocation) { state.geo.tried = true; saveState(); return; }
  state.geo.tried = true;
  saveState();
  navigator.geolocation.getCurrentPosition(async pos => {
    const lat = Math.round(pos.coords.latitude * 1e4) / 1e4;
    const lon = Math.round(pos.coords.longitude * 1e4) / 1e4;
    try {
      const info = await nwsPointInfo(lat, lon);
      const name = info.city && info.state ? info.city + ", " + info.state : "My location";
      addLocation({ name, lat, lon, office: info.office, source: "geo" });
      pruneDefaultLocations();
      renderLocPicker();
      refreshNowCard();
      refreshSummary();
      showGeo("Location set ✓", false);
    } catch (e) {
      showGeo("Couldn't resolve your location", true);
    }
  }, err => {
    /* Denied or unavailable — keep the current/default location silently. */
  }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 });
}

function timeAgo(ts) {
  const diff = (Date.now() - ts) / 1000;
  if (diff < 60) return "now";
  if (diff < 3600) return Math.floor(diff/60) + "m ago";
  if (diff < 86400) return Math.floor(diff/3600) + "h ago";
  if (diff < 604800) return Math.floor(diff/86400) + "d ago";
  const d = new Date(ts);
  return (d.getMonth()+1) + "/" + d.getDate();
}

function renderThreadList() {
  threadList.innerHTML = "";
  if (!state.order.length) {
    threadList.innerHTML = '<div class="thread-empty">No chats yet</div>';
    return;
  }
  for (const id of state.order) {
    const t = state.threads[id];
    if (!t) continue;
    const div = document.createElement("div");
    div.className = "thread-item" + (id === state.activeId ? " active" : "");
    const title = document.createElement("div");
    title.className = "thread-title";
    title.textContent = t.title || "New chat";
    const meta = document.createElement("div");
    meta.className = "thread-meta";
    meta.textContent = timeAgo(t.updatedAt) + " \xB7 " + t.messages.length + " msg";
    const del = document.createElement("button");
    del.className = "thread-del";
    del.title = "Delete chat";
    del.textContent = "×";
    del.onclick = (e) => {
      e.stopPropagation();
      if (confirm("Delete this chat?")) deleteThread(id);
    };
    div.appendChild(title);
    div.appendChild(meta);
    div.appendChild(del);
    div.onclick = () => { switchThread(id); if (window.innerWidth < 740) sidebar.classList.add("collapsed"); };
    threadList.appendChild(div);
  }
}

function renderMessages() {
  const t = activeThread();
  while (messagesEl.firstChild) messagesEl.removeChild(messagesEl.firstChild);
  if (!t.messages.length) {
    messagesEl.appendChild(empty);
    empty.style.display = "block";
    refreshSummary();
    return;
  }
  const inner = document.createElement("div");
  inner.className = "messages-inner";
  for (const m of t.messages) inner.appendChild(renderMessage(m));
  messagesEl.appendChild(inner);
  requestAnimationFrame(() => { messagesEl.scrollTop = messagesEl.scrollHeight; });
}

function renderMessage(m) {
  const wrap = document.createElement("div");
  wrap.className = "msg " + m.role;
  const tag = document.createElement("div");
  tag.className = "role-tag";
  tag.textContent = m.role === "user" ? "You" : "Assistant";
  wrap.appendChild(tag);

  if (m.trace && m.trace.length) {
    const tr = document.createElement("div");
    tr.className = "trace";
    for (const tt of m.trace) {
      const chip = document.createElement("span");
      chip.className = "tool-chip" + (tt.ok ? "" : " err");
      const dot = document.createElement("span");
      dot.className = "dot";
      chip.appendChild(dot);
      chip.appendChild(document.createTextNode(" " + tt.name + " "));
      if (tt.ms) {
        const ms = document.createElement("span");
        ms.className = "ms";
        ms.textContent = tt.ms + "ms";
        chip.appendChild(ms);
      }
      const detail = document.createElement("div");
      detail.className = "tool-details";
      detail.style.display = "none";
      detail.textContent = "input: " + JSON.stringify(tt.input || {}, null, 2) + "\\n\\n" + (tt.error ? "error: " + tt.error : "preview: " + (tt.preview || ""));
      chip.onclick = () => { detail.style.display = detail.style.display === "none" ? "block" : "none"; };
      tr.appendChild(chip);
      tr.appendChild(detail);
    }
    wrap.appendChild(tr);
  }

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  if (m.thinking) {
    bubble.innerHTML = '<span class="thinking"><span class="label">Thinking</span><span class="dot"></span><span class="dot"></span><span class="dot"></span></span>';
  } else {
    bubble.innerHTML = renderMarkdown(m.content || "");
  }
  wrap.appendChild(bubble);
  return wrap;
}

function renderAll() {
  renderLocPicker();
  renderThreadList();
  renderMessages();
}

async function ask(text) {
  if (!text.trim()) return;
  const t = activeThread();
  t.messages.push({ role: "user", content: text });
  if (t.title === "New chat" || !t.title) t.title = titleFromText(text);
  t.updatedAt = Date.now();
  if (t.messages.length > MAX_MSGS_PER_THREAD) t.messages.splice(0, t.messages.length - MAX_MSGS_PER_THREAD);
  state.order = [t.id, ...state.order.filter(x => x !== t.id)];
  saveState();
  renderAll();
  input.value = "";
  input.style.height = "auto";
  sendBtn.disabled = true;

  t.messages.push({ role: "assistant", content: "", thinking: true, trace: [] });
  renderMessages();

  try {
    const outbound = t.messages.slice(0, -1).map(({role, content}) => ({ role, content }));
    const resp = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ messages: outbound, location: currentLoc() })
    });
    const data = await resp.json();
    t.messages.pop();
    if (!resp.ok) {
      t.messages.push({
        role: "assistant",
        content: "**Error:** " + (data.error || "unknown") + (data.details ? "\\n\\n\`\`\`\\n" + JSON.stringify(data.details).slice(0, 500) + "\\n\`\`\`" : ""),
        trace: data.trace || []
      });
    } else {
      t.messages.push({
        role: "assistant",
        content: data.response || "(no response)",
        trace: data.trace || []
      });
    }
    t.updatedAt = Date.now();
    saveState();
    renderAll();
  } catch (e) {
    t.messages.pop();
    t.messages.push({ role: "assistant", content: "**Network error:** " + e.message });
    saveState();
    renderAll();
  } finally {
    sendBtn.disabled = false;
    input.focus();
  }
}

form.onsubmit = e => { e.preventDefault(); ask(input.value); };
input.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); form.requestSubmit(); }
});
input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = Math.min(input.scrollHeight, 200) + "px";
});

function startNewChat() {
  const cur = state.activeId && state.threads[state.activeId];
  if (!(cur && cur.messages.length === 0)) {
    newThread();
    renderAll();
  }
  input.focus();
  if (window.innerWidth < 740) sidebar.classList.add("collapsed");
}
$("#newChatBtn").onclick = startNewChat;
$("#topbarNew").onclick = startNewChat;
document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && !e.shiftKey && !e.altKey && (e.key === "k" || e.key === "K")) {
    e.preventDefault();
    startNewChat();
  }
});

$("#sidebarToggle").onclick = () => sidebar.classList.add("collapsed");
$("#sidebarOpen").onclick = () => sidebar.classList.remove("collapsed");

/* Location picker open/close */
$("#locCurrent").onclick = (e) => {
  e.stopPropagation();
  const willOpen = !locPicker.classList.contains("open");
  locPicker.classList.toggle("open");
  if (willOpen) {
    buildLocMenu();
    const s = document.getElementById("locSearch");
    if (s) { s.value = ""; onLocSearchInput(); setTimeout(() => s.focus(), 30); }
  }
};
document.addEventListener("click", (e) => {
  if (!locPicker.contains(e.target)) locPicker.classList.remove("open");
  const btn = e.target.closest && e.target.closest("#examples button");
  if (btn) {
    input.value = btn.dataset.q || btn.textContent;
    form.requestSubmit();
  } else if (e.target.closest) {
    const card = e.target.closest("#wxDashboard [data-q]");
    if (card && card.dataset.q) {
      input.value = card.dataset.q;
      form.requestSubmit();
    }
  }
});

/* Location modal */
const locModal = $("#locModal");
const lmTitle = $("#lmTitle");
const lmName = $("#lmName");
const lmCityState = $("#lmCityState");
const lmLat = $("#lmLat");
const lmLon = $("#lmLon");
const lmOffice = $("#lmOffice");
const lmError = $("#lmError");
const lmSave = $("#lmSave");
const lmCancel = $("#lmCancel");
const lmClose = $("#lmClose");
let editingLocId = null;

function openLocModal(id) {
  editingLocId = id || null;
  if (id && state.locations[id]) {
    const loc = state.locations[id];
    lmTitle.textContent = "Edit location";
    lmName.value = loc.name || "";
    lmCityState.value = "";
    lmLat.value = loc.lat;
    lmLon.value = loc.lon;
    lmOffice.value = loc.office || "";
  } else {
    lmTitle.textContent = "Add location";
    lmName.value = "";
    lmCityState.value = "";
    lmLat.value = "";
    lmLon.value = "";
    lmOffice.value = "";
  }
  lmError.textContent = "";
  locModal.classList.add("open");
  setTimeout(() => lmName.focus(), 50);
}
function closeLocModal() {
  locModal.classList.remove("open");
  editingLocId = null;
}
lmClose.onclick = closeLocModal;
lmCancel.onclick = closeLocModal;
locModal.addEventListener("click", (e) => { if (e.target === locModal) closeLocModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && locModal.classList.contains("open")) closeLocModal(); });

async function geocodeQuery(q) {
  const r = await fetch("/api/geocode?q=" + encodeURIComponent(q));
  const data = await r.json();
  if (!r.ok) throw new Error(data.error || ("HTTP " + r.status));
  return data;
}
async function nwsPointInfo(lat, lon) {
  const r = await fetch("https://api.weather.gov/points/" + lat + "," + lon, {
    headers: { "Accept": "application/geo+json" }
  });
  if (!r.ok) throw new Error("NWS lookup failed: " + r.status);
  const d = await r.json();
  const p = d.properties || {};
  const city = p.relativeLocation && p.relativeLocation.properties && p.relativeLocation.properties.city || "";
  const st = p.relativeLocation && p.relativeLocation.properties && p.relativeLocation.properties.state || "";
  return { office: (p.gridId || "").toUpperCase(), city, state: st };
}

lmSave.onclick = async () => {
  const name = lmName.value.trim();
  const cityStateQ = lmCityState.value.trim();
  const latRaw = lmLat.value.trim();
  const lonRaw = lmLon.value.trim();
  const officeRaw = lmOffice.value.trim().toUpperCase();
  lmError.textContent = "";

  if (!name) { lmError.textContent = "Name is required."; lmName.focus(); return; }
  if (!cityStateQ && (!latRaw || !lonRaw)) {
    lmError.textContent = "Enter City, State or coordinates.";
    return;
  }

  lmSave.disabled = true;
  const origText = lmSave.textContent;
  lmSave.innerHTML = '<span class="spin-mini"></span>Saving…';

  try {
    let lat, lon, office, displayName = name;
    if (latRaw && lonRaw) {
      lat = parseFloat(latRaw);
      lon = parseFloat(lonRaw);
      if (isNaN(lat) || isNaN(lon)) throw new Error("Invalid coordinates.");
      lat = Math.round(lat * 1e4) / 1e4;
      lon = Math.round(lon * 1e4) / 1e4;
      if (officeRaw && officeRaw.length === 3) {
        office = officeRaw;
      } else {
        try {
          const info = await nwsPointInfo(lat, lon);
          office = info.office;
        } catch (e) {
          if (!officeRaw) throw new Error("No NWS office found for these coordinates. Set one manually in Advanced.");
        }
      }
    } else {
      const g = await geocodeQuery(cityStateQ);
      lat = g.lat;
      lon = g.lon;
      office = g.office || (officeRaw && officeRaw.length === 3 ? officeRaw : null);
      if (!office) throw new Error("Geocoded but no NWS office — try a US city closer to civilization.");
    }

    const loc = { name, lat, lon, office };
    if (editingLocId) {
      updateLocation(editingLocId, loc);
      switchLocation(editingLocId);
    } else {
      addLocation(loc);
      renderLocPicker();
      refreshNowCard();
      refreshSummary();
    }
    closeLocModal();
  } catch (e) {
    lmError.textContent = e.message;
  } finally {
    lmSave.disabled = false;
    lmSave.textContent = origText;
  }
};

[lmName, lmCityState, lmLat, lmLon, lmOffice].forEach(el => {
  el.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); lmSave.click(); } });
});

function showGeo(msg, isError, autoHide) {
  geoStatus.textContent = msg;
  geoStatus.className = "geo-status " + (isError ? "error" : "ok");
  if (autoHide !== false && !isError) setTimeout(() => { geoStatus.textContent = ""; geoStatus.className = "geo-status"; }, 3500);
}
function useMyLocation() {
  locPicker.classList.remove("open");
  if (!navigator.geolocation) { showGeo("Geolocation not supported", true); return; }
  showGeo("Locating…", false, false);
  navigator.geolocation.getCurrentPosition(async pos => {
    const lat = Math.round(pos.coords.latitude * 1e4) / 1e4;
    const lon = Math.round(pos.coords.longitude * 1e4) / 1e4;
    showGeo("Resolving NWS grid…", false, false);
    try {
      const info = await nwsPointInfo(lat, lon);
      const name = info.city && info.state ? info.city + ", " + info.state : "My location";
      addLocation({ name, lat, lon, office: info.office, source: "geo" });
      pruneDefaultLocations();
      renderLocPicker();
      refreshNowCard();
      refreshSummary();
      showGeo("Location set ✓", false);
    } catch (e) {
      showGeo("Lookup failed: " + e.message, true);
    }
  }, err => {
    const msgs = { 1: "Permission denied", 2: "Position unavailable", 3: "Timed out" };
    showGeo(msgs[err.code] || "Geolocation error", true);
  }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 });
}

if (!Object.keys(state.threads).length) newThread();
if (!state.activeId || !state.threads[state.activeId]) state.activeId = state.order[0] || null;
if (!state.activeId) newThread();
renderAll();
refreshNowCard();
setInterval(refreshNowCard, 10 * 60 * 1000);
setInterval(refreshSummary, 30 * 60 * 1000);
setInterval(refreshDashboard, 10 * 60 * 1000);
maybeAutoDetectLocation();
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
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-cache, must-revalidate"
        }
      });
    }
    if (request.method === "POST" && url.pathname === "/api/chat") {
      return handleChat(request, env2);
    }
    if (request.method === "GET" && url.pathname === "/api/geocode") {
      return handleGeocode(request, env2);
    }
    if (request.method === "GET" && url.pathname === "/api/geosearch") {
      return handleGeoSearch(request, env2);
    }
    if (request.method === "GET" && url.pathname === "/api/summary") {
      return handleSummary(request, env2);
    }
    if (request.method === "GET" && url.pathname === "/api/dashboard") {
      return handleDashboard(request, env2);
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
  const model = body.model || env2.MODEL || "accounts/fireworks/routers/glm-5p2-fast";
  const messages = [
    { role: "system", content: buildSystemPrompt(location) },
    ...userTurns
  ];
  const trace3 = [];
  const apiKey = env2.FIREWORKS_API_KEY;
  if (!apiKey) {
    return Response.json({
      error: "FIREWORKS_API_KEY is not configured.",
      details: "Set it with: wrangler secret put FIREWORKS_API_KEY"
    }, { status: 500 });
  }
  // GLM 5.2 reasons by default. Override via REASONING_EFFORT
  // ("low" for lower latency, "high" for the most thorough reasoning).
  const reasoningEffort = env2.REASONING_EFFORT || null;
  const maxTokens = parseInt(env2.MAX_TOKENS || "8192", 10);
  try {
    for (let i = 0; i < MAX_TOOL_ITERATIONS; i++) {
      const payload = {
        model,
        messages,
        tools: TOOLS,
        tool_choice: "auto",
        max_tokens: maxTokens,
        temperature: 0.4
      };
      if (reasoningEffort) payload.reasoning_effort = reasoningEffort;
      const aiResp = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });
      if (!aiResp.ok) {
        const errText = await aiResp.text();
        return Response.json({
          error: `Fireworks API error (HTTP ${aiResp.status})`,
          details: errText.slice(0, 1000),
          trace: trace3
        }, { status: 502 });
      }
      const resp = await aiResp.json();
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
      // Preserve the model's reasoning across tool iterations: interleaved
      // thinking fires when the last message is a tool result, and GLM 5.2
      // needs the prior turn's reasoning_content to use it.
      if (msg.reasoning_content) {
        assistantMsg.reasoning_content = msg.reasoning_content;
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
async function handleGeocode(request, env2) {
  const url = new URL(request.url);
  const q = (url.searchParams.get("q") || "").trim();
  if (!q) return Response.json({ error: "missing q" }, { status: 400 });
  const ua = env2.NWS_USER_AGENT || "WeatherChatBot/1.0 (contact@example.com)";
  let lat = null, lon = null, matchedAddress = null, source = null;
  const errors = [];
  try {
    const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=1`;
    const r = await fetch(photonUrl, {
      headers: { "User-Agent": ua, "Accept": "application/json" },
      cf: { cacheTtl: 86400, cacheEverything: true }
    });
    if (r.ok) {
      const data = await r.json();
      const f = data?.features?.[0];
      if (f?.geometry?.coordinates) {
        lon = f.geometry.coordinates[0];
        lat = f.geometry.coordinates[1];
        const pp = f.properties || {};
        matchedAddress = [pp.name, pp.city, pp.state, pp.country].filter(Boolean).join(", ") || pp.name;
        source = "photon";
      } else {
        errors.push("photon: no results");
      }
    } else {
      errors.push(`photon: HTTP ${r.status}`);
    }
  } catch (e) { errors.push(`photon: ${e.message}`); }
  if (lat == null) {
    try {
      const nomUrl = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`;
      const r = await fetch(nomUrl, {
        headers: { "User-Agent": ua, "Accept": "application/json", "Accept-Language": "en" },
        cf: { cacheTtl: 86400, cacheEverything: true }
      });
      if (r.ok) {
        const data = await r.json();
        if (Array.isArray(data) && data[0]) {
          lat = parseFloat(data[0].lat);
          lon = parseFloat(data[0].lon);
          matchedAddress = data[0].display_name;
          source = "nominatim";
        } else {
          errors.push("nominatim: no results");
        }
      } else {
        errors.push(`nominatim: HTTP ${r.status}`);
      }
    } catch (e) { errors.push(`nominatim: ${e.message}`); }
  }
  if (lat == null) {
    try {
      const censusUrl = `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${encodeURIComponent(q)}&benchmark=Public_AR_Current&format=json`;
      const r = await fetch(censusUrl, {
        headers: { "User-Agent": ua, "Accept": "application/json" },
        cf: { cacheTtl: 86400, cacheEverything: true }
      });
      if (r.ok) {
        const data = await r.json();
        const match = data?.result?.addressMatches?.[0];
        if (match?.coordinates) {
          lon = match.coordinates.x;
          lat = match.coordinates.y;
          matchedAddress = match.matchedAddress;
          source = "census";
        } else {
          errors.push("census: no matches (street-address only)");
        }
      } else {
        errors.push(`census: HTTP ${r.status}`);
      }
    } catch (e) { errors.push(`census: ${e.message}`); }
  }
  if (lat == null || lon == null || isNaN(lat) || isNaN(lon)) {
    return Response.json({
      error: `Could not geocode '${q}'. Try a more specific query like 'Madison, AL' or a full street address.`,
      tried: errors
    }, { status: 404 });
  }
  let office = null, displayName = matchedAddress;
  try {
    const la = Math.round(lat * 1e4) / 1e4;
    const lo = Math.round(lon * 1e4) / 1e4;
    const pt = await nwsJSON(`https://api.weather.gov/points/${la},${lo}`, ua, 86400);
    office = pt.properties?.gridId || null;
    const city = pt.properties?.relativeLocation?.properties?.city;
    const state2 = pt.properties?.relativeLocation?.properties?.state;
    if (city && state2) displayName = `${city}, ${state2}`;
  } catch (e) {
    return Response.json({
      lat, lon, matchedAddress, source,
      warning: "Outside NWS coverage (US only) — lat/lon set but no WFO/forecast available",
      office: null
    });
  }
  return Response.json({
    lat: Math.round(lat * 1e4) / 1e4,
    lon: Math.round(lon * 1e4) / 1e4,
    office,
    displayName,
    matchedAddress,
    source
  });
}
__name(handleGeocode, "handleGeocode");
async function handleGeoSearch(request, env2) {
  const url = new URL(request.url);
  const q = (url.searchParams.get("q") || "").trim();
  if (q.length < 2) return Response.json({ results: [] });
  const ua = env2.NWS_USER_AGENT || "WeatherChatBot/1.0 (contact@example.com)";
  let results = [];
  try {
    const photonUrl = `https://photon.komoot.io/api/?limit=8&lang=en&q=${encodeURIComponent(q)}`;
    const data = await fetchJSON(photonUrl, ua, 3600);
    results = (data?.features || []).map((f) => {
      const p = f.properties || {};
      const c = f.geometry?.coordinates || [];
      const name = p.name || [p.housenumber, p.street].filter(Boolean).join(" ") || p.city || "";
      const locality = p.city || p.county || p.district || p.locality || "";
      const region = p.state || "";
      const cc = (p.countrycode || "").toUpperCase();
      const labelParts = [name, locality && locality !== name ? locality : null, region, cc && cc !== "US" ? cc : null].filter(Boolean);
      return { label: labelParts.join(", ") || name, lat: c[1], lon: c[0], city: locality || name, state: region, country: cc };
    }).filter((r) => r.lat != null && r.lon != null && r.label);
    const us = results.filter((r) => r.country === "US" || r.country === "");
    if (us.length) results = us;
  } catch (e) {
    results = [];
  }
  if (!results.length) {
    try {
      const nomUrl = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=8&countrycodes=us&q=${encodeURIComponent(q)}`;
      const data = await fetchJSON(nomUrl, ua, 3600);
      results = (Array.isArray(data) ? data : []).map((d) => {
        const a = d.address || {};
        const city = a.city || a.town || a.village || a.hamlet || a.county || "";
        return { label: d.display_name, lat: parseFloat(d.lat), lon: parseFloat(d.lon), city, state: a.state || "", country: "US" };
      }).filter((r) => !isNaN(r.lat) && !isNaN(r.lon));
    } catch (e) {
    }
  }
  return Response.json({ results: results.slice(0, 6) });
}
__name(handleGeoSearch, "handleGeoSearch");
async function spcCategoricalAtPoint(day, lat, lon, ua) {
  const gj = await fetchSPCLayer(`https://www.spc.noaa.gov/products/outlook/day${day}otlk_cat.lyr.geojson`, ua);
  if (!gj) return null;
  return findHighestRiskAtPoint(gj, [lon, lat]);
}
__name(spcCategoricalAtPoint, "spcCategoricalAtPoint");
async function spcDay1AtPoint(lat, lon, ua) {
  const pt = [lon, lat];
  const base = "https://www.spc.noaa.gov/products/outlook/day1otlk";
  const layerUrls = {
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
    } else {
      atPoint[k] = hit ? { probability: `${hit.label}%`, significant: hit.sig } : null;
    }
  }
  return atPoint;
}
__name(spcDay1AtPoint, "spcDay1AtPoint");
function briefPeriod(p) {
  if (!p) return null;
  return { name: p.name, isDaytime: p.isDaytime, temp: p.temp, sky: p.short, precipPct: p.pop };
}
__name(briefPeriod, "briefPeriod");
function localTimeInfo(tz) {
  const now = /* @__PURE__ */ new Date();
  let hour = now.getUTCHours();
  let timeStr = null;
  try {
    timeStr = new Intl.DateTimeFormat("en-US", {
      timeZone: tz || "UTC",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short"
    }).format(now);
    const h = parseInt(new Intl.DateTimeFormat("en-US", { timeZone: tz || "UTC", hour: "numeric", hour12: false }).format(now), 10);
    if (Number.isFinite(h)) hour = h % 24;
  } catch (e) {
  }
  let partOfDay;
  if (hour < 5) partOfDay = "overnight";
  else if (hour < 12) partOfDay = "morning";
  else if (hour < 17) partOfDay = "afternoon";
  else if (hour < 21) partOfDay = "evening";
  else partOfDay = "night";
  return { hour, timeStr, partOfDay };
}
__name(localTimeInfo, "localTimeInfo");
function deterministicSummary(brief, spcLabel) {
  const parts = [];
  const ps = brief.periods || [];
  for (let i = 0; i < Math.min(3, ps.length); i++) {
    const p = ps[i];
    if (!p) continue;
    let s = `${p.name || (p.isDaytime ? "Day" : "Night")} ${p.temp || ""}`.trim();
    if (p.sky) s += ", " + p.sky;
    if (p.precipPct != null && p.precipPct >= 20) s += ` (${p.precipPct}% precip)`;
    parts.push(s);
  }
  if (spcLabel && spcLabel !== "none") parts.push(`SPC ${spcLabel} risk`);
  return parts.filter(Boolean).join(" \xB7 ");
}
__name(deterministicSummary, "deterministicSummary");
var SUMMARY_SYS = `You write a short at-a-glance weather briefing shown on a weather app's home screen. The input is JSON containing: "localTime" and "partOfDay" (the current clock time and part of day AT THE LOCATION), "periods" (NWS forecast periods in chronological order starting from now — each has a "name" like "Tonight" or "Wednesday", an "isDaytime" flag, temperature, sky, and precip chance), and an SPC day-1 convective risk label.

Anchor everything to the given local time. Narrate the weather in chronological order starting from the CURRENT period (the first item in "periods"), which is what is happening now. NEVER describe a period that has already ended as if it were current or still to come, and match verb tense to the clock (past tense for what already happened, present/future for what is now or ahead).

- Morning/afternoon (partOfDay morning or afternoon): lead with today's conditions and high, then tonight's low, then a brief look ahead to tomorrow.
- Evening/overnight (partOfDay evening, night, or overnight): the daytime and its high are ALREADY OVER — do not present the daytime high as the current or upcoming forecast. Lead with tonight (the low and any lingering or overnight weather), then tomorrow and the day after. You MAY add at most a brief past-tense recap of the day for context (e.g., "after a hot, mostly sunny day"), but the focus is the night ahead and the coming days.

Write 2-3 sentences (roughly 300-450 characters) of flowing prose — no markdown, no line breaks, no bullet points, no quotes, no preamble. Cover, as relevant: the upcoming low/high, the timing and chance of any precipitation, and notable wind or other significant weather. Include convective/severe potential ONLY when it is meteorologically relevant — cite the SPC categorical risk when it is MRGL/SLGT/ENH/MDT/HIGH, or note thunderstorms when the forecast calls for them; if convective activity is not relevant, omit it entirely. Use \xB0F. Be specific and information-dense, like a meteorologist's briefing, but keep it readable. Do not restate the location name or the clock time.`;
async function summaryFromModel(brief, spcLabel, model, apiKey) {
  const payload = {
    model,
    messages: [
      { role: "system", content: SUMMARY_SYS },
      { role: "user", content: JSON.stringify({ ...brief, spcConvectiveRisk: spcLabel || "none" }) }
    ],
    max_tokens: 512,
    temperature: 0.3,
    reasoning_effort: "low"
  };
  const r = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!r.ok) throw new Error(`Fireworks HTTP ${r.status}`);
  const j = await r.json();
  let text = j?.choices?.[0]?.message?.content || "";
  text = text.replace(/\s+/g, " ").trim().replace(/^["'`]+|["'`]+$/g, "").trim();
  if (!text) throw new Error("empty summary");
  return text;
}
__name(summaryFromModel, "summaryFromModel");
async function handleSummary(request, env2) {
  const url = new URL(request.url);
  const lat = parseFloat(url.searchParams.get("lat"));
  const lon = parseFloat(url.searchParams.get("lon"));
  if (isNaN(lat) || isNaN(lon)) return Response.json({ error: "lat and lon required" }, { status: 400 });
  const ua = env2.NWS_USER_AGENT || "WeatherChatBot/1.0 (contact@example.com)";
  const la = Math.round(lat * 100) / 100;
  const lo = Math.round(lon * 100) / 100;
  const bucket = Math.floor(Date.now() / 36e5);
  const cache = caches.default;
  const cacheKey = new Request(`https://wx-summary.internal/v1?lat=${la}&lon=${lo}&h=${bucket}`);
  try {
    const hit = await cache.match(cacheKey);
    if (hit) return hit;
  } catch (e) {
  }
  let brief;
  try {
    const fc = JSON.parse(await getForecast(lat, lon, ua));
    const periods = fc.periods || [];
    const tzInfo = localTimeInfo(fc.timeZone);
    brief = {
      location: fc.location,
      localTime: tzInfo.timeStr,
      partOfDay: tzInfo.partOfDay,
      periods: periods.slice(0, 5).map(briefPeriod).filter(Boolean)
    };
    if (!brief.periods.length) throw new Error("no periods");
  } catch (e) {
    return new Response(JSON.stringify({ summary: null, error: "forecast unavailable" }), {
      headers: { "content-type": "application/json", "cache-control": "no-store" }
    });
  }
  let spcLabel = null;
  try {
    const cat = await spcCategoricalAtPoint(1, lat, lon, ua);
    if (cat && cat.rank >= 1) spcLabel = cat.label;
  } catch (e) {
  }
  let summary = null;
  let source = "model";
  const apiKey = env2.FIREWORKS_API_KEY;
  const model = env2.SUMMARY_MODEL || env2.MODEL || "accounts/fireworks/routers/glm-5p2-fast";
  if (apiKey) {
    try {
      summary = await summaryFromModel(brief, spcLabel, model, apiKey);
    } catch (e) {
      summary = null;
    }
  }
  if (!summary) {
    summary = deterministicSummary(brief, spcLabel);
    source = "fallback";
  }
  const resp = new Response(JSON.stringify({
    summary,
    location: brief.location,
    spc: spcLabel || null,
    source,
    generatedAt: (/* @__PURE__ */ new Date()).toISOString()
  }), {
    headers: { "content-type": "application/json", "cache-control": "public, max-age=1800, s-maxage=3600" }
  });
  try {
    await cache.put(cacheKey, resp.clone());
  } catch (e) {
  }
  return resp;
}
__name(handleSummary, "handleSummary");
async function handleDashboard(request, env2) {
  const url = new URL(request.url);
  const lat = parseFloat(url.searchParams.get("lat"));
  const lon = parseFloat(url.searchParams.get("lon"));
  if (isNaN(lat) || isNaN(lon)) return Response.json({ error: "lat and lon required" }, { status: 400 });
  const ua = env2.NWS_USER_AGENT || "WeatherChatBot/1.0 (contact@example.com)";
  const la = Math.round(lat * 100) / 100;
  const lo = Math.round(lon * 100) / 100;
  const bucket = Math.floor(Date.now() / (10 * 60 * 1e3));
  const cache = caches.default;
  const cacheKey = new Request(`https://wx-dashboard.internal/v1?lat=${la}&lon=${lo}&h=${bucket}`);
  try {
    const hit = await cache.match(cacheKey);
    if (hit) return hit;
  } catch (e) {
  }
  const airKey = env2.AIRNOW_API_KEY;
  const settled = await Promise.allSettled([
    getForecast(lat, lon, ua),
    getHourlyForecast(lat, lon, 24, ua),
    getCurrentObservations(lat, lon, ua),
    getActiveAlerts(lat, lon, ua),
    getAstronomy(lat, lon, ua),
    airKey ? getAirQuality(lat, lon, ua, airKey) : Promise.resolve(null),
    spcDay1AtPoint(lat, lon, ua),
    getGridpointSeries(lat, lon, ua, 72)
  ]);
  const val = /* @__PURE__ */ __name((s) => s.status === "fulfilled" ? s.value : null, "val");
  const parse = /* @__PURE__ */ __name((s) => {
    const v = val(s);
    if (v == null) return null;
    try {
      return typeof v === "string" ? JSON.parse(v) : v;
    } catch {
      return null;
    }
  }, "parse");
  const fc = parse(settled[0]);
  const hr = parse(settled[1]);
  const obs = parse(settled[2]);
  const al = parse(settled[3]);
  const ast = parse(settled[4]);
  const aq = parse(settled[5]);
  const spc = val(settled[6]);
  const series = val(settled[7]);

  const toNum = /* @__PURE__ */ __name((t) => {
    if (t == null) return null;
    const m = String(t).match(/-?\d+(\.\d+)?/);
    return m ? parseFloat(m[0]) : null;
  }, "toNum");

  let current = null;
  if (obs && !obs.error) {
    const feels = obs.heatIndex_F != null ? obs.heatIndex_F : obs.windChill_F != null ? obs.windChill_F : obs.temperature_F;
    current = {
      observed: obs.observed,
      station: obs.station,
      textDescription: obs.textDescription,
      temperature_F: obs.temperature_F,
      feelsLike_F: feels,
      dewpoint_F: obs.dewpoint_F,
      humidity_pct: obs.humidity_pct,
      windSpeed_mph: obs.windSpeed_mph,
      windGust_mph: obs.windGust_mph,
      windDir_deg: obs.windDir_deg,
      pressure_inHg: obs.pressure_inHg,
      visibility_mi: obs.visibility_mi,
      precipLastHour_in: obs.precipLastHour_in
    };
  }

  const hourly = hr && Array.isArray(hr.periods) ? hr.periods.slice(0, 24).map((p) => ({
    time: p.t,
    temp_F: toNum(p.temp),
    pop: p.pop,
    short: p.short,
    wind: p.wind
  })) : [];

  const daily = fc && Array.isArray(fc.periods) ? fc.periods.map((p) => ({
    name: p.name,
    isDaytime: p.isDaytime,
    temp_F: toNum(p.temp),
    short: p.short,
    detailed: p.detailed,
    pop: p.pop,
    wind: p.wind
  })) : [];

  const alerts = al && Array.isArray(al.alerts) ? al.alerts.map((a) => ({
    event: a.event,
    severity: a.severity,
    urgency: a.urgency,
    headline: a.headline,
    onset: a.onset,
    effective: a.effective,
    expires: a.expires,
    ends: a.ends,
    areaDesc: a.areaDesc
  })) : [];

  let airQuality = null;
  if (aq && Array.isArray(aq.observations) && aq.observations.length) {
    airQuality = { worst: aq.worst || null, observations: aq.observations };
  }

  let severe = null;
  if (spc && spc.categorical) {
    severe = { day1: spc };
  }

  const location = {
    name: fc?.location || null,
    office: fc?.office || null,
    lat: la,
    lon: lo,
    timeZone: fc?.timeZone || null,
    elevation_m: fc?.elevation_m ?? null
  };

  let hourlySeries = null;
  let precipOutlook = null;
  if (series && Array.isArray(series.temp_F)) {
    hourlySeries = {
      start: series.start,
      hours: series.hours,
      times: series.times,
      temp_F: series.temp_F,
      dewpoint_F: series.dewpoint_F,
      apparent_F: series.apparent_F,
      pop: series.pop,
      sky: series.sky,
      wind_mph: series.wind_mph,
      gust_mph: series.gust_mph,
      windDir: series.windDir,
      rh: series.rh,
      qpf_in: series.qpf_in
    };
    precipOutlook = {
      qpf24_in: series.qpf24_in,
      qpf48_in: series.qpf48_in,
      popMax24: series.popMax24,
      popMax48: series.popMax48
    };
  }

  const body = {
    location,
    current,
    hourly,
    hourlySeries,
    precipOutlook,
    daily,
    alerts,
    astronomy: ast ? { sun: ast.sun || null, moon: ast.moon || null } : null,
    airQuality,
    severe,
    generatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  const resp = new Response(JSON.stringify(body), {
    headers: { "content-type": "application/json", "cache-control": "public, max-age=600, s-maxage=600" }
  });
  try {
    await cache.put(cacheKey, resp.clone());
  } catch (e) {
  }
  return resp;
}
__name(handleDashboard, "handleDashboard");
function buildSystemPrompt(loc) {
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  return `You are a senior operational meteorologist with deep expertise in severe convective weather, mesoscale analysis, fire weather, hydrology, winter weather, and seasonal climate. You are advising a technically sophisticated user who wants substantive, jargon-appropriate discussion.

Today is ${today}. Default location: ${loc.name} (lat ${loc.lat}, lon ${loc.lon}). Local NWS WFO: ${loc.office}. If the user does not specify a location, assume this one.

You have live-data tools for NWS, SPC, WPC, CPC, NHC, USGS, AirNow, and aviation weather. Be aggressive and parallel about calling them. Never guess at current conditions, observed values, active watches/MDs, AQI, river stage, or AFD content when you can fetch them. It is normal and expected to call 3\u20136 tools per turn in parallel.

Tool selection (call in parallel where independent):
- "What's it doing right now?" \u2192 get_current_observations FIRST, plus get_active_alerts. Add get_metar_taf if a closer airport exists or aviation context matters.
- "Today / this week" forecast \u2192 get_forecast + get_active_alerts (+ get_hourly_forecast if timing matters).
- "Severe risk?" \u2192 get_spc_convective_outlook (days 1-3 as appropriate), get_spc_active_watches, get_spc_mesoscale_discussions, get_active_alerts. Multi-day setup: include get_spc_day48_outlook.
- Active severe event \u2192 get_active_alerts + get_storm_reports (LSRs for ground truth) + get_spc_mesoscale_discussions \u2192 then get_spc_mesoscale_discussion for the relevant MD number. Offer get_radar_image_url for the nearest site.
- "What is BMX/HUN/OUN saying?" \u2192 get_afd for that office.
- Fire weather \u2192 get_spc_fire_weather_outlook + relevant AFD.
- Rain / flood / heavy precip \u2192 get_wpc_qpf + get_active_alerts + get_river_gauges (during/after the event).
- Drought / long-range / seasonal \u2192 get_cpc_outlook + get_drought_monitor.
- Tropics / hurricane season \u2192 get_nhc_tropical.
- Air quality / smoke / asthma \u2192 get_air_quality (often paired with get_current_observations).
- Sunrise/sunset/twilight/moon \u2192 get_astronomy.
- Radar embed request \u2192 get_radar_image_url (default to the user's local office's radar site).

Style:
- Use real meteorological terminology: CAPE/MUCAPE/MLCAPE, 0\u20131 km / 0\u20136 km bulk shear, SRH, EHI, STP, EML, dryline, warm sector, LLJ, RAP/HRRR/NAM/GFS guidance, LCL/LFC, hodograph curvature, etc.
- Quote SPC category codes explicitly (TSTM, MRGL, SLGT, ENH, MDT, HIGH) and quote tornado/wind/hail probability percentages with hatched (significant) status when present.
- For AQI, state both the number and the category (e.g., "AQI 112 \u2014 Unhealthy for Sensitive Groups, PM2.5").
- For current obs, state temperature, dewpoint, wind, and pressure as a one-line headline; only expand when asked.
- When summarizing an AFD, preserve forecaster reasoning and explicit uncertainty/confidence statements \u2014 don't strip the nuance.
- Be direct and quantify. Cite product/MD numbers and issuance times when relevant.
- Do not over-explain basic concepts unless asked. Be candid about forecast uncertainty rather than hedging.
- Use Markdown headings, bullet lists, and short tables when they aid scanability. The UI renders Markdown.`;
}
__name(buildSystemPrompt, "buildSystemPrompt");
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
