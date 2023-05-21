import LotCardView from './LotCardView/LotCardView';
import InfoPage from './InfoPage';
import Paging from './Paging/Paging';
import { useState } from 'react';
import Floors from './Floors/Floors';
import Floor from './Floors/Floor/Floor';

export default function Administration() {
	const [lotSelected, setLotSelected] = useState(-1);
	const [page, setPage] = useState(1);

	const lotClickHandler = (nr: number) => {
		setLotSelected(prev => {
			return nr === prev ? -1 : nr;
		});
	};

	const pageChangeClickListener = (up: boolean): void => {
		if (up) {
			if (page < 9) {
				setPage(prev => prev + 1);
				setLotSelected(-1);
			}
		} else {
			if (page > 1) {
				setPage(prev => prev - 1);
				setLotSelected(-1);
			}
		}
	};

	const floorClickHandler = (floor: number): void => {
		setPage(floor);
	};

	return (
		<div className='Administration'>
			<LotCardView lotClickHandler={lotClickHandler} lotSelected={lotSelected} page={page} />
			{/* <Paging clickHandler={pageChangeClickListener} currentPage={page}/> */}
			<Floors floorSelected={page} floorClickHandler={floorClickHandler} />
			<div className='InfoPage'>
				<InfoPage lotNr={lotSelected} />
			</div>
		</div>
	);
}
