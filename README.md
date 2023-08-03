# Simple Bookstore

This challenge features a user-friendly landing page that showcases a list of available books along with essential information (extracted from the API). The landing page offers seamless navigation to dedicated pages for each book, presenting additional details in alignment with API data. And it has simple cart page where user can buy a copy of the book and can do checkout.

Demo: [https://bookstore-server-efb80.web.app](https://bookstore-server-efb80.web.app)


## Features
1. **Landing Page:** The homepage exhibits a curated collection of books, displaying their titles, authors, and other pertinent details. This enables users to quickly browse through the available books.
2. **Book Details Page:** Each book has its own dedicated page, accessible by clicking on its title or associated link. This page presents comprehensive information about the selected book, enhancing the user's understanding of its content.
3. **Simplified Cart and Checkout:** Seamlessly select books of interest and add them to the cart. The cart page is thoughtfully designed for efficient management, allowing users to purchase book copies and proceed through the checkout process smoothly.

## Acceptance Criteria
1. View List of Available Books:
    * Given that I am a user, when I access the landing page, then I should be presented with a comprehensive list of all available books.
    * The list should showcase essential details of each book, including titles and authors, which have been extracted from the API.

2. Explore Book Details:
    * As a user, upon clicking on a book's title or associated link, I should be seamlessly redirected to a dedicated page displaying intricate book details.
    * The book details page should replicate the information provided by the API, offering a consistent and comprehensive understanding of the chosen book.
3. Purchase Book Copy:
    * While on the book details page, I should encounter an option that enables me to purchase a copy of the book.
    * Upon initiating the purchase process, the system should utilize the provided API endpoint to complete the transaction.
    * After the purchase, I should receive a confirmation message indicating the successful acquisition of the book copy.

## Getting Started
1. Clone or download the repository to your local machine.
2. Install the required dependencies by running`npm install` in the terminal.
3. Open .env.sample to .env. Within the .env file, input the API URL.
4. Start the app by running `npm run dev`