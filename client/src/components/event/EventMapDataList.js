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
      searchBtn1: '類別',
      searchBtn2: '日期',
      searchBtn3: '星等',
      date: new Date(),
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
    console.log(data)
    const dataArry = Object.values(data)
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

  //排序
  sortByStarAsc = () => {
    let sortedProductsAsc
    sortedProductsAsc = this.state.data.sort((a, b) => {
      return parseInt(a.star) - parseInt(b.star)
    })

    this.setState({
      data: sortedProductsAsc,
    })
  }

  sortByStarDsc = () => {
    let sortedProductsDsc
    sortedProductsDsc = this.state.data.sort((a, b) => {
      return parseInt(b.star) - parseInt(a.star)
    })

    this.setState({
      data: sortedProductsDsc,
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
    console.log(date, 'onchange')
    console.log(this.state.date)
    console.log(this.state.searchBtn2)
  }

  //地圖定位
  handleClick() {
    this.props.onClickReset()
  }
  cardClick = (cid) => {
    // console.log(cid)
    this.state.data.forEach((item) => {
      // console.log(item)
      if (item.id === cid) {
        // console.log(item.lat, item.log)
        this.props.cardClickReset(item.lat, item.log)
      }
    })
  }
  onItemClick = (event) => {
    event.openPopup();
  }




  filterList() {
    let updatedList = this.state.data.filter((item) => {
      console.log(this.state.searchBtn1, this.state.searchBtn3)
      if (
        this.state.searchBtn1 === '全部類別' ||
        this.state.searchBtn1 === '類別'
      ) {
        console.log('texs')
        if (this.state.searchBtn3 == '4.5分以上') {
          return (
            item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
            -1 && item.star > 25
          )
        } else if (this.state.searchBtn3 == '4分以上') {
          return (
            item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
            -1 && item.star > 20
          )
        } else if (this.state.searchBtn3 == '3.5分以上') {
          return (
            item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
            -1 && item.star > 3.5
          )
        } else {
          return (
            item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
            -1
          )
        }
      } else if (this.state.searchBtn1 == '咖啡廳') {
        if (this.state.searchBtn3 == '4.5分以上') {
          return (
            item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
            -1 &&
            item.category == '咖啡廳' &&
            item.star > 4.5
          )
        } else if (this.state.searchBtn3 == '4分以上') {
          return (
            item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
            -1 &&
            item.category == '咖啡廳' &&
            item.star > 4.5
          )
        } else if (this.state.searchBtn3 == '3.5分以上') {
          return (
            item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
            -1 &&
            item.category == '咖啡廳' &&
            item.star > 3.5
          )
        } else {
          return (
            item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
            -1 && item.category == '咖啡廳'
          )
        }
      } else if (this.state.searchBtn1 == '手作課程') {
        if (this.state.searchBtn3 == '4.5分以上') {
          return (
            item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) &&
            item.category == '手作課程' &&
            item.star > 4.5
          )
        } else if (this.state.searchBtn3 == '4分以上') {
          return (
            item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
            -1 &&
            item.category == '手作課程' &&
            item.star > 4.5
          )
        } else if (this.state.searchBtn3 == '3.5分以上') {
          return (
            item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
            -1 &&
            item.category == '手作課程' &&
            item.star > 3.5
          )
        } else {
          return (
            item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
            -1 && item.category == '手作課程'
          )
        }
      } else if (this.state.searchBtn1 == '文藝展覽') {
        if (this.state.searchBtn3 == '4.5分以上') {
          return (
            item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
            -1 &&
            item.category == '文藝展覽' &&
            item.star > 4.5
          )
        } else if (this.state.searchBtn3 == '4分以上') {
          return (
            item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
            -1 &&
            item.category == '文藝展覽' &&
            item.star > 4.5
          )
        } else if (this.state.searchBtn3 == '3.5分以上') {
          return (
            item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
            -1 &&
            item.category == '文藝展覽' &&
            item.star > 3.5
          )
        } else {
          return (
            item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
            -1 && item.category == '文藝展覽'
          )
        }
      }
    })

    let data = updatedList.map((item, index, array) => {
      return (
        <Fade>
          <li
            className="eventContentLi list-group-item"
            data-category={item.name}
            key={index}
            id={item.id}
            onClick={() => this.cardClick(item.id)}
          >
            <div className="eventContentBox d-flex">
              <div className="eventImgBox col-4">
                <img
                  src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                  alt=""
                />
              </div>
              <div className="eventDetailBox col-8 pl-3">
                <h4 className="eventTitle" style={{ fontWeight: 'bold' }}>
                  {item.name}
                </h4>
                <ul className=" list-unstyled">
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
                      {item.category}
                    </div>
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
                  <button
                    class="input-group-text bgRed mylocationBtn"
                    onClick={() => this.handleClick()}
                  >
                    <FaStreetView className="fonticon" />
                  </button>
                </div>
              </div>
              <div className=" d-flex m-2 ">
                <Dropdown className="">
                  <Dropdown.Toggle
                    className="mapSearch btn-small"
                    variant="success"
                    id="dropdown-basic"
                  >
                    {this.state.searchBtn1}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      href=""
                      className="btn3 "
                      name="全部類別"
                      onClick={(event) => this.showCat(event)}
                    >
                      全部類別
                    </Dropdown.Item>
                    <Dropdown.Item
                      href=""
                      className="btn3"
                      name="文藝展覽"
                      onClick={(event) => this.showCat(event)}
                    >
                      文藝展覽
                    </Dropdown.Item>
                    <Dropdown.Item
                      href=""
                      className="btn3"
                      name="手作課程"
                      onClick={(event) => this.showCat(event)}
                    >
                      手作課程
                    </Dropdown.Item>
                    <Dropdown.Item
                      href=""
                      className="btn3"
                      name="咖啡廳"
                      onClick={(event) => this.showCat(event)}
                    >
                      咖啡廳
                    </Dropdown.Item>
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
                      onChange={this.pickDate}
                      value={this.state.date}
                      onClick={(event) => this.showDate(event)}
                    />
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
                    <Dropdown.Item
                      href=""
                      className="btn3"
                      name="全部星等"
                      onClick={(event) => this.showStar(event)}
                    >
                      全部星等
                    </Dropdown.Item>
                    <Dropdown.Item
                      href=""
                      className="btn3"
                      name="4.5分以上"
                      onClick={(event) => this.showStar(event)}
                    >
                      4.5分以上
                    </Dropdown.Item>
                    <Dropdown.Item
                      href=""
                      className="btn3"
                      name="4分以上"
                      onClick={(event) => this.showStar(event)}
                    >
                      4分以上
                    </Dropdown.Item>
                    <Dropdown.Item
                      href=""
                      className="btn3"
                      name="3.5分以上"
                      onClick={(event) => this.showStar(event)}
                    >
                      3.5分以上
                    </Dropdown.Item>
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
              <select
                className="form-control btn-success btn-large"
                onChange={(event) => {
                  console.log(event.target.value)
                  switch (event.target.value) {
                    case 'starAsc':
                      this.sortByStarAsc()
                      break
                    case 'starDsc':
                      this.sortByStarDsc()
                      break
                  }
                }}
              >
                <option value="" disabled selected style={{ display: 'none' }}>
                  排序方式
                </option>
                <option value="starAsc">評分由低到高</option>
                <option value="starDsc">評分由高到低</option>
                <option value="priceAsc">價格由低到高</option>
                <option value="priceDesc">價格由高到低</option>
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
