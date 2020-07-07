import React, { useState } from 'react'
import '../styles/map.scss'
import CafeData from '../data/cafe.json'

//引入自訂元件
import EventMapDataList from '../components/event/EventMapDataList'
import EventSearchBar from '../components/event/EventSearchBar'
import MyMapComponent from '../components/event/MyMapComponent'

class MapPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: '',
      cafeActive: true,
      clicked: false,
      clickData: [],
      filterData: '',
    }
  }

  componentWillUnmount() {
    this.props.setViewport({ center: [25.0403394, 121.5309546], zoom: 15 })
  }
  onClickReset = () => {
    this.props.getLocation()
    console.log(this.state.viewport)
  }

  cardClick = (clickData) => {
    this.setState({ clickData: clickData })
    this.props.cardClickReset(clickData)
    console.log(clickData)
  }

  searchInput = (searching) => {
    console.log(searching)
    this.props.SearchReset(searching)
  }

  setFileterData = (data) => {
    console.log(data)
    let filterData = data
    this.setState({
      filterData,
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
        <div className="row" style={{ background: 'rgb(230, 222, 216)' }}>
          <div className="col-md-4 col-sm-12">
            <EventMapDataList
              onClickReset={this.onClickReset}
              cardClick={this.cardClick}
              cafeActiveReset={this.cafeActiveReset}
              cafeActive={this.state.cafeActive}
              CafeData={CafeData}
              setFileterData={this.setFileterData}
              searchInput={this.searchInput}
            />
          </div>
          <div className="col-md-8 col-sm-12">
            <MyMapComponent
              clicked={this.state.clicked}
              viewport={this.props.viewport}
              clickItem={this.state.itemId}
              cafeActiveReset={this.cafeActiveReset}
              cafeActive={this.state.cafeActive}
              CafeData={CafeData}
              myLocation={this.props.myLocation}
              clickData={this.state.clickData}
            />
          </div>
        </div>
      </>
    )
  }
}

export default MapPage
