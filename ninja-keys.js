// ██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗
// ██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝
// ██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║
// ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║
// ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║
// ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝

// node_modules/@lit/reactive-element/css-tag.js
var t = window;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = /* @__PURE__ */ Symbol();
var n = /* @__PURE__ */ new WeakMap();
var o = class {
  constructor(t5, e11, n9) {
    if (this._$cssResult$ = true, n9 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t5, this.t = e11;
  }
  get styleSheet() {
    let t5 = this.o;
    const s7 = this.t;
    if (e && void 0 === t5) {
      const e11 = void 0 !== s7 && 1 === s7.length;
      e11 && (t5 = n.get(s7)), void 0 === t5 && ((this.o = t5 = new CSSStyleSheet()).replaceSync(this.cssText), e11 && n.set(s7, t5));
    }
    return t5;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t5) => new o("string" == typeof t5 ? t5 : t5 + "", void 0, s);
var i = (t5, ...e11) => {
  const n9 = 1 === t5.length ? t5[0] : e11.reduce(((e12, s7, n10) => e12 + ((t6) => {
    if (true === t6._$cssResult$) return t6.cssText;
    if ("number" == typeof t6) return t6;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t6 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s7) + t5[n10 + 1]), t5[0]);
  return new o(n9, t5, s);
};
var S = (s7, n9) => {
  e ? s7.adoptedStyleSheets = n9.map(((t5) => t5 instanceof CSSStyleSheet ? t5 : t5.styleSheet)) : n9.forEach(((e11) => {
    const n10 = document.createElement("style"), o11 = t.litNonce;
    void 0 !== o11 && n10.setAttribute("nonce", o11), n10.textContent = e11.cssText, s7.appendChild(n10);
  }));
};
var c = e ? (t5) => t5 : (t5) => t5 instanceof CSSStyleSheet ? ((t6) => {
  let e11 = "";
  for (const s7 of t6.cssRules) e11 += s7.cssText;
  return r(e11);
})(t5) : t5;

// node_modules/@lit/reactive-element/reactive-element.js
var s2;
var e2 = window;
var r2 = e2.trustedTypes;
var h = r2 ? r2.emptyScript : "";
var o2 = e2.reactiveElementPolyfillSupport;
var n2 = { toAttribute(t5, i5) {
  switch (i5) {
    case Boolean:
      t5 = t5 ? h : null;
      break;
    case Object:
    case Array:
      t5 = null == t5 ? t5 : JSON.stringify(t5);
  }
  return t5;
}, fromAttribute(t5, i5) {
  let s7 = t5;
  switch (i5) {
    case Boolean:
      s7 = null !== t5;
      break;
    case Number:
      s7 = null === t5 ? null : Number(t5);
      break;
    case Object:
    case Array:
      try {
        s7 = JSON.parse(t5);
      } catch (t6) {
        s7 = null;
      }
  }
  return s7;
} };
var a = (t5, i5) => i5 !== t5 && (i5 == i5 || t5 == t5);
var l = { attribute: true, type: String, converter: n2, reflect: false, hasChanged: a };
var d = "finalized";
var u = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this._$Eu();
  }
  static addInitializer(t5) {
    var i5;
    this.finalize(), (null !== (i5 = this.h) && void 0 !== i5 ? i5 : this.h = []).push(t5);
  }
  static get observedAttributes() {
    this.finalize();
    const t5 = [];
    return this.elementProperties.forEach(((i5, s7) => {
      const e11 = this._$Ep(s7, i5);
      void 0 !== e11 && (this._$Ev.set(e11, s7), t5.push(e11));
    })), t5;
  }
  static createProperty(t5, i5 = l) {
    if (i5.state && (i5.attribute = false), this.finalize(), this.elementProperties.set(t5, i5), !i5.noAccessor && !this.prototype.hasOwnProperty(t5)) {
      const s7 = "symbol" == typeof t5 ? /* @__PURE__ */ Symbol() : "__" + t5, e11 = this.getPropertyDescriptor(t5, s7, i5);
      void 0 !== e11 && Object.defineProperty(this.prototype, t5, e11);
    }
  }
  static getPropertyDescriptor(t5, i5, s7) {
    return { get() {
      return this[i5];
    }, set(e11) {
      const r6 = this[t5];
      this[i5] = e11, this.requestUpdate(t5, r6, s7);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t5) {
    return this.elementProperties.get(t5) || l;
  }
  static finalize() {
    if (this.hasOwnProperty(d)) return false;
    this[d] = true;
    const t5 = Object.getPrototypeOf(this);
    if (t5.finalize(), void 0 !== t5.h && (this.h = [...t5.h]), this.elementProperties = new Map(t5.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t6 = this.properties, i5 = [...Object.getOwnPropertyNames(t6), ...Object.getOwnPropertySymbols(t6)];
      for (const s7 of i5) this.createProperty(s7, t6[s7]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i5) {
    const s7 = [];
    if (Array.isArray(i5)) {
      const e11 = new Set(i5.flat(1 / 0).reverse());
      for (const i6 of e11) s7.unshift(c(i6));
    } else void 0 !== i5 && s7.push(c(i5));
    return s7;
  }
  static _$Ep(t5, i5) {
    const s7 = i5.attribute;
    return false === s7 ? void 0 : "string" == typeof s7 ? s7 : "string" == typeof t5 ? t5.toLowerCase() : void 0;
  }
  _$Eu() {
    var t5;
    this._$E_ = new Promise(((t6) => this.enableUpdating = t6)), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t5 = this.constructor.h) || void 0 === t5 || t5.forEach(((t6) => t6(this)));
  }
  addController(t5) {
    var i5, s7;
    (null !== (i5 = this._$ES) && void 0 !== i5 ? i5 : this._$ES = []).push(t5), void 0 !== this.renderRoot && this.isConnected && (null === (s7 = t5.hostConnected) || void 0 === s7 || s7.call(t5));
  }
  removeController(t5) {
    var i5;
    null === (i5 = this._$ES) || void 0 === i5 || i5.splice(this._$ES.indexOf(t5) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach(((t5, i5) => {
      this.hasOwnProperty(i5) && (this._$Ei.set(i5, this[i5]), delete this[i5]);
    }));
  }
  createRenderRoot() {
    var t5;
    const s7 = null !== (t5 = this.shadowRoot) && void 0 !== t5 ? t5 : this.attachShadow(this.constructor.shadowRootOptions);
    return S(s7, this.constructor.elementStyles), s7;
  }
  connectedCallback() {
    var t5;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t5 = this._$ES) || void 0 === t5 || t5.forEach(((t6) => {
      var i5;
      return null === (i5 = t6.hostConnected) || void 0 === i5 ? void 0 : i5.call(t6);
    }));
  }
  enableUpdating(t5) {
  }
  disconnectedCallback() {
    var t5;
    null === (t5 = this._$ES) || void 0 === t5 || t5.forEach(((t6) => {
      var i5;
      return null === (i5 = t6.hostDisconnected) || void 0 === i5 ? void 0 : i5.call(t6);
    }));
  }
  attributeChangedCallback(t5, i5, s7) {
    this._$AK(t5, s7);
  }
  _$EO(t5, i5, s7 = l) {
    var e11;
    const r6 = this.constructor._$Ep(t5, s7);
    if (void 0 !== r6 && true === s7.reflect) {
      const h5 = (void 0 !== (null === (e11 = s7.converter) || void 0 === e11 ? void 0 : e11.toAttribute) ? s7.converter : n2).toAttribute(i5, s7.type);
      this._$El = t5, null == h5 ? this.removeAttribute(r6) : this.setAttribute(r6, h5), this._$El = null;
    }
  }
  _$AK(t5, i5) {
    var s7;
    const e11 = this.constructor, r6 = e11._$Ev.get(t5);
    if (void 0 !== r6 && this._$El !== r6) {
      const t6 = e11.getPropertyOptions(r6), h5 = "function" == typeof t6.converter ? { fromAttribute: t6.converter } : void 0 !== (null === (s7 = t6.converter) || void 0 === s7 ? void 0 : s7.fromAttribute) ? t6.converter : n2;
      this._$El = r6, this[r6] = h5.fromAttribute(i5, t6.type), this._$El = null;
    }
  }
  requestUpdate(t5, i5, s7) {
    let e11 = true;
    void 0 !== t5 && (((s7 = s7 || this.constructor.getPropertyOptions(t5)).hasChanged || a)(this[t5], i5) ? (this._$AL.has(t5) || this._$AL.set(t5, i5), true === s7.reflect && this._$El !== t5 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t5, s7))) : e11 = false), !this.isUpdatePending && e11 && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (t6) {
      Promise.reject(t6);
    }
    const t5 = this.scheduleUpdate();
    return null != t5 && await t5, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t5;
    if (!this.isUpdatePending) return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach(((t6, i6) => this[i6] = t6)), this._$Ei = void 0);
    let i5 = false;
    const s7 = this._$AL;
    try {
      i5 = this.shouldUpdate(s7), i5 ? (this.willUpdate(s7), null === (t5 = this._$ES) || void 0 === t5 || t5.forEach(((t6) => {
        var i6;
        return null === (i6 = t6.hostUpdate) || void 0 === i6 ? void 0 : i6.call(t6);
      })), this.update(s7)) : this._$Ek();
    } catch (t6) {
      throw i5 = false, this._$Ek(), t6;
    }
    i5 && this._$AE(s7);
  }
  willUpdate(t5) {
  }
  _$AE(t5) {
    var i5;
    null === (i5 = this._$ES) || void 0 === i5 || i5.forEach(((t6) => {
      var i6;
      return null === (i6 = t6.hostUpdated) || void 0 === i6 ? void 0 : i6.call(t6);
    })), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t5)), this.updated(t5);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t5) {
    return true;
  }
  update(t5) {
    void 0 !== this._$EC && (this._$EC.forEach(((t6, i5) => this._$EO(i5, this[i5], t6))), this._$EC = void 0), this._$Ek();
  }
  updated(t5) {
  }
  firstUpdated(t5) {
  }
};
u[d] = true, u.elementProperties = /* @__PURE__ */ new Map(), u.elementStyles = [], u.shadowRootOptions = { mode: "open" }, null == o2 || o2({ ReactiveElement: u }), (null !== (s2 = e2.reactiveElementVersions) && void 0 !== s2 ? s2 : e2.reactiveElementVersions = []).push("1.6.3");

