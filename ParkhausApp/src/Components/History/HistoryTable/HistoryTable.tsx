import { conf } from '../../../res/config';
import { useEffect, useState } from 'react';
import TableLine from './TableLine/TableLine';
import '../History.css';

export default function HistoryTable() {
	const [historyItems, setHistoryItems] = useState<{ kennzeichen: string; einfahrtdatum: string; ausfahrdatum: string; kosten: string; dauerparker: boolean }[]>([]);
	useEffect(() => {
		fetch('http://localhost:18892/history', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(data => {
				return data.json() as Promise<
					{
						kennzeichen: string;
						einfahrtdatum: string;
						ausfahrdatum: string;
						kosten: string;
						dauerparker: boolean;
					}[]
				>;
			})
			.then(data => {
				setHistoryItems(data);
			});
	}, []);

	return (
		<div className='historyTable'>
			<table className='historyTableTable'>
				<tr className='headerRow'>
					<th className='headerForTable'>Kennzeichen</th>
					<th className='headerForTable'>Einfahrtdatum</th>
					<th className='headerForTable'>Ausfahrdatum</th>
					<th className='headerForTable'>Bezahlt</th>
					<th className='headerForTable'>Dauerparker</th>
				</tr>
				{historyItems.map(item => {
					return <TableLine licPlate={item.kennzeichen} entryDate={item.einfahrtdatum} outDate={item.ausfahrdatum} perma={item.dauerparker} cost={item.kosten} />;
				})}
			</table>
		</div>
	);
}
