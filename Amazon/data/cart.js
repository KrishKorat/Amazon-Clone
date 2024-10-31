export let cart = [];

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