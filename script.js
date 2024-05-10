const n = 10;
const array = [];

// initialise randomly generated bars
initBars();

function initBars() {
  for (let i = 0; i < n; i++) {
    array[i] = Math.random();
  }
  displayBars();
}

function sort() {
  /*
    array.slice() sorts the copy of the global array.
    By creating a copy of the array, animate() can modify the copy
    without affecting the original array, ensuring accurate
    representation of each step taken in the sorting process.
   */
  const swaps = bubbleSort(array.slice());
  animate(swaps);
}

function animate(swaps) {
  if (swaps.length == 0) {
    displayBars();
    return;
  }

  const [i, j] = swaps.shift();
  [array[i], array[j]] = [array[j], array[i]];
  displayBars([i, j]);

  setTimeout(function () {
    animate(swaps);
  }, 100);
}

function bubbleSort(array) {
  const swaps = [];
  do {
    var swapped = false;
    for (let i = 1; i < array.length; i++) {
      if (array[i - 1] > array[i]) {
        // keep track of the swaps for animation
        swaps.push([i - 1, i]);
        swapped = true;
        // swapping array element
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
      }
    }
  } while (swapped);
  return swaps;
}

function displayBars(indices) {
  const container = document.getElementById("container");
  container.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = array[i] * 100 + "%";

    if (indices && indices.includes(i)) {
      bar.style.backgroundColor = "#f00";
    }
    container.appendChild(bar);
  }
}
