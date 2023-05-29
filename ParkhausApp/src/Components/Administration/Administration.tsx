import LotCardView from './LotCardView/LotCardView';
import InfoPage from './InfoPage';
// import Paging from './Paging/Paging';
import { useState } from 'react';
import Floors from './Floors/Floors';
// import Floor from './Floors/Floor/Floor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Administration() {
	const [lotSelected, setLotSelected] = useState(-1);
	const [page, setPage] = useState(1);
	const [exits, setExits] = useState(0);

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

	const driveOutToast = (text: string): void => {
		toast.success(text, {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			draggable: true,
			progress: undefined,
			theme: 'colored',
		});
		setExits(prev => (prev + 1 > 10 ? 0 : prev + 1));
	};

	return (
		<div className='Administration'>
			<ToastContainer />
			<LotCardView lotClickHandler={lotClickHandler} lotSelected={lotSelected} page={page} exits={exits} />
			{/* <Paging clickHandler={pageChangeClickListener} currentPage={page}/> */}
			<Floors floorSelected={page} floorClickHandler={floorClickHandler} />
			<div className='InfoPage'>
				<InfoPage lotNr={lotSelected} toastHandler={driveOutToast} />
			</div>
		</div>
	);
}
