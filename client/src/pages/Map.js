import React from 'react'
import '../styles/map.scss'

//引入自訂元件
import EventMapDataList from '../components/event/EventMapDataList'
import EventSearchBar from '../components/event/EventSearchBar'
import MyMapComponent from '../components/event/MyMapComponent'

function Map(props) {
  return (
    <>
      <div className="row">
        <div className="col-4">
          {/* <button type="button" >測試用</button> */}
          <EventSearchBar />
          <EventMapDataList />
        </div>
        <div className="col-8">
          <MyMapComponent />
        </div>
      </div>
    </>
  )
}

export default Map
