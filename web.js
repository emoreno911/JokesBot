var express = require('express');
var packageInfo = require('./package.json');
var Token = process.env.TELEGRAM_API_KEY || "TELEGRAM_API_KEY";

var app = express();

app.get('/', function (req, res) {
  res.json({ version: packageInfo.version });
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/' + Token, function (req, res) {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Web server started at http://%s:%s', host, port);
});