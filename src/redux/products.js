const pState = {
    items: [],
    selectedProd: { id: '' },
    unsaved: { id: '', name: '', saving: false, mode: 'add' },
    msg: false,
    edit: false,
    master: [],
    organizedMaster: []
}

export const prodActions = {
    SET_PRODS: 'setProds',
    SET_SELECTED: 'setSelected',
    RESET_SELECTED: 'resetSelected',
    SET_UNSAVED: 'setUnsaved',
    SET_MSG: 'settMsg',
    SET_MASTER: 'setMaster',
    SET_ORG_MASTER: 'setOrgMaster'
}

const products = (state = pState, action) => {
    // if(action.type === prodActions.SET_SELECTED)
    // {
    //     debugger;
    // }
    switch (action.type) {
        case prodActions.SET_PRODS:
            return Object.assign({}, state, { items: action.payload });
        case prodActions.SET_SELECTED:
            return Object.assign({}, state, { selectedProd: action.payload });
        case prodActions.RESET_SELECTED:
            return Object.assign({}, state, { selectedProd: { id: '' } });
        case prodActions.SET_UNSAVED:
            return Object.assign({}, state, { unsaved: action.payload });
        case prodActions.SET_MSG:
            return Object.assign({}, state, { msg: action.payload });
        case prodActions.SET_MASTER:
            return Object.assign({}, state, { master: action.payload });
        case prodActions.SET_ORG_MASTER:
            return Object.assign({}, state, { organizedMaster: action.payload });
        default:
            return state;
    }
}

export default products;