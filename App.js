import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppLoading from 'expo-app-loading';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/order';

import ShopNavigator from './navigation/ShopNavigator';
import * as Font from 'expo-font';

import {composeWithDevTools} from 'redux-devtools-extension';

const rootReducer = combineReducers({
  products: productsReducer,
  cart:cartReducer,
  orders:orderReducer
});


const store = createStore(rootReducer,composeWithDevTools());

const fetchFont = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require("./assets/fonts/OpenSans-Bold.ttf")
  });
}


export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(err)=>{
          console.log(err);
        }}
        />
    );
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({

});
