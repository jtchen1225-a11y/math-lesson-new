/* ============ 第 2 階段　5–8 分鐘　懸念時刻：你猜得到嗎？（教案：情境引入＋設置懸念） ============
   課型：新課講授（範例：八年級 畢氏定理）
   本階段小節：2-1 猜一猜
   懸念：螢幕寬 40 cm、高 30 cm，盒子卻寫「對角線 50 cm」；直覺 40＋30＝70。
   本節不在此揭曉，學完後於 6-2「今天的收穫」回答（40²＋30²＝2500＝50²）。
   換成短片時：把本機影片放在 site\media\，改用 video: 'media/xxx.mp4'（只用有權使用的影片）。
   ============================================================ */
window.DECK = window.DECK || [];
(function () {
  const C = "#0891b2";
  const RED = '#e11d48', BLU = '#2563eb';

  function svg(vb, inner) {
    return `<div style="width:100%;text-align:center"><svg viewBox="${vb}" style="max-width:100%">${inner}</svg></div>`;
  }
  const TX = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" ${o.anchor ? `text-anchor="${o.anchor}"` : ''} font-size="${o.fs || 30}" font-weight="${o.fw || 800}" fill="${o.c || '#172033'}">${s}</text>`;

  // 螢幕：寬 40、高 30（每 cm 5 單位）→ 200 × 150
  const X0 = 70, Y0 = 20, W = 200, H = 150;
  const TV = `<rect x="${X0 - 10}" y="${Y0 - 10}" width="${W + 20}" height="${H + 20}" rx="12" fill="#172033"/>`
    + `<rect x="${X0}" y="${Y0}" width="${W}" height="${H}" fill="#dbeafe"/>`
    + `<rect x="${X0 + W / 2 - 30}" y="${Y0 + H + 10}" width="60" height="14" fill="#172033"/>`
    + SV.seg(X0, Y0 + H, X0 + W, Y0, RED, 4, '10 8')
    + TX(X0 + W / 2, Y0 + H + 52, '寬 40 cm', { anchor: 'middle', c: BLU })
    + TX(X0 + W + 30, Y0 + H / 2 + 10, '高 30 cm', { c: BLU })
    + TX(X0 + W / 2 - 30, Y0 + H / 2 - 16, '？', { anchor: 'middle', c: RED, fs: 40 });

  window.DECK.push({
    ch: 2,
    time: "5–8 分鐘",
    title: "懸念時刻：你猜得到嗎？",
    color: C,
    sections: ["2-1 猜一猜"],
    slides: [
      {
        sec: '2-1', secName: '猜一猜',
        title: '螢幕盒子寫錯了嗎？',
        points: ['先自己猜，再舉手投票。', '猜錯沒關係，等一下就知道。'],
        visual: (h) => LS.hook(h, {
          pic: svg('0 0 440 250', TV),
          story: '螢幕寬 40 cm、高 30 cm，盒子上卻寫「對角線 50 cm」。',
          guess: ['寫錯了，應該是 70 cm', '沒寫錯，就是 50 cm', '還不確定'],
          ask: '40＋30＝70，為什麼盒子寫 50？',
          later: '學完今天的內容，你就能證明誰對！'
        })
      }
    ]
  });
})();
