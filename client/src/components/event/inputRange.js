<Marker
                position={viewport.center}
                ref={this.openPopup}
                icon={cafeTagIcon}
              >
                <Popup className="locationCard">
                  <h5>
                    <GiCoffeeCup className="h5 mr-1" />
                    {/* {item.name} */}
                  </h5>
                  <ul className="cardList list-unstyled">
                    <li>
                      {/* <div className=
                      {
                        item.category == '咖啡廳'
                          ? 'mapCategoryCafe'
                          : item.category == '手作課程'
                            ? 'mapCategoryItem'
                            : 'mapCategoryItem2'
                      }
                    >
                      <span>{item.category}</span>
                    </div> */}
                    </li>
                    <li
                      style={{
                        width: '460px',
                        height: '200px',
                        objectFit: 'cover',
                        overflow: 'hidden',
                        marginTop: '10px',
                      }}
                    >
                      <img
                        src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                        alt=""
                      />
                    </li>
                    <li>{/* <span>星等{item.star}</span> */}</li>
                    <li>
                      <span className="mr-2">
                        <FaRegClock />
                      </span>
                      <span>營業時間</span>
                    </li>
                    <li>
                      <span className="mr-2">
                        <FaMapMarkerAlt />
                      </span>
                      <span>地點</span>
                    </li>
                    <li>
                      <span className="mr-2 ">
                        <FaRegCalendarCheck />
                      </span>
                      <span>活動日期：</span>
                    </li>
                  </ul>
                  <div className="cardButton">
                    <a value="" href="/#">
                      立即預定
                    </a>
                  </div>
                </Popup>
              </Marker>
            ) : (
              //     )
              //   }
              // })
              this.state.cafedata.map((item) => (
                <Marker
                  position={[item.lat, item.log]}
                  icon={cafeTagIcon}
                  // onMouseOver={e => {
                  //   e.target.openPopup();
                  // }}
                  // onMouseOut={e => {
                  //   e.target.closePopup();
                  // }}
                >
                  <Popup className="locationCard">
                    <h5>
                      <GiCoffeeCup className="h5 mr-1" />
                      {item.name}
                    </h5>
                    <ul className="cardList list-unstyled">
                      <li>
                        <div
                          className={
                            item.category == '咖啡廳'
                              ? 'mapCategoryCafe'
                              : item.category == '手作課程'
                              ? 'mapCategoryItem'
                              : 'mapCategoryItem2'
                          }
                        >
                          <span>{item.category}</span>
                        </div>
                      </li>
                      <li
                        style={{
                          width: '460px',
                          height: '200px',
                          objectFit: 'cover',
                          overflow: 'hidden',
                          marginTop: '10px',
                        }}
                      >
                        <img
                          src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                          alt=""
                        />
                      </li>
                      <li>
                        <span>星等{item.star}</span>
                      </li>
                      <li>
                        <span className="mr-2">
                          <FaRegClock />
                        </span>
                        <span>營業時間</span>
                      </li>
                      <li>
                        <span className="mr-2">
                          <FaMapMarkerAlt />
                        </span>
                        <span>地點</span>
                      </li>
                      <li>
                        <span className="mr-2 ">
                          <FaRegCalendarCheck />
                        </span>
                        <span>活動日期：</span>
                      </li>
                    </ul>
                    <button className="cardButton" value>
                      立即預定
                    </button>
                  </Popup>
                </Marker>