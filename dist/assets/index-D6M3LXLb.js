function p0(r,o){for(var s=0;s<o.length;s++){const c=o[s];if(typeof c!="string"&&!Array.isArray(c)){for(const d in c)if(d!=="default"&&!(d in r)){const f=Object.getOwnPropertyDescriptor(c,d);f&&Object.defineProperty(r,d,f.get?f:{enumerable:!0,get:()=>c[d]})}}}return Object.freeze(Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}))}(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))c(d);new MutationObserver(d=>{for(const f of d)if(f.type==="childList")for(const p of f.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&c(p)}).observe(document,{childList:!0,subtree:!0});function s(d){const f={};return d.integrity&&(f.integrity=d.integrity),d.referrerPolicy&&(f.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?f.credentials="include":d.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function c(d){if(d.ep)return;d.ep=!0;const f=s(d);fetch(d.href,f)}})();function Tf(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var la={exports:{}},wl={},oa={exports:{}},Se={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Hd;function m0(){if(Hd)return Se;Hd=1;var r=Symbol.for("react.element"),o=Symbol.for("react.portal"),s=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),d=Symbol.for("react.profiler"),f=Symbol.for("react.provider"),p=Symbol.for("react.context"),_=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),v=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),S=Symbol.iterator;function k(E){return E===null||typeof E!="object"?null:(E=S&&E[S]||E["@@iterator"],typeof E=="function"?E:null)}var D={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},R=Object.assign,x={};function b(E,B,H){this.props=E,this.context=B,this.refs=x,this.updater=H||D}b.prototype.isReactComponent={},b.prototype.setState=function(E,B){if(typeof E!="object"&&typeof E!="function"&&E!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,E,B,"setState")},b.prototype.forceUpdate=function(E){this.updater.enqueueForceUpdate(this,E,"forceUpdate")};function j(){}j.prototype=b.prototype;function P(E,B,H){this.props=E,this.context=B,this.refs=x,this.updater=H||D}var I=P.prototype=new j;I.constructor=P,R(I,b.prototype),I.isPureReactComponent=!0;var M=Array.isArray,z=Object.prototype.hasOwnProperty,G={current:null},Y={key:!0,ref:!0,__self:!0,__source:!0};function K(E,B,H){var J,te={},ie=null,Q=null;if(B!=null)for(J in B.ref!==void 0&&(Q=B.ref),B.key!==void 0&&(ie=""+B.key),B)z.call(B,J)&&!Y.hasOwnProperty(J)&&(te[J]=B[J]);var q=arguments.length-2;if(q===1)te.children=H;else if(1<q){for(var ee=Array(q),Z=0;Z<q;Z++)ee[Z]=arguments[Z+2];te.children=ee}if(E&&E.defaultProps)for(J in q=E.defaultProps,q)te[J]===void 0&&(te[J]=q[J]);return{$$typeof:r,type:E,key:ie,ref:Q,props:te,_owner:G.current}}function fe(E,B){return{$$typeof:r,type:E.type,key:B,ref:E.ref,props:E.props,_owner:E._owner}}function ue(E){return typeof E=="object"&&E!==null&&E.$$typeof===r}function he(E){var B={"=":"=0",":":"=2"};return"$"+E.replace(/[=:]/g,function(H){return B[H]})}var pe=/\/+/g;function me(E,B){return typeof E=="object"&&E!==null&&E.key!=null?he(""+E.key):B.toString(36)}function _e(E,B,H,J,te){var ie=typeof E;(ie==="undefined"||ie==="boolean")&&(E=null);var Q=!1;if(E===null)Q=!0;else switch(ie){case"string":case"number":Q=!0;break;case"object":switch(E.$$typeof){case r:case o:Q=!0}}if(Q)return Q=E,te=te(Q),E=J===""?"."+me(Q,0):J,M(te)?(H="",E!=null&&(H=E.replace(pe,"$&/")+"/"),_e(te,B,H,"",function(Z){return Z})):te!=null&&(ue(te)&&(te=fe(te,H+(!te.key||Q&&Q.key===te.key?"":(""+te.key).replace(pe,"$&/")+"/")+E)),B.push(te)),1;if(Q=0,J=J===""?".":J+":",M(E))for(var q=0;q<E.length;q++){ie=E[q];var ee=J+me(ie,q);Q+=_e(ie,B,H,ee,te)}else if(ee=k(E),typeof ee=="function")for(E=ee.call(E),q=0;!(ie=E.next()).done;)ie=ie.value,ee=J+me(ie,q++),Q+=_e(ie,B,H,ee,te);else if(ie==="object")throw B=String(E),Error("Objects are not valid as a React child (found: "+(B==="[object Object]"?"object with keys {"+Object.keys(E).join(", ")+"}":B)+"). If you meant to render a collection of children, use an array instead.");return Q}function xe(E,B,H){if(E==null)return E;var J=[],te=0;return _e(E,J,"","",function(ie){return B.call(H,ie,te++)}),J}function ce(E){if(E._status===-1){var B=E._result;B=B(),B.then(function(H){(E._status===0||E._status===-1)&&(E._status=1,E._result=H)},function(H){(E._status===0||E._status===-1)&&(E._status=2,E._result=H)}),E._status===-1&&(E._status=0,E._result=B)}if(E._status===1)return E._result.default;throw E._result}var se={current:null},L={transition:null},F={ReactCurrentDispatcher:se,ReactCurrentBatchConfig:L,ReactCurrentOwner:G};function V(){throw Error("act(...) is not supported in production builds of React.")}return Se.Children={map:xe,forEach:function(E,B,H){xe(E,function(){B.apply(this,arguments)},H)},count:function(E){var B=0;return xe(E,function(){B++}),B},toArray:function(E){return xe(E,function(B){return B})||[]},only:function(E){if(!ue(E))throw Error("React.Children.only expected to receive a single React element child.");return E}},Se.Component=b,Se.Fragment=s,Se.Profiler=d,Se.PureComponent=P,Se.StrictMode=c,Se.Suspense=h,Se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=F,Se.act=V,Se.cloneElement=function(E,B,H){if(E==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+E+".");var J=R({},E.props),te=E.key,ie=E.ref,Q=E._owner;if(B!=null){if(B.ref!==void 0&&(ie=B.ref,Q=G.current),B.key!==void 0&&(te=""+B.key),E.type&&E.type.defaultProps)var q=E.type.defaultProps;for(ee in B)z.call(B,ee)&&!Y.hasOwnProperty(ee)&&(J[ee]=B[ee]===void 0&&q!==void 0?q[ee]:B[ee])}var ee=arguments.length-2;if(ee===1)J.children=H;else if(1<ee){q=Array(ee);for(var Z=0;Z<ee;Z++)q[Z]=arguments[Z+2];J.children=q}return{$$typeof:r,type:E.type,key:te,ref:ie,props:J,_owner:Q}},Se.createContext=function(E){return E={$$typeof:p,_currentValue:E,_currentValue2:E,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},E.Provider={$$typeof:f,_context:E},E.Consumer=E},Se.createElement=K,Se.createFactory=function(E){var B=K.bind(null,E);return B.type=E,B},Se.createRef=function(){return{current:null}},Se.forwardRef=function(E){return{$$typeof:_,render:E}},Se.isValidElement=ue,Se.lazy=function(E){return{$$typeof:y,_payload:{_status:-1,_result:E},_init:ce}},Se.memo=function(E,B){return{$$typeof:v,type:E,compare:B===void 0?null:B}},Se.startTransition=function(E){var B=L.transition;L.transition={};try{E()}finally{L.transition=B}},Se.unstable_act=V,Se.useCallback=function(E,B){return se.current.useCallback(E,B)},Se.useContext=function(E){return se.current.useContext(E)},Se.useDebugValue=function(){},Se.useDeferredValue=function(E){return se.current.useDeferredValue(E)},Se.useEffect=function(E,B){return se.current.useEffect(E,B)},Se.useId=function(){return se.current.useId()},Se.useImperativeHandle=function(E,B,H){return se.current.useImperativeHandle(E,B,H)},Se.useInsertionEffect=function(E,B){return se.current.useInsertionEffect(E,B)},Se.useLayoutEffect=function(E,B){return se.current.useLayoutEffect(E,B)},Se.useMemo=function(E,B){return se.current.useMemo(E,B)},Se.useReducer=function(E,B,H){return se.current.useReducer(E,B,H)},Se.useRef=function(E){return se.current.useRef(E)},Se.useState=function(E){return se.current.useState(E)},Se.useSyncExternalStore=function(E,B,H){return se.current.useSyncExternalStore(E,B,H)},Se.useTransition=function(){return se.current.useTransition()},Se.version="18.3.1",Se}var Vd;function La(){return Vd||(Vd=1,oa.exports=m0()),oa.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $d;function _0(){if($d)return wl;$d=1;var r=La(),o=Symbol.for("react.element"),s=Symbol.for("react.fragment"),c=Object.prototype.hasOwnProperty,d=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,f={key:!0,ref:!0,__self:!0,__source:!0};function p(_,h,v){var y,S={},k=null,D=null;v!==void 0&&(k=""+v),h.key!==void 0&&(k=""+h.key),h.ref!==void 0&&(D=h.ref);for(y in h)c.call(h,y)&&!f.hasOwnProperty(y)&&(S[y]=h[y]);if(_&&_.defaultProps)for(y in h=_.defaultProps,h)S[y]===void 0&&(S[y]=h[y]);return{$$typeof:o,type:_,key:k,ref:D,props:S,_owner:d.current}}return wl.Fragment=s,wl.jsx=p,wl.jsxs=p,wl}var Qd;function g0(){return Qd||(Qd=1,la.exports=_0()),la.exports}var u=g0(),g=La();const Dn=Tf(g),Of=p0({__proto__:null,default:Dn},[g]);var Lo={},sa={exports:{}},dt={},ia={exports:{}},aa={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xd;function h0(){return Xd||(Xd=1,(function(r){function o(L,F){var V=L.length;L.push(F);e:for(;0<V;){var E=V-1>>>1,B=L[E];if(0<d(B,F))L[E]=F,L[V]=B,V=E;else break e}}function s(L){return L.length===0?null:L[0]}function c(L){if(L.length===0)return null;var F=L[0],V=L.pop();if(V!==F){L[0]=V;e:for(var E=0,B=L.length,H=B>>>1;E<H;){var J=2*(E+1)-1,te=L[J],ie=J+1,Q=L[ie];if(0>d(te,V))ie<B&&0>d(Q,te)?(L[E]=Q,L[ie]=V,E=ie):(L[E]=te,L[J]=V,E=J);else if(ie<B&&0>d(Q,V))L[E]=Q,L[ie]=V,E=ie;else break e}}return F}function d(L,F){var V=L.sortIndex-F.sortIndex;return V!==0?V:L.id-F.id}if(typeof performance=="object"&&typeof performance.now=="function"){var f=performance;r.unstable_now=function(){return f.now()}}else{var p=Date,_=p.now();r.unstable_now=function(){return p.now()-_}}var h=[],v=[],y=1,S=null,k=3,D=!1,R=!1,x=!1,b=typeof setTimeout=="function"?setTimeout:null,j=typeof clearTimeout=="function"?clearTimeout:null,P=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function I(L){for(var F=s(v);F!==null;){if(F.callback===null)c(v);else if(F.startTime<=L)c(v),F.sortIndex=F.expirationTime,o(h,F);else break;F=s(v)}}function M(L){if(x=!1,I(L),!R)if(s(h)!==null)R=!0,ce(z);else{var F=s(v);F!==null&&se(M,F.startTime-L)}}function z(L,F){R=!1,x&&(x=!1,j(K),K=-1),D=!0;var V=k;try{for(I(F),S=s(h);S!==null&&(!(S.expirationTime>F)||L&&!he());){var E=S.callback;if(typeof E=="function"){S.callback=null,k=S.priorityLevel;var B=E(S.expirationTime<=F);F=r.unstable_now(),typeof B=="function"?S.callback=B:S===s(h)&&c(h),I(F)}else c(h);S=s(h)}if(S!==null)var H=!0;else{var J=s(v);J!==null&&se(M,J.startTime-F),H=!1}return H}finally{S=null,k=V,D=!1}}var G=!1,Y=null,K=-1,fe=5,ue=-1;function he(){return!(r.unstable_now()-ue<fe)}function pe(){if(Y!==null){var L=r.unstable_now();ue=L;var F=!0;try{F=Y(!0,L)}finally{F?me():(G=!1,Y=null)}}else G=!1}var me;if(typeof P=="function")me=function(){P(pe)};else if(typeof MessageChannel<"u"){var _e=new MessageChannel,xe=_e.port2;_e.port1.onmessage=pe,me=function(){xe.postMessage(null)}}else me=function(){b(pe,0)};function ce(L){Y=L,G||(G=!0,me())}function se(L,F){K=b(function(){L(r.unstable_now())},F)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(L){L.callback=null},r.unstable_continueExecution=function(){R||D||(R=!0,ce(z))},r.unstable_forceFrameRate=function(L){0>L||125<L?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):fe=0<L?Math.floor(1e3/L):5},r.unstable_getCurrentPriorityLevel=function(){return k},r.unstable_getFirstCallbackNode=function(){return s(h)},r.unstable_next=function(L){switch(k){case 1:case 2:case 3:var F=3;break;default:F=k}var V=k;k=F;try{return L()}finally{k=V}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=function(){},r.unstable_runWithPriority=function(L,F){switch(L){case 1:case 2:case 3:case 4:case 5:break;default:L=3}var V=k;k=L;try{return F()}finally{k=V}},r.unstable_scheduleCallback=function(L,F,V){var E=r.unstable_now();switch(typeof V=="object"&&V!==null?(V=V.delay,V=typeof V=="number"&&0<V?E+V:E):V=E,L){case 1:var B=-1;break;case 2:B=250;break;case 5:B=1073741823;break;case 4:B=1e4;break;default:B=5e3}return B=V+B,L={id:y++,callback:F,priorityLevel:L,startTime:V,expirationTime:B,sortIndex:-1},V>E?(L.sortIndex=V,o(v,L),s(h)===null&&L===s(v)&&(x?(j(K),K=-1):x=!0,se(M,V-E))):(L.sortIndex=B,o(h,L),R||D||(R=!0,ce(z))),L},r.unstable_shouldYield=he,r.unstable_wrapCallback=function(L){var F=k;return function(){var V=k;k=F;try{return L.apply(this,arguments)}finally{k=V}}}})(aa)),aa}var Kd;function y0(){return Kd||(Kd=1,ia.exports=h0()),ia.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Gd;function v0(){if(Gd)return dt;Gd=1;var r=La(),o=y0();function s(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var c=new Set,d={};function f(e,t){p(e,t),p(e+"Capture",t)}function p(e,t){for(d[e]=t,e=0;e<t.length;e++)c.add(t[e])}var _=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),h=Object.prototype.hasOwnProperty,v=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,y={},S={};function k(e){return h.call(S,e)?!0:h.call(y,e)?!1:v.test(e)?S[e]=!0:(y[e]=!0,!1)}function D(e,t,n,l){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return l?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function R(e,t,n,l){if(t===null||typeof t>"u"||D(e,t,n,l))return!0;if(l)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function x(e,t,n,l,i,a,m){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=l,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=m}var b={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){b[e]=new x(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];b[t]=new x(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){b[e]=new x(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){b[e]=new x(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){b[e]=new x(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){b[e]=new x(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){b[e]=new x(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){b[e]=new x(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){b[e]=new x(e,5,!1,e.toLowerCase(),null,!1,!1)});var j=/[\-:]([a-z])/g;function P(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(j,P);b[t]=new x(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(j,P);b[t]=new x(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(j,P);b[t]=new x(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){b[e]=new x(e,1,!1,e.toLowerCase(),null,!1,!1)}),b.xlinkHref=new x("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){b[e]=new x(e,1,!1,e.toLowerCase(),null,!0,!0)});function I(e,t,n,l){var i=b.hasOwnProperty(t)?b[t]:null;(i!==null?i.type!==0:l||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(R(t,n,i,l)&&(n=null),l||i===null?k(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,l=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,l?e.setAttributeNS(l,t,n):e.setAttribute(t,n))))}var M=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,z=Symbol.for("react.element"),G=Symbol.for("react.portal"),Y=Symbol.for("react.fragment"),K=Symbol.for("react.strict_mode"),fe=Symbol.for("react.profiler"),ue=Symbol.for("react.provider"),he=Symbol.for("react.context"),pe=Symbol.for("react.forward_ref"),me=Symbol.for("react.suspense"),_e=Symbol.for("react.suspense_list"),xe=Symbol.for("react.memo"),ce=Symbol.for("react.lazy"),se=Symbol.for("react.offscreen"),L=Symbol.iterator;function F(e){return e===null||typeof e!="object"?null:(e=L&&e[L]||e["@@iterator"],typeof e=="function"?e:null)}var V=Object.assign,E;function B(e){if(E===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);E=t&&t[1]||""}return`
`+E+e}var H=!1;function J(e,t){if(!e||H)return"";H=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(A){var l=A}Reflect.construct(e,[],t)}else{try{t.call()}catch(A){l=A}e.call(t.prototype)}else{try{throw Error()}catch(A){l=A}e()}}catch(A){if(A&&l&&typeof A.stack=="string"){for(var i=A.stack.split(`
`),a=l.stack.split(`
`),m=i.length-1,w=a.length-1;1<=m&&0<=w&&i[m]!==a[w];)w--;for(;1<=m&&0<=w;m--,w--)if(i[m]!==a[w]){if(m!==1||w!==1)do if(m--,w--,0>w||i[m]!==a[w]){var C=`
`+i[m].replace(" at new "," at ");return e.displayName&&C.includes("<anonymous>")&&(C=C.replace("<anonymous>",e.displayName)),C}while(1<=m&&0<=w);break}}}finally{H=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?B(e):""}function te(e){switch(e.tag){case 5:return B(e.type);case 16:return B("Lazy");case 13:return B("Suspense");case 19:return B("SuspenseList");case 0:case 2:case 15:return e=J(e.type,!1),e;case 11:return e=J(e.type.render,!1),e;case 1:return e=J(e.type,!0),e;default:return""}}function ie(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Y:return"Fragment";case G:return"Portal";case fe:return"Profiler";case K:return"StrictMode";case me:return"Suspense";case _e:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case he:return(e.displayName||"Context")+".Consumer";case ue:return(e._context.displayName||"Context")+".Provider";case pe:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case xe:return t=e.displayName||null,t!==null?t:ie(e.type)||"Memo";case ce:t=e._payload,e=e._init;try{return ie(e(t))}catch{}}return null}function Q(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ie(t);case 8:return t===K?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function q(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ee(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Z(e){var t=ee(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),l=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(m){l=""+m,a.call(this,m)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return l},setValue:function(m){l=""+m},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function le(e){e._valueTracker||(e._valueTracker=Z(e))}function ge(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),l="";return e&&(l=ee(e)?e.checked?"true":"false":e.value),e=l,e!==n?(t.setValue(e),!0):!1}function Ee(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Je(e,t){var n=t.checked;return V({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function kt(e,t){var n=t.defaultValue==null?"":t.defaultValue,l=t.checked!=null?t.checked:t.defaultChecked;n=q(t.value!=null?t.value:n),e._wrapperState={initialChecked:l,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Et(e,t){t=t.checked,t!=null&&I(e,"checked",t,!1)}function yt(e,t){Et(e,t);var n=q(t.value),l=t.type;if(n!=null)l==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(l==="submit"||l==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Nt(e,t.type,n):t.hasOwnProperty("defaultValue")&&Nt(e,t.type,q(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function In(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var l=t.type;if(!(l!=="submit"&&l!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Nt(e,t,n){(t!=="number"||Ee(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Gt=Array.isArray;function er(e,t,n,l){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&l&&(e[n].defaultSelected=!0)}else{for(n=""+q(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,l&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function ms(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(s(91));return V({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ec(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(s(92));if(Gt(n)){if(1<n.length)throw Error(s(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:q(n)}}function tc(e,t){var n=q(t.value),l=q(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),l!=null&&(e.defaultValue=""+l)}function nc(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function rc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function _s(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?rc(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Nl,lc=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,l,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,l,i)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Nl=Nl||document.createElement("div"),Nl.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Nl.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Mr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Br={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},hm=["Webkit","ms","Moz","O"];Object.keys(Br).forEach(function(e){hm.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Br[t]=Br[e]})});function oc(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Br.hasOwnProperty(e)&&Br[e]?(""+t).trim():t+"px"}function sc(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var l=n.indexOf("--")===0,i=oc(n,t[n],l);n==="float"&&(n="cssFloat"),l?e.setProperty(n,i):e[n]=i}}var ym=V({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function gs(e,t){if(t){if(ym[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(s(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(s(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(s(61))}if(t.style!=null&&typeof t.style!="object")throw Error(s(62))}}function hs(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ys=null;function vs(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var xs=null,tr=null,nr=null;function ic(e){if(e=sl(e)){if(typeof xs!="function")throw Error(s(280));var t=e.stateNode;t&&(t=Gl(t),xs(e.stateNode,e.type,t))}}function ac(e){tr?nr?nr.push(e):nr=[e]:tr=e}function cc(){if(tr){var e=tr,t=nr;if(nr=tr=null,ic(e),t)for(e=0;e<t.length;e++)ic(t[e])}}function uc(e,t){return e(t)}function dc(){}var ws=!1;function fc(e,t,n){if(ws)return e(t,n);ws=!0;try{return uc(e,t,n)}finally{ws=!1,(tr!==null||nr!==null)&&(dc(),cc())}}function zr(e,t){var n=e.stateNode;if(n===null)return null;var l=Gl(n);if(l===null)return null;n=l[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(e=e.type,l=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!l;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(s(231,t,typeof n));return n}var Ss=!1;if(_)try{var Fr={};Object.defineProperty(Fr,"passive",{get:function(){Ss=!0}}),window.addEventListener("test",Fr,Fr),window.removeEventListener("test",Fr,Fr)}catch{Ss=!1}function vm(e,t,n,l,i,a,m,w,C){var A=Array.prototype.slice.call(arguments,3);try{t.apply(n,A)}catch(W){this.onError(W)}}var Ur=!1,Dl=null,jl=!1,bs=null,xm={onError:function(e){Ur=!0,Dl=e}};function wm(e,t,n,l,i,a,m,w,C){Ur=!1,Dl=null,vm.apply(xm,arguments)}function Sm(e,t,n,l,i,a,m,w,C){if(wm.apply(this,arguments),Ur){if(Ur){var A=Dl;Ur=!1,Dl=null}else throw Error(s(198));jl||(jl=!0,bs=A)}}function An(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function pc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function mc(e){if(An(e)!==e)throw Error(s(188))}function bm(e){var t=e.alternate;if(!t){if(t=An(e),t===null)throw Error(s(188));return t!==e?null:e}for(var n=e,l=t;;){var i=n.return;if(i===null)break;var a=i.alternate;if(a===null){if(l=i.return,l!==null){n=l;continue}break}if(i.child===a.child){for(a=i.child;a;){if(a===n)return mc(i),e;if(a===l)return mc(i),t;a=a.sibling}throw Error(s(188))}if(n.return!==l.return)n=i,l=a;else{for(var m=!1,w=i.child;w;){if(w===n){m=!0,n=i,l=a;break}if(w===l){m=!0,l=i,n=a;break}w=w.sibling}if(!m){for(w=a.child;w;){if(w===n){m=!0,n=a,l=i;break}if(w===l){m=!0,l=a,n=i;break}w=w.sibling}if(!m)throw Error(s(189))}}if(n.alternate!==l)throw Error(s(190))}if(n.tag!==3)throw Error(s(188));return n.stateNode.current===n?e:t}function _c(e){return e=bm(e),e!==null?gc(e):null}function gc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=gc(e);if(t!==null)return t;e=e.sibling}return null}var hc=o.unstable_scheduleCallback,yc=o.unstable_cancelCallback,Cm=o.unstable_shouldYield,km=o.unstable_requestPaint,Be=o.unstable_now,Em=o.unstable_getCurrentPriorityLevel,Cs=o.unstable_ImmediatePriority,vc=o.unstable_UserBlockingPriority,Pl=o.unstable_NormalPriority,Nm=o.unstable_LowPriority,xc=o.unstable_IdlePriority,Rl=null,zt=null;function Dm(e){if(zt&&typeof zt.onCommitFiberRoot=="function")try{zt.onCommitFiberRoot(Rl,e,void 0,(e.current.flags&128)===128)}catch{}}var Dt=Math.clz32?Math.clz32:Rm,jm=Math.log,Pm=Math.LN2;function Rm(e){return e>>>=0,e===0?32:31-(jm(e)/Pm|0)|0}var Tl=64,Ol=4194304;function Wr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Il(e,t){var n=e.pendingLanes;if(n===0)return 0;var l=0,i=e.suspendedLanes,a=e.pingedLanes,m=n&268435455;if(m!==0){var w=m&~i;w!==0?l=Wr(w):(a&=m,a!==0&&(l=Wr(a)))}else m=n&~i,m!==0?l=Wr(m):a!==0&&(l=Wr(a));if(l===0)return 0;if(t!==0&&t!==l&&(t&i)===0&&(i=l&-l,a=t&-t,i>=a||i===16&&(a&4194240)!==0))return t;if((l&4)!==0&&(l|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=l;0<t;)n=31-Dt(t),i=1<<n,l|=e[n],t&=~i;return l}function Tm(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Om(e,t){for(var n=e.suspendedLanes,l=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes;0<a;){var m=31-Dt(a),w=1<<m,C=i[m];C===-1?((w&n)===0||(w&l)!==0)&&(i[m]=Tm(w,t)):C<=t&&(e.expiredLanes|=w),a&=~w}}function ks(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function wc(){var e=Tl;return Tl<<=1,(Tl&4194240)===0&&(Tl=64),e}function Es(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Yr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Dt(t),e[t]=n}function Im(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var l=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-Dt(n),a=1<<i;t[i]=0,l[i]=-1,e[i]=-1,n&=~a}}function Ns(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var l=31-Dt(n),i=1<<l;i&t|e[l]&t&&(e[l]|=t),n&=~i}}var Ne=0;function Sc(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var bc,Ds,Cc,kc,Ec,js=!1,Al=[],cn=null,un=null,dn=null,Hr=new Map,Vr=new Map,fn=[],Am="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Nc(e,t){switch(e){case"focusin":case"focusout":cn=null;break;case"dragenter":case"dragleave":un=null;break;case"mouseover":case"mouseout":dn=null;break;case"pointerover":case"pointerout":Hr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Vr.delete(t.pointerId)}}function $r(e,t,n,l,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:l,nativeEvent:a,targetContainers:[i]},t!==null&&(t=sl(t),t!==null&&Ds(t)),e):(e.eventSystemFlags|=l,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Lm(e,t,n,l,i){switch(t){case"focusin":return cn=$r(cn,e,t,n,l,i),!0;case"dragenter":return un=$r(un,e,t,n,l,i),!0;case"mouseover":return dn=$r(dn,e,t,n,l,i),!0;case"pointerover":var a=i.pointerId;return Hr.set(a,$r(Hr.get(a)||null,e,t,n,l,i)),!0;case"gotpointercapture":return a=i.pointerId,Vr.set(a,$r(Vr.get(a)||null,e,t,n,l,i)),!0}return!1}function Dc(e){var t=Ln(e.target);if(t!==null){var n=An(t);if(n!==null){if(t=n.tag,t===13){if(t=pc(n),t!==null){e.blockedOn=t,Ec(e.priority,function(){Cc(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ll(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Rs(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var l=new n.constructor(n.type,n);ys=l,n.target.dispatchEvent(l),ys=null}else return t=sl(n),t!==null&&Ds(t),e.blockedOn=n,!1;t.shift()}return!0}function jc(e,t,n){Ll(e)&&n.delete(t)}function Mm(){js=!1,cn!==null&&Ll(cn)&&(cn=null),un!==null&&Ll(un)&&(un=null),dn!==null&&Ll(dn)&&(dn=null),Hr.forEach(jc),Vr.forEach(jc)}function Qr(e,t){e.blockedOn===t&&(e.blockedOn=null,js||(js=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,Mm)))}function Xr(e){function t(i){return Qr(i,e)}if(0<Al.length){Qr(Al[0],e);for(var n=1;n<Al.length;n++){var l=Al[n];l.blockedOn===e&&(l.blockedOn=null)}}for(cn!==null&&Qr(cn,e),un!==null&&Qr(un,e),dn!==null&&Qr(dn,e),Hr.forEach(t),Vr.forEach(t),n=0;n<fn.length;n++)l=fn[n],l.blockedOn===e&&(l.blockedOn=null);for(;0<fn.length&&(n=fn[0],n.blockedOn===null);)Dc(n),n.blockedOn===null&&fn.shift()}var rr=M.ReactCurrentBatchConfig,Ml=!0;function Bm(e,t,n,l){var i=Ne,a=rr.transition;rr.transition=null;try{Ne=1,Ps(e,t,n,l)}finally{Ne=i,rr.transition=a}}function zm(e,t,n,l){var i=Ne,a=rr.transition;rr.transition=null;try{Ne=4,Ps(e,t,n,l)}finally{Ne=i,rr.transition=a}}function Ps(e,t,n,l){if(Ml){var i=Rs(e,t,n,l);if(i===null)Xs(e,t,l,Bl,n),Nc(e,l);else if(Lm(i,e,t,n,l))l.stopPropagation();else if(Nc(e,l),t&4&&-1<Am.indexOf(e)){for(;i!==null;){var a=sl(i);if(a!==null&&bc(a),a=Rs(e,t,n,l),a===null&&Xs(e,t,l,Bl,n),a===i)break;i=a}i!==null&&l.stopPropagation()}else Xs(e,t,l,null,n)}}var Bl=null;function Rs(e,t,n,l){if(Bl=null,e=vs(l),e=Ln(e),e!==null)if(t=An(e),t===null)e=null;else if(n=t.tag,n===13){if(e=pc(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Bl=e,null}function Pc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Em()){case Cs:return 1;case vc:return 4;case Pl:case Nm:return 16;case xc:return 536870912;default:return 16}default:return 16}}var pn=null,Ts=null,zl=null;function Rc(){if(zl)return zl;var e,t=Ts,n=t.length,l,i="value"in pn?pn.value:pn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var m=n-e;for(l=1;l<=m&&t[n-l]===i[a-l];l++);return zl=i.slice(e,1<l?1-l:void 0)}function Fl(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ul(){return!0}function Tc(){return!1}function ft(e){function t(n,l,i,a,m){this._reactName=n,this._targetInst=i,this.type=l,this.nativeEvent=a,this.target=m,this.currentTarget=null;for(var w in e)e.hasOwnProperty(w)&&(n=e[w],this[w]=n?n(a):a[w]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?Ul:Tc,this.isPropagationStopped=Tc,this}return V(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ul)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ul)},persist:function(){},isPersistent:Ul}),t}var lr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Os=ft(lr),Kr=V({},lr,{view:0,detail:0}),Fm=ft(Kr),Is,As,Gr,Wl=V({},Kr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ms,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Gr&&(Gr&&e.type==="mousemove"?(Is=e.screenX-Gr.screenX,As=e.screenY-Gr.screenY):As=Is=0,Gr=e),Is)},movementY:function(e){return"movementY"in e?e.movementY:As}}),Oc=ft(Wl),Um=V({},Wl,{dataTransfer:0}),Wm=ft(Um),Ym=V({},Kr,{relatedTarget:0}),Ls=ft(Ym),Hm=V({},lr,{animationName:0,elapsedTime:0,pseudoElement:0}),Vm=ft(Hm),$m=V({},lr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Qm=ft($m),Xm=V({},lr,{data:0}),Ic=ft(Xm),Km={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Gm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Zm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Jm(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Zm[e])?!!t[e]:!1}function Ms(){return Jm}var qm=V({},Kr,{key:function(e){if(e.key){var t=Km[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Fl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Gm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ms,charCode:function(e){return e.type==="keypress"?Fl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Fl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),e_=ft(qm),t_=V({},Wl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ac=ft(t_),n_=V({},Kr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ms}),r_=ft(n_),l_=V({},lr,{propertyName:0,elapsedTime:0,pseudoElement:0}),o_=ft(l_),s_=V({},Wl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),i_=ft(s_),a_=[9,13,27,32],Bs=_&&"CompositionEvent"in window,Zr=null;_&&"documentMode"in document&&(Zr=document.documentMode);var c_=_&&"TextEvent"in window&&!Zr,Lc=_&&(!Bs||Zr&&8<Zr&&11>=Zr),Mc=" ",Bc=!1;function zc(e,t){switch(e){case"keyup":return a_.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Fc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var or=!1;function u_(e,t){switch(e){case"compositionend":return Fc(t);case"keypress":return t.which!==32?null:(Bc=!0,Mc);case"textInput":return e=t.data,e===Mc&&Bc?null:e;default:return null}}function d_(e,t){if(or)return e==="compositionend"||!Bs&&zc(e,t)?(e=Rc(),zl=Ts=pn=null,or=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Lc&&t.locale!=="ko"?null:t.data;default:return null}}var f_={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Uc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!f_[e.type]:t==="textarea"}function Wc(e,t,n,l){ac(l),t=Ql(t,"onChange"),0<t.length&&(n=new Os("onChange","change",null,n,l),e.push({event:n,listeners:t}))}var Jr=null,qr=null;function p_(e){su(e,0)}function Yl(e){var t=ur(e);if(ge(t))return e}function m_(e,t){if(e==="change")return t}var Yc=!1;if(_){var zs;if(_){var Fs="oninput"in document;if(!Fs){var Hc=document.createElement("div");Hc.setAttribute("oninput","return;"),Fs=typeof Hc.oninput=="function"}zs=Fs}else zs=!1;Yc=zs&&(!document.documentMode||9<document.documentMode)}function Vc(){Jr&&(Jr.detachEvent("onpropertychange",$c),qr=Jr=null)}function $c(e){if(e.propertyName==="value"&&Yl(qr)){var t=[];Wc(t,qr,e,vs(e)),fc(p_,t)}}function __(e,t,n){e==="focusin"?(Vc(),Jr=t,qr=n,Jr.attachEvent("onpropertychange",$c)):e==="focusout"&&Vc()}function g_(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Yl(qr)}function h_(e,t){if(e==="click")return Yl(t)}function y_(e,t){if(e==="input"||e==="change")return Yl(t)}function v_(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var jt=typeof Object.is=="function"?Object.is:v_;function el(e,t){if(jt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),l=Object.keys(t);if(n.length!==l.length)return!1;for(l=0;l<n.length;l++){var i=n[l];if(!h.call(t,i)||!jt(e[i],t[i]))return!1}return!0}function Qc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Xc(e,t){var n=Qc(e);e=0;for(var l;n;){if(n.nodeType===3){if(l=e+n.textContent.length,e<=t&&l>=t)return{node:n,offset:t-e};e=l}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Qc(n)}}function Kc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Kc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Gc(){for(var e=window,t=Ee();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ee(e.document)}return t}function Us(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function x_(e){var t=Gc(),n=e.focusedElem,l=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Kc(n.ownerDocument.documentElement,n)){if(l!==null&&Us(n)){if(t=l.start,e=l.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,a=Math.min(l.start,i);l=l.end===void 0?a:Math.min(l.end,i),!e.extend&&a>l&&(i=l,l=a,a=i),i=Xc(n,a);var m=Xc(n,l);i&&m&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==m.node||e.focusOffset!==m.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),a>l?(e.addRange(t),e.extend(m.node,m.offset)):(t.setEnd(m.node,m.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var w_=_&&"documentMode"in document&&11>=document.documentMode,sr=null,Ws=null,tl=null,Ys=!1;function Zc(e,t,n){var l=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ys||sr==null||sr!==Ee(l)||(l=sr,"selectionStart"in l&&Us(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),tl&&el(tl,l)||(tl=l,l=Ql(Ws,"onSelect"),0<l.length&&(t=new Os("onSelect","select",null,t,n),e.push({event:t,listeners:l}),t.target=sr)))}function Hl(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var ir={animationend:Hl("Animation","AnimationEnd"),animationiteration:Hl("Animation","AnimationIteration"),animationstart:Hl("Animation","AnimationStart"),transitionend:Hl("Transition","TransitionEnd")},Hs={},Jc={};_&&(Jc=document.createElement("div").style,"AnimationEvent"in window||(delete ir.animationend.animation,delete ir.animationiteration.animation,delete ir.animationstart.animation),"TransitionEvent"in window||delete ir.transitionend.transition);function Vl(e){if(Hs[e])return Hs[e];if(!ir[e])return e;var t=ir[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Jc)return Hs[e]=t[n];return e}var qc=Vl("animationend"),eu=Vl("animationiteration"),tu=Vl("animationstart"),nu=Vl("transitionend"),ru=new Map,lu="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function mn(e,t){ru.set(e,t),f(t,[e])}for(var Vs=0;Vs<lu.length;Vs++){var $s=lu[Vs],S_=$s.toLowerCase(),b_=$s[0].toUpperCase()+$s.slice(1);mn(S_,"on"+b_)}mn(qc,"onAnimationEnd"),mn(eu,"onAnimationIteration"),mn(tu,"onAnimationStart"),mn("dblclick","onDoubleClick"),mn("focusin","onFocus"),mn("focusout","onBlur"),mn(nu,"onTransitionEnd"),p("onMouseEnter",["mouseout","mouseover"]),p("onMouseLeave",["mouseout","mouseover"]),p("onPointerEnter",["pointerout","pointerover"]),p("onPointerLeave",["pointerout","pointerover"]),f("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),f("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),f("onBeforeInput",["compositionend","keypress","textInput","paste"]),f("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),f("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),f("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var nl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),C_=new Set("cancel close invalid load scroll toggle".split(" ").concat(nl));function ou(e,t,n){var l=e.type||"unknown-event";e.currentTarget=n,Sm(l,t,void 0,e),e.currentTarget=null}function su(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var l=e[n],i=l.event;l=l.listeners;e:{var a=void 0;if(t)for(var m=l.length-1;0<=m;m--){var w=l[m],C=w.instance,A=w.currentTarget;if(w=w.listener,C!==a&&i.isPropagationStopped())break e;ou(i,w,A),a=C}else for(m=0;m<l.length;m++){if(w=l[m],C=w.instance,A=w.currentTarget,w=w.listener,C!==a&&i.isPropagationStopped())break e;ou(i,w,A),a=C}}}if(jl)throw e=bs,jl=!1,bs=null,e}function Re(e,t){var n=t[ei];n===void 0&&(n=t[ei]=new Set);var l=e+"__bubble";n.has(l)||(iu(t,e,2,!1),n.add(l))}function Qs(e,t,n){var l=0;t&&(l|=4),iu(n,e,l,t)}var $l="_reactListening"+Math.random().toString(36).slice(2);function rl(e){if(!e[$l]){e[$l]=!0,c.forEach(function(n){n!=="selectionchange"&&(C_.has(n)||Qs(n,!1,e),Qs(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[$l]||(t[$l]=!0,Qs("selectionchange",!1,t))}}function iu(e,t,n,l){switch(Pc(t)){case 1:var i=Bm;break;case 4:i=zm;break;default:i=Ps}n=i.bind(null,t,n,e),i=void 0,!Ss||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),l?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Xs(e,t,n,l,i){var a=l;if((t&1)===0&&(t&2)===0&&l!==null)e:for(;;){if(l===null)return;var m=l.tag;if(m===3||m===4){var w=l.stateNode.containerInfo;if(w===i||w.nodeType===8&&w.parentNode===i)break;if(m===4)for(m=l.return;m!==null;){var C=m.tag;if((C===3||C===4)&&(C=m.stateNode.containerInfo,C===i||C.nodeType===8&&C.parentNode===i))return;m=m.return}for(;w!==null;){if(m=Ln(w),m===null)return;if(C=m.tag,C===5||C===6){l=a=m;continue e}w=w.parentNode}}l=l.return}fc(function(){var A=a,W=vs(n),$=[];e:{var U=ru.get(e);if(U!==void 0){var ne=Os,oe=e;switch(e){case"keypress":if(Fl(n)===0)break e;case"keydown":case"keyup":ne=e_;break;case"focusin":oe="focus",ne=Ls;break;case"focusout":oe="blur",ne=Ls;break;case"beforeblur":case"afterblur":ne=Ls;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ne=Oc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ne=Wm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ne=r_;break;case qc:case eu:case tu:ne=Vm;break;case nu:ne=o_;break;case"scroll":ne=Fm;break;case"wheel":ne=i_;break;case"copy":case"cut":case"paste":ne=Qm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ne=Ac}var ae=(t&4)!==0,ze=!ae&&e==="scroll",T=ae?U!==null?U+"Capture":null:U;ae=[];for(var N=A,O;N!==null;){O=N;var X=O.stateNode;if(O.tag===5&&X!==null&&(O=X,T!==null&&(X=zr(N,T),X!=null&&ae.push(ll(N,X,O)))),ze)break;N=N.return}0<ae.length&&(U=new ne(U,oe,null,n,W),$.push({event:U,listeners:ae}))}}if((t&7)===0){e:{if(U=e==="mouseover"||e==="pointerover",ne=e==="mouseout"||e==="pointerout",U&&n!==ys&&(oe=n.relatedTarget||n.fromElement)&&(Ln(oe)||oe[Zt]))break e;if((ne||U)&&(U=W.window===W?W:(U=W.ownerDocument)?U.defaultView||U.parentWindow:window,ne?(oe=n.relatedTarget||n.toElement,ne=A,oe=oe?Ln(oe):null,oe!==null&&(ze=An(oe),oe!==ze||oe.tag!==5&&oe.tag!==6)&&(oe=null)):(ne=null,oe=A),ne!==oe)){if(ae=Oc,X="onMouseLeave",T="onMouseEnter",N="mouse",(e==="pointerout"||e==="pointerover")&&(ae=Ac,X="onPointerLeave",T="onPointerEnter",N="pointer"),ze=ne==null?U:ur(ne),O=oe==null?U:ur(oe),U=new ae(X,N+"leave",ne,n,W),U.target=ze,U.relatedTarget=O,X=null,Ln(W)===A&&(ae=new ae(T,N+"enter",oe,n,W),ae.target=O,ae.relatedTarget=ze,X=ae),ze=X,ne&&oe)t:{for(ae=ne,T=oe,N=0,O=ae;O;O=ar(O))N++;for(O=0,X=T;X;X=ar(X))O++;for(;0<N-O;)ae=ar(ae),N--;for(;0<O-N;)T=ar(T),O--;for(;N--;){if(ae===T||T!==null&&ae===T.alternate)break t;ae=ar(ae),T=ar(T)}ae=null}else ae=null;ne!==null&&au($,U,ne,ae,!1),oe!==null&&ze!==null&&au($,ze,oe,ae,!0)}}e:{if(U=A?ur(A):window,ne=U.nodeName&&U.nodeName.toLowerCase(),ne==="select"||ne==="input"&&U.type==="file")var de=m_;else if(Uc(U))if(Yc)de=y_;else{de=g_;var ye=__}else(ne=U.nodeName)&&ne.toLowerCase()==="input"&&(U.type==="checkbox"||U.type==="radio")&&(de=h_);if(de&&(de=de(e,A))){Wc($,de,n,W);break e}ye&&ye(e,U,A),e==="focusout"&&(ye=U._wrapperState)&&ye.controlled&&U.type==="number"&&Nt(U,"number",U.value)}switch(ye=A?ur(A):window,e){case"focusin":(Uc(ye)||ye.contentEditable==="true")&&(sr=ye,Ws=A,tl=null);break;case"focusout":tl=Ws=sr=null;break;case"mousedown":Ys=!0;break;case"contextmenu":case"mouseup":case"dragend":Ys=!1,Zc($,n,W);break;case"selectionchange":if(w_)break;case"keydown":case"keyup":Zc($,n,W)}var ve;if(Bs)e:{switch(e){case"compositionstart":var we="onCompositionStart";break e;case"compositionend":we="onCompositionEnd";break e;case"compositionupdate":we="onCompositionUpdate";break e}we=void 0}else or?zc(e,n)&&(we="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(we="onCompositionStart");we&&(Lc&&n.locale!=="ko"&&(or||we!=="onCompositionStart"?we==="onCompositionEnd"&&or&&(ve=Rc()):(pn=W,Ts="value"in pn?pn.value:pn.textContent,or=!0)),ye=Ql(A,we),0<ye.length&&(we=new Ic(we,e,null,n,W),$.push({event:we,listeners:ye}),ve?we.data=ve:(ve=Fc(n),ve!==null&&(we.data=ve)))),(ve=c_?u_(e,n):d_(e,n))&&(A=Ql(A,"onBeforeInput"),0<A.length&&(W=new Ic("onBeforeInput","beforeinput",null,n,W),$.push({event:W,listeners:A}),W.data=ve))}su($,t)})}function ll(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ql(e,t){for(var n=t+"Capture",l=[];e!==null;){var i=e,a=i.stateNode;i.tag===5&&a!==null&&(i=a,a=zr(e,n),a!=null&&l.unshift(ll(e,a,i)),a=zr(e,t),a!=null&&l.push(ll(e,a,i))),e=e.return}return l}function ar(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function au(e,t,n,l,i){for(var a=t._reactName,m=[];n!==null&&n!==l;){var w=n,C=w.alternate,A=w.stateNode;if(C!==null&&C===l)break;w.tag===5&&A!==null&&(w=A,i?(C=zr(n,a),C!=null&&m.unshift(ll(n,C,w))):i||(C=zr(n,a),C!=null&&m.push(ll(n,C,w)))),n=n.return}m.length!==0&&e.push({event:t,listeners:m})}var k_=/\r\n?/g,E_=/\u0000|\uFFFD/g;function cu(e){return(typeof e=="string"?e:""+e).replace(k_,`
`).replace(E_,"")}function Xl(e,t,n){if(t=cu(t),cu(e)!==t&&n)throw Error(s(425))}function Kl(){}var Ks=null,Gs=null;function Zs(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Js=typeof setTimeout=="function"?setTimeout:void 0,N_=typeof clearTimeout=="function"?clearTimeout:void 0,uu=typeof Promise=="function"?Promise:void 0,D_=typeof queueMicrotask=="function"?queueMicrotask:typeof uu<"u"?function(e){return uu.resolve(null).then(e).catch(j_)}:Js;function j_(e){setTimeout(function(){throw e})}function qs(e,t){var n=t,l=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(l===0){e.removeChild(i),Xr(t);return}l--}else n!=="$"&&n!=="$?"&&n!=="$!"||l++;n=i}while(n);Xr(t)}function _n(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function du(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var cr=Math.random().toString(36).slice(2),Ft="__reactFiber$"+cr,ol="__reactProps$"+cr,Zt="__reactContainer$"+cr,ei="__reactEvents$"+cr,P_="__reactListeners$"+cr,R_="__reactHandles$"+cr;function Ln(e){var t=e[Ft];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Zt]||n[Ft]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=du(e);e!==null;){if(n=e[Ft])return n;e=du(e)}return t}e=n,n=e.parentNode}return null}function sl(e){return e=e[Ft]||e[Zt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function ur(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(s(33))}function Gl(e){return e[ol]||null}var ti=[],dr=-1;function gn(e){return{current:e}}function Te(e){0>dr||(e.current=ti[dr],ti[dr]=null,dr--)}function je(e,t){dr++,ti[dr]=e.current,e.current=t}var hn={},qe=gn(hn),st=gn(!1),Mn=hn;function fr(e,t){var n=e.type.contextTypes;if(!n)return hn;var l=e.stateNode;if(l&&l.__reactInternalMemoizedUnmaskedChildContext===t)return l.__reactInternalMemoizedMaskedChildContext;var i={},a;for(a in n)i[a]=t[a];return l&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function it(e){return e=e.childContextTypes,e!=null}function Zl(){Te(st),Te(qe)}function fu(e,t,n){if(qe.current!==hn)throw Error(s(168));je(qe,t),je(st,n)}function pu(e,t,n){var l=e.stateNode;if(t=t.childContextTypes,typeof l.getChildContext!="function")return n;l=l.getChildContext();for(var i in l)if(!(i in t))throw Error(s(108,Q(e)||"Unknown",i));return V({},n,l)}function Jl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||hn,Mn=qe.current,je(qe,e),je(st,st.current),!0}function mu(e,t,n){var l=e.stateNode;if(!l)throw Error(s(169));n?(e=pu(e,t,Mn),l.__reactInternalMemoizedMergedChildContext=e,Te(st),Te(qe),je(qe,e)):Te(st),je(st,n)}var Jt=null,ql=!1,ni=!1;function _u(e){Jt===null?Jt=[e]:Jt.push(e)}function T_(e){ql=!0,_u(e)}function yn(){if(!ni&&Jt!==null){ni=!0;var e=0,t=Ne;try{var n=Jt;for(Ne=1;e<n.length;e++){var l=n[e];do l=l(!0);while(l!==null)}Jt=null,ql=!1}catch(i){throw Jt!==null&&(Jt=Jt.slice(e+1)),hc(Cs,yn),i}finally{Ne=t,ni=!1}}return null}var pr=[],mr=0,eo=null,to=0,vt=[],xt=0,Bn=null,qt=1,en="";function zn(e,t){pr[mr++]=to,pr[mr++]=eo,eo=e,to=t}function gu(e,t,n){vt[xt++]=qt,vt[xt++]=en,vt[xt++]=Bn,Bn=e;var l=qt;e=en;var i=32-Dt(l)-1;l&=~(1<<i),n+=1;var a=32-Dt(t)+i;if(30<a){var m=i-i%5;a=(l&(1<<m)-1).toString(32),l>>=m,i-=m,qt=1<<32-Dt(t)+i|n<<i|l,en=a+e}else qt=1<<a|n<<i|l,en=e}function ri(e){e.return!==null&&(zn(e,1),gu(e,1,0))}function li(e){for(;e===eo;)eo=pr[--mr],pr[mr]=null,to=pr[--mr],pr[mr]=null;for(;e===Bn;)Bn=vt[--xt],vt[xt]=null,en=vt[--xt],vt[xt]=null,qt=vt[--xt],vt[xt]=null}var pt=null,mt=null,Ie=!1,Pt=null;function hu(e,t){var n=Ct(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function yu(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,pt=e,mt=_n(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,pt=e,mt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Bn!==null?{id:qt,overflow:en}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ct(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,pt=e,mt=null,!0):!1;default:return!1}}function oi(e){return(e.mode&1)!==0&&(e.flags&128)===0}function si(e){if(Ie){var t=mt;if(t){var n=t;if(!yu(e,t)){if(oi(e))throw Error(s(418));t=_n(n.nextSibling);var l=pt;t&&yu(e,t)?hu(l,n):(e.flags=e.flags&-4097|2,Ie=!1,pt=e)}}else{if(oi(e))throw Error(s(418));e.flags=e.flags&-4097|2,Ie=!1,pt=e}}}function vu(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;pt=e}function no(e){if(e!==pt)return!1;if(!Ie)return vu(e),Ie=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Zs(e.type,e.memoizedProps)),t&&(t=mt)){if(oi(e))throw xu(),Error(s(418));for(;t;)hu(e,t),t=_n(t.nextSibling)}if(vu(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){mt=_n(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}mt=null}}else mt=pt?_n(e.stateNode.nextSibling):null;return!0}function xu(){for(var e=mt;e;)e=_n(e.nextSibling)}function _r(){mt=pt=null,Ie=!1}function ii(e){Pt===null?Pt=[e]:Pt.push(e)}var O_=M.ReactCurrentBatchConfig;function il(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(s(309));var l=n.stateNode}if(!l)throw Error(s(147,e));var i=l,a=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===a?t.ref:(t=function(m){var w=i.refs;m===null?delete w[a]:w[a]=m},t._stringRef=a,t)}if(typeof e!="string")throw Error(s(284));if(!n._owner)throw Error(s(290,e))}return e}function ro(e,t){throw e=Object.prototype.toString.call(t),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function wu(e){var t=e._init;return t(e._payload)}function Su(e){function t(T,N){if(e){var O=T.deletions;O===null?(T.deletions=[N],T.flags|=16):O.push(N)}}function n(T,N){if(!e)return null;for(;N!==null;)t(T,N),N=N.sibling;return null}function l(T,N){for(T=new Map;N!==null;)N.key!==null?T.set(N.key,N):T.set(N.index,N),N=N.sibling;return T}function i(T,N){return T=En(T,N),T.index=0,T.sibling=null,T}function a(T,N,O){return T.index=O,e?(O=T.alternate,O!==null?(O=O.index,O<N?(T.flags|=2,N):O):(T.flags|=2,N)):(T.flags|=1048576,N)}function m(T){return e&&T.alternate===null&&(T.flags|=2),T}function w(T,N,O,X){return N===null||N.tag!==6?(N=Ji(O,T.mode,X),N.return=T,N):(N=i(N,O),N.return=T,N)}function C(T,N,O,X){var de=O.type;return de===Y?W(T,N,O.props.children,X,O.key):N!==null&&(N.elementType===de||typeof de=="object"&&de!==null&&de.$$typeof===ce&&wu(de)===N.type)?(X=i(N,O.props),X.ref=il(T,N,O),X.return=T,X):(X=Do(O.type,O.key,O.props,null,T.mode,X),X.ref=il(T,N,O),X.return=T,X)}function A(T,N,O,X){return N===null||N.tag!==4||N.stateNode.containerInfo!==O.containerInfo||N.stateNode.implementation!==O.implementation?(N=qi(O,T.mode,X),N.return=T,N):(N=i(N,O.children||[]),N.return=T,N)}function W(T,N,O,X,de){return N===null||N.tag!==7?(N=Qn(O,T.mode,X,de),N.return=T,N):(N=i(N,O),N.return=T,N)}function $(T,N,O){if(typeof N=="string"&&N!==""||typeof N=="number")return N=Ji(""+N,T.mode,O),N.return=T,N;if(typeof N=="object"&&N!==null){switch(N.$$typeof){case z:return O=Do(N.type,N.key,N.props,null,T.mode,O),O.ref=il(T,null,N),O.return=T,O;case G:return N=qi(N,T.mode,O),N.return=T,N;case ce:var X=N._init;return $(T,X(N._payload),O)}if(Gt(N)||F(N))return N=Qn(N,T.mode,O,null),N.return=T,N;ro(T,N)}return null}function U(T,N,O,X){var de=N!==null?N.key:null;if(typeof O=="string"&&O!==""||typeof O=="number")return de!==null?null:w(T,N,""+O,X);if(typeof O=="object"&&O!==null){switch(O.$$typeof){case z:return O.key===de?C(T,N,O,X):null;case G:return O.key===de?A(T,N,O,X):null;case ce:return de=O._init,U(T,N,de(O._payload),X)}if(Gt(O)||F(O))return de!==null?null:W(T,N,O,X,null);ro(T,O)}return null}function ne(T,N,O,X,de){if(typeof X=="string"&&X!==""||typeof X=="number")return T=T.get(O)||null,w(N,T,""+X,de);if(typeof X=="object"&&X!==null){switch(X.$$typeof){case z:return T=T.get(X.key===null?O:X.key)||null,C(N,T,X,de);case G:return T=T.get(X.key===null?O:X.key)||null,A(N,T,X,de);case ce:var ye=X._init;return ne(T,N,O,ye(X._payload),de)}if(Gt(X)||F(X))return T=T.get(O)||null,W(N,T,X,de,null);ro(N,X)}return null}function oe(T,N,O,X){for(var de=null,ye=null,ve=N,we=N=0,$e=null;ve!==null&&we<O.length;we++){ve.index>we?($e=ve,ve=null):$e=ve.sibling;var Ce=U(T,ve,O[we],X);if(Ce===null){ve===null&&(ve=$e);break}e&&ve&&Ce.alternate===null&&t(T,ve),N=a(Ce,N,we),ye===null?de=Ce:ye.sibling=Ce,ye=Ce,ve=$e}if(we===O.length)return n(T,ve),Ie&&zn(T,we),de;if(ve===null){for(;we<O.length;we++)ve=$(T,O[we],X),ve!==null&&(N=a(ve,N,we),ye===null?de=ve:ye.sibling=ve,ye=ve);return Ie&&zn(T,we),de}for(ve=l(T,ve);we<O.length;we++)$e=ne(ve,T,we,O[we],X),$e!==null&&(e&&$e.alternate!==null&&ve.delete($e.key===null?we:$e.key),N=a($e,N,we),ye===null?de=$e:ye.sibling=$e,ye=$e);return e&&ve.forEach(function(Nn){return t(T,Nn)}),Ie&&zn(T,we),de}function ae(T,N,O,X){var de=F(O);if(typeof de!="function")throw Error(s(150));if(O=de.call(O),O==null)throw Error(s(151));for(var ye=de=null,ve=N,we=N=0,$e=null,Ce=O.next();ve!==null&&!Ce.done;we++,Ce=O.next()){ve.index>we?($e=ve,ve=null):$e=ve.sibling;var Nn=U(T,ve,Ce.value,X);if(Nn===null){ve===null&&(ve=$e);break}e&&ve&&Nn.alternate===null&&t(T,ve),N=a(Nn,N,we),ye===null?de=Nn:ye.sibling=Nn,ye=Nn,ve=$e}if(Ce.done)return n(T,ve),Ie&&zn(T,we),de;if(ve===null){for(;!Ce.done;we++,Ce=O.next())Ce=$(T,Ce.value,X),Ce!==null&&(N=a(Ce,N,we),ye===null?de=Ce:ye.sibling=Ce,ye=Ce);return Ie&&zn(T,we),de}for(ve=l(T,ve);!Ce.done;we++,Ce=O.next())Ce=ne(ve,T,we,Ce.value,X),Ce!==null&&(e&&Ce.alternate!==null&&ve.delete(Ce.key===null?we:Ce.key),N=a(Ce,N,we),ye===null?de=Ce:ye.sibling=Ce,ye=Ce);return e&&ve.forEach(function(f0){return t(T,f0)}),Ie&&zn(T,we),de}function ze(T,N,O,X){if(typeof O=="object"&&O!==null&&O.type===Y&&O.key===null&&(O=O.props.children),typeof O=="object"&&O!==null){switch(O.$$typeof){case z:e:{for(var de=O.key,ye=N;ye!==null;){if(ye.key===de){if(de=O.type,de===Y){if(ye.tag===7){n(T,ye.sibling),N=i(ye,O.props.children),N.return=T,T=N;break e}}else if(ye.elementType===de||typeof de=="object"&&de!==null&&de.$$typeof===ce&&wu(de)===ye.type){n(T,ye.sibling),N=i(ye,O.props),N.ref=il(T,ye,O),N.return=T,T=N;break e}n(T,ye);break}else t(T,ye);ye=ye.sibling}O.type===Y?(N=Qn(O.props.children,T.mode,X,O.key),N.return=T,T=N):(X=Do(O.type,O.key,O.props,null,T.mode,X),X.ref=il(T,N,O),X.return=T,T=X)}return m(T);case G:e:{for(ye=O.key;N!==null;){if(N.key===ye)if(N.tag===4&&N.stateNode.containerInfo===O.containerInfo&&N.stateNode.implementation===O.implementation){n(T,N.sibling),N=i(N,O.children||[]),N.return=T,T=N;break e}else{n(T,N);break}else t(T,N);N=N.sibling}N=qi(O,T.mode,X),N.return=T,T=N}return m(T);case ce:return ye=O._init,ze(T,N,ye(O._payload),X)}if(Gt(O))return oe(T,N,O,X);if(F(O))return ae(T,N,O,X);ro(T,O)}return typeof O=="string"&&O!==""||typeof O=="number"?(O=""+O,N!==null&&N.tag===6?(n(T,N.sibling),N=i(N,O),N.return=T,T=N):(n(T,N),N=Ji(O,T.mode,X),N.return=T,T=N),m(T)):n(T,N)}return ze}var gr=Su(!0),bu=Su(!1),lo=gn(null),oo=null,hr=null,ai=null;function ci(){ai=hr=oo=null}function ui(e){var t=lo.current;Te(lo),e._currentValue=t}function di(e,t,n){for(;e!==null;){var l=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,l!==null&&(l.childLanes|=t)):l!==null&&(l.childLanes&t)!==t&&(l.childLanes|=t),e===n)break;e=e.return}}function yr(e,t){oo=e,ai=hr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(at=!0),e.firstContext=null)}function wt(e){var t=e._currentValue;if(ai!==e)if(e={context:e,memoizedValue:t,next:null},hr===null){if(oo===null)throw Error(s(308));hr=e,oo.dependencies={lanes:0,firstContext:e}}else hr=hr.next=e;return t}var Fn=null;function fi(e){Fn===null?Fn=[e]:Fn.push(e)}function Cu(e,t,n,l){var i=t.interleaved;return i===null?(n.next=n,fi(t)):(n.next=i.next,i.next=n),t.interleaved=n,tn(e,l)}function tn(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var vn=!1;function pi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ku(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function nn(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function xn(e,t,n){var l=e.updateQueue;if(l===null)return null;if(l=l.shared,(be&2)!==0){var i=l.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),l.pending=t,tn(e,n)}return i=l.interleaved,i===null?(t.next=t,fi(l)):(t.next=i.next,i.next=t),l.interleaved=t,tn(e,n)}function so(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var l=t.lanes;l&=e.pendingLanes,n|=l,t.lanes=n,Ns(e,n)}}function Eu(e,t){var n=e.updateQueue,l=e.alternate;if(l!==null&&(l=l.updateQueue,n===l)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var m={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};a===null?i=a=m:a=a.next=m,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:l.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:l.shared,effects:l.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function io(e,t,n,l){var i=e.updateQueue;vn=!1;var a=i.firstBaseUpdate,m=i.lastBaseUpdate,w=i.shared.pending;if(w!==null){i.shared.pending=null;var C=w,A=C.next;C.next=null,m===null?a=A:m.next=A,m=C;var W=e.alternate;W!==null&&(W=W.updateQueue,w=W.lastBaseUpdate,w!==m&&(w===null?W.firstBaseUpdate=A:w.next=A,W.lastBaseUpdate=C))}if(a!==null){var $=i.baseState;m=0,W=A=C=null,w=a;do{var U=w.lane,ne=w.eventTime;if((l&U)===U){W!==null&&(W=W.next={eventTime:ne,lane:0,tag:w.tag,payload:w.payload,callback:w.callback,next:null});e:{var oe=e,ae=w;switch(U=t,ne=n,ae.tag){case 1:if(oe=ae.payload,typeof oe=="function"){$=oe.call(ne,$,U);break e}$=oe;break e;case 3:oe.flags=oe.flags&-65537|128;case 0:if(oe=ae.payload,U=typeof oe=="function"?oe.call(ne,$,U):oe,U==null)break e;$=V({},$,U);break e;case 2:vn=!0}}w.callback!==null&&w.lane!==0&&(e.flags|=64,U=i.effects,U===null?i.effects=[w]:U.push(w))}else ne={eventTime:ne,lane:U,tag:w.tag,payload:w.payload,callback:w.callback,next:null},W===null?(A=W=ne,C=$):W=W.next=ne,m|=U;if(w=w.next,w===null){if(w=i.shared.pending,w===null)break;U=w,w=U.next,U.next=null,i.lastBaseUpdate=U,i.shared.pending=null}}while(!0);if(W===null&&(C=$),i.baseState=C,i.firstBaseUpdate=A,i.lastBaseUpdate=W,t=i.shared.interleaved,t!==null){i=t;do m|=i.lane,i=i.next;while(i!==t)}else a===null&&(i.shared.lanes=0);Yn|=m,e.lanes=m,e.memoizedState=$}}function Nu(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var l=e[t],i=l.callback;if(i!==null){if(l.callback=null,l=n,typeof i!="function")throw Error(s(191,i));i.call(l)}}}var al={},Ut=gn(al),cl=gn(al),ul=gn(al);function Un(e){if(e===al)throw Error(s(174));return e}function mi(e,t){switch(je(ul,t),je(cl,e),je(Ut,al),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:_s(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=_s(t,e)}Te(Ut),je(Ut,t)}function vr(){Te(Ut),Te(cl),Te(ul)}function Du(e){Un(ul.current);var t=Un(Ut.current),n=_s(t,e.type);t!==n&&(je(cl,e),je(Ut,n))}function _i(e){cl.current===e&&(Te(Ut),Te(cl))}var Ae=gn(0);function ao(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var gi=[];function hi(){for(var e=0;e<gi.length;e++)gi[e]._workInProgressVersionPrimary=null;gi.length=0}var co=M.ReactCurrentDispatcher,yi=M.ReactCurrentBatchConfig,Wn=0,Le=null,We=null,He=null,uo=!1,dl=!1,fl=0,I_=0;function et(){throw Error(s(321))}function vi(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!jt(e[n],t[n]))return!1;return!0}function xi(e,t,n,l,i,a){if(Wn=a,Le=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,co.current=e===null||e.memoizedState===null?B_:z_,e=n(l,i),dl){a=0;do{if(dl=!1,fl=0,25<=a)throw Error(s(301));a+=1,He=We=null,t.updateQueue=null,co.current=F_,e=n(l,i)}while(dl)}if(co.current=mo,t=We!==null&&We.next!==null,Wn=0,He=We=Le=null,uo=!1,t)throw Error(s(300));return e}function wi(){var e=fl!==0;return fl=0,e}function Wt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return He===null?Le.memoizedState=He=e:He=He.next=e,He}function St(){if(We===null){var e=Le.alternate;e=e!==null?e.memoizedState:null}else e=We.next;var t=He===null?Le.memoizedState:He.next;if(t!==null)He=t,We=e;else{if(e===null)throw Error(s(310));We=e,e={memoizedState:We.memoizedState,baseState:We.baseState,baseQueue:We.baseQueue,queue:We.queue,next:null},He===null?Le.memoizedState=He=e:He=He.next=e}return He}function pl(e,t){return typeof t=="function"?t(e):t}function Si(e){var t=St(),n=t.queue;if(n===null)throw Error(s(311));n.lastRenderedReducer=e;var l=We,i=l.baseQueue,a=n.pending;if(a!==null){if(i!==null){var m=i.next;i.next=a.next,a.next=m}l.baseQueue=i=a,n.pending=null}if(i!==null){a=i.next,l=l.baseState;var w=m=null,C=null,A=a;do{var W=A.lane;if((Wn&W)===W)C!==null&&(C=C.next={lane:0,action:A.action,hasEagerState:A.hasEagerState,eagerState:A.eagerState,next:null}),l=A.hasEagerState?A.eagerState:e(l,A.action);else{var $={lane:W,action:A.action,hasEagerState:A.hasEagerState,eagerState:A.eagerState,next:null};C===null?(w=C=$,m=l):C=C.next=$,Le.lanes|=W,Yn|=W}A=A.next}while(A!==null&&A!==a);C===null?m=l:C.next=w,jt(l,t.memoizedState)||(at=!0),t.memoizedState=l,t.baseState=m,t.baseQueue=C,n.lastRenderedState=l}if(e=n.interleaved,e!==null){i=e;do a=i.lane,Le.lanes|=a,Yn|=a,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function bi(e){var t=St(),n=t.queue;if(n===null)throw Error(s(311));n.lastRenderedReducer=e;var l=n.dispatch,i=n.pending,a=t.memoizedState;if(i!==null){n.pending=null;var m=i=i.next;do a=e(a,m.action),m=m.next;while(m!==i);jt(a,t.memoizedState)||(at=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,l]}function ju(){}function Pu(e,t){var n=Le,l=St(),i=t(),a=!jt(l.memoizedState,i);if(a&&(l.memoizedState=i,at=!0),l=l.queue,Ci(Ou.bind(null,n,l,e),[e]),l.getSnapshot!==t||a||He!==null&&He.memoizedState.tag&1){if(n.flags|=2048,ml(9,Tu.bind(null,n,l,i,t),void 0,null),Ve===null)throw Error(s(349));(Wn&30)!==0||Ru(n,t,i)}return i}function Ru(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Le.updateQueue,t===null?(t={lastEffect:null,stores:null},Le.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Tu(e,t,n,l){t.value=n,t.getSnapshot=l,Iu(t)&&Au(e)}function Ou(e,t,n){return n(function(){Iu(t)&&Au(e)})}function Iu(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!jt(e,n)}catch{return!0}}function Au(e){var t=tn(e,1);t!==null&&It(t,e,1,-1)}function Lu(e){var t=Wt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:pl,lastRenderedState:e},t.queue=e,e=e.dispatch=M_.bind(null,Le,e),[t.memoizedState,e]}function ml(e,t,n,l){return e={tag:e,create:t,destroy:n,deps:l,next:null},t=Le.updateQueue,t===null?(t={lastEffect:null,stores:null},Le.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(l=n.next,n.next=e,e.next=l,t.lastEffect=e)),e}function Mu(){return St().memoizedState}function fo(e,t,n,l){var i=Wt();Le.flags|=e,i.memoizedState=ml(1|t,n,void 0,l===void 0?null:l)}function po(e,t,n,l){var i=St();l=l===void 0?null:l;var a=void 0;if(We!==null){var m=We.memoizedState;if(a=m.destroy,l!==null&&vi(l,m.deps)){i.memoizedState=ml(t,n,a,l);return}}Le.flags|=e,i.memoizedState=ml(1|t,n,a,l)}function Bu(e,t){return fo(8390656,8,e,t)}function Ci(e,t){return po(2048,8,e,t)}function zu(e,t){return po(4,2,e,t)}function Fu(e,t){return po(4,4,e,t)}function Uu(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Wu(e,t,n){return n=n!=null?n.concat([e]):null,po(4,4,Uu.bind(null,t,e),n)}function ki(){}function Yu(e,t){var n=St();t=t===void 0?null:t;var l=n.memoizedState;return l!==null&&t!==null&&vi(t,l[1])?l[0]:(n.memoizedState=[e,t],e)}function Hu(e,t){var n=St();t=t===void 0?null:t;var l=n.memoizedState;return l!==null&&t!==null&&vi(t,l[1])?l[0]:(e=e(),n.memoizedState=[e,t],e)}function Vu(e,t,n){return(Wn&21)===0?(e.baseState&&(e.baseState=!1,at=!0),e.memoizedState=n):(jt(n,t)||(n=wc(),Le.lanes|=n,Yn|=n,e.baseState=!0),t)}function A_(e,t){var n=Ne;Ne=n!==0&&4>n?n:4,e(!0);var l=yi.transition;yi.transition={};try{e(!1),t()}finally{Ne=n,yi.transition=l}}function $u(){return St().memoizedState}function L_(e,t,n){var l=Cn(e);if(n={lane:l,action:n,hasEagerState:!1,eagerState:null,next:null},Qu(e))Xu(t,n);else if(n=Cu(e,t,n,l),n!==null){var i=ot();It(n,e,l,i),Ku(n,t,l)}}function M_(e,t,n){var l=Cn(e),i={lane:l,action:n,hasEagerState:!1,eagerState:null,next:null};if(Qu(e))Xu(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var m=t.lastRenderedState,w=a(m,n);if(i.hasEagerState=!0,i.eagerState=w,jt(w,m)){var C=t.interleaved;C===null?(i.next=i,fi(t)):(i.next=C.next,C.next=i),t.interleaved=i;return}}catch{}finally{}n=Cu(e,t,i,l),n!==null&&(i=ot(),It(n,e,l,i),Ku(n,t,l))}}function Qu(e){var t=e.alternate;return e===Le||t!==null&&t===Le}function Xu(e,t){dl=uo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Ku(e,t,n){if((n&4194240)!==0){var l=t.lanes;l&=e.pendingLanes,n|=l,t.lanes=n,Ns(e,n)}}var mo={readContext:wt,useCallback:et,useContext:et,useEffect:et,useImperativeHandle:et,useInsertionEffect:et,useLayoutEffect:et,useMemo:et,useReducer:et,useRef:et,useState:et,useDebugValue:et,useDeferredValue:et,useTransition:et,useMutableSource:et,useSyncExternalStore:et,useId:et,unstable_isNewReconciler:!1},B_={readContext:wt,useCallback:function(e,t){return Wt().memoizedState=[e,t===void 0?null:t],e},useContext:wt,useEffect:Bu,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,fo(4194308,4,Uu.bind(null,t,e),n)},useLayoutEffect:function(e,t){return fo(4194308,4,e,t)},useInsertionEffect:function(e,t){return fo(4,2,e,t)},useMemo:function(e,t){var n=Wt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var l=Wt();return t=n!==void 0?n(t):t,l.memoizedState=l.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},l.queue=e,e=e.dispatch=L_.bind(null,Le,e),[l.memoizedState,e]},useRef:function(e){var t=Wt();return e={current:e},t.memoizedState=e},useState:Lu,useDebugValue:ki,useDeferredValue:function(e){return Wt().memoizedState=e},useTransition:function(){var e=Lu(!1),t=e[0];return e=A_.bind(null,e[1]),Wt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var l=Le,i=Wt();if(Ie){if(n===void 0)throw Error(s(407));n=n()}else{if(n=t(),Ve===null)throw Error(s(349));(Wn&30)!==0||Ru(l,t,n)}i.memoizedState=n;var a={value:n,getSnapshot:t};return i.queue=a,Bu(Ou.bind(null,l,a,e),[e]),l.flags|=2048,ml(9,Tu.bind(null,l,a,n,t),void 0,null),n},useId:function(){var e=Wt(),t=Ve.identifierPrefix;if(Ie){var n=en,l=qt;n=(l&~(1<<32-Dt(l)-1)).toString(32)+n,t=":"+t+"R"+n,n=fl++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=I_++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},z_={readContext:wt,useCallback:Yu,useContext:wt,useEffect:Ci,useImperativeHandle:Wu,useInsertionEffect:zu,useLayoutEffect:Fu,useMemo:Hu,useReducer:Si,useRef:Mu,useState:function(){return Si(pl)},useDebugValue:ki,useDeferredValue:function(e){var t=St();return Vu(t,We.memoizedState,e)},useTransition:function(){var e=Si(pl)[0],t=St().memoizedState;return[e,t]},useMutableSource:ju,useSyncExternalStore:Pu,useId:$u,unstable_isNewReconciler:!1},F_={readContext:wt,useCallback:Yu,useContext:wt,useEffect:Ci,useImperativeHandle:Wu,useInsertionEffect:zu,useLayoutEffect:Fu,useMemo:Hu,useReducer:bi,useRef:Mu,useState:function(){return bi(pl)},useDebugValue:ki,useDeferredValue:function(e){var t=St();return We===null?t.memoizedState=e:Vu(t,We.memoizedState,e)},useTransition:function(){var e=bi(pl)[0],t=St().memoizedState;return[e,t]},useMutableSource:ju,useSyncExternalStore:Pu,useId:$u,unstable_isNewReconciler:!1};function Rt(e,t){if(e&&e.defaultProps){t=V({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Ei(e,t,n,l){t=e.memoizedState,n=n(l,t),n=n==null?t:V({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var _o={isMounted:function(e){return(e=e._reactInternals)?An(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var l=ot(),i=Cn(e),a=nn(l,i);a.payload=t,n!=null&&(a.callback=n),t=xn(e,a,i),t!==null&&(It(t,e,i,l),so(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var l=ot(),i=Cn(e),a=nn(l,i);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=xn(e,a,i),t!==null&&(It(t,e,i,l),so(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ot(),l=Cn(e),i=nn(n,l);i.tag=2,t!=null&&(i.callback=t),t=xn(e,i,l),t!==null&&(It(t,e,l,n),so(t,e,l))}};function Gu(e,t,n,l,i,a,m){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(l,a,m):t.prototype&&t.prototype.isPureReactComponent?!el(n,l)||!el(i,a):!0}function Zu(e,t,n){var l=!1,i=hn,a=t.contextType;return typeof a=="object"&&a!==null?a=wt(a):(i=it(t)?Mn:qe.current,l=t.contextTypes,a=(l=l!=null)?fr(e,i):hn),t=new t(n,a),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=_o,e.stateNode=t,t._reactInternals=e,l&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=a),t}function Ju(e,t,n,l){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,l),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,l),t.state!==e&&_o.enqueueReplaceState(t,t.state,null)}function Ni(e,t,n,l){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},pi(e);var a=t.contextType;typeof a=="object"&&a!==null?i.context=wt(a):(a=it(t)?Mn:qe.current,i.context=fr(e,a)),i.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a=="function"&&(Ei(e,t,a,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&_o.enqueueReplaceState(i,i.state,null),io(e,n,i,l),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function xr(e,t){try{var n="",l=t;do n+=te(l),l=l.return;while(l);var i=n}catch(a){i=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:t,stack:i,digest:null}}function Di(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function ji(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var U_=typeof WeakMap=="function"?WeakMap:Map;function qu(e,t,n){n=nn(-1,n),n.tag=3,n.payload={element:null};var l=t.value;return n.callback=function(){So||(So=!0,Hi=l),ji(e,t)},n}function ed(e,t,n){n=nn(-1,n),n.tag=3;var l=e.type.getDerivedStateFromError;if(typeof l=="function"){var i=t.value;n.payload=function(){return l(i)},n.callback=function(){ji(e,t)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(n.callback=function(){ji(e,t),typeof l!="function"&&(Sn===null?Sn=new Set([this]):Sn.add(this));var m=t.stack;this.componentDidCatch(t.value,{componentStack:m!==null?m:""})}),n}function td(e,t,n){var l=e.pingCache;if(l===null){l=e.pingCache=new U_;var i=new Set;l.set(t,i)}else i=l.get(t),i===void 0&&(i=new Set,l.set(t,i));i.has(n)||(i.add(n),e=t0.bind(null,e,t,n),t.then(e,e))}function nd(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function rd(e,t,n,l,i){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=nn(-1,1),t.tag=2,xn(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=i,e)}var W_=M.ReactCurrentOwner,at=!1;function lt(e,t,n,l){t.child=e===null?bu(t,null,n,l):gr(t,e.child,n,l)}function ld(e,t,n,l,i){n=n.render;var a=t.ref;return yr(t,i),l=xi(e,t,n,l,a,i),n=wi(),e!==null&&!at?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,rn(e,t,i)):(Ie&&n&&ri(t),t.flags|=1,lt(e,t,l,i),t.child)}function od(e,t,n,l,i){if(e===null){var a=n.type;return typeof a=="function"&&!Zi(a)&&a.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=a,sd(e,t,a,l,i)):(e=Do(n.type,null,l,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,(e.lanes&i)===0){var m=a.memoizedProps;if(n=n.compare,n=n!==null?n:el,n(m,l)&&e.ref===t.ref)return rn(e,t,i)}return t.flags|=1,e=En(a,l),e.ref=t.ref,e.return=t,t.child=e}function sd(e,t,n,l,i){if(e!==null){var a=e.memoizedProps;if(el(a,l)&&e.ref===t.ref)if(at=!1,t.pendingProps=l=a,(e.lanes&i)!==0)(e.flags&131072)!==0&&(at=!0);else return t.lanes=e.lanes,rn(e,t,i)}return Pi(e,t,n,l,i)}function id(e,t,n){var l=t.pendingProps,i=l.children,a=e!==null?e.memoizedState:null;if(l.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},je(Sr,_t),_t|=n;else{if((n&1073741824)===0)return e=a!==null?a.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,je(Sr,_t),_t|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},l=a!==null?a.baseLanes:n,je(Sr,_t),_t|=l}else a!==null?(l=a.baseLanes|n,t.memoizedState=null):l=n,je(Sr,_t),_t|=l;return lt(e,t,i,n),t.child}function ad(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Pi(e,t,n,l,i){var a=it(n)?Mn:qe.current;return a=fr(t,a),yr(t,i),n=xi(e,t,n,l,a,i),l=wi(),e!==null&&!at?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,rn(e,t,i)):(Ie&&l&&ri(t),t.flags|=1,lt(e,t,n,i),t.child)}function cd(e,t,n,l,i){if(it(n)){var a=!0;Jl(t)}else a=!1;if(yr(t,i),t.stateNode===null)ho(e,t),Zu(t,n,l),Ni(t,n,l,i),l=!0;else if(e===null){var m=t.stateNode,w=t.memoizedProps;m.props=w;var C=m.context,A=n.contextType;typeof A=="object"&&A!==null?A=wt(A):(A=it(n)?Mn:qe.current,A=fr(t,A));var W=n.getDerivedStateFromProps,$=typeof W=="function"||typeof m.getSnapshotBeforeUpdate=="function";$||typeof m.UNSAFE_componentWillReceiveProps!="function"&&typeof m.componentWillReceiveProps!="function"||(w!==l||C!==A)&&Ju(t,m,l,A),vn=!1;var U=t.memoizedState;m.state=U,io(t,l,m,i),C=t.memoizedState,w!==l||U!==C||st.current||vn?(typeof W=="function"&&(Ei(t,n,W,l),C=t.memoizedState),(w=vn||Gu(t,n,w,l,U,C,A))?($||typeof m.UNSAFE_componentWillMount!="function"&&typeof m.componentWillMount!="function"||(typeof m.componentWillMount=="function"&&m.componentWillMount(),typeof m.UNSAFE_componentWillMount=="function"&&m.UNSAFE_componentWillMount()),typeof m.componentDidMount=="function"&&(t.flags|=4194308)):(typeof m.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=l,t.memoizedState=C),m.props=l,m.state=C,m.context=A,l=w):(typeof m.componentDidMount=="function"&&(t.flags|=4194308),l=!1)}else{m=t.stateNode,ku(e,t),w=t.memoizedProps,A=t.type===t.elementType?w:Rt(t.type,w),m.props=A,$=t.pendingProps,U=m.context,C=n.contextType,typeof C=="object"&&C!==null?C=wt(C):(C=it(n)?Mn:qe.current,C=fr(t,C));var ne=n.getDerivedStateFromProps;(W=typeof ne=="function"||typeof m.getSnapshotBeforeUpdate=="function")||typeof m.UNSAFE_componentWillReceiveProps!="function"&&typeof m.componentWillReceiveProps!="function"||(w!==$||U!==C)&&Ju(t,m,l,C),vn=!1,U=t.memoizedState,m.state=U,io(t,l,m,i);var oe=t.memoizedState;w!==$||U!==oe||st.current||vn?(typeof ne=="function"&&(Ei(t,n,ne,l),oe=t.memoizedState),(A=vn||Gu(t,n,A,l,U,oe,C)||!1)?(W||typeof m.UNSAFE_componentWillUpdate!="function"&&typeof m.componentWillUpdate!="function"||(typeof m.componentWillUpdate=="function"&&m.componentWillUpdate(l,oe,C),typeof m.UNSAFE_componentWillUpdate=="function"&&m.UNSAFE_componentWillUpdate(l,oe,C)),typeof m.componentDidUpdate=="function"&&(t.flags|=4),typeof m.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof m.componentDidUpdate!="function"||w===e.memoizedProps&&U===e.memoizedState||(t.flags|=4),typeof m.getSnapshotBeforeUpdate!="function"||w===e.memoizedProps&&U===e.memoizedState||(t.flags|=1024),t.memoizedProps=l,t.memoizedState=oe),m.props=l,m.state=oe,m.context=C,l=A):(typeof m.componentDidUpdate!="function"||w===e.memoizedProps&&U===e.memoizedState||(t.flags|=4),typeof m.getSnapshotBeforeUpdate!="function"||w===e.memoizedProps&&U===e.memoizedState||(t.flags|=1024),l=!1)}return Ri(e,t,n,l,a,i)}function Ri(e,t,n,l,i,a){ad(e,t);var m=(t.flags&128)!==0;if(!l&&!m)return i&&mu(t,n,!1),rn(e,t,a);l=t.stateNode,W_.current=t;var w=m&&typeof n.getDerivedStateFromError!="function"?null:l.render();return t.flags|=1,e!==null&&m?(t.child=gr(t,e.child,null,a),t.child=gr(t,null,w,a)):lt(e,t,w,a),t.memoizedState=l.state,i&&mu(t,n,!0),t.child}function ud(e){var t=e.stateNode;t.pendingContext?fu(e,t.pendingContext,t.pendingContext!==t.context):t.context&&fu(e,t.context,!1),mi(e,t.containerInfo)}function dd(e,t,n,l,i){return _r(),ii(i),t.flags|=256,lt(e,t,n,l),t.child}var Ti={dehydrated:null,treeContext:null,retryLane:0};function Oi(e){return{baseLanes:e,cachePool:null,transitions:null}}function fd(e,t,n){var l=t.pendingProps,i=Ae.current,a=!1,m=(t.flags&128)!==0,w;if((w=m)||(w=e!==null&&e.memoizedState===null?!1:(i&2)!==0),w?(a=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),je(Ae,i&1),e===null)return si(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(m=l.children,e=l.fallback,a?(l=t.mode,a=t.child,m={mode:"hidden",children:m},(l&1)===0&&a!==null?(a.childLanes=0,a.pendingProps=m):a=jo(m,l,0,null),e=Qn(e,l,n,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=Oi(n),t.memoizedState=Ti,e):Ii(t,m));if(i=e.memoizedState,i!==null&&(w=i.dehydrated,w!==null))return Y_(e,t,m,l,w,i,n);if(a){a=l.fallback,m=t.mode,i=e.child,w=i.sibling;var C={mode:"hidden",children:l.children};return(m&1)===0&&t.child!==i?(l=t.child,l.childLanes=0,l.pendingProps=C,t.deletions=null):(l=En(i,C),l.subtreeFlags=i.subtreeFlags&14680064),w!==null?a=En(w,a):(a=Qn(a,m,n,null),a.flags|=2),a.return=t,l.return=t,l.sibling=a,t.child=l,l=a,a=t.child,m=e.child.memoizedState,m=m===null?Oi(n):{baseLanes:m.baseLanes|n,cachePool:null,transitions:m.transitions},a.memoizedState=m,a.childLanes=e.childLanes&~n,t.memoizedState=Ti,l}return a=e.child,e=a.sibling,l=En(a,{mode:"visible",children:l.children}),(t.mode&1)===0&&(l.lanes=n),l.return=t,l.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=l,t.memoizedState=null,l}function Ii(e,t){return t=jo({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function go(e,t,n,l){return l!==null&&ii(l),gr(t,e.child,null,n),e=Ii(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Y_(e,t,n,l,i,a,m){if(n)return t.flags&256?(t.flags&=-257,l=Di(Error(s(422))),go(e,t,m,l)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(a=l.fallback,i=t.mode,l=jo({mode:"visible",children:l.children},i,0,null),a=Qn(a,i,m,null),a.flags|=2,l.return=t,a.return=t,l.sibling=a,t.child=l,(t.mode&1)!==0&&gr(t,e.child,null,m),t.child.memoizedState=Oi(m),t.memoizedState=Ti,a);if((t.mode&1)===0)return go(e,t,m,null);if(i.data==="$!"){if(l=i.nextSibling&&i.nextSibling.dataset,l)var w=l.dgst;return l=w,a=Error(s(419)),l=Di(a,l,void 0),go(e,t,m,l)}if(w=(m&e.childLanes)!==0,at||w){if(l=Ve,l!==null){switch(m&-m){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=(i&(l.suspendedLanes|m))!==0?0:i,i!==0&&i!==a.retryLane&&(a.retryLane=i,tn(e,i),It(l,e,i,-1))}return Gi(),l=Di(Error(s(421))),go(e,t,m,l)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=n0.bind(null,e),i._reactRetry=t,null):(e=a.treeContext,mt=_n(i.nextSibling),pt=t,Ie=!0,Pt=null,e!==null&&(vt[xt++]=qt,vt[xt++]=en,vt[xt++]=Bn,qt=e.id,en=e.overflow,Bn=t),t=Ii(t,l.children),t.flags|=4096,t)}function pd(e,t,n){e.lanes|=t;var l=e.alternate;l!==null&&(l.lanes|=t),di(e.return,t,n)}function Ai(e,t,n,l,i){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:l,tail:n,tailMode:i}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=l,a.tail=n,a.tailMode=i)}function md(e,t,n){var l=t.pendingProps,i=l.revealOrder,a=l.tail;if(lt(e,t,l.children,n),l=Ae.current,(l&2)!==0)l=l&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&pd(e,n,t);else if(e.tag===19)pd(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}l&=1}if(je(Ae,l),(t.mode&1)===0)t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&ao(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Ai(t,!1,i,n,a);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&ao(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Ai(t,!0,n,null,a);break;case"together":Ai(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function ho(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function rn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Yn|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(s(153));if(t.child!==null){for(e=t.child,n=En(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=En(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function H_(e,t,n){switch(t.tag){case 3:ud(t),_r();break;case 5:Du(t);break;case 1:it(t.type)&&Jl(t);break;case 4:mi(t,t.stateNode.containerInfo);break;case 10:var l=t.type._context,i=t.memoizedProps.value;je(lo,l._currentValue),l._currentValue=i;break;case 13:if(l=t.memoizedState,l!==null)return l.dehydrated!==null?(je(Ae,Ae.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?fd(e,t,n):(je(Ae,Ae.current&1),e=rn(e,t,n),e!==null?e.sibling:null);je(Ae,Ae.current&1);break;case 19:if(l=(n&t.childLanes)!==0,(e.flags&128)!==0){if(l)return md(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),je(Ae,Ae.current),l)break;return null;case 22:case 23:return t.lanes=0,id(e,t,n)}return rn(e,t,n)}var _d,Li,gd,hd;_d=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},Li=function(){},gd=function(e,t,n,l){var i=e.memoizedProps;if(i!==l){e=t.stateNode,Un(Ut.current);var a=null;switch(n){case"input":i=Je(e,i),l=Je(e,l),a=[];break;case"select":i=V({},i,{value:void 0}),l=V({},l,{value:void 0}),a=[];break;case"textarea":i=ms(e,i),l=ms(e,l),a=[];break;default:typeof i.onClick!="function"&&typeof l.onClick=="function"&&(e.onclick=Kl)}gs(n,l);var m;n=null;for(A in i)if(!l.hasOwnProperty(A)&&i.hasOwnProperty(A)&&i[A]!=null)if(A==="style"){var w=i[A];for(m in w)w.hasOwnProperty(m)&&(n||(n={}),n[m]="")}else A!=="dangerouslySetInnerHTML"&&A!=="children"&&A!=="suppressContentEditableWarning"&&A!=="suppressHydrationWarning"&&A!=="autoFocus"&&(d.hasOwnProperty(A)?a||(a=[]):(a=a||[]).push(A,null));for(A in l){var C=l[A];if(w=i!=null?i[A]:void 0,l.hasOwnProperty(A)&&C!==w&&(C!=null||w!=null))if(A==="style")if(w){for(m in w)!w.hasOwnProperty(m)||C&&C.hasOwnProperty(m)||(n||(n={}),n[m]="");for(m in C)C.hasOwnProperty(m)&&w[m]!==C[m]&&(n||(n={}),n[m]=C[m])}else n||(a||(a=[]),a.push(A,n)),n=C;else A==="dangerouslySetInnerHTML"?(C=C?C.__html:void 0,w=w?w.__html:void 0,C!=null&&w!==C&&(a=a||[]).push(A,C)):A==="children"?typeof C!="string"&&typeof C!="number"||(a=a||[]).push(A,""+C):A!=="suppressContentEditableWarning"&&A!=="suppressHydrationWarning"&&(d.hasOwnProperty(A)?(C!=null&&A==="onScroll"&&Re("scroll",e),a||w===C||(a=[])):(a=a||[]).push(A,C))}n&&(a=a||[]).push("style",n);var A=a;(t.updateQueue=A)&&(t.flags|=4)}},hd=function(e,t,n,l){n!==l&&(t.flags|=4)};function _l(e,t){if(!Ie)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var l=null;n!==null;)n.alternate!==null&&(l=n),n=n.sibling;l===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:l.sibling=null}}function tt(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,l=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,l|=i.subtreeFlags&14680064,l|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,l|=i.subtreeFlags,l|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=l,e.childLanes=n,t}function V_(e,t,n){var l=t.pendingProps;switch(li(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return tt(t),null;case 1:return it(t.type)&&Zl(),tt(t),null;case 3:return l=t.stateNode,vr(),Te(st),Te(qe),hi(),l.pendingContext&&(l.context=l.pendingContext,l.pendingContext=null),(e===null||e.child===null)&&(no(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Pt!==null&&(Qi(Pt),Pt=null))),Li(e,t),tt(t),null;case 5:_i(t);var i=Un(ul.current);if(n=t.type,e!==null&&t.stateNode!=null)gd(e,t,n,l,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!l){if(t.stateNode===null)throw Error(s(166));return tt(t),null}if(e=Un(Ut.current),no(t)){l=t.stateNode,n=t.type;var a=t.memoizedProps;switch(l[Ft]=t,l[ol]=a,e=(t.mode&1)!==0,n){case"dialog":Re("cancel",l),Re("close",l);break;case"iframe":case"object":case"embed":Re("load",l);break;case"video":case"audio":for(i=0;i<nl.length;i++)Re(nl[i],l);break;case"source":Re("error",l);break;case"img":case"image":case"link":Re("error",l),Re("load",l);break;case"details":Re("toggle",l);break;case"input":kt(l,a),Re("invalid",l);break;case"select":l._wrapperState={wasMultiple:!!a.multiple},Re("invalid",l);break;case"textarea":ec(l,a),Re("invalid",l)}gs(n,a),i=null;for(var m in a)if(a.hasOwnProperty(m)){var w=a[m];m==="children"?typeof w=="string"?l.textContent!==w&&(a.suppressHydrationWarning!==!0&&Xl(l.textContent,w,e),i=["children",w]):typeof w=="number"&&l.textContent!==""+w&&(a.suppressHydrationWarning!==!0&&Xl(l.textContent,w,e),i=["children",""+w]):d.hasOwnProperty(m)&&w!=null&&m==="onScroll"&&Re("scroll",l)}switch(n){case"input":le(l),In(l,a,!0);break;case"textarea":le(l),nc(l);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(l.onclick=Kl)}l=i,t.updateQueue=l,l!==null&&(t.flags|=4)}else{m=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=rc(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=m.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof l.is=="string"?e=m.createElement(n,{is:l.is}):(e=m.createElement(n),n==="select"&&(m=e,l.multiple?m.multiple=!0:l.size&&(m.size=l.size))):e=m.createElementNS(e,n),e[Ft]=t,e[ol]=l,_d(e,t,!1,!1),t.stateNode=e;e:{switch(m=hs(n,l),n){case"dialog":Re("cancel",e),Re("close",e),i=l;break;case"iframe":case"object":case"embed":Re("load",e),i=l;break;case"video":case"audio":for(i=0;i<nl.length;i++)Re(nl[i],e);i=l;break;case"source":Re("error",e),i=l;break;case"img":case"image":case"link":Re("error",e),Re("load",e),i=l;break;case"details":Re("toggle",e),i=l;break;case"input":kt(e,l),i=Je(e,l),Re("invalid",e);break;case"option":i=l;break;case"select":e._wrapperState={wasMultiple:!!l.multiple},i=V({},l,{value:void 0}),Re("invalid",e);break;case"textarea":ec(e,l),i=ms(e,l),Re("invalid",e);break;default:i=l}gs(n,i),w=i;for(a in w)if(w.hasOwnProperty(a)){var C=w[a];a==="style"?sc(e,C):a==="dangerouslySetInnerHTML"?(C=C?C.__html:void 0,C!=null&&lc(e,C)):a==="children"?typeof C=="string"?(n!=="textarea"||C!=="")&&Mr(e,C):typeof C=="number"&&Mr(e,""+C):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(d.hasOwnProperty(a)?C!=null&&a==="onScroll"&&Re("scroll",e):C!=null&&I(e,a,C,m))}switch(n){case"input":le(e),In(e,l,!1);break;case"textarea":le(e),nc(e);break;case"option":l.value!=null&&e.setAttribute("value",""+q(l.value));break;case"select":e.multiple=!!l.multiple,a=l.value,a!=null?er(e,!!l.multiple,a,!1):l.defaultValue!=null&&er(e,!!l.multiple,l.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Kl)}switch(n){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break e;case"img":l=!0;break e;default:l=!1}}l&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return tt(t),null;case 6:if(e&&t.stateNode!=null)hd(e,t,e.memoizedProps,l);else{if(typeof l!="string"&&t.stateNode===null)throw Error(s(166));if(n=Un(ul.current),Un(Ut.current),no(t)){if(l=t.stateNode,n=t.memoizedProps,l[Ft]=t,(a=l.nodeValue!==n)&&(e=pt,e!==null))switch(e.tag){case 3:Xl(l.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Xl(l.nodeValue,n,(e.mode&1)!==0)}a&&(t.flags|=4)}else l=(n.nodeType===9?n:n.ownerDocument).createTextNode(l),l[Ft]=t,t.stateNode=l}return tt(t),null;case 13:if(Te(Ae),l=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Ie&&mt!==null&&(t.mode&1)!==0&&(t.flags&128)===0)xu(),_r(),t.flags|=98560,a=!1;else if(a=no(t),l!==null&&l.dehydrated!==null){if(e===null){if(!a)throw Error(s(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(s(317));a[Ft]=t}else _r(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;tt(t),a=!1}else Pt!==null&&(Qi(Pt),Pt=null),a=!0;if(!a)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(l=l!==null,l!==(e!==null&&e.memoizedState!==null)&&l&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(Ae.current&1)!==0?Ye===0&&(Ye=3):Gi())),t.updateQueue!==null&&(t.flags|=4),tt(t),null);case 4:return vr(),Li(e,t),e===null&&rl(t.stateNode.containerInfo),tt(t),null;case 10:return ui(t.type._context),tt(t),null;case 17:return it(t.type)&&Zl(),tt(t),null;case 19:if(Te(Ae),a=t.memoizedState,a===null)return tt(t),null;if(l=(t.flags&128)!==0,m=a.rendering,m===null)if(l)_l(a,!1);else{if(Ye!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(m=ao(e),m!==null){for(t.flags|=128,_l(a,!1),l=m.updateQueue,l!==null&&(t.updateQueue=l,t.flags|=4),t.subtreeFlags=0,l=n,n=t.child;n!==null;)a=n,e=l,a.flags&=14680066,m=a.alternate,m===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=m.childLanes,a.lanes=m.lanes,a.child=m.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=m.memoizedProps,a.memoizedState=m.memoizedState,a.updateQueue=m.updateQueue,a.type=m.type,e=m.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return je(Ae,Ae.current&1|2),t.child}e=e.sibling}a.tail!==null&&Be()>br&&(t.flags|=128,l=!0,_l(a,!1),t.lanes=4194304)}else{if(!l)if(e=ao(m),e!==null){if(t.flags|=128,l=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),_l(a,!0),a.tail===null&&a.tailMode==="hidden"&&!m.alternate&&!Ie)return tt(t),null}else 2*Be()-a.renderingStartTime>br&&n!==1073741824&&(t.flags|=128,l=!0,_l(a,!1),t.lanes=4194304);a.isBackwards?(m.sibling=t.child,t.child=m):(n=a.last,n!==null?n.sibling=m:t.child=m,a.last=m)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=Be(),t.sibling=null,n=Ae.current,je(Ae,l?n&1|2:n&1),t):(tt(t),null);case 22:case 23:return Ki(),l=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==l&&(t.flags|=8192),l&&(t.mode&1)!==0?(_t&1073741824)!==0&&(tt(t),t.subtreeFlags&6&&(t.flags|=8192)):tt(t),null;case 24:return null;case 25:return null}throw Error(s(156,t.tag))}function $_(e,t){switch(li(t),t.tag){case 1:return it(t.type)&&Zl(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return vr(),Te(st),Te(qe),hi(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return _i(t),null;case 13:if(Te(Ae),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(s(340));_r()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Te(Ae),null;case 4:return vr(),null;case 10:return ui(t.type._context),null;case 22:case 23:return Ki(),null;case 24:return null;default:return null}}var yo=!1,nt=!1,Q_=typeof WeakSet=="function"?WeakSet:Set,re=null;function wr(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(l){Me(e,t,l)}else n.current=null}function Mi(e,t,n){try{n()}catch(l){Me(e,t,l)}}var yd=!1;function X_(e,t){if(Ks=Ml,e=Gc(),Us(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var l=n.getSelection&&n.getSelection();if(l&&l.rangeCount!==0){n=l.anchorNode;var i=l.anchorOffset,a=l.focusNode;l=l.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break e}var m=0,w=-1,C=-1,A=0,W=0,$=e,U=null;t:for(;;){for(var ne;$!==n||i!==0&&$.nodeType!==3||(w=m+i),$!==a||l!==0&&$.nodeType!==3||(C=m+l),$.nodeType===3&&(m+=$.nodeValue.length),(ne=$.firstChild)!==null;)U=$,$=ne;for(;;){if($===e)break t;if(U===n&&++A===i&&(w=m),U===a&&++W===l&&(C=m),(ne=$.nextSibling)!==null)break;$=U,U=$.parentNode}$=ne}n=w===-1||C===-1?null:{start:w,end:C}}else n=null}n=n||{start:0,end:0}}else n=null;for(Gs={focusedElem:e,selectionRange:n},Ml=!1,re=t;re!==null;)if(t=re,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,re=e;else for(;re!==null;){t=re;try{var oe=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(oe!==null){var ae=oe.memoizedProps,ze=oe.memoizedState,T=t.stateNode,N=T.getSnapshotBeforeUpdate(t.elementType===t.type?ae:Rt(t.type,ae),ze);T.__reactInternalSnapshotBeforeUpdate=N}break;case 3:var O=t.stateNode.containerInfo;O.nodeType===1?O.textContent="":O.nodeType===9&&O.documentElement&&O.removeChild(O.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(s(163))}}catch(X){Me(t,t.return,X)}if(e=t.sibling,e!==null){e.return=t.return,re=e;break}re=t.return}return oe=yd,yd=!1,oe}function gl(e,t,n){var l=t.updateQueue;if(l=l!==null?l.lastEffect:null,l!==null){var i=l=l.next;do{if((i.tag&e)===e){var a=i.destroy;i.destroy=void 0,a!==void 0&&Mi(t,n,a)}i=i.next}while(i!==l)}}function vo(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var l=n.create;n.destroy=l()}n=n.next}while(n!==t)}}function Bi(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function vd(e){var t=e.alternate;t!==null&&(e.alternate=null,vd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Ft],delete t[ol],delete t[ei],delete t[P_],delete t[R_])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function xd(e){return e.tag===5||e.tag===3||e.tag===4}function wd(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||xd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function zi(e,t,n){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Kl));else if(l!==4&&(e=e.child,e!==null))for(zi(e,t,n),e=e.sibling;e!==null;)zi(e,t,n),e=e.sibling}function Fi(e,t,n){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(l!==4&&(e=e.child,e!==null))for(Fi(e,t,n),e=e.sibling;e!==null;)Fi(e,t,n),e=e.sibling}var Qe=null,Tt=!1;function wn(e,t,n){for(n=n.child;n!==null;)Sd(e,t,n),n=n.sibling}function Sd(e,t,n){if(zt&&typeof zt.onCommitFiberUnmount=="function")try{zt.onCommitFiberUnmount(Rl,n)}catch{}switch(n.tag){case 5:nt||wr(n,t);case 6:var l=Qe,i=Tt;Qe=null,wn(e,t,n),Qe=l,Tt=i,Qe!==null&&(Tt?(e=Qe,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Qe.removeChild(n.stateNode));break;case 18:Qe!==null&&(Tt?(e=Qe,n=n.stateNode,e.nodeType===8?qs(e.parentNode,n):e.nodeType===1&&qs(e,n),Xr(e)):qs(Qe,n.stateNode));break;case 4:l=Qe,i=Tt,Qe=n.stateNode.containerInfo,Tt=!0,wn(e,t,n),Qe=l,Tt=i;break;case 0:case 11:case 14:case 15:if(!nt&&(l=n.updateQueue,l!==null&&(l=l.lastEffect,l!==null))){i=l=l.next;do{var a=i,m=a.destroy;a=a.tag,m!==void 0&&((a&2)!==0||(a&4)!==0)&&Mi(n,t,m),i=i.next}while(i!==l)}wn(e,t,n);break;case 1:if(!nt&&(wr(n,t),l=n.stateNode,typeof l.componentWillUnmount=="function"))try{l.props=n.memoizedProps,l.state=n.memoizedState,l.componentWillUnmount()}catch(w){Me(n,t,w)}wn(e,t,n);break;case 21:wn(e,t,n);break;case 22:n.mode&1?(nt=(l=nt)||n.memoizedState!==null,wn(e,t,n),nt=l):wn(e,t,n);break;default:wn(e,t,n)}}function bd(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Q_),t.forEach(function(l){var i=r0.bind(null,e,l);n.has(l)||(n.add(l),l.then(i,i))})}}function Ot(e,t){var n=t.deletions;if(n!==null)for(var l=0;l<n.length;l++){var i=n[l];try{var a=e,m=t,w=m;e:for(;w!==null;){switch(w.tag){case 5:Qe=w.stateNode,Tt=!1;break e;case 3:Qe=w.stateNode.containerInfo,Tt=!0;break e;case 4:Qe=w.stateNode.containerInfo,Tt=!0;break e}w=w.return}if(Qe===null)throw Error(s(160));Sd(a,m,i),Qe=null,Tt=!1;var C=i.alternate;C!==null&&(C.return=null),i.return=null}catch(A){Me(i,t,A)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Cd(t,e),t=t.sibling}function Cd(e,t){var n=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ot(t,e),Yt(e),l&4){try{gl(3,e,e.return),vo(3,e)}catch(ae){Me(e,e.return,ae)}try{gl(5,e,e.return)}catch(ae){Me(e,e.return,ae)}}break;case 1:Ot(t,e),Yt(e),l&512&&n!==null&&wr(n,n.return);break;case 5:if(Ot(t,e),Yt(e),l&512&&n!==null&&wr(n,n.return),e.flags&32){var i=e.stateNode;try{Mr(i,"")}catch(ae){Me(e,e.return,ae)}}if(l&4&&(i=e.stateNode,i!=null)){var a=e.memoizedProps,m=n!==null?n.memoizedProps:a,w=e.type,C=e.updateQueue;if(e.updateQueue=null,C!==null)try{w==="input"&&a.type==="radio"&&a.name!=null&&Et(i,a),hs(w,m);var A=hs(w,a);for(m=0;m<C.length;m+=2){var W=C[m],$=C[m+1];W==="style"?sc(i,$):W==="dangerouslySetInnerHTML"?lc(i,$):W==="children"?Mr(i,$):I(i,W,$,A)}switch(w){case"input":yt(i,a);break;case"textarea":tc(i,a);break;case"select":var U=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!a.multiple;var ne=a.value;ne!=null?er(i,!!a.multiple,ne,!1):U!==!!a.multiple&&(a.defaultValue!=null?er(i,!!a.multiple,a.defaultValue,!0):er(i,!!a.multiple,a.multiple?[]:"",!1))}i[ol]=a}catch(ae){Me(e,e.return,ae)}}break;case 6:if(Ot(t,e),Yt(e),l&4){if(e.stateNode===null)throw Error(s(162));i=e.stateNode,a=e.memoizedProps;try{i.nodeValue=a}catch(ae){Me(e,e.return,ae)}}break;case 3:if(Ot(t,e),Yt(e),l&4&&n!==null&&n.memoizedState.isDehydrated)try{Xr(t.containerInfo)}catch(ae){Me(e,e.return,ae)}break;case 4:Ot(t,e),Yt(e);break;case 13:Ot(t,e),Yt(e),i=e.child,i.flags&8192&&(a=i.memoizedState!==null,i.stateNode.isHidden=a,!a||i.alternate!==null&&i.alternate.memoizedState!==null||(Yi=Be())),l&4&&bd(e);break;case 22:if(W=n!==null&&n.memoizedState!==null,e.mode&1?(nt=(A=nt)||W,Ot(t,e),nt=A):Ot(t,e),Yt(e),l&8192){if(A=e.memoizedState!==null,(e.stateNode.isHidden=A)&&!W&&(e.mode&1)!==0)for(re=e,W=e.child;W!==null;){for($=re=W;re!==null;){switch(U=re,ne=U.child,U.tag){case 0:case 11:case 14:case 15:gl(4,U,U.return);break;case 1:wr(U,U.return);var oe=U.stateNode;if(typeof oe.componentWillUnmount=="function"){l=U,n=U.return;try{t=l,oe.props=t.memoizedProps,oe.state=t.memoizedState,oe.componentWillUnmount()}catch(ae){Me(l,n,ae)}}break;case 5:wr(U,U.return);break;case 22:if(U.memoizedState!==null){Nd($);continue}}ne!==null?(ne.return=U,re=ne):Nd($)}W=W.sibling}e:for(W=null,$=e;;){if($.tag===5){if(W===null){W=$;try{i=$.stateNode,A?(a=i.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(w=$.stateNode,C=$.memoizedProps.style,m=C!=null&&C.hasOwnProperty("display")?C.display:null,w.style.display=oc("display",m))}catch(ae){Me(e,e.return,ae)}}}else if($.tag===6){if(W===null)try{$.stateNode.nodeValue=A?"":$.memoizedProps}catch(ae){Me(e,e.return,ae)}}else if(($.tag!==22&&$.tag!==23||$.memoizedState===null||$===e)&&$.child!==null){$.child.return=$,$=$.child;continue}if($===e)break e;for(;$.sibling===null;){if($.return===null||$.return===e)break e;W===$&&(W=null),$=$.return}W===$&&(W=null),$.sibling.return=$.return,$=$.sibling}}break;case 19:Ot(t,e),Yt(e),l&4&&bd(e);break;case 21:break;default:Ot(t,e),Yt(e)}}function Yt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(xd(n)){var l=n;break e}n=n.return}throw Error(s(160))}switch(l.tag){case 5:var i=l.stateNode;l.flags&32&&(Mr(i,""),l.flags&=-33);var a=wd(e);Fi(e,a,i);break;case 3:case 4:var m=l.stateNode.containerInfo,w=wd(e);zi(e,w,m);break;default:throw Error(s(161))}}catch(C){Me(e,e.return,C)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function K_(e,t,n){re=e,kd(e)}function kd(e,t,n){for(var l=(e.mode&1)!==0;re!==null;){var i=re,a=i.child;if(i.tag===22&&l){var m=i.memoizedState!==null||yo;if(!m){var w=i.alternate,C=w!==null&&w.memoizedState!==null||nt;w=yo;var A=nt;if(yo=m,(nt=C)&&!A)for(re=i;re!==null;)m=re,C=m.child,m.tag===22&&m.memoizedState!==null?Dd(i):C!==null?(C.return=m,re=C):Dd(i);for(;a!==null;)re=a,kd(a),a=a.sibling;re=i,yo=w,nt=A}Ed(e)}else(i.subtreeFlags&8772)!==0&&a!==null?(a.return=i,re=a):Ed(e)}}function Ed(e){for(;re!==null;){var t=re;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:nt||vo(5,t);break;case 1:var l=t.stateNode;if(t.flags&4&&!nt)if(n===null)l.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:Rt(t.type,n.memoizedProps);l.componentDidUpdate(i,n.memoizedState,l.__reactInternalSnapshotBeforeUpdate)}var a=t.updateQueue;a!==null&&Nu(t,a,l);break;case 3:var m=t.updateQueue;if(m!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Nu(t,m,n)}break;case 5:var w=t.stateNode;if(n===null&&t.flags&4){n=w;var C=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":C.autoFocus&&n.focus();break;case"img":C.src&&(n.src=C.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var A=t.alternate;if(A!==null){var W=A.memoizedState;if(W!==null){var $=W.dehydrated;$!==null&&Xr($)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(s(163))}nt||t.flags&512&&Bi(t)}catch(U){Me(t,t.return,U)}}if(t===e){re=null;break}if(n=t.sibling,n!==null){n.return=t.return,re=n;break}re=t.return}}function Nd(e){for(;re!==null;){var t=re;if(t===e){re=null;break}var n=t.sibling;if(n!==null){n.return=t.return,re=n;break}re=t.return}}function Dd(e){for(;re!==null;){var t=re;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{vo(4,t)}catch(C){Me(t,n,C)}break;case 1:var l=t.stateNode;if(typeof l.componentDidMount=="function"){var i=t.return;try{l.componentDidMount()}catch(C){Me(t,i,C)}}var a=t.return;try{Bi(t)}catch(C){Me(t,a,C)}break;case 5:var m=t.return;try{Bi(t)}catch(C){Me(t,m,C)}}}catch(C){Me(t,t.return,C)}if(t===e){re=null;break}var w=t.sibling;if(w!==null){w.return=t.return,re=w;break}re=t.return}}var G_=Math.ceil,xo=M.ReactCurrentDispatcher,Ui=M.ReactCurrentOwner,bt=M.ReactCurrentBatchConfig,be=0,Ve=null,Ue=null,Xe=0,_t=0,Sr=gn(0),Ye=0,hl=null,Yn=0,wo=0,Wi=0,yl=null,ct=null,Yi=0,br=1/0,ln=null,So=!1,Hi=null,Sn=null,bo=!1,bn=null,Co=0,vl=0,Vi=null,ko=-1,Eo=0;function ot(){return(be&6)!==0?Be():ko!==-1?ko:ko=Be()}function Cn(e){return(e.mode&1)===0?1:(be&2)!==0&&Xe!==0?Xe&-Xe:O_.transition!==null?(Eo===0&&(Eo=wc()),Eo):(e=Ne,e!==0||(e=window.event,e=e===void 0?16:Pc(e.type)),e)}function It(e,t,n,l){if(50<vl)throw vl=0,Vi=null,Error(s(185));Yr(e,n,l),((be&2)===0||e!==Ve)&&(e===Ve&&((be&2)===0&&(wo|=n),Ye===4&&kn(e,Xe)),ut(e,l),n===1&&be===0&&(t.mode&1)===0&&(br=Be()+500,ql&&yn()))}function ut(e,t){var n=e.callbackNode;Om(e,t);var l=Il(e,e===Ve?Xe:0);if(l===0)n!==null&&yc(n),e.callbackNode=null,e.callbackPriority=0;else if(t=l&-l,e.callbackPriority!==t){if(n!=null&&yc(n),t===1)e.tag===0?T_(Pd.bind(null,e)):_u(Pd.bind(null,e)),D_(function(){(be&6)===0&&yn()}),n=null;else{switch(Sc(l)){case 1:n=Cs;break;case 4:n=vc;break;case 16:n=Pl;break;case 536870912:n=xc;break;default:n=Pl}n=Bd(n,jd.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function jd(e,t){if(ko=-1,Eo=0,(be&6)!==0)throw Error(s(327));var n=e.callbackNode;if(Cr()&&e.callbackNode!==n)return null;var l=Il(e,e===Ve?Xe:0);if(l===0)return null;if((l&30)!==0||(l&e.expiredLanes)!==0||t)t=No(e,l);else{t=l;var i=be;be|=2;var a=Td();(Ve!==e||Xe!==t)&&(ln=null,br=Be()+500,Vn(e,t));do try{q_();break}catch(w){Rd(e,w)}while(!0);ci(),xo.current=a,be=i,Ue!==null?t=0:(Ve=null,Xe=0,t=Ye)}if(t!==0){if(t===2&&(i=ks(e),i!==0&&(l=i,t=$i(e,i))),t===1)throw n=hl,Vn(e,0),kn(e,l),ut(e,Be()),n;if(t===6)kn(e,l);else{if(i=e.current.alternate,(l&30)===0&&!Z_(i)&&(t=No(e,l),t===2&&(a=ks(e),a!==0&&(l=a,t=$i(e,a))),t===1))throw n=hl,Vn(e,0),kn(e,l),ut(e,Be()),n;switch(e.finishedWork=i,e.finishedLanes=l,t){case 0:case 1:throw Error(s(345));case 2:$n(e,ct,ln);break;case 3:if(kn(e,l),(l&130023424)===l&&(t=Yi+500-Be(),10<t)){if(Il(e,0)!==0)break;if(i=e.suspendedLanes,(i&l)!==l){ot(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=Js($n.bind(null,e,ct,ln),t);break}$n(e,ct,ln);break;case 4:if(kn(e,l),(l&4194240)===l)break;for(t=e.eventTimes,i=-1;0<l;){var m=31-Dt(l);a=1<<m,m=t[m],m>i&&(i=m),l&=~a}if(l=i,l=Be()-l,l=(120>l?120:480>l?480:1080>l?1080:1920>l?1920:3e3>l?3e3:4320>l?4320:1960*G_(l/1960))-l,10<l){e.timeoutHandle=Js($n.bind(null,e,ct,ln),l);break}$n(e,ct,ln);break;case 5:$n(e,ct,ln);break;default:throw Error(s(329))}}}return ut(e,Be()),e.callbackNode===n?jd.bind(null,e):null}function $i(e,t){var n=yl;return e.current.memoizedState.isDehydrated&&(Vn(e,t).flags|=256),e=No(e,t),e!==2&&(t=ct,ct=n,t!==null&&Qi(t)),e}function Qi(e){ct===null?ct=e:ct.push.apply(ct,e)}function Z_(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var l=0;l<n.length;l++){var i=n[l],a=i.getSnapshot;i=i.value;try{if(!jt(a(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function kn(e,t){for(t&=~Wi,t&=~wo,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Dt(t),l=1<<n;e[n]=-1,t&=~l}}function Pd(e){if((be&6)!==0)throw Error(s(327));Cr();var t=Il(e,0);if((t&1)===0)return ut(e,Be()),null;var n=No(e,t);if(e.tag!==0&&n===2){var l=ks(e);l!==0&&(t=l,n=$i(e,l))}if(n===1)throw n=hl,Vn(e,0),kn(e,t),ut(e,Be()),n;if(n===6)throw Error(s(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,$n(e,ct,ln),ut(e,Be()),null}function Xi(e,t){var n=be;be|=1;try{return e(t)}finally{be=n,be===0&&(br=Be()+500,ql&&yn())}}function Hn(e){bn!==null&&bn.tag===0&&(be&6)===0&&Cr();var t=be;be|=1;var n=bt.transition,l=Ne;try{if(bt.transition=null,Ne=1,e)return e()}finally{Ne=l,bt.transition=n,be=t,(be&6)===0&&yn()}}function Ki(){_t=Sr.current,Te(Sr)}function Vn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,N_(n)),Ue!==null)for(n=Ue.return;n!==null;){var l=n;switch(li(l),l.tag){case 1:l=l.type.childContextTypes,l!=null&&Zl();break;case 3:vr(),Te(st),Te(qe),hi();break;case 5:_i(l);break;case 4:vr();break;case 13:Te(Ae);break;case 19:Te(Ae);break;case 10:ui(l.type._context);break;case 22:case 23:Ki()}n=n.return}if(Ve=e,Ue=e=En(e.current,null),Xe=_t=t,Ye=0,hl=null,Wi=wo=Yn=0,ct=yl=null,Fn!==null){for(t=0;t<Fn.length;t++)if(n=Fn[t],l=n.interleaved,l!==null){n.interleaved=null;var i=l.next,a=n.pending;if(a!==null){var m=a.next;a.next=i,l.next=m}n.pending=l}Fn=null}return e}function Rd(e,t){do{var n=Ue;try{if(ci(),co.current=mo,uo){for(var l=Le.memoizedState;l!==null;){var i=l.queue;i!==null&&(i.pending=null),l=l.next}uo=!1}if(Wn=0,He=We=Le=null,dl=!1,fl=0,Ui.current=null,n===null||n.return===null){Ye=1,hl=t,Ue=null;break}e:{var a=e,m=n.return,w=n,C=t;if(t=Xe,w.flags|=32768,C!==null&&typeof C=="object"&&typeof C.then=="function"){var A=C,W=w,$=W.tag;if((W.mode&1)===0&&($===0||$===11||$===15)){var U=W.alternate;U?(W.updateQueue=U.updateQueue,W.memoizedState=U.memoizedState,W.lanes=U.lanes):(W.updateQueue=null,W.memoizedState=null)}var ne=nd(m);if(ne!==null){ne.flags&=-257,rd(ne,m,w,a,t),ne.mode&1&&td(a,A,t),t=ne,C=A;var oe=t.updateQueue;if(oe===null){var ae=new Set;ae.add(C),t.updateQueue=ae}else oe.add(C);break e}else{if((t&1)===0){td(a,A,t),Gi();break e}C=Error(s(426))}}else if(Ie&&w.mode&1){var ze=nd(m);if(ze!==null){(ze.flags&65536)===0&&(ze.flags|=256),rd(ze,m,w,a,t),ii(xr(C,w));break e}}a=C=xr(C,w),Ye!==4&&(Ye=2),yl===null?yl=[a]:yl.push(a),a=m;do{switch(a.tag){case 3:a.flags|=65536,t&=-t,a.lanes|=t;var T=qu(a,C,t);Eu(a,T);break e;case 1:w=C;var N=a.type,O=a.stateNode;if((a.flags&128)===0&&(typeof N.getDerivedStateFromError=="function"||O!==null&&typeof O.componentDidCatch=="function"&&(Sn===null||!Sn.has(O)))){a.flags|=65536,t&=-t,a.lanes|=t;var X=ed(a,w,t);Eu(a,X);break e}}a=a.return}while(a!==null)}Id(n)}catch(de){t=de,Ue===n&&n!==null&&(Ue=n=n.return);continue}break}while(!0)}function Td(){var e=xo.current;return xo.current=mo,e===null?mo:e}function Gi(){(Ye===0||Ye===3||Ye===2)&&(Ye=4),Ve===null||(Yn&268435455)===0&&(wo&268435455)===0||kn(Ve,Xe)}function No(e,t){var n=be;be|=2;var l=Td();(Ve!==e||Xe!==t)&&(ln=null,Vn(e,t));do try{J_();break}catch(i){Rd(e,i)}while(!0);if(ci(),be=n,xo.current=l,Ue!==null)throw Error(s(261));return Ve=null,Xe=0,Ye}function J_(){for(;Ue!==null;)Od(Ue)}function q_(){for(;Ue!==null&&!Cm();)Od(Ue)}function Od(e){var t=Md(e.alternate,e,_t);e.memoizedProps=e.pendingProps,t===null?Id(e):Ue=t,Ui.current=null}function Id(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=V_(n,t,_t),n!==null){Ue=n;return}}else{if(n=$_(n,t),n!==null){n.flags&=32767,Ue=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Ye=6,Ue=null;return}}if(t=t.sibling,t!==null){Ue=t;return}Ue=t=e}while(t!==null);Ye===0&&(Ye=5)}function $n(e,t,n){var l=Ne,i=bt.transition;try{bt.transition=null,Ne=1,e0(e,t,n,l)}finally{bt.transition=i,Ne=l}return null}function e0(e,t,n,l){do Cr();while(bn!==null);if((be&6)!==0)throw Error(s(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(s(177));e.callbackNode=null,e.callbackPriority=0;var a=n.lanes|n.childLanes;if(Im(e,a),e===Ve&&(Ue=Ve=null,Xe=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||bo||(bo=!0,Bd(Pl,function(){return Cr(),null})),a=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||a){a=bt.transition,bt.transition=null;var m=Ne;Ne=1;var w=be;be|=4,Ui.current=null,X_(e,n),Cd(n,e),x_(Gs),Ml=!!Ks,Gs=Ks=null,e.current=n,K_(n),km(),be=w,Ne=m,bt.transition=a}else e.current=n;if(bo&&(bo=!1,bn=e,Co=i),a=e.pendingLanes,a===0&&(Sn=null),Dm(n.stateNode),ut(e,Be()),t!==null)for(l=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],l(i.value,{componentStack:i.stack,digest:i.digest});if(So)throw So=!1,e=Hi,Hi=null,e;return(Co&1)!==0&&e.tag!==0&&Cr(),a=e.pendingLanes,(a&1)!==0?e===Vi?vl++:(vl=0,Vi=e):vl=0,yn(),null}function Cr(){if(bn!==null){var e=Sc(Co),t=bt.transition,n=Ne;try{if(bt.transition=null,Ne=16>e?16:e,bn===null)var l=!1;else{if(e=bn,bn=null,Co=0,(be&6)!==0)throw Error(s(331));var i=be;for(be|=4,re=e.current;re!==null;){var a=re,m=a.child;if((re.flags&16)!==0){var w=a.deletions;if(w!==null){for(var C=0;C<w.length;C++){var A=w[C];for(re=A;re!==null;){var W=re;switch(W.tag){case 0:case 11:case 15:gl(8,W,a)}var $=W.child;if($!==null)$.return=W,re=$;else for(;re!==null;){W=re;var U=W.sibling,ne=W.return;if(vd(W),W===A){re=null;break}if(U!==null){U.return=ne,re=U;break}re=ne}}}var oe=a.alternate;if(oe!==null){var ae=oe.child;if(ae!==null){oe.child=null;do{var ze=ae.sibling;ae.sibling=null,ae=ze}while(ae!==null)}}re=a}}if((a.subtreeFlags&2064)!==0&&m!==null)m.return=a,re=m;else e:for(;re!==null;){if(a=re,(a.flags&2048)!==0)switch(a.tag){case 0:case 11:case 15:gl(9,a,a.return)}var T=a.sibling;if(T!==null){T.return=a.return,re=T;break e}re=a.return}}var N=e.current;for(re=N;re!==null;){m=re;var O=m.child;if((m.subtreeFlags&2064)!==0&&O!==null)O.return=m,re=O;else e:for(m=N;re!==null;){if(w=re,(w.flags&2048)!==0)try{switch(w.tag){case 0:case 11:case 15:vo(9,w)}}catch(de){Me(w,w.return,de)}if(w===m){re=null;break e}var X=w.sibling;if(X!==null){X.return=w.return,re=X;break e}re=w.return}}if(be=i,yn(),zt&&typeof zt.onPostCommitFiberRoot=="function")try{zt.onPostCommitFiberRoot(Rl,e)}catch{}l=!0}return l}finally{Ne=n,bt.transition=t}}return!1}function Ad(e,t,n){t=xr(n,t),t=qu(e,t,1),e=xn(e,t,1),t=ot(),e!==null&&(Yr(e,1,t),ut(e,t))}function Me(e,t,n){if(e.tag===3)Ad(e,e,n);else for(;t!==null;){if(t.tag===3){Ad(t,e,n);break}else if(t.tag===1){var l=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(Sn===null||!Sn.has(l))){e=xr(n,e),e=ed(t,e,1),t=xn(t,e,1),e=ot(),t!==null&&(Yr(t,1,e),ut(t,e));break}}t=t.return}}function t0(e,t,n){var l=e.pingCache;l!==null&&l.delete(t),t=ot(),e.pingedLanes|=e.suspendedLanes&n,Ve===e&&(Xe&n)===n&&(Ye===4||Ye===3&&(Xe&130023424)===Xe&&500>Be()-Yi?Vn(e,0):Wi|=n),ut(e,t)}function Ld(e,t){t===0&&((e.mode&1)===0?t=1:(t=Ol,Ol<<=1,(Ol&130023424)===0&&(Ol=4194304)));var n=ot();e=tn(e,t),e!==null&&(Yr(e,t,n),ut(e,n))}function n0(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ld(e,n)}function r0(e,t){var n=0;switch(e.tag){case 13:var l=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:l=e.stateNode;break;default:throw Error(s(314))}l!==null&&l.delete(t),Ld(e,n)}var Md;Md=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||st.current)at=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return at=!1,H_(e,t,n);at=(e.flags&131072)!==0}else at=!1,Ie&&(t.flags&1048576)!==0&&gu(t,to,t.index);switch(t.lanes=0,t.tag){case 2:var l=t.type;ho(e,t),e=t.pendingProps;var i=fr(t,qe.current);yr(t,n),i=xi(null,t,l,e,i,n);var a=wi();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,it(l)?(a=!0,Jl(t)):a=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,pi(t),i.updater=_o,t.stateNode=i,i._reactInternals=t,Ni(t,l,e,n),t=Ri(null,t,l,!0,a,n)):(t.tag=0,Ie&&a&&ri(t),lt(null,t,i,n),t=t.child),t;case 16:l=t.elementType;e:{switch(ho(e,t),e=t.pendingProps,i=l._init,l=i(l._payload),t.type=l,i=t.tag=o0(l),e=Rt(l,e),i){case 0:t=Pi(null,t,l,e,n);break e;case 1:t=cd(null,t,l,e,n);break e;case 11:t=ld(null,t,l,e,n);break e;case 14:t=od(null,t,l,Rt(l.type,e),n);break e}throw Error(s(306,l,""))}return t;case 0:return l=t.type,i=t.pendingProps,i=t.elementType===l?i:Rt(l,i),Pi(e,t,l,i,n);case 1:return l=t.type,i=t.pendingProps,i=t.elementType===l?i:Rt(l,i),cd(e,t,l,i,n);case 3:e:{if(ud(t),e===null)throw Error(s(387));l=t.pendingProps,a=t.memoizedState,i=a.element,ku(e,t),io(t,l,null,n);var m=t.memoizedState;if(l=m.element,a.isDehydrated)if(a={element:l,isDehydrated:!1,cache:m.cache,pendingSuspenseBoundaries:m.pendingSuspenseBoundaries,transitions:m.transitions},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){i=xr(Error(s(423)),t),t=dd(e,t,l,n,i);break e}else if(l!==i){i=xr(Error(s(424)),t),t=dd(e,t,l,n,i);break e}else for(mt=_n(t.stateNode.containerInfo.firstChild),pt=t,Ie=!0,Pt=null,n=bu(t,null,l,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(_r(),l===i){t=rn(e,t,n);break e}lt(e,t,l,n)}t=t.child}return t;case 5:return Du(t),e===null&&si(t),l=t.type,i=t.pendingProps,a=e!==null?e.memoizedProps:null,m=i.children,Zs(l,i)?m=null:a!==null&&Zs(l,a)&&(t.flags|=32),ad(e,t),lt(e,t,m,n),t.child;case 6:return e===null&&si(t),null;case 13:return fd(e,t,n);case 4:return mi(t,t.stateNode.containerInfo),l=t.pendingProps,e===null?t.child=gr(t,null,l,n):lt(e,t,l,n),t.child;case 11:return l=t.type,i=t.pendingProps,i=t.elementType===l?i:Rt(l,i),ld(e,t,l,i,n);case 7:return lt(e,t,t.pendingProps,n),t.child;case 8:return lt(e,t,t.pendingProps.children,n),t.child;case 12:return lt(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(l=t.type._context,i=t.pendingProps,a=t.memoizedProps,m=i.value,je(lo,l._currentValue),l._currentValue=m,a!==null)if(jt(a.value,m)){if(a.children===i.children&&!st.current){t=rn(e,t,n);break e}}else for(a=t.child,a!==null&&(a.return=t);a!==null;){var w=a.dependencies;if(w!==null){m=a.child;for(var C=w.firstContext;C!==null;){if(C.context===l){if(a.tag===1){C=nn(-1,n&-n),C.tag=2;var A=a.updateQueue;if(A!==null){A=A.shared;var W=A.pending;W===null?C.next=C:(C.next=W.next,W.next=C),A.pending=C}}a.lanes|=n,C=a.alternate,C!==null&&(C.lanes|=n),di(a.return,n,t),w.lanes|=n;break}C=C.next}}else if(a.tag===10)m=a.type===t.type?null:a.child;else if(a.tag===18){if(m=a.return,m===null)throw Error(s(341));m.lanes|=n,w=m.alternate,w!==null&&(w.lanes|=n),di(m,n,t),m=a.sibling}else m=a.child;if(m!==null)m.return=a;else for(m=a;m!==null;){if(m===t){m=null;break}if(a=m.sibling,a!==null){a.return=m.return,m=a;break}m=m.return}a=m}lt(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,l=t.pendingProps.children,yr(t,n),i=wt(i),l=l(i),t.flags|=1,lt(e,t,l,n),t.child;case 14:return l=t.type,i=Rt(l,t.pendingProps),i=Rt(l.type,i),od(e,t,l,i,n);case 15:return sd(e,t,t.type,t.pendingProps,n);case 17:return l=t.type,i=t.pendingProps,i=t.elementType===l?i:Rt(l,i),ho(e,t),t.tag=1,it(l)?(e=!0,Jl(t)):e=!1,yr(t,n),Zu(t,l,i),Ni(t,l,i,n),Ri(null,t,l,!0,e,n);case 19:return md(e,t,n);case 22:return id(e,t,n)}throw Error(s(156,t.tag))};function Bd(e,t){return hc(e,t)}function l0(e,t,n,l){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ct(e,t,n,l){return new l0(e,t,n,l)}function Zi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function o0(e){if(typeof e=="function")return Zi(e)?1:0;if(e!=null){if(e=e.$$typeof,e===pe)return 11;if(e===xe)return 14}return 2}function En(e,t){var n=e.alternate;return n===null?(n=Ct(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Do(e,t,n,l,i,a){var m=2;if(l=e,typeof e=="function")Zi(e)&&(m=1);else if(typeof e=="string")m=5;else e:switch(e){case Y:return Qn(n.children,i,a,t);case K:m=8,i|=8;break;case fe:return e=Ct(12,n,t,i|2),e.elementType=fe,e.lanes=a,e;case me:return e=Ct(13,n,t,i),e.elementType=me,e.lanes=a,e;case _e:return e=Ct(19,n,t,i),e.elementType=_e,e.lanes=a,e;case se:return jo(n,i,a,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ue:m=10;break e;case he:m=9;break e;case pe:m=11;break e;case xe:m=14;break e;case ce:m=16,l=null;break e}throw Error(s(130,e==null?e:typeof e,""))}return t=Ct(m,n,t,i),t.elementType=e,t.type=l,t.lanes=a,t}function Qn(e,t,n,l){return e=Ct(7,e,l,t),e.lanes=n,e}function jo(e,t,n,l){return e=Ct(22,e,l,t),e.elementType=se,e.lanes=n,e.stateNode={isHidden:!1},e}function Ji(e,t,n){return e=Ct(6,e,null,t),e.lanes=n,e}function qi(e,t,n){return t=Ct(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function s0(e,t,n,l,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Es(0),this.expirationTimes=Es(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Es(0),this.identifierPrefix=l,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function ea(e,t,n,l,i,a,m,w,C){return e=new s0(e,t,n,w,C),t===1?(t=1,a===!0&&(t|=8)):t=0,a=Ct(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:l,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},pi(a),e}function i0(e,t,n){var l=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:G,key:l==null?null:""+l,children:e,containerInfo:t,implementation:n}}function zd(e){if(!e)return hn;e=e._reactInternals;e:{if(An(e)!==e||e.tag!==1)throw Error(s(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(it(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(s(171))}if(e.tag===1){var n=e.type;if(it(n))return pu(e,n,t)}return t}function Fd(e,t,n,l,i,a,m,w,C){return e=ea(n,l,!0,e,i,a,m,w,C),e.context=zd(null),n=e.current,l=ot(),i=Cn(n),a=nn(l,i),a.callback=t??null,xn(n,a,i),e.current.lanes=i,Yr(e,i,l),ut(e,l),e}function Po(e,t,n,l){var i=t.current,a=ot(),m=Cn(i);return n=zd(n),t.context===null?t.context=n:t.pendingContext=n,t=nn(a,m),t.payload={element:e},l=l===void 0?null:l,l!==null&&(t.callback=l),e=xn(i,t,m),e!==null&&(It(e,i,m,a),so(e,i,m)),m}function Ro(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Ud(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ta(e,t){Ud(e,t),(e=e.alternate)&&Ud(e,t)}function a0(){return null}var Wd=typeof reportError=="function"?reportError:function(e){console.error(e)};function na(e){this._internalRoot=e}To.prototype.render=na.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(s(409));Po(e,t,null,null)},To.prototype.unmount=na.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Hn(function(){Po(null,e,null,null)}),t[Zt]=null}};function To(e){this._internalRoot=e}To.prototype.unstable_scheduleHydration=function(e){if(e){var t=kc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<fn.length&&t!==0&&t<fn[n].priority;n++);fn.splice(n,0,e),n===0&&Dc(e)}};function ra(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Oo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Yd(){}function c0(e,t,n,l,i){if(i){if(typeof l=="function"){var a=l;l=function(){var A=Ro(m);a.call(A)}}var m=Fd(t,l,e,0,null,!1,!1,"",Yd);return e._reactRootContainer=m,e[Zt]=m.current,rl(e.nodeType===8?e.parentNode:e),Hn(),m}for(;i=e.lastChild;)e.removeChild(i);if(typeof l=="function"){var w=l;l=function(){var A=Ro(C);w.call(A)}}var C=ea(e,0,!1,null,null,!1,!1,"",Yd);return e._reactRootContainer=C,e[Zt]=C.current,rl(e.nodeType===8?e.parentNode:e),Hn(function(){Po(t,C,n,l)}),C}function Io(e,t,n,l,i){var a=n._reactRootContainer;if(a){var m=a;if(typeof i=="function"){var w=i;i=function(){var C=Ro(m);w.call(C)}}Po(t,m,e,i)}else m=c0(n,t,e,i,l);return Ro(m)}bc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Wr(t.pendingLanes);n!==0&&(Ns(t,n|1),ut(t,Be()),(be&6)===0&&(br=Be()+500,yn()))}break;case 13:Hn(function(){var l=tn(e,1);if(l!==null){var i=ot();It(l,e,1,i)}}),ta(e,1)}},Ds=function(e){if(e.tag===13){var t=tn(e,134217728);if(t!==null){var n=ot();It(t,e,134217728,n)}ta(e,134217728)}},Cc=function(e){if(e.tag===13){var t=Cn(e),n=tn(e,t);if(n!==null){var l=ot();It(n,e,t,l)}ta(e,t)}},kc=function(){return Ne},Ec=function(e,t){var n=Ne;try{return Ne=e,t()}finally{Ne=n}},xs=function(e,t,n){switch(t){case"input":if(yt(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var l=n[t];if(l!==e&&l.form===e.form){var i=Gl(l);if(!i)throw Error(s(90));ge(l),yt(l,i)}}}break;case"textarea":tc(e,n);break;case"select":t=n.value,t!=null&&er(e,!!n.multiple,t,!1)}},uc=Xi,dc=Hn;var u0={usingClientEntryPoint:!1,Events:[sl,ur,Gl,ac,cc,Xi]},xl={findFiberByHostInstance:Ln,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},d0={bundleType:xl.bundleType,version:xl.version,rendererPackageName:xl.rendererPackageName,rendererConfig:xl.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:M.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=_c(e),e===null?null:e.stateNode},findFiberByHostInstance:xl.findFiberByHostInstance||a0,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ao=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ao.isDisabled&&Ao.supportsFiber)try{Rl=Ao.inject(d0),zt=Ao}catch{}}return dt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=u0,dt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ra(t))throw Error(s(200));return i0(e,t,null,n)},dt.createRoot=function(e,t){if(!ra(e))throw Error(s(299));var n=!1,l="",i=Wd;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(l=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=ea(e,1,!1,null,null,n,!1,l,i),e[Zt]=t.current,rl(e.nodeType===8?e.parentNode:e),new na(t)},dt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=_c(t),e=e===null?null:e.stateNode,e},dt.flushSync=function(e){return Hn(e)},dt.hydrate=function(e,t,n){if(!Oo(t))throw Error(s(200));return Io(null,e,t,!0,n)},dt.hydrateRoot=function(e,t,n){if(!ra(e))throw Error(s(405));var l=n!=null&&n.hydratedSources||null,i=!1,a="",m=Wd;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onRecoverableError!==void 0&&(m=n.onRecoverableError)),t=Fd(t,null,e,1,n??null,i,!1,a,m),e[Zt]=t.current,rl(e),l)for(e=0;e<l.length;e++)n=l[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new To(t)},dt.render=function(e,t,n){if(!Oo(t))throw Error(s(200));return Io(null,e,t,!1,n)},dt.unmountComponentAtNode=function(e){if(!Oo(e))throw Error(s(40));return e._reactRootContainer?(Hn(function(){Io(null,null,e,!1,function(){e._reactRootContainer=null,e[Zt]=null})}),!0):!1},dt.unstable_batchedUpdates=Xi,dt.unstable_renderSubtreeIntoContainer=function(e,t,n,l){if(!Oo(n))throw Error(s(200));if(e==null||e._reactInternals===void 0)throw Error(s(38));return Io(e,t,n,!1,l)},dt.version="18.3.1-next-f1338f8080-20240426",dt}var Zd;function If(){if(Zd)return sa.exports;Zd=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(o){console.error(o)}}return r(),sa.exports=v0(),sa.exports}var Jd;function x0(){if(Jd)return Lo;Jd=1;var r=If();return Lo.createRoot=r.createRoot,Lo.hydrateRoot=r.hydrateRoot,Lo}var w0=x0(),Or=If();const S0=Tf(Or);var b0=`svg[fill=none] {
  fill: none !important;
}

@keyframes styles-module__popupEnter___AuQDN {
  from {
    opacity: 0;
    transform: translateX(-50%) scale(0.95) translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) scale(1) translateY(0);
  }
}
@keyframes styles-module__popupExit___JJKQX {
  from {
    opacity: 1;
    transform: translateX(-50%) scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) scale(0.95) translateY(4px);
  }
}
@keyframes styles-module__shake___jdbWe {
  0%, 100% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(0);
  }
  20% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(-3px);
  }
  40% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(3px);
  }
  60% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(-2px);
  }
  80% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(2px);
  }
}
.styles-module__popup___IhzrD {
  position: fixed;
  transform: translateX(-50%);
  width: 280px;
  padding: 0.75rem 1rem 14px;
  background: #1a1a1a;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
  cursor: default;
  z-index: 100001;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  will-change: transform, opacity;
  opacity: 0;
}
.styles-module__popup___IhzrD.styles-module__enter___L7U7N {
  animation: styles-module__popupEnter___AuQDN 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
.styles-module__popup___IhzrD.styles-module__entered___COX-w {
  opacity: 1;
  transform: translateX(-50%) scale(1) translateY(0);
}
.styles-module__popup___IhzrD.styles-module__exit___5eGjE {
  animation: styles-module__popupExit___JJKQX 0.15s ease-in forwards;
}
.styles-module__popup___IhzrD.styles-module__entered___COX-w.styles-module__shake___jdbWe {
  animation: styles-module__shake___jdbWe 0.25s ease-out;
}

.styles-module__header___wWsSi {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5625rem;
}

.styles-module__element___fTV2z {
  font-size: 0.75rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.styles-module__headerToggle___WpW0b {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  flex: 1;
  min-width: 0;
  text-align: left;
}
.styles-module__headerToggle___WpW0b .styles-module__element___fTV2z {
  flex: 1;
}

.styles-module__chevron___ZZJlR {
  color: rgba(255, 255, 255, 0.5);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}
.styles-module__chevron___ZZJlR.styles-module__expanded___2Hxgv {
  transform: rotate(90deg);
}

.styles-module__stylesWrapper___pnHgy {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.styles-module__stylesWrapper___pnHgy.styles-module__expanded___2Hxgv {
  grid-template-rows: 1fr;
}

.styles-module__stylesInner___YYZe2 {
  overflow: hidden;
}

.styles-module__stylesBlock___VfQKn {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.375rem;
  padding: 0.5rem 0.625rem;
  margin-bottom: 0.5rem;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  font-size: 0.6875rem;
  line-height: 1.5;
}

.styles-module__styleLine___1YQiD {
  color: rgba(255, 255, 255, 0.85);
  word-break: break-word;
}

.styles-module__styleProperty___84L1i {
  color: #c792ea;
}

.styles-module__styleValue___q51-h {
  color: rgba(255, 255, 255, 0.85);
}

.styles-module__timestamp___Dtpsv {
  font-size: 0.625rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.35);
  font-variant-numeric: tabular-nums;
  margin-left: 0.5rem;
  flex-shrink: 0;
}

.styles-module__quote___mcMmQ {
  font-size: 12px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.5rem;
  padding: 0.4rem 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.25rem;
  line-height: 1.45;
}

.styles-module__textarea___jrSae {
  width: 100%;
  padding: 0.5rem 0.625rem;
  font-size: 0.8125rem;
  font-family: inherit;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  resize: none;
  outline: none;
  transition: border-color 0.15s ease;
}
.styles-module__textarea___jrSae:focus {
  border-color: #3c82f7;
}
.styles-module__textarea___jrSae.styles-module__green___99l3h:focus {
  border-color: #34c759;
}
.styles-module__textarea___jrSae::placeholder {
  color: rgba(255, 255, 255, 0.35);
}
.styles-module__textarea___jrSae::-webkit-scrollbar {
  width: 6px;
}
.styles-module__textarea___jrSae::-webkit-scrollbar-track {
  background: transparent;
}
.styles-module__textarea___jrSae::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.styles-module__actions___D6x3f {
  display: flex;
  justify-content: flex-end;
  gap: 0.375rem;
  margin-top: 0.5rem;
}

.styles-module__cancel___hRjnL,
.styles-module__submit___K-mIR {
  padding: 0.4rem 0.875rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease, opacity 0.15s ease;
}

.styles-module__cancel___hRjnL {
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
}
.styles-module__cancel___hRjnL:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}

.styles-module__submit___K-mIR {
  color: white;
}
.styles-module__submit___K-mIR:hover:not(:disabled) {
  filter: brightness(0.9);
}
.styles-module__submit___K-mIR:disabled {
  cursor: not-allowed;
}

.styles-module__deleteWrapper___oSjdo {
  margin-right: auto;
}

.styles-module__deleteButton___4VuAE {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.4);
  transition: background-color 0.15s ease, color 0.15s ease, transform 0.1s ease;
}
.styles-module__deleteButton___4VuAE:hover {
  background: rgba(255, 59, 48, 0.25);
  color: #ff3b30;
}
.styles-module__deleteButton___4VuAE:active {
  transform: scale(0.92);
}

.styles-module__light___6AaSQ.styles-module__popup___IhzrD {
  background: #fff;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06);
}
.styles-module__light___6AaSQ .styles-module__element___fTV2z {
  color: rgba(0, 0, 0, 0.6);
}
.styles-module__light___6AaSQ .styles-module__timestamp___Dtpsv {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___6AaSQ .styles-module__chevron___ZZJlR {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___6AaSQ .styles-module__stylesBlock___VfQKn {
  background: rgba(0, 0, 0, 0.03);
}
.styles-module__light___6AaSQ .styles-module__styleLine___1YQiD {
  color: rgba(0, 0, 0, 0.75);
}
.styles-module__light___6AaSQ .styles-module__styleProperty___84L1i {
  color: #7c3aed;
}
.styles-module__light___6AaSQ .styles-module__styleValue___q51-h {
  color: rgba(0, 0, 0, 0.75);
}
.styles-module__light___6AaSQ .styles-module__quote___mcMmQ {
  color: rgba(0, 0, 0, 0.55);
  background: rgba(0, 0, 0, 0.04);
}
.styles-module__light___6AaSQ .styles-module__textarea___jrSae {
  background: rgba(0, 0, 0, 0.03);
  color: #1a1a1a;
  border-color: rgba(0, 0, 0, 0.12);
}
.styles-module__light___6AaSQ .styles-module__textarea___jrSae::placeholder {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___6AaSQ .styles-module__textarea___jrSae::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
}
.styles-module__light___6AaSQ .styles-module__cancel___hRjnL {
  color: rgba(0, 0, 0, 0.5);
}
.styles-module__light___6AaSQ .styles-module__cancel___hRjnL:hover {
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.75);
}
.styles-module__light___6AaSQ .styles-module__deleteButton___4VuAE {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___6AaSQ .styles-module__deleteButton___4VuAE:hover {
  background: rgba(255, 59, 48, 0.15);
  color: #ff3b30;
}`,C0={popup:"styles-module__popup___IhzrD",enter:"styles-module__enter___L7U7N",entered:"styles-module__entered___COX-w",exit:"styles-module__exit___5eGjE",shake:"styles-module__shake___jdbWe",header:"styles-module__header___wWsSi",element:"styles-module__element___fTV2z",headerToggle:"styles-module__headerToggle___WpW0b",chevron:"styles-module__chevron___ZZJlR",expanded:"styles-module__expanded___2Hxgv",stylesWrapper:"styles-module__stylesWrapper___pnHgy",stylesInner:"styles-module__stylesInner___YYZe2",stylesBlock:"styles-module__stylesBlock___VfQKn",styleLine:"styles-module__styleLine___1YQiD",styleProperty:"styles-module__styleProperty___84L1i",styleValue:"styles-module__styleValue___q51-h",timestamp:"styles-module__timestamp___Dtpsv",quote:"styles-module__quote___mcMmQ",textarea:"styles-module__textarea___jrSae",actions:"styles-module__actions___D6x3f",cancel:"styles-module__cancel___hRjnL",submit:"styles-module__submit___K-mIR",deleteWrapper:"styles-module__deleteWrapper___oSjdo",deleteButton:"styles-module__deleteButton___4VuAE",light:"styles-module__light___6AaSQ"};if(typeof document<"u"){let r=document.getElementById("feedback-tool-styles-annotation-popup-css-styles");r||(r=document.createElement("style"),r.id="feedback-tool-styles-annotation-popup-css-styles",r.textContent=b0,document.head.appendChild(r))}var De=C0,k0=({size:r=24})=>u.jsx("svg",{width:r,height:r,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:u.jsx("path",{d:"M13.5 4C14.7426 4 15.75 5.00736 15.75 6.25V7H18.5C18.9142 7 19.25 7.33579 19.25 7.75C19.25 8.16421 18.9142 8.5 18.5 8.5H17.9678L17.6328 16.2217C17.61 16.7475 17.5912 17.1861 17.5469 17.543C17.5015 17.9087 17.4225 18.2506 17.2461 18.5723C16.9747 19.0671 16.5579 19.4671 16.0518 19.7168C15.7227 19.8791 15.3772 19.9422 15.0098 19.9717C14.6514 20.0004 14.2126 20 13.6865 20H10.3135C9.78735 20 9.34856 20.0004 8.99023 19.9717C8.62278 19.9422 8.27729 19.8791 7.94824 19.7168C7.44205 19.4671 7.02532 19.0671 6.75391 18.5723C6.57751 18.2506 6.49853 17.9087 6.45312 17.543C6.40883 17.1861 6.39005 16.7475 6.36719 16.2217L6.03223 8.5H5.5C5.08579 8.5 4.75 8.16421 4.75 7.75C4.75 7.33579 5.08579 7 5.5 7H8.25V6.25C8.25 5.00736 9.25736 4 10.5 4H13.5ZM7.86621 16.1562C7.89013 16.7063 7.90624 17.0751 7.94141 17.3584C7.97545 17.6326 8.02151 17.7644 8.06934 17.8516C8.19271 18.0763 8.38239 18.2577 8.6123 18.3711C8.70153 18.4151 8.83504 18.4545 9.11035 18.4766C9.39482 18.4994 9.76335 18.5 10.3135 18.5H13.6865C14.2367 18.5 14.6052 18.4994 14.8896 18.4766C15.165 18.4545 15.2985 18.4151 15.3877 18.3711C15.6176 18.2577 15.8073 18.0763 15.9307 17.8516C15.9785 17.7644 16.0245 17.6326 16.0586 17.3584C16.0938 17.0751 16.1099 16.7063 16.1338 16.1562L16.4668 8.5H7.5332L7.86621 16.1562ZM9.97656 10.75C10.3906 10.7371 10.7371 11.0626 10.75 11.4766L10.875 15.4766C10.8879 15.8906 10.5624 16.2371 10.1484 16.25C9.73443 16.2629 9.38794 15.9374 9.375 15.5234L9.25 11.5234C9.23706 11.1094 9.56255 10.7629 9.97656 10.75ZM14.0244 10.75C14.4383 10.7635 14.7635 11.1105 14.75 11.5244L14.6201 15.5244C14.6066 15.9384 14.2596 16.2634 13.8457 16.25C13.4317 16.2365 13.1067 15.8896 13.1201 15.4756L13.251 11.4756C13.2645 11.0617 13.6105 10.7366 14.0244 10.75ZM10.5 5.5C10.0858 5.5 9.75 5.83579 9.75 6.25V7H14.25V6.25C14.25 5.83579 13.9142 5.5 13.5 5.5H10.5Z",fill:"currentColor"})}),ca="__agentation_freeze";function E0(){if(typeof window>"u")return{frozen:!1,installed:!0,origSetTimeout:setTimeout,origSetInterval:setInterval,origRAF:o=>0,pausedAnimations:[],frozenTimeoutQueue:[],frozenRAFQueue:[]};const r=window;return r[ca]||(r[ca]={frozen:!1,installed:!1,origSetTimeout:null,origSetInterval:null,origRAF:null,pausedAnimations:[],frozenTimeoutQueue:[],frozenRAFQueue:[]}),r[ca]}var Ke=E0();typeof window<"u"&&!Ke.installed&&(Ke.origSetTimeout=window.setTimeout.bind(window),Ke.origSetInterval=window.setInterval.bind(window),Ke.origRAF=window.requestAnimationFrame.bind(window),window.setTimeout=(r,o,...s)=>typeof r=="string"?Ke.origSetTimeout(r,o):Ke.origSetTimeout((...c)=>{Ke.frozen?Ke.frozenTimeoutQueue.push(()=>r(...c)):r(...c)},o,...s),window.setInterval=(r,o,...s)=>typeof r=="string"?Ke.origSetInterval(r,o):Ke.origSetInterval((...c)=>{Ke.frozen||r(...c)},o,...s),window.requestAnimationFrame=r=>Ke.origRAF(o=>{Ke.frozen?Ke.frozenRAFQueue.push(r):r(o)}),Ke.installed=!0);var kr=Ke.origSetTimeout;Ke.origSetInterval;g.forwardRef(function({element:o,timestamp:s,selectedText:c,placeholder:d="What should change?",initialValue:f="",submitLabel:p="Add",onSubmit:_,onCancel:h,onDelete:v,style:y,accentColor:S="#3c82f7",isExiting:k=!1,lightMode:D=!1,computedStyles:R},x){const[b,j]=g.useState(f),[P,I]=g.useState(!1),[M,z]=g.useState("initial"),[G,Y]=g.useState(!1),[K,fe]=g.useState(!1),ue=g.useRef(null),he=g.useRef(null),pe=g.useRef(null),me=g.useRef(null);g.useEffect(()=>{k&&M!=="exit"&&z("exit")},[k,M]),g.useEffect(()=>{kr(()=>{z("enter")},0);const F=kr(()=>{z("entered")},200),V=kr(()=>{const E=ue.current;E&&(E.focus(),E.selectionStart=E.selectionEnd=E.value.length,E.scrollTop=E.scrollHeight)},50);return()=>{clearTimeout(F),clearTimeout(V),pe.current&&clearTimeout(pe.current),me.current&&clearTimeout(me.current)}},[]);const _e=g.useCallback(()=>{me.current&&clearTimeout(me.current),I(!0),me.current=kr(()=>{var F;I(!1),(F=ue.current)==null||F.focus()},250)},[]);g.useImperativeHandle(x,()=>({shake:_e}),[_e]);const xe=g.useCallback(()=>{z("exit"),pe.current=kr(()=>{h()},150)},[h]),ce=g.useCallback(()=>{b.trim()&&_(b.trim())},[b,_]),se=g.useCallback(F=>{F.nativeEvent.isComposing||(F.key==="Enter"&&!F.shiftKey&&(F.preventDefault(),ce()),F.key==="Escape"&&xe())},[ce,xe]),L=[De.popup,D?De.light:"",M==="enter"?De.enter:"",M==="entered"?De.entered:"",M==="exit"?De.exit:"",P?De.shake:""].filter(Boolean).join(" ");return u.jsxs("div",{ref:he,className:L,"data-annotation-popup":!0,style:y,onClick:F=>F.stopPropagation(),children:[u.jsxs("div",{className:De.header,children:[R&&Object.keys(R).length>0?u.jsxs("button",{className:De.headerToggle,onClick:()=>{const F=K;fe(!K),F&&kr(()=>{var V;return(V=ue.current)==null?void 0:V.focus()},0)},type:"button",children:[u.jsx("svg",{className:`${De.chevron} ${K?De.expanded:""}`,width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:u.jsx("path",{d:"M5.5 10.25L9 7.25L5.75 4",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})}),u.jsx("span",{className:De.element,children:o})]}):u.jsx("span",{className:De.element,children:o}),s&&u.jsx("span",{className:De.timestamp,children:s})]}),R&&Object.keys(R).length>0&&u.jsx("div",{className:`${De.stylesWrapper} ${K?De.expanded:""}`,children:u.jsx("div",{className:De.stylesInner,children:u.jsx("div",{className:De.stylesBlock,children:Object.entries(R).map(([F,V])=>u.jsxs("div",{className:De.styleLine,children:[u.jsx("span",{className:De.styleProperty,children:F.replace(/([A-Z])/g,"-$1").toLowerCase()}),": ",u.jsx("span",{className:De.styleValue,children:V}),";"]},F))})})}),c&&u.jsxs("div",{className:De.quote,children:["“",c.slice(0,80),c.length>80?"...":"","”"]}),u.jsx("textarea",{ref:ue,className:De.textarea,style:{borderColor:G?S:void 0},placeholder:d,value:b,onChange:F=>j(F.target.value),onFocus:()=>Y(!0),onBlur:()=>Y(!1),rows:2,onKeyDown:se}),u.jsxs("div",{className:De.actions,children:[v&&u.jsx("div",{className:De.deleteWrapper,children:u.jsx("button",{className:De.deleteButton,onClick:v,type:"button",children:u.jsx(k0,{size:22})})}),u.jsx("button",{className:De.cancel,onClick:xe,children:"Cancel"}),u.jsx("button",{className:De.submit,style:{backgroundColor:S,opacity:b.trim()?1:.4},onClick:ce,disabled:!b.trim(),children:p})]})]})});var N0=`svg[fill=none] {
  fill: none !important;
}

@keyframes styles-module__toolbarEnter___u8RRu {
  from {
    opacity: 0;
    transform: scale(0.5) rotate(90deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}
@keyframes styles-module__badgeEnter___mVQLj {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__scaleIn___c-r1K {
  from {
    opacity: 0;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__scaleOut___Wctwz {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.85);
  }
}
@keyframes styles-module__slideUp___kgD36 {
  from {
    opacity: 0;
    transform: scale(0.85) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
@keyframes styles-module__slideDown___zcdje {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.85) translateY(8px);
  }
}
@keyframes styles-module__markerIn___5FaAP {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.3);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
@keyframes styles-module__markerOut___GU5jX {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.3);
  }
}
@keyframes styles-module__fadeIn___b9qmf {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes styles-module__fadeOut___6Ut6- {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes styles-module__tooltipIn___0N31w {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(2px) scale(0.891);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(0.909);
  }
}
@keyframes styles-module__hoverHighlightIn___6WYHY {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__hoverTooltipIn___FYGQx {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(4px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
@keyframes styles-module__settingsPanelIn___MGfO8 {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
    filter: blur(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0px);
  }
}
@keyframes styles-module__settingsPanelOut___Zfymi {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0px);
  }
  to {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
    filter: blur(5px);
  }
}
.styles-module__toolbar___wNsdK {
  position: fixed;
  bottom: 1.25rem;
  right: 1.25rem;
  width: 297px;
  z-index: 100000;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  pointer-events: none;
  transition: left 0s, top 0s, right 0s, bottom 0s;
}

.styles-module__toolbarContainer___dIhma {
  user-select: none;
  margin-left: auto;
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
  color: #fff;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1);
  pointer-events: auto;
  cursor: grab;
  transition: width 0.4s cubic-bezier(0.19, 1, 0.22, 1), transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}
.styles-module__toolbarContainer___dIhma.styles-module__dragging___xrolZ {
  transition: width 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  cursor: grabbing;
}
.styles-module__toolbarContainer___dIhma.styles-module__entrance___sgHd8 {
  animation: styles-module__toolbarEnter___u8RRu 0.5s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
}
.styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn {
  width: 44px;
  height: 44px;
  border-radius: 22px;
  padding: 0;
  cursor: pointer;
}
.styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn svg {
  margin-top: -1px;
}
.styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn:hover {
  background: #2a2a2a;
}
.styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn:active {
  transform: scale(0.95);
}
.styles-module__toolbarContainer___dIhma.styles-module__expanded___ofKPx {
  height: 44px;
  border-radius: 1.5rem;
  padding: 0.375rem;
  width: 257px;
}
.styles-module__toolbarContainer___dIhma.styles-module__expanded___ofKPx.styles-module__serverConnected___Gfbou {
  width: 297px;
}

.styles-module__toggleContent___0yfyP {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.1s cubic-bezier(0.19, 1, 0.22, 1);
}
.styles-module__toggleContent___0yfyP.styles-module__visible___KHwEW {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}
.styles-module__toggleContent___0yfyP.styles-module__hidden___Ae8H4 {
  opacity: 0;
  pointer-events: none;
}

.styles-module__controlsContent___9GJWU {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  transition: filter 0.8s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1), transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
}
.styles-module__controlsContent___9GJWU.styles-module__visible___KHwEW {
  opacity: 1;
  filter: blur(0px);
  transform: scale(1);
  visibility: visible;
  pointer-events: auto;
}
.styles-module__controlsContent___9GJWU.styles-module__hidden___Ae8H4 {
  opacity: 0;
  filter: blur(10px);
  transform: scale(0.4);
}

.styles-module__badge___2XsgF {
  position: absolute;
  top: -13px;
  right: -13px;
  user-select: none;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background: #3c82f7;
  color: white;
  font-size: 0.625rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.04);
  opacity: 1;
  transition: transform 0.3s ease, opacity 0.2s ease;
  transform: scale(1);
}
.styles-module__badge___2XsgF.styles-module__fadeOut___6Ut6- {
  opacity: 0;
  transform: scale(0);
  pointer-events: none;
}
.styles-module__badge___2XsgF.styles-module__entrance___sgHd8 {
  animation: styles-module__badgeEnter___mVQLj 0.3s cubic-bezier(0.34, 1.2, 0.64, 1) 0.4s both;
}

.styles-module__controlButton___8Q0jc {
  position: relative;
  cursor: pointer !important;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  transition: background-color 0.15s ease, color 0.15s ease, transform 0.1s ease, opacity 0.2s ease;
}
.styles-module__controlButton___8Q0jc:hover:not(:disabled):not([data-active=true]):not([data-failed=true]):not([data-auto-sync=true]):not([data-error=true]):not([data-no-hover=true]) {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}
.styles-module__controlButton___8Q0jc:active:not(:disabled) {
  transform: scale(0.92);
}
.styles-module__controlButton___8Q0jc:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.styles-module__controlButton___8Q0jc[data-active=true] {
  color: #3c82f7;
  background: rgba(60, 130, 247, 0.25);
}
.styles-module__controlButton___8Q0jc[data-error=true] {
  color: #ff3b30;
  background: rgba(255, 59, 48, 0.25);
}
.styles-module__controlButton___8Q0jc[data-danger]:hover:not(:disabled):not([data-active=true]):not([data-failed=true]) {
  background: rgba(255, 59, 48, 0.25);
  color: #ff3b30;
}
.styles-module__controlButton___8Q0jc[data-no-hover=true], .styles-module__controlButton___8Q0jc.styles-module__statusShowing___te6iu {
  cursor: default !important;
  pointer-events: none;
  background: transparent !important;
}
.styles-module__controlButton___8Q0jc[data-auto-sync=true] {
  color: #34c759;
  background: transparent;
  cursor: default;
}
.styles-module__controlButton___8Q0jc[data-failed=true] {
  color: #ff3b30;
  background: rgba(255, 59, 48, 0.25);
}

.styles-module__buttonBadge___NeFWb {
  position: absolute;
  top: 0px;
  right: 0px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 8px;
  background: #3c82f7;
  color: white;
  font-size: 0.625rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 2px #1a1a1a, 0 1px 3px rgba(0, 0, 0, 0.2);
  pointer-events: none;
}
.styles-module__buttonBadge___NeFWb.styles-module__light___r6n4Y {
  box-shadow: 0 0 0 2px #fff, 0 1px 3px rgba(0, 0, 0, 0.2);
}

@keyframes styles-module__mcpIndicatorPulseConnected___EDodZ {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(52, 199, 89, 0.5);
  }
  50% {
    box-shadow: 0 0 0 5px rgba(52, 199, 89, 0);
  }
}
@keyframes styles-module__mcpIndicatorPulseConnecting___cCYte {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(245, 166, 35, 0.5);
  }
  50% {
    box-shadow: 0 0 0 5px rgba(245, 166, 35, 0);
  }
}
.styles-module__mcpIndicator___zGJeL {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  pointer-events: none;
  transition: background 0.3s ease, opacity 0.15s ease, transform 0.15s ease;
  opacity: 1;
  transform: scale(1);
}
.styles-module__mcpIndicator___zGJeL.styles-module__connected___7c28g {
  background: #34c759;
  animation: styles-module__mcpIndicatorPulseConnected___EDodZ 2.5s ease-in-out infinite;
}
.styles-module__mcpIndicator___zGJeL.styles-module__connecting___uo-CW {
  background: #f5a623;
  animation: styles-module__mcpIndicatorPulseConnecting___cCYte 1.5s ease-in-out infinite;
}
.styles-module__mcpIndicator___zGJeL.styles-module__hidden___Ae8H4 {
  opacity: 0;
  transform: scale(0);
  animation: none;
}

@keyframes styles-module__connectionPulse___-Zycw {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.9);
  }
}
.styles-module__connectionIndicatorWrapper___L-e-3 {
  width: 8px;
  height: 34px;
  margin-left: 6px;
  margin-right: 6px;
}

.styles-module__connectionIndicator___afk9p {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease, background 0.3s ease;
  cursor: default;
}

.styles-module__connectionIndicatorVisible___C-i5B {
  opacity: 1;
}

.styles-module__connectionIndicatorConnected___IY8pR {
  background: #34c759;
  animation: styles-module__connectionPulse___-Zycw 2.5s ease-in-out infinite;
}

.styles-module__connectionIndicatorDisconnected___kmpaZ {
  background: #ff3b30;
  animation: none;
}

.styles-module__connectionIndicatorConnecting___QmSLH {
  background: #f59e0b;
  animation: styles-module__connectionPulse___-Zycw 1s ease-in-out infinite;
}

.styles-module__buttonWrapper___rBcdv {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.styles-module__buttonWrapper___rBcdv:hover .styles-module__buttonTooltip___Burd9 {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) scale(1);
  transition-delay: 0.85s;
}
.styles-module__buttonWrapper___rBcdv:has(.styles-module__controlButton___8Q0jc:disabled):hover .styles-module__buttonTooltip___Burd9 {
  opacity: 0;
  visibility: hidden;
}

.styles-module__sendButtonWrapper___UUxG6 {
  width: 0;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  margin-left: -0.375rem;
  transition: width 0.4s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s cubic-bezier(0.19, 1, 0.22, 1), margin 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}
.styles-module__sendButtonWrapper___UUxG6 .styles-module__controlButton___8Q0jc {
  transform: scale(0.8);
  transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}
.styles-module__sendButtonWrapper___UUxG6.styles-module__sendButtonVisible___WPSQU {
  width: 34px;
  opacity: 1;
  overflow: visible;
  pointer-events: auto;
  margin-left: 0;
}
.styles-module__sendButtonWrapper___UUxG6.styles-module__sendButtonVisible___WPSQU .styles-module__controlButton___8Q0jc {
  transform: scale(1);
}

.styles-module__buttonTooltip___Burd9 {
  position: absolute;
  bottom: calc(100% + 14px);
  left: 50%;
  transform: translateX(-50%) scale(0.95);
  padding: 6px 10px;
  background: #1a1a1a;
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  font-weight: 500;
  border-radius: 8px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 100001;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: opacity 0.135s ease, transform 0.135s ease, visibility 0.135s ease;
}
.styles-module__buttonTooltip___Burd9::after {
  content: "";
  position: absolute;
  top: calc(100% - 4px);
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 8px;
  height: 8px;
  background: #1a1a1a;
  border-radius: 0 0 2px 0;
}

.styles-module__shortcut___lEAQk {
  margin-left: 4px;
  opacity: 0.5;
}

.styles-module__tooltipBelow___m6ats .styles-module__buttonTooltip___Burd9 {
  bottom: auto;
  top: calc(100% + 14px);
  transform: translateX(-50%) scale(0.95);
}
.styles-module__tooltipBelow___m6ats .styles-module__buttonTooltip___Burd9::after {
  top: -4px;
  bottom: auto;
  border-radius: 2px 0 0 0;
}

.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapper___rBcdv:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(-50%) scale(1);
}

.styles-module__tooltipsHidden___VtLJG .styles-module__buttonTooltip___Burd9 {
  opacity: 0 !important;
  visibility: hidden !important;
  transition: none !important;
}

.styles-module__tooltipVisible___0jcCv,
.styles-module__tooltipsHidden___VtLJG .styles-module__tooltipVisible___0jcCv {
  opacity: 1 !important;
  visibility: visible !important;
  transform: translateX(-50%) scale(1) !important;
  transition-delay: 0s !important;
}

.styles-module__buttonWrapperAlignLeft___myzIp .styles-module__buttonTooltip___Burd9 {
  left: 50%;
  transform: translateX(-12px) scale(0.95);
}
.styles-module__buttonWrapperAlignLeft___myzIp .styles-module__buttonTooltip___Burd9::after {
  left: 16px;
}
.styles-module__buttonWrapperAlignLeft___myzIp:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(-12px) scale(1);
}

.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapperAlignLeft___myzIp .styles-module__buttonTooltip___Burd9 {
  transform: translateX(-12px) scale(0.95);
}
.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapperAlignLeft___myzIp:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(-12px) scale(1);
}

.styles-module__buttonWrapperAlignRight___HCQFR .styles-module__buttonTooltip___Burd9 {
  left: 50%;
  transform: translateX(calc(-100% + 12px)) scale(0.95);
}
.styles-module__buttonWrapperAlignRight___HCQFR .styles-module__buttonTooltip___Burd9::after {
  left: auto;
  right: 8px;
}
.styles-module__buttonWrapperAlignRight___HCQFR:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(calc(-100% + 12px)) scale(1);
}

.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapperAlignRight___HCQFR .styles-module__buttonTooltip___Burd9 {
  transform: translateX(calc(-100% + 12px)) scale(0.95);
}
.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapperAlignRight___HCQFR:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(calc(-100% + 12px)) scale(1);
}

.styles-module__divider___c--s1 {
  width: 1px;
  height: 12px;
  background: rgba(255, 255, 255, 0.15);
  margin: 0 0.125rem;
}

.styles-module__overlay___Q1O9y {
  position: fixed;
  inset: 0;
  z-index: 99997;
  pointer-events: none;
}
.styles-module__overlay___Q1O9y > * {
  pointer-events: auto;
}

.styles-module__hoverHighlight___ogakW {
  position: fixed;
  border: 2px solid rgba(60, 130, 247, 0.5);
  border-radius: 4px;
  pointer-events: none !important;
  background: rgba(60, 130, 247, 0.04);
  box-sizing: border-box;
  will-change: opacity;
  contain: layout style;
}
.styles-module__hoverHighlight___ogakW.styles-module__enter___WFIki {
  animation: styles-module__hoverHighlightIn___6WYHY 0.12s ease-out forwards;
}

.styles-module__multiSelectOutline___cSJ-m {
  position: fixed;
  border: 2px dashed rgba(52, 199, 89, 0.6);
  border-radius: 4px;
  pointer-events: none !important;
  background: rgba(52, 199, 89, 0.05);
  box-sizing: border-box;
  will-change: opacity;
}
.styles-module__multiSelectOutline___cSJ-m.styles-module__enter___WFIki {
  animation: styles-module__fadeIn___b9qmf 0.15s ease-out forwards;
}
.styles-module__multiSelectOutline___cSJ-m.styles-module__exit___fyOJ0 {
  animation: styles-module__fadeOut___6Ut6- 0.15s ease-out forwards;
}

.styles-module__singleSelectOutline___QhX-O {
  position: fixed;
  border: 2px solid rgba(60, 130, 247, 0.6);
  border-radius: 4px;
  pointer-events: none !important;
  background: rgba(60, 130, 247, 0.05);
  box-sizing: border-box;
  will-change: opacity;
}
.styles-module__singleSelectOutline___QhX-O.styles-module__enter___WFIki {
  animation: styles-module__fadeIn___b9qmf 0.15s ease-out forwards;
}
.styles-module__singleSelectOutline___QhX-O.styles-module__exit___fyOJ0 {
  animation: styles-module__fadeOut___6Ut6- 0.15s ease-out forwards;
}

.styles-module__hoverTooltip___bvLk7 {
  position: fixed;
  font-size: 0.6875rem;
  font-weight: 500;
  color: #fff;
  background: rgba(0, 0, 0, 0.85);
  padding: 0.35rem 0.6rem;
  border-radius: 0.375rem;
  pointer-events: none !important;
  white-space: nowrap;
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.styles-module__hoverTooltip___bvLk7.styles-module__enter___WFIki {
  animation: styles-module__hoverTooltipIn___FYGQx 0.1s ease-out forwards;
}

.styles-module__hoverReactPath___gx1IJ {
  font-size: 0.625rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.15rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.styles-module__hoverElementName___QMLMl {
  overflow: hidden;
  text-overflow: ellipsis;
}

.styles-module__markersLayer___-25j1 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0;
  z-index: 99998;
  pointer-events: none;
}
.styles-module__markersLayer___-25j1 > * {
  pointer-events: auto;
}

.styles-module__fixedMarkersLayer___ffyX6 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99998;
  pointer-events: none;
}
.styles-module__fixedMarkersLayer___ffyX6 > * {
  pointer-events: auto;
}

.styles-module__marker___6sQrs {
  position: absolute;
  width: 22px;
  height: 22px;
  background: #3c82f7;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: 600;
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(0, 0, 0, 0.04);
  user-select: none;
  will-change: transform, opacity;
  contain: layout style;
  z-index: 1;
}
.styles-module__marker___6sQrs:hover {
  z-index: 2;
}
.styles-module__marker___6sQrs:not(.styles-module__enter___WFIki):not(.styles-module__exit___fyOJ0):not(.styles-module__clearing___FQ--7) {
  transition: background-color 0.15s ease, transform 0.1s ease;
}
.styles-module__marker___6sQrs.styles-module__enter___WFIki {
  animation: styles-module__markerIn___5FaAP 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.styles-module__marker___6sQrs.styles-module__exit___fyOJ0 {
  animation: styles-module__markerOut___GU5jX 0.2s ease-out both;
  pointer-events: none;
}
.styles-module__marker___6sQrs.styles-module__clearing___FQ--7 {
  animation: styles-module__markerOut___GU5jX 0.15s ease-out both;
  pointer-events: none;
}
.styles-module__marker___6sQrs:not(.styles-module__enter___WFIki):not(.styles-module__exit___fyOJ0):not(.styles-module__clearing___FQ--7):hover {
  transform: translate(-50%, -50%) scale(1.1);
}
.styles-module__marker___6sQrs.styles-module__pending___2IHLC {
  position: fixed;
  background: #3c82f7;
}
.styles-module__marker___6sQrs.styles-module__fixed___dBMHC {
  position: fixed;
}
.styles-module__marker___6sQrs.styles-module__multiSelect___YWiuz {
  background: #34c759;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  font-size: 0.75rem;
}
.styles-module__marker___6sQrs.styles-module__multiSelect___YWiuz.styles-module__pending___2IHLC {
  background: #34c759;
}
.styles-module__marker___6sQrs.styles-module__hovered___ZgXIy {
  background: #ff3b30;
}

.styles-module__renumber___nCTxD {
  display: block;
  animation: styles-module__renumberRoll___Wgbq3 0.2s ease-out;
}

@keyframes styles-module__renumberRoll___Wgbq3 {
  0% {
    transform: translateX(-40%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
.styles-module__markerTooltip___aLJID {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) scale(0.909);
  z-index: 100002;
  background: #1a1a1a;
  padding: 8px 0.75rem;
  border-radius: 0.75rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-weight: 400;
  color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
  min-width: 120px;
  max-width: 200px;
  pointer-events: none;
  cursor: default;
}
.styles-module__markerTooltip___aLJID.styles-module__enter___WFIki {
  animation: styles-module__tooltipIn___0N31w 0.1s ease-out forwards;
}

.styles-module__markerQuote___FHmrz {
  display: block;
  font-size: 12px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.3125rem;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.styles-module__markerNote___QkrrS {
  display: block;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 2px;
}

.styles-module__markerHint___2iF-6 {
  display: block;
  font-size: 0.625rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 0.375rem;
  white-space: nowrap;
}

.styles-module__settingsPanel___OxX3Y {
  position: absolute;
  right: 5px;
  bottom: calc(100% + 0.5rem);
  z-index: 1;
  overflow: hidden;
  background: #1c1c1c;
  border-radius: 1rem;
  padding: 13px 0 16px;
  min-width: 205px;
  cursor: default;
  opacity: 1;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.04);
  transition: background 0.25s ease, box-shadow 0.25s ease;
}
.styles-module__settingsPanel___OxX3Y::before, .styles-module__settingsPanel___OxX3Y::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 16px;
  z-index: 2;
  pointer-events: none;
}
.styles-module__settingsPanel___OxX3Y::before {
  left: 0;
  background: linear-gradient(to right, #1c1c1c 0%, transparent 100%);
}
.styles-module__settingsPanel___OxX3Y::after {
  right: 0;
  background: linear-gradient(to left, #1c1c1c 0%, transparent 100%);
}
.styles-module__settingsPanel___OxX3Y .styles-module__settingsHeader___pwDY9,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsBrand___0gJeM,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsBrandSlash___uTG18,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsVersion___TUcFq,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsSection___m-YM2,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsLabel___8UjfX,
.styles-module__settingsPanel___OxX3Y .styles-module__cycleButton___FMKfw,
.styles-module__settingsPanel___OxX3Y .styles-module__cycleDot___nPgLY,
.styles-module__settingsPanel___OxX3Y .styles-module__dropdownButton___16NPz,
.styles-module__settingsPanel___OxX3Y .styles-module__toggleLabel___Xm8Aa,
.styles-module__settingsPanel___OxX3Y .styles-module__customCheckbox___U39ax,
.styles-module__settingsPanel___OxX3Y .styles-module__sliderLabel___U8sPr,
.styles-module__settingsPanel___OxX3Y .styles-module__slider___GLdxp,
.styles-module__settingsPanel___OxX3Y .styles-module__helpIcon___xQg56,
.styles-module__settingsPanel___OxX3Y .styles-module__themeToggle___2rUjA {
  transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}
.styles-module__settingsPanel___OxX3Y.styles-module__enter___WFIki {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0px);
  transition: opacity 0.2s ease, transform 0.2s ease, filter 0.2s ease;
}
.styles-module__settingsPanel___OxX3Y.styles-module__exit___fyOJ0 {
  opacity: 0;
  transform: translateY(8px) scale(0.95);
  filter: blur(5px);
  pointer-events: none;
  transition: opacity 0.1s ease, transform 0.1s ease, filter 0.1s ease;
}
.styles-module__settingsPanel___OxX3Y.styles-module__dark___ILIQf {
  background: #1a1a1a;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
}
.styles-module__settingsPanel___OxX3Y.styles-module__dark___ILIQf .styles-module__settingsLabel___8UjfX {
  color: rgba(255, 255, 255, 0.6);
}
.styles-module__settingsPanel___OxX3Y.styles-module__dark___ILIQf .styles-module__settingsOption___UNa12 {
  color: rgba(255, 255, 255, 0.85);
}
.styles-module__settingsPanel___OxX3Y.styles-module__dark___ILIQf .styles-module__settingsOption___UNa12:hover {
  background: rgba(255, 255, 255, 0.1);
}
.styles-module__settingsPanel___OxX3Y.styles-module__dark___ILIQf .styles-module__settingsOption___UNa12.styles-module__selected___OwRqP {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}
.styles-module__settingsPanel___OxX3Y.styles-module__dark___ILIQf .styles-module__toggleLabel___Xm8Aa {
  color: rgba(255, 255, 255, 0.85);
}

.styles-module__settingsPanelContainer___Xksv8 {
  overflow: visible;
  position: relative;
  display: flex;
  padding: 0 1rem;
}
.styles-module__settingsPanelContainer___Xksv8.styles-module__transitioning___qxzCk {
  overflow-x: clip;
  overflow-y: visible;
}

.styles-module__settingsPage___6YfHH {
  min-width: 100%;
  flex-shrink: 0;
  transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.2s ease-out;
  opacity: 1;
}

.styles-module__settingsPage___6YfHH.styles-module__slideLeft___Ps01J {
  transform: translateX(-100%);
  opacity: 0;
}

.styles-module__automationsPage___uvCq6 {
  position: absolute;
  top: 0;
  left: 100%;
  width: 100%;
  height: 100%;
  padding: 3px 1rem 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.25s ease-out 0.1s;
  opacity: 0;
}

.styles-module__automationsPage___uvCq6.styles-module__slideIn___4-qXe {
  transform: translateX(-100%);
  opacity: 1;
}

.styles-module__settingsNavLink___wCzJt {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: color 0.15s ease;
}
.styles-module__settingsNavLink___wCzJt:hover {
  color: rgba(255, 255, 255, 0.9);
}
.styles-module__settingsNavLink___wCzJt.styles-module__light___r6n4Y {
  color: rgba(0, 0, 0, 0.5);
}
.styles-module__settingsNavLink___wCzJt.styles-module__light___r6n4Y:hover {
  color: rgba(0, 0, 0, 0.8);
}
.styles-module__settingsNavLink___wCzJt svg {
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.15s ease;
}
.styles-module__settingsNavLink___wCzJt:hover svg {
  color: #fff;
}
.styles-module__settingsNavLink___wCzJt.styles-module__light___r6n4Y svg {
  color: rgba(0, 0, 0, 0.25);
}
.styles-module__settingsNavLink___wCzJt.styles-module__light___r6n4Y:hover svg {
  color: rgba(0, 0, 0, 0.8);
}

.styles-module__settingsNavLinkRight___ZWwhj {
  display: flex;
  align-items: center;
  gap: 6px;
}

.styles-module__mcpNavIndicator___cl9pO {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.styles-module__mcpNavIndicator___cl9pO.styles-module__connected___7c28g {
  background: #34c759;
  animation: styles-module__mcpPulse___uNggr 2.5s ease-in-out infinite;
}
.styles-module__mcpNavIndicator___cl9pO.styles-module__connecting___uo-CW {
  background: #f5a623;
  animation: styles-module__mcpPulse___uNggr 1.5s ease-in-out infinite;
}

.styles-module__settingsBackButton___bIe2j {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 0 12px 0;
  margin: -6px 0 0.5rem 0;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 0;
  background: transparent;
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: -0.15px;
  color: #fff;
  cursor: pointer;
  transition: transform 0.12s cubic-bezier(0.32, 0.72, 0, 1);
}
.styles-module__settingsBackButton___bIe2j svg {
  opacity: 0.4;
  flex-shrink: 0;
  transition: opacity 0.15s ease, transform 0.18s cubic-bezier(0.32, 0.72, 0, 1);
}
.styles-module__settingsBackButton___bIe2j:hover svg {
  opacity: 1;
}
.styles-module__settingsBackButton___bIe2j.styles-module__light___r6n4Y {
  color: rgba(0, 0, 0, 0.85);
  border-bottom-color: rgba(0, 0, 0, 0.08);
}

.styles-module__automationHeader___InP0r {
  display: flex;
  align-items: center;
  gap: 0.125rem;
  font-size: 0.8125rem;
  font-weight: 400;
  color: #fff;
}
.styles-module__automationHeader___InP0r .styles-module__helpIcon___xQg56 svg {
  transform: none;
}
.styles-module__automationHeader___InP0r.styles-module__light___r6n4Y {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__automationDescription___NKlmo {
  font-size: 0.6875rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
  line-height: 14px;
}
.styles-module__automationDescription___NKlmo.styles-module__light___r6n4Y {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__learnMoreLink___8xv-x {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: underline dotted;
  text-decoration-color: rgba(255, 255, 255, 0.2);
  text-underline-offset: 2px;
  transition: color 0.15s ease;
}
.styles-module__learnMoreLink___8xv-x:hover {
  color: #fff;
}
.styles-module__learnMoreLink___8xv-x.styles-module__light___r6n4Y {
  color: rgba(0, 0, 0, 0.6);
  text-decoration-color: rgba(0, 0, 0, 0.2);
}
.styles-module__learnMoreLink___8xv-x.styles-module__light___r6n4Y:hover {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__autoSendRow___UblX5 {
  display: flex;
  align-items: center;
  gap: 8px;
}

.styles-module__autoSendLabel___icDc2 {
  font-size: 0.6875rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.15s ease;
}
.styles-module__autoSendLabel___icDc2.styles-module__active___-zoN6 {
  color: #66b8ff;
}
.styles-module__autoSendLabel___icDc2.styles-module__light___r6n4Y {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__autoSendLabel___icDc2.styles-module__light___r6n4Y.styles-module__active___-zoN6 {
  color: #3c82f7;
}

.styles-module__webhookUrlInput___2375C {
  display: block;
  width: 100%;
  flex: 1;
  min-height: 60px;
  box-sizing: border-box;
  margin-top: 11px;
  padding: 8px 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.03);
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 400;
  color: #fff;
  outline: none;
  resize: none;
  cursor: text !important;
  user-select: text;
  transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
}
.styles-module__webhookUrlInput___2375C::placeholder {
  color: rgba(255, 255, 255, 0.3);
}
.styles-module__webhookUrlInput___2375C:focus {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.08);
}
.styles-module__webhookUrlInput___2375C.styles-module__light___r6n4Y {
  border-color: rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.03);
  color: rgba(0, 0, 0, 0.85);
}
.styles-module__webhookUrlInput___2375C.styles-module__light___r6n4Y::placeholder {
  color: rgba(0, 0, 0, 0.3);
}
.styles-module__webhookUrlInput___2375C.styles-module__light___r6n4Y:focus {
  border-color: rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.05);
}

.styles-module__settingsHeader___pwDY9 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 24px;
  margin-bottom: 0.5rem;
  padding-bottom: 9px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.styles-module__settingsBrand___0gJeM {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: -0.0094em;
  color: #fff;
}

.styles-module__settingsBrandSlash___uTG18 {
  color: rgba(255, 255, 255, 0.5);
}

.styles-module__settingsVersion___TUcFq {
  font-size: 11px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  margin-left: auto;
  letter-spacing: -0.0094em;
}

.styles-module__settingsSection___m-YM2 + .styles-module__settingsSection___m-YM2 {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}
.styles-module__settingsSection___m-YM2.styles-module__settingsSectionExtraPadding___jdhFV {
  padding-top: calc(0.5rem + 4px);
}

.styles-module__settingsSectionGrow___h-5HZ {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.styles-module__settingsRow___3sdhc {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 24px;
}
.styles-module__settingsRow___3sdhc.styles-module__settingsRowMarginTop___zA0Sp {
  margin-top: 8px;
}

.styles-module__dropdownContainer___BVnxe {
  position: relative;
}

.styles-module__dropdownButton___16NPz {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
  letter-spacing: -0.0094em;
}
.styles-module__dropdownButton___16NPz:hover {
  background: rgba(255, 255, 255, 0.08);
}
.styles-module__dropdownButton___16NPz svg {
  opacity: 0.6;
}

.styles-module__cycleButton___FMKfw {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
  border: none;
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  letter-spacing: -0.0094em;
}
.styles-module__cycleButton___FMKfw.styles-module__light___r6n4Y {
  color: rgba(0, 0, 0, 0.85);
}
.styles-module__cycleButton___FMKfw:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.styles-module__settingsRowDisabled___EgS0V .styles-module__settingsLabel___8UjfX {
  color: rgba(255, 255, 255, 0.2);
}
.styles-module__settingsRowDisabled___EgS0V .styles-module__settingsLabel___8UjfX.styles-module__light___r6n4Y {
  color: rgba(0, 0, 0, 0.2);
}
.styles-module__settingsRowDisabled___EgS0V .styles-module__toggleSwitch___l4Ygm {
  opacity: 0.4;
  cursor: not-allowed;
}

@keyframes styles-module__cycleTextIn___Q6zJf {
  0% {
    opacity: 0;
    transform: translateY(-6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.styles-module__cycleButtonText___fD1LR {
  display: inline-block;
  animation: styles-module__cycleTextIn___Q6zJf 0.2s ease-out;
}

.styles-module__cycleDots___LWuoQ {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.styles-module__cycleDot___nPgLY {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0.667);
  transition: background-color 0.25s ease-out, transform 0.25s ease-out;
}
.styles-module__cycleDot___nPgLY.styles-module__active___-zoN6 {
  background: #fff;
  transform: scale(1);
}
.styles-module__cycleDot___nPgLY.styles-module__light___r6n4Y {
  background: rgba(0, 0, 0, 0.2);
}
.styles-module__cycleDot___nPgLY.styles-module__light___r6n4Y.styles-module__active___-zoN6 {
  background: rgba(0, 0, 0, 0.7);
}

.styles-module__dropdownMenu___k73ER {
  position: absolute;
  right: 0;
  top: calc(100% + 0.25rem);
  background: #1a1a1a;
  border-radius: 0.5rem;
  padding: 0.25rem;
  min-width: 120px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);
  z-index: 10;
  animation: styles-module__scaleIn___c-r1K 0.15s ease-out;
}

.styles-module__dropdownItem___ylsLj {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.625rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  text-align: left;
  transition: background-color 0.15s ease, color 0.15s ease;
  letter-spacing: -0.0094em;
}
.styles-module__dropdownItem___ylsLj:hover {
  background: rgba(255, 255, 255, 0.08);
}
.styles-module__dropdownItem___ylsLj.styles-module__selected___OwRqP {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-weight: 600;
}

.styles-module__settingsLabel___8UjfX {
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: -0.0094em;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  gap: 0.125rem;
}
.styles-module__settingsLabel___8UjfX.styles-module__light___r6n4Y {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__settingsLabelMarker___ewdtV {
  padding-top: 3px;
  margin-bottom: 10px;
}

.styles-module__settingsOptions___LyrBA {
  display: flex;
  gap: 0.25rem;
}

.styles-module__settingsOption___UNa12 {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.375rem 0.5rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  font-size: 0.6875rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.styles-module__settingsOption___UNa12:hover {
  background: rgba(0, 0, 0, 0.05);
}
.styles-module__settingsOption___UNa12.styles-module__selected___OwRqP {
  background: rgba(60, 130, 247, 0.15);
  color: #3c82f7;
}

.styles-module__sliderContainer___ducXj {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.styles-module__slider___GLdxp {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}
.styles-module__slider___GLdxp::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
.styles-module__slider___GLdxp::-moz-range-thumb {
  width: 14px;
  height: 14px;
  background: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
.styles-module__slider___GLdxp:hover::-webkit-slider-thumb {
  transform: scale(1.15);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}
.styles-module__slider___GLdxp:hover::-moz-range-thumb {
  transform: scale(1.15);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

.styles-module__sliderLabels___FhLDB {
  display: flex;
  justify-content: space-between;
}

.styles-module__sliderLabel___U8sPr {
  font-size: 0.625rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: color 0.15s ease;
}
.styles-module__sliderLabel___U8sPr:hover {
  color: rgba(255, 255, 255, 0.7);
}
.styles-module__sliderLabel___U8sPr.styles-module__active___-zoN6 {
  color: rgba(255, 255, 255, 0.9);
}

.styles-module__colorOptions___iHCNX {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.375rem;
  margin-bottom: 1px;
}

.styles-module__colorOption___IodiY {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
}
.styles-module__colorOption___IodiY:hover {
  transform: scale(1.15);
}
.styles-module__colorOption___IodiY.styles-module__selected___OwRqP {
  transform: scale(0.83);
}

.styles-module__colorOptionRing___U2xpo {
  display: flex;
  width: 24px;
  height: 24px;
  border: 2px solid transparent;
  border-radius: 50%;
  transition: border-color 0.3s ease;
}
.styles-module__settingsToggle___fBrFn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
.styles-module__settingsToggle___fBrFn + .styles-module__settingsToggle___fBrFn {
  margin-top: calc(0.5rem + 6px);
}
.styles-module__settingsToggle___fBrFn input[type=checkbox] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.styles-module__settingsToggle___fBrFn.styles-module__settingsToggleMarginBottom___MZUyF {
  margin-bottom: calc(0.5rem + 6px);
}

.styles-module__customCheckbox___U39ax {
  position: relative;
  width: 14px;
  height: 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.25s ease, border-color 0.25s ease;
}
.styles-module__customCheckbox___U39ax svg {
  color: #1a1a1a;
  opacity: 1;
  transition: opacity 0.15s ease;
}
input[type=checkbox]:checked + .styles-module__customCheckbox___U39ax {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgb(255, 255, 255);
}
.styles-module__customCheckbox___U39ax.styles-module__light___r6n4Y {
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: #fff;
}
.styles-module__customCheckbox___U39ax.styles-module__light___r6n4Y.styles-module__checked___mnZLo {
  border-color: #1a1a1a;
  background: #1a1a1a;
}
.styles-module__customCheckbox___U39ax.styles-module__light___r6n4Y.styles-module__checked___mnZLo svg {
  color: #fff;
}

.styles-module__toggleLabel___Xm8Aa {
  font-size: 0.8125rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: -0.0094em;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.styles-module__toggleLabel___Xm8Aa.styles-module__light___r6n4Y {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__toggleSwitch___l4Ygm {
  position: relative;
  display: inline-block;
  width: 24px;
  height: 16px;
  flex-shrink: 0;
  cursor: pointer;
  transition: opacity 0.15s ease;
}
.styles-module__toggleSwitch___l4Ygm input {
  opacity: 0;
  width: 0;
  height: 0;
}
.styles-module__toggleSwitch___l4Ygm input:checked + .styles-module__toggleSlider___wprIn {
  background: #3c82f7;
}
.styles-module__toggleSwitch___l4Ygm input:checked + .styles-module__toggleSlider___wprIn::before {
  transform: translateX(8px);
}
.styles-module__toggleSwitch___l4Ygm.styles-module__disabled___332Jw {
  opacity: 0.4;
  pointer-events: none;
}
.styles-module__toggleSwitch___l4Ygm.styles-module__disabled___332Jw .styles-module__toggleSlider___wprIn {
  cursor: not-allowed;
}

.styles-module__toggleSlider___wprIn {
  position: absolute;
  cursor: pointer;
  inset: 0;
  border-radius: 16px;
  background: #484848;
}
.styles-module__light___r6n4Y .styles-module__toggleSlider___wprIn {
  background: #dddddd;
}
.styles-module__toggleSlider___wprIn::before {
  content: "";
  position: absolute;
  height: 12px;
  width: 12px;
  left: 2px;
  bottom: 2px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

@keyframes styles-module__mcpPulse___uNggr {
  0% {
    box-shadow: 0 0 0 0 rgba(52, 199, 89, 0.5);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(52, 199, 89, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(52, 199, 89, 0);
  }
}
@keyframes styles-module__mcpPulseError___fov9B {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 59, 48, 0.5);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(255, 59, 48, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 59, 48, 0);
  }
}
.styles-module__mcpStatusDot___ibgkc {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.styles-module__mcpStatusDot___ibgkc.styles-module__connecting___uo-CW {
  background: #f5a623;
  animation: styles-module__mcpPulse___uNggr 1.5s infinite;
}
.styles-module__mcpStatusDot___ibgkc.styles-module__connected___7c28g {
  background: #34c759;
  animation: styles-module__mcpPulse___uNggr 2.5s ease-in-out infinite;
}
.styles-module__mcpStatusDot___ibgkc.styles-module__disconnected___cHPxR {
  background: #ff3b30;
  animation: styles-module__mcpPulseError___fov9B 2s infinite;
}

.styles-module__helpIcon___xQg56 {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: help;
  margin-left: 0;
}
.styles-module__helpIcon___xQg56 svg {
  display: block;
  transform: translateY(1px);
  color: rgba(255, 255, 255, 0.2);
  transition: color 0.15s ease;
}
.styles-module__helpIcon___xQg56:hover svg {
  color: rgba(255, 255, 255, 0.5);
}
.styles-module__helpIcon___xQg56.styles-module__helpIconNudgeDown___0cqpM svg {
  transform: translateY(1px);
}
.styles-module__helpIcon___xQg56.styles-module__helpIconNoNudge___abogC svg {
  transform: translateY(0.5px);
}
.styles-module__helpIcon___xQg56.styles-module__helpIconNudge1-5___DM2TQ svg {
  transform: translateY(1.5px);
}
.styles-module__helpIcon___xQg56.styles-module__helpIconNudge2___TfWgC svg {
  transform: translateY(2px);
}

.styles-module__dragSelection___kZLq2 {
  position: fixed;
  top: 0;
  left: 0;
  border: 2px solid rgba(52, 199, 89, 0.6);
  border-radius: 4px;
  background: rgba(52, 199, 89, 0.08);
  pointer-events: none;
  z-index: 99997;
  will-change: transform, width, height;
  contain: layout style;
}

.styles-module__dragCount___KM90j {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #34c759;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  min-width: 1.5rem;
  text-align: center;
}

.styles-module__highlightsContainer___-0xzG {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 99996;
}

.styles-module__selectedElementHighlight___fyVlI {
  position: fixed;
  top: 0;
  left: 0;
  border: 2px solid rgba(52, 199, 89, 0.5);
  border-radius: 4px;
  background: rgba(52, 199, 89, 0.06);
  pointer-events: none;
  will-change: transform, width, height;
  contain: layout style;
}

.styles-module__light___r6n4Y.styles-module__toolbarContainer___dIhma {
  background: #fff;
  color: rgba(0, 0, 0, 0.85);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
}
.styles-module__light___r6n4Y.styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn:hover {
  background: #f5f5f5;
}
.styles-module__light___r6n4Y.styles-module__controlButton___8Q0jc {
  color: rgba(0, 0, 0, 0.5);
}
.styles-module__light___r6n4Y.styles-module__controlButton___8Q0jc:hover:not(:disabled):not([data-active=true]):not([data-failed=true]):not([data-auto-sync=true]):not([data-error=true]):not([data-no-hover=true]) {
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.85);
}
.styles-module__light___r6n4Y.styles-module__controlButton___8Q0jc[data-active=true] {
  color: #3c82f7;
  background: rgba(60, 130, 247, 0.15);
}
.styles-module__light___r6n4Y.styles-module__controlButton___8Q0jc[data-error=true] {
  color: #ff3b30;
  background: rgba(255, 59, 48, 0.15);
}
.styles-module__light___r6n4Y.styles-module__controlButton___8Q0jc[data-danger]:hover:not(:disabled):not([data-active=true]):not([data-failed=true]) {
  background: rgba(255, 59, 48, 0.15);
  color: #ff3b30;
}
.styles-module__light___r6n4Y.styles-module__controlButton___8Q0jc[data-auto-sync=true] {
  color: #34c759;
  background: transparent;
}
.styles-module__light___r6n4Y.styles-module__controlButton___8Q0jc[data-failed=true] {
  color: #ff3b30;
  background: rgba(255, 59, 48, 0.15);
}
.styles-module__light___r6n4Y.styles-module__buttonTooltip___Burd9 {
  background: #fff;
  color: rgba(0, 0, 0, 0.85);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
}
.styles-module__light___r6n4Y.styles-module__buttonTooltip___Burd9::after {
  background: #fff;
}
.styles-module__light___r6n4Y.styles-module__divider___c--s1 {
  background: rgba(0, 0, 0, 0.1);
}
.styles-module__light___r6n4Y.styles-module__markerTooltip___aLJID {
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06);
}
.styles-module__light___r6n4Y.styles-module__markerTooltip___aLJID .styles-module__markerQuote___FHmrz {
  color: rgba(0, 0, 0, 0.5);
}
.styles-module__light___r6n4Y.styles-module__markerTooltip___aLJID .styles-module__markerNote___QkrrS {
  color: rgba(0, 0, 0, 0.85);
}
.styles-module__light___r6n4Y.styles-module__markerTooltip___aLJID .styles-module__markerHint___2iF-6 {
  color: rgba(0, 0, 0, 0.35);
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y::before {
  background: linear-gradient(to right, #fff 0%, transparent 100%);
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y::after {
  background: linear-gradient(to left, #fff 0%, transparent 100%);
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y .styles-module__settingsHeader___pwDY9 {
  border-bottom-color: rgba(0, 0, 0, 0.08);
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y .styles-module__settingsBrand___0gJeM {
  color: rgba(0, 0, 0, 0.85);
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y .styles-module__settingsBrandSlash___uTG18 {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y .styles-module__settingsVersion___TUcFq {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y .styles-module__settingsSection___m-YM2 {
  border-top-color: rgba(0, 0, 0, 0.08);
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y .styles-module__settingsLabel___8UjfX {
  color: rgba(0, 0, 0, 0.5);
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y .styles-module__cycleButton___FMKfw {
  color: rgba(0, 0, 0, 0.85);
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y .styles-module__cycleDot___nPgLY {
  background: rgba(0, 0, 0, 0.2);
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y .styles-module__cycleDot___nPgLY.styles-module__active___-zoN6 {
  background: rgba(0, 0, 0, 0.7);
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y .styles-module__dropdownButton___16NPz {
  color: rgba(0, 0, 0, 0.85);
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y .styles-module__dropdownButton___16NPz:hover {
  background: rgba(0, 0, 0, 0.05);
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y .styles-module__toggleLabel___Xm8Aa {
  color: rgba(0, 0, 0, 0.5);
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y .styles-module__customCheckbox___U39ax {
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: #fff;
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y .styles-module__customCheckbox___U39ax.styles-module__checked___mnZLo {
  border-color: #1a1a1a;
  background: #1a1a1a;
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y .styles-module__customCheckbox___U39ax.styles-module__checked___mnZLo svg {
  color: #fff;
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y .styles-module__sliderLabel___U8sPr {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y .styles-module__sliderLabel___U8sPr:hover {
  color: rgba(0, 0, 0, 0.7);
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y .styles-module__sliderLabel___U8sPr.styles-module__active___-zoN6 {
  color: rgba(0, 0, 0, 0.9);
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y .styles-module__slider___GLdxp {
  background: rgba(0, 0, 0, 0.1);
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y .styles-module__slider___GLdxp::-webkit-slider-thumb {
  background: #1a1a1a;
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y .styles-module__slider___GLdxp::-moz-range-thumb {
  background: #1a1a1a;
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y .styles-module__helpIcon___xQg56 svg {
  color: rgba(0, 0, 0, 0.2);
}
.styles-module__light___r6n4Y.styles-module__settingsPanel___OxX3Y .styles-module__helpIcon___xQg56:hover svg {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__themeToggle___2rUjA {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  margin-left: 0.5rem;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.styles-module__themeToggle___2rUjA:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}
.styles-module__light___r6n4Y .styles-module__themeToggle___2rUjA {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___r6n4Y .styles-module__themeToggle___2rUjA:hover {
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.7);
}

.styles-module__themeIconWrapper___LsJIM {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 20px;
  height: 20px;
}

.styles-module__themeIcon___lCCmo {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: styles-module__themeIconIn___TU6ML 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes styles-module__themeIconIn___TU6ML {
  0% {
    opacity: 0;
    transform: scale(0.8) rotate(-30deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}`;if(typeof document<"u"){let r=document.getElementById("feedback-tool-styles-page-toolbar-css-styles");r||(r=document.createElement("style"),r.id="feedback-tool-styles-page-toolbar-css-styles",r.textContent=N0,document.head.appendChild(r))}const Ze={AED:{name:"United Arab Emirates Dirham",flag:"🇦🇪"},ARS:{name:"Argentine Peso",flag:"🇦🇷"},AUD:{name:"Australian Dollar",flag:"🇦🇺"},BRL:{name:"Brazilian Real",flag:"🇧🇷"},CHF:{name:"Swiss Franc",flag:"🇨🇭"},COP:{name:"Colombian Peso",flag:"🇨🇴"},DKK:{name:"Danish Krone",flag:"🇩🇰"},EUR:{name:"Euro",flag:"🇪🇺"},EURC:{name:"Euro Coin",flag:"🪙"},GBP:{name:"British Pound",flag:"🇬🇧"},HKD:{name:"Hong Kong Dollar",flag:"🇭🇰"},IDR:{name:"Indonesian Rupiah",flag:"🇮🇩"},MXN:{name:"Mexican Peso",flag:"🇲🇽"},NOK:{name:"Norwegian Krone",flag:"🇳🇴"},PHP:{name:"Philippine Peso",flag:"🇵🇭"},PLN:{name:"Polish Złoty",flag:"🇵🇱"},SEK:{name:"Swedish Krona",flag:"🇸🇪"},SGD:{name:"Singapore Dollar",flag:"🇸🇬"},USD:{name:"United States Dollar",flag:"🇺🇸"},USDC:{name:"USD Coin",flag:"💵"},USDT:{name:"Tether",flag:"💵"}},Xo={USD:1,USDC:1,USDT:1,EUR:1.08,EURC:1.08,GBP:1.27,CHF:1.12,AUD:.65,SGD:.74,HKD:.13,AED:.2723,PLN:.25,BRL:.17,MXN:.058,NOK:.09,SEK:.095,DKK:.14,PHP:.017,COP:24e-5,IDR:63e-6,ARS:.001},qd={AED:{minBips:0,maxBips:2},ARS:{minBips:-47,maxBips:56},AUD:{minBips:-40,maxBips:38},BRL:{minBips:-47,maxBips:62},CHF:{minBips:-38,maxBips:31},COP:{minBips:-45,maxBips:47},DKK:{minBips:-32,maxBips:28},EUR:{minBips:-33,maxBips:28},EURC:{minBips:-33,maxBips:28},GBP:{minBips:-30,maxBips:28},HKD:{minBips:-3,maxBips:3},IDR:{minBips:-40,maxBips:51},MXN:{minBips:-37,maxBips:35},NOK:{minBips:-42,maxBips:44},PHP:{minBips:-109,maxBips:46},PLN:{minBips:-39,maxBips:42},SEK:{minBips:-54,maxBips:44},SGD:{minBips:-21,maxBips:18},USD:{minBips:0,maxBips:0},USDC:{minBips:0,maxBips:0},USDT:{minBips:0,maxBips:0}};function ba(){const r={};for(const o of Object.keys(Ze))r[o]=qd[o]?{...qd[o]}:{minBips:0,maxBips:0};return r}const D0=Object.keys(Ze);function Af(r,o,s){let c=0,d=0;const f=[],p=[];for(const[x,b]of Object.entries(r)){const j=b*(o[x]??0);j>=0?(c+=j,j>0&&f.push({currency:x,balance:b,usd:j})):(d+=Math.abs(j),p.push({currency:x,balance:b,usd:Math.abs(j)}))}f.sort((x,b)=>b.usd-x.usd),p.sort((x,b)=>b.usd-x.usd);const _=c-d,h=Math.max(0,s-d),v=Math.max(0,_-Math.max(0,d-s)),y=Math.max(0,_),S=d,k=s+y,D=Math.max(0,k-S),R=Math.max(0,_-Math.max(0,d-s));return{holdings:c,obligations:d,equity:_,availableCredit:h,availableEquity:v,collateral:y,creditUsed:S,totalCapacity:k,creditRemaining:D,availableToWithdraw:R,creditLimit:s,holdingsBreakdown:f,obligationsBreakdown:p}}function Mo(r,o,s,c,d="A"){const f=o[r]??0;if(f<=0)return{balance:0,withdrawable:0,held:0,heldUSD:0,balanceUSD:0,withdrawableUSD:0};const p=s[r]??0,_=f*p,h=d==="B"?Math.max(0,c.availableToWithdraw??0):Math.max(0,c.equity),v=Math.min(_,h),y=p>0?v/p:0,S=f-y;return{balance:f,withdrawable:y,held:S,heldUSD:S*p,balanceUSD:_,withdrawableUSD:v}}const j0=[{id:"A",label:"Equity-only withdrawals",dot:"a"},{id:"B",label:"Credit-checked withdrawals",dot:"b"},{id:"C",label:"Fixed Credit Limit Model",dot:"c"}];function P0({model:r,onModelChange:o}){return u.jsx("div",{className:"model-tabs",role:"tablist","aria-label":"Calculation model",children:j0.map(({id:s,label:c,dot:d})=>u.jsxs("button",{type:"button",role:"tab","aria-selected":r===s,className:`model-tab${r===s?" model-tab--active":""}`,onClick:()=>o(s),children:[u.jsx("span",{className:`model-tab-dot model-tab-dot--${d}`,"aria-hidden":"true"}),c]},s))})}function Ge(r){return Math.abs(r).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}function ke(r){return r<0?`- $ ${Ge(r)}`:`$ ${Ge(r)}`}function Ma(r){return r<0?`- ${Ge(r)}`:Ge(r)}function Bo(r){if(r===0||!Number.isFinite(r))return"0";const o=Math.abs(r),s=o>=100?2:o>=1?4:6;return o.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:s,useGrouping:!1})}const R0="/assets/flags";function Qt({code:r,fallback:o,size:s=24,className:c=""}){const d=`${R0}/${r}.svg`,f=c||"currency-flag-wrap",p="currency-flag-img",_=s!==24?{width:s,height:s}:void 0;return u.jsxs("span",{className:f,style:_,children:[u.jsx("img",{className:p,src:d,alt:"",style:_,onError:h=>{h.target.style.display="none";const v=h.target.nextElementSibling;v&&(v.style.display="inline")}}),u.jsx("span",{className:"currency-flag",style:{display:"none",width:s,fontSize:Math.max(12,s-4)},children:o})]})}function Xn({label:r,children:o,formula:s,items:c}){var x,b;const[d,f]=g.useState(!1),[p,_]=g.useState("below"),h=g.useRef(null),v=g.useRef(null),y=c&&!Array.isArray(c)?c:null,S=(x=y==null?void 0:y.positives)==null?void 0:x.reduce((j,P)=>j+(P.usd??0),0),k=(b=y==null?void 0:y.negatives)==null?void 0:b.reduce((j,P)=>j+(P.usd??0),0),D=j=>{const P=Ze[j.currency]||{};return u.jsxs("span",{className:"metrics-tooltip-row",children:[u.jsxs("span",{className:"metrics-tooltip-row-left",children:[u.jsx(Qt,{code:j.currency,fallback:P.flag,size:16}),u.jsx("span",{className:"metrics-tooltip-code",children:j.currency}),u.jsx("span",{className:"metrics-tooltip-bal",children:Ma(j.balance)})]}),u.jsx("span",{className:"metrics-tooltip-usd",children:ke(j.usd)})]},j.currency)},R=g.useCallback(()=>{if(!h.current||!v.current)return;const j=h.current.getBoundingClientRect(),P=v.current.getBoundingClientRect(),I=window.innerHeight-j.bottom;_(I<P.height+12?"above":"below")},[]);return g.useEffect(()=>{d&&R()},[d,R]),u.jsxs("span",{className:"metrics-tooltip-trigger",ref:h,onMouseEnter:()=>f(!0),onMouseLeave:()=>f(!1),children:[o,d&&u.jsxs("span",{className:`metrics-tooltip metrics-tooltip--${p}`,ref:v,role:"tooltip",children:[u.jsx("span",{className:"metrics-tooltip-title",children:r}),s&&u.jsx("span",{className:"metrics-tooltip-formula",children:s}),c&&u.jsx("span",{className:"metrics-tooltip-list",children:Array.isArray(c)?c.length>0?c.map(D):u.jsx("span",{className:"metrics-tooltip-row metrics-tooltip-row--empty",children:"No currencies"}):u.jsxs(u.Fragment,{children:[(y==null?void 0:y.positives)&&y.positives.length>0&&u.jsxs(u.Fragment,{children:[u.jsx("span",{className:"metrics-tooltip-group-label",children:"Net positive balance"}),S!=null&&u.jsxs("span",{className:"metrics-tooltip-row metrics-tooltip-row--summary",children:[u.jsx("span",{className:"metrics-tooltip-row-left",children:u.jsx("span",{className:"metrics-tooltip-code",children:"Total"})}),u.jsx("span",{className:"metrics-tooltip-usd",children:ke(S)})]}),y.positives.map(D)]}),(y==null?void 0:y.negatives)&&y.negatives.length>0&&u.jsxs(u.Fragment,{children:[u.jsx("span",{className:"metrics-tooltip-group-label",children:"Net negative balance"}),k!=null&&u.jsxs("span",{className:"metrics-tooltip-row metrics-tooltip-row--summary",children:[u.jsx("span",{className:"metrics-tooltip-row-left",children:u.jsx("span",{className:"metrics-tooltip-code",children:"Total"})}),u.jsx("span",{className:"metrics-tooltip-usd",children:ke(k)})]}),y.negatives.map(D)]}),(!(y!=null&&y.positives)||y.positives.length===0)&&(!(y!=null&&y.negatives)||y.negatives.length===0)&&u.jsx("span",{className:"metrics-tooltip-row metrics-tooltip-row--empty",children:"No currencies"})]})})]})]})}const T0="data:image/svg+xml,%3csvg%20width='14'%20height='14'%20viewBox='0%200%2014%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='1'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='1'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='1'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3c/svg%3e",O0="data:image/svg+xml,%3csvg%20width='14'%20height='14'%20viewBox='0%200%2014%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='1'%20cy='1'%20r='1'%20fill='%231C1C1C'/%3e%3ccircle%20cx='1'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='1'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3c/svg%3e",I0="data:image/svg+xml,%3csvg%20width='14'%20height='14'%20viewBox='0%200%2014%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='1'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='1'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='1'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='7'%20r='1'%20fill='%234CBB84'/%3e%3ccircle%20cx='7'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3c/svg%3e",A0="data:image/svg+xml,%3csvg%20width='14'%20height='14'%20viewBox='0%200%2014%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='1'%20cy='1'%20r='1'%20fill='%234CBB84'/%3e%3ccircle%20cx='1'%20cy='7'%20r='1'%20fill='%234CBB84'/%3e%3ccircle%20cx='1'%20cy='13'%20r='1'%20fill='%234CBB84'/%3e%3ccircle%20cx='7'%20cy='1'%20r='1'%20fill='%234CBB84'/%3e%3ccircle%20cx='7'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='13'%20r='1'%20fill='%234CBB84'/%3e%3ccircle%20cx='13'%20cy='1'%20r='1'%20fill='%234CBB84'/%3e%3ccircle%20cx='13'%20cy='7'%20r='1'%20fill='%234CBB84'/%3e%3ccircle%20cx='13'%20cy='13'%20r='1'%20fill='%234CBB84'/%3e%3c/svg%3e",L0="data:image/svg+xml,%3csvg%20width='14'%20height='14'%20viewBox='0%200%2014%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='1'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='1'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='1'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='7'%20r='1'%20fill='%234CBB84'/%3e%3ccircle%20cx='7'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3c/svg%3e",M0="data:image/svg+xml,%3csvg%20width='14'%20height='14'%20viewBox='0%200%2014%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='1'%20cy='1'%20r='1'%20fill='%234CBB84'/%3e%3ccircle%20cx='1'%20cy='7'%20r='1'%20fill='%234CBB84'/%3e%3ccircle%20cx='1'%20cy='13'%20r='1'%20fill='%234CBB84'/%3e%3ccircle%20cx='7'%20cy='1'%20r='1'%20fill='%234CBB84'/%3e%3ccircle%20cx='7'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='13'%20r='1'%20fill='%234CBB84'/%3e%3ccircle%20cx='13'%20cy='1'%20r='1'%20fill='%234CBB84'/%3e%3ccircle%20cx='13'%20cy='7'%20r='1'%20fill='%234CBB84'/%3e%3ccircle%20cx='13'%20cy='13'%20r='1'%20fill='%234CBB84'/%3e%3c/svg%3e",B0="data:image/svg+xml,%3csvg%20width='14'%20height='14'%20viewBox='0%200%2014%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='1'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='1'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='1'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='7'%20r='1'%20fill='%234CBB84'/%3e%3ccircle%20cx='7'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3c/svg%3e",z0="data:image/svg+xml,%3csvg%20width='14'%20height='14'%20viewBox='0%200%2014%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='1'%20cy='1'%20r='1'%20fill='%231C1C1C'/%3e%3ccircle%20cx='1'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='1'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3c/svg%3e",F0="data:image/svg+xml,%3csvg%20width='14'%20height='14'%20viewBox='0%200%2014%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='1'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='1'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='1'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='1'%20r='1'%20fill='%231C1C1C'/%3e%3ccircle%20cx='7'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3c/svg%3e",U0="data:image/svg+xml,%3csvg%20width='14'%20height='14'%20viewBox='0%200%2014%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='1'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='1'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='1'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='1'%20r='1'%20fill='%231C1C1C'/%3e%3ccircle%20cx='13'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3c/svg%3e",W0="data:image/svg+xml,%3csvg%20width='14'%20height='14'%20viewBox='0%200%2014%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='1'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='1'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='1'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='7'%20r='1'%20fill='%231C1C1C'/%3e%3ccircle%20cx='13'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3c/svg%3e",Y0="data:image/svg+xml,%3csvg%20width='14'%20height='14'%20viewBox='0%200%2014%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='1'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='1'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='1'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='13'%20r='1'%20fill='%231C1C1C'/%3e%3c/svg%3e",H0="data:image/svg+xml,%3csvg%20width='14'%20height='14'%20viewBox='0%200%2014%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='1'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='1'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='1'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='13'%20r='1'%20fill='%231C1C1C'/%3e%3ccircle%20cx='13'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3c/svg%3e",V0="data:image/svg+xml,%3csvg%20width='14'%20height='14'%20viewBox='0%200%2014%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='1'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='1'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='1'%20cy='13'%20r='1'%20fill='%231C1C1C'/%3e%3ccircle%20cx='7'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3c/svg%3e",$0="data:image/svg+xml,%3csvg%20width='14'%20height='14'%20viewBox='0%200%2014%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='1'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='1'%20cy='7'%20r='1'%20fill='%231C1C1C'/%3e%3ccircle%20cx='1'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='7'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='1'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='7'%20r='1'%20fill='%23D9D9D9'/%3e%3ccircle%20cx='13'%20cy='13'%20r='1'%20fill='%23D9D9D9'/%3e%3c/svg%3e",Q0=["1.svg","2.svg","3.svg","4.svg","5.svg","6.svg","7.svg","8.svg","9.svg","10.svg","11.svg","12.svg","13.svg","14.svg","15.svg"],X0=Q0.map(r=>new URL(Object.assign({"../../assets/matrix-loader/1.svg":T0,"../../assets/matrix-loader/10.svg":O0,"../../assets/matrix-loader/11.svg":I0,"../../assets/matrix-loader/12.svg":A0,"../../assets/matrix-loader/13.svg":L0,"../../assets/matrix-loader/14.svg":M0,"../../assets/matrix-loader/15.svg":B0,"../../assets/matrix-loader/2.svg":z0,"../../assets/matrix-loader/3.svg":F0,"../../assets/matrix-loader/4.svg":U0,"../../assets/matrix-loader/5.svg":W0,"../../assets/matrix-loader/6.svg":Y0,"../../assets/matrix-loader/7.svg":H0,"../../assets/matrix-loader/8.svg":V0,"../../assets/matrix-loader/9.svg":$0})[`../../assets/matrix-loader/${r}`],import.meta.url).href),K0=[...Array(10).fill(100),...Array(5).fill(200)],G0=K0.slice(0,-1).reduce((r,o,s)=>[...r,r[s]+o],[0]),Z0=2e3;function Ko({size:r=14,className:o="","aria-label":s="Loading",animate:c=!1}){const[d,f]=g.useState(0),p=g.useRef([]);g.useEffect(()=>{if(!c){f(y=>y===0?y:0);return}const v=[];return G0.forEach((y,S)=>{const k=setTimeout(()=>f(S),y);v.push(k)}),p.current=v,()=>{p.current.forEach(clearTimeout),p.current=[]}},[c]);const _={width:r,height:r},h=`matrix-loader ${c?"matrix-loader--animating":""} ${o||""}`.trim();return u.jsx("span",{className:h,role:"img","aria-label":s,style:_,children:u.jsx("span",{className:"matrix-loader__stack",children:X0.map((v,y)=>u.jsx("img",{src:v,alt:"",className:`matrix-loader__frame matrix-loader__frame--${y}`,style:{width:r,height:r,opacity:y===d?1:0}},y))})})}function J0({totals:r,model:o="A",ratesLoading:s=!1}){const{holdings:c,obligations:d,equity:f,collateral:p,creditUsed:_,creditRemaining:h,availableToWithdraw:v,creditLimit:y,holdingsBreakdown:S,obligationsBreakdown:k}=r,D=Math.max(0,d-y),R=y-_;return o==="B"?u.jsxs("div",{className:"metrics-section",children:[u.jsxs("div",{children:[u.jsx("div",{className:"label",children:"Net balance"}),u.jsxs("div",{id:"trade-amount",className:"value-large",style:{color:v>=0?"#1c1c1c":"#ef4444"},children:[ke(v)," ",u.jsx("span",{className:"title-loader","aria-hidden":"true",children:u.jsx(Ko,{size:14,animate:s,className:s?"matrix-loader--once":"","aria-label":s?"Fetching rates":""})})]}),u.jsxs("div",{className:"value-breakdown",children:[u.jsx(Xn,{label:"Account equity",formula:"Net positive balance − Net negative balance",items:{positives:S,negatives:k},children:u.jsxs("span",{children:["Account equity ",u.jsxs("span",{children:["(",u.jsx("span",{children:ke(f)}),")"]})]})}),D>0&&u.jsxs(u.Fragment,{children:[" − ",u.jsx(Xn,{label:"Owed above credit limit",formula:`Authorized credit limit: ${ke(y)}. Sum of net negative balances: ${ke(d)}. The amount by which net negative balance exceeds the limit is owed above the limit (locks equity and cannot be withdrawn).`,items:{negatives:k},children:u.jsxs("span",{children:["Owed above credit limit ",u.jsxs("span",{children:["(",u.jsx("span",{children:ke(D)}),")"]})]})})]})]})]}),u.jsxs("div",{children:[u.jsx("div",{className:"label",children:"Available credit"}),u.jsx("div",{id:"equity-amount",className:"value-large",children:ke(h)}),u.jsxs("div",{className:"value-breakdown",children:[u.jsx(Xn,{label:"Your collateral",formula:"max(0, Equity) — Excess deposits that can be used to back additional trading capacity",items:{positives:S,negatives:k},children:u.jsxs("span",{children:["Collateral ",u.jsxs("span",{children:["(",u.jsx("span",{children:ke(p)}),")"]})]})})," + ",u.jsx(Xn,{label:"Remaining credit",formula:`Original credit limit ${ke(y)} minus your net negative balances (${ke(d)})`,items:{negatives:k},children:u.jsxs("span",{children:["Remaining credit"," ",u.jsxs("span",{children:["(",u.jsx("span",{style:{color:R<0?"#ef4444":void 0},children:ke(R)}),")"]})]})})]})]})]}):u.jsxs("div",{className:"metrics-section",children:[u.jsxs("div",{children:[u.jsx("div",{className:"label",children:"Net balance"}),u.jsxs("div",{id:"equity-amount",className:"value-large",style:{color:f>=0?"#1c1c1c":"#ef4444"},children:[ke(f)," ",u.jsx("span",{className:"title-loader","aria-hidden":"true",children:u.jsx(Ko,{size:14,animate:s,className:s?"matrix-loader--once":"","aria-label":s?"Fetching rates":""})})]}),u.jsx("div",{className:"value-breakdown",children:u.jsx(Xn,{label:"Account equity",formula:"Net positive balance − Net negative balance",items:{positives:S,negatives:k},children:u.jsxs("span",{children:["Account equity ",u.jsxs("span",{children:["(",u.jsx("span",{children:ke(f)}),")"]})]})})})]}),u.jsxs("div",{children:[u.jsx("div",{className:"label",children:"Available credit"}),u.jsx("div",{id:"trade-amount",className:"value-large",children:ke(h)}),u.jsxs("div",{className:"value-breakdown",children:[u.jsx(Xn,{label:"Your collateral",formula:"max(0, Equity) — Excess deposits that can be used to back additional trading capacity",items:{positives:S,negatives:k},children:u.jsxs("span",{children:["Collateral ",u.jsxs("span",{children:["(",u.jsx("span",{children:ke(p)}),")"]})]})})," + ",u.jsx(Xn,{label:"Remaining credit",formula:`Original credit limit ${ke(y)} minus your net negative balances (${ke(d)})`,items:{negatives:k},children:u.jsxs("span",{children:["Remaining credit"," ",u.jsxs("span",{children:["(",u.jsx("span",{style:{color:R<0?"#ef4444":void 0},children:ke(R)}),")"]})]})})]})]})]})}const ua="/assets/icons";function da({src:r,fallback:o}){return u.jsxs("span",{className:"btn-icon-wrap",children:[u.jsx("img",{className:"btn-icon-img",src:r,alt:"",onError:s=>{s.target.style.display="none";const c=s.target.nextElementSibling;c&&(c.style.display="inline")}}),u.jsx("span",{className:"btn-icon",style:{display:"none"},children:o})]})}function q0({onDeposit:r,onWithdraw:o,onTrade:s}){return u.jsxs("div",{className:"btn-group",children:[u.jsxs("button",{type:"button",className:"btn btn-primary",onClick:r,children:[u.jsx(da,{src:`${ua}/Deposit.svg`,fallback:"⊕"}),"Deposit funds"]}),u.jsxs("button",{type:"button",className:"btn btn-secondary",onClick:o,children:[u.jsx(da,{src:`${ua}/withdraw.svg`,fallback:"⊙"}),"Withdraw funds"]}),u.jsxs("button",{type:"button",className:"btn btn-outline",onClick:s,children:[u.jsx(da,{src:`${ua}/trade.svg`,fallback:"⇄"}),"Execute trade"]})]})}const fa="asc",Sl="desc";function eg({balances:r,rates:o,ratesLoading:s=!1,disabledCurrencies:c={}}){const[d,f]=g.useState(""),[p,_]=g.useState(Sl),h=g.useCallback(()=>{_(k=>k===Sl?fa:Sl)},[]),v=g.useMemo(()=>Object.entries(Ze).filter(([k])=>!c[k]),[c]),y=g.useMemo(()=>{const k=d.trim().toLowerCase();return k?v.filter(([D,R])=>D.toLowerCase().includes(k)||R.name.toLowerCase().includes(k)):v},[d,v]),S=g.useMemo(()=>{const k=y.map(([R,x])=>{const b=r[R]??0,j=b*(o[R]??0);return{code:R,info:x,bal:b,usd:j}}),D=(R,x)=>{const b=R.bal===0,j=x.bal===0;return b&&j?R.code.localeCompare(x.code):b?1:j?-1:0};return[...k].sort((R,x)=>{const b=D(R,x);if(b!==0)return b;const j=R.usd-x.usd;return p===fa?j:-j})},[y,r,o,p]);return u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"table-header",children:[u.jsx("h2",{className:"section-title",children:"Currency balances"}),u.jsx("input",{type:"text",className:"search-input",placeholder:"Search",value:d,onChange:k=>f(k.target.value)})]}),u.jsxs("div",{className:"table-container",role:"table","aria-label":"Currency balances",children:[u.jsxs("div",{className:"table-header-row",role:"row",children:[u.jsx("div",{className:"table-header-cell",role:"columnheader",children:"Currency"}),u.jsx("div",{className:"table-header-cell",role:"columnheader",children:"Balance"}),u.jsx("div",{className:"table-header-cell",role:"columnheader",children:u.jsxs("button",{type:"button",className:"sortable-th",onClick:h,"aria-sort":p===fa?"ascending":"descending","aria-label":`Sort by estimated market value in USD, ${p===Sl?"high to low":"low to high"}. Zero balances appear at bottom.`,children:["Est. market value in USD",u.jsx("span",{className:"sort-icon","aria-hidden":"true",children:p===Sl?"↓":"↑"})]})}),u.jsx("div",{className:"table-header-cell",role:"columnheader",children:"Rate (to USD)"})]}),u.jsx("div",{className:"table-rows",children:S.map(({code:k,info:D,bal:R,usd:x})=>{const b=R<0;return u.jsxs("div",{className:"table-row",role:"row",children:[u.jsx("div",{className:"table-cell",role:"cell",children:u.jsxs("div",{className:"currency-cell",children:[u.jsx(Qt,{code:k,fallback:D.flag}),u.jsxs("div",{className:"currency-info",children:[u.jsx("span",{className:"currency-code",children:k}),u.jsx("span",{className:"currency-name",children:D.name})]})]})}),u.jsx("div",{className:`table-cell ${b?"balance-negative":"balance-positive"}`,role:"cell",children:Ma(R)}),u.jsx("div",{className:"table-cell",role:"cell",children:u.jsxs("div",{className:"usd-cell",children:[u.jsx("span",{className:b?"usd-negative":"usd-positive",children:ke(x)}),u.jsx(Ko,{size:14,animate:s,className:s?"matrix-loader--once":"","aria-label":s?"Fetching rate":"Rate"})]})}),u.jsx("div",{className:"table-cell rate-cell",role:"cell",children:u.jsxs("div",{className:"rate-cell-inner",children:[(o[k]??0).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:6}),u.jsx(Ko,{size:14,animate:s,className:s?"matrix-loader--once":"","aria-label":s?"Fetching rate":"Rate"})]})})]},k)})}),u.jsxs("div",{className:"table-footer",children:["Viewing 1–",u.jsx("span",{id:"table-row-count",children:S.length})," of"," ",u.jsx("span",{id:"table-row-total",children:v.length})," rows"]})]})]})}function tg({color:r="#999999",size:o=24,className:s=""}){return u.jsxs("svg",{width:o,height:o,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:s,"aria-hidden":!0,children:[u.jsx("path",{d:"M10.0571 2.00002C10.5778 1.47932 11.422 1.47932 11.9427 2.00002L13.9999 4.05721C14.5206 4.57791 14.5206 5.42213 13.9999 5.94283L12.9427 7.00002L8.99992 3.05721L10.0571 2.00002Z",fill:r}),u.jsx("path",{d:"M8.05711 4.00002L1.72378 10.3334C1.47373 10.5834 1.33325 10.9225 1.33325 11.2762V13.3334C1.33325 14.0697 1.93021 14.6667 2.66659 14.6667H4.72378C5.0774 14.6667 5.41654 14.5262 5.66659 14.2762L11.9999 7.94283L8.05711 4.00002Z",fill:r})]})}const pa="/assets/icons",ng="#999999";function rg({onSimulateFx:r,onEdit:o,onRefresh:s,onToggleLogs:c,onToggleAutoRefresh:d,autoRefreshing:f=!1,ratesLoading:p=!1,logsOpen:_=!1}){return u.jsxs("div",{className:"fab-group",children:[u.jsx("button",{type:"button",className:`fab ${_?"fab--active":""}`,onClick:c,title:"Transaction logs","aria-expanded":_,"aria-controls":"logs-drawer",children:u.jsxs("span",{className:"fab-icon-wrap",children:[u.jsx("img",{className:"fab-icon-img",src:`${pa}/history.svg`,alt:"",onError:h=>{h.target.style.display="none";const v=h.target.nextElementSibling;v&&(v.style.display="inline")}}),u.jsx("span",{style:{display:"none"},children:"📋"})]})}),u.jsx("button",{type:"button",className:"fab",onClick:s||r,title:"Refresh FX rates",disabled:p,children:u.jsxs("span",{className:"fab-icon-wrap",children:[u.jsx("img",{className:`fab-icon-img ${p?"fab-icon-rotating":""}`,src:`${pa}/refresh.svg`,alt:"",onError:h=>{h.target.style.display="none";const v=h.target.nextElementSibling;v&&(v.style.display="inline")}}),u.jsx("span",{style:{display:"none"},className:p?"fab-icon-rotating":"",children:"↻"})]})}),u.jsx("button",{type:"button",className:`fab ${f?"fab--active":""}`,onClick:d,title:f?"Pause auto-refresh":"Start auto-refresh","aria-pressed":f,children:u.jsxs("span",{className:"fab-icon-wrap",children:[u.jsx("img",{className:"fab-icon-img",src:`${pa}/${f?"pause":"play"}.svg`,alt:"",onError:h=>{h.target.style.display="none";const v=h.target.nextElementSibling;v&&(v.style.display="inline")}}),u.jsx("span",{style:{display:"none"},"aria-hidden":"true",children:f?"⏸":"▶"})]})}),u.jsx("button",{type:"button",className:"fab",onClick:o,title:"Edit Balances & Settings",children:u.jsx("span",{className:"fab-icon-wrap",children:u.jsx(tg,{color:ng,size:24,className:"fab-icon-img"})})})]})}function lg({lastRefresh:r}){return u.jsx("div",{className:"rate-info",children:u.jsxs("span",{className:"rate-text",children:["Last rate update: ",u.jsx("strong",{id:"last-refresh",children:r})]})})}function Oe(r,o,{checkForDefaultPrevented:s=!0}={}){return function(d){if(r==null||r(d),s===!1||!d.defaultPrevented)return o==null?void 0:o(d)}}function ef(r,o){if(typeof r=="function")return r(o);r!=null&&(r.current=o)}function Lf(...r){return o=>{let s=!1;const c=r.map(d=>{const f=ef(d,o);return!s&&typeof f=="function"&&(s=!0),f});if(s)return()=>{for(let d=0;d<c.length;d++){const f=c[d];typeof f=="function"?f():ef(r[d],null)}}}}function Fe(...r){return g.useCallback(Lf(...r),r)}function og(r,o){const s=g.createContext(o),c=f=>{const{children:p,..._}=f,h=g.useMemo(()=>_,Object.values(_));return u.jsx(s.Provider,{value:h,children:p})};c.displayName=r+"Provider";function d(f){const p=g.useContext(s);if(p)return p;if(o!==void 0)return o;throw new Error(`\`${f}\` must be used within \`${r}\``)}return[c,d]}function ns(r,o=[]){let s=[];function c(f,p){const _=g.createContext(p),h=s.length;s=[...s,p];const v=S=>{var j;const{scope:k,children:D,...R}=S,x=((j=k==null?void 0:k[r])==null?void 0:j[h])||_,b=g.useMemo(()=>R,Object.values(R));return u.jsx(x.Provider,{value:b,children:D})};v.displayName=f+"Provider";function y(S,k){var x;const D=((x=k==null?void 0:k[r])==null?void 0:x[h])||_,R=g.useContext(D);if(R)return R;if(p!==void 0)return p;throw new Error(`\`${S}\` must be used within \`${f}\``)}return[v,y]}const d=()=>{const f=s.map(p=>g.createContext(p));return function(_){const h=(_==null?void 0:_[r])||f;return g.useMemo(()=>({[`__scope${r}`]:{..._,[r]:h}}),[_,h])}};return d.scopeName=r,[c,sg(d,...o)]}function sg(...r){const o=r[0];if(r.length===1)return o;const s=()=>{const c=r.map(d=>({useScope:d(),scopeName:d.scopeName}));return function(f){const p=c.reduce((_,{useScope:h,scopeName:v})=>{const S=h(f)[`__scope${v}`];return{..._,...S}},{});return g.useMemo(()=>({[`__scope${o.scopeName}`]:p}),[p])}};return s.scopeName=o.scopeName,s}var rt=globalThis!=null&&globalThis.document?g.useLayoutEffect:()=>{},ig=Of[" useId ".trim().toString()]||(()=>{}),ag=0;function jr(r){const[o,s]=g.useState(ig());return rt(()=>{s(c=>c??String(ag++))},[r]),o?`radix-${o}`:""}var cg=Of[" useInsertionEffect ".trim().toString()]||rt;function Ca({prop:r,defaultProp:o,onChange:s=()=>{},caller:c}){const[d,f,p]=ug({defaultProp:o,onChange:s}),_=r!==void 0,h=_?r:d;{const y=g.useRef(r!==void 0);g.useEffect(()=>{const S=y.current;S!==_&&console.warn(`${c} is changing from ${S?"controlled":"uncontrolled"} to ${_?"controlled":"uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`),y.current=_},[_,c])}const v=g.useCallback(y=>{var S;if(_){const k=dg(y)?y(r):y;k!==r&&((S=p.current)==null||S.call(p,k))}else f(y)},[_,r,f,p]);return[h,v]}function ug({defaultProp:r,onChange:o}){const[s,c]=g.useState(r),d=g.useRef(s),f=g.useRef(o);return cg(()=>{f.current=o},[o]),g.useEffect(()=>{var p;d.current!==s&&((p=f.current)==null||p.call(f,s),d.current=s)},[s,d]),[s,c,f]}function dg(r){return typeof r=="function"}function Cl(r){const o=fg(r),s=g.forwardRef((c,d)=>{const{children:f,...p}=c,_=g.Children.toArray(f),h=_.find(mg);if(h){const v=h.props.children,y=_.map(S=>S===h?g.Children.count(v)>1?g.Children.only(null):g.isValidElement(v)?v.props.children:null:S);return u.jsx(o,{...p,ref:d,children:g.isValidElement(v)?g.cloneElement(v,void 0,y):null})}return u.jsx(o,{...p,ref:d,children:f})});return s.displayName=`${r}.Slot`,s}function fg(r){const o=g.forwardRef((s,c)=>{const{children:d,...f}=s;if(g.isValidElement(d)){const p=gg(d),_=_g(f,d.props);return d.type!==g.Fragment&&(_.ref=c?Lf(c,p):p),g.cloneElement(d,_)}return g.Children.count(d)>1?g.Children.only(null):null});return o.displayName=`${r}.SlotClone`,o}var pg=Symbol("radix.slottable");function mg(r){return g.isValidElement(r)&&typeof r.type=="function"&&"__radixId"in r.type&&r.type.__radixId===pg}function _g(r,o){const s={...o};for(const c in o){const d=r[c],f=o[c];/^on[A-Z]/.test(c)?d&&f?s[c]=(..._)=>{const h=f(..._);return d(..._),h}:d&&(s[c]=d):c==="style"?s[c]={...d,...f}:c==="className"&&(s[c]=[d,f].filter(Boolean).join(" "))}return{...r,...s}}function gg(r){var c,d;let o=(c=Object.getOwnPropertyDescriptor(r.props,"ref"))==null?void 0:c.get,s=o&&"isReactWarning"in o&&o.isReactWarning;return s?r.ref:(o=(d=Object.getOwnPropertyDescriptor(r,"ref"))==null?void 0:d.get,s=o&&"isReactWarning"in o&&o.isReactWarning,s?r.props.ref:r.props.ref||r.ref)}var hg=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],Pe=hg.reduce((r,o)=>{const s=Cl(`Primitive.${o}`),c=g.forwardRef((d,f)=>{const{asChild:p,..._}=d,h=p?s:o;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),u.jsx(h,{..._,ref:f})});return c.displayName=`Primitive.${o}`,{...r,[o]:c}},{});function yg(r,o){r&&Or.flushSync(()=>r.dispatchEvent(o))}function Kn(r){const o=g.useRef(r);return g.useEffect(()=>{o.current=r}),g.useMemo(()=>(...s)=>{var c;return(c=o.current)==null?void 0:c.call(o,...s)},[])}function vg(r,o=globalThis==null?void 0:globalThis.document){const s=Kn(r);g.useEffect(()=>{const c=d=>{d.key==="Escape"&&s(d)};return o.addEventListener("keydown",c,{capture:!0}),()=>o.removeEventListener("keydown",c,{capture:!0})},[s,o])}var xg="DismissableLayer",ka="dismissableLayer.update",wg="dismissableLayer.pointerDownOutside",Sg="dismissableLayer.focusOutside",tf,Mf=g.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),Ba=g.forwardRef((r,o)=>{const{disableOutsidePointerEvents:s=!1,onEscapeKeyDown:c,onPointerDownOutside:d,onFocusOutside:f,onInteractOutside:p,onDismiss:_,...h}=r,v=g.useContext(Mf),[y,S]=g.useState(null),k=(y==null?void 0:y.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,D]=g.useState({}),R=Fe(o,Y=>S(Y)),x=Array.from(v.layers),[b]=[...v.layersWithOutsidePointerEventsDisabled].slice(-1),j=x.indexOf(b),P=y?x.indexOf(y):-1,I=v.layersWithOutsidePointerEventsDisabled.size>0,M=P>=j,z=kg(Y=>{const K=Y.target,fe=[...v.branches].some(ue=>ue.contains(K));!M||fe||(d==null||d(Y),p==null||p(Y),Y.defaultPrevented||_==null||_())},k),G=Eg(Y=>{const K=Y.target;[...v.branches].some(ue=>ue.contains(K))||(f==null||f(Y),p==null||p(Y),Y.defaultPrevented||_==null||_())},k);return vg(Y=>{P===v.layers.size-1&&(c==null||c(Y),!Y.defaultPrevented&&_&&(Y.preventDefault(),_()))},k),g.useEffect(()=>{if(y)return s&&(v.layersWithOutsidePointerEventsDisabled.size===0&&(tf=k.body.style.pointerEvents,k.body.style.pointerEvents="none"),v.layersWithOutsidePointerEventsDisabled.add(y)),v.layers.add(y),nf(),()=>{s&&v.layersWithOutsidePointerEventsDisabled.size===1&&(k.body.style.pointerEvents=tf)}},[y,k,s,v]),g.useEffect(()=>()=>{y&&(v.layers.delete(y),v.layersWithOutsidePointerEventsDisabled.delete(y),nf())},[y,v]),g.useEffect(()=>{const Y=()=>D({});return document.addEventListener(ka,Y),()=>document.removeEventListener(ka,Y)},[]),u.jsx(Pe.div,{...h,ref:R,style:{pointerEvents:I?M?"auto":"none":void 0,...r.style},onFocusCapture:Oe(r.onFocusCapture,G.onFocusCapture),onBlurCapture:Oe(r.onBlurCapture,G.onBlurCapture),onPointerDownCapture:Oe(r.onPointerDownCapture,z.onPointerDownCapture)})});Ba.displayName=xg;var bg="DismissableLayerBranch",Cg=g.forwardRef((r,o)=>{const s=g.useContext(Mf),c=g.useRef(null),d=Fe(o,c);return g.useEffect(()=>{const f=c.current;if(f)return s.branches.add(f),()=>{s.branches.delete(f)}},[s.branches]),u.jsx(Pe.div,{...r,ref:d})});Cg.displayName=bg;function kg(r,o=globalThis==null?void 0:globalThis.document){const s=Kn(r),c=g.useRef(!1),d=g.useRef(()=>{});return g.useEffect(()=>{const f=_=>{if(_.target&&!c.current){let h=function(){Bf(wg,s,v,{discrete:!0})};const v={originalEvent:_};_.pointerType==="touch"?(o.removeEventListener("click",d.current),d.current=h,o.addEventListener("click",d.current,{once:!0})):h()}else o.removeEventListener("click",d.current);c.current=!1},p=window.setTimeout(()=>{o.addEventListener("pointerdown",f)},0);return()=>{window.clearTimeout(p),o.removeEventListener("pointerdown",f),o.removeEventListener("click",d.current)}},[o,s]),{onPointerDownCapture:()=>c.current=!0}}function Eg(r,o=globalThis==null?void 0:globalThis.document){const s=Kn(r),c=g.useRef(!1);return g.useEffect(()=>{const d=f=>{f.target&&!c.current&&Bf(Sg,s,{originalEvent:f},{discrete:!1})};return o.addEventListener("focusin",d),()=>o.removeEventListener("focusin",d)},[o,s]),{onFocusCapture:()=>c.current=!0,onBlurCapture:()=>c.current=!1}}function nf(){const r=new CustomEvent(ka);document.dispatchEvent(r)}function Bf(r,o,s,{discrete:c}){const d=s.originalEvent.target,f=new CustomEvent(r,{bubbles:!1,cancelable:!0,detail:s});o&&d.addEventListener(r,o,{once:!0}),c?yg(d,f):d.dispatchEvent(f)}var ma="focusScope.autoFocusOnMount",_a="focusScope.autoFocusOnUnmount",rf={bubbles:!1,cancelable:!0},Ng="FocusScope",za=g.forwardRef((r,o)=>{const{loop:s=!1,trapped:c=!1,onMountAutoFocus:d,onUnmountAutoFocus:f,...p}=r,[_,h]=g.useState(null),v=Kn(d),y=Kn(f),S=g.useRef(null),k=Fe(o,x=>h(x)),D=g.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;g.useEffect(()=>{if(c){let x=function(I){if(D.paused||!_)return;const M=I.target;_.contains(M)?S.current=M:jn(S.current,{select:!0})},b=function(I){if(D.paused||!_)return;const M=I.relatedTarget;M!==null&&(_.contains(M)||jn(S.current,{select:!0}))},j=function(I){if(document.activeElement===document.body)for(const z of I)z.removedNodes.length>0&&jn(_)};document.addEventListener("focusin",x),document.addEventListener("focusout",b);const P=new MutationObserver(j);return _&&P.observe(_,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",x),document.removeEventListener("focusout",b),P.disconnect()}}},[c,_,D.paused]),g.useEffect(()=>{if(_){of.add(D);const x=document.activeElement;if(!_.contains(x)){const j=new CustomEvent(ma,rf);_.addEventListener(ma,v),_.dispatchEvent(j),j.defaultPrevented||(Dg(Og(zf(_)),{select:!0}),document.activeElement===x&&jn(_))}return()=>{_.removeEventListener(ma,v),setTimeout(()=>{const j=new CustomEvent(_a,rf);_.addEventListener(_a,y),_.dispatchEvent(j),j.defaultPrevented||jn(x??document.body,{select:!0}),_.removeEventListener(_a,y),of.remove(D)},0)}}},[_,v,y,D]);const R=g.useCallback(x=>{if(!s&&!c||D.paused)return;const b=x.key==="Tab"&&!x.altKey&&!x.ctrlKey&&!x.metaKey,j=document.activeElement;if(b&&j){const P=x.currentTarget,[I,M]=jg(P);I&&M?!x.shiftKey&&j===M?(x.preventDefault(),s&&jn(I,{select:!0})):x.shiftKey&&j===I&&(x.preventDefault(),s&&jn(M,{select:!0})):j===P&&x.preventDefault()}},[s,c,D.paused]);return u.jsx(Pe.div,{tabIndex:-1,...p,ref:k,onKeyDown:R})});za.displayName=Ng;function Dg(r,{select:o=!1}={}){const s=document.activeElement;for(const c of r)if(jn(c,{select:o}),document.activeElement!==s)return}function jg(r){const o=zf(r),s=lf(o,r),c=lf(o.reverse(),r);return[s,c]}function zf(r){const o=[],s=document.createTreeWalker(r,NodeFilter.SHOW_ELEMENT,{acceptNode:c=>{const d=c.tagName==="INPUT"&&c.type==="hidden";return c.disabled||c.hidden||d?NodeFilter.FILTER_SKIP:c.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;s.nextNode();)o.push(s.currentNode);return o}function lf(r,o){for(const s of r)if(!Pg(s,{upTo:o}))return s}function Pg(r,{upTo:o}){if(getComputedStyle(r).visibility==="hidden")return!0;for(;r;){if(o!==void 0&&r===o)return!1;if(getComputedStyle(r).display==="none")return!0;r=r.parentElement}return!1}function Rg(r){return r instanceof HTMLInputElement&&"select"in r}function jn(r,{select:o=!1}={}){if(r&&r.focus){const s=document.activeElement;r.focus({preventScroll:!0}),r!==s&&Rg(r)&&o&&r.select()}}var of=Tg();function Tg(){let r=[];return{add(o){const s=r[0];o!==s&&(s==null||s.pause()),r=sf(r,o),r.unshift(o)},remove(o){var s;r=sf(r,o),(s=r[0])==null||s.resume()}}}function sf(r,o){const s=[...r],c=s.indexOf(o);return c!==-1&&s.splice(c,1),s}function Og(r){return r.filter(o=>o.tagName!=="A")}var Ig="Portal",Fa=g.forwardRef((r,o)=>{var _;const{container:s,...c}=r,[d,f]=g.useState(!1);rt(()=>f(!0),[]);const p=s||d&&((_=globalThis==null?void 0:globalThis.document)==null?void 0:_.body);return p?S0.createPortal(u.jsx(Pe.div,{...c,ref:o}),p):null});Fa.displayName=Ig;function Ag(r,o){return g.useReducer((s,c)=>o[s][c]??s,r)}var rs=r=>{const{present:o,children:s}=r,c=Lg(o),d=typeof s=="function"?s({present:c.isPresent}):g.Children.only(s),f=Fe(c.ref,Mg(d));return typeof s=="function"||c.isPresent?g.cloneElement(d,{ref:f}):null};rs.displayName="Presence";function Lg(r){const[o,s]=g.useState(),c=g.useRef(null),d=g.useRef(r),f=g.useRef("none"),p=r?"mounted":"unmounted",[_,h]=Ag(p,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return g.useEffect(()=>{const v=zo(c.current);f.current=_==="mounted"?v:"none"},[_]),rt(()=>{const v=c.current,y=d.current;if(y!==r){const k=f.current,D=zo(v);r?h("MOUNT"):D==="none"||(v==null?void 0:v.display)==="none"?h("UNMOUNT"):h(y&&k!==D?"ANIMATION_OUT":"UNMOUNT"),d.current=r}},[r,h]),rt(()=>{if(o){let v;const y=o.ownerDocument.defaultView??window,S=D=>{const x=zo(c.current).includes(CSS.escape(D.animationName));if(D.target===o&&x&&(h("ANIMATION_END"),!d.current)){const b=o.style.animationFillMode;o.style.animationFillMode="forwards",v=y.setTimeout(()=>{o.style.animationFillMode==="forwards"&&(o.style.animationFillMode=b)})}},k=D=>{D.target===o&&(f.current=zo(c.current))};return o.addEventListener("animationstart",k),o.addEventListener("animationcancel",S),o.addEventListener("animationend",S),()=>{y.clearTimeout(v),o.removeEventListener("animationstart",k),o.removeEventListener("animationcancel",S),o.removeEventListener("animationend",S)}}else h("ANIMATION_END")},[o,h]),{isPresent:["mounted","unmountSuspended"].includes(_),ref:g.useCallback(v=>{c.current=v?getComputedStyle(v):null,s(v)},[])}}function zo(r){return(r==null?void 0:r.animationName)||"none"}function Mg(r){var c,d;let o=(c=Object.getOwnPropertyDescriptor(r.props,"ref"))==null?void 0:c.get,s=o&&"isReactWarning"in o&&o.isReactWarning;return s?r.ref:(o=(d=Object.getOwnPropertyDescriptor(r,"ref"))==null?void 0:d.get,s=o&&"isReactWarning"in o&&o.isReactWarning,s?r.props.ref:r.props.ref||r.ref)}var ga=0;function Ff(){g.useEffect(()=>{const r=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",r[0]??af()),document.body.insertAdjacentElement("beforeend",r[1]??af()),ga++,()=>{ga===1&&document.querySelectorAll("[data-radix-focus-guard]").forEach(o=>o.remove()),ga--}},[])}function af(){const r=document.createElement("span");return r.setAttribute("data-radix-focus-guard",""),r.tabIndex=0,r.style.outline="none",r.style.opacity="0",r.style.position="fixed",r.style.pointerEvents="none",r}var Ht=function(){return Ht=Object.assign||function(o){for(var s,c=1,d=arguments.length;c<d;c++){s=arguments[c];for(var f in s)Object.prototype.hasOwnProperty.call(s,f)&&(o[f]=s[f])}return o},Ht.apply(this,arguments)};function Uf(r,o){var s={};for(var c in r)Object.prototype.hasOwnProperty.call(r,c)&&o.indexOf(c)<0&&(s[c]=r[c]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var d=0,c=Object.getOwnPropertySymbols(r);d<c.length;d++)o.indexOf(c[d])<0&&Object.prototype.propertyIsEnumerable.call(r,c[d])&&(s[c[d]]=r[c[d]]);return s}function Bg(r,o,s){if(s||arguments.length===2)for(var c=0,d=o.length,f;c<d;c++)(f||!(c in o))&&(f||(f=Array.prototype.slice.call(o,0,c)),f[c]=o[c]);return r.concat(f||Array.prototype.slice.call(o))}var Vo="right-scroll-bar-position",$o="width-before-scroll-bar",zg="with-scroll-bars-hidden",Fg="--removed-body-scroll-bar-size";function ha(r,o){return typeof r=="function"?r(o):r&&(r.current=o),r}function Ug(r,o){var s=g.useState(function(){return{value:r,callback:o,facade:{get current(){return s.value},set current(c){var d=s.value;d!==c&&(s.value=c,s.callback(c,d))}}}})[0];return s.callback=o,s.facade}var Wg=typeof window<"u"?g.useLayoutEffect:g.useEffect,cf=new WeakMap;function Yg(r,o){var s=Ug(null,function(c){return r.forEach(function(d){return ha(d,c)})});return Wg(function(){var c=cf.get(s);if(c){var d=new Set(c),f=new Set(r),p=s.current;d.forEach(function(_){f.has(_)||ha(_,null)}),f.forEach(function(_){d.has(_)||ha(_,p)})}cf.set(s,r)},[r]),s}function Hg(r){return r}function Vg(r,o){o===void 0&&(o=Hg);var s=[],c=!1,d={read:function(){if(c)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return s.length?s[s.length-1]:r},useMedium:function(f){var p=o(f,c);return s.push(p),function(){s=s.filter(function(_){return _!==p})}},assignSyncMedium:function(f){for(c=!0;s.length;){var p=s;s=[],p.forEach(f)}s={push:function(_){return f(_)},filter:function(){return s}}},assignMedium:function(f){c=!0;var p=[];if(s.length){var _=s;s=[],_.forEach(f),p=s}var h=function(){var y=p;p=[],y.forEach(f)},v=function(){return Promise.resolve().then(h)};v(),s={push:function(y){p.push(y),v()},filter:function(y){return p=p.filter(y),s}}}};return d}function $g(r){r===void 0&&(r={});var o=Vg(null);return o.options=Ht({async:!0,ssr:!1},r),o}var Wf=function(r){var o=r.sideCar,s=Uf(r,["sideCar"]);if(!o)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var c=o.read();if(!c)throw new Error("Sidecar medium not found");return g.createElement(c,Ht({},s))};Wf.isSideCarExport=!0;function Qg(r,o){return r.useMedium(o),Wf}var Yf=$g(),ya=function(){},ls=g.forwardRef(function(r,o){var s=g.useRef(null),c=g.useState({onScrollCapture:ya,onWheelCapture:ya,onTouchMoveCapture:ya}),d=c[0],f=c[1],p=r.forwardProps,_=r.children,h=r.className,v=r.removeScrollBar,y=r.enabled,S=r.shards,k=r.sideCar,D=r.noRelative,R=r.noIsolation,x=r.inert,b=r.allowPinchZoom,j=r.as,P=j===void 0?"div":j,I=r.gapMode,M=Uf(r,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noRelative","noIsolation","inert","allowPinchZoom","as","gapMode"]),z=k,G=Yg([s,o]),Y=Ht(Ht({},M),d);return g.createElement(g.Fragment,null,y&&g.createElement(z,{sideCar:Yf,removeScrollBar:v,shards:S,noRelative:D,noIsolation:R,inert:x,setCallbacks:f,allowPinchZoom:!!b,lockRef:s,gapMode:I}),p?g.cloneElement(g.Children.only(_),Ht(Ht({},Y),{ref:G})):g.createElement(P,Ht({},Y,{className:h,ref:G}),_))});ls.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};ls.classNames={fullWidth:$o,zeroRight:Vo};var Xg=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function Kg(){if(!document)return null;var r=document.createElement("style");r.type="text/css";var o=Xg();return o&&r.setAttribute("nonce",o),r}function Gg(r,o){r.styleSheet?r.styleSheet.cssText=o:r.appendChild(document.createTextNode(o))}function Zg(r){var o=document.head||document.getElementsByTagName("head")[0];o.appendChild(r)}var Jg=function(){var r=0,o=null;return{add:function(s){r==0&&(o=Kg())&&(Gg(o,s),Zg(o)),r++},remove:function(){r--,!r&&o&&(o.parentNode&&o.parentNode.removeChild(o),o=null)}}},qg=function(){var r=Jg();return function(o,s){g.useEffect(function(){return r.add(o),function(){r.remove()}},[o&&s])}},Hf=function(){var r=qg(),o=function(s){var c=s.styles,d=s.dynamic;return r(c,d),null};return o},eh={left:0,top:0,right:0,gap:0},va=function(r){return parseInt(r||"",10)||0},th=function(r){var o=window.getComputedStyle(document.body),s=o[r==="padding"?"paddingLeft":"marginLeft"],c=o[r==="padding"?"paddingTop":"marginTop"],d=o[r==="padding"?"paddingRight":"marginRight"];return[va(s),va(c),va(d)]},nh=function(r){if(r===void 0&&(r="margin"),typeof window>"u")return eh;var o=th(r),s=document.documentElement.clientWidth,c=window.innerWidth;return{left:o[0],top:o[1],right:o[2],gap:Math.max(0,c-s+o[2]-o[0])}},rh=Hf(),Pr="data-scroll-locked",lh=function(r,o,s,c){var d=r.left,f=r.top,p=r.right,_=r.gap;return s===void 0&&(s="margin"),`
  .`.concat(zg,` {
   overflow: hidden `).concat(c,`;
   padding-right: `).concat(_,"px ").concat(c,`;
  }
  body[`).concat(Pr,`] {
    overflow: hidden `).concat(c,`;
    overscroll-behavior: contain;
    `).concat([o&&"position: relative ".concat(c,";"),s==="margin"&&`
    padding-left: `.concat(d,`px;
    padding-top: `).concat(f,`px;
    padding-right: `).concat(p,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(_,"px ").concat(c,`;
    `),s==="padding"&&"padding-right: ".concat(_,"px ").concat(c,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(Vo,` {
    right: `).concat(_,"px ").concat(c,`;
  }
  
  .`).concat($o,` {
    margin-right: `).concat(_,"px ").concat(c,`;
  }
  
  .`).concat(Vo," .").concat(Vo,` {
    right: 0 `).concat(c,`;
  }
  
  .`).concat($o," .").concat($o,` {
    margin-right: 0 `).concat(c,`;
  }
  
  body[`).concat(Pr,`] {
    `).concat(Fg,": ").concat(_,`px;
  }
`)},uf=function(){var r=parseInt(document.body.getAttribute(Pr)||"0",10);return isFinite(r)?r:0},oh=function(){g.useEffect(function(){return document.body.setAttribute(Pr,(uf()+1).toString()),function(){var r=uf()-1;r<=0?document.body.removeAttribute(Pr):document.body.setAttribute(Pr,r.toString())}},[])},sh=function(r){var o=r.noRelative,s=r.noImportant,c=r.gapMode,d=c===void 0?"margin":c;oh();var f=g.useMemo(function(){return nh(d)},[d]);return g.createElement(rh,{styles:lh(f,!o,d,s?"":"!important")})},Ea=!1;if(typeof window<"u")try{var Fo=Object.defineProperty({},"passive",{get:function(){return Ea=!0,!0}});window.addEventListener("test",Fo,Fo),window.removeEventListener("test",Fo,Fo)}catch{Ea=!1}var Er=Ea?{passive:!1}:!1,ih=function(r){return r.tagName==="TEXTAREA"},Vf=function(r,o){if(!(r instanceof Element))return!1;var s=window.getComputedStyle(r);return s[o]!=="hidden"&&!(s.overflowY===s.overflowX&&!ih(r)&&s[o]==="visible")},ah=function(r){return Vf(r,"overflowY")},ch=function(r){return Vf(r,"overflowX")},df=function(r,o){var s=o.ownerDocument,c=o;do{typeof ShadowRoot<"u"&&c instanceof ShadowRoot&&(c=c.host);var d=$f(r,c);if(d){var f=Qf(r,c),p=f[1],_=f[2];if(p>_)return!0}c=c.parentNode}while(c&&c!==s.body);return!1},uh=function(r){var o=r.scrollTop,s=r.scrollHeight,c=r.clientHeight;return[o,s,c]},dh=function(r){var o=r.scrollLeft,s=r.scrollWidth,c=r.clientWidth;return[o,s,c]},$f=function(r,o){return r==="v"?ah(o):ch(o)},Qf=function(r,o){return r==="v"?uh(o):dh(o)},fh=function(r,o){return r==="h"&&o==="rtl"?-1:1},ph=function(r,o,s,c,d){var f=fh(r,window.getComputedStyle(o).direction),p=f*c,_=s.target,h=o.contains(_),v=!1,y=p>0,S=0,k=0;do{if(!_)break;var D=Qf(r,_),R=D[0],x=D[1],b=D[2],j=x-b-f*R;(R||j)&&$f(r,_)&&(S+=j,k+=R);var P=_.parentNode;_=P&&P.nodeType===Node.DOCUMENT_FRAGMENT_NODE?P.host:P}while(!h&&_!==document.body||h&&(o.contains(_)||o===_));return(y&&Math.abs(S)<1||!y&&Math.abs(k)<1)&&(v=!0),v},Uo=function(r){return"changedTouches"in r?[r.changedTouches[0].clientX,r.changedTouches[0].clientY]:[0,0]},ff=function(r){return[r.deltaX,r.deltaY]},pf=function(r){return r&&"current"in r?r.current:r},mh=function(r,o){return r[0]===o[0]&&r[1]===o[1]},_h=function(r){return`
  .block-interactivity-`.concat(r,` {pointer-events: none;}
  .allow-interactivity-`).concat(r,` {pointer-events: all;}
`)},gh=0,Nr=[];function hh(r){var o=g.useRef([]),s=g.useRef([0,0]),c=g.useRef(),d=g.useState(gh++)[0],f=g.useState(Hf)[0],p=g.useRef(r);g.useEffect(function(){p.current=r},[r]),g.useEffect(function(){if(r.inert){document.body.classList.add("block-interactivity-".concat(d));var x=Bg([r.lockRef.current],(r.shards||[]).map(pf),!0).filter(Boolean);return x.forEach(function(b){return b.classList.add("allow-interactivity-".concat(d))}),function(){document.body.classList.remove("block-interactivity-".concat(d)),x.forEach(function(b){return b.classList.remove("allow-interactivity-".concat(d))})}}},[r.inert,r.lockRef.current,r.shards]);var _=g.useCallback(function(x,b){if("touches"in x&&x.touches.length===2||x.type==="wheel"&&x.ctrlKey)return!p.current.allowPinchZoom;var j=Uo(x),P=s.current,I="deltaX"in x?x.deltaX:P[0]-j[0],M="deltaY"in x?x.deltaY:P[1]-j[1],z,G=x.target,Y=Math.abs(I)>Math.abs(M)?"h":"v";if("touches"in x&&Y==="h"&&G.type==="range")return!1;var K=window.getSelection(),fe=K&&K.anchorNode,ue=fe?fe===G||fe.contains(G):!1;if(ue)return!1;var he=df(Y,G);if(!he)return!0;if(he?z=Y:(z=Y==="v"?"h":"v",he=df(Y,G)),!he)return!1;if(!c.current&&"changedTouches"in x&&(I||M)&&(c.current=z),!z)return!0;var pe=c.current||z;return ph(pe,b,x,pe==="h"?I:M)},[]),h=g.useCallback(function(x){var b=x;if(!(!Nr.length||Nr[Nr.length-1]!==f)){var j="deltaY"in b?ff(b):Uo(b),P=o.current.filter(function(z){return z.name===b.type&&(z.target===b.target||b.target===z.shadowParent)&&mh(z.delta,j)})[0];if(P&&P.should){b.cancelable&&b.preventDefault();return}if(!P){var I=(p.current.shards||[]).map(pf).filter(Boolean).filter(function(z){return z.contains(b.target)}),M=I.length>0?_(b,I[0]):!p.current.noIsolation;M&&b.cancelable&&b.preventDefault()}}},[]),v=g.useCallback(function(x,b,j,P){var I={name:x,delta:b,target:j,should:P,shadowParent:yh(j)};o.current.push(I),setTimeout(function(){o.current=o.current.filter(function(M){return M!==I})},1)},[]),y=g.useCallback(function(x){s.current=Uo(x),c.current=void 0},[]),S=g.useCallback(function(x){v(x.type,ff(x),x.target,_(x,r.lockRef.current))},[]),k=g.useCallback(function(x){v(x.type,Uo(x),x.target,_(x,r.lockRef.current))},[]);g.useEffect(function(){return Nr.push(f),r.setCallbacks({onScrollCapture:S,onWheelCapture:S,onTouchMoveCapture:k}),document.addEventListener("wheel",h,Er),document.addEventListener("touchmove",h,Er),document.addEventListener("touchstart",y,Er),function(){Nr=Nr.filter(function(x){return x!==f}),document.removeEventListener("wheel",h,Er),document.removeEventListener("touchmove",h,Er),document.removeEventListener("touchstart",y,Er)}},[]);var D=r.removeScrollBar,R=r.inert;return g.createElement(g.Fragment,null,R?g.createElement(f,{styles:_h(d)}):null,D?g.createElement(sh,{noRelative:r.noRelative,gapMode:r.gapMode}):null)}function yh(r){for(var o=null;r!==null;)r instanceof ShadowRoot&&(o=r.host,r=r.host),r=r.parentNode;return o}const vh=Qg(Yf,hh);var Ua=g.forwardRef(function(r,o){return g.createElement(ls,Ht({},r,{ref:o,sideCar:vh}))});Ua.classNames=ls.classNames;var xh=function(r){if(typeof document>"u")return null;var o=Array.isArray(r)?r[0]:r;return o.ownerDocument.body},Dr=new WeakMap,Wo=new WeakMap,Yo={},xa=0,Xf=function(r){return r&&(r.host||Xf(r.parentNode))},wh=function(r,o){return o.map(function(s){if(r.contains(s))return s;var c=Xf(s);return c&&r.contains(c)?c:(console.error("aria-hidden",s,"in not contained inside",r,". Doing nothing"),null)}).filter(function(s){return!!s})},Sh=function(r,o,s,c){var d=wh(o,Array.isArray(r)?r:[r]);Yo[s]||(Yo[s]=new WeakMap);var f=Yo[s],p=[],_=new Set,h=new Set(d),v=function(S){!S||_.has(S)||(_.add(S),v(S.parentNode))};d.forEach(v);var y=function(S){!S||h.has(S)||Array.prototype.forEach.call(S.children,function(k){if(_.has(k))y(k);else try{var D=k.getAttribute(c),R=D!==null&&D!=="false",x=(Dr.get(k)||0)+1,b=(f.get(k)||0)+1;Dr.set(k,x),f.set(k,b),p.push(k),x===1&&R&&Wo.set(k,!0),b===1&&k.setAttribute(s,"true"),R||k.setAttribute(c,"true")}catch(j){console.error("aria-hidden: cannot operate on ",k,j)}})};return y(o),_.clear(),xa++,function(){p.forEach(function(S){var k=Dr.get(S)-1,D=f.get(S)-1;Dr.set(S,k),f.set(S,D),k||(Wo.has(S)||S.removeAttribute(c),Wo.delete(S)),D||S.removeAttribute(s)}),xa--,xa||(Dr=new WeakMap,Dr=new WeakMap,Wo=new WeakMap,Yo={})}},Kf=function(r,o,s){s===void 0&&(s="data-aria-hidden");var c=Array.from(Array.isArray(r)?r:[r]),d=xh(r);return d?(c.push.apply(c,Array.from(d.querySelectorAll("[aria-live], script"))),Sh(c,d,s,"aria-hidden")):function(){return null}},os="Dialog",[Gf]=ns(os),[bh,Bt]=Gf(os),Zf=r=>{const{__scopeDialog:o,children:s,open:c,defaultOpen:d,onOpenChange:f,modal:p=!0}=r,_=g.useRef(null),h=g.useRef(null),[v,y]=Ca({prop:c,defaultProp:d??!1,onChange:f,caller:os});return u.jsx(bh,{scope:o,triggerRef:_,contentRef:h,contentId:jr(),titleId:jr(),descriptionId:jr(),open:v,onOpenChange:y,onOpenToggle:g.useCallback(()=>y(S=>!S),[y]),modal:p,children:s})};Zf.displayName=os;var Jf="DialogTrigger",Ch=g.forwardRef((r,o)=>{const{__scopeDialog:s,...c}=r,d=Bt(Jf,s),f=Fe(o,d.triggerRef);return u.jsx(Pe.button,{type:"button","aria-haspopup":"dialog","aria-expanded":d.open,"aria-controls":d.contentId,"data-state":Ha(d.open),...c,ref:f,onClick:Oe(r.onClick,d.onOpenToggle)})});Ch.displayName=Jf;var Wa="DialogPortal",[kh,qf]=Gf(Wa,{forceMount:void 0}),ep=r=>{const{__scopeDialog:o,forceMount:s,children:c,container:d}=r,f=Bt(Wa,o);return u.jsx(kh,{scope:o,forceMount:s,children:g.Children.map(c,p=>u.jsx(rs,{present:s||f.open,children:u.jsx(Fa,{asChild:!0,container:d,children:p})}))})};ep.displayName=Wa;var Go="DialogOverlay",tp=g.forwardRef((r,o)=>{const s=qf(Go,r.__scopeDialog),{forceMount:c=s.forceMount,...d}=r,f=Bt(Go,r.__scopeDialog);return f.modal?u.jsx(rs,{present:c||f.open,children:u.jsx(Nh,{...d,ref:o})}):null});tp.displayName=Go;var Eh=Cl("DialogOverlay.RemoveScroll"),Nh=g.forwardRef((r,o)=>{const{__scopeDialog:s,...c}=r,d=Bt(Go,s);return u.jsx(Ua,{as:Eh,allowPinchZoom:!0,shards:[d.contentRef],children:u.jsx(Pe.div,{"data-state":Ha(d.open),...c,ref:o,style:{pointerEvents:"auto",...c.style}})})}),Gn="DialogContent",np=g.forwardRef((r,o)=>{const s=qf(Gn,r.__scopeDialog),{forceMount:c=s.forceMount,...d}=r,f=Bt(Gn,r.__scopeDialog);return u.jsx(rs,{present:c||f.open,children:f.modal?u.jsx(Dh,{...d,ref:o}):u.jsx(jh,{...d,ref:o})})});np.displayName=Gn;var Dh=g.forwardRef((r,o)=>{const s=Bt(Gn,r.__scopeDialog),c=g.useRef(null),d=Fe(o,s.contentRef,c);return g.useEffect(()=>{const f=c.current;if(f)return Kf(f)},[]),u.jsx(rp,{...r,ref:d,trapFocus:s.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:Oe(r.onCloseAutoFocus,f=>{var p;f.preventDefault(),(p=s.triggerRef.current)==null||p.focus()}),onPointerDownOutside:Oe(r.onPointerDownOutside,f=>{const p=f.detail.originalEvent,_=p.button===0&&p.ctrlKey===!0;(p.button===2||_)&&f.preventDefault()}),onFocusOutside:Oe(r.onFocusOutside,f=>f.preventDefault())})}),jh=g.forwardRef((r,o)=>{const s=Bt(Gn,r.__scopeDialog),c=g.useRef(!1),d=g.useRef(!1);return u.jsx(rp,{...r,ref:o,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:f=>{var p,_;(p=r.onCloseAutoFocus)==null||p.call(r,f),f.defaultPrevented||(c.current||(_=s.triggerRef.current)==null||_.focus(),f.preventDefault()),c.current=!1,d.current=!1},onInteractOutside:f=>{var h,v;(h=r.onInteractOutside)==null||h.call(r,f),f.defaultPrevented||(c.current=!0,f.detail.originalEvent.type==="pointerdown"&&(d.current=!0));const p=f.target;((v=s.triggerRef.current)==null?void 0:v.contains(p))&&f.preventDefault(),f.detail.originalEvent.type==="focusin"&&d.current&&f.preventDefault()}})}),rp=g.forwardRef((r,o)=>{const{__scopeDialog:s,trapFocus:c,onOpenAutoFocus:d,onCloseAutoFocus:f,...p}=r,_=Bt(Gn,s),h=g.useRef(null),v=Fe(o,h);return Ff(),u.jsxs(u.Fragment,{children:[u.jsx(za,{asChild:!0,loop:!0,trapped:c,onMountAutoFocus:d,onUnmountAutoFocus:f,children:u.jsx(Ba,{role:"dialog",id:_.contentId,"aria-describedby":_.descriptionId,"aria-labelledby":_.titleId,"data-state":Ha(_.open),...p,ref:v,onDismiss:()=>_.onOpenChange(!1)})}),u.jsxs(u.Fragment,{children:[u.jsx(Ph,{titleId:_.titleId}),u.jsx(Th,{contentRef:h,descriptionId:_.descriptionId})]})]})}),Ya="DialogTitle",lp=g.forwardRef((r,o)=>{const{__scopeDialog:s,...c}=r,d=Bt(Ya,s);return u.jsx(Pe.h2,{id:d.titleId,...c,ref:o})});lp.displayName=Ya;var op="DialogDescription",sp=g.forwardRef((r,o)=>{const{__scopeDialog:s,...c}=r,d=Bt(op,s);return u.jsx(Pe.p,{id:d.descriptionId,...c,ref:o})});sp.displayName=op;var ip="DialogClose",ap=g.forwardRef((r,o)=>{const{__scopeDialog:s,...c}=r,d=Bt(ip,s);return u.jsx(Pe.button,{type:"button",...c,ref:o,onClick:Oe(r.onClick,()=>d.onOpenChange(!1))})});ap.displayName=ip;function Ha(r){return r?"open":"closed"}var cp="DialogTitleWarning",[p1,up]=og(cp,{contentName:Gn,titleName:Ya,docsSlug:"dialog"}),Ph=({titleId:r})=>{const o=up(cp),s=`\`${o.contentName}\` requires a \`${o.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${o.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${o.docsSlug}`;return g.useEffect(()=>{r&&(document.getElementById(r)||console.error(s))},[s,r]),null},Rh="DialogDescriptionWarning",Th=({contentRef:r,descriptionId:o})=>{const c=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${up(Rh).contentName}}.`;return g.useEffect(()=>{var f;const d=(f=r.current)==null?void 0:f.getAttribute("aria-describedby");o&&d&&(document.getElementById(o)||console.warn(c))},[c,r,o]),null},Oh=Zf,Ih=ep,dp=tp,fp=np,pp=lp,mp=sp,Ah=ap;function on(...r){return r.filter(Boolean).join(" ")}const Lh=Oh,Mh=Ih,_p=g.forwardRef(({className:r,...o},s)=>u.jsx(dp,{ref:s,className:on("sheet-overlay",r),...o}));_p.displayName=dp.displayName;const Bh={side:{right:"sheet-content-right",left:"sheet-content-left",top:"sheet-content-top",bottom:"sheet-content-bottom"}},gp=g.forwardRef(({className:r,side:o="right",showCloseButton:s=!0,children:c,...d},f)=>u.jsxs(Mh,{children:[u.jsx(_p,{}),u.jsxs(fp,{ref:f,className:on("sheet-content",Bh.side[o],r),...d,children:[c,s&&u.jsx(Ah,{className:"sheet-close","aria-label":"Close",children:"×"})]})]}));gp.displayName=fp.displayName;const hp=({className:r,...o})=>u.jsx("div",{className:on("sheet-header",r),...o});hp.displayName="SheetHeader";const yp=g.forwardRef(({className:r,...o},s)=>u.jsx(pp,{ref:s,className:on("sheet-title",r),...o}));yp.displayName=pp.displayName;const zh=g.forwardRef(({className:r,...o},s)=>u.jsx(mp,{ref:s,className:on("sheet-description",r),...o}));zh.displayName=mp.displayName;function ss({open:r,onClose:o,title:s,titleIcon:c,titleIconVariant:d="green",children:f}){const p=`modal-title-icon ${d} modal-title-icon-wrap`;return u.jsx(Lh,{open:r,onOpenChange:_=>{_||o()},children:u.jsxs(gp,{side:"right",children:[u.jsx(hp,{children:u.jsxs(yp,{id:"modal-title",children:[c&&u.jsx("span",{className:p,children:c}),s]})}),u.jsx("div",{className:"sheet-content-inner",children:f})]})})}function mf(r,[o,s]){return Math.min(s,Math.max(o,r))}function Fh(r){const o=r+"CollectionProvider",[s,c]=ns(o),[d,f]=s(o,{collectionRef:{current:null},itemMap:new Map}),p=x=>{const{scope:b,children:j}=x,P=Dn.useRef(null),I=Dn.useRef(new Map).current;return u.jsx(d,{scope:b,itemMap:I,collectionRef:P,children:j})};p.displayName=o;const _=r+"CollectionSlot",h=Cl(_),v=Dn.forwardRef((x,b)=>{const{scope:j,children:P}=x,I=f(_,j),M=Fe(b,I.collectionRef);return u.jsx(h,{ref:M,children:P})});v.displayName=_;const y=r+"CollectionItemSlot",S="data-radix-collection-item",k=Cl(y),D=Dn.forwardRef((x,b)=>{const{scope:j,children:P,...I}=x,M=Dn.useRef(null),z=Fe(b,M),G=f(y,j);return Dn.useEffect(()=>(G.itemMap.set(M,{ref:M,...I}),()=>void G.itemMap.delete(M))),u.jsx(k,{[S]:"",ref:z,children:P})});D.displayName=y;function R(x){const b=f(r+"CollectionConsumer",x);return Dn.useCallback(()=>{const P=b.collectionRef.current;if(!P)return[];const I=Array.from(P.querySelectorAll(`[${S}]`));return Array.from(b.itemMap.values()).sort((G,Y)=>I.indexOf(G.ref.current)-I.indexOf(Y.ref.current))},[b.collectionRef,b.itemMap])}return[{Provider:p,Slot:v,ItemSlot:D},R,c]}var Uh=g.createContext(void 0);function Wh(r){const o=g.useContext(Uh);return r||o||"ltr"}const Yh=["top","right","bottom","left"],Pn=Math.min,gt=Math.max,Zo=Math.round,Ho=Math.floor,$t=r=>({x:r,y:r}),Hh={left:"right",right:"left",bottom:"top",top:"bottom"},Vh={start:"end",end:"start"};function Na(r,o,s){return gt(r,Pn(o,s))}function sn(r,o){return typeof r=="function"?r(o):r}function an(r){return r.split("-")[0]}function Ir(r){return r.split("-")[1]}function Va(r){return r==="x"?"y":"x"}function $a(r){return r==="y"?"height":"width"}const $h=new Set(["top","bottom"]);function Vt(r){return $h.has(an(r))?"y":"x"}function Qa(r){return Va(Vt(r))}function Qh(r,o,s){s===void 0&&(s=!1);const c=Ir(r),d=Qa(r),f=$a(d);let p=d==="x"?c===(s?"end":"start")?"right":"left":c==="start"?"bottom":"top";return o.reference[f]>o.floating[f]&&(p=Jo(p)),[p,Jo(p)]}function Xh(r){const o=Jo(r);return[Da(r),o,Da(o)]}function Da(r){return r.replace(/start|end/g,o=>Vh[o])}const _f=["left","right"],gf=["right","left"],Kh=["top","bottom"],Gh=["bottom","top"];function Zh(r,o,s){switch(r){case"top":case"bottom":return s?o?gf:_f:o?_f:gf;case"left":case"right":return o?Kh:Gh;default:return[]}}function Jh(r,o,s,c){const d=Ir(r);let f=Zh(an(r),s==="start",c);return d&&(f=f.map(p=>p+"-"+d),o&&(f=f.concat(f.map(Da)))),f}function Jo(r){return r.replace(/left|right|bottom|top/g,o=>Hh[o])}function qh(r){return{top:0,right:0,bottom:0,left:0,...r}}function vp(r){return typeof r!="number"?qh(r):{top:r,right:r,bottom:r,left:r}}function qo(r){const{x:o,y:s,width:c,height:d}=r;return{width:c,height:d,top:s,left:o,right:o+c,bottom:s+d,x:o,y:s}}function hf(r,o,s){let{reference:c,floating:d}=r;const f=Vt(o),p=Qa(o),_=$a(p),h=an(o),v=f==="y",y=c.x+c.width/2-d.width/2,S=c.y+c.height/2-d.height/2,k=c[_]/2-d[_]/2;let D;switch(h){case"top":D={x:y,y:c.y-d.height};break;case"bottom":D={x:y,y:c.y+c.height};break;case"right":D={x:c.x+c.width,y:S};break;case"left":D={x:c.x-d.width,y:S};break;default:D={x:c.x,y:c.y}}switch(Ir(o)){case"start":D[p]-=k*(s&&v?-1:1);break;case"end":D[p]+=k*(s&&v?-1:1);break}return D}async function ey(r,o){var s;o===void 0&&(o={});const{x:c,y:d,platform:f,rects:p,elements:_,strategy:h}=r,{boundary:v="clippingAncestors",rootBoundary:y="viewport",elementContext:S="floating",altBoundary:k=!1,padding:D=0}=sn(o,r),R=vp(D),b=_[k?S==="floating"?"reference":"floating":S],j=qo(await f.getClippingRect({element:(s=await(f.isElement==null?void 0:f.isElement(b)))==null||s?b:b.contextElement||await(f.getDocumentElement==null?void 0:f.getDocumentElement(_.floating)),boundary:v,rootBoundary:y,strategy:h})),P=S==="floating"?{x:c,y:d,width:p.floating.width,height:p.floating.height}:p.reference,I=await(f.getOffsetParent==null?void 0:f.getOffsetParent(_.floating)),M=await(f.isElement==null?void 0:f.isElement(I))?await(f.getScale==null?void 0:f.getScale(I))||{x:1,y:1}:{x:1,y:1},z=qo(f.convertOffsetParentRelativeRectToViewportRelativeRect?await f.convertOffsetParentRelativeRectToViewportRelativeRect({elements:_,rect:P,offsetParent:I,strategy:h}):P);return{top:(j.top-z.top+R.top)/M.y,bottom:(z.bottom-j.bottom+R.bottom)/M.y,left:(j.left-z.left+R.left)/M.x,right:(z.right-j.right+R.right)/M.x}}const ty=async(r,o,s)=>{const{placement:c="bottom",strategy:d="absolute",middleware:f=[],platform:p}=s,_=f.filter(Boolean),h=await(p.isRTL==null?void 0:p.isRTL(o));let v=await p.getElementRects({reference:r,floating:o,strategy:d}),{x:y,y:S}=hf(v,c,h),k=c,D={},R=0;for(let b=0;b<_.length;b++){var x;const{name:j,fn:P}=_[b],{x:I,y:M,data:z,reset:G}=await P({x:y,y:S,initialPlacement:c,placement:k,strategy:d,middlewareData:D,rects:v,platform:{...p,detectOverflow:(x=p.detectOverflow)!=null?x:ey},elements:{reference:r,floating:o}});y=I??y,S=M??S,D={...D,[j]:{...D[j],...z}},G&&R<=50&&(R++,typeof G=="object"&&(G.placement&&(k=G.placement),G.rects&&(v=G.rects===!0?await p.getElementRects({reference:r,floating:o,strategy:d}):G.rects),{x:y,y:S}=hf(v,k,h)),b=-1)}return{x:y,y:S,placement:k,strategy:d,middlewareData:D}},ny=r=>({name:"arrow",options:r,async fn(o){const{x:s,y:c,placement:d,rects:f,platform:p,elements:_,middlewareData:h}=o,{element:v,padding:y=0}=sn(r,o)||{};if(v==null)return{};const S=vp(y),k={x:s,y:c},D=Qa(d),R=$a(D),x=await p.getDimensions(v),b=D==="y",j=b?"top":"left",P=b?"bottom":"right",I=b?"clientHeight":"clientWidth",M=f.reference[R]+f.reference[D]-k[D]-f.floating[R],z=k[D]-f.reference[D],G=await(p.getOffsetParent==null?void 0:p.getOffsetParent(v));let Y=G?G[I]:0;(!Y||!await(p.isElement==null?void 0:p.isElement(G)))&&(Y=_.floating[I]||f.floating[R]);const K=M/2-z/2,fe=Y/2-x[R]/2-1,ue=Pn(S[j],fe),he=Pn(S[P],fe),pe=ue,me=Y-x[R]-he,_e=Y/2-x[R]/2+K,xe=Na(pe,_e,me),ce=!h.arrow&&Ir(d)!=null&&_e!==xe&&f.reference[R]/2-(_e<pe?ue:he)-x[R]/2<0,se=ce?_e<pe?_e-pe:_e-me:0;return{[D]:k[D]+se,data:{[D]:xe,centerOffset:_e-xe-se,...ce&&{alignmentOffset:se}},reset:ce}}}),ry=function(r){return r===void 0&&(r={}),{name:"flip",options:r,async fn(o){var s,c;const{placement:d,middlewareData:f,rects:p,initialPlacement:_,platform:h,elements:v}=o,{mainAxis:y=!0,crossAxis:S=!0,fallbackPlacements:k,fallbackStrategy:D="bestFit",fallbackAxisSideDirection:R="none",flipAlignment:x=!0,...b}=sn(r,o);if((s=f.arrow)!=null&&s.alignmentOffset)return{};const j=an(d),P=Vt(_),I=an(_)===_,M=await(h.isRTL==null?void 0:h.isRTL(v.floating)),z=k||(I||!x?[Jo(_)]:Xh(_)),G=R!=="none";!k&&G&&z.push(...Jh(_,x,R,M));const Y=[_,...z],K=await h.detectOverflow(o,b),fe=[];let ue=((c=f.flip)==null?void 0:c.overflows)||[];if(y&&fe.push(K[j]),S){const _e=Qh(d,p,M);fe.push(K[_e[0]],K[_e[1]])}if(ue=[...ue,{placement:d,overflows:fe}],!fe.every(_e=>_e<=0)){var he,pe;const _e=(((he=f.flip)==null?void 0:he.index)||0)+1,xe=Y[_e];if(xe&&(!(S==="alignment"?P!==Vt(xe):!1)||ue.every(L=>Vt(L.placement)===P?L.overflows[0]>0:!0)))return{data:{index:_e,overflows:ue},reset:{placement:xe}};let ce=(pe=ue.filter(se=>se.overflows[0]<=0).sort((se,L)=>se.overflows[1]-L.overflows[1])[0])==null?void 0:pe.placement;if(!ce)switch(D){case"bestFit":{var me;const se=(me=ue.filter(L=>{if(G){const F=Vt(L.placement);return F===P||F==="y"}return!0}).map(L=>[L.placement,L.overflows.filter(F=>F>0).reduce((F,V)=>F+V,0)]).sort((L,F)=>L[1]-F[1])[0])==null?void 0:me[0];se&&(ce=se);break}case"initialPlacement":ce=_;break}if(d!==ce)return{reset:{placement:ce}}}return{}}}};function yf(r,o){return{top:r.top-o.height,right:r.right-o.width,bottom:r.bottom-o.height,left:r.left-o.width}}function vf(r){return Yh.some(o=>r[o]>=0)}const ly=function(r){return r===void 0&&(r={}),{name:"hide",options:r,async fn(o){const{rects:s,platform:c}=o,{strategy:d="referenceHidden",...f}=sn(r,o);switch(d){case"referenceHidden":{const p=await c.detectOverflow(o,{...f,elementContext:"reference"}),_=yf(p,s.reference);return{data:{referenceHiddenOffsets:_,referenceHidden:vf(_)}}}case"escaped":{const p=await c.detectOverflow(o,{...f,altBoundary:!0}),_=yf(p,s.floating);return{data:{escapedOffsets:_,escaped:vf(_)}}}default:return{}}}}},xp=new Set(["left","top"]);async function oy(r,o){const{placement:s,platform:c,elements:d}=r,f=await(c.isRTL==null?void 0:c.isRTL(d.floating)),p=an(s),_=Ir(s),h=Vt(s)==="y",v=xp.has(p)?-1:1,y=f&&h?-1:1,S=sn(o,r);let{mainAxis:k,crossAxis:D,alignmentAxis:R}=typeof S=="number"?{mainAxis:S,crossAxis:0,alignmentAxis:null}:{mainAxis:S.mainAxis||0,crossAxis:S.crossAxis||0,alignmentAxis:S.alignmentAxis};return _&&typeof R=="number"&&(D=_==="end"?R*-1:R),h?{x:D*y,y:k*v}:{x:k*v,y:D*y}}const sy=function(r){return r===void 0&&(r=0),{name:"offset",options:r,async fn(o){var s,c;const{x:d,y:f,placement:p,middlewareData:_}=o,h=await oy(o,r);return p===((s=_.offset)==null?void 0:s.placement)&&(c=_.arrow)!=null&&c.alignmentOffset?{}:{x:d+h.x,y:f+h.y,data:{...h,placement:p}}}}},iy=function(r){return r===void 0&&(r={}),{name:"shift",options:r,async fn(o){const{x:s,y:c,placement:d,platform:f}=o,{mainAxis:p=!0,crossAxis:_=!1,limiter:h={fn:j=>{let{x:P,y:I}=j;return{x:P,y:I}}},...v}=sn(r,o),y={x:s,y:c},S=await f.detectOverflow(o,v),k=Vt(an(d)),D=Va(k);let R=y[D],x=y[k];if(p){const j=D==="y"?"top":"left",P=D==="y"?"bottom":"right",I=R+S[j],M=R-S[P];R=Na(I,R,M)}if(_){const j=k==="y"?"top":"left",P=k==="y"?"bottom":"right",I=x+S[j],M=x-S[P];x=Na(I,x,M)}const b=h.fn({...o,[D]:R,[k]:x});return{...b,data:{x:b.x-s,y:b.y-c,enabled:{[D]:p,[k]:_}}}}}},ay=function(r){return r===void 0&&(r={}),{options:r,fn(o){const{x:s,y:c,placement:d,rects:f,middlewareData:p}=o,{offset:_=0,mainAxis:h=!0,crossAxis:v=!0}=sn(r,o),y={x:s,y:c},S=Vt(d),k=Va(S);let D=y[k],R=y[S];const x=sn(_,o),b=typeof x=="number"?{mainAxis:x,crossAxis:0}:{mainAxis:0,crossAxis:0,...x};if(h){const I=k==="y"?"height":"width",M=f.reference[k]-f.floating[I]+b.mainAxis,z=f.reference[k]+f.reference[I]-b.mainAxis;D<M?D=M:D>z&&(D=z)}if(v){var j,P;const I=k==="y"?"width":"height",M=xp.has(an(d)),z=f.reference[S]-f.floating[I]+(M&&((j=p.offset)==null?void 0:j[S])||0)+(M?0:b.crossAxis),G=f.reference[S]+f.reference[I]+(M?0:((P=p.offset)==null?void 0:P[S])||0)-(M?b.crossAxis:0);R<z?R=z:R>G&&(R=G)}return{[k]:D,[S]:R}}}},cy=function(r){return r===void 0&&(r={}),{name:"size",options:r,async fn(o){var s,c;const{placement:d,rects:f,platform:p,elements:_}=o,{apply:h=()=>{},...v}=sn(r,o),y=await p.detectOverflow(o,v),S=an(d),k=Ir(d),D=Vt(d)==="y",{width:R,height:x}=f.floating;let b,j;S==="top"||S==="bottom"?(b=S,j=k===(await(p.isRTL==null?void 0:p.isRTL(_.floating))?"start":"end")?"left":"right"):(j=S,b=k==="end"?"top":"bottom");const P=x-y.top-y.bottom,I=R-y.left-y.right,M=Pn(x-y[b],P),z=Pn(R-y[j],I),G=!o.middlewareData.shift;let Y=M,K=z;if((s=o.middlewareData.shift)!=null&&s.enabled.x&&(K=I),(c=o.middlewareData.shift)!=null&&c.enabled.y&&(Y=P),G&&!k){const ue=gt(y.left,0),he=gt(y.right,0),pe=gt(y.top,0),me=gt(y.bottom,0);D?K=R-2*(ue!==0||he!==0?ue+he:gt(y.left,y.right)):Y=x-2*(pe!==0||me!==0?pe+me:gt(y.top,y.bottom))}await h({...o,availableWidth:K,availableHeight:Y});const fe=await p.getDimensions(_.floating);return R!==fe.width||x!==fe.height?{reset:{rects:!0}}:{}}}};function is(){return typeof window<"u"}function Ar(r){return wp(r)?(r.nodeName||"").toLowerCase():"#document"}function ht(r){var o;return(r==null||(o=r.ownerDocument)==null?void 0:o.defaultView)||window}function Kt(r){var o;return(o=(wp(r)?r.ownerDocument:r.document)||window.document)==null?void 0:o.documentElement}function wp(r){return is()?r instanceof Node||r instanceof ht(r).Node:!1}function Lt(r){return is()?r instanceof Element||r instanceof ht(r).Element:!1}function Xt(r){return is()?r instanceof HTMLElement||r instanceof ht(r).HTMLElement:!1}function xf(r){return!is()||typeof ShadowRoot>"u"?!1:r instanceof ShadowRoot||r instanceof ht(r).ShadowRoot}const uy=new Set(["inline","contents"]);function El(r){const{overflow:o,overflowX:s,overflowY:c,display:d}=Mt(r);return/auto|scroll|overlay|hidden|clip/.test(o+c+s)&&!uy.has(d)}const dy=new Set(["table","td","th"]);function fy(r){return dy.has(Ar(r))}const py=[":popover-open",":modal"];function as(r){return py.some(o=>{try{return r.matches(o)}catch{return!1}})}const my=["transform","translate","scale","rotate","perspective"],_y=["transform","translate","scale","rotate","perspective","filter"],gy=["paint","layout","strict","content"];function Xa(r){const o=Ka(),s=Lt(r)?Mt(r):r;return my.some(c=>s[c]?s[c]!=="none":!1)||(s.containerType?s.containerType!=="normal":!1)||!o&&(s.backdropFilter?s.backdropFilter!=="none":!1)||!o&&(s.filter?s.filter!=="none":!1)||_y.some(c=>(s.willChange||"").includes(c))||gy.some(c=>(s.contain||"").includes(c))}function hy(r){let o=Rn(r);for(;Xt(o)&&!Tr(o);){if(Xa(o))return o;if(as(o))return null;o=Rn(o)}return null}function Ka(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}const yy=new Set(["html","body","#document"]);function Tr(r){return yy.has(Ar(r))}function Mt(r){return ht(r).getComputedStyle(r)}function cs(r){return Lt(r)?{scrollLeft:r.scrollLeft,scrollTop:r.scrollTop}:{scrollLeft:r.scrollX,scrollTop:r.scrollY}}function Rn(r){if(Ar(r)==="html")return r;const o=r.assignedSlot||r.parentNode||xf(r)&&r.host||Kt(r);return xf(o)?o.host:o}function Sp(r){const o=Rn(r);return Tr(o)?r.ownerDocument?r.ownerDocument.body:r.body:Xt(o)&&El(o)?o:Sp(o)}function kl(r,o,s){var c;o===void 0&&(o=[]),s===void 0&&(s=!0);const d=Sp(r),f=d===((c=r.ownerDocument)==null?void 0:c.body),p=ht(d);if(f){const _=ja(p);return o.concat(p,p.visualViewport||[],El(d)?d:[],_&&s?kl(_):[])}return o.concat(d,kl(d,[],s))}function ja(r){return r.parent&&Object.getPrototypeOf(r.parent)?r.frameElement:null}function bp(r){const o=Mt(r);let s=parseFloat(o.width)||0,c=parseFloat(o.height)||0;const d=Xt(r),f=d?r.offsetWidth:s,p=d?r.offsetHeight:c,_=Zo(s)!==f||Zo(c)!==p;return _&&(s=f,c=p),{width:s,height:c,$:_}}function Ga(r){return Lt(r)?r:r.contextElement}function Rr(r){const o=Ga(r);if(!Xt(o))return $t(1);const s=o.getBoundingClientRect(),{width:c,height:d,$:f}=bp(o);let p=(f?Zo(s.width):s.width)/c,_=(f?Zo(s.height):s.height)/d;return(!p||!Number.isFinite(p))&&(p=1),(!_||!Number.isFinite(_))&&(_=1),{x:p,y:_}}const vy=$t(0);function Cp(r){const o=ht(r);return!Ka()||!o.visualViewport?vy:{x:o.visualViewport.offsetLeft,y:o.visualViewport.offsetTop}}function xy(r,o,s){return o===void 0&&(o=!1),!s||o&&s!==ht(r)?!1:o}function Zn(r,o,s,c){o===void 0&&(o=!1),s===void 0&&(s=!1);const d=r.getBoundingClientRect(),f=Ga(r);let p=$t(1);o&&(c?Lt(c)&&(p=Rr(c)):p=Rr(r));const _=xy(f,s,c)?Cp(f):$t(0);let h=(d.left+_.x)/p.x,v=(d.top+_.y)/p.y,y=d.width/p.x,S=d.height/p.y;if(f){const k=ht(f),D=c&&Lt(c)?ht(c):c;let R=k,x=ja(R);for(;x&&c&&D!==R;){const b=Rr(x),j=x.getBoundingClientRect(),P=Mt(x),I=j.left+(x.clientLeft+parseFloat(P.paddingLeft))*b.x,M=j.top+(x.clientTop+parseFloat(P.paddingTop))*b.y;h*=b.x,v*=b.y,y*=b.x,S*=b.y,h+=I,v+=M,R=ht(x),x=ja(R)}}return qo({width:y,height:S,x:h,y:v})}function us(r,o){const s=cs(r).scrollLeft;return o?o.left+s:Zn(Kt(r)).left+s}function kp(r,o){const s=r.getBoundingClientRect(),c=s.left+o.scrollLeft-us(r,s),d=s.top+o.scrollTop;return{x:c,y:d}}function wy(r){let{elements:o,rect:s,offsetParent:c,strategy:d}=r;const f=d==="fixed",p=Kt(c),_=o?as(o.floating):!1;if(c===p||_&&f)return s;let h={scrollLeft:0,scrollTop:0},v=$t(1);const y=$t(0),S=Xt(c);if((S||!S&&!f)&&((Ar(c)!=="body"||El(p))&&(h=cs(c)),Xt(c))){const D=Zn(c);v=Rr(c),y.x=D.x+c.clientLeft,y.y=D.y+c.clientTop}const k=p&&!S&&!f?kp(p,h):$t(0);return{width:s.width*v.x,height:s.height*v.y,x:s.x*v.x-h.scrollLeft*v.x+y.x+k.x,y:s.y*v.y-h.scrollTop*v.y+y.y+k.y}}function Sy(r){return Array.from(r.getClientRects())}function by(r){const o=Kt(r),s=cs(r),c=r.ownerDocument.body,d=gt(o.scrollWidth,o.clientWidth,c.scrollWidth,c.clientWidth),f=gt(o.scrollHeight,o.clientHeight,c.scrollHeight,c.clientHeight);let p=-s.scrollLeft+us(r);const _=-s.scrollTop;return Mt(c).direction==="rtl"&&(p+=gt(o.clientWidth,c.clientWidth)-d),{width:d,height:f,x:p,y:_}}const wf=25;function Cy(r,o){const s=ht(r),c=Kt(r),d=s.visualViewport;let f=c.clientWidth,p=c.clientHeight,_=0,h=0;if(d){f=d.width,p=d.height;const y=Ka();(!y||y&&o==="fixed")&&(_=d.offsetLeft,h=d.offsetTop)}const v=us(c);if(v<=0){const y=c.ownerDocument,S=y.body,k=getComputedStyle(S),D=y.compatMode==="CSS1Compat"&&parseFloat(k.marginLeft)+parseFloat(k.marginRight)||0,R=Math.abs(c.clientWidth-S.clientWidth-D);R<=wf&&(f-=R)}else v<=wf&&(f+=v);return{width:f,height:p,x:_,y:h}}const ky=new Set(["absolute","fixed"]);function Ey(r,o){const s=Zn(r,!0,o==="fixed"),c=s.top+r.clientTop,d=s.left+r.clientLeft,f=Xt(r)?Rr(r):$t(1),p=r.clientWidth*f.x,_=r.clientHeight*f.y,h=d*f.x,v=c*f.y;return{width:p,height:_,x:h,y:v}}function Sf(r,o,s){let c;if(o==="viewport")c=Cy(r,s);else if(o==="document")c=by(Kt(r));else if(Lt(o))c=Ey(o,s);else{const d=Cp(r);c={x:o.x-d.x,y:o.y-d.y,width:o.width,height:o.height}}return qo(c)}function Ep(r,o){const s=Rn(r);return s===o||!Lt(s)||Tr(s)?!1:Mt(s).position==="fixed"||Ep(s,o)}function Ny(r,o){const s=o.get(r);if(s)return s;let c=kl(r,[],!1).filter(_=>Lt(_)&&Ar(_)!=="body"),d=null;const f=Mt(r).position==="fixed";let p=f?Rn(r):r;for(;Lt(p)&&!Tr(p);){const _=Mt(p),h=Xa(p);!h&&_.position==="fixed"&&(d=null),(f?!h&&!d:!h&&_.position==="static"&&!!d&&ky.has(d.position)||El(p)&&!h&&Ep(r,p))?c=c.filter(y=>y!==p):d=_,p=Rn(p)}return o.set(r,c),c}function Dy(r){let{element:o,boundary:s,rootBoundary:c,strategy:d}=r;const p=[...s==="clippingAncestors"?as(o)?[]:Ny(o,this._c):[].concat(s),c],_=p[0],h=p.reduce((v,y)=>{const S=Sf(o,y,d);return v.top=gt(S.top,v.top),v.right=Pn(S.right,v.right),v.bottom=Pn(S.bottom,v.bottom),v.left=gt(S.left,v.left),v},Sf(o,_,d));return{width:h.right-h.left,height:h.bottom-h.top,x:h.left,y:h.top}}function jy(r){const{width:o,height:s}=bp(r);return{width:o,height:s}}function Py(r,o,s){const c=Xt(o),d=Kt(o),f=s==="fixed",p=Zn(r,!0,f,o);let _={scrollLeft:0,scrollTop:0};const h=$t(0);function v(){h.x=us(d)}if(c||!c&&!f)if((Ar(o)!=="body"||El(d))&&(_=cs(o)),c){const D=Zn(o,!0,f,o);h.x=D.x+o.clientLeft,h.y=D.y+o.clientTop}else d&&v();f&&!c&&d&&v();const y=d&&!c&&!f?kp(d,_):$t(0),S=p.left+_.scrollLeft-h.x-y.x,k=p.top+_.scrollTop-h.y-y.y;return{x:S,y:k,width:p.width,height:p.height}}function wa(r){return Mt(r).position==="static"}function bf(r,o){if(!Xt(r)||Mt(r).position==="fixed")return null;if(o)return o(r);let s=r.offsetParent;return Kt(r)===s&&(s=s.ownerDocument.body),s}function Np(r,o){const s=ht(r);if(as(r))return s;if(!Xt(r)){let d=Rn(r);for(;d&&!Tr(d);){if(Lt(d)&&!wa(d))return d;d=Rn(d)}return s}let c=bf(r,o);for(;c&&fy(c)&&wa(c);)c=bf(c,o);return c&&Tr(c)&&wa(c)&&!Xa(c)?s:c||hy(r)||s}const Ry=async function(r){const o=this.getOffsetParent||Np,s=this.getDimensions,c=await s(r.floating);return{reference:Py(r.reference,await o(r.floating),r.strategy),floating:{x:0,y:0,width:c.width,height:c.height}}};function Ty(r){return Mt(r).direction==="rtl"}const Oy={convertOffsetParentRelativeRectToViewportRelativeRect:wy,getDocumentElement:Kt,getClippingRect:Dy,getOffsetParent:Np,getElementRects:Ry,getClientRects:Sy,getDimensions:jy,getScale:Rr,isElement:Lt,isRTL:Ty};function Dp(r,o){return r.x===o.x&&r.y===o.y&&r.width===o.width&&r.height===o.height}function Iy(r,o){let s=null,c;const d=Kt(r);function f(){var _;clearTimeout(c),(_=s)==null||_.disconnect(),s=null}function p(_,h){_===void 0&&(_=!1),h===void 0&&(h=1),f();const v=r.getBoundingClientRect(),{left:y,top:S,width:k,height:D}=v;if(_||o(),!k||!D)return;const R=Ho(S),x=Ho(d.clientWidth-(y+k)),b=Ho(d.clientHeight-(S+D)),j=Ho(y),I={rootMargin:-R+"px "+-x+"px "+-b+"px "+-j+"px",threshold:gt(0,Pn(1,h))||1};let M=!0;function z(G){const Y=G[0].intersectionRatio;if(Y!==h){if(!M)return p();Y?p(!1,Y):c=setTimeout(()=>{p(!1,1e-7)},1e3)}Y===1&&!Dp(v,r.getBoundingClientRect())&&p(),M=!1}try{s=new IntersectionObserver(z,{...I,root:d.ownerDocument})}catch{s=new IntersectionObserver(z,I)}s.observe(r)}return p(!0),f}function Ay(r,o,s,c){c===void 0&&(c={});const{ancestorScroll:d=!0,ancestorResize:f=!0,elementResize:p=typeof ResizeObserver=="function",layoutShift:_=typeof IntersectionObserver=="function",animationFrame:h=!1}=c,v=Ga(r),y=d||f?[...v?kl(v):[],...kl(o)]:[];y.forEach(j=>{d&&j.addEventListener("scroll",s,{passive:!0}),f&&j.addEventListener("resize",s)});const S=v&&_?Iy(v,s):null;let k=-1,D=null;p&&(D=new ResizeObserver(j=>{let[P]=j;P&&P.target===v&&D&&(D.unobserve(o),cancelAnimationFrame(k),k=requestAnimationFrame(()=>{var I;(I=D)==null||I.observe(o)})),s()}),v&&!h&&D.observe(v),D.observe(o));let R,x=h?Zn(r):null;h&&b();function b(){const j=Zn(r);x&&!Dp(x,j)&&s(),x=j,R=requestAnimationFrame(b)}return s(),()=>{var j;y.forEach(P=>{d&&P.removeEventListener("scroll",s),f&&P.removeEventListener("resize",s)}),S==null||S(),(j=D)==null||j.disconnect(),D=null,h&&cancelAnimationFrame(R)}}const Ly=sy,My=iy,By=ry,zy=cy,Fy=ly,Cf=ny,Uy=ay,Wy=(r,o,s)=>{const c=new Map,d={platform:Oy,...s},f={...d.platform,_c:c};return ty(r,o,{...d,platform:f})};var Yy=typeof document<"u",Hy=function(){},Qo=Yy?g.useLayoutEffect:Hy;function es(r,o){if(r===o)return!0;if(typeof r!=typeof o)return!1;if(typeof r=="function"&&r.toString()===o.toString())return!0;let s,c,d;if(r&&o&&typeof r=="object"){if(Array.isArray(r)){if(s=r.length,s!==o.length)return!1;for(c=s;c--!==0;)if(!es(r[c],o[c]))return!1;return!0}if(d=Object.keys(r),s=d.length,s!==Object.keys(o).length)return!1;for(c=s;c--!==0;)if(!{}.hasOwnProperty.call(o,d[c]))return!1;for(c=s;c--!==0;){const f=d[c];if(!(f==="_owner"&&r.$$typeof)&&!es(r[f],o[f]))return!1}return!0}return r!==r&&o!==o}function jp(r){return typeof window>"u"?1:(r.ownerDocument.defaultView||window).devicePixelRatio||1}function kf(r,o){const s=jp(r);return Math.round(o*s)/s}function Sa(r){const o=g.useRef(r);return Qo(()=>{o.current=r}),o}function Vy(r){r===void 0&&(r={});const{placement:o="bottom",strategy:s="absolute",middleware:c=[],platform:d,elements:{reference:f,floating:p}={},transform:_=!0,whileElementsMounted:h,open:v}=r,[y,S]=g.useState({x:0,y:0,strategy:s,placement:o,middlewareData:{},isPositioned:!1}),[k,D]=g.useState(c);es(k,c)||D(c);const[R,x]=g.useState(null),[b,j]=g.useState(null),P=g.useCallback(L=>{L!==G.current&&(G.current=L,x(L))},[]),I=g.useCallback(L=>{L!==Y.current&&(Y.current=L,j(L))},[]),M=f||R,z=p||b,G=g.useRef(null),Y=g.useRef(null),K=g.useRef(y),fe=h!=null,ue=Sa(h),he=Sa(d),pe=Sa(v),me=g.useCallback(()=>{if(!G.current||!Y.current)return;const L={placement:o,strategy:s,middleware:k};he.current&&(L.platform=he.current),Wy(G.current,Y.current,L).then(F=>{const V={...F,isPositioned:pe.current!==!1};_e.current&&!es(K.current,V)&&(K.current=V,Or.flushSync(()=>{S(V)}))})},[k,o,s,he,pe]);Qo(()=>{v===!1&&K.current.isPositioned&&(K.current.isPositioned=!1,S(L=>({...L,isPositioned:!1})))},[v]);const _e=g.useRef(!1);Qo(()=>(_e.current=!0,()=>{_e.current=!1}),[]),Qo(()=>{if(M&&(G.current=M),z&&(Y.current=z),M&&z){if(ue.current)return ue.current(M,z,me);me()}},[M,z,me,ue,fe]);const xe=g.useMemo(()=>({reference:G,floating:Y,setReference:P,setFloating:I}),[P,I]),ce=g.useMemo(()=>({reference:M,floating:z}),[M,z]),se=g.useMemo(()=>{const L={position:s,left:0,top:0};if(!ce.floating)return L;const F=kf(ce.floating,y.x),V=kf(ce.floating,y.y);return _?{...L,transform:"translate("+F+"px, "+V+"px)",...jp(ce.floating)>=1.5&&{willChange:"transform"}}:{position:s,left:F,top:V}},[s,_,ce.floating,y.x,y.y]);return g.useMemo(()=>({...y,update:me,refs:xe,elements:ce,floatingStyles:se}),[y,me,xe,ce,se])}const $y=r=>{function o(s){return{}.hasOwnProperty.call(s,"current")}return{name:"arrow",options:r,fn(s){const{element:c,padding:d}=typeof r=="function"?r(s):r;return c&&o(c)?c.current!=null?Cf({element:c.current,padding:d}).fn(s):{}:c?Cf({element:c,padding:d}).fn(s):{}}}},Qy=(r,o)=>({...Ly(r),options:[r,o]}),Xy=(r,o)=>({...My(r),options:[r,o]}),Ky=(r,o)=>({...Uy(r),options:[r,o]}),Gy=(r,o)=>({...By(r),options:[r,o]}),Zy=(r,o)=>({...zy(r),options:[r,o]}),Jy=(r,o)=>({...Fy(r),options:[r,o]}),qy=(r,o)=>({...$y(r),options:[r,o]});var ev="Arrow",Pp=g.forwardRef((r,o)=>{const{children:s,width:c=10,height:d=5,...f}=r;return u.jsx(Pe.svg,{...f,ref:o,width:c,height:d,viewBox:"0 0 30 10",preserveAspectRatio:"none",children:r.asChild?s:u.jsx("polygon",{points:"0,0 30,0 15,10"})})});Pp.displayName=ev;var tv=Pp;function nv(r){const[o,s]=g.useState(void 0);return rt(()=>{if(r){s({width:r.offsetWidth,height:r.offsetHeight});const c=new ResizeObserver(d=>{if(!Array.isArray(d)||!d.length)return;const f=d[0];let p,_;if("borderBoxSize"in f){const h=f.borderBoxSize,v=Array.isArray(h)?h[0]:h;p=v.inlineSize,_=v.blockSize}else p=r.offsetWidth,_=r.offsetHeight;s({width:p,height:_})});return c.observe(r,{box:"border-box"}),()=>c.unobserve(r)}else s(void 0)},[r]),o}var Za="Popper",[Rp,Tp]=ns(Za),[rv,Op]=Rp(Za),Ip=r=>{const{__scopePopper:o,children:s}=r,[c,d]=g.useState(null);return u.jsx(rv,{scope:o,anchor:c,onAnchorChange:d,children:s})};Ip.displayName=Za;var Ap="PopperAnchor",Lp=g.forwardRef((r,o)=>{const{__scopePopper:s,virtualRef:c,...d}=r,f=Op(Ap,s),p=g.useRef(null),_=Fe(o,p),h=g.useRef(null);return g.useEffect(()=>{const v=h.current;h.current=(c==null?void 0:c.current)||p.current,v!==h.current&&f.onAnchorChange(h.current)}),c?null:u.jsx(Pe.div,{...d,ref:_})});Lp.displayName=Ap;var Ja="PopperContent",[lv,ov]=Rp(Ja),Mp=g.forwardRef((r,o)=>{var Q,q,ee,Z,le,ge;const{__scopePopper:s,side:c="bottom",sideOffset:d=0,align:f="center",alignOffset:p=0,arrowPadding:_=0,avoidCollisions:h=!0,collisionBoundary:v=[],collisionPadding:y=0,sticky:S="partial",hideWhenDetached:k=!1,updatePositionStrategy:D="optimized",onPlaced:R,...x}=r,b=Op(Ja,s),[j,P]=g.useState(null),I=Fe(o,Ee=>P(Ee)),[M,z]=g.useState(null),G=nv(M),Y=(G==null?void 0:G.width)??0,K=(G==null?void 0:G.height)??0,fe=c+(f!=="center"?"-"+f:""),ue=typeof y=="number"?y:{top:0,right:0,bottom:0,left:0,...y},he=Array.isArray(v)?v:[v],pe=he.length>0,me={padding:ue,boundary:he.filter(iv),altBoundary:pe},{refs:_e,floatingStyles:xe,placement:ce,isPositioned:se,middlewareData:L}=Vy({strategy:"fixed",placement:fe,whileElementsMounted:(...Ee)=>Ay(...Ee,{animationFrame:D==="always"}),elements:{reference:b.anchor},middleware:[Qy({mainAxis:d+K,alignmentAxis:p}),h&&Xy({mainAxis:!0,crossAxis:!1,limiter:S==="partial"?Ky():void 0,...me}),h&&Gy({...me}),Zy({...me,apply:({elements:Ee,rects:Je,availableWidth:kt,availableHeight:Et})=>{const{width:yt,height:In}=Je.reference,Nt=Ee.floating.style;Nt.setProperty("--radix-popper-available-width",`${kt}px`),Nt.setProperty("--radix-popper-available-height",`${Et}px`),Nt.setProperty("--radix-popper-anchor-width",`${yt}px`),Nt.setProperty("--radix-popper-anchor-height",`${In}px`)}}),M&&qy({element:M,padding:_}),av({arrowWidth:Y,arrowHeight:K}),k&&Jy({strategy:"referenceHidden",...me})]}),[F,V]=Fp(ce),E=Kn(R);rt(()=>{se&&(E==null||E())},[se,E]);const B=(Q=L.arrow)==null?void 0:Q.x,H=(q=L.arrow)==null?void 0:q.y,J=((ee=L.arrow)==null?void 0:ee.centerOffset)!==0,[te,ie]=g.useState();return rt(()=>{j&&ie(window.getComputedStyle(j).zIndex)},[j]),u.jsx("div",{ref:_e.setFloating,"data-radix-popper-content-wrapper":"",style:{...xe,transform:se?xe.transform:"translate(0, -200%)",minWidth:"max-content",zIndex:te,"--radix-popper-transform-origin":[(Z=L.transformOrigin)==null?void 0:Z.x,(le=L.transformOrigin)==null?void 0:le.y].join(" "),...((ge=L.hide)==null?void 0:ge.referenceHidden)&&{visibility:"hidden",pointerEvents:"none"}},dir:r.dir,children:u.jsx(lv,{scope:s,placedSide:F,onArrowChange:z,arrowX:B,arrowY:H,shouldHideArrow:J,children:u.jsx(Pe.div,{"data-side":F,"data-align":V,...x,ref:I,style:{...x.style,animation:se?void 0:"none"}})})})});Mp.displayName=Ja;var Bp="PopperArrow",sv={top:"bottom",right:"left",bottom:"top",left:"right"},zp=g.forwardRef(function(o,s){const{__scopePopper:c,...d}=o,f=ov(Bp,c),p=sv[f.placedSide];return u.jsx("span",{ref:f.onArrowChange,style:{position:"absolute",left:f.arrowX,top:f.arrowY,[p]:0,transformOrigin:{top:"",right:"0 0",bottom:"center 0",left:"100% 0"}[f.placedSide],transform:{top:"translateY(100%)",right:"translateY(50%) rotate(90deg) translateX(-50%)",bottom:"rotate(180deg)",left:"translateY(50%) rotate(-90deg) translateX(50%)"}[f.placedSide],visibility:f.shouldHideArrow?"hidden":void 0},children:u.jsx(tv,{...d,ref:s,style:{...d.style,display:"block"}})})});zp.displayName=Bp;function iv(r){return r!==null}var av=r=>({name:"transformOrigin",options:r,fn(o){var b,j,P;const{placement:s,rects:c,middlewareData:d}=o,p=((b=d.arrow)==null?void 0:b.centerOffset)!==0,_=p?0:r.arrowWidth,h=p?0:r.arrowHeight,[v,y]=Fp(s),S={start:"0%",center:"50%",end:"100%"}[y],k=(((j=d.arrow)==null?void 0:j.x)??0)+_/2,D=(((P=d.arrow)==null?void 0:P.y)??0)+h/2;let R="",x="";return v==="bottom"?(R=p?S:`${k}px`,x=`${-h}px`):v==="top"?(R=p?S:`${k}px`,x=`${c.floating.height+h}px`):v==="right"?(R=`${-h}px`,x=p?S:`${D}px`):v==="left"&&(R=`${c.floating.width+h}px`,x=p?S:`${D}px`),{data:{x:R,y:x}}}});function Fp(r){const[o,s="center"]=r.split("-");return[o,s]}var cv=Ip,uv=Lp,dv=Mp,fv=zp;function pv(r){const o=g.useRef({value:r,previous:r});return g.useMemo(()=>(o.current.value!==r&&(o.current.previous=o.current.value,o.current.value=r),o.current.previous),[r])}var Up=Object.freeze({position:"absolute",border:0,width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",wordWrap:"normal"}),mv="VisuallyHidden",_v=g.forwardRef((r,o)=>u.jsx(Pe.span,{...r,ref:o,style:{...Up,...r.style}}));_v.displayName=mv;var gv=[" ","Enter","ArrowUp","ArrowDown"],hv=[" ","Enter"],Jn="Select",[ds,fs,yv]=Fh(Jn),[Lr]=ns(Jn,[yv,Tp]),ps=Tp(),[vv,Tn]=Lr(Jn),[xv,wv]=Lr(Jn),Wp=r=>{const{__scopeSelect:o,children:s,open:c,defaultOpen:d,onOpenChange:f,value:p,defaultValue:_,onValueChange:h,dir:v,name:y,autoComplete:S,disabled:k,required:D,form:R}=r,x=ps(o),[b,j]=g.useState(null),[P,I]=g.useState(null),[M,z]=g.useState(!1),G=Wh(v),[Y,K]=Ca({prop:c,defaultProp:d??!1,onChange:f,caller:Jn}),[fe,ue]=Ca({prop:p,defaultProp:_,onChange:h,caller:Jn}),he=g.useRef(null),pe=b?R||!!b.closest("form"):!0,[me,_e]=g.useState(new Set),xe=Array.from(me).map(ce=>ce.props.value).join(";");return u.jsx(cv,{...x,children:u.jsxs(vv,{required:D,scope:o,trigger:b,onTriggerChange:j,valueNode:P,onValueNodeChange:I,valueNodeHasChildren:M,onValueNodeHasChildrenChange:z,contentId:jr(),value:fe,onValueChange:ue,open:Y,onOpenChange:K,dir:G,triggerPointerDownPosRef:he,disabled:k,children:[u.jsx(ds.Provider,{scope:o,children:u.jsx(xv,{scope:r.__scopeSelect,onNativeOptionAdd:g.useCallback(ce=>{_e(se=>new Set(se).add(ce))},[]),onNativeOptionRemove:g.useCallback(ce=>{_e(se=>{const L=new Set(se);return L.delete(ce),L})},[]),children:s})}),pe?u.jsxs(im,{"aria-hidden":!0,required:D,tabIndex:-1,name:y,autoComplete:S,value:fe,onChange:ce=>ue(ce.target.value),disabled:k,form:R,children:[fe===void 0?u.jsx("option",{value:""}):null,Array.from(me)]},xe):null]})})};Wp.displayName=Jn;var Yp="SelectTrigger",Hp=g.forwardRef((r,o)=>{const{__scopeSelect:s,disabled:c=!1,...d}=r,f=ps(s),p=Tn(Yp,s),_=p.disabled||c,h=Fe(o,p.onTriggerChange),v=fs(s),y=g.useRef("touch"),[S,k,D]=cm(x=>{const b=v().filter(I=>!I.disabled),j=b.find(I=>I.value===p.value),P=um(b,x,j);P!==void 0&&p.onValueChange(P.value)}),R=x=>{_||(p.onOpenChange(!0),D()),x&&(p.triggerPointerDownPosRef.current={x:Math.round(x.pageX),y:Math.round(x.pageY)})};return u.jsx(uv,{asChild:!0,...f,children:u.jsx(Pe.button,{type:"button",role:"combobox","aria-controls":p.contentId,"aria-expanded":p.open,"aria-required":p.required,"aria-autocomplete":"none",dir:p.dir,"data-state":p.open?"open":"closed",disabled:_,"data-disabled":_?"":void 0,"data-placeholder":am(p.value)?"":void 0,...d,ref:h,onClick:Oe(d.onClick,x=>{x.currentTarget.focus(),y.current!=="mouse"&&R(x)}),onPointerDown:Oe(d.onPointerDown,x=>{y.current=x.pointerType;const b=x.target;b.hasPointerCapture(x.pointerId)&&b.releasePointerCapture(x.pointerId),x.button===0&&x.ctrlKey===!1&&x.pointerType==="mouse"&&(R(x),x.preventDefault())}),onKeyDown:Oe(d.onKeyDown,x=>{const b=S.current!=="";!(x.ctrlKey||x.altKey||x.metaKey)&&x.key.length===1&&k(x.key),!(b&&x.key===" ")&&gv.includes(x.key)&&(R(),x.preventDefault())})})})});Hp.displayName=Yp;var Vp="SelectValue",$p=g.forwardRef((r,o)=>{const{__scopeSelect:s,className:c,style:d,children:f,placeholder:p="",..._}=r,h=Tn(Vp,s),{onValueNodeHasChildrenChange:v}=h,y=f!==void 0,S=Fe(o,h.onValueNodeChange);return rt(()=>{v(y)},[v,y]),u.jsx(Pe.span,{..._,ref:S,style:{pointerEvents:"none"},children:am(h.value)?u.jsx(u.Fragment,{children:p}):f})});$p.displayName=Vp;var Sv="SelectIcon",Qp=g.forwardRef((r,o)=>{const{__scopeSelect:s,children:c,...d}=r;return u.jsx(Pe.span,{"aria-hidden":!0,...d,ref:o,children:c||"▼"})});Qp.displayName=Sv;var bv="SelectPortal",Xp=r=>u.jsx(Fa,{asChild:!0,...r});Xp.displayName=bv;var qn="SelectContent",Kp=g.forwardRef((r,o)=>{const s=Tn(qn,r.__scopeSelect),[c,d]=g.useState();if(rt(()=>{d(new DocumentFragment)},[]),!s.open){const f=c;return f?Or.createPortal(u.jsx(Gp,{scope:r.__scopeSelect,children:u.jsx(ds.Slot,{scope:r.__scopeSelect,children:u.jsx("div",{children:r.children})})}),f):null}return u.jsx(Zp,{...r,ref:o})});Kp.displayName=qn;var At=10,[Gp,On]=Lr(qn),Cv="SelectContentImpl",kv=Cl("SelectContent.RemoveScroll"),Zp=g.forwardRef((r,o)=>{const{__scopeSelect:s,position:c="item-aligned",onCloseAutoFocus:d,onEscapeKeyDown:f,onPointerDownOutside:p,side:_,sideOffset:h,align:v,alignOffset:y,arrowPadding:S,collisionBoundary:k,collisionPadding:D,sticky:R,hideWhenDetached:x,avoidCollisions:b,...j}=r,P=Tn(qn,s),[I,M]=g.useState(null),[z,G]=g.useState(null),Y=Fe(o,Q=>M(Q)),[K,fe]=g.useState(null),[ue,he]=g.useState(null),pe=fs(s),[me,_e]=g.useState(!1),xe=g.useRef(!1);g.useEffect(()=>{if(I)return Kf(I)},[I]),Ff();const ce=g.useCallback(Q=>{const[q,...ee]=pe().map(ge=>ge.ref.current),[Z]=ee.slice(-1),le=document.activeElement;for(const ge of Q)if(ge===le||(ge==null||ge.scrollIntoView({block:"nearest"}),ge===q&&z&&(z.scrollTop=0),ge===Z&&z&&(z.scrollTop=z.scrollHeight),ge==null||ge.focus(),document.activeElement!==le))return},[pe,z]),se=g.useCallback(()=>ce([K,I]),[ce,K,I]);g.useEffect(()=>{me&&se()},[me,se]);const{onOpenChange:L,triggerPointerDownPosRef:F}=P;g.useEffect(()=>{if(I){let Q={x:0,y:0};const q=Z=>{var le,ge;Q={x:Math.abs(Math.round(Z.pageX)-(((le=F.current)==null?void 0:le.x)??0)),y:Math.abs(Math.round(Z.pageY)-(((ge=F.current)==null?void 0:ge.y)??0))}},ee=Z=>{Q.x<=10&&Q.y<=10?Z.preventDefault():I.contains(Z.target)||L(!1),document.removeEventListener("pointermove",q),F.current=null};return F.current!==null&&(document.addEventListener("pointermove",q),document.addEventListener("pointerup",ee,{capture:!0,once:!0})),()=>{document.removeEventListener("pointermove",q),document.removeEventListener("pointerup",ee,{capture:!0})}}},[I,L,F]),g.useEffect(()=>{const Q=()=>L(!1);return window.addEventListener("blur",Q),window.addEventListener("resize",Q),()=>{window.removeEventListener("blur",Q),window.removeEventListener("resize",Q)}},[L]);const[V,E]=cm(Q=>{const q=pe().filter(le=>!le.disabled),ee=q.find(le=>le.ref.current===document.activeElement),Z=um(q,Q,ee);Z&&setTimeout(()=>Z.ref.current.focus())}),B=g.useCallback((Q,q,ee)=>{const Z=!xe.current&&!ee;(P.value!==void 0&&P.value===q||Z)&&(fe(Q),Z&&(xe.current=!0))},[P.value]),H=g.useCallback(()=>I==null?void 0:I.focus(),[I]),J=g.useCallback((Q,q,ee)=>{const Z=!xe.current&&!ee;(P.value!==void 0&&P.value===q||Z)&&he(Q)},[P.value]),te=c==="popper"?Pa:Jp,ie=te===Pa?{side:_,sideOffset:h,align:v,alignOffset:y,arrowPadding:S,collisionBoundary:k,collisionPadding:D,sticky:R,hideWhenDetached:x,avoidCollisions:b}:{};return u.jsx(Gp,{scope:s,content:I,viewport:z,onViewportChange:G,itemRefCallback:B,selectedItem:K,onItemLeave:H,itemTextRefCallback:J,focusSelectedItem:se,selectedItemText:ue,position:c,isPositioned:me,searchRef:V,children:u.jsx(Ua,{as:kv,allowPinchZoom:!0,children:u.jsx(za,{asChild:!0,trapped:P.open,onMountAutoFocus:Q=>{Q.preventDefault()},onUnmountAutoFocus:Oe(d,Q=>{var q;(q=P.trigger)==null||q.focus({preventScroll:!0}),Q.preventDefault()}),children:u.jsx(Ba,{asChild:!0,disableOutsidePointerEvents:!0,onEscapeKeyDown:f,onPointerDownOutside:p,onFocusOutside:Q=>Q.preventDefault(),onDismiss:()=>P.onOpenChange(!1),children:u.jsx(te,{role:"listbox",id:P.contentId,"data-state":P.open?"open":"closed",dir:P.dir,onContextMenu:Q=>Q.preventDefault(),...j,...ie,onPlaced:()=>_e(!0),ref:Y,style:{display:"flex",flexDirection:"column",outline:"none",...j.style},onKeyDown:Oe(j.onKeyDown,Q=>{const q=Q.ctrlKey||Q.altKey||Q.metaKey;if(Q.key==="Tab"&&Q.preventDefault(),!q&&Q.key.length===1&&E(Q.key),["ArrowUp","ArrowDown","Home","End"].includes(Q.key)){let Z=pe().filter(le=>!le.disabled).map(le=>le.ref.current);if(["ArrowUp","End"].includes(Q.key)&&(Z=Z.slice().reverse()),["ArrowUp","ArrowDown"].includes(Q.key)){const le=Q.target,ge=Z.indexOf(le);Z=Z.slice(ge+1)}setTimeout(()=>ce(Z)),Q.preventDefault()}})})})})})})});Zp.displayName=Cv;var Ev="SelectItemAlignedPosition",Jp=g.forwardRef((r,o)=>{const{__scopeSelect:s,onPlaced:c,...d}=r,f=Tn(qn,s),p=On(qn,s),[_,h]=g.useState(null),[v,y]=g.useState(null),S=Fe(o,Y=>y(Y)),k=fs(s),D=g.useRef(!1),R=g.useRef(!0),{viewport:x,selectedItem:b,selectedItemText:j,focusSelectedItem:P}=p,I=g.useCallback(()=>{if(f.trigger&&f.valueNode&&_&&v&&x&&b&&j){const Y=f.trigger.getBoundingClientRect(),K=v.getBoundingClientRect(),fe=f.valueNode.getBoundingClientRect(),ue=j.getBoundingClientRect();if(f.dir!=="rtl"){const le=ue.left-K.left,ge=fe.left-le,Ee=Y.left-ge,Je=Y.width+Ee,kt=Math.max(Je,K.width),Et=window.innerWidth-At,yt=mf(ge,[At,Math.max(At,Et-kt)]);_.style.minWidth=Je+"px",_.style.left=yt+"px"}else{const le=K.right-ue.right,ge=window.innerWidth-fe.right-le,Ee=window.innerWidth-Y.right-ge,Je=Y.width+Ee,kt=Math.max(Je,K.width),Et=window.innerWidth-At,yt=mf(ge,[At,Math.max(At,Et-kt)]);_.style.minWidth=Je+"px",_.style.right=yt+"px"}const he=k(),pe=window.innerHeight-At*2,me=x.scrollHeight,_e=window.getComputedStyle(v),xe=parseInt(_e.borderTopWidth,10),ce=parseInt(_e.paddingTop,10),se=parseInt(_e.borderBottomWidth,10),L=parseInt(_e.paddingBottom,10),F=xe+ce+me+L+se,V=Math.min(b.offsetHeight*5,F),E=window.getComputedStyle(x),B=parseInt(E.paddingTop,10),H=parseInt(E.paddingBottom,10),J=Y.top+Y.height/2-At,te=pe-J,ie=b.offsetHeight/2,Q=b.offsetTop+ie,q=xe+ce+Q,ee=F-q;if(q<=J){const le=he.length>0&&b===he[he.length-1].ref.current;_.style.bottom="0px";const ge=v.clientHeight-x.offsetTop-x.offsetHeight,Ee=Math.max(te,ie+(le?H:0)+ge+se),Je=q+Ee;_.style.height=Je+"px"}else{const le=he.length>0&&b===he[0].ref.current;_.style.top="0px";const Ee=Math.max(J,xe+x.offsetTop+(le?B:0)+ie)+ee;_.style.height=Ee+"px",x.scrollTop=q-J+x.offsetTop}_.style.margin=`${At}px 0`,_.style.minHeight=V+"px",_.style.maxHeight=pe+"px",c==null||c(),requestAnimationFrame(()=>D.current=!0)}},[k,f.trigger,f.valueNode,_,v,x,b,j,f.dir,c]);rt(()=>I(),[I]);const[M,z]=g.useState();rt(()=>{v&&z(window.getComputedStyle(v).zIndex)},[v]);const G=g.useCallback(Y=>{Y&&R.current===!0&&(I(),P==null||P(),R.current=!1)},[I,P]);return u.jsx(Dv,{scope:s,contentWrapper:_,shouldExpandOnScrollRef:D,onScrollButtonChange:G,children:u.jsx("div",{ref:h,style:{display:"flex",flexDirection:"column",position:"fixed",zIndex:M},children:u.jsx(Pe.div,{...d,ref:S,style:{boxSizing:"border-box",maxHeight:"100%",...d.style}})})})});Jp.displayName=Ev;var Nv="SelectPopperPosition",Pa=g.forwardRef((r,o)=>{const{__scopeSelect:s,align:c="start",collisionPadding:d=At,...f}=r,p=ps(s);return u.jsx(dv,{...p,...f,ref:o,align:c,collisionPadding:d,style:{boxSizing:"border-box",...f.style,"--radix-select-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-select-content-available-width":"var(--radix-popper-available-width)","--radix-select-content-available-height":"var(--radix-popper-available-height)","--radix-select-trigger-width":"var(--radix-popper-anchor-width)","--radix-select-trigger-height":"var(--radix-popper-anchor-height)"}})});Pa.displayName=Nv;var[Dv,qa]=Lr(qn,{}),Ra="SelectViewport",qp=g.forwardRef((r,o)=>{const{__scopeSelect:s,nonce:c,...d}=r,f=On(Ra,s),p=qa(Ra,s),_=Fe(o,f.onViewportChange),h=g.useRef(0);return u.jsxs(u.Fragment,{children:[u.jsx("style",{dangerouslySetInnerHTML:{__html:"[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"},nonce:c}),u.jsx(ds.Slot,{scope:s,children:u.jsx(Pe.div,{"data-radix-select-viewport":"",role:"presentation",...d,ref:_,style:{position:"relative",flex:1,overflow:"hidden auto",...d.style},onScroll:Oe(d.onScroll,v=>{const y=v.currentTarget,{contentWrapper:S,shouldExpandOnScrollRef:k}=p;if(k!=null&&k.current&&S){const D=Math.abs(h.current-y.scrollTop);if(D>0){const R=window.innerHeight-At*2,x=parseFloat(S.style.minHeight),b=parseFloat(S.style.height),j=Math.max(x,b);if(j<R){const P=j+D,I=Math.min(R,P),M=P-I;S.style.height=I+"px",S.style.bottom==="0px"&&(y.scrollTop=M>0?M:0,S.style.justifyContent="flex-end")}}}h.current=y.scrollTop})})})]})});qp.displayName=Ra;var em="SelectGroup",[jv,Pv]=Lr(em),Rv=g.forwardRef((r,o)=>{const{__scopeSelect:s,...c}=r,d=jr();return u.jsx(jv,{scope:s,id:d,children:u.jsx(Pe.div,{role:"group","aria-labelledby":d,...c,ref:o})})});Rv.displayName=em;var tm="SelectLabel",Tv=g.forwardRef((r,o)=>{const{__scopeSelect:s,...c}=r,d=Pv(tm,s);return u.jsx(Pe.div,{id:d.id,...c,ref:o})});Tv.displayName=tm;var ts="SelectItem",[Ov,nm]=Lr(ts),rm=g.forwardRef((r,o)=>{const{__scopeSelect:s,value:c,disabled:d=!1,textValue:f,...p}=r,_=Tn(ts,s),h=On(ts,s),v=_.value===c,[y,S]=g.useState(f??""),[k,D]=g.useState(!1),R=Fe(o,P=>{var I;return(I=h.itemRefCallback)==null?void 0:I.call(h,P,c,d)}),x=jr(),b=g.useRef("touch"),j=()=>{d||(_.onValueChange(c),_.onOpenChange(!1))};if(c==="")throw new Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");return u.jsx(Ov,{scope:s,value:c,disabled:d,textId:x,isSelected:v,onItemTextChange:g.useCallback(P=>{S(I=>I||((P==null?void 0:P.textContent)??"").trim())},[]),children:u.jsx(ds.ItemSlot,{scope:s,value:c,disabled:d,textValue:y,children:u.jsx(Pe.div,{role:"option","aria-labelledby":x,"data-highlighted":k?"":void 0,"aria-selected":v&&k,"data-state":v?"checked":"unchecked","aria-disabled":d||void 0,"data-disabled":d?"":void 0,tabIndex:d?void 0:-1,...p,ref:R,onFocus:Oe(p.onFocus,()=>D(!0)),onBlur:Oe(p.onBlur,()=>D(!1)),onClick:Oe(p.onClick,()=>{b.current!=="mouse"&&j()}),onPointerUp:Oe(p.onPointerUp,()=>{b.current==="mouse"&&j()}),onPointerDown:Oe(p.onPointerDown,P=>{b.current=P.pointerType}),onPointerMove:Oe(p.onPointerMove,P=>{var I;b.current=P.pointerType,d?(I=h.onItemLeave)==null||I.call(h):b.current==="mouse"&&P.currentTarget.focus({preventScroll:!0})}),onPointerLeave:Oe(p.onPointerLeave,P=>{var I;P.currentTarget===document.activeElement&&((I=h.onItemLeave)==null||I.call(h))}),onKeyDown:Oe(p.onKeyDown,P=>{var M;((M=h.searchRef)==null?void 0:M.current)!==""&&P.key===" "||(hv.includes(P.key)&&j(),P.key===" "&&P.preventDefault())})})})})});rm.displayName=ts;var bl="SelectItemText",lm=g.forwardRef((r,o)=>{const{__scopeSelect:s,className:c,style:d,...f}=r,p=Tn(bl,s),_=On(bl,s),h=nm(bl,s),v=wv(bl,s),[y,S]=g.useState(null),k=Fe(o,j=>S(j),h.onItemTextChange,j=>{var P;return(P=_.itemTextRefCallback)==null?void 0:P.call(_,j,h.value,h.disabled)}),D=y==null?void 0:y.textContent,R=g.useMemo(()=>u.jsx("option",{value:h.value,disabled:h.disabled,children:D},h.value),[h.disabled,h.value,D]),{onNativeOptionAdd:x,onNativeOptionRemove:b}=v;return rt(()=>(x(R),()=>b(R)),[x,b,R]),u.jsxs(u.Fragment,{children:[u.jsx(Pe.span,{id:h.textId,...f,ref:k}),h.isSelected&&p.valueNode&&!p.valueNodeHasChildren?Or.createPortal(f.children,p.valueNode):null]})});lm.displayName=bl;var om="SelectItemIndicator",Iv=g.forwardRef((r,o)=>{const{__scopeSelect:s,...c}=r;return nm(om,s).isSelected?u.jsx(Pe.span,{"aria-hidden":!0,...c,ref:o}):null});Iv.displayName=om;var Ta="SelectScrollUpButton",Av=g.forwardRef((r,o)=>{const s=On(Ta,r.__scopeSelect),c=qa(Ta,r.__scopeSelect),[d,f]=g.useState(!1),p=Fe(o,c.onScrollButtonChange);return rt(()=>{if(s.viewport&&s.isPositioned){let _=function(){const v=h.scrollTop>0;f(v)};const h=s.viewport;return _(),h.addEventListener("scroll",_),()=>h.removeEventListener("scroll",_)}},[s.viewport,s.isPositioned]),d?u.jsx(sm,{...r,ref:p,onAutoScroll:()=>{const{viewport:_,selectedItem:h}=s;_&&h&&(_.scrollTop=_.scrollTop-h.offsetHeight)}}):null});Av.displayName=Ta;var Oa="SelectScrollDownButton",Lv=g.forwardRef((r,o)=>{const s=On(Oa,r.__scopeSelect),c=qa(Oa,r.__scopeSelect),[d,f]=g.useState(!1),p=Fe(o,c.onScrollButtonChange);return rt(()=>{if(s.viewport&&s.isPositioned){let _=function(){const v=h.scrollHeight-h.clientHeight,y=Math.ceil(h.scrollTop)<v;f(y)};const h=s.viewport;return _(),h.addEventListener("scroll",_),()=>h.removeEventListener("scroll",_)}},[s.viewport,s.isPositioned]),d?u.jsx(sm,{...r,ref:p,onAutoScroll:()=>{const{viewport:_,selectedItem:h}=s;_&&h&&(_.scrollTop=_.scrollTop+h.offsetHeight)}}):null});Lv.displayName=Oa;var sm=g.forwardRef((r,o)=>{const{__scopeSelect:s,onAutoScroll:c,...d}=r,f=On("SelectScrollButton",s),p=g.useRef(null),_=fs(s),h=g.useCallback(()=>{p.current!==null&&(window.clearInterval(p.current),p.current=null)},[]);return g.useEffect(()=>()=>h(),[h]),rt(()=>{var y;const v=_().find(S=>S.ref.current===document.activeElement);(y=v==null?void 0:v.ref.current)==null||y.scrollIntoView({block:"nearest"})},[_]),u.jsx(Pe.div,{"aria-hidden":!0,...d,ref:o,style:{flexShrink:0,...d.style},onPointerDown:Oe(d.onPointerDown,()=>{p.current===null&&(p.current=window.setInterval(c,50))}),onPointerMove:Oe(d.onPointerMove,()=>{var v;(v=f.onItemLeave)==null||v.call(f),p.current===null&&(p.current=window.setInterval(c,50))}),onPointerLeave:Oe(d.onPointerLeave,()=>{h()})})}),Mv="SelectSeparator",Bv=g.forwardRef((r,o)=>{const{__scopeSelect:s,...c}=r;return u.jsx(Pe.div,{"aria-hidden":!0,...c,ref:o})});Bv.displayName=Mv;var Ia="SelectArrow",zv=g.forwardRef((r,o)=>{const{__scopeSelect:s,...c}=r,d=ps(s),f=Tn(Ia,s),p=On(Ia,s);return f.open&&p.position==="popper"?u.jsx(fv,{...d,...c,ref:o}):null});zv.displayName=Ia;var Fv="SelectBubbleInput",im=g.forwardRef(({__scopeSelect:r,value:o,...s},c)=>{const d=g.useRef(null),f=Fe(c,d),p=pv(o);return g.useEffect(()=>{const _=d.current;if(!_)return;const h=window.HTMLSelectElement.prototype,y=Object.getOwnPropertyDescriptor(h,"value").set;if(p!==o&&y){const S=new Event("change",{bubbles:!0});y.call(_,o),_.dispatchEvent(S)}},[p,o]),u.jsx(Pe.select,{...s,style:{...Up,...s.style},ref:f,defaultValue:o})});im.displayName=Fv;function am(r){return r===""||r===void 0}function cm(r){const o=Kn(r),s=g.useRef(""),c=g.useRef(0),d=g.useCallback(p=>{const _=s.current+p;o(_),(function h(v){s.current=v,window.clearTimeout(c.current),v!==""&&(c.current=window.setTimeout(()=>h(""),1e3))})(_)},[o]),f=g.useCallback(()=>{s.current="",window.clearTimeout(c.current)},[]);return g.useEffect(()=>()=>window.clearTimeout(c.current),[]),[s,d,f]}function um(r,o,s){const d=o.length>1&&Array.from(o).every(v=>v===o[0])?o[0]:o,f=s?r.indexOf(s):-1;let p=Uv(r,Math.max(f,0));d.length===1&&(p=p.filter(v=>v!==s));const h=p.find(v=>v.textValue.toLowerCase().startsWith(d.toLowerCase()));return h!==s?h:void 0}function Uv(r,o){return r.map((s,c)=>r[(o+c)%r.length])}var Wv=Wp,dm=Hp,Yv=$p,Hv=Qp,Vv=Xp,fm=Kp,$v=qp,pm=rm,Qv=lm;const Xv=Wv,Kv=Yv,mm=g.forwardRef(({className:r,children:o,...s},c)=>u.jsxs(dm,{ref:c,className:on("select-trigger",r),...s,children:[o,u.jsx(Hv,{asChild:!0,children:u.jsx("span",{className:"select-chevron","aria-hidden":!0,children:"▼"})})]}));mm.displayName=dm.displayName;const Ef=280,_m=g.forwardRef(({className:r,children:o,position:s="popper",style:c,...d},f)=>u.jsx(Vv,{children:u.jsx(fm,{ref:f,className:on("select-content",s==="popper"&&"select-content-popper",r),position:s,style:{maxHeight:Ef,overflow:"hidden",display:"flex",flexDirection:"column",...c},...d,children:u.jsx($v,{className:on(s==="popper"&&"select-viewport","select-viewport-scroll"),style:{position:"relative",minHeight:0,maxHeight:Ef,overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch"},children:o})})}));_m.displayName=fm.displayName;const gm=g.forwardRef(({className:r,children:o,...s},c)=>u.jsxs(pm,{ref:c,className:on("select-item",r),...s,children:[u.jsx(Qv,{children:o}),u.jsx("span",{className:"select-item-indicator",children:"✓"})]}));gm.displayName=pm.displayName;const Gv=20,Zv=24;function Aa({value:r,onValueChange:o,id:s,disabled:c,excludeValue:d,disabledCurrencies:f={},"aria-label":p}){var h,v;const _=Object.entries(Ze).filter(([y])=>!f[y]&&(!d||y!==d));return u.jsxs(Xv,{value:r,onValueChange:o,disabled:c,children:[u.jsx(mm,{id:s,className:"currency-select-trigger","aria-label":p,children:u.jsx(Kv,{children:r?u.jsxs("span",{className:"currency-select-value",children:[u.jsx(Qt,{code:r,fallback:(h=Ze[r])==null?void 0:h.flag,size:Gv}),u.jsx("span",{children:r}),u.jsx("span",{className:"currency-select-name",children:(v=Ze[r])==null?void 0:v.name})]}):"Select currency"})}),u.jsx(_m,{children:_.map(([y,S])=>u.jsx(gm,{value:y,children:u.jsxs("span",{className:"currency-select-option",children:[u.jsx(Qt,{code:y,fallback:S.flag,size:Zv}),u.jsx("span",{className:"currency-select-option-code",children:y}),u.jsx("span",{className:"currency-select-option-name",children:S.name})]})},y))})]})}const Jv="/assets/icons";function qv({open:r,onClose:o,balances:s,rates:c,onDeposit:d,disabledCurrencies:f={}}){const[p,_]=g.useState("USD"),[h,v]=g.useState(""),y=g.useMemo(()=>Object.keys(Ze).filter(P=>!f[P]),[f]);g.useEffect(()=>{r&&(_(y.includes("USD")?"USD":y[0]??"USD"),v(""))},[r,y]),g.useEffect(()=>{r&&p&&f[p]&&_(y[0]??"USD")},[r,p,f,y]);const S=parseFloat(h)||0,k=S>0,D=S>0?`≈ ${ke(S*(c[p]??0))}`:"",R=S>0?(s[p]??0)+S:0,x=Ze[p],b=()=>{S>0&&!f[p]&&(d(p,S),o())},j=u.jsxs(u.Fragment,{children:[u.jsx("img",{className:"modal-title-icon-img",src:`${Jv}/Deposit.svg`,alt:"",onError:P=>{P.target.style.display="none";const I=P.target.nextElementSibling;I&&(I.style.display="flex")}}),u.jsx("span",{style:{display:"none"},children:"⊕"})]});return u.jsxs(ss,{open:r,onClose:o,title:"Deposit funds",titleIcon:j,titleIconVariant:"dark",children:[u.jsxs("div",{className:"modal-body",children:[u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",htmlFor:"deposit-currency",children:"Currency"}),u.jsx(Aa,{id:"deposit-currency",value:p,onValueChange:_,"aria-label":"Select currency to deposit",disabledCurrencies:f})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"Amount to deposit"}),u.jsx("input",{type:"number",className:"form-input",placeholder:"Enter amount",value:h,onChange:P=>v(P.target.value)}),u.jsx("div",{className:"form-hint",children:D})]}),k&&u.jsxs("div",{className:"preview-box preview-box--summary",children:[u.jsx("div",{className:"preview-label",children:"After deposit"}),u.jsxs("div",{className:"preview-value preview-value-row",children:[u.jsx(Qt,{code:p,fallback:x==null?void 0:x.flag,size:20}),u.jsxs("span",{children:[p,": ",Ge(R)]})]})]})]}),u.jsx("div",{className:"modal-footer",children:u.jsx("button",{type:"button",className:"btn btn-primary",onClick:b,children:"Deposit funds"})})]})}const e1="/assets/icons";function t1({open:r,onClose:o,balances:s,rates:c,totals:d,onWithdraw:f,disabledCurrencies:p={},model:_="A"}){const[h,v]=g.useState(1),[y,S]=g.useState(null),[k,D]=g.useState(""),[R,x]=g.useState(!1);g.useEffect(()=>{r&&(v(1),S(null),D(""),x(!1))},[r]),g.useEffect(()=>{r&&y&&p[y]&&(v(1),S(null),D(""),x(!1))},[r,y,p]);const b=y?Mo(y,s,c,d,_):null,j=(b==null?void 0:b.withdrawable)??0,P=parseFloat(k)||0,I=P>j&&y?`Amount exceeds withdrawable balance. Maximum: ${Ge(j)} ${y}`:null,M=K=>{const{balance:fe}=Mo(K,s,c,d,_);fe>0&&(S(K),v(2),D(""),x(!1))},z=()=>{x(K=>{if(!K&&y){const fe=Mo(y,s,c,d,_);D(fe.withdrawable.toFixed(2))}return!K})},G=()=>{!y||p[y]||P<=0||P>j||(f(y,P),o())},Y=u.jsxs(u.Fragment,{children:[u.jsx("img",{className:"modal-title-icon-img",src:`${e1}/withdraw.svg`,alt:"",onError:K=>{K.target.style.display="none";const fe=K.target.nextElementSibling;fe&&(fe.style.display="flex")}}),u.jsx("span",{style:{display:"none"},children:"⊙"})]});return u.jsxs(ss,{open:r,onClose:o,title:"Withdrawal request",titleIcon:Y,titleIconVariant:"dark",children:[h===1&&u.jsxs("div",{className:"modal-body",children:[u.jsx("p",{style:{fontSize:13,color:"#6b7280",marginBottom:12},children:"Select currency to withdraw"}),u.jsx("div",{children:Object.entries(Ze).filter(([K])=>!p[K]).map(([K,fe])=>{const ue=s[K]??0,{withdrawable:he}=Mo(K,s,c,d,_),pe=ue<=0;return u.jsxs("div",{className:`currency-option ${pe?"disabled":""}`,onClick:()=>!pe&&M(K),onKeyDown:me=>!pe&&(me.key==="Enter"||me.key===" ")&&M(K),role:"button",tabIndex:pe?-1:0,children:[u.jsxs("div",{className:"currency-option-left",children:[u.jsx("span",{className:"currency-option-flag",children:u.jsx(Qt,{code:K,fallback:fe.flag,size:28})}),u.jsxs("div",{children:[u.jsx("div",{style:{fontWeight:600},children:K}),u.jsx("div",{style:{fontSize:12,color:"#6b7280"},children:fe.name})]})]}),u.jsxs("div",{className:"currency-option-right",children:[u.jsx("div",{className:`currency-option-balance ${ue<0?"balance-negative":""}`,children:Ma(ue)}),u.jsxs("div",{className:"currency-option-avail",children:["Avail: ",Ge(he)]})]})]},K)})})]}),h===2&&b&&u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"withdraw-summary",style:{borderRadius:0,margin:0},children:u.jsxs("div",{className:"withdraw-row",children:[u.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[u.jsx("span",{className:"ws-flag-wrap",children:u.jsx(Qt,{code:y,fallback:Ze[y].flag,size:28})}),u.jsxs("div",{children:[u.jsx("div",{style:{fontWeight:600},children:y}),u.jsx("div",{style:{fontSize:12,color:"#6b7280"},children:Ze[y].name})]})]}),u.jsxs("div",{style:{textAlign:"right"},children:[u.jsx("div",{style:{fontWeight:600},children:Ge(b.balance)}),u.jsxs("div",{style:{fontSize:12,color:"#6b7280"},children:["≈ ",ke(b.balanceUSD)]})]})]})}),u.jsx("div",{style:{padding:"16px 20px",borderBottom:"1px solid #e5e7eb"},children:u.jsxs("div",{className:"withdraw-row",children:[u.jsxs("div",{children:[u.jsx("div",{className:"withdraw-label",children:"Withdrawable balance"}),u.jsx("div",{className:"withdraw-sublabel",children:b.held>0?`~${Ge(b.held)} ${y} held against unsettled obligations`:"Full balance available"})]}),u.jsxs("div",{children:[u.jsx("div",{className:"withdraw-value",children:Ge(b.withdrawable)}),u.jsxs("div",{className:"withdraw-value-sub",children:["≈ ",ke(b.withdrawableUSD)]})]})]})}),u.jsxs("div",{className:"modal-body",children:[u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"Enter amount to withdraw"}),u.jsx("input",{type:"number",className:"form-input",placeholder:"Enter amount",value:k,onChange:K=>D(K.target.value)})]}),u.jsxs("label",{className:"max-toggle",children:[u.jsxs("div",{className:"max-toggle-left",children:[u.jsx("input",{type:"checkbox",checked:R,onChange:z}),u.jsx("span",{style:{fontSize:13,color:"#374151"},children:"Withdraw maximum available balance"})]}),u.jsx("span",{className:"max-badge",children:"MAX"})]}),I&&u.jsx("div",{className:"alert alert-error",children:I})]}),u.jsxs("div",{className:"modal-footer",children:[u.jsx("button",{type:"button",className:"btn btn-secondary",style:{background:"#f3f4f6",color:"#374151"},onClick:()=>v(1),children:"Back"}),u.jsx("button",{type:"button",className:"btn btn-primary",onClick:G,children:"Submit withdrawal"})]})]})]})}const Nf="/assets/icons";function n1({open:r,onClose:o,balances:s,rates:c,totals:d,onTrade:f,disabledCurrencies:p={},model:_="A"}){const[h,v]=g.useState("USD"),[y,S]=g.useState("GBP"),[k,D]=g.useState(""),[R,x]=g.useState("");g.useEffect(()=>{if(r){const Z=Object.keys(Ze).filter(Ee=>!p[Ee]),le=Z.includes("USD")?"USD":Z[0],ge=Z.includes("GBP")?"GBP":Z[1]??Z[0];v(le??"USD"),S(ge??"GBP"),D(""),x("")}},[r,p]);const b=Z=>parseFloat(String(Z).replace(/,/g,""))||0;g.useEffect(()=>{if(!r||h===y)return;const Z=b(k),le=b(R),ge=c[h]??0,Ee=c[y]??0;Z>0&&Ee>0?x(Bo(Z*ge/Ee)):le>0&&ge>0&&D(Bo(le*Ee/ge))},[h,y]);const j=h===y,P=b(k),I=b(R),M=c[h]??0,z=c[y]??0,G=P*M,Y=I*z,K=P||(z>0?Y/M:0),fe=I||(z>0?G/z:0),ue=s[h]??0,he=Math.max(0,ue),pe=_==="C"?Math.max(0,d.availableCredit??0):Math.max(0,d.creditRemaining??0),me=M>0?pe/M:0,_e=he+me,xe=K>_e&&(P>0||I>0),ce=he*M,se=_==="C"?d.availableCredit??0:d.creditRemaining??0,L=xe,F=(P>0||I>0)&&!j,V=z>0?M/z:0,E=(P>0||I>0)&&!j&&!xe,B=Math.min(K,he),H=Math.max(0,K-he),J=H*M,te=(()=>{if(_==="C"){const le=Math.max(0,d.availableCredit??0);return Math.min(J,le)}const Z=Math.max(0,d.creditRemaining??0);return Math.min(J,Z)})(),ie=Z=>{D(Z);const le=b(Z);if(le>0&&!j&&z>0){const ge=le*M/z;x(Bo(ge))}else x("")},Q=Z=>{x(Z);const le=b(Z);if(le>0&&!j&&M>0){const ge=le*z/M;D(Bo(ge))}else D("")},q=()=>{K<=0||j||xe||(f(h,y,K),o())},ee=u.jsxs(u.Fragment,{children:[u.jsx("img",{className:"modal-title-icon-img",src:`${Nf}/trade.svg`,alt:"",onError:Z=>{Z.target.style.display="none";const le=Z.target.nextElementSibling;le&&(le.style.display="flex")}}),u.jsx("span",{style:{display:"none"},children:"⇄"})]});return u.jsxs(ss,{open:r,onClose:o,title:"Execute trade",titleIcon:ee,titleIconVariant:"dark",children:[u.jsxs("div",{className:"modal-body",children:[u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",htmlFor:"trade-sell-currency",children:"Sell currency"}),u.jsx(Aa,{id:"trade-sell-currency",value:h,onValueChange:v,excludeValue:y,"aria-label":"Select currency to sell",disabledCurrencies:p})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"Amount to sell"}),u.jsx("input",{type:"number",className:"form-input",placeholder:"Enter amount",value:k,onChange:Z=>ie(Z.target.value)}),(P>0||I>0)&&u.jsxs("div",{className:"form-hint",children:["≈ ",ke(G||Y)]})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",htmlFor:"trade-buy-currency",children:"Buy currency"}),u.jsx(Aa,{id:"trade-buy-currency",value:y,onValueChange:S,excludeValue:h,"aria-label":"Select currency to buy",disabledCurrencies:p})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"Amount to buy"}),u.jsx("input",{type:"number",className:"form-input",placeholder:"Enter amount",value:R,onChange:Z=>Q(Z.target.value)})]}),F&&u.jsxs("div",{className:"preview-box indigo",children:[u.jsx("div",{className:"preview-label indigo",children:"Trade preview"}),u.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8},children:[u.jsxs("span",{style:{color:"var(--color-grey-900)",fontWeight:600},children:["-",Ge(K)," ",h]}),u.jsx("span",{style:{color:"#9ca3af"},children:"→"}),u.jsxs("span",{style:{color:"#15803d",fontWeight:600},children:["+",Ge(fe)," ",y]})]})]}),E&&H>0&&u.jsxs("div",{className:"trade-capacity-breakdown",children:[u.jsxs("div",{className:"trade-capacity-row",children:[u.jsxs("span",{className:"trade-capacity-label",children:["From ",h," balance"]}),u.jsxs("span",{className:"trade-capacity-value",children:[Ge(B)," ",h]})]}),u.jsxs("div",{className:"trade-capacity-row",children:[u.jsx("span",{className:"trade-capacity-label",children:_==="C"?"From remaining credit":"From credit remaining"}),u.jsx("span",{className:"trade-capacity-value",children:ke(te)})]})]}),!j&&u.jsxs("div",{className:"form-hint",style:{marginTop:8},children:["FX rate: 1 ",h," = ",V>0?V.toFixed(6):"—"," ",y]}),L&&u.jsxs("div",{className:"trade-capacity-breakdown trade-capacity-breakdown--error",children:[u.jsx("div",{className:"trade-capacity-breakdown-header",children:_==="C"?"Exceeds balance and credit.":`Exceeds maximum sell of ≈ ${Ge(_e)} ${h}`}),u.jsxs("div",{className:"trade-capacity-row",children:[u.jsxs("span",{className:"trade-capacity-label",children:["From ",h," balance"]}),u.jsx("span",{className:"trade-capacity-value",children:ke(ce)})]}),u.jsxs("div",{className:"trade-capacity-row",children:[u.jsx("span",{className:"trade-capacity-label",children:_==="C"?"From remaining credit":"From credit remaining"}),u.jsx("span",{className:"trade-capacity-value",children:ke(se)})]})]})]}),u.jsx("div",{className:"modal-footer",children:u.jsxs("button",{type:"button",className:"btn btn-primary",onClick:q,children:[u.jsxs("span",{className:"btn-icon-wrap",children:[u.jsx("img",{className:"btn-icon-img",src:`${Nf}/trade.svg`,alt:"",onError:Z=>{Z.target.style.display="none";const le=Z.target.nextElementSibling;le&&(le.style.display="inline")}}),u.jsx("span",{className:"btn-icon",style:{display:"none"},children:"⇄"})]}),"Execute trade"]})})]})}const r1=new Set(["USD","USDC","USDT"]),Df={USDC:null,USDT:null,EURC:null},l1=r=>r in Df?Df[r]:r,o1=[{id:"balances",label:"Balances & credit"},{id:"fluctuation",label:"Rates & fluctuation (bips)"}];function s1({open:r,onClose:o,balances:s,rates:c,creditLimit:d,rateRangeBips:f,baseRates:p,disabledCurrencies:_={},onSave:h}){const[v,y]=g.useState("balances"),[S,k]=g.useState(String(d)),[D,R]=g.useState({...s}),[x,b]=g.useState({}),[j,P]=g.useState(()=>({...Xo,...p||{}})),[I,M]=g.useState(()=>({...ba(),...f||{}})),[z,G]=g.useState(!1),[Y,K]=g.useState(null),[fe,ue]=g.useState(!1),[he,pe]=g.useState(null);g.useEffect(()=>{if(r){k(String(d)),R({...s}),b({..._}),P({...Xo,...p||{}});const H={...ba(),...f||{}};M(Object.fromEntries(Object.entries(H).map(([J,te])=>[J,{minBips:(te==null?void 0:te.minBips)??0,maxBips:(te==null?void 0:te.maxBips)??0}]))),K(null),ue(!1)}},[r,d,s,_,f,p]);const me=parseFloat(S)||0,_e=Af(D,c,me),xe=_e.equity,ce=_e.creditRemaining,se=(H,J)=>{R(te=>({...te,[H]:parseFloat(J)||0}))},L=(H,J,te)=>{const ie=te===""?0:parseInt(te,10);Number.isNaN(ie)||M(Q=>({...Q,[H]:{...Q[H]??{},[J]:ie}}))},F=(H,J)=>{const te=J===""?0:parseFloat(J);Number.isNaN(te)||P(ie=>({...ie,[H]:te}))},V=(H,J)=>{b(te=>{const ie={...te};return J?delete ie[H]:ie[H]=!0,ie})},E=async()=>{G(!0),K(null),ue(!1);try{const H=await fetch("https://open.er-api.com/v6/latest/USD");if(!H.ok)throw new Error(`HTTP ${H.status}`);const J=await H.json();if(J.result!=="success")throw new Error(J["error-type"]||"Unknown error");const te=J.rates;P(ie=>{const Q={...ie};for(const q of Object.keys(Ze)){const ee=l1(q);ee!=null&&te[ee]!=null&&(Q[q]=+(1/te[ee]).toPrecision(6))}return Q}),ue(!0),pe(new Date),setTimeout(()=>ue(!1),3e3)}catch(H){K(H.message||"Failed to fetch live rates")}finally{G(!1)}},B=()=>{const H={...D},J=me,te={...I},ie={...x},Q={...j};h(H,J,te,ie,Q),o()};return u.jsxs(ss,{open:r,onClose:o,title:"Edit Balances & Settings",children:[u.jsx("div",{className:"edit-tabs",role:"tablist","aria-label":"Edit sections",children:o1.map(({id:H,label:J})=>u.jsx("button",{type:"button",role:"tab","aria-selected":v===H,"aria-controls":`edit-panel-${H}`,id:`edit-tab-${H}`,className:`edit-tab ${v===H?"edit-tab--active":""}`,onClick:()=>y(H),children:J},H))}),u.jsxs("div",{className:"modal-body",children:[v==="balances"&&u.jsxs("div",{id:"edit-panel-balances",role:"tabpanel","aria-labelledby":"edit-tab-balances",className:"edit-tab-panel",children:[u.jsxs("div",{className:"edit-section",children:[u.jsx("div",{className:"edit-section-title",children:"Credit Limit (USD)"}),u.jsx("input",{type:"number",className:"form-input",style:{textAlign:"right"},placeholder:"Enter credit limit",value:S,onChange:H=>k(H.target.value)}),u.jsx("div",{className:"form-hint",children:"The credit line extended to this customer"})]}),u.jsxs("div",{className:"edit-section",children:[u.jsx("div",{className:"edit-section-title",children:"Currency Balances"}),u.jsx("p",{className:"form-hint",style:{marginBottom:12},children:"Negative values = credit used (sold currency you didn't have). Toggle off to hide a currency from the table and from deposit/withdraw/trade."}),u.jsx("div",{className:"edit-balance-list",children:Object.entries(Ze).map(([H,J])=>{const te=D[H]??0,ie=te*(c[H]??0),Q=!x[H];return u.jsxs("div",{className:"edit-row edit-balance-row",children:[u.jsx("span",{className:"edit-flag",children:u.jsx(Qt,{code:H,fallback:J.flag,size:24})}),u.jsx("span",{className:"edit-code",children:H}),u.jsx("input",{type:"number",className:"form-input edit-input",value:te,onChange:q=>se(H,q.target.value)}),u.jsx("span",{className:`edit-usd ${ie<0?"negative":""}`,children:ke(ie)}),u.jsxs("label",{className:"currency-toggle",title:Q?"Hide currency from table and flows":"Show currency",children:[u.jsx("input",{type:"checkbox",role:"switch","aria-label":`${Q?"Disable":"Enable"} ${H}`,checked:Q,onChange:q=>V(H,q.target.checked)}),u.jsx("span",{className:"currency-toggle-slider","aria-hidden":"true"})]})]},H)})})]}),u.jsxs("div",{className:"edit-preview",children:[u.jsxs("div",{className:"edit-preview-row",children:[u.jsx("span",{className:"edit-preview-label",children:"Preview equity"}),u.jsx("span",{className:`edit-preview-value ${xe<0?"negative":""}`,children:ke(xe)})]}),u.jsxs("div",{className:"edit-preview-row",children:[u.jsx("span",{className:"edit-preview-label",children:"Preview available credit"}),u.jsx("span",{className:"edit-preview-value",children:ke(ce)})]})]})]}),v==="fluctuation"&&u.jsx("div",{id:"edit-panel-fluctuation",role:"tabpanel","aria-labelledby":"edit-tab-fluctuation",className:"edit-tab-panel",children:u.jsxs("div",{className:"edit-section",children:[u.jsx("div",{className:"edit-section-title-row",children:u.jsxs("div",{children:[u.jsx("div",{className:"edit-section-title",children:"Base rates & daily fluctuation"}),u.jsx("p",{className:"form-hint",style:{marginBottom:0},children:"1 bip = 0.01 %. Min/max define how far the rate can move from the base. Stablecoins are locked."})]})}),Y&&u.jsx("div",{className:"alert alert-error",style:{marginBottom:12},children:Y}),u.jsxs("div",{className:"btn-sync-row",style:{marginBottom:12},children:[u.jsx("button",{type:"button",className:`btn btn-outline btn-sync ${z?"btn-sync--loading":""} ${fe?"btn-sync--success":""}`,disabled:z,onClick:E,children:z?u.jsxs(u.Fragment,{children:[u.jsx("span",{className:"btn-sync-spinner","aria-hidden":"true"}),"Syncing…"]}):fe?u.jsxs(u.Fragment,{children:[u.jsx("span",{className:"btn-sync-check","aria-hidden":"true",children:"✓"}),"Synced"]}):u.jsxs(u.Fragment,{children:[u.jsx("span",{className:"btn-icon-wrap","aria-hidden":"true",children:u.jsx("img",{src:"/assets/icons/refresh.svg",alt:"",className:"btn-icon-img",style:{width:14,height:14}})}),"Sync live rates"]})}),he&&u.jsxs("span",{className:"last-synced-text",children:["Last synced ",he.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})]})]}),u.jsxs("div",{className:"edit-rate-range-header",children:[u.jsx("span",{className:"edit-rate-range-header-spacer"}),u.jsx("span",{className:"edit-rate-range-col-label",children:"Min bips"}),u.jsx("span",{className:"edit-rate-range-col-label edit-rate-range-col-label--base",children:"Base rate (USD)"}),u.jsx("span",{className:"edit-rate-range-col-label",children:"Max bips"})]}),u.jsx("div",{className:"edit-rate-range-list",children:Object.entries(Ze).map(([H,J])=>{const te=I[H]??{minBips:0,maxBips:0},ie=j[H]??0,Q=r1.has(H);return u.jsxs("div",{className:`edit-row edit-rate-range-row ${Q?"edit-rate-range-row--stable":""}`,children:[u.jsx("span",{className:"edit-flag",children:u.jsx(Qt,{code:H,fallback:J.flag,size:24})}),u.jsx("span",{className:"edit-code",children:H}),u.jsx("input",{type:"number",className:"form-input edit-input edit-input-bips",placeholder:"Min",value:te.minBips,disabled:Q,onChange:q=>L(H,"minBips",q.target.value)}),u.jsx("input",{type:"number",className:"form-input edit-input edit-input-base-rate",placeholder:"Base",step:"any",value:ie,disabled:Q,onChange:q=>F(H,q.target.value)}),u.jsx("input",{type:"number",className:"form-input edit-input edit-input-bips",placeholder:"Max",value:te.maxBips,disabled:Q,onChange:q=>L(H,"maxBips",q.target.value)})]},H)})})]})})]}),u.jsxs("div",{className:"modal-footer",children:[u.jsx("button",{type:"button",className:"btn btn-secondary",style:{background:"#f3f4f6",color:"#374151"},onClick:o,children:"Cancel"}),u.jsx("button",{type:"button",className:"btn btn-primary",onClick:B,children:"Save changes"})]})]})}const i1={deposit:{label:"Deposit",color:"#80D5A8",prefix:"",negative:!1},withdrawal:{label:"Withdrawal",color:"#F9A7A0",prefix:"– ",negative:!0},bought:{label:"Bought",color:"#60A5FA",prefix:"",negative:!1},sold:{label:"Sold",color:"#FFB556",prefix:"– ",negative:!0}};function a1({open:r,logs:o,onClose:s}){const c=g.useRef(null);return g.useEffect(()=>{r&&c.current&&(c.current.scrollTop=0)},[o.length,r]),u.jsx("aside",{className:`logs-drawer ${r?"logs-drawer--open":""}`,"aria-label":"Transaction logs","aria-hidden":!r,children:u.jsxs("div",{className:"logs-drawer-inner",children:[u.jsxs("div",{className:"logs-header",children:[u.jsx("span",{className:"logs-title",children:"Logs"}),u.jsx("button",{type:"button",className:"logs-close",onClick:s,"aria-label":"Close logs",tabIndex:r?0:-1,children:u.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",children:[u.jsx("line",{x1:"4",y1:"4",x2:"12",y2:"12"}),u.jsx("line",{x1:"12",y1:"4",x2:"4",y2:"12"})]})})]}),u.jsxs("div",{className:"logs-columns",children:[u.jsx("span",{className:"logs-col logs-col--amount",children:"Amount"}),u.jsx("span",{className:"logs-col logs-col--currency",children:"Currency"}),u.jsx("span",{className:"logs-col logs-col--closing",children:"Closing Balance"}),u.jsx("span",{className:"logs-col logs-col--type",children:"Txn. type"})]}),u.jsx("div",{className:"logs-body",ref:c,children:o.length===0?u.jsxs("div",{className:"logs-empty",children:[u.jsx("span",{className:"logs-empty-icon",children:"📋"}),u.jsx("span",{children:"No transactions yet"})]}):[...o].reverse().map(d=>{const f=i1[d.type],p=Ze[d.currency];return u.jsxs("div",{className:"log-row",children:[u.jsxs("span",{className:`log-cell log-cell--amount ${f.negative?"log-amount--negative":"log-amount--positive"}`,children:[f.prefix,Ge(d.amount)]}),u.jsx("span",{className:"log-cell log-cell--currency",title:d.currency,"aria-label":d.currency,children:u.jsx(Qt,{code:d.currency,fallback:p==null?void 0:p.flag,size:18,className:"log-flag"})}),u.jsx("span",{className:"log-cell log-cell--closing",children:d.closingBalance<0?`-${Ge(d.closingBalance)}`:`+${Ge(d.closingBalance)}`}),u.jsxs("span",{className:"log-cell log-cell--type",children:[u.jsx("span",{className:"log-txn-dot",style:{background:f.color}}),u.jsx("span",{className:"log-txn-label",children:f.label})]})]},d.id)})})]})})}const jf=Z0,c1=5e3,u1=Object.fromEntries(D0.map(r=>[r,0]));function Pf(r,o){const s={...r};return Object.keys(s).forEach(c=>{if(c==="USD"||c==="USDC"||c==="USDT")return;const{minBips:d,maxBips:f}=o[c]??{minBips:-5e3,maxBips:5e3};if(d===0&&f===0)return;const p=Math.random(),_=d+p*(f-d);s[c]=r[c]*(1+_/1e4)}),s}function d1(r,o,s){const c={...r};return Object.keys(c).forEach(d=>{if(d==="USD"||d==="USDC"||d==="USDT")return;const{minBips:f,maxBips:p}=s[d]??{minBips:-5e3,maxBips:5e3};if(f===0&&p===0)return;const _=.0025+Math.random()*.0125,h=Math.random()<.5?-1:1;c[d]=c[d]*(1+h*_);const v=o[d]*(1+f/1e4),y=o[d]*(1+p/1e4);c[d]=Math.max(v,Math.min(y,c[d]))}),c}const Rf=ba();function f1(){const[r,o]=g.useState("A"),[s,c]=g.useState(u1),[d,f]=g.useState(()=>({...Xo})),[p,_]=g.useState(()=>Pf(Xo,Rf)),[h,v]=g.useState(1e7),[y,S]=g.useState(Rf),[k,D]=g.useState(()=>new Date().toLocaleTimeString()),[R,x]=g.useState(!1),b=g.useRef(null),j=g.useRef(null),[P,I]=g.useState(!1),[M,z]=g.useState(!1),[G,Y]=g.useState(!1),[K,fe]=g.useState(!1),[ue,he]=g.useState(!1),[pe,me]=g.useState({AED:!0,AUD:!0,CHF:!0,DKK:!0,EUR:!0,EURC:!0,HKD:!0,IDR:!0,NOK:!0,PLN:!0,SEK:!0,SGD:!0}),[_e,xe]=g.useState([]),[ce,se]=g.useState(!1),L=g.useRef(s);L.current=s;const F=g.useRef(p);F.current=p;const V=g.useRef(1),E=g.useMemo(()=>Af(s,p,h),[s,p,h]),B=g.useCallback(()=>{j.current!=null&&(clearTimeout(j.current),j.current=null);const ee=Pf(d,y);b.current=ee,Or.flushSync(()=>x(!0)),j.current=setTimeout(()=>{b.current!=null&&(_(b.current),D(new Date().toLocaleTimeString()),b.current=null),x(!1),j.current=null},jf)},[d,y]),H=g.useCallback(()=>{_(ee=>d1(ee,d,y)),D(new Date().toLocaleTimeString())},[d,y]),J=g.useCallback(()=>{I(ee=>!ee)},[]);g.useEffect(()=>{if(!P)return;B();const ee=jf+c1,Z=setInterval(()=>{B()},ee);return()=>{clearInterval(Z)}},[P,B]);const te=g.useCallback((ee,Z)=>{const le=(L.current[ee]??0)+Z;c(ge=>({...ge,[ee]:le})),xe(ge=>[...ge,{id:V.current++,type:"deposit",currency:ee,amount:Z,closingBalance:le,timestamp:new Date}])},[]),ie=g.useCallback((ee,Z)=>{const le=(L.current[ee]??0)-Z;c(ge=>({...ge,[ee]:le})),xe(ge=>[...ge,{id:V.current++,type:"withdrawal",currency:ee,amount:Z,closingBalance:le,timestamp:new Date}])},[]),Q=g.useCallback((ee,Z,le)=>{const ge=F.current[ee]??0,Ee=F.current[Z]??0,Je=le*ge,kt=Ee>0?Je/Ee:0,Et=(L.current[ee]??0)-le,yt=(L.current[Z]??0)+kt;c(Gt=>({...Gt,[ee]:Et,[Z]:yt}));const In=new Date,Nt=V.current;V.current+=2,xe(Gt=>[...Gt,{id:Nt,type:"sold",currency:ee,amount:le,closingBalance:Et,timestamp:In},{id:Nt+1,type:"bought",currency:Z,amount:kt,closingBalance:yt,timestamp:In}])},[]),q=g.useCallback((ee,Z,le,ge,Ee)=>{c(ee),v(Z),le!=null&&S(le),ge!=null&&me(ge),Ee!=null&&f(Ee)},[]);return u.jsxs(u.Fragment,{children:[u.jsx(P0,{model:r,onModelChange:o}),u.jsxs("div",{className:`app-layout${ce?" app-layout--drawer-open":""}`,children:[u.jsx("div",{className:"app-main",children:u.jsxs("div",{className:"container",children:[u.jsx("h1",{className:"title",children:"Overview"}),u.jsx(J0,{totals:E,model:r,ratesLoading:R}),u.jsx(q0,{onDeposit:()=>z(!0),onWithdraw:()=>Y(!0),onTrade:()=>fe(!0)}),u.jsx(eg,{balances:s,rates:p,ratesLoading:R,disabledCurrencies:pe}),u.jsx(lg,{lastRefresh:k})]})}),u.jsx(a1,{open:ce,logs:_e,onClose:()=>se(!1)})]}),u.jsx(rg,{onSimulateFx:H,onEdit:()=>he(!0),onRefresh:B,onToggleLogs:()=>se(ee=>!ee),onToggleAutoRefresh:J,autoRefreshing:P,ratesLoading:R,logsOpen:ce}),u.jsx(qv,{open:M,onClose:()=>z(!1),balances:s,rates:p,onDeposit:te,disabledCurrencies:pe}),u.jsx(t1,{open:G,onClose:()=>Y(!1),balances:s,rates:p,totals:E,onWithdraw:ie,disabledCurrencies:pe,model:r}),u.jsx(n1,{open:K,onClose:()=>fe(!1),balances:s,rates:p,totals:E,onTrade:Q,disabledCurrencies:pe,model:r}),u.jsx(s1,{open:ue,onClose:()=>he(!1),balances:s,rates:p,creditLimit:h,rateRangeBips:y,baseRates:d,disabledCurrencies:pe,onSave:q}),!1]})}w0.createRoot(document.getElementById("root")).render(u.jsx(g.StrictMode,{children:u.jsx(f1,{})}));
