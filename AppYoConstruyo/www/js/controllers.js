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

  $ionicModal.fromTemplateUrl('templates/ejercicio.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalB = modal;
  });

  $scope.closeEjercicio = function() {
    $scope.modalB.hide();
  };

  // Open the login modal
  $scope.ejercicio = function() {
    $scope.modalB.show();
  };

  $scope.doCheck = function() {
    console.log('Doing login', $scope.loginData);

    $scope.closeEjercicio();
    $scope.resultado();
    /*
    $timeout(function() {
      $scope.closeEjercicio();
      $scope.resultado();
    }, 1000);*/
  };

  $ionicModal.fromTemplateUrl('templates/resultado.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalC = modal;
  });

  $scope.closeResultado = function() {
    $scope.modalC.hide();
  };

  // Open the login modal
  $scope.resultado = function() {
    $scope.modalC.show();
  };

})

.controller('CapitulosCtrl', function($scope) {
  $scope.capitulos = [
    { title: 'Introducción', id: 1, image: 'header.png', link: 'introduccion'},
    { title: 'Cimentación', id: 2, image: 'cimentacion.png', link: 'cimentacion' },
    { title: 'Muros', id: 3, image: 'muros.png', link: 'muros.html' },
    { title: 'Cerramientos y vanos', id: 4, image: 'cerramientos.png', link: 'cerramientos.html' },
    { title: 'Losas', id: 5, image: 'losas.png', link: 'losas.html' },
    { title: 'Azotea', id: 6, image: 'azotea.png', link: 'azotea.html' },
    { title: 'Acabados', id: 7, image: 'acabados.png', link: 'acabados.html'}
  ];
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
