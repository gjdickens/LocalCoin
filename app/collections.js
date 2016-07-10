
// Basic (local) collections, which will be observed by whisper (see whisperConnection.js)
// we use {connection: null} to prevent them from syncing with our not existing Meteor server


// Contains linked user accounts
userAccounts = new Mongo.Collection('userAccounts');



if(Meteor.isServer) {

  Meteor.publish('userAccounts', function() {
    return userAccounts.find({});
  });



  userAccounts.allow({
    insert: function () {
      return true;
    },
    update: function () {
      return true;
    },
//Only for Development TO REMOVE
    remove: function () {
      return true;
    }
});

}
