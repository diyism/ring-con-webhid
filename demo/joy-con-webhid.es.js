const Et = async (t) => {
  const e = ({
    subcommand: r,
    expectedReport: f,
    timeoutErrorMessage: M = "timeout."
  }) => (w) => new Promise((b, B) => {
    const U = setTimeout(() => {
      w.removeEventListener("inputreport", P), B(new Error(M));
    }, 5e3), P = (x) => {
      const S = x;
      if (S.reportId !== 33)
        return;
      const k = new Uint8Array(S.data.buffer);
      for (const [_, I] of Object.entries(f))
        if (k[Number(_) - 1] !== I)
          return;
      w.removeEventListener("inputreport", P), clearTimeout(U), setTimeout(b, 50);
    };
    w.addEventListener("inputreport", P), (async () => await w.sendReport(
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
        ...r
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
  }), a = e({
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
  }), p = e({
    subcommand: [89],
    expectedReport: {
      14: 89,
      // The MCU reports 0x00 here when a Ring-Con is attached and 0xFE
      // when no external Ring-Con is present.
      15: 0,
      16: 32
    },
    timeoutErrorMessage: "ring-con not found."
  }), s = e({
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
  await n(t), await o(t), await a(t), await p(t), await s(t), await u(t), await l(t);
};
function St(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var ht, qt;
function At() {
  return qt || (qt = 1, ht = function(e, n) {
    n = n || {};
    const o = n.kp || 1, a = n.ki || 0;
    let s = 1 / (1e3 / e), u = n.doInitialisation !== !0, l = 2 * o;
    const r = 2 * a;
    let f = 1, M = 0, w = 0, b = 0, B = 0, U = 0, P = 0;
    function x(i, c, d, R, h, q) {
      let v, m, y, D, F, j, C;
      R !== 0 && h !== 0 && q !== 0 && (v = (R * R + h * h + q * q) ** -0.5, R *= v, h *= v, q *= v, m = M * b - f * w, y = f * M + w * b, D = f * f - 0.5 + b * b, F = h * D - q * y, j = q * m - R * D, C = R * y - h * m, r > 0 ? (B += r * F * s, U += r * j * s, P += r * C * s, i += B, c += U, d += P) : (B = 0, U = 0, P = 0), i += l * F, c += l * j, d += l * C), i *= 0.5 * s, c *= 0.5 * s, d *= 0.5 * s;
      const L = f, N = M, H = w;
      f += -N * i - H * c - b * d, M += L * i + H * d - b * c, w += L * c - N * d + b * i, b += L * d + N * c - H * i, v = (f * f + M * M + w * w + b * b) ** -0.5, f *= v, M *= v, w *= v, b *= v;
    }
    function S(i, c, d, R, h, q) {
      return {
        x: c * q - d * h,
        y: d * R - i * q,
        z: i * h - c * R
      };
    }
    function k(i, c, d, R, h, q) {
      const v = -Math.atan2(i, Math.sqrt(c * c + d * d)), m = S(i, c, d, 1, 0, 0), y = S(1, 0, 0, m.x, m.y, m.z), D = Math.atan2(y.y, y.z), F = Math.cos(D), j = Math.sin(v), C = Math.sin(D), L = h * F - q * C, N = R * Math.cos(v) + h * C * j + q * F * j;
      return {
        heading: -Math.atan2(L, N),
        pitch: v,
        roll: D
      };
    }
    function _(i) {
      const c = Math.cos(i.heading * 0.5), d = Math.sin(i.heading * 0.5), R = Math.cos(i.pitch * 0.5), h = Math.sin(i.pitch * 0.5), q = Math.cos(i.roll * 0.5), v = Math.sin(i.roll * 0.5);
      return {
        w: q * R * c + v * h * d,
        x: v * R * c - q * h * d,
        y: q * h * c + v * R * d,
        z: q * R * d - v * h * c
      };
    }
    function I(i, c, d, R, h, q) {
      const v = k(i, c, d, R, h, q), m = _(v), y = (m.w * m.w + m.x * m.x + m.y * m.y + m.z * m.z) ** -0.5;
      f = m.w * y, M = m.x * y, w = m.y * y, b = m.z * y, u = !0;
    }
    function A(i, c, d, R, h, q, v, m, y, D) {
      s = D || s, u || I(R, h, q, v, m, y);
      let F, j, C, L, N, H, V, T, $, g, E, W, at, it, X, Y, lt, Z, z, ct, G, K, tt, Q;
      if (v === void 0 || m === void 0 || y === void 0 || v === 0 && m === 0 && y === 0) {
        x(i, c, d, R, h, q);
        return;
      }
      R !== 0 && h !== 0 && q !== 0 && (F = (R * R + h * h + q * q) ** -0.5, R *= F, h *= F, q *= F, F = (v * v + m * m + y * y) ** -0.5, v *= F, m *= F, y *= F, j = f * f, C = f * M, L = f * w, N = f * b, H = M * M, V = M * w, T = M * b, $ = w * w, g = w * b, E = b * b, W = 2 * (v * (0.5 - $ - E) + m * (V - N) + y * (T + L)), at = 2 * (v * (V + N) + m * (0.5 - H - E) + y * (g - C)), it = Math.sqrt(W * W + at * at), X = 2 * (v * (T - L) + m * (g + C) + y * (0.5 - H - $)), Y = T - L, lt = C + g, Z = j - 0.5 + E, z = it * (0.5 - $ - E) + X * (T - L), ct = it * (V - N) + X * (C + g), G = it * (L + T) + X * (0.5 - H - $), K = h * Z - q * lt + (m * G - y * ct), tt = q * Y - R * Z + (y * z - v * G), Q = R * lt - h * Y + (v * ct - m * z), r > 0 ? (B += r * K * s, U += r * tt * s, P += r * Q * s, i += B, c += U, d += P) : (B = 0, U = 0, P = 0), i += l * K, c += l * tt, d += l * Q), i *= 0.5 * s, c *= 0.5 * s, d *= 0.5 * s;
      const et = f, J = M, O = w;
      f += -J * i - O * c - b * d, M += et * i + O * d - b * c, w += et * c - J * d + b * i, b += et * d + J * c - O * i, F = (f * f + M * M + w * w + b * b) ** -0.5, f *= F, M *= F, w *= F, b *= F;
    }
    return {
      update: A,
      init: I,
      getQuaternion() {
        return {
          w: f,
          x: M,
          y: w,
          z: b
        };
      }
    };
  }), ht;
}
var ft, Mt;
function xt() {
  return Mt || (Mt = 1, ft = function(e, n) {
    n = n || {};
    const o = 1e3 / e;
    let a = n.beta || 0.4, p = n.doInitialisation !== !0, s = 1, u = 0, l = 0, r = 0, f = 1 / o;
    function M(x, S, k, _, I, A) {
      let i, c, d, R, h, q, v, m, y, D, F, j, C, L, N, H, V, T, $, g, E, W;
      q = 0.5 * (-u * x - l * S - r * k), v = 0.5 * (s * x + l * k - r * S), m = 0.5 * (s * S - u * k + r * x), y = 0.5 * (s * k + u * S - l * x), _ === 0 && I === 0 && A === 0 || (i = (_ * _ + I * I + A * A) ** -0.5, _ *= i, I *= i, A *= i, D = 2 * s, F = 2 * u, j = 2 * l, C = 2 * r, L = 4 * s, N = 4 * u, H = 4 * l, V = 8 * u, T = 8 * l, $ = s * s, g = u * u, E = l * l, W = r * r, c = L * E + j * _ + L * g - F * I, d = N * W - C * _ + 4 * $ * u - D * I - N + V * g + V * E + N * A, R = 4 * $ * l + D * _ + H * W - C * I - H + T * g + T * E + H * A, h = 4 * g * r - F * _ + 4 * E * r - j * I, i = (c * c + d * d + R * R + h * h) ** -0.5, c *= i, d *= i, R *= i, h *= i, q -= a * c, v -= a * d, m -= a * R, y -= a * h), s += q * f, u += v * f, l += m * f, r += y * f, i = (s * s + u * u + l * l + r * r) ** -0.5, s *= i, u *= i, l *= i, r *= i;
    }
    function w(x, S, k, _, I, A) {
      return {
        x: S * A - k * I,
        y: k * _ - x * A,
        z: x * I - S * _
      };
    }
    function b(x, S, k, _, I, A) {
      const i = -Math.atan2(x, Math.sqrt(S * S + k * k)), c = w(x, S, k, 1, 0, 0), d = w(1, 0, 0, c.x, c.y, c.z), R = Math.atan2(d.y, d.z), h = Math.cos(R), q = Math.sin(i), v = Math.sin(R), m = I * h - A * v, y = _ * Math.cos(i) + I * v * q + A * h * q;
      return {
        heading: -Math.atan2(m, y),
        pitch: i,
        roll: R
      };
    }
    function B(x) {
      const S = Math.cos(x.heading * 0.5), k = Math.sin(x.heading * 0.5), _ = Math.cos(x.pitch * 0.5), I = Math.sin(x.pitch * 0.5), A = Math.cos(x.roll * 0.5), i = Math.sin(x.roll * 0.5);
      return {
        w: A * _ * S + i * I * k,
        x: i * _ * S - A * I * k,
        y: A * I * S + i * _ * k,
        z: A * _ * k - i * I * S
      };
    }
    function U(x, S, k, _, I, A) {
      const i = b(x, S, k, _, I, A), c = B(i), d = (c.w * c.w + c.x * c.x + c.y * c.y + c.z * c.z) ** -0.5;
      s = c.w * d, u = c.x * d, l = c.y * d, r = c.z * d, p = !0;
    }
    function P(x, S, k, _, I, A, i, c, d, R) {
      f = R || f, p || U(_, I, A, i, c, d);
      let h, q, v, m, y, D, F, j, C, L, N, H, V, T, $, g, E, W, at, it, X, Y, lt, Z, z, ct, G, K, tt, Q, et, J, O, dt, rt;
      if (i === void 0 || c === void 0 || d === void 0 || i === 0 && c === 0 && d === 0) {
        M(x, S, k, _, I, A);
        return;
      }
      D = 0.5 * (-u * x - l * S - r * k), F = 0.5 * (s * x + l * k - r * S), j = 0.5 * (s * S - u * k + r * x), C = 0.5 * (s * k + u * S - l * x), _ === 0 && I === 0 && A === 0 || (h = (_ * _ + I * I + A * A) ** -0.5, _ *= h, I *= h, A *= h, h = (i * i + c * c + d * d) ** -0.5, i *= h, c *= h, d *= h, H = 2 * s * i, V = 2 * s * c, T = 2 * s * d, $ = 2 * u * i, it = 2 * s, X = 2 * u, Y = 2 * l, lt = 2 * r, Z = 2 * s * l, z = 2 * l * r, ct = s * s, G = s * u, K = s * l, tt = s * r, Q = u * u, et = u * l, J = u * r, O = l * l, dt = l * r, rt = r * r, L = i * ct - V * r + T * l + i * Q + X * c * l + X * d * r - i * O - i * rt, N = H * r + c * ct - T * u + $ * l - c * Q + c * O + Y * d * r - c * rt, g = Math.sqrt(L * L + N * N), E = -H * l + V * u + d * ct + $ * r - d * Q + Y * c * r - d * O + d * rt, W = 2 * g, at = 2 * E, q = -Y * (2 * J - Z - _) + X * (2 * G + z - I) - E * l * (g * (0.5 - O - rt) + E * (J - K) - i) + (-g * r + E * u) * (g * (et - tt) + E * (G + dt) - c) + g * l * (g * (K + J) + E * (0.5 - Q - O) - d), v = lt * (2 * J - Z - _) + it * (2 * G + z - I) - 4 * u * (1 - 2 * Q - 2 * O - A) + E * r * (g * (0.5 - O - rt) + E * (J - K) - i) + (g * l + E * s) * (g * (et - tt) + E * (G + dt) - c) + (g * r - at * u) * (g * (K + J) + E * (0.5 - Q - O) - d), m = -it * (2 * J - Z - _) + lt * (2 * G + z - I) - 4 * l * (1 - 2 * Q - 2 * O - A) + (-W * l - E * s) * (g * (0.5 - O - rt) + E * (J - K) - i) + (g * u + E * r) * (g * (et - tt) + E * (G + dt) - c) + (g * s - at * l) * (g * (K + J) + E * (0.5 - Q - O) - d), y = X * (2 * J - Z - _) + Y * (2 * G + z - I) + (-W * r + E * u) * (g * (0.5 - O - rt) + E * (J - K) - i) + (-g * s + E * l) * (g * (et - tt) + E * (G + dt) - c) + g * u * (g * (K + J) + E * (0.5 - Q - O) - d), h = (q * q + v * v + m * m + y * y) ** -0.5, q *= h, v *= h, m *= h, y *= h, D -= a * q, F -= a * v, j -= a * m, C -= a * y), s += D * f, u += F * f, l += j * f, r += C * f, h = (s * s + u * u + l * l + r * r) ** -0.5, s *= h, u *= h, l *= h, r *= h;
    }
    return {
      update: P,
      init: U,
      getQuaternion() {
        return {
          w: s,
          x: u,
          y: l,
          z: r
        };
      }
    };
  }), ft;
}
var vt, It;
function kt() {
  if (It) return vt;
  It = 1;
  const t = 180 / Math.PI;
  function e(n) {
    n = n || {};
    const o = n.sampleInterval || 20, a = n.algorithm || "Madgwick";
    let p;
    if (a === "Mahony")
      p = At();
    else if (a === "Madgwick")
      p = xt();
    else
      throw new Error(`AHRS(): Algorithm not valid: ${a}`);
    const s = p(o, n), u = this;
    Object.keys(s).forEach((l) => u[l] = s[l]);
  }
  return e.prototype.toVector = function() {
    const o = this.getQuaternion(), a = 2 * Math.acos(o.w), p = Math.sin(a / 2);
    return {
      angle: a,
      x: o.x / p,
      y: o.y / p,
      z: o.z / p
    };
  }, e.prototype.getEulerAngles = function() {
    const o = this.getQuaternion(), a = o.w * o.w, p = o.x * o.x, s = o.y * o.y, u = o.z * o.z;
    return {
      heading: Math.atan2(2 * (o.x * o.y + o.z * o.w), p - s - u + a),
      pitch: -Math.asin(2 * (o.x * o.z - o.y * o.w)),
      roll: Math.atan2(2 * (o.y * o.z + o.x * o.w), -p - s + u + a)
    };
  }, e.prototype.getEulerAnglesDegrees = function() {
    const o = this.getEulerAngles();
    return {
      heading: o.heading * t,
      pitch: o.pitch * t,
      roll: o.roll * t
    };
  }, vt = e, vt;
}
var Ft = kt();
const Ct = /* @__PURE__ */ St(Ft);
function Lt(t, e) {
  let n;
  for (const o of t) {
    const a = e(o);
    a !== void 0 && (n = n === void 0 ? a : n + a);
  }
  return n;
}
function ut(t, e = (n) => n) {
  const n = t == null ? 0 : t.length, o = Lt(t, e);
  return n ? o / n : Number.NaN;
}
function Bt(t) {
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
const Ut = {
  // biome-ignore lint/complexity/useSimpleNumberKeys:
  1: "Left Joy-Con",
  // biome-ignore lint/complexity/useSimpleNumberKeys:
  2: "Right Joy-Con",
  // biome-ignore lint/complexity/useSimpleNumberKeys:
  3: "Pro Controller"
}, pt = 0.75, Nt = 0.0125, Rt = Math.PI / 2;
function Pt(t, e, n, o) {
  const a = Date.now(), p = t.timestamp ? (a - t.timestamp) / 1e3 : 0;
  t.timestamp = a;
  const s = Math.sqrt(
    n.x ** 2 + n.y ** 2 + n.z ** 2
  );
  return t.alpha = (1 - Nt) * (t.alpha + e.z * p), s !== 0 && (t.beta = pt * (t.beta + e.x * p) + (1 - pt) * (n.x * Rt / s), t.gamma = pt * (t.gamma + e.y * p) + (1 - pt) * (n.y * -Rt / s)), {
    alpha: o === 8198 ? (-1 * (t.alpha * 180) / Math.PI * 430 % 90).toFixed(6) : (t.alpha * 180 / Math.PI * 430 % 360).toFixed(6),
    beta: (-1 * (t.beta * 180) / Math.PI).toFixed(6),
    gamma: o === 8198 ? (-1 * (t.gamma * 180) / Math.PI).toFixed(6) : (t.gamma * 180 / Math.PI).toFixed(6)
  };
}
function Dt(t) {
  const e = 180 / Math.PI, n = t.w * t.w, o = t.x * t.x, a = t.y * t.y, p = t.z * t.z;
  return {
    alpha: (e * Math.atan2(2 * (t.x * t.y + t.z * t.w), o - a - p + n)).toFixed(6),
    beta: (e * -Math.asin(2 * (t.x * t.z - t.y * t.w))).toFixed(6),
    gamma: (e * Math.atan2(2 * (t.y * t.z + t.x * t.w), -o - a + p + n)).toFixed(6)
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
function st(t) {
  const e = new DataView(t.buffer);
  return Number.parseFloat((1694e-7 * e.getInt16(0, !0)).toFixed(6));
}
function Ht(t) {
  const e = t.slice(15, 26), n = e.slice(0, 1)[0], o = e.slice(1, 2)[0], a = e.slice(2, 3), p = e.slice(4, 10), s = [];
  for (const r of p)
    s.push(r.toString(16));
  const u = e.slice(11, 12);
  return {
    _raw: e.slice(0, 12),
    _hex: e.slice(0, 12),
    firmwareVersion: {
      major: n,
      minor: o
    },
    type: Ut[a[0]],
    macAddress: s.join(":"),
    spiColorInUse: u[0] === 1
  };
}
function Ot(t, e) {
  return {
    _raw: t.slice(0, 1),
    // index 0
    _hex: e.slice(0, 1)
  };
}
function jt(t, e) {
  return {
    _raw: t.slice(1, 2),
    // index 1
    _hex: e.slice(1, 2)
  };
}
function Jt(t, e) {
  return {
    _raw: t.slice(2, 3),
    // high nibble
    _hex: e.slice(2, 3),
    level: Bt(e.slice(2, 3))
  };
}
function Tt(t, e) {
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
function $t(t, e) {
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
function Gt(t, e) {
  return {
    _raw: t.slice(3, 4),
    // index 3
    _hex: e.slice(3, 4)
  };
}
function Kt(t, e) {
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
function Vt(t, e) {
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
        rps: st(t.slice(19, 21))
      },
      {
        _raw: t.slice(21, 23),
        // index 21,22
        _hex: e.slice(21, 23),
        dps: ot(t.slice(21, 23)),
        rps: st(t.slice(21, 23))
      },
      {
        _raw: t.slice(23, 25),
        // index 23,24
        _hex: e.slice(23, 25),
        dps: ot(t.slice(23, 25)),
        rps: st(t.slice(23, 25))
      }
    ],
    [
      {
        _raw: t.slice(31, 33),
        // index 31,32
        _hex: e.slice(31, 33),
        dps: ot(t.slice(31, 33)),
        rps: st(t.slice(31, 33))
      },
      {
        _raw: t.slice(33, 35),
        // index 33,34
        _hex: e.slice(33, 35),
        dps: ot(t.slice(33, 35)),
        rps: st(t.slice(33, 35))
      },
      {
        _raw: t.slice(35, 37),
        // index 35,36
        _hex: e.slice(35, 37),
        dps: ot(t.slice(35, 37)),
        rps: st(t.slice(35, 37))
      }
    ],
    [
      {
        _raw: t.slice(43, 45),
        // index 43,44
        _hex: e.slice(43, 45),
        dps: ot(t.slice(43, 45)),
        rps: st(t.slice(43, 45))
      },
      {
        _raw: t.slice(45, 47),
        // index 45,46
        _hex: e.slice(45, 47),
        dps: ot(t.slice(45, 47)),
        rps: st(t.slice(45, 47))
      },
      {
        _raw: t.slice(47, 49),
        // index 47,48
        _hex: e.slice(47, 49),
        dps: ot(t.slice(47, 49)),
        rps: st(t.slice(47, 49))
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
function _t(t) {
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
function se(t, e) {
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
    ], a = new Promise((p) => {
      const s = ({ detail: u }) => {
        const { _raw: l, _hex: r, ...f } = u;
        p(f);
      };
      this.addEventListener("deviceinfo", s, {
        once: !0
      });
    });
    return await this.device.sendReport(1, new Uint8Array(o)), a;
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
    ], a = new Promise((p) => {
      const s = ({ detail: u }) => {
        const { _raw: l, _hex: r, ...f } = u;
        p(f);
      };
      this.addEventListener("batterylevel", s, {
        once: !0
      });
    });
    return await this.device.sendReport(1, new Uint8Array(o)), a;
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
    await Et(this.device), this.ringConEnabled = !0;
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
    const a = (b, B, U) => Math.min(Math.max(b, B), U), s = new Uint8Array(9);
    s[0] = 0;
    let u = a(e, 40.875885, 626.286133), l = a(n, 81.75177, 1252.572266);
    l = (Math.round(32 * Math.log2(l * 0.1)) - 96) * 4, u = Math.round(32 * Math.log2(u * 0.1)) - 64;
    const r = a(o, 0, 1);
    let f;
    r === 0 ? f = 0 : r < 0.117 ? f = (Math.log2(r * 1e3) * 32 - 96) / (5 - r ** 2) - 1 : r < 0.23 ? f = Math.log2(r * 1e3) * 32 - 96 - 92 : f = (Math.log2(r * 1e3) * 32 - 96) * 2 - 246;
    let M = Math.round(f) * 0.5;
    const w = M % 2;
    w > 0 && --M, M = M >> 1, M += 64, w > 0 && (M |= 32768), s[1] = l & 255, s[2] = f + (l >>> 8 & 255), s[3] = u + (M >>> 8 & 255), s[4] += M & 255;
    for (let b = 0; b < 4; b++)
      s[5 + b] = s[1 + b];
    await this.device.sendReport(16, new Uint8Array(s));
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
  async setHomeLEDPattern(e, n, o, a) {
    const p = (B, U, P) => Math.min(Math.max(B, U), P), u = Math.min(a.length, 15), l = u << 4 | p(e, 0, 15), r = p(o, 0, 15) << 4 | p(n, 0, 15), f = [l, r], M = {
      intensity: 15,
      fadeDuration: 0,
      duration: 0
    }, w = a.slice(0, u).concat(Array(16 - u).fill(M));
    for (let B = 0; B < 8; B++) {
      const U = w[B * 2], P = w[B * 2 + 1], x = p(U.intensity, 0, 15), S = p(U.fadeDuration, 0, 15), k = p(U.duration, 0, 15), _ = p(P.intensity, 0, 15), I = p(P.fadeDuration, 0, 15), A = p(P.duration, 0, 15);
      f.push(x << 4 | _), f.push(S << 4 | k), f.push(I << 4 | A);
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
    const a = se(
      new Uint8Array([n]),
      new Uint8Array(e.buffer)
    ), p = Array.from(a).map((u) => u.toString(16).padStart(2, "0")).join("");
    let s = {
      inputReportID: Ot(a, p)
    };
    switch (n) {
      case 63: {
        s = {
          ...s,
          buttonStatus: Qt(a, p),
          analogStick: Gt(a, p),
          filter: Wt(a, p)
        };
        break;
      }
      case 33:
      case 48: {
        if (s = {
          ...s,
          timer: jt(a, p),
          batteryLevel: Jt(a, p),
          connectionInfo: Tt(a, p),
          buttonStatus: $t(
            a,
            p
          ),
          analogStickLeft: Kt(a, p),
          analogStickRight: Vt(
            a,
            p
          ),
          vibrator: Xt(a, p)
        }, n === 33 && (s = {
          ...s,
          ack: Yt(a, p),
          subcommandID: Zt(a, p),
          subcommandReplyData: zt(
            a,
            p
          ),
          deviceInfo: Ht(a)
        }), n === 48) {
          const u = te(
            a,
            p,
            this.ringConEnabled
          ), l = ee(
            a,
            p,
            this.ringConEnabled
          ), r = _t(
            l.map((w) => w.map((b) => b.rps ?? 0))
          ), f = _t(
            l.map((w) => w.map((b) => b.dps ?? 0))
          ), M = ne(
            u.map((w) => [
              w.x.acc ?? 0,
              w.y.acc ?? 0,
              w.z.acc ?? 0
            ])
          );
          this.madgwick.update(r.x, r.y, r.z, M.x, M.y, M.z), s = {
            ...s,
            accelerometers: u,
            gyroscopes: l,
            actualAccelerometer: M,
            actualGyroscope: { dps: f, rps: r },
            actualOrientation: Pt(
              this.lastValues,
              r,
              M,
              o.productId
            ),
            actualOrientationQuaternion: Dt(
              this.quaternion
            ),
            quaternion: this.quaternion,
            ...this.ringConEnabled ? { ringCon: oe(a, p) } : {}
          };
        }
        break;
      }
    }
    s.deviceInfo?.type && this._receiveDeviceInfo(s.deviceInfo), s.batteryLevel?.level && this._receiveBatteryLevel(s.batteryLevel), this._receiveInputEvent(s);
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
class ie extends bt {
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
class ce extends bt {
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
class re extends bt {
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
  return t.productId === 8198 ? e = new ie(t) : t.productId === 8199 && t.productName === "Joy-Con (R)" && (e = new ce(t)), e || (e = new re(t)), await e.open(), await e.enableUSBHIDJoystickReport(), await e.enableStandardFullMode(), await e.enableIMUMode(), e;
}, yt = /* @__PURE__ */ new Map(), mt = [], gt = (t) => {
  const e = mt.indexOf(t);
  return e >= 0 ? e : (mt.push(t), mt.length - 1);
}, wt = async (t) => {
  const e = gt(t);
  console.log(
    `HID connected: ${e} ${t.productId.toString(16)} ${t.productName}`
  ), yt.set(e, await ae(t));
}, le = async (t) => {
  const e = gt(t);
  console.log(
    `HID disconnected: ${e} ${t.productId.toString(16)} ${t.productName}`
  ), yt.delete(e);
};
navigator.hid.addEventListener("connect", async ({ device: t }) => {
  wt(t);
});
navigator.hid.addEventListener("disconnect", ({ device: t }) => {
  le(t);
});
document.addEventListener("DOMContentLoaded", async () => {
  const t = await navigator.hid.getDevices();
  for (const e of t)
    await wt(e);
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
    await wt(e);
  } catch (e) {
    e instanceof Error ? console.error(e.name, e.message) : console.error(e);
  }
};
export {
  re as GeneralController,
  ie as JoyConLeft,
  ce as JoyConRight,
  ue as connectJoyCon,
  yt as connectedJoyCons
};
