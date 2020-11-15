const LOAD_PRODUCTS = 'cadabra/products/LOAD_PRODUCTS'

//action creators
const loadAllProducts = (products) => {
    return {
        type: LOAD_PRODUCTS,
        products
    }
}

//thunks
export const getAllProducts = () => async dispatch => {
    try{
        const res = await fetch('/api/products')
        const { products } = await res.json()

        console.log('inside getallproducts thunk',products)
        dispatch(loadAllProducts(products))
    }catch(err){
        console.warn(err)
    }
}

//reducer
const products = (state = {}, action) =>{
    let nextState = {}
    switch (action.type) {
        case LOAD_PRODUCTS:
            for(let i = 0; i < action.products.length; i++){
                let productObject = action.products[i]
                nextState[`${i}`] = productObject
            }
            return nextState
        default:
            return state
    }
}

export default products