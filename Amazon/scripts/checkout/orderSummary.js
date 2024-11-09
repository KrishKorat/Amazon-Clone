import {cart, removeFromCart, updateQuantity, updateDeliveyOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentOrder } from './paymentSummary.js';
import { renderCheckoutCount } from './checkoutHeader.js';
import { calculateDeliveryDate } from '../../data/deliveryOptions.js';
// import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


export function renderSummaryOrder() {
  generateOrderSummary();
  renderCheckoutCount(); // To refresh the checkout count in header
  makeUseDeleteLink();
  makeUseUpdateLink();
  makeUseSaveLink();
  updateDeliveyId();
}

function generateOrderSummary() {
    let orderSummaryHTML = '';

    cart.forEach((cartItem) => {

        let productId = cartItem.productId;

        let matchingItem = getProduct(productId);

        // Updating delivery date according to radio buttons
        let cartDeliveryId = cartItem.deliveryId;
        let deliveryOption = getDeliveryOption(cartDeliveryId);
        
        const dateString = calculateDeliveryDate(deliveryOption);

        orderSummaryHTML += `
          <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
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
                
                ${deliveryOptionsHTML(matchingItem, cartItem)}

              </div>
            </div>
          </div>
        `;
    });

    document.querySelector('.js-order-summary').innerHTML = orderSummaryHTML; 
}

// Generates all radio messages of delivery options
function deliveryOptionsHTML(matchingItem, cartItem) {
  let html = '';

  // Because of this it's generating exact 3 times for each item
  deliveryOptions.forEach((deliveryOption) => {

    // Getting date for all radio 
    const dateString = calculateDeliveryDate(deliveryOption);

    const priceString = deliveryOption.deliveryCost === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.deliveryCost)} -`;

    // If cartItem's id matches with delivery cart's id then check that 
    const isChecked = deliveryOption.deliveryId === cartItem.deliveryId;

    html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingItem.id}"       
        data-delivery-id="${deliveryOption.deliveryId}">
        <input type="radio" class="delivery-option-input"
          ${isChecked ? 'checked' : ''}
          name="delivery-option-${matchingItem.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `
  });
  
  return html;
}

// Changes the save of delivey radio button 
function updateDeliveyId() {

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {

      element.addEventListener('click', () => {

        let productId = element.dataset.productId;
        let deliveryId = element.dataset.deliveryId;

        updateDeliveyOption(productId, deliveryId); // in Cart.js
        
        renderSummaryOrder(); // To update delivery date without refreshing
        renderPaymentOrder();
      });
    });
}


// Makes delete link useful in checkout page
function makeUseDeleteLink() {
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {

      link.addEventListener('click', () => {

        let productId = link.dataset.productId;

        // Removes item from the cart (only as data)
        removeFromCart(productId);
        
        // Removes html of removed item 
        // let removableContainder = document.querySelector(`.js-cart-item-container-${productId}`);
        // removableContainder.remove();
        renderSummaryOrder();
        renderPaymentOrder();
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
// Makes save link useful in checkout page
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

        // Update the html of quantity number in checkout-box
        const quantityLabel = document.querySelector(
          `.js-quantity-label-${productId}`
        );
        quantityLabel.innerHTML = QuanInputVal;

        // updateCheckoutCount();

        // Normalize by making update link visible 
        let container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.remove('is-editing-quantity');

      });
    });
}