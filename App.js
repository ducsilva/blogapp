import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './src/screens/Home';
import Categories from './src/screens/Categories';
import Setting from './src/screens/Setting';
import Bookmark from './src/screens/Bookmark';
import SinglePost from './src/screens/SinglePost';
import CategorieList from './src/screens/CategoriesList';
import Contact from './src/screens/Contact';
import Loading from './src/screens/Loading';
import Login from './src/screens/Login';
import Register from './src/screens/Register';

import * as firebase from 'firebase';
import FirebaseKeys from './config';
var firebaseConfig = FirebaseKeys
firebase.initializeApp(firebaseConfig);

const DashboardTabNavigator = createBottomTabNavigator(
  {
    HomePage: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        headerTitle: null,
        tabBarIcon: () => <Ionicons name="md-home" size={30} />,
      },
    },

    Categories: {
      screen: Categories,
      navigationOptions: {
        tabBarLabel: 'Categories',
        tabBarIcon: () => <Ionicons name="md-apps" size={30} />,
      },
    },
    Bookmark: {
      screen: Bookmark,
      navigationOptions: {
        tabBarLabel: 'BookMark',
        tabBarIcon: () => <Ionicons name="ios-bookmark" size={30} />,
      },
    },

    Setting: {
      screen: Setting,
      navigationOptions: {
        tabBarLabel: 'Setting',
        tabBarIcon: () => <Ionicons name="md-settings" size={30} />,
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
      };
    },
  },
);

const AuthStack = createStackNavigator({
  Login: Login,
  Register: Register,
})

const StackNavigator = createStackNavigator({
  DashboardTabNavigator: DashboardTabNavigator,
  SinglePost: SinglePost,
  CategorieList: CategorieList,
  Contact: Contact
});

const App = createSwitchNavigator({
  Loading: Loading,
  App: StackNavigator,
  Auth: AuthStack
}, {
  initializeApp: "Loading"
})
export default createAppContainer(App);