var E = (t, e) => () => (e || t((e = {
    exports: {}
}).exports, e), e.exports);
var go = E(fr => {
    "use strict";
    fr.byteLength = ol;
    fr.toByteArray = sl;
    fr.fromByteArray = ll;
    var Re = [],
        ye = [],
        il = typeof Uint8Array < "u" ? Uint8Array : Array,
        vn = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (Ke = 0, po = vn.length; Ke < po; ++Ke) Re[Ke] = vn[Ke], ye[vn.charCodeAt(Ke)] = Ke;
    var Ke, po;
    ye[45] = 62;
    ye[95] = 63;

    function yo(t) {
        var e = t.length;
        if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
        var r = t.indexOf("=");
        r === -1 && (r = e);
        var n = r === e ? 0 : 4 - r % 4;
        return [r, n]
    }

    function ol(t) {
        var e = yo(t),
            r = e[0],
            n = e[1];
        return (r + n) * 3 / 4 - n
    }

    function al(t, e, r) {
        return (e + r) * 3 / 4 - r
    }

    function sl(t) {
        var e, r = yo(t),
            n = r[0],
            i = r[1],
            o = new il(al(t, n, i)),
            a = 0,
            s = i > 0 ? n - 4 : n,
            u;
        for (u = 0; u < s; u += 4) e = ye[t.charCodeAt(u)] << 18 | ye[t.charCodeAt(u + 1)] << 12 | ye[t.charCodeAt(u + 2)] << 6 | ye[t.charCodeAt(u + 3)], o[a++] = e >> 16 & 255, o[a++] = e >> 8 & 255, o[a++] = e & 255;
        return i === 2 && (e = ye[t.charCodeAt(u)] << 2 | ye[t.charCodeAt(u + 1)] >> 4, o[a++] = e & 255), i === 1 && (e = ye[t.charCodeAt(u)] << 10 | ye[t.charCodeAt(u + 1)] << 4 | ye[t.charCodeAt(u + 2)] >> 2, o[a++] = e >> 8 & 255, o[a++] = e & 255), o
    }

    function ul(t) {
        return Re[t >> 18 & 63] + Re[t >> 12 & 63] + Re[t >> 6 & 63] + Re[t & 63]
    }

    function fl(t, e, r) {
        for (var n, i = [], o = e; o < r; o += 3) n = (t[o] << 16 & 16711680) + (t[o + 1] << 8 & 65280) + (t[o + 2] & 255), i.push(ul(n));
        return i.join("")
    }

    function ll(t) {
        for (var e, r = t.length, n = r % 3, i = [], o = 16383, a = 0, s = r - n; a < s; a += o) i.push(fl(t, a, a + o > s ? s : a + o));
        return n === 1 ? (e = t[r - 1], i.push(Re[e >> 2] + Re[e << 4 & 63] + "==")) : n === 2 && (e = (t[r - 2] << 8) + t[r - 1], i.push(Re[e >> 10] + Re[e >> 4 & 63] + Re[e << 2 & 63] + "=")), i.join("")
    }
});
var mo = E(Tn => {
    "use strict";
    Tn.read = function(t, e, r, n, i) {
        var o, a, s = i * 8 - n - 1,
            u = (1 << s) - 1,
            d = u >> 1,
            h = -7,
            y = r ? i - 1 : 0,
            _ = r ? -1 : 1,
            T = t[e + y];
        for (y += _, o = T & (1 << -h) - 1, T >>= -h, h += s; h > 0; o = o * 256 + t[e + y], y += _, h -= 8);
        for (a = o & (1 << -h) - 1, o >>= -h, h += n; h > 0; a = a * 256 + t[e + y], y += _, h -= 8);
        if (o === 0) o = 1 - d;
        else {
            if (o === u) return a ? NaN : (T ? -1 : 1) * (1 / 0);
            a = a + Math.pow(2, n), o = o - d
        }
        return (T ? -1 : 1) * a * Math.pow(2, o - n)
    };
    Tn.write = function(t, e, r, n, i, o) {
        var a, s, u, d = o * 8 - i - 1,
            h = (1 << d) - 1,
            y = h >> 1,
            _ = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            T = n ? 0 : o - 1,
            N = n ? 1 : -1,
            z = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
        for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, a = h) : (a = Math.floor(Math.log(e) / Math.LN2), e * (u = Math.pow(2, -a)) < 1 && (a--, u *= 2), a + y >= 1 ? e += _ / u : e += _ * Math.pow(2, 1 - y), e * u >= 2 && (a++, u /= 2), a + y >= h ? (s = 0, a = h) : a + y >= 1 ? (s = (e * u - 1) * Math.pow(2, i), a = a + y) : (s = e * Math.pow(2, y - 1) * Math.pow(2, i), a = 0)); i >= 8; t[r + T] = s & 255, T += N, s /= 256, i -= 8);
        for (a = a << i | s, d += i; d > 0; t[r + T] = a & 255, T += N, a /= 256, d -= 8);
        t[r + T - N] |= z * 128
    }
});
var Qe = E(Et => {
    "use strict";
    var Sn = go(),
        mt = mo(),
        bo = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
    Et.Buffer = p;
    Et.SlowBuffer = gl;
    Et.INSPECT_MAX_BYTES = 50;
    var lr = 2147483647;
    Et.kMaxLength = lr;
    p.TYPED_ARRAY_SUPPORT = cl();
    !p.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");

    function cl() {
        try {
            let t = new Uint8Array(1),
                e = {
                    foo: function() {
                        return 42
                    }
                };
            return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(t, e), t.foo() === 42
        } catch {
            return !1
        }
    }
    Object.defineProperty(p.prototype, "parent", {
        enumerable: !0,
        get: function() {
            if (p.isBuffer(this)) return this.buffer
        }
    });
    Object.defineProperty(p.prototype, "offset", {
        enumerable: !0,
        get: function() {
            if (p.isBuffer(this)) return this.byteOffset
        }
    });

    function je(t) {
        if (t > lr) throw new RangeError('The value "' + t + '" is invalid for option "size"');
        let e = new Uint8Array(t);
        return Object.setPrototypeOf(e, p.prototype), e
    }

    function p(t, e, r) {
        if (typeof t == "number") {
            if (typeof e == "string") throw new TypeError('The "string" argument must be of type string. Received type number');
            return On(t)
        }
        return vo(t, e, r)
    }
    p.poolSize = 8192;

    function vo(t, e, r) {
        if (typeof t == "string") return pl(t, e);
        if (ArrayBuffer.isView(t)) return dl(t);
        if (t == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
        if (xe(t, ArrayBuffer) || t && xe(t.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (xe(t, SharedArrayBuffer) || t && xe(t.buffer, SharedArrayBuffer))) return Rn(t, e, r);
        if (typeof t == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
        let n = t.valueOf && t.valueOf();
        if (n != null && n !== t) return p.from(n, e, r);
        let i = yl(t);
        if (i) return i;
        if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof t[Symbol.toPrimitive] == "function") return p.from(t[Symbol.toPrimitive]("string"), e, r);
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t)
    }
    p.from = function(t, e, r) {
        return vo(t, e, r)
    };
    Object.setPrototypeOf(p.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(p, Uint8Array);

    function To(t) {
        if (typeof t != "number") throw new TypeError('"size" argument must be of type number');
        if (t < 0) throw new RangeError('The value "' + t + '" is invalid for option "size"')
    }

    function hl(t, e, r) {
        return To(t), t <= 0 ? je(t) : e !== void 0 ? typeof r == "string" ? je(t).fill(e, r) : je(t).fill(e) : je(t)
    }
    p.alloc = function(t, e, r) {
        return hl(t, e, r)
    };

    function On(t) {
        return To(t), je(t < 0 ? 0 : Pn(t) | 0)
    }
    p.allocUnsafe = function(t) {
        return On(t)
    };
    p.allocUnsafeSlow = function(t) {
        return On(t)
    };

    function pl(t, e) {
        if ((typeof e != "string" || e === "") && (e = "utf8"), !p.isEncoding(e)) throw new TypeError("Unknown encoding: " + e);
        let r = So(t, e) | 0,
            n = je(r),
            i = n.write(t, e);
        return i !== r && (n = n.slice(0, i)), n
    }

    function An(t) {
        let e = t.length < 0 ? 0 : Pn(t.length) | 0,
            r = je(e);
        for (let n = 0; n < e; n += 1) r[n] = t[n] & 255;
        return r
    }

    function dl(t) {
        if (xe(t, Uint8Array)) {
            let e = new Uint8Array(t);
            return Rn(e.buffer, e.byteOffset, e.byteLength)
        }
        return An(t)
    }

    function Rn(t, e, r) {
        if (e < 0 || t.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds');
        if (t.byteLength < e + (r || 0)) throw new RangeError('"length" is outside of buffer bounds');
        let n;
        return e === void 0 && r === void 0 ? n = new Uint8Array(t) : r === void 0 ? n = new Uint8Array(t, e) : n = new Uint8Array(t, e, r), Object.setPrototypeOf(n, p.prototype), n
    }

    function yl(t) {
        if (p.isBuffer(t)) {
            let e = Pn(t.length) | 0,
                r = je(e);
            return r.length === 0 || t.copy(r, 0, 0, e), r
        }
        if (t.length !== void 0) return typeof t.length != "number" || kn(t.length) ? je(0) : An(t);
        if (t.type === "Buffer" && Array.isArray(t.data)) return An(t.data)
    }

    function Pn(t) {
        if (t >= lr) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + lr.toString(16) + " bytes");
        return t | 0
    }

    function gl(t) {
        return +t != t && (t = 0), p.alloc(+t)
    }
    p.isBuffer = function(e) {
        return e != null && e._isBuffer === !0 && e !== p.prototype
    };
    p.compare = function(e, r) {
        if (xe(e, Uint8Array) && (e = p.from(e, e.offset, e.byteLength)), xe(r, Uint8Array) && (r = p.from(r, r.offset, r.byteLength)), !p.isBuffer(e) || !p.isBuffer(r)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
        if (e === r) return 0;
        let n = e.length,
            i = r.length;
        for (let o = 0, a = Math.min(n, i); o < a; ++o)
            if (e[o] !== r[o]) {
                n = e[o], i = r[o];
                break
            }
        return n < i ? -1 : i < n ? 1 : 0
    };
    p.isEncoding = function(e) {
        switch (String(e).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return !0;
            default:
                return !1
        }
    };
    p.concat = function(e, r) {
        if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (e.length === 0) return p.alloc(0);
        let n;
        if (r === void 0)
            for (r = 0, n = 0; n < e.length; ++n) r += e[n].length;
        let i = p.allocUnsafe(r),
            o = 0;
        for (n = 0; n < e.length; ++n) {
            let a = e[n];
            if (xe(a, Uint8Array)) o + a.length > i.length ? (p.isBuffer(a) || (a = p.from(a)), a.copy(i, o)) : Uint8Array.prototype.set.call(i, a, o);
            else if (p.isBuffer(a)) a.copy(i, o);
            else throw new TypeError('"list" argument must be an Array of Buffers');
            o += a.length
        }
        return i
    };

    function So(t, e) {
        if (p.isBuffer(t)) return t.length;
        if (ArrayBuffer.isView(t) || xe(t, ArrayBuffer)) return t.byteLength;
        if (typeof t != "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t);
        let r = t.length,
            n = arguments.length > 2 && arguments[2] === !0;
        if (!n && r === 0) return 0;
        let i = !1;
        for (;;) switch (e) {
            case "ascii":
            case "latin1":
            case "binary":
                return r;
            case "utf8":
            case "utf-8":
                return xn(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return r * 2;
            case "hex":
                return r >>> 1;
            case "base64":
                return No(t).length;
            default:
                if (i) return n ? -1 : xn(t).length;
                e = ("" + e).toLowerCase(), i = !0
        }
    }
    p.byteLength = So;

    function ml(t, e, r) {
        let n = !1;
        if ((e === void 0 || e < 0) && (e = 0), e > this.length || ((r === void 0 || r > this.length) && (r = this.length), r <= 0) || (r >>>= 0, e >>>= 0, r <= e)) return "";
        for (t || (t = "utf8");;) switch (t) {
            case "hex":
                return xl(this, e, r);
            case "utf8":
            case "utf-8":
                return Ro(this, e, r);
            case "ascii":
                return Al(this, e, r);
            case "latin1":
            case "binary":
                return Rl(this, e, r);
            case "base64":
                return Tl(this, e, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return Ol(this, e, r);
            default:
                if (n) throw new TypeError("Unknown encoding: " + t);
                t = (t + "").toLowerCase(), n = !0
        }
    }
    p.prototype._isBuffer = !0;

    function Je(t, e, r) {
        let n = t[e];
        t[e] = t[r], t[r] = n
    }
    p.prototype.swap16 = function() {
        let e = this.length;
        if (e % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (let r = 0; r < e; r += 2) Je(this, r, r + 1);
        return this
    };
    p.prototype.swap32 = function() {
        let e = this.length;
        if (e % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (let r = 0; r < e; r += 4) Je(this, r, r + 3), Je(this, r + 1, r + 2);
        return this
    };
    p.prototype.swap64 = function() {
        let e = this.length;
        if (e % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (let r = 0; r < e; r += 8) Je(this, r, r + 7), Je(this, r + 1, r + 6), Je(this, r + 2, r + 5), Je(this, r + 3, r + 4);
        return this
    };
    p.prototype.toString = function() {
        let e = this.length;
        return e === 0 ? "" : arguments.length === 0 ? Ro(this, 0, e) : ml.apply(this, arguments)
    };
    p.prototype.toLocaleString = p.prototype.toString;
    p.prototype.equals = function(e) {
        if (!p.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
        return this === e ? !0 : p.compare(this, e) === 0
    };
    p.prototype.inspect = function() {
        let e = "",
            r = Et.INSPECT_MAX_BYTES;
        return e = this.toString("hex", 0, r).replace(/(.{2})/g, "$1 ").trim(), this.length > r && (e += " ... "), "<Buffer " + e + ">"
    };
    bo && (p.prototype[bo] = p.prototype.inspect);
    p.prototype.compare = function(e, r, n, i, o) {
        if (xe(e, Uint8Array) && (e = p.from(e, e.offset, e.byteLength)), !p.isBuffer(e)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
        if (r === void 0 && (r = 0), n === void 0 && (n = e ? e.length : 0), i === void 0 && (i = 0), o === void 0 && (o = this.length), r < 0 || n > e.length || i < 0 || o > this.length) throw new RangeError("out of range index");
        if (i >= o && r >= n) return 0;
        if (i >= o) return -1;
        if (r >= n) return 1;
        if (r >>>= 0, n >>>= 0, i >>>= 0, o >>>= 0, this === e) return 0;
        let a = o - i,
            s = n - r,
            u = Math.min(a, s),
            d = this.slice(i, o),
            h = e.slice(r, n);
        for (let y = 0; y < u; ++y)
            if (d[y] !== h[y]) {
                a = d[y], s = h[y];
                break
            }
        return a < s ? -1 : s < a ? 1 : 0
    };

    function Ao(t, e, r, n, i) {
        if (t.length === 0) return -1;
        if (typeof r == "string" ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, kn(r) && (r = i ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
            if (i) return -1;
            r = t.length - 1
        } else if (r < 0)
            if (i) r = 0;
            else return -1;
        if (typeof e == "string" && (e = p.from(e, n)), p.isBuffer(e)) return e.length === 0 ? -1 : Eo(t, e, r, n, i);
        if (typeof e == "number") return e = e & 255, typeof Uint8Array.prototype.indexOf == "function" ? i ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : Eo(t, [e], r, n, i);
        throw new TypeError("val must be string, number or Buffer")
    }

    function Eo(t, e, r, n, i) {
        let o = 1,
            a = t.length,
            s = e.length;
        if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
            if (t.length < 2 || e.length < 2) return -1;
            o = 2, a /= 2, s /= 2, r /= 2
        }

        function u(h, y) {
            return o === 1 ? h[y] : h.readUInt16BE(y * o)
        }
        let d;
        if (i) {
            let h = -1;
            for (d = r; d < a; d++)
                if (u(t, d) === u(e, h === -1 ? 0 : d - h)) {
                    if (h === -1 && (h = d), d - h + 1 === s) return h * o
                } else h !== -1 && (d -= d - h), h = -1
        } else
            for (r + s > a && (r = a - s), d = r; d >= 0; d--) {
                let h = !0;
                for (let y = 0; y < s; y++)
                    if (u(t, d + y) !== u(e, y)) {
                        h = !1;
                        break
                    }
                if (h) return d
            }
        return -1
    }
    p.prototype.includes = function(e, r, n) {
        return this.indexOf(e, r, n) !== -1
    };
    p.prototype.indexOf = function(e, r, n) {
        return Ao(this, e, r, n, !0)
    };
    p.prototype.lastIndexOf = function(e, r, n) {
        return Ao(this, e, r, n, !1)
    };

    function bl(t, e, r, n) {
        r = Number(r) || 0;
        let i = t.length - r;
        n ? (n = Number(n), n > i && (n = i)) : n = i;
        let o = e.length;
        n > o / 2 && (n = o / 2);
        let a;
        for (a = 0; a < n; ++a) {
            let s = parseInt(e.substr(a * 2, 2), 16);
            if (kn(s)) return a;
            t[r + a] = s
        }
        return a
    }

    function El(t, e, r, n) {
        return cr(xn(e, t.length - r), t, r, n)
    }

    function wl(t, e, r, n) {
        return cr(Bl(e), t, r, n)
    }

    function _l(t, e, r, n) {
        return cr(No(e), t, r, n)
    }

    function vl(t, e, r, n) {
        return cr(Nl(e, t.length - r), t, r, n)
    }
    p.prototype.write = function(e, r, n, i) {
        if (r === void 0) i = "utf8", n = this.length, r = 0;
        else if (n === void 0 && typeof r == "string") i = r, n = this.length, r = 0;
        else if (isFinite(r)) r = r >>> 0, isFinite(n) ? (n = n >>> 0, i === void 0 && (i = "utf8")) : (i = n, n = void 0);
        else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        let o = this.length - r;
        if ((n === void 0 || n > o) && (n = o), e.length > 0 && (n < 0 || r < 0) || r > this.length) throw new RangeError("Attempt to write outside buffer bounds");
        i || (i = "utf8");
        let a = !1;
        for (;;) switch (i) {
            case "hex":
                return bl(this, e, r, n);
            case "utf8":
            case "utf-8":
                return El(this, e, r, n);
            case "ascii":
            case "latin1":
            case "binary":
                return wl(this, e, r, n);
            case "base64":
                return _l(this, e, r, n);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return vl(this, e, r, n);
            default:
                if (a) throw new TypeError("Unknown encoding: " + i);
                i = ("" + i).toLowerCase(), a = !0
        }
    };
    p.prototype.toJSON = function() {
        return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
        }
    };

    function Tl(t, e, r) {
        return e === 0 && r === t.length ? Sn.fromByteArray(t) : Sn.fromByteArray(t.slice(e, r))
    }

    function Ro(t, e, r) {
        r = Math.min(t.length, r);
        let n = [],
            i = e;
        for (; i < r;) {
            let o = t[i],
                a = null,
                s = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
            if (i + s <= r) {
                let u, d, h, y;
                switch (s) {
                    case 1:
                        o < 128 && (a = o);
                        break;
                    case 2:
                        u = t[i + 1], (u & 192) === 128 && (y = (o & 31) << 6 | u & 63, y > 127 && (a = y));
                        break;
                    case 3:
                        u = t[i + 1], d = t[i + 2], (u & 192) === 128 && (d & 192) === 128 && (y = (o & 15) << 12 | (u & 63) << 6 | d & 63, y > 2047 && (y < 55296 || y > 57343) && (a = y));
                        break;
                    case 4:
                        u = t[i + 1], d = t[i + 2], h = t[i + 3], (u & 192) === 128 && (d & 192) === 128 && (h & 192) === 128 && (y = (o & 15) << 18 | (u & 63) << 12 | (d & 63) << 6 | h & 63, y > 65535 && y < 1114112 && (a = y))
                }
            }
            a === null ? (a = 65533, s = 1) : a > 65535 && (a -= 65536, n.push(a >>> 10 & 1023 | 55296), a = 56320 | a & 1023), n.push(a), i += s
        }
        return Sl(n)
    }
    var wo = 4096;

    function Sl(t) {
        let e = t.length;
        if (e <= wo) return String.fromCharCode.apply(String, t);
        let r = "",
            n = 0;
        for (; n < e;) r += String.fromCharCode.apply(String, t.slice(n, n += wo));
        return r
    }

    function Al(t, e, r) {
        let n = "";
        r = Math.min(t.length, r);
        for (let i = e; i < r; ++i) n += String.fromCharCode(t[i] & 127);
        return n
    }

    function Rl(t, e, r) {
        let n = "";
        r = Math.min(t.length, r);
        for (let i = e; i < r; ++i) n += String.fromCharCode(t[i]);
        return n
    }

    function xl(t, e, r) {
        let n = t.length;
        (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
        let i = "";
        for (let o = e; o < r; ++o) i += Ml[t[o]];
        return i
    }

    function Ol(t, e, r) {
        let n = t.slice(e, r),
            i = "";
        for (let o = 0; o < n.length - 1; o += 2) i += String.fromCharCode(n[o] + n[o + 1] * 256);
        return i
    }
    p.prototype.slice = function(e, r) {
        let n = this.length;
        e = ~~e, r = r === void 0 ? n : ~~r, e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n), r < 0 ? (r += n, r < 0 && (r = 0)) : r > n && (r = n), r < e && (r = e);
        let i = this.subarray(e, r);
        return Object.setPrototypeOf(i, p.prototype), i
    };

    function fe(t, e, r) {
        if (t % 1 !== 0 || t < 0) throw new RangeError("offset is not uint");
        if (t + e > r) throw new RangeError("Trying to access beyond buffer length")
    }
    p.prototype.readUintLE = p.prototype.readUIntLE = function(e, r, n) {
        e = e >>> 0, r = r >>> 0, n || fe(e, r, this.length);
        let i = this[e],
            o = 1,
            a = 0;
        for (; ++a < r && (o *= 256);) i += this[e + a] * o;
        return i
    };
    p.prototype.readUintBE = p.prototype.readUIntBE = function(e, r, n) {
        e = e >>> 0, r = r >>> 0, n || fe(e, r, this.length);
        let i = this[e + --r],
            o = 1;
        for (; r > 0 && (o *= 256);) i += this[e + --r] * o;
        return i
    };
    p.prototype.readUint8 = p.prototype.readUInt8 = function(e, r) {
        return e = e >>> 0, r || fe(e, 1, this.length), this[e]
    };
    p.prototype.readUint16LE = p.prototype.readUInt16LE = function(e, r) {
        return e = e >>> 0, r || fe(e, 2, this.length), this[e] | this[e + 1] << 8
    };
    p.prototype.readUint16BE = p.prototype.readUInt16BE = function(e, r) {
        return e = e >>> 0, r || fe(e, 2, this.length), this[e] << 8 | this[e + 1]
    };
    p.prototype.readUint32LE = p.prototype.readUInt32LE = function(e, r) {
        return e = e >>> 0, r || fe(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216
    };
    p.prototype.readUint32BE = p.prototype.readUInt32BE = function(e, r) {
        return e = e >>> 0, r || fe(e, 4, this.length), this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
    };
    p.prototype.readBigUInt64LE = He(function(e) {
        e = e >>> 0, bt(e, "offset");
        let r = this[e],
            n = this[e + 7];
        (r === void 0 || n === void 0) && qt(e, this.length - 8);
        let i = r + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24,
            o = this[++e] + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + n * 2 ** 24;
        return BigInt(i) + (BigInt(o) << BigInt(32))
    });
    p.prototype.readBigUInt64BE = He(function(e) {
        e = e >>> 0, bt(e, "offset");
        let r = this[e],
            n = this[e + 7];
        (r === void 0 || n === void 0) && qt(e, this.length - 8);
        let i = r * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e],
            o = this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n;
        return (BigInt(i) << BigInt(32)) + BigInt(o)
    });
    p.prototype.readIntLE = function(e, r, n) {
        e = e >>> 0, r = r >>> 0, n || fe(e, r, this.length);
        let i = this[e],
            o = 1,
            a = 0;
        for (; ++a < r && (o *= 256);) i += this[e + a] * o;
        return o *= 128, i >= o && (i -= Math.pow(2, 8 * r)), i
    };
    p.prototype.readIntBE = function(e, r, n) {
        e = e >>> 0, r = r >>> 0, n || fe(e, r, this.length);
        let i = r,
            o = 1,
            a = this[e + --i];
        for (; i > 0 && (o *= 256);) a += this[e + --i] * o;
        return o *= 128, a >= o && (a -= Math.pow(2, 8 * r)), a
    };
    p.prototype.readInt8 = function(e, r) {
        return e = e >>> 0, r || fe(e, 1, this.length), this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e]
    };
    p.prototype.readInt16LE = function(e, r) {
        e = e >>> 0, r || fe(e, 2, this.length);
        let n = this[e] | this[e + 1] << 8;
        return n & 32768 ? n | 4294901760 : n
    };
    p.prototype.readInt16BE = function(e, r) {
        e = e >>> 0, r || fe(e, 2, this.length);
        let n = this[e + 1] | this[e] << 8;
        return n & 32768 ? n | 4294901760 : n
    };
    p.prototype.readInt32LE = function(e, r) {
        return e = e >>> 0, r || fe(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
    };
    p.prototype.readInt32BE = function(e, r) {
        return e = e >>> 0, r || fe(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
    };
    p.prototype.readBigInt64LE = He(function(e) {
        e = e >>> 0, bt(e, "offset");
        let r = this[e],
            n = this[e + 7];
        (r === void 0 || n === void 0) && qt(e, this.length - 8);
        let i = this[e + 4] + this[e + 5] * 2 ** 8 + this[e + 6] * 2 ** 16 + (n << 24);
        return (BigInt(i) << BigInt(32)) + BigInt(r + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24)
    });
    p.prototype.readBigInt64BE = He(function(e) {
        e = e >>> 0, bt(e, "offset");
        let r = this[e],
            n = this[e + 7];
        (r === void 0 || n === void 0) && qt(e, this.length - 8);
        let i = (r << 24) + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e];
        return (BigInt(i) << BigInt(32)) + BigInt(this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n)
    });
    p.prototype.readFloatLE = function(e, r) {
        return e = e >>> 0, r || fe(e, 4, this.length), mt.read(this, e, !0, 23, 4)
    };
    p.prototype.readFloatBE = function(e, r) {
        return e = e >>> 0, r || fe(e, 4, this.length), mt.read(this, e, !1, 23, 4)
    };
    p.prototype.readDoubleLE = function(e, r) {
        return e = e >>> 0, r || fe(e, 8, this.length), mt.read(this, e, !0, 52, 8)
    };
    p.prototype.readDoubleBE = function(e, r) {
        return e = e >>> 0, r || fe(e, 8, this.length), mt.read(this, e, !1, 52, 8)
    };

    function he(t, e, r, n, i, o) {
        if (!p.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (e > i || e < o) throw new RangeError('"value" argument is out of bounds');
        if (r + n > t.length) throw new RangeError("Index out of range")
    }
    p.prototype.writeUintLE = p.prototype.writeUIntLE = function(e, r, n, i) {
        if (e = +e, r = r >>> 0, n = n >>> 0, !i) {
            let s = Math.pow(2, 8 * n) - 1;
            he(this, e, r, n, s, 0)
        }
        let o = 1,
            a = 0;
        for (this[r] = e & 255; ++a < n && (o *= 256);) this[r + a] = e / o & 255;
        return r + n
    };
    p.prototype.writeUintBE = p.prototype.writeUIntBE = function(e, r, n, i) {
        if (e = +e, r = r >>> 0, n = n >>> 0, !i) {
            let s = Math.pow(2, 8 * n) - 1;
            he(this, e, r, n, s, 0)
        }
        let o = n - 1,
            a = 1;
        for (this[r + o] = e & 255; --o >= 0 && (a *= 256);) this[r + o] = e / a & 255;
        return r + n
    };
    p.prototype.writeUint8 = p.prototype.writeUInt8 = function(e, r, n) {
        return e = +e, r = r >>> 0, n || he(this, e, r, 1, 255, 0), this[r] = e & 255, r + 1
    };
    p.prototype.writeUint16LE = p.prototype.writeUInt16LE = function(e, r, n) {
        return e = +e, r = r >>> 0, n || he(this, e, r, 2, 65535, 0), this[r] = e & 255, this[r + 1] = e >>> 8, r + 2
    };
    p.prototype.writeUint16BE = p.prototype.writeUInt16BE = function(e, r, n) {
        return e = +e, r = r >>> 0, n || he(this, e, r, 2, 65535, 0), this[r] = e >>> 8, this[r + 1] = e & 255, r + 2
    };
    p.prototype.writeUint32LE = p.prototype.writeUInt32LE = function(e, r, n) {
        return e = +e, r = r >>> 0, n || he(this, e, r, 4, 4294967295, 0), this[r + 3] = e >>> 24, this[r + 2] = e >>> 16, this[r + 1] = e >>> 8, this[r] = e & 255, r + 4
    };
    p.prototype.writeUint32BE = p.prototype.writeUInt32BE = function(e, r, n) {
        return e = +e, r = r >>> 0, n || he(this, e, r, 4, 4294967295, 0), this[r] = e >>> 24, this[r + 1] = e >>> 16, this[r + 2] = e >>> 8, this[r + 3] = e & 255, r + 4
    };

    function xo(t, e, r, n, i) {
        Bo(e, n, i, t, r, 7);
        let o = Number(e & BigInt(4294967295));
        t[r++] = o, o = o >> 8, t[r++] = o, o = o >> 8, t[r++] = o, o = o >> 8, t[r++] = o;
        let a = Number(e >> BigInt(32) & BigInt(4294967295));
        return t[r++] = a, a = a >> 8, t[r++] = a, a = a >> 8, t[r++] = a, a = a >> 8, t[r++] = a, r
    }

    function Oo(t, e, r, n, i) {
        Bo(e, n, i, t, r, 7);
        let o = Number(e & BigInt(4294967295));
        t[r + 7] = o, o = o >> 8, t[r + 6] = o, o = o >> 8, t[r + 5] = o, o = o >> 8, t[r + 4] = o;
        let a = Number(e >> BigInt(32) & BigInt(4294967295));
        return t[r + 3] = a, a = a >> 8, t[r + 2] = a, a = a >> 8, t[r + 1] = a, a = a >> 8, t[r] = a, r + 8
    }
    p.prototype.writeBigUInt64LE = He(function(e, r = 0) {
        return xo(this, e, r, BigInt(0), BigInt("0xffffffffffffffff"))
    });
    p.prototype.writeBigUInt64BE = He(function(e, r = 0) {
        return Oo(this, e, r, BigInt(0), BigInt("0xffffffffffffffff"))
    });
    p.prototype.writeIntLE = function(e, r, n, i) {
        if (e = +e, r = r >>> 0, !i) {
            let u = Math.pow(2, 8 * n - 1);
            he(this, e, r, n, u - 1, -u)
        }
        let o = 0,
            a = 1,
            s = 0;
        for (this[r] = e & 255; ++o < n && (a *= 256);) e < 0 && s === 0 && this[r + o - 1] !== 0 && (s = 1), this[r + o] = (e / a >> 0) - s & 255;
        return r + n
    };
    p.prototype.writeIntBE = function(e, r, n, i) {
        if (e = +e, r = r >>> 0, !i) {
            let u = Math.pow(2, 8 * n - 1);
            he(this, e, r, n, u - 1, -u)
        }
        let o = n - 1,
            a = 1,
            s = 0;
        for (this[r + o] = e & 255; --o >= 0 && (a *= 256);) e < 0 && s === 0 && this[r + o + 1] !== 0 && (s = 1), this[r + o] = (e / a >> 0) - s & 255;
        return r + n
    };
    p.prototype.writeInt8 = function(e, r, n) {
        return e = +e, r = r >>> 0, n || he(this, e, r, 1, 127, -128), e < 0 && (e = 255 + e + 1), this[r] = e & 255, r + 1
    };
    p.prototype.writeInt16LE = function(e, r, n) {
        return e = +e, r = r >>> 0, n || he(this, e, r, 2, 32767, -32768), this[r] = e & 255, this[r + 1] = e >>> 8, r + 2
    };
    p.prototype.writeInt16BE = function(e, r, n) {
        return e = +e, r = r >>> 0, n || he(this, e, r, 2, 32767, -32768), this[r] = e >>> 8, this[r + 1] = e & 255, r + 2
    };
    p.prototype.writeInt32LE = function(e, r, n) {
        return e = +e, r = r >>> 0, n || he(this, e, r, 4, 2147483647, -2147483648), this[r] = e & 255, this[r + 1] = e >>> 8, this[r + 2] = e >>> 16, this[r + 3] = e >>> 24, r + 4
    };
    p.prototype.writeInt32BE = function(e, r, n) {
        return e = +e, r = r >>> 0, n || he(this, e, r, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[r] = e >>> 24, this[r + 1] = e >>> 16, this[r + 2] = e >>> 8, this[r + 3] = e & 255, r + 4
    };
    p.prototype.writeBigInt64LE = He(function(e, r = 0) {
        return xo(this, e, r, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
    });
    p.prototype.writeBigInt64BE = He(function(e, r = 0) {
        return Oo(this, e, r, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
    });

    function Po(t, e, r, n, i, o) {
        if (r + n > t.length) throw new RangeError("Index out of range");
        if (r < 0) throw new RangeError("Index out of range")
    }

    function Io(t, e, r, n, i) {
        return e = +e, r = r >>> 0, i || Po(t, e, r, 4, 34028234663852886e22, -34028234663852886e22), mt.write(t, e, r, n, 23, 4), r + 4
    }
    p.prototype.writeFloatLE = function(e, r, n) {
        return Io(this, e, r, !0, n)
    };
    p.prototype.writeFloatBE = function(e, r, n) {
        return Io(this, e, r, !1, n)
    };

    function ko(t, e, r, n, i) {
        return e = +e, r = r >>> 0, i || Po(t, e, r, 8, 17976931348623157e292, -17976931348623157e292), mt.write(t, e, r, n, 52, 8), r + 8
    }
    p.prototype.writeDoubleLE = function(e, r, n) {
        return ko(this, e, r, !0, n)
    };
    p.prototype.writeDoubleBE = function(e, r, n) {
        return ko(this, e, r, !1, n)
    };
    p.prototype.copy = function(e, r, n, i) {
        if (!p.isBuffer(e)) throw new TypeError("argument should be a Buffer");
        if (n || (n = 0), !i && i !== 0 && (i = this.length), r >= e.length && (r = e.length), r || (r = 0), i > 0 && i < n && (i = n), i === n || e.length === 0 || this.length === 0) return 0;
        if (r < 0) throw new RangeError("targetStart out of bounds");
        if (n < 0 || n >= this.length) throw new RangeError("Index out of range");
        if (i < 0) throw new RangeError("sourceEnd out of bounds");
        i > this.length && (i = this.length), e.length - r < i - n && (i = e.length - r + n);
        let o = i - n;
        return this === e && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(r, n, i) : Uint8Array.prototype.set.call(e, this.subarray(n, i), r), o
    };
    p.prototype.fill = function(e, r, n, i) {
        if (typeof e == "string") {
            if (typeof r == "string" ? (i = r, r = 0, n = this.length) : typeof n == "string" && (i = n, n = this.length), i !== void 0 && typeof i != "string") throw new TypeError("encoding must be a string");
            if (typeof i == "string" && !p.isEncoding(i)) throw new TypeError("Unknown encoding: " + i);
            if (e.length === 1) {
                let a = e.charCodeAt(0);
                (i === "utf8" && a < 128 || i === "latin1") && (e = a)
            }
        } else typeof e == "number" ? e = e & 255 : typeof e == "boolean" && (e = Number(e));
        if (r < 0 || this.length < r || this.length < n) throw new RangeError("Out of range index");
        if (n <= r) return this;
        r = r >>> 0, n = n === void 0 ? this.length : n >>> 0, e || (e = 0);
        let o;
        if (typeof e == "number")
            for (o = r; o < n; ++o) this[o] = e;
        else {
            let a = p.isBuffer(e) ? e : p.from(e, i),
                s = a.length;
            if (s === 0) throw new TypeError('The value "' + e + '" is invalid for argument "value"');
            for (o = 0; o < n - r; ++o) this[o + r] = a[o % s]
        }
        return this
    };
    var gt = {};

    function In(t, e, r) {
        gt[t] = class extends r {
            constructor() {
                super(), Object.defineProperty(this, "message", {
                    value: e.apply(this, arguments),
                    writable: !0,
                    configurable: !0
                }), this.name = `${this.name} [${t}]`, this.stack, delete this.name
            }
            get code() {
                return t
            }
            set code(i) {
                Object.defineProperty(this, "code", {
                    configurable: !0,
                    enumerable: !0,
                    value: i,
                    writable: !0
                })
            }
            toString() {
                return `${this.name} [${t}]: ${this.message}`
            }
        }
    }
    In("ERR_BUFFER_OUT_OF_BOUNDS", function(t) {
        return t ? `${t} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds"
    }, RangeError);
    In("ERR_INVALID_ARG_TYPE", function(t, e) {
        return `The "${t}" argument must be of type number. Received type ${typeof e}`
    }, TypeError);
    In("ERR_OUT_OF_RANGE", function(t, e, r) {
        let n = `The value of "${t}" is out of range.`,
            i = r;
        return Number.isInteger(r) && Math.abs(r) > 2 ** 32 ? i = _o(String(r)) : typeof r == "bigint" && (i = String(r), (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) && (i = _o(i)), i += "n"), n += ` It must be ${e}. Received ${i}`, n
    }, RangeError);

    function _o(t) {
        let e = "",
            r = t.length,
            n = t[0] === "-" ? 1 : 0;
        for (; r >= n + 4; r -= 3) e = `_${t.slice(r-3,r)}${e}`;
        return `${t.slice(0,r)}${e}`
    }

    function Pl(t, e, r) {
        bt(e, "offset"), (t[e] === void 0 || t[e + r] === void 0) && qt(e, t.length - (r + 1))
    }

    function Bo(t, e, r, n, i, o) {
        if (t > r || t < e) {
            let a = typeof e == "bigint" ? "n" : "",
                s;
            throw o > 3 ? e === 0 || e === BigInt(0) ? s = `>= 0${a} and < 2${a} ** ${(o+1)*8}${a}` : s = `>= -(2${a} ** ${(o+1)*8-1}${a}) and < 2 ** ${(o+1)*8-1}${a}` : s = `>= ${e}${a} and <= ${r}${a}`, new gt.ERR_OUT_OF_RANGE("value", s, t)
        }
        Pl(n, i, o)
    }

    function bt(t, e) {
        if (typeof t != "number") throw new gt.ERR_INVALID_ARG_TYPE(e, "number", t)
    }

    function qt(t, e, r) {
        throw Math.floor(t) !== t ? (bt(t, r), new gt.ERR_OUT_OF_RANGE(r || "offset", "an integer", t)) : e < 0 ? new gt.ERR_BUFFER_OUT_OF_BOUNDS : new gt.ERR_OUT_OF_RANGE(r || "offset", `>= ${r?1:0} and <= ${e}`, t)
    }
    var Il = /[^+/0-9A-Za-z-_]/g;

    function kl(t) {
        if (t = t.split("=")[0], t = t.trim().replace(Il, ""), t.length < 2) return "";
        for (; t.length % 4 !== 0;) t = t + "=";
        return t
    }

    function xn(t, e) {
        e = e || 1 / 0;
        let r, n = t.length,
            i = null,
            o = [];
        for (let a = 0; a < n; ++a) {
            if (r = t.charCodeAt(a), r > 55295 && r < 57344) {
                if (!i) {
                    if (r > 56319) {
                        (e -= 3) > -1 && o.push(239, 191, 189);
                        continue
                    } else if (a + 1 === n) {
                        (e -= 3) > -1 && o.push(239, 191, 189);
                        continue
                    }
                    i = r;
                    continue
                }
                if (r < 56320) {
                    (e -= 3) > -1 && o.push(239, 191, 189), i = r;
                    continue
                }
                r = (i - 55296 << 10 | r - 56320) + 65536
            } else i && (e -= 3) > -1 && o.push(239, 191, 189);
            if (i = null, r < 128) {
                if ((e -= 1) < 0) break;
                o.push(r)
            } else if (r < 2048) {
                if ((e -= 2) < 0) break;
                o.push(r >> 6 | 192, r & 63 | 128)
            } else if (r < 65536) {
                if ((e -= 3) < 0) break;
                o.push(r >> 12 | 224, r >> 6 & 63 | 128, r & 63 | 128)
            } else if (r < 1114112) {
                if ((e -= 4) < 0) break;
                o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, r & 63 | 128)
            } else throw new Error("Invalid code point")
        }
        return o
    }

    function Bl(t) {
        let e = [];
        for (let r = 0; r < t.length; ++r) e.push(t.charCodeAt(r) & 255);
        return e
    }

    function Nl(t, e) {
        let r, n, i, o = [];
        for (let a = 0; a < t.length && !((e -= 2) < 0); ++a) r = t.charCodeAt(a), n = r >> 8, i = r % 256, o.push(i), o.push(n);
        return o
    }

    function No(t) {
        return Sn.toByteArray(kl(t))
    }

    function cr(t, e, r, n) {
        let i;
        for (i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i) e[i + r] = t[i];
        return i
    }

    function xe(t, e) {
        return t instanceof e || t != null && t.constructor != null && t.constructor.name != null && t.constructor.name === e.name
    }

    function kn(t) {
        return t !== t
    }
    var Ml = function() {
        let t = "0123456789abcdef",
            e = new Array(256);
        for (let r = 0; r < 16; ++r) {
            let n = r * 16;
            for (let i = 0; i < 16; ++i) e[n + i] = t[r] + t[i]
        }
        return e
    }();

    function He(t) {
        return typeof BigInt > "u" ? Cl : t
    }

    function Cl() {
        throw new Error("BigInt not supported")
    }
});
var jo = E((My, Do) => {
    "use strict";
    var se = Do.exports = {},
        Oe, Pe;

    function Bn() {
        throw new Error("setTimeout has not been defined")
    }

    function Nn() {
        throw new Error("clearTimeout has not been defined")
    }(function() {
        try {
            typeof setTimeout == "function" ? Oe = setTimeout : Oe = Bn
        } catch {
            Oe = Bn
        }
        try {
            typeof clearTimeout == "function" ? Pe = clearTimeout : Pe = Nn
        } catch {
            Pe = Nn
        }
    })();

    function Mo(t) {
        if (Oe === setTimeout) return setTimeout(t, 0);
        if ((Oe === Bn || !Oe) && setTimeout) return Oe = setTimeout, setTimeout(t, 0);
        try {
            return Oe(t, 0)
        } catch {
            try {
                return Oe.call(null, t, 0)
            } catch {
                return Oe.call(this, t, 0)
            }
        }
    }

    function Ll(t) {
        if (Pe === clearTimeout) return clearTimeout(t);
        if ((Pe === Nn || !Pe) && clearTimeout) return Pe = clearTimeout, clearTimeout(t);
        try {
            return Pe(t)
        } catch {
            try {
                return Pe.call(null, t)
            } catch {
                return Pe.call(this, t)
            }
        }
    }
    var Fe = [],
        wt = !1,
        et, hr = -1;

    function Dl() {
        !wt || !et || (wt = !1, et.length ? Fe = et.concat(Fe) : hr = -1, Fe.length && Co())
    }

    function Co() {
        if (!wt) {
            var t = Mo(Dl);
            wt = !0;
            for (var e = Fe.length; e;) {
                for (et = Fe, Fe = []; ++hr < e;) et && et[hr].run();
                hr = -1, e = Fe.length
            }
            et = null, wt = !1, Ll(t)
        }
    }
    se.nextTick = function(t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
        Fe.push(new Lo(t, e)), Fe.length === 1 && !wt && Mo(Co)
    };

    function Lo(t, e) {
        this.fun = t, this.array = e
    }
    Lo.prototype.run = function() {
        this.fun.apply(null, this.array)
    };
    se.title = "browser";
    se.browser = !0;
    se.env = {};
    se.argv = [];
    se.version = "";
    se.versions = {};

    function Ue() {}
    se.on = Ue;
    se.addListener = Ue;
    se.once = Ue;
    se.off = Ue;
    se.removeListener = Ue;
    se.removeAllListeners = Ue;
    se.emit = Ue;
    se.prependListener = Ue;
    se.prependOnceListener = Ue;
    se.listeners = function(t) {
        return []
    };
    se.binding = function(t) {
        throw new Error("process.binding is not supported")
    };
    se.cwd = function() {
        return "/"
    };
    se.chdir = function(t) {
        throw new Error("process.chdir is not supported")
    };
    se.umask = function() {
        return 0
    }
});
var yr = E((Cy, Mn) => {
    "use strict";
    var _t = typeof Reflect == "object" ? Reflect : null,
        Fo = _t && typeof _t.apply == "function" ? _t.apply : function(e, r, n) {
            return Function.prototype.apply.call(e, r, n)
        },
        pr;
    _t && typeof _t.ownKeys == "function" ? pr = _t.ownKeys : Object.getOwnPropertySymbols ? pr = function(e) {
        return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))
    } : pr = function(e) {
        return Object.getOwnPropertyNames(e)
    };

    function jl(t) {
        console && console.warn && console.warn(t)
    }
    var qo = Number.isNaN || function(e) {
        return e !== e
    };

    function K() {
        K.init.call(this)
    }
    Mn.exports = K;
    Mn.exports.once = $l;
    K.EventEmitter = K;
    K.prototype._events = void 0;
    K.prototype._eventsCount = 0;
    K.prototype._maxListeners = void 0;
    var Uo = 10;

    function dr(t) {
        if (typeof t != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t)
    }
    Object.defineProperty(K, "defaultMaxListeners", {
        enumerable: !0,
        get: function() {
            return Uo
        },
        set: function(t) {
            if (typeof t != "number" || t < 0 || qo(t)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t + ".");
            Uo = t
        }
    });
    K.init = function() {
        (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
    };
    K.prototype.setMaxListeners = function(e) {
        if (typeof e != "number" || e < 0 || qo(e)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
        return this._maxListeners = e, this
    };

    function $o(t) {
        return t._maxListeners === void 0 ? K.defaultMaxListeners : t._maxListeners
    }
    K.prototype.getMaxListeners = function() {
        return $o(this)
    };
    K.prototype.emit = function(e) {
        for (var r = [], n = 1; n < arguments.length; n++) r.push(arguments[n]);
        var i = e === "error",
            o = this._events;
        if (o !== void 0) i = i && o.error === void 0;
        else if (!i) return !1;
        if (i) {
            var a;
            if (r.length > 0 && (a = r[0]), a instanceof Error) throw a;
            var s = new Error("Unhandled error." + (a ? " (" + a.message + ")" : ""));
            throw s.context = a, s
        }
        var u = o[e];
        if (u === void 0) return !1;
        if (typeof u == "function") Fo(u, this, r);
        else
            for (var d = u.length, h = Vo(u, d), n = 0; n < d; ++n) Fo(h[n], this, r);
        return !0
    };

    function Wo(t, e, r, n) {
        var i, o, a;
        if (dr(r), o = t._events, o === void 0 ? (o = t._events = Object.create(null), t._eventsCount = 0) : (o.newListener !== void 0 && (t.emit("newListener", e, r.listener ? r.listener : r), o = t._events), a = o[e]), a === void 0) a = o[e] = r, ++t._eventsCount;
        else if (typeof a == "function" ? a = o[e] = n ? [r, a] : [a, r] : n ? a.unshift(r) : a.push(r), i = $o(t), i > 0 && a.length > i && !a.warned) {
            a.warned = !0;
            var s = new Error("Possible EventEmitter memory leak detected. " + a.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            s.name = "MaxListenersExceededWarning", s.emitter = t, s.type = e, s.count = a.length, jl(s)
        }
        return t
    }
    K.prototype.addListener = function(e, r) {
        return Wo(this, e, r, !1)
    };
    K.prototype.on = K.prototype.addListener;
    K.prototype.prependListener = function(e, r) {
        return Wo(this, e, r, !0)
    };

    function Fl() {
        if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
    }

    function Ho(t, e, r) {
        var n = {
                fired: !1,
                wrapFn: void 0,
                target: t,
                type: e,
                listener: r
            },
            i = Fl.bind(n);
        return i.listener = r, n.wrapFn = i, i
    }
    K.prototype.once = function(e, r) {
        return dr(r), this.on(e, Ho(this, e, r)), this
    };
    K.prototype.prependOnceListener = function(e, r) {
        return dr(r), this.prependListener(e, Ho(this, e, r)), this
    };
    K.prototype.removeListener = function(e, r) {
        var n, i, o, a, s;
        if (dr(r), i = this._events, i === void 0) return this;
        if (n = i[e], n === void 0) return this;
        if (n === r || n.listener === r) --this._eventsCount === 0 ? this._events = Object.create(null) : (delete i[e], i.removeListener && this.emit("removeListener", e, n.listener || r));
        else if (typeof n != "function") {
            for (o = -1, a = n.length - 1; a >= 0; a--)
                if (n[a] === r || n[a].listener === r) {
                    s = n[a].listener, o = a;
                    break
                }
            if (o < 0) return this;
            o === 0 ? n.shift() : Ul(n, o), n.length === 1 && (i[e] = n[0]), i.removeListener !== void 0 && this.emit("removeListener", e, s || r)
        }
        return this
    };
    K.prototype.off = K.prototype.removeListener;
    K.prototype.removeAllListeners = function(e) {
        var r, n, i;
        if (n = this._events, n === void 0) return this;
        if (n.removeListener === void 0) return arguments.length === 0 ? (this._events = Object.create(null), this._eventsCount = 0) : n[e] !== void 0 && (--this._eventsCount === 0 ? this._events = Object.create(null) : delete n[e]), this;
        if (arguments.length === 0) {
            var o = Object.keys(n),
                a;
            for (i = 0; i < o.length; ++i) a = o[i], a !== "removeListener" && this.removeAllListeners(a);
            return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
        }
        if (r = n[e], typeof r == "function") this.removeListener(e, r);
        else if (r !== void 0)
            for (i = r.length - 1; i >= 0; i--) this.removeListener(e, r[i]);
        return this
    };

    function Go(t, e, r) {
        var n = t._events;
        if (n === void 0) return [];
        var i = n[e];
        return i === void 0 ? [] : typeof i == "function" ? r ? [i.listener || i] : [i] : r ? ql(i) : Vo(i, i.length)
    }
    K.prototype.listeners = function(e) {
        return Go(this, e, !0)
    };
    K.prototype.rawListeners = function(e) {
        return Go(this, e, !1)
    };
    K.listenerCount = function(t, e) {
        return typeof t.listenerCount == "function" ? t.listenerCount(e) : Zo.call(t, e)
    };
    K.prototype.listenerCount = Zo;

    function Zo(t) {
        var e = this._events;
        if (e !== void 0) {
            var r = e[t];
            if (typeof r == "function") return 1;
            if (r !== void 0) return r.length
        }
        return 0
    }
    K.prototype.eventNames = function() {
        return this._eventsCount > 0 ? pr(this._events) : []
    };

    function Vo(t, e) {
        for (var r = new Array(e), n = 0; n < e; ++n) r[n] = t[n];
        return r
    }

    function Ul(t, e) {
        for (; e + 1 < t.length; e++) t[e] = t[e + 1];
        t.pop()
    }

    function ql(t) {
        for (var e = new Array(t.length), r = 0; r < e.length; ++r) e[r] = t[r].listener || t[r];
        return e
    }

    function $l(t, e) {
        return new Promise(function(r, n) {
            function i(a) {
                t.removeListener(e, o), n(a)
            }

            function o() {
                typeof t.removeListener == "function" && t.removeListener("error", i), r([].slice.call(arguments))
            }
            zo(t, e, o, {
                once: !0
            }), e !== "error" && Wl(t, i, {
                once: !0
            })
        })
    }

    function Wl(t, e, r) {
        typeof t.on == "function" && zo(t, "error", e, r)
    }

    function zo(t, e, r, n) {
        if (typeof t.on == "function") n.once ? t.once(e, r) : t.on(e, r);
        else if (typeof t.addEventListener == "function") t.addEventListener(e, function i(o) {
            n.once && t.removeEventListener(e, i), r(o)
        });
        else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof t)
    }
});
var Ge = E((Ly, Cn) => {
    "use strict";
    typeof Object.create == "function" ? Cn.exports = function(e, r) {
        r && (e.super_ = r, e.prototype = Object.create(r.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }))
    } : Cn.exports = function(e, r) {
        if (r) {
            e.super_ = r;
            var n = function() {};
            n.prototype = r.prototype, e.prototype = new n, e.prototype.constructor = e
        }
    }
});
var Ln = E((Dy, Yo) => {
    "use strict";
    Yo.exports = yr().EventEmitter
});
var Dn = E((jy, Xo) => {
    "use strict";
    Xo.exports = function() {
        if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function") return !1;
        if (typeof Symbol.iterator == "symbol") return !0;
        var e = {},
            r = Symbol("test"),
            n = Object(r);
        if (typeof r == "string" || Object.prototype.toString.call(r) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Symbol]") return !1;
        var i = 42;
        e[r] = i;
        for (var o in e) return !1;
        if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0) return !1;
        var a = Object.getOwnPropertySymbols(e);
        if (a.length !== 1 || a[0] !== r || !Object.prototype.propertyIsEnumerable.call(e, r)) return !1;
        if (typeof Object.getOwnPropertyDescriptor == "function") {
            var s = Object.getOwnPropertyDescriptor(e, r);
            if (s.value !== i || s.enumerable !== !0) return !1
        }
        return !0
    }
});
var $t = E((Fy, Ko) => {
    "use strict";
    var Hl = Dn();
    Ko.exports = function() {
        return Hl() && !!Symbol.toStringTag
    }
});
var jn = E((Uy, Jo) => {
    "use strict";
    Jo.exports = Object
});
var ea = E((qy, Qo) => {
    "use strict";
    Qo.exports = Error
});
var ra = E(($y, ta) => {
    "use strict";
    ta.exports = EvalError
});
var ia = E((Wy, na) => {
    "use strict";
    na.exports = RangeError
});
var aa = E((Hy, oa) => {
    "use strict";
    oa.exports = ReferenceError
});
var Fn = E((Gy, sa) => {
    "use strict";
    sa.exports = SyntaxError
});
var vt = E((Zy, ua) => {
    "use strict";
    ua.exports = TypeError
});
var la = E((Vy, fa) => {
    "use strict";
    fa.exports = URIError
});
var ha = E((zy, ca) => {
    "use strict";
    ca.exports = Math.abs
});
var da = E((Yy, pa) => {
    "use strict";
    pa.exports = Math.floor
});
var ga = E((Xy, ya) => {
    "use strict";
    ya.exports = Math.max
});
var ba = E((Ky, ma) => {
    "use strict";
    ma.exports = Math.min
});
var wa = E((Jy, Ea) => {
    "use strict";
    Ea.exports = Math.pow
});
var va = E((Qy, _a) => {
    "use strict";
    _a.exports = Math.round
});
var Sa = E((eg, Ta) => {
    "use strict";
    Ta.exports = Number.isNaN || function(e) {
        return e !== e
    }
});
var Ra = E((tg, Aa) => {
    "use strict";
    var Gl = Sa();
    Aa.exports = function(e) {
        return Gl(e) || e === 0 ? e : e < 0 ? -1 : 1
    }
});
var Oa = E((rg, xa) => {
    "use strict";
    xa.exports = Object.getOwnPropertyDescriptor
});
var tt = E((ng, Pa) => {
    "use strict";
    var gr = Oa();
    if (gr) try {
        gr([], "length")
    } catch {
        gr = null
    }
    Pa.exports = gr
});
var Wt = E((ig, Ia) => {
    "use strict";
    var mr = Object.defineProperty || !1;
    if (mr) try {
        mr({}, "a", {
            value: 1
        })
    } catch {
        mr = !1
    }
    Ia.exports = mr
});
var Na = E((og, Ba) => {
    "use strict";
    var ka = typeof Symbol < "u" && Symbol,
        Zl = Dn();
    Ba.exports = function() {
        return typeof ka != "function" || typeof Symbol != "function" || typeof ka("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : Zl()
    }
});
var Un = E((ag, Ma) => {
    "use strict";
    Ma.exports = typeof Reflect < "u" && Reflect.getPrototypeOf || null
});
var qn = E((sg, Ca) => {
    "use strict";
    var Vl = jn();
    Ca.exports = Vl.getPrototypeOf || null
});
var ja = E((ug, Da) => {
    "use strict";
    var zl = "Function.prototype.bind called on incompatible ",
        Yl = Object.prototype.toString,
        Xl = Math.max,
        Kl = "[object Function]",
        La = function(e, r) {
            for (var n = [], i = 0; i < e.length; i += 1) n[i] = e[i];
            for (var o = 0; o < r.length; o += 1) n[o + e.length] = r[o];
            return n
        },
        Jl = function(e, r) {
            for (var n = [], i = r || 0, o = 0; i < e.length; i += 1, o += 1) n[o] = e[i];
            return n
        },
        Ql = function(t, e) {
            for (var r = "", n = 0; n < t.length; n += 1) r += t[n], n + 1 < t.length && (r += e);
            return r
        };
    Da.exports = function(e) {
        var r = this;
        if (typeof r != "function" || Yl.apply(r) !== Kl) throw new TypeError(zl + r);
        for (var n = Jl(arguments, 1), i, o = function() {
                if (this instanceof i) {
                    var h = r.apply(this, La(n, arguments));
                    return Object(h) === h ? h : this
                }
                return r.apply(e, La(n, arguments))
            }, a = Xl(0, r.length - n.length), s = [], u = 0; u < a; u++) s[u] = "$" + u;
        if (i = Function("binder", "return function (" + Ql(s, ",") + "){ return binder.apply(this,arguments); }")(o), r.prototype) {
            var d = function() {};
            d.prototype = r.prototype, i.prototype = new d, d.prototype = null
        }
        return i
    }
});
var Tt = E((fg, Fa) => {
    "use strict";
    var ec = ja();
    Fa.exports = Function.prototype.bind || ec
});
var br = E((lg, Ua) => {
    "use strict";
    Ua.exports = Function.prototype.call
});
var Er = E((cg, qa) => {
    "use strict";
    qa.exports = Function.prototype.apply
});
var Wa = E((hg, $a) => {
    "use strict";
    $a.exports = typeof Reflect < "u" && Reflect && Reflect.apply
});
var $n = E((pg, Ha) => {
    "use strict";
    var tc = Tt(),
        rc = Er(),
        nc = br(),
        ic = Wa();
    Ha.exports = ic || tc.call(nc, rc)
});
var wr = E((dg, Ga) => {
    "use strict";
    var oc = Tt(),
        ac = vt(),
        sc = br(),
        uc = $n();
    Ga.exports = function(e) {
        if (e.length < 1 || typeof e[0] != "function") throw new ac("a function is required");
        return uc(oc, sc, e)
    }
});
var Ka = E((yg, Xa) => {
    "use strict";
    var fc = wr(),
        Za = tt(),
        za;
    try {
        za = [].__proto__ === Array.prototype
    } catch (t) {
        if (!t || typeof t != "object" || !("code" in t) || t.code !== "ERR_PROTO_ACCESS") throw t
    }
    var Wn = !!za && Za && Za(Object.prototype, "__proto__"),
        Ya = Object,
        Va = Ya.getPrototypeOf;
    Xa.exports = Wn && typeof Wn.get == "function" ? fc([Wn.get]) : typeof Va == "function" ? function(e) {
        return Va(e == null ? e : Ya(e))
    } : !1
});
var _r = E((gg, ts) => {
    "use strict";
    var Ja = Un(),
        Qa = qn(),
        es = Ka();
    ts.exports = Ja ? function(e) {
        return Ja(e)
    } : Qa ? function(e) {
        if (!e || typeof e != "object" && typeof e != "function") throw new TypeError("getProto: not an object");
        return Qa(e)
    } : es ? function(e) {
        return es(e)
    } : null
});
var Hn = E((mg, rs) => {
    "use strict";
    var lc = Function.prototype.call,
        cc = Object.prototype.hasOwnProperty,
        hc = Tt();
    rs.exports = hc.call(lc, cc)
});
var Vn = E((bg, us) => {
    "use strict";
    var q, pc = jn(),
        dc = ea(),
        yc = ra(),
        gc = ia(),
        mc = aa(),
        xt = Fn(),
        Rt = vt(),
        bc = la(),
        Ec = ha(),
        wc = da(),
        _c = ga(),
        vc = ba(),
        Tc = wa(),
        Sc = va(),
        Ac = Ra(),
        as = Function,
        Gn = function(t) {
            try {
                return as('"use strict"; return (' + t + ").constructor;")()
            } catch {}
        },
        Ht = tt(),
        Rc = Wt(),
        Zn = function() {
            throw new Rt
        },
        xc = Ht ? function() {
            try {
                return arguments.callee, Zn
            } catch {
                try {
                    return Ht(arguments, "callee").get
                } catch {
                    return Zn
                }
            }
        }() : Zn,
        St = Na()(),
        le = _r(),
        Oc = qn(),
        Pc = Un(),
        ss = Er(),
        Gt = br(),
        At = {},
        Ic = typeof Uint8Array > "u" || !le ? q : le(Uint8Array),
        rt = {
            __proto__: null,
            "%AggregateError%": typeof AggregateError > "u" ? q : AggregateError,
            "%Array%": Array,
            "%ArrayBuffer%": typeof ArrayBuffer > "u" ? q : ArrayBuffer,
            "%ArrayIteratorPrototype%": St && le ? le([][Symbol.iterator]()) : q,
            "%AsyncFromSyncIteratorPrototype%": q,
            "%AsyncFunction%": At,
            "%AsyncGenerator%": At,
            "%AsyncGeneratorFunction%": At,
            "%AsyncIteratorPrototype%": At,
            "%Atomics%": typeof Atomics > "u" ? q : Atomics,
            "%BigInt%": typeof BigInt > "u" ? q : BigInt,
            "%BigInt64Array%": typeof BigInt64Array > "u" ? q : BigInt64Array,
            "%BigUint64Array%": typeof BigUint64Array > "u" ? q : BigUint64Array,
            "%Boolean%": Boolean,
            "%DataView%": typeof DataView > "u" ? q : DataView,
            "%Date%": Date,
            "%decodeURI%": decodeURI,
            "%decodeURIComponent%": decodeURIComponent,
            "%encodeURI%": encodeURI,
            "%encodeURIComponent%": encodeURIComponent,
            "%Error%": dc,
            "%eval%": eval,
            "%EvalError%": yc,
            "%Float16Array%": typeof Float16Array > "u" ? q : Float16Array,
            "%Float32Array%": typeof Float32Array > "u" ? q : Float32Array,
            "%Float64Array%": typeof Float64Array > "u" ? q : Float64Array,
            "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? q : FinalizationRegistry,
            "%Function%": as,
            "%GeneratorFunction%": At,
            "%Int8Array%": typeof Int8Array > "u" ? q : Int8Array,
            "%Int16Array%": typeof Int16Array > "u" ? q : Int16Array,
            "%Int32Array%": typeof Int32Array > "u" ? q : Int32Array,
            "%isFinite%": isFinite,
            "%isNaN%": isNaN,
            "%IteratorPrototype%": St && le ? le(le([][Symbol.iterator]())) : q,
            "%JSON%": typeof JSON == "object" ? JSON : q,
            "%Map%": typeof Map > "u" ? q : Map,
            "%MapIteratorPrototype%": typeof Map > "u" || !St || !le ? q : le(new Map()[Symbol.iterator]()),
            "%Math%": Math,
            "%Number%": Number,
            "%Object%": pc,
            "%Object.getOwnPropertyDescriptor%": Ht,
            "%parseFloat%": parseFloat,
            "%parseInt%": parseInt,
            "%Promise%": typeof Promise > "u" ? q : Promise,
            "%Proxy%": typeof Proxy > "u" ? q : Proxy,
            "%RangeError%": gc,
            "%ReferenceError%": mc,
            "%Reflect%": typeof Reflect > "u" ? q : Reflect,
            "%RegExp%": RegExp,
            "%Set%": typeof Set > "u" ? q : Set,
            "%SetIteratorPrototype%": typeof Set > "u" || !St || !le ? q : le(new Set()[Symbol.iterator]()),
            "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? q : SharedArrayBuffer,
            "%String%": String,
            "%StringIteratorPrototype%": St && le ? le("" [Symbol.iterator]()) : q,
            "%Symbol%": St ? Symbol : q,
            "%SyntaxError%": xt,
            "%ThrowTypeError%": xc,
            "%TypedArray%": Ic,
            "%TypeError%": Rt,
            "%Uint8Array%": typeof Uint8Array > "u" ? q : Uint8Array,
            "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? q : Uint8ClampedArray,
            "%Uint16Array%": typeof Uint16Array > "u" ? q : Uint16Array,
            "%Uint32Array%": typeof Uint32Array > "u" ? q : Uint32Array,
            "%URIError%": bc,
            "%WeakMap%": typeof WeakMap > "u" ? q : WeakMap,
            "%WeakRef%": typeof WeakRef > "u" ? q : WeakRef,
            "%WeakSet%": typeof WeakSet > "u" ? q : WeakSet,
            "%Function.prototype.call%": Gt,
            "%Function.prototype.apply%": ss,
            "%Object.defineProperty%": Rc,
            "%Object.getPrototypeOf%": Oc,
            "%Math.abs%": Ec,
            "%Math.floor%": wc,
            "%Math.max%": _c,
            "%Math.min%": vc,
            "%Math.pow%": Tc,
            "%Math.round%": Sc,
            "%Math.sign%": Ac,
            "%Reflect.getPrototypeOf%": Pc
        };
    if (le) try {
        null.error
    } catch (t) {
        ns = le(le(t)), rt["%Error.prototype%"] = ns
    }
    var ns, kc = function t(e) {
            var r;
            if (e === "%AsyncFunction%") r = Gn("async function () {}");
            else if (e === "%GeneratorFunction%") r = Gn("function* () {}");
            else if (e === "%AsyncGeneratorFunction%") r = Gn("async function* () {}");
            else if (e === "%AsyncGenerator%") {
                var n = t("%AsyncGeneratorFunction%");
                n && (r = n.prototype)
            } else if (e === "%AsyncIteratorPrototype%") {
                var i = t("%AsyncGenerator%");
                i && le && (r = le(i.prototype))
            }
            return rt[e] = r, r
        },
        is = {
            __proto__: null,
            "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
            "%ArrayPrototype%": ["Array", "prototype"],
            "%ArrayProto_entries%": ["Array", "prototype", "entries"],
            "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
            "%ArrayProto_keys%": ["Array", "prototype", "keys"],
            "%ArrayProto_values%": ["Array", "prototype", "values"],
            "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
            "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
            "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
            "%BooleanPrototype%": ["Boolean", "prototype"],
            "%DataViewPrototype%": ["DataView", "prototype"],
            "%DatePrototype%": ["Date", "prototype"],
            "%ErrorPrototype%": ["Error", "prototype"],
            "%EvalErrorPrototype%": ["EvalError", "prototype"],
            "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
            "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
            "%FunctionPrototype%": ["Function", "prototype"],
            "%Generator%": ["GeneratorFunction", "prototype"],
            "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
            "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
            "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
            "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
            "%JSONParse%": ["JSON", "parse"],
            "%JSONStringify%": ["JSON", "stringify"],
            "%MapPrototype%": ["Map", "prototype"],
            "%NumberPrototype%": ["Number", "prototype"],
            "%ObjectPrototype%": ["Object", "prototype"],
            "%ObjProto_toString%": ["Object", "prototype", "toString"],
            "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
            "%PromisePrototype%": ["Promise", "prototype"],
            "%PromiseProto_then%": ["Promise", "prototype", "then"],
            "%Promise_all%": ["Promise", "all"],
            "%Promise_reject%": ["Promise", "reject"],
            "%Promise_resolve%": ["Promise", "resolve"],
            "%RangeErrorPrototype%": ["RangeError", "prototype"],
            "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
            "%RegExpPrototype%": ["RegExp", "prototype"],
            "%SetPrototype%": ["Set", "prototype"],
            "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
            "%StringPrototype%": ["String", "prototype"],
            "%SymbolPrototype%": ["Symbol", "prototype"],
            "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
            "%TypedArrayPrototype%": ["TypedArray", "prototype"],
            "%TypeErrorPrototype%": ["TypeError", "prototype"],
            "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
            "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
            "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
            "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
            "%URIErrorPrototype%": ["URIError", "prototype"],
            "%WeakMapPrototype%": ["WeakMap", "prototype"],
            "%WeakSetPrototype%": ["WeakSet", "prototype"]
        },
        Zt = Tt(),
        vr = Hn(),
        Bc = Zt.call(Gt, Array.prototype.concat),
        Nc = Zt.call(ss, Array.prototype.splice),
        os = Zt.call(Gt, String.prototype.replace),
        Tr = Zt.call(Gt, String.prototype.slice),
        Mc = Zt.call(Gt, RegExp.prototype.exec),
        Cc = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
        Lc = /\\(\\)?/g,
        Dc = function(e) {
            var r = Tr(e, 0, 1),
                n = Tr(e, -1);
            if (r === "%" && n !== "%") throw new xt("invalid intrinsic syntax, expected closing `%`");
            if (n === "%" && r !== "%") throw new xt("invalid intrinsic syntax, expected opening `%`");
            var i = [];
            return os(e, Cc, function(o, a, s, u) {
                i[i.length] = s ? os(u, Lc, "$1") : a || o
            }), i
        },
        jc = function(e, r) {
            var n = e,
                i;
            if (vr(is, n) && (i = is[n], n = "%" + i[0] + "%"), vr(rt, n)) {
                var o = rt[n];
                if (o === At && (o = kc(n)), typeof o > "u" && !r) throw new Rt("intrinsic " + e + " exists, but is not available. Please file an issue!");
                return {
                    alias: i,
                    name: n,
                    value: o
                }
            }
            throw new xt("intrinsic " + e + " does not exist!")
        };
    us.exports = function(e, r) {
        if (typeof e != "string" || e.length === 0) throw new Rt("intrinsic name must be a non-empty string");
        if (arguments.length > 1 && typeof r != "boolean") throw new Rt('"allowMissing" argument must be a boolean');
        if (Mc(/^%?[^%]*%?$/, e) === null) throw new xt("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
        var n = Dc(e),
            i = n.length > 0 ? n[0] : "",
            o = jc("%" + i + "%", r),
            a = o.name,
            s = o.value,
            u = !1,
            d = o.alias;
        d && (i = d[0], Nc(n, Bc([0, 1], d)));
        for (var h = 1, y = !0; h < n.length; h += 1) {
            var _ = n[h],
                T = Tr(_, 0, 1),
                N = Tr(_, -1);
            if ((T === '"' || T === "'" || T === "`" || N === '"' || N === "'" || N === "`") && T !== N) throw new xt("property names with quotes must have matching quotes");
            if ((_ === "constructor" || !y) && (u = !0), i += "." + _, a = "%" + i + "%", vr(rt, a)) s = rt[a];
            else if (s != null) {
                if (!(_ in s)) {
                    if (!r) throw new Rt("base intrinsic for " + e + " exists, but the property is not available.");
                    return
                }
                if (Ht && h + 1 >= n.length) {
                    var z = Ht(s, _);
                    y = !!z, y && "get" in z && !("originalValue" in z.get) ? s = z.get : s = s[_]
                } else y = vr(s, _), s = s[_];
                y && !u && (rt[a] = s)
            }
        }
        return s
    }
});
var Ot = E((Eg, cs) => {
    "use strict";
    var fs = Vn(),
        ls = wr(),
        Fc = ls([fs("%String.prototype.indexOf%")]);
    cs.exports = function(e, r) {
        var n = fs(e, !!r);
        return typeof n == "function" && Fc(e, ".prototype.") > -1 ? ls([n]) : n
    }
});
var ds = E((wg, ps) => {
    "use strict";
    var Uc = $t()(),
        qc = Ot(),
        zn = qc("Object.prototype.toString"),
        Sr = function(e) {
            return Uc && e && typeof e == "object" && Symbol.toStringTag in e ? !1 : zn(e) === "[object Arguments]"
        },
        hs = function(e) {
            return Sr(e) ? !0 : e !== null && typeof e == "object" && "length" in e && typeof e.length == "number" && e.length >= 0 && zn(e) !== "[object Array]" && "callee" in e && zn(e.callee) === "[object Function]"
        },
        $c = function() {
            return Sr(arguments)
        }();
    Sr.isLegacyArguments = hs;
    ps.exports = $c ? Sr : hs
});
var ws = E((_g, Es) => {
    "use strict";
    var ys = Ot(),
        Wc = $t()(),
        Hc = Hn(),
        Gc = tt(),
        Kn;
    Wc ? (gs = ys("RegExp.prototype.exec"), Yn = {}, Ar = function() {
        throw Yn
    }, Xn = {
        toString: Ar,
        valueOf: Ar
    }, typeof Symbol.toPrimitive == "symbol" && (Xn[Symbol.toPrimitive] = Ar), Kn = function(e) {
        if (!e || typeof e != "object") return !1;
        var r = Gc(e, "lastIndex"),
            n = r && Hc(r, "value");
        if (!n) return !1;
        try {
            gs(e, Xn)
        } catch (i) {
            return i === Yn
        }
    }) : (ms = ys("Object.prototype.toString"), bs = "[object RegExp]", Kn = function(e) {
        return !e || typeof e != "object" && typeof e != "function" ? !1 : ms(e) === bs
    });
    var gs, Yn, Ar, Xn, ms, bs;
    Es.exports = Kn
});
var vs = E((vg, _s) => {
    "use strict";
    var Zc = Ot(),
        Vc = ws(),
        zc = Zc("RegExp.prototype.exec"),
        Yc = vt();
    _s.exports = function(e) {
        if (!Vc(e)) throw new Yc("`regex` must be a RegExp");
        return function(n) {
            return zc(e, n) !== null
        }
    }
});
var Ss = E((Tg, Ts) => {
    "use strict";
    var Xc = function*() {}.constructor;
    Ts.exports = () => Xc
});
var Os = E((Sg, xs) => {
    "use strict";
    var Rs = Ot(),
        Kc = vs(),
        Jc = Kc(/^\s*(?:function)?\*/),
        Qc = $t()(),
        As = _r(),
        eh = Rs("Object.prototype.toString"),
        th = Rs("Function.prototype.toString"),
        rh = Ss();
    xs.exports = function(e) {
        if (typeof e != "function") return !1;
        if (Jc(th(e))) return !0;
        if (!Qc) {
            var r = eh(e);
            return r === "[object GeneratorFunction]"
        }
        if (!As) return !1;
        var n = rh();
        return n && As(e) === n.prototype
    }
});
var Bs = E((Ag, ks) => {
    "use strict";
    var Is = Function.prototype.toString,
        Pt = typeof Reflect == "object" && Reflect !== null && Reflect.apply,
        Qn, Rr;
    if (typeof Pt == "function" && typeof Object.defineProperty == "function") try {
        Qn = Object.defineProperty({}, "length", {
            get: function() {
                throw Rr
            }
        }), Rr = {}, Pt(function() {
            throw 42
        }, null, Qn)
    } catch (t) {
        t !== Rr && (Pt = null)
    } else Pt = null;
    var nh = /^\s*class\b/,
        ei = function(e) {
            try {
                var r = Is.call(e);
                return nh.test(r)
            } catch {
                return !1
            }
        },
        Jn = function(e) {
            try {
                return ei(e) ? !1 : (Is.call(e), !0)
            } catch {
                return !1
            }
        },
        xr = Object.prototype.toString,
        ih = "[object Object]",
        oh = "[object Function]",
        ah = "[object GeneratorFunction]",
        sh = "[object HTMLAllCollection]",
        uh = "[object HTML document.all class]",
        fh = "[object HTMLCollection]",
        lh = typeof Symbol == "function" && !!Symbol.toStringTag,
        ch = !(0 in [, ]),
        ti = function() {
            return !1
        };
    typeof document == "object" && (Ps = document.all, xr.call(Ps) === xr.call(document.all) && (ti = function(e) {
        if ((ch || !e) && (typeof e > "u" || typeof e == "object")) try {
            var r = xr.call(e);
            return (r === sh || r === uh || r === fh || r === ih) && e("") == null
        } catch {}
        return !1
    }));
    var Ps;
    ks.exports = Pt ? function(e) {
        if (ti(e)) return !0;
        if (!e || typeof e != "function" && typeof e != "object") return !1;
        try {
            Pt(e, null, Qn)
        } catch (r) {
            if (r !== Rr) return !1
        }
        return !ei(e) && Jn(e)
    } : function(e) {
        if (ti(e)) return !0;
        if (!e || typeof e != "function" && typeof e != "object") return !1;
        if (lh) return Jn(e);
        if (ei(e)) return !1;
        var r = xr.call(e);
        return r !== oh && r !== ah && !/^\[object HTML/.test(r) ? !1 : Jn(e)
    }
});
var Cs = E((Rg, Ms) => {
    "use strict";
    var hh = Bs(),
        ph = Object.prototype.toString,
        Ns = Object.prototype.hasOwnProperty,
        dh = function(e, r, n) {
            for (var i = 0, o = e.length; i < o; i++) Ns.call(e, i) && (n == null ? r(e[i], i, e) : r.call(n, e[i], i, e))
        },
        yh = function(e, r, n) {
            for (var i = 0, o = e.length; i < o; i++) n == null ? r(e.charAt(i), i, e) : r.call(n, e.charAt(i), i, e)
        },
        gh = function(e, r, n) {
            for (var i in e) Ns.call(e, i) && (n == null ? r(e[i], i, e) : r.call(n, e[i], i, e))
        };

    function mh(t) {
        return ph.call(t) === "[object Array]"
    }
    Ms.exports = function(e, r, n) {
        if (!hh(r)) throw new TypeError("iterator must be a function");
        var i;
        arguments.length >= 3 && (i = n), mh(e) ? dh(e, r, i) : typeof e == "string" ? yh(e, r, i) : gh(e, r, i)
    }
});
var Ds = E((xg, Ls) => {
    "use strict";
    Ls.exports = ["Float16Array", "Float32Array", "Float64Array", "Int8Array", "Int16Array", "Int32Array", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "BigInt64Array", "BigUint64Array"]
});
var Fs = E((Og, js) => {
    "use strict";
    var ri = Ds(),
        bh = typeof globalThis > "u" ? global : globalThis;
    js.exports = function() {
        for (var e = [], r = 0; r < ri.length; r++) typeof bh[ri[r]] == "function" && (e[e.length] = ri[r]);
        return e
    }
});
var Ws = E((Pg, $s) => {
    "use strict";
    var Us = Wt(),
        Eh = Fn(),
        It = vt(),
        qs = tt();
    $s.exports = function(e, r, n) {
        if (!e || typeof e != "object" && typeof e != "function") throw new It("`obj` must be an object or a function`");
        if (typeof r != "string" && typeof r != "symbol") throw new It("`property` must be a string or a symbol`");
        if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null) throw new It("`nonEnumerable`, if provided, must be a boolean or null");
        if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null) throw new It("`nonWritable`, if provided, must be a boolean or null");
        if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null) throw new It("`nonConfigurable`, if provided, must be a boolean or null");
        if (arguments.length > 6 && typeof arguments[6] != "boolean") throw new It("`loose`, if provided, must be a boolean");
        var i = arguments.length > 3 ? arguments[3] : null,
            o = arguments.length > 4 ? arguments[4] : null,
            a = arguments.length > 5 ? arguments[5] : null,
            s = arguments.length > 6 ? arguments[6] : !1,
            u = !!qs && qs(e, r);
        if (Us) Us(e, r, {
            configurable: a === null && u ? u.configurable : !a,
            enumerable: i === null && u ? u.enumerable : !i,
            value: n,
            writable: o === null && u ? u.writable : !o
        });
        else if (s || !i && !o && !a) e[r] = n;
        else throw new Eh("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.")
    }
});
var Zs = E((Ig, Gs) => {
    "use strict";
    var ni = Wt(),
        Hs = function() {
            return !!ni
        };
    Hs.hasArrayLengthDefineBug = function() {
        if (!ni) return null;
        try {
            return ni([], "length", {
                value: 1
            }).length !== 1
        } catch {
            return !0
        }
    };
    Gs.exports = Hs
});
var Ks = E((kg, Xs) => {
    "use strict";
    var wh = Vn(),
        Vs = Ws(),
        _h = Zs()(),
        zs = tt(),
        Ys = vt(),
        vh = wh("%Math.floor%");
    Xs.exports = function(e, r) {
        if (typeof e != "function") throw new Ys("`fn` is not a function");
        if (typeof r != "number" || r < 0 || r > 4294967295 || vh(r) !== r) throw new Ys("`length` must be a positive 32-bit integer");
        var n = arguments.length > 2 && !!arguments[2],
            i = !0,
            o = !0;
        if ("length" in e && zs) {
            var a = zs(e, "length");
            a && !a.configurable && (i = !1), a && !a.writable && (o = !1)
        }
        return (i || o || !n) && (_h ? Vs(e, "length", r, !0, !0) : Vs(e, "length", r)), e
    }
});
var Qs = E((Bg, Js) => {
    "use strict";
    var Th = Tt(),
        Sh = Er(),
        Ah = $n();
    Js.exports = function() {
        return Ah(Th, Sh, arguments)
    }
});
var ru = E((Ng, Or) => {
    "use strict";
    var Rh = Ks(),
        eu = Wt(),
        xh = wr(),
        tu = Qs();
    Or.exports = function(e) {
        var r = xh(arguments),
            n = 1 + e.length - (arguments.length - 1);
        return Rh(r, n > 0 ? n : 0, !0)
    };
    eu ? eu(Or.exports, "apply", {
        value: tu
    }) : Or.exports.apply = tu
});
var si = E((Mg, au) => {
    "use strict";
    var kr = Cs(),
        Oh = Fs(),
        nu = ru(),
        oi = Ot(),
        Ir = tt(),
        Pr = _r(),
        Ph = oi("Object.prototype.toString"),
        ou = $t()(),
        iu = typeof globalThis > "u" ? global : globalThis,
        ii = Oh(),
        ai = oi("String.prototype.slice"),
        Ih = oi("Array.prototype.indexOf", !0) || function(e, r) {
            for (var n = 0; n < e.length; n += 1)
                if (e[n] === r) return n;
            return -1
        },
        Br = {
            __proto__: null
        };
    ou && Ir && Pr ? kr(ii, function(t) {
        var e = new iu[t];
        if (Symbol.toStringTag in e && Pr) {
            var r = Pr(e),
                n = Ir(r, Symbol.toStringTag);
            if (!n && r) {
                var i = Pr(r);
                n = Ir(i, Symbol.toStringTag)
            }
            if (n && n.get) {
                var o = nu(n.get);
                Br["$" + t] = o
            }
        }
    }) : kr(ii, function(t) {
        var e = new iu[t],
            r = e.slice || e.set;
        if (r) {
            var n = nu(r);
            Br["$" + t] = n
        }
    });

    function kh(t) {
        var e = !1;
        return kr(Br, function(r, n) {
            if (!e) try {
                "$" + r(t) === n && (e = ai(n, 1))
            } catch {}
        }), e
    }

    function Bh(t) {
        var e = !1;
        return kr(Br, function(r, n) {
            if (!e) try {
                r(t), e = ai(n, 1)
            } catch {}
        }), e
    }

    function Nh(t) {
        return Ih(ii, t) > -1
    }

    function Mh(t) {
        if (!t || typeof t != "object") return !1;
        if (!ou) {
            var e = ai(Ph(t), 8, -1);
            return Nh(e) ? e : e !== "Object" ? !1 : Bh(t)
        }
        return Ir ? kh(t) : null
    }
    au.exports = Mh
});
var uu = E((Cg, su) => {
    "use strict";
    var Ch = si();
    su.exports = function(e) {
        return !!Ch(e)
    }
});
var vu = E($ => {
    "use strict";
    var Lh = ds(),
        Dh = Os(),
        ve = si(),
        fu = uu();

    function kt(t) {
        return t.call.bind(t)
    }
    var lu = typeof BigInt < "u",
        cu = typeof Symbol < "u",
        ge = kt(Object.prototype.toString),
        jh = kt(Number.prototype.valueOf),
        Fh = kt(String.prototype.valueOf),
        Uh = kt(Boolean.prototype.valueOf);
    lu && (hu = kt(BigInt.prototype.valueOf));
    var hu;
    cu && (pu = kt(Symbol.prototype.valueOf));
    var pu;

    function zt(t, e) {
        if (typeof t != "object") return !1;
        try {
            return e(t), !0
        } catch {
            return !1
        }
    }
    $.isArgumentsObject = Lh;
    $.isGeneratorFunction = Dh;
    $.isTypedArray = fu;

    function qh(t) {
        return typeof Promise < "u" && t instanceof Promise || t !== null && typeof t == "object" && typeof t.then == "function" && typeof t.catch == "function"
    }
    $.isPromise = qh;

    function $h(t) {
        return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(t) : fu(t) || yu(t)
    }
    $.isArrayBufferView = $h;

    function Wh(t) {
        return ve(t) === "Uint8Array"
    }
    $.isUint8Array = Wh;

    function Hh(t) {
        return ve(t) === "Uint8ClampedArray"
    }
    $.isUint8ClampedArray = Hh;

    function Gh(t) {
        return ve(t) === "Uint16Array"
    }
    $.isUint16Array = Gh;

    function Zh(t) {
        return ve(t) === "Uint32Array"
    }
    $.isUint32Array = Zh;

    function Vh(t) {
        return ve(t) === "Int8Array"
    }
    $.isInt8Array = Vh;

    function zh(t) {
        return ve(t) === "Int16Array"
    }
    $.isInt16Array = zh;

    function Yh(t) {
        return ve(t) === "Int32Array"
    }
    $.isInt32Array = Yh;

    function Xh(t) {
        return ve(t) === "Float32Array"
    }
    $.isFloat32Array = Xh;

    function Kh(t) {
        return ve(t) === "Float64Array"
    }
    $.isFloat64Array = Kh;

    function Jh(t) {
        return ve(t) === "BigInt64Array"
    }
    $.isBigInt64Array = Jh;

    function Qh(t) {
        return ve(t) === "BigUint64Array"
    }
    $.isBigUint64Array = Qh;

    function Nr(t) {
        return ge(t) === "[object Map]"
    }
    Nr.working = typeof Map < "u" && Nr(new Map);

    function ep(t) {
        return typeof Map > "u" ? !1 : Nr.working ? Nr(t) : t instanceof Map
    }
    $.isMap = ep;

    function Mr(t) {
        return ge(t) === "[object Set]"
    }
    Mr.working = typeof Set < "u" && Mr(new Set);

    function tp(t) {
        return typeof Set > "u" ? !1 : Mr.working ? Mr(t) : t instanceof Set
    }
    $.isSet = tp;

    function Cr(t) {
        return ge(t) === "[object WeakMap]"
    }
    Cr.working = typeof WeakMap < "u" && Cr(new WeakMap);

    function rp(t) {
        return typeof WeakMap > "u" ? !1 : Cr.working ? Cr(t) : t instanceof WeakMap
    }
    $.isWeakMap = rp;

    function fi(t) {
        return ge(t) === "[object WeakSet]"
    }
    fi.working = typeof WeakSet < "u" && fi(new WeakSet);

    function np(t) {
        return fi(t)
    }
    $.isWeakSet = np;

    function Lr(t) {
        return ge(t) === "[object ArrayBuffer]"
    }
    Lr.working = typeof ArrayBuffer < "u" && Lr(new ArrayBuffer);

    function du(t) {
        return typeof ArrayBuffer > "u" ? !1 : Lr.working ? Lr(t) : t instanceof ArrayBuffer
    }
    $.isArrayBuffer = du;

    function Dr(t) {
        return ge(t) === "[object DataView]"
    }
    Dr.working = typeof ArrayBuffer < "u" && typeof DataView < "u" && Dr(new DataView(new ArrayBuffer(1), 0, 1));

    function yu(t) {
        return typeof DataView > "u" ? !1 : Dr.working ? Dr(t) : t instanceof DataView
    }
    $.isDataView = yu;
    var ui = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : void 0;

    function Vt(t) {
        return ge(t) === "[object SharedArrayBuffer]"
    }

    function gu(t) {
        return typeof ui > "u" ? !1 : (typeof Vt.working > "u" && (Vt.working = Vt(new ui)), Vt.working ? Vt(t) : t instanceof ui)
    }
    $.isSharedArrayBuffer = gu;

    function ip(t) {
        return ge(t) === "[object AsyncFunction]"
    }
    $.isAsyncFunction = ip;

    function op(t) {
        return ge(t) === "[object Map Iterator]"
    }
    $.isMapIterator = op;

    function ap(t) {
        return ge(t) === "[object Set Iterator]"
    }
    $.isSetIterator = ap;

    function sp(t) {
        return ge(t) === "[object Generator]"
    }
    $.isGeneratorObject = sp;

    function up(t) {
        return ge(t) === "[object WebAssembly.Module]"
    }
    $.isWebAssemblyCompiledModule = up;

    function mu(t) {
        return zt(t, jh)
    }
    $.isNumberObject = mu;

    function bu(t) {
        return zt(t, Fh)
    }
    $.isStringObject = bu;

    function Eu(t) {
        return zt(t, Uh)
    }
    $.isBooleanObject = Eu;

    function wu(t) {
        return lu && zt(t, hu)
    }
    $.isBigIntObject = wu;

    function _u(t) {
        return cu && zt(t, pu)
    }
    $.isSymbolObject = _u;

    function fp(t) {
        return mu(t) || bu(t) || Eu(t) || wu(t) || _u(t)
    }
    $.isBoxedPrimitive = fp;

    function lp(t) {
        return typeof Uint8Array < "u" && (du(t) || gu(t))
    }
    $.isAnyArrayBuffer = lp;
    ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(t) {
        Object.defineProperty($, t, {
            enumerable: !1,
            value: function() {
                throw new Error(t + " is not supported in userland")
            }
        })
    })
});
var Su = E((Dg, Tu) => {
    "use strict";
    Tu.exports = function(e) {
        return e && typeof e == "object" && typeof e.copy == "function" && typeof e.fill == "function" && typeof e.readUInt8 == "function"
    }
});
var yi = E(W => {
    "use strict";
    var Au = Object.getOwnPropertyDescriptors || function(e) {
            for (var r = Object.keys(e), n = {}, i = 0; i < r.length; i++) n[r[i]] = Object.getOwnPropertyDescriptor(e, r[i]);
            return n
        },
        cp = /%[sdj%]/g;
    W.format = function(t) {
        if (!Hr(t)) {
            for (var e = [], r = 0; r < arguments.length; r++) e.push(Ze(arguments[r]));
            return e.join(" ")
        }
        for (var r = 1, n = arguments, i = n.length, o = String(t).replace(cp, function(s) {
                if (s === "%%") return "%";
                if (r >= i) return s;
                switch (s) {
                    case "%s":
                        return String(n[r++]);
                    case "%d":
                        return Number(n[r++]);
                    case "%j":
                        try {
                            return JSON.stringify(n[r++])
                        } catch {
                            return "[Circular]"
                        }
                    default:
                        return s
                }
            }), a = n[r]; r < i; a = n[++r]) Wr(a) || !Bt(a) ? o += " " + a : o += " " + Ze(a);
        return o
    };
    W.deprecate = function(t, e) {
        if (typeof process < "u" && process.noDeprecation === !0) return t;
        if (typeof process > "u") return function() {
            return W.deprecate(t, e).apply(this, arguments)
        };
        var r = !1;

        function n() {
            if (!r) {
                if (process.throwDeprecation) throw new Error(e);
                process.traceDeprecation ? console.trace(e) : console.error(e), r = !0
            }
            return t.apply(this, arguments)
        }
        return n
    };
    var jr = {},
        Ru = /^$/;
    process.env.NODE_DEBUG && (Fr = process.env.NODE_DEBUG, Fr = Fr.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), Ru = new RegExp("^" + Fr + "$", "i"));
    var Fr;
    W.debuglog = function(t) {
        if (t = t.toUpperCase(), !jr[t])
            if (Ru.test(t)) {
                var e = process.pid;
                jr[t] = function() {
                    var r = W.format.apply(W, arguments);
                    console.error("%s %d: %s", t, e, r)
                }
            } else jr[t] = function() {};
        return jr[t]
    };

    function Ze(t, e) {
        var r = {
            seen: [],
            stylize: pp
        };
        return arguments.length >= 3 && (r.depth = arguments[2]), arguments.length >= 4 && (r.colors = arguments[3]), pi(e) ? r.showHidden = e : e && W._extend(r, e), it(r.showHidden) && (r.showHidden = !1), it(r.depth) && (r.depth = 2), it(r.colors) && (r.colors = !1), it(r.customInspect) && (r.customInspect = !0), r.colors && (r.stylize = hp), qr(r, t, r.depth)
    }
    W.inspect = Ze;
    Ze.colors = {
        bold: [1, 22],
        italic: [3, 23],
        underline: [4, 24],
        inverse: [7, 27],
        white: [37, 39],
        grey: [90, 39],
        black: [30, 39],
        blue: [34, 39],
        cyan: [36, 39],
        green: [32, 39],
        magenta: [35, 39],
        red: [31, 39],
        yellow: [33, 39]
    };
    Ze.styles = {
        special: "cyan",
        number: "yellow",
        boolean: "yellow",
        undefined: "grey",
        null: "bold",
        string: "green",
        date: "magenta",
        regexp: "red"
    };

    function hp(t, e) {
        var r = Ze.styles[e];
        return r ? "\x1B[" + Ze.colors[r][0] + "m" + t + "\x1B[" + Ze.colors[r][1] + "m" : t
    }

    function pp(t, e) {
        return t
    }

    function dp(t) {
        var e = {};
        return t.forEach(function(r, n) {
            e[r] = !0
        }), e
    }

    function qr(t, e, r) {
        if (t.customInspect && e && Ur(e.inspect) && e.inspect !== W.inspect && !(e.constructor && e.constructor.prototype === e)) {
            var n = e.inspect(r, t);
            return Hr(n) || (n = qr(t, n, r)), n
        }
        var i = yp(t, e);
        if (i) return i;
        var o = Object.keys(e),
            a = dp(o);
        if (t.showHidden && (o = Object.getOwnPropertyNames(e)), Xt(e) && (o.indexOf("message") >= 0 || o.indexOf("description") >= 0)) return li(e);
        if (o.length === 0) {
            if (Ur(e)) {
                var s = e.name ? ": " + e.name : "";
                return t.stylize("[Function" + s + "]", "special")
            }
            if (Yt(e)) return t.stylize(RegExp.prototype.toString.call(e), "regexp");
            if ($r(e)) return t.stylize(Date.prototype.toString.call(e), "date");
            if (Xt(e)) return li(e)
        }
        var u = "",
            d = !1,
            h = ["{", "}"];
        if (xu(e) && (d = !0, h = ["[", "]"]), Ur(e)) {
            var y = e.name ? ": " + e.name : "";
            u = " [Function" + y + "]"
        }
        if (Yt(e) && (u = " " + RegExp.prototype.toString.call(e)), $r(e) && (u = " " + Date.prototype.toUTCString.call(e)), Xt(e) && (u = " " + li(e)), o.length === 0 && (!d || e.length == 0)) return h[0] + u + h[1];
        if (r < 0) return Yt(e) ? t.stylize(RegExp.prototype.toString.call(e), "regexp") : t.stylize("[Object]", "special");
        t.seen.push(e);
        var _;
        return d ? _ = gp(t, e, r, a, o) : _ = o.map(function(T) {
            return hi(t, e, r, a, T, d)
        }), t.seen.pop(), mp(_, u, h)
    }

    function yp(t, e) {
        if (it(e)) return t.stylize("undefined", "undefined");
        if (Hr(e)) {
            var r = "'" + JSON.stringify(e).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
            return t.stylize(r, "string")
        }
        if (Ou(e)) return t.stylize("" + e, "number");
        if (pi(e)) return t.stylize("" + e, "boolean");
        if (Wr(e)) return t.stylize("null", "null")
    }

    function li(t) {
        return "[" + Error.prototype.toString.call(t) + "]"
    }

    function gp(t, e, r, n, i) {
        for (var o = [], a = 0, s = e.length; a < s; ++a) Pu(e, String(a)) ? o.push(hi(t, e, r, n, String(a), !0)) : o.push("");
        return i.forEach(function(u) {
            u.match(/^\d+$/) || o.push(hi(t, e, r, n, u, !0))
        }), o
    }

    function hi(t, e, r, n, i, o) {
        var a, s, u;
        if (u = Object.getOwnPropertyDescriptor(e, i) || {
                value: e[i]
            }, u.get ? u.set ? s = t.stylize("[Getter/Setter]", "special") : s = t.stylize("[Getter]", "special") : u.set && (s = t.stylize("[Setter]", "special")), Pu(n, i) || (a = "[" + i + "]"), s || (t.seen.indexOf(u.value) < 0 ? (Wr(r) ? s = qr(t, u.value, null) : s = qr(t, u.value, r - 1), s.indexOf(`
`) > -1 && (o ? s = s.split(`
`).map(function(d) {
                return "  " + d
            }).join(`
`).slice(2) : s = `
` + s.split(`
`).map(function(d) {
                return "   " + d
            }).join(`
`))) : s = t.stylize("[Circular]", "special")), it(a)) {
            if (o && i.match(/^\d+$/)) return s;
            a = JSON.stringify("" + i), a.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (a = a.slice(1, -1), a = t.stylize(a, "name")) : (a = a.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), a = t.stylize(a, "string"))
        }
        return a + ": " + s
    }

    function mp(t, e, r) {
        var n = 0,
            i = t.reduce(function(o, a) {
                return n++, a.indexOf(`
`) >= 0 && n++, o + a.replace(/\u001b\[\d\d?m/g, "").length + 1
            }, 0);
        return i > 60 ? r[0] + (e === "" ? "" : e + `
 `) + " " + t.join(`,
  `) + " " + r[1] : r[0] + e + " " + t.join(", ") + " " + r[1]
    }
    W.types = vu();

    function xu(t) {
        return Array.isArray(t)
    }
    W.isArray = xu;

    function pi(t) {
        return typeof t == "boolean"
    }
    W.isBoolean = pi;

    function Wr(t) {
        return t === null
    }
    W.isNull = Wr;

    function bp(t) {
        return t == null
    }
    W.isNullOrUndefined = bp;

    function Ou(t) {
        return typeof t == "number"
    }
    W.isNumber = Ou;

    function Hr(t) {
        return typeof t == "string"
    }
    W.isString = Hr;

    function Ep(t) {
        return typeof t == "symbol"
    }
    W.isSymbol = Ep;

    function it(t) {
        return t === void 0
    }
    W.isUndefined = it;

    function Yt(t) {
        return Bt(t) && di(t) === "[object RegExp]"
    }
    W.isRegExp = Yt;
    W.types.isRegExp = Yt;

    function Bt(t) {
        return typeof t == "object" && t !== null
    }
    W.isObject = Bt;

    function $r(t) {
        return Bt(t) && di(t) === "[object Date]"
    }
    W.isDate = $r;
    W.types.isDate = $r;

    function Xt(t) {
        return Bt(t) && (di(t) === "[object Error]" || t instanceof Error)
    }
    W.isError = Xt;
    W.types.isNativeError = Xt;

    function Ur(t) {
        return typeof t == "function"
    }
    W.isFunction = Ur;

    function wp(t) {
        return t === null || typeof t == "boolean" || typeof t == "number" || typeof t == "string" || typeof t == "symbol" || typeof t > "u"
    }
    W.isPrimitive = wp;
    W.isBuffer = Su();

    function di(t) {
        return Object.prototype.toString.call(t)
    }

    function ci(t) {
        return t < 10 ? "0" + t.toString(10) : t.toString(10)
    }
    var _p = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function vp() {
        var t = new Date,
            e = [ci(t.getHours()), ci(t.getMinutes()), ci(t.getSeconds())].join(":");
        return [t.getDate(), _p[t.getMonth()], e].join(" ")
    }
    W.log = function() {
        console.log("%s - %s", vp(), W.format.apply(W, arguments))
    };
    W.inherits = Ge();
    W._extend = function(t, e) {
        if (!e || !Bt(e)) return t;
        for (var r = Object.keys(e), n = r.length; n--;) t[r[n]] = e[r[n]];
        return t
    };

    function Pu(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }
    var nt = typeof Symbol < "u" ? Symbol("util.promisify.custom") : void 0;
    W.promisify = function(e) {
        if (typeof e != "function") throw new TypeError('The "original" argument must be of type Function');
        if (nt && e[nt]) {
            var r = e[nt];
            if (typeof r != "function") throw new TypeError('The "util.promisify.custom" argument must be of type Function');
            return Object.defineProperty(r, nt, {
                value: r,
                enumerable: !1,
                writable: !1,
                configurable: !0
            }), r
        }

        function r() {
            for (var n, i, o = new Promise(function(u, d) {
                    n = u, i = d
                }), a = [], s = 0; s < arguments.length; s++) a.push(arguments[s]);
            a.push(function(u, d) {
                u ? i(u) : n(d)
            });
            try {
                e.apply(this, a)
            } catch (u) {
                i(u)
            }
            return o
        }
        return Object.setPrototypeOf(r, Object.getPrototypeOf(e)), nt && Object.defineProperty(r, nt, {
            value: r,
            enumerable: !1,
            writable: !1,
            configurable: !0
        }), Object.defineProperties(r, Au(e))
    };
    W.promisify.custom = nt;

    function Tp(t, e) {
        if (!t) {
            var r = new Error("Promise was rejected with a falsy value");
            r.reason = t, t = r
        }
        return e(t)
    }

    function Sp(t) {
        if (typeof t != "function") throw new TypeError('The "original" argument must be of type Function');

        function e() {
            for (var r = [], n = 0; n < arguments.length; n++) r.push(arguments[n]);
            var i = r.pop();
            if (typeof i != "function") throw new TypeError("The last argument must be of type Function");
            var o = this,
                a = function() {
                    return i.apply(o, arguments)
                };
            t.apply(this, r).then(function(s) {
                process.nextTick(a.bind(null, null, s))
            }, function(s) {
                process.nextTick(Tp.bind(null, s, a))
            })
        }
        return Object.setPrototypeOf(e, Object.getPrototypeOf(t)), Object.defineProperties(e, Au(t)), e
    }
    W.callbackify = Sp
});
var Cu = E((Fg, Mu) => {
    "use strict";

    function Iu(t, e) {
        var r = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e && (n = n.filter(function(i) {
                return Object.getOwnPropertyDescriptor(t, i).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }

    function ku(t) {
        for (var e = 1; e < arguments.length; e++) {
            var r = arguments[e] != null ? arguments[e] : {};
            e % 2 ? Iu(Object(r), !0).forEach(function(n) {
                Ap(t, n, r[n])
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Iu(Object(r)).forEach(function(n) {
                Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n))
            })
        }
        return t
    }

    function Ap(t, e, r) {
        return e = Nu(e), e in t ? Object.defineProperty(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = r, t
    }

    function Rp(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function Bu(t, e) {
        for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, Nu(n.key), n)
        }
    }

    function xp(t, e, r) {
        return e && Bu(t.prototype, e), r && Bu(t, r), Object.defineProperty(t, "prototype", {
            writable: !1
        }), t
    }

    function Nu(t) {
        var e = Op(t, "string");
        return typeof e == "symbol" ? e : String(e)
    }

    function Op(t, e) {
        if (typeof t != "object" || t === null) return t;
        var r = t[Symbol.toPrimitive];
        if (r !== void 0) {
            var n = r.call(t, e || "default");
            if (typeof n != "object") return n;
            throw new TypeError("@@toPrimitive must return a primitive value.")
        }
        return (e === "string" ? String : Number)(t)
    }
    var Pp = Qe(),
        Gr = Pp.Buffer,
        Ip = yi(),
        gi = Ip.inspect,
        kp = gi && gi.custom || "inspect";

    function Bp(t, e, r) {
        Gr.prototype.copy.call(t, e, r)
    }
    Mu.exports = function() {
        function t() {
            Rp(this, t), this.head = null, this.tail = null, this.length = 0
        }
        return xp(t, [{
            key: "push",
            value: function(r) {
                var n = {
                    data: r,
                    next: null
                };
                this.length > 0 ? this.tail.next = n : this.head = n, this.tail = n, ++this.length
            }
        }, {
            key: "unshift",
            value: function(r) {
                var n = {
                    data: r,
                    next: this.head
                };
                this.length === 0 && (this.tail = n), this.head = n, ++this.length
            }
        }, {
            key: "shift",
            value: function() {
                if (this.length !== 0) {
                    var r = this.head.data;
                    return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, r
                }
            }
        }, {
            key: "clear",
            value: function() {
                this.head = this.tail = null, this.length = 0
            }
        }, {
            key: "join",
            value: function(r) {
                if (this.length === 0) return "";
                for (var n = this.head, i = "" + n.data; n = n.next;) i += r + n.data;
                return i
            }
        }, {
            key: "concat",
            value: function(r) {
                if (this.length === 0) return Gr.alloc(0);
                for (var n = Gr.allocUnsafe(r >>> 0), i = this.head, o = 0; i;) Bp(i.data, n, o), o += i.data.length, i = i.next;
                return n
            }
        }, {
            key: "consume",
            value: function(r, n) {
                var i;
                return r < this.head.data.length ? (i = this.head.data.slice(0, r), this.head.data = this.head.data.slice(r)) : r === this.head.data.length ? i = this.shift() : i = n ? this._getString(r) : this._getBuffer(r), i
            }
        }, {
            key: "first",
            value: function() {
                return this.head.data
            }
        }, {
            key: "_getString",
            value: function(r) {
                var n = this.head,
                    i = 1,
                    o = n.data;
                for (r -= o.length; n = n.next;) {
                    var a = n.data,
                        s = r > a.length ? a.length : r;
                    if (s === a.length ? o += a : o += a.slice(0, r), r -= s, r === 0) {
                        s === a.length ? (++i, n.next ? this.head = n.next : this.head = this.tail = null) : (this.head = n, n.data = a.slice(s));
                        break
                    }++i
                }
                return this.length -= i, o
            }
        }, {
            key: "_getBuffer",
            value: function(r) {
                var n = Gr.allocUnsafe(r),
                    i = this.head,
                    o = 1;
                for (i.data.copy(n), r -= i.data.length; i = i.next;) {
                    var a = i.data,
                        s = r > a.length ? a.length : r;
                    if (a.copy(n, n.length - r, 0, s), r -= s, r === 0) {
                        s === a.length ? (++o, i.next ? this.head = i.next : this.head = this.tail = null) : (this.head = i, i.data = a.slice(s));
                        break
                    }++o
                }
                return this.length -= o, n
            }
        }, {
            key: kp,
            value: function(r, n) {
                return gi(this, ku(ku({}, n), {}, {
                    depth: 0,
                    customInspect: !1
                }))
            }
        }]), t
    }()
});
var bi = E((Ug, Du) => {
    "use strict";

    function Np(t, e) {
        var r = this,
            n = this._readableState && this._readableState.destroyed,
            i = this._writableState && this._writableState.destroyed;
        return n || i ? (e ? e(t) : t && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, process.nextTick(mi, this, t)) : process.nextTick(mi, this, t)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(t || null, function(o) {
            !e && o ? r._writableState ? r._writableState.errorEmitted ? process.nextTick(Zr, r) : (r._writableState.errorEmitted = !0, process.nextTick(Lu, r, o)) : process.nextTick(Lu, r, o) : e ? (process.nextTick(Zr, r), e(o)) : process.nextTick(Zr, r)
        }), this)
    }

    function Lu(t, e) {
        mi(t, e), Zr(t)
    }

    function Zr(t) {
        t._writableState && !t._writableState.emitClose || t._readableState && !t._readableState.emitClose || t.emit("close")
    }

    function Mp() {
        this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1)
    }

    function mi(t, e) {
        t.emit("error", e)
    }

    function Cp(t, e) {
        var r = t._readableState,
            n = t._writableState;
        r && r.autoDestroy || n && n.autoDestroy ? t.destroy(e) : t.emit("error", e)
    }
    Du.exports = {
        destroy: Np,
        undestroy: Mp,
        errorOrDestroy: Cp
    }
});
var ot = E((qg, Uu) => {
    "use strict";

    function Lp(t, e) {
        t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e
    }
    var Fu = {};

    function me(t, e, r) {
        r || (r = Error);

        function n(o, a, s) {
            return typeof e == "string" ? e : e(o, a, s)
        }
        var i = function(o) {
            Lp(a, o);

            function a(s, u, d) {
                return o.call(this, n(s, u, d)) || this
            }
            return a
        }(r);
        i.prototype.name = r.name, i.prototype.code = t, Fu[t] = i
    }

    function ju(t, e) {
        if (Array.isArray(t)) {
            var r = t.length;
            return t = t.map(function(n) {
                return String(n)
            }), r > 2 ? "one of ".concat(e, " ").concat(t.slice(0, r - 1).join(", "), ", or ") + t[r - 1] : r === 2 ? "one of ".concat(e, " ").concat(t[0], " or ").concat(t[1]) : "of ".concat(e, " ").concat(t[0])
        } else return "of ".concat(e, " ").concat(String(t))
    }

    function Dp(t, e, r) {
        return t.substr(!r || r < 0 ? 0 : +r, e.length) === e
    }

    function jp(t, e, r) {
        return (r === void 0 || r > t.length) && (r = t.length), t.substring(r - e.length, r) === e
    }

    function Fp(t, e, r) {
        return typeof r != "number" && (r = 0), r + e.length > t.length ? !1 : t.indexOf(e, r) !== -1
    }
    me("ERR_INVALID_OPT_VALUE", function(t, e) {
        return 'The value "' + e + '" is invalid for option "' + t + '"'
    }, TypeError);
    me("ERR_INVALID_ARG_TYPE", function(t, e, r) {
        var n;
        typeof e == "string" && Dp(e, "not ") ? (n = "must not be", e = e.replace(/^not /, "")) : n = "must be";
        var i;
        if (jp(t, " argument")) i = "The ".concat(t, " ").concat(n, " ").concat(ju(e, "type"));
        else {
            var o = Fp(t, ".") ? "property" : "argument";
            i = 'The "'.concat(t, '" ').concat(o, " ").concat(n, " ").concat(ju(e, "type"))
        }
        return i += ". Received type ".concat(typeof r), i
    }, TypeError);
    me("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
    me("ERR_METHOD_NOT_IMPLEMENTED", function(t) {
        return "The " + t + " method is not implemented"
    });
    me("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
    me("ERR_STREAM_DESTROYED", function(t) {
        return "Cannot call " + t + " after a stream was destroyed"
    });
    me("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
    me("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
    me("ERR_STREAM_WRITE_AFTER_END", "write after end");
    me("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
    me("ERR_UNKNOWN_ENCODING", function(t) {
        return "Unknown encoding: " + t
    }, TypeError);
    me("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
    Uu.exports.codes = Fu
});
var Ei = E(($g, qu) => {
    "use strict";
    var Up = ot().codes.ERR_INVALID_OPT_VALUE;

    function qp(t, e, r) {
        return t.highWaterMark != null ? t.highWaterMark : e ? t[r] : null
    }

    function $p(t, e, r, n) {
        var i = qp(e, n, r);
        if (i != null) {
            if (!(isFinite(i) && Math.floor(i) === i) || i < 0) {
                var o = n ? r : "highWaterMark";
                throw new Up(o, i)
            }
            return Math.floor(i)
        }
        return t.objectMode ? 16 : 16 * 1024
    }
    qu.exports = {
        getHighWaterMark: $p
    }
});
var Wu = E((Wg, $u) => {
    "use strict";
    $u.exports = Wp;

    function Wp(t, e) {
        if (wi("noDeprecation")) return t;
        var r = !1;

        function n() {
            if (!r) {
                if (wi("throwDeprecation")) throw new Error(e);
                wi("traceDeprecation") ? console.trace(e) : console.warn(e), r = !0
            }
            return t.apply(this, arguments)
        }
        return n
    }

    function wi(t) {
        try {
            if (!global.localStorage) return !1
        } catch {
            return !1
        }
        var e = global.localStorage[t];
        return e == null ? !1 : String(e).toLowerCase() === "true"
    }
});
var Ti = E((Hg, Yu) => {
    "use strict";
    Yu.exports = oe;

    function Gu(t) {
        var e = this;
        this.next = null, this.entry = null, this.finish = function() {
            gd(e, t)
        }
    }
    var Nt;
    oe.WritableState = Jt;
    var Hp = {
            deprecate: Wu()
        },
        Zu = Ln(),
        zr = Qe().Buffer,
        Gp = (typeof global < "u" ? global : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {};

    function Zp(t) {
        return zr.from(t)
    }

    function Vp(t) {
        return zr.isBuffer(t) || t instanceof Gp
    }
    var vi = bi(),
        zp = Ei(),
        Yp = zp.getHighWaterMark,
        Ve = ot().codes,
        Xp = Ve.ERR_INVALID_ARG_TYPE,
        Kp = Ve.ERR_METHOD_NOT_IMPLEMENTED,
        Jp = Ve.ERR_MULTIPLE_CALLBACK,
        Qp = Ve.ERR_STREAM_CANNOT_PIPE,
        ed = Ve.ERR_STREAM_DESTROYED,
        td = Ve.ERR_STREAM_NULL_VALUES,
        rd = Ve.ERR_STREAM_WRITE_AFTER_END,
        nd = Ve.ERR_UNKNOWN_ENCODING,
        Mt = vi.errorOrDestroy;
    Ge()(oe, Zu);

    function id() {}

    function Jt(t, e, r) {
        Nt = Nt || at(), t = t || {}, typeof r != "boolean" && (r = e instanceof Nt), this.objectMode = !!t.objectMode, r && (this.objectMode = this.objectMode || !!t.writableObjectMode), this.highWaterMark = Yp(this, t, "writableHighWaterMark", r), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
        var n = t.decodeStrings === !1;
        this.decodeStrings = !n, this.defaultEncoding = t.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(i) {
            cd(e, i)
        }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = t.emitClose !== !1, this.autoDestroy = !!t.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new Gu(this)
    }
    Jt.prototype.getBuffer = function() {
        for (var e = this.bufferedRequest, r = []; e;) r.push(e), e = e.next;
        return r
    };
    (function() {
        try {
            Object.defineProperty(Jt.prototype, "buffer", {
                get: Hp.deprecate(function() {
                    return this.getBuffer()
                }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
            })
        } catch {}
    })();
    var Vr;
    typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (Vr = Function.prototype[Symbol.hasInstance], Object.defineProperty(oe, Symbol.hasInstance, {
        value: function(e) {
            return Vr.call(this, e) ? !0 : this !== oe ? !1 : e && e._writableState instanceof Jt
        }
    })) : Vr = function(e) {
        return e instanceof this
    };

    function oe(t) {
        Nt = Nt || at();
        var e = this instanceof Nt;
        if (!e && !Vr.call(oe, this)) return new oe(t);
        this._writableState = new Jt(t, this, e), this.writable = !0, t && (typeof t.write == "function" && (this._write = t.write), typeof t.writev == "function" && (this._writev = t.writev), typeof t.destroy == "function" && (this._destroy = t.destroy), typeof t.final == "function" && (this._final = t.final)), Zu.call(this)
    }
    oe.prototype.pipe = function() {
        Mt(this, new Qp)
    };

    function od(t, e) {
        var r = new rd;
        Mt(t, r), process.nextTick(e, r)
    }

    function ad(t, e, r, n) {
        var i;
        return r === null ? i = new td : typeof r != "string" && !e.objectMode && (i = new Xp("chunk", ["string", "Buffer"], r)), i ? (Mt(t, i), process.nextTick(n, i), !1) : !0
    }
    oe.prototype.write = function(t, e, r) {
        var n = this._writableState,
            i = !1,
            o = !n.objectMode && Vp(t);
        return o && !zr.isBuffer(t) && (t = Zp(t)), typeof e == "function" && (r = e, e = null), o ? e = "buffer" : e || (e = n.defaultEncoding), typeof r != "function" && (r = id), n.ending ? od(this, r) : (o || ad(this, n, t, r)) && (n.pendingcb++, i = ud(this, n, o, t, e, r)), i
    };
    oe.prototype.cork = function() {
        this._writableState.corked++
    };
    oe.prototype.uncork = function() {
        var t = this._writableState;
        t.corked && (t.corked--, !t.writing && !t.corked && !t.bufferProcessing && t.bufferedRequest && Vu(this, t))
    };
    oe.prototype.setDefaultEncoding = function(e) {
        if (typeof e == "string" && (e = e.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1)) throw new nd(e);
        return this._writableState.defaultEncoding = e, this
    };
    Object.defineProperty(oe.prototype, "writableBuffer", {
        enumerable: !1,
        get: function() {
            return this._writableState && this._writableState.getBuffer()
        }
    });

    function sd(t, e, r) {
        return !t.objectMode && t.decodeStrings !== !1 && typeof e == "string" && (e = zr.from(e, r)), e
    }
    Object.defineProperty(oe.prototype, "writableHighWaterMark", {
        enumerable: !1,
        get: function() {
            return this._writableState.highWaterMark
        }
    });

    function ud(t, e, r, n, i, o) {
        if (!r) {
            var a = sd(e, n, i);
            n !== a && (r = !0, i = "buffer", n = a)
        }
        var s = e.objectMode ? 1 : n.length;
        e.length += s;
        var u = e.length < e.highWaterMark;
        if (u || (e.needDrain = !0), e.writing || e.corked) {
            var d = e.lastBufferedRequest;
            e.lastBufferedRequest = {
                chunk: n,
                encoding: i,
                isBuf: r,
                callback: o,
                next: null
            }, d ? d.next = e.lastBufferedRequest : e.bufferedRequest = e.lastBufferedRequest, e.bufferedRequestCount += 1
        } else _i(t, e, !1, s, n, i, o);
        return u
    }

    function _i(t, e, r, n, i, o, a) {
        e.writelen = n, e.writecb = a, e.writing = !0, e.sync = !0, e.destroyed ? e.onwrite(new ed("write")) : r ? t._writev(i, e.onwrite) : t._write(i, o, e.onwrite), e.sync = !1
    }

    function fd(t, e, r, n, i) {
        --e.pendingcb, r ? (process.nextTick(i, n), process.nextTick(Kt, t, e), t._writableState.errorEmitted = !0, Mt(t, n)) : (i(n), t._writableState.errorEmitted = !0, Mt(t, n), Kt(t, e))
    }

    function ld(t) {
        t.writing = !1, t.writecb = null, t.length -= t.writelen, t.writelen = 0
    }

    function cd(t, e) {
        var r = t._writableState,
            n = r.sync,
            i = r.writecb;
        if (typeof i != "function") throw new Jp;
        if (ld(r), e) fd(t, r, n, e, i);
        else {
            var o = zu(r) || t.destroyed;
            !o && !r.corked && !r.bufferProcessing && r.bufferedRequest && Vu(t, r), n ? process.nextTick(Hu, t, r, o, i) : Hu(t, r, o, i)
        }
    }

    function Hu(t, e, r, n) {
        r || hd(t, e), e.pendingcb--, n(), Kt(t, e)
    }

    function hd(t, e) {
        e.length === 0 && e.needDrain && (e.needDrain = !1, t.emit("drain"))
    }

    function Vu(t, e) {
        e.bufferProcessing = !0;
        var r = e.bufferedRequest;
        if (t._writev && r && r.next) {
            var n = e.bufferedRequestCount,
                i = new Array(n),
                o = e.corkedRequestsFree;
            o.entry = r;
            for (var a = 0, s = !0; r;) i[a] = r, r.isBuf || (s = !1), r = r.next, a += 1;
            i.allBuffers = s, _i(t, e, !0, e.length, i, "", o.finish), e.pendingcb++, e.lastBufferedRequest = null, o.next ? (e.corkedRequestsFree = o.next, o.next = null) : e.corkedRequestsFree = new Gu(e), e.bufferedRequestCount = 0
        } else {
            for (; r;) {
                var u = r.chunk,
                    d = r.encoding,
                    h = r.callback,
                    y = e.objectMode ? 1 : u.length;
                if (_i(t, e, !1, y, u, d, h), r = r.next, e.bufferedRequestCount--, e.writing) break
            }
            r === null && (e.lastBufferedRequest = null)
        }
        e.bufferedRequest = r, e.bufferProcessing = !1
    }
    oe.prototype._write = function(t, e, r) {
        r(new Kp("_write()"))
    };
    oe.prototype._writev = null;
    oe.prototype.end = function(t, e, r) {
        var n = this._writableState;
        return typeof t == "function" ? (r = t, t = null, e = null) : typeof e == "function" && (r = e, e = null), t != null && this.write(t, e), n.corked && (n.corked = 1, this.uncork()), n.ending || yd(this, n, r), this
    };
    Object.defineProperty(oe.prototype, "writableLength", {
        enumerable: !1,
        get: function() {
            return this._writableState.length
        }
    });

    function zu(t) {
        return t.ending && t.length === 0 && t.bufferedRequest === null && !t.finished && !t.writing
    }

    function pd(t, e) {
        t._final(function(r) {
            e.pendingcb--, r && Mt(t, r), e.prefinished = !0, t.emit("prefinish"), Kt(t, e)
        })
    }

    function dd(t, e) {
        !e.prefinished && !e.finalCalled && (typeof t._final == "function" && !e.destroyed ? (e.pendingcb++, e.finalCalled = !0, process.nextTick(pd, t, e)) : (e.prefinished = !0, t.emit("prefinish")))
    }

    function Kt(t, e) {
        var r = zu(e);
        if (r && (dd(t, e), e.pendingcb === 0 && (e.finished = !0, t.emit("finish"), e.autoDestroy))) {
            var n = t._readableState;
            (!n || n.autoDestroy && n.endEmitted) && t.destroy()
        }
        return r
    }

    function yd(t, e, r) {
        e.ending = !0, Kt(t, e), r && (e.finished ? process.nextTick(r) : t.once("finish", r)), e.ended = !0, t.writable = !1
    }

    function gd(t, e, r) {
        var n = t.entry;
        for (t.entry = null; n;) {
            var i = n.callback;
            e.pendingcb--, i(r), n = n.next
        }
        e.corkedRequestsFree.next = t
    }
    Object.defineProperty(oe.prototype, "destroyed", {
        enumerable: !1,
        get: function() {
            return this._writableState === void 0 ? !1 : this._writableState.destroyed
        },
        set: function(e) {
            this._writableState && (this._writableState.destroyed = e)
        }
    });
    oe.prototype.destroy = vi.destroy;
    oe.prototype._undestroy = vi.undestroy;
    oe.prototype._destroy = function(t, e) {
        e(t)
    }
});
var at = E((Gg, Ku) => {
    "use strict";
    var md = Object.keys || function(t) {
        var e = [];
        for (var r in t) e.push(r);
        return e
    };
    Ku.exports = Ie;
    var Xu = Ri(),
        Ai = Ti();
    Ge()(Ie, Xu);
    for (Si = md(Ai.prototype), Yr = 0; Yr < Si.length; Yr++) Xr = Si[Yr], Ie.prototype[Xr] || (Ie.prototype[Xr] = Ai.prototype[Xr]);
    var Si, Xr, Yr;

    function Ie(t) {
        if (!(this instanceof Ie)) return new Ie(t);
        Xu.call(this, t), Ai.call(this, t), this.allowHalfOpen = !0, t && (t.readable === !1 && (this.readable = !1), t.writable === !1 && (this.writable = !1), t.allowHalfOpen === !1 && (this.allowHalfOpen = !1, this.once("end", bd)))
    }
    Object.defineProperty(Ie.prototype, "writableHighWaterMark", {
        enumerable: !1,
        get: function() {
            return this._writableState.highWaterMark
        }
    });
    Object.defineProperty(Ie.prototype, "writableBuffer", {
        enumerable: !1,
        get: function() {
            return this._writableState && this._writableState.getBuffer()
        }
    });
    Object.defineProperty(Ie.prototype, "writableLength", {
        enumerable: !1,
        get: function() {
            return this._writableState.length
        }
    });

    function bd() {
        this._writableState.ended || process.nextTick(Ed, this)
    }

    function Ed(t) {
        t.end()
    }
    Object.defineProperty(Ie.prototype, "destroyed", {
        enumerable: !1,
        get: function() {
            return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed
        },
        set: function(e) {
            this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = e, this._writableState.destroyed = e)
        }
    })
});
var ef = E((xi, Qu) => {
    "use strict";
    var Kr = Qe(),
        ke = Kr.Buffer;

    function Ju(t, e) {
        for (var r in t) e[r] = t[r]
    }
    ke.from && ke.alloc && ke.allocUnsafe && ke.allocUnsafeSlow ? Qu.exports = Kr : (Ju(Kr, xi), xi.Buffer = st);

    function st(t, e, r) {
        return ke(t, e, r)
    }
    st.prototype = Object.create(ke.prototype);
    Ju(ke, st);
    st.from = function(t, e, r) {
        if (typeof t == "number") throw new TypeError("Argument must not be a number");
        return ke(t, e, r)
    };
    st.alloc = function(t, e, r) {
        if (typeof t != "number") throw new TypeError("Argument must be a number");
        var n = ke(t);
        return e !== void 0 ? typeof r == "string" ? n.fill(e, r) : n.fill(e) : n.fill(0), n
    };
    st.allocUnsafe = function(t) {
        if (typeof t != "number") throw new TypeError("Argument must be a number");
        return ke(t)
    };
    st.allocUnsafeSlow = function(t) {
        if (typeof t != "number") throw new TypeError("Argument must be a number");
        return Kr.SlowBuffer(t)
    }
});
var Ii = E(rf => {
    "use strict";
    var Pi = ef().Buffer,
        tf = Pi.isEncoding || function(t) {
            switch (t = "" + t, t && t.toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                case "raw":
                    return !0;
                default:
                    return !1
            }
        };

    function wd(t) {
        if (!t) return "utf8";
        for (var e;;) switch (t) {
            case "utf8":
            case "utf-8":
                return "utf8";
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return "utf16le";
            case "latin1":
            case "binary":
                return "latin1";
            case "base64":
            case "ascii":
            case "hex":
                return t;
            default:
                if (e) return;
                t = ("" + t).toLowerCase(), e = !0
        }
    }

    function _d(t) {
        var e = wd(t);
        if (typeof e != "string" && (Pi.isEncoding === tf || !tf(t))) throw new Error("Unknown encoding: " + t);
        return e || t
    }
    rf.StringDecoder = Qt;

    function Qt(t) {
        this.encoding = _d(t);
        var e;
        switch (this.encoding) {
            case "utf16le":
                this.text = xd, this.end = Od, e = 4;
                break;
            case "utf8":
                this.fillLast = Sd, e = 4;
                break;
            case "base64":
                this.text = Pd, this.end = Id, e = 3;
                break;
            default:
                this.write = kd, this.end = Bd;
                return
        }
        this.lastNeed = 0, this.lastTotal = 0, this.lastChar = Pi.allocUnsafe(e)
    }
    Qt.prototype.write = function(t) {
        if (t.length === 0) return "";
        var e, r;
        if (this.lastNeed) {
            if (e = this.fillLast(t), e === void 0) return "";
            r = this.lastNeed, this.lastNeed = 0
        } else r = 0;
        return r < t.length ? e ? e + this.text(t, r) : this.text(t, r) : e || ""
    };
    Qt.prototype.end = Rd;
    Qt.prototype.text = Ad;
    Qt.prototype.fillLast = function(t) {
        if (this.lastNeed <= t.length) return t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
        t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, t.length), this.lastNeed -= t.length
    };

    function Oi(t) {
        return t <= 127 ? 0 : t >> 5 === 6 ? 2 : t >> 4 === 14 ? 3 : t >> 3 === 30 ? 4 : t >> 6 === 2 ? -1 : -2
    }

    function vd(t, e, r) {
        var n = e.length - 1;
        if (n < r) return 0;
        var i = Oi(e[n]);
        return i >= 0 ? (i > 0 && (t.lastNeed = i - 1), i) : --n < r || i === -2 ? 0 : (i = Oi(e[n]), i >= 0 ? (i > 0 && (t.lastNeed = i - 2), i) : --n < r || i === -2 ? 0 : (i = Oi(e[n]), i >= 0 ? (i > 0 && (i === 2 ? i = 0 : t.lastNeed = i - 3), i) : 0))
    }

    function Td(t, e, r) {
        if ((e[0] & 192) !== 128) return t.lastNeed = 0, "\uFFFD";
        if (t.lastNeed > 1 && e.length > 1) {
            if ((e[1] & 192) !== 128) return t.lastNeed = 1, "\uFFFD";
            if (t.lastNeed > 2 && e.length > 2 && (e[2] & 192) !== 128) return t.lastNeed = 2, "\uFFFD"
        }
    }

    function Sd(t) {
        var e = this.lastTotal - this.lastNeed,
            r = Td(this, t, e);
        if (r !== void 0) return r;
        if (this.lastNeed <= t.length) return t.copy(this.lastChar, e, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
        t.copy(this.lastChar, e, 0, t.length), this.lastNeed -= t.length
    }

    function Ad(t, e) {
        var r = vd(this, t, e);
        if (!this.lastNeed) return t.toString("utf8", e);
        this.lastTotal = r;
        var n = t.length - (r - this.lastNeed);
        return t.copy(this.lastChar, 0, n), t.toString("utf8", e, n)
    }

    function Rd(t) {
        var e = t && t.length ? this.write(t) : "";
        return this.lastNeed ? e + "\uFFFD" : e
    }

    function xd(t, e) {
        if ((t.length - e) % 2 === 0) {
            var r = t.toString("utf16le", e);
            if (r) {
                var n = r.charCodeAt(r.length - 1);
                if (n >= 55296 && n <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = t[t.length - 2], this.lastChar[1] = t[t.length - 1], r.slice(0, -1)
            }
            return r
        }
        return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = t[t.length - 1], t.toString("utf16le", e, t.length - 1)
    }

    function Od(t) {
        var e = t && t.length ? this.write(t) : "";
        if (this.lastNeed) {
            var r = this.lastTotal - this.lastNeed;
            return e + this.lastChar.toString("utf16le", 0, r)
        }
        return e
    }

    function Pd(t, e) {
        var r = (t.length - e) % 3;
        return r === 0 ? t.toString("base64", e) : (this.lastNeed = 3 - r, this.lastTotal = 3, r === 1 ? this.lastChar[0] = t[t.length - 1] : (this.lastChar[0] = t[t.length - 2], this.lastChar[1] = t[t.length - 1]), t.toString("base64", e, t.length - r))
    }

    function Id(t) {
        var e = t && t.length ? this.write(t) : "";
        return this.lastNeed ? e + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : e
    }

    function kd(t) {
        return t.toString(this.encoding)
    }

    function Bd(t) {
        return t && t.length ? this.write(t) : ""
    }
});
var Jr = E((Vg, af) => {
    "use strict";
    var nf = ot().codes.ERR_STREAM_PREMATURE_CLOSE;

    function Nd(t) {
        var e = !1;
        return function() {
            if (!e) {
                e = !0;
                for (var r = arguments.length, n = new Array(r), i = 0; i < r; i++) n[i] = arguments[i];
                t.apply(this, n)
            }
        }
    }

    function Md() {}

    function Cd(t) {
        return t.setHeader && typeof t.abort == "function"
    }

    function of (t, e, r) {
        if (typeof e == "function") return of(t, null, e);
        e || (e = {}), r = Nd(r || Md);
        var n = e.readable || e.readable !== !1 && t.readable,
            i = e.writable || e.writable !== !1 && t.writable,
            o = function() {
                t.writable || s()
            },
            a = t._writableState && t._writableState.finished,
            s = function() {
                i = !1, a = !0, n || r.call(t)
            },
            u = t._readableState && t._readableState.endEmitted,
            d = function() {
                n = !1, u = !0, i || r.call(t)
            },
            h = function(N) {
                r.call(t, N)
            },
            y = function() {
                var N;
                if (n && !u) return (!t._readableState || !t._readableState.ended) && (N = new nf), r.call(t, N);
                if (i && !a) return (!t._writableState || !t._writableState.ended) && (N = new nf), r.call(t, N)
            },
            _ = function() {
                t.req.on("finish", s)
            };
        return Cd(t) ? (t.on("complete", s), t.on("abort", y), t.req ? _() : t.on("request", _)) : i && !t._writableState && (t.on("end", o), t.on("close", o)), t.on("end", d), t.on("finish", s), e.error !== !1 && t.on("error", h), t.on("close", y),
            function() {
                t.removeListener("complete", s), t.removeListener("abort", y), t.removeListener("request", _), t.req && t.req.removeListener("finish", s), t.removeListener("end", o), t.removeListener("close", o), t.removeListener("finish", s), t.removeListener("end", d), t.removeListener("error", h), t.removeListener("close", y)
            }
    }
    af.exports = of
});
var uf = E((zg, sf) => {
    "use strict";
    var Qr;

    function ze(t, e, r) {
        return e = Ld(e), e in t ? Object.defineProperty(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = r, t
    }

    function Ld(t) {
        var e = Dd(t, "string");
        return typeof e == "symbol" ? e : String(e)
    }

    function Dd(t, e) {
        if (typeof t != "object" || t === null) return t;
        var r = t[Symbol.toPrimitive];
        if (r !== void 0) {
            var n = r.call(t, e || "default");
            if (typeof n != "object") return n;
            throw new TypeError("@@toPrimitive must return a primitive value.")
        }
        return (e === "string" ? String : Number)(t)
    }
    var jd = Jr(),
        Ye = Symbol("lastResolve"),
        ut = Symbol("lastReject"),
        er = Symbol("error"),
        en = Symbol("ended"),
        ft = Symbol("lastPromise"),
        ki = Symbol("handlePromise"),
        lt = Symbol("stream");

    function Xe(t, e) {
        return {
            value: t,
            done: e
        }
    }

    function Fd(t) {
        var e = t[Ye];
        if (e !== null) {
            var r = t[lt].read();
            r !== null && (t[ft] = null, t[Ye] = null, t[ut] = null, e(Xe(r, !1)))
        }
    }

    function Ud(t) {
        process.nextTick(Fd, t)
    }

    function qd(t, e) {
        return function(r, n) {
            t.then(function() {
                if (e[en]) {
                    r(Xe(void 0, !0));
                    return
                }
                e[ki](r, n)
            }, n)
        }
    }
    var $d = Object.getPrototypeOf(function() {}),
        Wd = Object.setPrototypeOf((Qr = {
            get stream() {
                return this[lt]
            },
            next: function() {
                var e = this,
                    r = this[er];
                if (r !== null) return Promise.reject(r);
                if (this[en]) return Promise.resolve(Xe(void 0, !0));
                if (this[lt].destroyed) return new Promise(function(a, s) {
                    process.nextTick(function() {
                        e[er] ? s(e[er]) : a(Xe(void 0, !0))
                    })
                });
                var n = this[ft],
                    i;
                if (n) i = new Promise(qd(n, this));
                else {
                    var o = this[lt].read();
                    if (o !== null) return Promise.resolve(Xe(o, !1));
                    i = new Promise(this[ki])
                }
                return this[ft] = i, i
            }
        }, ze(Qr, Symbol.asyncIterator, function() {
            return this
        }), ze(Qr, "return", function() {
            var e = this;
            return new Promise(function(r, n) {
                e[lt].destroy(null, function(i) {
                    if (i) {
                        n(i);
                        return
                    }
                    r(Xe(void 0, !0))
                })
            })
        }), Qr), $d),
        Hd = function(e) {
            var r, n = Object.create(Wd, (r = {}, ze(r, lt, {
                value: e,
                writable: !0
            }), ze(r, Ye, {
                value: null,
                writable: !0
            }), ze(r, ut, {
                value: null,
                writable: !0
            }), ze(r, er, {
                value: null,
                writable: !0
            }), ze(r, en, {
                value: e._readableState.endEmitted,
                writable: !0
            }), ze(r, ki, {
                value: function(o, a) {
                    var s = n[lt].read();
                    s ? (n[ft] = null, n[Ye] = null, n[ut] = null, o(Xe(s, !1))) : (n[Ye] = o, n[ut] = a)
                },
                writable: !0
            }), r));
            return n[ft] = null, jd(e, function(i) {
                if (i && i.code !== "ERR_STREAM_PREMATURE_CLOSE") {
                    var o = n[ut];
                    o !== null && (n[ft] = null, n[Ye] = null, n[ut] = null, o(i)), n[er] = i;
                    return
                }
                var a = n[Ye];
                a !== null && (n[ft] = null, n[Ye] = null, n[ut] = null, a(Xe(void 0, !0))), n[en] = !0
            }), e.on("readable", Ud.bind(null, n)), n
        };
    sf.exports = Hd
});
var lf = E((Yg, ff) => {
    "use strict";
    ff.exports = function() {
        throw new Error("Readable.from is not available in the browser")
    }
});
var Ri = E((Kg, wf) => {
    "use strict";
    wf.exports = G;
    var Ct;
    G.ReadableState = df;
    var Xg = yr().EventEmitter,
        pf = function(e, r) {
            return e.listeners(r).length
        },
        rr = Ln(),
        tn = Qe().Buffer,
        Gd = (typeof global < "u" ? global : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {};

    function Zd(t) {
        return tn.from(t)
    }

    function Vd(t) {
        return tn.isBuffer(t) || t instanceof Gd
    }
    var Bi = yi(),
        U;
    Bi && Bi.debuglog ? U = Bi.debuglog("stream") : U = function() {};
    var zd = Cu(),
        Fi = bi(),
        Yd = Ei(),
        Xd = Yd.getHighWaterMark,
        rn = ot().codes,
        Kd = rn.ERR_INVALID_ARG_TYPE,
        Jd = rn.ERR_STREAM_PUSH_AFTER_EOF,
        Qd = rn.ERR_METHOD_NOT_IMPLEMENTED,
        ey = rn.ERR_STREAM_UNSHIFT_AFTER_END_EVENT,
        Lt, Ni, Mi;
    Ge()(G, rr);
    var tr = Fi.errorOrDestroy,
        Ci = ["error", "close", "destroy", "pause", "resume"];

    function ty(t, e, r) {
        if (typeof t.prependListener == "function") return t.prependListener(e, r);
        !t._events || !t._events[e] ? t.on(e, r) : Array.isArray(t._events[e]) ? t._events[e].unshift(r) : t._events[e] = [r, t._events[e]]
    }

    function df(t, e, r) {
        Ct = Ct || at(), t = t || {}, typeof r != "boolean" && (r = e instanceof Ct), this.objectMode = !!t.objectMode, r && (this.objectMode = this.objectMode || !!t.readableObjectMode), this.highWaterMark = Xd(this, t, "readableHighWaterMark", r), this.buffer = new zd, this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = t.emitClose !== !1, this.autoDestroy = !!t.autoDestroy, this.destroyed = !1, this.defaultEncoding = t.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, t.encoding && (Lt || (Lt = Ii().StringDecoder), this.decoder = new Lt(t.encoding), this.encoding = t.encoding)
    }

    function G(t) {
        if (Ct = Ct || at(), !(this instanceof G)) return new G(t);
        var e = this instanceof Ct;
        this._readableState = new df(t, this, e), this.readable = !0, t && (typeof t.read == "function" && (this._read = t.read), typeof t.destroy == "function" && (this._destroy = t.destroy)), rr.call(this)
    }
    Object.defineProperty(G.prototype, "destroyed", {
        enumerable: !1,
        get: function() {
            return this._readableState === void 0 ? !1 : this._readableState.destroyed
        },
        set: function(e) {
            this._readableState && (this._readableState.destroyed = e)
        }
    });
    G.prototype.destroy = Fi.destroy;
    G.prototype._undestroy = Fi.undestroy;
    G.prototype._destroy = function(t, e) {
        e(t)
    };
    G.prototype.push = function(t, e) {
        var r = this._readableState,
            n;
        return r.objectMode ? n = !0 : typeof t == "string" && (e = e || r.defaultEncoding, e !== r.encoding && (t = tn.from(t, e), e = ""), n = !0), yf(this, t, e, !1, n)
    };
    G.prototype.unshift = function(t) {
        return yf(this, t, null, !0, !1)
    };

    function yf(t, e, r, n, i) {
        U("readableAddChunk", e);
        var o = t._readableState;
        if (e === null) o.reading = !1, iy(t, o);
        else {
            var a;
            if (i || (a = ry(o, e)), a) tr(t, a);
            else if (o.objectMode || e && e.length > 0)
                if (typeof e != "string" && !o.objectMode && Object.getPrototypeOf(e) !== tn.prototype && (e = Zd(e)), n) o.endEmitted ? tr(t, new ey) : Li(t, o, e, !0);
                else if (o.ended) tr(t, new Jd);
            else {
                if (o.destroyed) return !1;
                o.reading = !1, o.decoder && !r ? (e = o.decoder.write(e), o.objectMode || e.length !== 0 ? Li(t, o, e, !1) : ji(t, o)) : Li(t, o, e, !1)
            } else n || (o.reading = !1, ji(t, o))
        }
        return !o.ended && (o.length < o.highWaterMark || o.length === 0)
    }

    function Li(t, e, r, n) {
        e.flowing && e.length === 0 && !e.sync ? (e.awaitDrain = 0, t.emit("data", r)) : (e.length += e.objectMode ? 1 : r.length, n ? e.buffer.unshift(r) : e.buffer.push(r), e.needReadable && nn(t)), ji(t, e)
    }

    function ry(t, e) {
        var r;
        return !Vd(e) && typeof e != "string" && e !== void 0 && !t.objectMode && (r = new Kd("chunk", ["string", "Buffer", "Uint8Array"], e)), r
    }
    G.prototype.isPaused = function() {
        return this._readableState.flowing === !1
    };
    G.prototype.setEncoding = function(t) {
        Lt || (Lt = Ii().StringDecoder);
        var e = new Lt(t);
        this._readableState.decoder = e, this._readableState.encoding = this._readableState.decoder.encoding;
        for (var r = this._readableState.buffer.head, n = ""; r !== null;) n += e.write(r.data), r = r.next;
        return this._readableState.buffer.clear(), n !== "" && this._readableState.buffer.push(n), this._readableState.length = n.length, this
    };
    var cf = 1073741824;

    function ny(t) {
        return t >= cf ? t = cf : (t--, t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, t |= t >>> 16, t++), t
    }

    function hf(t, e) {
        return t <= 0 || e.length === 0 && e.ended ? 0 : e.objectMode ? 1 : t !== t ? e.flowing && e.length ? e.buffer.head.data.length : e.length : (t > e.highWaterMark && (e.highWaterMark = ny(t)), t <= e.length ? t : e.ended ? e.length : (e.needReadable = !0, 0))
    }
    G.prototype.read = function(t) {
        U("read", t), t = parseInt(t, 10);
        var e = this._readableState,
            r = t;
        if (t !== 0 && (e.emittedReadable = !1), t === 0 && e.needReadable && ((e.highWaterMark !== 0 ? e.length >= e.highWaterMark : e.length > 0) || e.ended)) return U("read: emitReadable", e.length, e.ended), e.length === 0 && e.ended ? Di(this) : nn(this), null;
        if (t = hf(t, e), t === 0 && e.ended) return e.length === 0 && Di(this), null;
        var n = e.needReadable;
        U("need readable", n), (e.length === 0 || e.length - t < e.highWaterMark) && (n = !0, U("length less than watermark", n)), e.ended || e.reading ? (n = !1, U("reading or ended", n)) : n && (U("do read"), e.reading = !0, e.sync = !0, e.length === 0 && (e.needReadable = !0), this._read(e.highWaterMark), e.sync = !1, e.reading || (t = hf(r, e)));
        var i;
        return t > 0 ? i = bf(t, e) : i = null, i === null ? (e.needReadable = e.length <= e.highWaterMark, t = 0) : (e.length -= t, e.awaitDrain = 0), e.length === 0 && (e.ended || (e.needReadable = !0), r !== t && e.ended && Di(this)), i !== null && this.emit("data", i), i
    };

    function iy(t, e) {
        if (U("onEofChunk"), !e.ended) {
            if (e.decoder) {
                var r = e.decoder.end();
                r && r.length && (e.buffer.push(r), e.length += e.objectMode ? 1 : r.length)
            }
            e.ended = !0, e.sync ? nn(t) : (e.needReadable = !1, e.emittedReadable || (e.emittedReadable = !0, gf(t)))
        }
    }

    function nn(t) {
        var e = t._readableState;
        U("emitReadable", e.needReadable, e.emittedReadable), e.needReadable = !1, e.emittedReadable || (U("emitReadable", e.flowing), e.emittedReadable = !0, process.nextTick(gf, t))
    }

    function gf(t) {
        var e = t._readableState;
        U("emitReadable_", e.destroyed, e.length, e.ended), !e.destroyed && (e.length || e.ended) && (t.emit("readable"), e.emittedReadable = !1), e.needReadable = !e.flowing && !e.ended && e.length <= e.highWaterMark, Ui(t)
    }

    function ji(t, e) {
        e.readingMore || (e.readingMore = !0, process.nextTick(oy, t, e))
    }

    function oy(t, e) {
        for (; !e.reading && !e.ended && (e.length < e.highWaterMark || e.flowing && e.length === 0);) {
            var r = e.length;
            if (U("maybeReadMore read 0"), t.read(0), r === e.length) break
        }
        e.readingMore = !1
    }
    G.prototype._read = function(t) {
        tr(this, new Qd("_read()"))
    };
    G.prototype.pipe = function(t, e) {
        var r = this,
            n = this._readableState;
        switch (n.pipesCount) {
            case 0:
                n.pipes = t;
                break;
            case 1:
                n.pipes = [n.pipes, t];
                break;
            default:
                n.pipes.push(t);
                break
        }
        n.pipesCount += 1, U("pipe count=%d opts=%j", n.pipesCount, e);
        var i = (!e || e.end !== !1) && t !== process.stdout && t !== process.stderr,
            o = i ? s : z;
        n.endEmitted ? process.nextTick(o) : r.once("end", o), t.on("unpipe", a);

        function a(re, Y) {
            U("onunpipe"), re === r && Y && Y.hasUnpiped === !1 && (Y.hasUnpiped = !0, h())
        }

        function s() {
            U("onend"), t.end()
        }
        var u = ay(r);
        t.on("drain", u);
        var d = !1;

        function h() {
            U("cleanup"), t.removeListener("close", T), t.removeListener("finish", N), t.removeListener("drain", u), t.removeListener("error", _), t.removeListener("unpipe", a), r.removeListener("end", s), r.removeListener("end", z), r.removeListener("data", y), d = !0, n.awaitDrain && (!t._writableState || t._writableState.needDrain) && u()
        }
        r.on("data", y);

        function y(re) {
            U("ondata");
            var Y = t.write(re);
            U("dest.write", Y), Y === !1 && ((n.pipesCount === 1 && n.pipes === t || n.pipesCount > 1 && Ef(n.pipes, t) !== -1) && !d && (U("false write response, pause", n.awaitDrain), n.awaitDrain++), r.pause())
        }

        function _(re) {
            U("onerror", re), z(), t.removeListener("error", _), pf(t, "error") === 0 && tr(t, re)
        }
        ty(t, "error", _);

        function T() {
            t.removeListener("finish", N), z()
        }
        t.once("close", T);

        function N() {
            U("onfinish"), t.removeListener("close", T), z()
        }
        t.once("finish", N);

        function z() {
            U("unpipe"), r.unpipe(t)
        }
        return t.emit("pipe", r), n.flowing || (U("pipe resume"), r.resume()), t
    };

    function ay(t) {
        return function() {
            var r = t._readableState;
            U("pipeOnDrain", r.awaitDrain), r.awaitDrain && r.awaitDrain--, r.awaitDrain === 0 && pf(t, "data") && (r.flowing = !0, Ui(t))
        }
    }
    G.prototype.unpipe = function(t) {
        var e = this._readableState,
            r = {
                hasUnpiped: !1
            };
        if (e.pipesCount === 0) return this;
        if (e.pipesCount === 1) return t && t !== e.pipes ? this : (t || (t = e.pipes), e.pipes = null, e.pipesCount = 0, e.flowing = !1, t && t.emit("unpipe", this, r), this);
        if (!t) {
            var n = e.pipes,
                i = e.pipesCount;
            e.pipes = null, e.pipesCount = 0, e.flowing = !1;
            for (var o = 0; o < i; o++) n[o].emit("unpipe", this, {
                hasUnpiped: !1
            });
            return this
        }
        var a = Ef(e.pipes, t);
        return a === -1 ? this : (e.pipes.splice(a, 1), e.pipesCount -= 1, e.pipesCount === 1 && (e.pipes = e.pipes[0]), t.emit("unpipe", this, r), this)
    };
    G.prototype.on = function(t, e) {
        var r = rr.prototype.on.call(this, t, e),
            n = this._readableState;
        return t === "data" ? (n.readableListening = this.listenerCount("readable") > 0, n.flowing !== !1 && this.resume()) : t === "readable" && !n.endEmitted && !n.readableListening && (n.readableListening = n.needReadable = !0, n.flowing = !1, n.emittedReadable = !1, U("on readable", n.length, n.reading), n.length ? nn(this) : n.reading || process.nextTick(sy, this)), r
    };
    G.prototype.addListener = G.prototype.on;
    G.prototype.removeListener = function(t, e) {
        var r = rr.prototype.removeListener.call(this, t, e);
        return t === "readable" && process.nextTick(mf, this), r
    };
    G.prototype.removeAllListeners = function(t) {
        var e = rr.prototype.removeAllListeners.apply(this, arguments);
        return (t === "readable" || t === void 0) && process.nextTick(mf, this), e
    };

    function mf(t) {
        var e = t._readableState;
        e.readableListening = t.listenerCount("readable") > 0, e.resumeScheduled && !e.paused ? e.flowing = !0 : t.listenerCount("data") > 0 && t.resume()
    }

    function sy(t) {
        U("readable nexttick read 0"), t.read(0)
    }
    G.prototype.resume = function() {
        var t = this._readableState;
        return t.flowing || (U("resume"), t.flowing = !t.readableListening, uy(this, t)), t.paused = !1, this
    };

    function uy(t, e) {
        e.resumeScheduled || (e.resumeScheduled = !0, process.nextTick(fy, t, e))
    }

    function fy(t, e) {
        U("resume", e.reading), e.reading || t.read(0), e.resumeScheduled = !1, t.emit("resume"), Ui(t), e.flowing && !e.reading && t.read(0)
    }
    G.prototype.pause = function() {
        return U("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (U("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this
    };

    function Ui(t) {
        var e = t._readableState;
        for (U("flow", e.flowing); e.flowing && t.read() !== null;);
    }
    G.prototype.wrap = function(t) {
        var e = this,
            r = this._readableState,
            n = !1;
        t.on("end", function() {
            if (U("wrapped end"), r.decoder && !r.ended) {
                var a = r.decoder.end();
                a && a.length && e.push(a)
            }
            e.push(null)
        }), t.on("data", function(a) {
            if (U("wrapped data"), r.decoder && (a = r.decoder.write(a)), !(r.objectMode && a == null) && !(!r.objectMode && (!a || !a.length))) {
                var s = e.push(a);
                s || (n = !0, t.pause())
            }
        });
        for (var i in t) this[i] === void 0 && typeof t[i] == "function" && (this[i] = function(s) {
            return function() {
                return t[s].apply(t, arguments)
            }
        }(i));
        for (var o = 0; o < Ci.length; o++) t.on(Ci[o], this.emit.bind(this, Ci[o]));
        return this._read = function(a) {
            U("wrapped _read", a), n && (n = !1, t.resume())
        }, this
    };
    typeof Symbol == "function" && (G.prototype[Symbol.asyncIterator] = function() {
        return Ni === void 0 && (Ni = uf()), Ni(this)
    });
    Object.defineProperty(G.prototype, "readableHighWaterMark", {
        enumerable: !1,
        get: function() {
            return this._readableState.highWaterMark
        }
    });
    Object.defineProperty(G.prototype, "readableBuffer", {
        enumerable: !1,
        get: function() {
            return this._readableState && this._readableState.buffer
        }
    });
    Object.defineProperty(G.prototype, "readableFlowing", {
        enumerable: !1,
        get: function() {
            return this._readableState.flowing
        },
        set: function(e) {
            this._readableState && (this._readableState.flowing = e)
        }
    });
    G._fromList = bf;
    Object.defineProperty(G.prototype, "readableLength", {
        enumerable: !1,
        get: function() {
            return this._readableState.length
        }
    });

    function bf(t, e) {
        if (e.length === 0) return null;
        var r;
        return e.objectMode ? r = e.buffer.shift() : !t || t >= e.length ? (e.decoder ? r = e.buffer.join("") : e.buffer.length === 1 ? r = e.buffer.first() : r = e.buffer.concat(e.length), e.buffer.clear()) : r = e.buffer.consume(t, e.decoder), r
    }

    function Di(t) {
        var e = t._readableState;
        U("endReadable", e.endEmitted), e.endEmitted || (e.ended = !0, process.nextTick(ly, e, t))
    }

    function ly(t, e) {
        if (U("endReadableNT", t.endEmitted, t.length), !t.endEmitted && t.length === 0 && (t.endEmitted = !0, e.readable = !1, e.emit("end"), t.autoDestroy)) {
            var r = e._writableState;
            (!r || r.autoDestroy && r.finished) && e.destroy()
        }
    }
    typeof Symbol == "function" && (G.from = function(t, e) {
        return Mi === void 0 && (Mi = lf()), Mi(G, t, e)
    });

    function Ef(t, e) {
        for (var r = 0, n = t.length; r < n; r++)
            if (t[r] === e) return r;
        return -1
    }
});
var qi = E((Jg, vf) => {
    "use strict";
    vf.exports = qe;
    var on = ot().codes,
        cy = on.ERR_METHOD_NOT_IMPLEMENTED,
        hy = on.ERR_MULTIPLE_CALLBACK,
        py = on.ERR_TRANSFORM_ALREADY_TRANSFORMING,
        dy = on.ERR_TRANSFORM_WITH_LENGTH_0,
        an = at();
    Ge()(qe, an);

    function yy(t, e) {
        var r = this._transformState;
        r.transforming = !1;
        var n = r.writecb;
        if (n === null) return this.emit("error", new hy);
        r.writechunk = null, r.writecb = null, e != null && this.push(e), n(t);
        var i = this._readableState;
        i.reading = !1, (i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark)
    }

    function qe(t) {
        if (!(this instanceof qe)) return new qe(t);
        an.call(this, t), this._transformState = {
            afterTransform: yy.bind(this),
            needTransform: !1,
            transforming: !1,
            writecb: null,
            writechunk: null,
            writeencoding: null
        }, this._readableState.needReadable = !0, this._readableState.sync = !1, t && (typeof t.transform == "function" && (this._transform = t.transform), typeof t.flush == "function" && (this._flush = t.flush)), this.on("prefinish", gy)
    }

    function gy() {
        var t = this;
        typeof this._flush == "function" && !this._readableState.destroyed ? this._flush(function(e, r) {
            _f(t, e, r)
        }) : _f(this, null, null)
    }
    qe.prototype.push = function(t, e) {
        return this._transformState.needTransform = !1, an.prototype.push.call(this, t, e)
    };
    qe.prototype._transform = function(t, e, r) {
        r(new cy("_transform()"))
    };
    qe.prototype._write = function(t, e, r) {
        var n = this._transformState;
        if (n.writecb = r, n.writechunk = t, n.writeencoding = e, !n.transforming) {
            var i = this._readableState;
            (n.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark)
        }
    };
    qe.prototype._read = function(t) {
        var e = this._transformState;
        e.writechunk !== null && !e.transforming ? (e.transforming = !0, this._transform(e.writechunk, e.writeencoding, e.afterTransform)) : e.needTransform = !0
    };
    qe.prototype._destroy = function(t, e) {
        an.prototype._destroy.call(this, t, function(r) {
            e(r)
        })
    };

    function _f(t, e, r) {
        if (e) return t.emit("error", e);
        if (r != null && t.push(r), t._writableState.length) throw new dy;
        if (t._transformState.transforming) throw new py;
        return t.push(null)
    }
});
var Af = E((Qg, Sf) => {
    "use strict";
    Sf.exports = nr;
    var Tf = qi();
    Ge()(nr, Tf);

    function nr(t) {
        if (!(this instanceof nr)) return new nr(t);
        Tf.call(this, t)
    }
    nr.prototype._transform = function(t, e, r) {
        r(null, t)
    }
});
var If = E((em, Pf) => {
    "use strict";
    var $i;

    function my(t) {
        var e = !1;
        return function() {
            e || (e = !0, t.apply(void 0, arguments))
        }
    }
    var Of = ot().codes,
        by = Of.ERR_MISSING_ARGS,
        Ey = Of.ERR_STREAM_DESTROYED;

    function Rf(t) {
        if (t) throw t
    }

    function wy(t) {
        return t.setHeader && typeof t.abort == "function"
    }

    function _y(t, e, r, n) {
        n = my(n);
        var i = !1;
        t.on("close", function() {
            i = !0
        }), $i === void 0 && ($i = Jr()), $i(t, {
            readable: e,
            writable: r
        }, function(a) {
            if (a) return n(a);
            i = !0, n()
        });
        var o = !1;
        return function(a) {
            if (!i && !o) {
                if (o = !0, wy(t)) return t.abort();
                if (typeof t.destroy == "function") return t.destroy();
                n(a || new Ey("pipe"))
            }
        }
    }

    function xf(t) {
        t()
    }

    function vy(t, e) {
        return t.pipe(e)
    }

    function Ty(t) {
        return !t.length || typeof t[t.length - 1] != "function" ? Rf : t.pop()
    }

    function Sy() {
        for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
        var n = Ty(e);
        if (Array.isArray(e[0]) && (e = e[0]), e.length < 2) throw new by("streams");
        var i, o = e.map(function(a, s) {
            var u = s < e.length - 1,
                d = s > 0;
            return _y(a, u, d, function(h) {
                i || (i = h), h && o.forEach(xf), !u && (o.forEach(xf), n(i))
            })
        });
        return e.reduce(vy)
    }
    Pf.exports = Sy
});
var Hi = E((tm, kf) => {
    "use strict";
    kf.exports = be;
    var Wi = yr().EventEmitter,
        Ay = Ge();
    Ay(be, Wi);
    be.Readable = Ri();
    be.Writable = Ti();
    be.Duplex = at();
    be.Transform = qi();
    be.PassThrough = Af();
    be.finished = Jr();
    be.pipeline = If();
    be.Stream = be;

    function be() {
        Wi.call(this)
    }
    be.prototype.pipe = function(t, e) {
        var r = this;

        function n(h) {
            t.writable && t.write(h) === !1 && r.pause && r.pause()
        }
        r.on("data", n);

        function i() {
            r.readable && r.resume && r.resume()
        }
        t.on("drain", i), !t._isStdio && (!e || e.end !== !1) && (r.on("end", a), r.on("close", s));
        var o = !1;

        function a() {
            o || (o = !0, t.end())
        }

        function s() {
            o || (o = !0, typeof t.destroy == "function" && t.destroy())
        }

        function u(h) {
            if (d(), Wi.listenerCount(this, "error") === 0) throw h
        }
        r.on("error", u), t.on("error", u);

        function d() {
            r.removeListener("data", n), t.removeListener("drain", i), r.removeListener("end", a), r.removeListener("close", s), r.removeListener("error", u), t.removeListener("error", u), r.removeListener("end", d), r.removeListener("close", d), t.removeListener("close", d)
        }
        return r.on("end", d), r.on("close", d), t.on("close", d), t.emit("pipe", r), t
    }
});
var Ae = globalThis;

function pe(t) {
    return (Ae.__Zone_symbol_prefix || "__zone_symbol__") + t
}

function Mf() {
    let t = Ae.performance;

    function e(L) {
        t && t.mark && t.mark(L)
    }

    function r(L, v) {
        t && t.measure && t.measure(L, v)
    }
    e("Zone");
    let n = (() => {
            class L {
                static {
                    this.__symbol__ = pe
                }
                static assertZonePatched() {
                    if (Ae.Promise !== C.ZoneAwarePromise) throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)")
                }
                static get root() {
                    let f = L.current;
                    for (; f.parent;) f = f.parent;
                    return f
                }
                static get current() {
                    return P.zone
                }
                static get currentTask() {
                    return M
                }
                static __load_patch(f, l, R = !1) {
                    if (C.hasOwnProperty(f)) {
                        let I = Ae[pe("forceDuplicateZoneCheck")] === !0;
                        if (!R && I) throw Error("Already loaded patch: " + f)
                    } else if (!Ae["__Zone_disable_" + f]) {
                        let I = "Zone:" + f;
                        e(I), C[f] = l(Ae, L, k), r(I, I)
                    }
                }
                get parent() {
                    return this._parent
                }
                get name() {
                    return this._name
                }
                constructor(f, l) {
                    this._parent = f, this._name = l ? l.name || "unnamed" : "<root>", this._properties = l && l.properties || {}, this._zoneDelegate = new o(this, this._parent && this._parent._zoneDelegate, l)
                }
                get(f) {
                    let l = this.getZoneWith(f);
                    if (l) return l._properties[f]
                }
                getZoneWith(f) {
                    let l = this;
                    for (; l;) {
                        if (l._properties.hasOwnProperty(f)) return l;
                        l = l._parent
                    }
                    return null
                }
                fork(f) {
                    if (!f) throw new Error("ZoneSpec required!");
                    return this._zoneDelegate.fork(this, f)
                }
                wrap(f, l) {
                    if (typeof f != "function") throw new Error("Expecting function got: " + f);
                    let R = this._zoneDelegate.intercept(this, f, l),
                        I = this;
                    return function() {
                        return I.runGuarded(R, this, arguments, l)
                    }
                }
                run(f, l, R, I) {
                    P = {
                        parent: P,
                        zone: this
                    };
                    try {
                        return this._zoneDelegate.invoke(this, f, l, R, I)
                    } finally {
                        P = P.parent
                    }
                }
                runGuarded(f, l = null, R, I) {
                    P = {
                        parent: P,
                        zone: this
                    };
                    try {
                        try {
                            return this._zoneDelegate.invoke(this, f, l, R, I)
                        } catch (ie) {
                            if (this._zoneDelegate.handleError(this, ie)) throw ie
                        }
                    } finally {
                        P = P.parent
                    }
                }
                runTask(f, l, R) {
                    if (f.zone != this) throw new Error("A task can only be run in the zone of creation! (Creation: " + (f.zone || re).name + "; Execution: " + this.name + ")");
                    let I = f,
                        {
                            type: ie,
                            data: {
                                isPeriodic: H = !1,
                                isRefreshable: $e = !1
                            } = {}
                        } = f;
                    if (f.state === Y && (ie === te || ie === S)) return;
                    let Be = f.state != Z;
                    Be && I._transitionTo(Z, w);
                    let Ne = M;
                    M = I, P = {
                        parent: P,
                        zone: this
                    };
                    try {
                        ie == S && f.data && !H && !$e && (f.cancelFn = void 0);
                        try {
                            return this._zoneDelegate.invokeTask(this, I, l, R)
                        } catch (Ee) {
                            if (this._zoneDelegate.handleError(this, Ee)) throw Ee
                        }
                    } finally {
                        let Ee = f.state;
                        if (Ee !== Y && Ee !== ae)
                            if (ie == te || H || $e && Ee === x) Be && I._transitionTo(w, Z, x);
                            else {
                                let b = I._zoneDelegates;
                                this._updateTaskCount(I, -1), Be && I._transitionTo(Y, Z, Y), $e && (I._zoneDelegates = b)
                            }
                        P = P.parent, M = Ne
                    }
                }
                scheduleTask(f) {
                    if (f.zone && f.zone !== this) {
                        let R = this;
                        for (; R;) {
                            if (R === f.zone) throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${f.zone.name}`);
                            R = R.parent
                        }
                    }
                    f._transitionTo(x, Y);
                    let l = [];
                    f._zoneDelegates = l, f._zone = this;
                    try {
                        f = this._zoneDelegate.scheduleTask(this, f)
                    } catch (R) {
                        throw f._transitionTo(ae, x, Y), this._zoneDelegate.handleError(this, R), R
                    }
                    return f._zoneDelegates === l && this._updateTaskCount(f, 1), f.state == x && f._transitionTo(w, x), f
                }
                scheduleMicroTask(f, l, R, I) {
                    return this.scheduleTask(new a(J, f, l, R, I, void 0))
                }
                scheduleMacroTask(f, l, R, I, ie) {
                    return this.scheduleTask(new a(S, f, l, R, I, ie))
                }
                scheduleEventTask(f, l, R, I, ie) {
                    return this.scheduleTask(new a(te, f, l, R, I, ie))
                }
                cancelTask(f) {
                    if (f.zone != this) throw new Error("A task can only be cancelled in the zone of creation! (Creation: " + (f.zone || re).name + "; Execution: " + this.name + ")");
                    if (!(f.state !== w && f.state !== Z)) {
                        f._transitionTo(X, w, Z);
                        try {
                            this._zoneDelegate.cancelTask(this, f)
                        } catch (l) {
                            throw f._transitionTo(ae, X), this._zoneDelegate.handleError(this, l), l
                        }
                        return this._updateTaskCount(f, -1), f._transitionTo(Y, X), f.runCount = -1, f
                    }
                }
                _updateTaskCount(f, l) {
                    let R = f._zoneDelegates;
                    l == -1 && (f._zoneDelegates = null);
                    for (let I = 0; I < R.length; I++) R[I]._updateTaskCount(f.type, l)
                }
            }
            return L
        })(),
        i = {
            name: "",
            onHasTask: (L, v, f, l) => L.hasTask(f, l),
            onScheduleTask: (L, v, f, l) => L.scheduleTask(f, l),
            onInvokeTask: (L, v, f, l, R, I) => L.invokeTask(f, l, R, I),
            onCancelTask: (L, v, f, l) => L.cancelTask(f, l)
        };
    class o {
        get zone() {
            return this._zone
        }
        constructor(v, f, l) {
            this._taskCounts = {
                microTask: 0,
                macroTask: 0,
                eventTask: 0
            }, this._zone = v, this._parentDelegate = f, this._forkZS = l && (l && l.onFork ? l : f._forkZS), this._forkDlgt = l && (l.onFork ? f : f._forkDlgt), this._forkCurrZone = l && (l.onFork ? this._zone : f._forkCurrZone), this._interceptZS = l && (l.onIntercept ? l : f._interceptZS), this._interceptDlgt = l && (l.onIntercept ? f : f._interceptDlgt), this._interceptCurrZone = l && (l.onIntercept ? this._zone : f._interceptCurrZone), this._invokeZS = l && (l.onInvoke ? l : f._invokeZS), this._invokeDlgt = l && (l.onInvoke ? f : f._invokeDlgt), this._invokeCurrZone = l && (l.onInvoke ? this._zone : f._invokeCurrZone), this._handleErrorZS = l && (l.onHandleError ? l : f._handleErrorZS), this._handleErrorDlgt = l && (l.onHandleError ? f : f._handleErrorDlgt), this._handleErrorCurrZone = l && (l.onHandleError ? this._zone : f._handleErrorCurrZone), this._scheduleTaskZS = l && (l.onScheduleTask ? l : f._scheduleTaskZS), this._scheduleTaskDlgt = l && (l.onScheduleTask ? f : f._scheduleTaskDlgt), this._scheduleTaskCurrZone = l && (l.onScheduleTask ? this._zone : f._scheduleTaskCurrZone), this._invokeTaskZS = l && (l.onInvokeTask ? l : f._invokeTaskZS), this._invokeTaskDlgt = l && (l.onInvokeTask ? f : f._invokeTaskDlgt), this._invokeTaskCurrZone = l && (l.onInvokeTask ? this._zone : f._invokeTaskCurrZone), this._cancelTaskZS = l && (l.onCancelTask ? l : f._cancelTaskZS), this._cancelTaskDlgt = l && (l.onCancelTask ? f : f._cancelTaskDlgt), this._cancelTaskCurrZone = l && (l.onCancelTask ? this._zone : f._cancelTaskCurrZone), this._hasTaskZS = null, this._hasTaskDlgt = null, this._hasTaskDlgtOwner = null, this._hasTaskCurrZone = null;
            let R = l && l.onHasTask,
                I = f && f._hasTaskZS;
            (R || I) && (this._hasTaskZS = R ? l : i, this._hasTaskDlgt = f, this._hasTaskDlgtOwner = this, this._hasTaskCurrZone = this._zone, l.onScheduleTask || (this._scheduleTaskZS = i, this._scheduleTaskDlgt = f, this._scheduleTaskCurrZone = this._zone), l.onInvokeTask || (this._invokeTaskZS = i, this._invokeTaskDlgt = f, this._invokeTaskCurrZone = this._zone), l.onCancelTask || (this._cancelTaskZS = i, this._cancelTaskDlgt = f, this._cancelTaskCurrZone = this._zone))
        }
        fork(v, f) {
            return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, v, f) : new n(v, f)
        }
        intercept(v, f, l) {
            return this._interceptZS ? this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, v, f, l) : f
        }
        invoke(v, f, l, R, I) {
            return this._invokeZS ? this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, v, f, l, R, I) : f.apply(l, R)
        }
        handleError(v, f) {
            return this._handleErrorZS ? this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, v, f) : !0
        }
        scheduleTask(v, f) {
            let l = f;
            if (this._scheduleTaskZS) this._hasTaskZS && l._zoneDelegates.push(this._hasTaskDlgtOwner), l = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, v, f), l || (l = f);
            else if (f.scheduleFn) f.scheduleFn(f);
            else if (f.type == J) N(f);
            else throw new Error("Task is missing scheduleFn.");
            return l
        }
        invokeTask(v, f, l, R) {
            return this._invokeTaskZS ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, v, f, l, R) : f.callback.apply(l, R)
        }
        cancelTask(v, f) {
            let l;
            if (this._cancelTaskZS) l = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, v, f);
            else {
                if (!f.cancelFn) throw Error("Task is not cancelable");
                l = f.cancelFn(f)
            }
            return l
        }
        hasTask(v, f) {
            try {
                this._hasTaskZS && this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, v, f)
            } catch (l) {
                this.handleError(v, l)
            }
        }
        _updateTaskCount(v, f) {
            let l = this._taskCounts,
                R = l[v],
                I = l[v] = R + f;
            if (I < 0) throw new Error("More tasks executed then were scheduled.");
            if (R == 0 || I == 0) {
                let ie = {
                    microTask: l.microTask > 0,
                    macroTask: l.macroTask > 0,
                    eventTask: l.eventTask > 0,
                    change: v
                };
                this.hasTask(this._zone, ie)
            }
        }
    }
    class a {
        constructor(v, f, l, R, I, ie) {
            if (this._zone = null, this.runCount = 0, this._zoneDelegates = null, this._state = "notScheduled", this.type = v, this.source = f, this.data = R, this.scheduleFn = I, this.cancelFn = ie, !l) throw new Error("callback is not defined");
            this.callback = l;
            let H = this;
            v === te && R && R.useG ? this.invoke = a.invokeTask : this.invoke = function() {
                return a.invokeTask.call(Ae, H, this, arguments)
            }
        }
        static invokeTask(v, f, l) {
            v || (v = this), ce++;
            try {
                return v.runCount++, v.zone.runTask(v, f, l)
            } finally {
                ce == 1 && z(), ce--
            }
        }
        get zone() {
            return this._zone
        }
        get state() {
            return this._state
        }
        cancelScheduleRequest() {
            this._transitionTo(Y, x)
        }
        _transitionTo(v, f, l) {
            if (this._state === f || this._state === l) this._state = v, v == Y && (this._zoneDelegates = null);
            else throw new Error(`${this.type} '${this.source}': can not transition to '${v}', expecting state '${f}'${l?" or '"+l+"'":""}, was '${this._state}'.`)
        }
        toString() {
            return this.data && typeof this.data.handleId < "u" ? this.data.handleId.toString() : Object.prototype.toString.call(this)
        }
        toJSON() {
            return {
                type: this.type,
                state: this.state,
                source: this.source,
                zone: this.zone.name,
                runCount: this.runCount
            }
        }
    }
    let s = pe("setTimeout"),
        u = pe("Promise"),
        d = pe("then"),
        h = [],
        y = !1,
        _;

    function T(L) {
        if (_ || Ae[u] && (_ = Ae[u].resolve(0)), _) {
            let v = _[d];
            v || (v = _.then), v.call(_, L)
        } else Ae[s](L, 0)
    }

    function N(L) {
        ce === 0 && h.length === 0 && T(z), L && h.push(L)
    }

    function z() {
        if (!y) {
            for (y = !0; h.length;) {
                let L = h;
                h = [];
                for (let v = 0; v < L.length; v++) {
                    let f = L[v];
                    try {
                        f.zone.runTask(f, null, null)
                    } catch (l) {
                        k.onUnhandledError(l)
                    }
                }
            }
            k.microtaskDrainDone(), y = !1
        }
    }
    let re = {
            name: "NO ZONE"
        },
        Y = "notScheduled",
        x = "scheduling",
        w = "scheduled",
        Z = "running",
        X = "canceling",
        ae = "unknown",
        J = "microTask",
        S = "macroTask",
        te = "eventTask",
        C = {},
        k = {
            symbol: pe,
            currentZoneFrame: () => P,
            onUnhandledError: ne,
            microtaskDrainDone: ne,
            scheduleMicroTask: N,
            showUncaughtError: () => !n[pe("ignoreConsoleErrorUncaughtError")],
            patchEventTarget: () => [],
            patchOnProperties: ne,
            patchMethod: () => ne,
            bindArguments: () => [],
            patchThen: () => ne,
            patchMacroTask: () => ne,
            patchEventPrototype: () => ne,
            isIEOrEdge: () => !1,
            getGlobalObjects: () => {},
            ObjectDefineProperty: () => ne,
            ObjectGetOwnPropertyDescriptor: () => {},
            ObjectCreate: () => {},
            ArraySlice: () => [],
            patchClass: () => ne,
            wrapWithCurrentZone: () => ne,
            filterProperties: () => [],
            attachOriginToPatched: () => ne,
            _redefineProperty: () => ne,
            patchCallbacks: () => ne,
            nativeScheduleMicroTask: T
        },
        P = {
            parent: null,
            zone: new n(null, null)
        },
        M = null,
        ce = 0;

    function ne() {}
    return r("Zone", "Zone"), n
}

function Cf() {
    let t = globalThis,
        e = t[pe("forceDuplicateZoneCheck")] === !0;
    if (t.Zone && (e || typeof t.Zone.__symbol__ != "function")) throw new Error("Zone already loaded.");
    return t.Zone ? ? = Mf(), t.Zone
}
var Ft = Object.getOwnPropertyDescriptor,
    dn = Object.defineProperty,
    yn = Object.getPrototypeOf,
    Lf = Object.create,
    Df = Array.prototype.slice,
    gn = "addEventListener",
    mn = "removeEventListener",
    ln = pe(gn),
    cn = pe(mn),
    Me = "true",
    Ce = "false",
    Ut = pe("");

function bn(t, e) {
    return Zone.current.wrap(t, e)
}

function En(t, e, r, n, i) {
    return Zone.current.scheduleMacroTask(t, e, r, n, i)
}
var V = pe,
    sr = typeof window < "u",
    yt = sr ? window : void 0,
    ue = sr && yt || globalThis,
    jf = "removeAttribute";

function wn(t, e) {
    for (let r = t.length - 1; r >= 0; r--) typeof t[r] == "function" && (t[r] = bn(t[r], e + "_" + r));
    return t
}

function Ff(t, e) {
    let r = t.constructor.name;
    for (let n = 0; n < e.length; n++) {
        let i = e[n],
            o = t[i];
        if (o) {
            let a = Ft(t, i);
            if (!ro(a)) continue;
            t[i] = (s => {
                let u = function() {
                    return s.apply(this, wn(arguments, r + "." + i))
                };
                return De(u, s), u
            })(o)
        }
    }
}

function ro(t) {
    return t ? t.writable === !1 ? !1 : !(typeof t.get == "function" && typeof t.set > "u") : !0
}
var no = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope,
    ur = !("nw" in ue) && typeof ue.process < "u" && ue.process.toString() === "[object process]",
    _n = !ur && !no && !!(sr && yt.HTMLElement),
    io = typeof ue.process < "u" && ue.process.toString() === "[object process]" && !no && !!(sr && yt.HTMLElement),
    ar = {},
    Uf = V("enable_beforeunload"),
    Xi = function(t) {
        if (t = t || ue.event, !t) return;
        let e = ar[t.type];
        e || (e = ar[t.type] = V("ON_PROPERTY" + t.type));
        let r = this || t.target || ue,
            n = r[e],
            i;
        if (_n && r === yt && t.type === "error") {
            let o = t;
            i = n && n.call(this, o.message, o.filename, o.lineno, o.colno, o.error), i === !0 && t.preventDefault()
        } else i = n && n.apply(this, arguments), t.type === "beforeunload" && ue[Uf] && typeof i == "string" ? t.returnValue = i : i != null && !i && t.preventDefault();
        return i
    };

function Ki(t, e, r) {
    let n = Ft(t, e);
    if (!n && r && Ft(r, e) && (n = {
            enumerable: !0,
            configurable: !0
        }), !n || !n.configurable) return;
    let i = V("on" + e + "patched");
    if (t.hasOwnProperty(i) && t[i]) return;
    delete n.writable, delete n.value;
    let o = n.get,
        a = n.set,
        s = e.slice(2),
        u = ar[s];
    u || (u = ar[s] = V("ON_PROPERTY" + s)), n.set = function(d) {
        let h = this;
        if (!h && t === ue && (h = ue), !h) return;
        typeof h[u] == "function" && h.removeEventListener(s, Xi), a && a.call(h, null), h[u] = d, typeof d == "function" && h.addEventListener(s, Xi, !1)
    }, n.get = function() {
        let d = this;
        if (!d && t === ue && (d = ue), !d) return null;
        let h = d[u];
        if (h) return h;
        if (o) {
            let y = o.call(this);
            if (y) return n.set.call(this, y), typeof d[jf] == "function" && d.removeAttribute(e), y
        }
        return null
    }, dn(t, e, n), t[i] = !0
}

function oo(t, e, r) {
    if (e)
        for (let n = 0; n < e.length; n++) Ki(t, "on" + e[n], r);
    else {
        let n = [];
        for (let i in t) i.slice(0, 2) == "on" && n.push(i);
        for (let i = 0; i < n.length; i++) Ki(t, n[i], r)
    }
}
var _e = V("originalInstance");

function jt(t) {
    let e = ue[t];
    if (!e) return;
    ue[V(t)] = e, ue[t] = function() {
        let i = wn(arguments, t);
        switch (i.length) {
            case 0:
                this[_e] = new e;
                break;
            case 1:
                this[_e] = new e(i[0]);
                break;
            case 2:
                this[_e] = new e(i[0], i[1]);
                break;
            case 3:
                this[_e] = new e(i[0], i[1], i[2]);
                break;
            case 4:
                this[_e] = new e(i[0], i[1], i[2], i[3]);
                break;
            default:
                throw new Error("Arg list too long.")
        }
    }, De(ue[t], e);
    let r = new e(function() {}),
        n;
    for (n in r) t === "XMLHttpRequest" && n === "responseBlob" || function(i) {
        typeof r[i] == "function" ? ue[t].prototype[i] = function() {
            return this[_e][i].apply(this[_e], arguments)
        } : dn(ue[t].prototype, i, {
            set: function(o) {
                typeof o == "function" ? (this[_e][i] = bn(o, t + "." + i), De(this[_e][i], o)) : this[_e][i] = o
            },
            get: function() {
                return this[_e][i]
            }
        })
    }(n);
    for (n in e) n !== "prototype" && e.hasOwnProperty(n) && (ue[t][n] = e[n])
}

function Le(t, e, r) {
    let n = t;
    for (; n && !n.hasOwnProperty(e);) n = yn(n);
    !n && t[e] && (n = t);
    let i = V(e),
        o = null;
    if (n && (!(o = n[i]) || !n.hasOwnProperty(i))) {
        o = n[i] = n[e];
        let a = n && Ft(n, e);
        if (ro(a)) {
            let s = r(o, i, e);
            n[e] = function() {
                return s(this, arguments)
            }, De(n[e], o)
        }
    }
    return o
}

function qf(t, e, r) {
    let n = null;

    function i(o) {
        let a = o.data;
        return a.args[a.cbIdx] = function() {
            o.invoke.apply(this, arguments)
        }, n.apply(a.target, a.args), o
    }
    n = Le(t, e, o => function(a, s) {
        let u = r(a, s);
        return u.cbIdx >= 0 && typeof s[u.cbIdx] == "function" ? En(u.name, s[u.cbIdx], u, i) : o.apply(a, s)
    })
}

function De(t, e) {
    t[V("OriginalDelegate")] = e
}
var Ji = !1,
    hn = !1;

function $f() {
    try {
        let t = yt.navigator.userAgent;
        if (t.indexOf("MSIE ") !== -1 || t.indexOf("Trident/") !== -1) return !0
    } catch {}
    return !1
}

function Wf() {
    if (Ji) return hn;
    Ji = !0;
    try {
        let t = yt.navigator.userAgent;
        (t.indexOf("MSIE ") !== -1 || t.indexOf("Trident/") !== -1 || t.indexOf("Edge/") !== -1) && (hn = !0)
    } catch {}
    return hn
}

function Qi(t) {
    return typeof t == "function"
}

function eo(t) {
    return typeof t == "number"
}
var dt = !1;
if (typeof window < "u") try {
    let t = Object.defineProperty({}, "passive", {
        get: function() {
            dt = !0
        }
    });
    window.addEventListener("test", t, t), window.removeEventListener("test", t, t)
} catch {
    dt = !1
}
var Hf = {
        useG: !0
    },
    de = {},
    ao = {},
    so = new RegExp("^" + Ut + "(\\w+)(true|false)$"),
    uo = V("propagationStopped");

function fo(t, e) {
    let r = (e ? e(t) : t) + Ce,
        n = (e ? e(t) : t) + Me,
        i = Ut + r,
        o = Ut + n;
    de[t] = {}, de[t][Ce] = i, de[t][Me] = o
}

function Gf(t, e, r, n) {
    let i = n && n.add || gn,
        o = n && n.rm || mn,
        a = n && n.listeners || "eventListeners",
        s = n && n.rmAll || "removeAllListeners",
        u = V(i),
        d = "." + i + ":",
        h = "prependListener",
        y = "." + h + ":",
        _ = function(x, w, Z) {
            if (x.isRemoved) return;
            let X = x.callback;
            typeof X == "object" && X.handleEvent && (x.callback = S => X.handleEvent(S), x.originalDelegate = X);
            let ae;
            try {
                x.invoke(x, w, [Z])
            } catch (S) {
                ae = S
            }
            let J = x.options;
            if (J && typeof J == "object" && J.once) {
                let S = x.originalDelegate ? x.originalDelegate : x.callback;
                w[o].call(w, Z.type, S, J)
            }
            return ae
        };

    function T(x, w, Z) {
        if (w = w || t.event, !w) return;
        let X = x || w.target || t,
            ae = X[de[w.type][Z ? Me : Ce]];
        if (ae) {
            let J = [];
            if (ae.length === 1) {
                let S = _(ae[0], X, w);
                S && J.push(S)
            } else {
                let S = ae.slice();
                for (let te = 0; te < S.length && !(w && w[uo] === !0); te++) {
                    let C = _(S[te], X, w);
                    C && J.push(C)
                }
            }
            if (J.length === 1) throw J[0];
            for (let S = 0; S < J.length; S++) {
                let te = J[S];
                e.nativeScheduleMicroTask(() => {
                    throw te
                })
            }
        }
    }
    let N = function(x) {
            return T(this, x, !1)
        },
        z = function(x) {
            return T(this, x, !0)
        };

    function re(x, w) {
        if (!x) return !1;
        let Z = !0;
        w && w.useG !== void 0 && (Z = w.useG);
        let X = w && w.vh,
            ae = !0;
        w && w.chkDup !== void 0 && (ae = w.chkDup);
        let J = !1;
        w && w.rt !== void 0 && (J = w.rt);
        let S = x;
        for (; S && !S.hasOwnProperty(i);) S = yn(S);
        if (!S && x[i] && (S = x), !S || S[u]) return !1;
        let te = w && w.eventNameToString,
            C = {},
            k = S[u] = S[i],
            P = S[V(o)] = S[o],
            M = S[V(a)] = S[a],
            ce = S[V(s)] = S[s],
            ne;
        w && w.prepend && (ne = S[V(w.prepend)] = S[w.prepend]);

        function L(c, m) {
            return !dt && typeof c == "object" && c ? !!c.capture : !dt || !m ? c : typeof c == "boolean" ? {
                capture: c,
                passive: !0
            } : c ? typeof c == "object" && c.passive !== !1 ? { ...c,
                passive: !0
            } : c : {
                passive: !0
            }
        }
        let v = function(c) {
                if (!C.isExisting) return k.call(C.target, C.eventName, C.capture ? z : N, C.options)
            },
            f = function(c) {
                if (!c.isRemoved) {
                    let m = de[c.eventName],
                        O;
                    m && (O = m[c.capture ? Me : Ce]);
                    let B = O && c.target[O];
                    if (B) {
                        for (let A = 0; A < B.length; A++)
                            if (B[A] === c) {
                                B.splice(A, 1), c.isRemoved = !0, c.removeAbortListener && (c.removeAbortListener(), c.removeAbortListener = null), B.length === 0 && (c.allRemoved = !0, c.target[O] = null);
                                break
                            }
                    }
                }
                if (c.allRemoved) return P.call(c.target, c.eventName, c.capture ? z : N, c.options)
            },
            l = function(c) {
                return k.call(C.target, C.eventName, c.invoke, C.options)
            },
            R = function(c) {
                return ne.call(C.target, C.eventName, c.invoke, C.options)
            },
            I = function(c) {
                return P.call(c.target, c.eventName, c.invoke, c.options)
            },
            ie = Z ? v : l,
            H = Z ? f : I,
            $e = function(c, m) {
                let O = typeof m;
                return O === "function" && c.callback === m || O === "object" && c.originalDelegate === m
            },
            Be = w && w.diff ? w.diff : $e,
            Ne = Zone[V("UNPATCHED_EVENTS")],
            Ee = t[V("PASSIVE_EVENTS")];

        function b(c) {
            if (typeof c == "object" && c !== null) {
                let m = { ...c
                };
                return c.signal && (m.signal = c.signal), m
            }
            return c
        }
        let g = function(c, m, O, B, A = !1, D = !1) {
            return function() {
                let j = this || t,
                    F = arguments[0];
                w && w.transferEventName && (F = w.transferEventName(F));
                let Q = arguments[1];
                if (!Q) return c.apply(this, arguments);
                if (ur && F === "uncaughtException") return c.apply(this, arguments);
                let ee = !1;
                if (typeof Q != "function") {
                    if (!Q.handleEvent) return c.apply(this, arguments);
                    ee = !0
                }
                if (X && !X(c, Q, j, arguments)) return;
                let We = dt && !!Ee && Ee.indexOf(F) !== -1,
                    Te = b(L(arguments[2], We)),
                    ct = Te ? .signal;
                if (ct ? .aborted) return;
                if (Ne) {
                    for (let Se = 0; Se < Ne.length; Se++)
                        if (F === Ne[Se]) return We ? c.call(j, F, Q, Te) : c.apply(this, arguments)
                }
                let un = Te ? typeof Te == "boolean" ? !0 : Te.capture : !1,
                    Gi = Te && typeof Te == "object" ? Te.once : !1,
                    Nf = Zone.current,
                    fn = de[F];
                fn || (fo(F, te), fn = de[F]);
                let Zi = fn[un ? Me : Ce],
                    ht = j[Zi],
                    Vi = !1;
                if (ht) {
                    if (Vi = !0, ae) {
                        for (let Se = 0; Se < ht.length; Se++)
                            if (Be(ht[Se], Q)) return
                    }
                } else ht = j[Zi] = [];
                let ir, zi = j.constructor.name,
                    Yi = ao[zi];
                Yi && (ir = Yi[F]), ir || (ir = zi + m + (te ? te(F) : F)), C.options = Te, Gi && (C.options.once = !1), C.target = j, C.capture = un, C.eventName = F, C.isExisting = Vi;
                let Dt = Z ? Hf : void 0;
                Dt && (Dt.taskData = C), ct && (C.options.signal = void 0);
                let we = Nf.scheduleEventTask(ir, Q, Dt, O, B);
                if (ct) {
                    C.options.signal = ct;
                    let Se = () => we.zone.cancelTask(we);
                    c.call(ct, "abort", Se, {
                        once: !0
                    }), we.removeAbortListener = () => ct.removeEventListener("abort", Se)
                }
                if (C.target = null, Dt && (Dt.taskData = null), Gi && (C.options.once = !0), !dt && typeof we.options == "boolean" || (we.options = Te), we.target = j, we.capture = un, we.eventName = F, ee && (we.originalDelegate = Q), D ? ht.unshift(we) : ht.push(we), A) return j
            }
        };
        return S[i] = g(k, d, ie, H, J), ne && (S[h] = g(ne, y, R, H, J, !0)), S[o] = function() {
            let c = this || t,
                m = arguments[0];
            w && w.transferEventName && (m = w.transferEventName(m));
            let O = arguments[2],
                B = O ? typeof O == "boolean" ? !0 : O.capture : !1,
                A = arguments[1];
            if (!A) return P.apply(this, arguments);
            if (X && !X(P, A, c, arguments)) return;
            let D = de[m],
                j;
            D && (j = D[B ? Me : Ce]);
            let F = j && c[j];
            if (F)
                for (let Q = 0; Q < F.length; Q++) {
                    let ee = F[Q];
                    if (Be(ee, A)) {
                        if (F.splice(Q, 1), ee.isRemoved = !0, F.length === 0 && (ee.allRemoved = !0, c[j] = null, !B && typeof m == "string")) {
                            let We = Ut + "ON_PROPERTY" + m;
                            c[We] = null
                        }
                        return ee.zone.cancelTask(ee), J ? c : void 0
                    }
                }
            return P.apply(this, arguments)
        }, S[a] = function() {
            let c = this || t,
                m = arguments[0];
            w && w.transferEventName && (m = w.transferEventName(m));
            let O = [],
                B = lo(c, te ? te(m) : m);
            for (let A = 0; A < B.length; A++) {
                let D = B[A],
                    j = D.originalDelegate ? D.originalDelegate : D.callback;
                O.push(j)
            }
            return O
        }, S[s] = function() {
            let c = this || t,
                m = arguments[0];
            if (m) {
                w && w.transferEventName && (m = w.transferEventName(m));
                let O = de[m];
                if (O) {
                    let B = O[Ce],
                        A = O[Me],
                        D = c[B],
                        j = c[A];
                    if (D) {
                        let F = D.slice();
                        for (let Q = 0; Q < F.length; Q++) {
                            let ee = F[Q],
                                We = ee.originalDelegate ? ee.originalDelegate : ee.callback;
                            this[o].call(this, m, We, ee.options)
                        }
                    }
                    if (j) {
                        let F = j.slice();
                        for (let Q = 0; Q < F.length; Q++) {
                            let ee = F[Q],
                                We = ee.originalDelegate ? ee.originalDelegate : ee.callback;
                            this[o].call(this, m, We, ee.options)
                        }
                    }
                }
            } else {
                let O = Object.keys(c);
                for (let B = 0; B < O.length; B++) {
                    let A = O[B],
                        D = so.exec(A),
                        j = D && D[1];
                    j && j !== "removeListener" && this[s].call(this, j)
                }
                this[s].call(this, "removeListener")
            }
            if (J) return this
        }, De(S[i], k), De(S[o], P), ce && De(S[s], ce), M && De(S[a], M), !0
    }
    let Y = [];
    for (let x = 0; x < r.length; x++) Y[x] = re(r[x], n);
    return Y
}

function lo(t, e) {
    if (!e) {
        let o = [];
        for (let a in t) {
            let s = so.exec(a),
                u = s && s[1];
            if (u && (!e || u === e)) {
                let d = t[a];
                if (d)
                    for (let h = 0; h < d.length; h++) o.push(d[h])
            }
        }
        return o
    }
    let r = de[e];
    r || (fo(e), r = de[e]);
    let n = t[r[Ce]],
        i = t[r[Me]];
    return n ? i ? n.concat(i) : n.slice() : i ? i.slice() : []
}

function Zf(t, e) {
    let r = t.Event;
    r && r.prototype && e.patchMethod(r.prototype, "stopImmediatePropagation", n => function(i, o) {
        i[uo] = !0, n && n.apply(i, o)
    })
}

function Vf(t, e) {
    e.patchMethod(t, "queueMicrotask", r => function(n, i) {
        Zone.current.scheduleMicroTask("queueMicrotask", i[0])
    })
}
var or = V("zoneTask");

function pt(t, e, r, n) {
    let i = null,
        o = null;
    e += n, r += n;
    let a = {};

    function s(d) {
        let h = d.data;
        h.args[0] = function() {
            return d.invoke.apply(this, arguments)
        };
        let y = i.apply(t, h.args);
        return eo(y) ? h.handleId = y : (h.handle = y, h.isRefreshable = Qi(y.refresh)), d
    }

    function u(d) {
        let {
            handle: h,
            handleId: y
        } = d.data;
        return o.call(t, h ? ? y)
    }
    i = Le(t, e, d => function(h, y) {
        if (Qi(y[0])) {
            let _ = {
                    isRefreshable: !1,
                    isPeriodic: n === "Interval",
                    delay: n === "Timeout" || n === "Interval" ? y[1] || 0 : void 0,
                    args: y
                },
                T = y[0];
            y[0] = function() {
                try {
                    return T.apply(this, arguments)
                } finally {
                    let {
                        handle: Z,
                        handleId: X,
                        isPeriodic: ae,
                        isRefreshable: J
                    } = _;
                    !ae && !J && (X ? delete a[X] : Z && (Z[or] = null))
                }
            };
            let N = En(e, y[0], _, s, u);
            if (!N) return N;
            let {
                handleId: z,
                handle: re,
                isRefreshable: Y,
                isPeriodic: x
            } = N.data;
            if (z) a[z] = N;
            else if (re && (re[or] = N, Y && !x)) {
                let w = re.refresh;
                re.refresh = function() {
                    let {
                        zone: Z,
                        state: X
                    } = N;
                    return X === "notScheduled" ? (N._state = "scheduled", Z._updateTaskCount(N, 1)) : X === "running" && (N._state = "scheduling"), w.call(this)
                }
            }
            return re ? ? z ? ? N
        } else return d.apply(t, y)
    }), o = Le(t, r, d => function(h, y) {
        let _ = y[0],
            T;
        eo(_) ? (T = a[_], delete a[_]) : (T = _ ? .[or], T ? _[or] = null : T = _), T ? .type ? T.cancelFn && T.zone.cancelTask(T) : d.apply(t, y)
    })
}

function zf(t, e) {
    let {
        isBrowser: r,
        isMix: n
    } = e.getGlobalObjects();
    if (!r && !n || !t.customElements || !("customElements" in t)) return;
    let i = ["connectedCallback", "disconnectedCallback", "adoptedCallback", "attributeChangedCallback", "formAssociatedCallback", "formDisabledCallback", "formResetCallback", "formStateRestoreCallback"];
    e.patchCallbacks(e, t.customElements, "customElements", "define", i)
}

function Yf(t, e) {
    if (Zone[e.symbol("patchEventTarget")]) return;
    let {
        eventNames: r,
        zoneSymbolEventNames: n,
        TRUE_STR: i,
        FALSE_STR: o,
        ZONE_SYMBOL_PREFIX: a
    } = e.getGlobalObjects();
    for (let u = 0; u < r.length; u++) {
        let d = r[u],
            h = d + o,
            y = d + i,
            _ = a + h,
            T = a + y;
        n[d] = {}, n[d][o] = _, n[d][i] = T
    }
    let s = t.EventTarget;
    if (!(!s || !s.prototype)) return e.patchEventTarget(t, e, [s && s.prototype]), !0
}

function Xf(t, e) {
    e.patchEventPrototype(t, e)
}

function co(t, e, r) {
    if (!r || r.length === 0) return e;
    let n = r.filter(o => o.target === t);
    if (!n || n.length === 0) return e;
    let i = n[0].ignoreProperties;
    return e.filter(o => i.indexOf(o) === -1)
}

function to(t, e, r, n) {
    if (!t) return;
    let i = co(t, e, r);
    oo(t, i, n)
}

function pn(t) {
    return Object.getOwnPropertyNames(t).filter(e => e.startsWith("on") && e.length > 2).map(e => e.substring(2))
}

function Kf(t, e) {
    if (ur && !io || Zone[t.symbol("patchEvents")]) return;
    let r = e.__Zone_ignore_on_properties,
        n = [];
    if (_n) {
        let i = window;
        n = n.concat(["Document", "SVGElement", "Element", "HTMLElement", "HTMLBodyElement", "HTMLMediaElement", "HTMLFrameSetElement", "HTMLFrameElement", "HTMLIFrameElement", "HTMLMarqueeElement", "Worker"]);
        let o = $f() ? [{
            target: i,
            ignoreProperties: ["error"]
        }] : [];
        to(i, pn(i), r && r.concat(o), yn(i))
    }
    n = n.concat(["XMLHttpRequest", "XMLHttpRequestEventTarget", "IDBIndex", "IDBRequest", "IDBOpenDBRequest", "IDBDatabase", "IDBTransaction", "IDBCursor", "WebSocket"]);
    for (let i = 0; i < n.length; i++) {
        let o = e[n[i]];
        o && o.prototype && to(o.prototype, pn(o.prototype), r)
    }
}

function Jf(t) {
    t.__load_patch("legacy", e => {
        let r = e[t.__symbol__("legacyPatch")];
        r && r()
    }), t.__load_patch("timers", e => {
        let r = "set",
            n = "clear";
        pt(e, r, n, "Timeout"), pt(e, r, n, "Interval"), pt(e, r, n, "Immediate")
    }), t.__load_patch("requestAnimationFrame", e => {
        pt(e, "request", "cancel", "AnimationFrame"), pt(e, "mozRequest", "mozCancel", "AnimationFrame"), pt(e, "webkitRequest", "webkitCancel", "AnimationFrame")
    }), t.__load_patch("blocking", (e, r) => {
        let n = ["alert", "prompt", "confirm"];
        for (let i = 0; i < n.length; i++) {
            let o = n[i];
            Le(e, o, (a, s, u) => function(d, h) {
                return r.current.run(a, e, h, u)
            })
        }
    }), t.__load_patch("EventTarget", (e, r, n) => {
        Xf(e, n), Yf(e, n);
        let i = e.XMLHttpRequestEventTarget;
        i && i.prototype && n.patchEventTarget(e, n, [i.prototype])
    }), t.__load_patch("MutationObserver", (e, r, n) => {
        jt("MutationObserver"), jt("WebKitMutationObserver")
    }), t.__load_patch("IntersectionObserver", (e, r, n) => {
        jt("IntersectionObserver")
    }), t.__load_patch("FileReader", (e, r, n) => {
        jt("FileReader")
    }), t.__load_patch("on_property", (e, r, n) => {
        Kf(n, e)
    }), t.__load_patch("customElements", (e, r, n) => {
        zf(e, n)
    }), t.__load_patch("XHR", (e, r) => {
        d(e);
        let n = V("xhrTask"),
            i = V("xhrSync"),
            o = V("xhrListener"),
            a = V("xhrScheduled"),
            s = V("xhrURL"),
            u = V("xhrErrorBeforeScheduled");

        function d(h) {
            let y = h.XMLHttpRequest;
            if (!y) return;
            let _ = y.prototype;

            function T(k) {
                return k[n]
            }
            let N = _[ln],
                z = _[cn];
            if (!N) {
                let k = h.XMLHttpRequestEventTarget;
                if (k) {
                    let P = k.prototype;
                    N = P[ln], z = P[cn]
                }
            }
            let re = "readystatechange",
                Y = "scheduled";

            function x(k) {
                let P = k.data,
                    M = P.target;
                M[a] = !1, M[u] = !1;
                let ce = M[o];
                N || (N = M[ln], z = M[cn]), ce && z.call(M, re, ce);
                let ne = M[o] = () => {
                    if (M.readyState === M.DONE)
                        if (!P.aborted && M[a] && k.state === Y) {
                            let v = M[r.__symbol__("loadfalse")];
                            if (M.status !== 0 && v && v.length > 0) {
                                let f = k.invoke;
                                k.invoke = function() {
                                    let l = M[r.__symbol__("loadfalse")];
                                    for (let R = 0; R < l.length; R++) l[R] === k && l.splice(R, 1);
                                    !P.aborted && k.state === Y && f.call(k)
                                }, v.push(k)
                            } else k.invoke()
                        } else !P.aborted && M[a] === !1 && (M[u] = !0)
                };
                return N.call(M, re, ne), M[n] || (M[n] = k), te.apply(M, P.args), M[a] = !0, k
            }

            function w() {}

            function Z(k) {
                let P = k.data;
                return P.aborted = !0, C.apply(P.target, P.args)
            }
            let X = Le(_, "open", () => function(k, P) {
                    return k[i] = P[2] == !1, k[s] = P[1], X.apply(k, P)
                }),
                ae = "XMLHttpRequest.send",
                J = V("fetchTaskAborting"),
                S = V("fetchTaskScheduling"),
                te = Le(_, "send", () => function(k, P) {
                    if (r.current[S] === !0 || k[i]) return te.apply(k, P); {
                        let M = {
                                target: k,
                                url: k[s],
                                isPeriodic: !1,
                                args: P,
                                aborted: !1
                            },
                            ce = En(ae, w, M, x, Z);
                        k && k[u] === !0 && !M.aborted && ce.state === Y && ce.invoke()
                    }
                }),
                C = Le(_, "abort", () => function(k, P) {
                    let M = T(k);
                    if (M && typeof M.type == "string") {
                        if (M.cancelFn == null || M.data && M.data.aborted) return;
                        M.zone.cancelTask(M)
                    } else if (r.current[J] === !0) return C.apply(k, P)
                })
        }
    }), t.__load_patch("geolocation", e => {
        e.navigator && e.navigator.geolocation && Ff(e.navigator.geolocation, ["getCurrentPosition", "watchPosition"])
    }), t.__load_patch("PromiseRejectionEvent", (e, r) => {
        function n(i) {
            return function(o) {
                lo(e, i).forEach(s => {
                    let u = e.PromiseRejectionEvent;
                    if (u) {
                        let d = new u(i, {
                            promise: o.promise,
                            reason: o.rejection
                        });
                        s.invoke(d)
                    }
                })
            }
        }
        e.PromiseRejectionEvent && (r[V("unhandledPromiseRejectionHandler")] = n("unhandledrejection"), r[V("rejectionHandledHandler")] = n("rejectionhandled"))
    }), t.__load_patch("queueMicrotask", (e, r, n) => {
        Vf(e, n)
    })
}

function Qf(t) {
    t.__load_patch("ZoneAwarePromise", (e, r, n) => {
        let i = Object.getOwnPropertyDescriptor,
            o = Object.defineProperty;

        function a(b) {
            if (b && b.toString === Object.prototype.toString) {
                let g = b.constructor && b.constructor.name;
                return (g || "") + ": " + JSON.stringify(b)
            }
            return b ? b.toString() : Object.prototype.toString.call(b)
        }
        let s = n.symbol,
            u = [],
            d = e[s("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")] !== !1,
            h = s("Promise"),
            y = s("then"),
            _ = "__creationTrace__";
        n.onUnhandledError = b => {
            if (n.showUncaughtError()) {
                let g = b && b.rejection;
                g ? console.error("Unhandled Promise rejection:", g instanceof Error ? g.message : g, "; Zone:", b.zone.name, "; Task:", b.task && b.task.source, "; Value:", g, g instanceof Error ? g.stack : void 0) : console.error(b)
            }
        }, n.microtaskDrainDone = () => {
            for (; u.length;) {
                let b = u.shift();
                try {
                    b.zone.runGuarded(() => {
                        throw b.throwOriginal ? b.rejection : b
                    })
                } catch (g) {
                    N(g)
                }
            }
        };
        let T = s("unhandledPromiseRejectionHandler");

        function N(b) {
            n.onUnhandledError(b);
            try {
                let g = r[T];
                typeof g == "function" && g.call(this, b)
            } catch {}
        }

        function z(b) {
            return b && b.then
        }

        function re(b) {
            return b
        }

        function Y(b) {
            return H.reject(b)
        }
        let x = s("state"),
            w = s("value"),
            Z = s("finally"),
            X = s("parentPromiseValue"),
            ae = s("parentPromiseState"),
            J = "Promise.then",
            S = null,
            te = !0,
            C = !1,
            k = 0;

        function P(b, g) {
            return c => {
                try {
                    L(b, g, c)
                } catch (m) {
                    L(b, !1, m)
                }
            }
        }
        let M = function() {
                let b = !1;
                return function(c) {
                    return function() {
                        b || (b = !0, c.apply(null, arguments))
                    }
                }
            },
            ce = "Promise resolved with itself",
            ne = s("currentTaskTrace");

        function L(b, g, c) {
            let m = M();
            if (b === c) throw new TypeError(ce);
            if (b[x] === S) {
                let O = null;
                try {
                    (typeof c == "object" || typeof c == "function") && (O = c && c.then)
                } catch (B) {
                    return m(() => {
                        L(b, !1, B)
                    })(), b
                }
                if (g !== C && c instanceof H && c.hasOwnProperty(x) && c.hasOwnProperty(w) && c[x] !== S) f(c), L(b, c[x], c[w]);
                else if (g !== C && typeof O == "function") try {
                    O.call(c, m(P(b, g)), m(P(b, !1)))
                } catch (B) {
                    m(() => {
                        L(b, !1, B)
                    })()
                } else {
                    b[x] = g;
                    let B = b[w];
                    if (b[w] = c, b[Z] === Z && g === te && (b[x] = b[ae], b[w] = b[X]), g === C && c instanceof Error) {
                        let A = r.currentTask && r.currentTask.data && r.currentTask.data[_];
                        A && o(c, ne, {
                            configurable: !0,
                            enumerable: !1,
                            writable: !0,
                            value: A
                        })
                    }
                    for (let A = 0; A < B.length;) l(b, B[A++], B[A++], B[A++], B[A++]);
                    if (B.length == 0 && g == C) {
                        b[x] = k;
                        let A = c;
                        try {
                            throw new Error("Uncaught (in promise): " + a(c) + (c && c.stack ? `
` + c.stack : ""))
                        } catch (D) {
                            A = D
                        }
                        d && (A.throwOriginal = !0), A.rejection = c, A.promise = b, A.zone = r.current, A.task = r.currentTask, u.push(A), n.scheduleMicroTask()
                    }
                }
            }
            return b
        }
        let v = s("rejectionHandledHandler");

        function f(b) {
            if (b[x] === k) {
                try {
                    let g = r[v];
                    g && typeof g == "function" && g.call(this, {
                        rejection: b[w],
                        promise: b
                    })
                } catch {}
                b[x] = C;
                for (let g = 0; g < u.length; g++) b === u[g].promise && u.splice(g, 1)
            }
        }

        function l(b, g, c, m, O) {
            f(b);
            let B = b[x],
                A = B ? typeof m == "function" ? m : re : typeof O == "function" ? O : Y;
            g.scheduleMicroTask(J, () => {
                try {
                    let D = b[w],
                        j = !!c && Z === c[Z];
                    j && (c[X] = D, c[ae] = B);
                    let F = g.run(A, void 0, j && A !== Y && A !== re ? [] : [D]);
                    L(c, !0, F)
                } catch (D) {
                    L(c, !1, D)
                }
            }, c)
        }
        let R = "function ZoneAwarePromise() { [native code] }",
            I = function() {},
            ie = e.AggregateError;
        class H {
            static toString() {
                return R
            }
            static resolve(g) {
                return g instanceof H ? g : L(new this(null), te, g)
            }
            static reject(g) {
                return L(new this(null), C, g)
            }
            static withResolvers() {
                let g = {};
                return g.promise = new H((c, m) => {
                    g.resolve = c, g.reject = m
                }), g
            }
            static any(g) {
                if (!g || typeof g[Symbol.iterator] != "function") return Promise.reject(new ie([], "All promises were rejected"));
                let c = [],
                    m = 0;
                try {
                    for (let A of g) m++, c.push(H.resolve(A))
                } catch {
                    return Promise.reject(new ie([], "All promises were rejected"))
                }
                if (m === 0) return Promise.reject(new ie([], "All promises were rejected"));
                let O = !1,
                    B = [];
                return new H((A, D) => {
                    for (let j = 0; j < c.length; j++) c[j].then(F => {
                        O || (O = !0, A(F))
                    }, F => {
                        B.push(F), m--, m === 0 && (O = !0, D(new ie(B, "All promises were rejected")))
                    })
                })
            }
            static race(g) {
                let c, m, O = new this((D, j) => {
                    c = D, m = j
                });

                function B(D) {
                    c(D)
                }

                function A(D) {
                    m(D)
                }
                for (let D of g) z(D) || (D = this.resolve(D)), D.then(B, A);
                return O
            }
            static all(g) {
                return H.allWithCallback(g)
            }
            static allSettled(g) {
                return (this && this.prototype instanceof H ? this : H).allWithCallback(g, {
                    thenCallback: m => ({
                        status: "fulfilled",
                        value: m
                    }),
                    errorCallback: m => ({
                        status: "rejected",
                        reason: m
                    })
                })
            }
            static allWithCallback(g, c) {
                let m, O, B = new this((F, Q) => {
                        m = F, O = Q
                    }),
                    A = 2,
                    D = 0,
                    j = [];
                for (let F of g) {
                    z(F) || (F = this.resolve(F));
                    let Q = D;
                    try {
                        F.then(ee => {
                            j[Q] = c ? c.thenCallback(ee) : ee, A--, A === 0 && m(j)
                        }, ee => {
                            c ? (j[Q] = c.errorCallback(ee), A--, A === 0 && m(j)) : O(ee)
                        })
                    } catch (ee) {
                        O(ee)
                    }
                    A++, D++
                }
                return A -= 2, A === 0 && m(j), B
            }
            constructor(g) {
                let c = this;
                if (!(c instanceof H)) throw new Error("Must be an instanceof Promise.");
                c[x] = S, c[w] = [];
                try {
                    let m = M();
                    g && g(m(P(c, te)), m(P(c, C)))
                } catch (m) {
                    L(c, !1, m)
                }
            }
            get[Symbol.toStringTag]() {
                return "Promise"
            }
            get[Symbol.species]() {
                return H
            }
            then(g, c) {
                let m = this.constructor ? .[Symbol.species];
                (!m || typeof m != "function") && (m = this.constructor || H);
                let O = new m(I),
                    B = r.current;
                return this[x] == S ? this[w].push(B, O, g, c) : l(this, B, O, g, c), O
            } catch (g) {
                return this.then(null, g)
            } finally(g) {
                let c = this.constructor ? .[Symbol.species];
                (!c || typeof c != "function") && (c = H);
                let m = new c(I);
                m[Z] = Z;
                let O = r.current;
                return this[x] == S ? this[w].push(O, m, g, g) : l(this, O, m, g, g), m
            }
        }
        H.resolve = H.resolve, H.reject = H.reject, H.race = H.race, H.all = H.all;
        let $e = e[h] = e.Promise;
        e.Promise = H;
        let Be = s("thenPatched");

        function Ne(b) {
            let g = b.prototype,
                c = i(g, "then");
            if (c && (c.writable === !1 || !c.configurable)) return;
            let m = g.then;
            g[y] = m, b.prototype.then = function(O, B) {
                return new H((D, j) => {
                    m.call(this, D, j)
                }).then(O, B)
            }, b[Be] = !0
        }
        n.patchThen = Ne;

        function Ee(b) {
            return function(g, c) {
                let m = b.apply(g, c);
                if (m instanceof H) return m;
                let O = m.constructor;
                return O[Be] || Ne(O), m
            }
        }
        return $e && (Ne($e), Le(e, "fetch", b => Ee(b))), Promise[r.__symbol__("uncaughtPromiseErrors")] = u, H
    })
}

function el(t) {
    t.__load_patch("toString", e => {
        let r = Function.prototype.toString,
            n = V("OriginalDelegate"),
            i = V("Promise"),
            o = V("Error"),
            a = function() {
                if (typeof this == "function") {
                    let h = this[n];
                    if (h) return typeof h == "function" ? r.call(h) : Object.prototype.toString.call(h);
                    if (this === Promise) {
                        let y = e[i];
                        if (y) return r.call(y)
                    }
                    if (this === Error) {
                        let y = e[o];
                        if (y) return r.call(y)
                    }
                }
                return r.call(this)
            };
        a[n] = r, Function.prototype.toString = a;
        let s = Object.prototype.toString,
            u = "[object Promise]";
        Object.prototype.toString = function() {
            return typeof Promise == "function" && this instanceof Promise ? u : s.call(this)
        }
    })
}

function tl(t, e, r, n, i) {
    let o = Zone.__symbol__(n);
    if (e[o]) return;
    let a = e[o] = e[n];
    e[n] = function(s, u, d) {
        return u && u.prototype && i.forEach(function(h) {
            let y = `${r}.${n}::` + h,
                _ = u.prototype;
            try {
                if (_.hasOwnProperty(h)) {
                    let T = t.ObjectGetOwnPropertyDescriptor(_, h);
                    T && T.value ? (T.value = t.wrapWithCurrentZone(T.value, y), t._redefineProperty(u.prototype, h, T)) : _[h] && (_[h] = t.wrapWithCurrentZone(_[h], y))
                } else _[h] && (_[h] = t.wrapWithCurrentZone(_[h], y))
            } catch {}
        }), a.call(e, s, u, d)
    }, t.attachOriginToPatched(e[n], a)
}

function rl(t) {
    t.__load_patch("util", (e, r, n) => {
        let i = pn(e);
        n.patchOnProperties = oo, n.patchMethod = Le, n.bindArguments = wn, n.patchMacroTask = qf;
        let o = r.__symbol__("BLACK_LISTED_EVENTS"),
            a = r.__symbol__("UNPATCHED_EVENTS");
        e[a] && (e[o] = e[a]), e[o] && (r[o] = r[a] = e[o]), n.patchEventPrototype = Zf, n.patchEventTarget = Gf, n.isIEOrEdge = Wf, n.ObjectDefineProperty = dn, n.ObjectGetOwnPropertyDescriptor = Ft, n.ObjectCreate = Lf, n.ArraySlice = Df, n.patchClass = jt, n.wrapWithCurrentZone = bn, n.filterProperties = co, n.attachOriginToPatched = De, n._redefineProperty = Object.defineProperty, n.patchCallbacks = tl, n.getGlobalObjects = () => ({
            globalSources: ao,
            zoneSymbolEventNames: de,
            eventNames: i,
            isBrowser: _n,
            isMix: io,
            isNode: ur,
            TRUE_STR: Me,
            FALSE_STR: Ce,
            ZONE_SYMBOL_PREFIX: Ut,
            ADD_EVENT_LISTENER_STR: gn,
            REMOVE_EVENT_LISTENER_STR: mn
        })
    })
}

function nl(t) {
    Qf(t), el(t), rl(t)
}
var ho = Cf();
nl(ho);
Jf(ho);
window.global = window;
global.Buffer = global.Buffer || Qe().Buffer;
window.Buffer = window.Buffer || Qe().Buffer;
global.process = jo();
window.stream = Hi();
window.stream.Transform = window.stream.Transform || Hi().Transform;
var Ry = ":";

function xy(t, e) {
    for (let r = 1, n = 1; r < t.length; r++, n++)
        if (e[n] === "\\") n++;
        else if (t[r] === Ry) return r;
    throw new Error(`Unterminated $localize metadata block in "${e}".`)
}
var sn = function(t, ...e) {
        if (sn.translate) {
            let n = sn.translate(t, e);
            t = n[0], e = n[1]
        }
        let r = Bf(t[0], t.raw[0]);
        for (let n = 1; n < t.length; n++) r += e[n - 1] + Bf(t[n], t.raw[n]);
        return r
    },
    Oy = ":";

function Bf(t, e) {
    return e.charAt(0) === Oy ? t.substring(xy(t, e) + 1) : t
}
globalThis.$localize = sn;