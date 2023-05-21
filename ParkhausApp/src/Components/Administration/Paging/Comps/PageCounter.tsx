import '../../Administration.css';

export default function PageCounter(tempProps: { page: number }) {
	const props = {
		...tempProps,
	};

	return (
		<div className='pageCounter'>
			<h4>{props.page}/9</h4>
		</div>
	);
}
