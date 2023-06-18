import 'bootstrap/dist/css/bootstrap.min.css';
// import moment from 'moment';
import { Routes, Route } from 'react-router-dom';
import Graphics from '../Layout/Graphics.js';
import SurveyForm from '../Survey/Survey.js';
import Tracking from '../Layout/Tracking';
import Login from '../Login/Login.js';
import RequireAuth from '../Auth/RequireAuth.js';

const App = () => {

	return (
		<Routes>
			<Route exact path='/' element={<Graphics />} />
			<Route exact path='/seguimiento' element={<Tracking />} />
			<Route exact path='/signin-code' element={<Login />} />
			<Route element={<RequireAuth />}>
				<Route exact path='/encuesta-estudiante' element={<SurveyForm />} />
			</Route>
		</Routes>
	);
};

export default App;