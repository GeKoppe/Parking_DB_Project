import HistoryTable from './HistoryTable/HistoryTable';
import Stats from './Stats/Stats';
import './History.css';
import { useState } from 'react';
import { Parker } from './HistoryTable/HistoryTable';

export default function History() {
	const [income, setIncome] = useState(0);
	const [parkers, setParkers] = useState(0);
	const fetchHandler = (items: Parker[]) => {
		let parkers: number = 0;
		let income: number = 0;

		items.forEach(item => {
			parkers++;
			income += parseFloat((`${item.kosten}` || '').substring(0, (`${item.kosten}` || '').length - 1).replace(',', '.'));
		});

		setIncome(income);
		setParkers(parkers);
	};
	return (
		<div className='history'>
			<HistoryTable fetchHandler={fetchHandler} />
			<Stats parkers={parkers} income={income} />
		</div>
	);
}
