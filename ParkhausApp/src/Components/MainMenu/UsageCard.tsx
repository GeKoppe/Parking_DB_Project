import 'bootstrap/dist/css/bootstrap.css';
import './MainMenu.css';
import SpaceSubCard from './SpaceSubCard';
import { useState, useEffect } from 'react';
import { conf } from '../../res/config';

function UsageCard(tempProps?: {new?: boolean}) {
    const props = {
        new: false,
        ...tempProps
    }
    
    const [newInfo, setNewInfo] = useState(false);
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
        setNewInfo(false);
    }, []);

    const colorShades : string[] = ['#000000', '#000000', '#000000', '#290101c9', '#460101c9', '#680303c9', '#7c0404c9', '#940404c9', '#bb0606bb', '#ff0404bb'];

    let usage : number = usedSpaces / 180;
    const tColor : string = colorShades[(Math.floor(usage*10) > 9 ? 9 : Math.floor(usage*10))];

    return (
        <div className="usageCard">
            <h2>Belegung</h2>
            <br/>
            <SpaceSubCard freeSpaces={usedSpaces} textColor={tColor}/>
            <br/>
            <h5 className='spaceCard'>von</h5>
            <br/>
            <SpaceSubCard freeSpaces={180} textColor={tColor}/>
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