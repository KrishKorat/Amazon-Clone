export function formatCurrency(moneyInCents) {
    return (Math.round(moneyInCents) / 100).toFixed(2);
}