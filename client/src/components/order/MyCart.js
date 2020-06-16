import React from 'react'

import { FiEdit } from 'react-icons/fi'
import { BsTrash } from 'react-icons/bs'

function MyCart(props) {
  const { handleDelete, mycart } = props
  // console.log('carditem', { mycart })

  return (
    <>
      {props.mycart.map((value, index) => {
        return (
          <>
            <div className="bg-white d-flex mt-3 p-2 align-items-center">
              <div className="col d-flex">
                <input type="checkbox" className="mr-4" />
                <img
                  className="productImg"
                  src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                  alt=""
                />
              </div>
              <div className="col">{value.name}</div>
              <div className="col">{value.date}</div>
              <div className="col">
                <span>
                  <input value={value.amount} readOnly />
                </span>
              </div>
              <div className="col"></div>
            </div>
            <div className="bg-white d-flex border-top p-1">
              <div className="col-2">
                <FiEdit />
                更改
              </div>
              <div className="col-2">
                <BsTrash />
                刪除
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
