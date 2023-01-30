import React, { useState } from 'react'
import { Button, Image, Modal } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { closeStartModal, openStartModal } from '../actions/actions'
import checkandx from '../images/checkandx.jpeg'

import '../css/StartGameModal.css'

function StartGameModal() {
    const startModalOpen = useSelector((state) => state.startModalOpen)

    const dispatch = useDispatch()

  return (
    <div>
        <Modal
        onClose={() => dispatch(closeStartModal())}
        onOpen={() => dispatch(openStartModal())}
        open={startModalOpen}
        dimmer='blurring'
        closeOnEscape={false}
        closeOnDimmerClick={false}
        >
            <Modal.Header>Start Multiple Choice Game</Modal.Header>
            <Modal.Content image>
                <Image size='small' src={checkandx} wrapped />
                <Modal.Description>
                <h4>You will have ten random questions from the official citizenship exam prep. Some question you will have to click only one answer. Others require more than one answer.</h4>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => dispatch(closeStartModal())} positive>
                Start
                </Button>
            </Modal.Actions>
        </Modal>
    </div>
    )
}

export default StartGameModal