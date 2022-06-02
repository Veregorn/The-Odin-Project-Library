// Books Constructor
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        if (this.read == true) {
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
            const bookRow = document.createElement('tr');
            const bookData = document.createElement('td');
            const deleteButtonCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = "Remove Book";
            deleteButton.setAttribute('class','removeButton');
            deleteButton.setAttribute('data-orderInArray',i);
            bookData.textContent = element.info();
            deleteButtonCell.appendChild(deleteButton);
            bookRow.appendChild(bookData);
            bookRow.appendChild(deleteButtonCell);
            table.appendChild(bookRow);
        }
    }
}

// Listener associated to 'NEW BOOK' button
const newBookButton = document.querySelector('#newBook');
newBookButton.addEventListener('click', function(){showForm()});

// Function that removes form attribute 'hidden'
function showForm() {
    const form = document.querySelector('#newBookForm');
    form.hidden = false;
}

// Function that list the book passed in parameter
function listThisBook(book) {
    const table = document.querySelector('#booksTable');
    const bookRow = document.createElement('tr');
    const bookData = document.createElement('td');
    const deleteButtonCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = "Remove Book";
    deleteButton.setAttribute('class','removeButton');
    deleteButton.setAttribute('data-orderInArray',myLibrary.length-1);
    addListenerToARemoveButton(deleteButton);
    bookData.textContent = book.info();
    deleteButtonCell.appendChild(deleteButton);
    bookRow.appendChild(bookData);
    bookRow.appendChild(deleteButtonCell);
    table.appendChild(bookRow);
}

// Listener associated to 'Save Book' button
const saveBookButton = document.querySelector('#saveBook');
saveBookButton.addEventListener('click', function() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    const newBook = new Book(title,author,pages,read);
    addBookToLibrary(newBook);
    listThisBook(newBook);
    document.getElementById("newBookForm").reset();
    document.getElementById("newBookForm").hidden = true;
});

let myLibrary = [];
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 256, true);
const ikigaiForTeens = new Book("Ikigai for Teens: Finding Your Reason for Being", "Hector Garcia Puigcerver", 176, false);
const vestidoDeNovia = new Book("Vestido de novia", "Pierre Lemaitre", 323, false);
addBookToLibrary(theHobbit);
addBookToLibrary(ikigaiForTeens);
addBookToLibrary(vestidoDeNovia);
listBooksInLibrary(myLibrary);

// Function that creates the listener associated to a 'Remove Book' button
function addListenerToARemoveButton(removeButton) {
    removeButton.addEventListener('click', function() {
        // Let's remove the element from our array
        const position = removeButton.dataset.orderInArray;
        myLibrary.splice(position,1);
        // Let's modify the DOM
        const table = document.querySelector('#booksTable');
        const fatherNode = removeButton.parentNode;
        const grandfatherNode = fatherNode.parentNode;
        table.removeChild(grandfatherNode);
    });
}

// Listener associated to 'Remove Book' buttons
const removeBookButtons = document.querySelectorAll('.removeButton');
removeBookButtons.forEach((button) => {
    addListenerToARemoveButton(button);
});