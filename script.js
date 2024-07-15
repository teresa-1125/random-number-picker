let numbers = [];
let pickedNumbers = [];

function updateAvailableNumbers() {
    const availableNumbersDiv = document.getElementById('availableNumbers');
    availableNumbersDiv.innerHTML = `<p>Available numbers: ${numbers.join(', ')}</p>`;
}

function pickRandomNumbers() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const start = parseInt(document.getElementById('start').value);
    const end = parseInt(document.getElementById('end').value);
    const resultDiv = document.getElementById('result');
    const pickedNumbersDiv = document.getElementById('pickedNumbers');
    const statusSpan = document.getElementById('status');

    if (isNaN(start) || isNaN(end) || start > end) {
        resultDiv.textContent = 'Please enter valid start and end numbers.';
        return;
    }

    if (numbers.length === 0) {
        numbers = Array.from({ length: end - start + 1 }, (v, k) => k + start);
        pickedNumbers = [];
        statusSpan.textContent = '';
    }

    if (numbers.length === 0) {
        resultDiv.textContent = '';
        statusSpan.textContent = '已選取完畢';
        return;
    }

    if (quantity > numbers.length) {
        resultDiv.textContent = 'Not enough numbers available to pick.';
        return;
    }

    const picked = [];
    for (let i = 0; i < quantity; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        const pickedNumber = numbers.splice(randomIndex, 1)[0];
        pickedNumbers.push(pickedNumber);
        picked.push(pickedNumber);
    }

    resultDiv.textContent = `Picked number(s): ${picked.join(', ')}`;
    pickedNumbersDiv.innerHTML = `<p>Picked numbers: ${pickedNumbers.join(', ')}</p>`;
    updateAvailableNumbers();

    if (numbers.length === 0) {
        statusSpan.textContent = '已選取完畢';
    }
}

function resetNumbers() {
    numbers = [];
    pickedNumbers = [];
    document.getElementById('result').textContent = '';
    document.getElementById('pickedNumbers').innerHTML = '';
    document.getElementById('availableNumbers').innerHTML = '';
    document.getElementById('status').textContent = '';
}

function addNumber() {
    const additionalNumber = parseInt(document.getElementById('additionalNumber').value);
    const availableNumbersDiv = document.getElementById('availableNumbers');
    if (!isNaN(additionalNumber) && !numbers.includes(additionalNumber)) {
        numbers.push(additionalNumber);
        updateAvailableNumbers();
    } else {
        availableNumbersDiv.innerHTML = `<p>Please enter a valid number that is not already in the list.</p>`;
    }
}
