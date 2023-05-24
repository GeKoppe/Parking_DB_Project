import { conf } from '../../../../res/config';
import '../../History.css';

export default function TableLine(tempProps: { licPlate: string; entryDate: string; outDate: string; cost: string; perma: boolean }) {
	const props = {
		...tempProps,
	};

	let cost = '';
	if (props.cost == 'undefined' || props.cost == '-1') {
		cost = '/';
	} else {
		cost = props.cost;
	}

	let entryDateString: string = '';
	if (props.entryDate !== '') {
		const entryDate = new Date(props.entryDate);
		entryDateString = `${entryDate.getDay() + 1}.${entryDate.getMonth() + 1}.${entryDate.getFullYear()}, ${entryDate.getHours()}:${entryDate.getMinutes() < 10 ? `0${entryDate.getMinutes()}` : `${entryDate.getMinutes()}`} Uhr`;
	} else {
		entryDateString = '/';
	}

	let outroDateString: string = '';
	if (props.outDate !== '') {
		const outroDate = new Date(props.outDate);
		outroDateString = `${outroDate.getDay() + 1}.${outroDate.getMonth() + 1}.${outroDate.getFullYear()}, ${outroDate.getHours()}:${outroDate.getMinutes() < 10 ? `0${outroDate.getMinutes()}` : `${outroDate.getMinutes()}`} Uhr`;
	} else {
		outroDateString = '/';
	}

	let costString = '';
	costString = cost.replace('.', ',');
	costString += costString.indexOf(',') != -1 ? '0€' : ',00€';

	return (
		<tr className='tableLine'>
			<td className='tableItem'>{props.licPlate || '/'}</td>
			<td className='tableItem'>{entryDateString}</td>
			<td className='tableItem'>{outroDateString}</td>
			<td className='tableItem'>{costString}</td>
			<td className='tableItem'>{props.licPlate ? (props.perma ? 'Ja' : 'Nein') : '/'}</td>
		</tr>
	);
}
