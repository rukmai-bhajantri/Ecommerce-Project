import React from 'react'
import '../assets/css/style.css'
import '../assets/css/Media.css'
import heroimg from '../assets/imges/hero1.png'
import btn1 from '../assets/imges/btn1.svg'
import btn2 from '../assets/imges/btn2.svg'
import btn3 from '../assets/imges/btn3.svg'
import dress from '../assets/imges/dress.png'
import coat from '../assets/imges/coat.png'
import denim from '../assets/imges/denim.png'
import jacket from '../assets/imges/jacket.png'
import shoes from '../assets/imges/shoes.png'

import dress1 from '../assets/imges/dress1.png'
import item2 from '../assets/imges/item_2.png'
import item3 from '../assets/imges/item_3.png'
import item4 from '../assets/imges/item_4.png'
import item5 from '../assets/imges/item_5.png'
import item6 from '../assets/imges/item_6.png'
import item7 from '../assets/imges/item_7.png'
import item8 from '../assets/imges/item_8.png'

import model1 from '../assets/imges/model_1.png'
import model2 from '../assets/imges/model_2.png'
import model3 from '../assets/imges/model_3.png'
import model4 from '../assets/imges/model_4.png'
import section from '../assets/imges/section4.png'

import cusomer from '../assets/imges/custo.png'
import section6 from '../assets/imges/section6.png'

