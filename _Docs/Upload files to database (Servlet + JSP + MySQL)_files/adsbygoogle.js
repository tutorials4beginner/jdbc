(function(){var r=this,x=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b},aa=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b},ba=function(a,b,c){return a.call.apply(a.bind,arguments)},ca=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},z=function(a,b,c){z=Function.prototype.bind&&
-1!=Function.prototype.bind.toString().indexOf("native code")?ba:ca;return z.apply(null,arguments)};var da=(new Date).getTime();var fa=function(){},ha=function(a,b,c){switch(typeof b){case "string":ga(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(b instanceof Array){var d=b.length;c.push("[");for(var f="",e=0;e<d;e++)c.push(f),ha(a,b[e],c),f=",";c.push("]");break}c.push("{");d="";for(f in b)b.hasOwnProperty(f)&&(e=b[f],"function"!=typeof e&&(c.push(d),ga(f,c),c.push(":"),ha(a,e,c),
d=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}},ia={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},ja=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g,ga=function(a,b){b.push('"');b.push(a.replace(ja,function(a){if(a in ia)return ia[a];var b=a.charCodeAt(0),f="\\u";16>b?f+="000":256>b?f+="00":4096>b&&(f+="0");return ia[a]=f+b.toString(16)}));b.push('"')};var ka=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},sa=function(a){if(!la.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(ma,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(na,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(oa,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(pa,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(qa,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(ra,"&#0;"));return a},ma=/&/g,na=/</g,oa=/>/g,pa=/"/g,qa=/'/g,ra=/\x00/g,la=/[\x00&<>"']/,
ta={"\x00":"\\0","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"\\":"\\\\"},A={"'":"\\'"},ua=function(a,b){return a<b?-1:a>b?1:0},va=function(){return"transition".replace(/\-([a-z])/g,function(a,b){return b.toUpperCase()})},wa=function(a){var b="\\s";return a.replace(new RegExp("(^"+(b?"|["+b+"]+":"")+")([a-z])","g"),function(a,b,f){return b+f.toUpperCase()})};var B=function(a){B[" "](a);return a};B[" "]=function(){};var C=function(a){try{var b;if(b=!!a&&null!=a.location.href)a:{try{B(a.foo);b=!0;break a}catch(c){}b=!1}return b}catch(d){return!1}},D=function(a,b){if(!(1E-4>Math.random())){var c=Math.random();if(c<b){try{var d=new Uint16Array(1);window.crypto.getRandomValues(d);c=d[0]/65536}catch(f){c=Math.random()}return a[Math.floor(c*a.length)]}}return null},xa=/^(-?[0-9.]{1,30})$/,E=function(a){return xa.test(a)&&(a=Number(a),!isNaN(a))?a:null};var ya=function(a){var b=a.toString();a.name&&-1==b.indexOf(a.name)&&(b+=": "+a.name);a.message&&-1==b.indexOf(a.message)&&(b+=": "+a.message);if(a.stack){a=a.stack;var c=b;try{-1==a.indexOf(c)&&(a=c+"\n"+a);for(var d;a!=d;)d=a,a=a.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/,"$1");b=a.replace(/\n */g,"\n")}catch(f){b=c}}return b};var za=document,F=window;var G=function(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b.call(null,a[c],c,a)},H=function(a){return!!a&&"function"==typeof a&&!!a.call},Aa=function(a,b){if(!(2>arguments.length))for(var c=1,d=arguments.length;c<d;++c)a.push(arguments[c])},Ba=function(a){var b=document;b.addEventListener?b.addEventListener("DOMContentLoaded",a,!1):b.attachEvent&&b.attachEvent("onDOMContentLoaded",a)},Ca=function(a){a.google_unique_id?++a.google_unique_id:a.google_unique_id=1},Da=function(a){a=
a.google_unique_id;return"number"==typeof a?a:0},Ea=function(a){var b=a.length;if(0==b)return 0;for(var c=305419896,d=0;d<b;d++)c^=(c<<5)+(c>>2)+a.charCodeAt(d)&4294967295;return 0<c?c:4294967296+c},I=function(a,b){return b.getComputedStyle?b.getComputedStyle(a,null):a.currentStyle},Fa=/(^| )adsbygoogle($| )/;var Ga={google_ad_modifications:!0,google_analytics_domain_name:!0,google_analytics_uacct:!0},Ha=function(a){a.google_page_url&&(a.google_page_url=String(a.google_page_url));var b=[];G(a,function(a,d){if(null!=a){var f;try{var e=[];ha(new fa,a,e);f=e.join("")}catch(g){}f&&(f=f.replace(/\\|\//,"\\$&"),Aa(b,d,"=",f,";"))}});return b.join("")};var Ia={overlays:1,interstitials:2};var J=function(a){a=parseFloat(a);return isNaN(a)||1<a||0>a?0:a},Ja=function(a,b){return/^true$/.test(a)?!0:/^false$/.test(a)?!1:b},Ka=/^([\w-]+\.)*([\w-]{2,})(\:[0-9]+)?$/,La=function(a,b){if(!a)return b;var c=a.match(Ka);return c?c[0]:b};var Ma=J("0.15"),Na=J("0.006"),Oa=J("0.001"),Pa=J("0.001"),Qa=J("0.2"),Ra=Ja("true",!0);var Sa=Ja("false",!1),Ta=Ja("false",!1);var Ua=!!window.google_async_iframe_id,Va=function(a,b,c){var d=["<iframe"],f;for(f in a)a.hasOwnProperty(f)&&Aa(d,f+"="+a[f]);d.push('style="left:0;position:absolute;top:0;"');d.push("></iframe>");a=a.id;b="border:none;height:"+c+"px;margin:0;padding:0;position:relative;visibility:visible;width:"+b+"px;background-color:transparent";return['<ins id="',a+"_expand",'" style="display:inline-table;',b,'"><ins id="',a+"_anchor",'" style="display:block;',b,'">',d.join(" "),"</ins></ins>"].join("")};var Wa=!0,Xa={},$a=function(a,b,c,d){var f=Ya,e,g=Wa;try{e=b()}catch(h){try{var k=ya(h);b="";h.fileName&&(b=h.fileName);var l=-1;h.lineNumber&&(l=h.lineNumber);g=f(a,k,b,l,c)}catch(p){try{var m=ya(p);a="";p.fileName&&(a=p.fileName);c=-1;p.lineNumber&&(c=p.lineNumber);Ya("pAR",m,a,c,void 0,void 0)}catch(v){Za({context:"mRE",msg:v.toString()+"\n"+(v.stack||"")},void 0)}}if(!g)throw h;}finally{if(d)try{d()}catch(t){}}return e},Ya=function(a,b,c,d,f,e){var g={};if(f)try{f(g)}catch(h){}g.context=a;g.msg=
b.substring(0,512);c&&(g.file=c);0<d&&(g.line=d.toString());g.url=za.URL.substring(0,512);g.ref=za.referrer.substring(0,512);ab(g);Za(g,e);return Wa},Za=function(a,b){try{if(Math.random()<(b||.01)){var c="/pagead/gen_204?id=jserror"+bb(a),d="http"+("http:"==F.location.protocol?"":"s")+"://pagead2.googlesyndication.com"+c,d=d.substring(0,2E3);F.google_image_requests||(F.google_image_requests=[]);var f=F.document.createElement("img");f.src=d;F.google_image_requests.push(f)}}catch(e){}},ab=function(a){var b=
a||{};G(Xa,function(a,d){b[d]=F[a]})},cb=function(a,b){return function(){var c=arguments;return $a(a,function(){return b.apply(void 0,c)},void 0,void 0)}},db=function(a,b){return cb(a,b)},eb=function(a){return cb("aa:reactiveTag",a)},bb=function(a){var b="";G(a,function(a,d){if(0===a||a)b+="&"+d+"="+("function"==typeof encodeURIComponent?encodeURIComponent(a):escape(a))});return b};var fb=null,gb=function(){if(!fb){for(var a=window,b=a,c=0;a&&a!=a.parent;)if(a=a.parent,c++,C(a))b=a;else break;fb=b}return fb};var hb=function(a){var b=arguments.length;if(1==b&&"array"==x(arguments[0]))return hb.apply(null,arguments[0]);for(var c={},d=0;d<b;d++)c[arguments[d]]=!0;return c};var ib={ha:"google_auto_instream_debug",ia:"google_anchor_debug",ja:"google_infinite_scroll_debug",ka:"google_inflate_debug",ma:"google_ia_debug",na:"google_ia_debug_fi",pa:"google_ia_debug_spa",oa:"google_ia_debug_scr",qa:"google_ladder_rung_debug",ra:"google_lat_debug",sa:"google_lat_debug_all",ta:"google_resize_debug",la:"google_inflate_debug_all"};var K=function(a){a=a.document;return("CSS1Compat"==a.compatMode?a.documentElement:a.body)||{}},kb=function(a){var b=!1;G(ib,function(c){jb(a,c)&&(b=!0)});return b},jb=function(a,b){if(!a||!a.indexOf)return!1;if(-1!=a.indexOf(b))return!0;var c=lb(b);return-1!=a.indexOf(c)?!0:!1},lb=function(a){var b="";G(a.split("_"),function(a){b+=a.substr(0,2)});return b};var mb={"120x90":!0,"160x90":!0,"180x90":!0,"200x90":!0,"468x15":!0,"728x15":!0};var nb=/^([0-9.]+)px$/,ob=/^([0-9.]+)$/,L=function(a){return(a=nb.exec(a))?Number(a[1]):null},pb=function(a,b){for(var c=["width","height"],d=0;d<c.length;d++){var f="google_ad_"+c[d];if(!b.hasOwnProperty(f)){var e;e=(e=L(a[c[d]]))?Math.round(e):null;null!=e&&(b[f]=e)}}},qb=function(a,b){var c=b.document.documentElement;try{var d=c.getBoundingClientRect();return a.getBoundingClientRect().top-d.top}catch(f){return 0}};var rb={rectangle:1,horizontal:2,vertical:4};var sb=[{width:970,height:90,format:2},{width:728,height:90,format:2},{width:468,height:60,format:2},{width:336,height:280,format:1},{width:320,height:100,format:2},{width:320,height:50,format:2},{width:300,height:600,format:4},{width:300,height:250,format:1},{width:250,height:250,format:1},{width:234,height:60,format:2},{width:200,height:200,format:1},{width:180,height:150,format:1},{width:160,height:600,format:4},{width:125,height:125,format:1},{width:120,height:600,format:4},{width:120,height:240,
format:4}],tb=function(a,b){return b.width-a.width||b.height-a.height};var ub=Array.prototype,vb=ub.forEach?function(a,b,c){ub.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,f="string"==typeof a?a.split(""):a,e=0;e<d;e++)e in f&&b.call(c,f[e],e,a)};var wb=hb("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));var M=function(){this.H="";this.T=xb};M.prototype.n=!0;M.prototype.l=function(){return this.H};M.prototype.toString=function(){return"Const{"+this.H+"}"};var yb=function(a){return a instanceof M&&a.constructor===M&&a.T===xb?a.H:"type_error:Const"},xb={};var N=function(){this.F="";this.R=zb};N.prototype.n=!0;var zb={};N.prototype.l=function(){return this.F};N.prototype.v=function(a){this.F=a;return this};var Ab=(new N).v(""),Bb=/^[-,."'%_!# a-zA-Z0-9]+$/;var O=function(){this.o="";this.S=Cb};O.prototype.n=!0;O.prototype.l=function(){return this.o};O.prototype.D=!0;O.prototype.q=function(){return 1};var Cb={};var P=function(){this.M="";this.U=Db};P.prototype.n=!0;P.prototype.l=function(){return this.M};P.prototype.D=!0;P.prototype.q=function(){return 1};var Db={};var Q=function(){this.o="";this.Q=Eb;this.J=null};Q.prototype.D=!0;Q.prototype.q=function(){return this.J};Q.prototype.n=!0;Q.prototype.l=function(){return this.o};
var Fb=function(a){return a instanceof Q&&a.constructor===Q&&a.Q===Eb?a.o:"type_error:SafeHtml"},Gb=/^[a-zA-Z0-9-]+$/,Hb={action:!0,cite:!0,data:!0,formaction:!0,href:!0,manifest:!0,poster:!0,src:!0},Ib={EMBED:!0,IFRAME:!0,LINK:!0,OBJECT:!0,SCRIPT:!0,STYLE:!0,TEMPLATE:!0},Kb=function(a){var b=0,c="",d=function(a){if("array"==x(a))vb(a,d);else{if(!(a instanceof Q)){var e=null;a.D&&(e=a.q());a=Jb(sa(a.n?a.l():String(a)),e)}c+=Fb(a);a=a.q();0==b?b=a:0!=a&&b!=a&&(b=null)}};vb(arguments,d);return Jb(c,
b)},Eb={},Jb=function(a,b){return(new Q).v(a,b)};Q.prototype.v=function(a,b){this.o=a;this.J=b;return this};Jb("",0);var R;a:{var Lb=r.navigator;if(Lb){var Mb=Lb.userAgent;if(Mb){R=Mb;break a}}R=""};var S=function(){return-1!=R.indexOf("Edge")};var Nb=-1!=R.indexOf("Opera")||-1!=R.indexOf("OPR"),T=-1!=R.indexOf("Edge")||-1!=R.indexOf("Trident")||-1!=R.indexOf("MSIE"),U=-1!=R.indexOf("Gecko")&&!(-1!=R.toLowerCase().indexOf("webkit")&&!S())&&!(-1!=R.indexOf("Trident")||-1!=R.indexOf("MSIE"))&&!S(),Ob=-1!=R.toLowerCase().indexOf("webkit")&&!S(),Pb=function(){var a=R;if(U)return/rv\:([^\);]+)(\)|;)/.exec(a);if(T&&S())return/Edge\/([\d\.]+)/.exec(a);if(T)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(Ob)return/WebKit\/(\S+)/.exec(a)},Qb=
function(){var a=r.document;return a?a.documentMode:void 0},Rb=function(){if(Nb&&r.opera){var a=r.opera.version;return"function"==x(a)?a():a}var a="",b=Pb();b&&(a=b?b[1]:"");return T&&!S()&&(b=Qb(),b>parseFloat(a))?String(b):a}(),Sb={},Tb=function(a){var b;if(!(b=Sb[a])){b=0;for(var c=ka(String(Rb)).split("."),d=ka(String(a)).split("."),f=Math.max(c.length,d.length),e=0;0==b&&e<f;e++){var g=c[e]||"",h=d[e]||"",k=RegExp("(\\d*)(\\D*)","g"),l=RegExp("(\\d*)(\\D*)","g");do{var p=k.exec(g)||["","",""],
m=l.exec(h)||["","",""];if(0==p[0].length&&0==m[0].length)break;b=ua(0==p[1].length?0:parseInt(p[1],10),0==m[1].length?0:parseInt(m[1],10))||ua(0==p[2].length,0==m[2].length)||ua(p[2],m[2])}while(0==b)}b=Sb[a]=0<=b}return b},Ub=r.document,Vb=Qb(),Wb=!Ub||!T||!Vb&&S()?void 0:Vb||("CSS1Compat"==Ub.compatMode?parseInt(Rb,10):5);var Xb;if(!(Xb=!U&&!T)){var Yb;if(Yb=T)Yb=T&&(S()||9<=Wb);Xb=Yb}Xb||U&&Tb("1.9.1");T&&Tb("9");var Zb={};var $b=function(a){var b=!1,c;return function(){b||(c=a(),b=!0);return c}}(function(){if(T)return Tb("10.0");var a=document.createElement("DIV"),b=Ob?"-webkit":U?"-moz":T?"-ms":Nb?"-o":null,c={transition:"opacity 1s linear"};b&&(c[b+"-transition"]="opacity 1s linear");b={style:c};if(!Gb.test("div"))throw Error("Invalid tag name <div>.");if("DIV"in Ib)throw Error("Tag name <div> is not allowed for SafeHtml.");var c=null,d="<div";if(b)for(var f in b){if(!Gb.test(f))throw Error('Invalid attribute name "'+
f+'".');var e=b[f];if(null!=e){var g;g=f;if(e instanceof M)e=yb(e);else if("style"==g.toLowerCase()){if(!aa(e))throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, '+typeof e+" given: "+e);if(!(e instanceof N)){var h="",k=void 0;for(k in e){if(!/^[-_a-zA-Z0-9]+$/.test(k))throw Error("Name allows only [-_a-zA-Z0-9], got: "+k);var l=e[k];if(null!=l){if(l instanceof M)l=yb(l);else if(Bb.test(l)){for(var p=!0,m=!0,v=0;v<l.length;v++){var t=l.charAt(v);"'"==t&&m?
p=!p:'"'==t&&p&&(m=!m)}p&&m||(l="zClosurez")}else l="zClosurez";h+=k+":"+l+";"}}e=h?(new N).v(h):Ab}h=void 0;h=e instanceof N&&e.constructor===N&&e.R===zb?e.F:"type_error:SafeStyle";e=h}else{if(/^on/i.test(g))throw Error('Attribute "'+g+'" requires goog.string.Const value, "'+e+'" given.');if(g.toLowerCase()in Hb)if(e instanceof P)e=e instanceof P&&e.constructor===P&&e.U===Db?e.M:"type_error:TrustedResourceUrl";else if(e instanceof O)e=e instanceof O&&e.constructor===O&&e.S===Cb?e.o:"type_error:SafeUrl";
else throw Error('Attribute "'+g+'" on tag "div" requires goog.html.SafeUrl or goog.string.Const value, "'+e+'" given.');}e.n&&(e=e.l());g=g+'="'+sa(String(e))+'"';d+=" "+g}}f=void 0;void 0!==f?"array"==x(f)||(f=[f]):f=[];!0===wb.div?d+=">":(c=Kb(f),d+=">"+Fb(c)+"</div>",c=c.q());(b=b&&b.dir)&&(c=/^(ltr|rtl|auto)$/i.test(b)?0:null);b=Jb(d,c);a.innerHTML=Fb(b);a=a.firstChild;b=a.style[va()];"undefined"!==typeof b?a=b:(b=a.style,c=Zb.transition,c||(c=f=va(),void 0===a.style[f]&&(f=(Ob?"Webkit":U?"Moz":
T?"ms":Nb?"O":null)+wa(f),void 0!==a.style[f]&&(c=f)),Zb.transition=c),a=b[c]||"");return""!=a});var ac=function(a,b){this.t=[0,0];this.i=a||"";this.u=b||""},V=function(a,b,c){a.t[b]|=c},W=function(a,b){0>a.i.indexOf(b)&&(a.i=b+a.i)},bc=function(a,b){0>a.u.indexOf(b)&&(a.u=b+a.u)};ac.prototype.toString=function(){return[this.t[0],this.t[1],this.i,this.u].join("|")};
var cc=function(a){var b={$:0,Z:0,V:!0};this.r=a;this.s=null;try{this.s=this.r.getBoundingClientRect()}catch(c){}var d=function(a){return a||0==a?+a:null},f=d(b.width);this.p=f;this.m=a=d(b.height);var e=d(b.$);this.A=f==e?null:e;d=d(b.Z);this.w=a==d?null:d;this.K=!!b.V;b.ua&&$b();this.i=new ac},dc=function(a,b,c){if(3!=b.nodeType&&1==b.nodeType){if(/^(head|script|style)$/i.test(b.nodeName))return 0;try{var d=I(b,c)}catch(f){}if(d){if("none"==d.display||"fixed"==d.position)return 0;if("absolute"==
d.position){if(!a.s)return 0;c=null;try{c=b.getBoundingClientRect()}catch(e){return 0}return(c.right>a.s.left?2:0)|(c.bottom>a.s.top?4:0)}}return 1}return 0},ec=function(a,b,c){var d=0;if(!b||!b.parentElement)return!0;for(var f=!1,e=0,g=b.parentElement.childNodes,h=0;h<g.length;h++){var k=g[h];k==b?f=!0:(k=dc(a,k,c),d|=k,f&&(e|=k))}e&1&&(d&2&&V(a.i,0,8),d&4&&V(a.i,1,8));return!(d&1)},fc=function(a,b,c,d,f,e,g){null!=e&&null!=g&&("string"==typeof f&&(f=E(f),null==f&&(bc(a.i,"n"),V(a.i,0,1))),null!=
f&&(b?a.K&&c.setAttribute(d,Math.max(f+g-e,0)):V(a.i,0,1)))},X=function(a,b,c,d,f,e,g,h,k){if(null!=h&&null!=k){if("string"==typeof g){if(""==g||"auto"==g||"none"==g||"100%"==g||"0px"==g&&"min"==e.substring(0,3))return;g=L(g);null==g&&(bc(a.i,"p"),V(a.i,b,c))}null!=g&&(d&&f?a.K&&(a=Math.max(g+k-h,0),f[e]=a+"px"):V(a.i,b,c))}};var gc=function(a,b,c){if(!a)return null;for(var d=0;d<a.length;++d)if((a[d].ad_slot||b)==b&&(a[d].ad_tag_origin||c)==c)return a[d];return null};Wa=!Sa;Xa={client:"google_ad_client",format:"google_ad_format",slotname:"google_ad_slot",output:"google_ad_output",ad_type:"google_ad_type",async_oa:"google_async_for_oa_experiment",dimpr:"google_always_use_delayed_impressions_experiment",peri:"google_top_experiment",pse:"google_pstate_expt"};var hc=function(a,b,c){c||(c=Ta?"https":"http");return[c,"://",a,b].join("")};var ic=null;var jc=function(a){this.k=a;a.google_iframe_oncopy||(a.google_iframe_oncopy={handlers:{},upd:z(this.fa,this)});this.ca=a.google_iframe_oncopy},kc=sa("var i=this.id,s=window.google_iframe_oncopy,H=s&&s.handlers,h=H&&H[i],w=this.contentWindow,d;try{d=w.document}catch(e){}if(h&&d&&(!d.body||!d.body.firstChild)){if(h.call){setTimeout(h,0)}else if(h.match){try{h=s.upd(h,i)}catch(e){}w.location.replace(h)}}");
jc.prototype.set=function(a,b){this.ca.handlers[a]=b;this.k.addEventListener&&this.k.addEventListener("load",z(this.X,this,a),!1)};jc.prototype.X=function(a){a=this.k.document.getElementById(a);try{var b=a.contentWindow.document;if(a.onload&&b&&(!b.body||!b.body.firstChild))a.onload()}catch(c){}};
jc.prototype.fa=function(a,b){var c=lc("rx",a),d;a:{if(a&&(d=a.match("dt=([^&]+)"))&&2==d.length){d=d[1];break a}d=""}d=(new Date).getTime()-d;c=c.replace(/&dtd=(\d+|M)/,"&dtd="+(1E4>d?d+"":"M"));this.set(b,c);return c};var lc=function(a,b){var c=new RegExp("\\b"+a+"=(\\d+)"),d=c.exec(b);d&&(b=b.replace(c,a+"="+(+d[1]+1||1)));return b};var mc=function(a){if(!a)return"";(a=a.toLowerCase())&&"ca-"!=a.substring(0,3)&&(a="ca-"+a);return a};var Y,Z=function(a){this.C=[];this.k=a||window;this.j=0;this.B=null;this.P=0},nc=function(a,b){this.Y=a;this.ga=b};Z.prototype.W=function(a,b){0!=this.j||0!=this.C.length||b&&b!=window?this.L(a,b):(this.j=2,this.O(new nc(a,window)))};Z.prototype.L=function(a,b){this.C.push(new nc(a,b||this.k));oc(this)};Z.prototype.aa=function(a){this.j=1;if(a){var b=db("sjr::timeout",z(this.N,this,!0));this.B=this.k.setTimeout(b,a)}};
Z.prototype.N=function(a){a&&++this.P;1==this.j&&(null!=this.B&&(this.k.clearTimeout(this.B),this.B=null),this.j=0);oc(this)};Z.prototype.ba=function(){return!(!window||!Array)};Z.prototype.da=function(){return this.P};Z.prototype.nq=Z.prototype.W;Z.prototype.nqa=Z.prototype.L;Z.prototype.al=Z.prototype.aa;Z.prototype.rl=Z.prototype.N;Z.prototype.sz=Z.prototype.ba;Z.prototype.tc=Z.prototype.da;var oc=function(a){var b=db("sjr::tryrun",z(a.ea,a));a.k.setTimeout(b,0)};
Z.prototype.ea=function(){if(0==this.j&&this.C.length){var a=this.C.shift();this.j=2;var b=db("sjr::run",z(this.O,this,a));a.ga.setTimeout(b,0);oc(this)}};Z.prototype.O=function(a){this.j=0;a.Y()};
var pc=function(a){try{return a.sz()}catch(b){return!1}},qc=function(a){return!!a&&("object"==typeof a||"function"==typeof a)&&pc(a)&&H(a.nq)&&H(a.nqa)&&H(a.al)&&H(a.rl)},rc=function(){if(Y&&pc(Y))return Y;var a=gb(),b=a.google_jobrunner;return qc(b)?Y=b:a.google_jobrunner=Y=new Z(a)},sc=function(a,b){rc().nq(a,b)},tc=function(a,b){rc().nqa(a,b)};var uc=Ua?1==Da(F):!Da(F),vc=function(){var a=B("script"),b;b=La("","pagead2.googlesyndication.com");return["<",a,' src="',hc(b,"/pagead/js/r20150317/r20150224/show_ads_impl.js",""),'"></',a,">"].join("")},wc=function(a,b,c,d){return function(){var f=!1;d&&rc().al(3E4);var e=a.document.getElementById(b);e&&!C(e.contentWindow)&&
3==a.google_top_js_status&&(a.google_top_js_status=6);try{if(C(a.document.getElementById(b).contentWindow)){var g=a.document.getElementById(b).contentWindow,h=g.document;h.body&&h.body.firstChild||(h.open(),g.google_async_iframe_close=!0,h.write(c))}else{var k=a.document.getElementById(b).contentWindow,l;e=c;e=String(e);if(e.quote)l=e.quote();else{g=['"'];for(h=0;h<e.length;h++){var p=e.charAt(h),m=p.charCodeAt(0),v=h+1,t;if(!(t=ta[p])){var u;if(31<m&&127>m)u=p;else{var n=p;if(n in A)u=A[n];else if(n in
ta)u=A[n]=ta[n];else{var w=n,q=n.charCodeAt(0);if(31<q&&127>q)w=n;else{if(256>q){if(w="\\x",16>q||256<q)w+="0"}else w="\\u",4096>q&&(w+="0");w+=q.toString(16).toUpperCase()}u=A[n]=w}}t=u}g[v]=t}g.push('"');l=g.join("")}k.location.replace("javascript:"+l)}f=!0}catch(y){k=gb().google_jobrunner,qc(k)&&k.rl()}f&&(f=lc("google_async_rrc",c),(new jc(a)).set(b,wc(a,b,f,!1)))}},xc=function(a){var b=["<iframe"];G(a,function(a,d){null!=a&&b.push(" "+d+'="'+a+'"')});b.push("></iframe>");return b.join("")},zc=
function(a,b,c){yc(a,b,c,function(a,b,e){a=a.document;for(var g=b.id,h=0;!g||a.getElementById(g);)g="aswift_"+h++;b.id=g;b.name=g;g=Number(e.google_ad_width);h=Number(e.google_ad_height);16==e.google_reactive_ad_format?(e=a.createElement("div"),e.innerHTML=Va(b,g,h),c.appendChild(e.firstChild)):c.innerHTML=Va(b,g,h);return b.id})},yc=function(a,b,c,d){var f=B("script"),e={},g=b.google_ad_height;e.width='"'+b.google_ad_width+'"';e.height='"'+g+'"';e.frameborder='"0"';e.marginwidth='"0"';e.marginheight=
'"0"';e.vspace='"0"';e.hspace='"0"';e.allowtransparency='"true"';e.scrolling='"no"';e.allowfullscreen='"true"';e.onload='"'+kc+'"';d=d(a,e,b);var e=Ac(b)?D(["c","e"],Qa):null,h=b.google_ad_output,g=b.google_ad_format;g||"html"!=h&&null!=h||(g=b.google_ad_width+"x"+b.google_ad_height,"e"==e&&(g+="_as"));h=!b.google_ad_slot||Ac(b);g=g&&h?g.toLowerCase():"";b.google_ad_format=g;for(var g=[b.google_ad_slot,b.google_ad_format,b.google_ad_type,b.google_ad_width,b.google_ad_height],h=[],k=0,l=c;l&&25>k;l=
l.parentNode,++k)h.push(9!=l.nodeType&&l.id||"");(h=h.join())&&g.push(h);b.google_ad_unit_key=Ea(g.join(":")).toString();g=a.google_adk2_experiment=a.google_adk2_experiment||D(["C","E"],Pa)||"N";if("E"==g){g=[];for(h=0;c&&25>h;++h){k=(k=9!=c.nodeType&&c.id)?"/"+k:"";a:{if(c&&c.nodeName&&c.parentElement)for(var l=c.nodeName.toString().toLowerCase(),p=c.parentElement.childNodes,m=0,v=0;v<p.length;++v){var t=p[v];if(t.nodeName&&t.nodeName.toString().toLowerCase()==l){if(c==t){l="."+m;break a}++m}}l=
""}g.push((c.nodeName&&c.nodeName.toString().toLowerCase())+k+l);c=c.parentElement}c=g.join()+":";g=a;h=[];if(g)try{for(var u=g.parent,k=0;u&&u!=g&&25>k;++k){for(var n=u.frames,l=0;l<n.length;++l)if(g==n[l]){h.push(l);break}g=u;u=g.parent}}catch(w){}b.google_ad_unit_key_2=Ea(c+h.join()).toString()}else"C"==g&&(b.google_ad_unit_key_2="ctrl");var u=Ha(b),q;b=b.google_ad_client;if(n=uc){if(!ic)b:{c=[F.top];n=[];for(g=0;h=c[g++];){n.push(h);try{if(h.frames)for(var y=h.frames.length,k=0;k<y&&1024>c.length;++k)c.push(h.frames[k])}catch(ea){}}for(y=
0;y<n.length;y++)try{if(q=n[y].frames.google_esf){ic=q;break b}}catch(Kc){}ic=null}n=!ic}n?(q={style:"display:none"},q["data-ad-client"]=mc(b),q.id="google_esf",q.name="google_esf",q.src=hc(La("","googleads.g.doubleclick.net"),"/pagead/html/r20150317/r20150224/zrt_lookup.html"),q=xc(q)):q="";y=(new Date).getTime();b=a.google_top_experiment;if(n=a.google_async_for_oa_experiment)a.google_async_for_oa_experiment=
void 0;c=a.google_always_use_delayed_impressions_experiment;e=["<!doctype html><html><body>",q,"<",f,">",u,"google_show_ads_impl=true;google_unique_id=",a.google_unique_id,';google_async_iframe_id="',d,'";google_start_time=',da,";",b?'google_top_experiment="'+b+'";':"",n?'google_async_for_oa_experiment="'+n+'";':"",c?'google_always_use_delayed_impressions_experiment="'+c+'";':"",e?'google_append_as_for_format_override="'+e+'";':"","google_bpp=",y>da?y-da:1,";google_async_rrc=0;</",f,">",vc(),"</body></html>"].join("");
(a.document.getElementById(d)?sc:tc)(wc(a,d,e,!0))},Bc=Math.floor(1E6*Math.random()),Cc=function(a){var b;try{b={};for(var c=a.data.split("\n"),d=0;d<c.length;d++){var f=c[d].indexOf("=");-1!=f&&(b[c[d].substr(0,f)]=c[d].substr(f+1))}}catch(e){}c=b[3];if(b[1]==Bc&&(window.google_top_js_status=4,a.source==top&&0==c.indexOf(a.origin)&&(window.google_top_values=b,window.google_top_js_status=5),window.google_top_js_callbacks)){for(a=0;a<window.google_top_js_callbacks.length;a++)window.google_top_js_callbacks[a]();
window.google_top_js_callbacks.length=0}},Ac=function(a){return a.google_override_format||!mb[a.google_ad_width+"x"+a.google_ad_height]&&"aa"==a.google_loader_used},Dc=function(a,b){var c=navigator;if(Ra&&a&&b&&c){var d=a.document,c=d.createElement("script"),f=mc(b);c.async=!0;c.type="text/javascript";c.src=hc("pagead2.googlesyndication.com","/pub-config/"+f+".js");d=d.getElementsByTagName("script")[0];d.parentNode.insertBefore(c,d)}};var Ec=function(a){return Fa.test(a.className)&&"done"!=a.getAttribute("data-adsbygoogle-status")},Gc=function(a,b){var c=window;a.setAttribute("data-adsbygoogle-status","done");Fc(a,b,c)},Fc=function(a,b,c){Hc(a,b,c);if(!Ic(a,b,c)){Ca(c);1==Da(c)&&Dc(c,b.google_ad_client);G(Ga,function(a,d){b[d]=b[d]||c[d]});b.google_loader_used="aa";var d=b.google_ad_output;if(d&&"html"!=d)throw Error("No support for google_ad_output="+d);$a("aa::main",function(){zc(c,b,a)})}},Ic=function(a,b,c){var d;var f=b.google_ad_slot;
d=c.google_ad_modifications;if(!d||gc(d.ad_whitelist,f,b.google_tag_origin))d=null;else{var e=d.space_collapsing||"none";d=(f=gc(d.ad_blacklist,f))?{I:!0,G:f.space_collapsing||e}:d.remove_ads_by_default?{I:!0,G:e}:null}if(d&&d.I){if("none"==d.G)return!0;if(null!==E(a.getAttribute("width"))||null!==E(a.getAttribute("height")))a.setAttribute("width",0),a.setAttribute("height",0);a.style.width="0px";a.style.height="0px";if("slot_and_pub"==d.G&&(a=new cc(a),b=a.r.ownerDocument,b=b.defaultView||b.parentWindow,
ec(a,a.r,b),c=a.r.parentElement))for(;c;){try{var g=/^head$/i.test(c.nodeName)?null:I(c,b)}catch(h){bc(a.i,"c")}d=a;var k=b,e=c,f=g;try{var l=e.style}catch(p){bc(d.i,"s")}var m=e.getAttribute("width"),v=E(m),t=e.getAttribute("height"),u=E(t),k=ec(d,e,k),n=l?l.width:null,w=n?L(n):null,q=l?l.height:null,y=q?L(l.height):null,w=null!==w&&d.p>=w||null!==v&&d.p>=v,y=null!==y&&d.m>=y||null!==u&&d.m>=u,m=k||y||!m&&!n,t=k||w||!t&&!q;fc(d,m,e,"width",v,d.p,d.A);fc(d,t,e,"height",u,d.m,d.w);X(d,0,1,m,l,"width",
l.width,d.p,d.A);X(d,1,1,t,l,"height",l.height,d.m,d.w);X(d,0,2,m,l,"minWidth",f&&f.minWidth,d.p,d.A);X(d,1,2,t,l,"minHeight",f&&f.minHeight,d.m,d.w);X(d,0,4,m,l,"maxWidth",f&&f.maxWidth,d.p,d.A);X(d,1,4,t,l,"maxHeight",f&&f.maxHeight,d.m,d.w);if(g)if("none"==g.display){W(a.i,"n");break}else if("absolute"==g.position){W(a.i,"a");break}else if("fixed"==g.position){W(a.i,"f");break}else if("hidden"==g.visibility||"collapse"==g.visibility){W(a.i,"v");break}else"hidden"==g.overflow&&W(a.i,"o");c=c.parentElement;
if(!c)try{c=b.frameElement;var ea=b.parent;ea&&ea!=b&&(b=ea)}catch(Kc){W(a.i,"c");break}}return!0}return!(g=I(a,c))||"none"!=g.display||"on"==b.google_adtest||0<b.google_reactive_ad_format||b.google_reactive_ads_config?!1:(c.document.createComment&&a.appendChild(c.document.createComment("No ad requested because of display:none on the adsbygoogle tag")),!0)},Hc=function(a,b,c){for(var d=a.attributes,f=d.length,e=0;e<f;e++){var g=d[e];if(/data-/.test(g.name)){var h=g.name.replace("data","google").replace(/-/g,
"_");b.hasOwnProperty(h)||(g=g.value,"google_reactive_ad_format"==h&&(g=+g,g=isNaN(g)?null:g),null===g||(b[h]=g))}}kb(c.location.hash)&&(b.google_adtest="on");if(b.google_enable_content_recommendations&&1==b.google_reactive_ad_format)b.google_ad_width=K(c).clientWidth,b.google_ad_height=50,a.style.display="none";else if(1==b.google_reactive_ad_format)b.google_ad_width=320,b.google_ad_height=50,a.style.display="none";else if(8==b.google_reactive_ad_format)b.google_ad_width=K(c).clientWidth||0,b.google_ad_height=
K(c).clientHeight||0,a.style.display="none",jb(c.location.hash,"google_ia_debug_spa")&&(b.google_vignette_manual_trigger=!0);else if(d=b.google_ad_format,"auto"==d||/^((^|,) *(horizontal|vertical|rectangle) *)+$/.test(d)){var d=a.offsetWidth,f=b.google_ad_format,k;if("auto"==f)k=K(c).clientWidth,k=Math.min(1200,k),k=.25>=d/k?4:3;else{e=0;for(k in rb)-1!=f.indexOf(k)&&(e|=rb[k]);k=e}b&&(b.google_responsive_formats=k);a:{e=sb.sort(tb);if(g=h=488>K(c).clientWidth)g=Math.min(K(c).clientHeight,16*K(c).clientWidth/
9),g=qb(a,c)<g-100;c=g;for(g=0;g<e.length;g++){var l=e[g];if(e[g].width<=d&&l.format&k&&!(320==l.width&&(h&&50==l.height||!h&&100==l.height)||c&&250<=l.height)){c=l;break a}}c=null}if(!c)throw Error("Cannot find a responsive size for a container of width="+d+"px and data-ad-format="+f);b.google_ad_width=300<d&&300<c.height?c.width:1200<d?1200:Math.round(d);b.google_ad_height=c.height;a.style.height=c.height+"px";b.google_ad_resizable=!0;delete b.google_ad_format;b.google_loader_features_used=128}else{if(!ob.test(b.google_ad_width)&&
!nb.test(a.style.width)||!ob.test(b.google_ad_height)&&!nb.test(a.style.height))d=I(a,c),a.style.width=d.width,a.style.height=d.height,pb(d,b),b.google_loader_features_used=256;else{pb(a.style,b);a:{if(!(b.google_ad_output&&"html"!=b.google_ad_output||300!=b.google_ad_width||250!=b.google_ad_height)&&(d=K(c).clientHeight,qb(a,c)>1.5*d&&(d=D("C E CL EL CM EM".split(" "),Na)))&&(f="E"==d||"EL"==d||"EM"==d,k=a.style.width,a.style.width="100%",e=a.offsetWidth,a.style.width=k,!(336>e)&&("C"==d||"E"==d||
("CL"==d||"EL"==d)&&600>e||("CM"==d||"EM"==d)&&450>K(c).scrollWidth))){f&&(b.google_available_width=e);break a}d=void 0}b.google_efmwe=d}f=b.google_ad_width;d=b.google_ad_height;f&&d&&!mb[f+"x"+d]&&(d=D("CD ED CA EA CW EW".split(" "),Oa))&&("CD"==d?b.google_overflowing_ads_experiment=d:((f=/W$/.test(d)&&728>f)||(f=/^E/.test(d),k=K(c),a&&a.getBoundingClientRect&&k&&k.getBoundingClientRect?(c=a.getBoundingClientRect(),k=k.getBoundingClientRect(),c=Math.min(c.right,k.right)-Math.max(c.left,k.left),c=
Math.round(Math.max(0,c))):c=0,k=b.google_ad_width,160>c||15>k-c?a=!1:(e=a.style.width||"",a.style.width="100%",h=a.offsetWidth,160>h||0>c-h?(a.style.width=e,a=!1):(f?(b.google_original_width=k,b.google_ad_width=c,a.style.width=c+"px"):a.style.width=e,a=!0)),f=!a&&"ED"!=d),f||(b.google_overflowing_ads_experiment=d)))}0<b.google_reactive_ad_format&&!b.google_pgb_reactive&&(b.google_pgb_reactive=3)},Jc=function(a){for(var b=document.getElementsByTagName("ins"),c=0,d=b[c];c<b.length;d=b[++c])if(Ec(d)&&
(!a||d.id==a))return d;return null},Lc=!1,Mc=function(a){var b={};G(Ia,function(c,f){a.hasOwnProperty(f)&&(b[f]=a[f])});aa(a.enable_page_level_ads)&&(b.page_level_pubvars=a.enable_page_level_ads);var c=document.createElement("ins");c.className="adsbygoogle";c.style.display="none";document.body.appendChild(c);Gc(c,{google_reactive_ads_config:b,google_ad_client:a.google_ad_client})},Nc=function(a){if(Lc)throw Error("adsbygoogle.push(): Only one 'enable_page_level_ads'  allowed per page.");Lc=!0;document.body?
Mc(a):Ba(eb(function(){Mc(a)}))},Oc=function(a){var b;a:{if(a.enable_page_level_ads){if("string"==typeof a.google_ad_client){b=!0;break a}throw Error("adsbygoogle.push(): 'google_ad_client' is missing from the tag config.");}b=!1}if(b)Nc(a);else{b=a.element;a=a.params||{};if(b){if(!Ec(b)&&(b=b.id&&Jc(b.id),!b))throw Error("adsbygoogle: 'element' has already been filled.");if(!("innerHTML"in b))throw Error("adsbygoogle.push(): 'element' is not a good DOM element.");}else if(b=Jc(),!b)throw Error("adsbygoogle.push(): All ins elements in the DOM with class=adsbygoogle already have ads in them.");
Gc(b,a)}},Pc=function(){if(!window.google_top_experiment&&!window.google_top_js_status){var a=window;if(2!==(a.top==a?0:C(a.top)?1:2))window.google_top_js_status=0;else if(top.postMessage){var b;try{b=F.top.frames.google_top_static_frame?!0:!1}catch(c){b=!1}if(b){if(window.google_top_experiment=D(["jp_c","jp_zl","jp_wfpmr","jp_zlt","jp_wnt"],Ma),"jp_c"!==window.google_top_experiment){a=window;a.addEventListener?a.addEventListener("message",Cc,!1):a.attachEvent&&a.attachEvent("onmessage",Cc);window.google_top_js_status=
3;a={0:"google_loc_request",1:Bc};b=[];for(var d in a)b.push(d+"="+a[d]);top.postMessage(b.join("\n"),"*")}}else window.google_top_js_status=2}else window.google_top_js_status=1}if((d=window.adsbygoogle)&&d.shift)for(b=20;(a=d.shift())&&0<b--;)try{Oc(a)}catch(f){throw window.setTimeout(Pc,0),f;}d&&d.loaded||(window.adsbygoogle={push:Oc,loaded:!0})};Pc();})();