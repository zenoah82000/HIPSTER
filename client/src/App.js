import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//取得購物車資料
import { getCartDataAsync, getCartData } from './actions/order/order_Actions'

import Mynavbar from './components/Mynavbar'
import Myfooter from './components/Myfooter'
import MainContent from './components/MainContent'
import NotFoundPage from './pages/NotFoundPage'

import Home from './pages/Home'
import About from './pages/About'
import Forgetpwd from './pages/Forgetpwd'

import Test from './pages/Test'
import Contact from './pages/Contact'
import ProductList from './pages/ProductList'
import Product from './pages/Product'
import MapPage from './pages/MapPage'

import ShoppingCar from './pages/order/ShoppingCar'

import PaymentDetail from './pages/payment/paymentDetail'
import PaymentFinish from './pages/payment/paymentFinish'
import PaymentType from './pages/payment/paymentType'

//member
import MemberUser from './pages/members/MemberUser'

//blog
import Blog from './pages/blog/Blog'
import BlogEdit from './pages/blog/BlogEdit'
import BlogDetail from './pages/blog/BlogDetail'
import BlogAdd from './pages/blog/BlogAdd'

import Swal from 'sweetalert2'

//coupon
import AllCoupon from './pages/coupon/AllCoupon'

//保護路由
import ProtectedRoute from './utils/ProtectedRoute'

