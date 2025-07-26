import React, { useState } from "react";
import { ImagenesContext } from "./ImagenesContext";

export const ImagenesProvider = ({ children }) => {
  const [imagenes, setImagenes] = useState([]);

  return (
    <ImagenesContext.Provider value={{ imagenes, setImagenes }}>
      {children}
    </ImagenesContext.Provider>
  );
};
