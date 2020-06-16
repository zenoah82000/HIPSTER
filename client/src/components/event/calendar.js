import React, { Component } from 'react'

import SimpleReactCalendar from 'simple-react-calendar'

class Calendar extends Component {
  render() {
    return <SimpleReactCalendar activeMonth={new Date()} />
  }
}

export default Calendar
