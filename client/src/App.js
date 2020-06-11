import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
// import Mynavbar from './compoments/Mynavbar'
// import Myfooter from './compoments/Myfooter'
// import Nopage from './pages/Nopage'

// import Home from './pages/Home'


import './App.css';

function App() {
  return (
    <Router>
      <>
        {/* <Mynavbar auth={auth} name={name} setauth={setauth} /> */}


          <Switch>
            {/* <Route exact path="/">
              <Home />
            </Route> */}


          </Switch>
        {/* <Myfooter /> */}
      </>
    </Router>
  )
}

export default App;
