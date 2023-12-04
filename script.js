function goToLogin(){
    window.location.href = "login.html";
    clearCart();
}
function goToIndex() {
    window.location.href = "index.html";
}
function goToPage(page) {
    window.location.href = `${page}.html`;
}
function goToDesserts() {
    window.location.href = `desserts.html`;
}
function goToDrinks() {
    window.location.href = `drinks.html`;
}
function goToSides() {
    window.location.href = `sides.html`;
}

function goTo(route){
    window.location.href = route;
}

function getCart() {
    const cartString = localStorage.getItem('cart');
    const cart = JSON.parse(cartString) || {};
    return cart;
}

function saveCart(cart) {
    const cartString = JSON.stringify(cart);
    localStorage.setItem('cart', cartString);
}


function validateLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if (username === "user" && password === "P@ssw0rd123") {
        goToIndex();
    } else {
        errorMessage.textContent = "Incorrect username or password. Please try again.";
    }
}

function addToCart(pizzaId, pizzaName, pizzaInitialPrice) {
    const size = document.getElementById(`size${pizzaId.slice(-1)}`).value;
    const quantity = parseInt(document.getElementById(`quantity${pizzaId.slice(-1)}`).value, 10);
    const cart = getCart();

    if (cart[pizzaId]) {
        cart[pizzaId].quantity += quantity;
    } else {
        cart[pizzaId] = {
            name: pizzaName,
            price: getPizzaPrice(pizzaId),
            size: size,
            quantity: quantity
        };
    }
    saveCart(cart);
    updateCartTotal();
    alert(`Pizza added to cart!\nPizza: ${pizzaName}\nSize: ${size}\nQuantity: ${quantity}`);
}

function getPizzaPrice(pizzaId) {
    const selectedSize = document.getElementById(`size${pizzaId.slice(-1)}`).value;
    let price;
    switch (selectedSize) {
        case 'small':
            price = 10.99;
            break;
        case 'medium':
            price = 13.99;
            break;
        case 'large':
            price = 16.99;
            break;
        default:
            price = 10.99; 
    }

    return price;
}

function updateCartTotal() {
    const cart = getCart();

    const total = Object.values(cart).reduce((acc, pizza) => {
        return acc + pizza.price * pizza.quantity;
    }, 0);

    document.getElementById('cart-total-price').textContent = '$' + total.toFixed(2);
}

function goToCheckout() {
    window.location.href = "checkout.html";
}

function clearCart() {
    localStorage.removeItem('cart');
    updateCartTotal();
    alert('Cart cleared!');
}

function openCart() {
    const cart = getCart();
    const cartMenu = document.getElementById('cart-menu');
    document.getElementById('cart-content').innerHTML = '';
    if (Object.keys(cart).length === 0) {
        alert('Cart is empty.');
        return;
    }
    Object.keys(cart).forEach(pizzaId => {
        const pizza = cart[pizzaId];

        const pizzaInfo = document.createElement('div');
        pizzaInfo.textContent = `${pizza.name} - Size: ${pizza.size}, Quantity: ${pizza.quantity}, Price: $${(pizza.price * pizza.quantity).toFixed(2)}`;

        document.getElementById('cart-content').appendChild(pizzaInfo);
    });

    cartMenu.style.display = 'block';
}

function closeCart() {
    const cartMenu = document.getElementById('cart-menu');
    cartMenu.style.display = 'none';
}

function clearCartClose() {
    const cartMenu = document.getElementById('cart-menu');
    clearCart();
    cartMenu.style.display = 'none';
}

function displayCheckout() {
    const cart = getCart();
    const checkoutContent = document.getElementById('checkout-content');
    checkoutContent.innerHTML = '';

    if (Object.keys(cart).length === 0) {
        alert('Cart is empty.');
        goToLogin(); 
        return;
    }

    Object.keys(cart).forEach(pizzaId => {
        const pizza = cart[pizzaId];

        const pizzaInfo = document.createElement('div');
        pizzaInfo.className = 'checkout-item';
        pizzaInfo.innerHTML = `
        <div class="checkout-item-details">
          <span>${pizza.name}</span>
          <span>Size: ${pizza.size}</span>
          <span>Quantity: ${pizza.quantity}</span>
          <span>Price: $${(pizza.price * pizza.quantity).toFixed(2)}</span>
        </div>
        <div class="checkout-item-actions">
          <button onclick="removeItem('${pizzaId}')">Remove</button>
        </div>
      `;

        checkoutContent.appendChild(pizzaInfo);
    });
}

