import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button, Modal, Icon } from 'semantic-ui-react'


function EndGameModal({openRestartModal, setOpenRestartModal, numCorrect, resetStates}) {
    
    const navigate = useNavigate();

    const handleRestartClick = () => {
        setOpenRestartModal(false)
        // navigate("/game")
        resetStates()
    }

    const handleFlashCardsClick = () => {
        setOpenRestartModal(false)
        navigate("/flashcards")
    }

    // the modal will contain a good job message for getting 7 or more correct
    if(numCorrect > 6) {
        return (
            <div>
                <Modal
                onClose={() => setOpenRestartModal(false)}
                onOpen={() => setOpenRestartModal(true)}
                open={openRestartModal}
                dimmer='blurring'
                closeOnEscape={false}
                closeOnDimmerClick={false}
                size='tiny'
                >
                    <Modal.Header>Good Job!!</Modal.Header>
                    <Modal.Content image>
                        {/* <Image size='small' src={checkandx} wrapped /> */}
                        <Modal.Description>
                        <h4>You got {numCorrect} out of 10</h4>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => handleRestartClick()} color='red'>
                        <Icon key='redo' name='undo alternate' color='white'/> Restart Test
                        </Button>
                        <Button onClick={() => handleFlashCardsClick()} color='green'>
                        <Icon key='redo' name='book' color='white'/> Go to Flashcards
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
          )
    }
    // the modal will contain a not bad message for getting between 4 and 6 correct
    if(numCorrect > 3 && numCorrect < 7) {
        return (
            <div>
                <Modal
                onClose={() => setOpenRestartModal(false)}
                onOpen={() => setOpenRestartModal(true)}
                open={openRestartModal}
                dimmer='blurring'
                closeOnEscape={false}
                closeOnDimmerClick={false}
                size='tiny'
                >
                    <Modal.Header>Not Bad. Keep Studying!!</Modal.Header>
                    <Modal.Content image>
                        {/* <Image size='small' src={checkandx} wrapped /> */}
                        <Modal.Description>
                        <h4>You got {numCorrect} out of 10</h4>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => handleRestartClick()} color='red'>
                        <Icon key='redo' name='undo alternate' color='white'/> Restart Test
                        </Button>
                        <Button onClick={() => handleFlashCardsClick()} color='green'>
                        <Icon key='redo' name='book' color='white'/> Go to Flashcards
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
          )
    }
    // the modal will contain a keep studying message for getting less than 4 correct
    if(numCorrect < 4) {
        return (
            <div>
                <Modal
                onClose={() => setOpenRestartModal(false)}
                onOpen={() => setOpenRestartModal(true)}
                open={openRestartModal}
                dimmer='blurring'
                closeOnEscape={false}
                closeOnDimmerClick={false}
                size='tiny'
                >
                    <Modal.Header>Keep Studying!!!</Modal.Header>
                    <Modal.Content image>
                        {/* <Image size='small' src={checkandx} wrapped /> */}
                        <Modal.Description>
                        <h4>You got {numCorrect} out of 10</h4>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => handleRestartClick()} color='red'>
                        <Icon key='redo' name='undo alternate' color='white'/> Restart Test
                        </Button>
                        <Button onClick={() => handleFlashCardsClick()} color='green'>
                        <Icon key='redo' name='book' color='white'/> Go to Flashcards
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
          )
    }
  
}

export default EndGameModal