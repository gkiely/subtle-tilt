/*=====================================
=            External Deps            =
=====================================*/
/*=====  End of External Deps  ======*/

/*=================================
=             App code            =
=================================*/
let gup               = require('util/gup');
let {log}             = require('util/helpers');
import Tilt from  './tilt';
/*=====  End of Custom app code  ======*/

/*===============================
=            Helpers            =
===============================*/
/*=====  End of Helpers  ======*/

/*=============================
=            Setup            =
=============================*/
let host    = window.location.hostname;
/*=====  End of Setup  ======*

/*===========================
=            App            =
===========================*/


Tilt('[data-tilt]', {
  "movement": {
    "perspective" : 1600,
    "translateX" : 2,
    "translateY" : 2,
    "translateZ" : 0,
    "rotateX" : 4.5,
    "rotateY" : -4.5,
    "rotateZ" : 0
  }
});

/*=====  End of App  ======*/

/*============================
=            Init            =
============================*/
/*=====  End of Init  ======*/