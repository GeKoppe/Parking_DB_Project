import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';

function DriveInButton(tempProps? : { clickHandler?: () => void, label?: string} ) {
    const props = {
        clickHandler: () => console.log("Einfahrt"),
        label: "Registrieren",
        ...tempProps
    }

    return (
        <div className='buttonContainer'>
            <Button variant='custom' className='regButton' onClick={props.clickHandler}>{props.label}</Button>
        </div>
    )
}
export default DriveInButton;