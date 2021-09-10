import React, { useEffect } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    AsyncStorage
} from 'react-native';
import Color from '../constants/Color';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

const StartupScreen = props => {

    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                props.navigation.navigate('Auth');
                return;
            }
            const fransFormedData = JSON.parse(userData);
            const { token, userId, expiryDate } = transformedData;

            const expirationDate = new Date(expiryDate);

            if (expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth');
                return;
            }

            const exprirationTime = expirationDate.getTime() - new Date().getItem();
            
            props.navigation.navigate('Shop');
            dispatch(authActions.authenticate(userId,token));
        }
        tryLogin();
    }, [dispatch]);
    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color={Color.primary} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContentl: 'center',
        alignItems: 'center'

    }
});