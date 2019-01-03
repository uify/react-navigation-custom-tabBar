import React from "react";
import { Button, View, Text, SafeAreaView, TouchableWithoutFeedback, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/FontAwesome';

import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from 'react-navigation';

import Home from './views/Home';
import Brand from './views/Brand';
import Bag from './views/Bag';
import Wishlist from './views/Wishlist';
import Profile from './views/Profile';

import TabBar from './components/tabBar';


/* declaration of stacks */
const HomeStack = createStackNavigator({
  home: Home
})
const BrandStack = createStackNavigator({
  brand: Brand
})
const BagStack = createStackNavigator({
  bag: Bag
})
const WishlistStack = createStackNavigator({
  wishlist: Wishlist
})
const ProfileStack = createStackNavigator({
  profile: Profile
})

const Tabs = createBottomTabNavigator(
  {
    Home: HomeStack,
    Brand: BrandStack,
    Bag: BagStack,
    Wishlist: WishlistStack,
    Profile: ProfileStack
  },{
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home`;
        } else if (routeName === 'Brand') {
          iconName = `star`;
        } else if (routeName === 'Bag') {
          iconName = `shopping-bag`;
        } else if (routeName === 'Wishlist') {
          iconName = `heart`;
        } else if (routeName === 'Profile') {
          iconName = `user`;
        }

        return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
    tabBarComponent: (props) => <TabBar {...props}/>,
    tabBarOptions: {
        tabFeatured: 'Bag',
        backgroundFeaturedIcon: '#D7465A',
        activeFeaturedTintColor: 'skyblue',
        inactiveFeatureTintColor: 'white',
        showLabel: true,
        activeTintColor: '#D7465A',
        inactiveTintColor: '#E1E3DB',
        style: {
            height: 80,
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#F2F3EF'
        },
        tabStyle: {}
    }
});

export default createAppContainer(createDrawerNavigator(
  {
    Tabs: {
      screen: Tabs
    }
  }

))