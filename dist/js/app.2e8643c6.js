(function(e){function t(t){for(var a,s,o=t[0],u=t[1],c=t[2],d=0,f=[];d<o.length;d++)s=o[d],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&f.push(r[s][0]),r[s]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(e[a]=u[a]);l&&l(t);while(f.length)f.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,o=1;o<n.length;o++){var u=n[o];0!==r[u]&&(a=!1)}a&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},r={app:0},i=[];function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],u=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var l=u;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"317d":function(e,t,n){},"35b3":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("byu-header",{attrs:{id:"hide-from-print"}},[n("byu-user-info-oauth",{attrs:{slot:"user"},slot:"user"}),n("h1",{attrs:{slot:"site-title"},slot:"site-title"},[e._v("Restaurant Finder")]),n("byu-menu",{attrs:{slot:"nav"},slot:"nav"},[n("router-link",{attrs:{to:"/"}},[e._v("Home")])],1)],1),n("div",{staticClass:"page-content"},[n("router-view")],1),n("byu-footer")],1)},i=[],s={name:"App",components:{},data:function(){return{}}},o=s,u=(n("5c0b"),n("2877")),c=n("6544"),l=n.n(c),d=n("7496"),f=Object(u["a"])(o,r,i,!1,null,null,null),h=f.exports;l()(f,{VApp:d["a"]});var m=n("8c4f"),p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{"justify-center":"","align-center":""}},[e._v(" Enter a date and time: "),n("v-layout",{attrs:{row:""}},[n("ls-date-picker",{attrs:{"no-date":!1,"start-year":e.currentYear,"end-year":e.currentYear+1,"abbr-month":"false",title:"Choose Date"},model:{value:e.selectedDate,callback:function(t){e.selectedDate=t},expression:"selectedDate"}}),n("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,"nudge-right":40,"return-value":e.selectedTime,transition:"scale-transition","offset-y":"","max-width":"290px","min-width":"290px"},on:{"update:returnValue":function(t){e.selectedTime=t},"update:return-value":function(t){e.selectedTime=t}},scopedSlots:e._u([{key:"activator",fn:function(t){var a=t.on,r=t.attrs;return[n("v-text-field",e._g(e._b({attrs:{label:"Choose Time","prepend-icon":"mdi-clock-time-four-outline",readonly:""},model:{value:e.formattedTime,callback:function(t){e.formattedTime=t},expression:"formattedTime"}},"v-text-field",r,!1),a))]}}]),model:{value:e.menu,callback:function(t){e.menu=t},expression:"menu"}},[e.menu?n("v-time-picker",{attrs:{"ampm-in-title":!0,format:"ampm"},model:{value:e.selectedTime,callback:function(t){e.selectedTime=t},expression:"selectedTime"}},[n("v-spacer"),n("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(t){e.menu=!1}}},[e._v(" Cancel ")]),n("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(t){return e.$refs.menu.save(e.selectedTime)}}},[e._v(" OK ")])],1):e._e()],1)],1),n("v-layout",{attrs:{column:""}},[n("h2",{staticClass:"list-header"},[e._v("Available Restaurants:")]),n("ul",e._l(e.filteredRestaurants,(function(t,a){return n("li",{key:a},[e._v(" "+e._s(t.name)+" ")])})),0)])],1)},v=[],y=n("b85c"),b=(n("1276"),n("ac1f"),n("99af"),n("5319"),n("fb6a"),n("4de4"),n("d3b7"),n("2f62"));a["a"].use(b["a"]);var g=new b["a"].Store({state:{AuthToken:"",Error:null},mutations:{setAuthToken:function(e,t){e.AuthToken=t},setError:function(e,t){e.Error=t}},actions:{},modules:{}}),x=function(e){var t="/";return e&&(t+=e),t},k=function(e,t){var n={headers:{"Content-Type":"application/json"}};return g.state.AuthToken&&(n.headers["Authorization"]="Bearer "+g.state.AuthToken),e&&(n.body=JSON.stringify(e)),t&&(n.method=t),n},T=function(e){if("string"===typeof e&&(window.location.href=window.location.origin+"/error?statusText="+e.statusText),401!==e.status){if(e.status>299){for(var t=e.url.split("/"),n="",a=t.length-1;a>0;a--)"api"===t[a]?a=-1:a>0&&(n=t[a]+"/"+n);console.error(e),localStorage["error"]=JSON.stringify(e),window.location.href=window.location.origin+"/error?status="+e.status+"&url="+n+"&statusText="+e.statusText}}else alert("Your session has timed out, please login again to continue")},D=function(e,t,n){return fetch(x(e),k(n,t)).then((function(e){if(e.status>299)T(e);else if(204===e.status)return e.text();return e.json()})).catch((function(e){T(e)}))},w=function(){return D("rest_hours.json")},_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"ls-date-picker-wrapper"}},[n("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","max-width":"290px","min-width":"290px","open-on-click":!e.disabled},scopedSlots:e._u([{key:"activator",fn:function(t){var a=t.on;return[n("v-container",{attrs:{id:"ls-date-picker-front"}},[n("v-text-field",e._g({attrs:{"prepend-icon":"event",label:e.title,readonly:"",disabled:e.disabled},model:{value:e.fullDate,callback:function(t){e.fullDate=t},expression:"fullDate"}},a)),n("v-btn",{attrs:{medium:"",text:"",icon:""},on:{click:e.clearDate}},[n("v-icon",[e._v("clear")])],1)],1)]}}]),model:{value:e.openMenu,callback:function(t){e.openMenu=t},expression:"openMenu"}},[n("v-card",[n("v-card-text",{staticStyle:{padding:"0"}},[n("v-layout",{staticStyle:{"background-color":"#002e5d",padding:"8px 16px","padding-bottom":"2px"}},[n("v-flex",[n("v-select",{attrs:{label:"Month",items:e.monthsArray,"item-value":"number","item-text":e.monthString,dark:""},on:{change:e.handleChange},model:{value:e.month,callback:function(t){e.month=t},expression:"month"}})],1),n("v-flex",{staticStyle:{"padding-left":"8px"}},[n("v-combobox",{attrs:{label:"Year",items:e.yearArr,dark:""},on:{change:e.handleChange},model:{value:e.year,callback:function(t){e.year=t},expression:"year"}})],1)],1),this.noDate?e._e():n("v-layout",{staticStyle:{padding:"8px 16px"},attrs:{wrap:"","justify-start":"","align-start":""}},[n("v-layout",[n("div",{staticClass:"calendar-header"},[e._v("Su")]),n("div",{staticClass:"calendar-header"},[e._v("M")]),n("div",{staticClass:"calendar-header"},[e._v("T")]),n("div",{staticClass:"calendar-header"},[e._v("W")]),n("div",{staticClass:"calendar-header"},[e._v("Th")]),n("div",{staticClass:"calendar-header"},[e._v("F")]),n("div",{staticClass:"calendar-header"},[e._v("S")])]),e._l(e.spaceFillers,(function(e){return n("div",{key:e+"-filler",staticClass:"filler-block"})})),e._l(e.dateArr,(function(t){return n("div",{key:t+"-date"},[t===e.date?n("v-btn",{staticStyle:{border:"0.5px solid rgba(0, 46, 93, 0.5)"},attrs:{icon:"",color:"primary"},on:{click:function(n){return e.setDate(t)}}},[e._v(e._s(t))]):n("v-btn",{attrs:{icon:""},on:{click:function(n){return e.setDate(t)}}},[e._v(e._s(t))])],1)}))],2)],1)],1)],1)],1)},O=[],S=(n("caad"),n("2532"),{name:"LsDatePicker",data:function(){return{year:0,month:0,date:0,menu:null,openMenu:null,unedited:!0,clear:!1,monthsArray:[{name:"Jan",number:1},{name:"Feb",number:2},{name:"Mar",number:3},{name:"Apr",number:4},{name:"May",number:5},{name:"Jun",number:6},{name:"Jul",number:7},{name:"Aug",number:8},{name:"Sep",number:9},{name:"Oct",number:10},{name:"Nov",number:11},{name:"Dec",number:12}]}},props:["title","disabled","value","returnDate","noDate","startYear","endYear","abbrMonth"],methods:{handleChange:function(){this.unedited&&(this.unedited=!1),this.returnDate?this.$emit("input",new Date(this.fullDate)):this.$emit("input",this.fullDate)},setDate:function(e){this.date=e,this.handleChange()},clearDate:function(){console.log("clearDate"),this.year=0,this.month=0,this.date=0,this.handleChange()}},computed:{dateArr:function(){var e=[4,6,9,11],t=[],n=31;2===this.month?n=this.year%4===0?29:28:e.indexOf(this.month)>0&&(n=30);for(var a=1;a<=n;a++)t.push(a);return t},spaceFillers:function(){if(!this.year||!this.month)return 0;var e=new Date(this.year,this.month-1,1,12,0,0);return e.setDate(1),e.getDay()},fullDate:function(){return 0!=this.year||0!=this.month||0!=this.date||this.unedited?this.unedited?this.value?(e=this.value.includes("-")?this.value.split("-"):this.value.split("/"),e?(this.month=parseInt(e[0]),this.date=parseInt(e[1]),this.year=parseInt(e[2]),this.noDate?"".concat(this.month,"/").concat(this.year):this.value):""):"":this.noDate?"".concat(this.month,"/").concat(this.year):"".concat(this.month,"/").concat(this.date,"/").concat(this.year):null;var e},yearArr:function(){for(var e=new Date,t=this.startYear?parseInt(this.startYear):e.getFullYear()-50,n=this.endYear?parseInt(this.endYear):e.getFullYear()+25,a=[],r=t;r<=n;r++)a.push(r);return a},monthString:function(){return this.abbrMonth?"name":"number"}}}),C=S,A=(n("c5f5"),n("8336")),V=n("b0af"),j=n("99d9"),M=n("2b5d"),F=n("a523"),Y=n("0e8f"),W=n("132d"),P=n("a722"),E=n("e449"),I=n("b974"),R=n("8654"),B=Object(u["a"])(C,_,O,!1,null,null,null),J=B.exports;l()(B,{VBtn:A["a"],VCard:V["a"],VCardText:j["a"],VCombobox:M["a"],VContainer:F["a"],VFlex:Y["a"],VIcon:W["a"],VLayout:P["a"],VMenu:E["a"],VSelect:I["a"],VTextField:R["a"]});var $={name:"Home",components:{LsDatePicker:J},data:function(){return{daysOfWeek:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],restaurants:[],selectedDate:(new Date).toLocaleDateString(),selectedTime:new Date,currentYear:(new Date).getFullYear(),menu:!1}},mounted:function(){var e=this;w().then((function(t){e.restaurants=e.parseRestaurants(t)}))},methods:{checkIfAvailable:function(e,t,n){var a=new Date(e+" "+t),r=this.daysOfWeek[a.getDay()-1],i=new Date(e+" "+n.startTime),s=new Date(e+" "+n.endTime);return n.day==r&&(a>=i&&a<s)},parseRestaurants:function(e){var t,n=Object(y["a"])(e);try{for(n.s();!(t=n.n()).done;){var a=t.value;a.days=this.parseTimes(a.times),delete a.times}}catch(r){n.e(r)}finally{n.f()}return e},parseTimes:function(e){var t,n=[],a=Object(y["a"])(e);try{for(a.s();!(t=a.n()).done;){var r=t.value,i=[],s=r.split(" "),o=0;while(s[o].indexOf(",")>-1)o++;var u=0;while(u<=o)s[u].indexOf("-")>-1?i=i.concat(this.parseDayRange(s[u])):i.push(s[u]),u++;var c=s[u];-1==c.indexOf(":")&&(c+=":00");var l=s[u+1],d=c+" "+l;u+=3,c=s[u],-1==c.indexOf(":")&&(c+=":00"),l=s[u+1];var f=c+" "+l;"12:00 am"==f&&(f="11:59 pm");var h=new Date(this.selectedDate+" "+d),m=new Date(this.selectedDate+" "+f);if(m>h)for(var p=0;p<i.length;p++)i[p]={day:i[p],startTime:d,endTime:f};else{for(var v="11:59 pm",b="12:00 am",g=[],x=0;x<i.length;x++){g.push({day:i[x],startTime:d,endTime:v});var k=this.daysOfWeek.indexOf(i[x])+1;k==this.daysOfWeek.length&&(k=0),g.push({day:this.daysOfWeek[k],startTime:b,endTime:f})}i=g,console.log(g)}n=n.concat(i)}}catch(T){a.e(T)}finally{a.f()}return n},parseDayRange:function(e){e=e.replace(",","");var t=e.split("-"),n=t[0],a=t[1],r=this.daysOfWeek.indexOf(n),i=this.daysOfWeek.indexOf(a);this.daysOfWeek.slice(r,i+1);return this.daysOfWeek.slice(r,i+1)}},computed:{formattedTime:function(){var e=this.selectedTime;return"string"==typeof this.selectedTime&&(e=new Date(this.selectedDate+" "+this.selectedTime)),e.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})},filteredRestaurants:function(){var e=this;return this.restaurants.filter((function(t){return t.days.some((function(t){return e.checkIfAvailable(e.selectedDate,e.formattedTime,t)}))}))}}},L=$,N=(n("dbce"),n("2fa4")),H=n("c964"),z=Object(u["a"])(L,p,v,!1,null,"0a6a3306",null),K=z.exports;l()(z,{VBtn:A["a"],VContainer:F["a"],VLayout:P["a"],VMenu:E["a"],VSpacer:N["a"],VTextField:R["a"],VTimePicker:H["a"]}),a["a"].use(m["a"]);var q=[{path:"/",name:"home",component:K}],G=new m["a"]({mode:"history",routes:q}),Q=G,U=n("f309");a["a"].use(U["a"]);var X=new U["a"]({icons:{iconfont:"mdi"},theme:{themes:{light:{primary:"#002e5d",secondary:"#666666",accent:"#5F7C9B",error:"#B3041A",info:"#2196F3",success:"#66B200",warning:"#B3041A"}},dark:!1}});a["a"].config.productionTip=!1,a["a"].config.ignoredElements=[/^byu-/,/^webSocket-/],new a["a"]({router:Q,store:g,vuetify:X,render:function(e){return e(h)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";n("9c0c")},"9c0c":function(e,t,n){},c5f5:function(e,t,n){"use strict";n("317d")},dbce:function(e,t,n){"use strict";n("35b3")}});
//# sourceMappingURL=app.2e8643c6.js.map