parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"siWZ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(t,i,o,s,n){void 0===i&&(i=1),void 0===o&&(o="#000"),void 0===s&&(s="#000"),void 0===n&&(n=4),this.edges=[],this.name=t,this.unit=i,this.fill=o,this.stroke=s,this.lineWidth=n}return t.prototype.draw=function(t){for(var i in t.lineWidth=this.lineWidth,t.beginPath(),t.moveTo(this.points.p1.x,this.points.p1.y),this.points)t.lineTo(this.points[i].x,this.points[i].y);t.closePath(),t.fillStyle=this.fill,t.strokeStyle=this.stroke,t.fill(),t.stroke()},t.prototype.updateCentroid=function(){var t=0,i=0,o=Object.keys(this.points).length;for(var s in this.points)t+=this.points[s].x,i+=this.points[s].y;this.centroid={x:t/o,y:i/o}},t.prototype.translate=function(t){for(var i in this.points)this.points[i].x+=t.x,this.points[i].y+=t.y;this.updateCentroid()},t.prototype.rotate=function(t){var i=this,o=function(o){return{x:(o.x-i.centroid.x)*Math.cos(t)+(o.y-i.centroid.y)*Math.sin(t)+i.centroid.x,y:-(o.x-i.centroid.x)*Math.sin(t)+(o.y-i.centroid.y)*Math.cos(t)+i.centroid.y}};for(var s in this.points)this.points[s]=o(this.points[s])},t.prototype.flip=function(t,i){var o=this.centroid.x;this.points.p1.x=o*t-(i.p1.x*t-o),this.points.p2.x=o*t-(i.p2.x*t-o),this.points.p3.x=o*t-(i.p3.x*t-o),"p4"in this.points&&(this.points.p4.x=o*t-(i.p4.x*t-o))},t}();exports.default=t;
},{}],"yglc":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function r(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}(),e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var o=e(require("./TanObject")),r=function(e){function o(t,o,r){var p=e.call(this,t,o,r)||this;return p.points={p1:{x:0,y:0},p2:{x:0,y:p.unit*Math.sqrt(2)/2},p3:{x:p.unit*Math.sqrt(2)/2,y:p.unit*Math.sqrt(2)/2}},p.setEdges(),p.updateCentroid(),p}return t(o,e),o.prototype.rotate=function(t){e.prototype.rotate.call(this,t),this.setEdges()},o.prototype.setEdges=function(){var t=this.points,e=t.p1,o=t.p2,r=t.p3;this.edges.length=0,this.edges.push({pA:e,pB:o,slope:this.updateSlope(e,o)}),this.edges.push({pA:o,pB:r,slope:this.updateSlope(o,r)}),this.edges.push({pA:r,pB:e,slope:this.updateSlope(r,e)})},o.prototype.updateSlope=function(t,e){return Math.round(e.y-t.y)/Math.round(e.x-t.x)},o}(o.default);exports.default=r;
},{"./TanObject":"siWZ"}],"Du5M":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(r,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var e in r)r.hasOwnProperty(e)&&(t[e]=r[e])})(r,e)};return function(r,e){function n(){this.constructor=r}t(r,e),r.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var e=r(require("./TanObject")),n=function(r){function e(t,e,n){var o=r.call(this,t,e,n)||this;return o.points={p1:{x:0,y:0},p2:{x:0,y:e*Math.sqrt(2)/4},p3:{x:e*Math.sqrt(2)/4,y:e*Math.sqrt(2)/4},p4:{x:e*Math.sqrt(2)/4,y:0}},o.updateCentroid(),o}return t(e,r),e}(e.default);exports.default=n;
},{"./TanObject":"siWZ"}],"cqiq":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var r=e(require("./TanObject")),n=function(e){function r(t,r,n){var o=e.call(this,t,r,n)||this,u=.25*r;return o.points={p1:{x:u,y:0},p2:{x:0,y:u},p3:{x:o.unit/2,y:u},p4:{x:u+o.unit/2,y:0}},o.updateCentroid(),o}return t(r,e),r}(r.default);exports.default=n;
},{"./TanObject":"siWZ"}],"g5IB":[function(require,module,exports) {

var t,e,n=module.exports={};function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(e){if(t===setTimeout)return setTimeout(e,0);if((t===r||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}function u(t){if(e===clearTimeout)return clearTimeout(t);if((e===o||!e)&&clearTimeout)return e=clearTimeout,clearTimeout(t);try{return e(t)}catch(n){try{return e.call(null,t)}catch(n){return e.call(this,t)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:r}catch(n){t=r}try{e="function"==typeof clearTimeout?clearTimeout:o}catch(n){e=o}}();var c,s=[],l=!1,a=-1;function f(){l&&c&&(l=!1,c.length?s=c.concat(s):a=-1,s.length&&h())}function h(){if(!l){var t=i(f);l=!0;for(var e=s.length;e;){for(c=s,s=[];++a<e;)c&&c[a].run();a=-1,e=s.length}c=null,l=!1,u(t)}}function m(t,e){this.fun=t,this.array=e}function p(){}n.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];s.push(new m(t,e)),1!==s.length||l||i(h)},m.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.env={},n.argv=[],n.version="",n.versions={},n.on=p,n.addListener=p,n.once=p,n.off=p,n.removeListener=p,n.removeAllListeners=p,n.emit=p,n.prependListener=p,n.prependOnceListener=p,n.listeners=function(t){return[]},n.binding=function(t){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(t){throw new Error("process.chdir is not supported")},n.umask=function(){return 0};
},{}],"K2Ra":[function(require,module,exports) {
var define;
var global = arguments[3];
var process = require("process");
var t,n=arguments[3],e=require("process");function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}!function(n,e){"object"===("undefined"==typeof exports?"undefined":i(exports))&&"undefined"!=typeof module?module.exports=e():"function"==typeof t&&t.amd?t(e):n.TWEEN=e()}(this,function(){"use strict";var t=function(){this._tweens={},this._tweensAddedDuringUpdate={}};t.prototype={getAll:function(){return Object.keys(this._tweens).map(function(t){return this._tweens[t]}.bind(this))},removeAll:function(){this._tweens={}},add:function(t){this._tweens[t.getId()]=t,this._tweensAddedDuringUpdate[t.getId()]=t},remove:function(t){delete this._tweens[t.getId()],delete this._tweensAddedDuringUpdate[t.getId()]},update:function(t,n){var e=Object.keys(this._tweens);if(0===e.length)return!1;for(t=void 0!==t?t:i.now();e.length>0;){this._tweensAddedDuringUpdate={};for(var r=0;r<e.length;r++){var s=this._tweens[e[r]];s&&!1===s.update(t)&&(s._isPlaying=!1,n||delete this._tweens[e[r]])}e=Object.keys(this._tweensAddedDuringUpdate)}return!0}};var n,i=new t;return i.Group=t,i._nextId=0,i.nextId=function(){return i._nextId++},"undefined"==typeof self&&void 0!==e&&e.hrtime?i.now=function(){var t=e.hrtime();return 1e3*t[0]+t[1]/1e6}:"undefined"!=typeof self&&void 0!==self.performance&&void 0!==self.performance.now?i.now=self.performance.now.bind(self.performance):void 0!==Date.now?i.now=Date.now:i.now=function(){return(new Date).getTime()},i.Tween=function(t,n){this._isPaused=!1,this._pauseStart=null,this._object=t,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._repeat=0,this._repeatDelayTime=void 0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=null,this._easingFunction=i.Easing.Linear.None,this._interpolationFunction=i.Interpolation.Linear,this._chainedTweens=[],this._onStartCallback=null,this._onStartCallbackFired=!1,this._onUpdateCallback=null,this._onRepeatCallback=null,this._onCompleteCallback=null,this._onStopCallback=null,this._group=n||i,this._id=i.nextId()},i.Tween.prototype={getId:function(){return this._id},isPlaying:function(){return this._isPlaying},isPaused:function(){return this._isPaused},to:function(t,n){return this._valuesEnd=Object.create(t),void 0!==n&&(this._duration=n),this},duration:function(t){return this._duration=t,this},start:function(t){for(var n in this._group.add(this),this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._startTime=void 0!==t?"string"==typeof t?i.now()+parseFloat(t):t:i.now(),this._startTime+=this._delayTime,this._valuesEnd){if(this._valuesEnd[n]instanceof Array){if(0===this._valuesEnd[n].length)continue;this._valuesEnd[n]=[this._object[n]].concat(this._valuesEnd[n])}void 0!==this._object[n]&&(void 0===this._valuesStart[n]&&(this._valuesStart[n]=this._object[n]),this._valuesStart[n]instanceof Array==!1&&(this._valuesStart[n]*=1),this._valuesStartRepeat[n]=this._valuesStart[n]||0)}return this},stop:function(){return this._isPlaying?(this._group.remove(this),this._isPlaying=!1,this._isPaused=!1,null!==this._onStopCallback&&this._onStopCallback(this._object),this.stopChainedTweens(),this):this},end:function(){return this.update(1/0),this},pause:function(t){return this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=void 0===t?i.now():t,this._group.remove(this),this)},resume:function(t){return this._isPaused&&this._isPlaying?(this._isPaused=!1,this._startTime+=(void 0===t?i.now():t)-this._pauseStart,this._pauseStart=0,this._group.add(this),this):this},stopChainedTweens:function(){for(var t=0,n=this._chainedTweens.length;t<n;t++)this._chainedTweens[t].stop()},group:function(t){return this._group=t,this},delay:function(t){return this._delayTime=t,this},repeat:function(t){return this._repeat=t,this},repeatDelay:function(t){return this._repeatDelayTime=t,this},yoyo:function(t){return this._yoyo=t,this},easing:function(t){return this._easingFunction=t,this},interpolation:function(t){return this._interpolationFunction=t,this},chain:function(){return this._chainedTweens=arguments,this},onStart:function(t){return this._onStartCallback=t,this},onUpdate:function(t){return this._onUpdateCallback=t,this},onRepeat:function(t){return this._onRepeatCallback=t,this},onComplete:function(t){return this._onCompleteCallback=t,this},onStop:function(t){return this._onStopCallback=t,this},update:function(t){var n,e,i;if(t<this._startTime)return!0;for(n in!1===this._onStartCallbackFired&&(null!==this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),e=(t-this._startTime)/this._duration,e=0===this._duration||e>1?1:e,i=this._easingFunction(e),this._valuesEnd)if(void 0!==this._valuesStart[n]){var r=this._valuesStart[n]||0,s=this._valuesEnd[n];s instanceof Array?this._object[n]=this._interpolationFunction(s,i):("string"==typeof s&&(s="+"===s.charAt(0)||"-"===s.charAt(0)?r+parseFloat(s):parseFloat(s)),"number"==typeof s&&(this._object[n]=r+(s-r)*i))}if(null!==this._onUpdateCallback&&this._onUpdateCallback(this._object,e),1===e){if(this._repeat>0){for(n in isFinite(this._repeat)&&this._repeat--,this._valuesStartRepeat){if("string"==typeof this._valuesEnd[n]&&(this._valuesStartRepeat[n]=this._valuesStartRepeat[n]+parseFloat(this._valuesEnd[n])),this._yoyo){var a=this._valuesStartRepeat[n];this._valuesStartRepeat[n]=this._valuesEnd[n],this._valuesEnd[n]=a}this._valuesStart[n]=this._valuesStartRepeat[n]}return this._yoyo&&(this._reversed=!this._reversed),void 0!==this._repeatDelayTime?this._startTime=t+this._repeatDelayTime:this._startTime=t+this._delayTime,null!==this._onRepeatCallback&&this._onRepeatCallback(this._object),!0}null!==this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var o=0,u=this._chainedTweens.length;o<u;o++)this._chainedTweens[o].start(this._startTime+this._duration);return!1}return!0}},i.Easing={Linear:{None:function(t){return t}},Quadratic:{In:function(t){return t*t},Out:function(t){return t*(2-t)},InOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)}},Cubic:{In:function(t){return t*t*t},Out:function(t){return--t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)}},Quartic:{In:function(t){return t*t*t*t},Out:function(t){return 1- --t*t*t*t},InOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)}},Quintic:{In:function(t){return t*t*t*t*t},Out:function(t){return--t*t*t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}},Sinusoidal:{In:function(t){return 1-Math.cos(t*Math.PI/2)},Out:function(t){return Math.sin(t*Math.PI/2)},InOut:function(t){return.5*(1-Math.cos(Math.PI*t))}},Exponential:{In:function(t){return 0===t?0:Math.pow(1024,t-1)},Out:function(t){return 1===t?1:1-Math.pow(2,-10*t)},InOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))}},Circular:{In:function(t){return 1-Math.sqrt(1-t*t)},Out:function(t){return Math.sqrt(1- --t*t)},InOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}},Elastic:{In:function(t){return 0===t?0:1===t?1:-Math.pow(2,10*(t-1))*Math.sin(5*(t-1.1)*Math.PI)},Out:function(t){return 0===t?0:1===t?1:Math.pow(2,-10*t)*Math.sin(5*(t-.1)*Math.PI)+1},InOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?-.5*Math.pow(2,10*(t-1))*Math.sin(5*(t-1.1)*Math.PI):.5*Math.pow(2,-10*(t-1))*Math.sin(5*(t-1.1)*Math.PI)+1}},Back:{In:function(t){var n=1.70158;return t*t*((n+1)*t-n)},Out:function(t){var n=1.70158;return--t*t*((n+1)*t+n)+1},InOut:function(t){var n=2.5949095;return(t*=2)<1?t*t*((n+1)*t-n)*.5:.5*((t-=2)*t*((n+1)*t+n)+2)}},Bounce:{In:function(t){return 1-i.Easing.Bounce.Out(1-t)},Out:function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},InOut:function(t){return t<.5?.5*i.Easing.Bounce.In(2*t):.5*i.Easing.Bounce.Out(2*t-1)+.5}}},i.Interpolation={Linear:function(t,n){var e=t.length-1,r=e*n,s=Math.floor(r),a=i.Interpolation.Utils.Linear;return n<0?a(t[0],t[1],r):n>1?a(t[e],t[e-1],e-r):a(t[s],t[s+1>e?e:s+1],r-s)},Bezier:function(t,n){for(var e=0,r=t.length-1,s=Math.pow,a=i.Interpolation.Utils.Bernstein,o=0;o<=r;o++)e+=s(1-n,r-o)*s(n,o)*t[o]*a(r,o);return e},CatmullRom:function(t,n){var e=t.length-1,r=e*n,s=Math.floor(r),a=i.Interpolation.Utils.CatmullRom;return t[0]===t[e]?(n<0&&(s=Math.floor(r=e*(1+n))),a(t[(s-1+e)%e],t[s],t[(s+1)%e],t[(s+2)%e],r-s)):n<0?t[0]-(a(t[0],t[0],t[1],t[1],-r)-t[0]):n>1?t[e]-(a(t[e],t[e],t[e-1],t[e-1],r-e)-t[e]):a(t[s?s-1:0],t[s],t[e<s+1?e:s+1],t[e<s+2?e:s+2],r-s)},Utils:{Linear:function(t,n,e){return(n-t)*e+t},Bernstein:function(t,n){var e=i.Interpolation.Utils.Factorial;return e(t)/e(n)/e(t-n)},Factorial:(n=[1],function(t){var e=1;if(n[t])return n[t];for(var i=t;i>1;i--)e*=i;return n[t]=e,e}),CatmullRom:function(t,n,e,i,r){var s=.5*(e-t),a=.5*(i-n),o=r*r;return(2*n-2*e+s+a)*(r*o)+(-3*n+3*e-2*s-a)*o+s*r+n}}},i.version="18.5.0",i});
},{"process":"g5IB"}],"D6Wl":[function(require,module,exports) {
"use strict";var t=this&&this.__assign||function(){return(t=Object.assign||function(t){for(var e,s=1,i=arguments.length;s<i;s++)for(var a in e=arguments[s])Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t}).apply(this,arguments)},e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var s=e(require("./BaseTriangle")),i=e(require("./Square")),a=e(require("./Parallel")),n=e(require("../lib/tween.umd")),h=function(){function e(t,e){var s=this;this.shapes=[],this.selDistToShps=[],this.animate=function(t){requestAnimationFrame(s.animate),n.default.update(t)},this.dpi=window.devicePixelRatio,void 0!==window.orientation&&(this.dpi=2),this.canvas=t,this.canvas.width=document.documentElement.clientWidth*this.dpi,this.canvas.height=document.documentElement.clientHeight*this.dpi,this.ctx=this.canvas.getContext("2d"),this.unit=e}return e.prototype.initGame=function(){this.canvas.oncontextmenu=function(t){return t.preventDefault()},this.setCanvasSize(),this.setHandlers(),this.createTamObjects(),this.setInitialLayout(),this.drawObjects()},e.prototype.setCanvasSize=function(){this.canvas.width=document.documentElement.clientWidth*this.dpi,this.canvas.height=document.documentElement.clientHeight*this.dpi},e.prototype.setHandlers=function(){var e,s,i=this,a=!1,h=!1,u=0,r=null,c=void 0!==window.ontouchstart;this.canvas.addEventListener(c?"touchstart":"mousedown",function(s){var c;if(function(t){var e={x:t.clientX*i.dpi,y:t.clientY*i.dpi},s=i.ctx.getImageData(e.x,e.y,1,1).data,a="rgb("+s[0]+", "+s[1]+", "+s[2]+")";return i.shapes.forEach(function(t,e){if(a===t.fill)i.selShpIndex=e;else if("rgb(0, 0, 0)"===a)return i.selShpIndex=null,!1}),i.shapes.forEach(function(t){t.stroke="black",t.draw(i.ctx)}),null!==i.selShpIndex&&(i.shapes.push(i.shapes.splice(i.selShpIndex,1)[0]),i.selShpIndex=i.shapes.length-1,i.shapes[i.selShpIndex].stroke="red",i.shapes[i.selShpIndex].draw(i.ctx)),!0}(c="touchstart"==s.type?s.touches[0]:s)){r=setTimeout(function(){h=!0;var e={value:-1},s=i.selShpIndex,a={};for(var u in i.shapes[s].points)a[u]=t({},i.shapes[s].points[u]);new n.default.Tween(e).to({value:1},300).easing(n.default.Easing.Quadratic.Out).onUpdate(function(){i.shapes[s].flip(e.value,a),i.ctx.clearRect(0,0,i.canvas.width,i.canvas.height),i.drawObjects()}).onComplete(function(){h=!1}).start(),requestAnimationFrame(i.animate)},500),null!==i.selShpIndex&&(e={x:c.clientX*i.dpi,y:c.clientY*i.dpi},a=!0);var o=(new Date).getTime(),l=o-u;if(l<300&&l>0&&null!==i.selShpIndex){var p={theta:0},d=i.selShpIndex,v=0;new n.default.Tween(p).to({theta:45*Math.PI/180},300).easing(n.default.Easing.Quadratic.Out).onUpdate(function(){i.shapes[d].rotate(p.theta-v),v=p.theta,i.ctx.clearRect(0,0,i.canvas.width,i.canvas.height),i.drawObjects()}).onComplete(function(){}).start(),requestAnimationFrame(i.animate)}u=o}}),this.canvas.addEventListener(c?"touchmove":"mousemove",function(t){if(!h){r&&(clearTimeout(r),r=null);var n=void 0;n="touchmove"==t.type?t.touches[0]:t,a&&(s={x:n.clientX*i.dpi,y:n.clientY*i.dpi},i.shapes[i.selShpIndex].translate({x:s.x-e.x,y:s.y-e.y}),e=s,i.ctx.clearRect(0,0,i.canvas.width,i.canvas.height),i.drawObjects())}}),this.canvas.addEventListener(c?"touchend":"mouseup",function(){r&&(clearTimeout(r),r=null),a&&(a=!1,i.selShpIndex=null,i.shapes.forEach(function(t){t.stroke="black",t.lineWidth=4}),i.drawObjects())})},e.prototype.createTamObjects=function(){this.shapes.push(new s.default("LgTriA",this.unit,"rgb(230, 30, 70)")),this.shapes.push(new s.default("LgTriB",this.unit,"rgb(235, 200, 45)")),this.shapes.push(new s.default("SmTriA",this.unit/2,"rgb(85, 70, 180)")),this.shapes.push(new s.default("SmTriB",this.unit/2,"rgb(220, 130, 180)")),this.shapes.push(new s.default("MdTri",this.unit*Math.sqrt(2)/2,"rgb(25, 150, 225)")),this.shapes.push(new i.default("Square",this.unit,"rgb(100, 200, 165)")),this.shapes.push(new a.default("Parallel",this.unit,"rgb(140, 200, 50)"))},e.prototype.setInitialLayout=function(){this.shapes[0].rotate(u(135)),this.shapes[0].translate({x:this.canvas.width/2-.56875*this.unit,y:this.canvas.height/2-.471875*this.unit}),this.shapes[1].rotate(u(45)),this.shapes[1].translate({x:this.canvas.width/2-this.unit*(30.15/128),y:this.canvas.height/2-.80625*this.unit}),this.shapes[2].rotate(u(-45)),this.shapes[2].translate({x:this.canvas.width/2+this.unit*(38.3/128),y:this.canvas.height/2-this.unit*(62.3/128)}),this.shapes[3].rotate(u(225)),this.shapes[3].translate({x:this.canvas.width/2-this.unit*(15/128),y:this.canvas.height/2-this.unit*(8.9/128)}),this.shapes[4].rotate(u(90)),this.shapes[4].translate({x:this.canvas.width/2+.1671875*this.unit,y:this.canvas.height/2}),this.shapes[5].rotate(u(45)),this.shapes[5].translate({x:this.canvas.width/2+this.unit*(9.4/128),y:this.canvas.height/2-this.unit*(22.7/128)}),this.shapes[6].translate({x:this.canvas.width/2-.5*this.unit,y:this.canvas.height/2+.25*this.unit})},e.prototype.drawObjects=function(){var t=this;this.shapes.forEach(function(e){e.draw(t.ctx)})},e}();function u(t){return t*Math.PI/180}exports.default=h;
},{"./BaseTriangle":"yglc","./Square":"Du5M","./Parallel":"cqiq","../lib/tween.umd":"K2Ra"}],"B6dB":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./objects/TanGame"));document.addEventListener("touchmove",function(e){e.preventDefault()},{passive:!1});var n=document.getElementById("app"),a=new t.default(n,400);a.initGame(),window.onresize=function(){a.setCanvasSize(),a.ctx.clearRect(0,0,n.width,n.height),a.drawObjects()};
},{"./objects/TanGame":"D6Wl"}]},{},["B6dB"], null)
//# sourceMappingURL=/src.45aee7e9.js.map