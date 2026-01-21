// !!! REFERENCE ONLY -- Minimal helper for generating a KERI non-transferable AID from an
// Ed25519 keypair using TweetNaCl.
//
// AID format (non-transferable):
//   AID = "B" + base64url(ed25519_public_key)
//
// Demo / learning only. Don't use this as-is for production key mgmt.

// ---------------------------------------------------------------------------
// NaCl loader
// ---------------------------------------------------------------------------

function getNacl() {
  if (typeof nacl !== "undefined" && nacl.sign && nacl.sign.keyPair) {
    return nacl;
  }

  try {
    // Node / bundler
    return require("tweetnacl");
  } catch (e) {
    throw new Error(
      "TweetNaCl not found. Include via script tag or `npm install tweetnacl`."
    );
  }
}

// ---------------------------------------------------------------------------
// Encoding helpers
// ---------------------------------------------------------------------------

function bytesToHex(bytes) {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

function bytesToBase64Url(bytes) {
  const bin = String.fromCharCode.apply(null, bytes);
  const b64 =
    typeof btoa !== "undefined"
      ? btoa(bin)
      : Buffer.from(bin, "binary").toString("base64");

  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// CESR: non-transferable Ed25519 public key = "B" + base64url(pk)
function ed25519PubToKeriAid(pubKeyBytes) {
  return "B" + bytesToBase64Url(pubKeyBytes);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

function generateKeriAid() {
  try {
    const naclLib = getNacl();

    // 1. Generate Ed25519 keypair
    const kp = naclLib.sign.keyPair();

    // 2. Encodings
    const pubHex = bytesToHex(kp.publicKey);
    const pubB64 = bytesToBase64Url(kp.publicKey);
    const secHex = bytesToHex(kp.secretKey);

    // 3. KERI AID
    const aid = ed25519PubToKeriAid(kp.publicKey);

    const payload = {
      aid,
      suite: "Ed25519",
      cesr: {
        publicKeyCode: "B",
        explanation:
          'AID = "B" + base64url(ed25519_public_key) (non-transferable KERI prefix)'
      },
      publicKey: {
        hex: pubHex,
        base64url: pubB64
      },
      // exposed for learning only
      secretKey: {
        hex: secHex
      },
      createdAt: new Date().toISOString()
    };

    return Promise.resolve(payload);
  } catch (err) {
    return Promise.reject(err);
  }
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

// Browser global
if (typeof window !== "undefined") {
  window.KeriAid = { generateKeriAid };
}

// CommonJS
module.exports = {
  generateKeriAid
};