import React from 'react';
import { View, StyleSheet } from 'react-native';
import { exp } from 'react-native/Libraries/Animated/src/Easing';


const Card =  props =>{
    return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
}

const styles = StyleSheet.create({
    card:{
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
        overflow: 'hidden'
    }
});

export default Card;