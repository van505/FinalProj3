/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@kurkle/color/dist/color.esm.js":
/*!******************************************************!*\
  !*** ./node_modules/@kurkle/color/dist/color.esm.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Color: () => (/* binding */ Color),
/* harmony export */   b2n: () => (/* binding */ b2n),
/* harmony export */   b2p: () => (/* binding */ b2p),
/* harmony export */   "default": () => (/* binding */ index_esm),
/* harmony export */   hexParse: () => (/* binding */ hexParse),
/* harmony export */   hexString: () => (/* binding */ hexString),
/* harmony export */   hsl2rgb: () => (/* binding */ hsl2rgb),
/* harmony export */   hslString: () => (/* binding */ hslString),
/* harmony export */   hsv2rgb: () => (/* binding */ hsv2rgb),
/* harmony export */   hueParse: () => (/* binding */ hueParse),
/* harmony export */   hwb2rgb: () => (/* binding */ hwb2rgb),
/* harmony export */   lim: () => (/* binding */ lim),
/* harmony export */   n2b: () => (/* binding */ n2b),
/* harmony export */   n2p: () => (/* binding */ n2p),
/* harmony export */   nameParse: () => (/* binding */ nameParse),
/* harmony export */   p2b: () => (/* binding */ p2b),
/* harmony export */   rgb2hsl: () => (/* binding */ rgb2hsl),
/* harmony export */   rgbParse: () => (/* binding */ rgbParse),
/* harmony export */   rgbString: () => (/* binding */ rgbString),
/* harmony export */   rotate: () => (/* binding */ rotate),
/* harmony export */   round: () => (/* binding */ round)
/* harmony export */ });
/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */
function round(v) {
  return v + 0.5 | 0;
}
const lim = (v, l, h) => Math.max(Math.min(v, h), l);
function p2b(v) {
  return lim(round(v * 2.55), 0, 255);
}
function b2p(v) {
  return lim(round(v / 2.55), 0, 100);
}
function n2b(v) {
  return lim(round(v * 255), 0, 255);
}
function b2n(v) {
  return lim(round(v / 2.55) / 100, 0, 1);
}
function n2p(v) {
  return lim(round(v * 100), 0, 100);
}

const map$1 = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15};
const hex = [...'0123456789ABCDEF'];
const h1 = b => hex[b & 0xF];
const h2 = b => hex[(b & 0xF0) >> 4] + hex[b & 0xF];
const eq = b => ((b & 0xF0) >> 4) === (b & 0xF);
const isShort = v => eq(v.r) && eq(v.g) && eq(v.b) && eq(v.a);
function hexParse(str) {
  var len = str.length;
  var ret;
  if (str[0] === '#') {
    if (len === 4 || len === 5) {
      ret = {
        r: 255 & map$1[str[1]] * 17,
        g: 255 & map$1[str[2]] * 17,
        b: 255 & map$1[str[3]] * 17,
        a: len === 5 ? map$1[str[4]] * 17 : 255
      };
    } else if (len === 7 || len === 9) {
      ret = {
        r: map$1[str[1]] << 4 | map$1[str[2]],
        g: map$1[str[3]] << 4 | map$1[str[4]],
        b: map$1[str[5]] << 4 | map$1[str[6]],
        a: len === 9 ? (map$1[str[7]] << 4 | map$1[str[8]]) : 255
      };
    }
  }
  return ret;
}
const alpha = (a, f) => a < 255 ? f(a) : '';
function hexString(v) {
  var f = isShort(v) ? h1 : h2;
  return v
    ? '#' + f(v.r) + f(v.g) + f(v.b) + alpha(v.a, f)
    : undefined;
}

const HUE_RE = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function hsl2rgbn(h, s, l) {
  const a = s * Math.min(l, 1 - l);
  const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return [f(0), f(8), f(4)];
}
function hsv2rgbn(h, s, v) {
  const f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  return [f(5), f(3), f(1)];
}
function hwb2rgbn(h, w, b) {
  const rgb = hsl2rgbn(h, 1, 0.5);
  let i;
  if (w + b > 1) {
    i = 1 / (w + b);
    w *= i;
    b *= i;
  }
  for (i = 0; i < 3; i++) {
    rgb[i] *= 1 - w - b;
    rgb[i] += w;
  }
  return rgb;
}
function hueValue(r, g, b, d, max) {
  if (r === max) {
    return ((g - b) / d) + (g < b ? 6 : 0);
  }
  if (g === max) {
    return (b - r) / d + 2;
  }
  return (r - g) / d + 4;
}
function rgb2hsl(v) {
  const range = 255;
  const r = v.r / range;
  const g = v.g / range;
  const b = v.b / range;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h, s, d;
  if (max !== min) {
    d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = hueValue(r, g, b, d, max);
    h = h * 60 + 0.5;
  }
  return [h | 0, s || 0, l];
}
function calln(f, a, b, c) {
  return (
    Array.isArray(a)
      ? f(a[0], a[1], a[2])
      : f(a, b, c)
  ).map(n2b);
}
function hsl2rgb(h, s, l) {
  return calln(hsl2rgbn, h, s, l);
}
function hwb2rgb(h, w, b) {
  return calln(hwb2rgbn, h, w, b);
}
function hsv2rgb(h, s, v) {
  return calln(hsv2rgbn, h, s, v);
}
function hue(h) {
  return (h % 360 + 360) % 360;
}
function hueParse(str) {
  const m = HUE_RE.exec(str);
  let a = 255;
  let v;
  if (!m) {
    return;
  }
  if (m[5] !== v) {
    a = m[6] ? p2b(+m[5]) : n2b(+m[5]);
  }
  const h = hue(+m[2]);
  const p1 = +m[3] / 100;
  const p2 = +m[4] / 100;
  if (m[1] === 'hwb') {
    v = hwb2rgb(h, p1, p2);
  } else if (m[1] === 'hsv') {
    v = hsv2rgb(h, p1, p2);
  } else {
    v = hsl2rgb(h, p1, p2);
  }
  return {
    r: v[0],
    g: v[1],
    b: v[2],
    a: a
  };
}
function rotate(v, deg) {
  var h = rgb2hsl(v);
  h[0] = hue(h[0] + deg);
  h = hsl2rgb(h);
  v.r = h[0];
  v.g = h[1];
  v.b = h[2];
}
function hslString(v) {
  if (!v) {
    return;
  }
  const a = rgb2hsl(v);
  const h = a[0];
  const s = n2p(a[1]);
  const l = n2p(a[2]);
  return v.a < 255
    ? `hsla(${h}, ${s}%, ${l}%, ${b2n(v.a)})`
    : `hsl(${h}, ${s}%, ${l}%)`;
}

const map = {
	x: 'dark',
	Z: 'light',
	Y: 're',
	X: 'blu',
	W: 'gr',
	V: 'medium',
	U: 'slate',
	A: 'ee',
	T: 'ol',
	S: 'or',
	B: 'ra',
	C: 'lateg',
	D: 'ights',
	R: 'in',
	Q: 'turquois',
	E: 'hi',
	P: 'ro',
	O: 'al',
	N: 'le',
	M: 'de',
	L: 'yello',
	F: 'en',
	K: 'ch',
	G: 'arks',
	H: 'ea',
	I: 'ightg',
	J: 'wh'
};
const names$1 = {
	OiceXe: 'f0f8ff',
	antiquewEte: 'faebd7',
	aqua: 'ffff',
	aquamarRe: '7fffd4',
	azuY: 'f0ffff',
	beige: 'f5f5dc',
	bisque: 'ffe4c4',
	black: '0',
	blanKedOmond: 'ffebcd',
	Xe: 'ff',
	XeviTet: '8a2be2',
	bPwn: 'a52a2a',
	burlywood: 'deb887',
	caMtXe: '5f9ea0',
	KartYuse: '7fff00',
	KocTate: 'd2691e',
	cSO: 'ff7f50',
	cSnflowerXe: '6495ed',
	cSnsilk: 'fff8dc',
	crimson: 'dc143c',
	cyan: 'ffff',
	xXe: '8b',
	xcyan: '8b8b',
	xgTMnPd: 'b8860b',
	xWay: 'a9a9a9',
	xgYF: '6400',
	xgYy: 'a9a9a9',
	xkhaki: 'bdb76b',
	xmagFta: '8b008b',
	xTivegYF: '556b2f',
	xSange: 'ff8c00',
	xScEd: '9932cc',
	xYd: '8b0000',
	xsOmon: 'e9967a',
	xsHgYF: '8fbc8f',
	xUXe: '483d8b',
	xUWay: '2f4f4f',
	xUgYy: '2f4f4f',
	xQe: 'ced1',
	xviTet: '9400d3',
	dAppRk: 'ff1493',
	dApskyXe: 'bfff',
	dimWay: '696969',
	dimgYy: '696969',
	dodgerXe: '1e90ff',
	fiYbrick: 'b22222',
	flSOwEte: 'fffaf0',
	foYstWAn: '228b22',
	fuKsia: 'ff00ff',
	gaRsbSo: 'dcdcdc',
	ghostwEte: 'f8f8ff',
	gTd: 'ffd700',
	gTMnPd: 'daa520',
	Way: '808080',
	gYF: '8000',
	gYFLw: 'adff2f',
	gYy: '808080',
	honeyMw: 'f0fff0',
	hotpRk: 'ff69b4',
	RdianYd: 'cd5c5c',
	Rdigo: '4b0082',
	ivSy: 'fffff0',
	khaki: 'f0e68c',
	lavFMr: 'e6e6fa',
	lavFMrXsh: 'fff0f5',
	lawngYF: '7cfc00',
	NmoncEffon: 'fffacd',
	ZXe: 'add8e6',
	ZcSO: 'f08080',
	Zcyan: 'e0ffff',
	ZgTMnPdLw: 'fafad2',
	ZWay: 'd3d3d3',
	ZgYF: '90ee90',
	ZgYy: 'd3d3d3',
	ZpRk: 'ffb6c1',
	ZsOmon: 'ffa07a',
	ZsHgYF: '20b2aa',
	ZskyXe: '87cefa',
	ZUWay: '778899',
	ZUgYy: '778899',
	ZstAlXe: 'b0c4de',
	ZLw: 'ffffe0',
	lime: 'ff00',
	limegYF: '32cd32',
	lRF: 'faf0e6',
	magFta: 'ff00ff',
	maPon: '800000',
	VaquamarRe: '66cdaa',
	VXe: 'cd',
	VScEd: 'ba55d3',
	VpurpN: '9370db',
	VsHgYF: '3cb371',
	VUXe: '7b68ee',
	VsprRggYF: 'fa9a',
	VQe: '48d1cc',
	VviTetYd: 'c71585',
	midnightXe: '191970',
	mRtcYam: 'f5fffa',
	mistyPse: 'ffe4e1',
	moccasR: 'ffe4b5',
	navajowEte: 'ffdead',
	navy: '80',
	Tdlace: 'fdf5e6',
	Tive: '808000',
	TivedBb: '6b8e23',
	Sange: 'ffa500',
	SangeYd: 'ff4500',
	ScEd: 'da70d6',
	pOegTMnPd: 'eee8aa',
	pOegYF: '98fb98',
	pOeQe: 'afeeee',
	pOeviTetYd: 'db7093',
	papayawEp: 'ffefd5',
	pHKpuff: 'ffdab9',
	peru: 'cd853f',
	pRk: 'ffc0cb',
	plum: 'dda0dd',
	powMrXe: 'b0e0e6',
	purpN: '800080',
	YbeccapurpN: '663399',
	Yd: 'ff0000',
	Psybrown: 'bc8f8f',
	PyOXe: '4169e1',
	saddNbPwn: '8b4513',
	sOmon: 'fa8072',
	sandybPwn: 'f4a460',
	sHgYF: '2e8b57',
	sHshell: 'fff5ee',
	siFna: 'a0522d',
	silver: 'c0c0c0',
	skyXe: '87ceeb',
	UXe: '6a5acd',
	UWay: '708090',
	UgYy: '708090',
	snow: 'fffafa',
	sprRggYF: 'ff7f',
	stAlXe: '4682b4',
	tan: 'd2b48c',
	teO: '8080',
	tEstN: 'd8bfd8',
	tomato: 'ff6347',
	Qe: '40e0d0',
	viTet: 'ee82ee',
	JHt: 'f5deb3',
	wEte: 'ffffff',
	wEtesmoke: 'f5f5f5',
	Lw: 'ffff00',
	LwgYF: '9acd32'
};
function unpack() {
  const unpacked = {};
  const keys = Object.keys(names$1);
  const tkeys = Object.keys(map);
  let i, j, k, ok, nk;
  for (i = 0; i < keys.length; i++) {
    ok = nk = keys[i];
    for (j = 0; j < tkeys.length; j++) {
      k = tkeys[j];
      nk = nk.replace(k, map[k]);
    }
    k = parseInt(names$1[ok], 16);
    unpacked[nk] = [k >> 16 & 0xFF, k >> 8 & 0xFF, k & 0xFF];
  }
  return unpacked;
}

let names;
function nameParse(str) {
  if (!names) {
    names = unpack();
    names.transparent = [0, 0, 0, 0];
  }
  const a = names[str.toLowerCase()];
  return a && {
    r: a[0],
    g: a[1],
    b: a[2],
    a: a.length === 4 ? a[3] : 255
  };
}

const RGB_RE = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function rgbParse(str) {
  const m = RGB_RE.exec(str);
  let a = 255;
  let r, g, b;
  if (!m) {
    return;
  }
  if (m[7] !== r) {
    const v = +m[7];
    a = m[8] ? p2b(v) : lim(v * 255, 0, 255);
  }
  r = +m[1];
  g = +m[3];
  b = +m[5];
  r = 255 & (m[2] ? p2b(r) : lim(r, 0, 255));
  g = 255 & (m[4] ? p2b(g) : lim(g, 0, 255));
  b = 255 & (m[6] ? p2b(b) : lim(b, 0, 255));
  return {
    r: r,
    g: g,
    b: b,
    a: a
  };
}
function rgbString(v) {
  return v && (
    v.a < 255
      ? `rgba(${v.r}, ${v.g}, ${v.b}, ${b2n(v.a)})`
      : `rgb(${v.r}, ${v.g}, ${v.b})`
  );
}

const to = v => v <= 0.0031308 ? v * 12.92 : Math.pow(v, 1.0 / 2.4) * 1.055 - 0.055;
const from = v => v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
function interpolate(rgb1, rgb2, t) {
  const r = from(b2n(rgb1.r));
  const g = from(b2n(rgb1.g));
  const b = from(b2n(rgb1.b));
  return {
    r: n2b(to(r + t * (from(b2n(rgb2.r)) - r))),
    g: n2b(to(g + t * (from(b2n(rgb2.g)) - g))),
    b: n2b(to(b + t * (from(b2n(rgb2.b)) - b))),
    a: rgb1.a + t * (rgb2.a - rgb1.a)
  };
}

function modHSL(v, i, ratio) {
  if (v) {
    let tmp = rgb2hsl(v);
    tmp[i] = Math.max(0, Math.min(tmp[i] + tmp[i] * ratio, i === 0 ? 360 : 1));
    tmp = hsl2rgb(tmp);
    v.r = tmp[0];
    v.g = tmp[1];
    v.b = tmp[2];
  }
}
function clone(v, proto) {
  return v ? Object.assign(proto || {}, v) : v;
}
function fromObject(input) {
  var v = {r: 0, g: 0, b: 0, a: 255};
  if (Array.isArray(input)) {
    if (input.length >= 3) {
      v = {r: input[0], g: input[1], b: input[2], a: 255};
      if (input.length > 3) {
        v.a = n2b(input[3]);
      }
    }
  } else {
    v = clone(input, {r: 0, g: 0, b: 0, a: 1});
    v.a = n2b(v.a);
  }
  return v;
}
function functionParse(str) {
  if (str.charAt(0) === 'r') {
    return rgbParse(str);
  }
  return hueParse(str);
}
class Color {
  constructor(input) {
    if (input instanceof Color) {
      return input;
    }
    const type = typeof input;
    let v;
    if (type === 'object') {
      v = fromObject(input);
    } else if (type === 'string') {
      v = hexParse(input) || nameParse(input) || functionParse(input);
    }
    this._rgb = v;
    this._valid = !!v;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var v = clone(this._rgb);
    if (v) {
      v.a = b2n(v.a);
    }
    return v;
  }
  set rgb(obj) {
    this._rgb = fromObject(obj);
  }
  rgbString() {
    return this._valid ? rgbString(this._rgb) : undefined;
  }
  hexString() {
    return this._valid ? hexString(this._rgb) : undefined;
  }
  hslString() {
    return this._valid ? hslString(this._rgb) : undefined;
  }
  mix(color, weight) {
    if (color) {
      const c1 = this.rgb;
      const c2 = color.rgb;
      let w2;
      const p = weight === w2 ? 0.5 : weight;
      const w = 2 * p - 1;
      const a = c1.a - c2.a;
      const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
      w2 = 1 - w1;
      c1.r = 0xFF & w1 * c1.r + w2 * c2.r + 0.5;
      c1.g = 0xFF & w1 * c1.g + w2 * c2.g + 0.5;
      c1.b = 0xFF & w1 * c1.b + w2 * c2.b + 0.5;
      c1.a = p * c1.a + (1 - p) * c2.a;
      this.rgb = c1;
    }
    return this;
  }
  interpolate(color, t) {
    if (color) {
      this._rgb = interpolate(this._rgb, color._rgb, t);
    }
    return this;
  }
  clone() {
    return new Color(this.rgb);
  }
  alpha(a) {
    this._rgb.a = n2b(a);
    return this;
  }
  clearer(ratio) {
    const rgb = this._rgb;
    rgb.a *= 1 - ratio;
    return this;
  }
  greyscale() {
    const rgb = this._rgb;
    const val = round(rgb.r * 0.3 + rgb.g * 0.59 + rgb.b * 0.11);
    rgb.r = rgb.g = rgb.b = val;
    return this;
  }
  opaquer(ratio) {
    const rgb = this._rgb;
    rgb.a *= 1 + ratio;
    return this;
  }
  negate() {
    const v = this._rgb;
    v.r = 255 - v.r;
    v.g = 255 - v.g;
    v.b = 255 - v.b;
    return this;
  }
  lighten(ratio) {
    modHSL(this._rgb, 2, ratio);
    return this;
  }
  darken(ratio) {
    modHSL(this._rgb, 2, -ratio);
    return this;
  }
  saturate(ratio) {
    modHSL(this._rgb, 1, ratio);
    return this;
  }
  desaturate(ratio) {
    modHSL(this._rgb, 1, -ratio);
    return this;
  }
  rotate(deg) {
    rotate(this._rgb, deg);
    return this;
  }
}

function index_esm(input) {
  return new Color(input);
}




/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports["default"] = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var validator = __webpack_require__(/*! ../helpers/validator */ "./node_modules/axios/lib/helpers/validator.js");

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      forcedJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      clarifyTimeoutError: validators.transitional(validators.boolean, '1.0.0')
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ "./node_modules/process/browser.js");


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");
var enhanceError = __webpack_require__(/*! ./core/enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var pkg = __webpack_require__(/*! ./../../package.json */ "./node_modules/axios/package.json");

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};
var currentVerArr = pkg.version.split('.');

/**
 * Compare package versions
 * @param {string} version
 * @param {string?} thanVersion
 * @returns {boolean}
 */
function isOlderVersion(version, thanVersion) {
  var pkgVersionArr = thanVersion ? thanVersion.split('.') : currentVerArr;
  var destVer = version.split('.');
  for (var i = 0; i < 3; i++) {
    if (pkgVersionArr[i] > destVer[i]) {
      return true;
    } else if (pkgVersionArr[i] < destVer[i]) {
      return false;
    }
  }
  return false;
}

/**
 * Transitional option validator
 * @param {function|boolean?} validator
 * @param {string?} version
 * @param {string} message
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  var isDeprecated = version && isOlderVersion(version);

  function formatMessage(opt, desc) {
    return '[Axios v' + pkg.version + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed in ' + version));
    }

    if (isDeprecated && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  isOlderVersion: isOlderVersion,
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "./node_modules/axios/package.json":
/*!*****************************************!*\
  !*** ./node_modules/axios/package.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"name":"axios","version":"0.21.4","description":"Promise based HTTP client for the browser and node.js","main":"index.js","scripts":{"test":"grunt test","start":"node ./sandbox/server.js","build":"NODE_ENV=production grunt build","preversion":"npm test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json","postversion":"git push && git push --tags","examples":"node ./examples/server.js","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","fix":"eslint --fix lib/**/*.js"},"repository":{"type":"git","url":"https://github.com/axios/axios.git"},"keywords":["xhr","http","ajax","promise","node"],"author":"Matt Zabriskie","license":"MIT","bugs":{"url":"https://github.com/axios/axios/issues"},"homepage":"https://axios-http.com","devDependencies":{"coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^8.2.1","sinon":"^4.5.0","terser-webpack-plugin":"^4.2.3","typescript":"^4.0.5","url-search-params":"^0.10.0","webpack":"^4.44.2","webpack-dev-server":"^3.11.0"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"jsdelivr":"dist/axios.min.js","unpkg":"dist/axios.min.js","typings":"./index.d.ts","dependencies":{"follow-redirects":"^1.14.0"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}]}');

/***/ }),

/***/ "./node_modules/chart.js/auto/auto.js":
/*!********************************************!*\
  !*** ./node_modules/chart.js/auto/auto.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Animation: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Animation),
/* harmony export */   Animations: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Animations),
/* harmony export */   ArcElement: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.ArcElement),
/* harmony export */   BarController: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.BarController),
/* harmony export */   BarElement: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.BarElement),
/* harmony export */   BasePlatform: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.BasePlatform),
/* harmony export */   BasicPlatform: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.BasicPlatform),
/* harmony export */   BubbleController: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.BubbleController),
/* harmony export */   CategoryScale: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.CategoryScale),
/* harmony export */   Chart: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart),
/* harmony export */   Colors: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Colors),
/* harmony export */   DatasetController: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.DatasetController),
/* harmony export */   Decimation: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Decimation),
/* harmony export */   DomPlatform: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.DomPlatform),
/* harmony export */   DoughnutController: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.DoughnutController),
/* harmony export */   Element: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Element),
/* harmony export */   Filler: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Filler),
/* harmony export */   Interaction: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Interaction),
/* harmony export */   Legend: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Legend),
/* harmony export */   LineController: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.LineController),
/* harmony export */   LineElement: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.LineElement),
/* harmony export */   LinearScale: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.LinearScale),
/* harmony export */   LogarithmicScale: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.LogarithmicScale),
/* harmony export */   PieController: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.PieController),
/* harmony export */   PointElement: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.PointElement),
/* harmony export */   PolarAreaController: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.PolarAreaController),
/* harmony export */   RadarController: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.RadarController),
/* harmony export */   RadialLinearScale: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.RadialLinearScale),
/* harmony export */   Scale: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Scale),
/* harmony export */   ScatterController: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.ScatterController),
/* harmony export */   SubTitle: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.SubTitle),
/* harmony export */   Ticks: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Ticks),
/* harmony export */   TimeScale: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.TimeScale),
/* harmony export */   TimeSeriesScale: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.TimeSeriesScale),
/* harmony export */   Title: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Title),
/* harmony export */   Tooltip: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Tooltip),
/* harmony export */   _adapters: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__._adapters),
/* harmony export */   _detectPlatform: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__._detectPlatform),
/* harmony export */   animator: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.animator),
/* harmony export */   controllers: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.controllers),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   defaults: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.defaults),
/* harmony export */   elements: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.elements),
/* harmony export */   layouts: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.layouts),
/* harmony export */   plugins: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.plugins),
/* harmony export */   registerables: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.registerables),
/* harmony export */   registry: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.registry),
/* harmony export */   scales: () => (/* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.scales)
/* harmony export */ });
/* harmony import */ var _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dist/chart.js */ "./node_modules/chart.js/dist/chart.js");


_dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.register(..._dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.registerables);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart);


/***/ }),

/***/ "./node_modules/chart.js/dist/chart.js":
/*!*********************************************!*\
  !*** ./node_modules/chart.js/dist/chart.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Animation: () => (/* binding */ Animation),
/* harmony export */   Animations: () => (/* binding */ Animations),
/* harmony export */   ArcElement: () => (/* binding */ ArcElement),
/* harmony export */   BarController: () => (/* binding */ BarController),
/* harmony export */   BarElement: () => (/* binding */ BarElement),
/* harmony export */   BasePlatform: () => (/* binding */ BasePlatform),
/* harmony export */   BasicPlatform: () => (/* binding */ BasicPlatform),
/* harmony export */   BubbleController: () => (/* binding */ BubbleController),
/* harmony export */   CategoryScale: () => (/* binding */ CategoryScale),
/* harmony export */   Chart: () => (/* binding */ Chart),
/* harmony export */   Colors: () => (/* binding */ plugin_colors),
/* harmony export */   DatasetController: () => (/* binding */ DatasetController),
/* harmony export */   Decimation: () => (/* binding */ plugin_decimation),
/* harmony export */   DomPlatform: () => (/* binding */ DomPlatform),
/* harmony export */   DoughnutController: () => (/* binding */ DoughnutController),
/* harmony export */   Element: () => (/* binding */ Element),
/* harmony export */   Filler: () => (/* binding */ index),
/* harmony export */   Interaction: () => (/* binding */ Interaction),
/* harmony export */   Legend: () => (/* binding */ plugin_legend),
/* harmony export */   LineController: () => (/* binding */ LineController),
/* harmony export */   LineElement: () => (/* binding */ LineElement),
/* harmony export */   LinearScale: () => (/* binding */ LinearScale),
/* harmony export */   LogarithmicScale: () => (/* binding */ LogarithmicScale),
/* harmony export */   PieController: () => (/* binding */ PieController),
/* harmony export */   PointElement: () => (/* binding */ PointElement),
/* harmony export */   PolarAreaController: () => (/* binding */ PolarAreaController),
/* harmony export */   RadarController: () => (/* binding */ RadarController),
/* harmony export */   RadialLinearScale: () => (/* binding */ RadialLinearScale),
/* harmony export */   Scale: () => (/* binding */ Scale),
/* harmony export */   ScatterController: () => (/* binding */ ScatterController),
/* harmony export */   SubTitle: () => (/* binding */ plugin_subtitle),
/* harmony export */   Ticks: () => (/* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aM),
/* harmony export */   TimeScale: () => (/* binding */ TimeScale),
/* harmony export */   TimeSeriesScale: () => (/* binding */ TimeSeriesScale),
/* harmony export */   Title: () => (/* binding */ plugin_title),
/* harmony export */   Tooltip: () => (/* binding */ plugin_tooltip),
/* harmony export */   _adapters: () => (/* binding */ adapters),
/* harmony export */   _detectPlatform: () => (/* binding */ _detectPlatform),
/* harmony export */   animator: () => (/* binding */ animator),
/* harmony export */   controllers: () => (/* binding */ controllers),
/* harmony export */   defaults: () => (/* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.d),
/* harmony export */   elements: () => (/* binding */ elements),
/* harmony export */   layouts: () => (/* binding */ layouts),
/* harmony export */   plugins: () => (/* binding */ plugins),
/* harmony export */   registerables: () => (/* binding */ registerables),
/* harmony export */   registry: () => (/* binding */ registry),
/* harmony export */   scales: () => (/* binding */ scales)
/* harmony export */ });
/* harmony import */ var _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunks/helpers.dataset.js */ "./node_modules/chart.js/dist/chunks/helpers.dataset.js");
/*!
 * Chart.js v4.5.0
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */



class Animator {
    constructor(){
        this._request = null;
        this._charts = new Map();
        this._running = false;
        this._lastDate = undefined;
    }
 _notify(chart, anims, date, type) {
        const callbacks = anims.listeners[type];
        const numSteps = anims.duration;
        callbacks.forEach((fn)=>fn({
                chart,
                initial: anims.initial,
                numSteps,
                currentStep: Math.min(date - anims.start, numSteps)
            }));
    }
 _refresh() {
        if (this._request) {
            return;
        }
        this._running = true;
        this._request = _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.r.call(window, ()=>{
            this._update();
            this._request = null;
            if (this._running) {
                this._refresh();
            }
        });
    }
 _update(date = Date.now()) {
        let remaining = 0;
        this._charts.forEach((anims, chart)=>{
            if (!anims.running || !anims.items.length) {
                return;
            }
            const items = anims.items;
            let i = items.length - 1;
            let draw = false;
            let item;
            for(; i >= 0; --i){
                item = items[i];
                if (item._active) {
                    if (item._total > anims.duration) {
                        anims.duration = item._total;
                    }
                    item.tick(date);
                    draw = true;
                } else {
                    items[i] = items[items.length - 1];
                    items.pop();
                }
            }
            if (draw) {
                chart.draw();
                this._notify(chart, anims, date, 'progress');
            }
            if (!items.length) {
                anims.running = false;
                this._notify(chart, anims, date, 'complete');
                anims.initial = false;
            }
            remaining += items.length;
        });
        this._lastDate = date;
        if (remaining === 0) {
            this._running = false;
        }
    }
 _getAnims(chart) {
        const charts = this._charts;
        let anims = charts.get(chart);
        if (!anims) {
            anims = {
                running: false,
                initial: true,
                items: [],
                listeners: {
                    complete: [],
                    progress: []
                }
            };
            charts.set(chart, anims);
        }
        return anims;
    }
 listen(chart, event, cb) {
        this._getAnims(chart).listeners[event].push(cb);
    }
 add(chart, items) {
        if (!items || !items.length) {
            return;
        }
        this._getAnims(chart).items.push(...items);
    }
 has(chart) {
        return this._getAnims(chart).items.length > 0;
    }
 start(chart) {
        const anims = this._charts.get(chart);
        if (!anims) {
            return;
        }
        anims.running = true;
        anims.start = Date.now();
        anims.duration = anims.items.reduce((acc, cur)=>Math.max(acc, cur._duration), 0);
        this._refresh();
    }
    running(chart) {
        if (!this._running) {
            return false;
        }
        const anims = this._charts.get(chart);
        if (!anims || !anims.running || !anims.items.length) {
            return false;
        }
        return true;
    }
 stop(chart) {
        const anims = this._charts.get(chart);
        if (!anims || !anims.items.length) {
            return;
        }
        const items = anims.items;
        let i = items.length - 1;
        for(; i >= 0; --i){
            items[i].cancel();
        }
        anims.items = [];
        this._notify(chart, anims, Date.now(), 'complete');
    }
 remove(chart) {
        return this._charts.delete(chart);
    }
}
var animator = /* #__PURE__ */ new Animator();

const transparent = 'transparent';
const interpolators = {
    boolean (from, to, factor) {
        return factor > 0.5 ? to : from;
    },
 color (from, to, factor) {
        const c0 = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.c)(from || transparent);
        const c1 = c0.valid && (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.c)(to || transparent);
        return c1 && c1.valid ? c1.mix(c0, factor).hexString() : to;
    },
    number (from, to, factor) {
        return from + (to - from) * factor;
    }
};
class Animation {
    constructor(cfg, target, prop, to){
        const currentValue = target[prop];
        to = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a)([
            cfg.to,
            to,
            currentValue,
            cfg.from
        ]);
        const from = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a)([
            cfg.from,
            currentValue,
            to
        ]);
        this._active = true;
        this._fn = cfg.fn || interpolators[cfg.type || typeof from];
        this._easing = _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.e[cfg.easing] || _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.e.linear;
        this._start = Math.floor(Date.now() + (cfg.delay || 0));
        this._duration = this._total = Math.floor(cfg.duration);
        this._loop = !!cfg.loop;
        this._target = target;
        this._prop = prop;
        this._from = from;
        this._to = to;
        this._promises = undefined;
    }
    active() {
        return this._active;
    }
    update(cfg, to, date) {
        if (this._active) {
            this._notify(false);
            const currentValue = this._target[this._prop];
            const elapsed = date - this._start;
            const remain = this._duration - elapsed;
            this._start = date;
            this._duration = Math.floor(Math.max(remain, cfg.duration));
            this._total += elapsed;
            this._loop = !!cfg.loop;
            this._to = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a)([
                cfg.to,
                to,
                currentValue,
                cfg.from
            ]);
            this._from = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a)([
                cfg.from,
                currentValue,
                to
            ]);
        }
    }
    cancel() {
        if (this._active) {
            this.tick(Date.now());
            this._active = false;
            this._notify(false);
        }
    }
    tick(date) {
        const elapsed = date - this._start;
        const duration = this._duration;
        const prop = this._prop;
        const from = this._from;
        const loop = this._loop;
        const to = this._to;
        let factor;
        this._active = from !== to && (loop || elapsed < duration);
        if (!this._active) {
            this._target[prop] = to;
            this._notify(true);
            return;
        }
        if (elapsed < 0) {
            this._target[prop] = from;
            return;
        }
        factor = elapsed / duration % 2;
        factor = loop && factor > 1 ? 2 - factor : factor;
        factor = this._easing(Math.min(1, Math.max(0, factor)));
        this._target[prop] = this._fn(from, to, factor);
    }
    wait() {
        const promises = this._promises || (this._promises = []);
        return new Promise((res, rej)=>{
            promises.push({
                res,
                rej
            });
        });
    }
    _notify(resolved) {
        const method = resolved ? 'res' : 'rej';
        const promises = this._promises || [];
        for(let i = 0; i < promises.length; i++){
            promises[i][method]();
        }
    }
}

class Animations {
    constructor(chart, config){
        this._chart = chart;
        this._properties = new Map();
        this.configure(config);
    }
    configure(config) {
        if (!(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.i)(config)) {
            return;
        }
        const animationOptions = Object.keys(_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.d.animation);
        const animatedProps = this._properties;
        Object.getOwnPropertyNames(config).forEach((key)=>{
            const cfg = config[key];
            if (!(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.i)(cfg)) {
                return;
            }
            const resolved = {};
            for (const option of animationOptions){
                resolved[option] = cfg[option];
            }
            ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.b)(cfg.properties) && cfg.properties || [
                key
            ]).forEach((prop)=>{
                if (prop === key || !animatedProps.has(prop)) {
                    animatedProps.set(prop, resolved);
                }
            });
        });
    }
 _animateOptions(target, values) {
        const newOptions = values.options;
        const options = resolveTargetOptions(target, newOptions);
        if (!options) {
            return [];
        }
        const animations = this._createAnimations(options, newOptions);
        if (newOptions.$shared) {
            awaitAll(target.options.$animations, newOptions).then(()=>{
                target.options = newOptions;
            }, ()=>{
            });
        }
        return animations;
    }
 _createAnimations(target, values) {
        const animatedProps = this._properties;
        const animations = [];
        const running = target.$animations || (target.$animations = {});
        const props = Object.keys(values);
        const date = Date.now();
        let i;
        for(i = props.length - 1; i >= 0; --i){
            const prop = props[i];
            if (prop.charAt(0) === '$') {
                continue;
            }
            if (prop === 'options') {
                animations.push(...this._animateOptions(target, values));
                continue;
            }
            const value = values[prop];
            let animation = running[prop];
            const cfg = animatedProps.get(prop);
            if (animation) {
                if (cfg && animation.active()) {
                    animation.update(cfg, value, date);
                    continue;
                } else {
                    animation.cancel();
                }
            }
            if (!cfg || !cfg.duration) {
                target[prop] = value;
                continue;
            }
            running[prop] = animation = new Animation(cfg, target, prop, value);
            animations.push(animation);
        }
        return animations;
    }
 update(target, values) {
        if (this._properties.size === 0) {
            Object.assign(target, values);
            return;
        }
        const animations = this._createAnimations(target, values);
        if (animations.length) {
            animator.add(this._chart, animations);
            return true;
        }
    }
}
function awaitAll(animations, properties) {
    const running = [];
    const keys = Object.keys(properties);
    for(let i = 0; i < keys.length; i++){
        const anim = animations[keys[i]];
        if (anim && anim.active()) {
            running.push(anim.wait());
        }
    }
    return Promise.all(running);
}
function resolveTargetOptions(target, newOptions) {
    if (!newOptions) {
        return;
    }
    let options = target.options;
    if (!options) {
        target.options = newOptions;
        return;
    }
    if (options.$shared) {
        target.options = options = Object.assign({}, options, {
            $shared: false,
            $animations: {}
        });
    }
    return options;
}

function scaleClip(scale, allowedOverflow) {
    const opts = scale && scale.options || {};
    const reverse = opts.reverse;
    const min = opts.min === undefined ? allowedOverflow : 0;
    const max = opts.max === undefined ? allowedOverflow : 0;
    return {
        start: reverse ? max : min,
        end: reverse ? min : max
    };
}
function defaultClip(xScale, yScale, allowedOverflow) {
    if (allowedOverflow === false) {
        return false;
    }
    const x = scaleClip(xScale, allowedOverflow);
    const y = scaleClip(yScale, allowedOverflow);
    return {
        top: y.end,
        right: x.end,
        bottom: y.start,
        left: x.start
    };
}
function toClip(value) {
    let t, r, b, l;
    if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.i)(value)) {
        t = value.top;
        r = value.right;
        b = value.bottom;
        l = value.left;
    } else {
        t = r = b = l = value;
    }
    return {
        top: t,
        right: r,
        bottom: b,
        left: l,
        disabled: value === false
    };
}
function getSortedDatasetIndices(chart, filterVisible) {
    const keys = [];
    const metasets = chart._getSortedDatasetMetas(filterVisible);
    let i, ilen;
    for(i = 0, ilen = metasets.length; i < ilen; ++i){
        keys.push(metasets[i].index);
    }
    return keys;
}
function applyStack(stack, value, dsIndex, options = {}) {
    const keys = stack.keys;
    const singleMode = options.mode === 'single';
    let i, ilen, datasetIndex, otherValue;
    if (value === null) {
        return;
    }
    let found = false;
    for(i = 0, ilen = keys.length; i < ilen; ++i){
        datasetIndex = +keys[i];
        if (datasetIndex === dsIndex) {
            found = true;
            if (options.all) {
                continue;
            }
            break;
        }
        otherValue = stack.values[datasetIndex];
        if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.g)(otherValue) && (singleMode || value === 0 || (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.s)(value) === (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.s)(otherValue))) {
            value += otherValue;
        }
    }
    if (!found && !options.all) {
        return 0;
    }
    return value;
}
function convertObjectDataToArray(data, meta) {
    const { iScale , vScale  } = meta;
    const iAxisKey = iScale.axis === 'x' ? 'x' : 'y';
    const vAxisKey = vScale.axis === 'x' ? 'x' : 'y';
    const keys = Object.keys(data);
    const adata = new Array(keys.length);
    let i, ilen, key;
    for(i = 0, ilen = keys.length; i < ilen; ++i){
        key = keys[i];
        adata[i] = {
            [iAxisKey]: key,
            [vAxisKey]: data[key]
        };
    }
    return adata;
}
function isStacked(scale, meta) {
    const stacked = scale && scale.options.stacked;
    return stacked || stacked === undefined && meta.stack !== undefined;
}
function getStackKey(indexScale, valueScale, meta) {
    return `${indexScale.id}.${valueScale.id}.${meta.stack || meta.type}`;
}
function getUserBounds(scale) {
    const { min , max , minDefined , maxDefined  } = scale.getUserBounds();
    return {
        min: minDefined ? min : Number.NEGATIVE_INFINITY,
        max: maxDefined ? max : Number.POSITIVE_INFINITY
    };
}
function getOrCreateStack(stacks, stackKey, indexValue) {
    const subStack = stacks[stackKey] || (stacks[stackKey] = {});
    return subStack[indexValue] || (subStack[indexValue] = {});
}
function getLastIndexInStack(stack, vScale, positive, type) {
    for (const meta of vScale.getMatchingVisibleMetas(type).reverse()){
        const value = stack[meta.index];
        if (positive && value > 0 || !positive && value < 0) {
            return meta.index;
        }
    }
    return null;
}
function updateStacks(controller, parsed) {
    const { chart , _cachedMeta: meta  } = controller;
    const stacks = chart._stacks || (chart._stacks = {});
    const { iScale , vScale , index: datasetIndex  } = meta;
    const iAxis = iScale.axis;
    const vAxis = vScale.axis;
    const key = getStackKey(iScale, vScale, meta);
    const ilen = parsed.length;
    let stack;
    for(let i = 0; i < ilen; ++i){
        const item = parsed[i];
        const { [iAxis]: index , [vAxis]: value  } = item;
        const itemStacks = item._stacks || (item._stacks = {});
        stack = itemStacks[vAxis] = getOrCreateStack(stacks, key, index);
        stack[datasetIndex] = value;
        stack._top = getLastIndexInStack(stack, vScale, true, meta.type);
        stack._bottom = getLastIndexInStack(stack, vScale, false, meta.type);
        const visualValues = stack._visualValues || (stack._visualValues = {});
        visualValues[datasetIndex] = value;
    }
}
function getFirstScaleId(chart, axis) {
    const scales = chart.scales;
    return Object.keys(scales).filter((key)=>scales[key].axis === axis).shift();
}
function createDatasetContext(parent, index) {
    return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.j)(parent, {
        active: false,
        dataset: undefined,
        datasetIndex: index,
        index,
        mode: 'default',
        type: 'dataset'
    });
}
function createDataContext(parent, index, element) {
    return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.j)(parent, {
        active: false,
        dataIndex: index,
        parsed: undefined,
        raw: undefined,
        element,
        index,
        mode: 'default',
        type: 'data'
    });
}
function clearStacks(meta, items) {
    const datasetIndex = meta.controller.index;
    const axis = meta.vScale && meta.vScale.axis;
    if (!axis) {
        return;
    }
    items = items || meta._parsed;
    for (const parsed of items){
        const stacks = parsed._stacks;
        if (!stacks || stacks[axis] === undefined || stacks[axis][datasetIndex] === undefined) {
            return;
        }
        delete stacks[axis][datasetIndex];
        if (stacks[axis]._visualValues !== undefined && stacks[axis]._visualValues[datasetIndex] !== undefined) {
            delete stacks[axis]._visualValues[datasetIndex];
        }
    }
}
const isDirectUpdateMode = (mode)=>mode === 'reset' || mode === 'none';
const cloneIfNotShared = (cached, shared)=>shared ? cached : Object.assign({}, cached);
const createStack = (canStack, meta, chart)=>canStack && !meta.hidden && meta._stacked && {
        keys: getSortedDatasetIndices(chart, true),
        values: null
    };
class DatasetController {
 static defaults = {};
 static datasetElementType = null;
 static dataElementType = null;
 constructor(chart, datasetIndex){
        this.chart = chart;
        this._ctx = chart.ctx;
        this.index = datasetIndex;
        this._cachedDataOpts = {};
        this._cachedMeta = this.getMeta();
        this._type = this._cachedMeta.type;
        this.options = undefined;
         this._parsing = false;
        this._data = undefined;
        this._objectData = undefined;
        this._sharedOptions = undefined;
        this._drawStart = undefined;
        this._drawCount = undefined;
        this.enableOptionSharing = false;
        this.supportsDecimation = false;
        this.$context = undefined;
        this._syncList = [];
        this.datasetElementType = new.target.datasetElementType;
        this.dataElementType = new.target.dataElementType;
        this.initialize();
    }
    initialize() {
        const meta = this._cachedMeta;
        this.configure();
        this.linkScales();
        meta._stacked = isStacked(meta.vScale, meta);
        this.addElements();
        if (this.options.fill && !this.chart.isPluginEnabled('filler')) {
            console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
        }
    }
    updateIndex(datasetIndex) {
        if (this.index !== datasetIndex) {
            clearStacks(this._cachedMeta);
        }
        this.index = datasetIndex;
    }
    linkScales() {
        const chart = this.chart;
        const meta = this._cachedMeta;
        const dataset = this.getDataset();
        const chooseId = (axis, x, y, r)=>axis === 'x' ? x : axis === 'r' ? r : y;
        const xid = meta.xAxisID = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(dataset.xAxisID, getFirstScaleId(chart, 'x'));
        const yid = meta.yAxisID = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(dataset.yAxisID, getFirstScaleId(chart, 'y'));
        const rid = meta.rAxisID = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(dataset.rAxisID, getFirstScaleId(chart, 'r'));
        const indexAxis = meta.indexAxis;
        const iid = meta.iAxisID = chooseId(indexAxis, xid, yid, rid);
        const vid = meta.vAxisID = chooseId(indexAxis, yid, xid, rid);
        meta.xScale = this.getScaleForId(xid);
        meta.yScale = this.getScaleForId(yid);
        meta.rScale = this.getScaleForId(rid);
        meta.iScale = this.getScaleForId(iid);
        meta.vScale = this.getScaleForId(vid);
    }
    getDataset() {
        return this.chart.data.datasets[this.index];
    }
    getMeta() {
        return this.chart.getDatasetMeta(this.index);
    }
 getScaleForId(scaleID) {
        return this.chart.scales[scaleID];
    }
 _getOtherScale(scale) {
        const meta = this._cachedMeta;
        return scale === meta.iScale ? meta.vScale : meta.iScale;
    }
    reset() {
        this._update('reset');
    }
 _destroy() {
        const meta = this._cachedMeta;
        if (this._data) {
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.u)(this._data, this);
        }
        if (meta._stacked) {
            clearStacks(meta);
        }
    }
 _dataCheck() {
        const dataset = this.getDataset();
        const data = dataset.data || (dataset.data = []);
        const _data = this._data;
        if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.i)(data)) {
            const meta = this._cachedMeta;
            this._data = convertObjectDataToArray(data, meta);
        } else if (_data !== data) {
            if (_data) {
                (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.u)(_data, this);
                const meta = this._cachedMeta;
                clearStacks(meta);
                meta._parsed = [];
            }
            if (data && Object.isExtensible(data)) {
                (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.l)(data, this);
            }
            this._syncList = [];
            this._data = data;
        }
    }
    addElements() {
        const meta = this._cachedMeta;
        this._dataCheck();
        if (this.datasetElementType) {
            meta.dataset = new this.datasetElementType();
        }
    }
    buildOrUpdateElements(resetNewElements) {
        const meta = this._cachedMeta;
        const dataset = this.getDataset();
        let stackChanged = false;
        this._dataCheck();
        const oldStacked = meta._stacked;
        meta._stacked = isStacked(meta.vScale, meta);
        if (meta.stack !== dataset.stack) {
            stackChanged = true;
            clearStacks(meta);
            meta.stack = dataset.stack;
        }
        this._resyncElements(resetNewElements);
        if (stackChanged || oldStacked !== meta._stacked) {
            updateStacks(this, meta._parsed);
            meta._stacked = isStacked(meta.vScale, meta);
        }
    }
 configure() {
        const config = this.chart.config;
        const scopeKeys = config.datasetScopeKeys(this._type);
        const scopes = config.getOptionScopes(this.getDataset(), scopeKeys, true);
        this.options = config.createResolver(scopes, this.getContext());
        this._parsing = this.options.parsing;
        this._cachedDataOpts = {};
    }
 parse(start, count) {
        const { _cachedMeta: meta , _data: data  } = this;
        const { iScale , _stacked  } = meta;
        const iAxis = iScale.axis;
        let sorted = start === 0 && count === data.length ? true : meta._sorted;
        let prev = start > 0 && meta._parsed[start - 1];
        let i, cur, parsed;
        if (this._parsing === false) {
            meta._parsed = data;
            meta._sorted = true;
            parsed = data;
        } else {
            if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.b)(data[start])) {
                parsed = this.parseArrayData(meta, data, start, count);
            } else if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.i)(data[start])) {
                parsed = this.parseObjectData(meta, data, start, count);
            } else {
                parsed = this.parsePrimitiveData(meta, data, start, count);
            }
            const isNotInOrderComparedToPrev = ()=>cur[iAxis] === null || prev && cur[iAxis] < prev[iAxis];
            for(i = 0; i < count; ++i){
                meta._parsed[i + start] = cur = parsed[i];
                if (sorted) {
                    if (isNotInOrderComparedToPrev()) {
                        sorted = false;
                    }
                    prev = cur;
                }
            }
            meta._sorted = sorted;
        }
        if (_stacked) {
            updateStacks(this, parsed);
        }
    }
 parsePrimitiveData(meta, data, start, count) {
        const { iScale , vScale  } = meta;
        const iAxis = iScale.axis;
        const vAxis = vScale.axis;
        const labels = iScale.getLabels();
        const singleScale = iScale === vScale;
        const parsed = new Array(count);
        let i, ilen, index;
        for(i = 0, ilen = count; i < ilen; ++i){
            index = i + start;
            parsed[i] = {
                [iAxis]: singleScale || iScale.parse(labels[index], index),
                [vAxis]: vScale.parse(data[index], index)
            };
        }
        return parsed;
    }
 parseArrayData(meta, data, start, count) {
        const { xScale , yScale  } = meta;
        const parsed = new Array(count);
        let i, ilen, index, item;
        for(i = 0, ilen = count; i < ilen; ++i){
            index = i + start;
            item = data[index];
            parsed[i] = {
                x: xScale.parse(item[0], index),
                y: yScale.parse(item[1], index)
            };
        }
        return parsed;
    }
 parseObjectData(meta, data, start, count) {
        const { xScale , yScale  } = meta;
        const { xAxisKey ='x' , yAxisKey ='y'  } = this._parsing;
        const parsed = new Array(count);
        let i, ilen, index, item;
        for(i = 0, ilen = count; i < ilen; ++i){
            index = i + start;
            item = data[index];
            parsed[i] = {
                x: xScale.parse((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.f)(item, xAxisKey), index),
                y: yScale.parse((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.f)(item, yAxisKey), index)
            };
        }
        return parsed;
    }
 getParsed(index) {
        return this._cachedMeta._parsed[index];
    }
 getDataElement(index) {
        return this._cachedMeta.data[index];
    }
 applyStack(scale, parsed, mode) {
        const chart = this.chart;
        const meta = this._cachedMeta;
        const value = parsed[scale.axis];
        const stack = {
            keys: getSortedDatasetIndices(chart, true),
            values: parsed._stacks[scale.axis]._visualValues
        };
        return applyStack(stack, value, meta.index, {
            mode
        });
    }
 updateRangeFromParsed(range, scale, parsed, stack) {
        const parsedValue = parsed[scale.axis];
        let value = parsedValue === null ? NaN : parsedValue;
        const values = stack && parsed._stacks[scale.axis];
        if (stack && values) {
            stack.values = values;
            value = applyStack(stack, parsedValue, this._cachedMeta.index);
        }
        range.min = Math.min(range.min, value);
        range.max = Math.max(range.max, value);
    }
 getMinMax(scale, canStack) {
        const meta = this._cachedMeta;
        const _parsed = meta._parsed;
        const sorted = meta._sorted && scale === meta.iScale;
        const ilen = _parsed.length;
        const otherScale = this._getOtherScale(scale);
        const stack = createStack(canStack, meta, this.chart);
        const range = {
            min: Number.POSITIVE_INFINITY,
            max: Number.NEGATIVE_INFINITY
        };
        const { min: otherMin , max: otherMax  } = getUserBounds(otherScale);
        let i, parsed;
        function _skip() {
            parsed = _parsed[i];
            const otherValue = parsed[otherScale.axis];
            return !(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.g)(parsed[scale.axis]) || otherMin > otherValue || otherMax < otherValue;
        }
        for(i = 0; i < ilen; ++i){
            if (_skip()) {
                continue;
            }
            this.updateRangeFromParsed(range, scale, parsed, stack);
            if (sorted) {
                break;
            }
        }
        if (sorted) {
            for(i = ilen - 1; i >= 0; --i){
                if (_skip()) {
                    continue;
                }
                this.updateRangeFromParsed(range, scale, parsed, stack);
                break;
            }
        }
        return range;
    }
    getAllParsedValues(scale) {
        const parsed = this._cachedMeta._parsed;
        const values = [];
        let i, ilen, value;
        for(i = 0, ilen = parsed.length; i < ilen; ++i){
            value = parsed[i][scale.axis];
            if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.g)(value)) {
                values.push(value);
            }
        }
        return values;
    }
 getMaxOverflow() {
        return false;
    }
 getLabelAndValue(index) {
        const meta = this._cachedMeta;
        const iScale = meta.iScale;
        const vScale = meta.vScale;
        const parsed = this.getParsed(index);
        return {
            label: iScale ? '' + iScale.getLabelForValue(parsed[iScale.axis]) : '',
            value: vScale ? '' + vScale.getLabelForValue(parsed[vScale.axis]) : ''
        };
    }
 _update(mode) {
        const meta = this._cachedMeta;
        this.update(mode || 'default');
        meta._clip = toClip((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(this.options.clip, defaultClip(meta.xScale, meta.yScale, this.getMaxOverflow())));
    }
 update(mode) {}
    draw() {
        const ctx = this._ctx;
        const chart = this.chart;
        const meta = this._cachedMeta;
        const elements = meta.data || [];
        const area = chart.chartArea;
        const active = [];
        const start = this._drawStart || 0;
        const count = this._drawCount || elements.length - start;
        const drawActiveElementsOnTop = this.options.drawActiveElementsOnTop;
        let i;
        if (meta.dataset) {
            meta.dataset.draw(ctx, area, start, count);
        }
        for(i = start; i < start + count; ++i){
            const element = elements[i];
            if (element.hidden) {
                continue;
            }
            if (element.active && drawActiveElementsOnTop) {
                active.push(element);
            } else {
                element.draw(ctx, area);
            }
        }
        for(i = 0; i < active.length; ++i){
            active[i].draw(ctx, area);
        }
    }
 getStyle(index, active) {
        const mode = active ? 'active' : 'default';
        return index === undefined && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(mode) : this.resolveDataElementOptions(index || 0, mode);
    }
 getContext(index, active, mode) {
        const dataset = this.getDataset();
        let context;
        if (index >= 0 && index < this._cachedMeta.data.length) {
            const element = this._cachedMeta.data[index];
            context = element.$context || (element.$context = createDataContext(this.getContext(), index, element));
            context.parsed = this.getParsed(index);
            context.raw = dataset.data[index];
            context.index = context.dataIndex = index;
        } else {
            context = this.$context || (this.$context = createDatasetContext(this.chart.getContext(), this.index));
            context.dataset = dataset;
            context.index = context.datasetIndex = this.index;
        }
        context.active = !!active;
        context.mode = mode;
        return context;
    }
 resolveDatasetElementOptions(mode) {
        return this._resolveElementOptions(this.datasetElementType.id, mode);
    }
 resolveDataElementOptions(index, mode) {
        return this._resolveElementOptions(this.dataElementType.id, mode, index);
    }
 _resolveElementOptions(elementType, mode = 'default', index) {
        const active = mode === 'active';
        const cache = this._cachedDataOpts;
        const cacheKey = elementType + '-' + mode;
        const cached = cache[cacheKey];
        const sharing = this.enableOptionSharing && (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.h)(index);
        if (cached) {
            return cloneIfNotShared(cached, sharing);
        }
        const config = this.chart.config;
        const scopeKeys = config.datasetElementScopeKeys(this._type, elementType);
        const prefixes = active ? [
            `${elementType}Hover`,
            'hover',
            elementType,
            ''
        ] : [
            elementType,
            ''
        ];
        const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
        const names = Object.keys(_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.d.elements[elementType]);
        const context = ()=>this.getContext(index, active, mode);
        const values = config.resolveNamedOptions(scopes, names, context, prefixes);
        if (values.$shared) {
            values.$shared = sharing;
            cache[cacheKey] = Object.freeze(cloneIfNotShared(values, sharing));
        }
        return values;
    }
 _resolveAnimations(index, transition, active) {
        const chart = this.chart;
        const cache = this._cachedDataOpts;
        const cacheKey = `animation-${transition}`;
        const cached = cache[cacheKey];
        if (cached) {
            return cached;
        }
        let options;
        if (chart.options.animation !== false) {
            const config = this.chart.config;
            const scopeKeys = config.datasetAnimationScopeKeys(this._type, transition);
            const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
            options = config.createResolver(scopes, this.getContext(index, active, transition));
        }
        const animations = new Animations(chart, options && options.animations);
        if (options && options._cacheable) {
            cache[cacheKey] = Object.freeze(animations);
        }
        return animations;
    }
 getSharedOptions(options) {
        if (!options.$shared) {
            return;
        }
        return this._sharedOptions || (this._sharedOptions = Object.assign({}, options));
    }
 includeOptions(mode, sharedOptions) {
        return !sharedOptions || isDirectUpdateMode(mode) || this.chart._animationsDisabled;
    }
 _getSharedOptions(start, mode) {
        const firstOpts = this.resolveDataElementOptions(start, mode);
        const previouslySharedOptions = this._sharedOptions;
        const sharedOptions = this.getSharedOptions(firstOpts);
        const includeOptions = this.includeOptions(mode, sharedOptions) || sharedOptions !== previouslySharedOptions;
        this.updateSharedOptions(sharedOptions, mode, firstOpts);
        return {
            sharedOptions,
            includeOptions
        };
    }
 updateElement(element, index, properties, mode) {
        if (isDirectUpdateMode(mode)) {
            Object.assign(element, properties);
        } else {
            this._resolveAnimations(index, mode).update(element, properties);
        }
    }
 updateSharedOptions(sharedOptions, mode, newOptions) {
        if (sharedOptions && !isDirectUpdateMode(mode)) {
            this._resolveAnimations(undefined, mode).update(sharedOptions, newOptions);
        }
    }
 _setStyle(element, index, mode, active) {
        element.active = active;
        const options = this.getStyle(index, active);
        this._resolveAnimations(index, mode, active).update(element, {
            options: !active && this.getSharedOptions(options) || options
        });
    }
    removeHoverStyle(element, datasetIndex, index) {
        this._setStyle(element, index, 'active', false);
    }
    setHoverStyle(element, datasetIndex, index) {
        this._setStyle(element, index, 'active', true);
    }
 _removeDatasetHoverStyle() {
        const element = this._cachedMeta.dataset;
        if (element) {
            this._setStyle(element, undefined, 'active', false);
        }
    }
 _setDatasetHoverStyle() {
        const element = this._cachedMeta.dataset;
        if (element) {
            this._setStyle(element, undefined, 'active', true);
        }
    }
 _resyncElements(resetNewElements) {
        const data = this._data;
        const elements = this._cachedMeta.data;
        for (const [method, arg1, arg2] of this._syncList){
            this[method](arg1, arg2);
        }
        this._syncList = [];
        const numMeta = elements.length;
        const numData = data.length;
        const count = Math.min(numData, numMeta);
        if (count) {
            this.parse(0, count);
        }
        if (numData > numMeta) {
            this._insertElements(numMeta, numData - numMeta, resetNewElements);
        } else if (numData < numMeta) {
            this._removeElements(numData, numMeta - numData);
        }
    }
 _insertElements(start, count, resetNewElements = true) {
        const meta = this._cachedMeta;
        const data = meta.data;
        const end = start + count;
        let i;
        const move = (arr)=>{
            arr.length += count;
            for(i = arr.length - 1; i >= end; i--){
                arr[i] = arr[i - count];
            }
        };
        move(data);
        for(i = start; i < end; ++i){
            data[i] = new this.dataElementType();
        }
        if (this._parsing) {
            move(meta._parsed);
        }
        this.parse(start, count);
        if (resetNewElements) {
            this.updateElements(data, start, count, 'reset');
        }
    }
    updateElements(element, start, count, mode) {}
 _removeElements(start, count) {
        const meta = this._cachedMeta;
        if (this._parsing) {
            const removed = meta._parsed.splice(start, count);
            if (meta._stacked) {
                clearStacks(meta, removed);
            }
        }
        meta.data.splice(start, count);
    }
 _sync(args) {
        if (this._parsing) {
            this._syncList.push(args);
        } else {
            const [method, arg1, arg2] = args;
            this[method](arg1, arg2);
        }
        this.chart._dataChanges.push([
            this.index,
            ...args
        ]);
    }
    _onDataPush() {
        const count = arguments.length;
        this._sync([
            '_insertElements',
            this.getDataset().data.length - count,
            count
        ]);
    }
    _onDataPop() {
        this._sync([
            '_removeElements',
            this._cachedMeta.data.length - 1,
            1
        ]);
    }
    _onDataShift() {
        this._sync([
            '_removeElements',
            0,
            1
        ]);
    }
    _onDataSplice(start, count) {
        if (count) {
            this._sync([
                '_removeElements',
                start,
                count
            ]);
        }
        const newCount = arguments.length - 2;
        if (newCount) {
            this._sync([
                '_insertElements',
                start,
                newCount
            ]);
        }
    }
    _onDataUnshift() {
        this._sync([
            '_insertElements',
            0,
            arguments.length
        ]);
    }
}

function getAllScaleValues(scale, type) {
    if (!scale._cache.$bar) {
        const visibleMetas = scale.getMatchingVisibleMetas(type);
        let values = [];
        for(let i = 0, ilen = visibleMetas.length; i < ilen; i++){
            values = values.concat(visibleMetas[i].controller.getAllParsedValues(scale));
        }
        scale._cache.$bar = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__._)(values.sort((a, b)=>a - b));
    }
    return scale._cache.$bar;
}
 function computeMinSampleSize(meta) {
    const scale = meta.iScale;
    const values = getAllScaleValues(scale, meta.type);
    let min = scale._length;
    let i, ilen, curr, prev;
    const updateMinAndPrev = ()=>{
        if (curr === 32767 || curr === -32768) {
            return;
        }
        if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.h)(prev)) {
            min = Math.min(min, Math.abs(curr - prev) || min);
        }
        prev = curr;
    };
    for(i = 0, ilen = values.length; i < ilen; ++i){
        curr = scale.getPixelForValue(values[i]);
        updateMinAndPrev();
    }
    prev = undefined;
    for(i = 0, ilen = scale.ticks.length; i < ilen; ++i){
        curr = scale.getPixelForTick(i);
        updateMinAndPrev();
    }
    return min;
}
 function computeFitCategoryTraits(index, ruler, options, stackCount) {
    const thickness = options.barThickness;
    let size, ratio;
    if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(thickness)) {
        size = ruler.min * options.categoryPercentage;
        ratio = options.barPercentage;
    } else {
        size = thickness * stackCount;
        ratio = 1;
    }
    return {
        chunk: size / stackCount,
        ratio,
        start: ruler.pixels[index] - size / 2
    };
}
 function computeFlexCategoryTraits(index, ruler, options, stackCount) {
    const pixels = ruler.pixels;
    const curr = pixels[index];
    let prev = index > 0 ? pixels[index - 1] : null;
    let next = index < pixels.length - 1 ? pixels[index + 1] : null;
    const percent = options.categoryPercentage;
    if (prev === null) {
        prev = curr - (next === null ? ruler.end - ruler.start : next - curr);
    }
    if (next === null) {
        next = curr + curr - prev;
    }
    const start = curr - (curr - Math.min(prev, next)) / 2 * percent;
    const size = Math.abs(next - prev) / 2 * percent;
    return {
        chunk: size / stackCount,
        ratio: options.barPercentage,
        start
    };
}
function parseFloatBar(entry, item, vScale, i) {
    const startValue = vScale.parse(entry[0], i);
    const endValue = vScale.parse(entry[1], i);
    const min = Math.min(startValue, endValue);
    const max = Math.max(startValue, endValue);
    let barStart = min;
    let barEnd = max;
    if (Math.abs(min) > Math.abs(max)) {
        barStart = max;
        barEnd = min;
    }
    item[vScale.axis] = barEnd;
    item._custom = {
        barStart,
        barEnd,
        start: startValue,
        end: endValue,
        min,
        max
    };
}
function parseValue(entry, item, vScale, i) {
    if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.b)(entry)) {
        parseFloatBar(entry, item, vScale, i);
    } else {
        item[vScale.axis] = vScale.parse(entry, i);
    }
    return item;
}
function parseArrayOrPrimitive(meta, data, start, count) {
    const iScale = meta.iScale;
    const vScale = meta.vScale;
    const labels = iScale.getLabels();
    const singleScale = iScale === vScale;
    const parsed = [];
    let i, ilen, item, entry;
    for(i = start, ilen = start + count; i < ilen; ++i){
        entry = data[i];
        item = {};
        item[iScale.axis] = singleScale || iScale.parse(labels[i], i);
        parsed.push(parseValue(entry, item, vScale, i));
    }
    return parsed;
}
function isFloatBar(custom) {
    return custom && custom.barStart !== undefined && custom.barEnd !== undefined;
}
function barSign(size, vScale, actualBase) {
    if (size !== 0) {
        return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.s)(size);
    }
    return (vScale.isHorizontal() ? 1 : -1) * (vScale.min >= actualBase ? 1 : -1);
}
function borderProps(properties) {
    let reverse, start, end, top, bottom;
    if (properties.horizontal) {
        reverse = properties.base > properties.x;
        start = 'left';
        end = 'right';
    } else {
        reverse = properties.base < properties.y;
        start = 'bottom';
        end = 'top';
    }
    if (reverse) {
        top = 'end';
        bottom = 'start';
    } else {
        top = 'start';
        bottom = 'end';
    }
    return {
        start,
        end,
        reverse,
        top,
        bottom
    };
}
function setBorderSkipped(properties, options, stack, index) {
    let edge = options.borderSkipped;
    const res = {};
    if (!edge) {
        properties.borderSkipped = res;
        return;
    }
    if (edge === true) {
        properties.borderSkipped = {
            top: true,
            right: true,
            bottom: true,
            left: true
        };
        return;
    }
    const { start , end , reverse , top , bottom  } = borderProps(properties);
    if (edge === 'middle' && stack) {
        properties.enableBorderRadius = true;
        if ((stack._top || 0) === index) {
            edge = top;
        } else if ((stack._bottom || 0) === index) {
            edge = bottom;
        } else {
            res[parseEdge(bottom, start, end, reverse)] = true;
            edge = top;
        }
    }
    res[parseEdge(edge, start, end, reverse)] = true;
    properties.borderSkipped = res;
}
function parseEdge(edge, a, b, reverse) {
    if (reverse) {
        edge = swap(edge, a, b);
        edge = startEnd(edge, b, a);
    } else {
        edge = startEnd(edge, a, b);
    }
    return edge;
}
function swap(orig, v1, v2) {
    return orig === v1 ? v2 : orig === v2 ? v1 : orig;
}
function startEnd(v, start, end) {
    return v === 'start' ? start : v === 'end' ? end : v;
}
function setInflateAmount(properties, { inflateAmount  }, ratio) {
    properties.inflateAmount = inflateAmount === 'auto' ? ratio === 1 ? 0.33 : 0 : inflateAmount;
}
class BarController extends DatasetController {
    static id = 'bar';
 static defaults = {
        datasetElementType: false,
        dataElementType: 'bar',
        categoryPercentage: 0.8,
        barPercentage: 0.9,
        grouped: true,
        animations: {
            numbers: {
                type: 'number',
                properties: [
                    'x',
                    'y',
                    'base',
                    'width',
                    'height'
                ]
            }
        }
    };
 static overrides = {
        scales: {
            _index_: {
                type: 'category',
                offset: true,
                grid: {
                    offset: true
                }
            },
            _value_: {
                type: 'linear',
                beginAtZero: true
            }
        }
    };
 parsePrimitiveData(meta, data, start, count) {
        return parseArrayOrPrimitive(meta, data, start, count);
    }
 parseArrayData(meta, data, start, count) {
        return parseArrayOrPrimitive(meta, data, start, count);
    }
 parseObjectData(meta, data, start, count) {
        const { iScale , vScale  } = meta;
        const { xAxisKey ='x' , yAxisKey ='y'  } = this._parsing;
        const iAxisKey = iScale.axis === 'x' ? xAxisKey : yAxisKey;
        const vAxisKey = vScale.axis === 'x' ? xAxisKey : yAxisKey;
        const parsed = [];
        let i, ilen, item, obj;
        for(i = start, ilen = start + count; i < ilen; ++i){
            obj = data[i];
            item = {};
            item[iScale.axis] = iScale.parse((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.f)(obj, iAxisKey), i);
            parsed.push(parseValue((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.f)(obj, vAxisKey), item, vScale, i));
        }
        return parsed;
    }
 updateRangeFromParsed(range, scale, parsed, stack) {
        super.updateRangeFromParsed(range, scale, parsed, stack);
        const custom = parsed._custom;
        if (custom && scale === this._cachedMeta.vScale) {
            range.min = Math.min(range.min, custom.min);
            range.max = Math.max(range.max, custom.max);
        }
    }
 getMaxOverflow() {
        return 0;
    }
 getLabelAndValue(index) {
        const meta = this._cachedMeta;
        const { iScale , vScale  } = meta;
        const parsed = this.getParsed(index);
        const custom = parsed._custom;
        const value = isFloatBar(custom) ? '[' + custom.start + ', ' + custom.end + ']' : '' + vScale.getLabelForValue(parsed[vScale.axis]);
        return {
            label: '' + iScale.getLabelForValue(parsed[iScale.axis]),
            value
        };
    }
    initialize() {
        this.enableOptionSharing = true;
        super.initialize();
        const meta = this._cachedMeta;
        meta.stack = this.getDataset().stack;
    }
    update(mode) {
        const meta = this._cachedMeta;
        this.updateElements(meta.data, 0, meta.data.length, mode);
    }
    updateElements(bars, start, count, mode) {
        const reset = mode === 'reset';
        const { index , _cachedMeta: { vScale  }  } = this;
        const base = vScale.getBasePixel();
        const horizontal = vScale.isHorizontal();
        const ruler = this._getRuler();
        const { sharedOptions , includeOptions  } = this._getSharedOptions(start, mode);
        for(let i = start; i < start + count; i++){
            const parsed = this.getParsed(i);
            const vpixels = reset || (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(parsed[vScale.axis]) ? {
                base,
                head: base
            } : this._calculateBarValuePixels(i);
            const ipixels = this._calculateBarIndexPixels(i, ruler);
            const stack = (parsed._stacks || {})[vScale.axis];
            const properties = {
                horizontal,
                base: vpixels.base,
                enableBorderRadius: !stack || isFloatBar(parsed._custom) || index === stack._top || index === stack._bottom,
                x: horizontal ? vpixels.head : ipixels.center,
                y: horizontal ? ipixels.center : vpixels.head,
                height: horizontal ? ipixels.size : Math.abs(vpixels.size),
                width: horizontal ? Math.abs(vpixels.size) : ipixels.size
            };
            if (includeOptions) {
                properties.options = sharedOptions || this.resolveDataElementOptions(i, bars[i].active ? 'active' : mode);
            }
            const options = properties.options || bars[i].options;
            setBorderSkipped(properties, options, stack, index);
            setInflateAmount(properties, options, ruler.ratio);
            this.updateElement(bars[i], i, properties, mode);
        }
    }
 _getStacks(last, dataIndex) {
        const { iScale  } = this._cachedMeta;
        const metasets = iScale.getMatchingVisibleMetas(this._type).filter((meta)=>meta.controller.options.grouped);
        const stacked = iScale.options.stacked;
        const stacks = [];
        const currentParsed = this._cachedMeta.controller.getParsed(dataIndex);
        const iScaleValue = currentParsed && currentParsed[iScale.axis];
        const skipNull = (meta)=>{
            const parsed = meta._parsed.find((item)=>item[iScale.axis] === iScaleValue);
            const val = parsed && parsed[meta.vScale.axis];
            if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(val) || isNaN(val)) {
                return true;
            }
        };
        for (const meta of metasets){
            if (dataIndex !== undefined && skipNull(meta)) {
                continue;
            }
            if (stacked === false || stacks.indexOf(meta.stack) === -1 || stacked === undefined && meta.stack === undefined) {
                stacks.push(meta.stack);
            }
            if (meta.index === last) {
                break;
            }
        }
        if (!stacks.length) {
            stacks.push(undefined);
        }
        return stacks;
    }
 _getStackCount(index) {
        return this._getStacks(undefined, index).length;
    }
    _getAxisCount() {
        return this._getAxis().length;
    }
    getFirstScaleIdForIndexAxis() {
        const scales = this.chart.scales;
        const indexScaleId = this.chart.options.indexAxis;
        return Object.keys(scales).filter((key)=>scales[key].axis === indexScaleId).shift();
    }
    _getAxis() {
        const axis = {};
        const firstScaleAxisId = this.getFirstScaleIdForIndexAxis();
        for (const dataset of this.chart.data.datasets){
            axis[(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(this.chart.options.indexAxis === 'x' ? dataset.xAxisID : dataset.yAxisID, firstScaleAxisId)] = true;
        }
        return Object.keys(axis);
    }
 _getStackIndex(datasetIndex, name, dataIndex) {
        const stacks = this._getStacks(datasetIndex, dataIndex);
        const index = name !== undefined ? stacks.indexOf(name) : -1;
        return index === -1 ? stacks.length - 1 : index;
    }
 _getRuler() {
        const opts = this.options;
        const meta = this._cachedMeta;
        const iScale = meta.iScale;
        const pixels = [];
        let i, ilen;
        for(i = 0, ilen = meta.data.length; i < ilen; ++i){
            pixels.push(iScale.getPixelForValue(this.getParsed(i)[iScale.axis], i));
        }
        const barThickness = opts.barThickness;
        const min = barThickness || computeMinSampleSize(meta);
        return {
            min,
            pixels,
            start: iScale._startPixel,
            end: iScale._endPixel,
            stackCount: this._getStackCount(),
            scale: iScale,
            grouped: opts.grouped,
            ratio: barThickness ? 1 : opts.categoryPercentage * opts.barPercentage
        };
    }
 _calculateBarValuePixels(index) {
        const { _cachedMeta: { vScale , _stacked , index: datasetIndex  } , options: { base: baseValue , minBarLength  }  } = this;
        const actualBase = baseValue || 0;
        const parsed = this.getParsed(index);
        const custom = parsed._custom;
        const floating = isFloatBar(custom);
        let value = parsed[vScale.axis];
        let start = 0;
        let length = _stacked ? this.applyStack(vScale, parsed, _stacked) : value;
        let head, size;
        if (length !== value) {
            start = length - value;
            length = value;
        }
        if (floating) {
            value = custom.barStart;
            length = custom.barEnd - custom.barStart;
            if (value !== 0 && (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.s)(value) !== (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.s)(custom.barEnd)) {
                start = 0;
            }
            start += value;
        }
        const startValue = !(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(baseValue) && !floating ? baseValue : start;
        let base = vScale.getPixelForValue(startValue);
        if (this.chart.getDataVisibility(index)) {
            head = vScale.getPixelForValue(start + length);
        } else {
            head = base;
        }
        size = head - base;
        if (Math.abs(size) < minBarLength) {
            size = barSign(size, vScale, actualBase) * minBarLength;
            if (value === actualBase) {
                base -= size / 2;
            }
            const startPixel = vScale.getPixelForDecimal(0);
            const endPixel = vScale.getPixelForDecimal(1);
            const min = Math.min(startPixel, endPixel);
            const max = Math.max(startPixel, endPixel);
            base = Math.max(Math.min(base, max), min);
            head = base + size;
            if (_stacked && !floating) {
                parsed._stacks[vScale.axis]._visualValues[datasetIndex] = vScale.getValueForPixel(head) - vScale.getValueForPixel(base);
            }
        }
        if (base === vScale.getPixelForValue(actualBase)) {
            const halfGrid = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.s)(size) * vScale.getLineWidthForValue(actualBase) / 2;
            base += halfGrid;
            size -= halfGrid;
        }
        return {
            size,
            base,
            head,
            center: head + size / 2
        };
    }
 _calculateBarIndexPixels(index, ruler) {
        const scale = ruler.scale;
        const options = this.options;
        const skipNull = options.skipNull;
        const maxBarThickness = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(options.maxBarThickness, Infinity);
        let center, size;
        const axisCount = this._getAxisCount();
        if (ruler.grouped) {
            const stackCount = skipNull ? this._getStackCount(index) : ruler.stackCount;
            const range = options.barThickness === 'flex' ? computeFlexCategoryTraits(index, ruler, options, stackCount * axisCount) : computeFitCategoryTraits(index, ruler, options, stackCount * axisCount);
            const axisID = this.chart.options.indexAxis === 'x' ? this.getDataset().xAxisID : this.getDataset().yAxisID;
            const axisNumber = this._getAxis().indexOf((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(axisID, this.getFirstScaleIdForIndexAxis()));
            const stackIndex = this._getStackIndex(this.index, this._cachedMeta.stack, skipNull ? index : undefined) + axisNumber;
            center = range.start + range.chunk * stackIndex + range.chunk / 2;
            size = Math.min(maxBarThickness, range.chunk * range.ratio);
        } else {
            center = scale.getPixelForValue(this.getParsed(index)[scale.axis], index);
            size = Math.min(maxBarThickness, ruler.min * ruler.ratio);
        }
        return {
            base: center - size / 2,
            head: center + size / 2,
            center,
            size
        };
    }
    draw() {
        const meta = this._cachedMeta;
        const vScale = meta.vScale;
        const rects = meta.data;
        const ilen = rects.length;
        let i = 0;
        for(; i < ilen; ++i){
            if (this.getParsed(i)[vScale.axis] !== null && !rects[i].hidden) {
                rects[i].draw(this._ctx);
            }
        }
    }
}

class BubbleController extends DatasetController {
    static id = 'bubble';
 static defaults = {
        datasetElementType: false,
        dataElementType: 'point',
        animations: {
            numbers: {
                type: 'number',
                properties: [
                    'x',
                    'y',
                    'borderWidth',
                    'radius'
                ]
            }
        }
    };
 static overrides = {
        scales: {
            x: {
                type: 'linear'
            },
            y: {
                type: 'linear'
            }
        }
    };
    initialize() {
        this.enableOptionSharing = true;
        super.initialize();
    }
 parsePrimitiveData(meta, data, start, count) {
        const parsed = super.parsePrimitiveData(meta, data, start, count);
        for(let i = 0; i < parsed.length; i++){
            parsed[i]._custom = this.resolveDataElementOptions(i + start).radius;
        }
        return parsed;
    }
 parseArrayData(meta, data, start, count) {
        const parsed = super.parseArrayData(meta, data, start, count);
        for(let i = 0; i < parsed.length; i++){
            const item = data[start + i];
            parsed[i]._custom = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(item[2], this.resolveDataElementOptions(i + start).radius);
        }
        return parsed;
    }
 parseObjectData(meta, data, start, count) {
        const parsed = super.parseObjectData(meta, data, start, count);
        for(let i = 0; i < parsed.length; i++){
            const item = data[start + i];
            parsed[i]._custom = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(item && item.r && +item.r, this.resolveDataElementOptions(i + start).radius);
        }
        return parsed;
    }
 getMaxOverflow() {
        const data = this._cachedMeta.data;
        let max = 0;
        for(let i = data.length - 1; i >= 0; --i){
            max = Math.max(max, data[i].size(this.resolveDataElementOptions(i)) / 2);
        }
        return max > 0 && max;
    }
 getLabelAndValue(index) {
        const meta = this._cachedMeta;
        const labels = this.chart.data.labels || [];
        const { xScale , yScale  } = meta;
        const parsed = this.getParsed(index);
        const x = xScale.getLabelForValue(parsed.x);
        const y = yScale.getLabelForValue(parsed.y);
        const r = parsed._custom;
        return {
            label: labels[index] || '',
            value: '(' + x + ', ' + y + (r ? ', ' + r : '') + ')'
        };
    }
    update(mode) {
        const points = this._cachedMeta.data;
        this.updateElements(points, 0, points.length, mode);
    }
    updateElements(points, start, count, mode) {
        const reset = mode === 'reset';
        const { iScale , vScale  } = this._cachedMeta;
        const { sharedOptions , includeOptions  } = this._getSharedOptions(start, mode);
        const iAxis = iScale.axis;
        const vAxis = vScale.axis;
        for(let i = start; i < start + count; i++){
            const point = points[i];
            const parsed = !reset && this.getParsed(i);
            const properties = {};
            const iPixel = properties[iAxis] = reset ? iScale.getPixelForDecimal(0.5) : iScale.getPixelForValue(parsed[iAxis]);
            const vPixel = properties[vAxis] = reset ? vScale.getBasePixel() : vScale.getPixelForValue(parsed[vAxis]);
            properties.skip = isNaN(iPixel) || isNaN(vPixel);
            if (includeOptions) {
                properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? 'active' : mode);
                if (reset) {
                    properties.options.radius = 0;
                }
            }
            this.updateElement(point, i, properties, mode);
        }
    }
 resolveDataElementOptions(index, mode) {
        const parsed = this.getParsed(index);
        let values = super.resolveDataElementOptions(index, mode);
        if (values.$shared) {
            values = Object.assign({}, values, {
                $shared: false
            });
        }
        const radius = values.radius;
        if (mode !== 'active') {
            values.radius = 0;
        }
        values.radius += (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(parsed && parsed._custom, radius);
        return values;
    }
}

function getRatioAndOffset(rotation, circumference, cutout) {
    let ratioX = 1;
    let ratioY = 1;
    let offsetX = 0;
    let offsetY = 0;
    if (circumference < _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.T) {
        const startAngle = rotation;
        const endAngle = startAngle + circumference;
        const startX = Math.cos(startAngle);
        const startY = Math.sin(startAngle);
        const endX = Math.cos(endAngle);
        const endY = Math.sin(endAngle);
        const calcMax = (angle, a, b)=>(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.p)(angle, startAngle, endAngle, true) ? 1 : Math.max(a, a * cutout, b, b * cutout);
        const calcMin = (angle, a, b)=>(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.p)(angle, startAngle, endAngle, true) ? -1 : Math.min(a, a * cutout, b, b * cutout);
        const maxX = calcMax(0, startX, endX);
        const maxY = calcMax(_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.H, startY, endY);
        const minX = calcMin(_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.P, startX, endX);
        const minY = calcMin(_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.P + _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.H, startY, endY);
        ratioX = (maxX - minX) / 2;
        ratioY = (maxY - minY) / 2;
        offsetX = -(maxX + minX) / 2;
        offsetY = -(maxY + minY) / 2;
    }
    return {
        ratioX,
        ratioY,
        offsetX,
        offsetY
    };
}
class DoughnutController extends DatasetController {
    static id = 'doughnut';
 static defaults = {
        datasetElementType: false,
        dataElementType: 'arc',
        animation: {
            animateRotate: true,
            animateScale: false
        },
        animations: {
            numbers: {
                type: 'number',
                properties: [
                    'circumference',
                    'endAngle',
                    'innerRadius',
                    'outerRadius',
                    'startAngle',
                    'x',
                    'y',
                    'offset',
                    'borderWidth',
                    'spacing'
                ]
            }
        },
        cutout: '50%',
        rotation: 0,
        circumference: 360,
        radius: '100%',
        spacing: 0,
        indexAxis: 'r'
    };
    static descriptors = {
        _scriptable: (name)=>name !== 'spacing',
        _indexable: (name)=>name !== 'spacing' && !name.startsWith('borderDash') && !name.startsWith('hoverBorderDash')
    };
 static overrides = {
        aspectRatio: 1,
        plugins: {
            legend: {
                labels: {
                    generateLabels (chart) {
                        const data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            const { labels: { pointStyle , color  }  } = chart.legend.options;
                            return data.labels.map((label, i)=>{
                                const meta = chart.getDatasetMeta(0);
                                const style = meta.controller.getStyle(i);
                                return {
                                    text: label,
                                    fillStyle: style.backgroundColor,
                                    strokeStyle: style.borderColor,
                                    fontColor: color,
                                    lineWidth: style.borderWidth,
                                    pointStyle: pointStyle,
                                    hidden: !chart.getDataVisibility(i),
                                    index: i
                                };
                            });
                        }
                        return [];
                    }
                },
                onClick (e, legendItem, legend) {
                    legend.chart.toggleDataVisibility(legendItem.index);
                    legend.chart.update();
                }
            }
        }
    };
    constructor(chart, datasetIndex){
        super(chart, datasetIndex);
        this.enableOptionSharing = true;
        this.innerRadius = undefined;
        this.outerRadius = undefined;
        this.offsetX = undefined;
        this.offsetY = undefined;
    }
    linkScales() {}
 parse(start, count) {
        const data = this.getDataset().data;
        const meta = this._cachedMeta;
        if (this._parsing === false) {
            meta._parsed = data;
        } else {
            let getter = (i)=>+data[i];
            if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.i)(data[start])) {
                const { key ='value'  } = this._parsing;
                getter = (i)=>+(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.f)(data[i], key);
            }
            let i, ilen;
            for(i = start, ilen = start + count; i < ilen; ++i){
                meta._parsed[i] = getter(i);
            }
        }
    }
 _getRotation() {
        return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.t)(this.options.rotation - 90);
    }
 _getCircumference() {
        return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.t)(this.options.circumference);
    }
 _getRotationExtents() {
        let min = _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.T;
        let max = -_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.T;
        for(let i = 0; i < this.chart.data.datasets.length; ++i){
            if (this.chart.isDatasetVisible(i) && this.chart.getDatasetMeta(i).type === this._type) {
                const controller = this.chart.getDatasetMeta(i).controller;
                const rotation = controller._getRotation();
                const circumference = controller._getCircumference();
                min = Math.min(min, rotation);
                max = Math.max(max, rotation + circumference);
            }
        }
        return {
            rotation: min,
            circumference: max - min
        };
    }
 update(mode) {
        const chart = this.chart;
        const { chartArea  } = chart;
        const meta = this._cachedMeta;
        const arcs = meta.data;
        const spacing = this.getMaxBorderWidth() + this.getMaxOffset(arcs) + this.options.spacing;
        const maxSize = Math.max((Math.min(chartArea.width, chartArea.height) - spacing) / 2, 0);
        const cutout = Math.min((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.m)(this.options.cutout, maxSize), 1);
        const chartWeight = this._getRingWeight(this.index);
        const { circumference , rotation  } = this._getRotationExtents();
        const { ratioX , ratioY , offsetX , offsetY  } = getRatioAndOffset(rotation, circumference, cutout);
        const maxWidth = (chartArea.width - spacing) / ratioX;
        const maxHeight = (chartArea.height - spacing) / ratioY;
        const maxRadius = Math.max(Math.min(maxWidth, maxHeight) / 2, 0);
        const outerRadius = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.n)(this.options.radius, maxRadius);
        const innerRadius = Math.max(outerRadius * cutout, 0);
        const radiusLength = (outerRadius - innerRadius) / this._getVisibleDatasetWeightTotal();
        this.offsetX = offsetX * outerRadius;
        this.offsetY = offsetY * outerRadius;
        meta.total = this.calculateTotal();
        this.outerRadius = outerRadius - radiusLength * this._getRingWeightOffset(this.index);
        this.innerRadius = Math.max(this.outerRadius - radiusLength * chartWeight, 0);
        this.updateElements(arcs, 0, arcs.length, mode);
    }
 _circumference(i, reset) {
        const opts = this.options;
        const meta = this._cachedMeta;
        const circumference = this._getCircumference();
        if (reset && opts.animation.animateRotate || !this.chart.getDataVisibility(i) || meta._parsed[i] === null || meta.data[i].hidden) {
            return 0;
        }
        return this.calculateCircumference(meta._parsed[i] * circumference / _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.T);
    }
    updateElements(arcs, start, count, mode) {
        const reset = mode === 'reset';
        const chart = this.chart;
        const chartArea = chart.chartArea;
        const opts = chart.options;
        const animationOpts = opts.animation;
        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;
        const animateScale = reset && animationOpts.animateScale;
        const innerRadius = animateScale ? 0 : this.innerRadius;
        const outerRadius = animateScale ? 0 : this.outerRadius;
        const { sharedOptions , includeOptions  } = this._getSharedOptions(start, mode);
        let startAngle = this._getRotation();
        let i;
        for(i = 0; i < start; ++i){
            startAngle += this._circumference(i, reset);
        }
        for(i = start; i < start + count; ++i){
            const circumference = this._circumference(i, reset);
            const arc = arcs[i];
            const properties = {
                x: centerX + this.offsetX,
                y: centerY + this.offsetY,
                startAngle,
                endAngle: startAngle + circumference,
                circumference,
                outerRadius,
                innerRadius
            };
            if (includeOptions) {
                properties.options = sharedOptions || this.resolveDataElementOptions(i, arc.active ? 'active' : mode);
            }
            startAngle += circumference;
            this.updateElement(arc, i, properties, mode);
        }
    }
    calculateTotal() {
        const meta = this._cachedMeta;
        const metaData = meta.data;
        let total = 0;
        let i;
        for(i = 0; i < metaData.length; i++){
            const value = meta._parsed[i];
            if (value !== null && !isNaN(value) && this.chart.getDataVisibility(i) && !metaData[i].hidden) {
                total += Math.abs(value);
            }
        }
        return total;
    }
    calculateCircumference(value) {
        const total = this._cachedMeta.total;
        if (total > 0 && !isNaN(value)) {
            return _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.T * (Math.abs(value) / total);
        }
        return 0;
    }
    getLabelAndValue(index) {
        const meta = this._cachedMeta;
        const chart = this.chart;
        const labels = chart.data.labels || [];
        const value = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.o)(meta._parsed[index], chart.options.locale);
        return {
            label: labels[index] || '',
            value
        };
    }
    getMaxBorderWidth(arcs) {
        let max = 0;
        const chart = this.chart;
        let i, ilen, meta, controller, options;
        if (!arcs) {
            for(i = 0, ilen = chart.data.datasets.length; i < ilen; ++i){
                if (chart.isDatasetVisible(i)) {
                    meta = chart.getDatasetMeta(i);
                    arcs = meta.data;
                    controller = meta.controller;
                    break;
                }
            }
        }
        if (!arcs) {
            return 0;
        }
        for(i = 0, ilen = arcs.length; i < ilen; ++i){
            options = controller.resolveDataElementOptions(i);
            if (options.borderAlign !== 'inner') {
                max = Math.max(max, options.borderWidth || 0, options.hoverBorderWidth || 0);
            }
        }
        return max;
    }
    getMaxOffset(arcs) {
        let max = 0;
        for(let i = 0, ilen = arcs.length; i < ilen; ++i){
            const options = this.resolveDataElementOptions(i);
            max = Math.max(max, options.offset || 0, options.hoverOffset || 0);
        }
        return max;
    }
 _getRingWeightOffset(datasetIndex) {
        let ringWeightOffset = 0;
        for(let i = 0; i < datasetIndex; ++i){
            if (this.chart.isDatasetVisible(i)) {
                ringWeightOffset += this._getRingWeight(i);
            }
        }
        return ringWeightOffset;
    }
 _getRingWeight(datasetIndex) {
        return Math.max((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(this.chart.data.datasets[datasetIndex].weight, 1), 0);
    }
 _getVisibleDatasetWeightTotal() {
        return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
    }
}

class LineController extends DatasetController {
    static id = 'line';
 static defaults = {
        datasetElementType: 'line',
        dataElementType: 'point',
        showLine: true,
        spanGaps: false
    };
 static overrides = {
        scales: {
            _index_: {
                type: 'category'
            },
            _value_: {
                type: 'linear'
            }
        }
    };
    initialize() {
        this.enableOptionSharing = true;
        this.supportsDecimation = true;
        super.initialize();
    }
    update(mode) {
        const meta = this._cachedMeta;
        const { dataset: line , data: points = [] , _dataset  } = meta;
        const animationsDisabled = this.chart._animationsDisabled;
        let { start , count  } = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.q)(meta, points, animationsDisabled);
        this._drawStart = start;
        this._drawCount = count;
        if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.w)(meta)) {
            start = 0;
            count = points.length;
        }
        line._chart = this.chart;
        line._datasetIndex = this.index;
        line._decimated = !!_dataset._decimated;
        line.points = points;
        const options = this.resolveDatasetElementOptions(mode);
        if (!this.options.showLine) {
            options.borderWidth = 0;
        }
        options.segment = this.options.segment;
        this.updateElement(line, undefined, {
            animated: !animationsDisabled,
            options
        }, mode);
        this.updateElements(points, start, count, mode);
    }
    updateElements(points, start, count, mode) {
        const reset = mode === 'reset';
        const { iScale , vScale , _stacked , _dataset  } = this._cachedMeta;
        const { sharedOptions , includeOptions  } = this._getSharedOptions(start, mode);
        const iAxis = iScale.axis;
        const vAxis = vScale.axis;
        const { spanGaps , segment  } = this.options;
        const maxGapLength = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.x)(spanGaps) ? spanGaps : Number.POSITIVE_INFINITY;
        const directUpdate = this.chart._animationsDisabled || reset || mode === 'none';
        const end = start + count;
        const pointsCount = points.length;
        let prevParsed = start > 0 && this.getParsed(start - 1);
        for(let i = 0; i < pointsCount; ++i){
            const point = points[i];
            const properties = directUpdate ? point : {};
            if (i < start || i >= end) {
                properties.skip = true;
                continue;
            }
            const parsed = this.getParsed(i);
            const nullData = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(parsed[vAxis]);
            const iPixel = properties[iAxis] = iScale.getPixelForValue(parsed[iAxis], i);
            const vPixel = properties[vAxis] = reset || nullData ? vScale.getBasePixel() : vScale.getPixelForValue(_stacked ? this.applyStack(vScale, parsed, _stacked) : parsed[vAxis], i);
            properties.skip = isNaN(iPixel) || isNaN(vPixel) || nullData;
            properties.stop = i > 0 && Math.abs(parsed[iAxis] - prevParsed[iAxis]) > maxGapLength;
            if (segment) {
                properties.parsed = parsed;
                properties.raw = _dataset.data[i];
            }
            if (includeOptions) {
                properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? 'active' : mode);
            }
            if (!directUpdate) {
                this.updateElement(point, i, properties, mode);
            }
            prevParsed = parsed;
        }
    }
 getMaxOverflow() {
        const meta = this._cachedMeta;
        const dataset = meta.dataset;
        const border = dataset.options && dataset.options.borderWidth || 0;
        const data = meta.data || [];
        if (!data.length) {
            return border;
        }
        const firstPoint = data[0].size(this.resolveDataElementOptions(0));
        const lastPoint = data[data.length - 1].size(this.resolveDataElementOptions(data.length - 1));
        return Math.max(border, firstPoint, lastPoint) / 2;
    }
    draw() {
        const meta = this._cachedMeta;
        meta.dataset.updateControlPoints(this.chart.chartArea, meta.iScale.axis);
        super.draw();
    }
}

class PolarAreaController extends DatasetController {
    static id = 'polarArea';
 static defaults = {
        dataElementType: 'arc',
        animation: {
            animateRotate: true,
            animateScale: true
        },
        animations: {
            numbers: {
                type: 'number',
                properties: [
                    'x',
                    'y',
                    'startAngle',
                    'endAngle',
                    'innerRadius',
                    'outerRadius'
                ]
            }
        },
        indexAxis: 'r',
        startAngle: 0
    };
 static overrides = {
        aspectRatio: 1,
        plugins: {
            legend: {
                labels: {
                    generateLabels (chart) {
                        const data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            const { labels: { pointStyle , color  }  } = chart.legend.options;
                            return data.labels.map((label, i)=>{
                                const meta = chart.getDatasetMeta(0);
                                const style = meta.controller.getStyle(i);
                                return {
                                    text: label,
                                    fillStyle: style.backgroundColor,
                                    strokeStyle: style.borderColor,
                                    fontColor: color,
                                    lineWidth: style.borderWidth,
                                    pointStyle: pointStyle,
                                    hidden: !chart.getDataVisibility(i),
                                    index: i
                                };
                            });
                        }
                        return [];
                    }
                },
                onClick (e, legendItem, legend) {
                    legend.chart.toggleDataVisibility(legendItem.index);
                    legend.chart.update();
                }
            }
        },
        scales: {
            r: {
                type: 'radialLinear',
                angleLines: {
                    display: false
                },
                beginAtZero: true,
                grid: {
                    circular: true
                },
                pointLabels: {
                    display: false
                },
                startAngle: 0
            }
        }
    };
    constructor(chart, datasetIndex){
        super(chart, datasetIndex);
        this.innerRadius = undefined;
        this.outerRadius = undefined;
    }
    getLabelAndValue(index) {
        const meta = this._cachedMeta;
        const chart = this.chart;
        const labels = chart.data.labels || [];
        const value = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.o)(meta._parsed[index].r, chart.options.locale);
        return {
            label: labels[index] || '',
            value
        };
    }
    parseObjectData(meta, data, start, count) {
        return _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.y.bind(this)(meta, data, start, count);
    }
    update(mode) {
        const arcs = this._cachedMeta.data;
        this._updateRadius();
        this.updateElements(arcs, 0, arcs.length, mode);
    }
 getMinMax() {
        const meta = this._cachedMeta;
        const range = {
            min: Number.POSITIVE_INFINITY,
            max: Number.NEGATIVE_INFINITY
        };
        meta.data.forEach((element, index)=>{
            const parsed = this.getParsed(index).r;
            if (!isNaN(parsed) && this.chart.getDataVisibility(index)) {
                if (parsed < range.min) {
                    range.min = parsed;
                }
                if (parsed > range.max) {
                    range.max = parsed;
                }
            }
        });
        return range;
    }
 _updateRadius() {
        const chart = this.chart;
        const chartArea = chart.chartArea;
        const opts = chart.options;
        const minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
        const outerRadius = Math.max(minSize / 2, 0);
        const innerRadius = Math.max(opts.cutoutPercentage ? outerRadius / 100 * opts.cutoutPercentage : 1, 0);
        const radiusLength = (outerRadius - innerRadius) / chart.getVisibleDatasetCount();
        this.outerRadius = outerRadius - radiusLength * this.index;
        this.innerRadius = this.outerRadius - radiusLength;
    }
    updateElements(arcs, start, count, mode) {
        const reset = mode === 'reset';
        const chart = this.chart;
        const opts = chart.options;
        const animationOpts = opts.animation;
        const scale = this._cachedMeta.rScale;
        const centerX = scale.xCenter;
        const centerY = scale.yCenter;
        const datasetStartAngle = scale.getIndexAngle(0) - 0.5 * _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.P;
        let angle = datasetStartAngle;
        let i;
        const defaultAngle = 360 / this.countVisibleElements();
        for(i = 0; i < start; ++i){
            angle += this._computeAngle(i, mode, defaultAngle);
        }
        for(i = start; i < start + count; i++){
            const arc = arcs[i];
            let startAngle = angle;
            let endAngle = angle + this._computeAngle(i, mode, defaultAngle);
            let outerRadius = chart.getDataVisibility(i) ? scale.getDistanceFromCenterForValue(this.getParsed(i).r) : 0;
            angle = endAngle;
            if (reset) {
                if (animationOpts.animateScale) {
                    outerRadius = 0;
                }
                if (animationOpts.animateRotate) {
                    startAngle = endAngle = datasetStartAngle;
                }
            }
            const properties = {
                x: centerX,
                y: centerY,
                innerRadius: 0,
                outerRadius,
                startAngle,
                endAngle,
                options: this.resolveDataElementOptions(i, arc.active ? 'active' : mode)
            };
            this.updateElement(arc, i, properties, mode);
        }
    }
    countVisibleElements() {
        const meta = this._cachedMeta;
        let count = 0;
        meta.data.forEach((element, index)=>{
            if (!isNaN(this.getParsed(index).r) && this.chart.getDataVisibility(index)) {
                count++;
            }
        });
        return count;
    }
 _computeAngle(index, mode, defaultAngle) {
        return this.chart.getDataVisibility(index) ? (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.t)(this.resolveDataElementOptions(index, mode).angle || defaultAngle) : 0;
    }
}

class PieController extends DoughnutController {
    static id = 'pie';
 static defaults = {
        cutout: 0,
        rotation: 0,
        circumference: 360,
        radius: '100%'
    };
}

class RadarController extends DatasetController {
    static id = 'radar';
 static defaults = {
        datasetElementType: 'line',
        dataElementType: 'point',
        indexAxis: 'r',
        showLine: true,
        elements: {
            line: {
                fill: 'start'
            }
        }
    };
 static overrides = {
        aspectRatio: 1,
        scales: {
            r: {
                type: 'radialLinear'
            }
        }
    };
 getLabelAndValue(index) {
        const vScale = this._cachedMeta.vScale;
        const parsed = this.getParsed(index);
        return {
            label: vScale.getLabels()[index],
            value: '' + vScale.getLabelForValue(parsed[vScale.axis])
        };
    }
    parseObjectData(meta, data, start, count) {
        return _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.y.bind(this)(meta, data, start, count);
    }
    update(mode) {
        const meta = this._cachedMeta;
        const line = meta.dataset;
        const points = meta.data || [];
        const labels = meta.iScale.getLabels();
        line.points = points;
        if (mode !== 'resize') {
            const options = this.resolveDatasetElementOptions(mode);
            if (!this.options.showLine) {
                options.borderWidth = 0;
            }
            const properties = {
                _loop: true,
                _fullLoop: labels.length === points.length,
                options
            };
            this.updateElement(line, undefined, properties, mode);
        }
        this.updateElements(points, 0, points.length, mode);
    }
    updateElements(points, start, count, mode) {
        const scale = this._cachedMeta.rScale;
        const reset = mode === 'reset';
        for(let i = start; i < start + count; i++){
            const point = points[i];
            const options = this.resolveDataElementOptions(i, point.active ? 'active' : mode);
            const pointPosition = scale.getPointPositionForValue(i, this.getParsed(i).r);
            const x = reset ? scale.xCenter : pointPosition.x;
            const y = reset ? scale.yCenter : pointPosition.y;
            const properties = {
                x,
                y,
                angle: pointPosition.angle,
                skip: isNaN(x) || isNaN(y),
                options
            };
            this.updateElement(point, i, properties, mode);
        }
    }
}

class ScatterController extends DatasetController {
    static id = 'scatter';
 static defaults = {
        datasetElementType: false,
        dataElementType: 'point',
        showLine: false,
        fill: false
    };
 static overrides = {
        interaction: {
            mode: 'point'
        },
        scales: {
            x: {
                type: 'linear'
            },
            y: {
                type: 'linear'
            }
        }
    };
 getLabelAndValue(index) {
        const meta = this._cachedMeta;
        const labels = this.chart.data.labels || [];
        const { xScale , yScale  } = meta;
        const parsed = this.getParsed(index);
        const x = xScale.getLabelForValue(parsed.x);
        const y = yScale.getLabelForValue(parsed.y);
        return {
            label: labels[index] || '',
            value: '(' + x + ', ' + y + ')'
        };
    }
    update(mode) {
        const meta = this._cachedMeta;
        const { data: points = []  } = meta;
        const animationsDisabled = this.chart._animationsDisabled;
        let { start , count  } = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.q)(meta, points, animationsDisabled);
        this._drawStart = start;
        this._drawCount = count;
        if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.w)(meta)) {
            start = 0;
            count = points.length;
        }
        if (this.options.showLine) {
            if (!this.datasetElementType) {
                this.addElements();
            }
            const { dataset: line , _dataset  } = meta;
            line._chart = this.chart;
            line._datasetIndex = this.index;
            line._decimated = !!_dataset._decimated;
            line.points = points;
            const options = this.resolveDatasetElementOptions(mode);
            options.segment = this.options.segment;
            this.updateElement(line, undefined, {
                animated: !animationsDisabled,
                options
            }, mode);
        } else if (this.datasetElementType) {
            delete meta.dataset;
            this.datasetElementType = false;
        }
        this.updateElements(points, start, count, mode);
    }
    addElements() {
        const { showLine  } = this.options;
        if (!this.datasetElementType && showLine) {
            this.datasetElementType = this.chart.registry.getElement('line');
        }
        super.addElements();
    }
    updateElements(points, start, count, mode) {
        const reset = mode === 'reset';
        const { iScale , vScale , _stacked , _dataset  } = this._cachedMeta;
        const firstOpts = this.resolveDataElementOptions(start, mode);
        const sharedOptions = this.getSharedOptions(firstOpts);
        const includeOptions = this.includeOptions(mode, sharedOptions);
        const iAxis = iScale.axis;
        const vAxis = vScale.axis;
        const { spanGaps , segment  } = this.options;
        const maxGapLength = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.x)(spanGaps) ? spanGaps : Number.POSITIVE_INFINITY;
        const directUpdate = this.chart._animationsDisabled || reset || mode === 'none';
        let prevParsed = start > 0 && this.getParsed(start - 1);
        for(let i = start; i < start + count; ++i){
            const point = points[i];
            const parsed = this.getParsed(i);
            const properties = directUpdate ? point : {};
            const nullData = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(parsed[vAxis]);
            const iPixel = properties[iAxis] = iScale.getPixelForValue(parsed[iAxis], i);
            const vPixel = properties[vAxis] = reset || nullData ? vScale.getBasePixel() : vScale.getPixelForValue(_stacked ? this.applyStack(vScale, parsed, _stacked) : parsed[vAxis], i);
            properties.skip = isNaN(iPixel) || isNaN(vPixel) || nullData;
            properties.stop = i > 0 && Math.abs(parsed[iAxis] - prevParsed[iAxis]) > maxGapLength;
            if (segment) {
                properties.parsed = parsed;
                properties.raw = _dataset.data[i];
            }
            if (includeOptions) {
                properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? 'active' : mode);
            }
            if (!directUpdate) {
                this.updateElement(point, i, properties, mode);
            }
            prevParsed = parsed;
        }
        this.updateSharedOptions(sharedOptions, mode, firstOpts);
    }
 getMaxOverflow() {
        const meta = this._cachedMeta;
        const data = meta.data || [];
        if (!this.options.showLine) {
            let max = 0;
            for(let i = data.length - 1; i >= 0; --i){
                max = Math.max(max, data[i].size(this.resolveDataElementOptions(i)) / 2);
            }
            return max > 0 && max;
        }
        const dataset = meta.dataset;
        const border = dataset.options && dataset.options.borderWidth || 0;
        if (!data.length) {
            return border;
        }
        const firstPoint = data[0].size(this.resolveDataElementOptions(0));
        const lastPoint = data[data.length - 1].size(this.resolveDataElementOptions(data.length - 1));
        return Math.max(border, firstPoint, lastPoint) / 2;
    }
}

var controllers = /*#__PURE__*/Object.freeze({
__proto__: null,
BarController: BarController,
BubbleController: BubbleController,
DoughnutController: DoughnutController,
LineController: LineController,
PieController: PieController,
PolarAreaController: PolarAreaController,
RadarController: RadarController,
ScatterController: ScatterController
});

/**
 * @namespace Chart._adapters
 * @since 2.8.0
 * @private
 */ function abstract() {
    throw new Error('This method is not implemented: Check that a complete date adapter is provided.');
}
/**
 * Date adapter (current used by the time scale)
 * @namespace Chart._adapters._date
 * @memberof Chart._adapters
 * @private
 */ class DateAdapterBase {
    /**
   * Override default date adapter methods.
   * Accepts type parameter to define options type.
   * @example
   * Chart._adapters._date.override<{myAdapterOption: string}>({
   *   init() {
   *     console.log(this.options.myAdapterOption);
   *   }
   * })
   */ static override(members) {
        Object.assign(DateAdapterBase.prototype, members);
    }
    options;
    constructor(options){
        this.options = options || {};
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    init() {}
    formats() {
        return abstract();
    }
    parse() {
        return abstract();
    }
    format() {
        return abstract();
    }
    add() {
        return abstract();
    }
    diff() {
        return abstract();
    }
    startOf() {
        return abstract();
    }
    endOf() {
        return abstract();
    }
}
var adapters = {
    _date: DateAdapterBase
};

function binarySearch(metaset, axis, value, intersect) {
    const { controller , data , _sorted  } = metaset;
    const iScale = controller._cachedMeta.iScale;
    const spanGaps = metaset.dataset ? metaset.dataset.options ? metaset.dataset.options.spanGaps : null : null;
    if (iScale && axis === iScale.axis && axis !== 'r' && _sorted && data.length) {
        const lookupMethod = iScale._reversePixels ? _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.A : _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.B;
        if (!intersect) {
            const result = lookupMethod(data, axis, value);
            if (spanGaps) {
                const { vScale  } = controller._cachedMeta;
                const { _parsed  } = metaset;
                const distanceToDefinedLo = _parsed.slice(0, result.lo + 1).reverse().findIndex((point)=>!(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(point[vScale.axis]));
                result.lo -= Math.max(0, distanceToDefinedLo);
                const distanceToDefinedHi = _parsed.slice(result.hi).findIndex((point)=>!(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(point[vScale.axis]));
                result.hi += Math.max(0, distanceToDefinedHi);
            }
            return result;
        } else if (controller._sharedOptions) {
            const el = data[0];
            const range = typeof el.getRange === 'function' && el.getRange(axis);
            if (range) {
                const start = lookupMethod(data, axis, value - range);
                const end = lookupMethod(data, axis, value + range);
                return {
                    lo: start.lo,
                    hi: end.hi
                };
            }
        }
    }
    return {
        lo: 0,
        hi: data.length - 1
    };
}
 function evaluateInteractionItems(chart, axis, position, handler, intersect) {
    const metasets = chart.getSortedVisibleDatasetMetas();
    const value = position[axis];
    for(let i = 0, ilen = metasets.length; i < ilen; ++i){
        const { index , data  } = metasets[i];
        const { lo , hi  } = binarySearch(metasets[i], axis, value, intersect);
        for(let j = lo; j <= hi; ++j){
            const element = data[j];
            if (!element.skip) {
                handler(element, index, j);
            }
        }
    }
}
 function getDistanceMetricForAxis(axis) {
    const useX = axis.indexOf('x') !== -1;
    const useY = axis.indexOf('y') !== -1;
    return function(pt1, pt2) {
        const deltaX = useX ? Math.abs(pt1.x - pt2.x) : 0;
        const deltaY = useY ? Math.abs(pt1.y - pt2.y) : 0;
        return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    };
}
 function getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) {
    const items = [];
    if (!includeInvisible && !chart.isPointInArea(position)) {
        return items;
    }
    const evaluationFunc = function(element, datasetIndex, index) {
        if (!includeInvisible && !(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.C)(element, chart.chartArea, 0)) {
            return;
        }
        if (element.inRange(position.x, position.y, useFinalPosition)) {
            items.push({
                element,
                datasetIndex,
                index
            });
        }
    };
    evaluateInteractionItems(chart, axis, position, evaluationFunc, true);
    return items;
}
 function getNearestRadialItems(chart, position, axis, useFinalPosition) {
    let items = [];
    function evaluationFunc(element, datasetIndex, index) {
        const { startAngle , endAngle  } = element.getProps([
            'startAngle',
            'endAngle'
        ], useFinalPosition);
        const { angle  } = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.D)(element, {
            x: position.x,
            y: position.y
        });
        if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.p)(angle, startAngle, endAngle)) {
            items.push({
                element,
                datasetIndex,
                index
            });
        }
    }
    evaluateInteractionItems(chart, axis, position, evaluationFunc);
    return items;
}
 function getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition, includeInvisible) {
    let items = [];
    const distanceMetric = getDistanceMetricForAxis(axis);
    let minDistance = Number.POSITIVE_INFINITY;
    function evaluationFunc(element, datasetIndex, index) {
        const inRange = element.inRange(position.x, position.y, useFinalPosition);
        if (intersect && !inRange) {
            return;
        }
        const center = element.getCenterPoint(useFinalPosition);
        const pointInArea = !!includeInvisible || chart.isPointInArea(center);
        if (!pointInArea && !inRange) {
            return;
        }
        const distance = distanceMetric(position, center);
        if (distance < minDistance) {
            items = [
                {
                    element,
                    datasetIndex,
                    index
                }
            ];
            minDistance = distance;
        } else if (distance === minDistance) {
            items.push({
                element,
                datasetIndex,
                index
            });
        }
    }
    evaluateInteractionItems(chart, axis, position, evaluationFunc);
    return items;
}
 function getNearestItems(chart, position, axis, intersect, useFinalPosition, includeInvisible) {
    if (!includeInvisible && !chart.isPointInArea(position)) {
        return [];
    }
    return axis === 'r' && !intersect ? getNearestRadialItems(chart, position, axis, useFinalPosition) : getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition, includeInvisible);
}
 function getAxisItems(chart, position, axis, intersect, useFinalPosition) {
    const items = [];
    const rangeMethod = axis === 'x' ? 'inXRange' : 'inYRange';
    let intersectsItem = false;
    evaluateInteractionItems(chart, axis, position, (element, datasetIndex, index)=>{
        if (element[rangeMethod] && element[rangeMethod](position[axis], useFinalPosition)) {
            items.push({
                element,
                datasetIndex,
                index
            });
            intersectsItem = intersectsItem || element.inRange(position.x, position.y, useFinalPosition);
        }
    });
    if (intersect && !intersectsItem) {
        return [];
    }
    return items;
}
 var Interaction = {
    evaluateInteractionItems,
    modes: {
 index (chart, e, options, useFinalPosition) {
            const position = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.z)(e, chart);
            const axis = options.axis || 'x';
            const includeInvisible = options.includeInvisible || false;
            const items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) : getNearestItems(chart, position, axis, false, useFinalPosition, includeInvisible);
            const elements = [];
            if (!items.length) {
                return [];
            }
            chart.getSortedVisibleDatasetMetas().forEach((meta)=>{
                const index = items[0].index;
                const element = meta.data[index];
                if (element && !element.skip) {
                    elements.push({
                        element,
                        datasetIndex: meta.index,
                        index
                    });
                }
            });
            return elements;
        },
 dataset (chart, e, options, useFinalPosition) {
            const position = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.z)(e, chart);
            const axis = options.axis || 'xy';
            const includeInvisible = options.includeInvisible || false;
            let items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) : getNearestItems(chart, position, axis, false, useFinalPosition, includeInvisible);
            if (items.length > 0) {
                const datasetIndex = items[0].datasetIndex;
                const data = chart.getDatasetMeta(datasetIndex).data;
                items = [];
                for(let i = 0; i < data.length; ++i){
                    items.push({
                        element: data[i],
                        datasetIndex,
                        index: i
                    });
                }
            }
            return items;
        },
 point (chart, e, options, useFinalPosition) {
            const position = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.z)(e, chart);
            const axis = options.axis || 'xy';
            const includeInvisible = options.includeInvisible || false;
            return getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible);
        },
 nearest (chart, e, options, useFinalPosition) {
            const position = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.z)(e, chart);
            const axis = options.axis || 'xy';
            const includeInvisible = options.includeInvisible || false;
            return getNearestItems(chart, position, axis, options.intersect, useFinalPosition, includeInvisible);
        },
 x (chart, e, options, useFinalPosition) {
            const position = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.z)(e, chart);
            return getAxisItems(chart, position, 'x', options.intersect, useFinalPosition);
        },
 y (chart, e, options, useFinalPosition) {
            const position = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.z)(e, chart);
            return getAxisItems(chart, position, 'y', options.intersect, useFinalPosition);
        }
    }
};

const STATIC_POSITIONS = [
    'left',
    'top',
    'right',
    'bottom'
];
function filterByPosition(array, position) {
    return array.filter((v)=>v.pos === position);
}
function filterDynamicPositionByAxis(array, axis) {
    return array.filter((v)=>STATIC_POSITIONS.indexOf(v.pos) === -1 && v.box.axis === axis);
}
function sortByWeight(array, reverse) {
    return array.sort((a, b)=>{
        const v0 = reverse ? b : a;
        const v1 = reverse ? a : b;
        return v0.weight === v1.weight ? v0.index - v1.index : v0.weight - v1.weight;
    });
}
function wrapBoxes(boxes) {
    const layoutBoxes = [];
    let i, ilen, box, pos, stack, stackWeight;
    for(i = 0, ilen = (boxes || []).length; i < ilen; ++i){
        box = boxes[i];
        ({ position: pos , options: { stack , stackWeight =1  }  } = box);
        layoutBoxes.push({
            index: i,
            box,
            pos,
            horizontal: box.isHorizontal(),
            weight: box.weight,
            stack: stack && pos + stack,
            stackWeight
        });
    }
    return layoutBoxes;
}
function buildStacks(layouts) {
    const stacks = {};
    for (const wrap of layouts){
        const { stack , pos , stackWeight  } = wrap;
        if (!stack || !STATIC_POSITIONS.includes(pos)) {
            continue;
        }
        const _stack = stacks[stack] || (stacks[stack] = {
            count: 0,
            placed: 0,
            weight: 0,
            size: 0
        });
        _stack.count++;
        _stack.weight += stackWeight;
    }
    return stacks;
}
 function setLayoutDims(layouts, params) {
    const stacks = buildStacks(layouts);
    const { vBoxMaxWidth , hBoxMaxHeight  } = params;
    let i, ilen, layout;
    for(i = 0, ilen = layouts.length; i < ilen; ++i){
        layout = layouts[i];
        const { fullSize  } = layout.box;
        const stack = stacks[layout.stack];
        const factor = stack && layout.stackWeight / stack.weight;
        if (layout.horizontal) {
            layout.width = factor ? factor * vBoxMaxWidth : fullSize && params.availableWidth;
            layout.height = hBoxMaxHeight;
        } else {
            layout.width = vBoxMaxWidth;
            layout.height = factor ? factor * hBoxMaxHeight : fullSize && params.availableHeight;
        }
    }
    return stacks;
}
function buildLayoutBoxes(boxes) {
    const layoutBoxes = wrapBoxes(boxes);
    const fullSize = sortByWeight(layoutBoxes.filter((wrap)=>wrap.box.fullSize), true);
    const left = sortByWeight(filterByPosition(layoutBoxes, 'left'), true);
    const right = sortByWeight(filterByPosition(layoutBoxes, 'right'));
    const top = sortByWeight(filterByPosition(layoutBoxes, 'top'), true);
    const bottom = sortByWeight(filterByPosition(layoutBoxes, 'bottom'));
    const centerHorizontal = filterDynamicPositionByAxis(layoutBoxes, 'x');
    const centerVertical = filterDynamicPositionByAxis(layoutBoxes, 'y');
    return {
        fullSize,
        leftAndTop: left.concat(top),
        rightAndBottom: right.concat(centerVertical).concat(bottom).concat(centerHorizontal),
        chartArea: filterByPosition(layoutBoxes, 'chartArea'),
        vertical: left.concat(right).concat(centerVertical),
        horizontal: top.concat(bottom).concat(centerHorizontal)
    };
}
function getCombinedMax(maxPadding, chartArea, a, b) {
    return Math.max(maxPadding[a], chartArea[a]) + Math.max(maxPadding[b], chartArea[b]);
}
function updateMaxPadding(maxPadding, boxPadding) {
    maxPadding.top = Math.max(maxPadding.top, boxPadding.top);
    maxPadding.left = Math.max(maxPadding.left, boxPadding.left);
    maxPadding.bottom = Math.max(maxPadding.bottom, boxPadding.bottom);
    maxPadding.right = Math.max(maxPadding.right, boxPadding.right);
}
function updateDims(chartArea, params, layout, stacks) {
    const { pos , box  } = layout;
    const maxPadding = chartArea.maxPadding;
    if (!(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.i)(pos)) {
        if (layout.size) {
            chartArea[pos] -= layout.size;
        }
        const stack = stacks[layout.stack] || {
            size: 0,
            count: 1
        };
        stack.size = Math.max(stack.size, layout.horizontal ? box.height : box.width);
        layout.size = stack.size / stack.count;
        chartArea[pos] += layout.size;
    }
    if (box.getPadding) {
        updateMaxPadding(maxPadding, box.getPadding());
    }
    const newWidth = Math.max(0, params.outerWidth - getCombinedMax(maxPadding, chartArea, 'left', 'right'));
    const newHeight = Math.max(0, params.outerHeight - getCombinedMax(maxPadding, chartArea, 'top', 'bottom'));
    const widthChanged = newWidth !== chartArea.w;
    const heightChanged = newHeight !== chartArea.h;
    chartArea.w = newWidth;
    chartArea.h = newHeight;
    return layout.horizontal ? {
        same: widthChanged,
        other: heightChanged
    } : {
        same: heightChanged,
        other: widthChanged
    };
}
function handleMaxPadding(chartArea) {
    const maxPadding = chartArea.maxPadding;
    function updatePos(pos) {
        const change = Math.max(maxPadding[pos] - chartArea[pos], 0);
        chartArea[pos] += change;
        return change;
    }
    chartArea.y += updatePos('top');
    chartArea.x += updatePos('left');
    updatePos('right');
    updatePos('bottom');
}
function getMargins(horizontal, chartArea) {
    const maxPadding = chartArea.maxPadding;
    function marginForPositions(positions) {
        const margin = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        positions.forEach((pos)=>{
            margin[pos] = Math.max(chartArea[pos], maxPadding[pos]);
        });
        return margin;
    }
    return horizontal ? marginForPositions([
        'left',
        'right'
    ]) : marginForPositions([
        'top',
        'bottom'
    ]);
}
function fitBoxes(boxes, chartArea, params, stacks) {
    const refitBoxes = [];
    let i, ilen, layout, box, refit, changed;
    for(i = 0, ilen = boxes.length, refit = 0; i < ilen; ++i){
        layout = boxes[i];
        box = layout.box;
        box.update(layout.width || chartArea.w, layout.height || chartArea.h, getMargins(layout.horizontal, chartArea));
        const { same , other  } = updateDims(chartArea, params, layout, stacks);
        refit |= same && refitBoxes.length;
        changed = changed || other;
        if (!box.fullSize) {
            refitBoxes.push(layout);
        }
    }
    return refit && fitBoxes(refitBoxes, chartArea, params, stacks) || changed;
}
function setBoxDims(box, left, top, width, height) {
    box.top = top;
    box.left = left;
    box.right = left + width;
    box.bottom = top + height;
    box.width = width;
    box.height = height;
}
function placeBoxes(boxes, chartArea, params, stacks) {
    const userPadding = params.padding;
    let { x , y  } = chartArea;
    for (const layout of boxes){
        const box = layout.box;
        const stack = stacks[layout.stack] || {
            count: 1,
            placed: 0,
            weight: 1
        };
        const weight = layout.stackWeight / stack.weight || 1;
        if (layout.horizontal) {
            const width = chartArea.w * weight;
            const height = stack.size || box.height;
            if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.h)(stack.start)) {
                y = stack.start;
            }
            if (box.fullSize) {
                setBoxDims(box, userPadding.left, y, params.outerWidth - userPadding.right - userPadding.left, height);
            } else {
                setBoxDims(box, chartArea.left + stack.placed, y, width, height);
            }
            stack.start = y;
            stack.placed += width;
            y = box.bottom;
        } else {
            const height = chartArea.h * weight;
            const width = stack.size || box.width;
            if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.h)(stack.start)) {
                x = stack.start;
            }
            if (box.fullSize) {
                setBoxDims(box, x, userPadding.top, width, params.outerHeight - userPadding.bottom - userPadding.top);
            } else {
                setBoxDims(box, x, chartArea.top + stack.placed, width, height);
            }
            stack.start = x;
            stack.placed += height;
            x = box.right;
        }
    }
    chartArea.x = x;
    chartArea.y = y;
}
var layouts = {
 addBox (chart, item) {
        if (!chart.boxes) {
            chart.boxes = [];
        }
        item.fullSize = item.fullSize || false;
        item.position = item.position || 'top';
        item.weight = item.weight || 0;
        item._layers = item._layers || function() {
            return [
                {
                    z: 0,
                    draw (chartArea) {
                        item.draw(chartArea);
                    }
                }
            ];
        };
        chart.boxes.push(item);
    },
 removeBox (chart, layoutItem) {
        const index = chart.boxes ? chart.boxes.indexOf(layoutItem) : -1;
        if (index !== -1) {
            chart.boxes.splice(index, 1);
        }
    },
 configure (chart, item, options) {
        item.fullSize = options.fullSize;
        item.position = options.position;
        item.weight = options.weight;
    },
 update (chart, width, height, minPadding) {
        if (!chart) {
            return;
        }
        const padding = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.E)(chart.options.layout.padding);
        const availableWidth = Math.max(width - padding.width, 0);
        const availableHeight = Math.max(height - padding.height, 0);
        const boxes = buildLayoutBoxes(chart.boxes);
        const verticalBoxes = boxes.vertical;
        const horizontalBoxes = boxes.horizontal;
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(chart.boxes, (box)=>{
            if (typeof box.beforeLayout === 'function') {
                box.beforeLayout();
            }
        });
        const visibleVerticalBoxCount = verticalBoxes.reduce((total, wrap)=>wrap.box.options && wrap.box.options.display === false ? total : total + 1, 0) || 1;
        const params = Object.freeze({
            outerWidth: width,
            outerHeight: height,
            padding,
            availableWidth,
            availableHeight,
            vBoxMaxWidth: availableWidth / 2 / visibleVerticalBoxCount,
            hBoxMaxHeight: availableHeight / 2
        });
        const maxPadding = Object.assign({}, padding);
        updateMaxPadding(maxPadding, (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.E)(minPadding));
        const chartArea = Object.assign({
            maxPadding,
            w: availableWidth,
            h: availableHeight,
            x: padding.left,
            y: padding.top
        }, padding);
        const stacks = setLayoutDims(verticalBoxes.concat(horizontalBoxes), params);
        fitBoxes(boxes.fullSize, chartArea, params, stacks);
        fitBoxes(verticalBoxes, chartArea, params, stacks);
        if (fitBoxes(horizontalBoxes, chartArea, params, stacks)) {
            fitBoxes(verticalBoxes, chartArea, params, stacks);
        }
        handleMaxPadding(chartArea);
        placeBoxes(boxes.leftAndTop, chartArea, params, stacks);
        chartArea.x += chartArea.w;
        chartArea.y += chartArea.h;
        placeBoxes(boxes.rightAndBottom, chartArea, params, stacks);
        chart.chartArea = {
            left: chartArea.left,
            top: chartArea.top,
            right: chartArea.left + chartArea.w,
            bottom: chartArea.top + chartArea.h,
            height: chartArea.h,
            width: chartArea.w
        };
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(boxes.chartArea, (layout)=>{
            const box = layout.box;
            Object.assign(box, chart.chartArea);
            box.update(chartArea.w, chartArea.h, {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            });
        });
    }
};

class BasePlatform {
 acquireContext(canvas, aspectRatio) {}
 releaseContext(context) {
        return false;
    }
 addEventListener(chart, type, listener) {}
 removeEventListener(chart, type, listener) {}
 getDevicePixelRatio() {
        return 1;
    }
 getMaximumSize(element, width, height, aspectRatio) {
        width = Math.max(0, width || element.width);
        height = height || element.height;
        return {
            width,
            height: Math.max(0, aspectRatio ? Math.floor(width / aspectRatio) : height)
        };
    }
 isAttached(canvas) {
        return true;
    }
 updateConfig(config) {
    }
}

class BasicPlatform extends BasePlatform {
    acquireContext(item) {
        return item && item.getContext && item.getContext('2d') || null;
    }
    updateConfig(config) {
        config.options.animation = false;
    }
}

const EXPANDO_KEY = '$chartjs';
 const EVENT_TYPES = {
    touchstart: 'mousedown',
    touchmove: 'mousemove',
    touchend: 'mouseup',
    pointerenter: 'mouseenter',
    pointerdown: 'mousedown',
    pointermove: 'mousemove',
    pointerup: 'mouseup',
    pointerleave: 'mouseout',
    pointerout: 'mouseout'
};
const isNullOrEmpty = (value)=>value === null || value === '';
 function initCanvas(canvas, aspectRatio) {
    const style = canvas.style;
    const renderHeight = canvas.getAttribute('height');
    const renderWidth = canvas.getAttribute('width');
    canvas[EXPANDO_KEY] = {
        initial: {
            height: renderHeight,
            width: renderWidth,
            style: {
                display: style.display,
                height: style.height,
                width: style.width
            }
        }
    };
    style.display = style.display || 'block';
    style.boxSizing = style.boxSizing || 'border-box';
    if (isNullOrEmpty(renderWidth)) {
        const displayWidth = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.J)(canvas, 'width');
        if (displayWidth !== undefined) {
            canvas.width = displayWidth;
        }
    }
    if (isNullOrEmpty(renderHeight)) {
        if (canvas.style.height === '') {
            canvas.height = canvas.width / (aspectRatio || 2);
        } else {
            const displayHeight = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.J)(canvas, 'height');
            if (displayHeight !== undefined) {
                canvas.height = displayHeight;
            }
        }
    }
    return canvas;
}
const eventListenerOptions = _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.K ? {
    passive: true
} : false;
function addListener(node, type, listener) {
    if (node) {
        node.addEventListener(type, listener, eventListenerOptions);
    }
}
function removeListener(chart, type, listener) {
    if (chart && chart.canvas) {
        chart.canvas.removeEventListener(type, listener, eventListenerOptions);
    }
}
function fromNativeEvent(event, chart) {
    const type = EVENT_TYPES[event.type] || event.type;
    const { x , y  } = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.z)(event, chart);
    return {
        type,
        chart,
        native: event,
        x: x !== undefined ? x : null,
        y: y !== undefined ? y : null
    };
}
function nodeListContains(nodeList, canvas) {
    for (const node of nodeList){
        if (node === canvas || node.contains(canvas)) {
            return true;
        }
    }
}
function createAttachObserver(chart, type, listener) {
    const canvas = chart.canvas;
    const observer = new MutationObserver((entries)=>{
        let trigger = false;
        for (const entry of entries){
            trigger = trigger || nodeListContains(entry.addedNodes, canvas);
            trigger = trigger && !nodeListContains(entry.removedNodes, canvas);
        }
        if (trigger) {
            listener();
        }
    });
    observer.observe(document, {
        childList: true,
        subtree: true
    });
    return observer;
}
function createDetachObserver(chart, type, listener) {
    const canvas = chart.canvas;
    const observer = new MutationObserver((entries)=>{
        let trigger = false;
        for (const entry of entries){
            trigger = trigger || nodeListContains(entry.removedNodes, canvas);
            trigger = trigger && !nodeListContains(entry.addedNodes, canvas);
        }
        if (trigger) {
            listener();
        }
    });
    observer.observe(document, {
        childList: true,
        subtree: true
    });
    return observer;
}
const drpListeningCharts = new Map();
let oldDevicePixelRatio = 0;
function onWindowResize() {
    const dpr = window.devicePixelRatio;
    if (dpr === oldDevicePixelRatio) {
        return;
    }
    oldDevicePixelRatio = dpr;
    drpListeningCharts.forEach((resize, chart)=>{
        if (chart.currentDevicePixelRatio !== dpr) {
            resize();
        }
    });
}
function listenDevicePixelRatioChanges(chart, resize) {
    if (!drpListeningCharts.size) {
        window.addEventListener('resize', onWindowResize);
    }
    drpListeningCharts.set(chart, resize);
}
function unlistenDevicePixelRatioChanges(chart) {
    drpListeningCharts.delete(chart);
    if (!drpListeningCharts.size) {
        window.removeEventListener('resize', onWindowResize);
    }
}
function createResizeObserver(chart, type, listener) {
    const canvas = chart.canvas;
    const container = canvas && (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.I)(canvas);
    if (!container) {
        return;
    }
    const resize = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.L)((width, height)=>{
        const w = container.clientWidth;
        listener(width, height);
        if (w < container.clientWidth) {
            listener();
        }
    }, window);
    const observer = new ResizeObserver((entries)=>{
        const entry = entries[0];
        const width = entry.contentRect.width;
        const height = entry.contentRect.height;
        if (width === 0 && height === 0) {
            return;
        }
        resize(width, height);
    });
    observer.observe(container);
    listenDevicePixelRatioChanges(chart, resize);
    return observer;
}
function releaseObserver(chart, type, observer) {
    if (observer) {
        observer.disconnect();
    }
    if (type === 'resize') {
        unlistenDevicePixelRatioChanges(chart);
    }
}
function createProxyAndListen(chart, type, listener) {
    const canvas = chart.canvas;
    const proxy = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.L)((event)=>{
        if (chart.ctx !== null) {
            listener(fromNativeEvent(event, chart));
        }
    }, chart);
    addListener(canvas, type, proxy);
    return proxy;
}
 class DomPlatform extends BasePlatform {
 acquireContext(canvas, aspectRatio) {
        const context = canvas && canvas.getContext && canvas.getContext('2d');
        if (context && context.canvas === canvas) {
            initCanvas(canvas, aspectRatio);
            return context;
        }
        return null;
    }
 releaseContext(context) {
        const canvas = context.canvas;
        if (!canvas[EXPANDO_KEY]) {
            return false;
        }
        const initial = canvas[EXPANDO_KEY].initial;
        [
            'height',
            'width'
        ].forEach((prop)=>{
            const value = initial[prop];
            if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(value)) {
                canvas.removeAttribute(prop);
            } else {
                canvas.setAttribute(prop, value);
            }
        });
        const style = initial.style || {};
        Object.keys(style).forEach((key)=>{
            canvas.style[key] = style[key];
        });
        canvas.width = canvas.width;
        delete canvas[EXPANDO_KEY];
        return true;
    }
 addEventListener(chart, type, listener) {
        this.removeEventListener(chart, type);
        const proxies = chart.$proxies || (chart.$proxies = {});
        const handlers = {
            attach: createAttachObserver,
            detach: createDetachObserver,
            resize: createResizeObserver
        };
        const handler = handlers[type] || createProxyAndListen;
        proxies[type] = handler(chart, type, listener);
    }
 removeEventListener(chart, type) {
        const proxies = chart.$proxies || (chart.$proxies = {});
        const proxy = proxies[type];
        if (!proxy) {
            return;
        }
        const handlers = {
            attach: releaseObserver,
            detach: releaseObserver,
            resize: releaseObserver
        };
        const handler = handlers[type] || removeListener;
        handler(chart, type, proxy);
        proxies[type] = undefined;
    }
    getDevicePixelRatio() {
        return window.devicePixelRatio;
    }
 getMaximumSize(canvas, width, height, aspectRatio) {
        return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.G)(canvas, width, height, aspectRatio);
    }
 isAttached(canvas) {
        const container = canvas && (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.I)(canvas);
        return !!(container && container.isConnected);
    }
}

function _detectPlatform(canvas) {
    if (!(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.M)() || typeof OffscreenCanvas !== 'undefined' && canvas instanceof OffscreenCanvas) {
        return BasicPlatform;
    }
    return DomPlatform;
}

class Element {
    static defaults = {};
    static defaultRoutes = undefined;
    x;
    y;
    active = false;
    options;
    $animations;
    tooltipPosition(useFinalPosition) {
        const { x , y  } = this.getProps([
            'x',
            'y'
        ], useFinalPosition);
        return {
            x,
            y
        };
    }
    hasValue() {
        return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.x)(this.x) && (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.x)(this.y);
    }
    getProps(props, final) {
        const anims = this.$animations;
        if (!final || !anims) {
            // let's not create an object, if not needed
            return this;
        }
        const ret = {};
        props.forEach((prop)=>{
            ret[prop] = anims[prop] && anims[prop].active() ? anims[prop]._to : this[prop];
        });
        return ret;
    }
}

function autoSkip(scale, ticks) {
    const tickOpts = scale.options.ticks;
    const determinedMaxTicks = determineMaxTicks(scale);
    const ticksLimit = Math.min(tickOpts.maxTicksLimit || determinedMaxTicks, determinedMaxTicks);
    const majorIndices = tickOpts.major.enabled ? getMajorIndices(ticks) : [];
    const numMajorIndices = majorIndices.length;
    const first = majorIndices[0];
    const last = majorIndices[numMajorIndices - 1];
    const newTicks = [];
    if (numMajorIndices > ticksLimit) {
        skipMajors(ticks, newTicks, majorIndices, numMajorIndices / ticksLimit);
        return newTicks;
    }
    const spacing = calculateSpacing(majorIndices, ticks, ticksLimit);
    if (numMajorIndices > 0) {
        let i, ilen;
        const avgMajorSpacing = numMajorIndices > 1 ? Math.round((last - first) / (numMajorIndices - 1)) : null;
        skip(ticks, newTicks, spacing, (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(avgMajorSpacing) ? 0 : first - avgMajorSpacing, first);
        for(i = 0, ilen = numMajorIndices - 1; i < ilen; i++){
            skip(ticks, newTicks, spacing, majorIndices[i], majorIndices[i + 1]);
        }
        skip(ticks, newTicks, spacing, last, (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(avgMajorSpacing) ? ticks.length : last + avgMajorSpacing);
        return newTicks;
    }
    skip(ticks, newTicks, spacing);
    return newTicks;
}
function determineMaxTicks(scale) {
    const offset = scale.options.offset;
    const tickLength = scale._tickSize();
    const maxScale = scale._length / tickLength + (offset ? 0 : 1);
    const maxChart = scale._maxLength / tickLength;
    return Math.floor(Math.min(maxScale, maxChart));
}
 function calculateSpacing(majorIndices, ticks, ticksLimit) {
    const evenMajorSpacing = getEvenSpacing(majorIndices);
    const spacing = ticks.length / ticksLimit;
    if (!evenMajorSpacing) {
        return Math.max(spacing, 1);
    }
    const factors = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.N)(evenMajorSpacing);
    for(let i = 0, ilen = factors.length - 1; i < ilen; i++){
        const factor = factors[i];
        if (factor > spacing) {
            return factor;
        }
    }
    return Math.max(spacing, 1);
}
 function getMajorIndices(ticks) {
    const result = [];
    let i, ilen;
    for(i = 0, ilen = ticks.length; i < ilen; i++){
        if (ticks[i].major) {
            result.push(i);
        }
    }
    return result;
}
 function skipMajors(ticks, newTicks, majorIndices, spacing) {
    let count = 0;
    let next = majorIndices[0];
    let i;
    spacing = Math.ceil(spacing);
    for(i = 0; i < ticks.length; i++){
        if (i === next) {
            newTicks.push(ticks[i]);
            count++;
            next = majorIndices[count * spacing];
        }
    }
}
 function skip(ticks, newTicks, spacing, majorStart, majorEnd) {
    const start = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(majorStart, 0);
    const end = Math.min((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(majorEnd, ticks.length), ticks.length);
    let count = 0;
    let length, i, next;
    spacing = Math.ceil(spacing);
    if (majorEnd) {
        length = majorEnd - majorStart;
        spacing = length / Math.floor(length / spacing);
    }
    next = start;
    while(next < 0){
        count++;
        next = Math.round(start + count * spacing);
    }
    for(i = Math.max(start, 0); i < end; i++){
        if (i === next) {
            newTicks.push(ticks[i]);
            count++;
            next = Math.round(start + count * spacing);
        }
    }
}
 function getEvenSpacing(arr) {
    const len = arr.length;
    let i, diff;
    if (len < 2) {
        return false;
    }
    for(diff = arr[0], i = 1; i < len; ++i){
        if (arr[i] - arr[i - 1] !== diff) {
            return false;
        }
    }
    return diff;
}

const reverseAlign = (align)=>align === 'left' ? 'right' : align === 'right' ? 'left' : align;
const offsetFromEdge = (scale, edge, offset)=>edge === 'top' || edge === 'left' ? scale[edge] + offset : scale[edge] - offset;
const getTicksLimit = (ticksLength, maxTicksLimit)=>Math.min(maxTicksLimit || ticksLength, ticksLength);
 function sample(arr, numItems) {
    const result = [];
    const increment = arr.length / numItems;
    const len = arr.length;
    let i = 0;
    for(; i < len; i += increment){
        result.push(arr[Math.floor(i)]);
    }
    return result;
}
 function getPixelForGridLine(scale, index, offsetGridLines) {
    const length = scale.ticks.length;
    const validIndex = Math.min(index, length - 1);
    const start = scale._startPixel;
    const end = scale._endPixel;
    const epsilon = 1e-6;
    let lineValue = scale.getPixelForTick(validIndex);
    let offset;
    if (offsetGridLines) {
        if (length === 1) {
            offset = Math.max(lineValue - start, end - lineValue);
        } else if (index === 0) {
            offset = (scale.getPixelForTick(1) - lineValue) / 2;
        } else {
            offset = (lineValue - scale.getPixelForTick(validIndex - 1)) / 2;
        }
        lineValue += validIndex < index ? offset : -offset;
        if (lineValue < start - epsilon || lineValue > end + epsilon) {
            return;
        }
    }
    return lineValue;
}
 function garbageCollect(caches, length) {
    (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(caches, (cache)=>{
        const gc = cache.gc;
        const gcLen = gc.length / 2;
        let i;
        if (gcLen > length) {
            for(i = 0; i < gcLen; ++i){
                delete cache.data[gc[i]];
            }
            gc.splice(0, gcLen);
        }
    });
}
 function getTickMarkLength(options) {
    return options.drawTicks ? options.tickLength : 0;
}
 function getTitleHeight(options, fallback) {
    if (!options.display) {
        return 0;
    }
    const font = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a0)(options.font, fallback);
    const padding = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.E)(options.padding);
    const lines = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.b)(options.text) ? options.text.length : 1;
    return lines * font.lineHeight + padding.height;
}
function createScaleContext(parent, scale) {
    return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.j)(parent, {
        scale,
        type: 'scale'
    });
}
function createTickContext(parent, index, tick) {
    return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.j)(parent, {
        tick,
        index,
        type: 'tick'
    });
}
function titleAlign(align, position, reverse) {
     let ret = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a1)(align);
    if (reverse && position !== 'right' || !reverse && position === 'right') {
        ret = reverseAlign(ret);
    }
    return ret;
}
function titleArgs(scale, offset, position, align) {
    const { top , left , bottom , right , chart  } = scale;
    const { chartArea , scales  } = chart;
    let rotation = 0;
    let maxWidth, titleX, titleY;
    const height = bottom - top;
    const width = right - left;
    if (scale.isHorizontal()) {
        titleX = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a2)(align, left, right);
        if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.i)(position)) {
            const positionAxisID = Object.keys(position)[0];
            const value = position[positionAxisID];
            titleY = scales[positionAxisID].getPixelForValue(value) + height - offset;
        } else if (position === 'center') {
            titleY = (chartArea.bottom + chartArea.top) / 2 + height - offset;
        } else {
            titleY = offsetFromEdge(scale, position, offset);
        }
        maxWidth = right - left;
    } else {
        if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.i)(position)) {
            const positionAxisID = Object.keys(position)[0];
            const value = position[positionAxisID];
            titleX = scales[positionAxisID].getPixelForValue(value) - width + offset;
        } else if (position === 'center') {
            titleX = (chartArea.left + chartArea.right) / 2 - width + offset;
        } else {
            titleX = offsetFromEdge(scale, position, offset);
        }
        titleY = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a2)(align, bottom, top);
        rotation = position === 'left' ? -_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.H : _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.H;
    }
    return {
        titleX,
        titleY,
        maxWidth,
        rotation
    };
}
class Scale extends Element {
    constructor(cfg){
        super();
         this.id = cfg.id;
         this.type = cfg.type;
         this.options = undefined;
         this.ctx = cfg.ctx;
         this.chart = cfg.chart;
         this.top = undefined;
         this.bottom = undefined;
         this.left = undefined;
         this.right = undefined;
         this.width = undefined;
         this.height = undefined;
        this._margins = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        };
         this.maxWidth = undefined;
         this.maxHeight = undefined;
         this.paddingTop = undefined;
         this.paddingBottom = undefined;
         this.paddingLeft = undefined;
         this.paddingRight = undefined;
         this.axis = undefined;
         this.labelRotation = undefined;
        this.min = undefined;
        this.max = undefined;
        this._range = undefined;
         this.ticks = [];
         this._gridLineItems = null;
         this._labelItems = null;
         this._labelSizes = null;
        this._length = 0;
        this._maxLength = 0;
        this._longestTextCache = {};
         this._startPixel = undefined;
         this._endPixel = undefined;
        this._reversePixels = false;
        this._userMax = undefined;
        this._userMin = undefined;
        this._suggestedMax = undefined;
        this._suggestedMin = undefined;
        this._ticksLength = 0;
        this._borderValue = 0;
        this._cache = {};
        this._dataLimitsCached = false;
        this.$context = undefined;
    }
 init(options) {
        this.options = options.setContext(this.getContext());
        this.axis = options.axis;
        this._userMin = this.parse(options.min);
        this._userMax = this.parse(options.max);
        this._suggestedMin = this.parse(options.suggestedMin);
        this._suggestedMax = this.parse(options.suggestedMax);
    }
 parse(raw, index) {
        return raw;
    }
 getUserBounds() {
        let { _userMin , _userMax , _suggestedMin , _suggestedMax  } = this;
        _userMin = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.O)(_userMin, Number.POSITIVE_INFINITY);
        _userMax = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.O)(_userMax, Number.NEGATIVE_INFINITY);
        _suggestedMin = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.O)(_suggestedMin, Number.POSITIVE_INFINITY);
        _suggestedMax = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.O)(_suggestedMax, Number.NEGATIVE_INFINITY);
        return {
            min: (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.O)(_userMin, _suggestedMin),
            max: (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.O)(_userMax, _suggestedMax),
            minDefined: (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.g)(_userMin),
            maxDefined: (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.g)(_userMax)
        };
    }
 getMinMax(canStack) {
        let { min , max , minDefined , maxDefined  } = this.getUserBounds();
        let range;
        if (minDefined && maxDefined) {
            return {
                min,
                max
            };
        }
        const metas = this.getMatchingVisibleMetas();
        for(let i = 0, ilen = metas.length; i < ilen; ++i){
            range = metas[i].controller.getMinMax(this, canStack);
            if (!minDefined) {
                min = Math.min(min, range.min);
            }
            if (!maxDefined) {
                max = Math.max(max, range.max);
            }
        }
        min = maxDefined && min > max ? max : min;
        max = minDefined && min > max ? min : max;
        return {
            min: (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.O)(min, (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.O)(max, min)),
            max: (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.O)(max, (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.O)(min, max))
        };
    }
 getPadding() {
        return {
            left: this.paddingLeft || 0,
            top: this.paddingTop || 0,
            right: this.paddingRight || 0,
            bottom: this.paddingBottom || 0
        };
    }
 getTicks() {
        return this.ticks;
    }
 getLabels() {
        const data = this.chart.data;
        return this.options.labels || (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels || [];
    }
 getLabelItems(chartArea = this.chart.chartArea) {
        const items = this._labelItems || (this._labelItems = this._computeLabelItems(chartArea));
        return items;
    }
    beforeLayout() {
        this._cache = {};
        this._dataLimitsCached = false;
    }
    beforeUpdate() {
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(this.options.beforeUpdate, [
            this
        ]);
    }
 update(maxWidth, maxHeight, margins) {
        const { beginAtZero , grace , ticks: tickOpts  } = this.options;
        const sampleSize = tickOpts.sampleSize;
        this.beforeUpdate();
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this._margins = margins = Object.assign({
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }, margins);
        this.ticks = null;
        this._labelSizes = null;
        this._gridLineItems = null;
        this._labelItems = null;
        this.beforeSetDimensions();
        this.setDimensions();
        this.afterSetDimensions();
        this._maxLength = this.isHorizontal() ? this.width + margins.left + margins.right : this.height + margins.top + margins.bottom;
        if (!this._dataLimitsCached) {
            this.beforeDataLimits();
            this.determineDataLimits();
            this.afterDataLimits();
            this._range = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.R)(this, grace, beginAtZero);
            this._dataLimitsCached = true;
        }
        this.beforeBuildTicks();
        this.ticks = this.buildTicks() || [];
        this.afterBuildTicks();
        const samplingEnabled = sampleSize < this.ticks.length;
        this._convertTicksToLabels(samplingEnabled ? sample(this.ticks, sampleSize) : this.ticks);
        this.configure();
        this.beforeCalculateLabelRotation();
        this.calculateLabelRotation();
        this.afterCalculateLabelRotation();
        if (tickOpts.display && (tickOpts.autoSkip || tickOpts.source === 'auto')) {
            this.ticks = autoSkip(this, this.ticks);
            this._labelSizes = null;
            this.afterAutoSkip();
        }
        if (samplingEnabled) {
            this._convertTicksToLabels(this.ticks);
        }
        this.beforeFit();
        this.fit();
        this.afterFit();
        this.afterUpdate();
    }
 configure() {
        let reversePixels = this.options.reverse;
        let startPixel, endPixel;
        if (this.isHorizontal()) {
            startPixel = this.left;
            endPixel = this.right;
        } else {
            startPixel = this.top;
            endPixel = this.bottom;
            reversePixels = !reversePixels;
        }
        this._startPixel = startPixel;
        this._endPixel = endPixel;
        this._reversePixels = reversePixels;
        this._length = endPixel - startPixel;
        this._alignToPixels = this.options.alignToPixels;
    }
    afterUpdate() {
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(this.options.afterUpdate, [
            this
        ]);
    }
    beforeSetDimensions() {
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(this.options.beforeSetDimensions, [
            this
        ]);
    }
    setDimensions() {
        if (this.isHorizontal()) {
            this.width = this.maxWidth;
            this.left = 0;
            this.right = this.width;
        } else {
            this.height = this.maxHeight;
            this.top = 0;
            this.bottom = this.height;
        }
        this.paddingLeft = 0;
        this.paddingTop = 0;
        this.paddingRight = 0;
        this.paddingBottom = 0;
    }
    afterSetDimensions() {
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(this.options.afterSetDimensions, [
            this
        ]);
    }
    _callHooks(name) {
        this.chart.notifyPlugins(name, this.getContext());
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(this.options[name], [
            this
        ]);
    }
    beforeDataLimits() {
        this._callHooks('beforeDataLimits');
    }
    determineDataLimits() {}
    afterDataLimits() {
        this._callHooks('afterDataLimits');
    }
    beforeBuildTicks() {
        this._callHooks('beforeBuildTicks');
    }
 buildTicks() {
        return [];
    }
    afterBuildTicks() {
        this._callHooks('afterBuildTicks');
    }
    beforeTickToLabelConversion() {
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(this.options.beforeTickToLabelConversion, [
            this
        ]);
    }
 generateTickLabels(ticks) {
        const tickOpts = this.options.ticks;
        let i, ilen, tick;
        for(i = 0, ilen = ticks.length; i < ilen; i++){
            tick = ticks[i];
            tick.label = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(tickOpts.callback, [
                tick.value,
                i,
                ticks
            ], this);
        }
    }
    afterTickToLabelConversion() {
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(this.options.afterTickToLabelConversion, [
            this
        ]);
    }
    beforeCalculateLabelRotation() {
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(this.options.beforeCalculateLabelRotation, [
            this
        ]);
    }
    calculateLabelRotation() {
        const options = this.options;
        const tickOpts = options.ticks;
        const numTicks = getTicksLimit(this.ticks.length, options.ticks.maxTicksLimit);
        const minRotation = tickOpts.minRotation || 0;
        const maxRotation = tickOpts.maxRotation;
        let labelRotation = minRotation;
        let tickWidth, maxHeight, maxLabelDiagonal;
        if (!this._isVisible() || !tickOpts.display || minRotation >= maxRotation || numTicks <= 1 || !this.isHorizontal()) {
            this.labelRotation = minRotation;
            return;
        }
        const labelSizes = this._getLabelSizes();
        const maxLabelWidth = labelSizes.widest.width;
        const maxLabelHeight = labelSizes.highest.height;
        const maxWidth = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.S)(this.chart.width - maxLabelWidth, 0, this.maxWidth);
        tickWidth = options.offset ? this.maxWidth / numTicks : maxWidth / (numTicks - 1);
        if (maxLabelWidth + 6 > tickWidth) {
            tickWidth = maxWidth / (numTicks - (options.offset ? 0.5 : 1));
            maxHeight = this.maxHeight - getTickMarkLength(options.grid) - tickOpts.padding - getTitleHeight(options.title, this.chart.options.font);
            maxLabelDiagonal = Math.sqrt(maxLabelWidth * maxLabelWidth + maxLabelHeight * maxLabelHeight);
            labelRotation = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.U)(Math.min(Math.asin((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.S)((labelSizes.highest.height + 6) / tickWidth, -1, 1)), Math.asin((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.S)(maxHeight / maxLabelDiagonal, -1, 1)) - Math.asin((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.S)(maxLabelHeight / maxLabelDiagonal, -1, 1))));
            labelRotation = Math.max(minRotation, Math.min(maxRotation, labelRotation));
        }
        this.labelRotation = labelRotation;
    }
    afterCalculateLabelRotation() {
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(this.options.afterCalculateLabelRotation, [
            this
        ]);
    }
    afterAutoSkip() {}
    beforeFit() {
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(this.options.beforeFit, [
            this
        ]);
    }
    fit() {
        const minSize = {
            width: 0,
            height: 0
        };
        const { chart , options: { ticks: tickOpts , title: titleOpts , grid: gridOpts  }  } = this;
        const display = this._isVisible();
        const isHorizontal = this.isHorizontal();
        if (display) {
            const titleHeight = getTitleHeight(titleOpts, chart.options.font);
            if (isHorizontal) {
                minSize.width = this.maxWidth;
                minSize.height = getTickMarkLength(gridOpts) + titleHeight;
            } else {
                minSize.height = this.maxHeight;
                minSize.width = getTickMarkLength(gridOpts) + titleHeight;
            }
            if (tickOpts.display && this.ticks.length) {
                const { first , last , widest , highest  } = this._getLabelSizes();
                const tickPadding = tickOpts.padding * 2;
                const angleRadians = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.t)(this.labelRotation);
                const cos = Math.cos(angleRadians);
                const sin = Math.sin(angleRadians);
                if (isHorizontal) {
                    const labelHeight = tickOpts.mirror ? 0 : sin * widest.width + cos * highest.height;
                    minSize.height = Math.min(this.maxHeight, minSize.height + labelHeight + tickPadding);
                } else {
                    const labelWidth = tickOpts.mirror ? 0 : cos * widest.width + sin * highest.height;
                    minSize.width = Math.min(this.maxWidth, minSize.width + labelWidth + tickPadding);
                }
                this._calculatePadding(first, last, sin, cos);
            }
        }
        this._handleMargins();
        if (isHorizontal) {
            this.width = this._length = chart.width - this._margins.left - this._margins.right;
            this.height = minSize.height;
        } else {
            this.width = minSize.width;
            this.height = this._length = chart.height - this._margins.top - this._margins.bottom;
        }
    }
    _calculatePadding(first, last, sin, cos) {
        const { ticks: { align , padding  } , position  } = this.options;
        const isRotated = this.labelRotation !== 0;
        const labelsBelowTicks = position !== 'top' && this.axis === 'x';
        if (this.isHorizontal()) {
            const offsetLeft = this.getPixelForTick(0) - this.left;
            const offsetRight = this.right - this.getPixelForTick(this.ticks.length - 1);
            let paddingLeft = 0;
            let paddingRight = 0;
            if (isRotated) {
                if (labelsBelowTicks) {
                    paddingLeft = cos * first.width;
                    paddingRight = sin * last.height;
                } else {
                    paddingLeft = sin * first.height;
                    paddingRight = cos * last.width;
                }
            } else if (align === 'start') {
                paddingRight = last.width;
            } else if (align === 'end') {
                paddingLeft = first.width;
            } else if (align !== 'inner') {
                paddingLeft = first.width / 2;
                paddingRight = last.width / 2;
            }
            this.paddingLeft = Math.max((paddingLeft - offsetLeft + padding) * this.width / (this.width - offsetLeft), 0);
            this.paddingRight = Math.max((paddingRight - offsetRight + padding) * this.width / (this.width - offsetRight), 0);
        } else {
            let paddingTop = last.height / 2;
            let paddingBottom = first.height / 2;
            if (align === 'start') {
                paddingTop = 0;
                paddingBottom = first.height;
            } else if (align === 'end') {
                paddingTop = last.height;
                paddingBottom = 0;
            }
            this.paddingTop = paddingTop + padding;
            this.paddingBottom = paddingBottom + padding;
        }
    }
 _handleMargins() {
        if (this._margins) {
            this._margins.left = Math.max(this.paddingLeft, this._margins.left);
            this._margins.top = Math.max(this.paddingTop, this._margins.top);
            this._margins.right = Math.max(this.paddingRight, this._margins.right);
            this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom);
        }
    }
    afterFit() {
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(this.options.afterFit, [
            this
        ]);
    }
 isHorizontal() {
        const { axis , position  } = this.options;
        return position === 'top' || position === 'bottom' || axis === 'x';
    }
 isFullSize() {
        return this.options.fullSize;
    }
 _convertTicksToLabels(ticks) {
        this.beforeTickToLabelConversion();
        this.generateTickLabels(ticks);
        let i, ilen;
        for(i = 0, ilen = ticks.length; i < ilen; i++){
            if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(ticks[i].label)) {
                ticks.splice(i, 1);
                ilen--;
                i--;
            }
        }
        this.afterTickToLabelConversion();
    }
 _getLabelSizes() {
        let labelSizes = this._labelSizes;
        if (!labelSizes) {
            const sampleSize = this.options.ticks.sampleSize;
            let ticks = this.ticks;
            if (sampleSize < ticks.length) {
                ticks = sample(ticks, sampleSize);
            }
            this._labelSizes = labelSizes = this._computeLabelSizes(ticks, ticks.length, this.options.ticks.maxTicksLimit);
        }
        return labelSizes;
    }
 _computeLabelSizes(ticks, length, maxTicksLimit) {
        const { ctx , _longestTextCache: caches  } = this;
        const widths = [];
        const heights = [];
        const increment = Math.floor(length / getTicksLimit(length, maxTicksLimit));
        let widestLabelSize = 0;
        let highestLabelSize = 0;
        let i, j, jlen, label, tickFont, fontString, cache, lineHeight, width, height, nestedLabel;
        for(i = 0; i < length; i += increment){
            label = ticks[i].label;
            tickFont = this._resolveTickFontOptions(i);
            ctx.font = fontString = tickFont.string;
            cache = caches[fontString] = caches[fontString] || {
                data: {},
                gc: []
            };
            lineHeight = tickFont.lineHeight;
            width = height = 0;
            if (!(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(label) && !(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.b)(label)) {
                width = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.V)(ctx, cache.data, cache.gc, width, label);
                height = lineHeight;
            } else if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.b)(label)) {
                for(j = 0, jlen = label.length; j < jlen; ++j){
                    nestedLabel =  label[j];
                    if (!(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(nestedLabel) && !(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.b)(nestedLabel)) {
                        width = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.V)(ctx, cache.data, cache.gc, width, nestedLabel);
                        height += lineHeight;
                    }
                }
            }
            widths.push(width);
            heights.push(height);
            widestLabelSize = Math.max(width, widestLabelSize);
            highestLabelSize = Math.max(height, highestLabelSize);
        }
        garbageCollect(caches, length);
        const widest = widths.indexOf(widestLabelSize);
        const highest = heights.indexOf(highestLabelSize);
        const valueAt = (idx)=>({
                width: widths[idx] || 0,
                height: heights[idx] || 0
            });
        return {
            first: valueAt(0),
            last: valueAt(length - 1),
            widest: valueAt(widest),
            highest: valueAt(highest),
            widths,
            heights
        };
    }
 getLabelForValue(value) {
        return value;
    }
 getPixelForValue(value, index) {
        return NaN;
    }
 getValueForPixel(pixel) {}
 getPixelForTick(index) {
        const ticks = this.ticks;
        if (index < 0 || index > ticks.length - 1) {
            return null;
        }
        return this.getPixelForValue(ticks[index].value);
    }
 getPixelForDecimal(decimal) {
        if (this._reversePixels) {
            decimal = 1 - decimal;
        }
        const pixel = this._startPixel + decimal * this._length;
        return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.W)(this._alignToPixels ? (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.X)(this.chart, pixel, 0) : pixel);
    }
 getDecimalForPixel(pixel) {
        const decimal = (pixel - this._startPixel) / this._length;
        return this._reversePixels ? 1 - decimal : decimal;
    }
 getBasePixel() {
        return this.getPixelForValue(this.getBaseValue());
    }
 getBaseValue() {
        const { min , max  } = this;
        return min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0;
    }
 getContext(index) {
        const ticks = this.ticks || [];
        if (index >= 0 && index < ticks.length) {
            const tick = ticks[index];
            return tick.$context || (tick.$context = createTickContext(this.getContext(), index, tick));
        }
        return this.$context || (this.$context = createScaleContext(this.chart.getContext(), this));
    }
 _tickSize() {
        const optionTicks = this.options.ticks;
        const rot = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.t)(this.labelRotation);
        const cos = Math.abs(Math.cos(rot));
        const sin = Math.abs(Math.sin(rot));
        const labelSizes = this._getLabelSizes();
        const padding = optionTicks.autoSkipPadding || 0;
        const w = labelSizes ? labelSizes.widest.width + padding : 0;
        const h = labelSizes ? labelSizes.highest.height + padding : 0;
        return this.isHorizontal() ? h * cos > w * sin ? w / cos : h / sin : h * sin < w * cos ? h / cos : w / sin;
    }
 _isVisible() {
        const display = this.options.display;
        if (display !== 'auto') {
            return !!display;
        }
        return this.getMatchingVisibleMetas().length > 0;
    }
 _computeGridLineItems(chartArea) {
        const axis = this.axis;
        const chart = this.chart;
        const options = this.options;
        const { grid , position , border  } = options;
        const offset = grid.offset;
        const isHorizontal = this.isHorizontal();
        const ticks = this.ticks;
        const ticksLength = ticks.length + (offset ? 1 : 0);
        const tl = getTickMarkLength(grid);
        const items = [];
        const borderOpts = border.setContext(this.getContext());
        const axisWidth = borderOpts.display ? borderOpts.width : 0;
        const axisHalfWidth = axisWidth / 2;
        const alignBorderValue = function(pixel) {
            return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.X)(chart, pixel, axisWidth);
        };
        let borderValue, i, lineValue, alignedLineValue;
        let tx1, ty1, tx2, ty2, x1, y1, x2, y2;
        if (position === 'top') {
            borderValue = alignBorderValue(this.bottom);
            ty1 = this.bottom - tl;
            ty2 = borderValue - axisHalfWidth;
            y1 = alignBorderValue(chartArea.top) + axisHalfWidth;
            y2 = chartArea.bottom;
        } else if (position === 'bottom') {
            borderValue = alignBorderValue(this.top);
            y1 = chartArea.top;
            y2 = alignBorderValue(chartArea.bottom) - axisHalfWidth;
            ty1 = borderValue + axisHalfWidth;
            ty2 = this.top + tl;
        } else if (position === 'left') {
            borderValue = alignBorderValue(this.right);
            tx1 = this.right - tl;
            tx2 = borderValue - axisHalfWidth;
            x1 = alignBorderValue(chartArea.left) + axisHalfWidth;
            x2 = chartArea.right;
        } else if (position === 'right') {
            borderValue = alignBorderValue(this.left);
            x1 = chartArea.left;
            x2 = alignBorderValue(chartArea.right) - axisHalfWidth;
            tx1 = borderValue + axisHalfWidth;
            tx2 = this.left + tl;
        } else if (axis === 'x') {
            if (position === 'center') {
                borderValue = alignBorderValue((chartArea.top + chartArea.bottom) / 2 + 0.5);
            } else if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.i)(position)) {
                const positionAxisID = Object.keys(position)[0];
                const value = position[positionAxisID];
                borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
            }
            y1 = chartArea.top;
            y2 = chartArea.bottom;
            ty1 = borderValue + axisHalfWidth;
            ty2 = ty1 + tl;
        } else if (axis === 'y') {
            if (position === 'center') {
                borderValue = alignBorderValue((chartArea.left + chartArea.right) / 2);
            } else if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.i)(position)) {
                const positionAxisID = Object.keys(position)[0];
                const value = position[positionAxisID];
                borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
            }
            tx1 = borderValue - axisHalfWidth;
            tx2 = tx1 - tl;
            x1 = chartArea.left;
            x2 = chartArea.right;
        }
        const limit = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(options.ticks.maxTicksLimit, ticksLength);
        const step = Math.max(1, Math.ceil(ticksLength / limit));
        for(i = 0; i < ticksLength; i += step){
            const context = this.getContext(i);
            const optsAtIndex = grid.setContext(context);
            const optsAtIndexBorder = border.setContext(context);
            const lineWidth = optsAtIndex.lineWidth;
            const lineColor = optsAtIndex.color;
            const borderDash = optsAtIndexBorder.dash || [];
            const borderDashOffset = optsAtIndexBorder.dashOffset;
            const tickWidth = optsAtIndex.tickWidth;
            const tickColor = optsAtIndex.tickColor;
            const tickBorderDash = optsAtIndex.tickBorderDash || [];
            const tickBorderDashOffset = optsAtIndex.tickBorderDashOffset;
            lineValue = getPixelForGridLine(this, i, offset);
            if (lineValue === undefined) {
                continue;
            }
            alignedLineValue = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.X)(chart, lineValue, lineWidth);
            if (isHorizontal) {
                tx1 = tx2 = x1 = x2 = alignedLineValue;
            } else {
                ty1 = ty2 = y1 = y2 = alignedLineValue;
            }
            items.push({
                tx1,
                ty1,
                tx2,
                ty2,
                x1,
                y1,
                x2,
                y2,
                width: lineWidth,
                color: lineColor,
                borderDash,
                borderDashOffset,
                tickWidth,
                tickColor,
                tickBorderDash,
                tickBorderDashOffset
            });
        }
        this._ticksLength = ticksLength;
        this._borderValue = borderValue;
        return items;
    }
 _computeLabelItems(chartArea) {
        const axis = this.axis;
        const options = this.options;
        const { position , ticks: optionTicks  } = options;
        const isHorizontal = this.isHorizontal();
        const ticks = this.ticks;
        const { align , crossAlign , padding , mirror  } = optionTicks;
        const tl = getTickMarkLength(options.grid);
        const tickAndPadding = tl + padding;
        const hTickAndPadding = mirror ? -padding : tickAndPadding;
        const rotation = -(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.t)(this.labelRotation);
        const items = [];
        let i, ilen, tick, label, x, y, textAlign, pixel, font, lineHeight, lineCount, textOffset;
        let textBaseline = 'middle';
        if (position === 'top') {
            y = this.bottom - hTickAndPadding;
            textAlign = this._getXAxisLabelAlignment();
        } else if (position === 'bottom') {
            y = this.top + hTickAndPadding;
            textAlign = this._getXAxisLabelAlignment();
        } else if (position === 'left') {
            const ret = this._getYAxisLabelAlignment(tl);
            textAlign = ret.textAlign;
            x = ret.x;
        } else if (position === 'right') {
            const ret = this._getYAxisLabelAlignment(tl);
            textAlign = ret.textAlign;
            x = ret.x;
        } else if (axis === 'x') {
            if (position === 'center') {
                y = (chartArea.top + chartArea.bottom) / 2 + tickAndPadding;
            } else if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.i)(position)) {
                const positionAxisID = Object.keys(position)[0];
                const value = position[positionAxisID];
                y = this.chart.scales[positionAxisID].getPixelForValue(value) + tickAndPadding;
            }
            textAlign = this._getXAxisLabelAlignment();
        } else if (axis === 'y') {
            if (position === 'center') {
                x = (chartArea.left + chartArea.right) / 2 - tickAndPadding;
            } else if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.i)(position)) {
                const positionAxisID = Object.keys(position)[0];
                const value = position[positionAxisID];
                x = this.chart.scales[positionAxisID].getPixelForValue(value);
            }
            textAlign = this._getYAxisLabelAlignment(tl).textAlign;
        }
        if (axis === 'y') {
            if (align === 'start') {
                textBaseline = 'top';
            } else if (align === 'end') {
                textBaseline = 'bottom';
            }
        }
        const labelSizes = this._getLabelSizes();
        for(i = 0, ilen = ticks.length; i < ilen; ++i){
            tick = ticks[i];
            label = tick.label;
            const optsAtIndex = optionTicks.setContext(this.getContext(i));
            pixel = this.getPixelForTick(i) + optionTicks.labelOffset;
            font = this._resolveTickFontOptions(i);
            lineHeight = font.lineHeight;
            lineCount = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.b)(label) ? label.length : 1;
            const halfCount = lineCount / 2;
            const color = optsAtIndex.color;
            const strokeColor = optsAtIndex.textStrokeColor;
            const strokeWidth = optsAtIndex.textStrokeWidth;
            let tickTextAlign = textAlign;
            if (isHorizontal) {
                x = pixel;
                if (textAlign === 'inner') {
                    if (i === ilen - 1) {
                        tickTextAlign = !this.options.reverse ? 'right' : 'left';
                    } else if (i === 0) {
                        tickTextAlign = !this.options.reverse ? 'left' : 'right';
                    } else {
                        tickTextAlign = 'center';
                    }
                }
                if (position === 'top') {
                    if (crossAlign === 'near' || rotation !== 0) {
                        textOffset = -lineCount * lineHeight + lineHeight / 2;
                    } else if (crossAlign === 'center') {
                        textOffset = -labelSizes.highest.height / 2 - halfCount * lineHeight + lineHeight;
                    } else {
                        textOffset = -labelSizes.highest.height + lineHeight / 2;
                    }
                } else {
                    if (crossAlign === 'near' || rotation !== 0) {
                        textOffset = lineHeight / 2;
                    } else if (crossAlign === 'center') {
                        textOffset = labelSizes.highest.height / 2 - halfCount * lineHeight;
                    } else {
                        textOffset = labelSizes.highest.height - lineCount * lineHeight;
                    }
                }
                if (mirror) {
                    textOffset *= -1;
                }
                if (rotation !== 0 && !optsAtIndex.showLabelBackdrop) {
                    x += lineHeight / 2 * Math.sin(rotation);
                }
            } else {
                y = pixel;
                textOffset = (1 - lineCount) * lineHeight / 2;
            }
            let backdrop;
            if (optsAtIndex.showLabelBackdrop) {
                const labelPadding = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.E)(optsAtIndex.backdropPadding);
                const height = labelSizes.heights[i];
                const width = labelSizes.widths[i];
                let top = textOffset - labelPadding.top;
                let left = 0 - labelPadding.left;
                switch(textBaseline){
                    case 'middle':
                        top -= height / 2;
                        break;
                    case 'bottom':
                        top -= height;
                        break;
                }
                switch(textAlign){
                    case 'center':
                        left -= width / 2;
                        break;
                    case 'right':
                        left -= width;
                        break;
                    case 'inner':
                        if (i === ilen - 1) {
                            left -= width;
                        } else if (i > 0) {
                            left -= width / 2;
                        }
                        break;
                }
                backdrop = {
                    left,
                    top,
                    width: width + labelPadding.width,
                    height: height + labelPadding.height,
                    color: optsAtIndex.backdropColor
                };
            }
            items.push({
                label,
                font,
                textOffset,
                options: {
                    rotation,
                    color,
                    strokeColor,
                    strokeWidth,
                    textAlign: tickTextAlign,
                    textBaseline,
                    translation: [
                        x,
                        y
                    ],
                    backdrop
                }
            });
        }
        return items;
    }
    _getXAxisLabelAlignment() {
        const { position , ticks  } = this.options;
        const rotation = -(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.t)(this.labelRotation);
        if (rotation) {
            return position === 'top' ? 'left' : 'right';
        }
        let align = 'center';
        if (ticks.align === 'start') {
            align = 'left';
        } else if (ticks.align === 'end') {
            align = 'right';
        } else if (ticks.align === 'inner') {
            align = 'inner';
        }
        return align;
    }
    _getYAxisLabelAlignment(tl) {
        const { position , ticks: { crossAlign , mirror , padding  }  } = this.options;
        const labelSizes = this._getLabelSizes();
        const tickAndPadding = tl + padding;
        const widest = labelSizes.widest.width;
        let textAlign;
        let x;
        if (position === 'left') {
            if (mirror) {
                x = this.right + padding;
                if (crossAlign === 'near') {
                    textAlign = 'left';
                } else if (crossAlign === 'center') {
                    textAlign = 'center';
                    x += widest / 2;
                } else {
                    textAlign = 'right';
                    x += widest;
                }
            } else {
                x = this.right - tickAndPadding;
                if (crossAlign === 'near') {
                    textAlign = 'right';
                } else if (crossAlign === 'center') {
                    textAlign = 'center';
                    x -= widest / 2;
                } else {
                    textAlign = 'left';
                    x = this.left;
                }
            }
        } else if (position === 'right') {
            if (mirror) {
                x = this.left + padding;
                if (crossAlign === 'near') {
                    textAlign = 'right';
                } else if (crossAlign === 'center') {
                    textAlign = 'center';
                    x -= widest / 2;
                } else {
                    textAlign = 'left';
                    x -= widest;
                }
            } else {
                x = this.left + tickAndPadding;
                if (crossAlign === 'near') {
                    textAlign = 'left';
                } else if (crossAlign === 'center') {
                    textAlign = 'center';
                    x += widest / 2;
                } else {
                    textAlign = 'right';
                    x = this.right;
                }
            }
        } else {
            textAlign = 'right';
        }
        return {
            textAlign,
            x
        };
    }
 _computeLabelArea() {
        if (this.options.ticks.mirror) {
            return;
        }
        const chart = this.chart;
        const position = this.options.position;
        if (position === 'left' || position === 'right') {
            return {
                top: 0,
                left: this.left,
                bottom: chart.height,
                right: this.right
            };
        }
        if (position === 'top' || position === 'bottom') {
            return {
                top: this.top,
                left: 0,
                bottom: this.bottom,
                right: chart.width
            };
        }
    }
 drawBackground() {
        const { ctx , options: { backgroundColor  } , left , top , width , height  } = this;
        if (backgroundColor) {
            ctx.save();
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(left, top, width, height);
            ctx.restore();
        }
    }
    getLineWidthForValue(value) {
        const grid = this.options.grid;
        if (!this._isVisible() || !grid.display) {
            return 0;
        }
        const ticks = this.ticks;
        const index = ticks.findIndex((t)=>t.value === value);
        if (index >= 0) {
            const opts = grid.setContext(this.getContext(index));
            return opts.lineWidth;
        }
        return 0;
    }
 drawGrid(chartArea) {
        const grid = this.options.grid;
        const ctx = this.ctx;
        const items = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(chartArea));
        let i, ilen;
        const drawLine = (p1, p2, style)=>{
            if (!style.width || !style.color) {
                return;
            }
            ctx.save();
            ctx.lineWidth = style.width;
            ctx.strokeStyle = style.color;
            ctx.setLineDash(style.borderDash || []);
            ctx.lineDashOffset = style.borderDashOffset;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
        };
        if (grid.display) {
            for(i = 0, ilen = items.length; i < ilen; ++i){
                const item = items[i];
                if (grid.drawOnChartArea) {
                    drawLine({
                        x: item.x1,
                        y: item.y1
                    }, {
                        x: item.x2,
                        y: item.y2
                    }, item);
                }
                if (grid.drawTicks) {
                    drawLine({
                        x: item.tx1,
                        y: item.ty1
                    }, {
                        x: item.tx2,
                        y: item.ty2
                    }, {
                        color: item.tickColor,
                        width: item.tickWidth,
                        borderDash: item.tickBorderDash,
                        borderDashOffset: item.tickBorderDashOffset
                    });
                }
            }
        }
    }
 drawBorder() {
        const { chart , ctx , options: { border , grid  }  } = this;
        const borderOpts = border.setContext(this.getContext());
        const axisWidth = border.display ? borderOpts.width : 0;
        if (!axisWidth) {
            return;
        }
        const lastLineWidth = grid.setContext(this.getContext(0)).lineWidth;
        const borderValue = this._borderValue;
        let x1, x2, y1, y2;
        if (this.isHorizontal()) {
            x1 = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.X)(chart, this.left, axisWidth) - axisWidth / 2;
            x2 = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.X)(chart, this.right, lastLineWidth) + lastLineWidth / 2;
            y1 = y2 = borderValue;
        } else {
            y1 = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.X)(chart, this.top, axisWidth) - axisWidth / 2;
            y2 = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.X)(chart, this.bottom, lastLineWidth) + lastLineWidth / 2;
            x1 = x2 = borderValue;
        }
        ctx.save();
        ctx.lineWidth = borderOpts.width;
        ctx.strokeStyle = borderOpts.color;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();
    }
 drawLabels(chartArea) {
        const optionTicks = this.options.ticks;
        if (!optionTicks.display) {
            return;
        }
        const ctx = this.ctx;
        const area = this._computeLabelArea();
        if (area) {
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Y)(ctx, area);
        }
        const items = this.getLabelItems(chartArea);
        for (const item of items){
            const renderTextOptions = item.options;
            const tickFont = item.font;
            const label = item.label;
            const y = item.textOffset;
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Z)(ctx, label, 0, y, tickFont, renderTextOptions);
        }
        if (area) {
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.$)(ctx);
        }
    }
 drawTitle() {
        const { ctx , options: { position , title , reverse  }  } = this;
        if (!title.display) {
            return;
        }
        const font = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a0)(title.font);
        const padding = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.E)(title.padding);
        const align = title.align;
        let offset = font.lineHeight / 2;
        if (position === 'bottom' || position === 'center' || (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.i)(position)) {
            offset += padding.bottom;
            if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.b)(title.text)) {
                offset += font.lineHeight * (title.text.length - 1);
            }
        } else {
            offset += padding.top;
        }
        const { titleX , titleY , maxWidth , rotation  } = titleArgs(this, offset, position, align);
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Z)(ctx, title.text, 0, 0, font, {
            color: title.color,
            maxWidth,
            rotation,
            textAlign: titleAlign(align, position, reverse),
            textBaseline: 'middle',
            translation: [
                titleX,
                titleY
            ]
        });
    }
    draw(chartArea) {
        if (!this._isVisible()) {
            return;
        }
        this.drawBackground();
        this.drawGrid(chartArea);
        this.drawBorder();
        this.drawTitle();
        this.drawLabels(chartArea);
    }
 _layers() {
        const opts = this.options;
        const tz = opts.ticks && opts.ticks.z || 0;
        const gz = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(opts.grid && opts.grid.z, -1);
        const bz = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(opts.border && opts.border.z, 0);
        if (!this._isVisible() || this.draw !== Scale.prototype.draw) {
            return [
                {
                    z: tz,
                    draw: (chartArea)=>{
                        this.draw(chartArea);
                    }
                }
            ];
        }
        return [
            {
                z: gz,
                draw: (chartArea)=>{
                    this.drawBackground();
                    this.drawGrid(chartArea);
                    this.drawTitle();
                }
            },
            {
                z: bz,
                draw: ()=>{
                    this.drawBorder();
                }
            },
            {
                z: tz,
                draw: (chartArea)=>{
                    this.drawLabels(chartArea);
                }
            }
        ];
    }
 getMatchingVisibleMetas(type) {
        const metas = this.chart.getSortedVisibleDatasetMetas();
        const axisID = this.axis + 'AxisID';
        const result = [];
        let i, ilen;
        for(i = 0, ilen = metas.length; i < ilen; ++i){
            const meta = metas[i];
            if (meta[axisID] === this.id && (!type || meta.type === type)) {
                result.push(meta);
            }
        }
        return result;
    }
 _resolveTickFontOptions(index) {
        const opts = this.options.ticks.setContext(this.getContext(index));
        return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a0)(opts.font);
    }
 _maxDigits() {
        const fontSize = this._resolveTickFontOptions(0).lineHeight;
        return (this.isHorizontal() ? this.width : this.height) / fontSize;
    }
}

class TypedRegistry {
    constructor(type, scope, override){
        this.type = type;
        this.scope = scope;
        this.override = override;
        this.items = Object.create(null);
    }
    isForType(type) {
        return Object.prototype.isPrototypeOf.call(this.type.prototype, type.prototype);
    }
 register(item) {
        const proto = Object.getPrototypeOf(item);
        let parentScope;
        if (isIChartComponent(proto)) {
            parentScope = this.register(proto);
        }
        const items = this.items;
        const id = item.id;
        const scope = this.scope + '.' + id;
        if (!id) {
            throw new Error('class does not have id: ' + item);
        }
        if (id in items) {
            return scope;
        }
        items[id] = item;
        registerDefaults(item, scope, parentScope);
        if (this.override) {
            _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.d.override(item.id, item.overrides);
        }
        return scope;
    }
 get(id) {
        return this.items[id];
    }
 unregister(item) {
        const items = this.items;
        const id = item.id;
        const scope = this.scope;
        if (id in items) {
            delete items[id];
        }
        if (scope && id in _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.d[scope]) {
            delete _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.d[scope][id];
            if (this.override) {
                delete _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a3[id];
            }
        }
    }
}
function registerDefaults(item, scope, parentScope) {
    const itemDefaults = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a4)(Object.create(null), [
        parentScope ? _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.d.get(parentScope) : {},
        _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.d.get(scope),
        item.defaults
    ]);
    _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.d.set(scope, itemDefaults);
    if (item.defaultRoutes) {
        routeDefaults(scope, item.defaultRoutes);
    }
    if (item.descriptors) {
        _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.d.describe(scope, item.descriptors);
    }
}
function routeDefaults(scope, routes) {
    Object.keys(routes).forEach((property)=>{
        const propertyParts = property.split('.');
        const sourceName = propertyParts.pop();
        const sourceScope = [
            scope
        ].concat(propertyParts).join('.');
        const parts = routes[property].split('.');
        const targetName = parts.pop();
        const targetScope = parts.join('.');
        _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.d.route(sourceScope, sourceName, targetScope, targetName);
    });
}
function isIChartComponent(proto) {
    return 'id' in proto && 'defaults' in proto;
}

class Registry {
    constructor(){
        this.controllers = new TypedRegistry(DatasetController, 'datasets', true);
        this.elements = new TypedRegistry(Element, 'elements');
        this.plugins = new TypedRegistry(Object, 'plugins');
        this.scales = new TypedRegistry(Scale, 'scales');
        this._typedRegistries = [
            this.controllers,
            this.scales,
            this.elements
        ];
    }
 add(...args) {
        this._each('register', args);
    }
    remove(...args) {
        this._each('unregister', args);
    }
 addControllers(...args) {
        this._each('register', args, this.controllers);
    }
 addElements(...args) {
        this._each('register', args, this.elements);
    }
 addPlugins(...args) {
        this._each('register', args, this.plugins);
    }
 addScales(...args) {
        this._each('register', args, this.scales);
    }
 getController(id) {
        return this._get(id, this.controllers, 'controller');
    }
 getElement(id) {
        return this._get(id, this.elements, 'element');
    }
 getPlugin(id) {
        return this._get(id, this.plugins, 'plugin');
    }
 getScale(id) {
        return this._get(id, this.scales, 'scale');
    }
 removeControllers(...args) {
        this._each('unregister', args, this.controllers);
    }
 removeElements(...args) {
        this._each('unregister', args, this.elements);
    }
 removePlugins(...args) {
        this._each('unregister', args, this.plugins);
    }
 removeScales(...args) {
        this._each('unregister', args, this.scales);
    }
 _each(method, args, typedRegistry) {
        [
            ...args
        ].forEach((arg)=>{
            const reg = typedRegistry || this._getRegistryForType(arg);
            if (typedRegistry || reg.isForType(arg) || reg === this.plugins && arg.id) {
                this._exec(method, reg, arg);
            } else {
                (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(arg, (item)=>{
                    const itemReg = typedRegistry || this._getRegistryForType(item);
                    this._exec(method, itemReg, item);
                });
            }
        });
    }
 _exec(method, registry, component) {
        const camelMethod = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a5)(method);
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(component['before' + camelMethod], [], component);
        registry[method](component);
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(component['after' + camelMethod], [], component);
    }
 _getRegistryForType(type) {
        for(let i = 0; i < this._typedRegistries.length; i++){
            const reg = this._typedRegistries[i];
            if (reg.isForType(type)) {
                return reg;
            }
        }
        return this.plugins;
    }
 _get(id, typedRegistry, type) {
        const item = typedRegistry.get(id);
        if (item === undefined) {
            throw new Error('"' + id + '" is not a registered ' + type + '.');
        }
        return item;
    }
}
var registry = /* #__PURE__ */ new Registry();

class PluginService {
    constructor(){
        this._init = [];
    }
 notify(chart, hook, args, filter) {
        if (hook === 'beforeInit') {
            this._init = this._createDescriptors(chart, true);
            this._notify(this._init, chart, 'install');
        }
        const descriptors = filter ? this._descriptors(chart).filter(filter) : this._descriptors(chart);
        const result = this._notify(descriptors, chart, hook, args);
        if (hook === 'afterDestroy') {
            this._notify(descriptors, chart, 'stop');
            this._notify(this._init, chart, 'uninstall');
        }
        return result;
    }
 _notify(descriptors, chart, hook, args) {
        args = args || {};
        for (const descriptor of descriptors){
            const plugin = descriptor.plugin;
            const method = plugin[hook];
            const params = [
                chart,
                args,
                descriptor.options
            ];
            if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(method, params, plugin) === false && args.cancelable) {
                return false;
            }
        }
        return true;
    }
    invalidate() {
        if (!(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(this._cache)) {
            this._oldCache = this._cache;
            this._cache = undefined;
        }
    }
 _descriptors(chart) {
        if (this._cache) {
            return this._cache;
        }
        const descriptors = this._cache = this._createDescriptors(chart);
        this._notifyStateChanges(chart);
        return descriptors;
    }
    _createDescriptors(chart, all) {
        const config = chart && chart.config;
        const options = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(config.options && config.options.plugins, {});
        const plugins = allPlugins(config);
        return options === false && !all ? [] : createDescriptors(chart, plugins, options, all);
    }
 _notifyStateChanges(chart) {
        const previousDescriptors = this._oldCache || [];
        const descriptors = this._cache;
        const diff = (a, b)=>a.filter((x)=>!b.some((y)=>x.plugin.id === y.plugin.id));
        this._notify(diff(previousDescriptors, descriptors), chart, 'stop');
        this._notify(diff(descriptors, previousDescriptors), chart, 'start');
    }
}
 function allPlugins(config) {
    const localIds = {};
    const plugins = [];
    const keys = Object.keys(registry.plugins.items);
    for(let i = 0; i < keys.length; i++){
        plugins.push(registry.getPlugin(keys[i]));
    }
    const local = config.plugins || [];
    for(let i = 0; i < local.length; i++){
        const plugin = local[i];
        if (plugins.indexOf(plugin) === -1) {
            plugins.push(plugin);
            localIds[plugin.id] = true;
        }
    }
    return {
        plugins,
        localIds
    };
}
function getOpts(options, all) {
    if (!all && options === false) {
        return null;
    }
    if (options === true) {
        return {};
    }
    return options;
}
function createDescriptors(chart, { plugins , localIds  }, options, all) {
    const result = [];
    const context = chart.getContext();
    for (const plugin of plugins){
        const id = plugin.id;
        const opts = getOpts(options[id], all);
        if (opts === null) {
            continue;
        }
        result.push({
            plugin,
            options: pluginOpts(chart.config, {
                plugin,
                local: localIds[id]
            }, opts, context)
        });
    }
    return result;
}
function pluginOpts(config, { plugin , local  }, opts, context) {
    const keys = config.pluginScopeKeys(plugin);
    const scopes = config.getOptionScopes(opts, keys);
    if (local && plugin.defaults) {
        scopes.push(plugin.defaults);
    }
    return config.createResolver(scopes, context, [
        ''
    ], {
        scriptable: false,
        indexable: false,
        allKeys: true
    });
}

function getIndexAxis(type, options) {
    const datasetDefaults = _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.d.datasets[type] || {};
    const datasetOptions = (options.datasets || {})[type] || {};
    return datasetOptions.indexAxis || options.indexAxis || datasetDefaults.indexAxis || 'x';
}
function getAxisFromDefaultScaleID(id, indexAxis) {
    let axis = id;
    if (id === '_index_') {
        axis = indexAxis;
    } else if (id === '_value_') {
        axis = indexAxis === 'x' ? 'y' : 'x';
    }
    return axis;
}
function getDefaultScaleIDFromAxis(axis, indexAxis) {
    return axis === indexAxis ? '_index_' : '_value_';
}
function idMatchesAxis(id) {
    if (id === 'x' || id === 'y' || id === 'r') {
        return id;
    }
}
function axisFromPosition(position) {
    if (position === 'top' || position === 'bottom') {
        return 'x';
    }
    if (position === 'left' || position === 'right') {
        return 'y';
    }
}
function determineAxis(id, ...scaleOptions) {
    if (idMatchesAxis(id)) {
        return id;
    }
    for (const opts of scaleOptions){
        const axis = opts.axis || axisFromPosition(opts.position) || id.length > 1 && idMatchesAxis(id[0].toLowerCase());
        if (axis) {
            return axis;
        }
    }
    throw new Error(`Cannot determine type of '${id}' axis. Please provide 'axis' or 'position' option.`);
}
function getAxisFromDataset(id, axis, dataset) {
    if (dataset[axis + 'AxisID'] === id) {
        return {
            axis
        };
    }
}
function retrieveAxisFromDatasets(id, config) {
    if (config.data && config.data.datasets) {
        const boundDs = config.data.datasets.filter((d)=>d.xAxisID === id || d.yAxisID === id);
        if (boundDs.length) {
            return getAxisFromDataset(id, 'x', boundDs[0]) || getAxisFromDataset(id, 'y', boundDs[0]);
        }
    }
    return {};
}
function mergeScaleConfig(config, options) {
    const chartDefaults = _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a3[config.type] || {
        scales: {}
    };
    const configScales = options.scales || {};
    const chartIndexAxis = getIndexAxis(config.type, options);
    const scales = Object.create(null);
    Object.keys(configScales).forEach((id)=>{
        const scaleConf = configScales[id];
        if (!(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.i)(scaleConf)) {
            return console.error(`Invalid scale configuration for scale: ${id}`);
        }
        if (scaleConf._proxy) {
            return console.warn(`Ignoring resolver passed as options for scale: ${id}`);
        }
        const axis = determineAxis(id, scaleConf, retrieveAxisFromDatasets(id, config), _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.d.scales[scaleConf.type]);
        const defaultId = getDefaultScaleIDFromAxis(axis, chartIndexAxis);
        const defaultScaleOptions = chartDefaults.scales || {};
        scales[id] = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ab)(Object.create(null), [
            {
                axis
            },
            scaleConf,
            defaultScaleOptions[axis],
            defaultScaleOptions[defaultId]
        ]);
    });
    config.data.datasets.forEach((dataset)=>{
        const type = dataset.type || config.type;
        const indexAxis = dataset.indexAxis || getIndexAxis(type, options);
        const datasetDefaults = _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a3[type] || {};
        const defaultScaleOptions = datasetDefaults.scales || {};
        Object.keys(defaultScaleOptions).forEach((defaultID)=>{
            const axis = getAxisFromDefaultScaleID(defaultID, indexAxis);
            const id = dataset[axis + 'AxisID'] || axis;
            scales[id] = scales[id] || Object.create(null);
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ab)(scales[id], [
                {
                    axis
                },
                configScales[id],
                defaultScaleOptions[defaultID]
            ]);
        });
    });
    Object.keys(scales).forEach((key)=>{
        const scale = scales[key];
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ab)(scale, [
            _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.d.scales[scale.type],
            _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.d.scale
        ]);
    });
    return scales;
}
function initOptions(config) {
    const options = config.options || (config.options = {});
    options.plugins = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(options.plugins, {});
    options.scales = mergeScaleConfig(config, options);
}
function initData(data) {
    data = data || {};
    data.datasets = data.datasets || [];
    data.labels = data.labels || [];
    return data;
}
function initConfig(config) {
    config = config || {};
    config.data = initData(config.data);
    initOptions(config);
    return config;
}
const keyCache = new Map();
const keysCached = new Set();
function cachedKeys(cacheKey, generate) {
    let keys = keyCache.get(cacheKey);
    if (!keys) {
        keys = generate();
        keyCache.set(cacheKey, keys);
        keysCached.add(keys);
    }
    return keys;
}
const addIfFound = (set, obj, key)=>{
    const opts = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.f)(obj, key);
    if (opts !== undefined) {
        set.add(opts);
    }
};
class Config {
    constructor(config){
        this._config = initConfig(config);
        this._scopeCache = new Map();
        this._resolverCache = new Map();
    }
    get platform() {
        return this._config.platform;
    }
    get type() {
        return this._config.type;
    }
    set type(type) {
        this._config.type = type;
    }
    get data() {
        return this._config.data;
    }
    set data(data) {
        this._config.data = initData(data);
    }
    get options() {
        return this._config.options;
    }
    set options(options) {
        this._config.options = options;
    }
    get plugins() {
        return this._config.plugins;
    }
    update() {
        const config = this._config;
        this.clearCache();
        initOptions(config);
    }
    clearCache() {
        this._scopeCache.clear();
        this._resolverCache.clear();
    }
 datasetScopeKeys(datasetType) {
        return cachedKeys(datasetType, ()=>[
                [
                    `datasets.${datasetType}`,
                    ''
                ]
            ]);
    }
 datasetAnimationScopeKeys(datasetType, transition) {
        return cachedKeys(`${datasetType}.transition.${transition}`, ()=>[
                [
                    `datasets.${datasetType}.transitions.${transition}`,
                    `transitions.${transition}`
                ],
                [
                    `datasets.${datasetType}`,
                    ''
                ]
            ]);
    }
 datasetElementScopeKeys(datasetType, elementType) {
        return cachedKeys(`${datasetType}-${elementType}`, ()=>[
                [
                    `datasets.${datasetType}.elements.${elementType}`,
                    `datasets.${datasetType}`,
                    `elements.${elementType}`,
                    ''
                ]
            ]);
    }
 pluginScopeKeys(plugin) {
        const id = plugin.id;
        const type = this.type;
        return cachedKeys(`${type}-plugin-${id}`, ()=>[
                [
                    `plugins.${id}`,
                    ...plugin.additionalOptionScopes || []
                ]
            ]);
    }
 _cachedScopes(mainScope, resetCache) {
        const _scopeCache = this._scopeCache;
        let cache = _scopeCache.get(mainScope);
        if (!cache || resetCache) {
            cache = new Map();
            _scopeCache.set(mainScope, cache);
        }
        return cache;
    }
 getOptionScopes(mainScope, keyLists, resetCache) {
        const { options , type  } = this;
        const cache = this._cachedScopes(mainScope, resetCache);
        const cached = cache.get(keyLists);
        if (cached) {
            return cached;
        }
        const scopes = new Set();
        keyLists.forEach((keys)=>{
            if (mainScope) {
                scopes.add(mainScope);
                keys.forEach((key)=>addIfFound(scopes, mainScope, key));
            }
            keys.forEach((key)=>addIfFound(scopes, options, key));
            keys.forEach((key)=>addIfFound(scopes, _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a3[type] || {}, key));
            keys.forEach((key)=>addIfFound(scopes, _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.d, key));
            keys.forEach((key)=>addIfFound(scopes, _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a6, key));
        });
        const array = Array.from(scopes);
        if (array.length === 0) {
            array.push(Object.create(null));
        }
        if (keysCached.has(keyLists)) {
            cache.set(keyLists, array);
        }
        return array;
    }
 chartOptionScopes() {
        const { options , type  } = this;
        return [
            options,
            _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a3[type] || {},
            _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.d.datasets[type] || {},
            {
                type
            },
            _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.d,
            _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a6
        ];
    }
 resolveNamedOptions(scopes, names, context, prefixes = [
        ''
    ]) {
        const result = {
            $shared: true
        };
        const { resolver , subPrefixes  } = getResolver(this._resolverCache, scopes, prefixes);
        let options = resolver;
        if (needContext(resolver, names)) {
            result.$shared = false;
            context = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a7)(context) ? context() : context;
            const subResolver = this.createResolver(scopes, context, subPrefixes);
            options = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a8)(resolver, context, subResolver);
        }
        for (const prop of names){
            result[prop] = options[prop];
        }
        return result;
    }
 createResolver(scopes, context, prefixes = [
        ''
    ], descriptorDefaults) {
        const { resolver  } = getResolver(this._resolverCache, scopes, prefixes);
        return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.i)(context) ? (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a8)(resolver, context, undefined, descriptorDefaults) : resolver;
    }
}
function getResolver(resolverCache, scopes, prefixes) {
    let cache = resolverCache.get(scopes);
    if (!cache) {
        cache = new Map();
        resolverCache.set(scopes, cache);
    }
    const cacheKey = prefixes.join();
    let cached = cache.get(cacheKey);
    if (!cached) {
        const resolver = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a9)(scopes, prefixes);
        cached = {
            resolver,
            subPrefixes: prefixes.filter((p)=>!p.toLowerCase().includes('hover'))
        };
        cache.set(cacheKey, cached);
    }
    return cached;
}
const hasFunction = (value)=>(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.i)(value) && Object.getOwnPropertyNames(value).some((key)=>(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a7)(value[key]));
function needContext(proxy, names) {
    const { isScriptable , isIndexable  } = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aa)(proxy);
    for (const prop of names){
        const scriptable = isScriptable(prop);
        const indexable = isIndexable(prop);
        const value = (indexable || scriptable) && proxy[prop];
        if (scriptable && ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a7)(value) || hasFunction(value)) || indexable && (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.b)(value)) {
            return true;
        }
    }
    return false;
}

var version = "4.5.0";

const KNOWN_POSITIONS = [
    'top',
    'bottom',
    'left',
    'right',
    'chartArea'
];
function positionIsHorizontal(position, axis) {
    return position === 'top' || position === 'bottom' || KNOWN_POSITIONS.indexOf(position) === -1 && axis === 'x';
}
function compare2Level(l1, l2) {
    return function(a, b) {
        return a[l1] === b[l1] ? a[l2] - b[l2] : a[l1] - b[l1];
    };
}
function onAnimationsComplete(context) {
    const chart = context.chart;
    const animationOptions = chart.options.animation;
    chart.notifyPlugins('afterRender');
    (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(animationOptions && animationOptions.onComplete, [
        context
    ], chart);
}
function onAnimationProgress(context) {
    const chart = context.chart;
    const animationOptions = chart.options.animation;
    (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(animationOptions && animationOptions.onProgress, [
        context
    ], chart);
}
 function getCanvas(item) {
    if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.M)() && typeof item === 'string') {
        item = document.getElementById(item);
    } else if (item && item.length) {
        item = item[0];
    }
    if (item && item.canvas) {
        item = item.canvas;
    }
    return item;
}
const instances = {};
const getChart = (key)=>{
    const canvas = getCanvas(key);
    return Object.values(instances).filter((c)=>c.canvas === canvas).pop();
};
function moveNumericKeys(obj, start, move) {
    const keys = Object.keys(obj);
    for (const key of keys){
        const intKey = +key;
        if (intKey >= start) {
            const value = obj[key];
            delete obj[key];
            if (move > 0 || intKey > start) {
                obj[intKey + move] = value;
            }
        }
    }
}
 function determineLastEvent(e, lastEvent, inChartArea, isClick) {
    if (!inChartArea || e.type === 'mouseout') {
        return null;
    }
    if (isClick) {
        return lastEvent;
    }
    return e;
}
class Chart {
    static defaults = _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.d;
    static instances = instances;
    static overrides = _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a3;
    static registry = registry;
    static version = version;
    static getChart = getChart;
    static register(...items) {
        registry.add(...items);
        invalidatePlugins();
    }
    static unregister(...items) {
        registry.remove(...items);
        invalidatePlugins();
    }
    constructor(item, userConfig){
        const config = this.config = new Config(userConfig);
        const initialCanvas = getCanvas(item);
        const existingChart = getChart(initialCanvas);
        if (existingChart) {
            throw new Error('Canvas is already in use. Chart with ID \'' + existingChart.id + '\'' + ' must be destroyed before the canvas with ID \'' + existingChart.canvas.id + '\' can be reused.');
        }
        const options = config.createResolver(config.chartOptionScopes(), this.getContext());
        this.platform = new (config.platform || _detectPlatform(initialCanvas))();
        this.platform.updateConfig(config);
        const context = this.platform.acquireContext(initialCanvas, options.aspectRatio);
        const canvas = context && context.canvas;
        const height = canvas && canvas.height;
        const width = canvas && canvas.width;
        this.id = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ac)();
        this.ctx = context;
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this._options = options;
        this._aspectRatio = this.aspectRatio;
        this._layers = [];
        this._metasets = [];
        this._stacks = undefined;
        this.boxes = [];
        this.currentDevicePixelRatio = undefined;
        this.chartArea = undefined;
        this._active = [];
        this._lastEvent = undefined;
        this._listeners = {};
         this._responsiveListeners = undefined;
        this._sortedMetasets = [];
        this.scales = {};
        this._plugins = new PluginService();
        this.$proxies = {};
        this._hiddenIndices = {};
        this.attached = false;
        this._animationsDisabled = undefined;
        this.$context = undefined;
        this._doResize = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ad)((mode)=>this.update(mode), options.resizeDelay || 0);
        this._dataChanges = [];
        instances[this.id] = this;
        if (!context || !canvas) {
            console.error("Failed to create chart: can't acquire context from the given item");
            return;
        }
        animator.listen(this, 'complete', onAnimationsComplete);
        animator.listen(this, 'progress', onAnimationProgress);
        this._initialize();
        if (this.attached) {
            this.update();
        }
    }
    get aspectRatio() {
        const { options: { aspectRatio , maintainAspectRatio  } , width , height , _aspectRatio  } = this;
        if (!(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(aspectRatio)) {
            return aspectRatio;
        }
        if (maintainAspectRatio && _aspectRatio) {
            return _aspectRatio;
        }
        return height ? width / height : null;
    }
    get data() {
        return this.config.data;
    }
    set data(data) {
        this.config.data = data;
    }
    get options() {
        return this._options;
    }
    set options(options) {
        this.config.options = options;
    }
    get registry() {
        return registry;
    }
 _initialize() {
        this.notifyPlugins('beforeInit');
        if (this.options.responsive) {
            this.resize();
        } else {
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ae)(this, this.options.devicePixelRatio);
        }
        this.bindEvents();
        this.notifyPlugins('afterInit');
        return this;
    }
    clear() {
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.af)(this.canvas, this.ctx);
        return this;
    }
    stop() {
        animator.stop(this);
        return this;
    }
 resize(width, height) {
        if (!animator.running(this)) {
            this._resize(width, height);
        } else {
            this._resizeBeforeDraw = {
                width,
                height
            };
        }
    }
    _resize(width, height) {
        const options = this.options;
        const canvas = this.canvas;
        const aspectRatio = options.maintainAspectRatio && this.aspectRatio;
        const newSize = this.platform.getMaximumSize(canvas, width, height, aspectRatio);
        const newRatio = options.devicePixelRatio || this.platform.getDevicePixelRatio();
        const mode = this.width ? 'resize' : 'attach';
        this.width = newSize.width;
        this.height = newSize.height;
        this._aspectRatio = this.aspectRatio;
        if (!(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ae)(this, newRatio, true)) {
            return;
        }
        this.notifyPlugins('resize', {
            size: newSize
        });
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(options.onResize, [
            this,
            newSize
        ], this);
        if (this.attached) {
            if (this._doResize(mode)) {
                this.render();
            }
        }
    }
    ensureScalesHaveIDs() {
        const options = this.options;
        const scalesOptions = options.scales || {};
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(scalesOptions, (axisOptions, axisID)=>{
            axisOptions.id = axisID;
        });
    }
 buildOrUpdateScales() {
        const options = this.options;
        const scaleOpts = options.scales;
        const scales = this.scales;
        const updated = Object.keys(scales).reduce((obj, id)=>{
            obj[id] = false;
            return obj;
        }, {});
        let items = [];
        if (scaleOpts) {
            items = items.concat(Object.keys(scaleOpts).map((id)=>{
                const scaleOptions = scaleOpts[id];
                const axis = determineAxis(id, scaleOptions);
                const isRadial = axis === 'r';
                const isHorizontal = axis === 'x';
                return {
                    options: scaleOptions,
                    dposition: isRadial ? 'chartArea' : isHorizontal ? 'bottom' : 'left',
                    dtype: isRadial ? 'radialLinear' : isHorizontal ? 'category' : 'linear'
                };
            }));
        }
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(items, (item)=>{
            const scaleOptions = item.options;
            const id = scaleOptions.id;
            const axis = determineAxis(id, scaleOptions);
            const scaleType = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(scaleOptions.type, item.dtype);
            if (scaleOptions.position === undefined || positionIsHorizontal(scaleOptions.position, axis) !== positionIsHorizontal(item.dposition)) {
                scaleOptions.position = item.dposition;
            }
            updated[id] = true;
            let scale = null;
            if (id in scales && scales[id].type === scaleType) {
                scale = scales[id];
            } else {
                const scaleClass = registry.getScale(scaleType);
                scale = new scaleClass({
                    id,
                    type: scaleType,
                    ctx: this.ctx,
                    chart: this
                });
                scales[scale.id] = scale;
            }
            scale.init(scaleOptions, options);
        });
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(updated, (hasUpdated, id)=>{
            if (!hasUpdated) {
                delete scales[id];
            }
        });
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(scales, (scale)=>{
            layouts.configure(this, scale, scale.options);
            layouts.addBox(this, scale);
        });
    }
 _updateMetasets() {
        const metasets = this._metasets;
        const numData = this.data.datasets.length;
        const numMeta = metasets.length;
        metasets.sort((a, b)=>a.index - b.index);
        if (numMeta > numData) {
            for(let i = numData; i < numMeta; ++i){
                this._destroyDatasetMeta(i);
            }
            metasets.splice(numData, numMeta - numData);
        }
        this._sortedMetasets = metasets.slice(0).sort(compare2Level('order', 'index'));
    }
 _removeUnreferencedMetasets() {
        const { _metasets: metasets , data: { datasets  }  } = this;
        if (metasets.length > datasets.length) {
            delete this._stacks;
        }
        metasets.forEach((meta, index)=>{
            if (datasets.filter((x)=>x === meta._dataset).length === 0) {
                this._destroyDatasetMeta(index);
            }
        });
    }
    buildOrUpdateControllers() {
        const newControllers = [];
        const datasets = this.data.datasets;
        let i, ilen;
        this._removeUnreferencedMetasets();
        for(i = 0, ilen = datasets.length; i < ilen; i++){
            const dataset = datasets[i];
            let meta = this.getDatasetMeta(i);
            const type = dataset.type || this.config.type;
            if (meta.type && meta.type !== type) {
                this._destroyDatasetMeta(i);
                meta = this.getDatasetMeta(i);
            }
            meta.type = type;
            meta.indexAxis = dataset.indexAxis || getIndexAxis(type, this.options);
            meta.order = dataset.order || 0;
            meta.index = i;
            meta.label = '' + dataset.label;
            meta.visible = this.isDatasetVisible(i);
            if (meta.controller) {
                meta.controller.updateIndex(i);
                meta.controller.linkScales();
            } else {
                const ControllerClass = registry.getController(type);
                const { datasetElementType , dataElementType  } = _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.d.datasets[type];
                Object.assign(ControllerClass, {
                    dataElementType: registry.getElement(dataElementType),
                    datasetElementType: datasetElementType && registry.getElement(datasetElementType)
                });
                meta.controller = new ControllerClass(this, i);
                newControllers.push(meta.controller);
            }
        }
        this._updateMetasets();
        return newControllers;
    }
 _resetElements() {
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(this.data.datasets, (dataset, datasetIndex)=>{
            this.getDatasetMeta(datasetIndex).controller.reset();
        }, this);
    }
 reset() {
        this._resetElements();
        this.notifyPlugins('reset');
    }
    update(mode) {
        const config = this.config;
        config.update();
        const options = this._options = config.createResolver(config.chartOptionScopes(), this.getContext());
        const animsDisabled = this._animationsDisabled = !options.animation;
        this._updateScales();
        this._checkEventBindings();
        this._updateHiddenIndices();
        this._plugins.invalidate();
        if (this.notifyPlugins('beforeUpdate', {
            mode,
            cancelable: true
        }) === false) {
            return;
        }
        const newControllers = this.buildOrUpdateControllers();
        this.notifyPlugins('beforeElementsUpdate');
        let minPadding = 0;
        for(let i = 0, ilen = this.data.datasets.length; i < ilen; i++){
            const { controller  } = this.getDatasetMeta(i);
            const reset = !animsDisabled && newControllers.indexOf(controller) === -1;
            controller.buildOrUpdateElements(reset);
            minPadding = Math.max(+controller.getMaxOverflow(), minPadding);
        }
        minPadding = this._minPadding = options.layout.autoPadding ? minPadding : 0;
        this._updateLayout(minPadding);
        if (!animsDisabled) {
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(newControllers, (controller)=>{
                controller.reset();
            });
        }
        this._updateDatasets(mode);
        this.notifyPlugins('afterUpdate', {
            mode
        });
        this._layers.sort(compare2Level('z', '_idx'));
        const { _active , _lastEvent  } = this;
        if (_lastEvent) {
            this._eventHandler(_lastEvent, true);
        } else if (_active.length) {
            this._updateHoverStyles(_active, _active, true);
        }
        this.render();
    }
 _updateScales() {
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(this.scales, (scale)=>{
            layouts.removeBox(this, scale);
        });
        this.ensureScalesHaveIDs();
        this.buildOrUpdateScales();
    }
 _checkEventBindings() {
        const options = this.options;
        const existingEvents = new Set(Object.keys(this._listeners));
        const newEvents = new Set(options.events);
        if (!(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ag)(existingEvents, newEvents) || !!this._responsiveListeners !== options.responsive) {
            this.unbindEvents();
            this.bindEvents();
        }
    }
 _updateHiddenIndices() {
        const { _hiddenIndices  } = this;
        const changes = this._getUniformDataChanges() || [];
        for (const { method , start , count  } of changes){
            const move = method === '_removeElements' ? -count : count;
            moveNumericKeys(_hiddenIndices, start, move);
        }
    }
 _getUniformDataChanges() {
        const _dataChanges = this._dataChanges;
        if (!_dataChanges || !_dataChanges.length) {
            return;
        }
        this._dataChanges = [];
        const datasetCount = this.data.datasets.length;
        const makeSet = (idx)=>new Set(_dataChanges.filter((c)=>c[0] === idx).map((c, i)=>i + ',' + c.splice(1).join(',')));
        const changeSet = makeSet(0);
        for(let i = 1; i < datasetCount; i++){
            if (!(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ag)(changeSet, makeSet(i))) {
                return;
            }
        }
        return Array.from(changeSet).map((c)=>c.split(',')).map((a)=>({
                method: a[1],
                start: +a[2],
                count: +a[3]
            }));
    }
 _updateLayout(minPadding) {
        if (this.notifyPlugins('beforeLayout', {
            cancelable: true
        }) === false) {
            return;
        }
        layouts.update(this, this.width, this.height, minPadding);
        const area = this.chartArea;
        const noArea = area.width <= 0 || area.height <= 0;
        this._layers = [];
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(this.boxes, (box)=>{
            if (noArea && box.position === 'chartArea') {
                return;
            }
            if (box.configure) {
                box.configure();
            }
            this._layers.push(...box._layers());
        }, this);
        this._layers.forEach((item, index)=>{
            item._idx = index;
        });
        this.notifyPlugins('afterLayout');
    }
 _updateDatasets(mode) {
        if (this.notifyPlugins('beforeDatasetsUpdate', {
            mode,
            cancelable: true
        }) === false) {
            return;
        }
        for(let i = 0, ilen = this.data.datasets.length; i < ilen; ++i){
            this.getDatasetMeta(i).controller.configure();
        }
        for(let i = 0, ilen = this.data.datasets.length; i < ilen; ++i){
            this._updateDataset(i, (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a7)(mode) ? mode({
                datasetIndex: i
            }) : mode);
        }
        this.notifyPlugins('afterDatasetsUpdate', {
            mode
        });
    }
 _updateDataset(index, mode) {
        const meta = this.getDatasetMeta(index);
        const args = {
            meta,
            index,
            mode,
            cancelable: true
        };
        if (this.notifyPlugins('beforeDatasetUpdate', args) === false) {
            return;
        }
        meta.controller._update(mode);
        args.cancelable = false;
        this.notifyPlugins('afterDatasetUpdate', args);
    }
    render() {
        if (this.notifyPlugins('beforeRender', {
            cancelable: true
        }) === false) {
            return;
        }
        if (animator.has(this)) {
            if (this.attached && !animator.running(this)) {
                animator.start(this);
            }
        } else {
            this.draw();
            onAnimationsComplete({
                chart: this
            });
        }
    }
    draw() {
        let i;
        if (this._resizeBeforeDraw) {
            const { width , height  } = this._resizeBeforeDraw;
            this._resizeBeforeDraw = null;
            this._resize(width, height);
        }
        this.clear();
        if (this.width <= 0 || this.height <= 0) {
            return;
        }
        if (this.notifyPlugins('beforeDraw', {
            cancelable: true
        }) === false) {
            return;
        }
        const layers = this._layers;
        for(i = 0; i < layers.length && layers[i].z <= 0; ++i){
            layers[i].draw(this.chartArea);
        }
        this._drawDatasets();
        for(; i < layers.length; ++i){
            layers[i].draw(this.chartArea);
        }
        this.notifyPlugins('afterDraw');
    }
 _getSortedDatasetMetas(filterVisible) {
        const metasets = this._sortedMetasets;
        const result = [];
        let i, ilen;
        for(i = 0, ilen = metasets.length; i < ilen; ++i){
            const meta = metasets[i];
            if (!filterVisible || meta.visible) {
                result.push(meta);
            }
        }
        return result;
    }
 getSortedVisibleDatasetMetas() {
        return this._getSortedDatasetMetas(true);
    }
 _drawDatasets() {
        if (this.notifyPlugins('beforeDatasetsDraw', {
            cancelable: true
        }) === false) {
            return;
        }
        const metasets = this.getSortedVisibleDatasetMetas();
        for(let i = metasets.length - 1; i >= 0; --i){
            this._drawDataset(metasets[i]);
        }
        this.notifyPlugins('afterDatasetsDraw');
    }
 _drawDataset(meta) {
        const ctx = this.ctx;
        const args = {
            meta,
            index: meta.index,
            cancelable: true
        };
        const clip = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ah)(this, meta);
        if (this.notifyPlugins('beforeDatasetDraw', args) === false) {
            return;
        }
        if (clip) {
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Y)(ctx, clip);
        }
        meta.controller.draw();
        if (clip) {
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.$)(ctx);
        }
        args.cancelable = false;
        this.notifyPlugins('afterDatasetDraw', args);
    }
 isPointInArea(point) {
        return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.C)(point, this.chartArea, this._minPadding);
    }
    getElementsAtEventForMode(e, mode, options, useFinalPosition) {
        const method = Interaction.modes[mode];
        if (typeof method === 'function') {
            return method(this, e, options, useFinalPosition);
        }
        return [];
    }
    getDatasetMeta(datasetIndex) {
        const dataset = this.data.datasets[datasetIndex];
        const metasets = this._metasets;
        let meta = metasets.filter((x)=>x && x._dataset === dataset).pop();
        if (!meta) {
            meta = {
                type: null,
                data: [],
                dataset: null,
                controller: null,
                hidden: null,
                xAxisID: null,
                yAxisID: null,
                order: dataset && dataset.order || 0,
                index: datasetIndex,
                _dataset: dataset,
                _parsed: [],
                _sorted: false
            };
            metasets.push(meta);
        }
        return meta;
    }
    getContext() {
        return this.$context || (this.$context = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.j)(null, {
            chart: this,
            type: 'chart'
        }));
    }
    getVisibleDatasetCount() {
        return this.getSortedVisibleDatasetMetas().length;
    }
    isDatasetVisible(datasetIndex) {
        const dataset = this.data.datasets[datasetIndex];
        if (!dataset) {
            return false;
        }
        const meta = this.getDatasetMeta(datasetIndex);
        return typeof meta.hidden === 'boolean' ? !meta.hidden : !dataset.hidden;
    }
    setDatasetVisibility(datasetIndex, visible) {
        const meta = this.getDatasetMeta(datasetIndex);
        meta.hidden = !visible;
    }
    toggleDataVisibility(index) {
        this._hiddenIndices[index] = !this._hiddenIndices[index];
    }
    getDataVisibility(index) {
        return !this._hiddenIndices[index];
    }
 _updateVisibility(datasetIndex, dataIndex, visible) {
        const mode = visible ? 'show' : 'hide';
        const meta = this.getDatasetMeta(datasetIndex);
        const anims = meta.controller._resolveAnimations(undefined, mode);
        if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.h)(dataIndex)) {
            meta.data[dataIndex].hidden = !visible;
            this.update();
        } else {
            this.setDatasetVisibility(datasetIndex, visible);
            anims.update(meta, {
                visible
            });
            this.update((ctx)=>ctx.datasetIndex === datasetIndex ? mode : undefined);
        }
    }
    hide(datasetIndex, dataIndex) {
        this._updateVisibility(datasetIndex, dataIndex, false);
    }
    show(datasetIndex, dataIndex) {
        this._updateVisibility(datasetIndex, dataIndex, true);
    }
 _destroyDatasetMeta(datasetIndex) {
        const meta = this._metasets[datasetIndex];
        if (meta && meta.controller) {
            meta.controller._destroy();
        }
        delete this._metasets[datasetIndex];
    }
    _stop() {
        let i, ilen;
        this.stop();
        animator.remove(this);
        for(i = 0, ilen = this.data.datasets.length; i < ilen; ++i){
            this._destroyDatasetMeta(i);
        }
    }
    destroy() {
        this.notifyPlugins('beforeDestroy');
        const { canvas , ctx  } = this;
        this._stop();
        this.config.clearCache();
        if (canvas) {
            this.unbindEvents();
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.af)(canvas, ctx);
            this.platform.releaseContext(ctx);
            this.canvas = null;
            this.ctx = null;
        }
        delete instances[this.id];
        this.notifyPlugins('afterDestroy');
    }
    toBase64Image(...args) {
        return this.canvas.toDataURL(...args);
    }
 bindEvents() {
        this.bindUserEvents();
        if (this.options.responsive) {
            this.bindResponsiveEvents();
        } else {
            this.attached = true;
        }
    }
 bindUserEvents() {
        const listeners = this._listeners;
        const platform = this.platform;
        const _add = (type, listener)=>{
            platform.addEventListener(this, type, listener);
            listeners[type] = listener;
        };
        const listener = (e, x, y)=>{
            e.offsetX = x;
            e.offsetY = y;
            this._eventHandler(e);
        };
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(this.options.events, (type)=>_add(type, listener));
    }
 bindResponsiveEvents() {
        if (!this._responsiveListeners) {
            this._responsiveListeners = {};
        }
        const listeners = this._responsiveListeners;
        const platform = this.platform;
        const _add = (type, listener)=>{
            platform.addEventListener(this, type, listener);
            listeners[type] = listener;
        };
        const _remove = (type, listener)=>{
            if (listeners[type]) {
                platform.removeEventListener(this, type, listener);
                delete listeners[type];
            }
        };
        const listener = (width, height)=>{
            if (this.canvas) {
                this.resize(width, height);
            }
        };
        let detached;
        const attached = ()=>{
            _remove('attach', attached);
            this.attached = true;
            this.resize();
            _add('resize', listener);
            _add('detach', detached);
        };
        detached = ()=>{
            this.attached = false;
            _remove('resize', listener);
            this._stop();
            this._resize(0, 0);
            _add('attach', attached);
        };
        if (platform.isAttached(this.canvas)) {
            attached();
        } else {
            detached();
        }
    }
 unbindEvents() {
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(this._listeners, (listener, type)=>{
            this.platform.removeEventListener(this, type, listener);
        });
        this._listeners = {};
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(this._responsiveListeners, (listener, type)=>{
            this.platform.removeEventListener(this, type, listener);
        });
        this._responsiveListeners = undefined;
    }
    updateHoverStyle(items, mode, enabled) {
        const prefix = enabled ? 'set' : 'remove';
        let meta, item, i, ilen;
        if (mode === 'dataset') {
            meta = this.getDatasetMeta(items[0].datasetIndex);
            meta.controller['_' + prefix + 'DatasetHoverStyle']();
        }
        for(i = 0, ilen = items.length; i < ilen; ++i){
            item = items[i];
            const controller = item && this.getDatasetMeta(item.datasetIndex).controller;
            if (controller) {
                controller[prefix + 'HoverStyle'](item.element, item.datasetIndex, item.index);
            }
        }
    }
 getActiveElements() {
        return this._active || [];
    }
 setActiveElements(activeElements) {
        const lastActive = this._active || [];
        const active = activeElements.map(({ datasetIndex , index  })=>{
            const meta = this.getDatasetMeta(datasetIndex);
            if (!meta) {
                throw new Error('No dataset found at index ' + datasetIndex);
            }
            return {
                datasetIndex,
                element: meta.data[index],
                index
            };
        });
        const changed = !(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ai)(active, lastActive);
        if (changed) {
            this._active = active;
            this._lastEvent = null;
            this._updateHoverStyles(active, lastActive);
        }
    }
 notifyPlugins(hook, args, filter) {
        return this._plugins.notify(this, hook, args, filter);
    }
 isPluginEnabled(pluginId) {
        return this._plugins._cache.filter((p)=>p.plugin.id === pluginId).length === 1;
    }
 _updateHoverStyles(active, lastActive, replay) {
        const hoverOptions = this.options.hover;
        const diff = (a, b)=>a.filter((x)=>!b.some((y)=>x.datasetIndex === y.datasetIndex && x.index === y.index));
        const deactivated = diff(lastActive, active);
        const activated = replay ? active : diff(active, lastActive);
        if (deactivated.length) {
            this.updateHoverStyle(deactivated, hoverOptions.mode, false);
        }
        if (activated.length && hoverOptions.mode) {
            this.updateHoverStyle(activated, hoverOptions.mode, true);
        }
    }
 _eventHandler(e, replay) {
        const args = {
            event: e,
            replay,
            cancelable: true,
            inChartArea: this.isPointInArea(e)
        };
        const eventFilter = (plugin)=>(plugin.options.events || this.options.events).includes(e.native.type);
        if (this.notifyPlugins('beforeEvent', args, eventFilter) === false) {
            return;
        }
        const changed = this._handleEvent(e, replay, args.inChartArea);
        args.cancelable = false;
        this.notifyPlugins('afterEvent', args, eventFilter);
        if (changed || args.changed) {
            this.render();
        }
        return this;
    }
 _handleEvent(e, replay, inChartArea) {
        const { _active: lastActive = [] , options  } = this;
        const useFinalPosition = replay;
        const active = this._getActiveElements(e, lastActive, inChartArea, useFinalPosition);
        const isClick = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aj)(e);
        const lastEvent = determineLastEvent(e, this._lastEvent, inChartArea, isClick);
        if (inChartArea) {
            this._lastEvent = null;
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(options.onHover, [
                e,
                active,
                this
            ], this);
            if (isClick) {
                (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(options.onClick, [
                    e,
                    active,
                    this
                ], this);
            }
        }
        const changed = !(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ai)(active, lastActive);
        if (changed || replay) {
            this._active = active;
            this._updateHoverStyles(active, lastActive, replay);
        }
        this._lastEvent = lastEvent;
        return changed;
    }
 _getActiveElements(e, lastActive, inChartArea, useFinalPosition) {
        if (e.type === 'mouseout') {
            return [];
        }
        if (!inChartArea) {
            return lastActive;
        }
        const hoverOptions = this.options.hover;
        return this.getElementsAtEventForMode(e, hoverOptions.mode, hoverOptions, useFinalPosition);
    }
}
function invalidatePlugins() {
    return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(Chart.instances, (chart)=>chart._plugins.invalidate());
}

function clipSelf(ctx, element, endAngle) {
    const { startAngle , x , y , outerRadius , innerRadius , options  } = element;
    const { borderWidth , borderJoinStyle  } = options;
    const outerAngleClip = Math.min(borderWidth / outerRadius, (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.al)(startAngle - endAngle));
    ctx.beginPath();
    ctx.arc(x, y, outerRadius - borderWidth / 2, startAngle + outerAngleClip / 2, endAngle - outerAngleClip / 2);
    if (innerRadius > 0) {
        const innerAngleClip = Math.min(borderWidth / innerRadius, (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.al)(startAngle - endAngle));
        ctx.arc(x, y, innerRadius + borderWidth / 2, endAngle - innerAngleClip / 2, startAngle + innerAngleClip / 2, true);
    } else {
        const clipWidth = Math.min(borderWidth / 2, outerRadius * (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.al)(startAngle - endAngle));
        if (borderJoinStyle === 'round') {
            ctx.arc(x, y, clipWidth, endAngle - _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.P / 2, startAngle + _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.P / 2, true);
        } else if (borderJoinStyle === 'bevel') {
            const r = 2 * clipWidth * clipWidth;
            const endX = -r * Math.cos(endAngle + _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.P / 2) + x;
            const endY = -r * Math.sin(endAngle + _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.P / 2) + y;
            const startX = r * Math.cos(startAngle + _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.P / 2) + x;
            const startY = r * Math.sin(startAngle + _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.P / 2) + y;
            ctx.lineTo(endX, endY);
            ctx.lineTo(startX, startY);
        }
    }
    ctx.closePath();
    ctx.moveTo(0, 0);
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.clip('evenodd');
}
function clipArc(ctx, element, endAngle) {
    const { startAngle , pixelMargin , x , y , outerRadius , innerRadius  } = element;
    let angleMargin = pixelMargin / outerRadius;
    // Draw an inner border by clipping the arc and drawing a double-width border
    // Enlarge the clipping arc by 0.33 pixels to eliminate glitches between borders
    ctx.beginPath();
    ctx.arc(x, y, outerRadius, startAngle - angleMargin, endAngle + angleMargin);
    if (innerRadius > pixelMargin) {
        angleMargin = pixelMargin / innerRadius;
        ctx.arc(x, y, innerRadius, endAngle + angleMargin, startAngle - angleMargin, true);
    } else {
        ctx.arc(x, y, pixelMargin, endAngle + _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.H, startAngle - _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.H);
    }
    ctx.closePath();
    ctx.clip();
}
function toRadiusCorners(value) {
    return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.am)(value, [
        'outerStart',
        'outerEnd',
        'innerStart',
        'innerEnd'
    ]);
}
/**
 * Parse border radius from the provided options
 */ function parseBorderRadius$1(arc, innerRadius, outerRadius, angleDelta) {
    const o = toRadiusCorners(arc.options.borderRadius);
    const halfThickness = (outerRadius - innerRadius) / 2;
    const innerLimit = Math.min(halfThickness, angleDelta * innerRadius / 2);
    // Outer limits are complicated. We want to compute the available angular distance at
    // a radius of outerRadius - borderRadius because for small angular distances, this term limits.
    // We compute at r = outerRadius - borderRadius because this circle defines the center of the border corners.
    //
    // If the borderRadius is large, that value can become negative.
    // This causes the outer borders to lose their radius entirely, which is rather unexpected. To solve that, if borderRadius > outerRadius
    // we know that the thickness term will dominate and compute the limits at that point
    const computeOuterLimit = (val)=>{
        const outerArcLimit = (outerRadius - Math.min(halfThickness, val)) * angleDelta / 2;
        return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.S)(val, 0, Math.min(halfThickness, outerArcLimit));
    };
    return {
        outerStart: computeOuterLimit(o.outerStart),
        outerEnd: computeOuterLimit(o.outerEnd),
        innerStart: (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.S)(o.innerStart, 0, innerLimit),
        innerEnd: (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.S)(o.innerEnd, 0, innerLimit)
    };
}
/**
 * Convert (r, 𝜃) to (x, y)
 */ function rThetaToXY(r, theta, x, y) {
    return {
        x: x + r * Math.cos(theta),
        y: y + r * Math.sin(theta)
    };
}
/**
 * Path the arc, respecting border radius by separating into left and right halves.
 *
 *   Start      End
 *
 *    1--->a--->2    Outer
 *   /           \
 *   8           3
 *   |           |
 *   |           |
 *   7           4
 *   \           /
 *    6<---b<---5    Inner
 */ function pathArc(ctx, element, offset, spacing, end, circular) {
    const { x , y , startAngle: start , pixelMargin , innerRadius: innerR  } = element;
    const outerRadius = Math.max(element.outerRadius + spacing + offset - pixelMargin, 0);
    const innerRadius = innerR > 0 ? innerR + spacing + offset + pixelMargin : 0;
    let spacingOffset = 0;
    const alpha = end - start;
    if (spacing) {
        // When spacing is present, it is the same for all items
        // So we adjust the start and end angle of the arc such that
        // the distance is the same as it would be without the spacing
        const noSpacingInnerRadius = innerR > 0 ? innerR - spacing : 0;
        const noSpacingOuterRadius = outerRadius > 0 ? outerRadius - spacing : 0;
        const avNogSpacingRadius = (noSpacingInnerRadius + noSpacingOuterRadius) / 2;
        const adjustedAngle = avNogSpacingRadius !== 0 ? alpha * avNogSpacingRadius / (avNogSpacingRadius + spacing) : alpha;
        spacingOffset = (alpha - adjustedAngle) / 2;
    }
    const beta = Math.max(0.001, alpha * outerRadius - offset / _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.P) / outerRadius;
    const angleOffset = (alpha - beta) / 2;
    const startAngle = start + angleOffset + spacingOffset;
    const endAngle = end - angleOffset - spacingOffset;
    const { outerStart , outerEnd , innerStart , innerEnd  } = parseBorderRadius$1(element, innerRadius, outerRadius, endAngle - startAngle);
    const outerStartAdjustedRadius = outerRadius - outerStart;
    const outerEndAdjustedRadius = outerRadius - outerEnd;
    const outerStartAdjustedAngle = startAngle + outerStart / outerStartAdjustedRadius;
    const outerEndAdjustedAngle = endAngle - outerEnd / outerEndAdjustedRadius;
    const innerStartAdjustedRadius = innerRadius + innerStart;
    const innerEndAdjustedRadius = innerRadius + innerEnd;
    const innerStartAdjustedAngle = startAngle + innerStart / innerStartAdjustedRadius;
    const innerEndAdjustedAngle = endAngle - innerEnd / innerEndAdjustedRadius;
    ctx.beginPath();
    if (circular) {
        // The first arc segments from point 1 to point a to point 2
        const outerMidAdjustedAngle = (outerStartAdjustedAngle + outerEndAdjustedAngle) / 2;
        ctx.arc(x, y, outerRadius, outerStartAdjustedAngle, outerMidAdjustedAngle);
        ctx.arc(x, y, outerRadius, outerMidAdjustedAngle, outerEndAdjustedAngle);
        // The corner segment from point 2 to point 3
        if (outerEnd > 0) {
            const pCenter = rThetaToXY(outerEndAdjustedRadius, outerEndAdjustedAngle, x, y);
            ctx.arc(pCenter.x, pCenter.y, outerEnd, outerEndAdjustedAngle, endAngle + _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.H);
        }
        // The line from point 3 to point 4
        const p4 = rThetaToXY(innerEndAdjustedRadius, endAngle, x, y);
        ctx.lineTo(p4.x, p4.y);
        // The corner segment from point 4 to point 5
        if (innerEnd > 0) {
            const pCenter = rThetaToXY(innerEndAdjustedRadius, innerEndAdjustedAngle, x, y);
            ctx.arc(pCenter.x, pCenter.y, innerEnd, endAngle + _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.H, innerEndAdjustedAngle + Math.PI);
        }
        // The inner arc from point 5 to point b to point 6
        const innerMidAdjustedAngle = (endAngle - innerEnd / innerRadius + (startAngle + innerStart / innerRadius)) / 2;
        ctx.arc(x, y, innerRadius, endAngle - innerEnd / innerRadius, innerMidAdjustedAngle, true);
        ctx.arc(x, y, innerRadius, innerMidAdjustedAngle, startAngle + innerStart / innerRadius, true);
        // The corner segment from point 6 to point 7
        if (innerStart > 0) {
            const pCenter = rThetaToXY(innerStartAdjustedRadius, innerStartAdjustedAngle, x, y);
            ctx.arc(pCenter.x, pCenter.y, innerStart, innerStartAdjustedAngle + Math.PI, startAngle - _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.H);
        }
        // The line from point 7 to point 8
        const p8 = rThetaToXY(outerStartAdjustedRadius, startAngle, x, y);
        ctx.lineTo(p8.x, p8.y);
        // The corner segment from point 8 to point 1
        if (outerStart > 0) {
            const pCenter = rThetaToXY(outerStartAdjustedRadius, outerStartAdjustedAngle, x, y);
            ctx.arc(pCenter.x, pCenter.y, outerStart, startAngle - _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.H, outerStartAdjustedAngle);
        }
    } else {
        ctx.moveTo(x, y);
        const outerStartX = Math.cos(outerStartAdjustedAngle) * outerRadius + x;
        const outerStartY = Math.sin(outerStartAdjustedAngle) * outerRadius + y;
        ctx.lineTo(outerStartX, outerStartY);
        const outerEndX = Math.cos(outerEndAdjustedAngle) * outerRadius + x;
        const outerEndY = Math.sin(outerEndAdjustedAngle) * outerRadius + y;
        ctx.lineTo(outerEndX, outerEndY);
    }
    ctx.closePath();
}
function drawArc(ctx, element, offset, spacing, circular) {
    const { fullCircles , startAngle , circumference  } = element;
    let endAngle = element.endAngle;
    if (fullCircles) {
        pathArc(ctx, element, offset, spacing, endAngle, circular);
        for(let i = 0; i < fullCircles; ++i){
            ctx.fill();
        }
        if (!isNaN(circumference)) {
            endAngle = startAngle + (circumference % _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.T || _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.T);
        }
    }
    pathArc(ctx, element, offset, spacing, endAngle, circular);
    ctx.fill();
    return endAngle;
}
function drawBorder(ctx, element, offset, spacing, circular) {
    const { fullCircles , startAngle , circumference , options  } = element;
    const { borderWidth , borderJoinStyle , borderDash , borderDashOffset , borderRadius  } = options;
    const inner = options.borderAlign === 'inner';
    if (!borderWidth) {
        return;
    }
    ctx.setLineDash(borderDash || []);
    ctx.lineDashOffset = borderDashOffset;
    if (inner) {
        ctx.lineWidth = borderWidth * 2;
        ctx.lineJoin = borderJoinStyle || 'round';
    } else {
        ctx.lineWidth = borderWidth;
        ctx.lineJoin = borderJoinStyle || 'bevel';
    }
    let endAngle = element.endAngle;
    if (fullCircles) {
        pathArc(ctx, element, offset, spacing, endAngle, circular);
        for(let i = 0; i < fullCircles; ++i){
            ctx.stroke();
        }
        if (!isNaN(circumference)) {
            endAngle = startAngle + (circumference % _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.T || _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.T);
        }
    }
    if (inner) {
        clipArc(ctx, element, endAngle);
    }
    if (options.selfJoin && endAngle - startAngle >= _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.P && borderRadius === 0 && borderJoinStyle !== 'miter') {
        clipSelf(ctx, element, endAngle);
    }
    if (!fullCircles) {
        pathArc(ctx, element, offset, spacing, endAngle, circular);
        ctx.stroke();
    }
}
class ArcElement extends Element {
    static id = 'arc';
    static defaults = {
        borderAlign: 'center',
        borderColor: '#fff',
        borderDash: [],
        borderDashOffset: 0,
        borderJoinStyle: undefined,
        borderRadius: 0,
        borderWidth: 2,
        offset: 0,
        spacing: 0,
        angle: undefined,
        circular: true,
        selfJoin: false
    };
    static defaultRoutes = {
        backgroundColor: 'backgroundColor'
    };
    static descriptors = {
        _scriptable: true,
        _indexable: (name)=>name !== 'borderDash'
    };
    circumference;
    endAngle;
    fullCircles;
    innerRadius;
    outerRadius;
    pixelMargin;
    startAngle;
    constructor(cfg){
        super();
        this.options = undefined;
        this.circumference = undefined;
        this.startAngle = undefined;
        this.endAngle = undefined;
        this.innerRadius = undefined;
        this.outerRadius = undefined;
        this.pixelMargin = 0;
        this.fullCircles = 0;
        if (cfg) {
            Object.assign(this, cfg);
        }
    }
    inRange(chartX, chartY, useFinalPosition) {
        const point = this.getProps([
            'x',
            'y'
        ], useFinalPosition);
        const { angle , distance  } = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.D)(point, {
            x: chartX,
            y: chartY
        });
        const { startAngle , endAngle , innerRadius , outerRadius , circumference  } = this.getProps([
            'startAngle',
            'endAngle',
            'innerRadius',
            'outerRadius',
            'circumference'
        ], useFinalPosition);
        const rAdjust = (this.options.spacing + this.options.borderWidth) / 2;
        const _circumference = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(circumference, endAngle - startAngle);
        const nonZeroBetween = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.p)(angle, startAngle, endAngle) && startAngle !== endAngle;
        const betweenAngles = _circumference >= _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.T || nonZeroBetween;
        const withinRadius = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ak)(distance, innerRadius + rAdjust, outerRadius + rAdjust);
        return betweenAngles && withinRadius;
    }
    getCenterPoint(useFinalPosition) {
        const { x , y , startAngle , endAngle , innerRadius , outerRadius  } = this.getProps([
            'x',
            'y',
            'startAngle',
            'endAngle',
            'innerRadius',
            'outerRadius'
        ], useFinalPosition);
        const { offset , spacing  } = this.options;
        const halfAngle = (startAngle + endAngle) / 2;
        const halfRadius = (innerRadius + outerRadius + spacing + offset) / 2;
        return {
            x: x + Math.cos(halfAngle) * halfRadius,
            y: y + Math.sin(halfAngle) * halfRadius
        };
    }
    tooltipPosition(useFinalPosition) {
        return this.getCenterPoint(useFinalPosition);
    }
    draw(ctx) {
        const { options , circumference  } = this;
        const offset = (options.offset || 0) / 4;
        const spacing = (options.spacing || 0) / 2;
        const circular = options.circular;
        this.pixelMargin = options.borderAlign === 'inner' ? 0.33 : 0;
        this.fullCircles = circumference > _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.T ? Math.floor(circumference / _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.T) : 0;
        if (circumference === 0 || this.innerRadius < 0 || this.outerRadius < 0) {
            return;
        }
        ctx.save();
        const halfAngle = (this.startAngle + this.endAngle) / 2;
        ctx.translate(Math.cos(halfAngle) * offset, Math.sin(halfAngle) * offset);
        const fix = 1 - Math.sin(Math.min(_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.P, circumference || 0));
        const radiusOffset = offset * fix;
        ctx.fillStyle = options.backgroundColor;
        ctx.strokeStyle = options.borderColor;
        drawArc(ctx, this, radiusOffset, spacing, circular);
        drawBorder(ctx, this, radiusOffset, spacing, circular);
        ctx.restore();
    }
}

function setStyle(ctx, options, style = options) {
    ctx.lineCap = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(style.borderCapStyle, options.borderCapStyle);
    ctx.setLineDash((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(style.borderDash, options.borderDash));
    ctx.lineDashOffset = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(style.borderDashOffset, options.borderDashOffset);
    ctx.lineJoin = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(style.borderJoinStyle, options.borderJoinStyle);
    ctx.lineWidth = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(style.borderWidth, options.borderWidth);
    ctx.strokeStyle = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(style.borderColor, options.borderColor);
}
function lineTo(ctx, previous, target) {
    ctx.lineTo(target.x, target.y);
}
 function getLineMethod(options) {
    if (options.stepped) {
        return _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.at;
    }
    if (options.tension || options.cubicInterpolationMode === 'monotone') {
        return _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.au;
    }
    return lineTo;
}
function pathVars(points, segment, params = {}) {
    const count = points.length;
    const { start: paramsStart = 0 , end: paramsEnd = count - 1  } = params;
    const { start: segmentStart , end: segmentEnd  } = segment;
    const start = Math.max(paramsStart, segmentStart);
    const end = Math.min(paramsEnd, segmentEnd);
    const outside = paramsStart < segmentStart && paramsEnd < segmentStart || paramsStart > segmentEnd && paramsEnd > segmentEnd;
    return {
        count,
        start,
        loop: segment.loop,
        ilen: end < start && !outside ? count + end - start : end - start
    };
}
 function pathSegment(ctx, line, segment, params) {
    const { points , options  } = line;
    const { count , start , loop , ilen  } = pathVars(points, segment, params);
    const lineMethod = getLineMethod(options);
    let { move =true , reverse  } = params || {};
    let i, point, prev;
    for(i = 0; i <= ilen; ++i){
        point = points[(start + (reverse ? ilen - i : i)) % count];
        if (point.skip) {
            continue;
        } else if (move) {
            ctx.moveTo(point.x, point.y);
            move = false;
        } else {
            lineMethod(ctx, prev, point, reverse, options.stepped);
        }
        prev = point;
    }
    if (loop) {
        point = points[(start + (reverse ? ilen : 0)) % count];
        lineMethod(ctx, prev, point, reverse, options.stepped);
    }
    return !!loop;
}
 function fastPathSegment(ctx, line, segment, params) {
    const points = line.points;
    const { count , start , ilen  } = pathVars(points, segment, params);
    const { move =true , reverse  } = params || {};
    let avgX = 0;
    let countX = 0;
    let i, point, prevX, minY, maxY, lastY;
    const pointIndex = (index)=>(start + (reverse ? ilen - index : index)) % count;
    const drawX = ()=>{
        if (minY !== maxY) {
            ctx.lineTo(avgX, maxY);
            ctx.lineTo(avgX, minY);
            ctx.lineTo(avgX, lastY);
        }
    };
    if (move) {
        point = points[pointIndex(0)];
        ctx.moveTo(point.x, point.y);
    }
    for(i = 0; i <= ilen; ++i){
        point = points[pointIndex(i)];
        if (point.skip) {
            continue;
        }
        const x = point.x;
        const y = point.y;
        const truncX = x | 0;
        if (truncX === prevX) {
            if (y < minY) {
                minY = y;
            } else if (y > maxY) {
                maxY = y;
            }
            avgX = (countX * avgX + x) / ++countX;
        } else {
            drawX();
            ctx.lineTo(x, y);
            prevX = truncX;
            countX = 0;
            minY = maxY = y;
        }
        lastY = y;
    }
    drawX();
}
 function _getSegmentMethod(line) {
    const opts = line.options;
    const borderDash = opts.borderDash && opts.borderDash.length;
    const useFastPath = !line._decimated && !line._loop && !opts.tension && opts.cubicInterpolationMode !== 'monotone' && !opts.stepped && !borderDash;
    return useFastPath ? fastPathSegment : pathSegment;
}
 function _getInterpolationMethod(options) {
    if (options.stepped) {
        return _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aq;
    }
    if (options.tension || options.cubicInterpolationMode === 'monotone') {
        return _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ar;
    }
    return _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.as;
}
function strokePathWithCache(ctx, line, start, count) {
    let path = line._path;
    if (!path) {
        path = line._path = new Path2D();
        if (line.path(path, start, count)) {
            path.closePath();
        }
    }
    setStyle(ctx, line.options);
    ctx.stroke(path);
}
function strokePathDirect(ctx, line, start, count) {
    const { segments , options  } = line;
    const segmentMethod = _getSegmentMethod(line);
    for (const segment of segments){
        setStyle(ctx, options, segment.style);
        ctx.beginPath();
        if (segmentMethod(ctx, line, segment, {
            start,
            end: start + count - 1
        })) {
            ctx.closePath();
        }
        ctx.stroke();
    }
}
const usePath2D = typeof Path2D === 'function';
function draw(ctx, line, start, count) {
    if (usePath2D && !line.options.segment) {
        strokePathWithCache(ctx, line, start, count);
    } else {
        strokePathDirect(ctx, line, start, count);
    }
}
class LineElement extends Element {
    static id = 'line';
 static defaults = {
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0,
        borderJoinStyle: 'miter',
        borderWidth: 3,
        capBezierPoints: true,
        cubicInterpolationMode: 'default',
        fill: false,
        spanGaps: false,
        stepped: false,
        tension: 0
    };
 static defaultRoutes = {
        backgroundColor: 'backgroundColor',
        borderColor: 'borderColor'
    };
    static descriptors = {
        _scriptable: true,
        _indexable: (name)=>name !== 'borderDash' && name !== 'fill'
    };
    constructor(cfg){
        super();
        this.animated = true;
        this.options = undefined;
        this._chart = undefined;
        this._loop = undefined;
        this._fullLoop = undefined;
        this._path = undefined;
        this._points = undefined;
        this._segments = undefined;
        this._decimated = false;
        this._pointsUpdated = false;
        this._datasetIndex = undefined;
        if (cfg) {
            Object.assign(this, cfg);
        }
    }
    updateControlPoints(chartArea, indexAxis) {
        const options = this.options;
        if ((options.tension || options.cubicInterpolationMode === 'monotone') && !options.stepped && !this._pointsUpdated) {
            const loop = options.spanGaps ? this._loop : this._fullLoop;
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.an)(this._points, options, chartArea, loop, indexAxis);
            this._pointsUpdated = true;
        }
    }
    set points(points) {
        this._points = points;
        delete this._segments;
        delete this._path;
        this._pointsUpdated = false;
    }
    get points() {
        return this._points;
    }
    get segments() {
        return this._segments || (this._segments = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ao)(this, this.options.segment));
    }
 first() {
        const segments = this.segments;
        const points = this.points;
        return segments.length && points[segments[0].start];
    }
 last() {
        const segments = this.segments;
        const points = this.points;
        const count = segments.length;
        return count && points[segments[count - 1].end];
    }
 interpolate(point, property) {
        const options = this.options;
        const value = point[property];
        const points = this.points;
        const segments = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ap)(this, {
            property,
            start: value,
            end: value
        });
        if (!segments.length) {
            return;
        }
        const result = [];
        const _interpolate = _getInterpolationMethod(options);
        let i, ilen;
        for(i = 0, ilen = segments.length; i < ilen; ++i){
            const { start , end  } = segments[i];
            const p1 = points[start];
            const p2 = points[end];
            if (p1 === p2) {
                result.push(p1);
                continue;
            }
            const t = Math.abs((value - p1[property]) / (p2[property] - p1[property]));
            const interpolated = _interpolate(p1, p2, t, options.stepped);
            interpolated[property] = point[property];
            result.push(interpolated);
        }
        return result.length === 1 ? result[0] : result;
    }
 pathSegment(ctx, segment, params) {
        const segmentMethod = _getSegmentMethod(this);
        return segmentMethod(ctx, this, segment, params);
    }
 path(ctx, start, count) {
        const segments = this.segments;
        const segmentMethod = _getSegmentMethod(this);
        let loop = this._loop;
        start = start || 0;
        count = count || this.points.length - start;
        for (const segment of segments){
            loop &= segmentMethod(ctx, this, segment, {
                start,
                end: start + count - 1
            });
        }
        return !!loop;
    }
 draw(ctx, chartArea, start, count) {
        const options = this.options || {};
        const points = this.points || [];
        if (points.length && options.borderWidth) {
            ctx.save();
            draw(ctx, this, start, count);
            ctx.restore();
        }
        if (this.animated) {
            this._pointsUpdated = false;
            this._path = undefined;
        }
    }
}

function inRange$1(el, pos, axis, useFinalPosition) {
    const options = el.options;
    const { [axis]: value  } = el.getProps([
        axis
    ], useFinalPosition);
    return Math.abs(pos - value) < options.radius + options.hitRadius;
}
class PointElement extends Element {
    static id = 'point';
    parsed;
    skip;
    stop;
    /**
   * @type {any}
   */ static defaults = {
        borderWidth: 1,
        hitRadius: 1,
        hoverBorderWidth: 1,
        hoverRadius: 4,
        pointStyle: 'circle',
        radius: 3,
        rotation: 0
    };
    /**
   * @type {any}
   */ static defaultRoutes = {
        backgroundColor: 'backgroundColor',
        borderColor: 'borderColor'
    };
    constructor(cfg){
        super();
        this.options = undefined;
        this.parsed = undefined;
        this.skip = undefined;
        this.stop = undefined;
        if (cfg) {
            Object.assign(this, cfg);
        }
    }
    inRange(mouseX, mouseY, useFinalPosition) {
        const options = this.options;
        const { x , y  } = this.getProps([
            'x',
            'y'
        ], useFinalPosition);
        return Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2) < Math.pow(options.hitRadius + options.radius, 2);
    }
    inXRange(mouseX, useFinalPosition) {
        return inRange$1(this, mouseX, 'x', useFinalPosition);
    }
    inYRange(mouseY, useFinalPosition) {
        return inRange$1(this, mouseY, 'y', useFinalPosition);
    }
    getCenterPoint(useFinalPosition) {
        const { x , y  } = this.getProps([
            'x',
            'y'
        ], useFinalPosition);
        return {
            x,
            y
        };
    }
    size(options) {
        options = options || this.options || {};
        let radius = options.radius || 0;
        radius = Math.max(radius, radius && options.hoverRadius || 0);
        const borderWidth = radius && options.borderWidth || 0;
        return (radius + borderWidth) * 2;
    }
    draw(ctx, area) {
        const options = this.options;
        if (this.skip || options.radius < 0.1 || !(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.C)(this, area, this.size(options) / 2)) {
            return;
        }
        ctx.strokeStyle = options.borderColor;
        ctx.lineWidth = options.borderWidth;
        ctx.fillStyle = options.backgroundColor;
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.av)(ctx, options, this.x, this.y);
    }
    getRange() {
        const options = this.options || {};
        // @ts-expect-error Fallbacks should never be hit in practice
        return options.radius + options.hitRadius;
    }
}

function getBarBounds(bar, useFinalPosition) {
    const { x , y , base , width , height  } =  bar.getProps([
        'x',
        'y',
        'base',
        'width',
        'height'
    ], useFinalPosition);
    let left, right, top, bottom, half;
    if (bar.horizontal) {
        half = height / 2;
        left = Math.min(x, base);
        right = Math.max(x, base);
        top = y - half;
        bottom = y + half;
    } else {
        half = width / 2;
        left = x - half;
        right = x + half;
        top = Math.min(y, base);
        bottom = Math.max(y, base);
    }
    return {
        left,
        top,
        right,
        bottom
    };
}
function skipOrLimit(skip, value, min, max) {
    return skip ? 0 : (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.S)(value, min, max);
}
function parseBorderWidth(bar, maxW, maxH) {
    const value = bar.options.borderWidth;
    const skip = bar.borderSkipped;
    const o = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ax)(value);
    return {
        t: skipOrLimit(skip.top, o.top, 0, maxH),
        r: skipOrLimit(skip.right, o.right, 0, maxW),
        b: skipOrLimit(skip.bottom, o.bottom, 0, maxH),
        l: skipOrLimit(skip.left, o.left, 0, maxW)
    };
}
function parseBorderRadius(bar, maxW, maxH) {
    const { enableBorderRadius  } = bar.getProps([
        'enableBorderRadius'
    ]);
    const value = bar.options.borderRadius;
    const o = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ay)(value);
    const maxR = Math.min(maxW, maxH);
    const skip = bar.borderSkipped;
    const enableBorder = enableBorderRadius || (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.i)(value);
    return {
        topLeft: skipOrLimit(!enableBorder || skip.top || skip.left, o.topLeft, 0, maxR),
        topRight: skipOrLimit(!enableBorder || skip.top || skip.right, o.topRight, 0, maxR),
        bottomLeft: skipOrLimit(!enableBorder || skip.bottom || skip.left, o.bottomLeft, 0, maxR),
        bottomRight: skipOrLimit(!enableBorder || skip.bottom || skip.right, o.bottomRight, 0, maxR)
    };
}
function boundingRects(bar) {
    const bounds = getBarBounds(bar);
    const width = bounds.right - bounds.left;
    const height = bounds.bottom - bounds.top;
    const border = parseBorderWidth(bar, width / 2, height / 2);
    const radius = parseBorderRadius(bar, width / 2, height / 2);
    return {
        outer: {
            x: bounds.left,
            y: bounds.top,
            w: width,
            h: height,
            radius
        },
        inner: {
            x: bounds.left + border.l,
            y: bounds.top + border.t,
            w: width - border.l - border.r,
            h: height - border.t - border.b,
            radius: {
                topLeft: Math.max(0, radius.topLeft - Math.max(border.t, border.l)),
                topRight: Math.max(0, radius.topRight - Math.max(border.t, border.r)),
                bottomLeft: Math.max(0, radius.bottomLeft - Math.max(border.b, border.l)),
                bottomRight: Math.max(0, radius.bottomRight - Math.max(border.b, border.r))
            }
        }
    };
}
function inRange(bar, x, y, useFinalPosition) {
    const skipX = x === null;
    const skipY = y === null;
    const skipBoth = skipX && skipY;
    const bounds = bar && !skipBoth && getBarBounds(bar, useFinalPosition);
    return bounds && (skipX || (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ak)(x, bounds.left, bounds.right)) && (skipY || (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ak)(y, bounds.top, bounds.bottom));
}
function hasRadius(radius) {
    return radius.topLeft || radius.topRight || radius.bottomLeft || radius.bottomRight;
}
 function addNormalRectPath(ctx, rect) {
    ctx.rect(rect.x, rect.y, rect.w, rect.h);
}
function inflateRect(rect, amount, refRect = {}) {
    const x = rect.x !== refRect.x ? -amount : 0;
    const y = rect.y !== refRect.y ? -amount : 0;
    const w = (rect.x + rect.w !== refRect.x + refRect.w ? amount : 0) - x;
    const h = (rect.y + rect.h !== refRect.y + refRect.h ? amount : 0) - y;
    return {
        x: rect.x + x,
        y: rect.y + y,
        w: rect.w + w,
        h: rect.h + h,
        radius: rect.radius
    };
}
class BarElement extends Element {
    static id = 'bar';
 static defaults = {
        borderSkipped: 'start',
        borderWidth: 0,
        borderRadius: 0,
        inflateAmount: 'auto',
        pointStyle: undefined
    };
 static defaultRoutes = {
        backgroundColor: 'backgroundColor',
        borderColor: 'borderColor'
    };
    constructor(cfg){
        super();
        this.options = undefined;
        this.horizontal = undefined;
        this.base = undefined;
        this.width = undefined;
        this.height = undefined;
        this.inflateAmount = undefined;
        if (cfg) {
            Object.assign(this, cfg);
        }
    }
    draw(ctx) {
        const { inflateAmount , options: { borderColor , backgroundColor  }  } = this;
        const { inner , outer  } = boundingRects(this);
        const addRectPath = hasRadius(outer.radius) ? _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aw : addNormalRectPath;
        ctx.save();
        if (outer.w !== inner.w || outer.h !== inner.h) {
            ctx.beginPath();
            addRectPath(ctx, inflateRect(outer, inflateAmount, inner));
            ctx.clip();
            addRectPath(ctx, inflateRect(inner, -inflateAmount, outer));
            ctx.fillStyle = borderColor;
            ctx.fill('evenodd');
        }
        ctx.beginPath();
        addRectPath(ctx, inflateRect(inner, inflateAmount));
        ctx.fillStyle = backgroundColor;
        ctx.fill();
        ctx.restore();
    }
    inRange(mouseX, mouseY, useFinalPosition) {
        return inRange(this, mouseX, mouseY, useFinalPosition);
    }
    inXRange(mouseX, useFinalPosition) {
        return inRange(this, mouseX, null, useFinalPosition);
    }
    inYRange(mouseY, useFinalPosition) {
        return inRange(this, null, mouseY, useFinalPosition);
    }
    getCenterPoint(useFinalPosition) {
        const { x , y , base , horizontal  } =  this.getProps([
            'x',
            'y',
            'base',
            'horizontal'
        ], useFinalPosition);
        return {
            x: horizontal ? (x + base) / 2 : x,
            y: horizontal ? y : (y + base) / 2
        };
    }
    getRange(axis) {
        return axis === 'x' ? this.width / 2 : this.height / 2;
    }
}

var elements = /*#__PURE__*/Object.freeze({
__proto__: null,
ArcElement: ArcElement,
BarElement: BarElement,
LineElement: LineElement,
PointElement: PointElement
});

const BORDER_COLORS = [
    'rgb(54, 162, 235)',
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)' // grey
];
// Border colors with 50% transparency
const BACKGROUND_COLORS = /* #__PURE__ */ BORDER_COLORS.map((color)=>color.replace('rgb(', 'rgba(').replace(')', ', 0.5)'));
function getBorderColor(i) {
    return BORDER_COLORS[i % BORDER_COLORS.length];
}
function getBackgroundColor(i) {
    return BACKGROUND_COLORS[i % BACKGROUND_COLORS.length];
}
function colorizeDefaultDataset(dataset, i) {
    dataset.borderColor = getBorderColor(i);
    dataset.backgroundColor = getBackgroundColor(i);
    return ++i;
}
function colorizeDoughnutDataset(dataset, i) {
    dataset.backgroundColor = dataset.data.map(()=>getBorderColor(i++));
    return i;
}
function colorizePolarAreaDataset(dataset, i) {
    dataset.backgroundColor = dataset.data.map(()=>getBackgroundColor(i++));
    return i;
}
function getColorizer(chart) {
    let i = 0;
    return (dataset, datasetIndex)=>{
        const controller = chart.getDatasetMeta(datasetIndex).controller;
        if (controller instanceof DoughnutController) {
            i = colorizeDoughnutDataset(dataset, i);
        } else if (controller instanceof PolarAreaController) {
            i = colorizePolarAreaDataset(dataset, i);
        } else if (controller) {
            i = colorizeDefaultDataset(dataset, i);
        }
    };
}
function containsColorsDefinitions(descriptors) {
    let k;
    for(k in descriptors){
        if (descriptors[k].borderColor || descriptors[k].backgroundColor) {
            return true;
        }
    }
    return false;
}
function containsColorsDefinition(descriptor) {
    return descriptor && (descriptor.borderColor || descriptor.backgroundColor);
}
function containsDefaultColorsDefenitions() {
    return _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.d.borderColor !== 'rgba(0,0,0,0.1)' || _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.d.backgroundColor !== 'rgba(0,0,0,0.1)';
}
var plugin_colors = {
    id: 'colors',
    defaults: {
        enabled: true,
        forceOverride: false
    },
    beforeLayout (chart, _args, options) {
        if (!options.enabled) {
            return;
        }
        const { data: { datasets  } , options: chartOptions  } = chart.config;
        const { elements  } = chartOptions;
        const containsColorDefenition = containsColorsDefinitions(datasets) || containsColorsDefinition(chartOptions) || elements && containsColorsDefinitions(elements) || containsDefaultColorsDefenitions();
        if (!options.forceOverride && containsColorDefenition) {
            return;
        }
        const colorizer = getColorizer(chart);
        datasets.forEach(colorizer);
    }
};

function lttbDecimation(data, start, count, availableWidth, options) {
 const samples = options.samples || availableWidth;
    if (samples >= count) {
        return data.slice(start, start + count);
    }
    const decimated = [];
    const bucketWidth = (count - 2) / (samples - 2);
    let sampledIndex = 0;
    const endIndex = start + count - 1;
    let a = start;
    let i, maxAreaPoint, maxArea, area, nextA;
    decimated[sampledIndex++] = data[a];
    for(i = 0; i < samples - 2; i++){
        let avgX = 0;
        let avgY = 0;
        let j;
        const avgRangeStart = Math.floor((i + 1) * bucketWidth) + 1 + start;
        const avgRangeEnd = Math.min(Math.floor((i + 2) * bucketWidth) + 1, count) + start;
        const avgRangeLength = avgRangeEnd - avgRangeStart;
        for(j = avgRangeStart; j < avgRangeEnd; j++){
            avgX += data[j].x;
            avgY += data[j].y;
        }
        avgX /= avgRangeLength;
        avgY /= avgRangeLength;
        const rangeOffs = Math.floor(i * bucketWidth) + 1 + start;
        const rangeTo = Math.min(Math.floor((i + 1) * bucketWidth) + 1, count) + start;
        const { x: pointAx , y: pointAy  } = data[a];
        maxArea = area = -1;
        for(j = rangeOffs; j < rangeTo; j++){
            area = 0.5 * Math.abs((pointAx - avgX) * (data[j].y - pointAy) - (pointAx - data[j].x) * (avgY - pointAy));
            if (area > maxArea) {
                maxArea = area;
                maxAreaPoint = data[j];
                nextA = j;
            }
        }
        decimated[sampledIndex++] = maxAreaPoint;
        a = nextA;
    }
    decimated[sampledIndex++] = data[endIndex];
    return decimated;
}
function minMaxDecimation(data, start, count, availableWidth) {
    let avgX = 0;
    let countX = 0;
    let i, point, x, y, prevX, minIndex, maxIndex, startIndex, minY, maxY;
    const decimated = [];
    const endIndex = start + count - 1;
    const xMin = data[start].x;
    const xMax = data[endIndex].x;
    const dx = xMax - xMin;
    for(i = start; i < start + count; ++i){
        point = data[i];
        x = (point.x - xMin) / dx * availableWidth;
        y = point.y;
        const truncX = x | 0;
        if (truncX === prevX) {
            if (y < minY) {
                minY = y;
                minIndex = i;
            } else if (y > maxY) {
                maxY = y;
                maxIndex = i;
            }
            avgX = (countX * avgX + point.x) / ++countX;
        } else {
            const lastIndex = i - 1;
            if (!(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(minIndex) && !(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(maxIndex)) {
                const intermediateIndex1 = Math.min(minIndex, maxIndex);
                const intermediateIndex2 = Math.max(minIndex, maxIndex);
                if (intermediateIndex1 !== startIndex && intermediateIndex1 !== lastIndex) {
                    decimated.push({
                        ...data[intermediateIndex1],
                        x: avgX
                    });
                }
                if (intermediateIndex2 !== startIndex && intermediateIndex2 !== lastIndex) {
                    decimated.push({
                        ...data[intermediateIndex2],
                        x: avgX
                    });
                }
            }
            if (i > 0 && lastIndex !== startIndex) {
                decimated.push(data[lastIndex]);
            }
            decimated.push(point);
            prevX = truncX;
            countX = 0;
            minY = maxY = y;
            minIndex = maxIndex = startIndex = i;
        }
    }
    return decimated;
}
function cleanDecimatedDataset(dataset) {
    if (dataset._decimated) {
        const data = dataset._data;
        delete dataset._decimated;
        delete dataset._data;
        Object.defineProperty(dataset, 'data', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: data
        });
    }
}
function cleanDecimatedData(chart) {
    chart.data.datasets.forEach((dataset)=>{
        cleanDecimatedDataset(dataset);
    });
}
function getStartAndCountOfVisiblePointsSimplified(meta, points) {
    const pointCount = points.length;
    let start = 0;
    let count;
    const { iScale  } = meta;
    const { min , max , minDefined , maxDefined  } = iScale.getUserBounds();
    if (minDefined) {
        start = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.S)((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.B)(points, iScale.axis, min).lo, 0, pointCount - 1);
    }
    if (maxDefined) {
        count = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.S)((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.B)(points, iScale.axis, max).hi + 1, start, pointCount) - start;
    } else {
        count = pointCount - start;
    }
    return {
        start,
        count
    };
}
var plugin_decimation = {
    id: 'decimation',
    defaults: {
        algorithm: 'min-max',
        enabled: false
    },
    beforeElementsUpdate: (chart, args, options)=>{
        if (!options.enabled) {
            cleanDecimatedData(chart);
            return;
        }
        const availableWidth = chart.width;
        chart.data.datasets.forEach((dataset, datasetIndex)=>{
            const { _data , indexAxis  } = dataset;
            const meta = chart.getDatasetMeta(datasetIndex);
            const data = _data || dataset.data;
            if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a)([
                indexAxis,
                chart.options.indexAxis
            ]) === 'y') {
                return;
            }
            if (!meta.controller.supportsDecimation) {
                return;
            }
            const xAxis = chart.scales[meta.xAxisID];
            if (xAxis.type !== 'linear' && xAxis.type !== 'time') {
                return;
            }
            if (chart.options.parsing) {
                return;
            }
            let { start , count  } = getStartAndCountOfVisiblePointsSimplified(meta, data);
            const threshold = options.threshold || 4 * availableWidth;
            if (count <= threshold) {
                cleanDecimatedDataset(dataset);
                return;
            }
            if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(_data)) {
                dataset._data = data;
                delete dataset.data;
                Object.defineProperty(dataset, 'data', {
                    configurable: true,
                    enumerable: true,
                    get: function() {
                        return this._decimated;
                    },
                    set: function(d) {
                        this._data = d;
                    }
                });
            }
            let decimated;
            switch(options.algorithm){
                case 'lttb':
                    decimated = lttbDecimation(data, start, count, availableWidth, options);
                    break;
                case 'min-max':
                    decimated = minMaxDecimation(data, start, count, availableWidth);
                    break;
                default:
                    throw new Error(`Unsupported decimation algorithm '${options.algorithm}'`);
            }
            dataset._decimated = decimated;
        });
    },
    destroy (chart) {
        cleanDecimatedData(chart);
    }
};

function _segments(line, target, property) {
    const segments = line.segments;
    const points = line.points;
    const tpoints = target.points;
    const parts = [];
    for (const segment of segments){
        let { start , end  } = segment;
        end = _findSegmentEnd(start, end, points);
        const bounds = _getBounds(property, points[start], points[end], segment.loop);
        if (!target.segments) {
            parts.push({
                source: segment,
                target: bounds,
                start: points[start],
                end: points[end]
            });
            continue;
        }
        const targetSegments = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ap)(target, bounds);
        for (const tgt of targetSegments){
            const subBounds = _getBounds(property, tpoints[tgt.start], tpoints[tgt.end], tgt.loop);
            const fillSources = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.az)(segment, points, subBounds);
            for (const fillSource of fillSources){
                parts.push({
                    source: fillSource,
                    target: tgt,
                    start: {
                        [property]: _getEdge(bounds, subBounds, 'start', Math.max)
                    },
                    end: {
                        [property]: _getEdge(bounds, subBounds, 'end', Math.min)
                    }
                });
            }
        }
    }
    return parts;
}
function _getBounds(property, first, last, loop) {
    if (loop) {
        return;
    }
    let start = first[property];
    let end = last[property];
    if (property === 'angle') {
        start = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.al)(start);
        end = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.al)(end);
    }
    return {
        property,
        start,
        end
    };
}
function _pointsFromSegments(boundary, line) {
    const { x =null , y =null  } = boundary || {};
    const linePoints = line.points;
    const points = [];
    line.segments.forEach(({ start , end  })=>{
        end = _findSegmentEnd(start, end, linePoints);
        const first = linePoints[start];
        const last = linePoints[end];
        if (y !== null) {
            points.push({
                x: first.x,
                y
            });
            points.push({
                x: last.x,
                y
            });
        } else if (x !== null) {
            points.push({
                x,
                y: first.y
            });
            points.push({
                x,
                y: last.y
            });
        }
    });
    return points;
}
function _findSegmentEnd(start, end, points) {
    for(; end > start; end--){
        const point = points[end];
        if (!isNaN(point.x) && !isNaN(point.y)) {
            break;
        }
    }
    return end;
}
function _getEdge(a, b, prop, fn) {
    if (a && b) {
        return fn(a[prop], b[prop]);
    }
    return a ? a[prop] : b ? b[prop] : 0;
}

function _createBoundaryLine(boundary, line) {
    let points = [];
    let _loop = false;
    if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.b)(boundary)) {
        _loop = true;
        points = boundary;
    } else {
        points = _pointsFromSegments(boundary, line);
    }
    return points.length ? new LineElement({
        points,
        options: {
            tension: 0
        },
        _loop,
        _fullLoop: _loop
    }) : null;
}
function _shouldApplyFill(source) {
    return source && source.fill !== false;
}

function _resolveTarget(sources, index, propagate) {
    const source = sources[index];
    let fill = source.fill;
    const visited = [
        index
    ];
    let target;
    if (!propagate) {
        return fill;
    }
    while(fill !== false && visited.indexOf(fill) === -1){
        if (!(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.g)(fill)) {
            return fill;
        }
        target = sources[fill];
        if (!target) {
            return false;
        }
        if (target.visible) {
            return fill;
        }
        visited.push(fill);
        fill = target.fill;
    }
    return false;
}
 function _decodeFill(line, index, count) {
     const fill = parseFillOption(line);
    if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.i)(fill)) {
        return isNaN(fill.value) ? false : fill;
    }
    let target = parseFloat(fill);
    if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.g)(target) && Math.floor(target) === target) {
        return decodeTargetIndex(fill[0], index, target, count);
    }
    return [
        'origin',
        'start',
        'end',
        'stack',
        'shape'
    ].indexOf(fill) >= 0 && fill;
}
function decodeTargetIndex(firstCh, index, target, count) {
    if (firstCh === '-' || firstCh === '+') {
        target = index + target;
    }
    if (target === index || target < 0 || target >= count) {
        return false;
    }
    return target;
}
 function _getTargetPixel(fill, scale) {
    let pixel = null;
    if (fill === 'start') {
        pixel = scale.bottom;
    } else if (fill === 'end') {
        pixel = scale.top;
    } else if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.i)(fill)) {
        pixel = scale.getPixelForValue(fill.value);
    } else if (scale.getBasePixel) {
        pixel = scale.getBasePixel();
    }
    return pixel;
}
 function _getTargetValue(fill, scale, startValue) {
    let value;
    if (fill === 'start') {
        value = startValue;
    } else if (fill === 'end') {
        value = scale.options.reverse ? scale.min : scale.max;
    } else if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.i)(fill)) {
        value = fill.value;
    } else {
        value = scale.getBaseValue();
    }
    return value;
}
 function parseFillOption(line) {
    const options = line.options;
    const fillOption = options.fill;
    let fill = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(fillOption && fillOption.target, fillOption);
    if (fill === undefined) {
        fill = !!options.backgroundColor;
    }
    if (fill === false || fill === null) {
        return false;
    }
    if (fill === true) {
        return 'origin';
    }
    return fill;
}

function _buildStackLine(source) {
    const { scale , index , line  } = source;
    const points = [];
    const segments = line.segments;
    const sourcePoints = line.points;
    const linesBelow = getLinesBelow(scale, index);
    linesBelow.push(_createBoundaryLine({
        x: null,
        y: scale.bottom
    }, line));
    for(let i = 0; i < segments.length; i++){
        const segment = segments[i];
        for(let j = segment.start; j <= segment.end; j++){
            addPointsBelow(points, sourcePoints[j], linesBelow);
        }
    }
    return new LineElement({
        points,
        options: {}
    });
}
 function getLinesBelow(scale, index) {
    const below = [];
    const metas = scale.getMatchingVisibleMetas('line');
    for(let i = 0; i < metas.length; i++){
        const meta = metas[i];
        if (meta.index === index) {
            break;
        }
        if (!meta.hidden) {
            below.unshift(meta.dataset);
        }
    }
    return below;
}
 function addPointsBelow(points, sourcePoint, linesBelow) {
    const postponed = [];
    for(let j = 0; j < linesBelow.length; j++){
        const line = linesBelow[j];
        const { first , last , point  } = findPoint(line, sourcePoint, 'x');
        if (!point || first && last) {
            continue;
        }
        if (first) {
            postponed.unshift(point);
        } else {
            points.push(point);
            if (!last) {
                break;
            }
        }
    }
    points.push(...postponed);
}
 function findPoint(line, sourcePoint, property) {
    const point = line.interpolate(sourcePoint, property);
    if (!point) {
        return {};
    }
    const pointValue = point[property];
    const segments = line.segments;
    const linePoints = line.points;
    let first = false;
    let last = false;
    for(let i = 0; i < segments.length; i++){
        const segment = segments[i];
        const firstValue = linePoints[segment.start][property];
        const lastValue = linePoints[segment.end][property];
        if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ak)(pointValue, firstValue, lastValue)) {
            first = pointValue === firstValue;
            last = pointValue === lastValue;
            break;
        }
    }
    return {
        first,
        last,
        point
    };
}

class simpleArc {
    constructor(opts){
        this.x = opts.x;
        this.y = opts.y;
        this.radius = opts.radius;
    }
    pathSegment(ctx, bounds, opts) {
        const { x , y , radius  } = this;
        bounds = bounds || {
            start: 0,
            end: _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.T
        };
        ctx.arc(x, y, radius, bounds.end, bounds.start, true);
        return !opts.bounds;
    }
    interpolate(point) {
        const { x , y , radius  } = this;
        const angle = point.angle;
        return {
            x: x + Math.cos(angle) * radius,
            y: y + Math.sin(angle) * radius,
            angle
        };
    }
}

function _getTarget(source) {
    const { chart , fill , line  } = source;
    if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.g)(fill)) {
        return getLineByIndex(chart, fill);
    }
    if (fill === 'stack') {
        return _buildStackLine(source);
    }
    if (fill === 'shape') {
        return true;
    }
    const boundary = computeBoundary(source);
    if (boundary instanceof simpleArc) {
        return boundary;
    }
    return _createBoundaryLine(boundary, line);
}
 function getLineByIndex(chart, index) {
    const meta = chart.getDatasetMeta(index);
    const visible = meta && chart.isDatasetVisible(index);
    return visible ? meta.dataset : null;
}
function computeBoundary(source) {
    const scale = source.scale || {};
    if (scale.getPointPositionForValue) {
        return computeCircularBoundary(source);
    }
    return computeLinearBoundary(source);
}
function computeLinearBoundary(source) {
    const { scale ={} , fill  } = source;
    const pixel = _getTargetPixel(fill, scale);
    if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.g)(pixel)) {
        const horizontal = scale.isHorizontal();
        return {
            x: horizontal ? pixel : null,
            y: horizontal ? null : pixel
        };
    }
    return null;
}
function computeCircularBoundary(source) {
    const { scale , fill  } = source;
    const options = scale.options;
    const length = scale.getLabels().length;
    const start = options.reverse ? scale.max : scale.min;
    const value = _getTargetValue(fill, scale, start);
    const target = [];
    if (options.grid.circular) {
        const center = scale.getPointPositionForValue(0, start);
        return new simpleArc({
            x: center.x,
            y: center.y,
            radius: scale.getDistanceFromCenterForValue(value)
        });
    }
    for(let i = 0; i < length; ++i){
        target.push(scale.getPointPositionForValue(i, value));
    }
    return target;
}

function _drawfill(ctx, source, area) {
    const target = _getTarget(source);
    const { chart , index , line , scale , axis  } = source;
    const lineOpts = line.options;
    const fillOption = lineOpts.fill;
    const color = lineOpts.backgroundColor;
    const { above =color , below =color  } = fillOption || {};
    const meta = chart.getDatasetMeta(index);
    const clip = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ah)(chart, meta);
    if (target && line.points.length) {
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Y)(ctx, area);
        doFill(ctx, {
            line,
            target,
            above,
            below,
            area,
            scale,
            axis,
            clip
        });
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.$)(ctx);
    }
}
function doFill(ctx, cfg) {
    const { line , target , above , below , area , scale , clip  } = cfg;
    const property = line._loop ? 'angle' : cfg.axis;
    ctx.save();
    let fillColor = below;
    if (below !== above) {
        if (property === 'x') {
            clipVertical(ctx, target, area.top);
            fill(ctx, {
                line,
                target,
                color: above,
                scale,
                property,
                clip
            });
            ctx.restore();
            ctx.save();
            clipVertical(ctx, target, area.bottom);
        } else if (property === 'y') {
            clipHorizontal(ctx, target, area.left);
            fill(ctx, {
                line,
                target,
                color: below,
                scale,
                property,
                clip
            });
            ctx.restore();
            ctx.save();
            clipHorizontal(ctx, target, area.right);
            fillColor = above;
        }
    }
    fill(ctx, {
        line,
        target,
        color: fillColor,
        scale,
        property,
        clip
    });
    ctx.restore();
}
function clipVertical(ctx, target, clipY) {
    const { segments , points  } = target;
    let first = true;
    let lineLoop = false;
    ctx.beginPath();
    for (const segment of segments){
        const { start , end  } = segment;
        const firstPoint = points[start];
        const lastPoint = points[_findSegmentEnd(start, end, points)];
        if (first) {
            ctx.moveTo(firstPoint.x, firstPoint.y);
            first = false;
        } else {
            ctx.lineTo(firstPoint.x, clipY);
            ctx.lineTo(firstPoint.x, firstPoint.y);
        }
        lineLoop = !!target.pathSegment(ctx, segment, {
            move: lineLoop
        });
        if (lineLoop) {
            ctx.closePath();
        } else {
            ctx.lineTo(lastPoint.x, clipY);
        }
    }
    ctx.lineTo(target.first().x, clipY);
    ctx.closePath();
    ctx.clip();
}
function clipHorizontal(ctx, target, clipX) {
    const { segments , points  } = target;
    let first = true;
    let lineLoop = false;
    ctx.beginPath();
    for (const segment of segments){
        const { start , end  } = segment;
        const firstPoint = points[start];
        const lastPoint = points[_findSegmentEnd(start, end, points)];
        if (first) {
            ctx.moveTo(firstPoint.x, firstPoint.y);
            first = false;
        } else {
            ctx.lineTo(clipX, firstPoint.y);
            ctx.lineTo(firstPoint.x, firstPoint.y);
        }
        lineLoop = !!target.pathSegment(ctx, segment, {
            move: lineLoop
        });
        if (lineLoop) {
            ctx.closePath();
        } else {
            ctx.lineTo(clipX, lastPoint.y);
        }
    }
    ctx.lineTo(clipX, target.first().y);
    ctx.closePath();
    ctx.clip();
}
function fill(ctx, cfg) {
    const { line , target , property , color , scale , clip  } = cfg;
    const segments = _segments(line, target, property);
    for (const { source: src , target: tgt , start , end  } of segments){
        const { style: { backgroundColor =color  } = {}  } = src;
        const notShape = target !== true;
        ctx.save();
        ctx.fillStyle = backgroundColor;
        clipBounds(ctx, scale, clip, notShape && _getBounds(property, start, end));
        ctx.beginPath();
        const lineLoop = !!line.pathSegment(ctx, src);
        let loop;
        if (notShape) {
            if (lineLoop) {
                ctx.closePath();
            } else {
                interpolatedLineTo(ctx, target, end, property);
            }
            const targetLoop = !!target.pathSegment(ctx, tgt, {
                move: lineLoop,
                reverse: true
            });
            loop = lineLoop && targetLoop;
            if (!loop) {
                interpolatedLineTo(ctx, target, start, property);
            }
        }
        ctx.closePath();
        ctx.fill(loop ? 'evenodd' : 'nonzero');
        ctx.restore();
    }
}
function clipBounds(ctx, scale, clip, bounds) {
    const chartArea = scale.chart.chartArea;
    const { property , start , end  } = bounds || {};
    if (property === 'x' || property === 'y') {
        let left, top, right, bottom;
        if (property === 'x') {
            left = start;
            top = chartArea.top;
            right = end;
            bottom = chartArea.bottom;
        } else {
            left = chartArea.left;
            top = start;
            right = chartArea.right;
            bottom = end;
        }
        ctx.beginPath();
        if (clip) {
            left = Math.max(left, clip.left);
            right = Math.min(right, clip.right);
            top = Math.max(top, clip.top);
            bottom = Math.min(bottom, clip.bottom);
        }
        ctx.rect(left, top, right - left, bottom - top);
        ctx.clip();
    }
}
function interpolatedLineTo(ctx, target, point, property) {
    const interpolatedPoint = target.interpolate(point, property);
    if (interpolatedPoint) {
        ctx.lineTo(interpolatedPoint.x, interpolatedPoint.y);
    }
}

var index = {
    id: 'filler',
    afterDatasetsUpdate (chart, _args, options) {
        const count = (chart.data.datasets || []).length;
        const sources = [];
        let meta, i, line, source;
        for(i = 0; i < count; ++i){
            meta = chart.getDatasetMeta(i);
            line = meta.dataset;
            source = null;
            if (line && line.options && line instanceof LineElement) {
                source = {
                    visible: chart.isDatasetVisible(i),
                    index: i,
                    fill: _decodeFill(line, i, count),
                    chart,
                    axis: meta.controller.options.indexAxis,
                    scale: meta.vScale,
                    line
                };
            }
            meta.$filler = source;
            sources.push(source);
        }
        for(i = 0; i < count; ++i){
            source = sources[i];
            if (!source || source.fill === false) {
                continue;
            }
            source.fill = _resolveTarget(sources, i, options.propagate);
        }
    },
    beforeDraw (chart, _args, options) {
        const draw = options.drawTime === 'beforeDraw';
        const metasets = chart.getSortedVisibleDatasetMetas();
        const area = chart.chartArea;
        for(let i = metasets.length - 1; i >= 0; --i){
            const source = metasets[i].$filler;
            if (!source) {
                continue;
            }
            source.line.updateControlPoints(area, source.axis);
            if (draw && source.fill) {
                _drawfill(chart.ctx, source, area);
            }
        }
    },
    beforeDatasetsDraw (chart, _args, options) {
        if (options.drawTime !== 'beforeDatasetsDraw') {
            return;
        }
        const metasets = chart.getSortedVisibleDatasetMetas();
        for(let i = metasets.length - 1; i >= 0; --i){
            const source = metasets[i].$filler;
            if (_shouldApplyFill(source)) {
                _drawfill(chart.ctx, source, chart.chartArea);
            }
        }
    },
    beforeDatasetDraw (chart, args, options) {
        const source = args.meta.$filler;
        if (!_shouldApplyFill(source) || options.drawTime !== 'beforeDatasetDraw') {
            return;
        }
        _drawfill(chart.ctx, source, chart.chartArea);
    },
    defaults: {
        propagate: true,
        drawTime: 'beforeDatasetDraw'
    }
};

const getBoxSize = (labelOpts, fontSize)=>{
    let { boxHeight =fontSize , boxWidth =fontSize  } = labelOpts;
    if (labelOpts.usePointStyle) {
        boxHeight = Math.min(boxHeight, fontSize);
        boxWidth = labelOpts.pointStyleWidth || Math.min(boxWidth, fontSize);
    }
    return {
        boxWidth,
        boxHeight,
        itemHeight: Math.max(fontSize, boxHeight)
    };
};
const itemsEqual = (a, b)=>a !== null && b !== null && a.datasetIndex === b.datasetIndex && a.index === b.index;
class Legend extends Element {
 constructor(config){
        super();
        this._added = false;
        this.legendHitBoxes = [];
 this._hoveredItem = null;
        this.doughnutMode = false;
        this.chart = config.chart;
        this.options = config.options;
        this.ctx = config.ctx;
        this.legendItems = undefined;
        this.columnSizes = undefined;
        this.lineWidths = undefined;
        this.maxHeight = undefined;
        this.maxWidth = undefined;
        this.top = undefined;
        this.bottom = undefined;
        this.left = undefined;
        this.right = undefined;
        this.height = undefined;
        this.width = undefined;
        this._margins = undefined;
        this.position = undefined;
        this.weight = undefined;
        this.fullSize = undefined;
    }
    update(maxWidth, maxHeight, margins) {
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this._margins = margins;
        this.setDimensions();
        this.buildLabels();
        this.fit();
    }
    setDimensions() {
        if (this.isHorizontal()) {
            this.width = this.maxWidth;
            this.left = this._margins.left;
            this.right = this.width;
        } else {
            this.height = this.maxHeight;
            this.top = this._margins.top;
            this.bottom = this.height;
        }
    }
    buildLabels() {
        const labelOpts = this.options.labels || {};
        let legendItems = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(labelOpts.generateLabels, [
            this.chart
        ], this) || [];
        if (labelOpts.filter) {
            legendItems = legendItems.filter((item)=>labelOpts.filter(item, this.chart.data));
        }
        if (labelOpts.sort) {
            legendItems = legendItems.sort((a, b)=>labelOpts.sort(a, b, this.chart.data));
        }
        if (this.options.reverse) {
            legendItems.reverse();
        }
        this.legendItems = legendItems;
    }
    fit() {
        const { options , ctx  } = this;
        if (!options.display) {
            this.width = this.height = 0;
            return;
        }
        const labelOpts = options.labels;
        const labelFont = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a0)(labelOpts.font);
        const fontSize = labelFont.size;
        const titleHeight = this._computeTitleHeight();
        const { boxWidth , itemHeight  } = getBoxSize(labelOpts, fontSize);
        let width, height;
        ctx.font = labelFont.string;
        if (this.isHorizontal()) {
            width = this.maxWidth;
            height = this._fitRows(titleHeight, fontSize, boxWidth, itemHeight) + 10;
        } else {
            height = this.maxHeight;
            width = this._fitCols(titleHeight, labelFont, boxWidth, itemHeight) + 10;
        }
        this.width = Math.min(width, options.maxWidth || this.maxWidth);
        this.height = Math.min(height, options.maxHeight || this.maxHeight);
    }
 _fitRows(titleHeight, fontSize, boxWidth, itemHeight) {
        const { ctx , maxWidth , options: { labels: { padding  }  }  } = this;
        const hitboxes = this.legendHitBoxes = [];
        const lineWidths = this.lineWidths = [
            0
        ];
        const lineHeight = itemHeight + padding;
        let totalHeight = titleHeight;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        let row = -1;
        let top = -lineHeight;
        this.legendItems.forEach((legendItem, i)=>{
            const itemWidth = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;
            if (i === 0 || lineWidths[lineWidths.length - 1] + itemWidth + 2 * padding > maxWidth) {
                totalHeight += lineHeight;
                lineWidths[lineWidths.length - (i > 0 ? 0 : 1)] = 0;
                top += lineHeight;
                row++;
            }
            hitboxes[i] = {
                left: 0,
                top,
                row,
                width: itemWidth,
                height: itemHeight
            };
            lineWidths[lineWidths.length - 1] += itemWidth + padding;
        });
        return totalHeight;
    }
    _fitCols(titleHeight, labelFont, boxWidth, _itemHeight) {
        const { ctx , maxHeight , options: { labels: { padding  }  }  } = this;
        const hitboxes = this.legendHitBoxes = [];
        const columnSizes = this.columnSizes = [];
        const heightLimit = maxHeight - titleHeight;
        let totalWidth = padding;
        let currentColWidth = 0;
        let currentColHeight = 0;
        let left = 0;
        let col = 0;
        this.legendItems.forEach((legendItem, i)=>{
            const { itemWidth , itemHeight  } = calculateItemSize(boxWidth, labelFont, ctx, legendItem, _itemHeight);
            if (i > 0 && currentColHeight + itemHeight + 2 * padding > heightLimit) {
                totalWidth += currentColWidth + padding;
                columnSizes.push({
                    width: currentColWidth,
                    height: currentColHeight
                });
                left += currentColWidth + padding;
                col++;
                currentColWidth = currentColHeight = 0;
            }
            hitboxes[i] = {
                left,
                top: currentColHeight,
                col,
                width: itemWidth,
                height: itemHeight
            };
            currentColWidth = Math.max(currentColWidth, itemWidth);
            currentColHeight += itemHeight + padding;
        });
        totalWidth += currentColWidth;
        columnSizes.push({
            width: currentColWidth,
            height: currentColHeight
        });
        return totalWidth;
    }
    adjustHitBoxes() {
        if (!this.options.display) {
            return;
        }
        const titleHeight = this._computeTitleHeight();
        const { legendHitBoxes: hitboxes , options: { align , labels: { padding  } , rtl  }  } = this;
        const rtlHelper = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aA)(rtl, this.left, this.width);
        if (this.isHorizontal()) {
            let row = 0;
            let left = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a2)(align, this.left + padding, this.right - this.lineWidths[row]);
            for (const hitbox of hitboxes){
                if (row !== hitbox.row) {
                    row = hitbox.row;
                    left = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a2)(align, this.left + padding, this.right - this.lineWidths[row]);
                }
                hitbox.top += this.top + titleHeight + padding;
                hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(left), hitbox.width);
                left += hitbox.width + padding;
            }
        } else {
            let col = 0;
            let top = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a2)(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
            for (const hitbox of hitboxes){
                if (hitbox.col !== col) {
                    col = hitbox.col;
                    top = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a2)(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
                }
                hitbox.top = top;
                hitbox.left += this.left + padding;
                hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(hitbox.left), hitbox.width);
                top += hitbox.height + padding;
            }
        }
    }
    isHorizontal() {
        return this.options.position === 'top' || this.options.position === 'bottom';
    }
    draw() {
        if (this.options.display) {
            const ctx = this.ctx;
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Y)(ctx, this);
            this._draw();
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.$)(ctx);
        }
    }
 _draw() {
        const { options: opts , columnSizes , lineWidths , ctx  } = this;
        const { align , labels: labelOpts  } = opts;
        const defaultColor = _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.d.color;
        const rtlHelper = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aA)(opts.rtl, this.left, this.width);
        const labelFont = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a0)(labelOpts.font);
        const { padding  } = labelOpts;
        const fontSize = labelFont.size;
        const halfFontSize = fontSize / 2;
        let cursor;
        this.drawTitle();
        ctx.textAlign = rtlHelper.textAlign('left');
        ctx.textBaseline = 'middle';
        ctx.lineWidth = 0.5;
        ctx.font = labelFont.string;
        const { boxWidth , boxHeight , itemHeight  } = getBoxSize(labelOpts, fontSize);
        const drawLegendBox = function(x, y, legendItem) {
            if (isNaN(boxWidth) || boxWidth <= 0 || isNaN(boxHeight) || boxHeight < 0) {
                return;
            }
            ctx.save();
            const lineWidth = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(legendItem.lineWidth, 1);
            ctx.fillStyle = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(legendItem.fillStyle, defaultColor);
            ctx.lineCap = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(legendItem.lineCap, 'butt');
            ctx.lineDashOffset = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(legendItem.lineDashOffset, 0);
            ctx.lineJoin = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(legendItem.lineJoin, 'miter');
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(legendItem.strokeStyle, defaultColor);
            ctx.setLineDash((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(legendItem.lineDash, []));
            if (labelOpts.usePointStyle) {
                const drawOptions = {
                    radius: boxHeight * Math.SQRT2 / 2,
                    pointStyle: legendItem.pointStyle,
                    rotation: legendItem.rotation,
                    borderWidth: lineWidth
                };
                const centerX = rtlHelper.xPlus(x, boxWidth / 2);
                const centerY = y + halfFontSize;
                (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aE)(ctx, drawOptions, centerX, centerY, labelOpts.pointStyleWidth && boxWidth);
            } else {
                const yBoxTop = y + Math.max((fontSize - boxHeight) / 2, 0);
                const xBoxLeft = rtlHelper.leftForLtr(x, boxWidth);
                const borderRadius = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ay)(legendItem.borderRadius);
                ctx.beginPath();
                if (Object.values(borderRadius).some((v)=>v !== 0)) {
                    (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aw)(ctx, {
                        x: xBoxLeft,
                        y: yBoxTop,
                        w: boxWidth,
                        h: boxHeight,
                        radius: borderRadius
                    });
                } else {
                    ctx.rect(xBoxLeft, yBoxTop, boxWidth, boxHeight);
                }
                ctx.fill();
                if (lineWidth !== 0) {
                    ctx.stroke();
                }
            }
            ctx.restore();
        };
        const fillText = function(x, y, legendItem) {
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Z)(ctx, legendItem.text, x, y + itemHeight / 2, labelFont, {
                strikethrough: legendItem.hidden,
                textAlign: rtlHelper.textAlign(legendItem.textAlign)
            });
        };
        const isHorizontal = this.isHorizontal();
        const titleHeight = this._computeTitleHeight();
        if (isHorizontal) {
            cursor = {
                x: (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a2)(align, this.left + padding, this.right - lineWidths[0]),
                y: this.top + padding + titleHeight,
                line: 0
            };
        } else {
            cursor = {
                x: this.left + padding,
                y: (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a2)(align, this.top + titleHeight + padding, this.bottom - columnSizes[0].height),
                line: 0
            };
        }
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aB)(this.ctx, opts.textDirection);
        const lineHeight = itemHeight + padding;
        this.legendItems.forEach((legendItem, i)=>{
            ctx.strokeStyle = legendItem.fontColor;
            ctx.fillStyle = legendItem.fontColor;
            const textWidth = ctx.measureText(legendItem.text).width;
            const textAlign = rtlHelper.textAlign(legendItem.textAlign || (legendItem.textAlign = labelOpts.textAlign));
            const width = boxWidth + halfFontSize + textWidth;
            let x = cursor.x;
            let y = cursor.y;
            rtlHelper.setWidth(this.width);
            if (isHorizontal) {
                if (i > 0 && x + width + padding > this.right) {
                    y = cursor.y += lineHeight;
                    cursor.line++;
                    x = cursor.x = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a2)(align, this.left + padding, this.right - lineWidths[cursor.line]);
                }
            } else if (i > 0 && y + lineHeight > this.bottom) {
                x = cursor.x = x + columnSizes[cursor.line].width + padding;
                cursor.line++;
                y = cursor.y = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a2)(align, this.top + titleHeight + padding, this.bottom - columnSizes[cursor.line].height);
            }
            const realX = rtlHelper.x(x);
            drawLegendBox(realX, y, legendItem);
            x = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aC)(textAlign, x + boxWidth + halfFontSize, isHorizontal ? x + width : this.right, opts.rtl);
            fillText(rtlHelper.x(x), y, legendItem);
            if (isHorizontal) {
                cursor.x += width + padding;
            } else if (typeof legendItem.text !== 'string') {
                const fontLineHeight = labelFont.lineHeight;
                cursor.y += calculateLegendItemHeight(legendItem, fontLineHeight) + padding;
            } else {
                cursor.y += lineHeight;
            }
        });
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aD)(this.ctx, opts.textDirection);
    }
 drawTitle() {
        const opts = this.options;
        const titleOpts = opts.title;
        const titleFont = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a0)(titleOpts.font);
        const titlePadding = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.E)(titleOpts.padding);
        if (!titleOpts.display) {
            return;
        }
        const rtlHelper = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aA)(opts.rtl, this.left, this.width);
        const ctx = this.ctx;
        const position = titleOpts.position;
        const halfFontSize = titleFont.size / 2;
        const topPaddingPlusHalfFontSize = titlePadding.top + halfFontSize;
        let y;
        let left = this.left;
        let maxWidth = this.width;
        if (this.isHorizontal()) {
            maxWidth = Math.max(...this.lineWidths);
            y = this.top + topPaddingPlusHalfFontSize;
            left = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a2)(opts.align, left, this.right - maxWidth);
        } else {
            const maxHeight = this.columnSizes.reduce((acc, size)=>Math.max(acc, size.height), 0);
            y = topPaddingPlusHalfFontSize + (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a2)(opts.align, this.top, this.bottom - maxHeight - opts.labels.padding - this._computeTitleHeight());
        }
        const x = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a2)(position, left, left + maxWidth);
        ctx.textAlign = rtlHelper.textAlign((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a1)(position));
        ctx.textBaseline = 'middle';
        ctx.strokeStyle = titleOpts.color;
        ctx.fillStyle = titleOpts.color;
        ctx.font = titleFont.string;
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Z)(ctx, titleOpts.text, x, y, titleFont);
    }
 _computeTitleHeight() {
        const titleOpts = this.options.title;
        const titleFont = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a0)(titleOpts.font);
        const titlePadding = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.E)(titleOpts.padding);
        return titleOpts.display ? titleFont.lineHeight + titlePadding.height : 0;
    }
 _getLegendItemAt(x, y) {
        let i, hitBox, lh;
        if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ak)(x, this.left, this.right) && (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ak)(y, this.top, this.bottom)) {
            lh = this.legendHitBoxes;
            for(i = 0; i < lh.length; ++i){
                hitBox = lh[i];
                if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ak)(x, hitBox.left, hitBox.left + hitBox.width) && (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ak)(y, hitBox.top, hitBox.top + hitBox.height)) {
                    return this.legendItems[i];
                }
            }
        }
        return null;
    }
 handleEvent(e) {
        const opts = this.options;
        if (!isListened(e.type, opts)) {
            return;
        }
        const hoveredItem = this._getLegendItemAt(e.x, e.y);
        if (e.type === 'mousemove' || e.type === 'mouseout') {
            const previous = this._hoveredItem;
            const sameItem = itemsEqual(previous, hoveredItem);
            if (previous && !sameItem) {
                (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(opts.onLeave, [
                    e,
                    previous,
                    this
                ], this);
            }
            this._hoveredItem = hoveredItem;
            if (hoveredItem && !sameItem) {
                (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(opts.onHover, [
                    e,
                    hoveredItem,
                    this
                ], this);
            }
        } else if (hoveredItem) {
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(opts.onClick, [
                e,
                hoveredItem,
                this
            ], this);
        }
    }
}
function calculateItemSize(boxWidth, labelFont, ctx, legendItem, _itemHeight) {
    const itemWidth = calculateItemWidth(legendItem, boxWidth, labelFont, ctx);
    const itemHeight = calculateItemHeight(_itemHeight, legendItem, labelFont.lineHeight);
    return {
        itemWidth,
        itemHeight
    };
}
function calculateItemWidth(legendItem, boxWidth, labelFont, ctx) {
    let legendItemText = legendItem.text;
    if (legendItemText && typeof legendItemText !== 'string') {
        legendItemText = legendItemText.reduce((a, b)=>a.length > b.length ? a : b);
    }
    return boxWidth + labelFont.size / 2 + ctx.measureText(legendItemText).width;
}
function calculateItemHeight(_itemHeight, legendItem, fontLineHeight) {
    let itemHeight = _itemHeight;
    if (typeof legendItem.text !== 'string') {
        itemHeight = calculateLegendItemHeight(legendItem, fontLineHeight);
    }
    return itemHeight;
}
function calculateLegendItemHeight(legendItem, fontLineHeight) {
    const labelHeight = legendItem.text ? legendItem.text.length : 0;
    return fontLineHeight * labelHeight;
}
function isListened(type, opts) {
    if ((type === 'mousemove' || type === 'mouseout') && (opts.onHover || opts.onLeave)) {
        return true;
    }
    if (opts.onClick && (type === 'click' || type === 'mouseup')) {
        return true;
    }
    return false;
}
var plugin_legend = {
    id: 'legend',
 _element: Legend,
    start (chart, _args, options) {
        const legend = chart.legend = new Legend({
            ctx: chart.ctx,
            options,
            chart
        });
        layouts.configure(chart, legend, options);
        layouts.addBox(chart, legend);
    },
    stop (chart) {
        layouts.removeBox(chart, chart.legend);
        delete chart.legend;
    },
    beforeUpdate (chart, _args, options) {
        const legend = chart.legend;
        layouts.configure(chart, legend, options);
        legend.options = options;
    },
    afterUpdate (chart) {
        const legend = chart.legend;
        legend.buildLabels();
        legend.adjustHitBoxes();
    },
    afterEvent (chart, args) {
        if (!args.replay) {
            chart.legend.handleEvent(args.event);
        }
    },
    defaults: {
        display: true,
        position: 'top',
        align: 'center',
        fullSize: true,
        reverse: false,
        weight: 1000,
        onClick (e, legendItem, legend) {
            const index = legendItem.datasetIndex;
            const ci = legend.chart;
            if (ci.isDatasetVisible(index)) {
                ci.hide(index);
                legendItem.hidden = true;
            } else {
                ci.show(index);
                legendItem.hidden = false;
            }
        },
        onHover: null,
        onLeave: null,
        labels: {
            color: (ctx)=>ctx.chart.options.color,
            boxWidth: 40,
            padding: 10,
            generateLabels (chart) {
                const datasets = chart.data.datasets;
                const { labels: { usePointStyle , pointStyle , textAlign , color , useBorderRadius , borderRadius  }  } = chart.legend.options;
                return chart._getSortedDatasetMetas().map((meta)=>{
                    const style = meta.controller.getStyle(usePointStyle ? 0 : undefined);
                    const borderWidth = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.E)(style.borderWidth);
                    return {
                        text: datasets[meta.index].label,
                        fillStyle: style.backgroundColor,
                        fontColor: color,
                        hidden: !meta.visible,
                        lineCap: style.borderCapStyle,
                        lineDash: style.borderDash,
                        lineDashOffset: style.borderDashOffset,
                        lineJoin: style.borderJoinStyle,
                        lineWidth: (borderWidth.width + borderWidth.height) / 4,
                        strokeStyle: style.borderColor,
                        pointStyle: pointStyle || style.pointStyle,
                        rotation: style.rotation,
                        textAlign: textAlign || style.textAlign,
                        borderRadius: useBorderRadius && (borderRadius || style.borderRadius),
                        datasetIndex: meta.index
                    };
                }, this);
            }
        },
        title: {
            color: (ctx)=>ctx.chart.options.color,
            display: false,
            position: 'center',
            text: ''
        }
    },
    descriptors: {
        _scriptable: (name)=>!name.startsWith('on'),
        labels: {
            _scriptable: (name)=>![
                    'generateLabels',
                    'filter',
                    'sort'
                ].includes(name)
        }
    }
};

class Title extends Element {
 constructor(config){
        super();
        this.chart = config.chart;
        this.options = config.options;
        this.ctx = config.ctx;
        this._padding = undefined;
        this.top = undefined;
        this.bottom = undefined;
        this.left = undefined;
        this.right = undefined;
        this.width = undefined;
        this.height = undefined;
        this.position = undefined;
        this.weight = undefined;
        this.fullSize = undefined;
    }
    update(maxWidth, maxHeight) {
        const opts = this.options;
        this.left = 0;
        this.top = 0;
        if (!opts.display) {
            this.width = this.height = this.right = this.bottom = 0;
            return;
        }
        this.width = this.right = maxWidth;
        this.height = this.bottom = maxHeight;
        const lineCount = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.b)(opts.text) ? opts.text.length : 1;
        this._padding = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.E)(opts.padding);
        const textSize = lineCount * (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a0)(opts.font).lineHeight + this._padding.height;
        if (this.isHorizontal()) {
            this.height = textSize;
        } else {
            this.width = textSize;
        }
    }
    isHorizontal() {
        const pos = this.options.position;
        return pos === 'top' || pos === 'bottom';
    }
    _drawArgs(offset) {
        const { top , left , bottom , right , options  } = this;
        const align = options.align;
        let rotation = 0;
        let maxWidth, titleX, titleY;
        if (this.isHorizontal()) {
            titleX = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a2)(align, left, right);
            titleY = top + offset;
            maxWidth = right - left;
        } else {
            if (options.position === 'left') {
                titleX = left + offset;
                titleY = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a2)(align, bottom, top);
                rotation = _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.P * -0.5;
            } else {
                titleX = right - offset;
                titleY = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a2)(align, top, bottom);
                rotation = _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.P * 0.5;
            }
            maxWidth = bottom - top;
        }
        return {
            titleX,
            titleY,
            maxWidth,
            rotation
        };
    }
    draw() {
        const ctx = this.ctx;
        const opts = this.options;
        if (!opts.display) {
            return;
        }
        const fontOpts = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a0)(opts.font);
        const lineHeight = fontOpts.lineHeight;
        const offset = lineHeight / 2 + this._padding.top;
        const { titleX , titleY , maxWidth , rotation  } = this._drawArgs(offset);
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Z)(ctx, opts.text, 0, 0, fontOpts, {
            color: opts.color,
            maxWidth,
            rotation,
            textAlign: (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a1)(opts.align),
            textBaseline: 'middle',
            translation: [
                titleX,
                titleY
            ]
        });
    }
}
function createTitle(chart, titleOpts) {
    const title = new Title({
        ctx: chart.ctx,
        options: titleOpts,
        chart
    });
    layouts.configure(chart, title, titleOpts);
    layouts.addBox(chart, title);
    chart.titleBlock = title;
}
var plugin_title = {
    id: 'title',
 _element: Title,
    start (chart, _args, options) {
        createTitle(chart, options);
    },
    stop (chart) {
        const titleBlock = chart.titleBlock;
        layouts.removeBox(chart, titleBlock);
        delete chart.titleBlock;
    },
    beforeUpdate (chart, _args, options) {
        const title = chart.titleBlock;
        layouts.configure(chart, title, options);
        title.options = options;
    },
    defaults: {
        align: 'center',
        display: false,
        font: {
            weight: 'bold'
        },
        fullSize: true,
        padding: 10,
        position: 'top',
        text: '',
        weight: 2000
    },
    defaultRoutes: {
        color: 'color'
    },
    descriptors: {
        _scriptable: true,
        _indexable: false
    }
};

const map = new WeakMap();
var plugin_subtitle = {
    id: 'subtitle',
    start (chart, _args, options) {
        const title = new Title({
            ctx: chart.ctx,
            options,
            chart
        });
        layouts.configure(chart, title, options);
        layouts.addBox(chart, title);
        map.set(chart, title);
    },
    stop (chart) {
        layouts.removeBox(chart, map.get(chart));
        map.delete(chart);
    },
    beforeUpdate (chart, _args, options) {
        const title = map.get(chart);
        layouts.configure(chart, title, options);
        title.options = options;
    },
    defaults: {
        align: 'center',
        display: false,
        font: {
            weight: 'normal'
        },
        fullSize: true,
        padding: 0,
        position: 'top',
        text: '',
        weight: 1500
    },
    defaultRoutes: {
        color: 'color'
    },
    descriptors: {
        _scriptable: true,
        _indexable: false
    }
};

const positioners = {
 average (items) {
        if (!items.length) {
            return false;
        }
        let i, len;
        let xSet = new Set();
        let y = 0;
        let count = 0;
        for(i = 0, len = items.length; i < len; ++i){
            const el = items[i].element;
            if (el && el.hasValue()) {
                const pos = el.tooltipPosition();
                xSet.add(pos.x);
                y += pos.y;
                ++count;
            }
        }
        if (count === 0 || xSet.size === 0) {
            return false;
        }
        const xAverage = [
            ...xSet
        ].reduce((a, b)=>a + b) / xSet.size;
        return {
            x: xAverage,
            y: y / count
        };
    },
 nearest (items, eventPosition) {
        if (!items.length) {
            return false;
        }
        let x = eventPosition.x;
        let y = eventPosition.y;
        let minDistance = Number.POSITIVE_INFINITY;
        let i, len, nearestElement;
        for(i = 0, len = items.length; i < len; ++i){
            const el = items[i].element;
            if (el && el.hasValue()) {
                const center = el.getCenterPoint();
                const d = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aF)(eventPosition, center);
                if (d < minDistance) {
                    minDistance = d;
                    nearestElement = el;
                }
            }
        }
        if (nearestElement) {
            const tp = nearestElement.tooltipPosition();
            x = tp.x;
            y = tp.y;
        }
        return {
            x,
            y
        };
    }
};
function pushOrConcat(base, toPush) {
    if (toPush) {
        if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.b)(toPush)) {
            Array.prototype.push.apply(base, toPush);
        } else {
            base.push(toPush);
        }
    }
    return base;
}
 function splitNewlines(str) {
    if ((typeof str === 'string' || str instanceof String) && str.indexOf('\n') > -1) {
        return str.split('\n');
    }
    return str;
}
 function createTooltipItem(chart, item) {
    const { element , datasetIndex , index  } = item;
    const controller = chart.getDatasetMeta(datasetIndex).controller;
    const { label , value  } = controller.getLabelAndValue(index);
    return {
        chart,
        label,
        parsed: controller.getParsed(index),
        raw: chart.data.datasets[datasetIndex].data[index],
        formattedValue: value,
        dataset: controller.getDataset(),
        dataIndex: index,
        datasetIndex,
        element
    };
}
 function getTooltipSize(tooltip, options) {
    const ctx = tooltip.chart.ctx;
    const { body , footer , title  } = tooltip;
    const { boxWidth , boxHeight  } = options;
    const bodyFont = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a0)(options.bodyFont);
    const titleFont = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a0)(options.titleFont);
    const footerFont = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a0)(options.footerFont);
    const titleLineCount = title.length;
    const footerLineCount = footer.length;
    const bodyLineItemCount = body.length;
    const padding = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.E)(options.padding);
    let height = padding.height;
    let width = 0;
    let combinedBodyLength = body.reduce((count, bodyItem)=>count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length, 0);
    combinedBodyLength += tooltip.beforeBody.length + tooltip.afterBody.length;
    if (titleLineCount) {
        height += titleLineCount * titleFont.lineHeight + (titleLineCount - 1) * options.titleSpacing + options.titleMarginBottom;
    }
    if (combinedBodyLength) {
        const bodyLineHeight = options.displayColors ? Math.max(boxHeight, bodyFont.lineHeight) : bodyFont.lineHeight;
        height += bodyLineItemCount * bodyLineHeight + (combinedBodyLength - bodyLineItemCount) * bodyFont.lineHeight + (combinedBodyLength - 1) * options.bodySpacing;
    }
    if (footerLineCount) {
        height += options.footerMarginTop + footerLineCount * footerFont.lineHeight + (footerLineCount - 1) * options.footerSpacing;
    }
    let widthPadding = 0;
    const maxLineWidth = function(line) {
        width = Math.max(width, ctx.measureText(line).width + widthPadding);
    };
    ctx.save();
    ctx.font = titleFont.string;
    (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(tooltip.title, maxLineWidth);
    ctx.font = bodyFont.string;
    (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(tooltip.beforeBody.concat(tooltip.afterBody), maxLineWidth);
    widthPadding = options.displayColors ? boxWidth + 2 + options.boxPadding : 0;
    (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(body, (bodyItem)=>{
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(bodyItem.before, maxLineWidth);
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(bodyItem.lines, maxLineWidth);
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(bodyItem.after, maxLineWidth);
    });
    widthPadding = 0;
    ctx.font = footerFont.string;
    (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(tooltip.footer, maxLineWidth);
    ctx.restore();
    width += padding.width;
    return {
        width,
        height
    };
}
function determineYAlign(chart, size) {
    const { y , height  } = size;
    if (y < height / 2) {
        return 'top';
    } else if (y > chart.height - height / 2) {
        return 'bottom';
    }
    return 'center';
}
function doesNotFitWithAlign(xAlign, chart, options, size) {
    const { x , width  } = size;
    const caret = options.caretSize + options.caretPadding;
    if (xAlign === 'left' && x + width + caret > chart.width) {
        return true;
    }
    if (xAlign === 'right' && x - width - caret < 0) {
        return true;
    }
}
function determineXAlign(chart, options, size, yAlign) {
    const { x , width  } = size;
    const { width: chartWidth , chartArea: { left , right  }  } = chart;
    let xAlign = 'center';
    if (yAlign === 'center') {
        xAlign = x <= (left + right) / 2 ? 'left' : 'right';
    } else if (x <= width / 2) {
        xAlign = 'left';
    } else if (x >= chartWidth - width / 2) {
        xAlign = 'right';
    }
    if (doesNotFitWithAlign(xAlign, chart, options, size)) {
        xAlign = 'center';
    }
    return xAlign;
}
 function determineAlignment(chart, options, size) {
    const yAlign = size.yAlign || options.yAlign || determineYAlign(chart, size);
    return {
        xAlign: size.xAlign || options.xAlign || determineXAlign(chart, options, size, yAlign),
        yAlign
    };
}
function alignX(size, xAlign) {
    let { x , width  } = size;
    if (xAlign === 'right') {
        x -= width;
    } else if (xAlign === 'center') {
        x -= width / 2;
    }
    return x;
}
function alignY(size, yAlign, paddingAndSize) {
    let { y , height  } = size;
    if (yAlign === 'top') {
        y += paddingAndSize;
    } else if (yAlign === 'bottom') {
        y -= height + paddingAndSize;
    } else {
        y -= height / 2;
    }
    return y;
}
 function getBackgroundPoint(options, size, alignment, chart) {
    const { caretSize , caretPadding , cornerRadius  } = options;
    const { xAlign , yAlign  } = alignment;
    const paddingAndSize = caretSize + caretPadding;
    const { topLeft , topRight , bottomLeft , bottomRight  } = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ay)(cornerRadius);
    let x = alignX(size, xAlign);
    const y = alignY(size, yAlign, paddingAndSize);
    if (yAlign === 'center') {
        if (xAlign === 'left') {
            x += paddingAndSize;
        } else if (xAlign === 'right') {
            x -= paddingAndSize;
        }
    } else if (xAlign === 'left') {
        x -= Math.max(topLeft, bottomLeft) + caretSize;
    } else if (xAlign === 'right') {
        x += Math.max(topRight, bottomRight) + caretSize;
    }
    return {
        x: (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.S)(x, 0, chart.width - size.width),
        y: (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.S)(y, 0, chart.height - size.height)
    };
}
function getAlignedX(tooltip, align, options) {
    const padding = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.E)(options.padding);
    return align === 'center' ? tooltip.x + tooltip.width / 2 : align === 'right' ? tooltip.x + tooltip.width - padding.right : tooltip.x + padding.left;
}
 function getBeforeAfterBodyLines(callback) {
    return pushOrConcat([], splitNewlines(callback));
}
function createTooltipContext(parent, tooltip, tooltipItems) {
    return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.j)(parent, {
        tooltip,
        tooltipItems,
        type: 'tooltip'
    });
}
function overrideCallbacks(callbacks, context) {
    const override = context && context.dataset && context.dataset.tooltip && context.dataset.tooltip.callbacks;
    return override ? callbacks.override(override) : callbacks;
}
const defaultCallbacks = {
    beforeTitle: _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aG,
    title (tooltipItems) {
        if (tooltipItems.length > 0) {
            const item = tooltipItems[0];
            const labels = item.chart.data.labels;
            const labelCount = labels ? labels.length : 0;
            if (this && this.options && this.options.mode === 'dataset') {
                return item.dataset.label || '';
            } else if (item.label) {
                return item.label;
            } else if (labelCount > 0 && item.dataIndex < labelCount) {
                return labels[item.dataIndex];
            }
        }
        return '';
    },
    afterTitle: _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aG,
    beforeBody: _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aG,
    beforeLabel: _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aG,
    label (tooltipItem) {
        if (this && this.options && this.options.mode === 'dataset') {
            return tooltipItem.label + ': ' + tooltipItem.formattedValue || tooltipItem.formattedValue;
        }
        let label = tooltipItem.dataset.label || '';
        if (label) {
            label += ': ';
        }
        const value = tooltipItem.formattedValue;
        if (!(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(value)) {
            label += value;
        }
        return label;
    },
    labelColor (tooltipItem) {
        const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
        const options = meta.controller.getStyle(tooltipItem.dataIndex);
        return {
            borderColor: options.borderColor,
            backgroundColor: options.backgroundColor,
            borderWidth: options.borderWidth,
            borderDash: options.borderDash,
            borderDashOffset: options.borderDashOffset,
            borderRadius: 0
        };
    },
    labelTextColor () {
        return this.options.bodyColor;
    },
    labelPointStyle (tooltipItem) {
        const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
        const options = meta.controller.getStyle(tooltipItem.dataIndex);
        return {
            pointStyle: options.pointStyle,
            rotation: options.rotation
        };
    },
    afterLabel: _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aG,
    afterBody: _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aG,
    beforeFooter: _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aG,
    footer: _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aG,
    afterFooter: _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aG
};
 function invokeCallbackWithFallback(callbacks, name, ctx, arg) {
    const result = callbacks[name].call(ctx, arg);
    if (typeof result === 'undefined') {
        return defaultCallbacks[name].call(ctx, arg);
    }
    return result;
}
class Tooltip extends Element {
 static positioners = positioners;
    constructor(config){
        super();
        this.opacity = 0;
        this._active = [];
        this._eventPosition = undefined;
        this._size = undefined;
        this._cachedAnimations = undefined;
        this._tooltipItems = [];
        this.$animations = undefined;
        this.$context = undefined;
        this.chart = config.chart;
        this.options = config.options;
        this.dataPoints = undefined;
        this.title = undefined;
        this.beforeBody = undefined;
        this.body = undefined;
        this.afterBody = undefined;
        this.footer = undefined;
        this.xAlign = undefined;
        this.yAlign = undefined;
        this.x = undefined;
        this.y = undefined;
        this.height = undefined;
        this.width = undefined;
        this.caretX = undefined;
        this.caretY = undefined;
        this.labelColors = undefined;
        this.labelPointStyles = undefined;
        this.labelTextColors = undefined;
    }
    initialize(options) {
        this.options = options;
        this._cachedAnimations = undefined;
        this.$context = undefined;
    }
 _resolveAnimations() {
        const cached = this._cachedAnimations;
        if (cached) {
            return cached;
        }
        const chart = this.chart;
        const options = this.options.setContext(this.getContext());
        const opts = options.enabled && chart.options.animation && options.animations;
        const animations = new Animations(this.chart, opts);
        if (opts._cacheable) {
            this._cachedAnimations = Object.freeze(animations);
        }
        return animations;
    }
 getContext() {
        return this.$context || (this.$context = createTooltipContext(this.chart.getContext(), this, this._tooltipItems));
    }
    getTitle(context, options) {
        const { callbacks  } = options;
        const beforeTitle = invokeCallbackWithFallback(callbacks, 'beforeTitle', this, context);
        const title = invokeCallbackWithFallback(callbacks, 'title', this, context);
        const afterTitle = invokeCallbackWithFallback(callbacks, 'afterTitle', this, context);
        let lines = [];
        lines = pushOrConcat(lines, splitNewlines(beforeTitle));
        lines = pushOrConcat(lines, splitNewlines(title));
        lines = pushOrConcat(lines, splitNewlines(afterTitle));
        return lines;
    }
    getBeforeBody(tooltipItems, options) {
        return getBeforeAfterBodyLines(invokeCallbackWithFallback(options.callbacks, 'beforeBody', this, tooltipItems));
    }
    getBody(tooltipItems, options) {
        const { callbacks  } = options;
        const bodyItems = [];
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(tooltipItems, (context)=>{
            const bodyItem = {
                before: [],
                lines: [],
                after: []
            };
            const scoped = overrideCallbacks(callbacks, context);
            pushOrConcat(bodyItem.before, splitNewlines(invokeCallbackWithFallback(scoped, 'beforeLabel', this, context)));
            pushOrConcat(bodyItem.lines, invokeCallbackWithFallback(scoped, 'label', this, context));
            pushOrConcat(bodyItem.after, splitNewlines(invokeCallbackWithFallback(scoped, 'afterLabel', this, context)));
            bodyItems.push(bodyItem);
        });
        return bodyItems;
    }
    getAfterBody(tooltipItems, options) {
        return getBeforeAfterBodyLines(invokeCallbackWithFallback(options.callbacks, 'afterBody', this, tooltipItems));
    }
    getFooter(tooltipItems, options) {
        const { callbacks  } = options;
        const beforeFooter = invokeCallbackWithFallback(callbacks, 'beforeFooter', this, tooltipItems);
        const footer = invokeCallbackWithFallback(callbacks, 'footer', this, tooltipItems);
        const afterFooter = invokeCallbackWithFallback(callbacks, 'afterFooter', this, tooltipItems);
        let lines = [];
        lines = pushOrConcat(lines, splitNewlines(beforeFooter));
        lines = pushOrConcat(lines, splitNewlines(footer));
        lines = pushOrConcat(lines, splitNewlines(afterFooter));
        return lines;
    }
 _createItems(options) {
        const active = this._active;
        const data = this.chart.data;
        const labelColors = [];
        const labelPointStyles = [];
        const labelTextColors = [];
        let tooltipItems = [];
        let i, len;
        for(i = 0, len = active.length; i < len; ++i){
            tooltipItems.push(createTooltipItem(this.chart, active[i]));
        }
        if (options.filter) {
            tooltipItems = tooltipItems.filter((element, index, array)=>options.filter(element, index, array, data));
        }
        if (options.itemSort) {
            tooltipItems = tooltipItems.sort((a, b)=>options.itemSort(a, b, data));
        }
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(tooltipItems, (context)=>{
            const scoped = overrideCallbacks(options.callbacks, context);
            labelColors.push(invokeCallbackWithFallback(scoped, 'labelColor', this, context));
            labelPointStyles.push(invokeCallbackWithFallback(scoped, 'labelPointStyle', this, context));
            labelTextColors.push(invokeCallbackWithFallback(scoped, 'labelTextColor', this, context));
        });
        this.labelColors = labelColors;
        this.labelPointStyles = labelPointStyles;
        this.labelTextColors = labelTextColors;
        this.dataPoints = tooltipItems;
        return tooltipItems;
    }
    update(changed, replay) {
        const options = this.options.setContext(this.getContext());
        const active = this._active;
        let properties;
        let tooltipItems = [];
        if (!active.length) {
            if (this.opacity !== 0) {
                properties = {
                    opacity: 0
                };
            }
        } else {
            const position = positioners[options.position].call(this, active, this._eventPosition);
            tooltipItems = this._createItems(options);
            this.title = this.getTitle(tooltipItems, options);
            this.beforeBody = this.getBeforeBody(tooltipItems, options);
            this.body = this.getBody(tooltipItems, options);
            this.afterBody = this.getAfterBody(tooltipItems, options);
            this.footer = this.getFooter(tooltipItems, options);
            const size = this._size = getTooltipSize(this, options);
            const positionAndSize = Object.assign({}, position, size);
            const alignment = determineAlignment(this.chart, options, positionAndSize);
            const backgroundPoint = getBackgroundPoint(options, positionAndSize, alignment, this.chart);
            this.xAlign = alignment.xAlign;
            this.yAlign = alignment.yAlign;
            properties = {
                opacity: 1,
                x: backgroundPoint.x,
                y: backgroundPoint.y,
                width: size.width,
                height: size.height,
                caretX: position.x,
                caretY: position.y
            };
        }
        this._tooltipItems = tooltipItems;
        this.$context = undefined;
        if (properties) {
            this._resolveAnimations().update(this, properties);
        }
        if (changed && options.external) {
            options.external.call(this, {
                chart: this.chart,
                tooltip: this,
                replay
            });
        }
    }
    drawCaret(tooltipPoint, ctx, size, options) {
        const caretPosition = this.getCaretPosition(tooltipPoint, size, options);
        ctx.lineTo(caretPosition.x1, caretPosition.y1);
        ctx.lineTo(caretPosition.x2, caretPosition.y2);
        ctx.lineTo(caretPosition.x3, caretPosition.y3);
    }
    getCaretPosition(tooltipPoint, size, options) {
        const { xAlign , yAlign  } = this;
        const { caretSize , cornerRadius  } = options;
        const { topLeft , topRight , bottomLeft , bottomRight  } = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ay)(cornerRadius);
        const { x: ptX , y: ptY  } = tooltipPoint;
        const { width , height  } = size;
        let x1, x2, x3, y1, y2, y3;
        if (yAlign === 'center') {
            y2 = ptY + height / 2;
            if (xAlign === 'left') {
                x1 = ptX;
                x2 = x1 - caretSize;
                y1 = y2 + caretSize;
                y3 = y2 - caretSize;
            } else {
                x1 = ptX + width;
                x2 = x1 + caretSize;
                y1 = y2 - caretSize;
                y3 = y2 + caretSize;
            }
            x3 = x1;
        } else {
            if (xAlign === 'left') {
                x2 = ptX + Math.max(topLeft, bottomLeft) + caretSize;
            } else if (xAlign === 'right') {
                x2 = ptX + width - Math.max(topRight, bottomRight) - caretSize;
            } else {
                x2 = this.caretX;
            }
            if (yAlign === 'top') {
                y1 = ptY;
                y2 = y1 - caretSize;
                x1 = x2 - caretSize;
                x3 = x2 + caretSize;
            } else {
                y1 = ptY + height;
                y2 = y1 + caretSize;
                x1 = x2 + caretSize;
                x3 = x2 - caretSize;
            }
            y3 = y1;
        }
        return {
            x1,
            x2,
            x3,
            y1,
            y2,
            y3
        };
    }
    drawTitle(pt, ctx, options) {
        const title = this.title;
        const length = title.length;
        let titleFont, titleSpacing, i;
        if (length) {
            const rtlHelper = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aA)(options.rtl, this.x, this.width);
            pt.x = getAlignedX(this, options.titleAlign, options);
            ctx.textAlign = rtlHelper.textAlign(options.titleAlign);
            ctx.textBaseline = 'middle';
            titleFont = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a0)(options.titleFont);
            titleSpacing = options.titleSpacing;
            ctx.fillStyle = options.titleColor;
            ctx.font = titleFont.string;
            for(i = 0; i < length; ++i){
                ctx.fillText(title[i], rtlHelper.x(pt.x), pt.y + titleFont.lineHeight / 2);
                pt.y += titleFont.lineHeight + titleSpacing;
                if (i + 1 === length) {
                    pt.y += options.titleMarginBottom - titleSpacing;
                }
            }
        }
    }
 _drawColorBox(ctx, pt, i, rtlHelper, options) {
        const labelColor = this.labelColors[i];
        const labelPointStyle = this.labelPointStyles[i];
        const { boxHeight , boxWidth  } = options;
        const bodyFont = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a0)(options.bodyFont);
        const colorX = getAlignedX(this, 'left', options);
        const rtlColorX = rtlHelper.x(colorX);
        const yOffSet = boxHeight < bodyFont.lineHeight ? (bodyFont.lineHeight - boxHeight) / 2 : 0;
        const colorY = pt.y + yOffSet;
        if (options.usePointStyle) {
            const drawOptions = {
                radius: Math.min(boxWidth, boxHeight) / 2,
                pointStyle: labelPointStyle.pointStyle,
                rotation: labelPointStyle.rotation,
                borderWidth: 1
            };
            const centerX = rtlHelper.leftForLtr(rtlColorX, boxWidth) + boxWidth / 2;
            const centerY = colorY + boxHeight / 2;
            ctx.strokeStyle = options.multiKeyBackground;
            ctx.fillStyle = options.multiKeyBackground;
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.av)(ctx, drawOptions, centerX, centerY);
            ctx.strokeStyle = labelColor.borderColor;
            ctx.fillStyle = labelColor.backgroundColor;
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.av)(ctx, drawOptions, centerX, centerY);
        } else {
            ctx.lineWidth = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.i)(labelColor.borderWidth) ? Math.max(...Object.values(labelColor.borderWidth)) : labelColor.borderWidth || 1;
            ctx.strokeStyle = labelColor.borderColor;
            ctx.setLineDash(labelColor.borderDash || []);
            ctx.lineDashOffset = labelColor.borderDashOffset || 0;
            const outerX = rtlHelper.leftForLtr(rtlColorX, boxWidth);
            const innerX = rtlHelper.leftForLtr(rtlHelper.xPlus(rtlColorX, 1), boxWidth - 2);
            const borderRadius = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ay)(labelColor.borderRadius);
            if (Object.values(borderRadius).some((v)=>v !== 0)) {
                ctx.beginPath();
                ctx.fillStyle = options.multiKeyBackground;
                (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aw)(ctx, {
                    x: outerX,
                    y: colorY,
                    w: boxWidth,
                    h: boxHeight,
                    radius: borderRadius
                });
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = labelColor.backgroundColor;
                ctx.beginPath();
                (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aw)(ctx, {
                    x: innerX,
                    y: colorY + 1,
                    w: boxWidth - 2,
                    h: boxHeight - 2,
                    radius: borderRadius
                });
                ctx.fill();
            } else {
                ctx.fillStyle = options.multiKeyBackground;
                ctx.fillRect(outerX, colorY, boxWidth, boxHeight);
                ctx.strokeRect(outerX, colorY, boxWidth, boxHeight);
                ctx.fillStyle = labelColor.backgroundColor;
                ctx.fillRect(innerX, colorY + 1, boxWidth - 2, boxHeight - 2);
            }
        }
        ctx.fillStyle = this.labelTextColors[i];
    }
    drawBody(pt, ctx, options) {
        const { body  } = this;
        const { bodySpacing , bodyAlign , displayColors , boxHeight , boxWidth , boxPadding  } = options;
        const bodyFont = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a0)(options.bodyFont);
        let bodyLineHeight = bodyFont.lineHeight;
        let xLinePadding = 0;
        const rtlHelper = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aA)(options.rtl, this.x, this.width);
        const fillLineOfText = function(line) {
            ctx.fillText(line, rtlHelper.x(pt.x + xLinePadding), pt.y + bodyLineHeight / 2);
            pt.y += bodyLineHeight + bodySpacing;
        };
        const bodyAlignForCalculation = rtlHelper.textAlign(bodyAlign);
        let bodyItem, textColor, lines, i, j, ilen, jlen;
        ctx.textAlign = bodyAlign;
        ctx.textBaseline = 'middle';
        ctx.font = bodyFont.string;
        pt.x = getAlignedX(this, bodyAlignForCalculation, options);
        ctx.fillStyle = options.bodyColor;
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(this.beforeBody, fillLineOfText);
        xLinePadding = displayColors && bodyAlignForCalculation !== 'right' ? bodyAlign === 'center' ? boxWidth / 2 + boxPadding : boxWidth + 2 + boxPadding : 0;
        for(i = 0, ilen = body.length; i < ilen; ++i){
            bodyItem = body[i];
            textColor = this.labelTextColors[i];
            ctx.fillStyle = textColor;
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(bodyItem.before, fillLineOfText);
            lines = bodyItem.lines;
            if (displayColors && lines.length) {
                this._drawColorBox(ctx, pt, i, rtlHelper, options);
                bodyLineHeight = Math.max(bodyFont.lineHeight, boxHeight);
            }
            for(j = 0, jlen = lines.length; j < jlen; ++j){
                fillLineOfText(lines[j]);
                bodyLineHeight = bodyFont.lineHeight;
            }
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(bodyItem.after, fillLineOfText);
        }
        xLinePadding = 0;
        bodyLineHeight = bodyFont.lineHeight;
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F)(this.afterBody, fillLineOfText);
        pt.y -= bodySpacing;
    }
    drawFooter(pt, ctx, options) {
        const footer = this.footer;
        const length = footer.length;
        let footerFont, i;
        if (length) {
            const rtlHelper = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aA)(options.rtl, this.x, this.width);
            pt.x = getAlignedX(this, options.footerAlign, options);
            pt.y += options.footerMarginTop;
            ctx.textAlign = rtlHelper.textAlign(options.footerAlign);
            ctx.textBaseline = 'middle';
            footerFont = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a0)(options.footerFont);
            ctx.fillStyle = options.footerColor;
            ctx.font = footerFont.string;
            for(i = 0; i < length; ++i){
                ctx.fillText(footer[i], rtlHelper.x(pt.x), pt.y + footerFont.lineHeight / 2);
                pt.y += footerFont.lineHeight + options.footerSpacing;
            }
        }
    }
    drawBackground(pt, ctx, tooltipSize, options) {
        const { xAlign , yAlign  } = this;
        const { x , y  } = pt;
        const { width , height  } = tooltipSize;
        const { topLeft , topRight , bottomLeft , bottomRight  } = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ay)(options.cornerRadius);
        ctx.fillStyle = options.backgroundColor;
        ctx.strokeStyle = options.borderColor;
        ctx.lineWidth = options.borderWidth;
        ctx.beginPath();
        ctx.moveTo(x + topLeft, y);
        if (yAlign === 'top') {
            this.drawCaret(pt, ctx, tooltipSize, options);
        }
        ctx.lineTo(x + width - topRight, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + topRight);
        if (yAlign === 'center' && xAlign === 'right') {
            this.drawCaret(pt, ctx, tooltipSize, options);
        }
        ctx.lineTo(x + width, y + height - bottomRight);
        ctx.quadraticCurveTo(x + width, y + height, x + width - bottomRight, y + height);
        if (yAlign === 'bottom') {
            this.drawCaret(pt, ctx, tooltipSize, options);
        }
        ctx.lineTo(x + bottomLeft, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - bottomLeft);
        if (yAlign === 'center' && xAlign === 'left') {
            this.drawCaret(pt, ctx, tooltipSize, options);
        }
        ctx.lineTo(x, y + topLeft);
        ctx.quadraticCurveTo(x, y, x + topLeft, y);
        ctx.closePath();
        ctx.fill();
        if (options.borderWidth > 0) {
            ctx.stroke();
        }
    }
 _updateAnimationTarget(options) {
        const chart = this.chart;
        const anims = this.$animations;
        const animX = anims && anims.x;
        const animY = anims && anims.y;
        if (animX || animY) {
            const position = positioners[options.position].call(this, this._active, this._eventPosition);
            if (!position) {
                return;
            }
            const size = this._size = getTooltipSize(this, options);
            const positionAndSize = Object.assign({}, position, this._size);
            const alignment = determineAlignment(chart, options, positionAndSize);
            const point = getBackgroundPoint(options, positionAndSize, alignment, chart);
            if (animX._to !== point.x || animY._to !== point.y) {
                this.xAlign = alignment.xAlign;
                this.yAlign = alignment.yAlign;
                this.width = size.width;
                this.height = size.height;
                this.caretX = position.x;
                this.caretY = position.y;
                this._resolveAnimations().update(this, point);
            }
        }
    }
 _willRender() {
        return !!this.opacity;
    }
    draw(ctx) {
        const options = this.options.setContext(this.getContext());
        let opacity = this.opacity;
        if (!opacity) {
            return;
        }
        this._updateAnimationTarget(options);
        const tooltipSize = {
            width: this.width,
            height: this.height
        };
        const pt = {
            x: this.x,
            y: this.y
        };
        opacity = Math.abs(opacity) < 1e-3 ? 0 : opacity;
        const padding = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.E)(options.padding);
        const hasTooltipContent = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
        if (options.enabled && hasTooltipContent) {
            ctx.save();
            ctx.globalAlpha = opacity;
            this.drawBackground(pt, ctx, tooltipSize, options);
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aB)(ctx, options.textDirection);
            pt.y += padding.top;
            this.drawTitle(pt, ctx, options);
            this.drawBody(pt, ctx, options);
            this.drawFooter(pt, ctx, options);
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aD)(ctx, options.textDirection);
            ctx.restore();
        }
    }
 getActiveElements() {
        return this._active || [];
    }
 setActiveElements(activeElements, eventPosition) {
        const lastActive = this._active;
        const active = activeElements.map(({ datasetIndex , index  })=>{
            const meta = this.chart.getDatasetMeta(datasetIndex);
            if (!meta) {
                throw new Error('Cannot find a dataset at index ' + datasetIndex);
            }
            return {
                datasetIndex,
                element: meta.data[index],
                index
            };
        });
        const changed = !(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ai)(lastActive, active);
        const positionChanged = this._positionChanged(active, eventPosition);
        if (changed || positionChanged) {
            this._active = active;
            this._eventPosition = eventPosition;
            this._ignoreReplayEvents = true;
            this.update(true);
        }
    }
 handleEvent(e, replay, inChartArea = true) {
        if (replay && this._ignoreReplayEvents) {
            return false;
        }
        this._ignoreReplayEvents = false;
        const options = this.options;
        const lastActive = this._active || [];
        const active = this._getActiveElements(e, lastActive, replay, inChartArea);
        const positionChanged = this._positionChanged(active, e);
        const changed = replay || !(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ai)(active, lastActive) || positionChanged;
        if (changed) {
            this._active = active;
            if (options.enabled || options.external) {
                this._eventPosition = {
                    x: e.x,
                    y: e.y
                };
                this.update(true, replay);
            }
        }
        return changed;
    }
 _getActiveElements(e, lastActive, replay, inChartArea) {
        const options = this.options;
        if (e.type === 'mouseout') {
            return [];
        }
        if (!inChartArea) {
            return lastActive.filter((i)=>this.chart.data.datasets[i.datasetIndex] && this.chart.getDatasetMeta(i.datasetIndex).controller.getParsed(i.index) !== undefined);
        }
        const active = this.chart.getElementsAtEventForMode(e, options.mode, options, replay);
        if (options.reverse) {
            active.reverse();
        }
        return active;
    }
 _positionChanged(active, e) {
        const { caretX , caretY , options  } = this;
        const position = positioners[options.position].call(this, active, e);
        return position !== false && (caretX !== position.x || caretY !== position.y);
    }
}
var plugin_tooltip = {
    id: 'tooltip',
    _element: Tooltip,
    positioners,
    afterInit (chart, _args, options) {
        if (options) {
            chart.tooltip = new Tooltip({
                chart,
                options
            });
        }
    },
    beforeUpdate (chart, _args, options) {
        if (chart.tooltip) {
            chart.tooltip.initialize(options);
        }
    },
    reset (chart, _args, options) {
        if (chart.tooltip) {
            chart.tooltip.initialize(options);
        }
    },
    afterDraw (chart) {
        const tooltip = chart.tooltip;
        if (tooltip && tooltip._willRender()) {
            const args = {
                tooltip
            };
            if (chart.notifyPlugins('beforeTooltipDraw', {
                ...args,
                cancelable: true
            }) === false) {
                return;
            }
            tooltip.draw(chart.ctx);
            chart.notifyPlugins('afterTooltipDraw', args);
        }
    },
    afterEvent (chart, args) {
        if (chart.tooltip) {
            const useFinalPosition = args.replay;
            if (chart.tooltip.handleEvent(args.event, useFinalPosition, args.inChartArea)) {
                args.changed = true;
            }
        }
    },
    defaults: {
        enabled: true,
        external: null,
        position: 'average',
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        titleFont: {
            weight: 'bold'
        },
        titleSpacing: 2,
        titleMarginBottom: 6,
        titleAlign: 'left',
        bodyColor: '#fff',
        bodySpacing: 2,
        bodyFont: {},
        bodyAlign: 'left',
        footerColor: '#fff',
        footerSpacing: 2,
        footerMarginTop: 6,
        footerFont: {
            weight: 'bold'
        },
        footerAlign: 'left',
        padding: 6,
        caretPadding: 2,
        caretSize: 5,
        cornerRadius: 6,
        boxHeight: (ctx, opts)=>opts.bodyFont.size,
        boxWidth: (ctx, opts)=>opts.bodyFont.size,
        multiKeyBackground: '#fff',
        displayColors: true,
        boxPadding: 0,
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 0,
        animation: {
            duration: 400,
            easing: 'easeOutQuart'
        },
        animations: {
            numbers: {
                type: 'number',
                properties: [
                    'x',
                    'y',
                    'width',
                    'height',
                    'caretX',
                    'caretY'
                ]
            },
            opacity: {
                easing: 'linear',
                duration: 200
            }
        },
        callbacks: defaultCallbacks
    },
    defaultRoutes: {
        bodyFont: 'font',
        footerFont: 'font',
        titleFont: 'font'
    },
    descriptors: {
        _scriptable: (name)=>name !== 'filter' && name !== 'itemSort' && name !== 'external',
        _indexable: false,
        callbacks: {
            _scriptable: false,
            _indexable: false
        },
        animation: {
            _fallback: false
        },
        animations: {
            _fallback: 'animation'
        }
    },
    additionalOptionScopes: [
        'interaction'
    ]
};

var plugins = /*#__PURE__*/Object.freeze({
__proto__: null,
Colors: plugin_colors,
Decimation: plugin_decimation,
Filler: index,
Legend: plugin_legend,
SubTitle: plugin_subtitle,
Title: plugin_title,
Tooltip: plugin_tooltip
});

const addIfString = (labels, raw, index, addedLabels)=>{
    if (typeof raw === 'string') {
        index = labels.push(raw) - 1;
        addedLabels.unshift({
            index,
            label: raw
        });
    } else if (isNaN(raw)) {
        index = null;
    }
    return index;
};
function findOrAddLabel(labels, raw, index, addedLabels) {
    const first = labels.indexOf(raw);
    if (first === -1) {
        return addIfString(labels, raw, index, addedLabels);
    }
    const last = labels.lastIndexOf(raw);
    return first !== last ? index : first;
}
const validIndex = (index, max)=>index === null ? null : (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.S)(Math.round(index), 0, max);
function _getLabelForValue(value) {
    const labels = this.getLabels();
    if (value >= 0 && value < labels.length) {
        return labels[value];
    }
    return value;
}
class CategoryScale extends Scale {
    static id = 'category';
 static defaults = {
        ticks: {
            callback: _getLabelForValue
        }
    };
    constructor(cfg){
        super(cfg);
         this._startValue = undefined;
        this._valueRange = 0;
        this._addedLabels = [];
    }
    init(scaleOptions) {
        const added = this._addedLabels;
        if (added.length) {
            const labels = this.getLabels();
            for (const { index , label  } of added){
                if (labels[index] === label) {
                    labels.splice(index, 1);
                }
            }
            this._addedLabels = [];
        }
        super.init(scaleOptions);
    }
    parse(raw, index) {
        if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(raw)) {
            return null;
        }
        const labels = this.getLabels();
        index = isFinite(index) && labels[index] === raw ? index : findOrAddLabel(labels, raw, (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(index, raw), this._addedLabels);
        return validIndex(index, labels.length - 1);
    }
    determineDataLimits() {
        const { minDefined , maxDefined  } = this.getUserBounds();
        let { min , max  } = this.getMinMax(true);
        if (this.options.bounds === 'ticks') {
            if (!minDefined) {
                min = 0;
            }
            if (!maxDefined) {
                max = this.getLabels().length - 1;
            }
        }
        this.min = min;
        this.max = max;
    }
    buildTicks() {
        const min = this.min;
        const max = this.max;
        const offset = this.options.offset;
        const ticks = [];
        let labels = this.getLabels();
        labels = min === 0 && max === labels.length - 1 ? labels : labels.slice(min, max + 1);
        this._valueRange = Math.max(labels.length - (offset ? 0 : 1), 1);
        this._startValue = this.min - (offset ? 0.5 : 0);
        for(let value = min; value <= max; value++){
            ticks.push({
                value
            });
        }
        return ticks;
    }
    getLabelForValue(value) {
        return _getLabelForValue.call(this, value);
    }
 configure() {
        super.configure();
        if (!this.isHorizontal()) {
            this._reversePixels = !this._reversePixels;
        }
    }
    getPixelForValue(value) {
        if (typeof value !== 'number') {
            value = this.parse(value);
        }
        return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
    }
    getPixelForTick(index) {
        const ticks = this.ticks;
        if (index < 0 || index > ticks.length - 1) {
            return null;
        }
        return this.getPixelForValue(ticks[index].value);
    }
    getValueForPixel(pixel) {
        return Math.round(this._startValue + this.getDecimalForPixel(pixel) * this._valueRange);
    }
    getBasePixel() {
        return this.bottom;
    }
}

function generateTicks$1(generationOptions, dataRange) {
    const ticks = [];
    const MIN_SPACING = 1e-14;
    const { bounds , step , min , max , precision , count , maxTicks , maxDigits , includeBounds  } = generationOptions;
    const unit = step || 1;
    const maxSpaces = maxTicks - 1;
    const { min: rmin , max: rmax  } = dataRange;
    const minDefined = !(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(min);
    const maxDefined = !(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(max);
    const countDefined = !(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(count);
    const minSpacing = (rmax - rmin) / (maxDigits + 1);
    let spacing = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aI)((rmax - rmin) / maxSpaces / unit) * unit;
    let factor, niceMin, niceMax, numSpaces;
    if (spacing < MIN_SPACING && !minDefined && !maxDefined) {
        return [
            {
                value: rmin
            },
            {
                value: rmax
            }
        ];
    }
    numSpaces = Math.ceil(rmax / spacing) - Math.floor(rmin / spacing);
    if (numSpaces > maxSpaces) {
        spacing = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aI)(numSpaces * spacing / maxSpaces / unit) * unit;
    }
    if (!(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(precision)) {
        factor = Math.pow(10, precision);
        spacing = Math.ceil(spacing * factor) / factor;
    }
    if (bounds === 'ticks') {
        niceMin = Math.floor(rmin / spacing) * spacing;
        niceMax = Math.ceil(rmax / spacing) * spacing;
    } else {
        niceMin = rmin;
        niceMax = rmax;
    }
    if (minDefined && maxDefined && step && (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aJ)((max - min) / step, spacing / 1000)) {
        numSpaces = Math.round(Math.min((max - min) / spacing, maxTicks));
        spacing = (max - min) / numSpaces;
        niceMin = min;
        niceMax = max;
    } else if (countDefined) {
        niceMin = minDefined ? min : niceMin;
        niceMax = maxDefined ? max : niceMax;
        numSpaces = count - 1;
        spacing = (niceMax - niceMin) / numSpaces;
    } else {
        numSpaces = (niceMax - niceMin) / spacing;
        if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aK)(numSpaces, Math.round(numSpaces), spacing / 1000)) {
            numSpaces = Math.round(numSpaces);
        } else {
            numSpaces = Math.ceil(numSpaces);
        }
    }
    const decimalPlaces = Math.max((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aL)(spacing), (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aL)(niceMin));
    factor = Math.pow(10, (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(precision) ? decimalPlaces : precision);
    niceMin = Math.round(niceMin * factor) / factor;
    niceMax = Math.round(niceMax * factor) / factor;
    let j = 0;
    if (minDefined) {
        if (includeBounds && niceMin !== min) {
            ticks.push({
                value: min
            });
            if (niceMin < min) {
                j++;
            }
            if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aK)(Math.round((niceMin + j * spacing) * factor) / factor, min, relativeLabelSize(min, minSpacing, generationOptions))) {
                j++;
            }
        } else if (niceMin < min) {
            j++;
        }
    }
    for(; j < numSpaces; ++j){
        const tickValue = Math.round((niceMin + j * spacing) * factor) / factor;
        if (maxDefined && tickValue > max) {
            break;
        }
        ticks.push({
            value: tickValue
        });
    }
    if (maxDefined && includeBounds && niceMax !== max) {
        if (ticks.length && (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aK)(ticks[ticks.length - 1].value, max, relativeLabelSize(max, minSpacing, generationOptions))) {
            ticks[ticks.length - 1].value = max;
        } else {
            ticks.push({
                value: max
            });
        }
    } else if (!maxDefined || niceMax === max) {
        ticks.push({
            value: niceMax
        });
    }
    return ticks;
}
function relativeLabelSize(value, minSpacing, { horizontal , minRotation  }) {
    const rad = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.t)(minRotation);
    const ratio = (horizontal ? Math.sin(rad) : Math.cos(rad)) || 0.001;
    const length = 0.75 * minSpacing * ('' + value).length;
    return Math.min(minSpacing / ratio, length);
}
class LinearScaleBase extends Scale {
    constructor(cfg){
        super(cfg);
         this.start = undefined;
         this.end = undefined;
         this._startValue = undefined;
         this._endValue = undefined;
        this._valueRange = 0;
    }
    parse(raw, index) {
        if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(raw)) {
            return null;
        }
        if ((typeof raw === 'number' || raw instanceof Number) && !isFinite(+raw)) {
            return null;
        }
        return +raw;
    }
    handleTickRangeOptions() {
        const { beginAtZero  } = this.options;
        const { minDefined , maxDefined  } = this.getUserBounds();
        let { min , max  } = this;
        const setMin = (v)=>min = minDefined ? min : v;
        const setMax = (v)=>max = maxDefined ? max : v;
        if (beginAtZero) {
            const minSign = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.s)(min);
            const maxSign = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.s)(max);
            if (minSign < 0 && maxSign < 0) {
                setMax(0);
            } else if (minSign > 0 && maxSign > 0) {
                setMin(0);
            }
        }
        if (min === max) {
            let offset = max === 0 ? 1 : Math.abs(max * 0.05);
            setMax(max + offset);
            if (!beginAtZero) {
                setMin(min - offset);
            }
        }
        this.min = min;
        this.max = max;
    }
    getTickLimit() {
        const tickOpts = this.options.ticks;
        let { maxTicksLimit , stepSize  } = tickOpts;
        let maxTicks;
        if (stepSize) {
            maxTicks = Math.ceil(this.max / stepSize) - Math.floor(this.min / stepSize) + 1;
            if (maxTicks > 1000) {
                console.warn(`scales.${this.id}.ticks.stepSize: ${stepSize} would result generating up to ${maxTicks} ticks. Limiting to 1000.`);
                maxTicks = 1000;
            }
        } else {
            maxTicks = this.computeTickLimit();
            maxTicksLimit = maxTicksLimit || 11;
        }
        if (maxTicksLimit) {
            maxTicks = Math.min(maxTicksLimit, maxTicks);
        }
        return maxTicks;
    }
 computeTickLimit() {
        return Number.POSITIVE_INFINITY;
    }
    buildTicks() {
        const opts = this.options;
        const tickOpts = opts.ticks;
        let maxTicks = this.getTickLimit();
        maxTicks = Math.max(2, maxTicks);
        const numericGeneratorOptions = {
            maxTicks,
            bounds: opts.bounds,
            min: opts.min,
            max: opts.max,
            precision: tickOpts.precision,
            step: tickOpts.stepSize,
            count: tickOpts.count,
            maxDigits: this._maxDigits(),
            horizontal: this.isHorizontal(),
            minRotation: tickOpts.minRotation || 0,
            includeBounds: tickOpts.includeBounds !== false
        };
        const dataRange = this._range || this;
        const ticks = generateTicks$1(numericGeneratorOptions, dataRange);
        if (opts.bounds === 'ticks') {
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aH)(ticks, this, 'value');
        }
        if (opts.reverse) {
            ticks.reverse();
            this.start = this.max;
            this.end = this.min;
        } else {
            this.start = this.min;
            this.end = this.max;
        }
        return ticks;
    }
 configure() {
        const ticks = this.ticks;
        let start = this.min;
        let end = this.max;
        super.configure();
        if (this.options.offset && ticks.length) {
            const offset = (end - start) / Math.max(ticks.length - 1, 1) / 2;
            start -= offset;
            end += offset;
        }
        this._startValue = start;
        this._endValue = end;
        this._valueRange = end - start;
    }
    getLabelForValue(value) {
        return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.o)(value, this.chart.options.locale, this.options.ticks.format);
    }
}

class LinearScale extends LinearScaleBase {
    static id = 'linear';
 static defaults = {
        ticks: {
            callback: _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aM.formatters.numeric
        }
    };
    determineDataLimits() {
        const { min , max  } = this.getMinMax(true);
        this.min = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.g)(min) ? min : 0;
        this.max = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.g)(max) ? max : 1;
        this.handleTickRangeOptions();
    }
 computeTickLimit() {
        const horizontal = this.isHorizontal();
        const length = horizontal ? this.width : this.height;
        const minRotation = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.t)(this.options.ticks.minRotation);
        const ratio = (horizontal ? Math.sin(minRotation) : Math.cos(minRotation)) || 0.001;
        const tickFont = this._resolveTickFontOptions(0);
        return Math.ceil(length / Math.min(40, tickFont.lineHeight / ratio));
    }
    getPixelForValue(value) {
        return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
    }
    getValueForPixel(pixel) {
        return this._startValue + this.getDecimalForPixel(pixel) * this._valueRange;
    }
}

const log10Floor = (v)=>Math.floor((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aN)(v));
const changeExponent = (v, m)=>Math.pow(10, log10Floor(v) + m);
function isMajor(tickVal) {
    const remain = tickVal / Math.pow(10, log10Floor(tickVal));
    return remain === 1;
}
function steps(min, max, rangeExp) {
    const rangeStep = Math.pow(10, rangeExp);
    const start = Math.floor(min / rangeStep);
    const end = Math.ceil(max / rangeStep);
    return end - start;
}
function startExp(min, max) {
    const range = max - min;
    let rangeExp = log10Floor(range);
    while(steps(min, max, rangeExp) > 10){
        rangeExp++;
    }
    while(steps(min, max, rangeExp) < 10){
        rangeExp--;
    }
    return Math.min(rangeExp, log10Floor(min));
}
 function generateTicks(generationOptions, { min , max  }) {
    min = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.O)(generationOptions.min, min);
    const ticks = [];
    const minExp = log10Floor(min);
    let exp = startExp(min, max);
    let precision = exp < 0 ? Math.pow(10, Math.abs(exp)) : 1;
    const stepSize = Math.pow(10, exp);
    const base = minExp > exp ? Math.pow(10, minExp) : 0;
    const start = Math.round((min - base) * precision) / precision;
    const offset = Math.floor((min - base) / stepSize / 10) * stepSize * 10;
    let significand = Math.floor((start - offset) / Math.pow(10, exp));
    let value = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.O)(generationOptions.min, Math.round((base + offset + significand * Math.pow(10, exp)) * precision) / precision);
    while(value < max){
        ticks.push({
            value,
            major: isMajor(value),
            significand
        });
        if (significand >= 10) {
            significand = significand < 15 ? 15 : 20;
        } else {
            significand++;
        }
        if (significand >= 20) {
            exp++;
            significand = 2;
            precision = exp >= 0 ? 1 : precision;
        }
        value = Math.round((base + offset + significand * Math.pow(10, exp)) * precision) / precision;
    }
    const lastTick = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.O)(generationOptions.max, value);
    ticks.push({
        value: lastTick,
        major: isMajor(lastTick),
        significand
    });
    return ticks;
}
class LogarithmicScale extends Scale {
    static id = 'logarithmic';
 static defaults = {
        ticks: {
            callback: _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aM.formatters.logarithmic,
            major: {
                enabled: true
            }
        }
    };
    constructor(cfg){
        super(cfg);
         this.start = undefined;
         this.end = undefined;
         this._startValue = undefined;
        this._valueRange = 0;
    }
    parse(raw, index) {
        const value = LinearScaleBase.prototype.parse.apply(this, [
            raw,
            index
        ]);
        if (value === 0) {
            this._zero = true;
            return undefined;
        }
        return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.g)(value) && value > 0 ? value : null;
    }
    determineDataLimits() {
        const { min , max  } = this.getMinMax(true);
        this.min = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.g)(min) ? Math.max(0, min) : null;
        this.max = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.g)(max) ? Math.max(0, max) : null;
        if (this.options.beginAtZero) {
            this._zero = true;
        }
        if (this._zero && this.min !== this._suggestedMin && !(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.g)(this._userMin)) {
            this.min = min === changeExponent(this.min, 0) ? changeExponent(this.min, -1) : changeExponent(this.min, 0);
        }
        this.handleTickRangeOptions();
    }
    handleTickRangeOptions() {
        const { minDefined , maxDefined  } = this.getUserBounds();
        let min = this.min;
        let max = this.max;
        const setMin = (v)=>min = minDefined ? min : v;
        const setMax = (v)=>max = maxDefined ? max : v;
        if (min === max) {
            if (min <= 0) {
                setMin(1);
                setMax(10);
            } else {
                setMin(changeExponent(min, -1));
                setMax(changeExponent(max, +1));
            }
        }
        if (min <= 0) {
            setMin(changeExponent(max, -1));
        }
        if (max <= 0) {
            setMax(changeExponent(min, +1));
        }
        this.min = min;
        this.max = max;
    }
    buildTicks() {
        const opts = this.options;
        const generationOptions = {
            min: this._userMin,
            max: this._userMax
        };
        const ticks = generateTicks(generationOptions, this);
        if (opts.bounds === 'ticks') {
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aH)(ticks, this, 'value');
        }
        if (opts.reverse) {
            ticks.reverse();
            this.start = this.max;
            this.end = this.min;
        } else {
            this.start = this.min;
            this.end = this.max;
        }
        return ticks;
    }
 getLabelForValue(value) {
        return value === undefined ? '0' : (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.o)(value, this.chart.options.locale, this.options.ticks.format);
    }
 configure() {
        const start = this.min;
        super.configure();
        this._startValue = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aN)(start);
        this._valueRange = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aN)(this.max) - (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aN)(start);
    }
    getPixelForValue(value) {
        if (value === undefined || value === 0) {
            value = this.min;
        }
        if (value === null || isNaN(value)) {
            return NaN;
        }
        return this.getPixelForDecimal(value === this.min ? 0 : ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aN)(value) - this._startValue) / this._valueRange);
    }
    getValueForPixel(pixel) {
        const decimal = this.getDecimalForPixel(pixel);
        return Math.pow(10, this._startValue + decimal * this._valueRange);
    }
}

function getTickBackdropHeight(opts) {
    const tickOpts = opts.ticks;
    if (tickOpts.display && opts.display) {
        const padding = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.E)(tickOpts.backdropPadding);
        return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(tickOpts.font && tickOpts.font.size, _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.d.font.size) + padding.height;
    }
    return 0;
}
function measureLabelSize(ctx, font, label) {
    label = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.b)(label) ? label : [
        label
    ];
    return {
        w: (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aO)(ctx, font.string, label),
        h: label.length * font.lineHeight
    };
}
function determineLimits(angle, pos, size, min, max) {
    if (angle === min || angle === max) {
        return {
            start: pos - size / 2,
            end: pos + size / 2
        };
    } else if (angle < min || angle > max) {
        return {
            start: pos - size,
            end: pos
        };
    }
    return {
        start: pos,
        end: pos + size
    };
}
 function fitWithPointLabels(scale) {
    const orig = {
        l: scale.left + scale._padding.left,
        r: scale.right - scale._padding.right,
        t: scale.top + scale._padding.top,
        b: scale.bottom - scale._padding.bottom
    };
    const limits = Object.assign({}, orig);
    const labelSizes = [];
    const padding = [];
    const valueCount = scale._pointLabels.length;
    const pointLabelOpts = scale.options.pointLabels;
    const additionalAngle = pointLabelOpts.centerPointLabels ? _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.P / valueCount : 0;
    for(let i = 0; i < valueCount; i++){
        const opts = pointLabelOpts.setContext(scale.getPointLabelContext(i));
        padding[i] = opts.padding;
        const pointPosition = scale.getPointPosition(i, scale.drawingArea + padding[i], additionalAngle);
        const plFont = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a0)(opts.font);
        const textSize = measureLabelSize(scale.ctx, plFont, scale._pointLabels[i]);
        labelSizes[i] = textSize;
        const angleRadians = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.al)(scale.getIndexAngle(i) + additionalAngle);
        const angle = Math.round((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.U)(angleRadians));
        const hLimits = determineLimits(angle, pointPosition.x, textSize.w, 0, 180);
        const vLimits = determineLimits(angle, pointPosition.y, textSize.h, 90, 270);
        updateLimits(limits, orig, angleRadians, hLimits, vLimits);
    }
    scale.setCenterPoint(orig.l - limits.l, limits.r - orig.r, orig.t - limits.t, limits.b - orig.b);
    scale._pointLabelItems = buildPointLabelItems(scale, labelSizes, padding);
}
function updateLimits(limits, orig, angle, hLimits, vLimits) {
    const sin = Math.abs(Math.sin(angle));
    const cos = Math.abs(Math.cos(angle));
    let x = 0;
    let y = 0;
    if (hLimits.start < orig.l) {
        x = (orig.l - hLimits.start) / sin;
        limits.l = Math.min(limits.l, orig.l - x);
    } else if (hLimits.end > orig.r) {
        x = (hLimits.end - orig.r) / sin;
        limits.r = Math.max(limits.r, orig.r + x);
    }
    if (vLimits.start < orig.t) {
        y = (orig.t - vLimits.start) / cos;
        limits.t = Math.min(limits.t, orig.t - y);
    } else if (vLimits.end > orig.b) {
        y = (vLimits.end - orig.b) / cos;
        limits.b = Math.max(limits.b, orig.b + y);
    }
}
function createPointLabelItem(scale, index, itemOpts) {
    const outerDistance = scale.drawingArea;
    const { extra , additionalAngle , padding , size  } = itemOpts;
    const pointLabelPosition = scale.getPointPosition(index, outerDistance + extra + padding, additionalAngle);
    const angle = Math.round((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.U)((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.al)(pointLabelPosition.angle + _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.H)));
    const y = yForAngle(pointLabelPosition.y, size.h, angle);
    const textAlign = getTextAlignForAngle(angle);
    const left = leftForTextAlign(pointLabelPosition.x, size.w, textAlign);
    return {
        visible: true,
        x: pointLabelPosition.x,
        y,
        textAlign,
        left,
        top: y,
        right: left + size.w,
        bottom: y + size.h
    };
}
function isNotOverlapped(item, area) {
    if (!area) {
        return true;
    }
    const { left , top , right , bottom  } = item;
    const apexesInArea = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.C)({
        x: left,
        y: top
    }, area) || (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.C)({
        x: left,
        y: bottom
    }, area) || (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.C)({
        x: right,
        y: top
    }, area) || (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.C)({
        x: right,
        y: bottom
    }, area);
    return !apexesInArea;
}
function buildPointLabelItems(scale, labelSizes, padding) {
    const items = [];
    const valueCount = scale._pointLabels.length;
    const opts = scale.options;
    const { centerPointLabels , display  } = opts.pointLabels;
    const itemOpts = {
        extra: getTickBackdropHeight(opts) / 2,
        additionalAngle: centerPointLabels ? _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.P / valueCount : 0
    };
    let area;
    for(let i = 0; i < valueCount; i++){
        itemOpts.padding = padding[i];
        itemOpts.size = labelSizes[i];
        const item = createPointLabelItem(scale, i, itemOpts);
        items.push(item);
        if (display === 'auto') {
            item.visible = isNotOverlapped(item, area);
            if (item.visible) {
                area = item;
            }
        }
    }
    return items;
}
function getTextAlignForAngle(angle) {
    if (angle === 0 || angle === 180) {
        return 'center';
    } else if (angle < 180) {
        return 'left';
    }
    return 'right';
}
function leftForTextAlign(x, w, align) {
    if (align === 'right') {
        x -= w;
    } else if (align === 'center') {
        x -= w / 2;
    }
    return x;
}
function yForAngle(y, h, angle) {
    if (angle === 90 || angle === 270) {
        y -= h / 2;
    } else if (angle > 270 || angle < 90) {
        y -= h;
    }
    return y;
}
function drawPointLabelBox(ctx, opts, item) {
    const { left , top , right , bottom  } = item;
    const { backdropColor  } = opts;
    if (!(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(backdropColor)) {
        const borderRadius = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ay)(opts.borderRadius);
        const padding = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.E)(opts.backdropPadding);
        ctx.fillStyle = backdropColor;
        const backdropLeft = left - padding.left;
        const backdropTop = top - padding.top;
        const backdropWidth = right - left + padding.width;
        const backdropHeight = bottom - top + padding.height;
        if (Object.values(borderRadius).some((v)=>v !== 0)) {
            ctx.beginPath();
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aw)(ctx, {
                x: backdropLeft,
                y: backdropTop,
                w: backdropWidth,
                h: backdropHeight,
                radius: borderRadius
            });
            ctx.fill();
        } else {
            ctx.fillRect(backdropLeft, backdropTop, backdropWidth, backdropHeight);
        }
    }
}
function drawPointLabels(scale, labelCount) {
    const { ctx , options: { pointLabels  }  } = scale;
    for(let i = labelCount - 1; i >= 0; i--){
        const item = scale._pointLabelItems[i];
        if (!item.visible) {
            continue;
        }
        const optsAtIndex = pointLabels.setContext(scale.getPointLabelContext(i));
        drawPointLabelBox(ctx, optsAtIndex, item);
        const plFont = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a0)(optsAtIndex.font);
        const { x , y , textAlign  } = item;
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Z)(ctx, scale._pointLabels[i], x, y + plFont.lineHeight / 2, plFont, {
            color: optsAtIndex.color,
            textAlign: textAlign,
            textBaseline: 'middle'
        });
    }
}
function pathRadiusLine(scale, radius, circular, labelCount) {
    const { ctx  } = scale;
    if (circular) {
        ctx.arc(scale.xCenter, scale.yCenter, radius, 0, _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.T);
    } else {
        let pointPosition = scale.getPointPosition(0, radius);
        ctx.moveTo(pointPosition.x, pointPosition.y);
        for(let i = 1; i < labelCount; i++){
            pointPosition = scale.getPointPosition(i, radius);
            ctx.lineTo(pointPosition.x, pointPosition.y);
        }
    }
}
function drawRadiusLine(scale, gridLineOpts, radius, labelCount, borderOpts) {
    const ctx = scale.ctx;
    const circular = gridLineOpts.circular;
    const { color , lineWidth  } = gridLineOpts;
    if (!circular && !labelCount || !color || !lineWidth || radius < 0) {
        return;
    }
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.setLineDash(borderOpts.dash || []);
    ctx.lineDashOffset = borderOpts.dashOffset;
    ctx.beginPath();
    pathRadiusLine(scale, radius, circular, labelCount);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}
function createPointLabelContext(parent, index, label) {
    return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.j)(parent, {
        label,
        index,
        type: 'pointLabel'
    });
}
class RadialLinearScale extends LinearScaleBase {
    static id = 'radialLinear';
 static defaults = {
        display: true,
        animate: true,
        position: 'chartArea',
        angleLines: {
            display: true,
            lineWidth: 1,
            borderDash: [],
            borderDashOffset: 0.0
        },
        grid: {
            circular: false
        },
        startAngle: 0,
        ticks: {
            showLabelBackdrop: true,
            callback: _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aM.formatters.numeric
        },
        pointLabels: {
            backdropColor: undefined,
            backdropPadding: 2,
            display: true,
            font: {
                size: 10
            },
            callback (label) {
                return label;
            },
            padding: 5,
            centerPointLabels: false
        }
    };
    static defaultRoutes = {
        'angleLines.color': 'borderColor',
        'pointLabels.color': 'color',
        'ticks.color': 'color'
    };
    static descriptors = {
        angleLines: {
            _fallback: 'grid'
        }
    };
    constructor(cfg){
        super(cfg);
         this.xCenter = undefined;
         this.yCenter = undefined;
         this.drawingArea = undefined;
         this._pointLabels = [];
        this._pointLabelItems = [];
    }
    setDimensions() {
        const padding = this._padding = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.E)(getTickBackdropHeight(this.options) / 2);
        const w = this.width = this.maxWidth - padding.width;
        const h = this.height = this.maxHeight - padding.height;
        this.xCenter = Math.floor(this.left + w / 2 + padding.left);
        this.yCenter = Math.floor(this.top + h / 2 + padding.top);
        this.drawingArea = Math.floor(Math.min(w, h) / 2);
    }
    determineDataLimits() {
        const { min , max  } = this.getMinMax(false);
        this.min = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.g)(min) && !isNaN(min) ? min : 0;
        this.max = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.g)(max) && !isNaN(max) ? max : 0;
        this.handleTickRangeOptions();
    }
 computeTickLimit() {
        return Math.ceil(this.drawingArea / getTickBackdropHeight(this.options));
    }
    generateTickLabels(ticks) {
        LinearScaleBase.prototype.generateTickLabels.call(this, ticks);
        this._pointLabels = this.getLabels().map((value, index)=>{
            const label = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(this.options.pointLabels.callback, [
                value,
                index
            ], this);
            return label || label === 0 ? label : '';
        }).filter((v, i)=>this.chart.getDataVisibility(i));
    }
    fit() {
        const opts = this.options;
        if (opts.display && opts.pointLabels.display) {
            fitWithPointLabels(this);
        } else {
            this.setCenterPoint(0, 0, 0, 0);
        }
    }
    setCenterPoint(leftMovement, rightMovement, topMovement, bottomMovement) {
        this.xCenter += Math.floor((leftMovement - rightMovement) / 2);
        this.yCenter += Math.floor((topMovement - bottomMovement) / 2);
        this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(leftMovement, rightMovement, topMovement, bottomMovement));
    }
    getIndexAngle(index) {
        const angleMultiplier = _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.T / (this._pointLabels.length || 1);
        const startAngle = this.options.startAngle || 0;
        return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.al)(index * angleMultiplier + (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.t)(startAngle));
    }
    getDistanceFromCenterForValue(value) {
        if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(value)) {
            return NaN;
        }
        const scalingFactor = this.drawingArea / (this.max - this.min);
        if (this.options.reverse) {
            return (this.max - value) * scalingFactor;
        }
        return (value - this.min) * scalingFactor;
    }
    getValueForDistanceFromCenter(distance) {
        if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(distance)) {
            return NaN;
        }
        const scaledDistance = distance / (this.drawingArea / (this.max - this.min));
        return this.options.reverse ? this.max - scaledDistance : this.min + scaledDistance;
    }
    getPointLabelContext(index) {
        const pointLabels = this._pointLabels || [];
        if (index >= 0 && index < pointLabels.length) {
            const pointLabel = pointLabels[index];
            return createPointLabelContext(this.getContext(), index, pointLabel);
        }
    }
    getPointPosition(index, distanceFromCenter, additionalAngle = 0) {
        const angle = this.getIndexAngle(index) - _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.H + additionalAngle;
        return {
            x: Math.cos(angle) * distanceFromCenter + this.xCenter,
            y: Math.sin(angle) * distanceFromCenter + this.yCenter,
            angle
        };
    }
    getPointPositionForValue(index, value) {
        return this.getPointPosition(index, this.getDistanceFromCenterForValue(value));
    }
    getBasePosition(index) {
        return this.getPointPositionForValue(index || 0, this.getBaseValue());
    }
    getPointLabelPosition(index) {
        const { left , top , right , bottom  } = this._pointLabelItems[index];
        return {
            left,
            top,
            right,
            bottom
        };
    }
 drawBackground() {
        const { backgroundColor , grid: { circular  }  } = this.options;
        if (backgroundColor) {
            const ctx = this.ctx;
            ctx.save();
            ctx.beginPath();
            pathRadiusLine(this, this.getDistanceFromCenterForValue(this._endValue), circular, this._pointLabels.length);
            ctx.closePath();
            ctx.fillStyle = backgroundColor;
            ctx.fill();
            ctx.restore();
        }
    }
 drawGrid() {
        const ctx = this.ctx;
        const opts = this.options;
        const { angleLines , grid , border  } = opts;
        const labelCount = this._pointLabels.length;
        let i, offset, position;
        if (opts.pointLabels.display) {
            drawPointLabels(this, labelCount);
        }
        if (grid.display) {
            this.ticks.forEach((tick, index)=>{
                if (index !== 0 || index === 0 && this.min < 0) {
                    offset = this.getDistanceFromCenterForValue(tick.value);
                    const context = this.getContext(index);
                    const optsAtIndex = grid.setContext(context);
                    const optsAtIndexBorder = border.setContext(context);
                    drawRadiusLine(this, optsAtIndex, offset, labelCount, optsAtIndexBorder);
                }
            });
        }
        if (angleLines.display) {
            ctx.save();
            for(i = labelCount - 1; i >= 0; i--){
                const optsAtIndex = angleLines.setContext(this.getPointLabelContext(i));
                const { color , lineWidth  } = optsAtIndex;
                if (!lineWidth || !color) {
                    continue;
                }
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = color;
                ctx.setLineDash(optsAtIndex.borderDash);
                ctx.lineDashOffset = optsAtIndex.borderDashOffset;
                offset = this.getDistanceFromCenterForValue(opts.reverse ? this.min : this.max);
                position = this.getPointPosition(i, offset);
                ctx.beginPath();
                ctx.moveTo(this.xCenter, this.yCenter);
                ctx.lineTo(position.x, position.y);
                ctx.stroke();
            }
            ctx.restore();
        }
    }
 drawBorder() {}
 drawLabels() {
        const ctx = this.ctx;
        const opts = this.options;
        const tickOpts = opts.ticks;
        if (!tickOpts.display) {
            return;
        }
        const startAngle = this.getIndexAngle(0);
        let offset, width;
        ctx.save();
        ctx.translate(this.xCenter, this.yCenter);
        ctx.rotate(startAngle);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        this.ticks.forEach((tick, index)=>{
            if (index === 0 && this.min >= 0 && !opts.reverse) {
                return;
            }
            const optsAtIndex = tickOpts.setContext(this.getContext(index));
            const tickFont = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a0)(optsAtIndex.font);
            offset = this.getDistanceFromCenterForValue(this.ticks[index].value);
            if (optsAtIndex.showLabelBackdrop) {
                ctx.font = tickFont.string;
                width = ctx.measureText(tick.label).width;
                ctx.fillStyle = optsAtIndex.backdropColor;
                const padding = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.E)(optsAtIndex.backdropPadding);
                ctx.fillRect(-width / 2 - padding.left, -offset - tickFont.size / 2 - padding.top, width + padding.width, tickFont.size + padding.height);
            }
            (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Z)(ctx, tick.label, 0, -offset, tickFont, {
                color: optsAtIndex.color,
                strokeColor: optsAtIndex.textStrokeColor,
                strokeWidth: optsAtIndex.textStrokeWidth
            });
        });
        ctx.restore();
    }
 drawTitle() {}
}

const INTERVALS = {
    millisecond: {
        common: true,
        size: 1,
        steps: 1000
    },
    second: {
        common: true,
        size: 1000,
        steps: 60
    },
    minute: {
        common: true,
        size: 60000,
        steps: 60
    },
    hour: {
        common: true,
        size: 3600000,
        steps: 24
    },
    day: {
        common: true,
        size: 86400000,
        steps: 30
    },
    week: {
        common: false,
        size: 604800000,
        steps: 4
    },
    month: {
        common: true,
        size: 2.628e9,
        steps: 12
    },
    quarter: {
        common: false,
        size: 7.884e9,
        steps: 4
    },
    year: {
        common: true,
        size: 3.154e10
    }
};
 const UNITS =  /* #__PURE__ */ Object.keys(INTERVALS);
 function sorter(a, b) {
    return a - b;
}
 function parse(scale, input) {
    if ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k)(input)) {
        return null;
    }
    const adapter = scale._adapter;
    const { parser , round , isoWeekday  } = scale._parseOpts;
    let value = input;
    if (typeof parser === 'function') {
        value = parser(value);
    }
    if (!(0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.g)(value)) {
        value = typeof parser === 'string' ? adapter.parse(value, parser) : adapter.parse(value);
    }
    if (value === null) {
        return null;
    }
    if (round) {
        value = round === 'week' && ((0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.x)(isoWeekday) || isoWeekday === true) ? adapter.startOf(value, 'isoWeek', isoWeekday) : adapter.startOf(value, round);
    }
    return +value;
}
 function determineUnitForAutoTicks(minUnit, min, max, capacity) {
    const ilen = UNITS.length;
    for(let i = UNITS.indexOf(minUnit); i < ilen - 1; ++i){
        const interval = INTERVALS[UNITS[i]];
        const factor = interval.steps ? interval.steps : Number.MAX_SAFE_INTEGER;
        if (interval.common && Math.ceil((max - min) / (factor * interval.size)) <= capacity) {
            return UNITS[i];
        }
    }
    return UNITS[ilen - 1];
}
 function determineUnitForFormatting(scale, numTicks, minUnit, min, max) {
    for(let i = UNITS.length - 1; i >= UNITS.indexOf(minUnit); i--){
        const unit = UNITS[i];
        if (INTERVALS[unit].common && scale._adapter.diff(max, min, unit) >= numTicks - 1) {
            return unit;
        }
    }
    return UNITS[minUnit ? UNITS.indexOf(minUnit) : 0];
}
 function determineMajorUnit(unit) {
    for(let i = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i < ilen; ++i){
        if (INTERVALS[UNITS[i]].common) {
            return UNITS[i];
        }
    }
}
 function addTick(ticks, time, timestamps) {
    if (!timestamps) {
        ticks[time] = true;
    } else if (timestamps.length) {
        const { lo , hi  } = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aQ)(timestamps, time);
        const timestamp = timestamps[lo] >= time ? timestamps[lo] : timestamps[hi];
        ticks[timestamp] = true;
    }
}
 function setMajorTicks(scale, ticks, map, majorUnit) {
    const adapter = scale._adapter;
    const first = +adapter.startOf(ticks[0].value, majorUnit);
    const last = ticks[ticks.length - 1].value;
    let major, index;
    for(major = first; major <= last; major = +adapter.add(major, 1, majorUnit)){
        index = map[major];
        if (index >= 0) {
            ticks[index].major = true;
        }
    }
    return ticks;
}
 function ticksFromTimestamps(scale, values, majorUnit) {
    const ticks = [];
     const map = {};
    const ilen = values.length;
    let i, value;
    for(i = 0; i < ilen; ++i){
        value = values[i];
        map[value] = i;
        ticks.push({
            value,
            major: false
        });
    }
    return ilen === 0 || !majorUnit ? ticks : setMajorTicks(scale, ticks, map, majorUnit);
}
class TimeScale extends Scale {
    static id = 'time';
 static defaults = {
 bounds: 'data',
        adapters: {},
        time: {
            parser: false,
            unit: false,
            round: false,
            isoWeekday: false,
            minUnit: 'millisecond',
            displayFormats: {}
        },
        ticks: {
 source: 'auto',
            callback: false,
            major: {
                enabled: false
            }
        }
    };
 constructor(props){
        super(props);
         this._cache = {
            data: [],
            labels: [],
            all: []
        };
         this._unit = 'day';
         this._majorUnit = undefined;
        this._offsets = {};
        this._normalized = false;
        this._parseOpts = undefined;
    }
    init(scaleOpts, opts = {}) {
        const time = scaleOpts.time || (scaleOpts.time = {});
         const adapter = this._adapter = new adapters._date(scaleOpts.adapters.date);
        adapter.init(opts);
        (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ab)(time.displayFormats, adapter.formats());
        this._parseOpts = {
            parser: time.parser,
            round: time.round,
            isoWeekday: time.isoWeekday
        };
        super.init(scaleOpts);
        this._normalized = opts.normalized;
    }
 parse(raw, index) {
        if (raw === undefined) {
            return null;
        }
        return parse(this, raw);
    }
    beforeLayout() {
        super.beforeLayout();
        this._cache = {
            data: [],
            labels: [],
            all: []
        };
    }
    determineDataLimits() {
        const options = this.options;
        const adapter = this._adapter;
        const unit = options.time.unit || 'day';
        let { min , max , minDefined , maxDefined  } = this.getUserBounds();
 function _applyBounds(bounds) {
            if (!minDefined && !isNaN(bounds.min)) {
                min = Math.min(min, bounds.min);
            }
            if (!maxDefined && !isNaN(bounds.max)) {
                max = Math.max(max, bounds.max);
            }
        }
        if (!minDefined || !maxDefined) {
            _applyBounds(this._getLabelBounds());
            if (options.bounds !== 'ticks' || options.ticks.source !== 'labels') {
                _applyBounds(this.getMinMax(false));
            }
        }
        min = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.g)(min) && !isNaN(min) ? min : +adapter.startOf(Date.now(), unit);
        max = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.g)(max) && !isNaN(max) ? max : +adapter.endOf(Date.now(), unit) + 1;
        this.min = Math.min(min, max - 1);
        this.max = Math.max(min + 1, max);
    }
 _getLabelBounds() {
        const arr = this.getLabelTimestamps();
        let min = Number.POSITIVE_INFINITY;
        let max = Number.NEGATIVE_INFINITY;
        if (arr.length) {
            min = arr[0];
            max = arr[arr.length - 1];
        }
        return {
            min,
            max
        };
    }
 buildTicks() {
        const options = this.options;
        const timeOpts = options.time;
        const tickOpts = options.ticks;
        const timestamps = tickOpts.source === 'labels' ? this.getLabelTimestamps() : this._generate();
        if (options.bounds === 'ticks' && timestamps.length) {
            this.min = this._userMin || timestamps[0];
            this.max = this._userMax || timestamps[timestamps.length - 1];
        }
        const min = this.min;
        const max = this.max;
        const ticks = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aP)(timestamps, min, max);
        this._unit = timeOpts.unit || (tickOpts.autoSkip ? determineUnitForAutoTicks(timeOpts.minUnit, this.min, this.max, this._getLabelCapacity(min)) : determineUnitForFormatting(this, ticks.length, timeOpts.minUnit, this.min, this.max));
        this._majorUnit = !tickOpts.major.enabled || this._unit === 'year' ? undefined : determineMajorUnit(this._unit);
        this.initOffsets(timestamps);
        if (options.reverse) {
            ticks.reverse();
        }
        return ticksFromTimestamps(this, ticks, this._majorUnit);
    }
    afterAutoSkip() {
        if (this.options.offsetAfterAutoskip) {
            this.initOffsets(this.ticks.map((tick)=>+tick.value));
        }
    }
 initOffsets(timestamps = []) {
        let start = 0;
        let end = 0;
        let first, last;
        if (this.options.offset && timestamps.length) {
            first = this.getDecimalForValue(timestamps[0]);
            if (timestamps.length === 1) {
                start = 1 - first;
            } else {
                start = (this.getDecimalForValue(timestamps[1]) - first) / 2;
            }
            last = this.getDecimalForValue(timestamps[timestamps.length - 1]);
            if (timestamps.length === 1) {
                end = last;
            } else {
                end = (last - this.getDecimalForValue(timestamps[timestamps.length - 2])) / 2;
            }
        }
        const limit = timestamps.length < 3 ? 0.5 : 0.25;
        start = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.S)(start, 0, limit);
        end = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.S)(end, 0, limit);
        this._offsets = {
            start,
            end,
            factor: 1 / (start + 1 + end)
        };
    }
 _generate() {
        const adapter = this._adapter;
        const min = this.min;
        const max = this.max;
        const options = this.options;
        const timeOpts = options.time;
        const minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min, max, this._getLabelCapacity(min));
        const stepSize = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v)(options.ticks.stepSize, 1);
        const weekday = minor === 'week' ? timeOpts.isoWeekday : false;
        const hasWeekday = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.x)(weekday) || weekday === true;
        const ticks = {};
        let first = min;
        let time, count;
        if (hasWeekday) {
            first = +adapter.startOf(first, 'isoWeek', weekday);
        }
        first = +adapter.startOf(first, hasWeekday ? 'day' : minor);
        if (adapter.diff(max, min, minor) > 100000 * stepSize) {
            throw new Error(min + ' and ' + max + ' are too far apart with stepSize of ' + stepSize + ' ' + minor);
        }
        const timestamps = options.ticks.source === 'data' && this.getDataTimestamps();
        for(time = first, count = 0; time < max; time = +adapter.add(time, stepSize, minor), count++){
            addTick(ticks, time, timestamps);
        }
        if (time === max || options.bounds === 'ticks' || count === 1) {
            addTick(ticks, time, timestamps);
        }
        return Object.keys(ticks).sort(sorter).map((x)=>+x);
    }
 getLabelForValue(value) {
        const adapter = this._adapter;
        const timeOpts = this.options.time;
        if (timeOpts.tooltipFormat) {
            return adapter.format(value, timeOpts.tooltipFormat);
        }
        return adapter.format(value, timeOpts.displayFormats.datetime);
    }
 format(value, format) {
        const options = this.options;
        const formats = options.time.displayFormats;
        const unit = this._unit;
        const fmt = format || formats[unit];
        return this._adapter.format(value, fmt);
    }
 _tickFormatFunction(time, index, ticks, format) {
        const options = this.options;
        const formatter = options.ticks.callback;
        if (formatter) {
            return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q)(formatter, [
                time,
                index,
                ticks
            ], this);
        }
        const formats = options.time.displayFormats;
        const unit = this._unit;
        const majorUnit = this._majorUnit;
        const minorFormat = unit && formats[unit];
        const majorFormat = majorUnit && formats[majorUnit];
        const tick = ticks[index];
        const major = majorUnit && majorFormat && tick && tick.major;
        return this._adapter.format(time, format || (major ? majorFormat : minorFormat));
    }
 generateTickLabels(ticks) {
        let i, ilen, tick;
        for(i = 0, ilen = ticks.length; i < ilen; ++i){
            tick = ticks[i];
            tick.label = this._tickFormatFunction(tick.value, i, ticks);
        }
    }
 getDecimalForValue(value) {
        return value === null ? NaN : (value - this.min) / (this.max - this.min);
    }
 getPixelForValue(value) {
        const offsets = this._offsets;
        const pos = this.getDecimalForValue(value);
        return this.getPixelForDecimal((offsets.start + pos) * offsets.factor);
    }
 getValueForPixel(pixel) {
        const offsets = this._offsets;
        const pos = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
        return this.min + pos * (this.max - this.min);
    }
 _getLabelSize(label) {
        const ticksOpts = this.options.ticks;
        const tickLabelWidth = this.ctx.measureText(label).width;
        const angle = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.t)(this.isHorizontal() ? ticksOpts.maxRotation : ticksOpts.minRotation);
        const cosRotation = Math.cos(angle);
        const sinRotation = Math.sin(angle);
        const tickFontSize = this._resolveTickFontOptions(0).size;
        return {
            w: tickLabelWidth * cosRotation + tickFontSize * sinRotation,
            h: tickLabelWidth * sinRotation + tickFontSize * cosRotation
        };
    }
 _getLabelCapacity(exampleTime) {
        const timeOpts = this.options.time;
        const displayFormats = timeOpts.displayFormats;
        const format = displayFormats[timeOpts.unit] || displayFormats.millisecond;
        const exampleLabel = this._tickFormatFunction(exampleTime, 0, ticksFromTimestamps(this, [
            exampleTime
        ], this._majorUnit), format);
        const size = this._getLabelSize(exampleLabel);
        const capacity = Math.floor(this.isHorizontal() ? this.width / size.w : this.height / size.h) - 1;
        return capacity > 0 ? capacity : 1;
    }
 getDataTimestamps() {
        let timestamps = this._cache.data || [];
        let i, ilen;
        if (timestamps.length) {
            return timestamps;
        }
        const metas = this.getMatchingVisibleMetas();
        if (this._normalized && metas.length) {
            return this._cache.data = metas[0].controller.getAllParsedValues(this);
        }
        for(i = 0, ilen = metas.length; i < ilen; ++i){
            timestamps = timestamps.concat(metas[i].controller.getAllParsedValues(this));
        }
        return this._cache.data = this.normalize(timestamps);
    }
 getLabelTimestamps() {
        const timestamps = this._cache.labels || [];
        let i, ilen;
        if (timestamps.length) {
            return timestamps;
        }
        const labels = this.getLabels();
        for(i = 0, ilen = labels.length; i < ilen; ++i){
            timestamps.push(parse(this, labels[i]));
        }
        return this._cache.labels = this._normalized ? timestamps : this.normalize(timestamps);
    }
 normalize(values) {
        return (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__._)(values.sort(sorter));
    }
}

function interpolate(table, val, reverse) {
    let lo = 0;
    let hi = table.length - 1;
    let prevSource, nextSource, prevTarget, nextTarget;
    if (reverse) {
        if (val >= table[lo].pos && val <= table[hi].pos) {
            ({ lo , hi  } = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.B)(table, 'pos', val));
        }
        ({ pos: prevSource , time: prevTarget  } = table[lo]);
        ({ pos: nextSource , time: nextTarget  } = table[hi]);
    } else {
        if (val >= table[lo].time && val <= table[hi].time) {
            ({ lo , hi  } = (0,_chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.B)(table, 'time', val));
        }
        ({ time: prevSource , pos: prevTarget  } = table[lo]);
        ({ time: nextSource , pos: nextTarget  } = table[hi]);
    }
    const span = nextSource - prevSource;
    return span ? prevTarget + (nextTarget - prevTarget) * (val - prevSource) / span : prevTarget;
}
class TimeSeriesScale extends TimeScale {
    static id = 'timeseries';
 static defaults = TimeScale.defaults;
 constructor(props){
        super(props);
         this._table = [];
         this._minPos = undefined;
         this._tableRange = undefined;
    }
 initOffsets() {
        const timestamps = this._getTimestampsForTable();
        const table = this._table = this.buildLookupTable(timestamps);
        this._minPos = interpolate(table, this.min);
        this._tableRange = interpolate(table, this.max) - this._minPos;
        super.initOffsets(timestamps);
    }
 buildLookupTable(timestamps) {
        const { min , max  } = this;
        const items = [];
        const table = [];
        let i, ilen, prev, curr, next;
        for(i = 0, ilen = timestamps.length; i < ilen; ++i){
            curr = timestamps[i];
            if (curr >= min && curr <= max) {
                items.push(curr);
            }
        }
        if (items.length < 2) {
            return [
                {
                    time: min,
                    pos: 0
                },
                {
                    time: max,
                    pos: 1
                }
            ];
        }
        for(i = 0, ilen = items.length; i < ilen; ++i){
            next = items[i + 1];
            prev = items[i - 1];
            curr = items[i];
            if (Math.round((next + prev) / 2) !== curr) {
                table.push({
                    time: curr,
                    pos: i / (ilen - 1)
                });
            }
        }
        return table;
    }
 _generate() {
        const min = this.min;
        const max = this.max;
        let timestamps = super.getDataTimestamps();
        if (!timestamps.includes(min) || !timestamps.length) {
            timestamps.splice(0, 0, min);
        }
        if (!timestamps.includes(max) || timestamps.length === 1) {
            timestamps.push(max);
        }
        return timestamps.sort((a, b)=>a - b);
    }
 _getTimestampsForTable() {
        let timestamps = this._cache.all || [];
        if (timestamps.length) {
            return timestamps;
        }
        const data = this.getDataTimestamps();
        const label = this.getLabelTimestamps();
        if (data.length && label.length) {
            timestamps = this.normalize(data.concat(label));
        } else {
            timestamps = data.length ? data : label;
        }
        timestamps = this._cache.all = timestamps;
        return timestamps;
    }
 getDecimalForValue(value) {
        return (interpolate(this._table, value) - this._minPos) / this._tableRange;
    }
 getValueForPixel(pixel) {
        const offsets = this._offsets;
        const decimal = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
        return interpolate(this._table, decimal * this._tableRange + this._minPos, true);
    }
}

var scales = /*#__PURE__*/Object.freeze({
__proto__: null,
CategoryScale: CategoryScale,
LinearScale: LinearScale,
LogarithmicScale: LogarithmicScale,
RadialLinearScale: RadialLinearScale,
TimeScale: TimeScale,
TimeSeriesScale: TimeSeriesScale
});

const registerables = [
    controllers,
    elements,
    plugins,
    scales
];


//# sourceMappingURL=chart.js.map


/***/ }),

/***/ "./node_modules/chart.js/dist/chunks/helpers.dataset.js":
/*!**************************************************************!*\
  !*** ./node_modules/chart.js/dist/chunks/helpers.dataset.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ unclipArea),
/* harmony export */   A: () => (/* binding */ _rlookupByKey),
/* harmony export */   B: () => (/* binding */ _lookupByKey),
/* harmony export */   C: () => (/* binding */ _isPointInArea),
/* harmony export */   D: () => (/* binding */ getAngleFromPoint),
/* harmony export */   E: () => (/* binding */ toPadding),
/* harmony export */   F: () => (/* binding */ each),
/* harmony export */   G: () => (/* binding */ getMaximumSize),
/* harmony export */   H: () => (/* binding */ HALF_PI),
/* harmony export */   I: () => (/* binding */ _getParentNode),
/* harmony export */   J: () => (/* binding */ readUsedSize),
/* harmony export */   K: () => (/* binding */ supportsEventListenerOptions),
/* harmony export */   L: () => (/* binding */ throttled),
/* harmony export */   M: () => (/* binding */ _isDomSupported),
/* harmony export */   N: () => (/* binding */ _factorize),
/* harmony export */   O: () => (/* binding */ finiteOrDefault),
/* harmony export */   P: () => (/* binding */ PI),
/* harmony export */   Q: () => (/* binding */ callback),
/* harmony export */   R: () => (/* binding */ _addGrace),
/* harmony export */   S: () => (/* binding */ _limitValue),
/* harmony export */   T: () => (/* binding */ TAU),
/* harmony export */   U: () => (/* binding */ toDegrees),
/* harmony export */   V: () => (/* binding */ _measureText),
/* harmony export */   W: () => (/* binding */ _int16Range),
/* harmony export */   X: () => (/* binding */ _alignPixel),
/* harmony export */   Y: () => (/* binding */ clipArea),
/* harmony export */   Z: () => (/* binding */ renderText),
/* harmony export */   _: () => (/* binding */ _arrayUnique),
/* harmony export */   a: () => (/* binding */ resolve),
/* harmony export */   a$: () => (/* binding */ getStyle),
/* harmony export */   a0: () => (/* binding */ toFont),
/* harmony export */   a1: () => (/* binding */ _toLeftRightCenter),
/* harmony export */   a2: () => (/* binding */ _alignStartEnd),
/* harmony export */   a3: () => (/* binding */ overrides),
/* harmony export */   a4: () => (/* binding */ merge),
/* harmony export */   a5: () => (/* binding */ _capitalize),
/* harmony export */   a6: () => (/* binding */ descriptors),
/* harmony export */   a7: () => (/* binding */ isFunction),
/* harmony export */   a8: () => (/* binding */ _attachContext),
/* harmony export */   a9: () => (/* binding */ _createResolver),
/* harmony export */   aA: () => (/* binding */ getRtlAdapter),
/* harmony export */   aB: () => (/* binding */ overrideTextDirection),
/* harmony export */   aC: () => (/* binding */ _textX),
/* harmony export */   aD: () => (/* binding */ restoreTextDirection),
/* harmony export */   aE: () => (/* binding */ drawPointLegend),
/* harmony export */   aF: () => (/* binding */ distanceBetweenPoints),
/* harmony export */   aG: () => (/* binding */ noop),
/* harmony export */   aH: () => (/* binding */ _setMinAndMaxByKey),
/* harmony export */   aI: () => (/* binding */ niceNum),
/* harmony export */   aJ: () => (/* binding */ almostWhole),
/* harmony export */   aK: () => (/* binding */ almostEquals),
/* harmony export */   aL: () => (/* binding */ _decimalPlaces),
/* harmony export */   aM: () => (/* binding */ Ticks),
/* harmony export */   aN: () => (/* binding */ log10),
/* harmony export */   aO: () => (/* binding */ _longestText),
/* harmony export */   aP: () => (/* binding */ _filterBetween),
/* harmony export */   aQ: () => (/* binding */ _lookup),
/* harmony export */   aR: () => (/* binding */ isPatternOrGradient),
/* harmony export */   aS: () => (/* binding */ getHoverColor),
/* harmony export */   aT: () => (/* binding */ clone),
/* harmony export */   aU: () => (/* binding */ _merger),
/* harmony export */   aV: () => (/* binding */ _mergerIf),
/* harmony export */   aW: () => (/* binding */ _deprecated),
/* harmony export */   aX: () => (/* binding */ _splitKey),
/* harmony export */   aY: () => (/* binding */ toFontString),
/* harmony export */   aZ: () => (/* binding */ splineCurve),
/* harmony export */   a_: () => (/* binding */ splineCurveMonotone),
/* harmony export */   aa: () => (/* binding */ _descriptors),
/* harmony export */   ab: () => (/* binding */ mergeIf),
/* harmony export */   ac: () => (/* binding */ uid),
/* harmony export */   ad: () => (/* binding */ debounce),
/* harmony export */   ae: () => (/* binding */ retinaScale),
/* harmony export */   af: () => (/* binding */ clearCanvas),
/* harmony export */   ag: () => (/* binding */ setsEqual),
/* harmony export */   ah: () => (/* binding */ getDatasetClipArea),
/* harmony export */   ai: () => (/* binding */ _elementsEqual),
/* harmony export */   aj: () => (/* binding */ _isClickEvent),
/* harmony export */   ak: () => (/* binding */ _isBetween),
/* harmony export */   al: () => (/* binding */ _normalizeAngle),
/* harmony export */   am: () => (/* binding */ _readValueToProps),
/* harmony export */   an: () => (/* binding */ _updateBezierControlPoints),
/* harmony export */   ao: () => (/* binding */ _computeSegments),
/* harmony export */   ap: () => (/* binding */ _boundSegments),
/* harmony export */   aq: () => (/* binding */ _steppedInterpolation),
/* harmony export */   ar: () => (/* binding */ _bezierInterpolation),
/* harmony export */   as: () => (/* binding */ _pointInLine),
/* harmony export */   at: () => (/* binding */ _steppedLineTo),
/* harmony export */   au: () => (/* binding */ _bezierCurveTo),
/* harmony export */   av: () => (/* binding */ drawPoint),
/* harmony export */   aw: () => (/* binding */ addRoundedRectPath),
/* harmony export */   ax: () => (/* binding */ toTRBL),
/* harmony export */   ay: () => (/* binding */ toTRBLCorners),
/* harmony export */   az: () => (/* binding */ _boundSegment),
/* harmony export */   b: () => (/* binding */ isArray),
/* harmony export */   b0: () => (/* binding */ fontString),
/* harmony export */   b1: () => (/* binding */ toLineHeight),
/* harmony export */   b2: () => (/* binding */ PITAU),
/* harmony export */   b3: () => (/* binding */ INFINITY),
/* harmony export */   b4: () => (/* binding */ RAD_PER_DEG),
/* harmony export */   b5: () => (/* binding */ QUARTER_PI),
/* harmony export */   b6: () => (/* binding */ TWO_THIRDS_PI),
/* harmony export */   b7: () => (/* binding */ _angleDiff),
/* harmony export */   c: () => (/* binding */ color),
/* harmony export */   d: () => (/* binding */ defaults),
/* harmony export */   e: () => (/* binding */ effects),
/* harmony export */   f: () => (/* binding */ resolveObjectKey),
/* harmony export */   g: () => (/* binding */ isNumberFinite),
/* harmony export */   h: () => (/* binding */ defined),
/* harmony export */   i: () => (/* binding */ isObject),
/* harmony export */   j: () => (/* binding */ createContext),
/* harmony export */   k: () => (/* binding */ isNullOrUndef),
/* harmony export */   l: () => (/* binding */ listenArrayEvents),
/* harmony export */   m: () => (/* binding */ toPercentage),
/* harmony export */   n: () => (/* binding */ toDimension),
/* harmony export */   o: () => (/* binding */ formatNumber),
/* harmony export */   p: () => (/* binding */ _angleBetween),
/* harmony export */   q: () => (/* binding */ _getStartAndCountOfVisiblePoints),
/* harmony export */   r: () => (/* binding */ requestAnimFrame),
/* harmony export */   s: () => (/* binding */ sign),
/* harmony export */   t: () => (/* binding */ toRadians),
/* harmony export */   u: () => (/* binding */ unlistenArrayEvents),
/* harmony export */   v: () => (/* binding */ valueOrDefault),
/* harmony export */   w: () => (/* binding */ _scaleRangesChanged),
/* harmony export */   x: () => (/* binding */ isNumber),
/* harmony export */   y: () => (/* binding */ _parseObjectDataRadialScale),
/* harmony export */   z: () => (/* binding */ getRelativePosition)
/* harmony export */ });
/* harmony import */ var _kurkle_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @kurkle/color */ "./node_modules/@kurkle/color/dist/color.esm.js");
/*!
 * Chart.js v4.5.0
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */


/**
 * @namespace Chart.helpers
 */ /**
 * An empty function that can be used, for example, for optional callback.
 */ function noop() {
/* noop */ }
/**
 * Returns a unique id, sequentially generated from a global variable.
 */ const uid = (()=>{
    let id = 0;
    return ()=>id++;
})();
/**
 * Returns true if `value` is neither null nor undefined, else returns false.
 * @param value - The value to test.
 * @since 2.7.0
 */ function isNullOrUndef(value) {
    return value === null || value === undefined;
}
/**
 * Returns true if `value` is an array (including typed arrays), else returns false.
 * @param value - The value to test.
 * @function
 */ function isArray(value) {
    if (Array.isArray && Array.isArray(value)) {
        return true;
    }
    const type = Object.prototype.toString.call(value);
    if (type.slice(0, 7) === '[object' && type.slice(-6) === 'Array]') {
        return true;
    }
    return false;
}
/**
 * Returns true if `value` is an object (excluding null), else returns false.
 * @param value - The value to test.
 * @since 2.7.0
 */ function isObject(value) {
    return value !== null && Object.prototype.toString.call(value) === '[object Object]';
}
/**
 * Returns true if `value` is a finite number, else returns false
 * @param value  - The value to test.
 */ function isNumberFinite(value) {
    return (typeof value === 'number' || value instanceof Number) && isFinite(+value);
}
/**
 * Returns `value` if finite, else returns `defaultValue`.
 * @param value - The value to return if defined.
 * @param defaultValue - The value to return if `value` is not finite.
 */ function finiteOrDefault(value, defaultValue) {
    return isNumberFinite(value) ? value : defaultValue;
}
/**
 * Returns `value` if defined, else returns `defaultValue`.
 * @param value - The value to return if defined.
 * @param defaultValue - The value to return if `value` is undefined.
 */ function valueOrDefault(value, defaultValue) {
    return typeof value === 'undefined' ? defaultValue : value;
}
const toPercentage = (value, dimension)=>typeof value === 'string' && value.endsWith('%') ? parseFloat(value) / 100 : +value / dimension;
const toDimension = (value, dimension)=>typeof value === 'string' && value.endsWith('%') ? parseFloat(value) / 100 * dimension : +value;
/**
 * Calls `fn` with the given `args` in the scope defined by `thisArg` and returns the
 * value returned by `fn`. If `fn` is not a function, this method returns undefined.
 * @param fn - The function to call.
 * @param args - The arguments with which `fn` should be called.
 * @param [thisArg] - The value of `this` provided for the call to `fn`.
 */ function callback(fn, args, thisArg) {
    if (fn && typeof fn.call === 'function') {
        return fn.apply(thisArg, args);
    }
}
function each(loopable, fn, thisArg, reverse) {
    let i, len, keys;
    if (isArray(loopable)) {
        len = loopable.length;
        if (reverse) {
            for(i = len - 1; i >= 0; i--){
                fn.call(thisArg, loopable[i], i);
            }
        } else {
            for(i = 0; i < len; i++){
                fn.call(thisArg, loopable[i], i);
            }
        }
    } else if (isObject(loopable)) {
        keys = Object.keys(loopable);
        len = keys.length;
        for(i = 0; i < len; i++){
            fn.call(thisArg, loopable[keys[i]], keys[i]);
        }
    }
}
/**
 * Returns true if the `a0` and `a1` arrays have the same content, else returns false.
 * @param a0 - The array to compare
 * @param a1 - The array to compare
 * @private
 */ function _elementsEqual(a0, a1) {
    let i, ilen, v0, v1;
    if (!a0 || !a1 || a0.length !== a1.length) {
        return false;
    }
    for(i = 0, ilen = a0.length; i < ilen; ++i){
        v0 = a0[i];
        v1 = a1[i];
        if (v0.datasetIndex !== v1.datasetIndex || v0.index !== v1.index) {
            return false;
        }
    }
    return true;
}
/**
 * Returns a deep copy of `source` without keeping references on objects and arrays.
 * @param source - The value to clone.
 */ function clone(source) {
    if (isArray(source)) {
        return source.map(clone);
    }
    if (isObject(source)) {
        const target = Object.create(null);
        const keys = Object.keys(source);
        const klen = keys.length;
        let k = 0;
        for(; k < klen; ++k){
            target[keys[k]] = clone(source[keys[k]]);
        }
        return target;
    }
    return source;
}
function isValidKey(key) {
    return [
        '__proto__',
        'prototype',
        'constructor'
    ].indexOf(key) === -1;
}
/**
 * The default merger when Chart.helpers.merge is called without merger option.
 * Note(SB): also used by mergeConfig and mergeScaleConfig as fallback.
 * @private
 */ function _merger(key, target, source, options) {
    if (!isValidKey(key)) {
        return;
    }
    const tval = target[key];
    const sval = source[key];
    if (isObject(tval) && isObject(sval)) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        merge(tval, sval, options);
    } else {
        target[key] = clone(sval);
    }
}
function merge(target, source, options) {
    const sources = isArray(source) ? source : [
        source
    ];
    const ilen = sources.length;
    if (!isObject(target)) {
        return target;
    }
    options = options || {};
    const merger = options.merger || _merger;
    let current;
    for(let i = 0; i < ilen; ++i){
        current = sources[i];
        if (!isObject(current)) {
            continue;
        }
        const keys = Object.keys(current);
        for(let k = 0, klen = keys.length; k < klen; ++k){
            merger(keys[k], target, current, options);
        }
    }
    return target;
}
function mergeIf(target, source) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return merge(target, source, {
        merger: _mergerIf
    });
}
/**
 * Merges source[key] in target[key] only if target[key] is undefined.
 * @private
 */ function _mergerIf(key, target, source) {
    if (!isValidKey(key)) {
        return;
    }
    const tval = target[key];
    const sval = source[key];
    if (isObject(tval) && isObject(sval)) {
        mergeIf(tval, sval);
    } else if (!Object.prototype.hasOwnProperty.call(target, key)) {
        target[key] = clone(sval);
    }
}
/**
 * @private
 */ function _deprecated(scope, value, previous, current) {
    if (value !== undefined) {
        console.warn(scope + ': "' + previous + '" is deprecated. Please use "' + current + '" instead');
    }
}
// resolveObjectKey resolver cache
const keyResolvers = {
    // Chart.helpers.core resolveObjectKey should resolve empty key to root object
    '': (v)=>v,
    // default resolvers
    x: (o)=>o.x,
    y: (o)=>o.y
};
/**
 * @private
 */ function _splitKey(key) {
    const parts = key.split('.');
    const keys = [];
    let tmp = '';
    for (const part of parts){
        tmp += part;
        if (tmp.endsWith('\\')) {
            tmp = tmp.slice(0, -1) + '.';
        } else {
            keys.push(tmp);
            tmp = '';
        }
    }
    return keys;
}
function _getKeyResolver(key) {
    const keys = _splitKey(key);
    return (obj)=>{
        for (const k of keys){
            if (k === '') {
                break;
            }
            obj = obj && obj[k];
        }
        return obj;
    };
}
function resolveObjectKey(obj, key) {
    const resolver = keyResolvers[key] || (keyResolvers[key] = _getKeyResolver(key));
    return resolver(obj);
}
/**
 * @private
 */ function _capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const defined = (value)=>typeof value !== 'undefined';
const isFunction = (value)=>typeof value === 'function';
// Adapted from https://stackoverflow.com/questions/31128855/comparing-ecma6-sets-for-equality#31129384
const setsEqual = (a, b)=>{
    if (a.size !== b.size) {
        return false;
    }
    for (const item of a){
        if (!b.has(item)) {
            return false;
        }
    }
    return true;
};
/**
 * @param e - The event
 * @private
 */ function _isClickEvent(e) {
    return e.type === 'mouseup' || e.type === 'click' || e.type === 'contextmenu';
}

/**
 * @alias Chart.helpers.math
 * @namespace
 */ const PI = Math.PI;
const TAU = 2 * PI;
const PITAU = TAU + PI;
const INFINITY = Number.POSITIVE_INFINITY;
const RAD_PER_DEG = PI / 180;
const HALF_PI = PI / 2;
const QUARTER_PI = PI / 4;
const TWO_THIRDS_PI = PI * 2 / 3;
const log10 = Math.log10;
const sign = Math.sign;
function almostEquals(x, y, epsilon) {
    return Math.abs(x - y) < epsilon;
}
/**
 * Implementation of the nice number algorithm used in determining where axis labels will go
 */ function niceNum(range) {
    const roundedRange = Math.round(range);
    range = almostEquals(range, roundedRange, range / 1000) ? roundedRange : range;
    const niceRange = Math.pow(10, Math.floor(log10(range)));
    const fraction = range / niceRange;
    const niceFraction = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
    return niceFraction * niceRange;
}
/**
 * Returns an array of factors sorted from 1 to sqrt(value)
 * @private
 */ function _factorize(value) {
    const result = [];
    const sqrt = Math.sqrt(value);
    let i;
    for(i = 1; i < sqrt; i++){
        if (value % i === 0) {
            result.push(i);
            result.push(value / i);
        }
    }
    if (sqrt === (sqrt | 0)) {
        result.push(sqrt);
    }
    result.sort((a, b)=>a - b).pop();
    return result;
}
/**
 * Verifies that attempting to coerce n to string or number won't throw a TypeError.
 */ function isNonPrimitive(n) {
    return typeof n === 'symbol' || typeof n === 'object' && n !== null && !(Symbol.toPrimitive in n || 'toString' in n || 'valueOf' in n);
}
function isNumber(n) {
    return !isNonPrimitive(n) && !isNaN(parseFloat(n)) && isFinite(n);
}
function almostWhole(x, epsilon) {
    const rounded = Math.round(x);
    return rounded - epsilon <= x && rounded + epsilon >= x;
}
/**
 * @private
 */ function _setMinAndMaxByKey(array, target, property) {
    let i, ilen, value;
    for(i = 0, ilen = array.length; i < ilen; i++){
        value = array[i][property];
        if (!isNaN(value)) {
            target.min = Math.min(target.min, value);
            target.max = Math.max(target.max, value);
        }
    }
}
function toRadians(degrees) {
    return degrees * (PI / 180);
}
function toDegrees(radians) {
    return radians * (180 / PI);
}
/**
 * Returns the number of decimal places
 * i.e. the number of digits after the decimal point, of the value of this Number.
 * @param x - A number.
 * @returns The number of decimal places.
 * @private
 */ function _decimalPlaces(x) {
    if (!isNumberFinite(x)) {
        return;
    }
    let e = 1;
    let p = 0;
    while(Math.round(x * e) / e !== x){
        e *= 10;
        p++;
    }
    return p;
}
// Gets the angle from vertical upright to the point about a centre.
function getAngleFromPoint(centrePoint, anglePoint) {
    const distanceFromXCenter = anglePoint.x - centrePoint.x;
    const distanceFromYCenter = anglePoint.y - centrePoint.y;
    const radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);
    let angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);
    if (angle < -0.5 * PI) {
        angle += TAU; // make sure the returned angle is in the range of (-PI/2, 3PI/2]
    }
    return {
        angle,
        distance: radialDistanceFromCenter
    };
}
function distanceBetweenPoints(pt1, pt2) {
    return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
}
/**
 * Shortest distance between angles, in either direction.
 * @private
 */ function _angleDiff(a, b) {
    return (a - b + PITAU) % TAU - PI;
}
/**
 * Normalize angle to be between 0 and 2*PI
 * @private
 */ function _normalizeAngle(a) {
    return (a % TAU + TAU) % TAU;
}
/**
 * @private
 */ function _angleBetween(angle, start, end, sameAngleIsFullCircle) {
    const a = _normalizeAngle(angle);
    const s = _normalizeAngle(start);
    const e = _normalizeAngle(end);
    const angleToStart = _normalizeAngle(s - a);
    const angleToEnd = _normalizeAngle(e - a);
    const startToAngle = _normalizeAngle(a - s);
    const endToAngle = _normalizeAngle(a - e);
    return a === s || a === e || sameAngleIsFullCircle && s === e || angleToStart > angleToEnd && startToAngle < endToAngle;
}
/**
 * Limit `value` between `min` and `max`
 * @param value
 * @param min
 * @param max
 * @private
 */ function _limitValue(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
/**
 * @param {number} value
 * @private
 */ function _int16Range(value) {
    return _limitValue(value, -32768, 32767);
}
/**
 * @param value
 * @param start
 * @param end
 * @param [epsilon]
 * @private
 */ function _isBetween(value, start, end, epsilon = 1e-6) {
    return value >= Math.min(start, end) - epsilon && value <= Math.max(start, end) + epsilon;
}

function _lookup(table, value, cmp) {
    cmp = cmp || ((index)=>table[index] < value);
    let hi = table.length - 1;
    let lo = 0;
    let mid;
    while(hi - lo > 1){
        mid = lo + hi >> 1;
        if (cmp(mid)) {
            lo = mid;
        } else {
            hi = mid;
        }
    }
    return {
        lo,
        hi
    };
}
/**
 * Binary search
 * @param table - the table search. must be sorted!
 * @param key - property name for the value in each entry
 * @param value - value to find
 * @param last - lookup last index
 * @private
 */ const _lookupByKey = (table, key, value, last)=>_lookup(table, value, last ? (index)=>{
        const ti = table[index][key];
        return ti < value || ti === value && table[index + 1][key] === value;
    } : (index)=>table[index][key] < value);
/**
 * Reverse binary search
 * @param table - the table search. must be sorted!
 * @param key - property name for the value in each entry
 * @param value - value to find
 * @private
 */ const _rlookupByKey = (table, key, value)=>_lookup(table, value, (index)=>table[index][key] >= value);
/**
 * Return subset of `values` between `min` and `max` inclusive.
 * Values are assumed to be in sorted order.
 * @param values - sorted array of values
 * @param min - min value
 * @param max - max value
 */ function _filterBetween(values, min, max) {
    let start = 0;
    let end = values.length;
    while(start < end && values[start] < min){
        start++;
    }
    while(end > start && values[end - 1] > max){
        end--;
    }
    return start > 0 || end < values.length ? values.slice(start, end) : values;
}
const arrayEvents = [
    'push',
    'pop',
    'shift',
    'splice',
    'unshift'
];
function listenArrayEvents(array, listener) {
    if (array._chartjs) {
        array._chartjs.listeners.push(listener);
        return;
    }
    Object.defineProperty(array, '_chartjs', {
        configurable: true,
        enumerable: false,
        value: {
            listeners: [
                listener
            ]
        }
    });
    arrayEvents.forEach((key)=>{
        const method = '_onData' + _capitalize(key);
        const base = array[key];
        Object.defineProperty(array, key, {
            configurable: true,
            enumerable: false,
            value (...args) {
                const res = base.apply(this, args);
                array._chartjs.listeners.forEach((object)=>{
                    if (typeof object[method] === 'function') {
                        object[method](...args);
                    }
                });
                return res;
            }
        });
    });
}
function unlistenArrayEvents(array, listener) {
    const stub = array._chartjs;
    if (!stub) {
        return;
    }
    const listeners = stub.listeners;
    const index = listeners.indexOf(listener);
    if (index !== -1) {
        listeners.splice(index, 1);
    }
    if (listeners.length > 0) {
        return;
    }
    arrayEvents.forEach((key)=>{
        delete array[key];
    });
    delete array._chartjs;
}
/**
 * @param items
 */ function _arrayUnique(items) {
    const set = new Set(items);
    if (set.size === items.length) {
        return items;
    }
    return Array.from(set);
}

function fontString(pixelSize, fontStyle, fontFamily) {
    return fontStyle + ' ' + pixelSize + 'px ' + fontFamily;
}
/**
* Request animation polyfill
*/ const requestAnimFrame = function() {
    if (typeof window === 'undefined') {
        return function(callback) {
            return callback();
        };
    }
    return window.requestAnimationFrame;
}();
/**
 * Throttles calling `fn` once per animation frame
 * Latest arguments are used on the actual call
 */ function throttled(fn, thisArg) {
    let argsToUse = [];
    let ticking = false;
    return function(...args) {
        // Save the args for use later
        argsToUse = args;
        if (!ticking) {
            ticking = true;
            requestAnimFrame.call(window, ()=>{
                ticking = false;
                fn.apply(thisArg, argsToUse);
            });
        }
    };
}
/**
 * Debounces calling `fn` for `delay` ms
 */ function debounce(fn, delay) {
    let timeout;
    return function(...args) {
        if (delay) {
            clearTimeout(timeout);
            timeout = setTimeout(fn, delay, args);
        } else {
            fn.apply(this, args);
        }
        return delay;
    };
}
/**
 * Converts 'start' to 'left', 'end' to 'right' and others to 'center'
 * @private
 */ const _toLeftRightCenter = (align)=>align === 'start' ? 'left' : align === 'end' ? 'right' : 'center';
/**
 * Returns `start`, `end` or `(start + end) / 2` depending on `align`. Defaults to `center`
 * @private
 */ const _alignStartEnd = (align, start, end)=>align === 'start' ? start : align === 'end' ? end : (start + end) / 2;
/**
 * Returns `left`, `right` or `(left + right) / 2` depending on `align`. Defaults to `left`
 * @private
 */ const _textX = (align, left, right, rtl)=>{
    const check = rtl ? 'left' : 'right';
    return align === check ? right : align === 'center' ? (left + right) / 2 : left;
};
/**
 * Return start and count of visible points.
 * @private
 */ function _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled) {
    const pointCount = points.length;
    let start = 0;
    let count = pointCount;
    if (meta._sorted) {
        const { iScale , vScale , _parsed  } = meta;
        const spanGaps = meta.dataset ? meta.dataset.options ? meta.dataset.options.spanGaps : null : null;
        const axis = iScale.axis;
        const { min , max , minDefined , maxDefined  } = iScale.getUserBounds();
        if (minDefined) {
            start = Math.min(// @ts-expect-error Need to type _parsed
            _lookupByKey(_parsed, axis, min).lo, // @ts-expect-error Need to fix types on _lookupByKey
            animationsDisabled ? pointCount : _lookupByKey(points, axis, iScale.getPixelForValue(min)).lo);
            if (spanGaps) {
                const distanceToDefinedLo = _parsed.slice(0, start + 1).reverse().findIndex((point)=>!isNullOrUndef(point[vScale.axis]));
                start -= Math.max(0, distanceToDefinedLo);
            }
            start = _limitValue(start, 0, pointCount - 1);
        }
        if (maxDefined) {
            let end = Math.max(// @ts-expect-error Need to type _parsed
            _lookupByKey(_parsed, iScale.axis, max, true).hi + 1, // @ts-expect-error Need to fix types on _lookupByKey
            animationsDisabled ? 0 : _lookupByKey(points, axis, iScale.getPixelForValue(max), true).hi + 1);
            if (spanGaps) {
                const distanceToDefinedHi = _parsed.slice(end - 1).findIndex((point)=>!isNullOrUndef(point[vScale.axis]));
                end += Math.max(0, distanceToDefinedHi);
            }
            count = _limitValue(end, start, pointCount) - start;
        } else {
            count = pointCount - start;
        }
    }
    return {
        start,
        count
    };
}
/**
 * Checks if the scale ranges have changed.
 * @param {object} meta - dataset meta.
 * @returns {boolean}
 * @private
 */ function _scaleRangesChanged(meta) {
    const { xScale , yScale , _scaleRanges  } = meta;
    const newRanges = {
        xmin: xScale.min,
        xmax: xScale.max,
        ymin: yScale.min,
        ymax: yScale.max
    };
    if (!_scaleRanges) {
        meta._scaleRanges = newRanges;
        return true;
    }
    const changed = _scaleRanges.xmin !== xScale.min || _scaleRanges.xmax !== xScale.max || _scaleRanges.ymin !== yScale.min || _scaleRanges.ymax !== yScale.max;
    Object.assign(_scaleRanges, newRanges);
    return changed;
}

const atEdge = (t)=>t === 0 || t === 1;
const elasticIn = (t, s, p)=>-(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * TAU / p));
const elasticOut = (t, s, p)=>Math.pow(2, -10 * t) * Math.sin((t - s) * TAU / p) + 1;
/**
 * Easing functions adapted from Robert Penner's easing equations.
 * @namespace Chart.helpers.easing.effects
 * @see http://www.robertpenner.com/easing/
 */ const effects = {
    linear: (t)=>t,
    easeInQuad: (t)=>t * t,
    easeOutQuad: (t)=>-t * (t - 2),
    easeInOutQuad: (t)=>(t /= 0.5) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1),
    easeInCubic: (t)=>t * t * t,
    easeOutCubic: (t)=>(t -= 1) * t * t + 1,
    easeInOutCubic: (t)=>(t /= 0.5) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2),
    easeInQuart: (t)=>t * t * t * t,
    easeOutQuart: (t)=>-((t -= 1) * t * t * t - 1),
    easeInOutQuart: (t)=>(t /= 0.5) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2),
    easeInQuint: (t)=>t * t * t * t * t,
    easeOutQuint: (t)=>(t -= 1) * t * t * t * t + 1,
    easeInOutQuint: (t)=>(t /= 0.5) < 1 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2) * t * t * t * t + 2),
    easeInSine: (t)=>-Math.cos(t * HALF_PI) + 1,
    easeOutSine: (t)=>Math.sin(t * HALF_PI),
    easeInOutSine: (t)=>-0.5 * (Math.cos(PI * t) - 1),
    easeInExpo: (t)=>t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
    easeOutExpo: (t)=>t === 1 ? 1 : -Math.pow(2, -10 * t) + 1,
    easeInOutExpo: (t)=>atEdge(t) ? t : t < 0.5 ? 0.5 * Math.pow(2, 10 * (t * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (t * 2 - 1)) + 2),
    easeInCirc: (t)=>t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1),
    easeOutCirc: (t)=>Math.sqrt(1 - (t -= 1) * t),
    easeInOutCirc: (t)=>(t /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
    easeInElastic: (t)=>atEdge(t) ? t : elasticIn(t, 0.075, 0.3),
    easeOutElastic: (t)=>atEdge(t) ? t : elasticOut(t, 0.075, 0.3),
    easeInOutElastic (t) {
        const s = 0.1125;
        const p = 0.45;
        return atEdge(t) ? t : t < 0.5 ? 0.5 * elasticIn(t * 2, s, p) : 0.5 + 0.5 * elasticOut(t * 2 - 1, s, p);
    },
    easeInBack (t) {
        const s = 1.70158;
        return t * t * ((s + 1) * t - s);
    },
    easeOutBack (t) {
        const s = 1.70158;
        return (t -= 1) * t * ((s + 1) * t + s) + 1;
    },
    easeInOutBack (t) {
        let s = 1.70158;
        if ((t /= 0.5) < 1) {
            return 0.5 * (t * t * (((s *= 1.525) + 1) * t - s));
        }
        return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
    },
    easeInBounce: (t)=>1 - effects.easeOutBounce(1 - t),
    easeOutBounce (t) {
        const m = 7.5625;
        const d = 2.75;
        if (t < 1 / d) {
            return m * t * t;
        }
        if (t < 2 / d) {
            return m * (t -= 1.5 / d) * t + 0.75;
        }
        if (t < 2.5 / d) {
            return m * (t -= 2.25 / d) * t + 0.9375;
        }
        return m * (t -= 2.625 / d) * t + 0.984375;
    },
    easeInOutBounce: (t)=>t < 0.5 ? effects.easeInBounce(t * 2) * 0.5 : effects.easeOutBounce(t * 2 - 1) * 0.5 + 0.5
};

function isPatternOrGradient(value) {
    if (value && typeof value === 'object') {
        const type = value.toString();
        return type === '[object CanvasPattern]' || type === '[object CanvasGradient]';
    }
    return false;
}
function color(value) {
    return isPatternOrGradient(value) ? value : new _kurkle_color__WEBPACK_IMPORTED_MODULE_0__.Color(value);
}
function getHoverColor(value) {
    return isPatternOrGradient(value) ? value : new _kurkle_color__WEBPACK_IMPORTED_MODULE_0__.Color(value).saturate(0.5).darken(0.1).hexString();
}

const numbers = [
    'x',
    'y',
    'borderWidth',
    'radius',
    'tension'
];
const colors = [
    'color',
    'borderColor',
    'backgroundColor'
];
function applyAnimationsDefaults(defaults) {
    defaults.set('animation', {
        delay: undefined,
        duration: 1000,
        easing: 'easeOutQuart',
        fn: undefined,
        from: undefined,
        loop: undefined,
        to: undefined,
        type: undefined
    });
    defaults.describe('animation', {
        _fallback: false,
        _indexable: false,
        _scriptable: (name)=>name !== 'onProgress' && name !== 'onComplete' && name !== 'fn'
    });
    defaults.set('animations', {
        colors: {
            type: 'color',
            properties: colors
        },
        numbers: {
            type: 'number',
            properties: numbers
        }
    });
    defaults.describe('animations', {
        _fallback: 'animation'
    });
    defaults.set('transitions', {
        active: {
            animation: {
                duration: 400
            }
        },
        resize: {
            animation: {
                duration: 0
            }
        },
        show: {
            animations: {
                colors: {
                    from: 'transparent'
                },
                visible: {
                    type: 'boolean',
                    duration: 0
                }
            }
        },
        hide: {
            animations: {
                colors: {
                    to: 'transparent'
                },
                visible: {
                    type: 'boolean',
                    easing: 'linear',
                    fn: (v)=>v | 0
                }
            }
        }
    });
}

function applyLayoutsDefaults(defaults) {
    defaults.set('layout', {
        autoPadding: true,
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    });
}

const intlCache = new Map();
function getNumberFormat(locale, options) {
    options = options || {};
    const cacheKey = locale + JSON.stringify(options);
    let formatter = intlCache.get(cacheKey);
    if (!formatter) {
        formatter = new Intl.NumberFormat(locale, options);
        intlCache.set(cacheKey, formatter);
    }
    return formatter;
}
function formatNumber(num, locale, options) {
    return getNumberFormat(locale, options).format(num);
}

const formatters = {
 values (value) {
        return isArray(value) ?  value : '' + value;
    },
 numeric (tickValue, index, ticks) {
        if (tickValue === 0) {
            return '0';
        }
        const locale = this.chart.options.locale;
        let notation;
        let delta = tickValue;
        if (ticks.length > 1) {
            const maxTick = Math.max(Math.abs(ticks[0].value), Math.abs(ticks[ticks.length - 1].value));
            if (maxTick < 1e-4 || maxTick > 1e+15) {
                notation = 'scientific';
            }
            delta = calculateDelta(tickValue, ticks);
        }
        const logDelta = log10(Math.abs(delta));
        const numDecimal = isNaN(logDelta) ? 1 : Math.max(Math.min(-1 * Math.floor(logDelta), 20), 0);
        const options = {
            notation,
            minimumFractionDigits: numDecimal,
            maximumFractionDigits: numDecimal
        };
        Object.assign(options, this.options.ticks.format);
        return formatNumber(tickValue, locale, options);
    },
 logarithmic (tickValue, index, ticks) {
        if (tickValue === 0) {
            return '0';
        }
        const remain = ticks[index].significand || tickValue / Math.pow(10, Math.floor(log10(tickValue)));
        if ([
            1,
            2,
            3,
            5,
            10,
            15
        ].includes(remain) || index > 0.8 * ticks.length) {
            return formatters.numeric.call(this, tickValue, index, ticks);
        }
        return '';
    }
};
function calculateDelta(tickValue, ticks) {
    let delta = ticks.length > 3 ? ticks[2].value - ticks[1].value : ticks[1].value - ticks[0].value;
    if (Math.abs(delta) >= 1 && tickValue !== Math.floor(tickValue)) {
        delta = tickValue - Math.floor(tickValue);
    }
    return delta;
}
 var Ticks = {
    formatters
};

function applyScaleDefaults(defaults) {
    defaults.set('scale', {
        display: true,
        offset: false,
        reverse: false,
        beginAtZero: false,
 bounds: 'ticks',
        clip: true,
 grace: 0,
        grid: {
            display: true,
            lineWidth: 1,
            drawOnChartArea: true,
            drawTicks: true,
            tickLength: 8,
            tickWidth: (_ctx, options)=>options.lineWidth,
            tickColor: (_ctx, options)=>options.color,
            offset: false
        },
        border: {
            display: true,
            dash: [],
            dashOffset: 0.0,
            width: 1
        },
        title: {
            display: false,
            text: '',
            padding: {
                top: 4,
                bottom: 4
            }
        },
        ticks: {
            minRotation: 0,
            maxRotation: 50,
            mirror: false,
            textStrokeWidth: 0,
            textStrokeColor: '',
            padding: 3,
            display: true,
            autoSkip: true,
            autoSkipPadding: 3,
            labelOffset: 0,
            callback: Ticks.formatters.values,
            minor: {},
            major: {},
            align: 'center',
            crossAlign: 'near',
            showLabelBackdrop: false,
            backdropColor: 'rgba(255, 255, 255, 0.75)',
            backdropPadding: 2
        }
    });
    defaults.route('scale.ticks', 'color', '', 'color');
    defaults.route('scale.grid', 'color', '', 'borderColor');
    defaults.route('scale.border', 'color', '', 'borderColor');
    defaults.route('scale.title', 'color', '', 'color');
    defaults.describe('scale', {
        _fallback: false,
        _scriptable: (name)=>!name.startsWith('before') && !name.startsWith('after') && name !== 'callback' && name !== 'parser',
        _indexable: (name)=>name !== 'borderDash' && name !== 'tickBorderDash' && name !== 'dash'
    });
    defaults.describe('scales', {
        _fallback: 'scale'
    });
    defaults.describe('scale.ticks', {
        _scriptable: (name)=>name !== 'backdropPadding' && name !== 'callback',
        _indexable: (name)=>name !== 'backdropPadding'
    });
}

const overrides = Object.create(null);
const descriptors = Object.create(null);
 function getScope$1(node, key) {
    if (!key) {
        return node;
    }
    const keys = key.split('.');
    for(let i = 0, n = keys.length; i < n; ++i){
        const k = keys[i];
        node = node[k] || (node[k] = Object.create(null));
    }
    return node;
}
function set(root, scope, values) {
    if (typeof scope === 'string') {
        return merge(getScope$1(root, scope), values);
    }
    return merge(getScope$1(root, ''), scope);
}
 class Defaults {
    constructor(_descriptors, _appliers){
        this.animation = undefined;
        this.backgroundColor = 'rgba(0,0,0,0.1)';
        this.borderColor = 'rgba(0,0,0,0.1)';
        this.color = '#666';
        this.datasets = {};
        this.devicePixelRatio = (context)=>context.chart.platform.getDevicePixelRatio();
        this.elements = {};
        this.events = [
            'mousemove',
            'mouseout',
            'click',
            'touchstart',
            'touchmove'
        ];
        this.font = {
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            size: 12,
            style: 'normal',
            lineHeight: 1.2,
            weight: null
        };
        this.hover = {};
        this.hoverBackgroundColor = (ctx, options)=>getHoverColor(options.backgroundColor);
        this.hoverBorderColor = (ctx, options)=>getHoverColor(options.borderColor);
        this.hoverColor = (ctx, options)=>getHoverColor(options.color);
        this.indexAxis = 'x';
        this.interaction = {
            mode: 'nearest',
            intersect: true,
            includeInvisible: false
        };
        this.maintainAspectRatio = true;
        this.onHover = null;
        this.onClick = null;
        this.parsing = true;
        this.plugins = {};
        this.responsive = true;
        this.scale = undefined;
        this.scales = {};
        this.showLine = true;
        this.drawActiveElementsOnTop = true;
        this.describe(_descriptors);
        this.apply(_appliers);
    }
 set(scope, values) {
        return set(this, scope, values);
    }
 get(scope) {
        return getScope$1(this, scope);
    }
 describe(scope, values) {
        return set(descriptors, scope, values);
    }
    override(scope, values) {
        return set(overrides, scope, values);
    }
 route(scope, name, targetScope, targetName) {
        const scopeObject = getScope$1(this, scope);
        const targetScopeObject = getScope$1(this, targetScope);
        const privateName = '_' + name;
        Object.defineProperties(scopeObject, {
            [privateName]: {
                value: scopeObject[name],
                writable: true
            },
            [name]: {
                enumerable: true,
                get () {
                    const local = this[privateName];
                    const target = targetScopeObject[targetName];
                    if (isObject(local)) {
                        return Object.assign({}, target, local);
                    }
                    return valueOrDefault(local, target);
                },
                set (value) {
                    this[privateName] = value;
                }
            }
        });
    }
    apply(appliers) {
        appliers.forEach((apply)=>apply(this));
    }
}
var defaults = /* #__PURE__ */ new Defaults({
    _scriptable: (name)=>!name.startsWith('on'),
    _indexable: (name)=>name !== 'events',
    hover: {
        _fallback: 'interaction'
    },
    interaction: {
        _scriptable: false,
        _indexable: false
    }
}, [
    applyAnimationsDefaults,
    applyLayoutsDefaults,
    applyScaleDefaults
]);

/**
 * Converts the given font object into a CSS font string.
 * @param font - A font object.
 * @return The CSS font string. See https://developer.mozilla.org/en-US/docs/Web/CSS/font
 * @private
 */ function toFontString(font) {
    if (!font || isNullOrUndef(font.size) || isNullOrUndef(font.family)) {
        return null;
    }
    return (font.style ? font.style + ' ' : '') + (font.weight ? font.weight + ' ' : '') + font.size + 'px ' + font.family;
}
/**
 * @private
 */ function _measureText(ctx, data, gc, longest, string) {
    let textWidth = data[string];
    if (!textWidth) {
        textWidth = data[string] = ctx.measureText(string).width;
        gc.push(string);
    }
    if (textWidth > longest) {
        longest = textWidth;
    }
    return longest;
}
/**
 * @private
 */ // eslint-disable-next-line complexity
function _longestText(ctx, font, arrayOfThings, cache) {
    cache = cache || {};
    let data = cache.data = cache.data || {};
    let gc = cache.garbageCollect = cache.garbageCollect || [];
    if (cache.font !== font) {
        data = cache.data = {};
        gc = cache.garbageCollect = [];
        cache.font = font;
    }
    ctx.save();
    ctx.font = font;
    let longest = 0;
    const ilen = arrayOfThings.length;
    let i, j, jlen, thing, nestedThing;
    for(i = 0; i < ilen; i++){
        thing = arrayOfThings[i];
        // Undefined strings and arrays should not be measured
        if (thing !== undefined && thing !== null && !isArray(thing)) {
            longest = _measureText(ctx, data, gc, longest, thing);
        } else if (isArray(thing)) {
            // if it is an array lets measure each element
            // to do maybe simplify this function a bit so we can do this more recursively?
            for(j = 0, jlen = thing.length; j < jlen; j++){
                nestedThing = thing[j];
                // Undefined strings and arrays should not be measured
                if (nestedThing !== undefined && nestedThing !== null && !isArray(nestedThing)) {
                    longest = _measureText(ctx, data, gc, longest, nestedThing);
                }
            }
        }
    }
    ctx.restore();
    const gcLen = gc.length / 2;
    if (gcLen > arrayOfThings.length) {
        for(i = 0; i < gcLen; i++){
            delete data[gc[i]];
        }
        gc.splice(0, gcLen);
    }
    return longest;
}
/**
 * Returns the aligned pixel value to avoid anti-aliasing blur
 * @param chart - The chart instance.
 * @param pixel - A pixel value.
 * @param width - The width of the element.
 * @returns The aligned pixel value.
 * @private
 */ function _alignPixel(chart, pixel, width) {
    const devicePixelRatio = chart.currentDevicePixelRatio;
    const halfWidth = width !== 0 ? Math.max(width / 2, 0.5) : 0;
    return Math.round((pixel - halfWidth) * devicePixelRatio) / devicePixelRatio + halfWidth;
}
/**
 * Clears the entire canvas.
 */ function clearCanvas(canvas, ctx) {
    if (!ctx && !canvas) {
        return;
    }
    ctx = ctx || canvas.getContext('2d');
    ctx.save();
    // canvas.width and canvas.height do not consider the canvas transform,
    // while clearRect does
    ctx.resetTransform();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}
function drawPoint(ctx, options, x, y) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    drawPointLegend(ctx, options, x, y, null);
}
// eslint-disable-next-line complexity
function drawPointLegend(ctx, options, x, y, w) {
    let type, xOffset, yOffset, size, cornerRadius, width, xOffsetW, yOffsetW;
    const style = options.pointStyle;
    const rotation = options.rotation;
    const radius = options.radius;
    let rad = (rotation || 0) * RAD_PER_DEG;
    if (style && typeof style === 'object') {
        type = style.toString();
        if (type === '[object HTMLImageElement]' || type === '[object HTMLCanvasElement]') {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rad);
            ctx.drawImage(style, -style.width / 2, -style.height / 2, style.width, style.height);
            ctx.restore();
            return;
        }
    }
    if (isNaN(radius) || radius <= 0) {
        return;
    }
    ctx.beginPath();
    switch(style){
        // Default includes circle
        default:
            if (w) {
                ctx.ellipse(x, y, w / 2, radius, 0, 0, TAU);
            } else {
                ctx.arc(x, y, radius, 0, TAU);
            }
            ctx.closePath();
            break;
        case 'triangle':
            width = w ? w / 2 : radius;
            ctx.moveTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
            rad += TWO_THIRDS_PI;
            ctx.lineTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
            rad += TWO_THIRDS_PI;
            ctx.lineTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
            ctx.closePath();
            break;
        case 'rectRounded':
            // NOTE: the rounded rect implementation changed to use `arc` instead of
            // `quadraticCurveTo` since it generates better results when rect is
            // almost a circle. 0.516 (instead of 0.5) produces results with visually
            // closer proportion to the previous impl and it is inscribed in the
            // circle with `radius`. For more details, see the following PRs:
            // https://github.com/chartjs/Chart.js/issues/5597
            // https://github.com/chartjs/Chart.js/issues/5858
            cornerRadius = radius * 0.516;
            size = radius - cornerRadius;
            xOffset = Math.cos(rad + QUARTER_PI) * size;
            xOffsetW = Math.cos(rad + QUARTER_PI) * (w ? w / 2 - cornerRadius : size);
            yOffset = Math.sin(rad + QUARTER_PI) * size;
            yOffsetW = Math.sin(rad + QUARTER_PI) * (w ? w / 2 - cornerRadius : size);
            ctx.arc(x - xOffsetW, y - yOffset, cornerRadius, rad - PI, rad - HALF_PI);
            ctx.arc(x + yOffsetW, y - xOffset, cornerRadius, rad - HALF_PI, rad);
            ctx.arc(x + xOffsetW, y + yOffset, cornerRadius, rad, rad + HALF_PI);
            ctx.arc(x - yOffsetW, y + xOffset, cornerRadius, rad + HALF_PI, rad + PI);
            ctx.closePath();
            break;
        case 'rect':
            if (!rotation) {
                size = Math.SQRT1_2 * radius;
                width = w ? w / 2 : size;
                ctx.rect(x - width, y - size, 2 * width, 2 * size);
                break;
            }
            rad += QUARTER_PI;
        /* falls through */ case 'rectRot':
            xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
            xOffset = Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
            ctx.moveTo(x - xOffsetW, y - yOffset);
            ctx.lineTo(x + yOffsetW, y - xOffset);
            ctx.lineTo(x + xOffsetW, y + yOffset);
            ctx.lineTo(x - yOffsetW, y + xOffset);
            ctx.closePath();
            break;
        case 'crossRot':
            rad += QUARTER_PI;
        /* falls through */ case 'cross':
            xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
            xOffset = Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
            ctx.moveTo(x - xOffsetW, y - yOffset);
            ctx.lineTo(x + xOffsetW, y + yOffset);
            ctx.moveTo(x + yOffsetW, y - xOffset);
            ctx.lineTo(x - yOffsetW, y + xOffset);
            break;
        case 'star':
            xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
            xOffset = Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
            ctx.moveTo(x - xOffsetW, y - yOffset);
            ctx.lineTo(x + xOffsetW, y + yOffset);
            ctx.moveTo(x + yOffsetW, y - xOffset);
            ctx.lineTo(x - yOffsetW, y + xOffset);
            rad += QUARTER_PI;
            xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
            xOffset = Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
            ctx.moveTo(x - xOffsetW, y - yOffset);
            ctx.lineTo(x + xOffsetW, y + yOffset);
            ctx.moveTo(x + yOffsetW, y - xOffset);
            ctx.lineTo(x - yOffsetW, y + xOffset);
            break;
        case 'line':
            xOffset = w ? w / 2 : Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            ctx.moveTo(x - xOffset, y - yOffset);
            ctx.lineTo(x + xOffset, y + yOffset);
            break;
        case 'dash':
            ctx.moveTo(x, y);
            ctx.lineTo(x + Math.cos(rad) * (w ? w / 2 : radius), y + Math.sin(rad) * radius);
            break;
        case false:
            ctx.closePath();
            break;
    }
    ctx.fill();
    if (options.borderWidth > 0) {
        ctx.stroke();
    }
}
/**
 * Returns true if the point is inside the rectangle
 * @param point - The point to test
 * @param area - The rectangle
 * @param margin - allowed margin
 * @private
 */ function _isPointInArea(point, area, margin) {
    margin = margin || 0.5; // margin - default is to match rounded decimals
    return !area || point && point.x > area.left - margin && point.x < area.right + margin && point.y > area.top - margin && point.y < area.bottom + margin;
}
function clipArea(ctx, area) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
    ctx.clip();
}
function unclipArea(ctx) {
    ctx.restore();
}
/**
 * @private
 */ function _steppedLineTo(ctx, previous, target, flip, mode) {
    if (!previous) {
        return ctx.lineTo(target.x, target.y);
    }
    if (mode === 'middle') {
        const midpoint = (previous.x + target.x) / 2.0;
        ctx.lineTo(midpoint, previous.y);
        ctx.lineTo(midpoint, target.y);
    } else if (mode === 'after' !== !!flip) {
        ctx.lineTo(previous.x, target.y);
    } else {
        ctx.lineTo(target.x, previous.y);
    }
    ctx.lineTo(target.x, target.y);
}
/**
 * @private
 */ function _bezierCurveTo(ctx, previous, target, flip) {
    if (!previous) {
        return ctx.lineTo(target.x, target.y);
    }
    ctx.bezierCurveTo(flip ? previous.cp1x : previous.cp2x, flip ? previous.cp1y : previous.cp2y, flip ? target.cp2x : target.cp1x, flip ? target.cp2y : target.cp1y, target.x, target.y);
}
function setRenderOpts(ctx, opts) {
    if (opts.translation) {
        ctx.translate(opts.translation[0], opts.translation[1]);
    }
    if (!isNullOrUndef(opts.rotation)) {
        ctx.rotate(opts.rotation);
    }
    if (opts.color) {
        ctx.fillStyle = opts.color;
    }
    if (opts.textAlign) {
        ctx.textAlign = opts.textAlign;
    }
    if (opts.textBaseline) {
        ctx.textBaseline = opts.textBaseline;
    }
}
function decorateText(ctx, x, y, line, opts) {
    if (opts.strikethrough || opts.underline) {
        /**
     * Now that IE11 support has been dropped, we can use more
     * of the TextMetrics object. The actual bounding boxes
     * are unflagged in Chrome, Firefox, Edge, and Safari so they
     * can be safely used.
     * See https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics#Browser_compatibility
     */ const metrics = ctx.measureText(line);
        const left = x - metrics.actualBoundingBoxLeft;
        const right = x + metrics.actualBoundingBoxRight;
        const top = y - metrics.actualBoundingBoxAscent;
        const bottom = y + metrics.actualBoundingBoxDescent;
        const yDecoration = opts.strikethrough ? (top + bottom) / 2 : bottom;
        ctx.strokeStyle = ctx.fillStyle;
        ctx.beginPath();
        ctx.lineWidth = opts.decorationWidth || 2;
        ctx.moveTo(left, yDecoration);
        ctx.lineTo(right, yDecoration);
        ctx.stroke();
    }
}
function drawBackdrop(ctx, opts) {
    const oldColor = ctx.fillStyle;
    ctx.fillStyle = opts.color;
    ctx.fillRect(opts.left, opts.top, opts.width, opts.height);
    ctx.fillStyle = oldColor;
}
/**
 * Render text onto the canvas
 */ function renderText(ctx, text, x, y, font, opts = {}) {
    const lines = isArray(text) ? text : [
        text
    ];
    const stroke = opts.strokeWidth > 0 && opts.strokeColor !== '';
    let i, line;
    ctx.save();
    ctx.font = font.string;
    setRenderOpts(ctx, opts);
    for(i = 0; i < lines.length; ++i){
        line = lines[i];
        if (opts.backdrop) {
            drawBackdrop(ctx, opts.backdrop);
        }
        if (stroke) {
            if (opts.strokeColor) {
                ctx.strokeStyle = opts.strokeColor;
            }
            if (!isNullOrUndef(opts.strokeWidth)) {
                ctx.lineWidth = opts.strokeWidth;
            }
            ctx.strokeText(line, x, y, opts.maxWidth);
        }
        ctx.fillText(line, x, y, opts.maxWidth);
        decorateText(ctx, x, y, line, opts);
        y += Number(font.lineHeight);
    }
    ctx.restore();
}
/**
 * Add a path of a rectangle with rounded corners to the current sub-path
 * @param ctx - Context
 * @param rect - Bounding rect
 */ function addRoundedRectPath(ctx, rect) {
    const { x , y , w , h , radius  } = rect;
    // top left arc
    ctx.arc(x + radius.topLeft, y + radius.topLeft, radius.topLeft, 1.5 * PI, PI, true);
    // line from top left to bottom left
    ctx.lineTo(x, y + h - radius.bottomLeft);
    // bottom left arc
    ctx.arc(x + radius.bottomLeft, y + h - radius.bottomLeft, radius.bottomLeft, PI, HALF_PI, true);
    // line from bottom left to bottom right
    ctx.lineTo(x + w - radius.bottomRight, y + h);
    // bottom right arc
    ctx.arc(x + w - radius.bottomRight, y + h - radius.bottomRight, radius.bottomRight, HALF_PI, 0, true);
    // line from bottom right to top right
    ctx.lineTo(x + w, y + radius.topRight);
    // top right arc
    ctx.arc(x + w - radius.topRight, y + radius.topRight, radius.topRight, 0, -HALF_PI, true);
    // line from top right to top left
    ctx.lineTo(x + radius.topLeft, y);
}

const LINE_HEIGHT = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/;
const FONT_STYLE = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
/**
 * @alias Chart.helpers.options
 * @namespace
 */ /**
 * Converts the given line height `value` in pixels for a specific font `size`.
 * @param value - The lineHeight to parse (eg. 1.6, '14px', '75%', '1.6em').
 * @param size - The font size (in pixels) used to resolve relative `value`.
 * @returns The effective line height in pixels (size * 1.2 if value is invalid).
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
 * @since 2.7.0
 */ function toLineHeight(value, size) {
    const matches = ('' + value).match(LINE_HEIGHT);
    if (!matches || matches[1] === 'normal') {
        return size * 1.2;
    }
    value = +matches[2];
    switch(matches[3]){
        case 'px':
            return value;
        case '%':
            value /= 100;
            break;
    }
    return size * value;
}
const numberOrZero = (v)=>+v || 0;
function _readValueToProps(value, props) {
    const ret = {};
    const objProps = isObject(props);
    const keys = objProps ? Object.keys(props) : props;
    const read = isObject(value) ? objProps ? (prop)=>valueOrDefault(value[prop], value[props[prop]]) : (prop)=>value[prop] : ()=>value;
    for (const prop of keys){
        ret[prop] = numberOrZero(read(prop));
    }
    return ret;
}
/**
 * Converts the given value into a TRBL object.
 * @param value - If a number, set the value to all TRBL component,
 *  else, if an object, use defined properties and sets undefined ones to 0.
 *  x / y are shorthands for same value for left/right and top/bottom.
 * @returns The padding values (top, right, bottom, left)
 * @since 3.0.0
 */ function toTRBL(value) {
    return _readValueToProps(value, {
        top: 'y',
        right: 'x',
        bottom: 'y',
        left: 'x'
    });
}
/**
 * Converts the given value into a TRBL corners object (similar with css border-radius).
 * @param value - If a number, set the value to all TRBL corner components,
 *  else, if an object, use defined properties and sets undefined ones to 0.
 * @returns The TRBL corner values (topLeft, topRight, bottomLeft, bottomRight)
 * @since 3.0.0
 */ function toTRBLCorners(value) {
    return _readValueToProps(value, [
        'topLeft',
        'topRight',
        'bottomLeft',
        'bottomRight'
    ]);
}
/**
 * Converts the given value into a padding object with pre-computed width/height.
 * @param value - If a number, set the value to all TRBL component,
 *  else, if an object, use defined properties and sets undefined ones to 0.
 *  x / y are shorthands for same value for left/right and top/bottom.
 * @returns The padding values (top, right, bottom, left, width, height)
 * @since 2.7.0
 */ function toPadding(value) {
    const obj = toTRBL(value);
    obj.width = obj.left + obj.right;
    obj.height = obj.top + obj.bottom;
    return obj;
}
/**
 * Parses font options and returns the font object.
 * @param options - A object that contains font options to be parsed.
 * @param fallback - A object that contains fallback font options.
 * @return The font object.
 * @private
 */ function toFont(options, fallback) {
    options = options || {};
    fallback = fallback || defaults.font;
    let size = valueOrDefault(options.size, fallback.size);
    if (typeof size === 'string') {
        size = parseInt(size, 10);
    }
    let style = valueOrDefault(options.style, fallback.style);
    if (style && !('' + style).match(FONT_STYLE)) {
        console.warn('Invalid font style specified: "' + style + '"');
        style = undefined;
    }
    const font = {
        family: valueOrDefault(options.family, fallback.family),
        lineHeight: toLineHeight(valueOrDefault(options.lineHeight, fallback.lineHeight), size),
        size,
        style,
        weight: valueOrDefault(options.weight, fallback.weight),
        string: ''
    };
    font.string = toFontString(font);
    return font;
}
/**
 * Evaluates the given `inputs` sequentially and returns the first defined value.
 * @param inputs - An array of values, falling back to the last value.
 * @param context - If defined and the current value is a function, the value
 * is called with `context` as first argument and the result becomes the new input.
 * @param index - If defined and the current value is an array, the value
 * at `index` become the new input.
 * @param info - object to return information about resolution in
 * @param info.cacheable - Will be set to `false` if option is not cacheable.
 * @since 2.7.0
 */ function resolve(inputs, context, index, info) {
    let cacheable = true;
    let i, ilen, value;
    for(i = 0, ilen = inputs.length; i < ilen; ++i){
        value = inputs[i];
        if (value === undefined) {
            continue;
        }
        if (context !== undefined && typeof value === 'function') {
            value = value(context);
            cacheable = false;
        }
        if (index !== undefined && isArray(value)) {
            value = value[index % value.length];
            cacheable = false;
        }
        if (value !== undefined) {
            if (info && !cacheable) {
                info.cacheable = false;
            }
            return value;
        }
    }
}
/**
 * @param minmax
 * @param grace
 * @param beginAtZero
 * @private
 */ function _addGrace(minmax, grace, beginAtZero) {
    const { min , max  } = minmax;
    const change = toDimension(grace, (max - min) / 2);
    const keepZero = (value, add)=>beginAtZero && value === 0 ? 0 : value + add;
    return {
        min: keepZero(min, -Math.abs(change)),
        max: keepZero(max, change)
    };
}
function createContext(parentContext, context) {
    return Object.assign(Object.create(parentContext), context);
}

/**
 * Creates a Proxy for resolving raw values for options.
 * @param scopes - The option scopes to look for values, in resolution order
 * @param prefixes - The prefixes for values, in resolution order.
 * @param rootScopes - The root option scopes
 * @param fallback - Parent scopes fallback
 * @param getTarget - callback for getting the target for changed values
 * @returns Proxy
 * @private
 */ function _createResolver(scopes, prefixes = [
    ''
], rootScopes, fallback, getTarget = ()=>scopes[0]) {
    const finalRootScopes = rootScopes || scopes;
    if (typeof fallback === 'undefined') {
        fallback = _resolve('_fallback', scopes);
    }
    const cache = {
        [Symbol.toStringTag]: 'Object',
        _cacheable: true,
        _scopes: scopes,
        _rootScopes: finalRootScopes,
        _fallback: fallback,
        _getTarget: getTarget,
        override: (scope)=>_createResolver([
                scope,
                ...scopes
            ], prefixes, finalRootScopes, fallback)
    };
    return new Proxy(cache, {
        /**
     * A trap for the delete operator.
     */ deleteProperty (target, prop) {
            delete target[prop]; // remove from cache
            delete target._keys; // remove cached keys
            delete scopes[0][prop]; // remove from top level scope
            return true;
        },
        /**
     * A trap for getting property values.
     */ get (target, prop) {
            return _cached(target, prop, ()=>_resolveWithPrefixes(prop, prefixes, scopes, target));
        },
        /**
     * A trap for Object.getOwnPropertyDescriptor.
     * Also used by Object.hasOwnProperty.
     */ getOwnPropertyDescriptor (target, prop) {
            return Reflect.getOwnPropertyDescriptor(target._scopes[0], prop);
        },
        /**
     * A trap for Object.getPrototypeOf.
     */ getPrototypeOf () {
            return Reflect.getPrototypeOf(scopes[0]);
        },
        /**
     * A trap for the in operator.
     */ has (target, prop) {
            return getKeysFromAllScopes(target).includes(prop);
        },
        /**
     * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
     */ ownKeys (target) {
            return getKeysFromAllScopes(target);
        },
        /**
     * A trap for setting property values.
     */ set (target, prop, value) {
            const storage = target._storage || (target._storage = getTarget());
            target[prop] = storage[prop] = value; // set to top level scope + cache
            delete target._keys; // remove cached keys
            return true;
        }
    });
}
/**
 * Returns an Proxy for resolving option values with context.
 * @param proxy - The Proxy returned by `_createResolver`
 * @param context - Context object for scriptable/indexable options
 * @param subProxy - The proxy provided for scriptable options
 * @param descriptorDefaults - Defaults for descriptors
 * @private
 */ function _attachContext(proxy, context, subProxy, descriptorDefaults) {
    const cache = {
        _cacheable: false,
        _proxy: proxy,
        _context: context,
        _subProxy: subProxy,
        _stack: new Set(),
        _descriptors: _descriptors(proxy, descriptorDefaults),
        setContext: (ctx)=>_attachContext(proxy, ctx, subProxy, descriptorDefaults),
        override: (scope)=>_attachContext(proxy.override(scope), context, subProxy, descriptorDefaults)
    };
    return new Proxy(cache, {
        /**
     * A trap for the delete operator.
     */ deleteProperty (target, prop) {
            delete target[prop]; // remove from cache
            delete proxy[prop]; // remove from proxy
            return true;
        },
        /**
     * A trap for getting property values.
     */ get (target, prop, receiver) {
            return _cached(target, prop, ()=>_resolveWithContext(target, prop, receiver));
        },
        /**
     * A trap for Object.getOwnPropertyDescriptor.
     * Also used by Object.hasOwnProperty.
     */ getOwnPropertyDescriptor (target, prop) {
            return target._descriptors.allKeys ? Reflect.has(proxy, prop) ? {
                enumerable: true,
                configurable: true
            } : undefined : Reflect.getOwnPropertyDescriptor(proxy, prop);
        },
        /**
     * A trap for Object.getPrototypeOf.
     */ getPrototypeOf () {
            return Reflect.getPrototypeOf(proxy);
        },
        /**
     * A trap for the in operator.
     */ has (target, prop) {
            return Reflect.has(proxy, prop);
        },
        /**
     * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
     */ ownKeys () {
            return Reflect.ownKeys(proxy);
        },
        /**
     * A trap for setting property values.
     */ set (target, prop, value) {
            proxy[prop] = value; // set to proxy
            delete target[prop]; // remove from cache
            return true;
        }
    });
}
/**
 * @private
 */ function _descriptors(proxy, defaults = {
    scriptable: true,
    indexable: true
}) {
    const { _scriptable =defaults.scriptable , _indexable =defaults.indexable , _allKeys =defaults.allKeys  } = proxy;
    return {
        allKeys: _allKeys,
        scriptable: _scriptable,
        indexable: _indexable,
        isScriptable: isFunction(_scriptable) ? _scriptable : ()=>_scriptable,
        isIndexable: isFunction(_indexable) ? _indexable : ()=>_indexable
    };
}
const readKey = (prefix, name)=>prefix ? prefix + _capitalize(name) : name;
const needsSubResolver = (prop, value)=>isObject(value) && prop !== 'adapters' && (Object.getPrototypeOf(value) === null || value.constructor === Object);
function _cached(target, prop, resolve) {
    if (Object.prototype.hasOwnProperty.call(target, prop) || prop === 'constructor') {
        return target[prop];
    }
    const value = resolve();
    // cache the resolved value
    target[prop] = value;
    return value;
}
function _resolveWithContext(target, prop, receiver) {
    const { _proxy , _context , _subProxy , _descriptors: descriptors  } = target;
    let value = _proxy[prop]; // resolve from proxy
    // resolve with context
    if (isFunction(value) && descriptors.isScriptable(prop)) {
        value = _resolveScriptable(prop, value, target, receiver);
    }
    if (isArray(value) && value.length) {
        value = _resolveArray(prop, value, target, descriptors.isIndexable);
    }
    if (needsSubResolver(prop, value)) {
        // if the resolved value is an object, create a sub resolver for it
        value = _attachContext(value, _context, _subProxy && _subProxy[prop], descriptors);
    }
    return value;
}
function _resolveScriptable(prop, getValue, target, receiver) {
    const { _proxy , _context , _subProxy , _stack  } = target;
    if (_stack.has(prop)) {
        throw new Error('Recursion detected: ' + Array.from(_stack).join('->') + '->' + prop);
    }
    _stack.add(prop);
    let value = getValue(_context, _subProxy || receiver);
    _stack.delete(prop);
    if (needsSubResolver(prop, value)) {
        // When scriptable option returns an object, create a resolver on that.
        value = createSubResolver(_proxy._scopes, _proxy, prop, value);
    }
    return value;
}
function _resolveArray(prop, value, target, isIndexable) {
    const { _proxy , _context , _subProxy , _descriptors: descriptors  } = target;
    if (typeof _context.index !== 'undefined' && isIndexable(prop)) {
        return value[_context.index % value.length];
    } else if (isObject(value[0])) {
        // Array of objects, return array or resolvers
        const arr = value;
        const scopes = _proxy._scopes.filter((s)=>s !== arr);
        value = [];
        for (const item of arr){
            const resolver = createSubResolver(scopes, _proxy, prop, item);
            value.push(_attachContext(resolver, _context, _subProxy && _subProxy[prop], descriptors));
        }
    }
    return value;
}
function resolveFallback(fallback, prop, value) {
    return isFunction(fallback) ? fallback(prop, value) : fallback;
}
const getScope = (key, parent)=>key === true ? parent : typeof key === 'string' ? resolveObjectKey(parent, key) : undefined;
function addScopes(set, parentScopes, key, parentFallback, value) {
    for (const parent of parentScopes){
        const scope = getScope(key, parent);
        if (scope) {
            set.add(scope);
            const fallback = resolveFallback(scope._fallback, key, value);
            if (typeof fallback !== 'undefined' && fallback !== key && fallback !== parentFallback) {
                // When we reach the descriptor that defines a new _fallback, return that.
                // The fallback will resume to that new scope.
                return fallback;
            }
        } else if (scope === false && typeof parentFallback !== 'undefined' && key !== parentFallback) {
            // Fallback to `false` results to `false`, when falling back to different key.
            // For example `interaction` from `hover` or `plugins.tooltip` and `animation` from `animations`
            return null;
        }
    }
    return false;
}
function createSubResolver(parentScopes, resolver, prop, value) {
    const rootScopes = resolver._rootScopes;
    const fallback = resolveFallback(resolver._fallback, prop, value);
    const allScopes = [
        ...parentScopes,
        ...rootScopes
    ];
    const set = new Set();
    set.add(value);
    let key = addScopesFromKey(set, allScopes, prop, fallback || prop, value);
    if (key === null) {
        return false;
    }
    if (typeof fallback !== 'undefined' && fallback !== prop) {
        key = addScopesFromKey(set, allScopes, fallback, key, value);
        if (key === null) {
            return false;
        }
    }
    return _createResolver(Array.from(set), [
        ''
    ], rootScopes, fallback, ()=>subGetTarget(resolver, prop, value));
}
function addScopesFromKey(set, allScopes, key, fallback, item) {
    while(key){
        key = addScopes(set, allScopes, key, fallback, item);
    }
    return key;
}
function subGetTarget(resolver, prop, value) {
    const parent = resolver._getTarget();
    if (!(prop in parent)) {
        parent[prop] = {};
    }
    const target = parent[prop];
    if (isArray(target) && isObject(value)) {
        // For array of objects, the object is used to store updated values
        return value;
    }
    return target || {};
}
function _resolveWithPrefixes(prop, prefixes, scopes, proxy) {
    let value;
    for (const prefix of prefixes){
        value = _resolve(readKey(prefix, prop), scopes);
        if (typeof value !== 'undefined') {
            return needsSubResolver(prop, value) ? createSubResolver(scopes, proxy, prop, value) : value;
        }
    }
}
function _resolve(key, scopes) {
    for (const scope of scopes){
        if (!scope) {
            continue;
        }
        const value = scope[key];
        if (typeof value !== 'undefined') {
            return value;
        }
    }
}
function getKeysFromAllScopes(target) {
    let keys = target._keys;
    if (!keys) {
        keys = target._keys = resolveKeysFromAllScopes(target._scopes);
    }
    return keys;
}
function resolveKeysFromAllScopes(scopes) {
    const set = new Set();
    for (const scope of scopes){
        for (const key of Object.keys(scope).filter((k)=>!k.startsWith('_'))){
            set.add(key);
        }
    }
    return Array.from(set);
}
function _parseObjectDataRadialScale(meta, data, start, count) {
    const { iScale  } = meta;
    const { key ='r'  } = this._parsing;
    const parsed = new Array(count);
    let i, ilen, index, item;
    for(i = 0, ilen = count; i < ilen; ++i){
        index = i + start;
        item = data[index];
        parsed[i] = {
            r: iScale.parse(resolveObjectKey(item, key), index)
        };
    }
    return parsed;
}

const EPSILON = Number.EPSILON || 1e-14;
const getPoint = (points, i)=>i < points.length && !points[i].skip && points[i];
const getValueAxis = (indexAxis)=>indexAxis === 'x' ? 'y' : 'x';
function splineCurve(firstPoint, middlePoint, afterPoint, t) {
    // Props to Rob Spencer at scaled innovation for his post on splining between points
    // http://scaledinnovation.com/analytics/splines/aboutSplines.html
    // This function must also respect "skipped" points
    const previous = firstPoint.skip ? middlePoint : firstPoint;
    const current = middlePoint;
    const next = afterPoint.skip ? middlePoint : afterPoint;
    const d01 = distanceBetweenPoints(current, previous);
    const d12 = distanceBetweenPoints(next, current);
    let s01 = d01 / (d01 + d12);
    let s12 = d12 / (d01 + d12);
    // If all points are the same, s01 & s02 will be inf
    s01 = isNaN(s01) ? 0 : s01;
    s12 = isNaN(s12) ? 0 : s12;
    const fa = t * s01; // scaling factor for triangle Ta
    const fb = t * s12;
    return {
        previous: {
            x: current.x - fa * (next.x - previous.x),
            y: current.y - fa * (next.y - previous.y)
        },
        next: {
            x: current.x + fb * (next.x - previous.x),
            y: current.y + fb * (next.y - previous.y)
        }
    };
}
/**
 * Adjust tangents to ensure monotonic properties
 */ function monotoneAdjust(points, deltaK, mK) {
    const pointsLen = points.length;
    let alphaK, betaK, tauK, squaredMagnitude, pointCurrent;
    let pointAfter = getPoint(points, 0);
    for(let i = 0; i < pointsLen - 1; ++i){
        pointCurrent = pointAfter;
        pointAfter = getPoint(points, i + 1);
        if (!pointCurrent || !pointAfter) {
            continue;
        }
        if (almostEquals(deltaK[i], 0, EPSILON)) {
            mK[i] = mK[i + 1] = 0;
            continue;
        }
        alphaK = mK[i] / deltaK[i];
        betaK = mK[i + 1] / deltaK[i];
        squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);
        if (squaredMagnitude <= 9) {
            continue;
        }
        tauK = 3 / Math.sqrt(squaredMagnitude);
        mK[i] = alphaK * tauK * deltaK[i];
        mK[i + 1] = betaK * tauK * deltaK[i];
    }
}
function monotoneCompute(points, mK, indexAxis = 'x') {
    const valueAxis = getValueAxis(indexAxis);
    const pointsLen = points.length;
    let delta, pointBefore, pointCurrent;
    let pointAfter = getPoint(points, 0);
    for(let i = 0; i < pointsLen; ++i){
        pointBefore = pointCurrent;
        pointCurrent = pointAfter;
        pointAfter = getPoint(points, i + 1);
        if (!pointCurrent) {
            continue;
        }
        const iPixel = pointCurrent[indexAxis];
        const vPixel = pointCurrent[valueAxis];
        if (pointBefore) {
            delta = (iPixel - pointBefore[indexAxis]) / 3;
            pointCurrent[`cp1${indexAxis}`] = iPixel - delta;
            pointCurrent[`cp1${valueAxis}`] = vPixel - delta * mK[i];
        }
        if (pointAfter) {
            delta = (pointAfter[indexAxis] - iPixel) / 3;
            pointCurrent[`cp2${indexAxis}`] = iPixel + delta;
            pointCurrent[`cp2${valueAxis}`] = vPixel + delta * mK[i];
        }
    }
}
/**
 * This function calculates Bézier control points in a similar way than |splineCurve|,
 * but preserves monotonicity of the provided data and ensures no local extremums are added
 * between the dataset discrete points due to the interpolation.
 * See : https://en.wikipedia.org/wiki/Monotone_cubic_interpolation
 */ function splineCurveMonotone(points, indexAxis = 'x') {
    const valueAxis = getValueAxis(indexAxis);
    const pointsLen = points.length;
    const deltaK = Array(pointsLen).fill(0);
    const mK = Array(pointsLen);
    // Calculate slopes (deltaK) and initialize tangents (mK)
    let i, pointBefore, pointCurrent;
    let pointAfter = getPoint(points, 0);
    for(i = 0; i < pointsLen; ++i){
        pointBefore = pointCurrent;
        pointCurrent = pointAfter;
        pointAfter = getPoint(points, i + 1);
        if (!pointCurrent) {
            continue;
        }
        if (pointAfter) {
            const slopeDelta = pointAfter[indexAxis] - pointCurrent[indexAxis];
            // In the case of two points that appear at the same x pixel, slopeDeltaX is 0
            deltaK[i] = slopeDelta !== 0 ? (pointAfter[valueAxis] - pointCurrent[valueAxis]) / slopeDelta : 0;
        }
        mK[i] = !pointBefore ? deltaK[i] : !pointAfter ? deltaK[i - 1] : sign(deltaK[i - 1]) !== sign(deltaK[i]) ? 0 : (deltaK[i - 1] + deltaK[i]) / 2;
    }
    monotoneAdjust(points, deltaK, mK);
    monotoneCompute(points, mK, indexAxis);
}
function capControlPoint(pt, min, max) {
    return Math.max(Math.min(pt, max), min);
}
function capBezierPoints(points, area) {
    let i, ilen, point, inArea, inAreaPrev;
    let inAreaNext = _isPointInArea(points[0], area);
    for(i = 0, ilen = points.length; i < ilen; ++i){
        inAreaPrev = inArea;
        inArea = inAreaNext;
        inAreaNext = i < ilen - 1 && _isPointInArea(points[i + 1], area);
        if (!inArea) {
            continue;
        }
        point = points[i];
        if (inAreaPrev) {
            point.cp1x = capControlPoint(point.cp1x, area.left, area.right);
            point.cp1y = capControlPoint(point.cp1y, area.top, area.bottom);
        }
        if (inAreaNext) {
            point.cp2x = capControlPoint(point.cp2x, area.left, area.right);
            point.cp2y = capControlPoint(point.cp2y, area.top, area.bottom);
        }
    }
}
/**
 * @private
 */ function _updateBezierControlPoints(points, options, area, loop, indexAxis) {
    let i, ilen, point, controlPoints;
    // Only consider points that are drawn in case the spanGaps option is used
    if (options.spanGaps) {
        points = points.filter((pt)=>!pt.skip);
    }
    if (options.cubicInterpolationMode === 'monotone') {
        splineCurveMonotone(points, indexAxis);
    } else {
        let prev = loop ? points[points.length - 1] : points[0];
        for(i = 0, ilen = points.length; i < ilen; ++i){
            point = points[i];
            controlPoints = splineCurve(prev, point, points[Math.min(i + 1, ilen - (loop ? 0 : 1)) % ilen], options.tension);
            point.cp1x = controlPoints.previous.x;
            point.cp1y = controlPoints.previous.y;
            point.cp2x = controlPoints.next.x;
            point.cp2y = controlPoints.next.y;
            prev = point;
        }
    }
    if (options.capBezierPoints) {
        capBezierPoints(points, area);
    }
}

/**
 * @private
 */ function _isDomSupported() {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
}
/**
 * @private
 */ function _getParentNode(domNode) {
    let parent = domNode.parentNode;
    if (parent && parent.toString() === '[object ShadowRoot]') {
        parent = parent.host;
    }
    return parent;
}
/**
 * convert max-width/max-height values that may be percentages into a number
 * @private
 */ function parseMaxStyle(styleValue, node, parentProperty) {
    let valueInPixels;
    if (typeof styleValue === 'string') {
        valueInPixels = parseInt(styleValue, 10);
        if (styleValue.indexOf('%') !== -1) {
            // percentage * size in dimension
            valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
        }
    } else {
        valueInPixels = styleValue;
    }
    return valueInPixels;
}
const getComputedStyle = (element)=>element.ownerDocument.defaultView.getComputedStyle(element, null);
function getStyle(el, property) {
    return getComputedStyle(el).getPropertyValue(property);
}
const positions = [
    'top',
    'right',
    'bottom',
    'left'
];
function getPositionedStyle(styles, style, suffix) {
    const result = {};
    suffix = suffix ? '-' + suffix : '';
    for(let i = 0; i < 4; i++){
        const pos = positions[i];
        result[pos] = parseFloat(styles[style + '-' + pos + suffix]) || 0;
    }
    result.width = result.left + result.right;
    result.height = result.top + result.bottom;
    return result;
}
const useOffsetPos = (x, y, target)=>(x > 0 || y > 0) && (!target || !target.shadowRoot);
/**
 * @param e
 * @param canvas
 * @returns Canvas position
 */ function getCanvasPosition(e, canvas) {
    const touches = e.touches;
    const source = touches && touches.length ? touches[0] : e;
    const { offsetX , offsetY  } = source;
    let box = false;
    let x, y;
    if (useOffsetPos(offsetX, offsetY, e.target)) {
        x = offsetX;
        y = offsetY;
    } else {
        const rect = canvas.getBoundingClientRect();
        x = source.clientX - rect.left;
        y = source.clientY - rect.top;
        box = true;
    }
    return {
        x,
        y,
        box
    };
}
/**
 * Gets an event's x, y coordinates, relative to the chart area
 * @param event
 * @param chart
 * @returns x and y coordinates of the event
 */ function getRelativePosition(event, chart) {
    if ('native' in event) {
        return event;
    }
    const { canvas , currentDevicePixelRatio  } = chart;
    const style = getComputedStyle(canvas);
    const borderBox = style.boxSizing === 'border-box';
    const paddings = getPositionedStyle(style, 'padding');
    const borders = getPositionedStyle(style, 'border', 'width');
    const { x , y , box  } = getCanvasPosition(event, canvas);
    const xOffset = paddings.left + (box && borders.left);
    const yOffset = paddings.top + (box && borders.top);
    let { width , height  } = chart;
    if (borderBox) {
        width -= paddings.width + borders.width;
        height -= paddings.height + borders.height;
    }
    return {
        x: Math.round((x - xOffset) / width * canvas.width / currentDevicePixelRatio),
        y: Math.round((y - yOffset) / height * canvas.height / currentDevicePixelRatio)
    };
}
function getContainerSize(canvas, width, height) {
    let maxWidth, maxHeight;
    if (width === undefined || height === undefined) {
        const container = canvas && _getParentNode(canvas);
        if (!container) {
            width = canvas.clientWidth;
            height = canvas.clientHeight;
        } else {
            const rect = container.getBoundingClientRect(); // this is the border box of the container
            const containerStyle = getComputedStyle(container);
            const containerBorder = getPositionedStyle(containerStyle, 'border', 'width');
            const containerPadding = getPositionedStyle(containerStyle, 'padding');
            width = rect.width - containerPadding.width - containerBorder.width;
            height = rect.height - containerPadding.height - containerBorder.height;
            maxWidth = parseMaxStyle(containerStyle.maxWidth, container, 'clientWidth');
            maxHeight = parseMaxStyle(containerStyle.maxHeight, container, 'clientHeight');
        }
    }
    return {
        width,
        height,
        maxWidth: maxWidth || INFINITY,
        maxHeight: maxHeight || INFINITY
    };
}
const round1 = (v)=>Math.round(v * 10) / 10;
// eslint-disable-next-line complexity
function getMaximumSize(canvas, bbWidth, bbHeight, aspectRatio) {
    const style = getComputedStyle(canvas);
    const margins = getPositionedStyle(style, 'margin');
    const maxWidth = parseMaxStyle(style.maxWidth, canvas, 'clientWidth') || INFINITY;
    const maxHeight = parseMaxStyle(style.maxHeight, canvas, 'clientHeight') || INFINITY;
    const containerSize = getContainerSize(canvas, bbWidth, bbHeight);
    let { width , height  } = containerSize;
    if (style.boxSizing === 'content-box') {
        const borders = getPositionedStyle(style, 'border', 'width');
        const paddings = getPositionedStyle(style, 'padding');
        width -= paddings.width + borders.width;
        height -= paddings.height + borders.height;
    }
    width = Math.max(0, width - margins.width);
    height = Math.max(0, aspectRatio ? width / aspectRatio : height - margins.height);
    width = round1(Math.min(width, maxWidth, containerSize.maxWidth));
    height = round1(Math.min(height, maxHeight, containerSize.maxHeight));
    if (width && !height) {
        // https://github.com/chartjs/Chart.js/issues/4659
        // If the canvas has width, but no height, default to aspectRatio of 2 (canvas default)
        height = round1(width / 2);
    }
    const maintainHeight = bbWidth !== undefined || bbHeight !== undefined;
    if (maintainHeight && aspectRatio && containerSize.height && height > containerSize.height) {
        height = containerSize.height;
        width = round1(Math.floor(height * aspectRatio));
    }
    return {
        width,
        height
    };
}
/**
 * @param chart
 * @param forceRatio
 * @param forceStyle
 * @returns True if the canvas context size or transformation has changed.
 */ function retinaScale(chart, forceRatio, forceStyle) {
    const pixelRatio = forceRatio || 1;
    const deviceHeight = Math.floor(chart.height * pixelRatio);
    const deviceWidth = Math.floor(chart.width * pixelRatio);
    chart.height = Math.floor(chart.height);
    chart.width = Math.floor(chart.width);
    const canvas = chart.canvas;
    // If no style has been set on the canvas, the render size is used as display size,
    // making the chart visually bigger, so let's enforce it to the "correct" values.
    // See https://github.com/chartjs/Chart.js/issues/3575
    if (canvas.style && (forceStyle || !canvas.style.height && !canvas.style.width)) {
        canvas.style.height = `${chart.height}px`;
        canvas.style.width = `${chart.width}px`;
    }
    if (chart.currentDevicePixelRatio !== pixelRatio || canvas.height !== deviceHeight || canvas.width !== deviceWidth) {
        chart.currentDevicePixelRatio = pixelRatio;
        canvas.height = deviceHeight;
        canvas.width = deviceWidth;
        chart.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        return true;
    }
    return false;
}
/**
 * Detects support for options object argument in addEventListener.
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
 * @private
 */ const supportsEventListenerOptions = function() {
    let passiveSupported = false;
    try {
        const options = {
            get passive () {
                passiveSupported = true;
                return false;
            }
        };
        if (_isDomSupported()) {
            window.addEventListener('test', null, options);
            window.removeEventListener('test', null, options);
        }
    } catch (e) {
    // continue regardless of error
    }
    return passiveSupported;
}();
/**
 * The "used" size is the final value of a dimension property after all calculations have
 * been performed. This method uses the computed style of `element` but returns undefined
 * if the computed style is not expressed in pixels. That can happen in some cases where
 * `element` has a size relative to its parent and this last one is not yet displayed,
 * for example because of `display: none` on a parent node.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/used_value
 * @returns Size in pixels or undefined if unknown.
 */ function readUsedSize(element, property) {
    const value = getStyle(element, property);
    const matches = value && value.match(/^(\d+)(\.\d+)?px$/);
    return matches ? +matches[1] : undefined;
}

/**
 * @private
 */ function _pointInLine(p1, p2, t, mode) {
    return {
        x: p1.x + t * (p2.x - p1.x),
        y: p1.y + t * (p2.y - p1.y)
    };
}
/**
 * @private
 */ function _steppedInterpolation(p1, p2, t, mode) {
    return {
        x: p1.x + t * (p2.x - p1.x),
        y: mode === 'middle' ? t < 0.5 ? p1.y : p2.y : mode === 'after' ? t < 1 ? p1.y : p2.y : t > 0 ? p2.y : p1.y
    };
}
/**
 * @private
 */ function _bezierInterpolation(p1, p2, t, mode) {
    const cp1 = {
        x: p1.cp2x,
        y: p1.cp2y
    };
    const cp2 = {
        x: p2.cp1x,
        y: p2.cp1y
    };
    const a = _pointInLine(p1, cp1, t);
    const b = _pointInLine(cp1, cp2, t);
    const c = _pointInLine(cp2, p2, t);
    const d = _pointInLine(a, b, t);
    const e = _pointInLine(b, c, t);
    return _pointInLine(d, e, t);
}

const getRightToLeftAdapter = function(rectX, width) {
    return {
        x (x) {
            return rectX + rectX + width - x;
        },
        setWidth (w) {
            width = w;
        },
        textAlign (align) {
            if (align === 'center') {
                return align;
            }
            return align === 'right' ? 'left' : 'right';
        },
        xPlus (x, value) {
            return x - value;
        },
        leftForLtr (x, itemWidth) {
            return x - itemWidth;
        }
    };
};
const getLeftToRightAdapter = function() {
    return {
        x (x) {
            return x;
        },
        setWidth (w) {},
        textAlign (align) {
            return align;
        },
        xPlus (x, value) {
            return x + value;
        },
        leftForLtr (x, _itemWidth) {
            return x;
        }
    };
};
function getRtlAdapter(rtl, rectX, width) {
    return rtl ? getRightToLeftAdapter(rectX, width) : getLeftToRightAdapter();
}
function overrideTextDirection(ctx, direction) {
    let style, original;
    if (direction === 'ltr' || direction === 'rtl') {
        style = ctx.canvas.style;
        original = [
            style.getPropertyValue('direction'),
            style.getPropertyPriority('direction')
        ];
        style.setProperty('direction', direction, 'important');
        ctx.prevTextDirection = original;
    }
}
function restoreTextDirection(ctx, original) {
    if (original !== undefined) {
        delete ctx.prevTextDirection;
        ctx.canvas.style.setProperty('direction', original[0], original[1]);
    }
}

function propertyFn(property) {
    if (property === 'angle') {
        return {
            between: _angleBetween,
            compare: _angleDiff,
            normalize: _normalizeAngle
        };
    }
    return {
        between: _isBetween,
        compare: (a, b)=>a - b,
        normalize: (x)=>x
    };
}
function normalizeSegment({ start , end , count , loop , style  }) {
    return {
        start: start % count,
        end: end % count,
        loop: loop && (end - start + 1) % count === 0,
        style
    };
}
function getSegment(segment, points, bounds) {
    const { property , start: startBound , end: endBound  } = bounds;
    const { between , normalize  } = propertyFn(property);
    const count = points.length;
    let { start , end , loop  } = segment;
    let i, ilen;
    if (loop) {
        start += count;
        end += count;
        for(i = 0, ilen = count; i < ilen; ++i){
            if (!between(normalize(points[start % count][property]), startBound, endBound)) {
                break;
            }
            start--;
            end--;
        }
        start %= count;
        end %= count;
    }
    if (end < start) {
        end += count;
    }
    return {
        start,
        end,
        loop,
        style: segment.style
    };
}
 function _boundSegment(segment, points, bounds) {
    if (!bounds) {
        return [
            segment
        ];
    }
    const { property , start: startBound , end: endBound  } = bounds;
    const count = points.length;
    const { compare , between , normalize  } = propertyFn(property);
    const { start , end , loop , style  } = getSegment(segment, points, bounds);
    const result = [];
    let inside = false;
    let subStart = null;
    let value, point, prevValue;
    const startIsBefore = ()=>between(startBound, prevValue, value) && compare(startBound, prevValue) !== 0;
    const endIsBefore = ()=>compare(endBound, value) === 0 || between(endBound, prevValue, value);
    const shouldStart = ()=>inside || startIsBefore();
    const shouldStop = ()=>!inside || endIsBefore();
    for(let i = start, prev = start; i <= end; ++i){
        point = points[i % count];
        if (point.skip) {
            continue;
        }
        value = normalize(point[property]);
        if (value === prevValue) {
            continue;
        }
        inside = between(value, startBound, endBound);
        if (subStart === null && shouldStart()) {
            subStart = compare(value, startBound) === 0 ? i : prev;
        }
        if (subStart !== null && shouldStop()) {
            result.push(normalizeSegment({
                start: subStart,
                end: i,
                loop,
                count,
                style
            }));
            subStart = null;
        }
        prev = i;
        prevValue = value;
    }
    if (subStart !== null) {
        result.push(normalizeSegment({
            start: subStart,
            end,
            loop,
            count,
            style
        }));
    }
    return result;
}
 function _boundSegments(line, bounds) {
    const result = [];
    const segments = line.segments;
    for(let i = 0; i < segments.length; i++){
        const sub = _boundSegment(segments[i], line.points, bounds);
        if (sub.length) {
            result.push(...sub);
        }
    }
    return result;
}
 function findStartAndEnd(points, count, loop, spanGaps) {
    let start = 0;
    let end = count - 1;
    if (loop && !spanGaps) {
        while(start < count && !points[start].skip){
            start++;
        }
    }
    while(start < count && points[start].skip){
        start++;
    }
    start %= count;
    if (loop) {
        end += start;
    }
    while(end > start && points[end % count].skip){
        end--;
    }
    end %= count;
    return {
        start,
        end
    };
}
 function solidSegments(points, start, max, loop) {
    const count = points.length;
    const result = [];
    let last = start;
    let prev = points[start];
    let end;
    for(end = start + 1; end <= max; ++end){
        const cur = points[end % count];
        if (cur.skip || cur.stop) {
            if (!prev.skip) {
                loop = false;
                result.push({
                    start: start % count,
                    end: (end - 1) % count,
                    loop
                });
                start = last = cur.stop ? end : null;
            }
        } else {
            last = end;
            if (prev.skip) {
                start = end;
            }
        }
        prev = cur;
    }
    if (last !== null) {
        result.push({
            start: start % count,
            end: last % count,
            loop
        });
    }
    return result;
}
 function _computeSegments(line, segmentOptions) {
    const points = line.points;
    const spanGaps = line.options.spanGaps;
    const count = points.length;
    if (!count) {
        return [];
    }
    const loop = !!line._loop;
    const { start , end  } = findStartAndEnd(points, count, loop, spanGaps);
    if (spanGaps === true) {
        return splitByStyles(line, [
            {
                start,
                end,
                loop
            }
        ], points, segmentOptions);
    }
    const max = end < start ? end + count : end;
    const completeLoop = !!line._fullLoop && start === 0 && end === count - 1;
    return splitByStyles(line, solidSegments(points, start, max, completeLoop), points, segmentOptions);
}
 function splitByStyles(line, segments, points, segmentOptions) {
    if (!segmentOptions || !segmentOptions.setContext || !points) {
        return segments;
    }
    return doSplitByStyles(line, segments, points, segmentOptions);
}
 function doSplitByStyles(line, segments, points, segmentOptions) {
    const chartContext = line._chart.getContext();
    const baseStyle = readStyle(line.options);
    const { _datasetIndex: datasetIndex , options: { spanGaps  }  } = line;
    const count = points.length;
    const result = [];
    let prevStyle = baseStyle;
    let start = segments[0].start;
    let i = start;
    function addStyle(s, e, l, st) {
        const dir = spanGaps ? -1 : 1;
        if (s === e) {
            return;
        }
        s += count;
        while(points[s % count].skip){
            s -= dir;
        }
        while(points[e % count].skip){
            e += dir;
        }
        if (s % count !== e % count) {
            result.push({
                start: s % count,
                end: e % count,
                loop: l,
                style: st
            });
            prevStyle = st;
            start = e % count;
        }
    }
    for (const segment of segments){
        start = spanGaps ? start : segment.start;
        let prev = points[start % count];
        let style;
        for(i = start + 1; i <= segment.end; i++){
            const pt = points[i % count];
            style = readStyle(segmentOptions.setContext(createContext(chartContext, {
                type: 'segment',
                p0: prev,
                p1: pt,
                p0DataIndex: (i - 1) % count,
                p1DataIndex: i % count,
                datasetIndex
            })));
            if (styleChanged(style, prevStyle)) {
                addStyle(start, i - 1, segment.loop, prevStyle);
            }
            prev = pt;
            prevStyle = style;
        }
        if (start < i - 1) {
            addStyle(start, i - 1, segment.loop, prevStyle);
        }
    }
    return result;
}
function readStyle(options) {
    return {
        backgroundColor: options.backgroundColor,
        borderCapStyle: options.borderCapStyle,
        borderDash: options.borderDash,
        borderDashOffset: options.borderDashOffset,
        borderJoinStyle: options.borderJoinStyle,
        borderWidth: options.borderWidth,
        borderColor: options.borderColor
    };
}
function styleChanged(style, prevStyle) {
    if (!prevStyle) {
        return false;
    }
    const cache = [];
    const replacer = function(key, value) {
        if (!isPatternOrGradient(value)) {
            return value;
        }
        if (!cache.includes(value)) {
            cache.push(value);
        }
        return cache.indexOf(value);
    };
    return JSON.stringify(style, replacer) !== JSON.stringify(prevStyle, replacer);
}

function getSizeForArea(scale, chartArea, field) {
    return scale.options.clip ? scale[field] : chartArea[field];
}
function getDatasetArea(meta, chartArea) {
    const { xScale , yScale  } = meta;
    if (xScale && yScale) {
        return {
            left: getSizeForArea(xScale, chartArea, 'left'),
            right: getSizeForArea(xScale, chartArea, 'right'),
            top: getSizeForArea(yScale, chartArea, 'top'),
            bottom: getSizeForArea(yScale, chartArea, 'bottom')
        };
    }
    return chartArea;
}
function getDatasetClipArea(chart, meta) {
    const clip = meta._clip;
    if (clip.disabled) {
        return false;
    }
    const area = getDatasetArea(meta, chart.chartArea);
    return {
        left: clip.left === false ? 0 : area.left - (clip.left === true ? 0 : clip.left),
        right: clip.right === false ? chart.width : area.right + (clip.right === true ? 0 : clip.right),
        top: clip.top === false ? 0 : area.top - (clip.top === true ? 0 : clip.top),
        bottom: clip.bottom === false ? chart.height : area.bottom + (clip.bottom === true ? 0 : clip.bottom)
    };
}


//# sourceMappingURL=helpers.dataset.js.map


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./resources/js/components/Dashboard.js":
/*!**********************************************!*\
  !*** ./resources/js/components/Dashboard.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadDashboard: () => (/* binding */ loadDashboard)
/* harmony export */ });
/* harmony import */ var chart_js_auto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chart.js/auto */ "./node_modules/chart.js/auto/auto.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _SystemSettings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SystemSettings */ "./resources/js/components/SystemSettings.js");
/* harmony import */ var _Profile_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Profile.js */ "./resources/js/components/Profile.js");
/* harmony import */ var _Students_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Students.js */ "./resources/js/components/Students.js");
/* harmony import */ var _Faculty_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Faculty.js */ "./resources/js/components/Faculty.js");
/* harmony import */ var _Report_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Report.js */ "./resources/js/components/Report.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }







function loadDashboard(_x) {
  return _loadDashboard.apply(this, arguments);
}
function _loadDashboard() {
  _loadDashboard = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(app) {
    var _yield$Promise$all, _yield$Promise$all2, studentsRes, facultyRes, coursesRes, departmentsRes, students, faculty, courses, departments, courseCounts, deptCounts, recentActivity, list, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          // UI changed to match the provided design (logic / IDs kept the same)
          app.innerHTML = "\n        <div class=\"dashboard-container\">\n            <nav class=\"sidebar\">\n                <div class=\"sidebar-content\">\n                    <div class=\"sidebar-header\">\n                        <img src=\"/images/logo.png\" alt=\"EDUTrack logo\" class=\"sidebar-logo\" />\n                        <h1 class=\"sidebar-title\">EDUTrack</h1>\n                    </div>\n                    \n                    <button class=\"new-item-btn\">\n                        <svg class=\"btn-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                            <line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line>\n                            <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>\n                        </svg>\n                        New Item\n                    </button>\n                    \n                    <ul class=\"sidebar-menu\">\n                        <li>\n                            <a href=\"#\" class=\"menu-item active\" data-page=\"overview\">\n                                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                                    <path d=\"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z\"></path>\n                                </svg>\n                                <span>Overview</span>\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"#\" class=\"menu-item\" id=\"menuStudents\" data-page=\"students\">\n                                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                                    <path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path>\n                                    <circle cx=\"12\" cy=\"7\" r=\"4\"></circle>\n                                </svg>\n                                <span>Students</span>\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"#\" class=\"menu-item\" id=\"menuFaculty\" data-page=\"faculty\">\n                                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                                    <path d=\"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path>\n                                    <circle cx=\"9\" cy=\"7\" r=\"4\"></circle>\n                                    <path d=\"M23 21v-2a4 4 0 0 0-3-3.87\"></path>\n                                    <path d=\"M16 3.13a4 4 0 0 1 0 7.75\"></path>\n                                </svg>\n                                <span>Faculty</span>\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"#\" class=\"menu-item\" id=\"menuReport\" data-page=\"report\">\n                                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                                    <path d=\"M18 20V10\"></path>\n                                    <path d=\"M12 20V4\"></path>\n                                    <path d=\"M6 20v-6\"></path>\n                                </svg>\n                                <span>Report</span>\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"#\" class=\"menu-item\" id=\"menuProfile\" data-page=\"profile\">\n                                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                                    <path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path>\n                                    <circle cx=\"12\" cy=\"7\" r=\"4\"></circle>\n                                </svg>\n                                <span>Profile</span>\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"#\" class=\"menu-item\" data-page=\"settings\">\n                                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                                    <circle cx=\"12\" cy=\"12\" r=\"3\"></circle>\n                                    <path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z\"></path>\n                                </svg>\n                                <span>System Settings</span>\n                            </a>\n                        </li>\n                    </ul>\n                </div>\n                \n                <div class=\"sidebar-footer\">\n                    <span class=\"version-text\">v1.0.0</span>\n                </div>\n            </nav>\n\n            <div class=\"main-content\">\n                <header class=\"top-header\">\n                    <div class=\"header-left\">\n                        <h1 class=\"page-title\">DashBoard</h1>\n                    </div>\n                    <div class=\"header-right\">\n                        <div class=\"search-container\">\n                            <input type=\"text\" class=\"search-input\" placeholder=\"Search\">\n                            <svg class=\"search-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                                <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n                                <path d=\"M21 21l-4.35-4.35\"></path>\n                            </svg>\n                        </div>\n                    </div>\n                </header>\n\n                <div class=\"content-area\">\n                    <section class=\"overview-banner\">\n                        <div class=\"banner-content\">\n                            <h2 class=\"banner-title\">Overview</h2>\n                            <p class=\"banner-subtitle\">Stay informed with the latest updates across your campus</p>\n                        </div>\n                    </section>\n\n                    <section class=\"metrics-section\">\n                        <div class=\"metrics-grid\">\n                            <div class=\"metric-card student-card\">\n                                <div class=\"metric-icon\">\n                                    <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                                        <path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path>\n                                        <circle cx=\"12\" cy=\"7\" r=\"4\"></circle>\n                                    </svg>\n                                </div>\n                                <div class=\"metric-content\">\n                                    <div class=\"metric-label\">Total student in campus</div>\n                                    <div class=\"metric-value\" id=\"studentCount\">0</div>\n                                </div>\n                            </div>\n\n                            <div class=\"metric-card faculty-card\">\n                                <div class=\"metric-icon\">\n                                    <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                                        <path d=\"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path>\n                                        <circle cx=\"9\" cy=\"7\" r=\"4\"></circle>\n                                        <path d=\"M23 21v-2a4 4 0 0 0-3-3.87\"></path>\n                                        <path d=\"M16 3.13a4 4 0 0 1 0 7.75\"></path>\n                                    </svg>\n                                </div>\n                                <div class=\"metric-content\">\n                                    <div class=\"metric-label\">Total Faculty(employee)</div>\n                                    <div class=\"metric-value\" id=\"facultyCount\">0</div>\n                                </div>\n                            </div>\n\n                            <div class=\"metric-card course-card\">\n                                <div class=\"metric-icon\">\n                                    <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                                        <path d=\"M4 19.5A2.5 2.5 0 0 1 6.5 17H20\"></path>\n                                        <path d=\"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z\"></path>\n                                    </svg>\n                                </div>\n                                <div class=\"metric-content\">\n                                    <div class=\"metric-label\">Courses</div>\n                                    <div class=\"metric-value\" id=\"courseCount\">0</div>\n                                </div>\n                            </div>\n\n                            <div class=\"metric-card department-card\">\n                                <div class=\"metric-icon\">\n                                    <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                                        <path d=\"M3 21h18\"></path>\n                                        <path d=\"M5 21V7l8-4v18\"></path>\n                                        <path d=\"M19 21V11l-6-4\"></path>\n                                    </svg>\n                                </div>\n                                <div class=\"metric-content\">\n                                    <div class=\"metric-label\">Departments</div>\n                                    <div class=\"metric-value\" id=\"departmentCount\">0</div>\n                                </div>\n                            </div>\n                        </div>\n                    </section>\n\n                    <section class=\"charts-section\">\n                        <div class=\"chart-container\">\n                            <h3 class=\"chart-title\">Total numbers of students per course</h3>\n                            <div class=\"chart-wrapper\">\n                                <canvas id=\"studentsChart\"></canvas>\n                            </div>\n                        </div>\n\n                        <div class=\"chart-container\">\n                            <h3 class=\"chart-title\">Total numbers of faculty per department</h3>\n                            <div class=\"chart-wrapper\">\n                                <canvas id=\"facultyChart\"></canvas>\n                            </div>\n                        </div>\n                    </section>\n\n                    <section class=\"activity-section\">\n                        <div class=\"activity-container\">\n                            <h3 class=\"activity-title\">Recent Activity</h3>\n                            <ul class=\"activity-list\" id=\"recentActivity\"></ul>\n                        </div>\n                    </section>\n                </div>\n            </div>\n        </div>\n    ";

          // --- existing logic (unchanged) ---
          _context.p = 1;
          _context.n = 2;
          return Promise.all([axios__WEBPACK_IMPORTED_MODULE_1___default().get("/api/students"), axios__WEBPACK_IMPORTED_MODULE_1___default().get("/api/faculty"), axios__WEBPACK_IMPORTED_MODULE_1___default().get("/api/courses"), axios__WEBPACK_IMPORTED_MODULE_1___default().get("/api/departments")]);
        case 2:
          _yield$Promise$all = _context.v;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 4);
          studentsRes = _yield$Promise$all2[0];
          facultyRes = _yield$Promise$all2[1];
          coursesRes = _yield$Promise$all2[2];
          departmentsRes = _yield$Promise$all2[3];
          students = studentsRes.data;
          faculty = facultyRes.data;
          courses = coursesRes.data;
          departments = departmentsRes.data;
          document.getElementById("studentCount").textContent = students.length;
          document.getElementById("facultyCount").textContent = faculty.length;
          document.getElementById("courseCount").textContent = courses.length;
          document.getElementById("departmentCount").textContent = departments.length;
          courseCounts = {};
          students.forEach(function (s) {
            var course = s.course && (s.course.course_name || s.course.name) || "Unassigned";
            courseCounts[course] = (courseCounts[course] || 0) + 1;
          });
          deptCounts = {};
          faculty.forEach(function (f) {
            var dept = f.department && (f.department.department_name || f.department.name) || "Unassigned";
            deptCounts[dept] = (deptCounts[dept] || 0) + 1;
          });
          renderChart("studentsChart", "Students per Course", courseCounts);
          renderChart("facultyChart", "Faculty per Department", deptCounts);
          recentActivity = [].concat(_toConsumableArray(students.slice(-3).map(function (s) {
            return "\uD83D\uDC68\u200D\uD83C\uDF93 New student added: ".concat(s.firstname || s.name || s.studID || "Student");
          })), _toConsumableArray(faculty.slice(-3).map(function (f) {
            return "\uD83D\uDC69\u200D\uD83C\uDFEB New faculty joined: ".concat(f.firstname || f.name || "Faculty");
          }))).reverse();
          list = document.getElementById("recentActivity");
          list.innerHTML = recentActivity.map(function (item) {
            return "<li>".concat(item, "</li>");
          }).join("");
          _context.n = 4;
          break;
        case 3:
          _context.p = 3;
          _t = _context.v;
          console.error("Error loading dashboard data:", _t);
        case 4:
          setupMenuListeners(app);
        case 5:
          return _context.a(2);
      }
    }, _callee, null, [[1, 3]]);
  }));
  return _loadDashboard.apply(this, arguments);
}
function renderChart(canvasId, label, dataObj) {
  var ctx = document.getElementById(canvasId).getContext("2d");
  new chart_js_auto__WEBPACK_IMPORTED_MODULE_0__["default"](ctx, {
    type: "bar",
    data: {
      labels: Object.keys(dataObj),
      datasets: [{
        label: label,
        data: Object.values(dataObj),
        backgroundColor: "#4B6BFB",
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
function setupMenuListeners(app) {
  var _document$getElementB, _document$getElementB2, _document$getElementB3, _document$getElementB4;
  document.querySelectorAll('.sidebar-menu a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var page = this.getAttribute('data-page');
      if (page === 'settings') (0,_SystemSettings__WEBPACK_IMPORTED_MODULE_2__.loadSystemSettings)(app);
      if (page === 'students') (0,_Students_js__WEBPACK_IMPORTED_MODULE_4__.loadStudents)(app);
      if (page === 'faculty') (0,_Faculty_js__WEBPACK_IMPORTED_MODULE_5__.loadFaculty)(app);
      if (page === 'report') (0,_Report_js__WEBPACK_IMPORTED_MODULE_6__.loadReport)(app);
    });
  });
  (_document$getElementB = document.getElementById("menuProfile")) === null || _document$getElementB === void 0 || _document$getElementB.addEventListener("click", function (e) {
    e.preventDefault();
    var userId = localStorage.getItem("user_id");
    (0,_Profile_js__WEBPACK_IMPORTED_MODULE_3__.loadProfile)(app, userId);
  });
  (_document$getElementB2 = document.getElementById("menuStudents")) === null || _document$getElementB2 === void 0 || _document$getElementB2.addEventListener("click", function (e) {
    e.preventDefault();
    (0,_Students_js__WEBPACK_IMPORTED_MODULE_4__.loadStudents)(app);
  });
  (_document$getElementB3 = document.getElementById("menuFaculty")) === null || _document$getElementB3 === void 0 || _document$getElementB3.addEventListener("click", function (e) {
    e.preventDefault();
    (0,_Faculty_js__WEBPACK_IMPORTED_MODULE_5__.loadFaculty)(app);
  });
  (_document$getElementB4 = document.getElementById("menuReport")) === null || _document$getElementB4 === void 0 || _document$getElementB4.addEventListener("click", function (e) {
    e.preventDefault();
    (0,_Report_js__WEBPACK_IMPORTED_MODULE_6__.loadReport)(app);
  });
}

/***/ }),

/***/ "./resources/js/components/Faculty.js":
/*!********************************************!*\
  !*** ./resources/js/components/Faculty.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadFaculty: () => (/* binding */ loadFaculty)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

function loadFaculty(app) {
  app.innerHTML = "\n    <div class=\"dashboard-container\">\n      <nav class=\"sidebar\">\n        <div class=\"sidebar-content\">\n          <div class=\"sidebar-header\">\n            <img src=\"/images/logo.png\" alt=\"EDUTrack logo\" class=\"sidebar-logo\" />\n            <h1 class=\"sidebar-title\">EDUTrack</h1>\n          </div>\n\n          <button class=\"new-item-btn\" id=\"addFacultyBtn\">\n            <svg class=\"btn-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n              <line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line>\n              <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>\n            </svg>\n            Add Faculty\n          </button>\n\n        <ul class=\"sidebar-menu\">\n            <li>\n              <a href=\"#\" class=\"menu-item\" data-page=\"overview\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z\"></path>\n                </svg>\n                <span>Overview</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item\" data-page=\"students\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path>\n                  <circle cx=\"12\" cy=\"7\" r=\"4\"></circle>\n                </svg>\n                <span>Students</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item active\" data-page=\"faculty\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path>\n                  <circle cx=\"9\" cy=\"7\" r=\"4\"></circle>\n                  <path d=\"M23 21v-2a4 4 0 0 0-3-3.87\"></path>\n                  <path d=\"M16 3.13a4 4 0 0 1 0 7.75\"></path>\n                </svg>\n                <span>Faculty</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item\" id=\"menuReport\" data-page=\"report\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M18 20V10\"></path>\n                  <path d=\"M12 20V4\"></path>\n                  <path d=\"M6 20v-6\"></path>\n                </svg>\n                <span>Report</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item\" data-page=\"profile\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path>\n                  <circle cx=\"12\" cy=\"7\" r=\"4\"></circle>\n                </svg>\n                <span>Profile</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item\" data-page=\"settings\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <circle cx=\"12\" cy=\"12\" r=\"3\"></circle>\n                  <path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z\"></path>\n                </svg>\n                <span>System Settings</span>\n              </a>\n            </li>\n        </ul>\n        </div>\n\n        <div class=\"sidebar-footer\">\n          <span class=\"version-text\">v1.0.0</span>\n        </div>\n      </nav>\n\n      <div class=\"main-content\">\n        <header class=\"top-header\">\n          <div class=\"header-left\">\n            <h1 class=\"page-title\">Faculty Management</h1>\n          </div>\n          <div class=\"header-right\">\n            <div class=\"search-container\">\n              <input type=\"text\" class=\"search-input\" placeholder=\"Search\">\n              <svg class=\"search-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n                <path d=\"M21 21l-4.35-4.35\"></path>\n              </svg>\n            </div>\n          </div>\n        </header>\n\n        <div class=\"content-area\">\n          <section class=\"students-banner\">\n            <div class=\"banner-content\">\n              <h2 class=\"banner-title\">Faculty Management</h2>\n              <p class=\"banner-subtitle\">can add, edit, delete data</p>\n            </div>\n          </section>\n\n          <section class=\"filters-section\">\n            <div class=\"filters-container\">\n              <div class=\"search-group\">\n                <input type=\"text\" id=\"searchInput\" class=\"search-field\" placeholder=\"Search faculty...\" />\n                <svg class=\"search-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n                  <path d=\"M21 21l-4.35-4.35\"></path>\n                </svg>\n              </div>\n\n              <div class=\"filter-group\">\n                <select id=\"departmentFilter\" class=\"filter-select\"><option value=\"\">All Departments</option></select>\n                <svg class=\"dropdown-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <polyline points=\"6,9 12,15 18,9\"></polyline>\n                </svg>\n              </div>\n\n              <div class=\"filter-group\">\n                <select id=\"academicYearFilter\" class=\"filter-select\"><option value=\"\">All Academic Years</option></select>\n                <svg class=\"dropdown-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <polyline points=\"6,9 12,15 18,9\"></polyline>\n                </svg>\n              </div>\n\n              <div class=\"filter-group\">\n                <select id=\"yearstatusFilter\" class=\"filter-select\">\n            <option value=\"\">All Status</option>\n            <option value=\"active\">Active</option>\n            <option value=\"inactive\">Inactive</option>\n            <option value=\"graduated\">Graduated</option>\n          </select>\n                <svg class=\"dropdown-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <polyline points=\"6,9 12,15 18,9\"></polyline>\n                </svg>\n              </div>\n\n              <button id=\"clearFilters\" class=\"btn btn-clear\">Clear Filters</button>\n            </div>\n        </section>\n\n          <section class=\"table-section\">\n            <div class=\"table-container\">\n              <table class=\"students-table\">\n            <thead>\n              <tr>\n                <th>ID</th>\n                <th>Faculty ID</th>\n                <th>Name</th>\n                <th>Email</th>\n                <th>Department</th>\n                <th>Position</th>\n                <th>Academic Year</th>\n                <th>Status</th>\n                <th>Actions</th>\n              </tr>\n            </thead>\n            <tbody id=\"facultyList\"></tbody>\n          </table>\n            </div>\n        </section>\n        </div>\n      </div>\n\n      <!-- Modal -->\n      <div id=\"facultyModal\" class=\"modal hidden\" aria-hidden=\"true\" role=\"dialog\" aria-modal=\"true\">\n        <div class=\"modal-content\" role=\"document\">\n          <button id=\"closeFacultyModal\" class=\"modal-close\" aria-label=\"Close\">&times;</button>\n          <h3 id=\"facultyModalTitle\" class=\"modal-title\">Add New Faculty</h3>\n\n          <form id=\"facultyForm\" class=\"student-form\" autocomplete=\"on\" novalidate>\n            <input type=\"hidden\" name=\"edit_id\" id=\"edit_id\" />\n\n            <div class=\"form-column\">\n              <div class=\"form-group\">\n                <label for=\"faculty_id\" class=\"form-label\">Faculty ID</label>\n                <input type=\"text\" name=\"faculty_id\" id=\"faculty_id\" class=\"form-input\" placeholder=\"Faculty ID\" required />\n              </div>\n              <div class=\"form-group\">\n                <label for=\"first_name\" class=\"form-label\">First Name</label>\n                <input type=\"text\" name=\"first_name\" id=\"first_name\" class=\"form-input\" placeholder=\"First Name\" required />\n              </div>\n              <div class=\"form-group\">\n                <label for=\"middle_name\" class=\"form-label\">Middle Name</label>\n                <input type=\"text\" name=\"middle_name\" id=\"middle_name\" class=\"form-input\" placeholder=\"Middle Name\" />\n              </div>\n              <div class=\"form-group\">\n                <label for=\"last_name\" class=\"form-label\">Last Name</label>\n                <input type=\"text\" name=\"last_name\" id=\"last_name\" class=\"form-input\" placeholder=\"Last Name\" required />\n              </div>\n              <div class=\"form-group\">\n                <label for=\"email\" class=\"form-label\">Email</label>\n                <input type=\"email\" name=\"email\" id=\"email\" class=\"form-input\" placeholder=\"Email\" required />\n              </div>\n              <div class=\"form-group\">\n                <label for=\"phone\" class=\"form-label\">Phone</label>\n                <input type=\"text\" name=\"phone\" id=\"phone\" class=\"form-input\" placeholder=\"Phone\" />\n              </div>\n            </div>\n\n            <div class=\"form-column\">\n              <div class=\"form-group\">\n                <label for=\"address\" class=\"form-label\">Address</label>\n                <input type=\"text\" name=\"address\" id=\"address\" class=\"form-input\" placeholder=\"Address\" />\n              </div>\n              <div class=\"form-group\">\n                <label for=\"position\" class=\"form-label\">Position</label>\n                <input type=\"text\" name=\"position\" id=\"position\" class=\"form-input\" placeholder=\"Position\" />\n              </div>\n              <div class=\"form-group\">\n                <label for=\"date_hired\" class=\"form-label\">Date Hired</label>\n                <input type=\"date\" name=\"date_hired\" id=\"date_hired\" class=\"form-input\" />\n              </div>\n              <div class=\"form-group\">\n                <label for=\"departmentSelect\" class=\"form-label\">Department</label>\n                <select name=\"department_id\" id=\"departmentSelect\" class=\"form-select\" required>\n              <option value=\"\">Select Department</option>\n            </select>\n              </div>\n              <div class=\"form-group\">\n                <label for=\"academicYearSelectForm\" class=\"form-label\">Academic Year</label>\n                <select name=\"academic_year_id\" id=\"academicYearSelectForm\" class=\"form-select\" required>\n              <option value=\"\">Select Academic Year</option>\n            </select>\n              </div>\n              <div class=\"form-group\">\n                <label for=\"yearstatus\" class=\"form-label\">Status</label>\n                <select name=\"yearstatus\" id=\"yearstatus\" class=\"form-select\" required>\n              <option value=\"active\">Active</option>\n              <option value=\"inactive\">Inactive</option>\n              <option value=\"graduated\">Graduated</option>\n            </select>\n              </div>\n            </div>\n\n            <div class=\"form-actions\">\n              <button type=\"button\" id=\"cancelBtn\" class=\"btn btn-cancel\">Cancel</button>\n              <button type=\"submit\" id=\"submitBtn\" class=\"btn btn-save\">Save Faculty</button>\n            </div>\n          </form>\n        </div>\n      </div>\n    </div>\n  ";

  // ----- existing logic (kept unchanged) -----
  var allFaculty = [];
  var allDepartments = [];
  var allAcademicYears = [];
  var isEditing = false;

  // Load dropdown data
  function loadSelectOptions() {
    return _loadSelectOptions.apply(this, arguments);
  } // Fetch faculty
  function _loadSelectOptions() {
    _loadSelectOptions = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var _yield$Promise$all, _yield$Promise$all2, departmentsRes, yearsRes;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return Promise.all([axios__WEBPACK_IMPORTED_MODULE_0___default().get("/api/departments"), axios__WEBPACK_IMPORTED_MODULE_0___default().get("/api/academic-years")]);
          case 1:
            _yield$Promise$all = _context2.v;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
            departmentsRes = _yield$Promise$all2[0];
            yearsRes = _yield$Promise$all2[1];
            allDepartments = departmentsRes.data;
            allAcademicYears = yearsRes.data;
            document.getElementById("departmentFilter").innerHTML = "<option value=\"\">All Departments</option>" + allDepartments.map(function (d) {
              return "<option value=\"".concat(d.id, "\">").concat(d.name, "</option>");
            }).join("");
            document.getElementById("departmentSelect").innerHTML = "<option value=\"\">Select Department</option>" + allDepartments.map(function (d) {
              return "<option value=\"".concat(d.id, "\">").concat(d.name, "</option>");
            }).join("");
            document.getElementById("academicYearFilter").innerHTML = "<option value=\"\">All Academic Years</option>" + allAcademicYears.map(function (y) {
              return "<option value=\"".concat(y.id, "\">").concat(y.year, "</option>");
            }).join("");
            document.getElementById("academicYearSelectForm").innerHTML = "<option value=\"\">Select Academic Year</option>" + allAcademicYears.map(function (y) {
              return "<option value=\"".concat(y.id, "\">").concat(y.year, "</option>");
            }).join("");
          case 2:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    return _loadSelectOptions.apply(this, arguments);
  }
  function fetchFaculty() {
    return _fetchFaculty.apply(this, arguments);
  } // Render table
  function _fetchFaculty() {
    _fetchFaculty = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var res, _t;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            _context3.p = 0;
            _context3.n = 1;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().get("/api/faculty");
          case 1:
            res = _context3.v;
            allFaculty = res.data;
            renderFaculty();
            _context3.n = 3;
            break;
          case 2:
            _context3.p = 2;
            _t = _context3.v;
            console.error("Error fetching faculty:", _t);
          case 3:
            return _context3.a(2);
        }
      }, _callee3, null, [[0, 2]]);
    }));
    return _fetchFaculty.apply(this, arguments);
  }
  function renderFaculty() {
    var search = document.getElementById("searchInput").value.toLowerCase();
    var department = document.getElementById("departmentFilter").value;
    var academicYear = document.getElementById("academicYearFilter").value;
    var yearstatus = document.getElementById("yearstatusFilter").value;
    var tbody = document.getElementById("facultyList");
    var filtered = allFaculty.filter(function (f) {
      var match = true;
      if (search) match = f.first_name.toLowerCase().includes(search) || f.last_name.toLowerCase().includes(search) || f.email.toLowerCase().includes(search);
      if (match && department) match = f.department_id == department;
      if (match && academicYear) match = f.academic_year_id == academicYear;
      if (match && yearstatus) match = f.yearstatus == yearstatus;
      return match;
    });
    tbody.innerHTML = filtered.length ? filtered.map(function (f) {
      var _allDepartments$find, _allAcademicYears$fin;
      return "\n          <tr>\n            <td>".concat(f.id, "</td>\n            <td>").concat(f.faculty_id, "</td>\n            <td>").concat(f.first_name, " ").concat(f.middle_name || "", " ").concat(f.last_name, "</td>\n            <td>").concat(f.email, "</td>\n            <td>").concat(((_allDepartments$find = allDepartments.find(function (d) {
        return d.id == f.department_id;
      })) === null || _allDepartments$find === void 0 ? void 0 : _allDepartments$find.name) || "", "</td>\n            <td>").concat(f.position || "", "</td>\n            <td>").concat(((_allAcademicYears$fin = allAcademicYears.find(function (y) {
        return y.id == f.academic_year_id;
      })) === null || _allAcademicYears$fin === void 0 ? void 0 : _allAcademicYears$fin.year) || "", "</td>\n            <td>\n              <span class=\"status-badge ").concat(f.yearstatus, "\">\n                ").concat(f.yearstatus, "\n              </span>\n            </td>\n            <td class=\"actions\">\n              <button class=\"action-btn edit-btn\" data-id=\"").concat(f.id, "\" title=\"Edit\">Edit</button>\n              <button class=\"action-btn archive-btn\" data-id=\"").concat(f.id, "\" title=\"Archive\">Archive</button>\n            </td>\n          </tr>\n        ");
    }).join("") : "<tr><td colspan=\"9\" class=\"text-center p-4\">No faculty found.</td></tr>";

    // Attach edit/archive logic
    document.querySelectorAll(".edit-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        return openEditModal(btn.dataset.id);
      });
    });
    document.querySelectorAll(".archive-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        return deleteFaculty(btn.dataset.id);
      });
    });
  }
  function deleteFaculty(_x) {
    return _deleteFaculty.apply(this, arguments);
  }
  function _deleteFaculty() {
    _deleteFaculty = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(id) {
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            if (!confirm("Delete this faculty?")) {
              _context4.n = 2;
              break;
            }
            _context4.n = 1;
            return axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"]("/api/faculty/".concat(id));
          case 1:
            fetchFaculty();
          case 2:
            return _context4.a(2);
        }
      }, _callee4);
    }));
    return _deleteFaculty.apply(this, arguments);
  }
  function openEditModal(_x2) {
    return _openEditModal.apply(this, arguments);
  } // Modal logic
  function _openEditModal() {
    _openEditModal = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(id) {
      var res, f;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            _context5.n = 1;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().get("/api/faculty/".concat(id));
          case 1:
            res = _context5.v;
            f = res.data;
            isEditing = true;
            document.getElementById("edit_id").value = f.id;
            document.getElementById("faculty_id").value = f.faculty_id;
            document.getElementById("first_name").value = f.first_name;
            document.getElementById("middle_name").value = f.middle_name || "";
            document.getElementById("last_name").value = f.last_name;
            document.getElementById("email").value = f.email;
            document.getElementById("phone").value = f.phone || "";
            document.getElementById("address").value = f.address || "";
            document.getElementById("position").value = f.position || "";
            document.getElementById("date_hired").value = f.date_hired || "";
            document.getElementById("departmentSelect").value = f.department_id || "";
            document.getElementById("academicYearSelectForm").value = f.academic_year_id || "";
            document.getElementById("yearstatus").value = f.yearstatus || "active";
            document.getElementById("facultyModalTitle").textContent = "Edit Faculty";
            document.getElementById("submitBtn").textContent = "Update Faculty";
            document.getElementById("facultyModal").classList.remove("hidden");
          case 2:
            return _context5.a(2);
        }
      }, _callee5);
    }));
    return _openEditModal.apply(this, arguments);
  }
  document.getElementById("addFacultyBtn").addEventListener("click", showModal);
  var addFacultyBtnTop = document.getElementById("addFacultyBtnTop");
  if (addFacultyBtnTop) {
    addFacultyBtnTop.addEventListener("click", showModal);
  }
  document.getElementById("closeFacultyModal").addEventListener("click", hideModal);
  document.getElementById("cancelBtn").addEventListener("click", hideModal);
  function showModal() {
    document.getElementById("facultyModal").classList.remove("hidden");
    document.getElementById("facultyModalTitle").textContent = "Add New Faculty";
    document.getElementById("submitBtn").textContent = "Save Faculty";
    resetForm();
  }
  function hideModal() {
    document.getElementById("facultyModal").classList.add("hidden");
    resetForm();
  }

  // Submit form
  var form = document.getElementById("facultyForm");
  form.addEventListener("submit", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
      var data, id;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            e.preventDefault();
            data = Object.fromEntries(new FormData(form));
            id = data.edit_id;
            delete data.edit_id;
            if (!isEditing) {
              _context.n = 2;
              break;
            }
            _context.n = 1;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().put("/api/faculty/".concat(id), data);
          case 1:
            _context.n = 3;
            break;
          case 2:
            _context.n = 3;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().post("/api/faculty", data);
          case 3:
            hideModal();
            fetchFaculty();
          case 4:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function (_x3) {
      return _ref.apply(this, arguments);
    };
  }());
  function resetForm() {
    form.reset();
    isEditing = false;
  }

  // Filters
  document.getElementById("searchInput").addEventListener("input", renderFaculty);
  document.addEventListener("change", function (e) {
    var _e$target;
    var id = (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.id;
    if (id === "departmentFilter" || id === "academicYearFilter" || id === "yearstatusFilter") {
      renderFaculty();
    }
  });
  document.getElementById("clearFilters").addEventListener("click", function () {
    document.getElementById("searchInput").value = "";
    document.getElementById("departmentFilter").value = "";
    document.getElementById("academicYearFilter").value = "";
    document.getElementById("yearstatusFilter").value = "";
    renderFaculty();
  });
  loadSelectOptions().then(fetchFaculty);
}

/***/ }),

/***/ "./resources/js/components/Profile.js":
/*!********************************************!*\
  !*** ./resources/js/components/Profile.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadProfile: () => (/* binding */ loadProfile)
/* harmony export */ });
/* harmony import */ var _SystemSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SystemSettings */ "./resources/js/components/SystemSettings.js");
/* harmony import */ var _Students__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Students */ "./resources/js/components/Students.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }



function loadProfile(app) {
  app.innerHTML = "\n    <div class=\"dashboard-container\">\n      <nav class=\"sidebar\">\n        <div class=\"sidebar-content\">\n          <div class=\"sidebar-header\">\n            <img src=\"/images/logo.png\" alt=\"EDUTrack logo\" class=\"sidebar-logo\" />\n            <h1 class=\"sidebar-title\">EDUTrack</h1>\n          </div>\n          \n          <button class=\"new-item-btn\">\n            <svg class=\"btn-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n              <line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line>\n              <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>\n            </svg>\n            New Item\n          </button>\n          \n          <ul class=\"sidebar-menu\">\n            <li>\n              <a href=\"#\" class=\"menu-item\" data-page=\"overview\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z\"></path>\n                </svg>\n                <span>Overview</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item\" data-page=\"students\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path>\n                  <circle cx=\"12\" cy=\"7\" r=\"4\"></circle>\n                </svg>\n                <span>Students</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item\" data-page=\"faculty\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path>\n                  <circle cx=\"9\" cy=\"7\" r=\"4\"></circle>\n                  <path d=\"M23 21v-2a4 4 0 0 0-3-3.87\"></path>\n                  <path d=\"M16 3.13a4 4 0 0 1 0 7.75\"></path>\n                </svg>\n                <span>Faculty</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item\" id=\"menuReport\" data-page=\"report\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M18 20V10\"></path>\n                  <path d=\"M12 20V4\"></path>\n                  <path d=\"M6 20v-6\"></path>\n                </svg>\n                <span>Report</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item active\" data-page=\"profile\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path>\n                  <circle cx=\"12\" cy=\"7\" r=\"4\"></circle>\n                </svg>\n                <span>Profile</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item\" id=\"menuSettings\" data-page=\"settings\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <circle cx=\"12\" cy=\"12\" r=\"3\"></circle>\n                  <path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z\"></path>\n                </svg>\n                <span>System Settings</span>\n              </a>\n            </li>\n          </ul>\n        </div>\n        \n        <div class=\"sidebar-footer\">\n          <span class=\"version-text\">v1.0.0</span>\n        </div>\n      </nav>\n\n      <div class=\"main-content\">\n        <header class=\"top-header\">\n          <div class=\"header-left\">\n            <h1 class=\"page-title\">My Profile</h1>\n          </div>\n          <div class=\"header-right\">\n            <div class=\"search-container\">\n              <input type=\"text\" class=\"search-input\" placeholder=\"Search\">\n              <svg class=\"search-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n                <path d=\"M21 21l-4.35-4.35\"></path>\n              </svg>\n            </div>\n          </div>\n        </header>\n\n        <div class=\"content-area\">\n          <section class=\"welcome-banner\">\n            <div class=\"banner-content\">\n              <div class=\"welcome-text\">\n                <h2 class=\"welcome-title\">Welcome, <span id=\"heroName\">User</span></h2>\n                <p class=\"welcome-date\" id=\"heroDate\"></p>\n              </div>\n              <div class=\"banner-actions\">\n                <button id=\"logoutBtn\" class=\"logout-btn\">Log out</button>\n              </div>\n            </div>\n          </section>\n\n          <section class=\"profile-content\">\n            <div class=\"profile-summary\">\n              <div class=\"profile-avatar\">\n                <div class=\"avatar-circle\" id=\"avatarCircle\" role=\"button\" tabindex=\"0\" aria-label=\"Upload profile picture\">\n                  <img id=\"avatarImage\" class=\"avatar-image\" alt=\"Profile picture\" />\n                  <svg class=\"avatar-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                    <path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path>\n                    <circle cx=\"12\" cy=\"7\" r=\"4\"></circle>\n                  </svg>\n                </div>\n              </div>\n              <div class=\"profile-info\">\n                <h3 class=\"profile-name\" id=\"summaryName\">Admin User</h3>\n                <p class=\"profile-email\" id=\"summaryEmail\">admin@gmail.com</p>\n                <div class=\"profile-meta\">\n                  <div class=\"meta-item\">\n                    <span class=\"meta-label\">Role:</span>\n                    <span class=\"meta-value\">Admin</span>\n                  </div>\n                  <div class=\"meta-item\">\n                    <span class=\"meta-label\">Status:</span>\n                    <span class=\"meta-value status-active\">Active</span>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"profile-forms\">\n              <div class=\"form-section\">\n                <h3 class=\"section-title\">Profile Information</h3>\n                <form id=\"profileForm\" class=\"profile-form\">\n                  <div class=\"form-group\">\n                    <label for=\"name\" class=\"form-label\">Full Name*</label>\n                    <input type=\"text\" id=\"name\" class=\"form-input\" required />\n                  </div>\n                  <div class=\"form-group\">\n                    <label for=\"email\" class=\"form-label\">Email Address*</label>\n                    <input type=\"email\" id=\"email\" class=\"form-input\" required />\n                  </div>\n                  <div class=\"form-actions\">\n                    <button type=\"button\" id=\"downloadDataBtn\" class=\"btn btn-secondary\">Download Data</button>\n                    <button type=\"submit\" class=\"btn btn-primary\">Update Profile</button>\n                  </div>\n                  <div id=\"profileMsg\" class=\"form-message\" aria-live=\"polite\"></div>\n                </form>\n              </div>\n\n              <div class=\"form-section\">\n                <h3 class=\"section-title\">Change Password</h3>\n                <form id=\"passwordForm\" class=\"password-form\">\n                  <div class=\"form-group\">\n                    <label for=\"current_password\" class=\"form-label\">Current Password:</label>\n                    <input type=\"password\" id=\"current_password\" class=\"form-input\" />\n                  </div>\n                  <div class=\"form-group\">\n                    <label for=\"new_password\" class=\"form-label\">New Password:</label>\n                    <input type=\"password\" id=\"new_password\" class=\"form-input\" />\n                  </div>\n                  <div class=\"form-group\">\n                    <label for=\"confirm_password\" class=\"form-label\">Confirm New Password:</label>\n                    <input type=\"password\" id=\"confirm_password\" class=\"form-input\" />\n                  </div>\n                  <div class=\"form-actions right\">\n                    <button type=\"submit\" class=\"btn btn-primary\">Update Password</button>\n                  </div>\n                </form>\n              </div>\n            </div>\n          </section>\n        </div>\n      </div>\n    </div>\n\n    <input type=\"file\" id=\"avatarInput\" class=\"hidden-file-input\" accept=\"image/*\" />\n\n    <div id=\"exportModal\" class=\"modal-overlay\" aria-hidden=\"true\">\n      <div class=\"modal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"exportModalTitle\">\n        <div class=\"modal-header\">\n          <h3 id=\"exportModalTitle\" class=\"modal-title\">Download My Data</h3>\n          <button type=\"button\" id=\"exportModalClose\" class=\"modal-close\" aria-label=\"Close\">\xD7</button>\n        </div>\n        <div class=\"modal-separator\"></div>\n        <div class=\"modal-body\">\n          <label for=\"exportFormat\" class=\"form-label\">Select Format</label>\n          <select id=\"exportFormat\" class=\"form-input\">\n            <option value=\"pdf\">PDF</option>\n            <option value=\"doc\">Word (.doc)</option>\n            <option value=\"xls\">Excel (.csv)</option>\n          </select>\n        </div>\n        <div class=\"modal-separator\"></div>\n        <div class=\"modal-footer\">\n          <button type=\"button\" id=\"exportCancelBtn\" class=\"btn btn-secondary\">Cancel</button>\n          <button type=\"button\" id=\"exportConfirmBtn\" class=\"btn btn-primary\">Download</button>\n        </div>\n      </div>\n    </div>\n\n    \n  ";

  // Navigation
  document.getElementById("menuSettings").addEventListener("click", function (e) {
    e.preventDefault();
    (0,_SystemSettings__WEBPACK_IMPORTED_MODULE_0__.loadSystemSettings)(app);
  });
  document.querySelectorAll('.sidebar-menu a[data-page="students"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      (0,_Students__WEBPACK_IMPORTED_MODULE_1__.loadStudents)(app);
    });
  });

  // Auth
  var token = localStorage.getItem("token");
  var api = axios__WEBPACK_IMPORTED_MODULE_2___default().create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      Authorization: "Bearer ".concat(token)
    }
  });

  // State
  var currentUser = null;

  // Load user data
  function loadProfileData() {
    return _loadProfileData.apply(this, arguments);
  }
  function _loadProfileData() {
    _loadProfileData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var res, user, _avatarImage, _avatarCircle, storedAvatar, serverAvatar, effectiveAvatar, _t5;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            _context6.p = 0;
            _context6.n = 1;
            return api.get("/profile");
          case 1:
            res = _context6.v;
            user = res.data;
            currentUser = user;
            document.getElementById("name").value = user.name;
            document.getElementById("email").value = user.email;
            document.getElementById("summaryName").textContent = user.name;
            document.getElementById("summaryEmail").textContent = user.email;
            document.getElementById("heroName").textContent = (user.name || "User").split(" ")[0];
            document.getElementById("heroDate").textContent = new Date().toLocaleDateString(undefined, {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            });

            // Avatar
            _avatarImage = document.getElementById("avatarImage");
            _avatarCircle = document.getElementById("avatarCircle");
            storedAvatar = localStorage.getItem("avatarUrl");
            serverAvatar = user.avatar_url || user.avatar;
            if (serverAvatar && typeof serverAvatar === "string" && serverAvatar.startsWith("/")) {
              // normalize relative URL to absolute if API baseURL is set
              try {
                serverAvatar = new URL(serverAvatar, api.defaults.baseURL || window.location.origin).toString();
              } catch (_) {}
            }
            effectiveAvatar = serverAvatar || storedAvatar || null;
            if (effectiveAvatar) {
              _avatarImage.src = effectiveAvatar;
              _avatarImage.classList.add("visible");
              _avatarCircle.classList.add("has-image");
              if (effectiveAvatar !== storedAvatar) {
                localStorage.setItem("avatarUrl", effectiveAvatar);
              }
            } else {
              _avatarImage.removeAttribute("src");
              _avatarImage.classList.remove("visible");
              _avatarCircle.classList.remove("has-image");
            }
            _context6.n = 3;
            break;
          case 2:
            _context6.p = 2;
            _t5 = _context6.v;
            console.error(_t5);
            document.getElementById("profileMsg").textContent = "Failed to load profile.";
          case 3:
            return _context6.a(2);
        }
      }, _callee6, null, [[0, 2]]);
    }));
    return _loadProfileData.apply(this, arguments);
  }
  loadProfileData();

  // Profile update
  document.getElementById("profileForm").addEventListener("submit", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
      var name, email, msg, res, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            e.preventDefault();
            name = document.getElementById("name").value;
            email = document.getElementById("email").value;
            msg = document.getElementById("profileMsg");
            _context.p = 1;
            _context.n = 2;
            return api.put("/profile/update", {
              name: name,
              email: email
            });
          case 2:
            res = _context.v;
            msg.textContent = res.data.message;
            loadProfileData();
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            msg.textContent = "Error updating profile.";
            console.error(_t);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[1, 3]]);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());

  // Password update
  document.getElementById("passwordForm").addEventListener("submit", /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(e) {
      var current_password, new_password, confirm_password, msg, res, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            e.preventDefault();
            current_password = document.getElementById("current_password").value;
            new_password = document.getElementById("new_password").value;
            confirm_password = document.getElementById("confirm_password").value;
            msg = document.getElementById("profileMsg");
            if (!(new_password !== confirm_password)) {
              _context2.n = 1;
              break;
            }
            msg.textContent = "New passwords do not match.";
            return _context2.a(2);
          case 1:
            _context2.p = 1;
            _context2.n = 2;
            return api.put("/profile/password", {
              current_password: current_password,
              new_password: new_password,
              new_password_confirmation: confirm_password
            });
          case 2:
            res = _context2.v;
            msg.textContent = res.data.message;
            document.getElementById("passwordForm").reset();
            _context2.n = 4;
            break;
          case 3:
            _context2.p = 3;
            _t2 = _context2.v;
            msg.textContent = "Error updating password. Check your current password.";
            console.error(_t2);
          case 4:
            return _context2.a(2);
        }
      }, _callee2, null, [[1, 3]]);
    }));
    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());

  // Export helpers
  function openExportModal() {
    var overlay = document.getElementById("exportModal");
    overlay.setAttribute("aria-hidden", "false");
    overlay.classList.add("open");
    document.getElementById("exportFormat").value = "pdf";
  }
  function closeExportModal() {
    var overlay = document.getElementById("exportModal");
    overlay.setAttribute("aria-hidden", "true");
    overlay.classList.remove("open");
  }
  function downloadBlob(filename, blob) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }
  function toProfileDocHtml(user) {
    return "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>Profile</title></head><body>\n      <h1>Profile</h1>\n      <p><strong>Name:</strong> ".concat(user.name || '', "</p>\n      <p><strong>Email:</strong> ").concat(user.email || '', "</p>\n    </body></html>");
  }
  function toActivityDocHtml(items) {
    var rows = items.map(function (a) {
      return "<tr><td>".concat(a.date || a.created_at || '', "</td><td>").concat(a.action || a.type || a.event || '', "</td><td>").concat(a.details || a.description || '', "</td></tr>");
    }).join("");
    return "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>Activity Log</title></head><body>\n      <h1>Activity Log</h1>\n      <table border=\"1\" cellspacing=\"0\" cellpadding=\"6\"><thead><tr><th>Date</th><th>Action</th><th>Details</th></tr></thead><tbody>".concat(rows, "</tbody></table>\n    </body></html>");
  }
  function toProfileCsv(user) {
    return ["Field,Value", "Name,".concat(JSON.stringify(user.name || '')), "Email,".concat(JSON.stringify(user.email || ''))].join("\n");
  }
  function toActivityCsv(items) {
    var header = "Date,Action,Details";
    var rows = items.map(function (a) {
      return [a.date || a.created_at || '', a.action || a.type || a.event || '', (a.details || a.description || '').toString().replace(/\n/g, ' ')].map(function (v) {
        return JSON.stringify(v);
      }).join(",");
    });
    return [header].concat(_toConsumableArray(rows)).join("\n");
  }
  function openPrintWindow(html) {
    var win = window.open("", "_blank");
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.focus();
    win.print();
  }

  // Download Data
  document.getElementById("downloadDataBtn").addEventListener("click", function () {
    openExportModal();
  });

  // Activity Log removed

  // Export modal events
  document.getElementById("exportModalClose").addEventListener("click", closeExportModal);
  document.getElementById("exportCancelBtn").addEventListener("click", closeExportModal);
  document.getElementById("exportConfirmBtn").addEventListener("click", function () {
    var format = document.getElementById("exportFormat").value; // pdf | doc | xls
    if (currentUser) {
      if (format === "doc") {
        var html = toProfileDocHtml(currentUser);
        var blob = new Blob([html], {
          type: "application/msword"
        });
        downloadBlob("profile.doc", blob);
      } else if (format === "xls") {
        var csv = toProfileCsv(currentUser);
        var _blob = new Blob([csv], {
          type: "text/csv;charset=utf-8;"
        });
        downloadBlob("profile.csv", _blob);
      } else {
        var _html = toProfileDocHtml(currentUser);
        openPrintWindow(_html);
      }
    }
    closeExportModal();
  });

  // Avatar upload
  var avatarCircle = document.getElementById("avatarCircle");
  var avatarInput = document.getElementById("avatarInput");
  var avatarImage = document.getElementById("avatarImage");
  function triggerAvatarPicker() {
    avatarInput.click();
  }
  avatarCircle.addEventListener("click", triggerAvatarPicker);
  avatarCircle.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      triggerAvatarPicker();
    }
  });
  avatarInput.addEventListener("change", /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(e) {
      var file, msg, reader, tryUpload, _tryUpload, attempts, uploadedUrl, lastError, _i, _attempts, a, res, url, abs, _t3;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            _tryUpload = function _tryUpload3() {
              _tryUpload = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(endpoint, fieldName) {
                var form;
                return _regenerator().w(function (_context3) {
                  while (1) switch (_context3.n) {
                    case 0:
                      form = new FormData();
                      form.append(fieldName, file);
                      return _context3.a(2, api.post(endpoint, form, {
                        headers: {
                          "Content-Type": "multipart/form-data"
                        }
                      }));
                  }
                }, _callee3);
              }));
              return _tryUpload.apply(this, arguments);
            };
            tryUpload = function _tryUpload2(_x4, _x5) {
              return _tryUpload.apply(this, arguments);
            };
            file = e.target.files && e.target.files[0];
            if (file) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2);
          case 1:
            msg = document.getElementById("profileMsg");
            msg.textContent = "";
            reader = new FileReader();
            reader.onload = function () {
              avatarImage.src = reader.result;
              avatarImage.classList.add("visible");
              avatarCircle.classList.add("has-image");
            };
            reader.readAsDataURL(file);
            attempts = [{
              endpoint: "/profile/avatar",
              field: "avatar"
            }, {
              endpoint: "/profile/avatar/upload",
              field: "avatar"
            }, {
              endpoint: "/user/avatar",
              field: "avatar"
            }, {
              endpoint: "/user/avatar",
              field: "file"
            }, {
              endpoint: "/user/photo",
              field: "photo"
            }, {
              endpoint: "/users/avatar",
              field: "avatar"
            }, {
              endpoint: "/profile/photo",
              field: "image"
            }];
            uploadedUrl = null;
            lastError = null;
            _i = 0, _attempts = attempts;
          case 2:
            if (!(_i < _attempts.length)) {
              _context4.n = 8;
              break;
            }
            a = _attempts[_i];
            _context4.p = 3;
            _context4.n = 4;
            return tryUpload(a.endpoint, a.field);
          case 4:
            res = _context4.v;
            url = res && res.data && (res.data.avatar_url || res.data.url || res.data.path) || null;
            if (!url) {
              _context4.n = 5;
              break;
            }
            uploadedUrl = url;
            return _context4.a(3, 8);
          case 5:
            _context4.n = 7;
            break;
          case 6:
            _context4.p = 6;
            _t3 = _context4.v;
            lastError = _t3;
          case 7:
            _i++;
            _context4.n = 2;
            break;
          case 8:
            if (uploadedUrl) {
              try {
                abs = uploadedUrl.startsWith("http") ? uploadedUrl : new URL(uploadedUrl, api.defaults.baseURL || window.location.origin).toString();
                avatarImage.src = abs;
                localStorage.setItem("avatarUrl", abs);
              } catch (_) {
                avatarImage.src = uploadedUrl;
                localStorage.setItem("avatarUrl", uploadedUrl);
              }
              msg.textContent = "Profile picture updated.";
            } else {
              console.error("Avatar upload failed", lastError);
              msg.textContent = "Failed to upload profile picture.";
            }
            avatarInput.value = "";
          case 9:
            return _context4.a(2);
        }
      }, _callee4, null, [[3, 6]]);
    }));
    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }());

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
    var _t4;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _context5.p = 0;
          _context5.n = 1;
          return api.post("/auth/logout");
        case 1:
          _context5.n = 3;
          break;
        case 2:
          _context5.p = 2;
          _t4 = _context5.v;
          console.warn("Logout request failed, clearing token anyway.");
        case 3:
          localStorage.removeItem("token");
          window.location.href = "/";
        case 4:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 2]]);
  })));
}

/***/ }),

/***/ "./resources/js/components/Report.js":
/*!*******************************************!*\
  !*** ./resources/js/components/Report.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadReport: () => (/* binding */ loadReport)
/* harmony export */ });
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function loadReport(app) {
  app.innerHTML = "\n    <div class=\"dashboard-container\">\n      <nav class=\"sidebar\">\n        <div class=\"sidebar-content\">\n          <div class=\"sidebar-header\">\n            <img src=\"/images/logo.png\" alt=\"EDUTrack logo\" class=\"sidebar-logo\" />\n            <h1 class=\"sidebar-title\">EDUTrack</h1>\n          </div>\n          \n          <button class=\"new-item-btn\">\n            <svg class=\"btn-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n              <line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line>\n              <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>\n            </svg>\n            New Item\n          </button>\n          \n          <ul class=\"sidebar-menu\">\n            <li>\n              <a href=\"#\" class=\"menu-item\" data-page=\"overview\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z\"></path>\n                </svg>\n                <span>Overview</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item\" data-page=\"students\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path>\n                  <circle cx=\"12\" cy=\"7\" r=\"4\"></circle>\n                </svg>\n                <span>Students</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item\" data-page=\"faculty\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path>\n                  <circle cx=\"9\" cy=\"7\" r=\"4\"></circle>\n                  <path d=\"M23 21v-2a4 4 0 0 0-3-3.87\"></path>\n                  <path d=\"M16 3.13a4 4 0 0 1 0 7.75\"></path>\n                </svg>\n                <span>Faculty</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item active\" id=\"menuReport\" data-page=\"report\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M18 20V10\"></path>\n                  <path d=\"M12 20V4\"></path>\n                  <path d=\"M6 20v-6\"></path>\n                </svg>\n                <span>Report</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item\" data-page=\"profile\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path>\n                  <circle cx=\"12\" cy=\"7\" r=\"4\"></circle>\n                </svg>\n                <span>Profile</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item\" data-page=\"settings\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <circle cx=\"12\" cy=\"12\" r=\"3\"></circle>\n                  <path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z\"></path>\n                </svg>\n                <span>System Settings</span>\n              </a>\n            </li>\n          </ul>\n        </div>\n        \n        <div class=\"sidebar-footer\">\n          <span class=\"version-text\">v1.0.0</span>\n        </div>\n      </nav>\n\n      <div class=\"main-content\">\n        <header class=\"top-header\">\n          <div class=\"header-left\">\n            <h1 class=\"page-title\">Report</h1>\n          </div>\n          <div class=\"header-right\">\n            <div class=\"search-container\">\n              <input type=\"text\" class=\"search-input\" placeholder=\"Search\">\n              <svg class=\"search-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n                <path d=\"M21 21l-4.35-4.35\"></path>\n              </svg>\n            </div>\n          </div>\n        </header>\n\n        <div class=\"content-area\">\n          <section class=\"report-banner\">\n            <div class=\"banner-content\">\n              <h2 class=\"banner-title\">Report</h2>\n            </div>\n          </section>\n\n          <section class=\"filters-section\">\n            <div class=\"filters-container\">\n              <div class=\"filter-group\">\n                <select id=\"reportType\" class=\"filter-select\">\n                  <option value=\"students\">Students Report</option>\n                  <option value=\"faculty\">Faculty Report</option>\n                  <option value=\"courses\">Courses Report</option>\n                  <option value=\"departments\">Departments Report</option>\n                  <option value=\"academic_years\">Academic Years Report</option>\n                  <option value=\"archives\">Archives Report</option>\n                </select>\n                <svg class=\"dropdown-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <polyline points=\"6,9 12,15 18,9\"></polyline>\n                </svg>\n              </div>\n              \n              <div class=\"filter-group\">\n                <select id=\"courseSelect\" class=\"filter-select\">\n                  <option value=\"\">All Courses</option>\n                </select>\n                <svg class=\"dropdown-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <polyline points=\"6,9 12,15 18,9\"></polyline>\n                </svg>\n              </div>\n              \n              <div class=\"filter-group\">\n                <select id=\"departmentSelect\" class=\"filter-select\">\n                  <option value=\"\">All Departments</option>\n                </select>\n                <svg class=\"dropdown-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <polyline points=\"6,9 12,15 18,9\"></polyline>\n                </svg>\n              </div>\n              \n              <div class=\"filter-group\">\n                <select id=\"academicYearSelect\" class=\"filter-select\">\n                  <option value=\"\">All Academic Years</option>\n                </select>\n                <svg class=\"dropdown-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <polyline points=\"6,9 12,15 18,9\"></polyline>\n                </svg>\n              </div>\n\n              <div class=\"filter-group\">\n                <select id=\"exportFormat\" class=\"filter-select\">\n                  <option value=\"csv\">Export as CSV</option>\n                  <option value=\"pdf\">Export as PDF</option>\n                  <option value=\"excel\">Export as Excel</option>\n                  <option value=\"word\">Export as Word</option>\n                </select>\n                <svg class=\"dropdown-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <polyline points=\"6,9 12,15 18,9\"></polyline>\n                </svg>\n              </div>\n              \n              <div class=\"action-buttons\">\n                <button id=\"filterBtn\" class=\"btn btn-clear\">Clear Filters</button>\n                <button id=\"exportBtn\" class=\"btn btn-export\">Export Report</button>\n              </div>\n            </div>\n          </section>\n\n          <section class=\"report-summary\" id=\"reportSummary\"></section>\n\n          <section class=\"table-section\">\n            <div class=\"table-container\">\n              <table class=\"report-table\">\n                <thead>\n                  <tr id=\"reportHeader\">\n                    <!-- Headers will be dynamically populated based on report type -->\n                  </tr>\n                </thead>\n                <tbody id=\"reportTableBody\">\n                  <tr><td colspan=\"4\" class=\"no-data\">Loading...</td></tr>\n                </tbody>\n              </table>\n            </div>\n          </section>\n\n          <section class=\"make-report-section\">\n            <div class=\"make-report-container\">\n              <h3 class=\"section-title\">Make a report</h3>\n              <form class=\"report-form\">\n                <div class=\"form-group\">\n                  <label for=\"reportTitle\" class=\"form-label\">Report Title</label>\n                  <input type=\"text\" id=\"reportTitle\" class=\"form-input\" placeholder=\"Report title...\" />\n                </div>\n                \n                <div class=\"form-group\">\n                  <label for=\"reportSubject\" class=\"form-label\">Choose Subject</label>\n                  <select id=\"reportSubject\" class=\"form-select\">\n                    <option value=\"\">Choose Subject</option>\n                    <option value=\"faculty\">Faculty</option>\n                    <option value=\"student\">Student</option>\n                  </select>\n                </div>\n                \n                <div class=\"form-group\">\n                  <label for=\"reportContent\" class=\"form-label\">Report Content</label>\n                  <textarea id=\"reportContent\" class=\"form-textarea\" placeholder=\"Write you report...\"></textarea>\n                </div>\n                \n                <div class=\"form-actions\">\n                  <button type=\"button\" class=\"btn btn-send-report\">Send Report</button>\n                </div>\n              </form>\n            </div>\n          </section>\n        </div>\n      </div>\n    </div>\n  ";

  // --- Functionality (unchanged) ---
  fetchDropdowns();
  fetchReport();
  document.getElementById("filterBtn").addEventListener("click", fetchReport);
  document.getElementById("reportType").addEventListener("change", fetchReport);
  document.getElementById("courseSelect").addEventListener("change", fetchReport);
  document.getElementById("departmentSelect").addEventListener("change", fetchReport);
  document.getElementById("academicYearSelect").addEventListener("change", fetchReport);
  document.getElementById("exportBtn").addEventListener("click", exportReport);
  document.querySelector(".btn-send-report").addEventListener("click", sendReport);
  function fetchDropdowns() {
    return _fetchDropdowns.apply(this, arguments);
  }
  function _fetchDropdowns() {
    _fetchDropdowns = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var _yield$Promise$all, _yield$Promise$all2, courseRes, deptRes, yearRes, _yield$Promise$all3, _yield$Promise$all4, courses, departments, years, courseSelect, deptSelect, yearSelect, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return Promise.all([fetch("/api/courses"), fetch("/api/departments"), fetch("/api/academic-years")]);
          case 1:
            _yield$Promise$all = _context.v;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
            courseRes = _yield$Promise$all2[0];
            deptRes = _yield$Promise$all2[1];
            yearRes = _yield$Promise$all2[2];
            _context.n = 2;
            return Promise.all([courseRes.json(), deptRes.json(), yearRes.json()]);
          case 2:
            _yield$Promise$all3 = _context.v;
            _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 3);
            courses = _yield$Promise$all4[0];
            departments = _yield$Promise$all4[1];
            years = _yield$Promise$all4[2];
            courseSelect = document.getElementById("courseSelect");
            deptSelect = document.getElementById("departmentSelect");
            yearSelect = document.getElementById("academicYearSelect");
            courses.forEach(function (c) {
              courseSelect.innerHTML += "<option value=\"".concat(c.id, "\">").concat(c.name || c.course_name, "</option>");
            });
            departments.forEach(function (d) {
              deptSelect.innerHTML += "<option value=\"".concat(d.id, "\">").concat(d.name || d.department_name, "</option>");
            });
            years.forEach(function (y) {
              yearSelect.innerHTML += "<option value=\"".concat(y.id, "\">").concat(y.year || y.academic_year, "</option>");
            });
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            console.error("Error loading dropdowns:", _t);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[0, 3]]);
    }));
    return _fetchDropdowns.apply(this, arguments);
  }
  function fetchReport() {
    return _fetchReport.apply(this, arguments);
  } // Individual fetch functions for each report type
  function _fetchReport() {
    _fetchReport = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var type, course, department, year, tbody, header, summary, data, headers, summaryText, _t2, _t3;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            type = document.getElementById("reportType").value;
            course = document.getElementById("courseSelect").value;
            department = document.getElementById("departmentSelect").value;
            year = document.getElementById("academicYearSelect").value;
            tbody = document.getElementById("reportTableBody");
            header = document.getElementById("reportHeader");
            summary = document.getElementById("reportSummary");
            tbody.innerHTML = "<tr><td colspan=\"4\" class=\"no-data\">Loading...</td></tr>";
            _context2.p = 1;
            data = [];
            headers = [];
            summaryText = "";
            _t2 = type;
            _context2.n = _t2 === 'students' ? 2 : _t2 === 'faculty' ? 4 : _t2 === 'courses' ? 6 : _t2 === 'departments' ? 8 : _t2 === 'academic_years' ? 10 : _t2 === 'archives' ? 12 : 14;
            break;
          case 2:
            headers = ['#', 'Student Name', 'Course', 'Academic Year', 'Status'];
            _context2.n = 3;
            return fetchStudentsReport(course, department, year);
          case 3:
            data = _context2.v;
            summaryText = "Showing <strong>".concat(data.length, "</strong> students found.");
            return _context2.a(3, 14);
          case 4:
            headers = ['#', 'Faculty Name', 'Department', 'Academic Year', 'Status'];
            _context2.n = 5;
            return fetchFacultyReport(course, department, year);
          case 5:
            data = _context2.v;
            summaryText = "Showing <strong>".concat(data.length, "</strong> faculty found.");
            return _context2.a(3, 14);
          case 6:
            headers = ['#', 'Course Name', 'Department', 'Created Date', 'Status'];
            _context2.n = 7;
            return fetchCoursesReport();
          case 7:
            data = _context2.v;
            summaryText = "Showing <strong>".concat(data.length, "</strong> courses found.");
            return _context2.a(3, 14);
          case 8:
            headers = ['#', 'Department Name', 'Head', 'Created Date', 'Status'];
            _context2.n = 9;
            return fetchDepartmentsReport();
          case 9:
            data = _context2.v;
            summaryText = "Showing <strong>".concat(data.length, "</strong> departments found.");
            return _context2.a(3, 14);
          case 10:
            headers = ['#', 'Academic Year', 'Status', 'Created Date', 'Actions'];
            _context2.n = 11;
            return fetchAcademicYearsReport();
          case 11:
            data = _context2.v;
            summaryText = "Showing <strong>".concat(data.length, "</strong> academic years found.");
            return _context2.a(3, 14);
          case 12:
            headers = ['#', 'Type', 'Name/Title', 'Archived Date', 'Actions'];
            _context2.n = 13;
            return fetchArchivesReport();
          case 13:
            data = _context2.v;
            summaryText = "Showing <strong>".concat(data.length, "</strong> archived items found.");
            return _context2.a(3, 14);
          case 14:
            // Update table headers
            header.innerHTML = headers.map(function (h) {
              return "<th>".concat(h, "</th>");
            }).join('');
            if (data.length) {
              _context2.n = 15;
              break;
            }
            tbody.innerHTML = "<tr><td colspan=\"".concat(headers.length, "\" class=\"no-data\">No records found</td></tr>");
            summary.textContent = "";
            return _context2.a(2);
          case 15:
            // Render table rows based on data type
            tbody.innerHTML = data.map(function (item, index) {
              var _item$course, _item$course2, _item$academic_year, _item$academic_year2, _item$department, _item$department2, _item$academic_year3, _item$academic_year4, _item$department3, _item$department4;
              switch (type) {
                case 'students':
                  return "\n              <tr>\n                <td>".concat(index + 1, "</td>\n                <td>").concat(item.first_name || item.firstname, " ").concat(item.last_name || item.lastname, "</td>\n                <td>").concat(((_item$course = item.course) === null || _item$course === void 0 ? void 0 : _item$course.name) || ((_item$course2 = item.course) === null || _item$course2 === void 0 ? void 0 : _item$course2.course_name) || 'N/A', "</td>\n                <td>").concat(((_item$academic_year = item.academic_year) === null || _item$academic_year === void 0 ? void 0 : _item$academic_year.year) || ((_item$academic_year2 = item.academic_year) === null || _item$academic_year2 === void 0 ? void 0 : _item$academic_year2.academic_year) || 'N/A', "</td>\n                <td><span class=\"status-badge ").concat(item.yearstatus === "active" ? "active" : "inactive", "\">\n                  ").concat(item.yearstatus || "Active", "\n                </span></td>\n              </tr>\n            ");
                case 'faculty':
                  return "\n              <tr>\n                <td>".concat(index + 1, "</td>\n                <td>").concat(item.first_name || item.firstname, " ").concat(item.last_name || item.lastname, "</td>\n                <td>").concat(((_item$department = item.department) === null || _item$department === void 0 ? void 0 : _item$department.name) || ((_item$department2 = item.department) === null || _item$department2 === void 0 ? void 0 : _item$department2.department_name) || 'N/A', "</td>\n                <td>").concat(((_item$academic_year3 = item.academic_year) === null || _item$academic_year3 === void 0 ? void 0 : _item$academic_year3.year) || ((_item$academic_year4 = item.academic_year) === null || _item$academic_year4 === void 0 ? void 0 : _item$academic_year4.academic_year) || 'N/A', "</td>\n                <td><span class=\"status-badge ").concat(item.yearstatus === "active" ? "active" : "inactive", "\">\n                  ").concat(item.yearstatus || "Active", "\n                </span></td>\n              </tr>\n            ");
                case 'courses':
                  return "\n              <tr>\n                <td>".concat(index + 1, "</td>\n                <td>").concat(item.name || item.course_name, "</td>\n                <td>").concat(((_item$department3 = item.department) === null || _item$department3 === void 0 ? void 0 : _item$department3.name) || ((_item$department4 = item.department) === null || _item$department4 === void 0 ? void 0 : _item$department4.department_name) || 'N/A', "</td>\n                <td>").concat(item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A', "</td>\n                <td><span class=\"status-badge active\">Active</span></td>\n              </tr>\n            ");
                case 'departments':
                  return "\n              <tr>\n                <td>".concat(index + 1, "</td>\n                <td>").concat(item.name || item.department_name, "</td>\n                <td>").concat(item.head || item.department_head || 'N/A', "</td>\n                <td>").concat(item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A', "</td>\n                <td><span class=\"status-badge active\">Active</span></td>\n              </tr>\n            ");
                case 'academic_years':
                  return "\n              <tr>\n                <td>".concat(index + 1, "</td>\n                <td>").concat(item.year || item.academic_year, "</td>\n                <td><span class=\"status-badge ").concat(item.is_active ? "active" : "inactive", "\">\n                  ").concat(item.is_active ? "Active" : "Inactive", "\n                </span></td>\n                <td>").concat(item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A', "</td>\n                <td>\n                  <button class=\"action-btn edit-btn\" data-id=\"").concat(item.id, "\">Edit</button>\n                  <button class=\"action-btn archive-btn\" data-id=\"").concat(item.id, "\">Archive</button>\n                </td>\n              </tr>\n            ");
                case 'archives':
                  return "\n              <tr>\n                <td>".concat(index + 1, "</td>\n                <td>").concat(item.type, "</td>\n                <td>").concat(item.name, "</td>\n                <td>").concat(item.archived_at ? new Date(item.archived_at).toLocaleDateString() : 'N/A', "</td>\n                <td>\n                  <button class=\"action-btn edit-btn\" data-type=\"").concat(item.group, "\" data-id=\"").concat(item.id, "\">Restore</button>\n                  <button class=\"action-btn archive-btn\" data-type=\"").concat(item.group, "\" data-id=\"").concat(item.id, "\">Delete</button>\n                </td>\n              </tr>\n            ");
                default:
                  return '';
              }
            }).join('');
            summary.innerHTML = "<div class=\"summary-box\">".concat(summaryText, "</div>");
            _context2.n = 17;
            break;
          case 16:
            _context2.p = 16;
            _t3 = _context2.v;
            console.error("Error fetching report:", _t3);
            tbody.innerHTML = "<tr><td colspan=\"5\" class=\"no-data\">Error loading data</td></tr>";
          case 17:
            return _context2.a(2);
        }
      }, _callee2, null, [[1, 16]]);
    }));
    return _fetchReport.apply(this, arguments);
  }
  function fetchStudentsReport(_x, _x2, _x3) {
    return _fetchStudentsReport.apply(this, arguments);
  }
  function _fetchStudentsReport() {
    _fetchStudentsReport = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(course, department, year) {
      var res, data;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            _context3.n = 1;
            return fetch('/api/students');
          case 1:
            res = _context3.v;
            if (res.ok) {
              _context3.n = 3;
              break;
            }
            _context3.n = 2;
            return fetch('/api/reports/students');
          case 2:
            res = _context3.v;
          case 3:
            if (res.ok) {
              _context3.n = 5;
              break;
            }
            _context3.n = 4;
            return fetch('/api/reports/student');
          case 4:
            res = _context3.v;
          case 5:
            if (res.ok) {
              _context3.n = 6;
              break;
            }
            return _context3.a(2, []);
          case 6:
            _context3.n = 7;
            return res.json();
          case 7:
            data = _context3.v;
            // Apply client-side filtering
            if (course) {
              data = data.filter(function (s) {
                var _s$course;
                return s.course_id == course || ((_s$course = s.course) === null || _s$course === void 0 ? void 0 : _s$course.id) == course;
              });
            }
            if (department) {
              data = data.filter(function (s) {
                var _s$department;
                return s.department_id == department || ((_s$department = s.department) === null || _s$department === void 0 ? void 0 : _s$department.id) == department;
              });
            }
            if (year) {
              data = data.filter(function (s) {
                var _s$academic_year;
                return s.academic_year_id == year || ((_s$academic_year = s.academic_year) === null || _s$academic_year === void 0 ? void 0 : _s$academic_year.id) == year;
              });
            }
            return _context3.a(2, data);
        }
      }, _callee3);
    }));
    return _fetchStudentsReport.apply(this, arguments);
  }
  function fetchFacultyReport(_x4, _x5, _x6) {
    return _fetchFacultyReport.apply(this, arguments);
  }
  function _fetchFacultyReport() {
    _fetchFacultyReport = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(course, department, year) {
      var res, data;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            _context4.n = 1;
            return fetch('/api/faculties');
          case 1:
            res = _context4.v;
            if (res.ok) {
              _context4.n = 3;
              break;
            }
            _context4.n = 2;
            return fetch('/api/faculty');
          case 2:
            res = _context4.v;
          case 3:
            if (res.ok) {
              _context4.n = 5;
              break;
            }
            _context4.n = 4;
            return fetch('/api/reports/faculty');
          case 4:
            res = _context4.v;
          case 5:
            if (res.ok) {
              _context4.n = 6;
              break;
            }
            return _context4.a(2, []);
          case 6:
            _context4.n = 7;
            return res.json();
          case 7:
            data = _context4.v;
            // Apply client-side filtering
            if (course) {
              data = data.filter(function (f) {
                var _f$course;
                return f.course_id == course || ((_f$course = f.course) === null || _f$course === void 0 ? void 0 : _f$course.id) == course;
              });
            }
            if (department) {
              data = data.filter(function (f) {
                var _f$department;
                return f.department_id == department || ((_f$department = f.department) === null || _f$department === void 0 ? void 0 : _f$department.id) == department;
              });
            }
            if (year) {
              data = data.filter(function (f) {
                var _f$academic_year;
                return f.academic_year_id == year || ((_f$academic_year = f.academic_year) === null || _f$academic_year === void 0 ? void 0 : _f$academic_year.id) == year;
              });
            }
            return _context4.a(2, data);
        }
      }, _callee4);
    }));
    return _fetchFacultyReport.apply(this, arguments);
  }
  function fetchCoursesReport() {
    return _fetchCoursesReport.apply(this, arguments);
  }
  function _fetchCoursesReport() {
    _fetchCoursesReport = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var res, data, department;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            _context5.n = 1;
            return fetch('/api/courses');
          case 1:
            res = _context5.v;
            if (res.ok) {
              _context5.n = 2;
              break;
            }
            return _context5.a(2, []);
          case 2:
            _context5.n = 3;
            return res.json();
          case 3:
            data = _context5.v;
            department = document.getElementById("departmentSelect").value; // Apply client-side filtering
            if (department) {
              data = data.filter(function (c) {
                var _c$department;
                return c.department_id == department || ((_c$department = c.department) === null || _c$department === void 0 ? void 0 : _c$department.id) == department;
              });
            }
            return _context5.a(2, data);
        }
      }, _callee5);
    }));
    return _fetchCoursesReport.apply(this, arguments);
  }
  function fetchDepartmentsReport() {
    return _fetchDepartmentsReport.apply(this, arguments);
  }
  function _fetchDepartmentsReport() {
    _fetchDepartmentsReport = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var res, data, course, coursesRes, courses, targetCourse;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            _context6.n = 1;
            return fetch('/api/departments');
          case 1:
            res = _context6.v;
            if (res.ok) {
              _context6.n = 2;
              break;
            }
            return _context6.a(2, []);
          case 2:
            _context6.n = 3;
            return res.json();
          case 3:
            data = _context6.v;
            course = document.getElementById("courseSelect").value; // Apply client-side filtering (if needed)
            // For departments, we might filter by courses that belong to them
            if (!course) {
              _context6.n = 6;
              break;
            }
            _context6.n = 4;
            return fetch('/api/courses');
          case 4:
            coursesRes = _context6.v;
            if (!coursesRes.ok) {
              _context6.n = 6;
              break;
            }
            _context6.n = 5;
            return coursesRes.json();
          case 5:
            courses = _context6.v;
            targetCourse = courses.find(function (c) {
              return c.id == course;
            });
            if (targetCourse) {
              data = data.filter(function (d) {
                return d.id == targetCourse.department_id;
              });
            }
          case 6:
            return _context6.a(2, data);
        }
      }, _callee6);
    }));
    return _fetchDepartmentsReport.apply(this, arguments);
  }
  function fetchAcademicYearsReport() {
    return _fetchAcademicYearsReport.apply(this, arguments);
  }
  function _fetchAcademicYearsReport() {
    _fetchAcademicYearsReport = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      var res, data, year;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            _context7.n = 1;
            return fetch('/api/academic-years');
          case 1:
            res = _context7.v;
            if (res.ok) {
              _context7.n = 2;
              break;
            }
            return _context7.a(2, []);
          case 2:
            _context7.n = 3;
            return res.json();
          case 3:
            data = _context7.v;
            year = document.getElementById("academicYearSelect").value; // Apply client-side filtering
            if (year) {
              data = data.filter(function (a) {
                return a.id == year;
              });
            }
            return _context7.a(2, data);
        }
      }, _callee7);
    }));
    return _fetchAcademicYearsReport.apply(this, arguments);
  }
  function fetchArchivesReport() {
    return _fetchArchivesReport.apply(this, arguments);
  }
  function _fetchArchivesReport() {
    _fetchArchivesReport = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
      var res, data, rows;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.n) {
          case 0:
            _context8.n = 1;
            return fetch('/api/archives');
          case 1:
            res = _context8.v;
            if (res.ok) {
              _context8.n = 2;
              break;
            }
            return _context8.a(2, []);
          case 2:
            _context8.n = 3;
            return res.json();
          case 3:
            data = _context8.v;
            rows = [];
            (data.courses || []).forEach(function (c) {
              return rows.push({
                group: 'course',
                type: 'Course',
                name: c.name,
                id: c.id,
                archived_at: c.archived_at
              });
            });
            (data.departments || []).forEach(function (d) {
              return rows.push({
                group: 'department',
                type: 'Department',
                name: d.name,
                id: d.id,
                archived_at: d.archived_at
              });
            });
            (data.academic_years || []).forEach(function (a) {
              return rows.push({
                group: 'academic_year',
                type: 'Academic Year',
                name: a.year || a.academic_year,
                id: a.id,
                archived_at: a.archived_at
              });
            });
            (data.faculties || []).forEach(function (f) {
              return rows.push({
                group: 'faculty',
                type: 'Faculty',
                name: (f.first_name || f.firstname) + ' ' + (f.last_name || f.lastname),
                id: f.id,
                archived_at: f.archived_at
              });
            });
            (data.students || []).forEach(function (s) {
              return rows.push({
                group: 'student',
                type: 'Student',
                name: (s.first_name || s.firstname) + ' ' + (s.last_name || s.lastname),
                id: s.id,
                archived_at: s.archived_at
              });
            });
            return _context8.a(2, rows);
        }
      }, _callee8);
    }));
    return _fetchArchivesReport.apply(this, arguments);
  }
  function sendReport() {
    return _sendReport.apply(this, arguments);
  } // Enhanced export functionality
  function _sendReport() {
    _sendReport = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
      var title, subject, content, res, _t4;
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.p = _context9.n) {
          case 0:
            title = document.getElementById("reportTitle").value.trim();
            subject = document.getElementById("reportSubject").value;
            content = document.getElementById("reportContent").value.trim();
            if (!(!title || !subject || !content)) {
              _context9.n = 1;
              break;
            }
            alert("Please fill in all fields before sending.");
            return _context9.a(2);
          case 1:
            _context9.p = 1;
            _context9.n = 2;
            return fetch("/api/reports", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                title: title,
                subject: subject,
                content: content
              })
            });
          case 2:
            res = _context9.v;
            if (res.ok) {
              _context9.n = 3;
              break;
            }
            throw new Error("Failed to send report");
          case 3:
            alert("✅ Report sent successfully!");
            document.getElementById("reportTitle").value = "";
            document.getElementById("reportSubject").value = "";
            document.getElementById("reportContent").value = "";
            _context9.n = 5;
            break;
          case 4:
            _context9.p = 4;
            _t4 = _context9.v;
            console.error("Error sending report:", _t4);
            alert("❌ Failed to send report. Please try again.");
          case 5:
            return _context9.a(2);
        }
      }, _callee9, null, [[1, 4]]);
    }));
    return _sendReport.apply(this, arguments);
  }
  function exportReport() {
    return _exportReport.apply(this, arguments);
  }
  function _exportReport() {
    _exportReport = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
      var format, type, course, department, year, data, headers, title, exportData, _t5, _t6, _t7;
      return _regenerator().w(function (_context0) {
        while (1) switch (_context0.p = _context0.n) {
          case 0:
            format = document.getElementById("exportFormat").value;
            type = document.getElementById("reportType").value;
            course = document.getElementById("courseSelect").value;
            department = document.getElementById("departmentSelect").value;
            year = document.getElementById("academicYearSelect").value;
            _context0.p = 1;
            data = [];
            headers = [];
            title = ""; // Get data based on report type
            _t5 = type;
            _context0.n = _t5 === 'students' ? 2 : _t5 === 'faculty' ? 4 : _t5 === 'courses' ? 6 : _t5 === 'departments' ? 8 : _t5 === 'academic_years' ? 10 : _t5 === 'archives' ? 12 : 14;
            break;
          case 2:
            headers = ['#', 'Student Name', 'Course', 'Academic Year', 'Status'];
            _context0.n = 3;
            return fetchStudentsReport(course, department, year);
          case 3:
            data = _context0.v;
            title = "Students Report";
            return _context0.a(3, 14);
          case 4:
            headers = ['#', 'Faculty Name', 'Department', 'Academic Year', 'Status'];
            _context0.n = 5;
            return fetchFacultyReport(course, department, year);
          case 5:
            data = _context0.v;
            title = "Faculty Report";
            return _context0.a(3, 14);
          case 6:
            headers = ['#', 'Course Name', 'Department', 'Created Date', 'Status'];
            _context0.n = 7;
            return fetchCoursesReport();
          case 7:
            data = _context0.v;
            title = "Courses Report";
            return _context0.a(3, 14);
          case 8:
            headers = ['#', 'Department Name', 'Head', 'Created Date', 'Status'];
            _context0.n = 9;
            return fetchDepartmentsReport();
          case 9:
            data = _context0.v;
            title = "Departments Report";
            return _context0.a(3, 14);
          case 10:
            headers = ['#', 'Academic Year', 'Status', 'Created Date', 'Actions'];
            _context0.n = 11;
            return fetchAcademicYearsReport();
          case 11:
            data = _context0.v;
            title = "Academic Years Report";
            return _context0.a(3, 14);
          case 12:
            headers = ['#', 'Type', 'Name/Title', 'Archived Date', 'Actions'];
            _context0.n = 13;
            return fetchArchivesReport();
          case 13:
            data = _context0.v;
            title = "Archives Report";
            return _context0.a(3, 14);
          case 14:
            if (data.length) {
              _context0.n = 15;
              break;
            }
            alert("No data to export!");
            return _context0.a(2);
          case 15:
            // Prepare data for export
            exportData = data.map(function (item, index) {
              var _item$course3, _item$course4, _item$academic_year5, _item$academic_year6, _item$department5, _item$department6, _item$academic_year7, _item$academic_year8, _item$department7, _item$department8;
              switch (type) {
                case 'students':
                  return [index + 1, "".concat(item.first_name || item.firstname, " ").concat(item.last_name || item.lastname), ((_item$course3 = item.course) === null || _item$course3 === void 0 ? void 0 : _item$course3.name) || ((_item$course4 = item.course) === null || _item$course4 === void 0 ? void 0 : _item$course4.course_name) || 'N/A', ((_item$academic_year5 = item.academic_year) === null || _item$academic_year5 === void 0 ? void 0 : _item$academic_year5.year) || ((_item$academic_year6 = item.academic_year) === null || _item$academic_year6 === void 0 ? void 0 : _item$academic_year6.academic_year) || 'N/A', item.yearstatus || "Active"];
                case 'faculty':
                  return [index + 1, "".concat(item.first_name || item.firstname, " ").concat(item.last_name || item.lastname), ((_item$department5 = item.department) === null || _item$department5 === void 0 ? void 0 : _item$department5.name) || ((_item$department6 = item.department) === null || _item$department6 === void 0 ? void 0 : _item$department6.department_name) || 'N/A', ((_item$academic_year7 = item.academic_year) === null || _item$academic_year7 === void 0 ? void 0 : _item$academic_year7.year) || ((_item$academic_year8 = item.academic_year) === null || _item$academic_year8 === void 0 ? void 0 : _item$academic_year8.academic_year) || 'N/A', item.yearstatus || "Active"];
                case 'courses':
                  return [index + 1, item.name || item.course_name, ((_item$department7 = item.department) === null || _item$department7 === void 0 ? void 0 : _item$department7.name) || ((_item$department8 = item.department) === null || _item$department8 === void 0 ? void 0 : _item$department8.department_name) || 'N/A', item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A', 'Active'];
                case 'departments':
                  return [index + 1, item.name || item.department_name, item.head || item.department_head || 'N/A', item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A', 'Active'];
                case 'academic_years':
                  return [index + 1, item.year || item.academic_year, item.is_active ? "Active" : "Inactive", item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A', 'Available'];
                case 'archives':
                  return [index + 1, item.type, item.name, item.archived_at ? new Date(item.archived_at).toLocaleDateString() : 'N/A', 'Available'];
                default:
                  return [];
              }
            }); // Export based on format
            _t6 = format;
            _context0.n = _t6 === 'csv' ? 16 : _t6 === 'pdf' ? 17 : _t6 === 'excel' ? 19 : _t6 === 'word' ? 21 : 23;
            break;
          case 16:
            exportToCSV(headers, exportData, title);
            return _context0.a(3, 23);
          case 17:
            _context0.n = 18;
            return exportToPDF(headers, exportData, title);
          case 18:
            return _context0.a(3, 23);
          case 19:
            _context0.n = 20;
            return exportToExcel(headers, exportData, title);
          case 20:
            return _context0.a(3, 23);
          case 21:
            _context0.n = 22;
            return exportToWord(headers, exportData, title);
          case 22:
            return _context0.a(3, 23);
          case 23:
            _context0.n = 25;
            break;
          case 24:
            _context0.p = 24;
            _t7 = _context0.v;
            console.error("Error exporting report:", _t7);
            alert("Failed to export report. Please try again.");
          case 25:
            return _context0.a(2);
        }
      }, _callee0, null, [[1, 24]]);
    }));
    return _exportReport.apply(this, arguments);
  }
  function exportToCSV(headers, data, title) {
    var csvContent = [headers.join(",")].concat(_toConsumableArray(data.map(function (row) {
      return row.map(function (cell) {
        return "\"".concat(cell, "\"");
      }).join(",");
    }))).join("\n");
    var blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;"
    });
    var link = document.createElement("a");
    var url = URL.createObjectURL(blob);
    link.href = url;
    link.download = "".concat(title, "_").concat(new Date().toISOString().split('T')[0], ".csv");
    link.click();
    URL.revokeObjectURL(url);
  }
  function exportToPDF(_x7, _x8, _x9) {
    return _exportToPDF.apply(this, arguments);
  }
  function _exportToPDF() {
    _exportToPDF = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(headers, data, title) {
      var htmlContent, printWindow;
      return _regenerator().w(function (_context1) {
        while (1) switch (_context1.n) {
          case 0:
            // Create a simple HTML table and use browser's print to PDF
            htmlContent = "\n      <!DOCTYPE html>\n      <html>\n        <head>\n          <meta charset=\"utf-8\">\n          <title>".concat(title, "</title>\n          <style>\n            body { font-family: Arial, sans-serif; margin: 20px; }\n            h1 { color: #2563EB; text-align: center; }\n            .date { color: #666; font-size: 12px; text-align: center; margin-bottom: 20px; }\n            table { border-collapse: collapse; width: 100%; margin-top: 20px; }\n            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }\n            th { background-color: #2563EB; color: white; font-weight: bold; }\n            tr:nth-child(even) { background-color: #f2f2f2; }\n            @media print {\n              body { margin: 0; }\n              @page { margin: 1cm; }\n            }\n          </style>\n        </head>\n        <body>\n          <h1>").concat(title, "</h1>\n          <p class=\"date\">Generated on: ").concat(new Date().toLocaleDateString(), "</p>\n          <table>\n            <thead>\n              <tr>\n                ").concat(headers.map(function (h) {
              return "<th>".concat(h, "</th>");
            }).join(''), "\n              </tr>\n            </thead>\n            <tbody>\n              ").concat(data.map(function (row) {
              return "\n                <tr>\n                  ".concat(row.map(function (cell) {
                return "<td>".concat(cell, "</td>");
              }).join(''), "\n                </tr>\n              ");
            }).join(''), "\n            </tbody>\n          </table>\n        </body>\n      </html>\n    "); // Open in new window and trigger print
            printWindow = window.open('', '_blank');
            printWindow.document.write(htmlContent);
            printWindow.document.close();
            printWindow.focus();

            // Wait for content to load then print
            setTimeout(function () {
              printWindow.print();
              printWindow.close();
            }, 500);
          case 1:
            return _context1.a(2);
        }
      }, _callee1);
    }));
    return _exportToPDF.apply(this, arguments);
  }
  function exportToExcel(_x0, _x1, _x10) {
    return _exportToExcel.apply(this, arguments);
  }
  function _exportToExcel() {
    _exportToExcel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(headers, data, title) {
      var csvContent, blob, link, url;
      return _regenerator().w(function (_context10) {
        while (1) switch (_context10.n) {
          case 0:
            // Create CSV format that Excel can open
            csvContent = [headers.join(",")].concat(_toConsumableArray(data.map(function (row) {
              return row.map(function (cell) {
                return "\"".concat(cell, "\"");
              }).join(",");
            }))).join("\n");
            blob = new Blob([csvContent], {
              type: "text/csv;charset=utf-8;"
            });
            link = document.createElement("a");
            url = URL.createObjectURL(blob);
            link.href = url;
            link.download = "".concat(title, "_").concat(new Date().toISOString().split('T')[0], ".xlsx");
            link.click();
            URL.revokeObjectURL(url);
          case 1:
            return _context10.a(2);
        }
      }, _callee10);
    }));
    return _exportToExcel.apply(this, arguments);
  }
  function exportToWord(_x11, _x12, _x13) {
    return _exportToWord.apply(this, arguments);
  }
  function _exportToWord() {
    _exportToWord = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(headers, data, title) {
      var htmlContent, blob, link, url;
      return _regenerator().w(function (_context11) {
        while (1) switch (_context11.n) {
          case 0:
            // Create HTML content for Word export
            htmlContent = "\n      <html>\n        <head>\n          <meta charset=\"utf-8\">\n          <title>".concat(title, "</title>\n          <style>\n            body { font-family: Arial, sans-serif; margin: 20px; }\n            h1 { color: #2563EB; }\n            table { border-collapse: collapse; width: 100%; margin-top: 20px; }\n            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }\n            th { background-color: #2563EB; color: white; }\n            tr:nth-child(even) { background-color: #f2f2f2; }\n            .date { color: #666; font-size: 12px; }\n          </style>\n        </head>\n        <body>\n          <h1>").concat(title, "</h1>\n          <p class=\"date\">Generated on: ").concat(new Date().toLocaleDateString(), "</p>\n          <table>\n            <thead>\n              <tr>\n                ").concat(headers.map(function (h) {
              return "<th>".concat(h, "</th>");
            }).join(''), "\n              </tr>\n            </thead>\n            <tbody>\n              ").concat(data.map(function (row) {
              return "\n                <tr>\n                  ".concat(row.map(function (cell) {
                return "<td>".concat(cell, "</td>");
              }).join(''), "\n                </tr>\n              ");
            }).join(''), "\n            </tbody>\n          </table>\n        </body>\n      </html>\n    ");
            blob = new Blob([htmlContent], {
              type: "application/msword"
            });
            link = document.createElement("a");
            url = URL.createObjectURL(blob);
            link.href = url;
            link.download = "".concat(title, "_").concat(new Date().toISOString().split('T')[0], ".doc");
            link.click();
            URL.revokeObjectURL(url);
          case 1:
            return _context11.a(2);
        }
      }, _callee11);
    }));
    return _exportToWord.apply(this, arguments);
  }
}

/***/ }),

/***/ "./resources/js/components/Students.js":
/*!*********************************************!*\
  !*** ./resources/js/components/Students.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadStudents: () => (/* binding */ loadStudents)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

function loadStudents(app) {
  app.innerHTML = "\n    <div class=\"dashboard-container\">\n      <nav class=\"sidebar\">\n        <div class=\"sidebar-content\">\n          <div class=\"sidebar-header\">\n            <img src=\"/images/logo.png\" alt=\"EDUTrack logo\" class=\"sidebar-logo\" />\n            <h1 class=\"sidebar-title\">EDUTrack</h1>\n          </div>\n          \n          <button class=\"new-item-btn\" id=\"addStudentBtn\">\n            <svg class=\"btn-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n              <line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line>\n              <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>\n            </svg>\n            Add Student\n          </button>\n          \n        <ul class=\"sidebar-menu\">\n            <li>\n              <a href=\"#\" class=\"menu-item\" data-page=\"overview\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z\"></path>\n                </svg>\n                <span>Overview</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item active\" data-page=\"students\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path>\n                  <circle cx=\"12\" cy=\"7\" r=\"4\"></circle>\n                </svg>\n                <span>Students</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item\" data-page=\"faculty\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path>\n                  <circle cx=\"9\" cy=\"7\" r=\"4\"></circle>\n                  <path d=\"M23 21v-2a4 4 0 0 0-3-3.87\"></path>\n                  <path d=\"M16 3.13a4 4 0 0 1 0 7.75\"></path>\n                </svg>\n                <span>Faculty</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item\" id=\"menuReport\" data-page=\"report\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M18 20V10\"></path>\n                  <path d=\"M12 20V4\"></path>\n                  <path d=\"M6 20v-6\"></path>\n                </svg>\n                <span>Report</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item\" data-page=\"profile\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path>\n                  <circle cx=\"12\" cy=\"7\" r=\"4\"></circle>\n                </svg>\n                <span>Profile</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item\" data-page=\"settings\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <circle cx=\"12\" cy=\"12\" r=\"3\"></circle>\n                  <path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z\"></path>\n                </svg>\n                <span>System Settings</span>\n              </a>\n            </li>\n        </ul>\n        </div>\n        \n        <div class=\"sidebar-footer\">\n          <span class=\"version-text\">v1.0.0</span>\n        </div>\n      </nav>\n\n      <div class=\"main-content\">\n        <header class=\"top-header\">\n          <div class=\"header-left\">\n            <h1 class=\"page-title\">Students Management</h1>\n          </div>\n          <div class=\"header-right\">\n            <div class=\"search-container\">\n              <input type=\"text\" class=\"search-input\" placeholder=\"Search\">\n              <svg class=\"search-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n                <path d=\"M21 21l-4.35-4.35\"></path>\n              </svg>\n            </div>\n          </div>\n        </header>\n\n        <div class=\"content-area\">\n          <section class=\"students-banner\">\n            <div class=\"banner-content\">\n              <h2 class=\"banner-title\">Students Management</h2>\n              <p class=\"banner-subtitle\">can add, edit, delete data</p>\n            </div>\n          </section>\n\n          <section class=\"filters-section\">\n            <div class=\"filters-container\">\n              <div class=\"search-group\">\n                <input type=\"text\" id=\"searchInput\" class=\"search-field\" placeholder=\"Search students...\" />\n                <svg class=\"search-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n                  <path d=\"M21 21l-4.35-4.35\"></path>\n                </svg>\n              </div>\n              \n              <div class=\"filter-group\">\n                <select id=\"departmentFilter\" class=\"filter-select\">\n                  <option value=\"\">All Departments</option>\n                </select>\n                <svg class=\"dropdown-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <polyline points=\"6,9 12,15 18,9\"></polyline>\n                </svg>\n              </div>\n              \n              <div class=\"filter-group\">\n                <select id=\"courseFilter\" class=\"filter-select\">\n                  <option value=\"\">All Courses</option>\n                </select>\n                <svg class=\"dropdown-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <polyline points=\"6,9 12,15 18,9\"></polyline>\n                </svg>\n              </div>\n              \n              <div class=\"filter-group\">\n                <select id=\"academicYearFilter\" class=\"filter-select\">\n                  <option value=\"\">All Academic Years</option>\n                </select>\n                <svg class=\"dropdown-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <polyline points=\"6,9 12,15 18,9\"></polyline>\n                </svg>\n              </div>\n\n              <div class=\"filter-group\">\n                <select id=\"yearstatusFilter\" class=\"filter-select\">\n                  <option value=\"\">All Year Status</option>\n                  <option value=\"active\">Active</option>\n                  <option value=\"inactive\">Inactive</option>\n                  <option value=\"graduated\">Graduated</option>\n                </select>\n                <svg class=\"dropdown-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <polyline points=\"6,9 12,15 18,9\"></polyline>\n                </svg>\n              </div>\n              \n              <button id=\"clearFilters\" class=\"btn btn-clear\">Clear Filters</button>\n            </div>\n        </section>\n\n          <section class=\"table-section\">\n            <div class=\"table-container\">\n          <table class=\"students-table\">\n            <thead>\n              <tr>\n                <th>ID</th>\n                <th>Student ID</th>\n                <th>Name</th>\n                <th>Course</th>\n                <th>Department</th>\n                <th>Academic Year</th>\n                <th>Status</th>\n                <th>Actions</th>\n              </tr>\n            </thead>\n            <tbody id=\"studentList\"></tbody>\n          </table>\n            </div>\n        </section>\n        </div>\n      </div>\n\n      <div id=\"studentModal\" class=\"modal hidden\" aria-hidden=\"true\" role=\"dialog\" aria-modal=\"true\">\n        <div class=\"modal-content\" role=\"document\">\n          <button id=\"closeStudentModal\" class=\"modal-close\" aria-label=\"Close\">\n            <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n              <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\n              <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\n            </svg>\n          </button>\n          <h3 id=\"studentModalTitle\" class=\"modal-title\">Add New Student</h3>\n\n          <form id=\"studentForm\" class=\"student-form\" autocomplete=\"on\" novalidate>\n            <input type=\"hidden\" name=\"edit_id\" id=\"edit_id\" />\n\n            <div class=\"form-column\">\n              <div class=\"form-group\">\n                <label for=\"studID\" class=\"form-label\">Student ID</label>\n                <input type=\"text\" name=\"studID\" id=\"studID\" class=\"form-input\" placeholder=\"e.g. STU000123\" required />\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"firstname\" class=\"form-label\">First Name</label>\n                <input type=\"text\" name=\"firstname\" id=\"firstname\" class=\"form-input\" placeholder=\"First Name\" required />\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"middlename\" class=\"form-label\">Middle Name</label>\n                <input type=\"text\" name=\"middlename\" id=\"middlename\" class=\"form-input\" placeholder=\"Middle Name\" />\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"lastname\" class=\"form-label\">Last Name</label>\n                <input type=\"text\" name=\"lastname\" id=\"lastname\" class=\"form-input\" placeholder=\"Last Name\" required />\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"suffix\" class=\"form-label\">Suffix</label>\n                <input type=\"text\" name=\"suffix\" id=\"suffix\" class=\"form-input\" placeholder=\"Suffix\" />\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"email\" class=\"form-label\">Email</label>\n                <input type=\"email\" name=\"email\" id=\"email\" class=\"form-input\" placeholder=\"you@example.com\" required />\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"phone\" class=\"form-label\">Phone</label>\n                <input type=\"text\" name=\"phone\" id=\"phone\" class=\"form-input\" placeholder=\"+123456789\" />\n              </div>\n            </div>\n\n            <div class=\"form-column\">\n              <div class=\"form-group\">\n                <label for=\"date_of_birth\" class=\"form-label\">Date of Birth</label>\n                <input type=\"date\" name=\"date_of_birth\" id=\"date_of_birth\" class=\"form-input\" />\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"sex\" class=\"form-label\">Sex</label>\n                <select name=\"sex\" id=\"sex\" class=\"form-select\">\n              <option value=\"\">Select Sex</option>\n              <option value=\"Male\">Male</option>\n              <option value=\"Female\">Female</option>\n            </select>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"departmentSelect\" class=\"form-label\">Department</label>\n                <select name=\"department_id\" id=\"departmentSelect\" class=\"form-select\" required>\n              <option value=\"\">Select Department</option>\n            </select>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"courseSelect\" class=\"form-label\">Course</label>\n                <select name=\"course_id\" id=\"courseSelect\" class=\"form-select\" required>\n              <option value=\"\">Select Course</option>\n            </select>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"academicYearSelectForm\" class=\"form-label\">Academic Year</label>\n                <select name=\"academic_year_id\" id=\"academicYearSelectForm\" class=\"form-select\" required>\n              <option value=\"\">Select Academic Year</option>\n            </select>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"yearstatus\" class=\"form-label\">Year Status</label>\n                <select name=\"yearstatus\" id=\"yearstatus\" class=\"form-select\" required>\n              <option value=\"active\">Active</option>\n              <option value=\"inactive\">Inactive</option>\n              <option value=\"graduated\">Graduated</option>\n            </select>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"enrollment_date\" class=\"form-label\">Enrollment Date</label>\n                <input type=\"date\" name=\"enrollment_date\" id=\"enrollment_date\" class=\"form-input\" />\n              </div>\n            </div>\n\n            <div class=\"form-actions\">\n              <button type=\"button\" id=\"cancelBtn\" class=\"btn btn-cancel\">Cancel</button>\n              <button type=\"submit\" id=\"submitBtn\" class=\"btn btn-save\">Save Student</button>\n            </div>\n          </form>\n        </div>\n      </div>\n    </div>\n  ";
  var isEditing = false;
  var allStudents = [];
  var allDepartments = [];
  var allCourses = [];
  var allAcademicYears = [];

  // Load departments, courses, academic years for filters and form
  function loadSelectOptions() {
    return _loadSelectOptions.apply(this, arguments);
  } // --- FILTER LOGIC ---
  // When department filter changes, update course filter options
  function _loadSelectOptions() {
    _loadSelectOptions = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var _yield$Promise$all, _yield$Promise$all2, departmentsRes, coursesRes, yearsRes, _error$response8, _error$response9, _t4;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            _context4.p = 0;
            _context4.n = 1;
            return Promise.all([axios__WEBPACK_IMPORTED_MODULE_0___default().get("/api/departments"), axios__WEBPACK_IMPORTED_MODULE_0___default().get("/api/courses"), axios__WEBPACK_IMPORTED_MODULE_0___default().get("/api/academic-years")]);
          case 1:
            _yield$Promise$all = _context4.v;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
            departmentsRes = _yield$Promise$all2[0];
            coursesRes = _yield$Promise$all2[1];
            yearsRes = _yield$Promise$all2[2];
            allDepartments = departmentsRes.data;
            allCourses = coursesRes.data;
            allAcademicYears = yearsRes.data;

            // Department filter
            document.getElementById("departmentFilter").innerHTML = "<option value=\"\">All Departments</option>" + allDepartments.map(function (d) {
              return "<option value=\"".concat(d.id, "\">").concat(d.name, "</option>");
            }).join("");

            // Course filter (initially all)
            updateCourseFilter();

            // Academic year filter
            document.getElementById("academicYearFilter").innerHTML = "<option value=\"\">All Academic Years</option>" + allAcademicYears.map(function (y) {
              return "<option value=\"".concat(y.id, "\">").concat(y.year || y.academic_year, "</option>");
            }).join("");

            // Department select (form)
            document.getElementById("departmentSelect").innerHTML = "<option value=\"\">Select Department</option>" + allDepartments.map(function (d) {
              return "<option value=\"".concat(d.id, "\">").concat(d.name, "</option>");
            }).join("");

            // Academic year select (form)
            document.getElementById("academicYearSelectForm").innerHTML = "<option value=\"\">Select Academic Year</option>" + allAcademicYears.map(function (y) {
              return "<option value=\"".concat(y.id, "\">").concat(y.year || y.academic_year, "</option>");
            }).join("");

            // Course select (form, initially all)
            updateCourseSelect();
            _context4.n = 3;
            break;
          case 2:
            _context4.p = 2;
            _t4 = _context4.v;
            console.error("Error loading select options:", ((_error$response8 = _t4.response) === null || _error$response8 === void 0 ? void 0 : _error$response8.data) || _t4);
            if (((_error$response9 = _t4.response) === null || _error$response9 === void 0 ? void 0 : _error$response9.status) === 401) {
              alert("Authentication error. Please log in again.");
              localStorage.removeItem("token");
              window.location.href = "/";
            } else {
              alert("Failed to load form options. Please refresh the page.");
            }
          case 3:
            return _context4.a(2);
        }
      }, _callee4, null, [[0, 2]]);
    }));
    return _loadSelectOptions.apply(this, arguments);
  }
  document.addEventListener("change", function (e) {
    if (e.target && e.target.id === "departmentFilter") {
      updateCourseFilter();
      renderStudents();
    }
    if (e.target && e.target.id === "courseFilter") {
      renderStudents();
    }
    if (e.target && e.target.id === "academicYearFilter") {
      renderStudents();
    }
    if (e.target && e.target.id === "yearstatusFilter") {
      renderStudents();
    }
  });
  function updateCourseFilter() {
    var deptId = document.getElementById("departmentFilter").value;
    var courseFilter = document.getElementById("courseFilter");
    var filteredCourses = deptId ? allCourses.filter(function (c) {
      return c.department_id == deptId;
    }) : allCourses;
    courseFilter.innerHTML = "<option value=\"\">All Courses</option>" + filteredCourses.map(function (c) {
      return "<option value=\"".concat(c.id, "\">").concat(c.name, "</option>");
    }).join("");
  }

  // --- FORM LOGIC ---

  // When department select (form) changes, update course select (form)
  document.addEventListener("change", function (e) {
    if (e.target && e.target.id === "departmentSelect") {
      updateCourseSelect();
    }
  });
  function updateCourseSelect() {
    var deptId = document.getElementById("departmentSelect").value;
    var courseSelect = document.getElementById("courseSelect");
    var filteredCourses = deptId ? allCourses.filter(function (c) {
      return c.department_id == deptId;
    }) : allCourses;
    courseSelect.innerHTML = "<option value=\"\">Select Course</option>" + filteredCourses.map(function (c) {
      return "<option value=\"".concat(c.id, "\">").concat(c.name, "</option>");
    }).join("");
  }

  // --- REST OF YOUR LOGIC (fetchStudents, renderStudents, form submit, etc.) ---

  // Fetch students
  function fetchStudents() {
    return _fetchStudents.apply(this, arguments);
  } // Render students with filters/search
  function _fetchStudents() {
    _fetchStudents = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var res, _error$response0, _error$response1, _t5;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            _context5.p = 0;
            _context5.n = 1;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().get("/api/students");
          case 1:
            res = _context5.v;
            allStudents = res.data;
            renderStudents();
            _context5.n = 3;
            break;
          case 2:
            _context5.p = 2;
            _t5 = _context5.v;
            console.error("Error fetching students:", ((_error$response0 = _t5.response) === null || _error$response0 === void 0 ? void 0 : _error$response0.data) || _t5);
            if (((_error$response1 = _t5.response) === null || _error$response1 === void 0 ? void 0 : _error$response1.status) === 401) {
              alert("Authentication error. Please log in again.");
              localStorage.removeItem("token");
              window.location.href = "/";
            } else {
              alert("Failed to fetch students. Please try again.");
            }
          case 3:
            return _context5.a(2);
        }
      }, _callee5, null, [[0, 2]]);
    }));
    return _fetchStudents.apply(this, arguments);
  }
  function renderStudents() {
    var search = document.getElementById("searchInput").value.toLowerCase();
    var department = document.getElementById("departmentFilter").value;
    var course = document.getElementById("courseFilter").value;
    var academicYear = document.getElementById("academicYearFilter").value;
    var yearstatus = document.getElementById("yearstatusFilter").value;
    var tbody = document.getElementById("studentList");
    var filtered = allStudents.filter(function (s) {
      var match = true;
      if (search) {
        match = s.studID && s.studID.toLowerCase().includes(search) || s.firstname && s.firstname.toLowerCase().includes(search) || s.lastname && s.lastname.toLowerCase().includes(search) || s.email && s.email.toLowerCase().includes(search);
      }
      if (match && department) match = s.department_id == department;
      if (match && course) match = s.course_id == course;
      if (match && academicYear) match = s.academic_year_id == academicYear;
      if (match && yearstatus) match = s.yearstatus == yearstatus;
      return match;
    });
    tbody.innerHTML = filtered.length ? filtered.map(function (s) {
      var _allCourses$find, _allCourses$find2, _allDepartments$find, _allDepartments$find2, _allAcademicYears$fin, _allAcademicYears$fin2;
      return "\n            <tr>\n              <td>".concat(s.id, "</td>\n              <td>").concat(s.studID, "</td>\n              <td>").concat(s.firstname, " ").concat(s.middlename ? s.middlename + " " : "").concat(s.lastname, "</td>\n              <td>").concat(((_allCourses$find = allCourses.find(function (c) {
        return c.id == s.course_id;
      })) === null || _allCourses$find === void 0 ? void 0 : _allCourses$find.name) || ((_allCourses$find2 = allCourses.find(function (c) {
        return c.id == s.course_id;
      })) === null || _allCourses$find2 === void 0 ? void 0 : _allCourses$find2.course_name) || "", "</td>\n              <td>").concat(((_allDepartments$find = allDepartments.find(function (d) {
        return d.id == s.department_id;
      })) === null || _allDepartments$find === void 0 ? void 0 : _allDepartments$find.name) || ((_allDepartments$find2 = allDepartments.find(function (d) {
        return d.id == s.department_id;
      })) === null || _allDepartments$find2 === void 0 ? void 0 : _allDepartments$find2.department_name) || "", "</td>\n              <td>").concat(((_allAcademicYears$fin = allAcademicYears.find(function (y) {
        return y.id == s.academic_year_id;
      })) === null || _allAcademicYears$fin === void 0 ? void 0 : _allAcademicYears$fin.year) || ((_allAcademicYears$fin2 = allAcademicYears.find(function (y) {
        return y.id == s.academic_year_id;
      })) === null || _allAcademicYears$fin2 === void 0 ? void 0 : _allAcademicYears$fin2.academic_year) || "", "</td>\n              <td>\n                <span class=\"status-badge ").concat(s.yearstatus === "active" ? "active" : s.yearstatus === "graduated" ? "graduated" : "inactive", "\">\n                  ").concat(s.yearstatus || "active", "\n                </span>\n              </td>\n              <td>\n                <button class=\"action-btn edit-btn\" data-id=\"").concat(s.id, "\" title=\"Edit\">Edit</button>\n                <button class=\"action-btn archive-btn\" data-id=\"").concat(s.id, "\" title=\"Archive\">Archive</button>\n              </td>\n            </tr>\n          ");
    }).join("") : "<tr><td colspan=\"8\" class=\"text-center p-4\">No students found.</td></tr>";

    // Archive logic
    document.querySelectorAll(".archive-btn").forEach(function (btn) {
      btn.addEventListener("click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var id, _error$response, _error$response2, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              id = btn.dataset.id;
              if (!confirm("Archive this student?")) {
                _context.n = 4;
                break;
              }
              _context.p = 1;
              _context.n = 2;
              return axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"]("/api/students/".concat(id));
            case 2:
              alert("Student archived successfully!");
              fetchStudents();
              resetForm();
              _context.n = 4;
              break;
            case 3:
              _context.p = 3;
              _t = _context.v;
              console.error("Error archiving student:", ((_error$response = _t.response) === null || _error$response === void 0 ? void 0 : _error$response.data) || _t);
              if (((_error$response2 = _t.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.status) === 401) {
                alert("Authentication error. Please log in again.");
                localStorage.removeItem("token");
                window.location.href = "/";
              } else {
                alert("Failed to archive student. Please try again.");
              }
            case 4:
              return _context.a(2);
          }
        }, _callee, null, [[1, 3]]);
      })));
    });

    // Edit logic
    document.querySelectorAll(".edit-btn").forEach(function (btn) {
      btn.addEventListener("click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var id, res, s, _error$response3, _error$response4, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              id = btn.dataset.id;
              _context2.p = 1;
              _context2.n = 2;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get("/api/students/".concat(id));
            case 2:
              res = _context2.v;
              s = res.data;
              document.getElementById("edit_id").value = s.id;
              document.getElementById("studID").value = s.studID;
              document.getElementById("firstname").value = s.firstname;
              document.getElementById("middlename").value = s.middlename || "";
              document.getElementById("lastname").value = s.lastname;
              document.getElementById("suffix").value = s.suffix || "";
              document.getElementById("email").value = s.email;
              document.getElementById("phone").value = s.phone || "";
              document.getElementById("date_of_birth").value = s.date_of_birth || "";
              document.getElementById("sex").value = s.sex || "";
              document.getElementById("departmentSelect").value = s.department_id || "";
              updateCourseSelect();
              document.getElementById("courseSelect").value = s.course_id || "";
              document.getElementById("academicYearSelectForm").value = s.academic_year_id || "";
              document.getElementById("yearstatus").value = s.yearstatus || "";
              document.getElementById("enrollment_date").value = s.enrollment_date || "";
              document.getElementById("studentModal").classList.remove("hidden");
              document.getElementById("studentModalTitle").textContent = "Edit Student";
              document.getElementById("submitBtn").textContent = "Update Student";
              document.getElementById("cancelBtn").style.display = "inline-block";
              isEditing = true;
              _context2.n = 4;
              break;
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              console.error("Error fetching student data:", ((_error$response3 = _t2.response) === null || _error$response3 === void 0 ? void 0 : _error$response3.data) || _t2);
              if (((_error$response4 = _t2.response) === null || _error$response4 === void 0 ? void 0 : _error$response4.status) === 401) {
                alert("Authentication error. Please log in again.");
                localStorage.removeItem("token");
                window.location.href = "/";
              } else {
                alert("Failed to fetch student data. Please try again.");
              }
            case 4:
              return _context2.a(2);
          }
        }, _callee2, null, [[1, 3]]);
      })));
    });
  }

  // Modal logic
  function showStudentModal() {
    document.getElementById("studentModal").classList.remove("hidden");
    document.getElementById("studentModalTitle").textContent = "Add New Student";
    document.getElementById("submitBtn").textContent = "Save Student";
    resetForm();
  }
  function hideStudentModal() {
    document.getElementById("studentModal").classList.add("hidden");
    resetForm();
  }

  // Add Student button (sidebar and top)
  document.getElementById("addStudentBtn").addEventListener("click", showStudentModal);
  var addTop = document.getElementById("addStudentBtnTop");
  if (addTop) {
    addTop.addEventListener("click", showStudentModal);
  }
  document.getElementById("closeStudentModal").addEventListener("click", hideStudentModal);
  document.getElementById("cancelBtn").addEventListener("click", hideStudentModal);

  // Submit (Add/Edit)
  var form = document.getElementById("studentForm");
  var submitBtn = document.getElementById("submitBtn");
  form.addEventListener("submit", /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(e) {
      var formData, id, _error$response5, _error$response6, _error$response7, errors, errorMessages, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            e.preventDefault();
            formData = Object.fromEntries(new FormData(form));
            id = formData.edit_id;
            delete formData.edit_id;

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = isEditing ? "Updating..." : "Saving...";
            _context3.p = 1;
            if (!(isEditing && id)) {
              _context3.n = 3;
              break;
            }
            _context3.n = 2;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().put("/api/students/".concat(id), formData);
          case 2:
            _context3.n = 4;
            break;
          case 3:
            _context3.n = 4;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().post("/api/students", formData);
          case 4:
            // Success feedback
            alert(isEditing ? "Student updated successfully!" : "Student added successfully!");
            form.reset();
            isEditing = false;
            hideStudentModal();
            fetchStudents();
            _context3.n = 6;
            break;
          case 5:
            _context3.p = 5;
            _t3 = _context3.v;
            console.error("Error saving student:", ((_error$response5 = _t3.response) === null || _error$response5 === void 0 ? void 0 : _error$response5.data) || _t3);
            if (((_error$response6 = _t3.response) === null || _error$response6 === void 0 ? void 0 : _error$response6.status) === 401) {
              alert("Authentication error. Please log in again.");
              localStorage.removeItem("token");
              window.location.href = "/";
            } else if (((_error$response7 = _t3.response) === null || _error$response7 === void 0 ? void 0 : _error$response7.status) === 422) {
              errors = _t3.response.data.errors;
              errorMessages = Object.values(errors).flat().join("\n");
              alert("Validation errors:\n".concat(errorMessages));
            } else {
              alert("Failed to save student. Please try again.");
            }
          case 6:
            _context3.p = 6;
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = isEditing ? "Update Student" : "Save Student";
            return _context3.f(6);
          case 7:
            return _context3.a(2);
        }
      }, _callee3, null, [[1, 5, 6, 7]]);
    }));
    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }());
  function resetForm() {
    form.reset();
    isEditing = false;
    document.getElementById("cancelBtn").style.display = "none";
  }

  // Filters & search
  document.getElementById("searchInput").addEventListener("input", renderStudents);
  document.getElementById("clearFilters").addEventListener("click", function () {
    document.getElementById("searchInput").value = "";
    document.getElementById("departmentFilter").value = "";
    updateCourseFilter();
    document.getElementById("courseFilter").value = "";
    document.getElementById("academicYearFilter").value = "";
    document.getElementById("yearstatusFilter").value = "";
    renderStudents();
  });

  // Initialize
  loadSelectOptions().then(fetchStudents);
}

/***/ }),

/***/ "./resources/js/components/SystemSettings.js":
/*!***************************************************!*\
  !*** ./resources/js/components/SystemSettings.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadSystemSettings: () => (/* binding */ loadSystemSettings)
/* harmony export */ });
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function loadSystemSettings(app) {
  app.innerHTML = "\n    <div class=\"dashboard-container\">\n      <nav class=\"sidebar\">\n        <div class=\"sidebar-content\">\n          <div class=\"sidebar-header\">\n            <img src=\"/images/logo.png\" alt=\"EDUTrack logo\" class=\"sidebar-logo\" />\n            <h1 class=\"sidebar-title\">EDUTrack</h1>\n          </div>\n\n          <button class=\"new-item-btn\" id=\"addCourseBtn\">\n            <svg class=\"btn-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n              <line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line>\n              <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>\n            </svg>\n            Add Course\n          </button>\n          \n          <ul class=\"sidebar-menu\">\n            <li>\n              <a href=\"#\" class=\"menu-item\" data-page=\"overview\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z\"></path>\n                </svg>\n                <span>Overview</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item\" data-page=\"students\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path>\n                  <circle cx=\"12\" cy=\"7\" r=\"4\"></circle>\n                </svg>\n                <span>Students</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item\" data-page=\"faculty\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path>\n                  <circle cx=\"9\" cy=\"7\" r=\"4\"></circle>\n                  <path d=\"M23 21v-2a4 4 0 0 0-3-3.87\"></path>\n                  <path d=\"M16 3.13a4 4 0 0 1 0 7.75\"></path>\n                </svg>\n                <span>Faculty</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item\" id=\"menuReport\" data-page=\"report\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M18 20V10\"></path>\n                  <path d=\"M12 20V4\"></path>\n                  <path d=\"M6 20v-6\"></path>\n                </svg>\n                <span>Report</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item\" data-page=\"profile\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path>\n                  <circle cx=\"12\" cy=\"7\" r=\"4\"></circle>\n                </svg>\n                <span>Profile</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"#\" class=\"menu-item active\" data-page=\"settings\">\n                <svg class=\"menu-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <circle cx=\"12\" cy=\"12\" r=\"3\"></circle>\n                  <path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z\"></path>\n                </svg>\n                <span>System Settings</span>\n              </a>\n            </li>\n          </ul>\n        </div>\n\n        <div class=\"sidebar-footer\">\n          <span class=\"version-text\">v1.0.0</span>\n        </div>\n      </nav>\n\n      <div class=\"main-content\">\n        <header class=\"top-header\">\n          <div class=\"header-left\">\n            <h1 class=\"page-title\">System Settings</h1>\n          </div>\n          <div class=\"header-right\">\n            <div class=\"search-container\">\n              <input type=\"text\" class=\"search-input\" placeholder=\"Search\">\n              <svg class=\"search-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n                <path d=\"M21 21l-4.35-4.35\"></path>\n              </svg>\n            </div>\n          </div>\n        </header>\n\n        <div class=\"content-area\">\n          <section class=\"system-settings-banner\">\n            <div class=\"banner-content\">\n              <svg class=\"banner-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                <circle cx=\"12\" cy=\"12\" r=\"3\"></circle>\n                <path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z\"></path>\n              </svg>\n              <h2 class=\"banner-title\">System Settings</h2>\n          </div>\n          </section>\n\n          <section class=\"filters-section\">\n            <div class=\"filters-container\" id=\"filtersContainer\">\n              <!-- Filters will be dynamically populated based on active tab -->\n            </div>\n        </section>\n\n          <section class=\"tabs-section\">\n            <div class=\"tabs-container\">\n              <button class=\"tab-btn active\" data-tab=\"courses\">Courses</button>\n              <button class=\"tab-btn\" data-tab=\"departments\">Departments</button>\n              <button class=\"tab-btn\" data-tab=\"academic\">Academic Years</button>\n              <button class=\"tab-btn\" data-tab=\"archives\">Archives</button>\n            </div>\n          </section>\n\n          <div id=\"tabContent\" class=\"tab-content\"></div>\n        </div>\n      </div>\n    </div>\n  ";

  /* ---------------- Filter templates for each tab ---------------- */
  function getCoursesFilters() {
    return "\n      <div class=\"search-group\">\n        <input type=\"text\" id=\"courseSearch\" class=\"search-field\" placeholder=\"Search Course Name\" />\n        <svg class=\"search-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n          <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n          <path d=\"M21 21l-4.35-4.35\"></path>\n        </svg>\n      </div>\n      \n      <div class=\"filter-group\">\n        <select id=\"courseDepartmentFilter\" class=\"filter-select\">\n          <option value=\"\">All Departments</option>\n        </select>\n        <svg class=\"dropdown-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n          <polyline points=\"6,9 12,15 18,9\"></polyline>\n        </svg>\n      </div>\n      \n      <div class=\"filter-group\">\n        <select id=\"courseFilter\" class=\"filter-select\">\n          <option value=\"\">All Courses</option>\n        </select>\n        <svg class=\"dropdown-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n          <polyline points=\"6,9 12,15 18,9\"></polyline>\n        </svg>\n      </div>\n      \n      <button id=\"clearCourseFilters\" class=\"btn btn-clear\">Clear Filters</button>\n    ";
  }
  function getDepartmentsFilters() {
    return "\n      <div class=\"search-group\">\n        <input type=\"text\" id=\"departmentSearch\" class=\"search-field\" placeholder=\"Search Department Head\" />\n        <svg class=\"search-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n          <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n          <path d=\"M21 21l-4.35-4.35\"></path>\n        </svg>\n      </div>\n      \n      <div class=\"filter-group\">\n        <select id=\"departmentFilter\" class=\"filter-select\">\n          <option value=\"\">All Departments</option>\n        </select>\n        <svg class=\"dropdown-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n          <polyline points=\"6,9 12,15 18,9\"></polyline>\n        </svg>\n      </div>\n      \n      <button id=\"clearDepartmentFilters\" class=\"btn btn-clear\">Clear Filters</button>\n    ";
  }
  function getAcademicFilters() {
    return "\n      <div class=\"search-group\">\n        <input type=\"text\" id=\"academicSearch\" class=\"search-field\" placeholder=\"Search Academic Year\" />\n        <svg class=\"search-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n          <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n          <path d=\"M21 21l-4.35-4.35\"></path>\n        </svg>\n      </div>\n      \n      <div class=\"filter-group\">\n        <select id=\"academicYearFilter\" class=\"filter-select\">\n          <option value=\"\">All Academic Years</option>\n        </select>\n        <svg class=\"dropdown-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n          <polyline points=\"6,9 12,15 18,9\"></polyline>\n        </svg>\n      </div>\n      \n      <div class=\"filter-group\">\n        <select id=\"statusFilter\" class=\"filter-select\">\n          <option value=\"\">Status</option>\n          <option value=\"active\">Active</option>\n          <option value=\"inactive\">Inactive</option>\n        </select>\n        <svg class=\"dropdown-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n          <polyline points=\"6,9 12,15 18,9\"></polyline>\n        </svg>\n      </div>\n      \n      <button id=\"clearAcademicFilters\" class=\"btn btn-clear\">Clear Filters</button>\n    ";
  }
  function getArchivesFilters() {
    return "\n      <div class=\"search-group\">\n        <input type=\"text\" id=\"archiveSearch\" class=\"search-field\" placeholder=\"Search\" />\n        <svg class=\"search-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n          <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n          <path d=\"M21 21l-4.35-4.35\"></path>\n        </svg>\n      </div>\n      \n      <div class=\"filter-group\">\n        <select id=\"archiveCourseFilter\" class=\"filter-select\">\n          <option value=\"\">All Courses</option>\n        </select>\n        <svg class=\"dropdown-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n          <polyline points=\"6,9 12,15 18,9\"></polyline>\n        </svg>\n      </div>\n      \n      <div class=\"filter-group\">\n        <select id=\"archiveDepartmentFilter\" class=\"filter-select\">\n          <option value=\"\">All Departments</option>\n        </select>\n        <svg class=\"dropdown-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n          <polyline points=\"6,9 12,15 18,9\"></polyline>\n        </svg>\n      </div>\n      \n      <div class=\"filter-group\">\n        <select id=\"archiveAcademicYearFilter\" class=\"filter-select\">\n          <option value=\"\">All Academic Years</option>\n        </select>\n        <svg class=\"dropdown-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n          <polyline points=\"6,9 12,15 18,9\"></polyline>\n        </svg>\n      </div>\n      \n      <button id=\"clearArchiveFilters\" class=\"btn btn-clear\">Clear Filters</button>\n    ";
  }

  /* ---------------- Tab templates (UI only) ---------------- */
  function getCoursesContent() {
    return "\n      <div class=\"courses-section\">\n        <div class=\"courses-header\">\n          <div class=\"courses-title-section\">\n            <h3 class=\"courses-title\">Courses</h3>\n            <p class=\"courses-subtitle\">Manage courses and assign to departments</p>\n          </div>\n          <button id=\"refreshCourses\" class=\"btn btn-refresh\">Refresh</button>\n        </div>\n\n        <div class=\"courses-table-container\">\n          <table class=\"courses-table\">\n            <thead>\n              <tr>\n                <th>#</th>\n                <th>Course Name</th>\n                <th>Department</th>\n                <th>Action</th>\n              </tr>\n            </thead>\n            <tbody id=\"coursesTable\"></tbody>\n          </table>\n        </div>\n\n        <div class=\"add-edit-course-section\">\n          <h4 class=\"add-edit-title\">Add/Edit Course</h4>\n          <form id=\"addCourseForm\" class=\"course-form\">\n            <input type=\"hidden\" id=\"edit_course_id\" name=\"edit_course_id\" />\n            <div class=\"form-row\">\n              <div class=\"form-group\">\n                <label for=\"course_name\" class=\"form-label\">Course Name</label>\n                <input type=\"text\" id=\"course_name\" name=\"course_name\" class=\"form-input\" placeholder=\"Course Name\" required />\n              </div>\n              <div class=\"form-group\">\n                <label for=\"course_department_id\" class=\"form-label\">Select Department</label>\n                <select id=\"course_department_id\" name=\"department_id\" class=\"form-select\" required>\n                  <option value=\"\">Select Department</option>\n                </select>\n              </div>\n            </div>\n            <div class=\"form-actions\">\n              <button type=\"button\" id=\"cancelCourseEditBtn\" class=\"btn btn-cancel hidden\">Cancel</button>\n              <button type=\"submit\" id=\"courseSubmitBtn\" class=\"btn btn-add-course\">Add Course</button>\n            </div>\n          </form>\n        </div>\n      </div>\n    ";
  }
  function getDepartmentsContent() {
    return "\n      <div class=\"departments-section\">\n        <div class=\"departments-header\">\n          <div class=\"departments-title-section\">\n            <h3 class=\"departments-title\">Departments</h3>\n            <p class=\"departments-subtitle\">Create and manage departments</p>\n          </div>\n          <button id=\"refreshDepartments\" class=\"btn btn-refresh\">Refresh</button>\n        </div>\n\n        <div class=\"departments-table-container\">\n          <table class=\"departments-table\">\n            <thead>\n              <tr>\n                <th>#</th>\n                <th>Department Name</th>\n                <th>Head</th>\n                <th>Action</th>\n              </tr>\n            </thead>\n            <tbody id=\"departmentsTable\"></tbody>\n          </table>\n        </div>\n\n        <div class=\"add-edit-department-section\">\n          <h4 class=\"add-edit-title\">Add/Edit Department</h4>\n          <form id=\"addDepartmentForm\" class=\"department-form\">\n            <input type=\"hidden\" id=\"edit_department_id\" name=\"edit_department_id\" />\n            <div class=\"form-row\">\n              <div class=\"form-group\">\n                <label for=\"department_name\" class=\"form-label\">Department Name</label>\n                <input type=\"text\" id=\"department_name\" name=\"department_name\" class=\"form-input\" placeholder=\"Department Name\" required />\n              </div>\n              <div class=\"form-group\">\n                <label for=\"department_head\" class=\"form-label\">Department Head</label>\n                <input type=\"text\" id=\"department_head\" name=\"department_head\" class=\"form-input\" placeholder=\"Department Head\" required />\n              </div>\n            </div>\n            <div class=\"form-actions\">\n              <button type=\"button\" id=\"cancelDepartmentEditBtn\" class=\"btn btn-cancel hidden\">Cancel</button>\n              <button type=\"submit\" id=\"departmentSubmitBtn\" class=\"btn btn-add-department\">Add Department</button>\n            </div>\n          </form>\n        </div>\n      </div>\n    ";
  }
  function getAcademicContent() {
    return "\n      <div class=\"academic-section\">\n        <div class=\"academic-header\">\n          <div class=\"academic-title-section\">\n            <h3 class=\"academic-title\">Academic Years</h3>\n            <p class=\"academic-subtitle\">Add academic year ranges and set active</p>\n          </div>\n          <button id=\"refreshAcademic\" class=\"btn btn-refresh\">Refresh</button>\n        </div>\n\n        <div class=\"academic-table-container\">\n          <table class=\"academic-table\">\n            <thead>\n              <tr>\n                <th>#</th>\n                <th>Academic Year</th>\n                <th>Status</th>\n                <th>Action</th>\n              </tr>\n            </thead>\n            <tbody id=\"academicTable\"></tbody>\n          </table>\n        </div>\n\n        <div class=\"add-edit-academic-section\">\n          <h4 class=\"add-edit-title\">Add/Edit Academic Year</h4>\n          <form id=\"addAcademicForm\" class=\"academic-form\">\n            <input type=\"hidden\" id=\"edit_academic_id\" />\n            <div class=\"form-row\">\n              <div class=\"form-group\">\n                <label for=\"academic_year\" class=\"form-label\">Academic Year</label>\n                <input type=\"text\" id=\"academic_year\" class=\"form-input\" placeholder=\"Academic Year (eg.202\" required />\n              </div>\n              <div class=\"form-group\">\n                <label for=\"is_active\" class=\"form-label\">Set Active</label>\n                <div class=\"checkbox-group\">\n                  <input type=\"checkbox\" id=\"is_active\" class=\"form-checkbox\" />\n                  <label for=\"is_active\" class=\"checkbox-label\">Active</label>\n                </div>\n              </div>\n            </div>\n            <div class=\"form-actions\">\n              <button type=\"button\" id=\"cancelAcademicEditBtn\" class=\"btn btn-cancel hidden\">Cancel</button>\n              <button type=\"submit\" id=\"academicSubmitBtn\" class=\"btn btn-add-academic\">Add Academic Year</button>\n            </div>\n          </form>\n        </div>\n      </div>\n    ";
  }
  function getArchivesContent() {
    return "\n      <div class=\"archives-section\">\n        <div class=\"archives-header\">\n          <div class=\"archives-title-section\">\n            <h3 class=\"archives-title\">Archives</h3>\n            <p class=\"archives-subtitle\">Restore archived items</p>\n          </div>\n          <button id=\"refreshArchives\" class=\"btn btn-refresh\">Refresh</button>\n        </div>\n\n        <div class=\"archives-table-container\">\n          <table class=\"archives-table\">\n            <thead>\n              <tr>\n                <th>Type</th>\n                <th>Name / Title</th>\n                <th>Action</th>\n              </tr>\n            </thead>\n            <tbody id=\"archiveTable\"></tbody>\n          </table>\n        </div>\n      </div>\n    ";
  }

  /* ---------------- Tab switching (keeps existing logic) ---------------- */
  var tabContent = document.getElementById("tabContent");
  function showTab(_x) {
    return _showTab.apply(this, arguments);
  }
  function _showTab() {
    _showTab = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(tab) {
      var sidebarBtn, filtersContainer, refreshBtn, _t9, _t0;
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.n) {
          case 0:
            document.querySelectorAll('.tab-btn').forEach(function (b) {
              return b.classList.remove('active');
            });
            document.querySelector(".tab-btn[data-tab=\"".concat(tab, "\"]")).classList.add('active');

            // Update sidebar button text based on active tab
            sidebarBtn = document.getElementById('addCourseBtn');
            if (!sidebarBtn) {
              _context9.n = 5;
              break;
            }
            _t9 = tab;
            _context9.n = _t9 === 'courses' ? 1 : _t9 === 'departments' ? 2 : _t9 === 'academic' ? 3 : 4;
            break;
          case 1:
            sidebarBtn.innerHTML = "\n            <svg class=\"btn-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n              <line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line>\n              <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>\n            </svg>\n            Add Course\n          ";
            return _context9.a(3, 5);
          case 2:
            sidebarBtn.innerHTML = "\n            <svg class=\"btn-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n              <line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line>\n              <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>\n            </svg>\n            Add Department\n          ";
            return _context9.a(3, 5);
          case 3:
            sidebarBtn.innerHTML = "\n            <svg class=\"btn-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n              <line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line>\n              <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>\n            </svg>\n            Add Academic Year\n          ";
            return _context9.a(3, 5);
          case 4:
            sidebarBtn.innerHTML = "\n            <svg class=\"btn-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n              <line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line>\n              <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>\n            </svg>\n            New Item\n          ";
          case 5:
            // Update filters based on active tab
            filtersContainer = document.getElementById('filtersContainer');
            if (!filtersContainer) {
              _context9.n = 14;
              break;
            }
            _t0 = tab;
            _context9.n = _t0 === 'courses' ? 6 : _t0 === 'departments' ? 8 : _t0 === 'academic' ? 10 : _t0 === 'archives' ? 12 : 14;
            break;
          case 6:
            filtersContainer.innerHTML = getCoursesFilters();
            _context9.n = 7;
            return populateCourseFilters();
          case 7:
            setupCourseFilters();
            return _context9.a(3, 14);
          case 8:
            filtersContainer.innerHTML = getDepartmentsFilters();
            _context9.n = 9;
            return populateDepartmentFilters();
          case 9:
            setupDepartmentFilters();
            return _context9.a(3, 14);
          case 10:
            filtersContainer.innerHTML = getAcademicFilters();
            _context9.n = 11;
            return populateAcademicFilters();
          case 11:
            setupAcademicFilters();
            return _context9.a(3, 14);
          case 12:
            filtersContainer.innerHTML = getArchivesFilters();
            _context9.n = 13;
            return populateArchiveFilters();
          case 13:
            setupArchiveFilters();
            return _context9.a(3, 14);
          case 14:
            if (!(tab === "courses")) {
              _context9.n = 16;
              break;
            }
            tabContent.innerHTML = getCoursesContent();
            _context9.n = 15;
            return populateCourseDepartments();
          case 15:
            fetchCourses();
            setupCourseForm();
            _context9.n = 17;
            break;
          case 16:
            if (tab === "departments") {
              tabContent.innerHTML = getDepartmentsContent();
              fetchDepartments();
              setupDepartmentForm();
              refreshBtn = document.getElementById('refreshDepartments');
              if (refreshBtn) refreshBtn.addEventListener('click', fetchDepartments);
            } else if (tab === "academic") {
              tabContent.innerHTML = getAcademicContent();
              fetchAcademicYears();
              setupAcademicForm();
            } else if (tab === "archives") {
              tabContent.innerHTML = getArchivesContent();
              fetchArchives();
            }
          case 17:
            return _context9.a(2);
        }
      }, _callee9);
    }));
    return _showTab.apply(this, arguments);
  }
  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      return showTab(btn.dataset.tab);
    });
  });

  /* ---------------- Courses, Departments, Academic, Archives logic (unchanged) ---------------- */
  var editingCourseId = null;
  var allCoursesData = [];
  function fetchCourses() {
    return _fetchCourses.apply(this, arguments);
  }
  function _fetchCourses() {
    _fetchCourses = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
      var res, table, data;
      return _regenerator().w(function (_context0) {
        while (1) switch (_context0.n) {
          case 0:
            _context0.n = 1;
            return fetch('/api/courses', {
              credentials: 'include'
            });
          case 1:
            res = _context0.v;
            table = document.getElementById('coursesTable');
            if (table) {
              _context0.n = 2;
              break;
            }
            return _context0.a(2);
          case 2:
            if (!res.ok) {
              _context0.n = 4;
              break;
            }
            _context0.n = 3;
            return res.json();
          case 3:
            data = _context0.v;
            allCoursesData = data;
            renderCourses();
            _context0.n = 5;
            break;
          case 4:
            table.innerHTML = "<tr><td colspan=\"4\" class=\"text-error\">Failed to load courses.</td></tr>";
          case 5:
            return _context0.a(2);
        }
      }, _callee0);
    }));
    return _fetchCourses.apply(this, arguments);
  }
  function renderCourses() {
    var _document$getElementB, _document$getElementB2, _document$getElementB3;
    var table = document.getElementById('coursesTable');
    if (!table) return;
    var searchTerm = ((_document$getElementB = document.getElementById('courseSearch')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value.toLowerCase()) || '';
    var departmentFilter = ((_document$getElementB2 = document.getElementById('courseDepartmentFilter')) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.value) || '';
    var courseFilter = ((_document$getElementB3 = document.getElementById('courseFilter')) === null || _document$getElementB3 === void 0 ? void 0 : _document$getElementB3.value) || '';
    var filteredData = allCoursesData.filter(function (c) {
      var matches = true;
      if (searchTerm) {
        matches = matches && c.name.toLowerCase().includes(searchTerm);
      }
      if (departmentFilter) {
        matches = matches && c.department_id == departmentFilter;
      }
      if (courseFilter) {
        matches = matches && c.id == courseFilter;
      }
      return matches;
    });
    table.innerHTML = filteredData.length ? filteredData.map(function (c, i) {
      var _c$department;
      return "\n            <tr>\n              <td>".concat(i + 1, "</td>\n              <td>").concat(c.name, "</td>\n              <td>").concat(((_c$department = c.department) === null || _c$department === void 0 ? void 0 : _c$department.name) || '', "</td>\n              <td>\n              <button class=\"action-btn edit-btn\" data-id=\"").concat(c.id, "\" data-name=\"").concat(c.name, "\" data-department=\"").concat(c.department_id, "\">Edit</button>\n              <button class=\"action-btn archive-btn\" data-id=\"").concat(c.id, "\">Archive</button>\n              </td>\n            </tr>\n          ");
    }).join('') : "<tr><td colspan=\"4\" class=\"text-muted\">No courses found.</td></tr>";

    // Attach event listeners
    document.querySelectorAll('.archive-btn').forEach(function (btn) {
      btn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var res, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (confirm('Are you sure you want to archive this course?')) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              _context.p = 1;
              _context.n = 2;
              return fetch("/api/courses/".concat(btn.dataset.id), {
                method: 'DELETE',
                credentials: 'include'
              });
            case 2:
              res = _context.v;
              if (!res.ok) {
                _context.n = 4;
                break;
              }
              alert('Course archived successfully!');
              _context.n = 3;
              return fetchCourses();
            case 3:
              // Refresh the table
              resetCourseForm();
              _context.n = 5;
              break;
            case 4:
              alert('Failed to archive course. Please try again.');
            case 5:
              _context.n = 7;
              break;
            case 6:
              _context.p = 6;
              _t = _context.v;
              console.error('Error archiving course:', _t);
              alert('Failed to archive course. Please try again.');
            case 7:
              return _context.a(2);
          }
        }, _callee, null, [[1, 6]]);
      })));
    });
    document.querySelectorAll('.edit-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        editingCourseId = btn.dataset.id;
        document.getElementById('edit_course_id').value = editingCourseId;
        document.getElementById('course_name').value = btn.dataset.name;
        document.getElementById('course_department_id').value = btn.dataset.department;
        document.getElementById('courseSubmitBtn').textContent = "Update Course";
        document.getElementById('cancelCourseEditBtn').classList.remove('hidden');
      });
    });
  }
  function setupCourseForm() {
    var form = document.getElementById('addCourseForm');
    if (!form) return;
    form.addEventListener('submit', /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(e) {
        var courseName, departmentId, editId, submitBtn, body, res, errorData, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              e.preventDefault();
              courseName = document.getElementById('course_name').value;
              departmentId = document.getElementById('course_department_id').value;
              editId = document.getElementById('edit_course_id').value;
              submitBtn = document.getElementById('courseSubmitBtn'); // Show loading state
              submitBtn.disabled = true;
              submitBtn.textContent = editId ? "Updating..." : "Adding...";
              _context2.p = 1;
              body = JSON.stringify({
                name: courseName,
                department_id: departmentId
              });
              if (!editId) {
                _context2.n = 3;
                break;
              }
              _context2.n = 2;
              return fetch("/api/courses/".concat(editId), {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: body
              });
            case 2:
              res = _context2.v;
              _context2.n = 5;
              break;
            case 3:
              _context2.n = 4;
              return fetch('/api/courses', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: body
              });
            case 4:
              res = _context2.v;
            case 5:
              if (!res.ok) {
                _context2.n = 7;
                break;
              }
              alert(editId ? "Course updated successfully!" : "Course added successfully!");
              _context2.n = 6;
              return fetchCourses();
            case 6:
              // Refresh the table
              resetCourseForm();
              _context2.n = 9;
              break;
            case 7:
              _context2.n = 8;
              return res.json()["catch"](function () {
                return {};
              });
            case 8:
              errorData = _context2.v;
              alert("Failed to save course: ".concat(errorData.message || 'Unknown error'));
            case 9:
              _context2.n = 11;
              break;
            case 10:
              _context2.p = 10;
              _t2 = _context2.v;
              console.error('Error saving course:', _t2);
              alert('Failed to save course. Please try again.');
            case 11:
              _context2.p = 11;
              // Reset button state
              submitBtn.disabled = false;
              submitBtn.textContent = editId ? "Update Course" : "Add Course";
              return _context2.f(11);
            case 12:
              return _context2.a(2);
          }
        }, _callee2, null, [[1, 10, 11, 12]]);
      }));
      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
    document.getElementById('cancelCourseEditBtn').addEventListener('click', resetCourseForm);
  }
  function resetCourseForm() {
    var form = document.getElementById('addCourseForm');
    if (!form) return;
    form.reset();
    document.getElementById('edit_course_id').value = "";
    document.getElementById('courseSubmitBtn').textContent = "Add Course";
    document.getElementById('cancelCourseEditBtn').classList.add('hidden');
    editingCourseId = null;
  }

  /* ---------------- Departments ---------------- */
  var editingDepartmentId = null;
  var allDepartmentsData = [];
  function fetchDepartments() {
    return _fetchDepartments.apply(this, arguments);
  }
  function _fetchDepartments() {
    _fetchDepartments = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
      var res, table, data;
      return _regenerator().w(function (_context1) {
        while (1) switch (_context1.n) {
          case 0:
            _context1.n = 1;
            return fetch('/api/departments', {
              credentials: 'include'
            });
          case 1:
            res = _context1.v;
            table = document.getElementById('departmentsTable');
            if (table) {
              _context1.n = 2;
              break;
            }
            return _context1.a(2);
          case 2:
            if (!res.ok) {
              _context1.n = 4;
              break;
            }
            _context1.n = 3;
            return res.json();
          case 3:
            data = _context1.v;
            // Normalize backend differences (name vs department_name, head vs department_head)
            allDepartmentsData = (data || []).map(function (d) {
              return {
                id: d.id,
                name: d.name || d.department_name || '',
                head: d.head || d.department_head || ''
              };
            });
            renderDepartments();
            _context1.n = 5;
            break;
          case 4:
            table.innerHTML = "<tr><td colspan=\"4\" class=\"text-error\">Failed to load departments.</td></tr>";
          case 5:
            return _context1.a(2);
        }
      }, _callee1);
    }));
    return _fetchDepartments.apply(this, arguments);
  }
  function renderDepartments() {
    var _document$getElementB4;
    var table = document.getElementById('departmentsTable');
    if (!table) return;
    var searchTerm = ((_document$getElementB4 = document.getElementById('departmentSearch')) === null || _document$getElementB4 === void 0 ? void 0 : _document$getElementB4.value.toLowerCase()) || '';
    var departmentFilter = document.getElementById('departmentFilter').value;
    var filteredData = allDepartmentsData.filter(function (d) {
      var matches = true;
      if (searchTerm) {
        var name = (d.name || d.department_name || "").toLowerCase();
        var head = (d.head || d.department_head || "").toLowerCase();
        matches = matches && (name.includes(searchTerm) || head.includes(searchTerm));
      }
      if (departmentFilter) {
        matches = matches && d.id == departmentFilter;
      }
      return matches;
    });
    table.innerHTML = filteredData.length ? filteredData.map(function (d, i) {
      return "\n            <tr>\n              <td>".concat(i + 1, "</td>\n            <td>").concat(d.name || d.department_name || '', "</td>\n            <td>").concat(d.head || d.department_head || '', "</td>\n              <td>\n              <button class=\"action-btn edit-btn\" data-id=\"").concat(d.id, "\" data-name=\"").concat(d.name, "\" data-head=\"").concat(d.head, "\">Edit</button>\n              <button class=\"action-btn archive-btn\" data-id=\"").concat(d.id, "\">Archive</button>\n              </td>\n            </tr>\n          ");
    }).join('') : "<tr><td colspan=\"4\" class=\"text-muted\">No departments found.</td></tr>";

    // Attach event listeners
    document.querySelectorAll('.archive-btn').forEach(function (btn) {
      btn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var res, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              if (confirm('Are you sure you want to archive this department?')) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2);
            case 1:
              _context3.p = 1;
              _context3.n = 2;
              return fetch("/api/departments/".concat(btn.dataset.id), {
                method: 'DELETE',
                credentials: 'include'
              });
            case 2:
              res = _context3.v;
              if (!res.ok) {
                _context3.n = 4;
                break;
              }
              alert('Department archived successfully!');
              _context3.n = 3;
              return fetchDepartments();
            case 3:
              // Refresh the table
              resetDepartmentForm();
              _context3.n = 5;
              break;
            case 4:
              alert('Failed to archive department. Please try again.');
            case 5:
              _context3.n = 7;
              break;
            case 6:
              _context3.p = 6;
              _t3 = _context3.v;
              console.error('Error archiving department:', _t3);
              alert('Failed to archive department. Please try again.');
            case 7:
              return _context3.a(2);
          }
        }, _callee3, null, [[1, 6]]);
      })));
    });
    document.querySelectorAll('.edit-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        editingDepartmentId = btn.dataset.id;
        document.getElementById('edit_department_id').value = editingDepartmentId;
        document.getElementById('department_name').value = btn.dataset.name;
        document.getElementById('department_head').value = btn.dataset.head;
        document.getElementById('departmentSubmitBtn').textContent = "Update Department";
        document.getElementById('departmentSubmitBtn').classList.remove('btn-add-department');
        document.getElementById('departmentSubmitBtn').classList.add('btn-update');
        document.getElementById('cancelDepartmentEditBtn').classList.remove('hidden');
      });
    });
  }
  function setupDepartmentForm() {
    var form = document.getElementById('addDepartmentForm');
    if (!form) return;
    form.addEventListener('submit', /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(e) {
        var departmentName, departmentHead, editId, submitBtn, body, res, errorData, _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              e.preventDefault();
              departmentName = document.getElementById('department_name').value;
              departmentHead = document.getElementById('department_head').value;
              editId = document.getElementById('edit_department_id').value;
              submitBtn = document.getElementById('departmentSubmitBtn'); // Show loading state
              submitBtn.disabled = true;
              submitBtn.textContent = editId ? "Updating..." : "Adding...";
              _context4.p = 1;
              body = JSON.stringify({
                name: departmentName,
                head: departmentHead
              });
              if (!editId) {
                _context4.n = 3;
                break;
              }
              _context4.n = 2;
              return fetch("/api/departments/".concat(editId), {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: body
              });
            case 2:
              res = _context4.v;
              _context4.n = 5;
              break;
            case 3:
              _context4.n = 4;
              return fetch('/api/departments', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: body
              });
            case 4:
              res = _context4.v;
            case 5:
              if (!res.ok) {
                _context4.n = 7;
                break;
              }
              alert(editId ? "Department updated successfully!" : "Department added successfully!");
              _context4.n = 6;
              return fetchDepartments();
            case 6:
              // Refresh the table
              resetDepartmentForm();
              _context4.n = 9;
              break;
            case 7:
              _context4.n = 8;
              return res.json()["catch"](function () {
                return {};
              });
            case 8:
              errorData = _context4.v;
              alert("Failed to save department: ".concat(errorData.message || 'Unknown error'));
            case 9:
              _context4.n = 11;
              break;
            case 10:
              _context4.p = 10;
              _t4 = _context4.v;
              console.error('Error saving department:', _t4);
              alert('Failed to save department. Please try again.');
            case 11:
              _context4.p = 11;
              // Reset button state
              submitBtn.disabled = false;
              submitBtn.textContent = editId ? "Update Department" : "Add Department";
              return _context4.f(11);
            case 12:
              return _context4.a(2);
          }
        }, _callee4, null, [[1, 10, 11, 12]]);
      }));
      return function (_x3) {
        return _ref4.apply(this, arguments);
      };
    }());
    document.getElementById('cancelDepartmentEditBtn').addEventListener('click', resetDepartmentForm);
  }
  function resetDepartmentForm() {
    var form = document.getElementById('addDepartmentForm');
    if (!form) return;
    form.reset();
    document.getElementById('edit_department_id').value = "";
    document.getElementById('departmentSubmitBtn').textContent = "Add Department";
    document.getElementById('departmentSubmitBtn').classList.remove('btn-update');
    document.getElementById('departmentSubmitBtn').classList.add('btn-add-department');
    document.getElementById('cancelDepartmentEditBtn').classList.add('hidden');
    editingDepartmentId = null;
  }

  /* ---------------- Academic Years ---------------- */
  var editingAcademicId = null;
  var allAcademicData = [];
  function fetchAcademicYears() {
    return _fetchAcademicYears.apply(this, arguments);
  }
  function _fetchAcademicYears() {
    _fetchAcademicYears = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
      var res, table, data;
      return _regenerator().w(function (_context10) {
        while (1) switch (_context10.n) {
          case 0:
            _context10.n = 1;
            return fetch('/api/academic-years', {
              credentials: 'include'
            });
          case 1:
            res = _context10.v;
            table = document.getElementById('academicTable');
            if (table) {
              _context10.n = 2;
              break;
            }
            return _context10.a(2);
          case 2:
            if (!res.ok) {
              _context10.n = 4;
              break;
            }
            _context10.n = 3;
            return res.json();
          case 3:
            data = _context10.v;
            allAcademicData = data;
            renderAcademicYears();
            _context10.n = 5;
            break;
          case 4:
            table.innerHTML = "<tr><td colspan=\"4\" class=\"text-error\">Failed to load academic years.</td></tr>";
          case 5:
            return _context10.a(2);
        }
      }, _callee10);
    }));
    return _fetchAcademicYears.apply(this, arguments);
  }
  function renderAcademicYears() {
    var _document$getElementB5, _document$getElementB6, _document$getElementB7;
    var table = document.getElementById('academicTable');
    if (!table) return;
    var searchTerm = ((_document$getElementB5 = document.getElementById('academicSearch')) === null || _document$getElementB5 === void 0 ? void 0 : _document$getElementB5.value.toLowerCase()) || '';
    var academicYearFilter = ((_document$getElementB6 = document.getElementById('academicYearFilter')) === null || _document$getElementB6 === void 0 ? void 0 : _document$getElementB6.value) || '';
    var statusFilter = ((_document$getElementB7 = document.getElementById('statusFilter')) === null || _document$getElementB7 === void 0 ? void 0 : _document$getElementB7.value) || '';
    var filteredData = allAcademicData.filter(function (a) {
      var matches = true;
      if (searchTerm) {
        var year = (a.year || a.academic_year || '').toString();
        matches = matches && year.toLowerCase().includes(searchTerm);
      }
      if (academicYearFilter) {
        matches = matches && a.id == academicYearFilter;
      }
      if (statusFilter) {
        var isActive = a.is_active ? 'active' : 'inactive';
        matches = matches && isActive === statusFilter;
      }
      return matches;
    });
    table.innerHTML = filteredData.length ? filteredData.map(function (a, i) {
      return "\n            <tr>\n              <td>".concat(i + 1, "</td>\n              <td>").concat(a.year || a.academic_year, "</td>\n              <td>").concat(a.is_active ? 'Active' : 'Inactive', "</td>\n              <td>\n              <button class=\"action-btn edit-btn\" data-id=\"").concat(a.id, "\" data-year=\"").concat(a.year || a.academic_year, "\" data-active=\"").concat(a.is_active ? 1 : 0, "\">Edit</button>\n              <button class=\"action-btn archive-btn\" data-id=\"").concat(a.id, "\">Archive</button>\n              </td>\n            </tr>\n          ");
    }).join('') : "<tr><td colspan=\"4\" class=\"text-muted\">No academic years found.</td></tr>";

    // Attach event listeners
    document.querySelectorAll('.archive-btn').forEach(function (btn) {
      btn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var res, _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              if (confirm('Are you sure you want to archive this academic year?')) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2);
            case 1:
              _context5.p = 1;
              _context5.n = 2;
              return fetch("/api/academic-years/".concat(btn.dataset.id), {
                method: 'DELETE',
                credentials: 'include'
              });
            case 2:
              res = _context5.v;
              if (!res.ok) {
                _context5.n = 4;
                break;
              }
              alert('Academic year archived successfully!');
              _context5.n = 3;
              return fetchAcademicYears();
            case 3:
              // Refresh the table
              resetAcademicForm();
              _context5.n = 5;
              break;
            case 4:
              alert('Failed to archive academic year. Please try again.');
            case 5:
              _context5.n = 7;
              break;
            case 6:
              _context5.p = 6;
              _t5 = _context5.v;
              console.error('Error archiving academic year:', _t5);
              alert('Failed to archive academic year. Please try again.');
            case 7:
              return _context5.a(2);
          }
        }, _callee5, null, [[1, 6]]);
      })));
    });
    document.querySelectorAll('.edit-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        editingAcademicId = btn.dataset.id;
        document.getElementById('edit_academic_id').value = editingAcademicId;
        document.getElementById('academic_year').value = btn.dataset.year;
        document.getElementById('is_active').checked = btn.dataset.active === "1";
        document.getElementById('academicSubmitBtn').textContent = "Update Academic Year";
        document.getElementById('cancelAcademicEditBtn').classList.remove('hidden');
      });
    });
  }
  function setupAcademicForm() {
    var form = document.getElementById('addAcademicForm');
    if (!form) return;
    form.addEventListener('submit', /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(e) {
        var year, is_active, editId, submitBtn, body, res, errorData, _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              e.preventDefault();
              year = document.getElementById('academic_year').value;
              is_active = document.getElementById('is_active').checked ? 1 : 0;
              editId = document.getElementById('edit_academic_id').value;
              submitBtn = document.getElementById('academicSubmitBtn'); // Show loading state
              submitBtn.disabled = true;
              submitBtn.textContent = editId ? "Updating..." : "Adding...";
              _context6.p = 1;
              body = JSON.stringify({
                year: year,
                is_active: is_active
              });
              if (!editId) {
                _context6.n = 3;
                break;
              }
              _context6.n = 2;
              return fetch("/api/academic-years/".concat(editId), {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: body
              });
            case 2:
              res = _context6.v;
              _context6.n = 5;
              break;
            case 3:
              _context6.n = 4;
              return fetch('/api/academic-years', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: body
              });
            case 4:
              res = _context6.v;
            case 5:
              if (!res.ok) {
                _context6.n = 7;
                break;
              }
              alert(editId ? "Academic year updated successfully!" : "Academic year added successfully!");
              _context6.n = 6;
              return fetchAcademicYears();
            case 6:
              // Refresh the table
              resetAcademicForm();
              _context6.n = 9;
              break;
            case 7:
              _context6.n = 8;
              return res.json()["catch"](function () {
                return {};
              });
            case 8:
              errorData = _context6.v;
              alert("Failed to save academic year: ".concat(errorData.message || 'Unknown error'));
            case 9:
              _context6.n = 11;
              break;
            case 10:
              _context6.p = 10;
              _t6 = _context6.v;
              console.error('Error saving academic year:', _t6);
              alert('Failed to save academic year. Please try again.');
            case 11:
              _context6.p = 11;
              // Reset button state
              submitBtn.disabled = false;
              submitBtn.textContent = editId ? "Update Academic Year" : "Add Academic Year";
              return _context6.f(11);
            case 12:
              return _context6.a(2);
          }
        }, _callee6, null, [[1, 10, 11, 12]]);
      }));
      return function (_x4) {
        return _ref6.apply(this, arguments);
      };
    }());
    document.getElementById('cancelAcademicEditBtn').addEventListener('click', resetAcademicForm);
  }
  function resetAcademicForm() {
    var form = document.getElementById('addAcademicForm');
    if (!form) return;
    form.reset();
    document.getElementById('edit_academic_id').value = "";
    document.getElementById('academicSubmitBtn').textContent = "Add Academic Year";
    document.getElementById('cancelAcademicEditBtn').classList.add('hidden');
    editingAcademicId = null;
  }

  /* ---------------- Archives ---------------- */
  var allArchivesData = [];
  function fetchArchives() {
    return _fetchArchives.apply(this, arguments);
  }
  function _fetchArchives() {
    _fetchArchives = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
      var res, table, data, rows;
      return _regenerator().w(function (_context11) {
        while (1) switch (_context11.n) {
          case 0:
            _context11.n = 1;
            return fetch('/api/archives', {
              credentials: 'include'
            });
          case 1:
            res = _context11.v;
            table = document.getElementById('archiveTable');
            if (table) {
              _context11.n = 2;
              break;
            }
            return _context11.a(2);
          case 2:
            if (res.ok) {
              _context11.n = 3;
              break;
            }
            table.innerHTML = "<tr><td colspan=\"4\" class=\"text-error\">Failed to load archives.</td></tr>";
            return _context11.a(2);
          case 3:
            _context11.n = 4;
            return res.json();
          case 4:
            data = _context11.v;
            rows = []; // Use singular type keys matching earlier implementation: course, department, academic_year, faculty, student
            (data.courses || []).forEach(function (c) {
              return rows.push({
                group: 'course',
                type: 'Course',
                name: c.name,
                id: c.id
              });
            });
            (data.departments || []).forEach(function (d) {
              return rows.push({
                group: 'department',
                type: 'Department',
                name: d.name,
                id: d.id
              });
            });
            (data.academic_years || []).forEach(function (a) {
              return rows.push({
                group: 'academic_year',
                type: 'Academic Year',
                name: a.year || a.academic_year,
                id: a.id
              });
            });
            (data.faculties || []).forEach(function (f) {
              return rows.push({
                group: 'faculty',
                type: 'Faculty',
                name: (f.first_name || f.firstname) + ' ' + (f.last_name || f.lastname),
                id: f.id
              });
            });
            (data.students || []).forEach(function (s) {
              return rows.push({
                group: 'student',
                type: 'Student',
                name: (s.first_name || s.firstname) + ' ' + (s.last_name || s.lastname),
                id: s.id
              });
            });
            allArchivesData = rows;
            renderArchives();
          case 5:
            return _context11.a(2);
        }
      }, _callee11);
    }));
    return _fetchArchives.apply(this, arguments);
  }
  function renderArchives() {
    var _document$getElementB8, _document$getElementB9, _document$getElementB0, _document$getElementB1;
    var table = document.getElementById('archiveTable');
    if (!table) return;
    var search = ((_document$getElementB8 = document.getElementById('archiveSearch')) === null || _document$getElementB8 === void 0 ? void 0 : _document$getElementB8.value.toLowerCase()) || '';
    var courseFilter = ((_document$getElementB9 = document.getElementById('archiveCourseFilter')) === null || _document$getElementB9 === void 0 ? void 0 : _document$getElementB9.value) || '';
    var deptFilter = ((_document$getElementB0 = document.getElementById('archiveDepartmentFilter')) === null || _document$getElementB0 === void 0 ? void 0 : _document$getElementB0.value) || '';
    var acadFilter = ((_document$getElementB1 = document.getElementById('archiveAcademicYearFilter')) === null || _document$getElementB1 === void 0 ? void 0 : _document$getElementB1.value) || '';
    var filtered = allArchivesData.filter(function (r) {
      var matches = true;
      if (search) {
        matches = matches && (r.name.toLowerCase().includes(search) || r.type.toLowerCase().includes(search));
      }
      if (courseFilter) {
        matches = matches && r.group === 'course' && String(r.id) === String(courseFilter);
      }
      if (deptFilter) {
        matches = matches && r.group === 'department' && String(r.id) === String(deptFilter);
      }
      if (acadFilter) {
        matches = matches && r.group === 'academic_year' && String(r.id) === String(acadFilter);
      }
      return matches;
    });
    table.innerHTML = filtered.length ? filtered.map(function (r) {
      return "\n          <tr>\n            <td>".concat(r.type, "</td>\n            <td>").concat(r.name, "</td>\n            <td>\n              <button class=\"action-btn edit-btn btn-restore\" data-type=\"").concat(r.group, "\" data-id=\"").concat(r.id, "\">Restore</button>\n              <button class=\"action-btn archive-btn btn-delete\" data-type=\"").concat(r.group, "\" data-id=\"").concat(r.id, "\">Delete</button>\n            </td>\n          </tr>\n        ");
    }).join('') : "<tr><td colspan=\"3\" class=\"text-muted\">No archived data found.</td></tr>";

    // actions
    document.querySelectorAll('.btn-restore').forEach(function (btn) {
      btn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var type, id, res, restoreEndpoints, alt, _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              type = btn.dataset.type; // course | department | academic_year | faculty | student
              id = btn.dataset.id;
              if (confirm("Are you sure you want to restore this ".concat(type, "?"))) {
                _context7.n = 1;
                break;
              }
              return _context7.a(2);
            case 1:
              _context7.p = 1;
              _context7.n = 2;
              return fetch("/api/archives/restore/".concat(type, "/").concat(id), {
                method: 'POST',
                credentials: 'include'
              });
            case 2:
              res = _context7.v;
              if (res.ok) {
                _context7.n = 4;
                break;
              }
              restoreEndpoints = {
                course: "/api/courses/".concat(id, "/restore"),
                department: "/api/departments/".concat(id, "/restore"),
                academic_year: "/api/academic-years/".concat(id, "/restore"),
                faculty: "/api/faculties/".concat(id, "/restore"),
                student: "/api/students/".concat(id, "/restore")
              };
              alt = restoreEndpoints[type];
              if (!alt) {
                _context7.n = 4;
                break;
              }
              _context7.n = 3;
              return fetch(alt, {
                method: 'POST',
                credentials: 'include'
              });
            case 3:
              res = _context7.v;
            case 4:
              if (!res.ok) {
                _context7.n = 6;
                break;
              }
              alert('Item restored successfully!');
              _context7.n = 5;
              return fetchArchives();
            case 5:
              _context7.n = 7;
              break;
            case 6:
              alert('Failed to restore item. Please try again.');
            case 7:
              _context7.n = 9;
              break;
            case 8:
              _context7.p = 8;
              _t7 = _context7.v;
              console.error('Error restoring item:', _t7);
              alert('Failed to restore item. Please try again.');
            case 9:
              return _context7.a(2);
          }
        }, _callee7, null, [[1, 8]]);
      })));
    });
    document.querySelectorAll('.btn-delete').forEach(function (btn) {
      btn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var type, id, res, deleteEndpoints, alt, _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              if (confirm('Permanently delete this archived item? This cannot be undone.')) {
                _context8.n = 1;
                break;
              }
              return _context8.a(2);
            case 1:
              type = btn.dataset.type; // course | department | academic_year | faculty | student
              id = btn.dataset.id;
              _context8.p = 2;
              _context8.n = 3;
              return fetch("/api/archives/".concat(type, "/").concat(id), {
                method: 'DELETE',
                credentials: 'include'
              });
            case 3:
              res = _context8.v;
              if (res.ok) {
                _context8.n = 5;
                break;
              }
              deleteEndpoints = {
                course: "/api/courses/".concat(id, "/force-delete"),
                department: "/api/departments/".concat(id, "/force-delete"),
                academic_year: "/api/academic-years/".concat(id, "/force-delete"),
                faculty: "/api/faculties/".concat(id, "/force-delete"),
                student: "/api/students/".concat(id, "/force-delete")
              };
              alt = deleteEndpoints[type];
              if (!alt) {
                _context8.n = 5;
                break;
              }
              _context8.n = 4;
              return fetch(alt, {
                method: 'DELETE',
                credentials: 'include'
              });
            case 4:
              res = _context8.v;
            case 5:
              if (!res.ok) {
                _context8.n = 7;
                break;
              }
              alert('Item permanently deleted successfully!');
              _context8.n = 6;
              return fetchArchives();
            case 6:
              _context8.n = 8;
              break;
            case 7:
              alert('Failed to delete item. Please try again.');
            case 8:
              _context8.n = 10;
              break;
            case 9:
              _context8.p = 9;
              _t8 = _context8.v;
              console.error('Error deleting item:', _t8);
              alert('Failed to delete item. Please try again.');
            case 10:
              return _context8.a(2);
          }
        }, _callee8, null, [[2, 9]]);
      })));
    });
  }

  /* ---------------- helpers ---------------- */
  function populateCourseDepartments() {
    return _populateCourseDepartments.apply(this, arguments);
  } // Course filters
  function _populateCourseDepartments() {
    _populateCourseDepartments = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
      var res, departments, select;
      return _regenerator().w(function (_context12) {
        while (1) switch (_context12.n) {
          case 0:
            _context12.n = 1;
            return fetch('/api/departments', {
              credentials: 'include'
            });
          case 1:
            res = _context12.v;
            if (res.ok) {
              _context12.n = 2;
              break;
            }
            return _context12.a(2);
          case 2:
            _context12.n = 3;
            return res.json();
          case 3:
            departments = _context12.v;
            select = document.getElementById('course_department_id');
            if (select) {
              select.innerHTML = "<option value=\"\">Select Department</option>" + departments.map(function (d) {
                return "<option value=\"".concat(d.id, "\">").concat(d.name, "</option>");
              }).join('');
            }
          case 4:
            return _context12.a(2);
        }
      }, _callee12);
    }));
    return _populateCourseDepartments.apply(this, arguments);
  }
  function populateCourseFilters() {
    return _populateCourseFilters.apply(this, arguments);
  }
  function _populateCourseFilters() {
    _populateCourseFilters = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
      var _yield$Promise$all, _yield$Promise$all2, departmentsRes, coursesRes, departments, deptSelect, courses, courseSelect;
      return _regenerator().w(function (_context13) {
        while (1) switch (_context13.n) {
          case 0:
            _context13.n = 1;
            return Promise.all([fetch('/api/departments', {
              credentials: 'include'
            }), fetch('/api/courses', {
              credentials: 'include'
            })]);
          case 1:
            _yield$Promise$all = _context13.v;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
            departmentsRes = _yield$Promise$all2[0];
            coursesRes = _yield$Promise$all2[1];
            if (!departmentsRes.ok) {
              _context13.n = 3;
              break;
            }
            _context13.n = 2;
            return departmentsRes.json();
          case 2:
            departments = _context13.v;
            deptSelect = document.getElementById('courseDepartmentFilter');
            if (deptSelect) {
              deptSelect.innerHTML = "<option value=\"\">All Departments</option>" + departments.map(function (d) {
                return "<option value=\"".concat(d.id, "\">").concat(d.name, "</option>");
              }).join('');
            }
          case 3:
            if (!coursesRes.ok) {
              _context13.n = 5;
              break;
            }
            _context13.n = 4;
            return coursesRes.json();
          case 4:
            courses = _context13.v;
            courseSelect = document.getElementById('courseFilter');
            if (courseSelect) {
              courseSelect.innerHTML = "<option value=\"\">All Courses</option>" + courses.map(function (c) {
                return "<option value=\"".concat(c.id, "\">").concat(c.name, "</option>");
              }).join('');
            }
          case 5:
            return _context13.a(2);
        }
      }, _callee13);
    }));
    return _populateCourseFilters.apply(this, arguments);
  }
  function setupCourseFilters() {
    var searchInput = document.getElementById('courseSearch');
    var departmentFilter = document.getElementById('courseDepartmentFilter');
    var courseFilter = document.getElementById('courseFilter');
    var clearFiltersBtn = document.getElementById('clearCourseFilters');
    if (searchInput) {
      searchInput.addEventListener('input', renderCourses);
    }
    if (departmentFilter) {
      departmentFilter.addEventListener('change', renderCourses);
    }
    if (courseFilter) {
      courseFilter.addEventListener('change', renderCourses);
    }
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', function () {
        if (searchInput) searchInput.value = '';
        if (departmentFilter) departmentFilter.value = '';
        if (courseFilter) courseFilter.value = '';
        renderCourses();
      });
    }
  }

  // Department filters
  function populateDepartmentFilters() {
    return _populateDepartmentFilters.apply(this, arguments);
  }
  function _populateDepartmentFilters() {
    _populateDepartmentFilters = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
      var res, departments, select;
      return _regenerator().w(function (_context14) {
        while (1) switch (_context14.n) {
          case 0:
            _context14.n = 1;
            return fetch('/api/departments', {
              credentials: 'include'
            });
          case 1:
            res = _context14.v;
            if (res.ok) {
              _context14.n = 2;
              break;
            }
            return _context14.a(2);
          case 2:
            _context14.n = 3;
            return res.json();
          case 3:
            departments = _context14.v;
            select = document.getElementById('departmentFilter');
            if (select) {
              select.innerHTML = "<option value=\"\">All Departments</option>" + departments.map(function (d) {
                return "<option value=\"".concat(d.id, "\">").concat(d.name, "</option>");
              }).join('');
            }
          case 4:
            return _context14.a(2);
        }
      }, _callee14);
    }));
    return _populateDepartmentFilters.apply(this, arguments);
  }
  function setupDepartmentFilters() {
    var searchInput = document.getElementById('departmentSearch');
    var departmentFilter = document.getElementById('departmentFilter');
    var clearFiltersBtn = document.getElementById('clearDepartmentFilters');
    if (searchInput) {
      searchInput.addEventListener('input', renderDepartments);
    }
    if (departmentFilter) {
      departmentFilter.addEventListener('change', renderDepartments);
    }
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', function () {
        if (searchInput) searchInput.value = '';
        if (departmentFilter) departmentFilter.value = '';
        renderDepartments();
      });
    }
  }

  // Academic filters
  function populateAcademicFilters() {
    return _populateAcademicFilters.apply(this, arguments);
  }
  function _populateAcademicFilters() {
    _populateAcademicFilters = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
      var res, academicYears, select;
      return _regenerator().w(function (_context15) {
        while (1) switch (_context15.n) {
          case 0:
            _context15.n = 1;
            return fetch('/api/academic-years', {
              credentials: 'include'
            });
          case 1:
            res = _context15.v;
            if (res.ok) {
              _context15.n = 2;
              break;
            }
            return _context15.a(2);
          case 2:
            _context15.n = 3;
            return res.json();
          case 3:
            academicYears = _context15.v;
            select = document.getElementById('academicYearFilter');
            if (select) {
              select.innerHTML = "<option value=\"\">All Academic Years</option>" + academicYears.map(function (a) {
                return "<option value=\"".concat(a.id, "\">").concat(a.year || a.academic_year, "</option>");
              }).join('');
            }
          case 4:
            return _context15.a(2);
        }
      }, _callee15);
    }));
    return _populateAcademicFilters.apply(this, arguments);
  }
  function setupAcademicFilters() {
    var searchInput = document.getElementById('academicSearch');
    var academicYearFilter = document.getElementById('academicYearFilter');
    var statusFilter = document.getElementById('statusFilter');
    var clearFiltersBtn = document.getElementById('clearAcademicFilters');
    if (searchInput) {
      searchInput.addEventListener('input', renderAcademicYears);
    }
    if (academicYearFilter) {
      academicYearFilter.addEventListener('change', renderAcademicYears);
    }
    if (statusFilter) {
      statusFilter.addEventListener('change', renderAcademicYears);
    }
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', function () {
        if (searchInput) searchInput.value = '';
        if (academicYearFilter) academicYearFilter.value = '';
        if (statusFilter) statusFilter.value = '';
        renderAcademicYears();
      });
    }
  }

  // Archive filters
  function populateArchiveFilters() {
    return _populateArchiveFilters.apply(this, arguments);
  }
  function _populateArchiveFilters() {
    _populateArchiveFilters = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
      var _yield$Promise$all3, _yield$Promise$all4, coursesRes, departmentsRes, academicRes, courses, courseSelect, departments, deptSelect, academicYears, academicSelect;
      return _regenerator().w(function (_context16) {
        while (1) switch (_context16.n) {
          case 0:
            _context16.n = 1;
            return Promise.all([fetch('/api/courses', {
              credentials: 'include'
            }), fetch('/api/departments', {
              credentials: 'include'
            }), fetch('/api/academic-years', {
              credentials: 'include'
            })]);
          case 1:
            _yield$Promise$all3 = _context16.v;
            _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 3);
            coursesRes = _yield$Promise$all4[0];
            departmentsRes = _yield$Promise$all4[1];
            academicRes = _yield$Promise$all4[2];
            if (!coursesRes.ok) {
              _context16.n = 3;
              break;
            }
            _context16.n = 2;
            return coursesRes.json();
          case 2:
            courses = _context16.v;
            courseSelect = document.getElementById('archiveCourseFilter');
            if (courseSelect) {
              courseSelect.innerHTML = "<option value=\"\">All Courses</option>" + courses.map(function (c) {
                return "<option value=\"".concat(c.id, "\">").concat(c.name, "</option>");
              }).join('');
            }
          case 3:
            if (!departmentsRes.ok) {
              _context16.n = 5;
              break;
            }
            _context16.n = 4;
            return departmentsRes.json();
          case 4:
            departments = _context16.v;
            deptSelect = document.getElementById('archiveDepartmentFilter');
            if (deptSelect) {
              deptSelect.innerHTML = "<option value=\"\">All Departments</option>" + departments.map(function (d) {
                return "<option value=\"".concat(d.id, "\">").concat(d.name, "</option>");
              }).join('');
            }
          case 5:
            if (!academicRes.ok) {
              _context16.n = 7;
              break;
            }
            _context16.n = 6;
            return academicRes.json();
          case 6:
            academicYears = _context16.v;
            academicSelect = document.getElementById('archiveAcademicYearFilter');
            if (academicSelect) {
              academicSelect.innerHTML = "<option value=\"\">All Academic Years</option>" + academicYears.map(function (a) {
                return "<option value=\"".concat(a.id, "\">").concat(a.year || a.academic_year, "</option>");
              }).join('');
            }
          case 7:
            return _context16.a(2);
        }
      }, _callee16);
    }));
    return _populateArchiveFilters.apply(this, arguments);
  }
  function setupArchiveFilters() {
    var searchInput = document.getElementById('archiveSearch');
    var courseFilter = document.getElementById('archiveCourseFilter');
    var departmentFilter = document.getElementById('archiveDepartmentFilter');
    var academicYearFilter = document.getElementById('archiveAcademicYearFilter');
    var clearFiltersBtn = document.getElementById('clearArchiveFilters');
    if (searchInput) {
      searchInput.addEventListener('input', renderArchives);
    }
    if (courseFilter) {
      courseFilter.addEventListener('change', renderArchives);
    }
    if (departmentFilter) {
      departmentFilter.addEventListener('change', renderArchives);
    }
    if (academicYearFilter) {
      academicYearFilter.addEventListener('change', renderArchives);
    }
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', function () {
        if (searchInput) searchInput.value = '';
        if (courseFilter) courseFilter.value = '';
        if (departmentFilter) departmentFilter.value = '';
        if (academicYearFilter) academicYearFilter.value = '';
        renderArchives();
      });
    }
  }

  /* ---------------- initialize ---------------- */
  showTab("courses");

  // Add Course button in sidebar
  document.getElementById("addCourseBtn").addEventListener("click", function () {
    showTab("courses");
  });

  // sidebar navigation (keeps consistent with Dashboard behavior)
  document.querySelectorAll('.sidebar-menu a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var page = this.getAttribute('data-page');
      if (page === 'settings') return;
      if (page === 'students') window.dispatchEvent(new CustomEvent('navigate', {
        detail: {
          page: 'students'
        }
      }));
      if (page === 'faculty') window.dispatchEvent(new CustomEvent('navigate', {
        detail: {
          page: 'faculty'
        }
      }));
      if (page === 'report') window.dispatchEvent(new CustomEvent('navigate', {
        detail: {
          page: 'report'
        }
      }));
      if (page === 'overview') window.location.reload();
    });
  });
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!*********************************************!*\
  !*** ./resources/js/components/Register.js ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadRegister: () => (/* binding */ loadRegister)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Dashboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dashboard */ "./resources/js/components/Dashboard.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }


function loadRegister(app, goLogin) {
  app.innerHTML = "\n    <div class=\"register-container\">\n      <div class=\"register-left\">\n        <header class=\"register-header\">\n          <img src=\"/images/logo.png\" alt=\"EDUTrack logo\" class=\"register-logo\" />\n          <h1 class=\"register-system-name\">EDUTrack Students and Faculty Management System</h1>\n        </header>\n\n        <div class=\"register-card\">\n          <h2 class=\"register-title\">Sign up now</h2>\n\n          <form id=\"registerForm\" class=\"register-form\">\n            <div class=\"form-group\">\n              <input type=\"text\" id=\"name\" placeholder=\"Name\" required />\n            </div>\n            \n            <div class=\"form-group\">\n              <input type=\"email\" id=\"email\" placeholder=\"Email\" required />\n            </div>\n            \n            <div class=\"form-group password-group\">\n              <input type=\"password\" id=\"password\" placeholder=\"Password\" required />\n              <button type=\"button\" class=\"password-toggle\" id=\"passwordToggle\">\n                <svg class=\"eye-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                  <path d=\"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\"></path>\n                  <circle cx=\"12\" cy=\"12\" r=\"3\"></circle>\n                </svg>\n              </button>\n            </div>\n            \n            <div class=\"form-group\">\n              <input type=\"password\" id=\"password_confirmation\" placeholder=\"Confirm Password\" required />\n            </div>\n\n            <div class=\"checkbox-group\">\n              <label class=\"register-checkbox\">\n                <input type=\"checkbox\" id=\"is_admin\" />\n                <span class=\"checkmark\"></span>\n                Register as Admin\n              </label>\n            </div>\n\n            <button type=\"submit\" class=\"register-btn\">Register</button>\n          </form>\n\n          <p class=\"register-switch\">\n            Already have an account? <a href=\"#\" id=\"goLogin\">Log In</a>\n          </p>\n\n          <p class=\"register-terms\">\n            By Creating an Account, it means you agree to our\n            <a href=\"#\">Privacy Policy</a> and\n            <a href=\"#\">Terms of Service</a>\n          </p>\n        </div>\n      </div>\n\n      <div class=\"register-right\">\n        <div class=\"gradient-shapes\">\n          <div class=\"shape shape-1\"></div>\n          <div class=\"shape shape-2\"></div>\n          <div class=\"shape shape-3\"></div>\n        </div>\n      </div>\n    </div>\n  ";

  // Event listeners
  document.getElementById("registerForm").addEventListener("submit", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
      var name, email, password, password_confirmation, is_admin, response, _err$response, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            e.preventDefault();
            name = document.getElementById("name").value;
            email = document.getElementById("email").value;
            password = document.getElementById("password").value;
            password_confirmation = document.getElementById("password_confirmation").value;
            is_admin = document.getElementById("is_admin").checked;
            _context.p = 1;
            _context.n = 2;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().post("/api/register", {
              name: name,
              email: email,
              password: password,
              password_confirmation: password_confirmation,
              is_admin: is_admin
            });
          case 2:
            response = _context.v;
            localStorage.setItem("token", response.data.token);
            (axios__WEBPACK_IMPORTED_MODULE_0___default().defaults).headers.common["Authorization"] = "Bearer ".concat(localStorage.getItem("token"));
            alert("Registration successful! Please log in.");
            goLogin(app, loadRegister);
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            alert("Error: " + (((_err$response = _t.response) === null || _err$response === void 0 || (_err$response = _err$response.data) === null || _err$response === void 0 ? void 0 : _err$response.message) || "Registration failed"));
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[1, 3]]);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  document.getElementById("goLogin").addEventListener("click", function (e) {
    e.preventDefault();
    goLogin(app, loadRegister);
  });

  // Password toggle functionality
  document.getElementById("passwordToggle").addEventListener("click", function (e) {
    e.preventDefault();
    var passwordInput = document.getElementById("password");
    var toggleBtn = document.getElementById("passwordToggle");
    var eyeIcon = toggleBtn.querySelector('.eye-icon');
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.innerHTML = "\n        <path d=\"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24\"></path>\n        <line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>\n      ";
    } else {
      passwordInput.type = "password";
      eyeIcon.innerHTML = "\n        <path d=\"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\"></path>\n        <circle cx=\"12\" cy=\"12\" r=\"3\"></circle>\n      ";
    }
  });
}
})();

/******/ })()
;