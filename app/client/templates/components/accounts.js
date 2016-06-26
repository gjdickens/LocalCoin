/**
Template Controllers

@module Templates
*/

/**
The accounts template

@class [template] components_accounts
@constructor
*/

/**
Function to add tokens

@method addToken
*/
var addToken = function(e) {

		var address = $('.modals-add-token input[name="address"]').hasClass('dapp-error') ?
						'' : $('.modals-add-token input[name="address"]').val(),
				name = $('.modals-add-token input.name').val(),
				symbol = $('.modals-add-token input.symbol').val(),
				decimals = $('.modals-add-token input.decimals').val();

		address = address.toLowerCase();

		tokenId = Helpers.makeId('token', address);

		var msg = (Tokens.findOne(tokenId)!=undefined)?
				TAPi18n.__('wallet.tokens.editedToken', {token: name}) :
				TAPi18n.__('wallet.tokens.addedToken', {token: name}) ;

		if(web3.isAddress(address)) {
				Tokens.upsert(tokenId, {$set: {
						address: address,
						name: name,
						symbol: symbol,
						balances: {},
						decimals: Number(decimals || 0)
				}});

				// update balances from lib/ethereum/observeBlocks.js
				updateBalances();

				GlobalNotification.success({
					 content: msg,
					 duration: 2
				});
		} else {
			 GlobalNotification.warning({
					 content: TAPi18n.__('wallet.tokens.error.invalidAddress'),
					 duration: 2
				});
		}

};

// when the template is rendered
Template["components_accounts"].onRendered(function(){
});

// template events
Template['components_accounts'].events({

	/**
	Click Add Token

	@event click a.create.account
	*/
	'click .add-token': function(e){
			e.preventDefault();

			// Open a modal
			EthElements.Modal.question({
					template: 'views_modals_addToken',
					ok: addToken,
					cancel: true
			},{
					class: 'modals-add-token'
			});
	},
	/**
	Edit Token

	@event click .wallet-box.tokens
	*/
	'click .wallet-box.tokens': function(e){
			e.preventDefault();

			// Open a modal
			EthElements.Modal.question({
					template: 'views_modals_addToken',
					data: this,
					ok: addToken.bind(this),
					cancel: true
			},{
					class: 'modals-add-token'
			});

	}

});

// template handlebar helper methods
Template['components_accounts'].helpers({

	/**
	@method (tokens)
	*/
	'tokens': function(){
			return Tokens.find({}, {sort:{symbol:1}});
	},



/**
Function to add tokens

@method addToken
*/

'addToken': function(e) {

    var address = $('.modals-add-token input[name="address"]').hasClass('dapp-error') ?
            '' : $('.modals-add-token input[name="address"]').val(),
        name = $('.modals-add-token input.name').val(),
        symbol = $('.modals-add-token input.symbol').val(),
        decimals = $('.modals-add-token input.decimals').val();

    address = address.toLowerCase();

    tokenId = Helpers.makeId('token', address);

    var msg = (Tokens.findOne(tokenId)!=undefined)?
        TAPi18n.__('wallet.tokens.editedToken', {token: name}) :
        TAPi18n.__('wallet.tokens.addedToken', {token: name}) ;

    if(web3.isAddress(address)) {
        Tokens.upsert(tokenId, {$set: {
            address: address,
            name: name,
            symbol: symbol,
            balances: {},
            decimals: Number(decimals || 0)
        }});

        // update balances from lib/ethereum/observeBlocks.js
        updateBalances();

        GlobalNotification.success({
           content: msg,
           duration: 2
        });
    } else {
       GlobalNotification.warning({
           content: TAPi18n.__('wallet.tokens.error.invalidAddress'),
           duration: 2
        });
    }

},

/**
	Convert Wei to Ether Values
    @method (fromWei)
    */

	'fromWei': function(weiValue, type){
		return web3.fromWei(weiValue, type).toString(10);
	},


	/**
    Get Eth Accounts

    @method (accounts)
    */

	'accounts': function(){
		return EthAccounts.find({});
	},

	'click .delete': function(){

	}


});
