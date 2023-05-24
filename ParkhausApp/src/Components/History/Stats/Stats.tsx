import '../History.css';

export default function Stats(props: { parkers: number; income: number }) {
	const parseMonthToString = (month: number) => {
		switch (month) {
			case 0:
				return 'Januar';
			case 1:
				return 'Februar';
			case 2:
				return 'März';
			case 3:
				return 'April';
			case 4:
				return 'Mai';
			case 5:
				return 'Juni';
			case 6:
				return 'Juli';
			case 7:
				return 'August';
			case 8:
				return 'September';
			case 9:
				return 'Oktober';
			case 10:
				return 'November';
			case 11:
				return 'Dezember';
			default:
				return '';
		}
	};

	let costString = `${props.income}`.replace('.', ',');
	if (costString.indexOf(',') != -1) {
		costString += '0€';
	} else {
		costString += ',00€';
	}

	return (
		<div className='stats'>
			<h3>Statistiken Monat {parseMonthToString(new Date().getMonth())} (Kurzparker)</h3>
			<br />
			<h5>Einnahmen: {costString}</h5>
			<br />
			<h5>Einfahrten: {props.parkers}</h5>
		</div>
	);
}
