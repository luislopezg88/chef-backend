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

ChefSchema.methods.chefId = async function (id) {
  const result = await Mongoose.model("chef").find({ _id: id });
  return result.length > 0;
};
module.exports = Mongoose.model("chef", ChefSchema);
