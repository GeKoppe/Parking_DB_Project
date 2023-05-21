import './Registration.css';
import RegistrationCard from './RegistrationCard/RegistrationCard';
import InfoCard from './InfoCard/InfoCard';
import { ToastContainer, toast } from 'react-toastify';

export default function Registration() {
	const licPlateHandler = () => {};
	const toastCallback = (name: string, surname: string): void => {
		toast.success(`Vielen Dank für Ihr Vertrauen, ${name} ${surname}. Herzlich Willkommen in unserem Parkhaus!`, {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			draggable: true,
			progress: undefined,
			theme: 'colored',
		});
	};

	return (
		<div>
			<ToastContainer />
			<div className='header'>
				<h2>Als Dauerparker registrieren</h2>
			</div>
			<div className='registration'>
				<div className='regComps'>
					<RegistrationCard licChangeHandler={licPlateHandler} buttonClickHandler={toastCallback} />
				</div>
				<div>
					<InfoCard />
				</div>
			</div>
		</div>
	);
}
