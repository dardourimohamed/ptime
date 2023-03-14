import { createSignal, For, onCleanup, onMount, Show } from "solid-js";
import { invoke } from "@tauri-apps/api/tauri";
import { prayTimes } from "../../compute-prayer-time";
import { Clock } from "./Clock";
import dayjs, { Dayjs } from "dayjs";
import { createAnimationLoop } from "./utils";

import clockBg from '../../assets/default-bg.svg';
import Ticker from "../ticker";

prayTimes.setMethod("Karachi");

interface Times {
  asr: string,
  dhuhr: string,
  fajr: string,
  imsak: string,
  isha: string,
  maghrib: string,
  midnight: string,
  sunrise: string,
  sunset: string,
}

const getTimes = (): Times => {
  return prayTimes.getTimes(new Date(), [43, -80], -5);
}

function Default() {
  const [times, setTimes] = createSignal(getTimes());
  const [activeItem, setActiveItem] = createSignal(1);


  const [now, setNow] = createSignal<Dayjs>(dayjs());
  // const dispose = createAnimationLoop(() => {
  //   setNow(dayjs());
  // });
  // onCleanup(dispose);
  const dispose = setInterval(() => {
    setNow(dayjs());
  }, 1000);
  onCleanup(() => clearInterval(dispose));

  const [showMessage, setShowMessage] = createSignal(true);

  // onMount(() => setTimeout(() => invoke('move_mouse')));

  const ti = setInterval(() => setTimes(getTimes()), 60000);
  onCleanup(() => clearInterval(ti));

  // const a = setInterval(() => { const i = activeItem(); setActiveItem(i >= 5 ? 0 : i + 1) }, 3000);
  // onCleanup(() => clearInterval(a));

  const prayerList = [
    { title: "الصبح", azan: times().fajr, iqama: times().fajr },
    { title: "الشروق", azan: times().sunrise, iqama: times().sunrise },
    { title: "الضهر", azan: times().dhuhr, iqama: times().dhuhr },
    { title: "العصر", azan: times().asr, iqama: times().asr },
    { title: "المغرب", azan: times().maghrib, iqama: times().maghrib },
    { title: "العشاء", azan: times().isha, iqama: times().isha }
  ]

  const messages = [
    "بسم الله",
    "الحمد لله",
    "لا إلاه إلا الله",
    "الله أكبر",
  ]

  return (
    <div class="w-screen h-screen flex flex-row bg-[#053426] text-[#c2a25d]">
      <div class={`${showMessage() ? "h-[88.5vh]" : "h-[100vh]"} flex-1 grid grid-flow-row transition-all duration-1000 bg-[url('/src/assets/pattern.svg')] bg-repeat bg-[length:50vh_50vh]`}>
        <div class="grid grid-flow-col content-center grid-cols-3 gap-12 text-[min(6vw,6vh)] px-[1vw] bg-[#053426]">
          <div>&nbsp;</div>
          <div class="text-center">الأذان</div>
          <div class="text-center">الإقامة</div>
        </div>
        <For each={prayerList}>
          {(p, i) => <div class={`relative border-[#c2a25d] ${i() === activeItem() ? "border-y-[1vh] mb-0" : "bg-[#053426]"} transition-all duration-1000 overflow-hidden px-[1vw]`}>
            {/* <div class={`z-0 fixed -inset-9 m-auto  transition-all duration-1000 ${i() === activeItem() ? "opacity-100" : "opacity-0"}`}></div> */}
            <div class="z-10 relative">
              <div class="grid grid-flow-col content-center grid-cols-3">
                <div class={`transition-all duration-1000 ${i() === activeItem() ? 'text-[min(8vw,8vh)]' : 'text-[min(7vw,7vh)]'}`}>{p.title}</div>
                <div class={`text-center transition-all duration-1000 ${i() === activeItem() ? 'text-[min(8vw,8vh)]' : 'text-[min(7vw,7vh)]'}`}>{p.azan}</div>
                <div class={`text-center transition-all duration-1000 ${i() === activeItem() ? 'text-[min(8vw,8vh)]' : 'text-[min(7vw,7vh)]'}`}>{p.iqama}</div>
              </div>
              <div class={`text-[min(8vw,8vh)] transition-all duration-1000 ${i() === activeItem() ? 'h-[calc(min(8vw,8vh)*1.3)] opacity-100' : 'h-0 scale-y-75 opacity-0'}`}>
                الأذان بعد&nbsp;01:23:45
              </div>
            </div>
          </div>}
        </For>
      </div>
      <div class="h-full flex-none relative flex justify-center">
        <img src={clockBg} class="h-full" />
        <div class="absolute top-[15.4%] w-[40%] h-[40%]" onClick={() => setShowMessage(!showMessage())}>
          <Clock time={now()} smooth={false} />
          {/* <Clock time={dayjs()} smooth={true} /> */}
        </div>
        <div class={`absolute w-full ${showMessage() ? "top-[55%]" : "top-[62%]"} grid grid-cols-5 justify-items-stretch px-[18%] transition-all duration-1000`}>
          <div class="col-span-2 text-[min(7.5vw,7.5vh)]">{now().format('dddd')}</div>
          <div class="col-span-3 text-end text-[min(8vw,8vh)]">{now().format('LTS')}</div>
          <div class="col-span-3 text-start text-[min(7vw,7vh)]">{new Intl.DateTimeFormat('ar-TN-u-ca-islamic', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(now().toDate()).replace(" هـ", "")}</div>
          <div class="col-span-2 text-end text-[min(7vw,7vh)]">{new Intl.DateTimeFormat('ar-TN-u-ca-islamic', { month: 'long' }).format(now().toDate())}</div>
          <div class="col-span-3 text-start text-[min(7vw,7vh)]">{now().format('L')}</div>
          <div class="col-span-2 text-end text-[min(7vw,7vh)]">{now().format('MMM')}</div>
        </div>
      </div>
      <div class={`${showMessage() ? "h-[12.6vh]" : "h-0"} absolute w-full bottom-0 overflow-hidden bg-[#c2a25d] text-[#053426] flex text-[9vh] whitespace-nowrap transition-all duration-1000`}>
        <Ticker msgList={messages} />
      </div>
    </div>
  );
}

export default Default;
