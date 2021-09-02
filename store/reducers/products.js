import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT } from "../actions/products";
const initialState = {
    avaibleProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
    //userProducts: PRODUCTS
};

export default (state = initialState, action) => {
    switch (action.type) {
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