import { useState} from "react"
import { StockContext } from "./context";

function StockProvider({children}) {
    const [stockList, setStockList] = useState([]);

    return (
    <StockContext.Provider value={{stockList, setStockList}}>
        {children}
    </StockContext.Provider>
    );

}

export default StockProvider