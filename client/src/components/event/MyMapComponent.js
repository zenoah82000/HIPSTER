import React from 'react'
// import { withRouter } from 'react-router-dom'

//引入redux元件
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

//引入leaf元件
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

//引入action
// import { fetchMapmarks } from '../../actions/location/Location_Action'

// 參考資料 : https://leafletjs.com/examples/quick-start/ & https://juejin.im/post/5cc192976fb9a032092e8e0a


class MyMapComponent extends React.Component {
    componentDidMount() {

         const mymap = L.map('mapid').setView(
            [123, 123],
            15
          )

          L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'your.mapbox.access.token'
        }).addTo(mymap);

  
        const blueIcon = new L.Icon({
          iconUrl:
            'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
          shadowUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        })     
        L.marker([123, 123], { icon: blueIcon })
            .addTo(mymap).bindPopup().openPopup();
    }
   
    render() {
      return (
        <>
          <div id="mapid" className="map"></div>
        </>
      )
    }
  }
 

export default MyMapComponent