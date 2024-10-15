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
    const [name, setName] = useState("");
  
    return (
      <form>

          <input
          placeholder="Stock Symbol"
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />



          <input
          placeholder="Quantity"
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />


          <input
          placeholder="Purchase Price"
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
    <button type="submit">Add Stock</button>
    
      </form>


    )
  }

  export default MyForm