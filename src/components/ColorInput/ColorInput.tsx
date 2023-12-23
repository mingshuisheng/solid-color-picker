import debounce from "debounce";
import { createByPrefix } from "../ClassNamePrefix";
import { CopySvg } from "../Copy";
import tinyColor from "tinycolor2";
import "./ColorInput.scss";

const createClassName = createByPrefix("color-input");

interface ColorInputProps {
  currentColor: tinyColor.Instance;
  onCurrentColorChange?(newColor: tinyColor.Instance): void;
}

export function ColorInput(props: ColorInputProps) {
  const handleColorChange = debounce((v: string) => {
    if (!props.onCurrentColorChange) return;
    const newColor = tinyColor(v);
    if (newColor.isValid()) {
      props.onCurrentColorChange(newColor);
    }
  }, 900);

  const getAlpha = () => {
    const a = props.currentColor.getAlpha();
    return a.toFixed(2);
  };

  const toRgbaString = () => {
    const { r, g, b } = props.currentColor.toRgb();
    return `rgba(${r}, ${g}, ${b}, ${getAlpha()})`;
  };

  const toHsvaString = () => {
    const { h, s, v } = props.currentColor.toHsv();
    return `hsva(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(
      v * 100
    )}%, ${getAlpha()})`;
  };

  const toHslString = () => {
    const { h, s, l } = props.currentColor.toHsl();
    return `hsla(${Math.round(h)}, ${Math.round(s * 100)}, ${Math.round(
      l * 100
    )}, ${getAlpha()})`;
  };

  return (
    <div class={createClassName("root")}>
      <div>
        <div class={createClassName("current-color")}></div>
      </div>
      <ColorInputLine
        label="hex"
        value={props.currentColor.toHex8String()}
        onValueChange={handleColorChange}
        prefix="#"
        suffix=""
      />
      <ColorInputLine
        label="rgba"
        value={toRgbaString()}
        prefix="rgba("
        suffix=")"
        onValueChange={(v) => handleColorChange(`rgba(${v})`)}
      />
      <ColorInputLine
        label="hsva/hsba"
        value={toHsvaString()}
        prefix="hsva("
        suffix=")"
        onValueChange={(v) => handleColorChange(`hsva(${v})`)}
      />
      <ColorInputLine
        label="hsla"
        value={toHslString()}
        prefix="hsla("
        suffix=")"
        onValueChange={(v) => handleColorChange(`hsla(${v})`)}
      />
    </div>
  );
}

interface ColorInputLineProps {
  label: string;
  value: string;
  prefix: string;
  suffix: string;
  onValueChange?(value: string): void;
}

function ColorInputLine(props: ColorInputLineProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(props.value);
  };
  return (
    <div class={createClassName("line")}>
      <div class={createClassName("label")}>{props.label}:</div>
      <input
        type="text"
        value={props.value.replace(props.prefix, "").replace(props.suffix, "")}
        onInput={(e) => {
          props.onValueChange?.(
            `${props.prefix}${e.target.value}${props.suffix}`
          );
        }}
      />
      <div class={createClassName("copy")} onclick={handleCopy}>
        <CopySvg />
      </div>
    </div>
  );
}
