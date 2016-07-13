var express = require('express');
var path = require('path');
var app = express();
var compression = require('compression');
var fs = require('fs');

app.use(compression());
app.use(express.static(path.join(__dirname, '../')));

app.get('/manifest.json', function(req,res) {
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(path.resolve(__dirname,'../manifest.json'));
});

app.get(/^\//, function(req,res) {
  res.sendFile(path.resolve(__dirname,'../index.html'));
});

app.listen(80, function() {
  console.log('Server is listening on port 80');
});
