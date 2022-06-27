// Class Book (new version)
class Book {
    // orderInLibrary;
    id;

    constructor(cover,title,author,pages,read) {
        if (cover == "") {
            this.cover = "./NoBookCover.png"
        } else {
            this.cover = cover
        }
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    /*
    getOrderInLibrary() {
        return this.orderInLibrary;
    }
    */

    getBookId() {
        return this.id;
    }

    setBookId(id) {
        this.id = id;
    }

    getCover() {
        return this.cover;
    }

    setCover(cover) {
        this.cover = cover;
    }

    getTitle() {
        return this.title;
    }

    setTitle(title) {
        this.title = title;
    }

    getAuthor() {
        return this.author;
    }

    setAuthor(author) {
        this.author = author;
    }

    getPages() {
        return this.pages;
    }

    setPages(pages) {
        this.pages = pages;
    }

    isReaded() {
        return this.read;
    }

    changeReadStatus() {
        if (this.read == true) {
            this.read = false;

        } else {
            this.read = true;
        }
    }

    /*
    changeOrderInLibrary(position) {
        this.orderInLibrary = position;
    }

    show() {
        const container = document.querySelector('#main');
        const bookDiv = document.createElement('div');
        bookDiv.setAttribute('class','book');
        bookDiv.setAttribute('id','book-'+this.orderInLibrary);
        const cover = document.createElement('img');
        cover.setAttribute('class','cover');
        cover.setAttribute('src',this.cover);
        cover.setAttribute('alt',this.title);
        bookDiv.appendChild(cover);
        const title = document.createElement('p');
        title.setAttribute('class','title');
        title.textContent = this.title;
        bookDiv.appendChild(title);
        const author = document.createElement('p');
        author.setAttribute('class','author');
        author.textContent = this.author;
        bookDiv.appendChild(author);
        const pages = document.createElement('p');
        pages.setAttribute('class','pages');
        pages.textContent = this.pages + ' pages';
        bookDiv.appendChild(pages);
        const read = document.createElement('p');
        read.setAttribute('class','read');
        read.setAttribute('id','read-'+this.orderInLibrary);
        if (this.read == true) {
            read.textContent = "\u2705 Read yet";
        } else {
            read.textContent = "\u274c Not read yet";
        }
        bookDiv.appendChild(read);
        const btnCont = document.createElement('div');
        btnCont.setAttribute('class','buttonsContainer');
        const rmvBtn = document.createElement('button');
        rmvBtn.setAttribute('class','removeButton');
        rmvBtn.setAttribute('data-indexrmv',this.orderInLibrary);
        rmvBtn.textContent = "\u2717 Remove";
        const statBtn = document.createElement('button');
        statBtn.setAttribute('class','statusButton');
        statBtn.setAttribute('data-indexstat',this.orderInLibrary);
        statBtn.textContent = "\u21B9 State";
        btnCont.appendChild(rmvBtn);
        btnCont.appendChild(statBtn);
        bookDiv.appendChild(btnCont);
        container.appendChild(bookDiv);
    }

    unShow() {
        const container = document.querySelector('#main');
        const thisDiv = document.getElementById('book-'+this.orderInLibrary);
        container.removeChild(thisDiv);
    }
    */
}

class Library {
    books = [];
    idCounter = 0;

    constructor(name) {
        this.name = name;
    }

    addBookToLibrary(book) {
        this.idCounter++;
        book.setBookId(this.idCounter);
        this.books.push(book);

        /*
        const index = this.books.length-1;
        book.changeOrderInLibrary(index);
        book.show();
        const thisRmvBtn = document.querySelector('[data-indexrmv="' + index + '"]');
        const thisStatBtn = document.querySelector('[data-indexstat="' + index + '"]');
        addListenerToARemoveButton(thisRmvBtn);
        addListenerToAChangeStatusButton(thisStatBtn);
        */
    }