// node_modules/lit-html/lit-html.js
var t2;
var i2 = window;
var s3 = i2.trustedTypes;
var e3 = s3 ? s3.createPolicy("lit-html", { createHTML: (t5) => t5 }) : void 0;
var o3 = "$lit$";
var n3 = `lit$${(Math.random() + "").slice(9)}$`;
var l2 = "?" + n3;
var h2 = `<${l2}>`;
var r3 = document;
var u2 = () => r3.createComment("");
var d2 = (t5) => null === t5 || "object" != typeof t5 && "function" != typeof t5;
var c2 = Array.isArray;
var v = (t5) => c2(t5) || "function" == typeof (null == t5 ? void 0 : t5[Symbol.iterator]);
var a2 = "[ 	\n\f\r]";
var f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p = RegExp(`>|${a2}(?:([^\\s"'>=/]+)(${a2}*=${a2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g = /'/g;
var $ = /"/g;
var y = /^(?:script|style|textarea|title)$/i;
var w = (t5) => (i5, ...s7) => ({ _$litType$: t5, strings: i5, values: s7 });
var x = w(1);
var b = w(2);
var T = /* @__PURE__ */ Symbol.for("lit-noChange");
var A = /* @__PURE__ */ Symbol.for("lit-nothing");
var E = /* @__PURE__ */ new WeakMap();
var C = r3.createTreeWalker(r3, 129, null, false);
function P(t5, i5) {
  if (!Array.isArray(t5) || !t5.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i5) : i5;
}
var V = (t5, i5) => {
  const s7 = t5.length - 1, e11 = [];
  let l8, r6 = 2 === i5 ? "<svg>" : "", u4 = f;
  for (let i6 = 0; i6 < s7; i6++) {
    const s8 = t5[i6];
    let d3, c6, v2 = -1, a5 = 0;
    for (; a5 < s8.length && (u4.lastIndex = a5, c6 = u4.exec(s8), null !== c6); ) a5 = u4.lastIndex, u4 === f ? "!--" === c6[1] ? u4 = _ : void 0 !== c6[1] ? u4 = m : void 0 !== c6[2] ? (y.test(c6[2]) && (l8 = RegExp("</" + c6[2], "g")), u4 = p) : void 0 !== c6[3] && (u4 = p) : u4 === p ? ">" === c6[0] ? (u4 = null != l8 ? l8 : f, v2 = -1) : void 0 === c6[1] ? v2 = -2 : (v2 = u4.lastIndex - c6[2].length, d3 = c6[1], u4 = void 0 === c6[3] ? p : '"' === c6[3] ? $ : g) : u4 === $ || u4 === g ? u4 = p : u4 === _ || u4 === m ? u4 = f : (u4 = p, l8 = void 0);
    const w2 = u4 === p && t5[i6 + 1].startsWith("/>") ? " " : "";
    r6 += u4 === f ? s8 + h2 : v2 >= 0 ? (e11.push(d3), s8.slice(0, v2) + o3 + s8.slice(v2) + n3 + w2) : s8 + n3 + (-2 === v2 ? (e11.push(void 0), i6) : w2);
  }
  return [P(t5, r6 + (t5[s7] || "<?>") + (2 === i5 ? "</svg>" : "")), e11];
};
var N = class _N {
  constructor({ strings: t5, _$litType$: i5 }, e11) {
    let h5;
    this.parts = [];
    let r6 = 0, d3 = 0;
    const c6 = t5.length - 1, v2 = this.parts, [a5, f3] = V(t5, i5);
    if (this.el = _N.createElement(a5, e11), C.currentNode = this.el.content, 2 === i5) {
      const t6 = this.el.content, i6 = t6.firstChild;
      i6.remove(), t6.append(...i6.childNodes);
    }
    for (; null !== (h5 = C.nextNode()) && v2.length < c6; ) {
      if (1 === h5.nodeType) {
        if (h5.hasAttributes()) {
          const t6 = [];
          for (const i6 of h5.getAttributeNames()) if (i6.endsWith(o3) || i6.startsWith(n3)) {
            const s7 = f3[d3++];
            if (t6.push(i6), void 0 !== s7) {
              const t7 = h5.getAttribute(s7.toLowerCase() + o3).split(n3), i7 = /([.?@])?(.*)/.exec(s7);
              v2.push({ type: 1, index: r6, name: i7[2], strings: t7, ctor: "." === i7[1] ? H : "?" === i7[1] ? L : "@" === i7[1] ? z : k });
            } else v2.push({ type: 6, index: r6 });
          }
          for (const i6 of t6) h5.removeAttribute(i6);
        }
        if (y.test(h5.tagName)) {
          const t6 = h5.textContent.split(n3), i6 = t6.length - 1;
          if (i6 > 0) {
            h5.textContent = s3 ? s3.emptyScript : "";
            for (let s7 = 0; s7 < i6; s7++) h5.append(t6[s7], u2()), C.nextNode(), v2.push({ type: 2, index: ++r6 });
            h5.append(t6[i6], u2());
          }
        }
      } else if (8 === h5.nodeType) if (h5.data === l2) v2.push({ type: 2, index: r6 });
      else {
        let t6 = -1;
        for (; -1 !== (t6 = h5.data.indexOf(n3, t6 + 1)); ) v2.push({ type: 7, index: r6 }), t6 += n3.length - 1;
      }
      r6++;
    }
  }
  static createElement(t5, i5) {
    const s7 = r3.createElement("template");
    return s7.innerHTML = t5, s7;
  }
};
function S2(t5, i5, s7 = t5, e11) {
  var o11, n9, l8, h5;
  if (i5 === T) return i5;
  let r6 = void 0 !== e11 ? null === (o11 = s7._$Co) || void 0 === o11 ? void 0 : o11[e11] : s7._$Cl;
  const u4 = d2(i5) ? void 0 : i5._$litDirective$;
  return (null == r6 ? void 0 : r6.constructor) !== u4 && (null === (n9 = null == r6 ? void 0 : r6._$AO) || void 0 === n9 || n9.call(r6, false), void 0 === u4 ? r6 = void 0 : (r6 = new u4(t5), r6._$AT(t5, s7, e11)), void 0 !== e11 ? (null !== (l8 = (h5 = s7)._$Co) && void 0 !== l8 ? l8 : h5._$Co = [])[e11] = r6 : s7._$Cl = r6), void 0 !== r6 && (i5 = S2(t5, r6._$AS(t5, i5.values), r6, e11)), i5;
}
var M = class {
  constructor(t5, i5) {
    this._$AV = [], this._$AN = void 0, this._$AD = t5, this._$AM = i5;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t5) {
    var i5;
    const { el: { content: s7 }, parts: e11 } = this._$AD, o11 = (null !== (i5 = null == t5 ? void 0 : t5.creationScope) && void 0 !== i5 ? i5 : r3).importNode(s7, true);
    C.currentNode = o11;
    let n9 = C.nextNode(), l8 = 0, h5 = 0, u4 = e11[0];
    for (; void 0 !== u4; ) {
      if (l8 === u4.index) {
        let i6;
        2 === u4.type ? i6 = new R(n9, n9.nextSibling, this, t5) : 1 === u4.type ? i6 = new u4.ctor(n9, u4.name, u4.strings, this, t5) : 6 === u4.type && (i6 = new Z(n9, this, t5)), this._$AV.push(i6), u4 = e11[++h5];
      }
      l8 !== (null == u4 ? void 0 : u4.index) && (n9 = C.nextNode(), l8++);
    }
    return C.currentNode = r3, o11;
  }
  v(t5) {
    let i5 = 0;
    for (const s7 of this._$AV) void 0 !== s7 && (void 0 !== s7.strings ? (s7._$AI(t5, s7, i5), i5 += s7.strings.length - 2) : s7._$AI(t5[i5])), i5++;
  }
};
var R = class _R {
  constructor(t5, i5, s7, e11) {
    var o11;
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t5, this._$AB = i5, this._$AM = s7, this.options = e11, this._$Cp = null === (o11 = null == e11 ? void 0 : e11.isConnected) || void 0 === o11 || o11;
  }
  get _$AU() {
    var t5, i5;
    return null !== (i5 = null === (t5 = this._$AM) || void 0 === t5 ? void 0 : t5._$AU) && void 0 !== i5 ? i5 : this._$Cp;
  }
  get parentNode() {
    let t5 = this._$AA.parentNode;
    const i5 = this._$AM;
    return void 0 !== i5 && 11 === (null == t5 ? void 0 : t5.nodeType) && (t5 = i5.parentNode), t5;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t5, i5 = this) {
    t5 = S2(this, t5, i5), d2(t5) ? t5 === A || null == t5 || "" === t5 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t5 !== this._$AH && t5 !== T && this._(t5) : void 0 !== t5._$litType$ ? this.g(t5) : void 0 !== t5.nodeType ? this.$(t5) : v(t5) ? this.T(t5) : this._(t5);
  }
  k(t5) {
    return this._$AA.parentNode.insertBefore(t5, this._$AB);
  }
  $(t5) {
    this._$AH !== t5 && (this._$AR(), this._$AH = this.k(t5));
  }
  _(t5) {
    this._$AH !== A && d2(this._$AH) ? this._$AA.nextSibling.data = t5 : this.$(r3.createTextNode(t5)), this._$AH = t5;
  }
  g(t5) {
    var i5;
    const { values: s7, _$litType$: e11 } = t5, o11 = "number" == typeof e11 ? this._$AC(t5) : (void 0 === e11.el && (e11.el = N.createElement(P(e11.h, e11.h[0]), this.options)), e11);
    if ((null === (i5 = this._$AH) || void 0 === i5 ? void 0 : i5._$AD) === o11) this._$AH.v(s7);
    else {
      const t6 = new M(o11, this), i6 = t6.u(this.options);
      t6.v(s7), this.$(i6), this._$AH = t6;
    }
  }
  _$AC(t5) {
    let i5 = E.get(t5.strings);
    return void 0 === i5 && E.set(t5.strings, i5 = new N(t5)), i5;
  }
  T(t5) {
    c2(this._$AH) || (this._$AH = [], this._$AR());
    const i5 = this._$AH;
    let s7, e11 = 0;
    for (const o11 of t5) e11 === i5.length ? i5.push(s7 = new _R(this.k(u2()), this.k(u2()), this, this.options)) : s7 = i5[e11], s7._$AI(o11), e11++;
    e11 < i5.length && (this._$AR(s7 && s7._$AB.nextSibling, e11), i5.length = e11);
  }
  _$AR(t5 = this._$AA.nextSibling, i5) {
    var s7;
    for (null === (s7 = this._$AP) || void 0 === s7 || s7.call(this, false, true, i5); t5 && t5 !== this._$AB; ) {
      const i6 = t5.nextSibling;
      t5.remove(), t5 = i6;
    }
  }
  setConnected(t5) {
    var i5;
    void 0 === this._$AM && (this._$Cp = t5, null === (i5 = this._$AP) || void 0 === i5 || i5.call(this, t5));
  }
};
var k = class {
  constructor(t5, i5, s7, e11, o11) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t5, this.name = i5, this._$AM = e11, this.options = o11, s7.length > 2 || "" !== s7[0] || "" !== s7[1] ? (this._$AH = Array(s7.length - 1).fill(new String()), this.strings = s7) : this._$AH = A;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t5, i5 = this, s7, e11) {
    const o11 = this.strings;
    let n9 = false;
    if (void 0 === o11) t5 = S2(this, t5, i5, 0), n9 = !d2(t5) || t5 !== this._$AH && t5 !== T, n9 && (this._$AH = t5);
    else {
      const e12 = t5;
      let l8, h5;
      for (t5 = o11[0], l8 = 0; l8 < o11.length - 1; l8++) h5 = S2(this, e12[s7 + l8], i5, l8), h5 === T && (h5 = this._$AH[l8]), n9 || (n9 = !d2(h5) || h5 !== this._$AH[l8]), h5 === A ? t5 = A : t5 !== A && (t5 += (null != h5 ? h5 : "") + o11[l8 + 1]), this._$AH[l8] = h5;
    }
    n9 && !e11 && this.j(t5);
  }
  j(t5) {
    t5 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t5 ? t5 : "");
  }
};
var H = class extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t5) {
    this.element[this.name] = t5 === A ? void 0 : t5;
  }
};
var I = s3 ? s3.emptyScript : "";
var L = class extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t5) {
    t5 && t5 !== A ? this.element.setAttribute(this.name, I) : this.element.removeAttribute(this.name);
  }
};
var z = class extends k {
  constructor(t5, i5, s7, e11, o11) {
    super(t5, i5, s7, e11, o11), this.type = 5;
  }
  _$AI(t5, i5 = this) {
    var s7;
    if ((t5 = null !== (s7 = S2(this, t5, i5, 0)) && void 0 !== s7 ? s7 : A) === T) return;
    const e11 = this._$AH, o11 = t5 === A && e11 !== A || t5.capture !== e11.capture || t5.once !== e11.once || t5.passive !== e11.passive, n9 = t5 !== A && (e11 === A || o11);
    o11 && this.element.removeEventListener(this.name, this, e11), n9 && this.element.addEventListener(this.name, this, t5), this._$AH = t5;
  }
  handleEvent(t5) {
    var i5, s7;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s7 = null === (i5 = this.options) || void 0 === i5 ? void 0 : i5.host) && void 0 !== s7 ? s7 : this.element, t5) : this._$AH.handleEvent(t5);
  }
};
var Z = class {
  constructor(t5, i5, s7) {
    this.element = t5, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s7;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t5) {
    S2(this, t5);
  }
};
var j = { O: o3, P: n3, A: l2, C: 1, M: V, L: M, R: v, D: S2, I: R, V: k, H: L, N: z, U: H, F: Z };
var B = i2.litHtmlPolyfillSupport;
null == B || B(N, R), (null !== (t2 = i2.litHtmlVersions) && void 0 !== t2 ? t2 : i2.litHtmlVersions = []).push("2.8.0");
var D = (t5, i5, s7) => {
  var e11, o11;
  const n9 = null !== (e11 = null == s7 ? void 0 : s7.renderBefore) && void 0 !== e11 ? e11 : i5;
  let l8 = n9._$litPart$;
  if (void 0 === l8) {
    const t6 = null !== (o11 = null == s7 ? void 0 : s7.renderBefore) && void 0 !== o11 ? o11 : null;
    n9._$litPart$ = l8 = new R(i5.insertBefore(u2(), t6), t6, void 0, null != s7 ? s7 : {});
  }
  return l8._$AI(t5), l8;
};

// node_modules/lit-element/lit-element.js
var l3;
var o4;
var s4 = class extends u {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t5, e11;
    const i5 = super.createRenderRoot();
    return null !== (t5 = (e11 = this.renderOptions).renderBefore) && void 0 !== t5 || (e11.renderBefore = i5.firstChild), i5;
  }
  update(t5) {
    const i5 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t5), this._$Do = D(i5, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t5;
    super.connectedCallback(), null === (t5 = this._$Do) || void 0 === t5 || t5.setConnected(true);
  }
  disconnectedCallback() {
    var t5;
    super.disconnectedCallback(), null === (t5 = this._$Do) || void 0 === t5 || t5.setConnected(false);
  }
  render() {
    return T;
  }
};
s4.finalized = true, s4._$litElement$ = true, null === (l3 = globalThis.litElementHydrateSupport) || void 0 === l3 || l3.call(globalThis, { LitElement: s4 });
var n4 = globalThis.litElementPolyfillSupport;
null == n4 || n4({ LitElement: s4 });
(null !== (o4 = globalThis.litElementVersions) && void 0 !== o4 ? o4 : globalThis.litElementVersions = []).push("3.3.3");

// node_modules/@lit/reactive-element/decorators/custom-element.js
var e4 = (e11) => (n9) => "function" == typeof n9 ? ((e12, n10) => (customElements.define(e12, n10), n10))(e11, n9) : ((e12, n10) => {
  const { kind: t5, elements: s7 } = n10;
  return { kind: t5, elements: s7, finisher(n11) {
    customElements.define(e12, n11);
  } };
})(e11, n9);

// node_modules/@lit/reactive-element/decorators/property.js
var i3 = (i5, e11) => "method" === e11.kind && e11.descriptor && !("value" in e11.descriptor) ? { ...e11, finisher(n9) {
  n9.createProperty(e11.key, i5);
} } : { kind: "field", key: /* @__PURE__ */ Symbol(), placement: "own", descriptor: {}, originalKey: e11.key, initializer() {
  "function" == typeof e11.initializer && (this[e11.key] = e11.initializer.call(this));
}, finisher(n9) {
  n9.createProperty(e11.key, i5);
} };
var e5 = (i5, e11, n9) => {
  e11.constructor.createProperty(n9, i5);
};
function n5(n9) {
  return (t5, o11) => void 0 !== o11 ? e5(n9, t5, o11) : i3(n9, t5);
}

// node_modules/@lit/reactive-element/decorators/state.js
function t3(t5) {
  return n5({ ...t5, state: true });
}

// node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
var n6;
var e6 = null != (null === (n6 = window.HTMLSlotElement) || void 0 === n6 ? void 0 : n6.prototype.assignedElements) ? (o11, n9) => o11.assignedElements(n9) : (o11, n9) => o11.assignedNodes(n9).filter(((o12) => o12.nodeType === Node.ELEMENT_NODE));

// node_modules/lit-html/directive.js
var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e7 = (t5) => (...e11) => ({ _$litDirective$: t5, values: e11 });
var i4 = class {
  constructor(t5) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t5, e11, i5) {
    this._$Ct = t5, this._$AM = e11, this._$Ci = i5;
  }
  _$AS(t5, e11) {
    return this.update(t5, e11);
  }
  update(t5, e11) {
    return this.render(...e11);
  }
};

// node_modules/lit-html/directive-helpers.js
var { I: l5 } = j;
var e8 = (o11) => void 0 === o11.strings;
var r4 = () => document.createComment("");
var c3 = (o11, i5, n9) => {
  var t5;
  const v2 = o11._$AA.parentNode, d3 = void 0 === i5 ? o11._$AB : i5._$AA;
  if (void 0 === n9) {
    const i6 = v2.insertBefore(r4(), d3), t6 = v2.insertBefore(r4(), d3);
    n9 = new l5(i6, t6, o11, o11.options);
  } else {
    const l8 = n9._$AB.nextSibling, i6 = n9._$AM, u4 = i6 !== o11;
    if (u4) {
      let l9;
      null === (t5 = n9._$AQ) || void 0 === t5 || t5.call(n9, o11), n9._$AM = o11, void 0 !== n9._$AP && (l9 = o11._$AU) !== i6._$AU && n9._$AP(l9);
    }
    if (l8 !== d3 || u4) {
      let o12 = n9._$AA;
      for (; o12 !== l8; ) {
        const l9 = o12.nextSibling;
        v2.insertBefore(o12, d3), o12 = l9;
      }
    }
  }
  return n9;
};
var f2 = (o11, l8, i5 = o11) => (o11._$AI(l8, i5), o11);
var s5 = {};
var a3 = (o11, l8 = s5) => o11._$AH = l8;
var m2 = (o11) => o11._$AH;
var p2 = (o11) => {
  var l8;
  null === (l8 = o11._$AP) || void 0 === l8 || l8.call(o11, false, true);
  let i5 = o11._$AA;
  const n9 = o11._$AB.nextSibling;
  for (; i5 !== n9; ) {
    const o12 = i5.nextSibling;
    i5.remove(), i5 = o12;
  }
};

// node_modules/lit-html/directives/repeat.js
var u3 = (e11, s7, t5) => {
  const r6 = /* @__PURE__ */ new Map();
  for (let l8 = s7; l8 <= t5; l8++) r6.set(e11[l8], l8);
  return r6;
};
var c4 = e7(class extends i4 {
  constructor(e11) {
    if (super(e11), e11.type !== t4.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  ct(e11, s7, t5) {
    let r6;
    void 0 === t5 ? t5 = s7 : void 0 !== s7 && (r6 = s7);
    const l8 = [], o11 = [];
    let i5 = 0;
    for (const s8 of e11) l8[i5] = r6 ? r6(s8, i5) : i5, o11[i5] = t5(s8, i5), i5++;
    return { values: o11, keys: l8 };
  }
  render(e11, s7, t5) {
    return this.ct(e11, s7, t5).values;
  }
  update(s7, [t5, r6, c6]) {
    var d3;
    const a5 = m2(s7), { values: p3, keys: v2 } = this.ct(t5, r6, c6);
    if (!Array.isArray(a5)) return this.ut = v2, p3;
    const h5 = null !== (d3 = this.ut) && void 0 !== d3 ? d3 : this.ut = [], m3 = [];
    let y2, x2, j2 = 0, k3 = a5.length - 1, w2 = 0, A2 = p3.length - 1;
    for (; j2 <= k3 && w2 <= A2; ) if (null === a5[j2]) j2++;
    else if (null === a5[k3]) k3--;
    else if (h5[j2] === v2[w2]) m3[w2] = f2(a5[j2], p3[w2]), j2++, w2++;
    else if (h5[k3] === v2[A2]) m3[A2] = f2(a5[k3], p3[A2]), k3--, A2--;
    else if (h5[j2] === v2[A2]) m3[A2] = f2(a5[j2], p3[A2]), c3(s7, m3[A2 + 1], a5[j2]), j2++, A2--;
    else if (h5[k3] === v2[w2]) m3[w2] = f2(a5[k3], p3[w2]), c3(s7, a5[j2], a5[k3]), k3--, w2++;
    else if (void 0 === y2 && (y2 = u3(v2, w2, A2), x2 = u3(h5, j2, k3)), y2.has(h5[j2])) if (y2.has(h5[k3])) {
      const e11 = x2.get(v2[w2]), t6 = void 0 !== e11 ? a5[e11] : null;
      if (null === t6) {
        const e12 = c3(s7, a5[j2]);
        f2(e12, p3[w2]), m3[w2] = e12;
      } else m3[w2] = f2(t6, p3[w2]), c3(s7, a5[j2], t6), a5[e11] = null;
      w2++;
    } else p2(a5[k3]), k3--;
    else p2(a5[j2]), j2++;
    for (; w2 <= A2; ) {
      const e11 = c3(s7, m3[A2 + 1]);
      f2(e11, p3[w2]), m3[w2++] = e11;
    }
    for (; j2 <= k3; ) {
      const e11 = a5[j2++];
      null !== e11 && p2(e11);
    }
    return this.ut = v2, a3(s7, m3), T;
  }
});

// node_modules/lit-html/directives/live.js
var l6 = e7(class extends i4 {
  constructor(r6) {
    if (super(r6), r6.type !== t4.PROPERTY && r6.type !== t4.ATTRIBUTE && r6.type !== t4.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!e8(r6)) throw Error("`live` bindings can only contain a single expression");
  }
  render(r6) {
    return r6;
  }
  update(i5, [t5]) {
    if (t5 === T || t5 === A) return t5;
    const o11 = i5.element, l8 = i5.name;
    if (i5.type === t4.PROPERTY) {
      if (t5 === o11[l8]) return T;
    } else if (i5.type === t4.BOOLEAN_ATTRIBUTE) {
      if (!!t5 === o11.hasAttribute(l8)) return T;
    } else if (i5.type === t4.ATTRIBUTE && o11.getAttribute(l8) === t5 + "") return T;
    return a3(i5), t5;
  }
});

// node_modules/lit-html/async-directive.js
var s6 = (i5, t5) => {
  var e11, o11;
  const r6 = i5._$AN;
  if (void 0 === r6) return false;
  for (const i6 of r6) null === (o11 = (e11 = i6)._$AO) || void 0 === o11 || o11.call(e11, t5, false), s6(i6, t5);
  return true;
};
var o6 = (i5) => {
  let t5, e11;
  do {
    if (void 0 === (t5 = i5._$AM)) break;
    e11 = t5._$AN, e11.delete(i5), i5 = t5;
  } while (0 === (null == e11 ? void 0 : e11.size));
};
var r5 = (i5) => {
  for (let t5; t5 = i5._$AM; i5 = t5) {
    let e11 = t5._$AN;
    if (void 0 === e11) t5._$AN = e11 = /* @__PURE__ */ new Set();
    else if (e11.has(i5)) break;
    e11.add(i5), l7(t5);
  }
};
function n7(i5) {
  void 0 !== this._$AN ? (o6(this), this._$AM = i5, r5(this)) : this._$AM = i5;
}
function h3(i5, t5 = false, e11 = 0) {
  const r6 = this._$AH, n9 = this._$AN;
  if (void 0 !== n9 && 0 !== n9.size) if (t5) if (Array.isArray(r6)) for (let i6 = e11; i6 < r6.length; i6++) s6(r6[i6], false), o6(r6[i6]);
  else null != r6 && (s6(r6, false), o6(r6));
  else s6(this, i5);
}
var l7 = (i5) => {
  var t5, s7, o11, r6;
  i5.type == t4.CHILD && (null !== (t5 = (o11 = i5)._$AP) && void 0 !== t5 || (o11._$AP = h3), null !== (s7 = (r6 = i5)._$AQ) && void 0 !== s7 || (r6._$AQ = n7));
};
var c5 = class extends i4 {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(i5, t5, e11) {
    super._$AT(i5, t5, e11), r5(this), this.isConnected = i5._$AU;
  }
  _$AO(i5, t5 = true) {
    var e11, r6;
    i5 !== this.isConnected && (this.isConnected = i5, i5 ? null === (e11 = this.reconnected) || void 0 === e11 || e11.call(this) : null === (r6 = this.disconnected) || void 0 === r6 || r6.call(this)), t5 && (s6(this, i5), o6(this));
  }
  setValue(t5) {
    if (e8(this._$Ct)) this._$Ct._$AI(t5, this);
    else {
      const i5 = [...this._$Ct._$AH];
      i5[this._$Ci] = t5, this._$Ct._$AI(i5, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
};

// node_modules/lit-html/directives/ref.js
var e9 = () => new o7();
var o7 = class {
};
var h4 = /* @__PURE__ */ new WeakMap();
var n8 = e7(class extends c5 {
  render(t5) {
    return A;
  }
  update(t5, [s7]) {
    var e11;
    const o11 = s7 !== this.G;
    return o11 && void 0 !== this.G && this.ot(void 0), (o11 || this.rt !== this.lt) && (this.G = s7, this.dt = null === (e11 = t5.options) || void 0 === e11 ? void 0 : e11.host, this.ot(this.lt = t5.element)), A;
  }
  ot(i5) {
    var t5;
    if ("function" == typeof this.G) {
      const s7 = null !== (t5 = this.dt) && void 0 !== t5 ? t5 : globalThis;
      let e11 = h4.get(s7);
      void 0 === e11 && (e11 = /* @__PURE__ */ new WeakMap(), h4.set(s7, e11)), void 0 !== e11.get(this.G) && this.G.call(this.dt, void 0), e11.set(this.G, i5), void 0 !== i5 && this.G.call(this.dt, i5);
    } else this.G.value = i5;
  }
  get rt() {
    var i5, t5, s7;
    return "function" == typeof this.G ? null === (t5 = h4.get(null !== (i5 = this.dt) && void 0 !== i5 ? i5 : globalThis)) || void 0 === t5 ? void 0 : t5.get(this.G) : null === (s7 = this.G) || void 0 === s7 ? void 0 : s7.value;
  }
  disconnected() {
    this.rt === this.lt && this.ot(void 0);
  }
  reconnected() {
    this.ot(this.lt);
  }
});

// node_modules/lit-html/directives/class-map.js
var o8 = e7(class extends i4 {
  constructor(t5) {
    var i5;
    if (super(t5), t5.type !== t4.ATTRIBUTE || "class" !== t5.name || (null === (i5 = t5.strings) || void 0 === i5 ? void 0 : i5.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t5) {
    return " " + Object.keys(t5).filter(((i5) => t5[i5])).join(" ") + " ";
  }
  update(i5, [s7]) {
    var r6, o11;
    if (void 0 === this.it) {
      this.it = /* @__PURE__ */ new Set(), void 0 !== i5.strings && (this.nt = new Set(i5.strings.join(" ").split(/\s/).filter(((t5) => "" !== t5))));
      for (const t5 in s7) s7[t5] && !(null === (r6 = this.nt) || void 0 === r6 ? void 0 : r6.has(t5)) && this.it.add(t5);
      return this.render(s7);
    }
    const e11 = i5.element.classList;
    this.it.forEach(((t5) => {
      t5 in s7 || (e11.remove(t5), this.it.delete(t5));
    }));
    for (const t5 in s7) {
      const i6 = !!s7[t5];
      i6 === this.it.has(t5) || (null === (o11 = this.nt) || void 0 === o11 ? void 0 : o11.has(t5)) || (i6 ? (e11.add(t5), this.it.add(t5)) : (e11.remove(t5), this.it.delete(t5)));
    }
    return T;
  }
});

// node_modules/hotkeys-js/dist/hotkeys.esm.js
var isff = typeof navigator !== "undefined" ? navigator.userAgent.toLowerCase().indexOf("firefox") > 0 : false;
function addEvent(object, event, method) {
  if (object.addEventListener) {
    object.addEventListener(event, method, false);
  } else if (object.attachEvent) {
    object.attachEvent("on".concat(event), function() {
      method(window.event);
    });
  }
}
function getMods(modifier, key) {
  var mods = key.slice(0, key.length - 1);
  for (var i5 = 0; i5 < mods.length; i5++) {
    mods[i5] = modifier[mods[i5].toLowerCase()];
  }
  return mods;
}
function getKeys(key) {
  if (typeof key !== "string") key = "";
  key = key.replace(/\s/g, "");
  var keys = key.split(",");
  var index = keys.lastIndexOf("");
  for (; index >= 0; ) {
    keys[index - 1] += ",";
    keys.splice(index, 1);
    index = keys.lastIndexOf("");
  }
  return keys;
}
function compareArray(a1, a22) {
  var arr1 = a1.length >= a22.length ? a1 : a22;
  var arr2 = a1.length >= a22.length ? a22 : a1;
  var isIndex = true;
  for (var i5 = 0; i5 < arr1.length; i5++) {
    if (arr2.indexOf(arr1[i5]) === -1) isIndex = false;
  }
  return isIndex;
}
var _keyMap = {
  backspace: 8,
  tab: 9,
  clear: 12,
  enter: 13,
  return: 13,
  esc: 27,
  escape: 27,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  del: 46,
  delete: 46,
  ins: 45,
  insert: 45,
  home: 36,
  end: 35,
  pageup: 33,
  pagedown: 34,
  capslock: 20,
  num_0: 96,
  num_1: 97,
  num_2: 98,
  num_3: 99,
  num_4: 100,
  num_5: 101,
  num_6: 102,
  num_7: 103,
  num_8: 104,
  num_9: 105,
  num_multiply: 106,
  num_add: 107,
  num_enter: 108,
  num_subtract: 109,
  num_decimal: 110,
  num_divide: 111,
  "\u21EA": 20,
  ",": 188,
  ".": 190,
  "/": 191,
  "`": 192,
  "-": isff ? 173 : 189,
  "=": isff ? 61 : 187,
  ";": isff ? 59 : 186,
  "'": 222,
  "[": 219,
  "]": 221,
  "\\": 220
};
var _modifier = {
  // shiftKey
  "\u21E7": 16,
  shift: 16,
  // altKey
  "\u2325": 18,
  alt: 18,
  option: 18,
  // ctrlKey
  "\u2303": 17,
  ctrl: 17,
  control: 17,
  // metaKey
  "\u2318": 91,
  cmd: 91,
  command: 91
};
var modifierMap = {
  16: "shiftKey",
  18: "altKey",
  17: "ctrlKey",
  91: "metaKey",
  shiftKey: 16,
  ctrlKey: 17,
  altKey: 18,
  metaKey: 91
};
var _mods = {
  16: false,
  18: false,
  17: false,
  91: false
};
var _handlers = {};
for (k2 = 1; k2 < 20; k2++) {
  _keyMap["f".concat(k2)] = 111 + k2;
}
var k2;
var _downKeys = [];
var _scope = "all";
var elementHasBindEvent = [];
var code = function code2(x2) {
  return _keyMap[x2.toLowerCase()] || _modifier[x2.toLowerCase()] || x2.toUpperCase().charCodeAt(0);
};
function setScope(scope) {
  _scope = scope || "all";
}
function getScope() {
  return _scope || "all";
}
function getPressedKeyCodes() {
  return _downKeys.slice(0);
}
function filter(event) {
  var target = event.target || event.srcElement;
  var tagName = target.tagName;
  var flag = true;
  if (target.isContentEditable || (tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") && !target.readOnly) {
    flag = false;
  }
  return flag;
}
function isPressed(keyCode) {
  if (typeof keyCode === "string") {
    keyCode = code(keyCode);
  }
  return _downKeys.indexOf(keyCode) !== -1;
}
function deleteScope(scope, newScope) {
  var handlers;
  var i5;
  if (!scope) scope = getScope();
  for (var key in _handlers) {
    if (Object.prototype.hasOwnProperty.call(_handlers, key)) {
      handlers = _handlers[key];
      for (i5 = 0; i5 < handlers.length; ) {
        if (handlers[i5].scope === scope) handlers.splice(i5, 1);
        else i5++;
      }
    }
  }
  if (getScope() === scope) setScope(newScope || "all");
}
function clearModifier(event) {
  var key = event.keyCode || event.which || event.charCode;
  var i5 = _downKeys.indexOf(key);
  if (i5 >= 0) {
    _downKeys.splice(i5, 1);
  }
  if (event.key && event.key.toLowerCase() === "meta") {
    _downKeys.splice(0, _downKeys.length);
  }
  if (key === 93 || key === 224) key = 91;
  if (key in _mods) {
    _mods[key] = false;
    for (var k3 in _modifier) {
      if (_modifier[k3] === key) hotkeys[k3] = false;
    }
  }
}
function unbind(keysInfo) {
  if (!keysInfo) {
    Object.keys(_handlers).forEach(function(key) {
      return delete _handlers[key];
    });
  } else if (Array.isArray(keysInfo)) {
    keysInfo.forEach(function(info) {
      if (info.key) eachUnbind(info);
    });
  } else if (typeof keysInfo === "object") {
    if (keysInfo.key) eachUnbind(keysInfo);
  } else if (typeof keysInfo === "string") {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    var scope = args[0], method = args[1];
    if (typeof scope === "function") {
      method = scope;
      scope = "";
    }
    eachUnbind({
      key: keysInfo,
      scope,
      method,
      splitKey: "+"
    });
  }
}
var eachUnbind = function eachUnbind2(_ref) {
  var key = _ref.key, scope = _ref.scope, method = _ref.method, _ref$splitKey = _ref.splitKey, splitKey = _ref$splitKey === void 0 ? "+" : _ref$splitKey;
  var multipleKeys = getKeys(key);
  multipleKeys.forEach(function(originKey) {
    var unbindKeys = originKey.split(splitKey);
    var len = unbindKeys.length;
    var lastKey = unbindKeys[len - 1];
    var keyCode = lastKey === "*" ? "*" : code(lastKey);
    if (!_handlers[keyCode]) return;
    if (!scope) scope = getScope();
    var mods = len > 1 ? getMods(_modifier, unbindKeys) : [];
    _handlers[keyCode] = _handlers[keyCode].map(function(record) {
      var isMatchingMethod = method ? record.method === method : true;
      if (isMatchingMethod && record.scope === scope && compareArray(record.mods, mods)) {
        return {};
      }
      return record;
    });
  });
};
function eventHandler(event, handler, scope) {
  var modifiersMatch;
  if (handler.scope === scope || handler.scope === "all") {
    modifiersMatch = handler.mods.length > 0;
    for (var y2 in _mods) {
      if (Object.prototype.hasOwnProperty.call(_mods, y2)) {
        if (!_mods[y2] && handler.mods.indexOf(+y2) > -1 || _mods[y2] && handler.mods.indexOf(+y2) === -1) {
          modifiersMatch = false;
        }
      }
    }
    if (handler.mods.length === 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91] || modifiersMatch || handler.shortcut === "*") {
      if (handler.method(event, handler) === false) {
        if (event.preventDefault) event.preventDefault();
        else event.returnValue = false;
        if (event.stopPropagation) event.stopPropagation();
        if (event.cancelBubble) event.cancelBubble = true;
      }
    }
  }
}
function dispatch(event) {
  var asterisk = _handlers["*"];
  var key = event.keyCode || event.which || event.charCode;
  if (!hotkeys.filter.call(this, event)) return;
  if (key === 93 || key === 224) key = 91;
  if (_downKeys.indexOf(key) === -1 && key !== 229) _downKeys.push(key);
  ["ctrlKey", "altKey", "shiftKey", "metaKey"].forEach(function(keyName) {
    var keyNum = modifierMap[keyName];
    if (event[keyName] && _downKeys.indexOf(keyNum) === -1) {
      _downKeys.push(keyNum);
    } else if (!event[keyName] && _downKeys.indexOf(keyNum) > -1) {
      _downKeys.splice(_downKeys.indexOf(keyNum), 1);
    } else if (keyName === "metaKey" && event[keyName] && _downKeys.length === 3) {
      if (!(event.ctrlKey || event.shiftKey || event.altKey)) {
        _downKeys = _downKeys.slice(_downKeys.indexOf(keyNum));
      }
    }
  });
  if (key in _mods) {
    _mods[key] = true;
    for (var k3 in _modifier) {
      if (_modifier[k3] === key) hotkeys[k3] = true;
    }
    if (!asterisk) return;
  }
  for (var e11 in _mods) {
    if (Object.prototype.hasOwnProperty.call(_mods, e11)) {
      _mods[e11] = event[modifierMap[e11]];
    }
  }
  if (event.getModifierState && !(event.altKey && !event.ctrlKey) && event.getModifierState("AltGraph")) {
    if (_downKeys.indexOf(17) === -1) {
      _downKeys.push(17);
    }
    if (_downKeys.indexOf(18) === -1) {
      _downKeys.push(18);
    }
    _mods[17] = true;
    _mods[18] = true;
  }
  var scope = getScope();
  if (asterisk) {
    for (var i5 = 0; i5 < asterisk.length; i5++) {
      if (asterisk[i5].scope === scope && (event.type === "keydown" && asterisk[i5].keydown || event.type === "keyup" && asterisk[i5].keyup)) {
        eventHandler(event, asterisk[i5], scope);
      }
    }
  }
  if (!(key in _handlers)) return;
  for (var _i = 0; _i < _handlers[key].length; _i++) {
    if (event.type === "keydown" && _handlers[key][_i].keydown || event.type === "keyup" && _handlers[key][_i].keyup) {
      if (_handlers[key][_i].key) {
        var record = _handlers[key][_i];
        var splitKey = record.splitKey;
        var keyShortcut = record.key.split(splitKey);
        var _downKeysCurrent = [];
        for (var a5 = 0; a5 < keyShortcut.length; a5++) {
          _downKeysCurrent.push(code(keyShortcut[a5]));
        }
        if (_downKeysCurrent.sort().join("") === _downKeys.sort().join("")) {
          eventHandler(event, record, scope);
        }
      }
    }
  }
}
function isElementBind(element) {
  return elementHasBindEvent.indexOf(element) > -1;
}
function hotkeys(key, option, method) {
  _downKeys = [];
  var keys = getKeys(key);
  var mods = [];
  var scope = "all";
  var element = document;
  var i5 = 0;
  var keyup = false;
  var keydown = true;
  var splitKey = "+";
  if (method === void 0 && typeof option === "function") {
    method = option;
  }
  if (Object.prototype.toString.call(option) === "[object Object]") {
    if (option.scope) scope = option.scope;
    if (option.element) element = option.element;
    if (option.keyup) keyup = option.keyup;
    if (option.keydown !== void 0) keydown = option.keydown;
    if (typeof option.splitKey === "string") splitKey = option.splitKey;
  }
  if (typeof option === "string") scope = option;
  for (; i5 < keys.length; i5++) {
    key = keys[i5].split(splitKey);
    mods = [];
    if (key.length > 1) mods = getMods(_modifier, key);
    key = key[key.length - 1];
    key = key === "*" ? "*" : code(key);
    if (!(key in _handlers)) _handlers[key] = [];
    _handlers[key].push({
      keyup,
      keydown,
      scope,
      mods,
      shortcut: keys[i5],
      method,
      key: keys[i5],
      splitKey
    });
  }
  if (typeof element !== "undefined" && !isElementBind(element) && window) {
    elementHasBindEvent.push(element);
    addEvent(element, "keydown", function(e11) {
      dispatch(e11);
    });
    addEvent(window, "focus", function() {
      _downKeys = [];
    });
    addEvent(element, "keyup", function(e11) {
      dispatch(e11);
      clearModifier(e11);
    });
  }
}
var _api = {
  setScope,
  getScope,
  deleteScope,
  getPressedKeyCodes,
  isPressed,
  filter,
  unbind
};
for (a4 in _api) {
  if (Object.prototype.hasOwnProperty.call(_api, a4)) {
    hotkeys[a4] = _api[a4];
  }
}
var a4;
if (typeof window !== "undefined") {
  _hotkeys = window.hotkeys;
  hotkeys.noConflict = function(deep) {
    if (deep && window.hotkeys === hotkeys) {
      window.hotkeys = _hotkeys;
    }
    return hotkeys;
  };
  window.hotkeys = hotkeys;
}
var _hotkeys;
var hotkeys_esm_default = hotkeys;

