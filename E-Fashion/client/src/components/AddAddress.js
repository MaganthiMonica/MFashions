import React,{useState}from "react";
import Axios from'axios';
import Cookies from "js-cookie";
import './AddAddress.css';
import { Link, useNavigate } from 'react-router-dom';
function Updateaddress(){
    const [houseNumber, setHouseNumber]=useState('');
    const [street, setStreet]=useState('');
    const[city,setCity]=useState('');
    const[state,setState]=useState('');
    const[country,setCountry]=useState('');
    const[zipCode,setZipCode]=useState('');
    const[success,setSuccess]=useState(false);
    const [unsuccess,setUnsuccess]=useState(false);
    const token=Cookies.get('token')
    const navigate =  useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault();
        // console.log(email);
        try{
            const response= await Axios.post("http://localhost:5000/api/new_address",{
                houseNumber,
                street,
                city,
                state,
                country,
                zipCode,
        },
        {
           headers:{"authentication":token}
        }
     
            );
            
            console.log(response)
            if (response!==400){
                setSuccess(true);
                setUnsuccess(false);
                setTimeout(()=>{
                    navigate('/profile')
                },2000)
            }
            
            
        }
        catch(errors){
             console.log('xyz');
            setSuccess(false)
            setUnsuccess(true)
           
        }
    }
        
    
    
      return (
        <div className="auth-form-container">
         
          <form className="address-form" onSubmit={handleSubmit}>
          <h1 className="title5"> Address</h1>
            <div className="form-group">
              <label htmlFor="houseNumber" className="form-label">House Number</label>
              <input
                type="number"
                id="houseNumber"
                value={houseNumber}
                placeholder="House Number"
                onChange={(e) => setHouseNumber(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="street" className="form-label">Street</label>
              <input
                type="text"
                id="street"
                value={street}
                placeholder="Street"
                onChange={(e) => setStreet(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                id="city"
                value={city}
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="state" className="form-label">State</label>
              <input
                type="text"
                id="state"
                value={state}
                placeholder="State"
                onChange={(e) => setState(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="country" className="form-label">Country</label>
              <input
                type="text"
                id="country"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="zipCode" className="form-label">Zip Code</label>
              <input
                type="text"
                id="zipCode"
                placeholder="Zip Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
            {success && <div className="success-message">Address updated successfully.</div>}
            {unsuccess && <div className="error-message">Failed to update address.</div>}
          </form>
        </div>
      );
    }
    

export default Updateaddress;