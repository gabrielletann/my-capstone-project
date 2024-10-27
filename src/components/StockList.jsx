import { useContext } from "react"
import { StockContext } from "../context"
import './StockList.css'


function StockList() {

  const { stockList } = useContext(StockContext);
 
  console.log(stockList)

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); 
  };

  if (stockList.length === 0) {
    return <p>No stocks added yet</p>;
  }
  return (

    <div className="ListContainer">
      <h2>Stock List</h2>
      {stockList.map(stockItem => (
        <ul key={stockItem.id}>
          <li>Added on: {formatDate(stockItem.date)}</li>
          <li>Stock: {stockItem.ticker.toUpperCase()}</li>
          <li>Quantity: {stockItem.quantity}</li>
          <li>Purchased Price: {stockItem.value}</li>
          <li>Current Price: {stockItem.currentPrice}</li>
          <li className={stockItem.profitLoss > 0 ? 'green' : 'red'}> Profit/Loss: {stockItem.profitLoss}
          </li>
        </ul>



      ))}
    </div>

  )
}

export default StockList