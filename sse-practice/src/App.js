import { useState } from "react";
import Alarm from "./Alarm";
import EventComponent from "./component";
import Layout from "./layout";

function App() {
  const [alarm, setAlarm] = useState(false);

  return (
    <div>
      <Layout setAlarm={setAlarm} />
      <Alarm alarm={alarm} setAlarm={setAlarm} />
    </div>
  );
}

export default App;
