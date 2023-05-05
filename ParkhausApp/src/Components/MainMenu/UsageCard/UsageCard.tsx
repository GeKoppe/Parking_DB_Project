import 'bootstrap/dist/css/bootstrap.css';
import '../MainMenu.css';
import SpaceSubCard from './SpaceSubCard';
import { useState, useEffect } from 'react';
import { conf } from '../../../res/config';

function UsageCard(tempProps: {renderInfo?: boolean}) {
    const props = {
        renderInfo: false,
        ...tempProps
    }
    
    const [usedSpaces, setUsedSpaces] = useState(0);
    const [permaParkers, setpermaParkers] = useState(0);

    useEffect(() => {
        fetch(`http://${conf.api.host}:${conf.api.port}/${conf.api.routes.usage}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(data => {
            return data.json() as Promise<{usage: number, perma: number}>;
        })
        .then(data => {
            setUsedSpaces(data.usage);
            setpermaParkers(data.perma);
        });
    }, [props.renderInfo]);

    const colorShades : string[] = ['#ffffff', '#ffdddd', '#fcb6b6', '#fca0a0', '#ff8e8e', '#f87474', '#ff5252', '#fd4343', '#fa2828', '#ff0000'];

    let usage : number = usedSpaces / 180;
    const tColor : string = colorShades[(Math.floor(usage*10) > 9 ? 9 : Math.floor(usage*10))];

    return (
        <div className="usageCard">
            <h4>Belegung</h4>
            <br/>
            <SpaceSubCard freeSpaces={usedSpaces} textColor={tColor}/>
            <br/>
            <h4 className='spaceCard'>von 180</h4>
            <br/>
            <h5>
                Auslastung: {parseInt("" + (usage * 100))}%
            </h5>
            <br/>
            <h5>
                Dauerparker: {permaParkers}
            </h5>
        </div>
    )
}

export default UsageCard;