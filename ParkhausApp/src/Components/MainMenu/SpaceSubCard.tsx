import 'bootstrap/dist/css/bootstrap.css';
import './MainMenu.css';

export default function SpaceSubCard(tempProps?: {freeSpaces?: number, textColor?: string}) {
    const props = {
        freeSpaces: 180,
        textColor: "white",
        ...tempProps
    }
    return (
        <div className="spaceCard">
            <h1 style={{color: props.textColor}}>
                {props.freeSpaces}
            </h1>
        </div>
    )
}