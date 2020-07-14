import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../styles/home.scss'
import Fade from 'react-reveal/Fade'
import $ from 'jquery'
import CountdownProduct from '../components/home/CountdownProduct'
import FeaturedProduct from '../components/home/FeaturedProduct'
import About from '../components/home/About'
import Articles from '../components/home/Articles'
import Searchbar from '../components/home/Searchbar'

import { FaMapMarkerAlt } from 'react-icons/fa'
import Slider from 'react-slick'

function Home(props) {
  //存放倒數結束5筆商品資料
  const [ProductEndlist, setProductEndlist] = useState('')

  //存放精選3筆商品資料
  const [ProductFeaturedlist, setProductFeaturedlist] = useState('')
  //存放6筆最新文章資料
  const [articleslist, setarticleslist] = useState('')
  //存放中間輪播banner資料
  const [slickBannerData, setslickBannerData] = useState('')
  //存放中間輪播banner-多圖資料
  const [slickBannerImgData, setslickBannerImgData] = useState('')

  //找出精選3筆商品
  async function homeProductFeaturedlist(item) {
    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request(
      'http://localhost:5000/homeproductfeaturedlist/',
      {
        method: 'POST',
        body: JSON.stringify(item),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    const response = await fetch(request)
    const data = await response.json()
    // console.log('3筆商品', data)
    setProductFeaturedlist(data)
  }

  //找出中間banner商品資料
  async function homeslickBannerData(item) {
    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request('http://localhost:5000/homeslickbannerdata/', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    // console.log('1筆商品', data)
    setslickBannerData(data)
  }
  //找出中間banner商品(多圖)資料
  async function homeslickBannerImgData(item) {
    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request(
      'http://localhost:5000/homeslickbannerimgdata/',
      {
        method: 'POST',
        body: JSON.stringify(item),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    const response = await fetch(request)
    const data = await response.json()
    // console.log('4張圖片', data)
    setslickBannerImgData(data)
  }

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

  //找出6筆最新文章
  async function homeArticleslist(item) {
    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request('http://localhost:5000/homearticleslist/', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    // console.log('6筆文章', data)
    setarticleslist(data)
  }

  //輪播-精選
  var activitys = {
    arrows: false,
    dots: false,
    infinite: false,
    autoplay: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 599,
        settings: {
          arrows: false,
          dots: true,
          infinite: true,
          autoplay: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  //輪播-大banner
  var banner = {
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 2000,
    fade: true,
    cssEase: 'linear',
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 599,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          autoplay: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 2000,
          fade: true,
          cssEase: 'linear',
          autoplaySpeed: 5000,
        },
      },
    ],
  }

  //輪播-時限
  var countdowns = {
    arrows: true,
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 599,
        settings: {
          arrows: false,
          dots: true,
          infinite: true,
          autoplay: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 5000,
        },
      },
    ],
  }

  //精選3筆商品顯示
  let ProductFeatured = Array.from(ProductFeaturedlist)
  const ProductFeatureddisplay = ProductFeatured.map((item, index) => {
    return (
      <>
        <FeaturedProduct
          item={item}
          addWishlistCheck={props.addWishlistCheck}
        />
      </>
    )
  })

  //中間banner商品多圖顯示
  let slickBannerImg = Array.from(slickBannerImgData)
  const slickBannerImgdisplay = slickBannerImg.map((item, index) => {
    return (
      <>
        <img
          className="slick-banner-img"
          src={`http://localhost:5000/images/multiImages/${item.productImgs}`}
        />
      </>
    )
  })
  //中間banner商品顯示
  let slickBanner = Array.from(slickBannerData)
  const slickBannerdisplay = slickBanner.map((item, index) => {
    return (
      <>
        <a href={`/product/${item.productId}`} className="home-slick-banner">
          <Fade right>
            <div className="black-bg">
              <div className="content">
                <p className="slick-banner-title">{item.productName}</p>
                <p className="slick-banner-local">
                  <FaMapMarkerAlt />
                  {item.productAddress}
                </p>
                <p className="slick-banner-text">{item.productContent}</p>
              </div>
            </div>
          </Fade>
          <Fade>
            <Slider {...banner}>{slickBannerImgdisplay}</Slider>
          </Fade>
        </a>
      </>
    )
  })

  //倒數結束5筆商品顯示
  let ProductEnd = Array.from(ProductEndlist)
  const ProductEnddisplay = ProductEnd.map((item, index) => {
    return (
      <>
        <CountdownProduct
          item={item}
          addWishlistCheck={props.addWishlistCheck}
        />
      </>
    )
  })

  //最新6筆最新文章顯示
  let articles = Array.from(articleslist)
  const Articlesdisplay = articles.map((item, index) => {
    return (
      <>
        <Articles item={item} />
      </>
    )
  })

  //置頂按鈕
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#back-to-top').fadeIn()
    } else {
      $('#back-to-top').fadeOut()
    }
  })
  // scroll body to 0px on click
  $('#back-to-top').click(function () {
    $('body,html').animate(
      {
        scrollTop: 0,
      },
      400
    )
    return false
  })

  //網頁載入時執行
  useEffect(() => {
    homeProductEndlist() //倒數活動
    homeslickBannerData() //banner
    homeslickBannerImgData() //banner多圖
    homeProductFeaturedlist() //精選活動
    homeArticleslist() //精選文章
    setInterval(() => {}, 1000)
  }, [])

  return (
    <>
      <div className="banner">
        <div className="video">
          <video
            src="http://localhost:5000/images/home/test.mp4"
            loop
            autoPlay
            muted
          ></video>
        </div>
        <div className="container">
          <div className="banner-title">
            <img src="http://localhost:5000/images/home/title.png" />
          </div>

          <Searchbar />
        </div>
      </div>

      {/* 關於我們 */}
      <About />

      <div className="home-activity">
        <div className="container">
          <Fade top>
            <div className="title">
              <span className="line"></span>
              <span className="txt">精選活動</span>
              <span className="line"></span>
            </div>
          </Fade>
          <Fade bottom>
            <div className="activity-main">
              <Slider {...activitys}>{ProductFeatureddisplay}</Slider>
            </div>
          </Fade>
          <Fade>
            <a href="/productlist?sort=comdesc" className="more-activity-btn">
              查看更多活動
            </a>
          </Fade>
        </div>
      </div>
      {/* ----------------------slick-banner------------------------- */}
      {slickBannerdisplay}
      {/* ----------------------------------------------------------- */}
      <div className="home-countdown">
        <div className="container">
          <Fade top>
            <div className="title">
              <span className="line"></span>
              <span className="txt">即將結束</span>
              <span className="line"></span>
            </div>
          </Fade>
          <Fade bottom>
            <div className="countdown-main">
              <Slider {...countdowns}>{ProductEnddisplay}</Slider>
            </div>
          </Fade>
          <a href="/productlist?sort=prec" className="more-countdown-btn">
            查看更多活動
          </a>
        </div>
      </div>
      {/* ----------------------------------------------- */}

      <div className="home-blog">
        <div className="container">
          <Fade top>
            <div className="title">
              <span className="line"></span>
              <span className="txt">精選文章</span>
              <span className="line"></span>
            </div>
          </Fade>
          <Fade>
            <div className="home-blog-content">{Articlesdisplay}</div>
          </Fade>
          <Fade>
            <a href="/blog" className="more-blog-btn">
              查看更多文章
            </a>
          </Fade>
        </div>
      </div>
      <a
        id="back-to-top"
        href="#"
        className="btn  btn-lg back-to-top"
        role="button"
      >
        <i className="fas fa-chevron-up"></i>
      </a>
    </>
  )
}

export default withRouter(Home)
