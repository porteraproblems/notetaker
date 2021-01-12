var express = require("express");
var path = require("path");
var apiData = require("./db/db.json");

var app = express();

var PORT = process.env.PORT || 1200;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.json(apiData);
});

app.get("/api/notes/:id", function(req, res) {
    
    const id = req.params.id;
    res.json(apiData[id]);
});

app.post("/api/notes", function(req, res) {

    const {body: {title, text}} = req;

    let newNote = {
        "id": apiData.length + 1,
        "title": title,
        "text": text
    }

    apiData.push(newNote);
    res.json(apiData);
});

app.delete("/api/notes/:id", function(req, res) {

    const id = req.params.id - 1;
    apiData.splice(id, 1);

    apiData.forEach(note => {
        if(note.id > id) note.id -= 1;
    });
    res.json(apiData);
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});