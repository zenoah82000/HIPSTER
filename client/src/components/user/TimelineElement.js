import React from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import SimpleReactLightbox from 'simple-react-lightbox'
import { SRLWrapper } from 'simple-react-lightbox'
import { FaKiss } from 'react-icons/fa'

function TimelineElement({ myMapData }) {
  console.log(myMapData)

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
        <h5 className="vertical-timeline-element-title ml-1">
          <small style={{ fontWeight: 'bold', color: '#688e67' }}>
            {myMapData.date.substring(0, 10)}
          </small>
        </h5>
        <small className="vertical-timeline-element-subtitle">
          <i className="fas fa-map-marker-alt" style={{ color: '#688e67s' }}>
            {' '}
          </i>
          {myMapData.productAddress}
        </small>
        {myMapData.commentImg != '' ? (
          <div>
            <SimpleReactLightbox>
              <SRLWrapper>
                {myMapData.commentImg != '' ? (
                  <div className="mymapBgImg">
                    <img
                      src={
                        'http://localhost:5000/images/comments/' +
                        myMapData.commentImg
                      }
                      alt="first"
                    />
                  </div>
                ) : (
                  ''
                )}

                <div className="d-flex  ">
                  {myMapData.commentImg1 != '' ? (
                    <div className="mymapSmImg">
                      <img
                        src={
                          'http://localhost:5000/images/comments/' +
                          myMapData.commentImg
                        }
                        alt="first"
                      />
                    </div>
                  ) : (
                    ''
                  )}
                  {myMapData.commentImg2 != '' ? (
                    <div className="mymapSmImg">
                      <img
                        src={
                          'http://localhost:5000/images/comments/' +
                          myMapData.commentImg
                        }
                        alt="first"
                      />
                    </div>
                  ) : (
                    ''
                  )}
                  {myMapData.commentImg3 != '' ? (
                    <div className="mymapSmImg">
                      <img
                        src={
                          'http://localhost:5000/images/comments/' +
                          myMapData.commentImg
                        }
                        alt="first"
                      />
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </SRLWrapper>
            </SimpleReactLightbox>
          </div>
        ) : (
          ''
        )}

        <div className="cardBorder">
          <p>
            <small className="vertical-timeline-element-subtitle">
              {myMapData.productName}
            </small>
          </p>
        </div>
      </VerticalTimelineElement>
    </>
  )
}

export default TimelineElement
