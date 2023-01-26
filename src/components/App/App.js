import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Graphics from '../../Layout/Graphics.js';
import SurveyForm from '../Survey/Survey.js';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Graphics />}></Route>
        <Route path='/encuesta-estudiante' element={ <SurveyForm/> }></Route>
      </Routes>
    </BrowserRouter>
  );
}

