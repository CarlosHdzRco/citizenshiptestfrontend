import React, {useState} from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import StateModal from './StateModal'
import StartGameModal from './StartGameModal'
import '../css/Navbar.css'
import Logo from '../images/Logo3.png'
import { useDispatch } from 'react-redux'
import { openStartModal } from '../actions/actions'



function Navbar({children}) {
    const [activeItem, setActiveItem] = useState('Home')

    const handleItemClick = (e, {name}) => { setActiveItem(name)}
    const handleGameClick = (e, {name}) => { 
      setActiveItem(name)
      dispatch(openStartModal())
    }


    const dispatch = useDispatch()
  return (
    <>
        <Menu secondary stackable>
            <Menu.Item as={Link} to='/'
            name='Home'
            active={activeItem === 'Home'}
            onClick={handleItemClick}
            
            >
            <img id='logo' src={Logo} alt="Logo"/>
            </Menu.Item>

            <Menu.Item as={Link} to='/flashcards'
            name='FlashCards'
            active={activeItem === 'FlashCards'}
            onClick={handleItemClick}
            >
            <Icon name='book' size='large'/>
            Learn With FlashCards
            </Menu.Item>

            <Menu.Item as={Link} to='/game'
            name='Game'
            active={activeItem === 'Game'}
            onClick={
              handleGameClick
            }
            >
            <Icon name='list' size='large'/>
            Test Yourself
            </Menu.Item>
        </Menu>

        {/* <hr id='navLine'></hr> */}
        <StateModal />
        <StartGameModal />
        
        

        {children}
    </>
  )
}

export default Navbar