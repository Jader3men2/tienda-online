import React from 'react';
import Productos from './Productos';
import SlideFotos from '../components/SlideFotos';
import EnlacesFotos from '../components/EnlacesFotos';

function Home() {
    return (
      <div className="container_produc">
        <SlideFotos/>
        <Productos/>
        <EnlacesFotos/>
        <Productos/>
      </div>
     
    );
  }
  
  export default Home;
  