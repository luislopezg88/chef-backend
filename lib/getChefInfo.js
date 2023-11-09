function getChefInfo(chef) {
    return {
      id: chef.id || chef._id,
      nombre: chef.nombre,
      id_user: chef.id_user
    };
  }
  
  module.exports = getChefInfo;
  