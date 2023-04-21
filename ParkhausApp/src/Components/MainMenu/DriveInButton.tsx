

function DriveInButton(props : {label: string, clickHandler: () => void}) {
    return (
        <button onClick={props.clickHandler}>{props.label}</button>
    )
}

DriveInButton.defaultProps = {
    label: "Einfahrt",
    clickHandler: () => {
        console.log("Einfahrt");
    }
}

export default DriveInButton;