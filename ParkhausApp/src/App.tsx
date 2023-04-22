import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import MainMenu from './Components/MainMenu/MainMenu'
import Administration from './Components/Administration/Administration';
import Navbar from './Components/NavBar';

function App() {
  const [currentMenu, setCurrentMenu] = useState('MainMenu');

  const clickHandler = (site: string) => {
    site === 'home' ? setCurrentMenu('MainMenu') : setCurrentMenu('Administration');
  }

  return (
    <>
      <Navbar clickHandler={clickHandler}/>
      {currentMenu == 'MainMenu' ? <MainMenu/> : (currentMenu == 'Administration' ? <Administration/> : <h5>Hello World</h5>)}
    </>
  )
}

export default App
