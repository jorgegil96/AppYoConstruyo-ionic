// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
  })
    
  .state('app.capitulos', {
      url: '/capitulos',
      views: {
        'menuContent': {
          templateUrl: 'templates/capitulos.html',
          controller: 'CapitulosCtrl'
        }
      }
  })


  // INTRODUCCION
  .state('app.introduccion', {
      url: '/capitulos/introduccion',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/introduccion.html',
        }
      }
  })

  .state('app.presentacion', {
      url: '/capitulos/introduccion/presentacion',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/introduccion/presentacion.html',
        }
      }
  })
  .state('app.sostenibilidad', {
      url: '/capitulos/introduccion/sostenibilidad',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/introduccion/sostenibilidad.html',
        }
      }
  })
  .state('app.diseno', {
      url: '/capitulos/introduccion/diseno',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/introduccion/diseno.html',
        }
      }
  })
  .state('app.terreno', {
      url: '/capitulos/introduccion/terreno',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/introduccion/terreno.html',
        }
      }
  })
  .state('app.vivienda', {
      url: '/capitulos/introduccion/vivienda',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/introduccion/vivienda.html',
        }
      }
  })
  .state('app.clima', {
      url: '/capitulos/introduccion/clima',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/introduccion/clima.html',
        }
      }
  })
  .state('app.procesos', {
      url: '/capitulos/introduccion/procesos',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/introduccion/procesos.html',
        }
      }
  })
  .state('app.concreto', {
      url: '/capitulos/introduccion/concreto',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/introduccion/concreto.html',
        }
      }
  })
  .state('app.agregados', {
      url: '/capitulos/introduccion/agregados',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/introduccion/agregados.html',
        }
      }
  })
  .state('app.mezcla', {
      url: '/capitulos/introduccion/mezcla',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/introduccion/mezcla.html',
        }
      }
  })
  .state('app.armados', {
      url: '/capitulos/introduccion/armados',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/introduccion/armados.html',
        }
      }
  })
  .state('app.previoarmado', {
      url: '/capitulos/introduccion/previoarmado',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/introduccion/previoarmado.html',
        }
      }
  })
  // TERMINA INTRODUCCION


  // ALBAÑILERIAS



  // TERMINA ALBAÑILERIAS


  // CIMENTACIONES
  .state('app.cimentacion', {
      url: '/capitulos/cimentacion',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/cimentacion.html',
        }
      }
  })
  .state('app.cimfir', {
      url: '/capitulos/cimentaciones/cimfir',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/cimentaciones/cimfir.html',
        }
      }
  })
  .state('app.firme1', {
      url: '/capitulos/cimentaciones/firme1',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/cimentaciones/firme1.html',
        }
      }
  })
  .state('app.firme2', {
      url: '/capitulos/cimentaciones/firme2',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/cimentaciones/firme2.html',
        }
      }
  })

  // TERMINA CIMENTACIONES


  // MUROS
  //-------------------------------------------
  .state('app.muros', {
      url: '/capitulos/muros',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/muros.html',
        }
      }
  })
  .state('app.castillos1', {
      url: '/capitulos/muros/castillos1',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/muros/castillos1.html',
        }
      }
  })
  .state('app.castillos2', {
      url: '/capitulos/muros/castillos2',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/muros/castillos2.html',
        }
      }
  })
  .state('app.castillos3', {
      url: '/capitulos/muros/castillos3',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/muros/castillos3.html',
        }
      }
  })
  .state('app.mamposteria1', {
      url: '/capitulos/muros/mamposteria1',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/muros/mamposteria1.html',
        }
      }
  })
  .state('app.mamposteria2', {
      url: '/capitulos/muros/mamposteria2',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/muros/mamposteria2.html',
        }
      }
  })
  //-------------------------------------------


  // Cerramientos y Vanos
  //-------------------------------------------
  .state('app.cerramientos', {
      url: '/capitulos/cerramientos',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/cerramientos.html',
        }
      }
  })
  .state('app.cerramientos1', {
      url: '/capitulos/cerramientos/cerramientos1',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/cerramientos/cerramientos1.html',
        }
      }
  })
  .state('app.cerramientos2', {
      url: '/capitulos/cerramientos/cerramientos2',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/cerramientos/cerramientos2.html',
        }
      }
  });


  //-------------------------------------------


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/capitulos');
});
