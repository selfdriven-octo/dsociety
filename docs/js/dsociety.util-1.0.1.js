
function hex2buffer(str) {
	return new Uint8Array(str.match(/../g).map(h => parseInt(h, 16))).buffer
}

function chars2Text(chars) {
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


function strToBytes(str) {
	return new TextEncoder().encode(str);
}

function sha256Base64Url(bytes) {
	// bytes: Uint8Array
	const wordArray = CryptoJS.lib.WordArray.create(bytes);
	const hash = CryptoJS.SHA256(wordArray);                 // WordArray
	const b64 = CryptoJS.enc.Base64.stringify(hash);         // base64

	// convert base64 -> base64url
	return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

// Canonicalise event: stable key ordering, drop 'd' when computing SAID
function canonicaliseEvent(ev) {
	// Deep copy without 'd'
	const clone = JSON.parse(JSON.stringify(ev));
	delete clone.d;

	function sortKeys(obj) {
		if (Array.isArray(obj)) {
			return obj.map(sortKeys);
		} else if (obj && typeof obj === "object") {
			const sorted = {};
			Object.keys(obj).sort().forEach(k => {
				sorted[k] = sortKeys(obj[k]);
			});
			return sorted;
		}
		return obj;
	}

	const sorted = sortKeys(clone);
	return JSON.stringify(sorted);
}

