import { useEffect, useState } from "react";
import "./App.css";
import { useViewportSize, useVirtualKeyboardOpened } from "./useViewport";

const appMargin = 10;

function App() {
  const [inputElem, setInputElem] = useState<HTMLInputElement | null>(null);
  const viewportSize = useViewportSize();
  const isVirtualKeyboardOpened = useVirtualKeyboardOpened(inputElem);

  // This is a demo project, update app size directly for simplicity
  // use the width and height for your own purposes :)
  useEffect(() => {
    const { width, height } = viewportSize;
    const appElement = document.querySelector("#app") as HTMLElement | null;
    if (appElement) {
      appElement.style.width = `${width - appMargin * 2}px`;
      appElement.style.height = `${height - appMargin * 2}px`;
    }
  }, [viewportSize]);

  return (
    <div id="app">
      <h3>VisualViewport Test</h3>
      <div id="content">
        <div id="output">
          <p>
            Virtual keyboard opened:
            {isVirtualKeyboardOpened === undefined
              ? "Unknown"
              : isVirtualKeyboardOpened
              ? "Yes"
              : "No"}
            {
              <p>
                Window inner size: W:{window.innerWidth}, H:{window.innerHeight}
              </p>
            }
            {viewportSize && (
              <p>
                Visual viewport size: W:{viewportSize.width}, H:
                {viewportSize.height}
              </p>
            )}
          </p>
        </div>
        <input ref={setInputElem} type="text" placeholder="This is an input" />
      </div>
    </div>
  );
}

export default App;
