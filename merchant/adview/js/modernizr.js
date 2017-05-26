var BrowserDetect={init:function(){this.browser=this.searchString(this.dataBrowser)||"Other",this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"Unknown"},searchString:function(e){for(var t=0;t<e.length;t++){var n=e[t].string;if(this.versionSearchString=e[t].subString,n.indexOf(e[t].subString)!=-1)return e[t].identity}},searchVersion:function(e){var t=e.indexOf(this.versionSearchString);if(t!=-1)return parseFloat(e.substring(t+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.userAgent,subString:"Safari",identity:"Safari"},{string:navigator.userAgent,subString:"Opera",identity:"Opera"}]};BrowserDetect.init(),"Explorer"==BrowserDetect.browser&&BrowserDetect.version<9&&(window.location.href="http://luosimao.com/ie6_must_die"),window.Modernizr=function(e,t,n){function r(e){b.cssText=e}function o(e,t){return r(x.join(e+";")+(t||""))}function i(e,t){return typeof e===t}function a(e,t){return!!~(""+e).indexOf(t)}function c(e,t){for(var r in e){var o=e[r];if(!a(o,"-")&&b[o]!==n)return"pfx"!=t||o}return!1}function s(e,t,r){for(var o in e){var a=t[e[o]];if(a!==n)return r===!1?e[o]:i(a,"function")?a.bind(r||t):a}return!1}function u(e,t,n){var r=e.charAt(0).toUpperCase()+e.slice(1),o=(e+" "+k.join(r+" ")+r).split(" ");return i(t,"string")||i(t,"undefined")?c(o,t):(o=(e+" "+T.join(r+" ")+r).split(" "),s(o,t,n))}function l(){m.input=function(n){for(var r=0,o=n.length;o>r;r++)P[n[r]]=!!(n[r]in S);return P.list&&(P.list=!(!t.createElement("datalist")||!e.HTMLDataListElement)),P}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),m.inputtypes=function(e){for(var r,o,i,a=0,c=e.length;c>a;a++)S.setAttribute("type",o=e[a]),r="text"!==S.type,r&&(S.value=w,S.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(o)&&S.style.WebkitAppearance!==n?(h.appendChild(S),i=t.defaultView,r=i.getComputedStyle&&"textfield"!==i.getComputedStyle(S,null).WebkitAppearance&&0!==S.offsetHeight,h.removeChild(S)):/^(search|tel)$/.test(o)||(r=/^(url|email)$/.test(o)?S.checkValidity&&S.checkValidity()===!1:S.value!=w)),D[e[a]]=!!r;return D}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var f,d,p="2.7.0",m={},g=!0,h=t.documentElement,v="modernizr",y=t.createElement(v),b=y.style,S=t.createElement("input"),w=":)",E={}.toString,x=" -webkit- -moz- -o- -ms- ".split(" "),C="Webkit Moz O ms",k=C.split(" "),T=C.toLowerCase().split(" "),M={svg:"http://www.w3.org/2000/svg"},N={},D={},P={},A=[],j=A.slice,F=function(e,n,r,o){var i,a,c,s,u=t.createElement("div"),l=t.body,f=l||t.createElement("body");if(parseInt(r,10))for(;r--;)c=t.createElement("div"),c.id=o?o[r]:v+(r+1),u.appendChild(c);return i=["&#173;",'<style id="s',v,'">',e,"</style>"].join(""),u.id=v,(l?u:f).innerHTML+=i,f.appendChild(u),l||(f.style.background="",f.style.overflow="hidden",s=h.style.overflow,h.style.overflow="hidden",h.appendChild(f)),a=n(u,e),l?u.parentNode.removeChild(u):(f.parentNode.removeChild(f),h.style.overflow=s),!!a},$=function(t){var n=e.matchMedia||e.msMatchMedia;if(n)return n(t).matches;var r;return F("@media "+t+" { #"+v+" { position: absolute; } }",function(t){r="absolute"==(e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).position}),r},B=function(){function e(e,o){o=o||t.createElement(r[e]||"div"),e="on"+e;var a=e in o;return a||(o.setAttribute||(o=t.createElement("div")),o.setAttribute&&o.removeAttribute&&(o.setAttribute(e,""),a=i(o[e],"function"),i(o[e],"undefined")||(o[e]=n),o.removeAttribute(e))),o=null,a}var r={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return e}(),z={}.hasOwnProperty;d=i(z,"undefined")||i(z.call,"undefined")?function(e,t){return t in e&&i(e.constructor.prototype[t],"undefined")}:function(e,t){return z.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var n=j.call(arguments,1),r=function(){if(this instanceof r){var o=function(){};o.prototype=t.prototype;var i=new o,a=t.apply(i,n.concat(j.call(arguments)));return Object(a)===a?a:i}return t.apply(e,n.concat(j.call(arguments)))};return r}),N.flexbox=function(){return u("flexWrap")},N.flexboxlegacy=function(){return u("boxDirection")},N.canvas=function(){var e=t.createElement("canvas");return!(!e.getContext||!e.getContext("2d"))},N.canvastext=function(){return!(!m.canvas||!i(t.createElement("canvas").getContext("2d").fillText,"function"))},N.webgl=function(){return!!e.WebGLRenderingContext},N.touch=function(){var n;return"ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch?n=!0:F(["@media (",x.join("touch-enabled),("),v,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(e){n=9===e.offsetTop}),n},N.geolocation=function(){return"geolocation"in navigator},N.postmessage=function(){return!!e.postMessage},N.websqldatabase=function(){return!!e.openDatabase},N.indexedDB=function(){return!!u("indexedDB",e)},N.hashchange=function(){return B("hashchange",e)&&(t.documentMode===n||t.documentMode>7)},N.history=function(){return!(!e.history||!history.pushState)},N.draganddrop=function(){var e=t.createElement("div");return"draggable"in e||"ondragstart"in e&&"ondrop"in e},N.websockets=function(){return"WebSocket"in e||"MozWebSocket"in e},N.rgba=function(){return r("background-color:rgba(150,255,150,.5)"),a(b.backgroundColor,"rgba")},N.hsla=function(){return r("background-color:hsla(120,40%,100%,.5)"),a(b.backgroundColor,"rgba")||a(b.backgroundColor,"hsla")},N.multiplebgs=function(){return r("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(b.background)},N.backgroundsize=function(){return u("backgroundSize")},N.borderimage=function(){return u("borderImage")},N.borderradius=function(){return u("borderRadius")},N.boxshadow=function(){return u("boxShadow")},N.textshadow=function(){return""===t.createElement("div").style.textShadow},N.opacity=function(){return o("opacity:.55"),/^0.55$/.test(b.opacity)},N.cssanimations=function(){return u("animationName")},N.csscolumns=function(){return u("columnCount")},N.cssgradients=function(){var e="background-image:",t="gradient(linear,left top,right bottom,from(#9f9),to(white));",n="linear-gradient(left top,#9f9, white);";return r((e+"-webkit- ".split(" ").join(t+e)+x.join(n+e)).slice(0,-e.length)),a(b.backgroundImage,"gradient")},N.cssreflections=function(){return u("boxReflect")},N.csstransforms=function(){return!!u("transform")},N.csstransforms3d=function(){var e=!!u("perspective");return e&&"webkitPerspective"in h.style&&F("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(t){e=9===t.offsetLeft&&3===t.offsetHeight}),e},N.csstransitions=function(){return u("transition")},N.fontface=function(){var e;return F('@font-face {font-family:"font";src:url("https://")}',function(n,r){var o=t.getElementById("smodernizr"),i=o.sheet||o.styleSheet,a=i?i.cssRules&&i.cssRules[0]?i.cssRules[0].cssText:i.cssText||"":"";e=/src/i.test(a)&&0===a.indexOf(r.split(" ")[0])}),e},N.generatedcontent=function(){var e;return F(["#",v,"{font:0/0 a}#",v,':after{content:"',w,'";visibility:hidden;font:3px/1 a}'].join(""),function(t){e=t.offsetHeight>=3}),e},N.video=function(){var e=t.createElement("video"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),n.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),n.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""))}catch(r){}return n},N.audio=function(){var e=t.createElement("audio"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),n.mp3=e.canPlayType("audio/mpeg;").replace(/^no$/,""),n.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),n.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(r){}return n},N.localstorage=function(){try{return localStorage.setItem(v,v),localStorage.removeItem(v),!0}catch(e){return!1}},N.sessionstorage=function(){try{return sessionStorage.setItem(v,v),sessionStorage.removeItem(v),!0}catch(e){return!1}},N.webworkers=function(){return!!e.Worker},N.applicationcache=function(){return!!e.applicationCache},N.svg=function(){return!!t.createElementNS&&!!t.createElementNS(M.svg,"svg").createSVGRect},N.inlinesvg=function(){var e=t.createElement("div");return e.innerHTML="<svg/>",(e.firstChild&&e.firstChild.namespaceURI)==M.svg},N.smil=function(){return!!t.createElementNS&&/SVGAnimate/.test(E.call(t.createElementNS(M.svg,"animate")))},N.svgclippaths=function(){return!!t.createElementNS&&/SVGClipPath/.test(E.call(t.createElementNS(M.svg,"clipPath")))};for(var L in N)d(N,L)&&(f=L.toLowerCase(),m[f]=N[L](),A.push((m[f]?"":"no-")+f));return m.input||l(),m.addTest=function(e,t){if("object"==typeof e)for(var r in e)d(e,r)&&m.addTest(r,e[r]);else{if(e=e.toLowerCase(),m[e]!==n)return m;t="function"==typeof t?t():t,"undefined"!=typeof g&&g&&(h.className+=" "+(t?"":"no-")+e),m[e]=t}return m},r(""),y=S=null,function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=y.elements;return"string"==typeof e?e.split(" "):e}function o(e){var t=v[e[g]];return t||(t={},h++,e[g]=h,v[h]=t),t}function i(e,n,r){if(n||(n=t),l)return n.createElement(e);r||(r=o(n));var i;return i=r.cache[e]?r.cache[e].cloneNode():m.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!i.canHaveChildren||p.test(e)||i.tagUrn?i:r.frag.appendChild(i)}function a(e,n){if(e||(e=t),l)return e.createDocumentFragment();n=n||o(e);for(var i=n.frag.cloneNode(),a=0,c=r(),s=c.length;s>a;a++)i.createElement(c[a]);return i}function c(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return y.shivMethods?i(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(y,t.frag)}function s(e){e||(e=t);var r=o(e);return!y.shivCSS||u||r.hasCSS||(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),l||c(e,r),e}var u,l,f="3.7.0",d=e.html5||{},p=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,m=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g="_html5shiv",h=0,v={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",u="hidden"in e,l=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){u=!0,l=!0}}();var y={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:f,shivCSS:d.shivCSS!==!1,supportsUnknownElements:l,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:s,createElement:i,createDocumentFragment:a};e.html5=y,s(t)}(this,t),m._version=p,m._prefixes=x,m._domPrefixes=T,m._cssomPrefixes=k,m.mq=$,m.hasEvent=B,m.testProp=function(e){return c([e])},m.testAllProps=u,m.testStyles=F,m.prefixed=function(e,t,n){return t?u(e,t,n):u(e,"pfx")},h.className=h.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(g?" js "+A.join(" "):""),m}(this,this.document);