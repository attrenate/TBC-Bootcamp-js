// ====== Virtual Library System ======

// Clear body and style basic layout
function setupBody() {
  document.body.innerHTML = "";
  document.body.style.fontFamily = "Arial, sans-serif";
  document.body.style.backgroundColor = "#f0f0f0";
  document.body.style.margin = "0";
  document.body.style.padding = "20px";
  document.body.style.display = "flex";
  document.body.style.justifyContent = "center";
}

// Create main container
function createAppContainer() {
  const app = document.createElement("div");
  app.style.width = "600px";
  app.style.backgroundColor = "#fff";
  app.style.padding = "20px";
  app.style.borderRadius = "8px";
  app.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
  return app;
}

// Create and append title
function createTitle(parent) {
  const title = document.createElement("h1");
  title.textContent = "Virtual Library System";
  title.style.textAlign = "center";
  title.style.color = "#333";
  parent.appendChild(title);
}

// Create form inputs and button
function createForm(parent, onSubmit) {
  const form = document.createElement("form");
  form.style.display = "flex";
  form.style.flexDirection = "column";
  form.style.gap = "10px";
  form.style.marginTop = "20px";

  // Book Title
  const inputTitle = document.createElement("input");
  inputTitle.type = "text";
  inputTitle.placeholder = "Book Title";
  inputTitle.required = true;
  inputTitle.style.padding = "10px";
  inputTitle.style.fontSize = "1rem";
  inputTitle.style.border = "1px solid #ccc";
  inputTitle.style.borderRadius = "5px";
  form.appendChild(inputTitle);

  // Author
  const inputAuthor = document.createElement("input");
  inputAuthor.type = "text";
  inputAuthor.placeholder = "Author";
  inputAuthor.required = true;
  inputAuthor.style.padding = "10px";
  inputAuthor.style.fontSize = "1rem";
  inputAuthor.style.border = "1px solid #ccc";
  inputAuthor.style.borderRadius = "5px";
  form.appendChild(inputAuthor);

  // Year
  const inputYear = document.createElement("input");
  inputYear.type = "number";
  inputYear.placeholder = "Year Published";
  inputYear.min = "0";
  inputYear.max = new Date().getFullYear().toString();
  inputYear.required = true;
  inputYear.style.padding = "10px";
  inputYear.style.fontSize = "1rem";
  inputYear.style.border = "1px solid #ccc";
  inputYear.style.borderRadius = "5px";
  form.appendChild(inputYear);

  // Submit Button
  const btnAdd = document.createElement("button");
  btnAdd.type = "submit";
  btnAdd.textContent = "Add Book";
  btnAdd.style.padding = "10px";
  btnAdd.style.fontSize = "1rem";
  btnAdd.style.backgroundColor = "#0055a5";
  btnAdd.style.color = "white";
  btnAdd.style.border = "none";
  btnAdd.style.borderRadius = "5px";
  btnAdd.style.cursor = "pointer";
  btnAdd.style.transition = "background-color 0.3s";
  btnAdd.onmouseenter = () => (btnAdd.style.backgroundColor = "#003f7d");
  btnAdd.onmouseleave = () => (btnAdd.style.backgroundColor = "#0055a5");
  form.appendChild(btnAdd);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onSubmit({
      title: inputTitle.value.trim(),
      author: inputAuthor.value.trim(),
      year: inputYear.value.trim(),
    });
    form.reset();
  });

  parent.appendChild(form);
}

// Create search bar for filtering books
function createSearchBar(parent, onSearch) {
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search books by title or author...";
  searchInput.style.marginTop = "20px";
  searchInput.style.padding = "10px";
  searchInput.style.fontSize = "1rem";
  searchInput.style.width = "100%";
  searchInput.style.border = "1px solid #ccc";
  searchInput.style.borderRadius = "5px";

  searchInput.addEventListener("input", (e) => {
    onSearch(e.target.value.trim());
  });

  parent.appendChild(searchInput);
  return searchInput;
}

// Book list container
function createBookListContainer(parent) {
  const container = document.createElement("div");
  container.style.marginTop = "20px";
  parent.appendChild(container);
  return container;
}

// Render books list with optional filter
function renderBooks(books, container, filter = "") {
  container.innerHTML = "";

  const filtered = books.filter((book) => {
    const query = filter.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    );
  });

  if (filtered.length === 0) {
    const noBooks = document.createElement("p");
    noBooks.textContent = "No books found.";
    noBooks.style.textAlign = "center";
    noBooks.style.color = "#777";
    container.appendChild(noBooks);
    return;
  }

  filtered.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.style.border = "1px solid #ddd";
    bookCard.style.borderRadius = "5px";
    bookCard.style.padding = "15px";
    bookCard.style.marginBottom = "10px";
    bookCard.style.display = "flex";
    bookCard.style.justifyContent = "space-between";
    bookCard.style.alignItems = "center";
    bookCard.style.backgroundColor = "#fafafa";

    // Book info
    const info = document.createElement("div");
    info.innerHTML = `<strong>${book.title}</strong> by ${book.author} (${book.year})`;
    bookCard.appendChild(info);

    // Remove button
    const btnRemove = document.createElement("button");
    btnRemove.textContent = "Remove";
    btnRemove.style.backgroundColor = "#c0392b";
    btnRemove.style.color = "white";
    btnRemove.style.border = "none";
    btnRemove.style.borderRadius = "5px";
    btnRemove.style.padding = "6px 12px";
    btnRemove.style.cursor = "pointer";
    btnRemove.style.transition = "background-color 0.3s";
    btnRemove.onmouseenter = () => (btnRemove.style.backgroundColor = "#7b241c");
    btnRemove.onmouseleave = () => (btnRemove.style.backgroundColor = "#c0392b");

    btnRemove.addEventListener("click", () => {
      books.splice(index, 1);
      saveBooks(books);
      renderBooks(books, container, filter);
    });

    bookCard.appendChild(btnRemove);

    container.appendChild(bookCard);
  });
}

// Save books to localStorage
function saveBooks(books) {
  localStorage.setItem("virtualLibraryBooks", JSON.stringify(books));
}

// Load books from localStorage
function loadBooks() {
  const data = localStorage.getItem("virtualLibraryBooks");
  return data ? JSON.parse(data) : [];
}

// Main app logic
function runApp() {
  setupBody();
  const app = createAppContainer();
  document.body.appendChild(app);

  createTitle(app);

  let books = loadBooks();

  createSearchBar(app, (query) => {
    renderBooks(books, bookListContainer, query);
  });

  createForm(app, (newBook) => {
    if (!newBook.title || !newBook.author || !newBook.year) {
      alert("Please fill in all fields.");
      return;
    }
    books.push(newBook);
    saveBooks(books);
    renderBooks(books, bookListContainer);
  });

  const bookListContainer = createBookListContainer(app);

  renderBooks(books, bookListContainer);
}

// Run the app
runApp();
