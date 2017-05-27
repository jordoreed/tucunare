function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

onmessage = function(event) {
  var workerIndex = event.data;

  var delay = getRandomInt(1000, 2000);
  setTimeout(function() {
    postMessage("" + workerIndex + " (" + delay + ")");
  }, delay);
};