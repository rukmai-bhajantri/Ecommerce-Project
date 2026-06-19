import React, { useState, useEffect } from 'react'

function CartItems() {

  let [cartItem, setCartItem] = useState([])

  let getData = async () => {

    let token = localStorage.getItem("token")

    let response = await fetch("http://localhost:5000/CartItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })

    let result = await response.json()

    setCartItem(result)
  }

  useEffect(() => {
    getData()
  }, [])

  // UPDATE QUANTITY

  let updateCart = async (cartid, quentity) => {

  if (quentity < 1) {
    return
  }

  // UI instant update
  setCartItem(prev =>
    prev.map(item =>
      item.cartid === cartid
        ? { ...item, quentity: quentity }
        : item
    )
  )

  let token = localStorage.getItem("token")

  let response = await fetch(
    "http://localhost:5000/UpdateCart",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        cartid,
        quentity
      })
    }
  )

  let data = await response.json()

  console.log(data)
}
  // REMOVE ITEM

  let removeItem = async (cartid) => {

    let token = localStorage.getItem("token")

    let response = await fetch(
      `http://localhost:5000/removeCartItems/${cartid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    )

    let data = await response.json()

    alert(data.message)

    getData()
  }

  // TOTAL

  let subtotal = cartItem.reduce((total, item) => {
    return total + (item.price * item.quentity)
  }, 0)

  let discount = subtotal > 2000 ? 200 : 0

  let gst = Math.floor((subtotal - discount) * 0.05)

  let delivery = subtotal > 1000 ? 0 : 60

  let finalTotal = subtotal - discount + gst + delivery

  return (

    <section className='cart-page'>

      {/* LEFT SIDE */}

      <div className='cart-left'>

        {
          cartItem.map((Items) => (

            <div className='cart-card' key={Items.cartid}>

              <img
                src={`http://localhost:5000/upload/${Items.imagepath}`}
                className='table-img'
                alt=""
              />

              <div className='cart-details'>

                <h2>{Items.productname}</h2>

                <h3>₹ {Items.price}</h3>

                <div className='qty-box'>

                  <button
                    onClick={() =>
                      updateCart(
                        Items.cartid,
                        Items.quentity - 1
                      )
                    }
                  >
                    -
                  </button>

                  <span>{Items.quentity}</span>

                  <button
                    onClick={() =>
                      updateCart(
                        Items.cartid,
                        Items.quentity + 1
                      )
                    }
                  >
                    +
                  </button>

                </div>

                <h4>
                  Total :
                  ₹ {Items.price * Items.quentity}
                </h4>

                <button
                  className='remove-btn'
                  onClick={() =>
                    removeItem(Items.cartid)
                  }
                >
                  <i class="fa-solid fa-trash"></i>
                </button>

              </div>

            </div>
          ))
        }

      </div>

      {/* RIGHT SIDE */}

      <div className='cart-right'>

        <div className='summary-box'>

          <h2>Price Details</h2>

          <div className='summary-row'>
            <p>Subtotal</p>
            <p>₹ {subtotal}</p>
          </div>

          <div className='summary-row'>
            <p>Discount</p>
            <p>- ₹ {discount}</p>
          </div>

          <div className='summary-row'>
            <p>GST</p>
            <p>₹ {gst}</p>
          </div>

          <div className='summary-row'>
            <p>Delivery</p>
            <p>
              {delivery === 0 ? "FREE" : `₹ ${delivery}`}
            </p>
          </div>

          <hr />

          <div className='summary-row total'>
            <h3>Total Amount</h3>
            <h3>₹ {finalTotal}</h3>
          </div>

          <button className='order-btn'>
            Place Order
          </button>

        </div>

      </div>

    </section>
  )
}

export default CartItems