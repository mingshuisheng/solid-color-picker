import tinycolor from "tinycolor2";

export * from "./components";

export function hslaToHex8(hsla: tinycolor.ColorFormats.HSLA) {
  return tinycolor(hsla).toHex8();
}

export function hexToHsla(hex: string): tinycolor.ColorFormats.HSLA {
  const color = tinycolor(hex);
  return {
    ...color.toHsl(),
    a: color.getAlpha(),
  };
}
