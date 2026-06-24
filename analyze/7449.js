"use strict";
(self["webpackChunkneul_project_ticket"] = self["webpackChunkneul_project_ticket"] || []).push([[7449], {
    48038: function(t, e, i) {
        i.d(e, {
            $K: function() {
                return u
            },
            BK: function() {
                return l
            },
            CE: function() {
                return d
            },
            FN: function() {
                return c
            },
            Pd: function() {
                return r
            },
            k2: function() {
                return s
            },
            qn: function() {
                return n
            },
            tk: function() {
                return o
            },
            z: function() {
                return a
            }
        });
        var n = {
            IDCARD: 0,
            PASSPORT: 1,
            HK_MR_PERMIT: 2,
            TW_PERMIT: 3,
            DEFAULT: -1
        }
          , s = ["\u8eab\u4efd\u8bc1", "\u62a4\u7167", "\u6e2f\u6fb3\u901a\u884c...", "\u53f0\u6e7e\u5c45\u6c11..."]
          , r = ["\u8eab\u4efd\u8bc1", "\u62a4\u7167", "\u6e2f\u6fb3\u5c45\u6c11\u6765\u5f80\u5185\u5730\u901a\u884c\u8bc1", "\u53f0\u6e7e\u5c45\u6c11\u6765\u5f80\u5927\u9646\u901a\u884c\u8bc1"]
          , o = /^[\u4e00-\u9fa5_\xb7 a-zA-Z]{1,30}$/
          , a = /^1[\d]{10}$/
          , c = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
          , l = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/
          , d = /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/
          , u = /^[a-zA-Z0-9]+$/
    },
    5259: function(t, e) {
        var i = function() {
            var t = document.body.scrollTop || document.documentElement.scrollTop;
            document.body.style.cssText += "position: fixed; width: 100%; top: -".concat(t, "px;")
        }
          , n = function() {
            var t = document.body
              , e = -parseInt(t.style.top);
            document.body.scrollTop = e,
            document.documentElement.scrollTop = e,
            t.style.position = "",
            t.style.top = ""
        }
          , s = {
            afterOpen: function() {
                i()
            },
            beforeClose: function() {
                n()
            },
            freeze: i,
            release: n
        };
        e.Z = s
    },
    82096: function(t, e, i) {
        var n = i(45987)
          , s = i(3486)
          , r = i.n(s)
          , o = i(70983)
          , a = i.n(o)
          , c = i(4115)
          , l = i.n(c)
          , d = i(10271)
          , u = i.n(d)
          , p = i(54717)
          , v = ["from"];
        function _(t, e) {
            var i = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(t);
                e && (n = n.filter((function(e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                }
                ))),
                i.push.apply(i, n)
            }
            return i
        }
        function f(t) {
            for (var e = 1; e < arguments.length; e++) {
                var i = null != arguments[e] ? arguments[e] : {};
                e % 2 ? _(Object(i), !0).forEach((function(e) {
                    l()(t, e, i[e])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : _(Object(i)).forEach((function(e) {
                    Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
                }
                ))
            }
            return t
        }
        var h = !/iPad|iPhone|iPod/i.test(navigator.userAgent) && !/Android/i.test(navigator.userAgent)
          , m = location.protocol
          , b = function() {
            function t() {
                r()(this, t)
            }
            return a()(t, [{
                key: "to",
                value: function(t) {
                    switch (t) {
                    case "souvenir":
                        for (var e = arguments.length, i = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
                            i[n - 1] = arguments[n];
                        return this.toSouvenir.apply(this, i)
                    }
                }
            }, {
                key: "toSouvenir",
                value: function(e) {
                    var i = e.ticketId
                      , n = e.orderId
                      , s = t.urlJoin(t.URL.SOURVENIR, {
                        order_id: n,
                        ticket_id: i
                    });
                    return u().exec("openWindow", {
                        url: s
                    })
                }
            }, {
                key: "toHome",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                      , i = h ? t.URL.HOME.PC : t.URL.HOME.MOBILE
                      , n = t.urlJoin(i, e);
                    return u().exec("openWindow", {
                        url: n
                    })
                }
            }, {
                key: "toOrderDetail",
                value: function(e) {
                    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                      , n = h ? t.URL.ORDER_DETAIL.PC : t.URL.ORDER_DETAIL.MOBILE
                      , s = t.urlJoin(n, f({
                        order_id: e
                    }, i));
                    return u().exec("openWindow", {
                        url: s
                    })
                }
            }, {
                key: "toSearch",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                      , i = e.from
                      , s = (0,
                    n.Z)(e, v)
                      , r = t.urlJoin(t.URL.SEARCH, f({
                        fromType: 1,
                        from: i,
                        isShowSearch: 1,
                        from_type: "ticket"
                    }, s));
                    return u().exec("openWindow", {
                        url: "".concat(r, "#noReffer=true")
                    })
                }
            }, {
                key: "toExchange",
                value: function(e, i) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
                      , s = t.urlJoin(t.URL.EXCHANGE, f({
                        order_id: i,
                        project_id: e
                    }, n));
                    return u().exec("openWindow", {
                        url: s
                    })
                }
            }, {
                key: "toOrderCenter",
                value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                        newWebview: !0
                    }
                      , e = t.newWebview;
                    u().selector([{
                        url: "bilibili://mall/order/list",
                        newWebview: e
                    }, u().UA.isBiliApp], [{
                        url: "https://mall.bilibili.com/orderlist.html",
                        newWebview: e
                    }, !0]).then((function(t) {
                        u().exec("openWindow", {
                            url: t.url,
                            newWebview: t.newWebview
                        })
                    }
                    ))
                }
            }], [{
                key: "urlJoin",
                value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""
                      , e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return 0 === Object.keys(e).length ? t : t.indexOf("?") > -1 ? "".concat(t, "&").concat(p["default"].obj2Query(e)) : "".concat(t, "?").concat(p["default"].obj2Query(e))
                }
            }]),
            t
        }();
        l()(b, "URL", {
            SOURVENIR: "".concat(m, "//mall.bilibili.com/xw/ticket/index.html?noTitleBar=1"),
            EXCHANGE: (0,
            p["default"])("exchange", "noTitleBar=1"),
            HOME: {
                MOBILE: (0,
                p["default"])("home", "noTitleBar=1"),
                PC: "".concat(m, "//show.bilibili.com/platform/home.html")
            },
            ORDER_DETAIL: {
                MOBILE: (0,
                p["default"])("orderDetail", "noTitleBar=1"),
                PC: "https://show.bilibili.com/platform/orderDetail.html"
            },
            SEARCH: "".concat(m, "//mall.bilibili.com/neul-next/index.html?page=flow_searchResult&noTitleBar=1")
        }),
        e.ZP = new b
    },
    19392: function(t, e, i) {
        i.d(e, {
            Z: function() {
                return l
            }
        });
        var n = function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                staticClass: "cover",
                on: {
                    touchmove: function(t) {
                        t.preventDefault()
                    },
                    click: function(t) {
                        t.stopPropagation()
                    }
                }
            }, [e("div", {
                staticClass: "alert-body"
            }, [e("div", {
                staticClass: "alert-img"
            }), e("p", {
                staticClass: "alert-info"
            }, [t._v("\n            " + t._s(t.alertInfo) + "\n            "), e("span", {
                staticClass: "alert-subinfo"
            }, [t._v("\n                " + t._s(t.subinfo) + "\n            ")])]), t.singleConfirm ? e("div", {
                staticClass: "alert-single-action"
            }, [e("div", {
                staticClass: "alert-single-ok",
                on: {
                    click: t.ok
                }
            }, [t._v(t._s(t.confirmText))])]) : e("div", {
                staticClass: "alert-action"
            }, [e("div", {
                staticClass: "alert-ok",
                on: {
                    click: t.ok
                }
            }, [t._v(t._s(t.confirmText))]), e("div", {
                staticClass: "alert-cancel",
                on: {
                    click: t.cancel
                }
            }, [t._v(t._s(t.cancelText))])])])])
        }
          , s = []
          , r = {
            props: {
                alertInfo: {
                    type: String
                },
                cancelText: {
                    type: String
                },
                confirmText: {
                    type: String
                },
                singleConfirm: {
                    type: Boolean,
                    default: !1
                },
                subinfo: {
                    type: String
                }
            },
            methods: {
                cancel: function() {
                    this.$emit("on-cancel")
                },
                ok: function() {
                    this.$emit("on-ok")
                }
            }
        }
          , o = r
          , a = i(51900)
          , c = (0,
        a.Z)(o, n, s, !1, null, "aba9581e", null)
          , l = c.exports
    },
    10197: function(t, e, i) {
        i.d(e, {
            Z: function() {
                return l
            }
        });
        var n = function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                staticClass: "bulletin"
            }, [e("div", {
                staticClass: "bulletin-title",
                class: [{
                    "no-more": !t.hasMore,
                    "double-line": t.doubleLine
                }, "icon-".concat(t.type)],
                on: {
                    click: function(e) {
                        return t.$emit("click")
                    }
                }
            }, [e("div", [t._t("default")], 2)])])
        }
          , s = []
          , r = {
            name: "BTipBar",
            props: {
                hasMore: {
                    type: Boolean,
                    default: !1
                },
                doubleLine: {
                    type: Boolean,
                    default: !1
                },
                type: {
                    type: String,
                    default: "notice",
                    validator: function(t) {
                        return ["notice", "warning"].includes(t)
                    }
                }
            }
        }
          , o = r
          , a = i(51900)
          , c = (0,
        a.Z)(o, n, s, !1, null, "5dc738bf", null)
          , l = c.exports
    },
    28232: function(t, e, i) {
        i.r(e),
        i.d(e, {
            default: function() {
                return si
            }
        });
        var n = function() {
            var t = this
              , e = t._self._c;
            return t.isRequestLimit || t.initLoading || t.showErrorPage ? e("ErrorPage", {
                attrs: {
                    title: "\u786e\u8ba4\u8ba2\u5355",
                    delay: 600,
                    isLoading: t.initLoading,
                    errorType: t.isRequestLimit ? "limit" : "default",
                    isHeaderShow: t.isHeaderShow
                }
            }) : e("div", {
                staticClass: "confirm-order"
            }, [t.isHeaderShow ? e("b-header", {
                attrs: {
                    title: "\u786e\u8ba4\u8ba2\u5355",
                    userInfo: t.headerLogin
                }
            }) : t._e(), t.enter_notice ? e("epidemicNotice", {
                attrs: {
                    text: t.enter_notice
                },
                on: {
                    show: t.clickNotice
                }
            }) : t._e(), e("order-state", {
                attrs: {
                    detail: t.detail
                }
            }), 3 === t.detail.deliver_type ? e("div", {
                staticClass: "order-address-box"
            }, [t.defaultAddress ? e("div", {
                staticClass: "no-default-address",
                on: {
                    click: t.addAddress
                }
            }, [e("div", {
                staticClass: "address-content"
            }, [e("span", {
                staticClass: "address-left"
            }, [t._v("\u6536\u8d27\u5730\u5740")]), e("span", {
                staticClass: "address-right"
            }, [t._v("\u6dfb\u52a0\u6536\u8d27\u5730\u5740")])]), e("i", {
                staticClass: "icon-next"
            })]) : e("div", {
                staticClass: "default-address",
                on: {
                    click: t.checkAddress
                }
            }, [e("i", {
                staticClass: "icon-address"
            }), t.defaultAddressInfo ? e("div", {
                staticClass: "address-info-container"
            }, [e("div", {
                staticClass: "name-tel"
            }, [t.defaultAddressInfo.name ? e("span", {
                staticClass: "name-buyer"
            }, [t._v(t._s(t.defaultAddressInfo.name))]) : t._e(), t.defaultAddressInfo.phone ? e("span", {
                staticClass: "tel"
            }, [t._v(t._s(t.defaultAddressInfo.phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")))]) : t._e()]), e("div", {
                staticClass: "detail-address"
            }, [e("span", [t._v(t._s(t.defaultAddressInfo.prov) + " " + t._s(t.defaultAddressInfo.city) + " " + t._s(t.defaultAddressInfo.area) + "\n                        " + t._s(t.defaultAddressInfo.addr))])])]) : t._e(), e("i", {
                staticClass: "icon-next"
            })]), e("div", {
                staticClass: "address-bottom"
            })]) : t._e(), 1 === t.detail.ticket_type && 2 === t.detail.deliver_type ? e("div", {
                staticClass: "exchange-ticket"
            }, [t._v("\u51ed\u7535\u5b50\u7968\u5230\u73b0\u573a\u5151\u6362\u7eb8\u8d28\u7968")]) : t._e(), e("buyerInfo", {
                ref: "newBuyerInfo",
                attrs: {
                    userInfoList: t.userinfodata.list,
                    selectBuyers: t.selectBuyers,
                    checkBuyInfoCondition: t.buyer_info,
                    canSelectBuyerCount: t.canSelectBuyerCount,
                    needContact: t.orderObj.need_contact,
                    idBind: t.orderObj.id_bind,
                    count: t.orderObj.count,
                    tipBuyer: t.tipBuyer,
                    contactInfo: t.orderObj.contactInfo,
                    contactNoticeText: t.orderObj.contactNoticeText,
                    restrictBuyerInfo: t.restrictBuyerInfo
                },
                on: {
                    pickuserinfo: t.newPickUserInfo,
                    onAddBuyer: t.addBuyerInfo,
                    onEditBuyer: t.editBuyerInfo,
                    onCheckUserInfo: t.checkUserInfo,
                    onSeeTerm: t.clickSeeTerm
                }
            }), 3 === t.detail.deliver_type ? e("div", {
                staticClass: "express-box"
            }, [e("div", {
                staticClass: "express-fee"
            }, [e("span", {
                staticClass: "express-left"
            }, [t._v("\u914d\u9001")]), e("span", {
                staticClass: "express-right",
                class: {
                    red: t.detail.express_type > 1
                }
            }, [t._v(t._s(t.expressText) + "\n                "), 1 === t.detail.express_type ? e("span", {
                staticClass: "express-price"
            }, [e("BiliPrice", {
                attrs: {
                    price: t.detail.express_fee,
                    fontSize: 14,
                    small: !1,
                    bold: !1
                }
            })], 1) : t._e()])])]) : t._e(), t.detail.year_card && t.detail.year_card.can_use ? e("div", {
                staticClass: "yearly-card-box"
            }, [e("div", {
                staticClass: "box-content-container"
            }, [e("div", {
                staticClass: "box-main-info"
            }, [e("div", {
                staticClass: "title"
            }, [t._v("\u4f7f\u7528233\u5e74\u5361")]), e("div", {
                staticClass: "rights",
                on: {
                    click: t.handleShowRights
                }
            }, [t._v("\u5e74\u5361\u6743\u76ca\u8bf4\u660e")])]), e("div", {
                staticClass: "box-switch-container",
                class: [t.isYearCardOn ? "box-switch-on" : "box-switch-off"],
                on: {
                    click: t.clickYearCardSwitchHandler
                }
            }, [e("span", {
                staticClass: "box-switch",
                style: {
                    left: t.isYearCardOn ? "21px" : "1px"
                }
            })])])]) : t._e(), e("div", {
                staticClass: "discount-box"
            }, [e("div", {
                staticClass: "sum-price"
            }, [e("div", {
                staticClass: "sum-price-left"
            }, [e("div", {
                staticClass: "sum-price-content"
            }, [t._v("\u4f18\u60e0\u5238")])]), t.isFreePass ? e("div", {
                staticClass: "sum-price-info"
            }, [t._v("\u81ea\u7531\u884c\u514d\u5355")]) : !t.detail.couponList || 0 === t.detail.couponList.length && !t.isYearCardOn ? e("div", {
                staticClass: "sum-price-action",
                on: {
                    click: t.showDiscountsInfo
                }
            }, [e("div", {
                staticClass: "discounts"
            }, [t._v("\u6682\u65e0\u53ef\u7528\u4f18\u60e0\u5238")]), e("i", {
                staticClass: "icon-next"
            })]) : t.isYearCardOn ? e("div", {
                staticClass: "sum-price-info"
            }, [e("div", {
                staticClass: "conflict-tips"
            }, [t._v("\u4e0d\u53ef\u4e0e\u5e74\u5361\u53e0\u52a0\u4f7f\u7528")])]) : e("div", {
                staticClass: "sum-price-action",
                on: {
                    click: t.showDiscountsInfo
                }
            }, [t.discountStatus && t.detail.couponList.length > 0 ? [e("div", {
                staticClass: "selected-discounts"
            }, [t._v("\n                        \u5df2\u90091\u5f20\uff0c\u7701\n                        "), e("BiliPrice", {
                attrs: {
                    price: t.couponItem.discount,
                    fontSize: 14,
                    small: !1,
                    bold: !1
                }
            })], 1)] : e("div", {
                staticClass: "discounts"
            }, [t._v("\u8bf7\u9009\u62e9")]), e("i", {
                staticClass: "icon-next"
            })], 2)])]), e("div", {
                staticClass: "sum-price-box"
            }, [e("div", {
                staticClass: "sum-price"
            }, [e("div", {
                staticClass: "sum-price-left"
            }, [e("div", {
                staticClass: "sum-price-content"
            }, [t._v("\u5e94\u4ed8\u603b\u989d")])]), t.isFreePass ? e("div", {
                staticClass: "sum-price-info"
            }, [e("div", {
                staticClass: "price only-price"
            }, [e("BiliPrice", {
                attrs: {
                    price: t.pay_money,
                    fontSize: 14,
                    small: !1,
                    bold: !1
                }
            })], 1)]) : e("div", {
                staticClass: "sum-price-action",
                on: {
                    click: t.showSumPriceInfo
                }
            }, [e("div", {
                staticClass: "sum-price-info"
            }, [e("div", {
                staticClass: "price",
                class: {
                    "only-price": 3 !== t.detail.deliver_type || 3 === t.detail.express_type
                }
            }, [e("BiliPrice", {
                attrs: {
                    price: t.pay_money,
                    fontSize: 14,
                    small: !1,
                    bold: !1
                }
            })], 1), 3 === t.detail.deliver_type && 3 !== t.detail.express_type ? e("div", {
                staticClass: "price-tip"
            }, [t._v("\u542b\u8fd0\u8d39")]) : t._e()]), e("i", {
                staticClass: "icon-next"
            })])])]), e("div", {
                staticClass: "reserve-terms"
            }, [e("div", {
                staticClass: "check-icon",
                class: {
                    unchecked: t.uncheckedTerms
                },
                on: {
                    click: t.agreeTerms
                }
            }), t._v("\n        \u6211\u5df2\u9605\u8bfb\u5e76\u540c\u610f\n        "), e("span", {
                on: {
                    click: t.showOrderTerms
                }
            }, [t._v("\u8ba2\u7968\u670d\u52a1\u6761\u6b3e")]), t._v("\u3001\n        "), e("span", {
                on: {
                    click: t.showHygTerms
                }
            }, [t._v("\u4f1a\u5458\u8d2d\u670d\u52a1\u534f\u8bae")]), 5 === t.detail.order_type ? [t._v(" \u3001"), e("span", {
                on: {
                    click: t.showCfTerms
                }
            }, [t._v("\u4f17\u7b79\u670d\u52a1\u534f\u8bae")])] : t._e()], 2), t.isNewPay && t.pay_money > 0 ? e("div", {
                attrs: {
                    id: "payCashier"
                }
            }, [e("pay-cashier", {
                attrs: {
                    "channel-params": t.channelParams,
                    "pay-param": t.newPayParam
                },
                on: {
                    sendPayResult: t.getPayResult
                }
            })], 1) : t._e(), e("div", {
                staticClass: "order-bottom"
            }, [e("TipBar", {
                staticClass: "order-tips",
                attrs: {
                    type: "warning"
                }
            }, [t._v("\n            \u63d0\u4ea4\u8ba2\u5355\u6210\u529f\u624d\u4f1a\u9501\u7968\n        ")]), e("div", {
                staticClass: "order-button-area"
            }, [e("div", {
                staticClass: "pay-money"
            }, [t._v("\n                \u5408\u8ba1\n                "), e("BiliPrice", {
                attrs: {
                    price: t.pay_money,
                    fontSize: 16
                }
            })], 1), 0 !== t.pay_money ? e("BButton", {
                attrs: {
                    className: "test",
                    type: "primary",
                    buttonRole: !0
                },
                on: {
                    click: function(e) {
                        return t.createOrder(0, e)
                    }
                }
            }, [t._v("\n                \u63d0\u4ea4\u8ba2\u5355\n            ")]) : t._e(), 0 === t.pay_money ? e("BButton", {
                attrs: {
                    type: "primary",
                    buttonRole: !0
                },
                on: {
                    click: function(e) {
                        return t.createOrder(0, e)
                    }
                }
            }, [t._v("\n                \u786e\u8ba4\u63d0\u4ea4\n            ")]) : t._e()], 1)], 1), t.userInfoVisible ? e("user-info-dialog", {
                attrs: {
                    selectBuyers: t.selectBuyers,
                    userinfodata: t.userinfodata,
                    buyerinfo: t.buyer_info,
                    canSelectBuyerCount: t.canSelectBuyerCount,
                    restrictBuyerInfo: t.restrictBuyerInfo
                },
                on: {
                    refresh: t.updateBuyList,
                    close: t.checkUserInfo,
                    pickuserinfo: t.newPickUserInfo,
                    onAddBuyer: t.addBuyerInfo,
                    onEditBuyer: t.editBuyerInfo
                }
            }) : t._e(), e("discounts-dialog", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.discountsVisible,
                    expression: "discountsVisible"
                }],
                attrs: {
                    couponList: t.couponList,
                    couponCode: t.couponCode
                },
                on: {
                    close: function(e) {
                        t.discountsVisible = !1
                    },
                    pickCoupon: t.pickCoupon
                }
            }), e("sum-price-dialog", {
                attrs: {
                    sumpriceinfo: t.priceInfoVisible,
                    costdetail: t.detail,
                    couponItem: t.couponItem,
                    payMoney: t.pay_money,
                    isYearCardOn: t.isYearCardOn,
                    yearCardInfo: t.yearCardInfo
                },
                on: {
                    close: function(e) {
                        t.priceInfoVisible = !1
                    }
                }
            }), e("without-selected-dialog", {
                attrs: {
                    selectedStatus: t.selectedStatus
                },
                on: {
                    cancelDialog: function(e) {
                        t.selectedStatus = !1
                    },
                    cancelOrder: t.cancelOrder
                }
            }), e("order-terms-layer", {
                attrs: {
                    orderTermStatus: t.orderTermStatus
                },
                on: {
                    close: function(e) {
                        t.orderTermStatus = !1
                    }
                }
            }), e("hyg-terms-layer", {
                attrs: {
                    hygTermsStatus: t.hygTermsStatus
                },
                on: {
                    close: function(e) {
                        t.hygTermsStatus = !1
                    }
                }
            }), e("cf-terms-layer", {
                attrs: {
                    cfTermsStatus: t.cfTermsStatus
                },
                on: {
                    close: function(e) {
                        t.cfTermsStatus = !1
                    }
                }
            }), e("real-name-layer", {
                attrs: {
                    rnTermsStatus: t.rnTermsStatus,
                    text: t.noticeText,
                    title: t.noticeTitle,
                    showBtn: t.noticeShowBtn
                },
                on: {
                    close: t.closeNoticeModal
                }
            }), e("tickets-tip-dialog", {
                attrs: {
                    anyTicketStatus: t.anyTicketStatus,
                    detail: t.detail,
                    failSeats: t.failSeats
                },
                on: {
                    cancel: t.cancelPay,
                    continuePay: t.continuePay
                }
            }), t.priceChange ? e("price-change", {
                attrs: {
                    priceChangePayMoney: t.priceChangePayMoney
                },
                on: {
                    close: t.priceChangeRefresh,
                    priceChangePay: t.priceChangePay
                }
            }) : t._e(), t.someNomalTicketStatus ? e("some-nomal-ticket-dialog", {
                attrs: {
                    ticketNum: t.ticketNum
                },
                on: {
                    someNomalTicketCancel: t.someNomalTicketCancel,
                    someNomalTicketPay: t.someNomalTicketPay
                }
            }) : t._e(), t.projectOffLineStatus ? e("project-off-line-dialog", {
                attrs: {
                    dialogTipInfo: t.dialogTipInfo
                },
                on: {
                    allNomalTicketCancel: t.allNomalTicketCancel,
                    projectOffLineBtn: t.projectOffLineBtn
                }
            }) : t._e(), t.ptStatus ? e("pt-detail-dialog", {
                attrs: {
                    ptStatusNum: t.ptStatusNum
                },
                on: {
                    knowPtDetail: function(e) {
                        t.ptStatus = !1
                    },
                    goPtDetail: t.goPtDetail,
                    goPtPay: t.goPtPay
                }
            }) : t._e(), t.isRightsModalShow ? e("right-dialog", {
                on: {
                    closeModal: t.handleHideRights
                }
            }) : t._e()], 1)
        }
          , s = []
          , r = i(15785)
          , o = i(36697)
          , a = i.n(o)
          , c = i(4115)
          , l = i.n(c)
          , d = i(47969)
          , u = i.n(d)
          , p = i(85206)
          , v = i.n(p);
        u().use(v());
        var _ = i(85886)
          , f = i(61025)
          , h = i(41677)
          , m = i(98445)
          , b = function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                staticClass: "order-state-box"
            }, [e("div", {
                staticClass: "order-state-box-shadow"
            }, [e("div", {
                staticClass: "order-state",
                class: {
                    "order-shadow-state": t.orderShadowState
                }
            }, [e("div", {
                staticClass: "product-name"
            }, [t._v(t._s(t.detail.project_name))]), e("div", {
                staticClass: "stadium-info"
            }, [t._v(t._s(t.detail.venue_name))]), e("div", {
                staticClass: "session-ticket clearfix"
            }, [e("div", {
                staticClass: "session"
            }, [t._v(t._s(t.detail.screen_name))]), t.detail.ticket_info ? e("div", {
                staticClass: "ticket"
            }, [t._v(t._s(t.detail.ticket_info.name))]) : t._e()]), e("div", {
                staticClass: "price-num-type"
            }, [1 === t.detail.order_type || 5 === t.detail.order_type || 6 === t.detail.order_type ? e("div", {
                staticClass: "sum-price"
            }, [e("BiliPrice", {
                attrs: {
                    price: t.detail.item_total_money,
                    fontSize: 16,
                    color: "#ffffff"
                }
            })], 1) : t._e(), 2 === t.detail.order_type ? e("div", {
                staticClass: "sum-price"
            }, [e("span", {
                staticClass: "pt-price-tip"
            }, [t._v("\u62fc\u56e2\u4ef7:")]), e("BiliPrice", {
                attrs: {
                    price: t.detail.promotion.amount,
                    fontSize: 16,
                    color: "#ffffff"
                }
            })], 1) : t._e(), 1 === t.detail.order_type || 5 === t.detail.order_type || 6 === t.detail.order_type ? e("div", {
                staticClass: "ticket-people-box"
            }, [e("div", {
                staticClass: "ticket-num"
            }, [e("span", [t._v(t._s(t.detail.count))]), t._v(t._s(t.isPackage ? "\u5957" : "\u5f20") + "\n                        "), t.isPackage ? e("span", {
                staticClass: "package-count"
            }, [t._v("(\u5171" + t._s(t.detail.count * t.packageNum) + "\u5f20)")]) : t._e()])]) : t._e(), 2 === t.detail.order_type ? e("div", {
                staticClass: "pt-ticket-price"
            }, [e("div", {
                staticClass: "original-price"
            }, [t._v("\u539f\u4ef7\uffe5" + t._s((t.detail.promotion.ticket_price / 100).toFixed(2)))])]) : t._e(), t.detail.ticket_type ? e("div", {
                staticClass: "ticket-type"
            }, [2 !== t.detail.deliver_type && 1 === t.detail.ticket_type ? e("span", [t._v("\u7eb8\u8d28\u7968")]) : t._e(), 2 === t.detail.ticket_type || 3 === t.detail.ticket_type ? e("span", [t._v("\u7535\u5b50\u7968")]) : t._e(), 2 === t.detail.deliver_type && 1 === t.detail.ticket_type ? e("span", [t._v("\u5151\u6362\u7968")]) : t._e()]) : t._e()]), 2 === t.detail.order_type ? e("div", {
                staticClass: "pt-ticket-count"
            }, [t._v(t._s(t.detail.count) + "\u5f20")]) : t._e(), e("div", {
                staticClass: "ticket-type-logo",
                class: {
                    "paper-ticket": 1 === t.detail.ticket_type && 2 !== t.detail.deliver_type,
                    "convert-ticket": 1 === t.detail.ticket_type && 2 === t.detail.deliver_type,
                    "e-ticket": 2 === t.detail.ticket_type || 3 === t.detail.ticket_type
                }
            })]), t.detail.seats && t.detail.seats.length >= 1 ? e("div", {
                staticClass: "tickets-type-seat"
            }, [1 === t.detail.seats.length ? e("div", {
                staticClass: "ticket-max-two"
            }, t._l(t.detail.seats, (function(i, n) {
                return e("div", {
                    key: n
                }, [0 === n ? e("div", {
                    staticClass: "ticket-box",
                    staticStyle: {
                        "margin-top": "0"
                    }
                }, [e("div", {
                    staticClass: "tickets-type-seats"
                }, [t._v(t._s(i.ticket_name) + " " + t._s(i.area_name) + " " + t._s(i.desc) + " ")]), e("div", {
                    staticClass: "tickets-price-num"
                }, [t._v("\uffe5" + t._s((i.price / 100).toFixed(2)))])]) : t._e()])
            }
            )), 0) : t._e(), 2 === t.detail.seats.length ? e("div", {
                staticClass: "ticket-max-two"
            }, t._l(t.detail.seats, (function(i, n) {
                return e("div", {
                    key: n
                }, [0 === n ? e("div", {
                    staticClass: "ticket-box",
                    staticStyle: {
                        "margin-top": "0"
                    }
                }, [e("div", {
                    staticClass: "tickets-type-seats"
                }, [t._v(t._s(i.ticket_name) + " " + t._s(i.area_name) + " " + t._s(i.desc) + " ")]), e("div", {
                    staticClass: "tickets-price-num"
                }, [t._v("\uffe5" + t._s((i.price / 100).toFixed(2)))])]) : t._e(), 0 !== n ? e("div", {
                    staticClass: "ticket-box"
                }, [e("div", {
                    staticClass: "tickets-type-seats"
                }, [t._v(t._s(i.ticket_name) + " " + t._s(i.area_name) + " " + t._s(i.desc) + " ")]), e("div", {
                    staticClass: "tickets-price-num"
                }, [t._v("\uffe5" + t._s((i.price / 100).toFixed(2)))])]) : t._e()])
            }
            )), 0) : t._e(), t.detail.seats.length > 2 ? e("div", {
                staticClass: "ticket-min-two"
            }, [t._l(t.detail.seats, (function(i, n) {
                return e("div", {
                    key: n
                }, [n < 2 ? e("div", {
                    staticClass: "tickets-box-two"
                }, [e("div", {
                    staticClass: "ticket-box-item"
                }, [e("div", {
                    staticClass: "tickets-type-seats"
                }, [t._v("\n                                " + t._s(i.ticket_name) + " " + t._s(i.area_name) + " " + t._s(i.desc) + "\n                            ")]), e("div", {
                    staticClass: "tickets-price-num"
                }, [t._v("\uffe5" + t._s((i.price / 100).toFixed(2)))])])]) : t._e(), n >= 2 ? e("div", {
                    staticClass: "tickets-box",
                    class: {
                        allTickets: t.allTicketsStatus
                    }
                }, [e("div", {
                    staticClass: "ticket-box-item"
                }, [e("div", {
                    staticClass: "tickets-type-seats"
                }, [t._v("\n                                " + t._s(i.ticket_name) + " " + t._s(i.area_name) + " " + t._s(i.desc) + "\n                            ")]), e("div", {
                    staticClass: "tickets-price-num"
                }, [t._v("\uffe5" + t._s((i.price / 100).toFixed(2)))])])]) : t._e()])
            }
            )), e("div", {
                staticClass: "down-btn",
                class: {
                    "up-btn": t.allTicketsStatus
                },
                on: {
                    click: t.showAllTickets
                }
            })], 2) : t._e(), t._m(0)]) : t._e(), t.detail.ticket_info && t.detail.ticket_info.link_sc_name && t.detail.ticket_info.link_sc_name.length > 0 ? e("div", {
                staticClass: "tickets-type-link"
            }, [e("div", {
                staticClass: "tickets-link-left"
            }, [t._v("\u5173\u8054\u573a\u6b21")]), e("div", {
                staticClass: "tickets-link-right"
            }, t._l(t.detail.ticket_info.link_sc_name, (function(i, n) {
                return e("span", {
                    key: n
                }, [n < t.detail.ticket_info.link_sc_name.length - 1 ? e("span", [t._v(t._s(i) + "\uff0c")]) : e("span", [t._v(t._s(i))])])
            }
            )), 0), t._m(1)]) : t._e()])])
        }
          , y = [function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                staticClass: "ticket-space"
            }, [e("div", {
                staticClass: "ticket-space-left"
            }), e("div", {
                staticClass: "ticket-space-middle"
            }), e("div", {
                staticClass: "ticket-space-right"
            })])
        }
        , function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                staticClass: "ticket-space"
            }, [e("div", {
                staticClass: "ticket-space-left"
            }), e("div", {
                staticClass: "ticket-space-middle"
            }), e("div", {
                staticClass: "ticket-space-right"
            })])
        }
        ]
          , g = {
            data: function() {
                return {
                    orderShadowState: !1,
                    upShow: !1,
                    ticketNumMaxTwo: !1,
                    ticketNumMinTwo: !0,
                    allTicketsStatus: !1,
                    ptStatus: !1
                }
            },
            props: {
                detail: {
                    type: Object
                }
            },
            components: {
                BiliPrice: m.Z
            },
            computed: {
                hasTicketInfo: function() {
                    return !!this.detail.ticket_info
                },
                isPackage: function() {
                    return this.hasTicketInfo && this.detail.ticket_info.is_package
                },
                packageNum: function() {
                    return this.hasTicketInfo && this.detail.ticket_info.package_num
                }
            },
            methods: {
                showAllTickets: function() {
                    this.allTicketsStatus = !this.allTicketsStatus
                }
            }
        }
          , C = g
          , k = i(51900)
          , w = (0,
        k.Z)(C, b, y, !1, null, null, null)
          , x = w.exports
          , S = i(73545)
          , T = i(10197)
          , O = i(11876)
          , B = i(82096)
          , I = function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                staticClass: "popup"
            }, [e("transition", {
                attrs: {
                    name: "popup-fade"
                }
            }, [e("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.sumpriceinfo,
                    expression: "sumpriceinfo"
                }],
                staticClass: "popup-container",
                on: {
                    touchmove: function(t) {
                        t.preventDefault()
                    }
                }
            }, [e("div", {
                staticClass: "popup-close",
                on: {
                    click: t.onClose
                }
            }, [e("i")]), e("div", {
                staticClass: "popup-body"
            }, [e("div", {
                staticClass: "addr-header"
            }, [e("div", [t._v("\n                        \u5e94\u4ed8\u603b\u989d\n                        "), e("span", {
                staticClass: "money"
            }, [t._v("\uffe5" + t._s((t.payMoney / 100).toFixed(2)))])])]), e("div", {
                staticClass: "price-discounts-group"
            }, [e("div", {
                staticClass: "price-list"
            }, [e("div", [e("div", {
                staticClass: "price-list-left"
            }, [t._v("\u5546\u54c1\u91d1\u989d")]), e("div", {
                staticClass: "price-list-right"
            }, [t._v("\uffe5" + t._s((t.costdetail.item_total_money / 100).toFixed(2)))])])]), t.costdetail.deliver_type && 3 === t.costdetail.deliver_type && 3 !== t.costdetail.express_type ? e("div", {
                staticClass: "price-list"
            }, [e("div", [e("div", {
                staticClass: "price-list-left"
            }, [t._v("\u8fd0\u8d39\u5408\u8ba1")]), e("div", {
                staticClass: "price-list-right",
                class: {
                    "express-other": t.costdetail.express_type > 1
                }
            }, [t._v(t._s(t.expressText))])])]) : t._e(), t.couponItem.name && t.couponItem.discount && !t.isYearCardOn ? e("div", {
                staticClass: "discounts-list"
            }, [e("div", {
                staticClass: "discounts-list-left"
            }, [t._v(t._s(t.couponItem.name))]), e("div", {
                staticClass: "discounts-list-right"
            }, [t._v("-\uffe5" + t._s((t.couponItem.discount / 100).toFixed(2)))])]) : t._e(), t.isYearCardOn ? e("div", {
                staticClass: "yearcard-list"
            }, [e("div", {
                staticClass: "yearcard-list-left"
            }, [t._v("\u5e74\u5361\u4f18\u60e0")]), e("div", {
                staticClass: "yearcard-list-right"
            }, [t._v("-\uffe5" + t._s((t.yearCardInfo.discount / 100).toFixed(2)))])]) : t._e()])])])]), e("transition", {
                attrs: {
                    name: "popup-fade"
                }
            }, [e("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.sumpriceinfo,
                    expression: "sumpriceinfo"
                }],
                staticClass: "popup-mask",
                on: {
                    click: function(e) {
                        return e.stopPropagation(),
                        t.onClose.apply(null, arguments)
                    },
                    touchmove: [function(e) {
                        return e.stopPropagation(),
                        t.onTouchMove.apply(null, arguments)
                    }
                    , function(t) {
                        t.preventDefault()
                    }
                    ]
                }
            })])], 1)
        }
          , A = []
          , P = {
            data: function() {
                return {}
            },
            props: {
                sumpriceinfo: {
                    type: Boolean,
                    default: !1
                },
                costdetail: {
                    type: Object
                },
                couponItem: {
                    type: Object,
                    default: {
                        name: "",
                        discount: "10"
                    }
                },
                payMoney: {
                    type: Number
                },
                isYearCardOn: {
                    type: Boolean
                },
                yearCardInfo: {
                    type: Object
                }
            },
            computed: {
                expressText: function() {
                    return 2 === this.costdetail.express_type || 4 === this.costdetail.express_type ? "\uffe50.00" : "\uffe5".concat((this.costdetail.express_fee / 100).toFixed(2))
                }
            },
            methods: {
                onTouchMove: function(t) {
                    t.preventDefault()
                },
                onClose: function() {
                    this.$emit("close")
                }
            }
        }
          , j = P
          , L = (0,
        k.Z)(j, I, A, !1, null, "b1c43c72", null)
          , N = L.exports
          , D = function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                staticClass: "popup"
            }, [e("transition", {
                attrs: {
                    name: "popup-fade"
                }
            }, [e("div", {
                staticClass: "popup-container"
            }, [e("div", {
                staticClass: "popup-close",
                on: {
                    click: t.onClose
                }
            }, [e("i")]), e("div", {
                staticClass: "popup-body"
            }, [e("div", {
                staticClass: "addr-header"
            }, [e("div", [t._v("\u4f18\u60e0\u5238")])]), t.couponList && 0 === t.couponList.length || !t.couponList ? e("div", {
                staticClass: "without-discount"
            }, [e("img", {
                staticClass: "without-discount-bg",
                attrs: {
                    src: i(66112)
                }
            }), e("div", {
                staticClass: "without-discount-tips"
            }, [t._v("\u6682\u65e0\u53ef\u7528\u4f18\u60e0\u5238")])]) : t._e(), t.couponList && t.couponList.length > 0 ? e("div", {
                staticClass: "discount-list-box"
            }, [e("div", {
                staticClass: "discount-switch"
            }, [e("div", {
                staticClass: "discount-switch-left"
            }, [t._v("\u4f7f\u7528\u4f18\u60e0\u5238")]), e("div", {
                staticClass: "discount-switch-right",
                class: {
                    "close-switch": !t.switchStatus
                },
                on: {
                    click: t.closeSwitch
                }
            }, [e("img", {
                staticClass: "switch-btn",
                class: {
                    "close-switch-btn": !t.switchStatus
                },
                attrs: {
                    src: i(1759)
                }
            })])]), e("div", {
                staticClass: "coupon-close-group"
            }, [t.switchStatus ? t._e() : e("div", {
                staticClass: "coupon-close-icon"
            }, [e("span", {
                staticClass: "coupon-close-tips"
            }, [t._v("\u795e\u5238\u8eba\u5728\u5361\u5305\u91cc\u54df_(:3\u300d\u2220)_")])])]), t.discountsListStatus ? e("div", {
                staticClass: "discount-container"
            }, [e("div", {
                staticClass: "discount-list-item-box",
                on: {
                    click: t.checkCoupon
                }
            }, t._l(t.couponList, (function(i, n) {
                return e("div", {
                    key: i.code,
                    staticClass: "discount-list-item"
                }, [e("div", {
                    staticClass: "discount-list-left",
                    attrs: {
                        couponId: i.code,
                        index: n
                    }
                }, [1 === i.style ? e("div", {
                    staticClass: "discount-money",
                    attrs: {
                        couponId: i.code,
                        index: n
                    }
                }, [t._v("\n                                        \uffe5\n                                        "), e("span", {
                    attrs: {
                        couponId: i.code,
                        index: n
                    }
                }, [t._v(t._s(i.discount / 100))])]) : t._e(), 2 === i.style ? e("div", {
                    staticClass: "discount-money",
                    attrs: {
                        couponId: i.code,
                        index: n
                    }
                }, [e("span", {
                    attrs: {
                        couponId: i.code,
                        index: n
                    }
                }, [t._v(t._s(i.discount))]), t._v("\u6298\n                                    ")]) : t._e(), e("div", {
                    staticClass: "discount-range",
                    attrs: {
                        couponId: i.code,
                        index: n
                    }
                }, [t._v(t._s(i.condition))])]), e("div", {
                    staticClass: "discount-list-right",
                    attrs: {
                        couponId: i.code,
                        index: n
                    }
                }, [e("div", {
                    staticClass: "discount-list-left-part-icon"
                }), e("div", {
                    staticClass: "discount-content",
                    attrs: {
                        couponId: i.code,
                        index: n
                    }
                }, [e("div", {
                    staticClass: "discount-content-left"
                }, [e("div", {
                    staticClass: "discount-title",
                    attrs: {
                        couponId: i.code,
                        index: n
                    }
                }, [t._v(t._s(i.name))]), e("div", {
                    staticClass: "discount-period",
                    attrs: {
                        couponId: i.code,
                        index: n
                    }
                }, [t._v(t._s(i.start_date) + " - " + t._s(i.end_date))]), e("div", {
                    staticClass: "application-range",
                    attrs: {
                        couponId: i.code,
                        index: n
                    }
                }, [t._v("\n                                                " + t._s(i.scope) + "\n                                                ")])]), e("i", {
                    staticClass: "discount-chose",
                    class: {
                        "is-selected": i.code == t.choiceId
                    },
                    attrs: {
                        couponId: i.code,
                        index: n
                    }
                })]), e("div", {
                    staticClass: "discount-list-right-part-icon"
                })])])
            }
            )), 0)]) : t._e()]) : t._e()])])]), e("transition", {
                attrs: {
                    name: "popup-fade"
                }
            }, [e("div", {
                staticClass: "popup-mask",
                on: {
                    click: function(e) {
                        return e.stopPropagation(),
                        t.onClose.apply(null, arguments)
                    },
                    touchmove: function(e) {
                        return e.stopPropagation(),
                        t.onTouchMove.apply(null, arguments)
                    }
                }
            })])], 1)
        }
          , R = []
          , U = {
            data: function() {
                return {
                    switchStatus: !0,
                    showApplicationStatus: !1,
                    discountsListStatus: !0,
                    selectedDiscount: !1,
                    choiceId: "",
                    couponId: "",
                    locked: !1
                }
            },
            props: {
                couponList: {
                    type: Array,
                    default: []
                },
                couponCode: {
                    type: String,
                    default: ""
                },
                replaceCode: {
                    type: Boolean
                }
            },
            created: function() {
                this.couponCode && (this.choiceId = this.couponCode)
            },
            beforeUpdate: function() {
                !(this.couponList && Array.isArray(this.couponList) && this.couponList.length > 0) || this.choiceId && this.couponCode || (this.choiceId = this.couponList[0].code)
            },
            watch: {
                couponList: function() {
                    this.couponList && this.couponList.length > 0 && (this.choiceId = this.couponList[0].code,
                    this.switchStatus = !0,
                    this.discountsListStatus = !0)
                }
            },
            methods: {
                onTouchMove: function(t) {
                    t.preventDefault()
                },
                onClose: function() {
                    this.couponList && this.couponList.length > 0 && this.discountsListStatus && this.$emit("pickCoupon", this.choiceId),
                    this.$emit("close")
                },
                closeSwitch: function() {
                    var t = document.querySelector(".discount-switch-right");
                    t && (this.switchStatus = !this.switchStatus),
                    this.discountsListStatus = !this.discountsListStatus,
                    !1 === this.switchStatus && (this.choiceId = this.couponList[0].code,
                    this.couponId = "",
                    this.$emit("pickCoupon", this.couponId),
                    this.$emit("close"))
                },
                checkCoupon: function(t) {
                    var e = t.target
                      , i = e.getAttribute("index")
                      , n = e.getAttribute("couponId");
                    this.couponId = n,
                    "discount-list-item" !== e.className && "discount-list-left" !== e.className && "discount-list-right" !== e.className || !i || (this.couponId !== this.choiceId && (this.choiceId = this.couponId),
                    this.$emit("pickCoupon", n),
                    this.$emit("close"))
                }
            }
        }
          , M = U
          , $ = (0,
        k.Z)(M, D, R, !1, null, "12d1c1c7", null)
          , Z = $.exports
          , E = function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                staticClass: "leave-dialog"
            }, [e("transition", {
                attrs: {
                    name: "popup-fade"
                }
            }, [e("div", {
                staticClass: "popup-dialog",
                on: {
                    touchmove: function(t) {
                        t.preventDefault()
                    }
                }
            }, [e("div", {
                staticClass: "popup-left"
            }), e("div", {
                staticClass: "popup-body"
            }, [e("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.selectedStatus,
                    expression: "selectedStatus"
                }],
                staticClass: "popup-container"
            }, [e("div", {
                staticClass: "leave-img"
            }), e("div", {
                staticClass: "leave-content"
            }, [t._v("\u4f60\u6240\u9009\u7684\u5ea7\u4f4d\u5df2\u88ab\u62a2\u5149\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9")]), e("div", {
                staticClass: "select-btn"
            }, [e("BButton", {
                staticClass: "select-btn-left",
                on: {
                    click: t.cancelDialog
                }
            }, [t._v("\n                            \u53d6\u6d88\n                        ")]), e("BButton", {
                staticClass: "select-btn-right",
                on: {
                    click: t.cancelOrder
                }
            }, [t._v("\n                            \u786e\u8ba4\n                        ")])], 1)])]), e("div", {
                staticClass: "popup-right"
            })])]), e("transition", {
                attrs: {
                    name: "popup-fade"
                }
            }, [e("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.selectedStatus,
                    expression: "selectedStatus"
                }],
                staticClass: "popup-mask",
                on: {
                    touchmove: [function(e) {
                        return e.stopPropagation(),
                        t.onTouchMove.apply(null, arguments)
                    }
                    , function(t) {
                        t.preventDefault()
                    }
                    ]
                }
            })])], 1)
        }
          , W = []
          , q = {
            data: function() {
                return {}
            },
            props: {
                selectedStatus: {
                    type: Boolean,
                    default: !1
                }
            },
            methods: {
                onTouchMove: function(t) {
                    t.preventDefault()
                },
                cancelDialog: function() {
                    this.$emit("cancelDialog")
                },
                cancelOrder: function() {
                    this.$emit("cancelOrder")
                }
            },
            components: {
                BButton: h.Z
            }
        }
          , V = q
          , H = (0,
        k.Z)(V, E, W, !1, null, "00d65d37", null)
          , F = H.exports
          , Y = function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                staticClass: "popup"
            }, [e("transition", {
                attrs: {
                    name: "popup-fade"
                }
            }, [e("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.anyTicketStatus,
                    expression: "anyTicketStatus"
                }],
                staticClass: "popup-container",
                on: {
                    touchmove: function(t) {
                        t.preventDefault()
                    }
                }
            }, [e("div", {
                staticClass: "popup-close",
                on: {
                    click: t.cancelOrder
                }
            }, [e("i")]), e("div", {
                staticClass: "popup-body"
            }, [e("div", {
                staticClass: "product-info-box"
            }, [e("div", [e("img", {
                staticClass: "product-info-left",
                attrs: {
                    src: t.detail.project_img
                }
            }), e("div", {
                staticClass: "product-info-right"
            }, [e("div", {
                staticClass: "product-name"
            }, [t._v(t._s(t.detail.project_name))]), e("div", {
                staticClass: "session-name"
            }, [t._v(t._s(t.detail.screen_name))])])])]), t.failSeats && t.failSeats.length > 0 ? e("div", {
                staticClass: "without-ticket-box"
            }, t._l(t.failSeats, (function(i, n) {
                return e("div", {
                    key: n,
                    staticClass: "without-ticket-item"
                }, [e("div", {
                    staticClass: "without-ticket-left"
                }, [t._v(t._s(i.area_name) + " " + t._s(i.desc))]), e("div", {
                    staticClass: "ticket-price"
                }, [t._v("\uffe5"), e("span", [t._v(t._s(i.price / 100))])])])
            }
            )), 0) : t._e()]), e("div", {
                staticClass: "ticket-tip"
            }, [t._v(" \u4ee5\u4e0a" + t._s(t.failSeats.length) + "\u4e2a "), t.failSeats && t.failSeats.length ? e("span", [t._v("\u5ea7\u4f4d")]) : e("span", [t._v("\u7968\u79cd")]), t._v(" \u5df2\u88ab\u62a2\uff0c\u6682\u4e0d\u53ef\u8d2d\u4e70 ")]), e("div", {
                staticClass: "check-btn"
            }, [e("BButton", {
                attrs: {
                    className: "cancel-btn"
                },
                on: {
                    click: function(e) {
                        return t.cancelOrder()
                    }
                }
            }, [t._v("\u53d6\u6d88")]), e("BButton", {
                attrs: {
                    className: "continue-btn",
                    type: "primary"
                },
                on: {
                    click: function(e) {
                        return t.continuePay()
                    }
                }
            }, [t._v("\u7ee7\u7eed\u652f\u4ed8")])], 1)])]), e("transition", {
                attrs: {
                    name: "popup-fade"
                }
            }, [e("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.anyTicketStatus,
                    expression: "anyTicketStatus"
                }],
                staticClass: "popup-mask",
                on: {
                    click: function(e) {
                        return e.stopPropagation(),
                        t.cancelOrder.apply(null, arguments)
                    },
                    touchmove: [function(e) {
                        return e.stopPropagation(),
                        t.onTouchMove.apply(null, arguments)
                    }
                    , function(t) {
                        t.preventDefault()
                    }
                    ]
                }
            })])], 1)
        }
          , J = []
          , G = {
            data: function() {
                return {
                    ticketSeat: !1,
                    ticketType: !0
                }
            },
            props: {
                anyTicketStatus: {
                    type: Boolean,
                    default: !1
                },
                costdetail: {
                    type: Object
                },
                detail: {
                    type: Object
                },
                failSeats: {
                    type: Array
                }
            },
            methods: {
                onTouchMove: function(t) {
                    t.preventDefault()
                },
                cancelOrder: function() {
                    this.$emit("cancel")
                },
                continuePay: function() {
                    this.$emit("continuePay")
                }
            },
            components: {
                BButton: h.Z
            }
        }
          , z = G
          , K = (0,
        k.Z)(z, Y, J, !1, null, "556c4a86", null)
          , Q = K.exports
          , X = i(47401)
          , tt = function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                staticClass: "leave-dialog"
            }, [e("transition", {
                attrs: {
                    name: "popup-fade"
                }
            }, [e("div", {
                staticClass: "popup-dialog",
                on: {
                    touchmove: function(t) {
                        t.preventDefault()
                    }
                }
            }, [e("div", {
                staticClass: "popup-left"
            }), e("div", {
                staticClass: "popup-body"
            }, [e("div", {
                staticClass: "popup-container"
            }, [e("div", {
                staticClass: "leave-img"
            }), e("div", {
                staticClass: "leave-content"
            }, [t._v("\u6240\u9009\u7968\u5269\u4f59" + t._s(t.ticketNum) + "\u5f20\uff0c\u662f\u5426\u786e\u8ba4\u8d2d\u4e70")]), e("div", {
                staticClass: "select-btn"
            }, [e("div", {
                staticClass: "select-btn-left",
                on: {
                    click: t.someNomalTicketCancel
                }
            }, [t._v("\u53d6\u6d88")]), e("div", {
                staticClass: "select-btn-middle"
            }), e("div", {
                staticClass: "select-btn-right",
                on: {
                    click: t.someNomalTicketPay
                }
            }, [t._v("\u7ee7\u7eed\u652f\u4ed8")])])])]), e("div", {
                staticClass: "popup-right"
            })])]), e("transition", {
                attrs: {
                    name: "popup-fade"
                }
            }, [e("div", {
                staticClass: "popup-mask",
                on: {
                    click: function(e) {
                        return e.stopPropagation(),
                        t.someNomalTicketCancel.apply(null, arguments)
                    },
                    touchmove: [function(t) {
                        t.preventDefault()
                    }
                    , function(e) {
                        return e.stopPropagation(),
                        t.onTouchMove.apply(null, arguments)
                    }
                    ]
                }
            })])], 1)
        }
          , et = []
          , it = {
            data: function() {
                return {}
            },
            props: {
                ticketNum: {
                    type: Number
                }
            },
            methods: {
                onTouchMove: function(t) {
                    t.preventDefault()
                },
                someNomalTicketCancel: function() {
                    this.$emit("someNomalTicketCancel")
                },
                someNomalTicketPay: function() {
                    this.$emit("someNomalTicketPay")
                }
            }
        }
          , nt = it
          , st = (0,
        k.Z)(nt, tt, et, !1, null, "60e19c11", null)
          , rt = st.exports
          , ot = function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                staticClass: "leave-dialog"
            }, [e("transition", {
                attrs: {
                    name: "popup-fade"
                }
            }, [e("div", {
                staticClass: "popup-dialog",
                on: {
                    touchmove: function(t) {
                        t.preventDefault()
                    }
                }
            }, [e("div", {
                staticClass: "popup-left"
            }), e("div", {
                staticClass: "popup-body"
            }, [e("div", {
                staticClass: "popup-container"
            }, [e("div", {
                staticClass: "leave-img"
            }), "1" === t.dialogTipInfo ? e("div", {
                staticClass: "leave-content"
            }, [t._v("\u5f53\u524d\u6f2b\u5c55\u5df2\u4e0b\u7ebf\uff0c\u65e0\u6cd5\u8d2d\u4e70")]) : t._e(), "2" === t.dialogTipInfo ? e("div", {
                staticClass: "leave-content"
            }, [t._v("\u6240\u9009\u7968\u5df2\u4e0b\u7ebf\uff0c\u65e0\u6cd5\u8d2d\u4e70")]) : t._e(), "3" === t.dialogTipInfo ? e("div", {
                staticClass: "leave-content"
            }, [t._v("\u6b64\u4f18\u60e0\u5238\u5df2\u5931\u6548\uff0c\u6682\u4e0d\u53ef\u7528")]) : t._e(), "4" === t.dialogTipInfo ? e("div", {
                staticClass: "leave-content"
            }, [t._v("\u6b64\u4f18\u60e0\u5238\u6682\u4e0d\u53ef\u7528")]) : t._e(), "5" === t.dialogTipInfo ? e("div", {
                staticClass: "leave-content"
            }, [t._v("\u60a8\u9009\u4e2d\u7684\u7968\u5e93\u5b58\u4e0d\u8db3\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9")]) : t._e(), "6" === t.dialogTipInfo ? e("div", {
                staticClass: "leave-content"
            }, [t._v("\u6240\u8d2d\u4e70\u7968\u5df2\u8fbe\u4e0a\u9650")]) : t._e(), e("div", {
                staticClass: "select-btn",
                on: {
                    click: t.projectOffLineBtn
                }
            }, [t._v("\u786e\u8ba4")])])]), e("div", {
                staticClass: "popup-right"
            })])]), e("transition", {
                attrs: {
                    name: "popup-fade"
                }
            }, [e("div", {
                staticClass: "popup-mask",
                on: {
                    click: function(e) {
                        return e.stopPropagation(),
                        t.projectCancel.apply(null, arguments)
                    },
                    touchmove: [function(t) {
                        t.preventDefault()
                    }
                    , function(e) {
                        return e.stopPropagation(),
                        t.onTouchMove.apply(null, arguments)
                    }
                    ]
                }
            })])], 1)
        }
          , at = []
          , ct = {
            data: function() {
                return {}
            },
            props: {
                dialogTipInfo: {
                    type: String
                }
            },
            methods: {
                onTouchMove: function(t) {
                    t.preventDefault()
                },
                projectCancel: function() {
                    this.$emit("projectCancel")
                },
                projectOffLineBtn: function() {
                    this.$emit("projectOffLineBtn")
                }
            }
        }
          , lt = ct
          , dt = (0,
        k.Z)(lt, ot, at, !1, null, "059baa7a", null)
          , ut = dt.exports
          , pt = function() {
            var t = this
              , e = t._self._c;
            return e("transition", {
                attrs: {
                    name: "fade"
                }
            }, [e("div", {
                staticClass: "rights-modal"
            }, [e("div", {
                staticClass: "modal-bg-shadow",
                on: {
                    click: t.handleCloseClick
                }
            }), e("transition", {
                attrs: {
                    name: "slide-up"
                },
                on: {
                    "after-leave": t.handleAfterLeave
                }
            }, [e("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.isRightsContentShow,
                    expression: "isRightsContentShow"
                }],
                ref: "modal",
                staticClass: "modal-content-wrapper"
            }, [e("div", {
                staticClass: "scroll-box"
            }, [e("div", {
                staticClass: "content-title"
            }, [t._v("\u5e74\u5361\u6743\u76ca\u8bf4\u660e")]), e("div", {
                staticClass: "content-content"
            }, [e("ul", {
                staticClass: "rights-list"
            }, [e("li", [t._v("\u5e74\u5361\u4f7f\u7528\u6709\u6548\u671f\uff1a365\u5929\uff0c\u81ea\u8d2d\u5361\u4e4b\u65e5\u8d77\u5f00\u59cb\u8ba1\u7b97\u3002")]), e("li", [t._v("\u5e74\u5361\u4f7f\u7528\u6b21\u6570\uff1a\u6709\u6548\u671f\u518510\u6b21\uff08\u8fc7\u671f\u672a\u4f7f\u7528\u6b21\u6570\u4e0d\u4e88\u9000\u56de\u3001\u4e0d\u53ef\u6298\u73b0\uff09\u3002")]), e("li", [t._v("\u5e74\u5361\u8d2d\u4e70\u4f7f\u7528\u8303\u56f4\uff1a\u4ec5\u9002\u7528\u4e8e\u8d2d\u4e70\u5355\u5f20\u95e8\u7968\u91d1\u989d\u2264150\u5143\u7684\u6f2b\u5c55\u3001\u672c\u5730\u751f\u6d3b\u7c7b\u76ee\u76f8\u5173\u7684\u95e8\u7968\uff08\u6f14\u51fa\u7c7b\u76ee\u95e8\u7968\u8d2d\u4e70\u4e0d\u53ef\u4f7f\u7528\uff0c\u8d85\u8fc7150\u5143\u7684\u95e8\u7968\u4e0d\u53ef\u8d2d\u4e70\u3001\u4e0d\u505a\u62b5\u6263\uff09\u3002")]), e("li", [t._v("\u672c\u5e74\u5361\u8d2d\u95e8\u7968\u65f6\u4e0d\u53ef\u4e0e\u4f18\u60e0\u5238/\u62fc\u56e2/\u7968\u7968\u56e2\u7b49\u8425\u9500\u6d3b\u52a8\u53e0\u52a0\u4f7f\u7528\u3002")]), e("li", [t._v("\u8d2d\u4e70\u540c\u4e00\u5546\u54c1\u95e8\u7968\u4ec5\u80fd\u4f7f\u75281\u6b21\uff0c\u6bcf\u6b21\u53ea\u80fd\u8d2d\u4e701\u5f20\uff0c\u7968\u79cd\u4e0d\u9650\u3002")]), e("li", [t._v("\u672c\u5e74\u5361\u4ec5\u9650\u8d2d\u5361\u8005\u672c\u4eba\u4f7f\u7528\uff0c\u4e0d\u53ef\u8f6c\u8d60\u4ed6\u4eba\u3002")]), e("li", [t._v("\u6240\u8d2d\u4e70\u7684\u95e8\u7968\u4ec5\u9650\u8d2d\u5361\u8005\u672c\u4eba\u4f7f\u7528\uff0c\u4e0d\u5f97\u8f6c\u8d60\u4ed6\u4eba\u3002")]), e("li", [t._v("233\u5e74\u5361\u4f7f\u7528\u65b9\u6cd5\uff1a\u8fdb\u5165\u4f1a\u5458\u8d2d\u201c\u6f2b\u5c55\u6f14\u51fa\u201d\u9891\u9053\u2014\u2014\u6253\u5f00\u60f3\u8981\u8d2d\u4e70\u7684\u6f2b\u5c55\u6d3b\u52a8\u2014\u2014\u9009\u62e9\u5177\u4f53\u8d2d\u4e70\u7684\u573a\u6b21\u548c\u7968\u79cd\u2014\u2014\u5728\u63d0\u4ea4\u8ba2\u5355\u65f6\u9009\u62e9\u201c\u7528\u5e74\u5361\u62b5\u6263\u201d\u2014\u2014\u5b8c\u6210\u201c0\u5143\u201d\u652f\u4ed8\uff08\u82e5\u6709\u8fd0\u8d39\u9700\u652f\u4ed8\u8fd0\u8d39\uff09\u2014\u2014\u51ed\u8d2d\u4e70\u7684\u7535\u5b50\u7968\u5230\u6d3b\u52a8\u73b0\u573a\u626b\u7801\u9a8c\u8bc1\u5165\u573a\u3002")])]), e("span", [t._v("\n                            *\u6700\u7ec8\u89e3\u91ca\u6743\u5f52bilibili\u4f1a\u5458\u8d2d\u6240\u6709\u3002\n                        ")])]), e("span", {
                staticClass: "rights-icon-close",
                on: {
                    click: t.handleCloseClick
                }
            }, [e("i", {
                staticClass: "bili-icon-modal-close icon-close"
            })])])])])], 1)])
        }
          , vt = []
          , _t = {
            name: "RightDialog",
            data: function() {
                return {
                    isRightsContentShow: !1
                }
            },
            mounted: function() {
                this.isRightsContentShow = !0
            },
            methods: {
                handleAfterLeave: function() {
                    this.$emit("closeModal")
                },
                handleBgLeave: function() {
                    this.isRightsContentShow = !1
                },
                handleCloseClick: function() {
                    this.isRightsContentShow = !1
                }
            }
        }
          , ft = _t
          , ht = (0,
        k.Z)(ft, pt, vt, !1, null, "2b40aa82", null)
          , mt = ht.exports
          , bt = function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                staticClass: "leave-dialog"
            }, [e("transition", {
                attrs: {
                    name: "popup-fade"
                }
            }, [e("div", {
                staticClass: "popup-dialog",
                on: {
                    touchmove: function(t) {
                        t.preventDefault()
                    }
                }
            }, [e("div", {
                staticClass: "popup-left"
            }), e("div", {
                staticClass: "popup-body"
            }, [e("div", {
                staticClass: "popup-container"
            }, [e("div", {
                staticClass: "leave-img"
            }), 2 === t.ptStatusNum ? e("div", {
                staticClass: "leave-content"
            }, [t._v("\u62fc\u56e2\u8fdb\u884c\u4e2d\uff0c\u8bf7\u52ff\u91cd\u590d\u62fc\u56e2")]) : 1 === t.ptStatusNum ? e("div", {
                staticClass: "leave-content"
            }, [t._v("\u62fc\u56e2\u672a\u652f\u4ed8\uff0c\u8bf7\u52ff\u91cd\u590d\u62fc\u56e2")]) : t._e(), e("div", {
                staticClass: "select-btn"
            }, [e("div", {
                staticClass: "select-btn-left",
                on: {
                    click: t.knowPtDetail
                }
            }, [t._v("\u77e5\u9053\u4e86")]), e("div", {
                staticClass: "select-btn-middle"
            }), 2 === t.ptStatusNum ? e("div", {
                staticClass: "select-btn-right",
                on: {
                    click: t.goPtDetail
                }
            }, [t._v("\u67e5\u770b\u8be6\u60c5")]) : 1 === t.ptStatusNum ? e("div", {
                staticClass: "select-btn-right",
                on: {
                    click: t.goPtPay
                }
            }, [t._v("\u53bb\u652f\u4ed8")]) : t._e()])])]), e("div", {
                staticClass: "popup-right"
            })])]), e("transition", {
                attrs: {
                    name: "popup-fade"
                }
            }, [e("div", {
                staticClass: "popup-mask",
                on: {
                    click: function(e) {
                        return e.stopPropagation(),
                        t.someNomalTicketCancel.apply(null, arguments)
                    },
                    touchmove: [function(t) {
                        t.preventDefault()
                    }
                    , function(e) {
                        return e.stopPropagation(),
                        t.onTouchMove.apply(null, arguments)
                    }
                    ]
                }
            })])], 1)
        }
          , yt = []
          , gt = {
            props: {
                ptStatusNum: {
                    type: Number
                }
            },
            methods: {
                onTouchMove: function(t) {
                    t.preventDefault()
                },
                knowPtDetail: function() {
                    this.$emit("knowPtDetail")
                },
                goPtDetail: function() {
                    this.$emit("goPtDetail")
                },
                goPtPay: function() {
                    this.$emit("goPtPay")
                }
            }
        }
          , Ct = gt
          , kt = (0,
        k.Z)(Ct, bt, yt, !1, null, "efe905f8", null)
          , wt = kt.exports
          , xt = function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                staticClass: "leave-dialog"
            }, [e("transition", {
                attrs: {
                    name: "popup-fade"
                }
            }, [e("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.orderTermStatus,
                    expression: "orderTermStatus"
                }],
                staticClass: "popup-mask",
                on: {
                    click: function(e) {
                        return e.stopPropagation(),
                        t.onClose.apply(null, arguments)
                    }
                }
            }, [e("div", {
                staticClass: "terms-content",
                class: {
                    "is-app": t.isApp
                },
                style: {
                    height: t.termsHeigth,
                    "margin-top": "".concat(t.topOffset, "px")
                }
            }, [e("div", {
                staticClass: "order-terms-title"
            }, [e("h3", {
                staticClass: "title-text"
            }, [t._v("bilibili\u8d2d\u7968\u670d\u52a1\u534f\u8bae")])]), e("div", [e("br"), e("p", [t._v("\u66f4\u65b0\u65f6\u95f4\uff1a2022\u5e74\u30109\u3011\u6708\u301016\u3011\u65e5")]), e("p", [t._v("\u751f\u6548\u65f6\u95f4\uff1a2022\u5e74\u30109\u3011\u6708\u301023\u3011\u65e5")]), e("p", [e("strong", [t._v("\u3010\u9996\u90e8\u53ca\u5bfc\u8a00\u3011")])]), e("ul", [e("li", [t._v("\n              1.\n              \u672c\u534f\u8bae\u4e3a\u60a8\u4e0ebilibili\uff08\u4ee5\u4e0b\u79f0\u201cbilbili\u201d\u6216\u201c\u672c\u7f51\u7ad9\u201d\uff09\u4e4b\u95f4\u5c31\u4f7f\u7528bilibili\u8d2d\u7968\u670d\u52a1\u7b49\u76f8\u5173\u4e8b\u5b9c\u6240\u8ba2\u7acb\u7684\u5177\u6709\u6cd5\u5f8b\u7ea6\u675f\u529b\u7684\u5951\u7ea6\u3002\n            ")]), e("li", [t._v("\n              2.\n              \u4f7f\u7528\u672c\u7f51\u7ad9\u76f8\u5173\u670d\u52a1\u7684\u7528\u6237\u5fc5\u987b\u5177\u6709\u4eab\u53d7\u672c\u7f51\u7ad9\u670d\u52a1\u53ca\u8fdb\u884c\u4e0b\u5355\u8d2d\u7968\u7b49\u884c\u4e3a\u7684\u76f8\u5e94\u7684\u6c11\u4e8b\u6743\u5229\u80fd\u529b\u548c\u6c11\u4e8b\u884c\u4e3a\u80fd\u529b\uff0c\u80fd\u591f\u72ec\u7acb\u627f\u62c5\u6cd5\u5f8b\u8d23\u4efb\u3002"), e("strong", [t._v("bilibili\u5728\u6b64\u7279\u522b\u63d0\u9192\uff0c\u5982\u679c\u60a8\u672a\u6ee118\u5468\u5c81\uff0c\u8bf7\u5728\u6cd5\u5b9a\u76d1\u62a4\u4eba\u7684\u966a\u540c\u4e0b\u9605\u8bfb\u672c\u534f\u8bae\u3002\u672a\u6210\u5e74\u4eba\u884c\u4f7f\u548c\u5c65\u884c\u672c\u534f\u8bae\u9879\u4e0b\u7684\u6743\u5229\u548c\u4e49\u52a1\u89c6\u4e3a\u5df2\u83b7\u5f97\u4e86\u76d1\u62a4\u4eba\u7684\u8ba4\u53ef\u3002\u5982\u60a8\u4e0d\u5177\u6709\u4eab\u53d7\u672c\u7ad9\u670d\u52a1\u53ca\u8fdb\u884c\u4e0b\u5355\u8d2d\u7968\u7b49\u884c\u4e3a\u76f8\u5e94\u7684\u6c11\u4e8b\u6743\u5229\u80fd\u529b\u548c\u6c11\u4e8b\u884c\u4e3a\u80fd\u529b\uff0c\u5219bilibili\u6709\u6743\u91c7\u53d6\u62d2\u7edd\u3001\u7ec8\u6b62\u3001\u5173\u95ed\u8d26\u6237\u3001\u6e05\u9664\u6216\u7f16\u8f91\u5185\u5bb9\u3001\u53d6\u6d88\u8ba2\u5355\u7b49\u64cd\u4f5c\u63aa\u65bd\u3002\u8bf7\u60a8\u5728\u63a5\u53d7\u7968\u52a1\u670d\u52a1\u524d\u9605\u8bfb\u5e76\u5145\u5206\u7406\u89e3\u672c\u534f\u8bae\uff0c\u7279\u522b\u662f\u514d\u9664\u6216\u8005\u9650\u5236\u8d23\u4efb\u7684\u76f8\u5e94\u6761\u6b3e\uff0c\u53cc\u65b9\u786e\u8ba4\u524d\u8ff0\u6761\u6b3e\u4e0d\u5c5e\u4e8e\u300a\u6c11\u6cd5\u5178\u300b\u7b2c497\u6761\u89c4\u5b9a\u7684\u201c\u514d\u9664\u5176\u8d23\u4efb\u3001\u52a0\u91cd\u5bf9\u65b9\u8d23\u4efb\u3001\u6392\u9664\u5bf9\u65b9\u4e3b\u8981\u6743\u5229\u201d\u6761\u6b3e\uff0c\u60a8\u8ba4\u53ef\u5176\u5408\u6cd5\u6027\u53ca\u6709\u6548\u6027\u3002")])]), e("li", [t._v("\n              3.\n              \u672c\u534f\u8bae\u662f\u57fa\u4e8e\u300a\u54d4\u54e9\u54d4\u54e9\u5f39\u5e55\u7f51\u7528\u6237\u4f7f\u7528\u534f\u8bae\u300b\u3001\u300a\u54d4\u54e9\u54d4\u54e9\u5f39\u5e55\u7f51\u8d26\u53f7\u4e2d\u5fc3\u89c4\u8303\u300b\u3001\u300a\u4f1a\u5458\u8d2d\u670d\u52a1\u534f\u8bae\u300b\u300aB\u5e01\u7528\u6237\u534f\u8bae\u300b\u4ee5\u53cabilibili\u76f8\u5173\u534f\u8bae\u89c4\u8303\uff08\u4ee5\u4e0b\u7edf\u79f0\u4e3a\u201cbilibili\u670d\u52a1\u6761\u6b3e\u201d\uff09\u5236\u5b9a\uff0c\u4e0e\u5176\u662f\u4e0d\u53ef\u5206\u5272\u7684\u3002\u672c\u534f\u8bae\u5185\u5bb9\u5305\u62ec\u534f\u8bae\u6b63\u6587\u53ca\u6240\u6709\u672c\u7f51\u7ad9\u5df2\u7ecf\u53d1\u5e03\u7684\u6216\u5c06\u6765\u53ef\u80fd\u53d1\u5e03\u6216\u66f4\u65b0\u7684\u5404\u7c7b\u89c4\u5219\uff0c\u6240\u6709\u89c4\u5219\u4e3a\u672c\u534f\u8bae\u4e0d\u53ef\u5206\u5272\u7684\u7ec4\u6210\u90e8\u5206\uff0c\u4e0e\u672c\u534f\u8bae\u6b63\u6587\u5177\u6709\u540c\u7b49\u6cd5\u5f8b\u6548\u529b\u3002"), e("strong", [t._v("\u60a8\u5728\u8d2d\u7968\u53ca\u63a5\u53d7\u7968\u52a1\u670d\u52a1\u7684\u540c\u65f6\u5e94\u9075\u5b88\u672c\u534f\u8bae\u3001bilibili\u670d\u52a1\u6761\u6b3e\u53ca\u524d\u8ff0\u76f8\u5173\u534f\u8bae\u3001\u670d\u52a1\u89c4\u5219\u7b49\u6240\u6709\u6761\u6b3e\u3002")]), t._v("\u672c\u534f\u8bae\u672a\u7ea6\u5b9a\u4e8b\u5b9c\uff0c\u4ee5bilibili\u670d\u52a1\u6761\u6b3e\u4e2d\u76f8\u5173\u5185\u5bb9\u4e3a\u51c6\u3002\n            ")]), e("li", [t._v("\n              4.\n              "), e("strong", [t._v("bilibili\u6709\u6743\u6839\u636e\u9700\u8981\u4e0d\u65f6\u5730\u5236\u8ba2\u3001\u4fee\u6539\u672c\u534f\u8bae\u548c/\u6216\u5404\u7c7b\u89c4\u5219\uff0c\u5c06\u4e8e\u76f8\u5173\u9875\u9762\u8fdb\u884c\u516c\u544a\uff0c\u4e0d\u518d\u5355\u72ec\u901a\u77e5\u60a8\u3002\u60a8\u4f7f\u7528\u670d\u52a1\u5373\u89c6\u4e3a\u60a8\u63a5\u53d7\u5e76\u540c\u610f\u672c\u534f\u8bae\u6240\u6709\u6761\u6b3e\uff0c\u5305\u62ec\u4f46\u4e0d\u9650\u4e8e\u524d\u8ff0\u4fee\u6539\u53ca\u53d8\u66f4\u3002\u5982\u8fdd\u53cd\u672c\u534f\u8bae\u7ea6\u5b9a\uff0cbilibili\u6709\u6743\u968f\u65f6\u4e2d\u6b62\u6216\u7ec8\u6b62\u8be5\u7968\u52a1\u670d\u52a1\uff0c\u5e76\u4e0d\u4e88\u4efb\u4f55\u8d54\u507f\u6216\u9000\u8fd8\u8d39\u7528\u3002\u5982\u60a8\u4e0d\u540c\u610f\u534f\u8bae\u53ca\u5176\u4ed6\u5404\u7c7b\u89c4\u5219\u7684\u53d8\u66f4\uff0c\u60a8\u6709\u6743\u7acb\u5373\u505c\u6b62\u4f7f\u7528bilibili\u63d0\u4f9b\u7684\u670d\u52a1\u3002\u5982\u60a8\u7ee7\u7eed\u4f7f\u7528\u672c\u7f51\u7ad9\u7684\u7968\u52a1\u670d\u52a1\uff0c\u5373\u8868\u793a\u60a8\u5df2\u63a5\u53d7\u7ecf\u4fee\u8ba2\u6216\u589e\u8865\u7684\u534f\u8bae\u53ca\u5176\u4ed6\u5404\u7c7b\u89c4\u5219\u3002\u9664\u672c\u7f51\u7ad9\u53e6\u884c\u660e\u786e\u58f0\u660e\u5916\uff0c\u4efb\u4f55\u4f7f\u201c\u670d\u52a1\u201d\u8303\u56f4\u6269\u5927\u6216\u529f\u80fd\u589e\u5f3a\u7684\u65b0\u5185\u5bb9\u5747\u53d7\u672c\u534f\u8bae\u7ea6\u675f\u3002")])])]), e("p", [e("strong", [t._v("\u7b2c\u4e00\u6761 \u603b\u5219")])]), e("p", [t._v("\u672c\u7f51\u7ad9\u6839\u636e\u5b9e\u9645\u60c5\u51b5\u63d0\u4f9b\u4e0b\u5217\u670d\u52a1\uff1a")]), e("ul", [e("li", [t._v("\n              1.\n              \u63d0\u4f9b\u6f14\u51fa\u3001\u5c55\u4f1a\u3001\u672c\u5730\u751f\u6d3b\u7b49\u7968\u54c1\u7684\u9500\u552e\u3001\u9884\u8ba2\u3001\u5728\u7ebf\u9009\u5ea7\u3001\u77ed\u4fe1/\u90ae\u4ef6\u901a\u77e5\u7b49\u670d\u52a1\u3002\n            ")]), e("li", [t._v("2. \u63d0\u4f9b\u5728\u7ebf\u5ba2\u670d\u3001\u8d44\u8baf\u4fe1\u606f\u3001\u95ee\u7b54\u8bc4\u8bba\u7b49\u670d\u52a1\u3002")])]), e("p", [e("strong", [t._v("\u9664\u4ee5\u4e0a\u672c\u7f51\u7ad9\u63d0\u4f9b\u670d\u52a1\u5185\u5bb9\u5916\uff0c\u5176\u4f59\u9879\u76ee\u5ba1\u6279\uff0c\u5185\u5bb9\u8bbe\u8ba1\u3001\u573a\u5730\u5b89\u6392\u3001\u5609\u5bbe\u9080\u8bf7\u7b49\u73af\u8282\u7686\u7531\u9879\u76ee\u4e3b\u529e\u65b9\u8d1f\u8d23\u3002\u5728\u5404\u9879\u76ee\u5f00\u59cb\u552e\u7968\u524d\uff0c\u5404\u9879\u76ee\u7684\u4e3b\u529e\u65b9/\u627f\u529e\u65b9\u5c65\u884c\u76f8\u5e94\u884c\u653f\u5ba1\u6279\u624b\u7eed\u3001\u76f8\u5173\u8bc1\u7167\u53ca\u8d44\u8d28\u6587\u4ef6\u529e\u7406\u4e49\u52a1\u3002\u8bf7\u60a8\u6ce8\u610f\uff0c\u5bf9\u4e8e\u4e0d\u5c5e\u4e8ebilibil\u4e3b\u529e\u7684\u9879\u76ee\uff0cbilibili\u5e76\u65e0\u80fd\u529b\u5b8c\u5168\u8fa8\u522b\u51fa\u8d44\u6599\u6587\u4ef6\u7684\u771f\u4f2a\uff0cbilibili\u4ec5\u4f5c\u4e3a\u60a8\u9009\u62e9\u9879\u76ee\u7c7b\u578b\u3001\u8d2d\u4e70\u7968\u54c1\u4ee5\u53ca\u83b7\u53d6\u9879\u76ee\u76f8\u5173\u5ba3\u4f20\u4fe1\u606f\u7684\u6e20\u9053\uff0c\u65e0\u6cd5\u4fdd\u8bc1\u6216\u63a7\u5236\u9879\u76ee\u7684\u5982\u671f\u4e3e\u884c\u6216\u8d28\u91cf\u3002")])]), e("p", [e("strong", [t._v("\u7b2c\u4e8c\u6761 \u7528\u6237\u4fe1\u606f")])]), e("ul", [e("li", [t._v("\n              1.\n              \u4e3a\u4fbf\u4e8e\u53ca\u65f6\u5411\u60a8\u63d0\u4f9b\u670d\u52a1\uff0c\u60a8\u4fdd\u8bc1\u5411\u672c\u7f51\u7ad9\u6240\u63d0\u4f9b\u7684\u8d44\u6599\u771f\u5b9e\u3001\u51c6\u786e\u3001\u5b8c\u6574\u3001\u5408\u6cd5\u6709\u6548\u5e76\u53ca\u65f6\u66f4\u65b0\u3002"), e("strong", [t._v("\u5982\u60a8\u63d0\u4f9b\u7684\u8d44\u6599\u4e0d\u5408\u6cd5\u3001\u4e0d\u771f\u5b9e\u3001\u4e0d\u51c6\u786e\u3001\u4e0d\u8be6\u5c3d\u7684\uff0c\u60a8\u9700\u81ea\u884c\u627f\u62c5\u56e0\u6b64\u4ea7\u751f\u7684\u76f8\u5e94\u8d23\u4efb\u53ca\u540e\u679c\uff0cbilibili\u6709\u6743\u91c7\u53d6\u62d2\u7edd\u3001\u7ec8\u6b62\u3001\u5173\u95ed\u8d26\u6237\u3001\u6e05\u9664\u6216\u7f16\u8f91\u5185\u5bb9\u3001\u53d6\u6d88\u8ba2\u5355\u7b49\u64cd\u4f5c\u63aa\u65bd\uff0c\u5e76\u4e0d\u4e88\u4efb\u4f55\u8d54\u507f\u6216\u9000\u8fd8\u8d39\u7528\u3002")])]), e("li", [t._v("2. \u7968\u52a1\u670d\u52a1\u5e73\u53f0\u4f7f\u7528\u7684\u662f\u60a8\u5728bilibili\u5e73\u53f0\u7684\u8d26\u53f7\u53ca\u5bc6\u7801\u3002")])]), e("p", [t._v("\n            \u8bf7\u59a5\u5584\u4fdd\u7ba1\u597d\u60a8\u7684\u8d26\u53f7\u53ca\u5bc6\u7801\uff0c\u52a0\u5f3a\u5bc6\u7801\u5b89\u5168\u6027\uff0c\u8c28\u9632\u6cc4\u9732\u6216\u88ab\u76d7\u3002"), e("strong", [t._v("\u5f53\u60a8\u7684\u8d26\u53f7\u6216\u5bc6\u7801\u906d\u5230\u672a\u7ecf\u6388\u6743\u7684\u4f7f\u7528\u65f6\uff0c\u60a8\u5e94\u5f53\u7acb\u5373\u901a\u77e5bilibili\uff0c\u5426\u5219\u672a\u7ecf\u6388\u6743\u7684\u4f7f\u7528\u884c\u4e3a\u5747\u89c6\u4e3a\u60a8\u672c\u4eba\u7684\u884c\u4e3a\u3002")]), t._v("\u5f53\u60a8\u7684\u8d26\u6237\u9047\u5230\u4e89\u8bae\u65f6\uff08\u4f8b\u5982\u6302\u5931\u6216\u91cd\u7f6e\u5bc6\u7801\u7b49\uff09\uff0c\u6211\u4eec\u6709\u6743\u6839\u636e\u60a8\u7684\u6ce8\u518c\u548c\u7ed1\u5b9a\u4fe1\u606f\u5bf9\u60a8\u7684\u8eab\u4efd\u8fdb\u884c\u8bc6\u522b\u3002\u4f46\u5728\u76ee\u524d\u7684\u6280\u672f\u6c34\u5e73\u4e0b\uff0c\u6211\u4eec\u6240\u80fd\u91c7\u53d6\u7684\u65b9\u6cd5\u6709\u9650\uff0c\u4e14\u5728\u7f51\u7edc\u4e0a\u8fdb\u884c\u7528\u6237\u8eab\u4efd\u8bc6\u522b\u5b58\u5728\u4e00\u5b9a\u7684\u56f0\u96be\uff0c\u56e0\u6b64\uff0c\u6211\u4eec\u5bf9\u9274\u5b9a\u7528\u6237\u8eab\u4efd\u7684\u51c6\u786e\u6027\u548c\u7edd\u5bf9\u771f\u5b9e\u6027\u4e0d\u505a\u4efb\u4f55\u4fdd\u8bc1\uff0c\u60a8\u9700\u5bf9\u5728\u60a8\u8d26\u6237\u9879\u4e0b\u53d1\u751f\u7684\u6240\u6709\u884c\u4e3a\u8d1f\u8d23\u3002\n          ")]), e("ul", [e("li", [e("strong", [t._v("3.\n                \u60a8\u540c\u610fbilibili\u62e5\u6709\u901a\u8fc7\u90ae\u4ef6\u3001\u77ed\u4fe1\u3001\u7535\u8bdd\u7b49\u5f62\u5f0f\uff0c\u5411\u5728\u672c\u7f51\u7ad9\u8d2d\u7968\u7684\u7528\u6237\u3001\u6536\u8d27\u4eba\u8fdb\u884c\u8054\u7cfb\u6216\u53d1\u9001\u8ba2\u5355\u4fe1\u606f\u3001\u4fc3\u9500\u6d3b\u52a8\u7b49\u544a\u77e5\u4fe1\u606f\u7684\u6743\u5229\u3002\u5982\u60a8\u5728bilibili\u4f7f\u7528\u8d2d\u7968\u53ca\u76f8\u5173\u5176\u4ed6\u670d\u52a1\uff0c\u5219\u8868\u660e\u60a8\u5df2\u540c\u610f\u63a5\u6536\u8be5\u7b49\u4fe1\u606f\u3002")])])]), e("p", [e("strong", [t._v("\u7b2c\u4e09\u6761 \u670d\u52a1\u7ec6\u5219")])]), e("ul", [e("li", [t._v("1. \u5546\u54c1\u4fe1\u606f\u53d8\u52a8\u89c4\u5219\uff1a")])]), e("p", [t._v("\n            \u4e3a\u8868\u8ff0\u4fbf\u5229\uff0c\u7968\u54c1\u548c\u670d\u52a1\u7b80\u79f0\u4e3a\u201c\u5546\u54c1\u201d\uff0c\u6f14\u51fa/\u8d5b\u4e8b/\u5c55\u89c8\u7b49\u7b80\u79f0\u4e3a\u201c\u9879\u76ee\u201d\u3002\u672c\u7f51\u7ad9\u4e0a\u7684\u5546\u54c1\u4ef7\u683c\u3001\u6570\u91cf\u3001\u662f\u5426\u6709\u8d27\u7b49\u4fe1\u606f\u968f\u65f6\u90fd\u6709\u53ef\u80fd\u53d1\u751f\u53d8\u52a8\uff0c\u672c\u7f51\u7ad9\u4e0d\u4f5c\u7279\u522b\u901a\u77e5\u3002\u7531\u4e8e\u672c\u7f51\u7ad9\u4e0a\u5546\u54c1\u4fe1\u606f\u7684\u6570\u91cf\u6781\u5176\u5e9e\u5927\uff0c\u5c3d\u7ba1\u672c\u7f51\u7ad9\u4f1a\u5c3d\u6700\u5927\u52aa\u529b\u4fdd\u8bc1\u60a8\u6240\u6d4f\u89c8\u5546\u54c1\u4fe1\u606f\u7684\u51c6\u786e\u6027\uff0c\u4f46\u7531\u4e8e\u4e92\u8054\u7f51\u6280\u672f\u56e0\u7d20\u7b49\u5ba2\u89c2\u539f\u56e0\u5b58\u5728\uff0c"), e("strong", [t._v("\u672c\u7f51\u7ad9\u7f51\u9875\u663e\u793a\u7684\u4fe1\u606f\u53ef\u80fd\u4f1a\u6709\u4e00\u5b9a\u7684\u6ede\u540e\u6027\u6216\u5dee\u9519\u3002")])]), e("ul", [e("li", [t._v("2. \u5546\u54c1\u7f3a\u8d27\u6216\u53d8\u66f4\u89c4\u5219\uff1a")])]), e("p", [t._v("\n            \u7531\u4e8e\u5e02\u573a\u53d8\u5316\u53ca\u5404\u79cd\u4ee5\u5408\u7406\u5546\u4e1a\u52aa\u529b\u96be\u4ee5\u63a7\u5236\u56e0\u7d20\u7684\u5f71\u54cd\uff0c"), e("strong", [t._v("\u672c\u7f51\u7ad9\u65e0\u6cd5\u627f\u8bfa\u60a8\u901a\u8fc7\u63d0\u4ea4\u8ba2\u5355\u6240\u5e0c\u671b\u8d2d\u4e70\u7684\u5546\u54c1\uff08\u5305\u62ec\u5e76\u4e0d\u9650\u4e8e\u5728\u552e\u3001\u9884\u8ba2\u3001\u9884\u552e\u5546\u54c1\uff09\u90fd\u4f1a\u6709\u8d27\u6216\u4e0d\u4f1a\u51fa\u73b0\u53d8\u66f4\u3002")]), t._v("\u5982\u679c\u60a8\u8ba2\u8d2d\u7684\u5546\u54c1\u53d1\u751f\u7f3a\u8d27\uff0c\u6216\u51fa\u73b0\u6f14\u51fa\u6d3b\u52a8\u53d8\u66f4\u3001\u53d6\u6d88\u7b49\u60c5\u51b5\uff0c\u60a8\u548cbilibili\u7686\u6709\u6743\u53d6\u6d88\u8be5\u8ba2\u5355\u3002\u60a8\u4e5f\u53ef\u9009\u62e9\u66f4\u6362\u4e3a\u5176\u5b83\u5546\u54c1\uff0c\u56e0\u66f4\u6362\u5546\u54c1\u4ea7\u751f\u8d27\u6b3e\u5dee\u989d\u65f6\uff0c\u5e94\u6309\u591a\u9000\u5c11\u8865\u539f\u5219\u5904\u7406\u3002\u672c\u7f51\u7ad9\u9700\u5168\u989d\u6216\u5dee\u989d\u5411\u60a8\u9000\u6b3e\u65f6\uff0c\u5c06\u4e8e\u8ba2\u5355\u53d6\u6d88\u64cd\u4f5c\u5b8c\u6210\u6216\u60a8\u786e\u8ba4\u66f4\u6362\u5546\u54c1\u64cd\u4f5c\u5b8c\u6210\u4e4b\u65e5\u8d77\u768410\u4e2a\u5de5\u4f5c\u65e5\u5185\u4e3a\u60a8\u529e\u7406\u9000\u56de\u8ba2\u5355\u76f8\u5e94\u6b3e\u9879\u64cd\u4f5c\u3002\n          ")]), e("p", [e("strong", [t._v("\u5bf9\u4e8e\u4e0a\u8ff0\u5546\u54c1\u53d8\u52a8\u3001\u7f3a\u8d27\u6216\u53d8\u66f4\u89c4\u5219\u8bf7\u60a8\u77e5\u6089\u5e76\u7406\u89e3\u4e14\u540c\u610f\u4e0d\u4f1a\u56e0\u6b64\u8ffd\u7a76\u672c\u7f51\u7ad9\u7684\u8d23\u4efb\u3002")])]), e("ul", [e("li", [t._v("3. \u8ba2\u5355\u89c4\u5219\uff1a")])]), e("p", [t._v("\n            \uff081\uff09\u672c\u7f51\u7ad9\u5c06\u901a\u8fc7\u9879\u76ee\u5c55\u793a\u9875\u5411\u60a8\u63d0\u4f9b\u9879\u76ee\u7684\u57fa\u672c\u4fe1\u606f\uff0c\u8bf7\u5728\u8d2d\u7968\u524d\u4ed4\u7ec6\u9605\u8bfb\uff0c\u5982\u6709\u7591\u95ee\u8bf7\u4e0e\u5ba2\u670d\u4eba\u5458\u8054\u7cfb\u786e\u8ba4\u540e\u8d2d\u4e70\u3002\n          ")]), e("p", [t._v("\n            \uff082\uff09"), e("strong", [t._v("\u60a8\u5728\u4e0b\u8ba2\u5355\u524d\uff0c\u8bf7\u4ed4\u7ec6\u9605\u8bfb\u6240\u8ba2\u8d2d\u9879\u76ee\u5c55\u793a\u9875\u4e2d\u7684\u5168\u90e8\u4fe1\u606f\uff0c\u786e\u8ba4\u5df2\u5168\u9762\u4e86\u89e3\u5e76\u8ba4\u540c\u8be5\u7b49\u4fe1\u606f\u3002")]), t._v("\u60a8\u987b\u586b\u5199\u5e0c\u671b\u8d2d\u4e70\u7684\u5546\u54c1\u6570\u91cf\u3001\u786e\u8ba4\u4ef7\u6b3e\u53ca\u652f\u4ed8\u65b9\u5f0f\u3001\u6536\u8d27\u4eba\u3001\u8054\u7cfb\u7535\u8bdd\u3001\u6536\u8d27\u65b9\u5f0f\u3001\u6536\u8d27\u5730\u5740\u3001\u8eab\u4efd\u8bc1\u53f7\u7801\u7b49\u5185\u5bb9\uff0c\u5177\u4f53\u4ee5\u5546\u54c1\u9875\u9762\u5c55\u793a\u4e3a\u51c6\u3002\n          ")]), e("p", [t._v("\n            \uff083\uff09\u60a8\u5728\u672c\u7f51\u7ad9\u6210\u529f\u63d0\u4ea4\u8ba2\u5355\u5e76\u5b8c\u6210\u4ed8\u6b3e\u4e4b\u65f6\uff0c\u5408\u540c\u5173\u7cfb\u6210\u7acb\u3002\u5728\u60a8\u4e0b\u5355\u540e\u5b8c\u6210\u4ed8\u6b3e\u524d\uff0c\u5efa\u8bae\u60a8\u518d\u6b21\u786e\u8ba4\u6240\u8ba2\u8d2d\u7684\u7968\u54c1\u9879\u76ee\u4fe1\u606f\u662f\u5426\u7b26\u5408\u9884\u671f\uff0c\u5982\u4e0d\u7b26\u5408\u9884\u671f\u8bf7\u653e\u5f03\u652f\u4ed8\u3002\n            "), e("strong", [t._v("\u82e5\u60a8\u5728\u6210\u529f\u63d0\u4ea4\u8ba2\u5355\u540e\u7684\u89c4\u5b9a\u65f6\u95f4\u5185\u672a\u80fd\u5b8c\u6210\u4ed8\u6b3e\uff0c\u7cfb\u7edf\u5c06\u81ea\u52a8\u53d6\u6d88\u8be5\u8ba2\u5355\uff0c\u60a8\u4e0e\u672c\u7f51\u7ad9\u53cc\u65b9\u5747\u65e0\u9700\u5411\u5bf9\u65b9\u627f\u62c5\u4efb\u4f55\u8d23\u4efb\u3002")])]), e("p", [t._v("\n            \uff084\uff09\u8ba2\u5355\u4e2d\u8ba2\u8d2d\u591a\u79cd\u5546\u54c1\u987b\u5206\u6279\u53d1\u51fa\u65f6\uff0c\u60a8\u53ef\u968f\u65f6\u767b\u9646\u5728\u672c\u7f51\u7ad9\u7684\u8d26\u6237\uff0c\u67e5\u8be2\u60a8\u7684\u8ba2\u5355\u72b6\u6001\uff0c\u6216\u901a\u8fc7\u54a8\u8be2\u5728\u7ebf\u5ba2\u670d\u67e5\u8be2\u3002\n          ")]), e("ul", [e("li", [t._v("4. \u9879\u76ee\u5ef6\u8fdf\u6216\u53d6\u6d88")])]), e("p", [t._v("\n            \u793e\u4f1a\u56e0\u7d20\u548c\u81ea\u7136\u56e0\u7d20\u5bf9\u4e8e\u9879\u76ee\u7684\u4e3e\u529e\u5177\u6709\u51b3\u5b9a\u6027\u7684\u5f71\u54cd\uff0c\u53d7\u8be5\u7c7b\u4e0d\u53ef\u6297\u529b\u56e0\u7d20\u5f71\u54cd\uff0c\u9879\u76ee\u6709\u53ef\u80fd\u4f1a\u53d6\u6d88\u6216\u5ef6\u8fdf\u4e3e\u529e\u3002"), e("strong", [t._v("\u4e00\u65e6\u53d1\u751f\u6b64\u7c7b\u60c5\u51b5\uff0c\u672c\u7f51\u7ad9\u5c06\u4e3b\u52a8\u901a\u77e5\u60a8\u89e3\u51b3\u65b9\u6848\uff0c\u4e14\u4e0d\u4f1a\u5411\u60a8\u6536\u53d6\u4efb\u4f55\u989d\u5916\u8d39\u7528\uff0c\u60a8\u786e\u8ba4\u6211\u4eec\u65e0\u987b\u5bf9\u60a8\u6216\u4efb\u4f55\u7b2c\u4e09\u65b9\u627f\u62c5\u4efb\u4f55\u8d23\u4efb\u3002")])]), e("ul", [e("li", [t._v("5. \u914d\u9001\u53ca\u8d39\u7528\u89c4\u5219\uff1a")])]), e("p", [t._v("\n            \u60a8\u53ef\u4ee5\u5728\u4e0b\u8ba2\u5355\u65f6\u9009\u62e9\u901a\u8fc7\u5feb\u9012\u914d\u9001\u3001\u7535\u5b50\u5238\u73b0\u573a\u5151\u6362\u7b49\u591a\u79cd\u65b9\u5f0f\uff08\u5177\u4f53\u4ee5\u5546\u54c1\u9875\u9762\u5c55\u793a\u4e3a\u51c6\uff09\u83b7\u5f97\u8ba2\u8d2d\u7684\u5546\u54c1\u3002\u7535\u5b50\u5238\u73b0\u573a\u5151\u6362\u4e0d\u6d89\u53ca\u9001\u8d27\u548c\u8fd0\u8d39\u3002\u5982\u60a8\u9009\u62e9\u5feb\u9012\u914d\u9001\u65b9\u5f0f\u65f6\uff0c\u5546\u54c1\u914d\u9001\u8fd0\u8d39\u7531\u60a8\u627f\u62c5\uff0c\u8bf7\u60a8\u51c6\u786e\u5730\u586b\u5199\u6536\u8d27\u4eba\u7684\u771f\u5b9e\u59d3\u540d\u3001\u6536\u8d27\u5730\u5740\u3001\u8054\u7cfb\u65b9\u5f0f\u3001\u8eab\u4efd\u8bc1\u53f7\u7801\u7b49\u5185\u5bb9\u3002"), e("strong", [t._v("\u82e5\u6536\u8d27\u4eba\u4e0e\u60a8\u672c\u4eba\u4e0d\u4e00\u81f4\u7684\uff0c\u6536\u8d27\u4eba\u7684\u884c\u4e3a\u548c\u610f\u601d\u8868\u793a\u89c6\u4e3a\u60a8\u7684\u884c\u4e3a\u548c\u610f\u601d\u8868\u793a\uff0c\u60a8\u5e94\u5bf9\u6536\u8d27\u4eba\u7684\u884c\u4e3a\u53ca\u610f\u601d\u8868\u793a\u7684\u6cd5\u5f8b\u540e\u679c\u627f\u62c5\u8fde\u5e26\u8d23\u4efb\u3002\u56e0\u4ee5\u4e0b\u60c5\u51b5\u9020\u6210\u5546\u54c1\u914d\u9001\u5ef6\u8fdf\u6216\u65e0\u6cd5\u914d\u9001\u7b49\uff0c\u672c\u7f51\u7ad9\u5c06\u4e0d\u627f\u62c5\u76f8\u5173\u8d23\u4efb\uff1a")])]), e("p", [e("strong", [t._v("(1) \u7531\u4e8e\u60a8\u63d0\u4f9b\u4e86\u9519\u8bef\u4fe1\u606f\u6216\u4e0d\u8be6\u7ec6\u7684\u5730\u5740\uff1b")])]), e("p", [e("strong", [t._v("(2)\n              \u7531\u4e8e\u8d27\u7269\u9001\u8fbe\u65f6\u65e0\u4eba\u7b7e\u6536\uff0c\u800c\u9020\u6210\u7684\u91cd\u590d\u914d\u9001\u6240\u4ea7\u751f\u7684\u8d39\u7528\u53ca\u76f8\u5173\u7684\u540e\u679c\uff1b")])]), e("p", [e("strong", [t._v("(3)\n              \u7531\u4e8e\u4e0d\u53ef\u6297\u529b\u56e0\u7d20\u5bfc\u81f4\u7684\uff0c\u4f8b\u5982\uff1a\u81ea\u7136\u707e\u5bb3\u3001\u4ea4\u901a\u6212\u4e25\u3001\u7a81\u53d1\u6218\u4e89\u7b49\u3002")])]), e("p", [t._v("6. \u9000\u6362\u7968\u653f\u7b56\uff1a")]), e("p", [t._v("\uff081\uff09\u975e\u4e2a\u4eba\u539f\u56e0\u9000\u6362\u7968")]), e("p", [t._v("\n            \u5982\u56e0\u6d3b\u52a8\u53d8\u66f4\u3001\u6d3b\u52a8\u53d6\u6d88\u3001\u7968\u54c1\u9519\u8bef\u7684\u539f\u56e0\u53d1\u751f\u9000\u6362\u8d27\uff0c\u4ea7\u751f\u7684\u9000\u6362\u8d27\u914d\u9001\u8fd0\u8d39\u7531\u672c\u7f51\u7ad9\u627f\u62c5\uff0c\u60a8\u53d1\u51fa\u5feb\u9012\u540e\u53ef\u8054\u7cfb\u672c\u7f51\u7ad9\u5ba2\u670d\u4eba\u5458\uff0c"), e("strong", [t._v("\u975e\u4e0a\u8ff0\u539f\u56e0\u4ea7\u751f\u9000\u6362\u8d27\u7684\u914d\u9001\u8fd0\u8d39\u7531\u60a8\u81ea\u884c\u627f\u62c5\u3002")])]), e("p", [t._v("\uff082\uff09\u7528\u6237\u81ea\u8eab\u539f\u56e0\u9000\u6362\u7968\uff1a")]), e("p", [t._v("\n            \u56e0\u5404\u7c7b\u7968\u54c1\u5177\u6709\u7a00\u7f3a\u6027\u53ca\u65f6\u6548\u6027\u7b49\u7279\u6b8a\u6027\u8d28\uff0c\u4efb\u4f55\u9000\u6362\u7968\u884c\u4e3a\u90fd\u5c06\u5f71\u54cd\u5267\u573a\u65b9\u3001\u9879\u76ee\u4e3b\u529e\u65b9\u53ca\u5176\u4ed6\u89c2\u4f17\u7684\u6b63\u5f53\u6743\u76ca\u3002"), e("strong", [t._v("\u60a8\u7406\u89e3\u5e76\u8ba4\u53ef\uff0c\u6240\u6709\u7968\u54c1\u5747\u4e0d\u9002\u75287\u5929\u65e0\u7406\u7531\u9000\u8d27\u653f\u7b56\uff0c\u8bf7\u60a8\u5728\u8d2d\u4e70\u65f6\u52a1\u5fc5\u4ed4\u7ec6\u6838\u5bf9\u60a8\u7684\u8ba2\u5355\u4fe1\u606f\u5e76\u4f9d\u636e\u60a8\u7684\u5b9e\u9645\u60c5\u51b5\u5ba1\u614e\u4e0b\u5355\u3002")])]), e("p", [t._v("\n            \uff083\uff09\u6839\u636e\u6f14\u51fa/\u5c55\u89c8/\u672c\u5730\u751f\u6d3b\u5404\u9879\u76ee\u7684\u4e3b\u529e\u65b9\u7684\u4e0d\u540c\u8981\u6c42\uff0c"), e("strong", [t._v("\u5e76\u975e\u6240\u6709\u9879\u76ee\u4e3b\u529e\u65b9\u90fd\u652f\u6301\u56e0\u7528\u6237\u539f\u56e0\u53d1\u8d77\u7684\u9000\u7968\uff0c\u5177\u4f53\u8bf7\u4ee5\u5404\u9879\u76ee\u5c55\u793a\u9875\u8bf4\u660e\u4fe1\u606f\u4e3a\u51c6\u3002")])]), e("p", [t._v("\n            \uff084\uff09"), e("strong", [t._v("\u5bf9\u4e8e\u4e3b\u529e\u65b9\u652f\u6301\u56e0\u7528\u6237\u539f\u56e0\u53d1\u751f\u7684\u9000\u7968\u9879\u76ee\u3002\u7531\u4e8e\u60a8\u7684\u9000\u7968\u884c\u4e3a\u5c06\u4f1a\u7ed9\u672c\u7f51\u7ad9\u3001\u5267\u573a\u65b9\u3001\u4e3b\u529e\u65b9\u9020\u6210\u4e0d\u540c\u7a0b\u5ea6\u7684\u635f\u5931\uff0c\u6545\u672c\u7f51\u7ad9\u53ca\u5267\u573a\u65b9\u3001\u4e3b\u529e\u65b9\u7b49\u5c06\u4f9d\u636e\u60a8\u7533\u8bf7\u9000\u7968\u6240\u9020\u6210\u7684\u4e8c\u6b21\u9500\u552e\u6210\u672c\u53ca\u635f\u5931\u5411\u60a8\u6536\u53d6\u4e00\u5b9a\u6bd4\u4f8b\u7684\u9000\u7968\u624b\u7eed\u8d39\uff08\u5feb\u9012\u8d39\u7528\u9664\u5916\uff09\uff0c\u5177\u4f53\u8d39\u7528\u6807\u51c6\u5982\u4e0b\u8868\u3002\u5bf9\u4e8e\u4e0d\u652f\u6301\u7528\u6237\u539f\u56e0\u9000\u7968\u7684\u9879\u76ee\uff0c\u8bf7\u60a8\u81ea\u884c\u6309\u9700\u5904\u7406\u7968\u54c1\u3002")])]), e("table", {
                attrs: {
                    border: "1",
                    cellspacing: "0",
                    cellpadding: "6"
                }
            }, [e("thead", [e("tr", [e("th", {
                attrs: {
                    colspan: "5"
                }
            }, [t._v("\u9000\u7968\u65f6\u95f4\u53ca\u624b\u7eed\u8d39\u6536\u53d6\u6807\u51c6\u660e\u7ec6")])]), e("tr", [e("th", [t._v("\u7968\u54c1\u72b6\u6001")]), e("th", [t._v("\u79cd\u7c7b")]), e("th", [t._v("\u7533\u8bf7\u9000\u7968\u65e5\u671f")]), e("th", [t._v("\u624b\u7eed\u8d39")]), e("th", [t._v("\u9000\u7968\u6807\u51c6")])])]), e("tbody", [e("tr", [e("td", [t._v("\u9884\u552e/\u9884\u5b9a")]), e("td", {
                attrs: {
                    rowspan: "7"
                }
            }, [t._v("\u6f14\u51fa")]), e("td", [t._v("\u9884\u552e/\u9884\u5b9a")]), e("td", [t._v("0")]), e("td", {
                attrs: {
                    rowspan: "7"
                }
            }, [e("strong", [t._v("\u624b\u7eed\u8d39\u5c06\u4f9d\u636e\u7528\u6237\u5b9e\u9645\u8d2d\u7968\u91d1\u989d\u6309\u6bd4\u4f8b\u6263\u9664\uff08\u540c\u4e00\u7528\u6237\u540c\u4e00\u9879\u76ee\u7533\u8bf7\u9000\u7968\u4e0d\u5f97\u8d85\u8fc72\u5f20\uff09")])])]), e("tr", [e("td", {
                attrs: {
                    rowspan: "6"
                }
            }, [t._v("\u5f00\u59cb\u552e\u7968")]), e("td", [t._v("\u8ddd\u79bb\u6f14\u51fa\u5f00\u59cb\u65e5\u671f>45\u5929")]), e("td", [t._v("10%")])]), e("tr", [e("td", [t._v("\u8ddd\u79bb\u6f14\u51fa\u5f00\u59cb\u65e5\u671f>30-45\u5929\uff08\u542b45\u5929\uff09")]), e("td", [t._v("20%")])]), e("tr", [e("td", [t._v("\u8ddd\u79bb\u6f14\u51fa\u5f00\u59cb\u65e5\u671f>20-30\u5929\uff08\u542b30\u5929\uff09")]), e("td", [t._v("30%")])]), e("tr", [e("td", [t._v("\u8ddd\u79bb\u6f14\u51fa\u5f00\u59cb\u65e5\u671f>10-20\u5929\uff08\u542b20\u5929\uff09")]), e("td", [t._v("50%")])]), e("tr", [e("td", [t._v("\u8ddd\u79bb\u6f14\u51fa\u5f00\u59cb\u65e5\u671f>3-10\u5929\uff08\u542b10\u5929\uff09")]), e("td", [t._v("60%")])]), e("tr", [e("td", [t._v("\u8ddd\u79bb\u6f14\u51fa\u5f00\u59cb\u65e5\u671f\u5929\u22643\u5929")]), e("td", [t._v("80%")])])]), e("tbody", [e("tr", [e("td", [t._v("\u9884\u552e/\u9884\u8ba2")]), e("td", {
                attrs: {
                    rowspan: "3"
                }
            }, [t._v("\u5c55\u4f1a")]), e("td", [t._v("\u9884\u552e/\u9884\u8ba2")]), e("td", [t._v("0")]), e("td", {
                attrs: {
                    rowspan: "3"
                }
            }, [e("strong", [t._v("\u624b\u7eed\u8d39\u5c06\u4f9d\u636e\u7528\u6237\u5b9e\u9645\u8d2d\u7968\u5f20\u6570\u6263\u9664\uff0c\u6bcf\u5f205\u5143")])])]), e("tr", [e("td", {
                attrs: {
                    rowspan: "2"
                }
            }, [t._v("\u5f00\u59cb\u552e\u7968")]), e("td", [t._v("\u8ddd\u79bb\u5c55\u89c8\u5f00\u59cb\u65e5\u671f\uff1e7\u5929")]), e("td", [t._v("0")])]), e("tr", [e("td", [t._v("\u8ddd\u79bb\u5c55\u89c8\u5f00\u59cb\u65e5\u671f\u22647\u5929")]), e("td", [t._v("5\u5143")])])])]), e("p", [t._v("\uff085\uff09\u9000\u7968\u7533\u8bf7\u6b65\u9aa4")]), e("p", [t._v("\n            \u4e3a\u5c3d\u91cf\u51cf\u5c11\u56e0\u9000\u7968\u7ed9\u60a8\u9020\u6210\u7684\u635f\u5931\uff0c\u8bf7\u5728\u51b3\u5b9a\u9000\u7968\u540e\u7b2c\u4e00\u65f6\u95f4\u7535\u8bdd\u8054\u7cfb\u5ba2\u670d\u544a\u77e5\u9000\u7968\u610f\u5411\uff0c"), e("strong", [t._v("\u53ea\u6709\u8ba2\u7968\u4eba\uff08\u5373\u4e0b\u5355\u4eba\uff09\u53ef\u4ee5\u53d1\u8d77\u9000\u7968\u7533\u8bf7")]), t._v("\u3002\n          ")]), e("p", [t._v("\n            \u5bf9\u4e8e\u7eb8\u8d28\u7968\u7684\u9000\u7968\u7533\u8bf7\uff0c\u5982\u60a8\u544a\u77e5\u9000\u7968\u610f\u5411\u65f6\u7eb8\u8d28\u7968\u5e76\u672a\u8fdb\u5165\u914d\u9001\u6d41\u7a0b\uff0c\u5219"), e("strong", [t._v("\u7535\u8bdd\u544a\u77e5\u65f6\u5373\u4e3a\u7533\u8bf7\u9000\u7968\u65e5\u671f")]), t._v("\uff1b\u5982\u60a8\u544a\u77e5\u9000\u7968\u610f\u5411\u65f6\u7eb8\u8d28\u7968\u5df2\u8fdb\u5165\u914d\u9001\u6d41\u7a0b\uff0c\u5219\u60a8\u5e94\u6309\u5ba2\u670d\u63d0\u793a\u5c3d\u65e9\u5c06\u6536\u5230\u7eb8\u8d28\u7968\u9000\u56de\u672c\u7f51\u7ad9\u6307\u5b9a\u5730\u5740\uff0c"), e("strong", [t._v("\u672c\u7f51\u7ad9\u6536\u5230\u6240\u9000\u56de\u7eb8\u8d28\u7968\u7684\u65e5\u671f\uff08\u5177\u4f53\u4ee5\u5feb\u9012\u7b7e\u6536\u5355\u6240\u8f7d\u4e3a\u51c6\uff09\u5373\u4e3a\u60a8\u7533\u8bf7\u9000\u7968\u7684\u65e5\u671f\u3002")]), t._v("\u5bf9\u4e8e\u7535\u5b50\u7968\u7684\u9000\u7968\u7533\u8bf7\uff0c\u5728\u60a8\u544a\u77e5\u6216\u63d0\u4ea4\u7533\u8bf7\u540e\uff0c\u672c\u7f51\u7ad9\u4f1a\u5728\u7b2c\u4e00\u65f6\u95f4\u5c06\u7535\u5b50\u7968\u4f5c\u5e9f\uff0c\u60a8\u7535\u8bdd\u544a\u77e5\u65f6\u5373\u4e3a\u7533\u8bf7\u9000\u7968\u65e5\u671f\uff1b"), e("strong", [t._v("\u82e5\u60a8\u7684\u7535\u5b50\u7968\u5df2\u5151\u6362\u6210\u7eb8\u8d28\u7968\uff0c\u9000\u7968\u6309\u7167\u7eb8\u8d28\u7968\u7684\u9000\u7968\u6d41\u7a0b\u6267\u884c\u3002")])]), e("p", [t._v("\n            \uff086\uff09\u5df2\u4ed8\u6b3e\u8ba2\u5355\u56e0\u5404\u7c7b\u539f\u56e0\u9700\u8981\u5411\u60a8\u9000\u6b3e\u65f6\uff0c\u672c\u7f51\u7ad9\u5c06\u4e8e\u6536\u5230\u60a8\u9000\u56de\u5546\u54c1\uff08\u5df2\u5f00\u53d1\u7968\u7684\uff0c\u4e5f\u5fc5\u987b\u5c06\u53d1\u7968\u4e00\u5e76\u9000\u56de\uff09\u4e4b\u65e5\u8d7710\u4e2a\u5de5\u4f5c\u65e5\u5185\u4e3a\u60a8\u529e\u7406\u9000\u56de\u8ba2\u5355\u76f8\u5e94\u6b3e\u9879\u64cd\u4f5c\uff0c"), e("strong", [t._v("\u60a8\u540c\u610f\u672c\u7f51\u7ad9\u4ece\u60a8\u5df2\u652f\u4ed8\u7684\u6b3e\u9879\u4e2d\u6263\u9664\u5e94\u6536\u53d6\u7684\u8d39\u7528\uff08\u5982\u9000\u7968\u624b\u7eed\u8d39\u3001\u8fd0\u8d39\u7b49\uff09\u540e\u5c06\u4f59\u989d\u6309\u7167\u60a8\u652f\u4ed8\u7684\u65b9\u5f0f\u539f\u8def\u9000\u56de\u60a8\u7684\u8d26\u6237\u3002")])]), e("p", [t._v("7. \u81ea\u52a9\u670d\u52a1\uff1a")]), e("p", [e("strong", [t._v("\u5bf9\u4e8e\u7b26\u5408\u4e00\u5b9a\u6761\u4ef6\u7684\u9879\u76ee\uff0c\u53ef\u652f\u6301\u60a8\u7533\u8bf7\u81ea\u52a9\u670d\u52a1\uff0c\u5305\u62ec\u6362\u7968\u3001\u9000\u7968\u3001\u8f6c\u8d60\u81ea\u52a9\u670d\u52a1\uff0c\u5177\u4f53\u53ef\u652f\u6301\u7533\u8bf7\u81ea\u52a9\u670d\u52a1\u9879\u76ee\u3001\u670d\u52a1\u8303\u56f4\u53ca\u7ed3\u679c\u4ee5\u5404\u9879\u76ee\u5c55\u793a\u9875\u9762\u4e2d\u5b9e\u9645\u4fe1\u606f\u4e3a\u51c6\u3002")])]), e("p", [t._v("\n            \uff081\uff09\u7533\u8bf7\u81ea\u52a9\u6362\u7968\u670d\u52a1\uff1a\u6ee1\u8db3\u540c\u9879\u76ee\u3001\u540c\u4ef7\u683c\u4e14\u65b0\u9009\u7968\u4ef7\u4e3a\u53ef\u552e\u72b6\u6001\u7b49\u6761\u4ef6\uff0c\u60a8\u53ef\u7533\u8bf7\u5728\u4e0d\u540c\u573a\u6b21\u95f4\u81ea\u52a9\u6362\u7968\u4e00\u6b21\u3002\n          ")]), e("p", [t._v("\n            \uff082\uff09\u7533\u8bf7\u81ea\u52a9\u9000\u7968\u670d\u52a1\uff1a\u5982\u9879\u76ee\u652f\u6301\u9000\u7968\uff0c\u60a8\u53ef\u7533\u8bf7\u81ea\u52a9\u9000\u7968\u4e8b\u5b9c\u3002\u9000\u7968\u7533\u8bf7\u5ba1\u6838\u901a\u8fc7\u540e\uff0c\u5c06\u6309\u7167\u9000\u6362\u7968\u653f\u7b56\u4e3a\u60a8\u529e\u7406\u670d\u52a1\u3002\n          ")]), e("p", [t._v("\n            \uff083\uff09\u7533\u8bf7\u81ea\u52a9\u7968\u54c1\u8f6c\u8d60\u670d\u52a1\uff1a\u4f1a\u5458\u8d2d\u201c\u7535\u5b50\u7968\u201d\u754c\u9762\uff0c\u5982\u6709\u8f6c\u8d60\u6309\u94ae\uff0c\u5219\u8be5\u7968\u54c1\u652f\u6301\u8f6c\u8d60\uff0c\u60a8\u53ef\u7533\u8bf7\u81ea\u52a9\u8f6c\u8d60\u4e8b\u5b9c\u3002\n          ")]), e("p", [e("strong", [t._v("\u7b2c\u56db\u6761 \u670d\u52a1\u7684\u53d8\u66f4\u3001\u4e2d\u65ad\u548c\u7ec8\u6b62")])]), e("p", [t._v("\n            1.\n            bilibili\u4fdd\u7559\u6839\u636e\u5b9e\u9645\u60c5\u51b5\u968f\u65f6\u8c03\u6574\u672c\u7f51\u7ad9\u63d0\u4f9b\u7684\u670d\u52a1\u79cd\u7c7b\u3001\u5f62\u5f0f\u7684\u6743\u5229\uff0cbilbili\u4e0d\u627f\u62c5\u56e0\u4e1a\u52a1\u8c03\u6574\u7ed9\u7528\u6237\u9020\u6210\u7684\u635f\u5931\u3002\n          ")]), e("p", [e("strong", [t._v("2.\n              \u5728\u4e0b\u5217\u60c5\u51b5\u4e0b\uff0cbilibili\u53ef\u4ee5\u5728\u53d1\u51fa\u901a\u77e5\u6216\u4e0d\u53d1\u51fa\u901a\u77e5\u7684\u60c5\u51b5\u4e0b\uff0c\u968f\u65f6\u7ec8\u6b62\u5411\u60a8\u63d0\u4f9b\u670d\u52a1\u5e76\u6ce8\u9500\uff08\u4e0d\u518d\u4fdd\u5b58\uff09\u60a8\u5728\u672c\u7ad9\u7684\u6ce8\u518c\u8d26\u6237\u53ca\u76f8\u5173\u7684\u4efb\u4f55\u8d44\u6599\uff0c\u5355\u65b9\u89e3\u9664\u672c\u534f\u8bae\uff1a")])]), e("p", [e("strong", [t._v("(1)\n              \u60a8\u8fdd\u53cd\u672c\u534f\u8bae\u548c/\u6216\u201cbilibili\u670d\u52a1\u6761\u6b3e\u201d\u76f8\u5173\u89c4\u5b9a\u7684\uff0c\u6216\u56e0\u60a8\u8fdd\u53cd\u672c\u534f\u8bae\u548c/\u6216\u201cbilibili\u670d\u52a1\u6761\u6b3e\u201d\u76f8\u5173\u89c4\u5b9a\u88ab\u672c\u7f51\u7ad9\u6682\u505c\u6216\u7ec8\u6b62\u63d0\u4f9b\u670d\u52a1\u540e\uff0c\n              \u60a8\u518d\u4e00\u6b21\u76f4\u63a5\u6216\u95f4\u63a5\u6216\u4ee5\u4ed6\u4eba\u540d\u4e49\u6ce8\u518c\u4e3a\u672c\u7f51\u7ad9\u7528\u6237\u7684\uff1b")])]), e("p", [e("strong", [t._v("(2)\n              \u672c\u7f51\u7ad9\u901a\u8fc7\u7528\u6237\u5728\u672c\u7ad9\u586b\u5199\u7684\u8054\u7cfb\u4fe1\u606f\u8fdb\u884c\u8054\u7cfb\u65f6\uff0c\u53d1\u73b0\u60a8\u7684\u8054\u7cfb\u4fe1\u606f\u5df2\u4e0d\u5b58\u5728\u6216\u65e0\u6cd5\u4f7f\u7528\uff0c\u7ecf\u672c\u7f51\u7ad9\u4ee5\u5176\u5b83\u8054\u7cfb\u65b9\u5f0f\uff08\u5982\u6709\uff09\u901a\u77e5\u60a8\u66f4\u6539\uff0c\u800c\u60a8\u572810\u4e2a\u5de5\u4f5c\u65e5\u5185\u4ecd\u672a\u80fd\u8fdb\u884c\u4fe1\u606f\u66f4\u65b0\u7684\uff1b")])]), e("p", [e("strong", [t._v("(3) \u60a8\u5728\u672c\u7ad9\u4e2d\u586b\u5199\u7684\u4fe1\u606f\u5185\u5bb9\u662f\u865a\u5047\u7684\uff1b")])]), e("p", [e("strong", [t._v("(4) \u672c\u534f\u8bae\u4fee\u6539\u6216\u66f4\u65b0\u65f6\uff0c\u60a8\u4e0d\u613f\u63a5\u53d7\u65b0\u7684\u670d\u52a1\u534f\u8bae\u7684\uff1b")])]), e("p", [e("strong", [t._v("\u7b2c\u4e94\u6761 \u514d\u8d23\u6761\u6b3e")])]), e("p", [e("strong", [t._v("1.\n              \u60a8\u660e\u786e\u7406\u89e3\u5e76\u540c\u610f\uff0cbilibili\u4ec5\u4f5c\u4e3a\u6f14\u51fa/\u8d5b\u4e8b\u9879\u76ee\u7684\u7968\u52a1\u4ee3\u7406\u65b9\uff0c\u4e0d\u627f\u62c5\u9664\u6cd5\u5f8b\u660e\u786e\u89c4\u5b9a\u5916\u7684\u8d23\u4efb\u3002\u82e5\u60a8\u4e0e\u4e3b\u529e\u65b9\u4e4b\u95f4\u51fa\u73b0\u4e89\u8bae\uff0cbilibili\u5c06\u5c3d\u529b\u4e3a\u60a8\u534f\u8c03\u5904\u7406\u4fdd\u969c\u60a8\u7684\u5229\u76ca\uff0c\u4f46\u65e0\u6cd5\u4fdd\u8bc1\u534f\u8c03\u7ed3\u679c\u7b26\u5408\u60a8\u7684\u671f\u671b\uff0cbilibili\u65e0\u6743\u5bf9\u4e89\u8bae\u4f5c\u51fa\u5904\u7406\u3002")])]), e("p", [e("strong", [t._v("2.\n              bilibili\u4e0d\u5bf9\u672c\u7ad9\u7f51\u63d0\u4f9b\u7684\u5546\u54c1\u7684\u9002\u7528\u6027\u6216\u6ee1\u8db3\u60a8\u7279\u5b9a\u9700\u6c42\u548c\u76ee\u7684\u8fdb\u884c\u4efb\u4f55\u660e\u793a\u6216\u8005\u9ed8\u793a\u7684\u62c5\u4fdd\uff0c\u8bf7\u60a8\u5728\u8d2d\u4e70\u524d\u786e\u8ba4\u81ea\u5df1\u7684\u9700\u6c42\uff0c\u540c\u65f6\u4ed4\u7ec6\u9605\u8bfb\u5546\u54c1\u8bf4\u660e\u3002")])]), e("p", [e("strong", [t._v("3.\n              \u5982\u56e0\u60a8\u81ea\u8eab\u539f\u56e0\u4ea7\u751f\u7684\u7968\u54c1\u5feb\u9012\u9519\u8bef\u3001\u4e22\u5931\u3001\u88ab\u76d7\u6216\u635f\u6bc1\u5df2\u8d2d\u7968\u54c1\u7b49\uff0c\u9700\u7531\u60a8\u81ea\u884c\u627f\u62c5\u8d23\u4efb\u3002")])]), e("p", [e("strong", [t._v("4.\n              \u7531\u4e8e\u622a\u56fe\u8f6c\u53d1\u7b49\u5bfc\u81f4\u7535\u5b50\u7968\u6cc4\u9732\u9020\u6210\u7684\u635f\u5931\uff0c\u7531\u60a8\u81ea\u884c\u627f\u62c5\u3002")])]), e("p", [e("strong", [t._v("5.\n              \u672c\u7f51\u7ad9\u7684\u8d23\u4efb\u8303\u56f4\u4ec5\u9650\u4e8e\u4fdd\u8bc1\u7968\u54c1\u672c\u8eab\u7b26\u5408\u56fd\u5bb6\u7684\u6cd5\u5f8b\u3001\u6cd5\u89c4\u7684\u89c4\u5b9a\uff0c\u5982\u53d1\u751f\u9879\u76ee\u53d6\u6d88\u6216\u5ef6\u671f\u7b49\u4e8b\u5b9c\uff0c\u672c\u7f51\u7ad9\u8d1f\u8d23\u534f\u8c03\u60a8\u4e0e\u4e3b\u529e\u4e4b\u95f4\u7684\u76f8\u5173\u4e8b\u5b9c\uff0c\u529e\u7406\u76f8\u5173\u7684\u9000\u7968\u624b\u7eed\u7b49\u3002")])]), e("p", [e("strong", [t._v("6.\n              \u56e0\u4e3b\u529e\u65b9\u6216\u8005\u573a\u9986\u65b9\u7684\u539f\u56e0\u5bfc\u81f4\u60a8\u5df2\u8d2d\u7968\u54c1\u4e0d\u80fd\u5c65\u884c\u76f8\u5e94\u7684\u6743\u5229\uff0c\u5219\u672c\u7f51\u7ad9\u4e0d\u8d1f\u6709\u8d54\u507f\u8d23\u4efb\uff0c\u4f46\u662f\u672c\u7f51\u7ad9\u4f1a\u5c3d\u529b\u534f\u52a9\u60a8\u4e0e\u4e3b\u529e\u65b9\u6216\u8005\u573a\u9986\u65b9\u6c9f\u901a\u534f\u8c03\u76f8\u5173\u4e8b\u5b9c\u3002")])]), e("p", [e("strong", [t._v("7.\n              \u60a8\u9009\u62e9\u7684\u7b2c\u4e09\u65b9\u652f\u4ed8\uff0c\u5728\u652f\u4ed8\u8fc7\u7a0b\u4e2d\u56e0\u60a8\u81ea\u8eab\u539f\u56e0\u6216\u7b2c\u4e09\u65b9\u652f\u4ed8\u5e73\u53f0\u539f\u56e0\u9020\u6210\u7684\u5f02\u5e38\u4f7f\u60a8\u7684\u8d26\u6237\u65e0\u6cd5\u6b63\u5e38\u4f7f\u7528\u6216\u906d\u53d7\u635f\u5931\uff0c\u672c\u7f51\u7ad9\u5bf9\u6b64\u6982\u4e0d\u8d1f\u8d23\uff0c\u4e00\u5207\u635f\u5931\u7531\u60a8\u81ea\u884c\u627f\u62c5\u3002")])]), e("p", [e("strong", [t._v("\u7b2c\u516d\u6761 \u6cd5\u5f8b\u7ba1\u8f96\u548c\u9002\u7528")])]), e("p", [t._v("\n            1.\n            \u672c\u534f\u8bae\u7684\u8ba2\u7acb\u3001\u6267\u884c\u548c\u89e3\u91ca\u53ca\u4e89\u8bae\u7684\u89e3\u51b3\u5747\u5e94\u9002\u7528\u4e2d\u534e\u4eba\u6c11\u5171\u548c\u56fd\u5927\u9646\u5730\u533a\u9002\u7528\u4e4b\u6709\u6548\u6cd5\u5f8b\u3002\n          ")]), e("p", [t._v("\n            2.\n            \u5982\u53d1\u751f\u672c\u534f\u8bae\u4e0e\u9002\u7528\u6cd5\u5f8b\u76f8\u62b5\u89e6\u65f6\uff0c\u5219\u8fd9\u4e9b\u6761\u6b3e\u5c06\u5b8c\u5168\u6309\u6cd5\u5f8b\u89c4\u5b9a\u91cd\u65b0\u89e3\u91ca\uff0c\u5176\u5b83\u90e8\u5206\u7ee7\u7eed\u6709\u6548\u3002\n          ")]), e("p", [e("strong", [t._v("3.\n              \u5982\u53cc\u65b9\u5c31\u672c\u534f\u8bae\u5185\u5bb9\u6216\u5176\u6267\u884c\u53d1\u751f\u4efb\u4f55\u4e89\u8bae\uff0c\u53cc\u65b9\u5e94\u5c3d\u91cf\u53cb\u597d\u534f\u5546\u89e3\u51b3\uff1b\u534f\u5546\u4e0d\u6210\u65f6\uff0c\u4efb\u4f55\u4e00\u65b9\u5747\u5e94\u63d0\u4ea4\u4e0a\u6d77\u4ef2\u88c1\u59d4\u5458\u4f1a\u6309\u7167\u8be5\u4f1a\u4ef2\u88c1\u89c4\u5219\u8fdb\u884c\u4ef2\u88c1\u3002\u4ef2\u88c1\u8bed\u8a00\u4e3a\u4e2d\u6587\u3002\u4ef2\u88c1\u88c1\u51b3\u662f\u7ec8\u5c40\u7684\uff0c\u5bf9\u53cc\u65b9\u5f53\u4e8b\u4eba\u5747\u6709\u7ea6\u675f\u529b\u3002")])])])])])])], 1)
        }
          , St = []
          , Tt = i(51e3)
          , Ot = i(72505)
          , Bt = i(10271)
          , It = i.n(Bt)
          , At = {
            data: function() {
                return {}
            },
            props: {
                orderTermStatus: {
                    type: Boolean,
                    default: !1
                }
            },
            computed: {
                bottomOffset: function() {
                    return Tt.GO ? (0,
                    Ot.U4)(34) : 0
                },
                topOffset: function() {
                    return this.isApp ? Tt.qu ? Tt.qu : Tt.GO ? (0,
                    Ot.U4)(64) : (0,
                    Ot.U4)(20) : 0
                },
                termsHeigth: function() {
                    return "".concat(window.innerHeight - this.topOffset - this.bottomOffset, "px")
                },
                isApp: function() {
                    return It().UA.isBiliApp
                }
            },
            methods: {
                onClose: function() {
                    this.$emit("close")
                },
                cancelOrder: function() {
                    this.$emit("cancel")
                }
            }
        }
          , Pt = At
          , jt = (0,
        k.Z)(Pt, xt, St, !1, null, "4307dcbf", null)
          , Lt = jt.exports
          , Nt = function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                staticClass: "leave-dialog"
            }, [e("transition", {
                attrs: {
                    name: "popup-fade"
                }
            }, [e("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.hygTermsStatus,
                    expression: "hygTermsStatus"
                }],
                staticClass: "popup-mask",
                on: {
                    click: function(e) {
                        return e.stopPropagation(),
                        t.onClose.apply(null, arguments)
                    }
                }
            }, [e("div", {
                staticClass: "terms-content",
                class: {
                    "is-app": t.isApp
                },
                style: {
                    height: t.termsHeigth,
                    "margin-top": "".concat(t.topOffset, "px")
                }
            }, [e("div", {
                staticClass: "order-terms-title"
            }, [e("h3", {
                staticClass: "title-text"
            }, [t._v("\u4f1a\u5458\u8d2d\u670d\u52a1\u534f\u8bae")])]), e("div", [e("p", {
                staticStyle: {
                    height: "12px"
                }
            }), e("p", [e("strong", [t._v("\u66f4\u65b0\u65f6\u95f4\uff1a2022\u5e74\u301007\u3011\u6708\u301025\u3011\u65e5")])]), e("p", [e("strong", [t._v("\u751f\u6548\u65f6\u95f4\uff1a2022\u5e74\u301008\u3011\u6708\u301001\u3011\u65e5")])]), e("br"), e("p", [t._v("\n            \u300a\u4f1a\u5458\u8d2d\u670d\u52a1\u534f\u8bae\u300b\uff08\u7b80\u79f0\u4e3a\u201c\u672c\u534f\u8bae\u201d\uff09\u662f\u60a8\u4e0e\u54d4\u54e9\u54d4\u54e9\u4f1a\u5458\u8d2d\uff08\u4ee5\u4e0b\u79f0\u4e3a\u201c\u4f1a\u5458\u8d2d\u201d\u6216\u201c\u6211\u4eec\u201d\uff09\u4e4b\u95f4\u5173\u4e8e\u60a8\u4f7f\u7528\u4f1a\u5458\u8d2d\u5404\u9879\u670d\u52a1\u7684\u6cd5\u5f8b\u534f\u8bae\u3002\n          ")]), e("br"), e("p", {
                staticClass: "text-under-line"
            }, [e("strong", [t._v("\u8bf7\u60a8\u5728\u4f7f\u7528\u4f1a\u5458\u8d2d\u670d\u52a1\u524d\u9605\u8bfb\u5e76\u5145\u5206\u7406\u89e3\u672c\u534f\u8bae\uff0c\u7279\u522b\u662f\u4e0e\u60a8\u7684\u6743\u76ca\uff08\u53ef\u80fd\uff09\u5b58\u5728\u91cd\u5927\u5173\u7cfb\u7684\u6761\u6b3e\uff08\u5305\u62ec\u514d\u9664\u4f1a\u5458\u8d2d\u8d23\u4efb\u7684\u6761\u6b3e\u3001\u9650\u5236\u60a8\u6743\u5229\u7684\u6761\u6b3e\u3001\u4e89\u8bae\u89e3\u51b3\u6761\u6b3e\u7b49\uff09\uff0c\u4f1a\u5458\u8d2d\u5df2\u91c7\u7528\u5b57\u4f53\u52a0\u7c97\u7684\u65b9\u5f0f\u6765\u7279\u522b\u63d0\u9192\u60a8\uff0c\u8bf7\u60a8\u7559\u610f\u91cd\u70b9\u67e5\u9605\u3002")])]), e("br"), e("p", [e("strong", [t._v("\u4f1a\u5458\u8d2d\u53ef\u80fd\u4f1a\u6839\u636e\u56fd\u5bb6\u6cd5\u5f8b\u6cd5\u89c4\u3001\u653f\u7b56\u8c03\u6574\uff0c\u6216\u4e1a\u52a1\u6574\u4f53\u89c4\u5212\u7b49\uff0c\u5bf9\u4f1a\u5458\u8d2d\u53ca/\u6216\u672c\u534f\u8bae\u8fdb\u884c\u4fee\u6539\u6216\u53d8\u66f4\u3002\u6211\u4eec\u5c06\u4ee5\u9002\u5f53\u7684\u65b9\u5f0f\uff08\u5305\u62ec\u4f46\u4e0d\u9650\u4e8e\u9875\u9762\u63d0\u793a\u3001\u5f39\u7a97\u3001\u7ad9\u5185\u6d88\u606f\u3001\u7f51\u7ad9\u516c\u544a\u7b49\uff09\u63d0\u9192\u60a8\uff0c\u4ee5\u4fbf\u60a8\u53ca\u65f6\u4e86\u89e3\u672c\u534f\u8bae\u7684\u6700\u65b0\u7248\u672c\u3002\u82e5\u60a8\u4e0d\u540c\u610f\u524d\u8ff0\u4fee\u6539\u6216\u53d8\u66f4\uff0c\u8bf7\u60a8\u7acb\u5373\u505c\u6b62\u4f7f\u7528\u4f1a\u5458\u8d2d\u670d\u52a1\u3002\u60a8\u7ee7\u7eed\u4f7f\u7528\u4f1a\u5458\u8d2d\u670d\u52a1\u5373\u89c6\u4e3a\u60a8\u63a5\u53d7\u5e76\u540c\u610f\u672c\u534f\u8bae\u6240\u6709\u6761\u6b3e\uff0c\u5305\u62ec\u4f46\u4e0d\u9650\u4e8e\u524d\u8ff0\u4fee\u6539\u53ca\u53d8\u66f4\u3002")])]), e("br"), e("p", [e("strong", [t._v("\u8bf7\u60a8\u5728\u52fe\u9009\u540c\u610f\u672c\u534f\u8bae\u524d\u8c28\u614e\u9605\u8bfb\u5e76\u7406\u89e3\u76f8\u5173\u5185\u5bb9\uff0c\u5982\u60a8\u52fe\u9009\u540c\u610f\u5373\u89c6\u4e3a\u60a8\u81ea\u6b64\u53d1\u751f\u7684\u4ea4\u6613\u5747\u53d7\u8be5\u534f\u8bae\u7ea6\u675f\uff0c\u5305\u62ec\u4f46\u4e0d\u9650\u4e8e\u524d\u8ff0\u4fee\u6539\u53ca\u53d8\u66f4\u3002")])]), e("br"), e("p", {
                staticClass: "text-under-line"
            }, [e("strong", [t._v("\u60a8\u786e\u8ba4\u60a8\u5177\u5907\u5b8c\u5168\u6c11\u4e8b\u6743\u5229\u80fd\u529b\u548c\u5b8c\u5168\u6c11\u4e8b\u884c\u4e3a\u80fd\u529b\uff0c\u6709\u80fd\u529b\u540c\u610f\u5e76\u9075\u5b88\u672c\u534f\u8bae\uff0c\u5e76\u5bf9\u60a8\u672c\u534f\u8bae\u9879\u4e0b\u7684\u5168\u90e8\u884c\u4e3a\u72ec\u7acb\u627f\u62c5\u6cd5\u5f8b\u8d23\u4efb\u3002\u82e5\u60a8\u4e0d\u5177\u5907\u524d\u8ff0\u4e0e\u60a8\u884c\u4e3a\u76f8\u9002\u5e94\u7684\u6c11\u4e8b\u884c\u4e3a\u80fd\u529b\uff0c\u5219\u5e94\u83b7\u5f97\u6cd5\u5b9a\u76d1\u62a4\u4eba\u7684\u77e5\u60c5\u540c\u610f\u3002\u5982\u60a8\u5c1a\u672a\u6210\u5e74\uff0c\u8bf7\u5728\u6cd5\u5b9a\u76d1\u62a4\u4eba\u7684\u966a\u540c\u4e0b\u9605\u8bfb\u548c\u5224\u65ad\u662f\u5426\u540c\u610f\u672c\u534f\u8bae\u3002")])]), e("p", [e("br"), e("strong", [t._v("\u672c\u534f\u8bae\u57fa\u4e8e\u300a\u54d4\u54e9\u54d4\u54e9\u5f39\u5e55\u7f51\u7528\u6237\u4f7f\u7528\u534f\u8bae\u300b\u300a\u54d4\u54e9\u54d4\u54e9\u9690\u79c1\u653f\u7b56\u300b\u4ee5\u53ca\u54d4\u54e9\u54d4\u54e9\u7684\u76f8\u5173\u534f\u8bae\u89c4\u8303\uff08\u7edf\u79f0\u4e3a\u201c\u54d4\u54e9\u54d4\u54e9\u670d\u52a1\u6761\u6b3e\u201d\uff09\u5236\u5b9a\uff1b\u540c\u65f6\uff0c\u4f1a\u5458\u8d2d\u4e0d\u65f6\u53d1\u5e03\u7684\u5173\u4e8e\u4f1a\u5458\u8d2d\u7684\u76f8\u5173\u534f\u8bae\u3001\u89c4\u5219\u3001\u516c\u544a\u3001\u8bf4\u660e\u7b49\u5404\u7c7b\u89c4\u5219\u4e5f\u662f\u672c\u534f\u8bae\u7684\u4e00\u90e8\u5206\uff1b\u60a8\u5728\u4f7f\u7528\u4f1a\u5458\u8d2d\u670d\u52a1\u7684\u540c\u65f6\u5e94\u9075\u5b88\u672c\u534f\u8bae\u3001\u54d4\u54e9\u54d4\u54e9\u670d\u52a1\u6761\u6b3e\u53ca\u524d\u8ff0\u76f8\u5173\u534f\u8bae\u3001\u89c4\u5219\u7b49\u6240\u6709\u6761\u6b3e\u3002")])]), e("p", [e("br"), e("strong", [t._v("\u7279\u522b\u63d0\u793a\uff1a\u7531\u4e8e\u60a8\u4f7f\u7528\u7684\u8f6f\u4ef6\u7248\u672c\u3001\u8bbe\u5907\u3001\u64cd\u4f5c\u7cfb\u7edf\u7b49\u4e0d\u540c\u4ee5\u53ca\u7b2c\u4e09\u65b9\u539f\u56e0\u53ef\u80fd\u5bfc\u81f4\u60a8\u5b9e\u9645\u53ef\u4f7f\u7528\u7684\u5177\u4f53\u670d\u52a1\u6709\u5dee\u522b\uff0c\u7531\u6b64\u53ef\u80fd\u7ed9\u60a8\u5e26\u6765\u7684\u4e0d\u4fbf\uff0c\u60a8\u8868\u793a\u7406\u89e3\uff0c\u5e76\u4e0d\u4f1a\u56e0\u6b64\u5411\u4f1a\u5458\u8d2d\u63d0\u51fa\u4efb\u4f55\u4e3b\u5f20\u6216\u8ffd\u7a76\u4f1a\u5458\u8d2d\u53ca\u5176\u5173\u8054\u516c\u53f8\u4efb\u4f55\u8d23\u4efb\u3002")])]), e("br"), e("p", [e("strong", [t._v("\u4e00\u3001\u9002\u7528\u8303\u56f4")]), e("br"), t._v("\u672c\u534f\u8bae\u9002\u7528\u4e8e\u901a\u8fc7\u9500\u552e\u7684\u6240\u6709\u5546\u54c1\u548c\u670d\u52a1\uff08\u4ee5\u4e0b\u7edf\u79f0\u201c\u5546\u54c1\u201d\uff09\u3002\u5f53\u60a8\u8d2d\u4e70\u4f1a\u5458\u8d2d\u76ee\u524d\u6216\u5c06\u6765\u63d0\u4f9b\u7684\u7279\u6b8a\u54c1\u7c7b\u5546\u54c1\uff08\u5305\u62ec\u4f46\u4e0d\u9650\u4e8e\u9884\u552e\u7c7b\u5546\u54c1\u3001\u76f2\u76d2\u3001\u7968\u52a1\u7b49\uff09\u65f6\uff0c\u672c\u534f\u8bae\u672a\u6d89\u53ca\u7684\u6216\u8be5\u7279\u6b8a\u54c1\u7c7b\u5546\u54c1\u5c55\u793a\u9875\u4e2d\u53e6\u6709\u89c4\u5b9a\u7684\uff08\u4ee5\u4e0b\u79f0\u201c\u7279\u6b8a\u6761\u6b3e\u201d\uff09\uff0c\u4ece\u5176\u89c4\u5b9a\u3002\u5982\u679c\u672c\u534f\u8bae\u4e0e\u7279\u6b8a\u6761\u6b3e\u6709\u4e0d\u4e00\u81f4\u4e4b\u5904\uff0c\u4ee5\u7279\u6b8a\u6761\u6b3e\u4e3a\u51c6\u3002\n          ")]), e("br"), e("p", [e("strong", [t._v("\u4e8c\u3001\u670d\u52a1\u653f\u7b56")]), e("br"), t._v("\uff08\u4e00\uff09\u4ea4\u6613"), e("br"), t._v("\n            1. \u5173\u4e8e\u5546\u54c1\u4fe1\u606f\u8c03\u6574"), e("br"), t._v("\n            \u5546\u54c1\u4ef7\u683c\u3001\u6570\u91cf\u3001\u4ecb\u7ecd\u3001\u662f\u5426\u6709\u8d27\u7b49\u5546\u54c1\u4fe1\u606f\u968f\u65f6\u90fd\u6709\u53ef\u80fd\u53d1\u751f\u53d8\u52a8\uff0c\u4efb\u4f55\u53d8\u52a8\u4f1a\u5458\u8d2d\u4e0d\u4f5c\u7279\u522b\u901a\u77e5\uff0c\u8bf7\u60a8\u81f3\u5546\u54c1\u9875\u9762\u81ea\u884c\u67e5\u770b\u3002\u4f1a\u5458\u8d2d\u4f1a\u5c3d\u6700\u5927\u52aa\u529b\u4fdd\u8bc1\u60a8\u6240\u6d4f\u89c8\u7684\u5546\u54c1\u4fe1\u606f\u7684\u51c6\u786e\u6027\uff1b\u4f46\u7531\u4e8e\u5546\u54c1\u79cd\u7c7b\u7e41\u591a\u3001\u5546\u54c1\u4fe1\u606f\u7684\u6570\u91cf\u8f83\u5927\u4ee5\u53ca\u4e92\u8054\u7f51\u6280\u672f\u56e0\u7d20\u7b49\u5ba2\u89c2\u539f\u56e0\uff0c\u5546\u54c1\u4fe1\u606f\u9875\u9762\u663e\u793a\u53ef\u80fd\u4f1a\u6709\u4e00\u5b9a\u7684\u6ede\u540e\u6027\u6216\u5dee\u9519\uff0c\u60a8\u5bf9\u6b64\u8868\u793a\u77e5\u6089\u5e76\u7406\u89e3\u3002\n            "), e("br"), t._v("2. \u5173\u4e8e\u8ba2\u5355\u4fe1\u606f"), e("br"), t._v("\uff081\uff09\u8ba2\u5355\u4fe1\u606f\u7684\u51c6\u786e\u6027"), e("br"), t._v("\u5728\u60a8\u63d0\u4ea4\u8ba2\u5355\u65f6\uff0c\u8bf7\u4ed4\u7ec6\u786e\u8ba4\u6240\u8d2d\u5546\u54c1\u7684\u540d\u79f0\u3001\u4ef7\u683c\u3001\u6570\u91cf\u3001\u578b\u53f7\u3001\u89c4\u683c\u3001\u5c3a\u5bf8\u3001\u989c\u8272\u3001\u6536\u8d27\u4eba\u59d3\u540d\u3001\u8054\u7cfb\u7535\u8bdd\u3001\u6536\u8d27\u5730\u5740\u7b49\u4fe1\u606f\u3002"), e("strong", [t._v("\u82e5\u6536\u8d27\u4eba\u5e76\u975e\u60a8\u672c\u4eba\uff0c\u6536\u8d27\u4eba\u7684\u884c\u4e3a\u548c\u610f\u601d\u8868\u793a\u5c06\u89c6\u4e3a\u60a8\u7684\u884c\u4e3a\u548c\u610f\u601d\u8868\u793a\uff0c\u60a8\u5e94\u5bf9\u6536\u8d27\u4eba\u7684\u884c\u4e3a\u53ca\u610f\u601d\u8868\u793a\u4ea7\u751f\u7684\u6cd5\u5f8b\u540e\u679c\u627f\u62c5\u8fde\u5e26\u8d23\u4efb\u3002")]), t._v("\u60a8\u63d0\u4ea4\u8ba2\u5355\u5373\u8868\u793a\u5bf9\u8ba2\u5355\u4e2d\u6240\u786e\u8ba4\u7684\u8ba2\u8d2d\u5546\u54c1\u3001\u6536\u8d27\u4fe1\u606f\u7b49\u5185\u5bb9\u7684\u51c6\u786e\u6027\u8d1f\u8d23\u3002"), e("strong", [t._v("\u5982\u679c\u56e0\u4e3a\u60a8\u586b\u5199\u7684\u6536\u8d27\u4eba\u59d3\u540d\u3001\u8054\u7cfb\u7535\u8bdd\u3001\u6536\u8d27\u5730\u5740\u7b49\u4fe1\u606f\u9519\u8bef\uff0c\u5bfc\u81f4\u5ef6\u671f\u914d\u9001\u3001\u4e0d\u80fd\u914d\u9001\u6216\u5546\u54c1\u4ea4\u4ed8\u7ed9\u975e\u60a8\u672c\u610f\u7684\u6536\u8d27\u4eba\u7684\uff0c\u7531\u6b64\u9020\u6210\u7684\u635f\u5931\u9700\u7531\u60a8\u81ea\u884c\u627f\u62c5\uff1b\u56e0\u6b64\u9020\u6210\u4efb\u4f55\u635f\u5931\u6216\u589e\u52a0\u8d39\u7528\u7684\uff0c\u5e94\u7531\u60a8\u5b8c\u5168\u72ec\u81ea\u627f\u62c5\u3002"), e("br")]), t._v("\uff082\uff09\u8ba2\u5355\u4fe1\u606f\u7684\u4f7f\u7528"), e("br"), e("strong", [t._v("\u60a8\u540c\u610f\u5e76\u4fdd\u8bc1\uff1a\u4e3a\u4e86\u66f4\u597d\u7684\u4e3a\u60a8\u63d0\u4f9b\u670d\u52a1\uff0c\u4f1a\u5458\u8d2d\u4f1a\u8bb0\u5f55\u60a8\u5728\u9009\u8d2d\u5546\u54c1\u8fc7\u7a0b\u4e2d\u5728\u7ebf\u586b\u5199\u7684\u6240\u6709\u4fe1\u606f\uff1b\u82e5\u6709\u9700\u8981\u53ef\u63d0\u4f9b\u7ed9\u76f8\u5173\u670d\u52a1\u63d0\u4f9b\u65b9\u3002\u6211\u4eec\u5411\u60a8\u627f\u8bfa\uff0c\u6211\u4eec\u4f1a\u4ee5\u6700\u5927\u52aa\u529b\u4fdd\u969c\u60a8\u7684\u4e2a\u4eba\u4fe1\u606f\u5b89\u5168\uff0c\u4e25\u683c\u8981\u6c42\u76f8\u5173\u670d\u52a1\u63d0\u4f9b\u65b9\u5bf9\u60a8\u7684\u4e2a\u4eba\u4fe1\u606f\u4fdd\u5bc6\uff0c\u4e0d\u5f97\u5bf9\u5916\u6cc4\u9732\u6216\u505a\u5176\u4ed6\u4efb\u4f55\u7528\u9014\u3002")]), e("br"), t._v("3. \u5173\u4e8e\u8ba2\u5355\u7684\u751f\u6548"), e("br"), t._v("\n            \u4f1a\u5458\u8d2d\u5c55\u793a\u7684\u5546\u54c1\u548c\u4ef7\u683c\u7b49\u5546\u54c1\u4fe1\u606f\u4ec5\u4ec5\u4f5c\u4e3a\u8981\u7ea6\u9080\u8bf7\u3002\u60a8\u4e0b\u5355\u65f6\u987b\u5199\u660e\u8ba2\u5355\u4fe1\u606f\u5185\u5bb9\uff0c\u7cfb\u7edf\u751f\u6210\u7684\u8ba2\u5355\u4fe1\u606f\u662f\u8ba1\u7b97\u673a\u4fe1\u606f\u7cfb\u7edf\u6839\u636e\u60a8\u586b\u5199\u7684\u5185\u5bb9\u548c\u64cd\u4f5c\u81ea\u52a8\u751f\u6210\u7684\u6570\u636e\uff0c\u4f5c\u4e3a\u60a8\u5411\u4f1a\u5458\u8d2d\u53d1\u51fa\u7684\u5408\u540c\u8981\u7ea6\u3002\u60a8\u4ed8\u6b3e\u540e\uff0c\u5373\u89c6\u4e3a\u53cc\u65b9\u4e4b\u95f4\u7684\u5408\u540c\u6210\u7acb\u3002"), e("strong", [t._v("\u60a8\u672a\u80fd\u5728\u6307\u5b9a\u65f6\u95f4\u5b8c\u6210\u4ed8\u6b3e\u7684\uff0c\u4f1a\u5458\u8d2d\u6709\u6743\u53d6\u6d88\u8ba2\u5355\u3002")]), t._v("\u5982\u679c\u60a8\u5728\u4e00\u4efd\u8ba2\u5355\u91cc\u8ba2\u8d2d\u4e86\u591a\u79cd\u5546\u54c1\uff0c\u4f46\u4ec5\u5c31\u90e8\u5206\u5546\u54c1\u652f\u4ed8\u4ef7\u6b3e\uff0c\u5219\u4f1a\u5458\u8d2d\u548c\u60a8\u4e4b\u95f4\u4ec5\u5c31\u8be5\u90e8\u5206\u5546\u54c1\u6210\u7acb\u5408\u540c\u5173\u7cfb\u3002\n            "), e("br"), e("strong", [t._v("\u5982\u56e0\u7cfb\u7edf\u6545\u969c\u6216\u4f1a\u5458\u8d2d\u7684\u8fc7\u5931\u5bfc\u81f4\u663e\u793a\u4fe1\u606f\u660e\u663e\u4e0d\u5408\u7406\u7684\uff08\u5305\u62ec\u4f46\u4e0d\u9650\u4e8e\u5546\u54c1\u4ef7\u683c\u660e\u663e\u504f\u4f4e\u7b49\u60c5\u5f62\uff09\uff0c\u8bf7\u52ff\u8fdb\u884c\u4e0b\u4e00\u6b65\u64cd\u4f5c\u5e76\u7acb\u5373\u901a\u77e5\u4f1a\u5458\u8d2d\u8fdb\u884c\u4fee\u6539\uff0c\u5982\u60a8\u660e\u77e5\u663e\u793a\u4fe1\u606f\u660e\u663e\u4e0d\u5408\u7406\u4ecd\u7136\u63d0\u4ea4\u8ba2\u5355\u7684\uff0c\u4f1a\u5458\u8d2d\u6709\u6743\u5728\u6cd5\u5f8b\u5141\u8bb8\u7684\u6700\u5927\u9650\u5ea6\u5185\u53d6\u6d88\u9519\u8bef\u8ba2\u5355\u5e76\u53ca\u65f6\u901a\u77e5\u60a8\u3002"), e("br")]), t._v("\n            4. \u5173\u4e8e\u5546\u54c1\u7f3a\u8d27\u7684\u5904\u7406"), e("br"), t._v("\u7531\u4e8e\u5e02\u573a\u53d8\u5316\u3001\u4f9b\u5e94\u5546\u751f\u4ea7\u8ba1\u5212\u53d8\u5316\u3001\u7cfb\u7edf\u95ee\u9898\u3001\u4e0d\u53ef\u6297\u529b\u7b49\u56e0\u7d20\u5f71\u54cd\uff0c\u5546\u54c1\u53ef\u80fd\u51fa\u73b0\u7f3a\u8d27\u60c5\u5f62\u3002\u5728\u6b64\u60c5\u5f62\u4e0b\uff0c\u4f1a\u5458\u8d2d\u5c06\u5c3d\u5feb\u901a\u77e5\u60a8\u5e76\u63d0\u4f9b\u89e3\u51b3\u65b9\u6848\uff08\u5305\u62ec\u4f46\u4e0d\u9650\u4e8e\u53d6\u6d88\u8ba2\u5355\u3001\u6362\u8d27\u3001\u8c03\u8d27\u7b49\u65b9\u5f0f\uff09\u3002\u901a\u77e5\u65b9\u5f0f\u5305\u62ec\u4f46\u4e0d\u9650\u4e8e\u5728\u4f1a\u5458\u8d2d\u53d1\u5e03\u516c\u544a\u3001\u53d1\u9001\u90ae\u4ef6\u3001\u5411\u60a8\u63d0\u4f9b\u7684\u8054\u7cfb\u7535\u8bdd\u53d1\u9001\u624b\u673a\u77ed\u4fe1\u3001\u5411\u60a8\u7684\u54d4\u54e9\u54d4\u54e9\u8d26\u53f7\u53d1\u9001\u6d88\u606f\u6216\u7cfb\u7edf\u901a\u77e5\u7b49\u3002\u8bf7\u60a8\u5728\u672a\u6536\u5230\u5546\u54c1\u4e4b\u524d\u7559\u610f\u901a\u77e5\u3002\u60a8\u4e5f\u53ef\u4ee5\u968f\u65f6\u901a\u8fc7\u5ba2\u670d\u4e0e\u6211\u4eec\u8054\u7cfb\uff0c\u7531\u6b64\u7ed9\u60a8\u5e26\u6765\u7684\u4e0d\u4fbf\u656c\u8bf7\u8c05\u89e3\u3002\n          ")]), e("p", [e("br")]), e("p", [e("strong", [t._v("\u82e5\u5546\u54c1\u7f3a\u8d27\uff0c\u5728\u9996\u6b21\u901a\u77e5\u60a8\u4e4b\u65e5\u8d77\u7684\u7b2c7\u4e2a\u5de5\u4f5c\u65e5\uff0c\u4f1a\u5458\u8d2d\u6709\u6743\u53d6\u6d88\u8ba2\u5355\uff0c\u9000\u8fd8\u60a8\u8d2d\u4e70\u8be5\u5546\u54c1\u65f6\u5b9e\u9645\u652f\u4ed8\u91d1\u989d\uff0c\u5e76\u4ee5\u4f18\u60e0\u5238\u7684\u65b9\u5f0f\u7ed9\u60a8\u9002\u5f53\u8865\u507f\uff0c\u7531\u6b64\u7ed9\u60a8\u5e26\u6765\u7684\u4e0d\u4fbf\u656c\u8bf7\u8c05\u89e3\u3002\u7f3a\u8d27\u5546\u54c1\u662f\u5426\u8865\u8d27\u4e0d\u518d\u53e6\u884c\u901a\u77e5\uff0c\u5982\u60a8\u5bf9\u6b64\u5546\u54c1\u611f\u5174\u8da3\uff0c\u8bf7\u60a8\u968f\u65f6\u5173\u6ce8\u3002")])]), e("p", [e("br")]), e("p", [t._v("\n            \uff08\u4e8c\uff09\u652f\u4ed8"), e("br"), t._v("1.\u5173\u4e8e\u4f18\u60e0\u5238\u53ca\u4f18\u60e0\u89c4\u5219\u4f7f\u7528"), e("br"), t._v("\n            \uff081\uff09\u60a8\u53ef\u4ee5\u5728\u4e2a\u4eba\u8d26\u6237\u4e2d\u67e5\u770b\u4f18\u60e0\u5238\u79cd\u7c7b\u3001\u6570\u91cf\u3001\u6709\u6548\u671f\u9650\u53ca\u4f7f\u7528\u72b6\u6001\u7b49\u4fe1\u606f\u3002\u8bf7\u60a8\u5728\u6709\u6548\u671f\u5230\u671f\u524d\u4f7f\u7528\u3002\u4f18\u60e0\u5238\u3001\u6ee1\u51cf\u89c4\u5219\u7b49\u7684\u4f7f\u7528\u9650\u5236\u4ee5\u9875\u9762\u5c55\u793a\u4e3a\u51c6\uff1b\n            "), e("br"), e("strong", [t._v("\uff082\uff09\u4f1a\u5458\u8d2d\u53d1\u653e\u7684\u5546\u54c1\u4f18\u60e0\u5238\u4ec5\u80fd\u5728\u4f1a\u5458\u8d2d\u63d0\u4ea4\u8ba2\u5355\u65f6\u62b5\u51cf\u5b9e\u4ed8\u91d1\u989d\uff0c\u4e0d\u80fd\u8fdb\u884c\u5151\u73b0\u6216\u5176\u4ed6\u7528\u9014\uff0c\u4e0d\u80fd\u62b5\u6263\u8fd0\u8d39\u3002\u4f18\u60e0\u5238\u91d1\u989d\u5927\u4e8e\u8ba2\u5355\u5e94\u4ed8\u91d1\u989d\u65f6\uff0c\u5dee\u989d\u90e8\u5206\u4e0d\u4e88\u9000\u56de\uff1b\n              "), e("br")]), t._v("\n            \uff083\uff09"), e("strong", [t._v("\u6bcf\u5f20\u8ba2\u5355\u4ec5\u53ef\u4f7f\u7528\u4e00\u5f20\u4f18\u60e0\u5238\uff0c\u4e0d\u53ef\u53e0\u52a0\u4f7f\u7528")]), t._v("\uff08\u9884\u552e\u5546\u54c1\u5b9a\u91d1\u3001\u5c3e\u6b3e\u9636\u6bb5\u4e3a\u58f9\u5f20\u8ba2\u5355\uff09\uff1b"), e("br"), t._v("\n            \uff084\uff09\u82e5\u8ba2\u5355\u4f7f\u7528\u4e86\u4f18\u60e0\u5238\uff0c\u5f53\u4e00\u7b14\u8ba2\u5355\u4e2d\u5305\u542b\u591a\u4e2a\u7b26\u5408\u4f7f\u7528\u4f18\u60e0\u5238\u6761\u4ef6\u7684\u5546\u54c1\u65f6\uff0c\u4f1a\u5458\u8d2d\u5c06\u6309\u5546\u54c1\u552e\u4ef7\u5360\u8ba2\u5355\u603b\u91d1\u989d\u7684\u6bd4\u4f8b\u8ba1\u7b97\u5355\u4e2a\u5546\u54c1\u4f18\u60e0\u91d1\u989d\uff0c\u62b5\u6263\u5230\u6bcf\u4e2a\u7b26\u5408\u6761\u4ef6\u7684\u5546\u54c1\u91d1\u989d\u4e2d\uff0c\u82e5\u8ba2\u5355\u90e8\u5206\u9000\u6b3e\uff0c\u5c06\u9000\u8fd8\u8be5\u9000\u8d27\u5546\u54c1\u7684\u5b9e\u4ed8\u91d1\u989d\uff1b"), e("br"), t._v("\n            \uff085\uff09\u5f53\u4f7f\u7528\u4f18\u60e0\u5238\u7684\u8ba2\u5355\u53d1\u751f\u9000\u8d27\u65f6\uff0c\u5728\u6240\u6709\u5546\u54c1\u9000\u6b3e\u5b8c\u6210\u540e\u7cfb\u7edf\u4f1a\u81ea\u52a8\u8fd4\u8fd8\u76f8\u5e94\u7684\u4f18\u60e0\u5238\uff0c\u4e14\u4ec5\u652f\u6301\u8fd4\u8fd8\u6709\u6548\u671f\u5185\u7684\u4f18\u60e0\u5238\uff1b"), e("strong", [t._v("\u82e5\u8ba2\u5355\u90e8\u5206\u9000\u6b3e\uff0c\u4f18\u60e0\u5238\u5c06\u4e0d\u4e88\u8fd4\u8fd8\u3002")]), e("br")]), e("br"), e("p", [t._v("\n            \uff08\u4e09\uff09\u914d\u9001"), e("br"), t._v("\n            \u7528\u6237\u4ed8\u6b3e\u5e76\u586b\u5199\u771f\u5b9e\u7684\u6536\u8d27\u4eba\u59d3\u540d\u3001\u6709\u6548\u8054\u7cfb\u7535\u8bdd\u3001\u6536\u8d27\u5730\u5740\u662f\u53d1\u8d27\u7684\u524d\u63d0\u3002\n\n            "), e("br"), t._v("\n            1. \u5173\u4e8e\u53d1\u8d27\u65f6\u95f4"), e("br"), e("strong", [t._v("\uff081\uff09\u60a8\u77e5\u6089\u5e76\u7406\u89e3\uff0c\u73b0\u8d27\u5546\u54c1\u7684\u53d1\u8d27\u65f6\u95f4\u4e3a\u53c2\u8003\u65f6\u95f4\uff0c\u8be5\u53c2\u8003\u65f6\u95f4\u53ef\u80fd\u6839\u636e\u5e93\u5b58\u72b6\u51b5\u3001\u9001\u8d27\u65f6\u95f4\u3001\u9001\u8d27\u5730\u70b9\u7b49\u5ba2\u89c2\u56e0\u7d20\u5b58\u5728\u8bef\u5dee\uff0c\u5177\u4f53\u53d1\u8d27\u65f6\u95f4\u4ee5\u4f1a\u5458\u8d2d\u5b9e\u9645\u53d1\u51fa\u65f6\u95f4\u4e3a\u51c6\u3002")]), e("br"), e("strong", [t._v("\uff082\uff09\u60a8\u540c\u6837\u77e5\u6089\u5e76\u7406\u89e3\uff0c\u9884\u552e\u7c7b\u5546\u54c1\u9875\u5217\u51fa\u7684\u201c\u9884\u8ba1\u5230\u8d27\u65f6\u95f4\u201d\u201c\u53d1\u8d27\u65f6\u95f4\u201d")]), e("strong", [t._v("\u4ea6\u4e3a\u53c2\u8003\u65f6\u95f4\uff0c\u53ef\u80fd\u56e0\u53d7\u5236\u4f5c\u5468\u671f\u3001\u7269\u6d41\u5468\u671f\u3001\u8d28\u68c0\u8fd4\u5de5\u7b49\u8bf8\u591a\u56e0\u7d20\u5f71\u54cd\u5b58\u5728\u8bef\u5dee\uff0c\u5bfc\u81f4\u9884\u552e\u7c7b\u5546\u54c1\u7684\u5b9e\u9645\u53d1\u8d27\u65f6\u95f4\u53ef\u80fd\u5ef6\u8fdf\uff0c\u60a8\u5bf9\u4e0a\u8ff0\u60c5\u5f62\u8868\u793a\u540c\u610f\u53ca\u7406\u89e3\uff0c\u5177\u4f53\u53d1\u8d27\u65f6\u95f4\u4ee5\u5546\u54c1\u5b9e\u9645\u53d1\u8d27\u65f6\u95f4\u4e3a\u51c6\u3002\u9884\u552e\u5546\u54c1\u5ef6\u671f\u9000\u6b3e\u7684\u76f8\u5173\u89c4\u5b9a\u8bf7\u67e5\u9605\u4e0b\u65b9\u7b2c\uff08\u56db\uff09\u6b3e\u552e\u540e\u670d\u52a1\u3002")]), e("br"), t._v("\n            2. \u6240\u6709\u9884\u552e\u7c7b\u5546\u54c1\uff0c\u5982\u6709\u90ae\u8d39\uff0c\u9700\u5728\u8865\u6b3e\u65f6\u4e00\u5e76\u652f\u4ed8\u3002"), e("br"), t._v("\n            3.\n            \u5546\u54c1\u7684\u53ef\u914d\u9001\u533a\u57df\u4e3a\u4e2d\u56fd\u5927\u9646\u5730\u533a\uff08\u9664\u7279\u6b8a\u504f\u8fdc\u5730\u533a\uff09\uff0c\u6536\u4ef6\u5730\u5740\u5728\u6b64\u4e4b\u5916\u7684\u533a\u57df\u8bf7\u4e0e\u5ba2\u670d\u4eba\u5458\u6838\u5b9e\u53ef\u914d\u9001\u540e\u518d\u4e0b\u5355\u3002"), e("br"), t._v("\n            4. \u8fd0\u8d39\u89c6\u914d\u9001\u5730\u5740\u4e0d\u540c\u53ef\u80fd\u4e0d\u540c\uff0c\u5177\u4f53\u4ee5\u8ba2\u5355\u652f\u4ed8\u9875\u9762\u4e3a\u51c6\u3002 "), e("br"), t._v("\n            5.\n            "), e("strong", [t._v("\u5728\u7b7e\u6536\u5546\u54c1\u65f6\uff0c\u8bf7\u60a8\u672c\u4eba\u6216\u60a8\u6307\u5b9a\u7684\u6536\u4ef6\u4eba\u5728\u4e0d\u62c6\u5c01\u5546\u54c1\u5305\u88c5\u7684\u60c5\u51b5\u4e0b\uff0c\u6216\u56e0\u68c0\u67e5\u5546\u54c1\u7684\u5fc5\u8981\u5bf9\u5546\u54c1\u8fdb\u884c\u62c6\u5c01\u67e5\u9a8c\u4e14\u4e0d\u5f71\u54cd\u5546\u54c1\u5b8c\u597d\u7684\u60c5\u51b5\u4e0b\uff0c\u5728\u5feb\u9012\u4eba\u5458\u524d\u5f53\u9762\u9a8c\u8d27\uff0c\u786e\u8ba4\u65e0\u8bef\u540e\u518d\u7b7e\u6536\u3002\u82e5\u60a8\u6216\u4e0a\u8ff0\u6536\u4ef6\u4eba\u59d4\u6258\u4ed6\u4eba\u7b7e\u6536\u5546\u54c1\u6216\u627f\u8fd0\u4eba\u5df2\u6309\u60a8\u6216\u6536\u4ef6\u4eba\u6307\u793a\u5c06\u5546\u54c1\u7f6e\u4e8e\u6307\u5b9a\u5730\u70b9\u7684\uff0c\u89c6\u4e3a\u672c\u4eba\u7b7e\u6536")]), t._v("\u3002"), e("br"), e("strong", [t._v("6.\n              \u60a8\u65e0\u6b63\u5f53\u7406\u7531\u62d2\u7edd\u7b7e\u6536\u4e0d\u652f\u6301\u4e03\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27\u5546\u54c1\u6216\u6027\u8d28\u4e0d\u9002\u5b9c\u62d2\u7b7e\u7684\u5546\u54c1\u7684\uff0c\u5546\u54c1\u8fd4\u56de\u540e\uff0c\u9700\u7531\u60a8\u627f\u62c5\u5546\u54c1\u6bc1\u635f\u3001\u706d\u5931\u7684\u98ce\u9669\u53ca\u56e0\u4ea7\u751f\u7684\u8d39\u7528\u3002\u4f1a\u5458\u8d2d\u53ef\u9009\u62e9\u9000\u6b3e\u6216\u5c06\u5546\u54c1\u518d\u6b21\u53d1\u56de\uff0c\u82e5\u5546\u54c1\u6027\u8d28\u5df2\u4e0d\u9002\u5b9c\u53d1\u56de\u6216\u60a8\u518d\u6b21\u62d2\u7edd\u7b7e\u6536\u7684\uff0c\u8ba2\u5355\u635f\u5931\u7531\u60a8\u627f\u62c5\u3002")])]), e("p", [e("strong", [t._v("7.\n              \u5982\u56e0\u4e0d\u53ef\u6297\u529b\u6216\u5176\u4ed6\u975e\u4f1a\u5458\u8d2d\u539f\u56e0\u9020\u6210\u8ba2\u5355\u5ef6\u8fdf\u6216\u65e0\u6cd5\u914d\u9001\u7b49\uff0c\u4f1a\u5458\u8d2d\u5c06\u65e0\u6cd5\u627f\u62c5\u8fdf\u5ef6\u914d\u9001\u6216\u65e0\u6cd5\u914d\u9001\u7684\u8d23\u4efb\u3002\u672c\u534f\u8bae\u6240\u79f0\u4e0d\u53ef\u6297\u529b\uff0c\u662f\u6307\u4e0d\u80fd\u9884\u89c1\u3001\u4e0d\u80fd\u514b\u670d\u5e76\u4e0d\u80fd\u907f\u514d\u7684\u5ba2\u89c2\u4e8b\u4ef6\uff0c\u5305\u62ec\u4f46\u4e0d\u9650\u4e8e\u81ea\u7136\u707e\u5bb3\u3001\u6218\u4e89\u3001\u66b4\u4e71\u3001\u6050\u6016\u4e8b\u4ef6\u3001\u91cd\u5927\u516c\u5171\u536b\u751f\u4e8b\u4ef6\u3001\u7f62\u5de5\u3001\u653f\u5e9c\u884c\u4e3a\u3001\u53f8\u6cd5\u884c\u653f\u547d\u4ee4\u7b49\u3002")])]), e("p", [e("br")]), e("p", [t._v("\uff08\u56db\uff09\u552e\u540e\u670d\u52a1")]), e("p", [e("strong", [t._v("\u60a8\u7406\u89e3\u5e76\u540c\u610f\uff0c\u4e0d\u540c\u7684\u5546\u54c1\u9002\u7528\u4e0d\u540c\u7684\u552e\u540e\u653f\u7b56\uff08\u5982\u4e03\u5929\u65e0\u7406\u7531\u3001\u5ef6\u671f\u65e0\u5fe7\uff09\uff0c\u5c06\u5728\u5546\u54c1\u9875\u9762\u4e88\u4ee5\u516c\u793a\uff0c\u8bf7\u60a8\u5728\u8d2d\u4e70\u5546\u54c1\u524d\u4ed4\u7ec6\u9605\u8bfb\u3002")])]), e("p", [e("br")]), e("p", [e("strong", [t._v("1. \u5173\u4e8e\u9884\u552e\u5546\u54c1\u7684\u5ef6\u671f\u9000\u6b3e\uff1a")])]), e("p", [e("strong", [t._v("\uff081\uff09\u9884\u552e\u5546\u54c1\u4f1a\u5728\u5546\u54c1\u754c\u9762\u6807\u660e\u201c\u9884\u552e\u201d\u5e76\u544a\u77e5\u9884\u8ba1\u5230\u8d27\u65f6\u95f4\uff0c\u82e5\u60a8\u6240\u8d2d\u4e70\u7684\u9884\u552e\u5546\u54c1\u5728\u9996\u6b21\u5c55\u793a\u7684\u3010\u9884\u8ba1\u5230\u8d27\u65f6\u95f4\u3011\u8d77210\u5929\u540e\u4ecd\u672a\u53d1\u8d27\uff0c\u5f00\u542f\u8865\u6b3e\u524d\u60a8\u53ef\u5c31\u8be5\u5546\u54c1\u7533\u8bf7\u9000\u6b3e\uff0c\u9000\u6b3e\u91d1\u989d\u4ee5\u60a8\u8d2d\u4e70\u65f6\u5b9e\u9645\u652f\u4ed8\u91d1\u989d\u4e3a\u51c6\u3002")])]), e("p", [e("strong", [t._v("\uff082\uff09\u82e5\u60a8\u6240\u8d2d\u4e70\u7684\u9884\u552e\u5546\u54c1\u5c5e\u4e8e\u201c\u5ef6\u671f\u65e0\u5fe7\u201d\u4fdd\u969c\u5546\u54c1\uff08\u5373\u5546\u54c1\u8be6\u60c5\u9875\u6709\u201c\u5ef6\u671f\u65e0\u5fe7\u201d\u670d\u52a1\u6807\u8bc6\uff09\uff1a")])]), e("ul", [e("li", [e("strong", [t._v("A.\n                \u624b\u529e\u3001\u6a21\u578b\u3001\u666f\u54c1\u3001\u96d5\u50cf\u3001\u76d2\u86cb\u7c7b\u76ee\u5546\u54c1\uff1a\u5f53\u8be5\u5546\u54c1\u5728\u5546\u54c1\u754c\u9762\u9996\u6b21\u5c55\u793a\u7684\u3010\u9884\u8ba1\u5230\u8d27\u65f6\u95f4\u3011\u8d77120\u5929\u540e\u4ecd\u672a\u53d1\u8d27\uff0c\u5f00\u542f\u8865\u6b3e\u524d\u60a8\u53ef\u5c31\u8be5\u5546\u54c1\u7533\u8bf7\u9000\u6b3e\uff0c\u9000\u6b3e\u91d1\u989d\u4ee5\u60a8\u8d2d\u4e70\u65f6\u5b9e\u9645\u652f\u4ed8\u91d1\u989d\u4e3a\u51c6\uff1b")])]), e("li", [e("strong", [t._v("B.\n                \u5176\u4ed6\u7c7b\u76ee\u5546\u54c1\uff1a\u5f53\u8be5\u5546\u54c1\u5728\u5546\u54c1\u754c\u9762\u9996\u6b21\u5c55\u793a\u7684\u3010\u9884\u8ba1\u5230\u8d27\u65f6\u95f4\u3011\u8d7760\u5929\u540e\u4ecd\u672a\u53d1\u8d27\uff0c\u5f00\u542f\u8865\u6b3e\u524d\u60a8\u53ef\u5c31\u8be5\u5546\u54c1\u7533\u8bf7\u9000\u6b3e\uff0c\u9000\u6b3e\u91d1\u989d\u4ee5\u60a8\u8d2d\u4e70\u65f6\u5b9e\u9645\u652f\u4ed8\u91d1\u989d\u4e3a\u51c6\u3002")])])]), e("p", [e("strong", [t._v("\u6ce8\uff1a\u82e5\u754c\u9762\u5c55\u793a\u7684\u3010\u9884\u8ba1\u5230\u8d27\u65f6\u95f4\u3011\u4e3a\u6708\u4efd\u7684\uff0c\u5219\u5ef6\u671f\u8d77\u7b97\u65f6\u95f4\u53d6\u8be5\u6708\u6700\u540e\u4e00\u5929\uff1b\u65e0\u3010\u9884\u8ba1\u5230\u8d27\u65f6\u95f4\u3011\u7684\uff0c\u4ee5\u3010\u521d\u59cb\u51fa\u8377\u65f6\u95f4\u3011\u4e3a\u9884\u8ba1\u5230\u8d27\u65f6\u95f4\u3002")])]), e("p", [e("br"), t._v("\n            2. \u5173\u4e8e\u9000\u6362\u8d27"), e("br"), e("strong", [t._v("\u4f1a\u5458\u8d2d\u4e0d\u5bf9\u6240\u63d0\u4f9b\u7684\u5546\u54c1\u7684\u9002\u7528\u6027\u6216\u6ee1\u8db3\u60a8\u7279\u5b9a\u9700\u6c42\u53ca\u76ee\u7684\u8fdb\u884c\u4efb\u4f55\u660e\u793a\u6216\u8005\u9ed8\u793a\u7684\u62c5\u4fdd\u3002")]), e("br"), e("strong", [t._v("\uff081\uff09\u9002\u7528\u4e8e\u4e03\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27\u5236\u5ea6\u7684\u5546\u54c1\uff0c\u5982\u60a8\u9700\u8981\u9000\u6362\u8d27\u7684\uff0c\u8bf7\u60a8\u4fdd\u8bc1\u5546\u54c1\u5b8c\u597d\u4e14\u4e0d\u5f71\u54cd\u4e8c\u6b21\u9500\u552e\uff0c\u9000\u6362\u8d27\u8fd0\u8d39\u7531\u60a8\u627f\u62c5\u3002")]), e("br"), e("strong", [t._v("\uff082\uff09\u56e0\u90e8\u5206\u5546\u54c1\u6027\u8d28\u7279\u6b8a\uff08\u624b\u529e\u3001\u7968\u52a1\u7b49\uff0c\u5177\u4f53\u4ee5\u5404\u5546\u54c1\u9875\u9762\u8bf4\u660e\u4e3a\u51c6\uff09\uff0c\u4e0d\u9002\u7528\u4e03\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27\u5236\u5ea6\u3002\u5982\u6709\u4e2a\u4eba\u539f\u56e0\u9000\u6362\u8d27\u9700\u6c42\uff0c\u8bf7\u60a8\u81ea\u884c\u5904\u7406\u3002")]), t._v("\u7968\u52a1\u7c7b\u5546\u54c1\u7684\u9000\u6362\u8d27\u5236\u5ea6\u5c06\u4f9d\u7167\u300a\u4f1a\u5458\u8d2d\u7968\u52a1\u670d\u52a1\u534f\u8bae\u300b\u6267\u884c\u3002\n            "), e("br"), e("strong", [t._v("\uff083\uff09\u4f1a\u5458\u8d2d\u4f1a\u5728\u76f8\u5173\u5546\u54c1\u9875\u9762\u5bf9\u4e8e\u5546\u54c1\u662f\u5426\u9002\u7528\u4e03\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27\u5236\u5ea6\u505a\u51fa\u63d0\u793a\uff0c\u8bf7\u60a8\u5728\u8d2d\u4e70\u524d\u4ed4\u7ec6\u67e5\u770b\u3002\u5982\u60a8\u9009\u62e9\u8d2d\u4e70\uff0c\u5219\u89c6\u4e3a\u60a8\u540c\u610f\u76f8\u5173\u89c4\u5219\u3002")]), e("br"), t._v("\n            \uff084\uff09\u5982\u679c\u60a8\u8d2d\u4e70\u7684\u5546\u54c1\u56e0\u5b58\u5728\u672c\u534f\u8bae\u9644\u4ef6\u4e00\u300a\u4f1a\u5458\u8d2d\u552e\u540e\u670d\u52a1\u7ec6\u5219\u300b\u4e2d\u6240\u793a\u53ef\u53d7\u7406\u95ee\u9898\u800c\u7533\u8bf7\u529e\u7406\u9000\u6362\u8d27\u7684\uff1a\n          ")]), e("ul", [e("li", [e("strong", [t._v("A.\n                \u60a8\u9700\u8981\u5728\u5546\u54c1\u7269\u6d41\u7b7e\u6536\u540e7\u5929\u5185\u8054\u7cfb\u5ba2\u670d\u7533\u8bf7\u9000\u6362\u8d27\u6216\u5728\u5546\u54c1\u7269\u6d41\u7b7e\u6536\u540e15\u5929\u5185\u8054\u7cfb\u5ba2\u670d\u7533\u8bf7\u6362\u8d27\u3002\u5982\u679c\u5546\u54c1\u7b26\u5408\u9000\u6362\u8d27\u6761\u4ef6\u4e14\u5e93\u5b58\u5145\u8db3\uff0c\u4f1a\u5458\u8d2d\u5c06\u4f18\u5148\u4e3a\u60a8\u63d0\u4f9b\u6362\u8d27\u670d\u52a1\uff1b\u5982\u5546\u54c1\u65e0\u5e93\u5b58\uff0c\u4f1a\u5458\u8d2d\u5c06\u4e3a\u60a8\u63d0\u4f9b\u9000\u8d27\u670d\u52a1\uff0c\u9000\u6362\u8d27\u8fd0\u8d39\u7531\u4f1a\u5458\u8d2d\u627f\u62c5\uff1b\u82e5\u60a8\u9700\u8981\u6307\u5b9a\u9000\u8d27\u5730\u5740\u6216\u591a\u5730\u5740\u9000\u8d27\u7684\uff0c\u5e94\u4e8b\u5148\u5f81\u5f97\u4f1a\u5458\u8d2d\u540c\u610f\u3002")])]), e("li", [e("strong", [t._v("B.\n                \u90e8\u5206\u9700\u8981\u54c1\u724c\u65b9\u552e\u540e\u7684\uff0c\u4f1a\u5458\u8d2d\u5c06\u4e3a\u60a8\u63d0\u4f9b\u552e\u540e\u9014\u5f84\u3002\u54c1\u724c\u65b9\u53ef\u63d0\u4f9b\u552e\u540e\u8303\u56f4\u4e3a\u90e8\u4ef6\u6362\u65b0/\u6574\u4ef6\u6362\u65b0/\u4fee\u590d\uff0c\u5904\u7406\u65f6\u6548\u4ee5\u54c1\u724c\u65b9\u901a\u77e5\u4e3a\u51c6\u3002")]), e("br"), e("strong", [t._v("\u4f1a\u5458\u8d2d\u4f1a\u6839\u636e\u60a8\u63d0\u4f9b\u7684\u5546\u54c1\u95ee\u9898\u8bc1\u636e\u8fdb\u884c\u5224\u65ad\uff0c\u60a8\u5e94\u5bf9\u8bc1\u636e\u7684\u771f\u5b9e\u6027\u3001\u5173\u8054\u6027\u3001\u5b8c\u6574\u6027\u3001\u51c6\u786e\u6027\u548c\u53ca\u65f6\u6027\u8d1f\u8d23\u3002")])])]), e("p", [e("strong", [t._v("\uff085\uff09\u9000\u8d27\u5546\u54c1\u5bc4\u56de\u540e\uff0c\u4f1a\u5458\u8d2d\u7b7e\u6536\u5546\u54c1\u524d\u7684\u98ce\u9669\u7531\u60a8\u627f\u62c5\u3002")]), e("br"), e("strong", [t._v("\uff086\uff09\u60a8\u5e94\u5728\u89c4\u5b9a\u7684\u9000\u8d27\u65f6\u95f4\u5185\u7533\u8bf7\u9000\u6362\u8d27\uff0c\u5e76\u5728\u88ab\u901a\u77e5\u53ef\u5bc4\u56de\u8d777\u5929\u5185\u5c06\u5546\u54c1\u5bc4\u56de\u5e76\u63d0\u4f9b\u7269\u6d41\u5355\u53f7\u81f3\u4f1a\u5458\u8d2d\u5728\u7ebf\u5ba2\u670d\u3002\u60a8\u56e0\u8d85\u65f6\u5bc4\u51fa\u5546\u54c1\u7684\uff0c\u5bf9\u540c\u4e00\u95ee\u9898\u6216\u7ef4\u6743\u539f\u56e0\u518d\u6b21\u4e3b\u5f20\u8981\u6c42\u9000\u8d27\u7684\uff0c\u4f1a\u5458\u8d2d\u6709\u6743\u4e0d\u4e88\u5904\u7406\u3002")]), e("br"), e("strong", [t._v("\uff087\uff09\u4f1a\u5458\u8d2d\u4e0d\u63a5\u53d7\u90ae\u8d39\u5230\u4ed8\u65b9\u5f0f\u9000\u8d27\u3002")])]), e("p", [e("br"), t._v("3. \u5173\u4e8e\u9000\u6b3e"), e("br"), t._v("\n            \uff081\uff09\u4f1a\u5458\u8d2d\u5728\u6536\u5230\u60a8\u7684\u9000\u8d27\u5546\u54c1\u5e76\u786e\u8ba4\u65e0\u8bef\u540e\uff0c\u6216\u60a8\u63d0\u4ea4\u9000\u6b3e\u7684\u8ba2\u5355\u8fd8\u6ca1\u6709\u53d1\u8d27\u7684\uff0c\u4f1a\u5c3d\u5feb\u4e3a\u60a8\u529e\u7406\u9000\u6b3e\u3002"), e("strong", [t._v("\u5982\u60a8\u9700\u627f\u62c5\u76f8\u5173\u8d39\u7528\uff08\u5305\u62ec\u4f46\u4e0d\u9650\u4e8e\u91cd\u590d\u914d\u9001\u3001\u62a5\u5173\u5931\u8d25\u3001\u9000\u8d27\u624b\u7eed\u8d39\u7b49\uff09\uff0c\u4f1a\u5458\u8d2d\u5c06\u4ece\u60a8\u5df2\u652f\u4ed8\u7684\u6b3e\u9879\u4e2d\u6263\u9664\u76f8\u5e94\u8d39\u7528\u5e76\u9000\u8fd8\u4f59\u989d\u3002")]), e("br"), t._v("\uff082\uff09\u9000\u6b3e\u6309\u60a8\u652f\u4ed8\u7684\u539f\u8def\u9000\u56de\uff0c\u8bf7\u60a8\u7559\u610f\u4f59\u989d\u53d8\u5316\u3002\n            "), e("br"), t._v("\n            \uff083\uff09\u82e5\u8d85\u8fc720\u4e2a\u5de5\u4f5c\u65e5\uff0c\u60a8\u4ecd\u672a\u6536\u5230\u9000\u6b3e\uff0c\u8bf7\u53ca\u65f6\u8054\u7cfb\u5ba2\u670d\u4eba\u5458\u3002\n          ")]), e("p", [e("br"), t._v("\n            4. \u5173\u4e8e\u53d1\u7968"), e("br"), t._v("\n            \u4f1a\u5458\u8d2d\u53d1\u9001\u7ed9\u60a8\u7684\u8ba2\u5355\u6e05\u5355\u53ef\u4f5c\u4e3a\u8d2d\u7269\u51ed\u8bc1\u3002\u5982\u9700\u5f00\u5177\u53d1\u7968\uff0c\u8bf7\u60a8\u5728\u8ba2\u5355\u7b7e\u6536\u786e\u8ba4\u65e0\u8bef\u540e\u540e\u8054\u7cfb\u5ba2\u670d\u7533\u8bf7\u5f00\u5177\u53d1\u7968\uff0c\u8bf7\u52a1\u5fc5\u786e\u4fdd\u76f8\u5173\u4fe1\u606f\u7684\u771f\u5b9e\u51c6\u786e\u6027\u3002\n            "), e("br")]), e("br"), e("p", [t._v("\n            \uff08\u4e94\uff09\u901a\u77e5"), e("br"), e("strong", [t._v("1.\u4e3a\u66f4\u597d\u5730\u4e3a\u60a8\u63d0\u4f9b\u670d\u52a1\uff0c\u60a8\u540c\u610f\u63a5\u53d7\u6211\u4eec\u5411\u60a8\u53d1\u9001\u4fe1\u606f\uff0c\u5305\u62ec\u4f46\u4e0d\u9650\u4e8e\u5728\u4f1a\u5458\u8d2d\u53d1\u5e03\u516c\u544a\uff0c\u5411\u60a8\u53d1\u9001\u7535\u5b50\u90ae\u4ef6\uff0c\u5411\u60a8\u63d0\u4f9b\u7684\u8054\u7cfb\u7535\u8bdd\u53d1\u9001\u624b\u673a\u77ed\u4fe1\u3001\u62e8\u6253\u7535\u8bdd\uff0c\u5411\u60a8\u7684\u54d4\u54e9\u54d4\u54e9\u8d26\u53f7\u53d1\u9001\u7ad9\u5185\u6d88\u606f\u4ee5\u53ca\u7cfb\u7edf\u6d88\u606f\uff0c\u5411\u60a8\u63d0\u4f9b\u7684\u5730\u5740\u90ae\u5bc4\u4e66\u9762\u901a\u77e5\u7b49\u3002\u5982\u679c\u4f1a\u5458\u8d2d\u80fd\u591f\u8bc1\u660e\u4ee5\u4e0a\u8ff0\u5f62\u5f0f\u7684\u4fe1\u606f\u5df2\u7ecf\u53d1\u9001\u7ed9\u60a8\u6216\u8005\u5df2\u5728\u76f8\u5173\u9875\u9762\u516c\u5e03\uff0c\u5c06\u89c6\u4e3a\u60a8\u5df2\u6536\u5230\u76f8\u5173\u4fe1\u606f\u3002\u4ee5\u7eb8\u8d28\u8f7d\u4f53\u53d1\u51fa\u7684\u4e66\u9762\u901a\u77e5\uff0c\u6309\u7167\u63d0\u4f9b\u8054\u7cfb\u5730\u5740\u4ea4\u90ae\u540e\u7684\u7b2c\u4e94\u4e2a\u81ea\u7136\u65e5\u5373\u89c6\u4e3a\u9001\u8fbe\u3002")]), e("br"), e("strong", [t._v("2.\u4e3a\u66f4\u597d\u5730\u5411\u60a8\u63d0\u4f9b\u670d\u52a1\uff0c\u4f1a\u5458\u8d2d\u53ef\u80fd\u901a\u8fc7\u7ad9\u5185\u6d88\u606f\u3001\u7cfb\u7edf\u6d88\u606f\u3001\u624b\u673a\u77ed\u4fe1\u3001\u7535\u8bdd\u7b49\u65b9\u5f0f\u5411\u60a8\u53d1\u9001\u8ba2\u5355\u4fe1\u606f\u3001\u4fc3\u9500\u6d3b\u52a8\u4fe1\u606f\u7b49\u3002\u5982\u60a8\u540c\u610f\u672c\u534f\u8bae\u5373\u89c6\u4e3a\u60a8\u5df2\u9ed8\u793a\u540c\u610f\u63a5\u53d7\u6b64\u9879\u670d\u52a1\u3002")]), e("br")]), e("br"), e("p", [t._v("\n            \uff08\u516d\uff09\u8bc4\u4ef7"), e("br"), t._v("\n            \u60a8\u6709\u6743\u5728\u4f1a\u5458\u8d2d\u63d0\u4f9b\u7684\u8bc4\u4ef7\u7cfb\u7edf\u4e2d\u5bf9\u4e0e\u60a8\u8fbe\u6210\u4ea4\u6613\u7684\u5546\u54c1\u8fdb\u884c\u8bc4\u4ef7\u3002\u60a8\u5e94\u5f53\u7406\u89e3\uff0c\u60a8\u5728\u4f1a\u5458\u8d2d\u7684\u8bc4\u4ef7\u4fe1\u606f\u662f\u516c\u5f00\u7684\u3002"), e("strong", [t._v("\u60a8\u7684\u6240\u6709\u8bc4\u4ef7\u884c\u4e3a\u5e94\u9075\u5b88\u672c\u534f\u8bae\u53ca\u4f1a\u5458\u8d2d\u670d\u52a1\u6761\u6b3e\uff0c\u8bc4\u4ef7\u5185\u5bb9\u5e94\u5f53\u5ba2\u89c2\u771f\u5b9e\uff0c\u4e0d\u5e94\u5305\u542b\u4efb\u4f55\u6c61\u8a00\u79fd\u8bed\u3001\u8272\u60c5\u4f4e\u4fd7\u3001\u5e7f\u544a\u4fe1\u606f\u53ca\u6cd5\u5f8b\u6cd5\u89c4\u4e0e\u54d4\u54e9\u54d4\u54e9\u670d\u52a1\u6761\u6b3e\u5217\u660e\u4e4b\u5176\u4ed6\u7981\u6b62\u6027\u4fe1\u606f\uff1b\u60a8\u4e0d\u5e94\u4ee5\u4e0d\u6b63\u5f53\u65b9\u5f0f\u5229\u7528\u8bc4\u4ef7\u6743\u5229\u5bf9\u5176\u4ed6\u7528\u6237\u5b9e\u65bd\u5a01\u80c1\u3001\u6572\u8bc8\u52d2\u7d22\u3002\u4f1a\u5458\u8d2d\u53ef\u5bf9\u60a8\u5b9e\u65bd\u4e0a\u8ff0\u884c\u4e3a\u6240\u4ea7\u751f\u7684\u8bc4\u4ef7\u4fe1\u606f\u8fdb\u884c\u5220\u9664\u6216\u5c4f\u853d\u3002\n              "), e("br")])]), e("br"), e("p", [t._v("\n            \uff08\u4e03\uff09\u5176\u4ed6"), e("br"), t._v("1.\n            \u9664\u975e\u53e6\u6709\u8bc1\u660e\uff0c\u50a8\u5b58\u5728\u4f1a\u5458\u8d2d\u670d\u52a1\u5668\u4e0a\u7684\u6570\u636e\u662f\u60a8\u4f7f\u7528\u4f1a\u5458\u8d2d\u670d\u52a1\u7684\u552f\u4e00\u6709\u6548\u8bc1\u636e\u3002\n          ")]), e("p", [e("strong", {
                staticClass: "text-under-line"
            }, [t._v("2.\n              \u4e0d\u53ef\u4e8c\u6b21\u9500\u552e\u3002\u60a8\u627f\u8bfa\uff0c\u4ec5\u4e3a\u4e2a\u4eba\u51fa\u4e8e\u975e\u5546\u4e1a\u76ee\u7684\u4f7f\u7528\u4f1a\u5458\u8d2d\u670d\u52a1,\u4ec5\u4e3a\u4e2a\u4eba\u5408\u7406\u81ea\u7528\u8d2d\u4e70\u4f1a\u5458\u8d2d\u6240\u6709\u5546\u54c1\uff0c\u5305\u62ec\u4f46\u4e0d\u9650\u4e8e\u9884\u552e\u5546\u54c1\u3001\u9b54\u529b\u8d4f\u5546\u54c1\u7b49\uff0c\u8d2d\u4e70\u540e\u4e0d\u4f1a\u5c06\u8be5\u7b49\u5546\u54c1\u8fdb\u884c\u4e8c\u6b21\u9500\u552e\u3002")]), e("br"), e("span", {
                staticClass: "text-under-line"
            }, [t._v("3. ")]), e("strong", {
                staticClass: "text-under-line"
            }, [t._v("\u82e5\u60a8\u5b58\u5728\u4ee5\u4e0b\u884c\u4e3a\uff0c\u4e00\u7ecf\u53d1\u73b0\uff0c\u6211\u4eec\u6709\u6743\u91c7\u53d6\u5305\u62ec\u4f46\u4e0d\u9650\u4e8e\u6682\u505c\u53d1\u8d27\u3001\u53d6\u6d88\u8ba2\u5355\u3001\u62e6\u622a\u5df2\u53d1\u8d27\u7684\u8ba2\u5355\u3001\u9650\u5236\u8d26\u6237\u90e8\u5206\u6216\u5168\u90e8\u6743\u9650\u3001\u5c01\u7981\u8d26\u53f7\u7b49\u63aa\u65bd\uff1a")]), e("br"), e("strong", [t._v("\uff081\uff09\u5c06\u81ea\u6709\u8d26\u6237\u5185\u7684\u4f18\u60e0\u3001\u4fc3\u9500\u4fe1\u606f\u8f6c\u5356\u3001\u8f6c\u8ba9\u4e88\u4ed6\u4eba\uff1b "), e("br")]), e("strong", [t._v("\uff082\uff09\u901a\u8fc7\u4f1a\u5458\u8d2d\u53ca\u5176\u5408\u4f5c\u5546\u7684\u5408\u6cd5\u6d3b\u52a8\u9875\u9762\u4e4b\u5916\u7684\u7b2c\u4e09\u65b9\u4ea4\u6613\u6e20\u9053\u83b7\u5f97\u4f18\u60e0\u5238\u5e76\u5728\u4f1a\u5458\u8d2d\u8fdb\u884c\u4f7f\u7528\uff1b\n              "), e("br")]), e("strong", [t._v("\uff083\uff09\u5728\u4f1a\u5458\u8d2d\u6076\u610f\u6279\u91cf\u5237\u53d6\u4f18\u60e0\u5238\u7b49\u5e76\u5728\u4f1a\u5458\u8d2d\u4f7f\u7528\uff1b "), e("br")]), e("strong", [t._v("\uff084\uff09\u5229\u7528\u6280\u672f\u624b\u6bb5\u6216\u5176\u4ed6\u65b9\u5f0f\u5728\u4f1a\u5458\u8d2d\u5957\u53d6\u5546\u54c1\u3001\u4f18\u60e0\u5238\u3001\u9b54\u6676\u3001\u8fd0\u8d39\u6216\u8005\u5176\u4ed6\u5229\u76ca\uff1b"), e("br")]), e("strong", [t._v("\uff085\uff09\u540c\u4e00\u7528\u6237\u91cd\u590d\u53c2\u4e0e\u4fc3\u9500\u6d3b\u52a8\uff0c\u201c\u540c\u4e00\u7528\u6237\u201d\u6307\u4f7f\u7528\u540c\u4e00\u8d26\u53f7\u3001\u540c\u4e00\u624b\u673a\u53f7\u3001\u540c\u4e00\u8bbe\u5907\u3001\u540c\u4e00\u8eab\u4efd\u8bc1\u3001\u540c\u4e00\u652f\u4ed8\u8d26\u53f7\u3001\u6216\u540c\u4e00\u6536\u8d27\u5730\u5740\u7b49\u7684\u7528\u6237\uff0c\u5176\u4e2d\u4efb\u610f\u4e00\u9879\u6216\u6570\u9879\u5b58\u5728\u76f8\u540c\u3001\u76f8\u4f3c\u3001\u975e\u771f\u5b9e\u6709\u6548\u3001\u901a\u8fc7\u7279\u5b9a\u6807\u8bb0\u5f62\u6210\u5173\u8054\uff0c\u6216\u4f1a\u5458\u8d2d\u6709\u5408\u7406\u7406\u7531\u8ba4\u4e3a\u5b58\u5728\u5173\u8054\u7684\uff0c\u90fd\u89c6\u4e3a\u540c\u4e00\u7528\u6237\uff1b")])]), e("p", [e("strong", [t._v("\uff086\uff09\u81ea\u884c\u6216\u59d4\u6258\u4ed6\u4eba\u901a\u8fc7\u673a\u5668\u4eba\u8f6f\u4ef6\u3001\u8718\u86db\u8f6f\u4ef6\u3001\u722c\u866b\u8f6f\u4ef6\u3001\u5237\u5c4f\u8f6f\u4ef6\u7b49\u4efb\u4f55\u7a0b\u5e8f\u6216\u6280\u672f\u624b\u6bb5\u53c2\u4e0e\u4fc3\u9500\u6d3b\u52a8\uff1b")])]), e("p", [e("strong", [t._v("\uff087\uff09\u4ee5\u975e\u51fa\u4e8e\u4e2a\u4eba\u6d88\u8d39\u4f7f\u7528\u7684\u6076\u610f\u76ee\u7684\u62cd\u4e0b\u5546\u54c1\uff0c\u5e76\u5728\u62cd\u4e0b\u540e\u6076\u610f\u7533\u8bf7\u9000\u6b3e\u3001\u6076\u610f\u7533\u8bf7\u552e\u540e\u7b49\uff0c\u9664\u672c\u534f\u8bae\u53e6\u6709\u7ea6\u5b9a\u5916\uff0c\u4f1a\u5458\u8d2d\u4e0d\u4e88\u9000\u6b3e\uff1b")])]), e("p", [e("strong", [t._v("\uff088\uff09\u7ecf\u4e3e\u62a5\u6216\u4f1a\u5458\u8d2d\u6709\u5408\u7406\u7406\u7531\u8ba4\u4e3a\u8d26\u53f7\u4ece\u4e8b\u4e8c\u6b21\u9500\u552e\u884c\u4e3a\u7684\uff1b")])]), e("p", [e("strong", [t._v("\uff089\uff09\u5192\u7528\u4ed6\u4eba\u7684\u8054\u7cfb\u7535\u8bdd\u3001\u6536\u8d27\u5730\u5740\u8fdb\u884c\u63d0\u4ea4\u8ba2\u5355\u7684\uff1b")])]), e("p", [e("strong", [t._v("\uff0810\uff09\u6536\u8d27\u4eba\u79f0\u5546\u54c1\u975e\u672c\u4eba\u8ba2\u8d2d\u3001\u672a\u59d4\u6258\u4ed6\u4eba\u8ba2\u8d2d\u4e14\u672a\u63a5\u53d7\u4ed6\u4eba\u4e3a\u81ea\u5df1\u8ba2\u8d2d\uff1b")])]), e("p", [e("strong", [t._v("\uff0811\uff09\u6270\u4e71\u6b63\u5e38\u4ea4\u6613\u79e9\u5e8f\u7684\u884c\u4e3a\uff0c\u5305\u62ec\u4f46\u4e0d\u9650\u4e8e\uff1a")])]), e("p", [e("strong", [t._v("A. \u77ed\u65f6\u95f4\u5185\u5927\u91cf\u8d2d\u4e70\u4f4e\u4ef7\u6216\u4fc3\u9500\u5546\u54c1\uff1b")])]), e("p", [e("strong", [t._v("B. \u4f7f\u7528\u4e0d\u540c\u7684\u4e70\u5bb6\u8d26\u53f7\u5927\u91cf\u8d2d\u4e70\u5546\u54c1\uff1b")])]), e("p", [e("strong", [t._v("C.\n              \u8d85\u51fa\u6b63\u5e38\u4ea4\u6613\u4e60\u60ef\uff0c\u9891\u7e41\u62d2\u7edd\u652f\u4ed8\u5c3e\u6b3e\u3001\u62d2\u6536\u5546\u54c1\u3001\u62d2\u7edd\u63a5\u53d7\u670d\u52a1\u6216\u9891\u7e41\u63d0\u51fa\u9000\u6362\u8d27\u7b49\u552e\u540e\u8981\u6c42\u7684\uff1b")])]), e("p", [e("strong", [t._v("D. \u91c7\u53d6\u6b3a\u8bc8\u624b\u6bb5\u9000\u6362\u8d27\u7684\uff0c\u5982\u552e\u540e\u9000\u8d27\u6389\u5305\u7b49\uff1b")])]), e("p", [e("strong", [t._v("E. \u7ec4\u7ec7\u6216\u53c2\u4e0e\u865a\u5047\u4ea4\u6613\u7684\uff1b")])]), e("p", [e("strong", [t._v("F.\n              \u8d2d\u4e70\u5927\u91cf\u5546\u54c1\u4e14\u7528\u4e0d\u5408\u7406\u7406\u7531\u8981\u631f\u3001\u6050\u5413\u3001\u6572\u8bc8\u4f1a\u5458\u8d2d\uff0c\u5f71\u54cd\u6b63\u5e38\u4ea4\u6613\u7684\u884c\u4e3a\u3002")])]), e("p", [e("strong", [t._v("\uff0812\uff09\u4f1a\u5458\u8d2d\u8ba4\u5b9a\u7684\u5176\u4ed6\u4e0d\u6b63\u5f53\u884c\u4e3a\u3001\u821e\u5f0a\u884c\u4e3a\u548c\u6076\u610f\u884c\u4e3a\u3002"), e("br")]), e("strong", [t._v("\u60a8\u786e\u8ba4\u5e76\u540c\u610f\uff0c\u524d\u8ff0\u63aa\u65bd\u5c06\u540c\u6837\u9002\u7528\u4e8e\u60a8\u7684\u5173\u8054\u8d26\u53f7\u3002")])]), e("br"), e("p", [e("strong", [t._v("\u4e09\u3001\u514d\u8d23\u4e8b\u7531")]), e("br"), e("strong", [t._v("1.\n              \u60a8\u77e5\u6089\u5e76\u540c\u610f\uff0c\u4f1a\u5458\u8d2d\u4e0d\u56e0\u4e0b\u8ff0\u4efb\u4e00\u60c5\u51b5\u800c\u53ef\u80fd\u5bfc\u81f4\u7684\u4efb\u4f55\u635f\u5bb3\u8d54\u507f\u627f\u62c5\u8d23\u4efb\uff0c\u5305\u62ec\u4f46\u4e0d\u9650\u4e8e\u8d22\u4ea7\u3001\u6536\u76ca\u3001\u6570\u636e\u8d44\u6599\u7b49\u65b9\u9762\u7684\u635f\u5931\u6216\u5176\u5b83\u65e0\u5f62\u635f\u5931\uff1a"), e("br")]), e("strong", [t._v("\uff081\uff09\u56e0\u53f0\u98ce\u3001\u5730\u9707\u3001\u6d77\u5578\u3001\u6d2a\u6c34\u3001\u505c\u7535\u3001\u6218\u4e89\u3001\u6050\u6016\u88ad\u51fb\u7b49\u4e0d\u53ef\u6297\u529b\u4e4b\u56e0\u7d20\u5bfc\u81f4\u7cfb\u7edf\u6216\u670d\u52a1\u4e0d\u80fd\u6b63\u5e38\u8fd0\u4f5c\uff1b\n              "), e("br")]), e("strong", [t._v("\uff082\uff09\u7531\u4e8e\u9ed1\u5ba2\u653b\u51fb\u3001\u7535\u4fe1\u90e8\u95e8\u6280\u672f\u8c03\u6574\u6216\u6545\u969c\u3001\u7cfb\u7edf\u7ef4\u62a4\u7b49\u539f\u56e0\u800c\u9020\u6210\u7684\u7cfb\u7edf\u670d\u52a1\u4e2d\u65ad\u6216\u8005\u5ef6\u8fdf\uff1b\n              "), e("br")]), e("strong", [t._v("\uff083\uff09\u7531\u4e8e\u653f\u5e9c\u547d\u4ee4\u3001\u6cd5\u5f8b\u6cd5\u89c4\u7684\u53d8\u66f4\u3001\u53f8\u6cd5\u673a\u5173\u53ca\u884c\u653f\u673a\u5173\u7684\u547d\u4ee4\u3001\u88c1\u5b9a\u7b49\u539f\u56e0\u800c\u5bfc\u81f4\u7684\u7cfb\u7edf\u670d\u52a1\u4e2d\u65ad\u3001\u7ec8\u6b62\u6216\u5ef6\u8fdf\uff1b\n              "), e("br")]), e("strong", [t._v("\uff084\uff09\u7531\u4e8e\u60a8\u5c06\u8d26\u53f7\u3001\u5bc6\u7801\u544a\u77e5\u4ed6\u4eba\u6216\u672a\u4fdd\u7ba1\u597d\u81ea\u5df1\u7684\u5bc6\u7801\u6216\u4e0e\u4ed6\u4eba\u5171\u4eab\u8d26\u53f7\u6216\u4efb\u4f55\u5176\u4ed6\u975e\u4f1a\u5458\u8d2d\u7684\u8fc7\u9519\uff0c\u5bfc\u81f4\u60a8\u7684\u4e2a\u4eba\u8d44\u6599\u6cc4\u9732\uff1b\n              "), e("br")]), e("strong", [t._v("\uff085\uff09\u7531\u4e8e\u4e0e\u4f1a\u5458\u8d2d\u94fe\u63a5\u6216\u5408\u4f5c\u7684\u5176\u5b83\u7f51\u7ad9\u6240\u9020\u6210\u7684\u94f6\u884c\u8d26\u6237\u4fe1\u606f\u3001\u8eab\u4efd\u4fe1\u606f\u6cc4\u9732\u53ca\u7531\u6b64\u800c\u5bfc\u81f4\u7684\u4efb\u4f55\u6cd5\u5f8b\u4e89\u8bae\u548c\u540e\u679c\uff1b\n              "), e("br")]), e("strong", [t._v("\uff086\uff09\u60a8\uff08\u5305\u62ec\u672a\u6210\u5e74\u4eba\u7528\u6237\uff09\u5411\u4f1a\u5458\u8d2d\u63d0\u4f9b\u9519\u8bef\u3001\u4e0d\u5b8c\u6574\u3001\u4e0d\u5b9e\u4fe1\u606f\u7b49\uff0c\u9020\u6210\u4e0d\u80fd\u4f7f\u7528\u9b54\u77f3\u6216\u906d\u53d7\u4efb\u4f55\u5176\u4ed6\u635f\u5931\uff1b"), e("br")]), e("strong", [t._v("\uff087\uff09\u5982\u56e0\u7cfb\u7edf\u7ef4\u62a4\u6216\u5347\u7ea7\u7684\u9700\u8981\u800c\u9700\u6682\u505c\u670d\u52a1\u65f6\uff0c\u6211\u4eec\u5c06\u5c3d\u53ef\u80fd\u4e8b\u5148\u8fdb\u884c\u901a\u77e5\u3002\u5bf9\u4e8e\u670d\u52a1\u7684\u4e2d\u65ad\u6216\u7ec8\u6b62\u800c\u7ed9\u60a8\u9020\u6210\u7684\u4efb\u4f55\u635f\u5931\uff0c\u6211\u4eec\u65e0\u987b\u5bf9\u60a8\u6216\u4efb\u4f55\u7b2c\u4e09\u65b9\u627f\u62c5\u4efb\u4f55\u8d23\u4efb\u3002")]), e("strong", [e("br"), t._v("2.\n              \u60a8\u7406\u89e3\u4f1a\u5458\u8d2d\u5bf9\u60a8\u7684\u4efb\u4f55\u8bf7\u6c42\u91c7\u53d6\u884c\u52a8\u5747\u9700\u8981\u5408\u7406\u65f6\u95f4\uff0c\u4e14\u4f1a\u5458\u8d2d\u5e94\u60a8\u8bf7\u6c42\u800c\u91c7\u53d6\u7684\u884c\u52a8\u53ef\u80fd\u65e0\u6cd5\u907f\u514d\u6216\u963b\u6b62\u4fb5\u5bb3\u540e\u679c\u7684\u5f62\u6210\u6216\u6269\u5927\uff0c\u9664\u4f1a\u5458\u8d2d\u5b58\u5728\u6cd5\u5b9a\u8fc7\u9519\u5916\uff0c\u4f1a\u5458\u8d2d\u4e0d\u627f\u62c5\u8d23\u4efb\u3002")])]), e("br"), e("p", [e("strong", [t._v("\u56db\u3001\u6cd5\u5f8b\u9002\u7528\u4e0e\u4e89\u8bae\u89e3\u51b3")]), e("br"), e("strong", [t._v("1.\n              \u4f1a\u5458\u8d2d\u4e0d\u884c\u4f7f\u3001\u672a\u80fd\u53ca\u65f6\u884c\u4f7f\u6216\u8005\u672a\u5145\u5206\u884c\u4f7f\u672c\u534f\u8bae\u6216\u8005\u6309\u7167\u6cd5\u5f8b\u89c4\u5b9a\u6240\u4eab\u6709\u7684\u6743\u5229\uff0c\u4e0d\u5e94\u88ab\u89c6\u4e3a\u653e\u5f03\u8be5\u6743\u5229\uff0c\u4e5f\u4e0d\u5f71\u54cd\u4f1a\u5458\u8d2d\u5728\u5c06\u6765\u884c\u4f7f\u8be5\u6743\u5229\u3002")]), e("strong", [e("br"), t._v("2.\n              \u672c\u534f\u8bae\u7684\u8ba2\u7acb\u3001\u6548\u529b\u3001\u89e3\u91ca\u3001\u5c65\u884c\u3001\u4fee\u6539\u548c\u7ec8\u6b62\u4ee5\u53ca\u4e89\u8bae\u7684\u89e3\u51b3\u9002\u7528\u4e2d\u534e\u4eba\u6c11\u5171\u548c\u56fd\u6cd5\u5f8b\u3002\u5982\u5c31\u672c\u534f\u8bae\u5185\u5bb9\u6216\u5176\u6267\u884c\u53d1\u751f\u4efb\u4f55\u4e89\u8bae\uff0c\u5e94\u5c3d\u91cf\u901a\u8fc7\u53cb\u597d\u534f\u5546\u7684\u65b9\u5f0f\u52a0\u4ee5\u89e3\u51b3\u3002\u5982\u4e00\u65b9\u5411\u53e6\u4e00\u65b9\u53d1\u51fa\u8981\u6c42\u534f\u5546\u89e3\u51b3\u7684\u4e66\u9762\u901a\u77e5\u540e30\u5929\u5185\u4e89\u8bae\u4ecd\u672a\u89e3\u51b3\uff0c\u5219\u4e89\u8bae\u53cc\u65b9\u5747\u4e00\u81f4\u540c\u610f\u63d0\u4ea4\u4e0a\u6d77\u4ef2\u88c1\u59d4\u5458\u4f1a\u6309\u7167\u5176\u4ef2\u88c1\u89c4\u5219\u8fdb\u884c\u4ef2\u88c1\u3002\u4ef2\u88c1\u88c1\u51b3\u662f\u7ec8\u5c40\u7684\uff0c\u5bf9\u53cc\u65b9\u5747\u6709\u7ea6\u675f\u529b\u3002")])]), e("p", [e("br")]), e("p", [e("strong", [t._v("\u9644\u4ef6\u4e00\uff1a\u4f1a\u5458\u8d2d\u552e\u540e\u670d\u52a1\u7ec6\u5219")]), e("br"), e("strong", [t._v("\u4e00\u3001\u63a5\u53d7\u552e\u540e\u65f6\u95f4")]), e("br"), t._v("\u975e\u7968\u52a1\uff1a\u9000\u8d27\u7533\u8bf7--\u81ea\u7269\u6d41\u7b7e\u6536\u540e\u8d777\u5929\u5185\uff1b\u6362\u8d27\u7533\u8bf7--\u81ea\u7269\u6d41\u7b7e\u6536\u540e\u8d7715\u5929\u5185\uff08\u4ee5\u81ea\u7136\u5929\u8ba1\u7b97\uff09"), e("br"), t._v("\u7968\u52a1\uff1a\u5c55\u89c8--\u5f00\u5c55\u524d\u4e00\u5929\uff1b\u6f14\u51fa--\u6f14\u51fa\u524d\u4e00\u5929\uff1b\u672c\u5730\u751f\u6d3b--\u9879\u76ee\u5f00\u59cb\u524d\u4e00\u5929\n          ")]), e("p", [e("br"), e("strong", [t._v("\u4e8c\u3001\u552e\u540e\u5904\u7406\u65f6\u6548")]), e("br"), t._v("\u975e\u7968\u52a1\uff1a1.\n            \u5982\u9700\u56de\u5bc4\u9000\u6362\u8d27\u7684\uff0c\u7528\u6237\u9700\u5728\u6536\u5230\u4f1a\u5458\u8d2d\u901a\u77e5\u8d777\u5929\u5185\u56de\u5bc4\u5546\u54c1\uff08\u6625\u8282\u5047\u671f\u4ee5\u4f1a\u5458\u8d2d\u516c\u544a\u4e3a\u51c6\uff09\u30022.\n            \u54c1\u724c\u65b9\u552e\u540e\u5904\u7406\u5468\u671f\u4ee5\u54c1\u724c\u65b9\u65f6\u6548\u4e3a\u51c6\u3002"), e("br"), t._v("\u7968\u52a1\uff1a\u7533\u8bf7\u552e\u540e\u768424\u5c0f\u65f6\u5185\u5904\u7406\u3002\n          ")]), e("p", [e("br"), e("strong", [t._v("\u4e09\u3001\u624b\u529e\u6a21\u73a9\u7c7b\u5546\u54c1\u552e\u540e\u8303\u56f4\u53ca\u8981\u6c42")]), e("br"), e("strong", [t._v("1.\u3010\u975e\u552e\u540e\u8303\u56f4\u3011")]), e("br"), t._v("\n            \uff081\uff09\u4e2a\u4eba\u5b89\u88c5\u95ee\u9898\u635f\u574f\u3002"), e("br"), t._v("\n            \uff082\uff09\u4e2a\u4eba\u539f\u56e0\u9000\u8d27\u9000\u6b3e\u3002"), e("br"), t._v("\n            \uff083\uff09\u5546\u54c1\u672c\u8eab\u5de5\u827a\u4f1a\u5b58\u5728\u5dee\u5f02\uff0c\u666e\u904d\u5b58\u5728\u7684\u7ec6\u5c0f\u7455\u75b5\u3001\u5206\u6a21\u7ebf\u75d5\u8ff9\u3001\u8272\u5dee\u3001\u6c34\u7eb9\u7b49\u3002"), e("br"), t._v("\n            \uff084\uff09\u5546\u54c1\u5916\u5305\u88c5\u53ef\u80fd\u56e0\u751f\u4ea7\u3001\u5236\u4f5c\u3001\u6253\u5305\u3001\u7269\u6d41\u8fd0\u8f93\u7b49\u539f\u56e0\u9020\u6210\u8f7b\u5fae\u78d5\u78b0\u3001\u51f9\u9677\u3001\u5546\u54c1\u5916\u76d2\u96ea\u68a8\u7eb8/\u725b\u76ae\u7eb8/\u4fdd\u62a4\u7eb8\u7834\u635f\u3001\u80f6\u8d34\u7fd8\u8d77/\u6c14\u6ce1\u7b49\u3002"), e("br"), e("strong", [t._v("\uff085\uff09\u4e0a\u8ff0\u60c5\u51b5\u5c5e\u4e8e\u6b63\u5e38\u73b0\u8c61\uff0c\u4f1a\u5458\u8d2d\u4e0d\u53d7\u7406\u6b64\u7c7b\u539f\u56e0\u7684\u552e\u540e\u3002\u672a\u6309\u8981\u6c42\u4e3e\u8bc1\u81f4\u4f7f\u4e3e\u8bc1\u4e0d\u5145\u5206\u7684\u3001\u672a\u5728\u672c\u89c4\u5219\u89c4\u5b9a\u7684\u671f\u9650\u5185\u53d1\u8d77\u7533\u8bf7\u7b49\u60c5\u51b5\u4e5f\u65e0\u6cd5\u53d7\u7406\uff0c\u8bf7\u60a8\u7406\u89e3\u3002")])]), e("p", [e("br"), t._v("\n            2.\u3010\u624b\u529e\u6a21\u73a9\u5404\u7c7b\u76ee\u53d7\u7406\u660e\u7ec6\u3011\n            "), e("br"), t._v("\n            \uff081\uff09\u624b\u529e/figma/\u7c98\u571f\u4eba/\u76d2\u86cb"), e("br"), e("strong", [t._v("\u4e0d\u652f\u6301\u4e03\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27")]), e("br"), t._v("\u3010\u552e\u540e\u8303\u56f4\u3011\u65ad\u4ef6/\u7f3a\u4ef6/\u914d\u4ef6\u9519\u6f0f/\u8e6d\u8272/\u6d82\u88c5\u4e0d\u5168/\u4e25\u91cd\u76d2\u635f\u7b49\u975e\u4eba\u4e3a\u635f\u574f\u3002\n            "), e("br"), t._v("\n            \u3010\u4e3e\u8bc1\u8981\u6c42\u30111. \u5185\u90e8\u900f\u660e\u5305\u88c5/\u5438\u5851\u5f0f\u5305\u88c5/\u900f\u660e\u5305\u88c5\u888b\u672a\u62c6\uff1b2.\n            \u8bc1\u660e\u95ee\u9898\u7684\u7167\u7247/\u89c6\u9891\u6216\u5176\u4ed6\u4e3e\u8bc1\u3002\n            "), e("br"), t._v("\n            \uff082\uff09\u666f\u54c1\u624b\u529e/\u96d5\u50cf/ \u96d5\u5851"), e("br"), e("strong", [t._v("\u4e0d\u652f\u6301\u4e03\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27")]), e("br"), t._v("\u3010\u552e\u540e\u8303\u56f4\u3011\u53d1\u9519/\u65ad\u4ef6/\u7f3a\u4ef6/\u914d\u4ef6\u9519\u6f0f/\u4e3b\u8981\u90e8\u4f4d\u4e25\u91cd\u8e6d\u8272>2mm/\u6d82\u88c5\u4e0d\u5168/\u4e25\u91cd\u76d2\u635f\u7b49\u975e\u4eba\u4e3a\u635f\u574f\u3002"), e("br"), t._v("\n            \u3010\u4e3e\u8bc1\u8981\u6c42\u30111. \u5185\u90e8\u900f\u660e\u5305\u88c5/\u5438\u5851\u5f0f\u5305\u88c5/\u900f\u660e\u5305\u88c5\u888b\u672a\u62c6\uff1b2.\n            \u8bc1\u660e\u95ee\u9898\u7684\u7167\u7247/\u89c6\u9891\u6216\u5176\u4ed6\u4e3e\u8bc1\u3002"), e("br"), t._v("\n            \uff083\uff09\u62fc\u88c5\u6a21\u578b/\u6210\u54c1\u6a21\u578b"), e("br"), e("strong", [t._v("\u4e0d\u652f\u6301\u4e03\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27")]), e("br"), t._v("\u3010\u552e\u540e\u8303\u56f4\u3011\u53d1\u9519/\u7f3a\u4ef6/\u65ad\u4ef6/\u5176\u4ed6\u975e\u4eba\u4e3a\u635f\u574f\u3002"), e("br"), t._v("\n            \u3010\u4e3e\u8bc1\u8981\u6c42\u30111. \u672a\u62c6\u5c01\u60c5\u51b5\u4e0b\u4e3e\u8bc1\u53d1\u9519/\u7f3a\u4ef6/\u65ad\u4ef6/\u5176\u4ed6\u975e\u4eba\u4e3a\u635f\u574f\uff1b2.\n            \u8bc1\u660e\u95ee\u9898\u7684\u7167\u7247/\u89c6\u9891\u6216\u5176\u4ed6\u4e3e\u8bc1\u3002\n            "), e("br"), t._v("\n            \uff084\uff09\u76f2\u76d2"), e("br"), e("strong", [t._v("\u4e0d\u652f\u6301\u4e03\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27")]), e("br"), t._v("\n            \u3010\u552e\u540e\u8303\u56f4\u3011\u53d1\u9519/\u7f3a\u4ef6/\u65ad\u4ef6/\u4e25\u91cd\u7455\u75b5\u7b49\u975e\u4eba\u4e3a\u635f\u574f\u3002"), e("br"), t._v("\n            \u3010\u4e3e\u8bc1\u8981\u6c42\u30111.\n            \u975e\u4f1a\u5458\u8d2d\u4e8c\u6b21\u5305\u88c5\u5546\u54c1\uff1a\u5185\u90e8\u900f\u660e\u5305\u88c5/\u5438\u5851\u5f0f\u5305\u88c5/\u900f\u660e\u5305\u88c5\u888b\u672a\u62c6\uff1b2.\n            \u4f1a\u5458\u8d2d\u4e8c\u6b21\u5305\u88c5\u5546\u54c1\uff1a\u8bc1\u660e\u95ee\u9898\u7684\u7167\u7247/\u89c6\u9891\u6216\u5176\u4ed6\u4e3e\u8bc1\u3002"), e("br"), t._v("\n            \u3010\u552e\u540e\u5904\u7406\u65b9\u5f0f\u30111.\n            \u5c5e\u4e8e\u8d28\u91cf\u95ee\u9898\u7684\uff0c\u5c06\u8d2d\u7269\u51ed\u8bc1\u3001\u5305\u88c5\u3001\u95ee\u9898\u5546\u54c1\u7b49\u6240\u6709\u7269\u54c1\uff0c\u4e00\u5e76\u5bc4\u56de\u529e\u7406\u9000\u6362\u8d27\u624b\u7eed\uff1b2.\n            \u90e8\u5206\u5546\u54c1\u5c5e\u4e8e\u54c1\u724c\u65b9\u63d0\u4f9b\u552e\u540e\uff0c\u8bf7\u6309\u7167\u4f1a\u5458\u8d2d\u63d0\u4f9b\u7684\u8054\u7cfb\u65b9\u5f0f\u8fdb\u884c\u552e\u540e\u7533\u8bf7\u3002\u54c1\u724c\u65b9\u53ef\u63d0\u4f9b\u552e\u540e\u8303\u56f4\u4e3a\uff08\u90e8\u4ef6\u6362\u65b0/\u6574\u4ef6\u6362\u65b0/\u4fee\u590d\uff093.\n            \u552e\u540e\u5904\u7406\u65b9\u5f0f\u4e3a\u90e8\u4ef6\u6362\u65b0/\u6574\u4ef6\u6362\u65b0/\u4fee\u590d\uff0c\u4ec5\u9650\u4f1a\u5458\u8d2d/\u54c1\u724c\u65b9\u65e0\u6cd5\u63d0\u4f9b\u4e0a\u8ff0\u552e\u540e\u670d\u52a1\u65f6\uff0c\u7531\u4f1a\u5458\u8d2d\u4e3a\u7528\u6237\u63d0\u4f9b\u9000\u8d27\u9000\u6b3e\u65b9\u6848\u3002\n          ")]), e("br"), e("p", [e("strong", [t._v("\u56db\u3001\u9b54\u529b\u8d4f\u5546\u54c1\u552e\u540e\u8303\u56f4\u53ca\u8981\u6c42")]), e("br"), t._v("\u9b54\u529b\u8d4f"), e("br"), e("strong", [t._v("\u4e0d\u652f\u6301\u4e03\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27")]), e("strong", [e("br")]), t._v("\n            \u3010\u552e\u540e\u8303\u56f4\u3011\u6309\u5176\u4e0d\u540c\u7684\u5546\u54c1\u54c1\u7c7b\uff0c\u53c2\u7167\u672c\u300a\u4f1a\u5458\u8d2d\u552e\u540e\u670d\u52a1\u7ec6\u5219\u300b\u4e2d\u8be5\u54c1\u7c7b\u7684\u552e\u540e\u8303\u56f4\u53ca\u8981\u6c42\u3002\n            "), e("br"), t._v("\n            \u3010\u4e3e\u8bc1\u8981\u6c42\u3011\u6309\u5176\u4e0d\u540c\u7684\u5546\u54c1\u54c1\u7c7b\uff0c\u53c2\u7167\u672c\u300a\u4f1a\u5458\u8d2d\u552e\u540e\u670d\u52a1\u7ec6\u5219\u300b\u4e2d\u8be5\u54c1\u7c7b\u7684\u552e\u540e\u8303\u56f4\u53ca\u8981\u6c42\u3002\n            "), e("br"), t._v("\n            \u3010\u552e\u540e\u5904\u7406\u65b9\u5f0f\u3011\u6309\u5176\u4e0d\u540c\u7684\u5546\u54c1\u54c1\u7c7b\uff0c\u53c2\u7167\u672c\u300a\u4f1a\u5458\u8d2d\u552e\u540e\u670d\u52a1\u7ec6\u5219\u300b\u4e2d\u8be5\u54c1\u7c7b\u7684\u552e\u540e\u8303\u56f4\u53ca\u8981\u6c42\n            "), e("br"), e("br"), e("strong", [t._v("\u4e94\u3001\u5468\u8fb9\u7c7b\u5546\u54c1\u552e\u540e\u8303\u56f4\u53ca\u8981\u6c42")]), e("br"), t._v("1.3c\u7c7b"), e("br"), t._v("\n            \u652f\u6301\u4e03\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27"), e("br"), t._v("\n            \u3010\u552e\u540e\u8303\u56f4\u30111. \u5546\u54c1\u8d28\u91cf\u95ee\u9898\uff1b2. \u7269\u6d41\u7834\u635f\u95ee\u9898\uff1b3.\n            \u63cf\u8ff0\u4e0d\u7b26\u95ee\u9898\uff1b4.\u652f\u63017\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27\u7684\u5546\u54c1\u3002"), e("br"), t._v("\n            \u3010\u975e\u552e\u540e\u8303\u56f4\u30111.\n            \u624b\u673a\u3001\u6570\u7801\u542b\u6388\u6743\u6216\u6fc0\u6d3b\u4fe1\u606f\u7684\uff0c\u5305\u62ec\u4f46\u4e0d\u9650\u4e8e\u4e8e\u5e8f\u5217\u53f7SN\u3001\u6fc0\u6d3b\u7801\u3001CDKEY\n            \u7b49\uff0c\u4e00\u65e6\u4ea7\u751f\u6388\u6743\u6216\u6fc0\u6d3b\u7a0b\u5e8f\uff0c\u5c06\u4e0d\u80fd\u4eab\u53d7\u201c7\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27\u201d\u653f\u7b56\uff1b2.\u82e5\u5546\u54c1\u56e0\u4f7f\u7528\u4ea7\u751f\u5546\u54c1\u6e05\u6d01\u5ea6\u3001\u78e8\u635f\u5ea6\u53d7\u635f\u5982\u52a0\u6e7f\u5668\u4f7f\u7528\u540e\u4ea7\u751f\u6c34\u6e0d\u95ee\u9898\u7b49\u5219\u6b64\u7c7b\u5546\u54c1\u5c06\u4e0d\u80fd\u4eab\u53d7\u201c7\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27\u201d\u653f\u7b56\uff1b3.\n            \u5176\u4ed6\u56e0\u5546\u54c1\u6027\u8d28\u7279\u6b8a\u4e14\u63d0\u524d\u5728\u9875\u9762\u544a\u77e5\u60a8\u4e0d\u9002\u7528\u4e03\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27\u5236\u5ea6\u7684\u5546\u54c1\u3002\n            "), e("br"), t._v("\n            \u3010\u4e3e\u8bc1\u8981\u6c42\u30111. \u8bc1\u660e\u95ee\u9898\u7684\u7167\u7247/\u89c6\u9891\u6216\u5176\u4ed6\u4e3e\u8bc1\uff1b2.\n            \u7269\u6d41\u7834\u635f\u9700\u63d0\u4f9b\u5546\u54c1\u5b9e\u7269\u7834\u635f\u7167\u7247\u3002"), e("br"), t._v("\n            \u3010\u552e\u540e\u5904\u7406\u65b9\u5f0f\u30111.\n            \u5bf9\u4e8e\u5b58\u50a8\u7c7b\u5546\u54c1\uff0c\u8bf7\u52a1\u5fc5\u5728\u8fd4\u4fee\u524d\u5c06\u91cc\u9762\u7684\u6570\u636e\u81ea\u884c\u5bfc\u51fa\uff0c\u5426\u5219\u82e5\u6709\u6570\u636e\u9057\u5931\u3001\u635f\u574f\u7b49\u4f1a\u5458\u8d2d\u6982\u4e0d\u627f\u62c5\u76f8\u5e94\u7684\u8d23\u4efb\uff1b2.\n            \u5c5e\u4e8e\u8d28\u91cf\u95ee\u9898\u7684\uff0c\u5c06\u8bf4\u660e\u4e66\u3001\u53d1\u7968\u3001\u4fdd\u4fee\u5361\u3001\u8d2d\u7269\u51ed\u8bc1\u3001\u5305\u88c5\u3001\u95ee\u9898\u5546\u54c1\u7b49\u6240\u6709\u7269\u54c1\uff0c\u4e00\u5e76\u5bc4\u56de\u529e\u7406\u9000\u6362\u8d27\u624b\u7eed\uff1b3.\n            \u5982\u5546\u54c1\u7b26\u54087\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27\u6761\u4ef6\uff0c\u9700\u8981\u5728\u5bc4\u51fa\u524d\u59a5\u5584\u5305\u88c5\uff0c\u4ee5\u514d\u88ab\u59d4\u6258\u7684\u7b2c\u4e09\u65b9\u5feb\u9012\u8fd0\u8f93\u635f\u6bc1\uff0c\u5f71\u54cd\u9000\u8d27\uff1b4.\n            \u5982\u529e\u7406\u9000\u6362\u8d27\uff0c\u8bf7\u5c06\u9644\u4ef6\u3001\u8bf4\u660e\u4e66\u3001\u53d1\u7968\u3001\u5305\u88c5\u3001\u5546\u54c1\u4e00\u5e76\u5bc4\u56de\u7ed9\u4f1a\u5458\u8d2d\u529e\u7406\u9000\u6362\u8d27\u624b\u7eed\u3002\n          ")]), e("p", [e("br"), t._v("2. \u5bb6\u5c45\u7528\u54c1"), e("br"), t._v("\n            \u652f\u6301\u4e03\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27"), e("br"), t._v("\n            \u3010\u552e\u540e\u8303\u56f4\u3011 1. \u5546\u54c1\u8d28\u91cf\u95ee\u9898\uff1b2. \u7269\u6d41\u7834\u635f\u95ee\u9898\uff1b3. \u63cf\u8ff0\u4e0d\u7b26\u95ee\u9898\uff1b4.\n            \u652f\u63017\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27\u7684\u5546\u54c1\u3002"), e("br"), t._v("\n            \u3010\u975e\u552e\u540e\u8303\u56f4\u3011\u5546\u54c1\u88ab\u6d17\u8fc7\u3001\u7a7f\u8fc7\u3001\u4eba\u4e3a\u7834\u574f\u6216\u6807\u724c\u62c6\u9664\u7684\u4e0d\u4e88\u9000\u6362\u3002\n            "), e("br"), t._v("\n            \u3010\u4e3e\u8bc1\u8981\u6c42\u30111. \u8bc1\u660e\u95ee\u9898\u7684\u7167\u7247/\u89c6\u9891\u6216\u5176\u4ed6\u4e3e\u8bc1\uff1b2.\n            \u7269\u6d41\u7834\u635f\u9700\u63d0\u4f9b\u5546\u54c1\u5b9e\u7269\u7834\u635f\u7167\u7247\u3002"), e("br"), t._v("\n            \u3010\u552e\u540e\u5904\u7406\u65b9\u5f0f\u30111.\n            \u5982\u60a8\u8d2d\u4e70\u7684\u5546\u54c1\u7b26\u54087\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27\u6761\u4ef6\uff0c\u8bf7\u60a8\u5728\u5bc4\u51fa\u524d\u59a5\u5584\u5305\u88c5\uff0c\u4ee5\u514d\u88ab\u60a8\u59d4\u6258\u7684\u7b2c\u4e09\u65b9\u5feb\u9012\u8fd0\u8f93\u635f\u6bc1\uff0c\u5f71\u54cd\u60a8\u7684\u9000\u6362\u8d27\uff1b2.\n            \u5982\u529e\u7406\u9000\u6362\u8d27\uff0c\u8bf7\u5c06\u9644\u4ef6\u3001\u8bf4\u660e\u4e66\u3001\u53d1\u7968\u3001\u5305\u88c5\u3001\u5546\u54c1\u4e00\u5e76\u5bc4\u56de\u7ed9\u4f1a\u5458\u8d2d\u529e\u7406\u9000\u6362\u8d27\u624b\u7eed\uff1b3.\n            \u672a\u62c6\u5c01\uff0c\u5546\u54c1\u4fdd\u7559\u6709\u5bc4\u9001\u5230\u65f6\u7684\u5b8c\u6574\u5916\u5305\u88c5\u3001\u914d\u4ef6\u3001\u540a\u724c\u7b49\u3002\n          ")]), e("p", [e("br"), t._v("3. \u670d\u9970\u7c7b/\u7bb1\u5305\u914d\u9970/\u6587\u5177\u6587\u4f53/\u6bdb\u7ed2\u73a9\u5177"), e("br"), t._v("\n            \u652f\u6301\u4e03\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27"), e("br"), t._v("\n            \u3010\u552e\u540e\u8303\u56f4\u30111. \u5546\u54c1\u8d28\u91cf\u95ee\u9898\uff1b2. \u7269\u6d41\u7834\u635f\u95ee\u9898\uff1b3. \u63cf\u8ff0\u4e0d\u7b26\u95ee\u9898\uff1b4.\n            \u652f\u63017\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27\u7684\u5546\u54c1\u3002"), e("br"), t._v("\n            \u3010\u975e\u552e\u540e\u8303\u56f4\u30111.\n            \u51fa\u4e8e\u5b89\u5168\u548c\u536b\u751f\u8003\u8651\uff0c\u8d34\u8eab\u7528\u54c1\u5982\u5185\u8863\u88e4\uff0c\u889c\u5b50\uff0c\u6cf3\u8863\u7c7b\u5546\u54c1\u4e0d\u4e88\u9000\u6362\u8d27\uff0c\u7ecf\u6743\u5a01\u90e8\u95e8\u68c0\u6d4b\u5546\u54c1\u5b58\u5728\u8d28\u91cf\u95ee\u9898\u7684\u9664\u5916\uff1b2.\n            \u56e0\u4e2a\u4eba\u539f\u56e0\u9020\u6210\u7684\u5546\u54c1\u635f\u574f\uff08\u5982\u81ea\u884c\u4fee\u6539\u5c3a\u5bf8\uff0c\u6d17\u6da4\uff0c\u523a\u7ee3\uff0c\u957f\u65f6\u95f4\u7a7f\u7740\u7b49\uff09\uff0c\u4e0d\u4e88\u9000\u8d27\uff1b3.\n            \u5546\u54c1\u53ca\u914d\u4ef6\u6709\u78e8\u635f\u3001\u635f\u574f\u3001\u88ab\u4f7f\u7528\u7684\u75d5\u8ff9\u6216\u6709\u5176\u4ed6\u635f\u574f\u7684\u8d27\u54c1\u4e0d\u4e88\u9000\u6362\u3002\n            "), e("br"), t._v("\n            \u3010\u4e3e\u8bc1\u8981\u6c42\u30111. \u8bc1\u660e\u95ee\u9898\u7684\u7167\u7247/\u89c6\u9891\u6216\u5176\u4ed6\u4e3e\u8bc1\uff1b2.\n            \u7269\u6d41\u7834\u635f\u9700\u63d0\u4f9b\u5546\u54c1\u5b9e\u7269\u7834\u635f\u7167\u7247\u3002"), e("br"), t._v("\n            \u3010\u552e\u540e\u5904\u7406\u65b9\u5f0f\u30111.\n            \u5982\u529e\u7406\u9000\u6362\u8d27\uff0c\u8bf7\u5c06\u9644\u4ef6\u3001\u8bf4\u660e\u4e66\u3001\u53d1\u7968\u3001\u5305\u88c5\u3001\u5546\u54c1\u4e00\u5e76\u5bc4\u56de\u529e\u7406\u9000\u6362\u8d27\u624b\u7eed\u30022.\n            \u65e0\u7406\u7531\u9000\u6362\u8d27\u5546\u54c1\u9700\u4fdd\u8bc1\u5b8c\u6574\u7684\u5916\u5305\u88c5\u3001\u914d\u4ef6\u3001\u540a\u724c\u7b49\u3002\n          ")]), e("p", [e("br"), t._v("4. \u98df\u54c1"), e("br"), e("strong", [t._v("\u4e0d\u652f\u6301\u4e03\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27")]), e("br"), t._v("\n            \u3010\u552e\u540e\u8303\u56f4\u30111. \u5546\u54c1\u8d28\u91cf\u95ee\u9898\uff1b2. \u7269\u6d41\u7834\u635f\u95ee\u9898\u3002\n            "), e("br"), t._v("\n            \u3010\u975e\u552e\u540e\u8303\u56f4\u3011\u4e2a\u4eba\u539f\u56e0\u9000\u6362\u8d27\u3002"), e("br"), t._v("\n            \u3010\u4e3e\u8bc1\u8981\u6c42\u3011\u8bc1\u660e\u95ee\u9898\u7684\u7167\u7247/\u89c6\u9891\u6216\u5176\u4ed6\u4e3e\u8bc1\u3002\n            "), e("br"), t._v("\n            \u3010\u552e\u540e\u5904\u7406\u65b9\u5f0f\u30111.\n            \u4e3a\u4e86\u4fdd\u8bc1\u98df\u54c1\u5b89\u5168\uff0c\u8bf7\u60a8\u5728\u7b7e\u6536\u5546\u54c1\u65f6\u4ed4\u7ec6\u67e5\u9a8c\u5546\u54c1\u53ca\u4fdd\u8d28\u671f\uff0c\u70b9\u6e05\u8d27\u7269\u6570\u91cf\uff1b\u9664\u56e0\u5b58\u5728\u8d28\u91cf\u95ee\u9898\uff0c\u7b7e\u6536\u540e\u7684\u98df\u54c1\u5546\u54c1\u5c06\u4e0d\u63a5\u53d7\u9000\u8d27\u4f46\u56fd\u5bb6\u98df\u54c1\u8d28\u91cf\u76d1\u7763\u68c0\u9a8c\u673a\u6784\u516c\u544a\u7684\u6709\u8d28\u91cf\u95ee\u9898\u7684\u5546\u54c1\u9664\u5916\u30022.\n            \u5982\u529e\u7406\u9000\u6362\u8d27\uff0c\u8bf7\u5c06\u9644\u4ef6\u3001\u8bf4\u660e\u4e66\u3001\u53d1\u7968\u3001\u5305\u88c5\u3001\u5546\u54c1\u4e00\u5e76\u5bc4\u56de\u7ed9\u4f1a\u5458\u8d2d\u529e\u7406\u9000\u6362\u8d27\u624b\u7eed\u3002\n          ")]), e("p", [e("br"), t._v("5. \u51fa\u7248\u7269"), e("br"), e("strong", [t._v("\u4e0d\u652f\u6301\u4e03\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27")]), e("br"), t._v("\u3010\u552e\u540e\u8303\u56f4\u3011\u5f00\u5c01\u524d\u5546\u54c1\u5305\u88c5\u7834\u635f\u3001\u5f02\u5e38/\u8170\u5c01\u7f3a\u5c11/\u7834\u635f/\u6392\u7248\u6709\u8bef/\u88c5\u8ba2\u95ee\u9898/\u7f3a\u5c11\u9875\u6570/\u7f3a\u5931\u5185\u5bb9/\u9519\u522b\u5b57\u8f83\u591a/\u672c\u4f53\u7834\u635f/\u649e\u89d2\u4e25\u91cd\u3002"), e("br"), t._v("\n            \u3010\u975e\u552e\u540e\u8303\u56f4\u3011 1. \u5305\u88c5\u542b\u9632\u4f2a\u7801\u7684\u5546\u54c1\u9632\u4f2a\u7801\u4e00\u7ecf\u522e\u5f00\u4e0d\u4e88\u9000\u6362\u8d27\u3002 2.\n            \u6709\u5e8f\u5217\u53f7\u7684\u5546\u54c1\uff0c\u522e\u5f00\u4f7f\u7528\u7684\u65e0\u8d28\u91cf\u95ee\u9898\u4e0d\u4e88\u4ee5\u9000\u6362\u8d27\u3002 3.\n            \u82e5\u5546\u54c1\u5b58\u5728\u56e0\u4f7f\u7528\u9020\u6210\u7684\u5546\u54c1\u53d7\u635f\u3001\u6c61\u67d3\u7b49\u60c5\u51b5\u4e0d\u80fd\u4eab\u53d7\u201c7\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27\u201d\u653f\u7b56\u3002\n            4. \u4efb\u4f55\u56e0\u975e\u6b63\u5e38\u4f7f\u7528\u53ca\u4fdd\u7ba1\u5bfc\u81f4\u5546\u54c1\u51fa\u73b0\u8d28\u91cf\u95ee\u9898\uff0c\u4e0d\u652f\u6301\u9000\u6362\u8d27\u3002 5.\n            \u514d\u8d39\u8d60\u54c1\u4e0d\u652f\u6301\u9000\u6362\u8d27\u670d\u52a1\u30026.\u5b9a\u5236\u671f\u520a\u7c7b\u5546\u54c1\u3001\u6d77\u5916\u8ba2\u8d2d\u7c7b\u56fe\u4e66\u5546\u54c1\u4e0d\u652f\u63017\u5929\u5185\u65e0\u7406\u7531\u9000\u8d27\u3002\n            "), e("br"), t._v("\n            \u3010\u4e3e\u8bc1\u8981\u6c42\u30111. \u8bc1\u660e\u95ee\u9898\u7684\u7167\u7247/\u89c6\u9891\u6216\u5176\u4ed6\u4e3e\u8bc1 2.\n            \u7269\u6d41\u7834\u635f\u9700\u63d0\u4f9b\u5546\u54c1\u5b9e\u7269\u7834\u635f\u7167\u7247\u3002\n            "), e("br"), t._v("\n            \u3010\u552e\u540e\u5904\u7406\u65b9\u5f0f\u30111.\n            \u5982\u529e\u7406\u9000\u6362\u8d27\uff0c\u8bf7\u5c06\u9644\u4ef6\u3001\u8bf4\u660e\u4e66\u3001\u53d1\u7968\u3001\u5305\u88c5\u3001\u5546\u54c1\u4e00\u5e76\u5bc4\u56de\u529e\u7406\u9000\u6362\u8d27\u624b\u7eed\u30022.\n            \u65e0\u7406\u7531\u9000\u6362\u8d27\u5546\u54c1\u9700\u4fdd\u8bc1\u5b8c\u6574\u7684\u5916\u5305\u88c5\u3001\u914d\u4ef6\u3001\u540a\u724c\u7b49\u30023.\n            \u9000\u8d27\u65f6\u8d60\u54c1\u9700\u4e00\u5e76\u8fd4\u56de\u4f1a\u5458\u8d2d\uff0c\u5982\u8d60\u54c1\u7f3a\u5931\uff0c\u5219\u5546\u54c1\u65e0\u6cd5\u5168\u989d\u9000\u6b3e\uff08\u6362\u8d27\u65e0\u9700\u8fd4\u56de\uff09\u3002\n          ")]), e("p", [e("br"), e("strong", [t._v("\u516d\u3001\u7968\u52a1\u7c7b\u552e\u540e\u8303\u56f4\u53ca\u8981\u6c42")]), e("br"), t._v("\n            \u3010\u552e\u540e\u8303\u56f4\u3011\u975e\u4e2a\u4eba\u539f\u56e0\u9000\u7968\uff08\u90e8\u5206\u9879\u76ee\u652f\u6301\u4e2a\u4eba\u539f\u56e0\u9000\u7968\uff09\u3002\n            "), e("br"), e("strong", [t._v("\u3010\u975e\u552e\u540e\u8303\u56f4\u3011\u90e8\u5206\u9879\u76ee\u4e0d\u652f\u6301\u4e2a\u4eba\u539f\u56e0\u9000\u7968\u3002")]), e("br"), t._v("\u3010\u4e3e\u8bc1\u8981\u6c42\u3011\u8bc1\u660e\u95ee\u9898\u7684\u7167\u7247/\u89c6\u9891\u6216\u5176\u4ed6\u4e3e\u8bc1\u3002\n            "), e("br"), t._v("\u3010\u552e\u540e\u5904\u7406\u65b9\u5f0f\u30111.\n            \u652f\u6301\u4e2a\u4eba\u539f\u56e0\u9000\u7968\u7684\u9879\u76ee\uff0c\u9002\u7528\u9000\u7968\u624b\u7eed\u8d39\u89c4\u5219\u552e\u540e\uff1b2.\n            \u975e\u4e2a\u4eba\u539f\u56e0\u9000\u7968\u7684\u9879\u76ee\uff0c\u5728\u9879\u76ee\u5f00\u59cb\u524d\u8054\u7cfb\u4f1a\u5458\u8d2d\u5ba2\u670d\u5904\u7406\u3002\n            "), e("br"), e("strong", [t._v("\u3010\u662f\u5426\u652f\u6301\u4e03\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27\u30111\u3001\u4e0d\u652f\u6301\u4e03\u5929\u65e0\u7406\u7531\u9000\u7968\uff1b2\u3001\u82e5\u4e3b\u529e\u65b9\u652f\u6301\u4e2a\u4eba\u539f\u56e0\u9000\u7968\u7684\uff0c\u5219\u652f\u6301\u6709\u6761\u4ef6\u9000\u7968\u3002")])])])])])])], 1)
        }
          , Dt = []
          , Rt = {
            props: {
                hygTermsStatus: {
                    type: Boolean,
                    default: !1
                }
            },
            computed: {
                bottomOffset: function() {
                    return Tt.GO ? (0,
                    Ot.U4)(34) : 0
                },
                topOffset: function() {
                    return this.isApp ? Tt.qu ? Tt.qu : Tt.GO ? (0,
                    Ot.U4)(64) : (0,
                    Ot.U4)(20) : 0
                },
                termsHeigth: function() {
                    return "".concat(window.innerHeight - this.topOffset - this.bottomOffset, "px")
                },
                isApp: function() {
                    return It().UA.isBiliApp
                }
            },
            methods: {
                onClose: function() {
                    this.$emit("close")
                },
                cancelOrder: function() {
                    this.$emit("cancel")
                }
            }
        }
          , Ut = Rt
          , Mt = (0,
        k.Z)(Ut, Nt, Dt, !1, null, "343aef9a", null)
          , $t = Mt.exports
          , Zt = function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                staticClass: "leave-dialog"
            }, [e("transition", {
                attrs: {
                    name: "popup-fade"
                }
            }, [e("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.cfTermsStatus,
                    expression: "cfTermsStatus"
                }],
                staticClass: "popup-mask",
                on: {
                    click: function(e) {
                        return e.stopPropagation(),
                        t.onClose.apply(null, arguments)
                    }
                }
            }, [e("div", {
                staticClass: "terms-content",
                class: {
                    "is-app": t.isApp
                },
                style: {
                    height: t.termsHeigth,
                    "margin-top": "".concat(t.topOffset, "px")
                }
            }, [e("div", {
                staticClass: "order-terms-title"
            }, [e("h3", {
                staticClass: "title-text"
            }, [t._v("\u4f17\u7b79\u670d\u52a1\u534f\u8bae")])]), e("div", {
                staticClass: "terms-item"
            }, [e("div", [t._v("\n                        \u7279\u522b\u63d0\u793a\uff1a\n                        \u300a\u7968\u52a1\u4f17\u7b79\u534f\u8bae\u300b\uff08\u7b80\u79f0\u4e3a\u201c\u672c\u534f\u8bae\u201d\uff09\u662f\u60a8\u4e0e\u4f1a\u5458\u8d2d\u5e73\u53f0\uff08\u4ee5\u4e0b\u7edf\u79f0\u4e3a\u201c\u4f1a\u5458\u8d2d\u201d\uff09\u4e4b\u95f4\u5173\u4e8e\u4f1a\u5458\u8d2d\u63d0\u4f9b\u7684\u7968\u52a1\u4f17\u7b79\u9879\u76ee\u670d\u52a1\uff08\u4ee5\u4e0b\u7edf\u79f0\u4e3a\u201c\u7968\u52a1\u4f17\u7b79\u201d\u6216\u201c\u4f17\u7b79\u9879\u76ee\u201d\uff09\u7684\u6cd5\u5f8b\u534f\u8bae\u3002\u672c\u534f\u8bae\u9002\u7528\u4e8e\u6240\u6709\u5728\u4f1a\u5458\u8d2d\u5e73\u53f0\u53c2\u4e0e\u4f17\u7b79\u9879\u76ee\u7684\u7528\u6237\uff08\u4ee5\u4e0b\u6216\u79f0\u201c\u60a8\u201d\uff09\u3002\n                    ")]), e("div", [e("b", [t._v("\u4f1a\u5458\u8d2d\u5728\u6b64\u7279\u522b\u63d0\u9192\uff0c\u5982\u679c\u60a8\u672a\u6ee118\u5468\u5c81\uff0c\u8bf7\u5728\u6cd5\u5b9a\u76d1\u62a4\u4eba\u7684\u966a\u540c\u4e0b\u9605\u8bfb\u672c\u534f\u8bae\u3002\u672a\u6210\u5e74\u4eba\u884c\u4f7f\u548c\u5c65\u884c\u672c\u534f\u8bae\u9879\u4e0b\u7684\u6743\u5229\u548c\u4e49\u52a1\u89c6\u4e3a\u5df2\u83b7\u5f97\u4e86\u76d1\u62a4\u4eba\u7684\u8ba4\u53ef\u3002\u8bf7\u60a8\u5728\u53c2\u4e0e\u7968\u52a1\u4f17\u7b79\u524d\u9605\u8bfb\u5e76\u5145\u5206\u7406\u89e3\u672c\u534f\u8bae\uff0c\u7279\u522b\u662f\u514d\u9664\u6216\u8005\u9650\u5236\u8d23\u4efb\u7684\u76f8\u5e94\u6761\u6b3e\uff0c\u53cc\u65b9\u786e\u8ba4\u524d\u8ff0\u6761\u6b3e\u4e0d\u5c5e\u4e8e\u300a\u5408\u540c\u6cd5\u300b\u7b2c40\u6761\u89c4\u5b9a\u7684\u201c\u514d\u9664\u5176\u8d23\u4efb\u3001\u52a0\u91cd\u5bf9\u65b9\u8d23\u4efb\u3001\u6392\u9664\u5bf9\u65b9\u4e3b\u8981\u6743\u5229\u201d\u6761\u6b3e\uff0c\u60a8\u8ba4\u53ef\u5176\u5408\u6cd5\u6027\u53ca\u6709\u6548\u6027\u3002\u4f1a\u5458\u8d2d\u53ef\u80fd\u4f1a\u6839\u636e\u5e73\u53f0\u7684\u6574\u4f53\u89c4\u5212\u7b49\uff0c\u5bf9\u672c\u534f\u8bae\u8fdb\u884c\u4fee\u6539\u6216\u53d8\u66f4\uff0c\u4fee\u6539\u6216\u53d8\u66f4\u7684\u5185\u5bb9\u5c06\u4e8e\u76f8\u5173\u9875\u9762\u8fdb\u884c\u516c\u544a\u6216\u8005\u5c55\u793a\u3002\u5982\u60a8\u7ee7\u7eed\u53c2\u4e0e\u7968\u52a1\u4f17\u7b79\uff0c\u5219\u89c6\u4e3a\u60a8\u5df2\u7ecf\u63a5\u53d7\u672c\u534f\u8bae\u7684\u4fee\u6539\u548c\u53d8\u66f4\uff0c\u82e5\u60a8\u4e0d\u540c\u610f\u672c\u534f\u8bae\u7684\u524d\u8ff0\u4fee\u6539\u6216\u53d8\u66f4\uff0c\u60a8\u53ef\u505c\u6b62\u53c2\u4e0e\u7968\u52a1\u4f17\u7b79\u3002\u60a8\u53c2\u4e0e\u7968\u52a1\u4f17\u7b79\u5373\u89c6\u4e3a\u60a8\u63a5\u53d7\u5e76\u540c\u610f\u672c\u534f\u8bae\u6240\u6709\u6761\u6b3e\uff0c\u5305\u62ec\u4f46\u4e0d\u9650\u4e8e\u524d\u8ff0\u4fee\u6539\u53ca\u53d8\u66f4\u3002\u5982\u8fdd\u53cd\u672c\u534f\u8bae\u7ea6\u5b9a\uff0c\u4f1a\u5458\u8d2d\u6709\u6743\u968f\u65f6\u4e2d\u6b62\u6216\u7ec8\u6b62\u60a8\u53c2\u4e0e\u7968\u52a1\u4f17\u7b79\uff0c\u5e76\u4e0d\u4e88\u4efb\u4f55\u8d54\u507f\u6216\u9000\u8fd8\u8d39\u7528\u3002")])]), e("div", [t._v("\u672c\u534f\u8bae\u662f\u57fa\u4e8e\u300a\u54d4\u54e9\u54d4\u54e9\u5f39\u5e55\u7f51\u7528\u6237\u4f7f\u7528\u534f\u8bae\u300b\u3001\u300a\u4f1a\u5458\u8d2d\u670d\u52a1\u534f\u8bae\u300b\u3001\u300aBilibili\u8d2d\u7968\u670d\u670d\u52a1\u534f\u8bae\u300b\u4ee5\u53cabilibili\u76f8\u5173\u534f\u8bae\u89c4\u8303\uff08\u7b80\u79f0\u4e3a\u201cbilibili\u670d\u52a1\u6761\u6b3e\u201d\uff09\u5236\u5b9a\uff0c\u4e0e\u5176\u662f\u4e0d\u53ef\u5206\u5272\u7684\uff1b\u540c\u65f6\uff0cbilibili\u548c/\u6216\u4f1a\u5458\u8d2d\u5e73\u53f0\u4e0a\u4e0d\u65f6\u53d1\u5e03\u7684\u76f8\u5173\u534f\u8bae\u3001\u670d\u52a1\u89c4\u5219\u7b49\u4e5f\u662f\u672c\u534f\u8bae\u7684\u4e00\u90e8\u5206\u3002\u60a8\u5728\u53c2\u4e0e\u4f17\u7b79\u9879\u76ee\u7684\u540c\u65f6\u5e94\u9075\u5b88\u672c\u534f\u8bae\u3001bilibili\u670d\u52a1\u6761\u6b3e\u53ca\u524d\u8ff0\u76f8\u5173\u534f\u8bae\u3001\u670d\u52a1\u89c4\u5219\u7b49\u6240\u6709\u6761\u6b3e\u3002")]), e("div", [e("b", [t._v("\u7531\u4e8e\u60a8\u4f7f\u7528\u7684\u8f6f\u4ef6\u7248\u672c\u3001\u8bbe\u5907\u3001\u64cd\u4f5c\u7cfb\u7edf\u7b49\u4e0d\u540c\u4ee5\u53ca\u7b2c\u4e09\u65b9\u539f\u56e0\u53ef\u80fd\u5bfc\u81f4\u60a8\u5b9e\u9645\u53ef\u4f7f\u7528\u7684\u5177\u4f53\u670d\u52a1\u6709\u5dee\u522b\uff0c")]), t._v("\u7531\u6b64\u53ef\u80fd\u7ed9\u60a8\u5e26\u6765\u4e0d\u4fbf\uff0c\u60a8\u8868\u793a\u7406\u89e3\uff0c\u5e76\u4e0d\u4f1a\u56e0\u6b64\u5411bilibili\u53ca\u4f1a\u5458\u8d2d\u63d0\u51fa\u4efb\u4f55\u4e3b\u5f20\u6216\u8005\u8ffd\u7a76\u4efb\u4f55\u8d23\u4efb\u3002\n                    ")]), e("div", [t._v("\u4e00\u3001\u7968\u52a1\u4f17\u7b79\u9879\u76ee\u670d\u52a1\u8bf4\u660e")]), e("div", [t._v("1.\u4f1a\u5458\u8d2d\u5e73\u53f0\u7684\u7968\u52a1\u4f17\u7b79\u7531\u53d1\u8d77\u8005\u4e0e\u652f\u6301\u8005\u5171\u540c\u5b8c\u6210\u3002\u5728\u9879\u76ee\u8fc7\u7a0b\u4e2d\uff0c\u81ea\u7136\u4eba\u3001\u6cd5\u4eba\u6216\u5176\u4ed6\u7ec4\u7ec7\u53ef\u4f5c\u4e3a\u53d1\u8d77\u8005\u53d1\u8d77\u9879\u76ee\uff0c\u652f\u6301\u8005\u51fa\u8d44\u652f\u6301\u53d1\u8d77\u8005\uff0c\u53d1\u8d77\u8005\u6309\u7167\u6bcf\u4e2a\u9879\u76ee\u7684\u8be6\u60c5\u9875\u9762\u4e2d\u7684\u7ea6\u5b9a\u5f00\u5c55\u9879\u76ee\u3002")]), e("div", [t._v("\n                        2.\u5728\u7968\u52a1\u4f17\u7b79\u4e2d\u4f1a\u5458\u8d2d\u5e73\u53f0\u4ec5\u4e3a\u53d1\u8d77\u8005\u4e0e\u7528\u6237\u4e4b\u95f4\u7684\u7968\u52a1\u4f17\u7b79\u884c\u4e3a\u63d0\u4f9b\u7f51\u7edc\u7a7a\u95f4\u3001\u6280\u672f\u652f\u6301\u548c\u7cfb\u7edf\u7ef4\u62a4\u7b49\u670d\u52a1\u3002\n                        "), e("b", [t._v("\u4f1a\u5458\u8d2d\u5e73\u53f0\u4ec5\u4f5c\u4e3a\u5e73\u53f0\u65b9\uff0c\u5e76\u4e0d\u662f\u53d1\u8d77\u8005\u6216\u652f\u6301\u8005\u7684\u4efb\u4f55\u4e00\u65b9\uff0c")]), t._v("\u4f17\u7b79\u5173\u7cfb\u4ec5\u5b58\u5728\u4e8e\u53d1\u8d77\u8005\u548c\u652f\u6301\u8005\u4e4b\u95f4\u3002\n                    ")]), e("div", [t._v("3.\u76ee\u524d\u4f1a\u5458\u8d2d\u5e73\u53f0\u6240\u63d0\u4f9b\u7684\u7968\u52a1\u4f17\u7b79\u4ec5\u9650\u5728\u4e2d\u56fd\u5927\u9646\u5730\u533a\u4e3e\u529e\u7684\u5c55\u4f1a\u3001\u6f14\u51fa\u7b49\u6d3b\u52a8\u3002\uff08\u4ee5\u4e0b\u7b80\u79f0\u201c\u6d3b\u52a8\u201d\uff09\u3002")]), e("div", [t._v("4.\u6bcf\u4e2a\u4f17\u7b79\u9879\u76ee\u5c06\u4f1a\u5355\u72ec\u8bbe\u7f6e\u9884\u8ba1\u7ed3\u675f\u65f6\u95f4\u548c\u76ee\u6807\u4eba\u6570/\u7968\u6570\u3002")]), e("div", [t._v("\n                        5.\u82e5\u60a8\u6240\u53c2\u4e0e\u7684\u4f17\u7b79\u9879\u76ee\u5728\u9884\u8ba1\u7ed3\u675f\u65f6\u95f4\u5185\u8fbe\u5230\u76ee\u6807\u4eba\u6570/\u7968\u6570\u5219\n                        "), e("b", [t._v("\u4f17\u7b79\u9879\u76ee\u6210\u529f\uff0c\u9879\u76ee\u8fdb\u5165\u6267\u884c\u9636\u6bb5\uff0c\u7b49\u5f85\u6d3b\u52a8\u7968\u54c1\u53d1\u653e\u53ca\u6d3b\u52a8\u5168\u90e8/\u90e8\u5206\u573a\u6b21\u4e3e\u884c\u3002")])]), e("div", [t._v("\n                        6.\u82e5\u60a8\u53c2\u4e0e\u7684\u4f17\u7b79\u9879\u76ee\u51fa\u73b0\u4ee5\u4e0b\u60c5\u51b5\u5219\n                        "), e("b", [t._v("\u4f17\u7b79\u9879\u76ee\u5931\u8d25\uff1a")])]), e("div", [t._v("\uff081\uff09\u5728\u9879\u76ee\u9884\u8ba1\u7ed3\u675f\u65f6\u95f4\u5185\u672a\u80fd\u8fbe\u5230\u76ee\u6807\u4eba\u6570/\u7968\u6570\u7684\uff1b")]), e("div", [t._v("\uff082\uff09\u5728\u9879\u76ee\u8fdb\u5165\u6267\u884c\u9636\u6bb5\uff0c\u4f17\u7b79\u9879\u76ee\u6307\u5411\u7684\u6d3b\u52a8\u573a\u6b21\u5168\u90e8\u672a\u80fd\u5982\u671f\u4e3e\u884c\u7684\u3002")]), e("div", [t._v("\n                        7.\u82e5\u60a8\u53c2\u4e0e\u7684\u4f17\u7b79\u9879\u76ee\u88ab\u53d1\u8d77\u8005\u4e3b\u52a8\u53d6\u6d88\uff0c\u5219\n                        "), e("b", [t._v("\u4f17\u7b79\u9879\u76ee\u53d6\u6d88\u3002")])]), e("div", [t._v("\n                        8.\u82e5\u56e0\u5982\u4e0b\u539f\u56e0\u7ec8\u6b62\u4f17\u7b79\u9879\u76ee\u5219\u60a8\u6240\u53c2\u4e0e\u7684\n                        "), e("b", [t._v("\u4f17\u7b79\u9879\u76ee\u4e0b\u67b6\uff1a")])]), e("div", [t._v("\uff081\uff09\u56e0\u53d1\u8d77\u8005\u3001\u652f\u6301\u8005\u5b58\u5728\u8fdd\u6cd5\u8fdd\u89c4\u884c\u4e3a\uff1b")]), e("div", [t._v("\uff082\uff09\u6839\u636e\u76f8\u5173\u6cd5\u5f8b\u3001\u653f\u7b56\u6216\u4e0d\u53ef\u6297\u529b\u7b49\u539f\u56e0\u3002")]), e("div", [t._v("\u4e8c\u3001\u652f\u6301\u8005\u7684\u6761\u4ef6")]), e("div", [t._v("1.\u652f\u6301\u8005\u5982\u679c\u662f\u6cd5\u4eba\u673a\u6784\uff0c\u5219\u5e94\u5f53\u7b26\u5408\u4ee5\u4e0b\u6761\u4ef6\uff1a")]), e("div", [t._v("(1)\u5c5e\u4e8e\u5408\u6cd5\u8bbe\u7acb\u5e76\u6709\u6548\u5b58\u7eed\u7684\u3001\u6709\u6c11\u4e8b\u884c\u4e3a\u80fd\u529b\u7684\u6cd5\u4eba\u6216\u5176\u4ed6\u7ec4\u7ec7\u3002")]), e("div", [t._v("(2)\u62e5\u6709\u80fd\u591f\u5728\u4e2d\u56fd\u5730\u533a\u8fdb\u884c\u4eba\u6c11\u5e01\u6c47\u6b3e\u7684\u94f6\u884c\u5361\u8d26\u6237\u6216\u8005\u6211\u65b9\u89c4\u5b9a\u7684\u7b2c\u4e09\u65b9\u652f\u4ed8\u5e73\u53f0\u8d26\u6237\u3002")]), e("div", [t._v("(3)\u7ecf\u8fc7\u4f1a\u5458\u8d2d\u5e73\u53f0\u7684\u673a\u6784\u8ba4\u8bc1\u3002")]), e("div", [t._v("2.\u5982\u679c\u652f\u6301\u8005\u5982\u679c\u662f\u81ea\u7136\u4eba\uff0c\u5219\u5e94\u7b26\u5408\u4ee5\u4e0b\u6761\u4ef6\uff1a")]), e("div", [t._v("\uff081\uff09\u5e74\u6ee118\u5468\u5c81\u4e14\u5177\u6709\u5b8c\u5168\u6c11\u4e8b\u8d23\u4efb\u80fd\u529b\u7684\u4e2d\u56fd\u516c\u6c11\uff1b")]), e("div", [t._v("\n                        \uff082\uff09\u82e5\u652f\u6301\u8005\u4e0d\u6ee1\u8db3\u4e0a\u8ff0\u6761\u4ef6\uff0c\u5219\u9700\u8981\u53d6\u5f97\u6cd5\u5b9a\u4ee3\u7406\u4eba\u7684\u540c\u610f\uff0c\u4e14\u8be5\u4ee3\u7406\u4eba\u627f\u62c5\u4e00\u5207\u6cd5\u5f8b\u8d23\u4efb\u4ee5\u53ca\u6cd5\u5f8b\u4e49\u52a1\u3002\n                        "), e("b", [t._v("\u4f1a\u5458\u8d2d\u5e73\u53f0\u9ed8\u8ba4\u60a8\u5728\u9605\u8bfb\u548c\u52fe\u9009\u540c\u610f\u672c\u534f\u8bae\u5e76\u53c2\u4e0e\u7968\u52a1\u4f17\u7b79\u9879\u76ee\uff0c\u5373\u89c6\u4e3a\u5df2\u7ecf\u5f97\u5230\u60a8\u7684\u6cd5\u5b9a\u4ee3\u7406\u4eba\u7684\u8bb8\u53ef\u548c\u627f\u8bfa\u3002")])]), e("div", [t._v("\u4e09\u3001\u7279\u522b\u6ce8\u610f")]), e("div", [e("b", [t._v("1. \u4f1a\u5458\u8d2d\u5e73\u53f0\u4ec5\u4e3a\u5e73\u53f0\u65b9\uff0c\u4e3a\u4f17\u7b79\u53cc\u65b9\u63d0\u4f9b\u5e73\u53f0\u670d\u52a1\uff0c\u4f17\u7b79\u5173\u7cfb\u4ec5\u5b58\u5728\u4e8e\u53d1\u8d77\u8005\u548c\u652f\u6301\u8005\u4e4b\u95f4\uff0c\u4ea7\u751f\u7684\u6cd5\u5f8b\u540e\u679c\u7531\u53d1\u8d77\u8005\u4e0e\u60a8\u81ea\u884c\u627f\u62c5\u3002\u4f1a\u5458\u8d2d\u5e73\u53f0\u4e0d\u5bf9\u53d1\u8d77\u8005\u5728\u8be6\u60c5\u9875\u9762\u6240\u505a\u4efb\u4f55\u9648\u8ff0\u3001\u627f\u8bfa\u3001\u53d1\u5e03\u7684\u4fe1\u606f\u53ca\u4ea4\u6613\u884c\u4e3a\u7684\u771f\u5b9e\u6027\u3001\u5408\u6cd5\u6027\u3001\u51c6\u786e\u6027\u3001\u6709\u6548\u6027\u3001\u4f17\u7b79\u9879\u76ee\u6307\u5411\u7684\u6d3b\u52a8\u662f\u5426\u4f1a\u5982\u671f\u4e3e\u884c\u7b49\u4f5c\u4efb\u4f55\u7684\u660e\u793a\u6216\u6697\u793a\u7684\u4fdd\u8bc1\uff0c\u4e5f\u4e0d\u627f\u62c5\u4efb\u4f55\u6cd5\u5f8b\u8d23\u4efb\u3002\u82e5\u53d1\u8d77\u8005\u4e0e\u652f\u6301\u8005\u4e4b\u95f4\u7684\u4f17\u7b79\u884c\u4e3a\uff0c\u6216\u652f\u6301\u8005\u53c2\u4e0e\u4f17\u7b79\u9879\u76ee\u6307\u5411\u7684\u6d3b\u52a8\u4ea7\u751f\u4efb\u4f55\u6cd5\u5f8b\u7ea0\u7eb7\uff0c\u5747\u4e0e\u4f1a\u5458\u8d2d\u5e73\u53f0\u65e0\u6d89\u3002")])]), e("div", [e("b", [t._v("2. \u60a8\u7406\u89e3\u5e76\u540c\u610f\u4f1a\u5458\u8d2d\u5e73\u53f0\u6709\u6743\u6839\u636e\u76f8\u5173\u6cd5\u5f8b\u6cd5\u89c4\u3001\u653f\u7b56\u3001\u6216\u53d1\u8d77\u4eba\u7684\u8fdd\u89c4\u884c\u4e3a\u3001\u4e0d\u53ef\u6297\u529b\u7b49\u539f\u56e0\u968f\u65f6\u4e0b\u67b6\u60a8\u6240\u53c2\u4e0e\u7684\u4f17\u7b79\u9879\u76ee\u3002")])]), e("div", [e("b", [t._v("3.\u60a8\u7406\u89e3\u5e76\u540c\u610f\u56e0\u7968\u52a1\u4f17\u7b79\u9879\u76ee\u662f\u53d1\u8d77\u8005\u548c\u652f\u6301\u8005\u5171\u540c\u53c2\u4e0e\u5b8c\u6210\u7684\u9879\u76ee\uff0c\u4e0d\u540c\u4e8e\u5546\u54c1\u4ea4\u6613\u3002\u82e5\u60a8\u6240\u652f\u6301\u7684\u4f17\u7b79\u9879\u76ee\u672a\u6210\u529f\u6216\u90e8\u5206\u573a\u6b21\u672a\u80fd\u5982\u671f\u4e3e\u884c\uff0c\u4f1a\u5458\u8d2d\u4f1a\u5c06\u60a8\u5bf9\u672a\u80fd\u5982\u671f\u4e3e\u884c\u7684\u573a\u6b21\u652f\u6301\u7684\u6b3e\u9879\u65e0\u606f\u9000\u56de\u539f\u652f\u4ed8\u65b9\u3002\u4e3a\u4e86\u4fdd\u8bc1\u9879\u76ee\u6b63\u5e38\u8fdb\u884c\uff0c\u4e0d\u652f\u6301\u56e0\u60a8\u4e2a\u4eba\u539f\u56e0\u7533\u8bf7\u7684\u9000\u6b3e\u3002")])]), e("div", [e("b", [t._v("4. \u60a8\u7406\u89e3\u5e76\u540c\u610f\u4f17\u7b79\u9879\u76ee\u6240\u6307\u5411\u7684\u6d3b\u52a8\u7968\u54c1\u5e76\u975e\u5546\u54c1\u4ea4\u6613\uff0c\u56e0\u5176\u5177\u6709\u7279\u6b8a\u6027\uff0c\u4e00\u65e6\u53d1\u8d27\u4e0d\u652f\u6301\u4e03\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27\u3002")])]), e("div", [t._v("\u56db\u3001\u514d\u8d23\u4e8b\u7531")]), e("div", [e("b", [t._v("\u60a8\u77e5\u6089\u5e76\u540c\u610f\uff0c\u4f1a\u5458\u8d2d\u4e0d\u56e0\u4e0b\u8ff0\u4efb\u4e00\u60c5\u51b5\u800c\u53ef\u80fd\u5bfc\u81f4\u7684\u4efb\u4f55\u635f\u5bb3\u8d54\u507f\u627f\u62c5\u8d23\u4efb\uff0c\u5305\u62ec\u4f46\u4e0d\u9650\u4e8e\u8d22\u4ea7\u3001\u6536\u76ca\u3001\u6570\u636e\u8d44\u6599\u7b49\u65b9\u9762\u7684\u635f\u5931\u6216\u5176\u5b83\u65e0\u5f62\u635f\u5931\uff1a")])]), e("div", [e("b", [t._v("1.\u56e0\u53f0\u98ce\u3001\u5730\u9707\u3001\u6d77\u5578\u3001\u6d2a\u6c34\u3001\u505c\u7535\u3001\u6218\u4e89\u3001\u6050\u6016\u88ad\u51fb\u7b49\u4e0d\u53ef\u6297\u529b\u4e4b\u56e0\u7d20\u5bfc\u81f4\u7cfb\u7edf\u6216\u670d\u52a1\u4e0d\u80fd\u6b63\u5e38\u8fd0\u4f5c\u3002")])]), e("div", [e("b", [t._v("2.\u7531\u4e8e\u9ed1\u5ba2\u653b\u51fb\u3001\u7535\u4fe1\u90e8\u95e8\u6280\u672f\u8c03\u6574\u6216\u6545\u969c\u3001\u7cfb\u7edf\u7ef4\u62a4\u7b49\u539f\u56e0\u800c\u9020\u6210\u7684\u7cfb\u7edf\u670d\u52a1\u4e2d\u65ad\u6216\u8005\u5ef6\u8fdf\u3002")])]), e("div", [e("b", [t._v("3.\u7531\u4e8e\u653f\u5e9c\u547d\u4ee4\u3001\u6cd5\u5f8b\u6cd5\u89c4\u7684\u53d8\u66f4\u3001\u53f8\u6cd5\u673a\u5173\u53ca\u884c\u653f\u673a\u5173\u7684\u547d\u4ee4\u3001\u88c1\u5b9a\u7b49\u539f\u56e0\u800c\u5bfc\u81f4\u7684\u7cfb\u7edf\u670d\u52a1\u4e2d\u65ad\u3001\u7ec8\u6b62\u6216\u5ef6\u8fdf\u3002")])]), e("div", [e("b", [t._v("4.\u7531\u4e8e\u60a8\u5c06\u8d26\u53f7\u3001\u5bc6\u7801\u544a\u77e5\u4ed6\u4eba\u6216\u672a\u4fdd\u7ba1\u597d\u81ea\u5df1\u7684\u5bc6\u7801\u6216\u4e0e\u4ed6\u4eba\u5171\u4eab\u8d26\u53f7\u6216\u4efb\u4f55\u5176\u4ed6\u975e\u4f1a\u5458\u8d2d\u7684\u8fc7\u9519\uff0c\u5bfc\u81f4\u60a8\u7684\u4e2a\u4eba\u8d44\u6599\u6cc4\u9732\u3002")])]), e("div", [e("b", [t._v("5.\u7531\u4e8e\u4e0ebilibili\u548c/\u6216\u4f1a\u5458\u8d2d\u94fe\u63a5\u6216\u5408\u4f5c\u7684\u5176\u5b83\u7f51\u7ad9\u6240\u9020\u6210\u7684\u94f6\u884c\u8d26\u6237\u4fe1\u606f\u3001\u8eab\u4efd\u4fe1\u606f\u6cc4\u9732\u53ca\u7531\u6b64\u800c\u5bfc\u81f4\u7684\u4efb\u4f55\u6cd5\u5f8b\u4e89\u8bae\u548c\u540e\u679c\u3002")])]), e("div", [e("b", [t._v("6.\u60a8\uff08\u5305\u62ec\u672a\u6210\u5e74\u4eba\u7528\u6237\uff09\u5411bilibili\u548c/\u6216\u4f1a\u5458\u8d2d\u63d0\u4f9b\u9519\u8bef\u3001\u4e0d\u5b8c\u6574\u3001\u4e0d\u5b9e\u4fe1\u606f\u7b49\uff0c\u9020\u6210\u4e0d\u80fd\u652f\u6301\u4f17\u7b79\u9879\u76ee\u6216\u906d\u53d7\u4efb\u4f55\u5176\u4ed6\u635f\u5931\u3002")])]), e("div", [e("b", [t._v("7.\u5982\u56e0\u7cfb\u7edf\u7ef4\u62a4\u6216\u5347\u7ea7\u7684\u9700\u8981\u800c\u9700\u6682\u505c\u670d\u52a1\u65f6\uff0c\u6211\u4eec\u5c06\u5c3d\u53ef\u80fd\u4e8b\u5148\u8fdb\u884c\u901a\u77e5\u3002\u5bf9\u4e8e\u670d\u52a1\u7684\u4e2d\u65ad\u6216\u7ec8\u6b62\u800c\u7ed9\u60a8\u9020\u6210\u7684\u4efb\u4f55\u635f\u5931\uff0c\u6211\u4eec\u65e0\u987b\u5bf9\u60a8\u6216\u4efb\u4f55\u7b2c\u4e09\u65b9\u627f\u62c5\u4efb\u4f55\u8d23\u4efb\u3002")])]), e("div", [t._v("\u4e94\u3001\u8fdd\u7ea6\u8d23\u4efb")]), e("div", [e("b", [t._v("\u60a8\u5728\u53c2\u4e0e\u4f17\u7b79\u9879\u76ee\u65f6\u63d0\u4f9b\u7684\u76f8\u5173\u4fe1\u606f\u5e94\u771f\u5b9e\u3001\u51c6\u786e\u3001\u6709\u6548\u3001\u5b8c\u6574\uff0c\u4e14\u4e0d\u5b58\u5728\u8bef\u5bfc\u9648\u8ff0\uff0c\u4e0d\u4fb5\u5bb3\u5176\u4ed6\u4eba\u7684\u5408\u6cd5\u6743\u76ca\u3002\u5982\u60a8\u63d0\u4f9b\u7684\u8d44\u6599\u4e0d\u5408\u6cd5\u3001\u4e0d\u771f\u5b9e\u3001\u4e0d\u51c6\u786e\u3001\u4e0d\u8be6\u5c3d\u7684\uff0c\u7531\u6b64\u5f15\u8d77\u7684\u8d23\u4efb\u53ca\u540e\u679c\u5c06\u7531\u60a8\u627f\u62c5\uff0c\u5e76\u4e14\u4f1a\u5458\u8d2d\u4fdd\u7559\u53d6\u6d88\u60a8\u53c2\u4e0e\u4f17\u7b79\u9879\u76ee\u6743\u5229\uff0c\u60a8\u9700\u627f\u62c5\u60a8\u3001\u7b2c\u4e09\u65b9\u53ca/\u6216bilibili\u7531\u6b64\u906d\u53d7\u7684\u635f\u5931\u3002")])]), e("div", [e("b", [t._v("\u5982\u60a8\u8fdd\u53cd\u672c\u534f\u8bae\u6216bilibili\u670d\u52a1\u6761\u6b3e\uff0cbilibili\u548c/\u6216\u4f1a\u5458\u8d2d\u6709\u6743\u6839\u636e\u60a8\u7684\u5b9e\u9645\u60c5\u51b5\u91c7\u53d6\u4fee\u6539\u3001\u9650\u5236\u3001\u4e2d\u6b62\u6216\u7ec8\u6b62\u5168\u90e8\u6216\u90e8\u5206\u60a8\u7684\u9879\u76ee\u4f17\u7b79\u670d\u52a1\uff0c\u5e76\u6709\u6743\u7acb\u5373\u505a\u51fa\u5220\u9664\u3001\u53d6\u6d88\u3001\u6e05\u96f6\u3001\u5c01\u53f7\u7b49\u5904\u7406\uff0c\u4e14\u4e0d\u4e88\u4efb\u4f55\u8d54\u507f\u6216\u9000\u8fd8\u8d39\u7528\uff0c\u4e14\u60a8\u9700\u627f\u62c5\u60a8\u3001\u7b2c\u4e09\u65b9\u53ca/\u6216bilibili\u7531\u6b64\u906d\u53d7\u7684\u635f\u5931\u3002")])]), e("div", [t._v("\u516d\u3001\u6cd5\u5f8b\u9002\u7528\u4e0e\u4e89\u8bae\u89e3\u51b3")]), e("div", [t._v("\n                        \u672c\u534f\u8bae\u7684\u8ba2\u7acb\u3001\u6548\u529b\u3001\u89e3\u91ca\u3001\u5c65\u884c\u3001\u4fee\u6539\u548c\u7ec8\u6b62\u4ee5\u53ca\u4e89\u8bae\u7684\u89e3\u51b3\u9002\u7528\u4e2d\u534e\u4eba\u6c11\u5171\u548c\u56fd\u6cd5\u5f8b\u3002\u56e0\u89e3\u91ca\u548c\u5c65\u884c\u672c\u534f\u8bae\u800c\u53d1\u751f\u7684\u4efb\u4f55\u4e89\u8bae\uff0c\u672c\u534f\u8bae\u53cc\u65b9\u5e94\u9996\u5148\u901a\u8fc7\u53cb\u597d\u534f\u5546\u7684\u65b9\u5f0f\u52a0\u4ee5\u89e3\u51b3\u3002\n                        "), e("b", [t._v("\u5982\u679c\u5728\u4e00\u65b9\u5411\u5176\u4ed6\u65b9\u53d1\u51fa\u8981\u6c42\u534f\u5546\u89e3\u51b3\u7684\u4e66\u9762\u901a\u77e5\u540e 30 \u5929\u4e4b\u5185\u4e89\u8bae\u4ecd\u7136\u5f97\u4e0d\u5230\u89e3\u51b3\uff0c\u5219\u9002\u7528\u4ef2\u88c1\u89c4\u5219\u63d0\u4ea4\u5e7f\u5dde\u4ef2\u88c1\u59d4\u5458\u4f1a\u89e3\u51b3\u3002\u4ef2\u88c1\u88c1\u51b3\u662f\u7ec8\u5c40\u7684\uff0c\u5bf9\u53cc\u65b9\u5747\u6709\u7ea6\u675f\u529b\u3002")])])])])])])], 1)
        }
          , Et = []
          , Wt = {
            props: {
                cfTermsStatus: {
                    type: Boolean,
                    default: !1
                }
            },
            computed: {
                bottomOffset: function() {
                    return Tt.GO ? (0,
                    Ot.U4)(34) : 0
                },
                topOffset: function() {
                    return this.isApp ? Tt.qu ? Tt.qu : Tt.GO ? (0,
                    Ot.U4)(64) : (0,
                    Ot.U4)(20) : 0
                },
                termsHeigth: function() {
                    return "".concat(window.innerHeight - this.topOffset - this.bottomOffset, "px")
                },
                isApp: function() {
                    return It().UA.isBiliApp
                }
            },
            methods: {
                onClose: function() {
                    this.$emit("close")
                },
                cancelOrder: function() {
                    this.$emit("cancel")
                }
            }
        }
          , qt = Wt
          , Vt = (0,
        k.Z)(qt, Zt, Et, !1, null, "b7a1576c", null)
          , Ht = Vt.exports
          , Ft = function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                staticClass: "leave-dialog"
            }, [e("transition", {
                attrs: {
                    name: "popup-fade"
                }
            }, [e("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.rnTermsStatus,
                    expression: "rnTermsStatus"
                }],
                on: {
                    click: function(e) {
                        return e.stopPropagation(),
                        t.onClose.apply(null, arguments)
                    }
                }
            }, [e("bili-modal", {
                staticClass: "express-modal",
                attrs: {
                    "close-button": "",
                    theme: "full",
                    isCenter: "",
                    "no-min-height": ""
                },
                on: {
                    close: t.onClose
                }
            }, [e("div", {
                staticClass: "content"
            }, [e("div", {
                staticClass: "title"
            }, [t._v(t._s(t.title))]), e("div", {
                staticClass: "text-content"
            }, [t._v(t._s(t.text))]), t.showBtn ? e("div", {
                staticClass: "confirm-btn",
                on: {
                    click: t.onClose
                }
            }, [t._v("\u77e5\u9053\u4e86")]) : t._e()])])], 1)])], 1)
        }
          , Yt = []
          , Jt = i(45466)
          , Gt = {
            props: {
                rnTermsStatus: {
                    type: Boolean,
                    default: !1
                },
                title: {
                    type: String,
                    default: ""
                },
                text: {
                    type: String,
                    default: ""
                },
                showBtn: {
                    type: Boolean,
                    default: !0
                }
            },
            components: {
                BiliModal: Jt.Z
            },
            methods: {
                onClose: function() {
                    this.$emit("close")
                }
            }
        }
          , zt = Gt
          , Kt = (0,
        k.Z)(zt, Ft, Yt, !1, null, "dad68c10", null)
          , Qt = Kt.exports
          , Xt = function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                staticClass: "leave-dialog"
            }, [e("transition", {
                attrs: {
                    name: "popup-fade"
                }
            }, [e("div", {
                staticClass: "popup-dialog"
            }, [e("div", {
                staticClass: "popup-left"
            }), e("div", {
                staticClass: "popup-body"
            }, [e("div", {
                staticClass: "popup-container"
            }, [e("div", {
                staticClass: "leave-img"
            }), e("div", {
                staticClass: "leave-content"
            }, [t._v("\u7968\u4ef7\u53d1\u751f\u53d8\u5316\uff0c\u60a8\u9700\u652f\u4ed8\uffe5" + t._s(t.priceChangePayMoney))]), e("div", {
                staticClass: "select-btn"
            }, [e("div", {
                staticClass: "select-btn-left",
                on: {
                    click: t.onClose
                }
            }, [t._v("\u53d6\u6d88")]), e("div", {
                staticClass: "select-btn-middle"
            }), e("div", {
                staticClass: "select-btn-right",
                on: {
                    click: t.priceChangePay
                }
            }, [t._v("\u7ee7\u7eed\u652f\u4ed8")])])])]), e("div", {
                staticClass: "popup-right"
            })])]), e("transition", {
                attrs: {
                    name: "popup-fade"
                }
            }, [e("div", {
                staticClass: "popup-mask",
                on: {
                    click: function(e) {
                        return e.stopPropagation(),
                        t.onClose.apply(null, arguments)
                    },
                    touchmove: function(e) {
                        return e.stopPropagation(),
                        t.onTouchMove.apply(null, arguments)
                    }
                }
            })])], 1)
        }
          , te = []
          , ee = {
            data: function() {
                return {}
            },
            props: {
                priceChangePayMoney: {
                    type: Number
                }
            },
            methods: {
                onTouchMove: function(t) {
                    t.preventDefault()
                },
                onClose: function() {
                    this.$emit("close")
                },
                priceChangePay: function() {
                    this.$emit("priceChangePay")
                }
            }
        }
          , ie = ee
          , ne = (0,
        k.Z)(ie, Xt, te, !1, null, "35581ecd", null)
          , se = ne.exports
          , re = function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                staticClass: "notice",
                on: {
                    click: t.open
                }
            }, [e("div", {
                staticClass: "icon"
            }), e("div", {
                staticClass: "text"
            }, [t._v(t._s(t.text))]), e("div", {
                staticClass: "detail"
            }, [t._v("\u8be6\u60c5")])])
        }
          , oe = []
          , ae = {
            props: {
                text: {
                    type: String,
                    default: ""
                }
            },
            methods: {
                open: function() {
                    this.$emit("show")
                }
            }
        }
          , ce = ae
          , le = (0,
        k.Z)(ce, re, oe, !1, null, "bc2aa2d0", null)
          , de = le.exports
          , ue = function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                staticClass: "buyinfo-wrap"
            }, [e("div", {
                class: [t.tipBuyer && "tip-buyinfo"]
            }), t.checkBuyInfoCondition && 0 !== t.idBind ? e("div", {
                staticClass: "buyinfo"
            }, [e("div", {
                staticClass: "buyer-title"
            }, [t._v("\n            \u8d2d\u4e70\u4eba"), t.canSelectBuyerCount ? e("span", [t._v("(" + t._s(t.selectBuyerList.length) + "/" + t._s(t.canSelectBuyerCount) + ")")]) : t._e()]), 2 === t.idBind ? e("div", {
                staticClass: "title",
                on: {
                    click: t.onSeeTerm
                }
            }, [e("div", {
                staticClass: "icon"
            }), e("div", {
                staticClass: "tips"
            }, [t._v("\u672c\u9879\u76ee\u8d2d\u4e70\u4eba\u548c\u5165\u573a\u4eba\u8bc1\u4ef6\u987b\u4e00\u81f4\uff0c\u4ee3\u4e70\u5c06\u65e0\u6cd5\u5165\u573a")])]) : t._e(), e("div", {
                staticClass: "buyer-list"
            }, [t._l(t.userInfoList, (function(i, n) {
                return [n < 5 ? e("div", {
                    key: n,
                    staticClass: "buy-item"
                }, [e("div", {
                    staticClass: "buyer-tag tag",
                    class: {
                        selected: t.isSelected(i.id),
                        disabled: t.isDisabled(i)
                    },
                    on: {
                        click: function(e) {
                            return t.selectTag(i)
                        }
                    }
                }, [e("div", {
                    staticClass: "name"
                }, [t._v(t._s(t.substrName(i.name)))]), i.isBuyerInfoCompleted ? i.isBuyerValid && !i.isBuyerInfoVerified ? e("div", {
                    staticClass: "notice"
                }, [t._v("\u8bf7\u91cd\u65b0\u8ba4\u8bc1")]) : t._e() : e("div", {
                    staticClass: "notice"
                }, [t._v("\u8bf7\u5b8c\u5584\u4fe1\u606f")]), 1 === i.is_default ? e("div", {
                    staticClass: "default"
                }) : t._e()])]) : t._e()]
            }
            )), t.userInfoList.length <= 5 ? e("div", {
                staticClass: "buy-item"
            }, [e("div", {
                staticClass: "add-tag tag",
                on: {
                    click: t.onAddBuyer
                }
            }, [t._v("\u65b0\u589e")])]) : e("div", {
                staticClass: "buy-item"
            }, [e("div", {
                staticClass: "more-tag tag",
                on: {
                    click: t.onCheckUserInfo
                }
            }, [t._v("\u66f4\u591a")])])], 2), t._l(t.selectBuyerList.map((function(e) {
                return t.userInfoList.find((function(t) {
                    return t.id === e
                }
                ))
            }
            )).reverse(), (function(i, n) {
                return [t.isSelected(i.id) ? e("div", {
                    key: n,
                    staticClass: "buyer-detail"
                }, [e("div", {
                    staticClass: "select",
                    on: {
                        click: function(e) {
                            return t.unSelectUserDetail(i)
                        }
                    }
                }), e("div", {
                    staticClass: "content"
                }, [e("div", [t._v(t._s(i.name))]), t.checkItemCanShow("1") && i.tel ? e("div", [t._v(t._s(i.tel))]) : t._e(), t.checkItemCanShow("2") && i.personal_id ? e("div", {
                    staticClass: "personal-id"
                }, [e("label", [t._v(t._s(t.idTypeName(i.id_type)))]), e("span", [t._v(t._s(i.personal_id))])]) : t._e()]), e("div", {
                    staticClass: "modify",
                    on: {
                        click: function(e) {
                            return t.onEditBuyer(i.id)
                        }
                    }
                })]) : t._e()]
            }
            ))], 2) : t._e(), t.needContact ? e("div", {
                staticClass: "contact-info"
            }, [e("div", {
                class: {
                    error: t.errorCheck.contactName
                }
            }, [t._v("\n            \u8054\u7cfb\u4eba\n            "), e("input", {
                directives: [{
                    name: "model",
                    rawName: "v-model",
                    value: t.contactName,
                    expression: "contactName"
                }],
                attrs: {
                    type: "text",
                    maxlength: "15",
                    placeholder: "\u8bf7\u8f93\u5165\u8054\u7cfb\u4eba\u59d3\u540d"
                },
                domProps: {
                    value: t.contactName
                },
                on: {
                    blur: t.checkContactName,
                    focus: t.resetContactNameCheck,
                    input: function(e) {
                        e.target.composing || (t.contactName = e.target.value)
                    }
                }
            })]), e("div", {
                class: {
                    error: t.errorCheck.contactTel
                }
            }, [t._v("\n            \u624b\u673a\u53f7\n            "), e("input", {
                directives: [{
                    name: "model",
                    rawName: "v-model",
                    value: t.contactTel,
                    expression: "contactTel"
                }],
                attrs: {
                    type: "tel",
                    maxlength: "11",
                    placeholder: "\u8bf7\u8f93\u5165\u8054\u7cfb\u4eba\u624b\u673a\u53f7"
                },
                domProps: {
                    value: t.contactTel
                },
                on: {
                    blur: t.checkContactTel,
                    focus: t.resetContactTelCheck,
                    input: function(e) {
                        e.target.composing || (t.contactTel = e.target.value)
                    }
                }
            })]), t.contactNoticeText ? e("p", {
                staticClass: "contact-notice-text"
            }, [t._v(t._s(t.contactNoticeText))]) : t._e()]) : t._e()])
        }
          , pe = []
          , ve = i(48038)
          , _e = i(10259)
          , fe = {
            data: function() {
                return {
                    selectBuyerList: [],
                    contactTel: null,
                    contactName: null,
                    errorCheck: {
                        contactName: !1,
                        contactTel: !1
                    }
                }
            },
            watch: {
                selectBuyers: function(t) {
                    this.selectBuyerList = (0,
                    r.Z)(t)
                },
                contactInfo: {
                    handler: function(t) {
                        t && t.username && (this.contactTel = t.tel,
                        this.contactName = t.username)
                    },
                    immediate: !0
                }
            },
            mounted: function() {
                if (this.selectBuyerList = (0,
                r.Z)(this.selectBuyers),
                !this.contactInfo) {
                    var t = (0,
                    _e.$1)("DedeUserID")
                      , e = "".concat(t, "_confirm_order_contact_cache");
                    if (t) {
                        var i = JSON.parse(window.localStorage["".concat(t, "_confirm_order_contact_cache")] || "{}");
                        window.localStorage.removeItem(e),
                        i && (this.contactName = i.contactName || "",
                        this.contactTel = i.contactTel || "")
                    }
                }
            },
            props: {
                userInfoList: {
                    type: Array,
                    default: function() {
                        return []
                    }
                },
                selectBuyers: {
                    type: Array,
                    default: function() {
                        return []
                    }
                },
                checkBuyInfoCondition: {
                    type: String,
                    default: ""
                },
                canSelectBuyerCount: {
                    type: Number,
                    default: 0
                },
                idBind: {
                    type: Number,
                    default: 0
                },
                needContact: {
                    type: Number,
                    default: 0
                },
                tipBuyer: {
                    type: Boolean,
                    default: !1
                },
                count: {
                    type: Number,
                    default: 0
                },
                contactInfo: {
                    type: Object,
                    default: null
                },
                contactNoticeText: {
                    type: String,
                    default: ""
                },
                restrictBuyerInfo: {
                    type: Object,
                    default: function() {
                        return {
                            main: null,
                            relate: []
                        }
                    }
                }
            },
            methods: {
                isMainBuyer: function(t) {
                    return this.restrictBuyerInfo && this.restrictBuyerInfo.main === t
                },
                getMainBuyerTip: function() {
                    var t = this;
                    if (!this.restrictBuyerInfo || !this.restrictBuyerInfo.main)
                        return "\u5fc5\u987b\u5305\u542b\u8be5\u8d2d\u4e70\u4eba";
                    var e = this.userInfoList.find((function(e) {
                        return e.id === t.restrictBuyerInfo.main
                    }
                    ));
                    if (!e)
                        return "\u5fc5\u987b\u5305\u542b\u8be5\u8d2d\u4e70\u4eba";
                    var i = e.personal_id || "";
                    return "\u9700\u5305\u542b\u8d2d\u4e70\u4eba".concat(e.name).concat(i ? "\uff08".concat(i, "\uff09") : "")
                },
                onSeeTerm: function() {
                    this.$emit("onSeeTerm")
                },
                isSelected: function(t) {
                    return this.selectBuyerList.findIndex((function(e) {
                        return e === t
                    }
                    )) > -1
                },
                isDisabled: function(t) {
                    return t.isBuyerInfoCompleted && !t.isBuyerValid
                },
                onAddBuyer: function() {
                    this.$emit("onAddBuyer")
                },
                selectTag: function(t) {
                    if (this.isDisabled(t))
                        this.$toast(t.disabledErr);
                    else if (t.isBuyerInfoCompleted && t.isBuyerInfoVerified) {
                        if (1 === this.canSelectBuyerCount && this.restrictBuyerInfo && this.restrictBuyerInfo.main) {
                            var e = this.restrictBuyerInfo.main;
                            return t.id !== e ? void this.$toast(this.getMainBuyerTip()) : void 0
                        }
                        var i = this.selectBuyerList.findIndex((function(e) {
                            return e === t.id
                        }
                        ));
                        if (i > -1) {
                            if (1 === this.canSelectBuyerCount)
                                return;
                            if (this.isMainBuyer(t.id))
                                return void this.$toast(this.getMainBuyerTip());
                            this.selectBuyerList.splice(i, 1)
                        } else
                            1 === this.canSelectBuyerCount ? this.selectBuyerList = [t.id] : this.canSelectBuyerCount > this.selectBuyerList.length ? this.selectBuyerList.push(t.id) : this.canSelectBuyerCount <= this.selectBuyerList.length && this.$toast("\u6700\u591a\u9009\u62e9".concat(this.canSelectBuyerCount, "\u4e2a\u8d2d\u4e70\u4eba"));
                        this.$emit("pickuserinfo", this.selectBuyerList)
                    } else
                        this.$emit("onEditBuyer", t.id)
                },
                unSelectUserDetail: function(t) {
                    var e = this.selectBuyerList.findIndex((function(e) {
                        return e === t.id
                    }
                    ));
                    if (e > -1) {
                        if (this.isMainBuyer(t.id))
                            return void this.$toast(this.getMainBuyerTip());
                        this.selectBuyerList.splice(e, 1),
                        this.$emit("pickuserinfo", this.selectBuyerList)
                    }
                },
                onCheckUserInfo: function() {
                    this.$emit("onCheckUserInfo")
                },
                onEditBuyer: function(t) {
                    this.$emit("onEditBuyer", t)
                },
                checkItemCanShow: function(t) {
                    var e = this.checkBuyInfoCondition.split(",");
                    return e.indexOf(t) > -1
                },
                idTypeName: function(t) {
                    return ve.k2[t]
                },
                checkContactTel: function(t) {
                    var e = t.currentTarget.value;
                    if (this.errorCheck.contactTel = !1,
                    e) {
                        var i = /^1[\d]{10}$/
                          , n = i.test(e);
                        this.errorCheck.contactTel = !n
                    }
                },
                checkContactName: function() {
                    this.errorCheck.contactName = !1
                },
                resetContactNameCheck: function() {
                    this.errorCheck.contactName = !1
                },
                resetContactTelCheck: function() {
                    this.errorCheck.contactTel = !1
                },
                contactCache: function(t) {
                    if (!window.localStorage)
                        return {};
                    var e = (0,
                    _e.$1)("DedeUserID");
                    if (t && e)
                        window.localStorage["".concat(e, "_confirm_order_contact_cache")] = JSON.stringify(t);
                    else if (e)
                        return JSON.parse(window.localStorage["".concat(e, "_confirm_order_contact_cache")] || "{}");
                    return {}
                },
                substrName: function(t) {
                    return t.length > 4 ? "".concat(t.substring(0, 4), "...") : t
                }
            }
        }
          , he = fe
          , me = (0,
        k.Z)(he, ue, pe, !1, null, "63fb6a4e", null)
          , be = me.exports
          , ye = i(52053)
          , ge = i(87445)
          , Ce = i(43790)
          , ke = i(21052)
          , we = i(5259)
          , xe = i(54717)
          , Se = i(12434)
          , Te = i(74834)
          , Oe = i(19073)
          , Be = i.n(Oe)
          , Ie = i(87761)
          , Ae = "https://res.wx.qq.com/open/js/jweixin-1.3.2.js"
          , Pe = null
          , je = function() {
            var t = a()(regeneratorRuntime.mark((function t() {
                return regeneratorRuntime.wrap((function(t) {
                    while (1)
                        switch (t.prev = t.next) {
                        case 0:
                            if (It().UA.isMiniProgram) {
                                t.next = 2;
                                break
                            }
                            return t.abrupt("return", Promise.reject(new Error("not in mini program")));
                        case 2:
                            if (!Pe) {
                                t.next = 4;
                                break
                            }
                            return t.abrupt("return", Promise.resolve());
                        case 4:
                            return window.wx && !window.wx.miniProgram && (delete window.wx,
                            delete window.jWeixin),
                            t.next = 7,
                            (0,
                            Ie.Z)(Ae);
                        case 7:
                            return window.wx.error((function(t) {
                                console.error("jssdk failed", t)
                            }
                            )),
                            t.abrupt("return", Promise.resolve(window.wx));
                        case 9:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            )));
            return function() {
                return t.apply(this, arguments)
            }
        }()
          , Le = function(t) {
            var e = Object.entries(t).map((function(t) {
                var e = Be()(t, 2)
                  , i = e[0]
                  , n = e[1];
                return "".concat(i, "=").concat(encodeURIComponent(n))
            }
            )).join("&");
            return je().then((function() {
                return wx.miniProgram.navigateTo({
                    url: "/pages/orderpay/orderpay?".concat(e)
                })
            }
            ))
        }
          , Ne = function() {
            return je().then((function() {
                return wx.miniProgram.navigateBack()
            }
            ))
        }
          , De = function(t, e) {
            return je().then((function() {
                var i = Object.entries(e).map((function(t) {
                    var e = Be()(t, 2)
                      , i = e[0]
                      , n = e[1];
                    return "".concat(i, "=").concat(encodeURIComponent(n))
                }
                )).join("&");
                switch (t) {
                case "detail":
                    return wx.miniProgram.navigateTo({
                        url: "/pages/detail/detail?".concat(i)
                    });
                case "orderDetail":
                    return wx.miniProgram.navigateTo({
                        url: "/pages/orderdetail/orderdetail?".concat(i)
                    });
                case "ptDetail":
                    return wx.miniProgram.navigateTo({
                        url: "/pages/ptDetail/ptDetail?".concat(i)
                    });
                case "home":
                    return wx.miniProgram.switchTab({
                        url: "/pages/index/index?".concat(i)
                    });
                default:
                    var n = "".concat(e.url).concat(e.url.includes("?") ? "&" : "?").concat(i);
                    return wx.miniProgram.navigateTo({
                        url: "/pages/webview/webview?url=".concat(encodeURIComponent(n))
                    })
                }
            }
            )).catch((function(t) {
                return console.error("postMessage error", t)
            }
            ))
        }
          , Re = i(5228)
          , Ue = i.n(Re)
          , Me = i(77e3)
          , $e = i(4827)
          , Ze = i.n($e)
          , Ee = i(51486)
          , We = i(69883)
          , qe = i(60397)
          , Ve = i(66281)
          , He = i(22035);
        function Fe(t, e) {
            var i = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(t);
                e && (n = n.filter((function(e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                }
                ))),
                i.push.apply(i, n)
            }
            return i
        }
        function Ye(t) {
            for (var e = 1; e < arguments.length; e++) {
                var i = null != arguments[e] ? arguments[e] : {};
                e % 2 ? Fe(Object(i), !0).forEach((function(e) {
                    l()(t, e, i[e])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : Fe(Object(i)).forEach((function(e) {
                    Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
                }
                ))
            }
            return t
        }
        var Je = i(37220)
          , Ge = Je.generateDeviceFingerPointer
          , ze = {
            can_use: 0,
            discount: 0,
            pay_money: 0
        }
          , Ke = {
            begin_time: 0,
            coupon_stock: 0,
            end_time: 0,
            id: 0,
            item_id: 0,
            rebate_id: 0,
            rebate_money: 0,
            sku_id: 0,
            status: 0
        }
          , Qe = 8;
        try {
            (0,
            qe.Wf)("https://c360294b5dbe4a60b0f4ff67e947c7e1@spy-family.bilibili.co/15")
        } catch (ri) {
            console.error(ri)
        }
        var Xe = (0,
        ye.Z)();
        if (It().UA.isMiniProgram) {
            var ti = It().exec;
            It().exec = function() {
                for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
                    e[i] = arguments[i];
                var n = e[0]
                  , s = e[1];
                if ("openWindow" === n) {
                    var r, o = new URL(s.url), a = o.searchParams, c = o.pathname, l = null === (r = a.get("page")) || void 0 === r ? void 0 : r.replace("ticket_", "");
                    if (!l) {
                        var d, u = c.split("/");
                        l = null === (d = u[u.length - 1]) || void 0 === d ? void 0 : d.replace(".html", "")
                    }
                    return "detail" === l ? Ne() : ["ptDetail", "orderDetail", "home"].includes(l) ? De(l, Ye(Ye({}, Object.fromEntries(a)), {}, {
                        url: s.url,
                        page: l,
                        oaccesskey: Xe.oaccesskey
                    })) : (s.url = "".concat(s.url).concat(s.url.includes("?") ? "&" : "?", "oaccesskey=").concat(Xe.oaccesskey),
                    ti.apply(this, e))
                }
                return "fetch" === n && s && s.url && !s.url.includes("oaccesskey=") && (s.url = "".concat(s.url).concat(s.url.includes("?") ? "&" : "?", "oaccesskey=").concat(Xe.oaccesskey)),
                ti.apply(this, e)
            }
        }
        var ei = {
            data: function() {
                return {
                    tipBuyer: !1,
                    firstEnter: !0,
                    showCashier: !1,
                    c_version: "",
                    newPayParam: {},
                    channelParams: {},
                    headerLogin: {
                        isLogin: !0
                    },
                    userInfo: {
                        isLogin: !1
                    },
                    mid: "",
                    paperTicketStatus: !1,
                    convertTicketStatus: !0,
                    eTicketStatus: !1,
                    defaultAddress: !1,
                    discountsVisible: !1,
                    priceInfoVisible: !1,
                    selectedStatus: !1,
                    orderTermStatus: !1,
                    hygTermsStatus: !1,
                    cfTermsStatus: !1,
                    uncheckedTerms: !0,
                    anyTicketStatus: !1,
                    selectUserId: 0,
                    selectUserIds: [],
                    userInfoVisible: !1,
                    token: "",
                    detail: {
                        prices: [],
                        orderList: [],
                        deliver: [],
                        buyer: [],
                        deliver_type: "",
                        seats: [],
                        promotion: {}
                    },
                    userinfodata: {},
                    buyer_info: "",
                    orderObj: {
                        project_id: "",
                        screen_id: "",
                        count: 0,
                        pay_money: "",
                        order_type: "",
                        timestamp: null,
                        id_bind: 0,
                        need_contact: 0,
                        contactNoticeText: "",
                        is_package: 0,
                        package_num: 1,
                        contactInfo: {}
                    },
                    order_create_status: !1,
                    order_create_text: "\u8ba2\u5355\u521b\u5efa\u4e2d\uff0c\u8bf7\u8010\u5fc3\u7b49\u5019",
                    createStatusCount: 0,
                    createRequestCount: 0,
                    failSeats: [],
                    selectedSeats: [],
                    orderId: "",
                    priceChange: !1,
                    priceChangePayMoney: null,
                    someNomalTicketStatus: !1,
                    ticketNum: "",
                    projectOffLineStatus: !1,
                    dialogTipInfo: "",
                    defaultAddressInfo: {},
                    ptStatus: !1,
                    ptStatusNum: 1,
                    project_id: "",
                    screen_id: "",
                    order_id: "",
                    group_id: "",
                    couponList: [],
                    couponItem: {},
                    discountStatus: !0,
                    couponCode: "",
                    pay_money: 0,
                    lock_id: "",
                    ticketType: 0,
                    toastTime: 1,
                    confirm_voucher: "",
                    pending_captcha_status: !1,
                    pending_captcha_timer: null,
                    yearCardInfo: {},
                    isYearCardOn: !1,
                    isYearCardAvail: !1,
                    cachePayPrice: 0,
                    isRightsModalShow: !1,
                    rebateInfo: {},
                    link_id: -1,
                    deviceId: "",
                    selectBuyers: [],
                    rnTermsStatus: !1,
                    captchaVerifier: (0,
                    Ce.Z)(),
                    loading: !1,
                    enter_notice: "",
                    noticeText: "",
                    noticeTitle: "",
                    noticeShowBtn: !0,
                    showErrorPage: !1,
                    createOrderClickEvent: null,
                    createdTime: null,
                    initLoading: !0,
                    isRequestLimit: !1,
                    isFreePass: !1,
                    hotProject: !1,
                    collection: null,
                    query: Xe
                }
            },
            components: {
                BHeader: f.Z,
                BButton: h.Z,
                orderState: x,
                sumPriceDialog: N,
                withoutSelectedDialog: F,
                orderTermsLayer: Lt,
                ticketsTipDialog: Q,
                userInfoDialog: X.Z,
                OrderLoading: _.Z,
                priceChange: se,
                someNomalTicketDialog: rt,
                projectOffLineDialog: ut,
                ptDetailDialog: wt,
                discountsDialog: Z,
                BiliPrice: m.Z,
                rightDialog: mt,
                HygTermsLayer: $t,
                CfTermsLayer: Ht,
                buyerInfo: be,
                realNameLayer: Qt,
                epidemicNotice: de,
                ErrorPage: Se.Z,
                TipBar: T.Z
            },
            watch: {
                pending_captcha_status: function() {
                    var t = this;
                    !0 === this.pending_captcha_status && (this.pending_captcha_timer && clearTimeout(this.pending_captcha_timer),
                    this.pending_captcha_timer = setTimeout((function() {
                        t.captchaVerifier.verifyCaptcha(),
                        t.pending_captcha_status = !1
                    }
                    ), 1e3))
                },
                order_create_status: function(t) {
                    t ? O.Z.show({
                        message: "\u8ba2\u5355\u521b\u5efa\u4e2d"
                    }) : O.Z.hide()
                },
                isYearCardOn: function(t) {
                    if (this.isYearCardAvail) {
                        var e = this.orderObj.pay_money;
                        t ? (this.cachePayPrice = this.pay_money,
                        this.orderObj.pay_money = this.yearCardInfo.pay_money,
                        this.pay_money = this.yearCardInfo.pay_money) : this.cachePayPrice && (this.orderObj.pay_money = this.cachePayPrice,
                        this.pay_money = this.cachePayPrice),
                        e !== this.orderObj.pay_money && this.isNewPay && this.changeChannel(this.orderObj.pay_money)
                    }
                }
            },
            computed: {
                isHeaderShow: function() {
                    if (!this.isApp && !It().UA.isMiniProgram)
                        return !0;
                    var t = !!this.query.noTitleBar;
                    return t
                },
                isNewPay: function() {
                    return !(!this.isApp || !this.showCashier)
                },
                isApp: function() {
                    return It().UA.isBiliApp
                },
                expressText: function() {
                    return 2 === this.detail.express_type ? "\u5feb\u9012\u514d\u90ae" : 3 === this.detail.express_type ? "\u5feb\u9012\u5230\u4ed8" : 4 === this.detail.express_type ? "\u5e74\u5ea6\u5927\u4f1a\u5458\u514d\u90ae" : "\u5feb\u9012"
                },
                canSelectBuyerCount: function() {
                    switch (this.orderObj.id_bind) {
                    case 0:
                        return 0;
                    case 1:
                        return 1;
                    case 2:
                        return this.orderObj.is_package ? this.orderObj.count * this.orderObj.package_num : this.orderObj.count;
                    default:
                        return 0
                    }
                },
                isTermsCheckedKey: function() {
                    return "isTermsChecked:".concat(this.mid)
                },
                needBuyer: function() {
                    return this.buyer_info && 0 !== this.orderObj.id_bind
                },
                restrictBuyerInfo: function() {
                    var t, e = ((null === (t = this.userinfodata) || void 0 === t ? void 0 : t.list) || []).find((function(t) {
                        return !!t.isMaster
                    }
                    ));
                    if (e) {
                        var i, n = ((null === (i = this.userinfodata) || void 0 === i ? void 0 : i.list) || []).filter((function(t) {
                            return t.id !== e.id
                        }
                        )).map((function(t) {
                            return t.id
                        }
                        ));
                        return {
                            main: e.id,
                            relate: n
                        }
                    }
                    return {
                        main: null,
                        relate: []
                    }
                }
            },
            created: function() {
                var t, e = this;
                window.onpageshow = function(t) {
                    t.persisted && window.location.reload()
                }
                ,
                window.onWebviewAppear = function() {
                    window.setTimeout((function() {
                        e.initConfirm()
                    }
                    ), 50)
                }
                ,
                window.onWebviewDisappear = function() {
                    e.captchaVerifier.destroyCaptcha(),
                    e.clearVoucher()
                }
                ,
                this.token = Xe.token,
                Xe.lock_id && (this.lock_id = Xe.lock_id),
                Xe.project_id && (this.project_id = Xe.project_id),
                Xe.screen_id && (this.screen_id = Xe.screen_id),
                Xe.order_id && (this.order_id = Xe.order_id),
                Xe.group_id && (this.group_id = Xe.group_id),
                Xe.link_id && (this.link_id = parseInt(Xe.link_id)),
                this.query = Xe,
                this.initConfirm(!0).then((function() {
                    var t = e.detail.seats && e.detail.seats.length;
                    !t && e.checkStock(),
                    e.hotProject && (e.collection = new Ve.Collect);
                    var i = (Xe.buyerIds || "").split(",").map((function(t) {
                        return parseInt(t)
                    }
                    )).filter((function(t) {
                        var i;
                        return !!t && (null === (i = e.userinfodata.list) || void 0 === i ? void 0 : i.some((function(e) {
                            return e.id === t
                        }
                        )))
                    }
                    ));
                    i && i.length > 0 && e.canSelectBuyerCount >= i.length && (e.selectBuyers = i)
                }
                )),
                this.yearCardInfo = Ye({}, ze),
                this.rebateInfo = Ye({}, Ke),
                this.deviceId = Ge(),
                this.createdTime = Date.now(),
                this.isApp && It().UA.isiOS && (null === (t = window.history) || void 0 === t ? void 0 : t.length) > 1 && (It().exec("setDragGesture", {
                    enable: 0
                }),
                document.addEventListener("touchstart", (function(t) {
                    if (t.touches[0].pageX < 20) {
                        var e = t.touches[0].pageX
                          , i = function t(i) {
                            var n = i.changedTouches[0].pageX
                              , s = n - e;
                            s > 100 && (It().exec("goBack"),
                            It().exec("setDragGesture", {
                                enable: 1
                            })),
                            document.removeEventListener("touchend", t)
                        };
                        document.addEventListener("touchend", i)
                    }
                }
                )))
            },
            mounted: function() {
                ge.Z.addPvLog({
                    logger: "mall.ticket-order"
                }),
                (0,
                He.report)(He.LiveReportType.BUY_NOW),
                this.interceptBackAction()
            },
            methods: {
                closeNoticeModal: function() {
                    this.rnTermsStatus = !1,
                    this.noticeTitle = "",
                    this.noticeText = "",
                    this.noticeShowBtn = !0
                },
                clickSeeTerm: function() {
                    ge.Z.addShowLog("mall.ticket-order.buyer.0.show", this.$el, {
                        itemid: this.orderObj.project_id
                    }),
                    this.rnTermsStatus = !0,
                    this.noticeTitle = "\u5b9e\u540d\u8d2d\u7968",
                    this.noticeText = "\u6839\u636e\u6cd5\u5f8b\u89c4\u5b9a\u4ee5\u53ca\u56fd\u5185\u516c\u5b89\u90e8\u95e8\u5bf9\u5927\u578b\u6d3b\u52a8\u4e2d\u8d2d\u7968\u7528\u6237\u6216\u89c2\u6f14\u7528\u6237\u5b9e\u540d\u5236\u7684\u8981\u6c42\uff0c\u5b9e\u540d\u5236\u7684\u9879\u76ee\uff0c\u5728\u8d2d\u7968\u65f6\u9700\u8981\u63d0\u4f9b\u4f60\u7684\u5b9e\u540d\u4fe1\u606f\uff0c\u5305\u62ec\uff08\u59d3\u540d\u3001\u8eab\u4efd\u8bc1\u3001\u62a4\u7167\u3001\u6e2f\u6fb3\u5c45\u6c11\u6765\u5f80\u5185\u5730\u901a\u884c\u8bc1\u3001\u53f0\u6e7e\u5c45\u6c11\u6765\u5f80\u5927\u9646\u901a\u884c\u8bc1\uff09\u3002\u4e3a\u65b9\u4fbf\u60a8\u8fc5\u901f\u4e0b\u5355\uff0c\u60a8\u53ef\u9009\u62e9\u5728\u8d2d\u7968\u524d\u63d0\u524d\u6dfb\u52a0\u6216\u5728\u8d2d\u7968\u8fc7\u7a0b\u4e2d\u63d0\u4ea4\u8d2d\u4e70\u4eba\u5b9e\u540d\u4fe1\u606f\u3002\u4e3a\u4fdd\u8bc1\u4fe1\u606f\u7684\u771f\u5b9e\u6027\u548c\u552f\u4e00\u6027\uff0c\u6211\u4eec\u4f1a\u57fa\u4e8e\u60a8\u6240\u63d0\u4f9b\u7684\u4fe1\u606f\u901a\u8fc7\u5f81\u4fe1\u5e73\u53f0\u6216\u5176\u4ed6\u60ef\u5e38\u65b9\u5f0f\u8fdb\u884c\u5b9e\u540d\u9a8c\u8bc1",
                    this.noticeShowBtn = !0
                },
                clickNotice: function() {
                    ge.Z.addShowLog("mall.ticket-order.remind.0.show", this.$el, {
                        itemid: this.orderObj.project_id
                    }),
                    this.rnTermsStatus = !0,
                    this.noticeTitle = "\u91cd\u8981\u63d0\u9192",
                    this.noticeText = this.enter_notice
                },
                handleShowRights: function() {
                    this.isRightsModalShow = !0
                },
                handleHideRights: function() {
                    this.isRightsModalShow = !1
                },
                getDetailUrl: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.project_id;
                    return (0,
                    xe["default"])("detail", "id=".concat(t, "&noTitleBar=1"), {
                        renovation: "1" === this.query.detail_v2
                    })
                },
                clickYearCardSwitchHandler: function() {
                    var t = this;
                    this.detail.year_card && this.detail.count > 1 ? S.Z.confirm("\u4f7f\u7528233\u5e74\u5361\uff0c\u6bcf\u5355\u9650\u8d2d\u4e00\u5f20", {
                        subMessage: "\u8bf7\u8fd4\u56de\u8be6\u60c5\u9875\u4fee\u6539\u8d2d\u4e70\u6570\u91cf",
                        confirmButtonText: "\u8fd4\u56de\u8be6\u60c5\u9875",
                        cancelButtonText: "\u4e0d\u4f7f\u7528\u5e74\u5361"
                    }).then((function() {
                        It().exec("openWindow", {
                            url: t.getDetailUrl()
                        })
                    }
                    )).catch((function() {}
                    )) : this.isYearCardOn = !this.isYearCardOn
                },
                hideYearcardDialog: function() {
                    this.isYearcardDialogShow = !1
                },
                initConfirm: function() {
                    var t = arguments
                      , e = this;
                    return a()(regeneratorRuntime.mark((function i() {
                        var n, s, r, o, c, l, d;
                        return regeneratorRuntime.wrap((function(i) {
                            while (1)
                                switch (i.prev = i.next) {
                                case 0:
                                    return n = t.length > 0 && void 0 !== t[0] && t[0],
                                    s = e,
                                    r = s.project_id,
                                    o = s.screen_id,
                                    c = s.order_id,
                                    l = s.group_id,
                                    s.couponCode = "",
                                    d = Ye(Ye({}, e.query.fromOuterLink ? e.query : {}), {}, {
                                        token: s.token,
                                        timestamp: +new Date,
                                        project_id: r,
                                        ptoken: e.query.ptoken
                                    }),
                                    e.isApp && (d.show_cashier = 1),
                                    e.confirm_voucher && (d.voucher = e.confirm_voucher),
                                    e.query.freeCode && (d.freeCode = e.query.freeCode),
                                    e.confirm_voucher = "",
                                    e.loading = !0,
                                    i.abrupt("return", (0,
                                    Ee.vA)(d).then(function() {
                                        var t = a()(regeneratorRuntime.mark((function t(i) {
                                            var a, d, u, p, v, _, f, h, m, b;
                                            return regeneratorRuntime.wrap((function(t) {
                                                while (1)
                                                    switch (t.prev = t.next) {
                                                    case 0:
                                                        if (e.loading = !1,
                                                        e.initLoading = !1,
                                                        e.clearVoucher(),
                                                        !i) {
                                                            t.next = 69;
                                                            break
                                                        }
                                                        if (i.errno = "code"in i ? i.code : i.errno,
                                                        i.msg = i.message || i.msg,
                                                        0 !== i.errno) {
                                                            t.next = 42;
                                                            break
                                                        }
                                                        a = i.data,
                                                        s.detail = a,
                                                        e.userInfo.isLogin = !0,
                                                        e.mid = a.mid || "",
                                                        a && a.promotionList && a.promotionList.FREE_PASS && Array.isArray(a.promotionList.FREE_PASS) ? (e.isFreePass = !0,
                                                        e.freePassList = a.promotionList.FREE_PASS,
                                                        s.couponList = e.freePassList,
                                                        s.detail.couponList = e.freePassList,
                                                        e.pickCoupon(e.freePassList["code"])) : (e.isFreePass = !1,
                                                        e.freePassList = [],
                                                        s.couponList = a.couponList),
                                                        s.orderObj.project_id = a.project_id,
                                                        s.orderObj.screen_id = a.screen_id,
                                                        s.orderObj.count = a.count,
                                                        s.enter_notice = a.enter_notice,
                                                        s.orderObj.order_type = a.order_type,
                                                        s.orderObj.id_bind = a.id_bind,
                                                        s.orderObj.is_package = a.ticket_info && a.ticket_info.is_package,
                                                        s.orderObj.package_num = a.ticket_info && a.ticket_info.package_num,
                                                        s.orderObj.need_contact = a.need_contact,
                                                        s.orderObj.contactNoticeText = a.contactNoticeText || "",
                                                        e.query.contactName || e.query.contactPhone ? (e.orderObj.contactInfo.username = e.query.contactName || "",
                                                        e.orderObj.contactInfo.tel = e.query.contactPhone || "") : s.orderObj.contactInfo = a.contact_info,
                                                        setTimeout((function() {
                                                            s.channelParams = a.pay_channel_list || {}
                                                        }
                                                        ), 10),
                                                        s.c_version = a.create_version ? a.create_version : "",
                                                        s.showCashier = a.show_cashier || 0,
                                                        s.hotProject = a.hotProject || !1;
                                                        try {
                                                            n && (s.uncheckedTerms = !!a.hasOwnProperty("purchase_agreement") && !a.purchase_agreement),
                                                            d = window.localStorage.getItem(e.isTermsCheckedKey),
                                                            null !== d && (s.uncheckedTerms = !JSON.parse(d)),
                                                            a.crowdfund && a.crowdfund.cf_id && (s.uncheckedTerms = void 0 === a.purchase_agreement || !a.purchase_agreement)
                                                        } catch (ri) {}
                                                        if (a.rebate && a.rebate.rebate_id && (s.orderObj.order_type = 3,
                                                        s.rebateInfo = Ye(Ye({}, Ke), !!i.data.rebate && i.data.rebate)),
                                                        a.year_card && (s.yearCardInfo = Ye(Ye({}, ze), a.year_card),
                                                        s.isYearCardAvail = !!a.year_card.can_use,
                                                        s.isYearCardOn = !1),
                                                        a.promotion && (a.promotion.promo_id && (s.orderObj.promo_id = parseInt(a.promotion.promo_id)),
                                                        a.promotion.promo_group_id && (s.orderObj.promo_group_id = parseInt(a.promotion.promo_group_id))),
                                                        a.seats && a.seats.length >= 1) {
                                                            for (u = a.seats,
                                                            p = [],
                                                            v = 0,
                                                            _ = u.length; v < _; v++)
                                                                p.push(u[v].area_seat);
                                                            s.orderObj.seats = JSON.stringify(p),
                                                            1 === s.toastTime && (s.toastTime++,
                                                            e.$toast("\u8bf7\u5c3d\u5feb\u4e0b\u5355\u4ed8\u6b3e\uff0c\u907f\u514d\u5176\u4ed6\u4eba\u62a2\u8d70\u5ea7\u4f4d"))
                                                        }
                                                        a.ticket_info && (s.orderObj.sku_id = a.ticket_info.sku_id),
                                                        s.detail && s.detail.buyer_info && (s.buyer_info = s.detail.buyer_info),
                                                        "" !== a.buyer_info && (s.getBuyerInfo(a.buyerList),
                                                        It().exec("visibilityChange", {
                                                            cb: function(t) {
                                                                e.updateBuyerInfo(t)
                                                            },
                                                            scope: e
                                                        })),
                                                        3 === a.deliver_type && s.getBuyerAddr(a.addrList),
                                                        s.couponList && s.couponList.length > 0 ? (f = a.couponList[0],
                                                        e.pickCoupon(f.code)) : (s.pay_money = a.pay_money,
                                                        s.orderObj.pay_money = a.pay_money,
                                                        s.orderObj.coupon_code = "",
                                                        s.couponCode = ""),
                                                        a.crowdfund && (s.orderObj.cf_id = a.crowdfund.cf_id),
                                                        2 === a.ticket_type || 3 === a.ticket_type || 2 === a.deliver_type && 1 === a.ticket_type || 12 === a.ticket_type ? s.ticketType = 1 : 2 !== a.deliver_type && 1 === a.ticket_type && (s.ticketType = 2);
                                                        try {
                                                            ge.Z.addClickLog({
                                                                logger: "mall.ticket-order.page.0.show",
                                                                extra: {
                                                                    itemid: s.orderObj.project_id,
                                                                    buyerid: e.query.buyerIds || "",
                                                                    is_contacts: null !== (h = s.orderObj.contactInfo) && void 0 !== h && h.contactName || null !== (m = s.orderObj.contactInfo) && void 0 !== m && m.username ? 1 : 0
                                                                }
                                                            })
                                                        } catch (ri) {
                                                            console.error(ri)
                                                        }
                                                        t.next = 69;
                                                        break;
                                                    case 42:
                                                        if (213 !== i.errno) {
                                                            t.next = 46;
                                                            break
                                                        }
                                                        r && o ? It().exec("openWindow", {
                                                            url: (0,
                                                            xe["default"])("checkSeat", "noTitleBar=1&project_id=".concat(r, "&screen_id=").concat(o)),
                                                            newWebview: !1
                                                        }) : !o && r ? It().exec("openWindow", {
                                                            url: e.getDetailUrl(r),
                                                            newWebview: !1
                                                        }) : !c && !l || r || o || (c && !l ? It().exec("openWindow", {
                                                            url: (0,
                                                            xe["default"])("ptDetail", "noTitleBar=1&order_id=".concat(c)),
                                                            newWebview: !1
                                                        }) : !c && l ? It().exec("openWindow", {
                                                            url: (0,
                                                            xe["default"])("ptDetail", "noTitleBar=1&group_id=".concat(l)),
                                                            newWebview: !1
                                                        }) : c && l && It().exec("openWindow", {
                                                            url: (0,
                                                            xe["default"])("ptDetail", "noTitleBar=1&group_id=".concat(l, "&order_id=").concat(c)),
                                                            newWebview: !1
                                                        })),
                                                        t.next = 69;
                                                        break;
                                                    case 46:
                                                        if (2 !== i.errno) {
                                                            t.next = 50;
                                                            break
                                                        }
                                                        It().exec("goLogin").then((function() {
                                                            e.userInfo.isLogin = !0
                                                        }
                                                        )),
                                                        t.next = 69;
                                                        break;
                                                    case 50:
                                                        if (100044 !== i.errno) {
                                                            t.next = 68;
                                                            break
                                                        }
                                                        return t.prev = 51,
                                                        s.order_create_status = !1,
                                                        t.next = 55,
                                                        e.captchaVerifier.initCaptcha({
                                                            project_id: s.project_id,
                                                            screen_id: s.screen_id
                                                        });
                                                    case 55:
                                                        return s.captchaVerifier.addCloseCallback("init", (function() {
                                                            s.pending_captcha_status = !0
                                                        }
                                                        )),
                                                        t.next = 58,
                                                        s.captchaVerifier.verifyCaptcha();
                                                    case 58:
                                                        b = t.sent,
                                                        s.confirm_voucher = b,
                                                        s.captchaVerifier.destroyCaptcha(),
                                                        s.initConfirm(),
                                                        t.next = 66;
                                                        break;
                                                    case 64:
                                                        t.prev = 64,
                                                        t.t0 = t["catch"](51);
                                                    case 66:
                                                        t.next = 69;
                                                        break;
                                                    case 68:
                                                        100050 === i.errno ? (S.Z.alert(i.msg, {
                                                            confirmButtonText: "\u8fd4\u56de\u9879\u76ee\u8be6\u60c5\u9875"
                                                        }).then((function() {
                                                            -1 !== document.referrer.indexOf("ticket_checkSeat") ? It().exec("openWindow", {
                                                                url: e.getDetailUrl(),
                                                                newWebview: !1
                                                            }) : -1 !== document.referrer.indexOf("ticket_detail") || It().UA.isBiliApp ? It().exec("goBack") : It().exec("openWindow", {
                                                                url: e.getDetailUrl()
                                                            })
                                                        }
                                                        )),
                                                        s.order_create_status = !1) : 101006 === i.errno ? (s.order_create_status = !1,
                                                        s.selectedStatus = !0) : 100001 === i.errno ? e.isRequestLimit = !0 : e.$toast(i.msg);
                                                    case 69:
                                                    case "end":
                                                        return t.stop()
                                                    }
                                            }
                                            ), t, null, [[51, 64]])
                                        }
                                        )));
                                        return function(e) {
                                            return t.apply(this, arguments)
                                        }
                                    }()).catch((function(t) {
                                        throw e.showErrorPage = !0,
                                        e.loading = !1,
                                        e.initLoading = !1,
                                        [429, 504].includes(t.status) && (e.isRequestLimit = !0),
                                        console.error(t),
                                        t
                                    }
                                    )));
                                case 14:
                                case "end":
                                    return i.stop()
                                }
                        }
                        ), i)
                    }
                    )))()
                },
                getBuyerAddr: function(t) {
                    var e = this;
                    return a()(regeneratorRuntime.mark((function i() {
                        var n, s, r, o, a, c, l;
                        return regeneratorRuntime.wrap((function(i) {
                            while (1)
                                switch (i.prev = i.next) {
                                case 0:
                                    if (n = e,
                                    t) {
                                        i.next = 6;
                                        break
                                    }
                                    return i.next = 4,
                                    (0,
                                    Ee.gY)({
                                        timestamp: +new Date
                                    });
                                case 4:
                                    s = i.sent,
                                    0 === s.errno && s.data && (t = s.data);
                                case 6:
                                    if (t && t.addr_list || e.$toast(s.msg || "\u83b7\u53d6\u5730\u5740\u5931\u8d25"),
                                    r = t.addr_list,
                                    o = {},
                                    !r || 0 !== r.length) {
                                        i.next = 13;
                                        break
                                    }
                                    n.defaultAddress = !0,
                                    i.next = 43;
                                    break;
                                case 13:
                                    if (!(r && r.length > 0)) {
                                        i.next = 43;
                                        break
                                    }
                                    if (n.defaultAddress = !1,
                                    a = (0,
                                    _e.$1)("addressId"),
                                    "" === a) {
                                        i.next = 37;
                                        break
                                    }
                                    if ("0" === a) {
                                        i.next = 34;
                                        break
                                    }
                                    c = 0,
                                    l = r.length;
                                case 19:
                                    if (!(c < l)) {
                                        i.next = 31;
                                        break
                                    }
                                    if (a != r[c].id) {
                                        i.next = 28;
                                        break
                                    }
                                    return n.defaultAddressInfo = r[c],
                                    o.name = r[c].name,
                                    o.addr_id = r[c].id,
                                    o.tel = r[c].phone,
                                    o.addr = r[c].prov + r[c].city + r[c].area + r[c].addr,
                                    n.orderObj.deliver_info = JSON.stringify(o),
                                    i.abrupt("break", 31);
                                case 28:
                                    c++,
                                    i.next = 19;
                                    break;
                                case 31:
                                    c === l && (n.defaultAddressInfo = r[0],
                                    o.name = r[0].name,
                                    o.addr_id = r[0].id,
                                    o.tel = r[0].phone,
                                    o.addr = r[0].prov + r[0].city + r[0].area + r[0].addr,
                                    n.orderObj.deliver_info = JSON.stringify(o)),
                                    i.next = 35;
                                    break;
                                case 34:
                                    "0" === a && (n.defaultAddressInfo = r[0],
                                    o.name = r[0].name,
                                    o.addr_id = r[0].id,
                                    o.tel = r[0].phone,
                                    o.addr = r[0].prov + r[0].city + r[0].area + r[0].addr,
                                    n.orderObj.deliver_info = JSON.stringify(o));
                                case 35:
                                    i.next = 43;
                                    break;
                                case 37:
                                    n.defaultAddressInfo = r[0],
                                    o.name = r[0].name,
                                    o.addr_id = r[0].id,
                                    o.tel = r[0].phone,
                                    o.addr = r[0].prov + r[0].city + r[0].area + r[0].addr,
                                    n.orderObj.deliver_info = JSON.stringify(o);
                                case 43:
                                case "end":
                                    return i.stop()
                                }
                        }
                        ), i)
                    }
                    )))()
                },
                getBuyerInfo: function(t) {
                    var e = this;
                    return a()(regeneratorRuntime.mark((function i() {
                        var n, s, o, a, c, l, d, u, p;
                        return regeneratorRuntime.wrap((function(i) {
                            while (1)
                                switch (i.prev = i.next) {
                                case 0:
                                    if (n = e,
                                    t) {
                                        i.next = 16;
                                        break
                                    }
                                    return o = e.project_id,
                                    a = Ye(Ye({}, e.query.fromOuterLink ? e.query : {}), {}, {
                                        token: e.token,
                                        timestamp: +new Date,
                                        project_id: o,
                                        ptoken: e.query.ptoken
                                    }),
                                    e.isApp && (a.show_cashier = 1),
                                    e.confirm_voucher && (a.voucher = e.confirm_voucher),
                                    e.query.freeCode && (a.freeCode = e.query.freeCode),
                                    i.next = 9,
                                    (0,
                                    Ee.vA)(a);
                                case 9:
                                    if (s = i.sent,
                                    !s || 0 !== s.errno && 0 !== s.code || !s.data || !s.data.buyerList) {
                                        i.next = 14;
                                        break
                                    }
                                    t = s.data.buyerList,
                                    i.next = 16;
                                    break;
                                case 14:
                                    return e.$toast((null === (c = s) || void 0 === c ? void 0 : c.msg) || (null === (l = s) || void 0 === l ? void 0 : l.message) || "\u83b7\u53d6\u8d2d\u4e70\u4eba\u5931\u8d25"),
                                    i.abrupt("return");
                                case 16:
                                    if (t && t.list) {
                                        i.next = 19;
                                        break
                                    }
                                    return e.$toast(s.msg || s.message || "\u83b7\u53d6\u8d2d\u4e70\u4eba\u5931\u8d25"),
                                    i.abrupt("return");
                                case 19:
                                    n.userinfodata = {
                                        list: (0,
                                        r.Z)((t.list || []).map((function(t) {
                                            return Ye(Ye({}, t), {}, {
                                                isBuyerInfoCompleted: !!e.checkIsBuyerInfoCompleted(t),
                                                isBuyerInfoVerified: 1 === t.verify_status,
                                                isBuyerValid: !t.disabledErr,
                                                isMaster: !!t.is_master
                                            })
                                        }
                                        ))),
                                        max_limit: t.max_limit
                                    },
                                    0 === e.selectBuyers.length ? (d = (n.userinfodata.list || []).find((function(t) {
                                        return !0 === t.isMaster
                                    }
                                    )),
                                    u = (n.userinfodata.list || []).find((function(t) {
                                        return 1 === t.is_default
                                    }
                                    )),
                                    p = d || u,
                                    p && p.isBuyerInfoCompleted && p.isBuyerInfoVerified && p.isBuyerValid && (e.selectBuyers = [p.id])) : e.selectBuyers = e.selectBuyers.filter((function(t) {
                                        return n.userinfodata.list.find((function(e) {
                                            return e.id === t && e.isBuyerInfoCompleted && e.isBuyerInfoVerified && e.isBuyerValid
                                        }
                                        ))
                                    }
                                    ));
                                case 21:
                                case "end":
                                    return i.stop()
                                }
                        }
                        ), i)
                    }
                    )))()
                },
                createOrder: (0,
                Te.Z)(function() {
                    var t = a()(regeneratorRuntime.mark((function t() {
                        var e, i, n, s, o, c, l, d, u, p, v, _, f, h, m, b, y, g, C, k, w = this, x = arguments;
                        return regeneratorRuntime.wrap((function(t) {
                            while (1)
                                switch (t.prev = t.next) {
                                case 0:
                                    if (e = x.length > 0 && void 0 !== x[0] ? x[0] : 0,
                                    i = x.length > 1 ? x[1] : void 0,
                                    n = i || this.createOrderClickEvent || {},
                                    s = n.clientX,
                                    o = n.clientY,
                                    !this.loading) {
                                        t.next = 5;
                                        break
                                    }
                                    return t.abrupt("return");
                                case 5:
                                    if (!this.isApp) {
                                        t.next = 17;
                                        break
                                    }
                                    return t.prev = 6,
                                    t.next = 9,
                                    (0,
                                    ke.Z)();
                                case 9:
                                    if (c = t.sent,
                                    !c) {
                                        t.next = 13;
                                        break
                                    }
                                    return this.$toast("\u5f53\u524d\u8d26\u53f7\u4e3a\u6e38\u5ba2\u8eab\u4efd\uff0c\u65e0\u6cd5\u8fdb\u884c\u5b9e\u7269\u8ba2\u5355\u8d2d\u4e70\uff0c\u8bf7\u9000\u51fa\u5f53\u524d\u6e38\u5ba2\u8d26\u53f7"),
                                    t.abrupt("return");
                                case 13:
                                    t.next = 17;
                                    break;
                                case 15:
                                    t.prev = 15,
                                    t.t0 = t["catch"](6);
                                case 17:
                                    if (l = this,
                                    !l.uncheckedTerms) {
                                        t.next = 21;
                                        break
                                    }
                                    return this.$toast("\u8bf7\u5148\u9605\u8bfb\u5e76\u540c\u610f\u8ba2\u7968\u670d\u52a1\u6761\u6b3e"),
                                    t.abrupt("return");
                                case 21:
                                    if (l.createStatusCount = 0,
                                    l.order_create_status = !0,
                                    l.orderObj.timestamp = (new Date).getTime(),
                                    this.confirm_voucher && (l.orderObj.voucher = this.confirm_voucher),
                                    this.confirm_voucher = "",
                                    l.lock_id && (l.orderObj.lock_id = l.lock_id),
                                    l.rebateInfo && l.rebateInfo.rebate_id && (l.orderObj.rebate_id = l.rebateInfo.rebate_id),
                                    l.detail.act && l.detail.act.act_id && (l.orderObj.act_id = l.detail.act.act_id),
                                    d = Ye(Ye(Ye({}, this.query.fromOuterLink ? this.query : {}), l.orderObj), {}, {
                                        again: e,
                                        token: l.token,
                                        deviceId: this.deviceId
                                    }),
                                    l.c_version && (d.version = l.c_version),
                                    this.isYearCardOn && (d = Ye(Ye({}, d), {
                                        coupon_code: "",
                                        pay_money: this.orderObj.pay_money,
                                        use_year_card: 1
                                    })),
                                    this.link_id && "number" === typeof this.link_id && this.link_id > 0 && (d = Ye(Ye({}, d), {}, {
                                        link_id: this.link_id
                                    })),
                                    this.isFreePass && (d = Ye(Ye({}, d), {
                                        coupon_code: "",
                                        freeCode: d.coupon_code
                                    })),
                                    !this.needBuyer) {
                                        t.next = 44;
                                        break
                                    }
                                    if (u = 1,
                                    1 === String(this.orderObj.sku_id || "").split(",").filter(Boolean).length && 2 === this.orderObj.id_bind && (u = this.orderObj.package_num || 1),
                                    p = 1 === this.orderObj.id_bind ? 1 : this.orderObj.count * u,
                                    !p || "number" !== typeof p || this.selectBuyers.length === p) {
                                        t.next = 41;
                                        break
                                    }
                                    return this.order_create_status = !1,
                                    t.abrupt("return", this.$toast("\u8bf7\u9009\u62e9 ".concat(p, " \u4f4d\u8d2d\u4e70\u4eba")));
                                case 41:
                                    v = (0,
                                    r.Z)(this.selectBuyers),
                                    _ = v.reverse().map((function(t) {
                                        var e = w.userinfodata.list.find((function(e) {
                                            return e.id === t
                                        }
                                        ));
                                        return {
                                            id: e.id,
                                            name: e.name,
                                            tel: e.tel,
                                            personal_id: e.personal_id,
                                            id_type: e.id_type
                                        }
                                    }
                                    )),
                                    d.buyer_info = JSON.stringify(_);
                                case 44:
                                    if (!this.orderObj.need_contact) {
                                        t.next = 50;
                                        break
                                    }
                                    if (f = this.$refs.newBuyerInfo,
                                    h = f.contactTel,
                                    m = f.contactName,
                                    h && m) {
                                        t.next = 48;
                                        break
                                    }
                                    return t.abrupt("return", this.showBuyerTips(!1));
                                case 48:
                                    d.buyer = m,
                                    d.tel = h;
                                case 50:
                                    if (b = _e.bX.get("ticket_agent"),
                                    b && (d.ticket_agent = b),
                                    s && o && (d.clickPosition = {
                                        x: s,
                                        y: o,
                                        origin: this.createdTime,
                                        now: Date.now()
                                    }),
                                    this.hotProject && (y = (0,
                                    ye.Z)(),
                                    d.ctoken = this.collection.encode(),
                                    d.ptoken = y.ptoken),
                                    this.detail.orderCreateUrl && (d.orderCreateUrl = this.detail.orderCreateUrl),
                                    this.query.oaccesskey && (d.oaccesskey = this.query.oaccesskey),
                                    (0,
                                    Ee.pI)(Ye({}, d)).then(function() {
                                        var t = a()(regeneratorRuntime.mark((function t(i) {
                                            var n, s, r, o;
                                            return regeneratorRuntime.wrap((function(t) {
                                                while (1)
                                                    switch (t.prev = t.next) {
                                                    case 0:
                                                        if (w.clearVoucher(),
                                                        !i) {
                                                            t.next = 29;
                                                            break
                                                        }
                                                        if (i.errno = "code"in i ? i.code : i.errno,
                                                        i.msg = i.message || i.msg,
                                                        0 !== i.errno) {
                                                            t.next = 8;
                                                            break
                                                        }
                                                        i.data.token ? (w.orderObj.need_contact && (n = w.$refs.newBuyerInfo,
                                                        s = n.contactTel,
                                                        r = n.contactName,
                                                        w.$refs.newBuyerInfo.contactCache({
                                                            contactName: r,
                                                            contactTel: s
                                                        })),
                                                        l.getCreatOrderStatus(i.data.token, i.data.orderId)) : (l.order_create_status = !1,
                                                        w.$toast("\u521b\u5efa\u8ba2\u5355\u5931\u8d25")),
                                                        t.next = 26;
                                                        break;
                                                    case 8:
                                                        if (100044 !== i.errno) {
                                                            t.next = 25;
                                                            break
                                                        }
                                                        return t.prev = 9,
                                                        l.order_create_status = !1,
                                                        t.next = 13,
                                                        l.initCaptcha({
                                                            project_id: l.orderObj.project_id,
                                                            screen_id: l.orderObj.screen_id
                                                        });
                                                    case 13:
                                                        return t.next = 15,
                                                        l.captchaVerifier.verifyCaptcha();
                                                    case 15:
                                                        o = t.sent,
                                                        o && (l.orderObj.voucher = o),
                                                        l.destroyCaptcha(),
                                                        l.createOrder(e),
                                                        t.next = 23;
                                                        break;
                                                    case 21:
                                                        t.prev = 21,
                                                        t.t0 = t["catch"](9);
                                                    case 23:
                                                        t.next = 26;
                                                        break;
                                                    case 25:
                                                        100002 === i.errno ? (l.order_create_status = !1,
                                                        w.$toast("\u8bf7\u6162\u4e00\u70b9")) : 100009 === i.errno ? (l.order_create_status = !1,
                                                        i.data.count > 0 && i.data.pay_money > 0 ? (l.someNomalTicketStatus = !0,
                                                        l.orderObj.count = i.data.count,
                                                        l.ticketNum = i.data.count,
                                                        l.orderObj.pay_money = i.data.pay_money) : !l.detail.ticket_info || l.detail.seats || 2 !== l.detail.ticket_type && 3 !== l.detail.ticket_type ? (l.projectOffLineStatus = !0,
                                                        l.dialogTipInfo = "5") : w.$toast("\u60a8\u9009\u4e2d\u7684\u7968\u5e93\u5b58\u4e0d\u8db3\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9")) : 100004 === i.errno ? (l.order_create_status = !1,
                                                        l.projectOffLineStatus = !0,
                                                        l.dialogTipInfo = "1") : 10005 === i.errno ? (l.order_create_status = !1,
                                                        l.projectOffLineStatus = !0,
                                                        l.dialogTipInfo = "2") : 100034 === i.errno ? (l.order_create_status = !1,
                                                        l.priceChange = !0,
                                                        l.priceChangePayMoney = (i.data.pay_money / 100).toFixed(2),
                                                        l.orderObj.pay_money = i.data.pay_money) : 101006 === i.errno ? (l.order_create_status = !1,
                                                        l.selectedStatus = !0) : 100024 === i.errno ? (l.orderId = i.data.orderId || i.data.order_id,
                                                        l.order_create_status = !1,
                                                        l.ptStatus = !0,
                                                        1 === i.data.status ? l.ptStatusNum = 1 : l.ptStatusNum = 2) : 212 === i.errno ? (l.order_create_status = !1,
                                                        l.projectOffLineStatus = !0,
                                                        l.dialogTipInfo = "4") : 216 === i.errno ? (l.order_create_status = !1,
                                                        l.projectOffLineStatus = !0,
                                                        l.dialogTipInfo = "3") : [100048, 100079].indexOf(i.errno) > -1 ? ((0,
                                                        S.Z)({
                                                            message: i.msg,
                                                            subMessage: "",
                                                            showConfirmButton: !0,
                                                            showCancelButton: 100079 !== i.errno && !l.detail.seats,
                                                            confirmButtonText: "\u53bb\u652f\u4ed8",
                                                            cancelButtonText: "\u518d\u4e0b\u4e00\u5355"
                                                        }).then((function() {
                                                            var t = (0,
                                                            xe["default"])("orderDetail", "order_id=".concat(i.data.orderId || i.data.order_id, "&noTitleBar=1"));
                                                            It().exec("openWindow", {
                                                                url: t
                                                            })
                                                        }
                                                        )).catch((function() {
                                                            l.createOrder(1)
                                                        }
                                                        )),
                                                        l.order_create_status = !1) : 100049 === i.errno || 100050 === i.errno || 100051 === i.errno ? (S.Z.alert(i.msg, {
                                                            confirmButtonText: "\u8fd4\u56de\u9879\u76ee\u8be6\u60c5\u9875"
                                                        }).then((function() {
                                                            -1 !== document.referrer.indexOf("ticket_checkSeat") || -1 !== document.referrer.indexOf("ticket_detail") ? It().exec("openWindow", {
                                                                url: w.getDetailUrl(),
                                                                newWebview: !1
                                                            }) : It().exec("openWindow", {
                                                                url: w.getDetailUrl()
                                                            })
                                                        }
                                                        )),
                                                        l.order_create_status = !1) : 100055 === i.errno && i.msg ? (S.Z.confirm(i.msg, {
                                                            confirmButtonText: "\u7ee7\u7eed\u4e0b\u5355",
                                                            cancelButtonText: "\u653e\u5f03\u4e0b\u5355"
                                                        }).then((function() {
                                                            delete l.orderObj.rebate_id,
                                                            l.orderObj.order_type = 1,
                                                            w.createOrder()
                                                        }
                                                        )).catch((function() {}
                                                        )),
                                                        l.order_create_status = !1) : 209001 === i.errno || 209002 === i.errno ? (ge.Z.addShowLog("mall.ticket-order.submit-order.0.show", w.$el, {
                                                            itemid: w.orderObj.project_id,
                                                            code: i.errno
                                                        }),
                                                        w.$toast(i.msg),
                                                        w.showBuyerTips()) : 207002 === i.errno ? S.Z.alert(i.msg, {
                                                            confirmButtonText: "\u6211\u77e5\u9053\u4e86"
                                                        }).then((function() {
                                                            l.order_create_status = !1
                                                        }
                                                        )).catch((function() {}
                                                        )) : (l.order_create_status = !1,
                                                        w.$toast(i.msg));
                                                    case 26:
                                                        if (0 !== i.errno)
                                                            try {
                                                                Ue().track.report("ticket-create-order-error", {
                                                                    errno: i.errno,
                                                                    params: d,
                                                                    result: i
                                                                })
                                                            } catch (ri) {
                                                                console.error(ri)
                                                            }
                                                        else
                                                            try {
                                                                Ue().track.report("ticket-create-order", {
                                                                    params: d,
                                                                    result: i
                                                                })
                                                            } catch (ri) {
                                                                console.error(ri)
                                                            }
                                                        t.next = 30;
                                                        break;
                                                    case 29:
                                                        l.order_create_status = !1;
                                                    case 30:
                                                    case "end":
                                                        return t.stop()
                                                    }
                                            }
                                            ), t, null, [[9, 21]])
                                        }
                                        )));
                                        return function(e) {
                                            return t.apply(this, arguments)
                                        }
                                    }()).catch((function(t) {
                                        l.order_create_status = !1,
                                        console.error(t),
                                        w.$toast("\u524d\u65b9\u62e5\u5835\uff0c\u8bf7\u91cd\u8bd5");
                                        try {
                                            Ue().track.report("ticket-create-order-error", {
                                                err: t && t.message
                                            })
                                        } catch (e) {
                                            console.error(e)
                                        }
                                    }
                                    )),
                                    l.errorstatus = !1,
                                    this.orderObj.need_contact) {
                                        g = this.$refs.newBuyerInfo,
                                        C = g.contactTel,
                                        k = g.contactName;
                                        try {
                                            (0,
                                            Ee.KS)({
                                                username: k,
                                                tel: C
                                            })
                                        } catch (ri) {
                                            console.error(ri)
                                        }
                                    }
                                case 59:
                                case "end":
                                    return t.stop()
                                }
                        }
                        ), t, this, [[6, 15]])
                    }
                    )));
                    function e() {
                        return t.apply(this, arguments)
                    }
                    return e
                }(), 600, !0),
                getCreatOrderStatus: function(t, e) {
                    var i = this;
                    return a()(regeneratorRuntime.mark((function n() {
                        var s, r, o, a, c, l, d, u, p;
                        return regeneratorRuntime.wrap((function(n) {
                            while (1)
                                switch (n.prev = n.next) {
                                case 0:
                                    return s = i,
                                    r = function() {
                                        if (s.createStatusCount++,
                                        s.createStatusCount > Qe)
                                            return s.order_create_status = !1,
                                            (0,
                                            S.Z)({
                                                message: "\u8ba2\u5355\u521b\u5efa\u6210\u529f\uff0c\u8bf7\u5c3d\u5feb\u53bb\u652f\u4ed8",
                                                subMessage: "",
                                                showConfirmButton: !0,
                                                showCancelButton: !1,
                                                confirmButtonText: "\u53bb\u652f\u4ed8"
                                            }).then((function() {
                                                B.ZP.toOrderDetail(e)
                                            }
                                            )).catch((function(t) {
                                                console.error(t)
                                            }
                                            )),
                                            void (s.createStatusCount = 0);
                                        if (s.createStatusCount <= 4) {
                                            var i = (-2 * Math.random() + 2).toFixed(2);
                                            setTimeout((function() {
                                                s.getCreatOrderStatus(t, e)
                                            }
                                            ), 1e3 * i)
                                        } else {
                                            var n = (-2 * Math.random() + 6).toFixed(2);
                                            setTimeout((function() {
                                                s.getCreatOrderStatus(t, e)
                                            }
                                            ), 1e3 * n)
                                        }
                                    }
                                    ,
                                    n.prev = 2,
                                    n.next = 5,
                                    (0,
                                    Ee.E_)({
                                        token: t,
                                        project_id: i.project_id,
                                        orderId: e
                                    });
                                case 5:
                                    if (o = n.sent,
                                    !o) {
                                        n.next = 69;
                                        break
                                    }
                                    if (100012 !== o.errno && 100001 !== o.errno) {
                                        n.next = 11;
                                        break
                                    }
                                    r(),
                                    n.next = 69;
                                    break;
                                case 11:
                                    if (0 !== o.errno) {
                                        n.next = 24;
                                        break
                                    }
                                    if (ge.Z.addClickLog({
                                        logger: 1
                                    }),
                                    s.orderId = o.data.order_id,
                                    a = o.data.payParam,
                                    s.order_create_status = !1,
                                    !It().UA.isMiniProgram) {
                                        n.next = 21;
                                        break
                                    }
                                    return i.order_create_status = !1,
                                    n.abrupt("return", Le({
                                        token: i.query.token,
                                        order_id: s.orderId || e,
                                        order_type: i.orderObj.order_type,
                                        ticketType: i.ticketType
                                    }));
                                case 21:
                                    a ? s.isNewPay ? s.newPayParam = a : i.toOldPay(a) : (0,
                                    Me.yS)({
                                        newWebview: !1
                                    });
                                case 22:
                                    n.next = 69;
                                    break;
                                case 24:
                                    if (100031 !== o.errno) {
                                        n.next = 31;
                                        break
                                    }
                                    s.order_create_status = !1,
                                    s.failSeats = o.data.fail,
                                    s.orderId = o.data.order_id,
                                    s.anyTicketStatus = !0,
                                    n.next = 69;
                                    break;
                                case 31:
                                    if (212 !== o.errno) {
                                        n.next = 37;
                                        break
                                    }
                                    s.order_create_status = !1,
                                    s.projectOffLineStatus = !0,
                                    s.dialogTipInfo = "4",
                                    n.next = 69;
                                    break;
                                case 37:
                                    if (216 !== o.errno) {
                                        n.next = 43;
                                        break
                                    }
                                    s.order_create_status = !1,
                                    s.projectOffLineStatus = !0,
                                    s.dialogTipInfo = "3",
                                    n.next = 69;
                                    break;
                                case 43:
                                    if (101006 !== o.errno) {
                                        n.next = 48;
                                        break
                                    }
                                    s.order_create_status = !1,
                                    s.selectedStatus = !0,
                                    n.next = 69;
                                    break;
                                case 48:
                                    if (100040 !== o.errno) {
                                        n.next = 68;
                                        break
                                    }
                                    if (s.order_create_status = !1,
                                    !o.data.return_url) {
                                        n.next = 65;
                                        break
                                    }
                                    if (c = o.data.return_url,
                                    !It().UA.isQQ) {
                                        n.next = 55;
                                        break
                                    }
                                    return It().exec("openWindow", {
                                        url: "".concat(o.data.return_url)
                                    }),
                                    n.abrupt("return");
                                case 55:
                                    l = c.split(/\?|#/)[0],
                                    d = "",
                                    u = "",
                                    c.indexOf("?") > -1 && c.indexOf("#") > -1 ? (u = c.split(/\?|#/)[1],
                                    d = c.split(/\?|#/)[2]) : c.indexOf("?") > -1 ? u = c.split(/\?|#/)[1] : c.indexOf("#") > -1 && (d = c.split(/\?|#/)[1]),
                                    p = "",
                                    p = u ? "".concat(l, "?").concat(u, "&noTitleBar=1") : "".concat(l, "?noTitleBar=1"),
                                    d && (p = "".concat(p, "#").concat(d)),
                                    It().exec("openWindow", {
                                        url: p
                                    }),
                                    n.next = 66;
                                    break;
                                case 65:
                                    (0,
                                    Me.yS)({
                                        newWebview: !1
                                    });
                                case 66:
                                    n.next = 69;
                                    break;
                                case 68:
                                    207002 === o.errno ? (s.order_create_status = !1,
                                    S.Z.alert(o.msg, {
                                        confirmButtonText: "\u6211\u77e5\u9053\u4e86"
                                    }).then((function() {}
                                    )).catch((function() {}
                                    ))) : (s.order_create_status = !1,
                                    i.$toast(o.msg));
                                case 69:
                                    n.next = 75;
                                    break;
                                case 71:
                                    n.prev = 71,
                                    n.t0 = n["catch"](2),
                                    r(),
                                    console.error(n.t0);
                                case 75:
                                case "end":
                                    return n.stop()
                                }
                        }
                        ), n, null, [[2, 71]])
                    }
                    )))()
                },
                priceChangePay: function() {
                    this.priceChange = !1,
                    this.createOrder()
                },
                priceChangeRefresh: function() {
                    this.priceChange = !1,
                    this.initConfirm()
                },
                showSumPriceInfo: function() {
                    this.isFreePass || (this.priceInfoVisible = !0,
                    0 === this.detail.couponList.length && (this.couponItem = {}))
                },
                showDiscountsInfo: function() {
                    this.isYearCardOn || this.isFreePass || (this.discountsVisible = !0)
                },
                continuePay: function() {
                    var t = this;
                    if (It().UA.isMiniProgram)
                        return this.anyTicketStatus = !1,
                        Le({
                            token: this.query.token,
                            order_id: this.orderId,
                            order_type: this.orderObj.order_type,
                            ticketType: this.ticketType
                        });
                    var e = this;
                    e.anyTicketStatus = !1,
                    (0,
                    Ee.YQ)({
                        order_id: e.orderId
                    }).then((function(e) {
                        if (e)
                            if (0 === e.errno) {
                                var i = e.data.payParam;
                                t.isNewPay ? t.newPayParam = i : t.toOldPay(i)
                            } else
                                t.$toast(e.msg)
                    }
                    ))
                },
                cancelPay: function() {
                    var t = this
                      , e = this;
                    e.anyTicketStatus = !1,
                    (0,
                    Ee.Cz)({
                        order_id: e.orderId
                    }).then((function(i) {
                        i && (0 === i.errno ? e.initConfirm() : t.$toast(i.msg))
                    }
                    ))
                },
                cancelOrder: function() {
                    this.selectedStatus = !1,
                    It().exec("goBack")
                },
                showOrderTerms: function() {
                    It().exec("openWindow", {
                        url: "https://www.bilibili.com/blackboard/activity-ZblKxcosG.html"
                    })
                },
                showHygTerms: function() {
                    It().exec("openWindow", {
                        url: "https://www.bilibili.com/blackboard/mall/activity-H5S3ihA9Z.html"
                    })
                },
                showCfTerms: function() {
                    this.cfTermsStatus = !0
                },
                retest: function() {
                    this.errorstatus = !1
                },
                updateBuyList: function() {
                    this.getBuyerInfo()
                },
                newPickUserInfo: function(t) {
                    this.selectBuyers = t
                },
                checkUserInfo: function() {
                    this.userInfoVisible = !this.userInfoVisible,
                    this.userInfoVisible ? we.Z.afterOpen() : we.Z.beforeClose()
                },
                checkIsBuyerInfoCompleted: function(t) {
                    for (var e = this.buyer_info.split(","), i = 0; i < e.length; i++)
                        switch (e[i]) {
                        case "1":
                            if (!t.tel)
                                return 0;
                            break;
                        case "2":
                            if (!t.personal_id)
                                return 0;
                            break;
                        default:
                            break
                        }
                    return e.length > 1 ? "4" : 1 === e.length ? e[0] : null
                },
                addAddress: function() {
                    It().exec("openWindow", {
                        url: "https://mall.bilibili.com/address.html?addressId=0&nohadbar=1&noTitleBar=1&returnUrl=".concat(encodeURIComponent("".concat(window.location.href)))
                    })
                },
                checkAddress: function() {
                    It().exec("openWindow", {
                        url: "https://mall.bilibili.com/addresslist.html?nohadbar=1&noTitleBar=1"
                    })
                },
                agreeTerms: function() {
                    this.uncheckedTerms = !this.uncheckedTerms,
                    window.localStorage.setItem(this.isTermsCheckedKey, JSON.stringify(!this.uncheckedTerms))
                },
                someNomalTicketPay: function() {
                    this.someNomalTicketStatus = !1,
                    this.createOrder()
                },
                someNomalTicketCancel: function() {
                    this.someNomalTicketStatus = !1,
                    this.initConfirm()
                },
                allNomalTicketCancel: function() {
                    this.projectOffLineStatus = !1,
                    "6" !== this.dialogTipInfo && this.initConfirm()
                },
                projectOffLineBtn: function() {
                    switch (this.projectOffLineStatus = !1,
                    this.dialogTipInfo) {
                    case "1":
                    case "6":
                        It().exec("openWindow", {
                            url: (0,
                            xe["default"])("home", "noTitleBar=1")
                        });
                        break;
                    case "2":
                    case "5":
                        It().exec("openWindow", {
                            url: this.getDetailUrl(this.orderObj.project_id),
                            newWebview: !1
                        });
                        break;
                    case "3":
                    case "4":
                        this.initConfirm(),
                        self.couponCode = "";
                        break
                    }
                },
                goPtDetail: function() {
                    this.ptStatus = !1,
                    It().exec("openWindow", {
                        url: (0,
                        xe["default"])("ptDetail", "order_id=".concat(this.orderId, "&noTitleBar=1"))
                    })
                },
                goPtPay: function() {
                    var t = this;
                    if (It().UA.isMiniProgram)
                        return this.ptStatus = !1,
                        Le({
                            token: this.query.token,
                            order_id: e.orderId,
                            order_type: this.orderObj.order_type,
                            ticketType: this.ticketType
                        });
                    this.ptStatus = !1;
                    var e = this;
                    (0,
                    Ee.aJ)({
                        order_id: e.orderId
                    }).then((function(e) {
                        if (e)
                            if (0 === e.errno) {
                                var i = e.data;
                                t.isNewPay ? t.newPayParam = i : t.toOldPay(i)
                            } else
                                t.$toast(e.msg)
                    }
                    ))
                },
                pickCoupon: function(t) {
                    var e = this.couponList;
                    if (t) {
                        for (var i = 0, n = e.length; i < n; i++)
                            if (t === e[i].code) {
                                var s = this.orderObj.pay_money;
                                return this.discountStatus = !0,
                                this.couponItem = e[i],
                                this.couponCode = e[i].code,
                                this.pay_money = e[i].pay_money,
                                this.orderObj.pay_money = this.pay_money,
                                this.orderObj.coupon_code = e[i].code,
                                void (s !== this.orderObj.pay_money && this.isNewPay && this.changeChannel(this.orderObj.pay_money))
                            }
                    } else {
                        this.discountStatus = !1,
                        this.couponItem = {},
                        this.couponCode = e[0].code;
                        var r = this.orderObj.pay_money;
                        this.pay_money = this.detail.pay_money,
                        this.orderObj.pay_money = this.pay_money,
                        r !== this.orderObj.pay_money && this.isNewPay && this.changeChannel(this.orderObj.pay_money),
                        this.orderObj.coupon_code = ""
                    }
                },
                changeChannel: function(t) {
                    var e = this;
                    return this.firstEnter ? (this.firstEnter = !1,
                    !1) : 0 !== +t && void (0,
                    Ee.yF)({
                        money: t,
                        token: this.token
                    }).then((function(t) {
                        if (0 === t.errno) {
                            var i = t.data || {};
                            e.channelParams = i.pay_channel_list || {},
                            e.c_version = i.create_version ? i.create_version : ""
                        } else
                            e.$toast(t.msg)
                    }
                    ))
                },
                clearVoucher: function() {
                    this.orderObj.voucher && delete this.orderObj.voucher
                },
                getPayResult: function(t) {
                    var e = this.orderId
                      , i = +this.orderObj.order_type || 1
                      , n = +this.ticketType
                      , s = t.code;
                    (0,
                    Me.iL)({
                        code: s,
                        orderId: e,
                        orderType: i,
                        ticketType: n
                    })
                },
                editBuyerInfo: function(t) {
                    var e = "noTitleBar=1&type=edit&".concat(xe["default"].obj2Query({
                        project_id: this.project_id,
                        screen_id: this.screen_id,
                        order_id: this.order_id,
                        group_id: this.group_id,
                        buyer_info: this.buyer_info,
                        token: this.token,
                        buyerid: t
                    }));
                    It().exec("openWindow", {
                        url: (0,
                        xe["default"])("buyer", e)
                    })
                },
                addBuyerInfo: function() {
                    if (this.userinfodata.list.length < this.userinfodata.max_limit) {
                        var t = "noTitleBar=1&type=add&".concat(xe["default"].obj2Query({
                            project_id: this.project_id,
                            screen_id: this.screen_id,
                            order_id: this.order_id,
                            group_id: this.group_id,
                            buyer_info: this.buyer_info,
                            token: this.token
                        }));
                        It().exec("openWindow", {
                            url: (0,
                            xe["default"])("buyer", t)
                        })
                    } else
                        this.$toast("\u6700\u591a\u6dfb\u52a0".concat(this.userinfodata.max_limit, "\u4e2a\u4eba\u4fe1\u606f"))
                },
                updateBuyerInfo: function() {
                    var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                    !t && this.getBuyerInfo()
                },
                toOldPay: function() {
                    var t = this
                      , e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    It().exec("toPay", e).then((function(e) {
                        t.getPayResult(e)
                    }
                    )).catch((function(e) {
                        e.message && t.$toast(e.message)
                    }
                    ))
                },
                showBuyerTips: function() {
                    var t = this
                      , e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                    this.tipBuyer = !0,
                    this.order_create_status = !1,
                    setTimeout((function() {
                        t.tipBuyer = !1,
                        e && t.initConfirm()
                    }
                    ), 2e3)
                },
                checkStock: function() {
                    var t = this
                      , e = function() {
                        var i = a()(regeneratorRuntime.mark((function i() {
                            var n, s, r, o, a;
                            return regeneratorRuntime.wrap((function(i) {
                                while (1)
                                    switch (i.prev = i.next) {
                                    case 0:
                                        if (i.prev = 0,
                                        i.t0 = t.project_id && t.orderObj.sku_id,
                                        !i.t0) {
                                            i.next = 6;
                                            break
                                        }
                                        return i.next = 5,
                                        (0,
                                        Ee.nr)({
                                            projectId: t.project_id,
                                            skuId: t.orderObj.sku_id,
                                            screenId: t.orderObj.screen_id
                                        });
                                    case 5:
                                        i.t0 = i.sent;
                                    case 6:
                                        n = i.t0,
                                        n && 0 === n.errno ? (window.ticketHasStock = "boolean" !== typeof (null === (s = n.data) || void 0 === s ? void 0 : s.hasStock) || n.data.hasStock,
                                        window.ticketUnpaidOrderId = (null === (r = n.data) || void 0 === r ? void 0 : r.unpaidOrderId) || null,
                                        window.ticketStockStatus = (null === (o = n.data) || void 0 === o ? void 0 : o.stockStatus) || We.D.HAS_STOCK) : (window.ticketHasStock = !0,
                                        window.ticketUnpaidOrderId = null,
                                        window.ticketStockStatus = We.D.HAS_STOCK),
                                        i.next = 15;
                                        break;
                                    case 10:
                                        i.prev = 10,
                                        i.t1 = i["catch"](0),
                                        window.ticketHasStock = !0,
                                        window.ticketUnpaidOrderId = null,
                                        window.ticketStockStatus = We.D.HAS_STOCK;
                                    case 15:
                                        a = Math.floor(2e3 * Math.random()) + 1e3,
                                        setTimeout((function() {
                                            e()
                                        }
                                        ), a);
                                    case 17:
                                    case "end":
                                        return i.stop()
                                    }
                            }
                            ), i, null, [[0, 10]])
                        }
                        )));
                        return function() {
                            return i.apply(this, arguments)
                        }
                    }();
                    e()
                },
                interceptBackAction: function() {
                    this.isHeaderShow || It().UA.isBiliApp && It().UA.isAndroid && (window.onWebViewBack = function() {
                        Ze().call({
                            method: "kfc.system.interceptBackActionEnable",
                            options: {
                                enable: 0
                            }
                        }),
                        It().exec("goBack")
                    }
                    ,
                    Ze().call({
                        method: "kfc.system.interceptBackActionEnable",
                        options: {
                            enable: 1
                        }
                    }))
                }
            }
        }
          , ii = ei
          , ni = (0,
        k.Z)(ii, n, s, !1, null, null, null)
          , si = ni.exports
    },
    66112: function(t) {
        t.exports = "https://i0.hdslb.com/bfs/static/neul-project-ticket/h5/c2ece7cb40f5d29340c8c63db27ed2fbe38e1d40/assets/iOS@3x.bbbf9492.png"
    },
    1759: function(t) {
        t.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAMAAAArteDzAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABmUExURUdwTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkJCQAAAAAAAAoKCv///+zs7AAAAPf398/Pz/v7+/Hx8VRUVJCQkM3Nzfr6+ubm5vHx8a6urqGhoVVVVd3d3e3t7f///96eWiIAAAAhdFJOUwAODB8JBhQBAgQmGy4XNPqwK8tS8dA+KI/kfr5jahiLgvb5r/8AAAMESURBVHja7dnJdqMwEAXQlumo24xCjMZDov//ySgViQILRajo09nkrXKyuOeVIJiUf/3kJ/782cg/AP8+5Qi8AM+LLGASOYMvqxgYWAoJ4O+nAIxsDIniSYfNOZ3Ahb7ARpFWZI/mTchLW1XtRYq35sEYuMjGmCAOk6zUKpWcBu0Cu1Ndk80VxaV7bdhpye4x9eRASuWNBBbVgGlqskGoLyMGcwaghk2o2apAWiiLashkbFI7MjGGatB8CLUr4hFS0Ryk2hk5oPq1+UAzrC66eoYHkwsVEcFB3T4ANCcVlQlUqOo3GxWZBlUfOrSxaDvMB+AxC6GiIwqnqkXPZxyecgDns0HdopKCSqwaUZRU1RTlxZWGXgtuqq6nh6JDRUOrAarC/IiaopMiZjJVDYrTM15IKioLzuBeRdRMX2QVFa2ywsyPqJm+UeQ0dv71kTKevdLR14wzPFRAzfSCjgqYf0bxSBNJR2WCh7o60uRCRy+JOVQHbelou4kyjVZ0tNIo20CzY2jmQY+M70MPXSgfeuiW8qJHbn4veuTP1IMWyY2O3swt5d78Pf3R13v/otKOinapRZ0HSjpS0TG1DxTn0QfzE6d3Hn3z5U+pH9Fpgg9p51BvxGvvHCkeqq7aES/T1gcfzA9VqUXdj2icv6a8StY4/RKF+eFS9fEvvT1cJnztwflt1fQWP7wtaqfH+W3Veowzx9oWNdO7L71azUWMKXJtbr30YlU4gLLbb3YlDI9FfVXrvttt9rVT1KeWYufs5Wy+oOmiHNR83GOOOZgciwbUe3iJcPeZiD6rfWjd0aOJ//BuVUU1zct75ye7e5mnaGLRgFpr1rdC0mQdNAFdqx9l87Ifu+pJ7Ma+zD9qghmxRGGFKZuXZXkfRfe5luvEeNe/yE3Ngq3MkGrLWheTw+C2Jpr7ll3Afroatqm1aEln2bVnLcd5YVyMEQuONcGMWCACq91lsplEM3LVCa5OBtE/gOisOqOXshrGaJCwlCWsj79h0U1YyX/7lwfhrzn++xcy78k/pVSq1ad0AAAAAElFTkSuQmCC"
    }
}]);
//# sourceMappingURL=http://boss.bilibili.co/mall_sourcemap/static/neul-project-ticket/h5/c2ece7cb40f5d29340c8c63db27ed2fbe38e1d40/7449.js.map
