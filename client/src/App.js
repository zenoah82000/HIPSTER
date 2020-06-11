import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Mynavbar from './components/Mynavbar'
import Myfooter from './components/Myfooter'
import MainContent from './components/MainContent'
// import Nopage from './pages/Nopage'

import Home from './pages/Home'
import About from './pages/About'
import Article from './pages/Article'
import Contact from './pages/Contact'
import Product from './pages/Product'
import ShoppingCar from './pages/ShoppingCar'




function App() {
  return (
    <Router>
      <>
        <Mynavbar />
        
          <Switch>

            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/article">
              <Article />
            </Route>
            <Route exact path="/Contact">
              <Contact />
            </Route>
            <Route exact path="/product">
              <Product />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/shoppingcar">
              <ShoppingCar />
            </Route>

          </Switch>
          
        <Myfooter />
      </>
    </Router>
  )
}

export default App;
