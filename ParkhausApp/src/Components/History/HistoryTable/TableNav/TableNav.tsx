import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import '../../History.css';

export default function TableNav(tempProps: { children?: string; clickHandler: (up: boolean) => void }) {
	const props = {
		children: '',
		...tempProps,
	};

	return (
		<div className='tableNav'>
			<Button variant='custom' onClick={() => props.clickHandler(false)} className='tableNavButton'>
				{'<'}
			</Button>
			<h5>Seite {props.children}</h5>
			<Button variant='custom' onClick={() => props.clickHandler(true)} className='tableNavButton'>
				{'>'}
			</Button>
		</div>
	);
}
