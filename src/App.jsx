import { useEffect, useState } from 'react'
import './App.css'


const API_KEY = import.meta.env.VITE_APP_API_KEY

function App() {
  const [list, setlist] = useState(null)

  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch(

      )
    }

  }, [])
  return (
    <>

    </>
  )
}

export default App
