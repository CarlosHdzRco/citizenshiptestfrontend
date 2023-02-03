import React, {useEffect, useState} from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { openModal, closeModal, setHomeState, setSenators, setHouse, setStateCapital } from '../actions/actions'
import { faker } from '@faker-js/faker'
import _ from 'lodash'
import { Dropdown } from 'semantic-ui-react'
import '../css/StateModal.css'


const addressDefinitions = faker.definitions.address
const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
  key: addressDefinitions.state_abbr[index],
  text: state,
  value: addressDefinitions.state_abbr[index],
}))



function StateModal() {

  const modalOpen = useSelector((state) => state.modalOpen)
  const homeState = useSelector((state) => state.homeState)
  const houseStr = useSelector((state) => state.houseStr)

  const [stateError, setStateError] = useState(false)
  const [districtError, setDistrictError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [districtOptions, setDistrictOptions] =useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    if(homeState === '') {
        dispatch(openModal())
    }

  }, [])

  const fillDistrictOptions = async (data) => {
    dispatch(setHomeState(data.value))
    
    await fetch(`https://api.propublica.org/congress/v1/members/house/${data.value}/current.json`, {
        mode: 'cors',
        headers: {
        'X-API-Key': process.env.REACT_APP_PROPUBLICA_API_KEY
        }
    })
    .then(response => response.json())
    .then(data => {

        var districtOptionsVar = data.results.map((resultsObj) => {
            return {key: 'District ' + resultsObj.district + ':  ' + resultsObj.name, text: 'District ' + resultsObj.district + ':  ' + resultsObj.name, value: 'District ' + resultsObj.district + ':  ' + resultsObj.name}
        })
        setDistrictOptions(districtOptionsVar)
    })
    
  }



const checkSelections = async () => {

    if(homeState === '' && houseStr === ''){
        setStateError(true)
        setDistrictError(true)
        setErrorMessage('Please Make a Selection')
    }
    else if(homeState === ''){
        setStateError(true)
        setErrorMessage('Please Make a Selection')
    }
    else if(houseStr === ''){
        setDistrictError(true)
        setErrorMessage('Please Make a Selection')
    }
    else {
        await fetch(`https://api.propublica.org/congress/v1/members/senate/${homeState}/current.json`, {
            mode: 'cors',
            headers: {
            'X-API-Key': process.env.REACT_APP_PROPUBLICA_API_KEY
        }
        })
        .then(response => response.json())
        .then(data => {
            dispatch(setSenators([data.results[0].name, data.results[1].name]))
            dispatch(closeModal())
        })

        await fetch(`https://citizenshiptestapi.herokuapp.com/statecapital?state=${homeState}`)
          .then(response => response.json())
          .then(data => {
            dispatch(setStateCapital(data.capital))
        })
    }
    
}
  



  return (
    <div>

      <Modal
        dimmer='blurring'
        open={modalOpen}
        closeOnEscape={false}
        closeOnDimmerClick={false}
      >
        <Modal.Header>Select Your State and District</Modal.Header>
        <Modal.Content>
            <h5>1. Select State</h5>
            <Dropdown error={stateError} placeholder='State' selection options={stateOptions}
            onChange={(e, data)=> fillDistrictOptions(data)} />

            <h5>2. Select District</h5>
            <Dropdown error={districtError} placeholder='District' selection options={districtOptions} 
            onChange={(e, data)=> dispatch(setHouse(data.value))} />
            <a href='https://www.house.gov/representatives/find-your-representative'> Find Your District</a>
        </Modal.Content>
        <Modal.Actions>
            <span id='error'>{errorMessage}</span>
          <Button positive onClick={() => checkSelections()}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default StateModal