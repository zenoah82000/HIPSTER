import React, { useState, useEffect } from 'react'
import Fade from 'react-reveal/Fade';
import '../../styles/order.scss'
import MyOrder from '../../components/order/MyOder'

function UserOrder() {

  //訂單資料
  const [orderlist, setOrderlist] = useState([])
  //訂單顯示狀態
  const [loading, setLoading] = useState(false)
  //目前頁數
  const [currentPage, setCurrentPage] = useState(1)
  //每頁的資料
  const [datapage, setDatapage] = useState([])
  //讀取會員資料
  const member =JSON.parse(localStorage.getItem('member'))
 

  const getOrderlistAsync = async () => {
    const request = new Request(`http://localhost:5000/member/order/${member.id}`, {
      method: 'get',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    setOrderlist(data)
  }
  useEffect(() => {
    getOrderlistAsync()
  }, [])

  //點擊頁數重新取得資料
  useEffect(() => {
    getdatapage()
  }, [currentPage])

  // 渲染後載入商品
  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      if (orderlist.status) {
        setLoading(false)
        getdatapage()
      }
    }, 500)
  }, [orderlist])

  
  //把資料分頁
  const getdatapage = () => {
    let perPage = orderlist.perPage
    let page = currentPage
    if (orderlist.order) {
      const newdata = orderlist.order.slice(
        (page - 1) * perPage,
        page * perPage
      )
      setDatapage(newdata)
    }
  }
  //頁碼
  const creatpage = () => {
    let pages = []
    for (let i = 1; i <= orderlist.totalPages; i++) {
      pages.push(
        <li
          onClick={() => {
            setCurrentPage(i)
          }}
          key={i}
          className={currentPage == i ? 'active' : ''}
        >
          {i}
        </li>
      )
    }
    return pages
  }
  
  const display = orderlist.order ? (
    <div className="orderlistbox ">
      <div className="row">
        {datapage.map((item) => {
          return (
            <>
            <Fade bottom>
              <MyOrder orderlist={orderlist} item={item}/>
              </Fade>
            </>
          )
        })}
      </div>
      <ul className="orderpage ">{creatpage()}</ul>
    </div>
  ) : (
    <div className="empty text-center">
      <img
        className="emptyImg mb-3"
        src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
      />
      <p>暫時未有活動處理預訂記錄</p>
      <p>探索精彩活動並體驗輕鬆的網上預訂流程</p>
    </div>
  )
  return (
    <>
      
      <div className="usercontainer">
        <h2 className="usertitle">我的訂單</h2>
        {loading ? <h2>載入中</h2> : display}
      </div>
    </>
  )
}

export default UserOrder
