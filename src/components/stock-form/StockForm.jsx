// function MyForm() {
//     return (
//       <form>
//         <label>Enter your name:
//           <input type="text" />
//         </label>
//       </form>
//     )
//   }
//   export default MyForm

import './StockForm.css'
import {useState} from "react"

function MyForm() {
  const {stockList, setStockList} = useContext(StockContext); // Use context values
    const [name, setName] = useState("");
    const [qty, setQuantity] = useState();
    const [price, setPrice] = useState();
    // const [stockList, setStockList] = useState([])
    const [error, setError] = useState(null); // For validation errors
    const [loading, setLoading] = useState(false); // For loading state
    const [fetchedPrice, setFetchedPrice] = useState(null)

    const API_KEY = '2O2QF7YRTDK84BWW';

    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleString(); // Customize this as needed
    };


  // Fetch ticker information from Alpha Vantage API
  const validateTicker = async (ticker) => {
    setLoading(true);
    setError(null); // Clear any previous errors

    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`
    );
    const data = await response.json();

    setLoading(false);

    // Check if the response contains valid stock data
    if (data['Global Quote'] && Object.keys(data['Global Quote']).length > 0) {
      const fetchedPrice = parseFloat(data['Global Quote']['05. price']); // Fetch price from API
      setFetchedPrice(fetchedPrice); // Set the fetched price in the state
      return true; // Ticker is valid
    } else {
      setPrice(null); // Reset the price if ticker is invalid
      return false; // Ticker is invalid
    }
  };


  async function handleSubmit(e) {
    e.preventDefault();

// Validate the stock ticker symbol
const isValidTicker = await validateTicker(name);

if (!isValidTicker) {
      setError('Invalid stock ticker. Please enter a valid symbol.');
      return;
    }

    setStockList(currentStockList => {
      return [
        ...currentStockList,
        {
          id: Date(),
          ticker: name,
          quantity: qty,
          value: parseFloat(price).toFixed(2),
          currentPrice: fetchedPrice,
          date: Date(),
          profitLoss: ((qty*fetchedPrice) - (qty*price)).toFixed(2),
          totalPrice: (qty * price).toFixed(2)
        }
      ]
    })
  }
  
    return (
<>
      {/* Table to display ticker and total price */}
      <h2>Stock Summary</h2>
      {stockList.length > 0 ? (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Assets</th>
            </tr>
          </thead>
          <tbody>
            {stockList.map((stockItem) => (
              <tr key={stockItem.id}>
                <td>{stockItem.ticker}</td>
                <td>{stockItem.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No stocks added yet</p>
      )}


     <h1>Finance Dashboard</h1> 
     
     <form onSubmit={handleSubmit}>

          <input
          placeholder="Stock Symbol"
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />

          <input
          placeholder="Quantity"
            type="number"
            value={qty}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />

          <input
          placeholder="Purchase Price"
            type="number"
            step="any"
            value={price}
            onChange={(e) => setPrice((parseFloat)(e.target.value))}
          />

      <button type="submit" disabled={loading}>
          {loading ? 'Validating...' : 'Add Stock'}
        </button>
      </form>
  
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if ticker is invalid */}



      </>
    )
  }

  export default MyForm