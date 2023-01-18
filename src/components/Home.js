import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


function Home() {

  const homeState = useSelector((state) => state.homeState)
  const houseStr = useSelector((state) => state.houseStr)
  const senatorsObj = useSelector((state) => state.senatorsObj)

  return (
    <>
      <div>Home</div>
      <h1>{homeState}</h1>
      <h1>{houseStr}</h1>
      {senatorsObj.map(senatorObj => {
        return <h1 key={senatorObj.name}>{senatorObj.name}</h1>
      })}
    </>
    
  )
}

export default Home