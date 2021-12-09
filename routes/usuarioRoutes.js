const express = require("express");
const routes = express.Router();
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middlewares/usuarioAuth");

routes.get("/usuario/cadastrar", auth, usuarioController.cadastrarUsuarioGet);
routes.post("/usuario/cadastrar", auth, usuarioController.cadastrarUsuarioPost);
routes.get("/usuario/login", usuarioController.loginGet);
routes.post("/usuario/autenticar", usuarioController.autenticar);

module.exports = routes;


