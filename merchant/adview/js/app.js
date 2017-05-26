function getResponse(e) {
    LSM.captchaSuccess(e)
}
function getRegResponse(e) {
    e && $(".l-captcha").parent().find(".error").remove()
}
var LSM = LSM || {};
!function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
} (function(e) {
    function t(e) {
        return e
    }
    function n(e) {
        return decodeURIComponent(e.replace(r, " "))
    }
    function i(e) {
        0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return o.json ? JSON.parse(e) : e
        } catch(t) {}
    }
    var r = /\+/g,
    o = e.cookie = function(r, s, a) {
        if (void 0 !== s) {
            if (a = e.extend({},
            o.defaults, a), "number" == typeof a.expires) {
                var c = a.expires,
                l = a.expires = new Date;
                l.setDate(l.getDate() + c)
            }
            return s = o.json ? JSON.stringify(s) : String(s),
            document.cookie = [o.raw ? r: encodeURIComponent(r), "=", o.raw ? s: encodeURIComponent(s), a.expires ? "; expires=" + a.expires.toUTCString() : "", a.path ? "; path=" + a.path: "", a.domain ? "; domain=" + a.domain: "", a.secure ? "; secure": ""].join("")
        }
        for (var u = o.raw ? t: n, d = document.cookie.split("; "), f = r ? void 0 : {},
        m = 0, p = d.length; m < p; m++) {
            var h = d[m].split("="),
            v = u(h.shift()),
            g = u(h.join("="));
            if (r && r === v) {
                f = i(g);
                break
            }
            r || (f[v] = i(g))
        }
        return f
    };
    o.defaults = {},
    e.removeCookie = function(t, n) {
        return void 0 !== e.cookie(t) && (e.cookie(t, "", e.extend({},
        n, {
            expires: -1
        })), !0)
    }
}),
!
function(e) {
    var t = [],
    n = 0,
    i = {
        usernameNeed: '5-25个字符(中文2个字符),支持中英文、数字、"_"，以中英文开头',
        usernameRange: "用户名的长度请控制在5-25个字符",
        usernameError: "不可包含标点等特殊字符，仅支持中文、英文、数字、下划线",
        usernameFirst: "用户名不可以为数字打头",
        usernameBlank: "请输入用户名",
        usernameDismiss: "很遗憾，用户名已存在",
        passwordNeed: "6-16个字符，不可为纯数字",
        passwordRange: "密码的长度请控制在6-16个字符",
        passwordError: "为了您的密码安全，不能为纯数字",
        passwordBlank: "请输入密码",
        confirmpasswordNeed: "请再次输入密码",
        confirmpasswordError: "两次密码输入不一致",
        confirmpasswordBlank: "请再次输入密码",
        emailNeed: "请输入邮箱",
        emailError: "邮箱格式错误",
        emailBlank: "请输入邮箱",
        mobileNeed: "请输入手机号码，格式为：13712345678",
        mobileError: "手机格式错误",
        mobileBlank: "请输入手机号码"
    },
    r = {
        username: i.usernameNeed,
        password: i.passwordNeed,
        confirmpassword: i.confirmpasswordNeed,
        email: i.emailNeed,
        mobile: i.mobileNeed
    },
    o = window.BASE_URL + "/api/validation.html",
    s = {
        success: e('<span class="success"></span>'),
        tip: e('<span class="tip"></span>'),
        error: e('<span class="error"></span>')
    },
    a = function(e, t) {
        return u(e),
        d(e),
        l(e),
        e.closest(".control-group").addClass("warning"),
        s.error.clone().html(t).appendTo(e.parent())
    },
    c = function(t) {
        if (l(t), u(t), d(t), !(e(this).parent().find(".success").length > 0)) return s.success.clone().appendTo(t.parent())
    },
    l = function(e) {
        return e.closest(".control-group").removeClass("warning"),
        e.parent().find(".error").remove()
    },
    u = function(e) {
        return e.closest(".control-group").removeClass("warning"),
        e.parent().find(".tip").remove()
    },
    d = function(e) {
        return e.closest(".control-group").removeClass("warning"),
        e.parent().find(".success").remove()
    },
    f = function(t) {
        var n = t.attr("data-validate");
        if (! (e(this).parent().find(".tip").length > 0)) return s.tip.clone().html(r[n]).appendTo(t.parent())
    },
    m = function(t) {
        return 0 == e.trim(t).length
    },
    p = function(e) {
        for (var t = e.length,
        n = 0,
        i = 0; i < t; i++) e.charCodeAt(i) < 27 || e.charCodeAt(i) > 126 ? n += 2 : n++;
        return n
    },
    h = {
        username: function(e, t) {
            return m(e) ? (a(t, i.usernameBlank), !1) : (t.val(e.toLowerCase()), p(e) < 5 || p(e) > 25 ? (a(t, i.usernameRange), !1) : /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(e) ? !/^([\d])/.test(e) || (a(t, i.usernameFirst), !1) : (a(t, i.usernameError), !1))
        },
        password: function(t, n) {
            if (m(t)) return a(n, i.passwordBlank),
            !1;
            if (t.length < 6 || t.length > 16) return a(n, i.passwordRange),
            !1;
            if (/^\d+$/.test(t)) return a(n, i.passwordError),
            !1;
            var r = n.attr("data-equal"),
            o = e("#" + r);
            return o.val() == t && (l(o), c(o)),
            !0
        },
        confirmpassword: function(t, n) {
            if (m(t)) return a(n, i.confirmpasswordBlank),
            !1;
            var r = n.attr("data-equal"),
            o = e("#" + r);
            return o.val() !== t ? (a(n, i.confirmpasswordError), !1) : 0 != o.parent().find(".success").length || (a(n, ""), !1)
        },
        email: function(e, t) {
            //return m(e) ? (a(t, i.emailBlank), !1) : !!/^(?:[a-z0-9]+[_\-+.]?)*[a-z0-9]+@(?:([a-z0-9]+-?)*[a-z0-9]+.)+([a-z]{2,})+$/i.test(e) || (a(t, i.emailError), !1)
            return m(e) ? true : !!/^(?:[a-z0-9]+[_\-+.]?)*[a-z0-9]+@(?:([a-z0-9]+-?)*[a-z0-9]+.)+([a-z]{2,})+$/i.test(e) || (a(t, i.emailError), !1)
        },
        mobile: function(e, t) {
            return m(e) ? (a(t, i.mobileBlank), !1) : !!/^1[3-9]\d{9}$/.test(e) || (a(t, i.mobileError), !1)
        }
    },
    v = function(t, n) {
        return e(t, n)
    },
    g = function(e) {
        return e.val() || (e.is("[contenteditable]") ? e.text() : "")
    },
    T = function(e) {
        var t = e.attr("data-validate"),
        n = g(e),
        i = h[t](n, e);
        return i && "mobile" == t ? C.call(this, e, "get", o, {
            field: "mobile",
            value: n,
            type: "register"
        }) : i && "email" == t && "" != n ? C.call(this, e, "get", o, {
            field: "email",
            value: n,
            type: "register"
        }) : (i && ("username" == t && "" == n || c(e)), b.call(this, e, i));
        /*return i && "username" == t ? C.call(this, e, "get", o, {
            field: "username",
            value: n,
            format: "json"
        }) : i && "email" == t ? C.call(this, e, "get", o, {
            field: "email",
            value: n,
            format: "json"
        }) : (i && ("mobile" == t && "" == n || c(e)), b.call(this, e, i))*/
    },
    w = function(n, i) {
        var r;
        e.each(n,
        function(n, o) {
            e(o).on(i,
            function() {
                var n = e(this);
                n.each(function() { (r = T.call(this, e(this))) && t.push(r)
                })
            })
        })
    },
    $ = function(n, i) {
        return ! (!i || w.length) || (t = e.map(n,
        function(t) {
            var n = T.call(null, e(t));
            if (n) return n
        }), !!w.length && t)
    },
    b = function(e, t) {
        if (e) {
            g(e);
            return t ? void 0 : e
        }
    },
    C = function(t, n, i, r) {
        var o;
        var responseContent;
        e.ajax({
            type: n,
            url: i,
            data: r,
            async: false,
            success: function(e) {
                200 !== e.status ? (a(t, e.message), o = !1) : (c(t), o = !0);
                responseContent = b.call(this, t, o);
                return responseContent;
            },
            error: function() {}
        });
        return responseContent;
    },
    k = function() {
        return "" != e("#lc-captcha-response").val() || (a(e(".l-captcha"), "请先进行验证"), !1)
    };
    e.fn.lsmRegister = function() {
        var i = this,
        r = r || {},
        o = r.before ||
        function() {
            return ! 0
        },
        s = r.identifie || "[require]",
        a = v(s, i),
        c = r.method || "blur";
        c && w.call(this, a, c),
        i.on("focus", s,
        function(t) {
            l.call(this, e(this)),
            d.call(this, e(this)),
            u.call(this, e(this)),
            f.call(this, e(this))
        }),
        i.on("submit",
        function(e) {
            return n && e.preventDefault(),
            o.call(this),
            $.call(this, a, c),
            t.length ? k() ? e.preventDefault() : e.preventDefault() : k() ? void(n = 1) : e.preventDefault()
        })
    }
} (jQuery),
LSM.login = function() {
    var e = $("#loginForm");
    if (0 == e.length) return 0;
    var t = e.find($(".form-text")),
    n = $('<span class="error"></span>'),
    i = {
        username: "请输入用户名或Email",
        password: "请输入密码",
        captcha: "请先进行验证"
    },
    r = function(e, t) {
        if (!e.parent().find(".error").length) return n.clone().html(t).appendTo(e.parent())
    },
    o = function(e) {
        var t = $(e.currentTarget);
        return t.parent().find(".error").remove()
    },
    s = function(e) {
        var t = $(e.currentTarget),
        n = $.trim(t.val()),
        s = t.attr("name");
        "" == n ? r(t, i[s]) : o(t)
    };
    t.on("blur", s),
    t.on("focus", o);
    var a = function() {
        var e = $(".l-captcha");
        "" == $("#lc-captcha-response").val() && 0 == e.parent().find(".error").length && n.clone().html(i.captcha).appendTo(e.parent())
    };
    this.captchaSuccess = function(e) {
        e && $(".l-captcha").parent().find(".error").remove()
    },
    e.on("submit",
    function(n) {
        t.each(function() {
            $(this).trigger("blur")
        }),
        a(),
        e.find(".error").length > 0 && n.preventDefault()
    })
},
LSM.resendEmail = function() {
    var e = $("#J_resend"),
    t = "LUOSENDTIME";
    e.length && (this.resendNow = function(t) {
        if (t.preventDefault(), 1 != e.attr("data-pass")) {
            var n = this;
            e.attr("data-pass", 1),
            $.ajax({
                type: "GET",
                url: "//my.luosimao.com/auth/send_email/activation",
                success: function(t) {
                    0 == t.error ? (n.setNCookieTime(), n.setNBtnTimer(60)) : t.error == -2 ? (alert("时间间隔60秒"), e.attr("data-pass", 0)) : t.error == -3 && (alert("未登录"), e.attr("data-pass", 0))
                }
            })
        }
    },
    this.setNBtnTimer = function(n) { !
        function i() {
            return 0 == n ? (e.html("重新发送"), e.attr("data-pass", 0), void $.cookie(t, (new Date).getTime())) : void setTimeout(function() {
                n--,
                e.html("已发送，" + n + "秒后可重发邮件"),
                i()
            },
            1e3)
        } ()
    },
    this.setNCookieTime = function() {
        var e = (new Date).getTime();
        $.cookie(t, e)
    },
    this.sendNInit = function() {
        var e = $.cookie(t);
        if ("undefined" == typeof e);
        else {
            var n = (new Date).getTime();
            n - e < 6e4 && this.setNBtnTimer(60 - parseInt((n - e) / 1e3))
        }
    },
    this.sendNInit(), e.on("click", $.proxy(this.resendNow, this)))
},
LSM.findPasswordEmail = function() {
    var e = $("#J_find_resend"),
    t = "LUOFINDTIME";
    e.length && (this.resendNow = function(t) {
        if (t.preventDefault(), 1 != e.attr("data-pass")) {
            var n = this,
            i = $("#J_email_info").html();
            $.ajax({
                type: "POST",
                url: "//my.luosimao.com/auth/send_email/reset_password",
                data: {
                    email: i
                },
                success: function(e) {
                    0 == e.error ? (n.setCookieTime(), n.setBtnTimer(60)) : e.error == -2 ? alert("时间间隔60秒") : e.error == -1 && alert("email地址错误")
                }
            })
        }
    },
    this.setBtnTimer = function(n) {
        e.attr("data-pass", 1),
        function i() {
            return 0 == n ? (e.html("重新发送"), e.attr("data-pass", 0), void $.removeCookie(t)) : void setTimeout(function() {
                n--,
                e.html("已发送，" + n + "秒后可重发邮件"),
                i()
            },
            1e3)
        } ()
    },
    this.setCookieTime = function() {
        var e = (new Date).getTime();
        $.cookie(t, e)
    },
    this.sendInit = function() {
        var e = $.cookie(t);
        if ("undefined" == typeof e);
        else {
            var n = (new Date).getTime();
            n - e < 6e4 && this.setBtnTimer(60 - parseInt((n - e) / 1e3))
        }
    },
    this.sendInit(), e.on("click", $.proxy(this.resendNow, this)))
},
LSM.showPower = function() {
    function e(e, t) {
        return Math.floor(Math.random() * (t - e + 1)) + e
    }
    var t = $(".anim-container");
    if (t.length) {
        var n = /Webkit/i.test(navigator.userAgent),
        i = /Chrome/i.test(navigator.userAgent),
        r = !!("ontouchstart" in window),
        o = /Android/i.test(navigator.userAgent),
        s = document.documentMode;
        if (r && o && !i) return void console.log("for iOS devices or Android devices running Chrome only");
        if (!$.cookie("LUOSHOW")) {
            $.cookie("LUOSHOW", "1", {
                expires: 365
            }),
            t.show(),
            $("body").addClass("show-power"),
            $.velocity.defaults.easing = "easeInOutsine";
            for (var a = r ? o ? 40 : 70 : i ? 175 : 125, c = "", l = $("#count"), u = 0; u < a; u++) c += '<div class="dot"></div>';
            $dots = $(c),
            l.html(a);
            var d = $("#container"),
            f = ($("#browserWidthNotice"), $("#welcome")),
            m = window.screen.availWidth,
            p = window.screen.availHeight,
            h = p - (document.documentElement.clientHeight || p),
            v = -725,
            g = 600,
            T = {
                perspective: [215, 50],
                opacity: [.9, .55]
            };
            s || (T.rotateZ = [5, 0]),
            f.velocity({
                opacity: [0, .65]
            },
            {
                display: "none",
                delay: 3500,
                duration: 1100
            }),
            d.css("perspective-origin", m / 2 + "px " + (.45 * p - h) + "px").velocity(T, {
                duration: 800,
                loop: 1,
                delay: 3250
            }),
            n && $dots.css("boxShadow", "0px 0px 4px 0px #4bc2f1"),
            $dots.velocity({
                translateX: [function() {
                    return "+=" + e( - m / 2.5, m / 2.5)
                },
                function() {
                    return e(0, m)
                }],
                translateY: [function() {
                    return "+=" + e( - p / 2.75, p / 2.75)
                },
                function() {
                    return e(0, p)
                }],
                translateZ: [function() {
                    return "+=" + e(v, g)
                },
                function() {
                    return e(v, g)
                }],
                opacity: [function() {
                    return Math.random()
                },
                function() {
                    return Math.random() + .1
                }]
            },
            {
                duration: 6e3
            }).velocity("reverse", {
                easing: "easeOutQuad"
            }).velocity({
                opacity: 0
            },
            {
                duration: 2e3,
                complete: function() {
                    f.show().velocity({
                        opacity: 1
                    },
                    {
                        duration: 3500,
                        display: "block"
                    }),
                    f.find(".btn").show()
                }
            }).appendTo(d),
            t.on("click", ".btn",
            function(e) {
                e.preventDefault(),
                t.fadeOut(),
                $("body").removeClass("show-power")
            })
        }
    }
},
LSM.smsTesting = function() {
    var e = $(".sms-testing"),
    t = this,
    n = "LUOSMSTESTING",
    i = e.find(".sender");
    if (e.length) {
        var r = $("#myModal");
        this.getTestingTimer = function() {
            return Date.parse(new Date)
        },
        this.testingSender = function(e, n) {
            i.addClass("disabled"),
            $.ajax({
                type: "POST",
                url: "//luosimao.com/welcome/get_captcha_message/" + e,
                data: {
                    luotest_response: n
                },
                success: function(e) {
                    0 == e.error ? (t.setTestingCookie(), t.setTestingTimer(60)) : e.error == -1 ? (r.find(".message").html("请输入正确的验证码!"), r.foundation("reveal", "open"), i.removeClass("disabled")) : e.error == -2 && (r.find(".message").html("您已超过每日测试上限!"), r.foundation("reveal", "open"), i.removeClass("disabled")),
                    LUOCAPTCHA.reset()
                }
            })
        },
        this.setTestingCookie = function() {
            var e = (new Date).getTime();
            $.cookie(n, e)
        },
        this.testingMobile = function(e) {
            return /^1[3-9]\d{9}$/.test(e)
        },
        this.smsTestingInit = function() {
            var r = $.cookie(n);
            if ("undefined" == typeof r);
            else {
                var o = (new Date).getTime();
                o - r < 6e4 && (i.addClass("disabled"), this.setTestingTimer(60 - parseInt((o - r) / 1e3)))
            }
            e.find(".code img").attr("src", "/captcha?" + t.getTestingTimer())
        },
        this.setTestingTimer = function(e) { !
            function t() {
                return 0 == e ? (i.html("发送测试短信").removeClass("disabled"), void $.removeCookie(n)) : void setTimeout(function() {
                    e--,
                    i.html("已发送，" + e + "秒后可重发短信"),
                    t()
                },
                1e3)
            } ()
        },
        this.submitTesting = function(t) {
            t.preventDefault();
            var n = e.find(".mobile").val(),
            i = $("#lc-captcha-response").val(),
            r = $(t.currentTarget);
            r.hasClass("disabled") || this.testingMobile(n) && n && i && this.testingSender(n, i)
        },
        this.smsTestingInit(),
        e.on("click", ".sender", $.proxy(this.submitTesting, this))
    }
},
LSM.voiceTesting = function() {
    var e = $(".voice-test"),
    t = this,
    n = "LUOVOICETESTING",
    i = e.find(".sender"),
    r = $("#myModal");
    e.length && (this.getTestingTimer = function() {
        return Date.parse(new Date)
    },
    this.testingSender = function(e, n) {
        i.addClass("disabled"),
        $.ajax({
            type: "POST",
            url: "//luosimao.com/welcome/get_voice_message_v2/" + e,
            data: {
                luotest_response: n
            },
            success: function(e) {
                0 == e.error ? (t.setTestingCookie(), t.setTestingTimer(60)) : e.error == -1 ? (r.find(".message").html("请输入正确的验证码!"), r.foundation("reveal", "open"), i.removeClass("disabled")) : e.error == -2 && (r.find(".message").html("您已超过每日测试上限"), r.foundation("reveal", "open"), i.removeClass("disabled")),
                LUOCAPTCHA.reset()
            }
        })
    },
    this.setTestingCookie = function() {
        var e = (new Date).getTime();
        $.cookie(n, e)
    },
    this.testingMobile = function(e) {
        return /^1[3-9]\d{9}$/.test(e)
    },
    this.smsTestingInit = function() {
        var r = $.cookie(n);
        if ("undefined" == typeof r);
        else {
            var o = (new Date).getTime();
            o - r < 6e4 && (i.addClass("disabled"), this.setTestingTimer(60 - parseInt((o - r) / 1e3)))
        }
        e.find(".code img").attr("src", "/captcha?" + t.getTestingTimer())
    },
    this.setTestingTimer = function(e) { !
        function t() {
            return 0 == e ? (i.html("发送测试语音验证").removeClass("disabled"), void $.removeCookie(n)) : void setTimeout(function() {
                e--,
                i.html("已发送，" + e + "秒后可重发语音"),
                t()
            },
            1e3)
        } ()
    },
    this.submitTesting = function(t) {
        t.preventDefault();
        var n = e.find(".mobile").val(),
        i = $("#lc-captcha-response").val(),
        r = $(t.currentTarget);
        r.hasClass("disabled") || this.testingMobile(n) && n && i && this.testingSender(n, i)
    },
    this.smsTestingInit(), e.on("click", ".sender", $.proxy(this.submitTesting, this)))
},
LSM.onlineService = function() {
    var e = $(".online-service");
    e.length && (this.toggleService = function(t) {
        var n = $(t.currentTarget);
        e.hasClass("s-show") ? (e.removeClass("s-show"), e.css("bottom", -170), n.find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up")) : (e.addClass("s-show"), e.css("bottom", 0), n.find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down"))
    },
    e.on("click", ".toggle", $.proxy(this.toggleService, this)))
},
$(function() {
    LSM.resendEmail(),
    LSM.findPasswordEmail(),
    LSM.smsTesting(),
    LSM.voiceTesting(),
    LSM.onlineService(),
    LSM.login(),
    $(document).foundation()
}),
function() {
    var e = $("#form");
    e.length && e.lsmRegister()
} (),
function() {
    var e = $(".client-list");
    e.length && e.find("li").on({
        mouseover: function() {
            $(this).addClass("active")
        },
        mouseout: function() {
            $(this).removeClass("active")
        }
    })
} (),
function() {
    var e = $(".dom-content");
    return e.length ? void e.scrollNav({
        sections: ".scroll-nav-title",
        subSections: ".scroll-nav-sub-title",
        headlineText: "快速导航",
        showTopLink: !1
    }) : 0
} ();
