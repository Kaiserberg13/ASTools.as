import dd, { BrowserWindow as Ze, app as wr, ipcMain as ue, dialog as fd, protocol as hd } from "electron";
import Pe from "node:path";
import { fileURLToPath as md } from "node:url";
import Be from "path";
import zc, { promisify as pd } from "util";
import ho from "fs";
import $d from "crypto";
import yd from "assert";
import _d from "events";
import gd from "os";
import Qt from "fs/promises";
import { exec as vd } from "child_process";
const qc = md(import.meta.url), ls = Pe.dirname(qc), Ar = Pe.join(ls, ".."), mo = Pe.join(ls, "../../.."), kr = Pe.join(ls, "preload.mjs"), po = Pe.join(mo, "Tools"), $o = Pe.join(mo, "Themes"), Kc = "http://localhost:3000/", Gc = "http://localhost:3000/#/settings", Hc = "http://localhost:3000/#/tool", Wc = "http://localhost:3000/#/dev", Jc = "http://localhost:3000/#/add-folder", xe = process.env.VITE_DEV_SERVER_URL, fr = Pe.join(Ar, "dist"), Cr = xe ? Pe.join(Ar, "public") : fr, Yn = Pe.join(Ar, "import", "Tools"), Bc = Pe.join(Ar, "import", "Theme"), Xc = xe ? Pe.join(Ar, "emulator/astools_emulator.py") : Pe.join(mo, "scripts/astools_emulator.py");
var gn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function wd(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Hs = { exports: {} }, Ed = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
};
const Zt = Ed, Sd = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), bd = (e) => !e.some((t) => Sd.has(t));
function vn(e) {
  const t = e.split("."), r = [];
  for (let n = 0; n < t.length; n++) {
    let s = t[n];
    for (; s[s.length - 1] === "\\" && t[n + 1] !== void 0; )
      s = s.slice(0, -1) + ".", s += t[++n];
    r.push(s);
  }
  return bd(r) ? r : [];
}
var Pd = {
  get(e, t, r) {
    if (!Zt(e) || typeof t != "string")
      return r === void 0 ? e : r;
    const n = vn(t);
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
    if (!Zt(e) || typeof t != "string")
      return e;
    const n = e, s = vn(t);
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      Zt(e[i]) || (e[i] = {}), o === s.length - 1 && (e[i] = r), e = e[i];
    }
    return n;
  },
  delete(e, t) {
    if (!Zt(e) || typeof t != "string")
      return !1;
    const r = vn(t);
    for (let n = 0; n < r.length; n++) {
      const s = r[n];
      if (n === r.length - 1)
        return delete e[s], !0;
      if (e = e[s], !Zt(e))
        return !1;
    }
  },
  has(e, t) {
    if (!Zt(e) || typeof t != "string")
      return !1;
    const r = vn(t);
    if (r.length === 0)
      return !1;
    for (let n = 0; n < r.length; n++)
      if (Zt(e)) {
        if (!(r[n] in e))
          return !1;
        e = e[r[n]];
      } else
        return !1;
    return !0;
  }
}, yo = { exports: {} }, _o = { exports: {} }, go = { exports: {} }, vo = { exports: {} };
const Yc = ho;
vo.exports = (e) => new Promise((t) => {
  Yc.access(e, (r) => {
    t(!r);
  });
});
vo.exports.sync = (e) => {
  try {
    return Yc.accessSync(e), !0;
  } catch {
    return !1;
  }
};
var Nd = vo.exports, wo = { exports: {} }, Eo = { exports: {} };
const Qc = (e, ...t) => new Promise((r) => {
  r(e(...t));
});
Eo.exports = Qc;
Eo.exports.default = Qc;
var Od = Eo.exports;
const Rd = Od, Zc = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  const t = [];
  let r = 0;
  const n = () => {
    r--, t.length > 0 && t.shift()();
  }, s = (l, c, ...d) => {
    r++;
    const u = Rd(l, ...d);
    c(u), u.then(n, n);
  }, o = (l, c, ...d) => {
    r < e ? s(l, c, ...d) : t.push(s.bind(null, l, c, ...d));
  }, i = (l, ...c) => new Promise((d) => o(l, d, ...c));
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
wo.exports = Zc;
wo.exports.default = Zc;
var Td = wo.exports;
const yi = Td;
class xc extends Error {
  constructor(t) {
    super(), this.value = t;
  }
}
const Id = (e, t) => Promise.resolve(e).then(t), jd = (e) => Promise.all(e).then((t) => t[1] === !0 && Promise.reject(new xc(t[0])));
var Ad = (e, t, r) => {
  r = Object.assign({
    concurrency: 1 / 0,
    preserveOrder: !0
  }, r);
  const n = yi(r.concurrency), s = [...e].map((i) => [i, n(Id, i, t)]), o = yi(r.preserveOrder ? 1 : 1 / 0);
  return Promise.all(s.map((i) => o(jd, i))).then(() => {
  }).catch((i) => i instanceof xc ? i.value : Promise.reject(i));
};
const el = Be, tl = Nd, kd = Ad;
go.exports = (e, t) => (t = Object.assign({
  cwd: process.cwd()
}, t), kd(e, (r) => tl(el.resolve(t.cwd, r)), t));
go.exports.sync = (e, t) => {
  t = Object.assign({
    cwd: process.cwd()
  }, t);
  for (const r of e)
    if (tl.sync(el.resolve(t.cwd, r)))
      return r;
};
var Cd = go.exports;
const jt = Be, rl = Cd;
_o.exports = (e, t = {}) => {
  const r = jt.resolve(t.cwd || ""), { root: n } = jt.parse(r), s = [].concat(e);
  return new Promise((o) => {
    (function i(l) {
      rl(s, { cwd: l }).then((c) => {
        c ? o(jt.join(l, c)) : l === n ? o(null) : i(jt.dirname(l));
      });
    })(r);
  });
};
_o.exports.sync = (e, t = {}) => {
  let r = jt.resolve(t.cwd || "");
  const { root: n } = jt.parse(r), s = [].concat(e);
  for (; ; ) {
    const o = rl.sync(s, { cwd: r });
    if (o)
      return jt.join(r, o);
    if (r === n)
      return null;
    r = jt.dirname(r);
  }
};
var Dd = _o.exports;
const nl = Dd;
yo.exports = async ({ cwd: e } = {}) => nl("package.json", { cwd: e });
yo.exports.sync = ({ cwd: e } = {}) => nl.sync("package.json", { cwd: e });
var Md = yo.exports, So = { exports: {} };
const $e = Be, sl = gd, It = sl.homedir(), bo = sl.tmpdir(), { env: vr } = process, Ld = (e) => {
  const t = $e.join(It, "Library");
  return {
    data: $e.join(t, "Application Support", e),
    config: $e.join(t, "Preferences", e),
    cache: $e.join(t, "Caches", e),
    log: $e.join(t, "Logs", e),
    temp: $e.join(bo, e)
  };
}, Fd = (e) => {
  const t = vr.APPDATA || $e.join(It, "AppData", "Roaming"), r = vr.LOCALAPPDATA || $e.join(It, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: $e.join(r, e, "Data"),
    config: $e.join(t, e, "Config"),
    cache: $e.join(r, e, "Cache"),
    log: $e.join(r, e, "Log"),
    temp: $e.join(bo, e)
  };
}, Vd = (e) => {
  const t = $e.basename(It);
  return {
    data: $e.join(vr.XDG_DATA_HOME || $e.join(It, ".local", "share"), e),
    config: $e.join(vr.XDG_CONFIG_HOME || $e.join(It, ".config"), e),
    cache: $e.join(vr.XDG_CACHE_HOME || $e.join(It, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: $e.join(vr.XDG_STATE_HOME || $e.join(It, ".local", "state"), e),
    temp: $e.join(bo, t, e)
  };
}, ol = (e, t) => {
  if (typeof e != "string")
    throw new TypeError(`Expected string, got ${typeof e}`);
  return t = Object.assign({ suffix: "nodejs" }, t), t.suffix && (e += `-${t.suffix}`), process.platform === "darwin" ? Ld(e) : process.platform === "win32" ? Fd(e) : Vd(e);
};
So.exports = ol;
So.exports.default = ol;
var Ud = So.exports, pt = {}, oe = {};
Object.defineProperty(oe, "__esModule", { value: !0 });
oe.NOOP = oe.LIMIT_FILES_DESCRIPTORS = oe.LIMIT_BASENAME_LENGTH = oe.IS_USER_ROOT = oe.IS_POSIX = oe.DEFAULT_TIMEOUT_SYNC = oe.DEFAULT_TIMEOUT_ASYNC = oe.DEFAULT_WRITE_OPTIONS = oe.DEFAULT_READ_OPTIONS = oe.DEFAULT_FOLDER_MODE = oe.DEFAULT_FILE_MODE = oe.DEFAULT_ENCODING = void 0;
const zd = "utf8";
oe.DEFAULT_ENCODING = zd;
const qd = 438;
oe.DEFAULT_FILE_MODE = qd;
const Kd = 511;
oe.DEFAULT_FOLDER_MODE = Kd;
const Gd = {};
oe.DEFAULT_READ_OPTIONS = Gd;
const Hd = {};
oe.DEFAULT_WRITE_OPTIONS = Hd;
const Wd = 5e3;
oe.DEFAULT_TIMEOUT_ASYNC = Wd;
const Jd = 100;
oe.DEFAULT_TIMEOUT_SYNC = Jd;
const Bd = !!process.getuid;
oe.IS_POSIX = Bd;
const Xd = process.getuid ? !process.getuid() : !1;
oe.IS_USER_ROOT = Xd;
const Yd = 128;
oe.LIMIT_BASENAME_LENGTH = Yd;
const Qd = 1e4;
oe.LIMIT_FILES_DESCRIPTORS = Qd;
const Zd = () => {
};
oe.NOOP = Zd;
var us = {}, Nr = {};
Object.defineProperty(Nr, "__esModule", { value: !0 });
Nr.attemptifySync = Nr.attemptifyAsync = void 0;
const al = oe, xd = (e, t = al.NOOP) => function() {
  return e.apply(void 0, arguments).catch(t);
};
Nr.attemptifyAsync = xd;
const ef = (e, t = al.NOOP) => function() {
  try {
    return e.apply(void 0, arguments);
  } catch (r) {
    return t(r);
  }
};
Nr.attemptifySync = ef;
var Po = {};
Object.defineProperty(Po, "__esModule", { value: !0 });
const tf = oe, il = {
  isChangeErrorOk: (e) => {
    const { code: t } = e;
    return t === "ENOSYS" || !tf.IS_USER_ROOT && (t === "EINVAL" || t === "EPERM");
  },
  isRetriableError: (e) => {
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!il.isChangeErrorOk(e))
      throw e;
  }
};
Po.default = il;
var Or = {}, No = {};
Object.defineProperty(No, "__esModule", { value: !0 });
const rf = oe, le = {
  interval: 25,
  intervalId: void 0,
  limit: rf.LIMIT_FILES_DESCRIPTORS,
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
No.default = le;
Object.defineProperty(Or, "__esModule", { value: !0 });
Or.retryifySync = Or.retryifyAsync = void 0;
const nf = No, sf = (e, t) => function(r) {
  return function n() {
    return nf.default.schedule().then((s) => e.apply(void 0, arguments).then((o) => (s(), o), (o) => {
      if (s(), Date.now() >= r)
        throw o;
      if (t(o)) {
        const i = Math.round(100 + 400 * Math.random());
        return new Promise((c) => setTimeout(c, i)).then(() => n.apply(void 0, arguments));
      }
      throw o;
    }));
  };
};
Or.retryifyAsync = sf;
const of = (e, t) => function(r) {
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
Or.retryifySync = of;
Object.defineProperty(us, "__esModule", { value: !0 });
const ae = ho, ke = zc, Ce = Nr, be = Po, Ve = Or, af = {
  chmodAttempt: Ce.attemptifyAsync(ke.promisify(ae.chmod), be.default.onChangeError),
  chownAttempt: Ce.attemptifyAsync(ke.promisify(ae.chown), be.default.onChangeError),
  closeAttempt: Ce.attemptifyAsync(ke.promisify(ae.close)),
  fsyncAttempt: Ce.attemptifyAsync(ke.promisify(ae.fsync)),
  mkdirAttempt: Ce.attemptifyAsync(ke.promisify(ae.mkdir)),
  realpathAttempt: Ce.attemptifyAsync(ke.promisify(ae.realpath)),
  statAttempt: Ce.attemptifyAsync(ke.promisify(ae.stat)),
  unlinkAttempt: Ce.attemptifyAsync(ke.promisify(ae.unlink)),
  closeRetry: Ve.retryifyAsync(ke.promisify(ae.close), be.default.isRetriableError),
  fsyncRetry: Ve.retryifyAsync(ke.promisify(ae.fsync), be.default.isRetriableError),
  openRetry: Ve.retryifyAsync(ke.promisify(ae.open), be.default.isRetriableError),
  readFileRetry: Ve.retryifyAsync(ke.promisify(ae.readFile), be.default.isRetriableError),
  renameRetry: Ve.retryifyAsync(ke.promisify(ae.rename), be.default.isRetriableError),
  statRetry: Ve.retryifyAsync(ke.promisify(ae.stat), be.default.isRetriableError),
  writeRetry: Ve.retryifyAsync(ke.promisify(ae.write), be.default.isRetriableError),
  chmodSyncAttempt: Ce.attemptifySync(ae.chmodSync, be.default.onChangeError),
  chownSyncAttempt: Ce.attemptifySync(ae.chownSync, be.default.onChangeError),
  closeSyncAttempt: Ce.attemptifySync(ae.closeSync),
  mkdirSyncAttempt: Ce.attemptifySync(ae.mkdirSync),
  realpathSyncAttempt: Ce.attemptifySync(ae.realpathSync),
  statSyncAttempt: Ce.attemptifySync(ae.statSync),
  unlinkSyncAttempt: Ce.attemptifySync(ae.unlinkSync),
  closeSyncRetry: Ve.retryifySync(ae.closeSync, be.default.isRetriableError),
  fsyncSyncRetry: Ve.retryifySync(ae.fsyncSync, be.default.isRetriableError),
  openSyncRetry: Ve.retryifySync(ae.openSync, be.default.isRetriableError),
  readFileSyncRetry: Ve.retryifySync(ae.readFileSync, be.default.isRetriableError),
  renameSyncRetry: Ve.retryifySync(ae.renameSync, be.default.isRetriableError),
  statSyncRetry: Ve.retryifySync(ae.statSync, be.default.isRetriableError),
  writeSyncRetry: Ve.retryifySync(ae.writeSync, be.default.isRetriableError)
};
us.default = af;
var Oo = {};
Object.defineProperty(Oo, "__esModule", { value: !0 });
const cf = {
  isFunction: (e) => typeof e == "function",
  isString: (e) => typeof e == "string",
  isUndefined: (e) => typeof e > "u"
};
Oo.default = cf;
var Ro = {};
Object.defineProperty(Ro, "__esModule", { value: !0 });
const wn = {}, Ws = {
  next: (e) => {
    const t = wn[e];
    if (!t)
      return;
    t.shift();
    const r = t[0];
    r ? r(() => Ws.next(e)) : delete wn[e];
  },
  schedule: (e) => new Promise((t) => {
    let r = wn[e];
    r || (r = wn[e] = []), r.push(t), !(r.length > 1) && t(() => Ws.next(e));
  })
};
Ro.default = Ws;
var To = {};
Object.defineProperty(To, "__esModule", { value: !0 });
const lf = Be, _i = oe, gi = us, We = {
  store: {},
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), r = Date.now().toString().slice(-10), n = "tmp-", s = `.${n}${r}${t}`;
    return `${e}${s}`;
  },
  get: (e, t, r = !0) => {
    const n = We.truncate(t(e));
    return n in We.store ? We.get(e, t, r) : (We.store[n] = r, [n, () => delete We.store[n]]);
  },
  purge: (e) => {
    We.store[e] && (delete We.store[e], gi.default.unlinkAttempt(e));
  },
  purgeSync: (e) => {
    We.store[e] && (delete We.store[e], gi.default.unlinkSyncAttempt(e));
  },
  purgeSyncAll: () => {
    for (const e in We.store)
      We.purgeSync(e);
  },
  truncate: (e) => {
    const t = lf.basename(e);
    if (t.length <= _i.LIMIT_BASENAME_LENGTH)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - _i.LIMIT_BASENAME_LENGTH;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
process.on("exit", We.purgeSyncAll);
To.default = We;
Object.defineProperty(pt, "__esModule", { value: !0 });
pt.writeFileSync = pt.writeFile = pt.readFileSync = pt.readFile = void 0;
const cl = Be, Re = oe, se = us, Xe = Oo, uf = Ro, At = To;
function ll(e, t = Re.DEFAULT_READ_OPTIONS) {
  var r;
  if (Xe.default.isString(t))
    return ll(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : Re.DEFAULT_TIMEOUT_ASYNC);
  return se.default.readFileRetry(n)(e, t);
}
pt.readFile = ll;
function ul(e, t = Re.DEFAULT_READ_OPTIONS) {
  var r;
  if (Xe.default.isString(t))
    return ul(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : Re.DEFAULT_TIMEOUT_SYNC);
  return se.default.readFileSyncRetry(n)(e, t);
}
pt.readFileSync = ul;
const dl = (e, t, r, n) => {
  if (Xe.default.isFunction(r))
    return dl(e, t, Re.DEFAULT_WRITE_OPTIONS, r);
  const s = fl(e, t, r);
  return n && s.then(n, n), s;
};
pt.writeFile = dl;
const fl = async (e, t, r = Re.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Xe.default.isString(r))
    return fl(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : Re.DEFAULT_TIMEOUT_ASYNC);
  let o = null, i = null, l = null, c = null, d = null;
  try {
    r.schedule && (o = await r.schedule(e)), i = await uf.default.schedule(e), e = await se.default.realpathAttempt(e) || e, [c, l] = At.default.get(e, r.tmpCreate || At.default.create, r.tmpPurge !== !1);
    const u = Re.IS_POSIX && Xe.default.isUndefined(r.chown), m = Xe.default.isUndefined(r.mode);
    if (u || m) {
      const _ = await se.default.statAttempt(e);
      _ && (r = { ...r }, u && (r.chown = { uid: _.uid, gid: _.gid }), m && (r.mode = _.mode));
    }
    const P = cl.dirname(e);
    await se.default.mkdirAttempt(P, {
      mode: Re.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), d = await se.default.openRetry(s)(c, "w", r.mode || Re.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(c), Xe.default.isString(t) ? await se.default.writeRetry(s)(d, t, 0, r.encoding || Re.DEFAULT_ENCODING) : Xe.default.isUndefined(t) || await se.default.writeRetry(s)(d, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? await se.default.fsyncRetry(s)(d) : se.default.fsyncAttempt(d)), await se.default.closeRetry(s)(d), d = null, r.chown && await se.default.chownAttempt(c, r.chown.uid, r.chown.gid), r.mode && await se.default.chmodAttempt(c, r.mode);
    try {
      await se.default.renameRetry(s)(c, e);
    } catch (_) {
      if (_.code !== "ENAMETOOLONG")
        throw _;
      await se.default.renameRetry(s)(c, At.default.truncate(e));
    }
    l(), c = null;
  } finally {
    d && await se.default.closeAttempt(d), c && At.default.purge(c), o && o(), i && i();
  }
}, hl = (e, t, r = Re.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Xe.default.isString(r))
    return hl(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : Re.DEFAULT_TIMEOUT_SYNC);
  let o = null, i = null, l = null;
  try {
    e = se.default.realpathSyncAttempt(e) || e, [i, o] = At.default.get(e, r.tmpCreate || At.default.create, r.tmpPurge !== !1);
    const c = Re.IS_POSIX && Xe.default.isUndefined(r.chown), d = Xe.default.isUndefined(r.mode);
    if (c || d) {
      const m = se.default.statSyncAttempt(e);
      m && (r = { ...r }, c && (r.chown = { uid: m.uid, gid: m.gid }), d && (r.mode = m.mode));
    }
    const u = cl.dirname(e);
    se.default.mkdirSyncAttempt(u, {
      mode: Re.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), l = se.default.openSyncRetry(s)(i, "w", r.mode || Re.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(i), Xe.default.isString(t) ? se.default.writeSyncRetry(s)(l, t, 0, r.encoding || Re.DEFAULT_ENCODING) : Xe.default.isUndefined(t) || se.default.writeSyncRetry(s)(l, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? se.default.fsyncSyncRetry(s)(l) : se.default.fsyncAttempt(l)), se.default.closeSyncRetry(s)(l), l = null, r.chown && se.default.chownSyncAttempt(i, r.chown.uid, r.chown.gid), r.mode && se.default.chmodSyncAttempt(i, r.mode);
    try {
      se.default.renameSyncRetry(s)(i, e);
    } catch (m) {
      if (m.code !== "ENAMETOOLONG")
        throw m;
      se.default.renameSyncRetry(s)(i, At.default.truncate(e));
    }
    o(), i = null;
  } finally {
    l && se.default.closeSyncAttempt(l), i && At.default.purge(i);
  }
};
pt.writeFileSync = hl;
var Js = { exports: {} }, ml = {}, ct = {}, Rr = {}, fn = {}, te = {}, un = {};
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
      l(N, w[R]), N.push(h[++R]);
    return new n(N);
  }
  e._ = s;
  const o = new n("+");
  function i(h, ...w) {
    const N = [_(h[0])];
    let R = 0;
    for (; R < w.length; )
      N.push(o), l(N, w[R]), N.push(o, _(h[++R]));
    return c(N), new n(N);
  }
  e.str = i;
  function l(h, w) {
    w instanceof n ? h.push(...w._items) : w instanceof r ? h.push(w) : h.push(m(w));
  }
  e.addCodeArg = l;
  function c(h) {
    let w = 1;
    for (; w < h.length - 1; ) {
      if (h[w] === o) {
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
  function u(h, w) {
    return w.emptyStr() ? h : h.emptyStr() ? w : i`${h}${w}`;
  }
  e.strConcat = u;
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
})(un);
var Bs = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = un;
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
    constructor({ prefixes: d, parent: u } = {}) {
      this._names = {}, this._prefixes = d, this._parent = u;
    }
    toName(d) {
      return d instanceof t.Name ? d : this.name(d);
    }
    name(d) {
      return new t.Name(this._newName(d));
    }
    _newName(d) {
      const u = this._names[d] || this._nameGroup(d);
      return `${d}${u.index++}`;
    }
    _nameGroup(d) {
      var u, m;
      if (!((m = (u = this._parent) === null || u === void 0 ? void 0 : u._prefixes) === null || m === void 0) && m.has(d) || this._prefixes && !this._prefixes.has(d))
        throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
      return this._names[d] = { prefix: d, index: 0 };
    }
  }
  e.Scope = s;
  class o extends t.Name {
    constructor(d, u) {
      super(u), this.prefix = d;
    }
    setValue(d, { property: u, itemIndex: m }) {
      this.value = d, this.scopePath = (0, t._)`.${new t.Name(u)}[${m}]`;
    }
  }
  e.ValueScopeName = o;
  const i = (0, t._)`\n`;
  class l extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? i : t.nil };
    }
    get() {
      return this._scope;
    }
    name(d) {
      return new o(d, this._newName(d));
    }
    value(d, u) {
      var m;
      if (u.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const P = this.toName(d), { prefix: _ } = P, E = (m = u.key) !== null && m !== void 0 ? m : u.ref;
      let g = this._values[_];
      if (g) {
        const w = g.get(E);
        if (w)
          return w;
      } else
        g = this._values[_] = /* @__PURE__ */ new Map();
      g.set(E, P);
      const y = this._scope[_] || (this._scope[_] = []), h = y.length;
      return y[h] = u.ref, P.setValue(u, { property: _, itemIndex: h }), P;
    }
    getValue(d, u) {
      const m = this._values[d];
      if (m)
        return m.get(u);
    }
    scopeRefs(d, u = this._values) {
      return this._reduceValues(u, (m) => {
        if (m.scopePath === void 0)
          throw new Error(`CodeGen: name "${m}" has no value`);
        return (0, t._)`${d}${m.scopePath}`;
      });
    }
    scopeCode(d = this._values, u, m) {
      return this._reduceValues(d, (P) => {
        if (P.value === void 0)
          throw new Error(`CodeGen: name "${P}" has no value`);
        return P.value.code;
      }, u, m);
    }
    _reduceValues(d, u, m = {}, P) {
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
          let w = u(h);
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
  e.ValueScope = l;
})(Bs);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = un, r = Bs;
  var n = un;
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
  var s = Bs;
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
  class o {
    optimizeNodes() {
      return this;
    }
    optimizeNames(a, f) {
      return this;
    }
  }
  class i extends o {
    constructor(a, f, b) {
      super(), this.varKind = a, this.name = f, this.rhs = b;
    }
    render({ es5: a, _n: f }) {
      const b = a ? r.varKinds.var : this.varKind, j = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${b} ${this.name}${j};` + f;
    }
    optimizeNames(a, f) {
      if (a[this.name.str])
        return this.rhs && (this.rhs = C(this.rhs, a, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class l extends o {
    constructor(a, f, b) {
      super(), this.lhs = a, this.rhs = f, this.sideEffects = b;
    }
    render({ _n: a }) {
      return `${this.lhs} = ${this.rhs};` + a;
    }
    optimizeNames(a, f) {
      if (!(this.lhs instanceof t.Name && !a[this.lhs.str] && !this.sideEffects))
        return this.rhs = C(this.rhs, a, f), this;
    }
    get names() {
      const a = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return fe(a, this.rhs);
    }
  }
  class c extends l {
    constructor(a, f, b, j) {
      super(a, b, j), this.op = f;
    }
    render({ _n: a }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + a;
    }
  }
  class d extends o {
    constructor(a) {
      super(), this.label = a, this.names = {};
    }
    render({ _n: a }) {
      return `${this.label}:` + a;
    }
  }
  class u extends o {
    constructor(a) {
      super(), this.label = a, this.names = {};
    }
    render({ _n: a }) {
      return `break${this.label ? ` ${this.label}` : ""};` + a;
    }
  }
  class m extends o {
    constructor(a) {
      super(), this.error = a;
    }
    render({ _n: a }) {
      return `throw ${this.error};` + a;
    }
    get names() {
      return this.error.names;
    }
  }
  class P extends o {
    constructor(a) {
      super(), this.code = a;
    }
    render({ _n: a }) {
      return `${this.code};` + a;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(a, f) {
      return this.code = C(this.code, a, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class _ extends o {
    constructor(a = []) {
      super(), this.nodes = a;
    }
    render(a) {
      return this.nodes.reduce((f, b) => f + b.render(a), "");
    }
    optimizeNodes() {
      const { nodes: a } = this;
      let f = a.length;
      for (; f--; ) {
        const b = a[f].optimizeNodes();
        Array.isArray(b) ? a.splice(f, 1, ...b) : b ? a[f] = b : a.splice(f, 1);
      }
      return a.length > 0 ? this : void 0;
    }
    optimizeNames(a, f) {
      const { nodes: b } = this;
      let j = b.length;
      for (; j--; ) {
        const A = b[j];
        A.optimizeNames(a, f) || (k(a, A.names), b.splice(j, 1));
      }
      return b.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((a, f) => Q(a, f.names), {});
    }
  }
  class E extends _ {
    render(a) {
      return "{" + a._n + super.render(a) + "}" + a._n;
    }
  }
  class g extends _ {
  }
  class y extends E {
  }
  y.kind = "else";
  class h extends E {
    constructor(a, f) {
      super(f), this.condition = a;
    }
    render(a) {
      let f = `if(${this.condition})` + super.render(a);
      return this.else && (f += "else " + this.else.render(a)), f;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const a = this.condition;
      if (a === !0)
        return this.nodes;
      let f = this.else;
      if (f) {
        const b = f.optimizeNodes();
        f = this.else = Array.isArray(b) ? new y(b) : b;
      }
      if (f)
        return a === !1 ? f instanceof h ? f : f.nodes : this.nodes.length ? this : new h(U(a), f instanceof h ? [f] : f.nodes);
      if (!(a === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(a, f) {
      var b;
      if (this.else = (b = this.else) === null || b === void 0 ? void 0 : b.optimizeNames(a, f), !!(super.optimizeNames(a, f) || this.else))
        return this.condition = C(this.condition, a, f), this;
    }
    get names() {
      const a = super.names;
      return fe(a, this.condition), this.else && Q(a, this.else.names), a;
    }
  }
  h.kind = "if";
  class w extends E {
  }
  w.kind = "for";
  class N extends w {
    constructor(a) {
      super(), this.iteration = a;
    }
    render(a) {
      return `for(${this.iteration})` + super.render(a);
    }
    optimizeNames(a, f) {
      if (super.optimizeNames(a, f))
        return this.iteration = C(this.iteration, a, f), this;
    }
    get names() {
      return Q(super.names, this.iteration.names);
    }
  }
  class R extends w {
    constructor(a, f, b, j) {
      super(), this.varKind = a, this.name = f, this.from = b, this.to = j;
    }
    render(a) {
      const f = a.es5 ? r.varKinds.var : this.varKind, { name: b, from: j, to: A } = this;
      return `for(${f} ${b}=${j}; ${b}<${A}; ${b}++)` + super.render(a);
    }
    get names() {
      const a = fe(super.names, this.from);
      return fe(a, this.to);
    }
  }
  class I extends w {
    constructor(a, f, b, j) {
      super(), this.loop = a, this.varKind = f, this.name = b, this.iterable = j;
    }
    render(a) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(a);
    }
    optimizeNames(a, f) {
      if (super.optimizeNames(a, f))
        return this.iterable = C(this.iterable, a, f), this;
    }
    get names() {
      return Q(super.names, this.iterable.names);
    }
  }
  class z extends E {
    constructor(a, f, b) {
      super(), this.name = a, this.args = f, this.async = b;
    }
    render(a) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(a);
    }
  }
  z.kind = "func";
  class W extends _ {
    render(a) {
      return "return " + super.render(a);
    }
  }
  W.kind = "return";
  class de extends E {
    render(a) {
      let f = "try" + super.render(a);
      return this.catch && (f += this.catch.render(a)), this.finally && (f += this.finally.render(a)), f;
    }
    optimizeNodes() {
      var a, f;
      return super.optimizeNodes(), (a = this.catch) === null || a === void 0 || a.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(a, f) {
      var b, j;
      return super.optimizeNames(a, f), (b = this.catch) === null || b === void 0 || b.optimizeNames(a, f), (j = this.finally) === null || j === void 0 || j.optimizeNames(a, f), this;
    }
    get names() {
      const a = super.names;
      return this.catch && Q(a, this.catch.names), this.finally && Q(a, this.finally.names), a;
    }
  }
  class V extends E {
    constructor(a) {
      super(), this.error = a;
    }
    render(a) {
      return `catch(${this.error})` + super.render(a);
    }
  }
  V.kind = "catch";
  class H extends E {
    render(a) {
      return "finally" + super.render(a);
    }
  }
  H.kind = "finally";
  class ne {
    constructor(a, f = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...f, _n: f.lines ? `
` : "" }, this._extScope = a, this._scope = new r.Scope({ parent: a }), this._nodes = [new g()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(a) {
      return this._scope.name(a);
    }
    // reserves unique name in the external scope
    scopeName(a) {
      return this._extScope.name(a);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(a, f) {
      const b = this._extScope.value(a, f);
      return (this._values[b.prefix] || (this._values[b.prefix] = /* @__PURE__ */ new Set())).add(b), b;
    }
    getScopeValue(a, f) {
      return this._extScope.getValue(a, f);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(a) {
      return this._extScope.scopeRefs(a, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(a, f, b, j) {
      const A = this._scope.toName(f);
      return b !== void 0 && j && (this._constants[A.str] = b), this._leafNode(new i(a, A, b)), A;
    }
    // `const` declaration (`var` in es5 mode)
    const(a, f, b) {
      return this._def(r.varKinds.const, a, f, b);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(a, f, b) {
      return this._def(r.varKinds.let, a, f, b);
    }
    // `var` declaration with optional assignment
    var(a, f, b) {
      return this._def(r.varKinds.var, a, f, b);
    }
    // assignment code
    assign(a, f, b) {
      return this._leafNode(new l(a, f, b));
    }
    // `+=` code
    add(a, f) {
      return this._leafNode(new c(a, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(a) {
      return typeof a == "function" ? a() : a !== t.nil && this._leafNode(new P(a)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...a) {
      const f = ["{"];
      for (const [b, j] of a)
        f.length > 1 && f.push(","), f.push(b), (b !== j || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, j));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(a, f, b) {
      if (this._blockNode(new h(a)), f && b)
        this.code(f).else().code(b).endIf();
      else if (f)
        this.code(f).endIf();
      else if (b)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(a) {
      return this._elseNode(new h(a));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new y());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(h, y);
    }
    _for(a, f) {
      return this._blockNode(a), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(a, f) {
      return this._for(new N(a), f);
    }
    // `for` statement for a range of values
    forRange(a, f, b, j, A = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const q = this._scope.toName(a);
      return this._for(new R(A, q, f, b), () => j(q));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(a, f, b, j = r.varKinds.const) {
      const A = this._scope.toName(a);
      if (this.opts.es5) {
        const q = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${q}.length`, (F) => {
          this.var(A, (0, t._)`${q}[${F}]`), b(A);
        });
      }
      return this._for(new I("of", j, A, f), () => b(A));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(a, f, b, j = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(a, (0, t._)`Object.keys(${f})`, b);
      const A = this._scope.toName(a);
      return this._for(new I("in", j, A, f), () => b(A));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(w);
    }
    // `label` statement
    label(a) {
      return this._leafNode(new d(a));
    }
    // `break` statement
    break(a) {
      return this._leafNode(new u(a));
    }
    // `return` statement
    return(a) {
      const f = new W();
      if (this._blockNode(f), this.code(a), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(W);
    }
    // `try` statement
    try(a, f, b) {
      if (!f && !b)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const j = new de();
      if (this._blockNode(j), this.code(a), f) {
        const A = this.name("e");
        this._currNode = j.catch = new V(A), f(A);
      }
      return b && (this._currNode = j.finally = new H(), this.code(b)), this._endBlockNode(V, H);
    }
    // `throw` statement
    throw(a) {
      return this._leafNode(new m(a));
    }
    // start self-balancing block
    block(a, f) {
      return this._blockStarts.push(this._nodes.length), a && this.code(a).endBlock(f), this;
    }
    // end the current self-balancing block
    endBlock(a) {
      const f = this._blockStarts.pop();
      if (f === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const b = this._nodes.length - f;
      if (b < 0 || a !== void 0 && b !== a)
        throw new Error(`CodeGen: wrong number of nodes: ${b} vs ${a} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(a, f = t.nil, b, j) {
      return this._blockNode(new z(a, f, b)), j && this.code(j).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(z);
    }
    optimize(a = 1) {
      for (; a-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(a) {
      return this._currNode.nodes.push(a), this;
    }
    _blockNode(a) {
      this._currNode.nodes.push(a), this._nodes.push(a);
    }
    _endBlockNode(a, f) {
      const b = this._currNode;
      if (b instanceof a || f && b instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${a.kind}/${f.kind}` : a.kind}"`);
    }
    _elseNode(a) {
      const f = this._currNode;
      if (!(f instanceof h))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = f.else = a, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const a = this._nodes;
      return a[a.length - 1];
    }
    set _currNode(a) {
      const f = this._nodes;
      f[f.length - 1] = a;
    }
  }
  e.CodeGen = ne;
  function Q($, a) {
    for (const f in a)
      $[f] = ($[f] || 0) + (a[f] || 0);
    return $;
  }
  function fe($, a) {
    return a instanceof t._CodeOrName ? Q($, a.names) : $;
  }
  function C($, a, f) {
    if ($ instanceof t.Name)
      return b($);
    if (!j($))
      return $;
    return new t._Code($._items.reduce((A, q) => (q instanceof t.Name && (q = b(q)), q instanceof t._Code ? A.push(...q._items) : A.push(q), A), []));
    function b(A) {
      const q = f[A.str];
      return q === void 0 || a[A.str] !== 1 ? A : (delete a[A.str], q);
    }
    function j(A) {
      return A instanceof t._Code && A._items.some((q) => q instanceof t.Name && a[q.str] === 1 && f[q.str] !== void 0);
    }
  }
  function k($, a) {
    for (const f in a)
      $[f] = ($[f] || 0) - (a[f] || 0);
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
  const T = p(e.operators.OR);
  function v(...$) {
    return $.reduce(T);
  }
  e.or = v;
  function p($) {
    return (a, f) => a === t.nil ? f : f === t.nil ? a : (0, t._)`${S(a)} ${$} ${S(f)}`;
  }
  function S($) {
    return $ instanceof t.Name ? $ : (0, t._)`(${$})`;
  }
})(te);
var M = {};
Object.defineProperty(M, "__esModule", { value: !0 });
M.checkStrictMode = M.getErrorPath = M.Type = M.useFunc = M.setEvaluated = M.evaluatedPropsToName = M.mergeEvaluated = M.eachItem = M.unescapeJsonPointer = M.escapeJsonPointer = M.escapeFragment = M.unescapeFragment = M.schemaRefOrVal = M.schemaHasRulesButRef = M.schemaHasRules = M.checkUnknownRules = M.alwaysValidSchema = M.toHash = void 0;
const ie = te, df = un;
function ff(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
M.toHash = ff;
function hf(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (pl(e, t), !$l(t, e.self.RULES.all));
}
M.alwaysValidSchema = hf;
function pl(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const o in t)
    s[o] || gl(e, `unknown keyword: "${o}"`);
}
M.checkUnknownRules = pl;
function $l(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
M.schemaHasRules = $l;
function mf(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
M.schemaHasRulesButRef = mf;
function pf({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ie._)`${r}`;
  }
  return (0, ie._)`${e}${t}${(0, ie.getProperty)(n)}`;
}
M.schemaRefOrVal = pf;
function $f(e) {
  return yl(decodeURIComponent(e));
}
M.unescapeFragment = $f;
function yf(e) {
  return encodeURIComponent(Io(e));
}
M.escapeFragment = yf;
function Io(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
M.escapeJsonPointer = Io;
function yl(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
M.unescapeJsonPointer = yl;
function _f(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
M.eachItem = _f;
function vi({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, o, i, l) => {
    const c = i === void 0 ? o : i instanceof ie.Name ? (o instanceof ie.Name ? e(s, o, i) : t(s, o, i), i) : o instanceof ie.Name ? (t(s, i, o), o) : r(o, i);
    return l === ie.Name && !(c instanceof ie.Name) ? n(s, c) : c;
  };
}
M.mergeEvaluated = {
  props: vi({
    mergeNames: (e, t, r) => e.if((0, ie._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, ie._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, ie._)`${r} || {}`).code((0, ie._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, ie._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, ie._)`${r} || {}`), jo(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: _l
  }),
  items: vi({
    mergeNames: (e, t, r) => e.if((0, ie._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ie._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ie._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ie._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function _l(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ie._)`{}`);
  return t !== void 0 && jo(e, r, t), r;
}
M.evaluatedPropsToName = _l;
function jo(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ie._)`${t}${(0, ie.getProperty)(n)}`, !0));
}
M.setEvaluated = jo;
const wi = {};
function gf(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: wi[t.code] || (wi[t.code] = new df._Code(t.code))
  });
}
M.useFunc = gf;
var Xs;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Xs || (M.Type = Xs = {}));
function vf(e, t, r) {
  if (e instanceof ie.Name) {
    const n = t === Xs.Num;
    return r ? n ? (0, ie._)`"[" + ${e} + "]"` : (0, ie._)`"['" + ${e} + "']"` : n ? (0, ie._)`"/" + ${e}` : (0, ie._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ie.getProperty)(e).toString() : "/" + Io(e);
}
M.getErrorPath = vf;
function gl(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
M.checkStrictMode = gl;
var gt = {};
Object.defineProperty(gt, "__esModule", { value: !0 });
const je = te, wf = {
  // validation function arguments
  data: new je.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new je.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new je.Name("instancePath"),
  parentData: new je.Name("parentData"),
  parentDataProperty: new je.Name("parentDataProperty"),
  rootData: new je.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new je.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new je.Name("vErrors"),
  // null or array of validation errors
  errors: new je.Name("errors"),
  // counter of validation errors
  this: new je.Name("this"),
  // "globals"
  self: new je.Name("self"),
  scope: new je.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new je.Name("json"),
  jsonPos: new je.Name("jsonPos"),
  jsonLen: new je.Name("jsonLen"),
  jsonPart: new je.Name("jsonPart")
};
gt.default = wf;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = te, r = M, n = gt;
  e.keywordError = {
    message: ({ keyword: y }) => (0, t.str)`must pass "${y}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: y, schemaType: h }) => h ? (0, t.str)`"${y}" keyword must be ${h} ($data)` : (0, t.str)`"${y}" keyword is invalid ($data)`
  };
  function s(y, h = e.keywordError, w, N) {
    const { it: R } = y, { gen: I, compositeRule: z, allErrors: W } = R, de = m(y, h, w);
    N ?? (z || W) ? c(I, de) : d(R, (0, t._)`[${de}]`);
  }
  e.reportError = s;
  function o(y, h = e.keywordError, w) {
    const { it: N } = y, { gen: R, compositeRule: I, allErrors: z } = N, W = m(y, h, w);
    c(R, W), I || z || d(N, n.default.vErrors);
  }
  e.reportExtraError = o;
  function i(y, h) {
    y.assign(n.default.errors, h), y.if((0, t._)`${n.default.vErrors} !== null`, () => y.if(h, () => y.assign((0, t._)`${n.default.vErrors}.length`, h), () => y.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function l({ gen: y, keyword: h, schemaValue: w, data: N, errsCount: R, it: I }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const z = y.name("err");
    y.forRange("i", R, n.default.errors, (W) => {
      y.const(z, (0, t._)`${n.default.vErrors}[${W}]`), y.if((0, t._)`${z}.instancePath === undefined`, () => y.assign((0, t._)`${z}.instancePath`, (0, t.strConcat)(n.default.instancePath, I.errorPath))), y.assign((0, t._)`${z}.schemaPath`, (0, t.str)`${I.errSchemaPath}/${h}`), I.opts.verbose && (y.assign((0, t._)`${z}.schema`, w), y.assign((0, t._)`${z}.data`, N));
    });
  }
  e.extendErrors = l;
  function c(y, h) {
    const w = y.const("err", h);
    y.if((0, t._)`${n.default.vErrors} === null`, () => y.assign(n.default.vErrors, (0, t._)`[${w}]`), (0, t._)`${n.default.vErrors}.push(${w})`), y.code((0, t._)`${n.default.errors}++`);
  }
  function d(y, h) {
    const { gen: w, validateName: N, schemaEnv: R } = y;
    R.$async ? w.throw((0, t._)`new ${y.ValidationError}(${h})`) : (w.assign((0, t._)`${N}.errors`, h), w.return(!1));
  }
  const u = {
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
    const { gen: N, it: R } = y, I = [
      _(R, w),
      E(y, w)
    ];
    return g(y, h, I), N.object(...I);
  }
  function _({ errorPath: y }, { instancePath: h }) {
    const w = h ? (0, t.str)`${y}${(0, r.getErrorPath)(h, r.Type.Str)}` : y;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, w)];
  }
  function E({ keyword: y, it: { errSchemaPath: h } }, { schemaPath: w, parentSchema: N }) {
    let R = N ? h : (0, t.str)`${h}/${y}`;
    return w && (R = (0, t.str)`${R}${(0, r.getErrorPath)(w, r.Type.Str)}`), [u.schemaPath, R];
  }
  function g(y, { params: h, message: w }, N) {
    const { keyword: R, data: I, schemaValue: z, it: W } = y, { opts: de, propertyName: V, topSchemaRef: H, schemaPath: ne } = W;
    N.push([u.keyword, R], [u.params, typeof h == "function" ? h(y) : h || (0, t._)`{}`]), de.messages && N.push([u.message, typeof w == "function" ? w(y) : w]), de.verbose && N.push([u.schema, z], [u.parentSchema, (0, t._)`${H}${ne}`], [n.default.data, I]), V && N.push([u.propertyName, V]);
  }
})(fn);
Object.defineProperty(Rr, "__esModule", { value: !0 });
Rr.boolOrEmptySchema = Rr.topBoolOrEmptySchema = void 0;
const Ef = fn, Sf = te, bf = gt, Pf = {
  message: "boolean schema is false"
};
function Nf(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? vl(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(bf.default.data) : (t.assign((0, Sf._)`${n}.errors`, null), t.return(!0));
}
Rr.topBoolOrEmptySchema = Nf;
function Of(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), vl(e)) : r.var(t, !0);
}
Rr.boolOrEmptySchema = Of;
function vl(e, t) {
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
  (0, Ef.reportError)(s, Pf, void 0, t);
}
var Ee = {}, cr = {};
Object.defineProperty(cr, "__esModule", { value: !0 });
cr.getRules = cr.isJSONType = void 0;
const Rf = ["string", "number", "integer", "boolean", "null", "object", "array"], Tf = new Set(Rf);
function If(e) {
  return typeof e == "string" && Tf.has(e);
}
cr.isJSONType = If;
function jf() {
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
cr.getRules = jf;
var wt = {};
Object.defineProperty(wt, "__esModule", { value: !0 });
wt.shouldUseRule = wt.shouldUseGroup = wt.schemaHasRulesForType = void 0;
function Af({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && wl(e, n);
}
wt.schemaHasRulesForType = Af;
function wl(e, t) {
  return t.rules.some((r) => El(e, r));
}
wt.shouldUseGroup = wl;
function El(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
wt.shouldUseRule = El;
Object.defineProperty(Ee, "__esModule", { value: !0 });
Ee.reportTypeError = Ee.checkDataTypes = Ee.checkDataType = Ee.coerceAndCheckDataType = Ee.getJSONTypes = Ee.getSchemaTypes = Ee.DataType = void 0;
const kf = cr, Cf = wt, Df = fn, X = te, Sl = M;
var Er;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(Er || (Ee.DataType = Er = {}));
function Mf(e) {
  const t = bl(e.type);
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
Ee.getSchemaTypes = Mf;
function bl(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(kf.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Ee.getJSONTypes = bl;
function Lf(e, t) {
  const { gen: r, data: n, opts: s } = e, o = Ff(t, s.coerceTypes), i = t.length > 0 && !(o.length === 0 && t.length === 1 && (0, Cf.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const l = Ao(t, n, s.strictNumbers, Er.Wrong);
    r.if(l, () => {
      o.length ? Vf(e, t, o) : ko(e);
    });
  }
  return i;
}
Ee.coerceAndCheckDataType = Lf;
const Pl = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function Ff(e, t) {
  return t ? e.filter((r) => Pl.has(r) || t === "array" && r === "array") : [];
}
function Vf(e, t, r) {
  const { gen: n, data: s, opts: o } = e, i = n.let("dataType", (0, X._)`typeof ${s}`), l = n.let("coerced", (0, X._)`undefined`);
  o.coerceTypes === "array" && n.if((0, X._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, X._)`${s}[0]`).assign(i, (0, X._)`typeof ${s}`).if(Ao(t, s, o.strictNumbers), () => n.assign(l, s))), n.if((0, X._)`${l} !== undefined`);
  for (const d of r)
    (Pl.has(d) || d === "array" && o.coerceTypes === "array") && c(d);
  n.else(), ko(e), n.endIf(), n.if((0, X._)`${l} !== undefined`, () => {
    n.assign(s, l), Uf(e, l);
  });
  function c(d) {
    switch (d) {
      case "string":
        n.elseIf((0, X._)`${i} == "number" || ${i} == "boolean"`).assign(l, (0, X._)`"" + ${s}`).elseIf((0, X._)`${s} === null`).assign(l, (0, X._)`""`);
        return;
      case "number":
        n.elseIf((0, X._)`${i} == "boolean" || ${s} === null
              || (${i} == "string" && ${s} && ${s} == +${s})`).assign(l, (0, X._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, X._)`${i} === "boolean" || ${s} === null
              || (${i} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(l, (0, X._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, X._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(l, !1).elseIf((0, X._)`${s} === "true" || ${s} === 1`).assign(l, !0);
        return;
      case "null":
        n.elseIf((0, X._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(l, null);
        return;
      case "array":
        n.elseIf((0, X._)`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${s} === null`).assign(l, (0, X._)`[${s}]`);
    }
  }
}
function Uf({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, X._)`${t} !== undefined`, () => e.assign((0, X._)`${t}[${r}]`, n));
}
function Ys(e, t, r, n = Er.Correct) {
  const s = n === Er.Correct ? X.operators.EQ : X.operators.NEQ;
  let o;
  switch (e) {
    case "null":
      return (0, X._)`${t} ${s} null`;
    case "array":
      o = (0, X._)`Array.isArray(${t})`;
      break;
    case "object":
      o = (0, X._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      o = i((0, X._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      o = i();
      break;
    default:
      return (0, X._)`typeof ${t} ${s} ${e}`;
  }
  return n === Er.Correct ? o : (0, X.not)(o);
  function i(l = X.nil) {
    return (0, X.and)((0, X._)`typeof ${t} == "number"`, l, r ? (0, X._)`isFinite(${t})` : X.nil);
  }
}
Ee.checkDataType = Ys;
function Ao(e, t, r, n) {
  if (e.length === 1)
    return Ys(e[0], t, r, n);
  let s;
  const o = (0, Sl.toHash)(e);
  if (o.array && o.object) {
    const i = (0, X._)`typeof ${t} != "object"`;
    s = o.null ? i : (0, X._)`!${t} || ${i}`, delete o.null, delete o.array, delete o.object;
  } else
    s = X.nil;
  o.number && delete o.integer;
  for (const i in o)
    s = (0, X.and)(s, Ys(i, t, r, n));
  return s;
}
Ee.checkDataTypes = Ao;
const zf = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, X._)`{type: ${e}}` : (0, X._)`{type: ${t}}`
};
function ko(e) {
  const t = qf(e);
  (0, Df.reportError)(t, zf);
}
Ee.reportTypeError = ko;
function qf(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, Sl.schemaRefOrVal)(e, n, "type");
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
const hr = te, Kf = M;
function Gf(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      Ei(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, o) => Ei(e, o, s.default));
}
ds.assignDefaults = Gf;
function Ei(e, t, r) {
  const { gen: n, compositeRule: s, data: o, opts: i } = e;
  if (r === void 0)
    return;
  const l = (0, hr._)`${o}${(0, hr.getProperty)(t)}`;
  if (s) {
    (0, Kf.checkStrictMode)(e, `default is ignored for: ${l}`);
    return;
  }
  let c = (0, hr._)`${l} === undefined`;
  i.useDefaults === "empty" && (c = (0, hr._)`${c} || ${l} === null || ${l} === ""`), n.if(c, (0, hr._)`${l} = ${(0, hr.stringify)(r)}`);
}
var $t = {}, x = {};
Object.defineProperty(x, "__esModule", { value: !0 });
x.validateUnion = x.validateArray = x.usePattern = x.callValidateCode = x.schemaProperties = x.allSchemaProperties = x.noPropertyInData = x.propertyInData = x.isOwnProperty = x.hasPropFunc = x.reportMissingProp = x.checkMissingProp = x.checkReportMissingProp = void 0;
const me = te, Co = M, Nt = gt, Hf = M;
function Wf(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(Mo(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, me._)`${t}` }, !0), e.error();
  });
}
x.checkReportMissingProp = Wf;
function Jf({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, me.or)(...n.map((o) => (0, me.and)(Mo(e, t, o, r.ownProperties), (0, me._)`${s} = ${o}`)));
}
x.checkMissingProp = Jf;
function Bf(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
x.reportMissingProp = Bf;
function Nl(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, me._)`Object.prototype.hasOwnProperty`
  });
}
x.hasPropFunc = Nl;
function Do(e, t, r) {
  return (0, me._)`${Nl(e)}.call(${t}, ${r})`;
}
x.isOwnProperty = Do;
function Xf(e, t, r, n) {
  const s = (0, me._)`${t}${(0, me.getProperty)(r)} !== undefined`;
  return n ? (0, me._)`${s} && ${Do(e, t, r)}` : s;
}
x.propertyInData = Xf;
function Mo(e, t, r, n) {
  const s = (0, me._)`${t}${(0, me.getProperty)(r)} === undefined`;
  return n ? (0, me.or)(s, (0, me.not)(Do(e, t, r))) : s;
}
x.noPropertyInData = Mo;
function Ol(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
x.allSchemaProperties = Ol;
function Yf(e, t) {
  return Ol(t).filter((r) => !(0, Co.alwaysValidSchema)(e, t[r]));
}
x.schemaProperties = Yf;
function Qf({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: o }, it: i }, l, c, d) {
  const u = d ? (0, me._)`${e}, ${t}, ${n}${s}` : t, m = [
    [Nt.default.instancePath, (0, me.strConcat)(Nt.default.instancePath, o)],
    [Nt.default.parentData, i.parentData],
    [Nt.default.parentDataProperty, i.parentDataProperty],
    [Nt.default.rootData, Nt.default.rootData]
  ];
  i.opts.dynamicRef && m.push([Nt.default.dynamicAnchors, Nt.default.dynamicAnchors]);
  const P = (0, me._)`${u}, ${r.object(...m)}`;
  return c !== me.nil ? (0, me._)`${l}.call(${c}, ${P})` : (0, me._)`${l}(${P})`;
}
x.callValidateCode = Qf;
const Zf = (0, me._)`new RegExp`;
function xf({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, o = s(r, n);
  return e.scopeValue("pattern", {
    key: o.toString(),
    ref: o,
    code: (0, me._)`${s.code === "new RegExp" ? Zf : (0, Hf.useFunc)(e, s)}(${r}, ${n})`
  });
}
x.usePattern = xf;
function eh(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, o = t.name("valid");
  if (s.allErrors) {
    const l = t.let("valid", !0);
    return i(() => t.assign(l, !1)), l;
  }
  return t.var(o, !0), i(() => t.break()), o;
  function i(l) {
    const c = t.const("len", (0, me._)`${r}.length`);
    t.forRange("i", 0, c, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: Co.Type.Num
      }, o), t.if((0, me.not)(o), l);
    });
  }
}
x.validateArray = eh;
function th(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, Co.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const i = t.let("valid", !1), l = t.name("_valid");
  t.block(() => r.forEach((c, d) => {
    const u = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, l);
    t.assign(i, (0, me._)`${i} || ${l}`), e.mergeValidEvaluated(u, l) || t.if((0, me.not)(i));
  })), e.result(i, () => e.reset(), () => e.error(!0));
}
x.validateUnion = th;
Object.defineProperty($t, "__esModule", { value: !0 });
$t.validateKeywordUsage = $t.validSchemaType = $t.funcKeywordCode = $t.macroKeywordCode = void 0;
const Me = te, rr = gt, rh = x, nh = fn;
function sh(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: o, it: i } = e, l = t.macro.call(i.self, s, o, i), c = Rl(r, n, l);
  i.opts.validateSchema !== !1 && i.self.validateSchema(l, !0);
  const d = r.name("valid");
  e.subschema({
    schema: l,
    schemaPath: Me.nil,
    errSchemaPath: `${i.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, d), e.pass(d, () => e.error(!0));
}
$t.macroKeywordCode = sh;
function oh(e, t) {
  var r;
  const { gen: n, keyword: s, schema: o, parentSchema: i, $data: l, it: c } = e;
  ih(c, t);
  const d = !l && t.compile ? t.compile.call(c.self, o, i, c) : t.validate, u = Rl(n, s, d), m = n.let("valid");
  e.block$data(m, P), e.ok((r = t.valid) !== null && r !== void 0 ? r : m);
  function P() {
    if (t.errors === !1)
      g(), t.modifying && Si(e), y(() => e.error());
    else {
      const h = t.async ? _() : E();
      t.modifying && Si(e), y(() => ah(e, h));
    }
  }
  function _() {
    const h = n.let("ruleErrs", null);
    return n.try(() => g((0, Me._)`await `), (w) => n.assign(m, !1).if((0, Me._)`${w} instanceof ${c.ValidationError}`, () => n.assign(h, (0, Me._)`${w}.errors`), () => n.throw(w))), h;
  }
  function E() {
    const h = (0, Me._)`${u}.errors`;
    return n.assign(h, null), g(Me.nil), h;
  }
  function g(h = t.async ? (0, Me._)`await ` : Me.nil) {
    const w = c.opts.passContext ? rr.default.this : rr.default.self, N = !("compile" in t && !l || t.schema === !1);
    n.assign(m, (0, Me._)`${h}${(0, rh.callValidateCode)(e, u, w, N)}`, t.modifying);
  }
  function y(h) {
    var w;
    n.if((0, Me.not)((w = t.valid) !== null && w !== void 0 ? w : m), h);
  }
}
$t.funcKeywordCode = oh;
function Si(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Me._)`${n.parentData}[${n.parentDataProperty}]`));
}
function ah(e, t) {
  const { gen: r } = e;
  r.if((0, Me._)`Array.isArray(${t})`, () => {
    r.assign(rr.default.vErrors, (0, Me._)`${rr.default.vErrors} === null ? ${t} : ${rr.default.vErrors}.concat(${t})`).assign(rr.default.errors, (0, Me._)`${rr.default.vErrors}.length`), (0, nh.extendErrors)(e);
  }, () => e.error());
}
function ih({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function Rl(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Me.stringify)(r) });
}
function ch(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
$t.validSchemaType = ch;
function lh({ schema: e, opts: t, self: r, errSchemaPath: n }, s, o) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(o) : s.keyword !== o)
    throw new Error("ajv implementation error");
  const i = s.dependencies;
  if (i != null && i.some((l) => !Object.prototype.hasOwnProperty.call(e, l)))
    throw new Error(`parent schema must have dependencies of ${o}: ${i.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[o])) {
    const c = `keyword "${o}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
$t.validateKeywordUsage = lh;
var Dt = {};
Object.defineProperty(Dt, "__esModule", { value: !0 });
Dt.extendSubschemaMode = Dt.extendSubschemaData = Dt.getSubschema = void 0;
const ht = te, Tl = M;
function uh(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: o, topSchemaRef: i }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const l = e.schema[t];
    return r === void 0 ? {
      schema: l,
      schemaPath: (0, ht._)`${e.schemaPath}${(0, ht.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: l[r],
      schemaPath: (0, ht._)`${e.schemaPath}${(0, ht.getProperty)(t)}${(0, ht.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, Tl.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (s === void 0 || o === void 0 || i === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: s,
      topSchemaRef: i,
      errSchemaPath: o
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
Dt.getSubschema = uh;
function dh(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: o, propertyName: i }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: l } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: u, opts: m } = t, P = l.let("data", (0, ht._)`${t.data}${(0, ht.getProperty)(r)}`, !0);
    c(P), e.errorPath = (0, ht.str)`${d}${(0, Tl.getErrorPath)(r, n, m.jsPropertySyntax)}`, e.parentDataProperty = (0, ht._)`${r}`, e.dataPathArr = [...u, e.parentDataProperty];
  }
  if (s !== void 0) {
    const d = s instanceof ht.Name ? s : l.let("data", s, !0);
    c(d), i !== void 0 && (e.propertyName = i);
  }
  o && (e.dataTypes = o);
  function c(d) {
    e.data = d, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, d];
  }
}
Dt.extendSubschemaData = dh;
function fh(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: o }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), o !== void 0 && (e.allErrors = o), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Dt.extendSubschemaMode = fh;
var Te = {}, fs = function e(t, r) {
  if (t === r) return !0;
  if (t && r && typeof t == "object" && typeof r == "object") {
    if (t.constructor !== r.constructor) return !1;
    var n, s, o;
    if (Array.isArray(t)) {
      if (n = t.length, n != r.length) return !1;
      for (s = n; s-- !== 0; )
        if (!e(t[s], r[s])) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
    if (o = Object.keys(t), n = o.length, n !== Object.keys(r).length) return !1;
    for (s = n; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, o[s])) return !1;
    for (s = n; s-- !== 0; ) {
      var i = o[s];
      if (!e(t[i], r[i])) return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}, Il = { exports: {} }, kt = Il.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  Un(t, n, s, e, "", e);
};
kt.keywords = {
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
kt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
kt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
kt.skipKeywords = {
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
function Un(e, t, r, n, s, o, i, l, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, o, i, l, c, d);
    for (var u in n) {
      var m = n[u];
      if (Array.isArray(m)) {
        if (u in kt.arrayKeywords)
          for (var P = 0; P < m.length; P++)
            Un(e, t, r, m[P], s + "/" + u + "/" + P, o, s, u, n, P);
      } else if (u in kt.propsKeywords) {
        if (m && typeof m == "object")
          for (var _ in m)
            Un(e, t, r, m[_], s + "/" + u + "/" + hh(_), o, s, u, n, _);
      } else (u in kt.keywords || e.allKeys && !(u in kt.skipKeywords)) && Un(e, t, r, m, s + "/" + u, o, s, u, n);
    }
    r(n, s, o, i, l, c, d);
  }
}
function hh(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var mh = Il.exports;
Object.defineProperty(Te, "__esModule", { value: !0 });
Te.getSchemaRefs = Te.resolveUrl = Te.normalizeId = Te._getFullPath = Te.getFullPath = Te.inlineRef = void 0;
const ph = M, $h = fs, yh = mh, _h = /* @__PURE__ */ new Set([
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
function gh(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Qs(e) : t ? jl(e) <= t : !1;
}
Te.inlineRef = gh;
const vh = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Qs(e) {
  for (const t in e) {
    if (vh.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Qs) || typeof r == "object" && Qs(r))
      return !0;
  }
  return !1;
}
function jl(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !_h.has(r) && (typeof e[r] == "object" && (0, ph.eachItem)(e[r], (n) => t += jl(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function Al(e, t = "", r) {
  r !== !1 && (t = Sr(t));
  const n = e.parse(t);
  return kl(e, n);
}
Te.getFullPath = Al;
function kl(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Te._getFullPath = kl;
const wh = /#\/?$/;
function Sr(e) {
  return e ? e.replace(wh, "") : "";
}
Te.normalizeId = Sr;
function Eh(e, t, r) {
  return r = Sr(r), e.resolve(t, r);
}
Te.resolveUrl = Eh;
const Sh = /^[a-z_][-a-z0-9._]*$/i;
function bh(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = Sr(e[r] || t), o = { "": s }, i = Al(n, s, !1), l = {}, c = /* @__PURE__ */ new Set();
  return yh(e, { allKeys: !0 }, (m, P, _, E) => {
    if (E === void 0)
      return;
    const g = i + P;
    let y = o[E];
    typeof m[r] == "string" && (y = h.call(this, m[r])), w.call(this, m.$anchor), w.call(this, m.$dynamicAnchor), o[P] = y;
    function h(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = Sr(y ? R(y, N) : N), c.has(N))
        throw u(N);
      c.add(N);
      let I = this.refs[N];
      return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? d(m, I.schema, N) : N !== Sr(g) && (N[0] === "#" ? (d(m, l[N], N), l[N] = m) : this.refs[N] = g), N;
    }
    function w(N) {
      if (typeof N == "string") {
        if (!Sh.test(N))
          throw new Error(`invalid anchor "${N}"`);
        h.call(this, `#${N}`);
      }
    }
  }), l;
  function d(m, P, _) {
    if (P !== void 0 && !$h(m, P))
      throw u(_);
  }
  function u(m) {
    return new Error(`reference "${m}" resolves to more than one schema`);
  }
}
Te.getSchemaRefs = bh;
Object.defineProperty(ct, "__esModule", { value: !0 });
ct.getData = ct.KeywordCxt = ct.validateFunctionCode = void 0;
const Cl = Rr, bi = Ee, Lo = wt, Qn = Ee, Ph = ds, xr = $t, Is = Dt, K = te, J = gt, Nh = Te, Et = M, Gr = fn;
function Oh(e) {
  if (Ll(e) && (Fl(e), Ml(e))) {
    Ih(e);
    return;
  }
  Dl(e, () => (0, Cl.topBoolOrEmptySchema)(e));
}
ct.validateFunctionCode = Oh;
function Dl({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, o) {
  s.code.es5 ? e.func(t, (0, K._)`${J.default.data}, ${J.default.valCxt}`, n.$async, () => {
    e.code((0, K._)`"use strict"; ${Pi(r, s)}`), Th(e, s), e.code(o);
  }) : e.func(t, (0, K._)`${J.default.data}, ${Rh(s)}`, n.$async, () => e.code(Pi(r, s)).code(o));
}
function Rh(e) {
  return (0, K._)`{${J.default.instancePath}="", ${J.default.parentData}, ${J.default.parentDataProperty}, ${J.default.rootData}=${J.default.data}${e.dynamicRef ? (0, K._)`, ${J.default.dynamicAnchors}={}` : K.nil}}={}`;
}
function Th(e, t) {
  e.if(J.default.valCxt, () => {
    e.var(J.default.instancePath, (0, K._)`${J.default.valCxt}.${J.default.instancePath}`), e.var(J.default.parentData, (0, K._)`${J.default.valCxt}.${J.default.parentData}`), e.var(J.default.parentDataProperty, (0, K._)`${J.default.valCxt}.${J.default.parentDataProperty}`), e.var(J.default.rootData, (0, K._)`${J.default.valCxt}.${J.default.rootData}`), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, K._)`${J.default.valCxt}.${J.default.dynamicAnchors}`);
  }, () => {
    e.var(J.default.instancePath, (0, K._)`""`), e.var(J.default.parentData, (0, K._)`undefined`), e.var(J.default.parentDataProperty, (0, K._)`undefined`), e.var(J.default.rootData, J.default.data), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, K._)`{}`);
  });
}
function Ih(e) {
  const { schema: t, opts: r, gen: n } = e;
  Dl(e, () => {
    r.$comment && t.$comment && Ul(e), Dh(e), n.let(J.default.vErrors, null), n.let(J.default.errors, 0), r.unevaluated && jh(e), Vl(e), Fh(e);
  });
}
function jh(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, K._)`${r}.evaluated`), t.if((0, K._)`${e.evaluated}.dynamicProps`, () => t.assign((0, K._)`${e.evaluated}.props`, (0, K._)`undefined`)), t.if((0, K._)`${e.evaluated}.dynamicItems`, () => t.assign((0, K._)`${e.evaluated}.items`, (0, K._)`undefined`));
}
function Pi(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, K._)`/*# sourceURL=${r} */` : K.nil;
}
function Ah(e, t) {
  if (Ll(e) && (Fl(e), Ml(e))) {
    kh(e, t);
    return;
  }
  (0, Cl.boolOrEmptySchema)(e, t);
}
function Ml({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function Ll(e) {
  return typeof e.schema != "boolean";
}
function kh(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && Ul(e), Mh(e), Lh(e);
  const o = n.const("_errs", J.default.errors);
  Vl(e, o), n.var(t, (0, K._)`${o} === ${J.default.errors}`);
}
function Fl(e) {
  (0, Et.checkUnknownRules)(e), Ch(e);
}
function Vl(e, t) {
  if (e.opts.jtd)
    return Ni(e, [], !1, t);
  const r = (0, bi.getSchemaTypes)(e.schema), n = (0, bi.coerceAndCheckDataType)(e, r);
  Ni(e, r, !n, t);
}
function Ch(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, Et.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function Dh(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, Et.checkStrictMode)(e, "default is ignored in the schema root");
}
function Mh(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, Nh.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function Lh(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function Ul({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const o = r.$comment;
  if (s.$comment === !0)
    e.code((0, K._)`${J.default.self}.logger.log(${o})`);
  else if (typeof s.$comment == "function") {
    const i = (0, K.str)`${n}/$comment`, l = e.scopeValue("root", { ref: t.root });
    e.code((0, K._)`${J.default.self}.opts.$comment(${o}, ${i}, ${l}.schema)`);
  }
}
function Fh(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: o } = e;
  r.$async ? t.if((0, K._)`${J.default.errors} === 0`, () => t.return(J.default.data), () => t.throw((0, K._)`new ${s}(${J.default.vErrors})`)) : (t.assign((0, K._)`${n}.errors`, J.default.vErrors), o.unevaluated && Vh(e), t.return((0, K._)`${J.default.errors} === 0`));
}
function Vh({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof K.Name && e.assign((0, K._)`${t}.props`, r), n instanceof K.Name && e.assign((0, K._)`${t}.items`, n);
}
function Ni(e, t, r, n) {
  const { gen: s, schema: o, data: i, allErrors: l, opts: c, self: d } = e, { RULES: u } = d;
  if (o.$ref && (c.ignoreKeywordsWithRef || !(0, Et.schemaHasRulesButRef)(o, u))) {
    s.block(() => Kl(e, "$ref", u.all.$ref.definition));
    return;
  }
  c.jtd || Uh(e, t), s.block(() => {
    for (const P of u.rules)
      m(P);
    m(u.post);
  });
  function m(P) {
    (0, Lo.shouldUseGroup)(o, P) && (P.type ? (s.if((0, Qn.checkDataType)(P.type, i, c.strictNumbers)), Oi(e, P), t.length === 1 && t[0] === P.type && r && (s.else(), (0, Qn.reportTypeError)(e)), s.endIf()) : Oi(e, P), l || s.if((0, K._)`${J.default.errors} === ${n || 0}`));
  }
}
function Oi(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, Ph.assignDefaults)(e, t.type), r.block(() => {
    for (const o of t.rules)
      (0, Lo.shouldUseRule)(n, o) && Kl(e, o.keyword, o.definition, t.type);
  });
}
function Uh(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (zh(e, t), e.opts.allowUnionTypes || qh(e, t), Kh(e, e.dataTypes));
}
function zh(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      zl(e.dataTypes, r) || Fo(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), Hh(e, t);
  }
}
function qh(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && Fo(e, "use allowUnionTypes to allow union type keyword");
}
function Kh(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, Lo.shouldUseRule)(e.schema, s)) {
      const { type: o } = s.definition;
      o.length && !o.some((i) => Gh(t, i)) && Fo(e, `missing type "${o.join(",")}" for keyword "${n}"`);
    }
  }
}
function Gh(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function zl(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function Hh(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    zl(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function Fo(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, Et.checkStrictMode)(e, t, e.opts.strictTypes);
}
let ql = class {
  constructor(t, r, n) {
    if ((0, xr.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, Et.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", Gl(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, xr.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
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
    (t ? Gr.reportExtraError : Gr.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Gr.reportError)(this, this.def.$dataError || Gr.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Gr.resetErrorsCount)(this.gen, this.errsCount);
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
    const { gen: n, schemaCode: s, schemaType: o, def: i } = this;
    n.if((0, K.or)((0, K._)`${s} === undefined`, r)), t !== K.nil && n.assign(t, !0), (o.length || i.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== K.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: o } = this;
    return (0, K.or)(i(), l());
    function i() {
      if (n.length) {
        if (!(r instanceof K.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, K._)`${(0, Qn.checkDataTypes)(c, r, o.opts.strictNumbers, Qn.DataType.Wrong)}`;
      }
      return K.nil;
    }
    function l() {
      if (s.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, K._)`!${c}(${r})`;
      }
      return K.nil;
    }
  }
  subschema(t, r) {
    const n = (0, Is.getSubschema)(this.it, t);
    (0, Is.extendSubschemaData)(n, this.it, t), (0, Is.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return Ah(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = Et.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = Et.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, K.Name)), !0;
  }
};
ct.KeywordCxt = ql;
function Kl(e, t, r, n) {
  const s = new ql(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, xr.funcKeywordCode)(s, r) : "macro" in r ? (0, xr.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, xr.funcKeywordCode)(s, r);
}
const Wh = /^\/(?:[^~]|~0|~1)*$/, Jh = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function Gl(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, o;
  if (e === "")
    return J.default.rootData;
  if (e[0] === "/") {
    if (!Wh.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, o = J.default.rootData;
  } else {
    const d = Jh.exec(e);
    if (!d)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const u = +d[1];
    if (s = d[2], s === "#") {
      if (u >= t)
        throw new Error(c("property/index", u));
      return n[t - u];
    }
    if (u > t)
      throw new Error(c("data", u));
    if (o = r[t - u], !s)
      return o;
  }
  let i = o;
  const l = s.split("/");
  for (const d of l)
    d && (o = (0, K._)`${o}${(0, K.getProperty)((0, Et.unescapeJsonPointer)(d))}`, i = (0, K._)`${i} && ${o}`);
  return i;
  function c(d, u) {
    return `Cannot access ${d} ${u} levels up, current level is ${t}`;
  }
}
ct.getData = Gl;
var hn = {};
Object.defineProperty(hn, "__esModule", { value: !0 });
let Bh = class extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
};
hn.default = Bh;
var Dr = {};
Object.defineProperty(Dr, "__esModule", { value: !0 });
const js = Te;
let Xh = class extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, js.resolveUrl)(t, r, n), this.missingSchema = (0, js.normalizeId)((0, js.getFullPath)(t, this.missingRef));
  }
};
Dr.default = Xh;
var Ke = {};
Object.defineProperty(Ke, "__esModule", { value: !0 });
Ke.resolveSchema = Ke.getCompilingSchema = Ke.resolveRef = Ke.compileSchema = Ke.SchemaEnv = void 0;
const rt = te, Yh = hn, xt = gt, at = Te, Ri = M, Qh = ct;
let hs = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, at.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
Ke.SchemaEnv = hs;
function Vo(e) {
  const t = Hl.call(this, e);
  if (t)
    return t;
  const r = (0, at.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: o } = this.opts, i = new rt.CodeGen(this.scope, { es5: n, lines: s, ownProperties: o });
  let l;
  e.$async && (l = i.scopeValue("Error", {
    ref: Yh.default,
    code: (0, rt._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = i.scopeName("validate");
  e.validateName = c;
  const d = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: xt.default.data,
    parentData: xt.default.parentData,
    parentDataProperty: xt.default.parentDataProperty,
    dataNames: [xt.default.data],
    dataPathArr: [rt.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, rt.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: l,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: rt.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, rt._)`""`,
    opts: this.opts,
    self: this
  };
  let u;
  try {
    this._compilations.add(e), (0, Qh.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const m = i.toString();
    u = `${i.scopeRefs(xt.default.scope)}return ${m}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const _ = new Function(`${xt.default.self}`, `${xt.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(c, { ref: _ }), _.errors = null, _.schema = e.schema, _.schemaEnv = e, e.$async && (_.$async = !0), this.opts.code.source === !0 && (_.source = { validateName: c, validateCode: m, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: E, items: g } = d;
      _.evaluated = {
        props: E instanceof rt.Name ? void 0 : E,
        items: g instanceof rt.Name ? void 0 : g,
        dynamicProps: E instanceof rt.Name,
        dynamicItems: g instanceof rt.Name
      }, _.source && (_.source.evaluated = (0, rt.stringify)(_.evaluated));
    }
    return e.validate = _, e;
  } catch (m) {
    throw delete e.validate, delete e.validateName, u && this.logger.error("Error compiling schema, function code:", u), m;
  } finally {
    this._compilations.delete(e);
  }
}
Ke.compileSchema = Vo;
function Zh(e, t, r) {
  var n;
  r = (0, at.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let o = tm.call(this, e, r);
  if (o === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: l } = this.opts;
    i && (o = new hs({ schema: i, schemaId: l, root: e, baseId: t }));
  }
  if (o !== void 0)
    return e.refs[r] = xh.call(this, o);
}
Ke.resolveRef = Zh;
function xh(e) {
  return (0, at.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Vo.call(this, e);
}
function Hl(e) {
  for (const t of this._compilations)
    if (em(t, e))
      return t;
}
Ke.getCompilingSchema = Hl;
function em(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function tm(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || ms.call(this, e, t);
}
function ms(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, at._getFullPath)(this.opts.uriResolver, r);
  let s = (0, at.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return As.call(this, r, e);
  const o = (0, at.normalizeId)(n), i = this.refs[o] || this.schemas[o];
  if (typeof i == "string") {
    const l = ms.call(this, e, i);
    return typeof (l == null ? void 0 : l.schema) != "object" ? void 0 : As.call(this, r, l);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || Vo.call(this, i), o === (0, at.normalizeId)(t)) {
      const { schema: l } = i, { schemaId: c } = this.opts, d = l[c];
      return d && (s = (0, at.resolveUrl)(this.opts.uriResolver, s, d)), new hs({ schema: l, schemaId: c, root: e, baseId: s });
    }
    return As.call(this, r, i);
  }
}
Ke.resolveSchema = ms;
const rm = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function As(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const l of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, Ri.unescapeFragment)(l)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !rm.has(l) && d && (t = (0, at.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let o;
  if (typeof r != "boolean" && r.$ref && !(0, Ri.schemaHasRulesButRef)(r, this.RULES)) {
    const l = (0, at.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    o = ms.call(this, n, l);
  }
  const { schemaId: i } = this.opts;
  if (o = o || new hs({ schema: r, schemaId: i, root: n, baseId: t }), o.schema !== o.root.schema)
    return o;
}
const nm = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", sm = "Meta-schema for $data reference (JSON AnySchema extension proposal)", om = "object", am = [
  "$data"
], im = {
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
}, cm = !1, lm = {
  $id: nm,
  description: sm,
  type: om,
  required: am,
  properties: im,
  additionalProperties: cm
};
var Uo = {}, ps = { exports: {} };
const um = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), Wl = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function Jl(e) {
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
const dm = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function Ti(e) {
  return e.length = 0, !0;
}
function fm(e, t, r) {
  if (e.length) {
    const n = Jl(e);
    if (n !== "")
      t.push(n);
    else
      return r.error = !0, !1;
    e.length = 0;
  }
  return !0;
}
function hm(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let o = !1, i = !1, l = fm;
  for (let c = 0; c < e.length; c++) {
    const d = e[c];
    if (!(d === "[" || d === "]"))
      if (d === ":") {
        if (o === !0 && (i = !0), !l(s, n, r))
          break;
        if (++t > 7) {
          r.error = !0;
          break;
        }
        c > 0 && e[c - 1] === ":" && (o = !0), n.push(":");
        continue;
      } else if (d === "%") {
        if (!l(s, n, r))
          break;
        l = Ti;
      } else {
        s.push(d);
        continue;
      }
  }
  return s.length && (l === Ti ? r.zone = s.join("") : i ? n.push(s.join("")) : n.push(Jl(s))), r.address = n.join(""), r;
}
function Bl(e) {
  if (mm(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = hm(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function mm(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function pm(e) {
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
function $m(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function ym(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!Wl(r)) {
      const n = Bl(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var Xl = {
  nonSimpleDomain: dm,
  recomposeAuthority: ym,
  normalizeComponentEncoding: $m,
  removeDotSegments: pm,
  isIPv4: Wl,
  isUUID: um,
  normalizeIPv6: Bl
};
const { isUUID: _m } = Xl, gm = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function Yl(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function Ql(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function Zl(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function vm(e) {
  return e.secure = Yl(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function wm(e) {
  if ((e.port === (Yl(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function Em(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(gm);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, o = zo(s);
    e.path = void 0, o && (e = o.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function Sm(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, o = zo(s);
  o && (e = o.serialize(e, t));
  const i = e, l = e.nss;
  return i.path = `${n || t.nid}:${l}`, t.skipEscape = !0, i;
}
function bm(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !_m(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function Pm(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const xl = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: Ql,
    serialize: Zl
  }
), Nm = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: xl.domainHost,
    parse: Ql,
    serialize: Zl
  }
), zn = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: vm,
    serialize: wm
  }
), Om = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: zn.domainHost,
    parse: zn.parse,
    serialize: zn.serialize
  }
), Rm = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: Em,
    serialize: Sm,
    skipNormalize: !0
  }
), Tm = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: bm,
    serialize: Pm,
    skipNormalize: !0
  }
), Zn = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: xl,
    https: Nm,
    ws: zn,
    wss: Om,
    urn: Rm,
    "urn:uuid": Tm
  }
);
Object.setPrototypeOf(Zn, null);
function zo(e) {
  return e && (Zn[
    /** @type {SchemeName} */
    e
  ] || Zn[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var Im = {
  SCHEMES: Zn,
  getSchemeHandler: zo
};
const { normalizeIPv6: jm, removeDotSegments: Yr, recomposeAuthority: Am, normalizeComponentEncoding: En, isIPv4: km, nonSimpleDomain: Cm } = Xl, { SCHEMES: Dm, getSchemeHandler: eu } = Im;
function Mm(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  yt(Pt(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  Pt(yt(e, t), t)), e;
}
function Lm(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, s = tu(Pt(e, n), Pt(t, n), n, !0);
  return n.skipEscape = !0, yt(s, n);
}
function tu(e, t, r, n) {
  const s = {};
  return n || (e = Pt(yt(e, r), r), t = Pt(yt(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Yr(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Yr(t.path || ""), s.query = t.query) : (t.path ? (t.path[0] === "/" ? s.path = Yr(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = Yr(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function Fm(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = yt(En(Pt(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = yt(En(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = yt(En(Pt(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = yt(En(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function yt(e, t) {
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
  }, n = Object.assign({}, t), s = [], o = eu(n.scheme || r.scheme);
  o && o.serialize && o.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const i = Am(r);
  if (i !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(i), r.path && r.path[0] !== "/" && s.push("/")), r.path !== void 0) {
    let l = r.path;
    !n.absolutePath && (!o || !o.absolutePath) && (l = Yr(l)), i === void 0 && l[0] === "/" && l[1] === "/" && (l = "/%2F" + l.slice(2)), s.push(l);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const Vm = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function Pt(e, t) {
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
  const o = e.match(Vm);
  if (o) {
    if (n.scheme = o[1], n.userinfo = o[3], n.host = o[4], n.port = parseInt(o[5], 10), n.path = o[6] || "", n.query = o[7], n.fragment = o[8], isNaN(n.port) && (n.port = o[5]), n.host)
      if (km(n.host) === !1) {
        const c = jm(n.host);
        n.host = c.host.toLowerCase(), s = c.isIPV6;
      } else
        s = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const i = eu(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!i || !i.unicodeSupport) && n.host && (r.domainHost || i && i.domainHost) && s === !1 && Cm(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (l) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + l;
      }
    (!i || i && !i.skipNormalize) && (e.indexOf("%") !== -1 && (n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), n.host !== void 0 && (n.host = unescape(n.host))), n.path && (n.path = escape(unescape(n.path))), n.fragment && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), i && i.parse && i.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const qo = {
  SCHEMES: Dm,
  normalize: Mm,
  resolve: Lm,
  resolveComponent: tu,
  equal: Fm,
  serialize: yt,
  parse: Pt
};
ps.exports = qo;
ps.exports.default = qo;
ps.exports.fastUri = qo;
var ru = ps.exports;
Object.defineProperty(Uo, "__esModule", { value: !0 });
const nu = ru;
nu.code = 'require("ajv/dist/runtime/uri").default';
Uo.default = nu;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = ct;
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
  const n = hn, s = Dr, o = cr, i = Ke, l = te, c = Te, d = Ee, u = M, m = lm, P = Uo, _ = (v, p) => new RegExp(v, p);
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
    var p, S, $, a, f, b, j, A, q, F, re, He, Lt, Ft, Vt, Ut, zt, qt, Kt, Gt, Ht, Wt, Jt, Bt, Xt;
    const tt = v.strict, Yt = (p = v.code) === null || p === void 0 ? void 0 : p.optimize, qr = Yt === !0 || Yt === void 0 ? 1 : Yt || 0, Kr = ($ = (S = v.code) === null || S === void 0 ? void 0 : S.regExp) !== null && $ !== void 0 ? $ : _, Ts = (a = v.uriResolver) !== null && a !== void 0 ? a : P.default;
    return {
      strictSchema: (b = (f = v.strictSchema) !== null && f !== void 0 ? f : tt) !== null && b !== void 0 ? b : !0,
      strictNumbers: (A = (j = v.strictNumbers) !== null && j !== void 0 ? j : tt) !== null && A !== void 0 ? A : !0,
      strictTypes: (F = (q = v.strictTypes) !== null && q !== void 0 ? q : tt) !== null && F !== void 0 ? F : "log",
      strictTuples: (He = (re = v.strictTuples) !== null && re !== void 0 ? re : tt) !== null && He !== void 0 ? He : "log",
      strictRequired: (Ft = (Lt = v.strictRequired) !== null && Lt !== void 0 ? Lt : tt) !== null && Ft !== void 0 ? Ft : !1,
      code: v.code ? { ...v.code, optimize: qr, regExp: Kr } : { optimize: qr, regExp: Kr },
      loopRequired: (Vt = v.loopRequired) !== null && Vt !== void 0 ? Vt : w,
      loopEnum: (Ut = v.loopEnum) !== null && Ut !== void 0 ? Ut : w,
      meta: (zt = v.meta) !== null && zt !== void 0 ? zt : !0,
      messages: (qt = v.messages) !== null && qt !== void 0 ? qt : !0,
      inlineRefs: (Kt = v.inlineRefs) !== null && Kt !== void 0 ? Kt : !0,
      schemaId: (Gt = v.schemaId) !== null && Gt !== void 0 ? Gt : "$id",
      addUsedSchema: (Ht = v.addUsedSchema) !== null && Ht !== void 0 ? Ht : !0,
      validateSchema: (Wt = v.validateSchema) !== null && Wt !== void 0 ? Wt : !0,
      validateFormats: (Jt = v.validateFormats) !== null && Jt !== void 0 ? Jt : !0,
      unicodeRegExp: (Bt = v.unicodeRegExp) !== null && Bt !== void 0 ? Bt : !0,
      int32range: (Xt = v.int32range) !== null && Xt !== void 0 ? Xt : !0,
      uriResolver: Ts
    };
  }
  class R {
    constructor(p = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), p = this.opts = { ...p, ...N(p) };
      const { es5: S, lines: $ } = this.opts.code;
      this.scope = new l.ValueScope({ scope: {}, prefixes: g, es5: S, lines: $ }), this.logger = Q(p.logger);
      const a = p.validateFormats;
      p.validateFormats = !1, this.RULES = (0, o.getRules)(), I.call(this, y, p, "NOT SUPPORTED"), I.call(this, h, p, "DEPRECATED", "warn"), this._metaOpts = H.call(this), p.formats && de.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), p.keywords && V.call(this, p.keywords), typeof p.meta == "object" && this.addMetaSchema(p.meta), W.call(this), p.validateFormats = a;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: p, meta: S, schemaId: $ } = this.opts;
      let a = m;
      $ === "id" && (a = { ...m }, a.id = a.$id, delete a.$id), S && p && this.addMetaSchema(a, a[$], !1);
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
      const a = $(S);
      return "$async" in $ || (this.errors = $.errors), a;
    }
    compile(p, S) {
      const $ = this._addSchema(p, S);
      return $.validate || this._compileSchemaEnv($);
    }
    compileAsync(p, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: $ } = this.opts;
      return a.call(this, p, S);
      async function a(F, re) {
        await f.call(this, F.$schema);
        const He = this._addSchema(F, re);
        return He.validate || b.call(this, He);
      }
      async function f(F) {
        F && !this.getSchema(F) && await a.call(this, { $ref: F }, !0);
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
    addSchema(p, S, $, a = this.opts.validateSchema) {
      if (Array.isArray(p)) {
        for (const b of p)
          this.addSchema(b, void 0, $, a);
        return this;
      }
      let f;
      if (typeof p == "object") {
        const { schemaId: b } = this.opts;
        if (f = p[b], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${b} must be string`);
      }
      return S = (0, c.normalizeId)(S || f), this._checkUnique(S), this.schemas[S] = this._addSchema(p, $, S, a, !0), this;
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
      const a = this.validate($, p);
      if (!a && S) {
        const f = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(f);
        else
          throw new Error(f);
      }
      return a;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(p) {
      let S;
      for (; typeof (S = z.call(this, p)) == "string"; )
        p = S;
      if (S === void 0) {
        const { schemaId: $ } = this.opts, a = new i.SchemaEnv({ schema: {}, schemaId: $ });
        if (S = i.resolveSchema.call(this, a, p), !S)
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
        return (0, u.eachItem)($, (f) => k.call(this, f)), this;
      D.call(this, S);
      const a = {
        ...S,
        type: (0, d.getJSONTypes)(S.type),
        schemaType: (0, d.getJSONTypes)(S.schemaType)
      };
      return (0, u.eachItem)($, a.type.length === 0 ? (f) => k.call(this, f, a) : (f) => a.type.forEach((b) => k.call(this, f, a, b))), this;
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
        const a = $.rules.findIndex((f) => f.keyword === p);
        a >= 0 && $.rules.splice(a, 1);
      }
      return this;
    }
    // Add format
    addFormat(p, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[p] = S, this;
    }
    errorsText(p = this.errors, { separator: S = ", ", dataVar: $ = "data" } = {}) {
      return !p || p.length === 0 ? "No errors" : p.map((a) => `${$}${a.instancePath} ${a.message}`).reduce((a, f) => a + S + f);
    }
    $dataMetaSchema(p, S) {
      const $ = this.RULES.all;
      p = JSON.parse(JSON.stringify(p));
      for (const a of S) {
        const f = a.split("/").slice(1);
        let b = p;
        for (const j of f)
          b = b[j];
        for (const j in $) {
          const A = $[j];
          if (typeof A != "object")
            continue;
          const { $data: q } = A.definition, F = b[j];
          q && F && (b[j] = T(F));
        }
      }
      return p;
    }
    _removeAllSchemas(p, S) {
      for (const $ in p) {
        const a = p[$];
        (!S || S.test($)) && (typeof a == "string" ? delete p[$] : a && !a.meta && (this._cache.delete(a.schema), delete p[$]));
      }
    }
    _addSchema(p, S, $, a = this.opts.validateSchema, f = this.opts.addUsedSchema) {
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
      return A = new i.SchemaEnv({ schema: p, schemaId: j, meta: S, baseId: $, localRefs: q }), this._cache.set(A.schema, A), f && !$.startsWith("#") && ($ && this._checkUnique($), this.refs[$] = A), a && this.validateSchema(p, !0), A;
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
  function I(v, p, S, $ = "error") {
    for (const a in v) {
      const f = a;
      f in p && this.logger[$](`${S}: option ${a}. ${v[f]}`);
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
  function de() {
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
  const fe = /^[a-z_$][a-z0-9_$:-]*$/i;
  function C(v, p) {
    const { RULES: S } = this;
    if ((0, u.eachItem)(v, ($) => {
      if (S.keywords[$])
        throw new Error(`Keyword ${$} is already defined`);
      if (!fe.test($))
        throw new Error(`Keyword ${$} has invalid name`);
    }), !!p && p.$data && !("code" in p || "validate" in p))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function k(v, p, S) {
    var $;
    const a = p == null ? void 0 : p.post;
    if (S && a)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let b = a ? f.post : f.rules.find(({ type: A }) => A === S);
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
    const $ = v.rules.findIndex((a) => a.keyword === S);
    $ >= 0 ? v.rules.splice($, 0, p) : (v.rules.push(p), this.logger.warn(`rule ${S} is not defined`));
  }
  function D(v) {
    let { metaSchema: p } = v;
    p !== void 0 && (v.$data && this.opts.$data && (p = T(p)), v.validateSchema = this.compile(p, !0));
  }
  const O = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function T(v) {
    return { anyOf: [v, O] };
  }
})(ml);
var Ko = {}, Go = {}, Ho = {};
Object.defineProperty(Ho, "__esModule", { value: !0 });
const Um = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
Ho.default = Um;
var lr = {};
Object.defineProperty(lr, "__esModule", { value: !0 });
lr.callRef = lr.getValidate = void 0;
const zm = Dr, Ii = x, ze = te, mr = gt, ji = Ke, Sn = M, qm = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: o, validateName: i, opts: l, self: c } = n, { root: d } = o;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return m();
    const u = ji.resolveRef.call(c, d, s, r);
    if (u === void 0)
      throw new zm.default(n.opts.uriResolver, s, r);
    if (u instanceof ji.SchemaEnv)
      return P(u);
    return _(u);
    function m() {
      if (o === d)
        return qn(e, i, o, o.$async);
      const E = t.scopeValue("root", { ref: d });
      return qn(e, (0, ze._)`${E}.validate`, d, d.$async);
    }
    function P(E) {
      const g = su(e, E);
      qn(e, g, E, E.$async);
    }
    function _(E) {
      const g = t.scopeValue("schema", l.code.source === !0 ? { ref: E, code: (0, ze.stringify)(E) } : { ref: E }), y = t.name("valid"), h = e.subschema({
        schema: E,
        dataTypes: [],
        schemaPath: ze.nil,
        topSchemaRef: g,
        errSchemaPath: r
      }, y);
      e.mergeEvaluated(h), e.ok(y);
    }
  }
};
function su(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, ze._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
lr.getValidate = su;
function qn(e, t, r, n) {
  const { gen: s, it: o } = e, { allErrors: i, schemaEnv: l, opts: c } = o, d = c.passContext ? mr.default.this : ze.nil;
  n ? u() : m();
  function u() {
    if (!l.$async)
      throw new Error("async schema referenced by sync schema");
    const E = s.let("valid");
    s.try(() => {
      s.code((0, ze._)`await ${(0, Ii.callValidateCode)(e, t, d)}`), _(t), i || s.assign(E, !0);
    }, (g) => {
      s.if((0, ze._)`!(${g} instanceof ${o.ValidationError})`, () => s.throw(g)), P(g), i || s.assign(E, !1);
    }), e.ok(E);
  }
  function m() {
    e.result((0, Ii.callValidateCode)(e, t, d), () => _(t), () => P(t));
  }
  function P(E) {
    const g = (0, ze._)`${E}.errors`;
    s.assign(mr.default.vErrors, (0, ze._)`${mr.default.vErrors} === null ? ${g} : ${mr.default.vErrors}.concat(${g})`), s.assign(mr.default.errors, (0, ze._)`${mr.default.vErrors}.length`);
  }
  function _(E) {
    var g;
    if (!o.opts.unevaluated)
      return;
    const y = (g = r == null ? void 0 : r.validate) === null || g === void 0 ? void 0 : g.evaluated;
    if (o.props !== !0)
      if (y && !y.dynamicProps)
        y.props !== void 0 && (o.props = Sn.mergeEvaluated.props(s, y.props, o.props));
      else {
        const h = s.var("props", (0, ze._)`${E}.evaluated.props`);
        o.props = Sn.mergeEvaluated.props(s, h, o.props, ze.Name);
      }
    if (o.items !== !0)
      if (y && !y.dynamicItems)
        y.items !== void 0 && (o.items = Sn.mergeEvaluated.items(s, y.items, o.items));
      else {
        const h = s.var("items", (0, ze._)`${E}.evaluated.items`);
        o.items = Sn.mergeEvaluated.items(s, h, o.items, ze.Name);
      }
  }
}
lr.callRef = qn;
lr.default = qm;
Object.defineProperty(Go, "__esModule", { value: !0 });
const Km = Ho, Gm = lr, Hm = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  Km.default,
  Gm.default
];
Go.default = Hm;
var Wo = {}, Jo = {};
Object.defineProperty(Jo, "__esModule", { value: !0 });
const xn = te, Ot = xn.operators, es = {
  maximum: { okStr: "<=", ok: Ot.LTE, fail: Ot.GT },
  minimum: { okStr: ">=", ok: Ot.GTE, fail: Ot.LT },
  exclusiveMaximum: { okStr: "<", ok: Ot.LT, fail: Ot.GTE },
  exclusiveMinimum: { okStr: ">", ok: Ot.GT, fail: Ot.LTE }
}, Wm = {
  message: ({ keyword: e, schemaCode: t }) => (0, xn.str)`must be ${es[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, xn._)`{comparison: ${es[e].okStr}, limit: ${t}}`
}, Jm = {
  keyword: Object.keys(es),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Wm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, xn._)`${r} ${es[t].fail} ${n} || isNaN(${r})`);
  }
};
Jo.default = Jm;
var Bo = {};
Object.defineProperty(Bo, "__esModule", { value: !0 });
const en = te, Bm = {
  message: ({ schemaCode: e }) => (0, en.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, en._)`{multipleOf: ${e}}`
}, Xm = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Bm,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, o = s.opts.multipleOfPrecision, i = t.let("res"), l = o ? (0, en._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${o}` : (0, en._)`${i} !== parseInt(${i})`;
    e.fail$data((0, en._)`(${n} === 0 || (${i} = ${r}/${n}, ${l}))`);
  }
};
Bo.default = Xm;
var Xo = {}, Yo = {};
Object.defineProperty(Yo, "__esModule", { value: !0 });
function ou(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Yo.default = ou;
ou.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Xo, "__esModule", { value: !0 });
const nr = te, Ym = M, Qm = Yo, Zm = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, nr.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, nr._)`{limit: ${e}}`
}, xm = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: Zm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, o = t === "maxLength" ? nr.operators.GT : nr.operators.LT, i = s.opts.unicode === !1 ? (0, nr._)`${r}.length` : (0, nr._)`${(0, Ym.useFunc)(e.gen, Qm.default)}(${r})`;
    e.fail$data((0, nr._)`${i} ${o} ${n}`);
  }
};
Xo.default = xm;
var Qo = {};
Object.defineProperty(Qo, "__esModule", { value: !0 });
const ep = x, ts = te, tp = {
  message: ({ schemaCode: e }) => (0, ts.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, ts._)`{pattern: ${e}}`
}, rp = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: tp,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: o } = e, i = o.opts.unicodeRegExp ? "u" : "", l = r ? (0, ts._)`(new RegExp(${s}, ${i}))` : (0, ep.usePattern)(e, n);
    e.fail$data((0, ts._)`!${l}.test(${t})`);
  }
};
Qo.default = rp;
var Zo = {};
Object.defineProperty(Zo, "__esModule", { value: !0 });
const tn = te, np = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, tn.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, tn._)`{limit: ${e}}`
}, sp = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: np,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? tn.operators.GT : tn.operators.LT;
    e.fail$data((0, tn._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Zo.default = sp;
var xo = {};
Object.defineProperty(xo, "__esModule", { value: !0 });
const Hr = x, rn = te, op = M, ap = {
  message: ({ params: { missingProperty: e } }) => (0, rn.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, rn._)`{missingProperty: ${e}}`
}, ip = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: ap,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: o, it: i } = e, { opts: l } = i;
    if (!o && r.length === 0)
      return;
    const c = r.length >= l.loopRequired;
    if (i.allErrors ? d() : u(), l.strictRequired) {
      const _ = e.parentSchema.properties, { definedProperties: E } = e.it;
      for (const g of r)
        if ((_ == null ? void 0 : _[g]) === void 0 && !E.has(g)) {
          const y = i.schemaEnv.baseId + i.errSchemaPath, h = `required property "${g}" is not defined at "${y}" (strictRequired)`;
          (0, op.checkStrictMode)(i, h, i.opts.strictRequired);
        }
    }
    function d() {
      if (c || o)
        e.block$data(rn.nil, m);
      else
        for (const _ of r)
          (0, Hr.checkReportMissingProp)(e, _);
    }
    function u() {
      const _ = t.let("missing");
      if (c || o) {
        const E = t.let("valid", !0);
        e.block$data(E, () => P(_, E)), e.ok(E);
      } else
        t.if((0, Hr.checkMissingProp)(e, r, _)), (0, Hr.reportMissingProp)(e, _), t.else();
    }
    function m() {
      t.forOf("prop", n, (_) => {
        e.setParams({ missingProperty: _ }), t.if((0, Hr.noPropertyInData)(t, s, _, l.ownProperties), () => e.error());
      });
    }
    function P(_, E) {
      e.setParams({ missingProperty: _ }), t.forOf(_, n, () => {
        t.assign(E, (0, Hr.propertyInData)(t, s, _, l.ownProperties)), t.if((0, rn.not)(E), () => {
          e.error(), t.break();
        });
      }, rn.nil);
    }
  }
};
xo.default = ip;
var ea = {};
Object.defineProperty(ea, "__esModule", { value: !0 });
const nn = te, cp = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, nn.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, nn._)`{limit: ${e}}`
}, lp = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: cp,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? nn.operators.GT : nn.operators.LT;
    e.fail$data((0, nn._)`${r}.length ${s} ${n}`);
  }
};
ea.default = lp;
var ta = {}, mn = {};
Object.defineProperty(mn, "__esModule", { value: !0 });
const au = fs;
au.code = 'require("ajv/dist/runtime/equal").default';
mn.default = au;
Object.defineProperty(ta, "__esModule", { value: !0 });
const ks = Ee, Ne = te, up = M, dp = mn, fp = {
  message: ({ params: { i: e, j: t } }) => (0, Ne.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Ne._)`{i: ${e}, j: ${t}}`
}, hp = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: fp,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: o, schemaCode: i, it: l } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = o.items ? (0, ks.getSchemaTypes)(o.items) : [];
    e.block$data(c, u, (0, Ne._)`${i} === false`), e.ok(c);
    function u() {
      const E = t.let("i", (0, Ne._)`${r}.length`), g = t.let("j");
      e.setParams({ i: E, j: g }), t.assign(c, !0), t.if((0, Ne._)`${E} > 1`, () => (m() ? P : _)(E, g));
    }
    function m() {
      return d.length > 0 && !d.some((E) => E === "object" || E === "array");
    }
    function P(E, g) {
      const y = t.name("item"), h = (0, ks.checkDataTypes)(d, y, l.opts.strictNumbers, ks.DataType.Wrong), w = t.const("indices", (0, Ne._)`{}`);
      t.for((0, Ne._)`;${E}--;`, () => {
        t.let(y, (0, Ne._)`${r}[${E}]`), t.if(h, (0, Ne._)`continue`), d.length > 1 && t.if((0, Ne._)`typeof ${y} == "string"`, (0, Ne._)`${y} += "_"`), t.if((0, Ne._)`typeof ${w}[${y}] == "number"`, () => {
          t.assign(g, (0, Ne._)`${w}[${y}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Ne._)`${w}[${y}] = ${E}`);
      });
    }
    function _(E, g) {
      const y = (0, up.useFunc)(t, dp.default), h = t.name("outer");
      t.label(h).for((0, Ne._)`;${E}--;`, () => t.for((0, Ne._)`${g} = ${E}; ${g}--;`, () => t.if((0, Ne._)`${y}(${r}[${E}], ${r}[${g}])`, () => {
        e.error(), t.assign(c, !1).break(h);
      })));
    }
  }
};
ta.default = hp;
var ra = {};
Object.defineProperty(ra, "__esModule", { value: !0 });
const Zs = te, mp = M, pp = mn, $p = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Zs._)`{allowedValue: ${e}}`
}, yp = {
  keyword: "const",
  $data: !0,
  error: $p,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: o } = e;
    n || o && typeof o == "object" ? e.fail$data((0, Zs._)`!${(0, mp.useFunc)(t, pp.default)}(${r}, ${s})`) : e.fail((0, Zs._)`${o} !== ${r}`);
  }
};
ra.default = yp;
var na = {};
Object.defineProperty(na, "__esModule", { value: !0 });
const Qr = te, _p = M, gp = mn, vp = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Qr._)`{allowedValues: ${e}}`
}, wp = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: vp,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: o, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const l = s.length >= i.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, _p.useFunc)(t, gp.default));
    let u;
    if (l || n)
      u = t.let("valid"), e.block$data(u, m);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const _ = t.const("vSchema", o);
      u = (0, Qr.or)(...s.map((E, g) => P(_, g)));
    }
    e.pass(u);
    function m() {
      t.assign(u, !1), t.forOf("v", o, (_) => t.if((0, Qr._)`${d()}(${r}, ${_})`, () => t.assign(u, !0).break()));
    }
    function P(_, E) {
      const g = s[E];
      return typeof g == "object" && g !== null ? (0, Qr._)`${d()}(${r}, ${_}[${E}])` : (0, Qr._)`${r} === ${g}`;
    }
  }
};
na.default = wp;
Object.defineProperty(Wo, "__esModule", { value: !0 });
const Ep = Jo, Sp = Bo, bp = Xo, Pp = Qo, Np = Zo, Op = xo, Rp = ea, Tp = ta, Ip = ra, jp = na, Ap = [
  // number
  Ep.default,
  Sp.default,
  // string
  bp.default,
  Pp.default,
  // object
  Np.default,
  Op.default,
  // array
  Rp.default,
  Tp.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  Ip.default,
  jp.default
];
Wo.default = Ap;
var sa = {}, Mr = {};
Object.defineProperty(Mr, "__esModule", { value: !0 });
Mr.validateAdditionalItems = void 0;
const sr = te, xs = M, kp = {
  message: ({ params: { len: e } }) => (0, sr.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, sr._)`{limit: ${e}}`
}, Cp = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: kp,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, xs.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    iu(e, n);
  }
};
function iu(e, t) {
  const { gen: r, schema: n, data: s, keyword: o, it: i } = e;
  i.items = !0;
  const l = r.const("len", (0, sr._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, sr._)`${l} <= ${t.length}`);
  else if (typeof n == "object" && !(0, xs.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, sr._)`${l} <= ${t.length}`);
    r.if((0, sr.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, l, (u) => {
      e.subschema({ keyword: o, dataProp: u, dataPropType: xs.Type.Num }, d), i.allErrors || r.if((0, sr.not)(d), () => r.break());
    });
  }
}
Mr.validateAdditionalItems = iu;
Mr.default = Cp;
var oa = {}, Lr = {};
Object.defineProperty(Lr, "__esModule", { value: !0 });
Lr.validateTuple = void 0;
const Ai = te, Kn = M, Dp = x, Mp = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return cu(e, "additionalItems", t);
    r.items = !0, !(0, Kn.alwaysValidSchema)(r, t) && e.ok((0, Dp.validateArray)(e));
  }
};
function cu(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: o, keyword: i, it: l } = e;
  u(s), l.opts.unevaluated && r.length && l.items !== !0 && (l.items = Kn.mergeEvaluated.items(n, r.length, l.items));
  const c = n.name("valid"), d = n.const("len", (0, Ai._)`${o}.length`);
  r.forEach((m, P) => {
    (0, Kn.alwaysValidSchema)(l, m) || (n.if((0, Ai._)`${d} > ${P}`, () => e.subschema({
      keyword: i,
      schemaProp: P,
      dataProp: P
    }, c)), e.ok(c));
  });
  function u(m) {
    const { opts: P, errSchemaPath: _ } = l, E = r.length, g = E === m.minItems && (E === m.maxItems || m[t] === !1);
    if (P.strictTuples && !g) {
      const y = `"${i}" is ${E}-tuple, but minItems or maxItems/${t} are not specified or different at path "${_}"`;
      (0, Kn.checkStrictMode)(l, y, P.strictTuples);
    }
  }
}
Lr.validateTuple = cu;
Lr.default = Mp;
Object.defineProperty(oa, "__esModule", { value: !0 });
const Lp = Lr, Fp = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, Lp.validateTuple)(e, "items")
};
oa.default = Fp;
var aa = {};
Object.defineProperty(aa, "__esModule", { value: !0 });
const ki = te, Vp = M, Up = x, zp = Mr, qp = {
  message: ({ params: { len: e } }) => (0, ki.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, ki._)`{limit: ${e}}`
}, Kp = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: qp,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, Vp.alwaysValidSchema)(n, t) && (s ? (0, zp.validateAdditionalItems)(e, s) : e.ok((0, Up.validateArray)(e)));
  }
};
aa.default = Kp;
var ia = {};
Object.defineProperty(ia, "__esModule", { value: !0 });
const Ye = te, bn = M, Gp = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ye.str)`must contain at least ${e} valid item(s)` : (0, Ye.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ye._)`{minContains: ${e}}` : (0, Ye._)`{minContains: ${e}, maxContains: ${t}}`
}, Hp = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: Gp,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: o } = e;
    let i, l;
    const { minContains: c, maxContains: d } = n;
    o.opts.next ? (i = c === void 0 ? 1 : c, l = d) : i = 1;
    const u = t.const("len", (0, Ye._)`${s}.length`);
    if (e.setParams({ min: i, max: l }), l === void 0 && i === 0) {
      (0, bn.checkStrictMode)(o, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (l !== void 0 && i > l) {
      (0, bn.checkStrictMode)(o, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, bn.alwaysValidSchema)(o, r)) {
      let g = (0, Ye._)`${u} >= ${i}`;
      l !== void 0 && (g = (0, Ye._)`${g} && ${u} <= ${l}`), e.pass(g);
      return;
    }
    o.items = !0;
    const m = t.name("valid");
    l === void 0 && i === 1 ? _(m, () => t.if(m, () => t.break())) : i === 0 ? (t.let(m, !0), l !== void 0 && t.if((0, Ye._)`${s}.length > 0`, P)) : (t.let(m, !1), P()), e.result(m, () => e.reset());
    function P() {
      const g = t.name("_valid"), y = t.let("count", 0);
      _(g, () => t.if(g, () => E(y)));
    }
    function _(g, y) {
      t.forRange("i", 0, u, (h) => {
        e.subschema({
          keyword: "contains",
          dataProp: h,
          dataPropType: bn.Type.Num,
          compositeRule: !0
        }, g), y();
      });
    }
    function E(g) {
      t.code((0, Ye._)`${g}++`), l === void 0 ? t.if((0, Ye._)`${g} >= ${i}`, () => t.assign(m, !0).break()) : (t.if((0, Ye._)`${g} > ${l}`, () => t.assign(m, !1).break()), i === 1 ? t.assign(m, !0) : t.if((0, Ye._)`${g} >= ${i}`, () => t.assign(m, !0)));
    }
  }
};
ia.default = Hp;
var lu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = te, r = M, n = x;
  e.error = {
    message: ({ params: { property: c, depsCount: d, deps: u } }) => {
      const m = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${m} ${u} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: d, deps: u, missingProperty: m } }) => (0, t._)`{property: ${c},
    missingProperty: ${m},
    depsCount: ${d},
    deps: ${u}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [d, u] = o(c);
      i(c, d), l(c, u);
    }
  };
  function o({ schema: c }) {
    const d = {}, u = {};
    for (const m in c) {
      if (m === "__proto__")
        continue;
      const P = Array.isArray(c[m]) ? d : u;
      P[m] = c[m];
    }
    return [d, u];
  }
  function i(c, d = c.schema) {
    const { gen: u, data: m, it: P } = c;
    if (Object.keys(d).length === 0)
      return;
    const _ = u.let("missing");
    for (const E in d) {
      const g = d[E];
      if (g.length === 0)
        continue;
      const y = (0, n.propertyInData)(u, m, E, P.opts.ownProperties);
      c.setParams({
        property: E,
        depsCount: g.length,
        deps: g.join(", ")
      }), P.allErrors ? u.if(y, () => {
        for (const h of g)
          (0, n.checkReportMissingProp)(c, h);
      }) : (u.if((0, t._)`${y} && (${(0, n.checkMissingProp)(c, g, _)})`), (0, n.reportMissingProp)(c, _), u.else());
    }
  }
  e.validatePropertyDeps = i;
  function l(c, d = c.schema) {
    const { gen: u, data: m, keyword: P, it: _ } = c, E = u.name("valid");
    for (const g in d)
      (0, r.alwaysValidSchema)(_, d[g]) || (u.if(
        (0, n.propertyInData)(u, m, g, _.opts.ownProperties),
        () => {
          const y = c.subschema({ keyword: P, schemaProp: g }, E);
          c.mergeValidEvaluated(y, E);
        },
        () => u.var(E, !0)
        // TODO var
      ), c.ok(E));
  }
  e.validateSchemaDeps = l, e.default = s;
})(lu);
var ca = {};
Object.defineProperty(ca, "__esModule", { value: !0 });
const uu = te, Wp = M, Jp = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, uu._)`{propertyName: ${e.propertyName}}`
}, Bp = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: Jp,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, Wp.alwaysValidSchema)(s, r))
      return;
    const o = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, o), t.if((0, uu.not)(o), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(o);
  }
};
ca.default = Bp;
var $s = {};
Object.defineProperty($s, "__esModule", { value: !0 });
const Pn = x, st = te, Xp = gt, Nn = M, Yp = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, st._)`{additionalProperty: ${e.additionalProperty}}`
}, Qp = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Yp,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: o, it: i } = e;
    if (!o)
      throw new Error("ajv implementation error");
    const { allErrors: l, opts: c } = i;
    if (i.props = !0, c.removeAdditional !== "all" && (0, Nn.alwaysValidSchema)(i, r))
      return;
    const d = (0, Pn.allSchemaProperties)(n.properties), u = (0, Pn.allSchemaProperties)(n.patternProperties);
    m(), e.ok((0, st._)`${o} === ${Xp.default.errors}`);
    function m() {
      t.forIn("key", s, (y) => {
        !d.length && !u.length ? E(y) : t.if(P(y), () => E(y));
      });
    }
    function P(y) {
      let h;
      if (d.length > 8) {
        const w = (0, Nn.schemaRefOrVal)(i, n.properties, "properties");
        h = (0, Pn.isOwnProperty)(t, w, y);
      } else d.length ? h = (0, st.or)(...d.map((w) => (0, st._)`${y} === ${w}`)) : h = st.nil;
      return u.length && (h = (0, st.or)(h, ...u.map((w) => (0, st._)`${(0, Pn.usePattern)(e, w)}.test(${y})`))), (0, st.not)(h);
    }
    function _(y) {
      t.code((0, st._)`delete ${s}[${y}]`);
    }
    function E(y) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        _(y);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: y }), e.error(), l || t.break();
        return;
      }
      if (typeof r == "object" && !(0, Nn.alwaysValidSchema)(i, r)) {
        const h = t.name("valid");
        c.removeAdditional === "failing" ? (g(y, h, !1), t.if((0, st.not)(h), () => {
          e.reset(), _(y);
        })) : (g(y, h), l || t.if((0, st.not)(h), () => t.break()));
      }
    }
    function g(y, h, w) {
      const N = {
        keyword: "additionalProperties",
        dataProp: y,
        dataPropType: Nn.Type.Str
      };
      w === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, h);
    }
  }
};
$s.default = Qp;
var la = {};
Object.defineProperty(la, "__esModule", { value: !0 });
const Zp = ct, Ci = x, Cs = M, Di = $s, xp = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: o } = e;
    o.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Di.default.code(new Zp.KeywordCxt(o, Di.default, "additionalProperties"));
    const i = (0, Ci.allSchemaProperties)(r);
    for (const m of i)
      o.definedProperties.add(m);
    o.opts.unevaluated && i.length && o.props !== !0 && (o.props = Cs.mergeEvaluated.props(t, (0, Cs.toHash)(i), o.props));
    const l = i.filter((m) => !(0, Cs.alwaysValidSchema)(o, r[m]));
    if (l.length === 0)
      return;
    const c = t.name("valid");
    for (const m of l)
      d(m) ? u(m) : (t.if((0, Ci.propertyInData)(t, s, m, o.opts.ownProperties)), u(m), o.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(m), e.ok(c);
    function d(m) {
      return o.opts.useDefaults && !o.compositeRule && r[m].default !== void 0;
    }
    function u(m) {
      e.subschema({
        keyword: "properties",
        schemaProp: m,
        dataProp: m
      }, c);
    }
  }
};
la.default = xp;
var ua = {};
Object.defineProperty(ua, "__esModule", { value: !0 });
const Mi = x, On = te, Li = M, Fi = M, e$ = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: o } = e, { opts: i } = o, l = (0, Mi.allSchemaProperties)(r), c = l.filter((g) => (0, Li.alwaysValidSchema)(o, r[g]));
    if (l.length === 0 || c.length === l.length && (!o.opts.unevaluated || o.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, u = t.name("valid");
    o.props !== !0 && !(o.props instanceof On.Name) && (o.props = (0, Fi.evaluatedPropsToName)(t, o.props));
    const { props: m } = o;
    P();
    function P() {
      for (const g of l)
        d && _(g), o.allErrors ? E(g) : (t.var(u, !0), E(g), t.if(u));
    }
    function _(g) {
      for (const y in d)
        new RegExp(g).test(y) && (0, Li.checkStrictMode)(o, `property ${y} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function E(g) {
      t.forIn("key", n, (y) => {
        t.if((0, On._)`${(0, Mi.usePattern)(e, g)}.test(${y})`, () => {
          const h = c.includes(g);
          h || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: y,
            dataPropType: Fi.Type.Str
          }, u), o.opts.unevaluated && m !== !0 ? t.assign((0, On._)`${m}[${y}]`, !0) : !h && !o.allErrors && t.if((0, On.not)(u), () => t.break());
        });
      });
    }
  }
};
ua.default = e$;
var da = {};
Object.defineProperty(da, "__esModule", { value: !0 });
const t$ = M, r$ = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, t$.alwaysValidSchema)(n, r)) {
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
da.default = r$;
var fa = {};
Object.defineProperty(fa, "__esModule", { value: !0 });
const n$ = x, s$ = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: n$.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
fa.default = s$;
var ha = {};
Object.defineProperty(ha, "__esModule", { value: !0 });
const Gn = te, o$ = M, a$ = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Gn._)`{passingSchemas: ${e.passing}}`
}, i$ = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: a$,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const o = r, i = t.let("valid", !1), l = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: l }), t.block(d), e.result(i, () => e.reset(), () => e.error(!0));
    function d() {
      o.forEach((u, m) => {
        let P;
        (0, o$.alwaysValidSchema)(s, u) ? t.var(c, !0) : P = e.subschema({
          keyword: "oneOf",
          schemaProp: m,
          compositeRule: !0
        }, c), m > 0 && t.if((0, Gn._)`${c} && ${i}`).assign(i, !1).assign(l, (0, Gn._)`[${l}, ${m}]`).else(), t.if(c, () => {
          t.assign(i, !0), t.assign(l, m), P && e.mergeEvaluated(P, Gn.Name);
        });
      });
    }
  }
};
ha.default = i$;
var ma = {};
Object.defineProperty(ma, "__esModule", { value: !0 });
const c$ = M, l$ = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((o, i) => {
      if ((0, c$.alwaysValidSchema)(n, o))
        return;
      const l = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(l);
    });
  }
};
ma.default = l$;
var pa = {};
Object.defineProperty(pa, "__esModule", { value: !0 });
const rs = te, du = M, u$ = {
  message: ({ params: e }) => (0, rs.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, rs._)`{failingKeyword: ${e.ifClause}}`
}, d$ = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: u$,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, du.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Vi(n, "then"), o = Vi(n, "else");
    if (!s && !o)
      return;
    const i = t.let("valid", !0), l = t.name("_valid");
    if (c(), e.reset(), s && o) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(l, d("then", u), d("else", u));
    } else s ? t.if(l, d("then")) : t.if((0, rs.not)(l), d("else"));
    e.pass(i, () => e.error(!0));
    function c() {
      const u = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, l);
      e.mergeEvaluated(u);
    }
    function d(u, m) {
      return () => {
        const P = e.subschema({ keyword: u }, l);
        t.assign(i, l), e.mergeValidEvaluated(P, i), m ? t.assign(m, (0, rs._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function Vi(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, du.alwaysValidSchema)(e, r);
}
pa.default = d$;
var $a = {};
Object.defineProperty($a, "__esModule", { value: !0 });
const f$ = M, h$ = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, f$.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
$a.default = h$;
Object.defineProperty(sa, "__esModule", { value: !0 });
const m$ = Mr, p$ = oa, $$ = Lr, y$ = aa, _$ = ia, g$ = lu, v$ = ca, w$ = $s, E$ = la, S$ = ua, b$ = da, P$ = fa, N$ = ha, O$ = ma, R$ = pa, T$ = $a;
function I$(e = !1) {
  const t = [
    // any
    b$.default,
    P$.default,
    N$.default,
    O$.default,
    R$.default,
    T$.default,
    // object
    v$.default,
    w$.default,
    g$.default,
    E$.default,
    S$.default
  ];
  return e ? t.push(p$.default, y$.default) : t.push(m$.default, $$.default), t.push(_$.default), t;
}
sa.default = I$;
var ya = {}, _a = {};
Object.defineProperty(_a, "__esModule", { value: !0 });
const ye = te, j$ = {
  message: ({ schemaCode: e }) => (0, ye.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, ye._)`{format: ${e}}`
}, A$ = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: j$,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: o, schemaCode: i, it: l } = e, { opts: c, errSchemaPath: d, schemaEnv: u, self: m } = l;
    if (!c.validateFormats)
      return;
    s ? P() : _();
    function P() {
      const E = r.scopeValue("formats", {
        ref: m.formats,
        code: c.code.formats
      }), g = r.const("fDef", (0, ye._)`${E}[${i}]`), y = r.let("fType"), h = r.let("format");
      r.if((0, ye._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => r.assign(y, (0, ye._)`${g}.type || "string"`).assign(h, (0, ye._)`${g}.validate`), () => r.assign(y, (0, ye._)`"string"`).assign(h, g)), e.fail$data((0, ye.or)(w(), N()));
      function w() {
        return c.strictSchema === !1 ? ye.nil : (0, ye._)`${i} && !${h}`;
      }
      function N() {
        const R = u.$async ? (0, ye._)`(${g}.async ? await ${h}(${n}) : ${h}(${n}))` : (0, ye._)`${h}(${n})`, I = (0, ye._)`(typeof ${h} == "function" ? ${R} : ${h}.test(${n}))`;
        return (0, ye._)`${h} && ${h} !== true && ${y} === ${t} && !${I}`;
      }
    }
    function _() {
      const E = m.formats[o];
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
          m.logger.warn(I());
          return;
        }
        throw new Error(I());
        function I() {
          return `unknown format "${o}" ignored in schema at path "${d}"`;
        }
      }
      function N(I) {
        const z = I instanceof RegExp ? (0, ye.regexpCode)(I) : c.code.formats ? (0, ye._)`${c.code.formats}${(0, ye.getProperty)(o)}` : void 0, W = r.scopeValue("formats", { key: o, ref: I, code: z });
        return typeof I == "object" && !(I instanceof RegExp) ? [I.type || "string", I.validate, (0, ye._)`${W}.validate`] : ["string", I, W];
      }
      function R() {
        if (typeof E == "object" && !(E instanceof RegExp) && E.async) {
          if (!u.$async)
            throw new Error("async format in sync schema");
          return (0, ye._)`await ${h}(${n})`;
        }
        return typeof y == "function" ? (0, ye._)`${h}(${n})` : (0, ye._)`${h}.test(${n})`;
      }
    }
  }
};
_a.default = A$;
Object.defineProperty(ya, "__esModule", { value: !0 });
const k$ = _a, C$ = [k$.default];
ya.default = C$;
var Tr = {};
Object.defineProperty(Tr, "__esModule", { value: !0 });
Tr.contentVocabulary = Tr.metadataVocabulary = void 0;
Tr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Tr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(Ko, "__esModule", { value: !0 });
const D$ = Go, M$ = Wo, L$ = sa, F$ = ya, Ui = Tr, V$ = [
  D$.default,
  M$.default,
  (0, L$.default)(),
  F$.default,
  Ui.metadataVocabulary,
  Ui.contentVocabulary
];
Ko.default = V$;
var ga = {}, ys = {};
Object.defineProperty(ys, "__esModule", { value: !0 });
ys.DiscrError = void 0;
var zi;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(zi || (ys.DiscrError = zi = {}));
Object.defineProperty(ga, "__esModule", { value: !0 });
const _r = te, eo = ys, qi = Ke, U$ = Dr, z$ = M, q$ = {
  message: ({ params: { discrError: e, tagName: t } }) => e === eo.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, _r._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, K$ = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: q$,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: o } = e, { oneOf: i } = s;
    if (!o.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const l = n.propertyName;
    if (typeof l != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!i)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), d = t.const("tag", (0, _r._)`${r}${(0, _r.getProperty)(l)}`);
    t.if((0, _r._)`typeof ${d} == "string"`, () => u(), () => e.error(!1, { discrError: eo.DiscrError.Tag, tag: d, tagName: l })), e.ok(c);
    function u() {
      const _ = P();
      t.if(!1);
      for (const E in _)
        t.elseIf((0, _r._)`${d} === ${E}`), t.assign(c, m(_[E]));
      t.else(), e.error(!1, { discrError: eo.DiscrError.Mapping, tag: d, tagName: l }), t.endIf();
    }
    function m(_) {
      const E = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: _ }, E);
      return e.mergeEvaluated(g, _r.Name), E;
    }
    function P() {
      var _;
      const E = {}, g = h(s);
      let y = !0;
      for (let R = 0; R < i.length; R++) {
        let I = i[R];
        if (I != null && I.$ref && !(0, z$.schemaHasRulesButRef)(I, o.self.RULES)) {
          const W = I.$ref;
          if (I = qi.resolveRef.call(o.self, o.schemaEnv.root, o.baseId, W), I instanceof qi.SchemaEnv && (I = I.schema), I === void 0)
            throw new U$.default(o.opts.uriResolver, o.baseId, W);
        }
        const z = (_ = I == null ? void 0 : I.properties) === null || _ === void 0 ? void 0 : _[l];
        if (typeof z != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${l}"`);
        y = y && (g || h(I)), w(z, R);
      }
      if (!y)
        throw new Error(`discriminator: "${l}" must be required`);
      return E;
      function h({ required: R }) {
        return Array.isArray(R) && R.includes(l);
      }
      function w(R, I) {
        if (R.const)
          N(R.const, I);
        else if (R.enum)
          for (const z of R.enum)
            N(z, I);
        else
          throw new Error(`discriminator: "properties/${l}" must have "const" or "enum"`);
      }
      function N(R, I) {
        if (typeof R != "string" || R in E)
          throw new Error(`discriminator: "${l}" values must be unique strings`);
        E[R] = I;
      }
    }
  }
};
ga.default = K$;
const G$ = "http://json-schema.org/draft-07/schema#", H$ = "http://json-schema.org/draft-07/schema#", W$ = "Core schema meta-schema", J$ = {
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
}, B$ = [
  "object",
  "boolean"
], X$ = {
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
}, Y$ = {
  $schema: G$,
  $id: H$,
  title: W$,
  definitions: J$,
  type: B$,
  properties: X$,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = ml, n = Ko, s = ga, o = Y$, i = ["/properties"], l = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((E) => this.addVocabulary(E)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const E = this.opts.$data ? this.$dataMetaSchema(o, i) : o;
      this.addMetaSchema(E, l, !1), this.refs["http://json-schema.org/schema"] = l;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(l) ? l : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var d = ct;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return d.KeywordCxt;
  } });
  var u = te;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return u._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return u.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return u.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return u.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return u.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return u.CodeGen;
  } });
  var m = hn;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return m.default;
  } });
  var P = Dr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return P.default;
  } });
})(Js, Js.exports);
var Q$ = Js.exports, to = { exports: {} }, fu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(V, H) {
    return { validate: V, compare: H };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(o, i),
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
    regex: de,
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
    int64: { type: "number", validate: I },
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
  function o(V) {
    const H = n.exec(V);
    if (!H)
      return !1;
    const ne = +H[1], Q = +H[2], fe = +H[3];
    return Q >= 1 && Q <= 12 && fe >= 1 && fe <= (Q === 2 && r(ne) ? 29 : s[Q]);
  }
  function i(V, H) {
    if (V && H)
      return V > H ? 1 : V < H ? -1 : 0;
  }
  const l = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function c(V, H) {
    const ne = l.exec(V);
    if (!ne)
      return !1;
    const Q = +ne[1], fe = +ne[2], C = +ne[3], k = ne[5];
    return (Q <= 23 && fe <= 59 && C <= 59 || Q === 23 && fe === 59 && C === 60) && (!H || k !== "");
  }
  function d(V, H) {
    if (!(V && H))
      return;
    const ne = l.exec(V), Q = l.exec(H);
    if (ne && Q)
      return V = ne[1] + ne[2] + ne[3] + (ne[4] || ""), H = Q[1] + Q[2] + Q[3] + (Q[4] || ""), V > H ? 1 : V < H ? -1 : 0;
  }
  const u = /t|\s/i;
  function m(V) {
    const H = V.split(u);
    return H.length === 2 && o(H[0]) && c(H[1], !0);
  }
  function P(V, H) {
    if (!(V && H))
      return;
    const [ne, Q] = V.split(u), [fe, C] = H.split(u), k = i(ne, fe);
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
  function I(V) {
    return Number.isInteger(V);
  }
  function z() {
    return !0;
  }
  const W = /[^\\]\\Z/;
  function de(V) {
    if (W.test(V))
      return !1;
    try {
      return new RegExp(V), !0;
    } catch {
      return !1;
    }
  }
})(fu);
var hu = {}, ro = { exports: {} }, mu = {}, lt = {}, Ir = {}, pn = {}, Z = {}, dn = {};
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
      l(N, w[R]), N.push(h[++R]);
    return new n(N);
  }
  e._ = s;
  const o = new n("+");
  function i(h, ...w) {
    const N = [_(h[0])];
    let R = 0;
    for (; R < w.length; )
      N.push(o), l(N, w[R]), N.push(o, _(h[++R]));
    return c(N), new n(N);
  }
  e.str = i;
  function l(h, w) {
    w instanceof n ? h.push(...w._items) : w instanceof r ? h.push(w) : h.push(m(w));
  }
  e.addCodeArg = l;
  function c(h) {
    let w = 1;
    for (; w < h.length - 1; ) {
      if (h[w] === o) {
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
  function u(h, w) {
    return w.emptyStr() ? h : h.emptyStr() ? w : i`${h}${w}`;
  }
  e.strConcat = u;
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
})(dn);
var no = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = dn;
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
    constructor({ prefixes: d, parent: u } = {}) {
      this._names = {}, this._prefixes = d, this._parent = u;
    }
    toName(d) {
      return d instanceof t.Name ? d : this.name(d);
    }
    name(d) {
      return new t.Name(this._newName(d));
    }
    _newName(d) {
      const u = this._names[d] || this._nameGroup(d);
      return `${d}${u.index++}`;
    }
    _nameGroup(d) {
      var u, m;
      if (!((m = (u = this._parent) === null || u === void 0 ? void 0 : u._prefixes) === null || m === void 0) && m.has(d) || this._prefixes && !this._prefixes.has(d))
        throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
      return this._names[d] = { prefix: d, index: 0 };
    }
  }
  e.Scope = s;
  class o extends t.Name {
    constructor(d, u) {
      super(u), this.prefix = d;
    }
    setValue(d, { property: u, itemIndex: m }) {
      this.value = d, this.scopePath = (0, t._)`.${new t.Name(u)}[${m}]`;
    }
  }
  e.ValueScopeName = o;
  const i = (0, t._)`\n`;
  class l extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? i : t.nil };
    }
    get() {
      return this._scope;
    }
    name(d) {
      return new o(d, this._newName(d));
    }
    value(d, u) {
      var m;
      if (u.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const P = this.toName(d), { prefix: _ } = P, E = (m = u.key) !== null && m !== void 0 ? m : u.ref;
      let g = this._values[_];
      if (g) {
        const w = g.get(E);
        if (w)
          return w;
      } else
        g = this._values[_] = /* @__PURE__ */ new Map();
      g.set(E, P);
      const y = this._scope[_] || (this._scope[_] = []), h = y.length;
      return y[h] = u.ref, P.setValue(u, { property: _, itemIndex: h }), P;
    }
    getValue(d, u) {
      const m = this._values[d];
      if (m)
        return m.get(u);
    }
    scopeRefs(d, u = this._values) {
      return this._reduceValues(u, (m) => {
        if (m.scopePath === void 0)
          throw new Error(`CodeGen: name "${m}" has no value`);
        return (0, t._)`${d}${m.scopePath}`;
      });
    }
    scopeCode(d = this._values, u, m) {
      return this._reduceValues(d, (P) => {
        if (P.value === void 0)
          throw new Error(`CodeGen: name "${P}" has no value`);
        return P.value.code;
      }, u, m);
    }
    _reduceValues(d, u, m = {}, P) {
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
          let w = u(h);
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
  e.ValueScope = l;
})(no);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = dn, r = no;
  var n = dn;
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
  var s = no;
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
  class o {
    optimizeNodes() {
      return this;
    }
    optimizeNames(a, f) {
      return this;
    }
  }
  class i extends o {
    constructor(a, f, b) {
      super(), this.varKind = a, this.name = f, this.rhs = b;
    }
    render({ es5: a, _n: f }) {
      const b = a ? r.varKinds.var : this.varKind, j = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${b} ${this.name}${j};` + f;
    }
    optimizeNames(a, f) {
      if (a[this.name.str])
        return this.rhs && (this.rhs = C(this.rhs, a, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class l extends o {
    constructor(a, f, b) {
      super(), this.lhs = a, this.rhs = f, this.sideEffects = b;
    }
    render({ _n: a }) {
      return `${this.lhs} = ${this.rhs};` + a;
    }
    optimizeNames(a, f) {
      if (!(this.lhs instanceof t.Name && !a[this.lhs.str] && !this.sideEffects))
        return this.rhs = C(this.rhs, a, f), this;
    }
    get names() {
      const a = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return fe(a, this.rhs);
    }
  }
  class c extends l {
    constructor(a, f, b, j) {
      super(a, b, j), this.op = f;
    }
    render({ _n: a }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + a;
    }
  }
  class d extends o {
    constructor(a) {
      super(), this.label = a, this.names = {};
    }
    render({ _n: a }) {
      return `${this.label}:` + a;
    }
  }
  class u extends o {
    constructor(a) {
      super(), this.label = a, this.names = {};
    }
    render({ _n: a }) {
      return `break${this.label ? ` ${this.label}` : ""};` + a;
    }
  }
  class m extends o {
    constructor(a) {
      super(), this.error = a;
    }
    render({ _n: a }) {
      return `throw ${this.error};` + a;
    }
    get names() {
      return this.error.names;
    }
  }
  class P extends o {
    constructor(a) {
      super(), this.code = a;
    }
    render({ _n: a }) {
      return `${this.code};` + a;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(a, f) {
      return this.code = C(this.code, a, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class _ extends o {
    constructor(a = []) {
      super(), this.nodes = a;
    }
    render(a) {
      return this.nodes.reduce((f, b) => f + b.render(a), "");
    }
    optimizeNodes() {
      const { nodes: a } = this;
      let f = a.length;
      for (; f--; ) {
        const b = a[f].optimizeNodes();
        Array.isArray(b) ? a.splice(f, 1, ...b) : b ? a[f] = b : a.splice(f, 1);
      }
      return a.length > 0 ? this : void 0;
    }
    optimizeNames(a, f) {
      const { nodes: b } = this;
      let j = b.length;
      for (; j--; ) {
        const A = b[j];
        A.optimizeNames(a, f) || (k(a, A.names), b.splice(j, 1));
      }
      return b.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((a, f) => Q(a, f.names), {});
    }
  }
  class E extends _ {
    render(a) {
      return "{" + a._n + super.render(a) + "}" + a._n;
    }
  }
  class g extends _ {
  }
  class y extends E {
  }
  y.kind = "else";
  class h extends E {
    constructor(a, f) {
      super(f), this.condition = a;
    }
    render(a) {
      let f = `if(${this.condition})` + super.render(a);
      return this.else && (f += "else " + this.else.render(a)), f;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const a = this.condition;
      if (a === !0)
        return this.nodes;
      let f = this.else;
      if (f) {
        const b = f.optimizeNodes();
        f = this.else = Array.isArray(b) ? new y(b) : b;
      }
      if (f)
        return a === !1 ? f instanceof h ? f : f.nodes : this.nodes.length ? this : new h(U(a), f instanceof h ? [f] : f.nodes);
      if (!(a === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(a, f) {
      var b;
      if (this.else = (b = this.else) === null || b === void 0 ? void 0 : b.optimizeNames(a, f), !!(super.optimizeNames(a, f) || this.else))
        return this.condition = C(this.condition, a, f), this;
    }
    get names() {
      const a = super.names;
      return fe(a, this.condition), this.else && Q(a, this.else.names), a;
    }
  }
  h.kind = "if";
  class w extends E {
  }
  w.kind = "for";
  class N extends w {
    constructor(a) {
      super(), this.iteration = a;
    }
    render(a) {
      return `for(${this.iteration})` + super.render(a);
    }
    optimizeNames(a, f) {
      if (super.optimizeNames(a, f))
        return this.iteration = C(this.iteration, a, f), this;
    }
    get names() {
      return Q(super.names, this.iteration.names);
    }
  }
  class R extends w {
    constructor(a, f, b, j) {
      super(), this.varKind = a, this.name = f, this.from = b, this.to = j;
    }
    render(a) {
      const f = a.es5 ? r.varKinds.var : this.varKind, { name: b, from: j, to: A } = this;
      return `for(${f} ${b}=${j}; ${b}<${A}; ${b}++)` + super.render(a);
    }
    get names() {
      const a = fe(super.names, this.from);
      return fe(a, this.to);
    }
  }
  class I extends w {
    constructor(a, f, b, j) {
      super(), this.loop = a, this.varKind = f, this.name = b, this.iterable = j;
    }
    render(a) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(a);
    }
    optimizeNames(a, f) {
      if (super.optimizeNames(a, f))
        return this.iterable = C(this.iterable, a, f), this;
    }
    get names() {
      return Q(super.names, this.iterable.names);
    }
  }
  class z extends E {
    constructor(a, f, b) {
      super(), this.name = a, this.args = f, this.async = b;
    }
    render(a) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(a);
    }
  }
  z.kind = "func";
  class W extends _ {
    render(a) {
      return "return " + super.render(a);
    }
  }
  W.kind = "return";
  class de extends E {
    render(a) {
      let f = "try" + super.render(a);
      return this.catch && (f += this.catch.render(a)), this.finally && (f += this.finally.render(a)), f;
    }
    optimizeNodes() {
      var a, f;
      return super.optimizeNodes(), (a = this.catch) === null || a === void 0 || a.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(a, f) {
      var b, j;
      return super.optimizeNames(a, f), (b = this.catch) === null || b === void 0 || b.optimizeNames(a, f), (j = this.finally) === null || j === void 0 || j.optimizeNames(a, f), this;
    }
    get names() {
      const a = super.names;
      return this.catch && Q(a, this.catch.names), this.finally && Q(a, this.finally.names), a;
    }
  }
  class V extends E {
    constructor(a) {
      super(), this.error = a;
    }
    render(a) {
      return `catch(${this.error})` + super.render(a);
    }
  }
  V.kind = "catch";
  class H extends E {
    render(a) {
      return "finally" + super.render(a);
    }
  }
  H.kind = "finally";
  class ne {
    constructor(a, f = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...f, _n: f.lines ? `
` : "" }, this._extScope = a, this._scope = new r.Scope({ parent: a }), this._nodes = [new g()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(a) {
      return this._scope.name(a);
    }
    // reserves unique name in the external scope
    scopeName(a) {
      return this._extScope.name(a);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(a, f) {
      const b = this._extScope.value(a, f);
      return (this._values[b.prefix] || (this._values[b.prefix] = /* @__PURE__ */ new Set())).add(b), b;
    }
    getScopeValue(a, f) {
      return this._extScope.getValue(a, f);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(a) {
      return this._extScope.scopeRefs(a, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(a, f, b, j) {
      const A = this._scope.toName(f);
      return b !== void 0 && j && (this._constants[A.str] = b), this._leafNode(new i(a, A, b)), A;
    }
    // `const` declaration (`var` in es5 mode)
    const(a, f, b) {
      return this._def(r.varKinds.const, a, f, b);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(a, f, b) {
      return this._def(r.varKinds.let, a, f, b);
    }
    // `var` declaration with optional assignment
    var(a, f, b) {
      return this._def(r.varKinds.var, a, f, b);
    }
    // assignment code
    assign(a, f, b) {
      return this._leafNode(new l(a, f, b));
    }
    // `+=` code
    add(a, f) {
      return this._leafNode(new c(a, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(a) {
      return typeof a == "function" ? a() : a !== t.nil && this._leafNode(new P(a)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...a) {
      const f = ["{"];
      for (const [b, j] of a)
        f.length > 1 && f.push(","), f.push(b), (b !== j || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, j));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(a, f, b) {
      if (this._blockNode(new h(a)), f && b)
        this.code(f).else().code(b).endIf();
      else if (f)
        this.code(f).endIf();
      else if (b)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(a) {
      return this._elseNode(new h(a));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new y());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(h, y);
    }
    _for(a, f) {
      return this._blockNode(a), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(a, f) {
      return this._for(new N(a), f);
    }
    // `for` statement for a range of values
    forRange(a, f, b, j, A = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const q = this._scope.toName(a);
      return this._for(new R(A, q, f, b), () => j(q));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(a, f, b, j = r.varKinds.const) {
      const A = this._scope.toName(a);
      if (this.opts.es5) {
        const q = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${q}.length`, (F) => {
          this.var(A, (0, t._)`${q}[${F}]`), b(A);
        });
      }
      return this._for(new I("of", j, A, f), () => b(A));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(a, f, b, j = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(a, (0, t._)`Object.keys(${f})`, b);
      const A = this._scope.toName(a);
      return this._for(new I("in", j, A, f), () => b(A));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(w);
    }
    // `label` statement
    label(a) {
      return this._leafNode(new d(a));
    }
    // `break` statement
    break(a) {
      return this._leafNode(new u(a));
    }
    // `return` statement
    return(a) {
      const f = new W();
      if (this._blockNode(f), this.code(a), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(W);
    }
    // `try` statement
    try(a, f, b) {
      if (!f && !b)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const j = new de();
      if (this._blockNode(j), this.code(a), f) {
        const A = this.name("e");
        this._currNode = j.catch = new V(A), f(A);
      }
      return b && (this._currNode = j.finally = new H(), this.code(b)), this._endBlockNode(V, H);
    }
    // `throw` statement
    throw(a) {
      return this._leafNode(new m(a));
    }
    // start self-balancing block
    block(a, f) {
      return this._blockStarts.push(this._nodes.length), a && this.code(a).endBlock(f), this;
    }
    // end the current self-balancing block
    endBlock(a) {
      const f = this._blockStarts.pop();
      if (f === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const b = this._nodes.length - f;
      if (b < 0 || a !== void 0 && b !== a)
        throw new Error(`CodeGen: wrong number of nodes: ${b} vs ${a} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(a, f = t.nil, b, j) {
      return this._blockNode(new z(a, f, b)), j && this.code(j).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(z);
    }
    optimize(a = 1) {
      for (; a-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(a) {
      return this._currNode.nodes.push(a), this;
    }
    _blockNode(a) {
      this._currNode.nodes.push(a), this._nodes.push(a);
    }
    _endBlockNode(a, f) {
      const b = this._currNode;
      if (b instanceof a || f && b instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${a.kind}/${f.kind}` : a.kind}"`);
    }
    _elseNode(a) {
      const f = this._currNode;
      if (!(f instanceof h))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = f.else = a, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const a = this._nodes;
      return a[a.length - 1];
    }
    set _currNode(a) {
      const f = this._nodes;
      f[f.length - 1] = a;
    }
  }
  e.CodeGen = ne;
  function Q($, a) {
    for (const f in a)
      $[f] = ($[f] || 0) + (a[f] || 0);
    return $;
  }
  function fe($, a) {
    return a instanceof t._CodeOrName ? Q($, a.names) : $;
  }
  function C($, a, f) {
    if ($ instanceof t.Name)
      return b($);
    if (!j($))
      return $;
    return new t._Code($._items.reduce((A, q) => (q instanceof t.Name && (q = b(q)), q instanceof t._Code ? A.push(...q._items) : A.push(q), A), []));
    function b(A) {
      const q = f[A.str];
      return q === void 0 || a[A.str] !== 1 ? A : (delete a[A.str], q);
    }
    function j(A) {
      return A instanceof t._Code && A._items.some((q) => q instanceof t.Name && a[q.str] === 1 && f[q.str] !== void 0);
    }
  }
  function k($, a) {
    for (const f in a)
      $[f] = ($[f] || 0) - (a[f] || 0);
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
  const T = p(e.operators.OR);
  function v(...$) {
    return $.reduce(T);
  }
  e.or = v;
  function p($) {
    return (a, f) => a === t.nil ? f : f === t.nil ? a : (0, t._)`${S(a)} ${$} ${S(f)}`;
  }
  function S($) {
    return $ instanceof t.Name ? $ : (0, t._)`(${$})`;
  }
})(Z);
var L = {};
Object.defineProperty(L, "__esModule", { value: !0 });
L.checkStrictMode = L.getErrorPath = L.Type = L.useFunc = L.setEvaluated = L.evaluatedPropsToName = L.mergeEvaluated = L.eachItem = L.unescapeJsonPointer = L.escapeJsonPointer = L.escapeFragment = L.unescapeFragment = L.schemaRefOrVal = L.schemaHasRulesButRef = L.schemaHasRules = L.checkUnknownRules = L.alwaysValidSchema = L.toHash = void 0;
const ce = Z, Z$ = dn;
function x$(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
L.toHash = x$;
function ey(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (pu(e, t), !$u(t, e.self.RULES.all));
}
L.alwaysValidSchema = ey;
function pu(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const o in t)
    s[o] || gu(e, `unknown keyword: "${o}"`);
}
L.checkUnknownRules = pu;
function $u(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
L.schemaHasRules = $u;
function ty(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
L.schemaHasRulesButRef = ty;
function ry({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ce._)`${r}`;
  }
  return (0, ce._)`${e}${t}${(0, ce.getProperty)(n)}`;
}
L.schemaRefOrVal = ry;
function ny(e) {
  return yu(decodeURIComponent(e));
}
L.unescapeFragment = ny;
function sy(e) {
  return encodeURIComponent(va(e));
}
L.escapeFragment = sy;
function va(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
L.escapeJsonPointer = va;
function yu(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
L.unescapeJsonPointer = yu;
function oy(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
L.eachItem = oy;
function Ki({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, o, i, l) => {
    const c = i === void 0 ? o : i instanceof ce.Name ? (o instanceof ce.Name ? e(s, o, i) : t(s, o, i), i) : o instanceof ce.Name ? (t(s, i, o), o) : r(o, i);
    return l === ce.Name && !(c instanceof ce.Name) ? n(s, c) : c;
  };
}
L.mergeEvaluated = {
  props: Ki({
    mergeNames: (e, t, r) => e.if((0, ce._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, ce._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, ce._)`${r} || {}`).code((0, ce._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, ce._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, ce._)`${r} || {}`), wa(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: _u
  }),
  items: Ki({
    mergeNames: (e, t, r) => e.if((0, ce._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ce._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ce._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ce._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function _u(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ce._)`{}`);
  return t !== void 0 && wa(e, r, t), r;
}
L.evaluatedPropsToName = _u;
function wa(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ce._)`${t}${(0, ce.getProperty)(n)}`, !0));
}
L.setEvaluated = wa;
const Gi = {};
function ay(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Gi[t.code] || (Gi[t.code] = new Z$._Code(t.code))
  });
}
L.useFunc = ay;
var so;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(so || (L.Type = so = {}));
function iy(e, t, r) {
  if (e instanceof ce.Name) {
    const n = t === so.Num;
    return r ? n ? (0, ce._)`"[" + ${e} + "]"` : (0, ce._)`"['" + ${e} + "']"` : n ? (0, ce._)`"/" + ${e}` : (0, ce._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ce.getProperty)(e).toString() : "/" + va(e);
}
L.getErrorPath = iy;
function gu(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
L.checkStrictMode = gu;
var vt = {};
Object.defineProperty(vt, "__esModule", { value: !0 });
const Ae = Z, cy = {
  // validation function arguments
  data: new Ae.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Ae.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Ae.Name("instancePath"),
  parentData: new Ae.Name("parentData"),
  parentDataProperty: new Ae.Name("parentDataProperty"),
  rootData: new Ae.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Ae.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Ae.Name("vErrors"),
  // null or array of validation errors
  errors: new Ae.Name("errors"),
  // counter of validation errors
  this: new Ae.Name("this"),
  // "globals"
  self: new Ae.Name("self"),
  scope: new Ae.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Ae.Name("json"),
  jsonPos: new Ae.Name("jsonPos"),
  jsonLen: new Ae.Name("jsonLen"),
  jsonPart: new Ae.Name("jsonPart")
};
vt.default = cy;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = Z, r = L, n = vt;
  e.keywordError = {
    message: ({ keyword: y }) => (0, t.str)`must pass "${y}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: y, schemaType: h }) => h ? (0, t.str)`"${y}" keyword must be ${h} ($data)` : (0, t.str)`"${y}" keyword is invalid ($data)`
  };
  function s(y, h = e.keywordError, w, N) {
    const { it: R } = y, { gen: I, compositeRule: z, allErrors: W } = R, de = m(y, h, w);
    N ?? (z || W) ? c(I, de) : d(R, (0, t._)`[${de}]`);
  }
  e.reportError = s;
  function o(y, h = e.keywordError, w) {
    const { it: N } = y, { gen: R, compositeRule: I, allErrors: z } = N, W = m(y, h, w);
    c(R, W), I || z || d(N, n.default.vErrors);
  }
  e.reportExtraError = o;
  function i(y, h) {
    y.assign(n.default.errors, h), y.if((0, t._)`${n.default.vErrors} !== null`, () => y.if(h, () => y.assign((0, t._)`${n.default.vErrors}.length`, h), () => y.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function l({ gen: y, keyword: h, schemaValue: w, data: N, errsCount: R, it: I }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const z = y.name("err");
    y.forRange("i", R, n.default.errors, (W) => {
      y.const(z, (0, t._)`${n.default.vErrors}[${W}]`), y.if((0, t._)`${z}.instancePath === undefined`, () => y.assign((0, t._)`${z}.instancePath`, (0, t.strConcat)(n.default.instancePath, I.errorPath))), y.assign((0, t._)`${z}.schemaPath`, (0, t.str)`${I.errSchemaPath}/${h}`), I.opts.verbose && (y.assign((0, t._)`${z}.schema`, w), y.assign((0, t._)`${z}.data`, N));
    });
  }
  e.extendErrors = l;
  function c(y, h) {
    const w = y.const("err", h);
    y.if((0, t._)`${n.default.vErrors} === null`, () => y.assign(n.default.vErrors, (0, t._)`[${w}]`), (0, t._)`${n.default.vErrors}.push(${w})`), y.code((0, t._)`${n.default.errors}++`);
  }
  function d(y, h) {
    const { gen: w, validateName: N, schemaEnv: R } = y;
    R.$async ? w.throw((0, t._)`new ${y.ValidationError}(${h})`) : (w.assign((0, t._)`${N}.errors`, h), w.return(!1));
  }
  const u = {
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
    const { gen: N, it: R } = y, I = [
      _(R, w),
      E(y, w)
    ];
    return g(y, h, I), N.object(...I);
  }
  function _({ errorPath: y }, { instancePath: h }) {
    const w = h ? (0, t.str)`${y}${(0, r.getErrorPath)(h, r.Type.Str)}` : y;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, w)];
  }
  function E({ keyword: y, it: { errSchemaPath: h } }, { schemaPath: w, parentSchema: N }) {
    let R = N ? h : (0, t.str)`${h}/${y}`;
    return w && (R = (0, t.str)`${R}${(0, r.getErrorPath)(w, r.Type.Str)}`), [u.schemaPath, R];
  }
  function g(y, { params: h, message: w }, N) {
    const { keyword: R, data: I, schemaValue: z, it: W } = y, { opts: de, propertyName: V, topSchemaRef: H, schemaPath: ne } = W;
    N.push([u.keyword, R], [u.params, typeof h == "function" ? h(y) : h || (0, t._)`{}`]), de.messages && N.push([u.message, typeof w == "function" ? w(y) : w]), de.verbose && N.push([u.schema, z], [u.parentSchema, (0, t._)`${H}${ne}`], [n.default.data, I]), V && N.push([u.propertyName, V]);
  }
})(pn);
Object.defineProperty(Ir, "__esModule", { value: !0 });
Ir.boolOrEmptySchema = Ir.topBoolOrEmptySchema = void 0;
const ly = pn, uy = Z, dy = vt, fy = {
  message: "boolean schema is false"
};
function hy(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? vu(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(dy.default.data) : (t.assign((0, uy._)`${n}.errors`, null), t.return(!0));
}
Ir.topBoolOrEmptySchema = hy;
function my(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), vu(e)) : r.var(t, !0);
}
Ir.boolOrEmptySchema = my;
function vu(e, t) {
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
  (0, ly.reportError)(s, fy, void 0, t);
}
var Se = {}, ur = {};
Object.defineProperty(ur, "__esModule", { value: !0 });
ur.getRules = ur.isJSONType = void 0;
const py = ["string", "number", "integer", "boolean", "null", "object", "array"], $y = new Set(py);
function yy(e) {
  return typeof e == "string" && $y.has(e);
}
ur.isJSONType = yy;
function _y() {
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
ur.getRules = _y;
var St = {};
Object.defineProperty(St, "__esModule", { value: !0 });
St.shouldUseRule = St.shouldUseGroup = St.schemaHasRulesForType = void 0;
function gy({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && wu(e, n);
}
St.schemaHasRulesForType = gy;
function wu(e, t) {
  return t.rules.some((r) => Eu(e, r));
}
St.shouldUseGroup = wu;
function Eu(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
St.shouldUseRule = Eu;
Object.defineProperty(Se, "__esModule", { value: !0 });
Se.reportTypeError = Se.checkDataTypes = Se.checkDataType = Se.coerceAndCheckDataType = Se.getJSONTypes = Se.getSchemaTypes = Se.DataType = void 0;
const vy = ur, wy = St, Ey = pn, Y = Z, Su = L;
var br;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(br || (Se.DataType = br = {}));
function Sy(e) {
  const t = bu(e.type);
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
Se.getSchemaTypes = Sy;
function bu(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(vy.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Se.getJSONTypes = bu;
function by(e, t) {
  const { gen: r, data: n, opts: s } = e, o = Py(t, s.coerceTypes), i = t.length > 0 && !(o.length === 0 && t.length === 1 && (0, wy.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const l = Ea(t, n, s.strictNumbers, br.Wrong);
    r.if(l, () => {
      o.length ? Ny(e, t, o) : Sa(e);
    });
  }
  return i;
}
Se.coerceAndCheckDataType = by;
const Pu = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function Py(e, t) {
  return t ? e.filter((r) => Pu.has(r) || t === "array" && r === "array") : [];
}
function Ny(e, t, r) {
  const { gen: n, data: s, opts: o } = e, i = n.let("dataType", (0, Y._)`typeof ${s}`), l = n.let("coerced", (0, Y._)`undefined`);
  o.coerceTypes === "array" && n.if((0, Y._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, Y._)`${s}[0]`).assign(i, (0, Y._)`typeof ${s}`).if(Ea(t, s, o.strictNumbers), () => n.assign(l, s))), n.if((0, Y._)`${l} !== undefined`);
  for (const d of r)
    (Pu.has(d) || d === "array" && o.coerceTypes === "array") && c(d);
  n.else(), Sa(e), n.endIf(), n.if((0, Y._)`${l} !== undefined`, () => {
    n.assign(s, l), Oy(e, l);
  });
  function c(d) {
    switch (d) {
      case "string":
        n.elseIf((0, Y._)`${i} == "number" || ${i} == "boolean"`).assign(l, (0, Y._)`"" + ${s}`).elseIf((0, Y._)`${s} === null`).assign(l, (0, Y._)`""`);
        return;
      case "number":
        n.elseIf((0, Y._)`${i} == "boolean" || ${s} === null
              || (${i} == "string" && ${s} && ${s} == +${s})`).assign(l, (0, Y._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, Y._)`${i} === "boolean" || ${s} === null
              || (${i} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(l, (0, Y._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, Y._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(l, !1).elseIf((0, Y._)`${s} === "true" || ${s} === 1`).assign(l, !0);
        return;
      case "null":
        n.elseIf((0, Y._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(l, null);
        return;
      case "array":
        n.elseIf((0, Y._)`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${s} === null`).assign(l, (0, Y._)`[${s}]`);
    }
  }
}
function Oy({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, Y._)`${t} !== undefined`, () => e.assign((0, Y._)`${t}[${r}]`, n));
}
function oo(e, t, r, n = br.Correct) {
  const s = n === br.Correct ? Y.operators.EQ : Y.operators.NEQ;
  let o;
  switch (e) {
    case "null":
      return (0, Y._)`${t} ${s} null`;
    case "array":
      o = (0, Y._)`Array.isArray(${t})`;
      break;
    case "object":
      o = (0, Y._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      o = i((0, Y._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      o = i();
      break;
    default:
      return (0, Y._)`typeof ${t} ${s} ${e}`;
  }
  return n === br.Correct ? o : (0, Y.not)(o);
  function i(l = Y.nil) {
    return (0, Y.and)((0, Y._)`typeof ${t} == "number"`, l, r ? (0, Y._)`isFinite(${t})` : Y.nil);
  }
}
Se.checkDataType = oo;
function Ea(e, t, r, n) {
  if (e.length === 1)
    return oo(e[0], t, r, n);
  let s;
  const o = (0, Su.toHash)(e);
  if (o.array && o.object) {
    const i = (0, Y._)`typeof ${t} != "object"`;
    s = o.null ? i : (0, Y._)`!${t} || ${i}`, delete o.null, delete o.array, delete o.object;
  } else
    s = Y.nil;
  o.number && delete o.integer;
  for (const i in o)
    s = (0, Y.and)(s, oo(i, t, r, n));
  return s;
}
Se.checkDataTypes = Ea;
const Ry = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, Y._)`{type: ${e}}` : (0, Y._)`{type: ${t}}`
};
function Sa(e) {
  const t = Ty(e);
  (0, Ey.reportError)(t, Ry);
}
Se.reportTypeError = Sa;
function Ty(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, Su.schemaRefOrVal)(e, n, "type");
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
var _s = {};
Object.defineProperty(_s, "__esModule", { value: !0 });
_s.assignDefaults = void 0;
const pr = Z, Iy = L;
function jy(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      Hi(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, o) => Hi(e, o, s.default));
}
_s.assignDefaults = jy;
function Hi(e, t, r) {
  const { gen: n, compositeRule: s, data: o, opts: i } = e;
  if (r === void 0)
    return;
  const l = (0, pr._)`${o}${(0, pr.getProperty)(t)}`;
  if (s) {
    (0, Iy.checkStrictMode)(e, `default is ignored for: ${l}`);
    return;
  }
  let c = (0, pr._)`${l} === undefined`;
  i.useDefaults === "empty" && (c = (0, pr._)`${c} || ${l} === null || ${l} === ""`), n.if(c, (0, pr._)`${l} = ${(0, pr.stringify)(r)}`);
}
var _t = {}, ee = {};
Object.defineProperty(ee, "__esModule", { value: !0 });
ee.validateUnion = ee.validateArray = ee.usePattern = ee.callValidateCode = ee.schemaProperties = ee.allSchemaProperties = ee.noPropertyInData = ee.propertyInData = ee.isOwnProperty = ee.hasPropFunc = ee.reportMissingProp = ee.checkMissingProp = ee.checkReportMissingProp = void 0;
const pe = Z, ba = L, Rt = vt, Ay = L;
function ky(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(Na(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, pe._)`${t}` }, !0), e.error();
  });
}
ee.checkReportMissingProp = ky;
function Cy({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, pe.or)(...n.map((o) => (0, pe.and)(Na(e, t, o, r.ownProperties), (0, pe._)`${s} = ${o}`)));
}
ee.checkMissingProp = Cy;
function Dy(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ee.reportMissingProp = Dy;
function Nu(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, pe._)`Object.prototype.hasOwnProperty`
  });
}
ee.hasPropFunc = Nu;
function Pa(e, t, r) {
  return (0, pe._)`${Nu(e)}.call(${t}, ${r})`;
}
ee.isOwnProperty = Pa;
function My(e, t, r, n) {
  const s = (0, pe._)`${t}${(0, pe.getProperty)(r)} !== undefined`;
  return n ? (0, pe._)`${s} && ${Pa(e, t, r)}` : s;
}
ee.propertyInData = My;
function Na(e, t, r, n) {
  const s = (0, pe._)`${t}${(0, pe.getProperty)(r)} === undefined`;
  return n ? (0, pe.or)(s, (0, pe.not)(Pa(e, t, r))) : s;
}
ee.noPropertyInData = Na;
function Ou(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ee.allSchemaProperties = Ou;
function Ly(e, t) {
  return Ou(t).filter((r) => !(0, ba.alwaysValidSchema)(e, t[r]));
}
ee.schemaProperties = Ly;
function Fy({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: o }, it: i }, l, c, d) {
  const u = d ? (0, pe._)`${e}, ${t}, ${n}${s}` : t, m = [
    [Rt.default.instancePath, (0, pe.strConcat)(Rt.default.instancePath, o)],
    [Rt.default.parentData, i.parentData],
    [Rt.default.parentDataProperty, i.parentDataProperty],
    [Rt.default.rootData, Rt.default.rootData]
  ];
  i.opts.dynamicRef && m.push([Rt.default.dynamicAnchors, Rt.default.dynamicAnchors]);
  const P = (0, pe._)`${u}, ${r.object(...m)}`;
  return c !== pe.nil ? (0, pe._)`${l}.call(${c}, ${P})` : (0, pe._)`${l}(${P})`;
}
ee.callValidateCode = Fy;
const Vy = (0, pe._)`new RegExp`;
function Uy({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, o = s(r, n);
  return e.scopeValue("pattern", {
    key: o.toString(),
    ref: o,
    code: (0, pe._)`${s.code === "new RegExp" ? Vy : (0, Ay.useFunc)(e, s)}(${r}, ${n})`
  });
}
ee.usePattern = Uy;
function zy(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, o = t.name("valid");
  if (s.allErrors) {
    const l = t.let("valid", !0);
    return i(() => t.assign(l, !1)), l;
  }
  return t.var(o, !0), i(() => t.break()), o;
  function i(l) {
    const c = t.const("len", (0, pe._)`${r}.length`);
    t.forRange("i", 0, c, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: ba.Type.Num
      }, o), t.if((0, pe.not)(o), l);
    });
  }
}
ee.validateArray = zy;
function qy(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, ba.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const i = t.let("valid", !1), l = t.name("_valid");
  t.block(() => r.forEach((c, d) => {
    const u = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, l);
    t.assign(i, (0, pe._)`${i} || ${l}`), e.mergeValidEvaluated(u, l) || t.if((0, pe.not)(i));
  })), e.result(i, () => e.reset(), () => e.error(!0));
}
ee.validateUnion = qy;
Object.defineProperty(_t, "__esModule", { value: !0 });
_t.validateKeywordUsage = _t.validSchemaType = _t.funcKeywordCode = _t.macroKeywordCode = void 0;
const Le = Z, or = vt, Ky = ee, Gy = pn;
function Hy(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: o, it: i } = e, l = t.macro.call(i.self, s, o, i), c = Ru(r, n, l);
  i.opts.validateSchema !== !1 && i.self.validateSchema(l, !0);
  const d = r.name("valid");
  e.subschema({
    schema: l,
    schemaPath: Le.nil,
    errSchemaPath: `${i.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, d), e.pass(d, () => e.error(!0));
}
_t.macroKeywordCode = Hy;
function Wy(e, t) {
  var r;
  const { gen: n, keyword: s, schema: o, parentSchema: i, $data: l, it: c } = e;
  By(c, t);
  const d = !l && t.compile ? t.compile.call(c.self, o, i, c) : t.validate, u = Ru(n, s, d), m = n.let("valid");
  e.block$data(m, P), e.ok((r = t.valid) !== null && r !== void 0 ? r : m);
  function P() {
    if (t.errors === !1)
      g(), t.modifying && Wi(e), y(() => e.error());
    else {
      const h = t.async ? _() : E();
      t.modifying && Wi(e), y(() => Jy(e, h));
    }
  }
  function _() {
    const h = n.let("ruleErrs", null);
    return n.try(() => g((0, Le._)`await `), (w) => n.assign(m, !1).if((0, Le._)`${w} instanceof ${c.ValidationError}`, () => n.assign(h, (0, Le._)`${w}.errors`), () => n.throw(w))), h;
  }
  function E() {
    const h = (0, Le._)`${u}.errors`;
    return n.assign(h, null), g(Le.nil), h;
  }
  function g(h = t.async ? (0, Le._)`await ` : Le.nil) {
    const w = c.opts.passContext ? or.default.this : or.default.self, N = !("compile" in t && !l || t.schema === !1);
    n.assign(m, (0, Le._)`${h}${(0, Ky.callValidateCode)(e, u, w, N)}`, t.modifying);
  }
  function y(h) {
    var w;
    n.if((0, Le.not)((w = t.valid) !== null && w !== void 0 ? w : m), h);
  }
}
_t.funcKeywordCode = Wy;
function Wi(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Le._)`${n.parentData}[${n.parentDataProperty}]`));
}
function Jy(e, t) {
  const { gen: r } = e;
  r.if((0, Le._)`Array.isArray(${t})`, () => {
    r.assign(or.default.vErrors, (0, Le._)`${or.default.vErrors} === null ? ${t} : ${or.default.vErrors}.concat(${t})`).assign(or.default.errors, (0, Le._)`${or.default.vErrors}.length`), (0, Gy.extendErrors)(e);
  }, () => e.error());
}
function By({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function Ru(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Le.stringify)(r) });
}
function Xy(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
_t.validSchemaType = Xy;
function Yy({ schema: e, opts: t, self: r, errSchemaPath: n }, s, o) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(o) : s.keyword !== o)
    throw new Error("ajv implementation error");
  const i = s.dependencies;
  if (i != null && i.some((l) => !Object.prototype.hasOwnProperty.call(e, l)))
    throw new Error(`parent schema must have dependencies of ${o}: ${i.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[o])) {
    const c = `keyword "${o}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
_t.validateKeywordUsage = Yy;
var Mt = {};
Object.defineProperty(Mt, "__esModule", { value: !0 });
Mt.extendSubschemaMode = Mt.extendSubschemaData = Mt.getSubschema = void 0;
const mt = Z, Tu = L;
function Qy(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: o, topSchemaRef: i }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const l = e.schema[t];
    return r === void 0 ? {
      schema: l,
      schemaPath: (0, mt._)`${e.schemaPath}${(0, mt.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: l[r],
      schemaPath: (0, mt._)`${e.schemaPath}${(0, mt.getProperty)(t)}${(0, mt.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, Tu.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (s === void 0 || o === void 0 || i === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: s,
      topSchemaRef: i,
      errSchemaPath: o
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
Mt.getSubschema = Qy;
function Zy(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: o, propertyName: i }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: l } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: u, opts: m } = t, P = l.let("data", (0, mt._)`${t.data}${(0, mt.getProperty)(r)}`, !0);
    c(P), e.errorPath = (0, mt.str)`${d}${(0, Tu.getErrorPath)(r, n, m.jsPropertySyntax)}`, e.parentDataProperty = (0, mt._)`${r}`, e.dataPathArr = [...u, e.parentDataProperty];
  }
  if (s !== void 0) {
    const d = s instanceof mt.Name ? s : l.let("data", s, !0);
    c(d), i !== void 0 && (e.propertyName = i);
  }
  o && (e.dataTypes = o);
  function c(d) {
    e.data = d, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, d];
  }
}
Mt.extendSubschemaData = Zy;
function xy(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: o }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), o !== void 0 && (e.allErrors = o), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Mt.extendSubschemaMode = xy;
var Ie = {}, Iu = { exports: {} }, Ct = Iu.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  Hn(t, n, s, e, "", e);
};
Ct.keywords = {
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
Ct.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Ct.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Ct.skipKeywords = {
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
function Hn(e, t, r, n, s, o, i, l, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, o, i, l, c, d);
    for (var u in n) {
      var m = n[u];
      if (Array.isArray(m)) {
        if (u in Ct.arrayKeywords)
          for (var P = 0; P < m.length; P++)
            Hn(e, t, r, m[P], s + "/" + u + "/" + P, o, s, u, n, P);
      } else if (u in Ct.propsKeywords) {
        if (m && typeof m == "object")
          for (var _ in m)
            Hn(e, t, r, m[_], s + "/" + u + "/" + e_(_), o, s, u, n, _);
      } else (u in Ct.keywords || e.allKeys && !(u in Ct.skipKeywords)) && Hn(e, t, r, m, s + "/" + u, o, s, u, n);
    }
    r(n, s, o, i, l, c, d);
  }
}
function e_(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var t_ = Iu.exports;
Object.defineProperty(Ie, "__esModule", { value: !0 });
Ie.getSchemaRefs = Ie.resolveUrl = Ie.normalizeId = Ie._getFullPath = Ie.getFullPath = Ie.inlineRef = void 0;
const r_ = L, n_ = fs, s_ = t_, o_ = /* @__PURE__ */ new Set([
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
function a_(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !ao(e) : t ? ju(e) <= t : !1;
}
Ie.inlineRef = a_;
const i_ = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function ao(e) {
  for (const t in e) {
    if (i_.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(ao) || typeof r == "object" && ao(r))
      return !0;
  }
  return !1;
}
function ju(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !o_.has(r) && (typeof e[r] == "object" && (0, r_.eachItem)(e[r], (n) => t += ju(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function Au(e, t = "", r) {
  r !== !1 && (t = Pr(t));
  const n = e.parse(t);
  return ku(e, n);
}
Ie.getFullPath = Au;
function ku(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Ie._getFullPath = ku;
const c_ = /#\/?$/;
function Pr(e) {
  return e ? e.replace(c_, "") : "";
}
Ie.normalizeId = Pr;
function l_(e, t, r) {
  return r = Pr(r), e.resolve(t, r);
}
Ie.resolveUrl = l_;
const u_ = /^[a-z_][-a-z0-9._]*$/i;
function d_(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = Pr(e[r] || t), o = { "": s }, i = Au(n, s, !1), l = {}, c = /* @__PURE__ */ new Set();
  return s_(e, { allKeys: !0 }, (m, P, _, E) => {
    if (E === void 0)
      return;
    const g = i + P;
    let y = o[E];
    typeof m[r] == "string" && (y = h.call(this, m[r])), w.call(this, m.$anchor), w.call(this, m.$dynamicAnchor), o[P] = y;
    function h(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = Pr(y ? R(y, N) : N), c.has(N))
        throw u(N);
      c.add(N);
      let I = this.refs[N];
      return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? d(m, I.schema, N) : N !== Pr(g) && (N[0] === "#" ? (d(m, l[N], N), l[N] = m) : this.refs[N] = g), N;
    }
    function w(N) {
      if (typeof N == "string") {
        if (!u_.test(N))
          throw new Error(`invalid anchor "${N}"`);
        h.call(this, `#${N}`);
      }
    }
  }), l;
  function d(m, P, _) {
    if (P !== void 0 && !n_(m, P))
      throw u(_);
  }
  function u(m) {
    return new Error(`reference "${m}" resolves to more than one schema`);
  }
}
Ie.getSchemaRefs = d_;
Object.defineProperty(lt, "__esModule", { value: !0 });
lt.getData = lt.KeywordCxt = lt.validateFunctionCode = void 0;
const Cu = Ir, Ji = Se, Oa = St, ns = Se, f_ = _s, sn = _t, Ds = Mt, G = Z, B = vt, h_ = Ie, bt = L, Wr = pn;
function m_(e) {
  if (Lu(e) && (Fu(e), Mu(e))) {
    y_(e);
    return;
  }
  Du(e, () => (0, Cu.topBoolOrEmptySchema)(e));
}
lt.validateFunctionCode = m_;
function Du({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, o) {
  s.code.es5 ? e.func(t, (0, G._)`${B.default.data}, ${B.default.valCxt}`, n.$async, () => {
    e.code((0, G._)`"use strict"; ${Bi(r, s)}`), $_(e, s), e.code(o);
  }) : e.func(t, (0, G._)`${B.default.data}, ${p_(s)}`, n.$async, () => e.code(Bi(r, s)).code(o));
}
function p_(e) {
  return (0, G._)`{${B.default.instancePath}="", ${B.default.parentData}, ${B.default.parentDataProperty}, ${B.default.rootData}=${B.default.data}${e.dynamicRef ? (0, G._)`, ${B.default.dynamicAnchors}={}` : G.nil}}={}`;
}
function $_(e, t) {
  e.if(B.default.valCxt, () => {
    e.var(B.default.instancePath, (0, G._)`${B.default.valCxt}.${B.default.instancePath}`), e.var(B.default.parentData, (0, G._)`${B.default.valCxt}.${B.default.parentData}`), e.var(B.default.parentDataProperty, (0, G._)`${B.default.valCxt}.${B.default.parentDataProperty}`), e.var(B.default.rootData, (0, G._)`${B.default.valCxt}.${B.default.rootData}`), t.dynamicRef && e.var(B.default.dynamicAnchors, (0, G._)`${B.default.valCxt}.${B.default.dynamicAnchors}`);
  }, () => {
    e.var(B.default.instancePath, (0, G._)`""`), e.var(B.default.parentData, (0, G._)`undefined`), e.var(B.default.parentDataProperty, (0, G._)`undefined`), e.var(B.default.rootData, B.default.data), t.dynamicRef && e.var(B.default.dynamicAnchors, (0, G._)`{}`);
  });
}
function y_(e) {
  const { schema: t, opts: r, gen: n } = e;
  Du(e, () => {
    r.$comment && t.$comment && Uu(e), E_(e), n.let(B.default.vErrors, null), n.let(B.default.errors, 0), r.unevaluated && __(e), Vu(e), P_(e);
  });
}
function __(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, G._)`${r}.evaluated`), t.if((0, G._)`${e.evaluated}.dynamicProps`, () => t.assign((0, G._)`${e.evaluated}.props`, (0, G._)`undefined`)), t.if((0, G._)`${e.evaluated}.dynamicItems`, () => t.assign((0, G._)`${e.evaluated}.items`, (0, G._)`undefined`));
}
function Bi(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, G._)`/*# sourceURL=${r} */` : G.nil;
}
function g_(e, t) {
  if (Lu(e) && (Fu(e), Mu(e))) {
    v_(e, t);
    return;
  }
  (0, Cu.boolOrEmptySchema)(e, t);
}
function Mu({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function Lu(e) {
  return typeof e.schema != "boolean";
}
function v_(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && Uu(e), S_(e), b_(e);
  const o = n.const("_errs", B.default.errors);
  Vu(e, o), n.var(t, (0, G._)`${o} === ${B.default.errors}`);
}
function Fu(e) {
  (0, bt.checkUnknownRules)(e), w_(e);
}
function Vu(e, t) {
  if (e.opts.jtd)
    return Xi(e, [], !1, t);
  const r = (0, Ji.getSchemaTypes)(e.schema), n = (0, Ji.coerceAndCheckDataType)(e, r);
  Xi(e, r, !n, t);
}
function w_(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, bt.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function E_(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, bt.checkStrictMode)(e, "default is ignored in the schema root");
}
function S_(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, h_.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function b_(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function Uu({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const o = r.$comment;
  if (s.$comment === !0)
    e.code((0, G._)`${B.default.self}.logger.log(${o})`);
  else if (typeof s.$comment == "function") {
    const i = (0, G.str)`${n}/$comment`, l = e.scopeValue("root", { ref: t.root });
    e.code((0, G._)`${B.default.self}.opts.$comment(${o}, ${i}, ${l}.schema)`);
  }
}
function P_(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: o } = e;
  r.$async ? t.if((0, G._)`${B.default.errors} === 0`, () => t.return(B.default.data), () => t.throw((0, G._)`new ${s}(${B.default.vErrors})`)) : (t.assign((0, G._)`${n}.errors`, B.default.vErrors), o.unevaluated && N_(e), t.return((0, G._)`${B.default.errors} === 0`));
}
function N_({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof G.Name && e.assign((0, G._)`${t}.props`, r), n instanceof G.Name && e.assign((0, G._)`${t}.items`, n);
}
function Xi(e, t, r, n) {
  const { gen: s, schema: o, data: i, allErrors: l, opts: c, self: d } = e, { RULES: u } = d;
  if (o.$ref && (c.ignoreKeywordsWithRef || !(0, bt.schemaHasRulesButRef)(o, u))) {
    s.block(() => Ku(e, "$ref", u.all.$ref.definition));
    return;
  }
  c.jtd || O_(e, t), s.block(() => {
    for (const P of u.rules)
      m(P);
    m(u.post);
  });
  function m(P) {
    (0, Oa.shouldUseGroup)(o, P) && (P.type ? (s.if((0, ns.checkDataType)(P.type, i, c.strictNumbers)), Yi(e, P), t.length === 1 && t[0] === P.type && r && (s.else(), (0, ns.reportTypeError)(e)), s.endIf()) : Yi(e, P), l || s.if((0, G._)`${B.default.errors} === ${n || 0}`));
  }
}
function Yi(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, f_.assignDefaults)(e, t.type), r.block(() => {
    for (const o of t.rules)
      (0, Oa.shouldUseRule)(n, o) && Ku(e, o.keyword, o.definition, t.type);
  });
}
function O_(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (R_(e, t), e.opts.allowUnionTypes || T_(e, t), I_(e, e.dataTypes));
}
function R_(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      zu(e.dataTypes, r) || Ra(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), A_(e, t);
  }
}
function T_(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && Ra(e, "use allowUnionTypes to allow union type keyword");
}
function I_(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, Oa.shouldUseRule)(e.schema, s)) {
      const { type: o } = s.definition;
      o.length && !o.some((i) => j_(t, i)) && Ra(e, `missing type "${o.join(",")}" for keyword "${n}"`);
    }
  }
}
function j_(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function zu(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function A_(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    zu(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function Ra(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, bt.checkStrictMode)(e, t, e.opts.strictTypes);
}
class qu {
  constructor(t, r, n) {
    if ((0, sn.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, bt.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", Gu(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, sn.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
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
    (t ? Wr.reportExtraError : Wr.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Wr.reportError)(this, this.def.$dataError || Wr.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Wr.resetErrorsCount)(this.gen, this.errsCount);
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
    const { gen: n, schemaCode: s, schemaType: o, def: i } = this;
    n.if((0, G.or)((0, G._)`${s} === undefined`, r)), t !== G.nil && n.assign(t, !0), (o.length || i.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== G.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: o } = this;
    return (0, G.or)(i(), l());
    function i() {
      if (n.length) {
        if (!(r instanceof G.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, G._)`${(0, ns.checkDataTypes)(c, r, o.opts.strictNumbers, ns.DataType.Wrong)}`;
      }
      return G.nil;
    }
    function l() {
      if (s.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, G._)`!${c}(${r})`;
      }
      return G.nil;
    }
  }
  subschema(t, r) {
    const n = (0, Ds.getSubschema)(this.it, t);
    (0, Ds.extendSubschemaData)(n, this.it, t), (0, Ds.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return g_(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = bt.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = bt.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, G.Name)), !0;
  }
}
lt.KeywordCxt = qu;
function Ku(e, t, r, n) {
  const s = new qu(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, sn.funcKeywordCode)(s, r) : "macro" in r ? (0, sn.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, sn.funcKeywordCode)(s, r);
}
const k_ = /^\/(?:[^~]|~0|~1)*$/, C_ = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function Gu(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, o;
  if (e === "")
    return B.default.rootData;
  if (e[0] === "/") {
    if (!k_.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, o = B.default.rootData;
  } else {
    const d = C_.exec(e);
    if (!d)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const u = +d[1];
    if (s = d[2], s === "#") {
      if (u >= t)
        throw new Error(c("property/index", u));
      return n[t - u];
    }
    if (u > t)
      throw new Error(c("data", u));
    if (o = r[t - u], !s)
      return o;
  }
  let i = o;
  const l = s.split("/");
  for (const d of l)
    d && (o = (0, G._)`${o}${(0, G.getProperty)((0, bt.unescapeJsonPointer)(d))}`, i = (0, G._)`${i} && ${o}`);
  return i;
  function c(d, u) {
    return `Cannot access ${d} ${u} levels up, current level is ${t}`;
  }
}
lt.getData = Gu;
var $n = {};
Object.defineProperty($n, "__esModule", { value: !0 });
class D_ extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
$n.default = D_;
var Fr = {};
Object.defineProperty(Fr, "__esModule", { value: !0 });
const Ms = Ie;
class M_ extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, Ms.resolveUrl)(t, r, n), this.missingSchema = (0, Ms.normalizeId)((0, Ms.getFullPath)(t, this.missingRef));
  }
}
Fr.default = M_;
var Ge = {};
Object.defineProperty(Ge, "__esModule", { value: !0 });
Ge.resolveSchema = Ge.getCompilingSchema = Ge.resolveRef = Ge.compileSchema = Ge.SchemaEnv = void 0;
const nt = Z, L_ = $n, er = vt, it = Ie, Qi = L, F_ = lt;
class gs {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, it.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Ge.SchemaEnv = gs;
function Ta(e) {
  const t = Hu.call(this, e);
  if (t)
    return t;
  const r = (0, it.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: o } = this.opts, i = new nt.CodeGen(this.scope, { es5: n, lines: s, ownProperties: o });
  let l;
  e.$async && (l = i.scopeValue("Error", {
    ref: L_.default,
    code: (0, nt._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = i.scopeName("validate");
  e.validateName = c;
  const d = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: er.default.data,
    parentData: er.default.parentData,
    parentDataProperty: er.default.parentDataProperty,
    dataNames: [er.default.data],
    dataPathArr: [nt.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, nt.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: l,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: nt.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, nt._)`""`,
    opts: this.opts,
    self: this
  };
  let u;
  try {
    this._compilations.add(e), (0, F_.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const m = i.toString();
    u = `${i.scopeRefs(er.default.scope)}return ${m}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const _ = new Function(`${er.default.self}`, `${er.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(c, { ref: _ }), _.errors = null, _.schema = e.schema, _.schemaEnv = e, e.$async && (_.$async = !0), this.opts.code.source === !0 && (_.source = { validateName: c, validateCode: m, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: E, items: g } = d;
      _.evaluated = {
        props: E instanceof nt.Name ? void 0 : E,
        items: g instanceof nt.Name ? void 0 : g,
        dynamicProps: E instanceof nt.Name,
        dynamicItems: g instanceof nt.Name
      }, _.source && (_.source.evaluated = (0, nt.stringify)(_.evaluated));
    }
    return e.validate = _, e;
  } catch (m) {
    throw delete e.validate, delete e.validateName, u && this.logger.error("Error compiling schema, function code:", u), m;
  } finally {
    this._compilations.delete(e);
  }
}
Ge.compileSchema = Ta;
function V_(e, t, r) {
  var n;
  r = (0, it.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let o = q_.call(this, e, r);
  if (o === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: l } = this.opts;
    i && (o = new gs({ schema: i, schemaId: l, root: e, baseId: t }));
  }
  if (o !== void 0)
    return e.refs[r] = U_.call(this, o);
}
Ge.resolveRef = V_;
function U_(e) {
  return (0, it.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Ta.call(this, e);
}
function Hu(e) {
  for (const t of this._compilations)
    if (z_(t, e))
      return t;
}
Ge.getCompilingSchema = Hu;
function z_(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function q_(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || vs.call(this, e, t);
}
function vs(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, it._getFullPath)(this.opts.uriResolver, r);
  let s = (0, it.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return Ls.call(this, r, e);
  const o = (0, it.normalizeId)(n), i = this.refs[o] || this.schemas[o];
  if (typeof i == "string") {
    const l = vs.call(this, e, i);
    return typeof (l == null ? void 0 : l.schema) != "object" ? void 0 : Ls.call(this, r, l);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || Ta.call(this, i), o === (0, it.normalizeId)(t)) {
      const { schema: l } = i, { schemaId: c } = this.opts, d = l[c];
      return d && (s = (0, it.resolveUrl)(this.opts.uriResolver, s, d)), new gs({ schema: l, schemaId: c, root: e, baseId: s });
    }
    return Ls.call(this, r, i);
  }
}
Ge.resolveSchema = vs;
const K_ = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Ls(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const l of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, Qi.unescapeFragment)(l)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !K_.has(l) && d && (t = (0, it.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let o;
  if (typeof r != "boolean" && r.$ref && !(0, Qi.schemaHasRulesButRef)(r, this.RULES)) {
    const l = (0, it.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    o = vs.call(this, n, l);
  }
  const { schemaId: i } = this.opts;
  if (o = o || new gs({ schema: r, schemaId: i, root: n, baseId: t }), o.schema !== o.root.schema)
    return o;
}
const G_ = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", H_ = "Meta-schema for $data reference (JSON AnySchema extension proposal)", W_ = "object", J_ = [
  "$data"
], B_ = {
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
}, X_ = !1, Y_ = {
  $id: G_,
  description: H_,
  type: W_,
  required: J_,
  properties: B_,
  additionalProperties: X_
};
var Ia = {};
Object.defineProperty(Ia, "__esModule", { value: !0 });
const Wu = ru;
Wu.code = 'require("ajv/dist/runtime/uri").default';
Ia.default = Wu;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = lt;
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
  const n = $n, s = Fr, o = ur, i = Ge, l = Z, c = Ie, d = Se, u = L, m = Y_, P = Ia, _ = (v, p) => new RegExp(v, p);
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
    var p, S, $, a, f, b, j, A, q, F, re, He, Lt, Ft, Vt, Ut, zt, qt, Kt, Gt, Ht, Wt, Jt, Bt, Xt;
    const tt = v.strict, Yt = (p = v.code) === null || p === void 0 ? void 0 : p.optimize, qr = Yt === !0 || Yt === void 0 ? 1 : Yt || 0, Kr = ($ = (S = v.code) === null || S === void 0 ? void 0 : S.regExp) !== null && $ !== void 0 ? $ : _, Ts = (a = v.uriResolver) !== null && a !== void 0 ? a : P.default;
    return {
      strictSchema: (b = (f = v.strictSchema) !== null && f !== void 0 ? f : tt) !== null && b !== void 0 ? b : !0,
      strictNumbers: (A = (j = v.strictNumbers) !== null && j !== void 0 ? j : tt) !== null && A !== void 0 ? A : !0,
      strictTypes: (F = (q = v.strictTypes) !== null && q !== void 0 ? q : tt) !== null && F !== void 0 ? F : "log",
      strictTuples: (He = (re = v.strictTuples) !== null && re !== void 0 ? re : tt) !== null && He !== void 0 ? He : "log",
      strictRequired: (Ft = (Lt = v.strictRequired) !== null && Lt !== void 0 ? Lt : tt) !== null && Ft !== void 0 ? Ft : !1,
      code: v.code ? { ...v.code, optimize: qr, regExp: Kr } : { optimize: qr, regExp: Kr },
      loopRequired: (Vt = v.loopRequired) !== null && Vt !== void 0 ? Vt : w,
      loopEnum: (Ut = v.loopEnum) !== null && Ut !== void 0 ? Ut : w,
      meta: (zt = v.meta) !== null && zt !== void 0 ? zt : !0,
      messages: (qt = v.messages) !== null && qt !== void 0 ? qt : !0,
      inlineRefs: (Kt = v.inlineRefs) !== null && Kt !== void 0 ? Kt : !0,
      schemaId: (Gt = v.schemaId) !== null && Gt !== void 0 ? Gt : "$id",
      addUsedSchema: (Ht = v.addUsedSchema) !== null && Ht !== void 0 ? Ht : !0,
      validateSchema: (Wt = v.validateSchema) !== null && Wt !== void 0 ? Wt : !0,
      validateFormats: (Jt = v.validateFormats) !== null && Jt !== void 0 ? Jt : !0,
      unicodeRegExp: (Bt = v.unicodeRegExp) !== null && Bt !== void 0 ? Bt : !0,
      int32range: (Xt = v.int32range) !== null && Xt !== void 0 ? Xt : !0,
      uriResolver: Ts
    };
  }
  class R {
    constructor(p = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), p = this.opts = { ...p, ...N(p) };
      const { es5: S, lines: $ } = this.opts.code;
      this.scope = new l.ValueScope({ scope: {}, prefixes: g, es5: S, lines: $ }), this.logger = Q(p.logger);
      const a = p.validateFormats;
      p.validateFormats = !1, this.RULES = (0, o.getRules)(), I.call(this, y, p, "NOT SUPPORTED"), I.call(this, h, p, "DEPRECATED", "warn"), this._metaOpts = H.call(this), p.formats && de.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), p.keywords && V.call(this, p.keywords), typeof p.meta == "object" && this.addMetaSchema(p.meta), W.call(this), p.validateFormats = a;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: p, meta: S, schemaId: $ } = this.opts;
      let a = m;
      $ === "id" && (a = { ...m }, a.id = a.$id, delete a.$id), S && p && this.addMetaSchema(a, a[$], !1);
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
      const a = $(S);
      return "$async" in $ || (this.errors = $.errors), a;
    }
    compile(p, S) {
      const $ = this._addSchema(p, S);
      return $.validate || this._compileSchemaEnv($);
    }
    compileAsync(p, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: $ } = this.opts;
      return a.call(this, p, S);
      async function a(F, re) {
        await f.call(this, F.$schema);
        const He = this._addSchema(F, re);
        return He.validate || b.call(this, He);
      }
      async function f(F) {
        F && !this.getSchema(F) && await a.call(this, { $ref: F }, !0);
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
    addSchema(p, S, $, a = this.opts.validateSchema) {
      if (Array.isArray(p)) {
        for (const b of p)
          this.addSchema(b, void 0, $, a);
        return this;
      }
      let f;
      if (typeof p == "object") {
        const { schemaId: b } = this.opts;
        if (f = p[b], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${b} must be string`);
      }
      return S = (0, c.normalizeId)(S || f), this._checkUnique(S), this.schemas[S] = this._addSchema(p, $, S, a, !0), this;
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
      const a = this.validate($, p);
      if (!a && S) {
        const f = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(f);
        else
          throw new Error(f);
      }
      return a;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(p) {
      let S;
      for (; typeof (S = z.call(this, p)) == "string"; )
        p = S;
      if (S === void 0) {
        const { schemaId: $ } = this.opts, a = new i.SchemaEnv({ schema: {}, schemaId: $ });
        if (S = i.resolveSchema.call(this, a, p), !S)
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
        return (0, u.eachItem)($, (f) => k.call(this, f)), this;
      D.call(this, S);
      const a = {
        ...S,
        type: (0, d.getJSONTypes)(S.type),
        schemaType: (0, d.getJSONTypes)(S.schemaType)
      };
      return (0, u.eachItem)($, a.type.length === 0 ? (f) => k.call(this, f, a) : (f) => a.type.forEach((b) => k.call(this, f, a, b))), this;
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
        const a = $.rules.findIndex((f) => f.keyword === p);
        a >= 0 && $.rules.splice(a, 1);
      }
      return this;
    }
    // Add format
    addFormat(p, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[p] = S, this;
    }
    errorsText(p = this.errors, { separator: S = ", ", dataVar: $ = "data" } = {}) {
      return !p || p.length === 0 ? "No errors" : p.map((a) => `${$}${a.instancePath} ${a.message}`).reduce((a, f) => a + S + f);
    }
    $dataMetaSchema(p, S) {
      const $ = this.RULES.all;
      p = JSON.parse(JSON.stringify(p));
      for (const a of S) {
        const f = a.split("/").slice(1);
        let b = p;
        for (const j of f)
          b = b[j];
        for (const j in $) {
          const A = $[j];
          if (typeof A != "object")
            continue;
          const { $data: q } = A.definition, F = b[j];
          q && F && (b[j] = T(F));
        }
      }
      return p;
    }
    _removeAllSchemas(p, S) {
      for (const $ in p) {
        const a = p[$];
        (!S || S.test($)) && (typeof a == "string" ? delete p[$] : a && !a.meta && (this._cache.delete(a.schema), delete p[$]));
      }
    }
    _addSchema(p, S, $, a = this.opts.validateSchema, f = this.opts.addUsedSchema) {
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
      return A = new i.SchemaEnv({ schema: p, schemaId: j, meta: S, baseId: $, localRefs: q }), this._cache.set(A.schema, A), f && !$.startsWith("#") && ($ && this._checkUnique($), this.refs[$] = A), a && this.validateSchema(p, !0), A;
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
  function I(v, p, S, $ = "error") {
    for (const a in v) {
      const f = a;
      f in p && this.logger[$](`${S}: option ${a}. ${v[f]}`);
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
  function de() {
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
  const fe = /^[a-z_$][a-z0-9_$:-]*$/i;
  function C(v, p) {
    const { RULES: S } = this;
    if ((0, u.eachItem)(v, ($) => {
      if (S.keywords[$])
        throw new Error(`Keyword ${$} is already defined`);
      if (!fe.test($))
        throw new Error(`Keyword ${$} has invalid name`);
    }), !!p && p.$data && !("code" in p || "validate" in p))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function k(v, p, S) {
    var $;
    const a = p == null ? void 0 : p.post;
    if (S && a)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let b = a ? f.post : f.rules.find(({ type: A }) => A === S);
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
    const $ = v.rules.findIndex((a) => a.keyword === S);
    $ >= 0 ? v.rules.splice($, 0, p) : (v.rules.push(p), this.logger.warn(`rule ${S} is not defined`));
  }
  function D(v) {
    let { metaSchema: p } = v;
    p !== void 0 && (v.$data && this.opts.$data && (p = T(p)), v.validateSchema = this.compile(p, !0));
  }
  const O = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function T(v) {
    return { anyOf: [v, O] };
  }
})(mu);
var ja = {}, Aa = {}, ka = {};
Object.defineProperty(ka, "__esModule", { value: !0 });
const Q_ = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
ka.default = Q_;
var dr = {};
Object.defineProperty(dr, "__esModule", { value: !0 });
dr.callRef = dr.getValidate = void 0;
const Z_ = Fr, Zi = ee, qe = Z, $r = vt, xi = Ge, Rn = L, x_ = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: o, validateName: i, opts: l, self: c } = n, { root: d } = o;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return m();
    const u = xi.resolveRef.call(c, d, s, r);
    if (u === void 0)
      throw new Z_.default(n.opts.uriResolver, s, r);
    if (u instanceof xi.SchemaEnv)
      return P(u);
    return _(u);
    function m() {
      if (o === d)
        return Wn(e, i, o, o.$async);
      const E = t.scopeValue("root", { ref: d });
      return Wn(e, (0, qe._)`${E}.validate`, d, d.$async);
    }
    function P(E) {
      const g = Ju(e, E);
      Wn(e, g, E, E.$async);
    }
    function _(E) {
      const g = t.scopeValue("schema", l.code.source === !0 ? { ref: E, code: (0, qe.stringify)(E) } : { ref: E }), y = t.name("valid"), h = e.subschema({
        schema: E,
        dataTypes: [],
        schemaPath: qe.nil,
        topSchemaRef: g,
        errSchemaPath: r
      }, y);
      e.mergeEvaluated(h), e.ok(y);
    }
  }
};
function Ju(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, qe._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
dr.getValidate = Ju;
function Wn(e, t, r, n) {
  const { gen: s, it: o } = e, { allErrors: i, schemaEnv: l, opts: c } = o, d = c.passContext ? $r.default.this : qe.nil;
  n ? u() : m();
  function u() {
    if (!l.$async)
      throw new Error("async schema referenced by sync schema");
    const E = s.let("valid");
    s.try(() => {
      s.code((0, qe._)`await ${(0, Zi.callValidateCode)(e, t, d)}`), _(t), i || s.assign(E, !0);
    }, (g) => {
      s.if((0, qe._)`!(${g} instanceof ${o.ValidationError})`, () => s.throw(g)), P(g), i || s.assign(E, !1);
    }), e.ok(E);
  }
  function m() {
    e.result((0, Zi.callValidateCode)(e, t, d), () => _(t), () => P(t));
  }
  function P(E) {
    const g = (0, qe._)`${E}.errors`;
    s.assign($r.default.vErrors, (0, qe._)`${$r.default.vErrors} === null ? ${g} : ${$r.default.vErrors}.concat(${g})`), s.assign($r.default.errors, (0, qe._)`${$r.default.vErrors}.length`);
  }
  function _(E) {
    var g;
    if (!o.opts.unevaluated)
      return;
    const y = (g = r == null ? void 0 : r.validate) === null || g === void 0 ? void 0 : g.evaluated;
    if (o.props !== !0)
      if (y && !y.dynamicProps)
        y.props !== void 0 && (o.props = Rn.mergeEvaluated.props(s, y.props, o.props));
      else {
        const h = s.var("props", (0, qe._)`${E}.evaluated.props`);
        o.props = Rn.mergeEvaluated.props(s, h, o.props, qe.Name);
      }
    if (o.items !== !0)
      if (y && !y.dynamicItems)
        y.items !== void 0 && (o.items = Rn.mergeEvaluated.items(s, y.items, o.items));
      else {
        const h = s.var("items", (0, qe._)`${E}.evaluated.items`);
        o.items = Rn.mergeEvaluated.items(s, h, o.items, qe.Name);
      }
  }
}
dr.callRef = Wn;
dr.default = x_;
Object.defineProperty(Aa, "__esModule", { value: !0 });
const eg = ka, tg = dr, rg = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  eg.default,
  tg.default
];
Aa.default = rg;
var Ca = {}, Da = {};
Object.defineProperty(Da, "__esModule", { value: !0 });
const ss = Z, Tt = ss.operators, os = {
  maximum: { okStr: "<=", ok: Tt.LTE, fail: Tt.GT },
  minimum: { okStr: ">=", ok: Tt.GTE, fail: Tt.LT },
  exclusiveMaximum: { okStr: "<", ok: Tt.LT, fail: Tt.GTE },
  exclusiveMinimum: { okStr: ">", ok: Tt.GT, fail: Tt.LTE }
}, ng = {
  message: ({ keyword: e, schemaCode: t }) => (0, ss.str)`must be ${os[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, ss._)`{comparison: ${os[e].okStr}, limit: ${t}}`
}, sg = {
  keyword: Object.keys(os),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: ng,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, ss._)`${r} ${os[t].fail} ${n} || isNaN(${r})`);
  }
};
Da.default = sg;
var Ma = {};
Object.defineProperty(Ma, "__esModule", { value: !0 });
const on = Z, og = {
  message: ({ schemaCode: e }) => (0, on.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, on._)`{multipleOf: ${e}}`
}, ag = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: og,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, o = s.opts.multipleOfPrecision, i = t.let("res"), l = o ? (0, on._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${o}` : (0, on._)`${i} !== parseInt(${i})`;
    e.fail$data((0, on._)`(${n} === 0 || (${i} = ${r}/${n}, ${l}))`);
  }
};
Ma.default = ag;
var La = {}, Fa = {};
Object.defineProperty(Fa, "__esModule", { value: !0 });
function Bu(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Fa.default = Bu;
Bu.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(La, "__esModule", { value: !0 });
const ar = Z, ig = L, cg = Fa, lg = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, ar.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, ar._)`{limit: ${e}}`
}, ug = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: lg,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, o = t === "maxLength" ? ar.operators.GT : ar.operators.LT, i = s.opts.unicode === !1 ? (0, ar._)`${r}.length` : (0, ar._)`${(0, ig.useFunc)(e.gen, cg.default)}(${r})`;
    e.fail$data((0, ar._)`${i} ${o} ${n}`);
  }
};
La.default = ug;
var Va = {};
Object.defineProperty(Va, "__esModule", { value: !0 });
const dg = ee, as = Z, fg = {
  message: ({ schemaCode: e }) => (0, as.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, as._)`{pattern: ${e}}`
}, hg = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: fg,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: o } = e, i = o.opts.unicodeRegExp ? "u" : "", l = r ? (0, as._)`(new RegExp(${s}, ${i}))` : (0, dg.usePattern)(e, n);
    e.fail$data((0, as._)`!${l}.test(${t})`);
  }
};
Va.default = hg;
var Ua = {};
Object.defineProperty(Ua, "__esModule", { value: !0 });
const an = Z, mg = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, an.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, an._)`{limit: ${e}}`
}, pg = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: mg,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? an.operators.GT : an.operators.LT;
    e.fail$data((0, an._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Ua.default = pg;
var za = {};
Object.defineProperty(za, "__esModule", { value: !0 });
const Jr = ee, cn = Z, $g = L, yg = {
  message: ({ params: { missingProperty: e } }) => (0, cn.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, cn._)`{missingProperty: ${e}}`
}, _g = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: yg,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: o, it: i } = e, { opts: l } = i;
    if (!o && r.length === 0)
      return;
    const c = r.length >= l.loopRequired;
    if (i.allErrors ? d() : u(), l.strictRequired) {
      const _ = e.parentSchema.properties, { definedProperties: E } = e.it;
      for (const g of r)
        if ((_ == null ? void 0 : _[g]) === void 0 && !E.has(g)) {
          const y = i.schemaEnv.baseId + i.errSchemaPath, h = `required property "${g}" is not defined at "${y}" (strictRequired)`;
          (0, $g.checkStrictMode)(i, h, i.opts.strictRequired);
        }
    }
    function d() {
      if (c || o)
        e.block$data(cn.nil, m);
      else
        for (const _ of r)
          (0, Jr.checkReportMissingProp)(e, _);
    }
    function u() {
      const _ = t.let("missing");
      if (c || o) {
        const E = t.let("valid", !0);
        e.block$data(E, () => P(_, E)), e.ok(E);
      } else
        t.if((0, Jr.checkMissingProp)(e, r, _)), (0, Jr.reportMissingProp)(e, _), t.else();
    }
    function m() {
      t.forOf("prop", n, (_) => {
        e.setParams({ missingProperty: _ }), t.if((0, Jr.noPropertyInData)(t, s, _, l.ownProperties), () => e.error());
      });
    }
    function P(_, E) {
      e.setParams({ missingProperty: _ }), t.forOf(_, n, () => {
        t.assign(E, (0, Jr.propertyInData)(t, s, _, l.ownProperties)), t.if((0, cn.not)(E), () => {
          e.error(), t.break();
        });
      }, cn.nil);
    }
  }
};
za.default = _g;
var qa = {};
Object.defineProperty(qa, "__esModule", { value: !0 });
const ln = Z, gg = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, ln.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, ln._)`{limit: ${e}}`
}, vg = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: gg,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? ln.operators.GT : ln.operators.LT;
    e.fail$data((0, ln._)`${r}.length ${s} ${n}`);
  }
};
qa.default = vg;
var Ka = {}, yn = {};
Object.defineProperty(yn, "__esModule", { value: !0 });
const Xu = fs;
Xu.code = 'require("ajv/dist/runtime/equal").default';
yn.default = Xu;
Object.defineProperty(Ka, "__esModule", { value: !0 });
const Fs = Se, Oe = Z, wg = L, Eg = yn, Sg = {
  message: ({ params: { i: e, j: t } }) => (0, Oe.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Oe._)`{i: ${e}, j: ${t}}`
}, bg = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: Sg,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: o, schemaCode: i, it: l } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = o.items ? (0, Fs.getSchemaTypes)(o.items) : [];
    e.block$data(c, u, (0, Oe._)`${i} === false`), e.ok(c);
    function u() {
      const E = t.let("i", (0, Oe._)`${r}.length`), g = t.let("j");
      e.setParams({ i: E, j: g }), t.assign(c, !0), t.if((0, Oe._)`${E} > 1`, () => (m() ? P : _)(E, g));
    }
    function m() {
      return d.length > 0 && !d.some((E) => E === "object" || E === "array");
    }
    function P(E, g) {
      const y = t.name("item"), h = (0, Fs.checkDataTypes)(d, y, l.opts.strictNumbers, Fs.DataType.Wrong), w = t.const("indices", (0, Oe._)`{}`);
      t.for((0, Oe._)`;${E}--;`, () => {
        t.let(y, (0, Oe._)`${r}[${E}]`), t.if(h, (0, Oe._)`continue`), d.length > 1 && t.if((0, Oe._)`typeof ${y} == "string"`, (0, Oe._)`${y} += "_"`), t.if((0, Oe._)`typeof ${w}[${y}] == "number"`, () => {
          t.assign(g, (0, Oe._)`${w}[${y}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Oe._)`${w}[${y}] = ${E}`);
      });
    }
    function _(E, g) {
      const y = (0, wg.useFunc)(t, Eg.default), h = t.name("outer");
      t.label(h).for((0, Oe._)`;${E}--;`, () => t.for((0, Oe._)`${g} = ${E}; ${g}--;`, () => t.if((0, Oe._)`${y}(${r}[${E}], ${r}[${g}])`, () => {
        e.error(), t.assign(c, !1).break(h);
      })));
    }
  }
};
Ka.default = bg;
var Ga = {};
Object.defineProperty(Ga, "__esModule", { value: !0 });
const io = Z, Pg = L, Ng = yn, Og = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, io._)`{allowedValue: ${e}}`
}, Rg = {
  keyword: "const",
  $data: !0,
  error: Og,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: o } = e;
    n || o && typeof o == "object" ? e.fail$data((0, io._)`!${(0, Pg.useFunc)(t, Ng.default)}(${r}, ${s})`) : e.fail((0, io._)`${o} !== ${r}`);
  }
};
Ga.default = Rg;
var Ha = {};
Object.defineProperty(Ha, "__esModule", { value: !0 });
const Zr = Z, Tg = L, Ig = yn, jg = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Zr._)`{allowedValues: ${e}}`
}, Ag = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: jg,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: o, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const l = s.length >= i.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, Tg.useFunc)(t, Ig.default));
    let u;
    if (l || n)
      u = t.let("valid"), e.block$data(u, m);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const _ = t.const("vSchema", o);
      u = (0, Zr.or)(...s.map((E, g) => P(_, g)));
    }
    e.pass(u);
    function m() {
      t.assign(u, !1), t.forOf("v", o, (_) => t.if((0, Zr._)`${d()}(${r}, ${_})`, () => t.assign(u, !0).break()));
    }
    function P(_, E) {
      const g = s[E];
      return typeof g == "object" && g !== null ? (0, Zr._)`${d()}(${r}, ${_}[${E}])` : (0, Zr._)`${r} === ${g}`;
    }
  }
};
Ha.default = Ag;
Object.defineProperty(Ca, "__esModule", { value: !0 });
const kg = Da, Cg = Ma, Dg = La, Mg = Va, Lg = Ua, Fg = za, Vg = qa, Ug = Ka, zg = Ga, qg = Ha, Kg = [
  // number
  kg.default,
  Cg.default,
  // string
  Dg.default,
  Mg.default,
  // object
  Lg.default,
  Fg.default,
  // array
  Vg.default,
  Ug.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  zg.default,
  qg.default
];
Ca.default = Kg;
var Wa = {}, Vr = {};
Object.defineProperty(Vr, "__esModule", { value: !0 });
Vr.validateAdditionalItems = void 0;
const ir = Z, co = L, Gg = {
  message: ({ params: { len: e } }) => (0, ir.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, ir._)`{limit: ${e}}`
}, Hg = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: Gg,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, co.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Yu(e, n);
  }
};
function Yu(e, t) {
  const { gen: r, schema: n, data: s, keyword: o, it: i } = e;
  i.items = !0;
  const l = r.const("len", (0, ir._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, ir._)`${l} <= ${t.length}`);
  else if (typeof n == "object" && !(0, co.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, ir._)`${l} <= ${t.length}`);
    r.if((0, ir.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, l, (u) => {
      e.subschema({ keyword: o, dataProp: u, dataPropType: co.Type.Num }, d), i.allErrors || r.if((0, ir.not)(d), () => r.break());
    });
  }
}
Vr.validateAdditionalItems = Yu;
Vr.default = Hg;
var Ja = {}, Ur = {};
Object.defineProperty(Ur, "__esModule", { value: !0 });
Ur.validateTuple = void 0;
const ec = Z, Jn = L, Wg = ee, Jg = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Qu(e, "additionalItems", t);
    r.items = !0, !(0, Jn.alwaysValidSchema)(r, t) && e.ok((0, Wg.validateArray)(e));
  }
};
function Qu(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: o, keyword: i, it: l } = e;
  u(s), l.opts.unevaluated && r.length && l.items !== !0 && (l.items = Jn.mergeEvaluated.items(n, r.length, l.items));
  const c = n.name("valid"), d = n.const("len", (0, ec._)`${o}.length`);
  r.forEach((m, P) => {
    (0, Jn.alwaysValidSchema)(l, m) || (n.if((0, ec._)`${d} > ${P}`, () => e.subschema({
      keyword: i,
      schemaProp: P,
      dataProp: P
    }, c)), e.ok(c));
  });
  function u(m) {
    const { opts: P, errSchemaPath: _ } = l, E = r.length, g = E === m.minItems && (E === m.maxItems || m[t] === !1);
    if (P.strictTuples && !g) {
      const y = `"${i}" is ${E}-tuple, but minItems or maxItems/${t} are not specified or different at path "${_}"`;
      (0, Jn.checkStrictMode)(l, y, P.strictTuples);
    }
  }
}
Ur.validateTuple = Qu;
Ur.default = Jg;
Object.defineProperty(Ja, "__esModule", { value: !0 });
const Bg = Ur, Xg = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, Bg.validateTuple)(e, "items")
};
Ja.default = Xg;
var Ba = {};
Object.defineProperty(Ba, "__esModule", { value: !0 });
const tc = Z, Yg = L, Qg = ee, Zg = Vr, xg = {
  message: ({ params: { len: e } }) => (0, tc.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, tc._)`{limit: ${e}}`
}, e0 = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: xg,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, Yg.alwaysValidSchema)(n, t) && (s ? (0, Zg.validateAdditionalItems)(e, s) : e.ok((0, Qg.validateArray)(e)));
  }
};
Ba.default = e0;
var Xa = {};
Object.defineProperty(Xa, "__esModule", { value: !0 });
const Qe = Z, Tn = L, t0 = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Qe.str)`must contain at least ${e} valid item(s)` : (0, Qe.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Qe._)`{minContains: ${e}}` : (0, Qe._)`{minContains: ${e}, maxContains: ${t}}`
}, r0 = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: t0,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: o } = e;
    let i, l;
    const { minContains: c, maxContains: d } = n;
    o.opts.next ? (i = c === void 0 ? 1 : c, l = d) : i = 1;
    const u = t.const("len", (0, Qe._)`${s}.length`);
    if (e.setParams({ min: i, max: l }), l === void 0 && i === 0) {
      (0, Tn.checkStrictMode)(o, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (l !== void 0 && i > l) {
      (0, Tn.checkStrictMode)(o, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, Tn.alwaysValidSchema)(o, r)) {
      let g = (0, Qe._)`${u} >= ${i}`;
      l !== void 0 && (g = (0, Qe._)`${g} && ${u} <= ${l}`), e.pass(g);
      return;
    }
    o.items = !0;
    const m = t.name("valid");
    l === void 0 && i === 1 ? _(m, () => t.if(m, () => t.break())) : i === 0 ? (t.let(m, !0), l !== void 0 && t.if((0, Qe._)`${s}.length > 0`, P)) : (t.let(m, !1), P()), e.result(m, () => e.reset());
    function P() {
      const g = t.name("_valid"), y = t.let("count", 0);
      _(g, () => t.if(g, () => E(y)));
    }
    function _(g, y) {
      t.forRange("i", 0, u, (h) => {
        e.subschema({
          keyword: "contains",
          dataProp: h,
          dataPropType: Tn.Type.Num,
          compositeRule: !0
        }, g), y();
      });
    }
    function E(g) {
      t.code((0, Qe._)`${g}++`), l === void 0 ? t.if((0, Qe._)`${g} >= ${i}`, () => t.assign(m, !0).break()) : (t.if((0, Qe._)`${g} > ${l}`, () => t.assign(m, !1).break()), i === 1 ? t.assign(m, !0) : t.if((0, Qe._)`${g} >= ${i}`, () => t.assign(m, !0)));
    }
  }
};
Xa.default = r0;
var Zu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = Z, r = L, n = ee;
  e.error = {
    message: ({ params: { property: c, depsCount: d, deps: u } }) => {
      const m = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${m} ${u} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: d, deps: u, missingProperty: m } }) => (0, t._)`{property: ${c},
    missingProperty: ${m},
    depsCount: ${d},
    deps: ${u}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [d, u] = o(c);
      i(c, d), l(c, u);
    }
  };
  function o({ schema: c }) {
    const d = {}, u = {};
    for (const m in c) {
      if (m === "__proto__")
        continue;
      const P = Array.isArray(c[m]) ? d : u;
      P[m] = c[m];
    }
    return [d, u];
  }
  function i(c, d = c.schema) {
    const { gen: u, data: m, it: P } = c;
    if (Object.keys(d).length === 0)
      return;
    const _ = u.let("missing");
    for (const E in d) {
      const g = d[E];
      if (g.length === 0)
        continue;
      const y = (0, n.propertyInData)(u, m, E, P.opts.ownProperties);
      c.setParams({
        property: E,
        depsCount: g.length,
        deps: g.join(", ")
      }), P.allErrors ? u.if(y, () => {
        for (const h of g)
          (0, n.checkReportMissingProp)(c, h);
      }) : (u.if((0, t._)`${y} && (${(0, n.checkMissingProp)(c, g, _)})`), (0, n.reportMissingProp)(c, _), u.else());
    }
  }
  e.validatePropertyDeps = i;
  function l(c, d = c.schema) {
    const { gen: u, data: m, keyword: P, it: _ } = c, E = u.name("valid");
    for (const g in d)
      (0, r.alwaysValidSchema)(_, d[g]) || (u.if(
        (0, n.propertyInData)(u, m, g, _.opts.ownProperties),
        () => {
          const y = c.subschema({ keyword: P, schemaProp: g }, E);
          c.mergeValidEvaluated(y, E);
        },
        () => u.var(E, !0)
        // TODO var
      ), c.ok(E));
  }
  e.validateSchemaDeps = l, e.default = s;
})(Zu);
var Ya = {};
Object.defineProperty(Ya, "__esModule", { value: !0 });
const xu = Z, n0 = L, s0 = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, xu._)`{propertyName: ${e.propertyName}}`
}, o0 = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: s0,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, n0.alwaysValidSchema)(s, r))
      return;
    const o = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, o), t.if((0, xu.not)(o), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(o);
  }
};
Ya.default = o0;
var ws = {};
Object.defineProperty(ws, "__esModule", { value: !0 });
const In = ee, ot = Z, a0 = vt, jn = L, i0 = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, ot._)`{additionalProperty: ${e.additionalProperty}}`
}, c0 = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: i0,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: o, it: i } = e;
    if (!o)
      throw new Error("ajv implementation error");
    const { allErrors: l, opts: c } = i;
    if (i.props = !0, c.removeAdditional !== "all" && (0, jn.alwaysValidSchema)(i, r))
      return;
    const d = (0, In.allSchemaProperties)(n.properties), u = (0, In.allSchemaProperties)(n.patternProperties);
    m(), e.ok((0, ot._)`${o} === ${a0.default.errors}`);
    function m() {
      t.forIn("key", s, (y) => {
        !d.length && !u.length ? E(y) : t.if(P(y), () => E(y));
      });
    }
    function P(y) {
      let h;
      if (d.length > 8) {
        const w = (0, jn.schemaRefOrVal)(i, n.properties, "properties");
        h = (0, In.isOwnProperty)(t, w, y);
      } else d.length ? h = (0, ot.or)(...d.map((w) => (0, ot._)`${y} === ${w}`)) : h = ot.nil;
      return u.length && (h = (0, ot.or)(h, ...u.map((w) => (0, ot._)`${(0, In.usePattern)(e, w)}.test(${y})`))), (0, ot.not)(h);
    }
    function _(y) {
      t.code((0, ot._)`delete ${s}[${y}]`);
    }
    function E(y) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        _(y);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: y }), e.error(), l || t.break();
        return;
      }
      if (typeof r == "object" && !(0, jn.alwaysValidSchema)(i, r)) {
        const h = t.name("valid");
        c.removeAdditional === "failing" ? (g(y, h, !1), t.if((0, ot.not)(h), () => {
          e.reset(), _(y);
        })) : (g(y, h), l || t.if((0, ot.not)(h), () => t.break()));
      }
    }
    function g(y, h, w) {
      const N = {
        keyword: "additionalProperties",
        dataProp: y,
        dataPropType: jn.Type.Str
      };
      w === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, h);
    }
  }
};
ws.default = c0;
var Qa = {};
Object.defineProperty(Qa, "__esModule", { value: !0 });
const l0 = lt, rc = ee, Vs = L, nc = ws, u0 = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: o } = e;
    o.opts.removeAdditional === "all" && n.additionalProperties === void 0 && nc.default.code(new l0.KeywordCxt(o, nc.default, "additionalProperties"));
    const i = (0, rc.allSchemaProperties)(r);
    for (const m of i)
      o.definedProperties.add(m);
    o.opts.unevaluated && i.length && o.props !== !0 && (o.props = Vs.mergeEvaluated.props(t, (0, Vs.toHash)(i), o.props));
    const l = i.filter((m) => !(0, Vs.alwaysValidSchema)(o, r[m]));
    if (l.length === 0)
      return;
    const c = t.name("valid");
    for (const m of l)
      d(m) ? u(m) : (t.if((0, rc.propertyInData)(t, s, m, o.opts.ownProperties)), u(m), o.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(m), e.ok(c);
    function d(m) {
      return o.opts.useDefaults && !o.compositeRule && r[m].default !== void 0;
    }
    function u(m) {
      e.subschema({
        keyword: "properties",
        schemaProp: m,
        dataProp: m
      }, c);
    }
  }
};
Qa.default = u0;
var Za = {};
Object.defineProperty(Za, "__esModule", { value: !0 });
const sc = ee, An = Z, oc = L, ac = L, d0 = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: o } = e, { opts: i } = o, l = (0, sc.allSchemaProperties)(r), c = l.filter((g) => (0, oc.alwaysValidSchema)(o, r[g]));
    if (l.length === 0 || c.length === l.length && (!o.opts.unevaluated || o.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, u = t.name("valid");
    o.props !== !0 && !(o.props instanceof An.Name) && (o.props = (0, ac.evaluatedPropsToName)(t, o.props));
    const { props: m } = o;
    P();
    function P() {
      for (const g of l)
        d && _(g), o.allErrors ? E(g) : (t.var(u, !0), E(g), t.if(u));
    }
    function _(g) {
      for (const y in d)
        new RegExp(g).test(y) && (0, oc.checkStrictMode)(o, `property ${y} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function E(g) {
      t.forIn("key", n, (y) => {
        t.if((0, An._)`${(0, sc.usePattern)(e, g)}.test(${y})`, () => {
          const h = c.includes(g);
          h || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: y,
            dataPropType: ac.Type.Str
          }, u), o.opts.unevaluated && m !== !0 ? t.assign((0, An._)`${m}[${y}]`, !0) : !h && !o.allErrors && t.if((0, An.not)(u), () => t.break());
        });
      });
    }
  }
};
Za.default = d0;
var xa = {};
Object.defineProperty(xa, "__esModule", { value: !0 });
const f0 = L, h0 = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, f0.alwaysValidSchema)(n, r)) {
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
xa.default = h0;
var ei = {};
Object.defineProperty(ei, "__esModule", { value: !0 });
const m0 = ee, p0 = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: m0.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
ei.default = p0;
var ti = {};
Object.defineProperty(ti, "__esModule", { value: !0 });
const Bn = Z, $0 = L, y0 = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Bn._)`{passingSchemas: ${e.passing}}`
}, _0 = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: y0,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const o = r, i = t.let("valid", !1), l = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: l }), t.block(d), e.result(i, () => e.reset(), () => e.error(!0));
    function d() {
      o.forEach((u, m) => {
        let P;
        (0, $0.alwaysValidSchema)(s, u) ? t.var(c, !0) : P = e.subschema({
          keyword: "oneOf",
          schemaProp: m,
          compositeRule: !0
        }, c), m > 0 && t.if((0, Bn._)`${c} && ${i}`).assign(i, !1).assign(l, (0, Bn._)`[${l}, ${m}]`).else(), t.if(c, () => {
          t.assign(i, !0), t.assign(l, m), P && e.mergeEvaluated(P, Bn.Name);
        });
      });
    }
  }
};
ti.default = _0;
var ri = {};
Object.defineProperty(ri, "__esModule", { value: !0 });
const g0 = L, v0 = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((o, i) => {
      if ((0, g0.alwaysValidSchema)(n, o))
        return;
      const l = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(l);
    });
  }
};
ri.default = v0;
var ni = {};
Object.defineProperty(ni, "__esModule", { value: !0 });
const is = Z, ed = L, w0 = {
  message: ({ params: e }) => (0, is.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, is._)`{failingKeyword: ${e.ifClause}}`
}, E0 = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: w0,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, ed.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = ic(n, "then"), o = ic(n, "else");
    if (!s && !o)
      return;
    const i = t.let("valid", !0), l = t.name("_valid");
    if (c(), e.reset(), s && o) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(l, d("then", u), d("else", u));
    } else s ? t.if(l, d("then")) : t.if((0, is.not)(l), d("else"));
    e.pass(i, () => e.error(!0));
    function c() {
      const u = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, l);
      e.mergeEvaluated(u);
    }
    function d(u, m) {
      return () => {
        const P = e.subschema({ keyword: u }, l);
        t.assign(i, l), e.mergeValidEvaluated(P, i), m ? t.assign(m, (0, is._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function ic(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, ed.alwaysValidSchema)(e, r);
}
ni.default = E0;
var si = {};
Object.defineProperty(si, "__esModule", { value: !0 });
const S0 = L, b0 = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, S0.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
si.default = b0;
Object.defineProperty(Wa, "__esModule", { value: !0 });
const P0 = Vr, N0 = Ja, O0 = Ur, R0 = Ba, T0 = Xa, I0 = Zu, j0 = Ya, A0 = ws, k0 = Qa, C0 = Za, D0 = xa, M0 = ei, L0 = ti, F0 = ri, V0 = ni, U0 = si;
function z0(e = !1) {
  const t = [
    // any
    D0.default,
    M0.default,
    L0.default,
    F0.default,
    V0.default,
    U0.default,
    // object
    j0.default,
    A0.default,
    I0.default,
    k0.default,
    C0.default
  ];
  return e ? t.push(N0.default, R0.default) : t.push(P0.default, O0.default), t.push(T0.default), t;
}
Wa.default = z0;
var oi = {}, ai = {};
Object.defineProperty(ai, "__esModule", { value: !0 });
const _e = Z, q0 = {
  message: ({ schemaCode: e }) => (0, _e.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, _e._)`{format: ${e}}`
}, K0 = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: q0,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: o, schemaCode: i, it: l } = e, { opts: c, errSchemaPath: d, schemaEnv: u, self: m } = l;
    if (!c.validateFormats)
      return;
    s ? P() : _();
    function P() {
      const E = r.scopeValue("formats", {
        ref: m.formats,
        code: c.code.formats
      }), g = r.const("fDef", (0, _e._)`${E}[${i}]`), y = r.let("fType"), h = r.let("format");
      r.if((0, _e._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => r.assign(y, (0, _e._)`${g}.type || "string"`).assign(h, (0, _e._)`${g}.validate`), () => r.assign(y, (0, _e._)`"string"`).assign(h, g)), e.fail$data((0, _e.or)(w(), N()));
      function w() {
        return c.strictSchema === !1 ? _e.nil : (0, _e._)`${i} && !${h}`;
      }
      function N() {
        const R = u.$async ? (0, _e._)`(${g}.async ? await ${h}(${n}) : ${h}(${n}))` : (0, _e._)`${h}(${n})`, I = (0, _e._)`(typeof ${h} == "function" ? ${R} : ${h}.test(${n}))`;
        return (0, _e._)`${h} && ${h} !== true && ${y} === ${t} && !${I}`;
      }
    }
    function _() {
      const E = m.formats[o];
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
          m.logger.warn(I());
          return;
        }
        throw new Error(I());
        function I() {
          return `unknown format "${o}" ignored in schema at path "${d}"`;
        }
      }
      function N(I) {
        const z = I instanceof RegExp ? (0, _e.regexpCode)(I) : c.code.formats ? (0, _e._)`${c.code.formats}${(0, _e.getProperty)(o)}` : void 0, W = r.scopeValue("formats", { key: o, ref: I, code: z });
        return typeof I == "object" && !(I instanceof RegExp) ? [I.type || "string", I.validate, (0, _e._)`${W}.validate`] : ["string", I, W];
      }
      function R() {
        if (typeof E == "object" && !(E instanceof RegExp) && E.async) {
          if (!u.$async)
            throw new Error("async format in sync schema");
          return (0, _e._)`await ${h}(${n})`;
        }
        return typeof y == "function" ? (0, _e._)`${h}(${n})` : (0, _e._)`${h}.test(${n})`;
      }
    }
  }
};
ai.default = K0;
Object.defineProperty(oi, "__esModule", { value: !0 });
const G0 = ai, H0 = [G0.default];
oi.default = H0;
var jr = {};
Object.defineProperty(jr, "__esModule", { value: !0 });
jr.contentVocabulary = jr.metadataVocabulary = void 0;
jr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
jr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(ja, "__esModule", { value: !0 });
const W0 = Aa, J0 = Ca, B0 = Wa, X0 = oi, cc = jr, Y0 = [
  W0.default,
  J0.default,
  (0, B0.default)(),
  X0.default,
  cc.metadataVocabulary,
  cc.contentVocabulary
];
ja.default = Y0;
var ii = {}, Es = {};
Object.defineProperty(Es, "__esModule", { value: !0 });
Es.DiscrError = void 0;
var lc;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(lc || (Es.DiscrError = lc = {}));
Object.defineProperty(ii, "__esModule", { value: !0 });
const gr = Z, lo = Es, uc = Ge, Q0 = Fr, Z0 = L, x0 = {
  message: ({ params: { discrError: e, tagName: t } }) => e === lo.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, gr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, ev = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: x0,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: o } = e, { oneOf: i } = s;
    if (!o.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const l = n.propertyName;
    if (typeof l != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!i)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), d = t.const("tag", (0, gr._)`${r}${(0, gr.getProperty)(l)}`);
    t.if((0, gr._)`typeof ${d} == "string"`, () => u(), () => e.error(!1, { discrError: lo.DiscrError.Tag, tag: d, tagName: l })), e.ok(c);
    function u() {
      const _ = P();
      t.if(!1);
      for (const E in _)
        t.elseIf((0, gr._)`${d} === ${E}`), t.assign(c, m(_[E]));
      t.else(), e.error(!1, { discrError: lo.DiscrError.Mapping, tag: d, tagName: l }), t.endIf();
    }
    function m(_) {
      const E = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: _ }, E);
      return e.mergeEvaluated(g, gr.Name), E;
    }
    function P() {
      var _;
      const E = {}, g = h(s);
      let y = !0;
      for (let R = 0; R < i.length; R++) {
        let I = i[R];
        if (I != null && I.$ref && !(0, Z0.schemaHasRulesButRef)(I, o.self.RULES)) {
          const W = I.$ref;
          if (I = uc.resolveRef.call(o.self, o.schemaEnv.root, o.baseId, W), I instanceof uc.SchemaEnv && (I = I.schema), I === void 0)
            throw new Q0.default(o.opts.uriResolver, o.baseId, W);
        }
        const z = (_ = I == null ? void 0 : I.properties) === null || _ === void 0 ? void 0 : _[l];
        if (typeof z != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${l}"`);
        y = y && (g || h(I)), w(z, R);
      }
      if (!y)
        throw new Error(`discriminator: "${l}" must be required`);
      return E;
      function h({ required: R }) {
        return Array.isArray(R) && R.includes(l);
      }
      function w(R, I) {
        if (R.const)
          N(R.const, I);
        else if (R.enum)
          for (const z of R.enum)
            N(z, I);
        else
          throw new Error(`discriminator: "properties/${l}" must have "const" or "enum"`);
      }
      function N(R, I) {
        if (typeof R != "string" || R in E)
          throw new Error(`discriminator: "${l}" values must be unique strings`);
        E[R] = I;
      }
    }
  }
};
ii.default = ev;
const tv = "http://json-schema.org/draft-07/schema#", rv = "http://json-schema.org/draft-07/schema#", nv = "Core schema meta-schema", sv = {
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
}, ov = [
  "object",
  "boolean"
], av = {
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
}, iv = {
  $schema: tv,
  $id: rv,
  title: nv,
  definitions: sv,
  type: ov,
  properties: av,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = mu, n = ja, s = ii, o = iv, i = ["/properties"], l = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((E) => this.addVocabulary(E)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const E = this.opts.$data ? this.$dataMetaSchema(o, i) : o;
      this.addMetaSchema(E, l, !1), this.refs["http://json-schema.org/schema"] = l;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(l) ? l : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var d = lt;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return d.KeywordCxt;
  } });
  var u = Z;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return u._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return u.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return u.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return u.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return u.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return u.CodeGen;
  } });
  var m = $n;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return m.default;
  } });
  var P = Fr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return P.default;
  } });
})(ro, ro.exports);
var cv = ro.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = cv, r = Z, n = r.operators, s = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, o = {
    message: ({ keyword: l, schemaCode: c }) => r.str`should be ${s[l].okStr} ${c}`,
    params: ({ keyword: l, schemaCode: c }) => r._`{comparison: ${s[l].okStr}, limit: ${c}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(s),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: o,
    code(l) {
      const { gen: c, data: d, schemaCode: u, keyword: m, it: P } = l, { opts: _, self: E } = P;
      if (!_.validateFormats)
        return;
      const g = new t.KeywordCxt(P, E.RULES.all.format.definition, "format");
      g.$data ? y() : h();
      function y() {
        const N = c.scopeValue("formats", {
          ref: E.formats,
          code: _.code.formats
        }), R = c.const("fmt", r._`${N}[${g.schemaCode}]`);
        l.fail$data(r.or(r._`typeof ${R} != "object"`, r._`${R} instanceof RegExp`, r._`typeof ${R}.compare != "function"`, w(R)));
      }
      function h() {
        const N = g.schema, R = E.formats[N];
        if (!R || R === !0)
          return;
        if (typeof R != "object" || R instanceof RegExp || typeof R.compare != "function")
          throw new Error(`"${m}": format "${N}" does not define "compare" function`);
        const I = c.scopeValue("formats", {
          key: N,
          ref: R,
          code: _.code.formats ? r._`${_.code.formats}${r.getProperty(N)}` : void 0
        });
        l.fail$data(w(I));
      }
      function w(N) {
        return r._`${N}.compare(${d}, ${u}) ${s[m].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const i = (l) => (l.addKeyword(e.formatLimitDefinition), l);
  e.default = i;
})(hu);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = fu, n = hu, s = Z, o = new s.Name("fullFormats"), i = new s.Name("fastFormats"), l = (d, u = { keywords: !0 }) => {
    if (Array.isArray(u))
      return c(d, u, r.fullFormats, o), d;
    const [m, P] = u.mode === "fast" ? [r.fastFormats, i] : [r.fullFormats, o], _ = u.formats || r.formatNames;
    return c(d, _, m, P), u.keywords && n.default(d), d;
  };
  l.get = (d, u = "full") => {
    const P = (u === "fast" ? r.fastFormats : r.fullFormats)[d];
    if (!P)
      throw new Error(`Unknown format "${d}"`);
    return P;
  };
  function c(d, u, m, P) {
    var _, E;
    (_ = (E = d.opts.code).formats) !== null && _ !== void 0 || (E.formats = s._`require("ajv-formats/dist/formats").${P}`);
    for (const g of u)
      d.addFormat(g, m[g]);
  }
  e.exports = t = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
})(to, to.exports);
var lv = to.exports;
const uv = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const s = Object.getOwnPropertyDescriptor(e, r), o = Object.getOwnPropertyDescriptor(t, r);
  !dv(s, o) && n || Object.defineProperty(e, r, o);
}, dv = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, fv = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, hv = (e, t) => `/* Wrapped ${e}*/
${t}`, mv = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), pv = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), $v = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, s = hv.bind(null, n, t.toString());
  Object.defineProperty(s, "name", pv), Object.defineProperty(e, "toString", { ...mv, value: s });
}, yv = (e, t, { ignoreNonConfigurable: r = !1 } = {}) => {
  const { name: n } = e;
  for (const s of Reflect.ownKeys(t))
    uv(e, t, s, r);
  return fv(e, t), $v(e, t, n), e;
};
var _v = yv;
const gv = _v;
var vv = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: r = 0,
    before: n = !1,
    after: s = !0
  } = t;
  if (!n && !s)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let o, i;
  const l = function(...c) {
    const d = this, u = () => {
      o = void 0, s && (i = e.apply(d, c));
    }, m = n && !o;
    return clearTimeout(o), o = setTimeout(u, r), m && (i = e.apply(d, c)), i;
  };
  return gv(l, e), l.cancel = () => {
    o && (clearTimeout(o), o = void 0);
  }, l;
}, uo = { exports: {} };
const wv = "2.0.0", td = 256, Ev = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, Sv = 16, bv = td - 6, Pv = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Ss = {
  MAX_LENGTH: td,
  MAX_SAFE_COMPONENT_LENGTH: Sv,
  MAX_SAFE_BUILD_LENGTH: bv,
  MAX_SAFE_INTEGER: Ev,
  RELEASE_TYPES: Pv,
  SEMVER_SPEC_VERSION: wv,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const Nv = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var bs = Nv;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: s
  } = Ss, o = bs;
  t = e.exports = {};
  const i = t.re = [], l = t.safeRe = [], c = t.src = [], d = t.safeSrc = [], u = t.t = {};
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
    o(y, R, h), u[y] = R, c[R] = h, d[R] = N, i[R] = new RegExp(h, w ? "g" : void 0), l[R] = new RegExp(N, w ? "g" : void 0);
  };
  g("NUMERICIDENTIFIER", "0|[1-9]\\d*"), g("NUMERICIDENTIFIERLOOSE", "\\d+"), g("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${P}*`), g("MAINVERSION", `(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})`), g("MAINVERSIONLOOSE", `(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASEIDENTIFIER", `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIER]})`), g("PRERELEASEIDENTIFIERLOOSE", `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASE", `(?:-(${c[u.PRERELEASEIDENTIFIER]}(?:\\.${c[u.PRERELEASEIDENTIFIER]})*))`), g("PRERELEASELOOSE", `(?:-?(${c[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[u.PRERELEASEIDENTIFIERLOOSE]})*))`), g("BUILDIDENTIFIER", `${P}+`), g("BUILD", `(?:\\+(${c[u.BUILDIDENTIFIER]}(?:\\.${c[u.BUILDIDENTIFIER]})*))`), g("FULLPLAIN", `v?${c[u.MAINVERSION]}${c[u.PRERELEASE]}?${c[u.BUILD]}?`), g("FULL", `^${c[u.FULLPLAIN]}$`), g("LOOSEPLAIN", `[v=\\s]*${c[u.MAINVERSIONLOOSE]}${c[u.PRERELEASELOOSE]}?${c[u.BUILD]}?`), g("LOOSE", `^${c[u.LOOSEPLAIN]}$`), g("GTLT", "((?:<|>)?=?)"), g("XRANGEIDENTIFIERLOOSE", `${c[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), g("XRANGEIDENTIFIER", `${c[u.NUMERICIDENTIFIER]}|x|X|\\*`), g("XRANGEPLAIN", `[v=\\s]*(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:${c[u.PRERELEASE]})?${c[u.BUILD]}?)?)?`), g("XRANGEPLAINLOOSE", `[v=\\s]*(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:${c[u.PRERELEASELOOSE]})?${c[u.BUILD]}?)?)?`), g("XRANGE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAIN]}$`), g("XRANGELOOSE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAINLOOSE]}$`), g("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), g("COERCE", `${c[u.COERCEPLAIN]}(?:$|[^\\d])`), g("COERCEFULL", c[u.COERCEPLAIN] + `(?:${c[u.PRERELEASE]})?(?:${c[u.BUILD]})?(?:$|[^\\d])`), g("COERCERTL", c[u.COERCE], !0), g("COERCERTLFULL", c[u.COERCEFULL], !0), g("LONETILDE", "(?:~>?)"), g("TILDETRIM", `(\\s*)${c[u.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", g("TILDE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAIN]}$`), g("TILDELOOSE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAINLOOSE]}$`), g("LONECARET", "(?:\\^)"), g("CARETTRIM", `(\\s*)${c[u.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", g("CARET", `^${c[u.LONECARET]}${c[u.XRANGEPLAIN]}$`), g("CARETLOOSE", `^${c[u.LONECARET]}${c[u.XRANGEPLAINLOOSE]}$`), g("COMPARATORLOOSE", `^${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]})$|^$`), g("COMPARATOR", `^${c[u.GTLT]}\\s*(${c[u.FULLPLAIN]})$|^$`), g("COMPARATORTRIM", `(\\s*)${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]}|${c[u.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", g("HYPHENRANGE", `^\\s*(${c[u.XRANGEPLAIN]})\\s+-\\s+(${c[u.XRANGEPLAIN]})\\s*$`), g("HYPHENRANGELOOSE", `^\\s*(${c[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[u.XRANGEPLAINLOOSE]})\\s*$`), g("STAR", "(<|>)?=?\\s*\\*"), g("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), g("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(uo, uo.exports);
var _n = uo.exports;
const Ov = Object.freeze({ loose: !0 }), Rv = Object.freeze({}), Tv = (e) => e ? typeof e != "object" ? Ov : e : Rv;
var ci = Tv;
const dc = /^[0-9]+$/, rd = (e, t) => {
  const r = dc.test(e), n = dc.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, Iv = (e, t) => rd(t, e);
var nd = {
  compareIdentifiers: rd,
  rcompareIdentifiers: Iv
};
const kn = bs, { MAX_LENGTH: fc, MAX_SAFE_INTEGER: Cn } = Ss, { safeRe: Dn, t: Mn } = _n, jv = ci, { compareIdentifiers: yr } = nd;
let Av = class ft {
  constructor(t, r) {
    if (r = jv(r), t instanceof ft) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > fc)
      throw new TypeError(
        `version is longer than ${fc} characters`
      );
    kn("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? Dn[Mn.LOOSE] : Dn[Mn.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > Cn || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Cn || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Cn || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((s) => {
      if (/^[0-9]+$/.test(s)) {
        const o = +s;
        if (o >= 0 && o < Cn)
          return o;
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
    if (kn("SemVer.compare", this.version, this.options, t), !(t instanceof ft)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new ft(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof ft || (t = new ft(t, this.options)), yr(this.major, t.major) || yr(this.minor, t.minor) || yr(this.patch, t.patch);
  }
  comparePre(t) {
    if (t instanceof ft || (t = new ft(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], s = t.prerelease[r];
      if (kn("prerelease compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return yr(n, s);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof ft || (t = new ft(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], s = t.build[r];
      if (kn("build compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return yr(n, s);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const s = `-${r}`.match(this.options.loose ? Dn[Mn.PRERELEASELOOSE] : Dn[Mn.PRERELEASE]);
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
          let o = this.prerelease.length;
          for (; --o >= 0; )
            typeof this.prerelease[o] == "number" && (this.prerelease[o]++, o = -2);
          if (o === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(s);
          }
        }
        if (r) {
          let o = [r, s];
          n === !1 && (o = [r]), yr(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = o) : this.prerelease = o;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Fe = Av;
const hc = Fe, kv = (e, t, r = !1) => {
  if (e instanceof hc)
    return e;
  try {
    return new hc(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var zr = kv;
const Cv = zr, Dv = (e, t) => {
  const r = Cv(e, t);
  return r ? r.version : null;
};
var Mv = Dv;
const Lv = zr, Fv = (e, t) => {
  const r = Lv(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var Vv = Fv;
const mc = Fe, Uv = (e, t, r, n, s) => {
  typeof r == "string" && (s = n, n = r, r = void 0);
  try {
    return new mc(
      e instanceof mc ? e.version : e,
      r
    ).inc(t, n, s).version;
  } catch {
    return null;
  }
};
var zv = Uv;
const pc = zr, qv = (e, t) => {
  const r = pc(e, null, !0), n = pc(t, null, !0), s = r.compare(n);
  if (s === 0)
    return null;
  const o = s > 0, i = o ? r : n, l = o ? n : r, c = !!i.prerelease.length;
  if (!!l.prerelease.length && !c) {
    if (!l.patch && !l.minor)
      return "major";
    if (l.compareMain(i) === 0)
      return l.minor && !l.patch ? "minor" : "patch";
  }
  const u = c ? "pre" : "";
  return r.major !== n.major ? u + "major" : r.minor !== n.minor ? u + "minor" : r.patch !== n.patch ? u + "patch" : "prerelease";
};
var Kv = qv;
const Gv = Fe, Hv = (e, t) => new Gv(e, t).major;
var Wv = Hv;
const Jv = Fe, Bv = (e, t) => new Jv(e, t).minor;
var Xv = Bv;
const Yv = Fe, Qv = (e, t) => new Yv(e, t).patch;
var Zv = Qv;
const xv = zr, ew = (e, t) => {
  const r = xv(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var tw = ew;
const $c = Fe, rw = (e, t, r) => new $c(e, r).compare(new $c(t, r));
var ut = rw;
const nw = ut, sw = (e, t, r) => nw(t, e, r);
var ow = sw;
const aw = ut, iw = (e, t) => aw(e, t, !0);
var cw = iw;
const yc = Fe, lw = (e, t, r) => {
  const n = new yc(e, r), s = new yc(t, r);
  return n.compare(s) || n.compareBuild(s);
};
var li = lw;
const uw = li, dw = (e, t) => e.sort((r, n) => uw(r, n, t));
var fw = dw;
const hw = li, mw = (e, t) => e.sort((r, n) => hw(n, r, t));
var pw = mw;
const $w = ut, yw = (e, t, r) => $w(e, t, r) > 0;
var Ps = yw;
const _w = ut, gw = (e, t, r) => _w(e, t, r) < 0;
var ui = gw;
const vw = ut, ww = (e, t, r) => vw(e, t, r) === 0;
var sd = ww;
const Ew = ut, Sw = (e, t, r) => Ew(e, t, r) !== 0;
var od = Sw;
const bw = ut, Pw = (e, t, r) => bw(e, t, r) >= 0;
var di = Pw;
const Nw = ut, Ow = (e, t, r) => Nw(e, t, r) <= 0;
var fi = Ow;
const Rw = sd, Tw = od, Iw = Ps, jw = di, Aw = ui, kw = fi, Cw = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return Rw(e, r, n);
    case "!=":
      return Tw(e, r, n);
    case ">":
      return Iw(e, r, n);
    case ">=":
      return jw(e, r, n);
    case "<":
      return Aw(e, r, n);
    case "<=":
      return kw(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var ad = Cw;
const Dw = Fe, Mw = zr, { safeRe: Ln, t: Fn } = _n, Lw = (e, t) => {
  if (e instanceof Dw)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? Ln[Fn.COERCEFULL] : Ln[Fn.COERCE]);
  else {
    const c = t.includePrerelease ? Ln[Fn.COERCERTLFULL] : Ln[Fn.COERCERTL];
    let d;
    for (; (d = c.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || d.index + d[0].length !== r.index + r[0].length) && (r = d), c.lastIndex = d.index + d[1].length + d[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], s = r[3] || "0", o = r[4] || "0", i = t.includePrerelease && r[5] ? `-${r[5]}` : "", l = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return Mw(`${n}.${s}.${o}${i}${l}`, t);
};
var Fw = Lw;
class Vw {
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
var Uw = Vw, Us, _c;
function dt() {
  if (_c) return Us;
  _c = 1;
  const e = /\s+/g;
  class t {
    constructor(k, U) {
      if (U = s(U), k instanceof t)
        return k.loose === !!U.loose && k.includePrerelease === !!U.includePrerelease ? k : new t(k.raw, U);
      if (k instanceof o)
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
      const T = this.options.loose, v = T ? c[d.HYPHENRANGELOOSE] : c[d.HYPHENRANGE];
      k = k.replace(v, Q(this.options.includePrerelease)), i("hyphen replace", k), k = k.replace(c[d.COMPARATORTRIM], u), i("comparator trim", k), k = k.replace(c[d.TILDETRIM], m), i("tilde trim", k), k = k.replace(c[d.CARETTRIM], P), i("caret trim", k);
      let p = k.split(" ").map((f) => w(f, this.options)).join(" ").split(/\s+/).map((f) => ne(f, this.options));
      T && (p = p.filter((f) => (i("loose invalid filter", f, this.options), !!f.match(c[d.COMPARATORLOOSE])))), i("range list", p);
      const S = /* @__PURE__ */ new Map(), $ = p.map((f) => new o(f, this.options));
      for (const f of $) {
        if (g(f))
          return [f];
        S.set(f.value, f);
      }
      S.size > 1 && S.has("") && S.delete("");
      const a = [...S.values()];
      return n.set(D, a), a;
    }
    intersects(k, U) {
      if (!(k instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((D) => h(D, U) && k.set.some((O) => h(O, U) && D.every((T) => O.every((v) => T.intersects(v, U)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(k) {
      if (!k)
        return !1;
      if (typeof k == "string")
        try {
          k = new l(k, this.options);
        } catch {
          return !1;
        }
      for (let U = 0; U < this.set.length; U++)
        if (fe(this.set[U], k, this.options))
          return !0;
      return !1;
    }
  }
  Us = t;
  const r = Uw, n = new r(), s = ci, o = Ns(), i = bs, l = Fe, {
    safeRe: c,
    t: d,
    comparatorTrimReplace: u,
    tildeTrimReplace: m,
    caretTrimReplace: P
  } = _n, { FLAG_INCLUDE_PRERELEASE: _, FLAG_LOOSE: E } = Ss, g = (C) => C.value === "<0.0.0-0", y = (C) => C.value === "", h = (C, k) => {
    let U = !0;
    const D = C.slice();
    let O = D.pop();
    for (; U && D.length; )
      U = D.every((T) => O.intersects(T, k)), O = D.pop();
    return U;
  }, w = (C, k) => (i("comp", C, k), C = z(C, k), i("caret", C), C = R(C, k), i("tildes", C), C = de(C, k), i("xrange", C), C = H(C, k), i("stars", C), C), N = (C) => !C || C.toLowerCase() === "x" || C === "*", R = (C, k) => C.trim().split(/\s+/).map((U) => I(U, k)).join(" "), I = (C, k) => {
    const U = k.loose ? c[d.TILDELOOSE] : c[d.TILDE];
    return C.replace(U, (D, O, T, v, p) => {
      i("tilde", C, D, O, T, v, p);
      let S;
      return N(O) ? S = "" : N(T) ? S = `>=${O}.0.0 <${+O + 1}.0.0-0` : N(v) ? S = `>=${O}.${T}.0 <${O}.${+T + 1}.0-0` : p ? (i("replaceTilde pr", p), S = `>=${O}.${T}.${v}-${p} <${O}.${+T + 1}.0-0`) : S = `>=${O}.${T}.${v} <${O}.${+T + 1}.0-0`, i("tilde return", S), S;
    });
  }, z = (C, k) => C.trim().split(/\s+/).map((U) => W(U, k)).join(" "), W = (C, k) => {
    i("caret", C, k);
    const U = k.loose ? c[d.CARETLOOSE] : c[d.CARET], D = k.includePrerelease ? "-0" : "";
    return C.replace(U, (O, T, v, p, S) => {
      i("caret", C, O, T, v, p, S);
      let $;
      return N(T) ? $ = "" : N(v) ? $ = `>=${T}.0.0${D} <${+T + 1}.0.0-0` : N(p) ? T === "0" ? $ = `>=${T}.${v}.0${D} <${T}.${+v + 1}.0-0` : $ = `>=${T}.${v}.0${D} <${+T + 1}.0.0-0` : S ? (i("replaceCaret pr", S), T === "0" ? v === "0" ? $ = `>=${T}.${v}.${p}-${S} <${T}.${v}.${+p + 1}-0` : $ = `>=${T}.${v}.${p}-${S} <${T}.${+v + 1}.0-0` : $ = `>=${T}.${v}.${p}-${S} <${+T + 1}.0.0-0`) : (i("no pr"), T === "0" ? v === "0" ? $ = `>=${T}.${v}.${p}${D} <${T}.${v}.${+p + 1}-0` : $ = `>=${T}.${v}.${p}${D} <${T}.${+v + 1}.0-0` : $ = `>=${T}.${v}.${p} <${+T + 1}.0.0-0`), i("caret return", $), $;
    });
  }, de = (C, k) => (i("replaceXRanges", C, k), C.split(/\s+/).map((U) => V(U, k)).join(" ")), V = (C, k) => {
    C = C.trim();
    const U = k.loose ? c[d.XRANGELOOSE] : c[d.XRANGE];
    return C.replace(U, (D, O, T, v, p, S) => {
      i("xRange", C, D, O, T, v, p, S);
      const $ = N(T), a = $ || N(v), f = a || N(p), b = f;
      return O === "=" && b && (O = ""), S = k.includePrerelease ? "-0" : "", $ ? O === ">" || O === "<" ? D = "<0.0.0-0" : D = "*" : O && b ? (a && (v = 0), p = 0, O === ">" ? (O = ">=", a ? (T = +T + 1, v = 0, p = 0) : (v = +v + 1, p = 0)) : O === "<=" && (O = "<", a ? T = +T + 1 : v = +v + 1), O === "<" && (S = "-0"), D = `${O + T}.${v}.${p}${S}`) : a ? D = `>=${T}.0.0${S} <${+T + 1}.0.0-0` : f && (D = `>=${T}.${v}.0${S} <${T}.${+v + 1}.0-0`), i("xRange return", D), D;
    });
  }, H = (C, k) => (i("replaceStars", C, k), C.trim().replace(c[d.STAR], "")), ne = (C, k) => (i("replaceGTE0", C, k), C.trim().replace(c[k.includePrerelease ? d.GTE0PRE : d.GTE0], "")), Q = (C) => (k, U, D, O, T, v, p, S, $, a, f, b) => (N(D) ? U = "" : N(O) ? U = `>=${D}.0.0${C ? "-0" : ""}` : N(T) ? U = `>=${D}.${O}.0${C ? "-0" : ""}` : v ? U = `>=${U}` : U = `>=${U}${C ? "-0" : ""}`, N($) ? S = "" : N(a) ? S = `<${+$ + 1}.0.0-0` : N(f) ? S = `<${$}.${+a + 1}.0-0` : b ? S = `<=${$}.${a}.${f}-${b}` : C ? S = `<${$}.${a}.${+f + 1}-0` : S = `<=${S}`, `${U} ${S}`.trim()), fe = (C, k, U) => {
    for (let D = 0; D < C.length; D++)
      if (!C[D].test(k))
        return !1;
    if (k.prerelease.length && !U.includePrerelease) {
      for (let D = 0; D < C.length; D++)
        if (i(C[D].semver), C[D].semver !== o.ANY && C[D].semver.prerelease.length > 0) {
          const O = C[D].semver;
          if (O.major === k.major && O.minor === k.minor && O.patch === k.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Us;
}
var zs, gc;
function Ns() {
  if (gc) return zs;
  gc = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(u, m) {
      if (m = r(m), u instanceof t) {
        if (u.loose === !!m.loose)
          return u;
        u = u.value;
      }
      u = u.trim().split(/\s+/).join(" "), i("comparator", u, m), this.options = m, this.loose = !!m.loose, this.parse(u), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, i("comp", this);
    }
    parse(u) {
      const m = this.options.loose ? n[s.COMPARATORLOOSE] : n[s.COMPARATOR], P = u.match(m);
      if (!P)
        throw new TypeError(`Invalid comparator: ${u}`);
      this.operator = P[1] !== void 0 ? P[1] : "", this.operator === "=" && (this.operator = ""), P[2] ? this.semver = new l(P[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(u) {
      if (i("Comparator.test", u, this.options.loose), this.semver === e || u === e)
        return !0;
      if (typeof u == "string")
        try {
          u = new l(u, this.options);
        } catch {
          return !1;
        }
      return o(u, this.operator, this.semver, this.options);
    }
    intersects(u, m) {
      if (!(u instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(u.value, m).test(this.value) : u.operator === "" ? u.value === "" ? !0 : new c(this.value, m).test(u.semver) : (m = r(m), m.includePrerelease && (this.value === "<0.0.0-0" || u.value === "<0.0.0-0") || !m.includePrerelease && (this.value.startsWith("<0.0.0") || u.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && u.operator.startsWith(">") || this.operator.startsWith("<") && u.operator.startsWith("<") || this.semver.version === u.semver.version && this.operator.includes("=") && u.operator.includes("=") || o(this.semver, "<", u.semver, m) && this.operator.startsWith(">") && u.operator.startsWith("<") || o(this.semver, ">", u.semver, m) && this.operator.startsWith("<") && u.operator.startsWith(">")));
    }
  }
  zs = t;
  const r = ci, { safeRe: n, t: s } = _n, o = ad, i = bs, l = Fe, c = dt();
  return zs;
}
const zw = dt(), qw = (e, t, r) => {
  try {
    t = new zw(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var Os = qw;
const Kw = dt(), Gw = (e, t) => new Kw(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var Hw = Gw;
const Ww = Fe, Jw = dt(), Bw = (e, t, r) => {
  let n = null, s = null, o = null;
  try {
    o = new Jw(t, r);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    o.test(i) && (!n || s.compare(i) === -1) && (n = i, s = new Ww(n, r));
  }), n;
};
var Xw = Bw;
const Yw = Fe, Qw = dt(), Zw = (e, t, r) => {
  let n = null, s = null, o = null;
  try {
    o = new Qw(t, r);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    o.test(i) && (!n || s.compare(i) === 1) && (n = i, s = new Yw(n, r));
  }), n;
};
var xw = Zw;
const qs = Fe, eE = dt(), vc = Ps, tE = (e, t) => {
  e = new eE(e, t);
  let r = new qs("0.0.0");
  if (e.test(r) || (r = new qs("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const s = e.set[n];
    let o = null;
    s.forEach((i) => {
      const l = new qs(i.semver.version);
      switch (i.operator) {
        case ">":
          l.prerelease.length === 0 ? l.patch++ : l.prerelease.push(0), l.raw = l.format();
        case "":
        case ">=":
          (!o || vc(l, o)) && (o = l);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${i.operator}`);
      }
    }), o && (!r || vc(r, o)) && (r = o);
  }
  return r && e.test(r) ? r : null;
};
var rE = tE;
const nE = dt(), sE = (e, t) => {
  try {
    return new nE(e, t).range || "*";
  } catch {
    return null;
  }
};
var oE = sE;
const aE = Fe, id = Ns(), { ANY: iE } = id, cE = dt(), lE = Os, wc = Ps, Ec = ui, uE = fi, dE = di, fE = (e, t, r, n) => {
  e = new aE(e, n), t = new cE(t, n);
  let s, o, i, l, c;
  switch (r) {
    case ">":
      s = wc, o = uE, i = Ec, l = ">", c = ">=";
      break;
    case "<":
      s = Ec, o = dE, i = wc, l = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (lE(e, t, n))
    return !1;
  for (let d = 0; d < t.set.length; ++d) {
    const u = t.set[d];
    let m = null, P = null;
    if (u.forEach((_) => {
      _.semver === iE && (_ = new id(">=0.0.0")), m = m || _, P = P || _, s(_.semver, m.semver, n) ? m = _ : i(_.semver, P.semver, n) && (P = _);
    }), m.operator === l || m.operator === c || (!P.operator || P.operator === l) && o(e, P.semver))
      return !1;
    if (P.operator === c && i(e, P.semver))
      return !1;
  }
  return !0;
};
var hi = fE;
const hE = hi, mE = (e, t, r) => hE(e, t, ">", r);
var pE = mE;
const $E = hi, yE = (e, t, r) => $E(e, t, "<", r);
var _E = yE;
const Sc = dt(), gE = (e, t, r) => (e = new Sc(e, r), t = new Sc(t, r), e.intersects(t, r));
var vE = gE;
const wE = Os, EE = ut;
var SE = (e, t, r) => {
  const n = [];
  let s = null, o = null;
  const i = e.sort((u, m) => EE(u, m, r));
  for (const u of i)
    wE(u, t, r) ? (o = u, s || (s = u)) : (o && n.push([s, o]), o = null, s = null);
  s && n.push([s, null]);
  const l = [];
  for (const [u, m] of n)
    u === m ? l.push(u) : !m && u === i[0] ? l.push("*") : m ? u === i[0] ? l.push(`<=${m}`) : l.push(`${u} - ${m}`) : l.push(`>=${u}`);
  const c = l.join(" || "), d = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < d.length ? c : t;
};
const bc = dt(), mi = Ns(), { ANY: Ks } = mi, Br = Os, pi = ut, bE = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new bc(e, r), t = new bc(t, r);
  let n = !1;
  e: for (const s of e.set) {
    for (const o of t.set) {
      const i = NE(s, o, r);
      if (n = n || i !== null, i)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, PE = [new mi(">=0.0.0-0")], Pc = [new mi(">=0.0.0")], NE = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Ks) {
    if (t.length === 1 && t[0].semver === Ks)
      return !0;
    r.includePrerelease ? e = PE : e = Pc;
  }
  if (t.length === 1 && t[0].semver === Ks) {
    if (r.includePrerelease)
      return !0;
    t = Pc;
  }
  const n = /* @__PURE__ */ new Set();
  let s, o;
  for (const _ of e)
    _.operator === ">" || _.operator === ">=" ? s = Nc(s, _, r) : _.operator === "<" || _.operator === "<=" ? o = Oc(o, _, r) : n.add(_.semver);
  if (n.size > 1)
    return null;
  let i;
  if (s && o) {
    if (i = pi(s.semver, o.semver, r), i > 0)
      return null;
    if (i === 0 && (s.operator !== ">=" || o.operator !== "<="))
      return null;
  }
  for (const _ of n) {
    if (s && !Br(_, String(s), r) || o && !Br(_, String(o), r))
      return null;
    for (const E of t)
      if (!Br(_, String(E), r))
        return !1;
    return !0;
  }
  let l, c, d, u, m = o && !r.includePrerelease && o.semver.prerelease.length ? o.semver : !1, P = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
  m && m.prerelease.length === 1 && o.operator === "<" && m.prerelease[0] === 0 && (m = !1);
  for (const _ of t) {
    if (u = u || _.operator === ">" || _.operator === ">=", d = d || _.operator === "<" || _.operator === "<=", s) {
      if (P && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === P.major && _.semver.minor === P.minor && _.semver.patch === P.patch && (P = !1), _.operator === ">" || _.operator === ">=") {
        if (l = Nc(s, _, r), l === _ && l !== s)
          return !1;
      } else if (s.operator === ">=" && !Br(s.semver, String(_), r))
        return !1;
    }
    if (o) {
      if (m && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === m.major && _.semver.minor === m.minor && _.semver.patch === m.patch && (m = !1), _.operator === "<" || _.operator === "<=") {
        if (c = Oc(o, _, r), c === _ && c !== o)
          return !1;
      } else if (o.operator === "<=" && !Br(o.semver, String(_), r))
        return !1;
    }
    if (!_.operator && (o || s) && i !== 0)
      return !1;
  }
  return !(s && d && !o && i !== 0 || o && u && !s && i !== 0 || P || m);
}, Nc = (e, t, r) => {
  if (!e)
    return t;
  const n = pi(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Oc = (e, t, r) => {
  if (!e)
    return t;
  const n = pi(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var OE = bE;
const Gs = _n, Rc = Ss, RE = Fe, Tc = nd, TE = zr, IE = Mv, jE = Vv, AE = zv, kE = Kv, CE = Wv, DE = Xv, ME = Zv, LE = tw, FE = ut, VE = ow, UE = cw, zE = li, qE = fw, KE = pw, GE = Ps, HE = ui, WE = sd, JE = od, BE = di, XE = fi, YE = ad, QE = Fw, ZE = Ns(), xE = dt(), eS = Os, tS = Hw, rS = Xw, nS = xw, sS = rE, oS = oE, aS = hi, iS = pE, cS = _E, lS = vE, uS = SE, dS = OE;
var fS = {
  parse: TE,
  valid: IE,
  clean: jE,
  inc: AE,
  diff: kE,
  major: CE,
  minor: DE,
  patch: ME,
  prerelease: LE,
  compare: FE,
  rcompare: VE,
  compareLoose: UE,
  compareBuild: zE,
  sort: qE,
  rsort: KE,
  gt: GE,
  lt: HE,
  eq: WE,
  neq: JE,
  gte: BE,
  lte: XE,
  cmp: YE,
  coerce: QE,
  Comparator: ZE,
  Range: xE,
  satisfies: eS,
  toComparators: tS,
  maxSatisfying: rS,
  minSatisfying: nS,
  minVersion: sS,
  validRange: oS,
  outside: aS,
  gtr: iS,
  ltr: cS,
  intersects: lS,
  simplifyRange: uS,
  subset: dS,
  SemVer: RE,
  re: Gs.re,
  src: Gs.src,
  tokens: Gs.t,
  SEMVER_SPEC_VERSION: Rc.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: Rc.RELEASE_TYPES,
  compareIdentifiers: Tc.compareIdentifiers,
  rcompareIdentifiers: Tc.rcompareIdentifiers
}, Rs = { exports: {} }, $i = { exports: {} };
const cd = (e, t) => {
  for (const r of Reflect.ownKeys(t))
    Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
  return e;
};
$i.exports = cd;
$i.exports.default = cd;
var hS = $i.exports;
const mS = hS, cs = /* @__PURE__ */ new WeakMap(), ld = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let r, n = 0;
  const s = e.displayName || e.name || "<anonymous>", o = function(...i) {
    if (cs.set(o, ++n), n === 1)
      r = e.apply(this, i), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${s}\` can only be called once`);
    return r;
  };
  return mS(o, e), cs.set(o, n), o;
};
Rs.exports = ld;
Rs.exports.default = ld;
Rs.exports.callCount = (e) => {
  if (!cs.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return cs.get(e);
};
var pS = Rs.exports;
(function(e, t) {
  var r = gn && gn.__classPrivateFieldSet || function(D, O, T, v, p) {
    if (v === "m") throw new TypeError("Private method is not writable");
    if (v === "a" && !p) throw new TypeError("Private accessor was defined without a setter");
    if (typeof O == "function" ? D !== O || !p : !O.has(D)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return v === "a" ? p.call(D, T) : p ? p.value = T : O.set(D, T), T;
  }, n = gn && gn.__classPrivateFieldGet || function(D, O, T, v) {
    if (T === "a" && !v) throw new TypeError("Private accessor was defined without a getter");
    if (typeof O == "function" ? D !== O || !v : !O.has(D)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return T === "m" ? v : T === "a" ? v.call(D) : v ? v.value : O.get(D);
  }, s, o, i, l, c, d;
  Object.defineProperty(t, "__esModule", { value: !0 });
  const u = zc, m = ho, P = Be, _ = $d, E = yd, g = _d, y = Pd, h = Md, w = Ud, N = pt, R = Q$, I = lv, z = vv, W = fS, de = pS, V = "aes-256-cbc", H = () => /* @__PURE__ */ Object.create(null), ne = (D) => D != null;
  let Q = "";
  try {
    delete require.cache[__filename], Q = P.dirname((o = (s = e.parent) === null || s === void 0 ? void 0 : s.filename) !== null && o !== void 0 ? o : ".");
  } catch {
  }
  const fe = (D, O) => {
    const T = /* @__PURE__ */ new Set([
      "undefined",
      "symbol",
      "function"
    ]), v = typeof O;
    if (T.has(v))
      throw new TypeError(`Setting a value of type \`${v}\` for key \`${D}\` is not allowed as it's not supported by JSON`);
  }, C = "__internal__", k = `${C}.migrations.version`;
  class U {
    constructor(O = {}) {
      var T;
      i.set(this, void 0), l.set(this, void 0), c.set(this, void 0), d.set(this, {}), this._deserialize = (f) => JSON.parse(f), this._serialize = (f) => JSON.stringify(f, void 0, "	");
      const v = {
        configName: "config",
        fileExtension: "json",
        projectSuffix: "nodejs",
        clearInvalidConfig: !1,
        accessPropertiesByDotNotation: !0,
        configFileMode: 438,
        ...O
      }, p = de(() => {
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
        (0, I.default)(f);
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
      }, "f"), v.serialize && (this._serialize = v.serialize), v.deserialize && (this._deserialize = v.deserialize), this.events = new g.EventEmitter(), r(this, l, v.encryptionKey, "f");
      const S = v.fileExtension ? `.${v.fileExtension}` : "";
      this.path = P.resolve(v.cwd, `${(T = v.configName) !== null && T !== void 0 ? T : "config"}${S}`);
      const $ = this.store, a = Object.assign(H(), v.defaults, $);
      this._validate(a);
      try {
        E.deepEqual($, a);
      } catch {
        this.store = a;
      }
      if (v.watch && this._watch(), v.migrations) {
        if (v.projectVersion || (v.projectVersion = p().version), !v.projectVersion)
          throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
        this._migrate(v.migrations, v.projectVersion, v.beforeEachMigration);
      }
    }
    get(O, T) {
      if (n(this, c, "f").accessPropertiesByDotNotation)
        return this._get(O, T);
      const { store: v } = this;
      return O in v ? v[O] : T;
    }
    set(O, T) {
      if (typeof O != "string" && typeof O != "object")
        throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof O}`);
      if (typeof O != "object" && T === void 0)
        throw new TypeError("Use `delete()` to clear values");
      if (this._containsReservedKey(O))
        throw new TypeError(`Please don't use the ${C} key, as it's used to manage this module internal operations.`);
      const { store: v } = this, p = (S, $) => {
        fe(S, $), n(this, c, "f").accessPropertiesByDotNotation ? y.set(v, S, $) : v[S] = $;
      };
      if (typeof O == "object") {
        const S = O;
        for (const [$, a] of Object.entries(S))
          p($, a);
      } else
        p(O, T);
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
      for (const T of O)
        ne(n(this, d, "f")[T]) && this.set(T, n(this, d, "f")[T]);
    }
    /**
        Delete an item.
    
        @param key - The key of the item to delete.
        */
    delete(O) {
      const { store: T } = this;
      n(this, c, "f").accessPropertiesByDotNotation ? y.delete(T, O) : delete T[O], this.store = T;
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
    onDidChange(O, T) {
      if (typeof O != "string")
        throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof O}`);
      if (typeof T != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof T}`);
      return this._handleChange(() => this.get(O), T);
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
        const O = m.readFileSync(this.path, n(this, l, "f") ? null : "utf8"), T = this._encryptData(O), v = this._deserialize(T);
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
    *[(i = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
      for (const [O, T] of Object.entries(this.store))
        yield [O, T];
    }
    _encryptData(O) {
      if (!n(this, l, "f"))
        return O.toString();
      try {
        if (n(this, l, "f"))
          try {
            if (O.slice(16, 17).toString() === ":") {
              const T = O.slice(0, 16), v = _.pbkdf2Sync(n(this, l, "f"), T.toString(), 1e4, 32, "sha512"), p = _.createDecipheriv(V, v, T);
              O = Buffer.concat([p.update(Buffer.from(O.slice(17))), p.final()]).toString("utf8");
            } else {
              const T = _.createDecipher(V, n(this, l, "f"));
              O = Buffer.concat([T.update(Buffer.from(O)), T.final()]).toString("utf8");
            }
          } catch {
          }
      } catch {
      }
      return O.toString();
    }
    _handleChange(O, T) {
      let v = O();
      const p = () => {
        const S = v, $ = O();
        (0, u.isDeepStrictEqual)($, S) || (v = $, T.call(this, $, S));
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
      let T = this._serialize(O);
      if (n(this, l, "f")) {
        const v = _.randomBytes(16), p = _.pbkdf2Sync(n(this, l, "f"), v.toString(), 1e4, 32, "sha512"), S = _.createCipheriv(V, p, v);
        T = Buffer.concat([v, Buffer.from(":"), S.update(Buffer.from(T)), S.final()]);
      }
      if (process.env.SNAP)
        m.writeFileSync(this.path, T, { mode: n(this, c, "f").configFileMode });
      else
        try {
          N.writeFileSync(this.path, T, { mode: n(this, c, "f").configFileMode });
        } catch (v) {
          if ((v == null ? void 0 : v.code) === "EXDEV") {
            m.writeFileSync(this.path, T, { mode: n(this, c, "f").configFileMode });
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
    _migrate(O, T, v) {
      let p = this._get(k, "0.0.0");
      const S = Object.keys(O).filter((a) => this._shouldPerformMigration(a, p, T));
      let $ = { ...this.store };
      for (const a of S)
        try {
          v && v(this, {
            fromVersion: p,
            toVersion: a,
            finalVersion: T,
            versions: S
          });
          const f = O[a];
          f(this), this._set(k, a), p = a, $ = { ...this.store };
        } catch (f) {
          throw this.store = $, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${f}`);
        }
      (this._isVersionInRangeFormat(p) || !W.eq(p, T)) && this._set(k, T);
    }
    _containsReservedKey(O) {
      return typeof O == "object" && Object.keys(O)[0] === C ? !0 : typeof O != "string" ? !1 : n(this, c, "f").accessPropertiesByDotNotation ? !!O.startsWith(`${C}.`) : !1;
    }
    _isVersionInRangeFormat(O) {
      return W.clean(O) === null;
    }
    _shouldPerformMigration(O, T, v) {
      return this._isVersionInRangeFormat(O) ? T !== "0.0.0" && W.satisfies(T, O) ? !1 : W.satisfies(v, O) : !(W.lte(O, T) || W.gt(O, v));
    }
    _get(O, T) {
      return y.get(this.store, O, T);
    }
    _set(O, T) {
      const { store: v } = this;
      y.set(v, O, T), this.store = v;
    }
  }
  t.default = U, e.exports = U, e.exports.default = U;
})(Hs, Hs.exports);
var $S = Hs.exports;
const Ic = Be, { app: Xn, ipcMain: fo, ipcRenderer: jc, shell: yS } = dd, _S = $S;
let Ac = !1;
const kc = () => {
  if (!fo || !Xn)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: Xn.getPath("userData"),
    appVersion: Xn.getVersion()
  };
  return Ac || (fo.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), Ac = !0), e;
};
class gS extends _S {
  constructor(t) {
    let r, n;
    if (jc) {
      const s = jc.sendSync("electron-store-get-data");
      if (!s)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = s);
    } else fo && Xn && ({ defaultCwd: r, appVersion: n } = kc());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = Ic.isAbsolute(t.cwd) ? t.cwd : Ic.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    kc();
  }
  async openInEditor() {
    const t = await yS.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var vS = gS;
const et = /* @__PURE__ */ wd(vS), Cc = new et();
let he = null;
function ud() {
  he = new Ze({
    icon: Pe.join(Cr, "logoAST.png"),
    show: !1,
    frame: !1,
    webPreferences: {
      preload: kr,
      contextIsolation: !0,
      nodeIntegration: !1
    },
    minWidth: 985,
    minHeight: 700,
    height: 700,
    width: 985
  });
  const e = Cc.get("theme") || "light", t = Cc.get("palette") || "default";
  he.webContents.on("did-finish-load", () => {
    he == null || he.webContents.send("update-theme", e), he == null || he.webContents.send("update-palette", t), he == null || he.show();
  }), xe ? he.loadURL(Kc) : he.loadFile(Pe.join(fr, "index.html"));
}
function wS() {
  wr.on("window-all-closed", () => {
    process.platform !== "darwin" && wr.quit();
  }), wr.on("activate", () => {
    Ze.getAllWindows().length === 0 && ud();
  });
}
function ES() {
  let e;
  ue.on("window-minimize", () => {
    e = Ze.getFocusedWindow(), e && e.minimize();
  }), ue.on("window-toggle-maximize", () => {
    e = Ze.getFocusedWindow(), e && (e.isMaximized() ? e.unmaximize() : e.maximize());
  }), ue.on("window-close", () => {
    e = Ze.getFocusedWindow(), e && e.close();
  }), ue.handle("open-file-dialog", async (t, r) => {
    const n = await fd.showOpenDialog(r);
    return n.canceled ? null : n.filePaths[0];
  });
}
const Dc = new et();
let ge = null;
function SS() {
  ge = new Ze({
    icon: Pe.join(Cr, "logoAST.png"),
    show: !1,
    frame: !1,
    title: "settings",
    webPreferences: {
      preload: kr,
      contextIsolation: !0,
      nodeIntegration: !1
    },
    minWidth: 800,
    minHeight: 600,
    height: 600,
    width: 800
  });
  const e = Dc.get("theme") || "light", t = Dc.get("palette") || "default";
  ge.webContents.on("did-finish-load", () => {
    ge == null || ge.webContents.send("update-theme", e), ge == null || ge.webContents.send("update-palette", t), ge == null || ge.show();
  }), ge.on("closed", () => {
    ge = null;
  }), xe ? ge.loadURL(Gc) : ge.loadURL(`file://${fr}/index.html#/settings`);
}
const Mc = new et();
let ve = null;
function bS() {
  ve = new Ze({
    icon: Pe.join(Cr, "logoAST.png"),
    show: !1,
    frame: !1,
    title: "dev",
    webPreferences: {
      preload: kr,
      contextIsolation: !0,
      nodeIntegration: !1
    },
    minWidth: 800,
    minHeight: 600,
    height: 600,
    width: 800
  });
  const e = Mc.get("theme") || "light", t = Mc.get("palette") || "default";
  ve.webContents.on("did-finish-load", () => {
    ve == null || ve.webContents.send("update-theme", e), ve == null || ve.webContents.send("update-palette", t), ve == null || ve.show();
  }), ve.on("closed", () => {
    ve = null;
  }), xe ? ve.loadURL(Wc) : ve.loadURL(`file://${fr}/index.html#/dev`);
}
const Lc = new et();
let we = null;
function PS() {
  we = new Ze({
    icon: Pe.join(Cr, "logoAST.png"),
    show: !1,
    frame: !1,
    title: "Add folder",
    webPreferences: {
      preload: kr,
      contextIsolation: !0,
      nodeIntegration: !1
    },
    minWidth: 550,
    minHeight: 400,
    height: 400,
    width: 550
  });
  const e = Lc.get("theme") || "light", t = Lc.get("palette") || "default";
  we.webContents.on("did-finish-load", () => {
    we == null || we.webContents.send("update-theme", e), we == null || we.webContents.send("update-palette", t), we == null || we.show();
  }), we.on("closed", () => {
    we = null;
  }), xe ? we.loadURL(Jc) : we.loadURL(`file://${fr}/index.html#/add-folder`);
}
const NS = new et();
function OS() {
  ue.on("open-settings-window", () => {
    ge != null && ge.isClosable ? ge.focus() : SS();
  }), ue.on("open-dev-window", () => {
    ve != null && ve.isClosable ? ve.focus() : bS();
  }), ue.on("open-create-folder-window", () => {
    we != null && we.isClosable ? we.focus() : PS();
  }), ue.on("open-store-data-editor", () => {
    NS.openInEditor();
  });
}
const Vn = new et();
function RS() {
  ue.handle("get-theme", async () => {
    const e = Vn.get("theme");
    return e === "light" || e === "dark" ? e : "light";
  }), ue.handle("get-palette", async () => {
    const e = Vn.get("palette");
    return typeof e == "string" ? e : "default";
  }), wr.whenReady().then(() => {
    ue.on("set-theme", (e, t) => {
      Vn.set("theme", t), Ze.getAllWindows().forEach((r) => {
        r.webContents.send("update-theme", t);
      });
    }), ue.on("set-palette", (e, t) => {
      Vn.set("palette", t), Ze.getAllWindows().forEach((r) => {
        r.webContents.send("update-palette", t);
      });
    });
  });
}
const Xr = new et();
function TS() {
  Fc("tools", Yn, po), Fc("theme", Bc, $o);
}
function Fc(e, t, r) {
  Xr.has(`${e}-dir`) || (xe ? Xr.set(`${e}-dir`, t) : Xr.set(`${e}-dir`, r)), ue.handle(`get-${e}-dir`, async () => Xr.get(`${e}-dir`)), wr.whenReady().then(() => {
    ue.on(`set-${e}-dir`, (n, s) => {
      Xr.set(`${e}-dir`, s), Ze.getAllWindows().forEach((o) => {
        o.webContents.send(`update-${e}-dir`, s);
      });
    });
  });
}
const IS = new et();
function jS() {
  ue.handle("get-constains", () => ({
    __filename: qc,
    __dirname: ls,
    __approot: Ar,
    __preloadpath: kr,
    __emulator: Xc,
    tool_dir: po,
    theme_dir: $o,
    MAIN_WINDOW_DEV_URL: Kc,
    SETTINGS_WINDOW_DEV_URL: Gc,
    TOOL_WINDOW_DEV_URL: Hc,
    DEV_WINDOW_DEV_URL: Wc,
    CREATE_FOLDER_WINDOW_DEV_URL: Jc,
    VITE_DEV_SERVER_URL: xe,
    RENDERER_DIST: fr,
    VITE_PUBLIC: Cr,
    TOOL_DIR_DEV_PATH: Yn,
    THEME_DIR_DEV_PATH: Bc
  })), ue.handle("get-store", () => IS.store);
}
const Je = new et();
function AS() {
  xe ? (Je.set("mode", "dev"), Je.has("incilizated") && Je.delete("incilizated")) : (Je.set("mode", "production"), Je.has("incilizated") || Je.set("incilizated", !1)), Je.has("incilizated") && (Je.get("incilizated") || (Je.delete("tools-dir"), Je.delete("theme-dir"), Vc("tools", po), Vc("theme", $o), Je.set("incilizated", !0)));
}
function Vc(e, t) {
  Je.has(`${e}-dir`) || Je.set(`${e}-dir`, t);
}
const Uc = new et();
let De = null;
function kS(e) {
  De = new Ze({
    icon: Pe.join(Cr, "logoAST.png"),
    show: !1,
    frame: !1,
    title: e,
    webPreferences: {
      preload: kr,
      contextIsolation: !0,
      nodeIntegration: !1
    },
    minWidth: 400,
    minHeight: 550,
    height: 550,
    width: 400
  });
  const t = Uc.get("theme") || "light", r = Uc.get("palette") || "default";
  De.webContents.on("did-finish-load", () => {
    De == null || De.webContents.send("update-theme", t), De == null || De.webContents.send("update-palette", r), De == null || De.show();
  }), De.on("closed", () => {
    De = null;
  }), xe ? De.loadURL(`${Hc}/${e}`) : De.loadURL(`file://${fr}/index.html#/tool/${e}`);
}
const tr = new et();
function CS() {
  let e = xe ? Yn : tr.get("tools-dir"), t = [];
  ue.handle("get-all-tools", async () => {
    try {
      t = [];
      const r = await Qt.readdir(e, { withFileTypes: !0 });
      for (const n of r)
        if (n.isDirectory()) {
          const s = Be.join(e, n.name), o = Be.join(s, "info.json");
          if (await Qt.access(o).then(() => !0).catch(() => !1)) {
            const i = await Qt.readFile(o, "utf-8"), l = JSON.parse(i);
            t.push({
              Id: n.name,
              Name: l.name || n.name || "undefiend",
              Tags: l.tags || [],
              Description: l.description || "",
              Autor: l.author || "unknown",
              IconUrl: Be.join(s, "icon.png"),
              CoverUrl: Be.join(s, "cover.png"),
              language: l.language,
              entry_file: l.entry_file
            });
          }
        }
    } catch (r) {
      console.log("Error to load tools:", r);
    }
    return t;
  }), ue.on("move-tool-to-folder", (r, n, s) => {
    const o = tr.get("folders") || [];
    if (!o || o.length === 0) return;
    const i = o.find((d) => d.Label === s), l = t.find((d) => d.Id === n);
    if (!l || !i || !i.Tools) return;
    i.Tools.some((d) => d.Id === n) || i.Tools.push(l);
    const c = i.Tools.flatMap((d) => d.Tags || []);
    i.Filters = Array.from(new Set(c)), tr.set("folders", o), he == null || he.webContents.send("update-folders", tr.get("folders"));
  }), ue.on("remove-tool-from-folder", (r, n, s) => {
    console.log("remove tool");
    const o = tr.get("folders") || [];
    if (!o || o.length === 0) return;
    const i = o.find((d) => d.Label === s);
    if (console.log("folder found:", i), !i || !i.Tools) return;
    console.log("folder.Tools before:", i.Tools);
    const l = i.Tools.filter((d) => d.Id !== n);
    console.log("folder.Tools after filter:", l), i.Tools = l;
    const c = i.Tools.flatMap((d) => d.Tags || []);
    i.Filters = Array.from(new Set(c)), tr.set("folders", o), console.log("update folder"), he == null || he.webContents.send("update-folders", tr.get("folders"));
  }), ue.on("run-tool", async (r, n) => {
    kS(n);
  }), ue.handle("get-tool-template", async (r, n) => {
    const s = Be.join(e, n, "template.json");
    return await Qt.access(s).then(() => !0).catch(() => !1) ? await Qt.readFile(s, "utf-8") : null;
  }), ue.handle("run-tool-process", async (r, n, s) => {
    const o = Be.join(e, n, "timed.json"), i = JSON.stringify(s, null, 2);
    await Qt.writeFile(o, i, "utf-8");
    const l = `python "${Xc}" --path "${xe ? Yn : e}" --tool ${n}`, c = pd(vd);
    try {
      const { stdout: d, stderr: u } = await c(l);
      u ? (console.error(`Error executing tool: ${u}`), r.sender.send("run-tool-answer", { succed: !1, message: `Error executing tool: ${u} ` })) : (console.log(`Tool output: ${d}`), r.sender.send("run-tool-answer", { succed: !0, message: d }));
    } catch (d) {
      console.error("Error executing command:", d), r.sender.send("run-tool-answer", { succed: !1, message: `Error executing tool: ${d} ` });
    } finally {
      await Qt.rm(o);
    }
  });
}
const Ue = new et();
function DS() {
  ue.handle("get-all-folders", async () => Ue.has("folders") ? Ue.get("folders") : null), ue.handle("get-folder", async (e, t) => {
    if (!Ue.has("folders")) return null;
    const n = Ue.get("folders").find((s) => s.Label === t);
    return n || null;
  }), ue.on("create-folder", (e, t) => {
    if (!Ue.has("folders"))
      Ue.set("folders", [t]);
    else {
      const r = Ue.get("folders");
      Ue.set("folders", [...r, t]);
    }
    he == null || he.webContents.send("update-folders", Ue.get("folders"));
  }), ue.on("delete-folder", (e, t) => {
    if (!Ue.has("folders")) return;
    const r = Ue.get("folders"), n = r.filter((s) => s.Label !== t);
    r.length === 0 ? Ue.delete("folders") : Ue.set("folders", n), he == null || he.webContents.send("update-folders", Ue.get("folders"));
  });
}
function MS() {
  wS(), ES(), OS(), RS(), TS(), jS(), CS(), DS(), wr.whenReady().then(() => {
    hd.registerFileProtocol("save-file", (e, t) => {
      const r = e.url.replace("save-file://", "");
      try {
        t(decodeURIComponent(r));
      } catch (n) {
        console.error("Protocol error:", n), t({ error: -6 });
      }
    }), AS(), ud();
  }).catch((e) => {
    console.error("Failed to create window:", e);
  });
}
MS();
