import { useEffect, useState } from "react";
import "./App.css";
import useViewportSize from "./useViewportSize";

function App() {
  const [inputValue, setInputValue] = useState("");
  const viewportSize = useViewportSize();

  // This is a demo project, update body size directly for simplicity
  // use the width and height for your own purposes :)
  useEffect(() => {
    const [width, height] = viewportSize;
    const bodyStyle = document.body.style;
    bodyStyle.width = `${width}px`;
    bodyStyle.height = `${height}px`;
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
