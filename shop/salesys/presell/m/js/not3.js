
window.onerror = function(){return true;}
//function $(id){return document.getElementById(id);}  
function getHeight(){$("#fahuo").style.height=$("#forml").offsetHeight-285+"px";}  
window.onload = function(){
	getHeight();
}  
/*///////////////////////////////////////// ORDERJSFGX /////////////////////////////////////////*/
function checktel(){
		if (document.getElementById("notchecktel").value==""){
			alert('请输入要查询的手机号码！');
			document.getElementById("notchecktel").focus();
			return false;
		}
		var form = /^1[3,4,5,7,8]\d{9}$/;
		if (!form.test(document.getElementById("notchecktel").value)){
			alert('手机号码格式不正确，请重新填写！');
			document.getElementById("notchecktel").focus();
			return false;
		}
		//notcheckif.location.href='../../../app/checkorder/index.asp?tel='+document.getElementById("notchecktel").value;
		document.getElementById("notcheckif").src=checktelurl+'?rand='+parseInt(100000*Math.random()+1)+'&tel='+document.getElementById("c").value;
}

function postcheck(){
	$("#uid").val(finger);
	try{
		if ($("input[name='productName']").length != 0){
			if ($("input[name='productName']:checked").val() == undefined){
				alert("请选择产品");
				return false;
			}
		}
		
		if ($("input[name='attrList1']").length != 0){
			if ($("input[name='attrList1']:checked").val() == undefined){
				var a = $("input[name='attrList1']").parent().parent();
				alert("请"+a.attr("id"));
				return false;
			}
		}
		
		if ($("input[name='attrList2']").length != 0){
			if ($("input[name='attrList2']:checked").val() == undefined){
				var a = $("input[name='attrList2']").parent().parent();
				alert("请"+a.attr("id"));
				return false;
			}
		}
		
		if ($("input[name='attrList3']").length != 0){
			if ($("input[name='attrList3']:checked").val() == undefined){
				var a = $("input[name='attrList3']").parent().parent();
				alert("请"+a.attr("id"));
				return false;
			}
		}
		
		if ($("input[name='attrList4']").length != 0){
			if ($("input[name='attrList4']:checked").val() == undefined){
				var a = $("input[name='attrList4']").parent().parent();
				alert("请"+a.attr("id"));
				return false;
			}
		}
    }
    catch(ex){
    }
	
    try{
		if (document.form.buyerName.value==""){
			alert('请填写姓名！');
			document.form.buyerName.focus();
			return false;
		}
		var name = /^[\u4e00-\u9fa5]{2,6}$/;
		if (!name.test(document.form.buyerName.value)){
			alert('姓名格式不正确，请重新填写！');
			document.form.buyerName.focus();
			return false;
		}
    }
    catch(ex){
    } 	
    try{
		if (document.form.phone.value==""){
			alert('请填写手机号码！');
			document.form.phone.focus();
			return false;
		}
		var form = /^1[3,4,5,6,7,8]\d{9}$/;
		if (!form.test(document.form.phone.value)){
			alert('手机号码格式不正确，请重新填写！');
			document.form.phone.focus();
			return false;
		}
    }
    catch(ex){
    } 	
    try{
    	
		if ($("#province").val() == "" ||$("#province").val() == null || $("#province").val() == "请选择"){
			alert('请选择所在省份！');
			document.form.province.focus();
			return false;
		}

		else if ($("#city").val() == "" ||$("#city").val() == null || $("#city").val() == "请选择"){
			alert('请选择所在市区！');
			document.form.city.focus();
			return false;
		}
	   else if ($("#area").val() == "" ||$("#area").val() == null || $("#area").val() == "请选择"){
			alert('请选择所在城镇！');
			document.form.area.focus();
			return false;
		}
    }
    catch(ex){
    } 	
    try{
		if (document.form.address.value==""){
			alert('请填写详细地址！');
			document.form.address.focus();
			return false;
		}
    }
    catch(ex){
    } 	
    
   // document.form.submit.disabled = true;
    //document.form.submit.value="正在提交，请稍等 >>";
    return true;
}
try{	
new PCAS("province","city","area");
}
catch(ex){
} 	
try{	
	var thissrc = document.getElementById("yzm").src;
	function refreshCode(){
		document.getElementById("yzm").src=thissrc+"?"+Math.random(); 
	}
}
catch(ex){
} 	
/*///////////////////////////////////////// ORDERJSFGX /////////////////////////////////////////*/
function pricea(){
	var productName = document.form.productName.alt;
	for(var i=0;i<document.form.productName.length;i++){
		if(document.form.productName[i].checked==true){
			var productName = document.form.productName[i].alt;
			break;
		}
	}
    if(document.form.number.value=="" || document.form.number.value==0){	
		var number=1;
	}
	else{
		var number=document.form.number.value;
	}
	
	// 去掉价格里面多余的逗号
	productName = productName.replace(",","");
	
	var price=productName * number;
    document.getElementById("b1").checked='checked';
	document.form.price.value=price;
	document.form.zfbprice.value=price;
	document.getElementById("showprice").innerHTML=price;
	document.getElementById("zfbyh").innerHTML='';
}

function priceb(){
    var cpxljg = document.getElementById("product");
    var product = cpxljg.options[document.getElementById("product").options.selectedIndex].title; 
    if(document.form.number.value=="" || document.form.number.value==0){	
		var number=1;
	}
	else{
		var number=document.form.number.value;
	}	
	
	// 去掉价格里面多余的逗号
	product = product.replace(",","");
	var price=product*number;
	document.getElementById("b1").checked='checked';
	document.form.price.value=price;
	document.form.zfbprice.value=price;
	document.getElementById("showprice").innerHTML=price;
	document.getElementById("zfbyh").innerHTML='';
}

//***************************  支付宝价格  ***************************
function zfbprize(){
         sprice=document.form.zfbprice.value;
		// alert(sprice);
         document.form.price.value=(sprice*notzfbzk*0.1).toFixed(0)
}
/*///////////////////////////////////////// ORDERJSFGX /////////////////////////////////////////*/
function changeItem(i){

if (i==1) {
document.getElementById("paydiv1").style.display = "block";
document.getElementById("paydiv0").style.display = "none";
  if (notzfbzk != 0){
     zfbprize();
     document.getElementById("zfbyh").innerHTML='<font color=red><b><s>&nbsp;原价：'+document.form.zfbprice.value+'元&nbsp;</s>&nbsp;'+notzfbzk+'折优惠</b></font>';
  }
}else{
//oprize1();
document.getElementById("paydiv0").style.display = "block";
document.getElementById("paydiv1").style.display = "none";
document.getElementById("zfbyh").innerHTML='';
document.form.price.value=document.form.zfbprice.value;
}
}


/*///////////////////////////////////////// ORDERJSFGX /////////////////////////////////////////*/
var llref = '';
if (document.referrer.length > 0){
	llref = document.referrer;
}
try{
	if (llref.length == 0 && opener.location.href.length > 0){
    llref = opener.location.href;
	}
}
catch (e){}

/*///////////////////////////////////////// ORDERJSEND /////////////////////////////////////////*/