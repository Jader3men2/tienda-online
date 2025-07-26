import React, { useState, useEffect } from "react";
import "../estilos/AdminFrases.css";

const AdminFrases = () => {
  const [frase1, setFrase1] = useState("");
  const [frase2, setFrase2] = useState("");
  const [frase3, setFrase3] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/frases")
      .then((res) => res.json())
      .then((data) => {
        setFrase1(data.frase1 || "");
        setFrase2(data.frase2 || "");
        setFrase3(data.frase3 || "");
      });
  }, []);

  // guardar frases
  const guardar = async () => {
    await fetch("http://localhost:3000/api/frases", {
      method: "PUT",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ frase1, frase2, frase3 }),
    });
    alert("Frases actualizadas correctamente");
  };

  return (
    <div className="container_frases">
      <h3>Frases de ofertas</h3>
      <input
        value={frase1}
        onChange={(e) => setFrase1(e.target.value)}
        placeholder="primera frase"
      />
      <input
        value={frase2}
        onChange={(e) => setFrase2(e.target.value)}
        placeholder="segunda frase"
      />
      <input
        value={frase3}
        onChange={(e) => setFrase3(e.target.value)}
        placeholder="tercera frase"
      />

      <button onClick={guardar}>Guardar</button>
    </div>
  );
};

export default AdminFrases;
