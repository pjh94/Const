(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[866],{8274:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dapp",function(){return n(9027)}])},9027:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return _}});var r=n(4051),c=n.n(r),o=n(5893),a=n(7294),u=n(1664),i=n(2416);function s(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function f(e,t,n,r,c,o,a){try{var u=e[o](a),i=u.value}catch(s){return void n(s)}u.done?t(i):Promise.resolve(i).then(r,c)}function l(e){return function(){var t=this,n=arguments;return new Promise((function(r,c){var o=e.apply(t,n);function a(e){f(o,r,c,a,u,"next",e)}function u(e){f(o,r,c,a,u,"throw",e)}a(void 0)}))}}function p(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function v(e){return v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},v(e)}function b(e,t){return!t||"object"!==w(t)&&"function"!==typeof t?s(e):t}function y(e,t){return y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},y(e,t)}var w=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function x(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=v(e);if(t){var c=v(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return b(this,n)}}var j=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}(i,e);var t,n,r,a=x(i);function i(){var e;p(this,i),d(s(e=a.apply(this,arguments)),"state",{balance:void 0,ethBalance:void 0});var t=s(e);d(s(e),"storeValue",l(c().mark((function e(){var n,r,o;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.props,r=n.accounts,o=n.contract,e.next=3,o.methods.set(5).send({from:r[0]});case 3:alert("Stored 5 into account");case 4:case"end":return e.stop()}}),e)}))));var n=s(e);d(s(e),"getValue",l(c().mark((function e(){var t,r,o,a;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.props,r=t.accounts,o=t.contract,e.next=3,o.methods.get().call({from:r[0]});case 3:a=e.sent,n.setState({balance:a});case 5:case"end":return e.stop()}}),e)}))));var r=s(e);return d(s(e),"getEthBalance",l(c().mark((function e(){var t,n,o,a;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.props,n=t.web3,o=t.accounts,e.next=3,n.eth.getBalance(o[0]);case 3:a=e.sent,r.setState({ethBalance:a/1e18});case 5:case"end":return e.stop()}}),e)})))),e}return t=i,(n=[{key:"render",value:function(){var e=this.state,t=e.balance,n=void 0===t?"N/A":t,r=e.ethBalance,c=void 0===r?"N/A":r;return(0,o.jsxs)("div",{children:[(0,o.jsx)("h1",{children:"My Dapp"}),(0,o.jsx)("button",{onClick:this.storeValue,children:"Store 5 into account balance"}),(0,o.jsx)("button",{onClick:this.getValue,children:"Get account balance"}),(0,o.jsx)("button",{onClick:this.getEthBalance,children:"Get ether balance"}),(0,o.jsxs)("div",{children:["Account Balance: ",n]}),(0,o.jsxs)("div",{children:["Ether Balance: ",c]}),(0,o.jsx)("div",{children:(0,o.jsx)(u.default,{href:"/accounts",children:(0,o.jsx)("a",{children:"My Accounts"})})}),(0,o.jsx)("div",{children:(0,o.jsx)(u.default,{href:"/",children:(0,o.jsx)("a",{children:"Home"})})})]})}}])&&h(t.prototype,n),r&&h(t,r),i}(a.Component);function _(){return(0,o.jsx)(i.Z,{renderLoading:function(){return(0,o.jsx)("div",{children:"Loading Dapp Page..."})},render:function(e){var t=e.web3,n=e.accounts,r=e.contract;return(0,o.jsx)(j,{accounts:n,contract:r,web3:t})}})}}},function(e){e.O(0,[482,714,661,897,774,888,179],(function(){return t=8274,e(e.s=t);var t}));var t=e.O();_N_E=t}]);