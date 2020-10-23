import React, {Fragment} from 'react';
import logo from "../img/mudra_logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <Fragment>
            <header>
                <div>
                    <h1>MEDITATION TIMER</h1>
                </div>
            </header>
            <Link to="/" className="logo">
                <img src={logo} alt=""/>
            </Link>
            <nav>
                <ul>
                    <li><Link to="/register">Sign Up</Link></li>
                    <li><Link to="/login">Log In</Link></li>
                </ul>
            </nav>
            <footer>
                <div>
                    <h2>INFO</h2>
                </div>
            </footer>
        </Fragment>

    )
}

export default Navbar;