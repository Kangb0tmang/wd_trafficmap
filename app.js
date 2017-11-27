var express = require ('express');
var request = require('request');
var compileSass = require('express-compile-sass');
var root = process.cwd();
var app = express();
const PORT = 8000;

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(compileSass({
  root: root,
  sourceMap: true, // Includes Base64 encoded source maps in output css
  sourceComments: true, // Includes source comments in output css
  watchFiles: true, // Watches sass files and updates mtime on main files for each change
  logToConsole: false // If true, will log to console.error on errors
}));
app.use(express.static(root));
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, response)
{
  const url = 'https://victraffic-api.wd.com.au/api/v3/incidents';
  request (
  {
    url: url,
    json: true
  }, function(err, apiResponse, traffic)
  {
    var incidentTypes = [];
    var getIncidents = traffic.incidents;
    getIncidents.forEach(function(incident)
    {
      incidentTypes.push(incident);
    });
    response.render('index', { incidents: incidentTypes });
  });
});

app.listen(PORT);