import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Card, Message } from 'semantic-ui-react'
import '../css/Home.css'
import { stopGame } from '../actions/actions';


import Logo from '../images/Logo3.png'

function Home() {

  // const homeState = useSelector((state) => state.homeState)
  // const houseStr = useSelector((state) => state.houseStr)
  // const senatorsObj = useSelector((state) => state.senatorsObj)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stopGame())
  }, [dispatch])
  

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