const St = async (t) => {
  const e = ({
    subcommand: a,
    expectedReport: f,
    timeoutErrorMessage: w = "timeout."
  }) => (y) => new Promise((b, L) => {
    const G = setTimeout(() => {
      y.removeEventListener("inputreport", D), L(new Error(w));
    }, 5e3), D = (x) => {
      const S = x;
      if (S.reportId !== 33)
        return;
      const A = new Uint8Array(S.data.buffer);
      for (const [q, R] of Object.entries(f))
        if (A[Number(q) - 1] !== R)
          return;
      y.removeEventListener("inputreport", D), clearTimeout(G), setTimeout(b, 50);
    };
    y.addEventListener("inputreport", D), (async () => await y.sendReport(
      1,
      new Uint8Array([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        ...a
      ])
    ))();
  }), n = e({
    subcommand: [3, 48],
    expectedReport: {
      14: 3
    }
  }), o = e({
    subcommand: [34, 1],
    expectedReport: {
      13: 128,
      14: 34
    }
  }), r = e({
    subcommand: [
      33,
      33,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      243
    ],
    expectedReport: {
      14: 33
    }
  }), d = e({
    subcommand: [89],
    expectedReport: {
      14: 89,
      // The MCU reports 0x00 here when a Ring-Con is attached and 0xFE
      // when no external Ring-Con is present.
      15: 0,
      16: 32
    },
    timeoutErrorMessage: "ring-con not found."
  }), i = e({
    // Ring-Con firmware requires the MaybeRingcon IMU mode before the
    // external-device format and polling commands take effect.
    subcommand: [64, 3],
    expectedReport: {
      14: 64
    }
  }), u = e({
    subcommand: [
      92,
      6,
      3,
      37,
      6,
      0,
      0,
      0,
      0,
      28,
      22,
      237,
      52,
      54,
      0,
      0,
      0,
      10,
      100,
      11,
      230,
      169,
      34,
      0,
      0,
      4,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      144,
      168,
      225,
      52,
      54
    ],
    expectedReport: {
      14: 92
    }
  }), l = e({
    subcommand: [90, 4, 1, 1, 2],
    expectedReport: {
      14: 90
    }
  });
  await n(t), await o(t), await r(t), await d(t), await i(t), await u(t), await l(t);
};
function Et(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var pt, gt;
function xt() {
  return gt || (gt = 1, pt = function(e, n) {
    n = n || {};
    const o = n.kp || 1, r = n.ki || 0;
    let i = 1 / (1e3 / e), u = n.doInitialisation !== !0, l = 2 * o;
    const a = 2 * r;
    let f = 1, w = 0, y = 0, b = 0, L = 0, G = 0, D = 0;
    function x(s, c, h, C, p, g) {
      let m, v, M, N, k, O, B;
      C !== 0 && p !== 0 && g !== 0 && (m = (C * C + p * p + g * g) ** -0.5, C *= m, p *= m, g *= m, v = w * b - f * y, M = f * w + y * b, N = f * f - 0.5 + b * b, k = p * N - g * M, O = g * v - C * N, B = C * M - p * v, a > 0 ? (L += a * k * i, G += a * O * i, D += a * B * i, s += L, c += G, h += D) : (L = 0, G = 0, D = 0), s += l * k, c += l * O, h += l * B), s *= 0.5 * i, c *= 0.5 * i, h *= 0.5 * i;
      const F = f, U = w, P = y;
      f += -U * s - P * c - b * h, w += F * s + P * h - b * c, y += F * c - U * h + b * s, b += F * h + U * c - P * s, m = (f * f + w * w + y * y + b * b) ** -0.5, f *= m, w *= m, y *= m, b *= m;
    }
    function S(s, c, h, C, p, g) {
      return {
        x: c * g - h * p,
        y: h * C - s * g,
        z: s * p - c * C
      };
    }
    function A(s, c, h, C, p, g) {
      const m = -Math.atan2(s, Math.sqrt(c * c + h * h)), v = S(s, c, h, 1, 0, 0), M = S(1, 0, 0, v.x, v.y, v.z), N = Math.atan2(M.y, M.z), k = Math.cos(N), O = Math.sin(m), B = Math.sin(N), F = p * k - g * B, U = C * Math.cos(m) + p * B * O + g * k * O;
      return {
        heading: -Math.atan2(F, U),
        pitch: m,
        roll: N
      };
    }
    function q(s) {
      const c = Math.cos(s.heading * 0.5), h = Math.sin(s.heading * 0.5), C = Math.cos(s.pitch * 0.5), p = Math.sin(s.pitch * 0.5), g = Math.cos(s.roll * 0.5), m = Math.sin(s.roll * 0.5);
      return {
        w: g * C * c + m * p * h,
        x: m * C * c - g * p * h,
        y: g * p * c + m * C * h,
        z: g * C * h - m * p * c
      };
    }
    function R(s, c, h, C, p, g) {
      const m = A(s, c, h, C, p, g), v = q(m), M = (v.w * v.w + v.x * v.x + v.y * v.y + v.z * v.z) ** -0.5;
      f = v.w * M, w = v.x * M, y = v.y * M, b = v.z * M, u = !0;
    }
    function E(s, c, h, C, p, g, m, v, M, N) {
      i = N || i, u || R(C, p, g, m, v, M);
      let k, O, B, F, U, P, K, J, T, I, _, W, at, st, X, Y, lt, Z, z, rt, $, V, tt, Q;
      if (m === void 0 || v === void 0 || M === void 0 || m === 0 && v === 0 && M === 0) {
        x(s, c, h, C, p, g);
        return;
      }
      C !== 0 && p !== 0 && g !== 0 && (k = (C * C + p * p + g * g) ** -0.5, C *= k, p *= k, g *= k, k = (m * m + v * v + M * M) ** -0.5, m *= k, v *= k, M *= k, O = f * f, B = f * w, F = f * y, U = f * b, P = w * w, K = w * y, J = w * b, T = y * y, I = y * b, _ = b * b, W = 2 * (m * (0.5 - T - _) + v * (K - U) + M * (J + F)), at = 2 * (m * (K + U) + v * (0.5 - P - _) + M * (I - B)), st = Math.sqrt(W * W + at * at), X = 2 * (m * (J - F) + v * (I + B) + M * (0.5 - P - T)), Y = J - F, lt = B + I, Z = O - 0.5 + _, z = st * (0.5 - T - _) + X * (J - F), rt = st * (K - U) + X * (B + I), $ = st * (F + J) + X * (0.5 - P - T), V = p * Z - g * lt + (v * $ - M * rt), tt = g * Y - C * Z + (M * z - m * $), Q = C * lt - p * Y + (m * rt - v * z), a > 0 ? (L += a * V * i, G += a * tt * i, D += a * Q * i, s += L, c += G, h += D) : (L = 0, G = 0, D = 0), s += l * V, c += l * tt, h += l * Q), s *= 0.5 * i, c *= 0.5 * i, h *= 0.5 * i;
      const et = f, j = w, H = y;
      f += -j * s - H * c - b * h, w += et * s + H * h - b * c, y += et * c - j * h + b * s, b += et * h + j * c - H * s, k = (f * f + w * w + y * y + b * b) ** -0.5, f *= k, w *= k, y *= k, b *= k;
    }
    return {
      update: E,
      init: R,
      getQuaternion() {
        return {
          w: f,
          x: w,
          y,
          z: b
        };
      }
    };
  }), pt;
}
var ft, wt;
function At() {
  return wt || (wt = 1, ft = function(e, n) {
    n = n || {};
    const o = 1e3 / e;
    let r = n.beta || 0.4, d = n.doInitialisation !== !0, i = 1, u = 0, l = 0, a = 0, f = 1 / o;
    function w(x, S, A, q, R, E) {
      let s, c, h, C, p, g, m, v, M, N, k, O, B, F, U, P, K, J, T, I, _, W;
      g = 0.5 * (-u * x - l * S - a * A), m = 0.5 * (i * x + l * A - a * S), v = 0.5 * (i * S - u * A + a * x), M = 0.5 * (i * A + u * S - l * x), q === 0 && R === 0 && E === 0 || (s = (q * q + R * R + E * E) ** -0.5, q *= s, R *= s, E *= s, N = 2 * i, k = 2 * u, O = 2 * l, B = 2 * a, F = 4 * i, U = 4 * u, P = 4 * l, K = 8 * u, J = 8 * l, T = i * i, I = u * u, _ = l * l, W = a * a, c = F * _ + O * q + F * I - k * R, h = U * W - B * q + 4 * T * u - N * R - U + K * I + K * _ + U * E, C = 4 * T * l + N * q + P * W - B * R - P + J * I + J * _ + P * E, p = 4 * I * a - k * q + 4 * _ * a - O * R, s = (c * c + h * h + C * C + p * p) ** -0.5, c *= s, h *= s, C *= s, p *= s, g -= r * c, m -= r * h, v -= r * C, M -= r * p), i += g * f, u += m * f, l += v * f, a += M * f, s = (i * i + u * u + l * l + a * a) ** -0.5, i *= s, u *= s, l *= s, a *= s;
    }
    function y(x, S, A, q, R, E) {
      return {
        x: S * E - A * R,
        y: A * q - x * E,
        z: x * R - S * q
      };
    }
    function b(x, S, A, q, R, E) {
      const s = -Math.atan2(x, Math.sqrt(S * S + A * A)), c = y(x, S, A, 1, 0, 0), h = y(1, 0, 0, c.x, c.y, c.z), C = Math.atan2(h.y, h.z), p = Math.cos(C), g = Math.sin(s), m = Math.sin(C), v = R * p - E * m, M = q * Math.cos(s) + R * m * g + E * p * g;
      return {
        heading: -Math.atan2(v, M),
        pitch: s,
        roll: C
      };
    }
    function L(x) {
      const S = Math.cos(x.heading * 0.5), A = Math.sin(x.heading * 0.5), q = Math.cos(x.pitch * 0.5), R = Math.sin(x.pitch * 0.5), E = Math.cos(x.roll * 0.5), s = Math.sin(x.roll * 0.5);
      return {
        w: E * q * S + s * R * A,
        x: s * q * S - E * R * A,
        y: E * R * S + s * q * A,
        z: E * q * A - s * R * S
      };
    }
    function G(x, S, A, q, R, E) {
      const s = b(x, S, A, q, R, E), c = L(s), h = (c.w * c.w + c.x * c.x + c.y * c.y + c.z * c.z) ** -0.5;
      i = c.w * h, u = c.x * h, l = c.y * h, a = c.z * h, d = !0;
    }
    function D(x, S, A, q, R, E, s, c, h, C) {
      f = C || f, d || G(q, R, E, s, c, h);
      let p, g, m, v, M, N, k, O, B, F, U, P, K, J, T, I, _, W, at, st, X, Y, lt, Z, z, rt, $, V, tt, Q, et, j, H, dt, ct;
      if (s === void 0 || c === void 0 || h === void 0 || s === 0 && c === 0 && h === 0) {
        w(x, S, A, q, R, E);
        return;
      }
      N = 0.5 * (-u * x - l * S - a * A), k = 0.5 * (i * x + l * A - a * S), O = 0.5 * (i * S - u * A + a * x), B = 0.5 * (i * A + u * S - l * x), q === 0 && R === 0 && E === 0 || (p = (q * q + R * R + E * E) ** -0.5, q *= p, R *= p, E *= p, p = (s * s + c * c + h * h) ** -0.5, s *= p, c *= p, h *= p, P = 2 * i * s, K = 2 * i * c, J = 2 * i * h, T = 2 * u * s, st = 2 * i, X = 2 * u, Y = 2 * l, lt = 2 * a, Z = 2 * i * l, z = 2 * l * a, rt = i * i, $ = i * u, V = i * l, tt = i * a, Q = u * u, et = u * l, j = u * a, H = l * l, dt = l * a, ct = a * a, F = s * rt - K * a + J * l + s * Q + X * c * l + X * h * a - s * H - s * ct, U = P * a + c * rt - J * u + T * l - c * Q + c * H + Y * h * a - c * ct, I = Math.sqrt(F * F + U * U), _ = -P * l + K * u + h * rt + T * a - h * Q + Y * c * a - h * H + h * ct, W = 2 * I, at = 2 * _, g = -Y * (2 * j - Z - q) + X * (2 * $ + z - R) - _ * l * (I * (0.5 - H - ct) + _ * (j - V) - s) + (-I * a + _ * u) * (I * (et - tt) + _ * ($ + dt) - c) + I * l * (I * (V + j) + _ * (0.5 - Q - H) - h), m = lt * (2 * j - Z - q) + st * (2 * $ + z - R) - 4 * u * (1 - 2 * Q - 2 * H - E) + _ * a * (I * (0.5 - H - ct) + _ * (j - V) - s) + (I * l + _ * i) * (I * (et - tt) + _ * ($ + dt) - c) + (I * a - at * u) * (I * (V + j) + _ * (0.5 - Q - H) - h), v = -st * (2 * j - Z - q) + lt * (2 * $ + z - R) - 4 * l * (1 - 2 * Q - 2 * H - E) + (-W * l - _ * i) * (I * (0.5 - H - ct) + _ * (j - V) - s) + (I * u + _ * a) * (I * (et - tt) + _ * ($ + dt) - c) + (I * i - at * l) * (I * (V + j) + _ * (0.5 - Q - H) - h), M = X * (2 * j - Z - q) + Y * (2 * $ + z - R) + (-W * a + _ * u) * (I * (0.5 - H - ct) + _ * (j - V) - s) + (-I * i + _ * l) * (I * (et - tt) + _ * ($ + dt) - c) + I * u * (I * (V + j) + _ * (0.5 - Q - H) - h), p = (g * g + m * m + v * v + M * M) ** -0.5, g *= p, m *= p, v *= p, M *= p, N -= r * g, k -= r * m, O -= r * v, B -= r * M), i += N * f, u += k * f, l += O * f, a += B * f, p = (i * i + u * u + l * l + a * a) ** -0.5, i *= p, u *= p, l *= p, a *= p;
    }
    return {
      update: D,
      init: G,
      getQuaternion() {
        return {
          w: i,
          x: u,
          y: l,
          z: a
        };
      }
    };
  }), ft;
}
var mt, Rt;
function kt() {
  if (Rt) return mt;
  Rt = 1;
  const t = 180 / Math.PI;
  function e(n) {
    n = n || {};
    const o = n.sampleInterval || 20, r = n.algorithm || "Madgwick";
    let d;
    if (r === "Mahony")
      d = xt();
    else if (r === "Madgwick")
      d = At();
    else
      throw new Error(`AHRS(): Algorithm not valid: ${r}`);
    const i = d(o, n), u = this;
    Object.keys(i).forEach((l) => u[l] = i[l]);
  }
  return e.prototype.toVector = function() {
    const o = this.getQuaternion(), r = 2 * Math.acos(o.w), d = Math.sin(r / 2);
    return {
      angle: r,
      x: o.x / d,
      y: o.y / d,
      z: o.z / d
    };
  }, e.prototype.getEulerAngles = function() {
    const o = this.getQuaternion(), r = o.w * o.w, d = o.x * o.x, i = o.y * o.y, u = o.z * o.z;
    return {
      heading: Math.atan2(2 * (o.x * o.y + o.z * o.w), d - i - u + r),
      pitch: -Math.asin(2 * (o.x * o.z - o.y * o.w)),
      roll: Math.atan2(2 * (o.y * o.z + o.x * o.w), -d - i + u + r)
    };
  }, e.prototype.getEulerAnglesDegrees = function() {
    const o = this.getEulerAngles();
    return {
      heading: o.heading * t,
      pitch: o.pitch * t,
      roll: o.roll * t
    };
  }, mt = e, mt;
}
var Bt = kt();
const Ct = /* @__PURE__ */ Et(Bt);
function Ft(t, e) {
  let n;
  for (const o of t) {
    const r = e(o);
    r !== void 0 && (n = n === void 0 ? r : n + r);
  }
  return n;
}
function ut(t, e = (n) => n) {
  const n = t == null ? 0 : t.length, o = Ft(t, e);
  return n ? o / n : Number.NaN;
}
function Lt(t) {
  let e;
  switch (t[0]) {
    case "8":
      e = "full";
      break;
    case "4":
      e = "medium";
      break;
    case "2":
      e = "low";
      break;
    case "1":
      e = "critical";
      break;
    case "0":
      e = "empty";
      break;
    default:
      e = "charging";
  }
  return e;
}
const Gt = {
  // biome-ignore lint/complexity/useSimpleNumberKeys:
  1: "Left Joy-Con",
  // biome-ignore lint/complexity/useSimpleNumberKeys:
  2: "Right Joy-Con",
  // biome-ignore lint/complexity/useSimpleNumberKeys:
  3: "Pro Controller"
}, ht = 0.75, Ut = 0.0125, qt = Math.PI / 2;
function Dt(t, e, n, o) {
  const r = Date.now(), d = t.timestamp ? (r - t.timestamp) / 1e3 : 0;
  t.timestamp = r;
  const i = Math.sqrt(
    n.x ** 2 + n.y ** 2 + n.z ** 2
  );
  return t.alpha = (1 - Ut) * (t.alpha + e.z * d), i !== 0 && (t.beta = ht * (t.beta + e.x * d) + (1 - ht) * (n.x * qt / i), t.gamma = ht * (t.gamma + e.y * d) + (1 - ht) * (n.y * -qt / i)), {
    alpha: o === 8198 ? (-1 * (t.alpha * 180) / Math.PI * 430 % 90).toFixed(6) : (t.alpha * 180 / Math.PI * 430 % 360).toFixed(6),
    beta: (-1 * (t.beta * 180) / Math.PI).toFixed(6),
    gamma: o === 8198 ? (-1 * (t.gamma * 180) / Math.PI).toFixed(6) : (t.gamma * 180 / Math.PI).toFixed(6)
  };
}
function Nt(t) {
  const e = 180 / Math.PI, n = t.w * t.w, o = t.x * t.x, r = t.y * t.y, d = t.z * t.z;
  return {
    alpha: (e * Math.atan2(2 * (t.x * t.y + t.z * t.w), o - r - d + n)).toFixed(6),
    beta: (e * -Math.asin(2 * (t.x * t.z - t.y * t.w))).toFixed(6),
    gamma: (e * Math.atan2(2 * (t.y * t.z + t.x * t.w), -o - r + d + n)).toFixed(6)
  };
}
function nt(t) {
  const e = new DataView(t.buffer);
  return Number.parseFloat((244e-6 * e.getInt16(0, !0)).toFixed(6));
}
function ot(t) {
  const e = new DataView(t.buffer);
  return Number.parseFloat((0.06103 * e.getInt16(0, !0)).toFixed(6));
}
function it(t) {
  const e = new DataView(t.buffer);
  return Number.parseFloat((1694e-7 * e.getInt16(0, !0)).toFixed(6));
}
function Pt(t) {
  const e = t.slice(15, 26), n = e.slice(0, 1)[0], o = e.slice(1, 2)[0], r = e.slice(2, 3), d = e.slice(4, 10), i = [];
  for (const a of d)
    i.push(a.toString(16));
  const u = e.slice(11, 12);
  return {
    _raw: e.slice(0, 12),
    _hex: e.slice(0, 12),
    firmwareVersion: {
      major: n,
      minor: o
    },
    type: Gt[r[0]],
    macAddress: i.join(":"),
    spiColorInUse: u[0] === 1
  };
}
function Ht(t, e) {
  return {
    _raw: t.slice(0, 1),
    // index 0
    _hex: e.slice(0, 1)
  };
}
function Ot(t, e) {
  return {
    _raw: t.slice(1, 2),
    // index 1
    _hex: e.slice(1, 2)
  };
}
function jt(t, e) {
  return {
    _raw: t.slice(2, 3),
    // high nibble
    _hex: e.slice(2, 3),
    level: Lt(e.slice(2, 3))
  };
}
function Jt(t, e) {
  return {
    _raw: t.slice(2, 3),
    // low nibble
    _hex: e.slice(2, 3)
  };
}
function Qt(t, e) {
  return {
    _raw: t.slice(1, 3),
    // index 1,2
    _hex: e.slice(1, 3)
  };
}
function Tt(t, e) {
  return {
    _raw: t.slice(3, 6),
    // index 3,4,5
    _hex: e.slice(3, 6),
    // Byte 3 (Right Joy-Con)
    y: !!(1 & t[3]),
    x: !!(2 & t[3]),
    b: !!(4 & t[3]),
    a: !!(8 & t[3]),
    r: !!(64 & t[3]),
    zr: !!(128 & t[3]),
    // Byte 5 (Left Joy-Con)
    down: !!(1 & t[5]),
    up: !!(2 & t[5]),
    right: !!(4 & t[5]),
    left: !!(8 & t[5]),
    l: !!(64 & t[5]),
    zl: !!(128 & t[5]),
    // Byte 3,5 (Shared)
    sr: !!(16 & t[3]) || !!(16 & t[5]),
    sl: !!(32 & t[3]) || !!(32 & t[5]),
    // Byte 4 (Shared)
    minus: !!(1 & t[4]),
    plus: !!(2 & t[4]),
    rightStick: !!(4 & t[4]),
    leftStick: !!(8 & t[4]),
    home: !!(16 & t[4]),
    capture: !!(32 & t[4]),
    chargingGrip: !!(128 & t[4])
  };
}
function $t(t, e) {
  return {
    _raw: t.slice(3, 4),
    // index 3
    _hex: e.slice(3, 4)
  };
}
function Vt(t, e) {
  let n = t[6] | (t[7] & 15) << 8;
  n = (n / 1995 - 1) * 2;
  let o = (t[7] >> 4 | t[8] << 4) * -1;
  return o = (o / 2220 + 1) * 2, {
    _raw: t.slice(6, 9),
    // index 6,7,8
    _hex: e.slice(6, 9),
    horizontal: n.toFixed(1),
    vertical: o.toFixed(1)
  };
}
function Kt(t, e) {
  let n = t[9] | (t[10] & 15) << 8;
  n = (n / 1995 - 1) * 2;
  let o = (t[10] >> 4 | t[11] << 4) * -1;
  return o = (o / 2220 + 1) * 2, {
    _raw: t.slice(9, 12),
    // index 9,10,11
    _hex: e.slice(9, 12),
    horizontal: n.toFixed(1),
    vertical: o.toFixed(1)
  };
}
function Wt(t, e) {
  return {
    _raw: t.slice(4),
    // index 4
    _hex: e.slice(4)
  };
}
function Xt(t, e) {
  return {
    _raw: t.slice(12, 13),
    // index 12
    _hex: e.slice(12, 13)
  };
}
function Yt(t, e) {
  return {
    _raw: t.slice(13, 14),
    // index 13
    _hex: e.slice(13, 14)
  };
}
function Zt(t, e) {
  return {
    _raw: t.slice(14, 15),
    // index 14
    _hex: e.slice(14, 15)
  };
}
function zt(t, e) {
  return {
    _raw: t.slice(15),
    // index 15 ~
    _hex: e.slice(15)
  };
}
function te(t, e, n = !1) {
  const o = [
    {
      x: {
        _raw: t.slice(13, 15),
        // index 13,14
        _hex: e.slice(13, 15),
        acc: nt(t.slice(13, 15))
      },
      y: {
        _raw: t.slice(15, 17),
        // index 15,16
        _hex: e.slice(15, 17),
        acc: nt(t.slice(15, 17))
      },
      z: {
        _raw: t.slice(17, 19),
        // index 17,18
        _hex: e.slice(17, 19),
        acc: nt(t.slice(17, 19))
      }
    },
    {
      x: {
        _raw: t.slice(25, 27),
        // index 25,26
        _hex: e.slice(25, 27),
        acc: nt(t.slice(25, 27))
      },
      y: {
        _raw: t.slice(27, 29),
        // index 27,28
        _hex: e.slice(27, 29),
        acc: nt(t.slice(27, 29))
      },
      z: {
        _raw: t.slice(29, 31),
        // index 29,30
        _hex: e.slice(29, 31),
        acc: nt(t.slice(29, 31))
      }
    },
    {
      x: {
        _raw: t.slice(37, 39),
        // index 37,38
        _hex: e.slice(37, 39),
        acc: nt(t.slice(37, 39))
      },
      y: {
        _raw: t.slice(39, 41),
        // index 39,40
        _hex: e.slice(39, 41),
        acc: nt(t.slice(39, 41))
      },
      z: {
        _raw: t.slice(41, 43),
        // index 41,42
        _hex: e.slice(41, 43),
        acc: nt(t.slice(41, 43))
      }
    }
  ];
  return n ? o.slice(0, 1) : o;
}
function ee(t, e, n = !1) {
  const o = [
    [
      {
        _raw: t.slice(19, 21),
        // index 19,20
        _hex: e.slice(19, 21),
        dps: ot(t.slice(19, 21)),
        rps: it(t.slice(19, 21))
      },
      {
        _raw: t.slice(21, 23),
        // index 21,22
        _hex: e.slice(21, 23),
        dps: ot(t.slice(21, 23)),
        rps: it(t.slice(21, 23))
      },
      {
        _raw: t.slice(23, 25),
        // index 23,24
        _hex: e.slice(23, 25),
        dps: ot(t.slice(23, 25)),
        rps: it(t.slice(23, 25))
      }
    ],
    [
      {
        _raw: t.slice(31, 33),
        // index 31,32
        _hex: e.slice(31, 33),
        dps: ot(t.slice(31, 33)),
        rps: it(t.slice(31, 33))
      },
      {
        _raw: t.slice(33, 35),
        // index 33,34
        _hex: e.slice(33, 35),
        dps: ot(t.slice(33, 35)),
        rps: it(t.slice(33, 35))
      },
      {
        _raw: t.slice(35, 37),
        // index 35,36
        _hex: e.slice(35, 37),
        dps: ot(t.slice(35, 37)),
        rps: it(t.slice(35, 37))
      }
    ],
    [
      {
        _raw: t.slice(43, 45),
        // index 43,44
        _hex: e.slice(43, 45),
        dps: ot(t.slice(43, 45)),
        rps: it(t.slice(43, 45))
      },
      {
        _raw: t.slice(45, 47),
        // index 45,46
        _hex: e.slice(45, 47),
        dps: ot(t.slice(45, 47)),
        rps: it(t.slice(45, 47))
      },
      {
        _raw: t.slice(47, 49),
        // index 47,48
        _hex: e.slice(47, 49),
        dps: ot(t.slice(47, 49)),
        rps: it(t.slice(47, 49))
      }
    ]
  ];
  return n ? o.slice(1, 2) : o;
}
function ne(t) {
  const e = 5e-3 * t.length;
  return {
    x: Number.parseFloat(
      (ut(t.map(([o]) => o)) * e).toFixed(6)
    ),
    y: Number.parseFloat(
      (ut(t.map(([, o]) => o)) * e).toFixed(6)
    ),
    z: Number.parseFloat(
      (ut(t.map(([, , o]) => o)) * e).toFixed(6)
    )
  };
}
function Mt(t) {
  const e = 5e-3 * t.length, n = [
    ut(t.map((o) => o[0])),
    ut(t.map((o) => o[1])),
    ut(t.map((o) => o[2]))
  ].map((o) => Number.parseFloat((o * e).toFixed(6)));
  return {
    x: n[0],
    y: n[1],
    z: n[2]
  };
}
function oe(t, e) {
  return {
    // rawData includes the report ID at index 0; Ring-Con bytes are
    // event.data[38..39], therefore fullData[39..40].
    _raw: t.slice(39, 41),
    _hex: e.slice(78, 82),
    strain: new DataView(t.buffer, 39, 2).getInt16(0, !0)
  };
}
function ie(t, e) {
  const n = new (Object.getPrototypeOf(t)).constructor(
    t.length + e.length
  );
  return n.set(t, 0), n.set(e, t.length), n;
}
class bt extends EventTarget {
  eventListenerAttached = !1;
  ringConEnabled = !1;
  quaternion;
  madgwick;
  device;
  lastValues;
  ledstate = 0;
  ringConGyroBiasDps = { x: 0, y: 0, z: 0 };
  ringConGyroBiasRps = { x: 0, y: 0, z: 0 };
  ringConGyroCalibrationSumDps = { x: 0, y: 0, z: 0 };
  ringConGyroCalibrationSumRps = { x: 0, y: 0, z: 0 };
  ringConGyroCalibrationSamples = 0;
  ringConGyroCalibrated = !1;
  ringConGyroCalibrationResolve = null;
  /**
   * Creates an instance of the JoyCon class.
   *
   * @param device - The HIDDevice instance representing the connected Joy-Con controller.
   *
   * Initializes the device and sets up the initial state for sensor values,
   * including timestamp, alpha, beta, and gamma.
   */
  constructor(e) {
    super(), this.device = e, this.lastValues = {
      timestamp: null,
      alpha: 0,
      beta: 0,
      gamma: 0
    }, (e.productId === 8198 || e.productId === 8199) && (this.madgwick = new Ct({ sampleInterval: 10, algorithm: "Madgwick" }), this.quaternion = this.madgwick.getQuaternion());
  }
  /**
   * Registers an event listener for a specific JoyCon event type.
   *
   * @typeParam K - The type of the JoyCon event to listen for, constrained to the keys of `JoyConEvents`.
   * @param type - The event type to listen for.
   * @param listener - The callback function that will be invoked when the event is dispatched.
   *                   The `this` context within the listener is bound to the current `JoyCon` instance,
   *                   and the event object is of the type corresponding to the event type.
   * @param options - Optional. An options object specifying characteristics about the event listener,
   *                  or a boolean indicating whether events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
   */
  on(e, n, o) {
    super.addEventListener(e, n, o);
  }
  /**
   * Opens a connection to the Joy-Con device if it is not already opened,
   * and attaches an event listener for input reports.
   *
   * @returns {Promise<void>} A promise that resolves when the device is opened and the event listener is attached.
   */
  async open() {
    this.device.opened || await this.device.open(), this.device.addEventListener("inputreport", this._onInputReport.bind(this));
  }
  /**
   * Sends a request to the Joy-Con device to retrieve device information.
   *
   * This method sends a specific output report to the device and listens for a
   * "deviceinfo" event. When the event is received, it resolves with the device
   * information, excluding any raw or hexadecimal data fields.
   *
   * @returns A promise that resolves with the cleaned device information object.
   */
  async getRequestDeviceInfo() {
    const o = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      ...[2]
    ], r = new Promise((d) => {
      const i = ({ detail: u }) => {
        const { _raw: l, _hex: a, ...f } = u;
        d(f);
      };
      this.addEventListener("deviceinfo", i, {
        once: !0
      });
    });
    return await this.device.sendReport(1, new Uint8Array(o)), r;
  }
  /**
   * Requests the current battery level from the Joy-Con device.
   *
   * Sends a specific output report to the device to query the battery level,
   * then listens for a "batterylevel" custom event. Once the event is received,
   * it resolves with the battery level information, excluding any raw or hex data.
   *
   * @returns {Promise<unknown>} A promise that resolves with the cleaned battery level data.
   */
  async getBatteryLevel() {
    const o = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      ...[80]
    ], r = new Promise((d) => {
      const i = ({ detail: u }) => {
        const { _raw: l, _hex: a, ...f } = u;
        d(f);
      };
      this.addEventListener("batterylevel", i, {
        once: !0
      });
    });
    return await this.device.sendReport(1, new Uint8Array(o)), r;
  }
  /**
   * Enables the Simple HID mode on the connected Joy-Con device.
   *
   * This method sends a specific output report to the device to switch it into
   * Simple HID mode, which allows for basic input/output communication.
   *
   * @returns {Promise<void>} A promise that resolves once the command has been sent.
   * @throws {DOMException} If the report cannot be sent to the device.
   */
  async enableSimpleHIDMode() {
    const o = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      ...[3, 63]
    ];
    await this.device.sendReport(1, new Uint8Array(o));
  }
  /**
   * Enables the "Standard Full Mode" on the Joy-Con device by sending the appropriate subcommand.
   *
   * This mode allows the Joy-Con to report all standard input data, including button presses,
   * analog stick positions, and sensor data. The method constructs the required data packet
   * and sends it to the device using the HID report protocol.
   *
   * @returns {Promise<void>} A promise that resolves once the command has been sent.
   * @throws {Error} If the device communication fails.
   */
  async enableStandardFullMode() {
    const o = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      ...[3, 48]
    ];
    await this.device.sendReport(1, new Uint8Array(o));
  }
  /**
   * Enables the IMU (Inertial Measurement Unit) mode on the Joy-Con device.
   *
   * Sends a subcommand to the device to activate the IMU, which allows the Joy-Con
   * to start reporting motion sensor data such as accelerometer and gyroscope readings.
   *
   * @returns A promise that resolves when the command has been sent to the device.
   * @throws Will throw an error if sending the report to the device fails.
   */
  async enableIMUMode() {
    const o = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      ...[64, 1]
    ];
    await this.device.sendReport(1, new Uint8Array(o));
  }
  /**
   * Disables the IMU (Inertial Measurement Unit) mode on the connected Joy-Con device.
   *
   * Sends a subcommand to the device to turn off IMU functionality, which includes
   * the accelerometer and gyroscope sensors. This can be useful for reducing power
   * consumption or when IMU data is not needed.
   *
   * @returns A promise that resolves when the command has been sent to the device.
   * @throws Will throw an error if sending the report to the device fails.
   */
  async disableIMUMode() {
    const o = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      ...[64, 0]
    ];
    await this.device.sendReport(1, new Uint8Array(o));
  }
  /**
   * Enables the vibration feature on the connected Joy-Con device.
   *
   * This method sends a specific output report to the device to activate vibration.
   * It constructs the required data packet, including the subcommand for enabling vibration,
   * and transmits it using the WebHID API.
   *
   * @returns A promise that resolves when the vibration command has been sent.
   * @throws {DOMException} If sending the report to the device fails.
   */
  async enableVibration() {
    const o = [
      0,
      0,
      1,
      64,
      64,
      0,
      1,
      64,
      64,
      ...[72, 1]
    ];
    await this.device.sendReport(1, new Uint8Array(o));
  }
  /**
   * Disables the vibration feature on the connected Joy-Con controller.
   *
   * Sends a specific output report to the device to turn off vibration.
   * This method constructs the appropriate data packet and sends it using the WebHID API.
   *
   * @returns A promise that resolves when the vibration disable command has been sent.
   */
  async disableVibration() {
    const o = [
      0,
      0,
      1,
      64,
      64,
      0,
      1,
      64,
      64,
      ...[72, 0]
    ];
    await this.device.sendReport(1, new Uint8Array(o));
  }
  /**
   * Enables RingCon.
   *
   * @memberof JoyCon
   * @seeAlso https://github.com/mascii/demo-of-ring-con-with-web-hid
   */
  async enableRingCon() {
    await St(this.device), this.ringConEnabled = !0, this.resetRingConMotionState();
  }
  /**
   * Recalibrates the Ring-Con external gyroscope while the controller is still.
   * The returned promise resolves after 60 input reports have been collected.
   */
  async calibrateRingCon() {
    if (!this.ringConEnabled)
      throw new Error("Ring-Con is not initialized. Connect it first.");
    this.resetRingConMotionState(), await new Promise((e) => {
      this.ringConGyroCalibrationResolve = e;
    });
  }
  /**
   * Ring-Con external IMU reports contain a large, device-specific gyro bias.
   * Reset the filter after initialization so the reports received while the
   * MCU is changing modes cannot poison the new Ring-Con orientation state.
   */
  resetRingConMotionState() {
    this.madgwick = new Ct({ sampleInterval: 10, algorithm: "Madgwick" }), this.quaternion = this.madgwick.getQuaternion(), this.lastValues = {
      timestamp: null,
      alpha: 0,
      beta: 0,
      gamma: 0
    }, this.ringConGyroBiasDps = { x: 0, y: 0, z: 0 }, this.ringConGyroBiasRps = { x: 0, y: 0, z: 0 }, this.ringConGyroCalibrationSumDps = { x: 0, y: 0, z: 0 }, this.ringConGyroCalibrationSumRps = { x: 0, y: 0, z: 0 }, this.ringConGyroCalibrationSamples = 0, this.ringConGyroCalibrated = !1;
  }
  /**
   * Removes the stationary Ring-Con gyro bias from the parsed external IMU.
   * The page initializes Ring-Con while it is resting on a stable surface, so
   * this avoids depending on Joy-Con SPI calibration being exposed by WebHID.
   */
  processRingConGyroCalibration(e) {
    const n = e[0];
    if (n) {
      if (!this.ringConGyroCalibrated) {
        n.forEach((o, r) => {
          const d = ["x", "y", "z"][r];
          this.ringConGyroCalibrationSumDps[d] += o.dps, this.ringConGyroCalibrationSumRps[d] += o.rps, o.dps = 0, o.rps = 0;
        }), this.ringConGyroCalibrationSamples += 1, this.ringConGyroCalibrationSamples >= 60 && (Object.keys(this.ringConGyroBiasDps).forEach(
          (o) => {
            this.ringConGyroBiasDps[o] = this.ringConGyroCalibrationSumDps[o] / this.ringConGyroCalibrationSamples, this.ringConGyroBiasRps[o] = this.ringConGyroCalibrationSumRps[o] / this.ringConGyroCalibrationSamples;
          }
        ), this.ringConGyroCalibrated = !0, this.ringConGyroCalibrationResolve?.(), this.ringConGyroCalibrationResolve = null);
        return;
      }
      n.forEach((o, r) => {
        const d = ["x", "y", "z"][r];
        o.dps -= this.ringConGyroBiasDps[d], o.rps -= this.ringConGyroBiasRps[d];
      });
    }
  }
  /**
   * Enables the USB HID joystick report mode for the connected device.
   *
   * This method checks if the device supports a specific output report (with reportId 0x80).
   * If supported, it sends a sequence of USB HID reports to the device to enable joystick reporting.
   * The sequence of reports is required to properly initialize the device for joystick input over USB.
   *
   * @returns {Promise<void>} A promise that resolves once the reports have been sent.
   */
  async enableUSBHIDJoystickReport() {
    this.device.collections[0].outputReports?.find(
      (n) => n.reportId === 128
    ) != null && (await this.device.sendReport(128, new Uint8Array([1])), await this.device.sendReport(128, new Uint8Array([2])), await this.device.sendReport(1, new Uint8Array([3])), await this.device.sendReport(128, new Uint8Array([4])));
  }
  /**
   * Sends a rumble (vibration) command to the Joy-Con device with the specified frequency and amplitude parameters.
   *
   * @param lowFrequency - The low frequency value for the rumble effect (in Hz). Must be between 40.875885 and 626.286133.
   * @param highFrequency - The high frequency value for the rumble effect (in Hz). Must be between 81.75177 and 1252.572266.
   * @param amplitude - The amplitude (strength) of the rumble effect. Must be between 0 (off) and 1 (maximum).
   * @returns A promise that resolves when the rumble command has been sent to the device.
   *
   * @remarks
   * This method encodes the frequency and amplitude values into the format expected by the Joy-Con hardware,
   * clamps the input values to their valid ranges, and sends the resulting data packet via HID.
   * The rumble effect is applied to both left and right motors of the Joy-Con.
   */
  async rumble(e, n, o) {
    const r = (b, L, G) => Math.min(Math.max(b, L), G), i = new Uint8Array(9);
    i[0] = 0;
    let u = r(e, 40.875885, 626.286133), l = r(n, 81.75177, 1252.572266);
    l = (Math.round(32 * Math.log2(l * 0.1)) - 96) * 4, u = Math.round(32 * Math.log2(u * 0.1)) - 64;
    const a = r(o, 0, 1);
    let f;
    a === 0 ? f = 0 : a < 0.117 ? f = (Math.log2(a * 1e3) * 32 - 96) / (5 - a ** 2) - 1 : a < 0.23 ? f = Math.log2(a * 1e3) * 32 - 96 - 92 : f = (Math.log2(a * 1e3) * 32 - 96) * 2 - 246;
    let w = Math.round(f) * 0.5;
    const y = w % 2;
    y > 0 && --w, w = w >> 1, w += 64, y > 0 && (w |= 32768), i[1] = l & 255, i[2] = f + (l >>> 8 & 255), i[3] = u + (w >>> 8 & 255), i[4] += w & 255;
    for (let b = 0; b < 4; b++)
      i[5 + b] = i[1 + b];
    await this.device.sendReport(16, new Uint8Array(i));
  }
  /**
   * Sets the blinking pattern for the Home LED on the Right Joy-Con device.
   *
   * Sends a subcommand to the device to control the Home LED.
   *
   * @param miniCycleDuration: Global mini cycle duration. 0-15. 0: off, 1: 8ms, ... , 15: 175ms
   * @param numCycles: Number of full cycles. 0-15. 0: repeat forever.
   * @param startIntensity: Initial LED intensity. 0-15.
   * @param cycleData: Array of {@link HomeLEDpatterns}. The maximum count of the array is 15.
   */
  /* Inspired by the JoyConSwift library */
  async setHomeLEDPattern(e, n, o, r) {
    const d = (L, G, D) => Math.min(Math.max(L, G), D), u = Math.min(r.length, 15), l = u << 4 | d(e, 0, 15), a = d(o, 0, 15) << 4 | d(n, 0, 15), f = [l, a], w = {
      intensity: 15,
      fadeDuration: 0,
      duration: 0
    }, y = r.slice(0, u).concat(Array(16 - u).fill(w));
    for (let L = 0; L < 8; L++) {
      const G = y[L * 2], D = y[L * 2 + 1], x = d(G.intensity, 0, 15), S = d(G.fadeDuration, 0, 15), A = d(G.duration, 0, 15), q = d(D.intensity, 0, 15), R = d(D.fadeDuration, 0, 15), E = d(D.duration, 0, 15);
      f.push(x << 4 | q), f.push(S << 4 | A), f.push(R << 4 | E);
    }
    f.pop();
    const b = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      56,
      ...f
    ];
    await this.device.sendReport(1, new Uint8Array(b));
  }
  /**
   * Turn `on` or `off` the Home LED on the Right Joy-Con device.
   *
   * @param {boolean} on - If true, the LED will be turned on permanently. Turn the LED off otherwise.
   *
   */
  async setHomeLED(e) {
    e === !0 ? await this.setHomeLEDPattern(1, 0, 15, []) : await this.setHomeLEDPattern(0, 1, 0, []);
  }
  /**
   * Sets the LED state on the Joy-Con device.
   *
   * Sends a subcommand to the device to control the LED indicators.
   *
   * @param n - The LED state value to set. The value determines which LEDs are turned on or off.
   * @returns A promise that resolves when the command has been sent to the device.
   */
  async setLEDState(e) {
    const n = [0, 0, 0, 0, 0, 0, 0, 0], o = [48, e];
    await this.device.sendReport(
      1,
      new Uint8Array([...n, 0, ...o])
    );
  }
  /**
   * Sets the specified LED on the Joy-Con controller.
   *
   * Updates the internal LED state by turning on the LED at the given index `n`,
   * then sends the updated state to the device.
   *
   * @param n - The index of the LED to turn on (0-based).
   * @returns A promise that resolves when the LED state has been updated.
   */
  async setLED(e) {
    this.ledstate |= 1 << e, await this.setLEDState(this.ledstate);
  }
  /**
   * Resets (turns off) the LED at the specified index by clearing its corresponding bits
   * in the internal LED state and updates the device.
   *
   * @param n - The index of the LED to reset (0-based).
   * @returns A promise that resolves when the LED state has been updated.
   */
  async resetLED(e) {
    this.ledstate &= ~(1 << e | 1 << 4 + e), await this.setLEDState(this.ledstate);
  }
  /**
   * Blinks the specified LED on the Joy-Con controller.
   *
   * This method updates the internal LED state by first turning off the LED at position `n`,
   * then setting the corresponding blink bit for that LED. It then sends the updated state
   * to the controller.
   *
   * @param n - The index of the LED to blink (typically 0-3).
   * @returns A promise that resolves when the LED state has been updated.
   */
  async blinkLED(e) {
    this.ledstate &= ~(1 << e), this.ledstate |= 1 << 4 + e, await this.setLEDState(this.ledstate);
  }
  /**
   * Handles the HID input report event from a Joy-Con device, parses the incoming data,
   * and emits structured input events based on the report type.
   *
   * @param event - The HID input report event containing the data, reportId, and device.
   * @remarks
   * This method processes different types of input reports (e.g., 0x3f, 0x21, 0x30) by parsing
   * the raw data using various PacketParser methods. It extracts information such as button status,
   * analog stick positions, battery level, accelerometer and gyroscope data, and device info.
   * The parsed data is then dispatched to relevant handlers and listeners.
   *
   * @private
   */
  _onInputReport({ data: e, reportId: n, device: o }) {
    if (!e)
      return;
    const r = ie(
      new Uint8Array([n]),
      new Uint8Array(e.buffer)
    ), d = Array.from(r).map((u) => u.toString(16).padStart(2, "0")).join("");
    let i = {
      inputReportID: Ht(r, d)
    };
    switch (n) {
      case 63: {
        i = {
          ...i,
          buttonStatus: Qt(r, d),
          analogStick: $t(r, d),
          filter: Wt(r, d)
        };
        break;
      }
      case 33:
      case 48: {
        if (i = {
          ...i,
          timer: Ot(r, d),
          batteryLevel: jt(r, d),
          connectionInfo: Jt(r, d),
          buttonStatus: Tt(
            r,
            d
          ),
          analogStickLeft: Vt(r, d),
          analogStickRight: Kt(
            r,
            d
          ),
          vibrator: Xt(r, d)
        }, n === 33 && (i = {
          ...i,
          ack: Yt(r, d),
          subcommandID: Zt(r, d),
          subcommandReplyData: zt(
            r,
            d
          ),
          deviceInfo: Pt(r)
        }), n === 48) {
          const u = te(
            r,
            d,
            this.ringConEnabled
          ), l = ee(
            r,
            d,
            this.ringConEnabled
          );
          this.ringConEnabled && this.processRingConGyroCalibration(l);
          const a = Mt(
            l.map((y) => y.map((b) => b.rps ?? 0))
          ), f = Mt(
            l.map((y) => y.map((b) => b.dps ?? 0))
          ), w = ne(
            u.map((y) => [
              y.x.acc ?? 0,
              y.y.acc ?? 0,
              y.z.acc ?? 0
            ])
          );
          this.madgwick.update(a.x, a.y, a.z, w.x, w.y, w.z), i = {
            ...i,
            accelerometers: u,
            gyroscopes: l,
            actualAccelerometer: w,
            actualGyroscope: { dps: f, rps: a },
            actualOrientation: Dt(
              this.lastValues,
              a,
              w,
              o.productId
            ),
            actualOrientationQuaternion: Nt(
              this.quaternion
            ),
            quaternion: this.quaternion,
            ...this.ringConEnabled ? { ringCon: oe(r, d) } : {}
          };
        }
        break;
      }
    }
    i.deviceInfo?.type && this._receiveDeviceInfo(i.deviceInfo), i.batteryLevel?.level && this._receiveBatteryLevel(i.batteryLevel), this._receiveInputEvent(i);
  }
  /**
   * Dispatches a "deviceinfo" custom event with the provided device information as its detail.
   *
   * @param deviceInfo - The information about the device to be included in the event detail.
   */
  _receiveDeviceInfo(e) {
    this.dispatchEvent(new CustomEvent("deviceinfo", { detail: e }));
  }
  /**
   * Dispatches a "batterylevel" custom event with the provided battery level detail.
   *
   * @param batteryLevel - The battery level information to include in the event detail.
   */
  _receiveBatteryLevel(e) {
    this.dispatchEvent(
      new CustomEvent("batterylevel", { detail: e })
    );
  }
  // To be overridden by subclasses
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _receiveInputEvent(e) {
  }
}
class se extends bt {
  /**
   * Handles an input event packet by removing specific button statuses and dispatching a custom "hidinput" event.
   *
   * @param packet - The input event data containing button statuses and other information.
   *
   * The method sets the following button statuses to `undefined` in the `buttonStatus` object:
   * - x
   * - y
   * - b
   * - a
   * - plus
   * - r
   * - zr
   * - home
   * - rightStick
   *
   * After modifying the packet, it dispatches a `CustomEvent` named "hidinput" with the modified packet as its detail.
   */
  _receiveInputEvent(e) {
    const n = e.buttonStatus;
    n.x = void 0, n.y = void 0, n.b = void 0, n.a = void 0, n.plus = void 0, n.r = void 0, n.zr = void 0, n.home = void 0, n.rightStick = void 0, this.dispatchEvent(new CustomEvent("hidinput", { detail: e }));
  }
}
class re extends bt {
  /**
   * Handles an input event packet from the Joy-Con device, sanitizes specific button statuses by setting them to `undefined`,
   * and dispatches a "hidinput" custom event with the modified packet as its detail.
   *
   * @param packet - The input event data received from the Joy-Con, expected to contain a `buttonStatus` property.
   */
  _receiveInputEvent(e) {
    const n = e.buttonStatus;
    n.up = void 0, n.down = void 0, n.left = void 0, n.right = void 0, n.minus = void 0, n.l = void 0, n.zl = void 0, n.capture = void 0, n.leftStick = void 0, this.dispatchEvent(new CustomEvent("hidinput", { detail: e }));
  }
}
class ce extends bt {
  /**
   * Dispatches a "hidinput" custom event with the provided packet as its detail.
   *
   * @param packet - The input data received from the HID device.
   */
  _receiveInputEvent(e) {
    this.dispatchEvent(new CustomEvent("hidinput", { detail: e }));
  }
}
const ae = async (t) => {
  let e = null;
  return t.productId === 8198 ? e = new se(t) : t.productId === 8199 && t.productName === "Joy-Con (R)" && (e = new re(t)), e || (e = new ce(t)), await e.open(), await e.enableUSBHIDJoystickReport(), await e.enableStandardFullMode(), await e.enableIMUMode(), e;
}, It = /* @__PURE__ */ new Map(), vt = [], _t = (t) => {
  const e = vt.indexOf(t);
  return e >= 0 ? e : (vt.push(t), vt.length - 1);
}, yt = async (t) => {
  const e = _t(t);
  console.log(
    `HID connected: ${e} ${t.productId.toString(16)} ${t.productName}`
  ), It.set(e, await ae(t));
}, le = async (t) => {
  const e = _t(t);
  console.log(
    `HID disconnected: ${e} ${t.productId.toString(16)} ${t.productName}`
  ), It.delete(e);
};
navigator.hid.addEventListener("connect", async ({ device: t }) => {
  yt(t);
});
navigator.hid.addEventListener("disconnect", ({ device: t }) => {
  le(t);
});
document.addEventListener("DOMContentLoaded", async () => {
  const t = await navigator.hid.getDevices();
  for (const e of t)
    await yt(e);
});
const ue = async () => {
  const t = [
    {
      vendorId: 1406
      // Nintendo Co., Ltd
    }
  ];
  try {
    const [e] = await navigator.hid.requestDevice({ filters: t });
    if (!e)
      return;
    await yt(e);
  } catch (e) {
    e instanceof Error ? console.error(e.name, e.message) : console.error(e);
  }
};
export {
  ce as GeneralController,
  se as JoyConLeft,
  re as JoyConRight,
  ue as connectJoyCon,
  It as connectedJoyCons
};
