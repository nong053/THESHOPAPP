import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'

import ProductsOverViewScreen from '../screens/shop/ProductsOverViewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

import { Ionicons } from '@expo/vector-icons';

import Color from '../constants/Color';
const defaultNavOption = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Color.primary : ''
    },
    headerTitleStyle: {
        fontFamily: "open-sans-bold"
    },
    headerBackTitleStyle: {
        fontFamily: "open-sans"
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary

}

const ProductsNavigator = createStackNavigator({
    ProductsOverView: ProductsOverViewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            size={23}
            color={drawerConfig.tintColor}
        />
    },
    defaultNavigationOptions: defaultNavOption
});

// const MyDrawerNavigator = createDrawerNavigator({
//     Home: {
//         screen: ProductsOverViewScreen,
//     },
//     Notifications: {
//         screen: ProductDetailScreen,
//     },
// });

const OrdersNavigator = createStackNavigator({
    orders: OrdersScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
            size={23}
            color={drawerConfig.tintColor}
        />
    },
    defaultNavigationOptions: defaultNavOption
});


const AdminNavigator = createStackNavigator({
    UserProducts: UserProductScreen,
    EditProduct:EditProductScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            size={23}
            color={drawerConfig.tintColor}
        />
    },
    defaultNavigationOptions: defaultNavOption
});

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin:AdminNavigator
}, {
    contentOptions: {
        actionTintColor: Color.primary
    }
});


export default createAppContainer(ShopNavigator);
