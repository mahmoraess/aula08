const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let objetos = []; // Lista de esmaltes
let id = 0;

// Listar esmaltes
app.get("/objetos", (req, res) => {
  res.json(objetos);
});

// Cadastrar esmalte
app.post("/objetos", (req, res) => {
  const novoObjeto = { id: id++, ...req.body };
  objetos.push(novoObjeto);
  res.status(201).json(novoObjeto);
});

// Alterar esmalte
app.put("/objetos/:id", (req, res) => {
  const { id } = req.params;
  const index = objetos.findIndex((obj) => obj.id === Number(id));
  if (index !== -1) {
    objetos[index] = { id: Number(id), ...req.body };
    res.json(objetos[index]);
  } else {
    res.status(404).send("Esmalte não encontrado");
  }
});

// Remover esmalte
app.delete("/objetos/:id", (req, res) => {
  objetos = objetos.filter((obj) => obj.id !== Number(req.params.id));
  res.status(204).send();
});

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));
