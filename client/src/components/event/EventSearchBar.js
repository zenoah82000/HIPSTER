import React, { useState, useEffect } from 'react'
import SwitchButton from './MemberEventComponents/SwitchButton'
import { FaSearch } from 'react-icons/fa'


const EventSearchBar = (props) => {
  return (
    <>
      <div className="row m-3 ">
        <div class="box col-12">
          <div class="container-1">
            <FaSearch className="fonticon" />
            <input type="search" id="search" placeholder="Search..." />
          </div>
        </div>
        <div className=" d-flex m-3">
          <div className="col-4 ">
            <select
              className="form-control select-1"
            >
              <option value="">活動類別</option>
            </select>
          </div>
          <div className="col-4 ">
            <select
              className="form-control select-1 "
            >
              <option value="">排序方式</option>
              <option value="eventStartDate,asc">日期由近到遠</option>
              <option value="eventStartDate,desc">日期由遠到近</option>
              <option value="eventNeedPeople,asc">名額由少至多</option>
              <option value="eventNeedPeople,desc">名額由多至少</option>
            </select>
          </div>
          <div className="col-4  d-flex switchbutton-jy align-items-center justify-content-end">
            <p>已過期資料</p>
            <SwitchButton
            // type="button"
            // active={props.isEnable}
            // clicked={toggleSwitchButton}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default EventSearchBar
