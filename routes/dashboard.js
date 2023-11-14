const express = require("express");
const PlatosVendidosSchema = require("../schema/platosVendidos");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();

router.get("/", async (req, res) => {
    return 'hola';
    //const resultados = await PlatosVendidosSchema.obtenerPlatosMasVendidos();
    //res.json(resultados);
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
router.get("/platosVendidos", async (req, res) => {
    const resultados = await PlatosVendidosSchema.obtenerPlatosVendidos();
    res.json(resultados);
});
  
// Ruta para Platos más vendidos del chef
router.get("/platosVendidos/:id_chef", async (req, res) => {
    const { id_chef } = req.params;
    const resultados = await PlatosVendidosSchema.obtenerPlatosVendidos(id_chef);
    res.json(resultados);
});
  
// Ruta para Chef con más ventas
router.get("/ventasPorChef", async (req, res) => {
    const resultados = await PlatosVendidosSchema.obtenerVentasPorChef();
    res.json(resultados);
});

module.exports = router;