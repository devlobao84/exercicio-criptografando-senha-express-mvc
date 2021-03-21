const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const pathFile = path.join('static-database', 'db.json');

const index = (req, res) => {
  res.render('login/login')
}

//SUBMIT  
const submit = (req, res) => {
const { email, password } = req.body
const bancoDados = fs.readFileSync(pathFile);
const compareUser = JSON.parse(bancoDados);
const [compareUserFilter] = compareUser.filter(user => user.email === email);

if (!compareUser) res.render ('login/errorLogin'); 
if (bcrypt.compareSync(password, compareUserFilter.password)) {

  res.redirect('/login/listagem');
}

}

//Cadastro
const cadastro = (req, res) => {
  res.render('login/cadastro');
}

const novoCadastro = (req, res) => {
  const salt = 12;
  const data = fs.readFileSync(pathFile, {encoding:'utf-8'});
  
  //Dados enviados com sucesso e criptografia da senha
  let envioSucesso = {
    email:req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
  };



  //Leitura dos dados 
  const usuario = JSON.parse(data);
  usuario.push(envioSucesso);  
  const usuarioJson = JSON.stringify(usuario);
  fs.writeFileSync(pathFile, usuarioJson);
  res.redirect('/login');

}

const listagemUsuario = (req, res) => {
  const data = fs.readFileSync(pathFile);
  const users = JSON.parse(data);
  res.render('listagem', {users});
}

 
module.exports = {
  index,
  submit,
  cadastro,
  novoCadastro,
  listagemUsuario
}