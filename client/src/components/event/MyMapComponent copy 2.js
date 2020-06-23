import React, { Component } from 'react'
import { Map, TileLayer, type Viewport, Popup, Marker } from 'react-leaflet'
import { GiCoffeeCup } from 'react-icons/gi'
import L from 'leaflet'

// import CafeData from '../../data/cafe.json'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { FaRegClock } from 'react-icons/fa'
import { FaRegCalendarCheck } from 'react-icons/fa'

export const pointerIcon = new L.Icon({
  iconUrl: require('../../images/marker.svg'),
  iconRetinaUrl: require('../../images/marker.svg'),
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [50, 55],
  // shadowUrl: "../assets/marker-shadow.png",
  // shadowSize: [68, 95],
  // shadowAnchor: [20, 92]
})

export const cafeTagIcon = new L.Icon({
  iconUrl: require('../../images/location-pin.svg'),
  iconRetinaUrl: require('../../images/location-pin.svg'),
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [50, 55],
  // shadowUrl: "../assets/marker-shadow.png",
  // shadowSize: [68, 95],
  // shadowAnchor: [20, 92]
})

export default class ViewportExample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        center: [25.0338438, 121.54335],
        zoom: 20,
      },
      data: [],
      cafedata: [],
      productdata: [],
    }
  }

  //資料庫傳資料
  getOrderlistAsync = async () => {
    const request = new Request('http://localhost:5000/map', {
      method: 'get',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    // console.log(data)
    // console.log(data.productlist)
    // console.log(data.cafelist)
    this.setState({ cafedata: data.cafelist, productdata: data.productlist })
  }

  //初始化
  componentDidMount() {
    this.setState({
      search: '',
    })
    this.getOrderlistAsync()
  }

  openPopup(marker) {
    if (marker && marker.leafletElement) {
      window.setTimeout(() => {
        marker.leafletElement.openPopup()
      })
    }
  }

  render() {
    let { viewport, clicked, cafeActive } = this.props
    // console.log(viewport.center[0] - 0.001, viewport.center[0], clicked)
    return (
      <div>
        <Map viewport={viewport}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* 顯示咖啡廳 */}
          {cafeActive ? (
            clicked ? (
              // this.state.cafedata.filter((item) => {
              //   if (item.lat === viewport.center[0] && item.log === viewport.center[1]) {
              //     return()}else{ return}
              <Marker
                position={viewport.center}
                ref={this.openPopup}
                icon={cafeTagIcon}
              >
                <Popup className="locationCard">
                  <h5>
                    <GiCoffeeCup className="h5 mr-1" />
                    {/* {item.name} */}
                  </h5>
                  <ul className="cardList list-unstyled">
                    <li>
                      {/* <div className=
                      {
                        item.category == '咖啡廳'
                          ? 'mapCategoryCafe'
                          : item.category == '手作課程'
                            ? 'mapCategoryItem'
                            : 'mapCategoryItem2'
                      }
                    >
                      <span>{item.category}</span>
                    </div> */}
                    </li>
                    <li
                      style={{
                        width: '460px',
                        height: '200px',
                        objectFit: 'cover',
                        overflow: 'hidden',
                        marginTop: '10px',
                      }}
                    >
                      <img
                        src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                        alt=""
                      />
                    </li>
                    <li>{/* <span>星等{item.star}</span> */}</li>
                    <li>
                      <span className="mr-2">
                        <FaRegClock />
                      </span>
                      <span>營業時間</span>
                    </li>
                    <li>
                      <span className="mr-2">
                        <FaMapMarkerAlt />
                      </span>
                      <span>地點</span>
                    </li>
                    <li>
                      <span className="mr-2 ">
                        <FaRegCalendarCheck />
                      </span>
                      <span>活動日期：</span>
                    </li>
                    <li>
                      <span className="mr-2 ">
                        <FaRegCalendarCheck />
                      </span>
                      <span>電話：</span>
                    </li>
                  </ul>
                  <div className="cardButton">
                    <a value="" href="/#">
                      進入咖啡廳網址
                    </a>
                  </div>
                </Popup>
              </Marker>
            ) : (
              //     )
              //   }
              // })
              this.state.cafedata.map((item) => (
                <Marker
                  position={[item.lat, item.log]}
                  icon={cafeTagIcon}
                  // onMouseOver={e => {
                  //   e.target.openPopup();
                  // }}
                  // onMouseOut={e => {
                  //   e.target.closePopup();
                  // }}
                >
                  <Popup className="locationCard">
                    <h5>
                      <GiCoffeeCup className="h5 mr-1" />
                      {item.name}
                    </h5>
                    <ul className="cardList list-unstyled">
                      <li>
                        <div
                          className={
                            item.category == '咖啡廳'
                              ? 'mapCategoryCafe'
                              : item.category == '手作課程'
                              ? 'mapCategoryItem'
                              : 'mapCategoryItem2'
                          }
                        >
                          <span>{item.category}</span>
                        </div>
                      </li>
                      <li
                        style={{
                          width: '460px',
                          height: '200px',
                          objectFit: 'cover',
                          overflow: 'hidden',
                          marginTop: '10px',
                        }}
                      >
                        <img
                          src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                          alt=""
                        />
                      </li>
                      <li>
                        <span>星等{item.star}</span>
                      </li>
                      <li>
                        <span className="mr-2">
                          <FaRegClock />
                        </span>
                        <span>
                          營業時間: {item.openTime}-{item.closeTime}
                        </span>
                      </li>
                      <li>
                        <span className="mr-2">
                          <FaMapMarkerAlt />
                        </span>
                        <span>地點: {item.mapCafe_Address}</span>
                      </li>
                      <li>
                        <span className="mr-2 ">
                          <FaRegCalendarCheck />
                        </span>
                        <span>電話：{item.mapCafe_Phone}</span>
                      </li>
                    </ul>
                    <div className="cardButton">
                      <a value="" href={item.weblink} target="_blank">
                        進入咖啡廳網址
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ))
            )
          ) : (
            ''
          )}

          {/* My location */}
          <Marker
            icon={pointerIcon}
            className="mylocation"
            //  ref={this.openPopup}
            position={[25.0338438, 121.54335]}
          >
            {/* <Popup  >
                     我的位置
            </Popup> */}
          </Marker>
        </Map>
      </div>
    )
  }
}


