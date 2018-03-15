PrimeFaces.widget.Menu=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);if(this.cfg.overlay){this.initOverlay()}this.keyboardTarget=this.jq.children(".ui-helper-hidden-accessible")},initOverlay:function(){var a=this;this.trigger=PrimeFaces.Expressions.resolveComponentsAsSelector(this.cfg.trigger);this.trigger.data("primefaces-overlay-target",true).find("*").data("primefaces-overlay-target",true);if(this.jq.length>1){$(document.body).children(this.jqId).remove();this.jq=$(this.jqId);this.jq.appendTo(document.body)}else{if(this.jq.parent().is(":not(body)")){this.jq.appendTo(document.body)}}this.cfg.pos={my:this.cfg.my,at:this.cfg.at,of:this.trigger};this.trigger.bind(this.cfg.triggerEvent+".ui-menu",function(d){var c=$(this);if(a.jq.is(":visible")){a.hide()}else{a.show();if(c.is(":button")){c.addClass("ui-state-focus")}d.preventDefault()}});$(document.body).bind("click.ui-menu",function(d){if(a.jq.is(":hidden")){return}var c=$(d.target);if(c.is(a.trigger.get(0))||a.trigger.has(c).length>0){return}var f=a.jq.offset();if(d.pageX<f.left||d.pageX>f.left+a.jq.width()||d.pageY<f.top||d.pageY>f.top+a.jq.height()){a.hide(d)}});var b="resize."+this.id;$(window).unbind(b).bind(b,function(){if(a.jq.is(":visible")){a.align()}});this.setupDialogSupport()},setupDialogSupport:function(){var a=this.trigger.parents(".ui-dialog:first");if(a.length==1){this.jq.css("position","fixed")}},show:function(){this.align();this.jq.css("z-index",++PrimeFaces.zindex).show()},hide:function(){this.jq.fadeOut("fast");if(this.trigger&&this.trigger.is(":button")){this.trigger.removeClass("ui-state-focus")}},align:function(){var b=this.jq.css("position")=="fixed",c=$(window),a=b?"-"+c.scrollLeft()+" -"+c.scrollTop():null;this.cfg.pos.offset=a;this.jq.css({left:"",top:""}).position(this.cfg.pos)}});PrimeFaces.widget.TieredMenu=PrimeFaces.widget.Menu.extend({init:function(a){this._super(a);this.links=this.jq.find("a.ui-menuitem-link:not(.ui-state-disabled)");this.bindEvents()},bindEvents:function(){this.bindItemEvents();this.bindKeyEvents();this.bindDocumentHandler()},bindItemEvents:function(){var a=this;this.links.mouseenter(function(){var b=$(this),d=b.parent(),c=a.cfg.autoDisplay;var e=d.siblings(".ui-menuitem-active");if(e.length===1){e.find("li.ui-menuitem-active").each(function(){a.deactivate($(this))});a.deactivate(e)}if(c||a.active){if(d.hasClass("ui-menuitem-active")){a.reactivate(d)}else{a.activate(d)}}else{a.highlight(d)}});if(this.cfg.autoDisplay===false){this.rootLinks=this.jq.find("> ul.ui-menu-list > .ui-menuitem > .ui-menuitem-link");this.rootLinks.data("primefaces-menubar",this.id).find("*").data("primefaces-menubar",this.id);this.rootLinks.click(function(f){var c=$(this),d=c.parent(),b=d.children("ul.ui-menu-child");if(b.length===1){if(b.is(":visible")){a.active=false;a.deactivate(d)}else{a.active=true;a.highlight(d);a.showSubmenu(d,b)}}})}this.jq.find("ul.ui-menu-list").mouseleave(function(b){if(a.activeitem){a.deactivate(a.activeitem)}b.stopPropagation()})},bindKeyEvents:function(){},bindDocumentHandler:function(){var a=this;$(document.body).click(function(c){var b=$(c.target);if(b.data("primefaces-menubar")===a.id){return}a.reset()})},deactivate:function(b,a){this.activeitem=null;b.children("a.ui-menuitem-link").removeClass("ui-state-hover");b.removeClass("ui-menuitem-active");if(a){b.children("ul.ui-menu-child:visible").fadeOut("fast")}else{b.children("ul.ui-menu-child:visible").hide()}},activate:function(b){this.highlight(b);var a=b.children("ul.ui-menu-child");if(a.length==1){this.showSubmenu(b,a)}},reactivate:function(d){this.activeitem=d;var c=d.children("ul.ui-menu-child"),b=c.children("li.ui-menuitem-active:first"),a=this;if(b.length==1){a.deactivate(b)}},highlight:function(a){this.activeitem=a;a.children("a.ui-menuitem-link").addClass("ui-state-hover");a.addClass("ui-menuitem-active")},showSubmenu:function(b,a){a.css({left:b.outerWidth(),top:0,"z-index":++PrimeFaces.zindex});a.show()},reset:function(){var a=this;this.active=false;this.jq.find("li.ui-menuitem-active").each(function(){a.deactivate($(this),true)})}});PrimeFaces.widget.Menubar=PrimeFaces.widget.TieredMenu.extend({showSubmenu:function(e,c){var d=$(window),b=null,a={"z-index":++PrimeFaces.zindex};if(e.parent().hasClass("ui-menu-child")){a.left=e.outerWidth();a.top=0;b=e.offset().top-d.scrollTop()}else{a.left=0;a.top=e.outerHeight();e.offset().top-d.scrollTop();b=e.offset().top+a.top-d.scrollTop()}c.css("height","auto");if((b+c.outerHeight())>d.height()){a.overflow="auto";a.height=d.height()-(b+20)}c.css(a).show()},bindKeyEvents:function(){var a=this;this.keyboardTarget.on("focus.menubar",function(b){a.highlight(a.links.eq(0).parent())}).on("blur.menubar",function(){a.reset()}).on("keydown.menu",function(j){var h=a.activeitem;if(!h){return}var d=!h.closest("ul").hasClass("ui-menu-child"),i=$.ui.keyCode;switch(j.which){case i.LEFT:if(d){var f=h.prevAll(".ui-menuitem:not(.ui-menubar-options):first");if(f.length){a.deactivate(h);a.highlight(f)}j.preventDefault()}else{if(h.hasClass("ui-menu-parent")&&h.children(".ui-menu-child").is(":visible")){a.deactivate(h);a.highlight(h)}else{var c=h.parent().parent();a.deactivate(h);a.deactivate(c);a.highlight(c)}}break;case i.RIGHT:if(d){var b=h.nextAll(".ui-menuitem:not(.ui-menubar-options):first");if(b.length){a.deactivate(h);a.highlight(b)}j.preventDefault()}else{if(h.hasClass("ui-menu-parent")){var g=h.children(".ui-menu-child");if(g.is(":visible")){a.highlight(g.children(".ui-menuitem:first"))}else{a.activate(h)}}}break;case i.UP:if(!d){var f=h.prev(".ui-menuitem");if(f.length){a.deactivate(h);a.highlight(f)}}j.preventDefault();break;case i.DOWN:if(d){var g=h.children("ul.ui-menu-child");if(g.is(":visible")){a.highlight(g.children(".ui-menuitem:first"))}else{a.activate(h)}}else{var b=h.next(".ui-menuitem");if(b.length){a.deactivate(h);a.highlight(b)}}j.preventDefault();break;case i.ENTER:case i.NUMPAD_ENTER:h.children(".ui-menuitem-link").trigger("click");a.jq.blur();j.preventDefault();break}})}});PrimeFaces.widget.SlideMenu=PrimeFaces.widget.Menu.extend({init:function(d){this._super(d);this.submenus=this.jq.find("ul.ui-menu-list");this.wrapper=this.jq.children("div.ui-slidemenu-wrapper");this.content=this.wrapper.children("div.ui-slidemenu-content");this.rootList=this.content.children("ul.ui-menu-list");this.links=this.jq.find("a.ui-menuitem-link:not(.ui-state-disabled)");this.backward=this.wrapper.children("div.ui-slidemenu-backward");this.stack=[];this.jqWidth=this.jq.width();var b=this;if(!this.jq.hasClass("ui-menu-dynamic")){if(this.jq.is(":not(:visible)")){var a=this.jq.closest(".ui-hidden-container"),c=a.data("widget"),f=this;if(c){var e=PF(c);if(e){e.addOnshowHandler(function(){return f.render()})}}}else{this.render()}}this.bindEvents()},bindEvents:function(){var a=this;this.links.mouseenter(function(){$(this).addClass("ui-state-hover")}).mouseleave(function(){$(this).removeClass("ui-state-hover")}).click(function(){var c=$(this),b=c.next();if(b.length==1){a.forward(b)}});this.backward.click(function(){a.back()})},forward:function(c){var a=this;this.push(c);var b=-1*(this.depth()*this.jqWidth);c.show().css({left:this.jqWidth});this.rootList.animate({left:b},500,"easeInOutCirc",function(){if(a.backward.is(":hidden")){a.backward.fadeIn("fast")}})},back:function(){var a=this,c=this.pop(),d=this.depth();var b=-1*(d*this.jqWidth);this.rootList.animate({left:b},500,"easeInOutCirc",function(){c.hide();if(d==0){a.backward.fadeOut("fast")}})},push:function(a){this.stack.push(a)},pop:function(){return this.stack.pop()},last:function(){return this.stack[this.stack.length-1]},depth:function(){return this.stack.length},render:function(){this.submenus.width(this.jq.width());this.wrapper.height(this.rootList.outerHeight(true)+this.backward.outerHeight(true));this.content.height(this.rootList.outerHeight(true));this.rendered=true},show:function(){this.align();this.jq.css("z-index",++PrimeFaces.zindex).show();if(!this.rendered){this.render()}}});PrimeFaces.widget.PlainMenu=PrimeFaces.widget.Menu.extend({init:function(a){this._super(a);this.menuitemLinks=this.jq.find(".ui-menuitem-link:not(.ui-state-disabled)");this.bindEvents()},bindEvents:function(){var a=this;a.menuitemLinks.mouseenter(function(b){if(a.jq.is(":focus")){a.jq.blur()}$(this).addClass("ui-state-hover")}).mouseleave(function(b){$(this).removeClass("ui-state-hover")});if(this.cfg.overlay){this.menuitemLinks.click(function(){a.hide()})}this.keyboardTarget.on("focus.menu",function(){a.menuitemLinks.eq(0).addClass("ui-state-hover")}).on("blur.menu",function(){a.menuitemLinks.filter(".ui-state-hover").removeClass("ui-state-hover")}).on("keydown.menu",function(g){var d=a.menuitemLinks.filter(".ui-state-hover"),f=$.ui.keyCode;switch(g.which){case f.UP:var c=d.parent().prevAll(".ui-menuitem:first");if(c.length){d.removeClass("ui-state-hover");c.children(".ui-menuitem-link").addClass("ui-state-hover")}g.preventDefault();break;case f.DOWN:var b=d.parent().nextAll(".ui-menuitem:first");if(b.length){d.removeClass("ui-state-hover");b.children(".ui-menuitem-link").addClass("ui-state-hover")}g.preventDefault();break;case f.ENTER:case f.NUMPAD_ENTER:d.trigger("click");a.jq.blur();g.preventDefault();break}})}});PrimeFaces.widget.MenuButton=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.menuId=this.jqId+"_menu";this.button=this.jq.children("button");this.menu=this.jq.children(".ui-menu");this.menuitems=this.jq.find(".ui-menuitem");this.cfg.disabled=this.button.is(":disabled");if(!this.cfg.disabled){this.bindEvents();$(document.body).children(this.menuId).remove();this.menu.appendTo(document.body);this.setupDialogSupport()}},bindEvents:function(){var a=this;this.button.mouseover(function(){if(!a.button.hasClass("ui-state-focus")){a.button.addClass("ui-state-hover")}}).mouseout(function(){if(!a.button.hasClass("ui-state-focus")){a.button.removeClass("ui-state-hover ui-state-active")}}).mousedown(function(){$(this).removeClass("ui-state-focus ui-state-hover").addClass("ui-state-active")}).mouseup(function(){var c=$(this);c.removeClass("ui-state-active");if(a.menu.is(":visible")){c.addClass("ui-state-hover");a.hide()}else{c.addClass("ui-state-focus");a.show()}}).focus(function(){$(this).addClass("ui-state-focus")}).blur(function(){$(this).removeClass("ui-state-focus")});this.button.data("primefaces-overlay-target",true).find("*").data("primefaces-overlay-target",true);this.menuitems.mouseover(function(d){var c=$(this);if(!c.hasClass("ui-state-disabled")){c.addClass("ui-state-hover")}}).mouseout(function(c){$(this).removeClass("ui-state-hover")}).click(function(){a.button.removeClass("ui-state-focus");a.hide()});this.cfg.position={my:"left top",at:"left bottom",of:this.button};$(document.body).bind("mousedown.ui-menubutton",function(d){if(a.menu.is(":hidden")){return}var c=$(d.target);if(c.is(a.button)||a.button.has(c).length>0){return}var f=a.menu.offset();if(d.pageX<f.left||d.pageX>f.left+a.menu.width()||d.pageY<f.top||d.pageY>f.top+a.menu.height()){a.button.removeClass("ui-state-focus ui-state-hover");a.hide()}});var b="resize."+this.id;$(window).unbind(b).bind(b,function(){if(a.menu.is(":visible")){a.alignPanel()}});this.button.attr("role","button").attr("aria-disabled",this.button.is(":disabled"))},setupDialogSupport:function(){var a=this.button.parents(".ui-dialog:first");if(a.length==1){this.menu.css("position","fixed")}},show:function(){this.alignPanel();this.menu.show()},hide:function(){this.menu.fadeOut("fast")},alignPanel:function(){var b=this.menu.css("position")=="fixed",c=$(window),a=b?"-"+c.scrollLeft()+" -"+c.scrollTop():null;this.cfg.position.offset=a;this.menu.css({left:"",top:"","z-index":++PrimeFaces.zindex}).position(this.cfg.position)}});PrimeFaces.widget.ContextMenu=PrimeFaces.widget.TieredMenu.extend({init:function(b){b.autoDisplay=true;this._super(b);var a=this,c=(this.cfg.target===undefined);this.cfg.event=this.cfg.event||"contextmenu";this.jqTargetId=c?document:PrimeFaces.escapeClientId(this.cfg.target);this.jqTarget=$(this.jqTargetId);if(!this.jq.parent().is(document.body)){this.jq.appendTo("body")}if(c){$(document).off("contextmenu.ui-contextmenu").on("contextmenu.ui-contextmenu",function(f){a.show(f)})}else{if(this.cfg.type==="DataTable"){this.bindDataTable()}else{if(this.cfg.type==="TreeTable"){this.bindTreeTable()}else{if(this.cfg.type==="Tree"){this.bindTree()}else{var d=this.cfg.event+".ui-contextmenu";$(document).off(d,this.jqTargetId).on(d,this.jqTargetId,null,function(f){a.show(f)})}}}}},bindDataTable:function(){var b=this.jqTargetId+" tbody.ui-datatable-data > tr.ui-widget-content:not(.ui-datatable-empty-message)",c=this.cfg.event+".datatable",a=this;$(document).off(c,b).on(c,b,null,function(i){var f=PrimeFaces.widgets[a.cfg.targetWidgetVar];if(f.cfg.selectionMode){f.onRowClick(i,this,true);if(f.hasBehavior("contextMenu")){var h=f.getRowMeta($(this));f.fireRowSelectEvent(h.key,"contextMenu")}a.show(i);i.preventDefault()}else{if(f.cfg.editMode==="cell"){var g=$(i.target),d=g.is("td.ui-editable-column")?g:g.parents("td.ui-editable-column:first");if(f.contextMenuCell){f.contextMenuCell.removeClass("ui-state-highlight")}f.contextMenuClick=true;f.contextMenuCell=d;f.contextMenuCell.addClass("ui-state-highlight");a.show(i)}}})},bindTreeTable:function(){var b=this.jqTargetId+" .ui-treetable-data > "+(this.cfg.nodeType?"tr.ui-treetable-selectable-node."+this.cfg.nodeType:"tr.ui-treetable-selectable-node"),c=this.cfg.event+".treetable",a=this;$(document).off(c,b).on(c,b,null,function(d){PrimeFaces.widgets[a.cfg.targetWidgetVar].onRowClick(d,$(this));a.show(d);d.preventDefault()})},bindTree:function(){var b=this.jqTargetId+" .ui-tree-selectable",c=this.cfg.nodeType?this.cfg.event+".tree."+this.cfg.nodeType:this.cfg.event+".tree",a=this;$(document).off(c,b).on(c,b,null,function(f){var d=$(this);if(a.cfg.nodeType===undefined||d.parent().data("nodetype")===a.cfg.nodeType){PrimeFaces.widgets[a.cfg.targetWidgetVar].nodeClick(f,d);a.show(f);f.preventDefault()}})},refresh:function(b){var a=PrimeFaces.escapeClientId(b.id),c=$(a);if(c.length>1){$(document.body).children(a).remove()}this.init(b)},bindItemEvents:function(){this._super();var a=this;this.links.bind("click",function(){a.hide()})},bindDocumentHandler:function(){var a=this;$(document.body).bind("click.ui-contextmenu",function(b){if(a.jq.is(":hidden")){return}a.hide()})},show:function(g){$(document.body).children(".ui-contextmenu:visible").hide();var f=$(window),d=g.pageX,c=g.pageY,b=this.jq.outerWidth(),a=this.jq.outerHeight();if((d+b)>(f.width())+f.scrollLeft()){d=d-b}if((c+a)>(f.height()+f.scrollTop())){c=c-a}if(this.cfg.beforeShow){this.cfg.beforeShow.call(this)}this.jq.css({left:d,top:c,"z-index":++PrimeFaces.zindex}).show();g.preventDefault()},hide:function(){var a=this;this.jq.find("li.ui-menuitem-active").each(function(){a.deactivate($(this),true)});this.jq.fadeOut("fast")},isVisible:function(){return this.jq.is(":visible")},getTarget:function(){return this.jqTarget}});PrimeFaces.widget.MegaMenu=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.rootList=this.jq.children("ul.ui-menu-list");this.rootLinks=this.rootList.find("> li.ui-menuitem > a.ui-menuitem-link:not(.ui-state-disabled)");this.subLinks=this.jq.find(".ui-menu-child a.ui-menuitem-link:not(.ui-state-disabled)");this.bindEvents()},bindEvents:function(){var a=this;this.rootLinks.mouseenter(function(f){var b=$(this),d=b.parent();var c=d.siblings(".ui-menuitem-active");if(c.length>0){a.deactivate(c,false)}if(a.cfg.autoDisplay||a.active){a.activate(d)}else{a.highlight(d)}});if(this.cfg.autoDisplay==false){this.rootLinks.data("primefaces-megamenu",this.id).find("*").data("primefaces-megamenu",this.id);this.rootLinks.click(function(f){var c=$(this),d=c.parent(),b=c.next();if(b.length==1){if(b.is(":visible")){a.active=false;a.deactivate(d,true)}else{a.active=true;a.activate(d)}}})}this.subLinks.mouseenter(function(){$(this).addClass("ui-state-hover")}).mouseleave(function(){$(this).removeClass("ui-state-hover")});this.rootList.mouseleave(function(c){var b=a.rootList.children(".ui-menuitem-active");if(b.length==1){a.deactivate(b,false)}});this.rootList.find("> li.ui-menuitem > ul.ui-menu-child").mouseleave(function(b){b.stopPropagation()});$(document.body).click(function(c){var b=$(c.target);if(b.data("primefaces-megamenu")==a.id){return}a.active=false;a.deactivate(a.rootList.children("li.ui-menuitem-active"),true)})},deactivate:function(d,a){var c=d.children("a.ui-menuitem-link"),b=c.next();d.removeClass("ui-menuitem-active");c.removeClass("ui-state-hover");if(b.length>0){if(a){b.fadeOut("fast")}else{b.hide()}}},highlight:function(b){var a=b.children("a.ui-menuitem-link");b.addClass("ui-menuitem-active");a.addClass("ui-state-hover")},activate:function(c){var b=c.children(".ui-menu-child"),a=this;a.highlight(c);if(b.length>0){a.showSubmenu(c,b)}},showSubmenu:function(b,a){a.css("z-index",++PrimeFaces.zindex);a.css({left:0,top:b.outerHeight()});a.show()}});PrimeFaces.widget.PanelMenu=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.headers=this.jq.find("> .ui-panelmenu-panel > h3.ui-panelmenu-header:not(.ui-state-disabled)");this.menuitemLinks=this.jq.find(".ui-menuitem-link:not(.ui-state-disabled)");this.treeLinks=this.jq.find(".ui-menu-parent > .ui-menuitem-link:not(.ui-state-disabled)");this.bindEvents();this.stateKey="panelMenu-"+this.id;this.restoreState()},bindEvents:function(){var a=this;this.headers.mouseover(function(){var b=$(this);if(!b.hasClass("ui-state-active")){b.addClass("ui-state-hover")}}).mouseout(function(){var b=$(this);if(!b.hasClass("ui-state-active")){b.removeClass("ui-state-hover")}}).click(function(b){var c=$(this);if(c.hasClass("ui-state-active")){a.collapseRootSubmenu($(this))}else{a.expandRootSubmenu($(this),false)}b.preventDefault()});this.menuitemLinks.mouseover(function(){$(this).addClass("ui-state-hover")}).mouseout(function(){$(this).removeClass("ui-state-hover")});this.treeLinks.click(function(d){var c=$(this),b=c.next();if(b.is(":visible")){a.collapseTreeItem(c,b)}else{a.expandTreeItem(c,b,false)}d.preventDefault()})},collapseRootSubmenu:function(b){var a=b.next();b.attr("aria-expanded",false).removeClass("ui-state-active ui-corner-top").addClass("ui-state-hover ui-corner-all").children(".ui-icon").removeClass("ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-e");a.attr("aria-hidden",true).slideUp("normal","easeInOutCirc");this.removeAsExpanded(a)},expandRootSubmenu:function(c,b){var a=c.next();c.attr("aria-expanded",false).addClass("ui-state-active ui-corner-top").removeClass("ui-state-hover ui-corner-all").children(".ui-icon").removeClass("ui-icon-triangle-1-e").addClass("ui-icon-triangle-1-s");if(b){a.attr("aria-hidden",false).show()}else{a.attr("aria-hidden",false).slideDown("normal","easeInOutCirc");this.addAsExpanded(a)}},expandTreeItem:function(c,a,b){c.children(".ui-panelmenu-icon").addClass("ui-icon-triangle-1-s");a.show();if(!b){this.addAsExpanded(c)}},collapseTreeItem:function(b,a){b.children(".ui-panelmenu-icon").removeClass("ui-icon-triangle-1-s");a.hide();this.removeAsExpanded(b)},saveState:function(){var a=this.expandedNodes.join(",");PrimeFaces.setCookie(this.stateKey,a)},restoreState:function(){var c=PrimeFaces.getCookie(this.stateKey);if(c){this.expandedNodes=c.split(",");for(var b=0;b<this.expandedNodes.length;b++){var a=$(PrimeFaces.escapeClientId(this.expandedNodes[b]));if(a.is("div.ui-panelmenu-content")){this.expandRootSubmenu(a.prev(),true)}else{if(a.is("a.ui-menuitem-link")){this.expandTreeItem(a,a.next(),true)}}}}else{this.expandedNodes=[]}},removeAsExpanded:function(a){var b=a.attr("id");this.expandedNodes=$.grep(this.expandedNodes,function(c){return c!=b});this.saveState()},addAsExpanded:function(a){this.expandedNodes.push(a.attr("id"));this.saveState()},clearState:function(){PrimeFaces.setCookie(this.stateKey,null)}});PrimeFaces.widget.TabMenu=PrimeFaces.widget.Menu.extend({init:function(a){this._super(a);this.items=this.jq.find("> .ui-tabmenu-nav > li:not(.ui-state-disabled)");this.bindEvents()},bindEvents:function(){this.items.on("mouseover.tabmenu",function(b){var a=$(this);if(!a.hasClass("ui-state-active")){a.addClass("ui-state-hover")}}).on("mouseout.tabmenu",function(a){$(this).removeClass("ui-state-hover")})}});