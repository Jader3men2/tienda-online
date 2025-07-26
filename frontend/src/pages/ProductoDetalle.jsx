import { useParams } from 'react-router-dom';

function ProductoDetalle() {
  const { id } = useParams();

  return (
    <section>
      <h2>Detalle del Producto</h2>
      <p>Mostrando detalles del producto con ID: {id}</p>
    </section>
  );
}

export default ProductoDetalle;
