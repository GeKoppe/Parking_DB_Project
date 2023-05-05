import '../Administration.css'
import Floor from './Floor/Floor';

export default function Floors(props: {floorSelected: number, floorClickHandler: (floor: number) => void}) {

    const buildFloorView = () => {
        let floors = [];
        for (let i = 1; i <= 9; i++) {
            floors.push(<Floor floor={i} selected={props.floorSelected === i} clickHandler={props.floorClickHandler}/>)
            floors.push(<br/>);
        }
        return floors;
    }

    return (
        <div className='floors'>
            {buildFloorView()}
        </div>
    )
}