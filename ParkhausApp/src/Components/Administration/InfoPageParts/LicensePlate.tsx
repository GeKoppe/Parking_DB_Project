import '../Administration.css'

export default function LicensePlate(props:{plateNr: string}) {
    return (
        <div className="licensePlate">
            <h5>{props.plateNr}</h5>
        </div>
    )
}