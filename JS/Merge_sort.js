function displayBars(array, selectedIndexes = []) {
    var barsDiv = document.getElementById("bars");
    barsDiv.innerHTML = "";

    for (var i = 0; i < array.length; i++) {
        var barHeight = array[i] * 5; // Scale factor to make bars visible
        var bar = document.createElement("div");
        bar.className = "bar";
        if (selectedIndexes.includes(i)) {
            bar.style.backgroundColor= " red";
        }
        bar.style.height = barHeight + "px";

        var valueSpan = document.createElement("span");
        valueSpan.textContent = array[i];

        bar.appendChild(valueSpan);
        barsDiv.appendChild(bar);
    }
}

// Function to perform merge sort and update the visualization
async function mergeSortVisualization(array, lb, up) {
    if (lb < up) {
        var mid = Math.floor((lb + up) / 2);
        await mergeSortVisualization(array, lb, mid);
        await mergeSortVisualization(array, mid + 1, up);
        await mergeVisualization(array, lb, mid, up);
    }
}

// Helper function for merging and updating the visualization
async function mergeVisualization(array, lb, mid, up) {
    var i = lb;
    var j = mid + 1;
    var k = lb;
    var array2 = new Array(up - lb + 1);

    while (i <= mid && j <= up) {
        if (array[i] < array[j]) {
            array2[k - lb] = array[i];
            i++;
        } else {
            array2[k - lb] = array[j];
            j++;
        }
        k++;
    }

    while (i <= mid) {
        array2[k - lb] = array[i];
        i++;
        k++;
    }

    while (j <= up) {
        array2[k - lb] = array[j];
        j++;
        k++;
    }

    for (k = lb; k <= up; k++) {
        array[k] = array2[k - lb];
    }

    displayBars(array, Array.from({ length: up - lb + 1 }, (_, i) => i + lb)); // Display the entire array after each merge operation with red bars
    await sleep(2000); // Delay for visualization

    // Helper function for delaying execution
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Function to start the visualization
async function startVisualization(event) {
    event.preventDefault(); // Prevent form submission

    var arraySizeInput = document.getElementById("arraySize");
    var arrayElementsInput = document.getElementById("arrayElements");

    var n = parseInt(arraySizeInput.value);
    var array = arrayElementsInput.value.split(" ").map(element => parseInt(element));

    await mergeSortVisualization(array, 0, n - 1);

    console.log("Sorted array:", array);
}