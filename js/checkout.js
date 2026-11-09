
const cart = JSON.parse(localStorage.getItem("booknestCart")) || [];

const checkoutItems = document.getElementById("checkoutItems");
const subtotalElement = document.getElementById("checkoutSubtotal");
const deliveryElement = document.getElementById("checkoutDelivery");
const totalElement = document.getElementById("checkoutTotal");

const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
);

const delivery = subtotal === 0 || subtotal >= 999 ? 0 : 50;
const total = subtotal + delivery;

function displayCheckout() {

    if (cart.length === 0) {
        checkoutItems.innerHTML = `
            <p>Your cart is empty.</p>
            <a href="books.html">Explore Books</a>
        `;

        document.querySelector("#checkoutForm button").disabled = true;
        return;
    }

    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.title} × ${item.quantity}</span>
            <span>₹${item.price * item.quantity}</span>
        </div>
    `).join("");

    subtotalElement.textContent = subtotal;
    deliveryElement.textContent = delivery;
    totalElement.textContent = total;
}

document.getElementById("checkoutForm").addEventListener("submit", function(event) {

    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const order = {
        orderId: "BN" + Date.now(),
        customerName: document.getElementById("customerName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        address: document.getElementById("address").value.trim(),
        payment: document.getElementById("payment").value,
        items: cart,
        subtotal: subtotal,
        delivery: delivery,
        total: total,
        orderDate: new Date().toLocaleString(),
        status: "Placed"
    };

    let orders = JSON.parse(localStorage.getItem("booknestOrders")) || [];

    orders.push(order);

    localStorage.setItem("booknestOrders", JSON.stringify(orders));
    localStorage.setItem("booknestCart", JSON.stringify([]));

    alert("Your order has been placed successfully!");

    window.location.href = "orders.html";
});

displayCheckout();
