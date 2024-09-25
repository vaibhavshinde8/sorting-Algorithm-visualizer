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

  // Function to perform quick sort and update the visualization
  async function quickSortVisualization(array, lb, up) {
    if (lb < up) {
      var loc = await partitionVisualization(array, lb, up);
      await quickSortVisualization(array, lb, loc - 1);
      await quickSortVisualization(array, loc + 1, up);
    }
  }

  // Helper function for partitioning and updating the visualization
  async function partitionVisualization(array, lb, up) {
    var pivot = array[lb];
    var start = lb;
    var end = up;

    while (start < end) {
      while (array[start] <= pivot) {
        start++;
      }
      while (array[end] > pivot) {
        end--;
      }
      if (start < end) {
        swap(array, start, end);
        displayBars(array, [start, end]);
        await sleep(2000); // Delay for visualization
      }
    }
    swap(array, lb, end);
    displayBars(array, [lb, end]);
    await sleep(2000); // Delay for visualization
    return end;
  }

  // Function to swap array elements
  function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  // Helper function for delaying execution
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Function to start the visualization
  async function startVisualization(event) {
    event.preventDefault(); // Prevent form submission

    var arraySizeInput = document.getElementById("arraySize");
    var arrayElementsInput = document.getElementById("arrayElements");

    var n = parseInt(arraySizeInput.value);
    var array = arrayElementsInput.value
      .split(" ")
      .map((element) => parseInt(element));

    await quickSortVisualization(array, 0, n - 1);

    console.log("Sorted array:", array);
  }