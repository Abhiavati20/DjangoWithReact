import React from 'react';
import {useEffect,useState} from 'react';
import './Header.css';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Close from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu'
import logo1  from './logo1.png'
// import { useHistory } from 'react-router-dom'
import { Button  } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions'
function Header({history}) {
    // const history =useHistory();
    const [show, handleShow] = useState(false);
    const userLogin =useSelector(state=>state.userLogin)
    const {userInfo} = userLogin 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    const handleClick1 = (event) => {
      setAnchorEl(event.currentTarget);
      event=anchorEl
    };
    
    // const handleClose = () => {
    //   setAnchorEl(null);
    // };
    useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
      });
      return () => {
        window.removeEventListener("scroll", handleShow());
      };
    }, []);
    const logoutHandler=()=>{
      dispatch(logout())
    }
    
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <div className={`navbar ${show && "navbar__black"}`}>
      <div className="navbar__logo">
        <img src={logo1} alt="logo" width="120px" height="50px" />
        {/* Sadhana Tea Depot */}
      </div>
      <div className="navbar__right">
        <p>My Cart</p>
        {
          userInfo? (
            <>
              <a href='/#/profile' onClick={handleClick1} >
                My Profile
              </a>
              <span onClick={logoutHandler}>Logout</span>

            </>
          ):
            <a href='/#/login'>Sign In/up</a>
        }
        {
          userInfo && userInfo.isAdmin && (
            <>
              <a href='/#/admin/userList'>
                  Admin Page
              </a>
              <a href='/#/admin/productList'>
                  products
              </a>
              <a href='/#/admin/orderList'>
                  orders
              </a>
            </>
          )
        }
        
      </div>
      <div className="menu">
        <div className="mobile-menu" onClick={handleClick}>
          {click ? (
            <Close className="menu-icon" />
          ) : (
            <MenuIcon className="menu-icon" />
          )}
        </div>
        <div className={` ${!click && "menu__option"}`}>
            <p>My Cart</p>
          
          {
          userInfo? (
            <div style={{display:'flex',flexDirection:'column',textDecoration:'none',cursor:'pointer',}}>
              <a style={{color:'black'}}href='/profile' onClick={handleClick1} >
                {userInfo.name}
              </a>
              <span style={{cursor:'pointer'}}onClick={logoutHandler}>Logout</span>
          
            </div>
          ):
            <Button
              style={{ textTransform: "none", marginLeft: "5px" }}
              variant="contained"
              color="primary"
              href='/login'
            >
              Sign In/Up
            </Button>
        }
        </div>
      </div>
    </div>
  );
}

export default Header
