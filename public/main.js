var getIncidentList = document.querySelector('.mobile-incident-list-container');

function showIncidentList()
{
  getIncidentList.classList.add('active');
}

function closeIncidentList()
{
  getIncidentList.classList.remove('active');
}