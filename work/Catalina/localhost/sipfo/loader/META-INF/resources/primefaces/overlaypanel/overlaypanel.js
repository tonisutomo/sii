PrimeFaces.widget.OverlayPanel=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.content=this.jq.children("div.ui-overlaypanel-content");this.targetId=PrimeFaces.escapeClientId(this.cfg.target);this.target=$(this.targetId);this.cfg.my=this.cfg.my||"left top";this.cfg.at=this.cfg.at||"left bottom";this.cfg.showEvent=this.cfg.showEvent||"click.ui-overlaypanel";this.cfg.hideEvent=this.cfg.hideEvent||"click.ui-overlaypanel";this.cfg.dismissable=(this.cfg.dismissable===false)?false:true;if(this.cfg.showCloseIcon){this.closerIcon=$('<a href="#" class="ui-overlaypanel-close ui-state-default" href="#"><span class="ui-icon ui-icon-closethick"></span></a>').appendTo(this.jq)}this.bindEvents();if(this.cfg.appendToBody){this.jq.appendTo(document.body)}this.setupDialogSupport()},bindEvents:function(){var e=this;this.target.data("primefaces-overlay-target",this.id).find("*").data("primefaces-overlay-target",this.id);if(this.cfg.showEvent===this.cfg.hideEvent){var c=this.cfg.showEvent;$(document).off(c,this.targetId).on(c,this.targetId,this,function(f){f.data.toggle()})}else{var a=this.cfg.showEvent+".ui-overlaypanel",d=this.cfg.hideEvent+".ui-overlaypanel";$(document).off(a+" "+d,this.targetId).on(a,this.targetId,this,function(f){if(!f.data.isVisible()){f.data.show()}}).on(d,this.targetId,this,function(f){if(f.data.isVisible()){f.data.hide()}})}this.bindKeyEvents();if(this.cfg.showCloseIcon){this.closerIcon.on("mouseover.ui-overlaypanel",function(){$(this).addClass("ui-state-hover")}).on("mouseout.ui-overlaypanel",function(){$(this).removeClass("ui-state-hover")}).on("click.ui-overlaypanel",function(f){e.hide();f.preventDefault()})}if(this.cfg.dismissable){$(document.body).bind("mousedown.ui-overlaypanel",function(g){if(e.jq.hasClass("ui-overlay-hidden")){return}var f=$(g.target);if(e.target.is(f)||e.target.has(f).length>0){return}var h=e.jq.offset();if(g.pageX<h.left||g.pageX>h.left+e.jq.outerWidth()||g.pageY<h.top||g.pageY>h.top+e.jq.outerHeight()){e.hide()}})}var b="resize."+this.id;$(window).unbind(b).bind(b,function(){if(e.jq.hasClass("ui-overlay-visible")){e.align()}})},bindKeyEvents:function(){$(document).off("keydown.ui-overlaypanel keyup.ui-overlaypanel",this.targetId).on("keydown.ui-overlaypanel",this.targetId,this,function(c){var b=$.ui.keyCode,a=c.which;if(a===b.ENTER||a===b.NUMPAD_ENTER){c.preventDefault()}}).on("keyup.ui-overlaypanel",this.targetId,this,function(c){var b=$.ui.keyCode,a=c.which;if(a===b.ENTER||a===b.NUMPAD_ENTER){c.data.toggle();c.preventDefault()}})},toggle:function(){if(!this.isVisible()){this.show()}else{this.hide()}},show:function(){if(!this.loaded&&this.cfg.dynamic){this.loadContents()}else{this._show()}},_show:function(){var a=this;this.align();this.jq.removeClass("ui-overlay-hidden").addClass("ui-overlay-visible").css({display:"none",visibility:"visible"});if(this.cfg.showEffect){this.jq.show(this.cfg.showEffect,{},200,function(){a.postShow()})}else{this.jq.show();this.postShow()}},align:function(){var b=this.jq.css("position")=="fixed",c=$(window),a=b?"-"+c.scrollLeft()+" -"+c.scrollTop():null;this.jq.css({left:"",top:"","z-index":++PrimeFaces.zindex}).position({my:this.cfg.my,at:this.cfg.at,of:document.getElementById(this.cfg.target),offset:a})},hide:function(){var a=this;if(this.cfg.hideEffect){this.jq.hide(this.cfg.hideEffect,{},200,function(){a.postHide()})}else{this.jq.hide();this.postHide()}},postShow:function(){if(this.cfg.onShow){this.cfg.onShow.call(this)}this.applyFocus()},postHide:function(){this.jq.removeClass("ui-overlay-visible").addClass("ui-overlay-hidden").css({display:"block",visibility:"hidden"});if(this.cfg.onHide){this.cfg.onHide.call(this)}},setupDialogSupport:function(){var a=this.target.parents(".ui-dialog:first");if(a.length==1){this.jq.css("position","fixed");if(!this.cfg.appendToBody){this.jq.appendTo(document.body)}}},loadContents:function(){var a={source:this.id,process:this.id,update:this.id},b=this;a.onsuccess=function(g){var e=$(g.documentElement),f=e.find("update");for(var c=0;c<f.length;c++){var j=f.eq(c),h=j.attr("id"),d=j.get(0).childNodes[0].nodeValue;if(h==b.id){b.content.html(d);b.loaded=true}else{PrimeFaces.ajax.AjaxUtils.updateElement.call(this,h,d)}}PrimeFaces.ajax.AjaxUtils.handleResponse.call(this,e);return true};a.oncomplete=function(){b._show()};a.params=[{name:this.id+"_contentLoad",value:true}];PrimeFaces.ajax.AjaxRequest(a)},isVisible:function(){return this.jq.hasClass("ui-overlay-visible")},applyFocus:function(){this.jq.find(":not(:submit):not(:button):input:visible:enabled:first").focus()}});