import React from 'react';
import {
    View,
    Text,
    FlatList,
    Button,
    StyleSheet
} from 'react-native';


import { useSelector, useDispatch } from 'react-redux';
import Color from '../../constants/Color';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as ordersAcions from '../../store/actions/order';

const CartScreen = pros => {

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum

            });
        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);

    });

    const dispatch = useDispatch();

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:<Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
                </Text>
                <Button color={Color.accest} title="Order Now"
                    disabled={cartItems.length === 0}
                    onPress={() => {
                        dispatch(ordersAcions.addOrder(cartItems, cartTotalAmount,))
                    }}
                />
            </View>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData =>
                    <CartItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        deleteable
                        onRemove={() => {
                            dispatch(cartActions.removeFromCart(itemData.item.productId));
                        }}

                    />}
            />
        </View>
    );
};

CartScreen.navigationOptions = navData => {
    return {
        headerTitle: "Your Cart"
    }

};

const styles = StyleSheet.create({

    screen: {
        margin: 20
    },
    summary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Color.accest
    }
});

export default CartScreen;