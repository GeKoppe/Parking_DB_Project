import HistoryTable from './HistoryTable/HistoryTable';
import Stats from './Stats/Stats';
import './History.css';
import { useState } from 'react';
import { Parker, Filter } from './HistoryTable/HistoryTable';
import FilterCard from './FilterCard/FilterCard';

export default function History() {
	const [income, setIncome] = useState(0);
	const [parkers, setParkers] = useState(0);
	const [filter, setFilter] = useState<Filter>({ exists: false, costFrom: -1, costTo: -1, driveInDate: '', driveOutDate: '', perma: false, plate: '' });

	const fetchHandler = (items: Parker[]) => {
		let parkersTemp: number = 0;
		let incomeTemp: number = 0;
		let newItems = items.filter(item => {
			const itemDate = new Date(item.ausfahrDatum);
			const nowDate = new Date();
			return itemDate.getFullYear() === nowDate.getFullYear() && itemDate.getMonth() === nowDate.getMonth();
		});

		newItems.forEach(item => {
			parkersTemp++;
			incomeTemp += item.kosten || 0;
		});

		setIncome(incomeTemp);
		setParkers(parkersTemp);
	};

	const filterClickHandler = (filter: Filter) => {
		setFilter(filter);
	};
	return (
		<div className='history'>
			<HistoryTable fetchHandler={fetchHandler} filter={filter} />
			<div className='sideBar'>
				<Stats parkers={parkers} income={income} />
				<FilterCard clickHandler={filterClickHandler} />
			</div>
		</div>
	);
}
