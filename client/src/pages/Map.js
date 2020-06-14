import React from 'react'
import '../styles/map.scss'


//引入自訂元件
import EventMapDataList from '../components/event/EventMapDataList'
import EventSearchBar from '../components/event/EventSearchBar'
import MyMapComponent from '../components/event/MyMapComponent'

import Comments from '../components/comments/commentbox'

function Map(props) {
  return (
    <>
      <div className="row ">
        {/* <div className="col-4">
          <EventSearchBar />
          <EventMapDataList />
        </div>
        <div className="col-8">
          <MyMapComponent />
        </div> */}
         <Comments/>
      </div>
    </>
  )
}

export default Map