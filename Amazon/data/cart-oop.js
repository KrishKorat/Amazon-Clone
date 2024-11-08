function Cart() {
  const cart = {

    cart: undefined,

    loadLocalStorage() {
      cart = JSON.parse(localStorage.getItem('cart')) || [
        {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryId: '1'
        }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryId: '2'
        }];
    },


    saveStorage() { // Saves cart items everytime any changes happens
      localStorage.setItem('cart', JSON.stringify(cart));
    },


    productAddToCart(productId, selectVal) { // Check if there is matching value, yes then adds to that
  
      let matchingItem;
      cart.forEach((item) => {   // Loops through cart array to check
          if(productId === item.productId) {
              matchingItem = item; // item location is saved into matchingItem
          }
      });
  
      if(matchingItem) { 
          matchingItem.quantity += selectVal;
      } else {
          // Traditionaly adds item like this when they appear first time
          cart.push({
              productId: productId,
              quantity: selectVal,
              deliveryId: '1' // By default shipping will be free
          });
      }
  
      saveStorage();
    },

    
    removeFromCart(productId) { // Executes when delete link is clicked in checkout page
      let newCart = [];

      cart.forEach((cartItem) => {

          if(cartItem.productId !== productId) {
              newCart.push(cartItem);
          }
      });

      cart = newCart;

      saveStorage();
    },

    
    updateQuantity(productId, newQuantity) { // executes when we change quantity via update link in checkout page
    
      cart.forEach((cartItem) => {
          // Searches item to change
          if(cartItem.productId === productId) {
              cartItem.quantity = newQuantity; // Changes to new quantity
          }
      });

      saveStorage();
    },

    
    updateDeliveyOption(productId, deliveryId) { // Updates delivery id in Cart when click other radio buttons
    
      let matchingItem;
      cart.forEach((item) => {  
          if(productId === item.productId) {
              matchingItem = item; 
          }
      });

      matchingItem.deliveryId = deliveryId;

      saveStorage();
    }
  }
}
 
loadLocalStorage();