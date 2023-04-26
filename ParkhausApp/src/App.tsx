import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import MainMenu from './Components/MainMenu/MainMenu'
import Administration from './Components/Administration/Administration';
import Navbar from './Components/NavBar';

function App() {
  const [currentMenu, setCurrentMenu] = useState('MainMenu');
  const [totalUsage, setTotalUsage] = useState(0);

  const updateUsage = (usage: number) => setTotalUsage(usage);

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
    <>
      <Navbar clickHandler={clickHandler}/>
      {currentMenu == 'MainMenu' ? <MainMenu parentUsageHolder={updateUsage}/> : (currentMenu == 'Administration' ? <Administration lotsInUse={lotsInUse}/> : <h5>Hello World</h5>)}
    </>
  )
}

export default App
