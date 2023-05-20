import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const token = Cookies.get('token');
  const [addressList, setAddressList] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: { authentication: token },
        });
        setUserData(response.data);
      } catch (error) {
        console.log('error in response');
      }
    };
    fetchData();
  }, [token]);

  const fetchAddressData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/get_address', {
        headers: { authentication: token },
      });
      const result = await response.json();
      setAddressList(result);
      setSuccess(true);
    } catch (error) {
      console.log('error in response');
    }
  };
  useEffect(() => {

    fetchAddressData();
  }, [token]);

  const handleAddressDelete = async (addressId) => {
    const response = await fetch(
      `http://localhost:5000/api/address/deleteAddress/${addressId}`,
      {
        method: "DELETE",
        headers: { authentication: token }
      }
    );
    const resData = await response.json();
    if (resData.success === "Address deleted successfully") {
      alert("Address deleted successfully!");
      fetchAddressData();
    } else {
      console.log("Error");
    }
  };

  return (
    <div className='profile'>
      <form className='profile-info'>
        <h1>USER DETAILS</h1>
        <h3 className='profile-name'>{userData.name}</h3>
        <p className='profile-email'>Email: {userData.email}</p>
        <p className='profile-phone'>Phone: {userData.phone}</p>
      </form>

      <form className='address-list'>
        {success && (
          <div className='address-table'>
            <table className='address-table__table'>
              <thead className='address-table__head'>
                <tr className='address-table__row'>
                  <th className='address-table__cell'>Address</th>
                  <th className='address-table__cell'>Street</th>
                  <th className='address-table__cell'>City</th>
                  <th className='address-table__cell'>State</th>
                  <th className='address-table__cell'>Country</th>
                  <th className='address-table__cell'>Pin-Code</th>
                  <th className='address-table__cell'>Delete</th>
                </tr>
              </thead>
              <tbody className='address-table__body'>
                {addressList && addressList.addresses && addressList.addresses.length > 0 ? (
                  addressList.addresses.map((address, index) => (
                    <tr key={index} className='address-table__row'>
                      <td className='address-table__cell'>{address.houseNumber}</td>
                      <td className='address-table__cell'>{address.street}</td>
                      <td className='address-table__cell'>{address.city}</td>
                      <td className='address-table__cell'>{address.state}</td>
                      <td className='address-table__cell'>{address.country}</td>
                      <td className='address-table__cell'>{address.zipCode}</td>
                      <td className='address-table__cell'><img
                          src={require("../assets/trash.png")}
                          alt="Cart"
                          style={{
                            height: "20px",
                            width: "20px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleAddressDelete(address._id)}
                        /></td>
                    </tr>
                  ))
                ) : (
                  <tr className='address-table__row'>
                    <td className='address-table__cell' colSpan="7">No addresses found.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <Link to='/addAddress'>
              <button className='address-table__add-btn'>ADD</button>
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