import footer from '../assets/imges/footer.png'
// import footer1 from '../assets/imges/footer1.png'
import footer2 from '../assets/imges/footer2.png'
import footer3 from '../assets/imges/footer3.png'
import footer4 from '../assets/imges/footer4.png'
function Home() {
  return (
    <>
      <section className='home-page'>
        <div className='left'>
          <div class="hero-text">
            <p>Exclusive Offer 20% Off This Week</p>
            <h1>Stylish <br />Female Clothes</h1>
            <p>Trendy products at unbeatable prices</p>
            <button class="hero-btn"><i class="fa-solid fa-bag-shopping"></i>Shop Now</button>
            <button className='hero-btn2'>Our Happy customer<br />

              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>

            </button>
          </div>
        </div>
        <div className='right'>
          <div class="bg-circle"></div>
          <img src={heroimg} className='home-img'></img>
        </div>
      </section>

      <section className='sectionpage'>
        <h1 className='premium-heding'>Premium Shades</h1>
        <hr />
        <div className='premium-shades'>
          <div className='row'>
            <img src={btn1} className='btn-img'></img>
            <img src={btn2} className='btn-img'></img>
            <img src={btn3} className='btn-img'></img>
            <img src={btn1} className='btn-img'></img>
          </div>
        </div>
      </section>

      <section className='sectionpage'>
        <h1 className='premium-heding'>Category</h1>
        <hr />
        <div className='category-shades'>
          <div className='row'>
            <div class="icon">
              <i class="fa-solid fa-person-dress"></i>
              <p className='category-name'>All</p>
            </div>
            <div >
              <img src={dress} className='btn-img1'></img>
              <p className='category-name'>Dress</p>
            </div>
            <div>
              <img src={coat} className='btn-img1'></img>
              <p className='category-name'>Coat</p>
            </div>
            <div>
              <img src={denim} className='btn-img1'></img>
              <p className='category-name'>Denim</p>
            </div>
            <div>
              <img src={jacket} className='btn-img1'></img>
              <p className='category-name'>Jacket</p>
            </div>
            <div>
              <img src={shoes} className='btn-img1'></img>
              <p className='category-name'>Shoes</p>
            </div>
          </div>
        </div>
      </section>

      <section className='sectionpage'>
        <div className='row'>

          <div className='category-card'>
            <img src={dress1} className='product-img' />
          </div>

          <div className='category-card'>
            <img src={item2} className='product-img' />
          </div>

          <div className='category-card'>
            <img src={item3} className='product-img' />
          </div>

          <div className='category-card'>
            <img src={item4} className='product-img' />
          </div>

          <div className='category-card'>
            <img src={item5} className='product-img' />
          </div>

          <div className='category-card'>
            <img src={item6} className='product-img' />
          </div>

          <div className='category-card'>
            <img src={item7} className='product-img' />
          </div>

          <div className='category-card'>
            <img src={item8} className='product-img' />
          </div>
        </div>
      </section>

      <section className='home-page2'>
        <div className='left1'>
          <div class="hero-text">
            <h1>Grab it Fast</h1>
            <h1>Winter Sale</h1>
            <h1>Discount up 70%-80%</h1>
            <button className='hero-btn1'>Start Shopping</button>
          </div>
        </div>
        <div className='right1'>
          <img src={section} className='home-img1'></img>
        </div>
      </section>

      <section className='sectionpage'>
        <h1 className='premium-heding'>Trending a Top Sale</h1>
        <div className='row'>

          <div className='category-card1'>
            <img src={model1} className='product-img' />
            <h1 className='title'>Ladies Shirt</h1>
            <p><span style={{ color: "red" }}>$20.00</span></p>
          </div>

          <div className='category-card1'>
            <img src={model2} className='product-img' />
            <h1 className='title'>Ladies T-Shirt</h1>
            <p><span style={{ color: "red" }}>$50.00</span></p>
          </div>

          <div className='category-card1'>
            <img src={model3} className='product-img' />
            <h1 className='title'>Ladies Suits</h1>
            <p><span style={{ color: "red" }}>$30.00</span></p>
          </div>

          <div className='category-card1'>
            <img src={model4} className='product-img' />
            <h1 className='title'>Ladies Dress</h1>
            <p><span style={{ color: "red" }}>$60.00</span></p>
          </div>

        </div>
      </section>

      <section className='sectionpage'>
        <h1 className='premium-heding'>What Our Customer Say</h1>
        <div className='row'>
          <div className='cusomer-card'>
            <img src={cusomer} className='customer-img'></img>
            <h1>“Best shopping experience I’ve had online. Highly recommended!”
              — Anjali M.</h1>
          </div>

          <div className='cusomer-card'>
            <img src={cusomer} className='customer-img'></img>
            <h1>“Products look exactly like the pictures. Very satisfied with my order.”<br />
              — Sneha R.</h1>
          </div>

          <div className='cusomer-card'>
            <img src={cusomer} className='customer-img'></img>
            <h1>“Affordable prices with premium quality. Will shop again for sure!”
              — Arjun P.</h1>
          </div>
        </div>
      </section>

      <section className='home-page3'>
        <div className='left1'>
          <div class="hero-text">
            {/* <p>Summer Sale Up-coming</p> */}
            <h1>Biggest Ever Offer 90% off<br />This Summer</h1>
            <button className='hero-btn1'>More Details</button>
          </div>
        </div>
        <div className='right1'>
          <img src={section6} className='home-img1'></img>
        </div>
      </section>

      <section className='subscribe'>
        <h1 className='premium-heding'>Subscribe to Our Newsletter</h1>
        <div className='sub-card'>
          <h1 className='sub-title'>Subscribe to our newsletter for the latest updates.
            Get exclusive offers and special discounts first.
            Stay connected and never miss new arrivals.
            Subscribe to our newsletter for the latest updates.
            Get exclusive offers and special discounts first.
            Stay connected and never miss new arrivals.</h1>
            <button className='sub-btn'>Enter Your Email</button>
        </div>
      </section>

<section className='instagram-section'>
  <div className='insta-row'>
    <img src={footer} className='insta-img' />
    <img src={footer2} className='insta-img' />
    <img src={footer3} className='insta-img' />
    <img src={footer4} className='insta-img' />
    <img src={footer2} className='insta-img' />
  </div>

  <button className='insta-btn'>
    Follow on Instagram
  </button>
</section>

<section className='footer'>

  <div className='footer-container'>

    <div className='footer-box'>
      <h1>John Clothes</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <h3>Contacts</h3>

      <p>California - USA</p>
      <p>998-905-764</p>
      <p>Mon - Sun : 24:00 Hours</p>
    </div>

    <div className='footer-box'>
      <h2>Catalog</h2>

      <p>Home</p>
      <p>Shop</p>
      <p>Deals</p>
      <p>Blog</p>
    </div>

    <div className='footer-box'>
      <h2>Information</h2>

      <p>About Us</p>
      <p>FAQ</p>
      <p>Contact</p>
      <p>Refund Policy</p>
    </div>

    <div className='footer-box'>
      <h2>Your Account</h2>

      <p>My Account</p>
      <p>Wishlist</p>
      <p>Cart</p>
      <p>Checkout</p>
    </div>

  </div>

  <hr />

  <div className='footer-bottom'>
    <p>© 2026 John Clothes</p>
  </div>

</section>
      {/* <section className='footer'>
        <div className='foter-row'>
          <div className='footer-card'>
            <img src={footer} className='footer-img'></img>
          </div>

          <div className='footer-card'>
            <img src={footer2} className='footer-img'></img>
          </div>

          <div className='footer-card'>
            <img src={footer3} className='footer-img'></img>
          </div>

          <div className='footer-card'>
            <img src={footer4} className='footer-img'></img>
          </div>

            <div className='footer-card'>
            <img src={footer2} className='footer-img'></img>
          </div>
        </div>
      </section>
      */}
    </>
  )
}

export default Home