 // Function to create and display bars representing array elements
 function displayBars(array, selectedIndexes = []) {
    var barsDiv = document.getElementById("bars");
    barsDiv.innerHTML = "";

    for (var i = 0; i < array.length; i++) {
        var barHeight = array[i] * 5; // Scale factor to make bars visible
        var bar = document.createElement("div");
        bar.className = "bar";
        if (selectedIndexes.includes(i)) {
            bar.style.backgroundColor = "red";
        }
        bar.style.height = barHeight + "px";

        var valueSpan = document.createElement("span");
        valueSpan.textContent = array[i];

        bar.appendChild(valueSpan);
        barsDiv.appendChild(bar);
    }
}

// Function to perform selection sort and update the visualization
async function bubbleSort(array) {
    for (var i = 0; i < array.length; i++) {
        var swaped = false;

        for (var j = 0; j < array.length - i - 1; j++) {
            if (array[j + 1] < array[j]) {

                // Swap elements
                var temp = array[j + 1];
                array[j + 1] = array[j];
                array[j] = temp;

            }
            // Update visualization
            displayBars(array, [j + 1, j]);
            await sleep(2000); // Delay for visualization
        }
        if (swaped) {
            break;
        }
    }

    // Final visualization with sorted array
    displayBars(array);
}

// Helper function for delaying execution
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to start the visualization
async function startVisualization(event) {
    event.preventDefault(); // Prevent form submission

    var arrayElementsInput = document.getElementById("arrayElements");

    var array = arrayElementsInput.value
        .split(" ")
        .map(element => parseInt(element));

    await bubbleSort(array);

    console.log("Sorted array:", array);
}