import { EntityOS } from '/site/2152/entityos.module.class-1.0.0.js';

const eos = new EntityOS();

// dSOCIETY | LEARN-BY-EXAMPLE

// Getting a "foot-hold" on twith Self-Sovereign Identity (SSI) tech by creating a DID.

// Code is free to use.
// It is only provided as to aid learning .

eos.add(
[
	{
		name: 'learn-ssi-init',
		code: function ()
		{
			console.log('We have an opportunity to descentralise & rehumanise our society.');
			console.log('https://dsociety.io\n\n')
		}
	},
	{
		name: 'learn-ssi-create-did',
		code: function ()
		{
			//Examples:
			//https://github.com/IAMXID/did-spec-registries/tree/main/methods

			console.log('Step 1 | Create DID.');
			console.log('secp256k1 Key Pair:')

			const ec = new elliptic.ec('secp256k1');
			const key = ec.genKeyPair();

			const publicKey = key.getPublic('hex');
			const privateKey = key.getPrivate('hex');

			console.log('Public Key:', publicKey);
			console.log('Private Key:', privateKey);

			eos.set(
			{
				scope: 'learn-ssi',
				context: 'public-key-hex',
				value: publicKey
			});

			eos.set(
			{
				scope: 'learn-ssi',
				context: 'private-key-hex',
				value: privateKey
			});

			var learnSSIView = eos.view();

			learnSSIView.add(
			[
				'<div style="background-color:rgba(0,0,0,0.7); border-radius: 6px; padding:16px;" class="w-md-100 mt-2 mb-4">',
					'<h4 class="fw-bold mb-3 mt-1">Step 1 | Create secp256k1 Keys</h4>',
					'<div class="" style="color:#e8d5cf;">Public Key</div>',
					'<div style="font-family: PT Mono, monospace; font-size: 1rem; color:#baadab; word-break: break-all;" class="mb-1">',
						publicKey,
					'</div>',
					'<div class="mt-4" style="color:#e8d5cf;">Private Key</div>',
					'<div style="font-family: PT Mono, monospace; font-size: 1rem; color:#baadab; word-break: break-all;" class="mb-1">',
						privateKey,
					'</div>',
                '</div>'
			]);

            console.log('Step 2 | Create hash the public key as DID - HEX|64.');

            let publicKeyHash = entityos._util.protect.hash({data: publicKey}).dataHashed;

            console.log('Public Key Hash (SHA256):', publicKeyHash);

            learnSSIView.add(
			[
				'<div style="background-color:rgba(0,0,0,0.7); border-radius: 6px; padding:16px;" class="w-md-100 mt-4 mb-4">',
					'<h4 class="fw-bold mb-3 mt-1">Step 2 | Hash Public Key Using SHA256</h4>',
					'<div class="" style="color:#e8d5cf;">Public Key Hash</div>',
					'<div style="font-family: PT Mono, monospace; font-size: 1rem; color:#baadab; word-break: break-all;" class="mb-1">',
						publicKeyHash,
					'</div>',
                '</div>'
			]);

            console.log('DID:', 'did:dsociety:' + publicKeyHash);

            learnSSIView.add(
			[
				'<div style="background-color:rgba(0,0,0,0.7); border-radius: 6px; padding:16px;" class="w-md-100 mt-4 mb-4">',
					'<h4 class="fw-bold mb-3 mt-1">Step 3 | DID based on dSociety SSI Method Specification</h4>',
					'<div class="" style="color:#e8d5cf;">Decentralised ID</div>',
					'<div style="font-family: PT Mono, monospace; font-size: 1rem; color:#baadab; word-break: break-all;" class="mb-1">',
						'did:dsociety:' + publicKeyHash,
					'</div>',
                '</div>'
			]);

            // Create proof - hash the message and then sign/encrypt witn secp

            learnSSIView.add(
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


			learnSSIView.render('#learn-view')

			//eos.invoke('learn-ssi-init-cardano');
		}
	},
    {
		name: 'learn-ssi-create-signature',
		code: function ()
		{
			//https://gemini.google.com/app/75201dae7eb7dd05

			const data = eos.get(
			{
				scope: 'learn-ssi'
			});

			console.log(data);

			let dataHash = entityos._util.protect.hash({data: data['data-to-sign']}).dataHashed;

			const ec = new elliptic.ec('secp256k1');
			const keyPair = ec.keyFromPrivate(data['private-key-hex']);
			const signature = keyPair.sign(dataHash, { canonical: true }); // Use canonical for better compatibility

			eos.set(
			{
				scope: 'learn-ssi',
				context: 'signature',
				value: signature
			});

			console.log('Signature:', signature.toDER('hex')); // DER encoding for verification

			let learnSSIView = eos.view();

			learnSSIView.add(
			[
				'<div style="background-color:rgba(0,0,0,0.7); border-radius: 6px; padding:16px;" class="w-md-100 mt-2 mb-4">',
					'<h4 class="fw-bold mb-3 mt-1">Step 5 | secp256k1 Signature of SHA256 Hash of the Data</h4>',
					'<div class="" style="color:#e8d5cf;">Signature</div>',
					'<div style="font-family: PT Mono, monospace; font-size: 1rem; color:#baadab; word-break: break-all;" class="mb-1">',
						signature.toDER('hex'),
					'</div>',
                '</div>',
				'<button type="button" class="btn btn-sm btn-outline-primary text-light entityos-click mb-2"',
					' data-controller="learn-ssi-verify-signature" style="width: 200px;">',
					'Verify Signature',
				'</button>',
				'<div id="learn-ssi-verify-signature-view"></div>'
			]);

			learnSSIView.render('#learn-ssi-create-signature-view')
		}
	},
	 {
		name: 'learn-ssi-verify-signature',
		code: function ()
		{
			//https://gemini.google.com/app/75201dae7eb7dd05

			const data = eos.get(
			{
				scope: 'learn-ssi'
			});

			console.log(data);

			let dataHashed = entityos._util.protect.hash({data: data['data-to-sign']}).dataHashed;

			const ec = new elliptic.ec('secp256k1');

			 const keyBytes = new Uint8Array(data['public-key-hex'].match(/[\da-f]{2}/gi).map(byte => parseInt(byte, 16)));
            // Assuming the key format is correct, adjust based on your DER format
            const publicKey = ec.keyFromPublic(keyBytes, 'hex');
			const verified = ec.verify(dataHashed, data.signature, publicKey);

			console.log('Verified:', verified);

			let learnSSIView = eos.view();

			learnSSIView.add(
			[
				'<div style="background-color:rgba(0,0,0,0.7); border-radius: 6px; padding:16px;" class="w-md-100 mt-2 mb-4">',
					'<h4 class="fw-bold mb-3 mt-1">Step 6 | Verify Data with Signature & Public Key</h4>',
					'<div class="" style="color:#e8d5cf;">It will always verify in this learning example.</div>',
					'<div class="" style="color:#e8d5cf;">If you want to test it not verifying then change the data in Step 4 and then click Verify Signature.</div>',

					'<div style="font-family: PT Mono, monospace; font-size: 1rem; color:#baadab; word-break: break-all;" class="mb-1">',
						(verified?'Verified':'Not Verified'),
					'</div>',
                '</div>',
			]);

			learnSSIView.render('#learn-ssi-verify-signature-view')
		}
	},
    {
		name: 'learn-ssi-base58',
		code: function ()
		{
			//https://stackoverflow.com/questions/56073688/base58-javascript-implementation
			//https://gist.github.com/diafygi/90a3e80ca1c2793220e5/
			//https://www.browserling.com/tools/base58-encode
			var to_b58 = function(B,A){var d=[],s="",i,j,c,n;for(i in B){j=0,c=B[i];s+=c||s.length^i?"":1;while(j in d||c){n=d[j];n=n?n*256+c:c;c=n/58|0;d[j]=n%58;j++}}while(j--)s+=A[d[j]];return s};
			var from_b58 = function(S,A){var d=[],b=[],i,j,c,n;for(i in S){j=0,c=A.indexOf(S[i]);if(c<0)return undefined;c||b.length^i?i:b.push(0);while(j in d||c){n=d[j];n=n?n*58+c:c;c=n>>8;d[j]=n%256;j++}}while(j--)b.push(d[j]);return new Uint8Array(b)};
			var MAP = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
			var encoded = to_b58([1,183,12,45,131,11,153,200], MAP);
			console.log(encoded)
		}
	}
]);

$(function ()
{
	eos.invoke('learn-ssi-init');
});
