const express = require("express");
const session = require("express-session");
const auth = require("./middlewares/usuarioAuth");

const app = express();
require("dotenv").config();

const clienteRoutes = require("./routes/clienteRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(session({
    secret: "flor123"
}));
app.use(clienteRoutes);
app.use(produtoRoutes);
app.use(usuarioRoutes);

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

app.get("/", auth, (request, response) => {
    response.render("index");
});

app.get("/usuario/login", (request, response) => {
    response.render("usuario/usuario_login", {msg: ""});
});


app.use((request, response) => {
    response.render("erro");
});

app.listen(process.env.PORT, () => {
    console.log("servidor funcionando perfeitamanete");
});