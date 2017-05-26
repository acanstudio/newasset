/*$(function() {
  $("input,textarea,select").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // Here I do nothing, but you could do something like display 
      // the error messages to the user, log, etc.
    },
    submitSuccess: function($form, event) {
      //alert("OK");
      //event.preventDefault();
    },
    filter: function() {
      return $(this).is(":visible");
    }
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});*/

function openwinx(url,name,w,h) {
	if(!w) w=screen.width-4;
	if(!h) h=screen.height-95;
    window.open(url,name,"top=100,left=400,width=" + w + ",height=" + h + ",toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no");
}

function addHomePage()
{
	if('undefined' == typeof(document.body.style.maxHeight)) {
		alert("设置首页失败，请手动设置！");
	}
	if (document.all) {
		var url= window.location;
		//var obj=$('body').get(0);
		var obj = document.getElementsByTagName("body")[0];
		try{
			obj.style.behavior='url(#default#homepage)';obj.setHomePage(url);
		} catch(e){
			if(window.netscape) {
				try {
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
				} catch (e) {
					alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
				}
				var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
				prefs.setCharPref('browser.startup.homepage',vrl);
			 }
		}
	} else {
		alert("设置首页失败，请手动设置！");
	}
}

function addFavorite()
{
	var location = window.location;
    try {
        window.external.addFavorite(location, "acanstudio");
    } catch (e) {
	    try{
	        window.external.addToFavoritesBar(location, "acanstudio", "slice");	 
		} catch(e) {
            try {
                window.sidebar.addPanel("acanstudio", location, "");
            } catch (e) {
                alert("非常抱歉，你的浏览器目前还不支持此功能！请在浏览器的收藏夹或者书签菜单里进行手动添加。")
            }
		}
     }
}

function confirmurl(url,message) {
	if(confirm(message)) redirect(url);
}

function redirect(url) {
	location.href = url;
}

/**
 * 全选checkbox,注意：标识checkbox id固定为为check_box
 * @param string name 列表check名称,如 uid[]
 */
function selectall(name) {
	if ($("#check_box").prop("checked")) {  
		$(".checkbox_ids").prop('checked', 'checked');
		$("#check_box").prop("checked", true);
    } else {  
		$(".checkbox_ids").prop('checked', false);
		$("#check_box").prop("checked", false);
    }
}

function checknode(obj) {
    var chk = $("input[type='checkbox']");
    var count = chk.length;
    var num = chk.index(obj);
    var level_top = level_bottom =    chk.eq(num).attr('level');

    for (var i=num; i>=0; i--) {
        var le = chk.eq(i).attr('level');

        if(eval(le) < eval(level_top)) {
            chk.eq(i).parent().attr('class', 'checked');
            chk.eq(i).prop("checked", true);
            var level_top = level_top-1;
        }
    }

    for (var j=num+1; j<count; j++) {
        var le = chk.eq(j).attr('level');
        var checked = chk.eq(num).attr("checked");
        var checked1 = chk.eq(num).prop("checked");
        if (chk.eq(num).prop("checked")) {
            if (eval(le) > eval(level_bottom)) {
                chk.eq(j).prop("checked",true);
                chk.eq(j).parent().attr("class", 'checked');
            } else if (eval(le) == eval(level_bottom)) {
                break;
            }
        } else {
            if (eval(le) > eval(level_bottom)) {
                chk.eq(j).prop("checked",false);
                chk.eq(j).parent().attr('class', '');
            } else if (eval(le) == eval(level_bottom)) {
                break;
            }
        }
    }
}
