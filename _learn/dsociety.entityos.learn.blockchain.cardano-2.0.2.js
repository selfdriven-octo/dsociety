import { EntityOS } from '/site/2152/entityos.module.class-1.0.0.js';
const eos = new EntityOS();

// dSOCIETY | LEARN-BY-EXAMPLE

// Getting a "foot-hold" on the Cardano tech by connecting to a wallet and querying on-chain data.

// Code is free to use.
// It is only provided as to aid learning about connecting to the Cardano blockchain/wallet.
// To that purpose it uses Javascript in its simplest form, so as to keep focus on the blockchain/wallet conceptual learning.
// Recommend using resources @ https://buildingoncardano.dev if plan to build a production-grade app.

// Each of the wallets have their own code files loaded into the browser
// They all expose the same functions (methods) based on the CIP-30 standard.
// In the example if you look at the wallet variable in the browser console you will see the methods. i.e. console.log(wallet)
// e.g. wallet.getBalance().then(function (walletData) {}) - walletData being the data returned by the wallet.

// The data is stored in the CBOR format - which is used to store data on Cardano and transfer it over http(s).
// This example code uses the entityOS import for some basic help functions to conver the data, so it can be used by the Javascript code.

eos.add(
[
	{
		name: 'learn-init',
		code: function ()
		{
			console.log('We have an opportunity to descentralise & rehumanise our society.');
			console.log('https://dsociety.io\n\n')
			eos.invoke('learn-init-cardano');
		}
	},
	{
		name: 'learn-init-cardano',
		code: function ()
		{
			// [1] Set up a standard set of wallets that work in the browser
			// https://www.cardanocube.io/collections/wallets for full list.

			console.log('## Browser wallets:')

			var cardanoData = window.cardano;
			if (cardanoData == undefined) { cardanoData = {} }

			var _cardano =
			{
				data: cardanoData,
				wallets:
				[
					{
						name: 'eternl',
						names: ['eternl', 'ccvault'],
						caption: 'Eternl'
					},
					{
						name: 'flint',
						caption: 'Flint'
					},
					{
						name: 'gerowallet',
						caption: 'Gero Wallet'
					},
					{
						name: 'nami',
						caption: 'Nami'
					},
					{
						name: 'nufi',
						caption: 'NuFi'
					},
					{
						name: 'typhoncip30',
						names: ['typhoncip30', 'typhon'],
						caption: 'Typhon'
					},
					{
						name: 'yoroi',
						caption: 'Yoroi'
					},
					{
						name: 'lace',
						caption: 'Lace'
					}
				]
			};

			// [2] Check for installed wallets by querying: window.cardano

			_.each(_cardano.wallets, function (_wallet)
			{
				_wallet.enabled = (_cardano.data[_wallet.name] != undefined)
			});

			// [3] Put in browser data for using later as required.

			eos.set(
			{
				scope: 'learn',
				context: 'cardano',
				value: _cardano
			});

			// [4] Reduce to set of wallets available in the this browser.

			var wallets = eos.set(
			{
				scope: 'learn',
				context: 'wallets',
				value: _.filter(_cardano.wallets, function (_wallet) { return _wallet.enabled })
			});

			console.log(_cardano);
			console.table(wallets);
			console.log('\n');

			// [5] Show wallets to user or not to install

			if (wallets.length == 0)
			{
				var learnView = eos.view()

				learnView.add(
					[
						'<div class="mt-6">',
						'<div class="fw-bold text-secondary" style="font-size:1.2rem;">There no wallets available to connect to, please install a wallet to continue.</div>',
						'<div class="mt-4"><a href="https://www.cardanowallets.io" target="_blank" style="font-size:1.2rem;">Cardano Wallets <i class="fe fe-external-link"></a></div>',
						'</div>'
					]);

				learnView.render('#learn-view');
			}
			else
			{
				var learnConnectWalletsView = eos.view()

				_.each(wallets, function (wallet)
				{
					learnConnectWalletsView.add(
						[
							'<div class="text-center">',
							'<a href="#" class="entityos-click" style="color:#fff !important;"',
							' data-name="', wallet.name, '"',
							' data-controller="learn-wallet-connect" data-context="wallet" data-scope="learn-wallet-connect">',
							wallet.caption,
							'</a>',
							'</div>'
						]);
				});

				$('#learn-connect').removeClass('disabled').popover(
				{
					content: learnConnectWalletsView.get(),
					html: true,
					placement: 'bottom',
					template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><div class="popover-body"></div></div>',
					offset: [0, 10],
					sanitize: false
				}).on('show.bs.popover', function () {
					$('#learn-view').html('');
				});

				$('#learn-view').html('<div class="mt-6" style="font-size: 1.2rem;"><div class="fw-bold text-secondary">Please connect to a Cardano wallet to continue.</div><div class="mt-2 text-secondary">Thank you, Turlia.</a>');
			}
		}
	},
	{
		name: 'learn-wallet-connect',
		code: function (param)
		{
			eos.invoke('util-view-popover-hide');

			console.log('## Store Wallet Name:')

			// [6] Get wallet name based on user selection.

			var walletName = entityos._util.param.get(param.dataContext, 'name').value;

			// [7] Set the wallet name in the local browser data, so can be used later.

			eos.set({ scope: 'learn', context: 'wallet-name', value: walletName });

			console.log(walletName);
			console.log('\n');

			// [8] Get the wallet assets.

			eos.invoke('learn-wallet-assets', param)
		}
	},
	{
		name: 'learn-wallet-assets',
		code: function (param)
		{
			console.log('## Get & Show Wallet Assets:')

			// [9] Get the stored walletName & set the button name

			var walletName = eos.get({ scope: 'learn', context: 'wallet-name' });

			var wallets = eos.get({ scope: 'learn', context: 'wallets' });

			var _wallet = _.find(wallets, function (wallet) { return wallet.name == walletName })
			if (_wallet != undefined)
			{
				$('#learn-connect').html(_wallet.caption)
			}

			eos.set(
			{
				scope: 'learn',
				context: '_wallet',
				value: _wallet
			});

			// [10] Get a wallet object i.e. with the functions that can use to interact with the wallet (see Dev Tools > Console)

			window.cardano[walletName].enable().then(function (wallet)
			{
				console.log(wallet);

				// [11] Run the getBalance function
				// It returns data in the Concise Binary Object Representation "CBOR" Hex format.
				// So if you look at it, it want make sense, which is why use entityos._util.hex.CBORtoArray to convert it!

				wallet.getBalance().then(function (dataAsCBORHex)
				{
					console.log('CBOR(Hex): ' + dataAsCBORHex)

					var data = entityos._util.hex.CBORtoArray(dataAsCBORHex);

					// [12] The base Cardano currency is a "lovelace". 1,000,000 lovelace = 1 ADA.
					// Named after Ada Lovelace the first programmer (female)

					// The lovelace (i.e. ADA) is stored in the first array position (index 0)
					// !! NOTE: If no other assets then it is not in an array it is the data value !!

					var lovelace;

					if (_.isArray(data))
					{
						lovelace = _.first(data)
					}
					else
					{
						lovelace = data;
					}

					console.log('- which decodes to:');
					console.log(parseInt(lovelace) + ' Lovelace / ' + parseInt(lovelace) / 1000000 + ' ADA\n\n');

					_wallet.assets =
					[
						{
							name: 'lovelace',
							amount: lovelace
						},
						{
							name: 'ada',
							amount: (parseInt(lovelace) / 1000000)
						}
					]

					// The other assets e.g. NFTs, Native-Tokens are stored in the 2nd array position (index 1)

					console.log('Other Digital Assets In The Wallet:');
					var otherAssets = data[1];
					console.log(otherAssets);

					var _otherAssets = {};

					// [13] Go through each of the other assets and decode their names using entityos._util.convert.charCodesToText function

					if (otherAssets != undefined)
					{
						_.each(otherAssets, function (otherAssetValue, otherAssetKey)
						{
							_.each(otherAssetValue, function (_otherAssetValue, _otherAssetKey) {
								_otherAssets[entityos._util.convert.charCodesToText(_otherAssetKey)] = _otherAssetValue;
							});
						});

						console.log('- which decodes to:');
						console.log(_otherAssets);
					}

					_.each(_otherAssets, function (value, key)
					{
						_wallet.assets.push(
						{
							name: key,
							amount: value
						});
					});

					eos.invoke('learn-wallet-transactions', param);
				});
			});
		}
	},
	{
		name: 'learn-wallet-transactions',
		code: function (param)
		{
			console.log('## Get & Show Wallet Transactions:')

			var _wallet = eos.get({scope: 'learn', context: '_wallet'});
         	var walletName = eos.get({ scope: 'learn', context: 'wallet-name' });
			
            window.cardano[walletName].enable().then(function (wallet)
            {
                console.log(wallet);

				var uxtos = [];
				_wallet._assets = [];
				
                wallet.getUtxos().then(function(dataAsCBORHex)
                {
                    console.log('UXTOs Data:')

					var _dataAsCBORHex = _.split(dataAsCBORHex, ',')
					console.log(_dataAsCBORHex);

					_.each(_dataAsCBORHex, function (__dataAsCBORHex)
					{
						var _uxto = {};

						var _data = _.split(__dataAsCBORHex, '8258390');
						console.log('-- Transaction:');

						var txID = _.replace(_.first(_data), '82825820', '')
						_uxto['id'] = _.join(_.slice(txID, 0, -2), '');

						console.log('#' + parseInt(_.join(_.slice(txID,-2), '')));
						_uxto['index'] = parseInt(_.join(_.slice(txID,-2), ''));

						var data = entityos._util.hex.CBORtoArray(__dataAsCBORHex);
						console.log('--')
						var dataTransaction = data[1][1];

						if (!_.isArray(dataTransaction))
						{
							console.log(dataTransaction);
							_uxto['assets'] = {cardano: {lovelace: dataTransaction}};
							_uxto['_assets'] = {name: 'lovelace', amount: numeral(dataTransaction).value(), tx: txID};
						}
						else
						{
							console.log(dataTransaction[0]);

							_uxto['_assets'] =
							[
								{
									name: 'lovelace',
									amount: numeral(dataTransaction[0]).value(),
									tx: txID
								}
							];

							_uxto['assets'] =
							{
								cardano: {lovelace: dataTransaction[0]}
							};

							 _.each(dataTransaction[1], function  (_transactionValue, _transactionKey)
                            {
								var _asset = {};
								const charCodes = _.split(_transactionKey, ',');
								const uint8Array = new Uint8Array(charCodes);

								console.log('chars:' + charCodes)
								// Convert Uint8Array to hex string
								let hexString = '';
								uint8Array.forEach((byte) => {
									hexString += byte.toString(16).padStart(2, '0');
								});

								dataTransaction[1][hexString] = _transactionValue;

								_uxto['assets'][hexString] = {};
								_asset['policy'] = hexString;

								_.each(dataTransaction[1][_transactionKey], function (_transactionValueValue, _transactionValueKey)
								{
									dataTransaction[1][_transactionKey][entityos._util.convert.charCodesToText(_transactionValueKey)] = _transactionValueValue;

									_uxto['assets'][hexString][entityos._util.convert.charCodesToText(_transactionValueKey)] = _transactionValueValue;

									_asset['name'] = entityos._util.convert.charCodesToText(_transactionValueKey);
									_asset['amount'] = numeral(_transactionValueValue).value();
									_asset['tx'] = txID;
								});

								_uxto['_assets'].push(_.clone(_asset));
                            });
						}

						uxtos.push(_uxto);

						_wallet._assets = _.concat(_wallet._assets, _uxto._assets)
					})
                   
					console.log(uxtos);

					_wallet.uxtos = uxtos;

					var assets = [];

					_.each(_wallet._assets, function (_walletAsset)
					{
						var _asset = _.find(assets, function (asset)
						{
							return (asset.name == _walletAsset.name &&
										asset.policy == _walletAsset.policy)
						});

						if (_asset == undefined)
						{
							assets.push(_walletAsset)
						}
						else
						{
							_asset.amount += _walletAsset.amount;
						}
					});

					eos.set(
					{
						scope: 'learn',
						context: 'assets',
						value: assets
					});

					eos.invoke('learn-wallet-network', param);
                });
            });
        }
	},
	{
		name: 'learn-wallet-network',
		code: function (param)
		{
			console.log('## Get & Show Wallet Network:')

			var _wallet = eos.get({scope: 'learn', context: '_wallet'});
        	var walletName = eos.get({ scope: 'learn', context: 'wallet-name' });

            window.cardano[walletName].enable().then(function (wallet)
            {
				wallet.getNetworkId().then(function(data)
				{
					console.log('NetworkID: ' + data);
					_wallet.networkID = data

					eos.invoke('learn-wallet-used-addresses', param);
				});
			});
		}
	},
	{
		name: 'learn-wallet-used-addresses',
		code: function (param)
		{
			console.log('## Get & Show Wallet Used Addresses:')

         	var _wallet = eos.get({scope: 'learn', context: '_wallet'});
         	var walletName = eos.get({ scope: 'learn', context: 'wallet-name' });

            window.cardano[walletName].enable().then(function (wallet)
            {
				wallet.getUsedAddresses().then(function(addressesData)
				{
					var _usedAddresses = [];

					_.each(addressesData, function (addressData)
					{
						console.log(addressData);

						var _usedAddress = typhonjs.utils.getAddressFromHex(addressData);

						var _usedAddressData = 
						{
							_data: _usedAddress
						}
						
						_usedAddressData.address = _usedAddressData._data.addressBech32;
						_usedAddresses.push(_usedAddressData);
					});

					console.log('Used Addresses:')
					console.log(_usedAddresses)

					_wallet.addresses = {used: _usedAddresses}

					eos.invoke('learn-wallet-reward-addresses', param)
				});
			});
		}
	},
	{
		name: 'learn-wallet-reward-addresses',
		code: function (param)
		{
			console.log('## Get & Show Wallet Reward Addresses:')

         	var _wallet = eos.get({scope: 'learn', context: '_wallet'});
         	var walletName = eos.get({ scope: 'learn', context: 'wallet-name' });

            window.cardano[walletName].enable().then(function (wallet)
            {
				wallet.getRewardAddresses().then(function(addressesData)
				{
					var _rewardAddresses = [];

					_.each(addressesData, function (addressData)
					{
						console.log(addressData);

						var _address = typhonjs.utils.getAddressFromHex(addressData);

						var _rewardAddressData = 
						{
							_data: _address
						}
						
						_rewardAddressData.address = _rewardAddressData._data.addressBech32;
						_rewardAddresses.push(_rewardAddressData);
					});

					console.log('Reward Addresses:')
					console.log(_rewardAddresses)

					_wallet.addresses = _.assign(_wallet.addresses, {reward: _rewardAddresses})

					eos.invoke('learn-wallet-change-address', param)
				});
			});
		}
	},
		{
		name: 'learn-wallet-change-address',
		code: function (param)
		{
			console.log('## Get & Show Wallet Change Address:')

         	var _wallet = eos.get({scope: 'learn', context: '_wallet'});
         	var walletName = eos.get({ scope: 'learn', context: 'wallet-name' });

            window.cardano[walletName].enable().then(function (wallet)
            {
				wallet.getChangeAddress().then(function(addressData)
				{
					console.log(addressData);

					var _address = typhonjs.utils.getAddressFromHex(addressData);

					var _changeAddressData = 
					{
						_data: _address
					}
					
					_changeAddressData.address = _changeAddressData._data.addressBech32;
				
					console.log('Change Address:')
					console.log(_changeAddressData)

					_wallet.addresses = _.assign(_wallet.addresses, {change: _changeAddressData})

					eos.invoke('learn-wallet-show', param)
				});
			});
		}
	},
	{
		name: 'learn-wallet-show',
		code: function (param)
		{
			var _wallet = eos.get({scope: 'learn', context: '_wallet'});
			var data = eos.get({scope: 'learn'});

			var learnWalletAssetsView = eos.view();

			var lovelace = _.find(data.assets, function (asset)
			{
				return asset.name == 'lovelace'
			});

			learnWalletAssetsView.add(
			[
				'<div style="background-color:rgba(0,0,0,0.7); border-radius: 6px; padding:16px;" class="w-md-75 mt-6">',
			]);

			if (_.has(data, '_wallet.addresses.reward'))
			{
				// Also referred to as Account Address
				_wallet.stakeAddress = _.first(data._wallet.addresses.reward).address;

				learnWalletAssetsView.add(
				[
					'<div style="font-family: PT Mono, monospace; font-size: 1.2rem;" class="mb-1 text-white">',
						_wallet.stakeAddress,
					'</div>'
				]);
			}

			if (_.has(data, '_wallet.addresses.change'))
			{
				// Also referred to as Account Address
				_wallet.changeAddress = data._wallet.addresses.change.address;

				learnWalletAssetsView.add(
				[
					'<div style="font-family: PT Mono, monospace; font-size: 1rem; word-break: break-all;" class="mb-1 text-muted">',
						'<a class="text-muted" href="https://cardanoscan.io/address/',
								 _wallet.changeAddress, '" target="_blank">', _wallet.changeAddress, '</a>',
					'</div>'
				]);
			}

			learnWalletAssetsView.add(
			[
				'<div style="font-family: PT Mono, monospace; font-size: 1.65rem; color:#ff943d;" class="fw-bold mb-1">',
				(parseInt(lovelace.amount) / 1000000), ' ADA',
				'</div>'
			]);

			var _otherAssets = _.filter(data.assets, function (asset)
			{
				return asset.name != 'lovelace'
			});

			var _otherAssetsOrdered = _.sortBy(_otherAssets, 'name');

			_.each(_otherAssetsOrdered, function (_otherAsset)
			{
				learnWalletAssetsView.add(
				[
					'<div class="mb-2">',
						'<div style="font-family: PT Mono, monospace; font-size: 1.2rem;" class="text-white">',
							'<span class="fw-bold">', _otherAsset.name, '</span> | ', _otherAsset.amount,
						'</div>',
						'<div class="text-muted small">',
							'Policy # <a class="text-muted" href="https://cardanoscan.io/tokenPolicy/',
								_otherAsset.policy, '" target="_blank">', _otherAsset.policy, '</a>',
									' <button id="learn-connect" type="button"',
										' class="ms-2 btn btn-outline-primary btn-sm entityos-click"',
										' data-controller="learn-wallet-sign-policy"',
										' data-policy="',  _otherAsset.policy, '"',
									'>',
										'<span class="text-white small fw-light">Sign</span>',
									'</button>',
						'</div>',
					'</div>'
				]);
			});

			learnWalletAssetsView.add('</div>');

			learnWalletAssetsView.add('<div id="learn-wallet-view"></div>');

			learnWalletAssetsView.render('#learn-view');

			//SIGN DATA

			var learnWalletView = eos.view();

			learnWalletView.add(
			[
				'<div class="card w-md-75 mt-6 shadow-lg border border-secondaey">',
					'<div class="card-body p-4">',
						'<div class="form-group">',
							'<div class="mb-2"><label class="fw-bold text-secondary" for="url-text">Enter Data to Sign</label>',
							'</div>',
							'<textarea id="learn-wallet-sign-data-text" class="form-control entityos-text w-100" style="height:140px;" data-scope="learn-cardano-wallet" data-context="sign-data-text"></textarea>',
						'</div>',
						'<button id="learn-connect" type="button" class="btn btn-outline-primary btn-sm entityos-click" data-controller="learn-wallet-sign-data">',
							'Sign Data',
						'</button>',
						'<div id="learn-wallet-sign-data-view"></div>',
					'</div>',
				'</div>'
			]);

			learnWalletView.render('#learn-wallet-view');
		}
	},
	{
		name: 'learn-wallet-sign-policy',
		code: function (param)
		{
			var policy = _.get(param.dataContext, 'policy');
			console.log(policy);
			$('#learn-wallet-sign-data-text').val(policy);
			eos.invoke('learn-wallet-sign-data',
			{
				dataToSign: policy
			})
		}
	},
	{
		name: 'learn-wallet-sign-data',
		code: function (param)
		{
			//https://www.npmjs.com/package/@cardano-foundation/cardano-verify-datasignature
			//Implementation: https://github.com/ibcom-lab/entityos-learn-blockchain

			var _wallet = eos.get({scope: 'learn', context: '_wallet'});
			var dataToSign = _.get(param, 'dataToSign');

			if (dataToSign == undefined)
			{
				dataToSign = eos.get(
				{
					scope: 'learn-cardano-wallet',
					context: 'sign-data-text'
				});
			}

			console.log('Data to Sign: ' + dataToSign);

			var walletName = eos.get({ scope: 'learn', context: 'wallet-name' });

			// Get a wallet object i.e. with the functions that can use to interact with the wallet (see Dev Tools > Console)

			window.cardano[walletName].enable().then(function (wallet)
			{
				wallet.getRewardAddresses().then(function (addresses)
				{
					console.log(addresses);
					var signingAddress = _.first(addresses);

					if (!_.isUndefined(signingAddress))
					{
						console.log(signingAddress);

						var dataToSignAsHex = entityos._util.hex.to(dataToSign);

						console.log('Data To Sign (Hex): ' + dataToSignAsHex);

						wallet.signData(signingAddress, dataToSignAsHex)
						.then(function (signedData)
						{
							signedData.address = _wallet.changeAddress;
							signedData.stakeAddress = _wallet.stakeAddress;
							signedData.data = dataToSign;
							signedData.dataAsHex = dataToSignAsHex;
							console.log('Signed Data with Associated Key:')
							console.log(signedData);
							console.log('Repo with example NodeJS code to verify the sign data:')
							console.log('https://github.com/ibcom-lab/entityos-learn-blockchain/blob/main/learn-verify-signed-data.js')

							eos.set(
							{
								scope: 'learn-cardano-wallet',
								context: 'signed-data',
								value: signedData
							});

							var learnWalletSignDataView = eos.view();

							learnWalletSignDataView.add(
							[
								'<div class="py-2">', JSON.stringify(signedData), '</div>'
							])

							learnWalletSignDataView.render('#learn-wallet-sign-data-view');
						},
						function(error)
						{
							console.log(error);
							var learnWalletSignDataView = eos.view();

							learnWalletSignDataView.add(
							[
								'<div class="py-2">', error.info, '</div>'
							])

							learnWalletSignDataView.render('#learn-wallet-sign-data-view');
						});
					}
				});
			});
		}
	}
]);

// .getChangeAddress(), .getUnusedAddresses(),
// .signTx(), .submitTx()

// Check out https://buildingoncardano.dev for lot's of Dev Resources, Tools etc!

// USING AS DATA STORE
// - Generate UUID using browser
// - Sign UUID using browser SignData to create Encryption Key
// - Save and Search for encrypted data in local storage using signedUUID as key

$(function () {
	//Just a little break to make sure all the wallets have finished initialising.
	entityos._util.factory.core();
	setTimeout(learnInit, 2000);
});

function learnInit()
{
	eos.invoke('learn-init');
}