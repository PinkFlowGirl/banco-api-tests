const request = require('supertest'); //Importa a biblioteca supertest para fazer requisições HTTP
const { expect } = require('chai'); //Importa a função expect da biblioteca chai para fazer asserções nos testes
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')

describe('Transferencias', () => {
    describe('POST /transferencias', () => {
        it('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou acima de R$ 10,00', async () => {
            const token = await obterToken('julio.lima', '123456')

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 11,
                    token: ""
                })

            expect(resposta.status).to.equal(201);
            console.log(resposta.body)
        })

        it('Deve retornar falha com 422 quando o valor da transferencia for abaixo de R$ 10,00', async () => {
            const respostaLogin = await request(process.env.BASE_URL)
               const token = await obterToken('julio.lima', '123456')

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 7,
                    token: ""
                })

            expect(resposta.status).to.equal(422);
        })

    })
})