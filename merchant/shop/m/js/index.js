window.onload = function() {

  var forgetPwd = {
    countTime: 60,
    counter:null,
    current:1,
    init:function() {
      var _self = this;
      _self.bindEvent();
    },
    bindEvent:function() {
      var _self = this;
      // 点击回退
      $("#btnBack").on("click",function(){
        if (_self.current===2) {
          $("#stepTip").text("忘记密码");
          $("#newPwd").val("");
          $("#newPwdClean").removeClass("btn-clean-show");
          $("#conPwd").val("");
          $("#conPwdClean").removeClass("btn-clean-show");
          $("#confirm").removeClass("btn-on");
          $("#stepOne").show();
          $("#stepTwo").hide();
        } else {
          window.history.go(-1);
        }
      });

      //监听input输入，显示手机号的清除的按钮
      $("#stepOne").on('input',"#phoneNum",function(e){
          var inputValue = e.target.value;
          var cleanShow = $("#phoneClean").hasClass("btn-clean-show");
          var valueLen = inputValue.length;
          var nextOn = $("#btnNext").hasClass("btn-on");

          if (valueLen&&$("#verCode").val()) {
            if (!nextOn) {
              $("#btnNext").addClass("btn-on");
            }
          } else {
            if (nextOn) {
              $("#btnNext").removeClass("btn-on");
            }
          }

          if (cleanShow&&valueLen>0) {
              return false;
          }
          if (valueLen>0) {
              $("#phoneClean").addClass("btn-clean-show");
          }
          if (valueLen===0) {
              $("#phoneClean").removeClass("btn-clean-show");
          }
      });

      //监听input输入，显示密码清除的按钮
      $("#stepOne").on('input',"#verCode",function(e){
          var inputValue = e.target.value;
          var cleanShow = $("#verClean").hasClass("btn-clean-show");
          var valueLen = inputValue.length;
          var nextOn = $("#btnNext").hasClass("btn-on");

          if (valueLen&&$("#phoneNum").val()) {
            if (!nextOn) {
              $("#btnNext").addClass("btn-on");
            }
          } else {
            if (nextOn) {
              $("#btnNext").removeClass("btn-on");
            }
          }

          if (cleanShow&&valueLen>0) {
              return false;
          }
          if (valueLen>0) {
              $("#verClean").addClass("btn-clean-show");
          }
          if (valueLen===0) {
              $("#verClean").removeClass("btn-clean-show");
          }
      });

      // 清空手机号码
      $("#stepOne").on('click','#phoneClean',function(e){
          $("#phoneNum").val("");
          $("#phoneClean").removeClass("btn-clean-show");
          $("#btnNext").removeClass("btn-on");
      });

      // 清空验证码
      $("#stepOne").on('click','#verClean',function(e){
          $("#verCode").val("");
          $("#verClean").removeClass("btn-clean-show");
          $("#btnNext").removeClass("btn-on");
      });

      //获取验证码
      $("#stepOne").on('click','#getCode',function(e){
        var phoneNum = $("#phoneNum").val().replace(/\s+/g,"");
        var pattern = /^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;

        if (!phoneNum) {
          _self.tip("请填写手机号");
          return false;
        }

        if (!pattern.test(phoneNum)) {
          _self.tip("手机号码不正确");
          return false;
        }

        var data = {
          mobileOrEmail: $.trim(phoneNum)
        };

        $.ajax({
          url : "https://sso.dinghuo123.com/user/passwordRetrieve?action=checkExist",
          type: "get",
          data: data,
          dataType: "json",
          success:function(result){
            if(result.code===200){
               if (result.data.isExist) {
                  _self.getVerCode();
               } else {
                  _self.tip("当前手机尚未绑定");
               }
            } else {
              _self.tip(result.message);
            }
          },
          error:function(){
            _self.tip("系统繁忙，请稍后再试！");
          }
        });

      });

      // 点击下一步
      $("#stepOne").on("click","#btnNext",function(){
        var phoneNum = $("#phoneNum").val().replace(/\s+/g,"");
        var verCode = $("#verCode").val().replace(/\s+/g,"");
        var pattern = /^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
        if (!phoneNum) {
          _self.tip("请填写手机号");
          return false;
        }
        if (!verCode) {
          _self.tip("请填写验证码");
          return false;
        }
        if (!pattern.test(phoneNum)) {
          _self.tip("手机号码不正确");
          return false;
        }

        var data = {
          mobileOrEmail:phoneNum,
          activeCode:verCode
        };

        // https://sso.dinghuo123.com/user/passwordRetrieve?action=checkActiveCode
        $.ajax({
          url : "https://sso.dinghuo123.com/user/passwordRetrieve?action=checkActiveCode",
          type: "post",
          data: data,
          dataType: "json",
          success:function(result){
            if(result.code===200){
              $("#stepTip").text("重置密码");
              $("#stepOne").hide();
              $("#stepTwo").show();
              $("#uuid").val(result.data.uuid);
              _self.current = 2;
            } else {
              _self.tip(result.message);
            }
          },
          error:function(){
            _self.tip("系统繁忙，请稍后再试！");
          }
        });

      });

      // 重置密码

      //监听input输入，显示新密码的清除的按钮
      $("#stepTwo").on('input',"#newPwd",function(e){
          var inputValue = e.target.value;
          var cleanShow = $("#newPwdClean").hasClass("btn-clean-show");
          var valueLen = inputValue.length;
          var nextOn = $("#confirm").hasClass("btn-on");

          if (valueLen&&$("#conPwd").val()) {
            if (!nextOn) {
              $("#confirm").addClass("btn-on");
            }
          } else {
            if (nextOn) {
              $("#confirm").removeClass("btn-on");
            }
          }

          if (cleanShow&&valueLen>0) {
              return false;
          }
          if (valueLen>0) {
              $("#newPwdClean").addClass("btn-clean-show");
          }
          if (valueLen===0) {
              $("#newPwdClean").removeClass("btn-clean-show");
          }
      });

      //监听input输入，显示确认密码清除的按钮
      $("#stepTwo").on('input',"#conPwd",function(e){
          var inputValue = e.target.value;
          var cleanShow = $("#conPwdClean").hasClass("btn-clean-show");
          var valueLen = inputValue.length;
          var nextOn = $("#confirm").hasClass("btn-on");

          if (valueLen&&$("#newPwd").val()) {
            if (!nextOn) {
              $("#confirm").addClass("btn-on");
            }
          } else {
            if (nextOn) {
              $("#confirm").removeClass("btn-on");
            }
          }

          if (cleanShow&&valueLen>0) {
              return false;
          }
          if (valueLen>0) {
              $("#conPwdClean").addClass("btn-clean-show");
          }
          if (valueLen===0) {
              $("#conPwdClean").removeClass("btn-clean-show");
          }
      });

      // 清空新密码
      $("#stepTwo").on('click','#newPwdClean',function(e){
          $("#newPwd").val("");
          $("#newPwdClean").removeClass("btn-clean-show");
          $("#confirm").removeClass("btn-on");
      });

      // 清空确认密码
      $("#stepTwo").on('click','#conPwdClean',function(e){
          $("#conPwd").val("");
          $("#conPwdClean").removeClass("btn-clean-show");
          $("#confirm").removeClass("btn-on");
      });

      // 确定提交
      $("#confirm").on("click",function(e){
        var newPwd = $("#newPwd").val().replace(/\s+/g,"");
        var conPwd = $("#conPwd").val().replace(/\s+/g,"");
        var uuid = $("#uuid").val();
        if (!(/^[A-Za-z0-9]{6,20}$/).test(newPwd)) {
          _self.tip("请输入6-20位英文字母、数字");
          return false;
        }

        if (!newPwd) {
          _self.tip("请输入新密码");
          return false;
        }
        if (!conPwd) {
          _self.tip("请输入确认密码");
          return false;
        }
        if (newPwd!==conPwd) {
          _self.tip("确认密码不正确");
          return false;
        }

        var data = {
          uuid: uuid,
          userName: $("#phoneNum").val(),
          password: newPwd,
          password1: conPwd
        }

        // https://sso.dinghuo123.com/user/passwordRetrieve?action=initPassword
        $.ajax({
          url : "https://sso.dinghuo123.com/user/passwordRetrieve?action=initPassword",
          type: "post",
          data: data,
          dataType: "json",
          beforeSend: function(){
            $(this).text("正在提交").attr("disabled",true);
          },
          success:function(result){
            if(result.code===200) {
              $("#stepTip").text("重置成功");
              $("#btnBack").hide();
              $("#stepTwo").hide();
              $("#resetSuccess").show();
            } else {
              _self.tip(result.message);
            }
            $("#confirm").removeAttr("disabled").text("确定提交");
          },
          error:function(){
            $("#confirm").removeAttr("disabled").text("确定提交");
            _self.tip("系统繁忙，请稍后再试！");
          }
        });

      });

      // 点击“直接登录”
      $("#login").on("click",function(e){
        var postData = {
          username:$("#phoneNum").val(),
          password:$("#newPwd").val()
        };

        $.ajax({
          url : "https://sso.dinghuo123.com/authentication",
          data: postData,
          type : "post",
          dataType : "text",
          xhrFields: {
              withCredentials: true
          },
          crossDomain: true,
          beforeSend: function(){
            $("#login").val("正在进入...").attr("disabled",true);
          },
          success : function(d){
            var responseText = d;
            if(responseText.indexOf("OK_") != -1){
              $("#loginLt").val(responseText.split("OK_")[1]);
              $("#freeLoginForm").submit();
            } else {
              $("#login").removeAttr("disabled").val("立即登录");
               _self.tip(d.message);
            }
          },
          error : function(){
            $("#login").removeAttr("disabled").val("立即登录");
             _self.tip("网络出错");
          }
        });
      });


    },
    getVerCode:function() {
      var _self = this;
      var phoneNum = $("#phoneNum").val().replace(/\s+/g,"");
      var data = {
        mobileOrEmail: $.trim(phoneNum)
      };
      $.ajax({
        url : "https://sso.dinghuo123.com/user/passwordRetrieve?action=sendPwdRetrieveCode",
        type: "get",
        data: data,
        dataType: "json",
        success:function(result){
          if(result.code===200){
            _self.tip("验证码已发送");
            $("#getCode").hide();
            $("#numCount").show();
            _self.counter= window.setInterval(_self.timeCount.bind(_self),1000);
          } else {
            _self.tip(result.message);
          }
        },
        error:function(){
          _self.tip("系统繁忙，请稍后再试！");
        }
      });


    },
    timeCount:function() {
      var _self = this;
      var time = _self.countTime;
      if (time>0) {
        $("#numCount").text(time+"秒");
        _self.countTime--;
      } else {
        window.clearInterval(_self.counter);
        $("#getCode").show();
        $("#numCount").text("");
        $("#numCount").hide();
        _self.countTime = 60;
        _self.counter = null;
      }
    },
    tip:function(content) {
      var _self = this;
      $("#publicTip").find("span").html(content);
      $("#publicTip").show();
      _self.timer&&clearTimeout(_self.timer);
      _self.timer = setTimeout(function(){
        $("#publicTip").hide();
      },2000);
    }

  };

  forgetPwd.init();

}


