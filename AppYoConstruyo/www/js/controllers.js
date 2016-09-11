angular.module('starter.controllers', []).controller('AppCtrl', function($scope, $location, $http, $ionicModal, $timeout, $ionicHistory, $ionicPopup) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    var domain = "http://yoconstruyo.dev:26";
    $scope.loginData = {};

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
    

    $scope.goFinal = function() {
      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        title: '<h3><b>¡Muchas Felicidades!</b></h3>',
        subTitle: '<div align="left">Has concluido todos los temas del curso de auto-construcción Yo Construyo. Agradecemos tu tiempo y la confianza depositada en el mismo. A continuación te pedimos tu apoyo para contestar la siguiente encuesta de salida, con el objetivo de mejorar la aplicación.</div><br> Te invitamos también a escribirnos tus dudas y comentarios a:<br>info@cdcs.com.mx <br>+52 (81) 8358-2000 ext.5262,Síguenos en Facebook y Twitter: /CentroCEMEXTEC',
        scope: $scope,
        buttons: [
          {
            text: '<b>Encuesta</b>',
            type: 'button-positive',
            onTap: function(e) {
                window.open('https://docs.google.com/forms/d/1zshZF0w5L6VjTMaAGq5O0AUk7OQvonvqVNUIDBWqpcY/viewform','_system','location=yes'); 
            }
          }
        ]
      });

      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });
    };


    $scope.checkRegistered = function(capitulo) {
      console.log("checking...");
      console.log(localStorage.getItem("token"));
      // Check that user is logged in
      if (localStorage.getItem('token') == null) {
        console.log("Not registered");
        // Force the user to register before using the app.
        $scope.modalElegir.backdropClickToClose = false;
        $scope.modalElegir.hardwareBackButtonClose = false;
        $scope.elegir();
      } else {
        console.log("Registered");
        var token = localStorage.getItem("token");
        if (token != null) {
          $scope.refreshToken();
          $scope.uploadProgress();
        }
      }
    };

    // Perform the login action
    $scope.doLogin = function() {
      console.log("Logging in...");
      $scope.loginResponse = "Iniciando sesión...";
      var link = domain + '/api/v1/authenticate';


      var credentials = {
        email: $scope.loginData.email,
        password: $scope.loginData.password
      };

      console.log(JSON.stringify(credentials));
      console.log(link);

      $http.post(link, credentials)
      .success(function(res) {
        console.log(JSON.stringify(res));
        if (res.token != null) {
          console.log(res.token);
          $scope.loginResponse = "Sesión Iniciada";
          localStorage.setItem("token", res.token);

          $scope.closeElegir();
        } else {
          console.log(res.token);
          $scope.loginResponse = "No se pudo iniciar sesión";
        }
      })
      .error(function(e) {
        $scope.registrationResponse = "Revisa tu conexión a internet";
      });

    };

    // Perform the registration action when the user submits the registration form
    $scope.doRegistration = function() {
      console.log('Doing registration');
      $scope.registrationResponse = "Registrando...";
      var link = domain + '/api/v1/register';
      var loginUrl = domain + '/api/v1/authenticate';

      var userData = {
        name: $scope.loginData.nombre,
        last_name: $scope.loginData.apellido,
        email: $scope.loginData.email, 
        password: $scope.loginData.password,
        password_confirmation: $scope.loginData.password_confirm,
        gender: $scope.loginData.genero,
        dob: $scope.loginData.date,
        country: $scope.loginData.pais,
        state: $scope.loginData.estado,
        city: $scope.loginData.ciudad,
        education: $scope.loginData.estudios
      };

      var credentials = {
        email: $scope.loginData.email, 
        password: $scope.loginData.password
      };

      console.log(JSON.stringify(userData));
      console.log(link);

      $http.post(link, userData)
      .success(function(res) {
        console.log(JSON.stringify(res));
        if (res.registration != null) {
          console.log(res.registration);
          $scope.registrationResponse = "Usuario creado";
          localStorage.setItem("registered", true);

          console.log("loginurl: " + loginUrl);
          console.log("credentials: " + JSON.stringify(credentials));
          $http.post(loginUrl, credentials)
          .success(function(loginres) {
            console.log(JSON.stringify(loginres));
            if (loginres.token != null) {
              console.log(loginres.token);
              $scope.registrationResponse = "Sesión Iniciada";
              localStorage.setItem("token", loginres.token);
              $scope.closeElegir();
              $scope.closeRegistration();
            } else {
              console.log(loginres.token);
              $scope.registrationResponse = "No se pudo iniciar sesión";
            }
          })
          .error(function(ee) {
            $scope.registrationResponse = "Revisa tu conexión a internet";
          });          


        } else if (res.email != null) {
          $scope.registrationResponse = "Email en uso o invalido";
          console.log(res.email);
        } else if (res.password != null) {
          $scope.registrationResponse = "Las contraseñas deben de coincidir y ser de 6 o más caracteres";
        } else {
          $scope.registrationResponse = "Campos invalidos";
        }
      })
      .error(function(e) {
        console.log(JSON.stringify(e));
        $scope.registrationResponse = "Llena todos los campos correctamente";
      });
    };

    $scope.prepLogin = function(type) {
      console.log("prep:" + type);
      // TYPE
      // 0 => login
      // 1 => registration 
      if (type == 0) {
        $scope.login();
      } else {
        $scope.registration();
      }
    };

    $scope.refreshToken = function() {
      console.log("Refreshing token...");
      var link = domain + "/api/v1/refresh?token=";
      var token = localStorage.getItem("token");
      if (token != null) {
        $http.post(link + token)
        .success(function(res) {
          if (res.token != null) {
            console.log("Got new token: " + JSON.stringify(res));
            localStorage.setItem("token", res.token);
          } else {
            console.log("Could not get new token");
            $scope.login();
          }
        })
        .error(function(e) {
          console.log("Error refreshing token");
        });
      }
    };

    $scope.uploadProgress = function() {
      console.log("Uploading progress...");
      var link = domain + "/api/v1/complete?token=";
      var progress = localStorage.getItem("progress");
      var token = localStorage.getItem("token");
      if (progress != null) {
        var toUpload = [];
        var count = 0;
        progress = JSON.parse(progress);
        for (var i = 0; i < progress.length; i++) {
          if (progress[i] == true) {
            toUpload[count] = i;
            count++;
          }
        }

        var postData = {
          records: JSON.stringify(toUpload)
        };

        if (count > 0 ) {
          $http.post(link + token, postData)
          .success(function(res) {
            console.log(JSON.stringify(res));
          })
          .error(function(e) {
            console.log("Error updating progress");
          });
        }
      }
    };

    $scope.saveProgress = function (id) {
      var progress = localStorage.getItem("progress");
      if (progress == null) {
        console.log("progress null");
        progress = [];
      } else {
        console.log("progress not null");
        console.log("progress: " + progress);
        progress = JSON.parse(progress);
      }
      progress[id] = true;

      console.log("new: " + JSON.stringify(progress));
      localStorage.setItem("progress", JSON.stringify(progress));

      $scope.uploadProgress();
    };

    $scope.getColor = function(id) {
      console.log("get color of " + id);
      var moduloProgress = localStorage.getItem("moduloProgress");
      if (moduloProgress == null) {
        moduloProgress = [];
      } else {
        moduloProgress = JSON.parse(progress);
      }
    };

    
  //ELEGIR LOGIN O REGISTRO
  $ionicModal.fromTemplateUrl('templates/elegirLogin.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalElegir = modal;
  });
  $scope.closeElegir = function() {
    $scope.modalElegir.hide();
  };
  $scope.elegir = function() {
    $scope.modalElegir.show();
  };

  //LOGIN
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalLogin = modal;
  });
  $scope.closeLogin = function() {
    $scope.modalLogin.hide();
  };
  $scope.login = function() {
    console.log("login()");
    $scope.modalLogin.show();
  };

  //LOG OUT
  $ionicModal.fromTemplateUrl('templates/logout.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalLogout = modal;
  });
  $scope.closeLogout = function() {
    $scope.modalLogout.hide();
  };
  $scope.logout = function() {
    $scope.modalLogout.show();
  };

  //REGISTRO
  $ionicModal.fromTemplateUrl('templates/registration.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalRegistration = modal;
  });
  $scope.closeRegistration = function() {
    $scope.modalRegistration.hide();
  };
  $scope.registration = function() {
    console.log("registration()");
    $scope.modalRegistration.show();
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
    $scope.closeEjAcabados = function() {
    $scope.modalAcabados.hide();
  };
  $scope.CheckEjAcabados = function($respuesta) {
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
          $ionicModal.fromTemplateUrl('templates/modulos/temas/acabados/actividades/ejHisan.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalHisan = modal;
  });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/acabados/actividades/bienHisan.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienHisan = modal;
  });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/acabados/actividades/malHisan.html', {
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

        $ionicModal.fromTemplateUrl('templates/modulos/temas/acabados/actividades/ejHidra.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalHidra = modal;
  });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/acabados/actividades/bienHidra.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalBienHidra = modal;
  });
    $ionicModal.fromTemplateUrl('templates/modulos/temas/acabados/actividades/malHidra.html', {
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
    }, {
        title: 'Ecotecnias',
        id: 11,
        image: 'ecotecnias.png',
        link: 'ecotecnias',
        color: ''
    }];
});