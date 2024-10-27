import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyForm from './components/stock-form/StockForm'
import StockList from './components/StockList'
import StockProvider from './StockContext'



function App() {
  
  return (
    <StockProvider>
     <MyForm />
     <StockList/>
    </StockProvider>
  )
}

export default App
