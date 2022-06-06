import renderText from "../modules/render-text.js";

export default class TextCanvas extends HTMLElement {
  #canvas;
  #ctx;
  #txt;
  #style = `
    <style>
      canvas {
        overflow: hidden;
        width: calc(100% - 20px);
        bottom: 0;
        max-width: 100%;
        border: 10px solid salmon;
        margin: 0;
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
