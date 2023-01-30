import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Message } from 'semantic-ui-react'
import '../css/Home.css'

import Logo from '../images/Logo3.png'



function Home() {

  const homeState = useSelector((state) => state.homeState)
  const houseStr = useSelector((state) => state.houseStr)
  const senatorsObj = useSelector((state) => state.senatorsObj)

  return (
    <div className='homeContainer'>
      <Message floating compact size='massive'>
        <Message.Header>Changes in Service</Message.Header>
        <p>
          We updated our privacy policy here to better service our customers. We
          recommend reviewing the changes.
        </p>
      </Message>
      
      <Card.Group itemsPerRow={3}>
        <Card color='red' image={Logo} />
        <Card color='white' image={Logo} />
        <Card color='blue' image={Logo} />

      </Card.Group>
    </div>
    
  )
}

export default Home