const rootInitialState = {
    activeView: 'products',
    loading: true
}

export const rootActions = {
    SET_ACTIVE_VIEW: 'setActiveView',
    SET_LOADING: 'setLoading'
}


const root = (state = rootInitialState, action) => {
    switch (action.type) {
        case rootActions.SET_ACTIVE_VIEW:
            return Object.assign({}, state, { activeView: action.payload });
        case rootActions.SET_LOADING:
            return Object.assign({}, state, { loading: action.payload });
        default:
            return state;
    }
}

export default root;