var THISPAGE = {};
$(function(){
	THISPAGE = {
	    AI:"",//android or  iphone
		appUrl:window.CURRENT_URL,//$("#appUrl").val(),
		remainTime:60,//获取验证码倒计时
		getCode:false,//是否已经获取了验证码
		step1Checked:true, //第一步检查是否都填写了信息从而控制“注册”按钮背景颜色的显示
		step2Checked:true, //第二步检查是否都填写了信息从而控制“下一步”按钮背景颜色的显示
		countMark:true, //控制百度统计只执行一次
		formData:{
			mobile:"",
			verfCode:"",
			activeCode:"",
			userName:"",
			password:"",
			sc:"",
			industry:"" //新增行业检查
		},
	    init:function(){
	    	this.trafficWebCount();//针对web的流量统计
	    	this.firstStepCheck();//开始第一步检测
			this.addEvent();//绑定事件
		},
		setAI:function(AI){//提供给手机端设置区分iphone 还是android
			var _self = this;
			THISPAGE.AI = AI;
			if(THISPAGE.AI === "iphone"){
				// alert("执行了");
				$("#iphoneHead").show();
				$("#step1").css("top","1.73333rem");
				$("#step2").css("top","1.73333rem");
			}
			if (THISPAGE.countMark) {
				_self.trafficAppCount(AI);
			}
		},
		getQueStr: function(ref){
			var reg=new RegExp("(^|&)"+ref+"=([^&]*)(&|$)");var r=window.location.search.substr(1).match(reg);if(r!=null)return unescape(r[2]);return null;
		},
		/**
		 * author: thy
		 * date: 2016.7.7
		 * description: 第一步检查3个是否都已经有值，没有的话“下一步”按钮是不会有颜色的
		 */
		firstStepCheck: function(){
			console.log("第一个检测开始");
			var _self = this;
			setTimeout(function(){
				var mobile=$.trim($("#mobile").val());	//手机号码
				var verifyCode=$.trim($("#verifyCode").val());	//识别码
				var mobileVerfyCode=$.trim($("#smsCode").val());	//短信验证
				var step1Mark=_self.step1Checked;
				if(mobile&&verifyCode&&mobileVerfyCode){
					$("#nextStep").addClass("bg-blue");
				} else {
					$("#nextStep").removeClass("bg-blue");
				}
				if(!step1Mark){console.log("第一个检测这个就要结束了");return false;}
				setTimeout(arguments.callee,1000);
			},1000);
		},
		/**
		 * author: thy
		 * date: 2016.7.7
		 * description: 第二步检查4个是否都已经有值，如果没有值，“注册”按钮是不会有颜色的
		 */
		secStepCheck: function(){
			console.log("第二个检测开始");
			var _self = this;
			setTimeout(function(){
				var companyName=$.trim($("#companyName").val());	//公司名称
				var linkName=$.trim($("#linkMan").val());	//姓名
				var password=$.trim($("#password").val());	//密码
				var industry=$.trim($("#businessType").attr("title"));	//行业
				var step2Mark=_self.step2Checked;
				//if(companyName&&linkName&&password&&industry){
				if(companyName&&linkName&&password){
					$("#signup").addClass("bg-blue");
				} else {
					$("#signup").removeClass("bg-blue");
				}
				if(!step2Mark){console.log("第二个检测这个就要结束了");return false;}
				setTimeout(arguments.callee,1000);
			},1000);
		},

	    addEvent: function(){
			var _self = this;

			$.fn.cookie('s',_self.getQueStr('s'));//将s写入cookies --wmao

			/**
			 * author: thy
			 * date: 2016.7.7
			 * description: 返回按钮,data-step有几种状态
			 * 				1	表示刚进入时的状态，点击就会退出这个页面
			 *        		2	表示在完善信息这一步，点击就会退出这个页面
			 *     			21	表示点击了选择行业，点击就会隐藏行业选择
			 */
			$("#navBack").click(function(){
				var dataStep=$(this).attr("data-step");
				switch(dataStep){
					case "2":
						// if(!_self.AI){
							window.location.href = document.referrer;
						// }
						break;
					case "21":
						$("#step21").removeClass("leftIn");
						setTimeout(function(){
							$("#step21").hide();
							$(this).attr({"data-step":"2","href":"#backToApp"});
						},500);
						break;
					default:
						// if(!_self.AI){
							window.location.href = document.referrer;
						// }
				}
			});

			/**
			 * author: thy
			 * date: 2016.7.7
			 * description: 第一步 点击“下一步”按钮进行验证 通过就进入注册页面
			 */
			$("#nextStep").click(function(e){
				e.preventDefault();
				var mobileReg = /^0?1[0|1|2|3|4|5|6|7|8|9]\d{9}$/;
				var numReg = /^-?\d+$/;

				_self.formData.mobile = $.trim($("#mobile").val());
				_self.formData.verfCode = $.trim($("#verifyCode").val());
				_self.formData.activeCode = $.trim($("#smsCode").val());

				if (!_self.formData.mobile) {
					Public.tips({content:"手机号码不能为空"});
					return false;
				} else if (!mobileReg.test(_self.formData.mobile)) {
					Public.tips({content:"手机号码不正确"});
					return false;
				} else if (!_self.formData.verfCode) {
					Public.tips({content:"识别码不能为空"});
					return false;
				} else if (_self.formData.verfCode.length != 4) {
					Public.tips({ content:'识别码不正确！'});
					return false;
				} else if (!_self.formData.activeCode) {
					Public.tips({ content:'短信验证码不能为空！'});
					return false;
				} else if (!_self.getCode) {
					Public.tips({content:"请先获取短信"});
					return false;
				} else if ((!numReg.test(_self.formData.activeCode)) || (_self.formData.activeCode.length != 6)) {
					Public.tips({content:"短信验证码为6位纯数字"});
				} else {
					if (_self.formData.verfCode && _self.getCode) {
						_self.checkSMSCode();
					}
				}
			});

			/**
			 * 看不清 点击验刷图片新证码
			 */
			$("#codeChange").click(function(){
				var timestamp = Date.parse(new Date());
				$("#imgCode").attr("src",_self.appUrl + "/captcha.html"+"?timestamp="+timestamp);
			});

			/**
			 *
			 * description: 点击获取验短信证码，这里会先触发检测用户是否已经存在，再触发送短信验证码
			 *
			 */
			$("#getCode").click(function(e){
				e.preventDefault();
				_self.verifyStep();
			});

			/**
			 * 是否显示密码
			 */
			$("#isShowPassword").click(function(){
				if(!$(this).hasClass("show")){
					$("#password").attr("type","text");
					$(this).addClass("show");
				}else{
					$("#password").attr("type","password");
					$(this).removeClass("show");
				}
			});

			/**
			 * author: thy
			 * date: 2016.7.7
			 * description: 选择行业
			 */
			$("#choseIndustry").click(function(){
				$("#navBack").attr({"data-step":"21","href":"#"});
				$("#step21").show();
				setTimeout(function(){
					$("#step21").addClass("leftIn");
				},300);
			});
			$("#industryList li").click(function(){
				$("#navBack").attr({"data-step":"2","href":"#backToApp"});
				$("#choseIndustry").addClass("show");
				var industryName=$(this).text();
				$("#businessType").attr("title","yes");
				$("#businessType").text(industryName).addClass("chose");
				$("#step21").removeClass("leftIn");
				setTimeout(function(){
					$("#step21").hide();
				},300);
				_self.formData.industry=$(this).attr("data-value");
			});

			/**
			 * description: 第二步点击注册，进入到注册成功
			 */
			$("#signup").click(function(e){
				e.preventDefault();
				var passwordReg = /^[a-zA-Z0-9]{6,20}$/;
				_self.formData.password = $.trim($("#password").val());
				_self.formData.linkman = $.trim($("#linkMan").val());
				_self.formData.companyName = $.trim($("#companyName").val());
				if($("#wid").val()){
					_self.formData.wid = $("#wid").val();
				}
				
				var industry = $.trim($("#businessType").attr("title"));

				if (!_self.formData.companyName) {
					Public.tips({content:"公司名称不能为空"});
					return false;
				} else if (_self.formData.companyName.length > 30) {
					Public.tips({content:"公司名称不能超过30个字"});
					return false;
				} else if (!_self.formData.linkman) {
					Public.tips({content:"姓名不能为空"});
					return false;
				} else if (_self.formData.linkman.length > 10) {
					Public.tips({content:"姓名不能超过10个字"});
					return false;
				} else if (!_self.formData.password) {
					Public.tips({content:"登录密码不能为空"});
					return false;
				} else if (!passwordReg.test(_self.formData.password)) {
					Public.tips({content:"登录密码为6-20位英文或数字"});
					return false;
				/*} else if (!industry) {
					Public.tips({content:"请选择行业"});
					return false;*/
				} else {
					_self.completeRegister();
				}
			});

		},
		/**
		 * 点击“获取验证码”后对发送数据的的一些检验
		 */
		verifyStep:function(){
			var _self = this;
			var _this = $("#getCode");
			// var flag = "no";
			_self.formData.mobile = $.trim($("#mobile").val());
			_self.formData.verfCode = $.trim($("#verifyCode").val());
			var reg = /^0?1[0|1|2|3|4|5|6|7|8|9]\d{9}$/;

			if (!_self.formData.mobile) {
				//如果手机号码为空
				Public.tips({ content:'手机号码不能为空！'});
				return false;
			} else if (!reg.test(_self.formData.mobile)) {
				//如果手机号码不符合规则
				Public.tips({ content:'手机号码不正确！'});
				return false;
			} else if (!_self.formData.verfCode) {
				Public.tips({ content:'识别码不能为空！'});
				return false;
			} else if (_self.formData.verfCode.length != 4) {
				Public.tips({ content:'识别码不正确！'});
				return false;
			} else {
				_this.attr("disabled",true); //避免反复触发检查是否已存在改用户
				
                var data = {
                    'type': 'signup',
                    'field': 'mobile',
                    'value': _self.formData.mobile,
                    '_csrf': $("#_csrf").val(),
                };
                $.ajax({
                    type: "POST",
                    url: "/api-validation.html",
                    dataType: "json",
                    data: data,
                    async: false,
					success:function(dataResponse){
						//var dataResponse = $.parseJSON(responseText);
						if (dataResponse.status == 200) {
							//if (dataResponse.data.ok) {
								console.log("若用户名可用：OK");
								_self.sendMobileCode();
							/*} else {
								console.log("若用户名重复："+dataResponse.data.error);
								Public.tips({ content:dataResponse.data.error});
								_this.attr("disabled",null);
							}*/
						} else if (dataResponse.code == 500) {
							Public.tips({ content:dataResponse.message});
							_this.attr("disabled",null);
						} else {
							Public.tips({ content:dataResponse.message});
							_this.attr("disabled",null);
						}
					},
					error:function(){
						Public.tips({ content:'系统繁忙，请稍后再试！'});
						_this.attr("disabled",null);
					}
				});
			}
		},
		/**
		 * date: 2015.7.15
		 *
		 * 新增说明
		 * author: thy
		 * date: 2016.7.7
		 * description: 经过verifyStep() 检测相关信息后，把识别码和手机号码传给后台，判断识别码是否正确和让用户获得短信验证码
		 */
		sendMobileCode : function(){
			var _self = this;
			var _this = $("#getCode");
			var postData = {
				mobile:_self.formData.mobile,
                type: 'signup',
				captcha:_self.formData.verfCode,
		        _csrf: $('#_csrf').val()
			};
			_this.attr("disabled",true).text('发送中..');

    		$.ajax({
			     url:_self.appUrl+'/api-generate-code.html',
                 type: 'POST',
                 data: postData,
                 dataType: 'json',

				success:function(dataResponse){
					//var dataResponse = $.parseJSON(responseText);
					if(dataResponse.status == 200){
						_self.getCode = true;
						_this.hide();
						$("#timeCount").show();
						_self.mobileVerifyInterval = window.setInterval(_self.setMobileVerifyInterval,1000);
						$("#smsCode").focus();
						$("#step1Tip").text("验证短信已发送至"+_self.formData.mobile);
					}else if(dataResponse.code == 500){
						Public.tips({ content:dataResponse.message});
						_this.attr("disabled",null).text('获取验证码');
					}else{
						Public.tips({ content:dataResponse.message});
						_this.attr("disabled",true).text('获取验证码');
					}
				},
				error:function(){
					Public.tips({ content:'系统繁忙，请稍后再试！'});
					_this.attr("disabled",null).text('获取验证码');
				}
			});
		},
		/**
		 * author: thy
		 * date: 2016.7.8
		 * description: 点击“下一步"需要检测收到的短信验证码
		 */
		checkSMSCode:function(){
			var _self = this;
			var _this = $("#nextStep");
			var postData = {
				mobile:_self.formData.mobile,
				code: _self.formData.activeCode,
                type: 'signup',
		        _csrf: $('#_csrf').val()
			};

    		$.ajax({
	             url: _self.appUrl+"/api-check-code.html",
                 type: 'POST',
                 data: postData,
                 dataType: 'json',
				beforeSend:function(){
					_this.attr("disabled",true).text("提交中");
				},
				success:function(dataResponse){
					//var dataResponse = $.parseJSON(responseText);
					if(dataResponse.status == "200"){
						/*if (dataResponse.data.error) {
							Public.tips({ content:dataResponse.data.error});
							_this.attr("disabled",null).text("下一步");
						} else {*/
							_this.attr("disabled",true).text("提交成功");
							_self.step1Checked=false;
							_self.secStepCheck();
							//解决安卓上百度浏览器左右滑动出现不该出现的展示页面
							$("#step2").show();
							setTimeout(function(){
								$("#step2").addClass("leftIn");
								$("#navBack").attr({"data-step":"2"});
								$("#navTitle").text("完善公司信息");
							},300);
						//}
					}else{
						Public.tips({ content:dataResponse.message});
						_this.attr("disabled",null).text('重新提交');
					}
				},
				error:function(){
					Public.tips({ content:'系统繁忙，请稍后再试！'});
					_this.attr("disabled",null).text("下一步");
				}
			});
		},
		/**
		 * 设置获取验证码倒计时
		 */
		setMobileVerifyInterval:function(){
			if (THISPAGE.remainTime > 0) {
				$("#second").text(THISPAGE.remainTime);
				THISPAGE.remainTime--;
			} else {
				window.clearInterval(THISPAGE.mobileVerifyInterval);
				$("#codeChange").trigger("click");
				$("#getCode").show();
				$("#timeCount").hide();
				$("#second").text("60");
				$("#getCode").attr("disabled",null).text("重新获取");
				THISPAGE.remainTime = 60;
			}
		},

		//成功跳转，添加来源监测
		setBaiduConversion: function(data){
			var _self = this;
			var login_url = _self.appUrl,
				_url = login_url+'/app/suc1',
				apply1 = window.location.pathname.indexOf('apply1'),
				apply2 = window.location.pathname.indexOf('apply2'),
				rc = window.location.search.indexOf('rc');
			if(THISPAGE.AI){
				_url = login_url+'/app/suc3';
			}else{
				if(rc >= 0){
					_url = login_url+'/app/suc4';
				}else{
					if(apply1 >= 0){
						_url = login_url+'/app/suc1';
					}
					else if(apply2 >= 0){
						_url = login_url+'/app/suc2';
					}
				}
			}
			
			_url += "?username="+data.userName+"&dbid="+data.dbid;
			var _iframe = '<iframe src="'+_url+'" style="display:none" />';
			$("body").prepend(_iframe);
			$(".r1bg").hide();
			$("#step3").show();
		},
		/**
		 * date: 2016.7.7
		 * description: 点击 下一步 按钮，在以上顺序的检测完成的情况下，将所有必要的信息发送到后台进行检测
		 *
		 */
		completeRegister:function(){
			var _self = this;
			var _this = $("#signup");
			/*var postData = {
				action:'ajaxReg',
				isLogin:true,
				userName:_self.formData.mobile,
				password:_self.formData.password,
				source:$.fn.cookie('s') || 0,
				client: _self.AI || "mobile web",
				activeCode: _self.formData.activeCode,
				companyName:_self.formData.companyName,
				linkman:_self.formData.linkman,
				recommendCode : $.trim($("#recommendCode").val()),
				businessTypeId: _self.formData.industry,
				sc: _self.getQueStr("sc")//推荐有礼
			};*/

    		var postData = {
				_csrf: $('#_csrf').val(),
				mobile:_self.formData.mobile,
				password:_self.formData.password,
				code: _self.formData.activeCode,
				merchant_name:_self.formData.companyName,
				name:_self.formData.linkman
			};
			if(_self.formData.wid){
				postData.wid = _self.formData.wid;
			}
    		$.ajax({
    	        type: "POST",
    	        url: _self.appUrl+"/api-register.html",
    	        dataType: "json",
    	        data: postData,
				beforeSend:function(){
					_this.attr("disabled",true).text("提交中");
				},
    	        success: function(responseText){
    	            if(200 == responseText.status){
                        alert('恭喜您，注册成功'); 
                        window.location.href = '/signin.html';
                 	}else{
						Public.tips({ content:responseText.message});
						_this.attr("disabled",null).text('重新提交');
                 	}
    	        },
				error:function(){
					Public.tips({ content:'系统繁忙，请稍后再试！'});
					_this.attr("disabled",null).text('重新提交');
				}
    	    });

			/*$.ajax({
				// url:"/register?action=ajaxReg",
				url:"/register",
				data:postData,
				type:"POST",
				dataType:"JSON",
				beforeSend:function(){
					_this.attr("disabled",true).text("提交中");
				},
				success:function(responseText){
					var data = $.parseJSON(responseText);
					if(data.code == "200"){
						//来源监测
						if (!THISPAGE.AI) {
							$("#joinProduct").click(function(e){
								e.preventDefault();
								window.location.href="/app/login";
							});
						}
						setTimeout(function(){
							$("#step3").addClass("leftIn");
						},500);
						_self.step2Checked=false;
						if(_self.AI){
							$("#manage-experi").hide();
							$("#order-experi").hide();
						}
						_self.setBaiduConversion(data.data);
					}else{
						Public.tips({ content:data.message});
						_this.attr("disabled",null).text('重新提交');
					}
				},
				error:function(){
					Public.tips({ content:'系统繁忙，请稍后再试！'});
					_this.attr("disabled",null).text('重新提交');
				}
			});*/
		},
		/**
		 * author: thy
		 * date: 2016.7.7
		 * description: 为了统计不同的设备APP和web流量，分别有3个页面，根据设置的检测在本页面中插入iframe,
		 * 				并将src指向改页面，在苹果中由于只要有请求就会一直调用setAI，所以会导致频繁的执行刷屏，
		 * 				这里就用一个全局的变量控制其执行一次
		 */
		trafficAppCount:function(deviceMark){
			var device = deviceMark;
			var iframe = document.createElement('iframe');
			if (device==="iphone") {
				iframe.src="https://sso.dinghuo123.com/mobile/iphone.html?v=20160823";
				// console.log("进入iphone流量监控了");
			} else {
				iframe.src="https://sso.dinghuo123.com/mobile/android.html?v=20160823";
				// console.log("进入android流量监控了");
			}
			iframe.style.display = "none"; //这里如果设置高度为0 实测在页面上还是会产生一定的高度所以改为display:none
			document.body.appendChild(iframe);
			THISPAGE.countMark=false;
		},
		/**
		 * author: thy
		 * date: 2016.7.8
		 * description: 针对web端统计的，如果不是APP那么AI就不会有值，就跳到相应的页面
		 */
		trafficWebCount:function(){
			var _self = this;
			var device = _self.AI;
			if(device===""){
				console.log("进入web流量监控了");
				var iframe = document.createElement('iframe');
				iframe.src="https://sso.dinghuo123.com/mobile/web.html?v=20160823";
				iframe.style.display = "none";//这里如果设置高度为0 实测在页面上还是会产生一定的高度所以改为display:none
				document.body.appendChild(iframe);
			}
		}
	};
	THISPAGE.init();
});
