function getPlatoInfo(plato) {
    return {
      id: plato.id || plato._id,
      nombre: plato.nombre,
      descripcion: plato.descripcion,
      id_user: plato.id_user
    };
  }
  
  module.exports = getPlatoInfo;
  