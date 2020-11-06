const INITIAL_STATE = 'initialState'

export const loadState = () => {
    const stateJSON = localStorage.getItem(INITIAL_STATE)

    try {
        if (stateJSON === null) {
            return undefined
        }

        return JSON.parse(stateJSON)

    } catch (err) {
        console.warn(err)
        return undefined
    }
}

export const saveState = (state) => {

    try {
        const stateJSON = JSON.stringify(state)
        localStorage.setItem(INITIAL_STATE, stateJSON)

    } catch (err) {
        console.warn(err)
    }

}