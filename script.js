let addButton = document.getElementById("add_book");
let hiddenForm = document.getElementById("hiddenForm");
let myLibrary = [{name:'Genius By Me', author: 'Estaban', pages: '99', read: 'Read'}];

addButton.addEventListener("click", function() {
  if (hiddenForm.style.display === "none") {
    hiddenForm.style.display = "block";
  } else {
    hiddenForm.style.display = "none";
  }
});

hiddenForm.addEventListener("submit", function(event){
    event.preventDefault();

    let titleInput = document.getElementById('title');
    let authorInput = document.getElementById('author');
    let pagesInput = document.getElementById('pages');
    let checkedInput = document.getElementById('checkbox');
    
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let isChecked = checkedInput.checked;
    let read = isChecked ? 'Read' : 'Not read';

    console.log("Submitted Title:", title);
    console.log("Submitted Author:", author);
    console.log("Submitted Pages:", pages)

    // Check if the book already exists in the library
    let isDuplicate = myLibrary.some(book => book.title === title || book.author === author);
    if (isDuplicate) {
        console.log("Book already exists in the library.");
        return;
    }

    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    
    // Display the books in the library or perform other operations
    displayLibrary();
});


function Book(name, author, pages, read ) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        console.log(name, author, pages, read);
    };
}

function displayLibrary() {

  let libraryContainer = document.getElementById('display');

  libraryContainer.innerHTML='';

  myLibrary.forEach((book, index ) => {

    let bookDiv = document.createElement('div');
    bookDiv.classList.add('book');

    let titleElement = document.createElement('h2');
    titleElement.textContent = book.name;

    let authorElement = document.createElement('p');
    authorElement.textContent = 'Author: ' + book.author;

    let pagesElement = document.createElement('p');
    pagesElement.textContent = 'Pages: ' + book.pages;

    let readElement = document.createElement('p');
    readElement.textContent = 'Status: ' + book.read;

    bookDiv.appendChild(titleElement);
    bookDiv.appendChild(authorElement);
    bookDiv.appendChild(pagesElement);
    bookDiv.appendChild(readElement);

    libraryContainer.appendChild(bookDiv)

  });
}

// Additional functions for adding/removing books to/from the library
function remove() {
    myLibrary.pop()
}