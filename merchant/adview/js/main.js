var LSM = LSM || {};
LSM.productList = function() {
    this.productSelect = function(e) {
        e.preventDefault();
        var t = $(e.currentTarget);
        if (!t.hasClass("success")) {
            t.parent().siblings("li").find("a").removeClass("success"), t.addClass("success");
            var o = t.attr("data-id");
            this.setHideId(t, o), this.calculateTotal(t)
        }
    }, this.plusNum = function(e) {
        e.preventDefault();
        var t = $(e.currentTarget),
            o = t.parent().find(".num");
        o.html(Number(o.html()) + 1), this.setHideNum(t, o.html()), this.calculateTotal(t)
    }, this.minusNum = function(e) {
        e.preventDefault();
        var t = $(e.currentTarget),
            o = t.parent().find(".num");
        Number(o.html()) > 1 && o.html(Number(o.html()) - 1), this.setHideNum(t, o.html()), this.calculateTotal(t)
    }, this.calculateTotal = function(e) {
        var t = e.parents(".content"),
            o = t.find(".product-list .success"),
            i = t.find(".number-change .num"),
            n = t.find(".number-change .sum");
        o.length && n.html("商品总价为：<i>￥" + Number(o.attr("data-price")) * Number(i.html()) + "</i>")
    }, this.setHideNum = function(e, t) {
        var o = e.parents(".content").find(".hide_num");
        o.val(t)
    }, this.setHideId = function(e, t) {
        var o = e.parents(".content").find(".hide_id");
        o.val(t)
    }, this.productForm = function(e) {
        var t = $(e.currentTarget),
            o = t.find(".hide_id"),
            i = t.find(".hide_num");
        "" != o.val() && "" != i.val() || e.preventDefault()
    }, $(document).on("click", ".product-list a", $.proxy(this.productSelect, this)), $(document).on("click", ".number-change .plus", $.proxy(this.plusNum, this)), $(document).on("click", ".number-change .minus", $.proxy(this.minusNum, this)), $(document).on("submit", ".product-form", $.proxy(this.productForm, this))
}, LSM.paymentSelect = function() {
    var e = $(".payment-select"),
        t = $("#J_bank_code"),
        o = $("#J_pay_type");
    this.setPayment = function(i) {
        var n = $(i.currentTarget);
        e.find("li").removeClass("active"), n.addClass("active"), t.val(n.attr("data-code")), o.val(n.attr("data-type"))
    }, e.find("li").on("click", $.proxy(this.setPayment, this))
}, LSM.orderTable = function() {
    this.cancelOrder = function(e) {
        e.preventDefault();
        var t = $(e.currentTarget),
            o = t.attr("data-oid");
        confirm("您确认要取消该订单？取消后不可恢复") && $.ajax({
            type: "POST",
            url: "https://my.luosimao.com/shop/cancel_order",
            data: {
                order_id: o
            },
            success: function(e) {
                0 == e.error && window.location.reload()
            }
        })
    }, $(document).on("click", ".cancel-order", $.proxy(this.cancelOrder, this))
}, Array.prototype.removeByValue = function(e) {
    for (var t = 0; t < this.length; t++) if (this[t] == e) {
        this.splice(t, 1);
        break
    }
}, LSM.contactManage = function() {
    this.contactGroup = $("#J_contact_group"), this.contactAddress = $("#J_contact_address"), this.groupCookie = "LUOCONTACT", this.groupCookieInit = function() {
        if ($.cookie(this.groupCookie)) {
            var e = $.cookie(this.groupCookie);
            this.groupCheckInit(e)
        } else {
            var t = [];
            $.cookie(this.groupCookie, t, {
                expires: 1,
                path: "/"
            })
        }
    }, this.groupCheckInit = function(e) {
        if (void 0 != typeof e) {
            e = JSON.parse("[" + e + "]");
            for (var t = 0; t < e.length; t++) this.contactGroup.find("[data-gid=" + e[t] + "]").attr("checked", !0)
        }
    }, this.addCookie = function(e) {
        if (e) {
            var t;
            t = $.cookie(this.groupCookie) ? JSON.parse("[" + $.cookie(this.groupCookie) + "]") : [], t.push(e), $.cookie(this.groupCookie, t, {
                expires: 1,
                path: "/"
            })
        }
    }, this.removeCookie = function(e) {
        if (e && $.cookie(this.groupCookie)) {
            var t = JSON.parse("[" + $.cookie(this.groupCookie) + "]");
            t.removeByValue(e), $.cookie(this.groupCookie, t, {
                expires: 1,
                path: "/"
            })
        }
    }, this.switchCookie = function(e) {
        var t = $(e.currentTarget),
            o = t.attr("data-gid");
        t[0].checked ? this.addCookie(o) : this.removeCookie(o)
    }, this.groupMerger = function(e) {
        e.preventDefault();
        var t = JSON.parse("[" + $.cookie(this.groupCookie) + "]").join("|");
        t ? ($.removeCookie(this.groupCookie), window.location.href = "https://my.luosimao.com/contact/group_info/add?group_id=" + t) : alert("请先选中分组")
    }, this.groupSendMessage = function(e) {
        e.preventDefault();
        var t = JSON.parse("[" + $.cookie(this.groupCookie) + "]").join("|");
        t ? ($.removeCookie(this.groupCookie), window.location.href = "https://sms-my.luosimao.com/send/batch?group_id=" + t) : alert("请先选中分组")
    }, this.groupSendMail = function(e) {
        e.preventDefault();
        var t = JSON.parse("[" + $.cookie(this.groupCookie) + "]").join("|");
        t && ($.removeCookie(this.groupCookie), window.location.href = "https://mail-my.luosimao.com/send?group_id=" + t)
    }, this.groupDelete = function(e) {
        e.preventDefault();
        var t = $(e.currentTarget),
            o = t.attr("data-id");
        if (o) {
            var i = this;
            confirm("确认要删除该分组及分组下的联系人么？此操作不可恢复") && $.post("https://my.luosimao.com/contact/del_group", {
                group_id: o
            }, function(e) {
                0 == e.error ? (i.removeCookie(o), window.location.reload()) : alert(e.msg)
            })
        }
    }, this.addressDelete = function(e) {
        e.preventDefault();
        var t = $(e.currentTarget),
            o = t.attr("data-id");
        o && confirm("确认要删除该联系人吗？此操作不可恢复") && $.post("https://my.luosimao.com/contact/del_address", {
            address_id: o
        }, function(e) {
            0 == e.error ? window.location.reload() : alert(e.msg)
        })
    }, this.groupCookieInit(), this.contactGroup.on("click", ".check_group", $.proxy(this.switchCookie, this)), $(document).on("click", ".del_group", $.proxy(this.groupDelete, this)), this.contactGroup.on("click", ".merger_group", $.proxy(this.groupMerger, this)), this.contactGroup.on("click", ".send_group_sms", $.proxy(this.groupSendMessage, this)), this.contactGroup.on("click", ".send_group_mail", $.proxy(this.groupSendMail, this)), this.contactAddress.on("click", ".del_address", $.proxy(this.addressDelete, this))
}, LSM.dashCharts = function(e, t) {
    if (e || t) {
        var o = this;
        this.sliceDate = function(e, t) {
            if (!e || !t) return !1;
            for (var o = [], i = 0; i < t.length; i++)"x" == e && o.push(t[i].x), "y" == e && o.push(Number(t[i].y));
            return o
        };
        var i = echarts.init(document.getElementById("chart-main")),
            n = {
                legend: {
                    top: 20,
                    data: ["短信发送", "邮件发送"]
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: !0
                },
                lineStyle: {
                    normal: {
                        type: "solid"
                    }
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        lineStyle: {
                            color: "#CCC"
                        }
                    },
                    textStyle: {
                        fontSize: 12
                    }
                },
                xAxis: {
                    type: "category",
                    data: o.sliceDate("x", e),
                    axisLine: {
                        lineStyle: {
                            color: "#F0F0F0"
                        }
                    },
                    axisTick: {
                        lineStyle: {
                            color: "#F0F0F0"
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#E9E9E9"
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#999"
                        }
                    }
                },
                yAxis: {
                    axisLine: {
                        lineStyle: {
                            color: "#F0F0F0"
                        }
                    },
                    axisTick: {
                        lineStyle: {
                            color: "#F0F0F0"
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#E9E9E9"
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#999"
                        }
                    }
                },
                series: [{
                    name: "短信发送",
                    type: "line",
                    areaStyle: {
                        normal: {
                            color: "#f4faf7"
                        }
                    },
                    data: o.sliceDate("y", e),
                    lineStyle: {
                        normal: {
                            color: "#319f5d",
                            width: 2
                        }
                    },
                    smooth: !0
                }, {
                    name: "邮件发送",
                    type: "line",
                    areaStyle: {
                        normal: {
                            color: "#e2ecee"
                        }
                    },
                    data: o.sliceDate("y", t),
                    lineStyle: {
                        normal: {
                            color: "#4e8dae"
                        }
                    },
                    smooth: !0
                }]
            };
        i.setOption(n)
    }
}, LSM.invoiceForm = function() {
    var e = $("#invoiceSubmitForm");
    if (!e.length) return 0;
    var t = $("#panel-1"),
        o = $("#invoiceOrderTotal"),
        i = $("#invoiceSubmitButton");
    this.calculateSelected = function() {
        for (var e = t.find('input[type="checkbox"]:checked'), o = 0, i = 0, n = 0; n < e.length; n++) i = Number(e.eq(n).attr("data-price")), o += i;
        this.setPrice(o)
    }, this.setPrice = function(e) {
        e = e || 0, e = e.toFixed(2), o.html("￥" + e), this.checkInvoice(e)
    }, this.invoiceFormInit = function() {
        this.calculateSelected()
    }, this.checkInvoice = function(e) {
        e > 500 ? i.removeAttr("disabled") : i.attr("disabled", !0)
    }, this.invoiceFormInit(), t.on("click", 'input[type="checkbox"]', $.proxy(this.calculateSelected, this));
    var n = $("#invoiceConfirm"),
        r = $("#submitInvoice"),
        a = $("#closeInvoice"),
        c = $("#tax-type");
    i.on("click", function(t) {
        t.preventDefault();
        var o = 1,
            i = e.find("[data-require]"),
            r = e.find(".check-error");
        if (0 == c.val()) {
            for (var a = 0; a < i.length; a++) 0 == $.trim(i.eq(a).val()).length && (o *= 0);
            0 == o ? r.show() : (r.hide(), n.find(".company-name").html(e.find(".company-name").val()), n.find(".company-address").html(e.find(".company-address").val()), n.find(".company-info").html(e.find(".company-info").val()), n.find(".company-phone").html(e.find(".company-phone").val()), n.find(".company-word").html(e.find(".company-word").val()), n.find(".company-tax-type").html("普通发票"), n.foundation("reveal", "open"))
        }
        if (1 == c.val() && is_tax_z) {
            for (var l = 0; l < i.length; l++)"company-name" != i.eq(l).attr("class") && 0 == $.trim(i.eq(l).val()).length && (o *= 0);
            0 == o ? r.show() : (r.hide(), n.find(".company-name").html(e.find(".company-tax-name").html()), n.find(".company-address").html(e.find(".company-address").val()), n.find(".company-info").html(e.find(".company-info").val()), n.find(".company-phone").html(e.find(".company-phone").val()), n.find(".company-word").html(e.find(".company-word").val()), n.find(".company-tax-type").html("增值税专用发票"), n.foundation("reveal", "open"))
        }
    }), r.on("click", function() {
        n.foundation("reveal", "close"), e.submit()
    }), a.on("click", function() {
        n.foundation("reveal", "close")
    })
}, LSM.taxForm = function() {
    var e = $("#tax-full-form");
    if (!e.length) return 0;
    var t = $("#tax-full-submit"),
        o = e.find("[data-require]"),
        i = e.find(".tax-error");
    t.on("click", function(t) {
        t.preventDefault(), i.hide();
        for (var n = 1, r = 0; r < o.length; r++) 0 == $.trim(o.eq(r).val()).length && (n *= 0);
        0 == n ? i.show() : e.submit()
    })
}, LSM.topMenu = function() {
    var e = $("#drop-header-member");
    if (!e.length) return 0;
    var t = e.find(".username"),
        o = e.find(".email"),
        i = e.find(".phone"),
        n = e.find(".sms-deposit"),
        r = e.find(".voice-deposit"),
        a = e.find(".email-deposit");
    $.ajax({
        type: "GET",
        url: "https://my.luosimao.com/api/account_info",
        dataType: "jsonp",
        jsonp: "cb",
        success: function(e) {
            var c = e.res;
            t.html(c.username), o.html(c.email), i.html(c.mobile), n.html(c.sms_deposit), r.html(c.voice_deposit), a.html(c.mail_deposit)
        }
    })
}, $(document).ready(function() {
    $(document).foundation(), LSM.productList(), LSM.paymentSelect(), LSM.orderTable(), LSM.contactManage(), LSM.invoiceForm(), LSM.taxForm(), LSM.topMenu(), "undefined" != typeof send_info && "undefined" != typeof mail_info && LSM.dashCharts(send_info, mail_info), function() {
        var e = $(".footable");
        e.length && e.footable()
    }(), function() {
        var e = $(".fancy-select");
        e.length && e.fancySelect()
    }(), function() {
        var e = $("#upload_contact_file");
        e.length && e.on("change", function() {
            $("#upload_file_form").submit()
        })
    }(), function() {
        function e(e, t) {
            var o = $("<img>");
            o.attr("src", t), e.html(""), e.append(o)
        }
        function t(e, t) {
            e.val(t)
        }
        var o = $("#fileupload-trc");
        if (!o.length) return 0;
        var i = $("#fileupload-gtc"),
            n = $("#trc-preview"),
            r = o.parent().find(".fa"),
            a = $("#trc-value"),
            c = $("#trc-error"),
            l = $("#gtc-preview"),
            s = i.parent().find(".fa"),
            u = $("#gtc-value"),
            d = $("#gtc-error");
        o.fileupload({
            url: "/shop/tax_upload/trc/",
            dataType: "json",
            acceptFileTypes: /(\.|\/)(jpe?g|png)$/i,
            maxFileSize: 5e6,
            start: function(e) {
                r.show(), c.html("")
            },
            done: function(o, i) {
                r.hide(), i.result.error == -10 && c.html("文件已存在,请重新上传"), i.result.error == -20 && c.html("上传失败,请刷新页面重试"), 0 == i.result.error && (e(n, i.result.res.img_url), t(a, i.result.res.img_id))
            }
        }).on("fileuploadprocessalways", function(e, t) {
            var o = t.index,
                i = t.files[o];
            c.html(i.error)
        }), i.fileupload({
            url: "/shop/tax_upload/gtc/",
            dataType: "json",
            acceptFileTypes: /(\.|\/)(jpe?g|png)$/i,
            maxFileSize: 5e6,
            start: function(e) {
                s.show(), d.html("")
            },
            done: function(o, i) {
                s.hide(), i.result.error == -10 && d.html("文件已存在,请重新上传"), i.result.error == -20 && d.html("上传失败,请刷新页面重试"), 0 == i.result.error && (e(l, i.result.res.img_url), t(u, i.result.res.img_id))
            }
        }).on("fileuploadprocessalways", function(e, t) {
            var o = t.index,
                i = t.files[o];
            d.html(i.error)
        })
    }(), function() {
        var e = $("#tax-select-tab");
        return 0 == e.length ? 0 : void e.on("toggled", function(e, t) {
            var o = t.attr("data-tax"),
                i = $("#tax-type");
            $(".check-error").hide(), i.val(o)
        })
    }(), function() {
        var e = $('[rel="tax-preview"]');
        e.length && e.fancybox({
            theme: "dark",
            animation: "fade",
            openEffect: "fade",
            closeEffect: "fade"
        })
    }()
});
