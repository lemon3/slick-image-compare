/*!
* SlickImageCompare v0.4.8
* https://lemon3.github.io/slick-image-compare
*/
(function(o,h){typeof exports=="object"&&typeof module!="undefined"?module.exports=h():typeof define=="function"&&define.amd?define(h):(o=typeof globalThis!="undefined"?globalThis:o||self,o.SlickImageCompare=h())})(this,function(){"use strict";var V=Object.defineProperty;var U=Object.getOwnPropertySymbols;var tt=Object.prototype.hasOwnProperty,et=Object.prototype.propertyIsEnumerable;var A=(o,h,c)=>h in o?V(o,h,{enumerable:!0,configurable:!0,writable:!0,value:c}):o[h]=c,q=(o,h)=>{for(var c in h||(h={}))tt.call(h,c)&&A(o,c,h[c]);if(U)for(var c of U(h))et.call(h,c)&&A(o,c,h[c]);return o};var g=(o,h,c)=>A(o,typeof h!="symbol"?h+"":h,c);const o={_s:new WeakMap,put(i,...s){this._s.has(i)||this._s.set(i,new Map);let t=this._s.get(i);if(s.length>1)return t.set(s[0],s[1]),this;if(typeof s[0]=="object")for(const e in s[0])t.set(e,s[0][e]);else t.set(s[0]);return this},get(i,s){return this._s.has(i)?s?this._s.get(i).get(s):this._s.get(i):!1},has(i,s){return this._s.has(i)&&this._s.get(i).has(s)},remove(i,s){if(!this._s.has(i))return!1;let t=this._s.get(i).delete(s);return this._s.get(i).size===0&&this._s.delete(i),t}},h=i=>i===!0||i==="true"||i===1||i==="1",c=i=>new Promise((s,t)=>{const e=new Image;e.onload=()=>{const{naturalWidth:n,naturalHeight:a}=e,r=n/a;s({width:n,height:a,ratio:r})},e.onerror=()=>{t("error")},e.src=i}),G=i=>{if(!i.match(/[^\w]+/i))return i;const s={};return i=i.replace("{","").replace("}","").trim(),i.split(",").forEach(e=>{if(e==="")return;let[n,a]=e.split(":");n=n.trim().replaceAll("'",""),a=a.trim().replaceAll("'",""),s[n]=a}),s},X=(i,s)=>i?i.dataset[s]===void 0?i.dataset[s]:G(i.dataset[s]):!1;let v=!1;try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){return v={passive:!1},!1}}))}catch(i){v=!1}const z=(i,s,t)=>Math.max(s,Math.min(i,t)),p=(i,s,t)=>{if(i=parseFloat(i,10),s=parseFloat(s,10),t=parseFloat(t,10),t<s){let e=t;t=s,s=e}return!isNaN(s)&&i<s?s:!isNaN(t)&&i>t?t:i},Y=(i,s,t,e)=>{if(s)for(let n in s)Object.prototype.hasOwnProperty.call(s,n)&&i.setAttribute(n,s[n]);if(t)for(let n in t)Object.prototype.hasOwnProperty.call(t,n)&&(i.style[n]=t[n]);return i},d=(i,s,t,e)=>Y(document.createElement(i),s,t),P={Quad:{easeOut:i=>1-Math.pow(1-i,2)},Cubic:{easeOut:i=>1-Math.pow(1-i,3)},Elastic:{easeOut:i=>{const s=2*Math.PI/3;return i===0||i===1?i:Math.pow(2,-10*i)*Math.sin((i*10-.75)*s)+1}}},Q={combineDataset:!0,autoInit:!0,startPos:50,beforeImage:null,afterImage:null,horizontal:!0,ltr:!0,smooth:!0,smoothAmount:250,animateOnClick:!0,followMouse:!1,onlyHandleDraggable:!1,clickable:!1,snapToStart:!1,snapToStartDelay:1e3,snapToStartDuration:1250,snapToStartEasing:P.Elastic.easeOut,handleMinDistance:0,handleAngle:0,animateIn:!1,animateInDuration:1250,animateInEasing:P.Elastic.easeOut,animateInDelay:100,animateInStartPos:40,animateDuration:250,animateEasing:P.Cubic.easeOut,beforeLabel:"",afterLabel:""};class J{constructor(){this._eventCallbacks=this._eventCallbacks||{}}emit(s,t){let e=this._eventCallbacks[s];const n={bubbles:!1,cancelable:!1,detail:t},a=new CustomEvent(s,n);e&&e.forEach(r=>r.call(this,a)),this.element.dispatchEvent(a)}addEventListener(s,t){return this.allowedEvents&&this.allowedEvents.indexOf(s)<0||typeof t!="function"?!1:(this._eventCallbacks[s]||(this._eventCallbacks[s]=[]),this._eventCallbacks[s].push(t),this)}removeEventListener(s,t){if(!this._eventCallbacks||arguments.length===0)return this._eventCallbacks={},this;let e=this._eventCallbacks[s];return e?arguments.length===1?(delete this._eventCallbacks[s],this):(this._eventCallbacks[s]=e.filter(n=>n!==t),this):this}}const y="sic",Z="data-"+y,T="interacting",x="init",k="drag",H="update",L="viewchange",$="beforeshown",R="aftershown",N="interactionstart",F="interactionend",S="mousedown",C="mouseup",K="resize";let E=[],O=!1;const W=(i=!0,s="#ffffff")=>`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="${s}" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="${i?"m12 24 8-8-8-8":"m20 8-8 8 8 8"}"/></svg>`;class u{constructor(s,t){if(!s)return{error:!0};if(s=typeof s=="string"?document.querySelectorAll(s):s,s===null||s.length===0)return{error:!0};if(s.length>1){const e=[];return s.forEach(n=>{const a=new j(n,t);e.push(a)}),e}return s=s.length?s[0]:s,new j(s,t)}}class j extends J{constructor(t,e){super();g(this,"_dimensions",(t,e=!1,n=!this._horizontal)=>{const a=this.element.getBoundingClientRect(),r=getComputedStyle(this.element),f=parseFloat(r.borderLeftWidth)+parseFloat(r.borderRightWidth),m=parseFloat(r.borderTopWidth)+parseFloat(r.borderBottomWidth);this.width=a.width-f,this.height=a.height-m;let l;if(this._horizontal){const _=a.x;l=this._dragHandle.offsetWidth*.5,this._dim=this.width,this._offset=l-_,this._minPos=_+this.settings.handleMinDistance-l,this._maxPos=_+this.width-l-this.settings.handleMinDistance}else{const _=this.element.offsetTop;l=this._dragHandle.offsetHeight*.5,this._dim=this.height,this._offset=l-_,this._minPos=_+this.settings.handleMinDistance-l,this._maxPos=_+this.height-l-this.settings.handleMinDistance}!e&&this._oldDim===this._dim||(this._oldDim=this._dim,n&&this._usePicture&&this._checkCurrentImageSource(this._firstImage),this._radians&&(this._angleOffset=Math.tan(this._radians)*.5*(this._horizontal?this.height:this.width)),this._setPosition(this._percent,!0))});g(this,"_mouseOver",()=>{this.stop(),this.element.classList.add(T)});g(this,"_mouseOut",()=>{this.element.classList.remove(T),this.settings.snapToStart&&this._snapToStart()});g(this,"_mouseMove",t=>{this.stop(),this._setPosition(this._calcPercent(this._getPos(t)))});g(this,"_tapstart",t=>{t.stopPropagation(),this._endInteraction=!1,this.stop(),clearTimeout(this._snapTimeout),this._triggerEvent(N),t.type==="touchstart"?(this.isTouch=!0,this._mouseStartEvents(!1)):S===t.type&&(this.isTouch=!1,this._touchStartEvent(!1));const e=this._calcPercent(this._getPos(t));this.settings.animateOnClick?this._animateTo(e,this.settings.animateDuration):this._setPosition(e)});g(this,"_dragStart",t=>{t.stopPropagation(),this.startPos=this._getPos(t),this.element.classList.add(T),this._tapstart(t),t.type==="touchstart"?(window.addEventListener("touchmove",this._drag,v),window.addEventListener("touchend",this._dragEnd,!1)):S===t.type&&(this.settings.followMouse||(window.addEventListener("mousemove",this._drag,!1),window.addEventListener(C,this._dragEnd,!1)))});g(this,"_drag",t=>{this.stop();let e=this._getPos(t),n=this._calcPercent(e);if(this.isTouch){t.preventDefault();const a=Math.abs(this.startPos.x-e.x),r=Math.abs(this.startPos.y-e.y);if(!this._dirDetected){if(r>a){this.element.classList.remove(T),window.removeEventListener("touchmove",this._drag,v);return}this.element.classList.add(T),this._dirDetected=!0}}this._setPosition(n),this._triggerEvent(k)});g(this,"_dragEnd",t=>{this._endInteraction=!0,t.type==="touchend"?(this.isTouch=!0,window.removeEventListener("touchmove",this._drag,v),window.removeEventListener("touchend",this._dragEnd)):C===t.type&&(this.isTouch=!1,this.settings.followMouse||(window.removeEventListener("mousemove",this._drag,!1),window.removeEventListener(C,this._dragEnd,!1))),this._testInteractionEnd(),this._dirDetected=!1});if(t.dataset.sicinitialized)return u.getInstance(t);t.dataset.sicinitialized=!0,this.allowedEvents=[x,k,H,$,R,N,F,L],this.element=t,this.settings=this._createSettings(t,e),this.settings.autoInit&&this.init()}_triggerEvent(t,e){e=q({instance:this,horizontal:this._horizontal,ltr:this._ltr,percent:this._percent,afterShown:this._afterShown},e),this.emit(t,e)}_getPos(t){let e;return typeof t.pageX!="undefined"?e=t:e=t.touches[0]||t.changedTouches[0],{x:e.pageX,y:e.pageY}}_createGui(){const t=this.settings;this._originalEl=[],this._createdEl=[];const e="div";let n,a;const r=d(e,{class:"sic-clip"},{position:"absolute",left:0,top:0});if(t.beforeImage||t.afterImage)this.images=[n,a]=[t.beforeImage,t.afterImage].reduce((D,b)=>(D.push(d("img",{draggable:!1,src:b},{width:"100%",display:"block"})),D),[]),this.element.appendChild(n),r.appendChild(a),this.element.appendChild(r),this._createdEl.push(n);else{const[D,b]=this.picture&&this.picture.length===2?this.picture:this.images;n=D,a=b.cloneNode(!0),[n,a].forEach(M=>{M.setAttribute("draggable",!1),M.style.width="100%",M.style.display="block"}),r.appendChild(a),b.parentNode.replaceChild(r,b),this._originalEl.push(b)}this._createdEl.push(r);const f=d(e,{class:"sic-handle"},{position:"absolute"});let m,l;this._angle&&(m={transform:`rotate(${this._angle}deg)`,transformOrigin:"bottom center"},l={transform:`rotate(${this._angle}deg)`,transformOrigin:"top center"}),this._line1=d(e,{class:"sic-line sic-line-1"},m),this._line2=d(e,{class:"sic-line sic-line-2"},l);const _=d(e,{class:"sic-arrows"}),I=d(e,{class:"sic-arrow sic-arrow-1"}),w=d(e,{class:"sic-arrow sic-arrow-2"}),B=d(e,{class:"sic-circle"});I.innerHTML=W(!1),w.innerHTML=W(),_.append(I,w),B.append(_),f.append(this._line1,this._line2,B),this.element.append(f),this._createdEl.push(f),t.beforeLabel!==""&&(this.info1=d(e,{class:"sic-label sic-label-one"}),this.info1.innerHTML=decodeURIComponent(this._ltr?t.beforeLabel:t.afterLabel),this.element.append(this.info1),this._createdEl.push(this.info1)),t.afterLabel!==""&&(this.info2=d(e,{class:"sic-label sic-label-two"}),this.info2.innerHTML=decodeURIComponent(this._ltr?t.afterLabel:t.beforeLabel),this.element.append(this.info2),this._createdEl.push(this.info2)),this.element.classList.add(this._horizontal?"sic-horizontal":"sic-vertical"),this.element.style.position="relative",this.element.style.overflow="hidden",this.element.style.visibility="visible",this._dragHandle=f,this._clipEl=r}_mouseStartEvents(t=!0){const e=this._addRemove(t),n=this.settings;if(n.followMouse){const a=this.element;a[e]("mouseenter",this._mouseOver,!1),a[e]("mouseleave",this._mouseOut,!1),a[e]("mousemove",this._mouseMove,!1)}else this._dragEl[e](S,this._dragStart),n.onlyHandleDraggable&&n.clickable&&(this.element[e](S,this._tapstart,!1),this.element[e](C,this._dragEnd,!1))}_addRemove(t=!0){return(t?"add":"remove")+"EventListener"}_touchStartEvent(t=!0){const e=this._addRemove(t);this._dragEl[e]("touchstart",this._dragStart,v),this.settings.clickable&&(this.element[e]("touchstart",this._tapstart,!1),this.element[e]("touchend",this._dragEnd,!1))}_appEvents(t=!0){this._touchStartEvent(t),this._mouseStartEvents(t);const e=this._addRemove(t);window[e](K,this._dimensions)}stop(){this._renderId&&(cancelAnimationFrame(this._renderId),this.element.classList.contains("playing")&&this.element.classList.remove("playing"),this._renderId=void 0)}_testInteractionEnd(){this._endInteraction&&this._renderId===void 0&&(this._endInteraction=!1,this._interactionEnd(),this._triggerEvent(F))}_renderLoop(t,e,n){const a=()=>{const r=Date.now();if(this._timingThen!==0){if(this._timingCurTime+=r-this._timingThen,this.progress=this._timingCurTime/this._animationDuration,this.progress>=1){this.progress=1,this._setPosition(e),this.stop(),this._testInteractionEnd();return}this._setPosition(t+n*this.easing(this.progress))}else this.progress=0,this._setPosition(t);this._timingThen=r,this._renderId=requestAnimationFrame(a)};a()}_animateTo(t,e,n){if(t=z(+t,0,100),!e){this._setPosition(t);return}const a=t-this._percent;this._animationDuration=e,this.easing=n||this.settings.animateEasing,this.progress=0,this._timingThen=this._timingCurTime=0,this._renderLoop(this._percent,t,a)}_snapToStart(t=this.settings.snapToStartDelay){this.stop(),this._snapTimeout=setTimeout(()=>{this._animateTo(this.settings.startPos,this.settings.animateDuration,this.settings.animateEasing)},t)}_interactionEnd(){this.element.classList.remove(T),this.isTouch?this._mouseStartEvents():this._touchStartEvent(),this.settings.snapToStart&&this._snapToStart()}_checkCurrentImageSource(t){let e=setTimeout(()=>{clearTimeout(e);const n=t.currentSrc;this._firstImageSrc!==n&&(this._firstImageSrc=n,this._dimensions(null,!1,!1))},250)}_getClipPolygon(t){return this._horizontal?this._ltr?`polygon(${t+this._angleOffset}px 0, 100% 0, 100% 100%, ${t-this._angleOffset}px 100%)`:`polygon(0 0, ${t+this._angleOffset}px 0, ${t-this._angleOffset}px 100%, 0 100%)`:this._ltr?`polygon(0 ${t-this._angleOffset}px, 100% ${t+this._angleOffset}px, 100% 100%, 0 100%)`:`polygon(0 0, 100% 0, 100% ${t+this._angleOffset}px, 0 ${t-this._angleOffset}px)`}_getClipRect(t){return this._horizontal?this._ltr?`rect(0 ${this.width}px 100% ${t}px)`:`rect(0 ${t}px 100% 0)`:this._ltr?`rect(${t}px 100% 100% 0)`:`rect(0 100% ${t}px 0)`}_changeStatus(t){this._afterShown=t;let e=this._afterShown?R:$;this._triggerEvent(e),this._triggerEvent(L),this._oneTime=!1}_setPosition(t,e=!1){if(t===this._percent&&!e)return!1;this._percent=t;const n=this._dim*.01*t;this._clipEl.style.clipPath=this._getClip(n),this._dragHandle.style.transform=this._horizontal?`translate(${n}px, 0)`:`translate(0, ${n}px)`,this.info2&&(this.info2.style.opacity=Math.min(1,Math.max(0,(95-t)/45))),this.info1&&(this.info1.style.opacity=Math.min(1,Math.max(0,(t-5)/45)));let a=this._ltr?!this._afterShown:this._afterShown;t>55&&(this._oneTime||!a)?this._changeStatus(!this._ltr):t<45&&(this._oneTime||a)&&this._changeStatus(this._ltr),this._triggerEvent(H)}_calcPercent(t){let e=this._horizontal?t.x:t.y;return e=z(e,this._minPos,this._maxPos),(e+this._offset)*100/this._dim}_smooth(t){this._animateTo(t,this.settings.smoothAmount)}_createSettings(t,e={}){let n;const a=Object.assign({},u.defaults,e);if(a.combineDataset){let r=X(this.element,y);n=Object.assign({},u.defaults,r,e)}else n=a;return n}init(t=null){if(this._initialized)return this;E.push(this),o.put(this.element,"instance",this),t&&(this.settings=this._createSettings(this.element,t)),this.options=t;const e=this.settings;if(this.images=this.element.querySelectorAll("img"),this.picture=this.element.querySelectorAll("picture"),(!this.settings.beforeImage||!this.settings.afterImage)&&(!this.images||this.images.length!==2)&&(!this.picture||this.picture.length!==2))return{error:!0};this.element.classList.contains(y+"-main")||this.element.classList.add(y+"-main"),this._snapTimeout=null,this._dirDetected=!1,this._initialized=!0,this._oneTime=!0,this._afterShown=!1,this._ltr=h(e.ltr),this._horizontal=h(e.horizontal),this._usePicture=this.picture&&this.picture.length===2,this._angle=p(e.handleAngle,-30,30),this._getClip=this._getClipRect,this._angle&&(this._radians=this._angle*Math.PI/180,this._getClip=this._getClipPolygon),this._createGui(),this._dragEl=e.onlyHandleDraggable?this._dragHandle:this.element,this._animationDuration=e.animateInDuration||0,e.startPos=p(e.startPos,0,100),e.animateInStartPos=p(e.animateInStartPos,0,100),e.startPos||(e.startPos=50),e.animateInStartPos||(e.animateInStartPos=0),e.animateIn?this._percent=this._animationDuration>0?e.animateInStartPos:e.startPos:this._percent=e.startPos,this.element.style.opacity=0,this.isTouch="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch||navigator.maxTouchPoints>0||window.navigator.msMaxTouchPoints>0,this.allowedEvents.forEach(n=>{e[n]&&this.addEventListener(n,e[n])}),this._firstImage=this._usePicture?this.picture[0].querySelector("img"):this.images[0],this._firstImageSrc=this._firstImage.currentSrc||this._firstImage.src,c(this._firstImageSrc).then(()=>{this._dimensions(null,!0),this.element.style.opacity=1,e.animateIn&&this._animationDuration>0&&this.settings.animateInStartPos!==this.settings.startPos&&(this._snapTimeout=setTimeout(()=>this._animateTo(this.settings.startPos,this._animationDuration,this.settings.animateInEasing),this.settings.animateInDelay)),this._appEvents(),this._triggerEvent(x),this._triggerEvent(L)})}play(t=this._percent,e=2,n=2e3,a){this.stop(),clearTimeout(this._snapTimeout),n=p(n,250,1e4),t=p(t,0,100);let r=this._percent,f=100-r,m=n/100*Math.abs(f),l=!0,_=0;e<=0&&(e=-1),this.progress=this._timingCurTime=this._timingThen=0,this.easing=a||P.Quad.easeOut;const I=()=>{let w=Date.now();if(this._timingCurTime+=w-(this._timingThen||w),this.progress=this._timingCurTime/m,this.progress>=1){if(_===e){this.element.classList.remove("playing");return}m=n,l?(r=100,f=-100):(r=0,f=100),l=!l,_++,_===e&&(f=l?t:t-100,m=n/100*Math.abs(f)),this._setPosition(r),w=Date.now(),this._timingCurTime=0}else this._setPosition(r+f*this.easing(this.progress));this._timingThen=w,this._renderId=requestAnimationFrame(I)};this.element.classList.add("playing"),I()}animateTo(t,e=this.settings.animateDuration,n=this.settings.animateEasing){return isNaN(t)||(t=p(+t,0,100),t===this._percent)?!1:(this.stop(),this._animateTo(t,e,n),this)}goto(t){return isNaN(t)?!1:(t=p(+t,0,100),this.stop(),this._setPosition(t),this)}setAngle(t){t=+t,this._angle=t,this._angle===0?(this._getClip=this._getClipRect,this._line1.removeAttribute("style"),this._line2.removeAttribute("style"),this._radians=null):(this._getClip=this._getClipPolygon,this._radians=this._angle*Math.PI/180,this._line1.style.transform=`rotate(${this._angle}deg)`,this._line2.style.transform=`rotate(${this._angle}deg)`,this._horizontal?(this._line1.style.transformOrigin="bottom center",this._line2.style.transformOrigin="top center"):(this._line1.style.transformOrigin="right bottom",this._line2.style.transformOrigin="left bottom")),this._dimensions(null,!0)}changeDirection(){this._ltr=!this._ltr;let t=this.info1.innerHTML;this.info1.innerHTML=this.info2.innerHTML,this.info2.innerHTML=t,this._percent=100-this._percent,this._dimensions(null,!0)}changeOrientation(){const t=this._horizontal;this._horizontal=!t,this.element.classList.remove(t?"sic-horizontal":"sic-vertical"),this.element.classList.add(this._horizontal?"sic-horizontal":"sic-vertical"),this.setAngle(this._angle)}showAfter(){this._setPosition(this._ltr?0:100)}showBefore(){this._setPosition(this._ltr?100:0)}get elem(){return this.element}toggleView(){this.stop(),this._afterShown?this.showBefore():this.showAfter()}destroy(){this.element.removeAttribute("data-sicinitialized"),this._createdEl.forEach(t=>this.element.removeChild(t)),this._originalEl.forEach(t=>this.element.appendChild(t)),this._createdEl=this._originalEl=[],this.stop(),this.progress=this._timingCurTime=this._timingThen=0,this._snapTimeout=null,this._oneTime=!1,this._appEvents(!1),this._initialized=!1}}return u.defaults=Q,u.init=()=>O?!1:(O=!0,new u("["+Z+"]"),E),u.destroyAll=()=>E.length?(E.forEach(i=>{i.destroy()}),O=!1,E=[],!0):!1,u.getInstances=()=>E.length?E:!1,u.getInstance=i=>{o.get(i,"instance")},u.getDefaults=()=>u.defaults,u});
