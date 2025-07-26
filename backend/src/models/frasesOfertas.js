const mongoose = require("mongoose");

const FrasesOfertaShema = new mongoose.Schema({
  frase1: String,
  frase2: String,
  frase3: String,
});

module.exports = mongoose.model("FrasesOfertas", FrasesOfertaShema);
