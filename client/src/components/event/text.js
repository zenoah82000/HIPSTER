filterList() {
    let updatedList = this.state.productdata.filter((item) => {
      // console.log(this.state.searchBtn1, this.state.searchBtn3)
      if (
        this.state.searchBtn1 === '全部類別' ||
        this.state.searchBtn1 === '類別'
      ) {
        // console.log('texs')
        if (this.state.searchBtn3 == '4.5分以上') {
          return (
            item.`productName`
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 && item.star > 25
          )
        } else if (this.state.searchBtn3 == '4分以上') {
          return (
            item.`productName`
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 && item.star > 20
          )
        } else if (this.state.searchBtn3 == '3.5分以上') {
          return (
            item.`productName`
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 &&
            item.star > 3.5
          )
        } else {
          return (
            item.`productName`
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1
          )
        }
      } else if (this.state.searchBtn1 == '咖啡廳') {
        if (this.state.searchBtn3 == '4.5分以上') {
          return (
            item.`productName`
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 &&
            item.category == '咖啡廳' &&
            item.star > 4.5
          )
        } else if (this.state.searchBtn3 == '4分以上') {
          return (
            item.`productName`
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 &&
            item.category == '咖啡廳' &&
            item.star > 4.5
          )
        } else if (this.state.searchBtn3 == '3.5分以上') {
          return (
            item.`productName`
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 &&
            item.category == '咖啡廳' &&
            item.star > 3.5
          )
        } else {
          return (
            item.`productName`
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 &&
            item.category == '咖啡廳'
          )
        }
      } else if (this.state.searchBtn1 == '手作課程') {
        if (this.state.searchBtn3 == '4.5分以上') {
          return (
            item.`productName`
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) &&
            item.category == '手作課程' &&
            item.star > 4.5
          )
        } else if (this.state.searchBtn3 == '4分以上') {
          return (
            item.`productName`
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 &&
            item.category == '手作課程' &&
            item.star > 4.5
          )
        } else if (this.state.searchBtn3 == '3.5分以上') {
          return (
            item.`productName`
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 &&
            item.category == '手作課程' &&
            item.star > 3.5
          )
        } else {
          return (
            item.`productName`
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 &&
            item.category == '手作課程'
          )
        }
      } else if (this.state.searchBtn1 == '文藝展覽') {
        if (this.state.searchBtn3 == '4.5分以上') {
          return (
            item.`productName`
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 &&
            item.category == '文藝展覽' &&
            item.star > 4.5
          )
        } else if (this.state.searchBtn3 == '4分以上') {
          return (
            item.`productName`
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 &&
            item.category == '文藝展覽' &&
            item.star > 4.5
          )
        } else if (this.state.searchBtn3 == '3.5分以上') {
          return (
            item.`productName`
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 &&
            item.category == '文藝展覽' &&
            item.star > 3.5
          )
        } else {
          return (
            item.`productName`
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 &&
            item.category == '文藝展覽'
          )
        }
      }
    })

    let data = updatedList.map((item, index, array) => {
      return (
        <Fade>
          <li
            className="eventContentLi list-group-item"
            data-category={item.`productName`}
            key={index}
            id={mapId}
            onClick={() => this.cardClick(item.mapCafe_Id)}
          >
            <div className="eventContentBox d-flex">
              <div className="eventImgBox col-4">
                <img
                  src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                  alt=""
                />
              </div>
              <div className="eventDetailBox col-8 pl-3">
                <h4 className="eventTitle" style={{ fontWeight: 'bold' }}>
                  {item.`productName`}
                </h4>
                <ul className=" list-unstyled">
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
                      {item.category}
                    </div>
                  </li>
                  <li>星等:{item.star}</li>
                  <li>
                    <span className="mr-2">
                      <FaRegClock />
                    </span>
                    營業時間
                  </li>
                  <li>
                    <span className="mr-2">
                      <FaMapMarkerAlt />
                    </span>
                    地點
                  </li>
                  <li>
                    <span className="mr-2">
                      <FaRegCalendarCheck />
                    </span>
                    活動日期：
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </Fade>
      )
    })
    return data
  }
