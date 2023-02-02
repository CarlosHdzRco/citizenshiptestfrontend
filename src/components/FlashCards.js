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
  const senatorsObj = useSelector((state) => state.senatorsObj)
  const houseStr = useSelector((state) => state.houseStr)
  const stateCapital = useSelector((state) => state.stateCapital)

  const dispatch = useDispatch();

  // const [currentQuestion,setCurrentQuestion] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loaded,setLoaded] = useState(false)
  const [isFront, setIsFront] = useState(true)
  const [transitionSpeed, setTransitionSpeed] = useState('.2s')
  const [isTranslated, setIsTranslated] = useState(false)
  const [cardFront, setCardFront] = useState('')
  const [cardBack, setCardBack] = useState('')
  const [count, setCount] = useState(0)




  useEffect(() => {

    const apiCall = async () => {
      // console.log('in api call')
      await fetch(`https://citizenshiptestapi.herokuapp.com/?category=${category}&subcategory=${subcategory}`)
      .then(response => response.json())
      .then(data => {

        if(data !== []) {
          for(let i = 0;i<data.length;i++) {
            // console.log(data[i].question)
            if(data[i].question === "Who is one of your state's U.S. Senators now?" && senatorsObj !== []) {
              data[i].answer = senatorsObj
              // console.log('in if')
            }
            else if(data[i].question === "Name your U.S. Representative.") {
              data[i].answer = [houseStr]
            }
            else if(data[i].question === "What is the capital of your state?") {
              data[i].answer = [stateCapital]
            }
          }
        }

        // console.log(data)
        dispatch(setExamInfo(data))
        setLoaded(true)
        setCurrentIndex(0)
        setCardFront(data[currentIndex].question)
        setCardBack(data[currentIndex].answer.map(answer => {
          return <p key={'apicall' + (Math.random() + Math.random() - Math.random() + Math.random())}> &#x2022; {answer}</p>
        }))
        setCount(count + 1)

      })
    }

    apiCall()
    dispatch(stopGame())
    
  }, [category, subcategory, senatorsObj, houseStr, stateCapital])
  
  const leftClick = () => {
    setTransitionSpeed('0s')
    setIsFront(true)

    if(currentIndex !== 0) {
      setCardFront(examInfo[currentIndex-1].question)
      setCardBack(examInfo[currentIndex-1].answer.map(answer => {
        return <p key={'leftclick' + (Math.random() + Math.random() - Math.random() + Math.random())}>&#x2022; {answer}</p>
      }))
      setIsTranslated(false)
      setCurrentIndex(currentIndex - 1)
      setCount(count + 1)

    }
  }

  const rightClick = () => {
    setTransitionSpeed('0s')
    setIsFront(true)

    if(currentIndex !== examInfo.length-1) {
      setCardFront(examInfo[currentIndex+1].question)
      setCardBack(examInfo[currentIndex+1].answer.map(answer => {
        return <p key={'rightclick' + (Math.random() + Math.random() - Math.random() + Math.random())}>&#x2022; {answer}</p>
      }))
      setIsTranslated(false)
      setCurrentIndex(currentIndex + 1)
      setCount(count + 1)

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

    let voices = window.speechSynthesis.getVoices();
    console.log(voices)

    speechSynthesis.addEventListener("voiceschanged", () => {
      voices = speechSynthesis.getVoices()
      const enVoices = voices.filter(x => x.voiceURI === "Bells");
      enVoices.forEach(voice => {
          // console.log(voice)
          const msg = new SpeechSynthesisUtterance();
          // msg.pitch = .5
          msg.rate = .8
          msg.text = text;
          msg.voice = voice
          window.speechSynthesis.speak(msg);
      });
    })

    const enVoices = voices.filter(x => x.voiceURI === "Susan");
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
      setCardBack(examInfo[currentIndex].answer.map(answer => {
        return <p key={'istranslated' + (Math.random() + Math.random() - Math.random() + Math.random())}>&#x2022; {answer}</p>
      }))
      setCount(count + 1)
      setIsTranslated(false)
    }
    else if (isTranslated === false) {
      setCardFront(examInfo[currentIndex].spanishQuestion)
      setCardBack(examInfo[currentIndex].spanishAnswer.map(answer => {
        return <p  key={'isnottranslated' + (Math.random() + Math.random() - Math.random() + Math.random())}>&#x2022; {answer}</p>
      }))
      setCount(count + 1)

      setIsTranslated(true)
    }
  }
    



  if(loaded){
    return (
      <>
        
        <div className='contentContainer'>
          
          <Dropdowns />
          <div className='cardsoundtransContainer'>
            <div className='cardContainer'>
              <ReactFlipCard className='card'
                containerStyle={{height: '450px', width: '650px'}}
                frontStyle={styles.card}
                backStyle={styles.card}
                frontComponent={<div><h5 className='descriptor'>Question {currentIndex + 1} / {examInfo.length}</h5><h2 key='front' className='cardText'>{cardFront}</h2></div>}
                backComponent={<div><h5 className='descriptor'>Answer {currentIndex + 1} / {examInfo.length}</h5><h2 key='back' className='cardText'>{cardBack}</h2></div>}
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