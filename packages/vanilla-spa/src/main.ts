import "./style.css";

const { visualViewport } = window;
const appMargin = 20;

function updateViewportSize() {
  const output = document.querySelector("#output");
  if (!output) return;

  let width, height;

  output.innerHTML = `
  <p>Window inner size: W: ${window.innerWidth}, H: ${window.innerHeight}</p>
`;

  if (visualViewport) {
    width = Math.round(visualViewport.width);
    height = Math.round(visualViewport.height);
    output.innerHTML += `<p>Visual viewport size: W: ${width}, H: ${height}</p>`;

    const isKeyboardOpened = height < window.innerHeight;
    output.innerHTML += `
    <p>Virtual keyboard opened: ${isKeyboardOpened ? "Yes" : "No"}</p>
  `;
  } else {
    width = window.innerWidth;
    height = window.innerHeight;
    output.innerHTML = "<p>Visual viewport API is not supported</p>";
  }

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
