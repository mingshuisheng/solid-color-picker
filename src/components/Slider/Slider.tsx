import { useElementRect } from "../../elementUtils";
import { listenMouseClient } from "../../events";
import { rangeLimit } from "../../numberUtils/RangeLimit";
import { createByPrefix } from "../ClassNamePrefix";
import "./Slider.scss";
import { type JSX } from "solid-js";

export interface SliderProps {
  class?: string | undefined;
  style?: JSX.CSSProperties | string;
  percent?: number;
  title?: string;
  onPercentChange?: (percent: number) => void;
}
const createClassName = createByPrefix("slider");
export function Slider(props: SliderProps) {
  let track: HTMLDivElement = null as any;
  const getTrackEl = () => track;
  const trackRect = useElementRect(getTrackEl);
  const ballSize = () => trackRect().height * 0.95;
  const offset = () => 1;
  const trackSize = () => trackRect().width - ballSize() - offset() * 2;
  const percent = () => rangeLimit(props.percent, 0, 1);
  const ballLeft = () =>
    rangeLimit(offset() + trackSize() * percent(), offset(), trackSize());

  listenMouseClient(getTrackEl, (clientX: number) => {
    const trackOffsetX = clientX - trackRect().left;
    const offsetX = trackOffsetX - offset() - ballSize() / 2;
    let nextPercent = rangeLimit(offsetX / trackSize(), 0, 1);
    props.onPercentChange?.(nextPercent);
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
      ref={track}
      class={rootClass()}
      style={props.style}
      title={props.title}
    >
      <div
        class={createClassName("ball")}
        style={{
          width: ballSize() + "px",
          height: ballSize() + "px",
          left: ballLeft() + "px",
        }}
      />
    </div>
  );
}