// node_modules/ninja-keys/dist/ninja-header.js
var __decorate = function(decorators, target, key, desc) {
  var c6 = arguments.length, r6 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r6 = Reflect.decorate(decorators, target, key, desc);
  else for (var i5 = decorators.length - 1; i5 >= 0; i5--) if (d3 = decorators[i5]) r6 = (c6 < 3 ? d3(r6) : c6 > 3 ? d3(target, key, r6) : d3(target, key)) || r6;
  return c6 > 3 && r6 && Object.defineProperty(target, key, r6), r6;
};
var NinjaHeader = class NinjaHeader2 extends s4 {
  constructor() {
    super(...arguments);
    this.placeholder = "";
    this.hideBreadcrumbs = false;
    this.breadcrumbHome = "Home";
    this.breadcrumbs = [];
    this._inputRef = e9();
  }
  render() {
    let breadcrumbs = "";
    if (!this.hideBreadcrumbs) {
      const itemTemplates = [];
      for (const breadcrumb of this.breadcrumbs) {
        itemTemplates.push(x`<button
            tabindex="-1"
            @click=${() => this.selectParent(breadcrumb)}
            class="breadcrumb"
          >
            ${breadcrumb}
          </button>`);
      }
      breadcrumbs = x`<div class="breadcrumb-list">
        <button
          tabindex="-1"
          @click=${() => this.selectParent()}
          class="breadcrumb"
        >
          ${this.breadcrumbHome}
        </button>
        ${itemTemplates}
      </div>`;
    }
    return x`
      ${breadcrumbs}
      <div part="ninja-input-wrapper" class="search-wrapper">
        <input
          part="ninja-input"
          type="text"
          id="search"
          spellcheck="false"
          autocomplete="off"
          @input="${this._handleInput}"
          ${n8(this._inputRef)}
          placeholder="${this.placeholder}"
          class="search"
        />
      </div>
    `;
  }
  setSearch(value) {
    if (this._inputRef.value) {
      this._inputRef.value.value = value;
    }
  }
  focusSearch() {
    requestAnimationFrame(() => this._inputRef.value.focus());
  }
  _handleInput(event) {
    const input = event.target;
    this.dispatchEvent(new CustomEvent("change", {
      detail: { search: input.value },
      bubbles: false,
      composed: false
    }));
  }
  selectParent(breadcrumb) {
    this.dispatchEvent(new CustomEvent("setParent", {
      detail: { parent: breadcrumb },
      bubbles: true,
      composed: true
    }));
  }
  firstUpdated() {
    this.focusSearch();
  }
  _close() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
  }
};
NinjaHeader.styles = i`
    :host {
      flex: 1;
      position: relative;
    }
    .search {
      padding: 1.25em;
      flex-grow: 1;
      flex-shrink: 0;
      margin: 0px;
      border: none;
      appearance: none;
      font-size: 1.125em;
      background: transparent;
      caret-color: var(--ninja-accent-color);
      color: var(--ninja-text-color);
      outline: none;
      font-family: var(--ninja-font-family);
    }
    .search::placeholder {
      color: var(--ninja-placeholder-color);
    }
    .breadcrumb-list {
      padding: 1em 4em 0 1em;
      display: flex;
      flex-direction: row;
      align-items: stretch;
      justify-content: flex-start;
      flex: initial;
    }

    .breadcrumb {
      background: var(--ninja-secondary-background-color);
      text-align: center;
      line-height: 1.2em;
      border-radius: var(--ninja-key-border-radius);
      border: 0;
      cursor: pointer;
      padding: 0.1em 0.5em;
      color: var(--ninja-secondary-text-color);
      margin-right: 0.5em;
      outline: none;
      font-family: var(--ninja-font-family);
    }

    .search-wrapper {
      display: flex;
      border-bottom: var(--ninja-separate-border);
    }
  `;
