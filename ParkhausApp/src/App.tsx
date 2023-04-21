import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.css'
import MainMenu from './Components/MainMenu/MainMenu'

function App() {
  const [count, setCount] = useState(0)

  return (
    <MainMenu/>
  )
}

export default App
