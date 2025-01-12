import "./style.css";

const { visualViewport } = window;
const appMargin = 20;

function updateViewportSize() {
  const output = document.querySelector("#output");
  if (!output) return;

  let width, height;

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    output.innerHTML = "<p>Visual viewport size:</p>";
  } else {
    width = window.innerWidth;
    height = window.innerHeight;
    output.innerHTML =
      "<p>Visual viewport API is not supported. Using window inner size.</p>";
  }

  width = Math.round(width);
  height = Math.round(height);

  output.innerHTML += `
    <p>Width: ${width}</p>
    <p>Height: ${height}</p>
  `;

  // This is a demo project, update app size directly for simplicity
  // use the width and height for your own purposes :)
  const appElement = document.querySelector("#app") as HTMLElement | null;
  if (appElement) {
    appElement.style.width = `${width - appMargin * 2}px`;
    appElement.style.height = `${height - appMargin * 2}px`;
  }

  fixScroll();
}

function fixScroll() {
  scrollTo(0, 0);
}

if (visualViewport) {
  visualViewport.addEventListener("resize", updateViewportSize);
} else {
  window.addEventListener("resize", updateViewportSize);
}

window.addEventListener("load", updateViewportSize);
window.addEventListener("scroll", fixScroll);
