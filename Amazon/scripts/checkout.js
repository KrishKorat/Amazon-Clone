import { renderSummaryOrder } from "./checkout/orderSummary.js";
import { renderPaymentOrder } from "./checkout/paymentSummary.js";
import { renderCheckoutCount } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";


async function loadpages() {

  await loadProductsFetch();

  await new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

  renderSummaryOrder();
  renderPaymentOrder();
  renderCheckoutCount();
}
loadpages();

/*
Promise.all([
  
  // new Promise((resolve) => {
  //   loadProducts(() => {
  //     resolve();
  //   });
  // })
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })
]).then(() => {
  renderSummaryOrder();
  renderPaymentOrder();
  renderCheckoutCount();
});
*/


/*
loadProducts(() => {
  renderSummaryOrder();
  renderPaymentOrder();
  renderCheckoutCount();
});
*/