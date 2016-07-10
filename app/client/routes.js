// configure
BlazeLayout.setRoot('body');

FlowRouter.notFound = {
    action: function() {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'layout_notFound'
        });
    }
};

// redirect on start to dahsboard on file protocol
if(location.origin === 'file://') {
    FlowRouter.wait();
    FlowRouter.initialize({hashbang: true});

    Meteor.startup(function() {
        FlowRouter.go('view1');
    });
}


FlowRouter.triggers.enter([function(){
    EthElements.Modal.hide();
    $(window).scrollTop(0);
}]);



// ROUTES

/**
The receive route, showing the wallet overview

@method view1
*/
FlowRouter.route('/', {
    name: 'view1',
    action: function(params, queryParams) {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_view1'
        });
    }
});


/**
The send route.

@method send
*/
FlowRouter.route('/view1', {
    name: 'view1',
    action: function(params, queryParams) {
        BlazeLayout.render('layout_main', {
          header: 'layout_header',
          main: 'views_view1'
        });
    }
});

/**
The Coins route.

@method tokens
*/
FlowRouter.route('/view2', {
    name: 'view2',
    action: function(params, queryParams) {
        BlazeLayout.render('layout_main', {
          header: 'layout_header',
          main: 'views_view2'
        });
    }
});

/**
The Admin route.

@method tokens
*/
FlowRouter.route('/admin', {
    name: 'admin',
    action: function(params, queryParams) {
        BlazeLayout.render('layout_main', {
          header: 'layout_header',
          main: 'views_admin'
        });
    }
});

/**
The Admin route.

@method tokens
*/
FlowRouter.route('/userEdit', {
    name: 'userEdit',
    action: function(params, queryParams) {
        BlazeLayout.render('layout_main', {
          header: 'layout_header',
          main: 'views_userEdit'
        });
    }
});


/**
The Coins route.

@method tokens
*/
FlowRouter.route('/contracts', {
    name: 'contracts',
    action: function(params, queryParams) {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_view1'
        });
    }
});



/**
The send route.

@method send
*/
FlowRouter.route('/send/:address', {
    name: 'sendTo',
    action: function(params, queryParams) {
        BlazeLayout.render('layout_main', {
          header: 'layout_header',
          main: 'views_view2'
        });
    }
});

/**
The send route.

@method send
*/
FlowRouter.route('/send-from/:from', {
    name: 'sendFrom',
    action: function(params, queryParams) {
        BlazeLayout.render('layout_main', {
          header: 'layout_header',
          main: 'views_view2'
        });
    }
});

/**
The send route.

@method send
*/
FlowRouter.route('/send-token/:from/:token', {
    name: 'sendToken',
    action: function(params, queryParams) {
        BlazeLayout.render('layout_main', {
          header: 'layout_header',
          main: 'views_view2'
        });
    }
});


/**
The send route.

@method send
*/
FlowRouter.route('/deploy-contract', {
    name: 'deployContract',
    action: function(params, queryParams) {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_view2',
            data: {
                deployContract: true
            }
        });
    }
});


/**
The create account route.

@method send
*/
FlowRouter.route('/account/new', {
    name: 'createAccount',
    action: function(params, queryParams) {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_view1'
        });
    }
});



/**
The account route.

@method send
*/
FlowRouter.route('/account/:address', {
    name: 'account',
    action: function(params, queryParams) {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_view1'
        });
    }
});
