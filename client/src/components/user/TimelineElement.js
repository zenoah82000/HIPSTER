import React from "react"
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import {FaKiss} from "react-icons/fa";
function TimelineElement({myMapData}) {
  
    return (
      <>
          <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        // contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        // contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                        // date="2011 - present"
                        iconStyle={{ background: '#688e67', color: '#fff' }}
                        icon={<FaKiss />}  
                    >
                        <h5 className="vertical-timeline-element-title" style={{fontWeight:"bold"}}>{myMapData.date.substring(0, 10)}的文青足跡</h5>
                        <h5 className="vertical-timeline-element-subtitle">{myMapData.productName}</h5>
                        {/* <p>
                            Creative Direction, User Experience, Visual Design, Project Management, Team Leading
    </p> */}
                    </VerticalTimelineElement>
      </>
    )
  }
  
  export default  TimelineElement