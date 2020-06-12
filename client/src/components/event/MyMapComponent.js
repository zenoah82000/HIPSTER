import React from 'react'
import { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer,Overlay,BaseLayer } from 'react-leaflet'

// import { withRouter } from 'react-router-dom'

//引入redux元件
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

//引入leaf元件
// import 'leaflet/dist/leaflet.css'
// import L from 'leaflet'

//引入action
// import { fetchMapmarks } from '../../actions/location/Location_Action'

// 參考資料 : https://leafletjs.com/examples/quick-start/ & https://juejin.im/post/5cc192976fb9a032092e8e0a
const { Map, TileLayer, Pane, GeoJSON } = ReactLeaflet;
const { BaseLayer, Overlay } = LayersControl;

class MyMapComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
          </Popup>
        </Marker>
      </Map>
    );
  }
}


export default MyMapComponent
