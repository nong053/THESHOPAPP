import React, { useEffect, useCallback, useReducer } from 'react';
import { Platform, Alert, Button, Text, StyleSheet, View, TextInput, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Color from '../../constants/Color';

import * as productsAction from '../../store/actions/products';

const FROM_INPUT_UPDATE = 'FORM_IN_UPDATE'

const formReducer = (state, action) => {
    if (action.type === FROM_INPUT_UPDATE) {
        const updaetdValues ={
            ...state.inputValues,
            [action.input]:action.value
        };
        const updaetdValidities={
            ...state.inputValidities,
            [action.input]:action.isValid
        };

        let updatedFormIsValid=true;
        for(const key in updaetdValidities){
            updatedFormIsValid = updatedFormIsValid && updaetdValidities[key];
        }

        return {
            formIsValid:updatedFormIsValid,
            inputValidities:updaetdValidities,
            inputValues:updaetdValues
        }
    }
    return state;
};

const EditProductScreen = props => {

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
    );

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        },
        formIsValid: editedProduct ? true : false,
    });

    // const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    // const [titleIsValid, setTitleIsValid] = useState(false);
    // const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    // const [price, setPrice] = useState(editedProduct ? editedProduct.price : '');
    // const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');



    const submitHandler = useCallback(() => {

        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the from.', [{ text: "Okay" }])
            return;
        }

        if (editedProduct) {
            dispatch(productsAction.updateProduct(
                prodId,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl
            ));
        } else {
            dispatch(productsAction.createProduct(

                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
                +formState.inputValues.price
            ));
        }
        props.navigation.goBack();
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler]);

    const textChangeHandler = (inputIdentifier, text) => {
        let isValid = false;
        if (text.trim().length > 0) {
            isValid=true;
        } 
        dispatchFormState({
            type:FROM_INPUT_UPDATE,
            value:text,
            isValid:isValid,
            input:inputIdentifier
        })

    }
    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.fromControl}>
                    <Text style={styles.label} >Title</Text>
                    <TextInput style={styles.input}
                        value={formState.inputValues.title}
                        onChangeText={textChangeHandler.bind(this,'title')}
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        onEndEditing={() => {
                            console.log("OnEndEditing");
                        }}
                        onSubmitEditing={() => {
                            console.log("OnSubmiting");
                        }}
                    />
                    {!formState.inputValidities.title && <Text>Please enter a valid title!</Text>}
                </View>
                <View style={styles.fromControl}>
                    <Text style={styles.label} >Image URL</Text>
                    <TextInput style={styles.input}
                        value={formState.inputValues.imageUrl}
                        onChangeText={textChangeHandler.bind(this,'imageUrl')}
                        keyboardType='default'
                    />

                </View>
                {editedProduct ? null : (<View style={styles.fromControl}>
                    <Text style={styles.label} >Price</Text>
                    <TextInput style={styles.input}
                        value={formState.inputValues.price}
                        onChangeText={textChangeHandler.bind(this,'price')}
                        keyboardType='decimal-pad'
                    />

                </View>
                )}
                <View style={styles.fromControl}>
                    <Text style={styles.label} >Description</Text>
                    <TextInput style={styles.input}
                        value={formState.inputValues.description}
                        onChangeText={textChangeHandler.bind(this,'description')} />

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