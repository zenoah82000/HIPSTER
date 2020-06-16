import React from 'react'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'

//icon  
import { FaMapMarkerAlt } from 'react-icons/fa'
import { FaRegClock } from 'react-icons/fa'
import { FaRegCalendarCheck } from 'react-icons/fa'

function EventDataList() {
  return (
    <>
      <div className="px-4">
        <div className="dataBox overflow-auto px-1">
          <Fade>
            <div className="eventContentBox d-flex">
              <div className="eventImgBox col-4">
                <img
                  src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                  alt=""
                />
              </div>
              <div className="eventDetailBox col-8 pl-3">
                <h2 className="eventTitle">商品名</h2>
                <ul className=" list-unstyled">
                  <li>
                    <div className="mapCategory">手作課程</div>
                  </li>
                  <li>星等</li>
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
          <Fade>
            <div className="eventContentBox d-flex">
              <div className="eventImgBox col-4">
                <img
                  src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                  alt=""
                />
              </div>
              <div className="eventDetailBox col-8 pl-3">
                <h2 className="eventTitle">商品名</h2>
                <ul className=" list-unstyled">
                  <li>
                    <div className="mapCategory">手作課程</div>
                  </li>
                  <li>星等</li>
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

          <Fade>
            <div className="eventContentBox d-flex">
              <div className="eventImgBox col-4">
                <img
                  src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                  alt=""
                />
              </div>
              <div className="eventDetailBox col-8 pl-3">
                <h2 className="eventTitle">商品名</h2>
                <ul className=" list-unstyled">
                  <li>
                    <div className="mapCategory">手作課程</div>
                  </li>
                  <li>星等</li>
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
          <Fade>
            <div className="eventContentBox d-flex">
              <div className="eventImgBox col-4">
                <img
                  src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                  alt=""
                />
              </div>
              <div className="eventDetailBox col-8 pl-3">
                <h2 className="eventTitle">商品名</h2>
                <ul className=" list-unstyled">
                  <li>
                    <div className="mapCategory">手作課程</div>
                  </li>
                  <li>星等</li>
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
          <Fade>
            <div className="eventContentBox d-flex">
              <div className="eventImgBox col-4">
                <img
                  src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                  alt=""
                />
              </div>
              <div className="eventDetailBox col-8 pl-3">
                <h2 className="eventTitle">商品名</h2>
                <ul className=" list-unstyled">
                  <li>
                    <div className="mapCategory">手作課程</div>
                  </li>
                  <li>星等</li>
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
        </div>
      </div>
    </>
  )
}

export default EventDataList
