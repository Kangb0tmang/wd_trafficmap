var map;
var melbourne = { lat: -37.8136, lng: 144.9631 };
var zoomLevel = 16;

function initMap()
{
  map = new google.maps.Map(document.getElementById('map'),
  {
    zoom: zoomLevel,
    center: melbourne
  });
  centerMarker = new google.maps.Marker({
    map: map,
    position: melbourne,
    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
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
    var incidentCount = 0;
    var displayIncidentCount = document.querySelector('#incident-count');
    var clearIncidentList = document.querySelector('.incident-list').innerHTML = '';
    displayIncidentCount.innerHTML = 0;
    for (var index = 0; index < allMarkers.length; index++)
    {
      var marker = allMarkers[index];
      if (bounds.contains(marker.getPosition()) === true)
      {
        viewVisibleItems(marker);
        incidentCount++;
        displayIncidentCount.textContent = incidentCount;
      }
    }
  });

  google.maps.event.addDomListener(window, "resize", function()
  {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
  });
}

function getLocation()
{
  if (navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position)
{
  map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
  map.setZoom(zoomLevel);
  centerMarker.setMap(null);
  centerMarker = new google.maps.Marker({
    map: map,
    position:
    {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    },
    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
  });
}

var locations = [];
allIncidents.forEach(function(incident)
{
  var incidentId = incident.id;
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
  incidentListItem.classList.add('mdl-list__item');
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