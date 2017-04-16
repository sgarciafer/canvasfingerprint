/* md5.min.js */ ;
(function(root, factory) {
    if (typeof define === 'function ' && define.amd) {
        define(factory)
    } else if (typeof exports === 'object') {
        module.exports = factory()
    } else {
        root.md5 = factory()
    }
}(this, function() {
    function md5cycle(x, k) {
        var a = x[0],
            b = x[1],
            c = x[2],
            d = x[3];
        a = ff(a, b, c, d, k[0], 7, -680876936);
        d = ff(d, a, b, c, k[1], 12, -389564586);
        c = ff(c, d, a, b, k[2], 17, 606105819);
        b = ff(b, c, d, a, k[3], 22, -1044525330);
        a = ff(a, b, c, d, k[4], 7, -176418897);
        d = ff(d, a, b, c, k[5], 12, 1200080426);
        c = ff(c, d, a, b, k[6], 17, -1473231341);
        b = ff(b, c, d, a, k[7], 22, -45705983);
        a = ff(a, b, c, d, k[8], 7, 1770035416);
        d = ff(d, a, b, c, k[9], 12, -1958414417);
        c = ff(c, d, a, b, k[10], 17, -42063);
        b = ff(b, c, d, a, k[11], 22, -1990404162);
        a = ff(a, b, c, d, k[12], 7, 1804603682);
        d = ff(d, a, b, c, k[13], 12, -40341101);
        c = ff(c, d, a, b, k[14], 17, -1502002290);
        b = ff(b, c, d, a, k[15], 22, 1236535329);
        a = gg(a, b, c, d, k[1], 5, -165796510);
        d = gg(d, a, b, c, k[6], 9, -1069501632);
        c = gg(c, d, a, b, k[11], 14, 643717713);
        b = gg(b, c, d, a, k[0], 20, -373897302);
        a = gg(a, b, c, d, k[5], 5, -701558691);
        d = gg(d, a, b, c, k[10], 9, 38016083);
        c = gg(c, d, a, b, k[15], 14, -660478335);
        b = gg(b, c, d, a, k[4], 20, -405537848);
        a = gg(a, b, c, d, k[9], 5, 568446438);
        d = gg(d, a, b, c, k[14], 9, -1019803690);
        c = gg(c, d, a, b, k[3], 14, -187363961);
        b = gg(b, c, d, a, k[8], 20, 1163531501);
        a = gg(a, b, c, d, k[13], 5, -1444681467);
        d = gg(d, a, b, c, k[2], 9, -51403784);
        c = gg(c, d, a, b, k[7], 14, 1735328473);
        b = gg(b, c, d, a, k[12], 20, -1926607734);
        a = hh(a, b, c, d, k[5], 4, -378558);
        d = hh(d, a, b, c, k[8], 11, -2022574463);
        c = hh(c, d, a, b, k[11], 16, 1839030562);
        b = hh(b, c, d, a, k[14], 23, -35309556);
        a = hh(a, b, c, d, k[1], 4, -1530992060);
        d = hh(d, a, b, c, k[4], 11, 1272893353);
        c = hh(c, d, a, b, k[7], 16, -155497632);
        b = hh(b, c, d, a, k[10], 23, -1094730640);
        a = hh(a, b, c, d, k[13], 4, 681279174);
        d = hh(d, a, b, c, k[0], 11, -358537222);
        c = hh(c, d, a, b, k[3], 16, -722521979);
        b = hh(b, c, d, a, k[6], 23, 76029189);
        a = hh(a, b, c, d, k[9], 4, -640364487);
        d = hh(d, a, b, c, k[12], 11, -421815835);
        c = hh(c, d, a, b, k[15], 16, 530742520);
        b = hh(b, c, d, a, k[2], 23, -995338651);
        a = ii(a, b, c, d, k[0], 6, -198630844);
        d = ii(d, a, b, c, k[7], 10, 1126891415);
        c = ii(c, d, a, b, k[14], 15, -1416354905);
        b = ii(b, c, d, a, k[5], 21, -57434055);
        a = ii(a, b, c, d, k[12], 6, 1700485571);
        d = ii(d, a, b, c, k[3], 10, -1894986606);
        c = ii(c, d, a, b, k[10], 15, -1051523);
        b = ii(b, c, d, a, k[1], 21, -2054922799);
        a = ii(a, b, c, d, k[8], 6, 1873313359);
        d = ii(d, a, b, c, k[15], 10, -30611744);
        c = ii(c, d, a, b, k[6], 15, -1560198380);
        b = ii(b, c, d, a, k[13], 21, 1309151649);
        a = ii(a, b, c, d, k[4], 6, -145523070);
        d = ii(d, a, b, c, k[11], 10, -1120210379);
        c = ii(c, d, a, b, k[2], 15, 718787259);
        b = ii(b, c, d, a, k[9], 21, -343485551);
        x[0] = add32(a, x[0]);
        x[1] = add32(b, x[1]);
        x[2] = add32(c, x[2]);
        x[3] = add32(d, x[3])
    }

    function cmn(q, a, b, x, s, t) {
        a = add32(add32(a, q), add32(x, t));
        return add32((a << s) | (a >>> (32 - s)), b)
    }

    function ff(a, b, c, d, x, s, t) {
        return cmn((b & c) | ((~b) & d), a, b, x, s, t)
    }

    function gg(a, b, c, d, x, s, t) {
        return cmn((b & d) | (c & (~d)), a, b, x, s, t)
    }

    function hh(a, b, c, d, x, s, t) {
        return cmn(b ^ c ^ d, a, b, x, s, t)
    }

    function ii(a, b, c, d, x, s, t) {
        return cmn(c ^ (b | (~d)), a, b, x, s, t)
    }

    function md51(s) {
        txt = '';
        var n = s.length,
            state = [1732584193, -271733879, -1732584194, 271733878],
            i;
        for (i = 64; i <= s.length; i += 64) {
            md5cycle(state, md5blk(s.substring(i - 64, i)))
        }
        s = s.substring(i - 64);
        var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < s.length; i++) tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i++) tail[i] = 0
        }
        tail[14] = n * 8;
        md5cycle(state, tail);
        return state
    }

    function md5blk(s) {
        var md5blks = [],
            i;
        for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24)
        }
        return md5blks
    }
    var hex_chr = '0123456789abcdef'.split('');

    function rhex(n) {
        var s = '',
            j = 0;
        for (; j < 4; j++) s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
        return s
    }

    function hex(x) {
        for (var i = 0; i < x.length; i++) x[i] = rhex(x[i]);
        return x.join('')
    }

    function md5(s) {
        return hex(md51(s))
    }

    function add32(a, b) {
        return (a + b) & 0xFFFFFFFF
    }
    if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
        function add32(x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF),
                msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF)
        }
    }
    return md5
}));
/* pngtoy version 0.5.5 ALPHA (c) 2015-2016 Epistemex.com MIT License +pngtoy.js +pngtoy.chunks.js +pngtoy.chunk.bkgd.js +pngtoy.chunk.chrm.js +pngtoy.chunk.ext.offs.js +pngtoy.chunk.ext.pcal.js +pngtoy.chunk.ext.scal.js +pngtoy.chunk.ext.ster.js +pngtoy.chunk.gama.js +pngtoy.chunk.hist.js +pngtoy.chunk.ihdr.js +pngtoy.chunk.phys.js +pngtoy.chunk.plte.js +pngtoy.chunk.sbit.js +pngtoy.chunk.splt.js +pngtoy.chunk.srgb.js +pngtoy.chunk.text.js +pngtoy.chunk.time.js +pngtoy.chunk.trns.js -PngImage.js -pako_inflate.js -pngtoy.chunk.iccp.js -pngtoy.chunk.idat.js -pngtoy.chunk.itxt.js -pngtoy.chunk.ztxt.js -pngtoy.convert.canvas.js -pngtoy.convert.rgba.js -pngtoy.decode.js */
function PngToy(a) {
    a = a || {};
    this.doCRC = "boolean" === typeof a.doCRC ? a.doCRC : !0;
    this.allowInvalid = "boolean" === typeof a.allowInvalid ? a.allowInvalid : !1;
    this.beforeSend = a.beforeSend || function(a) {};
    this.chunks = this.view = this.buffer = this.url = null;
    this.debug = {}
}
PngToy.prototype = {
    fetch: function(a) {
        var b = this;
        b.url = a;
        b.buffer = b.chunks = b.view = null;
        b._pos = 0;
        return new Promise(function(f, c) {
            try {
                var d = new XMLHttpRequest;
                d.open("GET", a, !0);
                d.responseType = "arraybuffer";
                b.beforeSend(d);
                d.onerror = function(a) {
                    c("Network error. " + a.message)
                };
                d.onload = function() {
                    if (200 === d.status) {
                        var a = new DataView(d.response);
                        2303741511 === a.getUint32(0) && 218765834 === a.getUint32(4) ? (b.buffer = a.buffer, b.view = a, a = PngToy._getChunks(b.buffer, b.view, b.doCRC, b.allowInvalid), b.chunks = a.chunks || null, b.chunks || b.allowInvalid ? f() : c(a.error)) : c("Not a PNG file.")
                    } else c("Loading error:" + d.statusText)
                };
                d.send()
            } catch (g) {
                c(g.message)
            }
        })
    },
    getChunk: function(a) {
        return -1 < "IHDR IDAT PLTE sPLT tRNS iTXt tEXt zTXt iCCP gAMA cHRM sRGB hIST sBIT pHYs bKGD tIME oFFs sTER sCAL pCAL IEND".split(" ").indexOf(a) ? "IEND" === a ? !!PngToy._findChunk(this.chunks, "IEND") : PngToy["_" + a](this) : PngToy._findChunk(this.chunks, a)
    },
    getGammaLUT: function(a, b, f) {
        a = a || 1;
        b = b || 2.2;
        f = f || 1;
        var c = new Uint8Array(256),
            d = 0;
        for (a = 1 / (a * b * f); 256 > d; d++) c[d] = 255 * Math.pow(d / 255, a) + .5 | 0;
        return c
    },
    guessDisplayGamma: function() {
        return -1 < navigator.userAgent.indexOf("Mac OS") ? 1.8 : 2.2
    }
};
PngToy._blockSize = 3E6;
PngToy._delay = 7;
PngToy._getChunks = function(a, b, f, c) {
    function d(a, b, c) {
        a = PngToy._findChunks(h, a);
        return 0 > c ? a.length >= b : a.length >= b && a.length <= c
    }

    function g(a, b, c) {
        return e(a, b) && e(b, c)
    }

    function e(a, b) {
        var c = -1,
            d = -1,
            e, f = h.length;
        for (e = 0; e < f; e++) h[e].name === a && (c = e), h[e].name === b && (d = e);
        return c < d
    }

    function k(b) {
        var c = new Uint8Array(a, b.offset - 4, b.length + 4),
            d = b.crc,
            e = 4294967295,
            f = c.length,
            g;
        for (g = 0; g < f; g++) e = e >>> 8 ^ r.table[(e ^ c[g]) & 255];
        b.crcOk = d === (e ^ -1) >>> 0
    }

    function n() {
        var a = q(),
            b = String.fromCharCode;
        return b((a & 4278190080) >>> 24) + b((a & 16711680) >>> 16) + b((a & 65280) >>> 8) + b((a & 255) >>> 0)
    }

    function q() {
        var a = b.getUint32(p);
        p += 4;
        return a >>> 0
    }
    var r = this,
        p = 8,
        v = a.byteLength,
        h = [],
        m, t, l, w, x = !0,
        y = ["iTXT", "tIME", "tEXt", "zTXt"],
        u = PngToy._findChunk;
    if (f && !this.table)
        for (this.table = new Uint32Array(256), l = 0; 256 > l; l++) {
            m = l >>> 0;
            for (t = 0; 8 > t; t++) m = m & 1 ? 3988292384 ^ m >>> 1 : m >>> 1;
            this.table[l] = m
        }
    for (; p < v;) {
        t = q();
        l = n();
        if (2147483647 < t && !c) return {
            error: "Invalid chunk size."
        };
        w = p;
        p = w + t;
        m = q();
        m = new PngToy.Chunk(l, w, t, m);
        if (f && (k(m), !m.crcOk && !c)) return {
            error: "Invalid CRC in chunk " + l
        };
        if (m.isReserved && !c) return {
            error: "Invalid chunk name: " + l
        };
        h.push(m)
    }
    if (!c) {
        if (!d("IHDR", 1, 1)) return {
            error: "Invalid number of IHDR chunks."
        };
        if (!d("tIME", 0, 1)) return {
            error: "Invalid number of tIME chunks."
        };
        if (!d("zTXt", 0, -1)) return {
            error: "Invalid number of zTXt chunks."
        };
        if (!d("tEXt", 0, -1)) return {
            error: "Invalid number of tEXt chunks."
        };
        if (!d("iTXt", 0, -1)) return {
            error: "Invalid number of iTXt chunks."
        };
        if (!d("pHYs", 0, 1)) return {
            error: "Invalid number of pHYs chunks."
        };
        if (!d("sPLT", 0, -1)) return {
            error: "Invalid number of sPLT chunks."
        };
        if (!d("iCCP", 0, 1)) return {
            error: "Invalid number of iCCP chunks."
        };
        if (!d("sRGB", 0, 1)) return {
            error: "Invalid number of sRGB chunks."
        };
        if (!d("sBIT", 0, 1)) return {
            error: "Invalid number of sBIT chunks."
        };
        if (!d("gAMA", 0, 1)) return {
            error: "Invalid number of gAMA chunks."
        };
        if (!d("cHRM", 0, 1)) return {
            error: "Invalid number of cHRM chunks."
        };
        if (!d("PLTE", 0, 1)) return {
            error: "Invalid number of PLTE chunks."
        };
        if (!d("tRNS", 0, 1)) return {
            error: "Invalid number of tRNS chunks."
        };
        if (!d("hIST", 0, 1)) return {
            error: "Invalid number of hIST chunks."
        };
        if (!d("bKGD", 0, 1)) return {
            error: "Invalid number of bKGD chunks."
        };
        if (!d("IDAT", 1, -1)) return {
            error: "Invalid number of IDAT chunks."
        };
        if (!d("IEND", 1, 1)) return {
            error: "Invalid number of IEND chunks."
        };
        if ("IHDR" !== h[0].name || "IEND" !== h[h.length - 1].name) return {
            error: "Invalid PNG chunk order."
        };
        f = b.getUint8(u(h, "IHDR").offset + 9);
        c = u(h, "PLTE");
        m = u(h, "hIST");
        v = u(h, "tRNS");
        l = u(h, "oFFs");
        t = u(h, "sTER");
        if (u(h, "iCCP") && u(h, "sRGB")) return {
            error: "Both iCCP and sRGB cannot be present."
        };
        if (3 === f && !c) return {
            error: "Missing PLTE chunk."
        };
        if ((0 === f || 4 === f) && c) return {
            error: "PLTE chunk should not appear with this color type."
        };
        if ((4 === f || 6 === f) && v) return {
            error: "tRNS chunk should not appear with this color type."
        };
        if (m && !c) return {
            error: "hIST chunk can only appear if a PLTE chunk is present."
        };
        if (c) {
            if (!e("PLTE", "IDAT")) return {
                error: "Invalid chunk order for PLTE."
            };
            if (m && !g("PLTE", "hIST", "IDAT")) return {
                error: "Invalid chunk order for hIST."
            };
            if (v && !g("PLTE", "tRNS", "IDAT")) return {
                error: "Invalid chunk order for tRNS."
            };
            if (u(h, "bKGD") && !g("PLTE", "bKGD", "IDAT")) return {
                error: "Invalid chunk order for bKGD."
            };
            if (!e("cHRM", "PLTE")) return {
                error: "Invalid chunk order for cHRM."
            };
            if (!e("gAMA", "PLTE")) return {
                error: "Invalid chunk order for gAMA."
            };
            if (!e("iCCP", "PLTE")) return {
                error: "Invalid chunk order for iCCP."
            };
            if (!e("sRGB", "PLTE")) return {
                error: "Invalid chunk order for sRGB."
            }
        }
        if (l && !e("oFFs", "IDAT")) return {
            error: "Invalid chunk order for oFFs."
        };
        if (t && !e("sTER", "IDAT")) return {
            error: "Invalid chunk order for sTER."
        };
        for (l = h.length - 2; 0 < l; l--)
            if (x && "IDAT" !== h[l].name && 0 > y.indexOf(h[l].name)) x = !1;
            else if (!x && "IDAT" === h[l].name) return {
            error: "Invalid chunk inside IDAT chunk sequence."
        }
    }
    return {
        chunks: h
    }
};
PngToy._getChunks.table = null;
PngToy._findChunk = function(a, b) {
    for (var f = 0, c; c = a[f++];)
        if (c.name === b) return c;
    return null
};
PngToy._findChunks = function(a, b) {
    for (var f = 0, c = [], d; d = a[f++];) d.name === b && c.push(d);
    return c
};
PngToy._getStr = function(a, b, f) {
    var c = "",
        d = -1,
        g, e = !1,
        k = String.fromCharCode;
    for (f += b; b < f && d;)
        if (d = a.getUint8(b++)) g = k(d), -1 < " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!\"%&'()*+,-./:;<=>?_".indexOf(g) ? c += g : e = !0;
        else break;
    return {
        offset: b,
        text: c,
        warning: e
    }
};
PngToy.Chunk = function(a, b, f, c) {
    this.name = a;
    this.offset = b;
    this.length = f;
    this.crc = c;
    this.crcOk = !0;
    this.isCritical = !(a.charCodeAt(0) & 32);
    this.isPrivate = !!(a.charCodeAt(1) & 32);
    this.isReserved = !!(a.charCodeAt(2) & 32);
    this.isCopySafe = !!(a.charCodeAt(3) & 32)
};
PngToy._bKGD = function(a) {
    var b = a.view,
        f = PngToy._findChunk(a.chunks, "bKGD");
    a = PngToy._IHDR(a);
    if (!f) return null;
    switch (a.type) {
        case 0:
        case 4:
            return {
                background: [b.getUint16(f.offset)]
            };
        case 2:
        case 6:
            return {
                background: new Uint16Array(b.buffer, f.offset, 6)
            };
        default:
            return {
                index: b.getUint8(f.offset)
            }
    }
};
PngToy._cHRM = function(a) {
    var b = a.view;
    a = PngToy._findChunk(a.chunks, "cHRM");
    if (!a) return null;
    a = a.offset;
    return {
        whiteX: b.getUint32(a) / 1E5,
        whiteY: b.getUint32(a + 4) / 1E5,
        redX: b.getUint32(a + 8) / 1E5,
        redY: b.getUint32(a + 12) / 1E5,
        greenX: b.getUint32(a + 16) / 1E5,
        greenY: b.getUint32(a + 20) / 1E5,
        blueX: b.getUint32(a + 24) / 1E5,
        blueY: b.getUint32(a + 28) / 1E5
    }
};
PngToy._oFFs = function(a) {
    var b = a.view,
        f = a.allowInvalid,
        c = PngToy._findChunk(a.chunks, "oFFs");
    a = {};
    if (!c) return null;
    c = c.offset;
    a.x = b.getInt32(c);
    a.y = b.getInt32(c + 4);
    a.unit = b.getUint8(c + 8);
    a.desc = ["Pixels", "Micrometers"][a.unit] || "Invalid";
    return !f && (0 > a.unit || 1 < a.unit) ? {
        error: "Invalid unit for oFFs chunk."
    } : a
};
PngToy._pCAL = function(a) {
    var b = a.view,
        f = a.allowInvalid;
    a = PngToy._findChunk(a.chunks, "pCAL");
    var c = !1,
        d, g, e = {},
        k = [],
        n = 0,
        q;
    if (!a.length) return null;
    d = a.offset;
    g = PngToy._getStr(b, d, 80);
    e.calName = g.text;
    d = g.offset;
    g.warn && (c = !0);
    e.x0 = b.getInt32(d);
    e.x1 = b.getInt32(d + 4);
    e.eqType = b.getUint8(d + 8);
    e.eqDesc = ["Linear mapping", "Base-e exponential mapping", "Arbitrary-base exponential mapping", "Hyperbolic mapping"][e.eqType] || null;
    e.paramCount = b.getUint8(d + 9);
    g = PngToy._getStr(b, d + 10, 1E4);
    e.unitName = g.text;
    d = g.offset;
    g.warn && (c = !0);
    for (q = e.paramCount - 1; n < q; n++) g = PngToy._getStr(b, d, 1E4), k.push(g.text), d = g.offset, g.warn && (c = !0);
    g = PngToy._getStr(b, d, a.length - (d - a.offset));
    k.push(g.text);
    g.warn && (c = !0);
    e.parameters = k;
    if (!f) {
        if (e.x0 === e.x1) return {
            error: "Invalid x0 or x1."
        };
        if (k.length !== e.paramCount) return {
            error: "Mismatching parameter count and number of parameters."
        };
        if (0 > e.eqType || 3 < e.eqType) return {
            error: "Invalid equation type."
        };
        if (c) return {
            error: "One or more text field contains illegal chars."
        }
    }
    return e
};
PngToy._sCAL = function(a) {
    var b = a.view,
        f = a.allowInvalid;
    a = PngToy._findChunk(a.chunks, "sCAL");
    var c, d = {};
    if (!a.length) return null;
    c = a.offset;
    d.unit = b.getUint8(c++);
    d.desc = ["meters", "radians"][d.unit] || null;
    c = PngToy._getStr(b, c, 1E5);
    d.unitsX = c.text;
    c = c.offset;
    c = PngToy._getStr(b, c, a.length - (c - a.offset));
    d.unitsY = c.text;
    return !f && (1 > d.unit || 2 < d.unit) ? {
        error: "Invalid unit"
    } : d
};
PngToy._sTER = function(a) {
    var b = a.view,
        f = a.allowInvalid;
    a = PngToy._findChunk(a.chunks, "sTER");
    var c = {};
    if (!a) return null;
    c.mode = b.getUint8(a.offset);
    c.desc = ["Cross-fuse layout", "Diverging-fuse layout"][c.mode];
    return !f && (0 > c.mode || 1 < c.mode) ? {
        error: "Invalid mode for sTER chunk."
    } : c
};
PngToy._gAMA = function(a) {
    var b = a.view;
    return (a = PngToy._findChunk(a.chunks, "gAMA")) ? {
        gamma: b.getUint32(a.offset) / 1E5
    } : null
};
PngToy._hIST = function(a) {
    var b = a.view,
        f = a.allowInvalid,
        c = PngToy._findChunk(a.chunks, "hIST");
    a = PngToy._PLTE(a);
    var d = [],
        g;
    if (!c) return null;
    if (!f && c.length % 2) return {
        error: "Invalid length of hIST chunk."
    };
    g = c.offset;
    for (c = g + c.length; g < c; g += 2) d.push(b.getUint16(g));
    return f || d.length === a.length ? {
        histogram: d
    } : {
        error: "hIST chunk must have same number of entries as PLTE chunk."
    }
};
PngToy._IHDR = function(a) {
    var b = a.view,
        f = a.allowInvalid;
    a = PngToy._findChunk(a.chunks, "IHDR");
    if (!a) return {
        error: "Critical - IHDR chunk is missing."
    };
    a = a.offset;
    b = {
        width: b.getUint32(a),
        height: b.getUint32(a + 4),
        depth: b.getUint8(a + 8),
        type: b.getUint8(a + 9),
        compression: b.getUint8(a + 10),
        filter: b.getUint8(a + 11),
        interlaced: b.getUint8(a + 12)
    };
    if (!f) {
        if (0 > [0, 2, 3, 4, 6].indexOf(b.type)) return {
            error: "Invalid color type."
        };
        switch (b.type) {
            case 0:
                if (0 > [1, 2, 4, 8, 16].indexOf(b.depth)) return {
                    error: "Invalid color depth."
                };
                break;
            case 3:
                if (0 > [1, 2, 4, 8].indexOf(b.depth)) return {
                    error: "Invalid color depth."
                };
                break;
            default:
                if (0 > [8, 16].indexOf(b.depth)) return {
                    error: "Invalid color depth."
                }
        }
        if (!b.width || !b.height) return {
            error: "Invalid dimension."
        };
        if (b.compression) return {
            error: "Invalid compression type."
        };
        if (b.filter) return {
            error: "Invalid filter type."
        };
        if (0 > b.interlaced || 1 < b.interlaced) return {
            error: "Invalid interlace mode " + b.interlaced
        }
    }
    return b
};
PngToy._pHYs = function(a) {
    var b = a.view,
        f = a.allowInvalid,
        c = PngToy._findChunk(a.chunks, "pHYs");
    a = {};
    if (!c) return null;
    c = c.offset;
    a.ppuX = b.getUint32(c);
    a.ppuY = b.getUint32(c + 4);
    a.unit = b.getUint8(c + 8);
    a.desc = 1 === a.unit ? "Meters" : "ratio";
    if (f) a.ppuX &= 2147483647, a.ppuY &= 2147483647, a.unit &= 1;
    else {
        if (2147483647 < a.ppuX || 2147483647 < a.ppuY) return {
            error: "Invalid unit lengths."
        };
        if (0 > a.unit || 1 < a.unit) return {
            error: "Invalid unit for pHYs chunk."
        }
    }
    return a
};
PngToy._PLTE = function(a) {
    var b = a.buffer,
        f = a.allowInvalid;
    a = PngToy._findChunk(a.chunks, "PLTE");
    if (!a) return null;
    b = new Uint8Array(b, a.offset, a.length);
    if (!f) {
        if (b.length % 3) return {
            error: "Invalid palette size."
        };
        if (3 > b.length || 768 < b.length) return {
            error: "Invalid number of palette entries."
        }
    }
    return {
        palette: b,
        length: b.length / 3
    }
};
PngToy._sBIT = function(a) {
    var b = a.view,
        f = a.allowInvalid,
        c = PngToy._findChunk(a.chunks, "sBIT");
    a = PngToy._IHDR(a);
    var d, g = !1,
        e = {
            grey: null,
            alpha: null,
            red: null,
            green: null,
            blue: null
        };
    if (!c) return null;
    c = c.offset;
    d = 3 === a.type ? 8 : a.depth;
    switch (a.type) {
        case 0:
            e.grey = b.getUint8(c);
            break;
        case 2:
        case 3:
            e.red = b.getUint8(c++);
            e.green = b.getUint8(c++);
            e.blue = b.getUint8(c);
            break;
        case 4:
            e.grey = b.getUint8(c++);
            e.alpha = b.getUint8(c);
            break;
        case 6:
            e.red = b.getUint8(c++), e.green = b.getUint8(c++), e.blue = b.getUint8(c++), e.alpha = b.getUint8(c)
    }
    return !f && (null !== e.red && (e.red > d || 0 === e.red) && (g = !0), null !== e.green && (e.green > d || 0 === e.green) && (g = !0), null !== e.blue && (e.blue > d || 0 === e.blue) && (g = !0), null !== e.grey && (e.grey > d || 0 === e.grey) && (g = !0), null !== e.alpha && (e.alpha > d || 0 === e.alpha) && (g = !0), g) ? {
        error: "Invalid sBIT chunk."
    } : e
};
PngToy._sPLT = function(a) {
    var b = a.view,
        f = a.allowInvalid;
    a = PngToy._findChunks(a.chunks, "sPLT");
    var c = [];
    if (!a.length) return null;
    a.forEach(function(a) {
        var d = {
                depth: null,
                name: null,
                palette: [],
                entries: 0
            },
            e, k, n, q = [],
            r, p;
        e = a.offset;
        e = PngToy._getStr(b, e, 80);
        d.name = e.text;
        e = e.offset;
        d.depth = b.getUint8(e++);
        k = 8 === d.depth ? 6 : 10;
        n = 8 === d.depth ? 1 : 2;
        a = a.length - (e - a.offset);
        p = 6 === k ? b.getUint8.bind(b) : b.getUint16.bind(b);
        for (r = 0; r < a; r += k) q.push(p(e + r), p(e + r + n), p(e + r + 2 * n), p(e + r + 3 * n), b.getUint16(e + r + 4 * n));
        d.palette = q;
        d.entries = q.length / k;
        if (!f && (8 === d.depth && a % 6 || 16 === d.depth && a % 10)) return {
            error: "Invalid sPLT chunk."
        };
        c.push(d)
    });
    return c
};
PngToy._sRGB = function(a) {
    var b = a.view,
        f = a.allowInvalid;
    a = PngToy._findChunk(a.chunks, "sRGB");
    if (!a) return null;
    b = b.getUint8(a.offset);
    return !f && (0 > b || 3 < b) ? {
        error: "Invalid range for sRGB render intent."
    } : {
        intent: b,
        desc: ["Perceptual", "Relative colorimetric", "Saturation", "Absolute colorimetric"][b] || null
    }
};
PngToy._tEXt = function(a) {
    var b = a.view,
        f = a.allowInvalid;
    a = PngToy._findChunks(a.chunks, "tEXt");
    var c = !1,
        d = !1,
        g, e, k, n, q = [];
    if (!a.length) return null;
    a.forEach(function(a) {
        if (!d) {
            var p = {};
            g = a.offset;
            k = PngToy._getStr(b, g, 80);
            p.keyword = k.text;
            g = k.offset;
            k.warn && (c = !0);
            e = new Uint8Array(b.buffer, g, a.length - (g - a.offset));
            k = "";
            for (n = 0; n < e.length; n++) k += String.fromCharCode(e[n]);
            p.text = k;
            q.push(p);
            if (!f && c) return d = !0, {
                error: "One or more field contains illegal chars."
            }
        }
    });
    return q
};
PngToy._tIME = function(a) {
    var b = a.view,
        f = a.allowInvalid;
    a = PngToy._findChunk(a.chunks, "tIME");
    if (!a) return null;
    a = a.offset;
    b = {
        year: b.getUint16(a),
        month: b.getUint8(a + 2),
        day: b.getUint8(a + 3),
        hour: b.getUint8(a + 4),
        minute: b.getUint8(a + 5),
        second: b.getUint8(a + 6),
        date: null
    };
    if (!f && (0 > b.year || 65535 < b.year || 1 > b.month || 12 < b.month || 1 > b.day || 31 < b.day || 0 > b.hour || 23 < b.hour || 0 > b.minute || 59 < b.minute || 0 > b.second || 60 < b.second)) return {
        error: "Invalid timestamp."
    };
    try {
        b.date = new Date(b.year, b.month - 1, b.day, b.hour, b.minute, Math.min(59, b.second))
    } catch (c) {
        if (!f) return {
            error: c
        }
    }
    return b
};
PngToy._tRNS = function(a) {
    var b = a.buffer,
        f = a.allowInvalid,
        c = PngToy._findChunk(a.chunks, "tRNS"),
        d = PngToy._PLTE(a);
    a = PngToy._IHDR(a);
    if (!c) return null;
    if (!f && 2 === a.type && c.length % 6) return {
        error: "Invalid tRNS length."
    };
    switch (a.type) {
        case 0:
            b = {
                alphas: new Uint16Array(b.slice(c.offset, c.offset + c.length)),
                length: c.length >> 1
            };
            break;
        case 2:
            b = {
                alphas: new Uint16Array(b.slice(c.offset, c.offset + c.length)),
                length: c.length / 6
            };
            break;
        case 3:
            b = {
                alphas: new Uint8Array(b, c.offset, c.length),
                length: c.length
            };
            break;
        default:
            return f ? {
                alphas: null,
                length: 0
            } : {
                error: "tRNS chunk is not valid for this color type."
            }
    }
    return !f && d && b.length > d.length ? {
        error: "tRNS chunk contains more entries than palette entries."
    } : b
};
/* https://browserleaks.com/js/canvas.js */
PngToy.prototype.fetchDataURL = function(a) {
    var b = this;
    return b.url = a, b.buffer = b.chunks = b.view = null, b._pos = 0, new Promise(function(c, d) {
        try {
            for (var e = new ArrayBuffer(a.length), f = new Uint8Array(e), g = 0, h = a.length; g < h; g++) f[g] = a.charCodeAt(g);
            var i, j = new DataView(e);
            2303741511 === j.getUint32(0) && 218765834 === j.getUint32(4) ? (b.buffer = j.buffer, b.view = j, i = PngToy._getChunks(b.buffer, b.view, b.doCRC, b.allowInvalid), b.chunks = i.chunks || null, b.chunks || b.allowInvalid ? c() : d(i.error)) : d("Not a PNG file.")
        } catch (a) {
            d(a.message)
        }
    })
}


