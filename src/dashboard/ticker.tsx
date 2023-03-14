import { createMemo, createSignal, For, onMount, splitProps } from "solid-js";
import { trackBounds } from "solid-boundaries";

export interface TickerProps {
  msgList: string[]
}

function Ticker(props: TickerProps) {

  const { ref: tickerRef, bounds: tickerBounds } = trackBounds();
  const { ref: containerRef, bounds: containerBounds } = trackBounds();

  let duration = createMemo(() => ((tickerBounds()?.width || 0) / (containerBounds()?.width || 0)) * 5);

  return (
    <div ref={containerRef} class="relative w-full h-full overflow-hidden whitespace-nowrap">
      <div
        ref={tickerRef}
        class="absolute min-w-full h-full flex gap-48 px-24"
        style={{
          "animation-name": "ticker1",
          "animation-timing-function": "linear",
          "animation-iteration-count": "infinite",
          "animation-duration": `${duration()}s`
        }}
      >
        <For each={props.msgList}>
          {(msg) => <div>{msg}</div>}
        </For>
      </div>
      <div
        class="absolute min-w-full h-full flex gap-48 px-24"
        style={{
          "animation-name": "ticker2",
          "animation-timing-function": "linear",
          "animation-iteration-count": "infinite",
          "animation-duration": `${duration()}s`
        }}
      >
        <For each={props.msgList}>
          {(msg) => <div>{msg}</div>}
        </For>
      </div>
    </div>
  )
}

export default Ticker;