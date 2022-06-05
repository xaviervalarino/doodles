import ControlPanel from "./components/control-panel.mjs";
import FormField from "./components/form-field.mjs";
import {
  SegmentedControl,
  SegmentItem,
} from "./components/segmented-control.mjs";

// mount components
window.addEventListener("load", () => {
  const template = document.querySelector("template");
  document.body.appendChild(template.content.cloneNode(true));
});
