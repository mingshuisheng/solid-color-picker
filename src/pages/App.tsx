import { createSignal } from "solid-js";
import { ColorPicker } from "../components";
import "./App.scss";

function App() {
  const [color, setColor] = createSignal({ h: 10, s: 0.5, v: 1 });

  return (
    <div class="app-root">
      <ColorPicker
        color={color()}
        onColorChange={setColor}
        class="custom-color-picker"
      />
    </div>
  );
}

export default App;
