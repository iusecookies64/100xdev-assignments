// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman

const fs = require("fs");

function cleanFile(filePath) {
  fs.readFile(filePath, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    data = data.toString().replace(/\s+/g, " ").trim();
    fs.writeFile(filePath, data, function (err) {
      if (err) console.log(err);
      else console.log("File Cleaned");
    });
  });
}

cleanFile(__dirname + "/output.txt");
