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

import Test from './pages/Test'
import Contact from './pages/Contact'
import ProductList from './pages/ProductList'
import Product from './pages/Product'
import Map from './pages/Map'

import ShoppingCar from './pages/order/ShoppingCar'

import PaymentDetail from './pages/payment/paymentDetail'
import PaymentFinish from './pages/payment/paymentFinish'
import PaymentType from './pages/payment/paymentType'

//member
import MemberUser from './pages/members/MemberUser'

//blog
import Blog from './pages/blog/Blog'
import BlogEdit from './pages/blog/BlogEdit'
import BlogContent from './pages/blog/BlogContent'
import BlogAdd from './pages/blog/BlogAdd'

import Swal from 'sweetalert2'

function App(props) {
  // console.log(props)

  //判斷使用者是否已登入
  const [userSuccess, setuserSuccess] = useState(false)
  const userlocalStorage = JSON.parse(localStorage.getItem('member')) || []

  // console.log(userSuccess)

  const { mycart } = props
  //取得購物車資料
  const localCart = JSON.parse(localStorage.getItem('cart')) || []

  //寫入購物車資料
  useEffect(() => {
    userlocalStorage.success ? setuserSuccess(true) : setuserSuccess(false)
    props.dispatch({ type: 'GET_CART', value: localCart })
  }, [])

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
        const newCart = mycart.filter((item) => item.id != id)
        props.dispatch({ type: 'GET_CART', value: newCart })
        localStorage.setItem('cart', JSON.stringify(newCart))
      }
    })
  }
  //購物車金額加總
  const sum = (items) => {
    let total = 0
    if (items != null) {
      for (let i = 0; i < items.length; i++) {
        total += items[i].amount * items[i].price
      }
    }
    return total
  }

  return (
    <Router>
      <>
        <Mynavbar
          deleteCart={deleteCart}
          userSuccess={userSuccess}
          setuserSuccess={setuserSuccess}
        />

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          {/* Blog Routes */}
          <Route path="/blogEdit">
            <BlogEdit />
          </Route>
          <Route path="/blogContent">
            <BlogContent />
          </Route>
          <Route path="/blog">
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
          <Route path="/productlist">
            <ProductList />
          </Route>
          <Route path="/product">
            <Product />
          </Route>
          <Route path="/shoppingcar">
            <ShoppingCar deleteCart={deleteCart} sum={sum} />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/paymentDetail">
            <PaymentDetail sum={sum} />
          </Route>
          <Route path="/paymentFinish">
            <PaymentFinish />
          </Route>
          <Route path="/paymentType">
            <PaymentType sum={sum} />
          </Route>
          <Route path="/memberuser">
            <MemberUser />
          </Route>
          <Route exact path="/">
            <Home />
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
  }
}
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(App)
