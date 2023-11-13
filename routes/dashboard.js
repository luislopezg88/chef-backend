const express = require("express");
const PlatosVendidosSchema = require("../schema/platosVendidos");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const items = await PlatosVendidosSchema.dashboard({ id_user: req.user.id });
    return res.json(items);
  } catch (error) {
    //console.log(error);
    return res.status(500).json({ error: "Error al obtener los todos" });
  }
});

router.get("/chef/:id", async function (req, res) {
  const id = req.params.id;
  //id_plato, id_chef, fecha
  try {
    const data = await PlatoSchema.dashboard({ id_chef: id });

    res.json(
      jsonResponse(200, {
        data,
        recordsTotal: data.length,
      })
    );
  } catch (err) {
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error al obtener el plato",
      })
    );
  }
});

// Ruta para Platos más vendidos
router.get("/platosMasVendidos", async (req, res) => {
    const resultados = await PlatosVendidosSchema.obtenerPlatosMasVendidos();
    res.json(resultados);
});
  
// Ruta para Platos más vendidos del chef
router.get("/platosMasVendidos/:id_chef", async (req, res) => {
    const { id_chef } = req.params;
    const resultados = await PlatosVendidosSchema.obtenerPlatosMasVendidos(id_chef);
    res.json(resultados);
});
  
// Ruta para Chef con más ventas
router.get("/chefMasVentas", async (req, res) => {
    const resultados = await PlatosVendidosSchema.obtenerChefMasVentas();
    res.json(resultados);
});

module.exports = router;