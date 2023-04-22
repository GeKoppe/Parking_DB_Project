import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import MainMenu from './Components/MainMenu/MainMenu'
import Administration from './Components/Administration/Administration';

function App() {
  const [currentMenu, setCurrentMenu] = useState('MainMenu');

  const clickHandler = () => {
    currentMenu === 'Administration' ? setCurrentMenu('MainMenu') : setCurrentMenu('Administration');
  }

  return (
    <>
      {currentMenu == 'MainMenu' ? <MainMenu/> : (currentMenu == 'Administration' ? <Administration/> : <h5>Hello World</h5>)}
    </>
  )
}

export default App
