import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import Logo from '../images/dog.jpg'
import {logout} from "../store/actions/auth"

function Navbar(props) {
    const {logout, currentUser} = props
    const logoutUser = (e) => {
        e.preventDefault()
        logout()
    }
    return(
        <>
        <nav className="navbar navbar-expand">
            <div className="container-fluid">
               <Link to="/" className="navbar-brand">
                   <img src={Logo} alt="warbler-home" />
                   </Link> 

            
                {currentUser.isAuthenticated ? (
                    <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to={`/users/${currentUser.user.id}/messages/new`}>New Message</Link>
                    </li>
                    <li>
                        <p onClick={logoutUser}>Log Out</p>
                    </li>
                    </ul>
                ) : (
                    <ul className="nav navbar-nav navbar-right">
                    <li>
                    <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                    <Link to="/signin">Sign In</Link>
                </li>
                </ul>
                )}
            </div>
        </nav>
      </>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, {logout})(Navbar)