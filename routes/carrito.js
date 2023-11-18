const express = require("express");
const PlatoSchema = require("../schema/platos");
const PlatosVendidos = require("../schema/platosVendidos");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();

router.get("/chef/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const data = await PlatoSchema.find({ id_chef: id });

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

// Ruta para guardar la lista de platos vendidos
router.post("/", async (req, res) => {
  try {
    const listaPlatos = req.body.listaPlatos;

    // Iterar sobre la lista de platos y guardarlos en la base de datos
    for (const plato of listaPlatos) {
      const nuevoPlato = new PlatosVendidos({
        id_plato: plato._id,
        id_chef: plato.id_chef,
        cantidad: plato.cantidad,
      });
      await nuevoPlato.save();
    }

    res
      .status(200)
      .json({ mensaje: "Lista de platos vendidos guardada exitosamente" });
  } catch (ersror) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
/*
como puedo mandar a cargar la imágenes desde un frontend en react y el backend con node  en mi directorio raiz del backend tengo una carpeta que se llama imagenes:

chef - backend;
--lib;
--node_module;
--routes;
--schema;
index.js;

*/
