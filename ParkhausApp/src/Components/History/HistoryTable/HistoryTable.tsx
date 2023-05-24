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
	istDauerparker: boolean;
	kosten?: number;
};

export type Filter = {
	exists: boolean;
	plate: string;
	driveInDate: string;
	driveOutDate: string;
	costFrom: number;
	costTo: number;
	perma: boolean;
};

export default function HistoryTable(tempProps: { fetchHandler?: (items: Parker[]) => void; filter?: Filter }) {
	const props = {
		filter: {
			exists: false,
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
	const [filteredLength, setFilteredLength] = useState(0);
	const [actualRows, setActualRows] = useState<JSX.Element[]>([]);

	useEffect(() => {
		fetch(`http://${conf.api.host}:${conf.api.port}/${conf.api.routes.history}`, {
			method: 'GET',
			headers: {
				'Origin': 'http://localhost:8123',
				'Content-Type': 'application/json',
			},
		})
			.then(data => {
				if (data.status < 300) {
					return data.json() as Promise<Parker[]>;
				} else {
					return [];
				}
			})
			.then(data => {
				let tempData: Parker[] = [];
				data.forEach(parker => tempData.push(parker));
				setHistoryItems(data);
				props.fetchHandler(tempData);
				itemMapper();
			})
			.catch(reason => {
				console.log(reason);
			});
	}, []);

	const filterItems = () => {
		let filtered = historyItems;
		if (!props.filter.exists) {
			return filtered;
		}
		if (props.filter.plate != '') {
			filtered = filtered.filter(item => {
				return item.kennzeichen.indexOf(props.filter.plate) != -1;
			});
		}
		if (props.filter.costTo != -1) {
			filtered = filtered.filter(item => {
				return (item.kosten || 0) <= props.filter.costTo;
			});
		}

		if (props.filter.costFrom != -1) {
			filtered = filtered.filter(item => {
				return (item.kosten || 0) >= props.filter.costFrom;
			});
		}

		if (props.filter.driveInDate != '') {
			filtered = filtered.filter(item => {
				let diDate = new Date(props.filter.driveInDate);
				let iDate = new Date(item.einfahrDatum);

				return diDate.getTime() < iDate.getTime();
			});
		}

		if (props.filter.driveOutDate != '') {
			filtered = filtered.filter(item => {
				let doDate = new Date(props.filter.driveOutDate);
				let oDate = new Date(item.ausfahrDatum);

				return doDate.getTime() > oDate.getTime();
			});
		}

		if (props.filter.perma) {
			filtered = filtered.filter(item => item.istDauerparker);
		}

		return filtered;
	};

	useEffect(() => {
		itemMapper();
	}, [historyItems, page]);

	useEffect(() => {
		itemMapper();
		setPage(1);
	}, [props.filter]);

	const itemMapper = () => {
		let items = filterItems();
		setFilteredLength(items.length);
		let rows = [];
		for (let i = 25 * (page - 1); i < 25 * page && i < items.length; i++) {
			rows.push(<TableLine licPlate={items[i].kennzeichen} entryDate={items[i].einfahrDatum} outDate={items[i].ausfahrDatum} perma={items[i].istDauerparker} cost={`${items[i].kosten}`} />);
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
			}
		} else {
			if (page > 1) {
				setPage(page - 1);
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
			<TableNav clickHandler={navClickHandler}>{`${page} / ${Math.ceil(filteredLength / 25)}`}</TableNav>
		</div>
	);
}
