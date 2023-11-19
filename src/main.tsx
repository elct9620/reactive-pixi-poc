import ReactDOM from "react-dom/client";
import container, { InjectContext } from "@/container";
import App from "./App.tsx";
import { Subscribe } from "@react-rxjs/core";
import { Stage } from "@pixi/react";
import "pixi.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <InjectContext.Provider value={{ container }}>
    <Subscribe>
      <Stage options={{ backgroundColor: 0x1c0f14 }}>
        <App />
      </Stage>
    </Subscribe>
  </InjectContext.Provider>,
);
