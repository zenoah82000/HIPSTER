import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { GiCoffeeCup } from 'react-icons/gi'
import L from 'leaflet';

import CafeData from '../../data/cafe.json'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { FaRegClock } from 'react-icons/fa'
import { FaRegCalendarCheck } from 'react-icons/fa'

const MyMapComponent = () => {
  const [activeData, setActiveData] = React.useState(null)

  const data = {
    //name{
    //[lat,lag]
    //address
    //star
    //}
  }

  CafeData.cafes.forEach((item, i) => {
    data[item.name] = {
      id: item.id,
      lat: item.latitude,
      log: item.longitude,
      star: item.score,
    }
  })

  let dataArry = []

  for (const key in data) {
    data[key].name = key
    dataArry.push(data[key])
  }

  console.log(dataArry)
  console.log(data)

  const cafeIcon = L.icon({
    iconUrl: require('../../images/food.svg'),
    iconSize: [32,32],
    iconAnchor: [32, 64],
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null
  });
  
  const myIcon = L.icon({
  iconUrl: require('../../images/pin.svg'),
  iconSize: [64,64],
  iconAnchor: [32, 64],
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null
  });

  return (
    <div className="">
      <Map center={[25.0338438, 121.54335]} zoom={20}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* {data.map((data) => {

          ;<Marker position={[data.lat, data.log]} />
        })} */}

        {dataArry.map((item) => (
          <Marker
            // markers={
            //     markers.map(marker => (
            //         <Marker
            //             key={marker.key}
            //             icon={cafeIcon}
            //             position={[marker.latitude, marker.longitude]}
            //             properties={marker}   />
            //             ))
            //           }
            // key={data.id}
            // icon={cafeIcon}
            position={[item.lat, item.log]}
            onClick={() => {
              setActiveData(data)
            }}
          >
            <Popup>
              <div style={{ width: '500px', height: '500px' }}>
                <h5>
                  <GiCoffeeCup />
                  {item.name}
                </h5>
                <ul className=" list-unstyled">
                  <li>
                    <div className="mapCategory">手作課程</div>
                  </li>
                  <li>星等{item.star}</li>
                  <li>
                    <span className="mr-2">
                      <FaRegClock />
                    </span>
                    營業時間
                  </li>
                  <li>
                    <span className="mr-2">
                      <FaMapMarkerAlt />
                    </span>
                    地點
                  </li>
                  <li>
                    <span className="mr-2">
                      <FaRegCalendarCheck />
                    </span>
                    活動日期：
                  </li>
                </ul>
                <div
                  style={{
                    width: '300px',
                    height: '300px',
                    objectFit: 'cover',
                    overflow: 'hidden',
                    marginTop: '50px',
                  }}
                >
                  <img
                    src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                    alt=""
                  />
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </Map>
    </div>
  )
}

export default MyMapComponent
