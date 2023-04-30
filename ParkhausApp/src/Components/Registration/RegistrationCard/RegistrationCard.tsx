import '../Registration.css'
import RegButton from './CardParts/RegButton'
import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react'
import FormLabel from 'react-bootstrap/FormLabel';
import { conf } from '../../../res/config';

export default function RegistrationCard(tempProps: {licPlateClassName?: string, buttonClickHandler?: () => boolean, licChangeHandler: () => void}) {
    const props = {
        licPlateClassName: 'regDefaultInput',
        buttonClickHandler: () => console.log('Registriert!'),
        ...tempProps
    }

    const [plate, setPlate] = useState('');
    const [name, setName] = useState('');
    const [surName, setSurName] = useState('');
    const [iban, setIban] = useState('');
    const [licPlateClassName, setLicPlateClassName] = useState('regDefaultInput')
    const [ibanClassName, setIbanClassName] = useState('regDefaultInput');
    const [nameClassName, setNameClassName] = useState('regDefaultInput');
    const [surNameClassName, setSurNameClassName] = useState('regDefaultInput');

    const inputChanged = (value: string, source: string) => {
        switch (source) {
            case 'plate': licChange(value); break;
            case 'name': setNameClassName('regDefaultInput'); setName(value); break;
            case 'surName': setSurNameClassName('regDefaultInput'); setSurName(value); break;
            case 'iban': ibanChange(value); break;
            default: break;
        }
        return;
    }

    const licChange = (plate: string) : void => {
        setPlate(plate.toUpperCase());
        setLicPlateClassName('regDefaultInput');
        return;
    }

    const licPlateChecker = () : boolean => {
        const licChecker = /[A-ZÖÜÄ]{1,3}-[A-ZÖÜÄ]{1,2}-[1-9]{1}[0-9]{1,3}[EH]{0,1}/;
        if (!licChecker.test(plate) || plate.length > 12) {
            return false;
        }
        return true;
    }

    const ibanChecker = () : boolean => {
        const ibanRegex = /^(DE\d{2}\s\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d{2})$/;
        if (!ibanRegex.test(iban)) {
            return false;
        }
        return true;
    }

    const ibanChange = (iban: string) : void => {
        setIban(iban.toUpperCase());
        setIbanClassName('regDefaultInput');
        return;

    }

    const btnClickHandler = () => {
        let check = true;
        if (!licPlateChecker()) {
            setLicPlateClassName('errorInput');
            check = false;
        }

        if (!ibanChecker()) {
            setIbanClassName('errorInput');
            check = false;
        }

        if (!name || name === '' ) {
            setNameClassName('errorInput');
            check = false;
        }

        if (!surName || surName === '' ) {
            setSurNameClassName('errorInput');
            check = false;
        }

        if (!check) return;

        if (plate === 'RI-CK-1337') window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank', 'noreferrer');

        fetch(`http://${conf.api.host}:${conf.api.port}${conf.api.routes.registerAsPerma}`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({plate: plate, name: name, surName: surName})
        })
        .then(response => {
            if (response.status == 200 || response.status == 202) {
                console.log("Worked");
                setPlate('');
                setName('');
                setSurName('');
            } else {
                postNewPermaErrorHandler(response.status);
            }
        })
        .catch(reason => {
            postNewPermaErrorHandler(-1)
        })
    }

    const postNewPermaErrorHandler = (status: number) : void => {
        // TODO build this function
    }


    return (
        <div className="registrationCard">
            <div className='labels'>
                <FormLabel className="label"><b>Nummernschild: </b></FormLabel>
                <br/>
                <FormLabel className="label"><b>Vorname: </b></FormLabel>
                <br/>
                <FormLabel className="label"><b>Nachname: </b></FormLabel>
                <br/>
                <FormLabel className="label"><b>IBAN: </b></FormLabel>
            </div>
            <div className='inputs'>
                <input size={23} value={plate} className={licPlateClassName} onChange={ ({ target }) => inputChanged(target.value, 'plate')}/>
                <br/>
                <input size={23} value={name} className={nameClassName} onChange={ ({ target }) => inputChanged(target.value, 'name')}/>
                <br/>
                <input size={23} value={surName} className={surNameClassName} onChange={ ({ target }) => inputChanged(target.value, 'surName')}/>
                <br/>
                <input size={23} value={iban} className={ibanClassName} onChange={ ({ target }) => inputChanged(target.value, 'iban')}/>
                <br/><br/>
                <RegButton clickHandler={btnClickHandler}/>
            </div>
        </div>
    )
}