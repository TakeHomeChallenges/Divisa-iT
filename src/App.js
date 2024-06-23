import { useState, useEffect } from "react";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import CreditCardTask from "./components/CreditCardTask";
import TeamPointsTask from "./components/TeamPointsTask";
import DayOfTheWeek from "./components/DayOfTheWeek";
import "./App.css";

function App() {
  const [itemSelected, setItemSelected] = useState(2);

  useEffect(() => {
    console.log(itemSelected);
  }, [itemSelected]);

  return (
    <>
      <ResponsiveDrawer setItemSelected={setItemSelected} />
      <div className="App">
        {itemSelected === 0 ? <CreditCardTask /> : null}
        {itemSelected === 1 ? <TeamPointsTask /> : null}
        {itemSelected === 2 ? <DayOfTheWeek />  : null}
        {itemSelected === 3 ? "CSS" : null}
        {itemSelected === 4 ? "TypeScript" : null}
      </div>
    </>
  );
}

export default App;
