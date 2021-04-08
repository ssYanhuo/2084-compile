!function (t) {
    var n = {};

    function e(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {i: r, l: !1, exports: {}};
        return t[r].call(o.exports, o, o.exports, e), o.l = !0, o.exports
    }

    e.m = t, e.c = n, e.d = function (t, n, r) {
        e.o(t, n) || Object.defineProperty(t, n, {enumerable: !0, get: r})
    }, e.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
    }, e.t = function (t, n) {
        if (1 & n && (t = e(t)), 8 & n) return t;
        if (4 & n && "object" == typeof t && t && t.__esModule) return t;
        var r = Object.create(null);
        if (e.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: t
        }), 2 & n && "string" != typeof t) for (var o in t) e.d(r, o, function (n) {
            return t[n]
        }.bind(null, o));
        return r
    }, e.n = function (t) {
        var n = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return e.d(n, "a", n), n
    }, e.o = function (t, n) {
        return Object.prototype.hasOwnProperty.call(t, n)
    }, e.p = "", e(e.s = 7)
}({
    7: function (t, n) {
        n.run = function (t, n, e) {
            const {state_map: r, transition_map: o} = t;
            let i = new Set, u = new Set;
            p(i, r.get(t.start));
            // eslint-disable-next-line no-unused-vars
            let a, s = 0, f = n.length;

            function c() {
                e({step: s, current_states: i, next_states: u, next_char: n[s]}, s < f ? l : null)
            }

            function l() {
                !function (t) {
                    u.clear(), i.forEach(n => {
                        if (1 !== n.transitions.length) return;
                        let e = o.get(n.transitions[0]);
                        e.input === t && p(u, r.get(e.to))
                    })
                }(a = n[s]);
                let t = i;
                i = u, u = t, s++, c()
            }

            function p(t, n) {
                n && !t.has(n) && (!function (t) {
                    return !!t && !t.input
                }(o.get(n.transitions[0])) ? t.add(n) : (p(t, g(n.transitions[0])), p(t, g(n.transitions[1]))))
            }

            function g(t) {
                return void 0 === t ? null : r.get(o.get(t).to)
            }

            c();
            for (let t of i) if (0 === t.transitions.length) return !0;
            return !1
        }, n.runWithBacktrack = function (t, n) {
            const {state_map: e, transition_map: r} = t, o = [];
            let i = 0, u = e.get(t.start), a = r.get(u.transitions[0]);
            const s = 1, f = -1, c = 0;
            for (; ;) {
                let t = l();
                if (t === f) {
                    if (p() === c) break
                } else if (t === c) break
            }

            function l() {
                return a ? a.input ? a.input === n[i] ? (i++, o.push(a), u = e.get(a.to), i === n.length ? c : (a = r.get(u.transitions[0]), s)) : f : (o.push(a), u = e.get(a.to), a = r.get(u.transitions[0]), s) : f
            }

            function p() {
                if (!u) return c;
                const t = u.transitions[1];
                // eslint-disable-next-line no-cond-assign
                return void 0 === t || t === a.id ? (a = o.pop()) ? (a.input && i--, u = e.get(a.from), p()) : (u = null, c) : (a = r.get(t), s)
            }

            const g = new Set;
            !function t(n) {
                if (!n) return;
                if (g.has(n)) return;
                g.add(n);
                n.transitions.forEach(n => {
                    let o = r.get(n);
                    "" === o.input && t(e.get(o.to))
                })
            }(u);
            let d = !1;
            return g.forEach(t => {
                0 === t.transitions.length && (d = !0)
            }), d
        }
    }
});