import React from "react";
import { Link } from "react-router-dom";
import '../estilos/Enlaces.css'


// metodo para mostrar los enlaces con imagenes 

const EnlacesFotos = () => {

    return(
        <section className="container-enlaces">
        <ul className="enlaces">
          <li><Link to="/blusas" className="enlaces1">BLUSAS</Link></li>
          <li><Link to="/productos" className="enlaces2">CAMISAS</Link></li>
          <li><Link to="/categorias" className="enlaces3" >JEAN</Link></li>
          <li><Link to="/categorias" className="enlaces4" >FALDAS</Link></li>

        </ul>
        
      </section>

    );

}

export default EnlacesFotos;