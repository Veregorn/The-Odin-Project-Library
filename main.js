// Books Constructor
function Book(cover, title, author, pages, read) {
    if (cover == "") {
        this.cover = "./NoBookCover.png"
    } else {
        this.cover = cover
    }
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.orderInLibrary = undefined
    this.getOrderInLibrary = function() {
        return this.orderInLibrary;
    }
    this.isReaded = function() {
        return this.read;
    }
    this.changeReadStatus = function() {
        if (this.read == true) {
            this.read = false;

        } else {
            this.read = true;
        }
    }
    this.changeOrderInLibrary = function(position) {
        this.orderInLibrary = position;
    }
    this.show = function() {
        const container = document.querySelector('#main');
        const bookDiv = document.createElement('div');
        bookDiv.setAttribute('class','book');
        bookDiv.setAttribute('id','book-'+this.orderInLibrary);
        const cover = document.createElement('img');
        cover.setAttribute('class','cover');
        cover.setAttribute('src','./' + this.cover);
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
    this.unShow = function() {
        const container = document.querySelector('#main');
        const thisDiv = document.getElementById('book-'+this.orderInLibrary);
        container.removeChild(thisDiv);
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

// Function that takes a book and remove it from the Array and the DOM
function removeBookFromLibrary(book) {
    myLibrary.splice(book.getOrderInLibrary(),1);
    book.unShow();
    reorderIndexesInLibrary();
}

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
    const cover = "";
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    const newBook = new Book(cover,title,author,pages,read);
    addBookToLibrary(newBook);
    
    closeForm();
});

let myLibrary = [];
const theHobbit = new Book("the-hobbit.jpg","The Hobbit", "J.R.R. Tolkien", 256, true);
const ikigaiForTeens = new Book("ikigai-for-teens.jpg","Ikigai for Teens: Finding Your Reason for Being", "Hector Garcia Puigcerver", 176, false);
const vestidoDeNovia = new Book("vestido-de-novia.jpg","Vestido de novia", "Pierre Lemaitre", 323, false);
const cosmos = new Book("cosmos.jpg","Cosmos: Possible Worlds", "Ann Druyan", 384, false);
const yoClaudio = new Book("yo-claudio.jpg","Yo, Claudio", "Robert Graves", 592, false);
addBookToLibrary(theHobbit);
addBookToLibrary(ikigaiForTeens);
addBookToLibrary(vestidoDeNovia);
addBookToLibrary(cosmos);
addBookToLibrary(yoClaudio);

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