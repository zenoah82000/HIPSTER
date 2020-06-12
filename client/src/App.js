import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Mynavbar from './components/Mynavbar'
import Myfooter from './components/Myfooter'
import MainContent from './components/MainContent'
// import Nopage from './pages/Nopage'

import Home from './pages/Home'
import About from './pages/About'
import Article from './pages/Article' 
import Test from './pages/Test' 
import Contact from './pages/Contact'
import Product from './pages/Product'
import Map from './pages/Map'
import ShoppingCar from './pages/order/ShoppingCar'

function App() {
  return (
    <Router>
      <>
        <Mynavbar />

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/article">
            <Article />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="/Contact">
            <Contact />
          </Route>
          <Route path="/product">
            <Product />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/shoppingcar">
            <ShoppingCar />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
        </Switch>

        <Myfooter />
      </>
    </Router>
  )
}

export default App
