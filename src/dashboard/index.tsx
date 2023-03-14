import { prayTimes } from "../compute-prayer-time";
import { global, Theme } from "../store/global";
import Default from "./default.tsx/Default";

prayTimes.setMethod("Karachi");
const times = prayTimes.getTimes(new Date(), [43, -80], -5);

console.log(times);

function Dashboard() {

  return (
    <div>
      {global.theme === Theme.Emerald ? <Default /> : <Default />}
    </div>
  );
}

export default Dashboard;
