import React from 'react';
import { View, FlatList, Text, Button, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import Color from '../../constants/Color';
import { Ionicons } from '@expo/vector-icons';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);
    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => (
            <OrderItem
                amount={itemData.item.totalAmount}
                date={itemData.item.readableDate}        
                items={itemData.item.items}
            />
            )}
        />
    );
}

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: "Your Orders1",
        headerLeft: () => (
            <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                size={23}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
                color={'white'}
            />

            // <Button
            //     onPress={() => {
            //         navData.navigation.toggleDrawer();
            //     }}
            //     title="Menu"
            //     color={Color.primary}



            // />
        ),
    }

};

export default OrdersScreen;