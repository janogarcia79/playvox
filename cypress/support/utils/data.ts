import { faker } from '@faker-js/faker';
import { BookOrder } from 'cypress/types';
import { Auth } from 'cypress/types';


export const generateAuthClient = (): Auth => {
    return {
        clientName: faker.person.firstName() + faker.person.lastName(),
        clientEmail: faker.internet.email()
    };  
};

export const generateBookOrder = (): BookOrder => {
    return {
        bookId: faker.number.int({ min: 1, max: 6 }),
        customerName: faker.person.firstName()
    };  
};