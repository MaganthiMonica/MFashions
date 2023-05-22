import React, { useState, useEffect } from 'react';
import DropIn from "braintree-web-drop-in-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import './Cartpage.css';


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  console.log(cartItems)
  const [cartTotal, setCartTotal] = useState(0);
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = Cookies.get('token');
  const [addressList, setAddressList] = useState({});
console.log(addressList)
  let cartData = localStorage.getItem('cart');
  const userCart = cartData ? JSON.parse(cartData) : [];

const handleClearCart = () =>{
  setCartItems([])
  localStorage.removeItem('cart')

}

const fetchAddressData = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/get_address', {
      headers: { authentication: token },
    });
    const result = await response.json();
    setAddressList(result);
    // setSuccess(true);
  } catch (error) {
    console.log('error in response');
  }
};
useEffect(() => {

  fetchAddressData();
}, [token]);

  useEffect(() => {
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    setCartItems(cart);

    const total = cart.reduce((acc, item) => acc + item.price, 0);
    setCartTotal(total);

  }, []);

  const handleRemoveItem = (itemId) => {
    const newCartItems = cartItems.filter((item) => item._id !== itemId);
    const total = newCartItems.reduce((acc, item) => acc + item.price, 0);
    
    setCartItems(newCartItems);
    setCartTotal(total);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  };
  
  const incrementItemQuantity = (index) => {
    const updatedCart = [...userCart];
    updatedCart[index].numberOfQuantity += 1;
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleDecrement = (index) => {
    const updatedCart = [...userCart];
    if (updatedCart[index].numberOfQuantity > 1) {
      updatedCart[index].numberOfQuantity -= 1;
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };
  

  const totalPrice = () => {
    try {
      const total = userCart.reduce(
        (acc, item) => acc + item.price * item.numberOfQuantity,
        0
      );
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/brainTree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log("Error fetching client token:", error);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  
  

  const handleCheckoutClick = async(event) => {
    // Code for handling checkout button click
    event.preventDefault();
    try {
      setLoading(true);
      const token=Cookies.get('token')
      const { nonce } = await instance.requestPaymentMethod();
      const selectedAddress = localStorage.getItem("selectedAddress");
      const response = await fetch(`http://localhost:5000/api/brainTree/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authentication":token
        },
        body: JSON.stringify({
          nonce,
          cartItems,
          selectedAddress,
        }),
      });
      const { ok } = await response.json();
      setLoading(false);
      alert(
        "Order placed and payment processed successfully; Continue shopping !",
        "success"
      );
      localStorage.removeItem("cart");
      setCartItems([]);
      localStorage.removeItem("selectedAddress")
      setTimeout(() => {
        
        navigate("/order");
      }, 4000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
  
  <div className="shopping-cart">
      <div className="cart-items">
        <h1 className="cart-heading">Shopping Cart</h1>
        <div className="items-list">
          {cartItems.map((item, index) => (
            <div className="item" key={item._id}>
              <img className="item-image" src={item.image_url} alt={item.name} />
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <p className="item-price">Price: &#8377;{item.price}</p>
                <div className="item-quantity">
                  <button className="quantity-btn" onClick={() => handleDecrement(index)}>
                    -
                  </button>
                  <span className="quantity">{item.numberOfQuantity }</span>
                  <button className="quantity-btn" onClick={() => incrementItemQuantity(index)}>
                    +
                  </button>
                </div>
                <button className="remove-btn" onClick={() => handleRemoveItem(item._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <button onClick={handleClearCart}> Clear Cart</button>
        </div>
      </div>
      <div className="order-summary">
        <div className="summary-details">
          <h5 className="summary-heading">Order Summary</h5>
          <div className="summary-row">
            <h6 className="summary-label">Subtotal:</h6>
            <h6 className="summary-value">{totalPrice()}</h6>
          </div>
          <div className="summary-row">
            <h6 className="summary-label">Delivery Charges:</h6>
            <h6 className="summary-value free-delivery">FREE</h6>
          </div>
          <div className="summary-row">
            <h6 className="summary-label">Total:</h6>
            <h6 className="summary-value total-price">{totalPrice()}</h6>
          </div>
          <div className="mb-3 addressCartContainer">
              <h5>Select an address:</h5>
              {addressList.addresses && addressList.addresses.length > 0 ? (
                <select
                  name="address"
                  onChange={(e) =>
                    localStorage.setItem("selectedAddress", e.target.value)
                  }
                >
                  <option value="" disabled>
                    Select an address
                  </option>
                  {addressList.addresses.map((address) => (
                    <option key={address._id} value={address._id}>
                      {address.street}, {address.city}, {address.state}{" "}
                      {address.zip}
                    </option>
                  ))}
                </select>
              ) : (
                <>
                  <p>No addresses found. </p>
                  <p>
                    Please{" "}
                    <a href="/profile" className="link">
                      add an address
                    </a>{" "}
                    before continuing.
                  </p>
                </>
              )}
            </div>
          <div className="checkout-btn-container">
          <div className="mt-2">
              {!clientToken || !userCart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleCheckoutClick}
                    // disabled={!instance}
                  >
                    {loading ? "Processing... " : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Cart;