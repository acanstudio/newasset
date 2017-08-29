

	
/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
/*
 * (function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
 * */

$(function(){
	//
	var common = {
	    //
		currentMenu: $("#currentMenu").val(),
		//
		currentMenu3: $("#currentMenu3").val(),

		/*
		 	绑定事件
		 	参数：
			 	bindings:
			 	[{
					element: '',
					selector: '',
					event: '',
					handler: function(event){ }
				}]
		 */
	    bindEvents: function(bindings) {
	        for (var i in bindings) {
	            if(bindings[i].selector) {
	                $(bindings[i].element)
	                    .on(bindings[i].event, bindings[i].selector, bindings[i].handler);

	            }else{
	                $(bindings[i].element)
	                    .on(bindings[i].event, bindings[i].handler);
	            }
	        }
	    },
		//
		init: function(){
			common.initDom();
			common.initEvent();
			common.showForm(); //申请接口登录，回到当前页面，触发表单页面。
		},
        initDom:function(){
        	/*
			if(common.currentMenu == "index"){
				if(jQuery.browser.mobile){
	            	top.window.location.href = "https://m.dinghuo123.com/";
	            }
			}
        	*/
            $(".header").find("."+common.currentMenu).addClass("on");
            !!common.currentMenu3 && $(".container1").find("."+common.currentMenu3).addClass("on");
            //
            //common.onlineService();
        },
		//
		initEvent: function(){
            var bindings =
        	[
        		{
        			element: window,
        			//selector: '',
        			event: 'scroll',
        			handler: function(event){
	        			common.scrollNav();
        			}
        		},
        		/*	立即注册	*/
	            {
	            	element: ".container",
	            	selector: '.reg-now-btn',
	            	event: 'click',
	            	handler: function(event){
						event.preventDefault();
						var url = 'https://sso.dinghuo123.com/apply/apply1?mobile='+$("#mobileNum").val();
        				window.location.href=url;
	            	}
	            },
        	 	/*	立即购买	*/
	            {
	            	element: ".container",
	            	selector: '.btn-buy,.btn-buy2',
	            	event: 'click',
	            	handler: function(event){
						event.preventDefault();
						//_czc.push(['_trackEvent', '价格页面立即购买按钮', '']);
						var d = dialog({
						    title: ' ',
						    url:'https://sso.dinghuo123.com/nest/quickLogin2.jsp',
						    width:440, height:350
						});
						d.showModal();
	            	}
	            },
	            /*	立即体验（头部导航）	*/
	            {
	            	element: ".header",
	            	selector: '.btn-experience',
	            	event: 'click',
	            	handler: function(event){
	            		event.preventDefault();
	            		common.setTrialBox();
	            	}
	            },
	            /*	立即体验（文中导航）	*/
	            {
	            	element: ".sub-menu",
	            	selector: '.btn-experience',
	            	event: 'click',
	            	handler: function(event){
	            		event.preventDefault();
	            		common.setTrialBox();
	            	}
	            },
	            /*	获取解决方案	*/
	            {
	            	element: ".container",
	            	selector: '.btn-get',
	            	event: 'click',
	            	handler: function(event){
	            		event.preventDefault();
	            		common.getAway(event);
	            		// debugger;
	            	}
	            },
	            //客户案例切换
	            {
	            	element: ".screen4-type",
	            	selector: '.industryLogo',
	            	event:'click',
	            	handler: function(event){
	            		//debugger;

	            		//$('.screen4-type-content .lazy').trigger("custLostItem");

	            		var $currentTarget = $(event.currentTarget);
	            		$(".screen4-type").find("td").removeClass("on");
	            		$currentTarget.parent("td").addClass("on");
	            		$("."+$currentTarget.attr("data-type")).fadeIn(300).siblings(".screen4-type-content").hide();
	            	}
	            },

	            //申请加盟/接口申请
	            {
	            	element: ".container",
	            	selector: '.application-form',
	            	event:'click',
	            	handler: function(event){
		            	var type = $(event.target).data('type');
		            	var d = dialog({
		    			    title: ' ',
		    			    url:'/alert/applicationForm.jsp?type='+type,
		    			    width:550, height:620
		    			});
		    			d.showModal();
	            	}
	            }, 
	            //申请加盟/接口申请  产品优势页面
	            {
	            	element: ".product-advantage",
	            	selector: '.application-form',
	            	event:'click',
	            	handler: function(event){
	            		$.ajax({
	            			type:'get',
	            			async:false, 
	            			dataType:'jsonp',
	            			url:'https://sso.dinghuo123.com/ajaxChecking?action=checkIfLogin',
	            			success:function(data){
	            				console.log(data);
	            				if(data === 'true'){ //登陆出现信息填报窗口
    					        	var type = $(event.target).data('type');
    					        	var d = dialog({
    								    title: ' ',
    								    url:'/alert/applicationForm4.jsp?type='+type,
    								    width:550, height:620
    								});
    								d.showModal();
	            				}else{//未登陆出现登陆窗
	            					var d = dialog({
	            					    title: ' ',
	            					    url:'https://sso.dinghuo123.com/nest/quickLogin2.jsp?service=ydh-portal&relayState=/product/productAdvantage.html?c=1',
	            					    width:440, height:350
	            					});
	            					d.showModal();
	            				}
	            			}

	            		});
	            	}
	            },
	            //接口申请
               /* {
                	element: ".container",
                	selector: '.application-form',
                	event:'click',
                	handler: function(event){
    	            	var type = $(event.target).data('type');
    	            	var d = dialog({
    	    			    title: ' ',
    	    			    url:'/alert/applicationForm.jsp?type='+type,
    	    			    width:550, height:620
    	    			});
    	    			d.showModal();
                	}
                },*/

	            {
	            	element: "#joinbody",  
	            	selector: '.application-form',
	            	event:'click',
	            	handler: function(event){
	            		var type = $(event.target).data('type');
	            		var area = $(event.target).data('title');
		            	var d = dialog({
		    			    title: ' ',
		    			    url:'/alert/applicationForm.jsp?type='+type+'&area='+area,
		    			    width:550, height:620
		    			});
		    			d.showModal();
	            	}
	            },
	            //帮助首页-常见问题，手风琴效果
	            {
	            	element: ".container",
	            	selector: '.btn-titleQuestion',
	            	event:'click',
	            	handler: function(event){
	            		event.preventDefault();
	            		var $cur = $(event.currentTarget);
	            		//隐藏
	            		if( $cur.parent("h4").next(".helpIndex-panel-item-list").is(":hidden") ){
	            			$cur.parent("h4").next(".helpIndex-panel-item-list").slideDown(300);
	            			$cur.parents(".helpIndex-panel-list").siblings(".helpIndex-panel-list").find(".helpIndex-panel-item-list").slideUp(300);
	            		}
	            		//显示
	            		else{
	            			$cur.parent("h4").next(".helpIndex-panel-item-list").slideUp(300);
	            			//$cur.parents(".helpIndex-panel-list").siblings(".helpIndex-panel-list").find(".helpIndex-panel-item-list").slideDown(300);
	            		}

	            	}
	            },

	            //帮助内容页-左侧导航，二级菜单
	            {
	            	element: ".container",
	            	selector: '.nav-title',
	            	event:'click',
	            	handler: function(event){
	            		//$(event.currentTarget).removeAttr("href");

	            		if( $(event.currentTarget).parent(".active").length ){
	            			$(event.currentTarget).parent(".nav-sidebar-item").find(".nav").slideUp(300);
	            			$(event.currentTarget).parent(".nav-sidebar-item").removeClass("active");
	            		}
	            		else{
	            			$(event.currentTarget).parent(".nav-sidebar-item").addClass("active");
			            	$(event.currentTarget).parent(".nav-sidebar-item").find(".nav").slideDown(300);
			            	$(event.currentTarget).parent(".nav-sidebar-item").siblings(".nav-sidebar-item").removeClass("active");
			            	$(event.currentTarget).parent(".nav-sidebar-item").siblings(".nav-sidebar-item").find(".nav").slideUp(300);
			            	$(event.currentTarget).parent(".nav-sidebar-item").siblings(".nav-sidebar-item").find(".nav-three").slideUp(300);
			            	$(event.currentTarget).parent(".nav-sidebar-item").siblings(".nav-sidebar-item").find(".nav-item").removeClass("active");
	            		}
	            		//
	            		//common.processHelpSidebarHeight();
		            	//
		            	//$(event.currentTarget).parent(".nav-sidebar-item").find(".nav a:first").trigger("click");
	            	}
	            },

	            //帮助内容页-左侧导航，三级菜单
	            {
	            	element: ".container",
	            	selector: '.nav-three-title',
	            	event:'click',
	            	handler: function(event){
	            		//$(event.currentTarget).removeAttr("href");

	            		if( $(event.currentTarget).parent(".active").length ){
	            			$(event.currentTarget).parent(".nav-item").find(".nav-three").slideUp(300);
	            			$(event.currentTarget).parent(".nav-item").removeClass("active");
	            		}
	            		else{
	            			$(event.currentTarget).parent(".nav-item").addClass("active");
			            	$(event.currentTarget).parent(".nav-item").find(".nav-three").slideDown(300);
			            	/*
			            	$(event.currentTarget).parent(".nav-item").siblings(".nav-item").removeClass("active");
			            	$(event.currentTarget).parent(".nav-item").siblings(".nav-item").find(".nav-three").slideUp(300);
			            	$(event.currentTarget).parent(".nav-item").siblings(".nav-item").find(".nav-three-title").attr("href","javascript:void(0);");
			            	*/
			            	$(event.currentTarget).parents(".nav").siblings(".nav").find(".nav-item").removeClass("active");
			            	$(event.currentTarget).parents(".nav").siblings(".nav").find(".nav-three").slideUp(300);
			            	$(event.currentTarget).parents(".nav").siblings(".nav").find(".nav-three-title").attr("href","javascript:void(0);");
	            		}

		            	//
		            	//$(event.currentTarget).parent(".nav-item").find(".nav-three a:first").trigger("click");
	            	}
	            },

	            //帮助内容页-左侧导航，锚点定位内容
	            {
	            	element: ".container",
	            	selector: '.nav a[data-id]',
	            	event:'click',
	            	handler: function(event){
	            		$(event.currentTarget).parent("li").addClass("active").siblings("li").removeClass("active");
	            		var _id = $(event.currentTarget).attr("data-id");
	            		$("#"+_id).fadeIn(300).siblings(".help-content").hide();
	            	}
	            },

	            //帮助中心，播放视频
	            {
	            	element: "body",
	            	selector: '.btn-video',
	            	event:'click',
	            	handler: function(event){
	            		var _video = $(event.currentTarget).attr("data-video");
	            		var _title = $(event.currentTarget).attr("data-title") || "　";
	            		var $video = $(_video);
	            		var _w = $video.attr("width") || 650;
	            		var _h = $video.attr("height")|| 500;
	            		var d = dialog({
	        			    title: _title,
	        			    content: _video,
	        			    width:_w, height:_h, padding:0, fixed:true
	        			});
	        			d.showModal();
	            	}
	            },

	            //帮助中心，搜索
	            {
	            	element: ".help-search",
	            	selector: '.btn-helpSearch',
	            	event:'click',
	            	handler: function(event){
	            		//$("#helpSearchForm").attr("action","helpSearch.html?s="+ $(".txt-helpSearch").val() );
	            		$("#helpSearchForm").attr("action","helpSearch.html");
	            		$("#helpSearchForm").submit();
	            	}
	            },

	            //product.v2.js
	            {
	            	element: ".container",
	            	selector: ".tab-nav-li",
	            	event:'hover',
	            	handler: function(event){
	            		if(!$(this).hasClass("current")){
	        				event.preventDefault();
	        				var ind = $(this).index();
	        				$(this).addClass("current").siblings(".tab-nav-li").removeClass("current");
	        				$(this).parents(".tab-main").find(".tab-con").eq(ind).css({"opacity":0.2}).show().stop().animate({"opacity":1},500).siblings(".tab-con").hide();
	        			}
	            	}
	            },
	            {
	            	element: ".feature-list",
	            	selector: "a",
	            	event:"click",
	            	handler: function(event){
	        			var src = $(this).attr("data-url");
		        		$.dialog({
		        			title:"",
		        			content: '<img src="'+src+'" alt="">',
		        			width:960,
		        			height:700,
		        			lock:true,
		        			min:false,
		        			max:false
		        		});
	            	}
	            },
	            {
	            	element: ".container",
	            	selector: "#commonBtn1",
	            	event:"click",
	            	handler: function(event){
		        		var btnSwitch = $(this).find('.ui_btn_1').attr('data-switch');
		        		var $article_con = $(this).closest('.title_1').siblings('.article_con1');
		        		if(btnSwitch=='open'){
		        			$article_con.hide();
		        			$(this).find('.ui_btn_1').attr('data-switch','close').css('background-position','-400px -102px'); //background-position: -320px -102px;
		        		}else{
		        			$article_con.show();
		        			$(this).find('.ui_btn_1').attr('data-switch','open').css('background-position','-320px -102px');
		        		}
		        		return false;
	            	}
	            },
	            {
	            	element: ".container",
	            	selector: ".commonBtn",
	            	event:"click",
	            	handler: function(event){
		        		var btnSwitch = $(this).find('.ui_btn_1').attr('data-switch');
		        		var $article_con = $(this).closest('.title_1').siblings('.article_con');
		        		if(btnSwitch=='close'){
		        			$article_con.show();
		        			$(this).find('.ui_btn_1').attr('data-switch','open').css('background-position','-320px -102px'); //background-position: -320px -102px;
		        		}else{
		        			$article_con.hide();
		        			$(this).find('.ui_btn_1').attr('data-switch','close').css('background-position','-400px -102px');
		        		}
		        		return false;
	            	}
	            },
	            
	            //加入我们，左侧切换
	            {
	            	element:".container",
	            	selector:".job-left a",
	            	event:"click",
	            	handler: function(event){
						$(this).addClass("on").parent("li").siblings("li").children("a").removeClass("on");

						var $content = $(this).attr("data-content");

						//$(".job-right "+$content).removeClass("dn").siblings("div.job-contents").addClass("dn");
						$(".job-right "+$content).fadeIn(300).siblings("div.job-contents").hide();

						return false;
	            	}
	            },
	            // 博客页面，按钮切换
         //        {
         //        	element:".container",
         //        	selector:".container-tab ul li",
         //        	event:"click",
         //        	handler: function(event){
    					// // $(this).addClass("on").parent("li").siblings("li").children("a").removeClass("on");
    					// $(this).addClass("on").siblings().removeClass("on");

    					// // var $content = $(this).attr("data-content");

    					// //$(".job-right "+$content).removeClass("dn").siblings("div.job-contents").addClass("dn");
    					// // $(".job-right "+$content).fadeIn(300).siblings("div.job-contents").hide();

    					// // return false;
         //        	}
         //        },	            
	            //行业客户，选项卡切换
	            {
	            	element:".industryCust-wrap",
	            	selector:".industryLogo",
	            	event:"click",
	            	handler:function(event){

	            		$('.custLostItem .lazy').trigger("custLostItem");

		            	var $currentTarget = $(event.currentTarget);
		        		$(".industryCust-wrap").find("td").removeClass("on");
		        		$currentTarget.parent("td").addClass("on");
		        		if($("#"+$currentTarget.attr("data-type")).length){
		        			$("#"+$currentTarget.attr("data-type")).fadeIn(300).siblings(".custLostItem").hide();
		        		}else{
		        			$(".custLostItem").fadeIn(300);
		        		}
	            	}
	            }

	        ];
            common.bindEvents(bindings);
            //
            common.scrollNav();
            //
            //common.processHelpSidebarHeight();
            //
            $('.lazy').lazyload({
            	skip_invisible:false,
            	//placeholder:"data:image/GIF;base64,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",
            	threshold:100,
            	effect:"fadeIn"
            	// effect:"sporty"
            	// container:$(".ydh-bg-content")
            });
            //
            $('.custLostItem .lazy').lazyload({
            	//skip_invisible:false,
            	//threshold:100,
            	event:"custLostItem",
            	//effect:"fadeIn"
            }); 
            $('img.lazy').lazyload({
            	effect:"fadeIn"
            });
            //
            common.showFloatS();
            //
			$('.freeCarousel').freeCarousel({
				key:'b28551',

				autoRollingTime:6000,
				bgSpeed:500,
				motion:{end:null}
			});

			if(common.currentMenu == "index"){
				$(".screen4-next,.screen4-prev").show();
			}
			//
			var _s = common.getQueStr("s") || 0;
			var retentionPeriod = 15 || 7;
			_s && $.cookie("s",_s,{expires: retentionPeriod, path: '/', domain: 'dinghuo123.com'});
			//
		},
		showForm:function(){
			if(location.search.indexOf('?c=1')>-1){
				var top = $('#d').offset().top;
				$(window).scrollTop(top);
				$('.product-advantage .application-form').trigger('click');
			}
		},
		processHelpSidebarHeight: function(){
			var h1 = $(".help-sidebar").height();
			var h2 = sessionStorage["helpSidebarHeight"];
			$(".helpMainBackground").height(function(){
				return h1>=431?(h1>h2?h1:h2):800;
			} );
		},
		
		showFloatS:function(){
		    var _self = this;
		    if($(".float_start").length > 0){
		        if($.cookie("floatClosed") != "1"){
		            $("#float_service").trigger("mouseenter");
		            $.cookie("floatClosed","1",{expires: 1, path: '/', domain: 'www.dinghuo123.com'});
		        }
		        window.clearInterval(_self.floatSInterval);
		    }
		},

		setTrialBox: function(){
			return ;
			var _self = this;
			/*if($("#trilCon").length == 0){
				$("body").append('<div id="mobileVerifyCon" style="display:none"></div>');
			}*/
			$.get("/alert/trial.html?t=" + new Date().getTime(),function(res){
				//$("#mobileVerifyCon").html(res);
				var cs = $.cookie("s");
				var corpHref = $(res).find(".corp-btn").attr("href");
				var agentHref = $(res).find(".agent-btn").attr("href");
				if(!!cs){
					//$(res).find(".corp-btn").attr("href",corpHref+"?s="+cs);
					var con = $(res).find(".corp-btn").attr("href",corpHref+"?s="+cs).siblings(".agent-btn").attr("href",agentHref+"&s="+cs).parents(".trial-box");
				}else{
					con = res;
				}
				var d = dialog({
				    title: ' ',
				    //url:'http://localhost:9080/nest/quickLogin2.jsp',
				    content: con,
				    width:550, height:350
				});

				d.showModal();
			});
			$(".corp-btn").die("click").live("click",function(){
				/*if($.cookie("isCheckCode") == "1"){
					window.open("https://corp2.dinghuo123.com/user/experience");
				}else{
					window.open("/checkCode.html?to=corp");
				}*/
				window.open("/chooseIndustry.html?to=corp");
			});
			$(".agent-btn").die("click").live("click",function(){
				/*if($.cookie("isCheckCode") == "1"){
					window.open("https://corp2.dinghuo123.com/user/experience?accountType=2");
				}else{
					window.open("/checkCode.html?to=agent");
				}*/
				window.open("/chooseIndustry.html?to=agent");
			});

		},

		/*	获取解决方案	*/
		getAway: function(event){
			var d = dialog({
			    title: ' ',
			    url:'/alert/applicationFormv2.jsp',
			    width:550, height:550
			});
			d.showModal();
		},

		/*	锚点到p	*/
		anchor: function(p,t,fn) {
			$("html,body").animate({ scrollTop: $("#" + p + "").offset().top + t }, 1000,fn);
		},

		getQueStr: function(ref){
			var reg=new RegExp("(^|&)"+ref+"=([^&]*)(&|$)");var r=window.location.search.substr(1).match(reg);if(r!=null)return unescape(r[2]);return null;
		},

		scrollNav: function(){
				var scrollTop = $(window).scrollTop();
				if(common.currentMenu=="blog"){
					if(scrollTop>=1){
						$(".header").css({"position":"fixed","top":"0","width":"100%","z-index":"10"});
					}else{
						$(".header").css({"position":"static"});
					}
				}

				if(common.currentMenu == "index"||common.currentMenu == "buy"){
					if(scrollTop>200){
						$(".header:eq(0)").addClass("header-st200");
						// $(".header .register-and-login").css("background-color","#00b7cf");
						// debugger;
					}else{
						$(".header:eq(0)").removeClass("header-st200");
					}
				}
				else if(common.currentMenu == "product"||common.currentMenu == "customer"){

				}
				else if(common.currentMenu == "company"){

				}

				if(common.currentMenu == "product"||common.currentMenu == "customer"||common.currentMenu == "blog"||common.currentMenu=="company"){
					if(scrollTop>=500){
						$(".container1").css({"position":"fixed","top":"0","width":"100%","z-index":"99","marginTop":0});
						$(".container1").addClass("header5");
						// $(".container1 li").css("color":"#03b8cc").siblings().css('color':'#999');
					}else{
						$(".container1").css({"position":"relative","marginTop":"-57px"});
						$(".container1").removeClass('header5');
					}
				}else if(common.currentMenu == "company"){
					if(scrollTop>=320){
						$(".container1").css({"position":"fixed","top":"0","width":"100%","z-index":"2","marginTop":0});
						$('#joinUsBtn').fadeIn();
					}else{
						$(".container1").css({"position":"relative","marginTop":"-57px"});
						$('#joinUsBtn').fadeOut();
					}
				}
		},

		onlineService: function(){
			var _style= "style='position:fixed;bottom:5px;right:5px;z-index:10000;width:100px;height:100px;background-color:#ff0000;'";
			var _s = "<div class='onlineService' "+_style+"></div>";
			$("body").append(_s);
		}

	};
	common.init();
	//
	
});
//
document.onreadystatechange = function(){
	"complete" == document.readyState && NProgress.done();
};
if (window.console && window.console.log) {
    console.log("克强说，“制定‘互联网+’行动计划，引导互联网企业拓展国际市场。”\n化腾解释：“互联网+”战略就是利用互联网的平台，把互联网和包括传统行业在内的各行各业结合起来。\n简单地说就是“互联网+XX传统行业=互联网XX行业”\n易订货，要经历怎样的成长，才能帮助企业链接互联网，帮助企业成长？\n探寻这里的秘密；\n体验这里的挑战；\n成为这里的主人；\n加入易订货，加入互联网+，你，可以影响世界。\n");
    console.log("请将简历发送至 %c hr@77ircloud.com（ 邮件标题请以“姓名-应聘XX职位-来自console”命名）", "color:red");
    console.log("职位介绍：https://www.dinghuo123.com/company/joinUs.html#c")
}
//懒加载
(function(){
	$('.lazy').lazyload({
		event : "sporty"   
	});
})();
//市场推广页自动弹出
(function(){
	//一进来出现推广页
	$('.marketing-promotion').animate({'right':'0%'},1000);
	//关闭推广页
	$('.marketing-btn').on('click',function(){
		$('.marketing-promotion').stop().animate({'right':'-100%'},1000);
	});
	$('.index-banner-flex-btn').on('click',function(){
		$('.marketing-promotion').stop().animate({'right':'0%'},1000,function(){
			clearTimeout(marketTimer);
			marketTimer=setTimeout(hideBanner,8000);
		});
	})
	//延迟5秒隐藏
	var marketTimer=setTimeout(hideBanner,8000);
	function hideBanner(){
		$('.marketing-promotion').stop().animate({'right':'-100%'},1000);
	};
})();
// 联系方式
(function(){
	$('.contact-ways').on('click',function(){
		$('.contact-datail-page').animate({'right':'0%'},500);
	});

	$('.contact-detail-page-close').on('click',function(){
		$('.contact-datail-page').animate({'right':'-100%'},500);
	});
})();
//联系方式--弹窗
/*$('.ways-email span').on('click',function(){
	contactWaysAlert();
})
function contactWaysAlert(){
	var d = dialog({
	    title: ' ',
	    url:'/alert/applicationFormv2.jsp',
	    width:550, height:550
	});
	d.showModal();
}*/
//首页二维码
$('.small-ewm').hover(function(){
	$(this).prev('.big-ewm').show();
},function(){
	$(this).prev('.big-ewm').hide();
});


