import React, { useEffect, useState } from "react"
import { BemiCart } from "./cartItemStyle"
import { FiPlus, FiMinus } from "react-icons/fi"

const CartItem = ({product, handleCount}) => {
  const [errorMsg, setErrorMsg] = useState('')

  const handleClick = (state) => {
    handleCount(state, product)
  }

  useEffect(() => {
    if (product.count <= 0) {
      setErrorMsg('please select a purchase count')
    }
    else if (product.count >= product.stock) {
      setErrorMsg('maximum number of available products')

    } else {
      setErrorMsg('')
    }

    setTimeout(() => setErrorMsg(''), 4000)
  }, [product])

  return (
    <BemiCart>
      <div className="productCartContainer pt-7 flex gap-6">
        <div className="cartProductImg">
          <img src={product.image} alt="Product" />
        </div>
        <div className="cartProductInfo">
          <h4 className="cartProductName">{product.name}</h4>
          <div className="opacity-50">
            <p>
            {product.size} <span>/ </span>{product.color}
            </p>
          </div>
          <p className="cartProductPrice"># {product.price * product.count}</p>
          <div className="quantityControl lg:flex lg:justify-between lg:text-center mt-6">
            <div className="quantityInput">
              <button className="quantityBtn" onClick={() => handleClick(false)}>
                <FiMinus />
              </button>
              <div className="">
                {product.count}
              </div>
              <button className="quantityBtn" onClick={() => handleClick(true)}>
                <FiPlus />
              </button>
            </div>
            <button className="cartRemove">Remove</button>
          </div>
          {errorMsg && (<p style={{color: 'red'}}>{errorMsg}</p>)}
        </div>
      </div>
    </BemiCart>
  )
}

export default CartItem
