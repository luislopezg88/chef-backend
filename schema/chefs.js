const Mongoose = require("mongoose");

const ChefSchema = new Mongoose.Schema({
  id: { type: Object },
  id_user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  nombre: { type: String },
  sexo: { type: String },
  edad: { type: Number },
  foto: { type: String },
  telefono: { type: String },
  ubicacion: { type: String },
  experiencialaboral: { type: String },
  educacionculinaria: { type: String },
  disponibilidad: { type: String },
  especialidadesculinarias: [{ type: String }],
  habilidadesadicionales: [{ type: String }],
  redessociales: [{ type: String }],
  historialpuntuaciones: [{ type: String }],
});

ChefSchema.statics.existsById = async function (chefId) {
  const chefCount = await this.countDocuments({ _id: chefId });
  return chefCount > 0;
};

module.exports = Mongoose.model("chef", ChefSchema);
