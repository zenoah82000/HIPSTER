import React from 'react'
import ReactStars from 'react-rating-stars-component'

import { FaStar } from 'react-icons/fa'

const ratingChanged = (newRating) => {
  console.log(newRating)
}

const ratingStar = () => {
  return (
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={24}
      half={true}
      emptyIcon={<i className="far fa-star"></i>}
      halfIcon={<i className="fa fa-star-half-alt"></i>}
      fullIcon={<i className="fa fa-star"></i>}
      color2={'#ffd700'}
    />
  )
}

//   const [rating, setRating] = React.useState(null);
//   const [hover, setHover] = React.useState(null);

//   return(
//       <div>
//           {[...Array(5)].map((star,i) =>{
//               const ratingValue = i + 1;

//           return (
// <label>
// <input type="radio" name="rating" value={ratingValue} onClick={()=>setRating(ratingValue)} />
// <FaStar
//     className="star"
//     color={ratingValue <= (hover || rating)?  "#688e67":"#e4e5e9"}
//             size={100}
//     onMouseEnter = {()=>setHover(ratingValue)} onMouseLeave= {()=>setHover(null)}
// />
// </label>

//           )
//           })}
//     </div>
//           )}

export default ratingStar
