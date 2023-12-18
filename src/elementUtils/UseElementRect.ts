import { createSignal, onMount, onCleanup } from "solid-js";

export function useElementRect(el: () => HTMLElement) {
  const initRect = {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  };

  const [rect, setRect] = createSignal<typeof initRect>(initRect);

  const resizeObserver = new ResizeObserver(() => {
    let boundingRect = el().getBoundingClientRect();
    setRect({
      width: el().clientWidth,
      height: el().clientHeight,
      left: boundingRect.left,
      top: boundingRect.top,
    });
  });

  onMount(() => {
    resizeObserver.observe(el());
  });

  onCleanup(() => {
    resizeObserver.unobserve(el());
  });

  return rect;
}
