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
      selected: '',
      cafeActive: true,
      clicked: false,
      clickData: [],
    }
  }

  onClickReset = () => {
    this.props.getLocation()
    console.log(this.state.viewport)
  }

  cardClick = (clickData) => {
    this.props.cardClickReset(clickData)
  }

  cafeActiveReset = () => {
    this.setState({
      cafeActive: !this.state.cafeActive,
    })
  }

  render() {
    return (
      <>
        <div className="row" style={{ background: 'rgb(230, 222, 216)' }}>
          <div className="col-4">
            <EventMapDataList
              onClickReset={this.onClickReset}
              cardClick={this.cardClick}
              cafeActiveReset={this.cafeActiveReset}
              cafeActive={this.state.cafeActive}
              CafeData={CafeData}
            />
          </div>
          <div className="col-8">
            <MyMapComponent
              clicked={this.state.clicked}
              viewport={this.props.viewport}
              clickItem={this.state.itemId}
              cafeActiveReset={this.cafeActiveReset}
              cafeActive={this.state.cafeActive}
              CafeData={CafeData}
              myLocation={this.props.myLocation}
            />
          </div>
        </div>
      </>
    )
  }
}

export default Map
