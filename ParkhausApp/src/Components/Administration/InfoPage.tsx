import LicensePlate from "./InfoPageParts/LicensePlate"
import DriveInTime from "./InfoPageParts/DriveInTime";
import DriveOutButton from "./InfoPageParts/DriveOutButton";
import { useState, useEffect } from 'react';
import { conf } from "../../res/config";

export default function InfoPage(tempProps?:{lotNr?: number, inUse?:boolean}) {
    // For now, I just generate stuff randomly, later this will be replaced by an API call with the lotNr
    const props = {
        lotNr: -1,
        ...tempProps
    }

    const [lotInfo, setLotInfo] = useState({
        plate: '',
        driveInTime: '',
        permaParker: false
    });

    useEffect(() => {
        fetch(`http://${conf.api.host}:${conf.api.port}/${conf.api.routes.getLotInfo}/${props.lotNr}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json() as Promise<{plate: string, time: string, perma: true}>)
        .then(data => {
            setLotInfo({
                plate: data.plate,
                driveInTime: data.time,
                permaParker: data.perma
            });
        })
    }, [])



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
        return (
            <div className="InfoContainer">
                <h3>Parkplatz {props.lotNr}</h3>
                <br/>
                <LicensePlate plateNr={lotInfo.plate}/>
                <br/>
                <DriveInTime time={lotInfo.driveInTime}/>
                <br/>
                <h5>Dauerparker: {lotInfo.permaParker ? "Ja": "Nein"}</h5>
                <br/>
                <DriveOutButton/>
            </div>
        )
    }
}