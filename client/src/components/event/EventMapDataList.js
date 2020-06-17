import React from 'react'
import Fade from 'react-reveal/Fade'

//icon  
import { FaMapMarkerAlt } from 'react-icons/fa'
import { FaRegClock } from 'react-icons/fa'
import { FaRegCalendarCheck } from 'react-icons/fa'

function EventDataList(props) {
  const { search,  CafeData } = props

  const data = {}

  CafeData.cafes.forEach((item, i) => {
    data[item.name] = {
      name:item.name, 
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

  const display =
    dataArry.map((item) => {
      if (item.name.indexOf(search) != -1)
        return(
      <div className="eventContentBox d-flex " >
        <div className="eventImgBox col-4" >
          <img
            src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
            alt=""
          />
        </div>
        <div className="eventDetailBox col-8 pl-3">
          <h2 className="eventTitle">{item.name}</h2>
          <ul className=" list-unstyled">
            <li>
              <div className="mapCategory">手作課程</div>
            </li>
            <li>星等:{item.star}</li>
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
        </div>
      </div>
    )})


  return (
    <>
      <div className="px-4">
        <div className="dataBox overflow-auto px-1">
          <Fade>
            {display}
          </Fade>
          {/* {dataArry.map((item) => (
          <Fade>
            <div className="eventContentBox d-flex">
              <div className="eventImgBox col-4" id={clickItem}  onChange={changeState} >
                <img
                  src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                  alt=""
                />
              </div>
              <div className="eventDetailBox col-8 pl-3">
                <h2 className="eventTitle">{item.name}</h2>
                <ul className=" list-unstyled">
                  <li>
                    <div className="mapCategory">手作課程</div>
                  </li>
                  <li>星等:{item.star}</li>
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
              </div>
            </div>
          </Fade>
 ))} */}
        </div>
      </div>
    </>
  )
}

export default EventDataList
