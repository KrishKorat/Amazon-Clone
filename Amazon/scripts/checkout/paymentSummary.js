import {cart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';




export function renderPaymentOrder() {
  
  itemCostCount();
}

function itemCostCount() {

  let productPriceCents = 0;
  let shippingPriceCents = 0;
  
  cart.forEach((cartItem) => {
        
    const product = getProduct(cartItem.productId);
    let deliveryOption = getDeliveryOption(cartItem.deliveryId);

    productPriceCents += product.priceCents * cartItem.quantity;
    shippingPriceCents += deliveryOption.deliveryCost;
  });

  console.log(productPriceCents);
  console.log(shippingPriceCents);
}