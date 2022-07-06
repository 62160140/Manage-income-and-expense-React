import './Transaction.css'
import Item from './Item'


const Transaction = ({data}) => {

  return (
    <div>
      <ul className='item-list'>
      {
        data.map((item)=>{
          return <Item title={item.title} amount={item.amount} key={item.id}/>
        })
      }
      </ul>
    </div>
  )
}

export default Transaction