import React from 'react';
import { FlatList, Platform, Text, Button } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import HeaderButton from '../../components/UI/HeaderButton';
import Color from '../../constants/Color';

const ProductsOverViewScreen = props => {
    const products = useSelector(state => state.products.avaibleProducts);

    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail'
            , {
                productId: id,
                productTitle: title
            });
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
                    onPress={()=>{
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

export default ProductsOverViewScreen;
