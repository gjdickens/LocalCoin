/**
Template Controllers

@module Templates
*/

/**
The accounts template

@class [template] components_accounts
@constructor
*/


// when the template is rendered
Template["components_accounts"].onRendered(function(){
});

// template events
Template['components_accounts'].events({

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
	Get Balance of a token

	@method (formattedCoinBalance)
	*/
	'formattedCoinBalance': function(e){
			var accountLevel = Template.parentData(1);
			var selectedAccount = Helpers.getAccountByAddress(accountLevel.address, true);

			return (this.balances && Number(this.balances[selectedAccount._id]) > 0)
					? Helpers.formatNumberByDecimals(this.balances[selectedAccount._id], this.decimals) +' '+ this.symbol
					: false;
	},
	/**


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
