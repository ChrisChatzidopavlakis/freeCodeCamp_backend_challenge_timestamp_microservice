// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

const options = {
  weekday: "short",
  year: "numeric",
  day: "numeric",
  month: "short",
  timeZone: "GMT",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZoneName: "short"
};


app.get("/api/:date?", (req, res) => {
  const { date } = req.params;
  let isnum = /^\d+$/.test(date);
  var dateToReturn = new Date();
  if (!isEmpty(date)) {
    if (isnum) {
      dateToReturn = new Date(Number(date));
    } else {
      dateToReturn = new Date(date);
    }
  }
  if (!isNaN(dateToReturn.getTime())) {//!dateToReturn.toString() === "Invalid Date") {
    var returnString = dateToReturn.toLocaleString("en-GB", options);
    res.json({
      unix: dateToReturn.valueOf(), utc: dateToReturn.toUTCString()
    });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

function isEmpty(value) {
  return value === undefined || value === null || value === '';
}


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
