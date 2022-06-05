export class SegmentedControl extends HTMLElement {
  #style = `
    <style>
      fieldset {
        display: inline-grid;
        grid-template-columns: repeat(${
          this.querySelectorAll("segment-item").length
        }, 1fr); 
        border: 0;
        outline: 0;
        background: #222;
        border-radius: 12px;
        padding: 4px; 
      }
      div {
        flex: 1 1 0;
        position:relative;
        text-align: center;
        padding: 0.5rem 0.75rem;
        background: #444;
        transition: background 0.1s ease-in;
      } 
      div:first-child {
        border-radius: 8px 0 0 8px;
      }
      div:last-child {
        border-radius: 0 8px 8px 0;
      }
      div.selected {
        background:  #666;
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        opacity: 0;
      }
    </style>
  `;

  #segments = [...this.querySelectorAll("segment-item")].map((n) => {
    const text = n.textContent;
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

    this.inputs = [...shadow.querySelectorAll("input")];
    this.segments = [...shadow.querySelectorAll("div")];
  }

  setCheckedSegment(index) {
    this.inputs.forEach((input, i) => {
      if (index === i) {
        input.setAttribute("checked", true);
        input.parentNode.classList.add("selected");
      } else {
        input.removeAttribute("checked");
        input.parentNode.classList.remove("selected");
      }
    });
  }

  connectedCallback() {
    this.segments.forEach((segment, i) => {
      segment.onclick = () => this.setCheckedSegment(i);
    });
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

export class SegmentItem extends HTMLElement {
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
    const parent = this.parentNode;
    if (attr === "checked") {
      parent.setCheckedSegment([...parent.children].indexOf(this));
    }
  }
}

customElements.define("segmented-control", SegmentedControl);
customElements.define("segment-item", SegmentItem);
