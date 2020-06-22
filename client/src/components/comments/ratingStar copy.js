import React,{useState} from 'react'
import '../../styles/mContent/userComment.scss'
import ReactStars from 'react-rating-stars-component'

import { FaStar } from 'react-icons/fa'


function Rating(props) {
  const [rating, setRating] = useState(null);
  const [temp_rating, setTemp_rating] = useState(null);


  // const  { rating, setRating, temp_rating, setTemp_rating } = props


  const  rate = (newrating) => {
    setRating(newrating)
    setTemp_rating(newrating)
  }
  const  star_over = (newrating) => {
    temp_rating = rating
    rating = newrating
    setRating(rating)
    setTemp_rating(temp_rating)
  }

  const star_out = () => {
    rating = temp_rating
    setRating(rating)
  }


  var stars = [];

  for (var i = 0; i < 5; i++) {
    var klass = 'star-rating__star';

    if (rating >= i && rating != null) {
      klass += ' is-selected';
    }

    stars.push(
      <label
        className={klass}
        onClick={rate(i)}
        onMouseOver={star_over(i)}
        onMouseOut={star_out()}>
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


export default Rating

