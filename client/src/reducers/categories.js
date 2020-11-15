const LOAD_CATEGORIES = 'cadabra/products/LOAD_CATEGORIES'

//action creators 
const loadAllCategories = (categories) => {
    return {
        type: LOAD_CATEGORIES,
        categories
    }
}

//thunks
export const getAllCategories = () => async dispatch => {
    try{
        const res = await fetch('/api/products/categories')
        const { categories } = await res.json()

        dispatch(loadAllCategories(categories))
    }catch(err){
        console.warn(err)
    }
}

//reducer
const categories = (state = {}, action) =>{
    let nextState = {}
    switch (action.type) {
        case LOAD_CATEGORIES:
            return action.categories
        default:
            return state
    }
}

export default categories