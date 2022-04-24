import { useContext, useEffect, useState } from 'react'
import './InsertGpa.css'
import { GpaContext } from './SemGpaStore'
import {FaTimes} from 'react-icons/fa'


const SubjectItems = ( props ) => {
  const {subjectlist, setSubject} = useContext(GpaContext)
  
  // handle credit change
  function credChange(e) {
    let { value, min, max } = e.target;
    if (value === ""){
      let tempArray = [...subjectlist]
      tempArray[props.subjectID-1].credit = NaN
      setSubject(tempArray)
      return
    }
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));

    let tempArray = [...subjectlist]
    tempArray[props.subjectID-1].credit = Number(value)
    setSubject(tempArray)
  }

  // handle grade change
  function gradeChange(e) {
    let { value } = e.target;
    if (value === "--"){
      let tempArray = [...subjectlist]
      tempArray[props.subjectID-1].grade = NaN
      setSubject(tempArray)
      return
    }

    let tempArray = [...subjectlist]
    tempArray[props.subjectID-1].grade = Number(value)
    setSubject(tempArray)
  }

  //remove subject that user don't need
  function handleClick(e) {
    setSubject(function(prev) {
      let temp = prev.filter(subject => subject.id !== props.subjectID)
      for (let i = props.subjectID-1; i<temp.length; i++){
        temp[i].id -= 1
      }
      return temp
    })
  }


  return (
    <tr>
      <td>科目</td>
      <td><input type="number"  onWheel={(e) => e.target.blur()} min="0" max="4"  onChange={credChange} value={subjectlist[props.subjectID-1].credit} className="cred-column"/></td>
      <td>
        {/* <input type="number" onWheel={(e) => e.target.blur()} min="0.0" max="4.3" onChange={gradeChange} value={grade} className="grade-column"/> */}
        <select value={subjectlist[props.subjectID-1].grade} onChange={gradeChange}>
          <option value="--">--</option>
          <option value="4.3">A+</option>
          <option value="4">A</option>
          <option value="3.7">A-</option>
          <option value="3.3">B+</option>
          <option value="3">B</option>
          <option value="2.7">B-</option>
          <option value="2.3">C+</option>
          <option value="2">C</option>
          <option value="1.7">C-</option>
          <option value="1.3">D+</option>
          <option value="1">D</option>
          <option value="0">F</option>
        </select>

      </td>
      <td>
        <div className='delete-icon-subjectitem' onClick={handleClick}>
          <FaTimes/>
        </div>
      </td>
    </tr>
  )
}

export default SubjectItems