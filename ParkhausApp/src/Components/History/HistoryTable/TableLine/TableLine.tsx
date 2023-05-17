import { conf } from '../../../../res/config';

export default function TableLine(tempProps?: any) {
	const props = {
		...tempProps,
	};

	return (
		<tr className="tableLine">
			<th></th>
			<th></th>
		</tr>
	);
}
