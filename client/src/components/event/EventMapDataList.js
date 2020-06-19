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
      searchBtn1: "類別",
      searchBtn2: "日期",
      searchBtn3: "星等",
      date: new Date()
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
        category: item.type
      }
    })

    const dataArry = []
    for (const key in data) {
      data[key].name = key
      dataArry.push(data[key])
    }
    console.log(dataArry)

    this.setState({
      data: dataArry,
      search: '',
    })
  }

  updateSearch(event) {
    this.setState({
      data: this.state.data,
      search: event.target.value,
    })
  }


  //搜尋btn
  showCat = (event) => {
    this.setState({
      searchBtn1: event.target.name,
    })
    console.log(this.state.searchBtn1)
  }

  showStar = (event) => {
    this.setState({
      searchBtn3: event.target.name,
    })
    // console.log(event)
  }

  showDate = (event) => {
    this.setState({
      searchBtn2: event.target.value,
    })
    // console.log(this.state.searchBtn2)
  }

  pickDate = (date, event) => {
    this.setState({ date }) 
    console.log(date, "onchange")
    console.log(this.state.date)
    console.log(this.state.searchBtn2)

  }


  filterList() {
    let updatedList = this.state.data.filter((item) => {
      switch (this.state.searchBtn1, this.state.searchBtn3) {
        case ("全部類別" || "類別", "4.5分以上"): return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && item.star > 4.5  
        break
        case ("全部類別" || "類別", "4分以上"): return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && item.star > 4
          break
        case ("全部類別" || "類別", "3.5分以上"): return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && item.star > 3.5
          break
        case ("咖啡廳", "4.5分以上"): return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && item.category == "咖啡廳" && item.star > 4.5
          break
        case ("咖啡廳", "4分以上"): return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && item.category == "咖啡廳" && item.star > 4;
          break
        case ("咖啡廳", "3.5分以上"): return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && item.category == "咖啡廳" && item.star > 3.5;
          break
        case ("咖啡廳", "全部星等" || "星等"): return  item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && item.category == "咖啡廳" && item.star >= 0;
        // console.log("test")
          break
        case ("手作課程", "4.5分以上"): return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && item.category == "手作課程" && item.star > 4.5
          break
        case ("手作課程", "4分以上"): return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && item.category == "手作課程" && item.star > 4;
          break
        case ("手作課程", "3.5分以上"): return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && item.category == "手作課程" && item.star > 3.5;
          break
        case ("手作課程", "全部星等" || "星等"): return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && item.category == "手作課程" && item.star >= 0;
          break
        case ("文藝展覽", "4.5分以上"): return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && item.category == "文藝展覽" && item.star > 4.5
          break
        case ("文藝展覽", "4分以上"): return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && item.category == "文藝展覽" && item.star > 4;
          break
        case ("文藝展覽", "3.5分以上"): return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && item.category == "文藝展覽" && item.star > 3.5;
          break
        case ("文藝展覽", "全部星等" || "星等"): return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && item.category == "文藝展覽" && item.star >= 0;
          break
          case ("全部類別" || "類別", "全部星等" || "星等"): return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
          break  
        default: return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
          break
      }
    })

    let data = updatedList.map((item, index, array) => {
      return (
        <Fade>
          <li className="list-group-item" data-category={item.name} key={index}>
            <div className="eventContentBox d-flex">
              <div className="eventImgBox col-4">
                <img
                  src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                  alt=""
                />
              </div>
              <div className="eventDetailBox col-8 pl-3">
                <h2 className="eventTitle">{item.name}</h2>
                <ul className=" list-unstyled">
                  <li>
                    <div className={this.state.category = "咖啡廳" ? "mapCategoryCafe" : "mapCategoryCafe"}>{item.category}</div>
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
                  >{this.state.searchBtn1}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="" className="btn3" name="全部類別" onClick={(event) => this.showCat(event)}>全部類別</Dropdown.Item>
                    <Dropdown.Item href="" className="btn3" name="文藝展覽" onClick={(event) => this.showCat(event)}>文藝展覽</Dropdown.Item>
                    <Dropdown.Item href="" className="btn3" name="手作課程" onClick={(event) => this.showCat(event)}>手作課程</Dropdown.Item>
                    <Dropdown.Item href="" className="btn3" name="咖啡廳" onClick={(event) => this.showCat(event)}>咖啡廳</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                  <Dropdown.Toggle
                    className="mapSearch  btn-small"
                    variant="success"
                    id="dropdown-basic"
                  >
                    {this.state.searchBtn2}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Calendar
                      onChange={this.pickDate} value={this.state.date} onClick={(event) => this.showDate(event)} />
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle
                    className="mapSearch  btn-small"
                    variant="success"
                    id="dropdown-basic"
                  >
                    {this.state.searchBtn3}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="" className="btn3" name="4.5分以上" onClick={(event) => this.showStar(event)}>4.5分以上</Dropdown.Item>
                    <Dropdown.Item href="" className="btn3" name="4分以上" onClick={(event) => this.showStar(event)}>4分以上</Dropdown.Item>
                    <Dropdown.Item href="" className="btn3" name="3.5分以上" onClick={(event) => this.showStar(event)}>3.5分以上</Dropdown.Item>
                    <Dropdown.Item href="" className="btn3" name="全部星等" onClick={(event) => this.showStar(event)}>全部星等</Dropdown.Item>
                  </Dropdown.Menu>
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
