import '../History.css';

export default function FilterCard(props: { clickHandler: (plate: string, fromDate: string, toDate: string, costFrom: number, costTo: number, perma: boolean) => void }) {
	return (
		<div className='filterCard'>
			<h3>Filter</h3>
			<br />
			<input></input>
		</div>
	);
}
