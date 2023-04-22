import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import MainMenu from './Components/MainMenu/MainMenu'

function App() {
  const [count, setCount] = useState(0)

  return (
    <MainMenu/>
  )
}

export default App
