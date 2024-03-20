import React, { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import {Data} from '../assets/Data'
import './Quiz.css';


function Quiz() {
  const [index,setIndex] = useState(0)
  const [question,setQuestion] = useState(Data[index])
  const [lock,setLock] = useState(false)
  const [score,setScore] = useState(0)
  const [result,setResult] = useState(false)

  const Option1 = useRef(null)
  const Option2 = useRef(null)
  const Option3 = useRef(null)
  const Option4 = useRef(null)

  const optionArray = [Option1, Option2, Option3, Option4]

  const checkAns = (e, ans)=>{
    if(!lock){
      if(question.ans === ans){
        e.target.classList.add("correct")
        setLock(true)
        setScore(prev=> prev + 1)
      }else{
        e.target.classList.add("wrong")
        setLock(true)
        optionArray[question.ans - 1].current.classList.add("correct")
      }
    }
  }

  const next = ()=>{
    if(lock === true){
      if(index === Data.length - 1){
        setResult(true)
        return
      }
      setIndex(prevIndex=> prevIndex + 1)//Increment index properly
        setQuestion(Data[index + 1])//changed to use update index
        setLock(false)
        optionArray.forEach(option=>{
          option.current.classList.remove("wrong")
          option.current.classList.remove("correct")
        })
      }
    }
  
  const resetQuiz = ()=>{
    setIndex(0)
    setQuestion(Data[0])
    setLock(false);
    setScore(0)
    setResult(false)
  }

  return (
    <>

    {result ? (
      <div className='container  mt-5 bg-white p-5' style={{width:'60%'}}>
      <h1 style={{color:'black'}} className='text-center'>QUIZ APP</h1>
      <hr/>
      <h1 style={{height:'50px',color:'black'}} className='text-center'>Result</h1>
      <h3 style={{height:'50px',color:'black'}} className='text-center'>Total Questions: 10</h3>
      <h2 style={{height:'50px',color:'black'}} className='text-center'>You Scored<span style={{fontSize:'40px',color:'black'}}>{score}/10</span></h2>
      <Button className='btn mb-2 text-center mt-5' style={{width:'200px',height:'50px',marginLeft:'270px'}} onClick={resetQuiz}><b>Play Again</b></Button>
      </div>
    ) : (

  
     <div className='container  mt-5 bg-white p-5' style={{width:'60%'}}>
      <h1 style={{color:'black'}} className='text-center'>QUIZ APP</h1>
      <hr/>
      
     
        <h2 className='text-black mb-4'>{index+1}.{question.question}</h2>
        <li ref={Option1}onClick={(e)=> (checkAns(e,1))} style={{border:' solid',borderRadius:'7px',cursor:'pointer'}} className='text-black  mb-3 p-1  '>{question.option1}</li>
        <li ref={Option2}onClick={(e)=> (checkAns(e,2))} style={{border:' solid',borderRadius:'7px',cursor:'pointer'}}className='text-black  mb-3 p-1 '>{question.option2}</li>
        <li ref={Option3}onClick={(e)=> (checkAns(e,3))} style={{border:' solid',borderRadius:'7px',cursor:'pointer'}} className='text-black mb-3 p-1 '>{question.option3}</li>
        <li ref={Option4} onClick={(e)=> (checkAns(e,4))}style={{border:' solid',borderRadius:'7px',cursor:'pointer'}}className='text-black mb-3 p-1  '>{question.option4}</li>
        <Button onClick={next} style={{float:'right'}} className='btn ps-5 pe-5 mt-3 '>Next</Button>
        <br />
        <br /><br />
        <div style={{color:'black'}} className='text-center'>{index+1} of 10 Questions</div>
  
     
     </div>
      )}
</>
  )
}

export default Quiz