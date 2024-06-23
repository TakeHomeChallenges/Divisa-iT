import React from "react";
import CodeBlock from "../../helpers/codeBlock";

const TypescriptTask = () => {
  const originalCode = `
    import React, { useState, useEffect, useRef } from 'react';
    
    export function SampleView({ url }: { url: string }) {
      const [triggered, setTriggered] = useState<boolean>(false);
      const value = useRef<any>(null);
    
      useEffect(() => {
        if (!triggered) {
          fetch(url).then(response => {
            value.current = response;
            setTriggered(true);
          }).catch(e => console.error(e));
        }
      }, [triggered]);
    
      return <div>{\`\${value.current}\`}</div>;
    }`;

  const optimizedCode = `
    import React, { useState, useEffect } from 'react';
    
    export function SampleView({ url }: { url: string }) {
      const [data, setData] = useState<string | null>(null);
      const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);
    
      useEffect(() => {
        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then(text => {
            setData(text);
            setLoading(false);
          })
          .catch(e => {
            setError(e.message);
            setLoading(false);
          });
      }, [url]);
    
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;
      return <div>{data}</div>;
    }`;

  return (
    <div
      style={{
        margin: "55px auto",
        padding: "20px",
        maxWidth: "1000px",
        overflowX: "auto"
      }}
    >
      <h1>Explicación del Código Original</h1>
      <CodeBlock code={originalCode} />
      <p>
        El componente <code>SampleView</code> intenta cargar datos desde una URL
        y almacenar el resultado en un <code>ref</code>, usando un estado para
        controlar la carga inicial. A continuación se destacan varios problemas
        y áreas de mejora:
      </p>
      <ul>
        <li>
          <strong>
            Uso ineficaz de <code>useRef</code>:
          </strong>
          El uso de <code>useRef</code> para almacenar datos no provoca
          re-renderizaciones al cambiar los datos, lo que impide que la UI
          refleje los cambios automáticamente.
        </li>
        <li>
          <strong>
            Uso ineficaz de <code>useState</code>:
          </strong>
          El estado <code>triggered</code> se utiliza para evitar múltiples
          cargas, pero su manejo podría ser más transparente y simplificado.
        </li>
        <li>
          <strong>Error en la sintaxis JSX:</strong>
          Se utiliza incorrectamente la sintaxis de plantillas de cadenas en
          JSX. Debería usar llaves para incrustar expresiones JavaScript.
        </li>
        <li>
          <strong>Manejo de errores:</strong>
          Captura errores en la carga de datos pero sólo los registra en la
          consola, sin proporcionar retroalimentación adecuada al usuario.
        </li>
      </ul>

      <h2>Versión Optimizada del Código</h2>
      <p>
        A continuación, se muestra cómo podría optimizarse el código para
        mejorar la eficiencia, legibilidad y funcionalidad del componente:
      </p>
      <CodeBlock code={optimizedCode} />
      <ul>
        <li>
          <strong>useState para Datos:</strong> Ahora usamos{" "}
          <code>useState</code> para gestionar los datos, lo que garantiza que
          los cambios provoquen actualizaciones automáticas de la UI.
        </li>
        <li>
          <strong>Manejo de Estados de Carga y Error:</strong> Mejora la
          experiencia del usuario mostrando claramente los estados de carga y
          errores.
        </li>
        <li>
          <strong>Efectos bien definidos:</strong> El <code>useEffect</code> se
          define claramente para ejecutarse solo cuando la URL cambia, evitando
          ejecuciones innecesarias y posibles errores.
        </li>
      </ul>
    </div>
  );
};

export default TypescriptTask;
