export let cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}];

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
}


export function removeFromCart(productId) {
    let newCart = [];

    cart.forEach((cartItem) => {

        if(cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
}