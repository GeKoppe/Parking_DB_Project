import './Administration.css'
import CarIcon from './LotCardParts/CarIcon';
import CarLogo from './LotCardParts/SVG/CarLogo';

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
        <div className={props.selected === props.lotNr ? "LotCardSelected": "LotCard"} onClick={() => props.clickHandler(props.lotNr)}>
            {props.inUse ? <CarIcon color={color}/> : <p style={{height: "20%"}}>/</p>}
            <p>{props.lotNr}</p>
        </div>
    )
}