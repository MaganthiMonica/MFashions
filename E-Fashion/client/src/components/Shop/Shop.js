import React, { useEffect, useState } from 'react';
import './Shop.css'
import Axios from'axios';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
const Shop = () => {
  const [userProduct, setUserProduct] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [cartItems, setCartItems] = useState([])
  console.log(cartItems)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await Axios.get('http://localhost:5000/api/get_product');
        if (response.status !== 400) {
          setUserProduct(response.data.products);
        }
      } catch(error) {
        console.log('Error in response:', error);
      }
    };

    fetchProduct();
  }, []);

const handleAddCart = (event, product) =>{
  event.preventDefault();
  const token = Cookies.get('token');
  if (!token) {
toast.warning("please login")
      setTimeout(() => {
          
          navigate('/login');
      }, 3000);
  } else {
    try {
      const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
      const existingProductIndex = cart.findIndex((item) => item._id === product._id);
      if (existingProductIndex > -1) {
        // If the current product already exists, update its quantity and count
        cart[existingProductIndex].numberOfQuantity += 1;        toast.success("Item quantity updated in cart",{
         
          autoClose: 2000,
          hideProgressBar: true,
        
          });
      } else {
        const newItem = { ...product, numberOfQuantity: 1 };
        cart.push(newItem);
        toast.success("Item added to cart",{
         
          autoClose: 2000,
          hideProgressBar: true,
        
          });
      }
      setCartItems(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error adding item to cart", error);
    }
    
    
  }
}


  const filterProductsByPriceRange = (priceRange) => {
    setSelectedPriceRange(priceRange);
  };

  const filterProductsWithPriceRange = (products) => {
    switch (selectedPriceRange) {
      case '100-500':
        return products.filter(product => product.price >= 100 && product.price < 500);
      case '500-1000':
        return products.filter(product => product.price >= 500 && product.price < 1000);
      case '1000-2000':
        return products.filter(product => product.price >= 1000 && product.price < 2000);
      case '2000+':
        return products.filter(product => product.price >= 2000);
      default:
        return products;
    }
  };

  const filteredProducts = filterProductsWithPriceRange(userProduct);

  return (
<>
    <div>
      {/* Price filter dropdown */}
      <div class="price-filter">
  <label class="price-filter__label" for="category-select">Price:</label>
  <select class="price-filter__select" id="category-select" value={selectedPriceRange} onChange={(e) => filterProductsByPriceRange(e.target.value)}>
    <option value="">All</option>
    <option value="100-500">Rs. 100 - Rs. 500</option>
    <option value="500-1000">Rs. 500 - Rs. 1000</option>
    <option value="1000-2000">Rs. 1000 - Rs. 2000</option>
    <option value="2000+">Rs. 2000 and above</option>
  </select>
</div>


      {/* Shop product */}
      <div className="shop-product">
        <div className="product-cards">
          {/* Check that filteredProducts is an array before calling map */}
          {Array.isArray(filteredProducts) && filteredProducts.map((data, index) => (
            <form className="product-card" key={index}>
              <img className="product-image" src={data.image_url} alt={data.name} />
              <p className="product-name">{data.name}</p>
              <p className="product-description">{data.description}</p>
              <p className="product-price">{data.price}</p>
              <p className="product-color">{data.color}</p>
              <button className="add-to-cart-button" onClick={(event) => handleAddCart(event, data)}>Add to cart</button>
            </form>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default Shop;
