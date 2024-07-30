import { Spinner } from "./components/spinner.js";

const element = document.getElementById("spinner-container");

if (element) {
  const spinner = new Spinner(element);
  spinner.init();
}
