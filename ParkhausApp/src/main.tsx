import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<div className='app'>
		{/*<React.StrictMode>*/}
		<App />
		{/* </React.StrictMode> */}
	</div>
);
