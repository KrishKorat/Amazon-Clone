export let cart = JSON.parse(localStorage.getItem('cart')) || [];



// Saves cart items everytime any changes happens
function saveStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Check if there is matching value, yes then adds to that
export function productAddToCart(productId, selectVal) {

    let matchingItem;
    cart.forEach((item) => {   // Loops through cart array to check
        if(productId === item.productId) {
            matchingItem = item; // item location is saved into matchingItem
        }
    });

    if(matchingItem) { 
        matchingItem.quantity += selectVal;
    } else {
        // Traditionaly adds item like this when they appear first
        cart.push({
            productId: productId,
            quantity: selectVal
        });
    }

    saveStorage();
}

// Executes when delete link is clicked in checkout page
export function removeFromCart(productId) {
    let newCart = [];

    cart.forEach((cartItem) => {

        if(cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;

    saveStorage();
}

// executes when we change quantity via update link in checkout page
export function updateQuantity(productId, newQuantity) {

    cart.forEach((cartItem) => {
        // Searches item to change
        if(cartItem.productId === productId) {
            cartItem.quantity = newQuantity; // Changes to new quantity
        }
    });

    saveStorage();
}