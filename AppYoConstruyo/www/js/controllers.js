angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.capitulos = [
    { title: 'Introducción', id: 1, image: 'header.png', link: 'introduccion'},
    { title: 'Cimentación', id: 2, image: 'cimentacion.png', link: 'cimentacion' },
    { title: 'Muros', id: 3, image: 'muros.png', link: 'muros' },
    { title: 'Cerramientos y vanos', id: 4, image: 'cerramientos.png', link: 'cerramientos' },
    { title: 'Losas', id: 5, image: 'losas.png' },
    { title: 'Azotea', id: 6, image: 'azotea.png' },
    { title: 'Acabados', id: 7, image: 'acabados.png'}
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('TemasCtrl', function($scope) {
  $scope.temas = [
    { title: 'Diseño', capId: 1, id: 1},
    { title: 'Sostenibilidad', capId: 1, id: 2},
    { title: 'Terreno', capId: 1, id: 3},
    { title: 'Clima', capId: 1, id: 4},
    { title: 'Materiales', capId: 2, id: 5}
  ];
});
