PrimeFaces.widget.Terminal=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.promptContainer=this.jq.find("> div:last-child > span.ui-terminal-prompt");this.cfg.prompt=this.promptContainer.text();this.content=this.jq.children(".ui-terminal-content");this.input=this.promptContainer.next("");this.commands=[];this.commandIndex=0;this.bindEvents()},bindEvents:function(){var a=this;this.input.on("keydown.terminal",function(c){var b=$.ui.keyCode;switch(c.which){case b.UP:if(a.commandIndex>0){a.input.val(a.commands[--a.commandIndex])}c.preventDefault();break;case b.DOWN:if(a.commandIndex<(a.commands.length-1)){a.input.val(a.commands[++a.commandIndex])}else{a.commandIndex=a.commands.length;a.input.val("")}c.preventDefault();break;case b.ENTER:case b.NUMPAD_ENTER:a.processCommand();c.preventDefault();break}})},processCommand:function(){this.commands.push(this.input.val());this.commandIndex++;var b=this,a={source:this.id,update:this.id,process:this.id,onsuccess:function(h){var e=$(h.documentElement),g=e.find("update");for(var c=0;c<g.length;c++){var k=g.eq(c),j=k.attr("id"),d=k.get(0).childNodes[0].nodeValue;if(j===b.id){var f=$("<div></div>");f.append("<span>"+b.cfg.prompt+'</span><span class="ui-terminal-command">'+b.input.val()+"</span>").append("<div>"+d+"</div>").appendTo(b.content);b.input.val("")}else{PrimeFaces.ajax.AjaxUtils.updateElement.call(this,j,d)}}PrimeFaces.ajax.AjaxUtils.handleResponse.call(this,e);b.jq.scrollTop(b.content.height());return true}};a.params=[{name:this.id+"_command",value:true}];PrimeFaces.ajax.AjaxRequest(a)},focus:function(){this.input.trigger("focus")},clear:function(){this.content.html("");this.input.val("")}});