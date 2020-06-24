import React, { useState, useEffect } from 'react'
import { VerticalTimeline } from 'react-vertical-timeline-component';
import { Map, TileLayer, Viewport, Popup, Marker } from 'react-leaflet'
import L from 'leaflet'
import TimelineElement from '../../components/user/TimelineElement';

import '../../styles/mContent/userMymap.scss'
import 'react-vertical-timeline-component/style.min.css';

function UserMymap(props) {
    // console.log(props)
    const [myItemlist, setMyItemlist] = useState([])

    // 後端傳資料
    const checkoutAsync = async (order) => {
        const request = new Request('http://localhost:5000/mymap/2', {
            method: 'get',
            // body: JSON.stringify(order),
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }),
        })
        const response = await fetch(request)
        const data = await response.json()
        console.log(data)

        setMyItemlist(data.myItemList)
        console.log(myItemlist)
    }

    useEffect(() => {
        checkoutAsync()
    }, [])


    return (
        <>
            <div className="usercontainer">
                <h2 className="usertitle">我的文青地圖</h2>
            </div>
            <div className="tab-pane">
                <div >
                    <Map center={[20, 125]} zoom={20}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {myItemlist.map((item, index) =>
                            <Marker
                                position={[item.lat, item.log]}
                                // icon={cafeTagIcon}
                                onMouseOver={e => {
                                    e.target.openPopup()
                                }}
                            >
                                {/* <Popup></Popup> */}
                            </Marker>)}
                    </Map>
                </div>

                <div class="coupon-listview" style={{ background: "#b3b3b3" }}>
                    {myItemlist.length >= 1 ? (
                        <VerticalTimeline >
                            {myItemlist.map((item, index) => <TimelineElement myMapData={item} />)}
                        </VerticalTimeline>
                    ) : (
                            <div className="empty text-center">
                                <img
                                    className="emptyImg mb-3"
                                    src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                                />
                                <h6>尚未有文青足跡</h6>
                            </div>
                        )}

                </div>
            </div>
        </>
    )
}

export default UserMymap
