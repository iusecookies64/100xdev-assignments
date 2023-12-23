// ## Create a counter in JavaScript

// We have already covered this in the second lesson, but as an easy recap try to code a counter in Javascript
// It should go up as time goes by in intervals of 1 second

function startTimer(seconds) {
  let hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  let minute = Math.floor(seconds / 60);
  seconds %= 60;

  const timer = setInterval(function () {
    console.log(
      `${hours.toString().padStart(2, 0)}:${minute
        .toString()
        .padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`
    );
    seconds--;
    if (seconds < 0) {
      seconds = 59;
      minute--;
      if (minute < 0) {
        minute = 59;
        hours--;
        if (hours < 0) {
          clearInterval(timer);
          console.log("Timer Over!");
        }
      }
    }
  }, 1000);
}

startTimer(3605);
