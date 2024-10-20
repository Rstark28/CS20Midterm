document.addEventListener("DOMContentLoaded", () => {
    const cart = []; // Array to hold cart items
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    function displayCart() {
        cartItems.innerHTML = ""; // Clear current cart
        let total = 0;
        cart.forEach((item) => {
            const cartItem = document.createElement("li"); // Create list item for each cart item
            cartItem.innerHTML = `<strong>${item.name}</strong> | $${item.price.toFixed(2)} x ${item.quantity}`;
            const removeButton = document.createElement("button"); // Create remove button
            removeButton.style.float = "right";
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", () => {
                item.quantity--; // Decrease item quantity
                if (item.quantity === 0) {
                    cart.splice(cart.indexOf(item), 1); // Remove item from cart if quantity is 0
                }
                displayCart();
            });
            cartItem.appendChild(removeButton);
            cartItems.appendChild(cartItem);
            total += item.price * item.quantity;
        });
        if (cart.length === 0) {
            cartItems.innerHTML = "<li>No items in cart.</li>";
        }
        cartTotal.textContent = total.toFixed(2);
    }

    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("item-name");
            const price = parseFloat(button.getAttribute("item-price"));
            const inCart = cart.find((item) => item.name === name); // Check if item is in cart
            if (inCart) {
                inCart.quantity++; // Increase item quantity
            } else {
                const quantity = 1;
                cart.push({ name, price, quantity }); // Add item to cart
            }
            displayCart();
        });
    });

    document.getElementById("clear-cart").addEventListener("click", () => {
        cart.length = 0;
        displayCart();
    });

    // Add event listener to "Place Order" button
    document.getElementById("place-order").addEventListener("click", () => {
        if (cart.length < 1) {
            alert("Your cart is empty.");
        } else {
            placeOrder();
        }
    });

    function placeOrder() {
        const orderSection = document.getElementById("order");
        orderSection.style.display = "block";
        const orderForm = document.getElementById("order-form");
        orderForm.innerHTML = `
            <h2>Order Details</h2>
            <div>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            </div>
            <div>
            <label for="address">Billing Address:</label>
            <input type="text" id="address" name="address" required>
            </div>
            <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            </div>
            <div>
            <label for="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" required>
            </div>
            <div>
            <label for="credit-card">Credit Card:</label>
            <input type="text" id="credit-card" name="credit-card" required>
            </div>
            <div>
            <label for="expiration-date">Expiration Date:</label>
            <input type="month" id="expiration-date" name="expiration-date" required>
            </div>
            <div>
            <label for="cvv">CVV:</label>
            <input type="text" id="cvv" name="cvv" required>
            </div>
            <div>
            <button type="submit">Submit Order</button>
        `;

        orderForm.addEventListener("submit", (event) => {
            event.preventDefault();
            alert("Order placed successfully!");
            cart.length = 0;
            displayCart();
            orderForm.innerHTML = ""; // Clear the form after submission
        });
    }
});
