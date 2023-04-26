import UsageCard from './UsageCard';
import DriveInCard from './DriveInCard';
import { useState } from 'react';
import { conf } from '../../res/config';

function MainMenu(tempProps?: {parentUsageHolder?: (usage: number) => void}) {
    const props = {
        parentUsageHolder: (usage: number) => console.log(`${usage}`),
        ...tempProps
    }

    const [licClass, setlicClass] = useState('defaultInput');
    const [newEntry, setNewEntry] = useState(false);

    const driveInClickHandler = (plate: string, perma: boolean) => {
        const licChecker = /[A-ZÖÜÄ]{1,3}-[A-ZÖÜÄ]{1,2}-[1-9]{1}[0-9]{1,3}[EH]{0,1}/;
        if (!licChecker.test(plate) || plate.length > 8) {
            setlicClass('error');
            return false;
        } else {
            fetch(`http://${conf.api.host}:${conf.api.port}/${conf.api.routes.newParker}`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({plate: plate, permaParker: perma})
            })
            .then(response => {
                // TODO the set new entry here is hella cursed, do something about it
                if (response.status == 200 || response.status == 202) {
                    console.log("Worked");
                    setNewEntry(true);
                }
                setNewEntry(false);
            })

            setlicClass('defaultInput');
            return true;
        }
    }


    return (
        <>
            <div className="menuContainer" style={{width: "100%"}}>
                <div className='mainSide'>
                    <DriveInCard buttonClickHandler={driveInClickHandler} licPlateClassName={licClass}/>
                </div>
                <div className="infoSide">
                    <UsageCard new={newEntry}/>
                </div>
            </div>
        </>
    )
}

export default MainMenu;