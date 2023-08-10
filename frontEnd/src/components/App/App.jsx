import 'bootstrap/dist/css/bootstrap.min.css';
// import moment from 'moment';
import { Routes, Route } from 'react-router-dom';
import Graphics from '../Layout/Graphics.jsx';
import SurveyForm from '../Survey/Survey.jsx';
import Tracking from '../Layout/Tracking.jsx';
import Login from '../Login/Login.jsx';
import RequireAuth from '../Auth/RequireAuth.jsx';

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