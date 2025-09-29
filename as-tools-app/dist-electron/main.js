import td, { BrowserWindow as ft, app as pr, ipcMain as He, protocol as rd } from "electron";
import Ve from "node:path";
import { fileURLToPath as nd } from "node:url";
import sr from "path";
import Ac from "util";
import aa from "fs";
import sd from "crypto";
import ad from "assert";
import od from "events";
import id from "os";
const kc = nd(import.meta.url), ts = Ve.dirname(kc), oa = Ve.join(ts, ".."), Cc = Ve.join(ts, "../../.."), rs = Ve.join(ts, "preload.mjs"), ia = Ve.join(Cc, "Tools"), ca = Ve.join(Cc, "Themes"), Dc = "http://localhost:3000/", Mc = "http://localhost:3000/#/settings", cd = "http://localhost:3000/#/tool", Lc = "http://localhost:3000/#/dev", ld = "http://localhost:3000/#/add-folder", ar = process.env.VITE_DEV_SERVER_URL, nn = Ve.join(oa, "dist"), Nr = ar ? Ve.join(oa, "public") : nn, Fc = Ve.join(Nr, "Tools"), Vc = Ve.join(Nr, "Theme");
var fn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ud(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Fs = { exports: {} }, dd = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
};
const Ht = dd, fd = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), hd = (e) => !e.some((t) => fd.has(t));
function hn(e) {
  const t = e.split("."), r = [];
  for (let n = 0; n < t.length; n++) {
    let s = t[n];
    for (; s[s.length - 1] === "\\" && t[n + 1] !== void 0; )
      s = s.slice(0, -1) + ".", s += t[++n];
    r.push(s);
  }
  return hd(r) ? r : [];
}
var md = {
  get(e, t, r) {
    if (!Ht(e) || typeof t != "string")
      return r === void 0 ? e : r;
    const n = hn(t);
    if (n.length !== 0) {
      for (let s = 0; s < n.length; s++)
        if (e = e[n[s]], e == null) {
          if (s !== n.length - 1)
            return r;
          break;
        }
      return e === void 0 ? r : e;
    }
  },
  set(e, t, r) {
    if (!Ht(e) || typeof t != "string")
      return e;
    const n = e, s = hn(t);
    for (let a = 0; a < s.length; a++) {
      const i = s[a];
      Ht(e[i]) || (e[i] = {}), a === s.length - 1 && (e[i] = r), e = e[i];
    }
    return n;
  },
  delete(e, t) {
    if (!Ht(e) || typeof t != "string")
      return !1;
    const r = hn(t);
    for (let n = 0; n < r.length; n++) {
      const s = r[n];
      if (n === r.length - 1)
        return delete e[s], !0;
      if (e = e[s], !Ht(e))
        return !1;
    }
  },
  has(e, t) {
    if (!Ht(e) || typeof t != "string")
      return !1;
    const r = hn(t);
    if (r.length === 0)
      return !1;
    for (let n = 0; n < r.length; n++)
      if (Ht(e)) {
        if (!(r[n] in e))
          return !1;
        e = e[r[n]];
      } else
        return !1;
    return !0;
  }
}, la = { exports: {} }, ua = { exports: {} }, da = { exports: {} }, fa = { exports: {} };
const Uc = aa;
fa.exports = (e) => new Promise((t) => {
  Uc.access(e, (r) => {
    t(!r);
  });
});
fa.exports.sync = (e) => {
  try {
    return Uc.accessSync(e), !0;
  } catch {
    return !1;
  }
};
var pd = fa.exports, ha = { exports: {} }, ma = { exports: {} };
const zc = (e, ...t) => new Promise((r) => {
  r(e(...t));
});
ma.exports = zc;
ma.exports.default = zc;
var $d = ma.exports;
const yd = $d, qc = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  const t = [];
  let r = 0;
  const n = () => {
    r--, t.length > 0 && t.shift()();
  }, s = (u, c, ...d) => {
    r++;
    const l = yd(u, ...d);
    c(l), l.then(n, n);
  }, a = (u, c, ...d) => {
    r < e ? s(u, c, ...d) : t.push(s.bind(null, u, c, ...d));
  }, i = (u, ...c) => new Promise((d) => a(u, d, ...c));
  return Object.defineProperties(i, {
    activeCount: {
      get: () => r
    },
    pendingCount: {
      get: () => t.length
    },
    clearQueue: {
      value: () => {
        t.length = 0;
      }
    }
  }), i;
};
ha.exports = qc;
ha.exports.default = qc;
var _d = ha.exports;
const ui = _d;
class Kc extends Error {
  constructor(t) {
    super(), this.value = t;
  }
}
const gd = (e, t) => Promise.resolve(e).then(t), vd = (e) => Promise.all(e).then((t) => t[1] === !0 && Promise.reject(new Kc(t[0])));
var wd = (e, t, r) => {
  r = Object.assign({
    concurrency: 1 / 0,
    preserveOrder: !0
  }, r);
  const n = ui(r.concurrency), s = [...e].map((i) => [i, n(gd, i, t)]), a = ui(r.preserveOrder ? 1 : 1 / 0);
  return Promise.all(s.map((i) => a(vd, i))).then(() => {
  }).catch((i) => i instanceof Kc ? i.value : Promise.reject(i));
};
const Gc = sr, Hc = pd, Ed = wd;
da.exports = (e, t) => (t = Object.assign({
  cwd: process.cwd()
}, t), Ed(e, (r) => Hc(Gc.resolve(t.cwd, r)), t));
da.exports.sync = (e, t) => {
  t = Object.assign({
    cwd: process.cwd()
  }, t);
  for (const r of e)
    if (Hc.sync(Gc.resolve(t.cwd, r)))
      return r;
};
var Sd = da.exports;
const Pt = sr, Wc = Sd;
ua.exports = (e, t = {}) => {
  const r = Pt.resolve(t.cwd || ""), { root: n } = Pt.parse(r), s = [].concat(e);
  return new Promise((a) => {
    (function i(u) {
      Wc(s, { cwd: u }).then((c) => {
        c ? a(Pt.join(u, c)) : u === n ? a(null) : i(Pt.dirname(u));
      });
    })(r);
  });
};
ua.exports.sync = (e, t = {}) => {
  let r = Pt.resolve(t.cwd || "");
  const { root: n } = Pt.parse(r), s = [].concat(e);
  for (; ; ) {
    const a = Wc.sync(s, { cwd: r });
    if (a)
      return Pt.join(r, a);
    if (r === n)
      return null;
    r = Pt.dirname(r);
  }
};
var bd = ua.exports;
const Jc = bd;
la.exports = async ({ cwd: e } = {}) => Jc("package.json", { cwd: e });
la.exports.sync = ({ cwd: e } = {}) => Jc.sync("package.json", { cwd: e });
var Pd = la.exports, pa = { exports: {} };
const me = sr, Bc = id, bt = Bc.homedir(), $a = Bc.tmpdir(), { env: mr } = process, Nd = (e) => {
  const t = me.join(bt, "Library");
  return {
    data: me.join(t, "Application Support", e),
    config: me.join(t, "Preferences", e),
    cache: me.join(t, "Caches", e),
    log: me.join(t, "Logs", e),
    temp: me.join($a, e)
  };
}, Od = (e) => {
  const t = mr.APPDATA || me.join(bt, "AppData", "Roaming"), r = mr.LOCALAPPDATA || me.join(bt, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: me.join(r, e, "Data"),
    config: me.join(t, e, "Config"),
    cache: me.join(r, e, "Cache"),
    log: me.join(r, e, "Log"),
    temp: me.join($a, e)
  };
}, Rd = (e) => {
  const t = me.basename(bt);
  return {
    data: me.join(mr.XDG_DATA_HOME || me.join(bt, ".local", "share"), e),
    config: me.join(mr.XDG_CONFIG_HOME || me.join(bt, ".config"), e),
    cache: me.join(mr.XDG_CACHE_HOME || me.join(bt, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: me.join(mr.XDG_STATE_HOME || me.join(bt, ".local", "state"), e),
    temp: me.join($a, t, e)
  };
}, Xc = (e, t) => {
  if (typeof e != "string")
    throw new TypeError(`Expected string, got ${typeof e}`);
  return t = Object.assign({ suffix: "nodejs" }, t), t.suffix && (e += `-${t.suffix}`), process.platform === "darwin" ? Nd(e) : process.platform === "win32" ? Od(e) : Rd(e);
};
pa.exports = Xc;
pa.exports.default = Xc;
var Id = pa.exports, ct = {}, ae = {};
Object.defineProperty(ae, "__esModule", { value: !0 });
ae.NOOP = ae.LIMIT_FILES_DESCRIPTORS = ae.LIMIT_BASENAME_LENGTH = ae.IS_USER_ROOT = ae.IS_POSIX = ae.DEFAULT_TIMEOUT_SYNC = ae.DEFAULT_TIMEOUT_ASYNC = ae.DEFAULT_WRITE_OPTIONS = ae.DEFAULT_READ_OPTIONS = ae.DEFAULT_FOLDER_MODE = ae.DEFAULT_FILE_MODE = ae.DEFAULT_ENCODING = void 0;
const Td = "utf8";
ae.DEFAULT_ENCODING = Td;
const jd = 438;
ae.DEFAULT_FILE_MODE = jd;
const Ad = 511;
ae.DEFAULT_FOLDER_MODE = Ad;
const kd = {};
ae.DEFAULT_READ_OPTIONS = kd;
const Cd = {};
ae.DEFAULT_WRITE_OPTIONS = Cd;
const Dd = 5e3;
ae.DEFAULT_TIMEOUT_ASYNC = Dd;
const Md = 100;
ae.DEFAULT_TIMEOUT_SYNC = Md;
const Ld = !!process.getuid;
ae.IS_POSIX = Ld;
const Fd = process.getuid ? !process.getuid() : !1;
ae.IS_USER_ROOT = Fd;
const Vd = 128;
ae.LIMIT_BASENAME_LENGTH = Vd;
const Ud = 1e4;
ae.LIMIT_FILES_DESCRIPTORS = Ud;
const zd = () => {
};
ae.NOOP = zd;
var ns = {}, vr = {};
Object.defineProperty(vr, "__esModule", { value: !0 });
vr.attemptifySync = vr.attemptifyAsync = void 0;
const Yc = ae, qd = (e, t = Yc.NOOP) => function() {
  return e.apply(void 0, arguments).catch(t);
};
vr.attemptifyAsync = qd;
const Kd = (e, t = Yc.NOOP) => function() {
  try {
    return e.apply(void 0, arguments);
  } catch (r) {
    return t(r);
  }
};
vr.attemptifySync = Kd;
var ya = {};
Object.defineProperty(ya, "__esModule", { value: !0 });
const Gd = ae, Qc = {
  isChangeErrorOk: (e) => {
    const { code: t } = e;
    return t === "ENOSYS" || !Gd.IS_USER_ROOT && (t === "EINVAL" || t === "EPERM");
  },
  isRetriableError: (e) => {
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!Qc.isChangeErrorOk(e))
      throw e;
  }
};
ya.default = Qc;
var wr = {}, _a = {};
Object.defineProperty(_a, "__esModule", { value: !0 });
const Hd = ae, le = {
  interval: 25,
  intervalId: void 0,
  limit: Hd.LIMIT_FILES_DESCRIPTORS,
  queueActive: /* @__PURE__ */ new Set(),
  queueWaiting: /* @__PURE__ */ new Set(),
  init: () => {
    le.intervalId || (le.intervalId = setInterval(le.tick, le.interval));
  },
  reset: () => {
    le.intervalId && (clearInterval(le.intervalId), delete le.intervalId);
  },
  add: (e) => {
    le.queueWaiting.add(e), le.queueActive.size < le.limit / 2 ? le.tick() : le.init();
  },
  remove: (e) => {
    le.queueWaiting.delete(e), le.queueActive.delete(e);
  },
  schedule: () => new Promise((e) => {
    const t = () => le.remove(r), r = () => e(t);
    le.add(r);
  }),
  tick: () => {
    if (!(le.queueActive.size >= le.limit)) {
      if (!le.queueWaiting.size)
        return le.reset();
      for (const e of le.queueWaiting) {
        if (le.queueActive.size >= le.limit)
          break;
        le.queueWaiting.delete(e), le.queueActive.add(e), e();
      }
    }
  }
};
_a.default = le;
Object.defineProperty(wr, "__esModule", { value: !0 });
wr.retryifySync = wr.retryifyAsync = void 0;
const Wd = _a, Jd = (e, t) => function(r) {
  return function n() {
    return Wd.default.schedule().then((s) => e.apply(void 0, arguments).then((a) => (s(), a), (a) => {
      if (s(), Date.now() >= r)
        throw a;
      if (t(a)) {
        const i = Math.round(100 + 400 * Math.random());
        return new Promise((c) => setTimeout(c, i)).then(() => n.apply(void 0, arguments));
      }
      throw a;
    }));
  };
};
wr.retryifyAsync = Jd;
const Bd = (e, t) => function(r) {
  return function n() {
    try {
      return e.apply(void 0, arguments);
    } catch (s) {
      if (Date.now() > r)
        throw s;
      if (t(s))
        return n.apply(void 0, arguments);
      throw s;
    }
  };
};
wr.retryifySync = Bd;
Object.defineProperty(ns, "__esModule", { value: !0 });
const oe = aa, Ie = Ac, Te = vr, we = ya, Ce = wr, Xd = {
  chmodAttempt: Te.attemptifyAsync(Ie.promisify(oe.chmod), we.default.onChangeError),
  chownAttempt: Te.attemptifyAsync(Ie.promisify(oe.chown), we.default.onChangeError),
  closeAttempt: Te.attemptifyAsync(Ie.promisify(oe.close)),
  fsyncAttempt: Te.attemptifyAsync(Ie.promisify(oe.fsync)),
  mkdirAttempt: Te.attemptifyAsync(Ie.promisify(oe.mkdir)),
  realpathAttempt: Te.attemptifyAsync(Ie.promisify(oe.realpath)),
  statAttempt: Te.attemptifyAsync(Ie.promisify(oe.stat)),
  unlinkAttempt: Te.attemptifyAsync(Ie.promisify(oe.unlink)),
  closeRetry: Ce.retryifyAsync(Ie.promisify(oe.close), we.default.isRetriableError),
  fsyncRetry: Ce.retryifyAsync(Ie.promisify(oe.fsync), we.default.isRetriableError),
  openRetry: Ce.retryifyAsync(Ie.promisify(oe.open), we.default.isRetriableError),
  readFileRetry: Ce.retryifyAsync(Ie.promisify(oe.readFile), we.default.isRetriableError),
  renameRetry: Ce.retryifyAsync(Ie.promisify(oe.rename), we.default.isRetriableError),
  statRetry: Ce.retryifyAsync(Ie.promisify(oe.stat), we.default.isRetriableError),
  writeRetry: Ce.retryifyAsync(Ie.promisify(oe.write), we.default.isRetriableError),
  chmodSyncAttempt: Te.attemptifySync(oe.chmodSync, we.default.onChangeError),
  chownSyncAttempt: Te.attemptifySync(oe.chownSync, we.default.onChangeError),
  closeSyncAttempt: Te.attemptifySync(oe.closeSync),
  mkdirSyncAttempt: Te.attemptifySync(oe.mkdirSync),
  realpathSyncAttempt: Te.attemptifySync(oe.realpathSync),
  statSyncAttempt: Te.attemptifySync(oe.statSync),
  unlinkSyncAttempt: Te.attemptifySync(oe.unlinkSync),
  closeSyncRetry: Ce.retryifySync(oe.closeSync, we.default.isRetriableError),
  fsyncSyncRetry: Ce.retryifySync(oe.fsyncSync, we.default.isRetriableError),
  openSyncRetry: Ce.retryifySync(oe.openSync, we.default.isRetriableError),
  readFileSyncRetry: Ce.retryifySync(oe.readFileSync, we.default.isRetriableError),
  renameSyncRetry: Ce.retryifySync(oe.renameSync, we.default.isRetriableError),
  statSyncRetry: Ce.retryifySync(oe.statSync, we.default.isRetriableError),
  writeSyncRetry: Ce.retryifySync(oe.writeSync, we.default.isRetriableError)
};
ns.default = Xd;
var ga = {};
Object.defineProperty(ga, "__esModule", { value: !0 });
const Yd = {
  isFunction: (e) => typeof e == "function",
  isString: (e) => typeof e == "string",
  isUndefined: (e) => typeof e > "u"
};
ga.default = Yd;
var va = {};
Object.defineProperty(va, "__esModule", { value: !0 });
const mn = {}, Vs = {
  next: (e) => {
    const t = mn[e];
    if (!t)
      return;
    t.shift();
    const r = t[0];
    r ? r(() => Vs.next(e)) : delete mn[e];
  },
  schedule: (e) => new Promise((t) => {
    let r = mn[e];
    r || (r = mn[e] = []), r.push(t), !(r.length > 1) && t(() => Vs.next(e));
  })
};
va.default = Vs;
var wa = {};
Object.defineProperty(wa, "__esModule", { value: !0 });
const Qd = sr, di = ae, fi = ns, qe = {
  store: {},
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), r = Date.now().toString().slice(-10), n = "tmp-", s = `.${n}${r}${t}`;
    return `${e}${s}`;
  },
  get: (e, t, r = !0) => {
    const n = qe.truncate(t(e));
    return n in qe.store ? qe.get(e, t, r) : (qe.store[n] = r, [n, () => delete qe.store[n]]);
  },
  purge: (e) => {
    qe.store[e] && (delete qe.store[e], fi.default.unlinkAttempt(e));
  },
  purgeSync: (e) => {
    qe.store[e] && (delete qe.store[e], fi.default.unlinkSyncAttempt(e));
  },
  purgeSyncAll: () => {
    for (const e in qe.store)
      qe.purgeSync(e);
  },
  truncate: (e) => {
    const t = Qd.basename(e);
    if (t.length <= di.LIMIT_BASENAME_LENGTH)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - di.LIMIT_BASENAME_LENGTH;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
process.on("exit", qe.purgeSyncAll);
wa.default = qe;
Object.defineProperty(ct, "__esModule", { value: !0 });
ct.writeFileSync = ct.writeFile = ct.readFileSync = ct.readFile = void 0;
const Zc = sr, be = ae, se = ns, Ge = ga, Zd = va, Nt = wa;
function xc(e, t = be.DEFAULT_READ_OPTIONS) {
  var r;
  if (Ge.default.isString(t))
    return xc(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : be.DEFAULT_TIMEOUT_ASYNC);
  return se.default.readFileRetry(n)(e, t);
}
ct.readFile = xc;
function el(e, t = be.DEFAULT_READ_OPTIONS) {
  var r;
  if (Ge.default.isString(t))
    return el(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : be.DEFAULT_TIMEOUT_SYNC);
  return se.default.readFileSyncRetry(n)(e, t);
}
ct.readFileSync = el;
const tl = (e, t, r, n) => {
  if (Ge.default.isFunction(r))
    return tl(e, t, be.DEFAULT_WRITE_OPTIONS, r);
  const s = rl(e, t, r);
  return n && s.then(n, n), s;
};
ct.writeFile = tl;
const rl = async (e, t, r = be.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Ge.default.isString(r))
    return rl(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : be.DEFAULT_TIMEOUT_ASYNC);
  let a = null, i = null, u = null, c = null, d = null;
  try {
    r.schedule && (a = await r.schedule(e)), i = await Zd.default.schedule(e), e = await se.default.realpathAttempt(e) || e, [c, u] = Nt.default.get(e, r.tmpCreate || Nt.default.create, r.tmpPurge !== !1);
    const l = be.IS_POSIX && Ge.default.isUndefined(r.chown), m = Ge.default.isUndefined(r.mode);
    if (l || m) {
      const _ = await se.default.statAttempt(e);
      _ && (r = { ...r }, l && (r.chown = { uid: _.uid, gid: _.gid }), m && (r.mode = _.mode));
    }
    const P = Zc.dirname(e);
    await se.default.mkdirAttempt(P, {
      mode: be.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), d = await se.default.openRetry(s)(c, "w", r.mode || be.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(c), Ge.default.isString(t) ? await se.default.writeRetry(s)(d, t, 0, r.encoding || be.DEFAULT_ENCODING) : Ge.default.isUndefined(t) || await se.default.writeRetry(s)(d, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? await se.default.fsyncRetry(s)(d) : se.default.fsyncAttempt(d)), await se.default.closeRetry(s)(d), d = null, r.chown && await se.default.chownAttempt(c, r.chown.uid, r.chown.gid), r.mode && await se.default.chmodAttempt(c, r.mode);
    try {
      await se.default.renameRetry(s)(c, e);
    } catch (_) {
      if (_.code !== "ENAMETOOLONG")
        throw _;
      await se.default.renameRetry(s)(c, Nt.default.truncate(e));
    }
    u(), c = null;
  } finally {
    d && await se.default.closeAttempt(d), c && Nt.default.purge(c), a && a(), i && i();
  }
}, nl = (e, t, r = be.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Ge.default.isString(r))
    return nl(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : be.DEFAULT_TIMEOUT_SYNC);
  let a = null, i = null, u = null;
  try {
    e = se.default.realpathSyncAttempt(e) || e, [i, a] = Nt.default.get(e, r.tmpCreate || Nt.default.create, r.tmpPurge !== !1);
    const c = be.IS_POSIX && Ge.default.isUndefined(r.chown), d = Ge.default.isUndefined(r.mode);
    if (c || d) {
      const m = se.default.statSyncAttempt(e);
      m && (r = { ...r }, c && (r.chown = { uid: m.uid, gid: m.gid }), d && (r.mode = m.mode));
    }
    const l = Zc.dirname(e);
    se.default.mkdirSyncAttempt(l, {
      mode: be.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), u = se.default.openSyncRetry(s)(i, "w", r.mode || be.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(i), Ge.default.isString(t) ? se.default.writeSyncRetry(s)(u, t, 0, r.encoding || be.DEFAULT_ENCODING) : Ge.default.isUndefined(t) || se.default.writeSyncRetry(s)(u, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? se.default.fsyncSyncRetry(s)(u) : se.default.fsyncAttempt(u)), se.default.closeSyncRetry(s)(u), u = null, r.chown && se.default.chownSyncAttempt(i, r.chown.uid, r.chown.gid), r.mode && se.default.chmodSyncAttempt(i, r.mode);
    try {
      se.default.renameSyncRetry(s)(i, e);
    } catch (m) {
      if (m.code !== "ENAMETOOLONG")
        throw m;
      se.default.renameSyncRetry(s)(i, Nt.default.truncate(e));
    }
    a(), i = null;
  } finally {
    u && se.default.closeSyncAttempt(u), i && Nt.default.purge(i);
  }
};
ct.writeFileSync = nl;
var Us = { exports: {} }, sl = {}, tt = {}, Er = {}, sn = {}, te = {}, tn = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(w) {
      if (super(), !e.IDENTIFIER.test(w))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = w;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = r;
  class n extends t {
    constructor(w) {
      super(), this._items = typeof w == "string" ? [w] : w;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const w = this._items[0];
      return w === "" || w === '""';
    }
    get str() {
      var w;
      return (w = this._str) !== null && w !== void 0 ? w : this._str = this._items.reduce((N, R) => `${N}${R}`, "");
    }
    get names() {
      var w;
      return (w = this._names) !== null && w !== void 0 ? w : this._names = this._items.reduce((N, R) => (R instanceof r && (N[R.str] = (N[R.str] || 0) + 1), N), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(h, ...w) {
    const N = [h[0]];
    let R = 0;
    for (; R < w.length; )
      u(N, w[R]), N.push(h[++R]);
    return new n(N);
  }
  e._ = s;
  const a = new n("+");
  function i(h, ...w) {
    const N = [_(h[0])];
    let R = 0;
    for (; R < w.length; )
      N.push(a), u(N, w[R]), N.push(a, _(h[++R]));
    return c(N), new n(N);
  }
  e.str = i;
  function u(h, w) {
    w instanceof n ? h.push(...w._items) : w instanceof r ? h.push(w) : h.push(m(w));
  }
  e.addCodeArg = u;
  function c(h) {
    let w = 1;
    for (; w < h.length - 1; ) {
      if (h[w] === a) {
        const N = d(h[w - 1], h[w + 1]);
        if (N !== void 0) {
          h.splice(w - 1, 3, N);
          continue;
        }
        h[w++] = "+";
      }
      w++;
    }
  }
  function d(h, w) {
    if (w === '""')
      return h;
    if (h === '""')
      return w;
    if (typeof h == "string")
      return w instanceof r || h[h.length - 1] !== '"' ? void 0 : typeof w != "string" ? `${h.slice(0, -1)}${w}"` : w[0] === '"' ? h.slice(0, -1) + w.slice(1) : void 0;
    if (typeof w == "string" && w[0] === '"' && !(h instanceof r))
      return `"${h}${w.slice(1)}`;
  }
  function l(h, w) {
    return w.emptyStr() ? h : h.emptyStr() ? w : i`${h}${w}`;
  }
  e.strConcat = l;
  function m(h) {
    return typeof h == "number" || typeof h == "boolean" || h === null ? h : _(Array.isArray(h) ? h.join(",") : h);
  }
  function P(h) {
    return new n(_(h));
  }
  e.stringify = P;
  function _(h) {
    return JSON.stringify(h).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = _;
  function E(h) {
    return typeof h == "string" && e.IDENTIFIER.test(h) ? new n(`.${h}`) : s`[${h}]`;
  }
  e.getProperty = E;
  function g(h) {
    if (typeof h == "string" && e.IDENTIFIER.test(h))
      return new n(`${h}`);
    throw new Error(`CodeGen: invalid export name: ${h}, use explicit $id name mapping`);
  }
  e.getEsmExportName = g;
  function y(h) {
    return new n(h.toString());
  }
  e.regexpCode = y;
})(tn);
var zs = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = tn;
  class r extends Error {
    constructor(d) {
      super(`CodeGen: "code" for ${d} not defined`), this.value = d.value;
    }
  }
  var n;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class s {
    constructor({ prefixes: d, parent: l } = {}) {
      this._names = {}, this._prefixes = d, this._parent = l;
    }
    toName(d) {
      return d instanceof t.Name ? d : this.name(d);
    }
    name(d) {
      return new t.Name(this._newName(d));
    }
    _newName(d) {
      const l = this._names[d] || this._nameGroup(d);
      return `${d}${l.index++}`;
    }
    _nameGroup(d) {
      var l, m;
      if (!((m = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || m === void 0) && m.has(d) || this._prefixes && !this._prefixes.has(d))
        throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
      return this._names[d] = { prefix: d, index: 0 };
    }
  }
  e.Scope = s;
  class a extends t.Name {
    constructor(d, l) {
      super(l), this.prefix = d;
    }
    setValue(d, { property: l, itemIndex: m }) {
      this.value = d, this.scopePath = (0, t._)`.${new t.Name(l)}[${m}]`;
    }
  }
  e.ValueScopeName = a;
  const i = (0, t._)`\n`;
  class u extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? i : t.nil };
    }
    get() {
      return this._scope;
    }
    name(d) {
      return new a(d, this._newName(d));
    }
    value(d, l) {
      var m;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const P = this.toName(d), { prefix: _ } = P, E = (m = l.key) !== null && m !== void 0 ? m : l.ref;
      let g = this._values[_];
      if (g) {
        const w = g.get(E);
        if (w)
          return w;
      } else
        g = this._values[_] = /* @__PURE__ */ new Map();
      g.set(E, P);
      const y = this._scope[_] || (this._scope[_] = []), h = y.length;
      return y[h] = l.ref, P.setValue(l, { property: _, itemIndex: h }), P;
    }
    getValue(d, l) {
      const m = this._values[d];
      if (m)
        return m.get(l);
    }
    scopeRefs(d, l = this._values) {
      return this._reduceValues(l, (m) => {
        if (m.scopePath === void 0)
          throw new Error(`CodeGen: name "${m}" has no value`);
        return (0, t._)`${d}${m.scopePath}`;
      });
    }
    scopeCode(d = this._values, l, m) {
      return this._reduceValues(d, (P) => {
        if (P.value === void 0)
          throw new Error(`CodeGen: name "${P}" has no value`);
        return P.value.code;
      }, l, m);
    }
    _reduceValues(d, l, m = {}, P) {
      let _ = t.nil;
      for (const E in d) {
        const g = d[E];
        if (!g)
          continue;
        const y = m[E] = m[E] || /* @__PURE__ */ new Map();
        g.forEach((h) => {
          if (y.has(h))
            return;
          y.set(h, n.Started);
          let w = l(h);
          if (w) {
            const N = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            _ = (0, t._)`${_}${N} ${h} = ${w};${this.opts._n}`;
          } else if (w = P == null ? void 0 : P(h))
            _ = (0, t._)`${_}${w}${this.opts._n}`;
          else
            throw new r(h);
          y.set(h, n.Completed);
        });
      }
      return _;
    }
  }
  e.ValueScope = u;
})(zs);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = tn, r = zs;
  var n = tn;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var s = zs;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return s.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return s.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return s.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return s.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class a {
    optimizeNodes() {
      return this;
    }
    optimizeNames(o, f) {
      return this;
    }
  }
  class i extends a {
    constructor(o, f, b) {
      super(), this.varKind = o, this.name = f, this.rhs = b;
    }
    render({ es5: o, _n: f }) {
      const b = o ? r.varKinds.var : this.varKind, j = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${b} ${this.name}${j};` + f;
    }
    optimizeNames(o, f) {
      if (o[this.name.str])
        return this.rhs && (this.rhs = C(this.rhs, o, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class u extends a {
    constructor(o, f, b) {
      super(), this.lhs = o, this.rhs = f, this.sideEffects = b;
    }
    render({ _n: o }) {
      return `${this.lhs} = ${this.rhs};` + o;
    }
    optimizeNames(o, f) {
      if (!(this.lhs instanceof t.Name && !o[this.lhs.str] && !this.sideEffects))
        return this.rhs = C(this.rhs, o, f), this;
    }
    get names() {
      const o = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return de(o, this.rhs);
    }
  }
  class c extends u {
    constructor(o, f, b, j) {
      super(o, b, j), this.op = f;
    }
    render({ _n: o }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + o;
    }
  }
  class d extends a {
    constructor(o) {
      super(), this.label = o, this.names = {};
    }
    render({ _n: o }) {
      return `${this.label}:` + o;
    }
  }
  class l extends a {
    constructor(o) {
      super(), this.label = o, this.names = {};
    }
    render({ _n: o }) {
      return `break${this.label ? ` ${this.label}` : ""};` + o;
    }
  }
  class m extends a {
    constructor(o) {
      super(), this.error = o;
    }
    render({ _n: o }) {
      return `throw ${this.error};` + o;
    }
    get names() {
      return this.error.names;
    }
  }
  class P extends a {
    constructor(o) {
      super(), this.code = o;
    }
    render({ _n: o }) {
      return `${this.code};` + o;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(o, f) {
      return this.code = C(this.code, o, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class _ extends a {
    constructor(o = []) {
      super(), this.nodes = o;
    }
    render(o) {
      return this.nodes.reduce((f, b) => f + b.render(o), "");
    }
    optimizeNodes() {
      const { nodes: o } = this;
      let f = o.length;
      for (; f--; ) {
        const b = o[f].optimizeNodes();
        Array.isArray(b) ? o.splice(f, 1, ...b) : b ? o[f] = b : o.splice(f, 1);
      }
      return o.length > 0 ? this : void 0;
    }
    optimizeNames(o, f) {
      const { nodes: b } = this;
      let j = b.length;
      for (; j--; ) {
        const A = b[j];
        A.optimizeNames(o, f) || (k(o, A.names), b.splice(j, 1));
      }
      return b.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((o, f) => Q(o, f.names), {});
    }
  }
  class E extends _ {
    render(o) {
      return "{" + o._n + super.render(o) + "}" + o._n;
    }
  }
  class g extends _ {
  }
  class y extends E {
  }
  y.kind = "else";
  class h extends E {
    constructor(o, f) {
      super(f), this.condition = o;
    }
    render(o) {
      let f = `if(${this.condition})` + super.render(o);
      return this.else && (f += "else " + this.else.render(o)), f;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const o = this.condition;
      if (o === !0)
        return this.nodes;
      let f = this.else;
      if (f) {
        const b = f.optimizeNodes();
        f = this.else = Array.isArray(b) ? new y(b) : b;
      }
      if (f)
        return o === !1 ? f instanceof h ? f : f.nodes : this.nodes.length ? this : new h(U(o), f instanceof h ? [f] : f.nodes);
      if (!(o === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(o, f) {
      var b;
      if (this.else = (b = this.else) === null || b === void 0 ? void 0 : b.optimizeNames(o, f), !!(super.optimizeNames(o, f) || this.else))
        return this.condition = C(this.condition, o, f), this;
    }
    get names() {
      const o = super.names;
      return de(o, this.condition), this.else && Q(o, this.else.names), o;
    }
  }
  h.kind = "if";
  class w extends E {
  }
  w.kind = "for";
  class N extends w {
    constructor(o) {
      super(), this.iteration = o;
    }
    render(o) {
      return `for(${this.iteration})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iteration = C(this.iteration, o, f), this;
    }
    get names() {
      return Q(super.names, this.iteration.names);
    }
  }
  class R extends w {
    constructor(o, f, b, j) {
      super(), this.varKind = o, this.name = f, this.from = b, this.to = j;
    }
    render(o) {
      const f = o.es5 ? r.varKinds.var : this.varKind, { name: b, from: j, to: A } = this;
      return `for(${f} ${b}=${j}; ${b}<${A}; ${b}++)` + super.render(o);
    }
    get names() {
      const o = de(super.names, this.from);
      return de(o, this.to);
    }
  }
  class T extends w {
    constructor(o, f, b, j) {
      super(), this.loop = o, this.varKind = f, this.name = b, this.iterable = j;
    }
    render(o) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iterable = C(this.iterable, o, f), this;
    }
    get names() {
      return Q(super.names, this.iterable.names);
    }
  }
  class z extends E {
    constructor(o, f, b) {
      super(), this.name = o, this.args = f, this.async = b;
    }
    render(o) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(o);
    }
  }
  z.kind = "func";
  class W extends _ {
    render(o) {
      return "return " + super.render(o);
    }
  }
  W.kind = "return";
  class ue extends E {
    render(o) {
      let f = "try" + super.render(o);
      return this.catch && (f += this.catch.render(o)), this.finally && (f += this.finally.render(o)), f;
    }
    optimizeNodes() {
      var o, f;
      return super.optimizeNodes(), (o = this.catch) === null || o === void 0 || o.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(o, f) {
      var b, j;
      return super.optimizeNames(o, f), (b = this.catch) === null || b === void 0 || b.optimizeNames(o, f), (j = this.finally) === null || j === void 0 || j.optimizeNames(o, f), this;
    }
    get names() {
      const o = super.names;
      return this.catch && Q(o, this.catch.names), this.finally && Q(o, this.finally.names), o;
    }
  }
  class V extends E {
    constructor(o) {
      super(), this.error = o;
    }
    render(o) {
      return `catch(${this.error})` + super.render(o);
    }
  }
  V.kind = "catch";
  class H extends E {
    render(o) {
      return "finally" + super.render(o);
    }
  }
  H.kind = "finally";
  class ne {
    constructor(o, f = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...f, _n: f.lines ? `
` : "" }, this._extScope = o, this._scope = new r.Scope({ parent: o }), this._nodes = [new g()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(o) {
      return this._scope.name(o);
    }
    // reserves unique name in the external scope
    scopeName(o) {
      return this._extScope.name(o);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(o, f) {
      const b = this._extScope.value(o, f);
      return (this._values[b.prefix] || (this._values[b.prefix] = /* @__PURE__ */ new Set())).add(b), b;
    }
    getScopeValue(o, f) {
      return this._extScope.getValue(o, f);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(o) {
      return this._extScope.scopeRefs(o, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(o, f, b, j) {
      const A = this._scope.toName(f);
      return b !== void 0 && j && (this._constants[A.str] = b), this._leafNode(new i(o, A, b)), A;
    }
    // `const` declaration (`var` in es5 mode)
    const(o, f, b) {
      return this._def(r.varKinds.const, o, f, b);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(o, f, b) {
      return this._def(r.varKinds.let, o, f, b);
    }
    // `var` declaration with optional assignment
    var(o, f, b) {
      return this._def(r.varKinds.var, o, f, b);
    }
    // assignment code
    assign(o, f, b) {
      return this._leafNode(new u(o, f, b));
    }
    // `+=` code
    add(o, f) {
      return this._leafNode(new c(o, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(o) {
      return typeof o == "function" ? o() : o !== t.nil && this._leafNode(new P(o)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...o) {
      const f = ["{"];
      for (const [b, j] of o)
        f.length > 1 && f.push(","), f.push(b), (b !== j || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, j));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(o, f, b) {
      if (this._blockNode(new h(o)), f && b)
        this.code(f).else().code(b).endIf();
      else if (f)
        this.code(f).endIf();
      else if (b)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(o) {
      return this._elseNode(new h(o));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new y());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(h, y);
    }
    _for(o, f) {
      return this._blockNode(o), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(o, f) {
      return this._for(new N(o), f);
    }
    // `for` statement for a range of values
    forRange(o, f, b, j, A = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const q = this._scope.toName(o);
      return this._for(new R(A, q, f, b), () => j(q));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(o, f, b, j = r.varKinds.const) {
      const A = this._scope.toName(o);
      if (this.opts.es5) {
        const q = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${q}.length`, (F) => {
          this.var(A, (0, t._)`${q}[${F}]`), b(A);
        });
      }
      return this._for(new T("of", j, A, f), () => b(A));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(o, f, b, j = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(o, (0, t._)`Object.keys(${f})`, b);
      const A = this._scope.toName(o);
      return this._for(new T("in", j, A, f), () => b(A));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(w);
    }
    // `label` statement
    label(o) {
      return this._leafNode(new d(o));
    }
    // `break` statement
    break(o) {
      return this._leafNode(new l(o));
    }
    // `return` statement
    return(o) {
      const f = new W();
      if (this._blockNode(f), this.code(o), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(W);
    }
    // `try` statement
    try(o, f, b) {
      if (!f && !b)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const j = new ue();
      if (this._blockNode(j), this.code(o), f) {
        const A = this.name("e");
        this._currNode = j.catch = new V(A), f(A);
      }
      return b && (this._currNode = j.finally = new H(), this.code(b)), this._endBlockNode(V, H);
    }
    // `throw` statement
    throw(o) {
      return this._leafNode(new m(o));
    }
    // start self-balancing block
    block(o, f) {
      return this._blockStarts.push(this._nodes.length), o && this.code(o).endBlock(f), this;
    }
    // end the current self-balancing block
    endBlock(o) {
      const f = this._blockStarts.pop();
      if (f === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const b = this._nodes.length - f;
      if (b < 0 || o !== void 0 && b !== o)
        throw new Error(`CodeGen: wrong number of nodes: ${b} vs ${o} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(o, f = t.nil, b, j) {
      return this._blockNode(new z(o, f, b)), j && this.code(j).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(z);
    }
    optimize(o = 1) {
      for (; o-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(o) {
      return this._currNode.nodes.push(o), this;
    }
    _blockNode(o) {
      this._currNode.nodes.push(o), this._nodes.push(o);
    }
    _endBlockNode(o, f) {
      const b = this._currNode;
      if (b instanceof o || f && b instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${o.kind}/${f.kind}` : o.kind}"`);
    }
    _elseNode(o) {
      const f = this._currNode;
      if (!(f instanceof h))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = f.else = o, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const o = this._nodes;
      return o[o.length - 1];
    }
    set _currNode(o) {
      const f = this._nodes;
      f[f.length - 1] = o;
    }
  }
  e.CodeGen = ne;
  function Q($, o) {
    for (const f in o)
      $[f] = ($[f] || 0) + (o[f] || 0);
    return $;
  }
  function de($, o) {
    return o instanceof t._CodeOrName ? Q($, o.names) : $;
  }
  function C($, o, f) {
    if ($ instanceof t.Name)
      return b($);
    if (!j($))
      return $;
    return new t._Code($._items.reduce((A, q) => (q instanceof t.Name && (q = b(q)), q instanceof t._Code ? A.push(...q._items) : A.push(q), A), []));
    function b(A) {
      const q = f[A.str];
      return q === void 0 || o[A.str] !== 1 ? A : (delete o[A.str], q);
    }
    function j(A) {
      return A instanceof t._Code && A._items.some((q) => q instanceof t.Name && o[q.str] === 1 && f[q.str] !== void 0);
    }
  }
  function k($, o) {
    for (const f in o)
      $[f] = ($[f] || 0) - (o[f] || 0);
  }
  function U($) {
    return typeof $ == "boolean" || typeof $ == "number" || $ === null ? !$ : (0, t._)`!${S($)}`;
  }
  e.not = U;
  const D = p(e.operators.AND);
  function O(...$) {
    return $.reduce(D);
  }
  e.and = O;
  const I = p(e.operators.OR);
  function v(...$) {
    return $.reduce(I);
  }
  e.or = v;
  function p($) {
    return (o, f) => o === t.nil ? f : f === t.nil ? o : (0, t._)`${S(o)} ${$} ${S(f)}`;
  }
  function S($) {
    return $ instanceof t.Name ? $ : (0, t._)`(${$})`;
  }
})(te);
var M = {};
Object.defineProperty(M, "__esModule", { value: !0 });
M.checkStrictMode = M.getErrorPath = M.Type = M.useFunc = M.setEvaluated = M.evaluatedPropsToName = M.mergeEvaluated = M.eachItem = M.unescapeJsonPointer = M.escapeJsonPointer = M.escapeFragment = M.unescapeFragment = M.schemaRefOrVal = M.schemaHasRulesButRef = M.schemaHasRules = M.checkUnknownRules = M.alwaysValidSchema = M.toHash = void 0;
const ie = te, xd = tn;
function ef(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
M.toHash = ef;
function tf(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (al(e, t), !ol(t, e.self.RULES.all));
}
M.alwaysValidSchema = tf;
function al(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || ll(e, `unknown keyword: "${a}"`);
}
M.checkUnknownRules = al;
function ol(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
M.schemaHasRules = ol;
function rf(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
M.schemaHasRulesButRef = rf;
function nf({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ie._)`${r}`;
  }
  return (0, ie._)`${e}${t}${(0, ie.getProperty)(n)}`;
}
M.schemaRefOrVal = nf;
function sf(e) {
  return il(decodeURIComponent(e));
}
M.unescapeFragment = sf;
function af(e) {
  return encodeURIComponent(Ea(e));
}
M.escapeFragment = af;
function Ea(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
M.escapeJsonPointer = Ea;
function il(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
M.unescapeJsonPointer = il;
function of(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
M.eachItem = of;
function hi({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, i, u) => {
    const c = i === void 0 ? a : i instanceof ie.Name ? (a instanceof ie.Name ? e(s, a, i) : t(s, a, i), i) : a instanceof ie.Name ? (t(s, i, a), a) : r(a, i);
    return u === ie.Name && !(c instanceof ie.Name) ? n(s, c) : c;
  };
}
M.mergeEvaluated = {
  props: hi({
    mergeNames: (e, t, r) => e.if((0, ie._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, ie._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, ie._)`${r} || {}`).code((0, ie._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, ie._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, ie._)`${r} || {}`), Sa(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: cl
  }),
  items: hi({
    mergeNames: (e, t, r) => e.if((0, ie._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ie._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ie._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ie._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function cl(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ie._)`{}`);
  return t !== void 0 && Sa(e, r, t), r;
}
M.evaluatedPropsToName = cl;
function Sa(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ie._)`${t}${(0, ie.getProperty)(n)}`, !0));
}
M.setEvaluated = Sa;
const mi = {};
function cf(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: mi[t.code] || (mi[t.code] = new xd._Code(t.code))
  });
}
M.useFunc = cf;
var qs;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(qs || (M.Type = qs = {}));
function lf(e, t, r) {
  if (e instanceof ie.Name) {
    const n = t === qs.Num;
    return r ? n ? (0, ie._)`"[" + ${e} + "]"` : (0, ie._)`"['" + ${e} + "']"` : n ? (0, ie._)`"/" + ${e}` : (0, ie._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ie.getProperty)(e).toString() : "/" + Ea(e);
}
M.getErrorPath = lf;
function ll(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
M.checkStrictMode = ll;
var ht = {};
Object.defineProperty(ht, "__esModule", { value: !0 });
const Oe = te, uf = {
  // validation function arguments
  data: new Oe.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Oe.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Oe.Name("instancePath"),
  parentData: new Oe.Name("parentData"),
  parentDataProperty: new Oe.Name("parentDataProperty"),
  rootData: new Oe.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Oe.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Oe.Name("vErrors"),
  // null or array of validation errors
  errors: new Oe.Name("errors"),
  // counter of validation errors
  this: new Oe.Name("this"),
  // "globals"
  self: new Oe.Name("self"),
  scope: new Oe.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Oe.Name("json"),
  jsonPos: new Oe.Name("jsonPos"),
  jsonLen: new Oe.Name("jsonLen"),
  jsonPart: new Oe.Name("jsonPart")
};
ht.default = uf;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = te, r = M, n = ht;
  e.keywordError = {
    message: ({ keyword: y }) => (0, t.str)`must pass "${y}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: y, schemaType: h }) => h ? (0, t.str)`"${y}" keyword must be ${h} ($data)` : (0, t.str)`"${y}" keyword is invalid ($data)`
  };
  function s(y, h = e.keywordError, w, N) {
    const { it: R } = y, { gen: T, compositeRule: z, allErrors: W } = R, ue = m(y, h, w);
    N ?? (z || W) ? c(T, ue) : d(R, (0, t._)`[${ue}]`);
  }
  e.reportError = s;
  function a(y, h = e.keywordError, w) {
    const { it: N } = y, { gen: R, compositeRule: T, allErrors: z } = N, W = m(y, h, w);
    c(R, W), T || z || d(N, n.default.vErrors);
  }
  e.reportExtraError = a;
  function i(y, h) {
    y.assign(n.default.errors, h), y.if((0, t._)`${n.default.vErrors} !== null`, () => y.if(h, () => y.assign((0, t._)`${n.default.vErrors}.length`, h), () => y.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function u({ gen: y, keyword: h, schemaValue: w, data: N, errsCount: R, it: T }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const z = y.name("err");
    y.forRange("i", R, n.default.errors, (W) => {
      y.const(z, (0, t._)`${n.default.vErrors}[${W}]`), y.if((0, t._)`${z}.instancePath === undefined`, () => y.assign((0, t._)`${z}.instancePath`, (0, t.strConcat)(n.default.instancePath, T.errorPath))), y.assign((0, t._)`${z}.schemaPath`, (0, t.str)`${T.errSchemaPath}/${h}`), T.opts.verbose && (y.assign((0, t._)`${z}.schema`, w), y.assign((0, t._)`${z}.data`, N));
    });
  }
  e.extendErrors = u;
  function c(y, h) {
    const w = y.const("err", h);
    y.if((0, t._)`${n.default.vErrors} === null`, () => y.assign(n.default.vErrors, (0, t._)`[${w}]`), (0, t._)`${n.default.vErrors}.push(${w})`), y.code((0, t._)`${n.default.errors}++`);
  }
  function d(y, h) {
    const { gen: w, validateName: N, schemaEnv: R } = y;
    R.$async ? w.throw((0, t._)`new ${y.ValidationError}(${h})`) : (w.assign((0, t._)`${N}.errors`, h), w.return(!1));
  }
  const l = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function m(y, h, w) {
    const { createErrors: N } = y.it;
    return N === !1 ? (0, t._)`{}` : P(y, h, w);
  }
  function P(y, h, w = {}) {
    const { gen: N, it: R } = y, T = [
      _(R, w),
      E(y, w)
    ];
    return g(y, h, T), N.object(...T);
  }
  function _({ errorPath: y }, { instancePath: h }) {
    const w = h ? (0, t.str)`${y}${(0, r.getErrorPath)(h, r.Type.Str)}` : y;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, w)];
  }
  function E({ keyword: y, it: { errSchemaPath: h } }, { schemaPath: w, parentSchema: N }) {
    let R = N ? h : (0, t.str)`${h}/${y}`;
    return w && (R = (0, t.str)`${R}${(0, r.getErrorPath)(w, r.Type.Str)}`), [l.schemaPath, R];
  }
  function g(y, { params: h, message: w }, N) {
    const { keyword: R, data: T, schemaValue: z, it: W } = y, { opts: ue, propertyName: V, topSchemaRef: H, schemaPath: ne } = W;
    N.push([l.keyword, R], [l.params, typeof h == "function" ? h(y) : h || (0, t._)`{}`]), ue.messages && N.push([l.message, typeof w == "function" ? w(y) : w]), ue.verbose && N.push([l.schema, z], [l.parentSchema, (0, t._)`${H}${ne}`], [n.default.data, T]), V && N.push([l.propertyName, V]);
  }
})(sn);
Object.defineProperty(Er, "__esModule", { value: !0 });
Er.boolOrEmptySchema = Er.topBoolOrEmptySchema = void 0;
const df = sn, ff = te, hf = ht, mf = {
  message: "boolean schema is false"
};
function pf(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? ul(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(hf.default.data) : (t.assign((0, ff._)`${n}.errors`, null), t.return(!0));
}
Er.topBoolOrEmptySchema = pf;
function $f(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), ul(e)) : r.var(t, !0);
}
Er.boolOrEmptySchema = $f;
function ul(e, t) {
  const { gen: r, data: n } = e, s = {
    gen: r,
    keyword: "false schema",
    data: n,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, df.reportError)(s, mf, void 0, t);
}
var ge = {}, er = {};
Object.defineProperty(er, "__esModule", { value: !0 });
er.getRules = er.isJSONType = void 0;
const yf = ["string", "number", "integer", "boolean", "null", "object", "array"], _f = new Set(yf);
function gf(e) {
  return typeof e == "string" && _f.has(e);
}
er.isJSONType = gf;
function vf() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
er.getRules = vf;
var pt = {};
Object.defineProperty(pt, "__esModule", { value: !0 });
pt.shouldUseRule = pt.shouldUseGroup = pt.schemaHasRulesForType = void 0;
function wf({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && dl(e, n);
}
pt.schemaHasRulesForType = wf;
function dl(e, t) {
  return t.rules.some((r) => fl(e, r));
}
pt.shouldUseGroup = dl;
function fl(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
pt.shouldUseRule = fl;
Object.defineProperty(ge, "__esModule", { value: !0 });
ge.reportTypeError = ge.checkDataTypes = ge.checkDataType = ge.coerceAndCheckDataType = ge.getJSONTypes = ge.getSchemaTypes = ge.DataType = void 0;
const Ef = er, Sf = pt, bf = sn, X = te, hl = M;
var $r;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})($r || (ge.DataType = $r = {}));
function Pf(e) {
  const t = ml(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
ge.getSchemaTypes = Pf;
function ml(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(Ef.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
ge.getJSONTypes = ml;
function Nf(e, t) {
  const { gen: r, data: n, opts: s } = e, a = Of(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, Sf.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const u = ba(t, n, s.strictNumbers, $r.Wrong);
    r.if(u, () => {
      a.length ? Rf(e, t, a) : Pa(e);
    });
  }
  return i;
}
ge.coerceAndCheckDataType = Nf;
const pl = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function Of(e, t) {
  return t ? e.filter((r) => pl.has(r) || t === "array" && r === "array") : [];
}
function Rf(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, X._)`typeof ${s}`), u = n.let("coerced", (0, X._)`undefined`);
  a.coerceTypes === "array" && n.if((0, X._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, X._)`${s}[0]`).assign(i, (0, X._)`typeof ${s}`).if(ba(t, s, a.strictNumbers), () => n.assign(u, s))), n.if((0, X._)`${u} !== undefined`);
  for (const d of r)
    (pl.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), Pa(e), n.endIf(), n.if((0, X._)`${u} !== undefined`, () => {
    n.assign(s, u), If(e, u);
  });
  function c(d) {
    switch (d) {
      case "string":
        n.elseIf((0, X._)`${i} == "number" || ${i} == "boolean"`).assign(u, (0, X._)`"" + ${s}`).elseIf((0, X._)`${s} === null`).assign(u, (0, X._)`""`);
        return;
      case "number":
        n.elseIf((0, X._)`${i} == "boolean" || ${s} === null
              || (${i} == "string" && ${s} && ${s} == +${s})`).assign(u, (0, X._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, X._)`${i} === "boolean" || ${s} === null
              || (${i} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(u, (0, X._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, X._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(u, !1).elseIf((0, X._)`${s} === "true" || ${s} === 1`).assign(u, !0);
        return;
      case "null":
        n.elseIf((0, X._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(u, null);
        return;
      case "array":
        n.elseIf((0, X._)`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${s} === null`).assign(u, (0, X._)`[${s}]`);
    }
  }
}
function If({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, X._)`${t} !== undefined`, () => e.assign((0, X._)`${t}[${r}]`, n));
}
function Ks(e, t, r, n = $r.Correct) {
  const s = n === $r.Correct ? X.operators.EQ : X.operators.NEQ;
  let a;
  switch (e) {
    case "null":
      return (0, X._)`${t} ${s} null`;
    case "array":
      a = (0, X._)`Array.isArray(${t})`;
      break;
    case "object":
      a = (0, X._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      a = i((0, X._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = i();
      break;
    default:
      return (0, X._)`typeof ${t} ${s} ${e}`;
  }
  return n === $r.Correct ? a : (0, X.not)(a);
  function i(u = X.nil) {
    return (0, X.and)((0, X._)`typeof ${t} == "number"`, u, r ? (0, X._)`isFinite(${t})` : X.nil);
  }
}
ge.checkDataType = Ks;
function ba(e, t, r, n) {
  if (e.length === 1)
    return Ks(e[0], t, r, n);
  let s;
  const a = (0, hl.toHash)(e);
  if (a.array && a.object) {
    const i = (0, X._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, X._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = X.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, X.and)(s, Ks(i, t, r, n));
  return s;
}
ge.checkDataTypes = ba;
const Tf = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, X._)`{type: ${e}}` : (0, X._)`{type: ${t}}`
};
function Pa(e) {
  const t = jf(e);
  (0, bf.reportError)(t, Tf);
}
ge.reportTypeError = Pa;
function jf(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, hl.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: s,
    schemaValue: s,
    parentSchema: n,
    params: {},
    it: e
  };
}
var ss = {};
Object.defineProperty(ss, "__esModule", { value: !0 });
ss.assignDefaults = void 0;
const ir = te, Af = M;
function kf(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      pi(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => pi(e, a, s.default));
}
ss.assignDefaults = kf;
function pi(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: i } = e;
  if (r === void 0)
    return;
  const u = (0, ir._)`${a}${(0, ir.getProperty)(t)}`;
  if (s) {
    (0, Af.checkStrictMode)(e, `default is ignored for: ${u}`);
    return;
  }
  let c = (0, ir._)`${u} === undefined`;
  i.useDefaults === "empty" && (c = (0, ir._)`${c} || ${u} === null || ${u} === ""`), n.if(c, (0, ir._)`${u} = ${(0, ir.stringify)(r)}`);
}
var lt = {}, x = {};
Object.defineProperty(x, "__esModule", { value: !0 });
x.validateUnion = x.validateArray = x.usePattern = x.callValidateCode = x.schemaProperties = x.allSchemaProperties = x.noPropertyInData = x.propertyInData = x.isOwnProperty = x.hasPropFunc = x.reportMissingProp = x.checkMissingProp = x.checkReportMissingProp = void 0;
const fe = te, Na = M, vt = ht, Cf = M;
function Df(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(Ra(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, fe._)`${t}` }, !0), e.error();
  });
}
x.checkReportMissingProp = Df;
function Mf({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, fe.or)(...n.map((a) => (0, fe.and)(Ra(e, t, a, r.ownProperties), (0, fe._)`${s} = ${a}`)));
}
x.checkMissingProp = Mf;
function Lf(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
x.reportMissingProp = Lf;
function $l(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, fe._)`Object.prototype.hasOwnProperty`
  });
}
x.hasPropFunc = $l;
function Oa(e, t, r) {
  return (0, fe._)`${$l(e)}.call(${t}, ${r})`;
}
x.isOwnProperty = Oa;
function Ff(e, t, r, n) {
  const s = (0, fe._)`${t}${(0, fe.getProperty)(r)} !== undefined`;
  return n ? (0, fe._)`${s} && ${Oa(e, t, r)}` : s;
}
x.propertyInData = Ff;
function Ra(e, t, r, n) {
  const s = (0, fe._)`${t}${(0, fe.getProperty)(r)} === undefined`;
  return n ? (0, fe.or)(s, (0, fe.not)(Oa(e, t, r))) : s;
}
x.noPropertyInData = Ra;
function yl(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
x.allSchemaProperties = yl;
function Vf(e, t) {
  return yl(t).filter((r) => !(0, Na.alwaysValidSchema)(e, t[r]));
}
x.schemaProperties = Vf;
function Uf({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: i }, u, c, d) {
  const l = d ? (0, fe._)`${e}, ${t}, ${n}${s}` : t, m = [
    [vt.default.instancePath, (0, fe.strConcat)(vt.default.instancePath, a)],
    [vt.default.parentData, i.parentData],
    [vt.default.parentDataProperty, i.parentDataProperty],
    [vt.default.rootData, vt.default.rootData]
  ];
  i.opts.dynamicRef && m.push([vt.default.dynamicAnchors, vt.default.dynamicAnchors]);
  const P = (0, fe._)`${l}, ${r.object(...m)}`;
  return c !== fe.nil ? (0, fe._)`${u}.call(${c}, ${P})` : (0, fe._)`${u}(${P})`;
}
x.callValidateCode = Uf;
const zf = (0, fe._)`new RegExp`;
function qf({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, fe._)`${s.code === "new RegExp" ? zf : (0, Cf.useFunc)(e, s)}(${r}, ${n})`
  });
}
x.usePattern = qf;
function Kf(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const u = t.let("valid", !0);
    return i(() => t.assign(u, !1)), u;
  }
  return t.var(a, !0), i(() => t.break()), a;
  function i(u) {
    const c = t.const("len", (0, fe._)`${r}.length`);
    t.forRange("i", 0, c, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: Na.Type.Num
      }, a), t.if((0, fe.not)(a), u);
    });
  }
}
x.validateArray = Kf;
function Gf(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, Na.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const i = t.let("valid", !1), u = t.name("_valid");
  t.block(() => r.forEach((c, d) => {
    const l = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, u);
    t.assign(i, (0, fe._)`${i} || ${u}`), e.mergeValidEvaluated(l, u) || t.if((0, fe.not)(i));
  })), e.result(i, () => e.reset(), () => e.error(!0));
}
x.validateUnion = Gf;
Object.defineProperty(lt, "__esModule", { value: !0 });
lt.validateKeywordUsage = lt.validSchemaType = lt.funcKeywordCode = lt.macroKeywordCode = void 0;
const je = te, Bt = ht, Hf = x, Wf = sn;
function Jf(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: i } = e, u = t.macro.call(i.self, s, a, i), c = _l(r, n, u);
  i.opts.validateSchema !== !1 && i.self.validateSchema(u, !0);
  const d = r.name("valid");
  e.subschema({
    schema: u,
    schemaPath: je.nil,
    errSchemaPath: `${i.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, d), e.pass(d, () => e.error(!0));
}
lt.macroKeywordCode = Jf;
function Bf(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: i, $data: u, it: c } = e;
  Yf(c, t);
  const d = !u && t.compile ? t.compile.call(c.self, a, i, c) : t.validate, l = _l(n, s, d), m = n.let("valid");
  e.block$data(m, P), e.ok((r = t.valid) !== null && r !== void 0 ? r : m);
  function P() {
    if (t.errors === !1)
      g(), t.modifying && $i(e), y(() => e.error());
    else {
      const h = t.async ? _() : E();
      t.modifying && $i(e), y(() => Xf(e, h));
    }
  }
  function _() {
    const h = n.let("ruleErrs", null);
    return n.try(() => g((0, je._)`await `), (w) => n.assign(m, !1).if((0, je._)`${w} instanceof ${c.ValidationError}`, () => n.assign(h, (0, je._)`${w}.errors`), () => n.throw(w))), h;
  }
  function E() {
    const h = (0, je._)`${l}.errors`;
    return n.assign(h, null), g(je.nil), h;
  }
  function g(h = t.async ? (0, je._)`await ` : je.nil) {
    const w = c.opts.passContext ? Bt.default.this : Bt.default.self, N = !("compile" in t && !u || t.schema === !1);
    n.assign(m, (0, je._)`${h}${(0, Hf.callValidateCode)(e, l, w, N)}`, t.modifying);
  }
  function y(h) {
    var w;
    n.if((0, je.not)((w = t.valid) !== null && w !== void 0 ? w : m), h);
  }
}
lt.funcKeywordCode = Bf;
function $i(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, je._)`${n.parentData}[${n.parentDataProperty}]`));
}
function Xf(e, t) {
  const { gen: r } = e;
  r.if((0, je._)`Array.isArray(${t})`, () => {
    r.assign(Bt.default.vErrors, (0, je._)`${Bt.default.vErrors} === null ? ${t} : ${Bt.default.vErrors}.concat(${t})`).assign(Bt.default.errors, (0, je._)`${Bt.default.vErrors}.length`), (0, Wf.extendErrors)(e);
  }, () => e.error());
}
function Yf({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function _l(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, je.stringify)(r) });
}
function Qf(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
lt.validSchemaType = Qf;
function Zf({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(a) : s.keyword !== a)
    throw new Error("ajv implementation error");
  const i = s.dependencies;
  if (i != null && i.some((u) => !Object.prototype.hasOwnProperty.call(e, u)))
    throw new Error(`parent schema must have dependencies of ${a}: ${i.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[a])) {
    const c = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
lt.validateKeywordUsage = Zf;
var It = {};
Object.defineProperty(It, "__esModule", { value: !0 });
It.extendSubschemaMode = It.extendSubschemaData = It.getSubschema = void 0;
const ot = te, gl = M;
function xf(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: i }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const u = e.schema[t];
    return r === void 0 ? {
      schema: u,
      schemaPath: (0, ot._)`${e.schemaPath}${(0, ot.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: u[r],
      schemaPath: (0, ot._)`${e.schemaPath}${(0, ot.getProperty)(t)}${(0, ot.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, gl.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (s === void 0 || a === void 0 || i === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: s,
      topSchemaRef: i,
      errSchemaPath: a
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
It.getSubschema = xf;
function eh(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: i }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: u } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: l, opts: m } = t, P = u.let("data", (0, ot._)`${t.data}${(0, ot.getProperty)(r)}`, !0);
    c(P), e.errorPath = (0, ot.str)`${d}${(0, gl.getErrorPath)(r, n, m.jsPropertySyntax)}`, e.parentDataProperty = (0, ot._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (s !== void 0) {
    const d = s instanceof ot.Name ? s : u.let("data", s, !0);
    c(d), i !== void 0 && (e.propertyName = i);
  }
  a && (e.dataTypes = a);
  function c(d) {
    e.data = d, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, d];
  }
}
It.extendSubschemaData = eh;
function th(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
It.extendSubschemaMode = th;
var Pe = {}, as = function e(t, r) {
  if (t === r) return !0;
  if (t && r && typeof t == "object" && typeof r == "object") {
    if (t.constructor !== r.constructor) return !1;
    var n, s, a;
    if (Array.isArray(t)) {
      if (n = t.length, n != r.length) return !1;
      for (s = n; s-- !== 0; )
        if (!e(t[s], r[s])) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
    if (a = Object.keys(t), n = a.length, n !== Object.keys(r).length) return !1;
    for (s = n; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, a[s])) return !1;
    for (s = n; s-- !== 0; ) {
      var i = a[s];
      if (!e(t[i], r[i])) return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}, vl = { exports: {} }, Ot = vl.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  kn(t, n, s, e, "", e);
};
Ot.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
Ot.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Ot.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Ot.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function kn(e, t, r, n, s, a, i, u, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, i, u, c, d);
    for (var l in n) {
      var m = n[l];
      if (Array.isArray(m)) {
        if (l in Ot.arrayKeywords)
          for (var P = 0; P < m.length; P++)
            kn(e, t, r, m[P], s + "/" + l + "/" + P, a, s, l, n, P);
      } else if (l in Ot.propsKeywords) {
        if (m && typeof m == "object")
          for (var _ in m)
            kn(e, t, r, m[_], s + "/" + l + "/" + rh(_), a, s, l, n, _);
      } else (l in Ot.keywords || e.allKeys && !(l in Ot.skipKeywords)) && kn(e, t, r, m, s + "/" + l, a, s, l, n);
    }
    r(n, s, a, i, u, c, d);
  }
}
function rh(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var nh = vl.exports;
Object.defineProperty(Pe, "__esModule", { value: !0 });
Pe.getSchemaRefs = Pe.resolveUrl = Pe.normalizeId = Pe._getFullPath = Pe.getFullPath = Pe.inlineRef = void 0;
const sh = M, ah = as, oh = nh, ih = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function ch(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Gs(e) : t ? wl(e) <= t : !1;
}
Pe.inlineRef = ch;
const lh = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Gs(e) {
  for (const t in e) {
    if (lh.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Gs) || typeof r == "object" && Gs(r))
      return !0;
  }
  return !1;
}
function wl(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !ih.has(r) && (typeof e[r] == "object" && (0, sh.eachItem)(e[r], (n) => t += wl(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function El(e, t = "", r) {
  r !== !1 && (t = yr(t));
  const n = e.parse(t);
  return Sl(e, n);
}
Pe.getFullPath = El;
function Sl(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Pe._getFullPath = Sl;
const uh = /#\/?$/;
function yr(e) {
  return e ? e.replace(uh, "") : "";
}
Pe.normalizeId = yr;
function dh(e, t, r) {
  return r = yr(r), e.resolve(t, r);
}
Pe.resolveUrl = dh;
const fh = /^[a-z_][-a-z0-9._]*$/i;
function hh(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = yr(e[r] || t), a = { "": s }, i = El(n, s, !1), u = {}, c = /* @__PURE__ */ new Set();
  return oh(e, { allKeys: !0 }, (m, P, _, E) => {
    if (E === void 0)
      return;
    const g = i + P;
    let y = a[E];
    typeof m[r] == "string" && (y = h.call(this, m[r])), w.call(this, m.$anchor), w.call(this, m.$dynamicAnchor), a[P] = y;
    function h(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = yr(y ? R(y, N) : N), c.has(N))
        throw l(N);
      c.add(N);
      let T = this.refs[N];
      return typeof T == "string" && (T = this.refs[T]), typeof T == "object" ? d(m, T.schema, N) : N !== yr(g) && (N[0] === "#" ? (d(m, u[N], N), u[N] = m) : this.refs[N] = g), N;
    }
    function w(N) {
      if (typeof N == "string") {
        if (!fh.test(N))
          throw new Error(`invalid anchor "${N}"`);
        h.call(this, `#${N}`);
      }
    }
  }), u;
  function d(m, P, _) {
    if (P !== void 0 && !ah(m, P))
      throw l(_);
  }
  function l(m) {
    return new Error(`reference "${m}" resolves to more than one schema`);
  }
}
Pe.getSchemaRefs = hh;
Object.defineProperty(tt, "__esModule", { value: !0 });
tt.getData = tt.KeywordCxt = tt.validateFunctionCode = void 0;
const bl = Er, yi = ge, Ia = pt, Kn = ge, mh = ss, Hr = lt, Ss = It, K = te, J = ht, ph = Pe, $t = M, Mr = sn;
function $h(e) {
  if (Ol(e) && (Rl(e), Nl(e))) {
    gh(e);
    return;
  }
  Pl(e, () => (0, bl.topBoolOrEmptySchema)(e));
}
tt.validateFunctionCode = $h;
function Pl({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, K._)`${J.default.data}, ${J.default.valCxt}`, n.$async, () => {
    e.code((0, K._)`"use strict"; ${_i(r, s)}`), _h(e, s), e.code(a);
  }) : e.func(t, (0, K._)`${J.default.data}, ${yh(s)}`, n.$async, () => e.code(_i(r, s)).code(a));
}
function yh(e) {
  return (0, K._)`{${J.default.instancePath}="", ${J.default.parentData}, ${J.default.parentDataProperty}, ${J.default.rootData}=${J.default.data}${e.dynamicRef ? (0, K._)`, ${J.default.dynamicAnchors}={}` : K.nil}}={}`;
}
function _h(e, t) {
  e.if(J.default.valCxt, () => {
    e.var(J.default.instancePath, (0, K._)`${J.default.valCxt}.${J.default.instancePath}`), e.var(J.default.parentData, (0, K._)`${J.default.valCxt}.${J.default.parentData}`), e.var(J.default.parentDataProperty, (0, K._)`${J.default.valCxt}.${J.default.parentDataProperty}`), e.var(J.default.rootData, (0, K._)`${J.default.valCxt}.${J.default.rootData}`), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, K._)`${J.default.valCxt}.${J.default.dynamicAnchors}`);
  }, () => {
    e.var(J.default.instancePath, (0, K._)`""`), e.var(J.default.parentData, (0, K._)`undefined`), e.var(J.default.parentDataProperty, (0, K._)`undefined`), e.var(J.default.rootData, J.default.data), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, K._)`{}`);
  });
}
function gh(e) {
  const { schema: t, opts: r, gen: n } = e;
  Pl(e, () => {
    r.$comment && t.$comment && Tl(e), bh(e), n.let(J.default.vErrors, null), n.let(J.default.errors, 0), r.unevaluated && vh(e), Il(e), Oh(e);
  });
}
function vh(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, K._)`${r}.evaluated`), t.if((0, K._)`${e.evaluated}.dynamicProps`, () => t.assign((0, K._)`${e.evaluated}.props`, (0, K._)`undefined`)), t.if((0, K._)`${e.evaluated}.dynamicItems`, () => t.assign((0, K._)`${e.evaluated}.items`, (0, K._)`undefined`));
}
function _i(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, K._)`/*# sourceURL=${r} */` : K.nil;
}
function wh(e, t) {
  if (Ol(e) && (Rl(e), Nl(e))) {
    Eh(e, t);
    return;
  }
  (0, bl.boolOrEmptySchema)(e, t);
}
function Nl({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function Ol(e) {
  return typeof e.schema != "boolean";
}
function Eh(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && Tl(e), Ph(e), Nh(e);
  const a = n.const("_errs", J.default.errors);
  Il(e, a), n.var(t, (0, K._)`${a} === ${J.default.errors}`);
}
function Rl(e) {
  (0, $t.checkUnknownRules)(e), Sh(e);
}
function Il(e, t) {
  if (e.opts.jtd)
    return gi(e, [], !1, t);
  const r = (0, yi.getSchemaTypes)(e.schema), n = (0, yi.coerceAndCheckDataType)(e, r);
  gi(e, r, !n, t);
}
function Sh(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, $t.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function bh(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, $t.checkStrictMode)(e, "default is ignored in the schema root");
}
function Ph(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, ph.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function Nh(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function Tl({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, K._)`${J.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const i = (0, K.str)`${n}/$comment`, u = e.scopeValue("root", { ref: t.root });
    e.code((0, K._)`${J.default.self}.opts.$comment(${a}, ${i}, ${u}.schema)`);
  }
}
function Oh(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, K._)`${J.default.errors} === 0`, () => t.return(J.default.data), () => t.throw((0, K._)`new ${s}(${J.default.vErrors})`)) : (t.assign((0, K._)`${n}.errors`, J.default.vErrors), a.unevaluated && Rh(e), t.return((0, K._)`${J.default.errors} === 0`));
}
function Rh({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof K.Name && e.assign((0, K._)`${t}.props`, r), n instanceof K.Name && e.assign((0, K._)`${t}.items`, n);
}
function gi(e, t, r, n) {
  const { gen: s, schema: a, data: i, allErrors: u, opts: c, self: d } = e, { RULES: l } = d;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, $t.schemaHasRulesButRef)(a, l))) {
    s.block(() => kl(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || Ih(e, t), s.block(() => {
    for (const P of l.rules)
      m(P);
    m(l.post);
  });
  function m(P) {
    (0, Ia.shouldUseGroup)(a, P) && (P.type ? (s.if((0, Kn.checkDataType)(P.type, i, c.strictNumbers)), vi(e, P), t.length === 1 && t[0] === P.type && r && (s.else(), (0, Kn.reportTypeError)(e)), s.endIf()) : vi(e, P), u || s.if((0, K._)`${J.default.errors} === ${n || 0}`));
  }
}
function vi(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, mh.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, Ia.shouldUseRule)(n, a) && kl(e, a.keyword, a.definition, t.type);
  });
}
function Ih(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (Th(e, t), e.opts.allowUnionTypes || jh(e, t), Ah(e, e.dataTypes));
}
function Th(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      jl(e.dataTypes, r) || Ta(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), Ch(e, t);
  }
}
function jh(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && Ta(e, "use allowUnionTypes to allow union type keyword");
}
function Ah(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, Ia.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((i) => kh(t, i)) && Ta(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function kh(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function jl(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function Ch(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    jl(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function Ta(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, $t.checkStrictMode)(e, t, e.opts.strictTypes);
}
let Al = class {
  constructor(t, r, n) {
    if ((0, Hr.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, $t.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", Cl(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Hr.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", J.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, K.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, K.not)(t), void 0, r);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: r } = this;
    this.fail((0, K._)`${r} !== undefined && (${(0, K.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? Mr.reportExtraError : Mr.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Mr.reportError)(this, this.def.$dataError || Mr.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Mr.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = K.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = K.nil, r = K.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: s, schemaType: a, def: i } = this;
    n.if((0, K.or)((0, K._)`${s} === undefined`, r)), t !== K.nil && n.assign(t, !0), (a.length || i.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== K.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: a } = this;
    return (0, K.or)(i(), u());
    function i() {
      if (n.length) {
        if (!(r instanceof K.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, K._)`${(0, Kn.checkDataTypes)(c, r, a.opts.strictNumbers, Kn.DataType.Wrong)}`;
      }
      return K.nil;
    }
    function u() {
      if (s.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, K._)`!${c}(${r})`;
      }
      return K.nil;
    }
  }
  subschema(t, r) {
    const n = (0, Ss.getSubschema)(this.it, t);
    (0, Ss.extendSubschemaData)(n, this.it, t), (0, Ss.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return wh(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = $t.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = $t.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, K.Name)), !0;
  }
};
tt.KeywordCxt = Al;
function kl(e, t, r, n) {
  const s = new Al(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Hr.funcKeywordCode)(s, r) : "macro" in r ? (0, Hr.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Hr.funcKeywordCode)(s, r);
}
const Dh = /^\/(?:[^~]|~0|~1)*$/, Mh = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function Cl(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return J.default.rootData;
  if (e[0] === "/") {
    if (!Dh.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = J.default.rootData;
  } else {
    const d = Mh.exec(e);
    if (!d)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const l = +d[1];
    if (s = d[2], s === "#") {
      if (l >= t)
        throw new Error(c("property/index", l));
      return n[t - l];
    }
    if (l > t)
      throw new Error(c("data", l));
    if (a = r[t - l], !s)
      return a;
  }
  let i = a;
  const u = s.split("/");
  for (const d of u)
    d && (a = (0, K._)`${a}${(0, K.getProperty)((0, $t.unescapeJsonPointer)(d))}`, i = (0, K._)`${i} && ${a}`);
  return i;
  function c(d, l) {
    return `Cannot access ${d} ${l} levels up, current level is ${t}`;
  }
}
tt.getData = Cl;
var an = {};
Object.defineProperty(an, "__esModule", { value: !0 });
let Lh = class extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
};
an.default = Lh;
var Or = {};
Object.defineProperty(Or, "__esModule", { value: !0 });
const bs = Pe;
let Fh = class extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, bs.resolveUrl)(t, r, n), this.missingSchema = (0, bs.normalizeId)((0, bs.getFullPath)(t, this.missingRef));
  }
};
Or.default = Fh;
var Le = {};
Object.defineProperty(Le, "__esModule", { value: !0 });
Le.resolveSchema = Le.getCompilingSchema = Le.resolveRef = Le.compileSchema = Le.SchemaEnv = void 0;
const Xe = te, Vh = an, Wt = ht, xe = Pe, wi = M, Uh = tt;
let os = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, xe.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
Le.SchemaEnv = os;
function ja(e) {
  const t = Dl.call(this, e);
  if (t)
    return t;
  const r = (0, xe.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new Xe.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let u;
  e.$async && (u = i.scopeValue("Error", {
    ref: Vh.default,
    code: (0, Xe._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = i.scopeName("validate");
  e.validateName = c;
  const d = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: Wt.default.data,
    parentData: Wt.default.parentData,
    parentDataProperty: Wt.default.parentDataProperty,
    dataNames: [Wt.default.data],
    dataPathArr: [Xe.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Xe.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: u,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Xe.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Xe._)`""`,
    opts: this.opts,
    self: this
  };
  let l;
  try {
    this._compilations.add(e), (0, Uh.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const m = i.toString();
    l = `${i.scopeRefs(Wt.default.scope)}return ${m}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const _ = new Function(`${Wt.default.self}`, `${Wt.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: _ }), _.errors = null, _.schema = e.schema, _.schemaEnv = e, e.$async && (_.$async = !0), this.opts.code.source === !0 && (_.source = { validateName: c, validateCode: m, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: E, items: g } = d;
      _.evaluated = {
        props: E instanceof Xe.Name ? void 0 : E,
        items: g instanceof Xe.Name ? void 0 : g,
        dynamicProps: E instanceof Xe.Name,
        dynamicItems: g instanceof Xe.Name
      }, _.source && (_.source.evaluated = (0, Xe.stringify)(_.evaluated));
    }
    return e.validate = _, e;
  } catch (m) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), m;
  } finally {
    this._compilations.delete(e);
  }
}
Le.compileSchema = ja;
function zh(e, t, r) {
  var n;
  r = (0, xe.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = Gh.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: u } = this.opts;
    i && (a = new os({ schema: i, schemaId: u, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = qh.call(this, a);
}
Le.resolveRef = zh;
function qh(e) {
  return (0, xe.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : ja.call(this, e);
}
function Dl(e) {
  for (const t of this._compilations)
    if (Kh(t, e))
      return t;
}
Le.getCompilingSchema = Dl;
function Kh(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function Gh(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || is.call(this, e, t);
}
function is(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, xe._getFullPath)(this.opts.uriResolver, r);
  let s = (0, xe.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return Ps.call(this, r, e);
  const a = (0, xe.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const u = is.call(this, e, i);
    return typeof (u == null ? void 0 : u.schema) != "object" ? void 0 : Ps.call(this, r, u);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || ja.call(this, i), a === (0, xe.normalizeId)(t)) {
      const { schema: u } = i, { schemaId: c } = this.opts, d = u[c];
      return d && (s = (0, xe.resolveUrl)(this.opts.uriResolver, s, d)), new os({ schema: u, schemaId: c, root: e, baseId: s });
    }
    return Ps.call(this, r, i);
  }
}
Le.resolveSchema = is;
const Hh = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Ps(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const u of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, wi.unescapeFragment)(u)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !Hh.has(u) && d && (t = (0, xe.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, wi.schemaHasRulesButRef)(r, this.RULES)) {
    const u = (0, xe.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = is.call(this, n, u);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new os({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const Wh = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Jh = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Bh = "object", Xh = [
  "$data"
], Yh = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, Qh = !1, Zh = {
  $id: Wh,
  description: Jh,
  type: Bh,
  required: Xh,
  properties: Yh,
  additionalProperties: Qh
};
var Aa = {}, cs = { exports: {} };
const xh = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), Ml = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function Ll(e) {
  let t = "", r = 0, n = 0;
  for (n = 0; n < e.length; n++)
    if (r = e[n].charCodeAt(0), r !== 48) {
      if (!(r >= 48 && r <= 57 || r >= 65 && r <= 70 || r >= 97 && r <= 102))
        return "";
      t += e[n];
      break;
    }
  for (n += 1; n < e.length; n++) {
    if (r = e[n].charCodeAt(0), !(r >= 48 && r <= 57 || r >= 65 && r <= 70 || r >= 97 && r <= 102))
      return "";
    t += e[n];
  }
  return t;
}
const em = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function Ei(e) {
  return e.length = 0, !0;
}
function tm(e, t, r) {
  if (e.length) {
    const n = Ll(e);
    if (n !== "")
      t.push(n);
    else
      return r.error = !0, !1;
    e.length = 0;
  }
  return !0;
}
function rm(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let a = !1, i = !1, u = tm;
  for (let c = 0; c < e.length; c++) {
    const d = e[c];
    if (!(d === "[" || d === "]"))
      if (d === ":") {
        if (a === !0 && (i = !0), !u(s, n, r))
          break;
        if (++t > 7) {
          r.error = !0;
          break;
        }
        c > 0 && e[c - 1] === ":" && (a = !0), n.push(":");
        continue;
      } else if (d === "%") {
        if (!u(s, n, r))
          break;
        u = Ei;
      } else {
        s.push(d);
        continue;
      }
  }
  return s.length && (u === Ei ? r.zone = s.join("") : i ? n.push(s.join("")) : n.push(Ll(s))), r.address = n.join(""), r;
}
function Fl(e) {
  if (nm(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = rm(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function nm(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function sm(e) {
  let t = e;
  const r = [];
  let n = -1, s = 0;
  for (; s = t.length; ) {
    if (s === 1) {
      if (t === ".")
        break;
      if (t === "/") {
        r.push("/");
        break;
      } else {
        r.push(t);
        break;
      }
    } else if (s === 2) {
      if (t[0] === ".") {
        if (t[1] === ".")
          break;
        if (t[1] === "/") {
          t = t.slice(2);
          continue;
        }
      } else if (t[0] === "/" && (t[1] === "." || t[1] === "/")) {
        r.push("/");
        break;
      }
    } else if (s === 3 && t === "/..") {
      r.length !== 0 && r.pop(), r.push("/");
      break;
    }
    if (t[0] === ".") {
      if (t[1] === ".") {
        if (t[2] === "/") {
          t = t.slice(3);
          continue;
        }
      } else if (t[1] === "/") {
        t = t.slice(2);
        continue;
      }
    } else if (t[0] === "/" && t[1] === ".") {
      if (t[2] === "/") {
        t = t.slice(2);
        continue;
      } else if (t[2] === "." && t[3] === "/") {
        t = t.slice(3), r.length !== 0 && r.pop();
        continue;
      }
    }
    if ((n = t.indexOf("/", 1)) === -1) {
      r.push(t);
      break;
    } else
      r.push(t.slice(0, n)), t = t.slice(n);
  }
  return r.join("");
}
function am(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function om(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!Ml(r)) {
      const n = Fl(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var Vl = {
  nonSimpleDomain: em,
  recomposeAuthority: om,
  normalizeComponentEncoding: am,
  removeDotSegments: sm,
  isIPv4: Ml,
  isUUID: xh,
  normalizeIPv6: Fl
};
const { isUUID: im } = Vl, cm = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function Ul(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function zl(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function ql(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function lm(e) {
  return e.secure = Ul(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function um(e) {
  if ((e.port === (Ul(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function dm(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(cm);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, a = ka(s);
    e.path = void 0, a && (e = a.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function fm(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, a = ka(s);
  a && (e = a.serialize(e, t));
  const i = e, u = e.nss;
  return i.path = `${n || t.nid}:${u}`, t.skipEscape = !0, i;
}
function hm(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !im(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function mm(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const Kl = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: zl,
    serialize: ql
  }
), pm = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: Kl.domainHost,
    parse: zl,
    serialize: ql
  }
), Cn = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: lm,
    serialize: um
  }
), $m = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: Cn.domainHost,
    parse: Cn.parse,
    serialize: Cn.serialize
  }
), ym = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: dm,
    serialize: fm,
    skipNormalize: !0
  }
), _m = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: hm,
    serialize: mm,
    skipNormalize: !0
  }
), Gn = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: Kl,
    https: pm,
    ws: Cn,
    wss: $m,
    urn: ym,
    "urn:uuid": _m
  }
);
Object.setPrototypeOf(Gn, null);
function ka(e) {
  return e && (Gn[
    /** @type {SchemeName} */
    e
  ] || Gn[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var gm = {
  SCHEMES: Gn,
  getSchemeHandler: ka
};
const { normalizeIPv6: vm, removeDotSegments: qr, recomposeAuthority: wm, normalizeComponentEncoding: pn, isIPv4: Em, nonSimpleDomain: Sm } = Vl, { SCHEMES: bm, getSchemeHandler: Gl } = gm;
function Pm(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  ut(gt(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  gt(ut(e, t), t)), e;
}
function Nm(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, s = Hl(gt(e, n), gt(t, n), n, !0);
  return n.skipEscape = !0, ut(s, n);
}
function Hl(e, t, r, n) {
  const s = {};
  return n || (e = gt(ut(e, r), r), t = gt(ut(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = qr(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = qr(t.path || ""), s.query = t.query) : (t.path ? (t.path[0] === "/" ? s.path = qr(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = qr(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function Om(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = ut(pn(gt(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = ut(pn(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = ut(pn(gt(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = ut(pn(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function ut(e, t) {
  const r = {
    host: e.host,
    scheme: e.scheme,
    userinfo: e.userinfo,
    port: e.port,
    path: e.path,
    query: e.query,
    nid: e.nid,
    nss: e.nss,
    uuid: e.uuid,
    fragment: e.fragment,
    reference: e.reference,
    resourceName: e.resourceName,
    secure: e.secure,
    error: ""
  }, n = Object.assign({}, t), s = [], a = Gl(n.scheme || r.scheme);
  a && a.serialize && a.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const i = wm(r);
  if (i !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(i), r.path && r.path[0] !== "/" && s.push("/")), r.path !== void 0) {
    let u = r.path;
    !n.absolutePath && (!a || !a.absolutePath) && (u = qr(u)), i === void 0 && u[0] === "/" && u[1] === "/" && (u = "/%2F" + u.slice(2)), s.push(u);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const Rm = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function gt(e, t) {
  const r = Object.assign({}, t), n = {
    scheme: void 0,
    userinfo: void 0,
    host: "",
    port: void 0,
    path: "",
    query: void 0,
    fragment: void 0
  };
  let s = !1;
  r.reference === "suffix" && (r.scheme ? e = r.scheme + ":" + e : e = "//" + e);
  const a = e.match(Rm);
  if (a) {
    if (n.scheme = a[1], n.userinfo = a[3], n.host = a[4], n.port = parseInt(a[5], 10), n.path = a[6] || "", n.query = a[7], n.fragment = a[8], isNaN(n.port) && (n.port = a[5]), n.host)
      if (Em(n.host) === !1) {
        const c = vm(n.host);
        n.host = c.host.toLowerCase(), s = c.isIPV6;
      } else
        s = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const i = Gl(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!i || !i.unicodeSupport) && n.host && (r.domainHost || i && i.domainHost) && s === !1 && Sm(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (u) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + u;
      }
    (!i || i && !i.skipNormalize) && (e.indexOf("%") !== -1 && (n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), n.host !== void 0 && (n.host = unescape(n.host))), n.path && (n.path = escape(unescape(n.path))), n.fragment && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), i && i.parse && i.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const Ca = {
  SCHEMES: bm,
  normalize: Pm,
  resolve: Nm,
  resolveComponent: Hl,
  equal: Om,
  serialize: ut,
  parse: gt
};
cs.exports = Ca;
cs.exports.default = Ca;
cs.exports.fastUri = Ca;
var Wl = cs.exports;
Object.defineProperty(Aa, "__esModule", { value: !0 });
const Jl = Wl;
Jl.code = 'require("ajv/dist/runtime/uri").default';
Aa.default = Jl;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = tt;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = te;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = an, s = Or, a = er, i = Le, u = te, c = Pe, d = ge, l = M, m = Zh, P = Aa, _ = (v, p) => new RegExp(v, p);
  _.code = "new RegExp";
  const E = ["removeAdditional", "useDefaults", "coerceTypes"], g = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), y = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, h = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, w = 200;
  function N(v) {
    var p, S, $, o, f, b, j, A, q, F, re, Ue, jt, At, kt, Ct, Dt, Mt, Lt, Ft, Vt, Ut, zt, qt, Kt;
    const Be = v.strict, Gt = (p = v.code) === null || p === void 0 ? void 0 : p.optimize, Cr = Gt === !0 || Gt === void 0 ? 1 : Gt || 0, Dr = ($ = (S = v.code) === null || S === void 0 ? void 0 : S.regExp) !== null && $ !== void 0 ? $ : _, Es = (o = v.uriResolver) !== null && o !== void 0 ? o : P.default;
    return {
      strictSchema: (b = (f = v.strictSchema) !== null && f !== void 0 ? f : Be) !== null && b !== void 0 ? b : !0,
      strictNumbers: (A = (j = v.strictNumbers) !== null && j !== void 0 ? j : Be) !== null && A !== void 0 ? A : !0,
      strictTypes: (F = (q = v.strictTypes) !== null && q !== void 0 ? q : Be) !== null && F !== void 0 ? F : "log",
      strictTuples: (Ue = (re = v.strictTuples) !== null && re !== void 0 ? re : Be) !== null && Ue !== void 0 ? Ue : "log",
      strictRequired: (At = (jt = v.strictRequired) !== null && jt !== void 0 ? jt : Be) !== null && At !== void 0 ? At : !1,
      code: v.code ? { ...v.code, optimize: Cr, regExp: Dr } : { optimize: Cr, regExp: Dr },
      loopRequired: (kt = v.loopRequired) !== null && kt !== void 0 ? kt : w,
      loopEnum: (Ct = v.loopEnum) !== null && Ct !== void 0 ? Ct : w,
      meta: (Dt = v.meta) !== null && Dt !== void 0 ? Dt : !0,
      messages: (Mt = v.messages) !== null && Mt !== void 0 ? Mt : !0,
      inlineRefs: (Lt = v.inlineRefs) !== null && Lt !== void 0 ? Lt : !0,
      schemaId: (Ft = v.schemaId) !== null && Ft !== void 0 ? Ft : "$id",
      addUsedSchema: (Vt = v.addUsedSchema) !== null && Vt !== void 0 ? Vt : !0,
      validateSchema: (Ut = v.validateSchema) !== null && Ut !== void 0 ? Ut : !0,
      validateFormats: (zt = v.validateFormats) !== null && zt !== void 0 ? zt : !0,
      unicodeRegExp: (qt = v.unicodeRegExp) !== null && qt !== void 0 ? qt : !0,
      int32range: (Kt = v.int32range) !== null && Kt !== void 0 ? Kt : !0,
      uriResolver: Es
    };
  }
  class R {
    constructor(p = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), p = this.opts = { ...p, ...N(p) };
      const { es5: S, lines: $ } = this.opts.code;
      this.scope = new u.ValueScope({ scope: {}, prefixes: g, es5: S, lines: $ }), this.logger = Q(p.logger);
      const o = p.validateFormats;
      p.validateFormats = !1, this.RULES = (0, a.getRules)(), T.call(this, y, p, "NOT SUPPORTED"), T.call(this, h, p, "DEPRECATED", "warn"), this._metaOpts = H.call(this), p.formats && ue.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), p.keywords && V.call(this, p.keywords), typeof p.meta == "object" && this.addMetaSchema(p.meta), W.call(this), p.validateFormats = o;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: p, meta: S, schemaId: $ } = this.opts;
      let o = m;
      $ === "id" && (o = { ...m }, o.id = o.$id, delete o.$id), S && p && this.addMetaSchema(o, o[$], !1);
    }
    defaultMeta() {
      const { meta: p, schemaId: S } = this.opts;
      return this.opts.defaultMeta = typeof p == "object" ? p[S] || p : void 0;
    }
    validate(p, S) {
      let $;
      if (typeof p == "string") {
        if ($ = this.getSchema(p), !$)
          throw new Error(`no schema with key or ref "${p}"`);
      } else
        $ = this.compile(p);
      const o = $(S);
      return "$async" in $ || (this.errors = $.errors), o;
    }
    compile(p, S) {
      const $ = this._addSchema(p, S);
      return $.validate || this._compileSchemaEnv($);
    }
    compileAsync(p, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: $ } = this.opts;
      return o.call(this, p, S);
      async function o(F, re) {
        await f.call(this, F.$schema);
        const Ue = this._addSchema(F, re);
        return Ue.validate || b.call(this, Ue);
      }
      async function f(F) {
        F && !this.getSchema(F) && await o.call(this, { $ref: F }, !0);
      }
      async function b(F) {
        try {
          return this._compileSchemaEnv(F);
        } catch (re) {
          if (!(re instanceof s.default))
            throw re;
          return j.call(this, re), await A.call(this, re.missingSchema), b.call(this, F);
        }
      }
      function j({ missingSchema: F, missingRef: re }) {
        if (this.refs[F])
          throw new Error(`AnySchema ${F} is loaded but ${re} cannot be resolved`);
      }
      async function A(F) {
        const re = await q.call(this, F);
        this.refs[F] || await f.call(this, re.$schema), this.refs[F] || this.addSchema(re, F, S);
      }
      async function q(F) {
        const re = this._loading[F];
        if (re)
          return re;
        try {
          return await (this._loading[F] = $(F));
        } finally {
          delete this._loading[F];
        }
      }
    }
    // Adds schema to the instance
    addSchema(p, S, $, o = this.opts.validateSchema) {
      if (Array.isArray(p)) {
        for (const b of p)
          this.addSchema(b, void 0, $, o);
        return this;
      }
      let f;
      if (typeof p == "object") {
        const { schemaId: b } = this.opts;
        if (f = p[b], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${b} must be string`);
      }
      return S = (0, c.normalizeId)(S || f), this._checkUnique(S), this.schemas[S] = this._addSchema(p, $, S, o, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(p, S, $ = this.opts.validateSchema) {
      return this.addSchema(p, S, !0, $), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(p, S) {
      if (typeof p == "boolean")
        return !0;
      let $;
      if ($ = p.$schema, $ !== void 0 && typeof $ != "string")
        throw new Error("$schema must be a string");
      if ($ = $ || this.opts.defaultMeta || this.defaultMeta(), !$)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const o = this.validate($, p);
      if (!o && S) {
        const f = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(f);
        else
          throw new Error(f);
      }
      return o;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(p) {
      let S;
      for (; typeof (S = z.call(this, p)) == "string"; )
        p = S;
      if (S === void 0) {
        const { schemaId: $ } = this.opts, o = new i.SchemaEnv({ schema: {}, schemaId: $ });
        if (S = i.resolveSchema.call(this, o, p), !S)
          return;
        this.refs[p] = S;
      }
      return S.validate || this._compileSchemaEnv(S);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(p) {
      if (p instanceof RegExp)
        return this._removeAllSchemas(this.schemas, p), this._removeAllSchemas(this.refs, p), this;
      switch (typeof p) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const S = z.call(this, p);
          return typeof S == "object" && this._cache.delete(S.schema), delete this.schemas[p], delete this.refs[p], this;
        }
        case "object": {
          const S = p;
          this._cache.delete(S);
          let $ = p[this.opts.schemaId];
          return $ && ($ = (0, c.normalizeId)($), delete this.schemas[$], delete this.refs[$]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(p) {
      for (const S of p)
        this.addKeyword(S);
      return this;
    }
    addKeyword(p, S) {
      let $;
      if (typeof p == "string")
        $ = p, typeof S == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), S.keyword = $);
      else if (typeof p == "object" && S === void 0) {
        if (S = p, $ = S.keyword, Array.isArray($) && !$.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (C.call(this, $, S), !S)
        return (0, l.eachItem)($, (f) => k.call(this, f)), this;
      D.call(this, S);
      const o = {
        ...S,
        type: (0, d.getJSONTypes)(S.type),
        schemaType: (0, d.getJSONTypes)(S.schemaType)
      };
      return (0, l.eachItem)($, o.type.length === 0 ? (f) => k.call(this, f, o) : (f) => o.type.forEach((b) => k.call(this, f, o, b))), this;
    }
    getKeyword(p) {
      const S = this.RULES.all[p];
      return typeof S == "object" ? S.definition : !!S;
    }
    // Remove keyword
    removeKeyword(p) {
      const { RULES: S } = this;
      delete S.keywords[p], delete S.all[p];
      for (const $ of S.rules) {
        const o = $.rules.findIndex((f) => f.keyword === p);
        o >= 0 && $.rules.splice(o, 1);
      }
      return this;
    }
    // Add format
    addFormat(p, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[p] = S, this;
    }
    errorsText(p = this.errors, { separator: S = ", ", dataVar: $ = "data" } = {}) {
      return !p || p.length === 0 ? "No errors" : p.map((o) => `${$}${o.instancePath} ${o.message}`).reduce((o, f) => o + S + f);
    }
    $dataMetaSchema(p, S) {
      const $ = this.RULES.all;
      p = JSON.parse(JSON.stringify(p));
      for (const o of S) {
        const f = o.split("/").slice(1);
        let b = p;
        for (const j of f)
          b = b[j];
        for (const j in $) {
          const A = $[j];
          if (typeof A != "object")
            continue;
          const { $data: q } = A.definition, F = b[j];
          q && F && (b[j] = I(F));
        }
      }
      return p;
    }
    _removeAllSchemas(p, S) {
      for (const $ in p) {
        const o = p[$];
        (!S || S.test($)) && (typeof o == "string" ? delete p[$] : o && !o.meta && (this._cache.delete(o.schema), delete p[$]));
      }
    }
    _addSchema(p, S, $, o = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let b;
      const { schemaId: j } = this.opts;
      if (typeof p == "object")
        b = p[j];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof p != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let A = this._cache.get(p);
      if (A !== void 0)
        return A;
      $ = (0, c.normalizeId)(b || $);
      const q = c.getSchemaRefs.call(this, p, $);
      return A = new i.SchemaEnv({ schema: p, schemaId: j, meta: S, baseId: $, localRefs: q }), this._cache.set(A.schema, A), f && !$.startsWith("#") && ($ && this._checkUnique($), this.refs[$] = A), o && this.validateSchema(p, !0), A;
    }
    _checkUnique(p) {
      if (this.schemas[p] || this.refs[p])
        throw new Error(`schema with key or id "${p}" already exists`);
    }
    _compileSchemaEnv(p) {
      if (p.meta ? this._compileMetaSchema(p) : i.compileSchema.call(this, p), !p.validate)
        throw new Error("ajv implementation error");
      return p.validate;
    }
    _compileMetaSchema(p) {
      const S = this.opts;
      this.opts = this._metaOpts;
      try {
        i.compileSchema.call(this, p);
      } finally {
        this.opts = S;
      }
    }
  }
  R.ValidationError = n.default, R.MissingRefError = s.default, e.default = R;
  function T(v, p, S, $ = "error") {
    for (const o in v) {
      const f = o;
      f in p && this.logger[$](`${S}: option ${o}. ${v[f]}`);
    }
  }
  function z(v) {
    return v = (0, c.normalizeId)(v), this.schemas[v] || this.refs[v];
  }
  function W() {
    const v = this.opts.schemas;
    if (v)
      if (Array.isArray(v))
        this.addSchema(v);
      else
        for (const p in v)
          this.addSchema(v[p], p);
  }
  function ue() {
    for (const v in this.opts.formats) {
      const p = this.opts.formats[v];
      p && this.addFormat(v, p);
    }
  }
  function V(v) {
    if (Array.isArray(v)) {
      this.addVocabulary(v);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const p in v) {
      const S = v[p];
      S.keyword || (S.keyword = p), this.addKeyword(S);
    }
  }
  function H() {
    const v = { ...this.opts };
    for (const p of E)
      delete v[p];
    return v;
  }
  const ne = { log() {
  }, warn() {
  }, error() {
  } };
  function Q(v) {
    if (v === !1)
      return ne;
    if (v === void 0)
      return console;
    if (v.log && v.warn && v.error)
      return v;
    throw new Error("logger must implement log, warn and error methods");
  }
  const de = /^[a-z_$][a-z0-9_$:-]*$/i;
  function C(v, p) {
    const { RULES: S } = this;
    if ((0, l.eachItem)(v, ($) => {
      if (S.keywords[$])
        throw new Error(`Keyword ${$} is already defined`);
      if (!de.test($))
        throw new Error(`Keyword ${$} has invalid name`);
    }), !!p && p.$data && !("code" in p || "validate" in p))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function k(v, p, S) {
    var $;
    const o = p == null ? void 0 : p.post;
    if (S && o)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let b = o ? f.post : f.rules.find(({ type: A }) => A === S);
    if (b || (b = { type: S, rules: [] }, f.rules.push(b)), f.keywords[v] = !0, !p)
      return;
    const j = {
      keyword: v,
      definition: {
        ...p,
        type: (0, d.getJSONTypes)(p.type),
        schemaType: (0, d.getJSONTypes)(p.schemaType)
      }
    };
    p.before ? U.call(this, b, j, p.before) : b.rules.push(j), f.all[v] = j, ($ = p.implements) === null || $ === void 0 || $.forEach((A) => this.addKeyword(A));
  }
  function U(v, p, S) {
    const $ = v.rules.findIndex((o) => o.keyword === S);
    $ >= 0 ? v.rules.splice($, 0, p) : (v.rules.push(p), this.logger.warn(`rule ${S} is not defined`));
  }
  function D(v) {
    let { metaSchema: p } = v;
    p !== void 0 && (v.$data && this.opts.$data && (p = I(p)), v.validateSchema = this.compile(p, !0));
  }
  const O = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function I(v) {
    return { anyOf: [v, O] };
  }
})(sl);
var Da = {}, Ma = {}, La = {};
Object.defineProperty(La, "__esModule", { value: !0 });
const Im = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
La.default = Im;
var tr = {};
Object.defineProperty(tr, "__esModule", { value: !0 });
tr.callRef = tr.getValidate = void 0;
const Tm = Or, Si = x, De = te, cr = ht, bi = Le, $n = M, jm = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: u, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return m();
    const l = bi.resolveRef.call(c, d, s, r);
    if (l === void 0)
      throw new Tm.default(n.opts.uriResolver, s, r);
    if (l instanceof bi.SchemaEnv)
      return P(l);
    return _(l);
    function m() {
      if (a === d)
        return Dn(e, i, a, a.$async);
      const E = t.scopeValue("root", { ref: d });
      return Dn(e, (0, De._)`${E}.validate`, d, d.$async);
    }
    function P(E) {
      const g = Bl(e, E);
      Dn(e, g, E, E.$async);
    }
    function _(E) {
      const g = t.scopeValue("schema", u.code.source === !0 ? { ref: E, code: (0, De.stringify)(E) } : { ref: E }), y = t.name("valid"), h = e.subschema({
        schema: E,
        dataTypes: [],
        schemaPath: De.nil,
        topSchemaRef: g,
        errSchemaPath: r
      }, y);
      e.mergeEvaluated(h), e.ok(y);
    }
  }
};
function Bl(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, De._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
tr.getValidate = Bl;
function Dn(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: u, opts: c } = a, d = c.passContext ? cr.default.this : De.nil;
  n ? l() : m();
  function l() {
    if (!u.$async)
      throw new Error("async schema referenced by sync schema");
    const E = s.let("valid");
    s.try(() => {
      s.code((0, De._)`await ${(0, Si.callValidateCode)(e, t, d)}`), _(t), i || s.assign(E, !0);
    }, (g) => {
      s.if((0, De._)`!(${g} instanceof ${a.ValidationError})`, () => s.throw(g)), P(g), i || s.assign(E, !1);
    }), e.ok(E);
  }
  function m() {
    e.result((0, Si.callValidateCode)(e, t, d), () => _(t), () => P(t));
  }
  function P(E) {
    const g = (0, De._)`${E}.errors`;
    s.assign(cr.default.vErrors, (0, De._)`${cr.default.vErrors} === null ? ${g} : ${cr.default.vErrors}.concat(${g})`), s.assign(cr.default.errors, (0, De._)`${cr.default.vErrors}.length`);
  }
  function _(E) {
    var g;
    if (!a.opts.unevaluated)
      return;
    const y = (g = r == null ? void 0 : r.validate) === null || g === void 0 ? void 0 : g.evaluated;
    if (a.props !== !0)
      if (y && !y.dynamicProps)
        y.props !== void 0 && (a.props = $n.mergeEvaluated.props(s, y.props, a.props));
      else {
        const h = s.var("props", (0, De._)`${E}.evaluated.props`);
        a.props = $n.mergeEvaluated.props(s, h, a.props, De.Name);
      }
    if (a.items !== !0)
      if (y && !y.dynamicItems)
        y.items !== void 0 && (a.items = $n.mergeEvaluated.items(s, y.items, a.items));
      else {
        const h = s.var("items", (0, De._)`${E}.evaluated.items`);
        a.items = $n.mergeEvaluated.items(s, h, a.items, De.Name);
      }
  }
}
tr.callRef = Dn;
tr.default = jm;
Object.defineProperty(Ma, "__esModule", { value: !0 });
const Am = La, km = tr, Cm = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  Am.default,
  km.default
];
Ma.default = Cm;
var Fa = {}, Va = {};
Object.defineProperty(Va, "__esModule", { value: !0 });
const Hn = te, wt = Hn.operators, Wn = {
  maximum: { okStr: "<=", ok: wt.LTE, fail: wt.GT },
  minimum: { okStr: ">=", ok: wt.GTE, fail: wt.LT },
  exclusiveMaximum: { okStr: "<", ok: wt.LT, fail: wt.GTE },
  exclusiveMinimum: { okStr: ">", ok: wt.GT, fail: wt.LTE }
}, Dm = {
  message: ({ keyword: e, schemaCode: t }) => (0, Hn.str)`must be ${Wn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Hn._)`{comparison: ${Wn[e].okStr}, limit: ${t}}`
}, Mm = {
  keyword: Object.keys(Wn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Dm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Hn._)`${r} ${Wn[t].fail} ${n} || isNaN(${r})`);
  }
};
Va.default = Mm;
var Ua = {};
Object.defineProperty(Ua, "__esModule", { value: !0 });
const Wr = te, Lm = {
  message: ({ schemaCode: e }) => (0, Wr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Wr._)`{multipleOf: ${e}}`
}, Fm = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Lm,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), u = a ? (0, Wr._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, Wr._)`${i} !== parseInt(${i})`;
    e.fail$data((0, Wr._)`(${n} === 0 || (${i} = ${r}/${n}, ${u}))`);
  }
};
Ua.default = Fm;
var za = {}, qa = {};
Object.defineProperty(qa, "__esModule", { value: !0 });
function Xl(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
qa.default = Xl;
Xl.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(za, "__esModule", { value: !0 });
const Xt = te, Vm = M, Um = qa, zm = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Xt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Xt._)`{limit: ${e}}`
}, qm = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: zm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Xt.operators.GT : Xt.operators.LT, i = s.opts.unicode === !1 ? (0, Xt._)`${r}.length` : (0, Xt._)`${(0, Vm.useFunc)(e.gen, Um.default)}(${r})`;
    e.fail$data((0, Xt._)`${i} ${a} ${n}`);
  }
};
za.default = qm;
var Ka = {};
Object.defineProperty(Ka, "__esModule", { value: !0 });
const Km = x, Jn = te, Gm = {
  message: ({ schemaCode: e }) => (0, Jn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Jn._)`{pattern: ${e}}`
}, Hm = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: Gm,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, i = a.opts.unicodeRegExp ? "u" : "", u = r ? (0, Jn._)`(new RegExp(${s}, ${i}))` : (0, Km.usePattern)(e, n);
    e.fail$data((0, Jn._)`!${u}.test(${t})`);
  }
};
Ka.default = Hm;
var Ga = {};
Object.defineProperty(Ga, "__esModule", { value: !0 });
const Jr = te, Wm = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Jr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Jr._)`{limit: ${e}}`
}, Jm = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: Wm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Jr.operators.GT : Jr.operators.LT;
    e.fail$data((0, Jr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Ga.default = Jm;
var Ha = {};
Object.defineProperty(Ha, "__esModule", { value: !0 });
const Lr = x, Br = te, Bm = M, Xm = {
  message: ({ params: { missingProperty: e } }) => (0, Br.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Br._)`{missingProperty: ${e}}`
}, Ym = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: Xm,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: i } = e, { opts: u } = i;
    if (!a && r.length === 0)
      return;
    const c = r.length >= u.loopRequired;
    if (i.allErrors ? d() : l(), u.strictRequired) {
      const _ = e.parentSchema.properties, { definedProperties: E } = e.it;
      for (const g of r)
        if ((_ == null ? void 0 : _[g]) === void 0 && !E.has(g)) {
          const y = i.schemaEnv.baseId + i.errSchemaPath, h = `required property "${g}" is not defined at "${y}" (strictRequired)`;
          (0, Bm.checkStrictMode)(i, h, i.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(Br.nil, m);
      else
        for (const _ of r)
          (0, Lr.checkReportMissingProp)(e, _);
    }
    function l() {
      const _ = t.let("missing");
      if (c || a) {
        const E = t.let("valid", !0);
        e.block$data(E, () => P(_, E)), e.ok(E);
      } else
        t.if((0, Lr.checkMissingProp)(e, r, _)), (0, Lr.reportMissingProp)(e, _), t.else();
    }
    function m() {
      t.forOf("prop", n, (_) => {
        e.setParams({ missingProperty: _ }), t.if((0, Lr.noPropertyInData)(t, s, _, u.ownProperties), () => e.error());
      });
    }
    function P(_, E) {
      e.setParams({ missingProperty: _ }), t.forOf(_, n, () => {
        t.assign(E, (0, Lr.propertyInData)(t, s, _, u.ownProperties)), t.if((0, Br.not)(E), () => {
          e.error(), t.break();
        });
      }, Br.nil);
    }
  }
};
Ha.default = Ym;
var Wa = {};
Object.defineProperty(Wa, "__esModule", { value: !0 });
const Xr = te, Qm = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Xr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Xr._)`{limit: ${e}}`
}, Zm = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: Qm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Xr.operators.GT : Xr.operators.LT;
    e.fail$data((0, Xr._)`${r}.length ${s} ${n}`);
  }
};
Wa.default = Zm;
var Ja = {}, on = {};
Object.defineProperty(on, "__esModule", { value: !0 });
const Yl = as;
Yl.code = 'require("ajv/dist/runtime/equal").default';
on.default = Yl;
Object.defineProperty(Ja, "__esModule", { value: !0 });
const Ns = ge, Ee = te, xm = M, ep = on, tp = {
  message: ({ params: { i: e, j: t } }) => (0, Ee.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Ee._)`{i: ${e}, j: ${t}}`
}, rp = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: tp,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: u } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, Ns.getSchemaTypes)(a.items) : [];
    e.block$data(c, l, (0, Ee._)`${i} === false`), e.ok(c);
    function l() {
      const E = t.let("i", (0, Ee._)`${r}.length`), g = t.let("j");
      e.setParams({ i: E, j: g }), t.assign(c, !0), t.if((0, Ee._)`${E} > 1`, () => (m() ? P : _)(E, g));
    }
    function m() {
      return d.length > 0 && !d.some((E) => E === "object" || E === "array");
    }
    function P(E, g) {
      const y = t.name("item"), h = (0, Ns.checkDataTypes)(d, y, u.opts.strictNumbers, Ns.DataType.Wrong), w = t.const("indices", (0, Ee._)`{}`);
      t.for((0, Ee._)`;${E}--;`, () => {
        t.let(y, (0, Ee._)`${r}[${E}]`), t.if(h, (0, Ee._)`continue`), d.length > 1 && t.if((0, Ee._)`typeof ${y} == "string"`, (0, Ee._)`${y} += "_"`), t.if((0, Ee._)`typeof ${w}[${y}] == "number"`, () => {
          t.assign(g, (0, Ee._)`${w}[${y}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Ee._)`${w}[${y}] = ${E}`);
      });
    }
    function _(E, g) {
      const y = (0, xm.useFunc)(t, ep.default), h = t.name("outer");
      t.label(h).for((0, Ee._)`;${E}--;`, () => t.for((0, Ee._)`${g} = ${E}; ${g}--;`, () => t.if((0, Ee._)`${y}(${r}[${E}], ${r}[${g}])`, () => {
        e.error(), t.assign(c, !1).break(h);
      })));
    }
  }
};
Ja.default = rp;
var Ba = {};
Object.defineProperty(Ba, "__esModule", { value: !0 });
const Hs = te, np = M, sp = on, ap = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Hs._)`{allowedValue: ${e}}`
}, op = {
  keyword: "const",
  $data: !0,
  error: ap,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, Hs._)`!${(0, np.useFunc)(t, sp.default)}(${r}, ${s})`) : e.fail((0, Hs._)`${a} !== ${r}`);
  }
};
Ba.default = op;
var Xa = {};
Object.defineProperty(Xa, "__esModule", { value: !0 });
const Kr = te, ip = M, cp = on, lp = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Kr._)`{allowedValues: ${e}}`
}, up = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: lp,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const u = s.length >= i.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, ip.useFunc)(t, cp.default));
    let l;
    if (u || n)
      l = t.let("valid"), e.block$data(l, m);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const _ = t.const("vSchema", a);
      l = (0, Kr.or)(...s.map((E, g) => P(_, g)));
    }
    e.pass(l);
    function m() {
      t.assign(l, !1), t.forOf("v", a, (_) => t.if((0, Kr._)`${d()}(${r}, ${_})`, () => t.assign(l, !0).break()));
    }
    function P(_, E) {
      const g = s[E];
      return typeof g == "object" && g !== null ? (0, Kr._)`${d()}(${r}, ${_}[${E}])` : (0, Kr._)`${r} === ${g}`;
    }
  }
};
Xa.default = up;
Object.defineProperty(Fa, "__esModule", { value: !0 });
const dp = Va, fp = Ua, hp = za, mp = Ka, pp = Ga, $p = Ha, yp = Wa, _p = Ja, gp = Ba, vp = Xa, wp = [
  // number
  dp.default,
  fp.default,
  // string
  hp.default,
  mp.default,
  // object
  pp.default,
  $p.default,
  // array
  yp.default,
  _p.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  gp.default,
  vp.default
];
Fa.default = wp;
var Ya = {}, Rr = {};
Object.defineProperty(Rr, "__esModule", { value: !0 });
Rr.validateAdditionalItems = void 0;
const Yt = te, Ws = M, Ep = {
  message: ({ params: { len: e } }) => (0, Yt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Yt._)`{limit: ${e}}`
}, Sp = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: Ep,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Ws.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Ql(e, n);
  }
};
function Ql(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const u = r.const("len", (0, Yt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Yt._)`${u} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Ws.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, Yt._)`${u} <= ${t.length}`);
    r.if((0, Yt.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, u, (l) => {
      e.subschema({ keyword: a, dataProp: l, dataPropType: Ws.Type.Num }, d), i.allErrors || r.if((0, Yt.not)(d), () => r.break());
    });
  }
}
Rr.validateAdditionalItems = Ql;
Rr.default = Sp;
var Qa = {}, Ir = {};
Object.defineProperty(Ir, "__esModule", { value: !0 });
Ir.validateTuple = void 0;
const Pi = te, Mn = M, bp = x, Pp = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Zl(e, "additionalItems", t);
    r.items = !0, !(0, Mn.alwaysValidSchema)(r, t) && e.ok((0, bp.validateArray)(e));
  }
};
function Zl(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: u } = e;
  l(s), u.opts.unevaluated && r.length && u.items !== !0 && (u.items = Mn.mergeEvaluated.items(n, r.length, u.items));
  const c = n.name("valid"), d = n.const("len", (0, Pi._)`${a}.length`);
  r.forEach((m, P) => {
    (0, Mn.alwaysValidSchema)(u, m) || (n.if((0, Pi._)`${d} > ${P}`, () => e.subschema({
      keyword: i,
      schemaProp: P,
      dataProp: P
    }, c)), e.ok(c));
  });
  function l(m) {
    const { opts: P, errSchemaPath: _ } = u, E = r.length, g = E === m.minItems && (E === m.maxItems || m[t] === !1);
    if (P.strictTuples && !g) {
      const y = `"${i}" is ${E}-tuple, but minItems or maxItems/${t} are not specified or different at path "${_}"`;
      (0, Mn.checkStrictMode)(u, y, P.strictTuples);
    }
  }
}
Ir.validateTuple = Zl;
Ir.default = Pp;
Object.defineProperty(Qa, "__esModule", { value: !0 });
const Np = Ir, Op = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, Np.validateTuple)(e, "items")
};
Qa.default = Op;
var Za = {};
Object.defineProperty(Za, "__esModule", { value: !0 });
const Ni = te, Rp = M, Ip = x, Tp = Rr, jp = {
  message: ({ params: { len: e } }) => (0, Ni.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Ni._)`{limit: ${e}}`
}, Ap = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: jp,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, Rp.alwaysValidSchema)(n, t) && (s ? (0, Tp.validateAdditionalItems)(e, s) : e.ok((0, Ip.validateArray)(e)));
  }
};
Za.default = Ap;
var xa = {};
Object.defineProperty(xa, "__esModule", { value: !0 });
const We = te, yn = M, kp = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, We.str)`must contain at least ${e} valid item(s)` : (0, We.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, We._)`{minContains: ${e}}` : (0, We._)`{minContains: ${e}, maxContains: ${t}}`
}, Cp = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: kp,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let i, u;
    const { minContains: c, maxContains: d } = n;
    a.opts.next ? (i = c === void 0 ? 1 : c, u = d) : i = 1;
    const l = t.const("len", (0, We._)`${s}.length`);
    if (e.setParams({ min: i, max: u }), u === void 0 && i === 0) {
      (0, yn.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (u !== void 0 && i > u) {
      (0, yn.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, yn.alwaysValidSchema)(a, r)) {
      let g = (0, We._)`${l} >= ${i}`;
      u !== void 0 && (g = (0, We._)`${g} && ${l} <= ${u}`), e.pass(g);
      return;
    }
    a.items = !0;
    const m = t.name("valid");
    u === void 0 && i === 1 ? _(m, () => t.if(m, () => t.break())) : i === 0 ? (t.let(m, !0), u !== void 0 && t.if((0, We._)`${s}.length > 0`, P)) : (t.let(m, !1), P()), e.result(m, () => e.reset());
    function P() {
      const g = t.name("_valid"), y = t.let("count", 0);
      _(g, () => t.if(g, () => E(y)));
    }
    function _(g, y) {
      t.forRange("i", 0, l, (h) => {
        e.subschema({
          keyword: "contains",
          dataProp: h,
          dataPropType: yn.Type.Num,
          compositeRule: !0
        }, g), y();
      });
    }
    function E(g) {
      t.code((0, We._)`${g}++`), u === void 0 ? t.if((0, We._)`${g} >= ${i}`, () => t.assign(m, !0).break()) : (t.if((0, We._)`${g} > ${u}`, () => t.assign(m, !1).break()), i === 1 ? t.assign(m, !0) : t.if((0, We._)`${g} >= ${i}`, () => t.assign(m, !0)));
    }
  }
};
xa.default = Cp;
var xl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = te, r = M, n = x;
  e.error = {
    message: ({ params: { property: c, depsCount: d, deps: l } }) => {
      const m = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${m} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: d, deps: l, missingProperty: m } }) => (0, t._)`{property: ${c},
    missingProperty: ${m},
    depsCount: ${d},
    deps: ${l}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [d, l] = a(c);
      i(c, d), u(c, l);
    }
  };
  function a({ schema: c }) {
    const d = {}, l = {};
    for (const m in c) {
      if (m === "__proto__")
        continue;
      const P = Array.isArray(c[m]) ? d : l;
      P[m] = c[m];
    }
    return [d, l];
  }
  function i(c, d = c.schema) {
    const { gen: l, data: m, it: P } = c;
    if (Object.keys(d).length === 0)
      return;
    const _ = l.let("missing");
    for (const E in d) {
      const g = d[E];
      if (g.length === 0)
        continue;
      const y = (0, n.propertyInData)(l, m, E, P.opts.ownProperties);
      c.setParams({
        property: E,
        depsCount: g.length,
        deps: g.join(", ")
      }), P.allErrors ? l.if(y, () => {
        for (const h of g)
          (0, n.checkReportMissingProp)(c, h);
      }) : (l.if((0, t._)`${y} && (${(0, n.checkMissingProp)(c, g, _)})`), (0, n.reportMissingProp)(c, _), l.else());
    }
  }
  e.validatePropertyDeps = i;
  function u(c, d = c.schema) {
    const { gen: l, data: m, keyword: P, it: _ } = c, E = l.name("valid");
    for (const g in d)
      (0, r.alwaysValidSchema)(_, d[g]) || (l.if(
        (0, n.propertyInData)(l, m, g, _.opts.ownProperties),
        () => {
          const y = c.subschema({ keyword: P, schemaProp: g }, E);
          c.mergeValidEvaluated(y, E);
        },
        () => l.var(E, !0)
        // TODO var
      ), c.ok(E));
  }
  e.validateSchemaDeps = u, e.default = s;
})(xl);
var eo = {};
Object.defineProperty(eo, "__esModule", { value: !0 });
const eu = te, Dp = M, Mp = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, eu._)`{propertyName: ${e.propertyName}}`
}, Lp = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: Mp,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, Dp.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, eu.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
eo.default = Lp;
var ls = {};
Object.defineProperty(ls, "__esModule", { value: !0 });
const _n = x, Qe = te, Fp = ht, gn = M, Vp = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Qe._)`{additionalProperty: ${e.additionalProperty}}`
}, Up = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Vp,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: u, opts: c } = i;
    if (i.props = !0, c.removeAdditional !== "all" && (0, gn.alwaysValidSchema)(i, r))
      return;
    const d = (0, _n.allSchemaProperties)(n.properties), l = (0, _n.allSchemaProperties)(n.patternProperties);
    m(), e.ok((0, Qe._)`${a} === ${Fp.default.errors}`);
    function m() {
      t.forIn("key", s, (y) => {
        !d.length && !l.length ? E(y) : t.if(P(y), () => E(y));
      });
    }
    function P(y) {
      let h;
      if (d.length > 8) {
        const w = (0, gn.schemaRefOrVal)(i, n.properties, "properties");
        h = (0, _n.isOwnProperty)(t, w, y);
      } else d.length ? h = (0, Qe.or)(...d.map((w) => (0, Qe._)`${y} === ${w}`)) : h = Qe.nil;
      return l.length && (h = (0, Qe.or)(h, ...l.map((w) => (0, Qe._)`${(0, _n.usePattern)(e, w)}.test(${y})`))), (0, Qe.not)(h);
    }
    function _(y) {
      t.code((0, Qe._)`delete ${s}[${y}]`);
    }
    function E(y) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        _(y);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: y }), e.error(), u || t.break();
        return;
      }
      if (typeof r == "object" && !(0, gn.alwaysValidSchema)(i, r)) {
        const h = t.name("valid");
        c.removeAdditional === "failing" ? (g(y, h, !1), t.if((0, Qe.not)(h), () => {
          e.reset(), _(y);
        })) : (g(y, h), u || t.if((0, Qe.not)(h), () => t.break()));
      }
    }
    function g(y, h, w) {
      const N = {
        keyword: "additionalProperties",
        dataProp: y,
        dataPropType: gn.Type.Str
      };
      w === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, h);
    }
  }
};
ls.default = Up;
var to = {};
Object.defineProperty(to, "__esModule", { value: !0 });
const zp = tt, Oi = x, Os = M, Ri = ls, qp = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Ri.default.code(new zp.KeywordCxt(a, Ri.default, "additionalProperties"));
    const i = (0, Oi.allSchemaProperties)(r);
    for (const m of i)
      a.definedProperties.add(m);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = Os.mergeEvaluated.props(t, (0, Os.toHash)(i), a.props));
    const u = i.filter((m) => !(0, Os.alwaysValidSchema)(a, r[m]));
    if (u.length === 0)
      return;
    const c = t.name("valid");
    for (const m of u)
      d(m) ? l(m) : (t.if((0, Oi.propertyInData)(t, s, m, a.opts.ownProperties)), l(m), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(m), e.ok(c);
    function d(m) {
      return a.opts.useDefaults && !a.compositeRule && r[m].default !== void 0;
    }
    function l(m) {
      e.subschema({
        keyword: "properties",
        schemaProp: m,
        dataProp: m
      }, c);
    }
  }
};
to.default = qp;
var ro = {};
Object.defineProperty(ro, "__esModule", { value: !0 });
const Ii = x, vn = te, Ti = M, ji = M, Kp = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, u = (0, Ii.allSchemaProperties)(r), c = u.filter((g) => (0, Ti.alwaysValidSchema)(a, r[g]));
    if (u.length === 0 || c.length === u.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, l = t.name("valid");
    a.props !== !0 && !(a.props instanceof vn.Name) && (a.props = (0, ji.evaluatedPropsToName)(t, a.props));
    const { props: m } = a;
    P();
    function P() {
      for (const g of u)
        d && _(g), a.allErrors ? E(g) : (t.var(l, !0), E(g), t.if(l));
    }
    function _(g) {
      for (const y in d)
        new RegExp(g).test(y) && (0, Ti.checkStrictMode)(a, `property ${y} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function E(g) {
      t.forIn("key", n, (y) => {
        t.if((0, vn._)`${(0, Ii.usePattern)(e, g)}.test(${y})`, () => {
          const h = c.includes(g);
          h || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: y,
            dataPropType: ji.Type.Str
          }, l), a.opts.unevaluated && m !== !0 ? t.assign((0, vn._)`${m}[${y}]`, !0) : !h && !a.allErrors && t.if((0, vn.not)(l), () => t.break());
        });
      });
    }
  }
};
ro.default = Kp;
var no = {};
Object.defineProperty(no, "__esModule", { value: !0 });
const Gp = M, Hp = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, Gp.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const s = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, s), e.failResult(s, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
no.default = Hp;
var so = {};
Object.defineProperty(so, "__esModule", { value: !0 });
const Wp = x, Jp = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: Wp.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
so.default = Jp;
var ao = {};
Object.defineProperty(ao, "__esModule", { value: !0 });
const Ln = te, Bp = M, Xp = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Ln._)`{passingSchemas: ${e.passing}}`
}, Yp = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Xp,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, i = t.let("valid", !1), u = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: u }), t.block(d), e.result(i, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((l, m) => {
        let P;
        (0, Bp.alwaysValidSchema)(s, l) ? t.var(c, !0) : P = e.subschema({
          keyword: "oneOf",
          schemaProp: m,
          compositeRule: !0
        }, c), m > 0 && t.if((0, Ln._)`${c} && ${i}`).assign(i, !1).assign(u, (0, Ln._)`[${u}, ${m}]`).else(), t.if(c, () => {
          t.assign(i, !0), t.assign(u, m), P && e.mergeEvaluated(P, Ln.Name);
        });
      });
    }
  }
};
ao.default = Yp;
var oo = {};
Object.defineProperty(oo, "__esModule", { value: !0 });
const Qp = M, Zp = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, Qp.alwaysValidSchema)(n, a))
        return;
      const u = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(u);
    });
  }
};
oo.default = Zp;
var io = {};
Object.defineProperty(io, "__esModule", { value: !0 });
const Bn = te, tu = M, xp = {
  message: ({ params: e }) => (0, Bn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Bn._)`{failingKeyword: ${e.ifClause}}`
}, e$ = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: xp,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, tu.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Ai(n, "then"), a = Ai(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), u = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(u, d("then", l), d("else", l));
    } else s ? t.if(u, d("then")) : t.if((0, Bn.not)(u), d("else"));
    e.pass(i, () => e.error(!0));
    function c() {
      const l = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, u);
      e.mergeEvaluated(l);
    }
    function d(l, m) {
      return () => {
        const P = e.subschema({ keyword: l }, u);
        t.assign(i, u), e.mergeValidEvaluated(P, i), m ? t.assign(m, (0, Bn._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function Ai(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, tu.alwaysValidSchema)(e, r);
}
io.default = e$;
var co = {};
Object.defineProperty(co, "__esModule", { value: !0 });
const t$ = M, r$ = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, t$.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
co.default = r$;
Object.defineProperty(Ya, "__esModule", { value: !0 });
const n$ = Rr, s$ = Qa, a$ = Ir, o$ = Za, i$ = xa, c$ = xl, l$ = eo, u$ = ls, d$ = to, f$ = ro, h$ = no, m$ = so, p$ = ao, $$ = oo, y$ = io, _$ = co;
function g$(e = !1) {
  const t = [
    // any
    h$.default,
    m$.default,
    p$.default,
    $$.default,
    y$.default,
    _$.default,
    // object
    l$.default,
    u$.default,
    c$.default,
    d$.default,
    f$.default
  ];
  return e ? t.push(s$.default, o$.default) : t.push(n$.default, a$.default), t.push(i$.default), t;
}
Ya.default = g$;
var lo = {}, uo = {};
Object.defineProperty(uo, "__esModule", { value: !0 });
const pe = te, v$ = {
  message: ({ schemaCode: e }) => (0, pe.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, pe._)`{format: ${e}}`
}, w$ = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: v$,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: u } = e, { opts: c, errSchemaPath: d, schemaEnv: l, self: m } = u;
    if (!c.validateFormats)
      return;
    s ? P() : _();
    function P() {
      const E = r.scopeValue("formats", {
        ref: m.formats,
        code: c.code.formats
      }), g = r.const("fDef", (0, pe._)`${E}[${i}]`), y = r.let("fType"), h = r.let("format");
      r.if((0, pe._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => r.assign(y, (0, pe._)`${g}.type || "string"`).assign(h, (0, pe._)`${g}.validate`), () => r.assign(y, (0, pe._)`"string"`).assign(h, g)), e.fail$data((0, pe.or)(w(), N()));
      function w() {
        return c.strictSchema === !1 ? pe.nil : (0, pe._)`${i} && !${h}`;
      }
      function N() {
        const R = l.$async ? (0, pe._)`(${g}.async ? await ${h}(${n}) : ${h}(${n}))` : (0, pe._)`${h}(${n})`, T = (0, pe._)`(typeof ${h} == "function" ? ${R} : ${h}.test(${n}))`;
        return (0, pe._)`${h} && ${h} !== true && ${y} === ${t} && !${T}`;
      }
    }
    function _() {
      const E = m.formats[a];
      if (!E) {
        w();
        return;
      }
      if (E === !0)
        return;
      const [g, y, h] = N(E);
      g === t && e.pass(R());
      function w() {
        if (c.strictSchema === !1) {
          m.logger.warn(T());
          return;
        }
        throw new Error(T());
        function T() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function N(T) {
        const z = T instanceof RegExp ? (0, pe.regexpCode)(T) : c.code.formats ? (0, pe._)`${c.code.formats}${(0, pe.getProperty)(a)}` : void 0, W = r.scopeValue("formats", { key: a, ref: T, code: z });
        return typeof T == "object" && !(T instanceof RegExp) ? [T.type || "string", T.validate, (0, pe._)`${W}.validate`] : ["string", T, W];
      }
      function R() {
        if (typeof E == "object" && !(E instanceof RegExp) && E.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, pe._)`await ${h}(${n})`;
        }
        return typeof y == "function" ? (0, pe._)`${h}(${n})` : (0, pe._)`${h}.test(${n})`;
      }
    }
  }
};
uo.default = w$;
Object.defineProperty(lo, "__esModule", { value: !0 });
const E$ = uo, S$ = [E$.default];
lo.default = S$;
var Sr = {};
Object.defineProperty(Sr, "__esModule", { value: !0 });
Sr.contentVocabulary = Sr.metadataVocabulary = void 0;
Sr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Sr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(Da, "__esModule", { value: !0 });
const b$ = Ma, P$ = Fa, N$ = Ya, O$ = lo, ki = Sr, R$ = [
  b$.default,
  P$.default,
  (0, N$.default)(),
  O$.default,
  ki.metadataVocabulary,
  ki.contentVocabulary
];
Da.default = R$;
var fo = {}, us = {};
Object.defineProperty(us, "__esModule", { value: !0 });
us.DiscrError = void 0;
var Ci;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Ci || (us.DiscrError = Ci = {}));
Object.defineProperty(fo, "__esModule", { value: !0 });
const fr = te, Js = us, Di = Le, I$ = Or, T$ = M, j$ = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Js.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, fr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, A$ = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: j$,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: i } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const u = n.propertyName;
    if (typeof u != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!i)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), d = t.const("tag", (0, fr._)`${r}${(0, fr.getProperty)(u)}`);
    t.if((0, fr._)`typeof ${d} == "string"`, () => l(), () => e.error(!1, { discrError: Js.DiscrError.Tag, tag: d, tagName: u })), e.ok(c);
    function l() {
      const _ = P();
      t.if(!1);
      for (const E in _)
        t.elseIf((0, fr._)`${d} === ${E}`), t.assign(c, m(_[E]));
      t.else(), e.error(!1, { discrError: Js.DiscrError.Mapping, tag: d, tagName: u }), t.endIf();
    }
    function m(_) {
      const E = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: _ }, E);
      return e.mergeEvaluated(g, fr.Name), E;
    }
    function P() {
      var _;
      const E = {}, g = h(s);
      let y = !0;
      for (let R = 0; R < i.length; R++) {
        let T = i[R];
        if (T != null && T.$ref && !(0, T$.schemaHasRulesButRef)(T, a.self.RULES)) {
          const W = T.$ref;
          if (T = Di.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, W), T instanceof Di.SchemaEnv && (T = T.schema), T === void 0)
            throw new I$.default(a.opts.uriResolver, a.baseId, W);
        }
        const z = (_ = T == null ? void 0 : T.properties) === null || _ === void 0 ? void 0 : _[u];
        if (typeof z != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${u}"`);
        y = y && (g || h(T)), w(z, R);
      }
      if (!y)
        throw new Error(`discriminator: "${u}" must be required`);
      return E;
      function h({ required: R }) {
        return Array.isArray(R) && R.includes(u);
      }
      function w(R, T) {
        if (R.const)
          N(R.const, T);
        else if (R.enum)
          for (const z of R.enum)
            N(z, T);
        else
          throw new Error(`discriminator: "properties/${u}" must have "const" or "enum"`);
      }
      function N(R, T) {
        if (typeof R != "string" || R in E)
          throw new Error(`discriminator: "${u}" values must be unique strings`);
        E[R] = T;
      }
    }
  }
};
fo.default = A$;
const k$ = "http://json-schema.org/draft-07/schema#", C$ = "http://json-schema.org/draft-07/schema#", D$ = "Core schema meta-schema", M$ = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, L$ = [
  "object",
  "boolean"
], F$ = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, V$ = {
  $schema: k$,
  $id: C$,
  title: D$,
  definitions: M$,
  type: L$,
  properties: F$,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = sl, n = Da, s = fo, a = V$, i = ["/properties"], u = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((E) => this.addVocabulary(E)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const E = this.opts.$data ? this.$dataMetaSchema(a, i) : a;
      this.addMetaSchema(E, u, !1), this.refs["http://json-schema.org/schema"] = u;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(u) ? u : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var d = tt;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return d.KeywordCxt;
  } });
  var l = te;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return l._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return l.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return l.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return l.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return l.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return l.CodeGen;
  } });
  var m = an;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return m.default;
  } });
  var P = Or;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return P.default;
  } });
})(Us, Us.exports);
var U$ = Us.exports, Bs = { exports: {} }, ru = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(V, H) {
    return { validate: V, compare: H };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(a, i),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(c, d),
    "date-time": t(m, P),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: g,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    // uri-template: https://tools.ietf.org/html/rfc6570
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    // For the source: https://gist.github.com/dperini/729294
    // For test cases: https://mathiasbynens.be/demo/url-regex
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex: ue,
    // uuid: http://tools.ietf.org/html/rfc4122
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    // JSON-pointer: https://tools.ietf.org/html/rfc6901
    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
    // byte: https://github.com/miguelmota/is-base64
    byte: h,
    // signed 32 bit integer
    int32: { type: "number", validate: R },
    // signed 64 bit integer
    int64: { type: "number", validate: T },
    // C-type float
    float: { type: "number", validate: z },
    // C-type double
    double: { type: "number", validate: z },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, i),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, d),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, P),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function r(V) {
    return V % 4 === 0 && (V % 100 !== 0 || V % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, s = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function a(V) {
    const H = n.exec(V);
    if (!H)
      return !1;
    const ne = +H[1], Q = +H[2], de = +H[3];
    return Q >= 1 && Q <= 12 && de >= 1 && de <= (Q === 2 && r(ne) ? 29 : s[Q]);
  }
  function i(V, H) {
    if (V && H)
      return V > H ? 1 : V < H ? -1 : 0;
  }
  const u = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function c(V, H) {
    const ne = u.exec(V);
    if (!ne)
      return !1;
    const Q = +ne[1], de = +ne[2], C = +ne[3], k = ne[5];
    return (Q <= 23 && de <= 59 && C <= 59 || Q === 23 && de === 59 && C === 60) && (!H || k !== "");
  }
  function d(V, H) {
    if (!(V && H))
      return;
    const ne = u.exec(V), Q = u.exec(H);
    if (ne && Q)
      return V = ne[1] + ne[2] + ne[3] + (ne[4] || ""), H = Q[1] + Q[2] + Q[3] + (Q[4] || ""), V > H ? 1 : V < H ? -1 : 0;
  }
  const l = /t|\s/i;
  function m(V) {
    const H = V.split(l);
    return H.length === 2 && a(H[0]) && c(H[1], !0);
  }
  function P(V, H) {
    if (!(V && H))
      return;
    const [ne, Q] = V.split(l), [de, C] = H.split(l), k = i(ne, de);
    if (k !== void 0)
      return k || d(Q, C);
  }
  const _ = /\/|:/, E = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function g(V) {
    return _.test(V) && E.test(V);
  }
  const y = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function h(V) {
    return y.lastIndex = 0, y.test(V);
  }
  const w = -2147483648, N = 2 ** 31 - 1;
  function R(V) {
    return Number.isInteger(V) && V <= N && V >= w;
  }
  function T(V) {
    return Number.isInteger(V);
  }
  function z() {
    return !0;
  }
  const W = /[^\\]\\Z/;
  function ue(V) {
    if (W.test(V))
      return !1;
    try {
      return new RegExp(V), !0;
    } catch {
      return !1;
    }
  }
})(ru);
var nu = {}, Xs = { exports: {} }, su = {}, rt = {}, br = {}, cn = {}, Z = {}, rn = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(w) {
      if (super(), !e.IDENTIFIER.test(w))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = w;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = r;
  class n extends t {
    constructor(w) {
      super(), this._items = typeof w == "string" ? [w] : w;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const w = this._items[0];
      return w === "" || w === '""';
    }
    get str() {
      var w;
      return (w = this._str) !== null && w !== void 0 ? w : this._str = this._items.reduce((N, R) => `${N}${R}`, "");
    }
    get names() {
      var w;
      return (w = this._names) !== null && w !== void 0 ? w : this._names = this._items.reduce((N, R) => (R instanceof r && (N[R.str] = (N[R.str] || 0) + 1), N), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(h, ...w) {
    const N = [h[0]];
    let R = 0;
    for (; R < w.length; )
      u(N, w[R]), N.push(h[++R]);
    return new n(N);
  }
  e._ = s;
  const a = new n("+");
  function i(h, ...w) {
    const N = [_(h[0])];
    let R = 0;
    for (; R < w.length; )
      N.push(a), u(N, w[R]), N.push(a, _(h[++R]));
    return c(N), new n(N);
  }
  e.str = i;
  function u(h, w) {
    w instanceof n ? h.push(...w._items) : w instanceof r ? h.push(w) : h.push(m(w));
  }
  e.addCodeArg = u;
  function c(h) {
    let w = 1;
    for (; w < h.length - 1; ) {
      if (h[w] === a) {
        const N = d(h[w - 1], h[w + 1]);
        if (N !== void 0) {
          h.splice(w - 1, 3, N);
          continue;
        }
        h[w++] = "+";
      }
      w++;
    }
  }
  function d(h, w) {
    if (w === '""')
      return h;
    if (h === '""')
      return w;
    if (typeof h == "string")
      return w instanceof r || h[h.length - 1] !== '"' ? void 0 : typeof w != "string" ? `${h.slice(0, -1)}${w}"` : w[0] === '"' ? h.slice(0, -1) + w.slice(1) : void 0;
    if (typeof w == "string" && w[0] === '"' && !(h instanceof r))
      return `"${h}${w.slice(1)}`;
  }
  function l(h, w) {
    return w.emptyStr() ? h : h.emptyStr() ? w : i`${h}${w}`;
  }
  e.strConcat = l;
  function m(h) {
    return typeof h == "number" || typeof h == "boolean" || h === null ? h : _(Array.isArray(h) ? h.join(",") : h);
  }
  function P(h) {
    return new n(_(h));
  }
  e.stringify = P;
  function _(h) {
    return JSON.stringify(h).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = _;
  function E(h) {
    return typeof h == "string" && e.IDENTIFIER.test(h) ? new n(`.${h}`) : s`[${h}]`;
  }
  e.getProperty = E;
  function g(h) {
    if (typeof h == "string" && e.IDENTIFIER.test(h))
      return new n(`${h}`);
    throw new Error(`CodeGen: invalid export name: ${h}, use explicit $id name mapping`);
  }
  e.getEsmExportName = g;
  function y(h) {
    return new n(h.toString());
  }
  e.regexpCode = y;
})(rn);
var Ys = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = rn;
  class r extends Error {
    constructor(d) {
      super(`CodeGen: "code" for ${d} not defined`), this.value = d.value;
    }
  }
  var n;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class s {
    constructor({ prefixes: d, parent: l } = {}) {
      this._names = {}, this._prefixes = d, this._parent = l;
    }
    toName(d) {
      return d instanceof t.Name ? d : this.name(d);
    }
    name(d) {
      return new t.Name(this._newName(d));
    }
    _newName(d) {
      const l = this._names[d] || this._nameGroup(d);
      return `${d}${l.index++}`;
    }
    _nameGroup(d) {
      var l, m;
      if (!((m = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || m === void 0) && m.has(d) || this._prefixes && !this._prefixes.has(d))
        throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
      return this._names[d] = { prefix: d, index: 0 };
    }
  }
  e.Scope = s;
  class a extends t.Name {
    constructor(d, l) {
      super(l), this.prefix = d;
    }
    setValue(d, { property: l, itemIndex: m }) {
      this.value = d, this.scopePath = (0, t._)`.${new t.Name(l)}[${m}]`;
    }
  }
  e.ValueScopeName = a;
  const i = (0, t._)`\n`;
  class u extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? i : t.nil };
    }
    get() {
      return this._scope;
    }
    name(d) {
      return new a(d, this._newName(d));
    }
    value(d, l) {
      var m;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const P = this.toName(d), { prefix: _ } = P, E = (m = l.key) !== null && m !== void 0 ? m : l.ref;
      let g = this._values[_];
      if (g) {
        const w = g.get(E);
        if (w)
          return w;
      } else
        g = this._values[_] = /* @__PURE__ */ new Map();
      g.set(E, P);
      const y = this._scope[_] || (this._scope[_] = []), h = y.length;
      return y[h] = l.ref, P.setValue(l, { property: _, itemIndex: h }), P;
    }
    getValue(d, l) {
      const m = this._values[d];
      if (m)
        return m.get(l);
    }
    scopeRefs(d, l = this._values) {
      return this._reduceValues(l, (m) => {
        if (m.scopePath === void 0)
          throw new Error(`CodeGen: name "${m}" has no value`);
        return (0, t._)`${d}${m.scopePath}`;
      });
    }
    scopeCode(d = this._values, l, m) {
      return this._reduceValues(d, (P) => {
        if (P.value === void 0)
          throw new Error(`CodeGen: name "${P}" has no value`);
        return P.value.code;
      }, l, m);
    }
    _reduceValues(d, l, m = {}, P) {
      let _ = t.nil;
      for (const E in d) {
        const g = d[E];
        if (!g)
          continue;
        const y = m[E] = m[E] || /* @__PURE__ */ new Map();
        g.forEach((h) => {
          if (y.has(h))
            return;
          y.set(h, n.Started);
          let w = l(h);
          if (w) {
            const N = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            _ = (0, t._)`${_}${N} ${h} = ${w};${this.opts._n}`;
          } else if (w = P == null ? void 0 : P(h))
            _ = (0, t._)`${_}${w}${this.opts._n}`;
          else
            throw new r(h);
          y.set(h, n.Completed);
        });
      }
      return _;
    }
  }
  e.ValueScope = u;
})(Ys);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = rn, r = Ys;
  var n = rn;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var s = Ys;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return s.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return s.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return s.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return s.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class a {
    optimizeNodes() {
      return this;
    }
    optimizeNames(o, f) {
      return this;
    }
  }
  class i extends a {
    constructor(o, f, b) {
      super(), this.varKind = o, this.name = f, this.rhs = b;
    }
    render({ es5: o, _n: f }) {
      const b = o ? r.varKinds.var : this.varKind, j = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${b} ${this.name}${j};` + f;
    }
    optimizeNames(o, f) {
      if (o[this.name.str])
        return this.rhs && (this.rhs = C(this.rhs, o, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class u extends a {
    constructor(o, f, b) {
      super(), this.lhs = o, this.rhs = f, this.sideEffects = b;
    }
    render({ _n: o }) {
      return `${this.lhs} = ${this.rhs};` + o;
    }
    optimizeNames(o, f) {
      if (!(this.lhs instanceof t.Name && !o[this.lhs.str] && !this.sideEffects))
        return this.rhs = C(this.rhs, o, f), this;
    }
    get names() {
      const o = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return de(o, this.rhs);
    }
  }
  class c extends u {
    constructor(o, f, b, j) {
      super(o, b, j), this.op = f;
    }
    render({ _n: o }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + o;
    }
  }
  class d extends a {
    constructor(o) {
      super(), this.label = o, this.names = {};
    }
    render({ _n: o }) {
      return `${this.label}:` + o;
    }
  }
  class l extends a {
    constructor(o) {
      super(), this.label = o, this.names = {};
    }
    render({ _n: o }) {
      return `break${this.label ? ` ${this.label}` : ""};` + o;
    }
  }
  class m extends a {
    constructor(o) {
      super(), this.error = o;
    }
    render({ _n: o }) {
      return `throw ${this.error};` + o;
    }
    get names() {
      return this.error.names;
    }
  }
  class P extends a {
    constructor(o) {
      super(), this.code = o;
    }
    render({ _n: o }) {
      return `${this.code};` + o;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(o, f) {
      return this.code = C(this.code, o, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class _ extends a {
    constructor(o = []) {
      super(), this.nodes = o;
    }
    render(o) {
      return this.nodes.reduce((f, b) => f + b.render(o), "");
    }
    optimizeNodes() {
      const { nodes: o } = this;
      let f = o.length;
      for (; f--; ) {
        const b = o[f].optimizeNodes();
        Array.isArray(b) ? o.splice(f, 1, ...b) : b ? o[f] = b : o.splice(f, 1);
      }
      return o.length > 0 ? this : void 0;
    }
    optimizeNames(o, f) {
      const { nodes: b } = this;
      let j = b.length;
      for (; j--; ) {
        const A = b[j];
        A.optimizeNames(o, f) || (k(o, A.names), b.splice(j, 1));
      }
      return b.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((o, f) => Q(o, f.names), {});
    }
  }
  class E extends _ {
    render(o) {
      return "{" + o._n + super.render(o) + "}" + o._n;
    }
  }
  class g extends _ {
  }
  class y extends E {
  }
  y.kind = "else";
  class h extends E {
    constructor(o, f) {
      super(f), this.condition = o;
    }
    render(o) {
      let f = `if(${this.condition})` + super.render(o);
      return this.else && (f += "else " + this.else.render(o)), f;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const o = this.condition;
      if (o === !0)
        return this.nodes;
      let f = this.else;
      if (f) {
        const b = f.optimizeNodes();
        f = this.else = Array.isArray(b) ? new y(b) : b;
      }
      if (f)
        return o === !1 ? f instanceof h ? f : f.nodes : this.nodes.length ? this : new h(U(o), f instanceof h ? [f] : f.nodes);
      if (!(o === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(o, f) {
      var b;
      if (this.else = (b = this.else) === null || b === void 0 ? void 0 : b.optimizeNames(o, f), !!(super.optimizeNames(o, f) || this.else))
        return this.condition = C(this.condition, o, f), this;
    }
    get names() {
      const o = super.names;
      return de(o, this.condition), this.else && Q(o, this.else.names), o;
    }
  }
  h.kind = "if";
  class w extends E {
  }
  w.kind = "for";
  class N extends w {
    constructor(o) {
      super(), this.iteration = o;
    }
    render(o) {
      return `for(${this.iteration})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iteration = C(this.iteration, o, f), this;
    }
    get names() {
      return Q(super.names, this.iteration.names);
    }
  }
  class R extends w {
    constructor(o, f, b, j) {
      super(), this.varKind = o, this.name = f, this.from = b, this.to = j;
    }
    render(o) {
      const f = o.es5 ? r.varKinds.var : this.varKind, { name: b, from: j, to: A } = this;
      return `for(${f} ${b}=${j}; ${b}<${A}; ${b}++)` + super.render(o);
    }
    get names() {
      const o = de(super.names, this.from);
      return de(o, this.to);
    }
  }
  class T extends w {
    constructor(o, f, b, j) {
      super(), this.loop = o, this.varKind = f, this.name = b, this.iterable = j;
    }
    render(o) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iterable = C(this.iterable, o, f), this;
    }
    get names() {
      return Q(super.names, this.iterable.names);
    }
  }
  class z extends E {
    constructor(o, f, b) {
      super(), this.name = o, this.args = f, this.async = b;
    }
    render(o) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(o);
    }
  }
  z.kind = "func";
  class W extends _ {
    render(o) {
      return "return " + super.render(o);
    }
  }
  W.kind = "return";
  class ue extends E {
    render(o) {
      let f = "try" + super.render(o);
      return this.catch && (f += this.catch.render(o)), this.finally && (f += this.finally.render(o)), f;
    }
    optimizeNodes() {
      var o, f;
      return super.optimizeNodes(), (o = this.catch) === null || o === void 0 || o.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(o, f) {
      var b, j;
      return super.optimizeNames(o, f), (b = this.catch) === null || b === void 0 || b.optimizeNames(o, f), (j = this.finally) === null || j === void 0 || j.optimizeNames(o, f), this;
    }
    get names() {
      const o = super.names;
      return this.catch && Q(o, this.catch.names), this.finally && Q(o, this.finally.names), o;
    }
  }
  class V extends E {
    constructor(o) {
      super(), this.error = o;
    }
    render(o) {
      return `catch(${this.error})` + super.render(o);
    }
  }
  V.kind = "catch";
  class H extends E {
    render(o) {
      return "finally" + super.render(o);
    }
  }
  H.kind = "finally";
  class ne {
    constructor(o, f = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...f, _n: f.lines ? `
` : "" }, this._extScope = o, this._scope = new r.Scope({ parent: o }), this._nodes = [new g()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(o) {
      return this._scope.name(o);
    }
    // reserves unique name in the external scope
    scopeName(o) {
      return this._extScope.name(o);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(o, f) {
      const b = this._extScope.value(o, f);
      return (this._values[b.prefix] || (this._values[b.prefix] = /* @__PURE__ */ new Set())).add(b), b;
    }
    getScopeValue(o, f) {
      return this._extScope.getValue(o, f);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(o) {
      return this._extScope.scopeRefs(o, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(o, f, b, j) {
      const A = this._scope.toName(f);
      return b !== void 0 && j && (this._constants[A.str] = b), this._leafNode(new i(o, A, b)), A;
    }
    // `const` declaration (`var` in es5 mode)
    const(o, f, b) {
      return this._def(r.varKinds.const, o, f, b);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(o, f, b) {
      return this._def(r.varKinds.let, o, f, b);
    }
    // `var` declaration with optional assignment
    var(o, f, b) {
      return this._def(r.varKinds.var, o, f, b);
    }
    // assignment code
    assign(o, f, b) {
      return this._leafNode(new u(o, f, b));
    }
    // `+=` code
    add(o, f) {
      return this._leafNode(new c(o, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(o) {
      return typeof o == "function" ? o() : o !== t.nil && this._leafNode(new P(o)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...o) {
      const f = ["{"];
      for (const [b, j] of o)
        f.length > 1 && f.push(","), f.push(b), (b !== j || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, j));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(o, f, b) {
      if (this._blockNode(new h(o)), f && b)
        this.code(f).else().code(b).endIf();
      else if (f)
        this.code(f).endIf();
      else if (b)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(o) {
      return this._elseNode(new h(o));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new y());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(h, y);
    }
    _for(o, f) {
      return this._blockNode(o), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(o, f) {
      return this._for(new N(o), f);
    }
    // `for` statement for a range of values
    forRange(o, f, b, j, A = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const q = this._scope.toName(o);
      return this._for(new R(A, q, f, b), () => j(q));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(o, f, b, j = r.varKinds.const) {
      const A = this._scope.toName(o);
      if (this.opts.es5) {
        const q = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${q}.length`, (F) => {
          this.var(A, (0, t._)`${q}[${F}]`), b(A);
        });
      }
      return this._for(new T("of", j, A, f), () => b(A));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(o, f, b, j = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(o, (0, t._)`Object.keys(${f})`, b);
      const A = this._scope.toName(o);
      return this._for(new T("in", j, A, f), () => b(A));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(w);
    }
    // `label` statement
    label(o) {
      return this._leafNode(new d(o));
    }
    // `break` statement
    break(o) {
      return this._leafNode(new l(o));
    }
    // `return` statement
    return(o) {
      const f = new W();
      if (this._blockNode(f), this.code(o), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(W);
    }
    // `try` statement
    try(o, f, b) {
      if (!f && !b)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const j = new ue();
      if (this._blockNode(j), this.code(o), f) {
        const A = this.name("e");
        this._currNode = j.catch = new V(A), f(A);
      }
      return b && (this._currNode = j.finally = new H(), this.code(b)), this._endBlockNode(V, H);
    }
    // `throw` statement
    throw(o) {
      return this._leafNode(new m(o));
    }
    // start self-balancing block
    block(o, f) {
      return this._blockStarts.push(this._nodes.length), o && this.code(o).endBlock(f), this;
    }
    // end the current self-balancing block
    endBlock(o) {
      const f = this._blockStarts.pop();
      if (f === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const b = this._nodes.length - f;
      if (b < 0 || o !== void 0 && b !== o)
        throw new Error(`CodeGen: wrong number of nodes: ${b} vs ${o} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(o, f = t.nil, b, j) {
      return this._blockNode(new z(o, f, b)), j && this.code(j).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(z);
    }
    optimize(o = 1) {
      for (; o-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(o) {
      return this._currNode.nodes.push(o), this;
    }
    _blockNode(o) {
      this._currNode.nodes.push(o), this._nodes.push(o);
    }
    _endBlockNode(o, f) {
      const b = this._currNode;
      if (b instanceof o || f && b instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${o.kind}/${f.kind}` : o.kind}"`);
    }
    _elseNode(o) {
      const f = this._currNode;
      if (!(f instanceof h))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = f.else = o, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const o = this._nodes;
      return o[o.length - 1];
    }
    set _currNode(o) {
      const f = this._nodes;
      f[f.length - 1] = o;
    }
  }
  e.CodeGen = ne;
  function Q($, o) {
    for (const f in o)
      $[f] = ($[f] || 0) + (o[f] || 0);
    return $;
  }
  function de($, o) {
    return o instanceof t._CodeOrName ? Q($, o.names) : $;
  }
  function C($, o, f) {
    if ($ instanceof t.Name)
      return b($);
    if (!j($))
      return $;
    return new t._Code($._items.reduce((A, q) => (q instanceof t.Name && (q = b(q)), q instanceof t._Code ? A.push(...q._items) : A.push(q), A), []));
    function b(A) {
      const q = f[A.str];
      return q === void 0 || o[A.str] !== 1 ? A : (delete o[A.str], q);
    }
    function j(A) {
      return A instanceof t._Code && A._items.some((q) => q instanceof t.Name && o[q.str] === 1 && f[q.str] !== void 0);
    }
  }
  function k($, o) {
    for (const f in o)
      $[f] = ($[f] || 0) - (o[f] || 0);
  }
  function U($) {
    return typeof $ == "boolean" || typeof $ == "number" || $ === null ? !$ : (0, t._)`!${S($)}`;
  }
  e.not = U;
  const D = p(e.operators.AND);
  function O(...$) {
    return $.reduce(D);
  }
  e.and = O;
  const I = p(e.operators.OR);
  function v(...$) {
    return $.reduce(I);
  }
  e.or = v;
  function p($) {
    return (o, f) => o === t.nil ? f : f === t.nil ? o : (0, t._)`${S(o)} ${$} ${S(f)}`;
  }
  function S($) {
    return $ instanceof t.Name ? $ : (0, t._)`(${$})`;
  }
})(Z);
var L = {};
Object.defineProperty(L, "__esModule", { value: !0 });
L.checkStrictMode = L.getErrorPath = L.Type = L.useFunc = L.setEvaluated = L.evaluatedPropsToName = L.mergeEvaluated = L.eachItem = L.unescapeJsonPointer = L.escapeJsonPointer = L.escapeFragment = L.unescapeFragment = L.schemaRefOrVal = L.schemaHasRulesButRef = L.schemaHasRules = L.checkUnknownRules = L.alwaysValidSchema = L.toHash = void 0;
const ce = Z, z$ = rn;
function q$(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
L.toHash = q$;
function K$(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (au(e, t), !ou(t, e.self.RULES.all));
}
L.alwaysValidSchema = K$;
function au(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || lu(e, `unknown keyword: "${a}"`);
}
L.checkUnknownRules = au;
function ou(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
L.schemaHasRules = ou;
function G$(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
L.schemaHasRulesButRef = G$;
function H$({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ce._)`${r}`;
  }
  return (0, ce._)`${e}${t}${(0, ce.getProperty)(n)}`;
}
L.schemaRefOrVal = H$;
function W$(e) {
  return iu(decodeURIComponent(e));
}
L.unescapeFragment = W$;
function J$(e) {
  return encodeURIComponent(ho(e));
}
L.escapeFragment = J$;
function ho(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
L.escapeJsonPointer = ho;
function iu(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
L.unescapeJsonPointer = iu;
function B$(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
L.eachItem = B$;
function Mi({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, i, u) => {
    const c = i === void 0 ? a : i instanceof ce.Name ? (a instanceof ce.Name ? e(s, a, i) : t(s, a, i), i) : a instanceof ce.Name ? (t(s, i, a), a) : r(a, i);
    return u === ce.Name && !(c instanceof ce.Name) ? n(s, c) : c;
  };
}
L.mergeEvaluated = {
  props: Mi({
    mergeNames: (e, t, r) => e.if((0, ce._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, ce._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, ce._)`${r} || {}`).code((0, ce._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, ce._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, ce._)`${r} || {}`), mo(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: cu
  }),
  items: Mi({
    mergeNames: (e, t, r) => e.if((0, ce._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ce._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ce._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ce._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function cu(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ce._)`{}`);
  return t !== void 0 && mo(e, r, t), r;
}
L.evaluatedPropsToName = cu;
function mo(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ce._)`${t}${(0, ce.getProperty)(n)}`, !0));
}
L.setEvaluated = mo;
const Li = {};
function X$(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Li[t.code] || (Li[t.code] = new z$._Code(t.code))
  });
}
L.useFunc = X$;
var Qs;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Qs || (L.Type = Qs = {}));
function Y$(e, t, r) {
  if (e instanceof ce.Name) {
    const n = t === Qs.Num;
    return r ? n ? (0, ce._)`"[" + ${e} + "]"` : (0, ce._)`"['" + ${e} + "']"` : n ? (0, ce._)`"/" + ${e}` : (0, ce._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ce.getProperty)(e).toString() : "/" + ho(e);
}
L.getErrorPath = Y$;
function lu(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
L.checkStrictMode = lu;
var mt = {};
Object.defineProperty(mt, "__esModule", { value: !0 });
const Re = Z, Q$ = {
  // validation function arguments
  data: new Re.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Re.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Re.Name("instancePath"),
  parentData: new Re.Name("parentData"),
  parentDataProperty: new Re.Name("parentDataProperty"),
  rootData: new Re.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Re.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Re.Name("vErrors"),
  // null or array of validation errors
  errors: new Re.Name("errors"),
  // counter of validation errors
  this: new Re.Name("this"),
  // "globals"
  self: new Re.Name("self"),
  scope: new Re.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Re.Name("json"),
  jsonPos: new Re.Name("jsonPos"),
  jsonLen: new Re.Name("jsonLen"),
  jsonPart: new Re.Name("jsonPart")
};
mt.default = Q$;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = Z, r = L, n = mt;
  e.keywordError = {
    message: ({ keyword: y }) => (0, t.str)`must pass "${y}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: y, schemaType: h }) => h ? (0, t.str)`"${y}" keyword must be ${h} ($data)` : (0, t.str)`"${y}" keyword is invalid ($data)`
  };
  function s(y, h = e.keywordError, w, N) {
    const { it: R } = y, { gen: T, compositeRule: z, allErrors: W } = R, ue = m(y, h, w);
    N ?? (z || W) ? c(T, ue) : d(R, (0, t._)`[${ue}]`);
  }
  e.reportError = s;
  function a(y, h = e.keywordError, w) {
    const { it: N } = y, { gen: R, compositeRule: T, allErrors: z } = N, W = m(y, h, w);
    c(R, W), T || z || d(N, n.default.vErrors);
  }
  e.reportExtraError = a;
  function i(y, h) {
    y.assign(n.default.errors, h), y.if((0, t._)`${n.default.vErrors} !== null`, () => y.if(h, () => y.assign((0, t._)`${n.default.vErrors}.length`, h), () => y.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function u({ gen: y, keyword: h, schemaValue: w, data: N, errsCount: R, it: T }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const z = y.name("err");
    y.forRange("i", R, n.default.errors, (W) => {
      y.const(z, (0, t._)`${n.default.vErrors}[${W}]`), y.if((0, t._)`${z}.instancePath === undefined`, () => y.assign((0, t._)`${z}.instancePath`, (0, t.strConcat)(n.default.instancePath, T.errorPath))), y.assign((0, t._)`${z}.schemaPath`, (0, t.str)`${T.errSchemaPath}/${h}`), T.opts.verbose && (y.assign((0, t._)`${z}.schema`, w), y.assign((0, t._)`${z}.data`, N));
    });
  }
  e.extendErrors = u;
  function c(y, h) {
    const w = y.const("err", h);
    y.if((0, t._)`${n.default.vErrors} === null`, () => y.assign(n.default.vErrors, (0, t._)`[${w}]`), (0, t._)`${n.default.vErrors}.push(${w})`), y.code((0, t._)`${n.default.errors}++`);
  }
  function d(y, h) {
    const { gen: w, validateName: N, schemaEnv: R } = y;
    R.$async ? w.throw((0, t._)`new ${y.ValidationError}(${h})`) : (w.assign((0, t._)`${N}.errors`, h), w.return(!1));
  }
  const l = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function m(y, h, w) {
    const { createErrors: N } = y.it;
    return N === !1 ? (0, t._)`{}` : P(y, h, w);
  }
  function P(y, h, w = {}) {
    const { gen: N, it: R } = y, T = [
      _(R, w),
      E(y, w)
    ];
    return g(y, h, T), N.object(...T);
  }
  function _({ errorPath: y }, { instancePath: h }) {
    const w = h ? (0, t.str)`${y}${(0, r.getErrorPath)(h, r.Type.Str)}` : y;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, w)];
  }
  function E({ keyword: y, it: { errSchemaPath: h } }, { schemaPath: w, parentSchema: N }) {
    let R = N ? h : (0, t.str)`${h}/${y}`;
    return w && (R = (0, t.str)`${R}${(0, r.getErrorPath)(w, r.Type.Str)}`), [l.schemaPath, R];
  }
  function g(y, { params: h, message: w }, N) {
    const { keyword: R, data: T, schemaValue: z, it: W } = y, { opts: ue, propertyName: V, topSchemaRef: H, schemaPath: ne } = W;
    N.push([l.keyword, R], [l.params, typeof h == "function" ? h(y) : h || (0, t._)`{}`]), ue.messages && N.push([l.message, typeof w == "function" ? w(y) : w]), ue.verbose && N.push([l.schema, z], [l.parentSchema, (0, t._)`${H}${ne}`], [n.default.data, T]), V && N.push([l.propertyName, V]);
  }
})(cn);
Object.defineProperty(br, "__esModule", { value: !0 });
br.boolOrEmptySchema = br.topBoolOrEmptySchema = void 0;
const Z$ = cn, x$ = Z, ey = mt, ty = {
  message: "boolean schema is false"
};
function ry(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? uu(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(ey.default.data) : (t.assign((0, x$._)`${n}.errors`, null), t.return(!0));
}
br.topBoolOrEmptySchema = ry;
function ny(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), uu(e)) : r.var(t, !0);
}
br.boolOrEmptySchema = ny;
function uu(e, t) {
  const { gen: r, data: n } = e, s = {
    gen: r,
    keyword: "false schema",
    data: n,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, Z$.reportError)(s, ty, void 0, t);
}
var ve = {}, rr = {};
Object.defineProperty(rr, "__esModule", { value: !0 });
rr.getRules = rr.isJSONType = void 0;
const sy = ["string", "number", "integer", "boolean", "null", "object", "array"], ay = new Set(sy);
function oy(e) {
  return typeof e == "string" && ay.has(e);
}
rr.isJSONType = oy;
function iy() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
rr.getRules = iy;
var yt = {};
Object.defineProperty(yt, "__esModule", { value: !0 });
yt.shouldUseRule = yt.shouldUseGroup = yt.schemaHasRulesForType = void 0;
function cy({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && du(e, n);
}
yt.schemaHasRulesForType = cy;
function du(e, t) {
  return t.rules.some((r) => fu(e, r));
}
yt.shouldUseGroup = du;
function fu(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
yt.shouldUseRule = fu;
Object.defineProperty(ve, "__esModule", { value: !0 });
ve.reportTypeError = ve.checkDataTypes = ve.checkDataType = ve.coerceAndCheckDataType = ve.getJSONTypes = ve.getSchemaTypes = ve.DataType = void 0;
const ly = rr, uy = yt, dy = cn, Y = Z, hu = L;
var _r;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(_r || (ve.DataType = _r = {}));
function fy(e) {
  const t = mu(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
ve.getSchemaTypes = fy;
function mu(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(ly.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
ve.getJSONTypes = mu;
function hy(e, t) {
  const { gen: r, data: n, opts: s } = e, a = my(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, uy.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const u = po(t, n, s.strictNumbers, _r.Wrong);
    r.if(u, () => {
      a.length ? py(e, t, a) : $o(e);
    });
  }
  return i;
}
ve.coerceAndCheckDataType = hy;
const pu = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function my(e, t) {
  return t ? e.filter((r) => pu.has(r) || t === "array" && r === "array") : [];
}
function py(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, Y._)`typeof ${s}`), u = n.let("coerced", (0, Y._)`undefined`);
  a.coerceTypes === "array" && n.if((0, Y._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, Y._)`${s}[0]`).assign(i, (0, Y._)`typeof ${s}`).if(po(t, s, a.strictNumbers), () => n.assign(u, s))), n.if((0, Y._)`${u} !== undefined`);
  for (const d of r)
    (pu.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), $o(e), n.endIf(), n.if((0, Y._)`${u} !== undefined`, () => {
    n.assign(s, u), $y(e, u);
  });
  function c(d) {
    switch (d) {
      case "string":
        n.elseIf((0, Y._)`${i} == "number" || ${i} == "boolean"`).assign(u, (0, Y._)`"" + ${s}`).elseIf((0, Y._)`${s} === null`).assign(u, (0, Y._)`""`);
        return;
      case "number":
        n.elseIf((0, Y._)`${i} == "boolean" || ${s} === null
              || (${i} == "string" && ${s} && ${s} == +${s})`).assign(u, (0, Y._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, Y._)`${i} === "boolean" || ${s} === null
              || (${i} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(u, (0, Y._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, Y._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(u, !1).elseIf((0, Y._)`${s} === "true" || ${s} === 1`).assign(u, !0);
        return;
      case "null":
        n.elseIf((0, Y._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(u, null);
        return;
      case "array":
        n.elseIf((0, Y._)`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${s} === null`).assign(u, (0, Y._)`[${s}]`);
    }
  }
}
function $y({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, Y._)`${t} !== undefined`, () => e.assign((0, Y._)`${t}[${r}]`, n));
}
function Zs(e, t, r, n = _r.Correct) {
  const s = n === _r.Correct ? Y.operators.EQ : Y.operators.NEQ;
  let a;
  switch (e) {
    case "null":
      return (0, Y._)`${t} ${s} null`;
    case "array":
      a = (0, Y._)`Array.isArray(${t})`;
      break;
    case "object":
      a = (0, Y._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      a = i((0, Y._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = i();
      break;
    default:
      return (0, Y._)`typeof ${t} ${s} ${e}`;
  }
  return n === _r.Correct ? a : (0, Y.not)(a);
  function i(u = Y.nil) {
    return (0, Y.and)((0, Y._)`typeof ${t} == "number"`, u, r ? (0, Y._)`isFinite(${t})` : Y.nil);
  }
}
ve.checkDataType = Zs;
function po(e, t, r, n) {
  if (e.length === 1)
    return Zs(e[0], t, r, n);
  let s;
  const a = (0, hu.toHash)(e);
  if (a.array && a.object) {
    const i = (0, Y._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, Y._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = Y.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, Y.and)(s, Zs(i, t, r, n));
  return s;
}
ve.checkDataTypes = po;
const yy = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, Y._)`{type: ${e}}` : (0, Y._)`{type: ${t}}`
};
function $o(e) {
  const t = _y(e);
  (0, dy.reportError)(t, yy);
}
ve.reportTypeError = $o;
function _y(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, hu.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: s,
    schemaValue: s,
    parentSchema: n,
    params: {},
    it: e
  };
}
var ds = {};
Object.defineProperty(ds, "__esModule", { value: !0 });
ds.assignDefaults = void 0;
const lr = Z, gy = L;
function vy(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      Fi(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => Fi(e, a, s.default));
}
ds.assignDefaults = vy;
function Fi(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: i } = e;
  if (r === void 0)
    return;
  const u = (0, lr._)`${a}${(0, lr.getProperty)(t)}`;
  if (s) {
    (0, gy.checkStrictMode)(e, `default is ignored for: ${u}`);
    return;
  }
  let c = (0, lr._)`${u} === undefined`;
  i.useDefaults === "empty" && (c = (0, lr._)`${c} || ${u} === null || ${u} === ""`), n.if(c, (0, lr._)`${u} = ${(0, lr.stringify)(r)}`);
}
var dt = {}, ee = {};
Object.defineProperty(ee, "__esModule", { value: !0 });
ee.validateUnion = ee.validateArray = ee.usePattern = ee.callValidateCode = ee.schemaProperties = ee.allSchemaProperties = ee.noPropertyInData = ee.propertyInData = ee.isOwnProperty = ee.hasPropFunc = ee.reportMissingProp = ee.checkMissingProp = ee.checkReportMissingProp = void 0;
const he = Z, yo = L, Et = mt, wy = L;
function Ey(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(go(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, he._)`${t}` }, !0), e.error();
  });
}
ee.checkReportMissingProp = Ey;
function Sy({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, he.or)(...n.map((a) => (0, he.and)(go(e, t, a, r.ownProperties), (0, he._)`${s} = ${a}`)));
}
ee.checkMissingProp = Sy;
function by(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ee.reportMissingProp = by;
function $u(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, he._)`Object.prototype.hasOwnProperty`
  });
}
ee.hasPropFunc = $u;
function _o(e, t, r) {
  return (0, he._)`${$u(e)}.call(${t}, ${r})`;
}
ee.isOwnProperty = _o;
function Py(e, t, r, n) {
  const s = (0, he._)`${t}${(0, he.getProperty)(r)} !== undefined`;
  return n ? (0, he._)`${s} && ${_o(e, t, r)}` : s;
}
ee.propertyInData = Py;
function go(e, t, r, n) {
  const s = (0, he._)`${t}${(0, he.getProperty)(r)} === undefined`;
  return n ? (0, he.or)(s, (0, he.not)(_o(e, t, r))) : s;
}
ee.noPropertyInData = go;
function yu(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ee.allSchemaProperties = yu;
function Ny(e, t) {
  return yu(t).filter((r) => !(0, yo.alwaysValidSchema)(e, t[r]));
}
ee.schemaProperties = Ny;
function Oy({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: i }, u, c, d) {
  const l = d ? (0, he._)`${e}, ${t}, ${n}${s}` : t, m = [
    [Et.default.instancePath, (0, he.strConcat)(Et.default.instancePath, a)],
    [Et.default.parentData, i.parentData],
    [Et.default.parentDataProperty, i.parentDataProperty],
    [Et.default.rootData, Et.default.rootData]
  ];
  i.opts.dynamicRef && m.push([Et.default.dynamicAnchors, Et.default.dynamicAnchors]);
  const P = (0, he._)`${l}, ${r.object(...m)}`;
  return c !== he.nil ? (0, he._)`${u}.call(${c}, ${P})` : (0, he._)`${u}(${P})`;
}
ee.callValidateCode = Oy;
const Ry = (0, he._)`new RegExp`;
function Iy({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, he._)`${s.code === "new RegExp" ? Ry : (0, wy.useFunc)(e, s)}(${r}, ${n})`
  });
}
ee.usePattern = Iy;
function Ty(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const u = t.let("valid", !0);
    return i(() => t.assign(u, !1)), u;
  }
  return t.var(a, !0), i(() => t.break()), a;
  function i(u) {
    const c = t.const("len", (0, he._)`${r}.length`);
    t.forRange("i", 0, c, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: yo.Type.Num
      }, a), t.if((0, he.not)(a), u);
    });
  }
}
ee.validateArray = Ty;
function jy(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, yo.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const i = t.let("valid", !1), u = t.name("_valid");
  t.block(() => r.forEach((c, d) => {
    const l = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, u);
    t.assign(i, (0, he._)`${i} || ${u}`), e.mergeValidEvaluated(l, u) || t.if((0, he.not)(i));
  })), e.result(i, () => e.reset(), () => e.error(!0));
}
ee.validateUnion = jy;
Object.defineProperty(dt, "__esModule", { value: !0 });
dt.validateKeywordUsage = dt.validSchemaType = dt.funcKeywordCode = dt.macroKeywordCode = void 0;
const Ae = Z, Qt = mt, Ay = ee, ky = cn;
function Cy(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: i } = e, u = t.macro.call(i.self, s, a, i), c = _u(r, n, u);
  i.opts.validateSchema !== !1 && i.self.validateSchema(u, !0);
  const d = r.name("valid");
  e.subschema({
    schema: u,
    schemaPath: Ae.nil,
    errSchemaPath: `${i.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, d), e.pass(d, () => e.error(!0));
}
dt.macroKeywordCode = Cy;
function Dy(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: i, $data: u, it: c } = e;
  Ly(c, t);
  const d = !u && t.compile ? t.compile.call(c.self, a, i, c) : t.validate, l = _u(n, s, d), m = n.let("valid");
  e.block$data(m, P), e.ok((r = t.valid) !== null && r !== void 0 ? r : m);
  function P() {
    if (t.errors === !1)
      g(), t.modifying && Vi(e), y(() => e.error());
    else {
      const h = t.async ? _() : E();
      t.modifying && Vi(e), y(() => My(e, h));
    }
  }
  function _() {
    const h = n.let("ruleErrs", null);
    return n.try(() => g((0, Ae._)`await `), (w) => n.assign(m, !1).if((0, Ae._)`${w} instanceof ${c.ValidationError}`, () => n.assign(h, (0, Ae._)`${w}.errors`), () => n.throw(w))), h;
  }
  function E() {
    const h = (0, Ae._)`${l}.errors`;
    return n.assign(h, null), g(Ae.nil), h;
  }
  function g(h = t.async ? (0, Ae._)`await ` : Ae.nil) {
    const w = c.opts.passContext ? Qt.default.this : Qt.default.self, N = !("compile" in t && !u || t.schema === !1);
    n.assign(m, (0, Ae._)`${h}${(0, Ay.callValidateCode)(e, l, w, N)}`, t.modifying);
  }
  function y(h) {
    var w;
    n.if((0, Ae.not)((w = t.valid) !== null && w !== void 0 ? w : m), h);
  }
}
dt.funcKeywordCode = Dy;
function Vi(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Ae._)`${n.parentData}[${n.parentDataProperty}]`));
}
function My(e, t) {
  const { gen: r } = e;
  r.if((0, Ae._)`Array.isArray(${t})`, () => {
    r.assign(Qt.default.vErrors, (0, Ae._)`${Qt.default.vErrors} === null ? ${t} : ${Qt.default.vErrors}.concat(${t})`).assign(Qt.default.errors, (0, Ae._)`${Qt.default.vErrors}.length`), (0, ky.extendErrors)(e);
  }, () => e.error());
}
function Ly({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function _u(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Ae.stringify)(r) });
}
function Fy(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
dt.validSchemaType = Fy;
function Vy({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(a) : s.keyword !== a)
    throw new Error("ajv implementation error");
  const i = s.dependencies;
  if (i != null && i.some((u) => !Object.prototype.hasOwnProperty.call(e, u)))
    throw new Error(`parent schema must have dependencies of ${a}: ${i.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[a])) {
    const c = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
dt.validateKeywordUsage = Vy;
var Tt = {};
Object.defineProperty(Tt, "__esModule", { value: !0 });
Tt.extendSubschemaMode = Tt.extendSubschemaData = Tt.getSubschema = void 0;
const it = Z, gu = L;
function Uy(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: i }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const u = e.schema[t];
    return r === void 0 ? {
      schema: u,
      schemaPath: (0, it._)`${e.schemaPath}${(0, it.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: u[r],
      schemaPath: (0, it._)`${e.schemaPath}${(0, it.getProperty)(t)}${(0, it.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, gu.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (s === void 0 || a === void 0 || i === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: s,
      topSchemaRef: i,
      errSchemaPath: a
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
Tt.getSubschema = Uy;
function zy(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: i }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: u } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: l, opts: m } = t, P = u.let("data", (0, it._)`${t.data}${(0, it.getProperty)(r)}`, !0);
    c(P), e.errorPath = (0, it.str)`${d}${(0, gu.getErrorPath)(r, n, m.jsPropertySyntax)}`, e.parentDataProperty = (0, it._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (s !== void 0) {
    const d = s instanceof it.Name ? s : u.let("data", s, !0);
    c(d), i !== void 0 && (e.propertyName = i);
  }
  a && (e.dataTypes = a);
  function c(d) {
    e.data = d, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, d];
  }
}
Tt.extendSubschemaData = zy;
function qy(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Tt.extendSubschemaMode = qy;
var Ne = {}, vu = { exports: {} }, Rt = vu.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  Fn(t, n, s, e, "", e);
};
Rt.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
Rt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Rt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Rt.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function Fn(e, t, r, n, s, a, i, u, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, i, u, c, d);
    for (var l in n) {
      var m = n[l];
      if (Array.isArray(m)) {
        if (l in Rt.arrayKeywords)
          for (var P = 0; P < m.length; P++)
            Fn(e, t, r, m[P], s + "/" + l + "/" + P, a, s, l, n, P);
      } else if (l in Rt.propsKeywords) {
        if (m && typeof m == "object")
          for (var _ in m)
            Fn(e, t, r, m[_], s + "/" + l + "/" + Ky(_), a, s, l, n, _);
      } else (l in Rt.keywords || e.allKeys && !(l in Rt.skipKeywords)) && Fn(e, t, r, m, s + "/" + l, a, s, l, n);
    }
    r(n, s, a, i, u, c, d);
  }
}
function Ky(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var Gy = vu.exports;
Object.defineProperty(Ne, "__esModule", { value: !0 });
Ne.getSchemaRefs = Ne.resolveUrl = Ne.normalizeId = Ne._getFullPath = Ne.getFullPath = Ne.inlineRef = void 0;
const Hy = L, Wy = as, Jy = Gy, By = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function Xy(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !xs(e) : t ? wu(e) <= t : !1;
}
Ne.inlineRef = Xy;
const Yy = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function xs(e) {
  for (const t in e) {
    if (Yy.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(xs) || typeof r == "object" && xs(r))
      return !0;
  }
  return !1;
}
function wu(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !By.has(r) && (typeof e[r] == "object" && (0, Hy.eachItem)(e[r], (n) => t += wu(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function Eu(e, t = "", r) {
  r !== !1 && (t = gr(t));
  const n = e.parse(t);
  return Su(e, n);
}
Ne.getFullPath = Eu;
function Su(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Ne._getFullPath = Su;
const Qy = /#\/?$/;
function gr(e) {
  return e ? e.replace(Qy, "") : "";
}
Ne.normalizeId = gr;
function Zy(e, t, r) {
  return r = gr(r), e.resolve(t, r);
}
Ne.resolveUrl = Zy;
const xy = /^[a-z_][-a-z0-9._]*$/i;
function e_(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = gr(e[r] || t), a = { "": s }, i = Eu(n, s, !1), u = {}, c = /* @__PURE__ */ new Set();
  return Jy(e, { allKeys: !0 }, (m, P, _, E) => {
    if (E === void 0)
      return;
    const g = i + P;
    let y = a[E];
    typeof m[r] == "string" && (y = h.call(this, m[r])), w.call(this, m.$anchor), w.call(this, m.$dynamicAnchor), a[P] = y;
    function h(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = gr(y ? R(y, N) : N), c.has(N))
        throw l(N);
      c.add(N);
      let T = this.refs[N];
      return typeof T == "string" && (T = this.refs[T]), typeof T == "object" ? d(m, T.schema, N) : N !== gr(g) && (N[0] === "#" ? (d(m, u[N], N), u[N] = m) : this.refs[N] = g), N;
    }
    function w(N) {
      if (typeof N == "string") {
        if (!xy.test(N))
          throw new Error(`invalid anchor "${N}"`);
        h.call(this, `#${N}`);
      }
    }
  }), u;
  function d(m, P, _) {
    if (P !== void 0 && !Wy(m, P))
      throw l(_);
  }
  function l(m) {
    return new Error(`reference "${m}" resolves to more than one schema`);
  }
}
Ne.getSchemaRefs = e_;
Object.defineProperty(rt, "__esModule", { value: !0 });
rt.getData = rt.KeywordCxt = rt.validateFunctionCode = void 0;
const bu = br, Ui = ve, vo = yt, Xn = ve, t_ = ds, Yr = dt, Rs = Tt, G = Z, B = mt, r_ = Ne, _t = L, Fr = cn;
function n_(e) {
  if (Ou(e) && (Ru(e), Nu(e))) {
    o_(e);
    return;
  }
  Pu(e, () => (0, bu.topBoolOrEmptySchema)(e));
}
rt.validateFunctionCode = n_;
function Pu({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, G._)`${B.default.data}, ${B.default.valCxt}`, n.$async, () => {
    e.code((0, G._)`"use strict"; ${zi(r, s)}`), a_(e, s), e.code(a);
  }) : e.func(t, (0, G._)`${B.default.data}, ${s_(s)}`, n.$async, () => e.code(zi(r, s)).code(a));
}
function s_(e) {
  return (0, G._)`{${B.default.instancePath}="", ${B.default.parentData}, ${B.default.parentDataProperty}, ${B.default.rootData}=${B.default.data}${e.dynamicRef ? (0, G._)`, ${B.default.dynamicAnchors}={}` : G.nil}}={}`;
}
function a_(e, t) {
  e.if(B.default.valCxt, () => {
    e.var(B.default.instancePath, (0, G._)`${B.default.valCxt}.${B.default.instancePath}`), e.var(B.default.parentData, (0, G._)`${B.default.valCxt}.${B.default.parentData}`), e.var(B.default.parentDataProperty, (0, G._)`${B.default.valCxt}.${B.default.parentDataProperty}`), e.var(B.default.rootData, (0, G._)`${B.default.valCxt}.${B.default.rootData}`), t.dynamicRef && e.var(B.default.dynamicAnchors, (0, G._)`${B.default.valCxt}.${B.default.dynamicAnchors}`);
  }, () => {
    e.var(B.default.instancePath, (0, G._)`""`), e.var(B.default.parentData, (0, G._)`undefined`), e.var(B.default.parentDataProperty, (0, G._)`undefined`), e.var(B.default.rootData, B.default.data), t.dynamicRef && e.var(B.default.dynamicAnchors, (0, G._)`{}`);
  });
}
function o_(e) {
  const { schema: t, opts: r, gen: n } = e;
  Pu(e, () => {
    r.$comment && t.$comment && Tu(e), d_(e), n.let(B.default.vErrors, null), n.let(B.default.errors, 0), r.unevaluated && i_(e), Iu(e), m_(e);
  });
}
function i_(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, G._)`${r}.evaluated`), t.if((0, G._)`${e.evaluated}.dynamicProps`, () => t.assign((0, G._)`${e.evaluated}.props`, (0, G._)`undefined`)), t.if((0, G._)`${e.evaluated}.dynamicItems`, () => t.assign((0, G._)`${e.evaluated}.items`, (0, G._)`undefined`));
}
function zi(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, G._)`/*# sourceURL=${r} */` : G.nil;
}
function c_(e, t) {
  if (Ou(e) && (Ru(e), Nu(e))) {
    l_(e, t);
    return;
  }
  (0, bu.boolOrEmptySchema)(e, t);
}
function Nu({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function Ou(e) {
  return typeof e.schema != "boolean";
}
function l_(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && Tu(e), f_(e), h_(e);
  const a = n.const("_errs", B.default.errors);
  Iu(e, a), n.var(t, (0, G._)`${a} === ${B.default.errors}`);
}
function Ru(e) {
  (0, _t.checkUnknownRules)(e), u_(e);
}
function Iu(e, t) {
  if (e.opts.jtd)
    return qi(e, [], !1, t);
  const r = (0, Ui.getSchemaTypes)(e.schema), n = (0, Ui.coerceAndCheckDataType)(e, r);
  qi(e, r, !n, t);
}
function u_(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, _t.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function d_(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, _t.checkStrictMode)(e, "default is ignored in the schema root");
}
function f_(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, r_.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function h_(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function Tu({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, G._)`${B.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const i = (0, G.str)`${n}/$comment`, u = e.scopeValue("root", { ref: t.root });
    e.code((0, G._)`${B.default.self}.opts.$comment(${a}, ${i}, ${u}.schema)`);
  }
}
function m_(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, G._)`${B.default.errors} === 0`, () => t.return(B.default.data), () => t.throw((0, G._)`new ${s}(${B.default.vErrors})`)) : (t.assign((0, G._)`${n}.errors`, B.default.vErrors), a.unevaluated && p_(e), t.return((0, G._)`${B.default.errors} === 0`));
}
function p_({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof G.Name && e.assign((0, G._)`${t}.props`, r), n instanceof G.Name && e.assign((0, G._)`${t}.items`, n);
}
function qi(e, t, r, n) {
  const { gen: s, schema: a, data: i, allErrors: u, opts: c, self: d } = e, { RULES: l } = d;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, _t.schemaHasRulesButRef)(a, l))) {
    s.block(() => ku(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || $_(e, t), s.block(() => {
    for (const P of l.rules)
      m(P);
    m(l.post);
  });
  function m(P) {
    (0, vo.shouldUseGroup)(a, P) && (P.type ? (s.if((0, Xn.checkDataType)(P.type, i, c.strictNumbers)), Ki(e, P), t.length === 1 && t[0] === P.type && r && (s.else(), (0, Xn.reportTypeError)(e)), s.endIf()) : Ki(e, P), u || s.if((0, G._)`${B.default.errors} === ${n || 0}`));
  }
}
function Ki(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, t_.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, vo.shouldUseRule)(n, a) && ku(e, a.keyword, a.definition, t.type);
  });
}
function $_(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (y_(e, t), e.opts.allowUnionTypes || __(e, t), g_(e, e.dataTypes));
}
function y_(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      ju(e.dataTypes, r) || wo(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), w_(e, t);
  }
}
function __(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && wo(e, "use allowUnionTypes to allow union type keyword");
}
function g_(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, vo.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((i) => v_(t, i)) && wo(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function v_(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function ju(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function w_(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    ju(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function wo(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, _t.checkStrictMode)(e, t, e.opts.strictTypes);
}
class Au {
  constructor(t, r, n) {
    if ((0, Yr.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, _t.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", Cu(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Yr.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", B.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, G.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, G.not)(t), void 0, r);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: r } = this;
    this.fail((0, G._)`${r} !== undefined && (${(0, G.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? Fr.reportExtraError : Fr.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Fr.reportError)(this, this.def.$dataError || Fr.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Fr.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = G.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = G.nil, r = G.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: s, schemaType: a, def: i } = this;
    n.if((0, G.or)((0, G._)`${s} === undefined`, r)), t !== G.nil && n.assign(t, !0), (a.length || i.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== G.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: a } = this;
    return (0, G.or)(i(), u());
    function i() {
      if (n.length) {
        if (!(r instanceof G.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, G._)`${(0, Xn.checkDataTypes)(c, r, a.opts.strictNumbers, Xn.DataType.Wrong)}`;
      }
      return G.nil;
    }
    function u() {
      if (s.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, G._)`!${c}(${r})`;
      }
      return G.nil;
    }
  }
  subschema(t, r) {
    const n = (0, Rs.getSubschema)(this.it, t);
    (0, Rs.extendSubschemaData)(n, this.it, t), (0, Rs.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return c_(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = _t.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = _t.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, G.Name)), !0;
  }
}
rt.KeywordCxt = Au;
function ku(e, t, r, n) {
  const s = new Au(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Yr.funcKeywordCode)(s, r) : "macro" in r ? (0, Yr.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Yr.funcKeywordCode)(s, r);
}
const E_ = /^\/(?:[^~]|~0|~1)*$/, S_ = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function Cu(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return B.default.rootData;
  if (e[0] === "/") {
    if (!E_.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = B.default.rootData;
  } else {
    const d = S_.exec(e);
    if (!d)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const l = +d[1];
    if (s = d[2], s === "#") {
      if (l >= t)
        throw new Error(c("property/index", l));
      return n[t - l];
    }
    if (l > t)
      throw new Error(c("data", l));
    if (a = r[t - l], !s)
      return a;
  }
  let i = a;
  const u = s.split("/");
  for (const d of u)
    d && (a = (0, G._)`${a}${(0, G.getProperty)((0, _t.unescapeJsonPointer)(d))}`, i = (0, G._)`${i} && ${a}`);
  return i;
  function c(d, l) {
    return `Cannot access ${d} ${l} levels up, current level is ${t}`;
  }
}
rt.getData = Cu;
var ln = {};
Object.defineProperty(ln, "__esModule", { value: !0 });
class b_ extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
ln.default = b_;
var Tr = {};
Object.defineProperty(Tr, "__esModule", { value: !0 });
const Is = Ne;
class P_ extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, Is.resolveUrl)(t, r, n), this.missingSchema = (0, Is.normalizeId)((0, Is.getFullPath)(t, this.missingRef));
  }
}
Tr.default = P_;
var Fe = {};
Object.defineProperty(Fe, "__esModule", { value: !0 });
Fe.resolveSchema = Fe.getCompilingSchema = Fe.resolveRef = Fe.compileSchema = Fe.SchemaEnv = void 0;
const Ye = Z, N_ = ln, Jt = mt, et = Ne, Gi = L, O_ = rt;
class fs {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, et.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Fe.SchemaEnv = fs;
function Eo(e) {
  const t = Du.call(this, e);
  if (t)
    return t;
  const r = (0, et.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new Ye.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let u;
  e.$async && (u = i.scopeValue("Error", {
    ref: N_.default,
    code: (0, Ye._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = i.scopeName("validate");
  e.validateName = c;
  const d = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: Jt.default.data,
    parentData: Jt.default.parentData,
    parentDataProperty: Jt.default.parentDataProperty,
    dataNames: [Jt.default.data],
    dataPathArr: [Ye.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Ye.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: u,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Ye.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Ye._)`""`,
    opts: this.opts,
    self: this
  };
  let l;
  try {
    this._compilations.add(e), (0, O_.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const m = i.toString();
    l = `${i.scopeRefs(Jt.default.scope)}return ${m}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const _ = new Function(`${Jt.default.self}`, `${Jt.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: _ }), _.errors = null, _.schema = e.schema, _.schemaEnv = e, e.$async && (_.$async = !0), this.opts.code.source === !0 && (_.source = { validateName: c, validateCode: m, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: E, items: g } = d;
      _.evaluated = {
        props: E instanceof Ye.Name ? void 0 : E,
        items: g instanceof Ye.Name ? void 0 : g,
        dynamicProps: E instanceof Ye.Name,
        dynamicItems: g instanceof Ye.Name
      }, _.source && (_.source.evaluated = (0, Ye.stringify)(_.evaluated));
    }
    return e.validate = _, e;
  } catch (m) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), m;
  } finally {
    this._compilations.delete(e);
  }
}
Fe.compileSchema = Eo;
function R_(e, t, r) {
  var n;
  r = (0, et.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = j_.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: u } = this.opts;
    i && (a = new fs({ schema: i, schemaId: u, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = I_.call(this, a);
}
Fe.resolveRef = R_;
function I_(e) {
  return (0, et.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Eo.call(this, e);
}
function Du(e) {
  for (const t of this._compilations)
    if (T_(t, e))
      return t;
}
Fe.getCompilingSchema = Du;
function T_(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function j_(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || hs.call(this, e, t);
}
function hs(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, et._getFullPath)(this.opts.uriResolver, r);
  let s = (0, et.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return Ts.call(this, r, e);
  const a = (0, et.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const u = hs.call(this, e, i);
    return typeof (u == null ? void 0 : u.schema) != "object" ? void 0 : Ts.call(this, r, u);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || Eo.call(this, i), a === (0, et.normalizeId)(t)) {
      const { schema: u } = i, { schemaId: c } = this.opts, d = u[c];
      return d && (s = (0, et.resolveUrl)(this.opts.uriResolver, s, d)), new fs({ schema: u, schemaId: c, root: e, baseId: s });
    }
    return Ts.call(this, r, i);
  }
}
Fe.resolveSchema = hs;
const A_ = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Ts(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const u of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, Gi.unescapeFragment)(u)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !A_.has(u) && d && (t = (0, et.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, Gi.schemaHasRulesButRef)(r, this.RULES)) {
    const u = (0, et.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = hs.call(this, n, u);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new fs({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const k_ = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", C_ = "Meta-schema for $data reference (JSON AnySchema extension proposal)", D_ = "object", M_ = [
  "$data"
], L_ = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, F_ = !1, V_ = {
  $id: k_,
  description: C_,
  type: D_,
  required: M_,
  properties: L_,
  additionalProperties: F_
};
var So = {};
Object.defineProperty(So, "__esModule", { value: !0 });
const Mu = Wl;
Mu.code = 'require("ajv/dist/runtime/uri").default';
So.default = Mu;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = rt;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = Z;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = ln, s = Tr, a = rr, i = Fe, u = Z, c = Ne, d = ve, l = L, m = V_, P = So, _ = (v, p) => new RegExp(v, p);
  _.code = "new RegExp";
  const E = ["removeAdditional", "useDefaults", "coerceTypes"], g = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), y = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, h = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, w = 200;
  function N(v) {
    var p, S, $, o, f, b, j, A, q, F, re, Ue, jt, At, kt, Ct, Dt, Mt, Lt, Ft, Vt, Ut, zt, qt, Kt;
    const Be = v.strict, Gt = (p = v.code) === null || p === void 0 ? void 0 : p.optimize, Cr = Gt === !0 || Gt === void 0 ? 1 : Gt || 0, Dr = ($ = (S = v.code) === null || S === void 0 ? void 0 : S.regExp) !== null && $ !== void 0 ? $ : _, Es = (o = v.uriResolver) !== null && o !== void 0 ? o : P.default;
    return {
      strictSchema: (b = (f = v.strictSchema) !== null && f !== void 0 ? f : Be) !== null && b !== void 0 ? b : !0,
      strictNumbers: (A = (j = v.strictNumbers) !== null && j !== void 0 ? j : Be) !== null && A !== void 0 ? A : !0,
      strictTypes: (F = (q = v.strictTypes) !== null && q !== void 0 ? q : Be) !== null && F !== void 0 ? F : "log",
      strictTuples: (Ue = (re = v.strictTuples) !== null && re !== void 0 ? re : Be) !== null && Ue !== void 0 ? Ue : "log",
      strictRequired: (At = (jt = v.strictRequired) !== null && jt !== void 0 ? jt : Be) !== null && At !== void 0 ? At : !1,
      code: v.code ? { ...v.code, optimize: Cr, regExp: Dr } : { optimize: Cr, regExp: Dr },
      loopRequired: (kt = v.loopRequired) !== null && kt !== void 0 ? kt : w,
      loopEnum: (Ct = v.loopEnum) !== null && Ct !== void 0 ? Ct : w,
      meta: (Dt = v.meta) !== null && Dt !== void 0 ? Dt : !0,
      messages: (Mt = v.messages) !== null && Mt !== void 0 ? Mt : !0,
      inlineRefs: (Lt = v.inlineRefs) !== null && Lt !== void 0 ? Lt : !0,
      schemaId: (Ft = v.schemaId) !== null && Ft !== void 0 ? Ft : "$id",
      addUsedSchema: (Vt = v.addUsedSchema) !== null && Vt !== void 0 ? Vt : !0,
      validateSchema: (Ut = v.validateSchema) !== null && Ut !== void 0 ? Ut : !0,
      validateFormats: (zt = v.validateFormats) !== null && zt !== void 0 ? zt : !0,
      unicodeRegExp: (qt = v.unicodeRegExp) !== null && qt !== void 0 ? qt : !0,
      int32range: (Kt = v.int32range) !== null && Kt !== void 0 ? Kt : !0,
      uriResolver: Es
    };
  }
  class R {
    constructor(p = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), p = this.opts = { ...p, ...N(p) };
      const { es5: S, lines: $ } = this.opts.code;
      this.scope = new u.ValueScope({ scope: {}, prefixes: g, es5: S, lines: $ }), this.logger = Q(p.logger);
      const o = p.validateFormats;
      p.validateFormats = !1, this.RULES = (0, a.getRules)(), T.call(this, y, p, "NOT SUPPORTED"), T.call(this, h, p, "DEPRECATED", "warn"), this._metaOpts = H.call(this), p.formats && ue.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), p.keywords && V.call(this, p.keywords), typeof p.meta == "object" && this.addMetaSchema(p.meta), W.call(this), p.validateFormats = o;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: p, meta: S, schemaId: $ } = this.opts;
      let o = m;
      $ === "id" && (o = { ...m }, o.id = o.$id, delete o.$id), S && p && this.addMetaSchema(o, o[$], !1);
    }
    defaultMeta() {
      const { meta: p, schemaId: S } = this.opts;
      return this.opts.defaultMeta = typeof p == "object" ? p[S] || p : void 0;
    }
    validate(p, S) {
      let $;
      if (typeof p == "string") {
        if ($ = this.getSchema(p), !$)
          throw new Error(`no schema with key or ref "${p}"`);
      } else
        $ = this.compile(p);
      const o = $(S);
      return "$async" in $ || (this.errors = $.errors), o;
    }
    compile(p, S) {
      const $ = this._addSchema(p, S);
      return $.validate || this._compileSchemaEnv($);
    }
    compileAsync(p, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: $ } = this.opts;
      return o.call(this, p, S);
      async function o(F, re) {
        await f.call(this, F.$schema);
        const Ue = this._addSchema(F, re);
        return Ue.validate || b.call(this, Ue);
      }
      async function f(F) {
        F && !this.getSchema(F) && await o.call(this, { $ref: F }, !0);
      }
      async function b(F) {
        try {
          return this._compileSchemaEnv(F);
        } catch (re) {
          if (!(re instanceof s.default))
            throw re;
          return j.call(this, re), await A.call(this, re.missingSchema), b.call(this, F);
        }
      }
      function j({ missingSchema: F, missingRef: re }) {
        if (this.refs[F])
          throw new Error(`AnySchema ${F} is loaded but ${re} cannot be resolved`);
      }
      async function A(F) {
        const re = await q.call(this, F);
        this.refs[F] || await f.call(this, re.$schema), this.refs[F] || this.addSchema(re, F, S);
      }
      async function q(F) {
        const re = this._loading[F];
        if (re)
          return re;
        try {
          return await (this._loading[F] = $(F));
        } finally {
          delete this._loading[F];
        }
      }
    }
    // Adds schema to the instance
    addSchema(p, S, $, o = this.opts.validateSchema) {
      if (Array.isArray(p)) {
        for (const b of p)
          this.addSchema(b, void 0, $, o);
        return this;
      }
      let f;
      if (typeof p == "object") {
        const { schemaId: b } = this.opts;
        if (f = p[b], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${b} must be string`);
      }
      return S = (0, c.normalizeId)(S || f), this._checkUnique(S), this.schemas[S] = this._addSchema(p, $, S, o, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(p, S, $ = this.opts.validateSchema) {
      return this.addSchema(p, S, !0, $), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(p, S) {
      if (typeof p == "boolean")
        return !0;
      let $;
      if ($ = p.$schema, $ !== void 0 && typeof $ != "string")
        throw new Error("$schema must be a string");
      if ($ = $ || this.opts.defaultMeta || this.defaultMeta(), !$)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const o = this.validate($, p);
      if (!o && S) {
        const f = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(f);
        else
          throw new Error(f);
      }
      return o;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(p) {
      let S;
      for (; typeof (S = z.call(this, p)) == "string"; )
        p = S;
      if (S === void 0) {
        const { schemaId: $ } = this.opts, o = new i.SchemaEnv({ schema: {}, schemaId: $ });
        if (S = i.resolveSchema.call(this, o, p), !S)
          return;
        this.refs[p] = S;
      }
      return S.validate || this._compileSchemaEnv(S);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(p) {
      if (p instanceof RegExp)
        return this._removeAllSchemas(this.schemas, p), this._removeAllSchemas(this.refs, p), this;
      switch (typeof p) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const S = z.call(this, p);
          return typeof S == "object" && this._cache.delete(S.schema), delete this.schemas[p], delete this.refs[p], this;
        }
        case "object": {
          const S = p;
          this._cache.delete(S);
          let $ = p[this.opts.schemaId];
          return $ && ($ = (0, c.normalizeId)($), delete this.schemas[$], delete this.refs[$]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(p) {
      for (const S of p)
        this.addKeyword(S);
      return this;
    }
    addKeyword(p, S) {
      let $;
      if (typeof p == "string")
        $ = p, typeof S == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), S.keyword = $);
      else if (typeof p == "object" && S === void 0) {
        if (S = p, $ = S.keyword, Array.isArray($) && !$.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (C.call(this, $, S), !S)
        return (0, l.eachItem)($, (f) => k.call(this, f)), this;
      D.call(this, S);
      const o = {
        ...S,
        type: (0, d.getJSONTypes)(S.type),
        schemaType: (0, d.getJSONTypes)(S.schemaType)
      };
      return (0, l.eachItem)($, o.type.length === 0 ? (f) => k.call(this, f, o) : (f) => o.type.forEach((b) => k.call(this, f, o, b))), this;
    }
    getKeyword(p) {
      const S = this.RULES.all[p];
      return typeof S == "object" ? S.definition : !!S;
    }
    // Remove keyword
    removeKeyword(p) {
      const { RULES: S } = this;
      delete S.keywords[p], delete S.all[p];
      for (const $ of S.rules) {
        const o = $.rules.findIndex((f) => f.keyword === p);
        o >= 0 && $.rules.splice(o, 1);
      }
      return this;
    }
    // Add format
    addFormat(p, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[p] = S, this;
    }
    errorsText(p = this.errors, { separator: S = ", ", dataVar: $ = "data" } = {}) {
      return !p || p.length === 0 ? "No errors" : p.map((o) => `${$}${o.instancePath} ${o.message}`).reduce((o, f) => o + S + f);
    }
    $dataMetaSchema(p, S) {
      const $ = this.RULES.all;
      p = JSON.parse(JSON.stringify(p));
      for (const o of S) {
        const f = o.split("/").slice(1);
        let b = p;
        for (const j of f)
          b = b[j];
        for (const j in $) {
          const A = $[j];
          if (typeof A != "object")
            continue;
          const { $data: q } = A.definition, F = b[j];
          q && F && (b[j] = I(F));
        }
      }
      return p;
    }
    _removeAllSchemas(p, S) {
      for (const $ in p) {
        const o = p[$];
        (!S || S.test($)) && (typeof o == "string" ? delete p[$] : o && !o.meta && (this._cache.delete(o.schema), delete p[$]));
      }
    }
    _addSchema(p, S, $, o = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let b;
      const { schemaId: j } = this.opts;
      if (typeof p == "object")
        b = p[j];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof p != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let A = this._cache.get(p);
      if (A !== void 0)
        return A;
      $ = (0, c.normalizeId)(b || $);
      const q = c.getSchemaRefs.call(this, p, $);
      return A = new i.SchemaEnv({ schema: p, schemaId: j, meta: S, baseId: $, localRefs: q }), this._cache.set(A.schema, A), f && !$.startsWith("#") && ($ && this._checkUnique($), this.refs[$] = A), o && this.validateSchema(p, !0), A;
    }
    _checkUnique(p) {
      if (this.schemas[p] || this.refs[p])
        throw new Error(`schema with key or id "${p}" already exists`);
    }
    _compileSchemaEnv(p) {
      if (p.meta ? this._compileMetaSchema(p) : i.compileSchema.call(this, p), !p.validate)
        throw new Error("ajv implementation error");
      return p.validate;
    }
    _compileMetaSchema(p) {
      const S = this.opts;
      this.opts = this._metaOpts;
      try {
        i.compileSchema.call(this, p);
      } finally {
        this.opts = S;
      }
    }
  }
  R.ValidationError = n.default, R.MissingRefError = s.default, e.default = R;
  function T(v, p, S, $ = "error") {
    for (const o in v) {
      const f = o;
      f in p && this.logger[$](`${S}: option ${o}. ${v[f]}`);
    }
  }
  function z(v) {
    return v = (0, c.normalizeId)(v), this.schemas[v] || this.refs[v];
  }
  function W() {
    const v = this.opts.schemas;
    if (v)
      if (Array.isArray(v))
        this.addSchema(v);
      else
        for (const p in v)
          this.addSchema(v[p], p);
  }
  function ue() {
    for (const v in this.opts.formats) {
      const p = this.opts.formats[v];
      p && this.addFormat(v, p);
    }
  }
  function V(v) {
    if (Array.isArray(v)) {
      this.addVocabulary(v);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const p in v) {
      const S = v[p];
      S.keyword || (S.keyword = p), this.addKeyword(S);
    }
  }
  function H() {
    const v = { ...this.opts };
    for (const p of E)
      delete v[p];
    return v;
  }
  const ne = { log() {
  }, warn() {
  }, error() {
  } };
  function Q(v) {
    if (v === !1)
      return ne;
    if (v === void 0)
      return console;
    if (v.log && v.warn && v.error)
      return v;
    throw new Error("logger must implement log, warn and error methods");
  }
  const de = /^[a-z_$][a-z0-9_$:-]*$/i;
  function C(v, p) {
    const { RULES: S } = this;
    if ((0, l.eachItem)(v, ($) => {
      if (S.keywords[$])
        throw new Error(`Keyword ${$} is already defined`);
      if (!de.test($))
        throw new Error(`Keyword ${$} has invalid name`);
    }), !!p && p.$data && !("code" in p || "validate" in p))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function k(v, p, S) {
    var $;
    const o = p == null ? void 0 : p.post;
    if (S && o)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let b = o ? f.post : f.rules.find(({ type: A }) => A === S);
    if (b || (b = { type: S, rules: [] }, f.rules.push(b)), f.keywords[v] = !0, !p)
      return;
    const j = {
      keyword: v,
      definition: {
        ...p,
        type: (0, d.getJSONTypes)(p.type),
        schemaType: (0, d.getJSONTypes)(p.schemaType)
      }
    };
    p.before ? U.call(this, b, j, p.before) : b.rules.push(j), f.all[v] = j, ($ = p.implements) === null || $ === void 0 || $.forEach((A) => this.addKeyword(A));
  }
  function U(v, p, S) {
    const $ = v.rules.findIndex((o) => o.keyword === S);
    $ >= 0 ? v.rules.splice($, 0, p) : (v.rules.push(p), this.logger.warn(`rule ${S} is not defined`));
  }
  function D(v) {
    let { metaSchema: p } = v;
    p !== void 0 && (v.$data && this.opts.$data && (p = I(p)), v.validateSchema = this.compile(p, !0));
  }
  const O = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function I(v) {
    return { anyOf: [v, O] };
  }
})(su);
var bo = {}, Po = {}, No = {};
Object.defineProperty(No, "__esModule", { value: !0 });
const U_ = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
No.default = U_;
var nr = {};
Object.defineProperty(nr, "__esModule", { value: !0 });
nr.callRef = nr.getValidate = void 0;
const z_ = Tr, Hi = ee, Me = Z, ur = mt, Wi = Fe, wn = L, q_ = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: u, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return m();
    const l = Wi.resolveRef.call(c, d, s, r);
    if (l === void 0)
      throw new z_.default(n.opts.uriResolver, s, r);
    if (l instanceof Wi.SchemaEnv)
      return P(l);
    return _(l);
    function m() {
      if (a === d)
        return Vn(e, i, a, a.$async);
      const E = t.scopeValue("root", { ref: d });
      return Vn(e, (0, Me._)`${E}.validate`, d, d.$async);
    }
    function P(E) {
      const g = Lu(e, E);
      Vn(e, g, E, E.$async);
    }
    function _(E) {
      const g = t.scopeValue("schema", u.code.source === !0 ? { ref: E, code: (0, Me.stringify)(E) } : { ref: E }), y = t.name("valid"), h = e.subschema({
        schema: E,
        dataTypes: [],
        schemaPath: Me.nil,
        topSchemaRef: g,
        errSchemaPath: r
      }, y);
      e.mergeEvaluated(h), e.ok(y);
    }
  }
};
function Lu(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Me._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
nr.getValidate = Lu;
function Vn(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: u, opts: c } = a, d = c.passContext ? ur.default.this : Me.nil;
  n ? l() : m();
  function l() {
    if (!u.$async)
      throw new Error("async schema referenced by sync schema");
    const E = s.let("valid");
    s.try(() => {
      s.code((0, Me._)`await ${(0, Hi.callValidateCode)(e, t, d)}`), _(t), i || s.assign(E, !0);
    }, (g) => {
      s.if((0, Me._)`!(${g} instanceof ${a.ValidationError})`, () => s.throw(g)), P(g), i || s.assign(E, !1);
    }), e.ok(E);
  }
  function m() {
    e.result((0, Hi.callValidateCode)(e, t, d), () => _(t), () => P(t));
  }
  function P(E) {
    const g = (0, Me._)`${E}.errors`;
    s.assign(ur.default.vErrors, (0, Me._)`${ur.default.vErrors} === null ? ${g} : ${ur.default.vErrors}.concat(${g})`), s.assign(ur.default.errors, (0, Me._)`${ur.default.vErrors}.length`);
  }
  function _(E) {
    var g;
    if (!a.opts.unevaluated)
      return;
    const y = (g = r == null ? void 0 : r.validate) === null || g === void 0 ? void 0 : g.evaluated;
    if (a.props !== !0)
      if (y && !y.dynamicProps)
        y.props !== void 0 && (a.props = wn.mergeEvaluated.props(s, y.props, a.props));
      else {
        const h = s.var("props", (0, Me._)`${E}.evaluated.props`);
        a.props = wn.mergeEvaluated.props(s, h, a.props, Me.Name);
      }
    if (a.items !== !0)
      if (y && !y.dynamicItems)
        y.items !== void 0 && (a.items = wn.mergeEvaluated.items(s, y.items, a.items));
      else {
        const h = s.var("items", (0, Me._)`${E}.evaluated.items`);
        a.items = wn.mergeEvaluated.items(s, h, a.items, Me.Name);
      }
  }
}
nr.callRef = Vn;
nr.default = q_;
Object.defineProperty(Po, "__esModule", { value: !0 });
const K_ = No, G_ = nr, H_ = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  K_.default,
  G_.default
];
Po.default = H_;
var Oo = {}, Ro = {};
Object.defineProperty(Ro, "__esModule", { value: !0 });
const Yn = Z, St = Yn.operators, Qn = {
  maximum: { okStr: "<=", ok: St.LTE, fail: St.GT },
  minimum: { okStr: ">=", ok: St.GTE, fail: St.LT },
  exclusiveMaximum: { okStr: "<", ok: St.LT, fail: St.GTE },
  exclusiveMinimum: { okStr: ">", ok: St.GT, fail: St.LTE }
}, W_ = {
  message: ({ keyword: e, schemaCode: t }) => (0, Yn.str)`must be ${Qn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Yn._)`{comparison: ${Qn[e].okStr}, limit: ${t}}`
}, J_ = {
  keyword: Object.keys(Qn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: W_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Yn._)`${r} ${Qn[t].fail} ${n} || isNaN(${r})`);
  }
};
Ro.default = J_;
var Io = {};
Object.defineProperty(Io, "__esModule", { value: !0 });
const Qr = Z, B_ = {
  message: ({ schemaCode: e }) => (0, Qr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Qr._)`{multipleOf: ${e}}`
}, X_ = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: B_,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), u = a ? (0, Qr._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, Qr._)`${i} !== parseInt(${i})`;
    e.fail$data((0, Qr._)`(${n} === 0 || (${i} = ${r}/${n}, ${u}))`);
  }
};
Io.default = X_;
var To = {}, jo = {};
Object.defineProperty(jo, "__esModule", { value: !0 });
function Fu(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
jo.default = Fu;
Fu.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(To, "__esModule", { value: !0 });
const Zt = Z, Y_ = L, Q_ = jo, Z_ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Zt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Zt._)`{limit: ${e}}`
}, x_ = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: Z_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Zt.operators.GT : Zt.operators.LT, i = s.opts.unicode === !1 ? (0, Zt._)`${r}.length` : (0, Zt._)`${(0, Y_.useFunc)(e.gen, Q_.default)}(${r})`;
    e.fail$data((0, Zt._)`${i} ${a} ${n}`);
  }
};
To.default = x_;
var Ao = {};
Object.defineProperty(Ao, "__esModule", { value: !0 });
const eg = ee, Zn = Z, tg = {
  message: ({ schemaCode: e }) => (0, Zn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Zn._)`{pattern: ${e}}`
}, rg = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: tg,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, i = a.opts.unicodeRegExp ? "u" : "", u = r ? (0, Zn._)`(new RegExp(${s}, ${i}))` : (0, eg.usePattern)(e, n);
    e.fail$data((0, Zn._)`!${u}.test(${t})`);
  }
};
Ao.default = rg;
var ko = {};
Object.defineProperty(ko, "__esModule", { value: !0 });
const Zr = Z, ng = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Zr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Zr._)`{limit: ${e}}`
}, sg = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: ng,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Zr.operators.GT : Zr.operators.LT;
    e.fail$data((0, Zr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
ko.default = sg;
var Co = {};
Object.defineProperty(Co, "__esModule", { value: !0 });
const Vr = ee, xr = Z, ag = L, og = {
  message: ({ params: { missingProperty: e } }) => (0, xr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, xr._)`{missingProperty: ${e}}`
}, ig = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: og,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: i } = e, { opts: u } = i;
    if (!a && r.length === 0)
      return;
    const c = r.length >= u.loopRequired;
    if (i.allErrors ? d() : l(), u.strictRequired) {
      const _ = e.parentSchema.properties, { definedProperties: E } = e.it;
      for (const g of r)
        if ((_ == null ? void 0 : _[g]) === void 0 && !E.has(g)) {
          const y = i.schemaEnv.baseId + i.errSchemaPath, h = `required property "${g}" is not defined at "${y}" (strictRequired)`;
          (0, ag.checkStrictMode)(i, h, i.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(xr.nil, m);
      else
        for (const _ of r)
          (0, Vr.checkReportMissingProp)(e, _);
    }
    function l() {
      const _ = t.let("missing");
      if (c || a) {
        const E = t.let("valid", !0);
        e.block$data(E, () => P(_, E)), e.ok(E);
      } else
        t.if((0, Vr.checkMissingProp)(e, r, _)), (0, Vr.reportMissingProp)(e, _), t.else();
    }
    function m() {
      t.forOf("prop", n, (_) => {
        e.setParams({ missingProperty: _ }), t.if((0, Vr.noPropertyInData)(t, s, _, u.ownProperties), () => e.error());
      });
    }
    function P(_, E) {
      e.setParams({ missingProperty: _ }), t.forOf(_, n, () => {
        t.assign(E, (0, Vr.propertyInData)(t, s, _, u.ownProperties)), t.if((0, xr.not)(E), () => {
          e.error(), t.break();
        });
      }, xr.nil);
    }
  }
};
Co.default = ig;
var Do = {};
Object.defineProperty(Do, "__esModule", { value: !0 });
const en = Z, cg = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, en.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, en._)`{limit: ${e}}`
}, lg = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: cg,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? en.operators.GT : en.operators.LT;
    e.fail$data((0, en._)`${r}.length ${s} ${n}`);
  }
};
Do.default = lg;
var Mo = {}, un = {};
Object.defineProperty(un, "__esModule", { value: !0 });
const Vu = as;
Vu.code = 'require("ajv/dist/runtime/equal").default';
un.default = Vu;
Object.defineProperty(Mo, "__esModule", { value: !0 });
const js = ve, Se = Z, ug = L, dg = un, fg = {
  message: ({ params: { i: e, j: t } }) => (0, Se.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Se._)`{i: ${e}, j: ${t}}`
}, hg = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: fg,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: u } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, js.getSchemaTypes)(a.items) : [];
    e.block$data(c, l, (0, Se._)`${i} === false`), e.ok(c);
    function l() {
      const E = t.let("i", (0, Se._)`${r}.length`), g = t.let("j");
      e.setParams({ i: E, j: g }), t.assign(c, !0), t.if((0, Se._)`${E} > 1`, () => (m() ? P : _)(E, g));
    }
    function m() {
      return d.length > 0 && !d.some((E) => E === "object" || E === "array");
    }
    function P(E, g) {
      const y = t.name("item"), h = (0, js.checkDataTypes)(d, y, u.opts.strictNumbers, js.DataType.Wrong), w = t.const("indices", (0, Se._)`{}`);
      t.for((0, Se._)`;${E}--;`, () => {
        t.let(y, (0, Se._)`${r}[${E}]`), t.if(h, (0, Se._)`continue`), d.length > 1 && t.if((0, Se._)`typeof ${y} == "string"`, (0, Se._)`${y} += "_"`), t.if((0, Se._)`typeof ${w}[${y}] == "number"`, () => {
          t.assign(g, (0, Se._)`${w}[${y}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Se._)`${w}[${y}] = ${E}`);
      });
    }
    function _(E, g) {
      const y = (0, ug.useFunc)(t, dg.default), h = t.name("outer");
      t.label(h).for((0, Se._)`;${E}--;`, () => t.for((0, Se._)`${g} = ${E}; ${g}--;`, () => t.if((0, Se._)`${y}(${r}[${E}], ${r}[${g}])`, () => {
        e.error(), t.assign(c, !1).break(h);
      })));
    }
  }
};
Mo.default = hg;
var Lo = {};
Object.defineProperty(Lo, "__esModule", { value: !0 });
const ea = Z, mg = L, pg = un, $g = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, ea._)`{allowedValue: ${e}}`
}, yg = {
  keyword: "const",
  $data: !0,
  error: $g,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, ea._)`!${(0, mg.useFunc)(t, pg.default)}(${r}, ${s})`) : e.fail((0, ea._)`${a} !== ${r}`);
  }
};
Lo.default = yg;
var Fo = {};
Object.defineProperty(Fo, "__esModule", { value: !0 });
const Gr = Z, _g = L, gg = un, vg = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Gr._)`{allowedValues: ${e}}`
}, wg = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: vg,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const u = s.length >= i.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, _g.useFunc)(t, gg.default));
    let l;
    if (u || n)
      l = t.let("valid"), e.block$data(l, m);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const _ = t.const("vSchema", a);
      l = (0, Gr.or)(...s.map((E, g) => P(_, g)));
    }
    e.pass(l);
    function m() {
      t.assign(l, !1), t.forOf("v", a, (_) => t.if((0, Gr._)`${d()}(${r}, ${_})`, () => t.assign(l, !0).break()));
    }
    function P(_, E) {
      const g = s[E];
      return typeof g == "object" && g !== null ? (0, Gr._)`${d()}(${r}, ${_}[${E}])` : (0, Gr._)`${r} === ${g}`;
    }
  }
};
Fo.default = wg;
Object.defineProperty(Oo, "__esModule", { value: !0 });
const Eg = Ro, Sg = Io, bg = To, Pg = Ao, Ng = ko, Og = Co, Rg = Do, Ig = Mo, Tg = Lo, jg = Fo, Ag = [
  // number
  Eg.default,
  Sg.default,
  // string
  bg.default,
  Pg.default,
  // object
  Ng.default,
  Og.default,
  // array
  Rg.default,
  Ig.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  Tg.default,
  jg.default
];
Oo.default = Ag;
var Vo = {}, jr = {};
Object.defineProperty(jr, "__esModule", { value: !0 });
jr.validateAdditionalItems = void 0;
const xt = Z, ta = L, kg = {
  message: ({ params: { len: e } }) => (0, xt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, xt._)`{limit: ${e}}`
}, Cg = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: kg,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, ta.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Uu(e, n);
  }
};
function Uu(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const u = r.const("len", (0, xt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, xt._)`${u} <= ${t.length}`);
  else if (typeof n == "object" && !(0, ta.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, xt._)`${u} <= ${t.length}`);
    r.if((0, xt.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, u, (l) => {
      e.subschema({ keyword: a, dataProp: l, dataPropType: ta.Type.Num }, d), i.allErrors || r.if((0, xt.not)(d), () => r.break());
    });
  }
}
jr.validateAdditionalItems = Uu;
jr.default = Cg;
var Uo = {}, Ar = {};
Object.defineProperty(Ar, "__esModule", { value: !0 });
Ar.validateTuple = void 0;
const Ji = Z, Un = L, Dg = ee, Mg = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return zu(e, "additionalItems", t);
    r.items = !0, !(0, Un.alwaysValidSchema)(r, t) && e.ok((0, Dg.validateArray)(e));
  }
};
function zu(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: u } = e;
  l(s), u.opts.unevaluated && r.length && u.items !== !0 && (u.items = Un.mergeEvaluated.items(n, r.length, u.items));
  const c = n.name("valid"), d = n.const("len", (0, Ji._)`${a}.length`);
  r.forEach((m, P) => {
    (0, Un.alwaysValidSchema)(u, m) || (n.if((0, Ji._)`${d} > ${P}`, () => e.subschema({
      keyword: i,
      schemaProp: P,
      dataProp: P
    }, c)), e.ok(c));
  });
  function l(m) {
    const { opts: P, errSchemaPath: _ } = u, E = r.length, g = E === m.minItems && (E === m.maxItems || m[t] === !1);
    if (P.strictTuples && !g) {
      const y = `"${i}" is ${E}-tuple, but minItems or maxItems/${t} are not specified or different at path "${_}"`;
      (0, Un.checkStrictMode)(u, y, P.strictTuples);
    }
  }
}
Ar.validateTuple = zu;
Ar.default = Mg;
Object.defineProperty(Uo, "__esModule", { value: !0 });
const Lg = Ar, Fg = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, Lg.validateTuple)(e, "items")
};
Uo.default = Fg;
var zo = {};
Object.defineProperty(zo, "__esModule", { value: !0 });
const Bi = Z, Vg = L, Ug = ee, zg = jr, qg = {
  message: ({ params: { len: e } }) => (0, Bi.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Bi._)`{limit: ${e}}`
}, Kg = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: qg,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, Vg.alwaysValidSchema)(n, t) && (s ? (0, zg.validateAdditionalItems)(e, s) : e.ok((0, Ug.validateArray)(e)));
  }
};
zo.default = Kg;
var qo = {};
Object.defineProperty(qo, "__esModule", { value: !0 });
const Je = Z, En = L, Gg = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Je.str)`must contain at least ${e} valid item(s)` : (0, Je.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Je._)`{minContains: ${e}}` : (0, Je._)`{minContains: ${e}, maxContains: ${t}}`
}, Hg = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: Gg,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let i, u;
    const { minContains: c, maxContains: d } = n;
    a.opts.next ? (i = c === void 0 ? 1 : c, u = d) : i = 1;
    const l = t.const("len", (0, Je._)`${s}.length`);
    if (e.setParams({ min: i, max: u }), u === void 0 && i === 0) {
      (0, En.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (u !== void 0 && i > u) {
      (0, En.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, En.alwaysValidSchema)(a, r)) {
      let g = (0, Je._)`${l} >= ${i}`;
      u !== void 0 && (g = (0, Je._)`${g} && ${l} <= ${u}`), e.pass(g);
      return;
    }
    a.items = !0;
    const m = t.name("valid");
    u === void 0 && i === 1 ? _(m, () => t.if(m, () => t.break())) : i === 0 ? (t.let(m, !0), u !== void 0 && t.if((0, Je._)`${s}.length > 0`, P)) : (t.let(m, !1), P()), e.result(m, () => e.reset());
    function P() {
      const g = t.name("_valid"), y = t.let("count", 0);
      _(g, () => t.if(g, () => E(y)));
    }
    function _(g, y) {
      t.forRange("i", 0, l, (h) => {
        e.subschema({
          keyword: "contains",
          dataProp: h,
          dataPropType: En.Type.Num,
          compositeRule: !0
        }, g), y();
      });
    }
    function E(g) {
      t.code((0, Je._)`${g}++`), u === void 0 ? t.if((0, Je._)`${g} >= ${i}`, () => t.assign(m, !0).break()) : (t.if((0, Je._)`${g} > ${u}`, () => t.assign(m, !1).break()), i === 1 ? t.assign(m, !0) : t.if((0, Je._)`${g} >= ${i}`, () => t.assign(m, !0)));
    }
  }
};
qo.default = Hg;
var qu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = Z, r = L, n = ee;
  e.error = {
    message: ({ params: { property: c, depsCount: d, deps: l } }) => {
      const m = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${m} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: d, deps: l, missingProperty: m } }) => (0, t._)`{property: ${c},
    missingProperty: ${m},
    depsCount: ${d},
    deps: ${l}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [d, l] = a(c);
      i(c, d), u(c, l);
    }
  };
  function a({ schema: c }) {
    const d = {}, l = {};
    for (const m in c) {
      if (m === "__proto__")
        continue;
      const P = Array.isArray(c[m]) ? d : l;
      P[m] = c[m];
    }
    return [d, l];
  }
  function i(c, d = c.schema) {
    const { gen: l, data: m, it: P } = c;
    if (Object.keys(d).length === 0)
      return;
    const _ = l.let("missing");
    for (const E in d) {
      const g = d[E];
      if (g.length === 0)
        continue;
      const y = (0, n.propertyInData)(l, m, E, P.opts.ownProperties);
      c.setParams({
        property: E,
        depsCount: g.length,
        deps: g.join(", ")
      }), P.allErrors ? l.if(y, () => {
        for (const h of g)
          (0, n.checkReportMissingProp)(c, h);
      }) : (l.if((0, t._)`${y} && (${(0, n.checkMissingProp)(c, g, _)})`), (0, n.reportMissingProp)(c, _), l.else());
    }
  }
  e.validatePropertyDeps = i;
  function u(c, d = c.schema) {
    const { gen: l, data: m, keyword: P, it: _ } = c, E = l.name("valid");
    for (const g in d)
      (0, r.alwaysValidSchema)(_, d[g]) || (l.if(
        (0, n.propertyInData)(l, m, g, _.opts.ownProperties),
        () => {
          const y = c.subschema({ keyword: P, schemaProp: g }, E);
          c.mergeValidEvaluated(y, E);
        },
        () => l.var(E, !0)
        // TODO var
      ), c.ok(E));
  }
  e.validateSchemaDeps = u, e.default = s;
})(qu);
var Ko = {};
Object.defineProperty(Ko, "__esModule", { value: !0 });
const Ku = Z, Wg = L, Jg = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Ku._)`{propertyName: ${e.propertyName}}`
}, Bg = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: Jg,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, Wg.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, Ku.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Ko.default = Bg;
var ms = {};
Object.defineProperty(ms, "__esModule", { value: !0 });
const Sn = ee, Ze = Z, Xg = mt, bn = L, Yg = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Ze._)`{additionalProperty: ${e.additionalProperty}}`
}, Qg = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Yg,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: u, opts: c } = i;
    if (i.props = !0, c.removeAdditional !== "all" && (0, bn.alwaysValidSchema)(i, r))
      return;
    const d = (0, Sn.allSchemaProperties)(n.properties), l = (0, Sn.allSchemaProperties)(n.patternProperties);
    m(), e.ok((0, Ze._)`${a} === ${Xg.default.errors}`);
    function m() {
      t.forIn("key", s, (y) => {
        !d.length && !l.length ? E(y) : t.if(P(y), () => E(y));
      });
    }
    function P(y) {
      let h;
      if (d.length > 8) {
        const w = (0, bn.schemaRefOrVal)(i, n.properties, "properties");
        h = (0, Sn.isOwnProperty)(t, w, y);
      } else d.length ? h = (0, Ze.or)(...d.map((w) => (0, Ze._)`${y} === ${w}`)) : h = Ze.nil;
      return l.length && (h = (0, Ze.or)(h, ...l.map((w) => (0, Ze._)`${(0, Sn.usePattern)(e, w)}.test(${y})`))), (0, Ze.not)(h);
    }
    function _(y) {
      t.code((0, Ze._)`delete ${s}[${y}]`);
    }
    function E(y) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        _(y);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: y }), e.error(), u || t.break();
        return;
      }
      if (typeof r == "object" && !(0, bn.alwaysValidSchema)(i, r)) {
        const h = t.name("valid");
        c.removeAdditional === "failing" ? (g(y, h, !1), t.if((0, Ze.not)(h), () => {
          e.reset(), _(y);
        })) : (g(y, h), u || t.if((0, Ze.not)(h), () => t.break()));
      }
    }
    function g(y, h, w) {
      const N = {
        keyword: "additionalProperties",
        dataProp: y,
        dataPropType: bn.Type.Str
      };
      w === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, h);
    }
  }
};
ms.default = Qg;
var Go = {};
Object.defineProperty(Go, "__esModule", { value: !0 });
const Zg = rt, Xi = ee, As = L, Yi = ms, xg = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Yi.default.code(new Zg.KeywordCxt(a, Yi.default, "additionalProperties"));
    const i = (0, Xi.allSchemaProperties)(r);
    for (const m of i)
      a.definedProperties.add(m);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = As.mergeEvaluated.props(t, (0, As.toHash)(i), a.props));
    const u = i.filter((m) => !(0, As.alwaysValidSchema)(a, r[m]));
    if (u.length === 0)
      return;
    const c = t.name("valid");
    for (const m of u)
      d(m) ? l(m) : (t.if((0, Xi.propertyInData)(t, s, m, a.opts.ownProperties)), l(m), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(m), e.ok(c);
    function d(m) {
      return a.opts.useDefaults && !a.compositeRule && r[m].default !== void 0;
    }
    function l(m) {
      e.subschema({
        keyword: "properties",
        schemaProp: m,
        dataProp: m
      }, c);
    }
  }
};
Go.default = xg;
var Ho = {};
Object.defineProperty(Ho, "__esModule", { value: !0 });
const Qi = ee, Pn = Z, Zi = L, xi = L, e0 = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, u = (0, Qi.allSchemaProperties)(r), c = u.filter((g) => (0, Zi.alwaysValidSchema)(a, r[g]));
    if (u.length === 0 || c.length === u.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, l = t.name("valid");
    a.props !== !0 && !(a.props instanceof Pn.Name) && (a.props = (0, xi.evaluatedPropsToName)(t, a.props));
    const { props: m } = a;
    P();
    function P() {
      for (const g of u)
        d && _(g), a.allErrors ? E(g) : (t.var(l, !0), E(g), t.if(l));
    }
    function _(g) {
      for (const y in d)
        new RegExp(g).test(y) && (0, Zi.checkStrictMode)(a, `property ${y} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function E(g) {
      t.forIn("key", n, (y) => {
        t.if((0, Pn._)`${(0, Qi.usePattern)(e, g)}.test(${y})`, () => {
          const h = c.includes(g);
          h || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: y,
            dataPropType: xi.Type.Str
          }, l), a.opts.unevaluated && m !== !0 ? t.assign((0, Pn._)`${m}[${y}]`, !0) : !h && !a.allErrors && t.if((0, Pn.not)(l), () => t.break());
        });
      });
    }
  }
};
Ho.default = e0;
var Wo = {};
Object.defineProperty(Wo, "__esModule", { value: !0 });
const t0 = L, r0 = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, t0.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const s = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, s), e.failResult(s, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
Wo.default = r0;
var Jo = {};
Object.defineProperty(Jo, "__esModule", { value: !0 });
const n0 = ee, s0 = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: n0.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Jo.default = s0;
var Bo = {};
Object.defineProperty(Bo, "__esModule", { value: !0 });
const zn = Z, a0 = L, o0 = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, zn._)`{passingSchemas: ${e.passing}}`
}, i0 = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: o0,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, i = t.let("valid", !1), u = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: u }), t.block(d), e.result(i, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((l, m) => {
        let P;
        (0, a0.alwaysValidSchema)(s, l) ? t.var(c, !0) : P = e.subschema({
          keyword: "oneOf",
          schemaProp: m,
          compositeRule: !0
        }, c), m > 0 && t.if((0, zn._)`${c} && ${i}`).assign(i, !1).assign(u, (0, zn._)`[${u}, ${m}]`).else(), t.if(c, () => {
          t.assign(i, !0), t.assign(u, m), P && e.mergeEvaluated(P, zn.Name);
        });
      });
    }
  }
};
Bo.default = i0;
var Xo = {};
Object.defineProperty(Xo, "__esModule", { value: !0 });
const c0 = L, l0 = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, c0.alwaysValidSchema)(n, a))
        return;
      const u = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(u);
    });
  }
};
Xo.default = l0;
var Yo = {};
Object.defineProperty(Yo, "__esModule", { value: !0 });
const xn = Z, Gu = L, u0 = {
  message: ({ params: e }) => (0, xn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, xn._)`{failingKeyword: ${e.ifClause}}`
}, d0 = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: u0,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Gu.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = ec(n, "then"), a = ec(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), u = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(u, d("then", l), d("else", l));
    } else s ? t.if(u, d("then")) : t.if((0, xn.not)(u), d("else"));
    e.pass(i, () => e.error(!0));
    function c() {
      const l = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, u);
      e.mergeEvaluated(l);
    }
    function d(l, m) {
      return () => {
        const P = e.subschema({ keyword: l }, u);
        t.assign(i, u), e.mergeValidEvaluated(P, i), m ? t.assign(m, (0, xn._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function ec(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Gu.alwaysValidSchema)(e, r);
}
Yo.default = d0;
var Qo = {};
Object.defineProperty(Qo, "__esModule", { value: !0 });
const f0 = L, h0 = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, f0.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Qo.default = h0;
Object.defineProperty(Vo, "__esModule", { value: !0 });
const m0 = jr, p0 = Uo, $0 = Ar, y0 = zo, _0 = qo, g0 = qu, v0 = Ko, w0 = ms, E0 = Go, S0 = Ho, b0 = Wo, P0 = Jo, N0 = Bo, O0 = Xo, R0 = Yo, I0 = Qo;
function T0(e = !1) {
  const t = [
    // any
    b0.default,
    P0.default,
    N0.default,
    O0.default,
    R0.default,
    I0.default,
    // object
    v0.default,
    w0.default,
    g0.default,
    E0.default,
    S0.default
  ];
  return e ? t.push(p0.default, y0.default) : t.push(m0.default, $0.default), t.push(_0.default), t;
}
Vo.default = T0;
var Zo = {}, xo = {};
Object.defineProperty(xo, "__esModule", { value: !0 });
const $e = Z, j0 = {
  message: ({ schemaCode: e }) => (0, $e.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, $e._)`{format: ${e}}`
}, A0 = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: j0,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: u } = e, { opts: c, errSchemaPath: d, schemaEnv: l, self: m } = u;
    if (!c.validateFormats)
      return;
    s ? P() : _();
    function P() {
      const E = r.scopeValue("formats", {
        ref: m.formats,
        code: c.code.formats
      }), g = r.const("fDef", (0, $e._)`${E}[${i}]`), y = r.let("fType"), h = r.let("format");
      r.if((0, $e._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => r.assign(y, (0, $e._)`${g}.type || "string"`).assign(h, (0, $e._)`${g}.validate`), () => r.assign(y, (0, $e._)`"string"`).assign(h, g)), e.fail$data((0, $e.or)(w(), N()));
      function w() {
        return c.strictSchema === !1 ? $e.nil : (0, $e._)`${i} && !${h}`;
      }
      function N() {
        const R = l.$async ? (0, $e._)`(${g}.async ? await ${h}(${n}) : ${h}(${n}))` : (0, $e._)`${h}(${n})`, T = (0, $e._)`(typeof ${h} == "function" ? ${R} : ${h}.test(${n}))`;
        return (0, $e._)`${h} && ${h} !== true && ${y} === ${t} && !${T}`;
      }
    }
    function _() {
      const E = m.formats[a];
      if (!E) {
        w();
        return;
      }
      if (E === !0)
        return;
      const [g, y, h] = N(E);
      g === t && e.pass(R());
      function w() {
        if (c.strictSchema === !1) {
          m.logger.warn(T());
          return;
        }
        throw new Error(T());
        function T() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function N(T) {
        const z = T instanceof RegExp ? (0, $e.regexpCode)(T) : c.code.formats ? (0, $e._)`${c.code.formats}${(0, $e.getProperty)(a)}` : void 0, W = r.scopeValue("formats", { key: a, ref: T, code: z });
        return typeof T == "object" && !(T instanceof RegExp) ? [T.type || "string", T.validate, (0, $e._)`${W}.validate`] : ["string", T, W];
      }
      function R() {
        if (typeof E == "object" && !(E instanceof RegExp) && E.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, $e._)`await ${h}(${n})`;
        }
        return typeof y == "function" ? (0, $e._)`${h}(${n})` : (0, $e._)`${h}.test(${n})`;
      }
    }
  }
};
xo.default = A0;
Object.defineProperty(Zo, "__esModule", { value: !0 });
const k0 = xo, C0 = [k0.default];
Zo.default = C0;
var Pr = {};
Object.defineProperty(Pr, "__esModule", { value: !0 });
Pr.contentVocabulary = Pr.metadataVocabulary = void 0;
Pr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Pr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(bo, "__esModule", { value: !0 });
const D0 = Po, M0 = Oo, L0 = Vo, F0 = Zo, tc = Pr, V0 = [
  D0.default,
  M0.default,
  (0, L0.default)(),
  F0.default,
  tc.metadataVocabulary,
  tc.contentVocabulary
];
bo.default = V0;
var ei = {}, ps = {};
Object.defineProperty(ps, "__esModule", { value: !0 });
ps.DiscrError = void 0;
var rc;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(rc || (ps.DiscrError = rc = {}));
Object.defineProperty(ei, "__esModule", { value: !0 });
const hr = Z, ra = ps, nc = Fe, U0 = Tr, z0 = L, q0 = {
  message: ({ params: { discrError: e, tagName: t } }) => e === ra.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, hr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, K0 = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: q0,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: i } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const u = n.propertyName;
    if (typeof u != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!i)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), d = t.const("tag", (0, hr._)`${r}${(0, hr.getProperty)(u)}`);
    t.if((0, hr._)`typeof ${d} == "string"`, () => l(), () => e.error(!1, { discrError: ra.DiscrError.Tag, tag: d, tagName: u })), e.ok(c);
    function l() {
      const _ = P();
      t.if(!1);
      for (const E in _)
        t.elseIf((0, hr._)`${d} === ${E}`), t.assign(c, m(_[E]));
      t.else(), e.error(!1, { discrError: ra.DiscrError.Mapping, tag: d, tagName: u }), t.endIf();
    }
    function m(_) {
      const E = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: _ }, E);
      return e.mergeEvaluated(g, hr.Name), E;
    }
    function P() {
      var _;
      const E = {}, g = h(s);
      let y = !0;
      for (let R = 0; R < i.length; R++) {
        let T = i[R];
        if (T != null && T.$ref && !(0, z0.schemaHasRulesButRef)(T, a.self.RULES)) {
          const W = T.$ref;
          if (T = nc.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, W), T instanceof nc.SchemaEnv && (T = T.schema), T === void 0)
            throw new U0.default(a.opts.uriResolver, a.baseId, W);
        }
        const z = (_ = T == null ? void 0 : T.properties) === null || _ === void 0 ? void 0 : _[u];
        if (typeof z != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${u}"`);
        y = y && (g || h(T)), w(z, R);
      }
      if (!y)
        throw new Error(`discriminator: "${u}" must be required`);
      return E;
      function h({ required: R }) {
        return Array.isArray(R) && R.includes(u);
      }
      function w(R, T) {
        if (R.const)
          N(R.const, T);
        else if (R.enum)
          for (const z of R.enum)
            N(z, T);
        else
          throw new Error(`discriminator: "properties/${u}" must have "const" or "enum"`);
      }
      function N(R, T) {
        if (typeof R != "string" || R in E)
          throw new Error(`discriminator: "${u}" values must be unique strings`);
        E[R] = T;
      }
    }
  }
};
ei.default = K0;
const G0 = "http://json-schema.org/draft-07/schema#", H0 = "http://json-schema.org/draft-07/schema#", W0 = "Core schema meta-schema", J0 = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, B0 = [
  "object",
  "boolean"
], X0 = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, Y0 = {
  $schema: G0,
  $id: H0,
  title: W0,
  definitions: J0,
  type: B0,
  properties: X0,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = su, n = bo, s = ei, a = Y0, i = ["/properties"], u = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((E) => this.addVocabulary(E)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const E = this.opts.$data ? this.$dataMetaSchema(a, i) : a;
      this.addMetaSchema(E, u, !1), this.refs["http://json-schema.org/schema"] = u;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(u) ? u : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var d = rt;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return d.KeywordCxt;
  } });
  var l = Z;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return l._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return l.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return l.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return l.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return l.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return l.CodeGen;
  } });
  var m = ln;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return m.default;
  } });
  var P = Tr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return P.default;
  } });
})(Xs, Xs.exports);
var Q0 = Xs.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = Q0, r = Z, n = r.operators, s = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, a = {
    message: ({ keyword: u, schemaCode: c }) => r.str`should be ${s[u].okStr} ${c}`,
    params: ({ keyword: u, schemaCode: c }) => r._`{comparison: ${s[u].okStr}, limit: ${c}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(s),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: a,
    code(u) {
      const { gen: c, data: d, schemaCode: l, keyword: m, it: P } = u, { opts: _, self: E } = P;
      if (!_.validateFormats)
        return;
      const g = new t.KeywordCxt(P, E.RULES.all.format.definition, "format");
      g.$data ? y() : h();
      function y() {
        const N = c.scopeValue("formats", {
          ref: E.formats,
          code: _.code.formats
        }), R = c.const("fmt", r._`${N}[${g.schemaCode}]`);
        u.fail$data(r.or(r._`typeof ${R} != "object"`, r._`${R} instanceof RegExp`, r._`typeof ${R}.compare != "function"`, w(R)));
      }
      function h() {
        const N = g.schema, R = E.formats[N];
        if (!R || R === !0)
          return;
        if (typeof R != "object" || R instanceof RegExp || typeof R.compare != "function")
          throw new Error(`"${m}": format "${N}" does not define "compare" function`);
        const T = c.scopeValue("formats", {
          key: N,
          ref: R,
          code: _.code.formats ? r._`${_.code.formats}${r.getProperty(N)}` : void 0
        });
        u.fail$data(w(T));
      }
      function w(N) {
        return r._`${N}.compare(${d}, ${l}) ${s[m].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const i = (u) => (u.addKeyword(e.formatLimitDefinition), u);
  e.default = i;
})(nu);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = ru, n = nu, s = Z, a = new s.Name("fullFormats"), i = new s.Name("fastFormats"), u = (d, l = { keywords: !0 }) => {
    if (Array.isArray(l))
      return c(d, l, r.fullFormats, a), d;
    const [m, P] = l.mode === "fast" ? [r.fastFormats, i] : [r.fullFormats, a], _ = l.formats || r.formatNames;
    return c(d, _, m, P), l.keywords && n.default(d), d;
  };
  u.get = (d, l = "full") => {
    const P = (l === "fast" ? r.fastFormats : r.fullFormats)[d];
    if (!P)
      throw new Error(`Unknown format "${d}"`);
    return P;
  };
  function c(d, l, m, P) {
    var _, E;
    (_ = (E = d.opts.code).formats) !== null && _ !== void 0 || (E.formats = s._`require("ajv-formats/dist/formats").${P}`);
    for (const g of l)
      d.addFormat(g, m[g]);
  }
  e.exports = t = u, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = u;
})(Bs, Bs.exports);
var Z0 = Bs.exports;
const x0 = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const s = Object.getOwnPropertyDescriptor(e, r), a = Object.getOwnPropertyDescriptor(t, r);
  !ev(s, a) && n || Object.defineProperty(e, r, a);
}, ev = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, tv = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, rv = (e, t) => `/* Wrapped ${e}*/
${t}`, nv = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), sv = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), av = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, s = rv.bind(null, n, t.toString());
  Object.defineProperty(s, "name", sv), Object.defineProperty(e, "toString", { ...nv, value: s });
}, ov = (e, t, { ignoreNonConfigurable: r = !1 } = {}) => {
  const { name: n } = e;
  for (const s of Reflect.ownKeys(t))
    x0(e, t, s, r);
  return tv(e, t), av(e, t, n), e;
};
var iv = ov;
const cv = iv;
var lv = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: r = 0,
    before: n = !1,
    after: s = !0
  } = t;
  if (!n && !s)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let a, i;
  const u = function(...c) {
    const d = this, l = () => {
      a = void 0, s && (i = e.apply(d, c));
    }, m = n && !a;
    return clearTimeout(a), a = setTimeout(l, r), m && (i = e.apply(d, c)), i;
  };
  return cv(u, e), u.cancel = () => {
    a && (clearTimeout(a), a = void 0);
  }, u;
}, na = { exports: {} };
const uv = "2.0.0", Hu = 256, dv = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, fv = 16, hv = Hu - 6, mv = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var $s = {
  MAX_LENGTH: Hu,
  MAX_SAFE_COMPONENT_LENGTH: fv,
  MAX_SAFE_BUILD_LENGTH: hv,
  MAX_SAFE_INTEGER: dv,
  RELEASE_TYPES: mv,
  SEMVER_SPEC_VERSION: uv,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const pv = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var ys = pv;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: s
  } = $s, a = ys;
  t = e.exports = {};
  const i = t.re = [], u = t.safeRe = [], c = t.src = [], d = t.safeSrc = [], l = t.t = {};
  let m = 0;
  const P = "[a-zA-Z0-9-]", _ = [
    ["\\s", 1],
    ["\\d", s],
    [P, n]
  ], E = (y) => {
    for (const [h, w] of _)
      y = y.split(`${h}*`).join(`${h}{0,${w}}`).split(`${h}+`).join(`${h}{1,${w}}`);
    return y;
  }, g = (y, h, w) => {
    const N = E(h), R = m++;
    a(y, R, h), l[y] = R, c[R] = h, d[R] = N, i[R] = new RegExp(h, w ? "g" : void 0), u[R] = new RegExp(N, w ? "g" : void 0);
  };
  g("NUMERICIDENTIFIER", "0|[1-9]\\d*"), g("NUMERICIDENTIFIERLOOSE", "\\d+"), g("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${P}*`), g("MAINVERSION", `(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})`), g("MAINVERSIONLOOSE", `(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASEIDENTIFIER", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIER]})`), g("PRERELEASEIDENTIFIERLOOSE", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASE", `(?:-(${c[l.PRERELEASEIDENTIFIER]}(?:\\.${c[l.PRERELEASEIDENTIFIER]})*))`), g("PRERELEASELOOSE", `(?:-?(${c[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[l.PRERELEASEIDENTIFIERLOOSE]})*))`), g("BUILDIDENTIFIER", `${P}+`), g("BUILD", `(?:\\+(${c[l.BUILDIDENTIFIER]}(?:\\.${c[l.BUILDIDENTIFIER]})*))`), g("FULLPLAIN", `v?${c[l.MAINVERSION]}${c[l.PRERELEASE]}?${c[l.BUILD]}?`), g("FULL", `^${c[l.FULLPLAIN]}$`), g("LOOSEPLAIN", `[v=\\s]*${c[l.MAINVERSIONLOOSE]}${c[l.PRERELEASELOOSE]}?${c[l.BUILD]}?`), g("LOOSE", `^${c[l.LOOSEPLAIN]}$`), g("GTLT", "((?:<|>)?=?)"), g("XRANGEIDENTIFIERLOOSE", `${c[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), g("XRANGEIDENTIFIER", `${c[l.NUMERICIDENTIFIER]}|x|X|\\*`), g("XRANGEPLAIN", `[v=\\s]*(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:${c[l.PRERELEASE]})?${c[l.BUILD]}?)?)?`), g("XRANGEPLAINLOOSE", `[v=\\s]*(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:${c[l.PRERELEASELOOSE]})?${c[l.BUILD]}?)?)?`), g("XRANGE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAIN]}$`), g("XRANGELOOSE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAINLOOSE]}$`), g("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), g("COERCE", `${c[l.COERCEPLAIN]}(?:$|[^\\d])`), g("COERCEFULL", c[l.COERCEPLAIN] + `(?:${c[l.PRERELEASE]})?(?:${c[l.BUILD]})?(?:$|[^\\d])`), g("COERCERTL", c[l.COERCE], !0), g("COERCERTLFULL", c[l.COERCEFULL], !0), g("LONETILDE", "(?:~>?)"), g("TILDETRIM", `(\\s*)${c[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", g("TILDE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAIN]}$`), g("TILDELOOSE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAINLOOSE]}$`), g("LONECARET", "(?:\\^)"), g("CARETTRIM", `(\\s*)${c[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", g("CARET", `^${c[l.LONECARET]}${c[l.XRANGEPLAIN]}$`), g("CARETLOOSE", `^${c[l.LONECARET]}${c[l.XRANGEPLAINLOOSE]}$`), g("COMPARATORLOOSE", `^${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]})$|^$`), g("COMPARATOR", `^${c[l.GTLT]}\\s*(${c[l.FULLPLAIN]})$|^$`), g("COMPARATORTRIM", `(\\s*)${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]}|${c[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", g("HYPHENRANGE", `^\\s*(${c[l.XRANGEPLAIN]})\\s+-\\s+(${c[l.XRANGEPLAIN]})\\s*$`), g("HYPHENRANGELOOSE", `^\\s*(${c[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[l.XRANGEPLAINLOOSE]})\\s*$`), g("STAR", "(<|>)?=?\\s*\\*"), g("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), g("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(na, na.exports);
var dn = na.exports;
const $v = Object.freeze({ loose: !0 }), yv = Object.freeze({}), _v = (e) => e ? typeof e != "object" ? $v : e : yv;
var ti = _v;
const sc = /^[0-9]+$/, Wu = (e, t) => {
  const r = sc.test(e), n = sc.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, gv = (e, t) => Wu(t, e);
var Ju = {
  compareIdentifiers: Wu,
  rcompareIdentifiers: gv
};
const Nn = ys, { MAX_LENGTH: ac, MAX_SAFE_INTEGER: On } = $s, { safeRe: Rn, t: In } = dn, vv = ti, { compareIdentifiers: dr } = Ju;
let wv = class at {
  constructor(t, r) {
    if (r = vv(r), t instanceof at) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > ac)
      throw new TypeError(
        `version is longer than ${ac} characters`
      );
    Nn("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? Rn[In.LOOSE] : Rn[In.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > On || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > On || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > On || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((s) => {
      if (/^[0-9]+$/.test(s)) {
        const a = +s;
        if (a >= 0 && a < On)
          return a;
      }
      return s;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (Nn("SemVer.compare", this.version, this.options, t), !(t instanceof at)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new at(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof at || (t = new at(t, this.options)), dr(this.major, t.major) || dr(this.minor, t.minor) || dr(this.patch, t.patch);
  }
  comparePre(t) {
    if (t instanceof at || (t = new at(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], s = t.prerelease[r];
      if (Nn("prerelease compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return dr(n, s);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof at || (t = new at(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], s = t.build[r];
      if (Nn("build compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return dr(n, s);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const s = `-${r}`.match(this.options.loose ? Rn[In.PRERELEASELOOSE] : Rn[In.PRERELEASE]);
        if (!s || s[1] !== r)
          throw new Error(`invalid identifier: ${r}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const s = Number(n) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [s];
        else {
          let a = this.prerelease.length;
          for (; --a >= 0; )
            typeof this.prerelease[a] == "number" && (this.prerelease[a]++, a = -2);
          if (a === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(s);
          }
        }
        if (r) {
          let a = [r, s];
          n === !1 && (a = [r]), dr(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = a) : this.prerelease = a;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var ke = wv;
const oc = ke, Ev = (e, t, r = !1) => {
  if (e instanceof oc)
    return e;
  try {
    return new oc(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var kr = Ev;
const Sv = kr, bv = (e, t) => {
  const r = Sv(e, t);
  return r ? r.version : null;
};
var Pv = bv;
const Nv = kr, Ov = (e, t) => {
  const r = Nv(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var Rv = Ov;
const ic = ke, Iv = (e, t, r, n, s) => {
  typeof r == "string" && (s = n, n = r, r = void 0);
  try {
    return new ic(
      e instanceof ic ? e.version : e,
      r
    ).inc(t, n, s).version;
  } catch {
    return null;
  }
};
var Tv = Iv;
const cc = kr, jv = (e, t) => {
  const r = cc(e, null, !0), n = cc(t, null, !0), s = r.compare(n);
  if (s === 0)
    return null;
  const a = s > 0, i = a ? r : n, u = a ? n : r, c = !!i.prerelease.length;
  if (!!u.prerelease.length && !c) {
    if (!u.patch && !u.minor)
      return "major";
    if (u.compareMain(i) === 0)
      return u.minor && !u.patch ? "minor" : "patch";
  }
  const l = c ? "pre" : "";
  return r.major !== n.major ? l + "major" : r.minor !== n.minor ? l + "minor" : r.patch !== n.patch ? l + "patch" : "prerelease";
};
var Av = jv;
const kv = ke, Cv = (e, t) => new kv(e, t).major;
var Dv = Cv;
const Mv = ke, Lv = (e, t) => new Mv(e, t).minor;
var Fv = Lv;
const Vv = ke, Uv = (e, t) => new Vv(e, t).patch;
var zv = Uv;
const qv = kr, Kv = (e, t) => {
  const r = qv(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var Gv = Kv;
const lc = ke, Hv = (e, t, r) => new lc(e, r).compare(new lc(t, r));
var nt = Hv;
const Wv = nt, Jv = (e, t, r) => Wv(t, e, r);
var Bv = Jv;
const Xv = nt, Yv = (e, t) => Xv(e, t, !0);
var Qv = Yv;
const uc = ke, Zv = (e, t, r) => {
  const n = new uc(e, r), s = new uc(t, r);
  return n.compare(s) || n.compareBuild(s);
};
var ri = Zv;
const xv = ri, ew = (e, t) => e.sort((r, n) => xv(r, n, t));
var tw = ew;
const rw = ri, nw = (e, t) => e.sort((r, n) => rw(n, r, t));
var sw = nw;
const aw = nt, ow = (e, t, r) => aw(e, t, r) > 0;
var _s = ow;
const iw = nt, cw = (e, t, r) => iw(e, t, r) < 0;
var ni = cw;
const lw = nt, uw = (e, t, r) => lw(e, t, r) === 0;
var Bu = uw;
const dw = nt, fw = (e, t, r) => dw(e, t, r) !== 0;
var Xu = fw;
const hw = nt, mw = (e, t, r) => hw(e, t, r) >= 0;
var si = mw;
const pw = nt, $w = (e, t, r) => pw(e, t, r) <= 0;
var ai = $w;
const yw = Bu, _w = Xu, gw = _s, vw = si, ww = ni, Ew = ai, Sw = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return yw(e, r, n);
    case "!=":
      return _w(e, r, n);
    case ">":
      return gw(e, r, n);
    case ">=":
      return vw(e, r, n);
    case "<":
      return ww(e, r, n);
    case "<=":
      return Ew(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Yu = Sw;
const bw = ke, Pw = kr, { safeRe: Tn, t: jn } = dn, Nw = (e, t) => {
  if (e instanceof bw)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? Tn[jn.COERCEFULL] : Tn[jn.COERCE]);
  else {
    const c = t.includePrerelease ? Tn[jn.COERCERTLFULL] : Tn[jn.COERCERTL];
    let d;
    for (; (d = c.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || d.index + d[0].length !== r.index + r[0].length) && (r = d), c.lastIndex = d.index + d[1].length + d[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], s = r[3] || "0", a = r[4] || "0", i = t.includePrerelease && r[5] ? `-${r[5]}` : "", u = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return Pw(`${n}.${s}.${a}${i}${u}`, t);
};
var Ow = Nw;
class Rw {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const s = this.map.keys().next().value;
        this.delete(s);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var Iw = Rw, ks, dc;
function st() {
  if (dc) return ks;
  dc = 1;
  const e = /\s+/g;
  class t {
    constructor(k, U) {
      if (U = s(U), k instanceof t)
        return k.loose === !!U.loose && k.includePrerelease === !!U.includePrerelease ? k : new t(k.raw, U);
      if (k instanceof a)
        return this.raw = k.value, this.set = [[k]], this.formatted = void 0, this;
      if (this.options = U, this.loose = !!U.loose, this.includePrerelease = !!U.includePrerelease, this.raw = k.trim().replace(e, " "), this.set = this.raw.split("||").map((D) => this.parseRange(D.trim())).filter((D) => D.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const D = this.set[0];
        if (this.set = this.set.filter((O) => !g(O[0])), this.set.length === 0)
          this.set = [D];
        else if (this.set.length > 1) {
          for (const O of this.set)
            if (O.length === 1 && y(O[0])) {
              this.set = [O];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let k = 0; k < this.set.length; k++) {
          k > 0 && (this.formatted += "||");
          const U = this.set[k];
          for (let D = 0; D < U.length; D++)
            D > 0 && (this.formatted += " "), this.formatted += U[D].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(k) {
      const D = ((this.options.includePrerelease && _) | (this.options.loose && E)) + ":" + k, O = n.get(D);
      if (O)
        return O;
      const I = this.options.loose, v = I ? c[d.HYPHENRANGELOOSE] : c[d.HYPHENRANGE];
      k = k.replace(v, Q(this.options.includePrerelease)), i("hyphen replace", k), k = k.replace(c[d.COMPARATORTRIM], l), i("comparator trim", k), k = k.replace(c[d.TILDETRIM], m), i("tilde trim", k), k = k.replace(c[d.CARETTRIM], P), i("caret trim", k);
      let p = k.split(" ").map((f) => w(f, this.options)).join(" ").split(/\s+/).map((f) => ne(f, this.options));
      I && (p = p.filter((f) => (i("loose invalid filter", f, this.options), !!f.match(c[d.COMPARATORLOOSE])))), i("range list", p);
      const S = /* @__PURE__ */ new Map(), $ = p.map((f) => new a(f, this.options));
      for (const f of $) {
        if (g(f))
          return [f];
        S.set(f.value, f);
      }
      S.size > 1 && S.has("") && S.delete("");
      const o = [...S.values()];
      return n.set(D, o), o;
    }
    intersects(k, U) {
      if (!(k instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((D) => h(D, U) && k.set.some((O) => h(O, U) && D.every((I) => O.every((v) => I.intersects(v, U)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(k) {
      if (!k)
        return !1;
      if (typeof k == "string")
        try {
          k = new u(k, this.options);
        } catch {
          return !1;
        }
      for (let U = 0; U < this.set.length; U++)
        if (de(this.set[U], k, this.options))
          return !0;
      return !1;
    }
  }
  ks = t;
  const r = Iw, n = new r(), s = ti, a = gs(), i = ys, u = ke, {
    safeRe: c,
    t: d,
    comparatorTrimReplace: l,
    tildeTrimReplace: m,
    caretTrimReplace: P
  } = dn, { FLAG_INCLUDE_PRERELEASE: _, FLAG_LOOSE: E } = $s, g = (C) => C.value === "<0.0.0-0", y = (C) => C.value === "", h = (C, k) => {
    let U = !0;
    const D = C.slice();
    let O = D.pop();
    for (; U && D.length; )
      U = D.every((I) => O.intersects(I, k)), O = D.pop();
    return U;
  }, w = (C, k) => (i("comp", C, k), C = z(C, k), i("caret", C), C = R(C, k), i("tildes", C), C = ue(C, k), i("xrange", C), C = H(C, k), i("stars", C), C), N = (C) => !C || C.toLowerCase() === "x" || C === "*", R = (C, k) => C.trim().split(/\s+/).map((U) => T(U, k)).join(" "), T = (C, k) => {
    const U = k.loose ? c[d.TILDELOOSE] : c[d.TILDE];
    return C.replace(U, (D, O, I, v, p) => {
      i("tilde", C, D, O, I, v, p);
      let S;
      return N(O) ? S = "" : N(I) ? S = `>=${O}.0.0 <${+O + 1}.0.0-0` : N(v) ? S = `>=${O}.${I}.0 <${O}.${+I + 1}.0-0` : p ? (i("replaceTilde pr", p), S = `>=${O}.${I}.${v}-${p} <${O}.${+I + 1}.0-0`) : S = `>=${O}.${I}.${v} <${O}.${+I + 1}.0-0`, i("tilde return", S), S;
    });
  }, z = (C, k) => C.trim().split(/\s+/).map((U) => W(U, k)).join(" "), W = (C, k) => {
    i("caret", C, k);
    const U = k.loose ? c[d.CARETLOOSE] : c[d.CARET], D = k.includePrerelease ? "-0" : "";
    return C.replace(U, (O, I, v, p, S) => {
      i("caret", C, O, I, v, p, S);
      let $;
      return N(I) ? $ = "" : N(v) ? $ = `>=${I}.0.0${D} <${+I + 1}.0.0-0` : N(p) ? I === "0" ? $ = `>=${I}.${v}.0${D} <${I}.${+v + 1}.0-0` : $ = `>=${I}.${v}.0${D} <${+I + 1}.0.0-0` : S ? (i("replaceCaret pr", S), I === "0" ? v === "0" ? $ = `>=${I}.${v}.${p}-${S} <${I}.${v}.${+p + 1}-0` : $ = `>=${I}.${v}.${p}-${S} <${I}.${+v + 1}.0-0` : $ = `>=${I}.${v}.${p}-${S} <${+I + 1}.0.0-0`) : (i("no pr"), I === "0" ? v === "0" ? $ = `>=${I}.${v}.${p}${D} <${I}.${v}.${+p + 1}-0` : $ = `>=${I}.${v}.${p}${D} <${I}.${+v + 1}.0-0` : $ = `>=${I}.${v}.${p} <${+I + 1}.0.0-0`), i("caret return", $), $;
    });
  }, ue = (C, k) => (i("replaceXRanges", C, k), C.split(/\s+/).map((U) => V(U, k)).join(" ")), V = (C, k) => {
    C = C.trim();
    const U = k.loose ? c[d.XRANGELOOSE] : c[d.XRANGE];
    return C.replace(U, (D, O, I, v, p, S) => {
      i("xRange", C, D, O, I, v, p, S);
      const $ = N(I), o = $ || N(v), f = o || N(p), b = f;
      return O === "=" && b && (O = ""), S = k.includePrerelease ? "-0" : "", $ ? O === ">" || O === "<" ? D = "<0.0.0-0" : D = "*" : O && b ? (o && (v = 0), p = 0, O === ">" ? (O = ">=", o ? (I = +I + 1, v = 0, p = 0) : (v = +v + 1, p = 0)) : O === "<=" && (O = "<", o ? I = +I + 1 : v = +v + 1), O === "<" && (S = "-0"), D = `${O + I}.${v}.${p}${S}`) : o ? D = `>=${I}.0.0${S} <${+I + 1}.0.0-0` : f && (D = `>=${I}.${v}.0${S} <${I}.${+v + 1}.0-0`), i("xRange return", D), D;
    });
  }, H = (C, k) => (i("replaceStars", C, k), C.trim().replace(c[d.STAR], "")), ne = (C, k) => (i("replaceGTE0", C, k), C.trim().replace(c[k.includePrerelease ? d.GTE0PRE : d.GTE0], "")), Q = (C) => (k, U, D, O, I, v, p, S, $, o, f, b) => (N(D) ? U = "" : N(O) ? U = `>=${D}.0.0${C ? "-0" : ""}` : N(I) ? U = `>=${D}.${O}.0${C ? "-0" : ""}` : v ? U = `>=${U}` : U = `>=${U}${C ? "-0" : ""}`, N($) ? S = "" : N(o) ? S = `<${+$ + 1}.0.0-0` : N(f) ? S = `<${$}.${+o + 1}.0-0` : b ? S = `<=${$}.${o}.${f}-${b}` : C ? S = `<${$}.${o}.${+f + 1}-0` : S = `<=${S}`, `${U} ${S}`.trim()), de = (C, k, U) => {
    for (let D = 0; D < C.length; D++)
      if (!C[D].test(k))
        return !1;
    if (k.prerelease.length && !U.includePrerelease) {
      for (let D = 0; D < C.length; D++)
        if (i(C[D].semver), C[D].semver !== a.ANY && C[D].semver.prerelease.length > 0) {
          const O = C[D].semver;
          if (O.major === k.major && O.minor === k.minor && O.patch === k.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return ks;
}
var Cs, fc;
function gs() {
  if (fc) return Cs;
  fc = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(l, m) {
      if (m = r(m), l instanceof t) {
        if (l.loose === !!m.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), i("comparator", l, m), this.options = m, this.loose = !!m.loose, this.parse(l), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, i("comp", this);
    }
    parse(l) {
      const m = this.options.loose ? n[s.COMPARATORLOOSE] : n[s.COMPARATOR], P = l.match(m);
      if (!P)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = P[1] !== void 0 ? P[1] : "", this.operator === "=" && (this.operator = ""), P[2] ? this.semver = new u(P[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (i("Comparator.test", l, this.options.loose), this.semver === e || l === e)
        return !0;
      if (typeof l == "string")
        try {
          l = new u(l, this.options);
        } catch {
          return !1;
        }
      return a(l, this.operator, this.semver, this.options);
    }
    intersects(l, m) {
      if (!(l instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(l.value, m).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new c(this.value, m).test(l.semver) : (m = r(m), m.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !m.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || a(this.semver, "<", l.semver, m) && this.operator.startsWith(">") && l.operator.startsWith("<") || a(this.semver, ">", l.semver, m) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  Cs = t;
  const r = ti, { safeRe: n, t: s } = dn, a = Yu, i = ys, u = ke, c = st();
  return Cs;
}
const Tw = st(), jw = (e, t, r) => {
  try {
    t = new Tw(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var vs = jw;
const Aw = st(), kw = (e, t) => new Aw(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var Cw = kw;
const Dw = ke, Mw = st(), Lw = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new Mw(t, r);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    a.test(i) && (!n || s.compare(i) === -1) && (n = i, s = new Dw(n, r));
  }), n;
};
var Fw = Lw;
const Vw = ke, Uw = st(), zw = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new Uw(t, r);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    a.test(i) && (!n || s.compare(i) === 1) && (n = i, s = new Vw(n, r));
  }), n;
};
var qw = zw;
const Ds = ke, Kw = st(), hc = _s, Gw = (e, t) => {
  e = new Kw(e, t);
  let r = new Ds("0.0.0");
  if (e.test(r) || (r = new Ds("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const s = e.set[n];
    let a = null;
    s.forEach((i) => {
      const u = new Ds(i.semver.version);
      switch (i.operator) {
        case ">":
          u.prerelease.length === 0 ? u.patch++ : u.prerelease.push(0), u.raw = u.format();
        case "":
        case ">=":
          (!a || hc(u, a)) && (a = u);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${i.operator}`);
      }
    }), a && (!r || hc(r, a)) && (r = a);
  }
  return r && e.test(r) ? r : null;
};
var Hw = Gw;
const Ww = st(), Jw = (e, t) => {
  try {
    return new Ww(e, t).range || "*";
  } catch {
    return null;
  }
};
var Bw = Jw;
const Xw = ke, Qu = gs(), { ANY: Yw } = Qu, Qw = st(), Zw = vs, mc = _s, pc = ni, xw = ai, eE = si, tE = (e, t, r, n) => {
  e = new Xw(e, n), t = new Qw(t, n);
  let s, a, i, u, c;
  switch (r) {
    case ">":
      s = mc, a = xw, i = pc, u = ">", c = ">=";
      break;
    case "<":
      s = pc, a = eE, i = mc, u = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (Zw(e, t, n))
    return !1;
  for (let d = 0; d < t.set.length; ++d) {
    const l = t.set[d];
    let m = null, P = null;
    if (l.forEach((_) => {
      _.semver === Yw && (_ = new Qu(">=0.0.0")), m = m || _, P = P || _, s(_.semver, m.semver, n) ? m = _ : i(_.semver, P.semver, n) && (P = _);
    }), m.operator === u || m.operator === c || (!P.operator || P.operator === u) && a(e, P.semver))
      return !1;
    if (P.operator === c && i(e, P.semver))
      return !1;
  }
  return !0;
};
var oi = tE;
const rE = oi, nE = (e, t, r) => rE(e, t, ">", r);
var sE = nE;
const aE = oi, oE = (e, t, r) => aE(e, t, "<", r);
var iE = oE;
const $c = st(), cE = (e, t, r) => (e = new $c(e, r), t = new $c(t, r), e.intersects(t, r));
var lE = cE;
const uE = vs, dE = nt;
var fE = (e, t, r) => {
  const n = [];
  let s = null, a = null;
  const i = e.sort((l, m) => dE(l, m, r));
  for (const l of i)
    uE(l, t, r) ? (a = l, s || (s = l)) : (a && n.push([s, a]), a = null, s = null);
  s && n.push([s, null]);
  const u = [];
  for (const [l, m] of n)
    l === m ? u.push(l) : !m && l === i[0] ? u.push("*") : m ? l === i[0] ? u.push(`<=${m}`) : u.push(`${l} - ${m}`) : u.push(`>=${l}`);
  const c = u.join(" || "), d = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < d.length ? c : t;
};
const yc = st(), ii = gs(), { ANY: Ms } = ii, Ur = vs, ci = nt, hE = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new yc(e, r), t = new yc(t, r);
  let n = !1;
  e: for (const s of e.set) {
    for (const a of t.set) {
      const i = pE(s, a, r);
      if (n = n || i !== null, i)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, mE = [new ii(">=0.0.0-0")], _c = [new ii(">=0.0.0")], pE = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Ms) {
    if (t.length === 1 && t[0].semver === Ms)
      return !0;
    r.includePrerelease ? e = mE : e = _c;
  }
  if (t.length === 1 && t[0].semver === Ms) {
    if (r.includePrerelease)
      return !0;
    t = _c;
  }
  const n = /* @__PURE__ */ new Set();
  let s, a;
  for (const _ of e)
    _.operator === ">" || _.operator === ">=" ? s = gc(s, _, r) : _.operator === "<" || _.operator === "<=" ? a = vc(a, _, r) : n.add(_.semver);
  if (n.size > 1)
    return null;
  let i;
  if (s && a) {
    if (i = ci(s.semver, a.semver, r), i > 0)
      return null;
    if (i === 0 && (s.operator !== ">=" || a.operator !== "<="))
      return null;
  }
  for (const _ of n) {
    if (s && !Ur(_, String(s), r) || a && !Ur(_, String(a), r))
      return null;
    for (const E of t)
      if (!Ur(_, String(E), r))
        return !1;
    return !0;
  }
  let u, c, d, l, m = a && !r.includePrerelease && a.semver.prerelease.length ? a.semver : !1, P = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
  m && m.prerelease.length === 1 && a.operator === "<" && m.prerelease[0] === 0 && (m = !1);
  for (const _ of t) {
    if (l = l || _.operator === ">" || _.operator === ">=", d = d || _.operator === "<" || _.operator === "<=", s) {
      if (P && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === P.major && _.semver.minor === P.minor && _.semver.patch === P.patch && (P = !1), _.operator === ">" || _.operator === ">=") {
        if (u = gc(s, _, r), u === _ && u !== s)
          return !1;
      } else if (s.operator === ">=" && !Ur(s.semver, String(_), r))
        return !1;
    }
    if (a) {
      if (m && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === m.major && _.semver.minor === m.minor && _.semver.patch === m.patch && (m = !1), _.operator === "<" || _.operator === "<=") {
        if (c = vc(a, _, r), c === _ && c !== a)
          return !1;
      } else if (a.operator === "<=" && !Ur(a.semver, String(_), r))
        return !1;
    }
    if (!_.operator && (a || s) && i !== 0)
      return !1;
  }
  return !(s && d && !a && i !== 0 || a && l && !s && i !== 0 || P || m);
}, gc = (e, t, r) => {
  if (!e)
    return t;
  const n = ci(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, vc = (e, t, r) => {
  if (!e)
    return t;
  const n = ci(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var $E = hE;
const Ls = dn, wc = $s, yE = ke, Ec = Ju, _E = kr, gE = Pv, vE = Rv, wE = Tv, EE = Av, SE = Dv, bE = Fv, PE = zv, NE = Gv, OE = nt, RE = Bv, IE = Qv, TE = ri, jE = tw, AE = sw, kE = _s, CE = ni, DE = Bu, ME = Xu, LE = si, FE = ai, VE = Yu, UE = Ow, zE = gs(), qE = st(), KE = vs, GE = Cw, HE = Fw, WE = qw, JE = Hw, BE = Bw, XE = oi, YE = sE, QE = iE, ZE = lE, xE = fE, eS = $E;
var tS = {
  parse: _E,
  valid: gE,
  clean: vE,
  inc: wE,
  diff: EE,
  major: SE,
  minor: bE,
  patch: PE,
  prerelease: NE,
  compare: OE,
  rcompare: RE,
  compareLoose: IE,
  compareBuild: TE,
  sort: jE,
  rsort: AE,
  gt: kE,
  lt: CE,
  eq: DE,
  neq: ME,
  gte: LE,
  lte: FE,
  cmp: VE,
  coerce: UE,
  Comparator: zE,
  Range: qE,
  satisfies: KE,
  toComparators: GE,
  maxSatisfying: HE,
  minSatisfying: WE,
  minVersion: JE,
  validRange: BE,
  outside: XE,
  gtr: YE,
  ltr: QE,
  intersects: ZE,
  simplifyRange: xE,
  subset: eS,
  SemVer: yE,
  re: Ls.re,
  src: Ls.src,
  tokens: Ls.t,
  SEMVER_SPEC_VERSION: wc.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: wc.RELEASE_TYPES,
  compareIdentifiers: Ec.compareIdentifiers,
  rcompareIdentifiers: Ec.rcompareIdentifiers
}, ws = { exports: {} }, li = { exports: {} };
const Zu = (e, t) => {
  for (const r of Reflect.ownKeys(t))
    Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
  return e;
};
li.exports = Zu;
li.exports.default = Zu;
var rS = li.exports;
const nS = rS, es = /* @__PURE__ */ new WeakMap(), xu = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let r, n = 0;
  const s = e.displayName || e.name || "<anonymous>", a = function(...i) {
    if (es.set(a, ++n), n === 1)
      r = e.apply(this, i), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${s}\` can only be called once`);
    return r;
  };
  return nS(a, e), es.set(a, n), a;
};
ws.exports = xu;
ws.exports.default = xu;
ws.exports.callCount = (e) => {
  if (!es.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return es.get(e);
};
var sS = ws.exports;
(function(e, t) {
  var r = fn && fn.__classPrivateFieldSet || function(D, O, I, v, p) {
    if (v === "m") throw new TypeError("Private method is not writable");
    if (v === "a" && !p) throw new TypeError("Private accessor was defined without a setter");
    if (typeof O == "function" ? D !== O || !p : !O.has(D)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return v === "a" ? p.call(D, I) : p ? p.value = I : O.set(D, I), I;
  }, n = fn && fn.__classPrivateFieldGet || function(D, O, I, v) {
    if (I === "a" && !v) throw new TypeError("Private accessor was defined without a getter");
    if (typeof O == "function" ? D !== O || !v : !O.has(D)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return I === "m" ? v : I === "a" ? v.call(D) : v ? v.value : O.get(D);
  }, s, a, i, u, c, d;
  Object.defineProperty(t, "__esModule", { value: !0 });
  const l = Ac, m = aa, P = sr, _ = sd, E = ad, g = od, y = md, h = Pd, w = Id, N = ct, R = U$, T = Z0, z = lv, W = tS, ue = sS, V = "aes-256-cbc", H = () => /* @__PURE__ */ Object.create(null), ne = (D) => D != null;
  let Q = "";
  try {
    delete require.cache[__filename], Q = P.dirname((a = (s = e.parent) === null || s === void 0 ? void 0 : s.filename) !== null && a !== void 0 ? a : ".");
  } catch {
  }
  const de = (D, O) => {
    const I = /* @__PURE__ */ new Set([
      "undefined",
      "symbol",
      "function"
    ]), v = typeof O;
    if (I.has(v))
      throw new TypeError(`Setting a value of type \`${v}\` for key \`${D}\` is not allowed as it's not supported by JSON`);
  }, C = "__internal__", k = `${C}.migrations.version`;
  class U {
    constructor(O = {}) {
      var I;
      i.set(this, void 0), u.set(this, void 0), c.set(this, void 0), d.set(this, {}), this._deserialize = (f) => JSON.parse(f), this._serialize = (f) => JSON.stringify(f, void 0, "	");
      const v = {
        configName: "config",
        fileExtension: "json",
        projectSuffix: "nodejs",
        clearInvalidConfig: !1,
        accessPropertiesByDotNotation: !0,
        configFileMode: 438,
        ...O
      }, p = ue(() => {
        const f = h.sync({ cwd: Q }), b = f && JSON.parse(m.readFileSync(f, "utf8"));
        return b ?? {};
      });
      if (!v.cwd) {
        if (v.projectName || (v.projectName = p().name), !v.projectName)
          throw new Error("Project name could not be inferred. Please specify the `projectName` option.");
        v.cwd = w(v.projectName, { suffix: v.projectSuffix }).config;
      }
      if (r(this, c, v, "f"), v.schema) {
        if (typeof v.schema != "object")
          throw new TypeError("The `schema` option must be an object.");
        const f = new R.default({
          allErrors: !0,
          useDefaults: !0
        });
        (0, T.default)(f);
        const b = {
          type: "object",
          properties: v.schema
        };
        r(this, i, f.compile(b), "f");
        for (const [j, A] of Object.entries(v.schema))
          A != null && A.default && (n(this, d, "f")[j] = A.default);
      }
      v.defaults && r(this, d, {
        ...n(this, d, "f"),
        ...v.defaults
      }, "f"), v.serialize && (this._serialize = v.serialize), v.deserialize && (this._deserialize = v.deserialize), this.events = new g.EventEmitter(), r(this, u, v.encryptionKey, "f");
      const S = v.fileExtension ? `.${v.fileExtension}` : "";
      this.path = P.resolve(v.cwd, `${(I = v.configName) !== null && I !== void 0 ? I : "config"}${S}`);
      const $ = this.store, o = Object.assign(H(), v.defaults, $);
      this._validate(o);
      try {
        E.deepEqual($, o);
      } catch {
        this.store = o;
      }
      if (v.watch && this._watch(), v.migrations) {
        if (v.projectVersion || (v.projectVersion = p().version), !v.projectVersion)
          throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
        this._migrate(v.migrations, v.projectVersion, v.beforeEachMigration);
      }
    }
    get(O, I) {
      if (n(this, c, "f").accessPropertiesByDotNotation)
        return this._get(O, I);
      const { store: v } = this;
      return O in v ? v[O] : I;
    }
    set(O, I) {
      if (typeof O != "string" && typeof O != "object")
        throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof O}`);
      if (typeof O != "object" && I === void 0)
        throw new TypeError("Use `delete()` to clear values");
      if (this._containsReservedKey(O))
        throw new TypeError(`Please don't use the ${C} key, as it's used to manage this module internal operations.`);
      const { store: v } = this, p = (S, $) => {
        de(S, $), n(this, c, "f").accessPropertiesByDotNotation ? y.set(v, S, $) : v[S] = $;
      };
      if (typeof O == "object") {
        const S = O;
        for (const [$, o] of Object.entries(S))
          p($, o);
      } else
        p(O, I);
      this.store = v;
    }
    /**
        Check if an item exists.
    
        @param key - The key of the item to check.
        */
    has(O) {
      return n(this, c, "f").accessPropertiesByDotNotation ? y.has(this.store, O) : O in this.store;
    }
    /**
        Reset items to their default values, as defined by the `defaults` or `schema` option.
    
        @see `clear()` to reset all items.
    
        @param keys - The keys of the items to reset.
        */
    reset(...O) {
      for (const I of O)
        ne(n(this, d, "f")[I]) && this.set(I, n(this, d, "f")[I]);
    }
    /**
        Delete an item.
    
        @param key - The key of the item to delete.
        */
    delete(O) {
      const { store: I } = this;
      n(this, c, "f").accessPropertiesByDotNotation ? y.delete(I, O) : delete I[O], this.store = I;
    }
    /**
        Delete all items.
    
        This resets known items to their default values, if defined by the `defaults` or `schema` option.
        */
    clear() {
      this.store = H();
      for (const O of Object.keys(n(this, d, "f")))
        this.reset(O);
    }
    /**
        Watches the given `key`, calling `callback` on any changes.
    
        @param key - The key wo watch.
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidChange(O, I) {
      if (typeof O != "string")
        throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof O}`);
      if (typeof I != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof I}`);
      return this._handleChange(() => this.get(O), I);
    }
    /**
        Watches the whole config object, calling `callback` on any changes.
    
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidAnyChange(O) {
      if (typeof O != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof O}`);
      return this._handleChange(() => this.store, O);
    }
    get size() {
      return Object.keys(this.store).length;
    }
    get store() {
      try {
        const O = m.readFileSync(this.path, n(this, u, "f") ? null : "utf8"), I = this._encryptData(O), v = this._deserialize(I);
        return this._validate(v), Object.assign(H(), v);
      } catch (O) {
        if ((O == null ? void 0 : O.code) === "ENOENT")
          return this._ensureDirectory(), H();
        if (n(this, c, "f").clearInvalidConfig && O.name === "SyntaxError")
          return H();
        throw O;
      }
    }
    set store(O) {
      this._ensureDirectory(), this._validate(O), this._write(O), this.events.emit("change");
    }
    *[(i = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
      for (const [O, I] of Object.entries(this.store))
        yield [O, I];
    }
    _encryptData(O) {
      if (!n(this, u, "f"))
        return O.toString();
      try {
        if (n(this, u, "f"))
          try {
            if (O.slice(16, 17).toString() === ":") {
              const I = O.slice(0, 16), v = _.pbkdf2Sync(n(this, u, "f"), I.toString(), 1e4, 32, "sha512"), p = _.createDecipheriv(V, v, I);
              O = Buffer.concat([p.update(Buffer.from(O.slice(17))), p.final()]).toString("utf8");
            } else {
              const I = _.createDecipher(V, n(this, u, "f"));
              O = Buffer.concat([I.update(Buffer.from(O)), I.final()]).toString("utf8");
            }
          } catch {
          }
      } catch {
      }
      return O.toString();
    }
    _handleChange(O, I) {
      let v = O();
      const p = () => {
        const S = v, $ = O();
        (0, l.isDeepStrictEqual)($, S) || (v = $, I.call(this, $, S));
      };
      return this.events.on("change", p), () => this.events.removeListener("change", p);
    }
    _validate(O) {
      if (!n(this, i, "f") || n(this, i, "f").call(this, O) || !n(this, i, "f").errors)
        return;
      const v = n(this, i, "f").errors.map(({ instancePath: p, message: S = "" }) => `\`${p.slice(1)}\` ${S}`);
      throw new Error("Config schema violation: " + v.join("; "));
    }
    _ensureDirectory() {
      m.mkdirSync(P.dirname(this.path), { recursive: !0 });
    }
    _write(O) {
      let I = this._serialize(O);
      if (n(this, u, "f")) {
        const v = _.randomBytes(16), p = _.pbkdf2Sync(n(this, u, "f"), v.toString(), 1e4, 32, "sha512"), S = _.createCipheriv(V, p, v);
        I = Buffer.concat([v, Buffer.from(":"), S.update(Buffer.from(I)), S.final()]);
      }
      if (process.env.SNAP)
        m.writeFileSync(this.path, I, { mode: n(this, c, "f").configFileMode });
      else
        try {
          N.writeFileSync(this.path, I, { mode: n(this, c, "f").configFileMode });
        } catch (v) {
          if ((v == null ? void 0 : v.code) === "EXDEV") {
            m.writeFileSync(this.path, I, { mode: n(this, c, "f").configFileMode });
            return;
          }
          throw v;
        }
    }
    _watch() {
      this._ensureDirectory(), m.existsSync(this.path) || this._write(H()), process.platform === "win32" ? m.watch(this.path, { persistent: !1 }, z(() => {
        this.events.emit("change");
      }, { wait: 100 })) : m.watchFile(this.path, { persistent: !1 }, z(() => {
        this.events.emit("change");
      }, { wait: 5e3 }));
    }
    _migrate(O, I, v) {
      let p = this._get(k, "0.0.0");
      const S = Object.keys(O).filter((o) => this._shouldPerformMigration(o, p, I));
      let $ = { ...this.store };
      for (const o of S)
        try {
          v && v(this, {
            fromVersion: p,
            toVersion: o,
            finalVersion: I,
            versions: S
          });
          const f = O[o];
          f(this), this._set(k, o), p = o, $ = { ...this.store };
        } catch (f) {
          throw this.store = $, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${f}`);
        }
      (this._isVersionInRangeFormat(p) || !W.eq(p, I)) && this._set(k, I);
    }
    _containsReservedKey(O) {
      return typeof O == "object" && Object.keys(O)[0] === C ? !0 : typeof O != "string" ? !1 : n(this, c, "f").accessPropertiesByDotNotation ? !!O.startsWith(`${C}.`) : !1;
    }
    _isVersionInRangeFormat(O) {
      return W.clean(O) === null;
    }
    _shouldPerformMigration(O, I, v) {
      return this._isVersionInRangeFormat(O) ? I !== "0.0.0" && W.satisfies(I, O) ? !1 : W.satisfies(v, O) : !(W.lte(O, I) || W.gt(O, v));
    }
    _get(O, I) {
      return y.get(this.store, O, I);
    }
    _set(O, I) {
      const { store: v } = this;
      y.set(v, O, I), this.store = v;
    }
  }
  t.default = U, e.exports = U, e.exports.default = U;
})(Fs, Fs.exports);
var aS = Fs.exports;
const Sc = sr, { app: qn, ipcMain: sa, ipcRenderer: bc, shell: oS } = td, iS = aS;
let Pc = !1;
const Nc = () => {
  if (!sa || !qn)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: qn.getPath("userData"),
    appVersion: qn.getVersion()
  };
  return Pc || (sa.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), Pc = !0), e;
};
class cS extends iS {
  constructor(t) {
    let r, n;
    if (bc) {
      const s = bc.sendSync("electron-store-get-data");
      if (!s)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = s);
    } else sa && qn && ({ defaultCwd: r, appVersion: n } = Nc());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = Sc.isAbsolute(t.cwd) ? t.cwd : Sc.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    Nc();
  }
  async openInEditor() {
    const t = await oS.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var lS = cS;
const or = /* @__PURE__ */ ud(lS), Oc = new or();
let ze = null;
function ed() {
  ze = new ft({
    icon: Ve.join(Nr, "electron-vite.svg"),
    show: !1,
    frame: !1,
    webPreferences: {
      preload: rs,
      contextIsolation: !0,
      nodeIntegration: !1
    },
    minWidth: 800,
    minHeight: 600,
    height: 600,
    width: 800
  });
  const e = Oc.get("theme") || "light", t = Oc.get("palette") || "default";
  ze.webContents.on("did-finish-load", () => {
    ze == null || ze.webContents.send("update-theme", e), ze == null || ze.webContents.send("update-palette", t), ze == null || ze.show();
  }), ar ? ze.loadURL(Dc) : ze.loadFile(Ve.join(nn, "index.html"));
}
function uS() {
  pr.on("window-all-closed", () => {
    process.platform !== "darwin" && pr.quit();
  }), pr.on("activate", () => {
    ft.getAllWindows().length === 0 && ed();
  });
}
function dS() {
  let e;
  He.on("window-minimize", () => {
    e = ft.getFocusedWindow(), e && e.minimize();
  }), He.on("window-toggle-maximize", () => {
    e = ft.getFocusedWindow(), e && (e.isMaximized() ? e.unmaximize() : e.maximize());
  }), He.on("window-close", () => {
    e = ft.getFocusedWindow(), e && e.close();
  });
}
const Rc = new or();
let ye = null;
function fS() {
  ye = new ft({
    icon: Ve.join(Nr, "electron-vite.svg"),
    show: !1,
    frame: !1,
    title: "settings",
    webPreferences: {
      preload: rs,
      contextIsolation: !0,
      nodeIntegration: !1
    },
    minWidth: 800,
    minHeight: 600,
    height: 600,
    width: 800
  });
  const e = Rc.get("theme") || "light", t = Rc.get("palette") || "default";
  ye.webContents.on("did-finish-load", () => {
    ye == null || ye.webContents.send("update-theme", e), ye == null || ye.webContents.send("update-palette", t), ye == null || ye.show();
  }), ye.on("closed", () => {
    ye = null;
  }), ar ? ye.loadURL(Mc) : ye.loadURL(`file://${nn}/index.html#/settings`);
}
const Ic = new or();
let _e = null;
function hS() {
  _e = new ft({
    icon: Ve.join(Nr, "electron-vite.svg"),
    show: !1,
    frame: !1,
    title: "dev",
    webPreferences: {
      preload: rs,
      contextIsolation: !0,
      nodeIntegration: !1
    },
    minWidth: 800,
    minHeight: 600,
    height: 600,
    width: 800
  });
  const e = Ic.get("theme") || "light", t = Ic.get("palette") || "default";
  _e.webContents.on("did-finish-load", () => {
    _e == null || _e.webContents.send("update-theme", e), _e == null || _e.webContents.send("update-palette", t), _e == null || _e.show();
  }), _e.on("closed", () => {
    _e = null;
  }), ar ? _e.loadURL(Lc) : _e.loadURL(`file://${nn}/index.html#/dev`);
}
function mS() {
  He.on("open-settings-window", () => {
    ye != null && ye.isClosable ? ye.focus() : fS();
  }), He.on("open-dev-window", () => {
    _e != null && _e.isClosable ? _e.focus() : hS();
  });
}
const An = new or();
function pS() {
  He.handle("get-theme", async () => {
    const e = An.get("theme");
    return e === "light" || e === "dark" ? e : "light";
  }), He.handle("get-palette", async () => {
    const e = An.get("palette");
    return typeof e == "string" ? e : "default";
  }), pr.whenReady().then(() => {
    He.on("set-theme", (e, t) => {
      An.set("theme", t), ft.getAllWindows().forEach((r) => {
        r.webContents.send("update-theme", t);
      });
    }), He.on("set-palette", (e, t) => {
      An.set("palette", t), ft.getAllWindows().forEach((r) => {
        r.webContents.send("update-palette", t);
      });
    });
  });
}
const zr = new or();
function $S() {
  Tc("tools", Fc, ia), Tc("theme", Vc, ca);
}
function Tc(e, t, r) {
  zr.has(`${e}-dir`) || (ar ? zr.set(`${e}-dir`, t) : zr.set(`${e}-dir`, r)), He.handle(`get-${e}-dir`, async () => zr.get(`${e}-dir`)), pr.whenReady().then(() => {
    He.on(`set-${e}-dir`, (n, s) => {
      zr.set(`${e}-dir`, s), ft.getAllWindows().forEach((a) => {
        a.webContents.send(`update-${e}-dir`, s);
      });
    });
  });
}
const yS = new or();
function _S() {
  He.handle("get-constains", () => ({
    __filename: kc,
    __dirname: ts,
    __approot: oa,
    __preloadpath: rs,
    tool_dir: ia,
    theme_dir: ca,
    MAIN_WINDOW_DEV_URL: Dc,
    SETTINGS_WINDOW_DEV_URL: Mc,
    TOOL_WINDOW_DEV_URL: cd,
    DEV_WINDOW_DEV_URL: Lc,
    CREATE_FOLDER_WINDOW_DEV_URL: ld,
    VITE_DEV_SERVER_URL: ar,
    RENDERER_DIST: nn,
    VITE_PUBLIC: Nr,
    TOOL_DIR_DEV_PATH: Fc,
    THEME_DIR_DEV_PATH: Vc
  })), He.handle("get-store", () => yS.store);
}
const Ke = new or();
function gS() {
  ar ? (Ke.set("mode", "dev"), Ke.has("incilizated") && Ke.delete("incilizated")) : (Ke.set("mode", "production"), Ke.has("incilizated") || Ke.set("incilizated", !1)), Ke.has("incilizated") && (Ke.get("incilizated") || (Ke.delete("tools-dir"), Ke.delete("theme-dir"), jc("tools", ia), jc("theme", ca), Ke.set("incilizated", !0)));
}
function jc(e, t) {
  Ke.has(`${e}-dir`) || Ke.set(`${e}-dir`, t);
}
function vS() {
  uS(), dS(), mS(), pS(), $S(), _S(), pr.whenReady().then(() => {
    rd.registerFileProtocol("save-file", (e, t) => {
      const r = e.url.replace("save-file://", "");
      try {
        t(decodeURIComponent(r));
      } catch (n) {
        console.error("Protocol error:", n), t({ error: -6 });
      }
    }), gS(), ed();
  }).catch((e) => {
    console.error("Failed to create window:", e);
  });
}
vS();
