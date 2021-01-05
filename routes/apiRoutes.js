var noteData = require("../db/db.json");
var fs = require("fs");
var util = require("util");
var string = require("unique-string");

var writeFileAsync = util.promisify(fs.writeFile);

module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        res.json(noteData);
    });
    app.post("/api/notes", async function (req, res) {
        req.body.id = string();
        noteData.push(req.body)

        try {
            await writeFileAsync("./db/db.json", JSON.stringify(noteData));
            console.log("updated");
            return res.json(true);
        }
        catch (err) {
            console.log(err);
            return res.json(false);
        }
    });
    app.delete("/api/notes/:id", async function (req, res) {
        console.log(req.url);

        var index = noteData.findIndex(function(note){
            return note.id === req.params.id 
        })
        if (index !== -1)noteData.splice(index, 1);
        console.log("Database: ", noteData);

        try {
            await writeFileAsync("./db/db.json", JSON.stringify(noteData));
            console.log("updated");
            return res.json(true);
        }
        catch (err) {
            console.log(err);
            return res.json(false);
        }
    });
}
