import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import React,{useState} from 'react';
import { useEffect } from 'react';
import './navBar.css';


const NavBar = () => {
    const [LoggedIn, setLoggedIn] = useState(false);

useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const navigate = useNavigate()
  const handleProfile = () =>{
    navigate('/profile')
  }

const handleCart = () =>{
  navigate('/cartPage')
}
  const handleLogout = () => {
    // handle logout logic
    Cookies.remove('token');
    navigate('/login')
  };

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <img src={require('../assets/logo-png.png')} alt="" className="logo" />
            <span className="logo-name">M Fashion</span>
          </Link>
        </div>
        <div className="navbar-middle">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/contact" className="nav-link">Contact</Link>
            </li> */}
            <li className="nav-item">
              <Link to="/Shop" className="nav-link">Shop</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-right">
          <ul className="navbar-nav">
            {/* <li className="nav-item">
              <Link className="btn btn-outline-primary mr-2" role="button" to="/login">Log In</Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-primary" role="button" to="/signup">Sign Up</Link>
            </li>  */}  {Cookies.get('token') ? (
              <>
              <button
                className="btn btn-primary px-2"
                id="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button className="btn btn-outline-primary" id="profile-btn" onClick={handleProfile}>
                 Profile
              </button>
              <button className="btn btn-outline-primary" id="profile-btn" onClick={handleCart}>
              <img   style={{width:"30px", height:"30px"}}
                            src={require("../assets/shopping-cart.png")}
                            alt="Cart"
                          />
              </button>
            </>
          ) : (
            <>
              <Link to="/signup">
                <button className="btn btn-primary" id="signup-btn">
               signup
                 
                </button>
              </Link>
              <Link to="/login">
                <button className="btn btn-outline-primary" id="login-btn">
               login
                 
                </button>
              </Link>
            </>
          )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

