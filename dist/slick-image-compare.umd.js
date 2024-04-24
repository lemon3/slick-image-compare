/*!
* SlickImageCompare v0.2.12
* https://lemon3.github.io/slick-image-compare
*/
(function(l,o){typeof exports=="object"&&typeof module!="undefined"?module.exports=o():typeof define=="function"&&define.amd?define(o):(l=typeof globalThis!="undefined"?globalThis:l||self,l.SlickImageCompare=o())})(this,function(){"use strict";var Q=Object.defineProperty;var W=Object.getOwnPropertySymbols;var Z=Object.prototype.hasOwnProperty,K=Object.prototype.propertyIsEnumerable;var A=(l,o,d)=>o in l?Q(l,o,{enumerable:!0,configurable:!0,writable:!0,value:d}):l[o]=d,G=(l,o)=>{for(var d in o||(o={}))Z.call(o,d)&&A(l,d,o[d]);if(W)for(var d of W(o))K.call(o,d)&&A(l,d,o[d]);return l};var g=(l,o,d)=>(A(l,typeof o!="symbol"?o+"":o,d),d);const l={_s:new WeakMap,put(s,...i){this._s.has(s)||this._s.set(s,new Map);let t=this._s.get(s);if(i.length>1)return t.set(i[0],i[1]),this;if(typeof i[0]=="object")for(const e in i[0])t.set(e,i[0][e]);else t.set(i[0]);return this},get(s,i){return this._s.has(s)?i?this._s.get(s).get(i):this._s.get(s):!1},has(s,i){return this._s.has(s)&&this._s.get(s).has(i)},remove(s,i){if(!this._s.has(s))return!1;let t=this._s.get(s).delete(i);return this._s.get(s).size===0&&this._s.delete(s),t}},o=s=>{const i="DOMContentLoaded";document.readyState==="complete"||document.readyState==="interactive"?(s(),document.removeEventListener(i,s)):document.addEventListener(i,s,!1)},d=s=>new Promise((i,t)=>{const e=new Image;e.onload=()=>{const{naturalWidth:n,naturalHeight:r}=e,a=n/r;i({width:n,height:r,ratio:a})},e.onerror=()=>{t("error")},e.src=s}),q=(s,i,t=null)=>{if(!s)return!1;if(i===void 0||s.dataset[i]===void 0)return s.dataset;let e;try{e=JSON.parse(s.dataset[i].replace(/'/g,'"'))}catch(a){}if(typeof e!="object"){e=s.dataset[i];const a={};e=e.replace(/[\\ \t\n\r]/g,""),e=e.replace(/{?([^{])}?/g,"$1");const h=e.split(",");h.length>1?h.forEach(c=>{if(c){let[m,u]=c.split(":");u=u.replace(/'/g,""),u==="true"?u=!0:u==="false"&&(u=!1),a[m.replace(/'/g,"")]=u}}):a[i]=e,e=a}let n={},r=i.length;return Object.entries(s.dataset).forEach(a=>{if(a[0].toLowerCase().indexOf(i)>=0&&a[0].length>r){let h=a[0][r].toLowerCase()+a[0].substring(r+1);(t===null||t&&t[h]!==void 0)&&(n[h]=a[1])}}),Object.assign(e,n)};let E=!1;try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){return E={passive:!1},!1}}))}catch(s){E=!1}const z=(s,i,t)=>Math.max(i,Math.min(s,t)),L=(s,i,t)=>{if(s=parseFloat(s,10),i=parseFloat(i,10),t=parseFloat(t,10),t<i){let e=t;t=i,i=e}return!isNaN(i)&&s<i?i:!isNaN(t)&&s>t?t:s},B=(s,i,t,e)=>{if(i)for(let n in i)Object.prototype.hasOwnProperty.call(i,n)&&s.setAttribute(n,i[n]);if(t)for(let n in t)Object.prototype.hasOwnProperty.call(t,n)&&(s.style[n]=t[n]);return e&&(s.innerHTML=e),s},_=(s,i,t,e)=>B(document.createElement(s),i,t,e),S={Linear:s=>s,Quad:{easeIn:s=>Math.pow(s,2),easeOut:s=>1-Math.pow(1-s,2)},Cubic:{easeIn:s=>Math.pow(s,3),easeOut:s=>1-Math.pow(1-s,3)},Sine:{easeIn:s=>1-Math.cos(s*Math.PI/2),easeOut:s=>Math.sin(s*Math.PI/2)},Elastic:{easeOut:s=>{const i=2*Math.PI/3;return s===0||s===1?s:Math.pow(2,-10*s)*Math.sin((s*10-.75)*i)+1}}},X={autoInit:!0,startPos:50,beforeImage:null,afterImage:null,horizontal:!0,ltr:!0,smooth:!0,smoothAmount:250,animateOnClick:!0,followMouse:!1,onlyHandleDraggable:!1,clickable:!1,snapToStart:!1,snapToStartDelay:1e3,snapToStartDuration:1250,snapToStartEasing:S.Elastic.easeOut,handleMinDistance:0,animateIn:!1,animateInDuration:1250,animateInEasing:S.Elastic.easeOut,animateInDelay:100,animateInStartPos:40,animateDuration:250,animateEasing:S.Cubic.easeOut,beforeLabel:"",afterLabel:""};class U{constructor(){this._eventCallbacks=this._eventCallbacks||{}}emit(i,t){let e=this._eventCallbacks[i];const n={bubbles:!1,cancelable:!1,detail:t},r=new CustomEvent(i,n);e&&e.forEach(a=>a.call(this,r)),this.element.dispatchEvent(r)}addEventListener(i,t){return this.allowedEvents&&this.allowedEvents.indexOf(i)<0||typeof t!="function"?!1:(this._eventCallbacks[i]||(this._eventCallbacks[i]=[]),this._eventCallbacks[i].push(t),this)}removeEventListener(i,t){if(!this._eventCallbacks||arguments.length===0)return this._eventCallbacks={},this;let e=this._eventCallbacks[i];return e?arguments.length===1?(delete this._eventCallbacks[i],this):(this._eventCallbacks[i]=e.filter(n=>n!==t),this):this}}const C="sic",Y="data-"+C,w="interacting",x="init",k="drag",H="update",M="viewchanged",N="beforeshown",R="aftershown",$="interactionend",D="mousedown",J="resize";let P=[],O=!1;const F=(s=!0,i="#ffffff")=>`<svg xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    stroke="${i}"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="arcs">
    <path d="${s?"m12 24 8-8-8-8":"m20 8-8 8 8 8"}"/>
  </svg>`;class f extends U{constructor(t,e){if(!t)return{error:!0};if(t=typeof t=="string"?document.querySelector(t):t,t===null||t.length===0)return{error:!0};super();g(this,"_dimensions",t=>{const e=this.element.getBoundingClientRect(),n=getComputedStyle(this.element),r=parseFloat(n.borderLeftWidth)+parseFloat(n.borderRightWidth),a=parseFloat(n.borderTopWidth)+parseFloat(n.borderBottomWidth);this.width=e.width-r,this.height=e.height-a;let h;if(this._horizontal){const c=e.x;h=this._dragHandle.offsetWidth*.5,this._dim=this.width,this._offset=h-c,this._minPos=c+this.settings.handleMinDistance-h,this._maxPos=c+this.width-h-this.settings.handleMinDistance}else{const c=this.element.offsetTop;h=this._dragHandle.offsetHeight*.5,this._dim=this.height,this._offset=h-c,this._minPos=c+this.settings.handleMinDistance-h,this._maxPos=c+this.height-h-this.settings.handleMinDistance}!t&&this._oldDim===this._dim||(this._oldDim=this._dim,this._setPosition(this._percent,!0))});g(this,"_mouseOver",()=>{this._stopAni(),this.element.classList.add(w)});g(this,"_mouseOut",()=>{this.element.classList.remove(w),this.settings.snapToStart&&this._snapToStart()});g(this,"_mouseMove",t=>{this._stopAni(),this._setPosition(this._calcPercent(this._getPos(t)))});g(this,"_tapstart",t=>{t.stopPropagation(),this._endInteraction=!1,this._stopAni(),clearTimeout(this._snapTimeout),t.type==="touchstart"?(this.isTouch=!0,this._mouseStartEvents(!1)):D===t.type&&(this.isTouch=!1,this._touchStartEvent(!1));const e=this._calcPercent(this._getPos(t));this.settings.animateOnClick?this._animateTo(e,this.settings.animateDuration):this._setPosition(e)});g(this,"_dragStart",t=>{t.stopPropagation(),this.startPos=this._getPos(t),this.element.classList.add(w),this._tapstart(t),t.type==="touchstart"?(window.addEventListener("touchmove",this._drag,E),window.addEventListener("touchend",this._dragEnd,!1)):D===t.type&&(this.settings.followMouse||(window.addEventListener("mousemove",this._drag,!1),window.addEventListener("mouseup",this._dragEnd,!1)))});g(this,"_drag",t=>{this._stopAni();let e=this._getPos(t),n=this._calcPercent(e);if(this.isTouch){t.preventDefault();const r=Math.abs(this.startPos.x-e.x),a=Math.abs(this.startPos.y-e.y);if(!this._dirDetected){if(a>r){this.element.classList.remove(w),window.removeEventListener("touchmove",this._drag,E);return}this.element.classList.add(w),this._dirDetected=!0}}this._setPosition(n),this._triggerEvent(k)});g(this,"_dragEnd",t=>{this._endInteraction=!0,t.type==="touchend"?(this.isTouch=!0,window.removeEventListener("touchmove",this._drag,E),window.removeEventListener("touchend",this._dragEnd)):t.type==="mouseup"&&(this.isTouch=!1,this.settings.followMouse||(window.removeEventListener("mousemove",this._drag,!1),window.removeEventListener("mouseup",this._dragEnd,!1))),this._testInteractionEnd(),this._dirDetected=!1});if(t.dataset.bainitialized)return f.getInstance(t);t.dataset.bainitialized=!0,this.allowedEvents=[x,k,H,N,R,$,M],P.push(this),l.put(t,"instance",this),this.element=t;const n=q(t,C);if(this.options=e||{},this.settings=Object.assign({},f.defaults,n,e),this.images=this.element.querySelectorAll("img"),(!this.settings.beforeImage||!this.settings.afterImage)&&(!this.images||!this.images.length))return{error:!0};this.element.classList.contains(C+"-main")||this.element.classList.add(C+"-main"),this._snapTimeout=null,this._dirDetected=!1,this.settings.autoInit&&this.init()}_triggerEvent(t,e){e=G({instance:this,horizontal:this._horizontal,ltr:this._ltr,percent:this._percent,afterShown:this._afterShown},e),this.emit(t,e)}_getPos(t){let e;return typeof t.pageX!="undefined"?e=t:e=t.touches[0]||t.changedTouches[0],{x:e.pageX,y:e.pageY}}_createGui(){const t=this.settings;this._originalEl=[],this._createdEl=[];const e="div";let n,r;const a=_(e,{class:"sic-clip"});if(t.beforeImage||t.afterImage)this.images=[n,r]=[t.beforeImage,t.afterImage].reduce((y,T)=>(y.push(_("img",{draggable:!1,src:T})),y),[]),this.element.appendChild(n),a.appendChild(r),this.element.appendChild(a),this._createdEl.push(n);else{const[y,T]=this.images;n=y,n.setAttribute("draggable",!1),r=T.cloneNode(!0),r.setAttribute("draggable",!1),a.appendChild(r),T.parentNode.replaceChild(a,T),this._originalEl.push(T)}this._createdEl.push(a);const h=_(e,{class:"sic-handle"}),c=_(e,{class:"sic-line sic-line-1"}),m=_(e,{class:"sic-line sic-line-2"}),u=_(e,{class:"sic-arrows"}),I=_(e,{class:"sic-arrow sic-arrow-1"}),p=_(e,{class:"sic-arrow sic-arrow-2"}),j=_(e,{class:"sic-circle"});I.innerHTML=F(!1),p.innerHTML=F(),u.appendChild(I),u.appendChild(p),j.appendChild(u),h.appendChild(c),h.appendChild(m),h.appendChild(j),this.element.appendChild(h),this._createdEl.push(h);let v,b;t.beforeLabel!==""&&(v=_(e,{class:"sic-label sic-label-one"}),v.innerHTML=t.beforeLabel,this.element.appendChild(v),this._createdEl.push(v)),t.afterLabel!==""&&(b=_(e,{class:"sic-label sic-label-two"}),b.innerHTML=t.afterLabel,this.element.appendChild(b),this._createdEl.push(b)),this.info1=t.ltr?v:b,this.info2=t.ltr?b:v,this.element.classList.add(this._horizontal?"sic-horizontal":"sic-vertical"),this.element.style.visibility="visible",this._dragHandle=h,this._clipEl=a}_mouseStartEvents(t=!0){const e=this._addRemove(t),n=this.settings;if(n.followMouse){const r=this.element;r[e]("mouseenter",this._mouseOver,!1),r[e]("mouseleave",this._mouseOut,!1),r[e]("mousemove",this._mouseMove,!1)}else this._dragEl[e](D,this._dragStart),n.onlyHandleDraggable&&n.clickable&&(this.element[e](D,this._tapstart,!1),this.element[e]("mouseup",this._dragEnd,!1))}_addRemove(t=!0){return(t?"add":"remove")+"EventListener"}_touchStartEvent(t=!0){const e=this._addRemove(t);this._dragEl[e]("touchstart",this._dragStart,E),this.settings.clickable&&(this.element[e]("touchstart",this._tapstart,!1),this.element[e]("touchend",this._dragEnd,!1))}_appEvents(t=!0){this._touchStartEvent(t),this._mouseStartEvents(t);const e=this._addRemove(t);window[e](J,this._dimensions)}_stopAni(){this._renderId&&(cancelAnimationFrame(this._renderId),this._renderId=void 0)}_testInteractionEnd(){this._endInteraction&&this._renderId===void 0&&(this._endInteraction=!1,this._interactionEnd(),this._triggerEvent($))}_renderLoop(t,e,n){const r=()=>{const a=Date.now();if(this._timingThen!==0){if(this._timingCurTime+=a-this._timingThen,this.progress=this._timingCurTime/this._animationDuration,this.progress>=1){this.progress=1,this._setPosition(e),this._stopAni(),this._testInteractionEnd();return}this._setPosition(t+n*this.easing(this.progress))}else this.progress=0,this._setPosition(t);this._timingThen=a,this._renderId=requestAnimationFrame(r)};r()}_animateTo(t,e,n){if(t=z(+t,0,100),!e){this._setPosition(t);return}const r=t-this._percent;this._animationDuration=e,this.easing=n||this.settings.animateEasing,this.progress=0,this._timingThen=this._timingCurTime=0,this._renderLoop(this._percent,t,r)}_snapToStart(t=this.settings.snapToStartDelay){this._stopAni(),this._snapTimeout=setTimeout(()=>{this._animateTo(this.settings.startPos,this.settings.animateDuration,this.settings.animateEasing)},t)}_interactionEnd(){this.element.classList.remove(w),this.isTouch?this._mouseStartEvents():this._touchStartEvent(),this.settings.snapToStart&&this._snapToStart()}_getClipRect(t){return this._horizontal?this._ltr?`rect(0 ${t}px ${this.height}px 0)`:`rect(0 ${this.width}px ${this.height}px ${t}px)`:this._ltr?`rect(0 ${this.width}px ${t}px 0)`:`rect(${t}px ${this.width}px ${this.height}px 0)`}_changeStatus(t){this._afterShown=t;let e=this._afterShown?R:N;this._triggerEvent(e),this._triggerEvent(M),this._oneTime=!1}_setPosition(t,e=!1){if(t===this._percent&&!e)return!1;this._percent=t;const n=this._dim*.01*t;this._clipEl.style.clipPath=this._getClipRect(n),this._dragHandle.style.transform=this._horizontal?`translate(${n}px, 0)`:`translate(0, ${n}px)`,this.info1&&(this.info1.style.opacity=t<50?1:(100-t)/50),this.info2&&(this.info2.style.opacity=t>50?1:t/50);let r=this._ltr?this._afterShown:!this._afterShown;t>70&&(this._oneTime||!r)?this._changeStatus(this._ltr):t<30&&(this._oneTime||r)&&this._changeStatus(!this._ltr),this._triggerEvent(H)}_calcPercent(t){let e=this._horizontal?t.x:t.y;return e=z(e,this._minPos,this._maxPos),(e+this._offset)*100/this._dim}_smooth(t){this._animateTo(t,this.settings.smoothAmount)}init(){if(this._initialized)return this;const t=this.settings;this._initialized=!0,this._oneTime=!0,this._afterShown=!1,this._ltr=!!t.ltr,this._horizontal=t.horizontal,this._createGui(),this._timing={time:0,curTime:0},this._dragEl=t.onlyHandleDraggable?this._dragHandle:this.element,this._animationDuration=t.animateInDuration||0,t.startPos||(t.startPos=0),t.animateInStartPos||(t.animateInStartPos=0),t.animateIn?this._percent=this._animationDuration>0?t.animateInStartPos:t.startPos:this._percent=t.startPos,this.element.style.opacity=0,this.isTouch="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch||navigator.maxTouchPoints>0||window.navigator.msMaxTouchPoints>0,this.allowedEvents.forEach(e=>{t[e]&&this.addEventListener(e,t[e])}),d(this.images[0].src).then(()=>{this._dimensions(),this._setPosition(this._percent),this.element.style.opacity=1,t.animateIn&&this._animationDuration>0&&this.settings.animateInStartPos!==this.settings.startPos&&setTimeout(()=>this._animateTo(this.settings.startPos,this._animationDuration,this.settings.animateInEasing),this.settings.animateInDelay),this._appEvents(),this._triggerEvent(x),this._triggerEvent(M)})}play(t=this._percent,e=2,n=2e3,r){this._stopAni(),clearTimeout(this._snapTimeout),n=L(n,250,1e4),t=L(t,0,100);let a=this._percent,h=100-a,c=n/100*Math.abs(h),m=!0,u=0;e<=0&&(e=-1),this.progress=this._timingCurTime=this._timingThen=0,this.easing=r||S.Quad.easeOut;const I=()=>{let p=Date.now();if(this._timingCurTime+=p-(this._timingThen||p),this.progress=this._timingCurTime/c,this.progress>=1){if(u===e)return;c=n,m?(a=100,h=-100):(a=0,h=100),m=!m,u++,u===e&&(h=m?t:t-100,c=n/100*Math.abs(h)),this._setPosition(a),p=Date.now(),this._timingCurTime=0}else this._setPosition(a+h*this.easing(this.progress));this._timingThen=p,this._renderId=requestAnimationFrame(I)};I()}goto(t,e,n){return isNaN(t)||(t=L(+t,0,100),t===this._percent)?!1:(this._stopAni(),this._animateTo(t,e,n),this)}changeDirection(){this._ltr=!this._ltr;let t;t=this.info1,this.info1=this.info2,this.info2=t,this._percent=100-this._percent,this._dimensions(!0)}changeOrientation(){const t=this._horizontal;this._horizontal=!t,this.element.classList.remove(t?"sic-horizontal":"sic-vertical"),this.element.classList.add(this._horizontal?"sic-horizontal":"sic-vertical"),this._dimensions(!0)}showAfter(){this._setPosition(this._ltr?100:0)}showBefore(){this._setPosition(this._ltr?0:100)}get elem(){return this.element}toggle(){this._stopAni(),this._afterShown?this.showBefore():this.showAfter()}destroy(){this.element.removeAttribute("data-bainitialized"),this._createdEl.forEach(t=>this.element.removeChild(t)),this._originalEl.forEach(t=>this.element.appendChild(t)),this._createdEl=[],this._originalEl=[],this._percent=this.startPos,this._appEvents(!1),this._initialized=!1}}return f.init=()=>{if(O)return!0;O=!0;let s=document.querySelectorAll("["+Y+"]");return s.length===0?!1:(s.forEach(i=>{new f(i)}),P)},f.destroyAll=()=>P.length?(P.forEach(s=>{s.destroy()}),O=!1,P=[],!0):!1,f.getInstance=s=>l.get(s,"instance"),f.defaults=X,o(f.init),f});