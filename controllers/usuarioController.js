const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const session = require("express-session");
module.exports = class UsuarioController {

    static cadastrarUsuarioGet(request, response) {
        const status = request.query.s;
        let mensagem = "";
        if (status == "1") {
            mensagem = "active";
        } else {
            mensagem = "";
        }
        response.render("usuario/usuario_cadastrar", { msg: mensagem });
    };

    static async cadastrarUsuarioPost(request, response) {
        const usuario = request.body;

        const novoUsuario = new Usuario({
            email: usuario.email,
            senha: bcrypt.hashSync(usuario.senha) 
        });
        await novoUsuario.save();
        response.redirect("/usuario/login?s=1");
        //response.redirect("/usuario/login?s=2");
    };

    static loginGet(request, response) {
        const status = request.query.s;
        let mensagem = "";
        if (status == "1") {
            mensagem = "active";
        } else if (status == "2") {
            mensagem = "active_erro";
        } else{
            mensagem = "";
        }

        if(request.session.autenticacao){
            response.redirect("/");
        } else{
            response.render("usuario/usuario_login", { msg: mensagem});
        }
    };

    static async autenticar(request, response) {
        const usuario = request.body;

        const usuarioBD = await Usuario.findOne({email: usuario.email});
        if(usuarioBD){
            if (bcrypt.compareSync(usuario.senha, usuarioBD.senha)) {
                request.session.autenticacao = usuario.email;
                response.redirect("/");
            } else{
                response.redirect("/usuario/login?s=2");
            }
        } else{
                response.redirect("/usuario/login?s=2");
            }
    }
}