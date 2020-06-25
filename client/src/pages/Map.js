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
      selected: '',
      cafeActive: true,
      clicked: false,
      clickData: [],
    }
    console.log(props)
  }

  // 取得目前位置
  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.updateLocation);
    }
  }

  // 取得目前位置後插上marker並且將現在位置設定為中心點
  updateLocation = (position) => {
    this.setState(
      {
        viewport: {
          center: [position.coords.latitude, position.coords.longitude],
          zoom: 15,
        }
      }
    )
  }



  onClickReset = () => {
    
    // this.setState({
    //   viewport: {
    //     center: [25.0338438 + 0.0000000000001, 121.54335 + 0.0000000000001],
    //     zoom: 20,
    //   },
    //   clicked: false,
    // })
    this.getLocation()
    console.log(this.state.viewport)
  }

  cardClickReset = (clickData) => {
    console.log(clickData)

    this.setState({
      viewport: {
        center: [clickData.lat, clickData.log],
        zoom: 15,
      },
      clickData: clickData,
    })
  }

  cafeActiveReset = () => {
    this.setState({
      cafeActive: !this.state.cafeActive,
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
              clickData={this.state.clickData}
            />
          </div>
        </div>
      </>
    )
  }
}

export default Map
