const express = require("express");
const multer = require("multer");
const path = require("path");
const PlatoSchema = require("../schema/platos");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();

// Configurar multer carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "imagenes/platos/"); // Directorio donde se guardarán las imágenes de platos
  },
  filename: function (req, file, cb) {
    const nombreArchivo = req.body.imagen; // + path.extname(file.originalname);
    cb(null, nombreArchivo);
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

router.get("/imagen/:img", function (req, res) {
  const img = req.params.img;
  const fileName = encodeURIComponent(img);
  const filePath = path.join(__dirname, "..", "imagenes", "platos", fileName);
  console.log(filePath);
  res.sendFile(filePath);
});

module.exports = router;
