
let adminBooks = JSON.parse(localStorage.getItem("booknestBooks")) || books;

function saveAdminBooks() {
    localStorage.setItem(
        "booknestBooks",
        JSON.stringify(adminBooks)
    );
}

function displayAdminBooks() {

    const adminBookList = document.getElementById("adminBookList");

    adminBookList.innerHTML = "";

    if (adminBooks.length === 0) {
        adminBookList.innerHTML = "<p>No books available.</p>";
        return;
    }

    adminBooks.forEach(book => {

        const row = document.createElement("div");

        row.className = "admin-book-row";

        row.innerHTML = `
            <div>
                <strong>${book.title}</strong>
                <p>${book.author} | ₹${book.price}</p>
                <p>${book.category}</p>
            </div>

            <button class="delete-book-btn">
                Delete
            </button>
        `;

        row.querySelector(".delete-book-btn")
            .addEventListener("click", () => {
                deleteBook(book.id);
            });

        adminBookList.appendChild(row);

    });
}

// Add new book
document.getElementById("addBookForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const newBook = {
            id: "custom-" + Date.now(),

            title: document.getElementById("bookTitle").value.trim(),

            author: document.getElementById("bookAuthor").value.trim(),

            category: document.getElementById("bookCategory").value,

            price: Number(document.getElementById("bookPrice").value),

            rating: Number(document.getElementById("bookRating").value),

            isbn: document.getElementById("bookISBN").value.trim(),

            description: document.getElementById("bookDescription").value.trim()
        };

        adminBooks.push(newBook);

        saveAdminBooks();

        displayAdminBooks();

        this.reset();

        alert("Book added successfully!");

    });

// Delete book
function deleteBook(bookId) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) {
        return;
    }

    adminBooks = adminBooks.filter(
        book => book.id !== bookId
    );

    saveAdminBooks();

    displayAdminBooks();

    alert("Book deleted successfully!");

}

displayAdminBooks();
