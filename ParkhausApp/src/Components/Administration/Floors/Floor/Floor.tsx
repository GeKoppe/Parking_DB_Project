import '../../Administration.css';

export default function Floor(props: {selected: boolean, floor: number, clickHandler: (floor: number) => void}) {

    return (
        <div className={props.selected ? 'floorSelected' : 'floor'} onClick={() => props.clickHandler(props.floor)}>
            <h3>Etage {props.floor}</h3>
        </div>
    )
}