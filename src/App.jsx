import { useEffect, useState } from 'react'
import './App.css'
import CoinInfo from "./components/CoinInfo"

const API_KEY = import.meta.env.VITE_APP_API_KEY

function App() {
  const [list, setlist] = useState(null)
  const [filteredResults, setFilteredResults] = useState([])
  const [searchInput, setSetInput] = useState("")

  const searchItems = searchValue => {
  setSearchInput(searchValue)
  if (searchValue !== "") {
    const filteredData = list.Data.filter((item) => 
      Object.values(item.CoinInfo)
        .join("")
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    )
    setFilteredResults(filteredData)
  } else {
    setFilteredResults(list.Data)
  }
}

  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/top/totaltoptiervol?limit=10&assetClass=ALL&tsym=usd&api_key="
        + API_KEY
      )
      const json = await response.json()
      setlist(json)
    }
    fetchAllCoinData().catch(console.error)
  }, [])

  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>
      <ul>
        {/* We want to check if our list exists
            if it does, map the Data property of our list to
            CoinInfo property of each entry*/}
        {list?.Data
          .map(data => data.CoinInfo)
          .filter(coinData =>
            coinData.Algorithm != "N/A" &&
            coinData.ProofType != "N/A"
          )

          .map(coinData => (
            <CoinInfo
              image={coinData.ImageUrl}
              name={coinData.FullName}
              symbol={coinData.Name}
            />
          ))}

        <input
          type="text"
          placeholder="Search..."
          onChange={(inputString) => searchItems(inputString.target.value)}
        />


      </ul>
    </div>
  )
}

export default App
