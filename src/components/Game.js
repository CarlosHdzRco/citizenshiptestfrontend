import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setExamInfo } from '../actions/actions';
import { Segment, Button, Card, Icon } from 'semantic-ui-react'
import '../css/Game.css'
import { closeStartModal, openStartModal } from '../actions/actions'
import NextQuestionPortal from './NextQuestionPortal';


function Game() {

  const examInfo = useSelector((state) => state.examInfo)
  const startedGame = useSelector((state) => state.startedGame)

  const [loaded,setLoaded] = useState(false)
  const [randQuestionNums, setRandQuestionNums] = useState([])    // holds random number from 0 - 99 to randomize ten questions
  const [questionIndex, setQuestionIndex] = useState(0)           // goes from 0 - 10 as the test goes on
  const [correctWrongArray, setCorrectWrongArray] = useState([])  // holds checks and 'x' depending if question are answered correctly or incorrectly
  const [numCorrect, setNumCorrect] = useState(0)                 // holds number of correctly answered questions
  const [randAnswerNums, setRandAnswerNums] = useState([])        // holds random number from 0 - 3 to randomize answer order
  const [randAnswers, setRandAnswers] = useState([])              // holds answers both correct and wrong depending on type
  const [buttonSettings, setButtonSettings] = useState([{icon: '', disabled: false, active: false}, {icon: '', disabled: false, active: false},{icon: '', disabled: false, active: false},{icon: '', disabled: false, active: false}])

  const [numClicks, setNumClicks] = useState(0)
  const [isCorrect, setIsCorrect] = useState(true)

  const [openPortal, setOpenPortal] = useState(false)

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('game use effect')
    const apiCall = async () => {
      await fetch(`http://localhost:3005/`)
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        dispatch(setExamInfo(data))
        setQandA(data)
        setLoaded(true)
      })
    }

    

    if(startedGame === false) {
      dispatch(openStartModal())
    }

    apiCall()
    
  }, [])
  


  // get random numbers for random ten questions
  const setQandA = (data) => {
    let i = 0;
    let j = 0
    let randQuestionNumsArray = []
    let randAnswerNumsArray = []


    //get 10 random numbers between 0 and 99 
    while(i<10 && startedGame == false) {
      let randNum = Math.floor(Math.random() * 100);
      const result = randQuestionNumsArray.filter(num => num === randNum);

      if(result.length === 0) {
        randQuestionNumsArray = [...randQuestionNumsArray, randNum];
        i = i + 1;
      }
    }

    if(startedGame === true) {
      randQuestionNumsArray = randQuestionNums;
    }

    // get 4 random numbers between 0 and 3
    while(j<4) {
      let randNum = Math.floor(Math.random() * 4);
      const result = randAnswerNumsArray.filter(num => num === randNum);

      if(result.length === 0) {
        randAnswerNumsArray = [...randAnswerNumsArray, randNum];
        j = j + 1;
      }

    }
  
    setRandQuestionNums(randQuestionNumsArray)
    setRandAnswerNums(randAnswerNumsArray)
    setNumClicks(data[randQuestionNumsArray[questionIndex]].type)

    // question type is 1 so one correct answer is chosen and three wrong answers are chosen
    if(data[randQuestionNumsArray[questionIndex]].type === 1) {
      let randCorrectAnsNum = Math.floor(Math.random() * data[randQuestionNumsArray[questionIndex]].answer.length);

      let randWrongAnsHolder = []
      let randWrongAnsNumHolder = []

      let k = 0;

      while(k < 3) {
        let randWrongAnsNum = Math.floor(Math.random() * data[randQuestionNumsArray[questionIndex]].wrongAns.length);
        // console.log('randWrongAnsNum: ', randWrongAnsNum)
        const result = randWrongAnsNumHolder.filter(num => num === randWrongAnsNum);
        // console.log('result: ', result)

        if(result.length === 0) {
          randWrongAnsHolder = [...randWrongAnsHolder, {answer: data[randQuestionNumsArray[questionIndex]].wrongAns[randWrongAnsNum], isCorrect: false}];
          randWrongAnsNumHolder = [...randWrongAnsNumHolder, randWrongAnsNum]
          k = k + 1;
        }
      }

      setRandAnswers([{answer: data[randQuestionNumsArray[questionIndex]].answer[randCorrectAnsNum], isCorrect: true}, ...randWrongAnsHolder])

    }

    // question type is 2 so two correct answers are chosen and two wrong answers is chosen
    else if(data[randQuestionNumsArray[questionIndex]].type === 2) {

      let randWrongAnsHolder = []
      let randCorrectAnsHolder = []
      let randWrongAnsNumHolder = []
      let randCorrectAnsNumHolder = []

      let k = 0;
      let l = 0;

      while(k < 2) {
        let randCorrectAnsNum = Math.floor(Math.random() * data[randQuestionNumsArray[questionIndex]].answer.length);

        const result = randCorrectAnsNumHolder.filter(num => num === randCorrectAnsNum);

        if(result.length === 0) {
          randCorrectAnsHolder = [...randCorrectAnsHolder, {answer: data[randQuestionNumsArray[questionIndex]].answer[randCorrectAnsNum], isCorrect: true}];
          randCorrectAnsNumHolder = [...randCorrectAnsNumHolder, randCorrectAnsNum]

          k = k + 1;
        }
      }

      while(l < 2) {
        let randWrongAnsNum = Math.floor(Math.random() * data[randQuestionNumsArray[questionIndex]].wrongAns.length);

        const result = randWrongAnsNumHolder.filter(num => num === randWrongAnsNum);

        if(result.length === 0) {
          randWrongAnsHolder = [...randWrongAnsHolder, {answer: data[randQuestionNumsArray[questionIndex]].wrongAns[randWrongAnsNum], isCorrect: false}];
          randWrongAnsNumHolder = [...randWrongAnsNumHolder, randWrongAnsNum]

          l = l + 1;
        }
      }

      setRandAnswers([...randCorrectAnsHolder, ...randWrongAnsHolder])

    }

    // question type is 3 so three correct answers are chosen and 1 wrong answer is chosen
    else if(data[randQuestionNumsArray[questionIndex]].type === 3) {
      let randWrongAnsNum = Math.floor(Math.random() * data[randQuestionNumsArray[questionIndex]].wrongAns.length);

      let randCorrectAnsHolder = []
      let randCorrectAnsNumHolder = []

      let k = 0;

      while(k < 3) {
        let randCorrectAnsNum = Math.floor(Math.random() * data[randQuestionNumsArray[questionIndex]].answer.length);

        const result = randCorrectAnsNumHolder.filter(num => num === randCorrectAnsNum);

        if(result.length === 0) {
          randCorrectAnsHolder = [...randCorrectAnsHolder, {answer: data[randQuestionNumsArray[questionIndex]].answer[randCorrectAnsNum], isCorrect: true }];
          randCorrectAnsNumHolder = [...randCorrectAnsNumHolder, randCorrectAnsNum]

          k = k + 1;
        }
      }

      setRandAnswers([...randCorrectAnsHolder, {answer: data[randQuestionNumsArray[questionIndex]].wrongAns[randWrongAnsNum], isCorrect: false}])
    }

  }



  // check if button(answer) that is clicked is correct
  const checkAnswer = (num) => {
    if(randAnswers[randAnswerNums[num]].isCorrect) {
      let buttonSettingsTemp = buttonSettings.slice()

      buttonSettingsTemp[num].icon = <Icon name='check' color='green'/>
      buttonSettingsTemp[num].active=true

      if(numClicks == 1) {
        for(let i = 0;i<4;i++) {
          if(buttonSettingsTemp[i].active === false) {
            buttonSettingsTemp[i].disabled = true
          }
        }

        if(isCorrect === true) {
          setCorrectWrongArray([...correctWrongArray, <Icon name='check' color='green'/>])
        }

        else if(isCorrect === false) {
          setCorrectWrongArray([...correctWrongArray, <Icon name='times' color='red'/>])
        }

        setOpenPortal(true)
      }


      // if(numClicks-1 === 0) {
        
      // }
      
      setNumClicks(numClicks - 1)
      setButtonSettings(buttonSettingsTemp)
    }

    else if(randAnswers[randAnswerNums[num]].isCorrect === false) {
      let buttonSettingsTemp = buttonSettings.slice()
      setIsCorrect(false)

      buttonSettingsTemp[num].icon = <Icon name='times' color='red'/>
      buttonSettingsTemp[num].active=true
      // buttonSettingsTemp[num].disabled=true

      if(numClicks == 1) {
        for(let i = 0;i<4;i++) {
          if(buttonSettingsTemp[i].active === false) {
            buttonSettingsTemp[i].disabled = true
          }
        }
        setCorrectWrongArray([...correctWrongArray, <Icon name='times' color='red'/>])
      }

      setNumClicks(numClicks - 1)
      if(numClicks === 0) {
        setOpenPortal(true)
      }

      setOpenPortal(true)

      setButtonSettings(buttonSettingsTemp)
    }
  }

  const nextQuestion = () => {
    console.log('in next question')
    setOpenPortal(false)
    setIsCorrect(true)
    setQuestionIndex(questionIndex + 1)
    setQandA(examInfo)
    setButtonSettings([{icon: '', disabled: false, active: false}, {icon: '', disabled: false, active: false},{icon: '', disabled: false, active: false},{icon: '', disabled: false, active: false}])
  }

  if(loaded){
    return (
      <div className='pageContainer'>

        <Card className='questionCard'>
          <Card.Content>
            <Card.Meta className='questionCounter' >Question {questionIndex + 1} of 10</Card.Meta>
            <Card.Header className='questionHeader'>{examInfo[randQuestionNums[questionIndex]].question}</Card.Header>
            
            <Card.Description className='questionChecks' content= {correctWrongArray} />
          </Card.Content>
        </Card>

        <Segment raised className='gameContainer'>
        <Button className='gameButton' active={buttonSettings[0].active} disabled={buttonSettings[0].disabled} fluid basic color='blue' onClick={() => checkAnswer(0)}>{buttonSettings[0].icon} A. {randAnswers[randAnswerNums[0]].answer}</Button>
        <Button className='gameButton' active={buttonSettings[1].active} disabled={buttonSettings[1].disabled} fluid basic color='blue' onClick={() => checkAnswer(1)}>{buttonSettings[1].icon} B. {randAnswers[randAnswerNums[1]].answer}</Button>
        <Button className='gameButton' active={buttonSettings[2].active} disabled={buttonSettings[2].disabled} fluid basic color='blue' onClick={() => checkAnswer(2)}>{buttonSettings[2].icon} C. {randAnswers[randAnswerNums[2]].answer}</Button>
        <Button className='gameButton' active={buttonSettings[3].active} disabled={buttonSettings[3].disabled} fluid basic color='blue' onClick={() => checkAnswer(3)}>{buttonSettings[3].icon} D. {randAnswers[randAnswerNums[3]].answer}</Button>
        </Segment>

        <NextQuestionPortal openPortal={openPortal} setOpenPortal={() => setOpenPortal()} nextQuestion={() => nextQuestion()}/>

      </div>
    )
  }
}

export default Game