__decorate([
  n5()
], NinjaHeader.prototype, "placeholder", void 0);
__decorate([
  n5({ type: Boolean })
], NinjaHeader.prototype, "hideBreadcrumbs", void 0);
__decorate([
  n5()
], NinjaHeader.prototype, "breadcrumbHome", void 0);
__decorate([
  n5({ type: Array })
], NinjaHeader.prototype, "breadcrumbs", void 0);
NinjaHeader = __decorate([
  e4("ninja-header")
], NinjaHeader);

// node_modules/lit-html/directives/unsafe-html.js
var e10 = class extends i4 {
  constructor(i5) {
    if (super(i5), this.et = A, i5.type !== t4.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r6) {
    if (r6 === A || null == r6) return this.ft = void 0, this.et = r6;
    if (r6 === T) return r6;
    if ("string" != typeof r6) throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r6 === this.et) return this.ft;
    this.et = r6;
    const s7 = [r6];
    return s7.raw = s7, this.ft = { _$litType$: this.constructor.resultType, strings: s7, values: [] };
  }
};
e10.directiveName = "unsafeHTML", e10.resultType = 1;
var o9 = e7(e10);

// node_modules/lit-html/directives/join.js
function* o10(o11, t5) {
  const f3 = "function" == typeof t5;
  if (void 0 !== o11) {
    let i5 = -1;
    for (const n9 of o11) i5 > -1 && (yield f3 ? t5(i5) : t5), i5++, yield n9;
  }
}

