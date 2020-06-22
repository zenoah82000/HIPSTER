import React from 'react'
import '../../styles/mContent/userComment.scss'
import ReactStars from 'react-rating-stars-component'

import { FaStar } from 'react-icons/fa'


class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      temp_rating: null
    }
  }


  //  getInitialState = () => {
  //     return {
  //       rating: this.props.rating || null,
  //       temp_rating: null
  //     };
  //   }


  handleClick=() =>{
    let getRating = this.state.rating
    this.props.onClickReset(getRating)
  }

rate = (rating) => {
  this.setState({
    rating: rating,
    temp_rating: rating
  });
  this.handleClick()
  // this.props.getRating()
}
star_over = (rating) => {
  this.state.temp_rating = this.state.rating;
  this.state.rating = rating;

  this.setState({
    rating: this.state.rating,
    temp_rating: this.state.temp_rating
  });
}
star_out = () => {
  this.state.rating = this.state.temp_rating;

  this.setState({ rating: this.state.rating });
}

render() {
  var stars = [];

  for (var i = 0; i < 5; i++) {
    var klass = 'star-rating__star';

    if (this.state.rating >= i && this.state.rating != null) {
      klass += ' is-selected';
    }

    stars.push(
      <label
        className={klass}
        onClick={this.rate.bind(this, i)}
        onMouseOver={this.star_over.bind(this, i)}
        onMouseOut={this.star_out}>
        ★
        </label>
    );
  }

  return (
    <div className="star-rating">
      {stars}
    </div>
  );
}
};

export default Rating

