import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, Platform,ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Color from '../../constants/Color';
import { Ionicons } from '@expo/vector-icons';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersAction from '../../store/actions/order';

const OrdersScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();


    useEffect(() => {
        setIsLoading(true);
        dispatch(ordersAction.fetchOrders()).then(() => {
            setIsLoading(false);
        });

    }, [dispatch]);


    if(isLoading){
    return<View style={styles.centered }>
        <ActivityIndicator size='small' color={Color.primary}/>
    </View>
    }

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

export const styles= StyleSheet.create({
    centered:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default OrdersScreen;