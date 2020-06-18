import React, { useState, useEffect } from 'react'
import SwitchButton from './MemberEventComponents/SwitchButton'
import { Dropdown } from 'react-bootstrap'
import Calendar from 'react-calendar'

//引用icon
import { FaSearch, FaStreetView } from 'react-icons/fa'
import { GiCoffeeCup } from 'react-icons/gi'

const EventSearchBar = (props) => {

  const {search,changeState} = props

  return (
    <>
      <div className="px-4 p-3">
        <div class="box col-12">
          {/* <div class="container-1">
            <FaSearch className="fonticon" />
            <input type="search" id="search" placeholder="Search..." />
          </div> */}

          <div class="input-group">
            <input type="text" 
            class="form-control" 
            placeholder="Search..."  
            value={search}
            onChange={changeState}/>
            <div class="input-group-append">
              <span class="input-group-text bgGreen">
                <FaSearch className="fonticon" />
              </span>
              <span class="input-group-text bgRed">
                <FaStreetView className="fonticon" />
              </span>
            </div>
          </div>
        </div>
        <div className=" d-flex m-2 ">
          <Dropdown className="">
            <Dropdown.Toggle
              className="mapSearch btn-small"
              variant="success"
              id="dropdown-basic"
            >
              類型
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <div class="p-3">
                <div class="form-check">
                  <input
                    class="form-check-input position-static"
                    type="checkbox"
                    id="blankCheckbox"
                    value="option1"
                    aria-label="..."
                  />
                  <label className="">文藝展覽</label>
                </div>
                <div class="dropdown-divider"></div>
                <div class="form-check">
                  <input
                    class="form-check-input position-static"
                    type="checkbox"
                    id="blankCheckbox"
                    value="option1"
                    aria-label="..."
                  />
                  <label className="">手作課程</label>
                </div>
                <div class="dropdown-divider"></div>
                <div class="form-check">
                  <input
                    className="form-check-input position-static "
                    type="checkbox"
                    id="blankCheckbox"
                    value="option1"
                    aria-label="..."
                  />
                  <label className="">咖啡廳</label>
                </div>
              </div>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              className="mapSearch  btn-small"
              variant="success"
              id="dropdown-basic"
            >
              日期
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Calendar />
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              className="mapSearch  btn-small"
              variant="success"
              id="dropdown-basic"
            >
              評價
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <div class="p-3">
                <div class="form-check">
                  <input
                    class="form-check-input position-static"
                    type="checkbox"
                    id="blankCheckbox"
                    value="option1"
                    aria-label="..."
                  />
                  <label className="">4.5顆星以上</label>
                </div>
                <div class="dropdown-divider"></div>
                <div class="form-check">
                  <input
                    class="form-check-input position-static"
                    type="checkbox"
                    id="blankCheckbox"
                    value="option1"
                    aria-label="..."
                  />
                  <label className="">4顆星以上</label>
                </div>
                <div class="dropdown-divider"></div>
                <div class="form-check">
                  <input
                    className="form-check-input position-static "
                    type="checkbox"
                    id="blankCheckbox"
                    value="option1"
                    aria-label="..."
                  />
                  <label className="">3顆星以上</label>
                </div>
              </div>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              className="mapSearch  btn-small"
              variant="success"
              id="dropdown-basic"
            >
              價格
            </Dropdown.Toggle>

            <Dropdown.Menu></Dropdown.Menu>
          </Dropdown>

          <span>營業中</span>
          <SwitchButton />
          {/* <div className="d-flex switchbutton-jy align-items-center justify-content-end">
            <p>營業中</p>
            <SwitchButton
            // type="button"
            // active={props.isEnable}
            // clicked={toggleSwitchButton}
            />
          </div> */}
        </div>
      </div>
    </>
  )
}

export default EventSearchBar
