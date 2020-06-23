import React from 'react'
import {Link} from 'react-router-dom'

import { FiEdit } from 'react-icons/fi'
import { BsTrash } from 'react-icons/bs'
import { GoX } from 'react-icons/go'
import { GrFormAdd } from 'react-icons/gr'
import { GrFormSubtract } from 'react-icons/gr'

import Amount from '../../components/order/amount'

function MyCart(props) {
  const { deleteCart, setMycart, mycart } = props
  return (
    <>
      {mycart.map((value, index) => {
        return (
          <>
            <div className="cartproductbox">
              <div className="productname">
                <GoX
                  className="mr-3 delete"
                  onClick={() => {
                    deleteCart(value.id)
                  }}
                />
                <Link to="/"><img
                  className="productImg"
                  src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                  alt=""
                /></Link>
                <Link to="/"> <p>{value.name}</p></Link>
               
              </div>
              <div className="productright">
                <div className="productdate">{value.date}</div>
                <div className="productamount">
                  <Amount index={index} value={value.amount} />
                </div>
                <div className="productsubtotal">
                  NT${value.price * value.amount}
                </div>
              </div>
            </div>
          </>
        )
      })}
    </>
  )
}

export default MyCart
