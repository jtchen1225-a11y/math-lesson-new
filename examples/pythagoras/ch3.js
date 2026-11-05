/* ============ 第 3 階段　8–18 分鐘　看動畫，發現新規律（教案：核心概念講解與示範） ============
   課型：新課講授（範例：中二 畢氏定理）
   本階段小節：3-1 粵語動畫、3-2 動手探索、3-3 說出規律、3-4 認識斜邊、3-5 跟著做：求斜邊、3-6 跟著做：求直角邊、3-7 快問快答
   3-1 粵語語音：audio/s1～s5.mp3（由 scripts/make_audio.py 依 narration.json 產生）
   動畫只講到 9＋16＝25 並留下問題，a²＋b²＝c² 由學生在 3-2 探索後自己說出來。
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

  // 3-1 動畫：3-4-5 直角三角形，每格 22；直角在原點，直角邊 3 沿 x 軸、直角邊 4 沿 y 軸（數學座標，y 向上）
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

  // 3-3 示範圖：兩直角邊 6（直立）、8（水平），每單位 26
  const Cp = [70, 222], Bp = [278, 222], Ap = [70, 66];

  // 拆頁：題目頁（stage: ask）與解說頁（stage: explain）共用同一份資料
  const P_3_3 = {
          q: '三個正方形面積的關係是？',
          options: [
            { t: '\\(a^2+b^2=c^2\\)', ok: true, why: '兩個小正方形合起來等於大正方形' },
            { t: '\\(a+b=c\\)', why: '概念錯誤：是面積相加，不是邊長相加' },
            { t: '\\(a^2+c^2=b^2\\)', why: '概念錯誤：最大的是斜邊上的正方形' }
          ]
        };
  const P_3_4 = {
          q: '△ABC 中 ∠A＝90°，哪一條是斜邊？',
          options: [
            { t: 'BC', ok: true, why: '∠A 的對邊是 BC' },
            { t: 'AB', why: '概念錯誤：AB 連着直角，是直角邊' },
            { t: 'AC', why: '概念錯誤：AC 連着直角，是直角邊' }
          ]
        };
  const P_3_7 = {
          q: '直角三角形兩直角邊 5、12，斜邊是？',
          options: [
            { t: '13', ok: true, why: '\\(25+144=169\\)，\\(c=13\\)' },
            { t: '17', why: '概念錯誤：把邊長直接相加' },
            { t: '\\(\\sqrt{119}\\)', why: '概念錯誤：把 12 當成斜邊' },
            { t: '169', why: '程序錯誤：忘了開平方' }
          ]
        };

  window.DECK.push({
    ch: 3,
    time: "8–18 分鐘",
    title: "看動畫，發現新規律",
    color: C,
    sections: ["3-1 粵語動畫", "3-2 動手探索", "3-3 說出規律", "3-3-2 說出規律", "3-4 認識斜邊", "3-4-2 認識斜邊", "3-5 跟著做：求斜邊", "3-5-2 跟著做：求斜邊", "3-6 跟著做：求直角邊", "3-7 快問快答", "3-7-2 快問快答"],
    slides: [
      {
        sec: '3-1', secName: '粵語動畫',
        title: '看動畫：三個正方形的秘密',
        points: ['按 ▶ 播放，留意格子數目。', '看完說說：你發現了甚麼？'],
        visual: (h) => LS.anim(h, {
          vb: '0 0 440 250',
          scenes: [
            { say: '呢個係直角三角形。兩條短邊叫「直角邊」，最長嗰條叫「斜邊」。', audio: 'audio/s1.mp3', dur: 6,
              d: k => SV.poly([Q(0, 0), Q(3, 0), Q(0, 4)], '#fff', '#172033', 2) + SV.rightAngle(...Q(0, 0), 0, 90, 12, '#172033')
                + SV.seg(...Q(0, 0), ...Q(3, 0), BLU, 5) + SV.seg(...Q(0, 0), ...Q(0, 4), BLU, 5)
                + SV.seg(...Q(3, 0), ...lerp(Q(3, 0), Q(0, 4), k), RED, 5)
                + TX(258, 48, '短邊：直角邊', { c: BLU }) + (k > 0.5 ? TX(258, 92, '長邊：斜邊', { c: RED }) : '') },
            { say: '喺兩條直角邊上面砌正方形：一個有 9 格，一個有 16 格。', audio: 'audio/s2.mp3', dur: 6,
              d: k => gridSq([0, 0], [1, 0], [0, -1], 3, BLU, 'rgba(37,99,235,.14)', k)
                + gridSq([0, 0], [0, 1], [-1, 0], 4, GRN, 'rgba(5,150,105,.14)', k)
                + (k > 0.7 ? TX(...Q(1.5, -1.5).map((v, i) => v + [0, 10][i]), '9', { c: BLU, anchor: 'middle' })
                  + TX(...Q(-2, 2).map((v, i) => v + [0, 10][i]), '16', { c: GRN, anchor: 'middle' }) : '') },
            { say: '再喺斜邊上面砌正方形，數吓，有 25 格。', audio: 'audio/s3.mp3', dur: 6,
              d: k => gridSq([3, 0], [-0.6, 0.8], [0.8, 0.6], 5, RED, 'rgba(225,29,72,.10)', k)
                + (k > 0.7 ? TX(...Q(3.5, 3.5).map((v, i) => v + [0, 10][i]), '25', { c: RED, anchor: 'middle' }) : '') },
            { say: '9 加 16，啱啱好等於 25！', audio: 'audio/s4.mp3', dur: 4,
              d: k => TX(350, 190, '9 + 16 = 25', { anchor: 'middle' }) },
            { say: '係咪次次都係咁？下一頁你自己試吓！', audio: 'audio/s5.mp3', dur: 4,
              d: k => TX(350, 238, '次次都係？', { c: RED, fs: 32, anchor: 'middle' }) }
          ]
        })
      },
      {
        sec: '3-2', secName: '動手探索',
        title: '三個正方形的面積有甚麼關係？',
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
        sec: '3-3', secName: '說出規律',
        title: '你發現的規律是甚麼？',
        points: ['剛才試了幾組 a、b？', '用自己的話說一次。'],
        visual: (h) => LS.check(h, { ...P_3_3, stage: 'ask' })
      },
      {
        sec: '3-3-2', secName: '說出規律',
        title: '你發現的規律是甚麼？（解說）',
        points: [P_3_3.q],
        visual: (h) => LS.check(h, { ...P_3_3, stage: 'explain', q: null })
      },
      {
        sec: '3-4', secName: '認識斜邊',
        title: '先認人：哪一條是斜邊？',
        points: ['斜邊是直角的對邊。', '圖怎樣轉，都是對邊。'],
        visual: (h) => LS.check(h, { ...P_3_4, stage: 'ask' })
      },
      {
        sec: '3-4-2', secName: '認識斜邊',
        title: '先認人：哪一條是斜邊？（解說）',
        points: [P_3_4.q],
        visual: (h) => LS.check(h, { ...P_3_4, stage: 'explain', q: null })
      },
      {
        sec: '3-5', secName: '跟著做：求斜邊',
        title: '跟著做：兩直角邊 6、8，求斜邊',
        formula: { label: '畢氏定理', tex: 'a^2+b^2=c^2' },
        points: ['每一步說出理由。'],
        visual: (h) => {
          SV.stepper(h, '0 0 440 260', [
            { t: '標出直角，兩直角邊是 6 和 8', d: k => SV.poly([Cp, Bp, Ap], 'rgba(124,58,237,.08)', C, 3)
                + SV.rightAngle(Cp[0], Cp[1], 0, 90, 16, C)
                + TX(40, 154, '6', { anchor: 'middle' }) + TX(174, 254, '8', { anchor: 'middle' }) },
            { t: '直角對面的邊是斜邊 c', d: k => SV.seg(Ap[0], Ap[1], Ap[0] + (Bp[0] - Ap[0]) * k, Ap[1] + (Bp[1] - Ap[1]) * k, RED, 6)
                + (k > 0.5 ? TX(184, 132, 'c', { c: RED, fs: 30 }) : '') },
            { t: 'c² ＝ 6² ＋ 8² ＝ 36 ＋ 64 ＝ 100', d: k => TX(296, 90, 'c² = 100', { c: RED }) },
            { t: 'c ＝ 10（邊長取正數）', d: k => TX(296, 140, 'c = 10', { c: RED }) }
          ]);
        }
      },
      {
        sec: '3-5-2', secName: '跟著做：求斜邊',
        title: '再試一題',
        points: ['獨立做，再對答案。'],
        visual: (h) => LS.goals(h, { head: '三個提醒', items: ['先認出斜邊', '代入 \\(a^2+b^2=c^2\\)', '邊長取正數'] }),
        example: { q: '兩直角邊 7、24，求斜邊。', steps: ['\\(c^2=49+576=625\\)', '\\(c=25\\)'], ans: '25' }
      },
      {
        sec: '3-6', secName: '跟著做：求直角邊',
        title: '跟著做：已知斜邊，求直角邊',
        formula: { label: '移項', tex: 'b^2=c^2-a^2' },
        points: ['斜邊的平方最大，所以要減。'],
        visual: (h) => {
          SV.stepper(h, '0 0 440 260', [
            { t: '斜邊是 10，一直角邊是 6', d: k => SV.poly([Cp, Bp, Ap], 'rgba(124,58,237,.08)', C, 3)
                + SV.rightAngle(Cp[0], Cp[1], 0, 90, 16, C) + SV.seg(Ap[0], Ap[1], Bp[0], Bp[1], RED, 5)
                + TX(40, 154, '6', { anchor: 'middle' }) + TX(174, 254, 'b', { anchor: 'middle', c: BLU }) + TX(186, 132, '10', { c: RED }) },
            { t: '列式：6² ＋ b² ＝ 10²', d: k => TX(292, 70, '6²+b²=10²', { fs: 30 }) },
            { t: 'b² ＝ 100 － 36 ＝ 64', d: k => TX(292, 120, 'b² = 64', { c: BLU }) },
            { t: 'b ＝ 8（邊長取正數）', d: k => TX(292, 170, 'b = 8', { c: BLU }) }
          ]);
        }
      },
      {
        sec: '3-7', secName: '快問快答',
        title: '快問快答：斜邊是多少？',
        points: ['想好再比手勢，全班一起出。', '說說看：其他選項錯在哪裏？'],
        visual: (h) => LS.check(h, { ...P_3_7, stage: 'ask' })
      },
      {
        sec: '3-7-2', secName: '快問快答',
        title: '快問快答：斜邊是多少？（解說）',
        points: [P_3_7.q],
        visual: (h) => LS.check(h, { ...P_3_7, stage: 'explain', q: null })
      }
    ]
  });
})();
