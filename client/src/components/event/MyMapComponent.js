import React, { Component } from 'react'
import { Map, TileLayer, Viewport, Popup, Marker } from 'react-leaflet'
import L from 'leaflet'
import RatingStarValue from '../comments/ratingStarValue'
//icon
import { FaMapMarkerAlt } from 'react-icons/fa'
import { FaRegClock } from 'react-icons/fa'
import { FaRegCalendarCheck } from 'react-icons/fa'
import { GiCoffeeCup } from 'react-icons/gi'
import { RiMoneyCnyCircleLine } from 'react-icons/ri'
import { AiFillStar } from 'react-icons/ai'

export const pointerIcon = new L.Icon({
  iconUrl: require('../../images/myplace.svg'),
  iconRetinaUrl: require('../../images/myplace.svg'),
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [50, 55],
})

export const cafeTagIcon = new L.Icon({
  iconUrl: require('../../images/location-pin.svg'),
  iconRetinaUrl: require('../../images/location-pin.svg'),
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [50, 55],
})
export const productTagIcon = new L.Icon({
  iconUrl: require('../../images/point.svg'),
  iconRetinaUrl: require('../../images/point.svg'),
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
    console.log(this.props.viewport.center)
    this.state = {
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
    console.log('mapdata', data)
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
      // console.log('test')
      window.setTimeout(() => {
        marker.leafletElement.openPopup()
        // console.log('test')
      })
    }
  }
  stars = (v) => {
    const star = []
    for (let i = 0; i < 5; i++) {
      star.push(<AiFillStar className={v > i ? 'star1' : 'star2'} />)
    }
    return star
  }
  render() {
    let { viewport, clicked, cafeActive, clickData } = this.props
    console.log(this.props)
    // console.log(clickData.mapId)
    // console.log(clickData.lat, clickData.log)
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
              <Marker
                position={(clickData.lat, clickData.log)}
                ref={this.openPopup}
                icon={cafeTagIcon}
              >
                <Popup className="locationCard">
                  <h5>
                    <GiCoffeeCup className="h5 mr-1" />
                    {clickData.mapCafe_Name}
                  </h5>
                  <ul className="cardList list-unstyled">
                    <li>
                      <div
                        className={
                          clickData.category == '咖啡廳'
                            ? 'mapCategoryCafe'
                            : clickData.category == '手作課程'
                            ? 'mapCategoryItem'
                            : 'mapCategoryItem2'
                        }
                      >
                        <span>{clickData.category}</span>
                      </div>
                    </li>
                    <li
                      style={{
                        width: '300px',
                        height: '200px',
                        objectFit: 'cover',
                        overflow: 'hidden',
                        marginTop: '10px',
                      }}
                    >
                      {/* <img
                        src={
                          'http://localhost:5000/images/mapCafe/' +
                          clickData.Img
                        }
                        alt=""
                      /> */}
                    </li>
                    <li>{/* <span>星等{clickData.star}</span> */}</li>
                    <li>
                      <span className="mr-2">
                        <FaRegClock />
                      </span>
                      <span>
                        營業時間{clickData.openTime}-{clickData.closeTime}
                      </span>
                    </li>
                    <li>
                      <span className="mr-2">
                        <FaMapMarkerAlt />
                      </span>
                      <span>地點{clickData.mapCafe_Address}</span>
                    </li>
                    <li>
                      <span className="mr-2 ">
                        <FaRegCalendarCheck />
                      </span>
                      <span>電話：{clickData.mapCafe_Phone}</span>
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
                      {item.mapCafe_Name}
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
                          width: '300px',
                          height: '200px',
                          objectFit: 'cover',
                          overflow: 'hidden',
                          marginTop: '10px',
                        }}
                      >
                        <img
                          src={
                            'http://localhost:5000/images/mapCafe/' + item.Img
                          }
                          alt=""
                        />
                      </li>
                      <li>
                        <RatingStarValue ratingValue={item.star} />
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
            ref={this.openPopup}
            position={this.props.myLocation}
          >
            <Popup
              style={{
                width: '50px',
                height: '50px',
                fontFamily: '微軟正黑體',
              }}
            >
              <p
                style={{
                  fontFamily: '微軟正黑體',
                  fontWeight: 'bold',
                  color: 'rgba(104, 142, 103, 0.8)',
                }}
              >
                我的位置
              </p>
            </Popup>
          </Marker>

          {/* 商品地標 */}
          {clickData.lat ? (
            <>
              <Marker
                ref={this.openPopup}
                position={[clickData.lat, clickData.log]}
                icon={productTagIcon}
              >
                <Popup className="locationCard">
                  <h5 style={{ width: '100%' }}>{clickData.productName}</h5>
                  <ul className="cardList list-unstyled">
                    <li>
                      <div
                        className={
                          clickData.category == '咖啡廳'
                            ? 'mapCategoryCafe'
                            : clickData.category == '手作課程'
                            ? 'mapCategoryItem'
                            : 'mapCategoryItem2'
                        }
                      >
                        <span>{clickData.category}</span>
                      </div>
                    </li>
                    <li
                      style={{
                        width: '300px',
                        height: '200px',
                        objectFit: 'cover',
                        overflow: 'hidden',
                        marginTop: '10px',
                      }}
                    >
                      <img
                        src={
                          'http://localhost:5000/images/product/' +
                          clickData.productImg
                        }
                        alt=""
                      />
                    </li>
                    <li>
                      <span>
                        {this.stars(clickData.star)}
                        {/* <RatingStarValue ratingValue={clickData.star} /> */}
                      </span>
                    </li>
                    <li>
                      <span className="mr-2">
                        <FaRegCalendarCheck />
                      </span>
                      <span>
                        活動時間:{clickData.openTime}-{clickData.closeTime}
                      </span>
                    </li>
                    <li>
                      <span className="mr-2">
                        <FaMapMarkerAlt />
                      </span>
                      <span>地點: {clickData.productAddress}</span>
                    </li>
                    {/* <li>
                      
                    <FaRegClock />
                      <span className="mr-2 ">
                        <FaRegCalendarCheck />
                      </span>
                      <span>
                        活動日期：{clickData.openTime}-{clickData.closeTime}
                      </span>
                    </li> */}
                    <li>
                      <span className="mr-2 ">
                        <FaRegCalendarCheck />
                      </span>
                      <span>
                        價格：NT$
                        {clickData.productPrice
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}
                      </span>
                    </li>
                  </ul>
                  <div className="cardButton">
                    <a value="" href={'/product/{item.productId}'}>
                      立即預定商品
                    </a>
                  </div>
                </Popup>
              </Marker>

              {this.state.productdata.map((item) => (
                <Marker
                  position={[item.lat, item.log]}
                  icon={productTagIcon}
                  // onMouseOver={(e) => {
                  //   e.target.openPopup()
                  // }}
                  // onMouseOut={(e) => {
                  //   e.target.closePopup()
                  // }}
                >
                  <Popup className="locationCard">
                    <h5>{item.productName}</h5>
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
                          width: '300px',
                          height: '200px',
                          objectFit: 'cover',
                          overflow: 'hidden',
                          marginTop: '10px',
                        }}
                      >
                        <img
                          src={
                            'http://localhost:5000/images/product/' +
                            item.productImg
                          }
                          alt=""
                          style={{ height: '100%', objectFit: 'cover' }}
                        />
                      </li>
                      <li>
                        <RatingStarValue ratingValue={item.star} />
                      </li>
                      <li>
                        <span className="mr-2">
                          <FaRegClock />
                        </span>
                        <span>
                          活動日期: {item.openTime}-{item.closeTime}
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
                          <RiMoneyCnyCircleLine />
                        </span>
                        <span>
                          價格：NT$
                          {item.productPrice
                            .toString()
                            .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}
                        </span>
                      </li>
                    </ul>
                    <div className="cardButton">
                      <a
                        value=""
                        href={'/product/{item.productId}'}
                        target="_blank"
                      >
                        立即預定商品
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </>
          ) : (
            this.state.productdata.map((item) => (
              <Marker position={[item.lat, item.log]} icon={productTagIcon}>
                <Popup className="locationCard">
                  <h5>{item.productName}</h5>
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
                        width: '300px',
                        height: '200px',
                        objectFit: 'cover',
                        overflow: 'hidden',
                        marginTop: '10px',
                      }}
                    >
                      <img
                        src={
                          'http://localhost:5000/images/product/' +
                          item.productImg
                        }
                        alt=""
                        style={{ height: '100%', objectFit: 'cover' }}
                      />
                    </li>
                    <li>
                      <RatingStarValue ratingValue={item.star} />
                    </li>
                    <li>
                      <span className="mr-2">
                        <FaRegClock />
                      </span>
                      <span>
                        活動日期: {item.openTime}-{item.closeTime}
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
                        <RiMoneyCnyCircleLine />
                      </span>
                      <span>
                        價格：NT$
                        {item.productPrice
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}
                      </span>
                    </li>
                  </ul>
                  <div className="cardButton">
                    <a
                      value=""
                      href={`/product/${item.productId}`}
                      target="_blank"
                    >
                      立即預定商品
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))
          )}
        </Map>
      </div>
    )
  }
}
