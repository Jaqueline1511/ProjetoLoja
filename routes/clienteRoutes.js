const express = require("express");
const routes = express.Router();
const clienteController = require("../controllers/clienteController");
const auth = require("../middlewares/usuarioAuth");

routes.get("/clientes", auth, clienteController.listarClientes);
routes.get("/cliente/cadastrar/:id?", auth, clienteController.cadastrarClienteGet);
routes.get("/cliente/listar", auth, clienteController.recuperarClientes);
routes.get("/cliente/relatorio", auth, clienteController.relatorio);
routes.post("/cliente/cadastrar", auth, clienteController.cadastrarClientePost);
routes.get("/cliente/remover/:id", auth, clienteController.removerCliente);

module.exports = routes;


