import { Express } from "express";
import * as express from "express";
import { Request, Response } from "express";
import * as request from "request";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 4444;
const apiKey = process.env.APIKEY;

app.use(express.static("views"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req: Request, res: Response) {
  res.render("index", { weather: null, error: null });
});

app.post("/", function (req: Request, res: Response) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  console.log(city);

  request(url, function (err, response, body) {
    if (err) {
      res.render("index", { weather: null, error: "Error, please try again" });
    } else {
      let weather = JSON.parse(body);
      if (weather.main == undefined) {
        res.render("index", {
          weather: null,
          error: "Error, please try again",
        });
      } else {
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
  } catch (err) {
    console.log(err);
  }
};

start();

// https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=${apiKey}
