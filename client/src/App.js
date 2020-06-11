import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Mynavbar from './compoments/Mynavbar'
// import Myfooter from './compoments/Myfooter'
// import Nopage from './pages/Nopage'

import Home from './pages/Home'
import About from './pages/About'
import Article from './pages/Article'
import Contact from './pages/Contact'
import Product from './pages/Product'


import './App.css';

function App() {
  return (
    <Router>
      <>
        <Mynavbar />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
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


          </Switch>
        {/* <Myfooter /> */}
      </>
    </Router>
  )
}

export default App;
