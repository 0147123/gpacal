import { useEffect, useState } from 'react'
import './InsertGpa.css'
import SubjectItems from './SubjectItems'
import Result from './Result'
import {GpaContext} from './SemGpaStore'
import { v4 as uuidv4 } from 'uuid';


const InsertGpa = () =>{
  //declare variable
  const [subjectlist, setSubject] = useState(
    [
      {
        'id': 1,
        'credit': '',
        'grade': ''
      },
      {
        'id': 2,
        'credit': '',
        'grade': ''
      },
      {
        'id': 3,
        'credit': '',
        'grade': ''
      },
      {
        'id': 4,
        'credit': '',
        'grade': ''
      },
      {
        'id': 5,
        'credit': '',
        'grade': ''
      },
    ]
  )

  const [tarGpaInput, settarGpaInput] = useState({
    'currentGpa': '',
    'studiedCred': '',
    'tarCgpa': '',
    'remainCred': ''
  })
  const [showResult, setShowResult] = useState(false)

  var [gpaResult, setGpaResult] = useState("")






  // click to add new subject
  function plus() {
    setSubject(function (prevSubList) {
      // for null subjectlist, the subjectlist.id need to be assign as 1
      if (prevSubList.length === 0){
        return [{
          'id': 1,
          'credit': '',
          'grade': ''
        }]
      }
      return [...prevSubList, {
        'id': prevSubList[prevSubList.length-1].id+1,
        'credit': '',
        'grade': ''
      }
    ]})
  }

  // map element in subjectlist
  const listItems = subjectlist.map((subject) => {
    return(
      <SubjectItems key={subject.id} subjectID ={subject.id} subjectlist={subjectlist}/>
    )
  })


  // calculate sem gpa
  function calGpa() {
    let total = 0
    let sumCred = 0
    if (subjectlist.length === 0){
      alert("請最少輸入一個科目")
      return
    }

    for (const i of subjectlist) {
      if (!isNaN(i.credit) && i.credit !== "" && (isNaN(i.grade) || i.grade === 0 || i.grade === "")){
        alert("請輸入學分 (Credit) 所對應的等級 (Grade)")
        return
      }
      total+= i.credit*i.grade
      sumCred+= i.credit
    }
    let result = total/sumCred
    
    if (isNaN(result) ) {
      alert("請輸入數字")
    }
    else{
      setShowResult(true)
      setGpaResult("你的學期(Semster) GPA為: " + String(Math.round(result * 100) / 100))
    }
  }

  //handle target gpa change
  function tarGpaChange(e) {
    let { value, min, max, name } = e.target;
    if (value === ""){
      settarGpaInput("")
      let tempArray = {...tarGpaInput}
      tempArray[name] = NaN
      settarGpaInput(tempArray)
      return
    }

    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    let tempArray = {...tarGpaInput}
    tempArray[name] = value
    settarGpaInput(tempArray)
  }

  //calculate target gpa 
  function calTargpa(){
    let displayResult = (tarGpaInput.tarCgpa*(tarGpaInput.remainCred+tarGpaInput.studiedCred)-(tarGpaInput.currentGpa*tarGpaInput.studiedCred))/tarGpaInput.remainCred
    if (isNaN(displayResult) || typeof displayResult == 'undefined') {
      alert("請輸入數字")
      return
    }
    if (!Number.isInteger(tarGpaInput.studiedCred) || !Number.isInteger(tarGpaInput.remainCred)){
      alert("學分(Credit) 必須是整數")
      return
    }
    if (displayResult > 4.3){
      setShowResult(true)
      setGpaResult("無法達到此目標")
      return
    }
    setShowResult(true)
    setGpaResult("為了達到您目標的 " + tarGpaInput.tarCgpa + " cgpa，你需要在剩餘的 " + tarGpaInput.remainCred + " 學分 (Credit) 中獲得:\t\t" + String(Math.round(displayResult * 100) / 100) + " gpa")
  }


  return (
    <GpaContext.Provider value={{subjectlist, setSubject}}>
        <div className="gpa-cal-container">
          <div className="wrapper-content">
            <div id="content-layout">
              <div id="gpa-cal-container">
                <div className="wrapper-content">
                  <div id="content-layout">
                    <div id="semster-gpa-container">
                      <h2>學期(Semster) GPA 計算</h2>
                      <div className="gpa-box" id="sem-gpa-box">
                        <table className="input-table" id="gpa-cal-table">
                          <thead>
                            <tr>
                              <th width="20%"></th>
                              <th width="40%">學分 (Credit)</th>
                              <th width="40%">等級 (Grade)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {listItems}
                          </tbody>
                        </table>

                        <div className='button-list-wrapper'>
                          <div className="button-list">
                              <button className="red-button" onClick={plus}>新增科目</button>
                              <button className="white-button" onClick={calGpa}>計算</button>
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="target-gpa-container">
                <h2>目標 CGPA 計算</h2>
                <div className="gpa-box" id="target-gpa-box">
                  <table className="input-table" id="target-gpa-table">
                    <tbody>
                      <tr>
                        <td width="40%">現時CGPA</td>
                        <td width="60%" className="input-row"><input type="number" name="currentGpa" onWheel={(e) => e.target.blur()} min="0" max="4.3"  onChange={tarGpaChange} value={tarGpaInput.currentGpa} className="tar-column"/></td>
                      </tr>
                      <tr>
                        <td>已修讀學分 (Credit)</td>
                        <td className="input-row"><input type="number" name="studiedCred"  onWheel={(e) => e.target.blur()} min="0" max="100" onChange={tarGpaChange} value={tarGpaInput.studiedCred} className="tar-column"/></td>
                      </tr>
                      <tr>
                        <td>目標CGPA</td>
                        <td className="input-row"><input type="number" name="tarCgpa" onWheel={(e) => e.target.blur()} min="0" max="4.3" onChange={tarGpaChange} value={tarGpaInput.tarCgpa} className="tar-column"/></td>
                      </tr>
                      <tr>
                        <td>餘下學分 (Credit)</td>
                        <td className="input-row"><input type="number" name="remainCred" onWheel={(e) => e.target.blur()} min="0" max="100" onChange={tarGpaChange} value={tarGpaInput.remainCred} className="tar-column"/></td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="tar-cal-button-area">
                    <button className="white-button" onClick={calTargpa} >計算</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showResult && <Result displayResult={gpaResult} setShowResult={setShowResult}/>}

        </div>
    </GpaContext.Provider>
  )
}

export default InsertGpa;