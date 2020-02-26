import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { List, Icon } from 'react-native-paper';

import styles from '../constants/style';

export default class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Contact')}
                >
                    <List.Item
                        title="Contact Us"
                        left={() => <List.Icon icon="chevron-right" />}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

