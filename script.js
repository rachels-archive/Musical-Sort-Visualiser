const n = 30;
const array = [];

let isSorting = false;

let sortTimeout = null;

// initialise randomly generated bars
initBars();

let audioContext = null; // audio context

function playNote(freq) {
  if (audioContext == null) {
    audioContext = new (AudioContext || webkitAudioContext || window.webkitAudioContext)();
  }
  const duration = 0.1;
  const osc = audioContext.createOscillator();
  osc.frequency.value = freq;
  osc.start();
  osc.stop(audioContext.currentTime + duration);
  const node = audioContext.createGain();
  node.gain.value = 0.1;
  node.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);
  osc.connect(node);
  node.connect(audioContext.destination);
}

function initBars() {
  // Clear any existing sorting timeout
  if (sortTimeout !== null) {
    clearTimeout(sortTimeout);
    sortTimeout = null;
  }

  for (let i = 0; i < n; i++) {
    array[i] = Math.random();
  }
  isSorting = false;
  displayBars();
}

function sort() {
  if (isSorting) {
    return;
  }
  isSorting = true;
  /*
    array.slice() sorts the copy of the global array.
    By creating a copy of the array, animate() can modify the copy
    without affecting the original array, ensuring accurate
    representation of each step taken in the sorting process.
   */

  const selectedSort = document.getElementById("selectedSort").value;
  switch (selectedSort) {
    case "bubble":
      const moves = bubbleSort(array.slice());
      animate(moves);
      break;
    case "selection":
      selectionSort();
      break;
    case "insertion":
      insertionSort();
      break;
    default:
      // Handle default case if needed
      break;
  }
}

function animate(moves) {
  if (moves.length == 0) {
    displayBars();
    isSorting = false;
    document.getElementById("sortBtn").disabled = false;
    return;
  }

  const move = moves.shift();
  const [i, j] = move.indices;

  if (move.type == "swap") {
    [array[i], array[j]] = [array[j], array[i]];
  }

  playNote(200 + array[i] * 500);
  playNote(200 + array[j] * 500);
  displayBars(move);

  sortTimeout = setTimeout(function () {
    animate(moves);
  }, 10);
}

function bubbleSort(array) {
  const moves = [];

  do {
    var swapped = false;
    for (let i = 1; i < array.length; i++) {
      if (array[i - 1] > array[i]) {
        // keep track of the moves for animation
        moves.push({
          indices: [i - 1, i],
          type: "swap",
        });
        swapped = true;
        // swapping array element
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
      }
    }
  } while (swapped);
  return moves;
}

function selectionSort() {}
function insertion() {}

function displayBars(move) {
  const container = document.getElementById("container");
  container.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = array[i] * 100 + "%";

    if (move && move.indices.includes(i)) {
      bar.style.backgroundColor = move.type == "swap" ? "#F00" : "#00F";
    }
    container.appendChild(bar);
  }

  document.getElementById("sortBtn").disabled = isSorting;
}

document.getElementById("sortBtn").addEventListener("click", function () {
  this.disabled = true;
});
