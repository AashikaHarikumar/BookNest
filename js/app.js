
const bookContainer = document.getElementById("bookContainer");

function displayFeaturedBooks(bookList) {

    bookContainer.innerHTML = "";

    const featuredBooks = bookList.slice(0, 4);

    if (featuredBooks.length === 0) {
        bookContainer.innerHTML = "<p>No books available.</p>";
        return;
    }

    featuredBooks.forEach(book => {

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

        bookContainer.appendChild(card);

    });
}

// Homepage search
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function() {

    const searchValue = this.value.toLowerCase();

    const filteredBooks = getStoreBooks().filter(book =>
        book.title.toLowerCase().includes(searchValue) ||
        book.author.toLowerCase().includes(searchValue)
    );

    displayFeaturedBooks(filteredBooks);
});

// Initial display
displayFeaturedBooks(getStoreBooks());

updateCartCount();
