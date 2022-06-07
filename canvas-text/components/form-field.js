export default class FormField extends HTMLElement {
  #style = `
    <style>
      div {
        display: flex;
        flex-direction: column;
        border-top: 2px solid #444;
        padding-top: 1rem;
      }
      label {
        text-transform: capitalize; 
        margin-bottom: .5rem;
      }
    </style>
    `;
  #component = `
      <div>
        <label for>${this.textContent}</label>
        <input type id />
      </div>
    `;
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const template = document.createElement("template");

    template.innerHTML = this.#style + this.#component;
    shadow.appendChild(template.content.cloneNode(true));

    this.component = shadow.querySelector("div");
    this.label = shadow.querySelector("label");
    this.input = shadow.querySelector("input");
  }

  connectedCallback() {
    let timer;
    this.input.oninput = () => {
      const time = this.input.type === "range" ? 5 : 700;
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.emitEvent(this.id, this.input.value);
      }, time);
    };
  }

  emitEvent(id, value) {
    const event = new CustomEvent("update", {
      bubbles: true,
      detail: { id: id, value: value },
    });
    this.dispatchEvent(event);
  }

  static get observedAttributes() {
    return ["id", "type"];
  }

  attributeChangedCallback(attr, _, value) {
    if (attr === "id") {
      this.label.setAttribute("for", value);
      this.input.setAttribute("id", value);
    }
    if (attr === "type") {
      this.input.setAttribute("type", value);
    }
  }
}

customElements.define("form-field", FormField);
