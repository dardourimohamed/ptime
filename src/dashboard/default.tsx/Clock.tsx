import { createMemo } from 'solid-js';
import { Hand } from './ClockHand';
import type { Component } from 'solid-js';
import { Dayjs } from 'dayjs';

const getSecondsSinceMidnight = (time: Dayjs): number => time.diff(time.startOf('day'), 'milliseconds') / 1000;

type ClockProps = {
  time: Dayjs
  smooth: boolean;
};

export const Clock: Component<ClockProps> = (props) => {

  const time = createMemo(() => {
    return getSecondsSinceMidnight(props.time)
  });

  return (
    <div class="flex justify-center items-center flex-wrap h-full w-full">
      <svg viewBox="0 0 200 200" width="100%">
        <g transform="translate(100, 100)">
          <Hand deg={((((time() / 60 / 60) % 12) / 12) * 360)} duration={props.smooth ? (60 * 60 * 12) : undefined} class="" length={50} width={5} />
          <Hand deg={((((time() / 60) % 60) / 60) * 360)} duration={props.smooth ? (60 * 60) : undefined} class="" length={70} width={3} />
          <Hand deg={((((time()) % 60) / 60) * 360)} duration={props.smooth ? (60) : undefined} class="" length={80} width={1} />
        </g>
      </svg>
    </div>
  );
};
