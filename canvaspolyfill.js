/* atob polyfill */
if (typeof window.atob == 'undefined') {
    function atob(a) {
        var b = "",
            e, c, h = "",
            f, g = "",
            d = 0;
        k = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        do e = k.indexOf(a.charAt(d++)), c = k.indexOf(a.charAt(d++)), f = k.indexOf(a.charAt(d++)), g = k.indexOf(a.charAt(d++)), e = e << 2 | c >> 4, c = (c & 15) << 4 | f >> 2, h = (f & 3) << 6 | g, b += String.fromCharCode(e), 64 != f && (b += String.fromCharCode(c)), 64 != g && (b += String.fromCharCode(h)); while (d < a.length);
        return unescape(b)
    };
}
/* promise-polyfill 6.0.2 https://github.com/taylorhakes/promise-polyfill */
! function(e) {
    function n() {}

    function t(e, n) {
        return function() {
            e.apply(n, arguments)
        }
    }

    function o(e) {
        if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof e) throw new TypeError("not a function");
        this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], s(e, this)
    }

    function i(e, n) {
        for (; 3 === e._state;) e = e._value;
        return 0 === e._state ? void e._deferreds.push(n) : (e._handled = !0, void o._immediateFn(function() {
            var t = 1 === e._state ? n.onFulfilled : n.onRejected;
            if (null === t) return void(1 === e._state ? r : u)(n.promise, e._value);
            var o;
            try {
                o = t(e._value)
            } catch (i) {
                return void u(n.promise, i)
            }
            r(n.promise, o)
        }))
    }

    function r(e, n) {
        try {
            if (n === e) throw new TypeError("A promise cannot be resolved with itself.");
            if (n && ("object" == typeof n || "function" == typeof n)) {
                var i = n.then;
                if (n instanceof o) return e._state = 3, e._value = n, void f(e);
                if ("function" == typeof i) return void s(t(i, n), e)
            }
            e._state = 1, e._value = n, f(e)
        } catch (r) {
            u(e, r)
        }
    }

    function u(e, n) {
        e._state = 2, e._value = n, f(e)
    }

    function f(e) {
        2 === e._state && 0 === e._deferreds.length && o._immediateFn(function() {
            e._handled || o._unhandledRejectionFn(e._value)
        });
        for (var n = 0, t = e._deferreds.length; n < t; n++) i(e, e._deferreds[n]);
        e._deferreds = null
    }

    function c(e, n, t) {
        this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof n ? n : null, this.promise = t
    }

    function s(e, n) {
        var t = !1;
        try {
            e(function(e) {
                t || (t = !0, r(n, e))
            }, function(e) {
                t || (t = !0, u(n, e))
            })
        } catch (o) {
            if (t) return;
            t = !0, u(n, o)
        }
    }
    var a = setTimeout;
    o.prototype["catch"] = function(e) {
        return this.then(null, e)
    }, o.prototype.then = function(e, t) {
        var o = new this.constructor(n);
        return i(this, new c(e, t, o)), o
    }, o.all = function(e) {
        var n = Array.prototype.slice.call(e);
        return new o(function(e, t) {
            function o(r, u) {
                try {
                    if (u && ("object" == typeof u || "function" == typeof u)) {
                        var f = u.then;
                        if ("function" == typeof f) return void f.call(u, function(e) {
                            o(r, e)
                        }, t)
                    }
                    n[r] = u, 0 === --i && e(n)
                } catch (c) {
                    t(c)
                }
            }
            if (0 === n.length) return e([]);
            for (var i = n.length, r = 0; r < n.length; r++) o(r, n[r])
        })
    }, o.resolve = function(e) {
        return e && "object" == typeof e && e.constructor === o ? e : new o(function(n) {
            n(e)
        })
    }, o.reject = function(e) {
        return new o(function(n, t) {
            t(e)
        })
    }, o.race = function(e) {
        return new o(function(n, t) {
            for (var o = 0, i = e.length; o < i; o++) e[o].then(n, t)
        })
    }, o._immediateFn = "function" == typeof setImmediate && function(e) {
        setImmediate(e)
    } || function(e) {
        a(e, 0)
    }, o._unhandledRejectionFn = function(e) {
        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
    }, o._setImmediateFn = function(e) {
        o._immediateFn = e
    }, o._setUnhandledRejectionFn = function(e) {
        o._unhandledRejectionFn = e
    }, "undefined" != typeof module && module.exports ? module.exports = o : e.Promise || (e.Promise = o)
}(this);
/* typedarray.js 201612 https://github.com/inexorabletash/polyfill */
(function(p) {
    function B(a) {
        switch (typeof a) {
            case "undefined":
                return "undefined";
            case "boolean":
                return "boolean";
            case "number":
                return "number";
            case "string":
                return "string";
            default:
                return null === a ? "null" : "object"
        }
    }

    function C(a) {
        return Object.prototype.toString.call(a).replace(/^\[object *|\]$/g, "")
    }

    function t(a) {
        return "function" === typeof a
    }

    function x(a) {
        if (null === a || void 0 === a) throw TypeError();
        return Object(a)
    }

    function G(a) {
        function b(b) {
            Object.defineProperty(a, b, {
                get: function() {
                    return a._getter(b)
                },
                set: function(f) {
                    a._setter(b, f)
                },
                enumerable: !0,
                configurable: !1
            })
        }
        if (!("TYPED_ARRAY_POLYFILL_NO_ARRAY_ACCESSORS" in p)) {
            if (1E5 < a.length) throw RangeError("Array too large for polyfill");
            var f;
            for (f = 0; f < a.length; f += 1) b(f)
        }
    }

    function y(a, b) {
        var f = 32 - b;
        return a << f >> f
    }

    function z(a, b) {
        var f = 32 - b;
        return a << f >>> f
    }

    function H(a) {
        return [a & 255]
    }

    function I(a) {
        return y(a[0], 8)
    }

    function J(a) {
        return [a & 255]
    }

    function D(a) {
        return z(a[0], 8)
    }

    function K(a) {
        a = L(Number(a));
        return [0 > a ? 0 : 255 < a ? 255 : a & 255]
    }

    function M(a) {
        return [a & 255, a >> 8 & 255]
    }

    function N(a) {
        return y(a[1] << 8 | a[0], 16)
    }

    function O(a) {
        return [a & 255, a >> 8 & 255]
    }

    function P(a) {
        return z(a[1] << 8 | a[0], 16)
    }

    function Q(a) {
        return [a & 255, a >> 8 & 255, a >> 16 & 255, a >> 24 & 255]
    }

    function R(a) {
        return y(a[3] << 24 | a[2] << 16 | a[1] << 8 | a[0], 32)
    }

    function S(a) {
        return [a & 255, a >> 8 & 255, a >> 16 & 255, a >> 24 & 255]
    }

    function T(a) {
        return z(a[3] << 24 | a[2] << 16 | a[1] << 8 | a[0], 32)
    }

    function E(a, b, f) {
        function k(a) {
            var b = w(a);
            a -= b;
            return .5 > a ? b : .5 < a ? b + 1 : b % 2 ? b + 1 : b
        }
        var l = (1 << b - 1) - 1,
            g, n, q;
        a !== a ? (n = (1 << b) - 1, q = r(2, f - 1), g = 0) : Infinity === a || -Infinity === a ? (n = (1 << b) - 1, q = 0, g = 0 > a ? 1 : 0) : 0 === a ? (q = n = 0, g = -Infinity === 1 / a ? 1 : 0) : (g = 0 > a, a = A(a), a >= r(2, 1 - l) ? (n = u(w(V(a) / W), 1023), q = a / r(2, n), 1 > q && (--n, q *= 2), 2 <= q && (n += 1, q /= 2), a = r(2, f), q = k(q * a) - a, n += l, 1 <= q / a && (n += 1, q = 0), n > 2 * l && (n = (1 << b) - 1, q = 0)) : (n = 0, q = k(a / r(2, 1 - l - f))));
        for (l = []; f; --f) l.push(q % 2 ? 1 : 0), q = w(q / 2);
        for (f = b; f; --f) l.push(n % 2 ? 1 : 0), n = w(n / 2);
        l.push(g ? 1 : 0);
        l.reverse();
        b = l.join("");
        for (g = []; b.length;) g.unshift(parseInt(b.substring(0, 8), 2)), b = b.substring(8);
        return g
    }

    function F(a, b, f) {
        var k = [],
            l, g, n;
        for (l = 0; l < a.length; ++l)
            for (n = a[l], g = 8; g; --g) k.push(n % 2 ? 1 : 0), n >>= 1;
        k.reverse();
        g = k.join("");
        a = (1 << b - 1) - 1;
        k = parseInt(g.substring(0, 1), 2) ? -1 : 1;
        l = parseInt(g.substring(1, 1 + b), 2);
        g = parseInt(g.substring(1 + b), 2);
        return l === (1 << b) - 1 ? 0 !== g ? NaN : Infinity * k : 0 < l ? k * r(2, l - a) * (1 + g / r(2, f)) : 0 !== g ? k * r(2, -(a - 1)) * (g / r(2, f)) : 0 > k ? -0 : 0
    }

    function X(a) {
        return F(a, 11, 52)
    }

    function Y(a) {
        return E(a, 11, 52)
    }

    function Z(a) {
        return F(a, 8, 23)
    }

    function aa(a) {
        return E(a, 8, 23)
    }
    var W = Math.LN2,
        A = Math.abs,
        w = Math.floor,
        V = Math.log,
        v = Math.max,
        u = Math.min,
        r = Math.pow,
        L = Math.round;
    (function() {
        var a = Object.defineProperty,
            b;
        try {
            b = Object.defineProperty({}, "x", {})
        } catch (f) {
            b = !1
        }
        a && b || (Object.defineProperty = function(b, k, l) {
            if (a) try {
                return a(b, k, l)
            } catch (g) {}
            if (b !== Object(b)) throw TypeError("Object.defineProperty called on non-object");
            Object.prototype.__defineGetter__ && "get" in l && Object.prototype.__defineGetter__.call(b, k, l.get);
            Object.prototype.__defineSetter__ && "set" in l && Object.prototype.__defineSetter__.call(b, k, l.set);
            "value" in l && (b[k] = l.value);
            return b
        })
    })();
    (function() {
        function a(a) {
            a >>= 0;
            if (0 > a) throw RangeError("ArrayBuffer size is not a small enough positive integer.");
            Object.defineProperty(this, "byteLength", {
                value: a
            });
            Object.defineProperty(this, "_bytes", {
                value: Array(a)
            });
            for (var e = 0; e < a; e += 1) this._bytes[e] = 0
        }

        function b() {
            if (!arguments.length || "object" !== typeof arguments[0]) return function(m) {
                m >>= 0;
                if (0 > m) throw RangeError("length is not a small enough positive integer.");
                Object.defineProperty(this, "length", {
                    value: m
                });
                Object.defineProperty(this, "byteLength", {
                    value: m * this.BYTES_PER_ELEMENT
                });
                Object.defineProperty(this, "buffer", {
                    value: new a(this.byteLength)
                });
                Object.defineProperty(this, "byteOffset", {
                    value: 0
                })
            }.apply(this, arguments);
            if (1 <= arguments.length && "object" === B(arguments[0]) && arguments[0] instanceof b) return function(m) {
                if (this.constructor !== m.constructor) throw TypeError();
                var e = m.length * this.BYTES_PER_ELEMENT;
                Object.defineProperty(this, "buffer", {
                    value: new a(e)
                });
                Object.defineProperty(this, "byteLength", {
                    value: e
                });
                Object.defineProperty(this, "byteOffset", {
                    value: 0
                });
                Object.defineProperty(this, "length", {
                    value: m.length
                });
                for (e = 0; e < this.length; e += 1) this._setter(e, m._getter(e))
            }.apply(this, arguments);
            if (1 <= arguments.length && "object" === B(arguments[0]) && !(arguments[0] instanceof b) && !(arguments[0] instanceof a || "ArrayBuffer" === C(arguments[0]))) return function(m) {
                var e = m.length * this.BYTES_PER_ELEMENT;
                Object.defineProperty(this, "buffer", {
                    value: new a(e)
                });
                Object.defineProperty(this, "byteLength", {
                    value: e
                });
                Object.defineProperty(this, "byteOffset", {
                    value: 0
                });
                Object.defineProperty(this, "length", {
                    value: m.length
                });
                for (e = 0; e < this.length; e += 1) this._setter(e, Number(m[e]))
            }.apply(this, arguments);
            if (1 <= arguments.length && "object" === B(arguments[0]) && (arguments[0] instanceof a || "ArrayBuffer" === C(arguments[0]))) return function(a, e, d) {
                e >>>= 0;
                if (e > a.byteLength) throw RangeError("byteOffset out of range");
                if (e % this.BYTES_PER_ELEMENT) throw RangeError("buffer length minus the byteOffset is not a multiple of the element size.");
                if (void 0 === d) {
                    var c = a.byteLength - e;
                    if (c % this.BYTES_PER_ELEMENT) throw RangeError("length of buffer minus byteOffset not a multiple of the element size");
                    d = c / this.BYTES_PER_ELEMENT
                } else d >>>= 0, c = d * this.BYTES_PER_ELEMENT;
                if (e + c > a.byteLength) throw RangeError("byteOffset and length reference an area beyond the end of the buffer");
                Object.defineProperty(this, "buffer", {
                    value: a
                });
                Object.defineProperty(this, "byteLength", {
                    value: c
                });
                Object.defineProperty(this, "byteOffset", {
                    value: e
                });
                Object.defineProperty(this, "length", {
                    value: d
                })
            }.apply(this, arguments);
            throw TypeError();
        }

        function f(a, e, d) {
            var c = function() {
                Object.defineProperty(this, "constructor", {
                    value: c
                });
                b.apply(this, arguments);
                G(this)
            };
            "__proto__" in c ? c.__proto__ = b : (c.from = b.from, c.of = b.of);
            c.BYTES_PER_ELEMENT = a;
            var h = function() {};
            h.prototype = k;
            c.prototype = new h;
            Object.defineProperty(c.prototype, "BYTES_PER_ELEMENT", {
                value: a
            });
            Object.defineProperty(c.prototype, "_pack", {
                value: e
            });
            Object.defineProperty(c.prototype, "_unpack", {
                value: d
            });
            return c
        }
        p.ArrayBuffer = p.ArrayBuffer || a;
        Object.defineProperty(b, "from", {
            value: function(a) {
                return new this(a)
            }
        });
        Object.defineProperty(b, "of", {
            value: function() {
                return new this(arguments)
            }
        });
        var k = {};
        b.prototype = k;
        Object.defineProperty(b.prototype, "_getter", {
            value: function(a) {
                if (1 > arguments.length) throw SyntaxError("Not enough arguments");
                a >>>= 0;
                if (!(a >= this.length)) {
                    var e = [],
                        d, c;
                    d = 0;
                    for (c = this.byteOffset + a * this.BYTES_PER_ELEMENT; d < this.BYTES_PER_ELEMENT; d += 1, c += 1) e.push(this.buffer._bytes[c]);
                    return this._unpack(e)
                }
            }
        });
        Object.defineProperty(b.prototype, "get", {
            value: b.prototype._getter
        });
        Object.defineProperty(b.prototype, "_setter", {
            value: function(a, e) {
                if (2 > arguments.length) throw SyntaxError("Not enough arguments");
                a >>>= 0;
                if (!(a >= this.length)) {
                    var d = this._pack(e),
                        c, h;
                    c = 0;
                    for (h = this.byteOffset + a * this.BYTES_PER_ELEMENT; c < this.BYTES_PER_ELEMENT; c += 1, h += 1) this.buffer._bytes[h] = d[c]
                }
            }
        });
        Object.defineProperty(b.prototype, "constructor", {
            value: b
        });
        Object.defineProperty(b.prototype, "copyWithin", {
            value: function(a, e, d) {
                var c = x(this),
                    h = c.length >>> 0,
                    h = v(h, 0);
                a >>= 0;
                a = 0 > a ? v(h + a, 0) : u(a, h);
                e >>= 0;
                e = 0 > e ? v(h + e, 0) : u(e, h);
                d = void 0 === d ? h : d >> 0;
                d = 0 > d ? v(h + d, 0) : u(d, h);
                h = u(d - e, h - a);
                e < a && a < e + h ? (d = -1, e = e + h - 1, a = a + h - 1) : d = 1;
                for (; 0 < h;) c._setter(a, c._getter(e)), e += d, a += d, --h;
                return c
            }
        });
        Object.defineProperty(b.prototype, "every", {
            value: function(a, e) {
                if (void 0 === this || null === this) throw TypeError();
                var d = Object(this),
                    c = d.length >>> 0;
                if (!t(a)) throw TypeError();
                for (var h = 0; h < c; h++)
                    if (!a.call(e, d._getter(h), h, d)) return !1;
                return !0
            }
        });
        Object.defineProperty(b.prototype, "fill", {
            value: function(a, e, d) {
                var c = x(this),
                    h = c.length >>> 0,
                    h = v(h, 0);
                e >>= 0;
                e = 0 > e ? v(h + e, 0) : u(e, h);
                d = void 0 === d ? h : d >> 0;
                for (h = 0 > d ? v(h + d, 0) : u(d, h); e < h;) c._setter(e, a), e += 1;
                return c
            }
        });
        Object.defineProperty(b.prototype, "filter", {
            value: function(a, e) {
                if (void 0 === this || null === this) throw TypeError();
                var d = Object(this),
                    c = d.length >>> 0;
                if (!t(a)) throw TypeError();
                for (var h = [], b = 0; b < c; b++) {
                    var m = d._getter(b);
                    a.call(e, m, b, d) && h.push(m)
                }
                return new this.constructor(h)
            }
        });
        Object.defineProperty(b.prototype, "find", {
            value: function(a) {
                var e = x(this),
                    d = e.length >>> 0;
                if (!t(a)) throw TypeError();
                for (var c = 1 < arguments.length ? arguments[1] : void 0, h = 0; h < d;) {
                    var b = e._getter(h);
                    if (a.call(c, b, h, e)) return b;
                    ++h
                }
            }
        });
        Object.defineProperty(b.prototype, "findIndex", {
            value: function(a) {
                var e = x(this),
                    d = e.length >>> 0;
                if (!t(a)) throw TypeError();
                for (var c = 1 < arguments.length ? arguments[1] : void 0, b = 0; b < d;) {
                    var m = e._getter(b);
                    if (a.call(c, m, b, e)) return b;
                    ++b
                }
                return -1
            }
        });
        Object.defineProperty(b.prototype, "forEach", {
            value: function(a, e) {
                if (void 0 === this || null === this) throw TypeError();
                var d = Object(this),
                    c = d.length >>> 0;
                if (!t(a)) throw TypeError();
                for (var b = 0; b < c; b++) a.call(e, d._getter(b), b, d)
            }
        });
        Object.defineProperty(b.prototype, "indexOf", {
            value: function(a) {
                if (void 0 === this || null === this) throw TypeError();
                var e = Object(this),
                    d = e.length >>> 0;
                if (0 === d) return -1;
                var c = 0;
                0 < arguments.length && (c = Number(arguments[1]), c !== c ? c = 0 : 0 !== c && c !== 1 / 0 && c !== -(1 / 0) && (c = (0 < c || -1) * w(A(c))));
                if (c >= d) return -1;
                for (c = 0 <= c ? c : v(d - A(c), 0); c < d; c++)
                    if (e._getter(c) === a) return c;
                return -1
            }
        });
        Object.defineProperty(b.prototype, "join", {
            value: function(a) {
                if (void 0 === this || null === this) throw TypeError();
                for (var e = Object(this), d = e.length >>> 0, c = Array(d), b = 0; b < d; ++b) c[b] = e._getter(b);
                return c.join(void 0 === a ? "," : a)
            }
        });
        Object.defineProperty(b.prototype, "lastIndexOf", {
            value: function(a) {
                if (void 0 === this || null === this) throw TypeError();
                var b = Object(this),
                    d = b.length >>> 0;
                if (0 === d) return -1;
                var c = d;
                1 < arguments.length && (c = Number(arguments[1]), c !== c ? c = 0 : 0 !== c && c !== 1 / 0 && c !== -(1 / 0) && (c = (0 < c || -1) * w(A(c))));
                for (d = 0 <= c ? u(c, d - 1) : d - A(c); 0 <= d; d--)
                    if (b._getter(d) === a) return d;
                return -1
            }
        });
        Object.defineProperty(b.prototype, "map", {
            value: function(a, b) {
                if (void 0 === this || null === this) throw TypeError();
                var d = Object(this),
                    c = d.length >>> 0;
                if (!t(a)) throw TypeError();
                var e = [];
                e.length = c;
                for (var m = 0; m < c; m++) e[m] = a.call(b, d._getter(m), m, d);
                return new this.constructor(e)
            }
        });
        Object.defineProperty(b.prototype, "reduce", {
            value: function(a) {
                if (void 0 === this || null === this) throw TypeError();
                var b = Object(this),
                    d = b.length >>> 0;
                if (!t(a)) throw TypeError();
                if (0 === d && 1 === arguments.length) throw TypeError();
                var c = 0,
                    h;
                for (h = 2 <= arguments.length ? arguments[1] : b._getter(c++); c < d;) h = a.call(void 0, h, b._getter(c), c, b), c++;
                return h
            }
        });
        Object.defineProperty(b.prototype, "reduceRight", {
            value: function(a) {
                if (void 0 === this || null === this) throw TypeError();
                var b = Object(this),
                    d = b.length >>> 0;
                if (!t(a)) throw TypeError();
                if (0 === d && 1 === arguments.length) throw TypeError();
                var d = d - 1,
                    c;
                for (c = 2 <= arguments.length ? arguments[1] : b._getter(d--); 0 <= d;) c = a.call(void 0, c, b._getter(d), d, b), d--;
                return c
            }
        });
        Object.defineProperty(b.prototype, "reverse", {
            value: function() {
                if (void 0 === this || null === this) throw TypeError();
                for (var a = Object(this), b = a.length >>> 0, d = w(b / 2), c = 0, b = b - 1; c < d; ++c, --b) {
                    var h = a._getter(c);
                    a._setter(c, a._getter(b));
                    a._setter(b, h)
                }
                return a
            }
        });
        Object.defineProperty(b.prototype, "set", {
            value: function(a, b) {
                if (1 > arguments.length) throw SyntaxError("Not enough arguments");
                var d, c, e, g, f, m;
                if ("object" === typeof arguments[0] && arguments[0].constructor === this.constructor) {
                    d = arguments[0];
                    c = arguments[1] >>> 0;
                    if (c + d.length > this.length) throw RangeError("Offset plus length of array is out of range");
                    m = this.byteOffset + c * this.BYTES_PER_ELEMENT;
                    c = d.length * this.BYTES_PER_ELEMENT;
                    if (d.buffer === this.buffer) {
                        e = [];
                        g = 0;
                        for (f = d.byteOffset; g < c; g += 1, f += 1) e[g] = d.buffer._bytes[f];
                        for (g = 0; g < c; g += 1, m += 1) this.buffer._bytes[m] = e[g]
                    } else
                        for (g = 0, f = d.byteOffset; g < c; g += 1, f += 1, m += 1) this.buffer._bytes[m] = d.buffer._bytes[f]
                } else if ("object" === typeof arguments[0] && "undefined" !== typeof arguments[0].length) {
                    d = arguments[0];
                    e = d.length >>> 0;
                    c = arguments[1] >>> 0;
                    if (c + e > this.length) throw RangeError("Offset plus length of array is out of range");
                    for (g = 0; g < e; g += 1) f = d[g], this._setter(c + g, Number(f))
                } else throw TypeError("Unexpected argument type(s)");
            }
        });
        Object.defineProperty(b.prototype, "slice", {
            value: function(a, b) {
                for (var d = x(this), c = d.length >>> 0, e = a >> 0, e = 0 > e ? v(c + e, 0) : u(e, c), g = void 0 === b ? c : b >> 0, c = 0 > g ? v(c + g, 0) : u(g, c), g = new d.constructor(c - e), f = 0; e < c;) {
                    var m = d._getter(e);
                    g._setter(f, m);
                    ++e;
                    ++f
                }
                return g
            }
        });
        Object.defineProperty(b.prototype, "some", {
            value: function(a, b) {
                if (void 0 === this || null === this) throw TypeError();
                var d = Object(this),
                    c = d.length >>> 0;
                if (!t(a)) throw TypeError();
                for (var e = 0; e < c; e++)
                    if (a.call(b, d._getter(e), e, d)) return !0;
                return !1
            }
        });
        Object.defineProperty(b.prototype, "sort", {
            value: function(a) {
                if (void 0 === this || null === this) throw TypeError();
                for (var b = Object(this), d = b.length >>> 0, c = Array(d), g = 0; g < d; ++g) c[g] = b._getter(g);
                a ? c.sort(a) : c.sort();
                for (g = 0; g < d; ++g) b._setter(g, c[g]);
                return b
            }
        });
        Object.defineProperty(b.prototype, "subarray", {
            value: function(a, b) {
                a >>= 0;
                b >>= 0;
                1 > arguments.length && (a = 0);
                2 > arguments.length && (b = this.length);
                0 > a && (a = this.length + a);
                0 > b && (b = this.length + b);
                var d = this.length;
                a = 0 > a ? 0 : a > d ? d : a;
                d = this.length;
                d = (0 > b ? 0 : b > d ? d : b) - a;
                0 > d && (d = 0);
                return new this.constructor(this.buffer, this.byteOffset + a * this.BYTES_PER_ELEMENT, d)
            }
        });
        var l = f(1, H, I),
            g = f(1, J, D),
            n = f(1, K, D),
            q = f(2, M, N),
            r = f(2, O, P),
            U = f(4, Q, R),
            ba = f(4, S, T),
            y = f(4, aa, Z),
            z = f(8, Y, X);
        p.Int8Array = p.Int8Array || l;
        p.Uint8Array = p.Uint8Array || g;
        p.Uint8ClampedArray = p.Uint8ClampedArray || n;
        p.Int16Array = p.Int16Array || q;
        p.Uint16Array = p.Uint16Array || r;
        p.Int32Array = p.Int32Array || U;
        p.Uint32Array = p.Uint32Array || ba;
        p.Float32Array = p.Float32Array || y;
        p.Float64Array = p.Float64Array || z
    })();
    (function() {
        function a(a, b) {
            return t(a.get) ? a.get(b) : a[b]
        }

        function b(a, b, f) {
            if (!(a instanceof ArrayBuffer || "ArrayBuffer" === C(a))) throw TypeError();
            b >>>= 0;
            if (b > a.byteLength) throw RangeError("byteOffset out of range");
            f = void 0 === f ? a.byteLength - b : f >>> 0;
            if (b + f > a.byteLength) throw RangeError("byteOffset and length reference an area beyond the end of the buffer");
            Object.defineProperty(this, "buffer", {
                value: a
            });
            Object.defineProperty(this, "byteLength", {
                value: f
            });
            Object.defineProperty(this, "byteOffset", {
                value: b
            })
        }

        function f(b) {
            return function(g, f) {
                g >>>= 0;
                if (g + b.BYTES_PER_ELEMENT > this.byteLength) throw RangeError("Array index out of range");
                g += this.byteOffset;
                for (var k = new Uint8Array(this.buffer, g, b.BYTES_PER_ELEMENT), n = [], q = 0; q < b.BYTES_PER_ELEMENT; q += 1) n.push(a(k, q));
                !!f === !!l && n.reverse();
                return a(new b((new Uint8Array(n)).buffer), 0)
            }
        }

        function k(b) {
            return function(g, f, k) {
                g >>>= 0;
                if (g + b.BYTES_PER_ELEMENT > this.byteLength) throw RangeError("Array index out of range");
                f = new b([f]);
                f = new Uint8Array(f.buffer);
                var n = [],
                    p;
                for (p = 0; p < b.BYTES_PER_ELEMENT; p += 1) n.push(a(f, p));
                !!k === !!l && n.reverse();
                (new Uint8Array(this.buffer, g, b.BYTES_PER_ELEMENT)).set(n)
            }
        }
        var l = function() {
            var b = new Uint16Array([4660]),
                b = new Uint8Array(b.buffer);
            return 18 === a(b, 0)
        }();
        Object.defineProperty(b.prototype, "getUint8", {
            value: f(Uint8Array)
        });
        Object.defineProperty(b.prototype, "getInt8", {
            value: f(Int8Array)
        });
        Object.defineProperty(b.prototype, "getUint16", {
            value: f(Uint16Array)
        });
        Object.defineProperty(b.prototype, "getInt16", {
            value: f(Int16Array)
        });
        Object.defineProperty(b.prototype, "getUint32", {
            value: f(Uint32Array)
        });
        Object.defineProperty(b.prototype, "getInt32", {
            value: f(Int32Array)
        });
        Object.defineProperty(b.prototype, "getFloat32", {
            value: f(Float32Array)
        });
        Object.defineProperty(b.prototype, "getFloat64", {
            value: f(Float64Array)
        });
        Object.defineProperty(b.prototype, "setUint8", {
            value: k(Uint8Array)
        });
        Object.defineProperty(b.prototype, "setInt8", {
            value: k(Int8Array)
        });
        Object.defineProperty(b.prototype, "setUint16", {
            value: k(Uint16Array)
        });
        Object.defineProperty(b.prototype, "setInt16", {
            value: k(Int16Array)
        });
        Object.defineProperty(b.prototype, "setUint32", {
            value: k(Uint32Array)
        });
        Object.defineProperty(b.prototype, "setInt32", {
            value: k(Int32Array)
        });
        Object.defineProperty(b.prototype, "setFloat32", {
            value: k(Float32Array)
        });
        Object.defineProperty(b.prototype, "setFloat64", {
            value: k(Float64Array)
        });
        p.DataView = p.DataView || b
    })()
})(self);
