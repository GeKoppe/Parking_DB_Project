import { conf } from '../../../res/config';
import { useEffect, useState } from 'react';
import TableLine from './TableLine/TableLine';
import '../History.css';
import TableNav from './TableNav/TableNav';

export type Parker = {
	id: number;
	kennzeichen: string;
	einfahrDatum: string;
	ausfahrDatum: string;
	istDauerParker: boolean;
	kosten?: number;
};

export default function HistoryTable(tempProps: {
	fetchHandler?: (items: Parker[]) => void;
	filter?: {
		plate: string;
		driveInDate: string;
		driveOutDate: string;
		costFrom: number;
		costTo: number;
		perma: boolean;
	};
}) {
	const props = {
		filter: {
			plate: '',
			driveInDate: '',
			driveOutDate: '',
			costFrom: -1,
			costTo: -1,
			perma: false,
		},
		fetchHandler: (items: Parker[]) => console.log('No handler'),
		...tempProps,
	};

	const [historyItems, setHistoryItems] = useState<Parker[]>([]);
	const [page, setPage] = useState(1);
	const [filteredHistoryItems, setFilteredHistoryItems] = useState<Parker[]>([]);
	const [actualRows, setActualRows] = useState<JSX.Element[]>([]);

	useEffect(() => {
		fetch(`http://${conf.api.host}:${conf.api.port}/${conf.api.routes.history}/1`, {
			method: 'GET',
			headers: {
				'Origin': 'http://localhost:8123',
				'Content-Type': 'application/json',
			},
		})
			.then(data => {
				if (data.status < 300) {
					return data.json() as Promise<{
						parkers: Parker[];
						count: number;
					}>;
				} else {
					return { parkers: [], count: 0 };
				}
			})
			.then(data => {
				let remainder = 25 - (data.count % 25);
				for (let i = 0; i < remainder; i++) data.parkers.push({ id: -1, kennzeichen: '', einfahrDatum: '', ausfahrDatum: '', istDauerParker: false, kosten: -1 });
				setHistoryItems(data.parkers);
				props.fetchHandler(data.parkers);
				itemMapper();
			})
			.catch(reason => {
				console.log(reason);
			});
	}, []);

	// useEffect(() => {
	// 	setFilteredHistoryItems(historyItems);
	// 	if (!props.filter) return;
	// 	if (props.filter.plate) {
	// 		setFilteredHistoryItems(
	// 			filteredHistoryItems.filter(item => {
	// 				return item.kennzeichen.indexOf(props.filter.plate) != -1;
	// 			})
	// 		);
	// 	}

	// 	if (props.filter.driveInDate) {
	// 		let date = new Date(props.filter.driveInDate).toISOString();
	// 		while (date.indexOf('-') != -1) date.replace('-', '');
	// 		while (date.indexOf(':') != -1) date.replace(':', '');
	// 		while (date.indexOf('T') != -1) date.replace('T', '');
	// 		while (date.indexOf('.') != -1) date.replace('.', '');
	// 		while (date.indexOf(' ') != -1) date.replace(' ', '');

	// 		let dateNum = parseInt(date);
	// 		setFilteredHistoryItems(
	// 			filteredHistoryItems.filter(item => {
	// 				let driveInDateIso = new Date(item.einfahrtdatum).toISOString();
	// 				while (driveInDateIso.indexOf('-') != -1) driveInDateIso.replace('-', '');
	// 				while (driveInDateIso.indexOf(':') != -1) driveInDateIso.replace(':', '');
	// 				while (driveInDateIso.indexOf('T') != -1) driveInDateIso.replace('T', '');
	// 				while (driveInDateIso.indexOf('.') != -1) driveInDateIso.replace('.', '');
	// 				while (driveInDateIso.indexOf(' ') != -1) driveInDateIso.replace(' ', '');

	// 				let driveInDateNum = parseInt(driveInDateIso);

	// 				return driveInDateNum > dateNum;
	// 			})
	// 		);
	// 	}

	// 	if (props.filter.driveOutDate) {
	// 		let date = new Date(props.filter.driveOutDate).toISOString();
	// 		while (date.indexOf('-') != -1) date.replace('-', '');
	// 		while (date.indexOf(':') != -1) date.replace(':', '');
	// 		while (date.indexOf('T') != -1) date.replace('T', '');
	// 		while (date.indexOf('.') != -1) date.replace('.', '');
	// 		while (date.indexOf(' ') != -1) date.replace(' ', '');

	// 		let dateNum = parseInt(date);
	// 		setFilteredHistoryItems(
	// 			filteredHistoryItems.filter(item => {
	// 				let driveOutDateIso = new Date(item.ausfahrdatum).toISOString();
	// 				while (driveOutDateIso.indexOf('-') != -1) driveOutDateIso.replace('-', '');
	// 				while (driveOutDateIso.indexOf(':') != -1) driveOutDateIso.replace(':', '');
	// 				while (driveOutDateIso.indexOf('T') != -1) driveOutDateIso.replace('T', '');
	// 				while (driveOutDateIso.indexOf('.') != -1) driveOutDateIso.replace('.', '');
	// 				while (driveOutDateIso.indexOf(' ') != -1) driveOutDateIso.replace(' ', '');

	// 				let driveOutDateNum = parseInt(driveOutDateIso);

	// 				return driveOutDateNum < dateNum;
	// 			})
	// 		);
	// 	}

	// 	if (props.filter.costFrom) {
	// 		setFilteredHistoryItems(
	// 			filteredHistoryItems.filter(item => {
	// 				return parseFloat(item.kosten.replace(',', '.')) > props.filter.costFrom;
	// 			})
	// 		);
	// 	}

	// 	if (props.filter.costTo) {
	// 		setFilteredHistoryItems(
	// 			filteredHistoryItems.filter(item => {
	// 				return parseFloat(item.kosten.replace(',', '.')) < props.filter.costTo;
	// 			})
	// 		);
	// 	}

	// 	if (props.filter.perma) {
	// 		setFilteredHistoryItems(
	// 			filteredHistoryItems.filter(item => {
	// 				return item.dauerparker;
	// 			})
	// 		);
	// 	}
	// }, [props.filter]);

	useEffect(() => {
		itemMapper();
	}, [historyItems]);

	const itemMapper = () => {
		let rows = [];
		for (let i = 25 * (page - 1); i < 25 * page && i < historyItems.length; i++) {
			rows.push(<TableLine licPlate={historyItems[i].kennzeichen} entryDate={historyItems[i].einfahrDatum} outDate={historyItems[i].ausfahrDatum} perma={historyItems[i].istDauerParker} cost={`${historyItems[i].kosten}`} />);
		}
		setActualRows(rows);
	};

	/**
	 *
	 * @param up If true, page is incremented by 1, otherwise decremented by 1
	 */
	const navClickHandler = (up: boolean): void => {
		if (up) {
			if (historyItems.length > page * 25) {
				setPage(page + 1);
				itemMapper();
			}
		} else {
			if (page > 1) {
				setPage(page - 1);
				itemMapper();
			}
		}
	};

	return (
		<div className='historyTable'>
			<table className='historyTableTable'>
				<thead>
					<tr className='headerRow'>
						<th className='headerForTable'>Kennzeichen</th>
						<th className='headerForTable'>Einfahrtdatum</th>
						<th className='headerForTable'>Ausfahrdatum</th>
						<th className='headerForTable'>Bezahlt</th>
						<th className='headerForTable'>Dauerparker</th>
					</tr>
				</thead>
				<tbody>{actualRows}</tbody>
			</table>
			<TableNav clickHandler={navClickHandler}>{`${page} / ${parseInt('' + historyItems.length / 25)}`}</TableNav>
		</div>
	);
}
