const request = require('supertest')
const { expect } = require('chai')

describe('Transferências', () => {
    describe('POST / transferências', () => {
        it('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou maior que R$ 10,00', async () => {
            const respostaLogin = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    "username": "julio.lima",
                    "senha": "123456"
                })
            
            const token = respostaLogin.body.token

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'contaOrigem': 1,
                    'contaDestino': 2,
                    'valor': 11,
                    'token': "",
                })
            expect(resposta.status).to.equal(201);
        });

        it('Deve retornar falha com 422 quando o valor da transferencia for menor que R$ 10,00', async () => {
            const respostaLogin = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    "username": "julio.lima",
                    "senha": "123456"
                })
            
            const token = respostaLogin.body.token

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'contaOrigem': 1,
                    'contaDestino': 2,
                    'valor': 1,
                    'token': "",
                })
            expect(resposta.status).to.equal(422);
        });
    });
});