import '../Administration.css';

export default function LotCardHeader(tempProps: {maxNumber?: number}) {
    const props = {
        maxNumber: -1,
        ...tempProps
    }

    const header = props.maxNumber > 140 ? 'Dauerparkplätze' : 'Allgemeine Parkplätze';

    return (
        <div className="lotHeader">
            <h2>{header}</h2>
        </div>
    )
}