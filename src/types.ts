export interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string;
    price: number;
    availableStock: number;
  }
  
  export interface Cart extends Book {
    qty: number;
  }
  
  export interface Customer {
    fname: string;
    lname: string;
    email: string;
    contact: string;
    address: string;
    country: string;
    city: string;
    zipcode: string;
  }