/* ============ 第 2 階段　5–15 分鐘　看動畫，發現新規律（教案：核心概念講解與示範） ============
   課型：新課講授（範例：八年級 畢氏定理）
   本階段小節：2-1 粵語動畫、2-2 動手探索、2-3 跟著做一次、2-4 快問快答
   2-1 粵語語音：audio/s1～s5.mp3（由 scripts/make_audio.py 依 narration.json 產生）
   範圍邊界：只用正整數邊長探索；不證明定理，以面積觀察建立直觀。
   ============================================================ */
window.DECK = window.DECK || [];
(function () {
  const C = "#7c3aed";
  const RED = '#e11d48', GRN = '#059669', BLU = '#2563eb';

  function svg(vb, inner) {
    return `<div style="width:100%;text-align:center"><svg viewBox="${vb}" style="max-width:100%">${inner}</svg></div>`;
  }
  const TX = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" ${o.anchor ? `text-anchor="${o.anchor}"` : ''} font-size="${o.fs || 30}" font-weight="${o.fw || 800}" fill="${o.c || '#172033'}">${s}</text>`;

  // 2-1 動畫：3-4-5 直角三角形，每格 22；直角在原點，股 3 沿 x 軸、股 4 沿 y 軸（數學座標，y 向上）
  const U = 22, OX = 98, OY = 168;
  const Q = (x, y) => [+(OX + x * U).toFixed(1), +(OY - y * U).toFixed(1)];
  const lerp = (p, q, t) => [+(p[0] + (q[0] - p[0]) * t).toFixed(1), +(p[1] + (q[1] - p[1]) * t).toFixed(1)];
  // 邊長 n 格的正方形：從 p0 沿 e1 走 n 格、沿 e2（向外）長出 n×k 格；e1、e2 為數學座標中一格的向量
  function gridSq(p0, e1, e2, n, color, fill, k) {
    const P = (i, j) => Q(p0[0] + e1[0] * i + e2[0] * j * k, p0[1] + e1[1] * i + e2[1] * j * k);
    let s = SV.poly([P(0, 0), P(n, 0), P(n, n), P(0, n)], fill, color, 2.5);
    for (let t = 1; t < n; t++) s += SV.seg(...P(t, 0), ...P(t, n), color, 1) + SV.seg(...P(0, t), ...P(n, t), color, 1);
    return s;
  }

  // 2-3 示範圖：兩股 6（直立）、8（水平），每單位 26
  const Cp = [70, 222], Bp = [278, 222], Ap = [70, 66];

  window.DECK.push({
    ch: 2,
    time: "5–15 分鐘",
    title: "看動畫，發現新規律",
    color: C,
    sections: ["2-1 粵語動畫", "2-2 動手探索", "2-3 跟著做一次", "2-4 快問快答"],
    slides: [
      {
        sec: '2-1', secName: '粵語動畫',
        title: '看動畫：三個正方形的秘密',
        points: ['按 ▶ 播放，留意格子數目。', '看完說說：你發現了什麼？'],
        visual: (h) => LS.anim(h, {
          vb: '0 0 440 250',
          scenes: [
            { say: '呢個係直角三角形。兩條短邊叫「股」，最長嗰條叫「斜邊」。', audio: 'audio/s1.mp3', dur: 6,
              d: k => SV.poly([Q(0, 0), Q(3, 0), Q(0, 4)], '#fff', '#172033', 2) + SV.rightAngle(...Q(0, 0), 0, 90, 12, '#172033')
                + SV.seg(...Q(0, 0), ...Q(3, 0), BLU, 5) + SV.seg(...Q(0, 0), ...Q(0, 4), BLU, 5)
                + SV.seg(...Q(3, 0), ...lerp(Q(3, 0), Q(0, 4), k), RED, 5)
                + TX(262, 48, '短邊：股', { c: BLU }) + (k > 0.5 ? TX(262, 92, '長邊：斜邊', { c: RED }) : '') },
            { say: '喺兩條股上面砌正方形：一個有 9 格，一個有 16 格。', audio: 'audio/s2.mp3', dur: 6,
              d: k => gridSq([0, 0], [1, 0], [0, -1], 3, BLU, 'rgba(37,99,235,.14)', k)
                + gridSq([0, 0], [0, 1], [-1, 0], 4, GRN, 'rgba(5,150,105,.14)', k)
                + (k > 0.7 ? TX(...Q(1.5, -1.5).map((v, i) => v + [0, 10][i]), '9', { c: BLU, anchor: 'middle' })
                  + TX(...Q(-2, 2).map((v, i) => v + [0, 10][i]), '16', { c: GRN, anchor: 'middle' }) : '') },
            { say: '再喺斜邊上面砌正方形，數吓，有 25 格。', audio: 'audio/s3.mp3', dur: 6,
              d: k => gridSq([3, 0], [-0.6, 0.8], [0.8, 0.6], 5, RED, 'rgba(225,29,72,.10)', k)
                + (k > 0.7 ? TX(...Q(3.5, 3.5).map((v, i) => v + [0, 10][i]), '25', { c: RED, anchor: 'middle' }) : '') },
            { say: '9 加 16，啱啱好等於 25！', audio: 'audio/s4.mp3', dur: 4,
              d: k => TX(350, 190, '9 + 16 = 25', { anchor: 'middle' }) },
            { say: '所以 a² ＋ b² ＝ c²，呢個就係畢氏定理。', audio: 'audio/s5.mp3', dur: 5,
              d: k => TX(350, 238, 'a² + b² = c²', { c: RED, fs: 32, anchor: 'middle' }) }
          ]
        })
      },
      {
        sec: '2-2', secName: '動手探索',
        title: '三個正方形的面積有什麼關係？',
        points: ['拖 a、b，比較三個正方形。', '哪個等式一直成立？'],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%"><div class="fig"></div>
            <div class="fx" style="font-size:var(--mrd-body);text-align:center"></div>
            <div class="ictrl"><label>a ＝ <span class="ival av">3</span></label>
            <input type="range" id="pa" min="1" max="8" step="1" value="3">
            <label>b ＝ <span class="ival bv">4</span></label>
            <input type="range" id="pb" min="1" max="8" step="1" value="4"></div></div>`;
          const draw = () => {
            const a = +h.querySelector('#pa').value, b = +h.querySelector('#pb').value;
            h.querySelector('.av').textContent = a;
            h.querySelector('.bv').textContent = b;
            // 數學座標：直角在原點，a 沿 x 軸、b 沿 y 軸；三個正方形向外。範圍 x∈[-b, a+b]、y∈[-a, a+b]
            const W = 440, H = 260, pad = 16;
            const s = Math.min((W - 2 * pad) / (a + 2 * b), (H - 2 * pad) / (2 * a + b));
            const ox = (W - (a + 2 * b) * s) / 2 + b * s;
            const oy = (H - (2 * a + b) * s) / 2 + (a + b) * s;
            const P = (x, y) => [+(ox + x * s).toFixed(1), +(oy - y * s).toFixed(1)];
            const O = P(0, 0), A = P(a, 0), B = P(0, b);
            let g = SV.poly([O, A, P(a, -a), P(0, -a)], 'rgba(37,99,235,.16)', BLU, 2)
              + SV.poly([O, B, P(-b, b), P(-b, 0)], 'rgba(5,150,105,.16)', GRN, 2)
              + SV.poly([A, B, P(b, a + b), P(a + b, a)], 'rgba(225,29,72,.12)', RED, 2)
              + SV.poly([O, A, B], '#fff', '#172033', 3)
              + SV.rightAngle(O[0], O[1], 0, 90, 12, '#172033');
            const [ax, ay] = P(a / 2, -a / 2), [bx, by] = P(-b / 2, b / 2), [cx, cy] = P((a + b) / 2, (a + b) / 2);
            g += TX(ax, ay + 9, 'a²', { c: BLU, anchor: 'middle' }) + TX(bx, by + 9, 'b²', { c: GRN, anchor: 'middle' })
              + TX(cx, cy + 9, 'c²', { c: RED, anchor: 'middle' });
            h.querySelector('.fig').innerHTML = svg('0 0 440 260', g);
            const sum = a * a + b * b, r = Math.round(Math.sqrt(sum));
            const cTex = r * r === sum ? `c=${r}` : `c=\\sqrt{${sum}}\\approx${Math.sqrt(sum).toFixed(2)}`;
            const fx = h.querySelector('.fx');
            fx.innerHTML = `\\(a^2+b^2=${a * a}+${b * b}=${sum}\\)<br>\\(c^2=${sum}\\)，\\(${cTex}\\)`;
            MJ(fx);
          };
          h.querySelector('#pa').oninput = draw;
          h.querySelector('#pb').oninput = draw;
          draw();
        },
        selfCheck: (h) => {
          const a = +h.querySelector('#pa').value, b = +h.querySelector('#pb').value;
          const items = MathJax.startup.document.getMathItemsWithin([h.querySelector('.fx')]);
          const first = items.length ? items[0].math.replace(/\s/g, '') : '';
          return first === `a^2+b^2=${a * a}+${b * b}=${a * a + b * b}` ? null : `公式「${first}」與 a=${a}、b=${b} 不一致`;
        }
      },
      {
        sec: '2-3', secName: '跟著做一次',
        title: '跟著做：兩股 6、8，求斜邊',
        formula: { label: '畢氏定理', tex: 'a^2+b^2=c^2' },
        points: ['每一步說出理由；範例改成求股。'],
        visual: (h) => {
          SV.stepper(h, '0 0 440 260', [
            { t: '標出直角，兩股是 6 和 8', d: k => SV.poly([Cp, Bp, Ap], 'rgba(124,58,237,.08)', C, 3)
                + SV.rightAngle(Cp[0], Cp[1], 0, 90, 16, C)
                + TX(40, 154, '6', { anchor: 'middle' }) + TX(174, 254, '8', { anchor: 'middle' }) },
            { t: '直角對面的邊是斜邊 c', d: k => SV.seg(Ap[0], Ap[1], Ap[0] + (Bp[0] - Ap[0]) * k, Ap[1] + (Bp[1] - Ap[1]) * k, RED, 6)
                + (k > 0.5 ? TX(184, 132, 'c', { c: RED, fs: 30 }) : '') },
            { t: 'c² ＝ 6² ＋ 8² ＝ 36 ＋ 64 ＝ 100', d: k => TX(296, 90, 'c² = 100', { c: RED }) },
            { t: 'c ＝ 10（邊長取正數）', d: k => TX(296, 140, 'c = 10', { c: RED }) }
          ]);
        },
        example: { q: '斜邊 10、一股 6，求另一股 b。', steps: ['\\(6^2+b^2=10^2\\)', '\\(b^2=100-36=64\\)', '\\(b=8\\)'], ans: '\\(b=8\\)' }
      },
      {
        sec: '2-4', secName: '快問快答',
        title: '快問快答：斜邊是多少？',
        points: ['想好再比手勢，全班一起出。', '說說看：其他選項錯在哪裡？'],
        visual: (h) => LS.check(h, {
          q: '直角三角形兩股 5、12，斜邊是？',
          options: [
            { t: '13', ok: true, why: '\\(25+144=169\\)，\\(c=13\\)' },
            { t: '17', why: '概念錯誤：把邊長直接相加' },
            { t: '\\(\\sqrt{119}\\)', why: '概念錯誤：把 12 當成斜邊' },
            { t: '169', why: '程序錯誤：忘了開平方' }
          ]
        })
      }
    ]
  });
})();
