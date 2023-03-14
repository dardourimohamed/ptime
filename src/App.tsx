import dayjs from "dayjs";
import Dashboard from "./dashboard";
import { global } from "./store/global";
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/ar-tn'
import { onMount } from "solid-js";
import { appWindow } from '@tauri-apps/api/window';

dayjs.extend(localizedFormat)
dayjs.locale("ar-TN")

function App() {

  onMount(() => setTimeout(appWindow.show, 1000));

  return (
    <div class={`font-${global.font}`}>
      <Dashboard />

    </div>
  );
}

export default App;
