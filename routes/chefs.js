const express = require("express");
const { jsonResponse } = require("../lib/jsonResponse");
const log = require("../lib/trace");
const router = express.Router();
const Chef = require("../schema/chefs");

router.get("/", async (req, res) => {
  try {
    const items = await Chef.find({ id_user: req.user.id });
    return res.json(items);
  } catch (error) {
    //console.log(error);
    return res.status(500).json({ error: "Error al obtener los todos" });
  }
});

router.post("/", async (req, res) => {
  if (!req.body.nombre) {
    //return res.status(400).json({ error: "El nombre es obligatorio" });
    return res.status(409).json(
      jsonResponse(409, {
        error: "El nombre es obligatorio",
      })
    );
  }

  try {
    const chef = new Chef();
    const chefExists = await chef.nameExists(req.body.titulo);

    if (chefExists) {
      return res.status(409).json(
        jsonResponse(409, {
          error: "Chef ya existe",
        })
      );
      //return next(new Error("Licitación ya existe"));
    } else {
      const chef = new Chef({
        id_user: req.user.id,
        nombre: req.body.nombre
      });
  
      const chefInfo = await chef.save();
      //console.log({ chefInfo });
      //res.json(chefInfo);
      res.json(
        jsonResponse(200, {
          chefInfo
        })
      );
    }
  } catch (error) {
    //console.log(error);
    res.status(500).json({ error: "Error al crear la chef" });
  }
});

router.get("/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const chef = await Chef.findOne({ id }).populate('user');

    res.json(
      jsonResponse(200, {
        chef,
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

router.post("/save/:id", async function (req, res, next) {
  const id = req.params.id;
  const { nombre } = req.body;
  try {
    const chef = await Chef.findOne({ id })
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
