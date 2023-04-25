import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import { Routes, Route } from 'react-router-dom';
import Graphics from '../Layout/Graphics.js';
import SurveyForm from '../Survey/Survey.js';
import Tracking from '../Layout/Tracking'

const App = () => {
	window.moment = moment;
	return (
		<div>
			<Routes>
				<Route path='/' element={ <Graphics />} />
				<Route path='/seguimiento' element={ <Tracking />} />
				<Route path='/encuesta-estudiante' element={ <SurveyForm /> } />
			</Routes>
		</div>
	);
}

export default App;