import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import './MainMenu.css';

function DriveInButton(tempProps? : { clickHandler?: () => void, label?: string} ) {
    const props = {
        clickHandler: () => console.log("Einfahrt"),
        label: "Einfahrt",
        ...tempProps
    }
    return (
        <div className='buttonContainer'>
            <Button variant='custom' className='driveInButton' onClick={props.clickHandler}>{props.label}</Button>
        </div>
    )
}
export default DriveInButton;