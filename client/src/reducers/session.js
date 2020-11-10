const LOAD_USER = 'cadabra/session/LOAD_USER'

//action creators
const loadUser = (user) => {
    return {
        type: LOAD_USER,
        user
    }
}

//thunks

export const signup = (firstName, lastName, email, password, confirmPassword) => async dispatch => {
    const body = {
        firstName, 
        lastName,
        email,
        password,
        confirmPassword
    }

    try {

        const tokenRes = await fetch('/api/users/get_csrf')
        const token = await tokenRes.json()

        const res = await fetch('/api/users/signup', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': token.csrfT
            },
            body: JSON.stringify(body)
        })

        if(!res.ok){
            throw res
        }

        const { user } = await res.json()
        console.log('inside signup thunk', user);
        dispatch(loadUser(user))
    }catch(error){
        console.log(error)
    }
}




export const login = (email, password) => async dispatch => {
    const body = {
        email,
        password
    }

    try {

        const tokenRes = await fetch('/api/users/get_csrf')
        const token = await tokenRes.json()

        const res = await fetch('/api/users/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': token.csrfT
            },
            body: JSON.stringify(body)
        })

        if(!res.ok){
            throw res
        }

        const { user } = await res.json()
        console.log('inside login thunk', user);
        dispatch(loadUser(user))
    }catch(error){
        console.log(error)
    }
}


//reducers

const session = (state = {}, action) => {
    switch (action.type) {
        case LOAD_USER:
            return {
                ...action.user
            }
        default:
            return state
    }
}

export default session;