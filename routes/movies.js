const express = require('express');
const router = express.Router();
const database = require('../db.js');
const connection = require('../db.js');
const session = require('express-session');

router.post('/', function(req, res, next) {
    var busca =  req.body.busca;
    console.log(busca)
    var cpf =  req.session.cpf;
    if(busca==''){
    
    query = `
        SELECT * FROM filme
        `;
    query2 = `select filme.id, filme.nome, filme.ano, filme.diretor, filme.notaimdb,
    filme.classificacao, filme.sinopse from usuario inner join deseja_assistir on usuario.cpf = 
    deseja_assistir.cpf_usuario inner join filme on deseja_assistir.id_filme =
    filme.id where usuario.cpf = '${cpf}'`;
    
    query3 = `select distinct filme.nome, filme.ano, filme.diretor, filme.notaimdb,
    filme.classificacao, filme.sinopse from
    filme inner join pedido on filme.id =  pedido.id_filme inner join
    usuario on pedido.cpf_usuario = usuario.cpf where usuario.cpf = '${cpf}'`;
        connection.query(query,(error,resultado) => {
            

            if(error)throw error;
        
            if(!error){
                
                connection.query(query2,(error2,resultado2) =>{
                    if(error2)throw error2;

                    if(!error2){
                        connection.query(query3,(error3,resultado3) =>{

                            if(error3)throw error3;

                            if(!error3){

                                res.render('pages/movies',{ session : req.session, data: resultado, data2: resultado2, data3: resultado3});

                            }
                            
                        })   
                    
                
                    }

                })
                
            }
        })}
        else{
    
    query = `
        SELECT * FROM filme where filme.nome like '%${busca}%'
        `;
    query2 = `select filme.id, filme.nome, filme.ano, filme.diretor, filme.notaimdb,
    filme.classificacao, filme.sinopse from usuario inner join deseja_assistir on usuario.cpf = 
    deseja_assistir.cpf_usuario inner join filme on deseja_assistir.id_filme =
    filme.id where usuario.cpf = '${cpf}' and filme.nome like '%${busca}%'`;

    query3 = `select distinct filme.nome, filme.ano, filme.diretor, filme.notaimdb,
    filme.classificacao, filme.sinopse from
    filme inner join pedido on filme.id =  pedido.id_filme inner join
    usuario on pedido.cpf_usuario = usuario.cpf where usuario.cpf = '${cpf}' 
    and filme.nome like '%${busca}%'`;
        connection.query(query,(error,resultado) => {
            

            if(error)throw error;
        
            if(!error){
                
                connection.query(query2,(error2,resultado2) =>{
                    if(error2)throw error2;

                    if(!error2){
                        connection.query(query3,(error3,resultado3) =>{

                            if(error3)throw error3;

                            if(!error3){

                                res.render('pages/movies',{ session : req.session, data: resultado, data2: resultado2, data3: resultado3});

                            }
                            
                        })   
                    }

                })
                
            }
        })

        }
        
        


})


router.get('/', function(req, res, next) {

    

    
    var cpf =  req.session.cpf;
    query = `
        SELECT * FROM filme
        `;
    query2 = `select filme.id, filme.nome, filme.ano, filme.diretor, filme.notaimdb,
    filme.classificacao, filme.sinopse from usuario inner join deseja_assistir on usuario.cpf = 
    deseja_assistir.cpf_usuario inner join filme on deseja_assistir.id_filme =
    filme.id where usuario.cpf = '${cpf}'`;

    query3 = `select distinct filme.nome, filme.ano, filme.diretor, filme.notaimdb,
    filme.classificacao, filme.sinopse from
    filme inner join pedido on filme.id =  pedido.id_filme inner join
    usuario on pedido.cpf_usuario = usuario.cpf where usuario.cpf = '${cpf}'`;
        connection.query(query,(error,resultado) => {
            

            if(error)throw error;
        
            if(!error){
                
                connection.query(query2,(error2,resultado2) =>{
                    if(error2)throw error2;

                    if(!error2){
                    console.log(resultado2);

                    connection.query(query3,(error3,resultado3) =>{

                        if(error3)throw error3;

                        if(!error3){

                            res.render('pages/movies',{ session : req.session, data: resultado, data2: resultado2, data3: resultado3});

                        }
                        
                    })   
                    }

                })
                
            }
        })
        
        
        




    
});


module.exports = router; 

