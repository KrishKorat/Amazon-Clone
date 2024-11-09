class Cart {

  cartItems;
  localStorageKey;

  loadLocalStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [
      {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryId: '1'
      }, {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryId: '2'
      }];
  }


  saveStorage() { // Saves cart items everytime any changes happens
    localStorage.setItem(this.localStorageKey, JSON.stringify(cart));
  }


  productAddToCart(productId, selectVal) { // Check if there is matching value, yes then adds to that

    let matchingItem;
    this.cartItems.forEach((item) => {   // Loops through cart array to check
        if(productId === item.productId) {
            matchingItem = item; // item location is saved into matchingItem
        }
    });

    if(matchingItem) { 
        matchingItem.quantity += selectVal;
    } else {
        // Traditionaly adds item like this when they appear first time
        this.cartItems.push({
            productId: productId,
            quantity: selectVal,
            deliveryId: '1' // By default shipping will be free
        });
    }

    this.saveStorage();
  }

  
  removeFromCart(productId) { // Executes when delete link is clicked in checkout page
    let newCart = [];

    this.cartItems.forEach((cartItem) => {

        if(cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    this.cartItems = newCart;

    this.saveStorage();
  }

  
  updateQuantity(productId, newQuantity) { // executes when we change quantity via update link in checkout page
  
    this.cartItems.forEach((cartItem) => {
        // Searches item to change
        if(cartItem.productId === productId) {
            cartItem.quantity = newQuantity; // Changes to new quantity
        }
    });

    this.saveStorage();
  }

  
  updateDeliveyOption(productId, deliveryId) { // Updates delivery id in Cart when click other radio buttons
  
    let matchingItem;
    this.cartItems.forEach((item) => {  
        if(productId === item.productId) {
            matchingItem = item; 
        }
    });

    matchingItem.deliveryId = deliveryId;

    this.saveStorage();
  }
}



const cart = new Cart();
const businessCart = new Cart();

cart.localStorageKey = 'cart-oop';
businessCart.localStorageKey = 'cart-business';
 
cart.loadLocalStorage();
businessCart.loadLocalStorage();

console.log(cart);
console.log(businessCart);