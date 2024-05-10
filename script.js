const array = Array(10).fill(0);
n = array.length;

for (let i = 0; i < n; i++) {
  array[i] = Math.random();
}

console.log(array);

do {
  var swapped = false;
  for (let i = 1; i < n; i++) {
    if (array[i - 1] > array[i]) {
      [array[i - 1], array[i]] = [array[i], array[i - 1]];
      swapped = true;
    }
  }
} while (swapped);

for (let i = 0; i < n; i++) {
  const bar = document.createElement("div");
  bar.className = "bar";
  bar.style.height = array[i] * 100 + "%";
  const container = document.getElementById("container");
  container.appendChild(bar);
}
