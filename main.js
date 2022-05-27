// Books Constructor
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        if (read) {
            return title + " by " + author + ", " + pages + " pages, read yet";
        } else {
            return title + " by " + author + ", " + pages + " pages, not read yet";
        }
    }
}

// Function that takes a book and place it into the Array
function addBookToLibrary(book) {
    myLibrary.push(book);
}

// Function that print the info of all the books in the library
function listBooksInLibrary(library) {
    const table = document.querySelector('#booksTable');
    for (const i in library) {
        if (Object.hasOwnProperty.call(library, i)) {
            const element = library[i];
            const bookFile = document.createElement('tr');
            const bookData = document.createElement('td');
            bookData.textContent = element.info();
            bookFile.appendChild(bookData);
            table.appendChild(bookFile);
        }
    }
}

let myLibrary = [];
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 256, true);
const ikigaiForTeens = new Book("Ikigai for Teens: Finding Your Reason for Being", "Hector Garcia Puigcerver", 176, false);
const vestidoDeNovia = new Book("Vestido de novia", "Pierre Lemaitre", 323, false);
addBookToLibrary(theHobbit);
addBookToLibrary(ikigaiForTeens);
addBookToLibrary(vestidoDeNovia);
listBooksInLibrary(myLibrary);