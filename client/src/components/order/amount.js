import React, { useState } from 'react'
import { connect } from 'react-redux'

import { GrFormAdd } from 'react-icons/gr'
import { GrFormSubtract } from 'react-icons/gr'

function Amount(props) {
  const { index, value, mycart } = props
  const [amount, setAmount] = useState(value)

  const changeAmount = (type) => {
    const newCart = [...mycart]
    let newAmount = 0
    switch (type) {
      case 'add':
        newAmount = amount + 1
        setAmount(newAmount)
        newCart[index].amount = newAmount
        props.dispatch({type:'GET_CART',value:newCart})
        localStorage.setItem('cart', JSON.stringify(newCart))
        break
      case 'dec':
        if (amount <= 1) {
           newAmount = 1
          setAmount(1)
        } else {
          setAmount(amount - 1)
          newAmount = amount -1
        }
        setAmount(newAmount)
        newCart[index].amount = newAmount
        props.dispatch({type:'GET_CART',value:newCart})
        localStorage.setItem('cart', JSON.stringify(newCart))
        break
    }
  }

  return (
    <>
      <GrFormSubtract
        className="Subtract"
        onClick={() => {
          changeAmount('dec')
        }}
      />
      <input className="amount" value={amount} readOnly />
      <GrFormAdd
        className="add"
        onClick={() => {
          changeAmount('add')
        }}
      />
    </>
  )
}

const mapStateToProps = store=>{
  return{
    mycart:store.orderReducer.cartData
  }
}
const mapDispatchToProps = null
export default connect(mapStateToProps, mapDispatchToProps)(Amount)
