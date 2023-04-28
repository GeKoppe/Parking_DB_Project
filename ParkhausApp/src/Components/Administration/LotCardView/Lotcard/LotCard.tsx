import '../../Administration.css'
import Icon from './LotCardParts/Icon';

export default function LotCard(tempProps?: {inUse?: boolean, licPlate?: string, lotNr?: number, clickHandler?: (nr: number) => void, selected?: number}) {
    const props = {
        inUse: false,
        licPlate: "ABC-DE-123",
        lotNr: 1,
        clickHandler: (nr: number) => console.log(nr),
        selected: -1,
        ...tempProps
    }

    const colors : string[] = ['blueviolet', 'black', 'burlywood', 'tomato'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    return (
        <div className={props.selected === props.lotNr ? "LotCardSelected": (props.inUse ? "LotCardUsed": "LotCard")} onClick={() => props.clickHandler(props.lotNr)}>
            <Icon used={props.inUse}/>
            <br/>
            <h4>{props.lotNr}</h4>
        </div>
    )
}