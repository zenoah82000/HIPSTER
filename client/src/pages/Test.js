import React from 'react'

// import '../../styles/sidebar.scss'

function Test() {
  let isLoggedIn = true
  return <>{isLoggedIn ? <h1>123</h1> : <h1>456</h1>}</>
}

export default Test
