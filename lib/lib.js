//creating the library array
let myLibrary = [];

//adding the book constructor
function Book(title,author,pages,status){
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

//adding the addBook function
function addBookToLibrary() { //dont give argument if you will be using let to declare the variables.
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  let status = document.getElementById('status').checked;
  let newBook = new Book(title,author,pages,status);
  console.log('newbook', newBook);
  myLibrary.push(newBook);
}

//adding DOM elements
const addBookBtn = document.getElementById('addBookBtn');
const bookForm = document.getElementById('bookForm');
const submitBtn = document.getElementById('submitBtn');
const closeBtn = document.getElementById('closeBtn');

//adding event listners 
addBookBtn.addEventListener('click', () => {
  bookForm.style.display = 'block';
});


//function to display the added books 
function displayBooks(){  
  let cardContainer = document.getElementById('cardContainer')
    cardContainer.innerHTML = '';//creating a new card to add book 2 and allow book 1 to exist in the previous card
console.log('library', myLibrary);
//creating the individual cards
  myLibrary.forEach(book =>{ 
    let card = document.createElement('div'); //creates a new empty div
    card.className = "bookCard";

    // Adding content to the card
    card.innerHTML = `
      <h6 class>${book.title}</h6>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p class="readstatus">${book.status? "Read":"Not Read"}</p>
      <button class='removeBtn' lib-id="${book.id}")>Remove</button>
      <button class='toggleRead' lib-id="${book.id}">
      ${book.status? "Mark as Unread" : "Mark as Read"}
      </button> 
    `;

// Add event listener to the Remove button
/*querySelector: element does NOT have an id, but has a class, tag, or attribute you can select by. 
  getElementById: when element has a unique id attribute assigned in the HTML*/
 let removeBtn = card.querySelector('.removeBtn'); 
 removeBtn.addEventListener('click', (e) => {
  let idToRemove = e.target.getAttribute('lib-id');
  myLibrary = myLibrary.filter(book => book.id !== idToRemove);
  displayBooks(); 
});

//adding toggle status functionality
let toggleBtn = card.querySelector('.toggleRead');
toggleBtn.addEventListener('click', (e) =>{
  let bookToToggle = myLibrary.find(book => book.id === toggleBtn.getAttribute('lib-id'));
  if (bookToToggle) {
    bookToToggle.status = !bookToToggle.status;
    displayBooks();
    }
});

    // adding the card to the container
    cardContainer.appendChild(card);    
  })
}



const cardContainer = document.getElementById('cardContainer');
bookForm.addEventListener('submit', (e) => {  
  e.preventDefault ();
  addBookToLibrary();
  displayBooks();

  //allow the book container to be visible when book is submitted
  cardContainer.style.display = 'flex'; 
  console.log('Submit clicked, showing container');  

  bookForm.reset(); //makes the form empty for next entry
  bookForm.style.display = 'none'; //hides the bookForm when one book is submitted
});

//allowing user to close form if they dont want to add a book
closeBtn.addEventListener('click', () => {
  bookForm.style.display = 'none';
});











