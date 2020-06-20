import React, { Component } from 'react'
import { Map, TileLayer, type Viewport, Popup, Marker } from 'react-leaflet'
import { GiCoffeeCup } from 'react-icons/gi'
import L from 'leaflet'

// import CafeData from '../../data/cafe.json'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { FaRegClock } from 'react-icons/fa'
import { FaRegCalendarCheck } from 'react-icons/fa'

export default class ViewportExample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        center: [25.0338438, 121.54335],
        zoom: 20,
      },
      data: [],
    }
  }

  componentDidMount() {
    const data = {}
    this.props.CafeData.cafes.forEach((item, i) => {
      data[item.name] = {
        name: item.name,
        id: item.id,
        lat: item.latitude,
        log: item.longitude,
        star: item.score,
        category: item.type,
      }
    })

    const dataArry = []
    for (const key in data) {
      data[key].name = key
      dataArry.push(data[key])
    }
    // console.log(dataArry)

    this.setState({
      data: dataArry,
      search: '',
    })
  }

  openPopup(marker) {
    if (marker && marker.leafletElement) {
      window.setTimeout(() => {
        marker.leafletElement.openPopup()
      })
    }
  }

  render() {
    let { viewport, clicked } = this.props
    console.log(viewport.center[0] - 0.001, viewport.center[0], clicked)
    return (
      <div>
        <Map viewport={viewport}    >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {clicked ?
            this.state.data.forEach((item) => {
              if (item.lat === viewport.center[0] && item.log === viewport.center[1]) {
                <Marker
                  position={viewport.center}
                  ref={this.openPopup}
                >
                  <Popup className="locationCard">
                    <h5>
                      <GiCoffeeCup className="h5 mr-1" />
                      {item.name}
                    </h5>
                    <ul className="cardList list-unstyled">
                      <li>
                        <div className=
                        {
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
                    </ul>
                    <button className="cardButton" value>
                      立即預定
                </button>
                  </Popup>
                </Marker>
              }
            }) :
            this.state.data.map((item) => (
              <Marker
                position={[item.lat, item.log]}
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
                      <div className={
                        item.category == '咖啡廳'
                          ? 'mapCategoryCafe'
                          : item.category == '手作課程'
                            ? 'mapCategoryItem'
                            : 'mapCategoryItem2'
                      }>
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
                  </ul>
                  <button className="cardButton" value>
                    立即預定
                </button>
                </Popup>
              </Marker>
            ))}
        </Map>
      </div>
    )
  }
}
