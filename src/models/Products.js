export default {
    namespace: 'products',
    state: {
        arr: [],
        arr1: []
    },
    reducers: {
        'add'(state, {
            payload: arr
        }) {
            return {
                arr: [...state.arr, ...arr]
            }
        },
        'del'(state, {
            payload: arr
        }) {
            return {
                arr: [...state.arr, ...arr]
            }
        },
        'datas'(state, {
            payload: arr1
        }) {
            return {
                arr1: [...state.arr1, ...arr1]
            }
        }
    },
};
