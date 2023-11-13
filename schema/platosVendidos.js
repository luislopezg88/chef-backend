const Mongoose = require("mongoose");

const PlatosVendidosSchema = new Mongoose.Schema({
  id: { type: Object },
  id_plato: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "plato",
  },
  cantidad: { type: Number },
  fecha: { type: Date, default: Date.now }
});

PlatosVendidosSchema.statics.dashboard = async function (id_plato, id_chef, fecha) {
  const platoCount = await this.countDocuments({ id_plato, id_chef, fecha });
  return platoCount > 0;
};

module.exports = Mongoose.model("PlatosVendidos", PlatosVendidosSchema);