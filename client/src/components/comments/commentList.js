import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.scss'
import '../../styles/comment.scss'

//引入自訂元件
import CommentImg from './commentImg'
import RatingStar from './ratingStar'
import ProductListPageBar from '../product/ProductListPageBar'
import ProductQanda from '../qanda/ProductQanda'

class commtentList extends Component {
  constructor() {
    super()
    this.state = { tabIndex: 0 }
  }
  render() {
    return (
      <Tabs
        selectedIndex={this.state.tabIndex}
        onSelect={(tabIndex) => this.setState({ tabIndex })}
      >
        <TabList>
          <Tab>評價</Tab>
          <Tab>問與答</Tab>
        </TabList>
        <TabPanel>
          <div>
            <div className="commentList d-flex row">
              <div className="col-md-2 col-sm-2">
                <div className="iconBox">
                  <img
                    src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="commentBox col-md-10 col-sm-10">
                <h2 className="eventTitle">評論1 </h2>
                <ul className=" list-unstyled">
                  <li>用戶名</li>
                  <li>
                    <RatingStar />
                    星等
                  </li>
                  <li>
                    <p className="">
                      這是評價 這是評價 這是評價 這是評價 這是評價 這是評價
                      這是評價 這是評價 這是評價 這 這是評價 這是評價 這是評價
                      這是評價 這是評價 這是評價 這是評價 這是評價 這是評價
                      這是評價 這是評價 這是評價 這是評價 這是評價 這是評價
                      這是評價 這是評價 這是評價是評價 這是評價 這是評價
                      這是評價 這是評價 這是評價 這是評價 這是評價 這是評價
                    </p>
                  </li>

                  <li className="d-flex">
                    <CommentImg />
                    <CommentImg />
                    <CommentImg />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ProductListPageBar />
        </TabPanel>

        <TabPanel>
          <div>
            <div className="eventContentBox d-flex">
              {/* <div className="eventImgBox col-4">
                <img
                  src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                  alt=""
                />
              </div> */}
              <div className="eventDetailBox col-12 pl-3">
                {/* <h2 className="eventTitle">問與答 </h2> */}
                {/* <ul className=" list-unstyled">
                  <li>
                    <div className="">手作課程</div>
                  </li>
                  <li>星等</li>
                </ul> */}
                <ProductQanda />
              </div>
            </div>
          </div>

          <ProductListPageBar />
        </TabPanel>
      </Tabs>
    )
  }
}

export default commtentList
