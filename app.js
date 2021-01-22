const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req,res){
 
res.sendFile(__dirname + "/index.html");

});

app.post("/",function(req,res){

const query = req.body.cityName;

const apiKey = "e60fd64134bd408182f692465a3b5ca3";

const unit = "metric";

const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

    https.get(url, function(response){

        console.log(response.statusCode);

        response.on("data",function(data){

         const weatherData = JSON.parse(data);
         
        const temp = weatherData.main.temp;

        const weatherDescription = weatherData.weather[0].description;

        const icon = weatherData.weather[0].icon;

        const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png";

      res.write("<h1>The Weather is currently : " + weatherDescription + "</h1>");
        
      res.write("<h2>The temperature in "+ query +"is:" + temp +" degrees celcuis.</h2>");

      res.write("<img src="+imageURL+">");

      res.send();

        });
    });

})


app.listen(3000,function(){
    console.log("Server is running at server 3000.");
});

