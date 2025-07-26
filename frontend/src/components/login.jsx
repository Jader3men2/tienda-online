import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../estilos/Login.css";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");
  const navigate = useNavigate();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contrasena: password }), // usa 'contrasena' si así se llama en el backend
      });
      console.log(rol, usuario, password);

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("rol", data.rol);
        localStorage.setItem("usuario", data.usuario);

        alert("Login exitoso");
        console.log("Redirigiendo a:", data.rol); // eliminar

        if (data.rol === "administrador") {
          navigate("/admin");
        } else {
          navigate("/App");
        }
      }
    } catch (error) {
      console.error("Error al enviar login:", error);
      alert("Error de servidor");
    }
  };

  return (
    <div className="login-container">
      <h2 className="titulo1">TIENDA ONLINE</h2>
      <form onSubmit={manejarEnvio} className="login-form">
        <label htmlFor="usuario">Usuario</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />

        <label htmlFor="contraseña">Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="cambio-de-rol">Cambio de rol</label>
        <select value={rol} onChange={(e) => setRol(e.target.value)}>
          <option value="usuario">Usuario</option>
          <option value="administrador">Administrador</option>
        </select>
        <button type="submit">Iniciar sesión</button>
      </form>
      <Link to="/registro" className="titulo-regis">
        Registrate
      </Link>
    </div>
  );
}

export default Login;
