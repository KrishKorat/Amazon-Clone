import {cart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';
import { addOrders } from '../../data/orders.js';


// Rendering entire payment section
export function renderPaymentOrder() {

  let productPriceCents = 0;
  let shippingPriceCents = 0;
  
  // Extracting everything of ordered product one at a time
  cart.forEach((cartItem) => {
        
    // Store product from cart one at a time
    const product = getProduct(cartItem.productId);
    // Store that item's delivery details
    let deliveryOption = getDeliveryOption(cartItem.deliveryId);

    productPriceCents += product.priceCents * cartItem.quantity;
    shippingPriceCents += deliveryOption.deliveryCost;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${updateCheckoutCountInPayment()}):</div>
      <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary
      js-place-order">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;

  
  // Making place-order-button interactive
  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {

      try {
        // Giving details of order to backend
        const response = await fetch('https://supersimplebackend.dev/orders', {

          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });
  
        // Storing detail of order in local storage
        const order = await response.json();
        addOrders(order);

      } catch(error) {
        console.log('Unexpected error! please try again. ' + error);
      }

      // Sends us to orders page
      window.location.href = 'orders.html';
    });
}

// Updates checkout count in payment summary
function updateCheckoutCountInPayment() {
  let cartQuantity = 0;

    cart.forEach((item) => {
        cartQuantity += item.quantity;
    });

  return cartQuantity;
}