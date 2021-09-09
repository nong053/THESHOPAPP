export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';
import order from '../../models/order';

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        try {
            // any async code you want!
            const response = await fetch(
                `https://rn-complete-guide-3a47d-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}.json?auth=${token}`
            );

            if (!response.ok) {
                throw new Error('Something wen wrong!')
            }

            const resData = await response.json();
            //console.log(resData);
            const loadedOrders = [];

            for (const key in resData) {
                loadedOrders.push(
                    new order(
                        key,
                        resData[key].cartItems,
                        resData[key].totalAmount,
                        new Date(resData[key].date)
                    )
                );
            }


            dispatch({ type: SET_ORDERS, orders: loadedOrders });
        } catch (err) {
            console.log(err);
            //send to custom analytics server
            throw err;
        }


    }
}
export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const date = new Date();
        const response = await fetch(`https://rn-complete-guide-3a47d-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: new Date().toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        const resData = await response.json();
        console.log("addOrder="+resData);

        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: resData.name,
                items: cartItems,
                amount: totalAmount,
                date: date
            }
        });

    }
}