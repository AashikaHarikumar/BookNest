
let wishlist = JSON.parse(localStorage.getItem("booknestWishlist")) || [];

function displayWishlist() {

    const wishlistItems = document.getElementById("wishlistItems");

    wishlistItems.innerHTML = "";

    if (wishlist.length === 0) {
        wishlistItems.innerHTML = `
            <div class="empty-wishlist">
                <h3>Your wishlist is empty!</h3>
                <p>Add your favourite books to your wishlist.</p>
                <a href="books.html">Explore Books</a>
            </div>
        `;
        return;
    }

    wishlist.forEach(book => {

        const card = document.createElement("div");

        card.className = "wishlist-card";

        card.innerHTML = `
            <img
                src="https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg"
                alt="${book.title}"
                onerror="this.onerror=null;this.src='https://placehold.co/200x280?text=Book+Cover';"
            >

            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>₹${book.price}</p>

            <button class="cart-btn">Add to Cart</button>
            <button class="remove-btn">Remove</button>
        `;

        card.querySelector(".cart-btn").addEventListener("click", () => {
            addToCart(book);
        });

        card.querySelector(".remove-btn").addEventListener("click", () => {
            removeFromWishlist(book.id);
        });

        wishlistItems.appendChild(card);

    });
}

function addToCart(book) {

    let cart = JSON.parse(localStorage.getItem("booknestCart")) || [];

    const existingBook = cart.find(item => item.id === book.id);

    if (existingBook) {
        existingBook.quantity += 1;
    } else {
        cart.push({ ...book, quantity: 1 });
    }

    localStorage.setItem("booknestCart", JSON.stringify(cart));

    alert("Book added to cart!");
}

function removeFromWishlist(bookId) {

    wishlist = wishlist.filter(book => book.id !== bookId);

    localStorage.setItem("booknestWishlist", JSON.stringify(wishlist));

    displayWishlist();
}

displayWishlist();
