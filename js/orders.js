
const orders = JSON.parse(localStorage.getItem("booknestOrders")) || [];

const ordersList = document.getElementById("ordersList");

function displayOrders() {

    if (orders.length === 0) {
        ordersList.innerHTML = `
            <div class="empty-orders">
                <h3>No orders yet!</h3>
                <p>Your purchased books will appear here.</p>
                <a href="books.html">Explore Books</a>
            </div>
        `;
        return;
    }

    ordersList.innerHTML = "";

    [...orders].reverse().forEach(order => {

        const orderCard = document.createElement("div");

        orderCard.className = "order-card";

        const itemsHTML = order.items.map(item => `
            <li>
                ${item.title} × ${item.quantity}
                — ₹${item.price * item.quantity}
            </li>
        `).join("");

        orderCard.innerHTML = `
            <h3>Order ID: ${order.orderId}</h3>

            <p>Date: ${order.orderDate}</p>
            <p>Customer: ${order.customerName}</p>
            <p>Payment: ${order.payment}</p>

            <p>Status:
                <span class="order-status">${order.status}</span>
            </p>

            <h4>Books Ordered</h4>
            <ul>${itemsHTML}</ul>

            <p>Subtotal: ₹${order.subtotal}</p>
            <p>Delivery: ₹${order.delivery}</p>
            <h3>Total: ₹${order.total}</h3>
        `;

        ordersList.appendChild(orderCard);
    });
}

displayOrders();
