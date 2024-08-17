// Sample invoice data
const invoiceData = [
    { description: 'Web Design Service', quantity: 1, unitPrice: 500.00 },
    { description: 'Hosting (1 Year)', quantity: 1, unitPrice: 100.00 },
    { description: 'Domain Registration', quantity: 1, unitPrice: 15.00 }
];

document.addEventListener('DOMContentLoaded', () => {
    const invoiceItemsContainer = document.getElementById('invoiceItems');
    let subtotal = 0;

    invoiceData.forEach(item => {
        const total = item.quantity * item.unitPrice;
        subtotal += total;

        const itemRow = `
            <tr>
                <td class="border-t py-2 px-4 text-gray-800">${item.description}</td>
                <td class="border-t py-2 px-4 text-right text-gray-800">${item.quantity}</td>
                <td class="border-t py-2 px-4 text-right text-gray-800">$${item.unitPrice.toFixed(2)}</td>
                <td class="border-t py-2 px-4 text-right text-gray-800">$${total.toFixed(2)}</td>
            </tr>
        `;

        invoiceItemsContainer.insertAdjacentHTML('beforeend', itemRow);
    });

    const tax = subtotal * 0.10;
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;

    const invoiceDate = new Date().toLocaleDateString();
    document.getElementById('invoiceDate').textContent = invoiceDate;
});
