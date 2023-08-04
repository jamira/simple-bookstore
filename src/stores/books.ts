import { defineStore } from "pinia";
import { Book, Cart } from "../types";
import axios from 'axios';

const api = import.meta.env.VITE_API_BOOKS;

export const useCounterBooks = defineStore("books", {
  state: () => ({
    books: <Book[]>[],
    book: <Book>{},
    cart: <Cart[]>[],
    error: null as string | null,
    isResolved: false
  }),
  getters: {
    cartCount: (state) =>
      state.cart
        .map(({ qty }) => qty)
        .reduce((currentVal, previousVal) => currentVal + previousVal, 0),
    orderTotal: (state) =>
      state.cart.reduce((total, item) => total + item.price * item.qty, 0),
  },
  actions: {
    async fetchBooks(): Promise<void> {
      try {
        const response = await axios.get(`${api}`);
        const { books } = response.data;
        this.books = books;
      } catch (error) {
        this.setError(error as string);
      }
    },
    async fetchBook(id: number): Promise<void> {
      try {
        const response = await axios.get(`${api}/${id}`);
        const { book } = response.data;
        this.book = book;
      } catch (error) {
        this.setError(error as string);
      }
    },
    async purchase(book: Book): Promise<any> {
      try {
       const response = await axios.post(`${api}/${book.id}/purchase`, book, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        this.deleteCartItem(book.id)

        return response

      } catch (error) {
        this.setError(`Request for ${book.title} failed`)
        throw book;
      }
    },
    async makePurchase(): Promise<void> {
      try {
        const purchasePromises = this.cart.map(cartItem => this.purchase(cartItem));
        Promise.all(purchasePromises)
          .then(() => {
            // console.log('All requests resolved:', resolvedItems);
            this.isResolved = true
            this.cart = [];
          })
          .catch(() => {
            // console.log('Some requests rejected:', rejectedItems);
            this.isResolved = false
          });
      } catch (error) {
        this.setError(error as string);
      }
    },    
    async addToCart(cartItem: Cart, qty: number = 1): Promise<void> {
      return new Promise((resolve) => {
        const existingItemIndex = this.cart.findIndex(
          (item: Cart) => item.id === cartItem.id
        );
        
        if (existingItemIndex !== -1) {
          this.cart[existingItemIndex].qty += qty;
        } else {
          this.cart.push({ ...cartItem, qty });
        }
    
        resolve();
      })
    }, 
    deleteCartItem(bookId: number): void {
      this.cart = this.cart.filter(({ id }) => id !== bookId);
    },
    setError(errorMessage: string) {
      this.error = errorMessage;
    },
    clearError() {
      this.$state.error = null;
    },
  },
});