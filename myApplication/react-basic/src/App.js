import './App.css';
import Transaction from './components/Transaction';
import FormComponent from './components/FormComponents';
import DataContext from './data/DataContext';
import ReportComponent from './components/ReportComponent'
import {useEffect, useState} from 'react'
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'


function App() {
  const design = {color:'red',textAlign:'center',fontSize:'1.5rem'}

  const initState = [
    {id:1,title:"ค่าเช่าบ้าน",amount:-2000},
    {id:2,title:"ค่าอาหารหมา",amount:-100},
    {id:3,title:"เงินเดือน",amount:12000},
    {id:4,title:"ทำงานรับผ้า",amount:120}
  ]

  const [items,setItems] = useState(initState)
  const [reportIncome , setReportIncome] = useState(0)
  const [reportExpense , setReportExpense]  = useState(0)

  const onAddNewItem=(newItem) =>{
    setItems((items)=> [newItem,...items])
  }




  useEffect(()=>{
    const amounts = items.map(items=>items.amount)
    const income = amounts.filter(element=> element>0).reduce((total,current)=>total+=current,0)
    const expense = (amounts.filter(element => element<0).reduce((total,current)=>total+=current,0))*-1
    
    setReportIncome(income.toFixed(2))
    setReportExpense(expense.toFixed(2))


  },[items])

  return (
    <DataContext.Provider value={{income : reportIncome,expense : reportExpense}}>
      <div className='container'>
          <h1 style={design}>โปรแกรมบัญชีรายรับ - รับจ่าย</h1>
          <Router>
          <div>
            <ul className='horizontal-menu'>
              <li>
                <Link to="/">ข้อมูลบัญชี</Link>
              </li>
              <li>
                <Link to="/insert">บันทึกข้อมูล</Link>
              </li>
            </ul>
            <Routes>
              <Route path="/" element={<ReportComponent/>} exact></Route>
              <Route path="/insert" element={
                <>
                  <FormComponent onAddItem={onAddNewItem}/>
                  <Transaction data = {items}/>
                </>
              }>
              </Route>
            </Routes>
          </div>
          </Router>
      </div>
    </DataContext.Provider>
     

  
  )
}

export default App;
