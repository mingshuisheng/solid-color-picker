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
  return (
    <div class={createClassName("root")}>
      <div>
        <div class={createClassName("current-color")}></div>
      </div>
      <ColorInputLine
        label="hex"
        value={"#" + props.currentColor.toHex()}
        onValueChange={handleColorChange}
        prefix="#"
        suffix=""
      />
      <ColorInputLine
        label="rgb"
        value={props.currentColor.toRgbString()}
        prefix="rgb("
        suffix=")"
        onValueChange={(v) => handleColorChange(`rgb(${v})`)}
      />
      <ColorInputLine
        label="hsv/hsb"
        value={props.currentColor.toHsvString()}
        prefix="hsv("
        suffix=")"
        onValueChange={(v) => handleColorChange(`hsv(${v})`)}
      />
      <ColorInputLine
        label="hsl"
        value={props.currentColor.toHslString()}
        prefix="hsl("
        suffix=")"
        onValueChange={(v) => handleColorChange(`hsl(${v})`)}
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
