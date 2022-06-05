export class SegmentedControl extends HTMLElement {
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
    const parent = this.parentNode
    if (attr === "checked") {
      parent.setCheckedSegment([...parent.children].indexOf(this));
    }
  }
}

customElements.define("segmented-control", SegmentedControl);
customElements.define("segment-item", SegmentItem);
