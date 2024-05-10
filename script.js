const array = Array(10).fill(0);
n = array.length;

for (let i = 0; i < n; i++) {
  array[i] = Math.random();
}

console.log(array);

for (let i = 0; i < n; i++) {
  const bar = document.createElement("div");
  bar.style.height = array[i] * 100 + "%";
  bar.style.width = "10px";
  bar.style.backgroundColor = "black";
  const container = document.querySelector(".container");
  container.appendChild(bar);
}
