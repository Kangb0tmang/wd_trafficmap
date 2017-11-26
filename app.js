var express = require ('express');
var request = require('request');
var app = express();
const PORT = 8000;

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

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