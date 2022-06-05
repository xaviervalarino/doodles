import ControlPanel from "./components/control-panel.js";
import FormField from "./components/form-field.js";
import {
  SegmentedControl,
  SegmentItem,
} from "./components/segmented-control.js";
import textCanvas from "./text-canvas.js";

// mount components
window.onload = () => {
  const template = document.querySelector("template");
  document.body.appendChild(template.content.cloneNode(true));
};

window.addEventListener("update", (e) => {
  textCanvas(e.detail)
});
