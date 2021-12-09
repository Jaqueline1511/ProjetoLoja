const Cliente = require("../models/Cliente");
module.exports = class ClienteController {

    static async listarClientes(request, response) {
        const clientes = await Cliente.find();
        response.render("cliente/cliente_listar", {clientes: clientes, msg: "", title: "clientes" });
    };

    static async recuperarClientes(request, response) {
        const clientes = await Cliente.find();
        const status = request.query.s;
        let mensagem = "";
        if (status == "1") {
            mensagem = "active";
        } else {
            mensagem = "";
        }
        response.render("cliente/cliente_listar", {clientes: clientes, msg: mensagem, title: "listar" });
    };

    static async cadastrarClienteGet(request, response) {
        const id = request.params.id;

        if (id) {
            const cliente = await Cliente.findById(id);
            response.render("cliente/cliente_cadastrar", { title: "Atualização", msg: "", cliente: cliente, botao: "Atualizar" });

        } else {
            const status = request.query.s;
            let mensagem = "";
            if (status == "1") {
                mensagem = "active";
            } else {
                mensagem = "";
            }
            response.render("cliente/cliente_cadastrar", { title: "Cadastro", msg: mensagem, cliente: {}, botao: "Salvar" });
        }
    };

    static async cadastrarClientePost(request, response) {
        const cliente = request.body;

        if (cliente.id) {
            await Cliente.findOneAndUpdate({_id: cliente.id}, {
                nome: cliente.nome,
                email: cliente.email,
                senha: cliente.senha,
                cpf: cliente.cpf
            });
            response.redirect("/cliente/listar?s=1");

        } else {
            const novoCliente = new Cliente({
                nome: cliente.nome,
                email: cliente.email,
                senha: cliente.senha,
                cpf: cliente.cpf
            });
            await novoCliente.save();
            response.redirect("/cliente/cadastrar?s=1");
        }
    };

    static async removerCliente(request, response) {
        const id = request.params.id;
        await Cliente.findByIdAndDelete({_id: id});
        response.redirect("/cliente/listar");
    };

    static async relatorio(request, response){
        const clientes = await Cliente.find();
        response.render("cliente/cliente_relatorio", {clientes: clientes, title: "Relatorio"});
    }
}