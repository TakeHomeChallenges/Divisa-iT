import { useState, useEffect } from "react";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import CreditCardTask from "./components/CreditCardTask";
import TeamPointsTask from "./components/TeamPointsTask";
import DayOfTheWeek from "./components/DayOfTheWeek";
import CSSTask from "./components/CSSTask";
import TypescriptTask from "./components/TypescriptTask";
import "./App.css";

function App() {
  const [itemSelected, setItemSelected] = useState(0);

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
        {itemSelected === 3 ? <CSSTask /> : null}
        {itemSelected === 4 ? <TypescriptTask /> : null}
      </div>
    </>
  );
}

export default App;
