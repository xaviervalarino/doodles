import renderText from "../modules/render-text.js";

export default class TextCanvas extends HTMLElement {
  #canvas;
  #ctx;
  #txt;
  #style = `
    <style>
      canvas {
        --border-width: 10px;
        height: calc(100% - calc(var(--border-width) * 2));
        width: calc(100% - calc(var(--border-width) * 2));
        border: var(--border-width) solid salmon;
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
    renderText(this.#ctx, this.#txt, 10, 10, 250, 10, "Inter ");
  }
}

customElements.define("text-canvas", TextCanvas);
