import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";
import "../estilos/Header.css";
import { FaSearch } from "react-icons/fa";
import MenuDesplegable from "./MenuDeplegable";
import "../estilos/Menu.css";
import { useCart } from "../context/CartContext";

function Header() {
  //frases
  const [frases, setFrases] = useState({ frase1: "" });

  useEffect(() => {
    fetch("http://localhost:3000/api/frases")
      .then((res) => res.json())
      .then((data) => setFrases(data));
  }, []);

  const { cart } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quanty, 0);
  return (
    <header>
      <div className="splender">
        <h1 className="nombre">{frases.frase1}</h1>
      </div>
      <nav className="logo-nav">
        <MenuDesplegable />
        <Link to="/login" className="icono_login">
          👤
        </Link>
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <div className="input-container">
          <FaSearch className="icon" />
          <input type="text" placeholder="Buscar..." />
        </div>
        <Link to="/carrito" className="carrito-icono">
          🛒
          {totalItems > 0 && (
            <span className="carrito-contador">{totalItems}</span>
          )}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
