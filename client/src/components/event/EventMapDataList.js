import React, { useState } from 'react'
import Fade from 'react-reveal/Fade'
import SwitchButton from './MemberEventComponents/SwitchButton'
import { Dropdown } from 'react-bootstrap'
import Calendar from 'react-calendar'

//icon
import { FaMapMarkerAlt } from 'react-icons/fa'
import { FaRegClock } from 'react-icons/fa'
import { FaRegCalendarCheck } from 'react-icons/fa'
import { FaSearch, FaStreetView } from 'react-icons/fa'
import { GiCoffeeCup } from 'react-icons/gi'

class FilteredList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      sortType: '',
      search: '',
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
      }
    })

    // const dataArry = []
    // for (const key in data) {
    //   data[key].name = key
    //   dataArry.push(data[key])
    // }
    // console.log(dataArry)

    const namedataArry = []
    for (const key in data) {
      data[key].name = key
      namedataArry.push(data[key].name)
    }

    console.log(namedataArry)

    this.setState({
      data: namedataArry,
      search: '',
    })
  }

  updateSearch(event) {
    this.setState({
      data: this.state.data,
      search: event.target.value,
    })
  }

  filterList() {
    let updatedList = this.state.data.filter((item) => {
      return item.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    })
    let data = updatedList.map((item, index, array) => {
      return (
        <Fade>
          <li className="list-group-item" data-category={item} key={index}>
            <div className="eventContentBox d-flex">
              <div className="eventImgBox col-4">
                <img
                  src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                  alt=""
                />
              </div>
              <div className="eventDetailBox col-8 pl-3">
                <h2 className="eventTitle">{item}</h2>
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
          </li>
        </Fade>
      )
    })
    return data
  }
  render() {
    return (
      <div>
        <fieldset className="">
          <div className="px-4 p-3">
            <div class="box col-12">
              <div class="input-group">
                <input
                  className="form-control form-control-lg"
                  placeholder="Search"
                  onChange={(event) => this.updateSearch(event)}
                  value={this.state.search}
                  type="text"
                />
                <div class="input-group-append">
                  <span class="input-group-text bgGreen">
                    <FaSearch className="fonticon" />
                  </span>
                  <span class="input-group-text bgRed">
                    <FaStreetView className="fonticon" />
                  </span>
                </div>
              </div>
              <div className=" d-flex m-2 ">
                <Dropdown className="">
                  <Dropdown.Toggle
                    className="mapSearch btn-small"
                    variant="success"
                    id="dropdown-basic"
                  >
                    類型
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <div class="p-3">
                      <div class="form-check">
                        <input
                          class="form-check-input position-static"
                          type="checkbox"
                          id="blankCheckbox"
                          value="option1"
                          aria-label="..."
                        />
                        <label className="">文藝展覽</label>
                      </div>
                      <div class="dropdown-divider"></div>
                      <div class="form-check">
                        <input
                          class="form-check-input position-static"
                          type="checkbox"
                          id="blankCheckbox"
                          value="option1"
                          aria-label="..."
                        />
                        <label className="">手作課程</label>
                      </div>
                      <div class="dropdown-divider"></div>
                      <div class="form-check">
                        <input
                          className="form-check-input position-static "
                          type="checkbox"
                          id="blankCheckbox"
                          value="option1"
                          aria-label="..."
                        />
                        <label className="">咖啡廳</label>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle
                    className="mapSearch  btn-small"
                    variant="success"
                    id="dropdown-basic"
                  >
                    日期
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Calendar />
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle
                    className="mapSearch  btn-small"
                    variant="success"
                    id="dropdown-basic"
                  >
                    評價
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <div class="p-3">
                      <div class="form-check">
                        <input
                          class="form-check-input position-static"
                          type="checkbox"
                          id="blankCheckbox"
                          value="option1"
                          aria-label="..."
                        />
                        <label className="">4.5顆星以上</label>
                      </div>
                      <div class="dropdown-divider"></div>
                      <div class="form-check">
                        <input
                          class="form-check-input position-static"
                          type="checkbox"
                          id="blankCheckbox"
                          value="option1"
                          aria-label="..."
                        />
                        <label className="">4顆星以上</label>
                      </div>
                      <div class="dropdown-divider"></div>
                      <div class="form-check">
                        <input
                          className="form-check-input position-static "
                          type="checkbox"
                          id="blankCheckbox"
                          value="option1"
                          aria-label="..."
                        />
                        <label className="">3顆星以上</label>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle
                    className="mapSearch  btn-small"
                    variant="success"
                    id="dropdown-basic"
                  >
                    價格
                  </Dropdown.Toggle>

                  <Dropdown.Menu></Dropdown.Menu>
                </Dropdown>

                <span>營業中</span>
                <SwitchButton />
                {/* <div className="d-flex switchbutton-jy align-items-center justify-content-end">
            <p>營業中</p>
            <SwitchButton
            // type="button"
            // active={props.isEnable}
            // clicked={toggleSwitchButton}
            />
          </div> */}
              </div>
            </div>
          </div>
        </fieldset>
        <div className="px-4">
          <div className="">
            <div className="select-1 mb-1 ">
              <select className="form-control btn-success btn-large">
                <option value="">排序方式</option>
                <option value="eventStartDate,asc">評分由低到高</option>
                <option value="eventStartDate,desc">評分由高到低</option>
                <option value="eventNeedPeople,asc">價格由低到高</option>
                <option value="eventNeedPeople,desc">價格由高到低</option>
              </select>
            </div>
          </div>
          <div className="dataBox overflow-auto px-1">
            <ul className="list-group ">{this.filterList()}</ul>
          </div>
        </div>
      </div>
    )
  }
}

export default FilteredList
