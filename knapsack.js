export function knapsack(items, capacity) {
    let table = Array(items.length + 1).fill().map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= items.length; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (items[i - 1].weight <= w) {
                table[i][w] = Math.max(table[i - 1][w], items[i - 1].value + table[i - 1][w - items[i - 1].weight]);
            } else {
                table[i][w] = table[i - 1][w];
            }
        }
    }

    let selected = [];
    let w = capacity;
    for (let i = items.length; i > 0; i--) {
        if (table[i][w] !== table[i - 1][w]) {
            selected.push(items[i - 1]);
            w -= items[i - 1].weight;
        }
    }

    return { table, selected };
}

function render(items, capacity) {
    const { table, selected } = knapsack(items, capacity);
    
    let html = '<table class="w-full border-collapse"><thead><tr class="bg-emerald-600 text-white"><th class="p-3 border border-emerald-700">Item</th>';
    for (let w = 0; w <= capacity; w++) html += `<th class="p-3 border border-emerald-700">${w}</th>`;
    html += '</tr></thead><tbody>';
    for (let i = 0; i <= items.length; i++) {
        html += `<tr class="${i % 2 === 0 ? 'bg-emerald-50' : 'bg-white'} hover:bg-emerald-100"><td class="p-3 border border-gray-300 font-semibold">${i === 0 ? '0' : items[i - 1].name || i}</td>`;
        for (let w = 0; w <= capacity; w++) html += `<td class="p-3 border border-gray-300 text-center">${table[i][w]}</td>`;
        html += '</tr>';
    }
    html += '</tbody></table>';
    html += '<div class="mt-6"><h3 class="text-2xl font-bold text-emerald-700 mb-3">Selected Items:</h3><ul class="space-y-2">';
    selected.forEach(item => html += `<li class="bg-emerald-100 p-3 rounded-lg text-emerald-900"><span class="font-bold">${item.name}</span>: weight=${item.weight}, value=${item.value}</li>`);
    html += '</ul></div>';
    document.getElementById('content').innerHTML = html;
    console.log('Selected items:', selected);
}

const items = [
    {name: 'A', weight: 2, value: 3}, 
    {name: 'B', weight: 3, value: 4}, 
    {name: 'C', weight: 4, value: 5}
];
const capacity = 7;
render(items, capacity);