import LotCard from "./LotCard";
import InfoPage from "./InfoPage";
import { useState } from 'react';

export default function Administration(props:{lotsInUse: number[]}) {
    const [lotSelected, setLotSelected] = useState(-1);

    const lotClickHandler = (nr: number) => {
        setLotSelected((prev) => {
            return (nr === prev ? -1: nr);
        })
    }

    const getSingleCardRow = (row: number) => {
        let rows = [];
        for (let i = 1; i <= 15; i++) {
            if (((row- 1)*15) +i in props.lotsInUse) {
                rows.push(<LotCard inUse={true} lotNr={((row- 1)*15) +i} key={((row- 1)*15) +i} clickHandler={lotClickHandler} selected={lotSelected}/>);
            } else {
                rows.push(<LotCard lotNr={((row- 1)*15) +i} key={((row- 1)*15) +i} clickHandler={lotClickHandler} selected={lotSelected}/>);
            }
        }

        return (<div className="LotCardRow">{rows}</div>);
    }

    const buildLotCardView = () => {
        let rows = [];
        for (let i = 1; i <= 12; i ++) {
            rows.push(getSingleCardRow(i));
        }

        return rows;
    }

    return (
        <div className="Administration">
            <div className="LotCardContainer">
                {buildLotCardView()}
            </div>
            <div className="InfoPage">
                <InfoPage lotNr={lotSelected} inUse={lotSelected in props.lotsInUse}/>
            </div>
        </div>
    );
}