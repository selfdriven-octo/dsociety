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
            
			console.log('Create DID.');
			console.log('secp256k1 Key Pair:')

            const ec = new elliptic.ec('secp256k1');

            // Generate a new key pair
            const key = ec.genKeyPair();

            const publicKey = key.getPublic('hex');
            const privateKey = key.getPrivate('hex');

            console.log('Public Key:', publicKey);
            console.log('Private Key:', privateKey);

            var learnSSIView = eos.view();

            learnSSIView.add(
            [
                '<div style="background-color:rgba(0,0,0,0.7); border-radius: 6px; padding:16px;" class="mx-auto w-md-75 mt-6">',
                    '<h4 class="fw-bold text-secondary mb-3 mt-1" style="color:#ff943d;">Step 1 | Create secp256k1 Keys</h4>',
                    '<div class="text-center" style="font-family: PT Mono, monospace; font-size: 1.4rem; color:#e8d5cf;">Public Key</div>',
                    '<div style="font-family: PT Mono, monospace; font-size: 1rem; color:#baadab; word-break: break-all;" class="text-center mb-1">',
                        publicKey,
                    '</div>',
                    '<div class="text-center mt-4" style="font-family: PT Mono, monospace; font-size: 1.4rem; color:#e8d5cf;">Private Key</div>',
                    '<div style="font-family: PT Mono, monospace; font-size: 1rem; color:#baadab; word-break: break-all;" class="fw-bold text-center mb-1">',
                        privateKey,
                    '</div>'
            ]);

            learnSSIView.add('</div>');

            learnSSIView.render('#learn-view')

			//eos.invoke('learn-ssi-init-cardano');
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
