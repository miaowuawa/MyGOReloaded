"use strict";
(self["webpackChunkneul_project_ticket"] = self["webpackChunkneul_project_ticket"] || []).push([[8258], {
    11876: function(t, e, i) {
        i.d(e, {
            Z: function() {
                return y
            }
        });
        var n, s = i(47969), r = i.n(s), o = function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.visible,
                    expression: "visible"
                }],
                class: {
                    "no-background": !t.message
                },
                attrs: {
                    id: "bili-loading-container"
                }
            }, [e("div", {
                staticClass: "bili-loading-content",
                style: t.style,
                domProps: {
                    innerHTML: t._s(t.message)
                }
            })])
        }, a = [], l = {
            data: function() {
                return {
                    message: "",
                    visible: !1,
                    style: {}
                }
            }
        }, c = l, u = i(51900), d = (0,
        u.Z)(c, o, a, !1, null, "2158a2c4", null), h = d.exports, f = r().extend(h), p = function() {
            n = new f({
                el: document.createElement("div")
            })
        }, v = function t(e) {
            if (n || p(),
            n.visible)
                n.visible = !1,
                t(e);
            else {
                for (var i in e)
                    e.hasOwnProperty(i) && (n[i] = e[i]);
                document.body.appendChild(n.$el),
                r().nextTick((function() {
                    n.visible = !0
                }
                ))
            }
        }, m = function() {
            n && (n.visible = !1)
        }, y = {
            show: v,
            hide: m
        }
    },
    26672: function(t, e, i) {
        i.d(e, {
            Z: function() {
                return D
            }
        });
        var n = i(4115)
          , s = i.n(n)
          , r = i(47969)
          , o = i.n(r)
          , a = function() {
            var t = this
              , e = t._self._c;
            return e("transition", {
                attrs: {
                    name: "bili-msg-box"
                }
            }, [e("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.visible,
                    expression: "visible"
                }],
                attrs: {
                    id: "bili-request-limit"
                },
                on: {
                    touchmove: t.touchMove
                }
            }, [e("div", {
                staticClass: "bili-request-limit-bg",
                style: {
                    backgroundColor: t.showMask ? "rgba(0, 0, 0, 0.8)" : ""
                }
            }), e("div", {
                staticClass: "back",
                style: {
                    "padding-top": "".concat(t.topOffset, "px")
                }
            }, [e("i", {
                staticClass: "header-icon-back",
                class: ["bili-icon-back"],
                attrs: {
                    slot: "left"
                },
                on: {
                    click: t.handleGoBack
                },
                slot: "left"
            })]), e("div", {
                staticClass: "bili-request-limit-wrapper"
            }, [e("div", {
                staticClass: "bili-request-limit-container",
                on: {
                    click: function(t) {
                        t.stopPropagation()
                    }
                }
            }, [e("div", {
                staticClass: "animation-wrapper"
            }, [e("div", {
                staticClass: "img"
            })]), e("div", {
                staticClass: "limit-text"
            }, [t._v(t._s(t.retryText) + t._s(t.suffix || ""))]), t.showLoading ? e("div", {
                staticClass: "loading"
            }, [e("div", {
                staticClass: "loading-icon"
            })]) : e("BiliButton", {
                staticClass: "retry-btn",
                attrs: {
                    type: "primary",
                    buttonRole: !0
                },
                on: {
                    click: t.retry
                }
            }, [t._v("\u518d\u8bd5\u4e00\u6b21")]), t.showClose ? e("SVGIconNext", {
                staticClass: "close-btn",
                attrs: {
                    icon: "BDC/xmark_close_line/1",
                    size: "20",
                    axes: {
                        stroke: 1.25
                    }
                },
                nativeOn: {
                    click: function(e) {
                        return e.stopPropagation(),
                        t.close(!0)
                    }
                }
            }) : t._e()], 1)])])])
        }
          , l = []
          , c = i(10271)
          , u = i.n(c)
          , d = i(11341)
          , h = i.n(d)
          , f = i(41677)
          , p = i(51e3)
          , v = i(72505);
        function m(t, e) {
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
        function y(t) {
            for (var e = 1; e < arguments.length; e++) {
                var i = null != arguments[e] ? arguments[e] : {};
                e % 2 ? m(Object(i), !0).forEach((function(e) {
                    s()(t, e, i[e])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : m(Object(i)).forEach((function(e) {
                    Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
                }
                ))
            }
            return t
        }
        var b = ["\u524d\u65b9\u62e5\u6324\uff0c\u8bf7\u7a0d\u7b49\u518d\u8bd5\u8bd5", "\u5f53\u524d\u4e0b\u5355\u4eba\u6570\u592a\u591a\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5"]
          , g = {
            visible: !1,
            retryTime: 600,
            canRetry: !1,
            retryText: b[0],
            resolve: null,
            reject: null,
            preRetryTimer: null,
            handleRefresh: !1,
            currentFrame: 0,
            showMask: !1,
            autoClose: !0,
            showLoading: !1,
            showClose: !1,
            suffix: ""
        }
          , w = {
            name: "BiliRequestLimit",
            data: function() {
                return y(y({}, g), {}, {
                    notchHeight: p.qu,
                    showLoading: !0
                })
            },
            components: {
                BiliButton: f.Z,
                SVGIconNext: h().SVGIconNext
            },
            created: function() {
                ["//i0.hdslb.com/bfs/davinci-platform/img/190dac1831936fb2a2b0aca5b0362794914b8749.png", "//i0.hdslb.com/bfs/davinci-platform/img/2af9e408fb636c79b9fbc32a0a88baf6dd4f8853.png"].forEach((function(t) {
                    var e = new Image;
                    e.src = t
                }
                ))
            },
            mounted: function() {
                var t = this;
                this.$nextTick((function() {
                    return t.checkRetry(t.retryTime)
                }
                ))
            },
            watch: {
                retryTime: function(t) {
                    var e = this;
                    this.$nextTick((function() {
                        return e.checkRetry(t)
                    }
                    ))
                },
                visible: function(t) {
                    var e = this;
                    t && this.$nextTick((function() {
                        return e.checkRetry(e.retryTime)
                    }
                    ))
                }
            },
            computed: {
                topOffset: function() {
                    return u().UA.isBiliApp ? p.qu ? p.qu : p.GO ? (0,
                    v.U4)(44) : (0,
                    v.U4)(20) : 0
                }
            },
            methods: {
                checkRetry: function(t) {
                    var e = this;
                    t && (this.canRetry = !1,
                    this.preRetryTimer && clearTimeout(this.preRetryTimer),
                    this.preRetryTimer = setTimeout((function() {
                        e.canRetry = !0
                    }
                    ), t))
                },
                close: function(t) {
                    this.visible = !1,
                    t && this.reject && this.reject("close")
                },
                touchMove: function(t) {
                    (t.touches[0].clientX < 30 || t.touches[0].clientX > window.innerWidth - 30) && t.preventDefault()
                },
                retry: function() {
                    return this.canRetry ? (this.showButton = !1,
                    this.handleRefresh && this.resolve ? this.resolve() : window.location.reload(),
                    this.autoClose && this.close(),
                    null) : (this.retryText = b[Math.floor(Math.random() * b.length)],
                    null)
                },
                handleGoBack: function() {
                    u().exec("goBack")
                }
            }
        }
          , _ = w
          , C = i(51900)
          , B = (0,
        C.Z)(_, a, l, !1, null, "179dcb82", null)
          , k = B.exports
          , x = i(91852);
        function I(t, e) {
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
        function S(t) {
            for (var e = 1; e < arguments.length; e++) {
                var i = null != arguments[e] ? arguments[e] : {};
                e % 2 ? I(Object(i), !0).forEach((function(e) {
                    s()(t, e, i[e])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : I(Object(i)).forEach((function(e) {
                    Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
                }
                ))
            }
            return t
        }
        var T, M = o().extend(k), O = function() {
            T = new M({
                el: document.createElement("div")
            })
        }, L = function t(e) {
            if (T || O(),
            T.visible)
                T.visible = !1,
                t(e);
            else {
                for (var i in e)
                    e.hasOwnProperty(i) && (T[i] = e[i]);
                document.body.appendChild(T.$el),
                o().nextTick((function() {
                    T.visible = !0
                }
                ))
            }
        }, P = function(t) {
            return new Promise((function(e, i) {
                L(S(S({}, t), {}, {
                    resolve: e,
                    reject: i
                }))
            }
            ))
        };
        P.retryAfterKey = "X-Bili-Retry-After";
        var A = "\u7f51\u7edc\u62e5\u5835,\u8bf7\u7a0d\u540e\u91cd\u8bd5";
        P.capture = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
              , i = e.handleRefresh
              , n = void 0 !== i && i
              , s = e.disableLimit
              , r = void 0 !== s && s
              , o = e.showMask
              , a = void 0 !== o && o
              , l = e.autoClose
              , c = void 0 === l || l
              , u = e.showClose
              , d = void 0 !== u && u
              , h = t.status
              , f = t.response
              , p = void 0 === f ? {} : f
              , v = h || p.status
              , m = p.data || t
              , y = sessionStorage.getItem(P.retryAfterKey)
              , b = .6;
            if ([412].indexOf(v) > -1)
                return new Promise((function() {
                    (0,
                    x.Z)(A)
                }
                ));
            if (!r && Number(v) >= 400) {
                var w = p.headers
                  , _ = void 0 === w ? {} : w;
                return b = Number(_["X-Bili-Retry-After"] || _["x-bili-retry-after"]) || b,
                !y && sessionStorage.setItem(P.retryAfterKey, Date.now() + 1e3 * b),
                P(S(S({}, g), {}, {
                    retryTime: 1e3 * b,
                    handleRefresh: n,
                    showMask: a,
                    autoClose: c,
                    showClose: d
                }))
            }
            var C = m.code || m.errno;
            if (!r && [100001, 900001, 900002].indexOf(C) > -1)
                return b = Number(m.retryAfter) || b,
                !y && sessionStorage.setItem(P.retryAfterKey, Date.now() + 1e3 * b),
                P(S(S({}, g), {}, {
                    retryTime: 1e3 * b,
                    handleRefresh: n,
                    showMask: a,
                    autoClose: c,
                    showClose: d,
                    suffix: 900001 === C ? "." : 900002 === C ? "\u3002" : ""
                }));
            if (-205 === m.code)
                return new Promise((function() {
                    (0,
                    x.Z)(m.message || A)
                }
                ));
            if (t instanceof Error)
                throw t;
            return t
        }
        ,
        P.show = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
              , i = e.handleRefresh
              , n = void 0 !== i && i
              , s = e.disableLimit
              , r = void 0 !== s && s
              , o = e.showMask
              , a = void 0 !== o && o
              , l = e.autoClose
              , c = void 0 === l || l;
            return P(S(S({}, g), {}, {
                retryTime: t,
                handleRefresh: n,
                disableLimit: r,
                showMask: a,
                autoClose: c
            }))
        }
        ,
        P.hide = function() {
            T && (T.visible = !1)
        }
        ,
        P.showLoading = function() {
            T && (T.showLoading = !0)
        }
        ,
        P.hideLoading = function() {
            T && (T.showLoading = !1)
        }
        ;
        var D = P
    },
    21052: function(t, e, i) {
        var n = i(10271)
          , s = i.n(n)
          , r = i(4827)
          , o = i.n(r);
        e.Z = function(t) {
            return new Promise((function(e, i) {
                if (s().UA.isBiliApp && s().UA.isiOS) {
                    var n = t ? Promise.resolve(t) : o().getUserInfo();
                    n.then((function(t) {
                        t && void 0 !== t.isLoginViaTourist && t.isLoginViaTourist || t && void 0 !== t.isTourist && t.isTourist ? i(new Error("\u5f53\u524d\u8d26\u53f7\u4e3a\u6e38\u5ba2\u8eab\u4efd\uff0c\u65e0\u6cd5\u8fdb\u884c\u5f53\u524d\u64cd\u4f5c\uff0c\u8bf7\u9000\u51fa\u5f53\u524d\u6e38\u5ba2\u8d26\u53f7")) : e(!1)
                    }
                    )).catch((function() {
                        i(new Error("\u5f53\u524d\u8d26\u53f7\u4e3a\u6e38\u5ba2\u8eab\u4efd\uff0c\u65e0\u6cd5\u8fdb\u884c\u5f53\u524d\u64cd\u4f5c\uff0c\u8bf7\u9000\u51fa\u5f53\u524d\u6e38\u5ba2\u8d26\u53f7"))
                    }
                    ))
                } else
                    e(!1)
            }
            ))
        }
    },
    74834: function(t, e) {
        e.Z = function(t, e) {
            var i = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2]
              , n = null;
            return function() {
                for (var s = arguments.length, r = new Array(s), o = 0; o < s; o++)
                    r[o] = arguments[o];
                var a = this
                  , l = function() {
                    n = null,
                    i || t.apply(a, r)
                }
                  , c = i && !n;
                clearTimeout(n),
                n = setTimeout(l, e),
                c && t.apply(a, r)
            }
        }
    },
    87761: function(t, e) {
        var i = function(t) {
            var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]
              , i = document.createElement("script");
            return e && (i.crossOrigin = "anonymous"),
            new Promise((function(e, n) {
                i.src = t,
                i.onload = e,
                i.onerror = n,
                document.head.appendChild(i)
            }
            ))
        };
        e.Z = i
    },
    60397: function(t, e, i) {
        i.d(e, {
            RC: function() {
                return a
            },
            Wf: function() {
                return c
            }
        });
        var n = i(76052)
          , s = i(47969)
          , r = i.n(s)
          , o = i(87761)
          , a = function(t) {
            Promise.all([(0,
            o.Z)("//s1.hdslb.com/bfs/static/jinkela/long/js/sentry/sentry-5.15.0.min.js"), (0,
            o.Z)("//s1.hdslb.com/bfs/static/jinkela/long/js/sentry/sentry-5.15.0.vue.min.js")]).then((function() {
                var e = {
                    dsn: t,
                    debug: !1,
                    release: {}.COMMIT_ID,
                    environment: "production",
                    integrations: [window.Sentry && new window.Sentry.Integrations.GlobalHandlers({
                        onerror: !0,
                        onunhandledrejection: !0
                    }), window.Sentry && window.Sentry.Integrations.Vue && new window.Sentry.Integrations.Vue({
                        Vue: r(),
                        attachProps: !0,
                        logErrors: !1,
                        tracing: !0,
                        tracingOptions: {
                            trackComponents: !0
                        }
                    })]
                };
                t && window.Sentry && window.Sentry.init(e)
            }
            ))
        }
          , l = null
          , c = function(t) {
            try {
                var e = {
                    dsn: t,
                    debug: "prod" !== window.__neul__.env,
                    release: {}.COMMIT_ID || {}.NYX_BUILD_COMMIT_SHA || {}.CI_COMMIT_SHA,
                    environment: window.__neul__.env,
                    tracesSampleRate: "prod" !== window.__neul__.env ? 1 : .1,
                    Vue: r(),
                    integrations: [new window.Sentry.BrowserTracing({
                        tracePropagationTargets: [/^\/[^/]/]
                    }), new window.Sentry.Integrations.GlobalHandlers({
                        onerror: !0,
                        onunhandledrejection: !0
                    }), new window.Sentry.Integrations.TryCatch({
                        setTimeout: !0,
                        setInterval: !0,
                        requestAnimationFrame: !0,
                        XMLHttpRequest: !0
                    }), new window.Sentry.Integrations.HttpClient({
                        failedRequestStatusCodes: [[400, 428], [430, 499], [500, 599]]
                    })]
                };
                return l = (0,
                n.I)(window.Sentry, !0),
                l.init(e),
                l
            } catch (i) {
                return console.error("Sentry init failed", i),
                null
            }
        }
    },
    66281: function(t, e, i) {
        var n = this && this.__importDefault || function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        ;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.Collect = void 0;
        var s = n(i(10271))
          , r = n(i(5228))
          , o = 0
          , a = 0
          , l = 0
          , c = 0
          , u = 0
          , d = function(t) {
            var e = navigator.userAgent.length
              , i = window.location.href.length
              , n = Math.round(10 * (window.devicePixelRatio || 1))
              , s = Date.now() % 256
              , r = [window.scrollX, window.scrollY, window.innerWidth, window.innerHeight, window.outerWidth, window.outerHeight, window.screenX, window.screenY, window.screen.width, window.screen.height, window.screen.availWidth, window.history.length, e, i, n, s];
            return r[t % r.length] + r[3 * t % r.length] + 17 * t & 255
        }
          , h = d(1)
          , f = d(2)
          , p = d(3)
          , v = d(4)
          , m = d(5)
          , y = d(6)
          , b = d(7)
          , g = d(8)
          , w = d(9)
          , _ = d(10)
          , C = d(11)
          , B = "ticket_collection_v3"
          , k = function() {
            function t() {
                try {
                    var t = JSON.parse(localStorage.getItem(B) || "null");
                    t && (h = t[0],
                    o = t[1],
                    a = t[2],
                    l = t[3],
                    c = t[4],
                    u = t[5],
                    f = t[6],
                    p = t[7],
                    v = t[8],
                    m = t[9],
                    y = t[10],
                    b = t[11],
                    g = t[12],
                    w = t[13],
                    _ = t[14],
                    C = t[15])
                } catch (e) {}
                this.init()
            }
            return t.prototype.init = function() {
                document.addEventListener("touchend", (function() {
                    o++,
                    t.cache()
                }
                )),
                window.addEventListener("visibilitychange", (function() {
                    "visible" === document.visibilityState && (a++,
                    t.cache())
                }
                ));
                var e = s.default.exec;
                s.default.exec = function() {
                    for (var i = [], n = 0; n < arguments.length; n++)
                        i[n] = arguments[n];
                    var s = i[0];
                    if ("openWindow" === s)
                        try {
                            l++,
                            t.cache()
                        } catch (r) {}
                    return e.apply(this, i)
                }
                ,
                setInterval((function() {
                    c++,
                    t.cache()
                }
                ), 1e3)
            }
            ,
            t.cache = function() {
                try {
                    var t = JSON.stringify([h, o, a, l, c, u, f, p, v, m, y, b, g, w, _, C]);
                    localStorage.setItem(B, t)
                } catch (e) {}
            }
            ,
            t.clearCache = function() {
                localStorage.removeItem(B)
            }
            ,
            t.prototype.encode = function() {
                try {
                    var e = new ArrayBuffer(16)
                      , i = new DataView(e)
                      , n = localStorage.getItem("ticket_collection_t");
                    n && (u = (Date.now() - parseInt(n, 10)) / 1e3);
                    for (var s = {
                        0: {
                            data: h,
                            length: 1
                        },
                        1: {
                            data: o,
                            length: 1
                        },
                        2: {
                            data: f,
                            length: 1
                        },
                        3: {
                            data: a,
                            length: 1
                        },
                        4: {
                            data: p,
                            length: 1
                        },
                        5: {
                            data: v,
                            length: 1
                        },
                        6: {
                            data: l,
                            length: 1
                        },
                        7: {
                            data: m,
                            length: 1
                        },
                        8: {
                            data: c,
                            length: 2
                        },
                        10: {
                            data: u,
                            length: 2
                        },
                        12: {
                            data: y,
                            length: 1
                        },
                        13: {
                            data: b,
                            length: 1
                        },
                        14: {
                            data: g,
                            length: 1
                        },
                        15: {
                            data: w,
                            length: 1
                        }
                    }, d = 0; d < 16; d++)
                        if (s[d])
                            switch (s[d].length) {
                            case 1:
                                i.setUint8(d, s[d].data > 255 ? 255 : s[d].data);
                                break;
                            case 2:
                                i.setUint16(d, s[d].data > 65535 ? 65535 : s[d].data),
                                d++;
                                break
                            }
                        else
                            i.setUint8(d, 4 & _ ? f : C);
                    var B = new Uint8Array(e)
                      , k = "";
                    for (d = 0; d < B.length; d++)
                        k += String.fromCharCode(B[d]);
                    k = t.toBinary(k);
                    try {
                        r.default.track.report("collect_encode", {
                            dataMap: s,
                            str: k,
                            url: window.location.href
                        })
                    } catch (x) {}
                    return k
                } catch (I) {
                    console.error("Collect encode error:", I);
                    try {
                        r.default.track.report("collect_encode_error", {
                            error: I.message
                        })
                    } catch (x) {}
                    return
                }
            }
            ,
            t.toBinary = function(t) {
                for (var e = new Uint16Array(t.length), i = 0; i < e.length; i++)
                    e[i] = t.charCodeAt(i);
                return btoa(String.fromCharCode.apply(String, new Uint8Array(e.buffer)))
            }
            ,
            t
        }();
        e.Collect = k
    },
    22035: function(t, e, i) {
        var n = this && this.__assign || function() {
            return n = Object.assign || function(t) {
                for (var e, i = 1, n = arguments.length; i < n; i++)
                    for (var s in e = arguments[i],
                    e)
                        Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
                return t
            }
            ,
            n.apply(this, arguments)
        }
          , s = this && this.__importDefault || function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        ;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.report = e.LiveReportType = void 0;
        var r, o = s(i(4827));
        (function(t) {
            t["ENTER_LIVE"] = "1",
            t["ADD_CART"] = "2",
            t["BUY_NOW"] = "3"
        }
        )(r = e.LiveReportType || (e.LiveReportType = {}));
        var a = o.default.Utils.UParams()
          , l = function(t, e) {
            try {
                var i = n({
                    itemsId: a.id || "",
                    result: "1",
                    product_source: "2"
                }, e || {})
                  , s = {
                    type: t.toString() || r.ENTER_LIVE,
                    ext_json: i
                };
                return o.default.isBiliMall && o.default.call({
                    method: "kfc.malllive.liveTrack",
                    options: {
                        params: s
                    }
                })
            } catch (l) {
                console.error("\u76f4\u64ad\u57cb\u70b9\u4e0a\u62a5\u5931\u8d25", l)
            }
        };
        e.report = l
    },
    46994: function(t, e, i) {
        i.d(e, {
            Z: function() {
                return c
            }
        });
        var n = function() {
            var t = this
              , e = t._self._c;
            return e("transition", {
                attrs: {
                    name: "popup-fade"
                }
            }, [e("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.value,
                    expression: "value"
                }],
                staticClass: "alert-top"
            }, [e("div", {
                staticClass: "alert-wrapper"
            }, [e("div", [t._t("default")], 2)])])])
        }
          , s = []
          , r = {
            props: {
                value: {
                    type: Boolean,
                    default: !1
                },
                image: {
                    type: String,
                    default: ""
                }
            },
            data: function() {
                return {}
            },
            watch: {
                value: function(t) {
                    var e = this;
                    t && setTimeout((function() {
                        e.$emit("input", !1)
                    }
                    ), 1e3)
                }
            }
        }
          , o = r
          , a = i(51900)
          , l = (0,
        a.Z)(o, n, s, !1, null, "5af59b16", null)
          , c = l.exports
    },
    86641: function(t, e, i) {
        i.d(e, {
            Z: function() {
                return v
            }
        });
        var n = function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                class: [{
                    "is-app": t.isApp,
                    "night-mode": t.isNightMode
                }, t.theme, "bili-header"],
                style: {
                    "padding-top": t.isMobileApp ? 0 : t.notchHeightValue
                }
            }, [e("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.showMainContent,
                    expression: "showMainContent"
                }],
                staticClass: "bili-header-main"
            }, [e("div", {
                staticClass: "bili-header-container bili-title-container"
            }, [t._t("default", (function() {
                return ["transparent" !== t.theme ? e("p", {
                    staticClass: "title"
                }, [t._v(t._s(t.title))]) : t._e()]
            }
            ))], 2), t.isMobileApp ? t._e() : e("div", {
                staticClass: "bili-header-container left"
            }, [t.back ? e("i", {
                staticClass: "bili-icon-back",
                on: {
                    click: t.backClick
                }
            }) : t._e(), t._t("left")], 2), e("div", {
                staticClass: "bili-header-container right"
            }, [t._t("right")], 2)]), t._t("extra")], 2)
        }
          , s = []
          , r = i(51e3)
          , o = i(10271)
          , a = i.n(o)
          , l = i(18165)
          , c = i(52053)
          , u = (0,
        c.Z)()
          , d = {
            name: "BiliHeader",
            props: {
                back: {
                    type: Boolean,
                    default: !0
                },
                backAction: {
                    type: Function,
                    default: function() {
                        if ("1" === u.halfScreen)
                            return dittoNext.goBack();
                        a().exec("goBack")
                    }
                },
                title: {
                    type: String,
                    default: ""
                },
                theme: {
                    type: String,
                    default: "main",
                    validator: function(t) {
                        return -1 !== ["main", "pink", "white", "transparent", "gradient", "dark", "custom"].indexOf(t)
                    }
                },
                showMainContent: {
                    type: Boolean,
                    default: !0
                }
            },
            data: function() {
                return {
                    notchHeightValue: r.TQ,
                    isNightMode: l.Z.isNightMode,
                    query: u
                }
            },
            methods: {
                backClick: function() {
                    this.backAction()
                }
            },
            computed: {
                isApp: function() {
                    return "1" !== this.query.halfScreen && (a().UA.isBiliApp || a().UA.isMissEvan)
                },
                isMobileApp: function() {
                    return a().UA.isMissEvan
                }
            },
            watch: {
                title: {
                    handler: function(t) {
                        var e = this;
                        this.$nextTick((function() {
                            var t = e.title;
                            t && (document.title = t)
                        }
                        ))
                    },
                    immediate: !0
                },
                "$slots.default": {
                    handler: function(t) {
                        var e = this;
                        this.$nextTick((function() {
                            var t, i, n, s = null === (t = e.$slots.default) || void 0 === t || null === (i = t[0]) || void 0 === i || null === (n = i.elm) || void 0 === n ? void 0 : n.innerText;
                            s && (document.title = s)
                        }
                        ))
                    },
                    immediate: !0
                }
            }
        }
          , h = d
          , f = i(51900)
          , p = (0,
        f.Z)(h, n, s, !1, null, "47b84ed5", null)
          , v = p.exports
    },
    76823: function(t, e, i) {
        i.d(e, {
            Z: function() {
                return u
            }
        });
        var n = function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                staticClass: "left-delete",
                style: "height:" + t.heightNum + "px"
            }, [e("div", {
                staticClass: "move",
                style: "height:" + t.heightNum + "px;" + t.txtStyle,
                on: {
                    touchstart: t._touchStart,
                    touchmove: t._touchMove,
                    touchend: t._touchEnd
                }
            }, [t._t("default")], 2), e("div", {
                staticClass: "delete",
                style: t.zIndex,
                on: {
                    click: function(e) {
                        return e.preventDefault(),
                        t.deleteItem.apply(null, arguments)
                    }
                }
            }, [t._v("\u5220\u9664")])])
        }
          , s = []
          , r = i(72505)
          , o = {
            props: {
                index: Number,
                heightNum: Number,
                item: Object
            },
            data: function() {
                return {
                    startX: 0,
                    startY: 0,
                    moveX: 0,
                    moveY: 0,
                    disX: 0,
                    disY: 0,
                    txtStyle: "",
                    delWidth: (0,
                    r.U4)(50),
                    top: "",
                    zIndex: "z-index:-1",
                    firstMoveIndex: null
                }
            },
            created: function() {},
            methods: {
                _touchPrevent: function(t) {
                    t.preventDefault()
                },
                _touchStart: function(t) {
                    this.$emit("sliderStart", this.index),
                    t = t || window.event,
                    1 === t.touches.length && (document.addEventListener("touchmove", this._touchPrevent),
                    this.startX = t.touches[0].clientX,
                    this.startY = t.touches[0].clientY,
                    this.firstMoveIndex = t.target.getAttribute("index"))
                },
                _touchMove: function(t) {
                    t = t || window.event,
                    1 === t.touches.length && (this.moveX = t.touches[0].clientX,
                    this.moveY = t.touches[0].clientY,
                    this.disX = this.startX - this.moveX,
                    this.disY = this.startY - this.moveY,
                    Math.abs(this.disY) < Math.abs(this.disX) ? this.disX < 0 || 0 === this.disX ? this.txtStyle = "transform:translateX(0);-webkit-transform:translateX(0);" : this.disX > 0 && (this.txtStyle = "transform:translateX(-".concat(this.disX, "px)"),
                    this.disX >= this.delWidth && (this.txtStyle = "transform:translateX(-".concat(this.delWidth, "px)"))) : (this.txtStyle = "transform:translateX(0);-webkit-transform:translateX(0);",
                    document.removeEventListener("touchmove", this._touchPrevent)))
                },
                _touchEnd: function(t) {
                    if (t = t || window.event,
                    document.removeEventListener("touchmove", this._touchPrevent),
                    1 === t.changedTouches.length) {
                        var e = window.event.changedTouches[0].clientX;
                        this.disX = this.startX - e,
                        this.disX >= this.delWidth ? (this.txtStyle = "transform:translateX(-".concat(this.delWidth, "px)"),
                        this.$emit("setLeftDeleteIndex", t.target.getAttribute("index"))) : this.txtStyle = "transform:translateX(0)"
                    }
                },
                deleteItem: function() {
                    this.$emit("deleteitem", this.item)
                }
            }
        }
          , a = o
          , l = i(51900)
          , c = (0,
        l.Z)(a, n, s, !1, null, null, null)
          , u = c.exports
    },
    45466: function(t, e, i) {
        i.d(e, {
            Z: function() {
                return h
            }
        });
        var n = i(4115)
          , s = i.n(n)
          , r = function() {
            var t = this
              , e = t._self._c;
            return e("transition", {
                attrs: {
                    name: t.useFadeEffect ? "modal" : ""
                },
                on: {
                    "after-leave": t.afterLeave
                }
            }, [e("div", {
                staticClass: "bili-modal",
                class: s()({
                    "has-bottom-bar": t.$slots["bottom-bar"],
                    "has-bottom-info": t.$slots.info
                }, "theme-".concat(t.theme), !0),
                on: {
                    touchmove: t.preventMove,
                    click: function(t) {
                        t.stopPropagation()
                    }
                }
            }, [e("div", {
                staticClass: "bg-shadow",
                on: {
                    click: t.close
                }
            }), e("div", {
                staticClass: "bili-modal-box",
                class: {
                    "bili-modal-center-box": t.isCenter
                }
            }, [t.closeButton && !t.isCenter ? e("div", {
                staticClass: "bili-modal-close",
                on: {
                    click: t.close
                }
            }, [e("i", {
                staticClass: "bili-icon-modal-close"
            })]) : t._e(), e("div", {
                staticClass: "bili-modal-wrapper",
                class: {
                    "no-min-height": t.noMinHeight,
                    "bili-modal-wrapper-radius": !t.isCenter
                }
            }, [t.title ? e("h1", {
                staticClass: "bili-modal-title",
                class: {
                    border: t.titleBorder
                }
            }, [t._t("titleContent", (function() {
                return [t._v(t._s(t.title))]
            }
            )), t.closeArray ? e("i", {
                staticClass: "bili-icon-fold",
                on: {
                    click: t.close
                }
            }) : t._e()], 2) : t._e(), t.titleBorder ? e("div", {
                staticClass: "bili-modal-gap"
            }) : t._e(), e("div", {
                ref: "antiContainer",
                class: {
                    "bili-modal-content": !0,
                    "disable-inner-scroll": t.disableInnerScroll
                },
                style: {
                    "max-height": t.noMaxHeight ? "" : "".concat(t.contentMaxHeight, "px")
                },
                on: {
                    touchstart: t.antiTouchStart,
                    touchmove: function(e) {
                        return e.stopPropagation(),
                        t.antiTouchMove.apply(null, arguments)
                    }
                }
            }, [e("div", {
                ref: "antiWrapper",
                staticClass: "bili-modal-content-wrapper"
            }, [t._t("default")], 2)]), t.$slots["button"] ? e("div", {
                staticClass: "bili-modal-button-container"
            }, [t._t("button")], 2) : t._e(), t.closeButton && t.isCenter ? e("div", {
                staticClass: "bili-modal-close-center",
                on: {
                    click: t.close
                }
            }) : t._e()])]), t.$slots.info ? e("div", {
                staticClass: "bottom-info"
            }, [t._t("info")], 2) : t._e(), t.$slots["bottom-bar"] ? e("div", {
                staticClass: "bottom-bar"
            }, [t._t("bottom-bar")], 2) : t._e()])])
        }
          , o = []
          , a = i(51e3)
          , l = {
            name: "BiliModal",
            data: function() {
                var t = this.$slots.button ? 64 : 0
                  , e = this.titleBorder ? 10 : 0;
                return {
                    contentMaxHeight: .75 * window.innerHeight - 20 - 56 - (a.Rq ? 46 : 12) - t - e,
                    antiLastPosition: 0
                }
            },
            props: {
                closeButton: {
                    type: Boolean,
                    default: !1
                },
                isCenter: {
                    type: Boolean,
                    default: !1
                },
                closeArray: {
                    type: Boolean,
                    default: !1
                },
                title: {
                    type: String,
                    default: ""
                },
                titleBorder: {
                    type: Boolean,
                    default: !1
                },
                noMinHeight: {
                    type: Boolean,
                    default: !1
                },
                noMaxHeight: {
                    type: Boolean,
                    default: !1
                },
                useFadeEffect: {
                    type: Boolean,
                    default: !1
                },
                theme: {
                    type: String,
                    default: "legacy"
                },
                disableInnerScroll: {
                    type: Boolean,
                    default: !1
                }
            },
            methods: {
                preventMove: function(t) {
                    this.disableInnerScroll || t.preventDefault()
                },
                close: function() {
                    this.$emit("close")
                },
                antiTouchStart: function(t) {
                    this.disableInnerScroll || (this.antiLastPosition = t.touches[0].clientY)
                },
                antiTouchMove: function(t) {
                    if (!this.disableInnerScroll) {
                        var e = this.$refs.antiContainer.scrollTop
                          , i = t.touches[0].clientY;
                        (0 === e && i > this.antiLastPosition || e === this.$refs.antiWrapper.clientHeight - this.$refs.antiContainer.clientHeight && i < this.antiLastPosition) && t.preventDefault(),
                        this.antiLastPosition = i
                    }
                },
                afterLeave: function() {
                    this.$emit("afterLeave")
                }
            }
        }
          , c = l
          , u = i(51900)
          , d = (0,
        u.Z)(c, r, o, !1, null, "7696f2b6", null)
          , h = d.exports
    },
    12434: function(t, e, i) {
        i.d(e, {
            Z: function() {
                return f
            }
        });
        var n = function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                staticClass: "error-page"
            }, [!t.isMobileApp && t.isHeaderShow ? e("BHeaderPro", {
                attrs: {
                    title: t.title,
                    theme: "white"
                }
            }) : t._e(), t.isLoading ? e("div", {
                staticClass: "loading-content"
            }, [e("div", {
                staticClass: "loading-img refreshing"
            }), e("div", {
                staticClass: "loading-text"
            }, [t._v(t._s(t.loadingText))])]) : e("div", {
                staticClass: "error-content"
            }, [e("div", {
                staticClass: "error-img",
                style: {
                    backgroundImage: "url(".concat(t.typeToImg[t.errorType], ")")
                }
            }), e("div", {
                staticClass: "error-text"
            }, [t._v(t._s(t.errorText))]), t.showButton ? t._e() : e("div", {
                staticClass: "loading"
            }, [e("div", {
                staticClass: "loading-icon"
            })]), t.showButton ? e("BButton", {
                staticClass: "btn",
                attrs: {
                    type: "primary"
                },
                on: {
                    click: t.buttonClick
                }
            }, [t._v("\n            " + t._s(t.buttonText) + "\n        ")]) : t._e()], 1)], 1)
        }
          , s = []
          , r = i(10271)
          , o = i.n(r)
          , a = i(86641)
          , l = i(41677)
          , c = {
            name: "ErrorPage",
            props: {
                title: {
                    type: String,
                    default: "\u6f2b\u5c55\u6f14\u51fa"
                },
                errorText: {
                    type: String,
                    default: "\u524d\u65b9\u62e5\u5835\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5"
                },
                buttonText: {
                    type: String,
                    default: "\u518d\u8bd5\u4e00\u6b21"
                },
                buttonClick: {
                    type: Function,
                    default: function() {
                        window.location.reload()
                    }
                },
                delay: {
                    type: Number,
                    default: 0
                },
                isLoading: {
                    type: Boolean,
                    default: !1
                },
                loadingText: {
                    type: String,
                    default: "\u52a0\u8f7d\u4e2d..."
                },
                errorType: {
                    type: String,
                    default: "default"
                },
                isHeaderShow: {
                    type: Boolean,
                    default: !0
                }
            },
            components: {
                BHeaderPro: a.Z,
                BButton: l.Z
            },
            data: function() {
                return {
                    showButton: !0,
                    typeToImg: {
                        default: "//i0.hdslb.com/bfs/kfptfe/floor/edbe9c254306303e64852a9fb6ef938a67f49c59.png",
                        limit: "//i0.hdslb.com/bfs/davinci-platform/img/16c918eb03cbfaf286c691c3ac1c77c37c20ac5d.png"
                    }
                }
            },
            created: function() {
                Object.values(this.typeToImg).forEach((function(t) {
                    var e = new Image;
                    e.src = t
                }
                ))
            },
            mounted: function() {
                var t = this;
                this.delay && (this.showButton = !1,
                setTimeout((function() {
                    t.showButton = !0
                }
                ), this.delay))
            },
            computed: {
                isMobileApp: function() {
                    return o().UA.isMissEvan
                }
            },
            watch: {
                title: {
                    handler: function(t) {
                        document.title = t
                    },
                    immediate: !0
                }
            }
        }
          , u = c
          , d = i(51900)
          , h = (0,
        d.Z)(u, n, s, !1, null, "6180e615", null)
          , f = h.exports
    },
    47401: function(t, e, i) {
        i.d(e, {
            Z: function() {
                return g
            }
        });
        var n = function() {
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
            }, [t.userinfodata ? e("div", {
                staticClass: "popup-body"
            }, [e("div", {
                staticClass: "pop-body-wrapper"
            }, [e("div", {
                staticClass: "user-header"
            }, [e("div", [t._v("\u8d2d\u4e70\u4eba\u4fe1\u606f")]), e("div", {
                staticClass: "popup-close",
                on: {
                    click: t.onClose
                }
            }, [e("i", {
                staticClass: "bili-icon-modal-close"
            })])]), e("div", {
                staticClass: "add-userinfo"
            }, [e("div", {
                on: {
                    click: t.addUser
                }
            }, [t._v("\u6dfb\u52a0\u8d2d\u4e70\u4eba")])]), e("div", {
                staticClass: "user-lists-container"
            }, [e("div", {
                staticClass: "user-lists"
            }, t._l(t.userinfodata.list, (function(i, n) {
                return e("div", {
                    key: i.id,
                    staticClass: "user-item"
                }, [e("left-delete", {
                    on: {
                        deleteitem: function(e) {
                            return t.preDelete(i.id)
                        },
                        setLeftDeleteIndex: t.onSetLeftDeleteIndex
                    }
                }, [i.isBuyerInfoCompleted && i.isBuyerInfoVerified && i.isBuyerValid ? e("div", {
                    staticClass: "userinfo",
                    class: {
                        "userinfo-disabled": !t.canSelectBuyer(i.id)
                    },
                    on: {
                        click: function(e) {
                            return t.checkUser(i, n)
                        }
                    }
                }, [t.canSelectBuyerCount > 1 ? e("i", {
                    staticClass: "user-check unselected",
                    class: {
                        "is-selected": t.isSelected(i.id),
                        "unable-check": !t.canSelectBuyer(i.id)
                    },
                    attrs: {
                        userid: i.id,
                        index: n
                    }
                }) : t._e(), e("div", {
                    staticClass: "name-card"
                }, [e("div", {
                    staticClass: "user-name-idcard"
                }, [e("div", {
                    staticClass: "user-name"
                }, [i.is_default ? e("span", {
                    staticClass: "user-info-defalut-icon"
                }) : t._e(), e("span", {
                    staticClass: "user-name-content"
                }, [t._v(t._s(i.name))])])]), t.checkItemCanShow("1") && i.tel ? e("div", {
                    staticClass: "user-tel"
                }, [t._v(t._s(i.tel))]) : t._e(), t.checkItemCanShow("2") && i.personal_id ? e("div", {
                    staticClass: "user-personal-id"
                }, [e("label", [t._v(t._s(t.idTypeName(i.id_type)))]), e("span", [t._v(t._s(i.personal_id))])]) : t._e()]), e("i", {
                    staticClass: "edit-item",
                    attrs: {
                        userid: i.id,
                        index: n
                    },
                    on: {
                        click: function(e) {
                            return e.stopPropagation(),
                            t.editUser(i.id)
                        }
                    }
                })]) : e("div", {
                    staticClass: "userinfo",
                    on: {
                        click: function(e) {
                            return e.stopPropagation(),
                            t.validateUserInfo(i)
                        }
                    }
                }, [t.canSelectBuyerCount > 1 ? e("i", {
                    staticClass: "user-check unable-check"
                }) : t._e(), e("div", {
                    staticClass: "name-card name-card-disabled"
                }, [e("div", {
                    staticClass: "user-name-idcard"
                }, [e("div", {
                    staticClass: "user-name user-name-no-perfect"
                }, [i.is_default ? e("span", {
                    staticClass: "user-info-defalut-icon"
                }) : t._e(), t._v("\n                                                    " + t._s(i.name) + "\n                                                ")])]), i.isBuyerInfoCompleted ? i.isBuyerValid && !i.isBuyerInfoVerified ? e("a", {
                    staticClass: "user-info-tip",
                    on: {
                        click: function(e) {
                            return e.stopPropagation(),
                            t.editUser(i.id)
                        }
                    }
                }, [t._v("\u8bf7\u91cd\u65b0\u8ba4\u8bc1")]) : [t.checkItemCanShow("1") && i.tel ? e("div", {
                    staticClass: "user-tel"
                }, [t._v(t._s(i.tel))]) : t._e(), t.checkItemCanShow("2") && i.personal_id ? e("div", {
                    staticClass: "user-personal-id"
                }, [e("label", [t._v(t._s(t.idTypeName(i.id_type)))]), e("span", [t._v(t._s(i.personal_id))])]) : t._e()] : e("a", {
                    staticClass: "user-info-tip",
                    on: {
                        click: function(e) {
                            return e.stopPropagation(),
                            t.editUser(i.id)
                        }
                    }
                }, [t._v("\u8bf7\u5b8c\u5584\u4fe1\u606f")])], 2), e("i", {
                    staticClass: "edit-item",
                    class: {
                        "edit-item-disabled": t.isDisabled(i)
                    },
                    attrs: {
                        userid: i.id,
                        index: n
                    },
                    on: {
                        click: function(e) {
                            return e.stopPropagation(),
                            t.editUser(i.id, i)
                        }
                    }
                })])])], 1)
            }
            )), 0)]), t.canSelectBuyerCount > 1 ? e("div", {
                staticClass: "confirm"
            }, [e("BButton", {
                attrs: {
                    type: 0 === t.selectBuyerList.length ? "cancel" : "primary"
                },
                on: {
                    click: t.confirm
                }
            }, [t._v("\n                            " + t._s("\u786e\u5b9a\uff08".concat(t.selectBuyerList.length, "\uff09")) + "\n                        ")])], 1) : t._e()]), e("alert", {
                model: {
                    value: t.isShowAlert,
                    callback: function(e) {
                        t.isShowAlert = e
                    },
                    expression: "isShowAlert"
                }
            }, [t._v(t._s(t.alertText))]), t.confirmDelete ? e("confirm", {
                attrs: {
                    cancelText: "\u53d6\u6d88",
                    confirmText: "\u5220\u9664",
                    alertInfo: "\u5220\u9664\u8d2d\u4e70\u4eba?"
                },
                on: {
                    "on-cancel": function(e) {
                        t.confirmDelete = 0
                    },
                    "on-ok": function(e) {
                        return t.deleteItem(t.confirmDelete)
                    }
                }
            }) : t._e()], 1) : t._e()])]), e("transition", {
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
          , s = []
          , r = i(15785)
          , o = i(10271)
          , a = i.n(o)
          , l = i(76823)
          , c = i(41677)
          , u = i(19392)
          , d = i(46994)
          , h = i(48038)
          , f = "".concat(window.location.protocol).concat("//show.bilibili.com")
          , p = function(t) {
            return a().exec("fetch", {
                methods: "post",
                url: "".concat(f, "/api/ticket/buyer/delete"),
                params: t
            })
        }
          , v = {
            name: "UserInfoDialog",
            data: function() {
                return {
                    isShowAlert: !1,
                    alertText: "",
                    choiceId: "",
                    userId: "",
                    leftDeleteIndex: null,
                    noIdcardTel: !0,
                    locked: !1,
                    selectBuyerList: [],
                    confirmDelete: 0
                }
            },
            props: {
                userinfodata: {
                    type: Object
                },
                selectBuyers: {
                    type: Array,
                    default: []
                },
                buyerinfo: {
                    type: String
                },
                buyerId: {
                    type: Number
                },
                canSelectBuyerCount: {
                    type: Number,
                    default: 0
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
            computed: {
                isApp: function() {
                    var t = navigator.userAgent.toLowerCase();
                    return -1 !== t.indexOf("mobile") && -1 !== t.indexOf("biliapp")
                }
            },
            created: function() {
                this.selectBuyerList = (0,
                r.Z)(this.selectBuyers),
                this.buyerId && (this.choiceId = this.buyerId)
            },
            updated: function() {
                this.locked || (this.locked = !0)
            },
            components: {
                LeftDelete: l.Z,
                Alert: d.Z,
                BButton: c.Z,
                Confirm: u.Z
            },
            methods: {
                isMainBuyer: function(t) {
                    return this.restrictBuyerInfo && this.restrictBuyerInfo.main === t
                },
                isRelateBuyer: function(t) {
                    return this.restrictBuyerInfo && this.restrictBuyerInfo.relate && this.restrictBuyerInfo.relate.includes(t)
                },
                getMainBuyerTip: function() {
                    var t, e = this;
                    if (!this.restrictBuyerInfo || !this.restrictBuyerInfo.main)
                        return "\u5fc5\u987b\u5305\u542b\u8be5\u8d2d\u4e70\u4eba";
                    var i = null === (t = this.userinfodata.list) || void 0 === t ? void 0 : t.find((function(t) {
                        return t.id === e.restrictBuyerInfo.main
                    }
                    ));
                    if (!i)
                        return "\u5fc5\u987b\u5305\u542b\u8be5\u8d2d\u4e70\u4eba";
                    var n = i.personal_id || "";
                    return "\u9700\u5305\u542b\u8d2d\u4e70\u4eba".concat(i.name).concat(n ? "\uff08".concat(n, "\uff09") : "")
                },
                canSelectBuyer: function(t) {
                    return !this.restrictBuyerInfo || !this.restrictBuyerInfo.main || (this.isMainBuyer(t) || this.isRelateBuyer(t))
                },
                validateUserInfo: function(t) {
                    t.disabledErr && this.$toast(t.disabledErr)
                },
                isDisabled: function(t) {
                    return t.isBuyerInfoCompleted && !t.isBuyerValid
                },
                preDelete: function(t) {
                    this.confirmDelete = t
                },
                editUser: function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    this.isDisabled(e) ? this.$toast(e.disabledErr) : this.$emit("onEditBuyer", t)
                },
                addUser: function() {
                    this.$emit("onAddBuyer")
                },
                onTouchMove: function(t) {
                    t.preventDefault()
                },
                onClose: function() {
                    this.$emit("close")
                },
                onCloseAndPickUserInfo: function() {
                    this.$emit("pickuserinfo", this.selectBuyerList),
                    this.$emit("close")
                },
                checkUser: function(t) {
                    var e = t.id;
                    if (this.userId = e,
                    null === this.leftDeleteIndex)
                        if (this.canSelectBuyer(e))
                            if (1 === this.canSelectBuyerCount) {
                                if (this.restrictBuyerInfo && this.restrictBuyerInfo.main) {
                                    var i = this.restrictBuyerInfo.main;
                                    return e !== i ? void this.$toast(this.getMainBuyerTip()) : void this.$emit("close")
                                }
                                this.selectBuyerList = [e],
                                this.$emit("pickuserinfo", this.selectBuyerList),
                                this.$emit("close")
                            } else {
                                var n = this.selectBuyerList.findIndex((function(t) {
                                    return t === e
                                }
                                ));
                                if (n > -1) {
                                    if (this.isMainBuyer(e))
                                        return void this.$toast(this.getMainBuyerTip());
                                    this.selectBuyerList.splice(n, 1)
                                } else
                                    this.canSelectBuyerCount > this.selectBuyerList.length ? this.selectBuyerList.push(e) : this.$toast("\u6700\u591a\u9009\u62e9".concat(this.canSelectBuyerCount, "\u4e2a\u8d2d\u4e70\u4eba"))
                            }
                        else
                            this.$toast("\u8be5\u8d2d\u4e70\u4eba\u4e0d\u53ef\u53c2\u4e0e\u8d2d\u7968");
                    else
                        this.leftDeleteIndex = null
                },
                deleteItem: function(t) {
                    var e = this;
                    this.confirmDelete = 0,
                    p({
                        id: t
                    }).then((function(i) {
                        if (i && 0 === i.errno) {
                            var n = e.selectBuyerList.findIndex((function(e) {
                                return e === t
                            }
                            ));
                            n > -1 && e.selectBuyerList.splice(n, 1),
                            e.isShowAlert = !0,
                            e.alertText = "\u5220\u9664\u6210\u529f",
                            e.$emit("refresh", t)
                        }
                    }
                    ))
                },
                isSelected: function(t) {
                    var e = this.selectBuyerList.findIndex((function(e) {
                        return e === t
                    }
                    ));
                    return e > -1
                },
                confirm: function() {
                    0 !== this.selectBuyerList.length && (this.$emit("pickuserinfo", this.selectBuyerList),
                    this.$emit("close"))
                },
                idTypeName: function(t) {
                    return h.k2[t]
                },
                checkItemCanShow: function(t) {
                    var e = this.buyerinfo.split(",");
                    return e.indexOf(t) > -1
                },
                onSetLeftDeleteIndex: function(t) {
                    this.leftDeleteIndex = 1 * t
                }
            },
            watch: {
                userinfodata: function(t) {
                    var e, i;
                    for (t.list && Array.isArray(t.list) && t.list.length > 0 && !this.choiceId && (this.choiceId = t.list[0].id),
                    e = 0,
                    i = t.list.length; e < i; ++e)
                        ;
                    for (e = 0,
                    i = t.list.length; e < i; ++e)
                        ;
                },
                selectId: function(t) {
                    this.choiceId = t
                },
                selectBuyers: function(t) {
                    this.selectBuyerList = (0,
                    r.Z)(t)
                }
            }
        }
          , m = v
          , y = i(51900)
          , b = (0,
        y.Z)(m, n, s, !1, null, "bfbd3a68", null)
          , g = b.exports
    }
}]);
//# sourceMappingURL=http://boss.bilibili.co/mall_sourcemap/static/neul-project-ticket/h5/ee3fe5ab1be7a6aa339a6555faa0e1199e8c5768/8258.js.map
