export type Book = {
    id?: number;
    name?: string;
    type?: string;
    available?: boolean;
};

export type BookOrder = {
    orderId?: string;
    created?: boolean;
    bookId?: number;
    customerName?: string;
    createdBy?: string;
    quantity?: number;
    timestamp?: number;
};

export type Auth = {
    clientName?: string;
    clientEmail?: string;
    accessToken?: string;
};
