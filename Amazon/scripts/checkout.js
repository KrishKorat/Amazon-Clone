import {cart, removeFromCart, updateQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

generateOrderSummary();
updateCheckoutCount();
makeUseDeleteLink();
makeUseUpdateLink();
makeUseSaveLink();


function generateOrderSummary() {
    let orderSummaryHTML = '';

    cart.forEach((cartItem) => {

        let productId = cartItem.productId;

        let matchingItem;
        // Accessing all info. from products arr of an item using cart arr
        products.forEach((product) => {
            if(product.id === productId) {
                matchingItem = product;
            }
        });

        orderSummaryHTML += `
          <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: Wednesday, June 15
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${matchingItem.image}>

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingItem.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input">
                  <span class="save-quantity-link js-save-link link-primary" data-product-id="${matchingItem.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

                <div class="delivery-option">
                  <input type="radio" checked class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
    });

    document.querySelector('.js-order-summary').innerHTML = orderSummaryHTML; 
}


// Updates checkout count each time changes happens 
function updateCheckoutCount() {
  let cartQuantity = 0;

    cart.forEach((item) => {
        cartQuantity += item.quantity;
    });
    document.querySelector('.js-item-count')
        .innerHTML = `${cartQuantity} items`;
}


// Makes delete link useful in checkout page
function makeUseDeleteLink() {
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {

      link.addEventListener('click', () => {

        let productId = link.dataset.productId;

        // Removes item from the cart (only as data)
        removeFromCart(productId);

        updateCheckoutCount();
        
        // Removes html of removed item 
        let removableContainder = document.querySelector(`.js-cart-item-container-${productId}`);
        removableContainder.remove();
      });
    });
}

// Makes update link useful in checkout page
function makeUseUpdateLink() {

  document.querySelectorAll('.js-update-link')
    .forEach((link) => {
      link.addEventListener('click', () => {

        let productId = link.dataset.productId;

        // Makes input-bar and save visible
        let container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');

      });
    });
}

function makeUseSaveLink() {

  document.querySelectorAll('.js-save-link')
    .forEach((link) => {
      link.addEventListener('click', () => {

        let productId = link.dataset.productId;

        // Extract quantity number from input bar
        let QuanInputElem = document.querySelector('.js-quantity-input');
        let QuanInputVal = QuanInputElem.value;
        QuanInputVal = Number(QuanInputVal);

        // Update the quantity in the cart arr as data
        updateQuantity(productId, QuanInputVal);

        // Update the html of quantity
        const quantityLabel = document.querySelector(
          `.js-quantity-label-${productId}`
        );
        quantityLabel.innerHTML = QuanInputVal;

        updateCheckoutCount();

        // Normalize by making update link visible 
        let container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.remove('is-editing-quantity');

      });
    });
}