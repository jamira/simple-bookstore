import { defineStore } from "pinia";
import { Book, Cart } from "../types";

const api = import.meta.env.VITE_API_BOOKS;

export const useCounterBooks = defineStore("books", {
  state: () => ({
    books: <Book[]>[],
    book: <Book>{},
    cart: <Cart[]>[],
    error: null as string | null,
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
        const response = await fetch(api);
        if (!response.ok) {
          throw new Error("Network error. please try again");
        }
        const { books } = await response.json();
        this.books = books;
      } catch (error) {
        this.$state.error = error as string;
      }
    },
    async fetchBook(id: number): Promise<void> {
      try {
        const response = await fetch(`${api}/${id}`);
        if (!response.ok) {
          throw new Error("Network error. please try again");
        }
        const { book } = await response.json();
        this.book = book;
      } catch (error) {
        this.$state.error = error as string;
      }
    },
    async purchase(book: Book): Promise<any> {
      try {
        const response = await fetch(`${api}/${book.id}/purchase`, {
          method: "POST",
          body: JSON.stringify(book),
          headers: {
            "Content-Type": "application/json",
          }
        })

        if (!response.ok) {
          throw new Error("Failed to purchase book.");
        }

        return response

      } catch (error) {
        this.$state.error = error as string;
      }
    },
    async makePurchase(): Promise<any> {
      try {
        return await Promise.all(
           this.cart.map((cartItem: Cart) => this.purchase(cartItem))
         );
       } catch (error) {
         this.$state.error = error as string;
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
    clearError() {
      this.$state.error = null;
    },
  },
});