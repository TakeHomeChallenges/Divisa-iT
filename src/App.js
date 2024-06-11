import { useState, useEffect } from "react";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import "./App.css";

function App() {
  const [itemSelected, setItemSelected] = useState(2);


  useEffect(() => {
    console.log(itemSelected);
  }, [itemSelected]); 

  return (
    <div className="App">
      <header className="App-header">
        <ResponsiveDrawer setItemSelected={setItemSelected}>

      {itemSelected === 0 ? "Tarjeta de credito": null}
      {itemSelected === 1 ? "Juegos de equipos": null}
      {itemSelected === 2 ? "Dias de la semana": null}
      {itemSelected === 3 ? "CSS": null}
      {itemSelected === 4 ? "TypeScript": null}

        </ResponsiveDrawer>
      </header>
    </div>
  );
}

export default App;
