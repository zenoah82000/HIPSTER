import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../styles/about.scss'
import $ from 'jquery'

//引入自訂元件
// import CommentList from '../components/comments/commentList'

function About(props) {
  //撈取網址id
  const paramstring = props.location.search
  const searchparams = new URLSearchParams(paramstring)
  let page = searchparams.get('page') //about/?page=?
  if (page == null || page < 1) {
    //判斷為空或小於1時
    page = 1
  }

  const [savedata, setsavedata] = useState('') //存放全部資料

  async function linktest(item) {
    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request('http://localhost:5000/linktest', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    setsavedata(data)
  }

  let numPerPage = 8 //每頁幾筆
  let first = (page - 1) * numPerPage //每頁第一筆
  let end = page * numPerPage //每頁最後一筆

  let newdata = Array.from(savedata) //建立新陣列
  let selectdata = newdata.slice(first, end) //每頁要顯示的資料
  const dataview = selectdata.map((item, index) => {
    return (
      <tr>
        <td>{item.StationName}</td>
        <td>{item.District}</td>
        <td>{item.Address}</td>
        <td>{item.Capacity}</td>
      </tr>
    )
  })

  //取得總筆數
  let total = newdata.length //73筆

  //總頁數
  let totalPages = Math.ceil(total / numPerPage)
  if (page > totalPages) {
    page = totalPages
  } //新增判斷不可大於總頁數

  //================下方分頁按鈕=============================

  var maxPageCount = 6 //下方數字鈕一次顯示?筆
  var buffCount = 3 //判斷第幾頁後開始往後延伸

  var startPage = 1 //下方數字鈕第一筆
  var endPage = maxPageCount - 1 //預設最後一個數字鈕

  //根據當前頁面判斷下方數字鈕第一個和最後一個=?
  if (page == 1) {
    startPage = parseInt(page)
    endPage = maxPageCount
  } else if (page > 1 && page < parseInt(totalPages - maxPageCount) + 1) {
    startPage = parseInt(page) - 1
    endPage = parseInt(startPage + maxPageCount) - 1
  } else {
    startPage = parseInt(totalPages - maxPageCount + 1)
    endPage = parseInt(totalPages)
  }

  console.log(totalPages)
  console.log(startPage)
  console.log(endPage)

  var firstButton = '' //放置分頁按鈕(最前&上一頁)資料
  var endButton = '' //放置分頁按鈕(最後&下一頁)資料

  if (page > 1) {
    firstButton = (
      <>
        <li className="page-item ">
          <Link className="page-link" to="./?page=1" tabindex="-1">
            最前頁
          </Link>
        </li>
        <li className="page-item ">
          <Link
            className="page-link"
            to={`./?page=${parseInt(page) - 1}`}
            tabindex="-1"
          >
            上一頁
          </Link>
        </li>
      </>
    )
  } else {
    firstButton = (
      <>
        <li className="page-item disabled">
          <Link className="page-link" to="#" tabindex="-1">
            最前頁
          </Link>
        </li>

        <li className="page-item disabled">
          <Link className="page-link" to="#" tabindex="-1">
            上一頁
          </Link>
        </li>
      </>
    )
  }
  if (page == totalPages) {
    endButton = (
      <>
        <li className="page-item disabled">
          <Link className="page-link" to="#" tabindex="-1">
            下一頁
          </Link>
        </li>

        <li className="page-item disabled">
          <Link className="page-link" to="#" tabindex="-1">
            最後頁
          </Link>
        </li>
      </>
    )
  } else {
    endButton = (
      <>
        <li className="page-item">
          <Link
            className="page-link"
            to={`./?page=${parseInt(page) + 1}`}
            tabindex="-1"
          >
            下一頁
          </Link>
        </li>
        <li className="page-item">
          <Link
            className="page-link"
            to={`./?page=${totalPages}`}
            tabindex="-1"
          >
            最後頁
          </Link>
        </li>
      </>
    )
  }

  //放置數字分頁按鈕
  let numButton = []
  let numcontent = ''

  for (let i = startPage; i <= endPage; i++) {
    if (page == i) {
      numcontent = (
        <>
          <li class="page-item active" aria-current="page">
            <Link class="page-link" to={`./?page=${i}`}>
              {i}
            </Link>
          </li>
        </>
      )
    } else {
      numcontent = (
        <li class="page-item " aria-current="page">
          <Link class="page-link" to={`./?page=${i}`}>
            {i}
          </Link>
        </li>
      )
    }

    numButton.push(numcontent)
  }
  console.log(numButton)

  useEffect(() => {
    linktest()
  }, [])

  return (
    <>
      <div className="container">
        <div className="title">
          <h1>資料串接分頁展示</h1>
          <a
            href="http://tbike-data.tainan.gov.tw/Service/StationStatus/Json"
            target="_blank"
          >
            JSON API資料來源：T-Bike 臺南市公共自行車租賃站資訊
          </a>
        </div>

        <table className="table table-striped">
          <thead>
            <tr className="table-info">
              <th className="name1">站名</th>
              <th className="name2">行政區</th>
              <th className="name3">地址</th>
              <th>格位數</th>
            </tr>
          </thead>
          <tbody id="tablebody" className="tablebody">
            {dataview}
          </tbody>
        </table>

        <nav aria-label="..." className="selectpage">
          <ul className="pagination" id="pagination">
            {firstButton}
            {numButton}
            {endButton}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default withRouter(About)
