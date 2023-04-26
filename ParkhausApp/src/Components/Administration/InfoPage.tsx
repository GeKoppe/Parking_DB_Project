import LicensePlate from "./InfoPageParts/LicensePlate"
import DriveInTime from "./InfoPageParts/DriveInTime";
import DriveOutButton from "./InfoPageParts/DriveOutButton";

export default function InfoPage(tempProps?:{lotNr?: number, inUse?:boolean}) {
    // For now, I just generate stuff randomly, later this will be replaced by an API call with the lotNr
    const props = {
        lotNr: -1,
        inUse: false,
        ...tempProps
    }

    const generateRandomLetter = () : string => {
        const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        return letters[Math.floor(Math.random() * 26)];
    }

    const getParkerInformation = (lotNr: number) : {plate: string, driveInTime: string, permaParker: boolean}=> {
        // TODO this gotta be a REST call, for now just randomly generated
        let plate = generateRandomLetter() + generateRandomLetter() + "-" + generateRandomLetter() + generateRandomLetter() + "-" + Math.ceil(Math.random() * 999);
        let start = new Date();
        start.setDate(new Date().getDate() - 5);
        const end = new Date();
        const driveInDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        const driveInTime = "" + driveInDate.getDate() + "." + (driveInDate.getMonth() + 1) + "." + driveInDate.getFullYear() + ", " + driveInDate.getHours() + ":" + driveInDate.getMinutes() + " Uhr";

        return {plate: plate, driveInTime: driveInTime, permaParker: (Math.random() > 0.5 ? true: false)};
    }

    if (props.lotNr === -1) {
        return (
            <div className="InfoContainer">
                <h3>Kein Parkplatz ausgewählt</h3>
            </div>
        )
    } else if (!props.inUse) {
        return (
            <div className="InfoContainer">
                <h3>Parkplatz {props.lotNr}</h3>
                <br/>
                <h3>Nicht belegt</h3>
            </div>
        )
    } else {
        const parkerInformation = getParkerInformation(props.lotNr);
        
        return (
            <div className="InfoContainer">
                <h3>Parkplatz {props.lotNr}</h3>
                <br/>
                <LicensePlate plateNr={parkerInformation.plate}/>
                <br/>
                <DriveInTime time={parkerInformation.driveInTime}/>
                <br/>
                <h5>Dauerparker: {parkerInformation.permaParker ? "Ja": "Nein"}</h5>
                <br/>
                <DriveOutButton/>
            </div>
        )
    }
}