$(function() {
    function a() {
        $("#load").removeClass("none");
        var a, c = !0,
            d = g(),
            h = g(),
            i = g(),
            j = "Canvas Fingerprint 1.0",
            k = document.getElementById("iframe").contentDocument.createElement("canvas");
        if (k.getContext && (a = k.getContext("2d"))) {
            if (d = f(), "function" == typeof k.getContext("2d").fillText) {
                h = f();
                try {
                    k.setAttribute("width", 220), k.setAttribute("height", 30), a.textBaseline = "top", a.font = "14px 'Arial'", a.textBaseline = "alphabetic", a.fillStyle = "#f60", a.fillRect(125, 1, 62, 20), a.fillStyle = "#069", a.fillText(j, 2, 15), a.fillStyle = "rgba(102, 204, 0, 0.7)", a.fillText(j, 4, 17)
                } catch (b) {
                    console.warn("https://bugzilla.mozilla.org/show_bug.cgi?id=941146", b), k = document.createElement("canvas"), a = k.getContext("2d"), "undefined" == typeof a || "function" != typeof k.getContext("2d").fillText ? (d = g(), h = g(), c = !1) : (k.setAttribute("width", 220), k.setAttribute("height", 30), a.textBaseline = "top", a.font = "14px 'Arial'", a.textBaseline = "alphabetic", a.fillStyle = "#f60", a.fillRect(125, 1, 62, 20), a.fillStyle = "#069", a.fillText(j, 2, 15), a.fillStyle = "rgba(102, 204, 0, 0.7)", a.fillText(j, 4, 17))
                }
            } else c = !1;
            if (c && "function" == typeof k.toDataURL) {
                var l;
                try {
                    if (l = k.toDataURL("image/png"), "boolean" == typeof l || "undefined" == typeof l) throw e
                } catch (a) {
                    l = ""
                }
                0 === l.indexOf("data:image/png") ? i = f() : c = !1
            } else c = !1
        } else c = !1;
        if ($("#is-canvas").html(d), $("#is-canvas-text").html(h), $("#is-canvas-todataurl").html(i), c) {
            b(a, l)
        } else $("#crc-detect").text("n/a"), $(".no").css("opacity", "0.5")
    }

    function b(a, b) {
        var d = atob(b.replace("data:image/png;base64,", ""));
        $("#canvas-img").html('<img src="' + b + '" alt="&nbsp;Error displaying &lt;img&gt; tag" />');
        var e = 0;
        try {
            for (var f = a.getImageData(0, 0, 220, 30), g = new Uint32Array(f.data.buffer), h = g.length, i = {}, j = 0, e = 0; j < h; j++) {
                var k = "" + (16777215 & g[j]);
                i[k] || (e++, i[k] = 0), i[k]++
            }
        } catch (a) {
            console.warn(a)
        }
        e < 1 && (e = "n/a"), $("#canvas-file-colors").text(e), $("#canvas-file-size").text(d.length + " bytes"), $("#canvas-file-md5").text(md5(d).toUpperCase());
        var l = new PngToy([{
            doCRC: "true"
        }]);
        l.fetchDataURL(d).then(function(a) {
            function b(a, b) {
                var c = "";
                return "IHDR" == a ? (c = "PNG image header: ", c += b.width + "x" + b.height + ", ", c += b.depth + " bits/sample, ", 0 == b.type ? c += "grayscale, " : 2 == b.type ? c += "truecolor, " : 3 == b.type ? c += "paletted, " : 4 == b.type ? c += "grayscale+alpha, " : 6 == b.type && (c += "truecolor+alpha, "), "0" == b.interlaced ? c += "noninterlaced, " : "1" == b.interlaced && (c += "interlaced, "), c = c.slice(0, -2)) : "gAMA" == a ? c = "file gamma = : " + b.gamma : "sRGB" == a ? c = "sRGB color space, rendering intent: " + b.desc : "IDAT" == a ? c = "PNG image data" : "IEND" == a && (c = "end-of-image marker"), c
            }
            for (var d, e, f, g = "IHDR,PLTE,sPLT,tRNS,tEXt,gAMA,cHRM,sRGB,hIST,pHYs,bKGD,tIME,sBIT,oFFs,sTER,sCAL,pCAL", h = "", i = 0, j = l.chunks.length; i < j; i++) {
                for (e = l.chunks[i].crc.toString(16); e.length < 8;) e = "0" + e;
                "IDAT" == l.chunks[i].name && (d = e, $("#crc").html('<span class="good">&#10004;</span> ' + d.toUpperCase())), h += '<tr><td class="nt"></td>', h += '<td class="br t wb">' + l.chunks[i].name + "</td>", h += '<td class="br t wb">' + l.chunks[i].length + "</td>", h += '<td class="br t wb">' + e.toUpperCase() + "</code></td>", f = "";
                try {
                    f = g.indexOf(l.chunks[i].name) != -1 ? b(l.chunks[i].name, l.getChunk(l.chunks[i].name)) : b(l.chunks[i].name), "" == f && g.indexOf(l.chunks[i].name) != -1 && (f = JSON.stringify(l.getChunk(l.chunks[i].name)))
                } catch (a) {
                    console.warn(a)
                }
                "" == f && (f = "parser error"), h += '<td class="t"><div>' + f + "</div></td>", h += "</tr>"
            }
            $("#canvas-file").removeClass("none"), $("#canvas-png").html(h).removeClass("none")/*, clck()*/, c(d)
        }, function(a) {
            $("#crc-detect").text("n/a"), $("#canvas-file").append('<tr><td class="nt"></td><td colspan="4"><span class="bad">&#215;</span>' + a + "</td>").removeClass("none")
        })
    }

    function c(b) {
      //Here is the unic fingerprint.
      $('#result').html(b);
      /*
        b += "", $.ajax({
            type: "GET",
            url: "/xhr/canvas/" + b,
            async: !0,
            dataType: "json"
        }).done(function(a) {
            function c(a, b) {
                return 100 - (100 * a / b).toFixed(2) + "% (" + a + " of " + b + " user agents have the same signature)"
            }
            "ffffffff" != b && ("undefined" != typeof a[b] ? "not_listed" == a[b] ? ("a4e1854e" == b ? ($("#crc-detect").html(g() + " (Tor Browser signature)"), $("#canvas-table").removeClass("none")) : $("#crc-detect").text(c(0, $("#db-sets").data("sets"))), $("#canvas-table").removeClass("none")) : ($("#crc-detect").text(c(a[b].count, $("#db-sets").data("sets"))), $("#crc-verdict-ua").text(a[b].ua[0][0]), $("#crc-verdict-os").text(a[b].os[0][0]), $("#crc-verdict").removeClass("none"), d(a[b])) : ($("#crc").text('<span class="bad">&#215;</span>' + b.toUpperCase()), $("#crc-detect").html('<span class="bad">&#215;</span> Unknown Error (1)')))
        }).fail(function() {
            $("#crc-detect").html('<span class="bad">&#215;</span> Unknown Error (2) <a id="canvas_retry" href="#">retry</a>'), $("#canvas_retry").click(function(b) {
                b.preventDefault(), $("#crc-detect").html('<div id="load"></div>'), a()
            })
        }) */
    }
/*
    function d(a) {
        var b = 0,
            c = [];
        for (var d in a) c[d] = a[d].length, c[d] > 10 && (c[d] = a[d].length = 10), b < c[d] && (b = c[d]);
        b = c.os + c.os_ver, c.ua + c.ua_ver > b && (b = c.ua + c.ua_ver), c.device + c.platform > b && (b = c.device + c.platform), b += 1;
        var e = '<tr><td class="th r" colspan="2"><h3>Operating Systems</h3></td><td class="th r" colspan="2"><h3>Browsers</h3></td><td class="th" colspan="2"><h3>Devices</h3></td></tr>';
        i_os = is_os = 0, i_ua = is_ua = 0, i_pc = is_pc = 0;
        for (var f = 0; f < b; f++) e += "<tr>", "undefined" != typeof a.os[f] ? (i_os++, e += "<td>" + a.os[f][0] + '</td><td class="r">' + a.os[f][1] + "/" + a.count + "</td>") : "undefined" != typeof a.os_ver[f - i_os] ? 0 == is_os ? (i_os++, is_os = 1, e += '<td class="t th r" colspan="2"><h3>OS by Version</h3></td>') : e += "<td>" + a.os_ver[f - i_os][0] + '</td><td class="r">' + a.os_ver[f - i_os][1] + "/" + a.count + "</td>" : e += '<td></td><td class="r"></td>', "undefined" != typeof a.ua[f] ? (i_ua++, e += "<td>" + a.ua[f][0] + '</td><td class="r">' + a.ua[f][1] + "/" + a.count + "</td>") : "undefined" != typeof a.ua_ver[f - i_ua] ? 0 == is_ua ? (i_ua++, is_ua = 1, e += '<td class="t th r" colspan="2"><h3>Browsers by Version</h3></td>') : e += "<td>" + a.ua_ver[f - i_ua][0] + '</td><td class="r">' + a.ua_ver[f - i_ua][1] + "/" + a.count + "</td>" : e += '<td></td><td class="r"></td>', "undefined" != typeof a.device[f] ? (i_pc++, e += "<td>" + a.device[f][0] + "</td><td>" + a.device[f][1] + "/" + a.count + "</td>") : "undefined" != typeof a.platform[f - i_pc] ? 0 == is_pc ? (i_pc++, is_pc = 1, e += '<td class="t th" colspan="2"><h3>Platforms</h3></td>') : e += "<td>" + a.platform[f - i_pc][0] + "</td><td>" + a.platform[f - i_pc][1] + "/" + a.count + "</td>" : e += "<td></td><td></td>", e += "</tr>";
        $("#canvas-table").append(e), $("#canvas-warn-browser, #canvas-table-thead, #canvas-table").removeClass("none"), $("#canvas-table").css("margin-bottom", "2px") /*, clck()*/
/*    }

    function f() {
        return '<span class="good">&#10004;</span> True'
    }

    function g() {
        return '<span class="bad">&#215;</span> False'
    }
    "undefined" != typeof window.atob && "function" == typeof Promise && "function" == typeof ArrayBuffer || ($.ajaxSetup({
        cache: !0,
        async: !1
    }), $.getScript("/js/canvaspolyfill.js")), a()
    */
});
