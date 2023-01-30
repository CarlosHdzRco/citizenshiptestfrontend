import React, { useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import '../css/Dropdowns.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory, setSubCategory } from '../actions/actions';


const categories = [
    {
        key: 'All',
        text: 'All',
        value: 'All',
    },
    {
      key: 'American Government',
      text: 'American Government',
      value: 'American Government',
    },
    {
      key: 'American History',
      text: 'American History',
      value: 'American History',
    },
    {
      key: 'Integrated Civics',
      text: 'Integrated Civics',
      value: 'Integrated Civics',
    },
  ]

function Dropdowns() {
    
    const [subcategories, setSubCategories] = useState([{}])
    const category = useSelector((state) => state.category)
    // const subcategory = useSelector((state) => state.subcategory)

    const dispatch = useDispatch();


    useEffect(() => {
        // console.log('in use effect')
        if(category === 'American Government') {
            setSubCategories([
                {
                    key: 'Principles of American Democracy',
                    text: 'Principles of American Democracy',
                    value: 'Principles of American Democracy',
                },
                {
                    key: 'System of Government',
                    text: 'System of Government',
                    value: 'System of Government',
                },
                {
                    key: 'Rights and Responsibilities',
                    text: 'Rights and Responsibilities',
                    value: 'Rights and Responsibilities',
                },
            ])
        }
        else if(category === 'American History') {
            setSubCategories([
                {
                    key: 'Colonial Period and Independence',
                    text: 'Colonial Period and Independence',
                    value: 'Colonial Period and Independence',
                },
                {
                    key: "1800's",
                    text: "1800's",
                    value: "1800's",
                },
                {
                    key: 'Recent American History and Other Important Historical Information',
                    text: 'Recent American History and Other Important Historical Information',
                    value: 'Recent American History and Other Important Historical Information',
                },
            ])
        }
        else if(category === 'Integrated Civics') {
            setSubCategories([
                {
                    key: 'Geography',
                    text: 'Geography',
                    value: 'Geography',
                },
                {
                    key: 'Symbols',
                    text: 'Symbols',
                    value: 'Symbols',
                },
                {
                    key: 'Holidays',
                    text: 'Holidays',
                    value: 'Holidays',
                },
            ])
        }
        else if(category === 'All') {
            setSubCategories([{}])
        }
    }, [category])

    const changeCategory = (e) => {
        // console.log(e)
        dispatch(setCategory(e.target.innerText))
        dispatch(setSubCategory(''))
    }
  return (
    <div className='dropdowns'>
        <Dropdown
            className='category'
            placeholder='Select Category'
            selection
            fluid
            selectOnBlur={false}
            options={categories}
            onChange={(e) => changeCategory(e)}
        />

        <Dropdown
            className='subcategory'
            placeholder='Select Subcategory'
            selection
            fluid
            selectOnBlur={false}
            options={subcategories}
            onChange={(e) => dispatch(setSubCategory(e.target.innerText))}
        />    
    </div>
    
  )
}

export default Dropdowns