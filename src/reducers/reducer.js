export const reducer = (state, action) => {

    if(state === undefined){
        state = {
            homeState: '',
            senatorsObj: [],
            houseStr: '',
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
        case 'SET_SENATORS':
            // console.log(action.senatorsObj)
            return {
                ...state,
                senatorsObj: action.senatorsObj
            }
        case 'SET_HOUSE':
            // console.log(action.houseStr)
            return {
                ...state,
                houseStr: action.houseStr
            }

        default:
            return state;
    }
}