function pay() {
    alert('Payment successful!');
    goToLogin();
}

function removeItem(pizzaId) {
    const cart = getCart();
    delete cart[pizzaId];
    saveCart(cart);
    displayCheckout();
}

function updateQuantity(pizzaId) {
    const cart = getCart();
    const newQuantity = parseInt(prompt('Enter new quantity:'), 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
        cart[pizzaId].quantity = newQuantity;
        saveCart(cart);
        displayCheckout();
    } else {
        alert('Invalid quantity. Please enter a valid number greater than 0.');
    }
}

function updatePrice(pizzaId) {
    const selectedSize = document.getElementById(`size${pizzaId.slice(-1)}`).value;
    let price;
    switch (selectedSize) {
        case 'small':
            price = 10.99;
            break;
        case 'medium':
            price = 13.99;
            break;
        case 'large':
            price = 16.99;
            break;
        default:
            price = 10.99;
    }
    document.getElementById(`price${pizzaId.slice(-1)}`).textContent = price.toFixed(2);
}

function openCartOnSides() {
    openCart();
    updateCartPriceOnSides();
}

function updateCartPriceOnSides() {
    const cart = getCart();
    const total = Object.values(cart).reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    document.getElementById('cart-total-price').textContent = '$' + total.toFixed(2);
}

function addToCartSides(sideId, sideName) {
    const size = document.getElementById('quantity' + sideId.charAt(0).toUpperCase() + sideId.slice(1)).value;
    const quantity = parseInt(document.getElementById(`quantity${sideId.charAt(0).toUpperCase() + sideId.slice(1)}`).value, 10);
    const cart = getCart();

    if (cart[sideId]) {
        cart[sideId].quantity += quantity;
    } else {
        cart[sideId] = {
            name: sideName,
            price: getSidePrice(sideId),
            size: size,
            quantity: quantity
        };
    }
    saveCart(cart);
    updateCartPriceOnSides();

    alert('Item added to cart!\n' +
        'Item: ' + sideName + '\n' +
        'Size: ' + size + '\n' +
        'Quantity: ' + quantity);
}

function getSidePrice(sideId) {
    switch (sideId) {
        case 'wings':
            return 9.99;
        case 'rolls':
            return 4.99;
        case 'sauces':
            return 2.99;
        default:
            return 0.00;
    }
}

window.onload = function () {
    displayCheckout(); 
};


function decline() {
    goToIndex();
    clearCart();
}

function addToCartDesserts(dessertId, dessertName) {
    const size = document.getElementById('quantity' + dessertId.charAt(0).toUpperCase() + dessertId.slice(1)).value;
    const quantity = parseInt(document.getElementById(`quantity${dessertId.charAt(0).toUpperCase() + dessertId.slice(1)}`).value, 10);
    const cart = getCart();

    if (cart[dessertId]) {
        cart[dessertId].quantity += quantity;
    } else {
        cart[dessertId] = {
            name: dessertName,
            price: getDessertPrice(dessertId),
            size: size,
            quantity: quantity
        };
    }
    saveCart(cart);
    updateCartPriceOnDesserts();

    alert('Item added to cart!\n' +
        'Item: ' + dessertName + '\n' +
        'Size: ' + size + '\n' +
        'Quantity: ' + quantity);
}

function getDessertPrice(dessertId) {
    switch (dessertId) {
        case 'iceCream':
            return 5.99;
        case 'cheesecake':
            return 7.99;
        case 'donut':
            return 3.99;
        default:
            return 0.00;
    }
}

function updateCartPriceOnDesserts() {
    const cart = getCart();
    const total = Object.values(cart).reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    document.getElementById('cart-total-price').textContent = '$' + total.toFixed(2);
}

function addToCartDrinks(drinkId, drinkName, drinkPrice) {
    const quantity = parseInt(document.getElementById(`quantity${drinkId.charAt(0).toUpperCase() + drinkId.slice(1)}`).value, 10);
    const cart = getCart();
    if (cart[drinkId]) {
        cart[drinkId].quantity += quantity;
    } else {
        cart[drinkId] = {
            name: drinkName,
            price: drinkPrice,
            quantity: quantity
        };
    }
    saveCart(cart);
    updateCartTotal();
    alert('Item added to cart!\n' +
        'Item: ' + drinkName + '\n' +
        'Quantity: ' + quantity);
}

