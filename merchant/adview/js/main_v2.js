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
}, LSM.dashCharts = function() {
    var e = this;
    this.sliceDate = function(e, t) {
        if (!e || !t) return !1;
        for (var o = [], i = 0; i < t.length; i++)"x" == e && o.push(t[i].x), "y" == e && o.push(Number(t[i].y));
        return o
    };
    var t = echarts.init(document.getElementById("dash_sms_chart"));
    t.setOption({
        title: {
            show: !1
        },
        legend: {
            show: !1
        },
        toolbox: {
            show: !1
        },
        grid: {
            left: "3%",
            right: "3%",
            bottom: "3%",
            top: 40,
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
            data: e.sliceDate("x", send_info),
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
            name: "发送量",
            nameTextStyle: {
                color: "#666"
            },
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
            data: e.sliceDate("y", send_info),
            lineStyle: {
                normal: {
                    color: "#319f5d",
                    width: 2
                }
            },
            smooth: !0
        }]
    });
    var o = echarts.init(document.getElementById("dash_mail_chart"));
    o.setOption({
        title: {
            show: !1
        },
        legend: {
            show: !1
        },
        toolbox: {
            show: !1
        },
        grid: {
            left: "3%",
            right: "3%",
            bottom: "3%",
            top: 35,
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
            data: e.sliceDate("x", mail_info),
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
            name: "发送量",
            nameTextStyle: {
                color: "#666"
            },
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
            name: "邮件发送",
            type: "line",
            areaStyle: {
                normal: {
                    color: "#f4faf7"
                }
            },
            data: e.sliceDate("y", mail_info),
            lineStyle: {
                normal: {
                    color: "#319f5d",
                    width: 2
                }
            },
            smooth: !0
        }]
    });
    var i = echarts.init(document.getElementById("dash_voice_chart"));
    i.setOption({
        title: {
            show: !1
        },
        legend: {
            show: !1
        },
        toolbox: {
            show: !1
        },
        grid: {
            left: "3%",
            right: "3%",
            bottom: "3%",
            top: 35,
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
            data: e.sliceDate("x", voice_info),
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
            name: "发送量",
            nameTextStyle: {
                color: "#666"
            },
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
            name: "语音发送",
            type: "line",
            areaStyle: {
                normal: {
                    color: "#f4faf7"
                }
            },
            data: e.sliceDate("y", voice_info),
            lineStyle: {
                normal: {
                    color: "#319f5d",
                    width: 2
                }
            },
            smooth: !0
        }]
    });
    var n = echarts.init(document.getElementById("dash_captcha_chart"));
    if (0 == captcha_info.length) n.setOption({
        title: {
            text: "您尚未创建任何网站",
            textStyle: {
                color: "#666",
                fontSize: 14
            },
            top: 7,
            right: 13
        },
        legend: {
            show: !1
        },
        toolbox: {
            show: !1
        },
        grid: {
            left: "3%",
            right: "3%",
            bottom: "3%",
            top: 35,
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
            data: [],
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
            nameTextStyle: {
                color: "#666"
            },
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
        series: []
    });
    else {
        for (var a = [], r = ["#f4faf7", "#eff3f7", "#edf7fe", "#f8dedc"], l = ["#319f5d", "#34495e", "#3498db", "#e74c3c"], c = 0; c < captcha_info.length; c++) a.push({
            name: captcha_info[c].label,
            type: "line",
            areaStyle: {
                normal: {
                    color: r[c]
                }
            },
            data: e.sliceDate("y", captcha_info[c].data),
            lineStyle: {
                normal: {
                    color: l[c],
                    width: 2
                }
            },
            smooth: !0
        });
        for (var s = [], d = 0; d < captcha_info.length; d++) s.push(captcha_info[d].label);
        n.setOption({
            title: {
                show: !1
            },
            legend: {
                data: s,
                top: 7
            },
            toolbox: {
                show: !1
            },
            grid: {
                left: "3%",
                right: "3%",
                bottom: "3%",
                top: 35,
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
                data: e.sliceDate("x", captcha_info[0].data),
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
                name: "验证次数",
                nameTextStyle: {
                    color: "#666"
                },
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
            series: a
        })
    }
    $(window).on("resize", function() {
        t.resize(), o.resize(), i.resize(), n.resize()
    })
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
        a = $("#submitInvoice"),
        r = $("#closeInvoice"),
        l = $("#tax-type");
    i.on("click", function(t) {
        t.preventDefault();
        var o = 1,
            i = e.find("[data-require]"),
            a = e.find(".check-error");
        if (0 == l.val()) {
            for (var r = 0; r < i.length; r++) 0 == $.trim(i.eq(r).val()).length && (o *= 0);
            0 == o ? a.show() : (a.hide(), n.find(".company-name").html(e.find(".company-name").val()), n.find(".company-address").html(e.find(".company-address").val()), n.find(".company-info").html(e.find(".company-info").val()), n.find(".company-phone").html(e.find(".company-phone").val()), n.find(".company-word").html(e.find(".company-word").val()), n.find(".company-tax-type").html("普通发票"), n.foundation("reveal", "open"))
        }
        if (1 == l.val() && is_tax_z) {
            for (var c = 0; c < i.length; c++)"company-name" != i.eq(c).attr("class") && 0 == $.trim(i.eq(c).val()).length && (o *= 0);
            0 == o ? a.show() : (a.hide(), n.find(".company-name").html(e.find(".company-tax-name").html()), n.find(".company-address").html(e.find(".company-address").val()), n.find(".company-info").html(e.find(".company-info").val()), n.find(".company-phone").html(e.find(".company-phone").val()), n.find(".company-word").html(e.find(".company-word").val()), n.find(".company-tax-type").html("增值税专用发票"), n.foundation("reveal", "open"))
        }
    }), a.on("click", function() {
        n.foundation("reveal", "close"), e.submit()
    }), r.on("click", function() {
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
        for (var n = 1, a = 0; a < o.length; a++) 0 == $.trim(o.eq(a).val()).length && (n *= 0);
        0 == n ? i.show() : e.submit()
    })
}, LSM.topMenu = function() {
    var e = $("#drop-header-member");
    if (!e.length) return 0;
    var t = e.find(".username"),
        o = e.find(".email"),
        i = e.find(".phone"),
        n = e.find(".sms-deposit"),
        a = e.find(".voice-deposit"),
        r = e.find(".email-deposit");
    $.ajax({
        type: "GET",
        url: "https://my.luosimao.com/api/account_info",
        dataType: "jsonp",
        jsonp: "cb",
        success: function(e) {
            var l = e.res;
            t.html(l.username), o.html(l.email), i.html(l.mobile), n.html(l.sms_deposit), a.html(l.voice_deposit), r.html(l.mail_deposit)
        }
    })
}, $(document).ready(function() {
    $(document).foundation(), LSM.productList(), LSM.paymentSelect(), LSM.orderTable(), LSM.contactManage(), LSM.invoiceForm(), LSM.taxForm(), LSM.topMenu(), "undefined" != typeof send_info && "undefined" != typeof mail_info && LSM.dashCharts(), function() {
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
            a = o.parent().find(".fa"),
            r = $("#trc-value"),
            l = $("#trc-error"),
            c = $("#gtc-preview"),
            s = i.parent().find(".fa"),
            d = $("#gtc-value"),
            h = $("#gtc-error");
        o.fileupload({
            url: "/shop/tax_upload/trc/",
            dataType: "json",
            acceptFileTypes: /(\.|\/)(jpe?g|png)$/i,
            maxFileSize: 5e6,
            start: function(e) {
                a.show(), l.html("")
            },
            done: function(o, i) {
                a.hide(), i.result.error == -10 && l.html("文件已存在,请重新上传"), i.result.error == -20 && l.html("上传失败,请刷新页面重试"), 0 == i.result.error && (e(n, i.result.res.img_url), t(r, i.result.res.img_id))
            }
        }).on("fileuploadprocessalways", function(e, t) {
            var o = t.index,
                i = t.files[o];
            l.html(i.error)
        }), i.fileupload({
            url: "/shop/tax_upload/gtc/",
            dataType: "json",
            acceptFileTypes: /(\.|\/)(jpe?g|png)$/i,
            maxFileSize: 5e6,
            start: function(e) {
                s.show(), h.html("")
            },
            done: function(o, i) {
                s.hide(), i.result.error == -10 && h.html("文件已存在,请重新上传"), i.result.error == -20 && h.html("上传失败,请刷新页面重试"), 0 == i.result.error && (e(c, i.result.res.img_url), t(d, i.result.res.img_id))
            }
        }).on("fileuploadprocessalways", function(e, t) {
            var o = t.index,
                i = t.files[o];
            h.html(i.error)
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
