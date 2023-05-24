import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./Order.css"

const Order = () => {
    const [orders, setOrders] = useState([]);
    
console.log(orders)

   
    const fetchOrders = async () => {
        try {
            const token=Cookies.get('token')
          const response = await fetch(`http://localhost:5000/api/getOrders`, {
            method: "GET",
            headers: {
                "authentication":token
            },
          });
          const resultData = await response.json();
          
          setOrders(resultData);
        } catch (error) {
          console.log(error);
        }
      };
      const handleOrderCancel = async (orderId) => {
        const token=Cookies.get('token')
        const response = await fetch(`http://localhost:5000/api/cancelOrders/${orderId}`, {
          method: "PUT",
          headers: {
            "authentication":token
          },
        });
        const resData = await response.json();
        if (resData.success) {
          alert("Order Cancelled successfully!", "warning");
          fetchOrders();
        } else {
          console.log("Error");
        }
      };
    
      useEffect(() => {
        fetchOrders();
      }, []);
      return (
        <div className="order-container">
        <h3 className="order-title">All Orders</h3>
        <table className="order-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Products</th>
              <th>Payment Status</th>
              {/* <th>Status</th> */}
              <th>Created At</th>
              <th>Shipping Address</th>
              <th>Cancel </th>
              {/* <th>Cancel</th> */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>
                  {order.products.map((product, index) => (
                    <div className="product-item" key={index}>
                      <img
                        src={product.image_url}
                        width="50"
                        height="50"
                        alt={product.name}
                      />
                      <span className="product-name">{product.name}</span>
                    </div>
                  ))}
                </td>
                <td
                  className={`payment-status ${order.payment.success ? "" : order.status === "Cancelled" ? "refunded" : "not-paid"}`}
                >
                  {order.payment.success ? "Paid" : order.status === "Cancelled" ? "Refunded" : "Not Paid"}
                </td>
                {/* <td className={`order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </td> */}
                <td className="order-date">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td>
                  {order.shippingAddress?.street ?? 'null'},
                  {order.shippingAddress?.city ?? 'null'},
                  {order.shippingAddress?.state ?? 'null'},
                  {order.shippingAddress?.zipCode ?? 'null'}
                </td>
                <td>
     
               
                  <button  style={{

                cursor:
                order.status === "Cancelled"
                    ? "not-allowed"
                    : "pointer",
                opacity:
                 
                order.status === "Cancelled"
                    ? 0.5
                    : 1,
              }}  
              onClick={() =>
              
                handleOrderCancel(order._id)
              }>
                    Cancel
                  </button>
                </td>
                
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      );
    };
    
   
export default Order
