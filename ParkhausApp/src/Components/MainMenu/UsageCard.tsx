import 'bootstrap/dist/css/bootstrap.css';
import './MainMenu.css';
import SpaceSubCard from './SpaceSubCard';

function UsageCard(tempProps?: {usedSpaces?:number, permaParkers?: number}) {
    const props = {
        usedSpaces: 180,
        permaParkers: 0,
        ...tempProps
    }

    const colorShades : string[] = ['#000000', '#000000', '#000000', '#290101c9', '#460101c9', '#680303c9', '#7c0404c9', '#940404c9', '#bb0606bb', '#ff0404bb'];

    let usage : number = props.usedSpaces / 180;
    const tColor : string = colorShades[(Math.floor(usage*10) > 9 ? 9 : Math.floor(usage*10))];

    return (
        <div className="usageCard">
            <h2>Belegung</h2>
            <br/>
            <SpaceSubCard freeSpaces={props.usedSpaces} textColor={tColor}/>
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
                Dauerparker: {props.permaParkers}
            </h5>
        </div>
    )
}

export default UsageCard;