import React from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';
import Color from '../../constants/Color';
import  Card from '../UI/Card';

const ProductItem = props => {

    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <Card style={styles.product}>
            <View style={styles.touchable} >
                <TouchableCmp onPress={props.onSelect} useForeground>
                    <View>
                        <Image style={styles.image} source={{ uri: props.image }} />
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text>${props.price.toFixed(2)}</Text>
                        </View>

                        <View style={styles.actions}>
                           {props.children}
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </Card>
    )
};

const styles = StyleSheet.create({
    product: {
        // shadowColor: "black",
        // shadowOffset: { width: 0, height: 2 },
        // shadowRadius: 8,
        // elevation: 5,
        // borderRadius: 10,
        // backgroundColor: "white",
        height: 300,
        margin: 20,
        overflow: 'hidden'

    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '60%'
    },

    details: {

        alignItems: "center",
        height: '17%',
        padding: 10

    },
    title: {
        fontSize: 18,
        marginVertical: 2,
        fontFamily: "open-sans-bold"
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: "open-sans"
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20
    }

});

export default ProductItem;