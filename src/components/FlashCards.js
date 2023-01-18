import React, {useEffect, useState} from 'react'
// import { Card } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { setExamInfo } from '../actions/actions';
import { Button } from 'semantic-ui-react'
import ReactFlipCard from 'reactjs-flip-card'
import '../css/FlashCards.css'
import soundImg from '../images/sound.jpg'
import Dropdowns from './Dropdowns';

const styles = {
  card: {background: '#6C809A', color: 'white', border: '2px solid black', borderRadius: 10, display: 'flex', 'justifyContent': 'center', 'alignItems': 'center'},
}

function FlashCards() {

  const examInfo = useSelector((state) => state.examInfo)
  const category = useSelector((state) => state.category)
  const subcategory = useSelector((state) => state.subcategory)

  const dispatch = useDispatch();

  // const [currentQuestion,setCurrentQuestion] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loaded,setLoaded] = useState(false)
  const [isFront, setIsFront] = useState(true)
  const [transitionSpeed, setTransitionSpeed] = useState('.2s')



  useEffect(() => {

    const apiCall = async () => {
      await fetch(`http://localhost:3005?category=${category}&subcategory=${subcategory}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        dispatch(setExamInfo(data))
        setLoaded(true)
        setCurrentIndex(0)
      })
    }

    apiCall()
    
  }, [category, subcategory])
  
  const leftClick = () => {
    setTransitionSpeed('0s')
    setIsFront(true)

    if(currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const rightClick = () => {
    setTransitionSpeed('0s')
    setIsFront(true)

    if(currentIndex !== examInfo.length-1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const playVoice = () => {
    // window.speechSynthesis.speak(utter);
    let text = ''
    if(isFront) {
      text = examInfo[currentIndex].question;
    }
    else if(!isFront) {
      text = examInfo[currentIndex].answer;
    }

    const voices = window.speechSynthesis.getVoices();
    const enVoices = voices.filter(x => x.voiceURI === "Google US English");  
    enVoices.forEach(voice => {
        console.log(voice)
        const msg = new SpeechSynthesisUtterance();
        // msg.pitch = .5
        msg.rate = .8
        msg.text = text;
        msg.voice = voice
        window.speechSynthesis.speak(msg);
    });

  }

  const changeIsFront = () => {
    if(isFront === false) {
      setIsFront(true)
      setTransitionSpeed('2s')

    }
    else if(isFront === true) {
      setIsFront(false)
      setTransitionSpeed('2s')

    }
  }

  const translate = async () => {
    const res = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      body: JSON.stringify({
        q: "hello",
        source: "en",
        target: "es",
        format: "text",
      }),
      headers: { "Content-Type": "application/json" }
    });

    console.log(res)
  }
    



  if(loaded){
    return (
      <>
        
        <div className='contentContainer'>
          
          <Dropdowns />
          {/* <h2>{category}</h2>
          <h2>{subcategory}</h2> */}

          <div className='cardContainer'>
            <ReactFlipCard className='card'
              containerStyle={{height: '600px', width: '650px'}}
              frontStyle={styles.card}
              backStyle={styles.card}
              frontComponent={<div><h5 className='descriptor'>Question</h5><h2 className='cardText'>{examInfo[currentIndex].question}</h2></div>}
              backComponent={<div><h5 className='descriptor'>Answer</h5><h2 className='cardText'>{examInfo[currentIndex].answer}</h2></div>}
              flipTrigger= 'onClick'
              direction='vertical'
              onClick={() => changeIsFront()}
              flipByProp={!isFront}
              flipCardStyle={{transitionDuration: transitionSpeed}}
            />
            
          </div>
          <button className='soundButton' onClick={() => playVoice()}><img className='soundImg' src={soundImg} alt='soundImg'></img></button>
          <button className='translateButton' onClick={() => translate()}>Translate</button>


          <div className='buttons'>
            <Button content='Prev' icon='left arrow' labelPosition='left' onClick={()=> leftClick()} />
            <Button content='Next' icon='right arrow' labelPosition='right' onClick={()=> rightClick()} />
          </div>
          
        </div>
      </>
      
    )
  }
}

export default FlashCards