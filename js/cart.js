
// BookNest - Shopping Cart

// Load cart data from LocalStorage

let cart = JSON.parse(localStorage.getItem("booknestCart")) || [];

// Get HTML elements

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const itemCount = document.getElementById("itemCount");
const summaryItems = document.getElementById("summaryItems");
const subtotalElement = document.getElementById("subtotal");
const deliveryElement = document.getElementById("delivery");
const totalElement = document.getElementById("total");
const checkoutBtn = document.getElementById("checkoutBtn");

// Save cart

function saveCart() {
    localStorage.setItem(
        "booknestCart",
        JSON.stringify(cart)
    );
}

// Update cart count

function updateCartCount() {

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    cartCount.textContent = totalItems;
}

// Display cart items

function displayCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h2>🛒 Your Cart is Empty</h2>
                <p>You haven't added any books yet.</p>
                <a href="books.html">Explore Books</a>
            </div>
        `;

        updateSummary();
        return;
    }

    cart.forEach(item => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <img
                src="https://covers.openlibrary.org/b/isbn/${item.isbn || ""}-M.jpg"
                alt="${item.title}"
                onerror="this.src='https://placehold.co/100x140/f0e9dd/24334a?text=Book'"
            >

            <div class="cart-item-details">

                <h3>${item.title}</h3>

                <p>By ${item.author}</p>

                <p class="cart-item-price">
                    ₹${item.price}
                </p>

                <div class="quantity-controls">

                    <button onclick="changeQuantity(${item.id}, -1)">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${item.id}, 1)">
                        +
                    </button>

                </div>

                <button class="remove-btn"
                    onclick="removeItem(${item.id})">
                    Remove
                </button>

            </div>

            <strong>
                ₹${item.price * item.quantity}
            </strong>
        `;

        cartItems.appendChild(cartItem);
    });

    updateSummary();
}

// Change quantity

function changeQuantity(bookId, change) {

    const item = cart.find(
        book => book.id === bookId
    );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeItem(bookId);
        return;
    }

    saveCart();
    displayCart();
}

// Remove item

function removeItem(bookId) {

    cart = cart.filter(
        item => item.id !== bookId
    );

    saveCart();
    displayCart();
}

// Calculate price summary

function updateSummary() {

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const delivery = subtotal === 0 ? 0 : (subtotal >= 999 ? 0 : 50);

    const total = subtotal + delivery;

    itemCount.textContent = `${totalItems} items`;

    summaryItems.textContent = totalItems;

    subtotalElement.textContent = `₹${subtotal}`;

    deliveryElement.textContent =
        delivery === 0 && subtotal > 0
            ? "FREE"
            : `₹${delivery}`;

    totalElement.textContent = `₹${total}`;

    checkoutBtn.disabled = cart.length === 0;

    updateCartCount();
}

// Checkout button

checkoutBtn.addEventListener("click", function () {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    window.location.href = "checkout.html";
});

// Initial display

displayCart();
updateCartCount();
