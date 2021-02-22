import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import Homepage from '../components/Homepage'
import { authUser } from "../store/actions/auth"
import { removeError } from "../store/actions/error"

const Main = props => {
    const { authUser, errors, removeError, currentUser } = props
    return (
        <div className="container">
            <Switch>
                <Route exact path="/" render={props => <Homepage currentUser={currentUser} {...props} />} />
                <Route exact path="/signin"
                    render={props => (
                        <AuthForm
                            removeError={removeError}
                            errors={errors}
                            onAuth={authUser}
                            buttonText="Log in"
                            heading="Welcome back"
                            {...props}
                        />
                    )
                    } />
                <Route exact path="/signup"
                    render={props => (
                        <AuthForm
                            removeError={removeError}
                            errors={errors}
                            onAuth={authUser}
                            signup
                            buttonText="Sign Up"
                            heading="Join App today"
                            {...props}
                        />
                    )
                    } />
            </Switch>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors
    }
}


export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main))