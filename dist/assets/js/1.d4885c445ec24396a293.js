webpackJsonp([1],{"/egZ":function(e,n,t){"use strict";function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var n;this.promise=new Promise(function(e){n=e});var t=this;e(function(e){t.reason||(t.reason=new r(e),n(t.reason))})}var r=t("fEpO");o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o(function(n){e=n}),cancel:e}},e.exports=o},"1Rfl":function(e,n,t){"use strict";var o=t("8r5Y");e.exports=function(e,n,t){return o.forEach(t,function(t){e=t(e,n)}),e}},"2WZl":function(e,n,t){"use strict";var o=t("8r5Y");e.exports=o.isStandardBrowserEnv()?function(){function e(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}var n,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");return n=e(window.location.href),function(t){var r=o.isString(t)?e(t):t;return r.protocol===n.protocol&&r.host===n.host}}():function(){return function(){return!0}}()},"4A9Y":function(e,n,t){"use strict";e.exports=function(e,n){return function(){for(var t=new Array(arguments.length),o=0;o<t.length;o++)t[o]=arguments[o];return e.apply(n,t)}}},"4GjL":function(e,n,t){e.exports=t.p+"assets/img/logo.531aef7.jpg"},"4YfN":function(e,n,t){"use strict";n.__esModule=!0;var o=t("aA9S"),r=function(e){return e&&e.__esModule?e:{default:e}}(o);n.default=r.default||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e}},"4pJO":function(e,n,t){"use strict";var o=t("8r5Y");e.exports=function(e,n){o.forEach(e,function(t,o){o!==n&&o.toUpperCase()===n.toUpperCase()&&(e[n]=t,delete e[o])})}},"52VU":function(e,n,t){var o=t("beb9");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);t("FIqI")("62f2af2a",o,!0,{})},"5SCX":function(e,n){function t(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function o(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&t(e.slice(0,0))}/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&(t(e)||o(e)||!!e._isBuffer)}},"8r5Y":function(e,n,t){"use strict";function o(e){return"[object Array]"===k.call(e)}function r(e){return"[object ArrayBuffer]"===k.call(e)}function i(e){return"undefined"!=typeof FormData&&e instanceof FormData}function a(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function s(e){return"string"==typeof e}function u(e){return"number"==typeof e}function c(e){return void 0===e}function f(e){return null!==e&&"object"==typeof e}function l(e){return"[object Date]"===k.call(e)}function d(e){return"[object File]"===k.call(e)}function p(e){return"[object Blob]"===k.call(e)}function h(e){return"[object Function]"===k.call(e)}function g(e){return f(e)&&h(e.pipe)}function m(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function v(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function b(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function x(e,n){if(null!==e&&void 0!==e)if("object"!=typeof e&&(e=[e]),o(e))for(var t=0,r=e.length;t<r;t++)n.call(null,e[t],t,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&n.call(null,e[i],i,e)}function A(){function e(e,t){"object"==typeof n[t]&&"object"==typeof e?n[t]=A(n[t],e):n[t]=e}for(var n={},t=0,o=arguments.length;t<o;t++)x(arguments[t],e);return n}function w(e,n,t){return x(n,function(n,o){e[o]=t&&"function"==typeof n?y(n,t):n}),e}var y=t("4A9Y"),C=t("5SCX"),k=Object.prototype.toString;e.exports={isArray:o,isArrayBuffer:r,isBuffer:C,isFormData:i,isArrayBufferView:a,isString:s,isNumber:u,isObject:f,isUndefined:c,isDate:l,isFile:d,isBlob:p,isFunction:h,isStream:g,isURLSearchParams:m,isStandardBrowserEnv:b,forEach:x,merge:A,extend:w,trim:v}},"9JTW":function(e,n,t){"use strict";e.exports=function(e){return function(n){return e.apply(null,n)}}},AGL3:function(e,n){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACPElEQVRYR8WWjVHCQBCF72hArIBYgaEDrEAq0FiBUAFYgXSQdGCsQOwAKzB2gA14vndeZgLkshsc5WacjGRv99v/WHPiY09s3xwNkOQuNQMz8g5Ys61u7OsxzvQGgOEZDC6MMx8wuA1Gh/hthL9VdWsf+oCoAWCYRp5gmHdm1Z3dNA3hfYL/Vx7EmSu8r+E6efoAlPQYirMujQApAHFZZXasiYQKAEqn9A7G6aV4IL+GUAH5QhLWAtB7KuRTPB4YdaKJgg6gcA55PdfmlYQJ7gBA1C8K9FG2V5QsUhYr0xE9fwnALkgBUP0eIHdUMt1vvZji0JIbyA+lgtFFIHcrKoLCmaTQpyx3Sz6klqWsFoCeMAoTKQp+RFvzgqIdS+FXAwSvMjwZiShEw/hcMwPUAH4MD8y9+TJzXFpCuU/J/vF7Au8h+6jdCWIKwg5gSD+hPJPCGgqwRBo4O8Sd0AnQMP6mKahmRLQ7QQJgqNnLE031t6Rkjd/YjtHuiQLUvRzaSbVaWwDq7okOpC6AAgq5flW9H4uQT0WHni4A1SiVUiNNxVYAf8mad802kwD8DPnZphdtHRQDYNGx348qvpZaiG7G/wJgN9AhPndODCCFVKn9BJPSgJRG66mrCCso5uQ7oJYMNt/DONPI70k6dXC6AHixxFxfYAc8SyO4Je8J7l6j+JZhJO98xtfy0iQkNecAPzLP8KQSaShx+KRhd/Ajlt63GieEuIxqUr8XqFh3OH4lUK9JDaCz21/q5ADft2ALMBJKlNgAAAAASUVORK5CYII="},Jo3n:function(e,n,t){"use strict";var o=t("h3QQ");e.exports=function(e,n,t){var r=t.config.validateStatus;t.status&&r&&!r(t.status)?n(o("Request failed with status code "+t.status,t.config,null,t.request,t)):e(t)}},JotW:function(e,n,t){"use strict";function o(e){this.defaults=e,this.interceptors={request:new a,response:new a}}var r=t("hN2N"),i=t("8r5Y"),a=t("Lv47"),s=t("OtkV");o.prototype.request=function(e){"string"==typeof e&&(e=i.merge({url:arguments[0]},arguments[1])),e=i.merge(r,{method:"get"},this.defaults,e),e.method=e.method.toLowerCase();var n=[s,void 0],t=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){n.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){n.push(e.fulfilled,e.rejected)});n.length;)t=t.then(n.shift(),n.shift());return t},i.forEach(["delete","get","head","options"],function(e){o.prototype[e]=function(n,t){return this.request(i.merge(t||{},{method:e,url:n}))}}),i.forEach(["post","put","patch"],function(e){o.prototype[e]=function(n,t,o){return this.request(i.merge(o||{},{method:e,url:n,data:t}))}}),e.exports=o},K3AH:function(e,n,t){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},Lv47:function(e,n,t){"use strict";function o(){this.handlers=[]}var r=t("8r5Y");o.prototype.use=function(e,n){return this.handlers.push({fulfilled:e,rejected:n}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,function(n){null!==n&&e(n)})},e.exports=o},NeoC:function(e,n){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACSUlEQVRYR+VX23HCMBA8pwHoANIBHQQqACoAOiAVQCoIVIBTQUgFIRVAB3E6oII4u7LMyEayhIaBj3iGx6DH7u3pVkcid36SO+NLNIHuJu9i9UIFkMtLNkuymGAuJmAATwH8o0AT6eA9jSESTMACvETUKfExNsXHMoaIl0ATcF3yGCJOAtisjYheAVJKfYrYl2uDSAt7rORX1lDraFtnJYANelj4iZxyfF5K7QO2KDLXqfnGXgMbCReB8kT3XMxDyahgRHYIZZ9Nk0F93RkBLOjr6GexkVuVYDoLFXbmeBOBs8mhUVsIlEH9EwK6CrqQe6l94nYKKPBENsg3S49VQKO6DQED/A3gdEf1XIWAMqYHmWSTZG07jC7waxKgOe2x4aFuKgCfK9fMpRL5VRXQkRT5FTkCbMyaBniK3yYu8BgFeM+X1lkxjdNmIlvMaSmHE+k3gdcIPNb7BrsVp3mOTZ8xeeXIN+2VJDo+cE2AV/UCVnyG57oLDliYgcDI5X7qUCJ6zNn6HBJzqVQbc0m88rgIlLV8JpkPrD6u+wmm1KqoiwCjy3gpQbbxpaDmfBCgQozcerM2NSQjEHgH8+hb0fAGVow1VY0tmS6xoa57novgRzc1e98hDekJWeckoeo+hAHAqR7vgw/Tkm1rvQR0GRVmk6A9c1hxubnPFYOqwFH7qpYxRivmia6ooS8cNrE9/f9gGaJWkAJGdDzNKxB5UkRYKahv/SLwF76ziQ0+LxcRMIhM8Z15HqrfCuA0poeMIhAibeicuxP4AxUMgjBTIEdLAAAAAElFTkSuQmCC"},Oa1u:function(e,n,t){"use strict";e.exports=function(e,n,t,o,r){return e.config=n,t&&(e.code=t),e.request=o,e.response=r,e}},OtkV:function(e,n,t){"use strict";function o(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var r=t("8r5Y"),i=t("1Rfl"),a=t("K3AH"),s=t("hN2N"),u=t("jzYM"),c=t("YDtG");e.exports=function(e){return o(e),e.baseURL&&!u(e.url)&&(e.url=c(e.baseURL,e.url)),e.headers=e.headers||{},e.data=i(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),r.forEach(["delete","get","head","post","put","patch","common"],function(n){delete e.headers[n]}),(e.adapter||s.adapter)(e).then(function(n){return o(e),n.data=i(n.data,n.headers,e.transformResponse),n},function(n){return a(n)||(o(e),n&&n.response&&(n.response.data=i(n.response.data,n.response.headers,e.transformResponse))),Promise.reject(n)})}},Quw4:function(e,n,t){"use strict";function o(e){t("52VU")}Object.defineProperty(n,"__esModule",{value:!0});var r=t("4YfN"),i=t.n(r),a=t("7QWq"),s=t("jcj8"),u=t.n(s),c=t("9rMa"),f=(t("ukYY"),t("Du/2"),{props:["login"],data:function(){return{title:"登录-码号商城",loginType:1,count:0,form:{phone:"",authCode:""}}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:"登录-码号商城"}]}},mounted:function(){},beforeDestroy:function(){this.initForm()},methods:i()({},Object(c.mapMutations)(["SET_USERINFO"]),{shiftLoginType:function(e){this.loginType=e,this.initForm()},initForm:function(){clearInterval(window.Timer),this.form={phone:"",authCode:""},this.count=0},identifyBtnClick:function(){var e=this;if(!e.form.phone.match(/^1(3|4|5|7|8|9)\d{9}$/))return Object(a.errorDeal)("手机号码格式错误"),!1;u.a.getIdentifyCode({phone:e.form.phone}).then(function(n){e.countDown(120)}).catch(function(e){})},actionLogin:function(){var e=this,n=this,t="";if(n.form.phone.match(/^1(3|4|5|7|8|9)\d{9}$/)?n.form.authCode||(t="请输入验证码"):t="手机号码格式错误",t)return Object(a.errorDeal)(t),!1;u.a.actionMagLogin({phone:n.form.phone,authCode:n.form.authCode}).then(function(t){t.data.phone=n.form.phone,t.data.departName="",e.SET_USERINFO(t.data),Object(a.windowJump)("#/home")}).catch(function(e){Object(a.errorDeal)(e)})},toLogin:function(e){13==e.keyCode&&this.actionLogin()},countDown:function(e){var n=this;n.count=e,window.Timer=setInterval(function(){var e=n.count;if(!e)return clearInterval(window.Timer),!1;e--,n.count=e},1e3)}})}),l=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("section",{staticClass:"g-login"},[e._m(0),e._v(" "),t("div",{staticClass:"login-box"},[t("div",{staticClass:"inner"},[t("div",{staticClass:"row"},[t("span",{staticClass:"left u-icon-user"}),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.phone,expression:"form.phone"}],attrs:{type:"text",placeholder:"请输入手机号码",maxlength:"11"},domProps:{value:e.form.phone},on:{input:function(n){n.target.composing||e.$set(e.form,"phone",n.target.value)}}})]),e._v(" "),t("div",{staticClass:"row vercode"},[t("span",{staticClass:"left u-icon-reg"}),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.authCode,expression:"form.authCode"}],attrs:{type:"text",placeholder:"请输入验证码",maxlength:"6"},domProps:{value:e.form.authCode},on:{keydown:e.toLogin,input:function(n){n.target.composing||e.$set(e.form,"authCode",n.target.value)}}}),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:!e.count,expression:"!count"}],staticClass:"btn",on:{click:e.identifyBtnClick}},[e._v("发送验证码")]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:e.count,expression:"count"}],staticClass:"count"},[e._v(e._s(e.count))])]),e._v(" "),t("button",{on:{click:e.actionLogin}},[e._v("登录")])])])])},d=[function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("div",{staticClass:"top"},[o("img",{attrs:{src:t("4GjL")}})])}],p={render:l,staticRenderFns:d},h=p,g=t("Z0/y"),m=o,v=g(f,h,!1,m,"data-v-8b6f192e",null);n.default=v.exports},Unnl:function(e,n,t){e.exports=t.p+"assets/img/bg_login_all.4ecc7c2.png"},YDtG:function(e,n,t){"use strict";e.exports=function(e,n){return n?e.replace(/\/+$/,"")+"/"+n.replace(/^\/+/,""):e}},ZgoU:function(e,n,t){e.exports=t.p+"assets/img/bg_login_top.35fc1da.jpg"},aozt:function(e,n,t){e.exports=t("z1hY")},beb9:function(e,n,t){var o=t("L4zZ");n=e.exports=t("UTlt")(!1),n.push([e.i,"\ndiv.top[data-v-8b6f192e] {\n  background-color: #fff;\n}\n.u-icon-user[data-v-8b6f192e] {\n  background-image: url("+o(t("AGL3"))+");\n}\n.u-icon-reg[data-v-8b6f192e] {\n  background-image: url("+o(t("NeoC"))+");\n}\n.g-login[data-v-8b6f192e] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n.g-login > .top[data-v-8b6f192e] {\n    height: 0.8rem;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: contain;\n    background-image: url("+o(t("ZgoU"))+");\n}\n.g-login > .top > img[data-v-8b6f192e] {\n      width: 1.4rem;\n      margin: 0.15rem 0 0 0.7rem;\n}\n.g-login > .login-box[data-v-8b6f192e] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    background-color: #2D44A1;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: contain;\n    background-image: url("+o(t("Unnl"))+");\n}\n.g-login > .login-box > .inner[data-v-8b6f192e] {\n      width: 3.3rem;\n      margin: auto;\n      background-color: #fff;\n      text-align: center;\n      position: relative;\n      top: -0.1rem;\n      height: 3rem;\n      padding-top: .5rem;\n}\n.g-login > .login-box > .inner > .shift[data-v-8b6f192e] {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        margin-bottom: 0.5rem;\n}\n.g-login > .login-box > .inner > .shift > .btn[data-v-8b6f192e] {\n          -webkit-box-flex: 1;\n              -ms-flex: 1;\n                  flex: 1;\n          text-align: center;\n          position: relative;\n          font-size: 0.15rem;\n          background-color: #DDDDDD;\n          padding: 0.1rem 0;\n          cursor: pointer;\n}\n.g-login > .login-box > .inner > .shift > .active[data-v-8b6f192e] {\n          color: #2F7AC1;\n          background-color: #fff;\n          font-weight: bold;\n}\n.g-login > .login-box > .inner > .shift > .active > i[data-v-8b6f192e] {\n            position: absolute;\n            display: inline-block;\n            border-top: 0.55rem solid transparent;\n            top: -0.15rem;\n            z-index: 999;\n}\n.g-login > .login-box > .inner > .shift > .active[data-v-8b6f192e]:before {\n          content: '';\n          position: absolute;\n          width: 1.55rem;\n          height: 0.2rem;\n          background-color: #fff;\n          top: -0.15rem;\n}\n.g-login > .login-box > .inner > .shift > .left.active > i[data-v-8b6f192e] {\n          border-left: 0.3rem solid #fff;\n          border-right: 0.3rem solid transparent;\n          right: -0.5rem;\n}\n.g-login > .login-box > .inner > .shift > .left.active[data-v-8b6f192e]:before {\n          left: 0;\n}\n.g-login > .login-box > .inner > .shift > .right.active > i[data-v-8b6f192e] {\n          border-right: 0.3rem solid #fff;\n          border-left: 0.3rem solid transparent;\n          left: -0.5rem;\n}\n.g-login > .login-box > .inner > .shift > .right.active[data-v-8b6f192e]:before {\n          right: 0;\n}\n.g-login > .login-box > .inner > .row[data-v-8b6f192e] {\n        margin-bottom: 0.15rem;\n}\n.g-login > .login-box > .inner > .row > .left[data-v-8b6f192e] {\n          display: inline-block;\n          vertical-align: middle;\n          width: 0.25rem;\n          height: 0.25rem;\n          margin-right: 0.1rem;\n}\n.g-login > .login-box > .inner > .row input[data-v-8b6f192e] {\n          width: 2.3rem;\n          text-indent: 0.15rem;\n          height: 0.4rem;\n          line-height: 0.4rem;\n          border: 1px solid transparent;\n          border-color: #bfcbd9;\n          border-radius: 3px;\n}\n.g-login > .login-box > .inner > .row input[data-v-8b6f192e]:hover {\n            border-color: #20A0FF;\n}\n.g-login > .login-box > .inner > .vercode[data-v-8b6f192e] {\n        position: relative;\n}\n.g-login > .login-box > .inner > .vercode > .btn[data-v-8b6f192e], .g-login > .login-box > .inner > .vercode .count[data-v-8b6f192e] {\n          cursor: pointer;\n          position: absolute;\n          top: 2px;\n          right: 0.35rem;\n          width: 0.9rem;\n          height: 0.35rem;\n          line-height: 0.37rem;\n          border-radius: 3px;\n          color: #fff;\n          background-color: #ffc333;\n          font-size: 0.12rem;\n          overflow: hiddden;\n}\n.g-login > .login-box > .inner > .vercode > .count[data-v-8b6f192e] {\n          cursor: auto;\n          background-color: #ddd;\n          color: #666;\n}\n.g-login > .login-box > .inner button[data-v-8b6f192e] {\n        background-color: #4db3ff;\n        border: 1px solid transparent;\n        border-radius: 3px;\n        color: #fff;\n        width: 2.65rem;\n        height: 0.4rem;\n        line-height: 0.4rem;\n        margin: 0.2rem 0 0.5rem 0;\n        font-size: 0.14rem;\n        cursor: pointer;\n}\n",""])},dd6o:function(e,n,t){"use strict";var o=t("8r5Y"),r=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var n,t,i,a={};return e?(o.forEach(e.split("\n"),function(e){if(i=e.indexOf(":"),n=o.trim(e.substr(0,i)).toLowerCase(),t=o.trim(e.substr(i+1)),n){if(a[n]&&r.indexOf(n)>=0)return;a[n]="set-cookie"===n?(a[n]?a[n]:[]).concat([t]):a[n]?a[n]+", "+t:t}}),a):a}},fEpO:function(e,n,t){"use strict";function o(e){this.message=e}o.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},o.prototype.__CANCEL__=!0,e.exports=o},h3QQ:function(e,n,t){"use strict";var o=t("Oa1u");e.exports=function(e,n,t,r,i){var a=new Error(e);return o(a,n,t,r,i)}},hN2N:function(e,n,t){"use strict";(function(n){function o(e,n){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=n)}var r=t("8r5Y"),i=t("4pJO"),a={"Content-Type":"application/x-www-form-urlencoded"},s={adapter:function(){var e;return"undefined"!=typeof XMLHttpRequest?e=t("lFbO"):void 0!==n&&(e=t("lFbO")),e}(),transformRequest:[function(e,n){return i(n,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(o(n,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)?(o(n,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};s.headers={common:{Accept:"application/json, text/plain, */*"}},r.forEach(["delete","get","head"],function(e){s.headers[e]={}}),r.forEach(["post","put","patch"],function(e){s.headers[e]=r.merge(a)}),e.exports=s}).call(n,t("V0EG"))},jcj8:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=t("uiNu"),r=function(e){return e&&e.__esModule?e:{default:e}}(o);n.default={getIdentifyCode:function(e,n){return(0,r.default)("/ums/w/user/getAuthCode",e,n)},actionLogin:function(e,n){return(0,r.default)("/ums/w/user/login",e,n)},actionMagLogin:function(e,n){return(0,r.default)("/ums/w/user/alogin",e,n)}}},jzYM:function(e,n,t){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},kehZ:function(e,n,t){"use strict";function o(){this.message="String contains an invalid character"}function r(e){for(var n,t,r=String(e),a="",s=0,u=i;r.charAt(0|s)||(u="=",s%1);a+=u.charAt(63&n>>8-s%1*8)){if((t=r.charCodeAt(s+=.75))>255)throw new o;n=n<<8|t}return a}var i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";o.prototype=new Error,o.prototype.code=5,o.prototype.name="InvalidCharacterError",e.exports=r},lFbO:function(e,n,t){"use strict";var o=t("8r5Y"),r=t("Jo3n"),i=t("ur+z"),a=t("dd6o"),s=t("2WZl"),u=t("h3QQ"),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||t("kehZ");e.exports=function(e){return new Promise(function(n,f){var l=e.data,d=e.headers;o.isFormData(l)&&delete d["Content-Type"];var p=new XMLHttpRequest,h="onreadystatechange",g=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in p||s(e.url)||(p=new window.XDomainRequest,h="onload",g=!0,p.onprogress=function(){},p.ontimeout=function(){}),e.auth){var m=e.auth.username||"",v=e.auth.password||"";d.Authorization="Basic "+c(m+":"+v)}if(p.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),p.timeout=e.timeout,p[h]=function(){if(p&&(4===p.readyState||g)&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var t="getAllResponseHeaders"in p?a(p.getAllResponseHeaders()):null,o=e.responseType&&"text"!==e.responseType?p.response:p.responseText,i={data:o,status:1223===p.status?204:p.status,statusText:1223===p.status?"No Content":p.statusText,headers:t,config:e,request:p};r(n,f,i),p=null}},p.onerror=function(){f(u("Network Error",e,null,p)),p=null},p.ontimeout=function(){f(u("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",p)),p=null},o.isStandardBrowserEnv()){var b=t("n/1x"),x=(e.withCredentials||s(e.url))&&e.xsrfCookieName?b.read(e.xsrfCookieName):void 0;x&&(d[e.xsrfHeaderName]=x)}if("setRequestHeader"in p&&o.forEach(d,function(e,n){void 0===l&&"content-type"===n.toLowerCase()?delete d[n]:p.setRequestHeader(n,e)}),e.withCredentials&&(p.withCredentials=!0),e.responseType)try{p.responseType=e.responseType}catch(n){if("json"!==e.responseType)throw n}"function"==typeof e.onDownloadProgress&&p.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){p&&(p.abort(),f(e),p=null)}),void 0===l&&(l=null),p.send(l)})}},"n/1x":function(e,n,t){"use strict";var o=t("8r5Y");e.exports=o.isStandardBrowserEnv()?function(){return{write:function(e,n,t,r,i,a){var s=[];s.push(e+"="+encodeURIComponent(n)),o.isNumber(t)&&s.push("expires="+new Date(t).toGMTString()),o.isString(r)&&s.push("path="+r),o.isString(i)&&s.push("domain="+i),!0===a&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var n=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return n?decodeURIComponent(n[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},uiNu:function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,n,t){var o={};if(t&&t.open?(t.open(),o.close=t.close):o=f.default.prototype.$loading({lock:!1,text:t&&t.text||"Loading",background:"rgba(0, 0, 0, 0)"}),-1==e.indexOf("login")&&-1==e.indexOf("getAuthCode")){var r=(0,p.getStore)("YFD_NMS_INFO");if((0,a.default)(r,n),n=r,!r)return(0,p.windowJump)("/nbs/login"),!1}return new u.default(function(t,r){d.default.post(e,n).then(function(e){o.close(),200==e.data.code?t(e.data):(0,p.errorDeal)(e.data)}).catch(function(e){o.close(),(0,p.errorDeal)(e),r(e)})})}Object.defineProperty(n,"__esModule",{value:!0});var i=t("aA9S"),a=o(i),s=t("rVsN"),u=o(s);n.default=r;var c=t("MVMM"),f=o(c),l=t("aozt"),d=o(l),p=t("7QWq"),h=(0,p.getStore)("YFD_NMS_INFO"),g=void 0;g=h?h.userId:"",d.default.defaults.timeout=1e4,d.default.defaults.headers.post["Content-Type"]="application/json",d.default.defaults.headers.post.mhscAuth="3,0"+g,d.default.interceptors.request.use(function(e){return e},function(e){return u.default.reject(e)}),d.default.interceptors.response.use(function(e){return e},function(e){return u.default.reject(e)})},"ur+z":function(e,n,t){"use strict";function o(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var r=t("8r5Y");e.exports=function(e,n,t){if(!n)return e;var i;if(t)i=t(n);else if(r.isURLSearchParams(n))i=n.toString();else{var a=[];r.forEach(n,function(e,n){null!==e&&void 0!==e&&(r.isArray(e)?n+="[]":e=[e],r.forEach(e,function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),a.push(o(n)+"="+o(e))}))}),i=a.join("&")}return i&&(e+=(-1===e.indexOf("?")?"?":"&")+i),e}},z1hY:function(e,n,t){"use strict";function o(e){var n=new a(e),t=i(a.prototype.request,n);return r.extend(t,a.prototype,n),r.extend(t,n),t}var r=t("8r5Y"),i=t("4A9Y"),a=t("JotW"),s=t("hN2N"),u=o(s);u.Axios=a,u.create=function(e){return o(r.merge(s,e))},u.Cancel=t("fEpO"),u.CancelToken=t("/egZ"),u.isCancel=t("K3AH"),u.all=function(e){return Promise.all(e)},u.spread=t("9JTW"),e.exports=u,e.exports.default=u}});