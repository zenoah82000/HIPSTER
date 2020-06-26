import React, { useState, useEffect } from 'react'
import '../styles/home.scss'
import {
  FaSearch,
  FaStreetView,
  FaLongArrowAltRight,
  FaHeart,
  FaMapMarkerAlt,
  FaStar,
} from 'react-icons/fa'
import Slider from 'react-slick'

import activity from '../images/home/activity-test.jpg'

function Home(props) {
  //搜尋bar切換狀態 0=地點 1=分類 2=時間
  const [searchbar, setsearchbar] = useState(0)
  //商品區塊>關注
  const [heart, setHeart] = useState(false)

  const [ProductEndlist, setProductEndlist] = useState('')

  useEffect(() => {
    homeProductEndlist()
  }, [])
  console.log({ ...ProductEndlist[0] }.productId)
  //找出倒數結束5筆商品
  async function homeProductEndlist(item) {
    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request('http://localhost:5000/homeproductendlist/', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    // console.log('5筆商品', data.length)
    setProductEndlist(data)
  }

  //地點搜尋bar
  const location = (
    <div id="location-search" className="search-bar">
      <select id="city">
        <option>新北市</option>
        <option>臺北市</option>
        <option>基隆市</option>
        <option>連江縣</option>
        <option>宜蘭縣</option>
        <option>新竹市</option>
        <option>新竹縣</option>
        <option>桃園市</option>
        <option>苗栗縣</option>
        <option>臺中市</option>
        <option>彰化縣</option>
        <option>南投縣</option>
        <option>嘉義市</option>
        <option>嘉義縣</option>
        <option>雲林縣</option>
        <option>臺南市</option>
      </select>
      <select id="area">
        <option>請選擇</option>
        <option>中正區</option>
        <option>大同區</option>
        <option>中山區</option>
        <option>松山區</option>
        <option>大安區</option>
        <option>信義區</option>
        <option>士林區</option>
        <option>北投區</option>
        <option>內湖區</option>
        <option>南港區</option>
        <option>文山區</option>
      </select>
      <input
        type="text"
        id="location-bar"
        placeholder="請輸入活動地址...."
        className="form-control"
      />
      <div id="local-btn" className="search-btn btn btn-warning ">
        <FaSearch className="fonticon" />
        搜尋
      </div>
      <div id="location-btn" className="location-search-btn btn btn-danger">
        <FaStreetView className="fonticon" />
        定位搜尋
      </div>
    </div>
  )

  //分類搜尋bar
  const activename = (
    <div id="activename-search" className="search-bar">
      <select id="category1">
        <option>主分類</option>
      </select>
      <select id="category2">
        <option>次分類</option>
      </select>
      <input
        type="text"
        id="activename-bar"
        placeholder="請輸入活動名稱...."
        className="form-control"
      />
      <div id="active-btn" className="search-btn btn btn-warning ">
        <FaSearch className="fonticon" />
        搜尋
      </div>
    </div>
  )
  //時間搜尋bar
  const time = (
    <div id="time-search" className="search-bar">
      <div className="time-title">搜尋時間內活動：</div>
      <input type="date" id="time1" className="form-control" />
      <FaLongArrowAltRight className="fonticon" />
      <input type="date" id="time2" className="form-control" />
      <div id="active-btn" className="search-btn btn btn-warning ">
        <FaSearch className="fonticon" />
        搜尋
      </div>
    </div>
  )
  //搜尋bar顯示控制
  const searchbarDisplay = () => {
    if (searchbar == 0) {
      return location
    } else if (searchbar == 1) {
      return activename
    } else if (searchbar == 2) {
      return time
    }
  }
  //搜尋bar上方切換鈕控制
  const localbtnChangeClass = searchbar == 0 ? 'btn active' : 'btn'
  const activenamebtnChangeClass = searchbar == 1 ? 'btn active' : 'btn'
  const timebtnChangeClass = searchbar == 2 ? 'btn active' : 'btn'

  //商品區塊>關注
  const wishChangeClass = heart == true ? 'heart' : ''
  //輪播-精選
  var activitys = {
    arrows: true,
    dots: false,
    infinite: false,
    autoplay: false,
    slidesToShow: 3,
    slidesToScroll: 1,
  }

  //輪播-時限
  var countdowns = {
    arrows: true,
    dots: false,
    infinite: false,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 1,
  }

  // const display = ProductEndlist.map((item, index) => {
  //   return (
  //     <>
  //       <h1>{item.productName}</h1>
  //     </>
  //   )
  // })
  // console.log(display)

  return (
    <>
      <div className="banner">
        <div className="video">
          <video
            // src="http://localhost:5000/images/home/test.mp4"
            loop
            autoPlay
            muted
          ></video>
        </div>
        <div className="container">
          <div className="banner-title">
            <img src="http://localhost:5000/images/home/title.png" />
          </div>
          <div className="searchbar-chang-btn">
            <div className="btnList">
              <div
                id="location"
                className={localbtnChangeClass}
                onClick={() => {
                  setsearchbar(0)
                }}
              >
                地點搜尋
              </div>
              <div
                id="activename"
                className={activenamebtnChangeClass}
                onClick={() => {
                  setsearchbar(1)
                }}
              >
                活動名稱
              </div>
              <div
                id="time"
                className={timebtnChangeClass}
                onClick={() => {
                  setsearchbar(2)
                }}
              >
                活動時間
              </div>
            </div>
            {searchbarDisplay()}
          </div>
        </div>
      </div>

      <div className="home-about">
        <div className="container">
          <div className="title">
            <span className="line"></span>
            <span className="txt">關於我們</span>
            <span className="line"></span>
          </div>

          <p className="text-center">
            文青地圖致力於提供最優質的手作課程與展覽活動，透過我們所提供的快速搜尋服務，讓繁忙的
            <br />
            您活動安排變得更簡單、更即時，讓每趟行程充滿難忘的回憶。
          </p>

          <div className="about-main">
            <div className="about-main-cont">
              <div className="about-icon">
                <img src="http://localhost:5000/images/home/about-icon1.png"></img>
              </div>
              <div className="about-title">最優質的活動資訊</div>
              <p>發掘最棒的展覽資訊、手作課程與最難忘的活動體驗！</p>
            </div>
            <div className="about-main-cont">
              <div className="about-icon">
                <img src="http://localhost:5000/images/home/about-icon2.png"></img>
              </div>
              <div className="about-title">方便的地圖探索</div>
              <p>提供分類、定位搜尋，輕鬆顯示所有附近的活動資訊！</p>
            </div>
            <div className="about-main-cont">
              <div className="about-icon">
                <img src="http://localhost:5000/images/home/about-icon3.png"></img>
              </div>
              <div className="about-title">即時的評價訊息</div>
              <p>我們鼓勵所有參與過活動的朋友們留下最誠實的評價！</p>
            </div>
            <div className="about-main-cont">
              <div className="about-icon">
                <img src="http://localhost:5000/images/home/about-icon4.png"></img>
              </div>
              <div className="about-title">安全的購買系統</div>
              <p>加密付費及憑證，以安心的方式，預訂精彩的活動！</p>
            </div>
          </div>
        </div>
      </div>

      <div className="home-activity">
        <div className="container">
          <div className="title">
            <span className="line"></span>
            <span className="txt">精選活動</span>
            <span className="line"></span>
          </div>
          <div className="activity-main">
            <Slider {...activitys}>
              <a href="#">
                <div className="activity-main-cont">
                  <div className="activity-picture">
                    <div className="activity-follow">
                      <FaHeart
                        onClick={() => {
                          setHeart(!heart)
                        }}
                        className={wishChangeClass}
                      />
                    </div>
                    <img src={activity} />
                  </div>
                  <div className="activity-title">
                    <p>
                      【花蓮七星潭 GLAMPING 】踏浪星辰 Camp｜露營帳篷／露營車
                    </p>
                  </div>
                  <div className="activity-local">
                    <p>
                      <FaMapMarkerAlt />
                      台灣 宜蘭
                    </p>
                  </div>
                  <div className="home-activity-star">
                    <div className="start-group">
                      <FaStar className="star1" />
                      <FaStar className="star2" />
                      <FaStar className="star3" />
                      <FaStar className="star4" />
                      <FaStar className="star5" />
                    </div>
                  </div>
                </div>
              </a>

              <a href="#">
                <div className="activity-main-cont">
                  <div className="activity-picture">
                    <div className="activity-follow">
                      <FaHeart />
                    </div>
                    <img src={activity} />
                  </div>
                  <div className="activity-title">
                    <p>
                      【花蓮七星潭 GLAMPING 】踏浪星辰 Camp｜露營帳篷／露營車
                    </p>
                  </div>
                  <div className="activity-local">
                    <p>
                      <FaMapMarkerAlt />
                      台灣 宜蘭
                    </p>
                  </div>
                  <div className="home-activity-star">
                    <div className="start-group">
                      <FaStar className="star1" />
                      <FaStar className="star2" />
                      <FaStar className="star3" />
                      <FaStar className="star4" />
                      <FaStar className="star5" />
                    </div>
                  </div>
                </div>
              </a>

              <a href="#">
                <div className="activity-main-cont">
                  <div className="activity-picture">
                    <div className="activity-follow">
                      <FaHeart />
                    </div>
                    <img src={activity} />
                  </div>
                  <div className="activity-title">
                    <p>
                      【花蓮七星潭 GLAMPING 】踏浪星辰 Camp｜露營帳篷／露營車
                    </p>
                  </div>
                  <div className="activity-local">
                    <p>
                      <FaMapMarkerAlt />
                      台灣 宜蘭
                    </p>
                  </div>
                  <div className="home-activity-star">
                    <div className="start-group">
                      <FaStar className="star1" />
                      <FaStar className="star2" />
                      <FaStar className="star3" />
                      <FaStar className="star4" />
                      <FaStar className="star5" />
                    </div>
                  </div>
                </div>
              </a>
            </Slider>
          </div>

          <a href="#" className="more-activity-btn">
            查看更多活動
          </a>
        </div>
      </div>
      {/* ----------------------------------------------- */}
      <div className="home-slick-banner">
        <div className="black-bg">
          <div className="content">
            <p className="slick-banner-title">
              花蓮七星潭 GLAMPING 踏浪星辰 Camp｜露營帳篷／露營車
            </p>
            <p className="slick-banner-local">
              <FaMapMarkerAlt />
              台灣 宜蘭
            </p>
            <p className="slick-banner-text">
              立即訂購外國人喜歡的台灣伴手禮佳德鳳梨酥，直接寄送至全台灣住家和飯店！免排隊，立即線上購買，當日送達！輕鬆訂購現貨供應的伴手禮-鳳凰酥免排隊，立即線上購買，當日送達！輕鬆訂購現貨供應的伴手禮-鳳凰酥.....
            </p>
          </div>
        </div>
        <img src={activity} />
      </div>
      {/* ----------------------------------------------- */}
      <div className="home-countdown">
        <div className="container">
          <div className="title">
            <span className="line"></span>
            <span className="txt">即將結束</span>
            <span className="line"></span>
          </div>
          <div className="countdown-main">
            <Slider {...countdowns}>
              <a href="#">
                <p className="countdown-num">
                  <span className="large">12</span>時
                  <span className="large">01</span>分
                  <span className="large">30</span>秒
                </p>
                <div className="countdown-main-cont">
                  <div className="countdown-picture">
                    <div className="countdown-follow active">
                      <FaHeart />
                    </div>
                    <img src={activity} />
                  </div>
                  <div className="countdown-title">
                    <p>【花蓮七星潭 GLAMPING 】 ｜露營帳篷／露營車</p>
                  </div>
                  <div className="countdown-local">
                    <p>
                      <FaMapMarkerAlt />
                      台灣 宜蘭
                    </p>
                  </div>
                  <div className="home-countdown-price">
                    <p>$2500</p>
                  </div>
                </div>
              </a>

              <a href="#">
                <p className="countdown-num">
                  <span className="large">12</span>時
                  <span className="large">25</span>分
                  <span className="large">30</span>秒
                </p>
                <div className="countdown-main-cont">
                  <div className="countdown-picture">
                    <div className="countdown-follow">
                      <FaHeart />
                    </div>
                    <img src={activity} />
                  </div>
                  <div className="countdown-title">
                    <p>【花蓮七星潭 GLAMPING 】 ｜露營帳篷／露營車</p>
                  </div>
                  <div className="countdown-local">
                    <p>
                      <FaMapMarkerAlt />
                      台灣 宜蘭
                    </p>
                  </div>
                  <div className="home-countdown-price">
                    <p>$2500</p>
                  </div>
                </div>
              </a>

              <a href="#">
                <p className="countdown-num">
                  <span className="large">2</span>時
                  <span className="large">25</span>分
                  <span className="large">30</span>秒
                </p>
                <div className="countdown-main-cont">
                  <div className="countdown-picture">
                    <div className="countdown-follow">
                      <FaHeart />
                    </div>
                    <img src={activity} />
                  </div>
                  <div className="countdown-title">
                    <p>【花蓮七星潭 GLAMPING 】 ｜露營帳篷／露營車</p>
                  </div>
                  <div className="countdown-local">
                    <p>
                      <FaMapMarkerAlt />
                      台灣 宜蘭
                    </p>
                  </div>
                  <div className="home-countdown-price">
                    <p>$2500</p>
                  </div>
                </div>
              </a>

              <a href="#">
                <p className="countdown-num">
                  <span className="large">25</span>分
                  <span className="large">30</span>秒
                </p>
                <div className="countdown-main-cont">
                  <div className="countdown-picture">
                    <div className="countdown-follow">
                      <FaHeart />
                    </div>
                    <img src={activity} />
                  </div>
                  <div className="countdown-title">
                    <p>【花蓮七星潭 GLAMPING 】 ｜露營帳篷／露營車</p>
                  </div>
                  <div className="countdown-local">
                    <p>
                      <FaMapMarkerAlt />
                      台灣 宜蘭
                    </p>
                  </div>
                  <div className="home-countdown-price">
                    <p>$2500</p>
                  </div>
                </div>
              </a>

              <a href="#">
                <p className="countdown-num">
                  <span className="large">30</span>秒
                </p>
                <div className="countdown-main-cont">
                  <div className="countdown-picture">
                    <div className="countdown-follow">
                      <FaHeart />
                    </div>
                    <img src={activity} />
                  </div>
                  <div className="countdown-title">
                    <p>【花蓮七星潭 GLAMPING 】 ｜露營帳篷／露營車</p>
                  </div>
                  <div className="countdown-local">
                    <p>
                      <FaMapMarkerAlt />
                      台灣 宜蘭
                    </p>
                  </div>
                  <div className="home-countdown-price">
                    <p>$2500</p>
                  </div>
                </div>
              </a>
            </Slider>
          </div>

          <a href="#" className="more-countdown-btn">
            查看更多活動
          </a>
        </div>
      </div>
      {/* ----------------------------------------------- */}
      <div className="home-blog">
        <div className="container">
          <div className="title">
            <span className="line"></span>
            <span className="txt">精選文章</span>
            <span className="line"></span>
          </div>

          <div className="home-blog-content">
            <div className="blog-group">
              <div className="blog-image">
                <img src={activity} />
              </div>
              <div className="blog-content">
                <p className="blag-title">ICE MONSTER 永康冰館</p>
                <p className="blag-text">
                  我決定將其用於丁大豐的等待時間，因此我急忙照顧好它。付款完成後立即在商店前發送了憑證.....
                </p>
                <div className="blog-member">
                  <div className="blog-member-photo">
                    <img src={activity} />
                  </div>
                  <p className="blog-member-text">Relaxing Music Pro</p>
                </div>
              </div>
            </div>

            <div className="blog-group">
              <div className="blog-image">
                <img src={activity} />
              </div>
              <div className="blog-content">
                <p className="blag-title">ICE MONSTER 永康冰館</p>
                <p className="blag-text">
                  我決定將其用於丁大豐的等待時間，因此我急忙照顧好它。付款完成後立即在商店前發送了憑證.....
                </p>
                <div className="blog-member">
                  <div className="blog-member-photo">
                    <img src={activity} />
                  </div>
                  <p className="blog-member-text">Relaxing Music Pro</p>
                </div>
              </div>
            </div>

            <div className="blog-group">
              <div className="blog-image">
                <img src={activity} />
              </div>
              <div className="blog-content">
                <p className="blag-title">ICE MONSTER 永康冰館</p>
                <p className="blag-text">
                  我決定將其用於丁大豐的等待時間，因此我急忙照顧好它。付款完成後立即在商店前發送了憑證.....
                </p>
                <div className="blog-member">
                  <div className="blog-member-photo">
                    <img src={activity} />
                  </div>
                  <p className="blog-member-text">Relaxing Music Pro</p>
                </div>
              </div>
            </div>

            <div className="blog-group">
              <div className="blog-image">
                <img src={activity} />
              </div>
              <div className="blog-content">
                <p className="blag-title">ICE MONSTER 永康冰館</p>
                <p className="blag-text">
                  我決定將其用於丁大豐的等待時間，因此我急忙照顧好它。付款完成後立即在商店前發送了憑證.....
                </p>
                <div className="blog-member">
                  <div className="blog-member-photo">
                    <img src={activity} />
                  </div>
                  <p className="blog-member-text">Relaxing Music Pro</p>
                </div>
              </div>
            </div>

            <div className="blog-group">
              <div className="blog-image">
                <img src={activity} />
              </div>
              <div className="blog-content">
                <p className="blag-title">ICE MONSTER 永康冰館</p>
                <p className="blag-text">
                  我決定將其用於丁大豐的等待時間，因此我急忙照顧好它。付款完成後立即在商店前發送了憑證.....
                </p>
                <div className="blog-member">
                  <div className="blog-member-photo">
                    <img src={activity} />
                  </div>
                  <p className="blog-member-text">Relaxing Music Pro</p>
                </div>
              </div>
            </div>

            <div className="blog-group">
              <div className="blog-image">
                <img src={activity} />
              </div>
              <div className="blog-content">
                <p className="blag-title">ICE MONSTER 永康冰館</p>
                <p className="blag-text">
                  我決定將其用於丁大豐的等待時間，因此我急忙照顧好它。付款完成後立即在商店前發送了憑證.....
                </p>
                <div className="blog-member">
                  <div className="blog-member-photo">
                    <img src={activity} />
                  </div>
                  <p className="blog-member-text">Relaxing Music Pro</p>
                </div>
              </div>
            </div>
          </div>

          <a href="#" className="more-blog-btn">
            查看更多文章
          </a>
        </div>
      </div>
    </>
  )
}

export default Home
