export const reducer = (state, action) => {

    if(state === undefined){
        state = {
            homeState: '',
            modalOpen: false
        }
    }

    switch(action.type) {

        case 'OPEN_MODAL':
            return {
                ...state,
                modalOpen: true
            }
        case 'CLOSE_MODAL':
            return {
                ...state,
                modalOpen: false
            }
        case 'SET_HOME_STATE':
            return {
                ...state,
                homeState: action.homeState
            }

        default:
            return state;
    }
}