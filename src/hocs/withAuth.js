import React, { useEffect } from 'react'
import { connect } from 'react-redux'

export default function withAuth(Component) {
    const {history, isAuthenticated} = props
    function Authenticate() {
        useEffect(() => {
            if(isAuthenticated === false) {
                history.push("/signin")
            }
        }, [isAuthenticated])
        return(
            <Component {...props} />
        )
    }

    function mapStateToProps(state) {
        return { isAuthenticated: state.currentUser.isAuthenticated }
    }

    return connect(mapStateToProps)(Authenticate)
}