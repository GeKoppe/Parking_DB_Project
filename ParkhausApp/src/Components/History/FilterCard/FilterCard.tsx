import '../History.css';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Filter } from '../HistoryTable/HistoryTable';

export default function FilterCard(props: { clickHandler: (filter: Filter) => void }) {
	const [licPlate, setLicPlate] = useState('');
	const [licClass, setLicClass] = useState('regDefaultInput');
	const [costMin, setCostMin] = useState('');
	const [costMax, setCostMax] = useState('');
	const [perma, setPerma] = useState(false);

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

		let costTo = parseFloat(costMax.replace(',', '.'));
		if (!isNaN(costTo)) {
			filter.costTo = costTo;
			changed = true;
		}

		if (perma) {
			changed = true;
			filter.perma = true;
		}

		filter.exists = changed;
		return filter;
	};

	const costMaxChangeListener = ({ target }: { target: { value: string } }): void => {
		setCostMax(target.value);
	};

	const handlePermaChange = (): void => {
		setPerma(!perma);
	};

	return (
		<div className='filterContainer'>
			<h3>Filter</h3>
			<div className='filterCard'>
				<div className='labels'>
					<h6>Nummernschild: </h6>
					<br />
					<h6>Kosten von:</h6>
					<br />
					<h6>Kosten bis:</h6>
					<br />
					<h6>Nur Dauerparker: </h6>
				</div>
				<div className='inputs'>
					<input value={licPlate} className={licClass} onChange={licChangeListener}></input>
					<br />
					<input value={costMin} className={licClass} onChange={costMinChangeListener}></input>
					<br />
					<input value={costMax} className={licClass} onChange={costMaxChangeListener}></input>
					<br />
					<input className='permaCheck' type='checkbox' checked={perma} onChange={handlePermaChange}></input>
				</div>
			</div>
			<Button variant='custom' className='filterButton' onClick={() => props.clickHandler(getFilter())}>
				Filter setzen
			</Button>
		</div>
	);
}
