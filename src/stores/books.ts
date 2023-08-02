import { defineStore } from "pinia";
import { Book, Cart } from "../types";

const api = "https://json-server-iota-one.vercel.app/books";

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
        const data = await response.json();
        this.books = data;
      } catch (error) {
        this.$state.error = error as string;
      }
    },
    async fetchBook(id: number): Promise<any> {
      try {
        const response = await fetch(`${api}/${id}`);
        if (!response.ok) {
          throw new Error("Network error. please try again");
        }
        const data = await response.json();
        this.book = data;
        return data;
      } catch (error) {
        this.$state.error = error as string;
      }
    },
    async fetchAndValidateBook(cartItem: Cart): Promise<Book> {
      const book = await this.fetchBook(cartItem.id) as Book;
      
      if (!book) {
        throw new Error("Book not found.");
      }
    
      if (book.availableStock <= 0) {
        throw new Error(`Book ${book.title} is currently out of stock.`);
      }
    
      if (book.availableStock < cartItem.qty) {
        throw new Error(`Quantity exceeded. The book ${book.title} exceeds the available quantity."`);
      }
    
      return book;
    },
    async makePurchase(cartItem: Cart): Promise<any> {  try {
      const book = await this.fetchAndValidateBook(cartItem);
      
      book.availableStock -= cartItem.qty;
   
      const response = await fetch(`${api}/${cartItem.id}`, {
        method: "PUT",
        body: JSON.stringify(book),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to update book stock. Please try again.");
      }
  
      const bookPurchased = { ...book };
      const { id, price, availableStock, ...bookPurchasedData } = bookPurchased;
  
      try {
        const purchaseResponse = await fetch(`${api}/${cartItem.id}/purchases`, {
          method: "POST",
          body: JSON.stringify(bookPurchasedData),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!purchaseResponse.ok) {
          throw new Error("Failed to make the purchase. Please try again.");
        }
  
        const purchaseData = await purchaseResponse.json();
        return purchaseData;
      } catch (error) {
        throw new Error("An error occurred while processing the purchase.");
      }
    } catch (error) {
      throw new Error("An error occurred while making the purchase.");
    }
    },
    async checkout(): Promise<any> {
      try {
       return await Promise.all(
          this.cart.map((cartItem: Cart) => this.makePurchase(cartItem))
        );
      } catch (error) {
        this.$state.error = error as string;
      }
    },
    addToCart(cartItem: Cart, qty: number = 1) {
      const existingItemIndex = this.cart.findIndex(
        (item) => item.id === cartItem.id
      );
      if (existingItemIndex !== -1) {
        this.cart[existingItemIndex].qty += qty;
      } else {
        this.cart.push({ ...cartItem, qty });
      }
    },
    updateCartItemQuantity(bookId: number, increment: boolean) {
      const itemToUpdate = this.cart.find(({ id }) => id === bookId);
      if (itemToUpdate) {
        if (increment) {
          itemToUpdate.qty++;
        } else {
          itemToUpdate.qty--;
        }
      }
    },
    deleteCartItem(bookId: number): void {
      this.cart = this.cart.filter(({ id }) => id !== bookId);
    },
    clearError() {
      this.$state.error = null;
    },
  },
});
