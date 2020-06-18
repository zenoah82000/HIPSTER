import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Mynavbar from './components/Mynavbar'
import Myfooter from './components/Myfooter'
import MainContent from './components/MainContent'
import NotFoundPage from './pages/NotFoundPage'

import Home from './pages/Home'
import About from './pages/About'

import Test from './pages/Test'
import Contact from './pages/Contact'
import ProductList from './pages/ProductList'
import Map from './pages/Map'

import ShoppingCar from './pages/order/ShoppingCar'
import CheckOut from './pages/order/CheckOut'

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

function App() {
  return (
    <Router>
      <>
        <Mynavbar />

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
          <Route path="/shoppingcar">
            <ShoppingCar />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/checkout">
            <CheckOut />
          </Route>
          <Route path="/paymentDetail">
            <PaymentDetail />
          </Route>
          <Route path="/paymentFinish">
            <PaymentFinish />
          </Route>
          <Route path="/paymentType">
            <PaymentType />
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

export default App
