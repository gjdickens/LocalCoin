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
var addAccount = function(e) {

		var address = this.$('input[name="address"]').val(),

		address = address.toLowerCase();

		if(web3.isAddress(address)) {
				userAccounts.insert({
						address: address,
						user: Meteor.userId()
				});

				console.log(address);
		}
		else {
			 console.log("Did not insert");
				};
		}





// when the template is rendered
Template["components_userAccounts"].onRendered(function(){
});

// template events
Template['components_userAccounts'].events({

	/**
	Click Add Token

	@event click a.create.account
	*/
	'click .dapp-block-button': function(e){
			e.preventDefault();

			addAccount();
	}

});

// template handlebar helper methods
Template['components_userAccounts'].helpers({

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

	'userAccounts': function () {
		return userAccounts.find({});
	},

	'click .delete': function(){

	}


});
