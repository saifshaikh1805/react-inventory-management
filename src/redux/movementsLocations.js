const initialState = {
    locations: [],
    movements: [],
    mId: '',
    fromLoc: '',
    toLoc: '',
    inputQty: 1,
    errs: [],
    savingMovement: false,
    loading: false,
    movementsMode: 'add',
    unsavedLocId: '',
    unsavedLoc: {id: '', name:'', saving: false, mode:'add'}
}

export const movementActions = {
    SET_LOCS: 'setLocs',
    SET_MOVEMENTS: 'setMovements',
    SAVING_MOVEMENT: 'SavingMovement',
    SET_FROM_LOC: 'setFromLoc',
    SET_TO_LOC: 'setToLoc',
    SET_INPUT_QTY: 'setInpQty',
    SET_ERRS: 'setErrs',
    RESET: 'reset',
    SET_LOADING: 'setLoading',
    SET_MOVEMENTS_MODE: 'setMovementsMode',
    SET_MOVEMENT_ID: 'setMId',
    SET_UNSAVED_LOC: 'setUnsavedLoc'
}

const movementsLocations = (state = initialState, action) => {
    switch (action.type) {
        case movementActions.SET_LOCS:
            return Object.assign({}, state, { locations: action.payload });
        case movementActions.SET_MOVEMENTS:
            return Object.assign({}, state, { movements: action.payload });
        case movementActions.SAVING_MOVEMENT:
            return Object.assign({}, state, { savingMovement: action.payload });
        case movementActions.SET_FROM_LOC:
            return Object.assign({}, state, { fromLoc: action.payload });
        case movementActions.SET_TO_LOC:
            return Object.assign({}, state, { toLoc: action.payload });
        case movementActions.SET_INPUT_QTY:
            return Object.assign({}, state, { inputQty: parseInt(action.payload) });
        case movementActions.SET_ERRS:
            return Object.assign({}, state, { errs: action.payload });
        case movementActions.RESET:
            return Object.assign({}, state, { fromLoc: '', toLoc: '', inputQty: 1 });
        case movementActions.SET_LOADING:
            return Object.assign({}, state, { loading: action.payload });
        case movementActions.SET_MOVEMENTS_MODE:
            return Object.assign({}, state, { movementsMode: action.payload });
        case movementActions.SET_MOVEMENT_ID:
            return Object.assign({}, state, { mId: action.payload });
        case movementActions.SET_UNSAVED_LOC:
            return Object.assign({}, state, { unsavedLoc: action.payload });
        default:
            return state;
    }
}

export default movementsLocations;