//Here we are getting the data from openweather server by using its api.
//In order to get its data we need th city name.
//for cityName, we get it using index.html file.


const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){

  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res) {

  const query = req.body.cityName;
  const apiKey = "cb23980b9281dc8584036604fd1d47b6";
  const unit = "metric";
  url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url,function(response){
    //This will notify if we make any errors.
    console.log(response.statusCode);

    response.on("data",function(data) {

      //This will give the data in hexadecimal form.
      // console.log(data);

      //This will turn the data in json formate and
      //then we parse it to convert it in javascript object.
      const weath = JSON.parse(data);

      //Here we are getting a specific piece of
      //data from javascript object.
      const temp = weath.main.temp;
      const des = weath.weather[0].description;
      const speed = weath.wind.speed;
      const tfell = weath.main.feels_like;
      const tmin = weath.main.temp_min;
      const tmax = weath.main.temp_max;
      const pres = weath.main.pressure;
      const hum = weath.main.humidity;

      //Getting the image of weather condition.
      const icon = weath.weather[0].icon;

      //We are fetching the live data from open weather server.
      const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      //For sending mutiple lines of text we use :
      res.write("<p>The weather is currently " + des + ".</p>");

      res.write("<p>The wind speed in " + query + " is " + speed +  " meter/second.<p>");

      res.write("<p>The temperature in " + query + " is " + temp + " degrees Celcius.<p>");
      res.write("<p>The temperature feels like  " + tfell + " degrees Celcius.</p>");
      res.write("<p>The minimum temperature in " + query + " is " + tmin + " degrees Celcius.</p>");
      res.write("<p>The maximum temperature in " + query + " is " + tmax + " degrees Celcius.</p>");
      res.write("<p>The pressure in " + query + " is " + pres + " mbar.</p>");
      res.write("<p>The humidity in " + query + " is " + hum + " %.</p>");



      res.write("<img src = " + imageurl + ">");
      res.send();
    });
  });
});

app.listen(3000,function(req,res){
  console.log("Server is running.");});
