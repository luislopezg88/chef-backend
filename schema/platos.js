const Mongoose = require("mongoose");

const PlatoSchema = new Mongoose.Schema({
  id: { type: Object },
  id_chef: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "chef",
  },
  nombre: { type: String },
  descripcion: { type: String },
  regiones: { type: String },
  estilos: { type: String },
  ingredientes: { type: String },
  tecnicas: { type: String },
  tipo: { type: String },
  imagen: { type: String },
  precio: { type: Number },
});

PlatoSchema.statics.existsByNombreAndChefId = async function (nombre, id_chef) {
  const platoCount = await this.countDocuments({ nombre, id_chef });
  return platoCount > 0;
};

module.exports = Mongoose.model("Plato", PlatoSchema);
