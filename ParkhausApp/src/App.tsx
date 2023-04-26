import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import MainMenu from './Components/MainMenu/MainMenu'
import Administration from './Components/Administration/Administration';
import Navbar from './Components/NavBar';
import './App.css'

function App() {
  const [currentMenu, setCurrentMenu] = useState('MainMenu');

  const clickHandler = (site: string) => {
    site === 'home' ? setCurrentMenu('MainMenu') : setCurrentMenu('Administration');
  }

  const mockUsage = Math.ceil(Math.random() * 180);
  let lotsInUse : number[] = [];
  for (let i = 0; i < mockUsage; i++) {
      let selected = Math.ceil(Math.random() * 180);

      while (true) {
          let isInUse = true;
          for (let j = 0; j < lotsInUse.length; j++) {
              if (selected === lotsInUse[j]) {
                  isInUse = true;
                  break;
              }
          }

          if (isInUse) {
              lotsInUse.push(i);
              break;
          }
      }
  }

  return (
    <div>
      <Navbar clickHandler={clickHandler}/>
      {currentMenu == 'MainMenu' ? <MainMenu /> : (currentMenu == 'Administration' ? <Administration/> : <h5>Hello World</h5>)}
    </div>
  )
}

export default App