// node_modules/tslib/tslib.es6.mjs
function __decorate2(decorators, target, key, desc) {
  var c6 = arguments.length, r6 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r6 = Reflect.decorate(decorators, target, key, desc);
  else for (var i5 = decorators.length - 1; i5 >= 0; i5--) if (d3 = decorators[i5]) r6 = (c6 < 3 ? d3(r6) : c6 > 3 ? d3(target, key, r6) : d3(target, key)) || r6;
  return c6 > 3 && r6 && Object.defineProperty(target, key, r6), r6;
}

// node_modules/@material/mwc-icon/mwc-icon-host.css.js
var styles = i`:host{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}`;

// node_modules/@material/mwc-icon/mwc-icon.js
var Icon = class Icon2 extends s4 {
  /** @soyTemplate */
  render() {
    return x`<span><slot></slot></span>`;
  }
};
Icon.styles = [styles];
Icon = __decorate2([
  e4("mwc-icon")
], Icon);

// node_modules/ninja-keys/dist/ninja-action.js
var __decorate3 = function(decorators, target, key, desc) {
  var c6 = arguments.length, r6 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r6 = Reflect.decorate(decorators, target, key, desc);
  else for (var i5 = decorators.length - 1; i5 >= 0; i5--) if (d3 = decorators[i5]) r6 = (c6 < 3 ? d3(r6) : c6 > 3 ? d3(target, key, r6) : d3(target, key)) || r6;
  return c6 > 3 && r6 && Object.defineProperty(target, key, r6), r6;
};
var NinjaAction = class NinjaAction2 extends s4 {
  constructor() {
    super();
    this.selected = false;
    this.hotKeysJoinedView = true;
    this.addEventListener("click", this.click);
  }
  /**
   * Scroll to show element
   */
  ensureInView() {
    requestAnimationFrame(() => this.scrollIntoView({ block: "nearest" }));
  }
  click() {
    this.dispatchEvent(new CustomEvent("actionsSelected", {
      detail: this.action,
      bubbles: true,
      composed: true
    }));
  }
  updated(changedProperties) {
    if (changedProperties.has("selected")) {
      if (this.selected) {
        this.ensureInView();
      }
    }
  }
  render() {
    let icon;
    if (this.action.mdIcon) {
      icon = x`<mwc-icon part="ninja-icon" class="ninja-icon"
        >${this.action.mdIcon}</mwc-icon
      >`;
    } else if (this.action.icon) {
      icon = o9(this.action.icon || "");
    }
    let hotkey;
    if (this.action.hotkey) {
      if (this.hotKeysJoinedView) {
        hotkey = this.action.hotkey.split(",").map((hotkeys2) => {
          const keys = hotkeys2.split("+");
          const joinedKeys = x`${o10(keys.map((key) => x`<kbd>${key}</kbd>`), "+")}`;
          return x`<div class="ninja-hotkey ninja-hotkeys">
            ${joinedKeys}
          </div>`;
        });
      } else {
        hotkey = this.action.hotkey.split(",").map((hotkeys2) => {
          const keys = hotkeys2.split("+");
          const keyElements = keys.map((key) => x`<kbd class="ninja-hotkey">${key}</kbd>`);
          return x`<kbd class="ninja-hotkeys">${keyElements}</kbd>`;
        });
      }
    }
    const classes = {
      selected: this.selected,
      "ninja-action": true
    };
    return x`
      <div
        class="ninja-action"
        part="ninja-action ${this.selected ? "ninja-selected" : ""}"
        class=${o8(classes)}
      >
        ${icon}
        <div class="ninja-title">${this.action.title}</div>
        ${hotkey}
      </div>
    `;
  }
};
NinjaAction.styles = i`
    :host {
      display: flex;
      width: 100%;
    }
    .ninja-action {
      padding: 0.75em 1em;
      display: flex;
      border-left: 2px solid transparent;
      align-items: center;
      justify-content: start;
      outline: none;
      transition: color 0s ease 0s;
      width: 100%;
    }
    .ninja-action.selected {
      cursor: pointer;
      color: var(--ninja-selected-text-color);
      background-color: var(--ninja-selected-background);
      border-left: 2px solid var(--ninja-accent-color);
      outline: none;
    }
    .ninja-action.selected .ninja-icon {
      color: var(--ninja-selected-text-color);
    }
    .ninja-icon {
      font-size: var(--ninja-icon-size);
      max-width: var(--ninja-icon-size);
      max-height: var(--ninja-icon-size);
      margin-right: 1em;
      color: var(--ninja-icon-color);
      margin-right: 1em;
      position: relative;
    }

    .ninja-title {
      flex-shrink: 0.01;
      margin-right: 0.5em;
      flex-grow: 1;
      font-size: 0.8125em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ninja-hotkeys {
      flex-shrink: 0;
      width: min-content;
      display: flex;
    }

    .ninja-hotkeys kbd {
      font-family: inherit;
    }
    .ninja-hotkey {
      background: var(--ninja-secondary-background-color);
      padding: 0.06em 0.25em;
      border-radius: var(--ninja-key-border-radius);
      text-transform: capitalize;
      color: var(--ninja-secondary-text-color);
      font-size: 0.75em;
      font-family: inherit;
    }

    .ninja-hotkey + .ninja-hotkey {
      margin-left: 0.5em;
    }
    .ninja-hotkeys + .ninja-hotkeys {
      margin-left: 1em;
    }
  `;
