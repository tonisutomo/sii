PrimeFaces.widget.OutputPanel=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.cfg.global=this.cfg.global||false;if(this.cfg.deferred){if(this.cfg.deferredMode==="load"){this.loadContent()}else{if(this.cfg.deferredMode==="visible"){if(this.visible()){this.loadContent()}else{this.bindScrollMonitor()}}}}},loadContent:function(){var a={source:this.id,process:this.id,update:this.id,async:true,ignoreAutoUpdate:true,global:this.cfg.global},b=this;a.onerror=function(e,c,d){b.jq.html("")};a.onsuccess=function(g){var e=$(g.documentElement),f=e.find("update");for(var c=0;c<f.length;c++){var j=f.eq(c),h=j.attr("id"),d=j.get(0).childNodes[0].nodeValue;if(h===b.id){b.jq.html(d)}else{PrimeFaces.ajax.AjaxUtils.updateElement.call(this,h,d)}}PrimeFaces.ajax.AjaxUtils.handleResponse.call(this,e);return true};a.params=[{name:this.id+"_load",value:true}];PrimeFaces.ajax.AjaxRequest(a)},bindScrollMonitor:function(){var b=this,a=$(window);a.off("scroll."+this.id).on("scroll."+this.id,function(){if(b.visible()){b.unbindScrollMonitor();b.loadContent()}})},visible:function(){var e=$(window),d=e.scrollTop(),a=e.height(),c=this.jq.offset().top,b=c+this.jq.innerHeight();if((c>=d&&c<=(d+a))||(b>=d&&b<=(d+a))){return true}},unbindScrollMonitor:function(){$(window).off("scroll."+this.id)}});