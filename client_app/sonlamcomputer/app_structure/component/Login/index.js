import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { connect } from 'react-redux'

import Button from "./../Button";
import HeadingText from "../HeadingText"
import NormalText from "../NormalText";
import LabeledInput from '../LabeledInput'

import * as AuthAction from '../../actions/auth'

class LoginPage extends Component {
    static displayName = "Login";
    constructor(props) {
        super(props)
        this.login = this.login.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    login() {
        console.log("login")
        this.props.login({}, (err, res) => {

        })
    }

    onChange() {

    }

    render() {
        return (
            <View>
                <View>
                    <HeadingText>Sonlamcomputer</HeadingText>
                </View>
                <View>
                    <LabeledInput 
                        label="Username"
                    />
                    <LabeledInput 
                        label="Password"
                    />
                    <Button onPress={this.login}>
                        <NormalText>Login</NormalText>
                    </Button>

                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch) => {
    return ({
        login: (user, cb) => {
            dispatch(AuthAction.loginRequest(user, cb))
        }
    })
}

export default connect(null, mapDispatchToProps)(LoginPage)