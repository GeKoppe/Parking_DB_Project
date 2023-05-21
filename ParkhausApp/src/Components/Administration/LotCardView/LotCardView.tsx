import { useState, useEffect } from 'react';
import LotCard from './Lotcard/LotCard';
import { conf } from '../../../res/config';
import LotCardHeader from './LotCardHeader';

export default function LotCardView(props: { lotClickHandler: (nr: number) => void; lotSelected: number; page: number }) {
	const [allLots, setAllLots] = useState<{ nr: number; inUse: boolean }[]>([]);
	const [rows, setRows] = useState<JSX.Element[]>([]);

	useEffect(() => {
		fetch(`http://${conf.api.host}:${conf.api.port}/${conf.api.routes.getLotInfo}`, {
			method: 'GET',
			headers: {
				'Origin': 'http://localhost:8123',
				'Content-Type': 'application/json',
			},
		})
			.then(response => response.json() as Promise<{ id: number; kennzeichen: string; einfahrDatum: string }[]>)
			.then(data => {
				let lots: { nr: number; inUse: boolean }[] = [];
				for (let i = 1; i <= 180; i++) {
					let pushed = false;
					for (let j = 0; j < data.length; j++) {
						if (data[j].id === i) {
							lots.push({ nr: i, inUse: true });
							pushed = true;
							break;
						}
					}
					if (!pushed) {
						lots.push({ nr: i, inUse: false });
					}
				}
				setAllLots(lots);
			});
	}, [props.page]);

	useEffect(() => {
		buildLotCardView();
	}, [allLots, props.lotSelected]);

	const getSingleCardRow = (row: number) => {
		let rows = [];
		for (let i = 1; i <= 5; i++) {
			if (allLots.length > 0) {
				let pushed = false;
				for (let j = 0; j < allLots.length; j++) {
					if (allLots[j].nr == (row - 1) * 5 + i + 20 * (props.page - 1)) {
						rows.push(<LotCard inUse={allLots[j].inUse} lotNr={(row - 1) * 5 + i + 20 * (props.page - 1)} key={(row - 1) * 5 + i + 20 * (props.page - 1)} clickHandler={props.lotClickHandler} selected={props.lotSelected} />);
						pushed = true;
					}
				}
				if (!pushed) {
					rows.push(<LotCard inUse={false} lotNr={(row - 1) * 5 + i + 20 * (props.page - 1)} key={(row - 1) * 5 + i + 20 * (props.page - 1)} clickHandler={props.lotClickHandler} selected={props.lotSelected} />);
				}
			} else {
				rows.push(<LotCard inUse={false} lotNr={(row - 1) * 5 + i + 20 * (props.page - 1)} key={(row - 1) * 5 + i + 20 * (props.page - 1)} clickHandler={props.lotClickHandler} selected={props.lotSelected} />);
			}
		}

		return <div className='LotCardRow'>{rows}</div>;
	};

	const buildLotCardView = () => {
		let rows = [];
		for (let i = 1; i <= 4; i++) {
			rows.push(getSingleCardRow(i));
		}
		setRows(rows);
	};

	return (
		<div className='LotCardContainer'>
			<LotCardHeader maxNumber={props.page * 20} />
			{rows}
		</div>
	);
}