//角色角色按钮轮转 roloes-btn
(function(){
	var arrClass=['active0','active1','active2','active3','active4'];
	var _length=$('.btn-box ul li').length;
	var _width=$('.btn-box ul li').eq(0).width();
	
	$('.btn-box').css('width',_length*_width+'px');
	$('.btn-box ul').css('width',_length*_width/2+'px');

	$('.btn-box ul li').bind('click',function(){
		$('.btn-box ul li').removeClass();
		var _num=$(this).data('index');
		var _index=$(this).index();
		if ($(this).parent().eq(1)) {
			$('.btn-box ul').eq(0).find('li').eq(_index).addClass(arrClass[_index]);
		}
		$('.roloes-pic-wrapper .ydh-info-roles').eq(_num).removeClass('dn').siblings().addClass('dn');
		$('.btn-box').animate({'left':-_index*_width+'px'},100);
	});
})();

//客户报道页 显示日期数
$('.custReport-wrap .date').html(Date().slice(4,10));
//易订货背景TAB切换
$('.ydh-bg-btn li').on('click',function(){
	var index=$(this).index();
	$(this).addClass('active').siblings().removeClass('active');
	$('.ydh-bg-content ul').eq(index).addClass('db').siblings().removeClass('db');
});

//加盟页小人
(function(){
	$('.brief-main .item4-btn-wrapper li').on('mouseover',function(){
		$(this).addClass('btn-active').siblings().removeClass('btn-active');
		var index=$(this).index();
		$('.brief-main .item4 dl').eq(index).addClass('dl-active').siblings().removeClass('dl-active');
	});
	var xyIndex=0;
	var xyTimer=setInterval(xyTab,4000);
	$('.brief-main .item4-btn-wrapper li').hover(function(){
		clearInterval(xyTimer);
	},function(){
		xyTimer=setInterval(xyTab,4000);
	})
	function xyTab(){
		xyIndex++;
		if (xyIndex>=4) {
			xyIndex=0;
		}
		$('.brief-main .item4-btn-wrapper li').eq(xyIndex).trigger('mouseover');
	}
})();

