export default class TextCanvas extends HTMLElement {
  #canvas;
  #ctx;
  #txt;
  // initial values
  #fontFace = "sans-serif";
  #fontSize = 16;
  #lineHeight = this.#fontSize * 1.3;
  #letterSpacing;
  #maxWidth = 500;

  #style = `
    <style>
      canvas {
        height: 100%;
        width: 100%;
      }
    </style>
  `;
  #component = `<canvas></canvas>`;

  constructor() {
    super();
    const template = document.createElement("template");
    template.innerHTML = this.#style + this.#component;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.#canvas = this.shadowRoot.querySelector("canvas");
    this.#ctx = this.#canvas.getContext("2d");
    this.#txt = this.textContent.replace(/\s{2,}/g, " ").trim();
    this.resolution();
  }

  resolution() {
    this.#canvas.width = this.#canvas.clientWidth;
    this.#canvas.height = this.#canvas.clientHeight;
    this.#ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  renderText(x, y) {
    let line = " ";

    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#ctx.font = `${this.#fontSize}px ${this.#fontFace}`;
    console.log("font", this.#ctx.font);

    for (const word of this.#txt.split(" ")) {
      var testLine = line + word + " ";
      var metrics = this.#ctx.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > this.#maxWidth) {
        this.#ctx.fillText(line, x, y);
        line = word + " ";
        y += this.#lineHeight;
      } else {
        line = testLine;
      }
    }
    this.#ctx.fillText(line, x, y);
  }

  static get observedAttributes() {
    return [
      "font-family",
      "line-height",
      "letter-spacing",
      "paragraph-spacing",
      "align-h",
      "align-v",
    ];
  }

  attributeChangedCallback(attr, _, value) {
    if (attr === "font-family") {
      this.#fontFace = value;
      console.log(this.#fontFace);
    }
    if (attr === "line-height") {
      this.#lineHeight = +value;
    }
    if (attr === "letter-spacing") {
      this.#letterSpacing = +value;
    }
    if (attr === "paragraph-spacing") {
    }
    this.renderText(50, 50);
  }
}

customElements.define("text-canvas", TextCanvas);
