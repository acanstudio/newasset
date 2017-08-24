/**
 * Created by Administrator on 2016/11/5 0005.
 */
var marquee = new Array(
    "<p><span>[最新购买]：</span>张**（130****3260）在1分钟前订购了"+quotes[Math.floor((Math.random()*quotes.length))]+" <font color='#FF0000'>√</font></p>",
    "<p><span>[最新购买]：</span>李**（136****7163）在3分钟前订购了"+quotes[Math.floor((Math.random()*quotes.length))]+" <font color='#FF0000'>√</font></p>",
    "<p><span>[最新购买]：</span>赵**（139****1955）在5分钟前订购了"+quotes[Math.floor((Math.random()*quotes.length))]+" <font color='#FF0000'>√</font></p>",
    "<p><span>[最新购买]：</span>刘**（180****6999）在2分钟前订购了"+quotes[Math.floor((Math.random()*quotes.length))]+" <font color='#FF0000'>√</font></p>",
    "<p><span>[最新购买]：</span>张**（151****2588）在4分钟前订购了"+quotes[Math.floor((Math.random()*quotes.length))]+" <font color='#FF0000'>√</font></p>",
    "<p><span>[最新购买]：</span>王**（133****4096）在6分钟前订购了"+quotes[Math.floor((Math.random()*quotes.length))]+" <font color='#FF0000'>√</font></p>"
);
var wfgdaa = 0;
var wfgdbb = 1;
function marqueeL(){
    if(wfgdaa>(marquee.length-1))
        wfgdaa = 0;
    if(wfgdbb>(marquee.length-1))
        wfgdaa = 0;
    wfgdbb = wfgdaa +1;
    var marHTML = marquee[wfgdaa]+marquee[wfgdbb];
    document.getElementById("fahuo").innerHTML = marHTML;
    wfgdaa +=1;
    wfgdbb +=1;
}
window.setInterval("marqueeL()", 3000);