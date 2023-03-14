import { createMutable } from 'solid-js/store';

export enum Theme {
  Emerald = "Emerald"
}
export enum Font {
  amiri = "amiri",
  baloo = "baloo",
  elmessiri = "elmessiri",
  jomhuria = "jomhuria",
  lalezar = "lalezar",
  lateef = "lateef"
}

let _theme = (window.localStorage.getItem("theme") as unknown as Theme) || Theme.Emerald;
let _font = (window.localStorage.getItem("font") as unknown as Font) || Font.elmessiri;

export const global = createMutable({

  get theme() {
    return _theme;
  },
  set theme(value: Theme) {
    _theme = value;
    window.localStorage.setItem("theme", value);
  },

  get font() {
    return _font;
  },
  set font(value: Font) {
    _font = value;
    window.localStorage.setItem("font", value);
  },

});
