const request = require('supertest'); //Importa a biblioteca supertest para fazer requisições HTTP
const { expect } = require('chai'); //Importa a função expect da biblioteca chai para fazer asserções nos testes
require('dotenv').config()
const postLogin = require('../fixtures/postLogin.json') //Importa os dados de login do arquivo postLogin.json

describe('Login', () => { 
    describe('POST /login', () => { 
        it('Deve retornar 200 com un token em string quando usar credenciais válidas', async () => { 
            const bodyLogin = { ...postLogin } 
            
            const resposta = await request(process.env.BASE_URL) 
                .post('/login') 
                .set('Content-Type', 'application/json') 
                .send(bodyLogin)


            expect(resposta.status).to.equal(200); //Verifica se o status da resposta é igual a 200, indicando sucesso
            expect(resposta.body.token).to.be.a('string'); //Verifica se o token retornado no corpo da resposta é do tipo string, indicando que um token válido foi recebido
        })
    })
})