// Set the default unit to ether
if(!LocalStore.get('etherUnit'))
    LocalStore.set('etherUnit', 'ether');


// Set Session default values for components
if (Meteor.isClient) {
	Session.setDefault('balance', '0');
}

Meteor.startup(function() {
    // set providor, which should be a geth node
    // my RPC settings are:
    // geth --rpc --rpcaddr="0.0.0.0" --rpccorsdomain="*" --mine --unlock=YOUR_ACCOUNT --verbosity=5 --maxpeers=0 --minerthreads="3"
    if(!web3.currentProvider)
        web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

    // Setup EthAccounts
    EthAccounts.init();

    // SET default language
    if(Cookie.get('TAPi18next')) {
        TAPi18n.setLanguage(Cookie.get('TAPi18next'));
    } else {
        var userLang = navigator.language || navigator.userLanguage,
        availLang = TAPi18n.getLanguages();

        // set default language
        if (_.isObject(availLang) && availLang[userLang]) {
            TAPi18n.setLanguage(userLang);
            // lang = userLang;
        } else if (_.isObject(availLang) && availLang[userLang.substr(0,2)]) {
            TAPi18n.setLanguage(userLang.substr(0,2));
            // lang = userLang.substr(0,2);
        } else {
            TAPi18n.setLanguage('en');
            // lang = 'en';
        }
    }

    // Setup Moment and Numeral i18n support
    Tracker.autorun(function(){
        if(_.isString(TAPi18n.getLanguage())) {
            moment.locale(TAPi18n.getLanguage().substr(0,2));
            numeral.language(TAPi18n.getLanguage().substr(0,2));
        }
    });

	// Set Meta Title
	Meta.setTitle(TAPi18n.__("dapp.app.title"));
});




Meteor.Spinner.options = {
    lines: 17, // The number of lines to draw
    length: 0, // The length of each line
    width: 4, // The line thickness
    radius: 16, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#000', // #rgb or #rrggbb or array of colors
    speed: 1.7, // Rounds per second
    trail: 49, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 10, // The z-index (defaults to 2000000000)
    top: '50%', // Top position relative to parent
    left: '50%' // Left position relative to parent
};



// Stop app operation, when the node is syncing
web3.eth.isSyncing(function(error, syncing) {
    if(!error) {

        if(syncing === true) {
            console.time('nodeRestarted')
            console.log('Node started syncing, stopping app operation');
            web3.reset(true);

            // clear observers
            _.each(collectionObservers, function(observer) {
                if(observer)
                    observer.stop();
            });
            collectionObservers = [];


        } else if(_.isObject(syncing)) {

            syncing.progress = Math.floor(((syncing.currentBlock - syncing.startingBlock) / (syncing.highestBlock - syncing.startingBlock)) * 100);
            syncing.blockDiff = numeral(syncing.highestBlock - syncing.currentBlock).format('0,0');

            TemplateVar.setTo('header nav', 'syncing', syncing);

        } else {
            console.timeEnd('nodeRestarted')
            console.log('Restart app operation again');

            TemplateVar.setTo('header nav', 'syncing', false);

            // re-gain app operation
            connectToNode();
        }
    }
});


var connect = function(){

    if(web3.isConnected()) {

        // only start app operation, when the node is not syncing (or the eth_syncing property doesn't exists)
        web3.eth.getSyncing(function(e, sync) {
            if(e || !sync)
                connectToNode();
        });

    } else {

        // make sure the modal is rendered after all routes are executed
        Meteor.setTimeout(function(){

            EthElements.Modal.question({
                text: new Spacebars.SafeString(TAPi18n.__('wallet.app.texts.connectionError' + (web3.admin ? 'Mist' : 'Browser'),
                    {node: gethRPC})),
                ok: function(){
                    Tracker.afterFlush(function(){
                        connect();
                    });
                }
            }, {
                closeable: false
            });

        }, 600);
    }
};
