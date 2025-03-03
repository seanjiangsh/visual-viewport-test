import "./style.css";

const { visualViewport } = window;
const appMargin = 10;
const initVpHeight = visualViewport?.height;

function updateViewportSize() {
  const output = document.querySelector("#output");
  if (!output) return;

  if (visualViewport) {
    const visualVpHeight = visualViewport?.height;
    if (visualVpHeight === undefined || initVpHeight === undefined) return;

    const inputElem = document.querySelector("input");
    const isActiveElement = document.activeElement === inputElem;
    const isViewportHeightSmaller = visualVpHeight < initVpHeight;
    const isKeyboardOpened = isActiveElement && isViewportHeightSmaller;

    output.innerHTML = `
    <p>Virtual keyboard opened: ${isKeyboardOpened ? "Yes" : "No"}</p>
    `;
    output.innerHTML += `<p>Visual viewport size: W: ${visualViewport.width}, H: ${visualVpHeight}</p>`;
    output.innerHTML += `
    <p>Window inner size: W:${window.innerWidth}, H:${window.innerHeight}</p>
  `;
  } else {
    output.innerHTML = "<p>Visual viewport API is not supported</p>";
  }

  // This is a demo project, update app size directly for simplicity
  // use the width and height for your own purposes :)
  const width = visualViewport?.width || window.innerWidth;
  const height = visualViewport?.height || window.innerHeight;
  const appElement = document.querySelector("#app") as HTMLElement | null;
  if (appElement) {
    appElement.style.width = `${Math.round(width) - appMargin * 2}px`;
    appElement.style.height = `${Math.round(height) - appMargin * 2}px`;
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
