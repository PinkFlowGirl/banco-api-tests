const request = require('supertest'); //Importa a biblioteca supertest para fazer requisições HTTP
const { expect } = require('chai'); //Importa a função expect da biblioteca chai para fazer asserções nos testes

describe('Transferencias', () => {
    describe('POST /transferencias', () => {
        it('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou acima de R$ 10,00', async () => {
            const respostaLogin = await request('http://localhost:3000') //Faz uma requisição HTTP para o servidor local na porta 3000
                .post('/login') //Especifica que a requisição é do tipo POST para a rota /login
                .set('Content-Type', 'application/json') //Define o cabeçalho da requisição para indicar que o corpo da requisição é do tipo JSON
                .send({ //Envia o corpo da requisição com as credenciais de login
                    "username": 'julio.lima', //Define o nome de usuário para login
                    "senha": '123456' //Define a senha para login
                })

            const token = respostaLogin.body.token // Armazena o token retornado no corpo da resposta do login

            const resposta = await request('http://localhost:3000') //Faz uma requisição HTTP para o servidor local na porta 3000
                .post('/transferencias') //Especifica que a requisição é do tipo POST para a rota /transferencias
                .set('Content-Type', 'application/json') //Define o cabeçalho da requisição para indicar que o corpo da requisição é do tipo JSON
                .set('Authorization', `Bearer ${token}`) // 
                .send({ //Envia o corpo da requisição com os detalhes da transferência
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 11,
                    token: ""
                })

            expect(resposta.status).to.equal(201); 
            console.log(resposta.body) 
        })

        it('Deve retornar falha com 422 quando o valor da transferencia for abaixo de R$ 10,00', async () => {
            const respostaLogin = await request('http://localhost:3000') 
                .post('/login') 
                .set('Content-Type', 'application/json') 
                .send({ 
                    "username": 'julio.lima', 
                    "senha": '123456' 
                })
                
            const token = respostaLogin.body.token 

            const resposta = await request('http://localhost:3000') 
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