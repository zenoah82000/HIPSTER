import React from 'react'
import '../../styles/mContent/userComment.scss'
import ReactStars from 'react-rating-stars-component'

import { FaStar } from 'react-icons/fa'

class RatingValue extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: this.props.ratingValue,
    }
  }

  stars = () => {
    // console.log(this.state.searchBtn1, this.state.searchBtn3)
    if (this.state.rating == 5) {
      return (
        <>
          <span>★★★★★</span>
        </>
      )
    } else if (this.state.rating == 4) {
      return (
        <>
          <span>★★★★</span>
        </>
      )
    } else if (this.state.rating == 3) {
      return (
        <>
          <span>★★★</span>
        </>
      )
    } else if (this.state.rating == 2) {
      return (
        <>
          <span>★★</span>
        </>
      )
    } else if (this.state.rating == 1) {
      return (
        <>
          <span>★</span>
        </>
      )
    } else {
      return ''
    }
  }

  render() {
    return <div className="star-rating">{this.stars()}</div>
  }
}

export default RatingValue
