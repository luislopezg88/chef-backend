const Mongoose = require("mongoose");

const EmpresaSchema = new Mongoose.Schema({
  id: { type: Object },
  nombre: { type: String },
  id_user: { 
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  }
});

module.exports = Mongoose.model("Empresas", EmpresaSchema);