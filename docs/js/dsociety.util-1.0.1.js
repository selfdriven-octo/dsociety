
function hex2buffer(str)
{
    return new Uint8Array(str.match(/../g).map(h=>parseInt(h,16))).buffer
}

function chars2Text(chars)
{
    var arrayChars = chars.split(',');
    var text = String.fromCharCode.apply(null, arrayChars);
    return text;
}

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
