import { BookOrder } from '../types';
import { generateBookOrder } from 'cypress/support/utils/data';

before('Health Check', () => {
    cy.healthCheck();
    cy.createToken();
});

describe('Booker', () => {
    let newBookOrder: BookOrder = generateBookOrder();
 
    it('creates a new book order', () => {
        cy.createBookOrder(newBookOrder).then(({ status, body }) => {
            expect(status).to.eq(201);
            expect(body).to.have.property('orderId');
            expect(body).to.have.property('created');
            newBookOrder.orderId = body.orderId
            newBookOrder.created = body.created
            //cy.task('log', 'newBookOrder..orderId: ' + newBookOrder.orderId)
            //cy.task('log', 'newBookOrder.created: ' + newBookOrder.created)
            //cy.task('log', 'newBookOrder.bookId: ' + newBookOrder.bookId)
            //cy.task('log', 'newBookOrder.created: ' + newBookOrder.created)
            //cy.task('log', 'newBookOrder.customerName: ' + newBookOrder.customerName)
        });
    });

    it('verify book order created', () => {
        cy.getBookOrderInfo(newBookOrder).then(({ status, body }) => {
            expect(status).to.eq(200);
            expect(body).to.have.property('id');
            expect(body).to.have.property('bookId');
            expect(body).to.have.property('customerName');
            expect(body).to.have.property('createdBy');
            expect(body).to.have.property('quantity');
            expect(body).to.have.property('timestamp');

            newBookOrder.bookId = body.bookId
            newBookOrder.customerName = body.customerName
            newBookOrder.createdBy = body.createdBy
            newBookOrder.quantity = body.quantity
            newBookOrder.timestamp = body.timestamp

            cy.task('log', 'newBookOrder.orderId: ' + newBookOrder.orderId)
            cy.task('log', 'newBookOrder.created: ' + newBookOrder.created)
            cy.task('log', 'newBookOrder.bookId: ' + newBookOrder.bookId)
            cy.task('log', 'newBookOrder.customerName: ' + newBookOrder.customerName)
            cy.task('log', 'newBookOrder.createdBy: ' + newBookOrder.createdBy)
            cy.task('log', 'newBookOrder.quantity: ' + newBookOrder.quantity)
            cy.task('log', 'newBookOrder.timestamp: ' + newBookOrder.timestamp)
        });
    });
});