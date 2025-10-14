// Demo product data
const products = [
    { id: 1, name: "Coffee Mug", price: 350 },
    { id: 2, name: "T-shirt", price: 900 },
    { id: 3, name: "Notebook", price: 200 },
    { id: 4, name: "Pen", price: 80 }
];

let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    // Registration
    const registrationSection = document.getElementById('registration-section');
    const shopSection = document.getElementById('shop-section');
    const checkoutSection = document.getElementById('checkout-section');

    // Handle registration
    document.getElementById('registration-form').onsubmit = function(e) {
        e.preventDefault();
        registrationSection.style.display = "none";
        shopSection.style.display = "block";
        renderShop();
    };

    // Render products
    function renderShop() {
        const shopItems = document.getElementById('shop-items');
        shopItems.innerHTML = '';
        products.forEach(product => {
            const div = document.createElement('div');
            div.className = 'shop-item';
            div.innerHTML = `
                <strong>${product.name}</strong><br>
                KES ${product.price}<br>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            shopItems.appendChild(div);
        });
        renderCart();
    }

    // Expose addToCart globally
    window.addToCart = function(id) {
        const item = products.find(p => p.id === id);
        const cartItem = cart.find(c => c.id === id);
        if (cartItem) {
            cartItem.qty += 1;
        } else {
            cart.push({ ...item, qty: 1 });
        }
        renderCart();
    };

    // Render cart
    function renderCart() {
        const cartList = document.getElementById('cart-list');
        cartList.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.qty;
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} (x${item.qty}) - KES ${item.price * item.qty}
                <span onclick="removeFromCart(${item.id})" title="Remove">&times;</span>
            `;
            cartList.appendChild(li);
        });
        document.getElementById('cart-total').innerText = total > 0 ? `Total: KES ${total}` : '';
        document.getElementById('checkout-btn').style.display = total > 0 ? 'block' : 'none';
    }

    window.removeFromCart = function(id) {
        cart = cart.filter(item => item.id !== id);
        renderCart();
    };

    // Handle checkout button
    document.getElementById('checkout-btn').onclick = () => {
        shopSection.style.display = "none";
        checkoutSection.style.display = "block";
    };

    // Handle payment (mock)
    document.getElementById('checkout-form').onsubmit = function(e) {
        e.preventDefault();
        const mpesaNumber = document.getElementById('mpesa-number').value;
        if (!mpesaNumber.match(/^07\d{8}$/)) {
            document.getElementById('checkout-message').innerText = "Enter a valid M-Pesa number (e.g., 07XXXXXXXX)";
            return;
        }
        document.getElementById('checkout-message').innerText = "Payment successful via M-Pesa! Thank you for shopping.";
        cart = [];
        setTimeout(() => {
            checkoutSection.style.display = "none";
            registrationSection.style.display = "block";
            document.getElementById('checkout-message').innerText = "";
        }, 2500);
    };
});