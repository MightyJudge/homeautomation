(function(e){function t(t){for(var r,o,c=t[0],s=t[1],u=t[2],l=0,f=[];l<c.length;l++)o=c[l],a[o]&&f.push(a[o][0]),a[o]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);d&&d(t);while(f.length)f.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(r=!1)}r&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},o={app:0},a={app:0},i=[];function c(e){return s.p+"js/"+({about:"about"}[e]||e)+"."+{about:"4edefb08"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={about:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise(function(t,n){for(var r="css/"+({about:"about"}[e]||e)+"."+{about:"cc31d190"}[e]+".css",a=s.p+r,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var u=i[c],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===r||l===a))return t()}var f=document.getElementsByTagName("style");for(c=0;c<f.length;c++){u=f[c],l=u.getAttribute("data-href");if(l===r||l===a)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.request=r,delete o[e],d.parentNode.removeChild(d),n(i)},d.href=a;var v=document.getElementsByTagName("head")[0];v.appendChild(d)}).then(function(){o[e]=0}));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise(function(t,n){r=a[e]=[t,n]});t.push(r[2]=i);var u,l=document.getElementsByTagName("head")[0],f=document.createElement("script");f.charset="utf-8",f.timeout=120,s.nc&&f.setAttribute("nonce",s.nc),f.src=c(e),u=function(t){f.onerror=f.onload=null,clearTimeout(d);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+r+": "+o+")");i.type=r,i.request=o,n[1](i)}a[e]=void 0}};var d=setTimeout(function(){u({type:"timeout",target:f})},12e4);f.onerror=f.onload=u,l.appendChild(f)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var f=0;f<u.length;f++)t(u[f]);var d=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"1e10":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("v-card",{staticClass:"d-flex",attrs:{light:"",hover:"","text-xs-center":"",wrap:""}},[n("v-container",{attrs:{"text-xs-center":""}},[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{"d-flex":"",xs2:""}},[n("v-icon",{attrs:{"x-large":"",dark:"",left:"",color:e.color},on:{click:e.doSwitch}},[e._v("wb_incandescent")])],1),n("v-flex",{attrs:{"d-flex":"",xs10:""}},[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{"d-flex":"",xs12:""}},[n("div",{staticClass:"font-weight-bold",attrs:{"text-xs-center":""}},[e._v("\n              "+e._s(e.device.name)+"\n              ")])]),n("v-flex",{attrs:{"d-flex":""}},[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{"d-flex":"",xs12:""}},[n("v-btn",{attrs:{flat:"",large:"",color:"green"},on:{click:e.switchOn}},[e._v("On")]),n("v-btn",{attrs:{flat:"",large:"",color:"red"},on:{click:e.switchOff}},[e._v("Off")])],1)],1)],1)],1)],1)],1)],1)],1)],1)},o=[],a=(n("7f7f"),n("cadf"),n("551c"),n("097d"),{props:["device"],computed:{color:function(){return 1==this.device.switch.value?"#424242":"#ffca00"}},methods:{doSwitch:function(){var e=1==this.device.switch.value?0:1;this.$store.dispatch("sendMessage",{type:"Switch",device:this.device.name,switch:e})},switchOn:function(){this.$store.dispatch("sendMessage",{type:"Switch",device:this.device.name,switch:1})},switchOff:function(){this.$store.dispatch("sendMessage",{type:"Switch",device:this.device.name,switch:0})}}}),i=a,c=(n("f225"),n("2877")),s=n("6544"),u=n.n(s),l=n("8336"),f=n("b0af"),d=n("a523"),v=n("0e8f"),p=n("132d"),m=n("a722"),h=Object(c["a"])(i,r,o,!1,null,null,null);h.options.__file="homedevice.vue";t["a"]=h.exports;u()(h,{VBtn:l["a"],VCard:f["a"],VContainer:d["a"],VFlex:v["a"],VIcon:p["a"],VLayout:m["a"]})},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d");var r=n("2b0e"),o=n("bb71");n("da64");r["a"].use(o["a"],{iconfont:"md"});var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{attrs:{id:"inspire",dark:""}},[n("v-navigation-drawer",{attrs:{clipped:"",fixed:"",app:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[n("v-list",e._l(e.menuItems,function(t){return n("v-list-tile",{key:t.title,attrs:{to:t.path}},[n("v-list-tile-action",[n("v-icon",[e._v(e._s(t.icon))])],1),n("v-list-tile-content",[e._v(e._s(t.title))])],1)}),1)],1),n("v-toolbar",{attrs:{app:"",fixed:"","clipped-left":""}},[n("v-toolbar-side-icon",{on:{click:function(t){t.stopPropagation(),e.drawer=!e.drawer}}}),n("v-toolbar-title",[n("router-link",{staticStyle:{cursor:"pointer"},attrs:{to:"/",tag:"span"}},[e._v("\n    "+e._s(e.appTitle)+"\n  ")])],1)],1),n("v-content",[n("router-view")],1)],1)},i=[],c={data:function(){return{drawer:!1,appTitle:"Home Dashboard",sidebar:!1,menuItems:[{title:"Home",path:"/",icon:"home"},{title:"About",path:"/about",icon:"face"}]}}},s=c,u=n("2877"),l=n("6544"),f=n.n(l),d=n("7496"),v=n("549c"),p=n("132d"),m=n("8860"),h=n("ba95"),b=n("40fe"),g=n("5d23"),w=n("f774"),y=n("71d9"),O=n("706c"),x=n("2a7f"),_=Object(u["a"])(s,a,i,!1,null,null,null);_.options.__file="App.vue";var k=_.exports;f()(_,{VApp:d["a"],VContent:v["a"],VIcon:p["a"],VList:m["a"],VListTile:h["a"],VListTileAction:b["a"],VListTileContent:g["a"],VNavigationDrawer:w["a"],VToolbar:y["a"],VToolbarSideIcon:O["a"],VToolbarTitle:x["a"]});var E=n("8c4f"),T=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:"","fill-height":""}},[n("v-layout",{attrs:{"justify-center":"","align-center":""}},[n("v-layout",{attrs:{column:""}},[n("v-card"),e._l(e.$store.state.devices,function(t,r){return n("v-flex",{key:r,attrs:{"ma-2":"",xs12:""}},[n("v-card",[n("v-toolbar",[e._v(e._s(t.name))]),n("v-container",{attrs:{fluid:"","grid-list-sm":""}},[n("v-layout",{attrs:{row:"",wrap:""}},e._l(t.devices,function(e,t){return n("v-flex",{key:t,attrs:{xs12:"",sm12:"",md4:"",lg3:"","align-center":"","justify-space-between":"",row:"",xs1:""}},[n("homedevice",{attrs:{device:e}})],1)}),1)],1),n("v-footer")],1)],1)})],2)],1),n("v-fab-transition",[n("v-btn",{attrs:{color:"red",dark:"",fixed:"",bottom:"",right:"",fab:""}},[n("v-icon",[e._v("add")])],1)],1)],1)},C=[],S=n("1e10"),V=n("2f62"),j={computed:Object(V["c"])(["evenOrOdd"]),methods:Object(V["b"])(["increment","decrement","incrementIfOdd","incrementAsync"]),components:{homedevice:S["a"]}},N=j,L=n("8336"),A=n("b0af"),P=n("a523"),$=n("0789"),R=n("0e8f"),M=n("553a"),I=n("a722"),B=Object(u["a"])(N,T,C,!1,null,null,null);B.options.__file="Home.vue";var K=B.exports;f()(B,{VBtn:L["a"],VCard:A["a"],VContainer:P["a"],VFabTransition:$["b"],VFlex:R["a"],VFooter:M["a"],VIcon:p["a"],VLayout:I["a"],VToolbar:y["a"]}),r["a"].use(E["a"]);var D=new E["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:K},{path:"/about",name:"about",component:function(){return n.e("about").then(n.bind(null,"f820"))}},{path:"/rooms/:room",name:"room",component:function(){return n.e("about").then(n.bind(null,"3ab1"))}}]}),F=n("b408"),W=n.n(F);r["a"].use(V["a"]);var q={count:0,devices:{},socket:{isConnected:!1,message:"",reconnectError:!1}},G={increment:function(e){e.count++,e.devices.Office={name:"Office",devices:{"Office Light":{name:"Office Light"}}}},decrement:function(e){delete e.devices.Office,e.count--},SOCKET_ONOPEN:function(e,t){r["a"].prototype.$socket=t.currentTarget,e.socket.isConnected=!0,r["a"].prototype.$socket.sendObj({type:"GetDevices",dir:"Request",id:1})},SOCKET_ONCLOSE:function(e,t){e.socket.isConnected=!1},SOCKET_ONERROR:function(e,t){console.error(e,t)},SOCKET_ONMESSAGE:function(e,t){if(t.type="GetDevices"){var n={};n=t.payload,e.devices=n}e.socket.message=t},SOCKET_RECONNECT:function(e,t){console.info(e,t)},SOCKET_RECONNECT_ERROR:function(e){e.socket.reconnectError=!0}},H={increment:function(e){var t=e.commit;return t("increment")},decrement:function(e){var t=e.commit;return t("decrement")},incrementIfOdd:function(e){var t=e.commit,n=e.state;(n.count+1)%2===0&&t("increment")},incrementAsync:function(e){var t=e.commit;return new Promise(function(e,n){setTimeout(function(){t("increment"),e()},1e3)})},sendMessage:function(e,t){r["a"].prototype.$socket.sendObj(t)}},J={evenOrOdd:function(e){return e.count%2===0?"even":"odd"}},U=new V["a"].Store({state:q,getters:J,mutations:G,actions:H}),z=new URL("/",location),Q="https:"==location.protocol?"wss://"+z.hostname+":443":"ws://"+z.hostname+":80";r["a"].use(W.a,Q,{store:U,format:"json",reconnection:!0,reconnectionAttempts:5,reconnectionDelay:3e3}),r["a"].config.productionTip=!1,"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("/service-worker.js").then(function(e){console.log("SW registered: ",e)}).catch(function(e){console.log("SW registration failed: ",e)})}),new r["a"]({router:D,store:U,render:function(e){return e(k)},data:function(){return{info:null}},mounted:function(){}}).$mount("#app")},"7b80":function(e,t,n){},f225:function(e,t,n){"use strict";var r=n("7b80"),o=n.n(r);o.a}});
//# sourceMappingURL=app.7f1e2ca4.js.map