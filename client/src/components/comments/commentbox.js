import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.scss'

//引入自訂元件
import CommentImg from '../comments/commentImg'


class commtents extends Component {
    constructor() {
        super();
        this.state = { tabIndex: 0 };
    }
    render() {
        return (
            <div class="container mt-5 ">
                <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                    <TabList>
                        <Tab>評價</Tab>
                        <Tab>問與答</Tab>
                    </TabList>
                    <TabPanel>
                        <div style={{ padding: "20px" }}>
                            <div className="eventContentBox d-flex">
                                <div className="comment icon col-1">
                                    <img
                                        src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="eventDetailBox col-11 pl-3">
                                    <h2 className="eventTitle">評論1   </h2>
                                    <ul className=" list-unstyled">
                                        <li >
                                            用戶名
                                        </li>
                                        <li >
                                            <div className="">
                                                這是評價 這是評價 這是評價 這是評價 這是評價 這是評價 這是評價 這是評價 這是評價 這 這是評價 這是評價 這是評價 這是評價 這是評價 這是評價 這是評價 這是評價 這是評價 這是評價 這是評價 這是評價 這是評價 這是評價 這是評價 這是評價 這是評價 這是評價是評價 這是評價 這是評價 這是評價 這是評價 這是評價 這是評價 這是評價 這是評價
                                            </div>
                                        </li>
                                        <li className="d-flex">
                                            <CommentImg />
                                            <CommentImg />
                                            <CommentImg />
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="eventContentBox d-flex">
                                <div className="eventImgBox col-2">
                                    <img
                                        src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="eventDetailBox col-10 pl-3">
                                    <h2 className="eventTitle">評論2   </h2>
                                    <ul className=" list-unstyled">
                                        <li >
                                            <div className="">
                                                手作課程
                                            </div>
                                        </li>
                                        <li>
                                            <CommentImg />
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="eventContentBox d-flex">
                                <div className="eventImgBox col-2">
                                    <img
                                        src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="eventDetailBox col-10 pl-3">
                                    <h2 className="eventTitle">評論3   </h2>
                                    <ul className=" list-unstyled">
                                        <li >
                                            <div className="">
                                                手作課程
                                            </div>
                                        </li>
                                        <li>
                                            <CommentImg />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            <div className="eventContentBox d-flex">
                                <div className="eventImgBox col-4">
                                    <img
                                        src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="eventDetailBox col-8 pl-3">
                                    <h2 className="eventTitle">問與答一   </h2>
                                    <ul className=" list-unstyled">
                                        <li >
                                            <div className="">
                                                手作課程
                                            </div>
                                        </li>
                                        <li>
                                            星等
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

export default commtents