import 'bootstrap/dist/css/bootstrap.css';
import '../MainMenu.css';
import SpaceSubCard from './SpaceSubCard';
import { useState, useEffect } from 'react';
import { conf } from '../../../res/config';

export type Usage = {
	freeLots: number;
	usedParkingLots: number;
	freeLongTermParkingLots: number;
	usedLongTermParkingLots: number;
};

function UsageCard(tempProps: { usage: Usage }) {
	const props = {
		...tempProps,
	};

	const [usedSpaces, setUsedSpaces] = useState(0);
	const [permaParkers, setpermaParkers] = useState(0);

	// useEffect(() => {
	// 	fetch(`http://${conf.api.host}:${conf.api.port}/${conf.api.routes.usage}`, {
	// 		method: 'GET',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			'Access-Control-Allow-Origin': '*',
	// 		},
	// 	})
	// 		.then(data => {
	// 			return data.json() as Promise<Usage>;
	// 		})
	// 		.then(data => {
	// 			setUsedSpaces(data.usedParkingLots + data.usedLongTermParkingLots);
	// 			setpermaParkers(data.usedLongTermParkingLots);
	// 		});
	// }, [props.renderInfo]);

	const colorShades: string[] = ['#ffffff', '#ffdddd', '#fcb6b6', '#fca0a0', '#ff8e8e', '#f87474', '#ff5252', '#fd4343', '#fa2828', '#ff0000'];

	let usage: number = props.usage.usedParkingLots / 180;
	const tColor: string = colorShades[Math.floor(usage * 10) > 9 ? 9 : Math.floor(usage * 10)];

	return (
		<div className='usageCard'>
			<h4>Belegung</h4>
			<br />
			<SpaceSubCard freeSpaces={props.usage.usedParkingLots} textColor={tColor} />
			<br />
			<h4 className='spaceCard'>von 180</h4>
			<br />
			<h5>Auslastung: {parseInt('' + usage * 100)}%</h5>
			<br />
			<h5>Dauerparker: {props.usage.usedLongTermParkingLots}</h5>
			<br />
			<h5>Freie Plätze Kurzparker: {136 - props.usage.usedParkingLots}</h5>
			<h5 className='usedUp'>{140 - usedSpaces - 4 === 0 ? 'Belegt für Kurzparker!' : ''}</h5>
		</div>
	);
}

export default UsageCard;
