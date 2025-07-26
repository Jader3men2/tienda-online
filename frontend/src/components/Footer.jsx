import React from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaKey  } from 'react-icons/fa';
import { FaRegPaperPlane } from 'react-icons/fa';
import { CiWallet } from 'react-icons/ci';
import "../estilos/Footer.css";


// metodo para mostrar el footer

function Footer() {
  return (
    <footer >
      <div className="container-fooder">
      <h2 >Tienda De Ropa Online</h2>
      <p>Bienvenid@ a nuestra <strong>TIENDA ONLINE!</strong> Aquí encontrarás una selección exclusiva de ropa colombiana,
         así como zapatos, accesorios y productos de belleza para mujeres, hombres, niñas y niños. 
         Somos una marca dedicada a un estilo de vida joven, fresco y urbano, ofreciendo colecciones de moda que reflejan
         las últimas tendencias de la temporada. Diseñamos para todos los gustos y edades, asegurando que cada pieza resalte tu personalidad.
         ¡Explora y descubre tu estilo único con nosotros!
         temporada para todos los gustos y todas las edades.</p>


      </div>
        <div className="container-red-social">
          <FaFacebook/>
          <FaInstagram/>
          <FaTiktok/>
        </div>
        <div className="iconos-container">
          <div className="iconos">
          <FaKey/>
          <h4>Compra 100% segura</h4>
          </div>
          <div className="iconos">
          <CiWallet />
          <h4>Pago en efectivo</h4>
          </div>
          <div className="iconos">
          <FaRegPaperPlane/>
          <h4>30% de descuento en envío</h4>
          </div>
        
        
      
        </div>
        
      



    </footer>
  );
}

export default Footer;
