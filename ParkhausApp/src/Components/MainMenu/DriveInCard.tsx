import DriveInButton from './DriveInButton'
import 'bootstrap/dist/css/bootstrap.css'
import './MainMenu.css'
import { useState } from 'react'
import FormLabel from 'react-bootstrap/FormLabel';
import Form from 'react-bootstrap/Form'

export default function DriveInCard(tempProps?: {licPlateClassName?: string, buttonClickHandler: () => boolean, changeListener?: (plate: string, perma: boolean) => void}) {
    const props = {
        licPlateClassName: 'defaultInput',
        buttonClickHandler: () => {return true;},
        changeListener: (plate: string) => console.log(`${plate}`),
        ...tempProps,
    }

    const [licPlate, setLicPlate] = useState('');
    const [perma, setPerma] = useState(true);

    const changeListener = ({target} : { target: {value: string}}) => {
        let newLicPlate = target.value.toUpperCase();
        setLicPlate(newLicPlate);
        props.changeListener(newLicPlate, perma);
    }

    const permaChange = () => {
        setPerma((prev) => !prev);
        props.changeListener(licPlate, perma);
    }
    
    const buttonClickHandler = () => {
        if (props.buttonClickHandler()) {
            setLicPlate('');
        }
    }

    return (
        <div className="driveInCard">
            <FormLabel>Nummernschild:</FormLabel><br/><input value={licPlate} onChange={changeListener} className={props.licPlateClassName}/>
            <br/>
            <FormLabel>Dauerparker:</FormLabel><Form.Check type="switch" id="perma-parker" checked={perma} onChange={permaChange}/>
            <br/>
            <div>
                <DriveInButton clickHandler={buttonClickHandler}/>
            </div>
        </div>
    )
}
