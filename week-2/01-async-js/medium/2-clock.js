// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats -

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)

function startClock() {
  const currentTime = new Date();
  let hours = currentTime.getHours();
  let minute = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();
  const timer = setInterval(() => {
    let ampm = hours < 12 ? "AM" : "PM";
    console.log(
      `${hours.toString().padStart(2, 0)}:${minute
        .toString()
        .padStart(2, 0)}:${seconds.toString().padStart(2, 0)} ${ampm}`
    );
    seconds++;
    if (seconds == 60) {
      seconds = 0;
      minute++;
      if (minute == 60) {
        minute = 0;
        hours++;
        if (hours == 24) {
          hours = 0;
        }
      }
    }
  }, 1000);
}

startClock();
