import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import MainMenu from './Components/MainMenu/MainMenu'
import Administration from './Components/Administration/Administration';
import Navbar from './Components/NavBar';

function App() {
  const [currentMenu, setCurrentMenu] = useState('MainMenu');
  let totalUsage = 0;

  const updateUsage = (usage: number) => totalUsage = usage;

  const clickHandler = (site: string) => {
    site === 'home' ? setCurrentMenu('MainMenu') : setCurrentMenu('Administration');
  }

  return (
    <>
      <Navbar clickHandler={clickHandler}/>
      {currentMenu == 'MainMenu' ? <MainMenu parentUsageHolder={updateUsage}/> : (currentMenu == 'Administration' ? <Administration totalUsage={totalUsage}/> : <h5>Hello World</h5>)}
    </>
  )
}

export default App
