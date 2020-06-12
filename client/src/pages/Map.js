import React from 'react'
import '../styles/home.scss'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { Link, NavLink, withRouter } from 'react-router-dom'

//引入自訂元件
import EventMapDataList from '../components/event/EventMapDataList'
import EventSearchBar from '../components/event/EventSearchBar'
import MyMapComponent from '../components/event/MyMapComponent'

function Map(props) {
  return (
    <>   
             <div className="row ">
               <div className="col-4">
                 <EventSearchBar/>
                 <EventMapDataList/>
              </div>
               <div className="col-8">
                 <MyMapComponent/>
               </div>
             </div>          
    </>
  )
}

export default  Map


// import React, { useEffect, useState } from 'react'

// //引入通用conmponent
// import Mynavbar from '../components/Mynavbar'
// import Myfooter from '../components/Myfooter'

// // 引入conmponent
// import Map from '../../components/divelocation/map' 
//引入leaf組件



// <<<<<<< HEAD

// import React, { useEffect, useState } from 'react'

// //引入Google Map組件
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
// } from 'react-google-maps'

// import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer'

// //引入redux元件
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

// //引入action
// import {
//   getEventDataForMapAsync,
//   getEventTypeDataAsync,
//   switchButtonisEnable,
// } from '../../actions/event/event_Actions'

// //引入自訂元件

// import Mynavbar from '../components/Mynavbar'
// import Myfooter from '../components/Myfooter'

// // import Loading from '../../components/class/Loading'
// import EventMapDataList from '../../components/event/EventMapDataList'
// import EventSearchBar from '../../components/event/EventSearchBar'

// function EventMapList(props) {
//   const [eventDataForMap, setEventDataForMap] = useState([]) //存放地圖專用資料
//   const [hasloading, setHasLoading] = useState(false) //是否正在載入中
//   const [isEnable, setIsEnable] = useState() //是否按下 "包含已過期資料的按鈕"

//   useEffect(() => {
//     props.getEventDataForMapAsync()
//     props.getEventTypeDataAsync()
//   }, [])

//   //每當eventDataForMap改變時就提示載入中
//   useEffect(() => {
//     setHasLoading(true)
//     setTimeout(() => {
//       if (props.eventDataForMap.status) {
//         setHasLoading(false)
//         setEventDataForMap(props.eventDataForMap.result)
//       }
//     }, 500)
//   }, [props.eventDataForMap])

//   //每次按鈕被點擊時，就取得新資料
//   useEffect(() => {
//     getEventData()
//   }, [props.isEnable])

//   const getEventData = () => {
//     const type = document.querySelector('select[name="type"]').value
//     const sort = document.querySelector('select[name="sort"]').value
//     const q = document.querySelector('input.searchInput').value
//     props.getEventDataForMapAsync(type, q, sort, props.isEnable)
//   }

//   let ref //建立一個ref，用來接收地圖參照

//   //處理地圖邊界改變時的事件
//   const onBoundsChanged = () => {
//     //boxList = 找到所有列表上的資料
//     const boxList = document.querySelectorAll(
//       'div.col-xl-12.col-10.eventInfoBox.eventMapList-JY'
//     )
//     //透過forEach將所有資料隱藏起來
//     boxList.forEach(value => {
//       value.style.display = 'none'
//     })

//     if (eventDataForMap && eventDataForMap.length > 0) {
//       eventDataForMap.map(value => {
//         //運用Google Map Api
//         //.getBounds() = 可以取得目前窗口的邊界值
//         //.contains() = 可以確認傳入的經緯度是不是有在剛剛取得的範圍內，有就回傳true
//         if (
//           ref.getBounds().contains({
//             lat: parseFloat(value.eventLocation_lat),
//             lng: parseFloat(value.eventLocation_lng),
//           })
//         ) {
//           //如果有符合的對象，就顯示他們
//           document.querySelector(
//             `div.col-xl-12.col-10.eventInfoBox.eventMapList-JY[data-eventId="${value.eventId}"]`
//           ).style.display = 'block'
//         }
//       })
//     }
//   }

