'use strict';

angular.module('myApp.contacts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', ['$scope','$firebaseArray',function($scope,$firebaseArray) {
  //console.log('contact controller loaded');
  var config={
    apiKey:"AIzaSyA4Gt9RuJEcg3iiGtUa908R7GlmyDWDIys",
    authDomain:"contactlist-angular-phoenix.firebaseapp.com",
    databaseURL:"https://contactlist-angular-phoenix.firebaseio.com/"
  };
  if (!firebase.apps.length) {
   firebase.initializeApp(config);
}
  //firebase.initializeApp(config);
  var rootRef=firebase.database().ref();
  $scope.contacts= $firebaseArray(rootRef);
    $scope.addFormShow=true;
    $scope.editFormShow=false;

  $scope.showEditForm=function (contact) {
    $scope.addFormShow=false;
    $scope.editFormShow=true;

    $scope.id=contact.$id;
    $scope.email=contact.email;
    $scope.name=contact.name;
    $scope.phone=contact.phone;
}
  $scope.addContacts=function () {
    console.log('ADding contact');
    $scope.contacts.$add({
      name: $scope.name,
      email: $scope.email,
      phone: $scope.phone
    }).then(function (rootRef) {
      var id = rootRef.key;
      console.log('Added Contact'+id);

      $scope.name='';
      $scope.email='';
      $scope.phone='';
    });
  }

  $scope.editContact=function () {
    var id= $scope.id;
    var record=$scope.contacts.$getRecord(id);

    record.name=$scope.name;
    record.email=$scope.email;
    record.phone=$scope.phone;
    $scope.contacts.$save(record).then(function (rootRef) {
      console.log(rootRef.key);
    });

    $scope.name='';
    $scope.email='';
    $scope.phone='';
  }
  $scope.removeContact = function (contact) {
    $scope.contacts.$remove(contact);
  }
}]);
