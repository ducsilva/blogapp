import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation } from 'react-native';
import * as firebase from 'firebase';

import styles from '../constants/style';

export default class Login extends React.Component {
    static navigationOptions = {
        header: null
    }
    state = {
        email: "",
        password: "",
        errorMessage: null
    }

    handleLogin = () => {
        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password).catch(error => this.setState({ errorMessage: error.message }));
    }

    render() {
        LayoutAnimation.easeInEaseOut();
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content"></StatusBar>
                <Image
                    source={require("../assets/authHeader.png")}
                    style={{ marginTop: -250, marginLeft: -50 }}
                ></Image>
                <Image source={require("../assets/authFooter.png")} style={{ position: "absolute", bottom: -325, right: -225 }}></Image>
                <Image source={require("../assets/loginLogo.png")} style={{ marginTop: -110, alignSelf: "center" }}></Image>
                <Text style={styles.greeting}>{`Hello again.\nWelcome back.`}</Text>
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        ></TextInput>
                    </View>
                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            secureTextEntry
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleLogin}
                >
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ alignSelf: 'center', marginTop: 32 }}
                    onPress={() => this.props.navigation.navigate("Register")}
                >
                    <Text style={{ color: "#414959", fontSize: 13 }}>
                        New to BlogApp ? <Text style={{ fontWeight: "500", color: "#E9446A" }}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}