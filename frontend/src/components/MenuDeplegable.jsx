import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import React from "react";

// metodo para que el menu de desplegable de adapte a pantallas pequeñas y grandes
const MenuDesplegable = () => {
  const [abierto, setAbierto] = useState(false);
  const [esPantallaGrande, setEsPantallaGrande] = useState(
    window.innerWidth >= 1024
  );

  const toggleMenu = () => {
    setAbierto(!abierto);
  };

  useEffect(() => {
    const handleResize = () => {
      setEsPantallaGrande(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="menu-container">
      {/* Mostrar botón solo en pantallas pequeñas */}
      {!esPantallaGrande && (
        <button onClick={toggleMenu} className="menu-toggle">
          <FaBars />
        </button>
      )}

      {/* Mostrar menú si está abierto o si es pantalla grande */}
      {(abierto || esPantallaGrande) && (
        <nav className={`menu-nav ${esPantallaGrande ? "menu-grande" : ""}`}>
          <ul className="menu-lista">
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/hombres">Hombres</Link>
            </li>
            <li>
              <Link to="/mujeres">Mujeres</Link>
            </li>
            <li>
              <Link to="/accesorios">Accesorios</Link>
            </li>
            <li>
              <Link to="/categorias">Categoria</Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default MenuDesplegable;
