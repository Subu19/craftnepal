/* eslint-disable no-unused-expressions, no-undef, no-restricted-globals */

import React, { useEffect } from "react";

const CreeperLoading = () => {
    useEffect(() => {
        !(function (t, n) {
            "object" == typeof exports && "undefined" != typeof module
                ? (module.exports = n())
                : "function" == typeof __SVGATOR_DEFINE__ && __SVGATOR_DEFINE__.amd
                ? __SVGATOR_DEFINE__(n)
                : (((t = "undefined" != typeof globalThis ? globalThis : t || self).__SVGATOR_PLAYER__ = t.__SVGATOR_PLAYER__ || {}),
                  (t.__SVGATOR_PLAYER__["5c7f360c"] = n()));
        })(this, function () {
            "use strict";
            function t(t, n) {
                var e = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(t);
                    n &&
                        (r = r.filter(function (n) {
                            return Object.getOwnPropertyDescriptor(t, n).enumerable;
                        })),
                        e.push.apply(e, r);
                }
                return e;
            }
            function n(n) {
                for (var e = 1; e < arguments.length; e++) {
                    var r = null != arguments[e] ? arguments[e] : {};
                    e % 2
                        ? t(Object(r), !0).forEach(function (t) {
                              o(n, t, r[t]);
                          })
                        : Object.getOwnPropertyDescriptors
                        ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(r))
                        : t(Object(r)).forEach(function (t) {
                              Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(r, t));
                          });
                }
                return n;
            }
            function e(t) {
                return (e =
                    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                        ? function (t) {
                              return typeof t;
                          }
                        : function (t) {
                              return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                          })(t);
            }
            function r(t, n) {
                if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
            }
            function i(t, n) {
                for (var e = 0; e < n.length; e++) {
                    var r = n[e];
                    (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
                }
            }
            function u(t, n, e) {
                return n && i(t.prototype, n), e && i(t, e), t;
            }
            function o(t, n, e) {
                return (
                    n in t
                        ? Object.defineProperty(t, n, {
                              value: e,
                              enumerable: !0,
                              configurable: !0,
                              writable: !0,
                          })
                        : (t[n] = e),
                    t
                );
            }
            function a(t) {
                return (a = Object.setPrototypeOf
                    ? Object.getPrototypeOf
                    : function (t) {
                          return t.__proto__ || Object.getPrototypeOf(t);
                      })(t);
            }
            function l(t, n) {
                return (l =
                    Object.setPrototypeOf ||
                    function (t, n) {
                        return (t.__proto__ = n), t;
                    })(t, n);
            }
            function s() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
                } catch (t) {
                    return !1;
                }
            }
            function f(t, n, e) {
                return (f = s()
                    ? Reflect.construct
                    : function (t, n, e) {
                          var r = [null];
                          r.push.apply(r, n);
                          var i = new (Function.bind.apply(t, r))();
                          return e && l(i, e.prototype), i;
                      }).apply(null, arguments);
            }
            function c(t, n) {
                if (n && ("object" == typeof n || "function" == typeof n)) return n;
                if (void 0 !== n) throw new TypeError("Derived constructors may only return object or undefined");
                return (function (t) {
                    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return t;
                })(t);
            }
            function h(t, n, e) {
                return (h =
                    "undefined" != typeof Reflect && Reflect.get
                        ? Reflect.get
                        : function (t, n, e) {
                              var r = (function (t, n) {
                                  for (; !Object.prototype.hasOwnProperty.call(t, n) && null !== (t = a(t)); );
                                  return t;
                              })(t, n);
                              if (r) {
                                  var i = Object.getOwnPropertyDescriptor(r, n);
                                  return i.get ? i.get.call(e) : i.value;
                              }
                          })(t, n, e || t);
            }
            function v(t) {
                return (
                    (function (t) {
                        if (Array.isArray(t)) return y(t);
                    })(t) ||
                    (function (t) {
                        if (("undefined" != typeof Symbol && null != t[Symbol.iterator]) || null != t["@@iterator"]) return Array.from(t);
                    })(t) ||
                    (function (t, n) {
                        if (!t) return;
                        if ("string" == typeof t) return y(t, n);
                        var e = Object.prototype.toString.call(t).slice(8, -1);
                        "Object" === e && t.constructor && (e = t.constructor.name);
                        if ("Map" === e || "Set" === e) return Array.from(t);
                        if ("Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return y(t, n);
                    })(t) ||
                    (function () {
                        throw new TypeError(
                            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                        );
                    })()
                );
            }
            function y(t, n) {
                (null == n || n > t.length) && (n = t.length);
                for (var e = 0, r = new Array(n); e < n; e++) r[e] = t[e];
                return r;
            }
            Number.isInteger ||
                (Number.isInteger = function (t) {
                    return "number" == typeof t && isFinite(t) && Math.floor(t) === t;
                }),
                Number.EPSILON || (Number.EPSILON = 2220446049250313e-31);
            var g = d(Math.pow(10, -6));
            function d(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 6;
                if (Number.isInteger(t)) return t;
                var e = Math.pow(10, n);
                return Math.round((+t + Number.EPSILON) * e) / e;
            }
            function p(t, n) {
                var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : g;
                return Math.abs(t - n) < e;
            }
            var m = Math.PI / 180;
            function b(t) {
                return t;
            }
            function w(t, n, e) {
                var r = 1 - e;
                return 3 * e * r * (t * r + n * e) + e * e * e;
            }
            function A() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                    e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
                    r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1;
                return t < 0 || t > 1 || e < 0 || e > 1
                    ? null
                    : p(t, n) && p(e, r)
                    ? b
                    : function (i) {
                          if (i <= 0) return t > 0 ? (i * n) / t : 0 === n && e > 0 ? (i * r) / e : 0;
                          if (i >= 1) return e < 1 ? 1 + ((i - 1) * (r - 1)) / (e - 1) : 1 === e && t < 1 ? 1 + ((i - 1) * (n - 1)) / (t - 1) : 1;
                          for (var u, o = 0, a = 1; o < a; ) {
                              var l = w(t, e, (u = (o + a) / 2));
                              if (p(i, l)) break;
                              l < i ? (o = u) : (a = u);
                          }
                          return w(n, r, u);
                      };
            }
            function _() {
                return 1;
            }
            function x(t) {
                return 1 === t ? 1 : 0;
            }
            function k() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                if (1 === t) {
                    if (0 === n) return x;
                    if (1 === n) return _;
                }
                var e = 1 / t;
                return function (t) {
                    return t >= 1 ? 1 : (t += n * e) - (t % e);
                };
            }
            var S = Math.sin,
                O = Math.cos,
                j = Math.acos,
                E = Math.asin,
                M = Math.tan,
                P = Math.atan2,
                I = Math.PI / 180,
                R = 180 / Math.PI,
                F = Math.sqrt,
                N = (function () {
                    function t() {
                        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
                            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                            i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                            u = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1,
                            o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
                            a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
                        r(this, t), (this.m = [n, e, i, u, o, a]), (this.i = null), (this.w = null), (this.s = null);
                    }
                    return (
                        u(
                            t,
                            [
                                {
                                    key: "determinant",
                                    get: function () {
                                        var t = this.m;
                                        return t[0] * t[3] - t[1] * t[2];
                                    },
                                },
                                {
                                    key: "isIdentity",
                                    get: function () {
                                        if (null === this.i) {
                                            var t = this.m;
                                            this.i = 1 === t[0] && 0 === t[1] && 0 === t[2] && 1 === t[3] && 0 === t[4] && 0 === t[5];
                                        }
                                        return this.i;
                                    },
                                },
                                {
                                    key: "point",
                                    value: function (t, n) {
                                        var e = this.m;
                                        return {
                                            x: e[0] * t + e[2] * n + e[4],
                                            y: e[1] * t + e[3] * n + e[5],
                                        };
                                    },
                                },
                                {
                                    key: "translateSelf",
                                    value: function () {
                                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                                            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                                        if (!t && !n) return this;
                                        var e = this.m;
                                        return (e[4] += e[0] * t + e[2] * n), (e[5] += e[1] * t + e[3] * n), (this.w = this.s = this.i = null), this;
                                    },
                                },
                                {
                                    key: "rotateSelf",
                                    value: function () {
                                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                                        if ((t %= 360)) {
                                            var n = S((t *= I)),
                                                e = O(t),
                                                r = this.m,
                                                i = r[0],
                                                u = r[1];
                                            (r[0] = i * e + r[2] * n),
                                                (r[1] = u * e + r[3] * n),
                                                (r[2] = r[2] * e - i * n),
                                                (r[3] = r[3] * e - u * n),
                                                (this.w = this.s = this.i = null);
                                        }
                                        return this;
                                    },
                                },
                                {
                                    key: "scaleSelf",
                                    value: function () {
                                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
                                            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                                        if (1 !== t || 1 !== n) {
                                            var e = this.m;
                                            (e[0] *= t), (e[1] *= t), (e[2] *= n), (e[3] *= n), (this.w = this.s = this.i = null);
                                        }
                                        return this;
                                    },
                                },
                                {
                                    key: "skewSelf",
                                    value: function (t, n) {
                                        if (((n %= 360), (t %= 360) || n)) {
                                            var e = this.m,
                                                r = e[0],
                                                i = e[1],
                                                u = e[2],
                                                o = e[3];
                                            t && ((t = M(t * I)), (e[2] += r * t), (e[3] += i * t)),
                                                n && ((n = M(n * I)), (e[0] += u * n), (e[1] += o * n)),
                                                (this.w = this.s = this.i = null);
                                        }
                                        return this;
                                    },
                                },
                                {
                                    key: "resetSelf",
                                    value: function () {
                                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
                                            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                                            e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                                            r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1,
                                            i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
                                            u = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
                                            o = this.m;
                                        return (
                                            (o[0] = t),
                                            (o[1] = n),
                                            (o[2] = e),
                                            (o[3] = r),
                                            (o[4] = i),
                                            (o[5] = u),
                                            (this.w = this.s = this.i = null),
                                            this
                                        );
                                    },
                                },
                                {
                                    key: "recomposeSelf",
                                    value: function () {
                                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                                            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                                            e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                                            r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
                                            i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null;
                                        return (
                                            this.isIdentity || this.resetSelf(),
                                            t && (t.x || t.y) && this.translateSelf(t.x, t.y),
                                            n && this.rotateSelf(n),
                                            e && (e.x && this.skewSelf(e.x, 0), e.y && this.skewSelf(0, e.y)),
                                            !r || (1 === r.x && 1 === r.y) || this.scaleSelf(r.x, r.y),
                                            i && (i.x || i.y) && this.translateSelf(i.x, i.y),
                                            this
                                        );
                                    },
                                },
                                {
                                    key: "decompose",
                                    value: function () {
                                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                                            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                                            e = this.m,
                                            r = e[0] * e[0] + e[1] * e[1],
                                            i = [
                                                [e[0], e[1]],
                                                [e[2], e[3]],
                                            ],
                                            u = F(r);
                                        if (0 === u)
                                            return {
                                                origin: { x: d(e[4]), y: d(e[5]) },
                                                translate: { x: d(t), y: d(n) },
                                                scale: { x: 0, y: 0 },
                                                skew: { x: 0, y: 0 },
                                                rotate: 0,
                                            };
                                        (i[0][0] /= u), (i[0][1] /= u);
                                        var o = e[0] * e[3] - e[1] * e[2] < 0;
                                        o && (u = -u);
                                        var a = i[0][0] * i[1][0] + i[0][1] * i[1][1];
                                        (i[1][0] -= i[0][0] * a), (i[1][1] -= i[0][1] * a);
                                        var l = F(i[1][0] * i[1][0] + i[1][1] * i[1][1]);
                                        if (0 === l)
                                            return {
                                                origin: { x: d(e[4]), y: d(e[5]) },
                                                translate: { x: d(t), y: d(n) },
                                                scale: { x: d(u), y: 0 },
                                                skew: { x: 0, y: 0 },
                                                rotate: 0,
                                            };
                                        (i[1][0] /= l), (i[1][1] /= l), (a /= l);
                                        var s = 0;
                                        return (
                                            i[1][1] < 0 ? ((s = j(i[1][1]) * R), i[0][1] < 0 && (s = 360 - s)) : (s = E(i[0][1]) * R),
                                            o && (s = -s),
                                            (a = P(a, F(i[0][0] * i[0][0] + i[0][1] * i[0][1])) * R),
                                            o && (a = -a),
                                            {
                                                origin: { x: d(e[4]), y: d(e[5]) },
                                                translate: { x: d(t), y: d(n) },
                                                scale: { x: d(u), y: d(l) },
                                                skew: { x: d(a), y: 0 },
                                                rotate: d(s),
                                            }
                                        );
                                    },
                                },
                                {
                                    key: "clone",
                                    value: function () {
                                        var t = this.m;
                                        return new this.constructor(t[0], t[1], t[2], t[3], t[4], t[5]);
                                    },
                                },
                                {
                                    key: "toString",
                                    value: function () {
                                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : " ";
                                        if (null === this.s) {
                                            var n = this.m.map(function (t) {
                                                return d(t);
                                            });
                                            1 === n[0] && 0 === n[1] && 0 === n[2] && 1 === n[3]
                                                ? (this.s = "translate(" + n[4] + t + n[5] + ")")
                                                : (this.s = "matrix(" + n.join(t) + ")");
                                        }
                                        return this.s;
                                    },
                                },
                            ],
                            [
                                {
                                    key: "create",
                                    value: function (t) {
                                        return t
                                            ? Array.isArray(t)
                                                ? f(this, v(t))
                                                : t instanceof this
                                                ? t.clone()
                                                : new this().recomposeSelf(t.origin, t.rotate, t.skew, t.scale, t.translate)
                                            : new this();
                                    },
                                },
                            ]
                        ),
                        t
                    );
                })();
            function T(t, n, e) {
                return t >= 0.5 ? e : n;
            }
            function B(t, n, e) {
                return 0 === t || n === e ? n : t * (e - n) + n;
            }
            function q(t, n, e) {
                var r = B(t, n, e);
                return r <= 0 ? 0 : r;
            }
            function D(t, n, e) {
                var r = B(t, n, e);
                return r <= 0 ? 0 : r >= 1 ? 1 : r;
            }
            function L(t, n, e) {
                return 0 === t ? n : 1 === t ? e : { x: B(t, n.x, e.x), y: B(t, n.y, e.y) };
            }
            function C(t, n, e) {
                var r = (function (t, n, e) {
                    return Math.round(B(t, n, e));
                })(t, n, e);
                return r <= 0 ? 0 : r >= 255 ? 255 : r;
            }
            function V(t, n, e) {
                return 0 === t
                    ? n
                    : 1 === t
                    ? e
                    : {
                          r: C(t, n.r, e.r),
                          g: C(t, n.g, e.g),
                          b: C(t, n.b, e.b),
                          a: B(t, null == n.a ? 1 : n.a, null == e.a ? 1 : e.a),
                      };
            }
            function G(t, n) {
                for (var e = [], r = 0; r < t; r++) e.push(n);
                return e;
            }
            function z(t, n) {
                if (--n <= 0) return t;
                var e = (t = Object.assign([], t)).length;
                do {
                    for (var r = 0; r < e; r++) t.push(t[r]);
                } while (--n > 0);
                return t;
            }
            var Y,
                $ = (function () {
                    function t(n) {
                        r(this, t), (this.list = n), (this.length = n.length);
                    }
                    return (
                        u(t, [
                            {
                                key: "setAttribute",
                                value: function (t, n) {
                                    for (var e = this.list, r = 0; r < this.length; r++) e[r].setAttribute(t, n);
                                },
                            },
                            {
                                key: "removeAttribute",
                                value: function (t) {
                                    for (var n = this.list, e = 0; e < this.length; e++) n[e].removeAttribute(t);
                                },
                            },
                            {
                                key: "style",
                                value: function (t, n) {
                                    for (var e = this.list, r = 0; r < this.length; r++) e[r].style[t] = n;
                                },
                            },
                        ]),
                        t
                    );
                })(),
                U = /-./g,
                Q = function (t, n) {
                    return n.toUpperCase();
                };
            function H(t) {
                return "function" == typeof t ? t : T;
            }
            function J(t) {
                return t
                    ? "function" == typeof t
                        ? t
                        : Array.isArray(t)
                        ? (function (t) {
                              var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : b;
                              if (!Array.isArray(t)) return n;
                              switch (t.length) {
                                  case 1:
                                      return k(t[0]) || n;
                                  case 2:
                                      return k(t[0], t[1]) || n;
                                  case 4:
                                      return A(t[0], t[1], t[2], t[3]) || n;
                              }
                              return n;
                          })(t, null)
                        : (function (t, n) {
                              var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : b;
                              switch (t) {
                                  case "linear":
                                      return b;
                                  case "steps":
                                      return k(n.steps || 1, n.jump || 0) || e;
                                  case "bezier":
                                  case "cubic-bezier":
                                      return A(n.x1 || 0, n.y1 || 0, n.x2 || 0, n.y2 || 0) || e;
                              }
                              return e;
                          })(t.type, t.value, null)
                    : null;
            }
            function Z(t, n, e) {
                var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                    i = n.length - 1;
                if (t <= n[0].t) return r ? [0, 0, n[0].v] : n[0].v;
                if (t >= n[i].t) return r ? [i, 1, n[i].v] : n[i].v;
                var u,
                    o = n[0],
                    a = null;
                for (u = 1; u <= i; u++) {
                    if (!(t > n[u].t)) {
                        a = n[u];
                        break;
                    }
                    o = n[u];
                }
                return null == a
                    ? r
                        ? [i, 1, n[i].v]
                        : n[i].v
                    : o.t === a.t
                    ? r
                        ? [u, 1, a.v]
                        : a.v
                    : ((t = (t - o.t) / (a.t - o.t)), o.e && (t = o.e(t)), r ? [u, t, e(t, o.v, a.v)] : e(t, o.v, a.v));
            }
            function K(t, n) {
                var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                return t && t.length
                    ? "function" != typeof n
                        ? null
                        : ("function" != typeof e && (e = null),
                          function (r) {
                              var i = Z(r, t, n);
                              return null != i && e && (i = e(i)), i;
                          })
                    : null;
            }
            function W(t, n) {
                return t.t - n.t;
            }
            function X(t, n, r, i, u) {
                var o,
                    a = "@" === r[0],
                    l = "#" === r[0],
                    s = Y[r],
                    f = T;
                switch ((a ? ((o = r.substr(1)), (r = o.replace(U, Q))) : l && (r = r.substr(1)), e(s))) {
                    case "function":
                        if (((f = s(i, u, Z, J, r, a, n, t)), l)) return f;
                        break;
                    case "string":
                        f = K(i, H(s));
                        break;
                    case "object":
                        if ((f = K(i, H(s.i), s.f)) && "function" == typeof s.u) return s.u(n, f, r, a, t);
                }
                return f
                    ? (function (t, n, e) {
                          if (arguments.length > 3 && void 0 !== arguments[3] && arguments[3])
                              return t instanceof $
                                  ? function (r) {
                                        return t.style(n, e(r));
                                    }
                                  : function (r) {
                                        return (t.style[n] = e(r));
                                    };
                          if (Array.isArray(n)) {
                              var r = n.length;
                              return function (i) {
                                  var u = e(i);
                                  if (null == u) for (var o = 0; o < r; o++) t[o].removeAttribute(n);
                                  else for (var a = 0; a < r; a++) t[a].setAttribute(n, u);
                              };
                          }
                          return function (r) {
                              var i = e(r);
                              null == i ? t.removeAttribute(n) : t.setAttribute(n, i);
                          };
                      })(n, r, f, a)
                    : null;
            }
            function tt(t, n, r, i) {
                if (!i || "object" !== e(i)) return null;
                var u = null,
                    o = null;
                return (
                    Array.isArray(i)
                        ? (o = (function (t) {
                              if (!t || !t.length) return null;
                              for (var n = 0; n < t.length; n++) t[n].e && (t[n].e = J(t[n].e));
                              return t.sort(W);
                          })(i))
                        : ((o = i.keys), (u = i.data || null)),
                    o ? X(t, n, r, o, u) : null
                );
            }
            function nt(t, n, e) {
                if (!e) return null;
                var r = [];
                for (var i in e)
                    if (e.hasOwnProperty(i)) {
                        var u = tt(t, n, i, e[i]);
                        u && r.push(u);
                    }
                return r.length ? r : null;
            }
            function et(t, n) {
                if (!n.settings.duration || n.settings.duration < 0) return null;
                var e,
                    r,
                    i,
                    u,
                    o,
                    a = (function (t, n) {
                        if (!n) return null;
                        var e = [];
                        if (Array.isArray(n))
                            for (var r = n.length, i = 0; i < r; i++) {
                                var u = n[i];
                                if (2 === u.length) {
                                    var o = null;
                                    if ("string" == typeof u[0]) o = t.getElementById(u[0]);
                                    else if (Array.isArray(u[0])) {
                                        o = [];
                                        for (var a = 0; a < u[0].length; a++)
                                            if ("string" == typeof u[0][a]) {
                                                var l = t.getElementById(u[0][a]);
                                                l && o.push(l);
                                            }
                                        o = o.length ? (1 === o.length ? o[0] : new $(o)) : null;
                                    }
                                    if (o) {
                                        var s = nt(t, o, u[1]);
                                        s && (e = e.concat(s));
                                    }
                                }
                            }
                        else
                            for (var f in n)
                                if (n.hasOwnProperty(f)) {
                                    var c = t.getElementById(f);
                                    if (c) {
                                        var h = nt(t, c, n[f]);
                                        h && (e = e.concat(h));
                                    }
                                }
                        return e.length ? e : null;
                    })(t, n.elements);
                return a
                    ? ((e = a),
                      (r = n.settings),
                      (i = r.duration),
                      (u = e.length),
                      (o = null),
                      function (t, n) {
                          var a = r.iterations || 1 / 0,
                              l = (r.alternate && a % 2 == 0) ^ (r.direction > 0) ? i : 0,
                              s = t % i,
                              f = 1 + (t - s) / i;
                          (n *= r.direction), r.alternate && f % 2 == 0 && (n = -n);
                          var c = !1;
                          if (f > a) (s = l), (c = !0), -1 === r.fill && (s = r.direction > 0 ? 0 : i);
                          else if ((n < 0 && (s = i - s), s === o)) return !1;
                          o = s;
                          for (var h = 0; h < u; h++) e[h](s);
                          return c;
                      })
                    : null;
            }
            function rt(t, n) {
                if (((Y = n), !t || !t.root || !Array.isArray(t.animations))) return null;
                var e = (function (t) {
                    for (var n = document.getElementsByTagName("svg"), e = 0; e < n.length; e++)
                        if (n[e].id === t.root && !n[e].svgatorAnimation) return (n[e].svgatorAnimation = !0), n[e];
                    return null;
                })(t);
                if (!e) return null;
                var r = t.animations
                    .map(function (t) {
                        return et(e, t);
                    })
                    .filter(function (t) {
                        return !!t;
                    });
                return r.length
                    ? {
                          svg: e,
                          animations: r,
                          animationSettings: t.animationSettings,
                          options: t.options || void 0,
                      }
                    : null;
            }
            function it(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                    e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Number,
                    r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "undefined" != typeof BigInt && BigInt,
                    i = "0x" + (t.replace(/[^0-9a-fA-F]+/g, "") || 27);
                return n && r && e.isSafeInteger && !e.isSafeInteger(+i) ? (e(r(i)) % n) + n : +i;
            }
            function ut(t, n, e) {
                return !t || !e || n > t.length ? t : t.substring(0, n) + ut(t.substring(n + 1), e, e);
            }
            function ot(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 27;
                return !t || t % n ? t % n : [0, 1].includes(n) ? n : ot(t / n, n);
            }
            function at(t, n, e) {
                if (t && t.length) {
                    var r = it(e),
                        i = ot(r) + 5,
                        u = ut(t, ot(r, 5), i);
                    return (
                        (u = u.replace(/\x7c$/g, "==").replace(/\x2f$/g, "=")),
                        (u = (function (t, n, e) {
                            var r = +("0x" + t.substring(0, 4));
                            t = t.substring(4);
                            for (var i = (it(n, r) % r) + (e % 27), u = [], o = 0; o < t.length; o += 2)
                                if ("|" !== t[o]) {
                                    var a = +("0x" + t[o] + t[o + 1]) - i;
                                    u.push(a);
                                } else {
                                    var l = +("0x" + t.substring(o + 1, o + 1 + 4)) - i;
                                    (o += 3), u.push(l);
                                }
                            return String.fromCharCode.apply(String, u);
                        })((u = (u = atob(u)).replace(/[\x41-\x5A]/g, "")), n, r)),
                        (u = JSON.parse(u))
                    );
                }
            }
            var lt = [
                    { key: "alternate", def: !1 },
                    { key: "fill", def: 1 },
                    { key: "iterations", def: 0 },
                    { key: "direction", def: 1 },
                    { key: "speed", def: 1 },
                    { key: "fps", def: 100 },
                ],
                st = (function () {
                    function t(n, e) {
                        var i = this,
                            u = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                        r(this, t),
                            (this._id = 0),
                            (this._running = !1),
                            (this._rollingBack = !1),
                            (this._animations = n),
                            (this._settings = e),
                            (!u || u < "2022-05-02") && delete this._settings.speed,
                            lt.forEach(function (t) {
                                i._settings[t.key] = i._settings[t.key] || t.def;
                            }),
                            (this.duration = e.duration),
                            (this.offset = e.offset || 0),
                            (this.rollbackStartOffset = 0);
                    }
                    return (
                        u(
                            t,
                            [
                                {
                                    key: "alternate",
                                    get: function () {
                                        return this._settings.alternate;
                                    },
                                },
                                {
                                    key: "fill",
                                    get: function () {
                                        return this._settings.fill;
                                    },
                                },
                                {
                                    key: "iterations",
                                    get: function () {
                                        return this._settings.iterations;
                                    },
                                },
                                {
                                    key: "direction",
                                    get: function () {
                                        return this._settings.direction;
                                    },
                                },
                                {
                                    key: "speed",
                                    get: function () {
                                        return this._settings.speed;
                                    },
                                },
                                {
                                    key: "fps",
                                    get: function () {
                                        return this._settings.fps;
                                    },
                                },
                                {
                                    key: "maxFiniteDuration",
                                    get: function () {
                                        return this.iterations > 0 ? this.iterations * this.duration : this.duration;
                                    },
                                },
                                {
                                    key: "_apply",
                                    value: function (t) {
                                        for (
                                            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                                e = this._animations,
                                                r = e.length,
                                                i = 0,
                                                u = 0;
                                            u < r;
                                            u++
                                        )
                                            n[u] ? i++ : ((n[u] = e[u](t, 1)), n[u] && i++);
                                        return i;
                                    },
                                },
                                {
                                    key: "_rollback",
                                    value: function (t) {
                                        var n = this,
                                            e = 1 / 0,
                                            r = null;
                                        (this.rollbackStartOffset = t), (this._rollingBack = !0), (this._running = !0);
                                        this._id = window.requestAnimationFrame(function i(u) {
                                            if (n._rollingBack) {
                                                null == r && (r = u);
                                                var o = Math.round(t - (u - r) * n.speed);
                                                if (o > n.duration && e !== 1 / 0) {
                                                    var a = !!n.alternate && (o / n.duration) % 2 > 1,
                                                        l = o % n.duration;
                                                    o = (l += a ? n.duration : 0) || n.duration;
                                                }
                                                var s = (n.fps ? 1e3 / n.fps : 0) * n.speed,
                                                    f = Math.max(0, o);
                                                f <= e - s && ((n.offset = f), (e = f), n._apply(f));
                                                var c = n.iterations > 0 && -1 === n.fill && o >= n.maxFiniteDuration;
                                                (o <= 0 || n.offset < o || c) && n.stop(), (n._id = window.requestAnimationFrame(i));
                                            }
                                        });
                                    },
                                },
                                {
                                    key: "_start",
                                    value: function () {
                                        var t = this,
                                            n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                                            e = -1 / 0,
                                            r = null,
                                            i = {};
                                        this._running = !0;
                                        var u = function u(o) {
                                            null == r && (r = o);
                                            var a = Math.round((o - r) * t.speed + n),
                                                l = (t.fps ? 1e3 / t.fps : 0) * t.speed;
                                            if (a >= e + l && !t._rollingBack && ((t.offset = a), (e = a), t._apply(a, i) === t._animations.length))
                                                return void t.pause(!0);
                                            t._id = window.requestAnimationFrame(u);
                                        };
                                        this._id = window.requestAnimationFrame(u);
                                    },
                                },
                                {
                                    key: "_pause",
                                    value: function () {
                                        this._id && window.cancelAnimationFrame(this._id), (this._running = !1);
                                    },
                                },
                                {
                                    key: "play",
                                    value: function () {
                                        if (!this._running) return this._rollingBack ? this._rollback(this.offset) : this._start(this.offset);
                                    },
                                },
                                {
                                    key: "stop",
                                    value: function () {
                                        this._pause(), (this.offset = 0), (this.rollbackStartOffset = 0), (this._rollingBack = !1), this._apply(0);
                                    },
                                },
                                {
                                    key: "reachedToEnd",
                                    value: function () {
                                        return this.iterations > 0 && this.offset >= this.iterations * this.duration;
                                    },
                                },
                                {
                                    key: "restart",
                                    value: function () {
                                        var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                                        this.stop(t), this.play(t);
                                    },
                                },
                                {
                                    key: "pause",
                                    value: function () {
                                        this._pause();
                                    },
                                },
                                {
                                    key: "reverse",
                                    value: function () {
                                        this.direction = -this.direction;
                                    },
                                },
                            ],
                            [
                                {
                                    key: "build",
                                    value: function (t, n) {
                                        delete t.animationSettings,
                                            (t.options = at(t.options, t.root, "5c7f360c")),
                                            t.animations.map(function (n) {
                                                (n.settings = at(n.s, t.root, "5c7f360c")),
                                                    delete n.s,
                                                    t.animationSettings || (t.animationSettings = n.settings);
                                            });
                                        var e = t.version;
                                        if (!(t = rt(t, n))) return null;
                                        var r = t.options || {},
                                            i = new this(t.animations, t.animationSettings, e);
                                        return { el: t.svg, options: r, player: i };
                                    },
                                },
                                {
                                    key: "push",
                                    value: function (t) {
                                        return this.build(t);
                                    },
                                },
                                {
                                    key: "init",
                                    value: function () {
                                        var t = this,
                                            n = window.__SVGATOR_PLAYER__ && window.__SVGATOR_PLAYER__["5c7f360c"];
                                        Array.isArray(n) &&
                                            n.splice(0).forEach(function (n) {
                                                return t.build(n);
                                            });
                                    },
                                },
                            ]
                        ),
                        t
                    );
                })();
            function ft(t) {
                return d(t) + "";
            }
            function ct(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : " ";
                return t && t.length ? t.map(ft).join(n) : "";
            }
            function ht(t) {
                if (!t) return "transparent";
                if (null == t.a || t.a >= 1) {
                    var n = function (t) {
                            return 1 === (t = parseInt(t).toString(16)).length ? "0" + t : t;
                        },
                        e = function (t) {
                            return t.charAt(0) === t.charAt(1);
                        },
                        r = n(t.r),
                        i = n(t.g),
                        u = n(t.b);
                    return e(r) && e(i) && e(u) && ((r = r.charAt(0)), (i = i.charAt(0)), (u = u.charAt(0))), "#" + r + i + u;
                }
                return "rgba(" + t.r + "," + t.g + "," + t.b + "," + t.a + ")";
            }
            function vt(t) {
                return t ? "url(#" + t + ")" : "none";
            }
            !(function () {
                for (var t = 0, n = ["ms", "moz", "webkit", "o"], e = 0; e < n.length && !window.requestAnimationFrame; ++e)
                    (window.requestAnimationFrame = window[n[e] + "RequestAnimationFrame"]),
                        (window.cancelAnimationFrame = window[n[e] + "CancelAnimationFrame"] || window[n[e] + "CancelRequestAnimationFrame"]);
                window.requestAnimationFrame ||
                    ((window.requestAnimationFrame = function (n) {
                        var e = Date.now(),
                            r = Math.max(0, 16 - (e - t)),
                            i = window.setTimeout(function () {
                                n(e + r);
                            }, r);
                        return (t = e + r), i;
                    }),
                    (window.cancelAnimationFrame = window.clearTimeout));
            })();
            var yt = {
                    f: null,
                    i: function (t, n, e) {
                        return 0 === t ? n : 1 === t ? e : { x: q(t, n.x, e.x), y: q(t, n.y, e.y) };
                    },
                    u: function (t, n) {
                        return function (e) {
                            var r = n(e);
                            t.setAttribute("rx", ft(r.x)), t.setAttribute("ry", ft(r.y));
                        };
                    },
                },
                gt = {
                    f: null,
                    i: function (t, n, e) {
                        return 0 === t
                            ? n
                            : 1 === t
                            ? e
                            : {
                                  width: q(t, n.width, e.width),
                                  height: q(t, n.height, e.height),
                              };
                    },
                    u: function (t, n) {
                        return function (e) {
                            var r = n(e);
                            t.setAttribute("width", ft(r.width)), t.setAttribute("height", ft(r.height));
                        };
                    },
                };
            Object.freeze({
                M: 2,
                L: 2,
                Z: 0,
                H: 1,
                V: 1,
                C: 6,
                Q: 4,
                T: 2,
                S: 4,
                A: 7,
            });
            var dt = {},
                pt = null;
            function mt(t) {
                var n = (function () {
                    if (pt) return pt;
                    if ("object" !== ("undefined" == typeof document ? "undefined" : e(document)) || !document.createElementNS) return {};
                    var t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    return t && t.style
                        ? ((t.style.position = "absolute"),
                          (t.style.opacity = "0.01"),
                          (t.style.zIndex = "-9999"),
                          (t.style.left = "-9999px"),
                          (t.style.width = "1px"),
                          (t.style.height = "1px"),
                          (pt = { svg: t }))
                        : {};
                })().svg;
                if (!n)
                    return function (t) {
                        return null;
                    };
                var r = document.createElementNS(n.namespaceURI, "path");
                r.setAttributeNS(null, "d", t), r.setAttributeNS(null, "fill", "none"), r.setAttributeNS(null, "stroke", "none"), n.appendChild(r);
                var i = r.getTotalLength();
                return function (t) {
                    var n = r.getPointAtLength(i * t);
                    return { x: n.x, y: n.y };
                };
            }
            function bt(t) {
                return dt[t] ? dt[t] : (dt[t] = mt(t));
            }
            function wt(t, n, e, r) {
                if (!t || !r) return !1;
                var i = ["M", t.x, t.y];
                if ((n && e && (i.push("C"), i.push(n.x), i.push(n.y), i.push(e.x), i.push(e.y)), n ? !e : e)) {
                    var u = n || e;
                    i.push("Q"), i.push(u.x), i.push(u.y);
                }
                return n || e || i.push("L"), i.push(r.x), i.push(r.y), i.join(" ");
            }
            function At(t, n, e, r) {
                var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
                    u = wt(t, n, e, r),
                    o = bt(u);
                try {
                    return o(i);
                } catch (t) {
                    return null;
                }
            }
            function _t(t, n, e) {
                return t + (n - t) * e;
            }
            function xt(t, n, e) {
                var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                    i = { x: _t(t.x, n.x, e), y: _t(t.y, n.y, e) };
                return r && (i.a = kt(t, n)), i;
            }
            function kt(t, n) {
                return Math.atan2(n.y - t.y, n.x - t.x);
            }
            function St(t, n, e, r) {
                var i = 1 - r;
                return i * i * t + 2 * i * r * n + r * r * e;
            }
            function Ot(t, n, e, r) {
                return 2 * (1 - r) * (n - t) + 2 * r * (e - n);
            }
            function jt(t, n, e, r) {
                var i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                    u = At(t, n, null, e, r);
                return u || (u = { x: St(t.x, n.x, e.x, r), y: St(t.y, n.y, e.y, r) }), i && (u.a = Et(t, n, e, r)), u;
            }
            function Et(t, n, e, r) {
                return Math.atan2(Ot(t.y, n.y, e.y, r), Ot(t.x, n.x, e.x, r));
            }
            function Mt(t, n, e, r, i) {
                var u = i * i;
                return i * u * (r - t + 3 * (n - e)) + 3 * u * (t + e - 2 * n) + 3 * i * (n - t) + t;
            }
            function Pt(t, n, e, r, i) {
                var u = 1 - i;
                return 3 * (u * u * (n - t) + 2 * u * i * (e - n) + i * i * (r - e));
            }
            function It(t, n, e, r, i) {
                var u = arguments.length > 5 && void 0 !== arguments[5] && arguments[5],
                    o = At(t, n, e, r, i);
                return (
                    o ||
                        (o = {
                            x: Mt(t.x, n.x, e.x, r.x, i),
                            y: Mt(t.y, n.y, e.y, r.y, i),
                        }),
                    u && (o.a = Rt(t, n, e, r, i)),
                    o
                );
            }
            function Rt(t, n, e, r, i) {
                return Math.atan2(Pt(t.y, n.y, e.y, r.y, i), Pt(t.x, n.x, e.x, r.x, i));
            }
            function Ft(t, n, e) {
                var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                if (Tt(n)) {
                    if (Bt(e)) return jt(n, e.start, e, t, r);
                } else if (Tt(e)) {
                    if (qt(n)) return jt(n, n.end, e, t, r);
                } else {
                    if (qt(n)) return Bt(e) ? It(n, n.end, e.start, e, t, r) : jt(n, n.end, e, t, r);
                    if (Bt(e)) return jt(n, e.start, e, t, r);
                }
                return xt(n, e, t, r);
            }
            function Nt(t, n, e) {
                var r = Ft(t, n, e, !0);
                return (
                    (r.a =
                        (function (t) {
                            return arguments.length > 1 && void 0 !== arguments[1] && arguments[1] ? t + Math.PI : t;
                        })(r.a) / m),
                    r
                );
            }
            function Tt(t) {
                return !t.type || "corner" === t.type;
            }
            function Bt(t) {
                return null != t.start && !Tt(t);
            }
            function qt(t) {
                return null != t.end && !Tt(t);
            }
            var Dt = new N();
            var Lt = { f: ft, i: B },
                Ct = { f: ft, i: D };
            function Vt(t, n, e) {
                return t.map(function (t) {
                    return (function (t, n, e) {
                        var r = t.v;
                        if (!r || "g" !== r.t || r.s || !r.v || !r.r) return t;
                        var i = e.getElementById(r.r),
                            u = (i && i.querySelectorAll("stop")) || [];
                        return (
                            (r.s = r.v.map(function (t, n) {
                                var e = u[n] && u[n].getAttribute("offset");
                                return { c: t, o: (e = d(parseInt(e) / 100)) };
                            })),
                            delete r.v,
                            t
                        );
                    })(t, 0, e);
                });
            }
            var Gt = {
                gt: "gradientTransform",
                c: { x: "cx", y: "cy" },
                rd: "r",
                f: { x: "x1", y: "y1" },
                to: { x: "x2", y: "y2" },
            };
            function zt(t, n, r, i, u, o, a, l) {
                return (
                    Vt(t, 0, l),
                    (n = (function (t, n, e) {
                        for (var r, i, u, o = t.length - 1, a = {}, l = 0; l <= o; l++)
                            (r = t[l]).e && (r.e = n(r.e)),
                                r.v &&
                                    "g" === (i = r.v).t &&
                                    i.r &&
                                    (u = e.getElementById(i.r)) &&
                                    (a[i.r] = { e: u, s: u.querySelectorAll("stop") });
                        return a;
                    })(t, i, l)),
                    function (i) {
                        var u = r(i, t, Yt);
                        if (!u) return "none";
                        if ("c" === u.t) return ht(u.v);
                        if ("g" === u.t) {
                            if (!n[u.r]) return vt(u.r);
                            var o = n[u.r];
                            return (
                                (function (t, n) {
                                    for (var e = t.s, r = e.length; r < n.length; r++) {
                                        var i = e[e.length - 1].cloneNode();
                                        (i.id = Qt(i.id)), t.e.appendChild(i), (e = t.s = t.e.querySelectorAll("stop"));
                                    }
                                    for (var u = 0, o = e.length, a = n.length - 1; u < o; u++)
                                        e[u].setAttribute("stop-color", ht(n[Math.min(u, a)].c)), e[u].setAttribute("offset", n[Math.min(u, a)].o);
                                })(o, u.s),
                                Object.keys(Gt).forEach(function (t) {
                                    if (void 0 !== u[t])
                                        if ("object" !== e(Gt[t])) {
                                            var n,
                                                r = "gt" === t ? ((n = u[t]), Array.isArray(n) ? "matrix(" + n.join(" ") + ")" : "") : u[t],
                                                i = Gt[t];
                                            o.e.setAttribute(i, r);
                                        } else
                                            Object.keys(Gt[t]).forEach(function (n) {
                                                if (void 0 !== u[t][n]) {
                                                    var e = u[t][n],
                                                        r = Gt[t][n];
                                                    o.e.setAttribute(r, e);
                                                }
                                            });
                                }),
                                vt(u.r)
                            );
                        }
                        return "none";
                    }
                );
            }
            function Yt(t, e, r) {
                if (0 === t) return e;
                if (1 === t) return r;
                if (e && r) {
                    var i = e.t;
                    if (i === r.t)
                        switch (e.t) {
                            case "c":
                                return { t: i, v: V(t, e.v, r.v) };
                            case "g":
                                if (e.r === r.r) {
                                    var u = { t: i, s: $t(t, e.s, r.s), r: e.r };
                                    return (
                                        e.gt &&
                                            r.gt &&
                                            (u.gt = (function (t, n, e) {
                                                var r = n.length;
                                                if (r !== e.length) return T(t, n, e);
                                                for (var i = new Array(r), u = 0; u < r; u++) i[u] = B(t, n[u], e[u]);
                                                return i;
                                            })(t, e.gt, r.gt)),
                                        e.c
                                            ? ((u.c = L(t, e.c, r.c)), (u.rd = q(t, e.rd, r.rd)))
                                            : e.f && ((u.f = L(t, e.f, r.f)), (u.to = L(t, e.to, r.to))),
                                        u
                                    );
                                }
                        }
                    if (("c" === e.t && "g" === r.t) || ("c" === r.t && "g" === e.t)) {
                        var o = "c" === e.t ? e : r,
                            a = "g" === e.t ? n({}, e) : n({}, r),
                            l = a.s.map(function (t) {
                                return { c: o.v, o: t.o };
                            });
                        return (a.s = "c" === e.t ? $t(t, l, a.s) : $t(t, a.s, l)), a;
                    }
                }
                return T(t, e, r);
            }
            function $t(t, n, e) {
                if (n.length === e.length)
                    return n.map(function (n, r) {
                        return Ut(t, n, e[r]);
                    });
                for (var r = Math.max(n.length, e.length), i = [], u = 0; u < r; u++) {
                    var o = Ut(t, n[Math.min(u, n.length - 1)], e[Math.min(u, e.length - 1)]);
                    i.push(o);
                }
                return i;
            }
            function Ut(t, n, e) {
                return { o: D(t, n.o, e.o || 0), c: V(t, n.c, e.c || {}) };
            }
            function Qt(t) {
                return t.replace(/-fill-([0-9]+)$/, function (t, n) {
                    return "-fill-" + (+n + 1);
                });
            }
            var Ht = {
                    fill: zt,
                    "fill-opacity": Ct,
                    stroke: zt,
                    "stroke-opacity": Ct,
                    "stroke-width": Lt,
                    "stroke-dashoffset": { f: ft, i: B },
                    "stroke-dasharray": {
                        f: function (t) {
                            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : " ";
                            return (
                                t &&
                                    t.length > 0 &&
                                    (t = t.map(function (t) {
                                        return d(t, 4);
                                    })),
                                ct(t, n)
                            );
                        },
                        i: function (t, n, e) {
                            var r,
                                i,
                                u,
                                o = n.length,
                                a = e.length;
                            if (o !== a)
                                if (0 === o) n = G((o = a), 0);
                                else if (0 === a) (a = o), (e = G(o, 0));
                                else {
                                    var l =
                                        (u =
                                            ((r = o) * (i = a)) /
                                            (function (t, n) {
                                                for (var e; n; ) (e = n), (n = t % n), (t = e);
                                                return t || 1;
                                            })(r, i)) < 0
                                            ? -u
                                            : u;
                                    (n = z(n, Math.floor(l / o))), (e = z(e, Math.floor(l / a))), (o = a = l);
                                }
                            for (var s = [], f = 0; f < o; f++) s.push(d(q(t, n[f], e[f])));
                            return s;
                        },
                    },
                    opacity: Ct,
                    transform: function (t, n, r, i) {
                        if (
                            !(t = (function (t, n) {
                                if (!t || "object" !== e(t)) return null;
                                var r = !1;
                                for (var i in t)
                                    t.hasOwnProperty(i) &&
                                        (t[i] && t[i].length
                                            ? (t[i].forEach(function (t) {
                                                  t.e && (t.e = n(t.e));
                                              }),
                                              (r = !0))
                                            : delete t[i]);
                                return r ? t : null;
                            })(t, i))
                        )
                            return null;
                        var u = function (e, i, u) {
                            var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
                            return t[e] ? r(i, t[e], u) : n && n[e] ? n[e] : o;
                        };
                        return n && n.a && t.o
                            ? function (n) {
                                  var e = r(n, t.o, Nt);
                                  return Dt.recomposeSelf(e, u("r", n, B, 0) + e.a, u("k", n, L), u("s", n, L), u("t", n, L)).toString();
                              }
                            : function (t) {
                                  return Dt.recomposeSelf(u("o", t, Ft, null), u("r", t, B, 0), u("k", t, L), u("s", t, L), u("t", t, L)).toString();
                              };
                    },
                    r: Lt,
                    "#size": gt,
                    "#radius": yt,
                    _: function (t, n) {
                        if (Array.isArray(t)) for (var e = 0; e < t.length; e++) this[t[e]] = n;
                        else this[t] = n;
                    },
                },
                Jt = (function (t) {
                    !(function (t, n) {
                        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function");
                        (t.prototype = Object.create(n && n.prototype, {
                            constructor: { value: t, writable: !0, configurable: !0 },
                        })),
                            n && l(t, n);
                    })(o, t);
                    var n,
                        e,
                        i =
                            ((n = o),
                            (e = s()),
                            function () {
                                var t,
                                    r = a(n);
                                if (e) {
                                    var i = a(this).constructor;
                                    t = Reflect.construct(r, arguments, i);
                                } else t = r.apply(this, arguments);
                                return c(this, t);
                            });
                    function o() {
                        return r(this, o), i.apply(this, arguments);
                    }
                    return (
                        u(o, null, [
                            {
                                key: "build",
                                value: function (t) {
                                    var n = h(a(o), "build", this).call(this, t, Ht);
                                    if (!n) return null;
                                    n.el,
                                        n.options,
                                        (function (t, n, e) {
                                            t.play();
                                        })(n.player);
                                },
                            },
                        ]),
                        o
                    );
                })(st);
            return Jt.init(), Jt;
        });
        (function (s, i, o, w, d, a, b) {
            w[o] = w[o] || {};
            w[o][s] = w[o][s] || [];
            w[o][s].push(i);
        })(
            "5c7f360c",
            {
                root: "eH7dN3ypZfA1",
                version: "2022-05-04",
                animations: [
                    {
                        elements: {
                            eH7dN3ypZfA8: {
                                "#size": [
                                    {
                                        t: 0,
                                        v: { width: 0, height: 7 },
                                        e: [0.82, 0.02, 0.335, 0.985],
                                    },
                                    { t: 1400, v: { width: 135.666678, height: 7 } },
                                    { t: 2900, v: { width: 0, height: 7 } },
                                ],
                                transform: {
                                    data: { s: { x: 1.090909, y: 1 }, t: { x: -11, y: -3.5 } },
                                    keys: {
                                        o: [
                                            { t: 0, v: { x: 20.071429, y: 138.5, type: "corner" } },
                                            { t: 1400, v: { x: 20, y: 138.5, type: "corner" } },
                                            { t: 2900, v: { x: 168.2, y: 138.5, type: "corner" } },
                                        ],
                                    },
                                },
                            },
                        },
                        s: "MIDA1ZGJkNjRhNmI3YjIRhM2I2V2FiYjFiMDYO0N2M3NTcyNzI3MjZlRNjRhNmFiYjRVYTdhNUURiNkZhYmIxYjA2NDAdjNzM2ZTY0YWJiNmEA3YjRYYTNiNmFiYjFiHMGI1NjQ3YzcyNmVHNMjRhOGFiYWVhZTY0N2FM3MzZlNjRhM2FlYjZXhN2I0YjBhM1ViNmE3ETTY0N2NhOGEzYWViNEWE3NmU2NGI1YjJhN2BE3YTY2NDdjNzM2ZTYN0YThiMmI1NjRJN2M3SMzcyNzJiZg|",
                    },
                ],
                options: "MVDAxMDg4MmY4MDgxSTHZlN2Y4MU8yZjQ3MmYO3OTdjNmU3MTJmOGE/B",
            },
            "__SVGATOR_PLAYER__",
            window,
            document
        );
    }, []);
    return (
        <svg
            id="eH7dN3ypZfA1"
            className="creeperLoading"
            viewBox="0 0 166 157"
            shape-rendering="geometricPrecision"
            text-rendering="geometricPrecision"
        >
            <defs>
                <linearGradient
                    id="eH7dN3ypZfA4-fill"
                    x1="32"
                    y1="50.5"
                    x2="128"
                    y2="68"
                    spreadMethod="pad"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(0 0)"
                >
                    <stop id="eH7dN3ypZfA4-fill-0" offset="0%" stop-color="#57e354" />
                    <stop id="eH7dN3ypZfA4-fill-1" offset="100%" stop-color="#125438" />
                </linearGradient>
                <filter id="eH7dN3ypZfA8-filter" x="-150%" width="400%" y="-150%" height="400%">
                    <feGaussianBlur id="eH7dN3ypZfA8-filter-drop-shadow-0-blur" in="SourceAlpha" stdDeviation="4,4" />
                    <feOffset id="eH7dN3ypZfA8-filter-drop-shadow-0-offset" dx="0" dy="0" result="tmp" />
                    <feFlood id="eH7dN3ypZfA8-filter-drop-shadow-0-flood" flood-color="#16c235" />
                    <feComposite id="eH7dN3ypZfA8-filter-drop-shadow-0-composite" operator="in" in2="tmp" />
                    <feMerge id="eH7dN3ypZfA8-filter-drop-shadow-0-merge" result="result">
                        <feMergeNode id="eH7dN3ypZfA8-filter-drop-shadow-0-merge-node-1" />
                        <feMergeNode id="eH7dN3ypZfA8-filter-drop-shadow-0-merge-node-2" in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <g clip-path="url(#eH7dN3ypZfA16)">
                <g>
                    <path
                        d="M70,14h-36v36h36v13h-19v25v23h19v-23h35v23h19v-23-25h-18v-13h36v-36h-36v36h-36v-36Z"
                        clip-rule="evenodd"
                        fill="url(#eH7dN3ypZfA4-fill)"
                        fill-rule="evenodd"
                    />
                    <g>
                        <rect width="148" height="7" rx="1" ry="1" transform="translate(9 135)" fill="#3e3e3e" />
                    </g>
                    <g transform="translate(1 0)">
                        <rect
                            id="eH7dN3ypZfA8"
                            width="0"
                            height="7"
                            rx="1"
                            ry="1"
                            transform="matrix(1.090909 0 0 1 8.07143 135)"
                            filter="url(#eH7dN3ypZfA8-filter)"
                            fill="#19c234"
                        />
                    </g>
                    <rect width="36" height="7" rx="0" ry="0" transform="translate(70 50)" fill="#0b3f22" />
                    <rect width="36" height="7" rx="0" ry="0" transform="translate(34 14)" fill="#0b3f22" />
                    <rect width="36" height="7" rx="0" ry="0" transform="matrix(0-1 1 0 34 50)" fill="#0b3f22" />
                    <rect width="36" height="7" rx="0" ry="0" transform="matrix(0-1 1 0 135 50)" fill="#0b3f22" />
                    <rect width="36" height="7" rx="0" ry="0" transform="translate(106 14)" fill="#0b3f22" />
                    <rect width="19" height="7" rx="0" ry="0" transform="translate(51 63)" fill="#0b3f22" />
                    <rect width="18" height="7" rx="0" ry="0" transform="translate(106 62)" fill="#0b3f22" />
                </g>
                <clipPath id="eH7dN3ypZfA16">
                    <rect width="166" height="157" rx="0" ry="0" fill="#fff" />
                </clipPath>
            </g>
        </svg>
    );
};

export default CreeperLoading;
