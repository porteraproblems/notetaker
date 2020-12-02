const util = require("util");
const fs = require("fs");

// YOU CAN EITHER USE fs.readFile and fs.writeFile WITH CALLBACK FUNCTIONS
// OR USE THE FOLLOWING PROMISIFIED readFileAsync and writeFileAsync
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

function read() {
  return readFileAsync("./db.json", "utf8");
}


// Calling read()
read().then(function (data) {
    let arrOfNotes = JSON.parse(data);

    console.log("> 1st .then() arrOfNotes: ", arrOfNotes);

}).then(() => {
    console.log("> 2nd .then() ");
}).then(()=> {
    console.log("> 3rd .then() ");

    return "Hello, it's Me!!!1";
}).then((data)=> {
    console.log("< 4th .then() with data returned: ", data);
})
