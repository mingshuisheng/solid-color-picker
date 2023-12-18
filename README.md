## Solid Color Picker Component

### install

#### npm

```shell
npm install @mingshuisheng/solid-color-picker
```

#### yarn

```shell
yarn add @mingshuisheng/solid-color-picker
```

#### pnpm

```shell
pnpm add @mingshuisheng/solid-color-picker
```

### Usage

```jsx
import { createSignal } from "solid-js";
import { ColorPicker } from "@mingshuisheng/solid-color-picker";
import "@mingshuisheng/solid-color-picker/style";

function App() {
  const [color, setColor] = createSignal({ h: 10, s: 0.5, v: 1 });

  return (
    <div style={{ width: "800px" }}>
      <ColorPicker color={color()} onColorChange={setColor} />
    </div>
  );
}

export default App;
```
