export default class ControlPanel extends HTMLElement {
  #style = `
    <style>
      div {
        display: flex;
        flex-wrap: wrap;
        background: #111;
        color: #fff;
        padding: 2rem;
        gap: 1rem;
      }
    </style>
  `;
  #component = `
    <div>
      <slot></slot>
    </div>
  `;
  constructor() {
    super();
    const template = document.createElement("template");
    template.innerHTML = this.#style + this.#component;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define("control-panel", ControlPanel);
