export default class TextCanvas extends HTMLElement {
  #canvas;
  #ctx;
  // initial values
  #props = {
    fontFace: "sans-serif",
    fontSize: 16,
    letterSpacing: undefined,
    lineHeight: 16 * 1.3,
    width: 500,
    txt: "",
    x: 0,
    y: 0,
  };

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
    this.#props.txt = this.textContent.replace(/\s{2,}/g, " ").trim();
    this.resolution();
  }

  resolution() {
    this.#canvas.width = this.#canvas.clientWidth;
    this.#canvas.height = this.#canvas.clientHeight;
    this.#ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  renderText() {
    const { txt, lineHeight, fontSize, fontFace, width, x } = this.#props;
    let y = this.#props.y + fontSize * (2 / 3);
    let line = "";

    // clear canvas for new drawing
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#ctx.font = `${fontSize}px ${fontFace}`;

    for (const word of txt.split(" ")) {
      let testLine = line + word + " ";
      let metrics = this.#ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > width) {
        this.#ctx.fillText(line, x, y);
        line = word + " ";
        y += fontSize * (lineHeight / 100);
      } else {
        line = testLine;
      }
    }
    this.#ctx.fillText(line, x, y);
  }

  static get observedAttributes() {
    return [
      "align-h",
      "align-v",
      "font-face",
      "font-size",
      "letter-spacing",
      "line-height",
      "paragraph-spacing",
      "width",
      "x",
      "y",
    ];
  }

  attributeChangedCallback(attr, _, value) {
    const propName = attr.replace(/-./g, (x) => x[1].toUpperCase());
    value = isNaN(+value) ? value : +value;
    this.#props[propName] = value;
    console.log(propName, this.#props[propName]);
    this.renderText();
  }
}

customElements.define("text-canvas", TextCanvas);
