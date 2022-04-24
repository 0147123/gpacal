import './Result.css'
import {FaTimes} from 'react-icons/fa'


const result = ( props ) =>{
  //close result block
  function undisplay(){
    props.setShowResult(false)
  }


  return (
    <div className='wrapper-result'>
      <div className="result-box">
        <h3>計算結果：</h3>
        <p>{props.displayResult}</p>
        <div id='delete-icon' onClick={undisplay}>
          <FaTimes/>
        </div>
      </div>
    </div>
  )
}

export default result