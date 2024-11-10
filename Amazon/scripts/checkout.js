import { renderSummaryOrder } from "./checkout/orderSummary.js";
import { renderPaymentOrder } from "./checkout/paymentSummary.js";
import { renderCheckoutCount } from "./checkout/checkoutHeader.js";
import { loadAllProducts } from "../data/products.js";




loadAllProducts(() => {
  renderSummaryOrder();
  renderPaymentOrder();
  renderCheckoutCount();
});
