import UsageCard from './UsageCard';
import DriveInCard from './DriveInCard';
import { useState } from 'react';

function MainMenu() {
    const [usage, setUsage] = useState(0);
    const [licClass, setlicClass] = useState('defaultInput');
    let licPlate = '';

    const driveInClickHandler = () => {
        const licChecker = /[A-ZÖÜÄ]{1,3}-[A-ZÖÜÄ]{1,2}-[1-9]{1}[0-9]{1,3}[EH]{1}/;
        if (!licChecker.test(licPlate)) {
            setlicClass('error');
            return false;
        } else {
            usage + 1 > 180? setUsage(usage) : setUsage((prev) => prev +1);
            setlicClass('defaultInput');
            // TODO Hier muss die tatsächliche Einfahrt geschehen.
            return true;
        }
    }

    const licChangeListener = (plate: string) => {
        licPlate = plate;
    }


    return (
        <div className="menuContainer" style={{width: "100%"}}>
            <div style={{width: "30%"}}>
                <DriveInCard buttonClickHandler={driveInClickHandler} licPlateClassName={licClass} changeListener={licChangeListener}/>
            </div>
            <div className="infoSide" style={{width: "25%"}}>
                <UsageCard usedSpaces={usage}/>
            </div>
        </div>
    )
}

export default MainMenu;