__decorate3([
  n5({ type: Object })
], NinjaAction.prototype, "action", void 0);
__decorate3([
  n5({ type: Boolean })
], NinjaAction.prototype, "selected", void 0);
__decorate3([
  n5({ type: Boolean })
], NinjaAction.prototype, "hotKeysJoinedView", void 0);
NinjaAction = __decorate3([
  e4("ninja-action")
], NinjaAction);

// node_modules/ninja-keys/dist/ninja-footer.js
var footerHtml = x` <div class="modal-footer" slot="footer">
  <span class="help">
    <svg
      version="1.0"
      class="ninja-examplekey"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1280 1280"
    >
      <path
        d="M1013 376c0 73.4-.4 113.3-1.1 120.2a159.9 159.9 0 0 1-90.2 127.3c-20 9.6-36.7 14-59.2 15.5-7.1.5-121.9.9-255 1h-242l95.5-95.5 95.5-95.5-38.3-38.2-38.2-38.3-160 160c-88 88-160 160.4-160 161 0 .6 72 73 160 161l160 160 38.2-38.3 38.3-38.2-95.5-95.5-95.5-95.5h251.1c252.9 0 259.8-.1 281.4-3.6 72.1-11.8 136.9-54.1 178.5-116.4 8.6-12.9 22.6-40.5 28-55.4 4.4-12 10.7-36.1 13.1-50.6 1.6-9.6 1.8-21 2.1-132.8l.4-122.2H1013v110z"
      />
    </svg>

    to select
  </span>
  <span class="help">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="ninja-examplekey"
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path
        d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="ninja-examplekey"
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
    </svg>
    to navigate
  </span>
  <span class="help">
    <span class="ninja-examplekey esc">esc</span>
    to close
  </span>
  <span class="help">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="ninja-examplekey backspace"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z"
        clip-rule="evenodd"
      />
    </svg>
    move to parent
  </span>
</div>`;

