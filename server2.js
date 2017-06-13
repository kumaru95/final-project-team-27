var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var stickMan = require(‘./stickMan’);
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(.json());

app.get(‘/stickman’, function (req, res, next) {

  var templateArgs = {
    Draw:stickman,
    title: “how to make”
  };

  res.render(‘drawPage', templateArgs);

});

app.get('/people/:person', function (req, res, next) {
  console.log("== url params for request:", req.params);
  var stickMan = req.params.draw;
  var stickMan = stickman[draw];
  if (stickMan) {
    var templateArgs = {
      photos: stickman.photos,
      name: stickman.name,
      title: “How to make - " + stickman.draw
    }
    res.render(‘mainPage’, templateArgs);
  } else {
    next();
  }
});

app.post('/people/:stickman/draw’, function (req, res, next) {
  var person = stickMan[req.params.stickman];

  if (person) {
    if (req.body && req.body.url) {

      var photo = {
        url: req.body.url,
        caption: req.body.caption
      };

      stickMan.draw = stickMan.draw || [];

      stickMan.draw.push(draw);
      fs.writeFile(‘stickman.json', JSON.stringify(stickman), function (err) {
        if (err) {
          res.status(500).send("Unable to save photo to \"database\".");
        } else {
          res.status(200).send();
        }
      });

    } else {
      res.status(400).send("Person photo must have a URL.");
    }

  } else {
    next();
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start the server listening on the specified port.
app.listen(port, function () {
  console.log("== Server listening on port", port);
});
