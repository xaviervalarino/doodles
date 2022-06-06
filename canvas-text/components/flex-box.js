export default class FlexBox extends HTMLElement {
  #style = (direction) => `
    <style>
      div {
        display: flex;
        flex-direction: ${direction};
        color: #fff;
        height: 100vh;
        align-items: stretch;
      }
      slot[name="flex-grow"]::slotted(*) {
        overflow: hidden;
        flex: 1;
      }
    </style>
  `;
  #component = `
    <div>
      <slot></slot>
      <slot name="flex-grow"></slot>
    </div>
  `;
  constructor() {
    super();
    const template = document.createElement("template");
    this.direction = this.getAttribute("direction") || "row";
    template.innerHTML = this.#style(this.direction) + this.#component;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  static get observedAttributes() {
    return ["direction"];
  }
  attributeChangedCallback(attr, _, value) {
    if (attr === "direction") {
      this.direction = value;
      console.log(this.direction);
    }
  }
}
customElements.define("flex-box", FlexBox);
