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

module.exports = router;