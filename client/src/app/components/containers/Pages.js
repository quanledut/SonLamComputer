import { connect } from 'react-redux'
import { LoginView, RegisterView, Page404View, Page500View, DefaultLayoutView } from '../ui/Pages'
import { loginRequest, registerRequest } from '../../actions/auth'

export const Login = connect(
    ({auth}) => {return { token: auth.token, loginError: auth.loginError}},
    dispatch => ({
        submit(username, password) {
            dispatch(loginRequest({username, password}))
        }
    })
)(LoginView)

export const Register = connect(
    null,
    dispatch => ({
        submit(username, email, password, repeatPassword) {
            dispatch(registerRequest({
                username,
                email,
                password, 
                repeatPassword
            }))
        }
    })
)(RegisterView)

export const Page404 = connect(
    null, null
)(Page404View)

export const Page500 = connect(
    null, null
)(Page500View)

export const DefaultLayout = connect(
    null, null
)(DefaultLayoutView)