    removeBookFromLibrary(id) {
        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i].id == id) {
                this.books.splice(i,1);
            }
        }
    }
}

class UIController {
    
    container = document.querySelector('#main');
    
    showBook(book) {
        const bookDiv = document.createElement('div');
        bookDiv.setAttribute('class','book');
        bookDiv.setAttribute('id','book-'+book.getBookId());
        const cover = document.createElement('img');
        cover.setAttribute('class','cover');
        cover.setAttribute('src',book.getCover());
        cover.setAttribute('alt',book.getTitle());
        bookDiv.appendChild(cover);
        const title = document.createElement('p');
        title.setAttribute('class','title');
        title.textContent = book.getTitle();
        bookDiv.appendChild(title);
        const author = document.createElement('p');
        author.setAttribute('class','author');
        author.textContent = book.getAuthor();
        bookDiv.appendChild(author);
        const pages = document.createElement('p');
        pages.setAttribute('class','pages');
        pages.textContent = book.getPages() + ' pages';
        bookDiv.appendChild(pages);
        const read = document.createElement('p');
        read.setAttribute('class','read');
        read.setAttribute('id','read-'+book.getBookId());
        if (book.isReaded() == true) {
            read.textContent = "\u2705 Read yet";
        } else {
            read.textContent = "\u274c Not read yet";
        }
        bookDiv.appendChild(read);
        const btnCont = document.createElement('div');
        btnCont.setAttribute('class','buttonsContainer');
        const rmvBtn = document.createElement('button');
        rmvBtn.setAttribute('class','removeButton');
        rmvBtn.setAttribute('data-indexrmv',book.getBookId());
        rmvBtn.textContent = "\u2717 Remove";
        const statBtn = document.createElement('button');
        statBtn.setAttribute('class','statusButton');
        statBtn.setAttribute('data-indexstat',book.getBookId());
        statBtn.textContent = "\u21B9 State";
        btnCont.appendChild(rmvBtn);
        btnCont.appendChild(statBtn);
        bookDiv.appendChild(btnCont);
        this.container.appendChild(bookDiv);
    }

    unShowBook(book) {
        const thisDiv = document.getElementById('book-'+book.getBookId());
        this.container.removeChild(thisDiv);
    }
}

// Function that enable 'Save Book' button only when user fills fields 'Title', 'Author' and 'Pages'
function checkForm() {
    const requiredElements = document.querySelectorAll('.notCheckbox');
    let canSaveBook = true;

    for (let i = 0; i < requiredElements.length; i++) {
        const element = requiredElements[i];
        if (element.value.length == 0) {
            canSaveBook = false;
        }
    }

    document.getElementById('saveBook').disabled = !canSaveBook;
}

// Function that takes a book and place it into the Array and the DOM
/*
function addBookToLibrary(book) {
    myLibrary.push(book);
    const index = myLibrary.length-1;
    book.changeOrderInLibrary(index);
    book.show();
    const thisRmvBtn = document.querySelector('[data-indexrmv="' + index + '"]');
    const thisStatBtn = document.querySelector('[data-indexstat="' + index + '"]');
    addListenerToARemoveButton(thisRmvBtn);
    addListenerToAChangeStatusButton(thisStatBtn);
}
*/

function reorderIndexesInLibrary() {
    const divBooks = document.querySelectorAll('.book');
    const removeButtons = document.querySelectorAll('.removeButton');
    const changeStatusButtons = document.querySelectorAll('.statusButton');
    const readAttributes = document.querySelectorAll('.read');
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        book.changeOrderInLibrary(i);
        divBooks[i].setAttribute('id','book-'+i);
        removeButtons[i].setAttribute('data-indexrmv',i);
        changeStatusButtons[i].setAttribute('data-indexstat',i);
        readAttributes[i].setAttribute('id','read-'+i);
    }
}

