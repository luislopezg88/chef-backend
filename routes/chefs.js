const express = require("express");
const { jsonResponse } = require("../lib/jsonResponse");

const router = express.Router();
const ChefModel = require("../schema/chefs");

router.get("/", async (req, res) => {
  try {
    const items = await Chef.find({ id_user: req.user.id });
    return res.json(items);
  } catch (error) {
    //console.log(error);
    return res.status(500).json({ error: "Error al obtener los todos" });
  }
});

router.get("/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const data = await ChefModel.findOne({ id_user: id });

    res.json(
      jsonResponse(200, {
        data,
      })
    );
  } catch (err) {
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error al obtener la lista de chefs",
      })
    );
  }
});

router.put("/:id", async function (req, res) {
  const {
    nombre,
    sexo,
    edad,
    foto,
    telefono,
    ubicacion,
    experiencialaboral,
    educacionculinaria,
    disponibilidad,
    especialidadesculinarias,
    habilidadesadicionales,
    redessociales,
    historialpuntuaciones,
  } = req.body;
  const id = req.params.id;

  try {
    const exists = await ChefModel.exists({ _id: id });

    if (!exists) {
      return res.status(404).json({
        error: "El chef no existe",
      });
    }

    const result = await ChefModel.updateOne(
      { _id: id },
      {
        $set: {
          nombre,
          sexo,
          edad,
          foto,
          telefono,
          ubicacion,
          experiencialaboral,
          educacionculinaria,
          disponibilidad,
          especialidadesculinarias,
          habilidadesadicionales,
          redessociales,
          historialpuntuaciones,
        },
      }
    );

    if (result.matchedCount > 0) {
      return res.status(200).json({
        message: `Chef actualizado con éxito, matched:${result.matchedCount}.`,
      });
    } else {
      return res.status(500).json({
        error:
          "Chef no encontrado o los datos son iguales, no se realizó ninguna actualización",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Error al actualizar el chef",
    });
  }
});

router.post("/save/:id", async function (req, res, next) {
  const id = req.params.id;
  const { nombre } = req.body;
  try {
    const chef = await Chef.findOne({ id });
    if (!chef) {
      const nuevoChef = new Chef({ nombre, user });
      await nuevoChef.save();
      res.json(
        jsonResponse(200, {
          message: "Chef actualizado satisfactoriamente",
        })
      );
    } else {
      chef.nombre = nombre;
      await chef.save();
      res.json(
        jsonResponse(200, {
          message: "Chef actualizado satisfactoriamente",
        })
      );
    }
  } catch (err) {
    //console.log(err)
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error creando el chef",
      })
    );
  }
});

module.exports = router;
