import React, { useState } from 'react'
import '../styles/map.scss'
import CafeData from '../data/cafe.json'

//引入自訂元件
import EventMapDataList from '../components/event/EventMapDataList'
import EventSearchBar from '../components/event/EventSearchBar'
import MyMapComponent from '../components/event/MyMapComponent'

class  Map extends React.Component{
  constructor(props){
    super(props)
    //增加了state.name用來放篩選留言者的值
    this.state = ({itemId:'',
    search:''})
    //照慣例也新增個changeState用來在使用者輸入值的時候觸發事件，改變state
    this.changeState = this.changeState.bind(this)
    // console.log(CafeData)
}


changeState(event){
  this.setState({itemId:event.target.id,search:event.target.value
  })
}


render(){
  //  console.log(CafeData)
  return (
    <>
      <div className="row">
        <div className="col-4">
          {/* <button type="button" >測試用</button> */}
          <EventSearchBar search={this.state.search} changeState={this.changeState}/>
          <EventMapDataList 
                               search={this.state.search}  CafeData={CafeData}/>
        </div>
        <div className="col-8">
          <MyMapComponent clickItem={this.state.itemId}  CafeData={CafeData}/>
        </div>
      </div>
    </>
  )}
}

export default Map
