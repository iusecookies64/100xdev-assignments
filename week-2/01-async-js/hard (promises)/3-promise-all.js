/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise which return the time in milliseconds it takes to complete the entire operation.
 */

function wait(t) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(t * 1000), t * 1000)
  );
}

function wait1(t) {
  return wait(t);
}

function wait2(t) {
  return wait(t);
}

function wait3(t) {
  return wait(t);
}

function calculateTime(t1, t2, t3) {
  return new Promise((resolve) => {
    Promise.all([wait1(t1), wait2(t2), wait(t3)]).then((resolvedValues) => {
      resolve(Math.max(...resolvedValues));
    });
  });
}

calculateTime(1, 2, 3).then((ans) => console.log(ans));

module.exports = calculateTime;
