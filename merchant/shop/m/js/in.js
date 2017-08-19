seajs.config({
    base:'',
    alias: {
    	"util" : "../util",
        "uri": "../jquery.uriAnchor",
        "unveil":"../jquery.unveil.js",
        "swiper":"../swiper-3.3.1.jquery.min"
    },
    debug: true,
    map: [
        [".css", ".css?v=" + SYSTEM.version],
        [".js", ".js?v=" + SYSTEM.version]
    ]
});
seajs.use("./js/20160525/shell");