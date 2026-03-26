const request = require('supertest'); //Importa a biblioteca supertest para fazer requisições HTTP
const { expect } = require('chai'); //Importa a função expect da biblioteca chai para fazer asserções nos testes
require('dotenv').config()

const { obterToken } = require('../helpers/autenticacao')
const postTransferencias = require('../fixtures/postTransferencias.json')    

describe('Transferencias', () => {
    describe('POST /transferencias', () => {
        let token

        beforeEach(async () => {
            token = await obterToken('julio.lima', '123456')
        })
        it('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou acima de R$ 10,00', async () => {
            const bodyTransferencias = { ...postTransferencias }
            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)
                
            expect(resposta.status).to.equal(201);
            console.log(resposta.body)
        })

        it('Deve retornar falha com 422 quando o valor da transferencia for abaixo de R$ 10,00', async () => {
           const bodyTransferencias = { ...postTransferencias }
           bodyTransferencias.valor = 7

            const respostaLogin = await request(process.env.BASE_URL)
             
            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)

            expect(resposta.status).to.equal(422);
        })

    })
})