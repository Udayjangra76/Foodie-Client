import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../pages/Cart';
export default function Navbar() {
    const [cartView, setCartView] = useState(false)
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userEmail');
        navigate("/login")
    }

    const loadCart = () => {
        setCartView(true)
    }

    const items = useCart();
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark position-sticky m-0 p-0" style={{ backgroundColor: "#FFA500", }}>
                <div className="container-fluid  m-0 p-0">
                    <Link className="navbar-brand m-0 b-0 p-0" to="/"><img src="images/Foodie.png" alt="" style={{ width: "90px", height: "50px", borderRadius: "2px" }} /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myOrder" >My Orders</Link>
                            </li>
                        </ul>
                        <div>
                            {(!localStorage.getItem("token")) ?
                                <form className="d-flex">
                                    <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>
                                    <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
                                </form> :
                                <div>
                                    <div className="btn bg-white text-success mx-2 m-0  " onClick={loadCart}>
                                        <Badge color="secondary" badgeContent={items.length} overlap="rectangular" >
                                            <ShoppingCartIcon />
                                        </Badge>
                                        Cart
                                    </div>
                                    {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                                    <button onClick={handleLogout} className="btn bg-white text-success mx-2 " >Logout</button></div>}
                        </div>
                    </div>
                </div>
            </nav >
        </div >
    )
}
