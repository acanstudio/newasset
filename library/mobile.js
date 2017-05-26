
var isMobile = navigator.userAgent.search(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|Windows Phone|Tizen|Bada)/);

if (!~isMobile) {
    window.location.href = "/2015/shuang12/index.html";
}


<script type="text/javascript">
    function platform() {
        if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
            if (window.location.href.indexOf("?mobile") < 0) {
                try {
                    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                        //return 'mobile';
                        return 1;
                    } else if (/iPad/i.test(navigator.userAgent)) {
                        //return 'ipad';
                        return 1;
                    } else {
                        //return 'other';
                        return 1;
                    }
                } catch(e) {}
            }
        } else {
            //return 'pc';
            return 0;
        }
    }

    var isPC = platform();
    if (isPC != 0) {
        window.location.href = "/m/2015/shuang12/index.html";
    } else {}
</script>
