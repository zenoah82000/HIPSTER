import React from 'react'

import { FiEdit } from 'react-icons/fi'
import { BsTrash } from 'react-icons/bs'
import {GrFormAdd} from 'react-icons/gr'
import {GrFormSubtract} from 'react-icons/gr'

import Amount from '../../components/order/amount'

function MyCart(props) {
  console.log(props)
  const { deleteCart,setMycart,mycart } = props
  return (
    <>
      {mycart.map((value, index) => {
        return (
          <>
            <div className="productbox bg-white d-flex mt-3 p-2 align-items-center">
              <div className="col-2 d-flex">
                <input type="checkbox" className="mr-4" />
                <img
                  className="productImg"
                  src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                  alt=""
                />
              </div>
              <div className="col-3">{value.name}</div>
              <div className="col-3">{value.date}</div>
              <div className="col">
              <Amount index={index} value={value.amount}/>
              </div>
              <div className="col"></div>
            </div>
            <div className="bg-white d-flex border-top p-1 text-right card-change">
              <div className="col-1 d-flex align-items-center edit">
                <FiEdit />
                <p>更改</p>
              </div>
              <div className="col-2 d-flex align-items-center delete" onClick={()=>{
                deleteCart(value.id)
              }}>
                <BsTrash />
                <p>刪除</p>
                
              </div>
              <div className="col text-right">
                NT${value.price * value.amount}
              </div>
            </div>
          </>
        )
      })}
    </>
  )
}

export default MyCart