{clicked ? ( <Marker
  position={viewport.center}
  ref={this.openPopup}
  icon={cafeTagIcon}
>
  <Popup className="locationCard">
    <h5>
      <GiCoffeeCup className="h5 mr-1" />
      {/* {item.name} */}
    </h5>
    <ul className="cardList list-unstyled">
      <li>
        {/* <div className=
        {
          item.category == '咖啡廳'
            ? 'mapCategoryCafe'
            : item.category == '手作課程'
              ? 'mapCategoryItem'
              : 'mapCategoryItem2'
        }
      >
        <span>{item.category}</span>
      </div> */}
      </li>
      <li
        style={{
          width: '460px',
          height: '200px',
          objectFit: 'cover',
          overflow: 'hidden',
          marginTop: '10px',
        }}
      >
        <img
          src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
          alt=""
        />
      </li>
      <li>{/* <span>星等{item.star}</span> */}</li>
      <li>
        <span className="mr-2">
          <FaRegClock />
        </span>
        <span>營業時間</span>
      </li>
      <li>
        <span className="mr-2">
          <FaMapMarkerAlt />
        </span>
        <span>地點</span>
      </li>
      <li>
        <span className="mr-2 ">
          <FaRegCalendarCheck />
        </span>
        <span>活動日期：</span>
      </li>
      <li>
        <span className="mr-2 ">
          <FaRegCalendarCheck />
        </span>
        <span>電話：</span>
      </li>
    </ul>
    <div className="cardButton">
      <a value="" href="/#">
        進入咖啡廳網址
      </a>
    </div>
  </Popup>
</Marker>):(this.state.productdata.map((item) => ( <Marker
        position={[item.lat, item.log]}
        icon={cafeTagIcon}
        // onMouseOver={e => {
        //   e.target.openPopup();
        // }}
        // onMouseOut={e => {
        //   e.target.closePopup();
        // }}
      >
        <Popup className="locationCard">
          <h5>
            <GiCoffeeCup className="h5 mr-1" />
            {item.productName}
          </h5>
          <ul className="cardList list-unstyled">
            <li>
              <div
                className={
                  item.category == '咖啡廳'
                    ? 'mapCategoryCafe'
                    : item.category == '手作課程'
                    ? 'mapCategoryItem'
                    : 'mapCategoryItem2'
                }
              >
                <span>{item.category}</span>
              </div>
            </li>
            <li
              style={{
                width: '460px',
                height: '200px',
                objectFit: 'cover',
                overflow: 'hidden',
                marginTop: '10px',
              }}
            >
              <img
                src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                alt=""
              />
            </li>
            <li>
              <span>星等{item.star}</span>
            </li>
            <li>
              <span className="mr-2">
                <FaRegClock />
              </span>
              <span>
                營業時間: {item.openTime}-{item.closeTime}
              </span>
            </li>
            <li>
              <span className="mr-2">
                <FaMapMarkerAlt />
              </span>
              <span>地點: {item.productAddress}</span>
            </li>
            <li>
              <span className="mr-2 ">
                <FaRegCalendarCheck />
              </span>
              <span>電話：{item.productPhone}</span>
            </li>
          </ul>
          <div className="cardButton">
            <a value="" href="
            /product/{item.productId}" target="_blank">
              進入咖啡廳網址
            </a>
          </div>
        </Popup>
      </Marker>)))
     }



