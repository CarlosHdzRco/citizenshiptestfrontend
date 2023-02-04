import React from 'react'
import { Segment, Portal, Button, Header } from 'semantic-ui-react'
import '../css/NextQuestionPortal.css'

function NextQuestionPortal({openPortal, nextQuestion}) {
  return (
    <div>
        <Portal open={openPortal}>              
            <Button className='nextButton' positive
            
            content='Next Question'
            onClick={() => nextQuestion()}
            />
        </Portal>
    </div>
  )
}

export default NextQuestionPortal