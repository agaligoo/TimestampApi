// init project
var express = require('express');
var app = express();
const port = 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", (req, res) => {
  // Check for an empty date parameter
  if (!req.params.date) {
    let currentDate = new Date();
    res.json({ "unix": currentDate.getTime(), "utc": `${currentDate.toUTCString()}` });
    return;
  }

  // Parse the date parameter
  let calcDate = isNaN(parseInt(req.params.date)) ? req.params.date : parseInt(req.params.date);

  // Create a new Date object
  let currentDate = new Date(calcDate);

  // Check if the date is valid
  if (currentDate.toString() === "Invalid Date") {
    res.json({ "error": "Invalid Date" });
  } else {
    // Return JSON response with unix and utc keys
    res.json({ "unix": currentDate.getTime(), "utc": `${currentDate.toUTCString()}` });
  }
});

// listen for requests :)
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
