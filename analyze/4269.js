"use strict";
(self["webpackChunkneul_project_ticket"] = self["webpackChunkneul_project_ticket"] || []).push([[4269, 1e3], {
    51e3: function(e, t, n) {
        n.d(t, {
            Cx: function() {
                return f
            },
            En: function() {
                return w
            },
            GO: function() {
                return p
            },
            J9: function() {
                return v
            },
            PU: function() {
                return l
            },
            Rq: function() {
                return m
            },
            TQ: function() {
                return k
            },
            qu: function() {
                return h
            }
        });
        var r = n(72505)
          , c = n(10271)
          , a = n.n(c)
          , i = n(52053)
          , o = (0,
        i.Z)()
          , u = function() {
            var e = document.createElement("style");
            e.type = "text/css",
            e.appendChild(document.createTextNode(":root {\n    --safe-area-inset-top: env(safe-area-inset-top);\n    --safe-area-inset-right: env(safe-area-inset-right);\n    --safe-area-inset-bottom: env(safe-area-inset-bottom);\n    --safe-area-inset-left: env(safe-area-inset-left);\n}")),
            document.head.appendChild(e)
        };
        try {
            if (u(),
            "1" === o.halfScreen)
                ;
            else {
                var s = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--safe-area-inset-top"), 10);
                s > 0 && document.documentElement.classList.add("is-iphone-with-notch")
            }
        } catch (g) {}
        var d = function() {
            return 375 === window.innerWidth && 812 === screen.availHeight || 414 === window.innerWidth && 896 === screen.availHeight || 375 === window.innerWidth && 812 === screen.availHeight || 390 === window.innerWidth && 844 === screen.availHeight || 428 === window.innerWidth && 926 === screen.availHeight || 393 === window.innerWidth && 852 === screen.availHeight || 430 === window.innerWidth && 932 === screen.availHeight || 402 === window.innerWidth && 874 === screen.availHeight || 440 === window.innerWidth && 956 === screen.availHeight
        }()
          , f = function() {
            if (!a().UA.isBiliApp || "1" === o.halfScreen)
                return (0,
                r.U4)(44);
            var e = 3 === window.devicePixelRatio || 2 === window.devicePixelRatio
              , t = e && d;
            if (t)
                return (0,
                r.U4)(88);
            var n = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--safe-area-inset-top"), 10) || 0;
            return n > 0 ? n + (0,
            r.U4)(44) : (0,
            r.U4)(64)
        }()
          , p = function() {
            return "1" !== o.halfScreen && d
        }()
          , h = function() {
            var e = navigator.userAgent;
            return a().UA.isMissEvan || "1" === o.halfScreen ? 0 : /\sNotchHeight=(\d+)/.test(e) ? parseInt(e.match(/\sNotchHeight=(\d+)/)[1], 0) : 0
        }()
          , l = function() {
            return p ? (0,
            r.U4)(44) : 0
        }()
          , k = function() {
            return h > 0 ? "".concat(h, "px") : ""
        }()
          , w = function() {
            return h > 0 ? "".concat(h + 44, "px") : ""
        }()
          , m = function() {
            return 812 === window.innerHeight && 375 === window.innerWidth && 3 === window.devicePixelRatio || 896 === window.innerHeight && 414 === window.innerWidth && (2 === window.devicePixelRatio || 3 === window.devicePixelRatio)
        }
          , v = function() {
            return a().UA.isWechat || a().UA.isWechatWork || a().UA.isMissEvan ? 0 : h > 0 ? h + (0,
            r.U4)(44) : f
        }()
    },
    72505: function(e, t, n) {
        n.d(t, {
            U4: function() {
                return i
            },
            n6: function() {
                return c
            }
        });
        var r = 18.75
          , c = 375
          , a = document.documentElement.clientWidth > 30 * r ? 30 * r : document.documentElement.clientWidth
          , i = function(e) {
            return e / c * a
        }
    },
    69883: function(e, t, n) {
        n.d(t, {
            D: function() {
                return r
            }
        });
        var r = {
            TEMP_SOLD_OUT: 1,
            SOLD_OUT: 2,
            HAS_STOCK: 3
        }
    },
    51486: function(e, t, n) {
        n.d(t, {
            E_: function() {
                return _
            },
            gY: function() {
                return B
            },
            yF: function() {
                return H
            },
            vA: function() {
                return U
            },
            aJ: function() {
                return A
            },
            nr: function() {
                return E
            },
            Cz: function() {
                return T
            },
            pI: function() {
                return W
            },
            YQ: function() {
                return j
            },
            KS: function() {
                return I
            }
        });
        var r = n(66970)
          , c = n.n(r)
          , a = n(36697)
          , i = n.n(a)
          , o = n(4115)
          , u = n.n(o)
          , s = n(10271)
          , d = n.n(s)
          , f = n(4827)
          , p = n.n(f)
          , h = n(26672)
          , l = n(91852)
          , k = n(52053)
          , w = n(73545)
          , m = n(54717)
          , v = function() {
            var e = i()(regeneratorRuntime.mark((function e() {
                var t;
                return regeneratorRuntime.wrap((function(e) {
                    while (1)
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            w.Z.alert("\u8be5\u7968\u4ef7\u5df2\u5168\u90e8\u552e\u7f44\uff0c\u8fd4\u56de\u91cd\u65b0\u9009\u8d2d", {
                                confirmButtonText: "\u8fd4\u56de\u9879\u76ee\u8be6\u60c5\u9875",
                                showCancelButton: !1
                            }).then((function() {
                                return localStorage.setItem("ticketPageFrom", "orderback"),
                                d().exec("goBack"),
                                !1
                            }
                            )).catch((function() {
                                return !0
                            }
                            ));
                        case 2:
                            return t = e.sent,
                            e.abrupt("return", t);
                        case 4:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function() {
                return e.apply(this, arguments)
            }
        }()
          , g = function() {
            var e = i()(regeneratorRuntime.mark((function e(t) {
                var n, r, c, a;
                return regeneratorRuntime.wrap((function(e) {
                    while (1)
                        switch (e.prev = e.next) {
                        case 0:
                            return n = t.idBind,
                            r = t.unpaidOrderId,
                            c = 0 === n,
                            e.next = 4,
                            (0,
                            w.Z)({
                                message: "\u6709\u5c1a\u672a\u5b8c\u6210\u8ba2\u5355\uff0c\u70b9\u51fb\u67e5\u770b",
                                subMessage: "",
                                showConfirmButton: !0,
                                showCancelButton: c,
                                confirmButtonText: "\u53bb\u652f\u4ed8",
                                cancelButtonText: "\u518d\u4e0b\u4e00\u5355"
                            }).then((function() {
                                var e = (0,
                                m["default"])("orderDetail", "order_id=".concat(r, "&noTitleBar=1"));
                                return d().exec("openWindow", {
                                    url: e
                                }),
                                !1
                            }
                            )).catch((function(e) {
                                return !0
                            }
                            ));
                        case 4:
                            return a = e.sent,
                            e.abrupt("return", a);
                        case 6:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function(t) {
                return e.apply(this, arguments)
            }
        }()
          , b = n(69883);
        function x(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, r)
            }
            return n
        }
        function y(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? x(Object(n), !0).forEach((function(t) {
                    u()(e, t, n[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : x(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }
                ))
            }
            return e
        }
        var O = "".concat(window.location.protocol).concat("//show.bilibili.com")
          , S = (0,
        k.Z)();
        function C(e) {
            return S.oaccesskey ? e.indexOf("?") > -1 ? "".concat(e, "&oaccesskey=").concat(S.oaccesskey) : "".concat(e, "?oaccesskey=").concat(S.oaccesskey) : e
        }
        var _ = function(e) {
            return d().exec("fetch", {
                methods: "get",
                url: C("".concat(O, "/api/ticket/order/createstatus")),
                params: e
            })
        }
          , H = function(e) {
            return d().exec("fetch", {
                methods: "get",
                url: C("".concat(O, "/api/ticket/order/payChannelList")),
                params: e
            })
        }
          , U = function(e) {
            return d().exec("fetch", {
                methods: "get",
                url: C("".concat(O, "/api/ticket/order/confirmInfo")),
                params: y(y({}, e), {}, {
                    requestSource: "neul-next"
                })
            })
        }
          , B = function(e) {
            return d().exec("fetch", {
                methods: "get",
                url: C("".concat(O, "/api/ticket/addr/list")),
                params: e
            }).then((function(e) {
                return h.Z.capture(e)
            }
            )).catch((function(e) {
                return h.Z.capture(e)
            }
            ))
        }
          , P = 200
          , R = 0
          , W = function e(t) {
            var n = R < P
              , r = function() {
                var n = i()(regeneratorRuntime.mark((function n() {
                    return regeneratorRuntime.wrap((function(n) {
                        while (1)
                            switch (n.prev = n.next) {
                            case 0:
                                return R++,
                                n.abrupt("return", e(t));
                            case 2:
                            case "end":
                                return n.stop()
                            }
                    }
                    ), n)
                }
                )));
                return function() {
                    return n.apply(this, arguments)
                }
            }()
              , a = function() {
                return "boolean" === typeof window.ticketHasStock ? {
                    hasStock: window.ticketHasStock,
                    stockStatus: window.ticketStockStatus
                } : {
                    hasStock: !0,
                    stockStatus: b.D.HAS_STOCK
                }
            }
              , o = function() {
                var n = i()(regeneratorRuntime.mark((function n() {
                    var r, i, o, u, s, d, f, p, h;
                    return regeneratorRuntime.wrap((function(n) {
                        while (1)
                            switch (n.prev = n.next) {
                            case 0:
                                if (r = a(),
                                i = r.stockStatus,
                                o = ["string", "number"].includes(c()(window.ticketUnpaidOrderId)) ? window.ticketUnpaidOrderId : "",
                                u = "\u6682\u65f6\u552e\u7f44\uff0c\u5efa\u8bae\u91cd\u65b0\u9009\u8d2d",
                                !o) {
                                    n.next = 28;
                                    break
                                }
                                return s = t.idBind || 0,
                                n.next = 7,
                                g({
                                    idBind: s,
                                    unpaidOrderId: o
                                });
                            case 7:
                                if (d = n.sent,
                                !d) {
                                    n.next = 25;
                                    break
                                }
                                if (f = a(),
                                p = f.stockStatus,
                                h = f.hasStock,
                                !h) {
                                    n.next = 15;
                                    break
                                }
                                return t.again = 1,
                                n.abrupt("return", e(t));
                            case 15:
                                if (p !== b.D.TEMP_SOLD_OUT) {
                                    n.next = 19;
                                    break
                                }
                                n.t0 = (0,
                                l.Z)(u),
                                n.next = 22;
                                break;
                            case 19:
                                return n.next = 21,
                                v();
                            case 21:
                                n.t0 = n.sent;
                            case 22:
                                return n.abrupt("return", n.t0);
                            case 23:
                                n.next = 26;
                                break;
                            case 25:
                                return n.abrupt("return");
                            case 26:
                                n.next = 36;
                                break;
                            case 28:
                                if (i !== b.D.TEMP_SOLD_OUT) {
                                    n.next = 32;
                                    break
                                }
                                n.t1 = (0,
                                l.Z)(u),
                                n.next = 35;
                                break;
                            case 32:
                                return n.next = 34,
                                v();
                            case 34:
                                n.t1 = n.sent;
                            case 35:
                                return n.abrupt("return", n.t1);
                            case 36:
                            case "end":
                                return n.stop()
                            }
                    }
                    ), n)
                }
                )));
                return function() {
                    return n.apply(this, arguments)
                }
            }()
              , u = function() {
                var e = i()(regeneratorRuntime.mark((function e(t) {
                    var c, i, u, s, d, f, p, l, k, w;
                    return regeneratorRuntime.wrap((function(e) {
                        while (1)
                            switch (e.prev = e.next) {
                            case 0:
                                if (e.prev = 0,
                                c = t || {},
                                i = c.status,
                                u = c.response,
                                s = void 0 === u ? {} : u,
                                d = i || s.status,
                                f = s.data || t,
                                p = a(),
                                l = p.hasStock,
                                k = [429, 504].indexOf(d) > -1 || [100001, 900001, 900002].indexOf((null === f || void 0 === f ? void 0 : f.code) || (null === f || void 0 === f ? void 0 : f.errno)) > -1,
                                !k || l) {
                                    e.next = 10;
                                    break
                                }
                                return e.next = 9,
                                o();
                            case 9:
                                return e.abrupt("return", e.sent);
                            case 10:
                                e.next = 15;
                                break;
                            case 12:
                                e.prev = 12,
                                e.t0 = e["catch"](0),
                                console.error("resHandler error", e.t0);
                            case 15:
                                if (w = h.Z.capture(t, {
                                    handleRefresh: n,
                                    showClose: !0
                                }),
                                !(w instanceof Promise)) {
                                    e.next = 20;
                                    break
                                }
                                return e.abrupt("return", w.catch((function(e) {
                                    if ("close" === e)
                                        return "skip";
                                    throw e
                                }
                                )).then((function(e) {
                                    return "skip" !== e && r()
                                }
                                )));
                            case 20:
                                return e.abrupt("return", w);
                            case 21:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e, null, [[0, 12]])
                }
                )));
                return function(t) {
                    return e.apply(this, arguments)
                }
            }()
              , s = "".concat(O, "/api/ticket/order/createV2?project_id=").concat(t.project_id);
            return t.orderCreateUrl && (s = "".concat(t.orderCreateUrl).concat(t.orderCreateUrl.includes("?") ? "&" : "?", "project_id=").concat(t.project_id)),
            t.ptoken && (s += "&ptoken=".concat(t.ptoken)),
            p().request({
                method: "post",
                url: C(s),
                data: y(y({}, t), {}, {
                    requestSource: "neul-next",
                    newRisk: !0
                }),
                enableRisk: !0
            }).catch((function(e) {
                if (e.response && e.response.data)
                    return e.response.data;
                throw e
            }
            )).then(u).catch(u)
        }
          , j = function(e) {
            return d().exec("fetch", {
                methods: "post",
                url: C("".concat(O, "/api/ticket/order/display")),
                params: e
            })
        }
          , T = function(e) {
            return d().exec("fetch", {
                methods: "get",
                url: C("".concat(O, "/api/ticket/order/cancel")),
                params: e
            })
        }
          , A = function(e) {
            return d().exec("fetch", {
                methods: "get",
                url: C("".concat(O, "/api/ticket/order/getPayParam")),
                params: e
            })
        }
          , I = function(e) {
            return d().exec("fetch", {
                methods: "post",
                url: C("".concat(O, "/api/ticket/buyer/saveContactInfo")),
                params: {
                    username: e.username,
                    tel: e.tel
                }
            })
        }
          , E = function(e) {
            return d().exec("fetch", {
                methods: "post",
                url: C("".concat(O, "/api/ticket/stock/check")),
                params: {
                    projectId: e.projectId,
                    skuId: e.skuId,
                    screenId: e.screenId
                }
            })
        }
    },
    61025: function(e, t, n) {
        n.d(t, {
            Z: function() {
                return m
            }
        });
        var r = function() {
            var e = this
              , t = e._self._c;
            return e.isMobileApp ? e._e() : t("div", {
                staticClass: "top-box"
            }, [t("div", {
                staticClass: "top-space"
            }), e.isHideNavigation && e.hasNotch ? t("div", {
                staticClass: "top-space-newapp no-bg-color",
                style: {
                    height: e.notchHeightValue
                }
            }) : e._e(), t("div", {
                staticClass: "header"
            }, [e.isHideNavigation && e.hasNotch ? t("div", {
                staticClass: "top-space-newapp",
                style: {
                    height: e.notchHeightValue
                }
            }) : e._e(), e.useBack ? t("div", {
                staticClass: "header-back",
                on: {
                    click: function(t) {
                        return e.goBack()
                    }
                }
            }) : e._e(), t("h1", [e._v(e._s(e.title))]), e.useRightTag ? t("div", {
                staticClass: "right-tag"
            }, [e._t("right")], 2) : e._e()])])
        }
          , c = []
          , a = n(52053)
          , i = n(10259)
          , o = n(51e3)
          , u = n(10271)
          , s = n.n(u)
          , d = n(4827)
          , f = n.n(d)
          , p = (0,
        a.Z)()
          , h = {
            name: "b-header",
            data: function() {
                return this.notchHeightValue = o.TQ,
                {
                    isNewApp: !1,
                    isHideNavigation: !1,
                    query: (0,
                    a.Z)()
                }
            },
            props: {
                useBack: {
                    type: Boolean,
                    default: !0
                },
                title: {
                    type: String,
                    default: ""
                },
                hasReturnCallBack: {
                    type: Boolean,
                    default: !1
                },
                useRightTag: {
                    type: Boolean,
                    default: !1
                },
                useCenterTab: {
                    type: Boolean,
                    default: !1
                },
                backClick: {
                    type: Function,
                    default: null
                }
            },
            computed: {
                isMobileApp: function() {
                    var e = navigator.userAgent.toLowerCase();
                    return !!(s().UA.isWechat || s().UA.isWechatWork || -1 !== e.indexOf("weibo") || s().UA.isMissEvan)
                },
                hasNotch: function() {
                    return 1 !== Number(this.query.halfScreen)
                }
            },
            created: function() {
                s().isSupport("hideNavigation", this, "isHideNavigation").then((function() {
                    s().hideNavigation({
                        hidden: !0
                    })
                }
                )).catch((function() {}
                )),
                p.from && (0,
                i.ix)("from=".concat(p.from)),
                p.msource && (0,
                i.ix)("msource=".concat(p.msource))
            },
            mounted: function() {},
            methods: {
                goBack: function() {
                    return this.backClick && "function" === typeof backClick ? this.backClick() : "1" === p.halfScreen ? f().goBack() : s().exec("goBack")
                }
            }
        }
          , l = h
          , k = n(51900)
          , w = (0,
        k.Z)(l, r, c, !1, null, "6cc0389a", null)
          , m = w.exports
    }
}]);
//# sourceMappingURL=http://boss.bilibili.co/mall_sourcemap/static/neul-project-ticket/h5/c2ece7cb40f5d29340c8c63db27ed2fbe38e1d40/4269.js.map
