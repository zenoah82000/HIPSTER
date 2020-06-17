import React from 'react'
import '../styles/map.scss'

//引入自訂元件
import EventMapDataList from '../components/event/EventMapDataList'
import EventSearchBar from '../components/event/EventSearchBar'
import MyMapComponent from '../components/event/MyMapComponent'
import Location from '../components/event/location'

function Map(props) {
  return (
    <>
      <div className="row">
        <div className="col-4">
          <EventSearchBar />
          <EventMapDataList />
        </div>
        <div className="col-8">
          {/* <MyMapComponent /> */}
          <Location />
        </div>
      </div>
    </>
  )
}

export default Map
