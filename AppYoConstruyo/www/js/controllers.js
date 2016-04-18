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

  // EJERCICIO CLIMA
  $ionicModal.fromTemplateUrl('templates/modulos/temas/introduccion/actividades/ejClima.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalClima = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/introduccion/actividades/bienClima.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienClima = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/introduccion/actividades/malClima.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalClima = modal;
  });
  $scope.ejClima = function() {
    $scope.modalClima.show();
  };
  $scope.closeEjClima = function() {
    $scope.modalClima.hide();
  };
  $scope.checkEjClima = function($respuesta) {
    $scope.closeEjClima();

    if ($respuesta)
      $scope.modalBienClima.show();
    else
      $scope.modalMalClima.show();
  };
  $scope.closeResClima = function() {
    $scope.modalMalClima.hide();
    $scope.modalBienClima.hide();
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
  $scope.checkEjProcesos = function() {
    $scope.closeEjProcesos();
  };


  // EJERCICIO ARMADOS
  $ionicModal.fromTemplateUrl('templates/modulos/temas/introduccion/actividades/ejArmados.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalArmados = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/introduccion/actividades/bienArmados.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienArmados = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/introduccion/actividades/malArmados.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalArmados = modal;
  });
  $scope.ejArmados = function() {
    $scope.modalArmados.show();
  };
  $scope.closeEjArmados = function() {
    $scope.modalArmados.hide();
  };
  $scope.checkEjArmados = function($respuesta) {
    $scope.closeEjArmados();

    if ($respuesta)
      $scope.modalBienArmados.show();
    else
      $scope.modalMalArmados.show();
  };
  $scope.closeResArmados = function() {
    $scope.modalMalArmados.hide();
    $scope.modalBienArmados.hide();
  };



  // EJERCICIO CASTILLOS
  $ionicModal.fromTemplateUrl('templates/modulos/temas/muros/actividades/ejCastillo.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalCastillo = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/muros/actividades/bienCastillo.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienCastillo = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/muros/actividades/malCastillo.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalCastillo = modal;
  });
  $scope.ejCastillo = function() {
    $scope.modalCastillo.show();
  };
  $scope.closeEjCastillo = function() {
    $scope.modalCastillo.hide();
  };
  $scope.checkEjCastillo = function($respuesta) {
    $scope.closeEjCastillo();

    if ($respuesta)
      $scope.modalBienCastillo.show();
    else
      $scope.modalMalCastillo.show();
  };
  $scope.closeResCastillo = function() {
    $scope.modalMalCastillo.hide();
    $scope.modalBienCastillo.hide();
  };

  // EJERCICIO MAMPOSTERIA
  $ionicModal.fromTemplateUrl('templates/modulos/temas/muros/actividades/ejMamposteria.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMamposteria = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/muros/actividades/bienMamposteria.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienMamposteria = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/muros/actividades/malMamposteria.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalMamposteria = modal;
  });
  $scope.ejMamposteria = function() {
    $scope.modalMamposteria.show();
  };
  $scope.closeEjMamposteria = function() {
    $scope.modalMamposteria.hide();
  };
  $scope.checkEjMamposteria = function($respuesta) {
    $scope.closeEjMamposteria();

    if ($respuesta)
      $scope.modalBienMamposteria.show();
    else
      $scope.modalMalMamposteria.show();
  };
  $scope.closeResMamposteria = function() {
    $scope.modalMalMamposteria.hide();
    $scope.modalBienMamposteria.hide();
  };


  // EJERCICIO CERRAMIENTOS 1
  $ionicModal.fromTemplateUrl('templates/modulos/temas/cerramientos/actividades/ejCerramientos1.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalCerramientos1 = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/cerramientos/actividades/bienCerramientos1.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienCerramientos1 = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/cerramientos/actividades/malCerramientos1.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalCerramientos1 = modal;
  });
  $scope.ejCerramientos1 = function() {
    $scope.modalCerramientos1.show();
  };
  $scope.closeEjCerramientos1 = function() {
    $scope.modalCerramientos1.hide();
  };
  $scope.checkEjCerramientos1 = function($respuesta) {
    $scope.closeEjCerramientos1();

    if ($respuesta)
      $scope.modalBienCerramientos1.show();
    else
      $scope.modalMalCerramientos1.show();
  };
  $scope.closeResCerramientos1 = function() {
    $scope.modalMalCerramientos1.hide();
    $scope.modalBienCerramientos1.hide();
  };


  // EJERCICIO CERRAMIENTOS 2
  $ionicModal.fromTemplateUrl('templates/modulos/temas/cerramientos/actividades/ejCerramientos2.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalCerramientos2 = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/cerramientos/actividades/bienCerramientos2.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienCerramientos2 = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/cerramientos/actividades/malCerramientos2.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalCerramientos2 = modal;
  });
  $scope.ejCerramientos2 = function() {
    $scope.modalCerramientos2.show();
  };
  $scope.closeEjCerramientos2 = function() {
    $scope.modalCerramientos2.hide();
  };
  $scope.checkEjCerramientos2 = function($respuesta) {
    $scope.closeEjCerramientos2();

    if ($respuesta)
      $scope.modalBienCerramientos2.show();
    else
      $scope.modalMalCerramientos2.show();
  };
  $scope.closeResCerramientos2 = function() {
    $scope.modalMalCerramientos2.hide();
    $scope.modalBienCerramientos2.hide();
  };

})

.controller('CapitulosCtrl', function($scope) {
  $scope.capitulos = [
    { title: 'Introducción', id: 1, image: 'header.png', link: 'introduccion'},
    { title: 'Cimentación', id: 2, image: 'cimentacion.png', link: 'cimentacion' },
    { title: 'Muros', id: 3, image: 'muros.png', link: 'muros' },
    { title: 'Cerramientos y vanos', id: 4, image: 'cerramientos.png', link: 'cerramientos' },
    { title: 'Losas', id: 5, image: 'losas.png', link: 'losas' },
    { title: 'Azotea', id: 6, image: 'azotea.png', link: 'azotea' },
    { title: 'Acabados', id: 7, image: 'acabados.png', link: 'acabados'}
  ];
});
