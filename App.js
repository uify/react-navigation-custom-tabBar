import React from "react";
import { Button, View, Text, SafeAreaView, TouchableWithoutFeedback, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/FontAwesome';

import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from 'react-navigation';

import Home from './Views/Home';
import Brand from './Views/Brand';
import Bag from './Views/Bag';
import Wishlist from './Views/Wishlist';
import Profile from './Views/Profile';


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
    tabBarComponent: (props) => {
        const {
            navigation: {state: {index, routes}},
            style,
            activeTintColor,
            inactiveTintColor,
            renderIcon,
            jumpTo
        } = props;
        return (
            <SafeAreaView style={{
                flexDirection: 'row',
                height: 50,
                width: '100%',
                ...style
            }}>
                {
                    routes.map((route, idx) => (
                        <SafeAreaView
                            key={route.key}
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <TouchableWithoutFeedback
                                onPress={() => jumpTo(route.key)}
                            >
                              <View style = {route.key == 'Bag' ? styles.customIcon : styles.defaultIcon}>
                                {renderIcon({
                                    route,
                                    focused: index === idx,
                                    tintColor: index === idx ? activeTintColor : inactiveTintColor
                                })}
                              </View>
                            </TouchableWithoutFeedback>
                        </SafeAreaView>
                    ))
                }
            </SafeAreaView>
        );
    },
    tabBarOptions: {
        showLabel: false,
        activeTintColor: '#000',
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

const styles = StyleSheet.create({
  customIcon: {
    backgroundColor: '#D7465A',
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    transform: [
      { translateY: -20}
    ]
  },
})

export default createAppContainer(createDrawerNavigator(
  {
    Tabs: {
      screen: Tabs
    }
  }

))