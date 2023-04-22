import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import './MainMenu.css';

function DriveInButton(tempProps? : { driveInClickHandler?: () => void, driveOutClickHandler?: () => void} ) {
    const props = {
        driveInClickHandler: () => console.log("Einfahrt"),
        driveOutClickHandler: () => console.log("Ausfahrt"),
        ...tempProps
    }
    return (
        <div className='buttonContainer'>
            <Button variant="outline-primary" onClick={props.driveInClickHandler} >Einfahrt</Button>
            <br/>
            <Button variant="outline-primary" onClick={props.driveOutClickHandler}>Ausfahrt</Button>
        </div>
    )
}

DriveInButton.defaultProps = {
    label: "Einfahrt",
    clickHandler: () => {
        console.log("Einfahrt");
    }
}

export default DriveInButton;