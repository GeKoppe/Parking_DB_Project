import './Administration.css'
import CarIcon from './LotCardParts/CarIcon';

export default function LotCard(tempProps?: {inUse?: boolean, licPlate?: string, lotNr?: number, clickHandler?: (nr: number) => void, selected?: number}) {
    const props = {
        inUse: false,
        licPlate: "ABC-DE-123",
        lotNr: 1,
        clickHandler: (nr: number) => console.log(nr),
        selected: -1,
        ...tempProps
    }

    return (
        <div className={props.selected === props.lotNr ? "LotCardSelected": "LotCard"} onClick={() => props.clickHandler(props.lotNr)}>
            {props.inUse ? <CarIcon color="black"/> : <p style={{height: "20%"}}>/</p>}
            <p>{props.lotNr}</p>
        </div>
    )
}