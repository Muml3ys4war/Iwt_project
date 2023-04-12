// Book class to represent a book
class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

// Library class to manage the book collection
class Library {
  constructor() {
    this.books = [];
  }

  // Add a new book to the library
  addBook(book) {
    this.books.push(book);
  }

  // Remove a book from the library
  removeBook(book) {
    this.books = this.books.filter(b => b !== book);
  }

  // Update the status of a book
  updateStatus(book, status) {
    book.status = status;
  }

  // Get all books in the library
  getAllBooks() {
    return this.books;
  }
}

// DOM manipulation and event handling
document.addEventListener('DOMContentLoaded', () => {
  const library = new Library();

  // Get form and table elements
  const newBookForm = document.getElementById('new-book-form');
  const bookList = document.getElementById('book-list').getElementsByTagName('tbody')[0];

  // Add submit event listener to the form
  newBookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    const status = document.getElementById('status').value;

    // Create a new book object
    const newBook = new Book(title, author, pages, status);

    // Add the new book to the library
    library.addBook(newBook);

    // Clear the form inputs
    newBookForm.reset();

    // Update the book list in the DOM
    updateBookList();
  });

  // Function to update the book list in the DOM
  function updateBookList() {
    // Clear the existing book list
    while (bookList.firstChild) {
      bookList.firstChild.remove();
    }

    // Loop through all books in the library and create table rows for each book
    library.getAllBooks().forEach(book => {
      const row = document.createElement('tr');

      // Create table cells for book properties
      const titleCell = document.createElement('td');
      titleCell.textContent = book.title;
      row.appendChild(titleCell);

      const authorCell = document.createElement('td');
      authorCell.textContent = book.author;
      row.appendChild(authorCell);

      const pagesCell = document.createElement('td');
      pagesCell.textContent = book.pages;
      row.appendChild(pagesCell);

      const statusCell = document.createElement('td');
      statusCell.textContent = book.status;
      row.appendChild(statusCell);

      const removeButtonCell = document.createElement('td');
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.classList.add('btn', 'btn-danger', 'btn-sm');
      removeButton.addEventListener('click', () => {
        // Remove the book from the library
        library.removeBook(book);

        // Update the book list in the DOM
        updateBookList();
      });
      removeButtonCell.appendChild(removeButton);
      row.appendChild(removeButtonCell);

      // Add the row to the book list
      bookList.appendChild(row);
    });
  }

  // Initial update of the book list when the page loads
  updateBookList();
});

