/**
Template Controllers

@module Templates
*/

/**
The balance template

@class [template] components_balance
@constructor
*/




// when the template is rendered
Template['components_balance'].onRendered(function() {
    // get coinbase address
    var coinbase = web3.eth.coinbase;

    // balance update interval
    this.updateBalance = Meteor.setInterval(function() {
        // get the coinbase address balance
        web3.eth.getBalance(coinbase, function(err, result){

            // set global temp session balance with result
            Session.set("balance", String(result));
        });
    }, 1 * 1000);
});

// when the template is destroyed
Template['components_balance'].onDestroyed(function() {
    // clear the balance update interval
    Meteor.clearInterval(this.updateBalance);
});

Template['components_balance'].helpers({
    /**
    Get The Original Balance

    @method (watchBalance)
    */

    'watchBalance': function(){
		return web3.fromWei(Session.get('balance'), LocalStore.get('etherUnit')).toString(10);
    },



    /**
    Sums all token balances
    TODO need to improve way to set decimals

    @method (sumTokens)
    */


    'sumTokens': function () {
        var tokenBalance = 0;
        var tokens = this.tokens;
        var setDecimals;
        _.each(this.accounts, function(account){
            _.each(tokens, function(token){
              tokenBalance += Number(token.balances[account._id]);
              setDecimals = token.decimals;
            });
        });
        return Helpers.formatNumberByDecimals(tokenBalance, setDecimals);
      },


  	'accounts': function(){
  		return EthAccounts.find({}).fetch();
  	},

    'tokens': function(){
  			return Tokens.find({}, {sort:{symbol:1}}).fetch();
  	}

});
