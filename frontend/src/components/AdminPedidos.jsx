import React, { useState, useEffect } from "react";

const AdminPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(pedidos);

  //obtener los pedidios
  const fetchPedido = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/pedidos/");
      if (!respuesta.ok) {
        throw new Error("No se puede obtener los pedidos");
      }
      const data = await respuesta.json();
      setPedidos(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // funcion para actualizar el estado del pedido

  const actualizarEstadoPedido = async (id, nuevoEstado) => {
    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/pedidos/${id}/estado`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ estado: nuevoEstado }),
        }
      );

      const data = await respuesta.json();

      if (respuesta.ok) {
        alert("estado actualizado correctamente");
        // trae los pedido de nuevo del backend
      } else {
        alert(data.error || "Error al actualizar el estado");
      }
      fetchPedido(); // volver a traer el pedido despes de actualiza el estado
    } catch (error) {
      console.error("Error al actualizar el estado", error);
      setError(error.message);
    }
  };
  // obtener los pedidos al montar componente
  useEffect(() => {
    fetchPedido();
  }, []); // el array vacio asegura que solo se ejecute una vez

  //logica de renderizado
  if (loading) {
    return <div className="titulo_cargando">Cargando pedidos...</div>;
  }

  if (error) {
    return <div className="container_error">Error:{error}</div>;
  }

  return (
    <div>
      <h1>Panel de pedidos</h1>
      {pedidos.length === 0 ? (
        <p>No hay pedidos</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Id del pedido</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido._id}>
                <td>{pedido._id} </td>
                <td>{pedido.nombreCliente} </td>
                <td> {pedido.total.toFixed(2)} </td>
                <td>
                  <select
                    value={pedido.estado}
                    onChange={(e) =>
                      actualizarEstadoPedido(pedido._id, e.target.value)
                    }
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="procesando">Procesando</option>
                    <option value="enviado">Enviando</option>
                    <option value="entregado">Entregado</option>
                  </select>
                </td>
                <td> {new Date(pedido.createdAt).toLocaleDateString()} </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPedidos;
