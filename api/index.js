// Conexão com o servidor

const restify = require("restify");
const errors = require("restify-errors")

const servidor = restify.createServer({
    name: "loja_dsapi",
    version: "1.0.0"
})

servidor.use(restify.plugins.acceptParser(servidor.acceptable));
servidor.use(restify.plugins.queryParser());
servidor.use(restify.plugins.bodyParser());

servidor.listen(8001, function(){
    console.log("%s executando em %s", servidor.name, servidor.url);
});

// Conexão com o banco de dados

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'loja_dsapi'
    }
});

// Get de boas vindas

servidor.get('/', (req, res, next) => {
    res.send('Bem-vindo(a) à API loja');   
});

// Get para mostrar todos os produtos

servidor.get('/produtos', (req, res, next) => {
    knex('produtos').then((dados) =>{
        res.send(dados);
    },next); 
});

// Get para mostrar os produtos por id

servidor.get('/produtos/:id', (req, res, next) => {
    const idProduto = req.params.id;
    knex('produtos')
    .where('id', idProduto)
    .first()
    .then((dados) =>{
        if(!dados){
            return res.send(new errors.BadRequestError('Produto não encontrado'))
        }
        res.send(dados);
    },next);
});

// Post para Cadastrar clientes

servidor.post('clientes', (req, res, next) => {
    knex('clientes')
      .insert(req.body)
      .then(() => {
        res.send('Cliente cadastrado com sucesso!');
      })
  });


// Get para mostrar todos os clientes

servidor.get('/clientes', (req, res, next) => {
    knex('clientes').then((dados) =>{
        res.send(dados);
    },next); 
});

// Get para mostrar clientes por id

servidor.get('/clientes/:id', (req, res, next) => {
    const idProduto = req.params.id;
    knex('clientes')
    .where('id', idProduto)
    .first()
    .then((dados) =>{
        if(!dados){
            return res.send(new errors.BadRequestError('Cliente não encontrado'))
        }
        res.send(dados);
    },next);
});

// Post para cadastrar pedido

servidor.post('/pedidos', (req, res, next) => {
    const idProd = req.params.id;
        knex('pedidos')
        .where('id', idProd)
        .insert(req.body)
        .then((dados) =>{
            res.send('Pedido cadastrado com sucesso!')
        },next);
 });

// Get para mostrar todos os pedidos

servidor.get('/pedidos', (req, res, next) => {
    knex('pedidos').then((dados) =>{
        res.send(dados);
    },next); 
});

// Get para mostrar pedidos por id

servidor.get('/pedidos/:id', (req, res, next) => {
    const idProduto = req.params.id;
    knex('pedidos')
    .where('id', idProduto)
    .first()
    .then((dados) =>{
        if(!dados){
            return res.send(new errors.BadRequestError('Pedido não encontrado'))
        }
        res.send(dados);
    },next);
});

// admins

// Cadastrar produtos

servidor.post('/admin/produtos', (req, res, next) => {
    const idProd = req.params.id;
        knex('produtos')
        .where('id', idProd)
        .insert(req.body)
        .then((dados) =>{
            res.send('Produto cadastrado com sucesso!')
        },next);
 });

// Atualizar Produtos

servidor.put('/admin/produtos/:id', (req, res, next) => {
    const idProd = req.params.id;
    knex('produtos')
    .where('id', idProd)
    .update(req.body)
    .then((dados) =>{
        if(!dados){
            return res.send(new errors.BadRequestError('Produto não encontrado'))
        }
        res.send('Produto atualizado!');
    },next);
});

// Deletar Produtos

servidor.del('/admin/produtos/:id', (req, res, next) => {
    const idProd = req.params.id;
    knex('produtos')
    .where('id', idProd)
    .delete()
    .then((dados) =>{
        if(!dados){
            return res.send(new errors.BadRequestError('Produto não encontrado'))
        }
        res.send('Produto deletado!');
    },next);
});