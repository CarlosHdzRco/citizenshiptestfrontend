import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setExamInfo } from '../actions/actions';
import { Segment, Button, Card, Icon } from 'semantic-ui-react'
import '../css/Game.css'
import { openStartModal } from '../actions/actions'
import NextQuestionPortal from './NextQuestionPortal';
import EndGameModal from './EndGameModal';
import { stopGame } from '../actions/actions';
import { set } from 'lodash';

function Game() {

  const examInfo = useSelector((state) => state.examInfo)
  const startedGame = useSelector((state) => state.startedGame)
  const homeState = useSelector((state) => state.homeState)
  const senatorsObj = useSelector((state) => state.senatorsObj)
  const houseStr = useSelector((state) => state.houseStr)
  const stateCapital = useSelector((state) => state.stateCapital)


  const [loaded,setLoaded] = useState(false)
  const [randQuestionNums, setRandQuestionNums] = useState([])    // holds random number from 0 - 99 to randomize ten questions
  const [questionIndex, setQuestionIndex] = useState(0)           // goes from 0 - 10 as the test goes on
  const [correctWrongArray, setCorrectWrongArray] = useState([])  // holds checks and 'x' depending if question are answered correctly or incorrectly
  const [numCorrect, setNumCorrect] = useState(0)                 // holds number of correctly answered questions
  const [randAnswerNums, setRandAnswerNums] = useState([])        // holds random number from 0 - 3 to randomize answer order
  const [randAnswers, setRandAnswers] = useState([])              // holds answers both correct and wrong depending on type
  const [buttonSettings, setButtonSettings] = useState([{icon: '', disabled: false, active: false}, {icon: '', disabled: false, active: false},{icon: '', disabled: false, active: false},{icon: '', disabled: false, active: false}])

  const [numClicks, setNumClicks] = useState(0)                   // holds number of guesses left on the question depending on type
  const [isCorrect, setIsCorrect] = useState(true)                // if chosen answer is correct

  const [openPortal, setOpenPortal] = useState(false)             // open state for Next question portal at bottom of screen
  const [openRestartModal, setOpenRestartModal] = useState(false) // open state to open restart modal

  const [counter, setCounter] = useState(0)

  const dispatch = useDispatch();

  useEffect(() => {
    const apiCall = async () => {
      await fetch(`https://citizenshiptestapi.herokuapp.com/`)
      .then(response => response.json())
      .then(data => {
        dispatch(setExamInfo(data))
        setQandA(data, 0)                   // set initial first question
        setLoaded(true)
      })
    }

    // if game has not started then change startedGame state to true and open start modal
    if(startedGame === false) {
      dispatch(openStartModal())
    }

    apiCall()
    
  }, [dispatch])
  


  // get random numbers for random ten questions
  const setQandA = (data, index) => {
    let i = 0;    //counter
    let j = 0     // counter
    let randQuestionNumsArray = []    // holds the ten random questions
    let randAnswerNumsArray = []      // holds the random answers depending on the current index

    //get 10 random numbers between 0 and 99 
    while(i<10 && startedGame === false) {
      let randNum = Math.floor(Math.random() * 100);

      // make sure question is not already chosen
      const result = randQuestionNumsArray.filter(num => num === randNum);
      if(result.length === 0 && data[randNum].question !== "Who is the Governor of your state now?") {
        randQuestionNumsArray = [...randQuestionNumsArray, randNum];
        i = i + 1;
      }
    }

    // if game is already started then just get randQuestionsNums state instead of getting new random questions
    if(startedGame === true) {
      randQuestionNumsArray = randQuestionNums;
    }

    // get 4 random numbers between 0 and 3
    while(j<4) {
      let randNum = Math.floor(Math.random() * 4);

      // make sure answer is not already chosen
      const result = randAnswerNumsArray.filter(num => num === randNum);
      if(result.length === 0) {
        randAnswerNumsArray = [...randAnswerNumsArray, randNum];
        j = j + 1;
      }
    }
  
    setRandQuestionNums(randQuestionNumsArray)            // set random question state with temporary random questions state
    setRandAnswerNums(randAnswerNumsArray)                // set random answers state with temporary random answers state
    setNumClicks(data[randQuestionNumsArray[index]].type) // set number of clicks(guesses) that the current question takes depending on type

    // question type is 1 so one correct answer is chosen and three wrong answers are chosen
    if(data[randQuestionNumsArray[index]].type === 1) {

      let randCorrectAnsNum = Math.floor(Math.random() * data[randQuestionNumsArray[index]].answer.length);   // get a random correct answer
      let randWrongAnsHolder = []       // holder for random wrong answers
      let randWrongAnsNumHolder = []    // holder for random wrong answers numbers
      let k = 0;

      // get three random wrong answers
      while(k < 3) {
        let randWrongAnsNum = Math.floor(Math.random() * data[randQuestionNumsArray[index]].wrongAns.length);

        // make sure wrong answer hasnt been chosen already
        const result = randWrongAnsNumHolder.filter(num => num === randWrongAnsNum);
        if(result.length === 0) {
          randWrongAnsHolder = [...randWrongAnsHolder, {answer: data[randQuestionNumsArray[index]].wrongAns[randWrongAnsNum], isCorrect: false}];
          randWrongAnsNumHolder = [...randWrongAnsNumHolder, randWrongAnsNum]
          k = k + 1;
        }
      }

      // get one of users senator if random question is "Who is one of your state's U.S. Senators now?"
      if(data[randQuestionNumsArray[index]].question === "Who is one of your state's U.S. Senators now?") {
        let randSenatorNum = Math.floor(Math.random() * 2);
        setRandAnswers([{answer: senatorsObj[randSenatorNum], isCorrect: true}, ...randWrongAnsHolder])
      }

      // get users representative if random question is "Name your U.S. Representative."
      else if(data[randQuestionNumsArray[index]].question === "Name your U.S. Representative.") {
        let repNameTemp = houseStr
        setRandAnswers([{answer: repNameTemp.substring(repNameTemp.indexOf(":") + 1), isCorrect: true}, ...randWrongAnsHolder])
      }
      
      // get users state if random question is "What is the capital of your state?"
      else if(data[randQuestionNumsArray[index]].question === "What is the capital of your state?") {
        setRandAnswers([{answer: stateCapital , isCorrect: true}, ...randWrongAnsHolder])
      }

      // add random answers to randanswers array state
      else {
        setRandAnswers([{answer: data[randQuestionNumsArray[index]].answer[randCorrectAnsNum], isCorrect: true}, ...randWrongAnsHolder])
      }
    }

    // question type is 2 so two correct answers are chosen and two wrong answers is chosen
    else if(data[randQuestionNumsArray[index]].type === 2) {

      let randWrongAnsHolder = []       // holder for random wrong answers
      let randCorrectAnsHolder = []     // holder for random correct answers
      let randWrongAnsNumHolder = []    // holder for random wrong answer numbers
      let randCorrectAnsNumHolder = []  // holders for random correct answer numbers
      let k = 0;
      let l = 0;

      // get two random correct answers
      while(k < 2) {
        let randCorrectAnsNum = Math.floor(Math.random() * data[randQuestionNumsArray[index]].answer.length);

        // make sure correct answer has not been chosen
        const result = randCorrectAnsNumHolder.filter(num => num === randCorrectAnsNum);
        if(result.length === 0) {
          randCorrectAnsHolder = [...randCorrectAnsHolder, {answer: data[randQuestionNumsArray[index]].answer[randCorrectAnsNum], isCorrect: true}];
          randCorrectAnsNumHolder = [...randCorrectAnsNumHolder, randCorrectAnsNum]
          k = k + 1;
        }
      }

      // get two random wrong answers
      while(l < 2) {
        let randWrongAnsNum = Math.floor(Math.random() * data[randQuestionNumsArray[index]].wrongAns.length);

        // make sure wrong answer has not been chosen
        const result = randWrongAnsNumHolder.filter(num => num === randWrongAnsNum);
        if(result.length === 0) {
          randWrongAnsHolder = [...randWrongAnsHolder, {answer: data[randQuestionNumsArray[index]].wrongAns[randWrongAnsNum], isCorrect: false}];
          randWrongAnsNumHolder = [...randWrongAnsNumHolder, randWrongAnsNum]
          l = l + 1;
        }
      }

      setRandAnswers([...randCorrectAnsHolder, ...randWrongAnsHolder])  // add both correct and wrong answers to randanswers array state
    }

    // question type is 3 so three correct answers are chosen and 1 wrong answer is chosen
    else if(data[randQuestionNumsArray[index]].type === 3) {
      let randWrongAnsNum = Math.floor(Math.random() * data[randQuestionNumsArray[index]].wrongAns.length); // get random wrong answer
      let randCorrectAnsHolder = []     // holder for correct answers
      let randCorrectAnsNumHolder = []  // holder for correct answers num
      let k = 0;

      // get three random correct answers
      while(k < 3) {
        let randCorrectAnsNum = Math.floor(Math.random() * data[randQuestionNumsArray[index]].answer.length);

        // make sure random correct answer has not been chosen yet
        const result = randCorrectAnsNumHolder.filter(num => num === randCorrectAnsNum);
        if(result.length === 0) {
          randCorrectAnsHolder = [...randCorrectAnsHolder, {answer: data[randQuestionNumsArray[index]].answer[randCorrectAnsNum], isCorrect: true }];
          randCorrectAnsNumHolder = [...randCorrectAnsNumHolder, randCorrectAnsNum]
          k = k + 1;
        }
      }

      setRandAnswers([...randCorrectAnsHolder, {answer: data[randQuestionNumsArray[index]].wrongAns[randWrongAnsNum], isCorrect: false}])   // set randanswers array state with random answers
    }

  }


  // check if button(answer) that is clicked is correct
  const checkAnswer = (num, e) => {

    // make sure button has not been pressed yet
    if(e.target.ariaPressed == "false") {
      // if correct answer is chosen
      if(randAnswers[randAnswerNums[num]].isCorrect) {
        let buttonSettingsTemp = buttonSettings.slice()

        buttonSettingsTemp[num].icon = <Icon name='check' color='green'/> // add check icon
        buttonSettingsTemp[num].active=true   // keep button active
        // buttonSettingsTemp[num].disabled=true                               // set button to disabled

        // if the number of guesses left is 1
        if(numClicks === 1) {

          // make any remaining buttons disabled so user can't select
          for(let i = 0;i<4;i++) {
            if(buttonSettingsTemp[i].active === false) {
              buttonSettingsTemp[i].disabled = true
            }
          }

          // if isCorrect global state is true after all guesses for one question then add check(green) icon to correctwrong array state and add one to number that are correct
          if(isCorrect === true) {
            setCorrectWrongArray([...correctWrongArray, <Icon name='check' color='green'/>])
            setNumCorrect(numCorrect + 1)
          }

          // if isCorrect global state is false after all guesses for one question then add times(red) icon to correctwrong array state
          else if(isCorrect === false) {
            setCorrectWrongArray([...correctWrongArray, <Icon name='times' color='red'/>])
          }

          setOpenPortal(true)   // open "Next Question" button
        }

        setNumClicks(numClicks - 1)             // take one off of numClicks for number of guesses left
        setButtonSettings(buttonSettingsTemp)
      }

      // if wrong answer is chosen
      else if(randAnswers[randAnswerNums[num]].isCorrect === false) {
        let buttonSettingsTemp = buttonSettings.slice()
        setIsCorrect(false)   // set isCorrect state to false 

        buttonSettingsTemp[num].icon = <Icon name='times' color='red'/>   // set button icon to times(red)
        buttonSettingsTemp[num].active=true                               // set button to active
        // buttonSettingsTemp[num].disabled=true                               // set button to disabled


        // if number of guesses left is 1
        if(numClicks === 1) {
          // make all other buttons disabled
          for(let i = 0;i<4;i++) {
            if(buttonSettingsTemp[i].active === false) {
              buttonSettingsTemp[i].disabled = true
            }
          }
          setCorrectWrongArray([...correctWrongArray, <Icon key={counter} name='times' color='red'/>])    // add incorrect icon(red) to correctWrongArray state
        
          setOpenPortal(true) // open "Next Question" portal

        }

        setNumClicks(numClicks - 1) // subtract one from number of clicks(guesses)

        setButtonSettings(buttonSettingsTemp)   // set button setting including if disabled, active and icon
      }
    }
  }


  // Called when Next Question button is pressed
  const nextQuestion = () => {
    setCounter(counter + 1)
    // if questionIndex is less than 10 then reset certain states to default
    if(questionIndex < 9) {
      setOpenPortal(false)
      setIsCorrect(true)
      setQandA(examInfo, questionIndex + 1)
      setQuestionIndex(questionIndex + 1)
      setButtonSettings([{icon: '', disabled: false, active: false}, {icon: '', disabled: false, active: false},{icon: '', disabled: false, active: false},{icon: '', disabled: false, active: false}])
    }
    else {
      setOpenRestartModal(true)
    }
  }

  const resetStates = () => {
    dispatch(stopGame())
    setQuestionIndex(0)
    setOpenPortal(false)
    setIsCorrect(true)
    setQandA(examInfo, 0)
    setButtonSettings([{icon: '', disabled: false, active: false}, {icon: '', disabled: false, active: false},{icon: '', disabled: false, active: false},{icon: '', disabled: false, active: false}])
    setCorrectWrongArray([])
    setNumCorrect(0)
  }

  if(loaded){
    return (
      <div className='pageContainer'>

        <Card className='questionCard'>
          <Card.Content>
            <Card.Meta className='questionCounter' >Question {questionIndex + 1} of 10</Card.Meta>
            <Card.Header className='questionHeader'>{examInfo[randQuestionNums[questionIndex]].question}</Card.Header>
            
            <Card.Description className='questionChecks' content= {correctWrongArray} key={counter} />
          </Card.Content>
        </Card>

        <Segment raised className='gameContainer'>
        <Button className='gameButton' toggle active={buttonSettings[0].active} disabled={buttonSettings[0].disabled} fluid basic color='blue' onClick={(e) => checkAnswer(0, e)}>{buttonSettings[0].icon} A. {randAnswers[randAnswerNums[0]].answer}</Button>
        <Button className='gameButton' toggle active={buttonSettings[1].active} disabled={buttonSettings[1].disabled} fluid basic color='blue' onClick={(e) => checkAnswer(1, e)}>{buttonSettings[1].icon} B. {randAnswers[randAnswerNums[1]].answer}</Button>
        <Button className='gameButton' toggle active={buttonSettings[2].active} disabled={buttonSettings[2].disabled} fluid basic color='blue' onClick={(e) => checkAnswer(2, e)}>{buttonSettings[2].icon} C. {randAnswers[randAnswerNums[2]].answer}</Button>
        <Button className='gameButton' toggle active={buttonSettings[3].active} disabled={buttonSettings[3].disabled} fluid basic color='blue' onClick={(e) => checkAnswer(3, e)}>{buttonSettings[3].icon} D. {randAnswers[randAnswerNums[3]].answer}</Button>
        </Segment>

        <NextQuestionPortal openPortal={openPortal} setOpenPortal={() => setOpenPortal()} nextQuestion={() => nextQuestion()}/>

        <EndGameModal openRestartModal={openRestartModal} setOpenRestartModal={setOpenRestartModal} numCorrect={numCorrect} resetStates={resetStates}/>
      </div>
    )
  }
}

export default Game