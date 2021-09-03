import React from 'react';
import {Alert, FlatList, View, Text, Button, StyleSheet } from 'react-native';
import ProductItem from '../../components/shop/ProductItem'
import { useSelector,useDispatch } from 'react-redux';
import Color from '../../constants/Color';
import * as productsActions from '../../store/actions/products'




const UserProductScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch();
    

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delte this item?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes',
                style: 'destructiive',
                onPress: () => {
                    dispatch(productsActions.deleteProduct(id));
                }
            }
        ]);
    }
    
    const editProductHandler = (id) =>{
        props.navigation.navigate('EditProduct',{productId:id});
    };

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData =>
            (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                      
                    }}
                >

                    <Button
                        color={Color.primary}
                        title="EDIT"
                        onPress={() => {
                            editProductHandler(itemData.item.id);
                        }} />
                    <Button
                        color={Color.primary}
                        title="Delete"
                        onPress={deleteHandler.bind(this, itemData.item.id)} />
                </ProductItem>
            )
            }
        />
    );
}

UserProductScreen.navigationOptions = navData => {

    return {
        headerTitle: "Your Products",
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
                   navData.navigation.navigate('EditProduct');
                }}
                title="Add"
                color={Color.primary}

                icon={{
                    name: "md-create",
                    size: 15,
                    color: "white"
                }}

            />


        )
    }
}
const styles = StyleSheet.create({

});
export default UserProductScreen;