import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";

import Button from "./../Button";
import HeadingText from "../HeadingText"
import NormalText from "../NormalText";
import LabeledInput from '../LabeledInput'

class LoginPage extends Component {
    static displayName = "Login";

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
                    <Button>
                        <NormalText>Login</NormalText>
                    </Button>

                </View>
            </View>
        )
    }
}

export default LoginPage