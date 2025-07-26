import { Link } from 'react-router-dom';
import React from 'react';

function NotFound() {
  return (
    <section>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, esta ruta no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </section>
  );
}

export default NotFound;
