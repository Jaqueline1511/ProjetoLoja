const express = require("express");
const routes = express.Router();
const produtoController = require("../controllers/produtoController");
const auth = require("../middlewares/usuarioAuth");

routes.get("/produtos", auth, produtoController.listarProdutos);
routes.get("/produto/cadastrar/:id?", auth, produtoController.cadastrarProdutoGet);
routes.get("/produto/listar", auth, produtoController.recuperarProdutos);
routes.get("/produto/relatorio", auth, produtoController.relatorio);
routes.post("/produto/cadastrar", auth, produtoController.cadastrarProdutoPost);
routes.get("/produto/remover/:id", auth, produtoController.removerProduto);

module.exports = routes;


