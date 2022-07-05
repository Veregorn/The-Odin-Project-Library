// Class Book (new version)
class Book {

    constructor(cover,title,author,pages,read) {
        this.id;
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
}

class Library {
    books;

    constructor(name) {
        this.name = name;
        this.books = [
            new Book("the-hobbit.jpg","The Hobbit", "J.R.R. Tolkien", 256, true),
            new Book("ikigai-for-teens.jpg","Ikigai for Teens: Finding Your Reason for Being", "Hector Garcia Puigcerver", 176, false),
            new Book("vestido-de-novia.jpg","Vestido de novia", "Pierre Lemaitre", 323, false),
            new Book("cosmos.jpg","Cosmos: Possible Worlds", "Ann Druyan", 384, false),
            new Book("yo-claudio.jpg","Yo, Claudio", "Robert Graves", 592, false)
        ];
        for (let i = 0; i < this.books.length; i++) {
            this.books[i].setBookId(i+1);
        }
    }

    getLibraryLength() {
        return this.books.length;
    }

    addBookToLibrary(book) {
        book.setBookId(this.getLibraryLength()+1);
        this.books.push(book);
        this.onBookListChanged(this.books);
    }

    removeBookFromLibrary(id) {
        for (let i = 0; i < this.getLibraryLength(); i++) {
            if (this.books[i].id == id) {
                this.books.splice(i,1);
            }
        }
        this.onBookListChanged(this.books);
    }

    getBookFromLibrary(id) {
        for (let i = 0; i < this.getLibraryLength(); i++) {
            if (this.books[i].id == id) {
                return this.books[i];
            }
        }
    }

    toggleBookRead(id) {
        for (let i = 0; i < this.getLibraryLength(); i++) {
            if (this.books[i].id == id) {
                this.books[i].changeReadStatus();
            }
        }
        this.onBookListChanged(this.books);
    }

    changeBookCover(id, cover) {
        for (let i = 0; i < this.getLibraryLength(); i++) {
            if (this.books[i].id == id) {
                this.books[i].setCover(cover);
            }
        }
        this.onBookListChanged(this.books);
    }

    bindLibraryChanged(callback) {
        this.onBookListChanged = callback;
    }
}

class UIView {
    
    constructor() {
        // Stores book cover's name file
        this.urlCover = "NoBookCover.png";
        
        // Element that stores all div about books
        this.container = this.getElement('main');

        // Elements of New Book Form
        this.titleInput = this.getElement('title');
        this.authorInput = this.getElement('author');
        this.pagesInput = this.getElement('pages');
        this.readCheckbox = this.getElement('read');

        // Elements for change cover
        this.coverImg = this.getElement('display-cover');
    }

    // Create an element with optional CSS class and ID
    createElement(tag, className, id) {
        const element = document.createElement(tag);
        if (className) {
            element.setAttribute('class',className);
        }
        if (id) {
            element.setAttribute('id',id);
        }
        return element;
    }

    getElement(id) {
        const element = document.getElementById(id);
        return element;
    }

    getElementsByClass(c) {
        const elemArray = document.querySelectorAll(c);
        return elemArray;
    }

    displayBooks(books) {
        // Delete all nodes
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild)
        }

