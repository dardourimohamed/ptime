import { Component, splitProps } from 'solid-js';

type HandProps = { class: string; length: number; width: number; deg: number, duration?: number };

export const Hand: Component<HandProps> = (props) => {
  const [local, rest] = splitProps(props, ['length', 'width', 'deg', 'duration']);

  return (
    <line
      y2={-local.length}
      stroke="currentColor"
      stroke-width={local.width}
      stroke-linecap="round"
      filter="url(#f3)"
      {...(
        local.duration ? {
          style: {
            "animation-delay": `${- (local.duration * (local.deg / 360)) + 0.5}s`,
            "animation-name": "clock",
            "animation-timing-function": "linear",
            "animation-iteration-count": "infinite",
            "animation-duration": `${local.duration}s`
          }
        } : {
          style: {
            "transform": `rotate(${local.deg}deg)`
          }
        }
      )}
      {...rest}
    />
  );
};
