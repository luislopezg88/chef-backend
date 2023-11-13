const Mongoose = require("mongoose");

const PlatosVendidosSchema = new Mongoose.Schema({
  id: { type: Object },
  id_plato: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "plato",
  },
  id_chef: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "chef",
  },
  cantidad: { type: Number },
  fecha: { type: Date, default: Date.now }
});

PlatosVendidosSchema.statics.obtenerPlatosMasVendidos = async function (id_chef) {
    const matchStage = {
      $match: {
        id_chef: id_chef ? mongoose.Types.ObjectId(id_chef) : { $exists: true },
      },
    };
  
    const resultados = await this.aggregate([
      matchStage,
      {
        $group: {
          _id: "$id_plato",
          totalVentas: { $sum: "$cantidad" },
        },
      },
      {
        $lookup: {
          from: "platos", // Ajusta según el nombre de tu colección de platos
          localField: "_id",
          foreignField: "_id",
          as: "plato",
        },
      },
      {
        $unwind: "$plato",
      },
      {
        $lookup: {
          from: "chefs", // Ajusta según el nombre de tu colección de chefs
          localField: "plato.id_chef",
          foreignField: "_id",
          as: "chef",
        },
      },
      {
        $unwind: "$chef",
      },
      {
        $project: {
          _id: 0,
          nombrePlato: "$plato.nombre",
          nombreChef: "$chef.nombre",
          totalVentas: 1,
        },
      },
      {
        $sort: { totalVentas: -1 },
      },
    ]);
  
    return resultados;
};  

module.exports = Mongoose.model("PlatosVendidos", PlatosVendidosSchema);