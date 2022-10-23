"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4444;
const apiKey = process.env.APIKEY;
app.use(express.static("views"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.get("/", function (req, res) {
    res.render("index", { weather: null, error: null });
});
app.post("/", function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    console.log(city);
    request(url, function (err, response, body) {
        if (err) {
            res.render("index", { weather: null, error: "Error, please try again" });
        }
        else {
            let weather = JSON.parse(body);
            if (weather.main == undefined) {
                res.render("index", {
                    weather: null,
                    error: "Error, please try again",
                });
            }
            else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render("index", { weather: weatherText, error: null });
            }
        }
    });
});
const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.log(err);
    }
};
start();
//# sourceMappingURL=main.js.map