//博客页面--按钮切换
$('.container-tab ul li').on('click',function(){
	$(this).addClass('on').siblings().removeClass('on');
});

//首页 媒体发声
(function(){
	$('.ydh-users-said .said-list-btn li').on('click',function(){
		var index=$(this).index();
		var li_width=$('.said-list-wrap .said-list').eq(0).width();

		$(this).addClass('active').siblings().removeClass('active');
		$('.said-list-wrap').stop().animate({'left':-index*li_width+'px'},200);
	});
	var num=0;
	var saidTimer=setInterval(tab,5000);
	$('.said-list-wrap').hover(function(){
		clearInterval(saidTimer);
	},function(){
		saidTimer=setInterval(tab,5000);
	});
	function tab(){
		num+=1;
		if (num>=3) {
			num=0;
		}
		$('.ydh-users-said .said-list-btn li').eq(num).trigger('click');
	};
})();

//首页媒体轮播图 ydh-reports
(function(){
	$('.ydh-reports .said-list-btn li').on('click',function(){
		var index=$(this).index();
		var li_width=$('.said-list-wrap .said-list').eq(0).width();

		$(this).addClass('active').siblings().removeClass('active');
		$('.said-list-wrap').stop().animate({'left':-index*li_width+'px'},200);
	});
	var num=0;
	var saidTimer=setInterval(tab,5000);
	$('.said-list-wrap').hover(function(){
		clearInterval(saidTimer);
	},function(){
		saidTimer=setInterval(tab,5000);
	});
	function tab(){
		num+=1;
		if (num>=3) {
			num=0;
		}
		$('.ydh-reports .said-list-btn li').eq(num).trigger('click');
	};
})();

