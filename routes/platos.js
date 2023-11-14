const express = require("express");
const multer = require("multer");
const path = require("path");
const PlatoSchema = require("../schema/platos");
const { jsonResponse } = require("../lib/jsonResponse");

const router = express.Router();
// Configurar multer carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../imagenes/platos/"); // Directorio donde se guardarán las imágenes de platos
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const items = await PlatoSchema.find({ id_user: req.user.id });
    return res.json(items);
  } catch (error) {
    //console.log(error);
    return res.status(500).json({ error: "Error al obtener los todos" });
  }
});

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

router.post("/", upload.single("file"), async (req, res) => {
  const {
    idChef,
    nombre,
    descripcion,
    regiones,
    estilos,
    ingredientes,
    tecnicas,
    tipo,
    imagen,
    precio,
  } = req.body;

  if (!nombre) {
    return res.status(409).json(
      jsonResponse(409, {
        error: "El nombre es obligatorio",
      })
    );
  }

  try {
    const exists = await PlatoSchema.existsByNombreAndChefId(nombre, idChef);

    if (exists) {
      return res.status(409).json(
        jsonResponse(409, {
          error: "Plato ya existe",
        })
      );
    } else {
      //Crear plato
      const nuevoPlato = new PlatoSchema({
        id_chef: idChef,
        nombre: nombre,
        descripcion: descripcion,
        regiones: regiones,
        estilos: estilos,
        ingredientes: ingredientes,
        tecnicas: tecnicas,
        tipo: tipo,
        imagen: imagen,
        precio: precio,
      });
      // Guardar el plato
      const platoInfo = await nuevoPlato.save();
      res.json(
        jsonResponse(200, {
          platoInfo,
        })
      );
    }
  } catch (error) {
    res.status(500).json({ error: "Error al crear el plato" });
  }
});
/*
router.post("/", upload.single("imagen"), async (req, res) => {
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
        cocina_regional: req.body.cocina_regional,
        tipo_cocina: req.body.tipo_cocina,
        especialidades_ingredientes: req.body.especialidades_ingredientes,
        tecnicas: req.body.tecnicas,
        tipo_plato: req.body.tipo_plato,
        precio: req.body.precio,
        imagen: req.file ? req.file.filename : "", // Guarda el nombre del archivo en la base de datos
        id_user: req.user.id,
      });

      const platoInfo = await plato.save();
      //console.log({ platoInfo });
      //res.json(platoInfo);
      res.json(
        jsonResponse(200, {
          platoInfo,
        })
      );
    }
  } catch (error) {
    //console.log(error);
    res.status(500).json({ error: "Error al crear el plato" });
  }
});
*/

module.exports = router;
