import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { Map, TileLayer, type Viewport, Popup, Marker } from 'react-leaflet'
import L from 'leaflet'

import '../../styles/mContent/userMymap.scss'
import 'react-vertical-timeline-component/style.min.css';

function UserMymap(props) {
    console.log(props)
    return (
        <>
            <div className="usercontainer">
                <h2 className="usertitle">我的地圖</h2>
            </div>
            <div className="tab-pane">
                <div class="coupon-listview">
                    <Map center={[20, 125]} zoom={20}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker
                            position={[20, 125]}
                            // icon={cafeTagIcon}
                            onMouseOver={e => {
                                e.target.openPopup()
                            }}
                        >
                            {/* <Popup></Popup> */}
                        </Marker>
                    </Map>
                </div>

                <div class="coupon-listview" style={{ background: "#b3b3b3"}}>
                <VerticalTimeline >
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        // contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        // contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                        date="2011 - present"
                        iconStyle={{ background: '#688e67', color: '#fff' }}
                        // icon={<WorkIcon />}  
                    >
                        <h3 className="vertical-timeline-element-title">Creative Director</h3>
                        <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
                        <p>
                            Creative Direction, User Experience, Visual Design, Project Management, Team Leading
    </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="2010 - 2011"
                        iconStyle={{ background:'#688e67', color: '#fff' }}
                        // icon={<WorkIcon />}
                    >
                        <h3 className="vertical-timeline-element-title">Art Director</h3>
                        <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                        <p>
                            Creative Direction, User Experience, Visual Design, SEO, Online Marketing
    </p>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </div>
            </div>
        </>
    )
}

export default UserMymap
