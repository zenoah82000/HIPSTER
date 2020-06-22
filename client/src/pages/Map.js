import React, { useState } from 'react'
import '../styles/map.scss'
import CafeData from '../data/cafe.json'

//引入自訂元件
import EventMapDataList from '../components/event/EventMapDataList'
import EventSearchBar from '../components/event/EventSearchBar'
import MyMapComponent from '../components/event/MyMapComponent'

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        center: [25.0338438, 121.54335],
        zoom: 20,
      },
      selected:"",
      cafeActive:true,
      clicked:false
    }
    console.log(props)
  }

  onClickReset = () => {
    this.setState({
      viewport: {
        center: [25.0338438 + 0.0000000000001, 121.54335 + 0.0000000000001],
        zoom: 20,
      },
      clicked:false
    })
  }

  cardClickReset = (lat, log) => {
    console.log(lat, log)

    let newLat = lat +0.01
    let newLog = log +0.01

    console.log(newLat, newLog)
    this.setState({
      viewport: {
        center: [newLat, newLog],
        zoom: 15, 
      },
      clicked:true
    })
  }
  
  cafeActiveReset = () => {
    this.setState({
      cafeActive:!this.state.cafeActive
    })
  }


  render() {
    return (
      <>
        <div className="row">
          <div className="col-4">
            <EventMapDataList
              onClickReset={this.onClickReset}
              cardClickReset={this.cardClickReset}
              cafeActiveReset={this.cafeActiveReset}
              cafeActive={this.state.cafeActive}
              CafeData={CafeData}

            />
          </div>
          <div className="col-8">
            <MyMapComponent
            clicked={this.state.clicked}
              viewport={this.state.viewport}
              clickItem={this.state.itemId}
              cafeActiveReset={this.cafeActiveReset}
              cafeActive={this.state.cafeActive}
              CafeData={CafeData}
            />
          </div>
        </div>
      </>
    )
  }
}

export default Map
