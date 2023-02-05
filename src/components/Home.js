import React, {useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Portal, Segment, Header } from 'semantic-ui-react'
import '../css/Home.css'
import { stopGame } from '../actions/actions';


import womanflag from '../images/womanflag.jpg'
import citizenshippic from '../images/citizenshippic.jpg'

function Home() {

  // const homeState = useSelector((state) => state.homeState)
  // const houseStr = useSelector((state) => state.houseStr)
  // const senatorsObj = useSelector((state) => state.senatorsObj)

  const [open, setOpen] = useState(false);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stopGame())
  }, [dispatch])
  

  return (
    <div className='homeContainer'>

      <div className='landingLeftSide'>
        <h2 className='landingHeader'>Citizenship Test Prep</h2>

        <h2 className='landingText'>
          This site is dedicated to helping spanish speakers study and improve their knowledge on questions that
          can be found on the U.S. Naturalization Test.
        </h2>

        <div className='buttonContainer'>
          <Button as={Link} to='/flashcards'
            color='green' className='linkButton'
            content='Start Studying'
            disabled={open}
            onClick={() => setOpen(true)}
          />

          <Button as={Link} to='/game'
            color='red' className='linkButton'
            content='Practice Test'
            disabled={open}
            onClick={() => setOpen(true)}
          >Practice Test</Button>
        </div>

        
      </div>

      
      
      <img className='landingImages' src={citizenshippic} alt='citizenshippic' />  

    </div>
    
  )
}

export default Home