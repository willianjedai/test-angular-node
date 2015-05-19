var express = require('express'),
  app = express(),
  env = app.get('env'),
  _bodyParser = require('body-parser'),
  _methodOverride = require('method-override'),
  routes = require('./routes/');

app.use( _bodyParser.urlencoded( { extended: true } ) );
app.use( _bodyParser.json() );
app.use( _methodOverride() );

app.use('*', routes);

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});