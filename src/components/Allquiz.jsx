import React, { useRef, useState } from 'react'
import './Allquiz.css'
import { Col, Row } from 'react-bootstrap'
import { data } from '../data';

function Allquiz() {

    let [index,setIndex] = useState(0);
    let [question,setQuestion] = useState(data[index]);
    let [lock,setLock] = useState(false);
    let [score,setScore] =useState(0)
    let [result,setResult] =useState(false)

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let optionArray = [Option1,Option2,Option3,Option4];

    const checkAns = (e,ans)=>{
        if(lock === false){
            if(question.ans===ans){
                e.target.classList.add("Correct");
                setLock(true);
                setScore(prev=>prev+1)
            }else{
                e.target.classList.add("Wrong");
                setLock(true);
                optionArray[question.ans-1].current.classList.add("Correct");
            }
        }
    }

    const next = () =>{
        if(lock===true){
            if (index===data.length-1) {
                setResult(true)
                return 0

            }
            setIndex(++index)
            setQuestion(data[index])
            setLock(false)
            optionArray.map((option)=>{
                option.current.classList.remove("Wrong")
                option.current.classList.remove("Correct")
                return null
            })
        }
    }

    const reset = ()=>{
        setIndex(0)
        setQuestion(data[0])
        setScore(0)
        setLock(false)
        setResult(false)
    }

  return (
    <>
        <div style={{height: '100vh',border: '1px solid',backgroundImage: 'url("https://static.bhphotovideo.com/explora/sites/default/files/light1.gif")',backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%'}}>
        <h1 className='d-flex justify-content-center mt-4'>Quiz App</h1>
            <div className='quizbox container ' style={{height: '70vh',width: '130vh'}}>
                {result?<></>
                :
                <>
                <Row>
                    <Col className='ms-2 mt-4' >
                        <div className='index fw-bolder'>{index+1} of {data.length} questions</div>
                        <h4 className='mt-2'>{index+1}. {question.question}</h4>
                    </Col>
                    <Col className='ms-3 mt-4'>
                        <ul>
                            <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
                            <li ref={Option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
                            <li ref={Option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
                            <li ref={Option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
                        </ul> 
                        <div className='float-end'><button onClick={next} className='button1 border rounded btn-warning'>Next</button></div>
                    </Col>
                </Row>
                </>
                }
                {result?
                <>
                    <div className='d-flex justify-content-center align-items-center flex-column mt-5'>
                        <h2 className='mt-5'>You Scored {score} out of {data.length}</h2>
                        <div><button onClick={reset} className='button1 border rounded d-flex justify-content-center align-items-center'>Reset</button></div>
                    </div>
                </>
                :
                <></>
                }
            </div>
        </div>
    </>
  )
}

export default Allquiz