const request = require('supertest'); //Importa a biblioteca supertest para fazer requisições HTTP
const { expect } = require('chai'); //Importa a função expect da biblioteca chai para fazer asserções nos testes
require('dotenv').config()

describe('Login', () => { //Inicia a descrição do conjunto de testes para a funcionalidade de login
    describe('POST /login', () => { //Inicia a descrição do teste para a rota POST /login
        it('Deve retornar 200 com un token em string quando usar credenciais válidas', async () => { //Define o teste que espera um status 200 e um token em string ao usar credenciais válidas
            const resposta = await request(process.env.BASE_URL) // requisição HTTP para o servidor local na porta 3000
                .post('/login') //Especifica que a requisição é do tipo POST para a rota /login
                .set('Content-Type', 'application/json') //Define o cabeçalho da requisição para indicar que o corpo da requisição é do tipo JSON
                .send({ //Envia o corpo da requisição com as credenciais de login
                    "username": 'julio.lima', //Define o nome de usuário para login
                    "senha": '123456' //Define a senha para login
                })


            expect(resposta.status).to.equal(200); //Verifica se o status da resposta é igual a 200, indicando sucesso
            expect(resposta.body.token).to.be.a('string'); //Verifica se o token retornado no corpo da resposta é do tipo string, indicando que um token válido foi recebido
        })
    })
})