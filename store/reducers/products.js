import PRODUCTS from "../../data/dummy-data";
const initialState = {
    avaibleProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
    //userProducts: PRODUCTS
};

export default (state = initialState, action) => {
    return state;
}