        // Show default message
        if (books.length === 0) {
            const p = this.createElement('p');
            p.textContent = "The Library is empty";
            this.container.appendChild(p);
        } else {
            // Create divs for every book in the array
            books.forEach(book => {
                const bookDiv = this.createElement('div','book','book-'+book.getBookId());
                const cover = this.createElement('img','cover');
                cover.setAttribute('src',book.getCover());
                cover.setAttribute('alt',book.getTitle());
                bookDiv.appendChild(cover);
                const title = this.createElement('p','title');
                title.textContent = book.getTitle();
                bookDiv.appendChild(title);
                const author = this.createElement('p','author');
                author.textContent = book.getAuthor();
                bookDiv.appendChild(author);
                const pages = this.createElement('p','pages');
                pages.textContent = book.getPages() + ' pages';
                bookDiv.appendChild(pages);
                const read = this.createElement('p','read','read-'+book.getBookId());
                if (book.isReaded() == true) {
                    read.textContent = "\u2705 Read yet";
                } else {
                    read.textContent = "\u274c Not read yet";
                }
                bookDiv.appendChild(read);
                const btnCont = this.createElement('div','buttonsContainer');
                const rmvBtn = this.createElement('button','removeButton');
                rmvBtn.setAttribute('data-indexrmv',book.getBookId());
                rmvBtn.textContent = "\u2717 Remove";
                const statBtn = this.createElement('button','statusButton');
                statBtn.setAttribute('data-indexstat',book.getBookId());
                statBtn.textContent = "\u21B9 State";
                btnCont.appendChild(rmvBtn);
                btnCont.appendChild(statBtn);
                bookDiv.appendChild(btnCont);
                this.container.appendChild(bookDiv);
            });
        }
    }

    // Method that changes 'popup' class element 'display' property to 'flex'
    showForm() {
        const saveBookButton = this.getElement('saveBook');
        saveBookButton.disabled = true;
        const form = document.querySelector('.popup');
        form.style.display = "flex";
    }

    // Method that changes 'popup' class element 'display' property to 'none'
    closeForm() {
        const form = this.getElement("newBookForm");
        form.reset();
        const popup = document.querySelector('.popup');
        popup.style.display = "none";
    }

    // Method that enable 'Save Book' button only when user fills fields 'Title', 'Author' and 'Pages'
    checkForm() {
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

    // Add an Event Listener to the 'NEW BOOK' button
    bindNewBook() {
        this.getElement('newBook').addEventListener('click', () => { this.showForm(); });
    }

    // Add an Event Listener to the zone out of the 'newBookForm'
    // to close it if user clicks outside it
    bindOutForm() {
        document.addEventListener('click', (element) => {
            // Check if the zone clicked is out the form div
            const isOutOfForm = element.target.closest('.popup-content');
            // Check if the zone clicked is the 'New Book' button
            const isButton = element.target.closest('button');
            const popup = document.querySelector('.popup');
            // If the users clicks out the form and the zone isn't the 'New Book' button and
            // the form is visible...
            if (!isOutOfForm && !isButton && popup.style.display == 'flex') {
                this.closeForm();
            }
        });
    }

    // Add an Event Listener to the 'SAVE BOOK' button
    bindSaveBook(handler) {
        this.getElement('saveBook').addEventListener('click', () => {
            const book = new Book(this.urlCover,this.titleInput.value,
                this.authorInput.value,this.pagesInput.value,this.readCheckbox.checked);
            handler(book);
            this.closeForm();
        });
    }

    // Add an Event Listener to 'Remove' Button
    bindRemoveBook(handler) {
        this.container.addEventListener('click', event => {
            if (event.target.className === 'removeButton') {
                const id = event.target.dataset.indexrmv;
                handler(id);
            }
        });
    }

    // Add an Event Listener to a 'State' Button
    bindToggleState(handler) {
        this.container.addEventListener('click', event => {
            if (event.target.className === 'statusButton') {
                const id = event.target.dataset.indexstat;
                handler(id);
            }
        });
    }

    // Add an Event Listener for change book covers button
    bindChangeCover() {
        document.addEventListener('change', event => {
            if (event.target.className === 'cover') {
                this.urlCover = URL.createObjectURL(event.target.files[0]);
                this.coverImg.src = this.urlCover;
            }
        });
    }
}

class Controller {
    constructor(model, view) {
        this.library = model;
        this.view = view;

        // Explicit this binding
        this.view.bindNewBook();
        this.view.bindOutForm();
        this.view.bindSaveBook(this.handleSaveBook);
        this.view.bindRemoveBook(this.handleRemoveBook);
        this.view.bindToggleState(this.handleToggleState);
        this.view.bindChangeCover();
        this.library.bindLibraryChanged(this.onBookListChanged);

        // Display initial books
        this.onBookListChanged(this.library.books);
    }

    onBookListChanged = (books) => {
        this.view.displayBooks(books);
    }

    handleSaveBook = book => {
        this.library.addBookToLibrary(book);
    }

    handleRemoveBook = (id) => {
        this.library.removeBookFromLibrary(id);
    }

    handleToggleState = (id) => {
        this.library.toggleBookRead(id);
    }

    handleChangeCover = (id,cover) => {
        this.library.changeBookCover(id,cover);
    }
}

const myLibrary = new Controller(new Library("Veregorn's Library"), new UIView());