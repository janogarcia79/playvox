import { Auth } from '../../types';
import { BookOrder } from '../../types';
import { generateAuthClient } from 'cypress/support/utils/data';

const healthCheck = (): Cypress.Chainable<void> => {
    return cy.session('healthCheck', () => {
        cy.request('/status').then(({ status }) => {
            expect(status).to.eq(200);
        });
    });
};

const createToken = (): Cypress.Chainable<void> => {
    return cy.session([], () => {
        const newAuthClient: Auth = generateAuthClient();
        cy.request({
            method: 'POST',
            url: '/api-clients',
            body: {
                clientName: newAuthClient.clientName,
                clientEmail: newAuthClient.clientEmail
            }
        }).then((response) => {
            const body: { accessToken: string } = response.body;
            newAuthClient.accessToken = body.accessToken;
            Cypress.env('token', newAuthClient.accessToken)
            //cy.task('log', 'Token 1: ' + newAuthClient.accessToken)
        });
    });
};

const createBookOrder = (bookOrder: BookOrder): Cypress.Chainable<Cypress.Response<{
        orderId: string;
        created: boolean;
        bookOrder: BookOrder;
    }>
> => {
    const token = Cypress.env('token')
    cy.task('log', 'Token: ' + token)
    const authorization = `Bearer ${ token }`;
    return cy.request({
        method: 'POST',
        url: '/orders',
        headers: {
            authorization,
        },
        body: bookOrder
    });
};

const getBookOrderInfo = (bookOrder: BookOrder): Cypress.Chainable<Cypress.Response<BookOrder>> => {
    const token = Cypress.env('token')
    //cy.task('log', 'Token: ' + token)
    const authorization = `Bearer ${ token }`;
    return cy.request({
        method: 'GET',
        url: `/orders/${bookOrder.orderId}`,
        headers: {
            authorization,
        },
    });
};

Cypress.Commands.add('healthCheck', healthCheck);
Cypress.Commands.add('createToken', createToken);
Cypress.Commands.add('createBookOrder', createBookOrder);
Cypress.Commands.add('getBookOrderInfo', getBookOrderInfo);

declare global {
    namespace Cypress {
        interface Chainable {
            healthCheck: typeof healthCheck;
            createToken: typeof createToken;
            createBookOrder: typeof createBookOrder;
            getBookOrderInfo: typeof getBookOrderInfo;
       }
    }
}

export {};  