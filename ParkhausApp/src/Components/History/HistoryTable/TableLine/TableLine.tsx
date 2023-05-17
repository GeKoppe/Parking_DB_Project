import { conf } from '../../../../res/config';
import '../../History.css';

export default function TableLine(tempProps: { licPlate: string; entryDate: string; outDate: string; cost: string; perma: boolean }) {
	const props = {
		...tempProps,
	};

	return (
		<tr className='tableLine'>
			<td className='tableItem'>{props.licPlate}</td>
			<td className='tableItem'>{props.entryDate}</td>
			<td className='tableItem'>{props.outDate}</td>
			<td className='tableItem'>{props.cost}</td>
			<td className='tableItem'>{props.perma ? 'Ja' : 'Nein'}</td>
		</tr>
	);
}
