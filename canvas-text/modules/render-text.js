// copy/pasted
// https://stackoverflow.com/questions/22998551/how-to-paragraph-text-drawn-onto-canvas
// http://jsfiddle.net/m1erickson/mQFDB/
export default function (context, text, x, y, maxWidth, fontSize, fontFace) {
  var words = text.split(" ");
  var line = "";
  var lineHeight = fontSize + 1.4;

  context.font = fontSize + " " + fontFace;

  for (var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + " ";
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth) {
      context.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}
