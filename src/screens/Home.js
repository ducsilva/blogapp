import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, LayoutAnimation } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, List, Headline } from 'react-native-paper';
import HTMLRender from 'react-native-render-html'
import moment from 'moment';
import * as firebase from 'firebase';

import styles from '../constants/style';

export default class Home extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            displayName: '',
            lastestpost: [],
            isFetching: false,
            page: 1
        };
    }

    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;
        this.setState({
            email, displayName
        }, () => this.fetchLastestPost())
    }

    async fetchLastestPost() {
        let page = this.state.page;
        const response = await fetch(`https://kriss.io/wp-json/wp/v2/posts?per_page=${page}`);
        const post = await response.json();
        this.setState({
            lastestpost: page === 1 ? post : [...this.state.lastestpost, ...post],
            isFetching: false
        })
    }

    onRefresh() {
        this.setState({ isFetching: true }, function () {
            this.fetchLastestPost()
        });
    }

    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1.
        }, () => this.fetchLastestPost())
    }

    signOutUser = () => {
        firebase.auth().signOut();
    }

    renderFooter = () => {
        if (this.state.isFetching) return null;
        return (
            <View style={styles.renderFooter}>
                <ActivityIndicator animating size="large" />
            </View>
        )
    }

    render() {
        LayoutAnimation.easeInEaseOut();
        return (
            <View>
                <Text style={{ textAlign: 'right', padding: 10 }}>Hi {this.state.displayName}!</Text>
                <TouchableOpacity style={styles.buttonLogout} onPress={this.signOutUser}>
                    <Text style={{ textAlign: 'right', paddingBottom: 10, color: '#fff', fontSize: 13 }}>Logout</Text>
                </TouchableOpacity>
                <Headline style={{ marginLeft: 30, marginTop: 20 }}>Lastest Post</Headline>
                <FlatList
                    data={this.state.lastestpost}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isFetching}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={this.renderFooter}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate('SinglePost', {
                                    post_id: item.id,
                                })
                            }
                        >
                            <Card
                                style={styles.card}>
                                <Card.Content>
                                    <Title>{item.title.rendered}</Title>
                                    <Paragraph>Published on {moment(item.date).fromNow()}</Paragraph>
                                </Card.Content>
                                <Card.Cover
                                    source={{ uri: item.jetpack_featured_media_url }}
                                />
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

