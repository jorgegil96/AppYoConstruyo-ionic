angular.module('starter.controllers', []).controller('AppCtrl', function($scope, $http, $ionicModal, $timeout, $ionicHistory) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.noBack = function() {
        console.log('go back', ':)');
        $ionicHistory.nextViewOptions({
            disableAnimate: false,
        });
        $ionicHistory.goBack(-1);
        //$ionicHistory.removeBackView();
    };
    $scope.backMain = function() {
            $ionicHistory.goBack(-2);
    };
        // Form data for the login modal
    $scope.data = {};
    $scope.submit = function() {
        var link = 'http://phpstack-4722-10615-107090.cloudwaysapps.com/api.php';
        $http.post(link, {
            username: $scope.data.username
        }).then(function(res) {
            $scope.response = res.data;
        });
    };

    /*
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });
<<<<<<< HEAD
  };

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  $scope.login = function() {
    $scope.modal.show();
  };

  // Login Data
  $scope.loginData = {};

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    var link = 'http://phpstack-4722-10615-107090.cloudwaysapps.com/api.php';

    $http.post(link, {
      username: $scope.loginData.username,
      email: $scope.loginData.email,
      password: $scope.loginData.password,
      location: $scope.loginData.location,
      estado: $scope.loginData.estado,
      genero: $scope.loginData.genero
      }).then(function(res) {
        $scope.loginResponse = res.data;
      });


    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    //$timeout(function() {
    //  $scope.closeLogin();
    //}, 1000);
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


  // EJERCICIO ARMADOS
  $ionicModal.fromTemplateUrl('templates/modulos/temas/introduccion/actividades/ejProcedimientos.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalProcedimientos = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/introduccion/actividades/bienProcedimientos.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienProcedimientos = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/introduccion/actividades/malProcedimientos.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalProcedimientos = modal;
  });
  $scope.ejProcedimientos = function() {
    $scope.modalProcedimientos.show();
  };
  $scope.closeEjProcedimientos = function() {
    $scope.modalProcedimientos.hide();
  };
  $scope.checkEjProcedimientos = function($respuesta) {
    $scope.closeEjProcedimientos();

    if ($respuesta)
      $scope.modalBienProcedimientos.show();
    else
      $scope.modalMalProcedimientos.show();
  };
  $scope.closeResProcedimientos = function() {
    $scope.modalMalProcedimientos.hide();
    $scope.modalBienProcedimientos.hide();
  };

  // EJERCICIO CIMENTACIONES Y FIRMES
  $ionicModal.fromTemplateUrl('templates/modulos/temas/cimentacion/actividades/ejCimFir.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalCimFir = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/cimentacion/actividades/bienCimFir.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienCimFir = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/cimentacion/actividades/malCimFir.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalCimFir = modal;
  });
  $scope.ejCimFir = function() {
    $scope.modalCimFir.show();
  };
  $scope.closeEjCimFir = function() {
    $scope.modalCimFir.hide();
  };
  $scope.checkEjCimFir = function($respuesta) {
    $scope.closeEjCimFir();

    if ($respuesta)
      $scope.modalBienCimFir.show();
    else
      $scope.modalMalCimFir.show();
  };
  $scope.closeResCimFir = function() {
    $scope.modalMalCimFir.hide();
    $scope.modalBienCimFir.hide();
  };

  // EJERCICIO FIRME 2
  $ionicModal.fromTemplateUrl('templates/modulos/temas/cimentacion/actividades/ejFirme.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalFirme = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/cimentacion/actividades/bienFirme.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienFirme = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/cimentacion/actividades/malFirme.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalFirme = modal;
  });
  $scope.ejFirme = function() {
    $scope.modalFirme.show();
  };
  $scope.closeEjFirme = function() {
    $scope.modalFirme.hide();
  };
  $scope.checkEjFirme = function($respuesta) {
    $scope.closeEjFirme();

    if ($respuesta)
      $scope.modalBienFirme.show();
    else
      $scope.modalMalFirme.show();
  };
  $scope.closeResFirme = function() {
    $scope.modalMalFirme.hide();
    $scope.modalBienFirme.hide();
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
//EJERCICIO ACABADOS ACABADOS
  $ionicModal.fromTemplateUrl('templates/modulos/temas/acabados/actividades/ejAcabados.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalAcabados = modal;
  });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/acabados/actividades/bienAcabados.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienAcabados = modal;
  });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/acabados/actividades/malAcabados.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalAcabados = modal;
  });
  $scope.ejAcabados = function() {
    $scope.modalAcabados.show();
  };
    $scope.closeEjPintura = function() {
    $scope.modalAcabados.hide();
  };
  $scope.closeEjPintura = function($respuesta) {
    $scope.closeEjAcabados();

    if ($respuesta)
      $scope.modalBienAcabados.show();
    else
      $scope.modalMalAcabados.show();
  };
    $scope.closeResAcabados = function() {
    $scope.modalMalAcabados.hide();
    $scope.modalBienAcabados.hide();
  };
  //EJERCICIO ACABADOS PISOS
      $ionicModal.fromTemplateUrl('templates/modulos/temas/acabados/actividades/ejPisos.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalPisos = modal;
  });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/acabados/actividades/bienPisos.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienPisos = modal;
  });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/acabados/actividades/malPisos.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalPisos = modal;
  });
  $scope.ejPisos = function() {
    $scope.modalPisos.show();
  };
    $scope.closeEjPisos = function() {
    $scope.modalPisos.hide();
  };
  $scope.CheckEjPisos = function($respuesta) {
    $scope.closeEjPisos();

    if ($respuesta)
      $scope.modalBienPisos.show();
    else
      $scope.modalMalPisos.show();
  };
    $scope.closeResPisos = function() {
    $scope.modalMalPisos.hide();
    $scope.modalBienPisos.hide();
  };
    //EJERCICIO ACABADOS YESO
      $ionicModal.fromTemplateUrl('templates/modulos/temas/acabados/actividades/ejYeso.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalYeso = modal;
  });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/acabados/actividades/bienYeso.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienYeso = modal;
  });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/acabados/actividades/malYeso.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalYeso = modal;
  });
  $scope.ejYeso = function() {
    $scope.modalYeso.show();
  };
    $scope.closeEjYeso = function() {
    $scope.modalYeso.hide();
  };
  $scope.CheckEjYeso = function($respuesta) {
    $scope.closeEjYeso();

    if ($respuesta)
      $scope.modalBienYeso.show();
    else
      $scope.modalMalYeso.show();
  };
    $scope.closeResYeso = function() {
    $scope.modalMalYeso.hide();
    $scope.modalBienYeso.hide();
  };
    //EJERCICIO ACABADOS CERAMICO
          $ionicModal.fromTemplateUrl('templates/modulos/temas/acabados/actividades/ejCeramico.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalCeramico = modal;
  });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/acabados/actividades/bienCeramico.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienCeramico = modal;
  });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/acabados/actividades/malCeramico.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalCeramico = modal;
  });
  $scope.ejCeramico = function() {
    $scope.modalCeramico.show();
  };
    $scope.closeEjCeramico = function() {
    $scope.modalCeramico.hide();
  };
  $scope.CheckEjCeramico = function($respuesta) {
    $scope.closeEjCeramico();

    if ($respuesta)
      $scope.modalBienCeramico.show();
    else
      $scope.modalMalCeramico.show();
  };
    $scope.closeResYeso = function() {
    $scope.modalMalCeramico.hide();
    $scope.modalBienCeramico.hide();
  };
    //EJERCICIO ACABADOS CONCRETO

  $ionicModal.fromTemplateUrl('templates/modulos/temas/acabados/actividades/ejConcreto.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalConcreto = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/acabados/actividades/bienConcreto.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienConcreto = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/acabados/actividades/malConcreto.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalConcreto = modal;
  });
  $scope.ejConcreto = function() {
    console.log("tu COLA");
    $scope.modalConcreto.show();
  };
  $scope.closeEjConcreto = function() {
    $scope.modalConcreto.hide();
  };
  $scope.CheckEjConcreto = function($respuesta) {
    $scope.closeEjConcreto();

    if ($respuesta)
      $scope.modalBienConcreto.show();
    else
      $scope.modalMalConcreto.show();
  };
  $scope.closeResConcreto = function() {
    $scope.modalMalConcreto.hide();
    $scope.modalBienConcreto.hide();
  };

  // EJERCICIO CADENA DE REMATE
  $ionicModal.fromTemplateUrl('templates/modulos/temas/losas/actividades/ejCadena.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalCadena = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/losas/actividades/bienCadena.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienCadena = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/losas/actividades/malCadena.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalCadena = modal;
  });
  $scope.ejCadena = function() {
    $scope.modalCadena.show();
  };
  $scope.closeEjCadena = function() {
    $scope.modalCadena.hide();
  };
  $scope.checkEjCadena = function($respuesta) {
    $scope.closeEjCadena();

    if ($respuesta)
      $scope.modalBienCadena.show();
    else
      $scope.modalMalCadena.show();
  };
  $scope.closeResCadena = function() {
    $scope.modalMalCadena.hide();
    $scope.modalBienCadena.hide();
  };
  //EJERCICIO HIDRO SANTARIO
          $ionicModal.fromTemplateUrl('templates/modulos/temas/hidrosanitarias/actividades/ejHisan.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalHisan = modal;
  });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/hidrosanitarias/actividades/bienHisan.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienHisan = modal;
  });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/hidrosanitarias/actividades/malHisan.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalHisan = modal;
  });
  $scope.ejHisan = function() {
    $scope.modalHisan.show();
  };
    $scope.closeEjHisan = function() {
    $scope.modalHisan.hide();
  };
  $scope.CheckEjHisan = function($respuesta) {
    $scope.closeEjHisan();

    if ($respuesta)
      $scope.modalBienHisan.show();
    else
      $scope.modalMalHisan.show();
  };
    $scope.closeResHisan = function() {
    $scope.modalMalHisan.hide();
    $scope.modalBienHisan.hide();
  };
  //EJERCICIO ACABADOS INSTALACIONES SANITARIAS
        $ionicModal.fromTemplateUrl('templates/modulos/temas/acabados/actividades/ejSani.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalSani = modal;
  });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/acabados/actividades/bienSani.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienSani = modal;
  });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/acabados/actividades/malSani.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalSani = modal;
  });
  $scope.ejSani = function() {
    $scope.modalSani.show();
  };
    $scope.closeEjSani = function() {
    $scope.modalSani.hide();
  };
  $scope.CheckEjSani = function($respuesta) {
    $scope.closeEjSani();

    if ($respuesta)
      $scope.modalBienSani.show();
    else
      $scope.modalMalSani.show();
  };
    $scope.closeResSani = function() {
    $scope.modalMalSani.hide();
    $scope.modalBienSani.hide();
  };
  //EJERCICIO ABADO HIDRASANITARIAS

        $ionicModal.fromTemplateUrl('templates/modulos/temas/hidrosanitarias/actividades/ejHidra.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalHidra = modal;
  });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/hidrosanitarias/actividades/bienHidra.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienHidra = modal;
  });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/hidrosanitarias/actividades/malHidra.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalHidra = modal;
  });
  $scope.ejHidra = function() {
    $scope.modalHidra.show();
  };
    $scope.closeEjHidra = function() {
    $scope.modalHidra.hide();
  };
  $scope.CheckEjHidra = function($respuesta) {
    $scope.closeEjHidra();

    if ($respuesta)
      $scope.modalBienHidra.show();
    else
      $scope.modalMalHidra.show();
  };
    $scope.closeResHidra = function() {
    $scope.modalMalHidra.hide();
    $scope.modalBienHidra.hide();
  };
  //EJERCICIO HIDRO HIDRAULICAS
          $ionicModal.fromTemplateUrl('templates/modulos/temas/hidrosanitarias/actividades/ejInsta.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalInsta = modal;
  });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/hidrosanitarias/actividades/bienInsta.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienInsta = modal;
  });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/hidrosanitarias/actividades/malInsta.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalInsta = modal;
  });
  $scope.ejInsta = function() {
    $scope.modalInsta.show();
  };
    $scope.closeEjInsta = function() {
    $scope.modalInsta.hide();
  };
  $scope.CheckEjInsta = function($respuesta) {
    $scope.closeEjInsta();

    if ($respuesta)
      $scope.modalBienInsta.show();
    else
      $scope.modalMalInsta.show();
  };
    $scope.closeResInsta = function() {
    $scope.modalMalInsta.hide();
    $scope.modalBienInsta.hide();
  };
  // EJERCICIO LOSA 1
  $ionicModal.fromTemplateUrl('templates/modulos/temas/losas/actividades/ejLosas1.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalLosas1 = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/losas/actividades/bienLosas1.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienLosas1 = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/losas/actividades/malLosas1.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalLosas1 = modal;
  });
  $scope.ejLosas1 = function() {
    $scope.modalLosas1.show();
  };
  $scope.closeEjLosas1 = function() {
    $scope.modalLosas1.hide();
  };
  $scope.checkEjLosas1 = function($respuesta) {
    $scope.closeEjLosas1();

    if ($respuesta)
      $scope.modalBienLosas1.show();
    else
      $scope.modalMalLosas1.show();
  };
  $scope.closeResLosas1 = function() {
    $scope.modalMalLosas1.hide();
    $scope.modalBienLosas1.hide();
  };


  // EJERCICIO VIGETA
  $ionicModal.fromTemplateUrl('templates/modulos/temas/losas/actividades/ejVigeta.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalVigeta = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/losas/actividades/bienVigeta.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienVigeta = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/losas/actividades/malVigeta.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalVigeta = modal;
  });
  $scope.ejVigeta = function() {
    $scope.modalVigeta.show();
  };
  $scope.closeEjVigeta = function() {
    $scope.modalVigeta.hide();
  };
  $scope.checkEjVigeta = function($respuesta) {
    $scope.closeEjVigeta();

    if ($respuesta)
      $scope.modalBienVigeta.show();
    else
      $scope.modalMalVigeta.show();
  };
  $scope.closeResVigeta = function() {
    $scope.modalMalVigeta.hide();
    $scope.modalBienVigeta.hide();
  };


  // EJERCICIO PRETILES
  $ionicModal.fromTemplateUrl('templates/modulos/temas/azoteas/actividades/ejPretiles.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalPretiles = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/azoteas/actividades/bienPretiles.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienPretiles = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/azoteas/actividades/malPretiles.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalPretiles = modal;
  });
  $scope.ejPretiles = function() {
    $scope.modalPretiles.show();
  };
  $scope.closeEjPretiles = function() {
    $scope.modalPretiles.hide();
  };
  $scope.checkEjPretiles = function($respuesta) {
    $scope.closeEjPretiles();

    if ($respuesta)
      $scope.modalBienPretiles.show();
    else
      $scope.modalMalPretiles.show();
  };
  $scope.closeResPretiles = function() {
    $scope.modalMalPretiles.hide();
    $scope.modalBienPretiles.hide();
  };

  // EJERCICIO TERMINACION
  $ionicModal.fromTemplateUrl('templates/modulos/temas/azoteas/actividades/ejTerminacion.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalTerminacion = modal;
  });
  $scope.ejTerminacion = function() {
    $scope.modalTerminacion.show();
  };
  $scope.closeEjTerminacion = function() {
    $scope.modalTerminacion.hide();
  };

  // EJERCICIO CIRCUITOS
  $ionicModal.fromTemplateUrl('templates/modulos/temas/electricas/actividades/ejCircuitos.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalCircuitos = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/electricas/actividades/bienCircuitos.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienCircuitos = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/electricas/actividades/malCircuitos.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalCircuitos = modal;
  });
  $scope.ejCircuitos = function() {
    $scope.modalCircuitos.show();
  };
  $scope.closeEjCircuitos = function() {
    $scope.modalCircuitos.hide();
  };
  $scope.checkEjCircuitos = function($respuesta) {
    $scope.closeEjCircuitos();

    if ($respuesta)
      $scope.modalBienCircuitos.show();
    else
      $scope.modalMalCircuitos.show();
  };
  $scope.closeResCircuitos = function() {
    $scope.modalMalCircuitos.hide();
    $scope.modalBienCircuitos.hide();
  };

  // EJERCICIO LUMINARIAS
  $ionicModal.fromTemplateUrl('templates/modulos/temas/electricas/actividades/ejLuminarias.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalLuminarias = modal;
  });
  $scope.ejLuminarias = function() {
    $scope.modalLuminarias.show();
  };
  $scope.closeEjLuminarias = function() {
    $scope.modalLuminarias.hide();
  };

  // EJERCICIO ELEMENTOS ELECTRONICOS
  $ionicModal.fromTemplateUrl('templates/modulos/temas/electricas/actividades/ejElemelectronicos.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalElemelectronicos = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/electricas/actividades/bienElemelectronicos.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienElemelectronicos = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modulos/temas/electricas/actividades/malElemelectronicos.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalMalElemelectronicos = modal;
  });
  $scope.ejElemelectronicos = function() {
    $scope.modalElemelectronicos.show();
  };
  $scope.closeEjElemelectronicos = function() {
    $scope.modalElemelectronicos.hide();
  };
  $scope.checkEjElemelectronicos = function($respuesta) {
    $scope.closeEjElemelectronicos();

    if ($respuesta)
      $scope.modalBienElemelectronicos.show();
    else
      $scope.modalMalElemelectronicos.show();
  };
  $scope.closeResElemelectronicos = function() {
    $scope.modalMalElemelectronicos.hide();
    $scope.modalBienElemelectronicos.hide();
  };
=======
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };
    $scope.login = function() {
        $scope.modal.show();
    };
    */

    // Login Data
    //$scope.loginData = {};
    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login');
        var link = 'http://192.168.0.8:8000/api/v1/authenticate';

        $http.post(link, {email: "jorgegilcavazos@gmail.com", password: "passdeprueba"})
        .success(function(response) {
            console.log("token:" + response.token);
        })
        .error(function(error) {
            console.log("error");
        });
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
        if ($resultado) $scope.modalResBien.show();
        else $scope.modalResMal.show();
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
        if ($resultado) $scope.modalBienTerreno.show();
        else $scope.modalMalTerreno.show();
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
        if ($respuesta) $scope.modalBienClima.show();
        else $scope.modalMalClima.show();
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
        if ($respuesta) $scope.modalBienArmados.show();
        else $scope.modalMalArmados.show();
    };
    $scope.closeResArmados = function() {
        $scope.modalMalArmados.hide();
        $scope.modalBienArmados.hide();
    };
    // EJERCICIO ARMADOS
    $ionicModal.fromTemplateUrl('templates/modulos/temas/introduccion/actividades/ejProcedimientos.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalProcedimientos = modal;
    });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/introduccion/actividades/bienProcedimientos.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalBienProcedimientos = modal;
    });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/introduccion/actividades/malProcedimientos.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalMalProcedimientos = modal;
    });
    $scope.ejProcedimientos = function() {
        $scope.modalProcedimientos.show();
    };
    $scope.closeEjProcedimientos = function() {
        $scope.modalProcedimientos.hide();
    };
    $scope.checkEjProcedimientos = function($respuesta) {
        $scope.closeEjProcedimientos();
        if ($respuesta) $scope.modalBienProcedimientos.show();
        else $scope.modalMalProcedimientos.show();
    };
    $scope.closeResProcedimientos = function() {
        $scope.modalMalProcedimientos.hide();
        $scope.modalBienProcedimientos.hide();
    };
    // EJERCICIO CIMENTACIONES Y FIRMES
    $ionicModal.fromTemplateUrl('templates/modulos/temas/cimentacion/actividades/ejCimFir.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalCimFir = modal;
    });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/cimentacion/actividades/bienCimFir.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalBienCimFir = modal;
    });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/cimentacion/actividades/malCimFir.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalMalCimFir = modal;
    });
    $scope.ejCimFir = function() {
        $scope.modalCimFir.show();
    };
    $scope.closeEjCimFir = function() {
        $scope.modalCimFir.hide();
    };
    $scope.checkEjCimFir = function($respuesta) {
        $scope.closeEjCimFir();
        if ($respuesta) $scope.modalBienCimFir.show();
        else $scope.modalMalCimFir.show();
    };
    $scope.closeResCimFir = function() {
        $scope.modalMalCimFir.hide();
        $scope.modalBienCimFir.hide();
    };
    // EJERCICIO FIRME 2
    $ionicModal.fromTemplateUrl('templates/modulos/temas/cimentacion/actividades/ejFirme.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalFirme = modal;
    });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/cimentacion/actividades/bienFirme.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalBienFirme = modal;
    });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/cimentacion/actividades/malFirme.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalMalFirme = modal;
    });
    $scope.ejFirme = function() {
        $scope.modalFirme.show();
    };
    $scope.closeEjFirme = function() {
        $scope.modalFirme.hide();
    };
    $scope.checkEjFirme = function($respuesta) {
        $scope.closeEjFirme();
        if ($respuesta) $scope.modalBienFirme.show();
        else $scope.modalMalFirme.show();
    };
    $scope.closeResFirme = function() {
        $scope.modalMalFirme.hide();
        $scope.modalBienFirme.hide();
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
        if ($respuesta) $scope.modalBienCastillo.show();
        else $scope.modalMalCastillo.show();
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
        if ($respuesta) $scope.modalBienMamposteria.show();
        else $scope.modalMalMamposteria.show();
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
        if ($respuesta) $scope.modalBienCerramientos1.show();
        else $scope.modalMalCerramientos1.show();
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
        if ($respuesta) $scope.modalBienCerramientos2.show();
        else $scope.modalMalCerramientos2.show();
    };
    $scope.closeResCerramientos2 = function() {
        $scope.modalMalCerramientos2.hide();
        $scope.modalBienCerramientos2.hide();
    };
    // EJERCICIO CADENA DE REMATE
    $ionicModal.fromTemplateUrl('templates/modulos/temas/losas/actividades/ejCadena.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalCadena = modal;
    });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/losas/actividades/bienCadena.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalBienCadena = modal;
    });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/losas/actividades/malCadena.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalMalCadena = modal;
    });
    $scope.ejCadena = function() {
        $scope.modalCadena.show();
    };
    $scope.closeEjCadena = function() {
        $scope.modalCadena.hide();
    };
    $scope.checkEjCadena = function($respuesta) {
        $scope.closeEjCadena();
        if ($respuesta) $scope.modalBienCadena.show();
        else $scope.modalMalCadena.show();
    };
    $scope.closeResCadena = function() {
        $scope.modalMalCadena.hide();
        $scope.modalBienCadena.hide();
    };
    // EJERCICIO LOSA 1
    $ionicModal.fromTemplateUrl('templates/modulos/temas/losas/actividades/ejLosas1.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalLosas1 = modal;
    });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/losas/actividades/bienLosas1.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalBienLosas1 = modal;
    });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/losas/actividades/malLosas1.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalMalLosas1 = modal;
    });
    $scope.ejLosas1 = function() {
        $scope.modalLosas1.show();
    };
    $scope.closeEjLosas1 = function() {
        $scope.modalLosas1.hide();
    };
    $scope.checkEjLosas1 = function($respuesta) {
        $scope.closeEjLosas1();
        if ($respuesta) $scope.modalBienLosas1.show();
        else $scope.modalMalLosas1.show();
    };
    $scope.closeResLosas1 = function() {
        $scope.modalMalLosas1.hide();
        $scope.modalBienLosas1.hide();
    };
    // EJERCICIO VIGETA
    $ionicModal.fromTemplateUrl('templates/modulos/temas/losas/actividades/ejVigeta.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalVigeta = modal;
    });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/losas/actividades/bienVigeta.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalBienVigeta = modal;
    });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/losas/actividades/malVigeta.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalMalVigeta = modal;
    });
    $scope.ejVigeta = function() {
        $scope.modalVigeta.show();
    };
    $scope.closeEjVigeta = function() {
        $scope.modalVigeta.hide();
    };
    $scope.checkEjVigeta = function($respuesta) {
        $scope.closeEjVigeta();
        if ($respuesta) $scope.modalBienVigeta.show();
        else $scope.modalMalVigeta.show();
    };
    $scope.closeResVigeta = function() {
        $scope.modalMalVigeta.hide();
        $scope.modalBienVigeta.hide();
    };
    // EJERCICIO PRETILES
    $ionicModal.fromTemplateUrl('templates/modulos/temas/azoteas/actividades/ejPretiles.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalPretiles = modal;
    });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/azoteas/actividades/bienPretiles.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalBienPretiles = modal;
    });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/azoteas/actividades/malPretiles.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalMalPretiles = modal;
    });
    $scope.ejPretiles = function() {
        $scope.modalPretiles.show();
    };
    $scope.closeEjPretiles = function() {
        $scope.modalPretiles.hide();
    };
    $scope.checkEjPretiles = function($respuesta) {
        $scope.closeEjPretiles();
        if ($respuesta) $scope.modalBienPretiles.show();
        else $scope.modalMalPretiles.show();
    };
    $scope.closeResPretiles = function() {
        $scope.modalMalPretiles.hide();
        $scope.modalBienPretiles.hide();
    };
    // EJERCICIO TERMINACION
    $ionicModal.fromTemplateUrl('templates/modulos/temas/azoteas/actividades/ejTerminacion.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalTerminacion = modal;
    });
    $scope.ejTerminacion = function() {
        $scope.modalTerminacion.show();
    };
    $scope.closeEjTerminacion = function() {
        $scope.modalTerminacion.hide();
    };
    // EJERCICIO CIRCUITOS
    $ionicModal.fromTemplateUrl('templates/modulos/temas/electricas/actividades/ejCircuitos.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalCircuitos = modal;
    });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/electricas/actividades/bienCircuitos.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalBienCircuitos = modal;
    });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/electricas/actividades/malCircuitos.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalMalCircuitos = modal;
    });
    $scope.ejCircuitos = function() {
        $scope.modalCircuitos.show();
    };
    $scope.closeEjCircuitos = function() {
        $scope.modalCircuitos.hide();
    };
    $scope.checkEjCircuitos = function($respuesta) {
        $scope.closeEjCircuitos();
        if ($respuesta) $scope.modalBienCircuitos.show();
        else $scope.modalMalCircuitos.show();
    };
    $scope.closeResCircuitos = function() {
        $scope.modalMalCircuitos.hide();
        $scope.modalBienCircuitos.hide();
    };
    // EJERCICIO LUMINARIAS
    $ionicModal.fromTemplateUrl('templates/modulos/temas/electricas/actividades/ejLuminarias.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalLuminarias = modal;
    });
    $scope.ejLuminarias = function() {
        $scope.modalLuminarias.show();
    };
    $scope.closeEjLuminarias = function() {
        $scope.modalLuminarias.hide();
    };
    // EJERCICIO ELEMENTOS ELECTRONICOS
    $ionicModal.fromTemplateUrl('templates/modulos/temas/electricas/actividades/ejElemelectronicos.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalElemelectronicos = modal;
    });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/electricas/actividades/bienElemelectronicos.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalBienElemelectronicos = modal;
    });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/electricas/actividades/malElemelectronicos.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalMalElemelectronicos = modal;
    });
    $scope.ejElemelectronicos = function() {
        $scope.modalElemelectronicos.show();
    };
    $scope.closeEjElemelectronicos = function() {
        $scope.modalElemelectronicos.hide();
    };
    $scope.checkEjElemelectronicos = function($respuesta) {
        $scope.closeEjElemelectronicos();
        if ($respuesta) $scope.modalBienElemelectronicos.show();
        else $scope.modalMalElemelectronicos.show();
    };
    $scope.closeResElemelectronicos = function() {
        $scope.modalMalElemelectronicos.hide();
        $scope.modalBienElemelectronicos.hide();
    };
})
>>>>>>> f10ffec90cc068e32348e3811025b06e9ebfc844

