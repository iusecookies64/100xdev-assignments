// ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require("fs");

function writeToFile(path, data) {
  fs.writeFile(path, data, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Write Operation Successful");
    }
  });
}

fs.readFile(__dirname + "/index.html", function (err, data) {
  if (err) console.log(err);
  else {
    writeToFile(__dirname + "/output.txt", data);
  }
});
