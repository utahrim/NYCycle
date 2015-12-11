var panorama;
function initStreet(binLat, binLng) {
  panorama = new google.maps.StreetViewPanorama(
    document.getElementById('street_view'),
    {
      position: {lat: binLat, lng: binLng},
      pov: {heading: 0, pitch: 0},
      zoom: 1
    });
}