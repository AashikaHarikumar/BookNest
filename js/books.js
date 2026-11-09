
const catalogueGrid = document.getElementById("catalogueGrid");

function displayBooks(bookList) {

    catalogueGrid.innerHTML = "";

    document.getElementById("resultCount").textContent =
        `${bookList.length} books found`;

    if (bookList.length === 0) {
        catalogueGrid.innerHTML = "<h3>No books found.</h3>";
        return;
    }

    bookList.forEach(book => {

        const card = document.createElement("div");

        card.className = "book-card";

        card.innerHTML = `
            <img
                src="https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg"
                alt="${book.title}"
                onerror="this.onerror=null;this.src='https://placehold.co/200x280?text=Book+Cover';"
            >

            <div class="book-info">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p>${book.category}</p>
                <p>⭐ ${book.rating}</p>
                <h4>₹${book.price}</h4>

                <button class="details-btn">View Details</button>
                <button class="wishlist-btn">♡ Wishlist</button>
                <button class="cart-btn">Add to Cart</button>
            </div>
        `;

        card.querySelector(".details-btn").addEventListener("click", () => {
            localStorage.setItem("selectedBookId", book.id);
            window.location.href = "book-details.html";
        });

        card.querySelector(".wishlist-btn").addEventListener("click", () => {
            addBookToWishlist(book);
        });

        card.querySelector(".cart-btn").addEventListener("click", () => {
            addBookToCart(book);
            updateCartCount();
        });

        catalogueGrid.appendChild(card);

    });
}

function filterBooks() {

    const searchValue =
        document.getElementById("searchInput").value.toLowerCase();

    const categoryValue =
        document.getElementById("categoryFilter").value;

    const sortValue =
        document.getElementById("sortBooks").value;

    let filteredBooks = getStoreBooks().filter(book => {

        const matchesSearch =
            book.title.toLowerCase().includes(searchValue) ||
            book.author.toLowerCase().includes(searchValue);

        const matchesCategory =
            categoryValue === "All" ||
            book.category === categoryValue;

        return matchesSearch && matchesCategory;
    });

    if (sortValue === "low") {
        filteredBooks.sort((a, b) => a.price - b.price);
    }

    if (sortValue === "high") {
        filteredBooks.sort((a, b) => b.price - a.price);
    }

    if (sortValue === "rating") {
        filteredBooks.sort((a, b) => b.rating - a.rating);
    }

    displayBooks(filteredBooks);
}

document.getElementById("searchInput")
    .addEventListener("input", filterBooks);

document.getElementById("categoryFilter")
    .addEventListener("change", filterBooks);

document.getElementById("sortBooks")
    .addEventListener("change", filterBooks);

displayBooks(getStoreBooks());

updateCartCount();
