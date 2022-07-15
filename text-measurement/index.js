const canvas = document.querySelector("canvas");
const { width, height } = document.body.getBoundingClientRect();
const ctx = canvas.getContext("2d");

// resolution
canvas.width = width;
canvas.height = height;
ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

ctx.font = "48px sans-serif";
ctx.strokeStyle = "red";

function drawVertLine(color) {
  return (x, y, top, bottom) => {
    y = y - top;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + top + bottom);
    ctx.stroke();
  };
}
const drawRedLine = drawVertLine("red");
const drawCyanLine = drawVertLine("darkcyan");

function drawTextWithLines(text, y, spacing = 0) {
  let x = 10;
  let lastWidth = 0;
  const letters = text.split("");
  for (const letter of letters) {
    const m = ctx.measureText(letter);
    // first line
    console.log(letter, m);
    const top = m.actualBoundingBoxAscent;
    const bottom = m.actualBoundingBoxDescent;
    drawCyanLine(x - 0.25, y, top, bottom);
    lastWidth = m.width;
    // second line
    drawRedLine(lastWidth + x + 0.25, y, top, bottom);
    ctx.fillText(letter, x, y);
    x += lastWidth + spacing;
  }
}
// const t = ctx.measureText("T");
// const the = ctx.measureText("The");

drawTextWithLines("The quick brown fox", 40, 10);
drawTextWithLines("The quick brown fox", 120);
drawTextWithLines("The quick fox", 180, 30);
