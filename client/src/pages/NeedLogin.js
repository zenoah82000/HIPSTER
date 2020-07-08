import React from 'react'
import '../styles/notfoundpage.scss'
function NeedLogin() {
  return (
    <>
      <main className="notfoundmain">
        <div class="notfoundloading needlogin">請先登入</div>

        <div class="not-found wave">You Need to Lgoin to Browse This Page</div>
      </main>
    </>
  )
}

export default NeedLogin
