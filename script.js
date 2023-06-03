let addButton = document.getElementById("add_book");
let removeButton = document.getElementById('removeBtn');
let hiddenForm = document.getElementById("hiddenForm");

let titleInput = document.getElementById('title');
let authorInput = document.getElementById('author');
let pagesInput = document.getElementById('pages');
let checkedInput = document.getElementById('checkbox');



let myLibrary = [{title:'Genius By Me', author: 'Estaban', pages: '99', read: 'Read'}];

addButton.addEventListener("click", function() {
  if (hiddenForm.style.display === "none") {
    hiddenForm.style.display = "block";
  } else {
    hiddenForm.style.display = "none";
  }
});



hiddenForm.addEventListener("submit", function(event){
    event.preventDefault();
    

    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let isChecked = checkedInput.checked;
    let read = isChecked ? 'Read' : 'Not read';


    if (title === "" || author === ""){
      return;
    } 

    console.log("Submitted Title:", title);
    console.log("Submitted Author:", author);
    console.log("Submitted Pages:", pages)

  let isDuplicate = myLibrary.some(function(book){
    return (
      (book.title && book.title.toLowerCase() === title.toLowerCase()) &&
      (book.author && book.author.toLowerCase() === author.toLowerCase())
    );
  });

    if (isDuplicate) {
      console.log("Book already exists in the library.");
      return;
    }

    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    
    // Display the books in the library or perform other operations
    displayLibrary();


});


removeButton.addEventListener("click", function(){

  let title = titleInput.value;
  let author = authorInput.value;

  remove(title, author); 
})



function Book(title, author, pages, read ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        console.log(title, author, pages, read);
    };
}

function displayLibrary() {

  let libraryContainer = document.getElementById('display');
  //get the display element
  libraryContainer.innerHTML='';
  //empty the display element
  myLibrary.forEach((book, index ) => {
    //iterate through the array, and using index as the marker
    let bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    //create a div and add the book class to it
    let titleElement = document.createElement('h2');
    titleElement.textContent = book.title;
    //
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
function remove(title, author) {
  
  let checkRemove = myLibrary.findIndex(book => {
    return (
    book.title.toLowerCase() === title.toLowerCase() 
    && book.author.toLowerCase() === author.toLowerCase()
    );
  });

  if(checkRemove !== -1) {
    myLibrary.splice(checkRemove, 1);
  }
  displayLibrary();
}
