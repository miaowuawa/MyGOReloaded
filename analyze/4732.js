"use strict";
(self["webpackChunkneul_project_ticket"] = self["webpackChunkneul_project_ticket"] || []).push([[4732], {
    19431: function() {
        ( () => {
            var e, t;
            const n = ( () => {
                try {
                    return !![].map && 0 === document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp")
                } catch (e) {
                    return !1
                }
            }
            )();
            window.document.documentElement.setAttribute("data-webp", n && ["prod", "pre", "uat"].includes(null === (t = null === (e = window) || void 0 === e ? void 0 : e.__neul__) || void 0 === t ? void 0 : t.env) ? "support" : "no-support")
        }
        )()
    },
    73545: function(e, t, n) {
        n.d(t, {
            Z: function() {
                return w
            }
        });
        var o, i, r = n(47969), c = n.n(r), a = function() {
            var e = this
              , t = e._self._c;
            return t("transition", {
                attrs: {
                    name: "bili-msg-box"
                }
            }, [t("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.visible,
                    expression: "visible"
                }],
                attrs: {
                    id: "bili-message-box"
                },
                on: {
                    touchmove: e.touchMove
                }
            }, [t("div", {
                staticClass: "bili-message-bg"
            }), t("div", {
                staticClass: "bili-message-wrapper"
            }, [t("div", {
                staticClass: "bili-message-container",
                on: {
                    click: function(e) {
                        e.stopPropagation()
                    }
                }
            }, [t("div", {
                staticClass: "bili-message-icon"
            }), t("p", {
                staticClass: "main-message"
            }, [e._v(e._s(e.message))]), t("p", {
                staticClass: "sub-message"
            }, [e._v(e._s(e.subMessage))]), e.showInput ? t("div", {
                class: ["bili-prompt-container", {
                    error: !e.validateResult
                }]
            }, [t("input", {
                directives: [{
                    name: "model",
                    rawName: "v-model",
                    value: e.inputValue,
                    expression: "inputValue"
                }],
                staticClass: "bili-prompt-input",
                attrs: {
                    placeholder: e.placeholder
                },
                domProps: {
                    value: e.inputValue
                },
                on: {
                    input: function(t) {
                        t.target.composing || (e.inputValue = t.target.value)
                    }
                }
            })]) : e._e(), e.showCheckbox ? t("div", {
                staticClass: "checkbox-container"
            }, e._l(e.checkList, (function(n) {
                return t("div", {
                    key: n.id,
                    staticClass: "checkbox-item"
                }, [t("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.checkedValue,
                        expression: "checkedValue"
                    }],
                    attrs: {
                        type: "checkbox",
                        checked: ""
                    },
                    domProps: {
                        checked: Array.isArray(e.checkedValue) ? e._i(e.checkedValue, null) > -1 : e.checkedValue
                    },
                    on: {
                        change: function(t) {
                            var n = e.checkedValue
                              , o = t.target
                              , i = !!o.checked;
                            if (Array.isArray(n)) {
                                var r = null
                                  , c = e._i(n, r);
                                o.checked ? c < 0 && (e.checkedValue = n.concat([r])) : c > -1 && (e.checkedValue = n.slice(0, c).concat(n.slice(c + 1)))
                            } else
                                e.checkedValue = i
                        }
                    }
                }), t("div", {
                    staticClass: "checkbox-item-group",
                    on: {
                        click: e.handleItemClick
                    }
                }, [t("span", {
                    staticClass: "checkbox-item-head",
                    style: {
                        "background-image": "url('".concat(n.face, "')")
                    }
                }), t("span", {
                    staticClass: "checkbox-item-desc"
                }, [e._v(e._s(n.desc))])])])
            }
            )), 0) : e._e(), t("div", {
                class: ["button-container", {
                    "reverse-btn": e.reverseBtn
                }]
            }, [e.showCancelButton ? t("div", {
                staticClass: "button-content"
            }, [t("bili-button", {
                attrs: {
                    type: "cancel"
                },
                on: {
                    click: function(t) {
                        return t.stopPropagation(),
                        e.close("cancel")
                    }
                }
            }, [e._v(e._s(e.cancelButtonText))])], 1) : e._e(), e.showConfirmButton ? t("div", {
                staticClass: "button-content"
            }, [t("bili-button", {
                on: {
                    click: function(t) {
                        return t.stopPropagation(),
                        e.close("confirm")
                    }
                }
            }, [e._v(e._s(e.confirmButtonText))])], 1) : e._e()])])])])])
        }, s = [], l = n(41677), u = {
            name: "BiliMessageBox",
            data: function() {
                return {
                    visible: !1,
                    message: "",
                    subMessage: "",
                    action: "",
                    showConfirmButton: !0,
                    confirmButtonText: "\u786e\u5b9a",
                    showCancelButton: !1,
                    cancelButtonText: "\u53d6\u6d88",
                    validateResult: !0,
                    showInput: !1,
                    placeholder: "",
                    inputValue: "",
                    showCheckbox: !1,
                    checkList: [],
                    checkedValue: !0,
                    checkItemClickCallback: null,
                    reverseBtn: !1
                }
            },
            components: {
                BiliButton: l.Z
            },
            methods: {
                close: function(e) {
                    this.callback(e, this),
                    this.visible = !1
                },
                touchMove: function(e) {
                    e.target.closest(".main-message") || e.preventDefault()
                },
                handleItemClick: function() {
                    this.checkItemClickCallback && this.checkItemClickCallback()
                }
            }
        }, d = u, f = n(51900), h = (0,
        f.Z)(d, a, s, !1, null, "1eed0818", null), p = h.exports, m = {
            message: "",
            subMessage: "",
            action: ""
        }, b = c().extend(p), v = function() {
            o = new b({
                el: document.createElement("div")
            }),
            o.callback = g
        }, g = function(e) {
            "confirm" === e ? o.showInput ? i.resolve({
                value: o.inputValue,
                action: e
            }) : i.resolve(e) : "cancel" === e && i.reject && i.reject(e)
        }, y = function(e) {
            if (o || v(),
            !o.visible) {
                for (var t in e)
                    e.hasOwnProperty(t) && (o[t] = e[t]);
                document.body.appendChild(o.$el),
                c().nextTick((function() {
                    o.visible = !0
                }
                ))
            }
        }, k = function(e) {
            return new Promise((function(t, n) {
                i = {
                    options: Object.assign({}, m, e),
                    callback: g,
                    resolve: t,
                    reject: n
                },
                y(i.options)
            }
            ))
        };
        k.alert = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
              , n = t.subMessage
              , o = void 0 === n ? "" : n
              , i = t.confirmButtonText
              , r = void 0 === i ? "\u786e\u5b9a" : i
              , c = t.validator
              , a = void 0 === c ? null : c
              , s = t.showCheckbox
              , l = void 0 !== s && s
              , u = t.checkList
              , d = void 0 === u ? [] : u
              , f = t.checkItemClickCallback
              , h = void 0 === f ? null : f
              , p = t.subPrelineWrap
              , m = void 0 !== p && p;
            return k({
                message: e,
                subMessage: o,
                confirmButtonText: r,
                showConfirmButton: !0,
                showCancelButton: !1,
                validator: a,
                showCheckbox: l,
                checkList: d,
                checkItemClickCallback: h,
                subPrelineWrap: m
            })
        }
        ,
        k.confirm = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
              , n = t.subMessage
              , o = void 0 === n ? "" : n
              , i = t.confirmButtonText
              , r = void 0 === i ? "\u786e\u5b9a" : i
              , c = t.cancelButtonText
              , a = void 0 === c ? "\u53d6\u6d88" : c
              , s = t.reverseBtn
              , l = void 0 !== s && s;
            return k({
                message: e,
                subMessage: o,
                confirmButtonText: r,
                cancelButtonText: a,
                showConfirmButton: !0,
                showCancelButton: !0,
                reverseBtn: l
            })
        }
        ,
        k.back = function() {
            return !(!o || !o.visible) && (o.close("cancel"),
            !0)
        }
        ,
        k.install = function(e) {
            e.prototype.$MessageBox = k,
            e.prototype.$closeMessageBox = k.back,
            e.prototype.$alert = k.alert,
            e.prototype.$confirm = k.confirm
        }
        ;
        var w = k
    },
    91852: function(e, t, n) {
        n.d(t, {
            Z: function() {
                return C
            }
        });
        var o, i, r = n(47969), c = n.n(r), a = function() {
            var e = this
              , t = e._self._c;
            return t("transition", {
                attrs: {
                    name: "bili-toast"
                }
            }, [t("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.visible,
                    expression: "visible"
                }],
                class: {
                    "no-cover": e.noCover
                },
                attrs: {
                    id: "bili-toast-container"
                }
            }, [t("div", {
                staticClass: "bili-toast-content",
                style: e.style,
                domProps: {
                    innerHTML: e._s(e.message)
                }
            })])])
        }, s = [], l = n(87445), u = n(52053), d = (0,
        u.Z)(), f = {
            data: function() {
                return {
                    message: "",
                    visible: !1,
                    duration: 1e3,
                    noCover: !1,
                    delay: 0,
                    style: {},
                    addLog: !1
                }
            },
            updated: function() {
                var e = this;
                if (this.visible && (void 0 !== o && clearTimeout(o),
                o = setTimeout((function() {
                    console.log("hide"),
                    e.visible = !1
                }
                ), this.duration + this.delay)),
                this.addLog)
                    try {
                        l.Z.addShowLog("mall.ticket-detail.buy.toast.show", this.$el, {
                            itemid: d.id,
                            toast: this.message
                        })
                    } catch (t) {}
            }
        }, h = f, p = n(51900), m = (0,
        p.Z)(h, a, s, !1, null, "c7ffd188", null), b = m.exports, v = {
            message: "",
            duration: 1e3,
            delay: 0,
            style: {}
        }, g = c().extend(b), y = function() {
            i = new g({
                el: document.createElement("div")
            })
        }, k = function e(t) {
            if (i || y(),
            i.visible)
                i.visible = !1,
                e(t);
            else {
                for (var n in t)
                    t.hasOwnProperty(n) && (i[n] = t[n]);
                document.body.appendChild(i.$el),
                c().nextTick((function() {
                    i.visible = !0
                }
                ))
            }
        }, w = function e(t) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2e3
              , o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 100
              , i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3]
              , r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
            k(Object.assign({}, v, {
                message: t,
                delay: o,
                duration: n,
                noCover: i,
                style: r,
                addLog: e.addLog
            }))
        };
        w.install = function(e) {
            e.prototype.$toast = w
        }
        ,
        w.addLog = !1;
        var C = w
    },
    10259: function(e, t, n) {
        n.d(t, {
            $1: function() {
                return h
            },
            O7: function() {
                return m
            },
            bX: function() {
                return d
            },
            ix: function() {
                return f
            },
            kT: function() {
                return p
            }
        });
        var o = n(4115)
          , i = n.n(o)
          , r = n(3486)
          , c = n.n(r)
          , a = n(70983)
          , s = n.n(a);
        function l(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(e);
                t && (o = o.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, o)
            }
            return n
        }
        function u(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? l(Object(n), !0).forEach((function(t) {
                    i()(e, t, n[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : l(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }
                ))
            }
            return e
        }
        var d = function() {
            function e() {
                c()(this, e)
            }
            return s()(e, null, [{
                key: "set",
                value: function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {
                        expires: 0,
                        domain: ".bilibili.com",
                        path: "/"
                    }
                      , o = u({
                        expires: 0,
                        domain: ".bilibili.com",
                        path: "/"
                    }, n)
                      , i = o.expires
                      , r = o.domain
                      , c = o.path;
                    document.cookie = ["".concat(e, "=").concat(encodeURIComponent(t)), c && "path=/", r && "domain=.bilibili.com", i && "expires=".concat(new Date(Date.now() + i).toGMTString())].filter(Boolean).join(";")
                }
            }, {
                key: "get",
                value: function(e) {
                    var t = new RegExp("(?:(?:^|.*;\\s*)".concat(e, "\\s*=\\s*([^;]*).*$)|^.*$"));
                    return decodeURIComponent(document.cookie.replace(t, "$1"))
                }
            }, {
                key: "del",
                value: function(t) {
                    var n = e.get("key");
                    n && (document.cookie = "".concat(t, "=").concat(n, ";expires=").concat(new Date(0).toGMTString()))
                }
            }]),
            e
        }();
        function f(e) {
            if (!/.+=.+/.test(e))
                throw new Error('setCookies function accept a "key=value" string');
            e && (document.cookie = "".concat(e, ";path=/;domain=.bilibili.com"))
        }
        function h(e) {
            var t = new RegExp("(?:(?:^|.*;\\s*)".concat(e, "\\s*=\\s*([^;]*).*$)|^.*$"));
            return document.cookie.replace(t, "$1")
        }
        function p(e) {
            var t = new Date;
            t.setTime(t.getTime() - 1);
            var n = h(e);
            null != n && (document.cookie = "".concat(e, "=").concat(n, ";expires=").concat(t.toGMTString()))
        }
        function m(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (!/.+=.+/.test(e))
                throw new Error('setCookies function accept a "key=value" string');
            if (e) {
                var n = 60 * (t.time || 1) * 1e3;
                n += +new Date,
                document.cookie = "".concat(e, ";expires=").concat(new Date(n).toGMTString(), ";path=/;domain=bilibili.com")
            }
        }
    },
    52053: function(e, t) {
        t.Z = function() {
            var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0]
              , t = e ? decodeURIComponent(location.search) : location.search
              , n = new window.Object;
            if (-1 !== t.indexOf("?"))
                for (var o, i = t.substr(1), r = i.split("&"), c = 0; c < r.length; c++)
                    o = r[c].indexOf("="),
                    n[r[c].split("=")[0]] = e ? r[c].substr(o + 1) : decodeURIComponent(r[c].substr(o + 1));
            return n
        }
    },
    87445: function(e, t, n) {
        var o = n(66970)
          , i = n.n(o)
          , r = n(19073)
          , c = n.n(r)
          , a = n(4115)
          , s = n.n(a)
          , l = (n(157),
        n(53111))
          , u = n(52053)
          , d = n(10259);
        function f(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(e);
                t && (o = o.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, o)
            }
            return n
        }
        function h(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? f(Object(n), !0).forEach((function(t) {
                    s()(e, t, n[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : f(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }
                ))
            }
            return e
        }
        var p = "";
        try {
            p = (0,
            u.Z)()["msource"] || d.bX.get("kfcSource")
        } catch (x) {}
        var m = function(e) {
            l.logger.addLog(e)
        }
          , b = function(e) {
            var t = e.logger
              , n = e.extra
              , o = ("string" === typeof t ? t : "").split(".")
              , i = {
                pv: 1,
                click: 2,
                show: 3,
                sys: 4,
                track: 5,
                player: 9,
                other: 7
            }[o[o.length - 1]] || 2;
            l.logger.addClickLog({
                logger: t,
                extra: h(h({}, n || {}), {}, {
                    msource: p
                }),
                type: i
            })
        }
          , v = null
          , g = []
          , y = {
            threshold: [0],
            rootMargin: "0px"
        }
          , k = function(e) {
            e.forEach((function(e) {
                if (e.isIntersecting) {
                    var t = g.filter((function(t) {
                        return t[0] === e.target
                    }
                    ));
                    t.forEach((function(t) {
                        var n = c()(t, 2)
                          , o = (n[0],
                        n[1])
                          , i = o.loggerKey
                          , r = o.extra;
                        t && (l.logger.addClickLog({
                            logger: i,
                            extra: "function" === typeof r ? r() : r || {},
                            type: 3
                        }),
                        v.unobserve(e.target),
                        g.splice(g.indexOf(t), 1))
                    }
                    ))
                }
            }
            ))
        };
        function w(e) {
            e && "object" === i()(e) && Object.keys(e).forEach((function(t) {
                y[t] = e[t]
            }
            )),
            v && (v.disconnect(),
            v = new IntersectionObserver(k,y),
            g.forEach((function(e) {
                v.observe(e[0])
            }
            )))
        }
        function C(e, t, n) {
            try {
                IntersectionObserver && !v && (v = new IntersectionObserver(k,y)),
                v.observe && v.observe(t),
                g.push([t, {
                    loggerKey: e,
                    extra: n
                }])
            } catch (x) {
                console.error(x)
            }
        }
        var O = {
            delay: 0,
            autoUnobserve: !0,
            cb: null
        };
        function P(e, t, n) {
            var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : h({}, O)
              , i = null
              , r = null
              , c = null;
            try {
                if (!IntersectionObserver)
                    return null;
                i = new IntersectionObserver((function(t) {
                    t.forEach((function(t) {
                        o.delay ? (r = t,
                        t.isIntersecting && (clearTimeout(c),
                        c = setTimeout((function() {
                            r.isIntersecting && (l.logger.addClickLog({
                                loggerKey: e,
                                extra: n,
                                type: 3
                            }),
                            o.autoUnobserve && i.unobserve(t.target),
                            o.cb && o.cb())
                        }
                        ), o.delay))) : t.isIntersecting && (l.logger.addClickLog({
                            logger: e,
                            extra: n,
                            type: 3
                        }),
                        o.autoUnobserve && i.unobserve(t.target),
                        o.cb && o.cb())
                    }
                    ))
                }
                ),o || [0]),
                i.observe(t)
            } catch (x) {}
            return i
        }
        t.Z = {
            addPvLog: m,
            addClickLog: b,
            addShowLog: C,
            addCustomShowLog: P,
            setObserverOption: w
        }
    },
    54717: function(e, t, n) {
        n.r(t),
        n.d(t, {
            isNeulNextPath: function() {
                return c
            },
            isObject: function() {
                return r
            }
        });
        var o = n(66970)
          , i = n.n(o);
        function r(e) {
            return "object" === i()(e) && null !== e
        }
        var c = location.pathname.indexOf("/neul-next/ticket") > -1;
        function a() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return Object.keys(e).map((function(t) {
                if (void 0 === e[t])
                    return null;
                var n = e[t];
                return "".concat(t, "=").concat(encodeURIComponent(r(n) ? JSON.stringify(n) : n))
            }
            )).filter(Boolean).join("&")
        }
        var s = function(e) {
            var t = e.match(new RegExp("[?&][^?&]+=[^?&]+","g"));
            if (null == t)
                return "";
            for (var n = 0; n < t.length; n++)
                t[n] = t[n].substring(1);
            return t.join("&")
        }
          , l = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : []
              , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
              , o = n.legacy
              , i = n.renovation
              , r = "";
            "string" === typeof t && (r = "&".concat(t.split("&").map((function(e) {
                var t = e.split("=");
                return t[1] ? "".concat(t[0], "=").concat(encodeURIComponent(decodeURIComponent(t[1]))) : ""
            }
            )).join("&"))),
            t instanceof Array && t.forEach((function(e) {
                var t = e.split("=");
                t[1] && (r += "&".concat(t[0], "=").concat(encodeURIComponent(decodeURIComponent(t[1]))))
            }
            ));
            var c = "//mall.bilibili.com/neul-next"
              , a = "".concat(window.location.protocol).concat(c, "/index.html?page=").concat(i ? "ticket-renovation" : "ticket", "_").concat(e).concat(r)
              , s = "".concat(window.location.protocol).concat(c, "/").concat(i ? "ticket-renovation" : "ticket", "/").concat(e, ".html").concat(r.replace(/^&/, "?"));
            return o ? a.replace("neul-next", "neul") : s
        };
        l.obj2Query = a,
        l.getQueryByUrl = s,
        t["default"] = l
    },
    18165: function(e, t, n) {
        var o = n(10271)
          , i = n.n(o)
          , r = n(52053)
          , c = n(10259)
          , a = 0
          , s = (0,
        r.Z)()
          , l = i().UA
          , u = l.isBiliApp
          , d = l.isAndroid
          , f = l.isiOS
          , h = l.appBuild
          , p = l.appVersion
          , m = l.isiOSBiliBlue
          , b = u && f && p >= h.ios534 || f && m && p >= 7340 || d && p >= h.android534 || "android_i" === p;
        b && (a = +(s.themeType || (0,
        c.$1)("themeType") || 0));
        var v = 2 === a
          , g = function() {
            a && (document.body.classList.add("theme-".concat(a)),
            window.themeDidChange = function(e) {
                try {
                    var t = "theme-".concat(a);
                    document.body.classList.remove(t)
                } catch (n) {
                    console.log(n)
                }
                a = e.themeType,
                2 !== a && (a = 0),
                document.body.classList.add("theme-".concat(a))
            }
            )
        };
        t.Z = {
            themeType: a,
            isNightMode: v,
            initTheme: g
        }
    },
    43258: function(e, t, n) {
        n.r(t);
        var o = n(19073)
          , i = n.n(o)
          , r = n(4115)
          , c = n.n(r)
          , a = n(47969)
          , s = n.n(a)
          , l = n(37220)
          , u = n(5228)
          , d = n.n(u)
          , f = n(10271)
          , h = n.n(f)
          , p = {
            addComment: function() {
                return Promise.all([n.e(4827), n.e(5276)]).then(n.bind(n, 75276))
            },
            bindBuyer: function() {
                return Promise.all([n.e(4827), n.e(1011), n.e(6736)]).then(n.bind(n, 50375))
            },
            buyer: function() {
                return Promise.all([n.e(4827), n.e(1011), n.e(1264), n.e(1e3)]).then(n.bind(n, 1264))
            },
            buyerList: function() {
                return Promise.all([n.e(4827), n.e(1011), n.e(1264), n.e(1254), n.e(3987)]).then(n.bind(n, 33987))
            },
            buyerRepair: function() {
                return Promise.all([n.e(4827), n.e(1254), n.e(1905)]).then(n.bind(n, 61905))
            },
            checkSeat: function() {
                return Promise.all([n.e(4827), n.e(1341), n.e(4299), n.e(8025), n.e(8593), n.e(256), n.e(4269), n.e(5583)]).then(n.bind(n, 44829))
            },
            citySelect: function() {
                return Promise.all([n.e(4827), n.e(91)]).then(n.bind(n, 90091))
            },
            collection: function() {
                return Promise.all([n.e(4827), n.e(7634), n.e(4301)]).then(n.bind(n, 84301))
            },
            commentDetail: function() {
                return Promise.all([n.e(6667), n.e(9941), n.e(4827), n.e(7286), n.e(9242), n.e(4771), n.e(4254), n.e(1250)]).then(n.bind(n, 41250))
            },
            commentList: function() {
                return Promise.all([n.e(6667), n.e(9941), n.e(4827), n.e(7286), n.e(9242), n.e(4771), n.e(4254), n.e(2820)]).then(n.bind(n, 42820))
            },
            confirmOrder: function() {
                return Promise.all([n.e(5892), n.e(4827), n.e(1341), n.e(6832), n.e(4299), n.e(8258), n.e(4269), n.e(5206), n.e(7449)]).then(n.bind(n, 28232))
            },
            coserRegister: function() {
                return Promise.all([n.e(6667), n.e(4827), n.e(7286), n.e(1341), n.e(6832), n.e(6426), n.e(553), n.e(1257)]).then(n.bind(n, 91257))
            },
            detail: function() {
                return Promise.all([n.e(6667), n.e(9941), n.e(4827), n.e(7286), n.e(1341), n.e(6832), n.e(6446), n.e(9242), n.e(1011), n.e(4299), n.e(8025), n.e(1264), n.e(8593), n.e(6433), n.e(1695), n.e(8258), n.e(256), n.e(4909), n.e(1098), n.e(5565)]).then(n.bind(n, 22296))
            },
            detailLegecy: function() {
                return Promise.all([n.e(6667), n.e(4827), n.e(7286), n.e(6832), n.e(6446), n.e(4299), n.e(4909), n.e(7810)]).then(n.bind(n, 71393))
            },
            eTicket: function() {
                return Promise.all([n.e(9941), n.e(4827), n.e(9242), n.e(7022), n.e(2076), n.e(7182)]).then(n.bind(n, 77182))
            },
            endedList: function() {
                return Promise.all([n.e(4827), n.e(3190), n.e(5672)]).then(n.bind(n, 57548))
            },
            errFeedback: function() {
                return Promise.all([n.e(4827), n.e(2729), n.e(9620)]).then(n.bind(n, 9620))
            },
            exchange: function() {
                return Promise.all([n.e(4827), n.e(2490)]).then(n.bind(n, 52490))
            },
            faceVerify: function() {
                return Promise.all([n.e(4827), n.e(6446), n.e(8551)]).then(n.bind(n, 58551))
            },
            feedback: function() {
                return Promise.all([n.e(4827), n.e(6426), n.e(3951)]).then(n.bind(n, 83951))
            },
            goodsList: function() {
                return Promise.all([n.e(4827), n.e(1341), n.e(8025), n.e(1695), n.e(2888)]).then(n.bind(n, 99185))
            },
            guestDetail: function() {
                return Promise.all([n.e(6446), n.e(8319)]).then(n.bind(n, 98319))
            },
            guestList: function() {
                return Promise.all([n.e(4827), n.e(4593)]).then(n.bind(n, 14593))
            },
            home: function() {
                return Promise.all([n.e(5279), n.e(4827), n.e(6446), n.e(7634), n.e(4405), n.e(2996)]).then(n.bind(n, 11629))
            },
            invitation: function() {
                return Promise.all([n.e(4827), n.e(1341), n.e(3589), n.e(1593)]).then(n.bind(n, 21593))
            },
            maptool: function() {
                return Promise.all([n.e(4827), n.e(6733)]).then(n.bind(n, 56733))
            },
            merchantProjects: function() {
                return n.e(9565).then(n.bind(n, 29565))
            },
            moreList: function() {
                return Promise.all([n.e(6446), n.e(4405), n.e(736)]).then(n.bind(n, 78194))
            },
            orderDetail: function() {
                return Promise.all([n.e(9941), n.e(4827), n.e(6832), n.e(9242), n.e(3589), n.e(7022), n.e(6433), n.e(2076), n.e(3718)]).then(n.bind(n, 73718))
            },
            pandemicRefund: function() {
                return Promise.all([n.e(6667), n.e(4827), n.e(7286), n.e(6426), n.e(553), n.e(9165)]).then(n.bind(n, 19165))
            },
            payResult: function() {
                return Promise.all([n.e(4827), n.e(1341), n.e(6433), n.e(1098), n.e(2729), n.e(8083)]).then(n.bind(n, 13764))
            },
            ptDetail: function() {
                return Promise.all([n.e(4827), n.e(3589), n.e(8025), n.e(3190), n.e(1434)]).then(n.bind(n, 17918))
            },
            ptRule: function() {
                return Promise.all([n.e(4827), n.e(6449)]).then(n.bind(n, 6449))
            },
            redirect: function() {
                return n.e(2031).then(n.bind(n, 11695))
            },
            refundDetail: function() {
                return Promise.all([n.e(4827), n.e(1510)]).then(n.bind(n, 21510))
            },
            refundRequest: function() {
                return Promise.all([n.e(4827), n.e(766)]).then(n.bind(n, 50766))
            },
            subscribe: function() {
                return n.e(5049).then(n.bind(n, 95049))
            },
            subscribeCity: function() {
                return n.e(1380).then(n.bind(n, 51380))
            },
            subscribeGuest: function() {
                return n.e(9502).then(n.bind(n, 99502))
            },
            ticketHistory: function() {
                return Promise.all([n.e(4827), n.e(7398)]).then(n.bind(n, 7398))
            },
            movieCheckSeat: function() {
                return Promise.all([n.e(4827), n.e(8593), n.e(6577)]).then(n.bind(n, 66577))
            },
            movieConfirmOrder: function() {
                return Promise.all([n.e(4827), n.e(5206), n.e(6300)]).then(n.bind(n, 46300))
            },
            movieFilmInfo: function() {
                return Promise.all([n.e(6667), n.e(4827), n.e(7286), n.e(6832), n.e(4771), n.e(3149)]).then(n.bind(n, 63149))
            },
            movieHome: function() {
                return Promise.all([n.e(4827), n.e(7634), n.e(768)]).then(n.bind(n, 10768))
            },
            movieTheaterDetail: function() {
                return Promise.all([n.e(9941), n.e(4827), n.e(9242), n.e(8923)]).then(n.bind(n, 8923))
            },
            movieTheaterList: function() {
                return Promise.all([n.e(4827), n.e(7793)]).then(n.bind(n, 57793))
            },
            movieorderDetail: function() {
                return Promise.all([n.e(4827), n.e(3589), n.e(7022), n.e(1223)]).then(n.bind(n, 21223))
            }
        }
          , m = function() {
            var e, t, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = location.search.match(/(?:\?|&)page=([^&]*)(&|$)/i) || [], r = i()(o, 2), c = r[1], a = void 0 === c ? "" : c, l = a.split("_"), u = i()(l, 2), d = u[0], f = u[1];
            if (!a) {
                var h = location.pathname.match(/neul-next\/([^/|.]*)\/([^/|.]*)(\.html)?$/i) || []
                  , m = i()(h, 3);
                d = m[1],
                f = m[2]
            }
            p[f] ? ((null === n || void 0 === n || !n.customSentry) && window.Sentry && null !== (e = window.__neul__) && void 0 !== e && null !== (t = e.application) && void 0 !== t && t.sentry && ["pre", "prod"].includes(window.__neul__.env) && window.Sentry.init({
                Vue: s()
            }),
            p[f]().then((function(e) {
                new (s())({
                    render: function(t) {
                        return t(e.default)
                    }
                }).$mount("#app")
            }
            ))) : window.dispatchEvent(new CustomEvent("neulPageNotFound",{
                detail: {
                    notFound: "page",
                    application: d,
                    page: f
                }
            }))
        }
          , b = n(91852)
          , v = n(73545)
          , g = n(10259)
          , y = n(52053)
          , k = n(18291)
          , w = n(54717);
        function C(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(e);
                t && (o = o.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, o)
            }
            return n
        }
        function O(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? C(Object(n), !0).forEach((function(t) {
                    c()(e, t, n[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : C(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }
                ))
            }
            return e
        }
        s().use(b.Z),
        s().use(v.Z);
        try {
            d().init("149afd631693c895f81e508eb5aaef37", {
                ReportJsErrorPCT: 100
            }),
            s().use(d().VueErrorPlugin)
        } catch (_) {
            console.error(_)
        }
        function P() {
            var e = (0,
            y.Z)()
              , t = /[\u4e00-\u9fa5\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]/g
              , n = e.from;
            n && (t.test(n) && (n = encodeURIComponent(n)),
            g.ix("kfcFrom=".concat(n)),
            g.ix("from=".concat(n)));
            var o = e.msource;
            o && (t.test(o) && (o = encodeURIComponent(o)),
            g.ix("kfcSource=".concat(o)),
            g.ix("msource=".concat(o))),
            e.activityid && g.ix("kfcActivityId=".concat(e.activityid)),
            g.$1("deviceFingerprint") || (0,
            l.getAppFingerPointer)().then((function(e) {
                g.O7("deviceFingerprint=".concat(e))
            }
            )).catch((function() {}
            ));
            var i = h().exec;
            h().exec = function() {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                    t[n] = arguments[n];
                var o = t[0]
                  , r = t[1];
                return "goLogin" === o ? i.apply(this, ["goLogin", O(O({}, r || {}), {}, {
                    useMiniLogin: h().UA.isMissEvan
                })]) : i.apply(this, t)
            }
        }
        try {
            P(),
            document.title = "\u6f2b\u5c55\u6f14\u51fa"
        } catch (_) {
            console.error(_)
        }
        m();
        try {
            var x = new k.KvStore({
                appKey: "448.7692",
                nscode: 0,
                strict: k.STRICT_MODE.STRICT
            });
            x.getGroup("general").then((function(e) {
                window.TICKET_CONFIG_GENERAL = e || {};
                var t = window.TICKET_CONFIG_GENERAL.redirect_to_legacy;
                if (t && "true" === t) {
                    var n = location.href.match(/neul-next\/ticket\/(\w+)\.html/) || []
                      , o = i()(n, 2)
                      , r = (o[0],
                    o[1])
                      , c = location.href.match(/page=ticket_(\w+)/) || []
                      , a = i()(c, 2)
                      , s = (a[0],
                    a[1]);
                    if (r || s) {
                        var l = (0,
                        w["default"])(r || s, location.search.replace("?", "").replace(/page=ticket_(\w+)/, ""), {
                            legacy: !0
                        });
                        window.location.replace(l)
                    }
                }
            }
            ))
        } catch (_) {
            console.error(_)
        }
    },
    41677: function(e, t, n) {
        n.d(t, {
            Z: function() {
                return u
            }
        });
        var o = function() {
            var e = this
              , t = e._self._c;
            return t("div", {
                staticClass: "bili-button-container bili-button",
                class: [{
                    "press-down": e.pressed,
                    "night-mode": e.isNightMode,
                    "is-disabled": e.disable
                }, "bili-button-type-".concat(e.type), "bili-button-size-".concat(e.size)],
                attrs: {
                    role: e.buttonRole ? "button" : null
                },
                on: {
                    touchstart: e.touchStart,
                    touchend: e.touchEnd,
                    click: e.handleClick
                }
            }, [e._t("default")], 2)
        }
          , i = []
          , r = n(18165)
          , c = {
            name: "BiliButton",
            props: {
                type: {
                    type: String,
                    default: "default",
                    validator: function(e) {
                        return -1 !== ["default", "primary", "text", "cancel", "highlight", "custom", "plain"].indexOf(e)
                    }
                },
                size: {
                    type: String,
                    default: "normal",
                    validator: function(e) {
                        return -1 !== ["normal", "small", "mini", "custom"].indexOf(e)
                    }
                },
                plain: {
                    type: Boolean,
                    default: !1
                },
                disable: {
                    type: Boolean,
                    default: !1
                },
                buttonRole: {
                    type: Boolean,
                    default: !1
                }
            },
            data: function() {
                return {
                    pressed: !1,
                    isNightMode: r.Z.isNightMode
                }
            },
            methods: {
                touchStart: function() {
                    this.disable || (this.pressed = !0)
                },
                touchEnd: function() {
                    this.disable || (this.pressed = !1)
                },
                handleClick: function(e) {
                    this.$emit("click", e)
                }
            }
        }
          , a = c
          , s = n(51900)
          , l = (0,
        s.Z)(a, o, i, !1, null, "096a6592", null)
          , u = l.exports
    },
    51900: function(e, t, n) {
        function o(e, t, n, o, i, r, c, a) {
            var s, l = "function" === typeof e ? e.options : e;
            if (t && (l.render = t,
            l.staticRenderFns = n,
            l._compiled = !0),
            o && (l.functional = !0),
            r && (l._scopeId = "data-v-" + r),
            c ? (s = function(e) {
                e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext,
                e || "undefined" === typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__),
                i && i.call(this, e),
                e && e._registeredComponents && e._registeredComponents.add(c)
            }
            ,
            l._ssrRegister = s) : i && (s = a ? function() {
                i.call(this, (l.functional ? this.parent : this).$root.$options.shadowRoot)
            }
            : i),
            s)
                if (l.functional) {
                    l._injectStyles = s;
                    var u = l.render;
                    l.render = function(e, t) {
                        return s.call(t),
                        u(e, t)
                    }
                } else {
                    var d = l.beforeCreate;
                    l.beforeCreate = d ? [].concat(d, s) : [s]
                }
            return {
                exports: e,
                options: l
            }
        }
        n.d(t, {
            Z: function() {
                return o
            }
        })
    }
}]);
//# sourceMappingURL=http://boss.bilibili.co/mall_sourcemap/static/neul-project-ticket/h5/c2ece7cb40f5d29340c8c63db27ed2fbe38e1d40/4732.js.map
