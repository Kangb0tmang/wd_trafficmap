console.log('Google Maps');
// console.log(allIncidents);

function initMap()
{
  var zoomLevel = 6;
  var melbourne = { lat: -37.818573, lng: 144.9569066 };
  var map = new google.maps.Map(document.getElementById('map'),
  {
    zoom: zoomLevel,
    center: melbourne
  });

  var infoWindow = new google.maps.InfoWindow();
  var markers = locations.map(function(location, i)
  {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      title: location.title
    });
    var setWindowContent = getWindowContent(location);
    marker.addListener('click', function() {
      infoWindow.setContent(setWindowContent);
      infoWindow.open(map, marker);
    });
    return marker;
  });

  var markerCluster = new MarkerClusterer(map, markers,
  { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
}

var locations = [];
allIncidents.forEach(function(incident)
{
  var incidentTitle = incident.title;
  var incidentAlertType = incident.alert_type;
  var incidentContent = incident.description;
  var latitude = incident.lat;
  var longitude = incident.long;
  locations.push({
    lat: parseFloat(latitude),
    lng: parseFloat(longitude),
    title: incidentTitle,
    alertType: incidentAlertType,
    description: incidentContent
  });
});

var getWindowContent = function(object)
{
  var container = document.createElement('div');
  container.classList.add('info-window-content');
  var title = document.createElement('h4');
  var titleText = document.createTextNode(object.title);
  title.appendChild(titleText);
  var alertType = document.createElement('span');
  var alertTypeText = document.createTextNode(object.alertType);
  alertType.appendChild(alertTypeText);
  var description = document.createElement('p');
  var descriptionText = document.createTextNode(object.description);
  description.appendChild(descriptionText);
  container.appendChild(title);
  container.appendChild(alertType);
  container.appendChild(description);
  return container;
};