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
  .state('app.saco1', {
      url: '/capitulos/introduccion/concreto/saco1',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/introduccion/actividades/saco1.html',
        }
      }
  })
  .state('app.saco2', {
      url: '/capitulos/introduccion/concreto/saco2',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/introduccion/actividades/saco2.html',
        }
      }
  })
  .state('app.saco3', {
      url: '/capitulos/introduccion/concreto/saco3',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/introduccion/actividades/saco3.html',
        }
      }
  })
  .state('app.saco4', {
      url: '/capitulos/introduccion/concreto/saco4',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/introduccion/actividades/saco4.html',
        }
      }
  })
  .state('app.saco5', {
      url: '/capitulos/introduccion/concreto/saco5',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/introduccion/actividades/saco5.html',
        }
      }
  })
  .state('app.procedimientos', {
      url: '/capitulos/introduccion/procedimientos',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/introduccion/procedimientos.html',
        }
      }
  })
  // TERMINA INTRODUCCION


  // ALBAÑILERIAS
  .state('app.albanileria', {
      url: '/capitulos/albanileria',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/albanileria.html',
        }
      }
  })
  .state('app.car_terreno', {
      url: '/capitulos/albanileria/car_terreno',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/albanileria/car_terreno.html',
        }
      }
  })
  .state('app.planos', {
      url: '/capitulos/albanileria/planos',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/albanileria/planos.html',
        }
      }
  })
  .state('app.nivelacion', {
      url: '/capitulos/albanileria/nivelacion',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/albanileria/nivelacion.html',
        }
      }
  })

  .state('app.terreno1', {
      url: '/capitulos/albanileria/terreno',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/albanileria/terreno.html',
        }
      }
  })
  .state('app.procedimientos2', {
      url: '/capitulos/albanileria/procedimientos2',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/albanileria/procedimientos2.html',
        }
      }
  })
  .state('app.suelo', {
      url: '/capitulos/albanileria/suelo',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/albanileria/suelo.html',
        }
      }
  })
  .state('app.Trazo_nivelacion', {
      url: '/capitulos/albanileria/Trazo_nivelacion',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/albanileria/Trazo_nivelacion.html',
        }
      }
  })
  .state('app.nota_trazo', {
      url: '/capitulos/albanileria/nota_trazo',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/albanileria/nota_trazo.html',
        }
      }
  })
  .state('app.nivelacion0', {
      url: '/capitulos/albanileria/nivelacion',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/albanileria/nivelacion.html',
        }
      }
  })                






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
      url: '/capitulos/cimentacion/cimfir',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/cimentacion/cimfir.html',
        }
      }
  })
  .state('app.firme1', {
      url: '/capitulos/cimentacion/firme1',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/cimentacion/firme1.html',
        }
      }
  })
  .state('app.firme2', {
      url: '/capitulos/cimentacion/firme2',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/cimentacion/firme2.html',
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
  })
  //-------------------------------------------


  // Losas
  //-------------------------------------------
  .state('app.losas', {
      url: '/capitulos/losas',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/losas.html',
        }
      }
  })
  .state('app.cadena', {
      url: '/capitulos/losas/cadena',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/losas/cadena.html',
        }
      }
  })
  .state('app.losas1', {
      url: '/capitulos/losas/losas1',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/losas/losas1.html',
        }
      }
  })
  .state('app.vigeta', {
      url: '/capitulos/losas/vigeta',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/losas/vigeta.html',
        }
      }
  })
  //-------------------------------------------


  // Azoteas
  //-------------------------------------------
  .state('app.azoteas', {
      url: '/capitulos/azoteas',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/azoteas.html',
        }
      }
  })
  .state('app.petriles', {
      url: '/capitulos/azoteas/petriles',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/azoteas/petriles.html',
        }
      }
  })
  .state('app.terminacion', {
      url: '/capitulos/azoteas/terminacion',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/azoteas/terminacion.html',
        }
      }
  })
  //-------------------------------------------


  // Acabados
  //-------------------------------------------
  .state('app.acabados', {
      url: '/capitulos/acabados',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/acabados.html',
        }
      }
  })
  .state('app.acabados1', {
      url: '/capitulos/acabados/acabados',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/acabados/acabados.html',
        }
      }
  })
    .state('app.aplanado_mezcla', {
      url: '/capitulos/acabados/aplanado_mezcla',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/acabados/aplanado_mezcla.html',
        }
      }
  })
        .state('app.aplanado_yeso', {
      url: '/capitulos/acabados/aplanado_yeso',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/acabados/aplanado_yeso.html',
        }
      }
  })
          .state('app.pintura', {
      url: '/capitulos/acabados/pintura',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/acabados/pintura.html',
        }
      }
  })
           .state('app.piso_ceramico', {
      url: '/capitulos/acabados/piso_ceramico',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/acabados/piso_ceramico.html',
        }
      }
  })
        .state('app.piso_concreto', {
      url: '/capitulos/acabados/piso_concreto',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/acabados/piso_concreto.html',
        }
      }
  })
         .state('app.pisos', {
      url: '/capitulos/acabados/pisos',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/acabados/pisos.html',
        }
      }
  })
       .state('app.procedimiento_piso', {
      url: '/capitulos/acabados/procedimiento_piso',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/acabados/procedimiento_piso.html',
        }
      }
  })
        //-------------------------------------------


  // Instalaciones hidrosanitarias
  //-------------------------------------------
  .state('app.hidrosanitarias', {
      url: '/capitulos/hidrosanitarias',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/hidrosanitarias.html',
        }
      }
  })
  .state('app.inst_san', {
      url: '/capitulos/hidrosanitarias/inst_san',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/hidrosanitarias/inst_san.html',
        }
      }
  })
  .state('app.inst_hi_san', {
      url: '/capitulos/hidrosanitarias/inst_hi_san',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/hidrosanitarias/inst_hi_san.html',
        }
      }
  })
  .state('app.inst_hidro', {
      url: '/capitulos/hidrosanitarias/inst_hidro',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/hidrosanitarias/inst_hidro.html',
        }
      }
  })
    .state('app.inst_hidrau', {
      url: '/capitulos/hidrosanitarias/inst_hidrau',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/hidrosanitarias/inst_hidrau.html',
        }
      }
  })
  //-------------------------------------------


  //-------------------------------------------


  // Instalaciones Eléctricas
  //-------------------------------------------
  .state('app.electricas', {
      url: '/capitulos/electricas',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/electricas.html',
        }
      }
  })
  .state('app.elecygas', {
      url: '/capitulos/electricas/elecygas',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/electricas/elecygas.html',
        }
      }
  })
  .state('app.circuitos', {
      url: '/capitulos/electricas/circuitos',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/electricas/circuitos.html',
        }
      }
  })
  .state('app.centrodecarga', {
      url: '/capitulos/electricas/centrodecarga',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/electricas/centrodecarga.html',
        }
      }
  })
  .state('app.elemelectronicos', {
      url: '/capitulos/electricas/elemelectronicos',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/electricas/elemelectronicos.html',
        }
      }
  })
  .state('app.luminarias', {
      url: '/capitulos/electricas/luminarias',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/electricas/luminarias.html',
        }
      }
  })
  .state('app.gaslp', {
      url: '/capitulos/electricas/gaslp',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos/temas/electricas/gaslp.html',
        }
      }
  });
  //-------------------------------------------


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/capitulos');
});
