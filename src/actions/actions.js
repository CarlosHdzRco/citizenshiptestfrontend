export const openModal = () => {
    return {
        type: 'OPEN_MODAL'
    }
}

export const closeModal = () => {
    return {
        type: 'CLOSE_MODAL'
    }
}

export const setHomeState = (homeState) => {
    return {
        type: 'SET_HOME_STATE',
        homeState: homeState
    }
}

export const setSenators = (senatorsObj) => {
    return {
        type: 'SET_SENATORS',
        senatorsObj: senatorsObj
    }
}

export const setHouse = (houseStr) => {
    return {
        type: 'SET_HOUSE',
        houseStr: houseStr
    }
}