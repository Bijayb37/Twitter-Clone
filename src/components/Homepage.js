import React from "react"
import { Link } from "react-router-dom"
import MessageList from "../containers/MessageList"

const Homepage = props => {
    const {currentUser} = props
    if(!currentUser.isAuthenticated) {
        return(
            <div className="home-hero">
                <h1>Whats new in the world</h1>
                <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </div>
        )
    }
    return (
        <div className="container">
            <MessageList />
        </div>
    )

}

export default Homepage