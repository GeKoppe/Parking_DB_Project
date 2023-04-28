import LotCardView from "./LotCardView/LotCardView";
import InfoPage from "./InfoPage";
import { useState } from 'react';

export default function Administration() {
    const [lotSelected, setLotSelected] = useState(-1);
    
    const lotClickHandler = (nr: number) => {
        setLotSelected((prev) => {
            return (nr === prev ? -1: nr);
        })
    }

    return (
        <div className="Administration">
            <LotCardView lotClickHandler={lotClickHandler} lotSelected={lotSelected}/>
            <div className="InfoPage">
                <InfoPage lotNr={lotSelected}/>
            </div>
        </div>
    );
}