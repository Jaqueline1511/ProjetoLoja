function usuarioAuth(request, response, next) {
    if(request.session.autenticacao){
        next();
    } else{
        response.redirect("/usuario/login");
    }
}

module.exports = usuarioAuth;