export default class FormField extends HTMLElement {
  #style = `
    <style>
      div {
        display: flex;
        flex-direction: column;
        background: #444;
      }
      label {
        text-transform: capitalize; 
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
    this.input.oninput = () => {
      setTimeout(() => {
        console.log(`${this.id} event: `, this.input.value);
        clearTimeout(this);
      }, 500);
    };
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
