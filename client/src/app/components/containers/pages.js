import { connect } from 'react-redux'
import { LoginView, RegisterView, Page404View, Page500View, DefaultLayoutView } from '../ui/Pages'
import { loginRequest, registerRequest } from '../../actions/auth'

export const Login = connect(
    ({auth}) => {return { token: auth.token}},
    dispatch => ({
        submit(username, password, cb) {
            dispatch(loginRequest({username, password}, cb))
        }
    })
)(LoginView)

export const Register = connect(
    null,
    dispatch => ({
        submit(username, fullname, email, password, cb) {
            dispatch(registerRequest({
                username,
                fullname,
                email,
                password,
            }, cb))
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