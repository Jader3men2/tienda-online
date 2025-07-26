const FrasesOfertas = require("../models/frasesOfertas");

//Obtener frases
exports.obtenerFrases = async (req, res) => {
  try {
    let frases = await FrasesOfertas.findOne();
    //si no existe las frases
    if (!frases) {
      frases = await FrasesOfertas.create({
        frase1: "10% en tu segunda compra",
        frase2: "15% si llevas dos prendas",
        frase3: "20% si llevas cuatro prendas",
      });
    }
    res.json(frases);
  } catch (error) {
    console.error("Error al obteber las frases", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

//Actualizar frases
exports.actualizarFrases = async (req, res) => {
  try {
    const { frase1, frase2, frase3 } = req.body;
    const frasesActualizadas = await FrasesOfertas.findOneAndUpdate(
      {},
      { frase1, frase2, frase3 },
      { new: true, upsert: true } // crea sino existe
    );
    res.json(frasesActualizadas);
  } catch (error) {
    console.error("Error al actualizar frases", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
};
