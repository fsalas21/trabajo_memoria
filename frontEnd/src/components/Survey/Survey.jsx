import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';
import CheckboxComponent from '../CheckboxComponent/CheckboxComponent';
import Header from '../Header/Header';
import * as React from 'react';
import { Alert, Box, Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Radio, RadioGroup, Select, Stack, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import './survey.css';

const CASA_CENTRAL = 'Campus Casa Central Valparaíso';
const CAMPUS_SJ = 'Campus Santiago San Joaquín';

const TITLE = 'Principales Motivos de Retiro';
const DESCRIPTION = 'A continuación por favor seleccione las casillas que más se asemejan a su motivo de retiro de la universidad.';

const SEF_SECTION_TITLE = 'Situación Económica y Familiar';
const SEF_QUESTION = '¿Cuál de las siguientes alternativas refleja mejor su problema?';

const VOC_SECTION_TITLE = 'Vocacional';
const VOC_QUESTION = '¿Qué gatilló Su problema vocacional?';

const RA_TITLE = 'Rendimiento Académico';
const RA_FIRST_QUESTION = '¿Cuál(es) de los siguientes problemas enfrentaste en lo personal? (puedes escoger más de una opción)';
const RA_SECOND_QUESTION = 'La Universidad influyó en tus problemas de rendimiento porque…';

const AU_TITLE = 'Ambiente Universitario';
const AU_QUESTION = '¿Cuál de las siguientes alternativas refleja mejor su problema?';

const CAREER_TITLE = 'Cambio de Carrera';
const CAREER_QUESTION = '¿A qué carrera decidió cambiarse?';

const DETAIL_QUESTION = 'Detalles de su respuesta anterior.';
const DETAIL_OTHER_QUESTION = 'Detalles sus otros motivos de la pregunta anterior.';

const OTRO_TITLE = 'Otros Motivos';
const OTRO_QUESTION = 'Detalle qué otros motivos lo habrían motivado a dejar la carrera y/o universidad';

const MAX_RUT_WIDTH = 10;
const MAX_ROL_WIDTH = 11;

const STEPS = ['Datos Personales', 'Motivos Globales', 'Motivos Específicos', 'Finalizar'];
const GENDERS = ['Femenino', 'Masculino', 'No Binario', 'No deseo responder'];
const SEMESTERS = ['Primer Semestre', 'Segundo Semestre'];
const CAREERS = ['Arquitectura', 'Construcción Civil', 'Ingeniería Civil', 'Ingeniería Civil Ambiental', 'Ingeniería Civil De Minas', 'Ingeniería Civil Electrónica', 'Ingeniería Civil Eléctrica', 'Ingeniería Civil Industrial', 'Ingeniería Civil Informática', 'Ingeniería Civil Matemática', 'Ingeniería Civil Mecánica', 'Ingeniería Civil Metalúrgica', 'Ingeniería Civil Plan Común', 'Ingeniería Civil Química', 'Ingeniería Civil Telemática', 'Ingeniería Comercial', 'Ingeniería En Aviación Comercial', 'Ingeniería En Diseño De Productos', 'Licenciatura En Astrofísica', 'Licenciatura En Física', 'Técnico Universitario En Mantenimiento Aeronáutico'];

export default function SurveyForm() {

    const [jsonString, setJson] = React.useState({});

    const [nombre, setNombre] = React.useState("");
    const [primerApellido, setPrimerApellido] = React.useState("");
    const [segundoApellido, setSegundoApellido] = React.useState("");
    const [genero, setGenero] = React.useState("");
    const [carreraInicial, setCarreraInicial] = React.useState("");
    const [carreraCambiada, setCarreraCambiada] = React.useState("");
    const [annoIngresoUni, setAnnoIngresoUni] = React.useState("");
    const [annoRetiroUni, setAnnoRetiroUni] = React.useState("");
    const [semestreRetiro, setSemestreRetiro] = React.useState("");
    const [annoIngresoCarrera, setAnnoIngresoCarrera] = React.useState("");

    const [otherFamilyReasons, setOtherFamilyReasons] = React.useState("");
    const [otherVocationalReasons, setOtherVocationalReasons] = React.useState("");
    const [otherFirstAcademicReasons, setOtherFirstAcademicReasons] = React.useState("");
    const [otherSecondAcademicReasons, setOtherSecondAcademicReasons] = React.useState("");
    const [detailAtmosphericReasons, setDetailAtmosphericReasons] = React.useState("");
    const [detailVocationalReasons, setDetailVocationalReasons] = React.useState("");
    const [otherAtmosphericReasons, setOtherAtmosphericReasons] = React.useState("");
    const [otherReasons, setOtherReasons] = React.useState("");

    function handleName(e) {
        let updatedName = {};
        setNombre(e.target.value);
        updatedName = { nombre: e.target.value };
        setJson(json => ({ ...json, ...updatedName }));
    }

    function handleFirstLastname(e) {
        let updateFirstLastname = {};
        setPrimerApellido(e.target.value);
        updateFirstLastname = { apellido_paterno: e.target.value };
        setJson(jsonString => ({ ...jsonString, ...updateFirstLastname }));
    }

    function handleSecondLastName(e) {
        let updateSecondLastname = {};
        setSegundoApellido(e.target.value);
        updateSecondLastname = { apellido_materno: e.target.value };
        setJson(jsonString => ({ ...jsonString, ...updateSecondLastname }));
    }

    function handleAnoIngresoCarrera(e) {
        let updateAnnoIngresoCarrera = {};
        setAnnoIngresoCarrera(e.target.value);
        updateAnnoIngresoCarrera = { anno_ingreso_carrera: parseInt(e.target.value) };
        setJson(jsonString => ({ ...jsonString, ...updateAnnoIngresoCarrera }));
    }

    function handleAnoIngresoUni(e) {
        let updateAnoIngresoUni = {};
        setAnnoIngresoUni(e.target.value);
        updateAnoIngresoUni = { anno_ingreso_universidad: parseInt(e.target.value) };
        setJson(jsonString => ({ ...jsonString, ...updateAnoIngresoUni }));
    }

    function handleAnoRetiroUni(e) {
        let updateAnoRetiroUni = {};
        setAnnoRetiroUni(e.target.value);
        updateAnoRetiroUni = { anno_retiro_carrera: parseInt(e.target.value) };
        setJson(jsonString => ({ ...jsonString, ...updateAnoRetiroUni }));
    }

    function handleChangeGender(e) {
        let updateGender = {};
        setGenero(e.target.value);
        updateGender = { genero: e.target.value };
        setJson(jsonString => ({ ...jsonString, ...updateGender }));
    }

    function handleSemesterChange(e) {
        let updateSemester = {};
        setSemestreRetiro(e.target.value);
        updateSemester = { semestre: e.target.value };
        setJson(jsonString => ({ ...jsonString, ...updateSemester }));
    }

    function handleCareerChange(e) {
        let updateCareer = {};
        setCarreraCambiada(e.target.value);
        updateCareer = { carreraCambiada: e.target.value };
        setJson(jsonString => ({ ...jsonString, ...updateCareer }));
    }

    function handleInitialCareerChange(e) {
        let updateCareer = {};
        setCarreraInicial(e.target.value);
        updateCareer = { carreraInicial: e.target.value };
        setJson(jsonString => ({ ...jsonString, ...updateCareer }));
    }

    function handleOtherFamily(e) {
        let updateOtherFamily = {};
        setOtherFamilyReasons(e.target.value);
        updateOtherFamily = { OTHER_SEF: e.target.value };
        setJson(jsonString => ({ ...jsonString, ...updateOtherFamily }));
    }

    function handleOtherVocational(e) {
        let updateOtherVocational = {};
        setOtherVocationalReasons(e.target.value);
        updateOtherVocational = { OTHER_VOC: e.target.value };
        setJson(jsonString => ({ ...jsonString, ...updateOtherVocational }));
    }

    function handleOtherFirstAcademic(e) {
        let updateOtherFirstAcademic = {};
        setOtherFirstAcademicReasons(e.target.value);
        updateOtherFirstAcademic = { OTHER_RA1: e.target.value };
        setJson(jsonString => ({ ...jsonString, ...updateOtherFirstAcademic }));
    }

    function handleOtherSecondAcademic(e) {
        let updateOtherSecondAcademic = {};
        setOtherSecondAcademicReasons(e.target.value);
        updateOtherSecondAcademic = { OTHER_RA2: e.target.value };
        setJson(jsonString => ({ ...jsonString, ...updateOtherSecondAcademic }));
    }

    function handleDetailVocational(e) {
        let updateDetailVocational = {};
        setDetailVocationalReasons(e.target.value);
        updateDetailVocational = { Detail_VOC: e.target.value };
        setJson(jsonString => ({ ...jsonString, ...updateDetailVocational }));
    }

    function handleDetailAtmospheric(e) {
        let updateDetailAtmospheric = {};
        setDetailAtmosphericReasons(e.target.value);
        updateDetailAtmospheric = { Detail_AU: e.target.value };
        setJson(jsonString => ({ ...jsonString, ...updateDetailAtmospheric }));
    }

    function handleOtherAtmospheric(e) {
        let updateOtherAtmospheric = {};
        setOtherAtmosphericReasons(e.target.value);
        updateOtherAtmospheric = { OTHER_AU: e.target.value };
        setJson(jsonString => ({ ...jsonString, ...updateOtherAtmospheric }));
    }

    function handleOtherReasons(e) {
        let updateOtherReasons = {};
        setOtherReasons(e.target.value);
        updateOtherReasons = { otro_motivo: e.target.value };
        setJson(jsonString => ({ ...jsonString, ...updateOtherReasons }));
    }

    // --------------------------------------

    const [activeStep, setActiveStep] = React.useState(0);

    const [value, setValueRadio] = React.useState('');

    const [globalReasons, setGlobalReasonCheckbox] = React.useState([
        { id: 'SEF', acronym: 'SEF', name: SEF_SECTION_TITLE, isGlobalChecked: false },
        { id: 'VOC', acronym: 'VOC', name: VOC_SECTION_TITLE, isGlobalChecked: false },
        { id: 'RA', acronym: 'RA', name: RA_TITLE, isGlobalChecked: false },
        { id: 'AU', acronym: 'AU', name: AU_TITLE, isGlobalChecked: false },
        { id: 'CARR', acronym: 'CAR', name: 'Cambio de carrera', isGlobalChecked: false },
        { id: 'Otro', acronym: 'Otro', name: OTRO_TITLE, isGlobalChecked: false }
    ]);

    const [familyEconomicReasons, setFamilyEconomicCheckboxReasons] = React.useState([
        { id: '11', name: 'No seguí estudiando porque no tenía para costear mis estudios', isFamilyChecked: false },
        { id: '12', name: 'La lejanía con mi familia complicó mi calidad de estudiante', isFamilyChecked: false },
        { id: '13', name: 'Poca flexibilidad académica y de horario para compatibilizar trabajo-estudios', isFamilyChecked: false },
        { id: '14', name: 'Poca flexibilidad académica y de horario para compatibilizar estudios-pasatiempos', isFamilyChecked: false },
        { id: '15', name: OTRO_TITLE, isFamilyChecked: false }
    ]);

    const [vocationalReasons, setVocationalCheckboxReasons] = React.useState([
        { id: '21', name: 'No era mi primera preferencia para estudiar', isChecked: false },
        { id: '22', name: 'No recibí del DI la orientación que esperaba', isChecked: false },
        { id: '23', name: 'El nivel de estrés superaba mis capacidades', isChecked: false },
        { id: '24', name: 'Pensé que la carrera se trataba de otra cosa (pedir precisar)', isChecked: false },
        { id: '25', name: OTRO_TITLE, isChecked: false }
    ]);

    const [firstAcademicReasons, setFirstAcademicCheckboxReasons] = React.useState([
        { id: '31', name: 'Mi formación previa fue muy mala', isChecked: false },
        { id: '32', name: 'No tenía hábitos de estudio', isChecked: false },
        { id: '33', name: 'No iba mucho a clases y ayudantías', isChecked: false },
        { id: '34', name: 'No logré armar un grupo de estudios', isChecked: false },
        { id: '35', name: 'No asistí al CIAC regularmente', isChecked: false },
        { id: '36', name: OTRO_TITLE, isChecked: false }
    ]);

    const [secondAcademicReasons, setSecondAcademicCheckboxReasons] = React.useState([
        { id: '41', name: 'Los profesores no eran muy claros al explicar la materia', isChecked: false },
        { id: '42', name: 'Las clases y las metodologías que se imparten no son de calidad lo que dificulta el aprendizaje', isChecked: false },
        { id: '43', name: 'La exigencia no se compensaba con el nivel de calidad de la educación', isChecked: false },
        { id: '44', name: 'No había preocupación ni apoyo de la USM por los alumnos con problemas', isChecked: false },
        { id: '45', name: 'La coordinación docente fue mala y provocaba problemas de aprendizaje', isChecked: false },
        { id: '46', name: OTRO_TITLE, isChecked: false }
    ]);

    const [atmosphereReasons, setAtmosphereCheckboxReasons] = React.useState([
        { id: '51', name: 'No me sentí parte de la Universidad', isChecked: false },
        { id: '52', name: 'No me sentí parte del Departamento', isChecked: false },
        { id: '53', name: 'Los paros frecuentes no me gustaban', isChecked: false },
        { id: '54', name: 'Mal servicio dentro de la Universidad (pedir detallar)', isChecked: false },
        { id: '55', name: 'Mala infraestructura (pedir detallar)', isChecked: false },
        { id: '56', name: OTRO_TITLE, isChecked: false }
    ]);

    // ------ Validación de RUT correcto ------
    const [errorRutMessage, setErrorRutMessage] = React.useState(" ");
    const [rut, setRUT] = React.useState("");

    React.useEffect(() => {
        let regex = /[a-zA-Z_*.]/;
        if (rut.length > MAX_RUT_WIDTH) {
            setErrorRutMessage('RUT contiene más de 9 dígitos.');
        }
        else if (regex.test(rut)) {
            setErrorRutMessage('RUT no debe contener letras o caracteres especiales.');
        }
    }, [rut]);

    React.useEffect(() => {
        let regex = /[a-zA-Z_*.]/;
        if (rut.length <= MAX_RUT_WIDTH && !(regex.test(rut)) && errorRutMessage) {
            setErrorRutMessage("Formato 12345678-9");
        }
    }, [rut, errorRutMessage]);

    // ------ Validación de Rol correcto ------
    const [errorRolMessage, setErrorRolMessage] = React.useState(" ");
    const [rol, setRol] = React.useState("");

    React.useEffect(() => {
        let regex = /[a-zA-Z_*.]/;
        if (rol.length > MAX_ROL_WIDTH) {
            setErrorRolMessage('Rol contiene más de 10 dígitos.');
        }
        else if (regex.test(rol)) {
            setErrorRolMessage('Rol no debe contener letras o caracteres especiales.');
        }
    }, [rol]);

    React.useEffect(() => {
        let regex = /[a-zA-Z_*.]/;
        if (rol.length <= MAX_ROL_WIDTH && !(regex.test(rol)) && errorRolMessage) {
            setErrorRolMessage("Formato 20XX73XXX-X");
        }
    }, [rol, errorRolMessage]);

    // ------ Validacion del nombre y apellido --------

    const handleRadioChange = (event) => {
        event.preventDefault();
        let updatedRadio = {};
        setValueRadio(event.target.value);
        updatedRadio = { campus: event.target.value };
        setJson(jsonString => ({ ...jsonString, ...updatedRadio }));
    };

    const handleChangeCheckboxReasons = (reasonId, checkedReason) => {
        setGlobalReasonCheckbox(globalReasons.map(motivo => {
            if (motivo.id === reasonId) {
                return { ...motivo, isGlobalChecked: checkedReason };
            }
            return motivo;
        }));
    };

    function handleChangeCheckboxFamilyEconomy(reasonId, checkedReason) {
        setFamilyEconomicCheckboxReasons(familyEconomicReasons.map(motivo => {
            if (motivo.id === reasonId) {
                return { ...motivo, isFamilyChecked: checkedReason };
            }
            return motivo;
        }));
    };

    function handleChangeCheckboxVocational(reasonId, checkedReason) {
        setVocationalCheckboxReasons(vocationalReasons.map(motivo => {
            if (motivo.id === reasonId) {
                return { ...motivo, isChecked: checkedReason };
            }
            return motivo;
        }));
    };

    function handleChangeCheckboxFirstAcademic(reasonId, checkedReason) {
        setFirstAcademicCheckboxReasons(firstAcademicReasons.map(motivo => {
            if (motivo.id === reasonId) {
                return { ...motivo, isChecked: checkedReason };
            }
            return motivo;
        }));
    };

    function handleChangeCheckboxSecondAcademic(reasonId, checkedReason) {
        setSecondAcademicCheckboxReasons(secondAcademicReasons.map(motivo => {
            if (motivo.id === reasonId) {
                return { ...motivo, isChecked: checkedReason };
            }
            return motivo;
        }));
    };

    function handleChangeCheckboxAtmosphere(reasonId, checkedReason) {
        setAtmosphereCheckboxReasons(atmosphereReasons.map(motivo => {
            if (motivo.id === reasonId) {
                return { ...motivo, isChecked: checkedReason };
            }
            return motivo;
        }));
    };

    let selectedGlobalReason = [];
    const onSubmitGlobalCheckbox = () => {
        let updateGlobalCheckbox = {};
        globalReasons.forEach(element => {
            if (element.isGlobalChecked) {
                selectedGlobalReason.push(element.name);
            }
        });

        updateGlobalCheckbox = { razones: selectedGlobalReason };
        setJson(jsonString => ({ ...jsonString, ...updateGlobalCheckbox }));
    };

    let selectedFamilyEconomicReasons = [];
    const onSubmitFamilyEconomicReason = () => {
        let updateSefCheckbox = {};
        familyEconomicReasons.forEach(element => {
            if (element.isFamilyChecked) {
                selectedFamilyEconomicReasons.push(element.name);
            }
        });

        updateSefCheckbox = { SEF: selectedFamilyEconomicReasons };
        setJson(jsonString => ({ ...jsonString, ...updateSefCheckbox }));
    };

    let selectedVocationalReasons = [];
    const onSubmitVocationalReason = () => {
        let updateVocCheckbox = {};
        vocationalReasons.forEach(element => {
            if (element.isChecked) {
                selectedVocationalReasons.push(element.name);
            }
        });

        updateVocCheckbox = { VOC: selectedVocationalReasons };
        setJson(jsonString => ({ ...jsonString, ...updateVocCheckbox }));
    };

    let selectedFirstAcademicReasons = [];
    const onSubmitFirstAcademicReason = () => {
        let updateFirstAcademicCheckbox = {};
        firstAcademicReasons.forEach(element => {
            if (element.isChecked) {
                selectedFirstAcademicReasons.push(element.name);
            }
        });

        updateFirstAcademicCheckbox = { RA1: selectedFirstAcademicReasons };
        setJson(jsonString => ({ ...jsonString, ...updateFirstAcademicCheckbox }));
    };

    let selectedSecondAcademicReasons = [];
    const onSubmitSecondAcademicReason = () => {
        let updateSecondAcademicCheckbox = {};
        secondAcademicReasons.forEach(element => {
            if (element.isChecked) {
                selectedSecondAcademicReasons.push(element.name);
            }
        });


        updateSecondAcademicCheckbox = { RA2: selectedSecondAcademicReasons };
        setJson(jsonString => ({ ...jsonString, ...updateSecondAcademicCheckbox }));
    };

    let selectedAtmosphericReasons = [];
    const onSubmitAtmosphericReason = () => {
        let updateAtmosphericCheckbox = {};
        atmosphereReasons.forEach(element => {
            if (element.isChecked) {
                selectedAtmosphericReasons.push(element.name);
            }
        });

        updateAtmosphericCheckbox = { AU: selectedAtmosphericReasons };
        setJson(jsonString => ({ ...jsonString, ...updateAtmosphericCheckbox }));
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (activeStep === 1) {
            onSubmitGlobalCheckbox();
        }
        else if (activeStep === 2) {
            onSubmitFamilyEconomicReason();
            onSubmitVocationalReason();
            onSubmitFirstAcademicReason();
            onSubmitSecondAcademicReason();
            onSubmitAtmosphericReason();
        }
        else if (activeStep === 3) {
            // console.log('jsonString', jsonString);
            // console.log(jsonString.rol);
            // console.log(jsonString?.nombre);
            let respuesta = formatJSONResponse(jsonString);
            addRespuesta(respuesta);
            updateStudent(respuesta.rut);
        }
    };

    function formatJSONResponse(jsonString) {
        let date = new Date().toISOString().slice(0, 23);
        let response = {
            fecha: date,
            nombre: jsonString.nombre ? jsonString.nombre : null,
            apellido_paterno: jsonString.apellido_paterno ? jsonString.apellido_paterno : null,
            apellido_materno: jsonString.apellido_materno ? jsonString.apellido_materno : null,
            anno_ingreso_carrera: jsonString.anno_ingreso_carrera ? jsonString.anno_ingreso_carrera : null,
            anno_ingreso_universidad: jsonString.anno_ingreso_universidad ? jsonString.anno_ingreso_universidad : null,
            anno_retiro_carrera: jsonString.anno_retiro_carrera ? jsonString.anno_retiro_carrera : null,
            genero: jsonString.genero ? jsonString.genero : null,
            carreraInicial: jsonString.carreraInicial ? jsonString.carreraInicial : null,
            carreraCambiada: jsonString.carreraCambiada ? jsonString.carreraCambiada : null,
            semestreRetiro: jsonString.semestre ? jsonString.semestre : null,
            rut: jsonString.rut ? jsonString.rut : null,
            rol: jsonString.rol ? jsonString.rol : null,
            campus: jsonString.campus ? jsonString.campus : null,
            razones: jsonString.razones ? jsonString.razones : [],
            OTHER_SEF: jsonString.OTHER_SEF ? jsonString.OTHER_SEF : "-",
            OTHER_VOC: jsonString.OTHER_VOC ? jsonString.OTHER_VOC : "-",
            OTHER_RA1: jsonString.OTHER_RA1 ? jsonString.OTHER_RA1 : "-",
            OTHER_RA2: jsonString.OTHER_RA2 ? jsonString.OTHER_RA2 : "-",
            OTHER_AU: jsonString.OTHER_AU ? jsonString.OTHER_AU : "-",
            otro_motivo: jsonString.otro_motivo ? jsonString.otro_motivo : "-",
            SEF: jsonString.SEF ? jsonString.SEF : [],
            VOC: jsonString.VOC ? jsonString.VOC : [],
            RA1: jsonString.RA1 ? jsonString.RA1 : [],
            RA2: jsonString.RA2 ? jsonString.RA2 : [],
            AU: jsonString.AU ? jsonString.AU : [],
            Detail_AU: jsonString.Detail_AU ? jsonString.Detail_AU : "-",
            Detail_VOC: jsonString.Detail_VOC ? jsonString.Detail_VOC : "-"
        };
        return response;
    }

    function addRespuesta(respuesta) {
        axios.post("https://us-east-1.aws.data.mongodb-api.com/app/application-0-ckkdo/endpoint/api/encuestasRespondidas", respuesta)
            .then(response => console.log('Añadidos', response));
    }

    function updateStudent(rut) {
        let status = { rut: rut, answeredSurvey: true };
        // console.log('Status', status);
        axios.put("https://us-east-1.aws.data.mongodb-api.com/app/application-0-ckkdo/endpoint/api/updateSurveyStatus", status)
            .then(result => {
                console.log('Estado actualizado. Resultado: \n', result);
            })
            .catch(error => {
                console.log('No se ha encontrado un estudiante con ese RUT. Error: \n', error);
            });
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 1
            }}
        />
    );

    const formatRut = (rut) => {
        rut = rut.replace('-', '');
        if (rut.length >= MAX_RUT_WIDTH - 1) {
            let notFormattedRut = rut;
            let firstPart = notFormattedRut.substring(0, rut.length - 1);
            let dv = notFormattedRut.substring(rut.length - 1);
            return firstPart + '-' + dv;
        }
        return rut;
    };

    const formatRol = (rol) => {
        rol = rol.replace('-', '');
        if (rol.length >= MAX_ROL_WIDTH - 1) {
            let notFormattedRut = rol;
            let firstPart = notFormattedRut.substring(0, rol.length - 1);
            let dv = notFormattedRut.substring(rol.length - 1);
            return firstPart + '-' + dv;
        }
        return rol;
    };

    const handleRUT = (event) => {
        event.target.value = formatRut(event.target.value);
        let updateRUT = {};
        setRUT(event.target.value);
        updateRUT = { rut: event.target.value };
        setJson(jsonString => ({ ...jsonString, ...updateRUT }));
    };

    const handleRol = (event) => {
        event.target.value = formatRol(event.target.value);
        let updateRol = {};
        setRol(event.target.value);
        updateRol = { rol: event.target.value };
        setJson(jsonString => ({ ...jsonString, ...updateRol }));
    };

    const MenuProps = {
        PaperProps: {
            style: {
                width: 'fit-content'
            }
        }
    };

    const [searchParams, setSearchParams] = useSearchParams();


    React.useEffect(() => {
        // console.log('searchParams:', searchParams);
        if (searchParams.size > 0) {
            const nameParam = searchParams.get('nombres');
            const lastnameParam = searchParams.get('apellidos');

            let apellido_paterno;
            let apellido_materno;

            if (lastnameParam) {
                apellido_paterno = lastnameParam.split(' ')[0];
                apellido_materno = lastnameParam.split(' ')[1];
            }

            setNombre(nameParam);
            setPrimerApellido(apellido_paterno);
            setSegundoApellido(apellido_materno);
            setJson(jsonString => ({ ...jsonString, nombre: nameParam, apellido_paterno: apellido_paterno, apellido_materno: apellido_materno }));
        }
    }, [setSearchParams, searchParams]);

    return (
        <Stack>
            <div>
                <Header />
            </div>
            <div className='global-container'>
                <Box display='flex' justifyContent='center'>
                    <div>
                        <Card className='FirstCard'>
                            <CardContent>
                                <Card className='TitleSection'>
                                    <CardContent>
                                        <Typography variant='h2' align='center' > Encuesta Deserción Estudiantil </Typography>
                                        <ColoredLine color='#fdfdfd' />
                                        <Typography variant='body2'> El objetivo de esta encuesta es conocer los razones globales por los cuales estudiantes del DI se han retirado o abandonado su carrera en los últimos  años, de tal manera de contar con evidencias que permitan definir planes de mejoras para reducir la deserción. <br /> <b>Las respuestas serán completamente anónimas</b>, solo se piden algunos datos para temas de mantención de la base de datos. </Typography>
                                    </CardContent>
                                </Card>
                                <Box sx={{ width: '100%', marginTop: '20px' }}>
                                    <Card variant='outlined'>
                                        <CardContent>
                                            <Stepper activeStep={activeStep}>
                                                {STEPS.map((label) => {
                                                    const stepProps = {};
                                                    const labelProps = {};
                                                    return (
                                                        <Step key={label} {...stepProps}>
                                                            <StepLabel {...labelProps}>{label}</StepLabel>
                                                        </Step>
                                                    );
                                                })}
                                            </Stepper>
                                        </CardContent>
                                    </Card>
                                    {
                                        activeStep === STEPS.length ? (
                                            <React.Fragment>
                                                <Alert icon={<CheckIcon fontSize="inherit" />} severity='success' sx={{ marginTop: '20px' }}>
                                                    La encuesta ha sido enviada correctamente.
                                                </Alert>
                                            </React.Fragment>
                                        ) : (
                                            // (console.log('jsonString:', jsonString)) ||
                                            <React.Fragment>
                                                <Box sx={{ width: '100%', marginTop: '10px' }}>
                                                    <div style={{ display: activeStep === 0 ? 'block' : 'none' }}>
                                                        <Card variant='outlined'>
                                                            <CardContent>
                                                                <Box component='form' autoComplete='off' sx={{ '& .MuiTextField-root': { mb: 2 } }}>
                                                                    <Grid container direction={'row'} columnSpacing={5}>
                                                                        <Grid item xs={4}>
                                                                            <TextField id='nombre' label='Nombre' inputProps={{ style: { textTransform: 'capitalize' } }} value={nombre} onChange={handleName} fullWidth required />
                                                                        </Grid>
                                                                        <Grid item xs={4}>
                                                                            <TextField id='apellido_paterno' inputProps={{ style: { textTransform: 'capitalize' } }} label='Apellido Paterno' value={primerApellido} onChange={handleFirstLastname} fullWidth required />
                                                                        </Grid>
                                                                        <Grid item xs={4}>
                                                                            <TextField id='apellido_materno' inputProps={{ style: { textTransform: 'capitalize' } }} label='Apellido Materno' value={segundoApellido} onChange={handleSecondLastName} fullWidth required />
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid container direction={'row'} columnSpacing={5}>
                                                                        <Grid item xs={4}>
                                                                            <FormControl fullWidth>
                                                                                <InputLabel>Género</InputLabel>
                                                                                <Select value={genero} onChange={handleChangeGender} input={<OutlinedInput label="Género" />} MenuProps={MenuProps}>
                                                                                    {GENDERS.map((gender) => (
                                                                                        <MenuItem key={gender} value={gender}>{gender}</MenuItem>
                                                                                    ))}
                                                                                </Select>
                                                                            </FormControl>
                                                                        </Grid>
                                                                        <Grid item xs={4}>
                                                                            <TextField id='rut' label='RUT' inputProps={{ pattern: '[0-9]*-[0-9]', maxLength: 10 }} error={rut.length > MAX_RUT_WIDTH || /[a-zA-Z]/.test(rut)} helperText={errorRutMessage} onChange={handleRUT} fullWidth required />
                                                                        </Grid>
                                                                        <Grid item xs={4}>
                                                                            <TextField id='rol' label='Rol USM' inputProps={{ pattern: '[0-9]*-[0-9]', maxLength: 11 }} error={rol.length > MAX_ROL_WIDTH || /[a-zA-Z]/.test(rol)} helperText={errorRolMessage} onChange={handleRol} fullWidth required />
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid container direction={'row'} columnSpacing={5}>
                                                                        <Grid item xs={4}>
                                                                            <TextField id='anno_ingreso_carrera' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 4 }} label='Año de ingreso a la carrera' value={annoIngresoCarrera} onChange={handleAnoIngresoCarrera} fullWidth required />
                                                                        </Grid>
                                                                        <Grid item xs={4}>
                                                                            <TextField id='anno_ingreso_universidad' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 4 }} label='Año de ingreso a la universidad' value={annoIngresoUni} onChange={handleAnoIngresoUni} fullWidth required />
                                                                        </Grid>
                                                                        <Grid item xs={4}>
                                                                            <TextField id='anno_retiro_carrera' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 4 }} label='Año de retiro a la universidad' value={annoRetiroUni} onChange={handleAnoRetiroUni} fullWidth required />
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid container direction={'row'} columnSpacing={5}>
                                                                        <Grid item xs={4}>
                                                                            <FormControl fullWidth>
                                                                                <InputLabel>Semestre de retiro</InputLabel>
                                                                                <Select value={semestreRetiro} onChange={handleSemesterChange} input={<OutlinedInput label="Semestre de retiro" />} MenuProps={MenuProps}>
                                                                                    {SEMESTERS.map((semester) => (
                                                                                        <MenuItem key={semester} value={semester}>{semester}</MenuItem>
                                                                                    ))}
                                                                                </Select>
                                                                            </FormControl>
                                                                        </Grid>
                                                                        <Grid item xs={4}>
                                                                            <FormControl fullWidth>
                                                                                <InputLabel>Carrera de retiro</InputLabel>
                                                                                <Select value={carreraInicial} onChange={handleInitialCareerChange} input={<OutlinedInput label="Carrera de retiro" />} MenuProps={MenuProps}>
                                                                                    {CAREERS.map((career) => (
                                                                                        <MenuItem key={career} value={career}>{career}</MenuItem>
                                                                                    ))}
                                                                                </Select>
                                                                            </FormControl>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid container className='sectionCard' direction={'row'} spacing={5} justifyContent='center'>
                                                                        <Grid item xs>
                                                                            <Card variant='outlined'>
                                                                                <CardContent>
                                                                                    <FormControl>
                                                                                        <FormLabel id='campus'>Campus al que perteneció</FormLabel>
                                                                                        <RadioGroup name='campus-group' value={value} onChange={handleRadioChange}>
                                                                                            <FormControlLabel value={CASA_CENTRAL} control={<Radio />} label={CASA_CENTRAL} />
                                                                                            <FormControlLabel value={CAMPUS_SJ} control={<Radio />} label={CAMPUS_SJ} />
                                                                                        </RadioGroup>
                                                                                    </FormControl>
                                                                                </CardContent>
                                                                            </Card>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Box>
                                                            </CardContent>
                                                        </Card>
                                                    </div>
                                                    <div style={{ display: activeStep === 1 ? 'block' : 'none' }}>
                                                        <Card className='GlobalReasons' variant='outlined'>
                                                            <CardContent>
                                                                <Typography variant='h3' align='center' > {TITLE} </Typography>
                                                                <Typography className='cardSubtitle' variant='body2' align='center'> {DESCRIPTION} </Typography>
                                                                <ColoredLine color='#E0E0E0' />
                                                                <Paper className='paperTest' elevation={0}>
                                                                    <CheckboxComponent list={globalReasons} onChange={handleChangeCheckboxReasons} />
                                                                </Paper>
                                                            </CardContent>
                                                        </Card>
                                                    </div>
                                                    <div style={{ display: activeStep === 2 ? 'block' : 'none' }}>
                                                        <Card variant='outlined'>
                                                            <CardContent>
                                                                <div>
                                                                    <div style={{ display: globalReasons[0].isGlobalChecked ? 'block' : 'none' }}>
                                                                        <Card className='sectionCard' variant='outlined'>
                                                                            <CardContent>
                                                                                <Typography variant='h3' align='center' > {SEF_SECTION_TITLE} </Typography>
                                                                                <ColoredLine color='#E0E0E0' />
                                                                                <Typography className='cardSubtitle' variant='body'>{SEF_QUESTION}</Typography>
                                                                                <Paper className='paperTest' elevation={0}>
                                                                                    <CheckboxComponent list={familyEconomicReasons} onChange={handleChangeCheckboxFamilyEconomy} />
                                                                                </Paper>
                                                                                <div style={{ display: familyEconomicReasons[4].isFamilyChecked ? 'block' : 'none' }}>
                                                                                    <ColoredLine color='#E0E0E0' />
                                                                                    <Typography className='cardSubtitle' variant='body'>{DETAIL_OTHER_QUESTION}</Typography>
                                                                                    <Paper className='paperTest' elevation={0}>
                                                                                        <TextField
                                                                                            sx={{
                                                                                                '& .MuiOutlinedInput-root': {
                                                                                                    '& fieldset': { borderColor: '#E0E0E0' }, '&:hover fieldset': { borderColor: '#E0E0E0' }, '&.Mui-focused fieldset': {
                                                                                                        border: '1px solid #E0E0E0'
                                                                                                    }
                                                                                                }
                                                                                            }}
                                                                                            value={otherFamilyReasons}
                                                                                            onChange={handleOtherFamily}
                                                                                            multiline
                                                                                            fullWidth
                                                                                            rows={3}
                                                                                            id="filled-textarea"
                                                                                        />
                                                                                    </Paper>
                                                                                </div>
                                                                            </CardContent>
                                                                        </Card>
                                                                    </div>
                                                                    <div style={{ display: globalReasons[1].isGlobalChecked ? 'block' : 'none' }}>
                                                                        <ColoredLine color='#E0E0E0' />
                                                                        <Card className='sectionCard' variant='outlined'>
                                                                            <CardContent>
                                                                                <Typography variant='h3' align='center' > {VOC_SECTION_TITLE} </Typography>
                                                                                <ColoredLine color='#E0E0E0' />
                                                                                <Typography className='cardSubtitle' variant='body'>{VOC_QUESTION}</Typography>
                                                                                <Paper className='paperTest' elevation={0}>
                                                                                    <CheckboxComponent list={vocationalReasons} onChange={handleChangeCheckboxVocational} />
                                                                                </Paper>
                                                                                <div style={{ display: (vocationalReasons[3].isChecked) ? 'block' : 'none' }}>
                                                                                    <ColoredLine color='#E0E0E0' />
                                                                                    <Typography className='cardSubtitle' variant='body'>{DETAIL_QUESTION}</Typography>
                                                                                    <Paper className='paperTest' elevation={0}>
                                                                                        <TextField
                                                                                            sx={{
                                                                                                '& .MuiOutlinedInput-root': {
                                                                                                    '& fieldset': { borderColor: '#E0E0E0' }, '&:hover fieldset': { borderColor: '#E0E0E0' }, '&.Mui-focused fieldset': {
                                                                                                        border: '1px solid #E0E0E0'
                                                                                                    }
                                                                                                }
                                                                                            }}
                                                                                            value={detailVocationalReasons}
                                                                                            onChange={handleDetailVocational}
                                                                                            multiline
                                                                                            fullWidth
                                                                                            rows={3}
                                                                                            id="filled-textarea"
                                                                                        />
                                                                                    </Paper>
                                                                                </div>
                                                                                <div style={{ display: (vocationalReasons[4].isChecked) ? 'block' : 'none' }}>
                                                                                    <ColoredLine color='#E0E0E0' />
                                                                                    <Typography className='cardSubtitle' variant='body'>{DETAIL_OTHER_QUESTION}</Typography>
                                                                                    <Paper className='paperTest' elevation={0}>
                                                                                        <TextField
                                                                                            sx={{
                                                                                                '& .MuiOutlinedInput-root': {
                                                                                                    '& fieldset': { borderColor: '#E0E0E0' }, '&:hover fieldset': { borderColor: '#E0E0E0' }, '&.Mui-focused fieldset': {
                                                                                                        border: '1px solid #E0E0E0'
                                                                                                    }
                                                                                                }
                                                                                            }}
                                                                                            value={otherVocationalReasons}
                                                                                            onChange={handleOtherVocational}
                                                                                            multiline
                                                                                            fullWidth
                                                                                            rows={3}
                                                                                            id="filled-textarea"
                                                                                        />
                                                                                    </Paper>
                                                                                </div>
                                                                            </CardContent>
                                                                        </Card>
                                                                    </div>
                                                                    <div style={{ display: globalReasons[2].isGlobalChecked ? 'block' : 'none' }}>
                                                                        <ColoredLine color='#E0E0E0' />
                                                                        <Card className='sectionCard' variant='outlined'>
                                                                            <CardContent>
                                                                                <Typography variant='h3' align='center' > {RA_TITLE} </Typography>
                                                                                <ColoredLine color='#E0E0E0' />
                                                                                <Typography className='cardSubtitle' variant='body'>{RA_FIRST_QUESTION}</Typography>
                                                                                <Paper className='paperTest' elevation={0}>
                                                                                    <CheckboxComponent list={firstAcademicReasons} onChange={handleChangeCheckboxFirstAcademic} />
                                                                                </Paper>
                                                                                <div style={{ display: (firstAcademicReasons[5].isChecked) ? 'block' : 'none' }}>
                                                                                    <ColoredLine color='#E0E0E0' />
                                                                                    <Typography className='cardSubtitle' variant='body'>{DETAIL_OTHER_QUESTION}</Typography>
                                                                                    <Paper className='paperTest' elevation={0}>
                                                                                        <TextField
                                                                                            sx={{
                                                                                                '& .MuiOutlinedInput-root': {
                                                                                                    '& fieldset': { borderColor: '#E0E0E0' }, '&:hover fieldset': { borderColor: '#E0E0E0' }, '&.Mui-focused fieldset': {
                                                                                                        border: '1px solid #E0E0E0'
                                                                                                    }
                                                                                                }
                                                                                            }}
                                                                                            value={otherFirstAcademicReasons}
                                                                                            onChange={handleOtherFirstAcademic}
                                                                                            multiline
                                                                                            fullWidth
                                                                                            rows={3}
                                                                                            id="filled-textarea"
                                                                                        />
                                                                                    </Paper>
                                                                                </div>
                                                                                <ColoredLine color='#E0E0E0' />
                                                                                <Typography className='cardSubtitle' variant='body'>{RA_SECOND_QUESTION}</Typography>
                                                                                <Paper className='paperTest' elevation={0}>
                                                                                    <CheckboxComponent list={secondAcademicReasons} onChange={handleChangeCheckboxSecondAcademic} />
                                                                                </Paper>
                                                                                <div style={{ display: (secondAcademicReasons[5].isChecked) ? 'block' : 'none' }}>
                                                                                    <ColoredLine color='#E0E0E0' />
                                                                                    <Typography className='cardSubtitle' variant='body'>{DETAIL_OTHER_QUESTION}</Typography>
                                                                                    <Paper className='paperTest' elevation={0}>
                                                                                        <TextField
                                                                                            sx={{
                                                                                                '& .MuiOutlinedInput-root': {
                                                                                                    '& fieldset': { borderColor: '#E0E0E0' }, '&:hover fieldset': { borderColor: '#E0E0E0' }, '&.Mui-focused fieldset': {
                                                                                                        border: '1px solid #E0E0E0'
                                                                                                    }
                                                                                                }
                                                                                            }}
                                                                                            value={otherSecondAcademicReasons}
                                                                                            onChange={handleOtherSecondAcademic}
                                                                                            multiline
                                                                                            fullWidth
                                                                                            rows={3}
                                                                                            id="filled-textarea"
                                                                                        />
                                                                                    </Paper>
                                                                                </div>
                                                                            </CardContent>
                                                                        </Card>
                                                                    </div>
                                                                    <div style={{ display: globalReasons[3].isGlobalChecked ? 'block' : 'none' }}>
                                                                        <ColoredLine color='#E0E0E0' />
                                                                        <Card className='sectionCard' variant='outlined'>
                                                                            <CardContent>
                                                                                <Typography variant='h3' align='center' > {AU_TITLE} </Typography>
                                                                                <ColoredLine color='#E0E0E0' />
                                                                                <Typography className='cardSubtitle' variant='body'>{AU_QUESTION}</Typography>
                                                                                <Paper className='paperTest' elevation={0}>
                                                                                    <CheckboxComponent list={atmosphereReasons} onChange={handleChangeCheckboxAtmosphere} />
                                                                                </Paper>
                                                                                <div style={{ display: (atmosphereReasons[3].isChecked || atmosphereReasons[4].isChecked) ? 'block' : 'none' }}>
                                                                                    <ColoredLine color='#E0E0E0' />
                                                                                    <Typography className='cardSubtitle' variant='body'>{DETAIL_QUESTION}</Typography>
                                                                                    <Paper className='paperTest' elevation={0}>
                                                                                        <TextField
                                                                                            sx={{
                                                                                                '& .MuiOutlinedInput-root': {
                                                                                                    '& fieldset': { borderColor: '#E0E0E0' }, '&:hover fieldset': { borderColor: '#E0E0E0' }, '&.Mui-focused fieldset': {
                                                                                                        border: '1px solid #E0E0E0'
                                                                                                    }
                                                                                                }
                                                                                            }}
                                                                                            value={detailAtmosphericReasons}
                                                                                            onChange={handleDetailAtmospheric}
                                                                                            multiline
                                                                                            fullWidth
                                                                                            rows={3}
                                                                                            id="filled-textarea"
                                                                                        />
                                                                                    </Paper>
                                                                                </div>
                                                                                <div style={{ display: (atmosphereReasons[5].isChecked) ? 'block' : 'none' }}>
                                                                                    <ColoredLine color='#E0E0E0' />
                                                                                    <Typography className='cardSubtitle' variant='body'>{DETAIL_OTHER_QUESTION}</Typography>
                                                                                    <Paper className='paperTest' elevation={0}>
                                                                                        <TextField
                                                                                            sx={{
                                                                                                '& .MuiOutlinedInput-root': {
                                                                                                    '& fieldset': { borderColor: '#E0E0E0' }, '&:hover fieldset': { borderColor: '#E0E0E0' }, '&.Mui-focused fieldset': {
                                                                                                        border: '1px solid #E0E0E0'
                                                                                                    }
                                                                                                }
                                                                                            }}
                                                                                            value={otherAtmosphericReasons}
                                                                                            onChange={handleOtherAtmospheric}
                                                                                            multiline
                                                                                            fullWidth
                                                                                            rows={3}
                                                                                            id="filled-textarea"
                                                                                        />
                                                                                    </Paper>
                                                                                </div>
                                                                            </CardContent>
                                                                        </Card>
                                                                    </div>
                                                                    <div style={{ display: globalReasons[4].isGlobalChecked ? 'block' : 'none' }}>
                                                                        <ColoredLine color='#E0E0E0' />
                                                                        <Card className='sectionCard' variant='outlined'>
                                                                            <CardContent>
                                                                                <Typography variant='h3' align='center' > {CAREER_TITLE} </Typography>
                                                                                <ColoredLine color='#E0E0E0' />
                                                                                <Typography className='cardSubtitle' variant='body'>{CAREER_QUESTION}</Typography>
                                                                                <Paper className='paperTest' elevation={0}>
                                                                                    <Grid container className='sectionCard' direction={'row'}>
                                                                                        <Grid item xs={4}>
                                                                                            <FormControl fullWidth>
                                                                                                <InputLabel>Carreras</InputLabel>
                                                                                                <Select value={carreraCambiada} onChange={handleCareerChange} input={<OutlinedInput label="Carrera" />} MenuProps={MenuProps}>
                                                                                                    {CAREERS.map((career) => (
                                                                                                        <MenuItem key={career} value={career}>{career}</MenuItem>
                                                                                                    ))}
                                                                                                </Select>
                                                                                            </FormControl>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Paper>
                                                                            </CardContent>
                                                                        </Card>
                                                                    </div>
                                                                    <div style={{ display: globalReasons[5].isGlobalChecked ? 'block' : 'none' }}>
                                                                        <ColoredLine color='#E0E0E0' />
                                                                        <Card className='sectionCard' variant='outlined'>
                                                                            <CardContent>
                                                                                <Typography variant='h3' align='center' > {OTRO_TITLE} </Typography>
                                                                                <ColoredLine color='#E0E0E0' />
                                                                                <Typography className='cardSubtitle' variant='body'>{OTRO_QUESTION}</Typography>
                                                                                <Paper className='paperTest' elevation={0}>
                                                                                    <TextField
                                                                                        sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#E0E0E0' }, '&:hover fieldset': { borderColor: '#E0E0E0' }, '&.Mui-focused fieldset': { border: '1px solid #E0E0E0' } } }}
                                                                                        value={otherReasons}
                                                                                        onChange={handleOtherReasons}
                                                                                        multiline
                                                                                        fullWidth
                                                                                        rows={3}
                                                                                        id="filled-textarea"
                                                                                    />
                                                                                </Paper>
                                                                            </CardContent>
                                                                        </Card>
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </div>
                                                    <div style={{ display: activeStep === 3 ? 'block' : 'none' }}>
                                                        <Card variant='outlined'>
                                                            <CardContent>
                                                                <Typography variant='h4' align='center' > Antes de enviar la encuesta, le agradecemos su tiempo.<br />Estos datos nos ayudarán a mejorar como departamento. </Typography>
                                                                <ColoredLine color='#E0E0E0' />
                                                                <Typography className='anonMessage' variant='body2' align='center'> Le recordamos que esta encuesta es <b>anónima</b> y sus datos personales no serán usados. </Typography>
                                                            </CardContent>
                                                        </Card>
                                                    </div>
                                                </Box>
                                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                    <Button className='stepperButton' color="inherit" variant='outlined' disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>Atrás</Button>
                                                    <Box sx={{ flex: '1 1 auto' }} />
                                                    <Button className='stepperButton' onClick={handleNext} variant='contained'>
                                                        {activeStep === STEPS.length - 1 ? 'Enviar' : 'Siguiente'}
                                                    </Button>
                                                </Box>
                                            </React.Fragment>
                                        )}
                                </Box>
                            </CardContent>
                        </Card>
                    </div>
                </Box>
            </div>
        </Stack>
    );
}