//   const MyMapComponent = withScriptjs(
//     withGoogleMap(props => (
//       <GoogleMap
//         defaultZoom={15}
//         ref={mapRef => (ref = mapRef)} //綁定ref到我們定義的ref裡，這樣才能參照到地圖物件，然後取得方法
//         defaultCenter={{ lat: 24, lng: 120.8 }}
//         onBoundsChanged={onBoundsChanged}
//         options={{ gestureHandling: 'greedy' }}
//       >
//         <MarkerClusterer gridSize={20}>
//           {eventDataForMap
//             ? eventDataForMap.map((value, index) => {
//                 return (
//                   <Marker
//                     key={index}
//                     position={{
//                       lat: parseFloat(value.eventLocation_lat),
//                       lng: parseFloat(value.eventLocation_lng),
//                     }}
//                   />
//                 )
//               })
//             : ''}
//         </MarkerClusterer>
//       </GoogleMap>
//     ))
//   )

//   return (
//     <>
//       <Mynavbar />
//       {/* <Banner BannerImgSrc="./images/eventImg/eventBanner1.png" /> */}
//       <div className="container-fluid JY-event-container-maplist">
//         {hasloading ? (
//           <Loading />
//         ) : (
//           <>
//             <div className="row ">
//               <div className="col-4 eventListBox mt-5">
//                 <EventSearchBar
//                   getEventData={getEventData}
//                   eventTypeData={props.eventTypeData}
//                   setIsEnable={props.switchButtonisEnable}
//                   isEnable={props.isEnable}
//                 />
//                 <EventMapDataList eventData={eventDataForMap} />
//               </div>
//               <div className="col-8">
//                 <MyMapComponent
//                   isMarkerShown
//                   googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC3kp9ZM2JgqNLY4_xNhQQNUNAF-UmogvA`}
//                   loadingElement={<div style={{ height: `100%` }} />}
//                   containerElement={
//                     <div style={{ width: `100%`, height: `100vh` }} />
//                   }
//                   mapElement={<div style={{ height: `100%` }} />}
//                 />
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//       <Myfooter />
//     </>
//   )
// }

// // 取得Redux中store的值
// const mapStateToProps = store => {
//   return {
//     eventDataForMap: store.eventReducer.eventDataForMap,
//     eventTypeData: store.eventReducer.eventTypeData,
//     isEnable: store.eventReducer.isEnable,
//   }
// }

// // 指示dispatch要綁定哪些action creators
// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     { getEventDataForMapAsync, getEventTypeDataAsync, switchButtonisEnable },
//     dispatch
//   )
// }

// export default connect(mapStateToProps, mapDispatchToProps)(EventMapList)
// =======
// import React, { useEffect, useState } from 'react'

// //引入Google Map組件
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
// } from 'react-google-maps'
// import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer'

// //引入redux元件
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

// //引入action
// import {
//   getEventDataForMapAsync,
//   getEventTypeDataAsync,
//   switchButtonisEnable,
// } from '../../actions/event/event_Actions'

// //引入自訂元件
// import Header from '../../components/Header'
// import Banner from '../../components/Banner'
// import Footer from '../../components/Footer'
// import Loading from '../../components/class/Loading'
// import EventMapDataList from '../../components/event/EventMapDataList'
// import EventSearchBar from '../../components/event/EventSearchBar'

// function EventMapList(props) {
//   const [eventDataForMap, setEventDataForMap] = useState([]) //存放地圖專用資料
//   const [hasloading, setHasLoading] = useState(false) //是否正在載入中
//   const [isEnable, setIsEnable] = useState() //是否按下 "包含已過期資料的按鈕"

//   useEffect(() => {
//     props.getEventDataForMapAsync()
//     props.getEventTypeDataAsync()
//   }, [])

//   //每當eventDataForMap改變時就提示載入中
//   useEffect(() => {
//     setHasLoading(true)
//     setTimeout(() => {
//       if (props.eventDataForMap.status) {
//         setHasLoading(false)
//         setEventDataForMap(props.eventDataForMap.result)
//       }
//     }, 500)
//   }, [props.eventDataForMap])

//   //每次按鈕被點擊時，就取得新資料
//   useEffect(() => {
//     getEventData()
//   }, [props.isEnable])

