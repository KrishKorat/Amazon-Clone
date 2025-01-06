import { renderSummaryOrder } from "./checkout/orderSummary.js";
import { renderPaymentOrder } from "./checkout/paymentSummary.js";
import { renderCheckoutCount } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";


async function loadpages() {

  try {

    await loadProductsFetch();

    await new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    })
  } catch(error) {
    console.log('Unexpected error! please try again. ' + error);
  }

  

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