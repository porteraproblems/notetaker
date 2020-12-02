const fs = require("fs");

function read(cb) {
     fs.readFile("./db.json", "utf8", function(err, data){
        if (err) throw err;

        console.log("> Inside fs.readFile callback - reading completed!!!");
        console.log("> If you provide me with your own callback, " +
            "I will pass data to your callback function");
        
        if (cb) cb(data)
        else console.log("> You did not provide callback. You won't get your data ;-( ");

    });
}
// Ex. 1
console.log("> Calling read() without callback");
read();
console.log("> After read(). The program is retunred without waiting for the read operation to complte");

// Ex 2
console.log("> Calling read() with callback");
read(function (data) {
    console.log("> I am so happy to get data in my callback!!!!");
    console.log("> Here is data: ", data);
})

console.log("> After calling read(cb) with callback, the program returns without waiting for data returned from fs.readFile")
console.log("> We will receive data in our callback function when fs.reaFile completes reading");



