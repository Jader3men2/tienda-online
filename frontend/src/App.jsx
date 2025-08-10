// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Registro from "./components/registro";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Carrito from "./pages/Carrito";
import NotFound from "./pages/NotFound";
import EnlacesFotos from "./components/EnlacesFotos";
import Checkout from "./pages/checkout";
import Admin from "./pages/admin";
import AdminInicio from "./components/AdminInicio";
import AdminProductos from "./components/AdminProducto";
import AdminMostrar from "./components/AdminMostrar";
import AdminFrases from "./components/AdminFrases";
import AdminPedidos from "./components/AdminPedidos";
import ResumenCompra from "./components/ResumenCompra";
import AgregarInformacion from "./components/AgregarInformacion";
import MetodoEnvio from "./components/MetodoEnvio";
import MetodoPago from "./components/MetodoPago";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/EnlacesFotos" element={<EnlacesFotos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/productos" element={<AdminProductos />} />
          <Route path="/admin/inicio" element={<AdminInicio />} />
          <Route path="/admin/mostrar" element={<AdminMostrar />} />
          <Route path="/admin/frases" element={<AdminFrases />} />
          <Route path="/admin/pedido" element={<AdminPedidos />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/Checkout/resumen" element={<ResumenCompra />} />
          <Route
            path="/Checkout/informacion"
            element={<AgregarInformacion />}
          />
          <Route path="/Checkout/envio" element={<MetodoEnvio />} />
          <Route path="/Checkout/pago" element={<MetodoPago />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
