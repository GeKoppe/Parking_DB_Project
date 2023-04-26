import UsageCard from './UsageCard';
import DriveInCard from './DriveInCard';
import { useState } from 'react';
import { conf } from '../../res/config';

function MainMenu(tempProps?: {parentUsageHolder?: (usage: number) => void}) {
    const props = {
        parentUsageHolder: (usage: number) => console.log(`${usage}`),
        ...tempProps
    }
    const [usage, setUsage] = useState(0);
    const [permaParkers, setpermaParkers] = useState(0);
    const [licClass, setlicClass] = useState('defaultInput');
    let licPlate = '';
    let permaParker = false;

    const driveInClickHandler = () => {
        const licChecker = /[A-ZÖÜÄ]{1,3}-[A-ZÖÜÄ]{1,2}-[1-9]{1}[0-9]{1,3}[EH]{0,1}/;
        if (!licChecker.test(licPlate)) {
            setlicClass('error');
            return false;
        } else {
            usage + 1 > 180? setUsage(usage) : setUsage((prev) => prev +1);
            props.parentUsageHolder(usage);
            permaParker ? setpermaParkers((prev) => prev + 1) : setpermaParkers((prev) => prev);
            setlicClass('defaultInput');
            return true;
        }
    }

    const licChangeListener = (plate: string, perma: boolean) => {
        licPlate = plate;
        permaParker = perma;
    }


    return (
        <>
            <div className="menuContainer" style={{width: "100%"}}>
                <div className='mainSide'>
                    <DriveInCard buttonClickHandler={driveInClickHandler} licPlateClassName={licClass} changeListener={licChangeListener}/>
                </div>
                <div className="infoSide">
                    <UsageCard usedSpaces={usage} permaParkers={permaParkers}/>
                </div>
            </div>
        </>
    )
}

export default MainMenu;