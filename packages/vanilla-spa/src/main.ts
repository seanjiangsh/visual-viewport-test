import "./style.css";

const { visualViewport } = window;

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

  output.innerHTML += `
    <p>Width: ${width}</p>
    <p>Height: ${height}</p>
  `;
  const bodyStyle = document.body.style;
  bodyStyle.width = `${width}px`;
  bodyStyle.height = `${height}px`;

  fixScroll();
}

function fixScroll() {
  window.scrollTo(0, 0);
}

if (visualViewport) {
  visualViewport.addEventListener("resize", updateViewportSize);
} else {
  window.addEventListener("resize", updateViewportSize);
}

window.addEventListener("load", updateViewportSize);
window.addEventListener("scroll", fixScroll);
