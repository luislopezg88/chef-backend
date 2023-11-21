const Mongoose = require("mongoose");

const ClientSchema = new Mongoose.Schema({
  id: { type: Object },
  id_user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  nombre: { type: String },
  sexo: { type: String },
  edad: { type: Number },
  telefono: { type: String },
  ubicacion: { type: String },
  //ingredientes: [{ type: String }],
  ingredientes: { type: String },
  gustos: { type: String },
});

ClientSchema.statics.existsById = async function (Id) {
  const clientCount = await this.countDocuments({ _id: Id });
  return clientCount > 0;
};

module.exports = Mongoose.model("cliente", ClientSchema);
