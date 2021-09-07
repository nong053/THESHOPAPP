import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Platform, Text, Button, ActivityIndicator, View, StyleSheet } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productsAction from '../../store/actions/products';
import HeaderButton from '../../components/UI/HeaderButton';
import Color from '../../constants/Color';

const ProductsOverViewScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const products = useSelector(state => state.products.avaibleProducts);

    const dispatch = useDispatch();




    const loadProducts = useCallback(async () => {
        setError(null)
        setIsLoading(true);

        try {
            await dispatch(productsAction.fetchProducts());
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, setIsLoading, setError]);


    useEffect(() => {
        loadProducts();
    }, [dispatch, loadProducts])



    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail'
            , {
                productId: id,
                productTitle: title
            });
    }

    if (error) {
        return <View style={styles.centered}>
            <Text>An error occured</Text>
            <Button title='Try again' onPress={loadProducts} color={Color.primary}/>
        </View>
    }

    if (isLoading) {
        return <View style={styles.centered}><Text>Loadding</Text>
            <ActivityIndicator size='large' color={Color.primary} />
        </View>
    }

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products found. maybe start adding some!</Text>
            </View>
        )
    }


    return (<FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={itemData =>
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => {
                    selectItemHandler(itemData.item.id, itemData.item.title);
                }}

            >
                <Button
                    color={Color.primary}
                    title="View Details"
                    onPress={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title);
                    }} />
                <Button
                    color={Color.primary}
                    title="To Cart"
                    onPress={() => {
                        dispatch(cartActions.addToCart(itemData.item));
                    }} />

            </ProductItem>}
    ></FlatList>);
}
ProductsOverViewScreen.navigationOptions = navData => {
    return {
        headerTitle: "All Products",
        headerLeft: () => (
            <Button
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
                title="Menu"
                color={Color.primary}



            />
        ),
        headerRight: () => (
            <Button
                onPress={() => {
                    navData.navigation.navigate("Cart");
                }}
                title="Cart"
                color={Color.primary}

                icon={{
                    name: "md-cart",
                    size: 15,
                    color: "white"
                }}

            />


        )
    }
};

const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default ProductsOverViewScreen;
