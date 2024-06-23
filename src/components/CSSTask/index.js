// Card.js
import React, { useState } from "react";
import "./style.css";

const CSSTask = () => {
  // Estado para manejar el índice del elemento activo
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <ul className="custom-list">
      {["Titulo 1", "Titulo 2", "Titulo 3"].map((title, index) => (
        <li
          key={title}
          className="custom-item"
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(0)}  // Vuelve al primer elemento por defecto al dejar de hacer hover
        >
          <section>
            <h1 style={{ backgroundColor: activeIndex === index ? 'lightpink' : 'white' }}>
              {title}
            </h1>
            <p className="description" style={{ display: activeIndex === index ? 'block' : 'none' }}>
              Descripcion de la seccion {index + 1}
            </p>
          </section>
        </li>
      ))}
    </ul>
  );
};

export default CSSTask;
