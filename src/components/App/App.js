import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Graphics from '../Layout/Graphics.js';
import SurveyForm from '../Survey/Survey.js';
import Tracking from '../Layout/Tracking'

const App = () => {
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