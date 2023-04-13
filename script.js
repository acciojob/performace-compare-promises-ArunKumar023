// Array of API URLs to fetch data from
const apiUrls = [
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/todos/2",
  "https://jsonplaceholder.typicode.com/todos/3",
  "https://jsonplaceholder.typicode.com/todos/4",
  "https://jsonplaceholder.typicode.com/todos/5",
  "https://jsonplaceholder.typicode.com/todos/6",
  "https://jsonplaceholder.typicode.com/todos/7",
  "https://jsonplaceholder.typicode.com/todos/8",
  "https://jsonplaceholder.typicode.com/todos/9",
  "https://jsonplaceholder.typicode.com/todos/10",
];

// Function to measure the time taken for a promise to resolve
async function measureTime(promise) {
  const start = performance.now();
  await promise;
  const end = performance.now();
  return end - start;
}

// Fetch data from all APIs using Promise.all() and measure the time taken
Promise.all(apiUrls.map(url => fetch(url)))
  .then(responses => {
    const totalTime = responses.reduce((acc, response) => {
      return acc + measureTime(response.json());
    }, 0);
    document.getElementById("output-all").textContent = totalTime.toFixed(2);
  })
  .catch(error => console.error(error));

// Fetch data from any API using Promise.any() and measure the time taken
Promise.any(apiUrls.map(url => fetch(url).then(response => response.json())))
  .then(data => measureTime(Promise.resolve(data)))
  .then(time => {
    document.getElementById("output-any").textContent = time.toFixed(2);
  })
  .catch(error => console.error(error));
