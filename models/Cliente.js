const mongoose = require("mongoose");
const schema = mongoose.Schema;

const clienteScheme = schema({
    nome: String,
    email: String,
    senha: String,
    cpf: String
});

module.exports = mongoose.model("Cliente", clienteScheme);