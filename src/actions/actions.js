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

export const setExamInfo = (examInfo) => {
    return {
        type: 'SET_EXAM_INFO',
        examInfo: examInfo
    }
}

export const setHouse = (houseStr) => {
    return {
        type: 'SET_HOUSE',
        houseStr: houseStr
    }
}

export const setCategory = (category) => {
    console.log('action: ', category)
    return {
        type: 'SET_CATEGORY',
        category: category
    }
}

export const setSubCategory = (subcategory) => {
    return {
        type: 'SET_SUBCATEGORY',
        subcategory: subcategory
    }
}

export const openStartModal = () => {
    return {
        type: 'OPEN_START_MODAL'
    }
}

export const closeStartModal = () => {
    return {
        type: 'CLOSE_START_MODAL'
    }
}

export const stopGame = () => {
    return {
        type: 'STARTED_GAME_FALSE'
    }
}