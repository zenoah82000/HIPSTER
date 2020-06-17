import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import '../styles/map.scss'

//引入自訂元件
import EventMapDataList from '../components/event/EventMapDataList'
import EventSearchBar from '../components/event/EventSearchBar'
import MyMapComponent from '../components/event/MyMapComponent'



class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      longitude: '', //經度
      latitude: '', //緯度
      position: false, //位置名稱
      viewport: {center:[25,121], zoom:20}
    }
  }

  // componentDidMount = () => {
  //   console.log(this.props)
  //   this.getPositions()
  // }

  getPositions = () => {
    return new Promise(() => {
      /** 獲取當前位置資訊 */
      navigator.geolocation.getCurrentPosition((location) => {
        this.setState({
          longitude: location.coords.longitude, //經度
          latitude: location.coords.latitude, //緯度
          position: !this.state.position,
        })
      })
    })
  }

  handleButtonClick() {
    this.props.history.push('/map')
  }

  componentDidUpdate() {
    var map = this.refs.map.leafletElement
    map.invalidateSize()
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col-4">
            <button
              onClick={() => {
                this.handleButtonClick()
              }}
            >
              test
            </button>
            <EventSearchBar />
            <EventMapDataList />
          </div>
          <div className="col-8">
            <MyMapComponent
              lat={this.state.latitude}
              log={this.state.longitude}
              position={this.state.position}
            />
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Map)
