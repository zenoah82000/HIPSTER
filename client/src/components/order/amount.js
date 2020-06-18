import React, { useState } from 'react'

import { GrFormAdd } from 'react-icons/gr'
import { GrFormSubtract } from 'react-icons/gr'

function Amount(props) {
  const { index, value, setMycart, mycart } = props
  const [amount, setAmount] = useState(value)

  const changeAmount = (type) => {
    const newCart = [...mycart]
    let newAmount = 0
    switch (type) {
      case 'add':
        newAmount = amount + 1
        setAmount(newAmount)
        newCart[index].amount = newAmount
        setMycart(newCart)
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
        setMycart(newCart)
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
export default Amount
