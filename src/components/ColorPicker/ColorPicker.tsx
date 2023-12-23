import { createMemo } from "solid-js";
import { createByPrefix } from "../ClassNamePrefix";
import "./ColorPicker.scss";
import tinyColor from "tinycolor2";
import { ColorSelector } from "../ColorSelector/ColorSelector";
import { ColorInput } from "../ColorInput/ColorInput";

type ColorType = tinyColor.ColorFormats.HSVA;
const formColor = tinyColor;

export interface ColorPickerProps {
  color: ColorType;
  onColorChange?(color: ColorType): void;
  class?: string | undefined;
}

const createClassName = createByPrefix("color-picker");

export function ColorPicker(props: ColorPickerProps) {
  const currentColor = createMemo(() => formColor(props.color));
  const setHue = (h: number) => {
    props.onColorChange?.({ ...props.color, h });
  };

  const setSaturation = (s: number) => {
    props.onColorChange?.({ ...props.color, s });
  };

  const setBrightness = (v: number) => {
    props.onColorChange?.({ ...props.color, v });
  };

  const setAlpha = (a: number) => {
    props.onColorChange?.({ ...props.color, a });
  };

  const currentHsl = () => currentColor().toHsl();

  const handleInputColor = (newColor: tinyColor.Instance) => {
    props.onColorChange?.(newColor.toHsv());
  };

  const rootClass = () => {
    if (props.class) {
      return `${createClassName("root")} ${props.class}`;
    } else {
      return createClassName("root");
    }
  };

  return (
    <div
      class={rootClass()}
      style={{
        "--cur-hue": Math.floor(props.color.h),
        "--cur-saturation": Math.floor(currentHsl().s * 100) + "%",
        "--cur-lightness": Math.floor(currentHsl().l * 100) + "%",
        "--cur-alpha": currentHsl().a.toFixed(2),
      }}
    >
      <ColorSelector
        h={props.color.h}
        s={props.color.s}
        v={props.color.v}
        a={props.color.a}
        onHueChange={setHue}
        onSaturationChange={setSaturation}
        onBrightnessChange={setBrightness}
        onAlphaChange={setAlpha}
      />
      <ColorInput
        currentColor={currentColor()}
        onCurrentColorChange={handleInputColor}
      />
    </div>
  );
}
