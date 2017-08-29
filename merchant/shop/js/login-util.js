var LOGIN = {
	//APPURL:$("#appUrl").val() || window.CURRENT_URL,
	APPURL: window.CURRENT_URL,
	getVerifyCode:function(){
		var _self = this,
			timestamp = Date.parse(new Date());
		var s = _self.APPURL + '/captcha.html' + '?timestamp=' + timestamp;
		return s;
	},
    clearCrossDomainCookie:function(){
        //$.cookie("cdc","",{domain:"dinghuo123.com"});//用于清除cdc，便于在登陆到系统之后，系统判断无这个cookie对请求列表发出跨域名的登录
        $.cookie("cdc",null);//用于清除cdc，便于在登陆到系统之后，系统判断无这个cookie对请求列表发出跨域名的登录
    },
	/**
	*
	*callback.success
	*callback.error
	*/
	auth:function(postData,callback){
		var _self = this;
		postData._csrf = $('#_csrf').val();
		$.ajax({
	        type: "POST",
			url:_self.APPURL+"/signin.html",
	        dataType: "json",
	        data: postData,

			success:function(responseText){
				if(responseText.status == 200){
					//var lt = responseText.split("OK_")[1];
					window.location.href = '/admin/';
					//!!callback.success && callback.success('chengg');
				}else{
					var t = responseText.message;
					!!callback.error && callback.error(responseText,t);
				}
			},
			error:function(){
				var t = '网络异常，请联系管理员';
				!!callback.error && callback.error('error',t);
			}
		});
	},

	sendCode : function(postData,callback){
		var _self = this;
		postData._csrf = $('#_csrf').val();
		$.ajax({
			url:_self.APPURL+'/api-generate-code.html',
             type: 'POST',
             data: postData,
             dataType: 'json',
             success:function(responseText){
             	if(200 === responseText.status){
             		!!callback.success && callback.success(responseText.data);
             	}else{
             		var t = responseText.message;
             		!!callback.error && callback.error(t);
             	}
             },
             error:function(){
             	var t = '网络异常，请联系管理员';
             	!!callback.error && callback.error(t);
             }
         });
	},
	checkActiveCode:function(postData,callback){
		var _self = this;
		postData._csrf = $('#_csrf').val();
		 $.ajax({
	        type: "POST",
	        url: _self.APPURL+"/api-check-code.html",
	        dataType: "json",
	        data: postData,
	        success: function(responseText){
	            if(200 === responseText.status) {// && !responseText.data.error){
             		!!callback.success && callback.success(responseText.data);
             	}else{
             		var t = responseText.message;
             		!!callback.error && callback.error(t);
             	}
	        },
	        error: function(xhr, textStatus, errorThrown){
	            var t = '网络异常，请联系管理员';
             	!!callback.error && callback.error(t);
	        }
	    });
	},
	register:function(postData,callback){
		var _self = this;
		postData._csrf = $('#_csrf').val();
		$.ajax({
	        type: "POST",
	        url: _self.APPURL+"/api-register.html",
	        dataType: "json",
	        data: postData,
	        success: function(responseText){
	            if(200 === responseText.status){
             		!!callback.success && callback.success(responseText);
             	}else{
             		var t = responseText.message;
             		!!callback.error && callback.error(t);
             	}
	        },
	        error: function(xhr, textStatus, errorThrown){
	            var t = '网络异常，请联系管理员';
             	!!callback.error && callback.error(t);
	        }
	    });

	}
}
