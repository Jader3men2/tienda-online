import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../estilos/registro.css";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");
  const navigate = useNavigate();

  const manejarRegistro = async (e) => {
    e.preventDefault();

    console.log(nombre, email, usuario, password, rol); // borrar

    try {
      const respuesta = await fetch(
        "http://localhost:3000/api/usuarios/registro",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            email,
            usuario,
            password,
            rol,
          }),
        }
      );

      const data = await respuesta.json();

      if (respuesta.ok) {
        //guardar token
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        alert("Registro exitoso");
        navigate("/login");
      } else {
        alert(data.mensaje || "Error en el registro");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Error de red al resgistro");
    }
  };

  return (
    <div className="registro-container">
      <h2 className="titulo">Registrate</h2>
      <form onSubmit={manejarRegistro} className="registro-form">
        <div className="campo">
          <label htmlFor="nombre">Nombre completo:</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label htmlFor="correo">Correo electrónico:</label>
          <input
            id="correo"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="usuario">Usuario:</label>
          <input
            id="usuario"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="cambio-de-rol">Cambio de rol</label>
          <select value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="" disabled>
              Selecciona un rol
            </option>
            <option value="usuario">Usuario</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Registro;
