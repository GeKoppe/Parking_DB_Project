import '../History.css';
import { useState } from 'react';

export default function FilterCard(props: { clickHandler: (plate: string, fromDate: string, toDate: string, costFrom: number, costTo: number, perma: boolean) => void }) {
	const [licPlate, setLicPlate] = useState('');
	const [licClass, setLicClass] = useState('licInput');

	const licChangeListener = ({ target }: { target: { value: string } }) => {
		setLicPlate(target.value);
	};

	return (
		<div className='filterCard'>
			<h3>Filter</h3>
			<br />
			<h5>Nummernschild: </h5>
			<input size={12} value={licPlate} className={licClass} onChange={licChangeListener}></input>
			<br />
			<h5>Kosten</h5>
			<br />
		</div>
	);
}
