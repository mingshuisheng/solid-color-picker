import { createByPrefix } from "../ClassNamePrefix";
import { ColorTray } from "../ColorTray/ColorTray";
import { Slider } from "../Slider/Slider";
import "./ColorSelector.scss";

interface ColorSelectorProps {
  h: number;
  s: number;
  v: number;
  onHueChange?(h: number): void;
  onSaturationChange?(s: number): void;
  onBrightnessChange?(b: number): void;
}
const createClassName = createByPrefix("selector");

export function ColorSelector(props: ColorSelectorProps) {
  return (
    <div class={createClassName("root")}>
      <ColorTray
        hue={props.h}
        saturation={props.s}
        class={createClassName("tray-area")}
        onHueChange={props.onHueChange}
        onSaturationChange={props.onSaturationChange}
      ></ColorTray>
      <Slider
        percent={props.s}
        class={createClassName("saturation")}
        onPercentChange={props.onSaturationChange}
      />
      <Slider
        percent={props.v}
        class={createClassName("brightness")}
        onPercentChange={props.onBrightnessChange}
      />
    </div>
  );
}
