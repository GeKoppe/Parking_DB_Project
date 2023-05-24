import HistoryTable from './HistoryTable/HistoryTable';
import Stats from './Stats/Stats';
import './History.css';
import { useState } from 'react';
import { Parker } from './HistoryTable/HistoryTable';

export default function History() {
	const [income, setIncome] = useState(0);
	const [parkers, setParkers] = useState(0);
	const fetchHandler = (items: Parker[]) => {
		let parkersTemp: number = 0;
		let incomeTemp: number = 0;
		let newItems = items.filter(item => {
			const itemDate = new Date(item.ausfahrDatum);
			const nowDate = new Date();
			return itemDate.getFullYear() === nowDate.getFullYear() && itemDate.getMonth() === nowDate.getMonth();
		});

		items.forEach(item => {
			parkersTemp++;
			incomeTemp += item.kosten || 0;
		});

		setIncome(incomeTemp);
		setParkers(parkersTemp);
	};
	return (
		<div className='history'>
			<HistoryTable fetchHandler={fetchHandler} />
			<Stats parkers={parkers} income={income} />
		</div>
	);
}
