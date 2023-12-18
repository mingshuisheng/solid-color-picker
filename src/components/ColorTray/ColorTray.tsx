import { useElementRect } from "../../elementUtils";
import { batch, createMemo } from "solid-js";
import { rangeLimit, toDegrees, toRadians } from "../../numberUtils";
import { listenMouseClient } from "../../events";
import { CartesianCoordinate, PolarCoordinate } from "../../coordinate";
import "./ColorTray.scss";
import { createByPrefix } from "../ClassNamePrefix";

interface HueAndSaturation {
  hue: number;
  saturation: number;
}

export interface ColorTrayProps extends HueAndSaturation {
  onHueChange?(hue: number): void;
  onSaturationChange?(saturation: number): void;
  class?: string | undefined;
}
const createClassName = createByPrefix("color-tray");
export function ColorTray(props: ColorTrayProps) {
  let tray: HTMLDivElement = null as any;
  const getTray = () => tray;
  const trayRect = useElementRect(getTray);
  const ballSize = () => Math.max(trayRect().height * 0.05, 10);
  const ballRadius = () => ballSize() / 2;
  const trayRadius = () => trayRect().height / 2 - ballRadius();
  const trayRealRadius = () => trayRect().height * 0.5;
  const centerX = () => trayRect().left + trayRealRadius();
  const centerY = () => trayRect().top + trayRealRadius();

  const position = createMemo(() => {
    const hue = props.hue ?? 0;
    const saturation = props.saturation ?? 0;
    let distance = trayRadius() * saturation;

    const { x: ballCenterX, y: ballCenterY } = distanceAndAngleToPoint(
      distance,
      hue,
      centerX(),
      centerY()
    );

    return {
      left: ballCenterX - ballRadius() - trayRect().left,
      top: ballCenterY - ballRadius() - trayRect().top,
    } as const;
  });

  listenMouseClient(getTray, (clientX, clientY) => {
    const { distance, angle } = PointToHueAndSaturation(
      centerX(),
      centerY(),
      clientX,
      clientY
    );

    const hue = angle;
    const saturation = rangeLimit(distance / trayRadius(), 0, 1);

    batch(() => {
      props.onHueChange?.(hue);
      props.onSaturationChange?.(saturation);
    });
  });
  const rootClass = () => {
    if (props.class) {
      return `${createClassName("root")} ${props.class}`;
    } else {
      return createClassName("root");
    }
  };
  return (
    <div
      ref={tray}
      class={rootClass()}
      style={{ "--size": trayRadius() + "px" }}
    >
      <div
        class={createClassName("ball")}
        style={{
          width: ballSize() + "px",
          height: ballSize() + "px",
          left: position().left + "px",
          top: position().top + "px",
        }}
      />
    </div>
  );
}

const offsetTheta = toRadians(90);

function PointToHueAndSaturation(
  centerX: number,
  centerY: number,
  currentX: number,
  currentY: number
) {
  const center = new CartesianCoordinate(centerX, centerY);
  const current = new CartesianCoordinate(currentX, currentY);
  const cartesianCoordinate = current.translate(-center.x, -center.y);
  const polarCoordinate = cartesianCoordinate
    .toPolarCoordinate()
    .translateTheta(offsetTheta);

  return {
    angle: toDegrees(polarCoordinate.theta),
    distance: polarCoordinate.rou,
  } as const;
}

function distanceAndAngleToPoint(
  distance: number,
  angle: number,
  centerX: number,
  centerY: number
): { x: number; y: number } {
  const center = new CartesianCoordinate(centerX, centerY);
  const polarCoordinate = new PolarCoordinate(
    distance,
    toRadians(angle)
  ).translateTheta(-offsetTheta);
  const cartesianCoordinate = polarCoordinate
    .toCartesianCoordinate()
    .translate(center.x, center.y);
  return {
    x: cartesianCoordinate.x,
    y: cartesianCoordinate.y,
  };
}
