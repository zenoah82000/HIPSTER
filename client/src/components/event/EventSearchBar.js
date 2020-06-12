import React, { useState, useEffect } from 'react'
import SwitchButton from './MemberEventComponents/SwitchButton'

import '../../styles/map.scss'

//傳入方法 props.getEventData() = 向伺服器請求新的資料
//傳入方法 props.setIsEnable() = 設定開關狀態
//傳入參數 props.isEnable() = 開關狀態
//2020-03-25
function EventSearchBar(props) {
  //每次點擊SwitchButton就改變state 

  const toggleSwitchButton = () => {
    props.setIsEnable(!!props.isEnable)
  }

  return (
    <>
      <div className="m-3">
      <div className="row">
          <div className=" col-10 ">
          <div class="search">
           <input
              type="text"
              className="searchTerm form-control form-control ml-3 w-75  searchInput"
              placeholder="What are you looking for?"
            ></input> 
            <button
              type="button"
              className="btn-search btn btn-outline-secondary ml-2 searchButton"            
            >          
              <i class="fa fa-search"></i>
            </button>
          </div>
          </div>
        </div>

        <div className="row d-flex m-3">
          <div className="col-4  d-flex switchbutton-jy align-items-center justify-content-end">
            <p>包含已過期資料</p>
            <SwitchButton
              type="button"
              active={props.isEnable}
              clicked={toggleSwitchButton}
            />
          </div>
          <div className="col-4 "> 
          <select          
            className="form-control "           
          >
            <option value="">選擇活動類別</option>          
          </select>
        </div>
        <div className=" col-4 ">
          <select            
            className="form-control "           
          >
            <option value="">選擇排序方式</option>
            <option value="eventStartDate,asc">日期由近到遠</option>
            <option value="eventStartDate,desc">日期由遠到近</option>
            <option value="eventNeedPeople,asc">名額由少至多</option>
            <option value="eventNeedPeople,desc">名額由多至少</option>
          </select>
        </div>
        </div>
        </div>


      
    </>
  )
}

export default EventSearchBar
