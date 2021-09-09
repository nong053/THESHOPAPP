import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import { CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT } from "../actions/products";
const initialState = {
    avaibleProducts: [],
    userProducts: []
    //userProducts: PRODUCTS
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                avaibleProducts:action.products,
                userProducts:action.userProducts
            };
        case CREATE_PRODUCT:
            const newProduct = new Product(
                // new Date().toString(),
                action.productData.id,
                action.productData.ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price

                );
                return{
                    ...state,
                    avaibleProducts:state.avaibleProducts.concat(newProduct),
                    userProducts:state.userProducts.concat(newProduct)
                }
        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(
                prod => prod.id === action.pid
            );
            const updatedProduct = new Product(
                action.pid,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[productIndex].price
            );

            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIndex]= updatedProduct;
            
            const avaibleProductsIndex = state.avaibleProducts.findIndex(
                prod => prod.id===action.pid
            )
            const updatedAvailableProducts = [...state.avaibleProducts];
            updatedAvailableProducts[avaibleProductsIndex]=updatedProduct;

            return{
                ...state,
                avaibleProducts:updatedAvailableProducts,
                userProducts:updatedUserProducts
            }

        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(
                    product => product.id !== action.pid
                ),
                avaibleProducts: state.avaibleProducts.filter(
                    product => product.id !== action.pid
                )

            }
    }


    return state;
}