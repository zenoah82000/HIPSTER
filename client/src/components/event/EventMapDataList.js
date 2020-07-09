import React, { useState } from 'react'
import Fade from 'react-reveal/Fade'
import SwitchButton from './MemberEventComponents/SwitchButton'
import RatingStarValue from '../comments/ratingStarValue'
import { Dropdown } from 'react-bootstrap'
import Calendar from 'react-calendar'
// import '../../styles/product/map.scss'

//icon
import { FaMapMarkerAlt } from 'react-icons/fa'
import { FaRegClock } from 'react-icons/fa'
import { FaRegCalendarCheck } from 'react-icons/fa'
import { FaSearch, FaStreetView } from 'react-icons/fa'
import { GiCoffeeCup } from 'react-icons/gi'
import { RiMoneyCnyCircleLine } from 'react-icons/ri'
import { AiFillStar } from 'react-icons/ai'

//地圖列表
class mapList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cafedata: [],
      productdata: [],
      sortType: '',
      search: '',
      searchBtn1: '類別',
      searchBtn2: '日期',
      searchBtn3: '星等',
      star: 0,
      filterData: [],
      date: new Date(),
      dateClicked: false,
      active: true,
      display: true,
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
    this.setState(
      { cafedata: data.cafelist, productdata: data.productlist },
      () => {
        this.sortByStarDsc()
        this.productfilterList()
      }
    )
  }

  //初始化
  componentDidMount() {
    this.setState({
      search: '',
      display: false,
    })
    this.getOrderlistAsync()
    this.productfilterList()
  }

  //搜尋
  updateSearch(event) {
    this.setState(
      {
        data: this.state.data,
        search: event.target.value,
        display: true,
      },
      () => {
        this.productfilterList()
      }
    )
    console.log(event.target.value)
    this.props.searchInput(event.target.value)
  }
  componentDidUpdate() {
    setTimeout(() => {
      this.setState({
        display: false,
      })
    }, 800)
  }
  //排序
  sortByStarAsc = () => {
    let sortedProductsAsc
    sortedProductsAsc = this.state.productdata.sort((a, b) => {
      return parseInt(a.star) - parseInt(b.star)
    })

    this.setState({
      filterData: sortedProductsAsc,
    })
  }

  sortByStarDsc = () => {
    let sortedProductsDsc
    sortedProductsDsc = this.state.productdata.sort((a, b) => {
      return parseInt(b.star) - parseInt(a.star)
    })

    this.setState({
      filterData: sortedProductsDsc,
    })
  }

  sortByPriceAsc = () => {
    let sortedProductsAsc
    sortedProductsAsc = this.state.productdata.sort((a, b) => {
      return parseInt(a.productPrice) - parseInt(b.productPrice)
    })

    this.setState({
      filterData: sortedProductsAsc,
    })
  }

  sortByPriceDsc = () => {
    let sortedProductsDsc
    sortedProductsDsc = this.state.productdata.sort((a, b) => {
      return parseInt(b.productPrice) - parseInt(a.productPrice)
    })

    this.setState({
      filterData: sortedProductsDsc,
    })
  }
  stars = (v) => {
    const star = []
    for (let i = 0; i < 5; i++) {
      star.push(<AiFillStar className={v > i ? 'star1' : 'star2'} />)
    }
    return star
  }

  //搜尋btn
  showCat = (event) => {
    this.setState(
      {
        searchBtn1: event.target.name,
        display: true,
      },
      () => {
        this.productfilterList()
      }
    )
    console.log(this.state.searchBtn1)
  }
  showStar = (event) => {
    this.setState(
      {
        searchBtn3: event.target.text,
        display: true,
      },
      () => {
        this.productfilterList()
      }
    )
    this.setState({ star: +event.target.name })
  }

  //選日期
  showDate = (event) => {
    this.setState({
      searchBtn2: event.target.value,
      display: false,
    })
  }
  changeClickState = () => {
    this.setState({
      dateClicked: !this.state.dateClicked,
    })
    console.log(this.state.dateClicked)
  }
  // pickDate = (date, event) => {
  //   this.setState({ date })
  //   this.showDate()
  // }

  //地圖定位
  handleClick() {
    this.props.onClickReset()
    this.search.value = ''
  }

  //點擊咖啡廳卡片
  cardClick = (item) => {
    this.props.cardClick(item)
  }

  //點擊商品卡片
  productCardClick = (item) => {
    this.props.cardClick(item)
    console.log(item)
  }

  //popup資訊小卡
  onItemClick = (event) => {
    event.openPopup()
  }

  //商品列表
  productfilterList = () => {
    if (
      this.state.searchBtn1 === '全部類別' ||
      this.state.searchBtn1 === '類別'
    ) {
      if (this.state.star == 0) {
        const newdata = this.state.productdata.filter((item) => {
          return (
            item.productName
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 ||
            item.productAddress
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1
          )
        })
        this.setState({ filterData: newdata }, () => {
          this.props.setFileterData(newdata)
        })
      } else {
        const newdata = this.state.productdata.filter((item) => {
          return (
            (item.productName
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 ||
              item.productAddress
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1) &&
            item.star >= this.state.star
          )
        })
        this.setState({ filterData: newdata }, () => {
          this.props.setFileterData(newdata)
        })
      }
    } else {
      if (this.state.star == 0) {
        const newdata = this.state.productdata.filter((item) => {
          return (
            (item.productName
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 ||
              item.productAddress
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1) &&
            item.category == this.state.searchBtn1
          )
        })
        this.setState({ filterData: newdata }, () => {
          this.props.setFileterData(newdata)
        })
      } else {
        const newdata = this.state.productdata.filter((item) => {
          return (
            (item.productName
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 ||
              item.productAddress
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1) &&
            item.category == this.state.searchBtn1 &&
            item.star >= this.state.star
          )
        })
        this.setState({ filterData: newdata }, () => {
          this.props.setFileterData(newdata)
        })
      }
    }
  }

  //渲染畫面
  render() {
    let { cafeActive } = this.props

    return (
      <div className="mapList">
        <fieldset className="">
          <div className="px-4 p-3">
            <div class="box col-12">
              <div class="input-group">
                <input
                  className="form-control form-control-lg"
                  placeholder="尋找什麼活動嗎?  請輸入活動名稱或地址"
                  onChange={(event) => this.updateSearch(event)}
                  // value={this.state.search}
                  ref={(input) => (this.search = input)}
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
              <div className=" d-flex m-2 justify-content-between">
                <div className=" d-flex">
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
                      {/* <Dropdown.Item
                        href=""
                        className="btn3"
                        name="咖啡廳"
                        onClick={(event) => this.showCat(event)}
                      >
                        咖啡廳
                      </Dropdown.Item> */}
                    </Dropdown.Menu>
                  </Dropdown>

                  {/* <Dropdown onClick={() => this.setState({ display: true })}>
                  <Dropdown.Toggle
                    className="mapSearch  btn-small"
                    variant="success"
                    id="dropdown-basic"
                    // onClick={this.changeClickState}
                  >
                    {this.state.searchBtn2}
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    style={
                      this.state.display
                        ? { display: 'block' }
                        : { display: 'none' }
                    }
                  >
                    <input
                      type="date"
                      onChange={(event) => this.showDate(event)}
                    />
                  </Dropdown.Menu>
                </Dropdown> */}

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
                        name="0"
                        onClick={(event) => this.showStar(event)}
                      >
                        全部星等
                      </Dropdown.Item>
                      <Dropdown.Item
                        href=""
                        className="btn3"
                        name="5"
                        onClick={(event) => this.showStar(event)}
                      >
                        5分
                      </Dropdown.Item>
                      <Dropdown.Item
                        href=""
                        className="btn3"
                        name="4"
                        onClick={(event) => this.showStar(event)}
                      >
                        4分以上
                      </Dropdown.Item>
                      <Dropdown.Item
                        href=""
                        className="btn3"
                        name="3"
                        onClick={(event) => this.showStar(event)}
                      >
                        3分以上
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="d-flex cafeShow ">
                  <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                    <i className="mr-2 fas fa-coffee"></i>顯示咖啡廳{' '}
                  </p>
                  <SwitchButton
                    type="button"
                    cafeActiveReset={this.props.cafeActiveReset}
                    cafeActive={this.props.cafeActive}
                  />
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        <div className="px-4 mapListBox">
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
                    case 'priceAsc':
                      this.sortByPriceAsc()
                      break

                    case 'priceDsc':
                      this.sortByPriceDsc()
                      break
                  }
                }}
              >
                {/* <option value="" disabled selected style={{ display: 'none' }}>
                  商品排序方式
                </option> */}
                <option value="starAsc">星等由低到高</option>
                <option value="starDsc" selected>
                  星等由高到低
                </option>
                <option value="priceAsc">價格由低到高</option>
                <option value="priceDsc">價格由高到低</option>
              </select>
            </div>
          </div>
          <div className="dataBox overflow-auto px-1">
            <ul className="list-group ">
              {this.state.display
                ? ''
                : this.state.filterData.map((item, index, array) => {
                    return (
                      <Fade bottom>
                        <li
                          className="eventContentLi list-group-item"
                          data-category={item.productName}
                          key={index}
                          id={item.mapId}
                          onClick={() => this.productCardClick(item)}
                        >
                          <div className="eventContentBox d-flex">
                            <div className="eventImgBox col-4">
                              <img
                                src={
                                  'http://localhost:5000/images/product/' +
                                  item.productImg
                                }
                                alt=""
                              />
                            </div>
                            <div className="eventDetailBox col-8 pl-3">
                              <h5
                                className="eventTitle"
                                style={{ fontWeight: 'bold' }}
                              >
                                {item.productName}
                              </h5>
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
                                <li>{this.stars(item.star)}</li>
                                <li>
                                  <span className="mr-2">
                                    <FaRegCalendarCheck />
                                  </span>
                                  活動日期: 即日起 ~{' '}
                                  {item.productEndingDate.substring(0, 10)}
                                </li>
                                <li>
                                  <span className="mr-2">
                                    <FaMapMarkerAlt />
                                  </span>
                                  地點: {item.productAddress}
                                </li>
                                <li>
                                  <span className="mr-2">
                                    <RiMoneyCnyCircleLine />
                                  </span>
                                  價格：
                                  <span
                                    className={
                                      item.productPrice == 0 ? 'blue' : ''
                                    }
                                  >
                                    {item.productPrice == 0
                                      ? '免費'
                                      : `NT$ ${item.productPrice
                                          .toString()
                                          .replace(
                                            /(\d)(?=(\d{3})+(?:\.\d+)?$)/g,
                                            '$1,'
                                          )}`}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>
                      </Fade>
                    )
                  })}
              {/* {cafeActive ? (
                <>{this.filterList()}</>
              ) : (
                console.log('不顯示咖啡廳資訊')
              )} */}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default mapList
