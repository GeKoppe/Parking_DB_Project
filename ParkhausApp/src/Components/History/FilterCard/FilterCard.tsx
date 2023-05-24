import '../History.css';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Filter } from '../HistoryTable/HistoryTable';

export default function FilterCard(props: { clickHandler: (filter: Filter) => void }) {
	const [licPlate, setLicPlate] = useState('');
	const [licClass, setLicClass] = useState('regDefaultInput');
	const [costMin, setCostMin] = useState('');
	const [costMax, setCostMax] = useState('');

	const licChangeListener = ({ target }: { target: { value: string } }) => {
		setLicPlate(target.value.toUpperCase());
	};

	const costMinChangeListener = ({ target }: { target: { value: string } }) => {
		setCostMin(target.value);
	};

	const getFilter = (): Filter => {
		let changed = false;
		let filter: Filter = {
			exists: false,
			plate: '',
			driveInDate: '',
			driveOutDate: '',
			costFrom: -1,
			costTo: -1,
			perma: false,
		};
		if (licPlate != '') {
			filter.plate = licPlate;
			changed = true;
		}

		let costFrom = parseFloat(costMin.replace(',', '.'));
		if (!isNaN(costFrom)) {
			filter.costFrom = costFrom;
			changed = true;
		}

		let costTo = parseFloat(costMin.replace(',', '.'));
		if (!isNaN(costFrom)) {
			filter.costFrom = costFrom;
			changed = true;
		}

		filter.exists = changed;
		return filter;
	};

	return (
		<div className='filterContainer'>
			<h3>Filter</h3>
			<div className='filterCard'>
				<div className='labels'>
					<h5>Nummernschild: </h5>
					<br />
					<h5>Kosten von:</h5>
					<br />
					<h5>Kosten bis:</h5>
				</div>
				<div className='inputs'>
					<input value={licPlate} className={licClass} onChange={licChangeListener}></input>
					<br />
					<input value={costMin} className={licClass} onChange={costMinChangeListener}></input>
				</div>
			</div>
			<Button onClick={() => props.clickHandler(getFilter())}>Filter setzen</Button>
		</div>
	);
}
