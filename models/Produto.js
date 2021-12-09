const mongoose = require("mongoose");
const schema = mongoose.Schema;

const produtoScheme = schema({
    descricao: String,
    qtd: Number,
    preco: Number
});

module.exports = mongoose.model("Produto", produtoScheme);