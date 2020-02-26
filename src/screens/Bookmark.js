import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Headline, Card, Title, Paragraph } from 'react-native-paper';
import HTMLRender from 'react-native-render-html';
import { withNavigationFocus } from 'react-navigation';

import AsyncStorage from '@react-native-community/async-storage';

import styles from '../constants/style';
import moment from 'moment';


class Bookmark extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bookmark_post: [],
            isFetching: false,
        }
    }

    async fetchBookMark() {
        let bookmark = await AsyncStorage.getItem('bookmark').then(token => {
            const res = JSON.parse(token);
            if (res != null) {
                const result = res.map(post_id => {
                    return 'include[]=' + post_id
                });
                return result.join('&');
            } else {
                return null;
            }
        });
        const response = await fetch(
            `https://kriss.io/wp-json/wp/v2/posts?${bookmark}`
        );
        const post = await response.json();
        this.setState({ bookmark_post: post });
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.fetchBookMark();
        });
    }

    render() {
        return (
            <View>
                <Headline style={{ marginTop: 30, marginLeft: 20 }}>Bookmark Post</Headline>
                <FlatList
                    data={this.state.bookmark_post}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('SinglePost', {
                                post_id: item.id,
                            })}
                        >
                            <Card style={styles.card}>
                                <Card.Content>
                                    <Title>{item.title.rendered}</Title>
                                    <Paragraph>
                                        Published on {moment(item.date).fromNow()}
                                    </Paragraph>
                                </Card.Content>
                                <Card.Cover source={{ uri: item.jetpack_featured_media_url }} />
                                <Card.Content>
                                    <Card.Content>
                                        <HTMLRender html={item.excerpt.rendered} />
                                    </Card.Content>
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        )
    }
}

export default withNavigationFocus(Bookmark);