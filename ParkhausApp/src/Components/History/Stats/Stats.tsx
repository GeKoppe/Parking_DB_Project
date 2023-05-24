import '../History.css';
import { useState, useEffect } from 'react';
import { conf } from '../../../res/config';

export default function Stats(props: { parkers: number; income: number }) {
	const [parkers, setParkers] = useState(props.parkers);
	const [totalIncome, setTotalIncome] = useState(props.income);

	// useEffect(() => {
	// 	fetch(`http://${conf.api.host}:${conf.api.port}/${conf.api.routes.stats}`, {
	// 		method: 'GET',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 	})
	// 		.then(data => {
	// 			if (data.status < 300) {
	// 				return data.json() as Promise<{ parkers: number; income: number }>;
	// 			} else {
	// 				throw "Couldn't load resource";
	// 			}
	// 		})
	// 		.then(result => {
	// 			setParkers(result.parkers);
	// 			setTotalIncome(result.income);
	// 		})
	// 		.catch(ex => {
	// 			setParkers(props.parkers);
	// 			setTotalIncome(props.income);
	// 		});
	// }, []);

	const parseMonthToString = (month: number) => {
		switch (month) {
			case 0:
				return 'Januar';
			case 1:
				return 'Februar';
			case 2:
				return 'März';
			case 3:
				return 'April';
			case 4:
				return 'Mai';
			case 5:
				return 'Juni';
			case 6:
				return 'Juli';
			case 7:
				return 'August';
			case 8:
				return 'September';
			case 9:
				return 'Oktober';
			case 10:
				return 'November';
			case 11:
				return 'Dezember';
			default:
				return '';
		}
	};

	let costString = `${totalIncome}`.replace('.', ',');
	if (costString.indexOf(',') != -1) {
		costString += '0€';
	} else {
		costString += ',00€';
	}

	return (
		<div className='stats'>
			<h3>Statistiken Monat {parseMonthToString(new Date().getMonth())}</h3>
			<br />
			<h5>Einnahmen: {costString}</h5>
			<br />
			<h5>Einfahrten: {parkers}</h5>
		</div>
	);
}
