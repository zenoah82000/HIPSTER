import React, { useState, useEffect } from 'react'
import { VerticalTimeline } from 'react-vertical-timeline-component'
import { Map, TileLayer, Viewport, Popup, Marker } from 'react-leaflet'
import L from 'leaflet'
import TimelineElement from '../../components/user/TimelineElement'
import SimpleReactLightbox from 'simple-react-lightbox'
import { SRLWrapper } from 'simple-react-lightbox'
import $ from 'jquery'

import '../../styles/mContent/userMymap.scss'
import 'react-vertical-timeline-component/style.min.css'

export const pointerIcon = new L.Icon({
  iconUrl: require('../../images/location2.svg'),
  iconRetinaUrl: require('../../images/location2.svg'),
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [50, 55],
})

function UserMymap(props) {
  // console.log(props)
  const [myItemlist, setMyItemlist] = useState([])
  const member = JSON.parse(localStorage.getItem('member'))

  // 後端傳資料
  const checkoutAsync = async (order) => {
    const request = new Request(`http://localhost:5000/mymap/${member.id}`, {
      method: 'get',
      // body: JSON.stringify(order),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    console.log(data)

    setMyItemlist(data.myItemList)
    console.log(myItemlist)
  }

  useEffect(() => {
    checkoutAsync()
  }, [])

  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#back-to-top').fadeIn()
    } else {
      $('#back-to-top').fadeOut()
    }
  })
  // scroll body to 0px on click
  $('#back-to-top').click(function () {
    $('body,html').animate(
      {
        scrollTop: 0,
      },
      400
    )
    return false
  })

  return (
    <>
      <div className="usercontainer">
        <h2 className="usertitle">我的文青地圖</h2>

        <div className="tab-pane">
          <div style={{ background: '#E6DED8', padding: '20px 20px 0 20px' }}>
            <Map
              center={[25.0338438, 121.54335]}
              zoom={12}
              style={{ width: '100%', height: '350px' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {myItemlist.map((item, index) => (
                <Marker
                  position={[item.lat, item.log]}
                  icon={pointerIcon}
                  onMouseOver={(e) => {
                    e.target.openPopup()
                  }}
                >
                  {/* <Popup></Popup> */}
                </Marker>
              ))}
            </Map>
          </div>

          <div class="coupon-listview" style={{ background: '#E6DED8' }}>
            {myItemlist.length >= 1 ? (
              <VerticalTimeline>
                {myItemlist.map((item, index) => (
                  <TimelineElement myMapData={item} />
                ))}
              </VerticalTimeline>
            ) : (
              <div className="empty ">
                <div className="emptyimgbox mb-3">
                  <img
                    className="emptyImg mb-3"
                    src="http://localhost:5000/images/order/wishlist.webp"
                  />
                </div>
                <div className="emptytext text-center">
                  <p>
                    文青足跡是空的！趕緊探索你下一次的旅程，並標記你心儀的活動體驗
                  </p>
                </div>
              </div>
            )}
          </div>
          <a
            id="back-to-top"
            href="#"
            class="btn  btn-lg back-to-top"
            role="button"
          >
            <i class="fas fa-chevron-up"></i>
          </a>
        </div>
      </div>
    </>
  )
}

export default UserMymap
