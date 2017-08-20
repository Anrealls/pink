function initMap() {
    var position = {lat: 59.938801, lng: 30.323030};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: position,
        scrollwheel: false,
        mapTypeControl: false
    });
    var image = new google.maps.MarkerImage('../img/1.png',
        new google.maps.Size(36, 35),
        new google.maps.Point(0,0),
        new google.maps.Point(0, 32));
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: image
    });
}