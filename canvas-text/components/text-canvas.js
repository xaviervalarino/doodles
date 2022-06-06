export default class TextCanvas extends HTMLElement {
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
    this.canvas = this.shadowRoot.querySelector("canvas")
  }

  connectedCallback() {
    console.log("canvas connected", this.canvas);
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
    console.log('canvas', attr, value)
  }

}

customElements.define("text-canvas", TextCanvas);
