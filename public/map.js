console.log('Google Maps');
// console.log(allIncidents);

function initMap()
{
  var zoomLevel = 16;
  var melbourne = { lat: -37.818573, lng: 144.9569066 };
  var map = new google.maps.Map(document.getElementById('map'),
  {
    zoom: zoomLevel,
    center: melbourne
  });

  var infoWindow = new google.maps.InfoWindow();
  var allMarkers = [];
  var markers = locations.map(function(location, i)
  {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      incidentId: location.incidentId,
      title: location.title,
      alertType: location.alertType
    });

    var setWindowContent = getWindowContent(location);
    marker.addListener('click', function() {
      infoWindow.setContent(setWindowContent);
      infoWindow.open(map, marker);
    });

    allMarkers.push(marker);
    return marker;
  });

  var markerCluster = new MarkerClusterer(map, markers,
  { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

  google.maps.event.addListener(map, 'idle', function()
  {
    var bounds = map.getBounds();
    var count = 0;
    var clearIncidentList = document.querySelector('.incident-list').innerHTML = '';
    for (var index = 0; index < allMarkers.length; index++)
    {
      var marker = allMarkers[index]
      if (bounds.contains(marker.getPosition()) === true)
      {
        viewVisibleItems(marker);
      }
    }
  });
}

var locations = [];
allIncidents.forEach(function(incident)
{
  var incidentId = incident.id
  var incidentTitle = incident.title;
  var incidentAlertType = incident.alert_type;
  var incidentContent = incident.description;
  var latitude = incident.lat;
  var longitude = incident.long;
  locations.push({
    lat: parseFloat(latitude),
    lng: parseFloat(longitude),
    incidentId: incidentId,
    title: incidentTitle,
    alertType: incidentAlertType,
    description: incidentContent
  });
});

var viewVisibleItems = function(object)
{
  var incidentList = document.querySelector('.incident-list');
  var incidentListItem = document.createElement('li');
  var incidentListItemText = document.createTextNode(object.title + ' - ' + object.alertType);
  incidentListItem.setAttribute('id', object.incidentId);
  incidentListItem.appendChild(incidentListItemText);
  incidentList.appendChild(incidentListItem);
};

var getWindowContent = function(object)
{
  var windowContainer = document.createElement('div');
  windowContainer.classList.add('info-window-content');
  var windowTitle = document.createElement('h4');
  var windowTitleText = document.createTextNode(object.title);
  windowTitle.appendChild(windowTitleText);
  var windowAlertType = document.createElement('span');
  var windowAlertTypeTypeText = document.createTextNode(object.alertType);
  windowAlertType.appendChild(windowAlertTypeTypeText);
  var windowDescription = document.createElement('p');
  var windowDescriptionText = document.createTextNode(object.description);
  windowDescription.appendChild(windowDescriptionText);
  windowContainer.appendChild(windowTitle);
  windowContainer.appendChild(windowAlertType);
  windowContainer.appendChild(windowDescription);
  return windowContainer;
};