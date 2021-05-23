var url1='http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/' +
'v0002/?appid=250900&key=424CF0DAB58DA8B0F8A8B9A037AA93E5&steamid=76561198079199657';

var url2='http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/' +
'v0002/?appid=250900&key=424CF0DAB58DA8B0F8A8B9A037AA93E5&steamid=76561198118721750';

const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const request = require('request');

var achievements1, achievements2, total

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

router.get("/", (req, res) => {
    request.get(url1, (error, res, body) => {
        achievements1 = JSON.parse(body)
        achievements1 = getAchievements(achievements1)
    });
    request.get(url2, (error, res, body) => {
        achievements2 = JSON.parse(body)
        achievements2 = getAchievements(achievements2)
    });
    console.log(achievements2);
    total = achievements2 - achievements1
    res.render("index", {total: total});
    res.render("index");
});

app.use("/", router);
app.listen(process.env.PORT, '0.0.0.0');

console.log("Running at Port 0000");

function getAchievements(achievement) {
    return count = Object.entries(achievement.playerstats.achievements).length;
}