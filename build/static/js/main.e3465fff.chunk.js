(this["webpackJsonpyaanimail-chrome-extension"]=this["webpackJsonpyaanimail-chrome-extension"]||[]).push([[0],{113:function(e){e.exports=JSON.parse('{"E-MAIL":"E-mail","PASSWORD":"Password","LOGIN":"Login","LOGOUT":"Logout","NO_UNREAD_MAILS":"No unread e-mails...","UNREAD":"Unread","UNREAD_MAIL_COUNT":"Unread E-Mail Count","WELCOME":"Welcome"}')},114:function(e){e.exports=JSON.parse('{"E-MAIL":"E-posta","PASSWORD":"\u015eifre","LOGIN":"Giri\u015f","LOGOUT":"\xc7\u0131k\u0131\u015f","NO_UNREAD_MAILS":"Okunmam\u0131\u015f mail bulunmamaktad\u0131r...","UNREAD":"Okunmam\u0131\u015f","UNREAD_MAIL_COUNT":"Okunmam\u0131\u015f mail say\u0131s\u0131","WELCOME":"Ho\u015fgeldin"}')},115:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(12),i=n.n(r),s=(n(74),n(75),n(76),n(77),n(7)),o=(n(83),n(121)),l=n(119),u=n.p+"static/media/logo.d732ee88.svg",d=n(8),j=n(24),h=n.n(j),f=n(123),b=n(125),m=n(126),g="SET_AUTHED_USER",O="LOGOUT";function v(e){return{type:g,authedUser:e}}function x(){return{type:O}}var p="SET_VIEW";function y(e){return{type:p,view:e}}var N=n(13),_=function e(){Object(N.a)(this,e)};_.saveMultipleToLocalStorage=function(e){return new Promise((function(t,n){chrome.storage.sync.set(e,(function(){t(e)}))}))},_.saveToLocalStorage=function(e,t){return new Promise((function(n,a){var c={};c[e]=t,chrome.storage.sync.set(c,(function(){n(t)}))}))},_.getMultipleFromLocalStorage=function(e){return new Promise((function(t,n){chrome.storage.sync.get(e,(function(e){e?t(e):n()}))}))},_.getFromLocalStorage=function(e){return new Promise((function(t,n){chrome.storage.sync.get(e,(function(e){e?t(e):n()}))}))},_.getGatewayApiUrl=function(){return"https://capi.yaanimail.com/gateway/v1"};var L=_,w=function e(){Object(N.a)(this,e)};w.getAuthHeaders=function(){return Promise.all([w.getUserToken(),w.getDeviceId()]).then((function(e){return 2==e.length?{Authorization:"Bearer "+e[0],"App-Version":"1.0","Device-Language":"en-US","Device-Name":"WEB","Device-ID":e[1]}:{}})).catch((function(e){console.error(e)}))},w.getNonAuthHeaders=function(){return new Promise((function(e,t){w.getDeviceId().then((function(t){e({"App-Version":"1.0","Device-Language":"en-US","Device-Name":"WEB","Device-ID":t})}))}))},w.getUserToken=function(){return new Promise((function(e,t){L.getFromLocalStorage("ym@user").then((function(n){if(0!==Object.keys(n).length){var a=JSON.parse(n["ym@user"]);e(a.access_token)}else t()}))}))},w.getDeviceId=function(){return new Promise((function(e,t){L.getFromLocalStorage("y@uuid").then((function(t){if(0!==Object.keys(t).length)e(t["y@uuid"]);else{var n=w.generateUUID();L.saveToLocalStorage("y@uuid",n).then((function(t){e(t)}))}}))}))},w.generateUUID=function(){for(var e=[],t="0123456789abcdef",n=0;n<36;n++)e[n]=t.substr(Math.floor(16*Math.random()),1);return e[14]="4",e[19]=t.substr(3&e[19]|8,1),e[8]=e[13]=e[18]=e[23]="-",e.join("")};var D=w,S=n(124),U=n(44),M=n(1);var A=Object(s.connect)()((function(){var e=Object(S.a)().t,t=Object(a.useState)(!0),n=Object(d.a)(t,2),c=(n[0],n[1]),r=Object(a.useState)(!1),i=Object(d.a)(r,2),o=(i[0],i[1],Object(a.useState)("")),l=Object(d.a)(o,2),u=l[0],j=l[1],g=Object(a.useState)(""),O=Object(d.a)(g,2),x=O[0],p=O[1],N=Object(s.useDispatch)();return Object(M.jsxs)("form",{onSubmit:function(e){e.preventDefault();var t={email:u,password:x,details:1};c(!0),D.getNonAuthHeaders().then((function(e){h.a.post(L.getGatewayApiUrl()+"/accounts/login",t,{headers:e}).then((function(e){c(!1),L.saveMultipleToLocalStorage({"ym@user":JSON.stringify(e.data),"ym@view":"inbox"}).then((function(e){N(v(e)),N(y("inbox"))}))})).catch((function(e){console.log(e.message),U.b.error(e.message)}))}))},children:[Object(M.jsxs)("div",{className:"d-flex flex-column py-2",children:[Object(M.jsx)(f.a,{size:"sm",className:"mb-3",children:Object(M.jsx)(b.a,{placeholder:e("E-MAIL"),"aria-label":e("E-MAIL"),"aria-describedby":"basic-addon2",value:u,onChange:function(e){return j(e.target.value)}})}),Object(M.jsxs)(f.a,{size:"sm",className:"mb-3",children:[Object(M.jsx)(f.a.Text,{id:"inputGroup-sizing-sm",children:e("PASSWORD")}),Object(M.jsx)(b.a,{placeholder:e("PASSWORD"),"aria-label":e("PASSWORD"),"aria-describedby":"inputGroup-sizing-sm",type:"password",value:x,onChange:function(e){return p(e.target.value)}})]}),Object(M.jsx)("div",{children:Object(M.jsx)(m.a,{variant:"primary",className:"float-end",type:"submit",children:e("LOGIN")})})]}),Object(M.jsx)(U.a,{position:"bottom-left",autoClose:1500,closeOnClick:!0})]})})),E=n(19),T=h.a.create({baseURL:"https://capi.yaanimail.com/gateway/v1"});T.interceptors.response.use((function(e){return e}),(function(e){return 401===e.response.status?new Promise((function(e,t){L.saveToLocalStorage("ym@user",null).then((function(t){Object(s.useDispatch)(x()),e(t)})).catch((function(e){console.log(e),t(e)}))})):(e.response.message=function(e){var t,n=null===e||void 0===e||null===(t=e.error)||void 0===t?void 0:t.message;return n&&E.a.exists(n)?E.a.t(n):e.error.message}(e.response),Promise.reject(e))}));var I=function e(){Object(N.a)(this,e)};I.logout=function(){return new Promise((function(e,t){D.getAuthHeaders().then((function(n){T.delete("/accounts/logout",{headers:n}).then((function(t){e(t)})).catch((function(e){t(e.response)}))})).catch((function(e){console.log(e),t(e)}))}))};var Y=I;var k=function(){var e=Object(S.a)().t,t=Object(a.useState)(!0),n=Object(d.a)(t,2),c=(n[0],n[1]),r=Object(a.useState)(!1),i=Object(d.a)(r,2),o=(i[0],i[1],Object(s.useDispatch)());return Object(M.jsx)(m.a,{variant:"danger",onClick:function(e){c(!0),chrome.action.setBadgeText({text:""}),Y.logout().then((function(){L.saveToLocalStorage("ym@user",null).then((function(){c(!1),o(x())}))})).catch((function(e){c(!1),console.log(e)}))},children:e("LOGOUT")})},P=function e(){Object(N.a)(this,e)};P.getAllFolders=function(){return new Promise((function(e,t){D.getAuthHeaders().then((function(n){T.get("/emails/folders/all",{headers:n}).then((function(n){n.data?e(n):t(n.data.error)})).catch((function(e){t(e.response)}))})).catch((function(e){console.log(e),t(e)}))}))},P.getMails=function(e){var t=Object.entries(e).map((function(e){var t=Object(d.a)(e,2),n=t[0],a=t[1];return"".concat(n,"=").concat(a)})).join("&");return new Promise((function(e,n){D.getAuthHeaders().then((function(a){T.get("/emails/messages?".concat(t),{headers:a}).then((function(t){t.data?e(t):n(t.data.error)})).catch((function(e){n(e.response)}))})).catch((function(e){console.log(e),n(e)}))}))};var C=P,R=n(117),H=n(118),F=function(){chrome.tabs.create({url:"https://kurumsal.yaanimail.com"})};var B=function(){var e=Object(S.a)().t,t=Object(a.useState)(!0),n=Object(d.a)(t,2),c=n[0],r=n[1],i=Object(a.useState)(0),s=Object(d.a)(i,2),o=s[0],l=s[1];return Object(a.useEffect)((function(){r(!0),C.getAllFolders().then((function(e){r(!1);var t=e.data.filter((function(e){return 2==e.id})),n=t&&t.length>0?t[0].unread:0;l(n),chrome.action.setBadgeText({text:""}),0!==n&&chrome.action.setBadgeText({text:"".concat(n>999?"+999":n)})})).catch((function(t){r(!1),chrome.action.setBadgeText({text:""}),console.log(t),t&&t.data&&console.log(e(t.data.message))}))}),[]),Object(M.jsxs)(m.a,{variant:"primary",onClick:F,children:[e("UNREAD")," ",c?Object(M.jsx)(R.a,{as:"span",animation:"grow",size:"sm",role:"status","aria-hidden":"true"}):Object(M.jsx)(H.a,{bg:"secondary",children:o>999?"+999":o}),Object(M.jsx)("span",{className:"visually-hidden",children:e("UNREAD_MAIL_COUNT")})]})};var W=Object(s.connect)((function(e){var t=e.authedUser;return{isLoggedIn:!!t,authedUser:t}}))((function(e){return Object(M.jsx)(o.a,{bg:"light",children:Object(M.jsxs)(l.a,{children:[Object(M.jsx)(o.a.Brand,{href:"#home",children:Object(M.jsx)("img",{alt:"YaaniMail",src:u,width:"150",className:"d-inline-block align-top pt-1"})}),!1===e.isLoggedIn?Object(M.jsx)(A,{}):Object(M.jsxs)(a.Fragment,{children:[Object(M.jsx)(B,{}),Object(M.jsx)(k,{})]})]})})})),V=n(65),G=n.n(V),J=n(27);function z(){return function(e){return e(Object(J.showLoading)()),new Promise((function(e,t){L.getMultipleFromLocalStorage(["ym@user","ym@view"]).then((function(t){var n=(t["ym@view"]||"").length>0?t["ym@view"]:"inbox";0!==Object.keys(t["ym@user"]).length?e({authedUser:JSON.parse(t["ym@user"]),selectedView:n}):e({})}))})).then((function(t){t.authedUser&&e(v(t.authedUser)),e(y(t.selectedView)),e(Object(J.hideLoading)())}))}}var q=n(120),X=n(37),K=n(43),Q=n(66),Z=n(14),$=n.n(Z);n(56);var ee=Object(s.connect)((function(e){return{authedUser:e.authedUser,selectedView:e.view}}))((function(e){var t=Object(S.a)().t,n=Object(s.useDispatch)(),c=Object(a.useCallback)((function(e){L.saveToLocalStorage("ym@view",e).then((function(e){n(y(e))}))}),[]);return Object(M.jsxs)(q.a,{"aria-label":"Toolbar with Button groups",className:"border border-info p-1",children:[Object(M.jsxs)("div",{className:"m-auto",children:[Object(M.jsxs)("span",{className:"pe-2",children:[t("WELCOME")," ",e.authedUser.name?e.authedUser.name:e.authedUser.client_id]}),Object(M.jsx)(X.a,{icon:Q.a}),Object(M.jsx)("span",{className:"ps-2",children:$()(new Date).format("DD-MM-YYYY dddd")})]}),Object(M.jsx)("div",{className:"ms-2 me-1",children:Object(M.jsx)(m.a,{variant:"inbox"===e.selectedView?"secondary":"primary",className:"rounded-circle",disabled:"inbox"===e.selectedView,onClick:function(){return c("inbox")},children:Object(M.jsx)(X.a,{icon:K.b})})}),Object(M.jsx)("div",{children:Object(M.jsx)(m.a,{variant:"calendar"===e.selectedView?"secondary":"primary",className:"rounded-circle",disabled:"calendar"===e.selectedView,onClick:function(){return c("calendar")},children:Object(M.jsx)(X.a,{icon:K.a})})})]})}));var te=Object(s.connect)((function(e){var t=e.authedUser;return{isLoggedIn:!!t,language:t&&(t.language||"").length>0?t.language:"tr"}}))((function(e){var t=Object(S.a)().i18n,n=Object(s.useDispatch)();return Object(a.useEffect)((function(){n(z())}),[]),Object(a.useEffect)((function(){t.changeLanguage(e.language||"tr")}),[e.language]),Object(M.jsxs)("div",{children:[Object(M.jsx)(W,{}),e.isLoggedIn&&Object(M.jsx)(ee,{}),Object(M.jsx)("main",{className:G.a.main,children:e.children})]})})),ne=n(122),ae=n(28),ce=n.n(ae),re=n.p+"static/media/icon-mail.edfb9dec.png";var ie=Object(s.connect)((function(e){var t=e.authedUser;return{accountMail:t?t.client_id:""}}))((function(e){var t=Object(S.a)().t,n=Object(a.useState)(!0),c=Object(d.a)(n,2),r=c[0],i=c[1],s=Object(a.useState)([]),o=Object(d.a)(s,2),l=o[0],u=o[1];return Object(a.useEffect)((function(){i(!0);C.getMails({folder:"inbox",limit:5,message_listing_type:"message",offset:0,order:"date",order_type:"desc",flag:!1,unread:!0,attachment:!1,search:"*"}).then((function(e){i(!1),u(e.data)})).catch((function(e){i(!1),console.log(e),e&&e.data&&console.log(t(e.data.message))}))}),[]),Object(M.jsxs)(a.Fragment,{children:[r?Object(M.jsx)("div",{className:"container h-100",children:Object(M.jsx)("div",{className:"d-flex justify-content-center align-items-center ".concat(ce.a.vh70),children:Object(M.jsx)(R.a,{animation:"border",variant:"info"})})}):l&&l.map((function(t){return Object(M.jsx)("div",{onClick:function(){return function(t){var n="https://kurumsal.yaanimail.com/m/".concat(e.accountMail,"/PRIMARY/inbox/single/").concat(t,"/details");chrome.tabs.create({url:n},(function(e){}))}(t.id)},children:Object(M.jsxs)(ne.a,{border:"info",children:[Object(M.jsxs)(ne.a.Header,{children:[t.from.map((function(e){return e.full_name&&e.full_name.length>0?e.full_name:e.first_name}))," ","- ",$.a.unix(t.time).format("Do MMMM YYYY, hh:mm:ss")]}),Object(M.jsxs)(ne.a.Body,{children:[Object(M.jsx)(ne.a.Text,{className:"fw-bold",children:t.subject}),Object(M.jsx)(ne.a.Text,{children:t.first_line})]})]})})})),!r&&(!l||0===l.length)&&Object(M.jsxs)("div",{className:"container h-100",children:[Object(M.jsx)("div",{className:"d-flex justify-content-center align-items-center ".concat(ce.a.vh70),children:Object(M.jsx)("img",{src:re,alt:"Login",className:"not-found-image"})}),Object(M.jsx)("p",{class:"text-center text-primary fw-bold fs-6",children:t("NO_UNREAD_MAILS")})]})]})}));var se=Object(s.connect)((function(e){return{isLoggedIn:!!e.authedUser}}))((function(e){return e.isLoggedIn?Object(M.jsx)(ie,{}):Object(M.jsx)("div",{className:"container h-100",children:Object(M.jsx)("div",{className:"d-flex justify-content-center align-items-center ".concat(ce.a.vh70),children:Object(M.jsx)("img",{src:re,alt:"Login",className:"not-found-image"})})})})),oe=n(67),le=function e(){Object(N.a)(this,e)};le.getEvents=function(e){var t="/calendars/appointment/".concat(e.calendarId,"/list");return e.startTime&&e.endTime&&(t=t+"?start_time="+e.startTime+"&end_time="+e.endTime),new Promise((function(e,n){D.getAuthHeaders().then((function(a){T.post(t,{},{headers:a}).then((function(t){t.data?e(t):n(t.data.error)})).catch((function(e){n(e.response)}))})).catch((function(e){console.log(e),n(e)}))}))};var ue=le,de=n(69),je=n(29),he=n.n(je),fe={onClick:function(e){chrome.tabs.create({url:e.target.href})}},be=function(e){var t=new Date(e.invitation_date),n=new Date(e.end_date),a=!1;return 1!==e.all_day&&t.getFullYear()===n.getFullYear()&&t.getMonth()===n.getMonth()&&t.getDate()!==n.getDate()&&(a=!0),a};var me=Object(s.connect)((function(e){var t=e.authedUser;return{language:t&&(t.language||"").length>0?t.language:"tr"}}))((function(e){$.a.locale(e.language);var t=Object(S.a)().t,n=Object(a.useState)(!0),c=Object(d.a)(n,2),r=c[0],i=c[1],s=Object(a.useState)([]),o=Object(d.a)(s,2),l=o[0],u=o[1];return Object(a.useEffect)((function(){i(!0);var e=$()(new Date).startOf("day").valueOf(),n={calendarId:10,startTime:$()(e).startOf("day").valueOf(),endTime:$()(e).endOf("day").valueOf()};ue.getEvents(n).then((function(e){i(!1),u(function(e){var t,n=[],a=Object(oe.a)(e);try{for(a.s();!(t=a.n()).done;){var c=t.value,r=new Date(c.invitation_date),i=new Date(c.end_date),s=be(c),o=void 0;o=s?{title:c.subject,start:$()(r.toString()).format("DD-MM-YYYY"),end:$()(i.toString()).add(1,"days").format("DD-MM-YYYY"),id:c.appointment_id,location:c.location}:{title:c.subject,start:$()(r.toString()).format("DD-MM-YYYY HH:mm"),end:$()(i.toString()).format("DD-MM-YYYY HH:mm"),id:c.appointment_id,location:c.location,allDay:1===c.all_day},n.push(o)}}catch(l){a.e(l)}finally{a.f()}return n.sort((function(e,t){return e.start<t.start?-1:1})),n}(e.data))})).catch((function(e){i(!1),console.log(e),e&&e.data&&console.log(t(e.data.message))}))}),[]),Object(M.jsxs)(a.Fragment,{children:[r?Object(M.jsx)("div",{className:"container h-100",children:Object(M.jsx)("div",{className:"d-flex justify-content-center align-items-center ".concat(he.a.vh70),children:Object(M.jsx)(R.a,{animation:"border",variant:"info"})})}):l&&l.map((function(e){return Object(M.jsx)("div",{children:Object(M.jsxs)(ne.a,{border:"info",children:[Object(M.jsxs)(ne.a.Header,{children:[Object(M.jsxs)("div",{className:"fs-6",children:[Object(M.jsx)(H.a,{bg:"primary",children:e.start}),Object(M.jsx)("span",{className:"text-primary",children:" - "}),Object(M.jsx)(H.a,{bg:"primary",children:e.end})]}),Object(M.jsx)(H.a,{variant:"primary",pill:!0,children:e.allDay})]}),Object(M.jsxs)(ne.a.Body,{children:[Object(M.jsx)(ne.a.Text,{children:e.title}),Object(M.jsx)(ne.a.Text,{children:Object(M.jsx)(de.a,{options:{attributes:fe},children:e.location})})]})]},e.id)})})),!r&&(!l||0===l.length)&&Object(M.jsxs)("div",{className:"container h-100",children:[Object(M.jsx)("div",{className:"d-flex justify-content-center align-items-center ".concat(he.a.vh70),children:Object(M.jsx)("img",{src:re,alt:"Login",className:"not-found-image"})}),Object(M.jsx)("p",{class:"text-center text-primary fw-bold fs-6",children:t("NO_UNREAD_MAILS")})]})]})}));var ge=Object(s.connect)((function(e){return{isLoggedIn:!!e.authedUser}}))((function(e){return e.isLoggedIn?Object(M.jsx)(me,{}):Object(M.jsx)("div",{className:"container h-100",children:Object(M.jsx)("div",{className:"d-flex justify-content-center align-items-center ".concat(he.a.vh70),children:Object(M.jsx)("img",{src:re,alt:"Login",className:"not-found-image"})})})}));var Oe=Object(s.connect)((function(e){return{selectedView:e.view}}))((function(e){return Object(M.jsxs)(te,{children:["inbox"===e.selectedView&&Object(M.jsx)(se,{}),"calendar"===e.selectedView&&Object(M.jsx)(ge,{})]})})),ve=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,127)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),r(e),i(e)}))},xe=n(22);var pe=Object(xe.b)({authedUser:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case g:return t.authedUser;case O:return null;default:return e}},view:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"inbox",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case p:return t.view;default:return e}},loadingBar:J.loadingBarReducer}),ye=n(68),Ne=Object(xe.a)(ye.a),_e=n(30);E.a.use(_e.e).init({fallbackLng:"en",lng:"en",resources:{en:{translations:n(113)},tr:{translations:n(114)}},ns:["translations"],defaultNS:"translations"}),E.a.languages=["en","tr"];E.a;var Le=Object(xe.c)(pe,Ne);i.a.render(Object(M.jsx)(c.a.StrictMode,{children:Object(M.jsx)(s.Provider,{store:Le,children:Object(M.jsx)(Oe,{})})}),document.getElementById("root")),ve()},28:function(e,t,n){e.exports={vh70:"Mailbox_vh70__3XhAL"}},29:function(e,t,n){e.exports={vh70:"Calendar_vh70__1atqW"}},65:function(e,t,n){e.exports={main:"Layout_main__auk_r"}},74:function(e,t,n){},75:function(e,t,n){},83:function(e,t,n){e.exports={header:"Header_header__2otSh",logo:"Header_logo__2yYRj",active:"Header_active__WHMYj",badge:"Header_badge__1yJvq"}}},[[115,1,2]]]);
//# sourceMappingURL=main.e3465fff.chunk.js.map