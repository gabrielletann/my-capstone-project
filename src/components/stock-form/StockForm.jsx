import './StockForm.css'
import { useState, useContext, useCallback } from "react"
import { StockContext } from "../../context"

function MyForm() {
  const { stockList, setStockList } = useContext(StockContext); 
  const [name, setName] = useState("");
  const [qty, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [fetchedPrice, setFetchedPrice] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProfitLoss, setTotalProfitLoss] = useState(0);

  const API_KEY = '2O2QF7YRTDK84BWW';

 
  const fetchStockData = useCallback(async () => {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${name}&apikey=${API_KEY}`
    );
    return await response.json();
  }, [name, API_KEY]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      setLoading(true);
      setError(null);

      try {
        const data = await fetchStockData();

        setLoading(false);

        if (data['Global Quote'] && Object.keys(data['Global Quote']).length > 0) {
          const fetchedPrice = parseFloat(data['Global Quote']['05. price']);
          console.log('fetchedPrice:', fetchedPrice);
          setFetchedPrice(fetchedPrice);

          let inputPrice = parseFloat(price).toFixed(2) * qty;
          setTotalPrice(totalPrice + inputPrice);

          let profitLoss = ((qty * fetchedPrice) - (qty * price)).toFixed(2);
          setTotalProfitLoss(totalProfitLoss + parseFloat(profitLoss));

          setStockList((currentStockList) => [
            ...currentStockList,
            {
              id: Date(),
              ticker: name,
              quantity: qty,
              value: parseFloat(price).toFixed(2),
              currentPrice: fetchedPrice,
              date: Date(),
              profitLoss: profitLoss,
            },
          ]);
        } else {
          setPrice(null); 
          setError('Invalid stock ticker. Please enter a valid symbol.');
        }
      } catch (error) {
        setLoading(false);
        setError('Failed to fetch stock data. Please try again later.');
      }
    },
    [fetchStockData, qty, price, totalPrice, totalProfitLoss, name]
  );


  return (
    <>

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

{error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Stock Summary</h2>
      {stockList.length > 0 ? (
        <div className='tableContainer'>
          <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>Total Invested</th>
                <th>Total Profit/Loss</th>
              </tr>
            </thead>

            <tbody>
              <td>{totalPrice}</td>
              <td>{totalProfitLoss.toFixed(2)}</td>
            </tbody>
          </table>
        </div>
      ) : (
        <p></p>
      )}


      
    </>
  )
}

export default MyForm