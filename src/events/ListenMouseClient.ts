import { onCleanup, onMount } from "solid-js";

export function listenMouseClient(
  trackEl: () => HTMLElement,
  onMouseLeft: (clientX: number, clientY: number) => void
) {
  const updatePercent = (e: MouseEvent) => {
    if (e.button !== 0) return;
    onMouseLeft(e.clientX, e.clientY);
  };

  const onMove = updatePercent;
  const onMouseUp = () => cleanWindowEvent();
  const onMouseDown = (e: MouseEvent) => {
    if (e.button !== 0) return;
    updatePercent(e);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onMouseUp);
  };
  const cleanWindowEvent = () => {
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  onMount(() => {
    trackEl().addEventListener("mousedown", onMouseDown);
  });

  onCleanup(cleanWindowEvent);
}
