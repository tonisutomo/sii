PrimeFaces.widget.InputText=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.input=this.jq.children("input");this.cfg.enhanced=true;this.cfg.clearBtn=true;this.input.textinput(this.cfg)}});PrimeFaces.widget.InputTextarea=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.cfg.enhanced=true;this.cfg.autogrow=false;this.jq.textinput(this.cfg)}});PrimeFaces.widget.Password=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.input=this.jq.children("input");this.cfg.enhanced=true;this.cfg.clearBtn=true;this.input.textinput(this.cfg)}});PrimeFaces.widget.SelectOneButton=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.controlGroup=this.jq.children(".ui-controlgroup-controls");this.buttons=this.controlGroup.find("> .ui-radio > label.ui-btn");this.bindEvents()},bindEvents:function(){var a=this;this.buttons.on("click.selectOneButton",function(c){var b=$(this);if(!b.hasClass("ui-btn-active")){a.select(b)}})},select:function(a){this.buttons.filter(".ui-btn-active").removeClass("ui-btn-active").next().prop("checked",false);a.addClass("ui-btn-active").next().prop("checked",true).change()}});PrimeFaces.widget.SelectManyButton=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.controlGroup=this.jq.children(".ui-controlgroup-controls ");this.buttons=this.controlGroup.find("> .ui-checkbox > label.ui-btn");this.bindEvents()},bindEvents:function(){var a=this;this.buttons.on("click.selectManyButton",function(){var b=$(this);if(b.hasClass("ui-btn-active")){a.unselect(b)}else{a.select(b)}})},select:function(a){a.addClass("ui-btn-active").next().prop("checked",true).change()},unselect:function(a){a.removeClass("ui-btn-active").next().prop("checked",false).change()}});PrimeFaces.widget.InputSlider=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.jq.slider()}});PrimeFaces.widget.RangeSlider=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.jq.attr("data-role","rangeslider");this.jq.rangeslider()}});PrimeFaces.widget.UISwitch=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.input=this.jq.children("input");this.cfg.enhanced=true;this.input.flipswitch(this.cfg)}});PrimeFaces.widget.InputSwitch=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.input=this.jq.children("input");this.cfg.enhanced=true;this.input.flipswitch(this.cfg)}});PrimeFaces.widget.SelectOneMenu=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.jq.selectmenu(this.cfg).removeAttr("id");this.jq.closest(".ui-select").attr("id",this.id)}});PrimeFaces.widget.SelectOneRadio=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.jq.controlgroup()}});PrimeFaces.widget.SelectManyCheckbox=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.jq.controlgroup()}});PrimeFaces.widget.SelectBooleanCheckbox=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.label=this.jq.children("label");this.input=this.jq.children(":checkbox");this.bindEvents()},bindEvents:function(){var a=this;this.label.on("click.selectBooleanCheckbox",function(){a.toggle()})},toggle:function(){if(this.input.prop("checked")){this.uncheck()}else{this.check()}this.input.trigger("change")},check:function(){this.label.removeClass("ui-checkbox-off").addClass("ui-checkbox-on")},uncheck:function(){this.label.removeClass("ui-checkbox-on").addClass("ui-checkbox-off")}});PrimeFaces.widget.SelectCheckboxMenu=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.cfg.nativeMenu=false;this.jq.selectmenu(this.cfg).removeAttr("id");this.jq.closest(".ui-select").attr("id",this.id)}});