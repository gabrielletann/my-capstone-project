import { useContext } from "react"


function StockList() {
    const {stockList} = useContext(StockContext)
    return (
        <h2>Stock List</h2>
        {stockList.map(stock => {
          <ul key={stockItem.id}>
          <li>Added on: {formatDate(stockItem.date)}</li>
          <ul>Stock: {stockItem.ticker}</ul>
          <ul>Quantity: {stockItem.quantity}</ul>
          <ul>Purchased Price: {stockItem.value}</ul>
          <ul>Current Price: {stockItem.currentPrice}</ul>
          <ul className= {stockItem.profitLoss > 0 ? 'green' : 'red'}> Profit/Loss: {stockItem.profitLoss} 
         </ul>
          {/* <ul>Total Price: {stockItem.totalPrice}</ul> */}
  
  
          
          </ul>
        }) }

        // {stockList.map(stockItem => {
          
          
        //   <ul key={stockItem.id}>
        //   <ul>Added on: {formatDate(stockItem.date)}</ul>
        //   <ul>Stock: {stockItem.ticker}</ul>
        //   <ul>Quantity: {stockItem.quantity}</ul>
        //   <ul>Purchased Price: {stockItem.value}</ul>
        //   <ul>Current Price: {stockItem.currentPrice}</ul>
        //   <ul className= {stockItem.profitLoss > 0 ? 'green' : 'red'}> Profit/Loss: {stockItem.profitLoss} 
        //  </ul>
        //   {/* <ul>Total Price: {stockItem.totalPrice}</ul> */}
  
  
          
        //   </ul>
  
        //   )
  
        // } )}
    )
}