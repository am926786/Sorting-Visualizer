let speed = 100; // Initial speed (milliseconds)

document.getElementById('speedButton').addEventListener('click', () => {
    speed = Math.max(speed - 50, 50); // Decrease speed, but not below 50ms
    console.log(`Current Speed: ${speed}ms`);
});

async function insertionSort() {
    const bars = document.querySelectorAll('.bar');
    const len = bars.length;

    for (let i = 1; i < len; i++) {
        const key = parseInt(bars[i].style.height);
        let j = i - 1;

        bars[i].style.backgroundColor = '#e74c3c';

        await sleep(speed);

        while (j >= 0 && parseInt(bars[j].style.height) > key) {
            bars[j].style.backgroundColor = '#e74c3c';
            bars[j + 1].style.height = bars[j].style.height;
            j = j - 1;
            await sleep(speed);
            for (let k = 0; k < len; k++) {
                if (k !== i && k !== j + 1) {
                    bars[k].style.backgroundColor = '#3498db';
                }
            }
        }

        bars[j + 1].style.height = `${key}px`;

        for (let k = 0; k < len; k++) {
            if (k !== i) {
                bars[k].style.backgroundColor = '#3498db';
            }
        }
    }
}

// Function to visualize the array
function visualizeArray(array) {
    const arrayContainer = document.getElementById('arrayContainer');
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value}px`;
        arrayContainer.appendChild(bar);
    });
}

function generateRandomArray(size, min, max) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1) + min));
}

// Add event listeners
document.getElementById('sortButton').addEventListener('click', async () => {
    await insertionSort();
});

document.getElementById('generateButton').addEventListener('click', () => {
    // code to generate random array and visualize it
    const array = generateRandomArray(50, 10, 200);
    visualizeArray(array);
});

// Function to add delay for visualization
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
