const Produto = require("../models/Produto");
module.exports = class ProdutoController {

    static async listarProdutos(request, response) {
        const produtos = await Produto.find();
        response.render("produto/produto_listar", {produtos: produtos, msg: "", title: "produtos" });
    };

    static async recuperarProdutos(request, response) {
        const produtos = await Produto.find();
        const status = request.query.s;
        let mensagem = "";
        if (status == "1") {
            mensagem = "active";
        } else {
            mensagem = "";
        }
        response.render("produto/produto_listar", {produtos: produtos, msg: mensagem, title: "listar" });
    };

    static async cadastrarProdutoGet(request, response) {
        const id = request.params.id;

        if (id) {
            const produto = await Produto.findById(id);
            response.render("produto/produto_cadastrar", { title: "Atualização", msg: "", produto: produto, botao: "Atualizar" });

        } else {
            const status = request.query.s;
            let mensagem = "";
            if (status == "1") {
                mensagem = "active";
            } else {
                mensagem = "";
            }
            response.render("produto/produto_cadastrar", { title: "Cadastro", msg: mensagem, produto: {}, botao: "Salvar" });
        }
    };

    static async cadastrarProdutoPost(request, response) {
        const produto = request.body;

        if (produto.id) {
            await Produto.findOneAndUpdate({_id: produto.id}, {
                descricao: produto.descricao,
                qtd: produto.qtd,
                preco: produto.preco
            });
            response.redirect("/produto/listar?s=1");

        } else {
            const novoProduto = new Produto({
                descricao: produto.descricao,
                qtd: produto.qtd,
                preco: produto.preco
            });
            await novoProduto.save();
            response.redirect("/produto/cadastrar?s=1");
        }
    };

    static async removerProduto(request, response) {
        const id = request.params.id;
        await Produto.findByIdAndDelete({_id: id});
        response.redirect("/produto/listar");
    };

    static async relatorio(request, response){
        const produtos = await Produto.find();
        response.render("produto/produto_relatorio", {produtos: produtos, title: "Relatorio"});
    }
}