//   const getEventData = () => {
//     const type = document.querySelector('select[name="type"]').value
//     const sort = document.querySelector('select[name="sort"]').value
//     const q = document.querySelector('input.searchInput').value
//     props.getEventDataForMapAsync(type, q, sort, props.isEnable)
//   }

//   let ref //建立一個ref，用來接收地圖參照

//   //處理地圖邊界改變時的事件
//   const onBoundsChanged = () => {
//     //boxList = 找到所有列表上的資料
//     const boxList = document.querySelectorAll(
//       'div.col-xl-12.col-10.eventInfoBox.eventMapList-JY'
//     )
//     //透過forEach將所有資料隱藏起來
//     boxList.forEach(value => {
//       value.style.display = 'none'
//     })

//     if (eventDataForMap && eventDataForMap.length > 0) {
//       eventDataForMap.map(value => {
//         //運用Google Map Api
//         //.getBounds() = 可以取得目前窗口的邊界值
//         //.contains() = 可以確認傳入的經緯度是不是有在剛剛取得的範圍內，有就回傳true
//         if (
//           ref.getBounds().contains({
//             lat: parseFloat(value.eventLocation_lat),
//             lng: parseFloat(value.eventLocation_lng),
//           })
//         ) {
//           //如果有符合的對象，就顯示他們
//           document.querySelector(
//             `div.col-xl-12.col-10.eventInfoBox.eventMapList-JY[data-eventId="${value.eventId}"]`
//           ).style.display = 'block'
//         }
//       })
//     }
//   }

//   const MyMapComponent = withScriptjs(
//     withGoogleMap(props => (
//       <GoogleMap
//         defaultZoom={15}
//         ref={mapRef => (ref = mapRef)} //綁定ref到我們定義的ref裡，這樣才能參照到地圖物件，然後取得方法
//         defaultCenter={{ lat: 24, lng: 120.8 }}
//         onBoundsChanged={onBoundsChanged}
//         options={{ gestureHandling: 'greedy' }}
//       >
//         <MarkerClusterer gridSize={20}>
//           {eventDataForMap
//             ? eventDataForMap.map((value, index) => {
//                 return (
//                   <Marker
//                     key={index}
//                     position={{
//                       lat: parseFloat(value.eventLocation_lat),
//                       lng: parseFloat(value.eventLocation_lng),
//                     }}
//                   />
//                 )
//               })
//             : ''}
//         </MarkerClusterer>
//       </GoogleMap>
//     ))
//   )

//   return (
//     <>
//       <Header />

//       {/* <Banner BannerImgSrc="./images/eventImg/eventBanner1.png" /> */}
//       <div className="container-fluid JY-event-container-maplist">
//         {hasloading ? (
//           <Loading />
//         ) : (
//           <>
//             <div className="row ">
//               <div className="col-4 eventListBox mt-5">
//                 <EventSearchBar
//                   getEventData={getEventData}
//                   eventTypeData={props.eventTypeData}
//                   setIsEnable={props.switchButtonisEnable}
//                   isEnable={props.isEnable}
//                 />
//                 <EventMapDataList eventData={eventDataForMap} />
//               </div>
//               <div className="col-8">
//                 <MyMapComponent
//                   isMarkerShown
//                   googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC3kp9ZM2JgqNLY4_xNhQQNUNAF-UmogvA`}
//                   loadingElement={<div style={{ height: `100%` }} />}
//                   containerElement={
//                     <div style={{ width: `100%`, height: `100vh` }} />
//                   }
//                   mapElement={<div style={{ height: `100%` }} />}
//                 />
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//       <Footer />
//     </>
//   )
// }

// // 取得Redux中store的值
// const mapStateToProps = store => {
//   return {
//     eventDataForMap: store.eventReducer.eventDataForMap,
//     eventTypeData: store.eventReducer.eventTypeData,
//     isEnable: store.eventReducer.isEnable,
//   }
// }

// // 指示dispatch要綁定哪些action creators
// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     { getEventDataForMapAsync, getEventTypeDataAsync, switchButtonisEnable },
//     dispatch
//   )
// }

// export default connect(mapStateToProps, mapDispatchToProps)(EventMapList)
// >>>>>>> 8906a3665611f6be66f29e901b448eaf05d26189
