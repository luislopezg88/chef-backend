const Mongoose = require("mongoose");

const PlatoSchema = new Mongoose.Schema({
  id: { type: Object },
  nombre: { type: String },
  descripcion: { type: String },
  cocina_regional: { type: String },
  tipo_cocina: { type: String },
  especialidades_ingredientes: { type: Array },
  tecnicas: { type: Array },
  tipo_plato: { type: String },
  precio: { type: Number },
  imagen: { type: String },
  id_user: { 
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  }
});

module.exports = Mongoose.model("Plato", PlatoSchema);
