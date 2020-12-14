import React, {Fragment, useLayoutEffect, useState} from 'react';
import logo from "../../img/mudra_logo.png";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from "../../actions/auth";
import PropTypes from 'prop-types';
import ClickAwayListener from "react-click-away-listener";
import { setNewTimer, setTime } from "../../actions/maintime";


const Navbar = ({ auth: { isAuthenticated, loading, user, loginpage }, logout, setTime, setNewTimer }) => {
    const [open, handleOpen] = useState(false);

    const authLinks = (
        <nav>
            <ul>
                <ClickAwayListener onClickAway={() => handleOpen(false)}>
                    {user !== null &&
                    <li onClick={() => handleOpen(!open)}>Hi, {user.name} &#8595;</li>
                    }
                    {open && (
                        <div>
                            <div className="triangle"> </div>
                            <ul onClick={() => {logout(); handleOpen(!open); setTime("20:00"); setNewTimer() }} className="dropdown-menu">
                                <li><span>Logout</span></li>
                            </ul>
                        </div>
                    )}
                </ClickAwayListener>
            </ul>
        </nav>
    )

    const guestLinks = (
        <nav>
            <ul onClick={setNewTimer} className="sign-up-menu">
                <li className={`set-new sign-up ${loginpage && "loginpage"}`}><Link to="/register">Sign Up</Link></li>
                <li className={`set-new log-in ${loginpage && "loginpage"}`}><Link to="/login">Log In</Link></li>
            </ul>
        </nav>
    )

    return(
        <Fragment>
            {!isAuthenticated &&
                <header>
                    <div>
                        <h1>MEDITATION TIMER</h1>
                    </div>
                </header>
            }

            <Link to="/" className={`logo ${isAuthenticated && "logo-dashboard"}`}>
                <img src={logo} alt=""/>
            </Link>


            <Fragment>
                { isAuthenticated ? authLinks : guestLinks }
            </Fragment>


            {!isAuthenticated &&
                <footer>
                    <div>
                        <h2>MUDRA</h2>
                    </div>
                </footer>
            }
        </Fragment>

    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout, setTime, setNewTimer })(Navbar);