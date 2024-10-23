import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyForm from './components/stock-form/StockForm'
const StockContext = createContext()
function App() {
  const [stockList, setStockList] = useState([]);
  return (
    <StockContext.Provider value={{stockList, setStockList}}>
     <MyForm />
    </StockContext.Provider>
  )
}

export default App
