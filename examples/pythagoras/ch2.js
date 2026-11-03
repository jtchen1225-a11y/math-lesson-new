/* ============ 第 2 階段　5–15 分鐘　核心概念講解與示範 ============
   課型：新課講授（範例：八年級 畢氏定理）
   本階段小節：2-1 概念探索、2-2 示範例題、2-3 理解檢查
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

  // 2-2 示範圖：兩股 6（直立）、8（水平），每單位 26
  const Cp = [70, 222], Bp = [278, 222], Ap = [70, 66];

  window.DECK.push({
    ch: 2,
    time: "5–15 分鐘",
    title: "核心概念講解與示範",
    color: C,
    sections: ["2-1 概念探索", "2-2 示範例題", "2-3 理解檢查"],
    slides: [
      {
        sec: '2-1', secName: '概念探索',
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
        sec: '2-2', secName: '示範例題',
        title: '示範：兩股 6、8，求斜邊',
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
        sec: '2-3', secName: '理解檢查',
        title: '理解檢查：斜邊是多少？',
        points: ['用手勢比 A～D，全班同時作答。', '超過三成選錯，回到 2-2 再講。'],
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
