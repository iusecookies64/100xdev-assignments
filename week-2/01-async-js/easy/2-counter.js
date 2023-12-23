// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

function startTimer(seconds) {
  let hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  let minute = Math.floor(seconds / 60);
  seconds %= 60;

  let timerId = null;
  let timer = function () {
    // function to display next timer state
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
          console.log("Timer Over!");
          return;
        }
      }
    }
    timerId = setTimeout(timer, 1000);
  };

  timer();
}

startTimer(5);
