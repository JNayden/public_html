!function(t){var e={};function n(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(r,a,function(e){return t[e]}.bind(null,a));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=19)}({0:function(t,e,n){n.p=window.flatsomeVars?window.flatsomeVars.assets_url:"/"},19:function(t,e,n){n(0),t.exports=n(20)},20:function(t,e,n){"use strict";n.r(e),n(21)},21:function(t,e){UxBuilder.addAction({icon:"dashicons dashicons-controls-play",tooltip:"Play animations",handler:function(t){let e=t.get("$iframe"),n=t.get("$timeout");e().contents().find("[data-animated]").each((function(t,e){""!==angular.element(e).attr("data-animate")&&(angular.element(e).attr("data-animated","false"),n(()=>angular.element(e).attr("data-animated","true"),0,!1))}))}})}});