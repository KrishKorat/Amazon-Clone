let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Saves payment details in orders arr
export function addOrders(order) {

  // Saves newest receipt at 0th index of array
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}