import { EntityOS } from '/js/entityos.module.class-1.0.0.js';

const eos = new EntityOS();

// dSOCIETY | LEARN-BY-EXAMPLE

// Getting a "foot-hold" on twith Self-Sovereign Identity (SSI) tech by creating a DID.

// Code is free to use.
// It is only provided as to aid learning .

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
		name: 'learn-ssi-keri-create-did',
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
				scope: 'learn-ssi',
				context: 'public-key-hex',
				value: publicKey
			});

			eos.set(
			{
				scope: 'learn-ssi',
				context: 'public-key-base64',
				value: publicKeyBase64
			});

			var learnSSIKERIView = eos.view();

			learnSSIView.add(
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
				aid,
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
					'<h4 class="fw-bold mb-3 mt-1">Step 3 | DID based on dSociety SSI Method Specification</h4>',
					'<div class="" style="color:#e8d5cf;">Automic ID (AID) | Public Key | Base64</div>',
					'<div style="font-family: PT Mono, monospace; font-size: 1rem; color:#baadab; word-break: break-all;" class="mb-1">',
						ssiKERIAID,
					'</div>',
					'<div class="mt-2" style="color:#e8d5cf;">AID Document</div>',
					'<div style="font-family: PT Mono, monospace; font-size: 1rem; color:#baadab; word-break: break-all;" class="mb-1">',
						'<pre>',
						ssiKERIAIDDocFormatted,
						'</pre>',
					'</div>',
                '</div>'
			]);

            // Create proof - hash the message and then sign/encrypt with aid

            learnSSIKERIView.add(
			[
				'<div style="background-color:rgba(0,0,0,0.7); border-radius: 6px; padding:16px;" class="w-md-100 mt-2 mb-4">',
					'<h4 class="fw-bold mb-3 mt-1">Step 4 | Hash & Sign Data (e.g. Verifiable Credential)</h4>',
					'<div class="mb-1">',
						'<textarea id="url-text" class="form-control entityos-text w-100 border border-info"',
                            ' style="height:180px;" data-scope="learn-ssi"',
                            ' data-context="data-to-sign"></textarea>',
                    '</div>',
                '</div>',
				'<button type="button" class="btn btn-sm btn-outline-primary text-light entityos-click mb-2"',
					' data-controller="learn-ssi-create-signature" style="width: 200px;">',
					'Create Signature',
				'</button>',
				'<div id="learn-ssi-create-signature-view"></div>'
			]);

			learnSSIKERIView.render('#learn-view')
		}
	}
]);

$(function ()
{
	eos.invoke('learn-ssi-init');
});
