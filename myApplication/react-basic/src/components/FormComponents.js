import { useState , useEffect } from 'react';
import './FormComponents.css'
import { v4 as uuidv4 } from 'uuid';



const FormComponent = ({onAddItem}) => {

  function clearState(){
    setTitle('')
      setAmount(0)
  } 


  const [title,setTitle] = useState('')
  const [amount,setAmount] = useState(0)
  const [fromValid , setFromValid]  = useState(false)

  const onInputTitle = (event) =>{
    const title  = event.target.value
    setTitle(title)
  }

  const onInputAmount = (event) =>{
    const amount = event.target.value;
    setAmount(amount)
  }

  const onSaveItem = (event) =>{
    event.preventDefault();

    const itemData = {
      id: uuidv4(),
      title:title,
      amount:Number(amount)
    }
    // ! prop ข้อมูลส่งไปให้ App Component 
    onAddItem(itemData)
    clearState()
  }


  useEffect(()=>{
    const checkData = title.trim().length>0 && amount !==0
    setFromValid(checkData)
  },[title,amount])

  return(
    <div>
        <form onSubmit={onSaveItem}>
          <div className="form-control">
              <label>ชื่อรายการ</label>
              <input type="text" placeholder="ระบุชื่อรายการ" onChange={onInputTitle} value={title}></input>
          </div>
          <div className="form-control">
              <label>จำนวนเงิน</label>
              <input type="number" placeholder="ระบุจำนวนเงิน" onChange={onInputAmount} value={amount}></input>
          </div>
          <div>
            <button type="submit" className='btn' disabled={!fromValid}>เพิ่มข้อมูล</button>
          </div>
        </form>
    </div>
  )

}

export default FormComponent