.controller('AuthCtrl', function($scope, $location, $stateParams, $ionicHistory, $http, $state, $auth, $rootScope) {
	$scope.loginData = {}
	$scope.loginError = false;
	$scope.loginErrorText;

	$scope.login = function() {
		var credentials = {
			email: $scope.loginData.email,
			password: $scope.loginData.password
		}

		console.log(credentials);

		$auth.login(credentials).then(function() {
            console.log("hola");

			// Return an $http request for the authenticated user
            $http.get('http://192.168.0.8:8000/api/v1/authenticate/').success(function(response){
                // Stringify the retured data
                var user = JSON.stringify(response.user);

                console.log("hola" + user);
 
                // Set the stringified user data into local storage
                localStorage.setItem('user', user);
 
                // Getting current user data from local storage
                $rootScope.currentUser = response.user;
                // $rootScope.currentUser = localStorage.setItem('user');;
                    
                $ionicHistory.nextViewOptions({
                	disableBack: true
                });
 
                $state.go('app');
            })
            .error(function(error){
                $scope.loginError = true;
                $scope.loginErrorText = error.data.error;
                console.log($scope.loginErrorText);
            })
		});
	}
})


.controller('CapitulosCtrl', function($scope) {
    $scope.capitulos = [{
        title: 'Introducción',
        id: 1,
        image: 'header.png',
        link: 'introduccion',
        color: 'green'
    }, {
        title: 'Albañileria',
        id: 2,
        image: 'albanileria.png',
        link: 'albanileria',
        color: 'green'
    }, {
        title: 'Cimentación',
        id: 3,
        image: 'cimentacion.png',
        link: 'cimentacion',
        color: 'green'
    }, {
        title: 'Muros',
        id: 4,
        image: 'muros.png',
        link: 'muros',
        color: ''
    }, {
        title: 'Cerramientos y vanos',
        id: 5,
        image: 'cerramientos.png',
        link: 'cerramientos',
        color: ''
    }, {
        title: 'Losas',
        id: 6,
        image: 'losas.png',
        link: 'losas',
        color: ''
    }, {
        title: 'Azoteas',
        id: 7,
        image: 'azotea.png',
        link: 'azoteas',
        color: ''
    }, {
        title: 'Acabados',
        id: 8,
        image: 'acabados.png',
        link: 'acabados',
        color: ''
    }, {
        title: 'Instalaciones Hidrosanitarias',
        id: 9,
        image: 'hidro.png',
        link: 'hidrosanitarias',
        color: ''
    }, {
        title: 'Instalaciones Eléctricas',
        id: 10,
        image: 'electricas.png',
        link: 'electricas',
        color: ''
    }];
});