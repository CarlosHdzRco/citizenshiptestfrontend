import React, {useEffect, useState} from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { openModal, closeModal, setHomeState } from '../actions/actions'
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
  const [error, setError] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    if(homeState === '') {
        dispatch(openModal())
    }
  }, [])

  const checkSelections = () => {
    if(homeState === '') {
        setError('Please make a selection.')
    }
    else {
        dispatch(closeModal())
        setError('')
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
            <Dropdown placeholder='State' selection options={stateOptions} 
            onChange={(e, data)=>{setError('') 
                dispatch(setHomeState(data.value))}
            } />
        </Modal.Content>
        <Modal.Actions>
            <span id='error'>{error}</span>
          <Button positive onClick={() => checkSelections()}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default StateModal