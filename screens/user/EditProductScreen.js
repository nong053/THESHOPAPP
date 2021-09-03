import React, { useState, useEffect, useCallback } from 'react';
import { Platform, Alert, Button, Text, StyleSheet, View, TextInput, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Color from '../../constants/Color';

import * as productsAction from '../../store/actions/products';



const EditProductScreen = props => {

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
    );

    const dispatch = useDispatch();

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState(editedProduct ? editedProduct.price : '');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');


    
    const submitHandler = useCallback(() => {
        if (editedProduct) {
            dispatch(productsAction.updateProduct(
                prodId,
                title,
                description,
                imageUrl
            ));
        } else {
            dispatch(productsAction.createProduct(

                title,
                description,
                imageUrl,
                +price
            ));
        }
        props.navigation.goBack();
    }, [dispatch, prodId, title, description, imageUrl]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.fromControl}>
                    <Text style={styles.label} >Title</Text>
                    <TextInput style={styles.input}
                        value={title}
                        onChangeText={text => setTitle(text)} />
                </View>
                <View style={styles.fromControl}>
                    <Text style={styles.label} >Image URL</Text>
                    <TextInput style={styles.input}
                        value={imageUrl}
                        onChangeText={text => setImageUrl(text)} />
                </View>
                {editedProduct ? null : (<View style={styles.fromControl}>
                    <Text style={styles.label} >Price</Text>
                    <TextInput style={styles.input}
                        value={price}
                        onChangeText={text => setPrice(text)} />
                </View>
                )}
                <View style={styles.fromControl}>
                    <Text style={styles.label} >Description</Text>
                    <TextInput style={styles.input}
                        value={description}
                        onChangeText={text => setDescription(text)} />

                </View>
            </View>
        </ScrollView>
    );
}
EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId')
            ? 'Edit Product' : 'Add Prodcut',
        headerRight: () => (
            <Button
                onPress={submitFn}
                title="Save"
                color={Color.primary}

                icon={{
                    name: "md-checkmark",
                    size: 15,
                    color: "white"
                }}

            />


        )
    };
}
const styles = StyleSheet.create({
    from: {
        margin: 20
    },
    fonmControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold'
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#CCC',
        borderBottomWidth: 1
    }
});
export default EditProductScreen;