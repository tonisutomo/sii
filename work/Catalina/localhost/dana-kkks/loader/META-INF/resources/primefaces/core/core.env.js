PrimeFaces.env={mobile:false,touch:false,ios:false,browser:null,init:function(){this.mobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);this.touch="ontouchstart" in window||window.navigator.msMaxTouchPoints||PrimeFaces.env.mobile;this.ios=/iPhone|iPad|iPod/i.test(window.navigator.userAgent);this.resolveUserAgent()},resolveUserAgent:function(){if($.browser){this.browser=$.browser}else{var a,d;jQuery.uaMatch=function(h){h=h.toLowerCase();var g=/(opr)[\/]([\w.]+)/.exec(h)||/(chrome)[ \/]([\w.]+)/.exec(h)||/(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(h)||/(webkit)[ \/]([\w.]+)/.exec(h)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(h)||/(msie) ([\w.]+)/.exec(h)||h.indexOf("trident")>=0&&/(rv)(?::| )([\w.]+)/.exec(h)||h.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(h)||[];var f=/(ipad)/.exec(h)||/(iphone)/.exec(h)||/(android)/.exec(h)||/(windows phone)/.exec(h)||/(win)/.exec(h)||/(mac)/.exec(h)||/(linux)/.exec(h)||/(cros)/i.exec(h)||[];return{browser:g[3]||g[1]||"",version:g[2]||"0",platform:f[0]||""}};a=jQuery.uaMatch(window.navigator.userAgent);d={};if(a.browser){d[a.browser]=true;d.version=a.version;d.versionNumber=parseInt(a.version)}if(a.platform){d[a.platform]=true}if(d.android||d.ipad||d.iphone||d["windows phone"]){d.mobile=true}if(d.cros||d.mac||d.linux||d.win){d.desktop=true}if(d.chrome||d.opr||d.safari){d.webkit=true}if(d.rv){var e="msie";a.browser=e;d[e]=true}if(d.opr){var c="opera";a.browser=c;d[c]=true}if(d.safari&&d.android){var b="android";a.browser=b;d[b]=true}d.name=a.browser;d.platform=a.platform;this.browser=d;$.browser=d}},isIE:function(a){return(a===undefined)?this.browser.msie:(this.browser.msie&&parseInt(this.browser.version,10)===a)},isLtIE:function(a){return(this.browser.msie)?parseInt(this.browser.version,10)<a:false}};PrimeFaces.env.init();