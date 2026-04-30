const db = require("../../config/db");

const listarEspecialidades = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM especialidades");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ msg: "Error al listar especialidades" });
  }
};

module.exports = listarEspecialidades;