// node_modules/ninja-keys/dist/base-styles.js
var baseStyles = i`
  :host {
    --ninja-width: 640px;
    --ninja-backdrop-filter: none;
    --ninja-overflow-background: rgba(255, 255, 255, 0.5);
    --ninja-text-color: rgb(60, 65, 73);
    --ninja-font-size: 16px;
    --ninja-top: 20%;

    --ninja-key-border-radius: 0.25em;
    --ninja-accent-color: rgb(110, 94, 210);
    --ninja-secondary-background-color: rgb(239, 241, 244);
    --ninja-secondary-text-color: rgb(107, 111, 118);

    --ninja-selected-background: rgb(248, 249, 251);

    --ninja-icon-color: var(--ninja-secondary-text-color);
    --ninja-icon-size: 1.2em;
    --ninja-separate-border: 1px solid var(--ninja-secondary-background-color);

    --ninja-modal-background: #fff;
    --ninja-modal-shadow: rgb(0 0 0 / 50%) 0px 16px 70px;

    --ninja-actions-height: 300px;
    --ninja-group-text-color: rgb(144, 149, 157);

    --ninja-footer-background: rgba(242, 242, 242, 0.4);

    --ninja-placeholder-color: #8e8e8e;

    font-size: var(--ninja-font-size);

    --ninja-z-index: 1;
  }

  :host(.dark) {
    --ninja-backdrop-filter: none;
    --ninja-overflow-background: rgba(0, 0, 0, 0.7);
    --ninja-text-color: #7d7d7d;

    --ninja-modal-background: rgba(17, 17, 17, 0.85);
    --ninja-accent-color: rgb(110, 94, 210);
    --ninja-secondary-background-color: rgba(51, 51, 51, 0.44);
    --ninja-secondary-text-color: #888;

    --ninja-selected-text-color: #eaeaea;
    --ninja-selected-background: rgba(51, 51, 51, 0.44);

    --ninja-icon-color: var(--ninja-secondary-text-color);
    --ninja-separate-border: 1px solid var(--ninja-secondary-background-color);

    --ninja-modal-shadow: 0 16px 70px rgba(0, 0, 0, 0.2);

    --ninja-group-text-color: rgb(144, 149, 157);

    --ninja-footer-background: rgba(30, 30, 30, 85%);
  }

  .modal {
    display: none;
    position: fixed;
    z-index: var(--ninja-z-index);
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: var(--ninja-overflow-background);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-backdrop-filter: var(--ninja-backdrop-filter);
    backdrop-filter: var(--ninja-backdrop-filter);
    text-align: left;
    color: var(--ninja-text-color);
    font-family: var(--ninja-font-family);
  }
  .modal.visible {
    display: block;
  }

  .modal-content {
    position: relative;
    top: var(--ninja-top);
    margin: auto;
    padding: 0;
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
    -webkit-box-flex: 1;
    flex-grow: 1;
    min-width: 0px;
    will-change: transform;
    background: var(--ninja-modal-background);
    border-radius: 0.5em;
    box-shadow: var(--ninja-modal-shadow);
    max-width: var(--ninja-width);
    overflow: hidden;
  }

  .bump {
    animation: zoom-in-zoom-out 0.2s ease;
  }

  @keyframes zoom-in-zoom-out {
    0% {
      transform: scale(0.99);
    }
    50% {
      transform: scale(1.01, 1.01);
    }
    100% {
      transform: scale(1, 1);
    }
  }

  .ninja-github {
    color: var(--ninja-keys-text-color);
    font-weight: normal;
    text-decoration: none;
  }

  .actions-list {
    max-height: var(--ninja-actions-height);
    overflow: auto;
    scroll-behavior: smooth;
    position: relative;
    margin: 0;
    padding: 0.5em 0;
    list-style: none;
    scroll-behavior: smooth;
  }

  .group-header {
    height: 1.375em;
    line-height: 1.375em;
    padding-left: 1.25em;
    padding-top: 0.5em;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 0.75em;
    line-height: 1em;
    color: var(--ninja-group-text-color);
    margin: 1px 0;
  }

  .modal-footer {
    background: var(--ninja-footer-background);
    padding: 0.5em 1em;
    display: flex;
    /* font-size: 0.75em; */
    border-top: var(--ninja-separate-border);
    color: var(--ninja-secondary-text-color);
  }

  .modal-footer .help {
    display: flex;
    margin-right: 1em;
    align-items: center;
    font-size: 0.75em;
  }

  .ninja-examplekey {
    background: var(--ninja-secondary-background-color);
    padding: 0.06em 0.25em;
    border-radius: var(--ninja-key-border-radius);
    color: var(--ninja-secondary-text-color);
    width: 1em;
    height: 1em;
    margin-right: 0.5em;
    font-size: 1.25em;
    fill: currentColor;
  }
  .ninja-examplekey.esc {
    width: auto;
    height: auto;
    font-size: 1.1em;
  }
  .ninja-examplekey.backspace {
    opacity: 0.7;
  }
`;

