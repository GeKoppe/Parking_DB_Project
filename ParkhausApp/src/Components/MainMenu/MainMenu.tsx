import UsageCard from './UsageCard/UsageCard';
import DriveInCard from './DriveInCard/DriveInCard';
import PriceCard from './PriceCard/PriceCard';
import { useState } from 'react';
import { conf } from '../../res/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainMenu() {
    const [licClass, setlicClass] = useState('defaultInput');
    const [renderInfo, setRenderInfo] = useState(false);

    const licChangeHandler = () => {
        setlicClass('defaultInput');
    }

    const driveInClickHandler = (plate: string, perma: boolean) => {
        const licChecker = /[A-ZÖÜÄ]{1,3}-[A-ZÖÜÄ]{1,2}-[1-9]{1}[0-9]{1,3}[EH]{0,1}/;
        if (!licChecker.test(plate) || plate.length > 12) {
            setlicClass('error');
            return false;
        }

        if (plate === 'RI-CK-1337') window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank', 'noreferrer');
        if (plate === 'SMÜ-GE-17') window.open('https://www.google.com/maps/place/@48.3924956,10.8350031,17z/data=!3m2!4b1!5s0x479ebc94c8aa18e3:0x1b232ca59fd40517!4m6!3m5!1s0x479ebc94c8c512b9:0x3cee8fdba6a91970!8m2!3d48.3924956!4d10.8350031!16s%2Fg%2F1q2vx2c0f',  '_blank', 'noreferrer');
        
        fetch(`http://${conf.api.host}:${conf.api.port}${conf.api.routes.newParker}`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({plate: plate, permaParker: perma})
        })
        .then(response => {
            // TODO Error handling, anything other than 200 basically
            return response.json() as Promise<{pNumber: number, perma: boolean, name: string, surname: string}>;
        })
        .then(data  => {
            let welcomeString = 'Herzlich Willkommen';
            if (data?.perma) {
                welcomeString += ` ${data?.name} ${data?.surname}`;
            }
            welcomeString += '!\n';
            welcomeString += `Sie parken auf Parkplatz Nummer ${data?.pNumber}.`;
            toast.success(welcomeString, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        })
        setlicClass('defaultInput');
        return true;
        
    }


    return (
        <>
            <div className="menuContainer">
                <ToastContainer className='welcomeToast'/>
                <div className='mainSide'>
                    <PriceCard/>
                    <DriveInCard buttonClickHandler={driveInClickHandler} licPlateClassName={licClass} licChangeHandler={licChangeHandler}/>
                </div>
                <div className='vLine'></div>
                <div className="infoSide">
                    <UsageCard renderInfo={renderInfo}/>
                </div>
            </div>
        </>
    )
}

export default MainMenu;