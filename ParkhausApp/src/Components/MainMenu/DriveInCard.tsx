import DriveInButton from './DriveInButton'
import 'bootstrap/dist/css/bootstrap.css'
import './MainMenu.css'
import { useState } from 'react'
import FormLabel from 'react-bootstrap/FormLabel';
import Form from 'react-bootstrap/Form'

export default function DriveInCard(tempProps?: {licPlateClassName?: string, buttonClickHandler: (plate: string, perma: boolean) => boolean}) {
    const props = {
        licPlateClassName: 'defaultInput',
        buttonClickHandler: (plate: string, perma: boolean) => {return true;},
        ...tempProps,
    }

    const [licPlate, setLicPlate] = useState('');
    const [perma, setPerma] = useState(false);

    const changeListener = ({target} : { target: {value: string}}) => {
        let newLicPlate = target.value.toUpperCase();
        setLicPlate(newLicPlate);
    }
    
    const buttonClickHandler = () => {
        if (props.buttonClickHandler(licPlate, perma)) {
            setPerma(false);
            setLicPlate('');
        }
    }

    return (
        <div className="driveInCard">
            <FormLabel>Nummernschild:</FormLabel><br/><input value={licPlate} className={props.licPlateClassName} onChange={changeListener}/>
            <br/>
            <FormLabel>Dauerparker:</FormLabel><Form.Check type="switch" id="perma-parker" checked={perma} onChange={() => setPerma((prev) => !prev)}/>
            <br/>
            <div>
                <DriveInButton clickHandler={buttonClickHandler}/>
            </div>
        </div>
    )
}
