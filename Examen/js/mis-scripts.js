/*-----------------------------
JS swiper
------------------------------*/

const swiper = new Swiper('.swiper', {
  // Optional parameters
  // direction: 'vertical',
  loop: true,
  
  
  autoplay: {
  delay: 5000,
  },
     

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

/*-----------------------------
JS mapa
------------------------------*/

var map = L.map('map').setView([19.323116407336016, -99.08786873069133], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 25,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoib3NvZGVwZWx1Y2hlIiwiYSI6ImNsMm0zaTJodzE3N3kzY253cmhvcHNndDEifQ.IMFRQ9U2JPMAV87_LLzr0Q'
}).addTo(map);


var marker = L.marker([19.323116407336016, -99.08786873069133]).addTo(map);
marker.bindPopup("<b>Repara Bit").openPopup();
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("practica" + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

var greenIcon = L.icon({
    iconUrl: 'shield_1.png',
    shadowUrl: 'shield_1.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

L.marker([19.322954416000684, -99.0877399844891], {icon: greenIcon}).addTo(map);


