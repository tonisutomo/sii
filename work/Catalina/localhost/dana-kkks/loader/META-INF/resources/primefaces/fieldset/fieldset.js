PrimeFaces.widget.Fieldset=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.legend=this.jq.children(".ui-fieldset-legend");var b=this;if(this.cfg.toggleable){this.content=this.jq.children(".ui-fieldset-content");this.toggler=this.legend.children(".ui-fieldset-toggler");this.stateHolder=$(this.jqId+"_collapsed");this.legend.click(function(c){b.toggle(c)}).mouseover(function(){b.legend.toggleClass("ui-state-hover")}).mouseout(function(){b.legend.toggleClass("ui-state-hover")}).mousedown(function(){b.legend.toggleClass("ui-state-active")}).mouseup(function(){b.legend.toggleClass("ui-state-active")})}},toggle:function(b){this.updateToggleState(this.cfg.collapsed);var a=this;this.content.slideToggle(this.cfg.toggleSpeed,"easeInOutCirc",function(){if(a.cfg.behaviors){var c=a.cfg.behaviors.toggle;if(c){c.call(a)}}});PrimeFaces.invokeDeferredRenders(this.id)},updateToggleState:function(a){if(a){this.toggler.removeClass("ui-icon-plusthick").addClass("ui-icon-minusthick")}else{this.toggler.removeClass("ui-icon-minusthick").addClass("ui-icon-plusthick")}this.cfg.collapsed=!a;this.stateHolder.val(!a)}});