const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('Public'));

let prom = mongoose.connect('mongodb://localhost:27017/testing');
prom.then((info) => {
    console.log("Succesfully connected to MongoDB!!");
});
prom.catch((info) => {
    console.log("Connection to MongoDB Failed!");
});

const formSchema = new mongoose.Schema({
    _id: String,
    name: String,
    depart: String,
    email: String,
    skills: [String]
});

const FormData = mongoose.model('FormData', formSchema, 'registrations');

app.listen(3080, () => {
    console.log("Server is running on port 3080!");
})

app.get("/registration", (req, res) => {
    res.sendFile(__dirname + '/Public/index.html');
})

app.post("/post", (req, res) => {
    const formData = new FormData({
        _id: req.body._id,
        name: req.body.name,
        depart: req.body.depart,
        email: req.body.email,
        skills: req.body.skills
    });

    formData.save()
        .then((info) => {
            res.send("Registration completed!");
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("An error occurred while trying to save the form data.");
        });
})