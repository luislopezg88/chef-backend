const express = require("express");
const PlatosVendidosSchema = require("../schema/platosVendidos");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();

router.get("/", async (req, res) => {
  return "hola";
});

router.get("/chef/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const data = await PlatoSchema.dashboard({ id_chef: id });

    res.json(
      jsonResponse(200, {
        data,
        recordsTotal: data.length,
      })
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error al obtener el plato",
      })
    );
  }
});
// Ruta para Platos más vendidos
router.get("/platosVendidos", async (req, res) => {
  const data = await PlatosVendidosSchema.obtenerPlatosVendidos();

  return res.json(
    jsonResponse(200, {
      data,
      recordsTotal: data.length,
    })
  );
});
// Ruta para Platos más vendidos del chef
router.get("/platosVendidos/:id_chef", async (req, res) => {
  const { id_chef } = req.params;
  const data = await PlatosVendidosSchema.obtenerPlatosVendidos(id_chef);
  return res.json(
    jsonResponse(200, {
      data,
      recordsTotal: data.length,
    })
  );
});
// Ruta para Chef con más ventas
router.get("/ventasPorChef", async (req, res) => {
  const data = await PlatosVendidosSchema.obtenerVentasPorChef();
  return res.json(
    jsonResponse(200, {
      data,
      recordsTotal: data.length,
    })
  );
});

module.exports = router;
