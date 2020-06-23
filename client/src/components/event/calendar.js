import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyCalendar( props) {
  const [date, setDate] = useState(new Date());

  onChange = date => {
    console.log("test")
    setDate(date)
    handleClick()

  } 

  // https://demo.mobiscroll.com/react/calendar/datepicker#


  //回傳日期值給母元素
  const handleClick= ()=>{
    console.log("test")
  props.getDateValue(this.state.value)
  }

  return (
    <div onClick={handleClick}>
      <Calendar 
      date={new Date()}
        onChange={()=>onChange()}
        onViewChange={console.log('test')}
        value={date}  
      />
    </div>
  );
}

export default MyCalendar