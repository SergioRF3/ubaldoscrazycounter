var url1='http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/' +
'v0002/?appid=250900&key=424CF0DAB58DA8B0F8A8B9A037AA93E5&steamid=76561198079199657';

var url2='http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/' +
'v0002/?appid=250900&key=424CF0DAB58DA8B0F8A8B9A037AA93E5&steamid=76561198118721750';

const express = require("express");
const { resolve } = require("path");
const app = express();
const path = require("path");
const request = require('request');
const router = express.Router();

var achievements1, achievements2, total

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

router.get("/", (req, res) => {
   callAPI(url1,achievements1).then(achievements1 => {
       callAPI(url2, achievements2).then(achievements2 =>{
          total = achievements2 - achievements1
          res.render("index", {total: total});
       });
   });
});

var callAPI = function callAPI(ulr, achievements){
    return new Promise((resolve,reject) => {
        request.get(ulr, (error, res, body) => {
            achievements = JSON.parse(body)
            resolve(achievements = getAchievements(achievements))
        });
    });
} 

app.use("/", router);
app.listen(process.env.PORT, '0.0.0.0');

console.log("Running at Port 0.0.0.0");

function getAchievements(achievement) {
    return count = Object.entries(achievement.playerstats.achievements).length;
}