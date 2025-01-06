import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export let deliveryOptions = [{
    deliveryId: '1',
    deliveryDays: 7,
    deliveryCost: 0
}, {
    deliveryId: '2',
    deliveryDays: 3,
    deliveryCost: 499
}, {
    deliveryId: '3',
    deliveryDays: 1,
    deliveryCost: 999
}];

// Extracts singular delivery detail by cart's delivery id
export function getDeliveryOption(cartDeliveryId) {
    let deliveryOption;

    deliveryOptions.forEach((delOption) => {
    if(delOption.deliveryId === cartDeliveryId) { // Getting delivery info same as cart's delivery id
        deliveryOption = delOption;
    }
    });

    return deliveryOption || deliveryOptions[0];
}

// Skips the weekend in delivery date 
export function calculateDeliveryDate(deliveryOption) {

    // Getting and Turning date in good format
    let remainingDays = deliveryOption.deliveryDays;
    let deliveryDate = dayjs();

    while(remainingDays > 0) {
        deliveryDate = deliveryDate.add(1, 'days')

        // If satureday then returns true => true + false = false, means no decrement
        if(!isWeekend(deliveryDate)) {
            remainingDays--;
        }
    }
    
    return deliveryDate.format('dddd, MMMM D');
}

function isWeekend(date) {
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
  }