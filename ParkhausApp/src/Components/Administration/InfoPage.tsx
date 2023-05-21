import LicensePlate from './InfoPageParts/LicensePlate';
import DriveInTime from './InfoPageParts/DriveInTime';
import DriveOutButton from './InfoPageParts/DriveOutButton';
import { useState, useEffect } from 'react';
import { conf } from '../../res/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Administration.css';

export default function InfoPage(tempProps: { lotNr?: number; clickHandler?: () => void; toastHandler: (text: string) => void }) {
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
					return response.json() as Promise<{ id: number; kennzeichen?: string; einfahrDatum?: string; dauerparker?: boolean }>;
				}
			})
			.then(data => {
				if (data.id !== -1) {
					let date: string = ``;
					if (data.einfahrDatum) {
						let dateObj: Date = new Date(data.einfahrDatum);
						date = `${dateObj.getDate()}.${dateObj.getMonth() + 1}.${dateObj.getFullYear()}, ${dateObj.getHours()}:${dateObj.getMinutes()} Uhr`;
					}
					setLotInfo({
						inUse: true,
						plate: data.kennzeichen || '',
						driveInTime: date,
						permaParker: data.dauerparker || false,
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
		fetch(`http://${conf.api.host}:${conf.api.port}/${conf.api.routes.newParker}/${props.lotNr}`, {
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
						let cost = `${data.cost}`.replace('.', ',');
						if (cost.indexOf(',') == -1) cost += ',00';
						else if (cost.substring(cost.indexOf(','), cost.length).length < 3) cost += '0';

						driveOutString = `Vielen Dank für Ihren Besuch. Bitte bezahlen Sie bei der Ausfahrt ${cost}€.`;
					} else {
						driveOutString = 'Vielen Dank für Ihren Besuch!';
					}
					props.toastHandler(driveOutString);
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
