import './Registration.css';
import RegistrationCard from './RegistrationCard/RegistrationCard';
import InfoCard from './InfoCard/InfoCard';

export default function Registration() {


    const licPlateHandler = () =>{
        
    }

    return (
        <div>
            <div className='header'>
                <h2>Als Dauerparker registrieren</h2>
            </div>
            <div className='registration'>
                <div className='regComps'>
                    <RegistrationCard licChangeHandler={licPlateHandler}/>
                </div>
                <div>
                    <InfoCard/>
                </div>
            </div>
        </div>
    )
}