// node_modules/ninja-keys/dist/ninja-keys.js
var __decorate4 = function(decorators, target, key, desc) {
  var c6 = arguments.length, r6 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r6 = Reflect.decorate(decorators, target, key, desc);
  else for (var i5 = decorators.length - 1; i5 >= 0; i5--) if (d3 = decorators[i5]) r6 = (c6 < 3 ? d3(r6) : c6 > 3 ? d3(target, key, r6) : d3(target, key)) || r6;
  return c6 > 3 && r6 && Object.defineProperty(target, key, r6), r6;
};
var NinjaKeys = class NinjaKeys2 extends s4 {
  constructor() {
    super(...arguments);
    this.placeholder = "Type a command or search...";
    this.disableHotkeys = false;
    this.hideBreadcrumbs = false;
    this.openHotkey = "cmd+k,ctrl+k";
    this.navigationUpHotkey = "up,shift+tab";
    this.navigationDownHotkey = "down,tab";
    this.closeHotkey = "esc";
    this.goBackHotkey = "backspace";
    this.selectHotkey = "enter";
    this.hotKeysJoinedView = false;
    this.noAutoLoadMdIcons = false;
    this.data = [];
    this.visible = false;
    this._bump = true;
    this._actionMatches = [];
    this._search = "";
    this._flatData = [];
    this._headerRef = e9();
  }
  /**
   * Public methods
   */
  /**
   * Show a modal
   */
  open(options = {}) {
    this._bump = true;
    this.visible = true;
    this._headerRef.value.focusSearch();
    if (this._actionMatches.length > 0) {
      this._selected = this._actionMatches[0];
    }
    this.setParent(options.parent);
  }
  /**
   * Close modal
   */
  close() {
    this._bump = false;
    this.visible = false;
  }
  /**
   * Navigate to group of actions
   * @param parent id of parent group/action
   */
  setParent(parent) {
    if (!parent) {
      this._currentRoot = void 0;
    } else {
      this._currentRoot = parent;
    }
    this._selected = void 0;
    this._search = "";
    this._headerRef.value.setSearch("");
  }
  get breadcrumbs() {
    var _a;
    const path = [];
    let parentAction = (_a = this._selected) === null || _a === void 0 ? void 0 : _a.parent;
    if (parentAction) {
      path.push(parentAction);
      while (parentAction) {
        const action = this._flatData.find((a5) => a5.id === parentAction);
        if (action === null || action === void 0 ? void 0 : action.parent) {
          path.push(action.parent);
        }
        parentAction = action ? action.parent : void 0;
      }
    }
    return path.reverse();
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.noAutoLoadMdIcons) {
      document.fonts.load("24px Material Icons", "apps").then(() => {
      });
    }
    this._registerInternalHotkeys();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._unregisterInternalHotkeys();
  }
  _flattern(members, parent) {
    let children = [];
    if (!members) {
      members = [];
    }
    return members.map((mem) => {
      const alreadyFlatternByUser = mem.children && mem.children.some((value) => {
        return typeof value == "string";
      });
      const m3 = { ...mem, parent: mem.parent || parent };
      if (alreadyFlatternByUser) {
        return m3;
      } else {
        if (m3.children && m3.children.length) {
          parent = mem.id;
          children = [...children, ...m3.children];
        }
        m3.children = m3.children ? m3.children.map((c6) => c6.id) : [];
        return m3;
      }
    }).concat(children.length ? this._flattern(children, parent) : children);
  }
  update(changedProperties) {
    if (changedProperties.has("data") && !this.disableHotkeys) {
      this._flatData = this._flattern(this.data);
      this._flatData.filter((action) => !!action.hotkey).forEach((action) => {
        hotkeys_esm_default(action.hotkey, (event) => {
          event.preventDefault();
          if (action.handler) {
            action.handler(action);
          }
        });
      });
    }
    super.update(changedProperties);
  }
  _registerInternalHotkeys() {
    if (this.openHotkey) {
      hotkeys_esm_default(this.openHotkey, (event) => {
        event.preventDefault();
        this.visible ? this.close() : this.open();
      });
    }
    if (this.selectHotkey) {
      hotkeys_esm_default(this.selectHotkey, (event) => {
        if (!this.visible) {
          return;
        }
        event.preventDefault();
        this._actionSelected(this._actionMatches[this._selectedIndex]);
      });
    }
    if (this.goBackHotkey) {
      hotkeys_esm_default(this.goBackHotkey, (event) => {
        if (!this.visible) {
          return;
        }
        if (!this._search) {
          event.preventDefault();
          this._goBack();
        }
      });
    }
    if (this.navigationDownHotkey) {
      hotkeys_esm_default(this.navigationDownHotkey, (event) => {
        if (!this.visible) {
          return;
        }
        event.preventDefault();
        if (this._selectedIndex >= this._actionMatches.length - 1) {
          this._selected = this._actionMatches[0];
        } else {
          this._selected = this._actionMatches[this._selectedIndex + 1];
        }
      });
    }
    if (this.navigationUpHotkey) {
      hotkeys_esm_default(this.navigationUpHotkey, (event) => {
        if (!this.visible) {
          return;
        }
        event.preventDefault();
        if (this._selectedIndex === 0) {
          this._selected = this._actionMatches[this._actionMatches.length - 1];
        } else {
          this._selected = this._actionMatches[this._selectedIndex - 1];
        }
      });
    }
    if (this.closeHotkey) {
      hotkeys_esm_default(this.closeHotkey, () => {
        if (!this.visible) {
          return;
        }
        this.close();
      });
    }
  }
  _unregisterInternalHotkeys() {
    if (this.openHotkey) {
      hotkeys_esm_default.unbind(this.openHotkey);
    }
    if (this.selectHotkey) {
      hotkeys_esm_default.unbind(this.selectHotkey);
    }
    if (this.goBackHotkey) {
      hotkeys_esm_default.unbind(this.goBackHotkey);
    }
    if (this.navigationDownHotkey) {
      hotkeys_esm_default.unbind(this.navigationDownHotkey);
    }
    if (this.navigationUpHotkey) {
      hotkeys_esm_default.unbind(this.navigationUpHotkey);
    }
    if (this.closeHotkey) {
      hotkeys_esm_default.unbind(this.closeHotkey);
    }
  }
  _actionFocused(index, $event) {
    this._selected = index;
    $event.target.ensureInView();
  }
  _onTransitionEnd() {
    this._bump = false;
  }
  _goBack() {
    const parent = this.breadcrumbs.length > 1 ? this.breadcrumbs[this.breadcrumbs.length - 2] : void 0;
    this.setParent(parent);
  }
  render() {
    const classes = {
      bump: this._bump,
      "modal-content": true
    };
    const menuClasses = {
      visible: this.visible,
      modal: true
    };
    const actionMatches = this._flatData.filter((action) => {
      var _a;
      const regex = new RegExp(this._search, "gi");
      const matcher = action.title.match(regex) || ((_a = action.keywords) === null || _a === void 0 ? void 0 : _a.match(regex));
      if (!this._currentRoot && this._search) {
        return matcher;
      }
      return action.parent === this._currentRoot && matcher;
    });
    const sections = actionMatches.reduce((entryMap, e11) => entryMap.set(e11.section, [...entryMap.get(e11.section) || [], e11]), /* @__PURE__ */ new Map());
    this._actionMatches = [...sections.values()].flat();
    if (this._actionMatches.length > 0 && this._selectedIndex === -1) {
      this._selected = this._actionMatches[0];
    }
    if (this._actionMatches.length === 0) {
      this._selected = void 0;
    }
    const actionsList = (actions) => x` ${c4(actions, (action) => action.id, (action) => {
      var _a;
      return x`<ninja-action
            exportparts="ninja-action,ninja-selected,ninja-icon"
            .selected=${l6(action.id === ((_a = this._selected) === null || _a === void 0 ? void 0 : _a.id))}
            .hotKeysJoinedView=${this.hotKeysJoinedView}
            @mouseover=${(event) => this._actionFocused(action, event)}
            @actionsSelected=${(event) => this._actionSelected(event.detail)}
            .action=${action}
          ></ninja-action>`;
    })}`;
    const itemTemplates = [];
    sections.forEach((actions, section) => {
      const header = section ? x`<div class="group-header">${section}</div>` : void 0;
      itemTemplates.push(x`${header}${actionsList(actions)}`);
    });
    return x`
      <div @click=${this._overlayClick} class=${o8(menuClasses)}>
        <div class=${o8(classes)} @animationend=${this._onTransitionEnd}>
          <ninja-header
            exportparts="ninja-input,ninja-input-wrapper"
            ${n8(this._headerRef)}
            .placeholder=${this.placeholder}
            .hideBreadcrumbs=${this.hideBreadcrumbs}
            .breadcrumbs=${this.breadcrumbs}
            @change=${this._handleInput}
            @setParent=${(event) => this.setParent(event.detail.parent)}
            @close=${this.close}
          >
          </ninja-header>
          <div class="modal-body">
            <div class="actions-list" part="actions-list">${itemTemplates}</div>
          </div>
          <slot name="footer"> ${footerHtml} </slot>
        </div>
      </div>
    `;
  }
  get _selectedIndex() {
    if (!this._selected) {
      return -1;
    }
    return this._actionMatches.indexOf(this._selected);
  }
  _actionSelected(action) {
    var _a;
    this.dispatchEvent(new CustomEvent("selected", {
      detail: { search: this._search, action },
      bubbles: true,
      composed: true
    }));
    if (!action) {
      return;
    }
    if (action.children && ((_a = action.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
      this._currentRoot = action.id;
      this._search = "";
    }
    this._headerRef.value.setSearch("");
    this._headerRef.value.focusSearch();
    if (action.handler) {
      const result = action.handler(action);
      if (!(result === null || result === void 0 ? void 0 : result.keepOpen)) {
        this.close();
      }
    }
    this._bump = true;
  }
  async _handleInput(event) {
    this._search = event.detail.search;
    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("change", {
      detail: { search: this._search, actions: this._actionMatches },
      bubbles: true,
      composed: true
    }));
  }
  _overlayClick(event) {
    var _a;
    if ((_a = event.target) === null || _a === void 0 ? void 0 : _a.classList.contains("modal")) {
      this.close();
    }
  }
};
NinjaKeys.styles = [baseStyles];
__decorate4([
  n5({ type: String })
], NinjaKeys.prototype, "placeholder", void 0);
__decorate4([
  n5({ type: Boolean })
], NinjaKeys.prototype, "disableHotkeys", void 0);
__decorate4([
  n5({ type: Boolean })
], NinjaKeys.prototype, "hideBreadcrumbs", void 0);
__decorate4([
  n5()
], NinjaKeys.prototype, "openHotkey", void 0);
__decorate4([
  n5()
], NinjaKeys.prototype, "navigationUpHotkey", void 0);
__decorate4([
  n5()
], NinjaKeys.prototype, "navigationDownHotkey", void 0);
__decorate4([
  n5()
], NinjaKeys.prototype, "closeHotkey", void 0);
__decorate4([
  n5()
], NinjaKeys.prototype, "goBackHotkey", void 0);
__decorate4([
  n5()
], NinjaKeys.prototype, "selectHotkey", void 0);
__decorate4([
  n5({ type: Boolean })
], NinjaKeys.prototype, "hotKeysJoinedView", void 0);
__decorate4([
  n5({ type: Boolean })
], NinjaKeys.prototype, "noAutoLoadMdIcons", void 0);
__decorate4([
  n5({
    type: Array,
    hasChanged() {
      return true;
    }
  })
], NinjaKeys.prototype, "data", void 0);
__decorate4([
  t3()
], NinjaKeys.prototype, "visible", void 0);
__decorate4([
  t3()
], NinjaKeys.prototype, "_bump", void 0);
__decorate4([
  t3()
], NinjaKeys.prototype, "_actionMatches", void 0);
__decorate4([
  t3()
], NinjaKeys.prototype, "_search", void 0);
__decorate4([
  t3()
], NinjaKeys.prototype, "_currentRoot", void 0);
__decorate4([
  t3()
], NinjaKeys.prototype, "_flatData", void 0);
__decorate4([
  t3()
], NinjaKeys.prototype, "breadcrumbs", null);
__decorate4([
  t3()
], NinjaKeys.prototype, "_selected", void 0);
NinjaKeys = __decorate4([
  e4("ninja-keys")
], NinjaKeys);
export {
  NinjaKeys
};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
lit-html/directive.js:
lit-html/directives/repeat.js:
lit-html/async-directive.js:
lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
lit-html/directives/join.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
lit-html/directives/live.js:
lit-html/directives/ref.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

hotkeys-js/dist/hotkeys.esm.js:
  (*!
   * hotkeys-js v3.8.7
   * A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies.
   * 
   * Copyright (c) 2021 kenny wong <wowohoo@qq.com>
   * http://jaywcjlove.github.io/hotkeys
   * 
   * Licensed under the MIT license.
   *)

@material/mwc-icon/mwc-icon-host.css.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-LIcense-Identifier: Apache-2.0
   *)

@material/mwc-icon/mwc-icon.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
