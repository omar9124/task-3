const express = require("express");
const path = require("path");
const getWeather = require("./data1/forecast");

const app = express();
const PORT = process.env.PORT || 3000;


app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.get("", (req, res) => {
    res.render("index");
});

app.get("/weather", (req, res) => {
    const address = req.query.address;

    if (!address) {
        return res.status(400).send({ error: "You must provide a location name." });
    }

    getWeather(address, (error, weatherData) => {
        if (error) {
            return res.status(400).send({ error });
        }

        res.send(weatherData);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});