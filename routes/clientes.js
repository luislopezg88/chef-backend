const express = require("express");
const { jsonResponse } = require("../lib/jsonResponse");
const ClientModel = require("../schema/cliente");
const filterCliente = require("../lib/getCliente");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await ClientModel.find();
    return res.json(
      jsonResponse(200, {
        data,
        recordsTotal: data.length,
      })
    );
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener los todos" });
  }
});

router.get("/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const data = await ClientModel.findOne({ id_user: id });

    res.json(
      jsonResponse(200, {
        data,
      })
    );
  } catch (err) {
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error al obtener el cliente",
      })
    );
  }
});

router.get("/ingredientes/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const data = await ClientModel.findOne({ id_user: id });

    res.json(
      jsonResponse(200, {
        data: filterCliente(data),
      })
    );
  } catch (err) {
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error al obtener el cliente",
      })
    );
  }
});

router.put("/:id", async function (req, res) {
  const { nombre, sexo, edad, telefono, ubicacion, ingredientes, gustos } =
    req.body;
  const id = req.params.id;

  try {
    //const exists = await ClientModel.exists({ _id: id });
    const exists = await ClientModel.existsById(id);

    if (!exists) {
      return res.status(404).json({
        error: "El cliente no existe",
      });
    }

    const result = await ClientModel.updateOne(
      { _id: id },
      {
        $set: { nombre, sexo, edad, telefono, ubicacion, ingredientes, gustos },
      }
    );

    if (result.matchedCount > 0) {
      return res.status(200).json({
        message: `Cliente actualizado con éxito, matched:${result.matchedCount}.`,
      });
    } else {
      return res.status(500).json({
        error:
          "Cliente no encontrado o los datos son iguales, no se realizó ninguna actualización",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Error al actualizar el cliente",
    });
  }
});

module.exports = router;