//首页用户轮播图 ydh-users
(function(){
	var reprotBannerIndex=0;
	var li_length=$('.swipe-banner li').length;
	function nextBtn (){
		reprotBannerIndex++;
		if (reprotBannerIndex>=li_length) {
			reprotBannerIndex=0;
		}
		// $('.swipe .swipe-banner li').removeClass('active');
		$('.swipe .swipe-banner li').eq(reprotBannerIndex).addClass('active').siblings().removeClass("active");
		$('.userimg-wrap .img-list').animate({'left':-reprotBannerIndex*500+'px'},500)
	}
	function prevBtn (){
		reprotBannerIndex--;
		if (reprotBannerIndex<=-1) {
			reprotBannerIndex=li_length-1;
		}
		// $('.swipe .swipe-banner li').removeClass('active');
		$('.swipe .swipe-banner li').eq(reprotBannerIndex).addClass('active').siblings().removeClass("active");
		// console.log($('.swipe .swipe-banner li'));
		$('.userimg-wrap .img-list').animate({'left':-reprotBannerIndex*500+'px'},500)
	}
	//下一张
	$('.swipe .banner-next-btn').on('click',nextBtn);
	//上一张
	$('.swipe .banner-prev-btn').on('click',prevBtn);
	var saidTimer = setInterval(nextBtn,7000);
	$('.swipe .banner-btn').hover(function(){
		clearInterval(saidTimer);
	},function(){
		saidTimer = setInterval(nextBtn,7000);
	});
})();

