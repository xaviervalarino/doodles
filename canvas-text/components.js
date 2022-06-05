customElements.define(
  "form-field",
  class extends HTMLElement {
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
);

customElements.define(
  "segmented-control",
  class extends HTMLElement {
    #style = `
    <style>
      fieldset {
        display: flex;
        border: 1px solid;
        border-radius: 8px;
      }
      div {
        background: purple;
      } 
      ::slotted(segment-item) {
        background: salmon;
      }
      ::slotted(label) {
        background: red;
      }
    </style>
    `;

    #segments = [...this.querySelectorAll("segment-item")].map((n) => {
      const text = n.textContent;
      const checked = Boolean(n.getAttribute("checked"));
      console.log(text, checked);
      return `
        <div>
          <input
            name
            type="radio"
            id="${text.toLowerCase()}"
            value="${text.toLowerCase()}"
          /> 
          <label for=${text.toLowerCase()}>
            ${text}
          </label>
        </div>
      `;
    });
    #component = `
      <fieldset>
        ${this.#segments.join(" ")}
      </fieldset>
    `;
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
      const template = document.createElement("template");
      template.innerHTML = this.#style + this.#component;
      shadow.appendChild(template.content.cloneNode(true));

      this.inputs = shadow.querySelectorAll("input");
    }

    setCheckedSegment(index) {
      this.inputs[index].setAttribute("checked", true);
    }

    static get observedAttributes() {
      return ["name"];
    }

    attributeChangedCallback(attr, _, value) {
      if (attr === "name") {
        for (const input of this.inputs) {
          input.setAttribute("name", value);
        }
      }
    }
  }
);

customElements.define(
  "segment-item",
  class extends HTMLElement {
    constructor() {
      super();
      if (this.parentNode.tagName !== "SEGMENTED-CONTROL") {
        console.error("<segment-item> must be inside segmented control");
      }
    }
    static get observedAttributes() {
      return ["checked"];
    }
    attributeChangedCallback(attr) {
      if (attr === "checked") {
        this.parentNode.setCheckedSegment([...parent.children].indexOf(this));
      }
    }
  }
);
