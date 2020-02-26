import React from 'react';
import { View, TouchableOpacity, Text, Alert, ActivityIndicator, Image } from 'react-native';
// import firebase from 'react-native-firebase';
import * as firebase from 'firebase';
import t from 'tcomb-form-native';

import styles from '../constants/style';

export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submit: false
        };
    }

    handleOnSubmit = async () => {
        const value = this._form.getValue();
        firebase
            .database()
            .ref('contact/')
            .push(value)
            .then(res => {
                Alert.alert('Thank for reaching me');
            })
            .catch(err => {
                console.error(err);
            })
    }

    render() {
        const Form = t.form.Form;
        const options = {
            fields: {
                message: {
                    multiline: true,
                    stylesheet: {
                        ...Form.stylesheet,
                        textbox: {
                            ...Form.stylesheet.textbox.normal,
                            height: 150,
                        },
                        error: {
                            ...Form.stylesheet.textbox.error,
                            height: 150,
                        }
                    }
                }
            }
        }
        const ContactForm = t.struct({
            email: t.String,
            name: t.String,
            message: t.String,
        });
        return (
            <View style={styles.containerForm}>
                <Form
                    type={ContactForm}
                    ref={c => (this._form = c)}
                    options={options}
                />
                <TouchableOpacity
                    style={styles.buttonForm}
                    onPress={() => this.handleOnSubmit()}
                >
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}