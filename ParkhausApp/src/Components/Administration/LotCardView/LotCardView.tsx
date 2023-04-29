import { useState, useEffect } from 'react';
import LotCard from './Lotcard/LotCard';
import { conf } from '../../../res/config';

export default function LotCardView(props: {lotClickHandler: (nr: number) => void, lotSelected: number, page: number}) {
    const [allLots, setAllLots] = useState<{nr: number, inUse: boolean}[]>([]);
    
    useEffect(() => {
        fetch(`http://${conf.api.host}:${conf.api.port}${conf.api.routes.allLots}?page=${props.page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json() as Promise<{lots: {nr: number, inUse: boolean}[]}>)
        .then(data => {
            setAllLots(data.lots);
        })
    }, [])

    useEffect(() => {

    }, [allLots]);
    
    const getSingleCardRow = (row: number) => {
        let rows = [];
        for (let i = 1; i <= 5; i++) {
            if (allLots.length > 0) {
                let pushed = false;
                for (let j = 0; j < allLots.length; j++) {
                    if (allLots[j].nr == ((row- 1)*5) +i + (20*(props.page - 1))) {
                        rows.push(<LotCard inUse={allLots[j].inUse} lotNr={((row- 1)*5) + i + (20*(props.page - 1))} key={((row- 1)*5) +i + (20*(props.page - 1))} clickHandler={props.lotClickHandler} selected={props.lotSelected}/>);
                        pushed = true;
                    }
                }
                if (!pushed) {
                    rows.push(<LotCard inUse={false} lotNr={((row- 1)*5) +i + (20*(props.page - 1))} key={((row- 1)*5) +i + (20*(props.page - 1))} clickHandler={props.lotClickHandler} selected={props.lotSelected}/>);
                }
            } else {
                rows.push(<LotCard inUse={false} lotNr={((row- 1)*5) +i + (20*(props.page - 1))} key={((row- 1)*5) +i + (20*(props.page - 1))} clickHandler={props.lotClickHandler} selected={props.lotSelected}/>);
            }
        }

        return (<div className="LotCardRow">{rows}</div>);
    }

    const buildLotCardView = () => {
        let rows = [];
        for (let i = 1; i <= 4; i ++) {
            rows.push(getSingleCardRow(i));
        }
        return rows;
    }

    return (
        <div className="LotCardContainer">
            {buildLotCardView()}
        </div>
    );
}