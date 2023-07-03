const express = require('express');
const router = express.Router();
const database = require('../db.js');

let idCount = 0;

router.get('/', function(req, res, next) {
      if(!req.session.username) { // Não está logado
        res.redirect('signin');
        return;
    }
    
    req.session.FilmeEncontradoId = req.query.id;

    // Encontrar o nome do filme

    query = `SELECT nome FROM filme 
    WHERE id = ${req.session.FilmeEncontradoId};`;

    database.query(query, function(error, data) {
      if(!error) {
        req.session.FilmeEncontrado = data[0].nome;
        res.render('pages/carrinho',{ session : req.session} );
      }
      else {
        res.send("Teve um erro no carrinho");
      }
    })
  });

  router.post('', function(request, response, next){

    var movie = request.body.movie;
    var price1 = request.body.price1;
    var price2 = request.body.price2
    var qualidade1 = request.body.qualidade1;
    var qualidade2 = request.body.qualidade2;
    
    if(movie)
    {
        query = `
        SELECT * FROM filme
        WHERE UPPER(nome) = UPPER("${movie}");
        `;

        database.query(query, function(error, data){
          console.log(data);

            if(data.length > 0)
            {
              request.session.FilmeEncontrado = data[0].nome;
              request.session.FilmeEncontradoId = data[0].id;
            }
            response.end();
        });
    }
    else
    {
        response.end();
    }

    if(price1)
    {

        query = `
        INSERT INTO pedido (id, id_filme, cpf_usuario, tipo, qualidade, preco) 
          VALUES (${idCount}, ${request.session.FilmeEncontradoId}, "${request.session.cpf}", 'C', '${qualidade1}', ${price1})
        `;

        database.query(query, function(error, data){
        });

        console.log(price1);
        console.log(qualidade1);    
        console.log(request.session.FilmeEncontrado); 
        console.log(request.session.cpf); 

        idCount++;
        request.session.FilmeEncontrado = null;
        console.log(request.session.FilmeEncontrado); 

    }

    if(price2)
    {
        query = `
        INSERT INTO pedido (id, id_filme, cpf_usuario, tipo, qualidade, preco) 
          VALUES (${idCount}, ${request.session.FilmeEncontradoId}, "${request.session.cpf}", 'A', '${qualidade2}', ${price2})
        `;

        database.query(query, function(error, data){
          console.log(data);
        });

        console.log(price2);
        console.log(qualidade2);    
        console.log(request.session.FilmeEncontrado); 
        console.log(request.session.cpf); 

        idCount++;
        request.session.FilmeEncontrado = null;
        console.log(request.session.FilmeEncontrado); 
    }
    // response.redirect('/movies');

});
module.exports = router;

