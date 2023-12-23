import { createByPrefix } from "../ClassNamePrefix";
import { ColorTray } from "../ColorTray/ColorTray";
import { Slider } from "../Slider/Slider";
import "./ColorSelector.scss";

interface ColorSelectorProps {
  h: number;
  s: number;
  v: number;
  a: number;
  onHueChange?(h: number): void;
  onSaturationChange?(s: number): void;
  onBrightnessChange?(b: number): void;
  onAlphaChange?(a: number): void;
}
const createClassName = createByPrefix("selector");

export function ColorSelector(props: ColorSelectorProps) {
  return (
    <div class={createClassName("root")}>
      <ColorTray
        title="hue&saturation"
        hue={props.h}
        saturation={props.s}
        class={createClassName("tray-area")}
        onHueChange={props.onHueChange}
        onSaturationChange={props.onSaturationChange}
      ></ColorTray>
      <Slider
        title="saturation"
        percent={props.s}
        class={createClassName("saturation") + " " + createClassName("bar")}
        onPercentChange={props.onSaturationChange}
      />
      <Slider
        title="brightness"
        percent={props.v}
        class={createClassName("brightness") + " " + createClassName("bar")}
        onPercentChange={props.onBrightnessChange}
      />
      <Slider
        title="alpha"
        percent={props.a}
        class={createClassName("alpha") + " " + createClassName("bar")}
        onPercentChange={props.onAlphaChange}
      />
    </div>
  );
}
