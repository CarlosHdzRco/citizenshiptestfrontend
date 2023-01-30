import React from 'react'
import { Segment, Portal, Button, Header } from 'semantic-ui-react'

function NextQuestionPortal({openPortal, setOpenPortal, nextQuestion}) {
  return (
    <div>
        <Portal open={openPortal}>              
            <Button positive
            style={{
                left: '50%',
                transform: 'translateX(-50%)',
                position: 'fixed',
                top: '90%',
                // zIndex: 1000,
                height: '70px',
                width: '550px'
            }} 
            content='Next Question'
            onClick={() => nextQuestion()}
            />
        </Portal>
    </div>
  )
}

export default NextQuestionPortal