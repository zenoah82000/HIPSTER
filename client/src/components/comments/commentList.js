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
  constructor(props) {
    super(props)
    this.state = {
      tabIndex: 0,
      data: [],
    }
  }
  // state = { data: this.props.productName }

  //資料庫傳資料
  getOrderlistAsync = async () => {
    const request = new Request(
      `http://localhost:5000/productComment/${this.props.productId}`,
      {
        method: 'get',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    const response = await fetch(request)
    const data = await response.json()
    this.setState({ data: data })
  }

  render() {
    console.log('comment-list-this.state', this.props.productName)
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
                    星等
                    {this.state.data.star}
                  </li>
                  <li>
                    <p className="">{this.state.data.content}</p>
                  </li>

                  <li className="d-flex">
                    {/* <SimpleReactLightbox>
                      <SRLWrapper>
                        <div className="commentImg">
                          <img
                            className="commentImgPhoto commentImghover"
                            src={
                              'http://localhost:5000/images/comments/' +
                              this.state.data.commentImg
                            }
                            alt={this.state.data.content}
                          />
                        </div>
                      </SRLWrapper>
                    </SimpleReactLightbox> */}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ProductListPageBar />
        </TabPanel>

        <TabPanel>
          <div>
            <div className="d-flex">
              <div className="eventDetailBox col-12 pl-3">
                <ProductQanda productNameNow={this.props.productName} />
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
