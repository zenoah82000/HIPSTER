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

  render() {
    var stars = []

    for (var i = 0; i < 5; i++) {
      var klass = 'star-rating__star'

      if (this.state.rating >= i && this.state.rating != null) {
        klass += ' is-selected'
      }

      stars.push(<label>★</label>)
    }
    console.log(stars)
    return <div className="star-rating">{stars}</div>
  }
}

export default RatingValue
