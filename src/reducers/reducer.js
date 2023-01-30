export const reducer = (state, action) => {

    if(state === undefined){
        state = {
            homeState: '',
            senatorsObj: [],
            houseStr: '',
            modalOpen: false,
            startModalOpen: false,
            startedGame: false,
            examInfo: [],
            category: '',
            subcategory: ''
        }
    }

    switch(action.type) {

        case 'OPEN_MODAL':
            // console.log('openmodal')
            return {
                ...state,
                modalOpen: true
            }
        case 'CLOSE_MODAL':
            // console.log('closemodal')
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
        case 'SET_EXAM_INFO':
            // console.log(action.houseStr)
            return {
                ...state,
                examInfo: action.examInfo
            }
        case 'SET_CATEGORY':
            console.log('reducer: ', action.category)
            return {
                ...state,
                category: action.category
            }
        case 'SET_SUBCATEGORY':
            return {
                ...state,
                subcategory: action.subcategory
            }
        case 'OPEN_START_MODAL':
            // console.log('openstartmodal')
            return {
                ...state,
                startModalOpen: true
            }
        case 'CLOSE_START_MODAL':
            // console.log('closestartmodal')
            return {
                ...state,
                startModalOpen: false,
                startedGame: true
            }

        default:
            return state;
    }
}