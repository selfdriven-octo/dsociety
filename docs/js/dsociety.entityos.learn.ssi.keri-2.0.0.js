import { EntityOS } from '/js/entityos.module.class-1.0.0.js';

const eos = new EntityOS();

// dSOCIETY | LEARN-BY-EXAMPLE

// Getting a "foot-hold" on twith Self-Sovereign Identity (SSI) tech by creating a DID.

// Code is free to use.
// It is only provided as to aid learning .

// SAID = Self-Addressing ID

eos.add(
[
	{
		name: 'learn-ssi-keri-init',
		code: function ()
		{
			console.log('We have an opportunity to descentralise & rehumanise our society.');
			console.log('https://dsociety.io\n\n')
		}
	},
    {
		name: 'learn-ssi-keri-util-bytes-to-hex',
		code: function (bytes)
		{
            return Array.from(bytes)
				.map(b => b.toString(16).padStart(2, "0"))
				.join("");
        }
    },
	{
		name: 'learn-ssi-keri-util-bytes-to-base64-url',
		code: function (bytes)
		{
            const bin = String.fromCharCode.apply(null, bytes);
			const b64 =
				typeof btoa !== "undefined"
				? btoa(bin)
				: Buffer.from(bin, "binary").toString("base64");

			return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
        }
    },
	{
		name: 'learn-ssi-keri-create-aid',
		code: function ()
		{
			console.log('Step 1 | Create AID.');

			const cryptoCurve = eos.get(
			{
				scope: 'learn-ssi-keri-create-aid',
				context: 'curve',
				valueDefault: 'ed25519'
			});

			console.log(cryptoCurve + ' Key Pair:')

			const ec = new elliptic.ec(cryptoCurve);
			const key = ec.genKeyPair();

			eos.set(
			{
				scope: 'learn-ssi-keri',
				context: 'key-pair',
				value: key
			});

			/* 2. Encodings
			const pubHex = bytesToHex(kp.publicKey);
			const pubB64 = bytesToBase64Url(kp.publicKey);
			const secHex = bytesToHex(kp.secretKey);
			*/

			const publicKeyBase64 = eos.invoke('learn-ssi-keri-util-bytes-to-base64-url', key.getPublic('bytes'));
			const publicKey = key.getPublic('hex');
			const privateKey = key.getPrivate('hex');

			console.log('Public Key (Hex):', publicKey);
			console.log('Public Key (Base64):', publicKeyBase64);
			console.log('Private Key (Hex):', privateKey);

			eos.set(
			{
				scope: 'learn-ssi-keri',
				context: 'private-key-hex',
				value: privateKey
			});

			eos.set(
			{
				scope: 'learn-ssi-keri',
				context: 'public-key-hex',
				value: publicKey
			});

			eos.set(
			{
				scope: 'learn-ssi-keri',
				context: 'public-key-base64',
				value: publicKeyBase64
			});

			var learnSSIKERIView = eos.view();

			learnSSIKERIView.add(
			[
				'<div style="background-color:rgba(0,0,0,0.7); border-radius: 6px; padding:16px;" class="w-md-100 mt-2 mb-4">',
					'<h4 class="fw-bold mb-3 mt-1">Step 1 | Create ', cryptoCurve, ' Keys</h4>',
					'<div class="" style="color:#e8d5cf;">Public Key (Hex)</div>',
					'<div style="font-family: PT Mono, monospace; font-size: 1rem; color:#baadab; word-break: break-all;" class="mb-1">',
						publicKey,
					'</div>',
					'<div class="" style="color:#e8d5cf;">Public Key (Base64)</div>',
					'<div style="font-family: PT Mono, monospace; font-size: 1rem; color:#baadab; word-break: break-all;" class="mb-1">',
						publicKeyBase64,
					'</div>',
					'<div class="mt-4" style="color:#e8d5cf;">Private Key (Hex)</div>',
					'<div style="font-family: PT Mono, monospace; font-size: 1rem; color:#baadab; word-break: break-all;" class="mb-1">',
						privateKey,
					'</div>',
                '</div>'
			]);

            console.log('Step 2 | Create public key as AID - Base64.');

          	const ssiKERIAID = "B" + publicKeyBase64;
			console.log('KERI AID:', ssiKERIAID);

			const ssiKERIAIDDoc = {
				aid: ssiKERIAID,
				suite: "Ed25519",
				cesr: {
					publicKeyCode: "B",
					explanation:
					'AID = ' + ssiKERIAID
				},
				publicKey: {
					hex: publicKey,
					base64url: publicKeyBase64
				},
				createdAt: new Date().toISOString()
			};

			console.log('KERI AID Doc:', ssiKERIAIDDoc);

			const ssiKERIAIDDocFormatted = JSON.stringify(ssiKERIAIDDoc, null, 2)

            learnSSIKERIView.add(
			[
				'<div style="background-color:rgba(0,0,0,0.7); border-radius: 6px; padding:16px;" class="w-md-100 mt-4 mb-4">',
					'<h4 class="fw-bold mb-3 mt-1">Step 2 | AID</h4>',
					'<div class="" style="color:#e8d5cf;">Autonomic ID (AID) | Public Key | Base64</div>',
					'<div style="font-family: PT Mono, monospace; font-size: 1rem; color:#baadab; word-break: break-all;" class="mb-1">',
						ssiKERIAID,
					'</div>',
					'<div class="mt-2" style="color:#e8d5cf;">AID Document</div>',
					'<div style="font-family: PT Mono, monospace; font-size: 1rem; color:#baadab; word-break: break-all;" class="mb-1">',
						'<pre style="color:#baadab;">',
						ssiKERIAIDDocFormatted,
						'</pre>',
					'</div>',
                '</div>'
			]);

			learnSSIKERIView.add(
			[
				'<div style="background-color:rgba(0,0,0,0.7); border-radius: 6px; padding:16px;" class="w-md-100 mt-2 mb-4">',
					'<h4 class="fw-bold mb-3 mt-1">Step 3 | Inception | Key Event Ledger</h4>',
					'<div class="d-none mb-1">',
						'<textarea id="url-text" class="form-control entityos-text w-100 border border-info"',
                            ' style="height:180px;" data-scope="learn-ssi-keri"',
                            ' data-context="data-to-sign"></textarea>',
                    '</div>',
                '</div>',
				'<button type="button" class="btn btn-sm btn-outline-primary text-light entityos-click mb-2"',
					' data-controller="learn-ssi-keri-create-event-inception" style="width: 200px;">',
					'Create Inception Event',
				'</button>',
				'<div id="learn-ssi-keri-create-event-inception-view"></div>'
			]);

			/*

			Later as ACDC.

            // Create proof - hash the message and then sign/encrypt with aid

            learnSSIKERIView.add(
			[
				'<div style="background-color:rgba(0,0,0,0.7); border-radius: 6px; padding:16px;" class="w-md-100 mt-2 mb-4">',
					'<h4 class="fw-bold mb-3 mt-1">Step 3 | Hash & Sign Data (e.g. Verifiable Credential)</h4>',
					'<div class="mb-1">',
						'<textarea id="url-text" class="form-control entityos-text w-100 border border-info"',
                            ' style="height:180px;" data-scope="learn-ssi-keri"',
                            ' data-context="data-to-sign"></textarea>',
                    '</div>',
                '</div>',
				'<button type="button" class="btn btn-sm btn-outline-primary text-light entityos-click mb-2"',
					' data-controller="learn-ssi-keri-create-signature" style="width: 200px;">',
					'Create Signature',
				'</button>',
				'<div id="learn-ssi-keri-create-signature-view"></div>',
				'<div class="mt-4">In console run entityos._util.controller.invoke("learn-ssi-keri-create-event-[inception,rotation,delegation]")</div>'
			]);
			*/

			learnSSIKERIView.render('#learn-view')
		}
	},
	{
		name: 'learn-ssi-keri-create-signature',
		code: function ()
		{
			const data = eos.get(
			{
				scope: 'learn-ssi-keri'
			});

			console.log(data);

			let dataHash = entityos._util.protect.hash({data: data['data-to-sign']}).dataHashed;

			const cryptoCurve = eos.get(
			{
				scope: 'learn-ssi-keri-create-aid',
				context: 'curve',
				valueDefault: 'ed25519'
			});

			const ec = new elliptic.ec(cryptoCurve);
			const keyPair = ec.keyFromPrivate(data['private-key-hex']);
			const signature = keyPair.sign(dataHash, { canonical: true }); // Use canonical for better compatibility

			eos.set(
			{
				scope: 'learn-ssi-keri',
				context: 'signature',
				value: signature
			});

			console.log('Signature:', signature.toDER('hex')); // DER encoding for verification

			let learnSSIView = eos.view();

			learnSSIView.add(
			[
				'<div style="background-color:rgba(0,0,0,0.7); border-radius: 6px; padding:16px;" class="w-md-100 mt-2 mb-4">',
					'<h4 class="fw-bold mb-3 mt-1">Step 4 | ', cryptoCurve, ' Private Key Signature of SHA256 Hash of the Data</h4>',
					'<div class="" style="color:#e8d5cf;">Signature</div>',
					'<div style="font-family: PT Mono, monospace; font-size: 1rem; color:#baadab; word-break: break-all;" class="mb-1">',
						signature.toDER('hex'),
					'</div>',
                '</div>',
				'<button type="button" class="d-none btn btn-sm btn-outline-primary text-light entityos-click mb-2"',
					' data-controller="learn-ssi-keri-verify-signature" style="width: 200px;">',
					'Verify Signature',
				'</button>',
				'<div id="learn-ssi-keri-verify-signature-view"></div>'
			]);

			learnSSIView.render('#learn-ssi-keri-create-signature-view')
		}
	},
	{
		name: 'learn-ssi-keri-verify-signature',
		code: function ()
		{
			const data = eos.get(
			{
				scope: 'learn-ssi-keri'
			});

			console.log(data);

			let dataHashed = entityos._util.protect.hash({data: data['data-to-sign']}).dataHashed;

			const cryptoCurve = eos.get(
			{
				scope: 'learn-ssi-keri-create-aid',
				context: 'curve',
				valueDefault: 'ed25519'
			});

			const ec = new elliptic.ec(cryptoCurve);

			 const keyBytes = new Uint8Array(data['public-key-hex'].match(/[\da-f]{2}/gi).map(byte => parseInt(byte, 16)));
            // Assuming the key format is correct, adjust based on your DER format
            const publicKey = ec.keyFromPublic(keyBytes, 'hex');
			const verified = ec.verify(dataHashed, data.signature, publicKey);

			console.log('Verified:', verified);

			let learnSSIView = eos.view();

			learnSSIView.add(
			[
				'<div style="background-color:rgba(0,0,0,0.7); border-radius: 6px; padding:16px;" class="w-md-100 mt-2 mb-4">',
					'<h4 class="fw-bold mb-3 mt-1">Step 6 | Verify Data with Signature & ', cryptoCurve, ' Public Key</h4>',
					'<div class="" style="color:#e8d5cf;">It will always verify in this learning example.</div>',
					'<div class="" style="color:#e8d5cf;">If you want to test it not verifying then change the data in Step 4 and then click Verify Signature.</div>',

					'<div style="font-family: PT Mono, monospace; font-size: 1rem; color:#baadab; word-break: break-all;" class="mb-1">',
						(verified?'Verified':'Not Verified'),
					'</div>',
                '</div>',
			]);

			learnSSIView.render('#learn-ssi-keri-verify-signature-view')
		}
	},
	{
		name: 'learn-ssi-keri-create-event-inception',
		code: function ()
		{
			// ---- UTILS

			function strToBytes(str)
			{
				return new TextEncoder().encode(str);
				}

			function sha256Base64Url(bytes)
			{
				// bytes: Uint8Array
				const wordArray = CryptoJS.lib.WordArray.create(bytes);
				const hash = CryptoJS.SHA256(wordArray);                 // WordArray
				const b64 = CryptoJS.enc.Base64.stringify(hash);         // base64

				// convert base64 -> base64url
				return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
			}

			// Simple CESR-ish non-transferable Ed25519 public key prefix ("B")
			function ed25519PubToQb64(pubBytes) {
				const b64u = bytesToBase64Url(pubBytes);
				return "B" + b64u;
			}

			// Canonicalise event: stable key ordering, drop 'd' when computing SAID
			function canonicaliseEvent(ev)
			{
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

			// ------ MAIN

			const data = eos.get(
			{
				scope: 'learn-ssi-keri'
			});

			console.log(data);

			const keyPairCurrent = eos.get(
			{
				scope: 'learn-ssi-keri',
				context: 'key-pair'
			});

			const cryptoCurve = eos.get(
			{
				scope: 'learn-ssi-keri-create-aid',
				context: 'curve',
				valueDefault: 'ed25519'
			});

			const ec = new elliptic.ec(cryptoCurve);
			const keyPairNext = ec.genKeyPair();

			const state =
			{
				controller: null, 
				kel: []
			};
      
			const aidCurrent = 'B' + eos.invoke('learn-ssi-keri-util-bytes-to-base64-url', keyPairCurrent.getPublic('bytes'));
			const aidNext = 'B' + eos.invoke('learn-ssi-keri-util-bytes-to-base64-url', keyPairNext.getPublic('bytes'));

      		// digest for next key commitment
      		const aidNextBytes = strToBytes(aidNext);
			const aidNextDigest = sha256Base64Url(aidNextBytes);

			state.controller =
			{ 
				current:
				{
					keyPair: keyPairCurrent,
					aid: aidCurrent
				},
				next:
				{
					keyPair: keyPairNext,
					aid: aidNext
				}
			};

			let keriInceptionEvent =
			{
				v: "KERI10JSON0000fb_", // toy version string
				t: "icp",
				s: "0",
				kt: "1",   // key threshold
				k: [aidCurrent],
				nt: "1",   // next key threshold
				n: aidNextDigest,
				p: "",     // prior event SAID (none for inception)
				dt: new Date().toISOString()
			};

			const keriInceptionEventCanon = canonicaliseEvent(keriInceptionEvent);
			const bytes = strToBytes(keriInceptionEventCanon);

			// Simplified SAID: "E" + base64url(sha256(canonical_event_without_d))
			keriInceptionEvent.d = 'E' + sha256Base64Url(bytes);

			console.log('KERI Inception Event:', keriInceptionEvent);

			eos.set(
			{
				scope: 'learn-ssi-keri',
				context: 'keri-inception-event',
				value: keriInceptionEvent
			});

			state.kel.push(keriInceptionEvent);

			eos.set(
			{
				scope: 'learn-ssi-keri',
				context: 'state',
				value: state
			});

			const keriInceptionEventFormatted = JSON.stringify(keriInceptionEvent, null, 2)

			let learnSSIView = eos.view();

			learnSSIView.add(
			[
				'<div style="background-color:rgba(0,0,0,0.7); border-radius: 6px; padding:16px;" class="w-md-100 mt-2 mb-4">',
					'<h4 class="fw-bold mb-3 mt-1">Step 5 | ', cryptoCurve, ' Private Key Signature of SHA256 Hash of the Data</h4>',
					'<div class="" style="color:#e8d5cf;">KERI Inception Event</div>',
					'<div style="font-family: PT Mono, monospace; font-size: 1rem; color:#baadab; word-break: break-all;" class="mb-1">',
						keriInceptionEventFormatted,
					'</div>',
                '</div>',
				'<button type="button" class="btn btn-sm btn-outline-primary text-light entityos-click mb-2"',
					' data-controller="learn-ssi-keri-create-event-rotation-view" style="width: 200px;">',
					'Rotate',
				'</button>',
				'<div id="learn-ssi-keri-create-event-rotation-view"></div>'
			]);

			learnSSIView.render('#learn-ssi-keri-create-event-inception-view');
		}
	},
	{
		name: 'learn-ssi-keri-create-event-rotation',
		code: function ()
		{
			// ---- UTILS

			function strToBytes(str)
			{
				return new TextEncoder().encode(str);
				}

			function sha256Base64Url(bytes)
			{
				// bytes: Uint8Array
				const wordArray = CryptoJS.lib.WordArray.create(bytes);
				const hash = CryptoJS.SHA256(wordArray);                 // WordArray
				const b64 = CryptoJS.enc.Base64.stringify(hash);         // base64

				// convert base64 -> base64url
				return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
			}

			// Canonicalise event: stable key ordering, drop 'd' when computing SAID
			function canonicaliseEvent(ev)
			{
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

			// ------ MAIN

			const data = eos.get(
			{
				scope: 'learn-ssi-keri'
			});

			console.log(data);

			const cryptoCurve = eos.get(
			{
				scope: 'learn-ssi-keri-create-aid',
				context: 'curve',
				valueDefault: 'ed25519'
			});

			const ec = new elliptic.ec(cryptoCurve);
			const keyPairNext = ec.genKeyPair();

			const state = eos.get(
			{
				scope: 'learn-ssi-keri',
				context: 'state',
				valueDefault: {
					controller: null, // { current: {pub, sec}, next: {pub, sec} }
					kel: []           // [{ t, s, k, n, p?, d }]
				}
			});

			const keyPairCurrent = state.controller.next.publicKey;
			const aidCurrent = state.controller.next.aid;
      
			const aidNext = 'B' + eos.invoke('learn-ssi-keri-util-bytes-to-base64-url', keyPairNext.getPublic('bytes'));

			state.controller =
			{ 
				current:
				{
					keyPair: keyPairCurrent,
					aid: aidCurrent
				},
				next:
				{
					keyPair: keyPairNext,
					aid: aidNext
				}
			};

      		// digest for next key commitment
      		const aidNextBytes = strToBytes(aidNext);
			const aidNextDigest = sha256Base64Url(aidNextBytes);

			const seq = String(state.kel.length);
			const prevEv = state.kel[state.kel.length - 1];

			let keriRotationEvent =
			{
				v: "KERI10JSON0000fb_", // toy version string
				t: "rot",
				s: seq,
				kt: "1",   // key threshold
				k: [aidCurrent],
				nt: "1",   // next key threshold
				n: aidNextDigest,
				p: prevEv.d,     // prior event SAID (none for inception)
				dt: new Date().toISOString()
			};

			const keriRotationEventCanon = canonicaliseEvent(keriRotationEvent);
			const bytes = strToBytes(keriRotationEventCanon);

			// Simplified SAID: "E" + base64url(sha256(canonical_event_without_d))
			keriRotationEvent.d = 'E' + sha256Base64Url(bytes);

			console.log('KERI Rotation Event:', keriRotationEvent);

			eos.set(
			{
				scope: 'learn-ssi-keri',
				context: 'keri-rotation-event',
				name: seq,
				value: keriRotationEvent
			});

			state.kel.push(keriRotationEvent);

			eos.set(
			{
				scope: 'learn-ssi-keri',
				context: 'state',
				value: state
			});

			console.log(state)

			const keriRotationEventFormatted = JSON.stringify(keriRotationEvent, null, 2)

			let learnSSIView = eos.view();

			learnSSIView.add(
			[
				'<div style="background-color:rgba(0,0,0,0.7); border-radius: 6px; padding:16px;" class="w-md-100 mt-2 mb-4">',
					'<h4 class="fw-bold mb-3 mt-1">Step 6 | Rotation </h4>',
					'<div class="" style="color:#e8d5cf;">KERI Rotation Event</div>',
					'<div style="font-family: PT Mono, monospace; font-size: 1rem; color:#baadab; word-break: break-all;" class="mb-1">',
						keriRotationEventFormatted,
					'</div>',
                '</div>',
				'<button type="button" class="btn btn-sm btn-outline-primary text-light entityos-click mb-2"',
					' data-controller="learn-ssi-keri-create-event-rotation-view" style="width: 200px;">',
					'Rotate',
				'</button>',
				'<div id="learn-ssi-keri-create-acdc-view"></div>'
			]);

			learnSSIView.render('#learn-ssi-keri-create-event-rotation-view');
		}
	},
	{
		name: 'learn-ssi-keri-create-event-delegation',
		code: function ()
		{
			// ---- UTILS

			function strToBytes(str)
			{
				return new TextEncoder().encode(str);
			}

			function sha256Base64Url(bytes)
			{
				// bytes: Uint8Array
				const wordArray = CryptoJS.lib.WordArray.create(bytes);
				const hash = CryptoJS.SHA256(wordArray);                 // WordArray
				const b64 = CryptoJS.enc.Base64.stringify(hash);         // base64

				// convert base64 -> base64url
				return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
			}

			// Canonicalise event: stable key ordering, drop 'd' when computing SAID
			function canonicaliseEvent(ev)
			{
				// Deep copy without 'd'
				const clone = JSON.parse(JSON.stringify(ev));
				delete clone.d;

				function sortKeys(obj)
				{
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

			// ------ MAIN

			const data = eos.get(
			{
				scope: 'learn-ssi-keri'
			});

			console.log(data);

			const cryptoCurve = eos.get(
			{
				scope: 'learn-ssi-keri-create-aid',
				context: 'curve',
				valueDefault: 'ed25519'
			});

			// root controller

			const state = eos.get(
			{
				scope: 'learn-ssi-keri',
				context: 'state',
				valueDefault: {
					controller: null,
					kel: []
				}
			});

			const keriRoot = state.controller.current;

			const ec = new elliptic.ec(cryptoCurve);
			const keyPairDelegate = ec.genKeyPair();
			const aidDelegate = 'B' + eos.invoke('learn-ssi-keri-util-bytes-to-base64-url', keyPairDelegate.getPublic('bytes'));

			const role = 'issuer';

			const keriDelegationEvent = {
				v: "KERI10JSON0000fb_",
				t: "del",
				dt: new Date().toISOString(),
				root: keriRoot.aid,
				delegate: aidDelegate,
				role: role
			};

			const keriDelegationEventCanon = canonicaliseEvent(keriDelegationEvent);
			const keriDelegationEventCanonBytes = strToBytes(keriDelegationEventCanon);

			keriDelegationEvent.d = 'E' + sha256Base64Url(keriDelegationEventCanonBytes);

			const dataToSign = strToBytes(keriDelegationEvent.d);

			//const keyPair = ec.keyFromPrivate(data['private-key-hex']);
			const keriDelegationEventSignatureBytes = keriRoot.keyPair.sign(dataToSign, { canonical: true });
			// Use canonical for better compatibility

			const keriDelegationEventSignatureBase64 = eos.invoke('learn-ssi-keri-util-bytes-to-base64-url', keriDelegationEventSignatureBytes)

			keriDelegationEvent.sig =
			{
				alg: "Ed25519",
				by: keriRoot.aid,
				s: keriDelegationEventSignatureBase64
			}

			// populate d: later
			// s: populated later (base64url signature)

			state.delegation = {
				root: keriRoot,
				delegate:
				{
					keyPair: keyPairDelegate,
					aid: aidDelegate
				},
				event:
				{
					obj: keriDelegationEvent,
					said: keriDelegationEvent.d,
					signature: keriDelegationEventSignatureBase64
				}    
			};

			console.log('KERI Delegation Event:', keriDelegationEvent);

			eos.set(
			{
				scope: 'learn-ssi-keri',
				context: 'keri-delegation-event',
				value: keriDelegationEvent
			});

			eos.set(
			{
				scope: 'learn-ssi-keri',
				context: 'state',
				value: state
			});

			console.log(state)

			/*let learnSSIView = eos.view();

			learnSSIView.add(
			[
				'<div style="background-color:rgba(0,0,0,0.7); border-radius: 6px; padding:16px;" class="w-md-100 mt-2 mb-4">',
					'<h4 class="fw-bold mb-3 mt-1">Step 5 | ', cryptoCurve, ' Private Key Signature of SHA256 Hash of the Data</h4>',
					'<div class="" style="color:#e8d5cf;">KERI Inception Event</div>',
					'<div style="font-family: PT Mono, monospace; font-size: 1rem; color:#baadab; word-break: break-all;" class="mb-1">',
						keriInceptionEvent,
					'</div>',
                '</div>',
				'<button type="button" class="btn btn-sm btn-outline-primary text-light entityos-click mb-2"',
					' data-controller="learn-ssi-keri-verify-signature" style="width: 200px;">',
					'Rotate',
				'</button>',
				'<div id="learn-ssi-keri-verify-signature-view"></div>'
			]);

			learnSSIView.render('#learn-ssi-keri-create-signature-view')
			*/
		}
	},
	{
		name: 'learn-ssi-keri-create-acdc',
		code: function ()
		{
			function computeSAID(obj) {
				// Create a copy with 'd' field as placeholder
				const copy = { ...obj, d: '' };

				// Serialize in canonical form (sorted keys)
				const canonical = JSON.stringify(copy, Object.keys(copy).sort());

				// Hash with SHA-256
				const hash = entityos._util.protect.hash({data: canonical}).dataHashed;

				// Return as base64url with SAID prefix
				return 'E' + hash.toString('base64url');
			}
		
			const state = eos.get(
			{
				scope: 'learn-ssi-keri',
				context: 'state',
				valueDefault: {}
			});

			// issuerAID, subjectAID, schema, attributes, privateKey

			const uuid = eos.invoke('learn-ssi-keri-util-bytes-to-base64-url', crypto.getRandomValues(new Uint8Array(16)));

			const keriIssuer = state.controller.current;

			function createSchema(schemaContent)
			{
				const schema = {
					v: 'ACDC10JSON000000_',
					d: '',
					t: 'sch',              // Schema type
					...schemaContent
				};
				
				schema.d = computeSAID(schema);
				
				// Update size
				const schemaJson = JSON.stringify(schema);
				const size = new TextEncoder().encode(schemaJson).length;
				const sizeHex = size.toString(16).padStart(6, '0');
				schema.v = 'ACDC10JSON' + sizeHex + '_';
				
				schema.d = computeSAID(schema);
				
				return schema;
			}

			// TO DO - example using skillzeb.io

			const keriSchema = createSchema(
			{
				title: 'Digital Badge',
				description: 'A credential for completing a course',
				properties:
				{
					name: { type: 'string' },
					course: { type: 'string' },
					completionDate: { type: 'string', format: 'date' },
					score: { type: 'number', minimum: 0, maximum: 100 }
				},
				required: ['name', 'course', 'completionDate']
			});

			// Subject

			const cryptoCurve = eos.get(
			{
				scope: 'learn-ssi-keri-create-aid',
				context: 'curve',
				valueDefault: 'ed25519'
			});

			const ec = new elliptic.ec(cryptoCurve);
			const keyPairSubject = ec.genKeyPair();
			const aidSubject = 'B' + eos.invoke('learn-ssi-keri-util-bytes-to-base64-url', keyPairSubject.getPublic('bytes'));


			// Build in insertion order (important conceptually).  [oai_citation:6‡trustoverip.github.io](https://trustoverip.github.io/kswg-acdc-specification/)
			let acdc = {};
			acdc.v = "ACDC10JSON000000_"; // demo version string shape
			acdc.t = "acm";              // ACDC message type (common)	
			acdc.u = uuid;             // UUID salty nonce (optional field)  [oai_citation:7‡trustoverip.github.io](https://trustoverip.github.io/kswg-acdc-specification/)
			acdc.i = keriIssuer.aid;          // Issuer AID  [oai_citation:8‡trustoverip.github.io](https://trustoverip.github.io/kswg-acdc-specification/)
			acdc.s = keriSchema.d;         // Schema SAID  [oai_citation:9‡trustoverip.github.io](https://trustoverip.github.io/kswg-acdc-specification/)
			acdc.d = "";                 // SAID inserted below

			// Attributes block (a) can be block or SAID. We use block.  [oai_citation:10‡trustoverip.github.io](https://trustoverip.github.io/kswg-acdc-specification/)
			acdc.a = {
				// reserved 'i' may appear nested as an identifier (issuee/subject)  [oai_citation:11‡trustoverip.github.io](https://trustoverip.github.io/kswg-acdc-specification/)
				i: aidSubject,
				role: "member",
				level: "gold",
				issuedAt: new Date().toISOString().slice(0, 10)
			};

			acdc.d = computeSAID(acdc);

			const acdcJson = JSON.stringify(acdc);
			const size = new TextEncoder().encode(acdcJson).length;
			const sizeHex = size.toString(16).padStart(6, '0');
			acdc.v = 'ACDC10JSON' + sizeHex + '_';
			
			// Recompute SAID with correct version
			acdc.d = computeSAID(acdc);

			const dataToSign = strToBytes(acdc.d);

			const keriACDCSignatureBytes = keriIssuer.keyPair.sign(dataToSign, { canonical: true });
			// Use canonical for better compatibility

			const keriACDCSignatureBase64 = eos.invoke('learn-ssi-keri-util-bytes-to-base64-url', keriACDCSignatureBytes)

			acdc.sig =
			{
				alg: "Ed25519",
				by: keriIssuer.aid,
				s: keriACDCSignatureBase64
			}

			console.log('KERI ACDC:', acdc);

			state.acdc = acdc;

			eos.set(
			{
				scope: 'learn-ssi-keri',
				context: 'state',
				value: state
			});

			const acdcFormatted = JSON.stringify(acdc, null, 2)

			let learnSSIView = eos.view();

			learnSSIView.add(
			[
				'<div style="background-color:rgba(0,0,0,0.7); border-radius: 6px; padding:16px;" class="w-md-100 mt-2 mb-4">',
					'<h4 class="fw-bold mb-3 mt-1">Step 7 | Authentic Chained Data Container (ACDC)</h4>',
					'<div class="" style="color:#e8d5cf;">KERI ACDC</div>',
					'<div style="font-family: PT Mono, monospace; font-size: 1rem; color:#baadab; word-break: break-all;" class="mb-1">',
						acdcFormatted,
					'</div>',
                '</div>',
				'<button type="button" class="d-none btn btn-sm btn-outline-primary text-light entityos-click mb-2"',
					' data-controller="learn-ssi-keri-xxx-view" style="width: 200px;">',
					'xxx',
				'</button>',
				'<div id="learn-ssi-keri-xxx-view"></div>'
			]);

			learnSSIView.render('#learn-ssi-keri-create-event-acdc-view');
		}
	}
]);

$(function ()
{
	eos.invoke('learn-ssi-keri-init');
});
