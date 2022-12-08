import React, {useState, useEffect} from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import StateModal from './StateModal'


function Navbar({children}) {
    const [activeItem, setActiveItem] = useState('Home')

    useEffect(() => {
      
    }, [])
    

    const handleItemClick = (e, {name}) => { setActiveItem(name)}
  return (
    <>
        <Menu>
            <Menu.Item as={Link} to='/'
            name='Home'
            active={activeItem === 'Home'}
            onClick={handleItemClick}
            
            >
            Home
            </Menu.Item>

            <Menu.Item as={Link} to='/flashcards'
            name='FlashCards'
            active={activeItem === 'FlashCards'}
            onClick={handleItemClick}
            >
            FlashCards
            </Menu.Item>

            <Menu.Item as={Link} to='/game'
            name='Game'
            active={activeItem === 'Game'}
            onClick={handleItemClick}
            >
            Game
            </Menu.Item>
        </Menu>

        <StateModal />

        {children}
    </>
  )
}

export default Navbar