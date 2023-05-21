import LicensePlate from './InfoPageParts/LicensePlate';
import DriveInTime from './InfoPageParts/DriveInTime';
import DriveOutButton from './InfoPageParts/DriveOutButton';
import { useState, useEffect } from 'react';
import { conf } from '../../res/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Administration.css';

export default function InfoPage(tempProps: { lotNr?: number; clickHandler?: () => void }) {
	// For now, I just generate stuff randomly, later this will be replaced by an API call with the lotNr
	const props = {
		lotNr: -1,
		clickHandler: () => console.log('Driving out'),
		...tempProps,
	};

	const [lotInfo, setLotInfo] = useState({
		inUse: false,
		plate: '',
		driveInTime: '',
		permaParker: false,
	});

	useEffect(() => {
		if (props.lotNr === -1) return;
		fetch(`http://${conf.api.host}:${conf.api.port}/${conf.api.routes.getLotInfo}/${props.lotNr}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Origin': 'http://localhost:8123',
			},
		})
			.then(response => {
				if (response.status == 400) {
					return { id: -1, kennzeichen: '', einfahrDatum: '' };
				} else {
					return response.json() as Promise<{ id: number; kennzeichen?: string; einfahrDatum?: string }>;
				}
			})
			.then(data => {
				if (data.id !== -1) {
					setLotInfo({
						inUse: true,
						plate: data.kennzeichen || '',
						driveInTime: data.einfahrDatum || '',
						permaParker: false,
					});
				} else {
					setLotInfo({
						inUse: false,
						plate: '',
						driveInTime: '',
						permaParker: false,
					});
				}
			});
	}, [props.lotNr]);

	const driveOutClickHandler = () => {
		fetch(`http://${conf.api.host}:${conf.api.port}/${conf.api.routes.getLotInfo}/${props.lotNr}`, {
			method: 'DELETE',
			headers: {
				'Origin': 'http://localhost:8123',
				'Content-Type': 'application/json',
			},
		})
			.then(response => {
				if (response.status > 210) return { cost: -1 };
				return response.json() as Promise<{ cost: number }>;
			})
			.then(data => {
				if (data) {
					if (data.cost === -1) {
						throw 'Driving out did not work';
					}
				}
				if (data) {
					let driveOutString: string;
					if (!lotInfo.permaParker) {
						let costString: string = `${data.cost}0`.replace('.', ',');
						driveOutString = `Vielen Dank für Ihren Besuch. Bitte bezahlen sie bei der Ausfahrt ${costString}€.`;
					} else {
						driveOutString = 'Vielen Dank für Ihren Besuch!';
					}
					toast.success(driveOutString, {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						draggable: true,
						progress: undefined,
						theme: 'colored',
					});
				}
				setLotInfo({
					inUse: false,
					plate: '',
					driveInTime: '',
					permaParker: false,
				});
			})
			.catch(ex => {
				// Ignore
			});
		props.clickHandler();
	};

	if (props.lotNr === -1) {
		return (
			<div className='InfoContainer'>
				<h3>Kein Parkplatz ausgewählt</h3>
			</div>
		);
	} else if (!lotInfo.inUse) {
		return (
			<div className='InfoContainer'>
				<h3>Parkplatz {props.lotNr}</h3>
				<br />
				<h3>Nicht belegt</h3>
			</div>
		);
	} else {
		return (
			<div className='InfoContainer'>
				<ToastContainer className='welcomeToast' />
				<h3>Parkplatz Nr. {props.lotNr}</h3>
				<br />
				<h3>Nummernschild:</h3>
				<br />
				<LicensePlate plateNr={lotInfo.plate} />
				<br />
				<DriveInTime time={lotInfo.driveInTime} />
				<br />
				<h5>Dauerparker: {lotInfo.permaParker ? 'Ja' : 'Nein'}</h5>
				<br />
				<DriveOutButton clickHandler={driveOutClickHandler} />
			</div>
		);
	}
}
