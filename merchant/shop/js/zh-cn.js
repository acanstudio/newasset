/*********************************
 * Themes, rules, and i18n support
 * Locale: Chinese; 中文
 *********************************/
(function(factory) {
    'function' === typeof define && (define.amd || define.cmd) ? define(function(require, exports, module){
        var $ = require('jquery')||jQuery; $._VALIDATOR_URI = module.uri;
        require('../validator/jquery.validator')($);
        factory($);
    }) : factory(jQuery);
}(function($) {

    /* Global configuration
     */
    $.validator.config({
        //stopOnError: true,
        //focusCleanup: true,
        //theme: 'yellow_right',
        //timely: 2,

        dataFilter: function(data) {
            var d = {};
            //data = $.parseJSON(data);
            //{"code":200,"message":"用户名重复","data":{"error":"用户名重复"}}
            //{"code":200,"message":"用户名可用","data":{"ok":"用户名可用"}}
            d = data.data;
            return d;
        },

        messages:{
            fallback: "This field is not valid.",
            loading: '正在验证...'
        },

        // Custom rules
        rules: {
            digits: [/^\d+$/, "请填写数字"]
            ,letters: [/^[a-z]+$/i, "请填写字母"]
            ,date: [/^\d{4}-\d{2}-\d{2}$/, "请填写有效的日期，格式:yyyy-mm-dd"]
            ,time: [/^([01]\d|2[0-3])(:[0-5]\d){1,2}$/, "请填写有效的时间，00:00到23:59之间"]
            ,email: [/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i, "请填写有效的邮箱"]
            ,url: [/^(https?|s?ftp):\/\/\S+$/i, "请填写有效的网址"]
            ,qq: [/^[1-9]\d{4,}$/, "请填写有效的QQ号"]
            ,IDcard: [/^\d{6}(19|2\d)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/, "请填写正确的身份证号码"]
            ,tel: [/^(?:(?:0\d{2,3}[\- ]?[1-9]\d{6,7})|(?:[48]00[\- ]?[1-9]\d{6}))$/, "请填写有效的电话号码"]
            //,mobile: [/^1[3-9]\d{9}$/, "请填写有效的手机号"]
            ,zipcode: [/^\d{6}$/, "请检查邮政编码格式"]
            ,chinese: [/^[\u0391-\uFFE5]+$/, "请填写中文字符"]
            //,username: [/^\w{3,12}$/, "请填写3-12位数字、字母、下划线"]
            //,password: [/^[\S]{6,16}$/, "请填写6-16位字符，不能包含空格"]
            ,accept: function (element, params){
                if (!params) return true;
                var ext = params[0],
                    value = $(element).val();
                return (ext === '*') ||
                       (new RegExp(".(?:" + ext + ")$", "i")).test(value) ||
                       this.renderMsg("只接受{1}后缀的文件", ext.replace(/\|/g, ','));
            }
            ,username: [/^[a-zA-Z0-9]+$/, '用户名无效! 仅支持字母与数字。']
            //,mobile:[/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/, '手机号码不正确']
            ,mobile:[/^1[34578]\d{9}$/, '手机号码不正确']
            //,password:[/^[A-Za-z0-9]{6,20}$/, '长度为6~20位英文字母或数字']
            ,password:[/^[a-zA-Z0-9!@#$%&*_+=]{6,20}$/, '长度为6~20位英文字母或数字']
            ,verfCode:[/^[A-Za-z0-9]{4}$/, '长度为4位']
            ,validateCode:function(element, params){
                return /^[A-Za-z0-9]{6}$/.test( $.trim(element.value) ) || '长度为6位';
            }
            ,realname:[/^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/, '请填写真实姓名']
            ,checkUserName:function(element, params){
                var
                    val = $(element).val(),
                    ssoUrl = $("#ssoUrl").val()
                ;
                return $.ajax({
                           type: "get",
                           url: ssoUrl+'/ajaxChecking?action=checkUserNameExist',
                           data: {"userName": val},
                           dataType: "json",
                           success: function(data, status){
                                //console.log("success");
                           },
                           error: function(err){
                                //console.log("error");
                           }
                        });
            }
            ,checkActiveCode: function(element, params){
            	var
                    postData = {
    					userName: $.trim($("input[name=username]").val()),
    					activeCode: $.trim($("input[name=mobileVerfyCode]").val())
    				},
            		ssoUrl = $("#ssoUrl").val()
            	;
            	return $.ajax({
							url: ssoUrl+'/register?action=checkActiveCode',
							type: 'POST',
							data: postData,
							dataType: 'json',
			            	success: function(data, status){
			                    //console.log("success");
			                },
			                error: function(err){
			                    //console.log("error");
			                }
						});
            }
            ,strength: function(el, params) {

                var pwd = el.value;

                var LOWER = /[a-z]/,
                    UPPER = /[A-Z]/,
                    DIGIT = /^[0-9]+$/,
                    DIGITS = /[0-9].*[0-9]/,
                    SPECIAL = /^[a-zA-Z0-9]+$/,
                    SAME = /^(.)\1+$/;
                    SIGNS = /^[a-zA-Z0-9!@#$%&*_+=]+$/;
                    LETTER = /^[a-zA-Z]+$/;
                    SIGN = /^[!@#$%&*_+=]+$/;
                    SIGN2 = /^[a-zA-Z!@#$%&*_+=]+$/;
                    SIGN3 = /^[0-9!@#$%&*_+=]+$/;

                var lower = LOWER.test(pwd),
                    //upper = UPPER.test(uncapitalize(pwd)),
                    digit = DIGIT.test(pwd),
                    digits = DIGITS.test(pwd),
                    special = SPECIAL.test(pwd),
                    same = SAME.test(pwd);
                    signs = SIGNS.test(pwd);
                    letter = LETTER.test(pwd);
                    sign = SIGN.test(pwd);
                    sign2 = SIGN2.test(pwd);
                    sign3 = SIGN3.test(pwd);

                    var _s = 1;

                    //大小写字母 || 数字 || 符号
                    if(pwd.length >= 6 && (letter || digit || sign) ){
                        _s = 1;
                    }else
                    //大小写字母 + 符号
                    if(pwd.length >=6 && sign2){
                        _s = 2;
                    }else
                    //数字 + 符号
                    if(pwd.length >=6 && sign3){
                        _s = 2;
                    }else
                    //大小写字母 + 数字
                    if(pwd.length >= 6 && special){
                        _s = 2;
                    }else
                    //大小写字母+数字+符号
                    if(pwd.length >= 6 && signs){
                        _s = 3;
                    }
                    $(el).nextAll(".pwd-strength")
                        .removeClass("pwd-strength1")
                        .removeClass("pwd-strength2")
                        .removeClass("pwd-strength3")
                        .addClass("pwd-strength"+_s);
            }
        },

        msgWrapper: 'span',
        msgMaker: function(opt){
            var str = '';
                str+='   <span role="alert" class="msg-wrap n-'+ opt.type +'">';
                str+='      <span class="n-icon"></span>';
                str+='      <span class="n-arrow"><b>◆</b><i>◆</i></span>';
                str+='      <span class="n-msg">' + opt.msg + '</span>';
                str+='  </span>';
            return str;
        },

        // Default error messages
        messages: {
            fallback: "{0}格式不正确",
            loading: "正在验证...",
            error: "网络异常",
            timeout: "请求超时",
            required: "{0}不能为空",
            remote: "{0}已被使用",
            integer: {
                '*': "请填写整数",
                '+': "请填写正整数",
                '+0': "请填写正整数或0",
                '-': "请填写负整数",
                '-0': "请填写负整数或0"
            },
            match: {
                eq: "{0}与{1}不一致",
                neq: "{0}与{1}不能相同",
                lt: "{0}必须小于{1}",
                gt: "{0}必须大于{1}",
                lte: "{0}不能大于{1}",
                gte: "{0}不能小于{1}"
            },
            range: {
                rg: "请填写{1}到{2}的数",
                gte: "请填写不小于{1}的数",
                lte: "请填写最大{1}的数"
            },
            checked: {
                eq: "请选择{1}项",
                rg: "请选择{1}到{2}项",
                gte: "请至少选择{1}项",
                lte: "请最多选择{1}项"
            },
            length: {
                eq: "请填写{1}个字符",
                rg: "请填写{1}到{2}个字符",
                gte: "请至少填写{1}个字符",
                lte: "请最多填写{1}个字符",
                eq_2: "",
                rg_2: "",
                gte_2: "",
                lte_2: ""
            }
        }
    });

    /* Themes
     */
    var TPL_ARROW = '<span class="n-arrow"><b>◆</b><i>◆</i></span>';
    $.validator.setTheme({
        'simple_right': {
            formClass: 'n-simple',
            msgClass: 'n-right'
        },
        'simple_bottom': {
            formClass: 'n-simple',
            msgClass: 'n-bottom'
        },
        'yellow_top': {
            formClass: 'n-yellow',
            msgClass: 'n-top',
            msgArrow: TPL_ARROW
        },
        'yellow_right': {
            formClass: 'n-yellow',
            msgClass: 'n-right',
            msgArrow: TPL_ARROW
        },
        'yellow_right_effect': {
            formClass: 'n-yellow',
            msgClass: 'n-right',
            msgArrow: TPL_ARROW,
            msgShow: function($msgbox, type){
                var $el = $msgbox.children();
                if ($el.is(':animated')) return;
                if (type === 'error') {
                    $el.css({left: '20px', opacity: 0})
                        .delay(100).show().stop()
                        .animate({left: '-4px', opacity: 1}, 150)
                        .animate({left: '3px'}, 80)
                        .animate({left: 0}, 80);
                } else {
                    $el.css({left: 0, opacity: 1}).fadeIn(200);
                }
            },
            msgHide: function($msgbox, type){
                var $el = $msgbox.children();
                $el.stop().delay(100).show()
                    .animate({left: '20px', opacity: 0}, 300, function(){
                        $msgbox.hide();
                    });
            }
        }
    });
}));