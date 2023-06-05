var mysql = require("mysql2");
// const { MongoClient } = require('mongodb');

// // CONEXÃO DO MONGODB (NUVEM)
// const uri = "mongodb+srv://danielrodrigues:<79PyqHVMN}>;5zUx@cluster0.zpbgkqy.mongodb.net/?retryWrites=true&w=majority";
// const mongoConfig = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// };

// CONEXÃO DO MYSQL WORKBENCH
var mySqlConfig = {
    host: "localhost",
    database: "search",
    user: "root",
    password: "3264",
};

function executar(instrucao) {
    // VERIFICA A VARIÁVEL DE AMBIENTE SETADA EM app.js
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        return new Promise(function (resolve, reject) {
            MongoClient.connect(uri, mongoConfig, function(err, client) {
                if (err) {
                    reject(err);
                    console.log('ERRO: ', err);
                } else {
                    const db = client.db();
                    db.collection('<sua_colecao>').findOne({}, function(err, result) {
                        if (err) {
                            reject(err);
                            console.log('ERRO: ', err);
                        } else {
                            console.log(result);
                            resolve(result);
                        }
                        client.close();
                    });
                }
            });
        });
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        return new Promise(function (resolve, reject) {
            var conexao = mysql.createConnection(mySqlConfig);
            conexao.connect();
            conexao.query(instrucao, function (erro, resultados) {
                conexao.end();
                if (erro) {
                    reject(erro);
                }
                console.log(resultados);
                resolve(resultados);
            });
            conexao.on('error', function (erro) {
                return ("ERRO NO MySQL WORKBENCH: ", erro.sqlMessage);
            });
        });
    } else {
        return new Promise(function (resolve, reject) {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            reject("AMBIENTE NÃO CONFIGURADO EM app.js")
        });
    }
}

module.exports = {
    executar
}
