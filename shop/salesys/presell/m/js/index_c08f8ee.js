define("src/views/product/index/index",
function(e) {
    {
        var t = e("node_modules/jquery/dist/jquery"),
        n = (e("node_modules/underscore/underscore"), e("node_modules/fastclick/lib/fastclick"));
        e("node_modules/slick-carousel/slick/slick")
    }
    t(function() {
        function e() {
            n(document.body),
            m(),
            D(),
            B(),
            1 == Z && i(),
            t(".fixed_bar").show(),
            lt.on("beforeunload",
            function() {
                t("html, body").animate({
                    scrollTop: "0px"
                },
                0)
            }),
            lt.on("scroll", R(C())).on("load",
            function() {
                vt = et.offset().top
            }),
            t(".fixed_bar").on("click", ".go-to-form",
            function(e) {
                e.preventDefault(),
                t("body").animate({
                    scrollTop: et.offset().top - 60
                }),
                t(this).hasClass("btn-online-buy") ? F() : A()
            }).on("click", ".btn-tel-buy",
            function() {
                H()
            }).on("click", "a.fxg.homepage", G),
            t(".go-to-form").on("click",
            function(e) {
                e.preventDefault(),
                t("body").animate({
                    scrollTop: et.offset().top - 60
                }),
                t(this).hasClass("btn-online-buy") ? F() : A()
            }),
            t("#main").on("click", "a:not([href^=tel])",
            function(e) {
                e.preventDefault()
            }),
            window.TM.ENV.isInToutiao && a(!1),
            V(),
            $(),
            z(),
            TM.ENV.isInToutiao ? rt.find("a.return").remove() : rt.find("a.checkout-order").remove()
        }
        function o() {
            if (window.TM.ENV.isInToutiao) {
                ht = Nt.NOT_VERIFIED;
                var e = et.find('[name="post_tel"]').val();
                e && /^1\d{10}$/.test(e) && t.ajax({
                    url: "/order/checkLegalOrder",
                    method: "post",
                    data: {
                        post_tel: e
                    }
                }).always(function(e) {
                    var t = !1;
                    0 === e.st ? ht = Nt.VERIFIED_OK: 10005 === e.st ? ht = Nt.FORBIDDEN: 10009 === e.st || 10010 === e.st ? (t = !0, ht = Nt.NEED_CODE) : ht = Nt.UNCLEAR,
                    a(t)
                })
            }
        }
        function a(e) {
            et.find(".field-group-code").toggle(e)
        }
        function i() {
            t("#slick-container").slick({
                infinite: !1,
                slidesToShow: 1,
                dots: !0,
                centerMode: !0,
                centerPadding: "0px"
            })
        }
        function r(e) {
            function t() {
                n-->0 ? (o.text("请等待" + n + "秒"), setTimeout(t, 1e3)) : (o.text("获取手机验证码").removeClass("disabled"), Tt = !1)
            }
            Tt = !0,
            d(e);
            var n = 60,
            o = et.find(".getCodeBtn").addClass("disabled");
            t()
        }
        function d(e) {
            t.ajax({
                url: "/api-generate-code.html",
                type: "post",
                dataType: "json",
                data: {
                    mobile: e,
                    type: 'presell',
                    _csrf: et.find('[id="_csrfpresell"]').val()
                    //_csrf: $('#_csrf').val()
                }
            }).always(function(e) {
                e && 200 === e.status || L(e.message || "获取验证码失败")
            })
        }
        function c() {
            var e = {};
            e._csrf = et.find('[id="_csrfpresell"]').val();
            e.presell_id = et.find('[id="presell_id"]').val();
            e.price = et.find('[name="total_amount"]').val();
            e.merchant_id = et.find('[id="merchant_id"]').val();
            n = et.find(".radio-container-combo").find(".active");
            var size = et.find(".radio-container-spec").find(".active");
            e.size = size.data("id");
            if (e.color = n.data("id"), !(N(e.color, "请选择产品颜色") || N(e.size, "请选择产品尺寸") || (e.num_buy = et.find('[name="combo_num"]').val(), N(e.num_buy, "请填写购买数量") || y(e.num_buy, "请填写正确的购买数量") || O(e.num_buy, "超过最大购买数量，请减少购买数量") || (e.name = et.find('[name="post_receiver"]').val(), N(e.name, "请填写姓名") || h(e.name, "姓名太长了", 20) || (e.mobile = et.find('[name="post_tel"]').val(), N(e.mobile, "请填写手机号码") || E(e.mobile, "请填写正确的手机号码")))))) {
                if (ht === Nt.NOT_VERIFIED) return void L("网络延时，请您稍后下单");
                if (ht === Nt.FORBIDDEN) return void L("您今天下单太多啦，休息一会吧");
                if ((window.TM.ENV.isInToutiao && ht !== Nt.NEED_CODE || (e.code = et.find('[name="code"]').val(), !N(e.code, "请填写手机验证码"))) && (e.message = et.find('[name="buyer_words"]').val(), !h(e.message, "用户留言太长了", 500))) {
                    /*var o = [];
                    tt.find(".radio-container-spec").each(function() {
                        var e = t(this);
                        o.push({
                            name: e.data("spec"),
                            value: e.find(".active").text()
                        })
                    });
                    for (var a = 0; a < o.length; a++) if (N(o[a].value, "请选择产品" + o[a].name)) return;
                    var i = [];
                    if (g(n.text())) {
                        nt.find(".radio-container-spec").each(function() {
                            var e = t(this);
                            i.push({
                                name: e.data("spec"),
                                value: e.find(".active").text()
                            })
                        });
                        for (var a = 0; a < i.length; a++) if (N(i[a].value, "请选择产品" + i[a].name)) return
                    }*/
                    var r = {};
                    if (r.province = {
                        id: ot.val(),
                        name: ot.find("option:selected").text()
                    },
                    !(N(r.province.id, "请选择省份") || (r.city = {
                        id: at.val(),
                        name: at.find("option:selected").text()
                    },
                    N(r.city.id, "请选择城市") || (r.town = {
                        id: it.val(),
                        name: it.find("option:selected").text()
                    },
                    N(r.town.id, "请选择地区") || (r.address = et.find('[name="detail"]').val(), N(r.address, "请填写详细地址") || h(r.address, "详细地址太长了", 60)))))) return e.province = r.province.id, e.city = r.city.id, e.county= r.town.id, e.address = r.address, e;
                    //e.spec_desc = o,
                    //e.gift_spec_desc = i,
                    //e.post_addr = r,
                    //e.product_id = Q,
                    //s(e),
                    //e
                }
            }
        }
        function s(e) {
            var t = location.href,
            n = TM.common.getUrlParam(t, "source_type");
            if (n && "0" != n) e.source_type = n,
            e.source_id = TM.common.getUrlParam(t, "source_id") || 0;
            else if (TM.ENV.isInToutiao) e.source_type = 1,
            e.source_id = TM.ENV.cid,
            e.extra = u(TM.ENV.log_extra);
            else {
                var o, a;
                try {
                    ct = JSON.parse(decodeURIComponent(TM.common.getUrlParam(t, "_toutiao_params"))),
                    o = ct.cid,
                    a = ct.rit
                } catch(i) {
                    console.log(i)
                }
                o && a && a > 9e8 && 1e9 > a ? (e.source_type = 8, e.source_id = o, e.extra = u(ct.log_extra)) : e.source_type = 6
            }
        }
        function u(e) {
            var t = {};
            try {
                "string" == typeof e && (t = JSON.parse(e))
            } catch(n) {
                return ""
            }
            return JSON.stringify({
                rit: t.rit + "",
                req_id: t.req_id
            })
        }
        function l() {
            var e = t.Deferred();
            return gt.off().on("click", ".confirmOrder",
            function() {
                e.resolve(),
                gt.hide()
            }).on("click", ".cancelOrder",
            function() {
                e.reject(),
                gt.hide()
            }).show(),
            e.promise()
        }
        function _(e) {
            pt || (f(), e.user_id = window.TM.ENV.user_id, e.device_id = window.TM.ENV.device_id, e.come_from = st.come_from || "0", t.ajax({
                //url: "/order/create",
                url: window.SIGNUP_URL,
                type: "post",
                dataType: "json",
                data: e
            }).always(function(t) {
                k(e, t),
                p(),
                0 === t.st ? (6 === e.source_type || 8 === e.source_type ? j(e) : TM.stat.umeng_shopping_ocpc(Q, e.source_id, st.come_from || "0"), U(e), It = !0, P(t.data && t.data.order_id)) : L(t.msg || "下单失败")
            }))
        }
        function f() {
            et.find(".btn-submit").addClass("disabled"),
            pt = !0
        }
        function p() {
            setTimeout(function() {
                et.find(".btn-submit").removeClass("disabled"),
                pt = !1
            },
            1e3)
        }
        function m() {
            var e = et.find('[name="total_amount"]'),
            t = et.find('[name="combo_num"]').val(),
            n = et.find(".radio-container-combo").find(".active"),
            o = n.data("price");
            nt.toggle(g(n.text())),
            t = parseInt(t),
            o = parseInt(o),
            isNaN(t) || isNaN(o) || (o *= t, e.val(o / 100))
        }
        function v() {
            var e = this.value;
            t.ajax({
                url: "/api-city-code.html",
                type: "get",
                dataType: "json",
                data: {
                    id: e
                }
            }).always(function(e) {
                if (e.data && e.data.length) {
                    at.html(e.data.map(function(e) {
                        return '<option value="' + e.code + '">' + e.name + "</option>"
                    }).join(""));
                    var t = at.data("id");
                    t ? (at.removeData("id"), at.val(t).change()) : at.change()
                }
            })
        }
        function T() {
            var e = this.value;
            t.ajax({
                url: "/api-city-code.html",
                type: "get",
                dataType: "json",
                data: {
                    id: e
                }
            }).always(function(e) {
                if (e.data && e.data.length) {
                    it.html(e.data.map(function(e) {
                        return '<option value="' + e.code + '">' + e.name + "</option>"
                    }).join(""));
                    var t = it.data("id");
                    t && (it.removeData("id"), it.val(t))
                }
            })
        }
        function g(e) {
            return /[赠两]/.test(e)
        }
        function N(e, t) {
            return e ? void 0 : (L(t), !0)
        }
        function h(e, t, n) {
            return n = n || 999,
            e && e.length > n ? (L(t), !0) : void 0
        }
        function y(e, t) {
            var n = parseInt(e);
            return isNaN(n) || 0 >= n || n != e ? (L(t), !0) : void 0
        }
        function O(e, t) {
            var n = parseInt(e);
            return isNaN(n) || n > 99999 ? (L(t), !0) : void 0
        }
        function E(e, t) {
            return e && /^1\d{10}$/.test(e) ? void 0 : (L(t), !0)
        }
        function C() {
            vt = et.offset().top;
            var e = lt.height(),
            n = !0,
            o = t(".fixed_bar");
            return function() {
                var t = lt.scrollTop();
                n ? t + e > vt && (n = !1, o.hide(), I(), K(), W()) : vt > t + e && (n = !0, o.show())
            }
        }
        function I() {
            _t || (_t = !0, t.ajax({
                url: "/product/orderinfo",
                type: "get",
                dataType: "json",
                data: {
                    id: Q
                }
            }).always(function(e) {
                0 === e.st && e.data && (mt = e.data.is_dup, e.data.order && e.data.order.length && b(e.data.order), e.data.address && 0 != e.data.address.province && w(e.data.address))
            }))
        }
        function b(e) {
            if (1 == t("#buy_record_switch").val()) {
                for (var n, o = "",
                a = 0,
                i = 0; i < e.length; i++) n = e[i],
                a++,
                o += "<li>" + n + "</li>";
                o && (t("#buy-history-list").find("ul").html(o).end().show(), a > 4 && x())
            }
        }
        function w(e) {
            e && e.province && e.city && e.area && (et.find('[name="post_tel"]').val(e.mobile), et.find('[name="post_receiver"]').val(e.receiver), et.find('[name="detail"]').val(e.details), it.data("id", e.area), at.data("id", e.city), ot.val(e.province).change(), o(e.mobile))
        }
        function x() {
            function e() {
                var t = (new Date - i) * a / 1e3;
                t = Math.floor(t),
                t %= o,
                n.css("transform", "translateY(" + -t + "px)"),
                setTimeout(e, 16)
            }
            var n = t("#buy-history-list").find("ul"),
            o = n.height(),
            a = 10,
            i = new Date;
            n.children().slice(0, 4).clone().appendTo(n),
            e()
        }
        function D() {
            function e() {
                var t = c - new Date;
                if (!isNaN(t) && t > 0) {
                    var n = ~~ (t / 864e5);
                    t %= 864e5;
                    var d = ~~ (t / 36e5);
                    t %= 36e5;
                    var s = ~~ (t / 6e4);
                    t %= 6e4;
                    var u = ~~ (t / 1e3);
                    o.text(n),
                    a.text(d),
                    i.text(s),
                    r.text(u),
                    setTimeout(e, 1e3)
                }
            }
            var n = t(".time-container"),
            o = t(".dd", n),
            a = t(".hh", n),
            i = t(".mm", n),
            r = t(".ss", n),
            d = n.data("remain"),
            c = new Date(1e3 * d);
            e()
        }
        function R(e) {
            var t = null;
            return function() {
                t && clearTimeout(t),
                t = setTimeout(e, 300)
            }
        }
        function L(e) {
            return ut.text(e).fadeIn("fast").delay(2e3).fadeOut("fast")
        }
        function U(e) {
            rt.find(".name-and-phone").html(e.post_receiver + " " + e.post_tel),
            rt.find(".address").html(e.post_addr.province.name + e.post_addr.city.name + e.post_addr.town.name + e.post_addr.detail),
            rt.show(),
            TM.utils.addFxgChannel(),
            t("#main").remove(),
            t(".fixed_bar").remove(),
            t(".header-notice").remove()
        }
        function k(e, t) {
            S(1, {
                form: e,
                result: t,
                env: window.TM.ENV,
                agent: navigator.userAgent,
                location: location.href
            })
        }
        function S(e, n) {
            t.post({
                url: "/log/saveLogEvent",
                data: {
                    type: e,
                    msg: n
                }
            })
        }
        function M(e) {
            return e = e || new Date,
            e.toISOString().slice(0, 10) + " " + e.toTimeString().slice(0, 8)
        }
        function j() {
            if (ct) {
                var e = new Date,
                n = e.getTime() - dt;
                t.ajax({
                    url: "https://i.snssdk.com/api/ad/union/convert_event/",
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    data: JSON.stringify({
                        header: {
                            ua: navigator.userAgent,
                            device_type: window.TM.ENV.device_type
                        },
                        event: {
                            tag: "embeded_ad",
                            label: "convert",
                            convert_id: "0",
                            datetime: M(e),
                            event_type: "shopping",
                            value: ct.cid,
                            category: "app_union",
                            log_extra: ct.log_extra,
                            is_ad_event: "1",
                            show_time: n,
                            user_id: ct.user_id,
                            nt: 0
                        },
                        api_time: e.getTime(),
                        ut: 14,
                        uid: ct.uid,
                        sign: ct.sign
                    })
                })
            }
        }
        function B() {
            t(".radio-container").on("click", "span",
            function() {
                t(this).addClass("active").siblings().removeClass("active"),
                m()
            })
        }
        function K() {
            if (!ft) {
                ft = !0;
                var e = {},
                n = {
                    req_id: "0",
                    rit: "0"
                };
                s(e),
                e.extra && (n = JSON.parse(e.extra));
                var o = e.source_type || "0",
                a = e.source_id || "0",
                i = n.req_id,
                r = n.rit;
                TM.stat.sendUmeng({
                    tag: "shopping",
                    label: "to_order_module",
                    value: "0",
                    extra: {
                        req_id: i,
                        rit: r,
                        source_id: a,
                        source_type: o
                    }
                })/*,
                t.ajax({
                    url: "https://i.snssdk.com/api/ad/union/shopping_event/",
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    data: JSON.stringify({
                        header: {
                            ua: navigator.userAgent,
                            device_type: window.TM.ENV.device_type
                        },
                        event: {
                            tag: "shopping",
                            label: "to_order_module",
                            value: "0",
                            extra: {
                                req_id: i,
                                rit: r,
                                source_id: a,
                                source_type: o
                            }
                        }
                    })
                })*/
            }
        }
        function V() {
            q(Ot.DISPLAY, {},
            !1)
        }
        function P(e) {
            q(Ot.ORDER_SUCCESSED, {
                order_id: e + ""
            },
            !0)
        }
        function F() {
            Ct & Et.ORDER_ONLINE_BUTTON_CLICK || (q(Ot.CLICK_ORDER_ONLINE_BUTTON, {},
            !0), Ct |= Et.ORDER_ONLINE_BUTTON_CLICK)
        }
        function A() {
            Ct & Et.ORDER_RIGHT_NOW_BUTTON_CLICK || (q(Ot.CLICK_ORDER_RIGHT_NOW_BUTTON, {},
            !0), Ct |= Et.ORDER_RIGHT_NOW_BUTTON_CLICK)
        }
        function H() {
            Ct & Et.CONSULT_ON_PHONE_BUTTON_CLICK || (q(Ot.CLICK_CONSULT_ON_PHONE_BUTTON, {},
            !0), Ct |= Et.CONSULT_ON_PHONE_BUTTON_CLICK)
        }
        function G() {
            q(Ot.CLICK_BACK_TO_FXG_LINK, {},
            !0)
        }
        function q(e, t) {
            var n = {
                tag: "product_index",
                label: e,
                extra: t || {}
            };
            n.extra.source_id = st.source_id,
            n.extra.source_type = st.source_type,
            n.extra.product_id = st.id,
            n.extra.come_from = st.come_from || "0",
            n.extra.page_version = "1",
            TM.stat.sendUmeng(n)
        }
        function J() {
            window.ToutiaoJSBridge.call("close")
        }
        function W() {
            if (5 != st.source_type && 9 != st.source_type && !yt && X()) {
                var e = location.href,
                t = "/channel/list?come_from=2&id=" + Q + "&show_modal_fxg=" + Y();
                history.replaceState({
                    page: "productList",
                    href: t
                },
                null, t),
                history.pushState({
                    page: "productDetail",
                    href: e
                },
                null, e),
                yt = !0,
                window.onpopstate = function(e) {
                    var t = e.state;
                    t && "productList" === t.page && (It && TM.ENV.isInToutiao ? J() : (document.body.scrollTop = 0, location.reload()))
                }
            }
        }
        function Y() {
            return ft ? 2 : 2 != bt.status && bt.status ? 2 : 1
        }
        function X() {
            if (!It && ft) return ! 0;
            var e = (new Date).getTime();
            return bt.updateTime && e - bt.updateTime < 6048e5 && 2 == bt.type && 1 == bt.status ? !1 : !0
        }
        function $() {
            var e = t(".sell-num");
            e.length && t.ajax({
                url: "/product/getSellNum",
                type: "GET",
                dataType: "json",
                data: {
                    id: Q
                }
            }).done(function(t) {
                0 === t.st && e.text(t.data + "人已购买")
            })
        }
        function z() {
            return TM.ENV.isInToutiao ? void t.ajax({
                url: "/product/getUserOption",
                type: "GET",
                dataType: "json"
            }).always(function(e) {
                if (0 === e.st) {
                    var t = e.data.checkOption;
                    bt.type = t.type,
                    bt.status = t.status,
                    bt.updateTime = t.update_time,
                    bt.updateTime && (bt.updateTime = new Date(bt.updateTime.replace(/\-/gi, "/")).getTime())
                }
                W()
            }) : void W()
        }
        var Q = t("#product_id").val(),
        Z = t("#img_style_switch").val(),
        et = t("#form-container").find("form"),
        tt = t(".normal-spec-info-container", et),
        nt = t(".gift-spec-info-container", et),
        ot = t("[name=province]", et),
        at = t("[name=city]", et),
        it = t("[name=town]", et),
        rt = t("#success-page"),
        dt = (new Date).getTime(),
        ct = null,
        st = TM.common.parseUrlParam(),
        ut = t(".toast_tip"),
        lt = t(window),
        _t = !1,
        ft = !1,
        pt = !1,
        mt = 0,
        vt = 0,
        Tt = !1,
        gt = t("#confirm-order-container"),
        Nt = {
            NONE: "none",
            NOT_VERIFIED: "not-verified",
            VERIFIED_OK: "verified-ok",
            NEED_CODE: "need-code",
            FORBIDDEN: "forbidden",
            UNCLEAR: "unclear"
        },
        ht = window.TM.ENV.isInToutiao ? Nt.NOT_VERIFIED: Nt.NONE,
        yt = !1,
        Ot = {
            DISPLAY: "product_first_sight_5",
            ORDER_SUCCESSED: "product_order_successed_5",
            CLICK_ORDER_ONLINE_BUTTON: "product_order_online_5",
            CLICK_ORDER_RIGHT_NOW_BUTTON: "product_order_right_now_5",
            CLICK_CONSULT_ON_PHONE_BUTTON: "product_consult_on_phone_5",
            CLICK_BACK_TO_FXG_LINK: "product_click_back_to_fxg_link_5"
        },
        Et = {
            ORDER_RIGHT_NOW_BUTTON_CLICK: 1,
            ORDER_ONLINE_BUTTON_CLICK: 2,
            CONSULT_ON_PHONE_BUTTON_CLICK: 4
        },
        Ct = 0,
        It = !1,
        bt = {
            type: null,
            status: null,
            updateTime: null
        };
        e(),
        et.on("click", ".btn-submit",
        function(e) {
            e.preventDefault();
            var t = c();
            t && (mt ? l().done(function() {
                _(t)
            }) : _(t))
        }).on("click", ".combo-num-min",
        function() {
            var e = et.find('[name="combo_num"]'),
            t = parseInt(e.val());
            isNaN(t) || 2 > t ? t = 1 : t--,
            e.val(t).change()
        }).on("click", ".combo-num-max",
        function() {
            var e = et.find('[name="combo_num"]'),
            t = parseInt(e.val());
            isNaN(t) ? t = 1 : t++,
            e.val(t).change()
        }).on("click", ".getCodeBtn",
        function() {
            if (!Tt) {
                var e = et.find('[name="post_tel"]').val();
                N(e, "请首先填写手机号码，再发送验证码") || E(e, "请填写正确的手机号码，再发送验证码") || r(e)
            }
        }).on("change", "[name=combo_num]", m).on("change", "[name=province]", v).on("change", "[name=city]", T).on("blur", "[name=post_tel]", o),
        rt.on("click", "a.checkout-order",
        function() {
            location.replace("/order/list")
        }).on("click", "a.return",
        function() {
            location.replace("/channel/list?come_from=2&id=" + Q)
        })
    })
});
