import React from 'react'

function Card({ product }) {
   let addtoCartHandler = async (cartProduct) => {
        if (localStorage.getItem("token") == null) {
            let cartItmes = JSON.parse(localStorage.getItem("CartItems")) || []
            console.log(cartItmes)
            let existingProduct = cartItmes.findIndex(item => item.productid == cartProduct.productid)
            console.log(existingProduct)
            if (existingProduct == -1) {
                cartItmes.push({ ...cartProduct, quantity: 1 })
            }
            else {
                cartItmes[existingProduct].quantity += 1
            }
            localStorage.setItem("CartItems", JSON.stringify(cartItmes));
        }
        else {
            let token = localStorage.getItem("token")

            let resp = await fetch("http://localhost:5000/addtoCart", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([
                    {
                        productid: cartProduct.productid,
                    }
                ])
            })
        }
    }
  return (
    <div className='product-card'>
      <div className='card'>
        <img src={`http://localhost:5000/upload/${product.imagepath}`} className='product-imgpath'></img>
        <p className='card-title1'>{product.productname}</p>
        <p className='card-title'><i className="fa-solid fa-indian-rupee-sign"></i>{product.price}</p>
        <button onClick={() =>addtoCartHandler(product)} className='card-btn'><i className="fa-solid fa-cart-arrow-down"></i>Add to cart</button>
        <button className='heart-btn'><i className="fa-regular fa-heart"></i></button>
      </div>
    </div>
  )
}

export default Card