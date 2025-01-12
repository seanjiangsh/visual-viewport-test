import { useEffect, useState } from "react";
import "./App.css";
import useViewportSize from "./useViewportSize";

const appMargin = 20;

function App() {
  const [inputValue, setInputValue] = useState("");
  const viewportSize = useViewportSize();

  // This is a demo project, update app size directly for simplicity
  // use the width and height for your own purposes :)
  useEffect(() => {
    const [width, height] = viewportSize;
    const appElement = document.querySelector("#app") as HTMLElement | null;
    if (appElement) {
      appElement.style.width = `${width - appMargin * 2}px`;
      appElement.style.height = `${height - appMargin * 2}px`;
    }
  }, [viewportSize]);

  return (
    <div id="app">
      <h1>VisualViewport Test</h1>
      <div id="content">
        <input
          type="text"
          placeholder="This is an input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div id="output">
          {viewportSize && (
            <>
              <p>Width: {viewportSize[0]}</p>
              <p>Height: {viewportSize[1]}</p>
            </>
          )}
          <p>{inputValue}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
