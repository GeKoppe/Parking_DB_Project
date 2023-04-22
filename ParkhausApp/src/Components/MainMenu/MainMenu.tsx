import UsageCard from './UsageCard';
import DriveInButton from './DriveInButton';
import { useState, useEffect } from 'react';

function MainMenu() {
    const [usage, setUsage] = useState(0);

    useEffect(() => {
        // TODO call the endpoint for used spaces here and call setUsage
        setUsage(Math.ceil(Math.random() * 180))
    }, []);

    const driveInClickHandler = () => {
        usage + 1 > 180? setUsage(usage) : setUsage((prev) => prev +1);
    }

    const driveOutClickHandler = () => {
        usage - 1 < 0 ? setUsage(usage) : setUsage((prev) => prev - 1);
    }

    return (
        <div className="menuContainer" style={{width: "100%"}}>
            <div style={{width: "65%"}}>
                <DriveInButton driveInClickHandler={driveInClickHandler} driveOutClickHandler={driveOutClickHandler}/>
            </div>
            <div className="infoSide" style={{width: "25%"}}>
                <UsageCard usedSpaces={usage}/>
            </div>
        </div>
    )
}

export default MainMenu;