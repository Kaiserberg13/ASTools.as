import Ju, { BrowserWindow as ht, app as Tn, ipcMain as ot, protocol as Bu } from "electron";
import Ve from "node:path";
import { fileURLToPath as Xu } from "node:url";
import nr from "path";
import Oc from "util";
import na from "fs";
import Yu from "crypto";
import Qu from "assert";
import Zu from "events";
import xu from "os";
const Rc = Xu(import.meta.url), xn = Ve.dirname(Rc), sa = Ve.join(xn, ".."), Tc = Ve.join(xn, "../../.."), Un = Ve.join(xn, "preload.mjs"), ed = Ve.join(Tc, "Tools"), td = Ve.join(Tc, "Themes"), Ic = "http://localhost:3000/", jc = "http://localhost:3000/#/settings", rd = "http://localhost:3000/#/tool", oi = "http://localhost:3000/#/dev", nd = "http://localhost:3000/#/add-folder", Yr = process.env.VITE_DEV_SERVER_URL, Qr = Ve.join(sa, "dist"), $r = Yr ? Ve.join(sa, "public") : Qr, sd = Ve.join($r, "Tools"), ad = Ve.join($r, "Theme");
var cn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function od(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ms = { exports: {} }, id = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
};
const Gt = id, cd = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), ld = (e) => !e.some((t) => cd.has(t));
function ln(e) {
  const t = e.split("."), r = [];
  for (let n = 0; n < t.length; n++) {
    let s = t[n];
    for (; s[s.length - 1] === "\\" && t[n + 1] !== void 0; )
      s = s.slice(0, -1) + ".", s += t[++n];
    r.push(s);
  }
  return ld(r) ? r : [];
}
var ud = {
  get(e, t, r) {
    if (!Gt(e) || typeof t != "string")
      return r === void 0 ? e : r;
    const n = ln(t);
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
    if (!Gt(e) || typeof t != "string")
      return e;
    const n = e, s = ln(t);
    for (let a = 0; a < s.length; a++) {
      const i = s[a];
      Gt(e[i]) || (e[i] = {}), a === s.length - 1 && (e[i] = r), e = e[i];
    }
    return n;
  },
  delete(e, t) {
    if (!Gt(e) || typeof t != "string")
      return !1;
    const r = ln(t);
    for (let n = 0; n < r.length; n++) {
      const s = r[n];
      if (n === r.length - 1)
        return delete e[s], !0;
      if (e = e[s], !Gt(e))
        return !1;
    }
  },
  has(e, t) {
    if (!Gt(e) || typeof t != "string")
      return !1;
    const r = ln(t);
    if (r.length === 0)
      return !1;
    for (let n = 0; n < r.length; n++)
      if (Gt(e)) {
        if (!(r[n] in e))
          return !1;
        e = e[r[n]];
      } else
        return !1;
    return !0;
  }
}, aa = { exports: {} }, oa = { exports: {} }, ia = { exports: {} }, ca = { exports: {} };
const Ac = na;
ca.exports = (e) => new Promise((t) => {
  Ac.access(e, (r) => {
    t(!r);
  });
});
ca.exports.sync = (e) => {
  try {
    return Ac.accessSync(e), !0;
  } catch {
    return !1;
  }
};
var dd = ca.exports, la = { exports: {} }, ua = { exports: {} };
const kc = (e, ...t) => new Promise((r) => {
  r(e(...t));
});
ua.exports = kc;
ua.exports.default = kc;
var fd = ua.exports;
const hd = fd, Cc = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  const t = [];
  let r = 0;
  const n = () => {
    r--, t.length > 0 && t.shift()();
  }, s = (u, c, ...d) => {
    r++;
    const l = hd(u, ...d);
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
la.exports = Cc;
la.exports.default = Cc;
var md = la.exports;
const ii = md;
class Dc extends Error {
  constructor(t) {
    super(), this.value = t;
  }
}
const pd = (e, t) => Promise.resolve(e).then(t), $d = (e) => Promise.all(e).then((t) => t[1] === !0 && Promise.reject(new Dc(t[0])));
var yd = (e, t, r) => {
  r = Object.assign({
    concurrency: 1 / 0,
    preserveOrder: !0
  }, r);
  const n = ii(r.concurrency), s = [...e].map((i) => [i, n(pd, i, t)]), a = ii(r.preserveOrder ? 1 : 1 / 0);
  return Promise.all(s.map((i) => a($d, i))).then(() => {
  }).catch((i) => i instanceof Dc ? i.value : Promise.reject(i));
};
const Mc = nr, Lc = dd, _d = yd;
ia.exports = (e, t) => (t = Object.assign({
  cwd: process.cwd()
}, t), _d(e, (r) => Lc(Mc.resolve(t.cwd, r)), t));
ia.exports.sync = (e, t) => {
  t = Object.assign({
    cwd: process.cwd()
  }, t);
  for (const r of e)
    if (Lc.sync(Mc.resolve(t.cwd, r)))
      return r;
};
var gd = ia.exports;
const bt = nr, Fc = gd;
oa.exports = (e, t = {}) => {
  const r = bt.resolve(t.cwd || ""), { root: n } = bt.parse(r), s = [].concat(e);
  return new Promise((a) => {
    (function i(u) {
      Fc(s, { cwd: u }).then((c) => {
        c ? a(bt.join(u, c)) : u === n ? a(null) : i(bt.dirname(u));
      });
    })(r);
  });
};
oa.exports.sync = (e, t = {}) => {
  let r = bt.resolve(t.cwd || "");
  const { root: n } = bt.parse(r), s = [].concat(e);
  for (; ; ) {
    const a = Fc.sync(s, { cwd: r });
    if (a)
      return bt.join(r, a);
    if (r === n)
      return null;
    r = bt.dirname(r);
  }
};
var vd = oa.exports;
const Vc = vd;
aa.exports = async ({ cwd: e } = {}) => Vc("package.json", { cwd: e });
aa.exports.sync = ({ cwd: e } = {}) => Vc.sync("package.json", { cwd: e });
var Ed = aa.exports, da = { exports: {} };
const me = nr, Uc = xu, St = Uc.homedir(), fa = Uc.tmpdir(), { env: dr } = process, wd = (e) => {
  const t = me.join(St, "Library");
  return {
    data: me.join(t, "Application Support", e),
    config: me.join(t, "Preferences", e),
    cache: me.join(t, "Caches", e),
    log: me.join(t, "Logs", e),
    temp: me.join(fa, e)
  };
}, Sd = (e) => {
  const t = dr.APPDATA || me.join(St, "AppData", "Roaming"), r = dr.LOCALAPPDATA || me.join(St, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: me.join(r, e, "Data"),
    config: me.join(t, e, "Config"),
    cache: me.join(r, e, "Cache"),
    log: me.join(r, e, "Log"),
    temp: me.join(fa, e)
  };
}, bd = (e) => {
  const t = me.basename(St);
  return {
    data: me.join(dr.XDG_DATA_HOME || me.join(St, ".local", "share"), e),
    config: me.join(dr.XDG_CONFIG_HOME || me.join(St, ".config"), e),
    cache: me.join(dr.XDG_CACHE_HOME || me.join(St, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: me.join(dr.XDG_STATE_HOME || me.join(St, ".local", "state"), e),
    temp: me.join(fa, t, e)
  };
}, zc = (e, t) => {
  if (typeof e != "string")
    throw new TypeError(`Expected string, got ${typeof e}`);
  return t = Object.assign({ suffix: "nodejs" }, t), t.suffix && (e += `-${t.suffix}`), process.platform === "darwin" ? wd(e) : process.platform === "win32" ? Sd(e) : bd(e);
};
da.exports = zc;
da.exports.default = zc;
var Pd = da.exports, it = {}, ae = {};
Object.defineProperty(ae, "__esModule", { value: !0 });
ae.NOOP = ae.LIMIT_FILES_DESCRIPTORS = ae.LIMIT_BASENAME_LENGTH = ae.IS_USER_ROOT = ae.IS_POSIX = ae.DEFAULT_TIMEOUT_SYNC = ae.DEFAULT_TIMEOUT_ASYNC = ae.DEFAULT_WRITE_OPTIONS = ae.DEFAULT_READ_OPTIONS = ae.DEFAULT_FOLDER_MODE = ae.DEFAULT_FILE_MODE = ae.DEFAULT_ENCODING = void 0;
const Nd = "utf8";
ae.DEFAULT_ENCODING = Nd;
const Od = 438;
ae.DEFAULT_FILE_MODE = Od;
const Rd = 511;
ae.DEFAULT_FOLDER_MODE = Rd;
const Td = {};
ae.DEFAULT_READ_OPTIONS = Td;
const Id = {};
ae.DEFAULT_WRITE_OPTIONS = Id;
const jd = 5e3;
ae.DEFAULT_TIMEOUT_ASYNC = jd;
const Ad = 100;
ae.DEFAULT_TIMEOUT_SYNC = Ad;
const kd = !!process.getuid;
ae.IS_POSIX = kd;
const Cd = process.getuid ? !process.getuid() : !1;
ae.IS_USER_ROOT = Cd;
const Dd = 128;
ae.LIMIT_BASENAME_LENGTH = Dd;
const Md = 1e4;
ae.LIMIT_FILES_DESCRIPTORS = Md;
const Ld = () => {
};
ae.NOOP = Ld;
var es = {}, yr = {};
Object.defineProperty(yr, "__esModule", { value: !0 });
yr.attemptifySync = yr.attemptifyAsync = void 0;
const qc = ae, Fd = (e, t = qc.NOOP) => function() {
  return e.apply(void 0, arguments).catch(t);
};
yr.attemptifyAsync = Fd;
const Vd = (e, t = qc.NOOP) => function() {
  try {
    return e.apply(void 0, arguments);
  } catch (r) {
    return t(r);
  }
};
yr.attemptifySync = Vd;
var ha = {};
Object.defineProperty(ha, "__esModule", { value: !0 });
const Ud = ae, Kc = {
  isChangeErrorOk: (e) => {
    const { code: t } = e;
    return t === "ENOSYS" || !Ud.IS_USER_ROOT && (t === "EINVAL" || t === "EPERM");
  },
  isRetriableError: (e) => {
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!Kc.isChangeErrorOk(e))
      throw e;
  }
};
ha.default = Kc;
var _r = {}, ma = {};
Object.defineProperty(ma, "__esModule", { value: !0 });
const zd = ae, le = {
  interval: 25,
  intervalId: void 0,
  limit: zd.LIMIT_FILES_DESCRIPTORS,
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
ma.default = le;
Object.defineProperty(_r, "__esModule", { value: !0 });
_r.retryifySync = _r.retryifyAsync = void 0;
const qd = ma, Kd = (e, t) => function(r) {
  return function n() {
    return qd.default.schedule().then((s) => e.apply(void 0, arguments).then((a) => (s(), a), (a) => {
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
_r.retryifyAsync = Kd;
const Gd = (e, t) => function(r) {
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
_r.retryifySync = Gd;
Object.defineProperty(es, "__esModule", { value: !0 });
const oe = na, Te = Oc, Ie = yr, Ee = ha, Ce = _r, Hd = {
  chmodAttempt: Ie.attemptifyAsync(Te.promisify(oe.chmod), Ee.default.onChangeError),
  chownAttempt: Ie.attemptifyAsync(Te.promisify(oe.chown), Ee.default.onChangeError),
  closeAttempt: Ie.attemptifyAsync(Te.promisify(oe.close)),
  fsyncAttempt: Ie.attemptifyAsync(Te.promisify(oe.fsync)),
  mkdirAttempt: Ie.attemptifyAsync(Te.promisify(oe.mkdir)),
  realpathAttempt: Ie.attemptifyAsync(Te.promisify(oe.realpath)),
  statAttempt: Ie.attemptifyAsync(Te.promisify(oe.stat)),
  unlinkAttempt: Ie.attemptifyAsync(Te.promisify(oe.unlink)),
  closeRetry: Ce.retryifyAsync(Te.promisify(oe.close), Ee.default.isRetriableError),
  fsyncRetry: Ce.retryifyAsync(Te.promisify(oe.fsync), Ee.default.isRetriableError),
  openRetry: Ce.retryifyAsync(Te.promisify(oe.open), Ee.default.isRetriableError),
  readFileRetry: Ce.retryifyAsync(Te.promisify(oe.readFile), Ee.default.isRetriableError),
  renameRetry: Ce.retryifyAsync(Te.promisify(oe.rename), Ee.default.isRetriableError),
  statRetry: Ce.retryifyAsync(Te.promisify(oe.stat), Ee.default.isRetriableError),
  writeRetry: Ce.retryifyAsync(Te.promisify(oe.write), Ee.default.isRetriableError),
  chmodSyncAttempt: Ie.attemptifySync(oe.chmodSync, Ee.default.onChangeError),
  chownSyncAttempt: Ie.attemptifySync(oe.chownSync, Ee.default.onChangeError),
  closeSyncAttempt: Ie.attemptifySync(oe.closeSync),
  mkdirSyncAttempt: Ie.attemptifySync(oe.mkdirSync),
  realpathSyncAttempt: Ie.attemptifySync(oe.realpathSync),
  statSyncAttempt: Ie.attemptifySync(oe.statSync),
  unlinkSyncAttempt: Ie.attemptifySync(oe.unlinkSync),
  closeSyncRetry: Ce.retryifySync(oe.closeSync, Ee.default.isRetriableError),
  fsyncSyncRetry: Ce.retryifySync(oe.fsyncSync, Ee.default.isRetriableError),
  openSyncRetry: Ce.retryifySync(oe.openSync, Ee.default.isRetriableError),
  readFileSyncRetry: Ce.retryifySync(oe.readFileSync, Ee.default.isRetriableError),
  renameSyncRetry: Ce.retryifySync(oe.renameSync, Ee.default.isRetriableError),
  statSyncRetry: Ce.retryifySync(oe.statSync, Ee.default.isRetriableError),
  writeSyncRetry: Ce.retryifySync(oe.writeSync, Ee.default.isRetriableError)
};
es.default = Hd;
var pa = {};
Object.defineProperty(pa, "__esModule", { value: !0 });
const Wd = {
  isFunction: (e) => typeof e == "function",
  isString: (e) => typeof e == "string",
  isUndefined: (e) => typeof e > "u"
};
pa.default = Wd;
var $a = {};
Object.defineProperty($a, "__esModule", { value: !0 });
const un = {}, Ls = {
  next: (e) => {
    const t = un[e];
    if (!t)
      return;
    t.shift();
    const r = t[0];
    r ? r(() => Ls.next(e)) : delete un[e];
  },
  schedule: (e) => new Promise((t) => {
    let r = un[e];
    r || (r = un[e] = []), r.push(t), !(r.length > 1) && t(() => Ls.next(e));
  })
};
$a.default = Ls;
var ya = {};
Object.defineProperty(ya, "__esModule", { value: !0 });
const Jd = nr, ci = ae, li = es, qe = {
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
    qe.store[e] && (delete qe.store[e], li.default.unlinkAttempt(e));
  },
  purgeSync: (e) => {
    qe.store[e] && (delete qe.store[e], li.default.unlinkSyncAttempt(e));
  },
  purgeSyncAll: () => {
    for (const e in qe.store)
      qe.purgeSync(e);
  },
  truncate: (e) => {
    const t = Jd.basename(e);
    if (t.length <= ci.LIMIT_BASENAME_LENGTH)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - ci.LIMIT_BASENAME_LENGTH;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
process.on("exit", qe.purgeSyncAll);
ya.default = qe;
Object.defineProperty(it, "__esModule", { value: !0 });
it.writeFileSync = it.writeFile = it.readFileSync = it.readFile = void 0;
const Gc = nr, be = ae, se = es, Ke = pa, Bd = $a, Pt = ya;
function Hc(e, t = be.DEFAULT_READ_OPTIONS) {
  var r;
  if (Ke.default.isString(t))
    return Hc(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : be.DEFAULT_TIMEOUT_ASYNC);
  return se.default.readFileRetry(n)(e, t);
}
it.readFile = Hc;
function Wc(e, t = be.DEFAULT_READ_OPTIONS) {
  var r;
  if (Ke.default.isString(t))
    return Wc(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : be.DEFAULT_TIMEOUT_SYNC);
  return se.default.readFileSyncRetry(n)(e, t);
}
it.readFileSync = Wc;
const Jc = (e, t, r, n) => {
  if (Ke.default.isFunction(r))
    return Jc(e, t, be.DEFAULT_WRITE_OPTIONS, r);
  const s = Bc(e, t, r);
  return n && s.then(n, n), s;
};
it.writeFile = Jc;
const Bc = async (e, t, r = be.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Ke.default.isString(r))
    return Bc(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : be.DEFAULT_TIMEOUT_ASYNC);
  let a = null, i = null, u = null, c = null, d = null;
  try {
    r.schedule && (a = await r.schedule(e)), i = await Bd.default.schedule(e), e = await se.default.realpathAttempt(e) || e, [c, u] = Pt.default.get(e, r.tmpCreate || Pt.default.create, r.tmpPurge !== !1);
    const l = be.IS_POSIX && Ke.default.isUndefined(r.chown), m = Ke.default.isUndefined(r.mode);
    if (l || m) {
      const _ = await se.default.statAttempt(e);
      _ && (r = { ...r }, l && (r.chown = { uid: _.uid, gid: _.gid }), m && (r.mode = _.mode));
    }
    const P = Gc.dirname(e);
    await se.default.mkdirAttempt(P, {
      mode: be.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), d = await se.default.openRetry(s)(c, "w", r.mode || be.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(c), Ke.default.isString(t) ? await se.default.writeRetry(s)(d, t, 0, r.encoding || be.DEFAULT_ENCODING) : Ke.default.isUndefined(t) || await se.default.writeRetry(s)(d, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? await se.default.fsyncRetry(s)(d) : se.default.fsyncAttempt(d)), await se.default.closeRetry(s)(d), d = null, r.chown && await se.default.chownAttempt(c, r.chown.uid, r.chown.gid), r.mode && await se.default.chmodAttempt(c, r.mode);
    try {
      await se.default.renameRetry(s)(c, e);
    } catch (_) {
      if (_.code !== "ENAMETOOLONG")
        throw _;
      await se.default.renameRetry(s)(c, Pt.default.truncate(e));
    }
    u(), c = null;
  } finally {
    d && await se.default.closeAttempt(d), c && Pt.default.purge(c), a && a(), i && i();
  }
}, Xc = (e, t, r = be.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Ke.default.isString(r))
    return Xc(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : be.DEFAULT_TIMEOUT_SYNC);
  let a = null, i = null, u = null;
  try {
    e = se.default.realpathSyncAttempt(e) || e, [i, a] = Pt.default.get(e, r.tmpCreate || Pt.default.create, r.tmpPurge !== !1);
    const c = be.IS_POSIX && Ke.default.isUndefined(r.chown), d = Ke.default.isUndefined(r.mode);
    if (c || d) {
      const m = se.default.statSyncAttempt(e);
      m && (r = { ...r }, c && (r.chown = { uid: m.uid, gid: m.gid }), d && (r.mode = m.mode));
    }
    const l = Gc.dirname(e);
    se.default.mkdirSyncAttempt(l, {
      mode: be.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), u = se.default.openSyncRetry(s)(i, "w", r.mode || be.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(i), Ke.default.isString(t) ? se.default.writeSyncRetry(s)(u, t, 0, r.encoding || be.DEFAULT_ENCODING) : Ke.default.isUndefined(t) || se.default.writeSyncRetry(s)(u, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? se.default.fsyncSyncRetry(s)(u) : se.default.fsyncAttempt(u)), se.default.closeSyncRetry(s)(u), u = null, r.chown && se.default.chownSyncAttempt(i, r.chown.uid, r.chown.gid), r.mode && se.default.chmodSyncAttempt(i, r.mode);
    try {
      se.default.renameSyncRetry(s)(i, e);
    } catch (m) {
      if (m.code !== "ENAMETOOLONG")
        throw m;
      se.default.renameSyncRetry(s)(i, Pt.default.truncate(e));
    }
    a(), i = null;
  } finally {
    u && se.default.closeSyncAttempt(u), i && Pt.default.purge(i);
  }
};
it.writeFileSync = Xc;
var Fs = { exports: {} }, Yc = {}, xe = {}, gr = {}, en = {}, te = {}, Zr = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(E) {
      if (super(), !e.IDENTIFIER.test(E))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = E;
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
    constructor(E) {
      super(), this._items = typeof E == "string" ? [E] : E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const E = this._items[0];
      return E === "" || E === '""';
    }
    get str() {
      var E;
      return (E = this._str) !== null && E !== void 0 ? E : this._str = this._items.reduce((N, R) => `${N}${R}`, "");
    }
    get names() {
      var E;
      return (E = this._names) !== null && E !== void 0 ? E : this._names = this._items.reduce((N, R) => (R instanceof r && (N[R.str] = (N[R.str] || 0) + 1), N), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(h, ...E) {
    const N = [h[0]];
    let R = 0;
    for (; R < E.length; )
      u(N, E[R]), N.push(h[++R]);
    return new n(N);
  }
  e._ = s;
  const a = new n("+");
  function i(h, ...E) {
    const N = [_(h[0])];
    let R = 0;
    for (; R < E.length; )
      N.push(a), u(N, E[R]), N.push(a, _(h[++R]));
    return c(N), new n(N);
  }
  e.str = i;
  function u(h, E) {
    E instanceof n ? h.push(...E._items) : E instanceof r ? h.push(E) : h.push(m(E));
  }
  e.addCodeArg = u;
  function c(h) {
    let E = 1;
    for (; E < h.length - 1; ) {
      if (h[E] === a) {
        const N = d(h[E - 1], h[E + 1]);
        if (N !== void 0) {
          h.splice(E - 1, 3, N);
          continue;
        }
        h[E++] = "+";
      }
      E++;
    }
  }
  function d(h, E) {
    if (E === '""')
      return h;
    if (h === '""')
      return E;
    if (typeof h == "string")
      return E instanceof r || h[h.length - 1] !== '"' ? void 0 : typeof E != "string" ? `${h.slice(0, -1)}${E}"` : E[0] === '"' ? h.slice(0, -1) + E.slice(1) : void 0;
    if (typeof E == "string" && E[0] === '"' && !(h instanceof r))
      return `"${h}${E.slice(1)}`;
  }
  function l(h, E) {
    return E.emptyStr() ? h : h.emptyStr() ? E : i`${h}${E}`;
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
  function w(h) {
    return typeof h == "string" && e.IDENTIFIER.test(h) ? new n(`.${h}`) : s`[${h}]`;
  }
  e.getProperty = w;
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
})(Zr);
var Vs = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Zr;
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
      const P = this.toName(d), { prefix: _ } = P, w = (m = l.key) !== null && m !== void 0 ? m : l.ref;
      let g = this._values[_];
      if (g) {
        const E = g.get(w);
        if (E)
          return E;
      } else
        g = this._values[_] = /* @__PURE__ */ new Map();
      g.set(w, P);
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
      for (const w in d) {
        const g = d[w];
        if (!g)
          continue;
        const y = m[w] = m[w] || /* @__PURE__ */ new Map();
        g.forEach((h) => {
          if (y.has(h))
            return;
          y.set(h, n.Started);
          let E = l(h);
          if (E) {
            const N = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            _ = (0, t._)`${_}${N} ${h} = ${E};${this.opts._n}`;
          } else if (E = P == null ? void 0 : P(h))
            _ = (0, t._)`${_}${E}${this.opts._n}`;
          else
            throw new r(h);
          y.set(h, n.Completed);
        });
      }
      return _;
    }
  }
  e.ValueScope = u;
})(Vs);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Zr, r = Vs;
  var n = Zr;
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
  var s = Vs;
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
  class w extends _ {
    render(o) {
      return "{" + o._n + super.render(o) + "}" + o._n;
    }
  }
  class g extends _ {
  }
  class y extends w {
  }
  y.kind = "else";
  class h extends w {
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
  class E extends w {
  }
  E.kind = "for";
  class N extends E {
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
  class R extends E {
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
  class I extends E {
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
  class z extends w {
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
  class ue extends w {
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
  class V extends w {
    constructor(o) {
      super(), this.error = o;
    }
    render(o) {
      return `catch(${this.error})` + super.render(o);
    }
  }
  V.kind = "catch";
  class H extends w {
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
      return this._for(new I("of", j, A, f), () => b(A));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(o, f, b, j = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(o, (0, t._)`Object.keys(${f})`, b);
      const A = this._scope.toName(o);
      return this._for(new I("in", j, A, f), () => b(A));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(E);
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
  const T = p(e.operators.OR);
  function v(...$) {
    return $.reduce(T);
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
const ie = te, Xd = Zr;
function Yd(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
M.toHash = Yd;
function Qd(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Qc(e, t), !Zc(t, e.self.RULES.all));
}
M.alwaysValidSchema = Qd;
function Qc(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || tl(e, `unknown keyword: "${a}"`);
}
M.checkUnknownRules = Qc;
function Zc(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
M.schemaHasRules = Zc;
function Zd(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
M.schemaHasRulesButRef = Zd;
function xd({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ie._)`${r}`;
  }
  return (0, ie._)`${e}${t}${(0, ie.getProperty)(n)}`;
}
M.schemaRefOrVal = xd;
function ef(e) {
  return xc(decodeURIComponent(e));
}
M.unescapeFragment = ef;
function tf(e) {
  return encodeURIComponent(_a(e));
}
M.escapeFragment = tf;
function _a(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
M.escapeJsonPointer = _a;
function xc(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
M.unescapeJsonPointer = xc;
function rf(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
M.eachItem = rf;
function ui({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, i, u) => {
    const c = i === void 0 ? a : i instanceof ie.Name ? (a instanceof ie.Name ? e(s, a, i) : t(s, a, i), i) : a instanceof ie.Name ? (t(s, i, a), a) : r(a, i);
    return u === ie.Name && !(c instanceof ie.Name) ? n(s, c) : c;
  };
}
M.mergeEvaluated = {
  props: ui({
    mergeNames: (e, t, r) => e.if((0, ie._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, ie._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, ie._)`${r} || {}`).code((0, ie._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, ie._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, ie._)`${r} || {}`), ga(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: el
  }),
  items: ui({
    mergeNames: (e, t, r) => e.if((0, ie._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ie._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ie._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ie._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function el(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ie._)`{}`);
  return t !== void 0 && ga(e, r, t), r;
}
M.evaluatedPropsToName = el;
function ga(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ie._)`${t}${(0, ie.getProperty)(n)}`, !0));
}
M.setEvaluated = ga;
const di = {};
function nf(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: di[t.code] || (di[t.code] = new Xd._Code(t.code))
  });
}
M.useFunc = nf;
var Us;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Us || (M.Type = Us = {}));
function sf(e, t, r) {
  if (e instanceof ie.Name) {
    const n = t === Us.Num;
    return r ? n ? (0, ie._)`"[" + ${e} + "]"` : (0, ie._)`"['" + ${e} + "']"` : n ? (0, ie._)`"/" + ${e}` : (0, ie._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ie.getProperty)(e).toString() : "/" + _a(e);
}
M.getErrorPath = sf;
function tl(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
M.checkStrictMode = tl;
var dt = {};
Object.defineProperty(dt, "__esModule", { value: !0 });
const Oe = te, af = {
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
dt.default = af;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = te, r = M, n = dt;
  e.keywordError = {
    message: ({ keyword: y }) => (0, t.str)`must pass "${y}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: y, schemaType: h }) => h ? (0, t.str)`"${y}" keyword must be ${h} ($data)` : (0, t.str)`"${y}" keyword is invalid ($data)`
  };
  function s(y, h = e.keywordError, E, N) {
    const { it: R } = y, { gen: I, compositeRule: z, allErrors: W } = R, ue = m(y, h, E);
    N ?? (z || W) ? c(I, ue) : d(R, (0, t._)`[${ue}]`);
  }
  e.reportError = s;
  function a(y, h = e.keywordError, E) {
    const { it: N } = y, { gen: R, compositeRule: I, allErrors: z } = N, W = m(y, h, E);
    c(R, W), I || z || d(N, n.default.vErrors);
  }
  e.reportExtraError = a;
  function i(y, h) {
    y.assign(n.default.errors, h), y.if((0, t._)`${n.default.vErrors} !== null`, () => y.if(h, () => y.assign((0, t._)`${n.default.vErrors}.length`, h), () => y.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function u({ gen: y, keyword: h, schemaValue: E, data: N, errsCount: R, it: I }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const z = y.name("err");
    y.forRange("i", R, n.default.errors, (W) => {
      y.const(z, (0, t._)`${n.default.vErrors}[${W}]`), y.if((0, t._)`${z}.instancePath === undefined`, () => y.assign((0, t._)`${z}.instancePath`, (0, t.strConcat)(n.default.instancePath, I.errorPath))), y.assign((0, t._)`${z}.schemaPath`, (0, t.str)`${I.errSchemaPath}/${h}`), I.opts.verbose && (y.assign((0, t._)`${z}.schema`, E), y.assign((0, t._)`${z}.data`, N));
    });
  }
  e.extendErrors = u;
  function c(y, h) {
    const E = y.const("err", h);
    y.if((0, t._)`${n.default.vErrors} === null`, () => y.assign(n.default.vErrors, (0, t._)`[${E}]`), (0, t._)`${n.default.vErrors}.push(${E})`), y.code((0, t._)`${n.default.errors}++`);
  }
  function d(y, h) {
    const { gen: E, validateName: N, schemaEnv: R } = y;
    R.$async ? E.throw((0, t._)`new ${y.ValidationError}(${h})`) : (E.assign((0, t._)`${N}.errors`, h), E.return(!1));
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
  function m(y, h, E) {
    const { createErrors: N } = y.it;
    return N === !1 ? (0, t._)`{}` : P(y, h, E);
  }
  function P(y, h, E = {}) {
    const { gen: N, it: R } = y, I = [
      _(R, E),
      w(y, E)
    ];
    return g(y, h, I), N.object(...I);
  }
  function _({ errorPath: y }, { instancePath: h }) {
    const E = h ? (0, t.str)`${y}${(0, r.getErrorPath)(h, r.Type.Str)}` : y;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, E)];
  }
  function w({ keyword: y, it: { errSchemaPath: h } }, { schemaPath: E, parentSchema: N }) {
    let R = N ? h : (0, t.str)`${h}/${y}`;
    return E && (R = (0, t.str)`${R}${(0, r.getErrorPath)(E, r.Type.Str)}`), [l.schemaPath, R];
  }
  function g(y, { params: h, message: E }, N) {
    const { keyword: R, data: I, schemaValue: z, it: W } = y, { opts: ue, propertyName: V, topSchemaRef: H, schemaPath: ne } = W;
    N.push([l.keyword, R], [l.params, typeof h == "function" ? h(y) : h || (0, t._)`{}`]), ue.messages && N.push([l.message, typeof E == "function" ? E(y) : E]), ue.verbose && N.push([l.schema, z], [l.parentSchema, (0, t._)`${H}${ne}`], [n.default.data, I]), V && N.push([l.propertyName, V]);
  }
})(en);
Object.defineProperty(gr, "__esModule", { value: !0 });
gr.boolOrEmptySchema = gr.topBoolOrEmptySchema = void 0;
const of = en, cf = te, lf = dt, uf = {
  message: "boolean schema is false"
};
function df(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? rl(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(lf.default.data) : (t.assign((0, cf._)`${n}.errors`, null), t.return(!0));
}
gr.topBoolOrEmptySchema = df;
function ff(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), rl(e)) : r.var(t, !0);
}
gr.boolOrEmptySchema = ff;
function rl(e, t) {
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
  (0, of.reportError)(s, uf, void 0, t);
}
var ge = {}, xt = {};
Object.defineProperty(xt, "__esModule", { value: !0 });
xt.getRules = xt.isJSONType = void 0;
const hf = ["string", "number", "integer", "boolean", "null", "object", "array"], mf = new Set(hf);
function pf(e) {
  return typeof e == "string" && mf.has(e);
}
xt.isJSONType = pf;
function $f() {
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
xt.getRules = $f;
var mt = {};
Object.defineProperty(mt, "__esModule", { value: !0 });
mt.shouldUseRule = mt.shouldUseGroup = mt.schemaHasRulesForType = void 0;
function yf({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && nl(e, n);
}
mt.schemaHasRulesForType = yf;
function nl(e, t) {
  return t.rules.some((r) => sl(e, r));
}
mt.shouldUseGroup = nl;
function sl(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
mt.shouldUseRule = sl;
Object.defineProperty(ge, "__esModule", { value: !0 });
ge.reportTypeError = ge.checkDataTypes = ge.checkDataType = ge.coerceAndCheckDataType = ge.getJSONTypes = ge.getSchemaTypes = ge.DataType = void 0;
const _f = xt, gf = mt, vf = en, X = te, al = M;
var fr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(fr || (ge.DataType = fr = {}));
function Ef(e) {
  const t = ol(e.type);
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
ge.getSchemaTypes = Ef;
function ol(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(_f.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
ge.getJSONTypes = ol;
function wf(e, t) {
  const { gen: r, data: n, opts: s } = e, a = Sf(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, gf.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const u = va(t, n, s.strictNumbers, fr.Wrong);
    r.if(u, () => {
      a.length ? bf(e, t, a) : Ea(e);
    });
  }
  return i;
}
ge.coerceAndCheckDataType = wf;
const il = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function Sf(e, t) {
  return t ? e.filter((r) => il.has(r) || t === "array" && r === "array") : [];
}
function bf(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, X._)`typeof ${s}`), u = n.let("coerced", (0, X._)`undefined`);
  a.coerceTypes === "array" && n.if((0, X._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, X._)`${s}[0]`).assign(i, (0, X._)`typeof ${s}`).if(va(t, s, a.strictNumbers), () => n.assign(u, s))), n.if((0, X._)`${u} !== undefined`);
  for (const d of r)
    (il.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), Ea(e), n.endIf(), n.if((0, X._)`${u} !== undefined`, () => {
    n.assign(s, u), Pf(e, u);
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
function Pf({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, X._)`${t} !== undefined`, () => e.assign((0, X._)`${t}[${r}]`, n));
}
function zs(e, t, r, n = fr.Correct) {
  const s = n === fr.Correct ? X.operators.EQ : X.operators.NEQ;
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
  return n === fr.Correct ? a : (0, X.not)(a);
  function i(u = X.nil) {
    return (0, X.and)((0, X._)`typeof ${t} == "number"`, u, r ? (0, X._)`isFinite(${t})` : X.nil);
  }
}
ge.checkDataType = zs;
function va(e, t, r, n) {
  if (e.length === 1)
    return zs(e[0], t, r, n);
  let s;
  const a = (0, al.toHash)(e);
  if (a.array && a.object) {
    const i = (0, X._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, X._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = X.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, X.and)(s, zs(i, t, r, n));
  return s;
}
ge.checkDataTypes = va;
const Nf = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, X._)`{type: ${e}}` : (0, X._)`{type: ${t}}`
};
function Ea(e) {
  const t = Of(e);
  (0, vf.reportError)(t, Nf);
}
ge.reportTypeError = Ea;
function Of(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, al.schemaRefOrVal)(e, n, "type");
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
var ts = {};
Object.defineProperty(ts, "__esModule", { value: !0 });
ts.assignDefaults = void 0;
const sr = te, Rf = M;
function Tf(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      fi(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => fi(e, a, s.default));
}
ts.assignDefaults = Tf;
function fi(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: i } = e;
  if (r === void 0)
    return;
  const u = (0, sr._)`${a}${(0, sr.getProperty)(t)}`;
  if (s) {
    (0, Rf.checkStrictMode)(e, `default is ignored for: ${u}`);
    return;
  }
  let c = (0, sr._)`${u} === undefined`;
  i.useDefaults === "empty" && (c = (0, sr._)`${c} || ${u} === null || ${u} === ""`), n.if(c, (0, sr._)`${u} = ${(0, sr.stringify)(r)}`);
}
var ct = {}, x = {};
Object.defineProperty(x, "__esModule", { value: !0 });
x.validateUnion = x.validateArray = x.usePattern = x.callValidateCode = x.schemaProperties = x.allSchemaProperties = x.noPropertyInData = x.propertyInData = x.isOwnProperty = x.hasPropFunc = x.reportMissingProp = x.checkMissingProp = x.checkReportMissingProp = void 0;
const fe = te, wa = M, gt = dt, If = M;
function jf(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(ba(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, fe._)`${t}` }, !0), e.error();
  });
}
x.checkReportMissingProp = jf;
function Af({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, fe.or)(...n.map((a) => (0, fe.and)(ba(e, t, a, r.ownProperties), (0, fe._)`${s} = ${a}`)));
}
x.checkMissingProp = Af;
function kf(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
x.reportMissingProp = kf;
function cl(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, fe._)`Object.prototype.hasOwnProperty`
  });
}
x.hasPropFunc = cl;
function Sa(e, t, r) {
  return (0, fe._)`${cl(e)}.call(${t}, ${r})`;
}
x.isOwnProperty = Sa;
function Cf(e, t, r, n) {
  const s = (0, fe._)`${t}${(0, fe.getProperty)(r)} !== undefined`;
  return n ? (0, fe._)`${s} && ${Sa(e, t, r)}` : s;
}
x.propertyInData = Cf;
function ba(e, t, r, n) {
  const s = (0, fe._)`${t}${(0, fe.getProperty)(r)} === undefined`;
  return n ? (0, fe.or)(s, (0, fe.not)(Sa(e, t, r))) : s;
}
x.noPropertyInData = ba;
function ll(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
x.allSchemaProperties = ll;
function Df(e, t) {
  return ll(t).filter((r) => !(0, wa.alwaysValidSchema)(e, t[r]));
}
x.schemaProperties = Df;
function Mf({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: i }, u, c, d) {
  const l = d ? (0, fe._)`${e}, ${t}, ${n}${s}` : t, m = [
    [gt.default.instancePath, (0, fe.strConcat)(gt.default.instancePath, a)],
    [gt.default.parentData, i.parentData],
    [gt.default.parentDataProperty, i.parentDataProperty],
    [gt.default.rootData, gt.default.rootData]
  ];
  i.opts.dynamicRef && m.push([gt.default.dynamicAnchors, gt.default.dynamicAnchors]);
  const P = (0, fe._)`${l}, ${r.object(...m)}`;
  return c !== fe.nil ? (0, fe._)`${u}.call(${c}, ${P})` : (0, fe._)`${u}(${P})`;
}
x.callValidateCode = Mf;
const Lf = (0, fe._)`new RegExp`;
function Ff({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, fe._)`${s.code === "new RegExp" ? Lf : (0, If.useFunc)(e, s)}(${r}, ${n})`
  });
}
x.usePattern = Ff;
function Vf(e) {
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
        dataPropType: wa.Type.Num
      }, a), t.if((0, fe.not)(a), u);
    });
  }
}
x.validateArray = Vf;
function Uf(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, wa.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
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
x.validateUnion = Uf;
Object.defineProperty(ct, "__esModule", { value: !0 });
ct.validateKeywordUsage = ct.validSchemaType = ct.funcKeywordCode = ct.macroKeywordCode = void 0;
const je = te, Jt = dt, zf = x, qf = en;
function Kf(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: i } = e, u = t.macro.call(i.self, s, a, i), c = ul(r, n, u);
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
ct.macroKeywordCode = Kf;
function Gf(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: i, $data: u, it: c } = e;
  Wf(c, t);
  const d = !u && t.compile ? t.compile.call(c.self, a, i, c) : t.validate, l = ul(n, s, d), m = n.let("valid");
  e.block$data(m, P), e.ok((r = t.valid) !== null && r !== void 0 ? r : m);
  function P() {
    if (t.errors === !1)
      g(), t.modifying && hi(e), y(() => e.error());
    else {
      const h = t.async ? _() : w();
      t.modifying && hi(e), y(() => Hf(e, h));
    }
  }
  function _() {
    const h = n.let("ruleErrs", null);
    return n.try(() => g((0, je._)`await `), (E) => n.assign(m, !1).if((0, je._)`${E} instanceof ${c.ValidationError}`, () => n.assign(h, (0, je._)`${E}.errors`), () => n.throw(E))), h;
  }
  function w() {
    const h = (0, je._)`${l}.errors`;
    return n.assign(h, null), g(je.nil), h;
  }
  function g(h = t.async ? (0, je._)`await ` : je.nil) {
    const E = c.opts.passContext ? Jt.default.this : Jt.default.self, N = !("compile" in t && !u || t.schema === !1);
    n.assign(m, (0, je._)`${h}${(0, zf.callValidateCode)(e, l, E, N)}`, t.modifying);
  }
  function y(h) {
    var E;
    n.if((0, je.not)((E = t.valid) !== null && E !== void 0 ? E : m), h);
  }
}
ct.funcKeywordCode = Gf;
function hi(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, je._)`${n.parentData}[${n.parentDataProperty}]`));
}
function Hf(e, t) {
  const { gen: r } = e;
  r.if((0, je._)`Array.isArray(${t})`, () => {
    r.assign(Jt.default.vErrors, (0, je._)`${Jt.default.vErrors} === null ? ${t} : ${Jt.default.vErrors}.concat(${t})`).assign(Jt.default.errors, (0, je._)`${Jt.default.vErrors}.length`), (0, qf.extendErrors)(e);
  }, () => e.error());
}
function Wf({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function ul(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, je.stringify)(r) });
}
function Jf(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
ct.validSchemaType = Jf;
function Bf({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
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
ct.validateKeywordUsage = Bf;
var Rt = {};
Object.defineProperty(Rt, "__esModule", { value: !0 });
Rt.extendSubschemaMode = Rt.extendSubschemaData = Rt.getSubschema = void 0;
const st = te, dl = M;
function Xf(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: i }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const u = e.schema[t];
    return r === void 0 ? {
      schema: u,
      schemaPath: (0, st._)`${e.schemaPath}${(0, st.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: u[r],
      schemaPath: (0, st._)`${e.schemaPath}${(0, st.getProperty)(t)}${(0, st.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, dl.escapeFragment)(r)}`
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
Rt.getSubschema = Xf;
function Yf(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: i }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: u } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: l, opts: m } = t, P = u.let("data", (0, st._)`${t.data}${(0, st.getProperty)(r)}`, !0);
    c(P), e.errorPath = (0, st.str)`${d}${(0, dl.getErrorPath)(r, n, m.jsPropertySyntax)}`, e.parentDataProperty = (0, st._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (s !== void 0) {
    const d = s instanceof st.Name ? s : u.let("data", s, !0);
    c(d), i !== void 0 && (e.propertyName = i);
  }
  a && (e.dataTypes = a);
  function c(d) {
    e.data = d, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, d];
  }
}
Rt.extendSubschemaData = Yf;
function Qf(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Rt.extendSubschemaMode = Qf;
var Pe = {}, rs = function e(t, r) {
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
}, fl = { exports: {} }, Nt = fl.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  In(t, n, s, e, "", e);
};
Nt.keywords = {
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
Nt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Nt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Nt.skipKeywords = {
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
function In(e, t, r, n, s, a, i, u, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, i, u, c, d);
    for (var l in n) {
      var m = n[l];
      if (Array.isArray(m)) {
        if (l in Nt.arrayKeywords)
          for (var P = 0; P < m.length; P++)
            In(e, t, r, m[P], s + "/" + l + "/" + P, a, s, l, n, P);
      } else if (l in Nt.propsKeywords) {
        if (m && typeof m == "object")
          for (var _ in m)
            In(e, t, r, m[_], s + "/" + l + "/" + Zf(_), a, s, l, n, _);
      } else (l in Nt.keywords || e.allKeys && !(l in Nt.skipKeywords)) && In(e, t, r, m, s + "/" + l, a, s, l, n);
    }
    r(n, s, a, i, u, c, d);
  }
}
function Zf(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var xf = fl.exports;
Object.defineProperty(Pe, "__esModule", { value: !0 });
Pe.getSchemaRefs = Pe.resolveUrl = Pe.normalizeId = Pe._getFullPath = Pe.getFullPath = Pe.inlineRef = void 0;
const eh = M, th = rs, rh = xf, nh = /* @__PURE__ */ new Set([
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
function sh(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !qs(e) : t ? hl(e) <= t : !1;
}
Pe.inlineRef = sh;
const ah = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function qs(e) {
  for (const t in e) {
    if (ah.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(qs) || typeof r == "object" && qs(r))
      return !0;
  }
  return !1;
}
function hl(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !nh.has(r) && (typeof e[r] == "object" && (0, eh.eachItem)(e[r], (n) => t += hl(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function ml(e, t = "", r) {
  r !== !1 && (t = hr(t));
  const n = e.parse(t);
  return pl(e, n);
}
Pe.getFullPath = ml;
function pl(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Pe._getFullPath = pl;
const oh = /#\/?$/;
function hr(e) {
  return e ? e.replace(oh, "") : "";
}
Pe.normalizeId = hr;
function ih(e, t, r) {
  return r = hr(r), e.resolve(t, r);
}
Pe.resolveUrl = ih;
const ch = /^[a-z_][-a-z0-9._]*$/i;
function lh(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = hr(e[r] || t), a = { "": s }, i = ml(n, s, !1), u = {}, c = /* @__PURE__ */ new Set();
  return rh(e, { allKeys: !0 }, (m, P, _, w) => {
    if (w === void 0)
      return;
    const g = i + P;
    let y = a[w];
    typeof m[r] == "string" && (y = h.call(this, m[r])), E.call(this, m.$anchor), E.call(this, m.$dynamicAnchor), a[P] = y;
    function h(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = hr(y ? R(y, N) : N), c.has(N))
        throw l(N);
      c.add(N);
      let I = this.refs[N];
      return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? d(m, I.schema, N) : N !== hr(g) && (N[0] === "#" ? (d(m, u[N], N), u[N] = m) : this.refs[N] = g), N;
    }
    function E(N) {
      if (typeof N == "string") {
        if (!ch.test(N))
          throw new Error(`invalid anchor "${N}"`);
        h.call(this, `#${N}`);
      }
    }
  }), u;
  function d(m, P, _) {
    if (P !== void 0 && !th(m, P))
      throw l(_);
  }
  function l(m) {
    return new Error(`reference "${m}" resolves to more than one schema`);
  }
}
Pe.getSchemaRefs = lh;
Object.defineProperty(xe, "__esModule", { value: !0 });
xe.getData = xe.KeywordCxt = xe.validateFunctionCode = void 0;
const $l = gr, mi = ge, Pa = mt, zn = ge, uh = ts, Ur = ct, Es = Rt, K = te, J = dt, dh = Pe, pt = M, Ar = en;
function fh(e) {
  if (gl(e) && (vl(e), _l(e))) {
    ph(e);
    return;
  }
  yl(e, () => (0, $l.topBoolOrEmptySchema)(e));
}
xe.validateFunctionCode = fh;
function yl({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, K._)`${J.default.data}, ${J.default.valCxt}`, n.$async, () => {
    e.code((0, K._)`"use strict"; ${pi(r, s)}`), mh(e, s), e.code(a);
  }) : e.func(t, (0, K._)`${J.default.data}, ${hh(s)}`, n.$async, () => e.code(pi(r, s)).code(a));
}
function hh(e) {
  return (0, K._)`{${J.default.instancePath}="", ${J.default.parentData}, ${J.default.parentDataProperty}, ${J.default.rootData}=${J.default.data}${e.dynamicRef ? (0, K._)`, ${J.default.dynamicAnchors}={}` : K.nil}}={}`;
}
function mh(e, t) {
  e.if(J.default.valCxt, () => {
    e.var(J.default.instancePath, (0, K._)`${J.default.valCxt}.${J.default.instancePath}`), e.var(J.default.parentData, (0, K._)`${J.default.valCxt}.${J.default.parentData}`), e.var(J.default.parentDataProperty, (0, K._)`${J.default.valCxt}.${J.default.parentDataProperty}`), e.var(J.default.rootData, (0, K._)`${J.default.valCxt}.${J.default.rootData}`), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, K._)`${J.default.valCxt}.${J.default.dynamicAnchors}`);
  }, () => {
    e.var(J.default.instancePath, (0, K._)`""`), e.var(J.default.parentData, (0, K._)`undefined`), e.var(J.default.parentDataProperty, (0, K._)`undefined`), e.var(J.default.rootData, J.default.data), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, K._)`{}`);
  });
}
function ph(e) {
  const { schema: t, opts: r, gen: n } = e;
  yl(e, () => {
    r.$comment && t.$comment && wl(e), vh(e), n.let(J.default.vErrors, null), n.let(J.default.errors, 0), r.unevaluated && $h(e), El(e), Sh(e);
  });
}
function $h(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, K._)`${r}.evaluated`), t.if((0, K._)`${e.evaluated}.dynamicProps`, () => t.assign((0, K._)`${e.evaluated}.props`, (0, K._)`undefined`)), t.if((0, K._)`${e.evaluated}.dynamicItems`, () => t.assign((0, K._)`${e.evaluated}.items`, (0, K._)`undefined`));
}
function pi(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, K._)`/*# sourceURL=${r} */` : K.nil;
}
function yh(e, t) {
  if (gl(e) && (vl(e), _l(e))) {
    _h(e, t);
    return;
  }
  (0, $l.boolOrEmptySchema)(e, t);
}
function _l({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function gl(e) {
  return typeof e.schema != "boolean";
}
function _h(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && wl(e), Eh(e), wh(e);
  const a = n.const("_errs", J.default.errors);
  El(e, a), n.var(t, (0, K._)`${a} === ${J.default.errors}`);
}
function vl(e) {
  (0, pt.checkUnknownRules)(e), gh(e);
}
function El(e, t) {
  if (e.opts.jtd)
    return $i(e, [], !1, t);
  const r = (0, mi.getSchemaTypes)(e.schema), n = (0, mi.coerceAndCheckDataType)(e, r);
  $i(e, r, !n, t);
}
function gh(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, pt.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function vh(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, pt.checkStrictMode)(e, "default is ignored in the schema root");
}
function Eh(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, dh.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function wh(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function wl({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, K._)`${J.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const i = (0, K.str)`${n}/$comment`, u = e.scopeValue("root", { ref: t.root });
    e.code((0, K._)`${J.default.self}.opts.$comment(${a}, ${i}, ${u}.schema)`);
  }
}
function Sh(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, K._)`${J.default.errors} === 0`, () => t.return(J.default.data), () => t.throw((0, K._)`new ${s}(${J.default.vErrors})`)) : (t.assign((0, K._)`${n}.errors`, J.default.vErrors), a.unevaluated && bh(e), t.return((0, K._)`${J.default.errors} === 0`));
}
function bh({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof K.Name && e.assign((0, K._)`${t}.props`, r), n instanceof K.Name && e.assign((0, K._)`${t}.items`, n);
}
function $i(e, t, r, n) {
  const { gen: s, schema: a, data: i, allErrors: u, opts: c, self: d } = e, { RULES: l } = d;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, pt.schemaHasRulesButRef)(a, l))) {
    s.block(() => Pl(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || Ph(e, t), s.block(() => {
    for (const P of l.rules)
      m(P);
    m(l.post);
  });
  function m(P) {
    (0, Pa.shouldUseGroup)(a, P) && (P.type ? (s.if((0, zn.checkDataType)(P.type, i, c.strictNumbers)), yi(e, P), t.length === 1 && t[0] === P.type && r && (s.else(), (0, zn.reportTypeError)(e)), s.endIf()) : yi(e, P), u || s.if((0, K._)`${J.default.errors} === ${n || 0}`));
  }
}
function yi(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, uh.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, Pa.shouldUseRule)(n, a) && Pl(e, a.keyword, a.definition, t.type);
  });
}
function Ph(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (Nh(e, t), e.opts.allowUnionTypes || Oh(e, t), Rh(e, e.dataTypes));
}
function Nh(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      Sl(e.dataTypes, r) || Na(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), Ih(e, t);
  }
}
function Oh(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && Na(e, "use allowUnionTypes to allow union type keyword");
}
function Rh(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, Pa.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((i) => Th(t, i)) && Na(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function Th(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function Sl(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function Ih(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    Sl(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function Na(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, pt.checkStrictMode)(e, t, e.opts.strictTypes);
}
let bl = class {
  constructor(t, r, n) {
    if ((0, Ur.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, pt.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", Nl(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Ur.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
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
    (t ? Ar.reportExtraError : Ar.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Ar.reportError)(this, this.def.$dataError || Ar.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Ar.resetErrorsCount)(this.gen, this.errsCount);
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
        return (0, K._)`${(0, zn.checkDataTypes)(c, r, a.opts.strictNumbers, zn.DataType.Wrong)}`;
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
    const n = (0, Es.getSubschema)(this.it, t);
    (0, Es.extendSubschemaData)(n, this.it, t), (0, Es.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return yh(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = pt.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = pt.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, K.Name)), !0;
  }
};
xe.KeywordCxt = bl;
function Pl(e, t, r, n) {
  const s = new bl(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Ur.funcKeywordCode)(s, r) : "macro" in r ? (0, Ur.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Ur.funcKeywordCode)(s, r);
}
const jh = /^\/(?:[^~]|~0|~1)*$/, Ah = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function Nl(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return J.default.rootData;
  if (e[0] === "/") {
    if (!jh.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = J.default.rootData;
  } else {
    const d = Ah.exec(e);
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
    d && (a = (0, K._)`${a}${(0, K.getProperty)((0, pt.unescapeJsonPointer)(d))}`, i = (0, K._)`${i} && ${a}`);
  return i;
  function c(d, l) {
    return `Cannot access ${d} ${l} levels up, current level is ${t}`;
  }
}
xe.getData = Nl;
var tn = {};
Object.defineProperty(tn, "__esModule", { value: !0 });
let kh = class extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
};
tn.default = kh;
var Sr = {};
Object.defineProperty(Sr, "__esModule", { value: !0 });
const ws = Pe;
let Ch = class extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, ws.resolveUrl)(t, r, n), this.missingSchema = (0, ws.normalizeId)((0, ws.getFullPath)(t, this.missingRef));
  }
};
Sr.default = Ch;
var Le = {};
Object.defineProperty(Le, "__esModule", { value: !0 });
Le.resolveSchema = Le.getCompilingSchema = Le.resolveRef = Le.compileSchema = Le.SchemaEnv = void 0;
const Je = te, Dh = tn, Ht = dt, Qe = Pe, _i = M, Mh = xe;
let ns = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Qe.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
Le.SchemaEnv = ns;
function Oa(e) {
  const t = Ol.call(this, e);
  if (t)
    return t;
  const r = (0, Qe.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new Je.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let u;
  e.$async && (u = i.scopeValue("Error", {
    ref: Dh.default,
    code: (0, Je._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = i.scopeName("validate");
  e.validateName = c;
  const d = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: Ht.default.data,
    parentData: Ht.default.parentData,
    parentDataProperty: Ht.default.parentDataProperty,
    dataNames: [Ht.default.data],
    dataPathArr: [Je.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Je.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: u,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Je.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Je._)`""`,
    opts: this.opts,
    self: this
  };
  let l;
  try {
    this._compilations.add(e), (0, Mh.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const m = i.toString();
    l = `${i.scopeRefs(Ht.default.scope)}return ${m}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const _ = new Function(`${Ht.default.self}`, `${Ht.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: _ }), _.errors = null, _.schema = e.schema, _.schemaEnv = e, e.$async && (_.$async = !0), this.opts.code.source === !0 && (_.source = { validateName: c, validateCode: m, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: w, items: g } = d;
      _.evaluated = {
        props: w instanceof Je.Name ? void 0 : w,
        items: g instanceof Je.Name ? void 0 : g,
        dynamicProps: w instanceof Je.Name,
        dynamicItems: g instanceof Je.Name
      }, _.source && (_.source.evaluated = (0, Je.stringify)(_.evaluated));
    }
    return e.validate = _, e;
  } catch (m) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), m;
  } finally {
    this._compilations.delete(e);
  }
}
Le.compileSchema = Oa;
function Lh(e, t, r) {
  var n;
  r = (0, Qe.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = Uh.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: u } = this.opts;
    i && (a = new ns({ schema: i, schemaId: u, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = Fh.call(this, a);
}
Le.resolveRef = Lh;
function Fh(e) {
  return (0, Qe.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Oa.call(this, e);
}
function Ol(e) {
  for (const t of this._compilations)
    if (Vh(t, e))
      return t;
}
Le.getCompilingSchema = Ol;
function Vh(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function Uh(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || ss.call(this, e, t);
}
function ss(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Qe._getFullPath)(this.opts.uriResolver, r);
  let s = (0, Qe.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return Ss.call(this, r, e);
  const a = (0, Qe.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const u = ss.call(this, e, i);
    return typeof (u == null ? void 0 : u.schema) != "object" ? void 0 : Ss.call(this, r, u);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || Oa.call(this, i), a === (0, Qe.normalizeId)(t)) {
      const { schema: u } = i, { schemaId: c } = this.opts, d = u[c];
      return d && (s = (0, Qe.resolveUrl)(this.opts.uriResolver, s, d)), new ns({ schema: u, schemaId: c, root: e, baseId: s });
    }
    return Ss.call(this, r, i);
  }
}
Le.resolveSchema = ss;
const zh = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Ss(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const u of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, _i.unescapeFragment)(u)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !zh.has(u) && d && (t = (0, Qe.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, _i.schemaHasRulesButRef)(r, this.RULES)) {
    const u = (0, Qe.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = ss.call(this, n, u);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new ns({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const qh = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Kh = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Gh = "object", Hh = [
  "$data"
], Wh = {
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
}, Jh = !1, Bh = {
  $id: qh,
  description: Kh,
  type: Gh,
  required: Hh,
  properties: Wh,
  additionalProperties: Jh
};
var Ra = {}, as = { exports: {} };
const Xh = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), Rl = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function Tl(e) {
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
const Yh = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function gi(e) {
  return e.length = 0, !0;
}
function Qh(e, t, r) {
  if (e.length) {
    const n = Tl(e);
    if (n !== "")
      t.push(n);
    else
      return r.error = !0, !1;
    e.length = 0;
  }
  return !0;
}
function Zh(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let a = !1, i = !1, u = Qh;
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
        u = gi;
      } else {
        s.push(d);
        continue;
      }
  }
  return s.length && (u === gi ? r.zone = s.join("") : i ? n.push(s.join("")) : n.push(Tl(s))), r.address = n.join(""), r;
}
function Il(e) {
  if (xh(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = Zh(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function xh(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function em(e) {
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
function tm(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function rm(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!Rl(r)) {
      const n = Il(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var jl = {
  nonSimpleDomain: Yh,
  recomposeAuthority: rm,
  normalizeComponentEncoding: tm,
  removeDotSegments: em,
  isIPv4: Rl,
  isUUID: Xh,
  normalizeIPv6: Il
};
const { isUUID: nm } = jl, sm = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function Al(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function kl(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function Cl(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function am(e) {
  return e.secure = Al(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function om(e) {
  if ((e.port === (Al(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function im(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(sm);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, a = Ta(s);
    e.path = void 0, a && (e = a.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function cm(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, a = Ta(s);
  a && (e = a.serialize(e, t));
  const i = e, u = e.nss;
  return i.path = `${n || t.nid}:${u}`, t.skipEscape = !0, i;
}
function lm(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !nm(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function um(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const Dl = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: kl,
    serialize: Cl
  }
), dm = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: Dl.domainHost,
    parse: kl,
    serialize: Cl
  }
), jn = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: am,
    serialize: om
  }
), fm = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: jn.domainHost,
    parse: jn.parse,
    serialize: jn.serialize
  }
), hm = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: im,
    serialize: cm,
    skipNormalize: !0
  }
), mm = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: lm,
    serialize: um,
    skipNormalize: !0
  }
), qn = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: Dl,
    https: dm,
    ws: jn,
    wss: fm,
    urn: hm,
    "urn:uuid": mm
  }
);
Object.setPrototypeOf(qn, null);
function Ta(e) {
  return e && (qn[
    /** @type {SchemeName} */
    e
  ] || qn[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var pm = {
  SCHEMES: qn,
  getSchemeHandler: Ta
};
const { normalizeIPv6: $m, removeDotSegments: Lr, recomposeAuthority: ym, normalizeComponentEncoding: dn, isIPv4: _m, nonSimpleDomain: gm } = jl, { SCHEMES: vm, getSchemeHandler: Ml } = pm;
function Em(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  lt(_t(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  _t(lt(e, t), t)), e;
}
function wm(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, s = Ll(_t(e, n), _t(t, n), n, !0);
  return n.skipEscape = !0, lt(s, n);
}
function Ll(e, t, r, n) {
  const s = {};
  return n || (e = _t(lt(e, r), r), t = _t(lt(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Lr(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Lr(t.path || ""), s.query = t.query) : (t.path ? (t.path[0] === "/" ? s.path = Lr(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = Lr(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function Sm(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = lt(dn(_t(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = lt(dn(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = lt(dn(_t(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = lt(dn(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function lt(e, t) {
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
  }, n = Object.assign({}, t), s = [], a = Ml(n.scheme || r.scheme);
  a && a.serialize && a.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const i = ym(r);
  if (i !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(i), r.path && r.path[0] !== "/" && s.push("/")), r.path !== void 0) {
    let u = r.path;
    !n.absolutePath && (!a || !a.absolutePath) && (u = Lr(u)), i === void 0 && u[0] === "/" && u[1] === "/" && (u = "/%2F" + u.slice(2)), s.push(u);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const bm = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function _t(e, t) {
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
  const a = e.match(bm);
  if (a) {
    if (n.scheme = a[1], n.userinfo = a[3], n.host = a[4], n.port = parseInt(a[5], 10), n.path = a[6] || "", n.query = a[7], n.fragment = a[8], isNaN(n.port) && (n.port = a[5]), n.host)
      if (_m(n.host) === !1) {
        const c = $m(n.host);
        n.host = c.host.toLowerCase(), s = c.isIPV6;
      } else
        s = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const i = Ml(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!i || !i.unicodeSupport) && n.host && (r.domainHost || i && i.domainHost) && s === !1 && gm(n.host))
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
const Ia = {
  SCHEMES: vm,
  normalize: Em,
  resolve: wm,
  resolveComponent: Ll,
  equal: Sm,
  serialize: lt,
  parse: _t
};
as.exports = Ia;
as.exports.default = Ia;
as.exports.fastUri = Ia;
var Fl = as.exports;
Object.defineProperty(Ra, "__esModule", { value: !0 });
const Vl = Fl;
Vl.code = 'require("ajv/dist/runtime/uri").default';
Ra.default = Vl;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = xe;
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
  const n = tn, s = Sr, a = xt, i = Le, u = te, c = Pe, d = ge, l = M, m = Bh, P = Ra, _ = (v, p) => new RegExp(v, p);
  _.code = "new RegExp";
  const w = ["removeAdditional", "useDefaults", "coerceTypes"], g = /* @__PURE__ */ new Set([
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
  }, E = 200;
  function N(v) {
    var p, S, $, o, f, b, j, A, q, F, re, Ue, It, jt, At, kt, Ct, Dt, Mt, Lt, Ft, Vt, Ut, zt, qt;
    const We = v.strict, Kt = (p = v.code) === null || p === void 0 ? void 0 : p.optimize, Ir = Kt === !0 || Kt === void 0 ? 1 : Kt || 0, jr = ($ = (S = v.code) === null || S === void 0 ? void 0 : S.regExp) !== null && $ !== void 0 ? $ : _, vs = (o = v.uriResolver) !== null && o !== void 0 ? o : P.default;
    return {
      strictSchema: (b = (f = v.strictSchema) !== null && f !== void 0 ? f : We) !== null && b !== void 0 ? b : !0,
      strictNumbers: (A = (j = v.strictNumbers) !== null && j !== void 0 ? j : We) !== null && A !== void 0 ? A : !0,
      strictTypes: (F = (q = v.strictTypes) !== null && q !== void 0 ? q : We) !== null && F !== void 0 ? F : "log",
      strictTuples: (Ue = (re = v.strictTuples) !== null && re !== void 0 ? re : We) !== null && Ue !== void 0 ? Ue : "log",
      strictRequired: (jt = (It = v.strictRequired) !== null && It !== void 0 ? It : We) !== null && jt !== void 0 ? jt : !1,
      code: v.code ? { ...v.code, optimize: Ir, regExp: jr } : { optimize: Ir, regExp: jr },
      loopRequired: (At = v.loopRequired) !== null && At !== void 0 ? At : E,
      loopEnum: (kt = v.loopEnum) !== null && kt !== void 0 ? kt : E,
      meta: (Ct = v.meta) !== null && Ct !== void 0 ? Ct : !0,
      messages: (Dt = v.messages) !== null && Dt !== void 0 ? Dt : !0,
      inlineRefs: (Mt = v.inlineRefs) !== null && Mt !== void 0 ? Mt : !0,
      schemaId: (Lt = v.schemaId) !== null && Lt !== void 0 ? Lt : "$id",
      addUsedSchema: (Ft = v.addUsedSchema) !== null && Ft !== void 0 ? Ft : !0,
      validateSchema: (Vt = v.validateSchema) !== null && Vt !== void 0 ? Vt : !0,
      validateFormats: (Ut = v.validateFormats) !== null && Ut !== void 0 ? Ut : !0,
      unicodeRegExp: (zt = v.unicodeRegExp) !== null && zt !== void 0 ? zt : !0,
      int32range: (qt = v.int32range) !== null && qt !== void 0 ? qt : !0,
      uriResolver: vs
    };
  }
  class R {
    constructor(p = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), p = this.opts = { ...p, ...N(p) };
      const { es5: S, lines: $ } = this.opts.code;
      this.scope = new u.ValueScope({ scope: {}, prefixes: g, es5: S, lines: $ }), this.logger = Q(p.logger);
      const o = p.validateFormats;
      p.validateFormats = !1, this.RULES = (0, a.getRules)(), I.call(this, y, p, "NOT SUPPORTED"), I.call(this, h, p, "DEPRECATED", "warn"), this._metaOpts = H.call(this), p.formats && ue.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), p.keywords && V.call(this, p.keywords), typeof p.meta == "object" && this.addMetaSchema(p.meta), W.call(this), p.validateFormats = o;
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
          q && F && (b[j] = T(F));
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
  function I(v, p, S, $ = "error") {
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
    for (const p of w)
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
    p !== void 0 && (v.$data && this.opts.$data && (p = T(p)), v.validateSchema = this.compile(p, !0));
  }
  const O = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function T(v) {
    return { anyOf: [v, O] };
  }
})(Yc);
var ja = {}, Aa = {}, ka = {};
Object.defineProperty(ka, "__esModule", { value: !0 });
const Pm = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
ka.default = Pm;
var er = {};
Object.defineProperty(er, "__esModule", { value: !0 });
er.callRef = er.getValidate = void 0;
const Nm = Sr, vi = x, De = te, ar = dt, Ei = Le, fn = M, Om = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: u, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return m();
    const l = Ei.resolveRef.call(c, d, s, r);
    if (l === void 0)
      throw new Nm.default(n.opts.uriResolver, s, r);
    if (l instanceof Ei.SchemaEnv)
      return P(l);
    return _(l);
    function m() {
      if (a === d)
        return An(e, i, a, a.$async);
      const w = t.scopeValue("root", { ref: d });
      return An(e, (0, De._)`${w}.validate`, d, d.$async);
    }
    function P(w) {
      const g = Ul(e, w);
      An(e, g, w, w.$async);
    }
    function _(w) {
      const g = t.scopeValue("schema", u.code.source === !0 ? { ref: w, code: (0, De.stringify)(w) } : { ref: w }), y = t.name("valid"), h = e.subschema({
        schema: w,
        dataTypes: [],
        schemaPath: De.nil,
        topSchemaRef: g,
        errSchemaPath: r
      }, y);
      e.mergeEvaluated(h), e.ok(y);
    }
  }
};
function Ul(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, De._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
er.getValidate = Ul;
function An(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: u, opts: c } = a, d = c.passContext ? ar.default.this : De.nil;
  n ? l() : m();
  function l() {
    if (!u.$async)
      throw new Error("async schema referenced by sync schema");
    const w = s.let("valid");
    s.try(() => {
      s.code((0, De._)`await ${(0, vi.callValidateCode)(e, t, d)}`), _(t), i || s.assign(w, !0);
    }, (g) => {
      s.if((0, De._)`!(${g} instanceof ${a.ValidationError})`, () => s.throw(g)), P(g), i || s.assign(w, !1);
    }), e.ok(w);
  }
  function m() {
    e.result((0, vi.callValidateCode)(e, t, d), () => _(t), () => P(t));
  }
  function P(w) {
    const g = (0, De._)`${w}.errors`;
    s.assign(ar.default.vErrors, (0, De._)`${ar.default.vErrors} === null ? ${g} : ${ar.default.vErrors}.concat(${g})`), s.assign(ar.default.errors, (0, De._)`${ar.default.vErrors}.length`);
  }
  function _(w) {
    var g;
    if (!a.opts.unevaluated)
      return;
    const y = (g = r == null ? void 0 : r.validate) === null || g === void 0 ? void 0 : g.evaluated;
    if (a.props !== !0)
      if (y && !y.dynamicProps)
        y.props !== void 0 && (a.props = fn.mergeEvaluated.props(s, y.props, a.props));
      else {
        const h = s.var("props", (0, De._)`${w}.evaluated.props`);
        a.props = fn.mergeEvaluated.props(s, h, a.props, De.Name);
      }
    if (a.items !== !0)
      if (y && !y.dynamicItems)
        y.items !== void 0 && (a.items = fn.mergeEvaluated.items(s, y.items, a.items));
      else {
        const h = s.var("items", (0, De._)`${w}.evaluated.items`);
        a.items = fn.mergeEvaluated.items(s, h, a.items, De.Name);
      }
  }
}
er.callRef = An;
er.default = Om;
Object.defineProperty(Aa, "__esModule", { value: !0 });
const Rm = ka, Tm = er, Im = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  Rm.default,
  Tm.default
];
Aa.default = Im;
var Ca = {}, Da = {};
Object.defineProperty(Da, "__esModule", { value: !0 });
const Kn = te, vt = Kn.operators, Gn = {
  maximum: { okStr: "<=", ok: vt.LTE, fail: vt.GT },
  minimum: { okStr: ">=", ok: vt.GTE, fail: vt.LT },
  exclusiveMaximum: { okStr: "<", ok: vt.LT, fail: vt.GTE },
  exclusiveMinimum: { okStr: ">", ok: vt.GT, fail: vt.LTE }
}, jm = {
  message: ({ keyword: e, schemaCode: t }) => (0, Kn.str)`must be ${Gn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Kn._)`{comparison: ${Gn[e].okStr}, limit: ${t}}`
}, Am = {
  keyword: Object.keys(Gn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: jm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Kn._)`${r} ${Gn[t].fail} ${n} || isNaN(${r})`);
  }
};
Da.default = Am;
var Ma = {};
Object.defineProperty(Ma, "__esModule", { value: !0 });
const zr = te, km = {
  message: ({ schemaCode: e }) => (0, zr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, zr._)`{multipleOf: ${e}}`
}, Cm = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: km,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), u = a ? (0, zr._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, zr._)`${i} !== parseInt(${i})`;
    e.fail$data((0, zr._)`(${n} === 0 || (${i} = ${r}/${n}, ${u}))`);
  }
};
Ma.default = Cm;
var La = {}, Fa = {};
Object.defineProperty(Fa, "__esModule", { value: !0 });
function zl(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Fa.default = zl;
zl.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(La, "__esModule", { value: !0 });
const Bt = te, Dm = M, Mm = Fa, Lm = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Bt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Bt._)`{limit: ${e}}`
}, Fm = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: Lm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Bt.operators.GT : Bt.operators.LT, i = s.opts.unicode === !1 ? (0, Bt._)`${r}.length` : (0, Bt._)`${(0, Dm.useFunc)(e.gen, Mm.default)}(${r})`;
    e.fail$data((0, Bt._)`${i} ${a} ${n}`);
  }
};
La.default = Fm;
var Va = {};
Object.defineProperty(Va, "__esModule", { value: !0 });
const Vm = x, Hn = te, Um = {
  message: ({ schemaCode: e }) => (0, Hn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Hn._)`{pattern: ${e}}`
}, zm = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: Um,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, i = a.opts.unicodeRegExp ? "u" : "", u = r ? (0, Hn._)`(new RegExp(${s}, ${i}))` : (0, Vm.usePattern)(e, n);
    e.fail$data((0, Hn._)`!${u}.test(${t})`);
  }
};
Va.default = zm;
var Ua = {};
Object.defineProperty(Ua, "__esModule", { value: !0 });
const qr = te, qm = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, qr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, qr._)`{limit: ${e}}`
}, Km = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: qm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? qr.operators.GT : qr.operators.LT;
    e.fail$data((0, qr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Ua.default = Km;
var za = {};
Object.defineProperty(za, "__esModule", { value: !0 });
const kr = x, Kr = te, Gm = M, Hm = {
  message: ({ params: { missingProperty: e } }) => (0, Kr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Kr._)`{missingProperty: ${e}}`
}, Wm = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: Hm,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: i } = e, { opts: u } = i;
    if (!a && r.length === 0)
      return;
    const c = r.length >= u.loopRequired;
    if (i.allErrors ? d() : l(), u.strictRequired) {
      const _ = e.parentSchema.properties, { definedProperties: w } = e.it;
      for (const g of r)
        if ((_ == null ? void 0 : _[g]) === void 0 && !w.has(g)) {
          const y = i.schemaEnv.baseId + i.errSchemaPath, h = `required property "${g}" is not defined at "${y}" (strictRequired)`;
          (0, Gm.checkStrictMode)(i, h, i.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(Kr.nil, m);
      else
        for (const _ of r)
          (0, kr.checkReportMissingProp)(e, _);
    }
    function l() {
      const _ = t.let("missing");
      if (c || a) {
        const w = t.let("valid", !0);
        e.block$data(w, () => P(_, w)), e.ok(w);
      } else
        t.if((0, kr.checkMissingProp)(e, r, _)), (0, kr.reportMissingProp)(e, _), t.else();
    }
    function m() {
      t.forOf("prop", n, (_) => {
        e.setParams({ missingProperty: _ }), t.if((0, kr.noPropertyInData)(t, s, _, u.ownProperties), () => e.error());
      });
    }
    function P(_, w) {
      e.setParams({ missingProperty: _ }), t.forOf(_, n, () => {
        t.assign(w, (0, kr.propertyInData)(t, s, _, u.ownProperties)), t.if((0, Kr.not)(w), () => {
          e.error(), t.break();
        });
      }, Kr.nil);
    }
  }
};
za.default = Wm;
var qa = {};
Object.defineProperty(qa, "__esModule", { value: !0 });
const Gr = te, Jm = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Gr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Gr._)`{limit: ${e}}`
}, Bm = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: Jm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Gr.operators.GT : Gr.operators.LT;
    e.fail$data((0, Gr._)`${r}.length ${s} ${n}`);
  }
};
qa.default = Bm;
var Ka = {}, rn = {};
Object.defineProperty(rn, "__esModule", { value: !0 });
const ql = rs;
ql.code = 'require("ajv/dist/runtime/equal").default';
rn.default = ql;
Object.defineProperty(Ka, "__esModule", { value: !0 });
const bs = ge, we = te, Xm = M, Ym = rn, Qm = {
  message: ({ params: { i: e, j: t } }) => (0, we.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, we._)`{i: ${e}, j: ${t}}`
}, Zm = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: Qm,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: u } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, bs.getSchemaTypes)(a.items) : [];
    e.block$data(c, l, (0, we._)`${i} === false`), e.ok(c);
    function l() {
      const w = t.let("i", (0, we._)`${r}.length`), g = t.let("j");
      e.setParams({ i: w, j: g }), t.assign(c, !0), t.if((0, we._)`${w} > 1`, () => (m() ? P : _)(w, g));
    }
    function m() {
      return d.length > 0 && !d.some((w) => w === "object" || w === "array");
    }
    function P(w, g) {
      const y = t.name("item"), h = (0, bs.checkDataTypes)(d, y, u.opts.strictNumbers, bs.DataType.Wrong), E = t.const("indices", (0, we._)`{}`);
      t.for((0, we._)`;${w}--;`, () => {
        t.let(y, (0, we._)`${r}[${w}]`), t.if(h, (0, we._)`continue`), d.length > 1 && t.if((0, we._)`typeof ${y} == "string"`, (0, we._)`${y} += "_"`), t.if((0, we._)`typeof ${E}[${y}] == "number"`, () => {
          t.assign(g, (0, we._)`${E}[${y}]`), e.error(), t.assign(c, !1).break();
        }).code((0, we._)`${E}[${y}] = ${w}`);
      });
    }
    function _(w, g) {
      const y = (0, Xm.useFunc)(t, Ym.default), h = t.name("outer");
      t.label(h).for((0, we._)`;${w}--;`, () => t.for((0, we._)`${g} = ${w}; ${g}--;`, () => t.if((0, we._)`${y}(${r}[${w}], ${r}[${g}])`, () => {
        e.error(), t.assign(c, !1).break(h);
      })));
    }
  }
};
Ka.default = Zm;
var Ga = {};
Object.defineProperty(Ga, "__esModule", { value: !0 });
const Ks = te, xm = M, ep = rn, tp = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Ks._)`{allowedValue: ${e}}`
}, rp = {
  keyword: "const",
  $data: !0,
  error: tp,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, Ks._)`!${(0, xm.useFunc)(t, ep.default)}(${r}, ${s})`) : e.fail((0, Ks._)`${a} !== ${r}`);
  }
};
Ga.default = rp;
var Ha = {};
Object.defineProperty(Ha, "__esModule", { value: !0 });
const Fr = te, np = M, sp = rn, ap = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Fr._)`{allowedValues: ${e}}`
}, op = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: ap,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const u = s.length >= i.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, np.useFunc)(t, sp.default));
    let l;
    if (u || n)
      l = t.let("valid"), e.block$data(l, m);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const _ = t.const("vSchema", a);
      l = (0, Fr.or)(...s.map((w, g) => P(_, g)));
    }
    e.pass(l);
    function m() {
      t.assign(l, !1), t.forOf("v", a, (_) => t.if((0, Fr._)`${d()}(${r}, ${_})`, () => t.assign(l, !0).break()));
    }
    function P(_, w) {
      const g = s[w];
      return typeof g == "object" && g !== null ? (0, Fr._)`${d()}(${r}, ${_}[${w}])` : (0, Fr._)`${r} === ${g}`;
    }
  }
};
Ha.default = op;
Object.defineProperty(Ca, "__esModule", { value: !0 });
const ip = Da, cp = Ma, lp = La, up = Va, dp = Ua, fp = za, hp = qa, mp = Ka, pp = Ga, $p = Ha, yp = [
  // number
  ip.default,
  cp.default,
  // string
  lp.default,
  up.default,
  // object
  dp.default,
  fp.default,
  // array
  hp.default,
  mp.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  pp.default,
  $p.default
];
Ca.default = yp;
var Wa = {}, br = {};
Object.defineProperty(br, "__esModule", { value: !0 });
br.validateAdditionalItems = void 0;
const Xt = te, Gs = M, _p = {
  message: ({ params: { len: e } }) => (0, Xt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Xt._)`{limit: ${e}}`
}, gp = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: _p,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Gs.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Kl(e, n);
  }
};
function Kl(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const u = r.const("len", (0, Xt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Xt._)`${u} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Gs.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, Xt._)`${u} <= ${t.length}`);
    r.if((0, Xt.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, u, (l) => {
      e.subschema({ keyword: a, dataProp: l, dataPropType: Gs.Type.Num }, d), i.allErrors || r.if((0, Xt.not)(d), () => r.break());
    });
  }
}
br.validateAdditionalItems = Kl;
br.default = gp;
var Ja = {}, Pr = {};
Object.defineProperty(Pr, "__esModule", { value: !0 });
Pr.validateTuple = void 0;
const wi = te, kn = M, vp = x, Ep = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Gl(e, "additionalItems", t);
    r.items = !0, !(0, kn.alwaysValidSchema)(r, t) && e.ok((0, vp.validateArray)(e));
  }
};
function Gl(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: u } = e;
  l(s), u.opts.unevaluated && r.length && u.items !== !0 && (u.items = kn.mergeEvaluated.items(n, r.length, u.items));
  const c = n.name("valid"), d = n.const("len", (0, wi._)`${a}.length`);
  r.forEach((m, P) => {
    (0, kn.alwaysValidSchema)(u, m) || (n.if((0, wi._)`${d} > ${P}`, () => e.subschema({
      keyword: i,
      schemaProp: P,
      dataProp: P
    }, c)), e.ok(c));
  });
  function l(m) {
    const { opts: P, errSchemaPath: _ } = u, w = r.length, g = w === m.minItems && (w === m.maxItems || m[t] === !1);
    if (P.strictTuples && !g) {
      const y = `"${i}" is ${w}-tuple, but minItems or maxItems/${t} are not specified or different at path "${_}"`;
      (0, kn.checkStrictMode)(u, y, P.strictTuples);
    }
  }
}
Pr.validateTuple = Gl;
Pr.default = Ep;
Object.defineProperty(Ja, "__esModule", { value: !0 });
const wp = Pr, Sp = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, wp.validateTuple)(e, "items")
};
Ja.default = Sp;
var Ba = {};
Object.defineProperty(Ba, "__esModule", { value: !0 });
const Si = te, bp = M, Pp = x, Np = br, Op = {
  message: ({ params: { len: e } }) => (0, Si.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Si._)`{limit: ${e}}`
}, Rp = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: Op,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, bp.alwaysValidSchema)(n, t) && (s ? (0, Np.validateAdditionalItems)(e, s) : e.ok((0, Pp.validateArray)(e)));
  }
};
Ba.default = Rp;
var Xa = {};
Object.defineProperty(Xa, "__esModule", { value: !0 });
const Ge = te, hn = M, Tp = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ge.str)`must contain at least ${e} valid item(s)` : (0, Ge.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ge._)`{minContains: ${e}}` : (0, Ge._)`{minContains: ${e}, maxContains: ${t}}`
}, Ip = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: Tp,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let i, u;
    const { minContains: c, maxContains: d } = n;
    a.opts.next ? (i = c === void 0 ? 1 : c, u = d) : i = 1;
    const l = t.const("len", (0, Ge._)`${s}.length`);
    if (e.setParams({ min: i, max: u }), u === void 0 && i === 0) {
      (0, hn.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (u !== void 0 && i > u) {
      (0, hn.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, hn.alwaysValidSchema)(a, r)) {
      let g = (0, Ge._)`${l} >= ${i}`;
      u !== void 0 && (g = (0, Ge._)`${g} && ${l} <= ${u}`), e.pass(g);
      return;
    }
    a.items = !0;
    const m = t.name("valid");
    u === void 0 && i === 1 ? _(m, () => t.if(m, () => t.break())) : i === 0 ? (t.let(m, !0), u !== void 0 && t.if((0, Ge._)`${s}.length > 0`, P)) : (t.let(m, !1), P()), e.result(m, () => e.reset());
    function P() {
      const g = t.name("_valid"), y = t.let("count", 0);
      _(g, () => t.if(g, () => w(y)));
    }
    function _(g, y) {
      t.forRange("i", 0, l, (h) => {
        e.subschema({
          keyword: "contains",
          dataProp: h,
          dataPropType: hn.Type.Num,
          compositeRule: !0
        }, g), y();
      });
    }
    function w(g) {
      t.code((0, Ge._)`${g}++`), u === void 0 ? t.if((0, Ge._)`${g} >= ${i}`, () => t.assign(m, !0).break()) : (t.if((0, Ge._)`${g} > ${u}`, () => t.assign(m, !1).break()), i === 1 ? t.assign(m, !0) : t.if((0, Ge._)`${g} >= ${i}`, () => t.assign(m, !0)));
    }
  }
};
Xa.default = Ip;
var Hl = {};
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
    for (const w in d) {
      const g = d[w];
      if (g.length === 0)
        continue;
      const y = (0, n.propertyInData)(l, m, w, P.opts.ownProperties);
      c.setParams({
        property: w,
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
    const { gen: l, data: m, keyword: P, it: _ } = c, w = l.name("valid");
    for (const g in d)
      (0, r.alwaysValidSchema)(_, d[g]) || (l.if(
        (0, n.propertyInData)(l, m, g, _.opts.ownProperties),
        () => {
          const y = c.subschema({ keyword: P, schemaProp: g }, w);
          c.mergeValidEvaluated(y, w);
        },
        () => l.var(w, !0)
        // TODO var
      ), c.ok(w));
  }
  e.validateSchemaDeps = u, e.default = s;
})(Hl);
var Ya = {};
Object.defineProperty(Ya, "__esModule", { value: !0 });
const Wl = te, jp = M, Ap = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Wl._)`{propertyName: ${e.propertyName}}`
}, kp = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: Ap,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, jp.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, Wl.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Ya.default = kp;
var os = {};
Object.defineProperty(os, "__esModule", { value: !0 });
const mn = x, Xe = te, Cp = dt, pn = M, Dp = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Xe._)`{additionalProperty: ${e.additionalProperty}}`
}, Mp = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Dp,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: u, opts: c } = i;
    if (i.props = !0, c.removeAdditional !== "all" && (0, pn.alwaysValidSchema)(i, r))
      return;
    const d = (0, mn.allSchemaProperties)(n.properties), l = (0, mn.allSchemaProperties)(n.patternProperties);
    m(), e.ok((0, Xe._)`${a} === ${Cp.default.errors}`);
    function m() {
      t.forIn("key", s, (y) => {
        !d.length && !l.length ? w(y) : t.if(P(y), () => w(y));
      });
    }
    function P(y) {
      let h;
      if (d.length > 8) {
        const E = (0, pn.schemaRefOrVal)(i, n.properties, "properties");
        h = (0, mn.isOwnProperty)(t, E, y);
      } else d.length ? h = (0, Xe.or)(...d.map((E) => (0, Xe._)`${y} === ${E}`)) : h = Xe.nil;
      return l.length && (h = (0, Xe.or)(h, ...l.map((E) => (0, Xe._)`${(0, mn.usePattern)(e, E)}.test(${y})`))), (0, Xe.not)(h);
    }
    function _(y) {
      t.code((0, Xe._)`delete ${s}[${y}]`);
    }
    function w(y) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        _(y);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: y }), e.error(), u || t.break();
        return;
      }
      if (typeof r == "object" && !(0, pn.alwaysValidSchema)(i, r)) {
        const h = t.name("valid");
        c.removeAdditional === "failing" ? (g(y, h, !1), t.if((0, Xe.not)(h), () => {
          e.reset(), _(y);
        })) : (g(y, h), u || t.if((0, Xe.not)(h), () => t.break()));
      }
    }
    function g(y, h, E) {
      const N = {
        keyword: "additionalProperties",
        dataProp: y,
        dataPropType: pn.Type.Str
      };
      E === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, h);
    }
  }
};
os.default = Mp;
var Qa = {};
Object.defineProperty(Qa, "__esModule", { value: !0 });
const Lp = xe, bi = x, Ps = M, Pi = os, Fp = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Pi.default.code(new Lp.KeywordCxt(a, Pi.default, "additionalProperties"));
    const i = (0, bi.allSchemaProperties)(r);
    for (const m of i)
      a.definedProperties.add(m);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = Ps.mergeEvaluated.props(t, (0, Ps.toHash)(i), a.props));
    const u = i.filter((m) => !(0, Ps.alwaysValidSchema)(a, r[m]));
    if (u.length === 0)
      return;
    const c = t.name("valid");
    for (const m of u)
      d(m) ? l(m) : (t.if((0, bi.propertyInData)(t, s, m, a.opts.ownProperties)), l(m), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(m), e.ok(c);
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
Qa.default = Fp;
var Za = {};
Object.defineProperty(Za, "__esModule", { value: !0 });
const Ni = x, $n = te, Oi = M, Ri = M, Vp = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, u = (0, Ni.allSchemaProperties)(r), c = u.filter((g) => (0, Oi.alwaysValidSchema)(a, r[g]));
    if (u.length === 0 || c.length === u.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, l = t.name("valid");
    a.props !== !0 && !(a.props instanceof $n.Name) && (a.props = (0, Ri.evaluatedPropsToName)(t, a.props));
    const { props: m } = a;
    P();
    function P() {
      for (const g of u)
        d && _(g), a.allErrors ? w(g) : (t.var(l, !0), w(g), t.if(l));
    }
    function _(g) {
      for (const y in d)
        new RegExp(g).test(y) && (0, Oi.checkStrictMode)(a, `property ${y} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function w(g) {
      t.forIn("key", n, (y) => {
        t.if((0, $n._)`${(0, Ni.usePattern)(e, g)}.test(${y})`, () => {
          const h = c.includes(g);
          h || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: y,
            dataPropType: Ri.Type.Str
          }, l), a.opts.unevaluated && m !== !0 ? t.assign((0, $n._)`${m}[${y}]`, !0) : !h && !a.allErrors && t.if((0, $n.not)(l), () => t.break());
        });
      });
    }
  }
};
Za.default = Vp;
var xa = {};
Object.defineProperty(xa, "__esModule", { value: !0 });
const Up = M, zp = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, Up.alwaysValidSchema)(n, r)) {
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
xa.default = zp;
var eo = {};
Object.defineProperty(eo, "__esModule", { value: !0 });
const qp = x, Kp = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: qp.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
eo.default = Kp;
var to = {};
Object.defineProperty(to, "__esModule", { value: !0 });
const Cn = te, Gp = M, Hp = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Cn._)`{passingSchemas: ${e.passing}}`
}, Wp = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Hp,
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
        (0, Gp.alwaysValidSchema)(s, l) ? t.var(c, !0) : P = e.subschema({
          keyword: "oneOf",
          schemaProp: m,
          compositeRule: !0
        }, c), m > 0 && t.if((0, Cn._)`${c} && ${i}`).assign(i, !1).assign(u, (0, Cn._)`[${u}, ${m}]`).else(), t.if(c, () => {
          t.assign(i, !0), t.assign(u, m), P && e.mergeEvaluated(P, Cn.Name);
        });
      });
    }
  }
};
to.default = Wp;
var ro = {};
Object.defineProperty(ro, "__esModule", { value: !0 });
const Jp = M, Bp = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, Jp.alwaysValidSchema)(n, a))
        return;
      const u = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(u);
    });
  }
};
ro.default = Bp;
var no = {};
Object.defineProperty(no, "__esModule", { value: !0 });
const Wn = te, Jl = M, Xp = {
  message: ({ params: e }) => (0, Wn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Wn._)`{failingKeyword: ${e.ifClause}}`
}, Yp = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: Xp,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Jl.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Ti(n, "then"), a = Ti(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), u = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(u, d("then", l), d("else", l));
    } else s ? t.if(u, d("then")) : t.if((0, Wn.not)(u), d("else"));
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
        t.assign(i, u), e.mergeValidEvaluated(P, i), m ? t.assign(m, (0, Wn._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function Ti(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Jl.alwaysValidSchema)(e, r);
}
no.default = Yp;
var so = {};
Object.defineProperty(so, "__esModule", { value: !0 });
const Qp = M, Zp = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, Qp.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
so.default = Zp;
Object.defineProperty(Wa, "__esModule", { value: !0 });
const xp = br, e$ = Ja, t$ = Pr, r$ = Ba, n$ = Xa, s$ = Hl, a$ = Ya, o$ = os, i$ = Qa, c$ = Za, l$ = xa, u$ = eo, d$ = to, f$ = ro, h$ = no, m$ = so;
function p$(e = !1) {
  const t = [
    // any
    l$.default,
    u$.default,
    d$.default,
    f$.default,
    h$.default,
    m$.default,
    // object
    a$.default,
    o$.default,
    s$.default,
    i$.default,
    c$.default
  ];
  return e ? t.push(e$.default, r$.default) : t.push(xp.default, t$.default), t.push(n$.default), t;
}
Wa.default = p$;
var ao = {}, oo = {};
Object.defineProperty(oo, "__esModule", { value: !0 });
const pe = te, $$ = {
  message: ({ schemaCode: e }) => (0, pe.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, pe._)`{format: ${e}}`
}, y$ = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: $$,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: u } = e, { opts: c, errSchemaPath: d, schemaEnv: l, self: m } = u;
    if (!c.validateFormats)
      return;
    s ? P() : _();
    function P() {
      const w = r.scopeValue("formats", {
        ref: m.formats,
        code: c.code.formats
      }), g = r.const("fDef", (0, pe._)`${w}[${i}]`), y = r.let("fType"), h = r.let("format");
      r.if((0, pe._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => r.assign(y, (0, pe._)`${g}.type || "string"`).assign(h, (0, pe._)`${g}.validate`), () => r.assign(y, (0, pe._)`"string"`).assign(h, g)), e.fail$data((0, pe.or)(E(), N()));
      function E() {
        return c.strictSchema === !1 ? pe.nil : (0, pe._)`${i} && !${h}`;
      }
      function N() {
        const R = l.$async ? (0, pe._)`(${g}.async ? await ${h}(${n}) : ${h}(${n}))` : (0, pe._)`${h}(${n})`, I = (0, pe._)`(typeof ${h} == "function" ? ${R} : ${h}.test(${n}))`;
        return (0, pe._)`${h} && ${h} !== true && ${y} === ${t} && !${I}`;
      }
    }
    function _() {
      const w = m.formats[a];
      if (!w) {
        E();
        return;
      }
      if (w === !0)
        return;
      const [g, y, h] = N(w);
      g === t && e.pass(R());
      function E() {
        if (c.strictSchema === !1) {
          m.logger.warn(I());
          return;
        }
        throw new Error(I());
        function I() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function N(I) {
        const z = I instanceof RegExp ? (0, pe.regexpCode)(I) : c.code.formats ? (0, pe._)`${c.code.formats}${(0, pe.getProperty)(a)}` : void 0, W = r.scopeValue("formats", { key: a, ref: I, code: z });
        return typeof I == "object" && !(I instanceof RegExp) ? [I.type || "string", I.validate, (0, pe._)`${W}.validate`] : ["string", I, W];
      }
      function R() {
        if (typeof w == "object" && !(w instanceof RegExp) && w.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, pe._)`await ${h}(${n})`;
        }
        return typeof y == "function" ? (0, pe._)`${h}(${n})` : (0, pe._)`${h}.test(${n})`;
      }
    }
  }
};
oo.default = y$;
Object.defineProperty(ao, "__esModule", { value: !0 });
const _$ = oo, g$ = [_$.default];
ao.default = g$;
var vr = {};
Object.defineProperty(vr, "__esModule", { value: !0 });
vr.contentVocabulary = vr.metadataVocabulary = void 0;
vr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
vr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(ja, "__esModule", { value: !0 });
const v$ = Aa, E$ = Ca, w$ = Wa, S$ = ao, Ii = vr, b$ = [
  v$.default,
  E$.default,
  (0, w$.default)(),
  S$.default,
  Ii.metadataVocabulary,
  Ii.contentVocabulary
];
ja.default = b$;
var io = {}, is = {};
Object.defineProperty(is, "__esModule", { value: !0 });
is.DiscrError = void 0;
var ji;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(ji || (is.DiscrError = ji = {}));
Object.defineProperty(io, "__esModule", { value: !0 });
const lr = te, Hs = is, Ai = Le, P$ = Sr, N$ = M, O$ = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Hs.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, lr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, R$ = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: O$,
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
    const c = t.let("valid", !1), d = t.const("tag", (0, lr._)`${r}${(0, lr.getProperty)(u)}`);
    t.if((0, lr._)`typeof ${d} == "string"`, () => l(), () => e.error(!1, { discrError: Hs.DiscrError.Tag, tag: d, tagName: u })), e.ok(c);
    function l() {
      const _ = P();
      t.if(!1);
      for (const w in _)
        t.elseIf((0, lr._)`${d} === ${w}`), t.assign(c, m(_[w]));
      t.else(), e.error(!1, { discrError: Hs.DiscrError.Mapping, tag: d, tagName: u }), t.endIf();
    }
    function m(_) {
      const w = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: _ }, w);
      return e.mergeEvaluated(g, lr.Name), w;
    }
    function P() {
      var _;
      const w = {}, g = h(s);
      let y = !0;
      for (let R = 0; R < i.length; R++) {
        let I = i[R];
        if (I != null && I.$ref && !(0, N$.schemaHasRulesButRef)(I, a.self.RULES)) {
          const W = I.$ref;
          if (I = Ai.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, W), I instanceof Ai.SchemaEnv && (I = I.schema), I === void 0)
            throw new P$.default(a.opts.uriResolver, a.baseId, W);
        }
        const z = (_ = I == null ? void 0 : I.properties) === null || _ === void 0 ? void 0 : _[u];
        if (typeof z != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${u}"`);
        y = y && (g || h(I)), E(z, R);
      }
      if (!y)
        throw new Error(`discriminator: "${u}" must be required`);
      return w;
      function h({ required: R }) {
        return Array.isArray(R) && R.includes(u);
      }
      function E(R, I) {
        if (R.const)
          N(R.const, I);
        else if (R.enum)
          for (const z of R.enum)
            N(z, I);
        else
          throw new Error(`discriminator: "properties/${u}" must have "const" or "enum"`);
      }
      function N(R, I) {
        if (typeof R != "string" || R in w)
          throw new Error(`discriminator: "${u}" values must be unique strings`);
        w[R] = I;
      }
    }
  }
};
io.default = R$;
const T$ = "http://json-schema.org/draft-07/schema#", I$ = "http://json-schema.org/draft-07/schema#", j$ = "Core schema meta-schema", A$ = {
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
}, k$ = [
  "object",
  "boolean"
], C$ = {
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
}, D$ = {
  $schema: T$,
  $id: I$,
  title: j$,
  definitions: A$,
  type: k$,
  properties: C$,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Yc, n = ja, s = io, a = D$, i = ["/properties"], u = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((w) => this.addVocabulary(w)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const w = this.opts.$data ? this.$dataMetaSchema(a, i) : a;
      this.addMetaSchema(w, u, !1), this.refs["http://json-schema.org/schema"] = u;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(u) ? u : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var d = xe;
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
  var m = tn;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return m.default;
  } });
  var P = Sr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return P.default;
  } });
})(Fs, Fs.exports);
var M$ = Fs.exports, Ws = { exports: {} }, Bl = {};
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
  const _ = /\/|:/, w = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function g(V) {
    return _.test(V) && w.test(V);
  }
  const y = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function h(V) {
    return y.lastIndex = 0, y.test(V);
  }
  const E = -2147483648, N = 2 ** 31 - 1;
  function R(V) {
    return Number.isInteger(V) && V <= N && V >= E;
  }
  function I(V) {
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
})(Bl);
var Xl = {}, Js = { exports: {} }, Yl = {}, et = {}, Er = {}, nn = {}, Z = {}, xr = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(E) {
      if (super(), !e.IDENTIFIER.test(E))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = E;
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
    constructor(E) {
      super(), this._items = typeof E == "string" ? [E] : E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const E = this._items[0];
      return E === "" || E === '""';
    }
    get str() {
      var E;
      return (E = this._str) !== null && E !== void 0 ? E : this._str = this._items.reduce((N, R) => `${N}${R}`, "");
    }
    get names() {
      var E;
      return (E = this._names) !== null && E !== void 0 ? E : this._names = this._items.reduce((N, R) => (R instanceof r && (N[R.str] = (N[R.str] || 0) + 1), N), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(h, ...E) {
    const N = [h[0]];
    let R = 0;
    for (; R < E.length; )
      u(N, E[R]), N.push(h[++R]);
    return new n(N);
  }
  e._ = s;
  const a = new n("+");
  function i(h, ...E) {
    const N = [_(h[0])];
    let R = 0;
    for (; R < E.length; )
      N.push(a), u(N, E[R]), N.push(a, _(h[++R]));
    return c(N), new n(N);
  }
  e.str = i;
  function u(h, E) {
    E instanceof n ? h.push(...E._items) : E instanceof r ? h.push(E) : h.push(m(E));
  }
  e.addCodeArg = u;
  function c(h) {
    let E = 1;
    for (; E < h.length - 1; ) {
      if (h[E] === a) {
        const N = d(h[E - 1], h[E + 1]);
        if (N !== void 0) {
          h.splice(E - 1, 3, N);
          continue;
        }
        h[E++] = "+";
      }
      E++;
    }
  }
  function d(h, E) {
    if (E === '""')
      return h;
    if (h === '""')
      return E;
    if (typeof h == "string")
      return E instanceof r || h[h.length - 1] !== '"' ? void 0 : typeof E != "string" ? `${h.slice(0, -1)}${E}"` : E[0] === '"' ? h.slice(0, -1) + E.slice(1) : void 0;
    if (typeof E == "string" && E[0] === '"' && !(h instanceof r))
      return `"${h}${E.slice(1)}`;
  }
  function l(h, E) {
    return E.emptyStr() ? h : h.emptyStr() ? E : i`${h}${E}`;
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
  function w(h) {
    return typeof h == "string" && e.IDENTIFIER.test(h) ? new n(`.${h}`) : s`[${h}]`;
  }
  e.getProperty = w;
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
})(xr);
var Bs = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = xr;
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
      const P = this.toName(d), { prefix: _ } = P, w = (m = l.key) !== null && m !== void 0 ? m : l.ref;
      let g = this._values[_];
      if (g) {
        const E = g.get(w);
        if (E)
          return E;
      } else
        g = this._values[_] = /* @__PURE__ */ new Map();
      g.set(w, P);
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
      for (const w in d) {
        const g = d[w];
        if (!g)
          continue;
        const y = m[w] = m[w] || /* @__PURE__ */ new Map();
        g.forEach((h) => {
          if (y.has(h))
            return;
          y.set(h, n.Started);
          let E = l(h);
          if (E) {
            const N = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            _ = (0, t._)`${_}${N} ${h} = ${E};${this.opts._n}`;
          } else if (E = P == null ? void 0 : P(h))
            _ = (0, t._)`${_}${E}${this.opts._n}`;
          else
            throw new r(h);
          y.set(h, n.Completed);
        });
      }
      return _;
    }
  }
  e.ValueScope = u;
})(Bs);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = xr, r = Bs;
  var n = xr;
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
  class w extends _ {
    render(o) {
      return "{" + o._n + super.render(o) + "}" + o._n;
    }
  }
  class g extends _ {
  }
  class y extends w {
  }
  y.kind = "else";
  class h extends w {
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
  class E extends w {
  }
  E.kind = "for";
  class N extends E {
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
  class R extends E {
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
  class I extends E {
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
  class z extends w {
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
  class ue extends w {
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
  class V extends w {
    constructor(o) {
      super(), this.error = o;
    }
    render(o) {
      return `catch(${this.error})` + super.render(o);
    }
  }
  V.kind = "catch";
  class H extends w {
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
      return this._for(new I("of", j, A, f), () => b(A));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(o, f, b, j = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(o, (0, t._)`Object.keys(${f})`, b);
      const A = this._scope.toName(o);
      return this._for(new I("in", j, A, f), () => b(A));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(E);
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
  const T = p(e.operators.OR);
  function v(...$) {
    return $.reduce(T);
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
const ce = Z, L$ = xr;
function F$(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
L.toHash = F$;
function V$(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Ql(e, t), !Zl(t, e.self.RULES.all));
}
L.alwaysValidSchema = V$;
function Ql(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || tu(e, `unknown keyword: "${a}"`);
}
L.checkUnknownRules = Ql;
function Zl(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
L.schemaHasRules = Zl;
function U$(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
L.schemaHasRulesButRef = U$;
function z$({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ce._)`${r}`;
  }
  return (0, ce._)`${e}${t}${(0, ce.getProperty)(n)}`;
}
L.schemaRefOrVal = z$;
function q$(e) {
  return xl(decodeURIComponent(e));
}
L.unescapeFragment = q$;
function K$(e) {
  return encodeURIComponent(co(e));
}
L.escapeFragment = K$;
function co(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
L.escapeJsonPointer = co;
function xl(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
L.unescapeJsonPointer = xl;
function G$(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
L.eachItem = G$;
function ki({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, i, u) => {
    const c = i === void 0 ? a : i instanceof ce.Name ? (a instanceof ce.Name ? e(s, a, i) : t(s, a, i), i) : a instanceof ce.Name ? (t(s, i, a), a) : r(a, i);
    return u === ce.Name && !(c instanceof ce.Name) ? n(s, c) : c;
  };
}
L.mergeEvaluated = {
  props: ki({
    mergeNames: (e, t, r) => e.if((0, ce._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, ce._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, ce._)`${r} || {}`).code((0, ce._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, ce._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, ce._)`${r} || {}`), lo(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: eu
  }),
  items: ki({
    mergeNames: (e, t, r) => e.if((0, ce._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ce._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ce._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ce._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function eu(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ce._)`{}`);
  return t !== void 0 && lo(e, r, t), r;
}
L.evaluatedPropsToName = eu;
function lo(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ce._)`${t}${(0, ce.getProperty)(n)}`, !0));
}
L.setEvaluated = lo;
const Ci = {};
function H$(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Ci[t.code] || (Ci[t.code] = new L$._Code(t.code))
  });
}
L.useFunc = H$;
var Xs;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Xs || (L.Type = Xs = {}));
function W$(e, t, r) {
  if (e instanceof ce.Name) {
    const n = t === Xs.Num;
    return r ? n ? (0, ce._)`"[" + ${e} + "]"` : (0, ce._)`"['" + ${e} + "']"` : n ? (0, ce._)`"/" + ${e}` : (0, ce._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ce.getProperty)(e).toString() : "/" + co(e);
}
L.getErrorPath = W$;
function tu(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
L.checkStrictMode = tu;
var ft = {};
Object.defineProperty(ft, "__esModule", { value: !0 });
const Re = Z, J$ = {
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
ft.default = J$;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = Z, r = L, n = ft;
  e.keywordError = {
    message: ({ keyword: y }) => (0, t.str)`must pass "${y}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: y, schemaType: h }) => h ? (0, t.str)`"${y}" keyword must be ${h} ($data)` : (0, t.str)`"${y}" keyword is invalid ($data)`
  };
  function s(y, h = e.keywordError, E, N) {
    const { it: R } = y, { gen: I, compositeRule: z, allErrors: W } = R, ue = m(y, h, E);
    N ?? (z || W) ? c(I, ue) : d(R, (0, t._)`[${ue}]`);
  }
  e.reportError = s;
  function a(y, h = e.keywordError, E) {
    const { it: N } = y, { gen: R, compositeRule: I, allErrors: z } = N, W = m(y, h, E);
    c(R, W), I || z || d(N, n.default.vErrors);
  }
  e.reportExtraError = a;
  function i(y, h) {
    y.assign(n.default.errors, h), y.if((0, t._)`${n.default.vErrors} !== null`, () => y.if(h, () => y.assign((0, t._)`${n.default.vErrors}.length`, h), () => y.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function u({ gen: y, keyword: h, schemaValue: E, data: N, errsCount: R, it: I }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const z = y.name("err");
    y.forRange("i", R, n.default.errors, (W) => {
      y.const(z, (0, t._)`${n.default.vErrors}[${W}]`), y.if((0, t._)`${z}.instancePath === undefined`, () => y.assign((0, t._)`${z}.instancePath`, (0, t.strConcat)(n.default.instancePath, I.errorPath))), y.assign((0, t._)`${z}.schemaPath`, (0, t.str)`${I.errSchemaPath}/${h}`), I.opts.verbose && (y.assign((0, t._)`${z}.schema`, E), y.assign((0, t._)`${z}.data`, N));
    });
  }
  e.extendErrors = u;
  function c(y, h) {
    const E = y.const("err", h);
    y.if((0, t._)`${n.default.vErrors} === null`, () => y.assign(n.default.vErrors, (0, t._)`[${E}]`), (0, t._)`${n.default.vErrors}.push(${E})`), y.code((0, t._)`${n.default.errors}++`);
  }
  function d(y, h) {
    const { gen: E, validateName: N, schemaEnv: R } = y;
    R.$async ? E.throw((0, t._)`new ${y.ValidationError}(${h})`) : (E.assign((0, t._)`${N}.errors`, h), E.return(!1));
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
  function m(y, h, E) {
    const { createErrors: N } = y.it;
    return N === !1 ? (0, t._)`{}` : P(y, h, E);
  }
  function P(y, h, E = {}) {
    const { gen: N, it: R } = y, I = [
      _(R, E),
      w(y, E)
    ];
    return g(y, h, I), N.object(...I);
  }
  function _({ errorPath: y }, { instancePath: h }) {
    const E = h ? (0, t.str)`${y}${(0, r.getErrorPath)(h, r.Type.Str)}` : y;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, E)];
  }
  function w({ keyword: y, it: { errSchemaPath: h } }, { schemaPath: E, parentSchema: N }) {
    let R = N ? h : (0, t.str)`${h}/${y}`;
    return E && (R = (0, t.str)`${R}${(0, r.getErrorPath)(E, r.Type.Str)}`), [l.schemaPath, R];
  }
  function g(y, { params: h, message: E }, N) {
    const { keyword: R, data: I, schemaValue: z, it: W } = y, { opts: ue, propertyName: V, topSchemaRef: H, schemaPath: ne } = W;
    N.push([l.keyword, R], [l.params, typeof h == "function" ? h(y) : h || (0, t._)`{}`]), ue.messages && N.push([l.message, typeof E == "function" ? E(y) : E]), ue.verbose && N.push([l.schema, z], [l.parentSchema, (0, t._)`${H}${ne}`], [n.default.data, I]), V && N.push([l.propertyName, V]);
  }
})(nn);
Object.defineProperty(Er, "__esModule", { value: !0 });
Er.boolOrEmptySchema = Er.topBoolOrEmptySchema = void 0;
const B$ = nn, X$ = Z, Y$ = ft, Q$ = {
  message: "boolean schema is false"
};
function Z$(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? ru(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(Y$.default.data) : (t.assign((0, X$._)`${n}.errors`, null), t.return(!0));
}
Er.topBoolOrEmptySchema = Z$;
function x$(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), ru(e)) : r.var(t, !0);
}
Er.boolOrEmptySchema = x$;
function ru(e, t) {
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
  (0, B$.reportError)(s, Q$, void 0, t);
}
var ve = {}, tr = {};
Object.defineProperty(tr, "__esModule", { value: !0 });
tr.getRules = tr.isJSONType = void 0;
const ey = ["string", "number", "integer", "boolean", "null", "object", "array"], ty = new Set(ey);
function ry(e) {
  return typeof e == "string" && ty.has(e);
}
tr.isJSONType = ry;
function ny() {
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
tr.getRules = ny;
var $t = {};
Object.defineProperty($t, "__esModule", { value: !0 });
$t.shouldUseRule = $t.shouldUseGroup = $t.schemaHasRulesForType = void 0;
function sy({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && nu(e, n);
}
$t.schemaHasRulesForType = sy;
function nu(e, t) {
  return t.rules.some((r) => su(e, r));
}
$t.shouldUseGroup = nu;
function su(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
$t.shouldUseRule = su;
Object.defineProperty(ve, "__esModule", { value: !0 });
ve.reportTypeError = ve.checkDataTypes = ve.checkDataType = ve.coerceAndCheckDataType = ve.getJSONTypes = ve.getSchemaTypes = ve.DataType = void 0;
const ay = tr, oy = $t, iy = nn, Y = Z, au = L;
var mr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(mr || (ve.DataType = mr = {}));
function cy(e) {
  const t = ou(e.type);
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
ve.getSchemaTypes = cy;
function ou(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(ay.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
ve.getJSONTypes = ou;
function ly(e, t) {
  const { gen: r, data: n, opts: s } = e, a = uy(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, oy.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const u = uo(t, n, s.strictNumbers, mr.Wrong);
    r.if(u, () => {
      a.length ? dy(e, t, a) : fo(e);
    });
  }
  return i;
}
ve.coerceAndCheckDataType = ly;
const iu = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function uy(e, t) {
  return t ? e.filter((r) => iu.has(r) || t === "array" && r === "array") : [];
}
function dy(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, Y._)`typeof ${s}`), u = n.let("coerced", (0, Y._)`undefined`);
  a.coerceTypes === "array" && n.if((0, Y._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, Y._)`${s}[0]`).assign(i, (0, Y._)`typeof ${s}`).if(uo(t, s, a.strictNumbers), () => n.assign(u, s))), n.if((0, Y._)`${u} !== undefined`);
  for (const d of r)
    (iu.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), fo(e), n.endIf(), n.if((0, Y._)`${u} !== undefined`, () => {
    n.assign(s, u), fy(e, u);
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
function fy({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, Y._)`${t} !== undefined`, () => e.assign((0, Y._)`${t}[${r}]`, n));
}
function Ys(e, t, r, n = mr.Correct) {
  const s = n === mr.Correct ? Y.operators.EQ : Y.operators.NEQ;
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
  return n === mr.Correct ? a : (0, Y.not)(a);
  function i(u = Y.nil) {
    return (0, Y.and)((0, Y._)`typeof ${t} == "number"`, u, r ? (0, Y._)`isFinite(${t})` : Y.nil);
  }
}
ve.checkDataType = Ys;
function uo(e, t, r, n) {
  if (e.length === 1)
    return Ys(e[0], t, r, n);
  let s;
  const a = (0, au.toHash)(e);
  if (a.array && a.object) {
    const i = (0, Y._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, Y._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = Y.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, Y.and)(s, Ys(i, t, r, n));
  return s;
}
ve.checkDataTypes = uo;
const hy = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, Y._)`{type: ${e}}` : (0, Y._)`{type: ${t}}`
};
function fo(e) {
  const t = my(e);
  (0, iy.reportError)(t, hy);
}
ve.reportTypeError = fo;
function my(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, au.schemaRefOrVal)(e, n, "type");
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
var cs = {};
Object.defineProperty(cs, "__esModule", { value: !0 });
cs.assignDefaults = void 0;
const or = Z, py = L;
function $y(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      Di(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => Di(e, a, s.default));
}
cs.assignDefaults = $y;
function Di(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: i } = e;
  if (r === void 0)
    return;
  const u = (0, or._)`${a}${(0, or.getProperty)(t)}`;
  if (s) {
    (0, py.checkStrictMode)(e, `default is ignored for: ${u}`);
    return;
  }
  let c = (0, or._)`${u} === undefined`;
  i.useDefaults === "empty" && (c = (0, or._)`${c} || ${u} === null || ${u} === ""`), n.if(c, (0, or._)`${u} = ${(0, or.stringify)(r)}`);
}
var ut = {}, ee = {};
Object.defineProperty(ee, "__esModule", { value: !0 });
ee.validateUnion = ee.validateArray = ee.usePattern = ee.callValidateCode = ee.schemaProperties = ee.allSchemaProperties = ee.noPropertyInData = ee.propertyInData = ee.isOwnProperty = ee.hasPropFunc = ee.reportMissingProp = ee.checkMissingProp = ee.checkReportMissingProp = void 0;
const he = Z, ho = L, Et = ft, yy = L;
function _y(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(po(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, he._)`${t}` }, !0), e.error();
  });
}
ee.checkReportMissingProp = _y;
function gy({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, he.or)(...n.map((a) => (0, he.and)(po(e, t, a, r.ownProperties), (0, he._)`${s} = ${a}`)));
}
ee.checkMissingProp = gy;
function vy(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ee.reportMissingProp = vy;
function cu(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, he._)`Object.prototype.hasOwnProperty`
  });
}
ee.hasPropFunc = cu;
function mo(e, t, r) {
  return (0, he._)`${cu(e)}.call(${t}, ${r})`;
}
ee.isOwnProperty = mo;
function Ey(e, t, r, n) {
  const s = (0, he._)`${t}${(0, he.getProperty)(r)} !== undefined`;
  return n ? (0, he._)`${s} && ${mo(e, t, r)}` : s;
}
ee.propertyInData = Ey;
function po(e, t, r, n) {
  const s = (0, he._)`${t}${(0, he.getProperty)(r)} === undefined`;
  return n ? (0, he.or)(s, (0, he.not)(mo(e, t, r))) : s;
}
ee.noPropertyInData = po;
function lu(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ee.allSchemaProperties = lu;
function wy(e, t) {
  return lu(t).filter((r) => !(0, ho.alwaysValidSchema)(e, t[r]));
}
ee.schemaProperties = wy;
function Sy({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: i }, u, c, d) {
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
ee.callValidateCode = Sy;
const by = (0, he._)`new RegExp`;
function Py({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, he._)`${s.code === "new RegExp" ? by : (0, yy.useFunc)(e, s)}(${r}, ${n})`
  });
}
ee.usePattern = Py;
function Ny(e) {
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
        dataPropType: ho.Type.Num
      }, a), t.if((0, he.not)(a), u);
    });
  }
}
ee.validateArray = Ny;
function Oy(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, ho.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
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
ee.validateUnion = Oy;
Object.defineProperty(ut, "__esModule", { value: !0 });
ut.validateKeywordUsage = ut.validSchemaType = ut.funcKeywordCode = ut.macroKeywordCode = void 0;
const Ae = Z, Yt = ft, Ry = ee, Ty = nn;
function Iy(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: i } = e, u = t.macro.call(i.self, s, a, i), c = uu(r, n, u);
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
ut.macroKeywordCode = Iy;
function jy(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: i, $data: u, it: c } = e;
  ky(c, t);
  const d = !u && t.compile ? t.compile.call(c.self, a, i, c) : t.validate, l = uu(n, s, d), m = n.let("valid");
  e.block$data(m, P), e.ok((r = t.valid) !== null && r !== void 0 ? r : m);
  function P() {
    if (t.errors === !1)
      g(), t.modifying && Mi(e), y(() => e.error());
    else {
      const h = t.async ? _() : w();
      t.modifying && Mi(e), y(() => Ay(e, h));
    }
  }
  function _() {
    const h = n.let("ruleErrs", null);
    return n.try(() => g((0, Ae._)`await `), (E) => n.assign(m, !1).if((0, Ae._)`${E} instanceof ${c.ValidationError}`, () => n.assign(h, (0, Ae._)`${E}.errors`), () => n.throw(E))), h;
  }
  function w() {
    const h = (0, Ae._)`${l}.errors`;
    return n.assign(h, null), g(Ae.nil), h;
  }
  function g(h = t.async ? (0, Ae._)`await ` : Ae.nil) {
    const E = c.opts.passContext ? Yt.default.this : Yt.default.self, N = !("compile" in t && !u || t.schema === !1);
    n.assign(m, (0, Ae._)`${h}${(0, Ry.callValidateCode)(e, l, E, N)}`, t.modifying);
  }
  function y(h) {
    var E;
    n.if((0, Ae.not)((E = t.valid) !== null && E !== void 0 ? E : m), h);
  }
}
ut.funcKeywordCode = jy;
function Mi(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Ae._)`${n.parentData}[${n.parentDataProperty}]`));
}
function Ay(e, t) {
  const { gen: r } = e;
  r.if((0, Ae._)`Array.isArray(${t})`, () => {
    r.assign(Yt.default.vErrors, (0, Ae._)`${Yt.default.vErrors} === null ? ${t} : ${Yt.default.vErrors}.concat(${t})`).assign(Yt.default.errors, (0, Ae._)`${Yt.default.vErrors}.length`), (0, Ty.extendErrors)(e);
  }, () => e.error());
}
function ky({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function uu(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Ae.stringify)(r) });
}
function Cy(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
ut.validSchemaType = Cy;
function Dy({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
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
ut.validateKeywordUsage = Dy;
var Tt = {};
Object.defineProperty(Tt, "__esModule", { value: !0 });
Tt.extendSubschemaMode = Tt.extendSubschemaData = Tt.getSubschema = void 0;
const at = Z, du = L;
function My(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: i }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const u = e.schema[t];
    return r === void 0 ? {
      schema: u,
      schemaPath: (0, at._)`${e.schemaPath}${(0, at.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: u[r],
      schemaPath: (0, at._)`${e.schemaPath}${(0, at.getProperty)(t)}${(0, at.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, du.escapeFragment)(r)}`
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
Tt.getSubschema = My;
function Ly(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: i }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: u } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: l, opts: m } = t, P = u.let("data", (0, at._)`${t.data}${(0, at.getProperty)(r)}`, !0);
    c(P), e.errorPath = (0, at.str)`${d}${(0, du.getErrorPath)(r, n, m.jsPropertySyntax)}`, e.parentDataProperty = (0, at._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (s !== void 0) {
    const d = s instanceof at.Name ? s : u.let("data", s, !0);
    c(d), i !== void 0 && (e.propertyName = i);
  }
  a && (e.dataTypes = a);
  function c(d) {
    e.data = d, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, d];
  }
}
Tt.extendSubschemaData = Ly;
function Fy(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Tt.extendSubschemaMode = Fy;
var Ne = {}, fu = { exports: {} }, Ot = fu.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  Dn(t, n, s, e, "", e);
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
function Dn(e, t, r, n, s, a, i, u, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, i, u, c, d);
    for (var l in n) {
      var m = n[l];
      if (Array.isArray(m)) {
        if (l in Ot.arrayKeywords)
          for (var P = 0; P < m.length; P++)
            Dn(e, t, r, m[P], s + "/" + l + "/" + P, a, s, l, n, P);
      } else if (l in Ot.propsKeywords) {
        if (m && typeof m == "object")
          for (var _ in m)
            Dn(e, t, r, m[_], s + "/" + l + "/" + Vy(_), a, s, l, n, _);
      } else (l in Ot.keywords || e.allKeys && !(l in Ot.skipKeywords)) && Dn(e, t, r, m, s + "/" + l, a, s, l, n);
    }
    r(n, s, a, i, u, c, d);
  }
}
function Vy(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var Uy = fu.exports;
Object.defineProperty(Ne, "__esModule", { value: !0 });
Ne.getSchemaRefs = Ne.resolveUrl = Ne.normalizeId = Ne._getFullPath = Ne.getFullPath = Ne.inlineRef = void 0;
const zy = L, qy = rs, Ky = Uy, Gy = /* @__PURE__ */ new Set([
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
function Hy(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Qs(e) : t ? hu(e) <= t : !1;
}
Ne.inlineRef = Hy;
const Wy = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Qs(e) {
  for (const t in e) {
    if (Wy.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Qs) || typeof r == "object" && Qs(r))
      return !0;
  }
  return !1;
}
function hu(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !Gy.has(r) && (typeof e[r] == "object" && (0, zy.eachItem)(e[r], (n) => t += hu(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function mu(e, t = "", r) {
  r !== !1 && (t = pr(t));
  const n = e.parse(t);
  return pu(e, n);
}
Ne.getFullPath = mu;
function pu(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Ne._getFullPath = pu;
const Jy = /#\/?$/;
function pr(e) {
  return e ? e.replace(Jy, "") : "";
}
Ne.normalizeId = pr;
function By(e, t, r) {
  return r = pr(r), e.resolve(t, r);
}
Ne.resolveUrl = By;
const Xy = /^[a-z_][-a-z0-9._]*$/i;
function Yy(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = pr(e[r] || t), a = { "": s }, i = mu(n, s, !1), u = {}, c = /* @__PURE__ */ new Set();
  return Ky(e, { allKeys: !0 }, (m, P, _, w) => {
    if (w === void 0)
      return;
    const g = i + P;
    let y = a[w];
    typeof m[r] == "string" && (y = h.call(this, m[r])), E.call(this, m.$anchor), E.call(this, m.$dynamicAnchor), a[P] = y;
    function h(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = pr(y ? R(y, N) : N), c.has(N))
        throw l(N);
      c.add(N);
      let I = this.refs[N];
      return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? d(m, I.schema, N) : N !== pr(g) && (N[0] === "#" ? (d(m, u[N], N), u[N] = m) : this.refs[N] = g), N;
    }
    function E(N) {
      if (typeof N == "string") {
        if (!Xy.test(N))
          throw new Error(`invalid anchor "${N}"`);
        h.call(this, `#${N}`);
      }
    }
  }), u;
  function d(m, P, _) {
    if (P !== void 0 && !qy(m, P))
      throw l(_);
  }
  function l(m) {
    return new Error(`reference "${m}" resolves to more than one schema`);
  }
}
Ne.getSchemaRefs = Yy;
Object.defineProperty(et, "__esModule", { value: !0 });
et.getData = et.KeywordCxt = et.validateFunctionCode = void 0;
const $u = Er, Li = ve, $o = $t, Jn = ve, Qy = cs, Hr = ut, Ns = Tt, G = Z, B = ft, Zy = Ne, yt = L, Cr = nn;
function xy(e) {
  if (gu(e) && (vu(e), _u(e))) {
    r_(e);
    return;
  }
  yu(e, () => (0, $u.topBoolOrEmptySchema)(e));
}
et.validateFunctionCode = xy;
function yu({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, G._)`${B.default.data}, ${B.default.valCxt}`, n.$async, () => {
    e.code((0, G._)`"use strict"; ${Fi(r, s)}`), t_(e, s), e.code(a);
  }) : e.func(t, (0, G._)`${B.default.data}, ${e_(s)}`, n.$async, () => e.code(Fi(r, s)).code(a));
}
function e_(e) {
  return (0, G._)`{${B.default.instancePath}="", ${B.default.parentData}, ${B.default.parentDataProperty}, ${B.default.rootData}=${B.default.data}${e.dynamicRef ? (0, G._)`, ${B.default.dynamicAnchors}={}` : G.nil}}={}`;
}
function t_(e, t) {
  e.if(B.default.valCxt, () => {
    e.var(B.default.instancePath, (0, G._)`${B.default.valCxt}.${B.default.instancePath}`), e.var(B.default.parentData, (0, G._)`${B.default.valCxt}.${B.default.parentData}`), e.var(B.default.parentDataProperty, (0, G._)`${B.default.valCxt}.${B.default.parentDataProperty}`), e.var(B.default.rootData, (0, G._)`${B.default.valCxt}.${B.default.rootData}`), t.dynamicRef && e.var(B.default.dynamicAnchors, (0, G._)`${B.default.valCxt}.${B.default.dynamicAnchors}`);
  }, () => {
    e.var(B.default.instancePath, (0, G._)`""`), e.var(B.default.parentData, (0, G._)`undefined`), e.var(B.default.parentDataProperty, (0, G._)`undefined`), e.var(B.default.rootData, B.default.data), t.dynamicRef && e.var(B.default.dynamicAnchors, (0, G._)`{}`);
  });
}
function r_(e) {
  const { schema: t, opts: r, gen: n } = e;
  yu(e, () => {
    r.$comment && t.$comment && wu(e), i_(e), n.let(B.default.vErrors, null), n.let(B.default.errors, 0), r.unevaluated && n_(e), Eu(e), u_(e);
  });
}
function n_(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, G._)`${r}.evaluated`), t.if((0, G._)`${e.evaluated}.dynamicProps`, () => t.assign((0, G._)`${e.evaluated}.props`, (0, G._)`undefined`)), t.if((0, G._)`${e.evaluated}.dynamicItems`, () => t.assign((0, G._)`${e.evaluated}.items`, (0, G._)`undefined`));
}
function Fi(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, G._)`/*# sourceURL=${r} */` : G.nil;
}
function s_(e, t) {
  if (gu(e) && (vu(e), _u(e))) {
    a_(e, t);
    return;
  }
  (0, $u.boolOrEmptySchema)(e, t);
}
function _u({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function gu(e) {
  return typeof e.schema != "boolean";
}
function a_(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && wu(e), c_(e), l_(e);
  const a = n.const("_errs", B.default.errors);
  Eu(e, a), n.var(t, (0, G._)`${a} === ${B.default.errors}`);
}
function vu(e) {
  (0, yt.checkUnknownRules)(e), o_(e);
}
function Eu(e, t) {
  if (e.opts.jtd)
    return Vi(e, [], !1, t);
  const r = (0, Li.getSchemaTypes)(e.schema), n = (0, Li.coerceAndCheckDataType)(e, r);
  Vi(e, r, !n, t);
}
function o_(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, yt.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function i_(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, yt.checkStrictMode)(e, "default is ignored in the schema root");
}
function c_(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, Zy.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function l_(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function wu({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, G._)`${B.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const i = (0, G.str)`${n}/$comment`, u = e.scopeValue("root", { ref: t.root });
    e.code((0, G._)`${B.default.self}.opts.$comment(${a}, ${i}, ${u}.schema)`);
  }
}
function u_(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, G._)`${B.default.errors} === 0`, () => t.return(B.default.data), () => t.throw((0, G._)`new ${s}(${B.default.vErrors})`)) : (t.assign((0, G._)`${n}.errors`, B.default.vErrors), a.unevaluated && d_(e), t.return((0, G._)`${B.default.errors} === 0`));
}
function d_({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof G.Name && e.assign((0, G._)`${t}.props`, r), n instanceof G.Name && e.assign((0, G._)`${t}.items`, n);
}
function Vi(e, t, r, n) {
  const { gen: s, schema: a, data: i, allErrors: u, opts: c, self: d } = e, { RULES: l } = d;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, yt.schemaHasRulesButRef)(a, l))) {
    s.block(() => Pu(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || f_(e, t), s.block(() => {
    for (const P of l.rules)
      m(P);
    m(l.post);
  });
  function m(P) {
    (0, $o.shouldUseGroup)(a, P) && (P.type ? (s.if((0, Jn.checkDataType)(P.type, i, c.strictNumbers)), Ui(e, P), t.length === 1 && t[0] === P.type && r && (s.else(), (0, Jn.reportTypeError)(e)), s.endIf()) : Ui(e, P), u || s.if((0, G._)`${B.default.errors} === ${n || 0}`));
  }
}
function Ui(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, Qy.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, $o.shouldUseRule)(n, a) && Pu(e, a.keyword, a.definition, t.type);
  });
}
function f_(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (h_(e, t), e.opts.allowUnionTypes || m_(e, t), p_(e, e.dataTypes));
}
function h_(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      Su(e.dataTypes, r) || yo(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), y_(e, t);
  }
}
function m_(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && yo(e, "use allowUnionTypes to allow union type keyword");
}
function p_(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, $o.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((i) => $_(t, i)) && yo(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function $_(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function Su(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function y_(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    Su(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function yo(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, yt.checkStrictMode)(e, t, e.opts.strictTypes);
}
class bu {
  constructor(t, r, n) {
    if ((0, Hr.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, yt.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", Nu(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Hr.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
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
    (t ? Cr.reportExtraError : Cr.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Cr.reportError)(this, this.def.$dataError || Cr.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Cr.resetErrorsCount)(this.gen, this.errsCount);
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
        return (0, G._)`${(0, Jn.checkDataTypes)(c, r, a.opts.strictNumbers, Jn.DataType.Wrong)}`;
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
    const n = (0, Ns.getSubschema)(this.it, t);
    (0, Ns.extendSubschemaData)(n, this.it, t), (0, Ns.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return s_(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = yt.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = yt.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, G.Name)), !0;
  }
}
et.KeywordCxt = bu;
function Pu(e, t, r, n) {
  const s = new bu(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Hr.funcKeywordCode)(s, r) : "macro" in r ? (0, Hr.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Hr.funcKeywordCode)(s, r);
}
const __ = /^\/(?:[^~]|~0|~1)*$/, g_ = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function Nu(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return B.default.rootData;
  if (e[0] === "/") {
    if (!__.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = B.default.rootData;
  } else {
    const d = g_.exec(e);
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
    d && (a = (0, G._)`${a}${(0, G.getProperty)((0, yt.unescapeJsonPointer)(d))}`, i = (0, G._)`${i} && ${a}`);
  return i;
  function c(d, l) {
    return `Cannot access ${d} ${l} levels up, current level is ${t}`;
  }
}
et.getData = Nu;
var sn = {};
Object.defineProperty(sn, "__esModule", { value: !0 });
class v_ extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
sn.default = v_;
var Nr = {};
Object.defineProperty(Nr, "__esModule", { value: !0 });
const Os = Ne;
class E_ extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, Os.resolveUrl)(t, r, n), this.missingSchema = (0, Os.normalizeId)((0, Os.getFullPath)(t, this.missingRef));
  }
}
Nr.default = E_;
var Fe = {};
Object.defineProperty(Fe, "__esModule", { value: !0 });
Fe.resolveSchema = Fe.getCompilingSchema = Fe.resolveRef = Fe.compileSchema = Fe.SchemaEnv = void 0;
const Be = Z, w_ = sn, Wt = ft, Ze = Ne, zi = L, S_ = et;
class ls {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Ze.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Fe.SchemaEnv = ls;
function _o(e) {
  const t = Ou.call(this, e);
  if (t)
    return t;
  const r = (0, Ze.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new Be.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let u;
  e.$async && (u = i.scopeValue("Error", {
    ref: w_.default,
    code: (0, Be._)`require("ajv/dist/runtime/validation_error").default`
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
    dataPathArr: [Be.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Be.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: u,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Be.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Be._)`""`,
    opts: this.opts,
    self: this
  };
  let l;
  try {
    this._compilations.add(e), (0, S_.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const m = i.toString();
    l = `${i.scopeRefs(Wt.default.scope)}return ${m}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const _ = new Function(`${Wt.default.self}`, `${Wt.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: _ }), _.errors = null, _.schema = e.schema, _.schemaEnv = e, e.$async && (_.$async = !0), this.opts.code.source === !0 && (_.source = { validateName: c, validateCode: m, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: w, items: g } = d;
      _.evaluated = {
        props: w instanceof Be.Name ? void 0 : w,
        items: g instanceof Be.Name ? void 0 : g,
        dynamicProps: w instanceof Be.Name,
        dynamicItems: g instanceof Be.Name
      }, _.source && (_.source.evaluated = (0, Be.stringify)(_.evaluated));
    }
    return e.validate = _, e;
  } catch (m) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), m;
  } finally {
    this._compilations.delete(e);
  }
}
Fe.compileSchema = _o;
function b_(e, t, r) {
  var n;
  r = (0, Ze.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = O_.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: u } = this.opts;
    i && (a = new ls({ schema: i, schemaId: u, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = P_.call(this, a);
}
Fe.resolveRef = b_;
function P_(e) {
  return (0, Ze.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : _o.call(this, e);
}
function Ou(e) {
  for (const t of this._compilations)
    if (N_(t, e))
      return t;
}
Fe.getCompilingSchema = Ou;
function N_(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function O_(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || us.call(this, e, t);
}
function us(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Ze._getFullPath)(this.opts.uriResolver, r);
  let s = (0, Ze.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return Rs.call(this, r, e);
  const a = (0, Ze.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const u = us.call(this, e, i);
    return typeof (u == null ? void 0 : u.schema) != "object" ? void 0 : Rs.call(this, r, u);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || _o.call(this, i), a === (0, Ze.normalizeId)(t)) {
      const { schema: u } = i, { schemaId: c } = this.opts, d = u[c];
      return d && (s = (0, Ze.resolveUrl)(this.opts.uriResolver, s, d)), new ls({ schema: u, schemaId: c, root: e, baseId: s });
    }
    return Rs.call(this, r, i);
  }
}
Fe.resolveSchema = us;
const R_ = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Rs(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const u of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, zi.unescapeFragment)(u)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !R_.has(u) && d && (t = (0, Ze.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, zi.schemaHasRulesButRef)(r, this.RULES)) {
    const u = (0, Ze.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = us.call(this, n, u);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new ls({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const T_ = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", I_ = "Meta-schema for $data reference (JSON AnySchema extension proposal)", j_ = "object", A_ = [
  "$data"
], k_ = {
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
}, C_ = !1, D_ = {
  $id: T_,
  description: I_,
  type: j_,
  required: A_,
  properties: k_,
  additionalProperties: C_
};
var go = {};
Object.defineProperty(go, "__esModule", { value: !0 });
const Ru = Fl;
Ru.code = 'require("ajv/dist/runtime/uri").default';
go.default = Ru;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = et;
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
  const n = sn, s = Nr, a = tr, i = Fe, u = Z, c = Ne, d = ve, l = L, m = D_, P = go, _ = (v, p) => new RegExp(v, p);
  _.code = "new RegExp";
  const w = ["removeAdditional", "useDefaults", "coerceTypes"], g = /* @__PURE__ */ new Set([
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
  }, E = 200;
  function N(v) {
    var p, S, $, o, f, b, j, A, q, F, re, Ue, It, jt, At, kt, Ct, Dt, Mt, Lt, Ft, Vt, Ut, zt, qt;
    const We = v.strict, Kt = (p = v.code) === null || p === void 0 ? void 0 : p.optimize, Ir = Kt === !0 || Kt === void 0 ? 1 : Kt || 0, jr = ($ = (S = v.code) === null || S === void 0 ? void 0 : S.regExp) !== null && $ !== void 0 ? $ : _, vs = (o = v.uriResolver) !== null && o !== void 0 ? o : P.default;
    return {
      strictSchema: (b = (f = v.strictSchema) !== null && f !== void 0 ? f : We) !== null && b !== void 0 ? b : !0,
      strictNumbers: (A = (j = v.strictNumbers) !== null && j !== void 0 ? j : We) !== null && A !== void 0 ? A : !0,
      strictTypes: (F = (q = v.strictTypes) !== null && q !== void 0 ? q : We) !== null && F !== void 0 ? F : "log",
      strictTuples: (Ue = (re = v.strictTuples) !== null && re !== void 0 ? re : We) !== null && Ue !== void 0 ? Ue : "log",
      strictRequired: (jt = (It = v.strictRequired) !== null && It !== void 0 ? It : We) !== null && jt !== void 0 ? jt : !1,
      code: v.code ? { ...v.code, optimize: Ir, regExp: jr } : { optimize: Ir, regExp: jr },
      loopRequired: (At = v.loopRequired) !== null && At !== void 0 ? At : E,
      loopEnum: (kt = v.loopEnum) !== null && kt !== void 0 ? kt : E,
      meta: (Ct = v.meta) !== null && Ct !== void 0 ? Ct : !0,
      messages: (Dt = v.messages) !== null && Dt !== void 0 ? Dt : !0,
      inlineRefs: (Mt = v.inlineRefs) !== null && Mt !== void 0 ? Mt : !0,
      schemaId: (Lt = v.schemaId) !== null && Lt !== void 0 ? Lt : "$id",
      addUsedSchema: (Ft = v.addUsedSchema) !== null && Ft !== void 0 ? Ft : !0,
      validateSchema: (Vt = v.validateSchema) !== null && Vt !== void 0 ? Vt : !0,
      validateFormats: (Ut = v.validateFormats) !== null && Ut !== void 0 ? Ut : !0,
      unicodeRegExp: (zt = v.unicodeRegExp) !== null && zt !== void 0 ? zt : !0,
      int32range: (qt = v.int32range) !== null && qt !== void 0 ? qt : !0,
      uriResolver: vs
    };
  }
  class R {
    constructor(p = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), p = this.opts = { ...p, ...N(p) };
      const { es5: S, lines: $ } = this.opts.code;
      this.scope = new u.ValueScope({ scope: {}, prefixes: g, es5: S, lines: $ }), this.logger = Q(p.logger);
      const o = p.validateFormats;
      p.validateFormats = !1, this.RULES = (0, a.getRules)(), I.call(this, y, p, "NOT SUPPORTED"), I.call(this, h, p, "DEPRECATED", "warn"), this._metaOpts = H.call(this), p.formats && ue.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), p.keywords && V.call(this, p.keywords), typeof p.meta == "object" && this.addMetaSchema(p.meta), W.call(this), p.validateFormats = o;
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
          q && F && (b[j] = T(F));
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
  function I(v, p, S, $ = "error") {
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
    for (const p of w)
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
    p !== void 0 && (v.$data && this.opts.$data && (p = T(p)), v.validateSchema = this.compile(p, !0));
  }
  const O = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function T(v) {
    return { anyOf: [v, O] };
  }
})(Yl);
var vo = {}, Eo = {}, wo = {};
Object.defineProperty(wo, "__esModule", { value: !0 });
const M_ = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
wo.default = M_;
var rr = {};
Object.defineProperty(rr, "__esModule", { value: !0 });
rr.callRef = rr.getValidate = void 0;
const L_ = Nr, qi = ee, Me = Z, ir = ft, Ki = Fe, yn = L, F_ = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: u, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return m();
    const l = Ki.resolveRef.call(c, d, s, r);
    if (l === void 0)
      throw new L_.default(n.opts.uriResolver, s, r);
    if (l instanceof Ki.SchemaEnv)
      return P(l);
    return _(l);
    function m() {
      if (a === d)
        return Mn(e, i, a, a.$async);
      const w = t.scopeValue("root", { ref: d });
      return Mn(e, (0, Me._)`${w}.validate`, d, d.$async);
    }
    function P(w) {
      const g = Tu(e, w);
      Mn(e, g, w, w.$async);
    }
    function _(w) {
      const g = t.scopeValue("schema", u.code.source === !0 ? { ref: w, code: (0, Me.stringify)(w) } : { ref: w }), y = t.name("valid"), h = e.subschema({
        schema: w,
        dataTypes: [],
        schemaPath: Me.nil,
        topSchemaRef: g,
        errSchemaPath: r
      }, y);
      e.mergeEvaluated(h), e.ok(y);
    }
  }
};
function Tu(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Me._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
rr.getValidate = Tu;
function Mn(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: u, opts: c } = a, d = c.passContext ? ir.default.this : Me.nil;
  n ? l() : m();
  function l() {
    if (!u.$async)
      throw new Error("async schema referenced by sync schema");
    const w = s.let("valid");
    s.try(() => {
      s.code((0, Me._)`await ${(0, qi.callValidateCode)(e, t, d)}`), _(t), i || s.assign(w, !0);
    }, (g) => {
      s.if((0, Me._)`!(${g} instanceof ${a.ValidationError})`, () => s.throw(g)), P(g), i || s.assign(w, !1);
    }), e.ok(w);
  }
  function m() {
    e.result((0, qi.callValidateCode)(e, t, d), () => _(t), () => P(t));
  }
  function P(w) {
    const g = (0, Me._)`${w}.errors`;
    s.assign(ir.default.vErrors, (0, Me._)`${ir.default.vErrors} === null ? ${g} : ${ir.default.vErrors}.concat(${g})`), s.assign(ir.default.errors, (0, Me._)`${ir.default.vErrors}.length`);
  }
  function _(w) {
    var g;
    if (!a.opts.unevaluated)
      return;
    const y = (g = r == null ? void 0 : r.validate) === null || g === void 0 ? void 0 : g.evaluated;
    if (a.props !== !0)
      if (y && !y.dynamicProps)
        y.props !== void 0 && (a.props = yn.mergeEvaluated.props(s, y.props, a.props));
      else {
        const h = s.var("props", (0, Me._)`${w}.evaluated.props`);
        a.props = yn.mergeEvaluated.props(s, h, a.props, Me.Name);
      }
    if (a.items !== !0)
      if (y && !y.dynamicItems)
        y.items !== void 0 && (a.items = yn.mergeEvaluated.items(s, y.items, a.items));
      else {
        const h = s.var("items", (0, Me._)`${w}.evaluated.items`);
        a.items = yn.mergeEvaluated.items(s, h, a.items, Me.Name);
      }
  }
}
rr.callRef = Mn;
rr.default = F_;
Object.defineProperty(Eo, "__esModule", { value: !0 });
const V_ = wo, U_ = rr, z_ = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  V_.default,
  U_.default
];
Eo.default = z_;
var So = {}, bo = {};
Object.defineProperty(bo, "__esModule", { value: !0 });
const Bn = Z, wt = Bn.operators, Xn = {
  maximum: { okStr: "<=", ok: wt.LTE, fail: wt.GT },
  minimum: { okStr: ">=", ok: wt.GTE, fail: wt.LT },
  exclusiveMaximum: { okStr: "<", ok: wt.LT, fail: wt.GTE },
  exclusiveMinimum: { okStr: ">", ok: wt.GT, fail: wt.LTE }
}, q_ = {
  message: ({ keyword: e, schemaCode: t }) => (0, Bn.str)`must be ${Xn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Bn._)`{comparison: ${Xn[e].okStr}, limit: ${t}}`
}, K_ = {
  keyword: Object.keys(Xn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: q_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Bn._)`${r} ${Xn[t].fail} ${n} || isNaN(${r})`);
  }
};
bo.default = K_;
var Po = {};
Object.defineProperty(Po, "__esModule", { value: !0 });
const Wr = Z, G_ = {
  message: ({ schemaCode: e }) => (0, Wr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Wr._)`{multipleOf: ${e}}`
}, H_ = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: G_,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), u = a ? (0, Wr._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, Wr._)`${i} !== parseInt(${i})`;
    e.fail$data((0, Wr._)`(${n} === 0 || (${i} = ${r}/${n}, ${u}))`);
  }
};
Po.default = H_;
var No = {}, Oo = {};
Object.defineProperty(Oo, "__esModule", { value: !0 });
function Iu(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Oo.default = Iu;
Iu.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(No, "__esModule", { value: !0 });
const Qt = Z, W_ = L, J_ = Oo, B_ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Qt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Qt._)`{limit: ${e}}`
}, X_ = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: B_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Qt.operators.GT : Qt.operators.LT, i = s.opts.unicode === !1 ? (0, Qt._)`${r}.length` : (0, Qt._)`${(0, W_.useFunc)(e.gen, J_.default)}(${r})`;
    e.fail$data((0, Qt._)`${i} ${a} ${n}`);
  }
};
No.default = X_;
var Ro = {};
Object.defineProperty(Ro, "__esModule", { value: !0 });
const Y_ = ee, Yn = Z, Q_ = {
  message: ({ schemaCode: e }) => (0, Yn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Yn._)`{pattern: ${e}}`
}, Z_ = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: Q_,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, i = a.opts.unicodeRegExp ? "u" : "", u = r ? (0, Yn._)`(new RegExp(${s}, ${i}))` : (0, Y_.usePattern)(e, n);
    e.fail$data((0, Yn._)`!${u}.test(${t})`);
  }
};
Ro.default = Z_;
var To = {};
Object.defineProperty(To, "__esModule", { value: !0 });
const Jr = Z, x_ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Jr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Jr._)`{limit: ${e}}`
}, e0 = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: x_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Jr.operators.GT : Jr.operators.LT;
    e.fail$data((0, Jr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
To.default = e0;
var Io = {};
Object.defineProperty(Io, "__esModule", { value: !0 });
const Dr = ee, Br = Z, t0 = L, r0 = {
  message: ({ params: { missingProperty: e } }) => (0, Br.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Br._)`{missingProperty: ${e}}`
}, n0 = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: r0,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: i } = e, { opts: u } = i;
    if (!a && r.length === 0)
      return;
    const c = r.length >= u.loopRequired;
    if (i.allErrors ? d() : l(), u.strictRequired) {
      const _ = e.parentSchema.properties, { definedProperties: w } = e.it;
      for (const g of r)
        if ((_ == null ? void 0 : _[g]) === void 0 && !w.has(g)) {
          const y = i.schemaEnv.baseId + i.errSchemaPath, h = `required property "${g}" is not defined at "${y}" (strictRequired)`;
          (0, t0.checkStrictMode)(i, h, i.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(Br.nil, m);
      else
        for (const _ of r)
          (0, Dr.checkReportMissingProp)(e, _);
    }
    function l() {
      const _ = t.let("missing");
      if (c || a) {
        const w = t.let("valid", !0);
        e.block$data(w, () => P(_, w)), e.ok(w);
      } else
        t.if((0, Dr.checkMissingProp)(e, r, _)), (0, Dr.reportMissingProp)(e, _), t.else();
    }
    function m() {
      t.forOf("prop", n, (_) => {
        e.setParams({ missingProperty: _ }), t.if((0, Dr.noPropertyInData)(t, s, _, u.ownProperties), () => e.error());
      });
    }
    function P(_, w) {
      e.setParams({ missingProperty: _ }), t.forOf(_, n, () => {
        t.assign(w, (0, Dr.propertyInData)(t, s, _, u.ownProperties)), t.if((0, Br.not)(w), () => {
          e.error(), t.break();
        });
      }, Br.nil);
    }
  }
};
Io.default = n0;
var jo = {};
Object.defineProperty(jo, "__esModule", { value: !0 });
const Xr = Z, s0 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Xr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Xr._)`{limit: ${e}}`
}, a0 = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: s0,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Xr.operators.GT : Xr.operators.LT;
    e.fail$data((0, Xr._)`${r}.length ${s} ${n}`);
  }
};
jo.default = a0;
var Ao = {}, an = {};
Object.defineProperty(an, "__esModule", { value: !0 });
const ju = rs;
ju.code = 'require("ajv/dist/runtime/equal").default';
an.default = ju;
Object.defineProperty(Ao, "__esModule", { value: !0 });
const Ts = ve, Se = Z, o0 = L, i0 = an, c0 = {
  message: ({ params: { i: e, j: t } }) => (0, Se.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Se._)`{i: ${e}, j: ${t}}`
}, l0 = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: c0,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: u } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, Ts.getSchemaTypes)(a.items) : [];
    e.block$data(c, l, (0, Se._)`${i} === false`), e.ok(c);
    function l() {
      const w = t.let("i", (0, Se._)`${r}.length`), g = t.let("j");
      e.setParams({ i: w, j: g }), t.assign(c, !0), t.if((0, Se._)`${w} > 1`, () => (m() ? P : _)(w, g));
    }
    function m() {
      return d.length > 0 && !d.some((w) => w === "object" || w === "array");
    }
    function P(w, g) {
      const y = t.name("item"), h = (0, Ts.checkDataTypes)(d, y, u.opts.strictNumbers, Ts.DataType.Wrong), E = t.const("indices", (0, Se._)`{}`);
      t.for((0, Se._)`;${w}--;`, () => {
        t.let(y, (0, Se._)`${r}[${w}]`), t.if(h, (0, Se._)`continue`), d.length > 1 && t.if((0, Se._)`typeof ${y} == "string"`, (0, Se._)`${y} += "_"`), t.if((0, Se._)`typeof ${E}[${y}] == "number"`, () => {
          t.assign(g, (0, Se._)`${E}[${y}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Se._)`${E}[${y}] = ${w}`);
      });
    }
    function _(w, g) {
      const y = (0, o0.useFunc)(t, i0.default), h = t.name("outer");
      t.label(h).for((0, Se._)`;${w}--;`, () => t.for((0, Se._)`${g} = ${w}; ${g}--;`, () => t.if((0, Se._)`${y}(${r}[${w}], ${r}[${g}])`, () => {
        e.error(), t.assign(c, !1).break(h);
      })));
    }
  }
};
Ao.default = l0;
var ko = {};
Object.defineProperty(ko, "__esModule", { value: !0 });
const Zs = Z, u0 = L, d0 = an, f0 = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Zs._)`{allowedValue: ${e}}`
}, h0 = {
  keyword: "const",
  $data: !0,
  error: f0,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, Zs._)`!${(0, u0.useFunc)(t, d0.default)}(${r}, ${s})`) : e.fail((0, Zs._)`${a} !== ${r}`);
  }
};
ko.default = h0;
var Co = {};
Object.defineProperty(Co, "__esModule", { value: !0 });
const Vr = Z, m0 = L, p0 = an, $0 = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Vr._)`{allowedValues: ${e}}`
}, y0 = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: $0,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const u = s.length >= i.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, m0.useFunc)(t, p0.default));
    let l;
    if (u || n)
      l = t.let("valid"), e.block$data(l, m);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const _ = t.const("vSchema", a);
      l = (0, Vr.or)(...s.map((w, g) => P(_, g)));
    }
    e.pass(l);
    function m() {
      t.assign(l, !1), t.forOf("v", a, (_) => t.if((0, Vr._)`${d()}(${r}, ${_})`, () => t.assign(l, !0).break()));
    }
    function P(_, w) {
      const g = s[w];
      return typeof g == "object" && g !== null ? (0, Vr._)`${d()}(${r}, ${_}[${w}])` : (0, Vr._)`${r} === ${g}`;
    }
  }
};
Co.default = y0;
Object.defineProperty(So, "__esModule", { value: !0 });
const _0 = bo, g0 = Po, v0 = No, E0 = Ro, w0 = To, S0 = Io, b0 = jo, P0 = Ao, N0 = ko, O0 = Co, R0 = [
  // number
  _0.default,
  g0.default,
  // string
  v0.default,
  E0.default,
  // object
  w0.default,
  S0.default,
  // array
  b0.default,
  P0.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  N0.default,
  O0.default
];
So.default = R0;
var Do = {}, Or = {};
Object.defineProperty(Or, "__esModule", { value: !0 });
Or.validateAdditionalItems = void 0;
const Zt = Z, xs = L, T0 = {
  message: ({ params: { len: e } }) => (0, Zt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Zt._)`{limit: ${e}}`
}, I0 = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: T0,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, xs.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Au(e, n);
  }
};
function Au(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const u = r.const("len", (0, Zt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Zt._)`${u} <= ${t.length}`);
  else if (typeof n == "object" && !(0, xs.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, Zt._)`${u} <= ${t.length}`);
    r.if((0, Zt.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, u, (l) => {
      e.subschema({ keyword: a, dataProp: l, dataPropType: xs.Type.Num }, d), i.allErrors || r.if((0, Zt.not)(d), () => r.break());
    });
  }
}
Or.validateAdditionalItems = Au;
Or.default = I0;
var Mo = {}, Rr = {};
Object.defineProperty(Rr, "__esModule", { value: !0 });
Rr.validateTuple = void 0;
const Gi = Z, Ln = L, j0 = ee, A0 = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return ku(e, "additionalItems", t);
    r.items = !0, !(0, Ln.alwaysValidSchema)(r, t) && e.ok((0, j0.validateArray)(e));
  }
};
function ku(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: u } = e;
  l(s), u.opts.unevaluated && r.length && u.items !== !0 && (u.items = Ln.mergeEvaluated.items(n, r.length, u.items));
  const c = n.name("valid"), d = n.const("len", (0, Gi._)`${a}.length`);
  r.forEach((m, P) => {
    (0, Ln.alwaysValidSchema)(u, m) || (n.if((0, Gi._)`${d} > ${P}`, () => e.subschema({
      keyword: i,
      schemaProp: P,
      dataProp: P
    }, c)), e.ok(c));
  });
  function l(m) {
    const { opts: P, errSchemaPath: _ } = u, w = r.length, g = w === m.minItems && (w === m.maxItems || m[t] === !1);
    if (P.strictTuples && !g) {
      const y = `"${i}" is ${w}-tuple, but minItems or maxItems/${t} are not specified or different at path "${_}"`;
      (0, Ln.checkStrictMode)(u, y, P.strictTuples);
    }
  }
}
Rr.validateTuple = ku;
Rr.default = A0;
Object.defineProperty(Mo, "__esModule", { value: !0 });
const k0 = Rr, C0 = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, k0.validateTuple)(e, "items")
};
Mo.default = C0;
var Lo = {};
Object.defineProperty(Lo, "__esModule", { value: !0 });
const Hi = Z, D0 = L, M0 = ee, L0 = Or, F0 = {
  message: ({ params: { len: e } }) => (0, Hi.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Hi._)`{limit: ${e}}`
}, V0 = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: F0,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, D0.alwaysValidSchema)(n, t) && (s ? (0, L0.validateAdditionalItems)(e, s) : e.ok((0, M0.validateArray)(e)));
  }
};
Lo.default = V0;
var Fo = {};
Object.defineProperty(Fo, "__esModule", { value: !0 });
const He = Z, _n = L, U0 = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, He.str)`must contain at least ${e} valid item(s)` : (0, He.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, He._)`{minContains: ${e}}` : (0, He._)`{minContains: ${e}, maxContains: ${t}}`
}, z0 = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: U0,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let i, u;
    const { minContains: c, maxContains: d } = n;
    a.opts.next ? (i = c === void 0 ? 1 : c, u = d) : i = 1;
    const l = t.const("len", (0, He._)`${s}.length`);
    if (e.setParams({ min: i, max: u }), u === void 0 && i === 0) {
      (0, _n.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (u !== void 0 && i > u) {
      (0, _n.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, _n.alwaysValidSchema)(a, r)) {
      let g = (0, He._)`${l} >= ${i}`;
      u !== void 0 && (g = (0, He._)`${g} && ${l} <= ${u}`), e.pass(g);
      return;
    }
    a.items = !0;
    const m = t.name("valid");
    u === void 0 && i === 1 ? _(m, () => t.if(m, () => t.break())) : i === 0 ? (t.let(m, !0), u !== void 0 && t.if((0, He._)`${s}.length > 0`, P)) : (t.let(m, !1), P()), e.result(m, () => e.reset());
    function P() {
      const g = t.name("_valid"), y = t.let("count", 0);
      _(g, () => t.if(g, () => w(y)));
    }
    function _(g, y) {
      t.forRange("i", 0, l, (h) => {
        e.subschema({
          keyword: "contains",
          dataProp: h,
          dataPropType: _n.Type.Num,
          compositeRule: !0
        }, g), y();
      });
    }
    function w(g) {
      t.code((0, He._)`${g}++`), u === void 0 ? t.if((0, He._)`${g} >= ${i}`, () => t.assign(m, !0).break()) : (t.if((0, He._)`${g} > ${u}`, () => t.assign(m, !1).break()), i === 1 ? t.assign(m, !0) : t.if((0, He._)`${g} >= ${i}`, () => t.assign(m, !0)));
    }
  }
};
Fo.default = z0;
var Cu = {};
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
    for (const w in d) {
      const g = d[w];
      if (g.length === 0)
        continue;
      const y = (0, n.propertyInData)(l, m, w, P.opts.ownProperties);
      c.setParams({
        property: w,
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
    const { gen: l, data: m, keyword: P, it: _ } = c, w = l.name("valid");
    for (const g in d)
      (0, r.alwaysValidSchema)(_, d[g]) || (l.if(
        (0, n.propertyInData)(l, m, g, _.opts.ownProperties),
        () => {
          const y = c.subschema({ keyword: P, schemaProp: g }, w);
          c.mergeValidEvaluated(y, w);
        },
        () => l.var(w, !0)
        // TODO var
      ), c.ok(w));
  }
  e.validateSchemaDeps = u, e.default = s;
})(Cu);
var Vo = {};
Object.defineProperty(Vo, "__esModule", { value: !0 });
const Du = Z, q0 = L, K0 = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Du._)`{propertyName: ${e.propertyName}}`
}, G0 = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: K0,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, q0.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, Du.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Vo.default = G0;
var ds = {};
Object.defineProperty(ds, "__esModule", { value: !0 });
const gn = ee, Ye = Z, H0 = ft, vn = L, W0 = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Ye._)`{additionalProperty: ${e.additionalProperty}}`
}, J0 = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: W0,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: u, opts: c } = i;
    if (i.props = !0, c.removeAdditional !== "all" && (0, vn.alwaysValidSchema)(i, r))
      return;
    const d = (0, gn.allSchemaProperties)(n.properties), l = (0, gn.allSchemaProperties)(n.patternProperties);
    m(), e.ok((0, Ye._)`${a} === ${H0.default.errors}`);
    function m() {
      t.forIn("key", s, (y) => {
        !d.length && !l.length ? w(y) : t.if(P(y), () => w(y));
      });
    }
    function P(y) {
      let h;
      if (d.length > 8) {
        const E = (0, vn.schemaRefOrVal)(i, n.properties, "properties");
        h = (0, gn.isOwnProperty)(t, E, y);
      } else d.length ? h = (0, Ye.or)(...d.map((E) => (0, Ye._)`${y} === ${E}`)) : h = Ye.nil;
      return l.length && (h = (0, Ye.or)(h, ...l.map((E) => (0, Ye._)`${(0, gn.usePattern)(e, E)}.test(${y})`))), (0, Ye.not)(h);
    }
    function _(y) {
      t.code((0, Ye._)`delete ${s}[${y}]`);
    }
    function w(y) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        _(y);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: y }), e.error(), u || t.break();
        return;
      }
      if (typeof r == "object" && !(0, vn.alwaysValidSchema)(i, r)) {
        const h = t.name("valid");
        c.removeAdditional === "failing" ? (g(y, h, !1), t.if((0, Ye.not)(h), () => {
          e.reset(), _(y);
        })) : (g(y, h), u || t.if((0, Ye.not)(h), () => t.break()));
      }
    }
    function g(y, h, E) {
      const N = {
        keyword: "additionalProperties",
        dataProp: y,
        dataPropType: vn.Type.Str
      };
      E === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, h);
    }
  }
};
ds.default = J0;
var Uo = {};
Object.defineProperty(Uo, "__esModule", { value: !0 });
const B0 = et, Wi = ee, Is = L, Ji = ds, X0 = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Ji.default.code(new B0.KeywordCxt(a, Ji.default, "additionalProperties"));
    const i = (0, Wi.allSchemaProperties)(r);
    for (const m of i)
      a.definedProperties.add(m);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = Is.mergeEvaluated.props(t, (0, Is.toHash)(i), a.props));
    const u = i.filter((m) => !(0, Is.alwaysValidSchema)(a, r[m]));
    if (u.length === 0)
      return;
    const c = t.name("valid");
    for (const m of u)
      d(m) ? l(m) : (t.if((0, Wi.propertyInData)(t, s, m, a.opts.ownProperties)), l(m), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(m), e.ok(c);
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
Uo.default = X0;
var zo = {};
Object.defineProperty(zo, "__esModule", { value: !0 });
const Bi = ee, En = Z, Xi = L, Yi = L, Y0 = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, u = (0, Bi.allSchemaProperties)(r), c = u.filter((g) => (0, Xi.alwaysValidSchema)(a, r[g]));
    if (u.length === 0 || c.length === u.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, l = t.name("valid");
    a.props !== !0 && !(a.props instanceof En.Name) && (a.props = (0, Yi.evaluatedPropsToName)(t, a.props));
    const { props: m } = a;
    P();
    function P() {
      for (const g of u)
        d && _(g), a.allErrors ? w(g) : (t.var(l, !0), w(g), t.if(l));
    }
    function _(g) {
      for (const y in d)
        new RegExp(g).test(y) && (0, Xi.checkStrictMode)(a, `property ${y} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function w(g) {
      t.forIn("key", n, (y) => {
        t.if((0, En._)`${(0, Bi.usePattern)(e, g)}.test(${y})`, () => {
          const h = c.includes(g);
          h || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: y,
            dataPropType: Yi.Type.Str
          }, l), a.opts.unevaluated && m !== !0 ? t.assign((0, En._)`${m}[${y}]`, !0) : !h && !a.allErrors && t.if((0, En.not)(l), () => t.break());
        });
      });
    }
  }
};
zo.default = Y0;
var qo = {};
Object.defineProperty(qo, "__esModule", { value: !0 });
const Q0 = L, Z0 = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, Q0.alwaysValidSchema)(n, r)) {
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
qo.default = Z0;
var Ko = {};
Object.defineProperty(Ko, "__esModule", { value: !0 });
const x0 = ee, eg = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: x0.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Ko.default = eg;
var Go = {};
Object.defineProperty(Go, "__esModule", { value: !0 });
const Fn = Z, tg = L, rg = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Fn._)`{passingSchemas: ${e.passing}}`
}, ng = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: rg,
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
        (0, tg.alwaysValidSchema)(s, l) ? t.var(c, !0) : P = e.subschema({
          keyword: "oneOf",
          schemaProp: m,
          compositeRule: !0
        }, c), m > 0 && t.if((0, Fn._)`${c} && ${i}`).assign(i, !1).assign(u, (0, Fn._)`[${u}, ${m}]`).else(), t.if(c, () => {
          t.assign(i, !0), t.assign(u, m), P && e.mergeEvaluated(P, Fn.Name);
        });
      });
    }
  }
};
Go.default = ng;
var Ho = {};
Object.defineProperty(Ho, "__esModule", { value: !0 });
const sg = L, ag = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, sg.alwaysValidSchema)(n, a))
        return;
      const u = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(u);
    });
  }
};
Ho.default = ag;
var Wo = {};
Object.defineProperty(Wo, "__esModule", { value: !0 });
const Qn = Z, Mu = L, og = {
  message: ({ params: e }) => (0, Qn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Qn._)`{failingKeyword: ${e.ifClause}}`
}, ig = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: og,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Mu.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Qi(n, "then"), a = Qi(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), u = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(u, d("then", l), d("else", l));
    } else s ? t.if(u, d("then")) : t.if((0, Qn.not)(u), d("else"));
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
        t.assign(i, u), e.mergeValidEvaluated(P, i), m ? t.assign(m, (0, Qn._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function Qi(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Mu.alwaysValidSchema)(e, r);
}
Wo.default = ig;
var Jo = {};
Object.defineProperty(Jo, "__esModule", { value: !0 });
const cg = L, lg = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, cg.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Jo.default = lg;
Object.defineProperty(Do, "__esModule", { value: !0 });
const ug = Or, dg = Mo, fg = Rr, hg = Lo, mg = Fo, pg = Cu, $g = Vo, yg = ds, _g = Uo, gg = zo, vg = qo, Eg = Ko, wg = Go, Sg = Ho, bg = Wo, Pg = Jo;
function Ng(e = !1) {
  const t = [
    // any
    vg.default,
    Eg.default,
    wg.default,
    Sg.default,
    bg.default,
    Pg.default,
    // object
    $g.default,
    yg.default,
    pg.default,
    _g.default,
    gg.default
  ];
  return e ? t.push(dg.default, hg.default) : t.push(ug.default, fg.default), t.push(mg.default), t;
}
Do.default = Ng;
var Bo = {}, Xo = {};
Object.defineProperty(Xo, "__esModule", { value: !0 });
const $e = Z, Og = {
  message: ({ schemaCode: e }) => (0, $e.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, $e._)`{format: ${e}}`
}, Rg = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: Og,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: u } = e, { opts: c, errSchemaPath: d, schemaEnv: l, self: m } = u;
    if (!c.validateFormats)
      return;
    s ? P() : _();
    function P() {
      const w = r.scopeValue("formats", {
        ref: m.formats,
        code: c.code.formats
      }), g = r.const("fDef", (0, $e._)`${w}[${i}]`), y = r.let("fType"), h = r.let("format");
      r.if((0, $e._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => r.assign(y, (0, $e._)`${g}.type || "string"`).assign(h, (0, $e._)`${g}.validate`), () => r.assign(y, (0, $e._)`"string"`).assign(h, g)), e.fail$data((0, $e.or)(E(), N()));
      function E() {
        return c.strictSchema === !1 ? $e.nil : (0, $e._)`${i} && !${h}`;
      }
      function N() {
        const R = l.$async ? (0, $e._)`(${g}.async ? await ${h}(${n}) : ${h}(${n}))` : (0, $e._)`${h}(${n})`, I = (0, $e._)`(typeof ${h} == "function" ? ${R} : ${h}.test(${n}))`;
        return (0, $e._)`${h} && ${h} !== true && ${y} === ${t} && !${I}`;
      }
    }
    function _() {
      const w = m.formats[a];
      if (!w) {
        E();
        return;
      }
      if (w === !0)
        return;
      const [g, y, h] = N(w);
      g === t && e.pass(R());
      function E() {
        if (c.strictSchema === !1) {
          m.logger.warn(I());
          return;
        }
        throw new Error(I());
        function I() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function N(I) {
        const z = I instanceof RegExp ? (0, $e.regexpCode)(I) : c.code.formats ? (0, $e._)`${c.code.formats}${(0, $e.getProperty)(a)}` : void 0, W = r.scopeValue("formats", { key: a, ref: I, code: z });
        return typeof I == "object" && !(I instanceof RegExp) ? [I.type || "string", I.validate, (0, $e._)`${W}.validate`] : ["string", I, W];
      }
      function R() {
        if (typeof w == "object" && !(w instanceof RegExp) && w.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, $e._)`await ${h}(${n})`;
        }
        return typeof y == "function" ? (0, $e._)`${h}(${n})` : (0, $e._)`${h}.test(${n})`;
      }
    }
  }
};
Xo.default = Rg;
Object.defineProperty(Bo, "__esModule", { value: !0 });
const Tg = Xo, Ig = [Tg.default];
Bo.default = Ig;
var wr = {};
Object.defineProperty(wr, "__esModule", { value: !0 });
wr.contentVocabulary = wr.metadataVocabulary = void 0;
wr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
wr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(vo, "__esModule", { value: !0 });
const jg = Eo, Ag = So, kg = Do, Cg = Bo, Zi = wr, Dg = [
  jg.default,
  Ag.default,
  (0, kg.default)(),
  Cg.default,
  Zi.metadataVocabulary,
  Zi.contentVocabulary
];
vo.default = Dg;
var Yo = {}, fs = {};
Object.defineProperty(fs, "__esModule", { value: !0 });
fs.DiscrError = void 0;
var xi;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(xi || (fs.DiscrError = xi = {}));
Object.defineProperty(Yo, "__esModule", { value: !0 });
const ur = Z, ea = fs, ec = Fe, Mg = Nr, Lg = L, Fg = {
  message: ({ params: { discrError: e, tagName: t } }) => e === ea.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, ur._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, Vg = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: Fg,
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
    const c = t.let("valid", !1), d = t.const("tag", (0, ur._)`${r}${(0, ur.getProperty)(u)}`);
    t.if((0, ur._)`typeof ${d} == "string"`, () => l(), () => e.error(!1, { discrError: ea.DiscrError.Tag, tag: d, tagName: u })), e.ok(c);
    function l() {
      const _ = P();
      t.if(!1);
      for (const w in _)
        t.elseIf((0, ur._)`${d} === ${w}`), t.assign(c, m(_[w]));
      t.else(), e.error(!1, { discrError: ea.DiscrError.Mapping, tag: d, tagName: u }), t.endIf();
    }
    function m(_) {
      const w = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: _ }, w);
      return e.mergeEvaluated(g, ur.Name), w;
    }
    function P() {
      var _;
      const w = {}, g = h(s);
      let y = !0;
      for (let R = 0; R < i.length; R++) {
        let I = i[R];
        if (I != null && I.$ref && !(0, Lg.schemaHasRulesButRef)(I, a.self.RULES)) {
          const W = I.$ref;
          if (I = ec.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, W), I instanceof ec.SchemaEnv && (I = I.schema), I === void 0)
            throw new Mg.default(a.opts.uriResolver, a.baseId, W);
        }
        const z = (_ = I == null ? void 0 : I.properties) === null || _ === void 0 ? void 0 : _[u];
        if (typeof z != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${u}"`);
        y = y && (g || h(I)), E(z, R);
      }
      if (!y)
        throw new Error(`discriminator: "${u}" must be required`);
      return w;
      function h({ required: R }) {
        return Array.isArray(R) && R.includes(u);
      }
      function E(R, I) {
        if (R.const)
          N(R.const, I);
        else if (R.enum)
          for (const z of R.enum)
            N(z, I);
        else
          throw new Error(`discriminator: "properties/${u}" must have "const" or "enum"`);
      }
      function N(R, I) {
        if (typeof R != "string" || R in w)
          throw new Error(`discriminator: "${u}" values must be unique strings`);
        w[R] = I;
      }
    }
  }
};
Yo.default = Vg;
const Ug = "http://json-schema.org/draft-07/schema#", zg = "http://json-schema.org/draft-07/schema#", qg = "Core schema meta-schema", Kg = {
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
}, Gg = [
  "object",
  "boolean"
], Hg = {
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
}, Wg = {
  $schema: Ug,
  $id: zg,
  title: qg,
  definitions: Kg,
  type: Gg,
  properties: Hg,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Yl, n = vo, s = Yo, a = Wg, i = ["/properties"], u = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((w) => this.addVocabulary(w)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const w = this.opts.$data ? this.$dataMetaSchema(a, i) : a;
      this.addMetaSchema(w, u, !1), this.refs["http://json-schema.org/schema"] = u;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(u) ? u : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var d = et;
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
  var m = sn;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return m.default;
  } });
  var P = Nr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return P.default;
  } });
})(Js, Js.exports);
var Jg = Js.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = Jg, r = Z, n = r.operators, s = {
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
      const { gen: c, data: d, schemaCode: l, keyword: m, it: P } = u, { opts: _, self: w } = P;
      if (!_.validateFormats)
        return;
      const g = new t.KeywordCxt(P, w.RULES.all.format.definition, "format");
      g.$data ? y() : h();
      function y() {
        const N = c.scopeValue("formats", {
          ref: w.formats,
          code: _.code.formats
        }), R = c.const("fmt", r._`${N}[${g.schemaCode}]`);
        u.fail$data(r.or(r._`typeof ${R} != "object"`, r._`${R} instanceof RegExp`, r._`typeof ${R}.compare != "function"`, E(R)));
      }
      function h() {
        const N = g.schema, R = w.formats[N];
        if (!R || R === !0)
          return;
        if (typeof R != "object" || R instanceof RegExp || typeof R.compare != "function")
          throw new Error(`"${m}": format "${N}" does not define "compare" function`);
        const I = c.scopeValue("formats", {
          key: N,
          ref: R,
          code: _.code.formats ? r._`${_.code.formats}${r.getProperty(N)}` : void 0
        });
        u.fail$data(E(I));
      }
      function E(N) {
        return r._`${N}.compare(${d}, ${l}) ${s[m].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const i = (u) => (u.addKeyword(e.formatLimitDefinition), u);
  e.default = i;
})(Xl);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = Bl, n = Xl, s = Z, a = new s.Name("fullFormats"), i = new s.Name("fastFormats"), u = (d, l = { keywords: !0 }) => {
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
    var _, w;
    (_ = (w = d.opts.code).formats) !== null && _ !== void 0 || (w.formats = s._`require("ajv-formats/dist/formats").${P}`);
    for (const g of l)
      d.addFormat(g, m[g]);
  }
  e.exports = t = u, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = u;
})(Ws, Ws.exports);
var Bg = Ws.exports;
const Xg = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const s = Object.getOwnPropertyDescriptor(e, r), a = Object.getOwnPropertyDescriptor(t, r);
  !Yg(s, a) && n || Object.defineProperty(e, r, a);
}, Yg = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, Qg = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, Zg = (e, t) => `/* Wrapped ${e}*/
${t}`, xg = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), ev = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), tv = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, s = Zg.bind(null, n, t.toString());
  Object.defineProperty(s, "name", ev), Object.defineProperty(e, "toString", { ...xg, value: s });
}, rv = (e, t, { ignoreNonConfigurable: r = !1 } = {}) => {
  const { name: n } = e;
  for (const s of Reflect.ownKeys(t))
    Xg(e, t, s, r);
  return Qg(e, t), tv(e, t, n), e;
};
var nv = rv;
const sv = nv;
var av = (e, t = {}) => {
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
  return sv(u, e), u.cancel = () => {
    a && (clearTimeout(a), a = void 0);
  }, u;
}, ta = { exports: {} };
const ov = "2.0.0", Lu = 256, iv = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, cv = 16, lv = Lu - 6, uv = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var hs = {
  MAX_LENGTH: Lu,
  MAX_SAFE_COMPONENT_LENGTH: cv,
  MAX_SAFE_BUILD_LENGTH: lv,
  MAX_SAFE_INTEGER: iv,
  RELEASE_TYPES: uv,
  SEMVER_SPEC_VERSION: ov,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const dv = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var ms = dv;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: s
  } = hs, a = ms;
  t = e.exports = {};
  const i = t.re = [], u = t.safeRe = [], c = t.src = [], d = t.safeSrc = [], l = t.t = {};
  let m = 0;
  const P = "[a-zA-Z0-9-]", _ = [
    ["\\s", 1],
    ["\\d", s],
    [P, n]
  ], w = (y) => {
    for (const [h, E] of _)
      y = y.split(`${h}*`).join(`${h}{0,${E}}`).split(`${h}+`).join(`${h}{1,${E}}`);
    return y;
  }, g = (y, h, E) => {
    const N = w(h), R = m++;
    a(y, R, h), l[y] = R, c[R] = h, d[R] = N, i[R] = new RegExp(h, E ? "g" : void 0), u[R] = new RegExp(N, E ? "g" : void 0);
  };
  g("NUMERICIDENTIFIER", "0|[1-9]\\d*"), g("NUMERICIDENTIFIERLOOSE", "\\d+"), g("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${P}*`), g("MAINVERSION", `(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})`), g("MAINVERSIONLOOSE", `(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASEIDENTIFIER", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIER]})`), g("PRERELEASEIDENTIFIERLOOSE", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASE", `(?:-(${c[l.PRERELEASEIDENTIFIER]}(?:\\.${c[l.PRERELEASEIDENTIFIER]})*))`), g("PRERELEASELOOSE", `(?:-?(${c[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[l.PRERELEASEIDENTIFIERLOOSE]})*))`), g("BUILDIDENTIFIER", `${P}+`), g("BUILD", `(?:\\+(${c[l.BUILDIDENTIFIER]}(?:\\.${c[l.BUILDIDENTIFIER]})*))`), g("FULLPLAIN", `v?${c[l.MAINVERSION]}${c[l.PRERELEASE]}?${c[l.BUILD]}?`), g("FULL", `^${c[l.FULLPLAIN]}$`), g("LOOSEPLAIN", `[v=\\s]*${c[l.MAINVERSIONLOOSE]}${c[l.PRERELEASELOOSE]}?${c[l.BUILD]}?`), g("LOOSE", `^${c[l.LOOSEPLAIN]}$`), g("GTLT", "((?:<|>)?=?)"), g("XRANGEIDENTIFIERLOOSE", `${c[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), g("XRANGEIDENTIFIER", `${c[l.NUMERICIDENTIFIER]}|x|X|\\*`), g("XRANGEPLAIN", `[v=\\s]*(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:${c[l.PRERELEASE]})?${c[l.BUILD]}?)?)?`), g("XRANGEPLAINLOOSE", `[v=\\s]*(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:${c[l.PRERELEASELOOSE]})?${c[l.BUILD]}?)?)?`), g("XRANGE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAIN]}$`), g("XRANGELOOSE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAINLOOSE]}$`), g("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), g("COERCE", `${c[l.COERCEPLAIN]}(?:$|[^\\d])`), g("COERCEFULL", c[l.COERCEPLAIN] + `(?:${c[l.PRERELEASE]})?(?:${c[l.BUILD]})?(?:$|[^\\d])`), g("COERCERTL", c[l.COERCE], !0), g("COERCERTLFULL", c[l.COERCEFULL], !0), g("LONETILDE", "(?:~>?)"), g("TILDETRIM", `(\\s*)${c[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", g("TILDE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAIN]}$`), g("TILDELOOSE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAINLOOSE]}$`), g("LONECARET", "(?:\\^)"), g("CARETTRIM", `(\\s*)${c[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", g("CARET", `^${c[l.LONECARET]}${c[l.XRANGEPLAIN]}$`), g("CARETLOOSE", `^${c[l.LONECARET]}${c[l.XRANGEPLAINLOOSE]}$`), g("COMPARATORLOOSE", `^${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]})$|^$`), g("COMPARATOR", `^${c[l.GTLT]}\\s*(${c[l.FULLPLAIN]})$|^$`), g("COMPARATORTRIM", `(\\s*)${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]}|${c[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", g("HYPHENRANGE", `^\\s*(${c[l.XRANGEPLAIN]})\\s+-\\s+(${c[l.XRANGEPLAIN]})\\s*$`), g("HYPHENRANGELOOSE", `^\\s*(${c[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[l.XRANGEPLAINLOOSE]})\\s*$`), g("STAR", "(<|>)?=?\\s*\\*"), g("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), g("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(ta, ta.exports);
var on = ta.exports;
const fv = Object.freeze({ loose: !0 }), hv = Object.freeze({}), mv = (e) => e ? typeof e != "object" ? fv : e : hv;
var Qo = mv;
const tc = /^[0-9]+$/, Fu = (e, t) => {
  const r = tc.test(e), n = tc.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, pv = (e, t) => Fu(t, e);
var Vu = {
  compareIdentifiers: Fu,
  rcompareIdentifiers: pv
};
const wn = ms, { MAX_LENGTH: rc, MAX_SAFE_INTEGER: Sn } = hs, { safeRe: bn, t: Pn } = on, $v = Qo, { compareIdentifiers: cr } = Vu;
let yv = class nt {
  constructor(t, r) {
    if (r = $v(r), t instanceof nt) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > rc)
      throw new TypeError(
        `version is longer than ${rc} characters`
      );
    wn("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? bn[Pn.LOOSE] : bn[Pn.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > Sn || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Sn || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Sn || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((s) => {
      if (/^[0-9]+$/.test(s)) {
        const a = +s;
        if (a >= 0 && a < Sn)
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
    if (wn("SemVer.compare", this.version, this.options, t), !(t instanceof nt)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new nt(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof nt || (t = new nt(t, this.options)), cr(this.major, t.major) || cr(this.minor, t.minor) || cr(this.patch, t.patch);
  }
  comparePre(t) {
    if (t instanceof nt || (t = new nt(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], s = t.prerelease[r];
      if (wn("prerelease compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return cr(n, s);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof nt || (t = new nt(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], s = t.build[r];
      if (wn("build compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return cr(n, s);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const s = `-${r}`.match(this.options.loose ? bn[Pn.PRERELEASELOOSE] : bn[Pn.PRERELEASE]);
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
          n === !1 && (a = [r]), cr(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = a) : this.prerelease = a;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var ke = yv;
const nc = ke, _v = (e, t, r = !1) => {
  if (e instanceof nc)
    return e;
  try {
    return new nc(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Tr = _v;
const gv = Tr, vv = (e, t) => {
  const r = gv(e, t);
  return r ? r.version : null;
};
var Ev = vv;
const wv = Tr, Sv = (e, t) => {
  const r = wv(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var bv = Sv;
const sc = ke, Pv = (e, t, r, n, s) => {
  typeof r == "string" && (s = n, n = r, r = void 0);
  try {
    return new sc(
      e instanceof sc ? e.version : e,
      r
    ).inc(t, n, s).version;
  } catch {
    return null;
  }
};
var Nv = Pv;
const ac = Tr, Ov = (e, t) => {
  const r = ac(e, null, !0), n = ac(t, null, !0), s = r.compare(n);
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
var Rv = Ov;
const Tv = ke, Iv = (e, t) => new Tv(e, t).major;
var jv = Iv;
const Av = ke, kv = (e, t) => new Av(e, t).minor;
var Cv = kv;
const Dv = ke, Mv = (e, t) => new Dv(e, t).patch;
var Lv = Mv;
const Fv = Tr, Vv = (e, t) => {
  const r = Fv(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var Uv = Vv;
const oc = ke, zv = (e, t, r) => new oc(e, r).compare(new oc(t, r));
var tt = zv;
const qv = tt, Kv = (e, t, r) => qv(t, e, r);
var Gv = Kv;
const Hv = tt, Wv = (e, t) => Hv(e, t, !0);
var Jv = Wv;
const ic = ke, Bv = (e, t, r) => {
  const n = new ic(e, r), s = new ic(t, r);
  return n.compare(s) || n.compareBuild(s);
};
var Zo = Bv;
const Xv = Zo, Yv = (e, t) => e.sort((r, n) => Xv(r, n, t));
var Qv = Yv;
const Zv = Zo, xv = (e, t) => e.sort((r, n) => Zv(n, r, t));
var eE = xv;
const tE = tt, rE = (e, t, r) => tE(e, t, r) > 0;
var ps = rE;
const nE = tt, sE = (e, t, r) => nE(e, t, r) < 0;
var xo = sE;
const aE = tt, oE = (e, t, r) => aE(e, t, r) === 0;
var Uu = oE;
const iE = tt, cE = (e, t, r) => iE(e, t, r) !== 0;
var zu = cE;
const lE = tt, uE = (e, t, r) => lE(e, t, r) >= 0;
var ei = uE;
const dE = tt, fE = (e, t, r) => dE(e, t, r) <= 0;
var ti = fE;
const hE = Uu, mE = zu, pE = ps, $E = ei, yE = xo, _E = ti, gE = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return hE(e, r, n);
    case "!=":
      return mE(e, r, n);
    case ">":
      return pE(e, r, n);
    case ">=":
      return $E(e, r, n);
    case "<":
      return yE(e, r, n);
    case "<=":
      return _E(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var qu = gE;
const vE = ke, EE = Tr, { safeRe: Nn, t: On } = on, wE = (e, t) => {
  if (e instanceof vE)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? Nn[On.COERCEFULL] : Nn[On.COERCE]);
  else {
    const c = t.includePrerelease ? Nn[On.COERCERTLFULL] : Nn[On.COERCERTL];
    let d;
    for (; (d = c.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || d.index + d[0].length !== r.index + r[0].length) && (r = d), c.lastIndex = d.index + d[1].length + d[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], s = r[3] || "0", a = r[4] || "0", i = t.includePrerelease && r[5] ? `-${r[5]}` : "", u = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return EE(`${n}.${s}.${a}${i}${u}`, t);
};
var SE = wE;
class bE {
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
var PE = bE, js, cc;
function rt() {
  if (cc) return js;
  cc = 1;
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
      const D = ((this.options.includePrerelease && _) | (this.options.loose && w)) + ":" + k, O = n.get(D);
      if (O)
        return O;
      const T = this.options.loose, v = T ? c[d.HYPHENRANGELOOSE] : c[d.HYPHENRANGE];
      k = k.replace(v, Q(this.options.includePrerelease)), i("hyphen replace", k), k = k.replace(c[d.COMPARATORTRIM], l), i("comparator trim", k), k = k.replace(c[d.TILDETRIM], m), i("tilde trim", k), k = k.replace(c[d.CARETTRIM], P), i("caret trim", k);
      let p = k.split(" ").map((f) => E(f, this.options)).join(" ").split(/\s+/).map((f) => ne(f, this.options));
      T && (p = p.filter((f) => (i("loose invalid filter", f, this.options), !!f.match(c[d.COMPARATORLOOSE])))), i("range list", p);
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
      return this.set.some((D) => h(D, U) && k.set.some((O) => h(O, U) && D.every((T) => O.every((v) => T.intersects(v, U)))));
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
  js = t;
  const r = PE, n = new r(), s = Qo, a = $s(), i = ms, u = ke, {
    safeRe: c,
    t: d,
    comparatorTrimReplace: l,
    tildeTrimReplace: m,
    caretTrimReplace: P
  } = on, { FLAG_INCLUDE_PRERELEASE: _, FLAG_LOOSE: w } = hs, g = (C) => C.value === "<0.0.0-0", y = (C) => C.value === "", h = (C, k) => {
    let U = !0;
    const D = C.slice();
    let O = D.pop();
    for (; U && D.length; )
      U = D.every((T) => O.intersects(T, k)), O = D.pop();
    return U;
  }, E = (C, k) => (i("comp", C, k), C = z(C, k), i("caret", C), C = R(C, k), i("tildes", C), C = ue(C, k), i("xrange", C), C = H(C, k), i("stars", C), C), N = (C) => !C || C.toLowerCase() === "x" || C === "*", R = (C, k) => C.trim().split(/\s+/).map((U) => I(U, k)).join(" "), I = (C, k) => {
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
  }, ue = (C, k) => (i("replaceXRanges", C, k), C.split(/\s+/).map((U) => V(U, k)).join(" ")), V = (C, k) => {
    C = C.trim();
    const U = k.loose ? c[d.XRANGELOOSE] : c[d.XRANGE];
    return C.replace(U, (D, O, T, v, p, S) => {
      i("xRange", C, D, O, T, v, p, S);
      const $ = N(T), o = $ || N(v), f = o || N(p), b = f;
      return O === "=" && b && (O = ""), S = k.includePrerelease ? "-0" : "", $ ? O === ">" || O === "<" ? D = "<0.0.0-0" : D = "*" : O && b ? (o && (v = 0), p = 0, O === ">" ? (O = ">=", o ? (T = +T + 1, v = 0, p = 0) : (v = +v + 1, p = 0)) : O === "<=" && (O = "<", o ? T = +T + 1 : v = +v + 1), O === "<" && (S = "-0"), D = `${O + T}.${v}.${p}${S}`) : o ? D = `>=${T}.0.0${S} <${+T + 1}.0.0-0` : f && (D = `>=${T}.${v}.0${S} <${T}.${+v + 1}.0-0`), i("xRange return", D), D;
    });
  }, H = (C, k) => (i("replaceStars", C, k), C.trim().replace(c[d.STAR], "")), ne = (C, k) => (i("replaceGTE0", C, k), C.trim().replace(c[k.includePrerelease ? d.GTE0PRE : d.GTE0], "")), Q = (C) => (k, U, D, O, T, v, p, S, $, o, f, b) => (N(D) ? U = "" : N(O) ? U = `>=${D}.0.0${C ? "-0" : ""}` : N(T) ? U = `>=${D}.${O}.0${C ? "-0" : ""}` : v ? U = `>=${U}` : U = `>=${U}${C ? "-0" : ""}`, N($) ? S = "" : N(o) ? S = `<${+$ + 1}.0.0-0` : N(f) ? S = `<${$}.${+o + 1}.0-0` : b ? S = `<=${$}.${o}.${f}-${b}` : C ? S = `<${$}.${o}.${+f + 1}-0` : S = `<=${S}`, `${U} ${S}`.trim()), de = (C, k, U) => {
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
  return js;
}
var As, lc;
function $s() {
  if (lc) return As;
  lc = 1;
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
  As = t;
  const r = Qo, { safeRe: n, t: s } = on, a = qu, i = ms, u = ke, c = rt();
  return As;
}
const NE = rt(), OE = (e, t, r) => {
  try {
    t = new NE(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var ys = OE;
const RE = rt(), TE = (e, t) => new RE(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var IE = TE;
const jE = ke, AE = rt(), kE = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new AE(t, r);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    a.test(i) && (!n || s.compare(i) === -1) && (n = i, s = new jE(n, r));
  }), n;
};
var CE = kE;
const DE = ke, ME = rt(), LE = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new ME(t, r);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    a.test(i) && (!n || s.compare(i) === 1) && (n = i, s = new DE(n, r));
  }), n;
};
var FE = LE;
const ks = ke, VE = rt(), uc = ps, UE = (e, t) => {
  e = new VE(e, t);
  let r = new ks("0.0.0");
  if (e.test(r) || (r = new ks("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const s = e.set[n];
    let a = null;
    s.forEach((i) => {
      const u = new ks(i.semver.version);
      switch (i.operator) {
        case ">":
          u.prerelease.length === 0 ? u.patch++ : u.prerelease.push(0), u.raw = u.format();
        case "":
        case ">=":
          (!a || uc(u, a)) && (a = u);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${i.operator}`);
      }
    }), a && (!r || uc(r, a)) && (r = a);
  }
  return r && e.test(r) ? r : null;
};
var zE = UE;
const qE = rt(), KE = (e, t) => {
  try {
    return new qE(e, t).range || "*";
  } catch {
    return null;
  }
};
var GE = KE;
const HE = ke, Ku = $s(), { ANY: WE } = Ku, JE = rt(), BE = ys, dc = ps, fc = xo, XE = ti, YE = ei, QE = (e, t, r, n) => {
  e = new HE(e, n), t = new JE(t, n);
  let s, a, i, u, c;
  switch (r) {
    case ">":
      s = dc, a = XE, i = fc, u = ">", c = ">=";
      break;
    case "<":
      s = fc, a = YE, i = dc, u = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (BE(e, t, n))
    return !1;
  for (let d = 0; d < t.set.length; ++d) {
    const l = t.set[d];
    let m = null, P = null;
    if (l.forEach((_) => {
      _.semver === WE && (_ = new Ku(">=0.0.0")), m = m || _, P = P || _, s(_.semver, m.semver, n) ? m = _ : i(_.semver, P.semver, n) && (P = _);
    }), m.operator === u || m.operator === c || (!P.operator || P.operator === u) && a(e, P.semver))
      return !1;
    if (P.operator === c && i(e, P.semver))
      return !1;
  }
  return !0;
};
var ri = QE;
const ZE = ri, xE = (e, t, r) => ZE(e, t, ">", r);
var ew = xE;
const tw = ri, rw = (e, t, r) => tw(e, t, "<", r);
var nw = rw;
const hc = rt(), sw = (e, t, r) => (e = new hc(e, r), t = new hc(t, r), e.intersects(t, r));
var aw = sw;
const ow = ys, iw = tt;
var cw = (e, t, r) => {
  const n = [];
  let s = null, a = null;
  const i = e.sort((l, m) => iw(l, m, r));
  for (const l of i)
    ow(l, t, r) ? (a = l, s || (s = l)) : (a && n.push([s, a]), a = null, s = null);
  s && n.push([s, null]);
  const u = [];
  for (const [l, m] of n)
    l === m ? u.push(l) : !m && l === i[0] ? u.push("*") : m ? l === i[0] ? u.push(`<=${m}`) : u.push(`${l} - ${m}`) : u.push(`>=${l}`);
  const c = u.join(" || "), d = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < d.length ? c : t;
};
const mc = rt(), ni = $s(), { ANY: Cs } = ni, Mr = ys, si = tt, lw = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new mc(e, r), t = new mc(t, r);
  let n = !1;
  e: for (const s of e.set) {
    for (const a of t.set) {
      const i = dw(s, a, r);
      if (n = n || i !== null, i)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, uw = [new ni(">=0.0.0-0")], pc = [new ni(">=0.0.0")], dw = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Cs) {
    if (t.length === 1 && t[0].semver === Cs)
      return !0;
    r.includePrerelease ? e = uw : e = pc;
  }
  if (t.length === 1 && t[0].semver === Cs) {
    if (r.includePrerelease)
      return !0;
    t = pc;
  }
  const n = /* @__PURE__ */ new Set();
  let s, a;
  for (const _ of e)
    _.operator === ">" || _.operator === ">=" ? s = $c(s, _, r) : _.operator === "<" || _.operator === "<=" ? a = yc(a, _, r) : n.add(_.semver);
  if (n.size > 1)
    return null;
  let i;
  if (s && a) {
    if (i = si(s.semver, a.semver, r), i > 0)
      return null;
    if (i === 0 && (s.operator !== ">=" || a.operator !== "<="))
      return null;
  }
  for (const _ of n) {
    if (s && !Mr(_, String(s), r) || a && !Mr(_, String(a), r))
      return null;
    for (const w of t)
      if (!Mr(_, String(w), r))
        return !1;
    return !0;
  }
  let u, c, d, l, m = a && !r.includePrerelease && a.semver.prerelease.length ? a.semver : !1, P = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
  m && m.prerelease.length === 1 && a.operator === "<" && m.prerelease[0] === 0 && (m = !1);
  for (const _ of t) {
    if (l = l || _.operator === ">" || _.operator === ">=", d = d || _.operator === "<" || _.operator === "<=", s) {
      if (P && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === P.major && _.semver.minor === P.minor && _.semver.patch === P.patch && (P = !1), _.operator === ">" || _.operator === ">=") {
        if (u = $c(s, _, r), u === _ && u !== s)
          return !1;
      } else if (s.operator === ">=" && !Mr(s.semver, String(_), r))
        return !1;
    }
    if (a) {
      if (m && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === m.major && _.semver.minor === m.minor && _.semver.patch === m.patch && (m = !1), _.operator === "<" || _.operator === "<=") {
        if (c = yc(a, _, r), c === _ && c !== a)
          return !1;
      } else if (a.operator === "<=" && !Mr(a.semver, String(_), r))
        return !1;
    }
    if (!_.operator && (a || s) && i !== 0)
      return !1;
  }
  return !(s && d && !a && i !== 0 || a && l && !s && i !== 0 || P || m);
}, $c = (e, t, r) => {
  if (!e)
    return t;
  const n = si(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, yc = (e, t, r) => {
  if (!e)
    return t;
  const n = si(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var fw = lw;
const Ds = on, _c = hs, hw = ke, gc = Vu, mw = Tr, pw = Ev, $w = bv, yw = Nv, _w = Rv, gw = jv, vw = Cv, Ew = Lv, ww = Uv, Sw = tt, bw = Gv, Pw = Jv, Nw = Zo, Ow = Qv, Rw = eE, Tw = ps, Iw = xo, jw = Uu, Aw = zu, kw = ei, Cw = ti, Dw = qu, Mw = SE, Lw = $s(), Fw = rt(), Vw = ys, Uw = IE, zw = CE, qw = FE, Kw = zE, Gw = GE, Hw = ri, Ww = ew, Jw = nw, Bw = aw, Xw = cw, Yw = fw;
var Qw = {
  parse: mw,
  valid: pw,
  clean: $w,
  inc: yw,
  diff: _w,
  major: gw,
  minor: vw,
  patch: Ew,
  prerelease: ww,
  compare: Sw,
  rcompare: bw,
  compareLoose: Pw,
  compareBuild: Nw,
  sort: Ow,
  rsort: Rw,
  gt: Tw,
  lt: Iw,
  eq: jw,
  neq: Aw,
  gte: kw,
  lte: Cw,
  cmp: Dw,
  coerce: Mw,
  Comparator: Lw,
  Range: Fw,
  satisfies: Vw,
  toComparators: Uw,
  maxSatisfying: zw,
  minSatisfying: qw,
  minVersion: Kw,
  validRange: Gw,
  outside: Hw,
  gtr: Ww,
  ltr: Jw,
  intersects: Bw,
  simplifyRange: Xw,
  subset: Yw,
  SemVer: hw,
  re: Ds.re,
  src: Ds.src,
  tokens: Ds.t,
  SEMVER_SPEC_VERSION: _c.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: _c.RELEASE_TYPES,
  compareIdentifiers: gc.compareIdentifiers,
  rcompareIdentifiers: gc.rcompareIdentifiers
}, _s = { exports: {} }, ai = { exports: {} };
const Gu = (e, t) => {
  for (const r of Reflect.ownKeys(t))
    Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
  return e;
};
ai.exports = Gu;
ai.exports.default = Gu;
var Zw = ai.exports;
const xw = Zw, Zn = /* @__PURE__ */ new WeakMap(), Hu = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let r, n = 0;
  const s = e.displayName || e.name || "<anonymous>", a = function(...i) {
    if (Zn.set(a, ++n), n === 1)
      r = e.apply(this, i), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${s}\` can only be called once`);
    return r;
  };
  return xw(a, e), Zn.set(a, n), a;
};
_s.exports = Hu;
_s.exports.default = Hu;
_s.exports.callCount = (e) => {
  if (!Zn.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return Zn.get(e);
};
var eS = _s.exports;
(function(e, t) {
  var r = cn && cn.__classPrivateFieldSet || function(D, O, T, v, p) {
    if (v === "m") throw new TypeError("Private method is not writable");
    if (v === "a" && !p) throw new TypeError("Private accessor was defined without a setter");
    if (typeof O == "function" ? D !== O || !p : !O.has(D)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return v === "a" ? p.call(D, T) : p ? p.value = T : O.set(D, T), T;
  }, n = cn && cn.__classPrivateFieldGet || function(D, O, T, v) {
    if (T === "a" && !v) throw new TypeError("Private accessor was defined without a getter");
    if (typeof O == "function" ? D !== O || !v : !O.has(D)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return T === "m" ? v : T === "a" ? v.call(D) : v ? v.value : O.get(D);
  }, s, a, i, u, c, d;
  Object.defineProperty(t, "__esModule", { value: !0 });
  const l = Oc, m = na, P = nr, _ = Yu, w = Qu, g = Zu, y = ud, h = Ed, E = Pd, N = it, R = M$, I = Bg, z = av, W = Qw, ue = eS, V = "aes-256-cbc", H = () => /* @__PURE__ */ Object.create(null), ne = (D) => D != null;
  let Q = "";
  try {
    delete require.cache[__filename], Q = P.dirname((a = (s = e.parent) === null || s === void 0 ? void 0 : s.filename) !== null && a !== void 0 ? a : ".");
  } catch {
  }
  const de = (D, O) => {
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
        v.cwd = E(v.projectName, { suffix: v.projectSuffix }).config;
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
      }, "f"), v.serialize && (this._serialize = v.serialize), v.deserialize && (this._deserialize = v.deserialize), this.events = new g.EventEmitter(), r(this, u, v.encryptionKey, "f");
      const S = v.fileExtension ? `.${v.fileExtension}` : "";
      this.path = P.resolve(v.cwd, `${(T = v.configName) !== null && T !== void 0 ? T : "config"}${S}`);
      const $ = this.store, o = Object.assign(H(), v.defaults, $);
      this._validate(o);
      try {
        w.deepEqual($, o);
      } catch {
        this.store = o;
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
        de(S, $), n(this, c, "f").accessPropertiesByDotNotation ? y.set(v, S, $) : v[S] = $;
      };
      if (typeof O == "object") {
        const S = O;
        for (const [$, o] of Object.entries(S))
          p($, o);
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
        const O = m.readFileSync(this.path, n(this, u, "f") ? null : "utf8"), T = this._encryptData(O), v = this._deserialize(T);
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
      for (const [O, T] of Object.entries(this.store))
        yield [O, T];
    }
    _encryptData(O) {
      if (!n(this, u, "f"))
        return O.toString();
      try {
        if (n(this, u, "f"))
          try {
            if (O.slice(16, 17).toString() === ":") {
              const T = O.slice(0, 16), v = _.pbkdf2Sync(n(this, u, "f"), T.toString(), 1e4, 32, "sha512"), p = _.createDecipheriv(V, v, T);
              O = Buffer.concat([p.update(Buffer.from(O.slice(17))), p.final()]).toString("utf8");
            } else {
              const T = _.createDecipher(V, n(this, u, "f"));
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
        (0, l.isDeepStrictEqual)($, S) || (v = $, T.call(this, $, S));
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
      if (n(this, u, "f")) {
        const v = _.randomBytes(16), p = _.pbkdf2Sync(n(this, u, "f"), v.toString(), 1e4, 32, "sha512"), S = _.createCipheriv(V, p, v);
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
      const S = Object.keys(O).filter((o) => this._shouldPerformMigration(o, p, T));
      let $ = { ...this.store };
      for (const o of S)
        try {
          v && v(this, {
            fromVersion: p,
            toVersion: o,
            finalVersion: T,
            versions: S
          });
          const f = O[o];
          f(this), this._set(k, o), p = o, $ = { ...this.store };
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
})(Ms, Ms.exports);
var tS = Ms.exports;
const vc = nr, { app: Vn, ipcMain: ra, ipcRenderer: Ec, shell: rS } = Ju, nS = tS;
let wc = !1;
const Sc = () => {
  if (!ra || !Vn)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: Vn.getPath("userData"),
    appVersion: Vn.getVersion()
  };
  return wc || (ra.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), wc = !0), e;
};
class sS extends nS {
  constructor(t) {
    let r, n;
    if (Ec) {
      const s = Ec.sendSync("electron-store-get-data");
      if (!s)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = s);
    } else ra && Vn && ({ defaultCwd: r, appVersion: n } = Sc());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = vc.isAbsolute(t.cwd) ? t.cwd : vc.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    Sc();
  }
  async openInEditor() {
    const t = await rS.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var aS = sS;
const gs = /* @__PURE__ */ od(aS), bc = new gs();
let ze = null;
function Wu() {
  ze = new ht({
    icon: Ve.join($r, "electron-vite.svg"),
    show: !1,
    frame: !1,
    webPreferences: {
      preload: Un,
      contextIsolation: !0,
      nodeIntegration: !1
    },
    minWidth: 800,
    minHeight: 600,
    height: 600,
    width: 800
  });
  const e = bc.get("theme") || "light", t = bc.get("palette") || "default";
  ze.webContents.on("did-finish-load", () => {
    ze == null || ze.webContents.send("update-theme", e), ze == null || ze.webContents.send("update-palette", t), ze == null || ze.show();
  }), Yr ? ze.loadURL(Ic) : ze.loadFile(Ve.join(Qr, "index.html"));
}
function oS() {
  Tn.on("window-all-closed", () => {
    process.platform !== "darwin" && Tn.quit();
  }), Tn.on("activate", () => {
    ht.getAllWindows().length === 0 && Wu();
  });
}
function iS() {
  let e;
  ot.on("window-minimize", () => {
    e = ht.getFocusedWindow(), e && e.minimize();
  }), ot.on("window-toggle-maximize", () => {
    e = ht.getFocusedWindow(), e && (e.isMaximized() ? e.unmaximize() : e.maximize());
  }), ot.on("window-close", () => {
    e = ht.getFocusedWindow(), e && e.close();
  });
}
const Pc = new gs();
let ye = null;
function cS() {
  ye = new ht({
    icon: Ve.join($r, "electron-vite.svg"),
    show: !1,
    frame: !1,
    title: "settings",
    webPreferences: {
      preload: Un,
      contextIsolation: !0,
      nodeIntegration: !1
    },
    minWidth: 800,
    minHeight: 600,
    height: 600,
    width: 800
  });
  const e = Pc.get("theme") || "light", t = Pc.get("palette") || "default";
  ye.webContents.on("did-finish-load", () => {
    ye == null || ye.webContents.send("update-theme", e), ye == null || ye.webContents.send("update-palette", t), ye == null || ye.show();
  }), ye.on("closed", () => {
    ye = null;
  }), Yr ? ye.loadURL(jc) : ye.loadURL(`file://${Qr}/index.html#/settings`);
}
const Nc = new gs();
let _e = null;
function lS() {
  _e = new ht({
    icon: Ve.join($r, "electron-vite.svg"),
    show: !1,
    frame: !1,
    title: "dev",
    webPreferences: {
      preload: Un,
      contextIsolation: !0,
      nodeIntegration: !1
    },
    minWidth: 800,
    minHeight: 600,
    height: 600,
    width: 800
  });
  const e = Nc.get("theme") || "light", t = Nc.get("palette") || "default";
  _e.webContents.on("did-finish-load", () => {
    _e == null || _e.webContents.send("update-theme", e), _e == null || _e.webContents.send("update-palette", t), _e == null || _e.show();
  }), _e.on("closed", () => {
    _e = null;
  }), ot.handle("get-constains", () => ({
    __filename: Rc,
    __dirname: xn,
    __approot: sa,
    __preloadpath: Un,
    tool_dir: ed,
    theme_dir: td,
    MAIN_WINDOW_DEV_URL: Ic,
    SETTINGS_WINDOW_DEV_URL: jc,
    TOOL_WINDOW_DEV_URL: rd,
    DEV_WINDOW_DEV_URL: oi,
    CREATE_FOLDER_WINDOW_DEV_URL: nd,
    VITE_DEV_SERVER_URL: Yr,
    RENDERER_DIST: Qr,
    VITE_PUBLIC: $r,
    TOOL_DIR_DEV_PATH: sd,
    THEME_DIR_DEV_PATH: ad
  })), Yr ? _e.loadURL(oi) : _e.loadURL(`file://${Qr}/index.html#/dev`);
}
function uS() {
  ot.on("open-settings-window", () => {
    ye != null && ye.isClosable ? ye.focus() : cS();
  }), ot.on("open-dev-window", () => {
    _e != null && _e.isClosable ? _e.focus() : lS();
  });
}
const Rn = new gs();
function dS() {
  oS(), iS(), uS(), ot.handle("get-theme", async () => {
    const e = Rn.get("theme");
    return e === "light" || e === "dark" ? e : "light";
  }), ot.handle("get-palette", async () => {
    const e = Rn.get("palette");
    return typeof e == "string" ? e : "default";
  }), Tn.whenReady().then(() => {
    Bu.registerFileProtocol("save-file", (e, t) => {
      const r = e.url.replace("save-file://", "");
      try {
        t(decodeURIComponent(r));
      } catch (n) {
        console.error("Protocol error:", n), t({ error: -6 });
      }
    }), Wu(), ot.on("set-theme", (e, t) => {
      Rn.set("theme", t), ht.getAllWindows().forEach((r) => {
        r.webContents.send("update-theme", t);
      });
    }), ot.on("set-palette", (e, t) => {
      Rn.set("palette", t), ht.getAllWindows().forEach((r) => {
        r.webContents.send("update-palette", t);
      });
    });
  }).catch((e) => {
    console.error("Failed to create window:", e);
  });
}
dS();
