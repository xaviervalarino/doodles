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
    #component = `
      <fieldset>
        <slot></slot>
      </fieldset>
    `;
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
      const template = document.createElement("template");
      template.innerHTML = this.#style + this.#component;
      shadow.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
      console.log('segmented control mounted')
    }

    static get observedAttributes() {
      return ['name']
    }

    attributeChangedCallback(attr, _, value) {
      if (attr === 'name') {
        console.log('selectorAll', this.querySelectorAll('segment-item'))
        for (const segment of this.querySelectorAll('segment-item')) {
          segment.setAttribute('name', value)
          segment.setAttribute('data-shadow', this.shadow)
        }
      }
    }
  }
);

// light DOM
customElements.define(
  "segment-item",
  class extends HTMLElement {
    #style = `
    <style>
      segment-item {
        background: red;
        cursor: pointer;
      }
      segment-item light-dom {
        cursor: pointer;
      }
      segment-item input[type="radio"] {
        opacity: 0.2;
        width: 100%;
        height: 2.75rem;
        position: absolute
      }
      segment-item label {
        background: purple;
        padding: 1rem;
        height: 5rem;
      }
    </style>
    `
    #component = `
      <div>
        <input
          name
          type="radio"
          id="${this.textContent.toLowerCase()}"
          value="${this.textContent.toLowerCase()}"
        /> 
        <label for=${this.textContent.toLowerCase()}>
          <slot>${this.textContent}</slot>
        </label>
      </div>
    `;

    constructor() {
      super();
      const shadow = this.parentNode.shadowRoot
      const template = document.createElement('template')
      this.innerHTML = ''
      template.innerHTML = this.#style + this.#component;
      if (this.parentNode.tagName === 'SEGMENTED-CONTROL') {
        this.appendChild(template.content.cloneNode(true))
      } else {
        console.error('<segment-item> must be inside segmented control')
      }
      this.radio = this.querySelector('input')
    }

    connectedCallback() {
      if (this.parentNode.tagName === 'SEGMENTED-CONTROL') {
        console.log(this.children)
        // this.parentElement.appendChild(this)
        this.radio = this.querySelector('input')
      }
      // console.log('this is the callback')
      // console.log('shadowRoot',this.parentNode.shadowRoot)
      // this.parentNode.addEventListener('shadow', (e) => {
      //   console.log('shadow event', e)
      // })
    }
    static get observedAttributes() {
      return ['name', 'data-shadow']
    }

    attributeChangedCallback(attr, _, value) {
      if (attr === 'name') {
        this.radio.setAttribute('name', value)
      }
    }
  }
);
