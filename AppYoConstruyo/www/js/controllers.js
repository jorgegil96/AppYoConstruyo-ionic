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

  // EJERCICIO DISEÑO
  $ionicModal.fromTemplateUrl('templates/ejercicio.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalB = modal;
  });
  $scope.closeEjercicio = function() {
    $scope.modalB.hide();
  };
  $scope.ejercicio = function() {
    $scope.modalB.show();
  };
  $scope.doCheck = function($result) {
    console.log($result);
    $scope.closeEjercicio();

    if ($result) {
      console.log("bieeeeen");
      $scope.resultado(true);
    } else {
      console.log("maaaaal");
      $scope.resultado(false);
    }
  };
  $ionicModal.fromTemplateUrl('templates/modulos/temas/introduccion/actividades/resultadoBien.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalResBien = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/introduccion/actividades/resultadoMal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalResMal = modal;
  });
  $scope.closeResultado = function() {
    $scope.modalResMal.hide();
    $scope.modalResBien.hide();
  };
  $scope.resultado = function($resultado) {
    if ($resultado)
      $scope.modalResBien.show();
    else
      $scope.modalResMal.show();
  };


  // EJERCICIO TERRENO
  $ionicModal.fromTemplateUrl('templates/modulos/temas/introduccion/actividades/ejTerreno.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalTerreno = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/introduccion/actividades/bienTerreno.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienTerreno = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/introduccion/actividades/malTerreno.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalTerreno = modal;
  });
  $scope.ejTerreno = function() {
    $scope.modalTerreno.show();
  };
  $scope.closeEjTerreno = function() {
    $scope.modalTerreno.hide();
  };
  $scope.checkEjTerreno = function($respuesta) {
    $scope.closeEjTerreno();

    if ($respuesta) {
      $scope.resultadoTerreno(true);
    } else {
      $scope.resultadoTerreno(false);
    }
  };
  $scope.resultadoTerreno = function($resultado) {
    if ($resultado)
      $scope.modalBienTerreno.show();
    else
      $scope.modalMalTerreno.show();
  };
  $scope.closeResTerreno = function() {
    $scope.modalMalTerreno.hide();
    $scope.modalBienTerreno.hide();
  };

  // EJERCICIO PROCESOS DE CONSTRUCCION SOSTENIBLE
  $ionicModal.fromTemplateUrl('templates/modulos/temas/introduccion/actividades/ejProcesos.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalProcesos = modal;
  });
  $scope.ejProcesos = function() {
    $scope.modalProcesos.show();
  };
  $scope.closeEjProcesos = function() {
    $scope.modalProcesos.hide();
  };
  $scope.checkEjProcesos = function($) {
    $scope.closeEjProcesos();
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
});
