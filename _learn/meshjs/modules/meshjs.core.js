import { customAlphabet as Ce } from "nanoid";
import * as a from "@emurgo/cardano-serialization-lib-browser";
import ot from "axios";
import { mnemonicToEntropy as pe, generateMnemonic as Le } from "bip39";
import { COSEKey as we, COSESign1 as $e, Label as J, Int as pt, BigNum as Ut, KeyType as qe, AlgorithmId as ye, CBORValue as kt, HeaderMap as qt, Headers as ze, ProtectedHeaderMap as Je, COSESign1Builder as We } from "@emurgo/cardano-message-signing-nodejs";
const me = {
  mem: 7e6,
  steps: 3e9
}, Y = {
  epoch: 0,
  coinsPerUTxOSize: "4310",
  priceMem: 0.0577,
  priceStep: 721e-7,
  minFeeA: 44,
  minFeeB: 155381,
  keyDeposit: "2000000",
  maxTxSize: 16384,
  maxValSize: "5000",
  poolDeposit: "500000000",
  maxCollateralInputs: 3,
  decentralisation: 0,
  maxBlockSize: 98304,
  collateralPercent: 150,
  maxBlockHeaderSize: 1100,
  minPoolCost: "340000000",
  maxTxExMem: "16000000",
  maxTxExSteps: "10000000000",
  maxBlockExMem: "80000000",
  maxBlockExSteps: "40000000000"
}, bt = 2147483648, mt = {
  V1: a.Language.new_plutus_v1(),
  V2: a.Language.new_plutus_v2()
}, N = 56, je = {
  CERT: a.RedeemerTag.new_cert(),
  MINT: a.RedeemerTag.new_mint(),
  REWARD: a.RedeemerTag.new_reward(),
  SPEND: a.RedeemerTag.new_spend()
}, Et = {
  testnet: ["74", "1598400", "1595967616", "432000"],
  preview: ["0", "0", "1660003200", "86400"],
  preprod: ["0", "0", "1654041600", "432000"],
  mainnet: ["208", "4492800", "1596059091", "432000"]
}, zt = {
  ALONZO: a.TxBuilderConstants.plutus_alonzo_cost_models(),
  BABBAGE: a.TxBuilderConstants.plutus_vasil_cost_models()
}, Xe = {
  ALONZO: {
    V1: "a141005901d59f1a000302590001011a00060bc719026d00011a000249f01903e800011a000249f018201a0025cea81971f70419744d186419744d186419744d186419744d186419744d186419744d18641864186419744d18641a000249f018201a000249f018201a000249f018201a000249f01903e800011a000249f018201a000249f01903e800081a000242201a00067e2318760001011a000249f01903e800081a000249f01a0001b79818f7011a000249f0192710011a0002155e19052e011903e81a000249f01903e8011a000249f018201a000249f018201a000249f0182001011a000249f0011a000249f0041a000194af18f8011a000194af18f8011a0002377c190556011a0002bdea1901f1011a000249f018201a000249f018201a000249f018201a000249f018201a000249f018201a000249f018201a000242201a00067e23187600010119f04c192bd200011a000249f018201a000242201a00067e2318760001011a000242201a00067e2318760001011a0025cea81971f704001a000141bb041a000249f019138800011a000249f018201a000302590001011a000249f018201a000249f018201a000249f018201a000249f018201a000249f018201a000249f018201a000249f018201a00330da70101ff"
  },
  BABBAGE: {
    V1: "a141005901b69f1a0003236119032c01011903e819023b00011903e8195e7104011903e818201a0001ca761928eb041959d818641959d818641959d818641959d818641959d818641959d81864186418641959d81864194c5118201a0002acfa182019b551041a000363151901ff00011a00015c3518201a000797751936f404021a0002ff941a0006ea7818dc0001011903e8196ff604021a0003bd081a00034ec5183e011a00102e0f19312a011a00032e801901a5011a0002da781903e819cf06011a00013a34182019a8f118201903e818201a00013aac0119e143041903e80a1a00030219189c011a00030219189c011a0003207c1901d9011a000330001901ff0119ccf3182019fd40182019ffd5182019581e18201940b318201a00012adf18201a0002ff941a0006ea7818dc0001011a00010f92192da7000119eabb18201a0002ff941a0006ea7818dc0001011a0002ff941a0006ea7818dc0001011a000c504e197712041a001d6af61a0001425b041a00040c660004001a00014fab18201a0003236119032c010119a0de18201a00033d7618201979f41820197fb8182019a95d1820197df718201995aa18201a009063b91903fd0aff",
    V2: "a20198af1a0003236119032c01011903e819023b00011903e8195e7104011903e818201a0001ca761928eb041959d818641959d818641959d818641959d818641959d818641959d81864186418641959d81864194c5118201a0002acfa182019b551041a000363151901ff00011a00015c3518201a000797751936f404021a0002ff941a0006ea7818dc0001011903e8196ff604021a0003bd081a00034ec5183e011a00102e0f19312a011a00032e801901a5011a0002da781903e819cf06011a00013a34182019a8f118201903e818201a00013aac0119e143041903e80a1a00030219189c011a00030219189c011a0003207c1901d9011a000330001901ff0119ccf3182019fd40182019ffd5182019581e18201940b318201a00012adf18201a0002ff941a0006ea7818dc0001011a00010f92192da7000119eabb18201a0002ff941a0006ea7818dc0001011a0002ff941a0006ea7818dc0001011a0011b22c1a0005fdde00021a000c504e197712041a001d6af61a0001425b041a00040c660004001a00014fab18201a0003236119032c010119a0de18201a00033d7618201979f41820197fb8182019a95d1820197df718201995aa18201b00000004a817c8001b00000004a817c8001a009063b91903fd0a1b00000004a817c800001b00000004a817c80041005901b69f1a0003236119032c01011903e819023b00011903e8195e7104011903e818201a0001ca761928eb041959d818641959d818641959d818641959d818641959d818641959d81864186418641959d81864194c5118201a0002acfa182019b551041a000363151901ff00011a00015c3518201a000797751936f404021a0002ff941a0006ea7818dc0001011903e8196ff604021a0003bd081a00034ec5183e011a00102e0f19312a011a00032e801901a5011a0002da781903e819cf06011a00013a34182019a8f118201903e818201a00013aac0119e143041903e80a1a00030219189c011a00030219189c011a0003207c1901d9011a000330001901ff0119ccf3182019fd40182019ffd5182019581e18201940b318201a00012adf18201a0002ff941a0006ea7818dc0001011a00010f92192da7000119eabb18201a0002ff941a0006ea7818dc0001011a0002ff941a0006ea7818dc0001011a000c504e197712041a001d6af61a0001425b041a00040c660004001a00014fab18201a0003236119032c010119a0de18201a00033d7618201979f41820197fb8182019a95d1820197df718201995aa18201a009063b91903fd0aff"
  }
}, Ht = {
  [a.NetworkInfo.testnet().network_id()]: "8d18d786e92776c824607fd8e193ec535c79dc61ea2405ddf3b09fe3",
  [a.NetworkInfo.mainnet().network_id()]: "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
}, Jt = [
  "begin",
  "eternl",
  "flint",
  "nami",
  "nufi",
  "gerowallet",
  "typhoncip30"
], Ze = (s, e, t = !1, { maxTxSize: r, minFeeA: i, minFeeB: n } = Y) => {
  const o = e.filter((h) => Be(h) === !1).sort(Ee), A = a.BigNum.from_str(Ye(r, i, n)), c = t ? a.BigNum.from_str(s).checked_add(A).to_str() : s;
  return Bt(o, /* @__PURE__ */ new Map([
    ["lovelace", c]
  ]));
}, ts = (s, e, t = !1, r = Y) => {
  const i = e.filter(Be).sort(Ee), n = s.get("lovelace") ?? "0", { maxTxSize: o, minFeeA: A, minFeeB: c } = r, I = a.BigNum.from_str(Ye(o, A, c)), u = t ? a.BigNum.from_str(n).checked_add(I).to_str() : n;
  return s.set("lovelace", u), Bt(i, s);
}, es = (s, e) => Array.from(e, (t) => ({ unit: t[0], quantity: a.BigNum.from_str(t[1]) })).every((t) => s.filter((r) => r.output.amount.find((i) => i.unit === t.unit) !== void 0).reduce((r, i) => {
  const n = i.output.amount.reduce((o, A) => o.checked_add(a.BigNum.from_str(A.quantity)), a.BigNum.from_str("0"));
  return r.checked_add(n);
}, a.BigNum.from_str("0")).less_than(t.quantity) === !1), Ee = (s, e) => {
  var i, n;
  const t = a.BigNum.from_str(((i = s.output.amount.find((o) => o.unit === "lovelace")) == null ? void 0 : i.quantity) ?? "0");
  return a.BigNum.from_str(((n = e.output.amount.find((o) => o.unit === "lovelace")) == null ? void 0 : n.quantity) ?? "0").compare(t);
}, Be = (s) => s.output.amount.length > 1, Bt = (s, e, t = []) => s.length === 0 || es(t, e) ? t : ss(s[0], e) ? Bt(s.slice(1), e, [...t, s[0]]) : Bt(s.slice(1), e, t), ss = (s, e) => Array.from(e.keys()).some((t) => s.output.amount.find((r) => r.unit === t) !== void 0), rs = (s, e) => {
  const t = as(e), r = ns(s, e);
  return {
    coseKey: K(t.to_bytes()),
    coseSign1: K(r.to_bytes())
  };
}, Xs = (s, e, { key: t, signature: r }) => {
  var o, A;
  const i = we.from_bytes(f(t)), n = $e.from_bytes(f(r));
  if ((s == null ? void 0 : s.length) > 0) {
    const c = K(n.payload() ?? new Uint8Array());
    if (S(s) !== c)
      return !1;
  }
  if ((e == null ? void 0 : e.length) > 0) {
    const I = (o = n.headers().protected().deserialized_headers().header(J.new_text("address"))) == null ? void 0 : o.as_bytes();
    if (I === void 0)
      throw new Error("Couldn't find a signer address in signature");
    const u = (A = i.header(J.new_int(pt.new_negative(Ut.from_str("2"))))) == null ? void 0 : A.as_bytes();
    if (u === void 0)
      throw new Error("Couldn't find a signer key in signature");
    const h = tt(K(I)), g = Us(K(u));
    if (is(e, h, g) === !1)
      throw new Error("Couldn't check signature because of address mismatch");
    const p = Ks(K(n.signature())), x = n.signed_data().to_bytes();
    return g.verify(x, p);
  }
  return !1;
}, is = (s, e, t) => {
  if (s !== e.to_bech32())
    return !1;
  try {
    return It(s) === t.hash().to_hex();
  } catch {
    return !1;
  }
}, as = (s) => {
  const e = we.new(J.from_key_type(qe.OKP));
  return e.set_algorithm_id(J.from_algorithm_id(ye.EdDSA)), e.set_header(J.new_int(pt.new_negative(Ut.from_str("1"))), kt.new_int(pt.new_i32(6))), e.set_header(J.new_int(pt.new_negative(Ut.from_str("2"))), kt.new_bytes(s.key.to_public().as_bytes())), e;
}, ns = (s, e) => {
  const t = qt.new(), r = qt.new();
  t.set_algorithm_id(J.from_algorithm_id(ye.EdDSA)), t.set_header(J.new_text("address"), kt.new_bytes(e.address.to_bytes()));
  const i = ze.new(Je.new(t), r), n = We.new(i, f(s.payload), !1);
  s.externalAAD !== void 0 && n.set_external_aad(f(s.externalAAD));
  const o = n.make_data_to_sign(), A = e.key.sign(o.to_bytes());
  return n.build(A.to_bytes());
};
var Wt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, xe = {}, Q = { exports: {} };
G.notEqual = As;
G.notOk = cs;
G.equal = os;
G.ok = G;
var Qe = G;
function os(s, e, t) {
  G(s == e, t);
}
function As(s, e, t) {
  G(s != e, t);
}
function cs(s, e) {
  G(!s, e);
}
function G(s, e) {
  if (!s)
    throw new Error(e || "AssertionError");
}
var P = { exports: {} };
function Is(s) {
  throw new Error('Could not dynamically require "' + s + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var hs = Pt;
Pt.supported = typeof WebAssembly < "u";
function Pt(s) {
  if (!Pt.supported)
    return null;
  var e = s && s.imports, t = us("AGFzbQEAAAABEANgAn9/AGADf39/AGABfwADBQQAAQICBQUBAQroBwdNBQZtZW1vcnkCAAxibGFrZTJiX2luaXQAAA5ibGFrZTJiX3VwZGF0ZQABDWJsYWtlMmJfZmluYWwAAhBibGFrZTJiX2NvbXByZXNzAAMK00AElgMAIABCADcDACAAQQhqQgA3AwAgAEEQakIANwMAIABBGGpCADcDACAAQSBqQgA3AwAgAEEoakIANwMAIABBMGpCADcDACAAQThqQgA3AwAgAEHAAGpCADcDACAAQcgAakIANwMAIABB0ABqQgA3AwAgAEHYAGpCADcDACAAQeAAakIANwMAIABB6ABqQgA3AwAgAEHwAGpCADcDACAAQfgAakIANwMAIABBgAFqQoiS853/zPmE6gBBACkDAIU3AwAgAEGIAWpCu86qptjQ67O7f0EIKQMAhTcDACAAQZABakKr8NP0r+68tzxBECkDAIU3AwAgAEGYAWpC8e30+KWn/aelf0EYKQMAhTcDACAAQaABakLRhZrv+s+Uh9EAQSApAwCFNwMAIABBqAFqQp/Y+dnCkdqCm39BKCkDAIU3AwAgAEGwAWpC6/qG2r+19sEfQTApAwCFNwMAIABBuAFqQvnC+JuRo7Pw2wBBOCkDAIU3AwAgAEHAAWpCADcDACAAQcgBakIANwMAIABB0AFqQgA3AwALbQEDfyAAQcABaiEDIABByAFqIQQgBCkDAKchBQJAA0AgASACRg0BIAVBgAFGBEAgAyADKQMAIAWtfDcDAEEAIQUgABADCyAAIAVqIAEtAAA6AAAgBUEBaiEFIAFBAWohAQwACwsgBCAFrTcDAAtkAQN/IABBwAFqIQEgAEHIAWohAiABIAEpAwAgAikDAHw3AwAgAEHQAWpCfzcDACACKQMApyEDAkADQCADQYABRg0BIAAgA2pBADoAACADQQFqIQMMAAsLIAIgA603AwAgABADC+U7AiB+CX8gAEGAAWohISAAQYgBaiEiIABBkAFqISMgAEGYAWohJCAAQaABaiElIABBqAFqISYgAEGwAWohJyAAQbgBaiEoICEpAwAhASAiKQMAIQIgIykDACEDICQpAwAhBCAlKQMAIQUgJikDACEGICcpAwAhByAoKQMAIQhCiJLznf/M+YTqACEJQrvOqqbY0Ouzu38hCkKr8NP0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"), r = null, i = {
    buffer: t,
    memory: null,
    exports: null,
    realloc: n,
    onload: o
  };
  return o(function() {
  }), i;
  function n(c) {
    i.exports.memory.grow(Math.ceil(Math.abs(c - i.memory.length) / 65536)), i.memory = new Uint8Array(i.exports.memory.buffer);
  }
  function o(c) {
    if (i.exports)
      return c();
    if (r) {
      r.then(c.bind(null, null)).catch(c);
      return;
    }
    try {
      if (s && s.async)
        throw new Error("async");
      A({ instance: new WebAssembly.Instance(new WebAssembly.Module(t), e) });
    } catch {
      r = WebAssembly.instantiate(t, e).then(A);
    }
    o(c);
  }
  function A(c) {
    i.exports = c.instance.exports, i.memory = i.exports.memory && i.exports.memory.buffer && new Uint8Array(i.exports.memory.buffer);
  }
}
function us(s) {
  return typeof atob == "function" ? new Uint8Array(atob(s).split("").map(ds)) : new (Is("buffer")).Buffer(s, "base64");
}
function ds(s) {
  return s.charCodeAt(0);
}
var k = Qe, C = hs(), V = 64, wt = [];
P.exports = D;
var jt = P.exports.BYTES_MIN = 16, Xt = P.exports.BYTES_MAX = 64;
P.exports.BYTES = 32;
var Zt = P.exports.KEYBYTES_MIN = 16, te = P.exports.KEYBYTES_MAX = 64;
P.exports.KEYBYTES = 32;
var ee = P.exports.SALTBYTES = 16, se = P.exports.PERSONALBYTES = 16;
function D(s, e, t, r, i) {
  if (!(this instanceof D))
    return new D(s, e, t, r, i);
  if (!(C && C.exports))
    throw new Error("WASM not loaded. Wait for Blake2b.ready(cb)");
  s || (s = 32), i !== !0 && (k(s >= jt, "digestLength must be at least " + jt + ", was given " + s), k(s <= Xt, "digestLength must be at most " + Xt + ", was given " + s), e != null && k(e.length >= Zt, "key must be at least " + Zt + ", was given " + e.length), e != null && k(e.length <= te, "key must be at least " + te + ", was given " + e.length), t != null && k(t.length === ee, "salt must be exactly " + ee + ", was given " + t.length), r != null && k(r.length === se, "personal must be exactly " + se + ", was given " + r.length)), wt.length || (wt.push(V), V += 216), this.digestLength = s, this.finalized = !1, this.pointer = wt.pop(), C.memory.fill(0, 0, 64), C.memory[0] = this.digestLength, C.memory[1] = e ? e.length : 0, C.memory[2] = 1, C.memory[3] = 1, t && C.memory.set(t, 32), r && C.memory.set(r, 48), this.pointer + 216 > C.memory.length && C.realloc(this.pointer + 216), C.exports.blake2b_init(this.pointer, this.digestLength), e && (this.update(e), C.memory.fill(0, V, V + e.length), C.memory[this.pointer + 200] = 128);
}
D.prototype.update = function(s) {
  return k(this.finalized === !1, "Hash instance finalized"), k(s, "input must be TypedArray or Buffer"), V + s.length > C.memory.length && C.realloc(V + s.length), C.memory.set(s, V), C.exports.blake2b_update(this.pointer, V, V + s.length), this;
};
D.prototype.digest = function(s) {
  if (k(this.finalized === !1, "Hash instance finalized"), this.finalized = !0, wt.push(this.pointer), C.exports.blake2b_final(this.pointer), !s || s === "binary")
    return C.memory.slice(this.pointer + 128, this.pointer + 128 + this.digestLength);
  if (s === "hex")
    return gs(C.memory, this.pointer + 128, this.digestLength);
  k(s.length >= this.digestLength, "input must be TypedArray or Buffer");
  for (var e = 0; e < this.digestLength; e++)
    s[e] = C.memory[this.pointer + 128 + e];
  return s;
};
D.prototype.final = D.prototype.digest;
D.WASM = C && C.buffer;
D.SUPPORTED = typeof WebAssembly < "u";
D.ready = function(s) {
  if (s || (s = ls), !C)
    return s(new Error("WebAssembly not supported"));
  var e = new Promise(function(t, r) {
    C.onload(function(i) {
      i ? r() : t(), s(i);
    });
  });
  return e;
};
D.prototype.ready = D.ready;
function ls() {
}
function gs(s, e, t) {
  for (var r = "", i = 0; i < t; i++)
    r += fs(s[e + i]);
  return r;
}
function fs(s) {
  return s < 16 ? "0" + s.toString(16) : s.toString(16);
}
var z = Qe, ut = P.exports;
function gt(s, e, t) {
  var r = s[e] + s[t], i = s[e + 1] + s[t + 1];
  r >= 4294967296 && i++, s[e] = r, s[e + 1] = i;
}
function re(s, e, t, r) {
  var i = s[e] + t;
  t < 0 && (i += 4294967296);
  var n = s[e + 1] + r;
  i >= 4294967296 && n++, s[e] = i, s[e + 1] = n;
}
function Se(s, e) {
  return s[e] ^ s[e + 1] << 8 ^ s[e + 2] << 16 ^ s[e + 3] << 24;
}
function $(s, e, t, r, i, n) {
  var o = ct[i], A = ct[i + 1], c = ct[n], I = ct[n + 1];
  gt(d, s, e), re(d, s, o, A);
  var u = d[r] ^ d[s], h = d[r + 1] ^ d[s + 1];
  d[r] = h, d[r + 1] = u, gt(d, t, r), u = d[e] ^ d[t], h = d[e + 1] ^ d[t + 1], d[e] = u >>> 24 ^ h << 8, d[e + 1] = h >>> 24 ^ u << 8, gt(d, s, e), re(d, s, c, I), u = d[r] ^ d[s], h = d[r + 1] ^ d[s + 1], d[r] = u >>> 16 ^ h << 16, d[r + 1] = h >>> 16 ^ u << 16, gt(d, t, r), u = d[e] ^ d[t], h = d[e + 1] ^ d[t + 1], d[e] = h >>> 31 ^ u << 1, d[e + 1] = u >>> 31 ^ h << 1;
}
var De = new Uint32Array([
  4089235720,
  1779033703,
  2227873595,
  3144134277,
  4271175723,
  1013904242,
  1595750129,
  2773480762,
  2917565137,
  1359893119,
  725511199,
  2600822924,
  4215389547,
  528734635,
  327033209,
  1541459225
]), _s = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  14,
  10,
  4,
  8,
  9,
  15,
  13,
  6,
  1,
  12,
  0,
  2,
  11,
  7,
  5,
  3,
  11,
  8,
  12,
  0,
  5,
  2,
  15,
  13,
  10,
  14,
  3,
  6,
  7,
  1,
  9,
  4,
  7,
  9,
  3,
  1,
  13,
  12,
  11,
  14,
  2,
  6,
  5,
  10,
  4,
  0,
  15,
  8,
  9,
  0,
  5,
  7,
  2,
  4,
  10,
  15,
  14,
  1,
  11,
  12,
  6,
  8,
  3,
  13,
  2,
  12,
  6,
  10,
  0,
  11,
  8,
  3,
  4,
  13,
  7,
  5,
  15,
  14,
  1,
  9,
  12,
  5,
  1,
  15,
  14,
  13,
  4,
  10,
  0,
  7,
  6,
  3,
  9,
  2,
  8,
  11,
  13,
  11,
  7,
  14,
  12,
  1,
  3,
  9,
  5,
  0,
  15,
  4,
  8,
  6,
  2,
  10,
  6,
  15,
  14,
  9,
  11,
  3,
  0,
  8,
  12,
  2,
  13,
  7,
  1,
  4,
  10,
  5,
  10,
  2,
  8,
  4,
  7,
  6,
  1,
  5,
  15,
  11,
  9,
  14,
  3,
  12,
  13,
  0,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  14,
  10,
  4,
  8,
  9,
  15,
  13,
  6,
  1,
  12,
  0,
  2,
  11,
  7,
  5,
  3
], E = new Uint8Array(_s.map(function(s) {
  return s * 2;
})), d = new Uint32Array(32), ct = new Uint32Array(32);
function ve(s, e) {
  var t = 0;
  for (t = 0; t < 16; t++)
    d[t] = s.h[t], d[t + 16] = De[t];
  for (d[24] = d[24] ^ s.t, d[25] = d[25] ^ s.t / 4294967296, e && (d[28] = ~d[28], d[29] = ~d[29]), t = 0; t < 32; t++)
    ct[t] = Se(s.b, 4 * t);
  for (t = 0; t < 12; t++)
    $(0, 8, 16, 24, E[t * 16 + 0], E[t * 16 + 1]), $(2, 10, 18, 26, E[t * 16 + 2], E[t * 16 + 3]), $(4, 12, 20, 28, E[t * 16 + 4], E[t * 16 + 5]), $(6, 14, 22, 30, E[t * 16 + 6], E[t * 16 + 7]), $(0, 10, 20, 30, E[t * 16 + 8], E[t * 16 + 9]), $(2, 12, 22, 24, E[t * 16 + 10], E[t * 16 + 11]), $(4, 14, 16, 26, E[t * 16 + 12], E[t * 16 + 13]), $(6, 8, 18, 28, E[t * 16 + 14], E[t * 16 + 15]);
  for (t = 0; t < 16; t++)
    s.h[t] = s.h[t] ^ d[t] ^ d[t + 16];
}
var q = new Uint8Array([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
]);
function rt(s, e, t, r) {
  q.fill(0), this.b = new Uint8Array(128), this.h = new Uint32Array(16), this.t = 0, this.c = 0, this.outlen = s, q[0] = s, e && (q[1] = e.length), q[2] = 1, q[3] = 1, t && q.set(t, 32), r && q.set(r, 48);
  for (var i = 0; i < 16; i++)
    this.h[i] = De[i] ^ Se(q, i * 4);
  e && (be(this, e), this.c = 128);
}
rt.prototype.update = function(s) {
  return z(s != null, "input must be Uint8Array or Buffer"), be(this, s), this;
};
rt.prototype.digest = function(s) {
  var e = !s || s === "binary" || s === "hex" ? new Uint8Array(this.outlen) : s;
  return z(e.length >= this.outlen, "out must have at least outlen bytes of space"), Cs(this, e), s === "hex" ? ps(e) : e;
};
rt.prototype.final = rt.prototype.digest;
rt.ready = function(s) {
  ut.ready(function() {
    s();
  });
};
function be(s, e) {
  for (var t = 0; t < e.length; t++)
    s.c === 128 && (s.t += s.c, ve(s, !1), s.c = 0), s.b[s.c++] = e[t];
}
function Cs(s, e) {
  for (s.t += s.c; s.c < 128; )
    s.b[s.c++] = 0;
  ve(s, !0);
  for (var t = 0; t < s.outlen; t++)
    e[t] = s.h[t >> 2] >> 8 * (t & 3);
  return e;
}
function ps(s) {
  for (var e = "", t = 0; t < s.length; t++)
    e += ws(s[t]);
  return e;
}
function ws(s) {
  return s < 16 ? "0" + s.toString(16) : s.toString(16);
}
var Ke = rt;
Q.exports = function(e, t, r, i, n) {
  return n !== !0 && (z(e >= ie, "outlen must be at least " + ie + ", was given " + e), z(e <= ae, "outlen must be at most " + ae + ", was given " + e), t != null && z(t.length >= ne, "key must be at least " + ne + ", was given " + t.length), t != null && z(t.length <= oe, "key must be at most " + oe + ", was given " + t.length), r != null && z(r.length === Ae, "salt must be exactly " + Ae + ", was given " + r.length), i != null && z(i.length === ce, "personal must be exactly " + ce + ", was given " + i.length)), new Ke(e, t, r, i);
};
Q.exports.ready = function(s) {
  ut.ready(function() {
    s();
  });
};
Q.exports.WASM_SUPPORTED = ut.SUPPORTED;
Q.exports.WASM_LOADED = !1;
var ie = Q.exports.BYTES_MIN = 16, ae = Q.exports.BYTES_MAX = 64;
Q.exports.BYTES = 32;
var ne = Q.exports.KEYBYTES_MIN = 16, oe = Q.exports.KEYBYTES_MAX = 64;
Q.exports.KEYBYTES = 32;
var Ae = Q.exports.SALTBYTES = 16, ce = Q.exports.PERSONALBYTES = 16;
ut.ready(function(s) {
  s || (Q.exports.WASM_LOADED = !0, Ke = ut);
});
var it = {};
Object.defineProperty(it, "__esModule", { value: !0 });
it.bech32m = it.bech32 = void 0;
const xt = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", Ue = {};
for (let s = 0; s < xt.length; s++) {
  const e = xt.charAt(s);
  Ue[e] = s;
}
function st(s) {
  const e = s >> 25;
  return (s & 33554431) << 5 ^ -(e >> 0 & 1) & 996825010 ^ -(e >> 1 & 1) & 642813549 ^ -(e >> 2 & 1) & 513874426 ^ -(e >> 3 & 1) & 1027748829 ^ -(e >> 4 & 1) & 705979059;
}
function Ie(s) {
  let e = 1;
  for (let t = 0; t < s.length; ++t) {
    const r = s.charCodeAt(t);
    if (r < 33 || r > 126)
      return "Invalid prefix (" + s + ")";
    e = st(e) ^ r >> 5;
  }
  e = st(e);
  for (let t = 0; t < s.length; ++t) {
    const r = s.charCodeAt(t);
    e = st(e) ^ r & 31;
  }
  return e;
}
function Mt(s, e, t, r) {
  let i = 0, n = 0;
  const o = (1 << t) - 1, A = [];
  for (let c = 0; c < s.length; ++c)
    for (i = i << e | s[c], n += e; n >= t; )
      n -= t, A.push(i >> n & o);
  if (r)
    n > 0 && A.push(i << t - n & o);
  else {
    if (n >= e)
      return "Excess padding";
    if (i << t - n & o)
      return "Non-zero padding";
  }
  return A;
}
function ys(s) {
  return Mt(s, 8, 5, !0);
}
function ms(s) {
  const e = Mt(s, 5, 8, !1);
  if (Array.isArray(e))
    return e;
}
function Es(s) {
  const e = Mt(s, 5, 8, !1);
  if (Array.isArray(e))
    return e;
  throw new Error(e);
}
function ke(s) {
  let e;
  s === "bech32" ? e = 1 : e = 734539939;
  function t(o, A, c) {
    if (c = c || 90, o.length + 7 + A.length > c)
      throw new TypeError("Exceeds length limit");
    o = o.toLowerCase();
    let I = Ie(o);
    if (typeof I == "string")
      throw new Error(I);
    let u = o + "1";
    for (let h = 0; h < A.length; ++h) {
      const g = A[h];
      if (g >> 5 !== 0)
        throw new Error("Non 5-bit word");
      I = st(I) ^ g, u += xt.charAt(g);
    }
    for (let h = 0; h < 6; ++h)
      I = st(I);
    I ^= e;
    for (let h = 0; h < 6; ++h) {
      const g = I >> (5 - h) * 5 & 31;
      u += xt.charAt(g);
    }
    return u;
  }
  function r(o, A) {
    if (A = A || 90, o.length < 8)
      return o + " too short";
    if (o.length > A)
      return "Exceeds length limit";
    const c = o.toLowerCase(), I = o.toUpperCase();
    if (o !== c && o !== I)
      return "Mixed-case string " + o;
    o = c;
    const u = o.lastIndexOf("1");
    if (u === -1)
      return "No separator character for " + o;
    if (u === 0)
      return "Missing prefix for " + o;
    const h = o.slice(0, u), g = o.slice(u + 1);
    if (g.length < 6)
      return "Data too short";
    let p = Ie(h);
    if (typeof p == "string")
      return p;
    const x = [];
    for (let M = 0; M < g.length; ++M) {
      const L = g.charAt(M), _ = Ue[L];
      if (_ === void 0)
        return "Unknown character " + L;
      p = st(p) ^ _, !(M + 6 >= g.length) && x.push(_);
    }
    return p !== e ? "Invalid checksum for " + o : { prefix: h, words: x };
  }
  function i(o, A) {
    const c = r(o, A);
    if (typeof c == "object")
      return c;
  }
  function n(o, A) {
    const c = r(o, A);
    if (typeof c == "object")
      return c;
    throw new Error(c);
  }
  return {
    decodeUnsafe: i,
    decode: n,
    encode: t,
    toWords: ys,
    fromWordsUnsafe: ms,
    fromWords: Es
  };
}
it.bech32 = ke("bech32");
it.bech32m = ke("bech32m");
var Bs = Wt && Wt.__importDefault || function(s) {
  return s && s.__esModule ? s : { default: s };
};
Object.defineProperty(xe, "__esModule", { value: !0 });
const xs = Bs(Q.exports), ft = it, Kt = "asset";
class ht {
  constructor(e) {
    this.hashBuf = e;
  }
  static fromHash(e) {
    return new ht(e);
  }
  static fromParts(e, t) {
    const r = (0, xs.default)(20).update(new Uint8Array([...e, ...t])).digest("binary");
    return ht.fromHash(r);
  }
  static fromBech32(e) {
    const { prefix: t, words: r } = ft.bech32.decode(e);
    if (t !== Kt)
      throw new Error("Invalid asset fingerprint");
    const i = Buffer.from(ft.bech32.fromWords(r));
    return ht.fromHash(i);
  }
  fingerprint() {
    const e = ft.bech32.toWords(this.hashBuf);
    return ft.bech32.encode(Kt, e);
  }
  hash() {
    return Buffer.from(this.hashBuf).toString("hex");
  }
  prefix() {
    return Kt;
  }
  checksum() {
    return this.fingerprint().slice(-6);
  }
}
var Qs = xe.default = ht;
const Ss = Qs, Ds = (s, e) => {
  const t = vs(s), r = t.derive(bt + 1852).derive(bt + 1815).derive(bt + e), i = r.derive(0).derive(0).to_raw_key(), n = r.derive(2).derive(0).to_raw_key();
  return r.free(), t.free(), { paymentKey: i, stakeKey: n };
}, tt = (s) => a.Address.from_bytes(f(s)), vs = (s) => a.Bip32PrivateKey.from_bytes(f(s)), bs = (s) => a.DataHash.from_bytes(f(s)), F = (s) => a.Ed25519KeyHash.from_bytes(f(s)), Ks = (s) => a.Ed25519Signature.from_bytes(f(s)), St = (s) => a.NativeScript.from_bytes(f(s)), Us = (s) => a.PublicKey.from_bytes(f(s)), ks = (s) => a.PlutusData.from_bytes(f(s)), at = (s, e) => a.PlutusScript.from_bytes_with_version(f(s), mt[e]), Fs = (s) => a.ScriptRef.from_bytes(f(s)), Ns = (s) => a.ScriptHash.from_bytes(f(s)), W = (s) => a.Transaction.from_bytes(f(s)), Fe = (s) => a.TransactionHash.from_bytes(f(s)), he = (s) => a.TransactionUnspentOutput.from_bytes(f(s)), Hs = (s) => a.TransactionWitnessSet.from_bytes(f(s)), Ps = (s) => a.Value.from_bytes(f(s)), H = (s) => a.Address.from_bech32(s), Tt = (s) => a.BaseAddress.from_address(H(s)), Ne = (s) => a.EnterpriseAddress.from_address(H(s)), He = (s) => a.RewardAddress.from_address(H(s)), K = (s) => Buffer.from(s).toString("hex"), f = (s) => s.length % 2 === 0 && /^[0-9A-F]*$/i.test(s) ? Buffer.from(s, "hex") : Buffer.from(s, "utf-8"), Dt = (s) => {
  const e = (t) => {
    const r = new Array();
    for (let i = 0; i < t.len(); i += 1)
      r.push(Dt(t.get(i)));
    return r;
  };
  switch (s.kind()) {
    case a.NativeScriptKind.ScriptAll: {
      const t = s.as_script_all();
      return {
        type: "all",
        scripts: e(t.native_scripts())
      };
    }
    case a.NativeScriptKind.ScriptAny: {
      const t = s.as_script_any();
      return {
        type: "any",
        scripts: e(t.native_scripts())
      };
    }
    case a.NativeScriptKind.ScriptNOfK: {
      const t = s.as_script_n_of_k();
      return {
        type: "atLeast",
        required: t.n(),
        scripts: e(t.native_scripts())
      };
    }
    case a.NativeScriptKind.TimelockStart: {
      const t = s.as_timelock_start();
      return {
        type: "after",
        slot: t.slot_bignum().to_str()
      };
    }
    case a.NativeScriptKind.TimelockExpiry: {
      const t = s.as_timelock_expiry();
      return {
        type: "before",
        slot: t.slot_bignum().to_str()
      };
    }
    case a.NativeScriptKind.ScriptPubkey: {
      const t = s.as_script_pubkey();
      return {
        type: "sig",
        keyHash: t.addr_keyhash().to_hex()
      };
    }
    default:
      throw new Error(`Script Kind: ${s.kind()}, is not supported`);
  }
}, vt = (s) => {
  const e = (t) => {
    const r = a.NativeScripts.new();
    return t.forEach((i) => {
      r.add(vt(i));
    }), r;
  };
  switch (s.type) {
    case "all":
      return a.NativeScript.new_script_all(a.ScriptAll.new(e(s.scripts)));
    case "any":
      return a.NativeScript.new_script_any(a.ScriptAny.new(e(s.scripts)));
    case "atLeast":
      return a.NativeScript.new_script_n_of_k(a.ScriptNOfK.new(s.required, e(s.scripts)));
    case "after":
      return a.NativeScript.new_timelock_start(a.TimelockStart.new_timelockstart(a.BigNum.from_str(s.slot)));
    case "before":
      return a.NativeScript.new_timelock_expiry(a.TimelockExpiry.new_timelockexpiry(a.BigNum.from_str(s.slot)));
    case "sig":
      return a.NativeScript.new_script_pubkey(a.ScriptPubkey.new(F(s.keyHash)));
  }
}, X = (s) => {
  const e = (t) => {
    const r = a.PlutusList.new();
    return t.forEach((i) => {
      r.add(X(i));
    }), r;
  };
  switch (typeof s) {
    case "string":
      return a.PlutusData.new_bytes(f(s));
    case "number":
      return a.PlutusData.new_integer(a.BigInt.from_str(s.toString()));
    case "object":
      if (s instanceof Array) {
        const t = e(s);
        return a.PlutusData.new_list(t);
      } else if (s instanceof Map) {
        const t = a.PlutusMap.new();
        return s.forEach((r, i) => {
          t.insert(X(i), X(r));
        }), a.PlutusData.new_map(t);
      } else
        return a.PlutusData.new_constr_plutus_data(a.ConstrPlutusData.new(a.BigNum.from_str(s.alternative.toString()), e(s.fields)));
  }
}, Ms = (s) => {
  const e = a.Relays.new();
  throw s.relays.forEach((t) => {
    e.add(Ts(t));
  }), new Error("toPoolParams not implemented.");
}, Pe = (s) => {
  const e = (t) => je[t];
  return a.Redeemer.new(e(s.tag), a.BigNum.from_str(s.index.toString()), X(s.data), a.ExUnits.new(a.BigNum.from_str(s.budget.mem.toString()), a.BigNum.from_str(s.budget.steps.toString())));
}, Ts = (s) => {
  switch (s.type) {
    case "SingleHostAddr": {
      const e = s.IPV4 ? a.Ipv4.new(new Uint8Array(s.IPV4.split(".").map((r) => parseInt(r)))) : void 0, t = s.IPV6 ? a.Ipv6.new(f(s.IPV6.replaceAll(":", ""))) : void 0;
      return a.Relay.new_single_host_addr(a.SingleHostAddr.new(s.port, e, t));
    }
    case "SingleHostName":
      return a.Relay.new_single_host_name(a.SingleHostName.new(s.port, a.DNSRecordAorAAAA.new(s.domainName)));
    case "MultiHostName":
      return a.Relay.new_multi_host_name(a.MultiHostName.new(a.DNSRecordSRV.new(s.domainName)));
  }
}, Me = (s) => {
  if (s.is_plutus_script()) {
    const t = s.plutus_script();
    return {
      code: t.to_hex(),
      version: Object.keys(mt).find((r) => mt[r].to_hex() === t.language_version().to_hex())
    };
  }
  const e = s.native_script();
  return Dt(e);
}, dt = (s) => {
  if ("code" in s) {
    const e = at(s.code, s.version);
    return a.ScriptRef.new_plutus_script(e);
  }
  return a.ScriptRef.new_native_script(vt(s));
}, Qt = (s) => {
  var i, n, o;
  const e = s.output().has_data_hash() ? (i = s.output().data_hash()) == null ? void 0 : i.to_hex() : void 0, t = s.output().has_plutus_data() ? (n = s.output().plutus_data()) == null ? void 0 : n.to_hex() : void 0, r = s.output().has_script_ref() ? (o = s.output().script_ref()) == null ? void 0 : o.to_hex() : void 0;
  return {
    input: {
      outputIndex: s.input().index(),
      txHash: s.input().transaction_id().to_hex()
    },
    output: {
      address: s.output().address().to_bech32(),
      amount: Te(s.output().amount()),
      dataHash: e,
      plutusData: t,
      scriptRef: r
    }
  };
}, O = (s) => {
  const e = a.TransactionInput.new(Fe(s.input.txHash), s.input.outputIndex), t = a.TransactionOutput.new(H(s.output.address), yt(s.output.amount));
  return s.output.dataHash !== void 0 && t.set_data_hash(bs(s.output.dataHash)), s.output.plutusData !== void 0 && t.set_plutus_data(ks(s.output.plutusData)), s.output.scriptRef !== void 0 && t.set_script_ref(Fs(s.output.scriptRef)), a.TransactionUnspentOutput.new(e, t);
}, ue = (s) => {
  const e = s.split(".")[1] ?? "0", t = `${parseInt(e, 10)}`, r = "1" + "0".repeat(e.length);
  return a.UnitInterval.new(a.BigNum.from_str(t), a.BigNum.from_str(r));
}, S = (s) => s.length % 2 === 0 && /^[0-9A-F]*$/i.test(s) ? s : K(Buffer.from(s, "utf-8")), Vt = (s) => Buffer.from(s, "hex").toString("utf-8"), Te = (s) => {
  const e = [
    { unit: "lovelace", quantity: s.coin().to_str() }
  ], t = s.multiasset();
  if (t !== void 0) {
    const r = t.keys();
    for (let i = 0; i < r.len(); i += 1) {
      const n = r.get(i), o = t.get(n);
      if (o !== void 0) {
        const A = o.keys();
        for (let c = 0; c < A.len(); c += 1) {
          const I = A.get(c), u = o.get(I) ?? a.BigNum.from_str("0"), h = n.to_hex() + K(I.name());
          e.push({ unit: h, quantity: u.to_str() });
        }
      }
    }
  }
  return e;
}, yt = (s) => {
  const e = s.find((n) => n.unit === "lovelace"), t = Array.from(new Set(s.filter((n) => n.unit !== "lovelace").map((n) => n.unit.slice(0, N)))), r = a.MultiAsset.new();
  t.forEach((n) => {
    const o = a.Assets.new();
    s.filter((A) => A.unit.slice(0, N) === n).forEach((A) => {
      o.insert(a.AssetName.new(f(A.unit.slice(N))), a.BigNum.from_str(A.quantity));
    }), r.insert(Ns(n), o);
  });
  const i = a.Value.new(a.BigNum.from_str(e ? e.quantity : "0"));
  return (s.length > 1 || !e) && i.set_multiasset(r), i;
}, de = (s, e, t) => a.BaseAddress.new(s, a.StakeCredential.from_keyhash(e), a.StakeCredential.from_keyhash(t)), Ve = (s, e = "") => a.Bip32PrivateKey.from_bip39_entropy(f(s), f(S(e))), le = (s) => a.DataCost.new_coins_per_byte(a.BigNum.from_str(s)), Vs = (s) => {
  if (typeof s != "object" || !("input" in s))
    return a.DatumSource.new(X(s));
  const e = O(s);
  if (e.output().has_plutus_data())
    return a.DatumSource.new_ref_input(e.input());
  throw new Error(`No inline datum found in UTxO: ${e.input().transaction_id().to_hex()}`);
}, ge = (s, e) => a.EnterpriseAddress.new(s, a.StakeCredential.from_keyhash(e)), fe = (s, e) => {
  if (typeof s == "string")
    return a.MintWitness.new_native_script(St(s));
  if (e === void 0)
    throw new Error("Minting with plutus requires a redeemer to be defined");
  if (e.tag !== "MINT")
    throw new Error("Minting redeemer's tag must be defined as 'MINT'");
  return a.MintWitness.new_plutus_script(Oe(s), Pe({
    tag: "MINT",
    index: 0,
    budget: me,
    data: {
      alternative: 0,
      fields: []
    },
    ...e
  }));
}, Ft = (s, e) => a.RewardAddress.new(s, a.StakeCredential.from_keyhash(e)), Oe = (s) => {
  if ("code" in s)
    return a.PlutusScriptSource.new(at(s.code, s.version));
  const e = O(s);
  if (e.output().has_script_ref()) {
    const t = e.output().script_ref();
    if (t.is_plutus_script()) {
      const r = Me(t), i = at(r.code, r.version).hash();
      return a.PlutusScriptSource.new_ref_input_with_lang_ver(i, e.input(), mt[r.version]);
    }
  }
  throw new Error(`No plutus script reference found in UTxO: ${e.input().transaction_id().to_hex()}`);
}, _t = (s) => {
  const e = a.ScriptPubkey.new(s);
  return a.NativeScript.new_script_pubkey(e);
}, Os = (s = Y) => {
  const e = a.TransactionBuilderConfigBuilder.new().coins_per_utxo_byte(a.BigNum.from_str(s.coinsPerUTxOSize)).ex_unit_prices(a.ExUnitPrices.new(ue(s.priceMem.toString()), ue(s.priceStep.toString()))).fee_algo(a.LinearFee.new(a.BigNum.from_str(s.minFeeA.toString()), a.BigNum.from_str(s.minFeeB.toString()))).key_deposit(a.BigNum.from_str(s.keyDeposit)).max_tx_size(s.maxTxSize).max_value_size(parseInt(s.maxValSize, 10)).pool_deposit(a.BigNum.from_str(s.poolDeposit)).build();
  return a.TransactionBuilder.new(e);
}, _e = (s) => {
  const e = a.TxInputsBuilder.new();
  return s.map((t) => t instanceof a.TransactionUnspentOutput ? t : O(t)).forEach((t) => {
    e.add_input(t.output().address(), t.input(), t.output().amount());
  }), e;
}, Ct = (s) => {
  if (typeof s == "string")
    return a.TransactionOutputBuilder.new().with_address(H(s));
  let e = a.TransactionOutputBuilder.new().with_address(H(s.address));
  if (s.datum) {
    const { value: t, inline: r } = s.datum, i = X(t);
    e = e.with_data_hash(a.hash_plutus_data(i)), r && (e = e.with_plutus_data(i));
  }
  if (s.script) {
    const t = dt(s.script);
    e = e.with_script_ref(t);
  }
  return e;
}, nt = (s) => {
  const e = s.slice(0, N), t = s.includes(".") ? S(s.split(".")[1]) : s.slice(N);
  return { policyId: e, assetName: t };
}, l = (s) => ot.isAxiosError(s) ? s.response ? JSON.stringify({
  data: s.response.data,
  headers: s.response.headers,
  status: s.response.status
}) : s.request ? JSON.stringify(s.request) : s.message : JSON.stringify(s), Zs = (s) => {
  const e = X(s);
  return a.hash_plutus_data(e).to_hex();
}, tr = (s, e = Date.now()) => {
  if (Et[s]) {
    const [t, r, i, n] = Et[s];
    return parseInt(a.BigNum.from_str(e.toString()).div_floor(a.BigNum.from_str("1000")).checked_sub(a.BigNum.from_str(i)).div_floor(a.BigNum.from_str(n)).checked_add(a.BigNum.from_str(t)).to_str(), 10);
  }
  throw new Error(`Couldn't resolve EpochNo for network: ${s}`);
}, Ys = (s, e) => Ss.fromParts(f(s), f(e)).fingerprint(), er = (s, e) => Xe[s][e], sr = (s) => vt(s).hash().to_hex(), et = (s) => {
  var e, t;
  try {
    const r = [
      (e = Tt(s)) == null ? void 0 : e.payment_cred().to_keyhash(),
      (t = Ne(s)) == null ? void 0 : t.payment_cred().to_keyhash()
    ].find((i) => i !== void 0);
    if (r !== void 0)
      return r.to_hex();
    throw new Error(`Couldn't resolve payment key hash from address: ${s}`);
  } catch (r) {
    throw new Error(`An error occurred during resolvePaymentKeyHash: ${r}.`);
  }
}, rr = (s, e = 0) => {
  const t = at(s.code, s.version);
  return a.EnterpriseAddress.new(e, a.StakeCredential.from_scripthash(t.hash())).to_address().to_bech32();
}, ir = (s) => {
  try {
    const e = Ne(s), t = e == null ? void 0 : e.payment_cred().to_scripthash();
    if (t !== void 0)
      return t.to_hex();
    throw new Error(`Couldn't resolve script hash from address: ${s}`);
  } catch (e) {
    throw new Error(`An error occurred during resolveScriptHash: ${e}.`);
  }
}, ar = (s) => a.Ed25519KeyHash.from_hex(s).to_bech32("pool1"), nr = (s) => {
  const e = pe(s.join(" ")), t = Ve(e), r = t.to_bech32();
  return t.free(), r;
}, or = (s) => dt(s).to_hex(), Ar = (s, e = Date.now()) => {
  if (Et[s]) {
    const [t, r, i] = Et[s];
    return a.BigNum.from_str(e.toString()).div_floor(a.BigNum.from_str("1000")).checked_sub(a.BigNum.from_str(i)).checked_add(a.BigNum.from_str(r)).to_str();
  }
  throw new Error(`Couldn't resolve SlotNo for network: ${s}`);
}, Ot = (s) => {
  try {
    const e = H(s), t = Tt(s), r = t == null ? void 0 : t.stake_cred().to_keyhash();
    if (r !== void 0)
      return Ft(e.network_id(), r).to_address().to_bech32();
    throw new Error(`Couldn't resolve reward address from address: ${s}`);
  } catch (e) {
    throw new Error(`An error occurred during resolveRewardAddress: ${e}.`);
  }
}, It = (s) => {
  var e, t;
  try {
    const r = [
      (e = Tt(s)) == null ? void 0 : e.stake_cred().to_keyhash(),
      (t = He(s)) == null ? void 0 : t.payment_cred().to_keyhash()
    ].find((i) => i !== void 0);
    if (r !== void 0)
      return r.to_hex();
    throw new Error(`Couldn't resolve stake key hash from address: ${s}`);
  } catch (r) {
    throw new Error(`An error occurred during resolveStakeKeyHash: ${r}.`);
  }
}, Ye = (s, e = Y.minFeeA, t = Y.minFeeB) => (BigInt(e) * BigInt(s) + BigInt(t)).toString(), Gs = (s) => {
  const e = W(s).body();
  return a.hash_transaction(e).to_hex();
}, cr = (s = "", e = 32) => {
  if (e <= 0 || e > 2048)
    throw new Error("Length must be bewteen 1 and 2048");
  const r = Ce("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")(e);
  return S(`${s}${r}`);
}, Ge = (s, e) => {
  const t = s.vkeys();
  if (t !== void 0) {
    const r = /* @__PURE__ */ new Set();
    for (let n = 0; n < t.len(); n += 1)
      r.add(t.get(n).to_hex());
    for (let n = 0; n < e.len(); n += 1)
      r.add(e.get(n).to_hex());
    const i = a.Vkeywitnesses.new();
    return r.forEach((n) => {
      i.add(a.Vkeywitness.from_hex(n));
    }), i;
  }
  return e;
};
class Ir {
  _axiosInstance;
  constructor(e, t = 0) {
    const r = e.slice(0, 7);
    this._axiosInstance = ot.create({
      baseURL: `https://cardano-${r}.blockfrost.io/api/v${t}`,
      headers: { project_id: e }
    });
  }
  async fetchAccountInfo(e) {
    const t = e.startsWith("addr") ? Ot(e) : e;
    try {
      const { data: r, status: i } = await this._axiosInstance.get(`accounts/${t}`);
      if (i === 200)
        return {
          poolId: r.pool_id,
          active: r.active || r.active_epoch !== null,
          balance: r.controlled_amount,
          rewards: r.withdrawable_amount,
          withdrawals: r.withdrawals_sum
        };
      throw l(r);
    } catch (r) {
      throw l(r);
    }
  }
  async fetchAddressUTxOs(e, t) {
    const r = t !== void 0 ? `/${t}` : "", i = `addresses/${e}/utxos` + r, n = async (c = 1, I = []) => {
      const { data: u, status: h } = await this._axiosInstance.get(`${i}?page=${c}`);
      if (h === 200)
        return u.length > 0 ? n(c + 1, [...I, ...await Promise.all(u.map(A))]) : I;
      throw l(u);
    }, o = async (c) => {
      if (c) {
        const { data: I, status: u } = await this._axiosInstance.get(`scripts/${c}`);
        if (u === 200) {
          const h = I.type.startsWith("plutus") ? {
            code: await this.fetchPlutusScriptCBOR(c),
            version: I.type.replace("plutus", "")
          } : await this.fetchNativeScriptJSON(c);
          return dt(h).to_hex();
        }
        throw l(I);
      }
    }, A = async (c) => ({
      input: {
        outputIndex: c.output_index,
        txHash: c.tx_hash
      },
      output: {
        address: e,
        amount: c.amount,
        dataHash: c.data_hash ?? void 0,
        plutusData: c.inline_datum ?? void 0,
        scriptRef: await o(c.reference_script_hash)
      }
    });
    try {
      return await n();
    } catch {
      return [];
    }
  }
  async fetchAssetAddresses(e) {
    const t = async (r = 1, i = []) => {
      const { policyId: n, assetName: o } = nt(e), { data: A, status: c } = await this._axiosInstance.get(`assets/${n}${o}/addresses?page=${r}`);
      if (c === 200)
        return A.length > 0 ? t(r + 1, [...i, ...A]) : i;
      throw l(A);
    };
    try {
      return await t();
    } catch {
      return [];
    }
  }
  async fetchAssetMetadata(e) {
    try {
      const { policyId: t, assetName: r } = nt(e), { data: i, status: n } = await this._axiosInstance.get(`assets/${t}${r}`);
      if (n === 200)
        return {
          ...i.onchain_metadata
        };
      throw l(i);
    } catch (t) {
      throw l(t);
    }
  }
  async fetchHandleAddress(e) {
    try {
      const t = S(e.replace("$", "")), { data: r, status: i } = await this._axiosInstance.get(`assets/${Ht[1]}${t}/addresses`);
      if (i === 200)
        return r[0].address;
      throw l(r);
    } catch (t) {
      throw l(t);
    }
  }
  async fetchProtocolParameters(e = Number.NaN) {
    try {
      const { data: t, status: r } = await this._axiosInstance.get(`epochs/${isNaN(e) ? "latest" : e}/parameters`);
      if (r === 200)
        return {
          coinsPerUTxOSize: t.coins_per_utxo_word,
          collateralPercent: t.collateral_percent,
          decentralisation: t.decentralisation_param,
          epoch: t.epoch,
          keyDeposit: t.key_deposit,
          maxBlockExMem: t.max_block_ex_mem,
          maxBlockExSteps: t.max_block_ex_steps,
          maxBlockHeaderSize: t.max_block_header_size,
          maxBlockSize: t.max_block_size,
          maxCollateralInputs: t.max_collateral_inputs,
          maxTxExMem: t.max_tx_ex_mem,
          maxTxExSteps: t.max_tx_ex_steps,
          maxTxSize: t.max_tx_size,
          maxValSize: t.max_val_size,
          minFeeA: t.min_fee_a,
          minFeeB: t.min_fee_b,
          minPoolCost: t.min_pool_cost,
          poolDeposit: t.pool_deposit,
          priceMem: t.price_mem,
          priceStep: t.price_step
        };
      throw l(t);
    } catch (t) {
      throw l(t);
    }
  }
  async submitTx(e) {
    try {
      const t = { "Content-Type": "application/cbor" }, { data: r, status: i } = await this._axiosInstance.post("tx/submit", f(e), { headers: t });
      if (i === 200)
        return r;
      throw l(r);
    } catch (t) {
      throw l(t);
    }
  }
  async fetchPlutusScriptCBOR(e) {
    const { data: t, status: r } = await this._axiosInstance.get(`scripts/${e}/cbor`);
    if (r === 200)
      return t.cbor;
    throw l(t);
  }
  async fetchNativeScriptJSON(e) {
    const { data: t, status: r } = await this._axiosInstance.get(`scripts/${e}/json`);
    if (r === 200)
      return t.json;
    throw l(t);
  }
}
class hr {
  _axiosInstance;
  constructor(e, t, r) {
    const i = r.host ?? "ipfs.infura.io", n = r.port ?? 5001, o = r.version ?? 0;
    this._axiosInstance = ot.create({
      baseURL: `https://${i}:${n}/api/v${o}`,
      auth: { username: e, password: t }
    });
  }
  async uploadContent(e, t = !1) {
    try {
      const r = { "Content-Type": "multipart/form-data" }, { data: i, status: n } = await this._axiosInstance.post(`add?recursive=${t}`, e, { headers: r });
      if (n === 200)
        return i;
      throw l(i);
    } catch (r) {
      throw l(r);
    }
  }
}
class ur {
  _axiosInstance;
  constructor(e, t = 0) {
    this._axiosInstance = ot.create({
      baseURL: `https://${e}.koios.rest/api/v${t}`
    });
  }
  async fetchAccountInfo(e) {
    try {
      const t = e.startsWith("addr") ? Ot(e) : e, { data: r, status: i } = await this._axiosInstance.post("account_info", { _stake_addresses: [t] });
      if (i === 200)
        return {
          poolId: r[0].delegated_pool,
          active: r[0].status === "registered",
          balance: r[0].total_balance.toString(),
          rewards: r[0].rewards_available,
          withdrawals: r[0].withdrawals
        };
      throw l(r);
    } catch (t) {
      throw l(t);
    }
  }
  async fetchAddressUTxOs(e, t) {
    const r = (i) => {
      if (i) {
        const n = i.type.startsWith("plutus") ? {
          code: i.bytes,
          version: i.type.replace("plutus", "")
        } : Dt(St(i.bytes));
        return dt(n).to_hex();
      }
    };
    try {
      const { data: i, status: n } = await this._axiosInstance.post("address_info", { _addresses: [e] });
      if (n === 200) {
        const o = i.flatMap((A) => A.utxo_set).map((A) => {
          var c;
          return {
            input: {
              outputIndex: A.tx_index,
              txHash: A.tx_hash
            },
            output: {
              address: e,
              amount: [
                { unit: "lovelace", quantity: A.value },
                ...A.asset_list.map((I) => ({
                  unit: `${I.policy_id}${I.asset_name}`,
                  quantity: `${I.quantity}`
                }))
              ],
              dataHash: A.datum_hash ?? void 0,
              plutusData: ((c = A.inline_datum) == null ? void 0 : c.bytes) ?? void 0,
              scriptRef: r(A.reference_script)
            }
          };
        });
        return t !== void 0 ? o.filter((A) => A.output.amount.find((c) => c.unit === t) !== void 0) : o;
      }
      throw l(i);
    } catch {
      return [];
    }
  }
  async fetchAssetAddresses(e) {
    try {
      const { policyId: t, assetName: r } = nt(e), { data: i, status: n } = await this._axiosInstance.get(`asset_address_list?_asset_policy=${t}&_asset_name=${r}`);
      if (n === 200)
        return i.map((o) => ({
          address: o.payment_address,
          quantity: o.quantity
        }));
      throw l(i);
    } catch (t) {
      throw l(t);
    }
  }
  async fetchAssetMetadata(e) {
    try {
      const { policyId: t, assetName: r } = nt(e), { data: i, status: n } = await this._axiosInstance.get(`asset_info?_asset_policy=${t}&_asset_name=${r}`);
      if (n === 200)
        return {
          ...i[0].minting_tx_metadata[721][t][Vt(r)]
        };
      throw l(i);
    } catch (t) {
      throw l(t);
    }
  }
  async fetchHandleAddress(e) {
    try {
      const t = S(e.replace("$", "")), { data: r, status: i } = await this._axiosInstance.get(`asset_address_list?_asset_policy=${Ht[1]}&_asset_name=${t}`);
      if (i === 200)
        return r[0].payment_address;
      throw l(r);
    } catch (t) {
      throw l(t);
    }
  }
  async fetchProtocolParameters(e) {
    try {
      const { data: t, status: r } = await this._axiosInstance.get(`epoch_params?_epoch_no=${e}`);
      if (r === 200)
        return {
          coinsPerUTxOSize: t[0].coins_per_utxo_size,
          collateralPercent: t[0].collateral_percent,
          decentralisation: t[0].decentralisation,
          epoch: t[0].epoch_no,
          keyDeposit: t[0].key_deposit,
          maxBlockExMem: t[0].max_block_ex_mem.toString(),
          maxBlockExSteps: t[0].max_block_ex_steps.toString(),
          maxBlockHeaderSize: t[0].max_bh_size,
          maxBlockSize: t[0].max_block_size,
          maxCollateralInputs: t[0].max_collateral_inputs,
          maxTxExMem: t[0].max_tx_ex_mem.toString(),
          maxTxExSteps: t[0].max_tx_ex_steps.toString(),
          maxTxSize: t[0].max_tx_size,
          maxValSize: t[0].max_val_size.toString(),
          minFeeA: t[0].min_fee_a,
          minFeeB: t[0].min_fee_b,
          minPoolCost: t[0].min_pool_cost,
          poolDeposit: t[0].pool_deposit,
          priceMem: t[0].price_mem,
          priceStep: t[0].price_step
        };
      throw l(t);
    } catch (t) {
      throw l(t);
    }
  }
  async submitTx(e) {
    try {
      const t = { "Content-Type": "application/cbor" }, { data: r, status: i } = await this._axiosInstance.post("submittx", f(e), { headers: t });
      if (i === 202)
        return r;
      throw l(r);
    } catch (t) {
      throw l(t);
    }
  }
}
class dr {
  _axiosInstance;
  constructor(e, t, r, i = 1) {
    this._axiosInstance = ot.create({
      baseURL: `https://cardano-${e}.tangocrypto.com/${t}/v${i}`,
      headers: { "x-api-key": r }
    });
  }
  async fetchAccountInfo(e) {
    try {
      const t = e.startsWith("addr") ? Ot(e) : e, { data: r, status: i } = await this._axiosInstance.get(`wallets/${t}`);
      if (i === 200)
        return {
          poolId: r.pool_id,
          active: r.active,
          balance: r.controlled_total_stake,
          rewards: r.rewards_sum,
          withdrawals: r.withdrawals_sum
        };
      throw l(r);
    } catch (t) {
      throw l(t);
    }
  }
  async fetchAddressUTxOs(e, t) {
    const r = t !== void 0 ? `/assets/${t}` : "", i = `addresses/${e}${r}/utxos?size=50`, n = async (I = "", u = []) => {
      var p;
      const { data: h, status: g } = await this._axiosInstance.get(`${i}&cursor=${I}`);
      if (g === 200)
        return h.cursor !== null && ((p = h.cursor) == null ? void 0 : p.length) > 0 ? n(h.cursor, [...u, ...h.data.map(c)]) : h.data.map(c);
      throw l(h);
    }, o = (I, u) => {
      const h = [{
        unit: "lovelace",
        quantity: I.toString()
      }];
      return u.forEach((g) => {
        const p = S(g.asset_name);
        h.push({
          unit: `${g.policy_id}${p}`,
          quantity: g.quantity.toString()
        });
      }), h;
    }, A = (I) => {
      if (I) {
        const u = I.type.startsWith("plutus") ? {
          code: I.code,
          version: I.type.replace("plutus", "")
        } : Dt(St(I.json));
        return dt(u).to_hex();
      }
    }, c = (I) => {
      var u;
      return {
        input: {
          outputIndex: I.index,
          txHash: I.hash
        },
        output: {
          address: e,
          amount: o(I.value, I.assets),
          dataHash: void 0,
          plutusData: ((u = I.inline_datum) == null ? void 0 : u.value_raw) ?? void 0,
          scriptRef: A(I.reference_script)
        }
      };
    };
    try {
      return await n();
    } catch {
      return [];
    }
  }
  async fetchAssetAddresses(e) {
    const t = (i) => ({
      address: i.address,
      quantity: i.quantity.toString()
    }), r = async (i = "", n = []) => {
      var u;
      const { policyId: o, assetName: A } = nt(e), { data: c, status: I } = await this._axiosInstance.get(`assets/${o}${A}/addresses?size=100&cursor=${i}`);
      if (I === 200)
        return c.cursor !== null && ((u = c.cursor) == null ? void 0 : u.length) > 0 ? r(c.cursor, [...n, ...c.data.map(t)]) : c.data.map(t);
      throw l(c);
    };
    try {
      return await r();
    } catch {
      return [];
    }
  }
  async fetchAssetMetadata(e) {
    var t;
    try {
      const { policyId: r, assetName: i } = nt(e), { data: n, status: o } = await this._axiosInstance.get(`assets/${r}${i}`);
      if (o === 200)
        return {
          ...(t = n.metadata[0]) == null ? void 0 : t.json[r][Vt(i)]
        };
      throw l(n);
    } catch (r) {
      throw l(r);
    }
  }
  async fetchHandleAddress(e) {
    try {
      const t = S(e.replace("$", "")), { data: r, status: i } = await this._axiosInstance.get(`assets/${Ht[1]}${t}/addresses`);
      if (i === 200)
        return r.data[0].address;
      throw l(r);
    } catch (t) {
      throw l(t);
    }
  }
  async fetchProtocolParameters(e) {
    try {
      const { data: t, status: r } = await this._axiosInstance.get(`epochs/${e}/parameters`);
      if (r === 200)
        return {
          coinsPerUTxOSize: t.coins_per_utxo_size.toString(),
          collateralPercent: t.collateral_percent,
          decentralisation: t.decentralisation,
          epoch: t.epoch_no,
          keyDeposit: t.key_deposit.toString(),
          maxBlockExMem: t.max_block_ex_mem.toString(),
          maxBlockExSteps: t.max_block_ex_steps.toString(),
          maxBlockHeaderSize: t.max_block_header_size,
          maxBlockSize: t.max_block_size,
          maxCollateralInputs: t.max_collateral_inputs,
          maxTxExMem: t.max_tx_ex_mem.toString(),
          maxTxExSteps: t.max_tx_ex_steps.toString(),
          maxTxSize: t.max_tx_size,
          maxValSize: t.max_val_size.toString(),
          minFeeA: t.min_fee_a,
          minFeeB: t.min_fee_b,
          minPoolCost: t.min_pool_cost.toString(),
          poolDeposit: t.pool_deposit.toString(),
          priceMem: t.price_mem,
          priceStep: t.price_step
        };
      throw l(t);
    } catch (t) {
      throw l(t);
    }
  }
  async submitTx(e) {
    try {
      const t = { "Content-Type": "application/json" }, { data: r, status: i } = await this._axiosInstance.post("transactions/submit", { tx: e }, { headers: t });
      if (i === 200)
        return r.tx_id;
      throw l(r);
    } catch (t) {
      throw l(t);
    }
  }
}
class lr {
  static withOneSignature(e) {
    const t = F(et(e));
    return _t(t).to_hex();
  }
  static withAtLeastNSignatures(e, t) {
    const r = a.NativeScripts.new();
    e.forEach((n) => {
      const o = F(et(n));
      r.add(_t(o));
    });
    const i = a.ScriptNOfK.new(t, r);
    return a.NativeScript.new_script_any(i).to_hex();
  }
  static withAnySignature(e) {
    const t = a.NativeScripts.new();
    e.forEach((i) => {
      const n = F(et(i));
      t.add(_t(n));
    });
    const r = a.ScriptAny.new(t);
    return a.NativeScript.new_script_any(r).to_hex();
  }
  static withAllSignatures(e) {
    const t = a.NativeScripts.new();
    e.forEach((i) => {
      const n = F(et(i));
      t.add(_t(n));
    });
    const r = a.ScriptAll.new(t);
    return a.NativeScript.new_script_any(r).to_hex();
  }
  static fromNativeScript(e) {
    return vt(e).to_hex();
  }
}
function j(s, e, t, r) {
  var i = arguments.length, n = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    n = Reflect.decorate(s, e, t, r);
  else
    for (var A = s.length - 1; A >= 0; A--)
      (o = s[A]) && (n = (i < 3 ? o(n) : i > 3 ? o(e, t, n) : o(e, t)) || n);
  return i > 3 && n && Object.defineProperty(e, t, n), n;
}
const Rs = (s) => class extends s {
  __visits = [];
}, Z = () => function(s, e, t) {
  const r = t.value;
  t.value = function(...i) {
    const n = r.call(this, ...i);
    return this.__visits && this.__visits.push(e), n;
  };
};
let R = class {
  _changeAddress;
  _recipients = /* @__PURE__ */ new Map();
  _totalBurns = /* @__PURE__ */ new Map();
  _totalMints = /* @__PURE__ */ new Map();
  _era;
  _initiator;
  _mintBuilder;
  _protocolParameters;
  _txBuilder;
  _txCertificates;
  _txInputsBuilder;
  _txWithdrawals;
  constructor(e = {}) {
    this._era = e.era, this._initiator = e.initiator, this._mintBuilder = a.MintBuilder.new(), this._protocolParameters = e.parameters ?? Y, this._txBuilder = Os(e.parameters), this._txCertificates = a.Certificates.new(), this._txInputsBuilder = a.TxInputsBuilder.new(), this._txWithdrawals = a.Withdrawals.new();
  }
  static maskMetadata(e, t = "ALONZO") {
    var n;
    const r = W(e), i = (n = r.auxiliary_data()) == null ? void 0 : n.metadata();
    if (i !== void 0) {
      const o = a.GeneralTransactionMetadata.new();
      for (let c = 0; c < i.len(); c += 1) {
        const I = i.keys().get(c), u = i.get(I);
        o.insert(I, a.TransactionMetadatum.from_hex("0".repeat(((u == null ? void 0 : u.to_hex()) ?? "").length)));
      }
      const A = r.auxiliary_data();
      return A !== void 0 && (A.set_metadata(o), A.set_prefer_alonzo_format(t === "ALONZO")), a.Transaction.new(r.body(), r.witness_set(), A).to_hex();
    }
    return e;
  }
  static readMetadata(e) {
    var r, i;
    return ((i = (r = W(e).auxiliary_data()) == null ? void 0 : r.metadata()) == null ? void 0 : i.to_hex()) ?? "";
  }
  static writeMetadata(e, t, r = "ALONZO") {
    const i = W(e), n = i.auxiliary_data() ?? a.AuxiliaryData.new();
    return n.set_metadata(a.GeneralTransactionMetadata.from_hex(t)), n.set_prefer_alonzo_format(r === "ALONZO"), a.Transaction.new(i.body(), i.witness_set(), n).to_hex();
  }
  get size() {
    return this._txBuilder.full_size();
  }
  async build() {
    try {
      return (this._mintBuilder.has_plutus_scripts() || this.notVisited("redeemValue") === !1) && (await this.addRequiredSignersIfNeeded(), await this.addCollateralIfNeeded()), await this.forgeAssetsIfNeeded(), await this.addTxInputsAsNeeded(), await this.addChangeAddress(), this._txBuilder.build_tx().to_hex();
    } catch (e) {
      throw new Error(`[Transaction] An error occurred during build: ${e}.`);
    }
  }
  burnAsset(e, t, r) {
    const i = this._totalBurns.has(t.unit) ? a.BigNum.from_str(this._totalBurns.get(t.unit) ?? "0").checked_add(a.BigNum.from_str(t.quantity)).to_str() : t.quantity;
    return this._mintBuilder.add_asset(fe(e, r), a.AssetName.new(f(t.unit.slice(N))), a.Int.new_negative(a.BigNum.from_str(t.quantity))), this._totalBurns.set(t.unit, i), this;
  }
  delegateStake(e, t) {
    const r = a.Certificate.new_stake_delegation(a.StakeDelegation.new(a.StakeCredential.from_keyhash(F(It(e))), a.Ed25519KeyHash.from_bech32(t)));
    return this._txCertificates.add(r), this;
  }
  deregisterStake(e) {
    const t = a.Certificate.new_stake_deregistration(a.StakeDeregistration.new(a.StakeCredential.from_keyhash(F(It(e)))));
    return this._txCertificates.add(t), this;
  }
  mintAsset(e, t, r) {
    var I, u;
    const i = (h, g) => {
      const p = typeof h == "string" ? St(h).hash().to_hex() : n(h).hash().to_hex(), x = S(g.assetName);
      return {
        unit: `${p}${x}`,
        quantity: g.assetQuantity
      };
    }, n = (h) => {
      if ("code" in h)
        return at(h.code, h.version);
      const g = O(h);
      if (g.output().has_script_ref()) {
        const p = g.output().script_ref();
        if (p.is_plutus_script()) {
          const x = Me(p);
          return at(x.code, x.version);
        }
      }
      throw new Error(`No plutus script reference found in UTxO: ${g.input().transaction_id().to_hex()}`);
    }, o = i(e, t), c = a.BigNum.from_str(((I = this._totalMints.get(o.unit)) == null ? void 0 : I.assetQuantity) ?? "0").checked_add(a.BigNum.from_str(o.quantity));
    return this._mintBuilder.add_asset(fe(e, r), a.AssetName.new(f(S(t.assetName))), a.Int.new(a.BigNum.from_str(o.quantity))), this._recipients.has(t.recipient) ? (u = this._recipients.get(t.recipient)) == null || u.push(o) : this._recipients.set(t.recipient, [o]), this._totalMints.set(o.unit, {
      ...t,
      assetQuantity: c.to_str()
    }), this;
  }
  redeemValue(e) {
    const t = {
      tag: "SPEND",
      budget: me,
      index: this._txInputsBuilder.inputs().len(),
      data: {
        alternative: 0,
        fields: []
      },
      ...e.redeemer
    }, r = O(e.value), i = a.PlutusWitness.new_with_ref(Oe(e.script), Vs(e.datum), Pe(t));
    return this._txInputsBuilder.add_plutus_script_input(i, r.input(), r.output().amount()), this;
  }
  registerStake(e) {
    const t = a.Certificate.new_stake_registration(a.StakeRegistration.new(a.StakeCredential.from_keyhash(F(It(e)))));
    return this._txCertificates.add(t), this;
  }
  registerPool(e) {
    const t = a.Certificate.new_pool_registration(a.PoolRegistration.new(Ms(e)));
    return this._txCertificates.add(t), this;
  }
  retirePool(e, t) {
    const r = a.Certificate.new_pool_retirement(a.PoolRetirement.new(a.Ed25519KeyHash.from_bech32(e), t));
    return this._txCertificates.add(r), this;
  }
  sendAssets(e, t) {
    const r = yt(t), i = r.multiasset();
    if (r.is_zero() || i === void 0)
      return this;
    const o = Ct(e).next().with_asset_and_min_required_coin_by_utxo_cost(i, le(this._protocolParameters.coinsPerUTxOSize)).build();
    return this._txBuilder.add_output(o), this;
  }
  sendLovelace(e, t) {
    const i = Ct(e).next().with_coin(a.BigNum.from_str(t)).build();
    return this._txBuilder.add_output(i), this;
  }
  sendValue(e, t) {
    const r = yt(t.output.amount), n = Ct(e).next().with_value(r).build();
    return this._txBuilder.add_output(n), this;
  }
  setChangeAddress(e) {
    return this._changeAddress = H(e), this;
  }
  setCollateral(e) {
    const t = _e(e);
    return this._txBuilder.set_collateral(t), this;
  }
  setMetadata(e, t) {
    return this._txBuilder.add_json_metadatum_with_schema(a.BigNum.from_str(e.toString()), JSON.stringify(t), a.MetadataJsonSchema.NoConversions), this;
  }
  setRequiredSigners(e) {
    return Array.from(new Set(e.map((r) => r.startsWith("addr") ? et(r) : It(r)).map((r) => F(r)))).forEach((r) => {
      this._txBuilder.add_required_signer(r);
    }), this;
  }
  setTimeToStart(e) {
    return this._txBuilder.set_validity_start_interval_bignum(a.BigNum.from_str(e)), this;
  }
  setTimeToExpire(e) {
    return this._txBuilder.set_ttl_bignum(a.BigNum.from_str(e)), this;
  }
  setTxInputs(e) {
    return e.map((t) => O(t)).forEach((t) => {
      this._txInputsBuilder.add_input(t.output().address(), t.input(), t.output().amount());
    }), this;
  }
  withdrawRewards(e, t) {
    const r = He(e);
    return r !== void 0 && this._txWithdrawals.insert(r, a.BigNum.from_str(t)), this;
  }
  async addBurnInputsIfNeeded() {
    if (this._initiator && this._totalBurns.size > 0 && this.notVisited("setTxInputs")) {
      const e = await this._initiator.getUsedUTxOs();
      ts(this._totalBurns, e.map((r) => Qt(r))).map((r) => O(r)).forEach((r) => {
        this._txInputsBuilder.add_input(r.output().address(), r.input(), r.output().amount());
      });
    }
  }
  async addChangeAddress() {
    if (this._initiator && this._changeAddress === void 0) {
      const e = await this._initiator.getUsedAddress();
      this._txBuilder.add_change_if_needed(e);
    } else
      this._changeAddress !== void 0 && this._txBuilder.add_change_if_needed(this._changeAddress);
  }
  async addCollateralIfNeeded() {
    if (this._initiator && this.notVisited("setCollateral")) {
      const e = await this._initiator.getUsedCollateral();
      this._txBuilder.set_collateral(_e(e));
    }
  }
  async addRequiredSignersIfNeeded() {
    if (this._initiator && this.notVisited("setRequiredSigners")) {
      const e = await this._initiator.getUsedAddress(), t = et(e.to_bech32());
      this._txBuilder.add_required_signer(F(t));
    }
  }
  async addTxInputsAsNeeded() {
    if (this._txBuilder.set_inputs(this._txInputsBuilder), (this._mintBuilder.has_native_scripts() || this._mintBuilder.has_plutus_scripts()) && this._txBuilder.set_mint_builder(this._mintBuilder), this._txCertificates.len() > 0 && this._txBuilder.set_certs(this._txCertificates), this._txWithdrawals.len() > 0 && this._txBuilder.set_withdrawals(this._txWithdrawals), this.notVisited("setTxInputs")) {
      const e = !this.notVisited("mintAsset") || !this.notVisited("sendAssets") || !this.notVisited("sendValue"), t = await this.selectLovelaceUTxOs(!1), r = await this.filterAvailableUTxOs(t), i = e ? a.CoinSelectionStrategyCIP2.LargestFirstMultiAsset : a.CoinSelectionStrategyCIP2.LargestFirst;
      this._txBuilder.add_inputs_from(r, i);
    }
    if (this._txBuilder.get_mint_builder() || this.notVisited("redeemValue") === !1) {
      const e = this._era !== void 0 ? zt[this._era] : zt.BABBAGE;
      this._txBuilder.calc_script_data_hash(e);
    }
  }
  async forgeAssetsIfNeeded() {
    const e = (t, r) => {
      const i = t.data.assetName, n = t.data.metadata, o = t.unit.slice(0, N);
      if (r && r[o]) {
        const { [o]: A, ...c } = r, I = {
          [i]: n,
          ...A
        };
        return {
          [o]: {
            ...I
          },
          ...c
        };
      }
      return r !== void 0 ? {
        [o]: {
          [i]: n
        },
        ...r
      } : {
        [o]: { [i]: n }
      };
    };
    await this.addBurnInputsIfNeeded(), Array.from(this._totalMints, (t) => ({
      unit: t[0],
      data: t[1]
    })).reduce((t, r) => t.set(r.data.label, e(r, t.get(r.data.label))), /* @__PURE__ */ new Map()).forEach((t, r) => {
      this._txBuilder.add_json_metadatum(a.BigNum.from_str(r), JSON.stringify(t));
    }), this.addMintOutputs();
  }
  async filterAvailableUTxOs(e = []) {
    const t = a.TransactionUnspentOutputs.new();
    return this._initiator === void 0 || (await this._initiator.getUsedUTxOs()).filter((i) => e.find((n) => n.input.txHash === i.input().transaction_id().to_hex()) === void 0).forEach((i) => {
      t.add(i);
    }), t;
  }
  async selectLovelaceUTxOs(e) {
    if (this._initiator === void 0 || e === !1)
      return [];
    const t = await this._initiator.getUsedUTxOs(), r = Ze("5000000", t.map((n) => Qt(n)));
    return r.map((n) => O(n)).forEach((n) => {
      this._txBuilder.add_input(n.output().address(), n.input(), n.output().amount());
    }), r;
  }
  addMintOutputs() {
    this._recipients.forEach((e, t) => {
      const i = yt(e).multiasset();
      if (i !== void 0) {
        const o = Ct(t).next().with_asset_and_min_required_coin_by_utxo_cost(i, le(this._protocolParameters.coinsPerUTxOSize)).build();
        this._txBuilder.add_output(o);
      }
    });
  }
  notVisited(e) {
    return this.__visits.includes(e) === !1;
  }
};
j([
  Z()
], R.prototype, "mintAsset", null);
j([
  Z()
], R.prototype, "redeemValue", null);
j([
  Z()
], R.prototype, "sendAssets", null);
j([
  Z()
], R.prototype, "sendValue", null);
j([
  Z()
], R.prototype, "setCollateral", null);
j([
  Z()
], R.prototype, "setRequiredSigners", null);
j([
  Z()
], R.prototype, "setTxInputs", null);
R = j([
  Rs
], R);
class y {
  _networkId;
  _encryptedSecret;
  constructor(e, t) {
    this._networkId = e, this._encryptedSecret = t;
  }
  getAccount(e, t) {
    return this.accountContext(e, t, (r, i) => {
      const n = de(this._networkId, r.to_public().hash(), i.to_public().hash()).to_address().to_bech32(), o = ge(this._networkId, r.to_public().hash()).to_address().to_bech32(), A = Ft(this._networkId, i.to_public().hash()).to_address().to_bech32();
      return {
        baseAddress: n,
        enterpriseAddress: o,
        rewardAddress: A
      };
    });
  }
  signData(e, t, r, i) {
    try {
      return this.accountContext(e, t, (n, o) => {
        const A = { payload: i }, c = {
          address: y.resolveAddress(this._networkId, r, n, o),
          key: r.startsWith("stake") ? o : n
        }, { coseSign1: I, coseKey: u } = rs(A, c);
        return { signature: I, key: u };
      });
    } catch (n) {
      throw new Error(`An error occurred during signData: ${n}.`);
    }
  }
  signTx(e, t, r, i, n) {
    try {
      const o = Fe(Gs(i));
      return this.accountContext(e, t, (A, c) => {
        const I = a.Vkeywitnesses.new();
        return y.resolveSigners(i, r, A.to_public().hash().to_hex()).forEach((h) => {
          if (h === A.to_public().hash().to_hex())
            I.add(a.make_vkey_witness(o, A));
          else if (h === c.to_public().hash().to_hex())
            I.add(a.make_vkey_witness(o, c));
          else if (n === !1)
            throw new Error(`Missing key witness for: ${h}`);
        }), I;
      });
    } catch (o) {
      throw new Error(`An error occurred during signTx: ${o}.`);
    }
  }
  static encryptMnemonic(e, t) {
    const r = pe(e.join(" ")), i = Ve(r), n = K(i.as_bytes());
    return i.free(), y.encrypt(n, t);
  }
  static encryptPrivateKey(e, t) {
    const r = a.Bip32PrivateKey.from_bech32(e), i = K(r.as_bytes());
    return r.free(), y.encrypt(i, t);
  }
  static encryptSigningKeys(e, t, r) {
    const i = y.encrypt(e.slice(4), r), n = y.encrypt(t.slice(4), r);
    return [i, n];
  }
  static generateMnemonic(e = 256) {
    return Le(e).split(" ");
  }
  accountContext(e, t, r) {
    const { paymentKey: i, stakeKey: n } = y.resolveKeys(e, t, this._encryptedSecret), o = r(i, n);
    return i.free(), n.free(), o;
  }
  static decrypt(e, t) {
    try {
      return a.decrypt_with_password(S(t), e);
    } catch {
      throw new Error("The password is incorrect.");
    }
  }
  static encrypt(e, t) {
    const r = Ce("0123456789abcdef"), i = r(64), n = r(24);
    return a.encrypt_with_password(S(t), i, n, e);
  }
  static resolveAddress(e, t, r, i) {
    const n = [
      de(e, r.to_public().hash(), i.to_public().hash()),
      ge(e, r.to_public().hash()),
      Ft(e, i.to_public().hash())
    ].find((o) => o.to_address().to_bech32() === t);
    if (n !== void 0)
      return n.to_address();
    throw new Error(`Address: ${t} doesn't belong to this account.`);
  }
  static resolveKeys(e, t, r) {
    if (typeof r == "string") {
      const o = y.decrypt(r, t);
      return Ds(o, e);
    }
    const i = y.decrypt(r[0], t), n = y.decrypt(r[1], t);
    return {
      paymentKey: a.PrivateKey.from_hex(i),
      stakeKey: a.PrivateKey.from_hex(n)
    };
  }
  static resolveSigners(e, t, r) {
    const i = (A) => {
      const c = (_, B = [], m = 0) => {
        var lt, At, Yt, Gt, Rt;
        if (_ === void 0 || m >= _.len())
          return B;
        const v = _.get(m), b = new Array();
        switch (v.kind()) {
          case a.CertificateKind.StakeDeregistration: {
            const w = (lt = v.as_stake_deregistration()) == null ? void 0 : lt.stake_credential(), T = (w == null ? void 0 : w.kind()) === a.StakeCredKind.Key ? w.to_keyhash() : void 0;
            T && b.push(T.to_hex());
            break;
          }
          case a.CertificateKind.StakeDelegation: {
            const w = (At = v.as_stake_delegation()) == null ? void 0 : At.stake_credential(), T = (w == null ? void 0 : w.kind()) === a.StakeCredKind.Key ? w.to_keyhash() : void 0;
            T && b.push(T.to_hex());
            break;
          }
          case a.CertificateKind.PoolRegistration: {
            const w = (Yt = v.as_pool_registration()) == null ? void 0 : Yt.pool_params().pool_owners();
            b.push(...u(w));
            break;
          }
          case a.CertificateKind.PoolRetirement: {
            const w = (Gt = v.as_pool_retirement()) == null ? void 0 : Gt.pool_keyhash();
            w && b.push(w.to_hex());
            break;
          }
          case a.CertificateKind.MoveInstantaneousRewardsCert: {
            const w = (Rt = v.as_move_instantaneous_rewards_cert()) == null ? void 0 : Rt.move_instantaneous_reward().as_to_stake_creds();
            if (w)
              for (let T = 0; T < w.len(); T += 1) {
                const Lt = w.keys().get(T), $t = Lt.kind() === a.StakeCredKind.Key ? Lt.to_keyhash() : void 0;
                $t && b.push($t.to_hex());
              }
            break;
          }
        }
        return c(_, [...B, ...b], m + 1);
      }, I = (_, B = [], m = 0) => {
        if (_ === void 0 || m >= _.len())
          return B;
        const v = _.get(m).index(), b = _.get(m).transaction_id(), lt = t.find((At) => At.input.outputIndex === v && At.input.txHash === b.to_hex()) !== void 0 ? r : "OUR_PRINCESS_IS_IN_ANOTHER_CASTLE";
        return I(_, [...B, lt], m + 1);
      }, u = (_, B = [], m = 0) => _ === void 0 || m >= _.len() ? B : u(_, [...B, _.get(m).to_hex()], m + 1), h = (_, B = [], m = 0) => {
        if (_ === void 0 || m >= _.len())
          return B;
        const v = _.keys().get(m).payment_cred(), b = v.kind() === a.StakeCredKind.Key ? v.to_keyhash() : void 0;
        return h(_, b ? [...B, b.to_hex()] : B, m + 1);
      }, g = A.certs(), p = A.collateral(), x = A.inputs(), M = A.required_signers(), L = A.withdrawals();
      return [
        ...c(g),
        ...I(p),
        ...I(x),
        ...u(M),
        ...h(L)
      ];
    }, n = (A) => {
      const c = (u, h = []) => {
        var g, p, x, M;
        if (u)
          for (let L = 0; L < u.len(); L += 1) {
            const _ = u.get(L);
            switch (_.kind()) {
              case a.NativeScriptKind.ScriptPubkey: {
                const B = (g = _.as_script_pubkey()) == null ? void 0 : g.addr_keyhash().to_hex();
                return B ? [...h, B] : h;
              }
              case a.NativeScriptKind.ScriptAll:
                return c((p = _.as_script_all()) == null ? void 0 : p.native_scripts(), h);
              case a.NativeScriptKind.ScriptAny:
                return c((x = _.as_script_any()) == null ? void 0 : x.native_scripts(), h);
              case a.NativeScriptKind.ScriptNOfK:
                return c((M = _.as_script_n_of_k()) == null ? void 0 : M.native_scripts(), h);
            }
          }
        return h;
      }, I = A.native_scripts();
      return [
        ...c(I)
      ];
    }, o = W(e);
    return /* @__PURE__ */ new Set([
      ...i(o.body()),
      ...n(o.witness_set())
    ]);
  }
}
const U = "MARI0TIME";
class fr {
  _fetcher;
  _submitter;
  _wallet;
  constructor(e) {
    switch (this._fetcher = e.fetcher, this._submitter = e.submitter, e.key.type) {
      case "mnemonic":
        this._wallet = new y(e.networkId, y.encryptMnemonic(e.key.words, U));
        break;
      case "root":
        this._wallet = new y(e.networkId, y.encryptPrivateKey(e.key.bech32, U));
        break;
      case "cli":
        this._wallet = new y(e.networkId, y.encryptSigningKeys(e.key.payment, e.key.stake ?? "f0".repeat(34), U));
    }
  }
  getPaymentAddress(e = 0) {
    return this._wallet.getAccount(e, U).enterpriseAddress;
  }
  getRewardAddress(e = 0) {
    return this._wallet.getAccount(e, U).rewardAddress;
  }
  getUsedAddress(e = 0) {
    const t = this._wallet.getAccount(e, U);
    return H(t.enterpriseAddress);
  }
  getUsedCollateral(e = Y.maxCollateralInputs) {
    throw new Error("getUsedCollateral not implemented.");
  }
  async getUsedUTxOs(e = 0) {
    const t = this._wallet.getAccount(e, U);
    return (await this._fetcher.fetchAddressUTxOs(t.enterpriseAddress)).map((i) => O(i));
  }
  signData(e, t, r = 0) {
    try {
      return this._wallet.signData(r, U, e, t);
    } catch (i) {
      throw new Error(`[AppWallet] An error occurred during signData: ${i}.`);
    }
  }
  async signTx(e, t = !1, r = 0) {
    try {
      const i = this._wallet.getAccount(r, U), n = await this._fetcher.fetchAddressUTxOs(i.enterpriseAddress), o = this._wallet.signTx(r, U, n, e, t), A = W(e), c = A.witness_set(), I = Ge(c, o);
      return c.set_vkeys(I), a.Transaction.new(A.body(), c, A.auxiliary_data()).to_hex();
    } catch (i) {
      throw new Error(`[AppWallet] An error occurred during signTx: ${i}.`);
    }
  }
  submitTx(e) {
    return this._submitter.submitTx(e);
  }
  static brew(e = 256) {
    return y.generateMnemonic(e);
  }
}
class Nt {
  _walletInstance;
  constructor(e) {
    this._walletInstance = e;
  }
  static getInstalledWallets() {
    return window.cardano === void 0 ? [] : Jt.filter((e) => window.cardano[e] !== void 0).map((e) => ({
      name: window.cardano[e].name,
      icon: window.cardano[e].icon,
      version: window.cardano[e].apiVersion
    }));
  }
  static async enable(e) {
    try {
      const t = await Nt.resolveInstance(e);
      if (t !== void 0)
        return new Nt(t);
      throw new Error(`Couldn't create an instance of wallet: ${e}`);
    } catch (t) {
      throw new Error(`[BrowserWallet] An error occurred during enable: ${t}.`);
    }
  }
  async getBalance() {
    const e = await this._walletInstance.getBalance();
    return Te(Ps(e));
  }
  async getChangeAddress() {
    const e = await this._walletInstance.getChangeAddress();
    return tt(e).to_bech32();
  }
  async getCollateral(e = Y.maxCollateralInputs) {
    return (await this.getUsedCollateral(e)).map((r) => Qt(r));
  }
  getNetworkId() {
    return this._walletInstance.getNetworkId();
  }
  async getRewardAddresses() {
    return (await this._walletInstance.getRewardAddresses()).map((t) => tt(t).to_bech32());
  }
  async getUnusedAddresses() {
    return (await this._walletInstance.getUnusedAddresses()).map((t) => tt(t).to_bech32());
  }
  async getUsedAddresses() {
    return (await this._walletInstance.getUsedAddresses()).map((t) => tt(t).to_bech32());
  }
  async getUtxos() {
    return (await this.getUsedUTxOs()).map((t) => Qt(t));
  }
  signData(e, t) {
    const r = H(e).to_hex();
    return this._walletInstance.signData(r, S(t));
  }
  async signTx(e, t = !1) {
    try {
      const r = W(e), i = r.witness_set(), n = await this._walletInstance.signTx(e, t), o = Hs(n).vkeys() ?? a.Vkeywitnesses.new(), A = Ge(i, o);
      return i.set_vkeys(A), K(a.Transaction.new(r.body(), i, r.auxiliary_data()).to_bytes());
    } catch (r) {
      throw new Error(`[BrowserWallet] An error occurred during signTx: ${JSON.stringify(r)}.`);
    }
  }
  submitTx(e) {
    return this._walletInstance.submitTx(e);
  }
  async getUsedAddress() {
    const e = await this._walletInstance.getUsedAddresses();
    return tt(e[0]);
  }
  async getUsedCollateral(e = Y.maxCollateralInputs) {
    return (await this._walletInstance.experimental.getCollateral() ?? []).map((r) => he(r)).slice(0, e);
  }
  async getUsedUTxOs() {
    return (await this._walletInstance.getUtxos() ?? []).map((t) => he(t));
  }
  async getAssets() {
    return (await this.getBalance()).filter((t) => t.unit !== "lovelace").map((t) => {
      const r = t.unit.slice(0, N), i = t.unit.slice(N), n = Ys(r, i);
      return {
        unit: t.unit,
        policyId: r,
        assetName: Vt(i),
        fingerprint: n,
        quantity: t.quantity
      };
    });
  }
  async getLovelace() {
    const t = (await this.getBalance()).find((r) => r.unit === "lovelace");
    return t !== void 0 ? t.quantity : "0";
  }
  async getPolicyIdAssets(e) {
    return (await this.getAssets()).filter((r) => r.policyId === e);
  }
  async getPolicyIds() {
    const e = await this.getBalance();
    return Array.from(new Set(e.map((t) => t.unit.slice(0, N)))).filter((t) => t !== "lovelace");
  }
  static resolveInstance(e) {
    if (window.cardano === void 0)
      return;
    const t = Jt.map((r) => window.cardano[r]).filter((r) => r !== void 0).find((r) => r.name.toLowerCase() === e.toLowerCase());
    return t == null ? void 0 : t.enable();
  }
}
const Re = "http://localhost:4000/", Ls = "http://localhost:5000/", $s = `${Re}access`, qs = `${Re}transaction/signtx`;
class _r {
  static getAxiosInstance() {
    return ot.create({
      baseURL: Ls,
      withCredentials: !0
    });
  }
  static getAppId() {
    return window.location.hostname;
  }
  static async openMinaFrontend(e) {
    const t = this.getAppId();
    e.includes("?") ? e = `${e}&appId=${t}` : e = `${e}?appId=${t}`;
    const r = "left=100,top=100,width=540,height=540", i = window.open(e, "meshWindow", r);
    return i || console.error("the window did not open", i), await (async () => new Promise((n) => {
      window.addEventListener("message", async (o) => {
        o.data.target == "minaWallet" && n(o.data);
      });
    }))();
  }
  static async get(e, t = {}) {
    const r = this.getAppId();
    t = {
      ...t,
      appId: r
    };
    try {
      return (await this.getAxiosInstance().get(e, {
        params: t
      })).data;
    } catch {
      console.error("Not logged in");
      return;
    }
  }
  static async enable() {
    return await this.get("wallet/getuserwalletsmeta") === void 0 ? await this.openMinaFrontend($s) : !0;
  }
  static async getChangeAddress(e = void 0, t = void 0) {
    return await this.get("wallet/getchangeaddress", {
      walletId: e,
      accountIndex: t
    });
  }
  static async getUtxos(e = void 0, t = void 0) {
    return await this.get("wallet/getutxo", {
      walletId: e,
      accountIndex: t
    });
  }
  static async signTx(e, t = !1) {
    const r = await this.get("wallet/getuserwalletsmeta");
    if (console.log("userWalletsMeta", r), r) {
      const i = await this.openMinaFrontend(`${qs}?unsignedTx=${e}&partialSign=${t}`);
      if (i instanceof a.Vkeywitnesses) {
        const n = W(e), o = n.witness_set();
        o.set_vkeys(i);
        const A = a.Transaction.new(n.body(), o, n.auxiliary_data()).to_hex();
        return console.log("signedTx", A), A;
      }
    } else
      return;
  }
}
export {
  fr as AppWallet,
  Ir as BlockfrostProvider,
  Nt as BrowserWallet,
  y as EmbeddedWallet,
  lr as ForgeScript,
  hr as InfuraProvider,
  ur as KoiosProvider,
  _r as MinaWallet,
  dr as TangoProvider,
  R as Transaction,
  Xs as checkSignature,
  cr as generateNonce,
  Ze as largestFirst,
  ts as largestFirstMultiAsset,
  Zs as resolveDataHash,
  tr as resolveEpochNo,
  Ys as resolveFingerprint,
  er as resolveLanguageView,
  sr as resolveNativeScriptHash,
  et as resolvePaymentKeyHash,
  rr as resolvePlutusScriptAddress,
  ir as resolvePlutusScriptHash,
  ar as resolvePoolId,
  nr as resolvePrivateKey,
  Ot as resolveRewardAddress,
  or as resolveScriptRef,
  Ar as resolveSlotNo,
  It as resolveStakeKeyHash,
  Ye as resolveTxFees,
  Gs as resolveTxHash
};