//快速滚回顶部
$(window).scroll(function(){
	var scrollTop = $(window).scrollTop();
	if(scrollTop > 200){
		$('.header-menu .scroll-top').css("display","block");
	}else{
		$('.header-menu .scroll-top').css("display","none");
	}
});

$(".header-menu .scroll-top").click(function(){
	$('body,html').animate({scrollTop:0},500);
})

//首页--权威媒体报道轮播图
// (function(){
// 	var reprotBannerIndex=0;
// 	var li_width=$('.news-reports-banner li').width();
// 	var li_length=$('.news-reports-banner li').length;
// 	$('.news-reports-banner').css('width',li_width*li_length+'px')
// 	//下一张
// 	$('.news-reports .banner-next-btn').on('click',function(){
// 		reprotBannerIndex++;
// 		if (reprotBannerIndex>=li_length) {
// 			// return false
// 			reprotBannerIndex=0;
// 		}
// 		$('.news-reports-banner').animate({'left':-reprotBannerIndex*li_width+'px'},500)
// 	});
// 	//上一张
// 	$('.news-reports .banner-prev-btn').on('click',function(){
// 		reprotBannerIndex--;
// 		if (reprotBannerIndex<=-1) {
// 			// return false;
// 			reprotBannerIndex=li_length-1;
// 		}
// 		$('.news-reports-banner').animate({'left':-reprotBannerIndex*li_width+'px'},500)
// 	});
// })();