/*
// Function that takes a book and remove it from the Array and the DOM
function removeBookFromLibrary(book) {
    myLibrary.splice(book.getOrderInLibrary(),1);
    book.unShow();
    reorderIndexesInLibrary();
}
*/

// Listener associated to 'NEW BOOK' button
const newBookButton = document.querySelector('#newBook');
newBookButton.addEventListener('click', function(){showForm()});

// Function that changes 'popup' class element 'display' property
function showForm() {
    const saveBookButton = document.getElementById('saveBook');
    saveBookButton.disabled = true;
    const form = document.querySelector('.popup');
    form.style.display = "flex";
}

function closeForm() {
    const form = document.getElementById("newBookForm");
    form.reset();
    const popup = document.querySelector('.popup');
    popup.style.display = "none";
}

// Listener associated to 'Save Book' button
const saveBookButton = document.querySelector('#saveBook');
saveBookButton.addEventListener('click', function() {
    const cover = urlCover;
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    const newBook = new Book(cover,title,author,pages,read);
    addBookToLibrary(newBook);
    closeForm();
});

let urlCover = "NoBookCover.png";
let myLibrary = new Library("Veregorn's Library");
let myUIController = new UIController();
let theHobbit = new Book("the-hobbit.jpg","The Hobbit", "J.R.R. Tolkien", 256, true);
let ikigaiForTeens = new Book("ikigai-for-teens.jpg","Ikigai for Teens: Finding Your Reason for Being", "Hector Garcia Puigcerver", 176, false);
let vestidoDeNovia = new Book("vestido-de-novia.jpg","Vestido de novia", "Pierre Lemaitre", 323, false);
let cosmos = new Book("cosmos.jpg","Cosmos: Possible Worlds", "Ann Druyan", 384, false);
let yoClaudio = new Book("yo-claudio.jpg","Yo, Claudio", "Robert Graves", 592, false);
myLibrary.addBookToLibrary(theHobbit);
myUIController.showBook(theHobbit);
myLibrary.addBookToLibrary(ikigaiForTeens);
myUIController.showBook(ikigaiForTeens);
myLibrary.addBookToLibrary(vestidoDeNovia);
myUIController.showBook(vestidoDeNovia);
myLibrary.addBookToLibrary(cosmos);
myUIController.showBook(cosmos);
myLibrary.addBookToLibrary(yoClaudio);
myUIController.showBook(yoClaudio);

// Function that creates the listener associated to a 'Remove Book' button
function addListenerToARemoveButton(removeButton) {
    removeButton.addEventListener('click', function() {
        const i = removeButton.dataset.indexrmv;
        removeBookFromLibrary(myLibrary[i]);
    });
}

// Function that creates the listener associated to a 'Change Read Status' button
function addListenerToAChangeStatusButton(changeButton) {
    changeButton.addEventListener('click', function() {
        // First, let's edit the object Book
        const i = changeButton.dataset.indexstat;
        const book = myLibrary[i];
        book.changeReadStatus();
        // Let's modify the DOM
        const element = document.getElementById('read-'+i);
        if (book.isReaded()) {
            element.textContent = "\u2705 Read yet";
        } else {
            element.textContent = "\u274c Not read yet";
        }
    });
}

// Listener that hide the form if the user click outside it
document.addEventListener('click', function(element) {
    // Check if the zone clicked is out the form div
    const isOutOfForm = element.target.closest('.popup-content');
    // Check if the zone clicked is the 'New Book' button
    const isButton = element.target.closest('button');
    const popup = document.querySelector('.popup');
    // If the users clicks out the form and the zone isn't the 'New Book' button and
    // the form is visible...
    if (!isOutOfForm && !isButton && popup.style.display == 'flex') {
        closeForm();
    }
});

// Listener for covers
const coverInput = document.querySelector('#cover');

coverInput.addEventListener('change', function() {
    const coverImg = document.querySelector('#display-cover');
    urlCover = URL.createObjectURL(this.files[0]);
    coverImg.src = urlCover;
});