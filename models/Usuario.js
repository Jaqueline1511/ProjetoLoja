const mongoose = require("mongoose");
const schema = mongoose.Schema;

const usuarioScheme = schema({
    email: String,
    senha: String
});

module.exports = mongoose.model("Usuario", usuarioScheme);