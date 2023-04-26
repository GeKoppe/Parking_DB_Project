import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';

export default function DriveOutButton(tempProps?:{clickHandler?: () => void}) {
    const props = {
        clickHandler: () => console.log("Ausfahrt"),
        ...tempProps
    }
    return (
        <Button variant="outline-primary" onClick={props.clickHandler}>Ausfahrt</Button>
    )
}