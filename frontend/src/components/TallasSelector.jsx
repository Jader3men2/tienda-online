import React from 'react';

//metodo para seleccionar una talla antes de  agregar al carrito

const TallasSelector = ({ tallas, tallaSeleccionada, setTallaSeleccionada }) => {
  return (
    <div className="tallas-container">
      {tallas.map((talla) => (
        <div
          key={talla}
          className={`cuadro-talla ${tallaSeleccionada === talla ? 'seleccionada' : ''}`}
          onClick={() => setTallaSeleccionada(talla)}
        >
          {talla}
        </div>
      ))}
    </div>
  );
};

export default TallasSelector;
