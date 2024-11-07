import {cart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';




export function renderPaymentOrder() {

  let productPriceCents = 0;
  let shippingPriceCents = 0;
  
  cart.forEach((cartItem) => {
        
    const product = getProduct(cartItem.productId);
    let deliveryOption = getDeliveryOption(cartItem.deliveryId);

    productPriceCents += product.priceCents * cartItem.quantity;
    shippingPriceCents += deliveryOption.deliveryCost;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  console.log(productPriceCents);
  console.log(shippingPriceCents);
}