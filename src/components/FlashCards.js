import React, {useEffect, useState} from 'react'
// import { Card } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { setExamInfo, stopGame } from '../actions/actions';
import { Button, Icon } from 'semantic-ui-react'
import ReactFlipCard from 'reactjs-flip-card'
import '../css/FlashCards.css'
import Dropdowns from './Dropdowns';

const styles = {
  card: {'backgroundImage': 'linear-gradient( 135deg, #607EAA 10%, #EAE3D2 100%)', color: 'white', border: '2px solid black', borderRadius: 10, display: 'flex', 'justifyContent': 'center', 'alignItems': 'center'},
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
  const [isTranslated, setIsTranslated] = useState(false)
  const [cardFront, setCardFront] = useState('')
  const [cardBack, setCardBack] = useState('')



  useEffect(() => {

    const apiCall = async () => {
      // console.log('in api call')
      await fetch(`http://localhost:3005?category=${category}&subcategory=${subcategory}`)
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        dispatch(setExamInfo(data))
        setLoaded(true)
        setCurrentIndex(0)
        setCardFront(data[currentIndex].question)
        setCardBack(data[currentIndex].answer)

      })
    }

    apiCall()
    dispatch(stopGame())
    
  }, [category, subcategory])
  
  const leftClick = () => {
    setTransitionSpeed('0s')
    setIsFront(true)

    if(currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1)
      setCardFront(examInfo[currentIndex].question)
      setCardBack(examInfo[currentIndex].answer)
      setIsTranslated(false)

    }
  }

  const rightClick = () => {
    setTransitionSpeed('0s')
    setIsFront(true)

    if(currentIndex !== examInfo.length-1) {
      setCardFront(examInfo[currentIndex+1].question)
      setCardBack(examInfo[currentIndex+1].answer)
      setIsTranslated(false)
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
        // console.log(voice)
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

    if(isTranslated === true) {
      setCardFront(examInfo[currentIndex].question)
      setCardBack(examInfo[currentIndex].answer)
      setIsTranslated(false)
    }
    else if (isTranslated === false) {
      setCardFront(examInfo[currentIndex].spanishQuestion)
      setCardBack(examInfo[currentIndex].spanishAnswer)
      setIsTranslated(true)
    }
  }
    



  if(loaded){
    return (
      <>
        
        <div className='contentContainer'>
          
          <Dropdowns />
          {/* <h2>{category}</h2>
          <h2>{subcategory}</h2> */}
          <div className='cardsoundtransContainer'>
            <div className='cardContainer'>
              <ReactFlipCard className='card'
                containerStyle={{height: '450px', width: '650px'}}
                frontStyle={styles.card}
                backStyle={styles.card}
                frontComponent={<div><h5 className='descriptor'>Question {currentIndex + 1} / {examInfo.length}</h5><h2 className='cardText'>{cardFront}</h2></div>}
                backComponent={<div><h5 className='descriptor'>Answer {currentIndex + 1} / {examInfo.length}</h5><h2 className='cardText'>{cardBack}</h2></div>}
                flipTrigger= 'onClick'
                direction='vertical'
                onClick={() => changeIsFront()}
                flipByProp={!isFront}
                flipCardStyle={{transitionDuration: transitionSpeed}}
              />
            </div>

            <div className='soundtransContainer'>
              <Button icon className='soundButton' onClick={() => playVoice()}>
                <Icon name='volume up' />
              </Button>
              {/* <Button className='soundButton' onClick={() => playVoice()}><img className='soundImg' src={soundImg} alt='soundImg'></img></Button> */}
              <Button className='translateButton' onClick={() => translate()}>Translate</Button>
            </div>
          </div>
          
          

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