//最新公告循环滚动
// (function(){
// 	var newsCoun=$('.new-notice li').length;
// 	var newsIndex=0;
// 	var li_height=$('.new-notice li').height();
// 	var newsTimer=setInterval(newsRuning,3000)
// 	$('.new-notice').css('height',newsCoun*li_height+'px')

// 	$('.new-notice').hover(function(){
// 		clearInterval(newsTimer);
// 	},function(){
// 		newsTimer=setInterval(newsRuning,3000);
// 	});
// 	function newsRuning(){
// 		newsIndex++;
// 		if (newsIndex>=newsCoun) {
// 			newsIndex=0;
// 		}
// 		$('.new-notice').animate({'top':-newsIndex*li_height+'px'},500);
// 	}
// })();

//模拟角色轮播
/*(function(){
	var rolesIndex=0;
	var rolesTimer=setInterval(rolesTab,5000);
	$('.ydh-info').hover(function(){
	  clearInterval(rolesTimer);
	},function(){
	  rolesTimer=setInterval(rolesTab,5000);
	});
	function rolesTab(){
	   rolesIndex++;
	   if(rolesIndex>=5){ rolesIndex=0;}
	   $('.ydh-info-roles-btn-wrapper li').eq(rolesIndex).trigger('click');
	}
})();*/
