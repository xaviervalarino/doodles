import ControlPanel from "./components/control-panel.js";
import FormField from "./components/form-field.js";
import {
  SegmentedControl,
  SegmentItem,
} from "./components/segmented-control.js";
import TextCanvas from "./components/text-canvas.js";

let canvas;

window.onload = () => {
  // mount components
  const template = document.querySelector("template");
  document.body.appendChild(template.content.cloneNode(true));
  canvas = document.querySelector("text-canvas");
};

window.addEventListener("update", ({ detail }) => {
  if (canvas && "setAttribute" in canvas) {
    canvas.setAttribute(detail.id, detail.value);
  }
});
