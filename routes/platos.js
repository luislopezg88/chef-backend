const express = require("express");
const router = express.Router();
const Plato = require("../schema/platos");

router.get("/", async (req, res) => {
  try {
    const items = await Plato.find({ id_user: req.user.id });
    return res.json(items);
  } catch (error) {
    //console.log(error);
    return res.status(500).json({ error: "Error al obtener los todos" });
  }
});

router.post("/", async (req, res) => {
  if (!req.body.titulo) {
    //return res.status(400).json({ error: "Título es obligatorio" });
    return res.status(409).json(
      jsonResponse(409, {
        error: "Título es obligatorio",
      })
    );
  }

  try {
    const plato = new Plato();
    const platoExists = await plato.nameExists(req.body.titulo);

    if (platoExists) {
      return res.status(409).json(
        jsonResponse(409, {
          error: "Plato ya existe",
        })
      );
      //return next(new Error("Licitación ya existe"));
    } else {
      const plato = new Plato({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        id_user: req.user.id
      });
  
      const platoInfo = await plato.save();
      //console.log({ platoInfo });
      //res.json(platoInfo);
      res.json(
        jsonResponse(200, {
          platoInfo
        })
      );
    }
  } catch (error) {
    //console.log(error);
    res.status(500).json({ error: "Error al crear el plato" });
  }
});

router.get("/:id", async function (req, res) {
  const platoId = req.params.id;
  //console.log(platoId)
  try {
    const plato = await Plato.findById({ _id: platoId });

    res.json(
      jsonResponse(200, {
        plato,
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