function App(props) {
  //判斷使用者是否已登入
  const [userSuccess, setuserSuccess] = useState(false)
  const userlocalStorage = JSON.parse(localStorage.getItem('member')) || []
  const username = userlocalStorage.name

  const { mycart, wishlist } = props
  //取得購物車資料
  const localCart = JSON.parse(localStorage.getItem('cart')) || []

  //取得願望清單
  const getwishAsync = async () => {
    const request = new Request(
      `http://localhost:5000/member/wishlist/${userlocalStorage.id}`,
      {
        method: 'get',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    const response = await fetch(request)
    const data = await response.json()
    props.dispatch({ type: 'GET_WISH', value: data })
  }
  // 加入願望清單(資料庫)
  const addWishlistAsync = async (productId) => {
    const request = new Request(
      `http://localhost:5000/member/wishlistAdd/${userlocalStorage.id}`,
      {
        method: 'post',
        body: JSON.stringify({ productId }),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    const response = await fetch(request)
    const data = await response.json()
  }
  //加入願望清單
  const addwishlist = (value) => {
    console.log(value)
    const index = wishlist.findIndex(
      (item) => item.productId === value.productId
    )
    if (index == -1) {
      const newWishlist = [...wishlist]
      newWishlist.push(value)
      props.dispatch({ type: 'GET_WISH', value: newWishlist })
      addWishlistAsync(value.productId)
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '已加入願望清單',
        showConfirmButton: false,
        timer: 800,
      })
    }
  }
  //刪除願望清單(資料庫)
  const delwishlistAsync = async (productId) => {
    const request = new Request(
      `http://localhost:5000/member/wishlistDel/${userlocalStorage.id}`,
      {
        method: 'delete',
        body: JSON.stringify({ productId }),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    const response = await fetch(request)
    const data = await response.json()
  }

  //刪除願望清單
  const deletewishlist = (value) => {
    const index = wishlist.findIndex(
      (item) => item.productId === value.productId
    )
    if (index !== -1) {
      const localWishlist = [...wishlist]
      localWishlist.splice(index, 1)
      props.dispatch({ type: 'GET_WISH', value: localWishlist })
      delwishlistAsync(value.productId)
    }
  }
  //寫入購物車資料
  useEffect(() => {
    getLocation()
    userlocalStorage.success ? setuserSuccess(true) : setuserSuccess(false)
    props.dispatch({ type: 'GET_CART', value: localCart })
    getwishAsync()
  }, [])
  //加入購物車
  const addCart = (value) => {
    const index = mycart.findIndex((item) => item.productId == value.productId)
    if (index == -1) {
      const newCart = [...mycart]
      newCart.push(value)
      props.dispatch({ type: 'GET_CART', value: newCart })
      localStorage.setItem('cart', JSON.stringify(newCart))
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '加入成功',
        showConfirmButton: false,
        timer: 800,
      })
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '商品已在購物車',
        showConfirmButton: false,
        timer: 800,
      })
    }
  }
  //刪除購物車
  const deleteCart = (id) => {
    Swal.fire({
      text: '是否刪除該商品?',
      icon: 'warning',
      confirmButtonText: '確定',
      showCancelButton: true,
      cancelButtonText: '取消',
    }).then((result) => {
      if (result.value) {
        const index = mycart.findIndex((item) => item.productId == id)
        if (index != -1) {
          const newCart = [...mycart]
          newCart.splice(index, 1)
          props.dispatch({ type: 'GET_CART', value: newCart })
          localStorage.setItem('cart', JSON.stringify(newCart))
        }
      }
    })
  }
  //購物車金額加總
  const sum = (items) => {
    let total = 0
    if (items != null) {
      for (let i = 0; i < items.length; i++) {
        total += items[i].amount * items[i].productPrice
      }
    }
    return total
  }

  //地圖定位
  const [viewport, setViewport] = useState({
    center: [25.0403394, 121.5309546],
    zoom: 15,
  })
  const [clickData, setClickData] = useState([])
  const [myLocation, setMylocation] = useState([0, 0])

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateLocation)
    }
  }
  const updateLocation = (position) => {
    setViewport({
      center: [position.coords.latitude, position.coords.longitude],
    })
    setMylocation([position.coords.latitude, position.coords.longitude])
  }

  const cardClickReset = (clickData) => {
    // console.log(clickData)
    setClickData(clickData)
    setViewport({ center: [clickData.lat, clickData.log], zoom: 15 })
  }

  const SearchReset = (searching) => {
    console.log(searching)
    if (searching == '台北市中山區' || searching == '中山')
      setViewport({ center: [25.0685406, 121.5280918], zoom: 15 })
    if (searching == '台北市萬華區' || searching == '萬華')
      setViewport({ center: [25.046325, 121.507721], zoom: 15 })
    if (searching == '台北市信義區' || searching == '信義')
      setViewport({ center: [25.030861, 121.5662571], zoom: 15 })
    if (searching == '台北市中正區' || searching == '中正')
      setViewport({ center: [25.0293387, 121.503073], zoom: 15 })
    if (searching == '台北市大安區' || searching == '大安')
      setViewport({ center: [25.0263453, 121.5263364], zoom: 15 })
    if (searching == '中西區' || searching == '台南市中西區')
      setViewport({ center: [22.9987639, 120.1920953], zoom: 15 })
    if (searching == '台南')
      setViewport({ center: [23.0229948, 120.2313002], zoom: 12 })
    if (searching == '台北')
      setViewport({ center: [25.0174719, 121.56623], zoom: 12 })
  }

  return (
    <Router>
      <>
        <Mynavbar
          deleteCart={deleteCart}
          userSuccess={userSuccess}
          setuserSuccess={setuserSuccess}
          username={username}
        />

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          {/* Blog Routes */}
          <Route path="/blogEdit/:articleId?">
            <BlogEdit />
          </Route>
          <Route path="/blogDetail/:articleId?">
            <BlogDetail />
          </Route>
          <Route path="/blog/:categoryId?">
            <Blog />
          </Route>
          <Route path="/blogAdd">
            <BlogAdd />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="/Contact">
            <Contact />
          </Route>
          <Route path="/productlist/">
            <ProductList />
          </Route>
          <Route path="/product/:id">
            <Product
              addCart={addCart}
              addwishlist={addwishlist}
              deletewishlist={deletewishlist}
            />
          </Route>
          <Route path="/shoppingcar">
            <ShoppingCar
              deleteCart={deleteCart}
              sum={sum}
              userSuccess={userSuccess}
            />
          </Route>
          <Route path="/map">
            <MapPage
              viewport={viewport}
              getLocation={getLocation}
              cardClickReset={cardClickReset}
              myLocation={myLocation}
              setViewport={setViewport}
              SearchReset={SearchReset}
            />
          </Route>

          <Route path="/memberuser">
            <MemberUser addCart={addCart} />
          </Route>
          {/* 保護路由 */}
          <ProtectedRoute path="/paymentDetail">
            <PaymentDetail sum={sum} userSuccess={userSuccess} />
          </ProtectedRoute>
          <ProtectedRoute path="/paymentFinish">
            <PaymentFinish userSuccess={userSuccess} />
          </ProtectedRoute>
          <ProtectedRoute path="/paymentType">
            <PaymentType sum={sum} userSuccess={userSuccess} />
          </ProtectedRoute>
          <Route path="/forgetpwd/:memberId?">
            <Forgetpwd />
          </Route>
          <Route path="/allcoupon">
            <AllCoupon />
          </Route>
          <Route exact path="/">
            <Home addwishlist={addwishlist} deletewishlist={deletewishlist} />
          </Route>

          <Route exact path="*">
            <NotFoundPage />
          </Route>
        </Switch>

        <Myfooter />
      </>
    </Router>
  )
}
const mapStateToProps = (store) => {
  return {
    mycart: store.orderReducer.cartData,
    wishlist: store.orderReducer.wishData,
  }
}
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(App)
