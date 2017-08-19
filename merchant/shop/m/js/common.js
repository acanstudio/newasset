/*
 *公共提示
 *示例：Public.tips({ content:'会话已过期，请重新登录！'});
*/
var Public = {};

	Public.tips = function(options){ return new Public.Tips(options); }
	Public.Tips = function(options){
		var defaults = {
			renderTo: 'body',
			removeOthers : true,
			autoClose: true,
			time : undefined
		}
		this.options = $.extend({},defaults,options);
		this._init();
		
		!Public.Tips._collection ?  Public.Tips._collection = [this] : Public.Tips._collection.push(this);
		
	}
	
	Public.Tips.removeAll = function(){
		try {
			for(var i=Public.Tips._collection.length-1; i>=0; i--){
				Public.Tips._collection[i].remove();
			}
		}catch(e){}
	}
	
	Public.Tips.prototype = {
		_init : function(){
			var self = this,opts = this.options,time;
			if(opts.removeOthers){
				Public.Tips.removeAll();
			}
	
			this._create();
	
			if(opts.autoClose){
				time = opts.time || 2000;
				window.setTimeout(function(){
					self.remove();
				},time);
			}
	
		},
		
		_create : function(){
			var opts = this.options, self = this;
			this.obj = $('<div class="ui-tips"><span></span></div>');
			this.obj.find('span').append(opts.content);
			//$('body').append('<div class="ui-tips"><span>' + opts.content + '</span></div>');		
			this.obj.appendTo('body').show();
		},
	
		remove : function(){
			var opts = this.options;
			this.obj.remove();
		}
	};